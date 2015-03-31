var BI = require('BigInt');
var Base = require('./base.js')(15);
var S = require('./strategy.js')(10);
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
    var listTriple;
    
    this._s = s;
    this._c = 0;
    this._hash = function(depth) { return depth%2; };
    this.length = 0;

    this.root = new LSEQNode([],null);
    listTriple = []; listTriple.push(new Triple(0,0,0));  // min bound
    this.root.add(new LSEQNode(listTriple, ""));
    listTriple = [];
    listTriple.push(new Triple(Math.pow(2,Base.getBitBase(0))-1,
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
    return this.root.get(index);
};

/*!
 * \brief insert a value at the targeted index
 * \param element the element to insert
 * \param index the position in the array
 * \return a couple {_e: element , _i: identifier}
 */
LSEQTree.prototype.insert = function(element, index){
    var pei = this.get(index), // #1a previous bound
        qei = this.get(index+1), // #1b next bound
        id, couple;

    this._c += 1; // #2a incrementing the local counter
    id = this.alloc(pei, qei); // #2b generating the id inbetween the bounds
    // #3 add it to the structure and return value
    couple = {_e: element, _i: id}
    this.applyInsert(element, id);
    return couple;
};

/*!
 * \brief delete the element at the index
 * \param index the index of the element to delete in the array
 * \return the identifier of the element at the index
 */
LSEQTree.prototype.remove = function(index){
    var ei = this.get(index+1),
        i = new ID(null, [], []);

    i.fromNode(ei); // from node -> id
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
    var interval = 0, level = 0;
    
    // #1 process the level of the new identifier
    while (interval<=0){ // no room for insertion
        interval = Base.getInterval(p, q, level); // (TODO) optimize
        ++level;
    };
    level -= 1;
    if (this._hash(level) === 0){
        return S.bPlus(p,q,level,interval, this._s, this._c);
    } else {
        return S.bMinus(p,q,level,interval, this._s, this._c);
    };
};

/*!
 * \brief insert an element created from a remote site into the array
 * \param e the element to insert
 * \param i the identifier of the element
 * \return the index of the newly inserted element in the array
 */
LSEQTree.prototype.applyInsert = function(e, i){
    if (!(i  instanceof ID)){
        i = new ID(i._d, i._s, i._c);
    };

    var node = i.toNode(), // #1 from ID -> node
        tempNode = node,
        result;
    
    // #2 copy the element at the end of the path
    while (tempNode.children.length !== 0){ tempNode = tempNode.children[0]; };
    tempNode.e = e;
    // #3 integrates the new element to the data structure
    var result = this.root.add(node);
    if (result !== -1){
        // #3a if it exists, return the index of insertion
        this.length += 1;
        return this.root.indexOf(node);
    } else {
        // #3b return -1 otherwise
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
    var node = i.toNode(), // #1 convert id -> node        
        position = this.root.indexOf(node),
        result = this.root.del(node);
    
    if (result === -1){
        return -1;
    } else {
        this.length -= 1;
        return position;
    };
};

module.exports = LSEQTree;
