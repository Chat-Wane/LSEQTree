'use strict';

const BI = require('BigInt');
const Triple = require('./triple.js');
const LSeqNode = require('./lseqnode.js');

/**
 * Unique and immutable identifier composed of digit, sources, counters.
 */
class Identifier {
    
    /**
     * @param {Base} base The base of identifiers.
     * @param {Number[]} digits The digit (position in dense space).
     * @param {Object[]} sites The list of sources.
     * @param {Number[]} counters The list of counters.
     */
    constructor (base, digits, sites = [], counters = []) {
        this._d = digits;
        this._s = sites;
        this._c = counters;
        
        this._base = base;
    };


    /**
     * Set the d,s,c values according to the node in argument
     * @param {LSeqNode} node The lseqnode containing the path in the tree
     * structure.
     * @return {Identifier} This identifier modified.
     */
    fromNode (node) {
        // #1 process the length of the path
        let length = 1, tempNode = node;
        
        while (!tempNode.isLeaf) {
	    ++length;
            tempNode = tempNode.child;
        };
        // #2 copy the values contained in the path
        this._d = BI.int2bigInt(0, this._base.getSumBit(length - 1));
        
        for (let i = 0; i < length ; ++i) {
            // #1a copy the site id
            this._s.push(node.t.s);
            // #1b copy the counter
            this._c.push(node.t.c);
            // #1c copy the digit
            BI.addInt_(this._d, node.t.p);
            if (i !== length - 1) {
                BI.leftShift_(this._d, this._base.getBitBase(i+1));
            };
            node = node.child;
        };
        
        return this;
    };
    
    /**
     * Convert the identifier into a node without element.
     * @param {Object} e The element associated with the node.
     * @return {LSeqNode} An LSeqNode containing the element and the path
     * extracted from this identifier.
     */
    toNode (e) {
        const dBitLength = this._base.getSumBit(this._c.length - 1);
        let resultPath = [], mine;
        
        // #1 deconstruct the digit 
        for (let i = 0; i < this._c.length; ++i) {
            // #1 truncate mine
            mine = BI.dup(this._d);
            // #1a shift right to erase the tail of the path
            BI.rightShift_(mine, dBitLength - this._base.getSumBit(i));
            // #1b copy value in the result
            resultPath.push(
                new Triple(BI.modInt(mine,
                                     Math.pow(2, this._base.getBitBase(i))),
                           this._s[i],
                           this._c[i]));
        };
        return new LSeqNode(resultPath, e);
    };


    /**
     * Compare two identifiers.
     * @param {Identifier} o The other identifier.
     * @return {Integer} -1 if this is lower, 0 if they are equal, 1 if this is
     * greater.
     */
    compareTo (o) {
        let dBitLength = this._base.getSumBit(this._c.length - 1),
            odBitLength = this._base.getSumBit(o._c.length - 1),
            comparing = true,
            result = 0, i = 0,
            sum, mine, other;
        
        // #1 Compare the list of <d,s,c>
        while (comparing && i < Math.min(this._c.length, o._c.length) ) {
            // can stop before the end of for loop wiz return
            sum = this._base.getSumBit(i);
            // #1a truncate mine
            mine = BI.dup(this._d);
            BI.rightShift_(mine, dBitLength - sum);
            // #1b truncate other
            other = BI.dup(o._d);
            BI.rightShift_(other, odBitLength - sum);
            // #2 Compare triples
            // #A digit
            if (!BI.equals(mine, other)) {
                if (BI.greater(mine, other)) {
                    result = 1;
                } else {
                    result = -1;
                };
                comparing = false;
            } else {
                // #B source
                result = this._s[i] - o._s[i]; 
                if (result !== 0) {
                    comparing = false;
                } else {
                    // #C counter
                    result = this._c[i] - o._c[i];
                    if (result !== 0) {
                        comparing = false;
                    };
                };
            };
            ++i;
        };
        
        // #3 compare list size
        if (result === 0){
            result = this._c.length - o._c.length;
        };
        
        return result;
    };    
};


module.exports = Identifier;
