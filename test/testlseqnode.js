var expect = require('expect.js');
var Mocha = require('mocha');

var LSEQNode = require('../lib/lseqnode.js');
var Triple = require('../lib/triple.js');

describe('lseqnode.js', function() {
	
	describe('constructor', function(){
		it('returns a node of length 1', function(){
			var tripleList = [];
			tripleList.push(new Triple(1,2,3));
			var node = new LSEQNode(tripleList, "a");
			expect(node.subCounter).to.be.eql(0);
			expect(node.e).to.be.eql("a");
			expect(node.children.length).to.be.eql(0);
		    });
		it('returns a node of length 3', function(){
			var tripleList = [];
			tripleList.push(new Triple(1,2,3));
			tripleList.push(new Triple(4,5,6));
			tripleList.push(new Triple(7,8,9));
			var node = new LSEQNode(tripleList, "a");
			expect(node.subCounter).to.be.eql(1);
			expect(node.children[0].subCounter).to.be.eql(1);
			expect(node.children[0].children[0].subCounter
			       ).to.be.eql(0);
			expect(node.children[0].children[0].e).to.be.eql("a");
			expect(node.children.length).to.be.eql(1);
		    });
	    });

	describe("add", function(){
		it('construct a tree of two elements (1 subpath)', function(){
			var tripleList = [];
			tripleList.push(new Triple(1,2,3));
			var root = new LSEQNode(tripleList, "a");
			var tripleList = [];
			tripleList.push(new Triple(4,5,6));
			tripleList.push(new Triple(7,8,9));
			var other = new LSEQNode(tripleList, "b");
			root.add(other);
			expect(root.subCounter).to.be.eql(1);
		    });
		
		it('construct a tree of two elements (2 subpath)', function(){
			var tripleList = [];
			tripleList.push(new Triple(1,2,3));
			var root = new LSEQNode(tripleList, "a");
			var tripleList = [];
			tripleList.push(new Triple(4,5,6));
			tripleList.push(new Triple(7,8,9));
			var b = new LSEQNode(tripleList, "b");
			root.add(b);
			var tripleList = [];
			tripleList.push(new Triple(4,5,6));
			tripleList.push(new Triple(10,11,12));
			var c = new LSEQNode(tripleList, "c");
			root.add(c);
			expect(root.subCounter).to.be.eql(2);
			expect(root.children.length).to.be.eql(1);
			expect(root.children[0].children.length).to.be.eql(2);
		    });
		it("construct a tree, verify if index are at right positions",
		   function(){
		       var root = new LSEQNode([],"a");
		       var tripleList = [];
		       tripleList.push(new Triple(1,1,1));
		       var b = new LSEQNode(tripleList, "b");
		       root.add(b);
		       var tripleList = [];
		       tripleList.push(new Triple(2,2,2));
		       tripleList.push(new Triple(3,3,3));
		       var c = new LSEQNode(tripleList, "c");
		       root.add(c);
		       var tripleList = [];
		       tripleList.push(new Triple(2,2,2));
		       tripleList.push(new Triple(4,4,4));
		       var d = new LSEQNode(tripleList, "d");
		       root.add(d);
		       expect(root.subCounter).to.be.eql(3);
		       expect(root.getIndex(b)).to.be.eql(1);
		       expect(root.getIndex(c)).to.be.eql(2);
		       expect(root.getIndex(d)).to.be.eql(3);
		   });
		it ('construct a tree and insert an element within existing branch',
		    function(){
			var root = new LSEQNode([],"a");
			var tripleList = [];
			tripleList.push(new Triple(1,1,1));
			tripleList.push(new Triple(3,3,3));
			var c = new LSEQNode(tripleList, "c");
			root.add(c);
			var tripleList = [];
			tripleList.push(new Triple(1,1,1));
			var b = new LSEQNode(tripleList, "b");
			root.add(b);
			expect(root.subCounter).to.be.eql(2);
		       	expect(root.getIndex(c)).to.be.eql(2);
			expect(root.getIndex(b)).to.be.eql(1);
		    });
	    });
	describe('get', function(){
		it('get the values at the given index in a simple tree',
		   function(){
		       var root = new LSEQNode([],"a");
		       var listTriple = [];
		       listTriple.push(new Triple(1,1,1));
		       var b = new LSEQNode(listTriple, "b");
		       root.add(b);
		       var listTriple = [];
		       listTriple.push(new Triple(2,2,2));
		       var c = new LSEQNode(listTriple, "c");
		       root.add(c);
		       expect(root.subCounter).to.be.eql(2);
		       expect(root.get(1)).to.be.eql(b);
		       expect(root.get(2)).to.be.eql(c);
		   });
 		it('get the values at the given index with tree of depth 2',
 		   function(){
 		       var root = new LSEQNode([],"a");
 		       var listTriple = [];
 		       listTriple.push(new Triple(1,1,1));
 		       var b = new LSEQNode(listTriple,"b");
 		       root.add(b);
 		       var listTriple = [];
 		       listTriple.push(new Triple(2,2,2));
 		       listTriple.push(new Triple(3,3,3));
 		       var d = new LSEQNode(listTriple,"d");
		       root.add(d);
 		       var listTriple = [];
 		       listTriple.push(new Triple(2,2,2));
 		       var c = new LSEQNode(listTriple,"c");
 		       root.add(c);
 		       var listTriple = [];
		       listTriple.push(new Triple(2,2,2));
 		       listTriple.push(new Triple(3,3,3));
		       var d = new LSEQNode(listTriple,"d");
 		       expect(root.get(1)).to.be.eql(b);
		       expect(root.get(2)).to.be.eql(c);
		       expect(root.get(3)).to.be.eql(d);
		   });
	    });
	
	describe('del',function(){
		it('should delete a node of the simple tree', function(){
			var root = new LSEQNode([],"a");
			var listTriple = [];
			listTriple.push(new Triple(1,1,1));
			var b = new LSEQNode(listTriple, "b");
			root.add(b);
			var listTriple = [];
			listTriple.push(new Triple(2,2,2));
			var c = new LSEQNode(listTriple, "c");
			root.add(c);
			expect(root.getIndex(c)).to.be.eql(2);
			root.del(b);
			expect(root.getIndex(c)).to.be.eql(1);
		    });

		it('should delete all intermediary nodes in a useless path',
		   function(){
		       var root = new LSEQNode([],"a");
		       var listTriple = [];
		       listTriple.push(new Triple(1,1,1));
		       listTriple.push(new Triple(2,2,2));
		       listTriple.push(new Triple(3,3,3));
		       var b = new LSEQNode(listTriple, "b");
		       root.add(b);
		       var listTriple = [];
		       listTriple.push(new Triple(1,1,1));
		       var c = new LSEQNode(listTriple, "c");
		       root.add(c);
		       var listTriple = [];
		       listTriple.push(new Triple(1,1,1));
		       listTriple.push(new Triple(2,2,2));
		       listTriple.push(new Triple(3,3,3));
		       var b = new LSEQNode(listTriple, "b");
		       expect(root.getIndex(c)).to.be.eql(1);
		       expect(root.getIndex(b)).to.be.eql(2);
		       root.del(b);
		       expect(root.getIndex(c)).to.be.eql(1);
		       expect(root.children[0].e).to.be.eql("c");
		       expect(root.children[0].children.length).to.be.eql(0);
		   });
		
		it('more complexe tree, remove the subtree but not all nodes',
		   function(){
		       var root = new LSEQNode([],"a");
                       var listTriple = [];
                       listTriple.push(new Triple(1,1,1));
                       listTriple.push(new Triple(2,2,2));
                       listTriple.push(new Triple(3,3,3));
                       var b = new LSEQNode(listTriple, "b");
                       root.add(b);
                       var listTriple = [];
                       listTriple.push(new Triple(1,1,1));
                       var c = new LSEQNode(listTriple, "c");
                       root.add(c);
                       var listTriple = [];
                       listTriple.push(new Triple(1,1,1));
                       listTriple.push(new Triple(2,2,2));
		       listTriple.push(new Triple(4,4,4));
                       listTriple.push(new Triple(5,5,5));
		       var d = new LSEQNode(listTriple, "d");
		       root.add(d);		       
		       // remove the elements
                       var listTriple = [];
                       listTriple.push(new Triple(1,1,1));
                       listTriple.push(new Triple(2,2,2));
                       listTriple.push(new Triple(3,3,3));
                       var b = new LSEQNode(listTriple, "b");
                       expect(root.getIndex(c)).to.be.eql(1);
                       expect(root.getIndex(b)).to.be.eql(2);
                       expect(root.getIndex(d)).to.be.eql(3);
                       root.del(b);
                       expect(root.getIndex(c)).to.be.eql(1);
                       expect(root.getIndex(d)).to.be.eql(2);
		   });
	    });
    });