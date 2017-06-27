'use strict';

const expect = require('expect.js');
const Mocha  = require('mocha');
const BI = require('BigInt');

const Base = require('../lib/base.js');
const LSeqNode = require('../lib/lseqnode.js');
const Triple = require('../lib/triple.js');

describe('base.js', function() {
    
    describe('base', function() {
        it('trivial test of setup', function() {
            const base = new Base(1337);
            expect(base._b).to.be.eql(1337);
        });
    });
    
    describe('getBitBase', function(){
        it('trivially return the bit size of certain level', function() {
            const base = new Base(42);
            expect(base.getBitBase(5)).to.be.eql(47);
        });
    });

    describe('getSumBit', function(){
        it('should return number of bits from lvl-0 to lvl-X', function() {
            const base = new Base(5);
            expect(base.getSumBit(0)).to.be.eql(base._b); // 5
            expect(base.getSumBit(1)).to.be.eql(base._b*2+1); // 11
            expect(base.getSumBit(2)).to.be.eql(base._b*3+3); // 18
        });
    });
    
    describe('getInterval', function() {
        it('should return an empty interval at lvl 0', function() {
            const base = new Base(3);
            const id1= new LSeqNode([new Triple(1,0,0), new Triple(1,0,0)], "");
            const id2= new LSeqNode([new Triple(1,0,0), new Triple(15,0,0)],"");
            expect(base.getInterval(0, id1, id2)).to.be.eql(0);
        });

        it('should return an interval at level 1 of 13', function() {
            const base = new Base(3);
            const id1= new LSeqNode([new Triple(1,0,0), new Triple(1,0,0)], "");
            const id2= new LSeqNode([new Triple(1,0,0), new Triple(15,0,0)],"");
            expect(base.getInterval(1, id1, id2)).to.be.eql(13);
        });

        it('should return an interval at level 1 of 14', function() {
            const base = new Base(3);
            const id1= new LSeqNode([new Triple(1,0,0)], "");
            const id2= new LSeqNode([new Triple(1,0,0), new Triple(15,0,0)],"");
            expect(base.getInterval(1, id1, id2)).to.be.eql(14);
        });

        it('should return an interval at level 1 of 11', function() {
            const base = new Base(3);
            const id1= new LSeqNode([new Triple(1,0,0), new Triple(4,0,0)], "");
            const id2= new LSeqNode([new Triple(1,0,0), new Triple(3,0,0)], "");
            expect(base.getInterval(1, id1, id2)).to.be.eql(11);
        });

        it('process interval between close paths with LSEQNode @0', function() {
            const base = new Base(3);
            const id1= new LSeqNode([new Triple(1,0,0)], "");            
            const id2= new LSeqNode([new Triple(2,0,0)], "");
            expect(base.getInterval(0, id1, id2)).to.be.eql(0);
        });

        it('process interval between close paths with LSEQNode @1', function() {
            const base = new Base(3);
            const id1= new LSeqNode([new Triple(1,0,0)], "");
            const id2= new LSeqNode([new Triple(2,0,0)], "");
            expect(base.getInterval(1, id1, id2)).to.be.eql(15);
        });
        
    });
});
