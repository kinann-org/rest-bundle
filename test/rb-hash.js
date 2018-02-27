(typeof describe === 'function') && describe("RestBundle", function() {
    const should = require("should");
    const fs = require('fs');
    const path = require('path');
    const RbHash = exports.RbHash || require('../index').RbHash;

    it("hash(string) calculates hash code", function() {
        var rbh = new RbHash();
        // MD5 test
        should.equal(rbh.hash(''), 'd41d8cd98f00b204e9800998ecf8427e');
        should.equal(rbh.hash('hello\n'), 'b1946ac92492d2347c6235b4d2611184');
        should.equal(rbh.hash(' '), '7215ee9c7d9dc229d2921a40e899ec5f');
        should.equal(rbh.hash('HTML'), '4c4ad5fca2e7a3f74dbb1ced00381aa4');

        // UNICODE should "kinda work" but perhaps not as other expect
        //should.equal(rbh.hash('\u2190'), 'fe98e12bb396ee46bf88efa6fc55ac08'); // other MD5
        should.equal(rbh.hash('\u2190'), '5adcb503750876bb69cfc0a9289f9fb8'); // hmmmm....
        should.notEqual(rbh.hash('\u2190'), rbh.hash('\u2191')); // kinda work

        // semantic test
        should.equal(rbh.hash('hello'), rbh.hash('hello'));
        should.notEqual(rbh.hash('goodbye'), rbh.hash('hello'));
    });
    it("hash(Array) calculates hash code", function() {
        var rbh = new RbHash();
        should.equal(rbh.hash(['HTML']), rbh.hash(rbh.hash('HTML')));
        should.equal(rbh.hash(['HT','ML']), rbh.hash(rbh.hash('HT')+rbh.hash('ML')));
        should.equal(rbh.hash([1,2]), rbh.hash(rbh.hash('1')+rbh.hash('2')));
    });
    it("hash(number) calculates hash code", function() {
        var rbh = new RbHash();
        should.equal(rbh.hash('123'), rbh.hash(123));
        should.equal(rbh.hash('123.456'), rbh.hash(123.456));
    });
    it("hash(null) calculates hash code", function() {
        var rbh = new RbHash();
        should.equal(rbh.hash('null'), rbh.hash(null));
    });
    it("hash(undefined) calculates hash code", function() {
        var rbh = new RbHash();
        should.equal(rbh.hash('undefined'), rbh.hash(undefined));
    });
    it("hash(boolean) calculates hash code", function() {
        var rbh = new RbHash();
        should.equal(rbh.hash(true), rbh.hash('true'));
    });
    it("hash(function) calculates hash code", function() {
        var rbh = new RbHash();
        function f(x) { return x*x; }
        var fstr = f.toString();
        var g = (x) => x*x;
        var gstr = g.toString();

        should.equal(rbh.hash(f), rbh.hash(fstr));
        should.equal(rbh.hash(g), rbh.hash(gstr));
    });
    it("hash(object) calculates or calculates hash code", function() {
        var rbh = new RbHash();
        should.equal(rbh.hash({a:1}), rbh.hash('a:'+rbh.hash(1)+','));
        should.equal(rbh.hash({a:1,b:2}), rbh.hash('a:'+rbh.hash(1)+',b:'+rbh.hash(2)+','));
        should.equal(rbh.hash({b:2,a:1}), rbh.hash('a:'+rbh.hash(1)+',b:'+rbh.hash(2)+',')); // keys are ordered
        var drives = {
            "drives":[
                {"type":"BeltDrive","maxPos":100},
                {"type":"BeltDrive"},
                {"type":"ScrewDrive"},
            ],
            "rbHash":"2d21a6576194aeb1de7aea4d6726624d"
        };
        var hash100 = rbh.hash(drives);
        drives.drives[0].maxPos++;
        var hash101 = rbh.hash(drives);
        should(hash100).not.equal(hash101);
    });
    it("hashCached(object) returns existing hash code if present", function() {
        var rbh = new RbHash();
        var hfoo = rbh.hashCached('foo');
        should.equal(rbh.hashCached({rbHash:hfoo}), hfoo);
        should.equal(rbh.hashCached({rbHash:hfoo,anything:'do-not-care'}), hfoo);
        should.equal(rbh.hashCached([{rbHash:hfoo,anything:'do-not-care'}]), rbh.hash(hfoo));
        should.equal(rbh.hashCached({rbHash:'some-hash', a:1}), 'some-hash');
    });
    it("hash(object) handles objects with non-serializable properties", function() {
        class TestClass {
            constructor() {
                this.color = 'red';             // serialized
                this.random = Math.random();    // not-serialized
            }
            toJSON() { 
                return {
                    color: this.color,
                };
            }
        }
        var obj = (() => { 
           var o = {};
           o.color = 'red';
           return o;
        })();
        should(typeof obj.toJSON).equal('undefined');
        should(typeof new TestClass().toJSON).equal('function');
        var rbh = new RbHash();
        var hash1 = rbh.hash(new TestClass());
        var hash2 = rbh.hash(new TestClass());
        should(hash1).equal(hash2);
    });
})
