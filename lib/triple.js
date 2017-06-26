'use strict';

/**
 * Triple that contains <path; site; counter>. Identifiers of LSEQ are lists of
 * triples.
 */
class Triple {

    /**
     * @param {Number} path The part of the path in the tree.
     * @param {Number|String} site The unique site identifier that created the
     * triple.
     * @param {Number} counter The local counter of the site when it created the
     * triple.
     */       
    constructor (path, site, counter) {
        this.p = path;
        this.s = site;
        this.c = counter;
    };

    /**
     * Compare two triples prioritizing the path, then site, then counter.
     * @param {Triple} o the other triple to compare .
     * @returns {Number} -1 if this is lower than o, 1 if this is greater than
     * o, 0 otherwise.
     */
    compareTo (o) {
        // #1 process maximal virtual bounds
        if (this.s === Number.MAX_VALUE && this.c === Number.MAX_VALUE){
            return 1;
        };
        if (o.s === Number.MAX_VALUE && o.s === Number.MAX_VALUE){
            return -1;
        };
        // #2 compare p then s then c
        if (this.p < o.p) { return -1;};
        if (this.p > o.p) { return 1 ;};
        if (this.s < o.s) { return -1;};
        if (this.s > o.s) { return 1 ;};
        if (this.c < o.c) { return -1;};
        if (this.c > o.c) { return 1 ;};
        // #3 they are equal
        return 0;
    };
};

module.exports = Triple;
