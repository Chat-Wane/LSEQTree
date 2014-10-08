var expect = require('expect.js');
var Mocha = require('mocha');

var LSEQ = require('../lib/lseqtree.js');

describe('lseqtree.js', function(){
	
	describe('constructor', function(){
		it('create an LSEQ array', function(){
			var lseq = new LSEQ(42);
			expect(lseq._s).to.be.eql(42);
			expect(lseq._c).to.be.eql(0);
			expect(lseq.length).to.be.eql(0);
		    });
	    });

	describe('insert', function(){
		it('insert an element in the structure', function(){
			var lseq = new LSEQ(42);
			var ei = lseq.insert('a',0);
			expect(lseq.length).to.be.eql(1);
			expect(lseq._c).to.be.eql(1);
			expect(lseq._s).to.be.eql(42);
			expect(lseq.get(1).e).to.be.eql('a');
		    });
		it('insert 1000 elements at the beginning of the structure',
		   function(){
		       this.timeout(20000);
		       var lseq = new LSEQ(42);
		       for (i= 0; i < 1000; ++i){
			   lseq.insert('a',0);
		       };
		       expect(lseq.length).to.be.eql(1000);
		   });
		it('insert 1000 elements at the end of the structure',
		   function(){
		       this.timeout(20000);
		       var lseq = new LSEQ(42);
		       for (i= 0; i < 1000; ++i){
			   lseq.insert('a',lseq.length);
		       };
		   });
		it('insert 1000 elements at random position in the structure',
		   function(){
		       this.timeout(20000);
		       var lseq = new LSEQ(42);
		       for (i= 0; i < 1000; ++i){
			   var rand = Math.floor(Math.random()*lseq.length);
			   lseq.insert('a',rand);
		       };
		   });
	    });
	
 	describe('remove', function(){
		it('insert and remove an element in the structure', function(){
			var lseq = new LSEQ(42);
			var ei = lseq.insert('a',0);
			expect(lseq.length).to.be.eql(1);
			expect(lseq._c).to.be.eql(1);
			expect(lseq._s).to.be.eql(42);
			expect(lseq.get(1).e).to.be.eql('a');
			lseq.remove(0);
			expect(lseq.get(1).e).to.be.eql("");
			expect(lseq.length).to.be.eql(0);
		    });
		it('insert and remove 1000 elements', function(){
			this.timeout(20000);
			var lseq = new LSEQ(42);
			for(var i=0; i<1000; ++i){
			    var rand =  Math.floor(Math.random()*lseq.length);
			    var ei = lseq.insert('a', rand);
			};
			expect(lseq.length).to.be.eql(1000);
			for (var i=0; i<1000; ++i){
			    lseq.remove(Math.floor(Math.random()*lseq.length));
			};	    
			expect(lseq.length).to.be.eql(0);
		    });
	    });
    });