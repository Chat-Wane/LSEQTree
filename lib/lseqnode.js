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
    constructor (triples = [], element = null) {
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
     * @return {Boolean} True if the node has been removed, False if it does not
     * exist.
     */
    del (node) {
        const indexes = this.getIndexes(node);
        let currentTree = this, i = 0, isSplitted = false;

        // #1 The element does not exists, stop
        if (indexes.length === 0) { return false; };

        // #2 Crawl the path and remove the element
        currentTree.subCounter -= 1;
        while (i < indexes.length && !(isSplitted)) {
            let isLast = currentTree.children[indexes[i]]._hasElement &&
                i === indexes.length - 1;
            if (!isLast) {
                currentTree.children[indexes[i]].subCounter -= 1;     
            };
            if (currentTree.children[indexes[i]].subCounter <= 0 &&
                (!currentTree.children[indexes[i]]._hasElement || isLast)) {
                currentTree.children.splice(indexes[i], 1);
                isSplitted = true;
            };
            currentTree = currentTree.children[indexes[i]];
            ++i;
        };
        if (!isSplitted){ currentTree.e = null;};

        return true;
    };


    /**
     * The ordered tree can be linearized into a sequence. This function get the
     * index of the path represented by the list of triples.
     * @param {LSeqNode} node The node containing -- at least -- the path to the
     * element.
     * @return {Number} The index of the node in the linearized sequence.
     */
    indexOf (node) {
        const indexes = this.getIndexes(node);
        let sum = 0, currentTree = this, j = 0;

        // #1 If the node does not exist, stop
        if (indexes.length === 0) { return -1; };

        // #2 Otherwise, start counting
        if (currentTree.hasElement) { sum += 1; };
        
        for (let i = 0; i<indexes.length; ++i) {
            if (indexes[i] < currentTree.children.length/2) {
                // #A start from the beginning [---->|     ]
                for (let j = 0; j < indexes[i]; ++j) {
                    if (currentTree.children[j].hasElement) { sum += 1; };
                    sum += currentTree.children[j].subCounter;
                };
            } else {
                // #B start from the end [     |<----]
                sum += currentTree.subCounter;
                for (let j = currentTree.children.length-1; j>=indexes[i]; --j){
                    if (currentTree.children[j].hasElement){ sum -= 1; };
                    sum -= currentTree.children[j].subCounter;
                };
                j += 1;
            };
            if (currentTree.children[j].hasElement) { sum += 1; };
            currentTree = currentTree.children[j];
        };
        return sum - 1; // -1 because algorithm counted the element itself
    };


    /**
     * The ordered tree can be linearized. This function gets the node at the
     * index in the projected sequence.
     * @param {Number} index The index in the sequence.
     * @return {LSeqNode} The node at the index.
     */
    get (index) {

        /**
         * @param {Number} leftSum The sum of all element at the left of the
         * current inspected node.
         * @param {LSeqNode} buildingNode The head part of the node being built
         * as we crawl.
         * @param {LSeqNode} queue The queue part of the node being built.
         * @param {LSeqNode} currentNode The subtree being crawled.
         */
        const _get = (leftSum, buildingNode, queue, currentNode) => {
            let startBeginning = true, useFunction, i = 0, p, temp;
            // #0 The node is found, return the incrementally built node and
            // praise the sun !
            if (leftSum === index && currentNode._hasElement) {
                // 1a copy the value of the element in the path
                queue.e = currentNode.e;
                return buildingNode;
            };
            if (currentNode._hasElement){ leftSum += 1; };
            
            // #1 search: do I start from the beginning or the end
            startBeginning = index-leftSum < currentNode.subCounter/2;
            if (startBeginning) {
                useFunction = (a, b) => a + b;
            } else {
                leftSum += currentNode.subCounter;
                useFunction = (a, b) => a - b;
            }
            
            // #2a counting the element from left to right
            if (!startBeginning) { i = currentNode.children.length - 1; };
            while ((startBeginning && leftSum <= index) ||
                   (!startBeginning && leftSum > index)) {
                if (currentNode.children[i]._hasElement) {
                    leftSum = useFunction(leftSum, 1);
                };
                leftSum = useFunction(leftSum,
                                      currentNode.children[i].subCounter);
                i = useFunction(i, 1);
            };
            
            // #2b decreasing the incrementation
            i = useFunction(i, -1);
            if (startBeginning) {
                if (currentNode.children[i]._hasElement) {
                    leftSum = useFunction(leftSum, -1);
                };
                leftSum = useFunction(leftSum,
                                      -currentNode.children[i].subCounter);
            };
            
            // #3 build path
            p = []; p.push(currentNode.children[i].t);
            if (buildingNode === null) {
                buildingNode = new LSeqNode(p, null);
                queue = buildingNode;
            } else {
                temp = new LSeqNode(p, null);
                queue.add(temp);
                queue = temp;
            };
            return _get(leftSum, buildingNode, queue, currentNode.children[i]);
        };
        return _get(0, null, null, this);
    };

    /**
     * Cast a JSON object to an LSeqNode. 
     * @param {Object} o The JSON object.
     * @return {LSeqNode} An LSeqNode.
     */
    static fromJSON (o) {
        let beingBuilt;

        // #1 leaf
        if (o.children.length === 0){
            beingBuilt = new LSeqNode([new Triple(o.t.p, o.t.s, o.t.c)], o.e);
        } else {
            // #2 branch
            beingBuilt = new LSeqNode([new Triple(o.t.p, o.t.s, o.t.c)]);
            beingBuilt.children.push(LSeqNode.fromJSON(o.children[0]));
        };
        
        return beingBuilt;
    };
    
    /**
     * @private Get the list of indexes of the arrays representing the children
     * in the tree.  
     * @param {LSeqNode} node The node containing the path.
     * @return {Number[]} The successive indexes to get to the node. An empty
     * list if the node does not exist.
     */
    _getIndexes (node) {
        const __getIndexes = (indexes, currentTree, currentNode) => {
            if (!currentTree.contains(currentNode)) {
                return [];
            };
            
            const index = currentTree.binaryIndexOf(currentNode);
            
            indexes.push(index);
            
            return ((currentNode.children.length === 0 ||
                     currentTree.children.length === 0) && indexes) ||
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

    /**
     * @private Check if the node contains an element.
     * @return {Boolean} True if the node has an element, false otherwise.
     */
    get _hasElement () {
        return this.e !== null;
    };

    /**
     * Check if the node has children.
     * @return {Boolean} True if the node has children, false otherwise.
     */
    get isLeaf () {
        return this.children.length === 0;
    };
    
};

module.exports = LSeqNode;

