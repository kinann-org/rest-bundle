(function(exports) {
    const logger = require("log-instance").LogInstance.singleton;
    const WebSocket = require("ws");
    const EventEmitter = require("events");
    const Scheduler = require('./scheduler');
    const Task = Scheduler.Task;
    const v8 = require('v8');

    var rbEmitter;

    class RbSingleton {

        constructor(restBundles, listener, options = {}) {
            if (!listener) {
                throw new Error("RbSingleton(restBundle,listener,options) listener is required");
            }
            if (!listener.listening) {
                throw new Error("RbSingleton requires an active listener");
            }
            this.restBundles = restBundles;
            this.restBundles.forEach(rb => {
                rb.pushState = () => {
                    logger.debug("direct pushState");
                    return this.pushState();
                }
            });
            this.scheduler = new Scheduler();
            this.scheduler.start();
            this.listener = listener;
            var port = listener.address().port;
            logger.info(`RbSingleton listening on port:${port}`);

            this.wss = new WebSocket.Server({
                server: listener,
            });
            this.sockets = new Set();
            this.wss.on('connection', (ws, req) => {
                const ip = req.connection.remoteAddress;
                this.sockets.add(ws);
                logger.debug("WebSocket connected client:", ip);
                ws.on('close', () => {
                    this.sockets.delete(ws);
                    logger.debug('WebSocket disconnected client:', ip);
                });
                ws.on('error', (e) => {
                    logger.error(this.constructor.name, e);
                });
            });

            this.pushCount = 0;
            this.updateModel();

            options.watchHeap && this.heapWatcher();
        }

        static get emitter() {
            if  (rbEmitter == null) {
                rbEmitter = new EventEmitter();
                rbEmitter.setMaxListeners(10); // increase this as required, but think about it
                logger.info(`RbSingleton.emitter on:heapMax`);
                RbSingleton.emitter.on("heapMax", stats => {
                    RbSingleton.heapStat(stats);
                });
            }
            return rbEmitter;
        }

        heapWatcher() {
            var heap = v8.getHeapStatistics();
            if (heap.total_heap_size >= this.heapMax) {
                RbSingleton.emitter.emit("heapMax", heap);
            }
            setTimeout(() => {
                this.heapWatcher();
            }, this.heapInterval * 1000);
        }

        static heapStat(heap) {
            var precision=1;
            logger.info('memoryUsage()', process.memoryUsage());
            v8.getHeapSpaceStatistics().forEach(b => {
                var sz = b.space_size / (10e6);
                var used = b.space_used_size / (10e6);
                var available = b.space_available_size / (10e6);
                var physical = b.physical_space_size / (10e6);
                logger.debug(`v8.getHeapSpaceStatistics() ${b.space_name} MB`,
                    `size:${sz.toFixed(precision)}`,
                    `used:${used.toFixed(precision)}`,
                    `available:${available.toFixed(precision)}`,
                    `physical:${physical.toFixed(precision)}`,
                '');
            });
            var heaptot = heap.total_heap_size / 10e6;
            var heapavail = heap.total_available_size / 10e6;
            var heapused = heap.used_heap_size / 10e6;
            var heaplimit = heap.heap_size_limit / 10e6;
            logger.info(`v8.getHeapStatistics() MB`,
                `total:${heaptot.toFixed(precision)}`,
                `used:${heapused.toFixed(precision)}`,
                `available:${heapavail.toFixed(precision)}`,
                `limit:${heaplimit.toFixed(precision)}`,
            '');
        }

        close() {
            logger.debug(this.constructor.name, "close()...");
            this.scheduler.stop();
            clearInterval(this.pushStateId);
            this.wss.close();
            logger.info(this.constructor.name, "close()");
        }

        pushData(type, data) {
            data = typeof data === 'string' ? JSON.parse(data) : data;
            var message = JSON.stringify({
                type,
                data
            });
            this.pushCount++;
            //logger.debug(this.constructor.name, "push", this.pushCount,  message);
            this.sockets.forEach((ws) => ws.send(message));
        }

        updateModel(model) {
            model = model || {};
            var pushStateMillis = model.pushStateMillis || this.pushStateMillis || 1000;
            if (pushStateMillis != this.pushStateMillis) {
                this.pushStateMillis = pushStateMillis;
                if (this.pushStateId != null) {
                    clearInterval(this.pushStateId);
                }
                this.pushStateId = setInterval(() => {
                    this.pushState();
                }, pushStateMillis);
            }
            model.heapInterval != null && (this.heapInterval = model.heapInterval);
            this.heapInterval = this.heapInterval || 60;
            model.heapMax != null && (this.heapMax = model.heapMax);
            this.heapMax = this.heapMax || 30*1000*1000;
            return this.toJSON();
        }

        toJSON() {
            return {
                pushStateMillis: this.pushStateMillis,
                heapInterval: this.heapInterval,
                heapMax: this.heapMax,
            }
        }

        getState() {
            return {
                "web-socket": {
                    pushCount: this.pushCount,
                }
            }
        }

        getAllState() {
            return this.restBundles.reduce((acc, rb) => {
                return Object.assign(acc, {
                    [rb.name]: rb.getState(),
                });
            }, {});
        }

        pushState() {
            return new Promise((resolve, reject) => {
                try {
                    this.pushData("state", this.getAllState());
                } catch (err) {
                    logger.error('rb-singleton', err.stack);
                    reject(err);
                }
            });
        }

    } // class RbSingleton

    module.exports = exports.RbSingleton = RbSingleton;
})(typeof exports === "object" ? exports : (exports = {}));
