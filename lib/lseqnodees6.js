'use strict';

const Triple = require('./triple.js');

/**
 * A node of the LSeq tree.
 */
class LSeqNode {
    /**
     * @param {Triple[]} triples The list of triples composing the path to the
     * element.
     * @param {Object} element The element to insert in the structure, e.g., a
     * character in a text document.
     */
    constructor (triples, element) {
        this.t = triples.shift();
        this.e = (triples.length === 0 && element) || null;
        this.subCounter = (triples.length === 0 && 0) || 1;
        this.children = [];
        triples.length > 0 &&
            this.children.push(new LSeqNode(triples, element));
    };

    /**
     * Getter to the first child.
     * @returns {LSeqNode} The first child of this node. Null if it does not
     * exists.
     */
    get child () {
        return ((this.children.length > 0) && this.children[0]) || null;
    };

    /**
     * Comparator between to LSeqNodes.
     * @param {LSeqNode} o The other LSeqNode to compare to.
     */
    compareTo (o) {
        return this.t.compareTo(o.t);
    };

    
    
    
};

