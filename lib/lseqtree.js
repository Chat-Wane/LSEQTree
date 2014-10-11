var BI = require('BigInt');
var Base = require('./base.js').getInstance(15);
var S = require('./strategy.js').getInstance(10);
var C = require('./couple.js');
var ID = require('./identifier.js');
var Triple = require('./triple.js');
var LSEQNode = require('./lseqnode.js');

/*!
 * \class LSEQTree
 *
 * \brief Distributed array using LSEQ allocation strategy with an underlying
 * exponential tree model
 */
function LSEQTree(s){
    this._s = s;
    this._c = 0;
    this._hash = function(depth) { return depth%2; };
    this.length = 0;

    this.root = new LSEQNode([],null);
    var listTriple = []; listTriple.push(new Triple(0,0,0));  // min bound
    this.root.add(new LSEQNode(listTriple, ""));
    var listTriple = [];
    listTriple.push(new Triple(Math.pow(2,Base.getBitBase(0)+1)-1,
			       Number.MAX_VALUE,
			       Number.MAX_VALUE)); // max bound
    this.root.add(new LSEQNode(listTriple, ""));
};

/*!
 * \brief return the identifier and element at the targeted index
 * \param index the index of the couple in the array
 * \return a couple {_e: element, _i: identifier}
 */
LSEQTree.prototype.get = function(index){
    // #1 search in the tree to get the value
    return this.root.get(index); // +1 because @0 = root element
};

/*!
 * \brief insert a value at the targeted index
 * \param element the element to insert
 * \param index the position in the array
 * \return a couple {_e: element , _i: identifier}
 */
LSEQTree.prototype.insert = function(element, index){
    // #1a getting the bounds
    var pei = this.get(index);
    var qei = this.get(index+1);
    // #1b convert the bounds into biginteger
    var pi = new ID(null, [], []); pi.fromNode(pei);
    var qi = new ID(null, [], []); qi.fromNode(qei);
    // #2 generating the identifier between the bound
    this._c += 1;
    var id = this.alloc(pi, qi);
    // #3 add it to the structure and return value
    var couple = {_e: element, _i: id}
    this.applyInsert(element, id);
    return couple;
};

/*!
 * \brief delete the element at the index
 * \param index the index of the element to delete in the array
 * \return the identifier of the element at the index
 */
LSEQTree.prototype.remove = function(index){
    var ei = this.get(index+1);
    var i = new ID(null, [], []); i.fromNode(ei);
    this.applyRemove(i);
    return i;
};

/*!
 * \brief generate the digit part of the identifiers  between p and q
 * \param p the digit part of the previous identifier
 * \param q the digit part of the next identifier
 * \return the digit part located between p and q
 */
LSEQTree.prototype.alloc = function (p,q){
    // #1 process the level of the new identifier
    var interval = BI.int2bigInt(0,Base.getBitBase(0));
    var level = 0;
    while ( BI.isZero(interval) || BI.negative(interval) ){
	// no room for insertions
	interval = Base.getInterval(p, q, level);
	++level;
    };
    level -=1;
    var id = null;
    if (this._hash(level) == 0){
	id = S.bPlus(p,q,level,interval, this._s, this._c);
    } else {
	id = S.bMinus(p,q,level,interval, this._s, this._c);
    };
    return id;
};

/*!
 * \brief insert an element created from a remote site into the array
 * \param e the element to insert
 * \param i the identifier of the element
 * \return the index of the newly inserted element in the array
 */
LSEQTree.prototype.applyInsert = function(e, i){
    if (!(i instanceof ID)){
	i = new ID(i._d, i._s, i._c);
    };
    var node = i.toNode();
    var tempNode = node;
    while (tempNode.children.length != 0){
	tempNode = tempNode.children[0];
    }
    tempNode.e = e;
    var result = this.root.add(node);
    if (result != -1){
	this.length += 1;
	return (this.root.getIndex(node)-2);
    } else {
	return -1;
    };
};

/*!
 * \brief delete the element with the targeted identifier
 * \param i the identifier of the element
 * \return the index of the element feshly deleted
 */
LSEQTree.prototype.applyRemove = function(i){
    if (!(i instanceof ID)){
	i = new ID(i._d, i._s, i._c);
    };
    var node = i.toNode();
    var position = this.root.getIndex(node);
    this.root.del(node);
    this.length -= 1;
    return (position - 1); // (TODO) verify +-1
};

module.exports = LSEQTree;
