'use strict';

const expect = require('expect.js');
const BI = require('BigInt');
const Mocha  = require('mocha');

const Base = require('../lib/base.js');
const Identifier = require('../lib/identifier.js');
const Triple = require('../lib/triple.js');
const LSeqNode = require('../lib/lseqnode.js');

// using a departure base value of 3 bits
describe('positions.js', function() {
    
    describe('positions', function() {
        it('is initialized correctly', function() {
            const base = new Base(3);
            const i1 = new Identifier(base, BI.int2bigInt(0,1),[0],[0]);
            expect(BI.isZero(i1._d)).to.be.ok();
            expect(i1._s).to.have.length(1);
            expect(i1._c).to.have.length(1);
        });
    });
    
    describe('compareTo', function() {
        it('compare digit first of lvl 0', function() {
            const base = new Base(3);
            const i1 = new Identifier(base, BI.int2bigInt(3,2),[0],[0]);// d:[3]
            const i2 = new Identifier(base, BI.int2bigInt(5,3),[0],[0]);// d:[5]
            expect(i1.compareTo(i2)).to.be.below(0);
            expect(i2.compareTo(i1)).to.be.above(0);
        });

        it('compare digit first of lvl 1', function() {
            const base = new Base(3);
            const i1 = new Identifier(base, BI.int2bigInt(19,base.getSumBit(1)),
                                      [0,1],[0,1]); // d:[1,3]
            const i2 = new Identifier(base, BI.int2bigInt(37,base.getSumBit(1)),
                                      [0,1],[0,1]); // d:[2,5]
            expect(i1.compareTo(i2)).to.be.below(0);
            expect(i2.compareTo(i1)).to.be.above(0);
        });
        
        it('compare digit first of lvl 1 but first eql', function() {
            const base = new Base(3);
            const i1 = new Identifier(base, BI.int2bigInt(19,base.getSumBit(1)),
                                      [0,1],[0,1]); // d:[1,3]
            const i2 = new Identifier(base, BI.int2bigInt(21,base.getSumBit(1)),
                                      [0,1],[0,1]); // d:[1,5]
            expect(i1.compareTo(i2)).to.be.below(0);
            expect(i2.compareTo(i1)).to.be.above(0);
        });

        it('compare lvl 1 with source different', function() {
            const base = new Base(3);
            const i1 = new Identifier(base, BI.int2bigInt(19,base.getSumBit(1)),
                                      [0,3],[0,2]); // d:[1.3]
            const i2 = new Identifier(base, BI.int2bigInt(21,base.getSumBit(1)),
                                      [3,3],[0,2]); // d:[1.5]
            expect(i1.compareTo(i2)).to.be.below(0);
            expect(i2.compareTo(i1)).to.be.above(0);
        });
        
        it('compare lvl 1 with clock different', function() {
            const base = new Base(3);
            const i1 = new Identifier(base, BI.int2bigInt(19,base.getSumBit(1)),
                                      [3,3],[0,1]); // d:[1.3]
            const i2 = new Identifier(base, BI.int2bigInt(21,base.getSumBit(1)),
                                      [3,3],[0,2]); // d:[1.5]
            expect(i1.compareTo(i2)).to.be.below(0);
            expect(i2.compareTo(i1)).to.be.above(0);
        });
        
        it('compare lvl 0 with lvl 1; same d,s,c; size matters', function() {
            const base = new Base(3);
            const i1 = new Identifier(base, BI.int2bigInt(1,base.getSumBit(0)),
                                      [3],[0]); // d:[1]
            const i2 = new Identifier(base, BI.int2bigInt(21,base.getSumBit(1)),
                                      [3,3],[0,2]); // d:[1.5]
            expect(i1.compareTo(i2)).to.be.below(0);
            expect(i2.compareTo(i1)).to.be.above(0);
        });
        
        it('compare lvl 1 equal identifiers', function() {
            const base = new Base(3);
            const i1 = new Identifier(base, BI.int2bigInt(21,base.getSumBit(1)),
                                      [3,3],[0,2]); // d:[1.5]
            const i2 = new Identifier(base, BI.int2bigInt(21,base.getSumBit(1)),
                                      [3,3],[0,2]); // d:[1.5]
            expect(i1.compareTo(i2)).to.be.eql(0);
            expect(i2.compareTo(i1)).to.be.eql(0);
        });
        
    });
    
    describe('toNode', function() {
        it('convert a simple id to a path', function() {
            const base = new Base(3);
            const i1 = new Identifier(base, BI.int2bigInt(21,base.getSumBit(1)),
                                      [3,3],[0,2]); // d:[1.5]
            const resultNode = i1.toNode();
            expect(resultNode.t.p).to.be.eql(1);
            expect(resultNode.child.t.p).to.be.eql(5);
            expect(resultNode.t.s).to.be.eql(3);
            expect(resultNode.child.t.s).to.be.eql(3);
            expect(resultNode.t.c).to.be.eql(0);
            expect(resultNode.child.t.c).to.be.eql(2);
        });
    });
    
    describe('fromNode', function() {
        it('convert a simple node to an identifier', function() {
            const base = new Base(3);
            const node = new LSeqNode([new Triple(1,3,0), new Triple(5,3,2)]);
            const id = (new Identifier(base)).fromNode(node);
            const onefive = BI.int2bigInt(21, base.getSumBit(1)); // [1.5];
            expect(id._d).to.be.eql(onefive);
            expect(id._s[0]).to.be.eql(3);
            expect(id._s[1]).to.be.eql(3);
            expect(id._c[0]).to.be.eql(0);
            expect(id._c[1]).to.be.eql(2);
        });
    });
    
});
