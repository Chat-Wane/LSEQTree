'use strict';

const expect = require('expect.js');
const Mocha = require('mocha');

const LSeqNode = require('../lib/lseqnode.js');
const Triple = require('../lib/triple.js');

describe('lseqnode.js', function() {
    
    describe('constructor', function() {
        it('returns a node of length 1', function() {
            const node = new LSeqNode([new Triple(1,2,3)], 'a');
            expect(node.subCounter).to.be.eql(0);
            expect(node.e).to.be.eql('a');
            expect(node.children.length).to.be.eql(0);
        });
        it('returns a node of length 3', function() {
            const node = new LSeqNode([new Triple(1,2,3),
                                       new Triple(4,5,6),
                                       new Triple(7,8,9)], 'a');
            expect(node.subCounter).to.be.eql(1);
            expect(node.child.subCounter).to.be.eql(1);
            expect(node.child.child.subCounter).to.be.eql(0);
            expect(node.child.child.e).to.be.eql('a');
            expect(node.children.length).to.be.eql(1);
        });
    });

    describe("add", function() {
        it('construct a tree of two elements (1 subpath)', function() {
            const root = new LSeqNode([new Triple(1,2,3)], 'a');
            const other = new LSeqNode([new Triple(4,5,6),
                                        new Triple(7,8,9)], 'b');
            root.add(other);
            expect(root.subCounter).to.be.eql(1);
        });
        
        it('construct a tree of two elements (2 subpath)', function() {
            const root = new LSeqNode([new Triple(1,2,3)], 'a');
            const b = new LSeqNode([new Triple(4,5,6),
                                    new Triple(7,8,9)], 'b');
            root.add(b);
            const c = new LSeqNode([new Triple(4,5,6),
                                    new Triple(10,11,12)], 'c');
            root.add(c);
            expect(root.subCounter).to.be.eql(2);
            expect(root.children.length).to.be.eql(1);
            expect(root.child.children.length).to.be.eql(2);
        });
        it('construct a tree, verify if index are at right positions',
           function() {
               const root = new LSeqNode([], 'a');
               const b = new LSeqNode([new Triple(1,1,1)], 'b');
               root.add(b);              
               const c = new LSeqNode([new Triple(2,2,2),
                                       new Triple(3,3,3)], 'c');
               root.add(c);
               const d = new LSeqNode([new Triple(2,2,2),
                                       new Triple(4,4,4)], 'd');
               root.add(d);
               expect(root.subCounter).to.be.eql(3);
               expect(root.indexOf(b)).to.be.eql(1);
               expect(root.indexOf(c)).to.be.eql(2);
               expect(root.indexOf(d)).to.be.eql(3);
           });
        it ('construct a tree and insert an element within existing branch',
            function() {
                const root = new LSeqNode([],'a');
                const c = new LSeqNode([new Triple(1,1,1),
                                        new Triple(3,3,3)], 'c');
                root.add(c);                
                const b = new LSeqNode([new Triple(1,1,1)], 'b');
                root.add(b);
                expect(root.subCounter).to.be.eql(2);
                expect(root.indexOf(c)).to.be.eql(2);
                expect(root.indexOf(b)).to.be.eql(1);
            });
    });
    describe('get', function() {
        it('get the values at the given index in a simple tree',
           function() {
               const root = new LSeqNode([], 'a');               
               const b = new LSeqNode([new Triple(1,1,1)], 'b');
               root.add(b);                   
               const c = new LSeqNode([new Triple(2,2,2)], "c");
               root.add(c);
               expect(root.subCounter).to.be.eql(2);
               expect(root.get(1)).to.be.eql(b);
               expect(root.get(2)).to.be.eql(c);
           });
        it('get the values at the given index with tree of depth 2',
           function() {
               const root = new LSeqNode([], 'a');               
               const b = new LSeqNode([new Triple(1,1,1)], 'b');
               root.add(b);               
               const d = new LSeqNode([new Triple(2,2,2),
                                       new Triple(3,3,3)], 'd');
               root.add(d);               
               const c = new LSeqNode([new Triple(2,2,2)], 'c');
               // recreate for d is modified in root
               const dd = new LSeqNode([new Triple(2,2,2),
                                       new Triple(3,3,3)], 'd');
               root.add(c);               
               expect(root.get(1)).to.be.eql(b);
               expect(root.get(2)).to.be.eql(c);
               expect(root.get(3)).to.be.eql(dd);
           });
    });
    
    describe('del', function() {
        it('should delete a node of the simple tree', function() {
            const root = new LSeqNode([], 'a');
            const b = new LSeqNode([new Triple(1,1,1)], 'b');
            root.add(b);            
            const c = new LSeqNode([new Triple(2,2,2)], 'c');
            root.add(c);
            expect(root.indexOf(c)).to.be.eql(2);
            root.del(b);
            expect(root.indexOf(c)).to.be.eql(1);
        });

        it('should delete all intermediary nodes in a useless path',
           function() {
               const root = new LSeqNode([], 'a');               
               const b = new LSeqNode([new Triple(1,1,1),
                                       new Triple(2,2,2),
                                       new Triple(3,3,3)], 'b');
               root.add(b);               
               const c = new LSeqNode([new Triple(1,1,1)], 'c');
               root.add(c);               
               const db = new LSeqNode([new Triple(1,1,1),
                                       new Triple(2,2,2),
                                       new Triple(3,3,3)], 'b');               
               expect(root.indexOf(c)).to.be.eql(1);
               expect(root.indexOf(b)).to.be.eql(2);
               root.del(db);
               expect(root.indexOf(c)).to.be.eql(1);
               expect(root.child.e).to.be.eql('c');
               expect(root.child.children.length).to.be.eql(0);
           });
        
        it('more complexe tree, remove the subtree but not all nodes',
           function() {
               const root = new LSeqNode([], 'a');               
               const b = new LSeqNode([new Triple(1,1,1),
                                       new Triple(2,2,2),
                                       new Triple(3,3,3)], 'b');
               root.add(b);               
               const c = new LSeqNode([new Triple(1,1,1)], 'c');
               root.add(c);               
               const d = new LSeqNode([new Triple(1,1,1),
                                       new Triple(2,2,2),
                                       new Triple(4,4,4),
                                       new Triple(5,5,5)], 'd');
               root.add(d);                    
               // remove the elements
               const db = new LSeqNode([new Triple(1,1,1),
                                        new Triple(2,2,2),
                                        new Triple(3,3,3)], 'b');
               expect(root.indexOf(c)).to.be.eql(1);
               expect(root.indexOf(db)).to.be.eql(2);
               expect(root.indexOf(d)).to.be.eql(3);
               root.del(db);
               expect(root.indexOf(c)).to.be.eql(1);
               expect(root.indexOf(d)).to.be.eql(2);
               const dc = new LSeqNode([new Triple(1,1,1)], 'c');
               root.del(dc);
               expect(root.indexOf(d)).to.be.eql(1);
           });
    });
    describe('getIndexes', function() {
        it('get the list of succesive indexes of a path in a tree',
           function() {
               const root = new LSeqNode();               
               const a = new LSeqNode([new Triple(1,1,1)], 'a');
               root.add(a);               
               const b = new LSeqNode([new Triple(2,2,2),
                                       new Triple(3,3,3)], 'b');
               root.add(b);               
               const c = new LSeqNode([new Triple(2,2,2),
                                       new Triple(4,4,4)], 'c');
               root.add(c);
               expect(root.subCounter).to.be.eql(3);
               expect(root.indexOf(a)).to.be.eql(0);
               expect(root.indexOf(b)).to.be.eql(1);
               expect(root.indexOf(c)).to.be.eql(2);
               expect(root._getIndexes(a)).to.be.eql([0]);
               expect(root._getIndexes(b)).to.be.eql([1,0]);
               expect(root._getIndexes(c)).to.be.eql([1,1]);
           });
    });
});
