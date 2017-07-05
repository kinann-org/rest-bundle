(typeof describe === 'function') && describe("RestBundle", function() {
    const should = require("should");
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
        should.equal(rbh.hash({a:1}), rbh.hash('a:1,'));
        should.equal(rbh.hash({a:1,b:2}), rbh.hash('a:1,b:2,'));
        should.equal(rbh.hash({b:2,a:1}), rbh.hash('a:1,b:2,')); // keys are ordered
    });
    it("hashCached(object) returns existing hash code if present", function() {
        var rbh = new RbHash();
        var hfoo = rbh.hashCached('foo');
        should.equal(rbh.hashCached({rbhash:hfoo}), hfoo);
        should.equal(rbh.hashCached({rbhash:hfoo,anything:'do-not-care'}), hfoo);
        should.equal(rbh.hashCached([{rbhash:hfoo,anything:'do-not-care'}]), rbh.hash(hfoo));
        should.equal(rbh.hashCached({rbhash:'some-hash', a:1}), 'some-hash');
    });
})