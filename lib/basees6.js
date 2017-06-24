'use strict';

/**
 * Configuration and util class of the base, i.e. the maximal arity of the first
 * level of the tree.
 */
class Base {
    /**
     * @param {Number} [b = 3] The number of bits at level 0 of the dense space.
     */
    constructor (b = 3) {
        this._b = b;
    };

    /**
     * Process the number of bits usage at a certain level of dense space.
     * @param {Number} level The level in dense space, i.e., the number of
     * concatenations of the identifier.
     * @return {Number} The number of bit to encode a single path concatenation
     * at the depth in argument.
     */
    getBitBase (level) {
        return this._b + level;
    };

    /**
     * Process the total number of bits usage to get to a certain level.
     * @param {Number} level The level in dense space, i.e., the number of
     * concatenations of the identifier.
     * @return {Number} The number of bits required to encode the path
     * comprising level concatenations.
     */
    getSumBit (level) {
        const n = this.getBitBase(level);
        const m = this._b - 1;       
        return (n * (n + 1)) / 2 - (m * (m + 1) / 2);
    };

    /**
     * Process the number of possible paths between two LSEQNode.
     * @param {Number} level The depth of the tree to process.
     * @param {LSeqNode} [p] The previous LSeqNode.
     * @param {LSeqNode} [q] The next LSeqNode.
     * @return {Number} The interval between the two nodes at the depth in
     * argument.
     */
    getInterval (level, p, q) {               
        let sum = 0, i = 0,
            pIsGreater = false, commonRoot = true,
            prevValue = 0, nextValue = 0;
        
        while (i<=level){
            prevValue = (p && p.t.p) || 0;
            nextValue = (q && q.t.p) || 0;
            // #1 check if paths are identical
            if (commonRoot && prevValue !== nextValue){
                commonRoot = false;
                pIsGreater = prevValue > nextValue;
            }
            // #2 process the value to add to interval
            if (pIsGreater){ nextValue = Math.pow(2,this.getBitBase(i))-1; }
            if (commonRoot || pIsGreater || i!==level){
                sum += nextValue - prevValue; 
            } else {
                sum += nextValue - prevValue - 1;
            }
            if (i!==level){ sum *= Math.pow(2,this.getBitBase(i+1)); };
            // #3 iterate over path concatenations
            p = p && p.child || p;
            q = q && q.child || q;
            ++i;
        }
        return sum;
    };
    
};

module.exports = Base;
