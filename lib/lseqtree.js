'use strict';

const merge = require('lodash.merge');
const Base = require('./base.js');
const Strategy = require('./strategy.js');
const Identifier = require('./identifier.js');
const Triple = require('./triple.js');
const LSeqNode = require('./lseqnode.js');


/**
 * Distributed array using LSeq allocation strategy with an underlying
 * exponential tree.
 */
class LSeqTree {

    /**
     * @param {Object} source The globally unique site identifier.
     * @param {Object} [options] The options of the LSeqTree.
     * @param {Number} [options.boundary = 10] The maximal interval between two
     * generated nodes.
     * @param {Number} [options.base = 15] The base, i.e., the maximal arity of
     * the root node. Default is 2**15.
     */
    constructor (site, options = {}) {
        let listTriple;
        // #0 process options
        this.options = merge({ boundary: 10, base: 15 }, options);

        // #1 initialize source, counter, and strategy choice
        this._s = site;
        this._c = 0;
        this._hash = (depth) => depth%2;

        this._base = new Base(this.options.base);
        this._strategy = new Strategy(this._base, this.options.boundary);

        // #2 initialize tree structure with maximal bounds
        this.root = new LSeqNode();
        // #A minimal bound
        this.root.add(new LSeqNode([new Triple(0,0,0)], ''));
        // #B maximal bound
        this.root.add(
            new LSeqNode([new Triple(Math.pow(2, this._base.getBitBase(0)) - 1,
                                     Number.MAX_VALUE,
                                     Number.MAX_VALUE)], ''));
    };

    
    get length () {
        let result = this.root.subCounter;
        result = (this.root._hasElement && result + 1) || result;
        return result;
    };
    
    /**
     * Get the element at targeted index in the linearized sequence. It does not
     * take into account the hidden boundaries of the sequence [MIN, e_1, e_2,
     * ... e_length, MAX], hence index of e_1 is 0.
     * @param {Number} index The index of the element in the flattened array.
     * @return {Object} The element located at the index in argument.
     */
    get (index) {
        let node = this.root.get(index + 1);
        while (!node.isLeaf){
            node = node.child;
        };
        return node.e;
    };
    
    /**
     * @private Get the LSeqNode at targeted index in the linearized
     * sequence. The sequence includes the hidden boundaries [MIN, e_1, e_2,
     * ... e_length, MAX], hence e_1's index is 1.
     * @param {Number} index The index of the element in the flattened array.
     * @return {LSeqNode} The LSeqNode targeting the element at index.
     */
    _get (index) {
        return this.root.get(index);
    };

    /**
     * Insert a value at the targeted index.
     * @param {Object} element The element to insert, e.g. a character if the
     * sequence is a string.
     * @param {Number} index The position in the array.
     * @return {Object} {_e: element of Object type, _i: Identifier}
     */
    insert (element, index) {
        const pei = this._get(index), // #1a previous bound
              qei = this._get(index+1); // #1b next bound

         // #2a incrementing the local counter
        this._c += 1;
        // #2b generating the id inbetween the bounds
        const id = this.alloc(pei, qei);

        // #3 add it to the structure and return value
        const pair = {elem: element, id: id};
        this.applyInsert(pair);
        return pair;
    };

    /**
     * Delete the element at the index.
     * @param {Number} index The index of the element to delete in the array.
     * @return {Identifier} The identifier of the element at the index.
     */
    remove (index) {
        const ei = this._get(index + 1);
        const i = new Identifier(this._base).fromNode(ei);
        this.applyRemove(ei);
        return i;
    };


    /**
     * Generate the digit part of the identifiers  between p and q.
     * @param {LSeqNode} p The digit part of the previous identifier.
     * @param {LSeqNode} q The digit part of the next identifier.
     * @return {Identifier} The new identifier located between p and q.
     */
    alloc (p, q) {
        let interval = 0, level = 0;
        // #1 process the level of the new identifier
        while (interval <= 0) { // no room for insertion
            interval = this._base.getInterval(level, p, q);
            ++level;
        };
        level -= 1;
        if (this._hash(level) === 0) {
            return this._strategy.bPlus(p, q,
                                        level, interval,
                                        this._s, this._c);
        } else {
            return this._strategy.bMinus(p, q,
                                         level, interval,
                                         this._s, this._c);
        };
    };
    
    
    /**
     * Insert an element created from a remote site into the array.
     * @param {Object} pair Pair containing the identifier and the element to
     * insert in the data structure.
     * @param {Identifier|LSeqNode} pair.id The identifier of the element.
     * @param {Object} pair.elem The element to insert.
     * @param {boolean} [noIndex = true] Whether or not it should return the
     * index of the insert.
     * @return {Number|Boolean} The index of the newly inserted element in the
     * array, if asked. -1 if the element already exists and has not been added.
     * If noIndex, returns true if the element has been added, false otherwise.
     */
    applyInsert (pair, noIndex = true) {
        let node, result, i;
        // #0 cast from the proper type
        // #0A the identifier is an Identifier
        i = pair.id;
        node =  i && i._d && i._s && i._c &&
            (new Identifier(this._base, i._d, i._s, i._c).toNode(pair.elem));
        // #0B the identifier is a LSeqNode
        node = (i && i.t && i.children && LSeqNode.fromJSON(i)) || node;
        // #1 integrates the new element to the data structure
        result = this.root.add(node);
        // #2 if the element as been added
        if (noIndex) {
            return result;
        } else if (result) {
            return this.root.indexOf(node);
        } else {
            return -1;
        };        
    };

    /**
     * Delete the element with the targeted identifier.
     * @param {Identifier|LSeqNode} i The identifier of the element.
     * @return {Number} The index of the element freshly deleted, -1 if no
     * removal.
     */
    applyRemove (i) {
        let node, position;
        // #0 cast from the proper type
        node = i && i._d && i._s && i._c &&
            (new Identifier(this._base, i._d, i._s, i._c)).toNode(null);
        // #0B the identifier is a LSEQNode
        node = (i && i.t && i.children && LSeqNode.fromJSON(i)) || node;
        // #1 get the index of the element to remove
        position = this.root.indexOf(node);
        if (position !== -1){
            // #2 if it exists remove it
            this.root.del(node);
        };
        return position;
    };

    /**
     * Cast the JSON object into a proper LSeqTree.
     * @param {Object} object the JSON object to cast.
     * @return {LSeqTree} A self reference.
     */
    fromJSON (object) {
        // #1 copy the source, counter, and length of the object
        this._s = object._s;
        this._c = object._c;
        this.options = object.options;

        this._base = new Base(this.options.base);
        this._boundary = new Strategy(this._base, this.options.boundary);
        
        // #2 depth first adding
        const depthFirst = (currentNode, currentPath) => {
            const triple = new Triple(currentNode.t.p,
                                      currentNode.t.s,
                                      currentNode.t.c);
            currentPath.push(triple); // stack
            if (currentNode.e !== null) {
                this.root.add(new LSeqNode(currentPath.slice(), currentNode.e));
            };
            for (let i = 0; i < currentNode.children.length; ++i) {
                depthFirst(currentNode.children[i], currentPath);
            };
            currentPath.pop(); // unstack
        };
        for (let i = 0; i < object.root.children.length; ++i){
            depthFirst(object.root.children[i], []);
        };
        return this;
    };    
    
};

module.exports = LSeqTree;
