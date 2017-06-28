'use strict';

const expect = require('expect.js');
const Mocha = require('mocha');

const LSeqTree = require('../lib/lseqtree.js');

const N = 100000;

describe('lseqtree.js', function() {
    
    describe('constructor', function() {
        it('create an LSEQ array', function() {
            const lseq = new LSeqTree(42);
            expect(lseq._s).to.be.eql(42);
            expect(lseq._c).to.be.eql(0);
            expect(lseq.length).to.be.eql(0);
        });
    });
    
    describe('insert', function() {
        it('insert an element in the structure', function() {
            const lseq = new LSeqTree(42);
            const ei = lseq.insert('a', 0);
            expect(lseq.length).to.be.eql(1);
            expect(lseq._c).to.be.eql(1);
            expect(lseq._s).to.be.eql(42);
            expect(lseq._get(1).e).to.be.eql('a');
        });
        it('insert '+ N +' elements at the beginning of the structure',
           function() {
               this.timeout(2*N);
               const lseq = new LSeqTree(42);
               for (let i= 0; i < N; ++i) { lseq.insert('a', 0); };
               expect(lseq.length).to.be.eql(N);
           });        
        it('insert '+ N + ' elements at the end of the structure',
           function() {
               this.timeout(2*N);
               const lseq = new LSeqTree(42);
               for (let i= 0; i < N; ++i) { lseq.insert('a',lseq.length); };
               expect(lseq.length).to.be.eql(N);
           });
        
        it('insert '+ N +' elements at rand position in the structure',
           function() {
               this.timeout(2*N);
               const lseq = new LSeqTree(42);
               for (let i= 0; i < N; ++i) {
                   let rand = Math.floor(Math.random()*lseq.length);
                   lseq.insert('a', rand);
               };
               expect(lseq.length).to.be.eql(N);
           });
    });
    
    describe('remove', function(){
        it('insert and remove an element in the structure', function() {
            const lseq = new LSeqTree(42);
            const ei = lseq.insert('a', 0);
            expect(lseq.length).to.be.eql(1);
            expect(lseq._c).to.be.eql(1);
            expect(lseq._s).to.be.eql(42);
            expect(lseq._get(1).e).to.be.eql('a');
            expect(lseq.get(0)).to.be.eql('a');
            lseq.remove(0);
            expect(lseq._get(1).e).to.be.eql('');
            expect(lseq.length).to.be.eql(0);
        });
        it('insert and remove 1000 elements', function(){
            this.timeout(20000);
            const lseq = new LSeqTree(42);
            for (let i = 0; i < 1000; ++i) {
                let rand =  Math.floor(Math.random()*lseq.length);
                lseq.insert('a', rand);
            };
            expect(lseq.length).to.be.eql(1000);
            for (let i = 0; i < 1000; ++i) {
                lseq.remove(Math.floor(Math.random()*lseq.length));
            };    
            expect(lseq.length).to.be.eql(0);
        });
    });
    describe('applyInsert', function() {
        it('try to insert an already existing elements but cant',
           function() {
               const lseq = new LSeqTree(42);
               const ei = lseq.insert('a', 0);
               const lseq2 = new LSeqTree(1337);
               const added = lseq.applyInsert(ei);
               expect(added).to.be.eql(false);
               const position = lseq2.applyInsert(ei);
               expect(position).to.be.eql(1);
           });
    });
    describe('applyRemove', function() {
        it('try to delete a non existing element', function() {
            const lseq = new LSeqTree(42);
            const ei = lseq.insert('a', 0);
            const position = lseq.applyRemove(ei.id);
            expect(position).to.be.eql(1);
            const exist = lseq.applyRemove(ei.id);
            expect(exist).to.be.eql(-1);
        });
    });

});
