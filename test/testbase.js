var expect = require('expect.js');
var Mocha  = require('mocha');
var BI = require('BigInt');

var Base = require('../lib/base.js');
var ID = require('../lib/identifier.js');
var LSEQNode = require('../lib/lseqnode.js');
var Triple = require('../lib/triple.js');

describe('base.js', function() {
    
    describe('base', function(){
	it('trivial test of setup', function(){
	    var base = new Base(1337);
	    expect(base._b).to.be.eql(1337);
	});
    });
    
    describe('getBitBase', function(){
	it('trivially return the bit size of certain level', function(){
	    var base = new Base(42);
	    expect(base.getBitBase(5)).to.be.eql(47);
	});
    });

    describe('getSumBit', function(){
	it('should return number of bits from lvl-0 to lvl-X', function(){
	    var base = new Base(5);
	    expect(base.getSumBit(0)).to.be.eql(base._b); // 5
	    expect(base.getSumBit(1)).to.be.eql(base._b*2+1) // 11
	    expect(base.getSumBit(2)).to.be.eql(base._b*3+3) // 18
	});
    });

    describe('getInterval', function(){
	it('should return an empty interval at lvl 0', function(){
	    var base = new Base(3);
	    var tripleList = [];
	    tripleList.push(new Triple(1,0,0));
	    tripleList.push(new Triple(1,0,0));
	    var id1= new LSEQNode(tripleList, "");
	    var tripleList = [];
	    tripleList.push(new Triple(1,0,0));
	    tripleList.push(new Triple(15,0,0));
	    var id2= new LSEQNode(tripleList, "");
	    expect(base.getInterval(id1,id2,0)).to.be.eql(0);
	});
	
	it('should return an interval at level 1 of 13', function(){
	    var base = new Base(3);
	    var tripleList = [];
	    tripleList.push(new Triple(1,0,0));
	    tripleList.push(new Triple(1,0,0));
	    var id1= new LSEQNode(tripleList, "");
	    var tripleList = [];
	    tripleList.push(new Triple(1,0,0));
	    tripleList.push(new Triple(15,0,0));
	    var id2= new LSEQNode(tripleList, "");
	    expect(base.getInterval(id1,id2,1)).to.be.eql(13);
	});
	
	it('should return an interval at level 1 of 14', function(){
	    var base = new Base(3);
	    var tripleList = [];
	    tripleList.push(new Triple(1,0,0));
	    var id1= new LSEQNode(tripleList, "");
	    var tripleList = [];
	    tripleList.push(new Triple(1,0,0));
	    tripleList.push(new Triple(15,0,0));
	    var id2= new LSEQNode(tripleList, "");
	    expect(base.getInterval(id1,id2,1)).to.be.eql(14);
	});
	
	it('should return an interval at level 1 of 11', function(){
	    var base = new Base(3);
	    var tripleList = [];
	    tripleList.push(new Triple(1,0,0));
	    tripleList.push(new Triple(4,0,0));
	    var id1= new LSEQNode(tripleList, "");
	    var tripleList = [];
	    tripleList.push(new Triple(1,0,0));
	    tripleList.push(new Triple(3,0,0));
	    var id2= new LSEQNode(tripleList, "");
	    expect(base.getInterval(id1,id2,1)).to.be.eql(11);
	});

	it('process interval between close paths with LSEQNode @0', function(){
	    var base = new Base(3);
	    var tripleList = [];
	    tripleList.push(new Triple(1,0,0));
	    var id1= new LSEQNode(tripleList, "");
	    var tripleList = [];
	    tripleList.push(new Triple(2,0,0));
	    var id2= new LSEQNode(tripleList, "");
	    expect(base.getInterval(id1,id2,0)).to.be.eql(0);
	});

	it('process interval between close paths with LSEQNode @1', function(){
	    var base = new Base(3);
	    var tripleList = [];
	    tripleList.push(new Triple(1,0,0));
	    var id1= new LSEQNode(tripleList, "");
	    var tripleList = [];
	    tripleList.push(new Triple(2,0,0));
	    var id2= new LSEQNode(tripleList, "");
	    expect(base.getInterval(id1,id2,1)).to.be.eql(15);
	});
	
    });
});
