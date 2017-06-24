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
    
    /**
     * Add a node to the current node.
     * @param {LSeqNode} node The node to add as a children of this node.
     * @return {Boolean} False if the element already exists, True otherwise.
     */
    add (node) {
        const index = this._binaryIndexOf(node);
        
        // #1 if the path do no exist, create it
        if (!this._contains(node)) {
            this.children.splice(-index, 0, node);
            this.subCounter += 1;
            // #2 otherwise, continue to explore the subtrees
        } else if (node.children.length === 0) {
            // #2a check if the element already exists
            if (this.children[index].e !== null){
                return false;
            } else {
                this.children[index].e = node.e;
                this.subCounter += 1;
            };
            // #3 if didnot exist, increment the counter
        } else if (!this.children[index].add(node.children[0])) {
            this.subCounter += 1;
        };
        return true;
    };


    /**
     * Remove the node of the tree and all node within path being useless.
     * @param {LSeqNode} node the node containing the path to remove
     * @return -1 if the node does not exist
     */
    del (node) {
        // (TODO) (TODO) (TODO) (TODO)
        
        var indexes = this.getIndexes(node),
            currentTree = this, i = 0, isSplitted = false;
        
        if (indexes === -1) { return -1; }; // it does not exists
        this.subCounter -= 1;
        while (i < indexes.length && !(isSplitted)){
            if (!(currentTree.children[indexes[i]].e !== null &&
                  i===(indexes.length - 1))){
                currentTree.children[indexes[i]].subCounter -= 1;     
            };
            if (currentTree.children[indexes[i]].subCounter <= 0
                && (currentTree.children[indexes[i]].e === null ||
                    (currentTree.children[indexes[i]].e !== null &&
                     i===(indexes.length - 1)))){
                currentTree.children.splice(indexes[i],1);
                isSplitted = true;
            };
            currentTree = currentTree.children[indexes[i]];
            ++i;
        };
        if (!isSplitted){ currentTree.e = null;};
    };


    /**
     * @private Get the list of indexes of the arrays representing the children
     * in the tree.  
     * @param {LSeqNode} node The node containing the path.
     * @return {Number[]} The successive indexes to get to the node.
     */
    _getIndexes (node) {
        function __getIndexes(indexes, currentTree, currentNode){
            if (!currentTree.contains(currentNode)) {
                return -1;
            };
            
            const index = currentTree.binaryIndexOf(currentNode);
            
            indexes.push(index);
            
            return ((currentNode.children.length===0 ||
                     currentTree.children.length===0) && indexes) ||
                __getIndexes(indexes,
                             currentTree.children[index],
                             currentNode.child);            
        };
        
        return __getIndexes([], this, node);
    };
    
    


    /**
     * @private from: [https://gist.github.com/Wolfy87/5734530] Performs a
     * binary search on the host array.
     * @param {LSeqNode} searchElement The item to search for within the array.
     * @return {Number} The index of the element which defaults to -1 when not
     * found.
     */
    _binaryIndexOf (searchElement) {
        let minIndex = 0;
        let maxIndex = this.children.length - 1;
        let currentIndex;
        let currentElement;
        
        while (minIndex <= maxIndex) {
            currentIndex = Math.floor((minIndex + maxIndex) / 2);
            currentElement = this.children[currentIndex];
            if (currentElement.compareTo(searchElement) < 0) {
                minIndex = currentIndex + 1;
            } else if (currentElement.compareTo(searchElement) > 0) {
                maxIndex = currentIndex - 1;
            } else {
                return currentIndex;
            };
        };
        return ~maxIndex;
    };

    /**
     * @private Check whether this node contains the searchElement as children.
     * @param {LSeqNode} searchElement The element to look for.
     * @return {Boolean} True if this node contains the node in its
     * children, False otherwise.
     */
    _contains (searchElement) {
        const index = this._binaryIndexOf(searchElement);
        return (this.children.length > 0) &&
            (index > 0 ||
             ((index === 0) &&
              this.children[0].compareTo(searchElement)===0));
    };
};

module.exports = LSeqNode;

