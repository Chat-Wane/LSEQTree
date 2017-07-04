require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/**
 * Configuration and util class of the base, i.e. the maximal arity of the first
 * level of the tree.
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Base = function () {
    /**
     * @param {Number} [b = 3] The number of bits at level 0 of the dense space.
     */
    function Base() {
        var b = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;

        _classCallCheck(this, Base);

        this._b = b;
    }

    _createClass(Base, [{
        key: 'getBitBase',


        /**
         * Process the number of bits usage at a certain level of dense space.
         * @param {Number} level The level in dense space, i.e., the number of
         * concatenations of the identifier.
         * @return {Number} The number of bit to encode a single path concatenation
         * at the depth in argument.
         */
        value: function getBitBase(level) {
            return this._b + level;
        }
    }, {
        key: 'getSumBit',


        /**
         * Process the total number of bits usage to get to a certain level.
         * @param {Number} level The level in dense space, i.e., the number of
         * concatenations of the identifier.
         * @return {Number} The number of bits required to encode the path
         * comprising level concatenations.
         */
        value: function getSumBit(level) {
            var n = this.getBitBase(level);
            var m = this._b - 1;
            return n * (n + 1) / 2 - m * (m + 1) / 2;
        }
    }, {
        key: 'getInterval',


        /**
         * Process the number of possible paths between two LSEQNode.
         * @param {Number} level The depth of the tree to process.
         * @param {LSeqNode} p The previous LSeqNode.
         * @param {LSeqNode} q The next LSeqNode.
         * @return {Number} The interval between the two nodes at the depth in
         * argument.
         */
        value: function getInterval(level, p, q) {
            var sum = 0,
                i = 0,
                pIsGreater = false,
                commonRoot = true,
                prevValue = 0,
                nextValue = 0;

            while (i <= level) {
                prevValue = p && p.t.p || 0;
                nextValue = q && q.t.p || 0;
                // #1 check if paths are identical
                if (commonRoot && prevValue !== nextValue) {
                    commonRoot = false;
                    pIsGreater = prevValue > nextValue;
                }
                // #2 process the value to add to interval
                if (pIsGreater) {
                    nextValue = Math.pow(2, this.getBitBase(i)) - 1;
                }
                if (commonRoot || pIsGreater || i !== level) {
                    sum += nextValue - prevValue;
                } else {
                    sum += nextValue - prevValue - 1;
                }
                if (i !== level) {
                    sum *= Math.pow(2, this.getBitBase(i + 1));
                };
                // #3 iterate over path concatenations
                p = p && p.child || null;
                q = q && q.child || null;
                ++i;
            }
            return sum;
        }
    }]);

    return Base;
}();

;

module.exports = Base;

},{}],2:[function(require,module,exports){
'use strict';

/**
 * Thrown when the index is higher than the current length-1 of the array, or
 * lower than 0.
 */

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ExOutOfBounds =

/** 
 * @param {Number} index The index out of bounds.
 * @param {Number} size The size of the array.
 */
function ExOutOfBounds(index, size) {
  _classCallCheck(this, ExOutOfBounds);

  this.index = index;
  this.size = size;
};

;

module.exports = ExOutOfBounds;

},{}],3:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BI = require('BigInt');
var Triple = require('./triple.js');
var LSeqNode = require('./lseqnode.js');

/**
 * Unique and immutable identifier composed of digit, sources, counters.
 */

var Identifier = function () {

    /**
     * @param {Base} base The base of identifiers.
     * @param {Number[]} digits The digit (position in dense space).
     * @param {Object[]} sites The list of sources.
     * @param {Number[]} counters The list of counters.
     */
    function Identifier(base, digits) {
        var sites = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
        var counters = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

        _classCallCheck(this, Identifier);

        this._d = digits;
        this._s = sites;
        this._c = counters;

        this._base = base;
    }

    _createClass(Identifier, [{
        key: 'fromNode',


        /**
         * Set the d,s,c values according to the node in argument
         * @param {LSeqNode} node The lseqnode containing the path in the tree
         * structure.
         * @return {Identifier} This identifier modified.
         */
        value: function fromNode(node) {
            // #1 process the length of the path
            var length = 1,
                tempNode = node;

            while (!tempNode.isLeaf) {
                ++length;
                tempNode = tempNode.child;
            };
            // #2 copy the values contained in the path
            this._d = BI.int2bigInt(0, this._base.getSumBit(length - 1));

            for (var i = 0; i < length; ++i) {
                // #1a copy the site id
                this._s.push(node.t.s);
                // #1b copy the counter
                this._c.push(node.t.c);
                // #1c copy the digit
                BI.addInt_(this._d, node.t.p);
                if (i !== length - 1) {
                    BI.leftShift_(this._d, this._base.getBitBase(i + 1));
                };
                node = node.child;
            };

            return this;
        }
    }, {
        key: 'toNode',


        /**
         * Convert the identifier into a node without element.
         * @param {Object} e The element associated with the node.
         * @return {LSeqNode} An LSeqNode containing the element and the path
         * extracted from this identifier.
         */
        value: function toNode(e) {
            var dBitLength = this._base.getSumBit(this._c.length - 1);
            var resultPath = [],
                mine = void 0;

            // #1 deconstruct the digit 
            for (var i = 0; i < this._c.length; ++i) {
                // #1 truncate mine
                mine = BI.dup(this._d);
                // #1a shift right to erase the tail of the path
                BI.rightShift_(mine, dBitLength - this._base.getSumBit(i));
                // #1b copy value in the result
                resultPath.push(new Triple(BI.modInt(mine, Math.pow(2, this._base.getBitBase(i))), this._s[i], this._c[i]));
            };
            return new LSeqNode(resultPath, e);
        }
    }, {
        key: 'compareTo',


        /**
         * Compare two identifiers.
         * @param {Identifier} o The other identifier.
         * @return {Integer} -1 if this is lower, 0 if they are equal, 1 if this is
         * greater.
         */
        value: function compareTo(o) {
            var dBitLength = this._base.getSumBit(this._c.length - 1),
                odBitLength = this._base.getSumBit(o._c.length - 1),
                comparing = true,
                result = 0,
                i = 0,
                sum = void 0,
                mine = void 0,
                other = void 0;

            // #1 Compare the list of <d,s,c>
            while (comparing && i < Math.min(this._c.length, o._c.length)) {
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
            if (result === 0) {
                result = this._c.length - o._c.length;
            };

            return result;
        }
    }]);

    return Identifier;
}();

;

module.exports = Identifier;

},{"./lseqnode.js":4,"./triple.js":6,"BigInt":7}],4:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Triple = require('./triple.js');

/**
 * A node of the LSeq tree.
 */

var LSeqNode = function () {
    /**
     * @param {Triple[]} triples The list of triples composing the path to the
     * element.
     * @param {Object} element The element to insert in the structure, e.g., a
     * character in a text document.
     */
    function LSeqNode() {
        var triples = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
        var element = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

        _classCallCheck(this, LSeqNode);

        this.t = triples.shift();
        this.e = null;
        if (triples.length === 0) {
            this.e = element;
        };
        this.subCounter = triples.length > 0 && 1 || 0;
        this.children = [];
        triples.length > 0 && this.children.push(new LSeqNode(triples, element));
    }

    _createClass(LSeqNode, [{
        key: 'compareTo',


        /**
         * Comparator between to LSeqNodes.
         * @param {LSeqNode} o The other LSeqNode to compare to.
         */
        value: function compareTo(o) {
            return this.t.compareTo(o.t);
        }
    }, {
        key: 'add',


        /**
         * Add a node to the current node.
         * @param {LSeqNode} node The node to add as a children of this node.
         * @return {Boolean} False if the element already exists, True otherwise.
         */
        value: function add(node) {
            var index = this._binaryIndexOf(node);

            // #1 if the path do no exist, create it
            if (!this._contains(node)) {
                this.children.splice(-index, 0, node);
                this.subCounter += 1;
                // #2 otherwise, continue to explore the subtrees
            } else if (node.children.length === 0) {
                // #2a check if the element already exists
                if (this.children[index].e !== null) {
                    return false;
                } else {
                    this.children[index].e = node.e;
                    this.subCounter += 1;
                };
                // #3 if didnot exist, increment the counter
            } else if (this.children[index].add(node.child)) {
                this.subCounter += 1;
            };
            return true;
        }
    }, {
        key: 'del',


        /**
         * Remove the node of the tree and all node within path being useless.
         * @param {LSeqNode} node the node containing the path to remove
         * @return {Boolean} True if the node has been removed, False if it does not
         * exist.
         */
        value: function del(node) {
            var indexes = this._getIndexes(node);
            var currentTree = this,
                i = 0,
                isSplitted = false;

            // #1 The element does not exists, stop
            if (indexes.length === 0) {
                return false;
            };

            // #2 Crawl the path and remove the element
            currentTree.subCounter -= 1;
            while (i < indexes.length && !isSplitted) {
                var isLast = currentTree.children[indexes[i]]._hasElement && i === indexes.length - 1;
                if (!isLast) {
                    currentTree.children[indexes[i]].subCounter -= 1;
                };
                if (currentTree.children[indexes[i]].subCounter <= 0 && (!currentTree.children[indexes[i]]._hasElement || isLast)) {
                    currentTree.children.splice(indexes[i], 1);
                    isSplitted = true;
                };
                currentTree = currentTree.children[indexes[i]];
                ++i;
            };
            if (!isSplitted) {
                currentTree.e = null;
            };

            return true;
        }
    }, {
        key: 'indexOf',


        /**
         * The ordered tree can be linearized into a sequence. This function get the
         * index of the path represented by the list of triples.
         * @param {LSeqNode} node The node containing -- at least -- the path to the
         * element.
         * @return {Number} The index of the node in the linearized sequence; -1 if
         * the element does not exist.
         */
        value: function indexOf(node) {
            var indexes = this._getIndexes(node);
            var sum = 0,
                currentTree = this,
                j = void 0;

            // #1 If the node does not exist, stop
            if (indexes.length === 0) {
                return -1;
            };

            // #2 Otherwise, start counting
            if (currentTree._hasElement) {
                sum += 1;
            };

            for (var i = 0; i < indexes.length; ++i) {
                if (indexes[i] < currentTree.children.length / 2) {
                    // #A start from the beginning [---->|     ]
                    j = 0;
                    while (j < indexes[i]) {
                        if (currentTree.children[j]._hasElement) {
                            sum += 1;
                        };
                        sum += currentTree.children[j].subCounter;
                        ++j;
                    };
                } else {
                    // #B start from the end [     |<----]
                    sum += currentTree.subCounter;
                    j = currentTree.children.length - 1;
                    while (j >= indexes[i]) {
                        if (currentTree.children[j]._hasElement) {
                            sum -= 1;
                        };
                        sum -= currentTree.children[j].subCounter;
                        --j;
                    };
                    j += 1;
                };
                if (currentTree.children[j]._hasElement) {
                    sum += 1;
                };
                currentTree = currentTree.children[j];
            };
            return sum - 1; // -1 because algorithm counted the element itself
        }
    }, {
        key: 'get',


        /**
         * The ordered tree can be linearized. This function gets the node at the
         * index in the projected sequence.
         * @param {Number} index The index in the sequence.
         * @return {LSeqNode} The node at the index.
         */
        value: function get(index) {

            /**
             * @param {Number} leftSum The sum of all element at the left of the
             * current inspected node.
             * @param {LSeqNode} buildingNode The head part of the node being built
             * as we crawl.
             * @param {LSeqNode} queue The queue part of the node being built.
             * @param {LSeqNode} currentNode The subtree being crawled.
             */
            var _get = function _get(leftSum, buildingNode, queue, currentNode) {
                var startBeginning = true,
                    useFunction = void 0,
                    i = 0,
                    p = void 0,
                    temp = void 0;
                // #0 The node is found, return the incrementally built node and
                // praise the sun !
                if (leftSum === index && currentNode._hasElement) {
                    // 1a copy the value of the element in the path
                    queue.e = currentNode.e;
                    return buildingNode;
                };
                if (currentNode._hasElement) {
                    leftSum += 1;
                };

                // #1 search: do I start from the beginning or the end
                startBeginning = index - leftSum < currentNode.subCounter / 2;
                if (startBeginning) {
                    useFunction = function useFunction(a, b) {
                        return a + b;
                    };
                } else {
                    leftSum += currentNode.subCounter;
                    useFunction = function useFunction(a, b) {
                        return a - b;
                    };
                }

                // #2a counting the element from left to right
                if (!startBeginning) {
                    i = currentNode.children.length - 1;
                };
                while (startBeginning && leftSum <= index || !startBeginning && leftSum > index) {
                    if (currentNode.children[i]._hasElement) {
                        leftSum = useFunction(leftSum, 1);
                    };
                    leftSum = useFunction(leftSum, currentNode.children[i].subCounter);
                    i = useFunction(i, 1);
                };

                // #2b decreasing the incrementation
                i = useFunction(i, -1);
                if (startBeginning) {
                    if (currentNode.children[i]._hasElement) {
                        leftSum = useFunction(leftSum, -1);
                    };
                    leftSum = useFunction(leftSum, -currentNode.children[i].subCounter);
                };

                // #3 build path
                p = [];p.push(currentNode.children[i].t);
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
        }
    }, {
        key: '_getIndexes',


        /**
         * @private Get the list of indexes of the arrays representing the children
         * in the tree.  
         * @param {LSeqNode} node The node containing the path.
         * @return {Number[]} The successive indexes to get to the node. An empty
         * list if the node does not exist.
         */
        value: function _getIndexes(node) {
            var __getIndexes = function __getIndexes(indexes, currentTree, currentNode) {
                if (!currentTree._contains(currentNode)) {
                    return [];
                };

                var index = currentTree._binaryIndexOf(currentNode);

                indexes.push(index);

                return (currentNode.children.length === 0 || currentTree.children.length === 0) && indexes || __getIndexes(indexes, currentTree.children[index], currentNode.child);
            };

            return __getIndexes([], this, node);
        }
    }, {
        key: '_binaryIndexOf',


        /**
         * @private from: [https://gist.github.com/Wolfy87/5734530] Performs a
         * binary search on the host array.
         * @param {LSeqNode} searchElement The item to search for within the array.
         * @return {Number} The index of the element which defaults to -1 when not
         * found.
         */
        value: function _binaryIndexOf(searchElement) {
            var minIndex = 0;
            var maxIndex = this.children.length - 1;
            var currentIndex = void 0;
            var currentElement = void 0;

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
        }
    }, {
        key: '_contains',


        /**
         * @private Check whether this node contains the searchElement as children.
         * @param {LSeqNode} searchElement The element to look for.
         * @return {Boolean} True if this node contains the node in its
         * children, False otherwise.
         */
        value: function _contains(searchElement) {
            var index = this._binaryIndexOf(searchElement);
            return this.children.length > 0 && (index > 0 || index === 0 && this.child.compareTo(searchElement) === 0);
        }
    }, {
        key: 'child',


        /**
         * Getter to the first child.
         * @returns {LSeqNode} The first child of this node. Null if it does not
         * exists.
         */
        get: function get() {
            return this.children.length > 0 && this.children[0] || null;
        }
    }, {
        key: '_hasElement',


        /**
         * @private Check if the node contains an element.
         * @return {Boolean} True if the node has an element, false otherwise.
         */
        get: function get() {
            return this.e !== null;
        }
    }, {
        key: 'isLeaf',


        /**
         * Check if the node has children.
         * @return {Boolean} True if the node has children, false otherwise.
         */
        get: function get() {
            return this.children.length === 0;
        }
    }], [{
        key: 'fromJSON',


        /**
         * Cast a JSON object to an LSeqNode. 
         * @param {Object} o The JSON object.
         * @return {LSeqNode} An LSeqNode.
         */
        value: function fromJSON(o) {
            var beingBuilt = void 0;

            // #1 leaf
            if (o.children.length === 0) {
                beingBuilt = new LSeqNode([new Triple(o.t.p, o.t.s, o.t.c)], o.e);
            } else {
                // #2 branch
                beingBuilt = new LSeqNode([new Triple(o.t.p, o.t.s, o.t.c)]);
                beingBuilt.children.push(LSeqNode.fromJSON(o.children[0]));
            };

            return beingBuilt;
        }
    }]);

    return LSeqNode;
}();

;

module.exports = LSeqNode;

},{"./triple.js":6}],5:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BI = require('BigInt');
var Identifier = require('./identifier.js');

/**
 * Enumerate the available sub-allocation strategies. The signature of these
 * functions is f(Id, Id, N+, N+, N, N): Id.
 */

var Strategy = function () {
    /**
     * @param {Base} base The base used to create the new identifiers.
     * @param {Number} [boundary = 10] The value used as the default maximum
     * spacing between identifiers.
     */
    function Strategy(base) {
        var boundary = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

        _classCallCheck(this, Strategy);

        this._base = base;
        this._boundary = boundary;
    }

    _createClass(Strategy, [{
        key: 'bPlus',


        /**
         * Choose an identifier starting from previous bound and adding random
         * number.
         * @param {LSeqNode} p The previous identifier.
         * @param {LSeqNode} q The next identifier.
         * @param {Number} level The number of concatenation composing the new
         * identifier.
         * @param {Number} interval The interval between p and q.
         * @param {Object} s The source that creates the new identifier.
         * @param {Number} c The counter of that source.
         * @return {Identifier} The new allocated identifier.
         */
        value: function bPlus(p, q, level, interval, s, c) {
            var copyP = p,
                copyQ = q,
                step = Math.min(this._boundary, interval),
                //#0 the min interval
            digit = BI.int2bigInt(0, this._base.getSumBit(level)),
                value = void 0;

            // #1 copy the previous identifier
            for (var i = 0; i <= level; ++i) {
                value = p && p.t.p || 0;
                BI.addInt_(digit, value);
                if (i !== level) {
                    BI.leftShift_(digit, this._base.getBitBase(i + 1));
                };
                p = p && !p.isLeaf && p.child || null;
            };
            // #2 create a digit for an identifier by adding a random value
            // #A Digit
            BI.addInt_(digit, Math.floor(Math.random() * step + 1));
            // #B Source & counter
            return this._getSC(digit, copyP, copyQ, level, s, c);
        }
    }, {
        key: 'bMinus',


        /**
         * Choose an identifier starting from next bound and substract a random
         * number.
         * @param {LSeqNode} p The previous identifier.
         * @param {LSeqNode} q The next identifier.
         * @param {Number} level The number of concatenation composing the new
         * identifier.
         * @param {Number} interval The interval between p and q.
         * @param {Object} s The source that creates the new identifier.
         * @param {Number} c The counter of that source.
         */
        value: function bMinus(p, q, level, interval, s, c) {
            var copyP = p,
                copyQ = q,
                step = Math.min(this._boundary, interval),
                // #0 process min interval
            digit = BI.int2bigInt(0, this._base.getSumBit(level)),
                pIsGreater = false,
                commonRoot = true,
                prevValue = void 0,
                nextValue = void 0;

            // #1 copy next, if previous is greater, copy maxValue @ depth
            for (var i = 0; i <= level; ++i) {
                prevValue = p && p.t.p || 0;
                nextValue = q && q.t.p || 0;

                if (commonRoot && prevValue !== nextValue) {
                    commonRoot = false;
                    pIsGreater = prevValue > nextValue;
                };
                if (pIsGreater) {
                    nextValue = Math.pow(2, this._base.getBitBase(i)) - 1;
                };
                BI.addInt_(digit, nextValue);
                if (i !== level) {
                    BI.leftShift_(digit, this._base.getBitBase(i + 1));
                };

                q = q && !q.isLeaf && q.child || null;
                p = p && !p.isLeaf && p.child || null;
            };

            // #3 create a digit for an identifier by subing a random value
            // #A Digit
            if (pIsGreater) {
                BI.addInt_(digit, -Math.floor(Math.random() * step));
            } else {
                BI.addInt_(digit, -Math.floor(Math.random() * step) - 1);
            };

            // #B Source & counter
            return this._getSC(digit, copyP, copyQ, level, s, c);
        }
    }, {
        key: '_getSC',


        /**
         * Copies the appropriates source and counter from the adjacent identifiers
         * at the insertion position.
         * @param {Number} d The digit part of the new identifier.
         * @param {LSeqNode} p The previous identifier.
         * @param {LSeqNode} q the next identifier.
         * @param {Number} level The size of the new identifier.
         * @param {Object} s The local site identifier.
         * @param {Number} c The local monotonic counter.
         * @return {Identifier} The new allocated identifier.
         */
        value: function _getSC(d, p, q, level, s, c) {
            var sources = [],
                counters = [],
                i = 0,
                sumBit = this._base.getSumBit(level),
                tempDigit = void 0,
                value = void 0;

            while (i <= level) {
                tempDigit = BI.dup(d);
                BI.rightShift_(tempDigit, sumBit - this._base.getSumBit(i));
                value = BI.modInt(tempDigit, Math.pow(2, this._base.getBitBase(i)));
                sources[i] = s;
                counters[i] = c;

                if (q && q.t.p === value) {
                    sources[i] = q.t.s;counters[i] = q.t.c;
                };
                if (p && p.t.p === value) {
                    sources[i] = p.t.s;counters[i] = p.t.c;
                };

                q = q && !q.isLeaf && q.child || null;
                p = p && !p.isLeaf && p.child || null;

                ++i;
            };

            return new Identifier(this._base, d, sources, counters);
        }
    }]);

    return Strategy;
}();

;

module.exports = Strategy;

},{"./identifier.js":3,"BigInt":7}],6:[function(require,module,exports){
'use strict';

/**
 * Triple that contains <path; site; counter>. Identifiers of LSEQ are lists of
 * triples.
 */

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Triple = function () {

    /**
     * @param {Number} path The part of the path in the tree.
     * @param {Number|String} site The unique site identifier that created the
     * triple.
     * @param {Number} counter The local counter of the site when it created the
     * triple.
     */
    function Triple(path, site, counter) {
        _classCallCheck(this, Triple);

        this.p = path;
        this.s = site;
        this.c = counter;
    }

    _createClass(Triple, [{
        key: 'compareTo',


        /**
         * Compare two triples prioritizing the path, then site, then counter.
         * @param {Triple} o the other triple to compare .
         * @returns {Number} -1 if this is lower than o, 1 if this is greater than
         * o, 0 otherwise.
         */
        value: function compareTo(o) {
            // #1 process maximal virtual bounds
            if (this.s === Number.MAX_VALUE && this.c === Number.MAX_VALUE) {
                return 1;
            };
            if (o.s === Number.MAX_VALUE && o.s === Number.MAX_VALUE) {
                return -1;
            };
            // #2 compare p then s then c
            if (this.p < o.p) {
                return -1;
            };
            if (this.p > o.p) {
                return 1;
            };
            if (this.s < o.s) {
                return -1;
            };
            if (this.s > o.s) {
                return 1;
            };
            if (this.c < o.c) {
                return -1;
            };
            if (this.c > o.c) {
                return 1;
            };
            // #3 they are equal
            return 0;
        }
    }]);

    return Triple;
}();

;

module.exports = Triple;

},{}],7:[function(require,module,exports){
// Vjeux: Customized bigInt2str and str2bigInt in order to accept custom base.

////////////////////////////////////////////////////////////////////////////////////////
// Big Integer Library v. 5.4
// Created 2000, last modified 2009
// Leemon Baird
// www.leemon.com
//
// Version history:
// v 5.4  3 Oct 2009
//   - added "var i" to greaterShift() so i is not global. (Thanks to P�ter Szab� for finding that bug)
//
// v 5.3  21 Sep 2009
//   - added randProbPrime(k) for probable primes
//   - unrolled loop in mont_ (slightly faster)
//   - millerRabin now takes a bigInt parameter rather than an int
//
// v 5.2  15 Sep 2009
//   - fixed capitalization in call to int2bigInt in randBigInt
//     (thanks to Emili Evripidou, Reinhold Behringer, and Samuel Macaleese for finding that bug)
//
// v 5.1  8 Oct 2007
//   - renamed inverseModInt_ to inverseModInt since it doesn't change its parameters
//   - added functions GCD and randBigInt, which call GCD_ and randBigInt_
//   - fixed a bug found by Rob Visser (see comment with his name below)
//   - improved comments
//
// This file is public domain.   You can use it for any purpose without restriction.
// I do not guarantee that it is correct, so use it at your own risk.  If you use
// it for something interesting, I'd appreciate hearing about it.  If you find
// any bugs or make any improvements, I'd appreciate hearing about those too.
// It would also be nice if my name and URL were left in the comments.  But none
// of that is required.
//
// This code defines a bigInt library for arbitrary-precision integers.
// A bigInt is an array of integers storing the value in chunks of bpe bits,
// little endian (buff[0] is the least significant word).
// Negative bigInts are stored two's complement.  Almost all the functions treat
// bigInts as nonnegative.  The few that view them as two's complement say so
// in their comments.  Some functions assume their parameters have at least one
// leading zero element. Functions with an underscore at the end of the name put
// their answer into one of the arrays passed in, and have unpredictable behavior
// in case of overflow, so the caller must make sure the arrays are big enough to
// hold the answer.  But the average user should never have to call any of the
// underscored functions.  Each important underscored function has a wrapper function
// of the same name without the underscore that takes care of the details for you.
// For each underscored function where a parameter is modified, that same variable
// must not be used as another argument too.  So, you cannot square x by doing
// multMod_(x,x,n).  You must use squareMod_(x,n) instead, or do y=dup(x); multMod_(x,y,n).
// Or simply use the multMod(x,x,n) function without the underscore, where
// such issues never arise, because non-underscored functions never change
// their parameters; they always allocate new memory for the answer that is returned.
//
// These functions are designed to avoid frequent dynamic memory allocation in the inner loop.
// For most functions, if it needs a BigInt as a local variable it will actually use
// a global, and will only allocate to it only when it's not the right size.  This ensures
// that when a function is called repeatedly with same-sized parameters, it only allocates
// memory on the first call.
//
// Note that for cryptographic purposes, the calls to Math.random() must
// be replaced with calls to a better pseudorandom number generator.
//
// In the following, "bigInt" means a bigInt with at least one leading zero element,
// and "integer" means a nonnegative integer less than radix.  In some cases, integer
// can be negative.  Negative bigInts are 2s complement.
//
// The following functions do not modify their inputs.
// Those returning a bigInt, string, or Array will dynamically allocate memory for that value.
// Those returning a boolean will return the integer 0 (false) or 1 (true).
// Those returning boolean or int will not allocate memory except possibly on the first
// time they're called with a given parameter size.
//
// bigInt  add(x,y)               //return (x+y) for bigInts x and y.
// bigInt  addInt(x,n)            //return (x+n) where x is a bigInt and n is an integer.
// string  bigInt2str(x,base)     //return a string form of bigInt x in a given base, with 2 <= base <= 95
// int     bitSize(x)             //return how many bits long the bigInt x is, not counting leading zeros
// bigInt  dup(x)                 //return a copy of bigInt x
// boolean equals(x,y)            //is the bigInt x equal to the bigint y?
// boolean equalsInt(x,y)         //is bigint x equal to integer y?
// bigInt  expand(x,n)            //return a copy of x with at least n elements, adding leading zeros if needed
// Array   findPrimes(n)          //return array of all primes less than integer n
// bigInt  GCD(x,y)               //return greatest common divisor of bigInts x and y (each with same number of elements).
// boolean greater(x,y)           //is x>y?  (x and y are nonnegative bigInts)
// boolean greaterShift(x,y,shift)//is (x <<(shift*bpe)) > y?
// bigInt  int2bigInt(t,n,m)      //return a bigInt equal to integer t, with at least n bits and m array elements
// bigInt  inverseMod(x,n)        //return (x**(-1) mod n) for bigInts x and n.  If no inverse exists, it returns null
// int     inverseModInt(x,n)     //return x**(-1) mod n, for integers x and n.  Return 0 if there is no inverse
// boolean isZero(x)              //is the bigInt x equal to zero?
// boolean millerRabin(x,b)       //does one round of Miller-Rabin base integer b say that bigInt x is possibly prime? (b is bigInt, 1<b<x)
// boolean millerRabinInt(x,b)    //does one round of Miller-Rabin base integer b say that bigInt x is possibly prime? (b is int,    1<b<x)
// bigInt  mod(x,n)               //return a new bigInt equal to (x mod n) for bigInts x and n.
// int     modInt(x,n)            //return x mod n for bigInt x and integer n.
// bigInt  mult(x,y)              //return x*y for bigInts x and y. This is faster when y<x.
// bigInt  multMod(x,y,n)         //return (x*y mod n) for bigInts x,y,n.  For greater speed, let y<x.
// boolean negative(x)            //is bigInt x negative?
// bigInt  powMod(x,y,n)          //return (x**y mod n) where x,y,n are bigInts and ** is exponentiation.  0**0=1. Faster for odd n.
// bigInt  randBigInt(n,s)        //return an n-bit random BigInt (n>=1).  If s=1, then the most significant of those n bits is set to 1.
// bigInt  randTruePrime(k)       //return a new, random, k-bit, true prime bigInt using Maurer's algorithm.
// bigInt  randProbPrime(k)       //return a new, random, k-bit, probable prime bigInt (probability it's composite less than 2^-80).
// bigInt  str2bigInt(s,b,n,m)    //return a bigInt for number represented in string s in base b with at least n bits and m array elements
// bigInt  sub(x,y)               //return (x-y) for bigInts x and y.  Negative answers will be 2s complement
// bigInt  trim(x,k)              //return a copy of x with exactly k leading zero elements
//
//
// The following functions each have a non-underscored version, which most users should call instead.
// These functions each write to a single parameter, and the caller is responsible for ensuring the array
// passed in is large enough to hold the result.
//
// void    addInt_(x,n)          //do x=x+n where x is a bigInt and n is an integer
// void    add_(x,y)             //do x=x+y for bigInts x and y
// void    copy_(x,y)            //do x=y on bigInts x and y
// void    copyInt_(x,n)         //do x=n on bigInt x and integer n
// void    GCD_(x,y)             //set x to the greatest common divisor of bigInts x and y, (y is destroyed).  (This never overflows its array).
// boolean inverseMod_(x,n)      //do x=x**(-1) mod n, for bigInts x and n. Returns 1 (0) if inverse does (doesn't) exist
// void    mod_(x,n)             //do x=x mod n for bigInts x and n. (This never overflows its array).
// void    mult_(x,y)            //do x=x*y for bigInts x and y.
// void    multMod_(x,y,n)       //do x=x*y  mod n for bigInts x,y,n.
// void    powMod_(x,y,n)        //do x=x**y mod n, where x,y,n are bigInts (n is odd) and ** is exponentiation.  0**0=1.
// void    randBigInt_(b,n,s)    //do b = an n-bit random BigInt. if s=1, then nth bit (most significant bit) is set to 1. n>=1.
// void    randTruePrime_(ans,k) //do ans = a random k-bit true random prime (not just probable prime) with 1 in the msb.
// void    sub_(x,y)             //do x=x-y for bigInts x and y. Negative answers will be 2s complement.
//
// The following functions do NOT have a non-underscored version.
// They each write a bigInt result to one or more parameters.  The caller is responsible for
// ensuring the arrays passed in are large enough to hold the results.
//
// void addShift_(x,y,ys)       //do x=x+(y<<(ys*bpe))
// void carry_(x)               //do carries and borrows so each element of the bigInt x fits in bpe bits.
// void divide_(x,y,q,r)        //divide x by y giving quotient q and remainder r
// int  divInt_(x,n)            //do x=floor(x/n) for bigInt x and integer n, and return the remainder. (This never overflows its array).
// int  eGCD_(x,y,d,a,b)        //sets a,b,d to positive bigInts such that d = GCD_(x,y) = a*x-b*y
// void halve_(x)               //do x=floor(|x|/2)*sgn(x) for bigInt x in 2's complement.  (This never overflows its array).
// void leftShift_(x,n)         //left shift bigInt x by n bits.  n<bpe.
// void linComb_(x,y,a,b)       //do x=a*x+b*y for bigInts x and y and integers a and b
// void linCombShift_(x,y,b,ys) //do x=x+b*(y<<(ys*bpe)) for bigInts x and y, and integers b and ys
// void mont_(x,y,n,np)         //Montgomery multiplication (see comments where the function is defined)
// void multInt_(x,n)           //do x=x*n where x is a bigInt and n is an integer.
// void rightShift_(x,n)        //right shift bigInt x by n bits.  0 <= n < bpe. (This never overflows its array).
// void squareMod_(x,n)         //do x=x*x  mod n for bigInts x,n
// void subShift_(x,y,ys)       //do x=x-(y<<(ys*bpe)). Negative answers will be 2s complement.
//
// The following functions are based on algorithms from the _Handbook of Applied Cryptography_
//    powMod_()           = algorithm 14.94, Montgomery exponentiation
//    eGCD_,inverseMod_() = algorithm 14.61, Binary extended GCD_
//    GCD_()              = algorothm 14.57, Lehmer's algorithm
//    mont_()             = algorithm 14.36, Montgomery multiplication
//    divide_()           = algorithm 14.20  Multiple-precision division
//    squareMod_()        = algorithm 14.16  Multiple-precision squaring
//    randTruePrime_()    = algorithm  4.62, Maurer's algorithm
//    millerRabin()       = algorithm  4.24, Miller-Rabin algorithm
//
// Profiling shows:
//     randTruePrime_() spends:
//         10% of its time in calls to powMod_()
//         85% of its time in calls to millerRabin()
//     millerRabin() spends:
//         99% of its time in calls to powMod_()   (always with a base of 2)
//     powMod_() spends:
//         94% of its time in calls to mont_()  (almost always with x==y)
//
// This suggests there are several ways to speed up this library slightly:
//     - convert powMod_ to use a Montgomery form of k-ary window (or maybe a Montgomery form of sliding window)
//         -- this should especially focus on being fast when raising 2 to a power mod n
//     - convert randTruePrime_() to use a minimum r of 1/3 instead of 1/2 with the appropriate change to the test
//     - tune the parameters in randTruePrime_(), including c, m, and recLimit
//     - speed up the single loop in mont_() that takes 95% of the runtime, perhaps by reducing checking
//       within the loop when all the parameters are the same length.
//
// There are several ideas that look like they wouldn't help much at all:
//     - replacing trial division in randTruePrime_() with a sieve (that speeds up something taking almost no time anyway)
//     - increase bpe from 15 to 30 (that would help if we had a 32*32->64 multiplier, but not with JavaScript's 32*32->32)
//     - speeding up mont_(x,y,n,np) when x==y by doing a non-modular, non-Montgomery square
//       followed by a Montgomery reduction.  The intermediate answer will be twice as long as x, so that
//       method would be slower.  This is unfortunate because the code currently spends almost all of its time
//       doing mont_(x,x,...), both for randTruePrime_() and powMod_().  A faster method for Montgomery squaring
//       would have a large impact on the speed of randTruePrime_() and powMod_().  HAC has a couple of poorly-worded
//       sentences that seem to imply it's faster to do a non-modular square followed by a single
//       Montgomery reduction, but that's obviously wrong.
////////////////////////////////////////////////////////////////////////////////////////

(function () {
//globals
bpe=0;         //bits stored per array element
mask=0;        //AND this with an array element to chop it down to bpe bits
radix=mask+1;  //equals 2^bpe.  A single 1 bit to the left of the last bit of mask.

//the digits for converting to different bases
digitsStr='0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_=!@#$%^&*()[]{}|;:,.<>/?`~ \\\'\"+-';

//initialize the global variables
for (bpe=0; (1<<(bpe+1)) > (1<<bpe); bpe++);  //bpe=number of bits in the mantissa on this platform
bpe>>=1;                   //bpe=number of bits in one element of the array representing the bigInt
mask=(1<<bpe)-1;           //AND the mask with an integer to get its bpe least significant bits
radix=mask+1;              //2^bpe.  a single 1 bit to the left of the first bit of mask
one=int2bigInt(1,1,1);     //constant used in powMod_()

//the following global variables are scratchpad memory to
//reduce dynamic memory allocation in the inner loop
t=new Array(0);
ss=t;       //used in mult_()
s0=t;       //used in multMod_(), squareMod_()
s1=t;       //used in powMod_(), multMod_(), squareMod_()
s2=t;       //used in powMod_(), multMod_()
s3=t;       //used in powMod_()
s4=t; s5=t; //used in mod_()
s6=t;       //used in bigInt2str()
s7=t;       //used in powMod_()
T=t;        //used in GCD_()
sa=t;       //used in mont_()
mr_x1=t; mr_r=t; mr_a=t;                                      //used in millerRabin()
eg_v=t; eg_u=t; eg_A=t; eg_B=t; eg_C=t; eg_D=t;               //used in eGCD_(), inverseMod_()
md_q1=t; md_q2=t; md_q3=t; md_r=t; md_r1=t; md_r2=t; md_tt=t; //used in mod_()

primes=t; pows=t; s_i=t; s_i2=t; s_R=t; s_rm=t; s_q=t; s_n1=t;
  s_a=t; s_r2=t; s_n=t; s_b=t; s_d=t; s_x1=t; s_x2=t, s_aa=t; //used in randTruePrime_()

rpprb=t; //used in randProbPrimeRounds() (which also uses "primes")

////////////////////////////////////////////////////////////////////////////////////////


//return array of all primes less than integer n
function findPrimes(n) {
  var i,s,p,ans;
  s=new Array(n);
  for (i=0;i<n;i++)
    s[i]=0;
  s[0]=2;
  p=0;    //first p elements of s are primes, the rest are a sieve
  for(;s[p]<n;) {                  //s[p] is the pth prime
    for(i=s[p]*s[p]; i<n; i+=s[p]) //mark multiples of s[p]
      s[i]=1;
    p++;
    s[p]=s[p-1]+1;
    for(; s[p]<n && s[s[p]]; s[p]++); //find next prime (where s[p]==0)
  }
  ans=new Array(p);
  for(i=0;i<p;i++)
    ans[i]=s[i];
  return ans;
}


//does a single round of Miller-Rabin base b consider x to be a possible prime?
//x is a bigInt, and b is an integer, with b<x
function millerRabinInt(x,b) {
  if (mr_x1.length!=x.length) {
    mr_x1=dup(x);
    mr_r=dup(x);
    mr_a=dup(x);
  }

  copyInt_(mr_a,b);
  return millerRabin(x,mr_a);
}

//does a single round of Miller-Rabin base b consider x to be a possible prime?
//x and b are bigInts with b<x
function millerRabin(x,b) {
  var i,j,k,s;

  if (mr_x1.length!=x.length) {
    mr_x1=dup(x);
    mr_r=dup(x);
    mr_a=dup(x);
  }

  copy_(mr_a,b);
  copy_(mr_r,x);
  copy_(mr_x1,x);

  addInt_(mr_r,-1);
  addInt_(mr_x1,-1);

  //s=the highest power of two that divides mr_r
  k=0;
  for (i=0;i<mr_r.length;i++)
    for (j=1;j<mask;j<<=1)
      if (x[i] & j) {
        s=(k<mr_r.length+bpe ? k : 0);
         i=mr_r.length;
         j=mask;
      } else
        k++;

  if (s)
    rightShift_(mr_r,s);

  powMod_(mr_a,mr_r,x);

  if (!equalsInt(mr_a,1) && !equals(mr_a,mr_x1)) {
    j=1;
    while (j<=s-1 && !equals(mr_a,mr_x1)) {
      squareMod_(mr_a,x);
      if (equalsInt(mr_a,1)) {
        return 0;
      }
      j++;
    }
    if (!equals(mr_a,mr_x1)) {
      return 0;
    }
  }
  return 1;
}

//returns how many bits long the bigInt is, not counting leading zeros.
function bitSize(x) {
  var j,z,w;
  for (j=x.length-1; (x[j]==0) && (j>0); j--);
  for (z=0,w=x[j]; w; (w>>=1),z++);
  z+=bpe*j;
  return z;
}

//return a copy of x with at least n elements, adding leading zeros if needed
function expand(x,n) {
  var ans=int2bigInt(0,(x.length>n ? x.length : n)*bpe,0);
  copy_(ans,x);
  return ans;
}

//return a k-bit true random prime using Maurer's algorithm.
function randTruePrime(k) {
  var ans=int2bigInt(0,k,0);
  randTruePrime_(ans,k);
  return trim(ans,1);
}

//return a k-bit random probable prime with probability of error < 2^-80
function randProbPrime(k) {
  if (k>=600) return randProbPrimeRounds(k,2); //numbers from HAC table 4.3
  if (k>=550) return randProbPrimeRounds(k,4);
  if (k>=500) return randProbPrimeRounds(k,5);
  if (k>=400) return randProbPrimeRounds(k,6);
  if (k>=350) return randProbPrimeRounds(k,7);
  if (k>=300) return randProbPrimeRounds(k,9);
  if (k>=250) return randProbPrimeRounds(k,12); //numbers from HAC table 4.4
  if (k>=200) return randProbPrimeRounds(k,15);
  if (k>=150) return randProbPrimeRounds(k,18);
  if (k>=100) return randProbPrimeRounds(k,27);
              return randProbPrimeRounds(k,40); //number from HAC remark 4.26 (only an estimate)
}

//return a k-bit probable random prime using n rounds of Miller Rabin (after trial division with small primes)
function randProbPrimeRounds(k,n) {
  var ans, i, divisible, B;
  B=30000;  //B is largest prime to use in trial division
  ans=int2bigInt(0,k,0);

  //optimization: try larger and smaller B to find the best limit.

  if (primes.length==0)
    primes=findPrimes(30000);  //check for divisibility by primes <=30000

  if (rpprb.length!=ans.length)
    rpprb=dup(ans);

  for (;;) { //keep trying random values for ans until one appears to be prime
    //optimization: pick a random number times L=2*3*5*...*p, plus a
    //   random element of the list of all numbers in [0,L) not divisible by any prime up to p.
    //   This can reduce the amount of random number generation.

    randBigInt_(ans,k,0); //ans = a random odd number to check
    ans[0] |= 1;
    divisible=0;

    //check ans for divisibility by small primes up to B
    for (i=0; (i<primes.length) && (primes[i]<=B); i++)
      if (modInt(ans,primes[i])==0 && !equalsInt(ans,primes[i])) {
        divisible=1;
        break;
      }

    //optimization: change millerRabin so the base can be bigger than the number being checked, then eliminate the while here.

    //do n rounds of Miller Rabin, with random bases less than ans
    for (i=0; i<n && !divisible; i++) {
      randBigInt_(rpprb,k,0);
      while(!greater(ans,rpprb)) //pick a random rpprb that's < ans
        randBigInt_(rpprb,k,0);
      if (!millerRabin(ans,rpprb))
        divisible=1;
    }

    if(!divisible)
      return ans;
  }
}

//return a new bigInt equal to (x mod n) for bigInts x and n.
function mod(x,n) {
  var ans=dup(x);
  mod_(ans,n);
  return trim(ans,1);
}

//return (x+n) where x is a bigInt and n is an integer.
function addInt(x,n) {
  var ans=expand(x,x.length+1);
  addInt_(ans,n);
  return trim(ans,1);
}

//return x*y for bigInts x and y. This is faster when y<x.
function mult(x,y) {
  var ans=expand(x,x.length+y.length);
  mult_(ans,y);
  return trim(ans,1);
}

//return (x**y mod n) where x,y,n are bigInts and ** is exponentiation.  0**0=1. Faster for odd n.
function powMod(x,y,n) {
  var ans=expand(x,n.length);
  powMod_(ans,trim(y,2),trim(n,2),0);  //this should work without the trim, but doesn't
  return trim(ans,1);
}

//return (x-y) for bigInts x and y.  Negative answers will be 2s complement
function sub(x,y) {
  var ans=expand(x,(x.length>y.length ? x.length+1 : y.length+1));
  sub_(ans,y);
  return trim(ans,1);
}

//return (x+y) for bigInts x and y.
function add(x,y) {
  var ans=expand(x,(x.length>y.length ? x.length+1 : y.length+1));
  add_(ans,y);
  return trim(ans,1);
}

//return (x**(-1) mod n) for bigInts x and n.  If no inverse exists, it returns null
function inverseMod(x,n) {
  var ans=expand(x,n.length);
  var s;
  s=inverseMod_(ans,n);
  return s ? trim(ans,1) : null;
}

//return (x*y mod n) for bigInts x,y,n.  For greater speed, let y<x.
function multMod(x,y,n) {
  var ans=expand(x,n.length);
  multMod_(ans,y,n);
  return trim(ans,1);
}

//generate a k-bit true random prime using Maurer's algorithm,
//and put it into ans.  The bigInt ans must be large enough to hold it.
function randTruePrime_(ans,k) {
  var c,m,pm,dd,j,r,B,divisible,z,zz,recSize;

  if (primes.length==0)
    primes=findPrimes(30000);  //check for divisibility by primes <=30000

  if (pows.length==0) {
    pows=new Array(512);
    for (j=0;j<512;j++) {
      pows[j]=Math.pow(2,j/511.-1.);
    }
  }

  //c and m should be tuned for a particular machine and value of k, to maximize speed
  c=0.1;  //c=0.1 in HAC
  m=20;   //generate this k-bit number by first recursively generating a number that has between k/2 and k-m bits
  recLimit=20; //stop recursion when k <=recLimit.  Must have recLimit >= 2

  if (s_i2.length!=ans.length) {
    s_i2=dup(ans);
    s_R =dup(ans);
    s_n1=dup(ans);
    s_r2=dup(ans);
    s_d =dup(ans);
    s_x1=dup(ans);
    s_x2=dup(ans);
    s_b =dup(ans);
    s_n =dup(ans);
    s_i =dup(ans);
    s_rm=dup(ans);
    s_q =dup(ans);
    s_a =dup(ans);
    s_aa=dup(ans);
  }

  if (k <= recLimit) {  //generate small random primes by trial division up to its square root
    pm=(1<<((k+2)>>1))-1; //pm is binary number with all ones, just over sqrt(2^k)
    copyInt_(ans,0);
    for (dd=1;dd;) {
      dd=0;
      ans[0]= 1 | (1<<(k-1)) | Math.floor(Math.random()*(1<<k));  //random, k-bit, odd integer, with msb 1
      for (j=1;(j<primes.length) && ((primes[j]&pm)==primes[j]);j++) { //trial division by all primes 3...sqrt(2^k)
        if (0==(ans[0]%primes[j])) {
          dd=1;
          break;
        }
      }
    }
    carry_(ans);
    return;
  }

  B=c*k*k;    //try small primes up to B (or all the primes[] array if the largest is less than B).
  if (k>2*m)  //generate this k-bit number by first recursively generating a number that has between k/2 and k-m bits
    for (r=1; k-k*r<=m; )
      r=pows[Math.floor(Math.random()*512)];   //r=Math.pow(2,Math.random()-1);
  else
    r=.5;

  //simulation suggests the more complex algorithm using r=.333 is only slightly faster.

  recSize=Math.floor(r*k)+1;

  randTruePrime_(s_q,recSize);
  copyInt_(s_i2,0);
  s_i2[Math.floor((k-2)/bpe)] |= (1<<((k-2)%bpe));   //s_i2=2^(k-2)
  divide_(s_i2,s_q,s_i,s_rm);                        //s_i=floor((2^(k-1))/(2q))

  z=bitSize(s_i);

  for (;;) {
    for (;;) {  //generate z-bit numbers until one falls in the range [0,s_i-1]
      randBigInt_(s_R,z,0);
      if (greater(s_i,s_R))
        break;
    }                //now s_R is in the range [0,s_i-1]
    addInt_(s_R,1);  //now s_R is in the range [1,s_i]
    add_(s_R,s_i);   //now s_R is in the range [s_i+1,2*s_i]

    copy_(s_n,s_q);
    mult_(s_n,s_R);
    multInt_(s_n,2);
    addInt_(s_n,1);    //s_n=2*s_R*s_q+1

    copy_(s_r2,s_R);
    multInt_(s_r2,2);  //s_r2=2*s_R

    //check s_n for divisibility by small primes up to B
    for (divisible=0,j=0; (j<primes.length) && (primes[j]<B); j++)
      if (modInt(s_n,primes[j])==0 && !equalsInt(s_n,primes[j])) {
        divisible=1;
        break;
      }

    if (!divisible)    //if it passes small primes check, then try a single Miller-Rabin base 2
      if (!millerRabinInt(s_n,2)) //this line represents 75% of the total runtime for randTruePrime_
        divisible=1;

    if (!divisible) {  //if it passes that test, continue checking s_n
      addInt_(s_n,-3);
      for (j=s_n.length-1;(s_n[j]==0) && (j>0); j--);  //strip leading zeros
      for (zz=0,w=s_n[j]; w; (w>>=1),zz++);
      zz+=bpe*j;                             //zz=number of bits in s_n, ignoring leading zeros
      for (;;) {  //generate z-bit numbers until one falls in the range [0,s_n-1]
        randBigInt_(s_a,zz,0);
        if (greater(s_n,s_a))
          break;
      }                //now s_a is in the range [0,s_n-1]
      addInt_(s_n,3);  //now s_a is in the range [0,s_n-4]
      addInt_(s_a,2);  //now s_a is in the range [2,s_n-2]
      copy_(s_b,s_a);
      copy_(s_n1,s_n);
      addInt_(s_n1,-1);
      powMod_(s_b,s_n1,s_n);   //s_b=s_a^(s_n-1) modulo s_n
      addInt_(s_b,-1);
      if (isZero(s_b)) {
        copy_(s_b,s_a);
        powMod_(s_b,s_r2,s_n);
        addInt_(s_b,-1);
        copy_(s_aa,s_n);
        copy_(s_d,s_b);
        GCD_(s_d,s_n);  //if s_b and s_n are relatively prime, then s_n is a prime
        if (equalsInt(s_d,1)) {
          copy_(ans,s_aa);
          return;     //if we've made it this far, then s_n is absolutely guaranteed to be prime
        }
      }
    }
  }
}

//Return an n-bit random BigInt (n>=1).  If s=1, then the most significant of those n bits is set to 1.
function randBigInt(n,s) {
  var a,b;
  a=Math.floor((n-1)/bpe)+2; //# array elements to hold the BigInt with a leading 0 element
  b=int2bigInt(0,0,a);
  randBigInt_(b,n,s);
  return b;
}

//Set b to an n-bit random BigInt.  If s=1, then the most significant of those n bits is set to 1.
//Array b must be big enough to hold the result. Must have n>=1
function randBigInt_(b,n,s) {
  var i,a;
  for (i=0;i<b.length;i++)
    b[i]=0;
  a=Math.floor((n-1)/bpe)+1; //# array elements to hold the BigInt
  for (i=0;i<a;i++) {
    b[i]=Math.floor(Math.random()*(1<<(bpe-1)));
  }
  b[a-1] &= (2<<((n-1)%bpe))-1;
  if (s==1)
    b[a-1] |= (1<<((n-1)%bpe));
}

//Return the greatest common divisor of bigInts x and y (each with same number of elements).
function GCD(x,y) {
  var xc,yc;
  xc=dup(x);
  yc=dup(y);
  GCD_(xc,yc);
  return xc;
}

//set x to the greatest common divisor of bigInts x and y (each with same number of elements).
//y is destroyed.
function GCD_(x,y) {
  var i,xp,yp,A,B,C,D,q,sing;
  if (T.length!=x.length)
    T=dup(x);

  sing=1;
  while (sing) { //while y has nonzero elements other than y[0]
    sing=0;
    for (i=1;i<y.length;i++) //check if y has nonzero elements other than 0
      if (y[i]) {
        sing=1;
        break;
      }
    if (!sing) break; //quit when y all zero elements except possibly y[0]

    for (i=x.length;!x[i] && i>=0;i--);  //find most significant element of x
    xp=x[i];
    yp=y[i];
    A=1; B=0; C=0; D=1;
    while ((yp+C) && (yp+D)) {
      q =Math.floor((xp+A)/(yp+C));
      qp=Math.floor((xp+B)/(yp+D));
      if (q!=qp)
        break;
      t= A-q*C;   A=C;   C=t;    //  do (A,B,xp, C,D,yp) = (C,D,yp, A,B,xp) - q*(0,0,0, C,D,yp)
      t= B-q*D;   B=D;   D=t;
      t=xp-q*yp; xp=yp; yp=t;
    }
    if (B) {
      copy_(T,x);
      linComb_(x,y,A,B); //x=A*x+B*y
      linComb_(y,T,D,C); //y=D*y+C*T
    } else {
      mod_(x,y);
      copy_(T,x);
      copy_(x,y);
      copy_(y,T);
    }
  }
  if (y[0]==0)
    return;
  t=modInt(x,y[0]);
  copyInt_(x,y[0]);
  y[0]=t;
  while (y[0]) {
    x[0]%=y[0];
    t=x[0]; x[0]=y[0]; y[0]=t;
  }
}

//do x=x**(-1) mod n, for bigInts x and n.
//If no inverse exists, it sets x to zero and returns 0, else it returns 1.
//The x array must be at least as large as the n array.
function inverseMod_(x,n) {
  var k=1+2*Math.max(x.length,n.length);

  if(!(x[0]&1)  && !(n[0]&1)) {  //if both inputs are even, then inverse doesn't exist
    copyInt_(x,0);
    return 0;
  }

  if (eg_u.length!=k) {
    eg_u=new Array(k);
    eg_v=new Array(k);
    eg_A=new Array(k);
    eg_B=new Array(k);
    eg_C=new Array(k);
    eg_D=new Array(k);
  }

  copy_(eg_u,x);
  copy_(eg_v,n);
  copyInt_(eg_A,1);
  copyInt_(eg_B,0);
  copyInt_(eg_C,0);
  copyInt_(eg_D,1);
  for (;;) {
    while(!(eg_u[0]&1)) {  //while eg_u is even
      halve_(eg_u);
      if (!(eg_A[0]&1) && !(eg_B[0]&1)) { //if eg_A==eg_B==0 mod 2
        halve_(eg_A);
        halve_(eg_B);
      } else {
        add_(eg_A,n);  halve_(eg_A);
        sub_(eg_B,x);  halve_(eg_B);
      }
    }

    while (!(eg_v[0]&1)) {  //while eg_v is even
      halve_(eg_v);
      if (!(eg_C[0]&1) && !(eg_D[0]&1)) { //if eg_C==eg_D==0 mod 2
        halve_(eg_C);
        halve_(eg_D);
      } else {
        add_(eg_C,n);  halve_(eg_C);
        sub_(eg_D,x);  halve_(eg_D);
      }
    }

    if (!greater(eg_v,eg_u)) { //eg_v <= eg_u
      sub_(eg_u,eg_v);
      sub_(eg_A,eg_C);
      sub_(eg_B,eg_D);
    } else {                   //eg_v > eg_u
      sub_(eg_v,eg_u);
      sub_(eg_C,eg_A);
      sub_(eg_D,eg_B);
    }

    if (equalsInt(eg_u,0)) {
      if (negative(eg_C)) //make sure answer is nonnegative
        add_(eg_C,n);
      copy_(x,eg_C);

      if (!equalsInt(eg_v,1)) { //if GCD_(x,n)!=1, then there is no inverse
        copyInt_(x,0);
        return 0;
      }
      return 1;
    }
  }
}

//return x**(-1) mod n, for integers x and n.  Return 0 if there is no inverse
function inverseModInt(x,n) {
  var a=1,b=0,t;
  for (;;) {
    if (x==1) return a;
    if (x==0) return 0;
    b-=a*Math.floor(n/x);
    n%=x;

    if (n==1) return b; //to avoid negatives, change this b to n-b, and each -= to +=
    if (n==0) return 0;
    a-=b*Math.floor(x/n);
    x%=n;
  }
}

//this deprecated function is for backward compatibility only.
function inverseModInt_(x,n) {
   return inverseModInt(x,n);
}


//Given positive bigInts x and y, change the bigints v, a, and b to positive bigInts such that:
//     v = GCD_(x,y) = a*x-b*y
//The bigInts v, a, b, must have exactly as many elements as the larger of x and y.
function eGCD_(x,y,v,a,b) {
  var g=0;
  var k=Math.max(x.length,y.length);
  if (eg_u.length!=k) {
    eg_u=new Array(k);
    eg_A=new Array(k);
    eg_B=new Array(k);
    eg_C=new Array(k);
    eg_D=new Array(k);
  }
  while(!(x[0]&1)  && !(y[0]&1)) {  //while x and y both even
    halve_(x);
    halve_(y);
    g++;
  }
  copy_(eg_u,x);
  copy_(v,y);
  copyInt_(eg_A,1);
  copyInt_(eg_B,0);
  copyInt_(eg_C,0);
  copyInt_(eg_D,1);
  for (;;) {
    while(!(eg_u[0]&1)) {  //while u is even
      halve_(eg_u);
      if (!(eg_A[0]&1) && !(eg_B[0]&1)) { //if A==B==0 mod 2
        halve_(eg_A);
        halve_(eg_B);
      } else {
        add_(eg_A,y);  halve_(eg_A);
        sub_(eg_B,x);  halve_(eg_B);
      }
    }

    while (!(v[0]&1)) {  //while v is even
      halve_(v);
      if (!(eg_C[0]&1) && !(eg_D[0]&1)) { //if C==D==0 mod 2
        halve_(eg_C);
        halve_(eg_D);
      } else {
        add_(eg_C,y);  halve_(eg_C);
        sub_(eg_D,x);  halve_(eg_D);
      }
    }

    if (!greater(v,eg_u)) { //v<=u
      sub_(eg_u,v);
      sub_(eg_A,eg_C);
      sub_(eg_B,eg_D);
    } else {                //v>u
      sub_(v,eg_u);
      sub_(eg_C,eg_A);
      sub_(eg_D,eg_B);
    }
    if (equalsInt(eg_u,0)) {
      if (negative(eg_C)) {   //make sure a (C)is nonnegative
        add_(eg_C,y);
        sub_(eg_D,x);
      }
      multInt_(eg_D,-1);  ///make sure b (D) is nonnegative
      copy_(a,eg_C);
      copy_(b,eg_D);
      leftShift_(v,g);
      return;
    }
  }
}


//is bigInt x negative?
function negative(x) {
  return ((x[x.length-1]>>(bpe-1))&1);
}


//is (x << (shift*bpe)) > y?
//x and y are nonnegative bigInts
//shift is a nonnegative integer
function greaterShift(x,y,shift) {
  var i, kx=x.length, ky=y.length;
  k=((kx+shift)<ky) ? (kx+shift) : ky;
  for (i=ky-1-shift; i<kx && i>=0; i++)
    if (x[i]>0)
      return 1; //if there are nonzeros in x to the left of the first column of y, then x is bigger
  for (i=kx-1+shift; i<ky; i++)
    if (y[i]>0)
      return 0; //if there are nonzeros in y to the left of the first column of x, then x is not bigger
  for (i=k-1; i>=shift; i--)
    if      (x[i-shift]>y[i]) return 1;
    else if (x[i-shift]<y[i]) return 0;
  return 0;
}

//is x > y? (x and y both nonnegative)
function greater(x,y) {
  var i;
  var k=(x.length<y.length) ? x.length : y.length;

  for (i=x.length;i<y.length;i++)
    if (y[i])
      return 0;  //y has more digits

  for (i=y.length;i<x.length;i++)
    if (x[i])
      return 1;  //x has more digits

  for (i=k-1;i>=0;i--)
    if (x[i]>y[i])
      return 1;
    else if (x[i]<y[i])
      return 0;
  return 0;
}

//divide x by y giving quotient q and remainder r.  (q=floor(x/y),  r=x mod y).  All 4 are bigints.
//x must have at least one leading zero element.
//y must be nonzero.
//q and r must be arrays that are exactly the same length as x. (Or q can have more).
//Must have x.length >= y.length >= 2.
function divide_(x,y,q,r) {
  var kx, ky;
  var i,j,y1,y2,c,a,b;
  copy_(r,x);
  for (ky=y.length;y[ky-1]==0;ky--); //ky is number of elements in y, not including leading zeros

  //normalize: ensure the most significant element of y has its highest bit set
  b=y[ky-1];
  for (a=0; b; a++)
    b>>=1;
  a=bpe-a;  //a is how many bits to shift so that the high order bit of y is leftmost in its array element
  leftShift_(y,a);  //multiply both by 1<<a now, then divide both by that at the end
  leftShift_(r,a);

  //Rob Visser discovered a bug: the following line was originally just before the normalization.
  for (kx=r.length;r[kx-1]==0 && kx>ky;kx--); //kx is number of elements in normalized x, not including leading zeros

  copyInt_(q,0);                      // q=0
  while (!greaterShift(y,r,kx-ky)) {  // while (leftShift_(y,kx-ky) <= r) {
    subShift_(r,y,kx-ky);             //   r=r-leftShift_(y,kx-ky)
    q[kx-ky]++;                       //   q[kx-ky]++;
  }                                   // }

  for (i=kx-1; i>=ky; i--) {
    if (r[i]==y[ky-1])
      q[i-ky]=mask;
    else
      q[i-ky]=Math.floor((r[i]*radix+r[i-1])/y[ky-1]);

    //The following for(;;) loop is equivalent to the commented while loop,
    //except that the uncommented version avoids overflow.
    //The commented loop comes from HAC, which assumes r[-1]==y[-1]==0
    //  while (q[i-ky]*(y[ky-1]*radix+y[ky-2]) > r[i]*radix*radix+r[i-1]*radix+r[i-2])
    //    q[i-ky]--;
    for (;;) {
      y2=(ky>1 ? y[ky-2] : 0)*q[i-ky];
      c=y2>>bpe;
      y2=y2 & mask;
      y1=c+q[i-ky]*y[ky-1];
      c=y1>>bpe;
      y1=y1 & mask;

      if (c==r[i] ? y1==r[i-1] ? y2>(i>1 ? r[i-2] : 0) : y1>r[i-1] : c>r[i])
        q[i-ky]--;
      else
        break;
    }

    linCombShift_(r,y,-q[i-ky],i-ky);    //r=r-q[i-ky]*leftShift_(y,i-ky)
    if (negative(r)) {
      addShift_(r,y,i-ky);         //r=r+leftShift_(y,i-ky)
      q[i-ky]--;
    }
  }

  rightShift_(y,a);  //undo the normalization step
  rightShift_(r,a);  //undo the normalization step
}

//do carries and borrows so each element of the bigInt x fits in bpe bits.
function carry_(x) {
  var i,k,c,b;
  k=x.length;
  c=0;
  for (i=0;i<k;i++) {
    c+=x[i];
    b=0;
    if (c<0) {
      b=-(c>>bpe);
      c+=b*radix;
    }
    x[i]=c & mask;
    c=(c>>bpe)-b;
  }
}

//return x mod n for bigInt x and integer n.
function modInt(x,n) {
  var i,c=0;
  for (i=x.length-1; i>=0; i--)
    c=(c*radix+x[i])%n;
  return c;
}

//convert the integer t into a bigInt with at least the given number of bits.
//the returned array stores the bigInt in bpe-bit chunks, little endian (buff[0] is least significant word)
//Pad the array with leading zeros so that it has at least minSize elements.
//There will always be at least one leading 0 element.
function int2bigInt(t,bits,minSize) {
  var i,k;
  k=Math.ceil(bits/bpe)+1;
  k=minSize>k ? minSize : k;
  buff=new Array(k);
  copyInt_(buff,t);
  return buff;
}

//return the bigInt given a string representation in a given base.
//Pad the array with leading zeros so that it has at least minSize elements.
//If base=-1, then it reads in a space-separated list of array elements in decimal.
//The array will always have at least one leading zero, unless base=-1.
function str2bigInt(s,b,minSize) {
  var d, i, j, base, str, x, y, kk;
  if (typeof b === 'string') {
	  base = b.length;
	  str = b;
  } else {
	  base = b;
	  str = digitsStr;
  }
  var k=s.length;
  if (base==-1) { //comma-separated list of array elements in decimal
    x=new Array(0);
    for (;;) {
      y=new Array(x.length+1);
      for (i=0;i<x.length;i++)
        y[i+1]=x[i];
      y[0]=parseInt(s,10);
      x=y;
      d=s.indexOf(',',0);
      if (d<1)
        break;
      s=s.substring(d+1);
      if (s.length==0)
        break;
    }
    if (x.length<minSize) {
      y=new Array(minSize);
      copy_(y,x);
      return y;
    }
    return x;
  }

  x=int2bigInt(0,base*k,0);
  for (i=0;i<k;i++) {
    d=str.indexOf(s.substring(i,i+1),0);
//    if (base<=36 && d>=36)  //convert lowercase to uppercase if base<=36
//      d-=26;
    if (d>=base || d<0) {   //ignore illegal characters
      continue;
    }
    multInt_(x,base);
    addInt_(x,d);
  }

  for (k=x.length;k>0 && !x[k-1];k--); //strip off leading zeros
  k=minSize>k+1 ? minSize : k+1;
  y=new Array(k);
  kk=k<x.length ? k : x.length;
  for (i=0;i<kk;i++)
    y[i]=x[i];
  for (;i<k;i++)
    y[i]=0;
  return y;
}

//is bigint x equal to integer y?
//y must have less than bpe bits
function equalsInt(x,y) {
  var i;
  if (x[0]!=y)
    return 0;
  for (i=1;i<x.length;i++)
    if (x[i])
      return 0;
  return 1;
}

//are bigints x and y equal?
//this works even if x and y are different lengths and have arbitrarily many leading zeros
function equals(x,y) {
  var i;
  var k=x.length<y.length ? x.length : y.length;
  for (i=0;i<k;i++)
    if (x[i]!=y[i])
      return 0;
  if (x.length>y.length) {
    for (;i<x.length;i++)
      if (x[i])
        return 0;
  } else {
    for (;i<y.length;i++)
      if (y[i])
        return 0;
  }
  return 1;
}

//is the bigInt x equal to zero?
function isZero(x) {
  var i;
  for (i=0;i<x.length;i++)
    if (x[i])
      return 0;
  return 1;
}

//convert a bigInt into a string in a given base, from base 2 up to base 95.
//Base -1 prints the contents of the array representing the number.
function bigInt2str(x,b) {
  var i,t,base,str,s="";
  if (typeof b === 'string') {
	  base = b.length;
	  str = b;
  } else {
	  base = b;
	  str = digitsStr;
  }

  if (s6.length!=x.length)
    s6=dup(x);
  else
    copy_(s6,x);

  if (base==-1) { //return the list of array contents
    for (i=x.length-1;i>0;i--)
      s+=x[i]+',';
    s+=x[0];
  }
  else { //return it in the given base
    while (!isZero(s6)) {
      t=divInt_(s6,base);  //t=s6 % base; s6=floor(s6/base);
      s=str.substring(t,t+1)+s;
    }
  }
  if (s.length==0)
    s=str[0];
  return s;
}

//returns a duplicate of bigInt x
function dup(x) {
  var i;
  buff=new Array(x.length);
  copy_(buff,x);
  return buff;
}

//do x=y on bigInts x and y.  x must be an array at least as big as y (not counting the leading zeros in y).
function copy_(x,y) {
  var i;
  var k=x.length<y.length ? x.length : y.length;
  for (i=0;i<k;i++)
    x[i]=y[i];
  for (i=k;i<x.length;i++)
    x[i]=0;
}

//do x=y on bigInt x and integer y.
function copyInt_(x,n) {
  var i,c;
  for (c=n,i=0;i<x.length;i++) {
    x[i]=c & mask;
    c>>=bpe;
  }
}

//do x=x+n where x is a bigInt and n is an integer.
//x must be large enough to hold the result.
function addInt_(x,n) {
  var i,k,c,b;
  x[0]+=n;
  k=x.length;
  c=0;
  for (i=0;i<k;i++) {
    c+=x[i];
    b=0;
    if (c<0) {
      b=-(c>>bpe);
      c+=b*radix;
    }
    x[i]=c & mask;
    c=(c>>bpe)-b;
    if (!c) return; //stop carrying as soon as the carry is zero
  }
}

//right shift bigInt x by n bits.  0 <= n < bpe.
function rightShift_(x,n) {
  var i;
  var k=Math.floor(n/bpe);
  if (k) {
    for (i=0;i<x.length-k;i++) //right shift x by k elements
      x[i]=x[i+k];
    for (;i<x.length;i++)
      x[i]=0;
    n%=bpe;
  }
  for (i=0;i<x.length-1;i++) {
    x[i]=mask & ((x[i+1]<<(bpe-n)) | (x[i]>>n));
  }
  x[i]>>=n;
}

//do x=floor(|x|/2)*sgn(x) for bigInt x in 2's complement
function halve_(x) {
  var i;
  for (i=0;i<x.length-1;i++) {
    x[i]=mask & ((x[i+1]<<(bpe-1)) | (x[i]>>1));
  }
  x[i]=(x[i]>>1) | (x[i] & (radix>>1));  //most significant bit stays the same
}

//left shift bigInt x by n bits.
function leftShift_(x,n) {
  var i;
  var k=Math.floor(n/bpe);
  if (k) {
    for (i=x.length; i>=k; i--) //left shift x by k elements
      x[i]=x[i-k];
    for (;i>=0;i--)
      x[i]=0;
    n%=bpe;
  }
  if (!n)
    return;
  for (i=x.length-1;i>0;i--) {
    x[i]=mask & ((x[i]<<n) | (x[i-1]>>(bpe-n)));
  }
  x[i]=mask & (x[i]<<n);
}

//do x=x*n where x is a bigInt and n is an integer.
//x must be large enough to hold the result.
function multInt_(x,n) {
  var i,k,c,b;
  if (!n)
    return;
  k=x.length;
  c=0;
  for (i=0;i<k;i++) {
    c+=x[i]*n;
    b=0;
    if (c<0) {
      b=-(c>>bpe);
      c+=b*radix;
    }
    x[i]=c & mask;
    c=(c>>bpe)-b;
  }
}

//do x=floor(x/n) for bigInt x and integer n, and return the remainder
function divInt_(x,n) {
  var i,r=0,s;
  for (i=x.length-1;i>=0;i--) {
    s=r*radix+x[i];
    x[i]=Math.floor(s/n);
    r=s%n;
  }
  return r;
}

//do the linear combination x=a*x+b*y for bigInts x and y, and integers a and b.
//x must be large enough to hold the answer.
function linComb_(x,y,a,b) {
  var i,c,k,kk;
  k=x.length<y.length ? x.length : y.length;
  kk=x.length;
  for (c=0,i=0;i<k;i++) {
    c+=a*x[i]+b*y[i];
    x[i]=c & mask;
    c>>=bpe;
  }
  for (i=k;i<kk;i++) {
    c+=a*x[i];
    x[i]=c & mask;
    c>>=bpe;
  }
}

//do the linear combination x=a*x+b*(y<<(ys*bpe)) for bigInts x and y, and integers a, b and ys.
//x must be large enough to hold the answer.
function linCombShift_(x,y,b,ys) {
  var i,c,k,kk;
  k=x.length<ys+y.length ? x.length : ys+y.length;
  kk=x.length;
  for (c=0,i=ys;i<k;i++) {
    c+=x[i]+b*y[i-ys];
    x[i]=c & mask;
    c>>=bpe;
  }
  for (i=k;c && i<kk;i++) {
    c+=x[i];
    x[i]=c & mask;
    c>>=bpe;
  }
}

//do x=x+(y<<(ys*bpe)) for bigInts x and y, and integers a,b and ys.
//x must be large enough to hold the answer.
function addShift_(x,y,ys) {
  var i,c,k,kk;
  k=x.length<ys+y.length ? x.length : ys+y.length;
  kk=x.length;
  for (c=0,i=ys;i<k;i++) {
    c+=x[i]+y[i-ys];
    x[i]=c & mask;
    c>>=bpe;
  }
  for (i=k;c && i<kk;i++) {
    c+=x[i];
    x[i]=c & mask;
    c>>=bpe;
  }
}

//do x=x-(y<<(ys*bpe)) for bigInts x and y, and integers a,b and ys.
//x must be large enough to hold the answer.
function subShift_(x,y,ys) {
  var i,c,k,kk;
  k=x.length<ys+y.length ? x.length : ys+y.length;
  kk=x.length;
  for (c=0,i=ys;i<k;i++) {
    c+=x[i]-y[i-ys];
    x[i]=c & mask;
    c>>=bpe;
  }
  for (i=k;c && i<kk;i++) {
    c+=x[i];
    x[i]=c & mask;
    c>>=bpe;
  }
}

//do x=x-y for bigInts x and y.
//x must be large enough to hold the answer.
//negative answers will be 2s complement
function sub_(x,y) {
  var i,c,k,kk;
  k=x.length<y.length ? x.length : y.length;
  for (c=0,i=0;i<k;i++) {
    c+=x[i]-y[i];
    x[i]=c & mask;
    c>>=bpe;
  }
  for (i=k;c && i<x.length;i++) {
    c+=x[i];
    x[i]=c & mask;
    c>>=bpe;
  }
}

//do x=x+y for bigInts x and y.
//x must be large enough to hold the answer.
function add_(x,y) {
  var i,c,k,kk;
  k=x.length<y.length ? x.length : y.length;
  for (c=0,i=0;i<k;i++) {
    c+=x[i]+y[i];
    x[i]=c & mask;
    c>>=bpe;
  }
  for (i=k;c && i<x.length;i++) {
    c+=x[i];
    x[i]=c & mask;
    c>>=bpe;
  }
}

//do x=x*y for bigInts x and y.  This is faster when y<x.
function mult_(x,y) {
  var i;
  if (ss.length!=2*x.length)
    ss=new Array(2*x.length);
  copyInt_(ss,0);
  for (i=0;i<y.length;i++)
    if (y[i])
      linCombShift_(ss,x,y[i],i);   //ss=1*ss+y[i]*(x<<(i*bpe))
  copy_(x,ss);
}

//do x=x mod n for bigInts x and n.
function mod_(x,n) {
  if (s4.length!=x.length)
    s4=dup(x);
  else
    copy_(s4,x);
  if (s5.length!=x.length)
    s5=dup(x);
  divide_(s4,n,s5,x);  //x = remainder of s4 / n
}

//do x=x*y mod n for bigInts x,y,n.
//for greater speed, let y<x.
function multMod_(x,y,n) {
  var i;
  if (s0.length!=2*x.length)
    s0=new Array(2*x.length);
  copyInt_(s0,0);
  for (i=0;i<y.length;i++)
    if (y[i])
      linCombShift_(s0,x,y[i],i);   //s0=1*s0+y[i]*(x<<(i*bpe))
  mod_(s0,n);
  copy_(x,s0);
}

//do x=x*x mod n for bigInts x,n.
function squareMod_(x,n) {
  var i,j,d,c,kx,kn,k;
  for (kx=x.length; kx>0 && !x[kx-1]; kx--);  //ignore leading zeros in x
  k=kx>n.length ? 2*kx : 2*n.length; //k=# elements in the product, which is twice the elements in the larger of x and n
  if (s0.length!=k)
    s0=new Array(k);
  copyInt_(s0,0);
  for (i=0;i<kx;i++) {
    c=s0[2*i]+x[i]*x[i];
    s0[2*i]=c & mask;
    c>>=bpe;
    for (j=i+1;j<kx;j++) {
      c=s0[i+j]+2*x[i]*x[j]+c;
      s0[i+j]=(c & mask);
      c>>=bpe;
    }
    s0[i+kx]=c;
  }
  mod_(s0,n);
  copy_(x,s0);
}

//return x with exactly k leading zero elements
function trim(x,k) {
  var i,y;
  for (i=x.length; i>0 && !x[i-1]; i--);
  y=new Array(i+k);
  copy_(y,x);
  return y;
}

//do x=x**y mod n, where x,y,n are bigInts and ** is exponentiation.  0**0=1.
//this is faster when n is odd.  x usually needs to have as many elements as n.
function powMod_(x,y,n) {
  var k1,k2,kn,np;
  if(s7.length!=n.length)
    s7=dup(n);

  //for even modulus, use a simple square-and-multiply algorithm,
  //rather than using the more complex Montgomery algorithm.
  if ((n[0]&1)==0) {
    copy_(s7,x);
    copyInt_(x,1);
    while(!equalsInt(y,0)) {
      if (y[0]&1)
        multMod_(x,s7,n);
      divInt_(y,2);
      squareMod_(s7,n);
    }
    return;
  }

  //calculate np from n for the Montgomery multiplications
  copyInt_(s7,0);
  for (kn=n.length;kn>0 && !n[kn-1];kn--);
  np=radix-inverseModInt(modInt(n,radix),radix);
  s7[kn]=1;
  multMod_(x ,s7,n);   // x = x * 2**(kn*bp) mod n

  if (s3.length!=x.length)
    s3=dup(x);
  else
    copy_(s3,x);

  for (k1=y.length-1;k1>0 & !y[k1]; k1--);  //k1=first nonzero element of y
  if (y[k1]==0) {  //anything to the 0th power is 1
    copyInt_(x,1);
    return;
  }
  for (k2=1<<(bpe-1);k2 && !(y[k1] & k2); k2>>=1);  //k2=position of first 1 bit in y[k1]
  for (;;) {
    if (!(k2>>=1)) {  //look at next bit of y
      k1--;
      if (k1<0) {
        mont_(x,one,n,np);
        return;
      }
      k2=1<<(bpe-1);
    }
    mont_(x,x,n,np);

    if (k2 & y[k1]) //if next bit is a 1
      mont_(x,s3,n,np);
  }
}


//do x=x*y*Ri mod n for bigInts x,y,n,
//  where Ri = 2**(-kn*bpe) mod n, and kn is the
//  number of elements in the n array, not
//  counting leading zeros.
//x array must have at least as many elemnts as the n array
//It's OK if x and y are the same variable.
//must have:
//  x,y < n
//  n is odd
//  np = -(n^(-1)) mod radix
function mont_(x,y,n,np) {
  var i,j,c,ui,t,ks;
  var kn=n.length;
  var ky=y.length;

  if (sa.length!=kn)
    sa=new Array(kn);

  copyInt_(sa,0);

  for (;kn>0 && n[kn-1]==0;kn--); //ignore leading zeros of n
  for (;ky>0 && y[ky-1]==0;ky--); //ignore leading zeros of y
  ks=sa.length-1; //sa will never have more than this many nonzero elements.

  //the following loop consumes 95% of the runtime for randTruePrime_() and powMod_() for large numbers
  for (i=0; i<kn; i++) {
    t=sa[0]+x[i]*y[0];
    ui=((t & mask) * np) & mask;  //the inner "& mask" was needed on Safari (but not MSIE) at one time
    c=(t+ui*n[0]) >> bpe;
    t=x[i];

    //do sa=(sa+x[i]*y+ui*n)/b   where b=2**bpe.  Loop is unrolled 5-fold for speed
    j=1;
    for (;j<ky-4;) { c+=sa[j]+ui*n[j]+t*y[j];   sa[j-1]=c & mask;   c>>=bpe;   j++;
                     c+=sa[j]+ui*n[j]+t*y[j];   sa[j-1]=c & mask;   c>>=bpe;   j++;
                     c+=sa[j]+ui*n[j]+t*y[j];   sa[j-1]=c & mask;   c>>=bpe;   j++;
                     c+=sa[j]+ui*n[j]+t*y[j];   sa[j-1]=c & mask;   c>>=bpe;   j++;
                     c+=sa[j]+ui*n[j]+t*y[j];   sa[j-1]=c & mask;   c>>=bpe;   j++; }
    for (;j<ky;)   { c+=sa[j]+ui*n[j]+t*y[j];   sa[j-1]=c & mask;   c>>=bpe;   j++; }
    for (;j<kn-4;) { c+=sa[j]+ui*n[j];          sa[j-1]=c & mask;   c>>=bpe;   j++;
                     c+=sa[j]+ui*n[j];          sa[j-1]=c & mask;   c>>=bpe;   j++;
                     c+=sa[j]+ui*n[j];          sa[j-1]=c & mask;   c>>=bpe;   j++;
                     c+=sa[j]+ui*n[j];          sa[j-1]=c & mask;   c>>=bpe;   j++;
                     c+=sa[j]+ui*n[j];          sa[j-1]=c & mask;   c>>=bpe;   j++; }
    for (;j<kn;)   { c+=sa[j]+ui*n[j];          sa[j-1]=c & mask;   c>>=bpe;   j++; }
    for (;j<ks;)   { c+=sa[j];                  sa[j-1]=c & mask;   c>>=bpe;   j++; }
    sa[j-1]=c & mask;
  }

  if (!greater(n,sa))
    sub_(sa,n);
  copy_(x,sa);
}

if (typeof module === 'undefined') {
	module = {};
}
BigInt = module.exports = {
	'add': add, 'addInt': addInt, 'bigInt2str': bigInt2str, 'bitSize': bitSize,
	'dup': dup, 'equals': equals, 'equalsInt': equalsInt, 'expand': expand,
	'findPrimes': findPrimes, 'GCD': GCD, 'greater': greater,
	'greaterShift': greaterShift, 'int2bigInt': int2bigInt,
	'inverseMod': inverseMod, 'inverseModInt': inverseModInt, 'isZero': isZero,
	'millerRabin': millerRabin, 'millerRabinInt': millerRabinInt, 'mod': mod,
	'modInt': modInt, 'mult': mult, 'multMod': multMod, 'negative': negative,
	'powMod': powMod, 'randBigInt': randBigInt, 'randTruePrime': randTruePrime,
	'randProbPrime': randProbPrime, 'str2bigInt': str2bigInt, 'sub': sub,
	'trim': trim, 'addInt_': addInt_, 'add_': add_, 'copy_': copy_,
	'copyInt_': copyInt_, 'GCD_': GCD_, 'inverseMod_': inverseMod_, 'mod_': mod_,
	'mult_': mult_, 'multMod_': multMod_, 'powMod_': powMod_,
	'randBigInt_': randBigInt_, 'randTruePrime_': randTruePrime_, 'sub_': sub_,
	'addShift_': addShift_, 'carry_': carry_, 'divide_': divide_,
	'divInt_': divInt_, 'eGCD_': eGCD_, 'halve_': halve_, 'leftShift_': leftShift_,
	'linComb_': linComb_, 'linCombShift_': linCombShift_, 'mont_': mont_,
	'multInt_': multInt_, 'rightShift_': rightShift_, 'squareMod_': squareMod_,
	'subShift_': subShift_, 'powMod_': powMod_, 'eGCD_': eGCD_,
	'inverseMod_': inverseMod_, 'GCD_': GCD_, 'mont_': mont_, 'divide_': divide_,
	'squareMod_': squareMod_, 'randTruePrime_': randTruePrime_,
	'millerRabin': millerRabin
};

})();

},{}],8:[function(require,module,exports){
(function (global){
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Adds the key-value `pair` to `map`.
 *
 * @private
 * @param {Object} map The map to modify.
 * @param {Array} pair The key-value pair to add.
 * @returns {Object} Returns `map`.
 */
function addMapEntry(map, pair) {
  // Don't return `map.set` because it's not chainable in IE 11.
  map.set(pair[0], pair[1]);
  return map;
}

/**
 * Adds `value` to `set`.
 *
 * @private
 * @param {Object} set The set to modify.
 * @param {*} value The value to add.
 * @returns {Object} Returns `set`.
 */
function addSetEntry(set, value) {
  // Don't return `set.add` because it's not chainable in IE 11.
  set.add(value);
  return set;
}

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array ? array.length : 0;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    getPrototype = overArg(Object.getPrototypeOf, Object),
    objectCreate = Object.create,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols,
    nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
    nativeKeys = overArg(Object.keys, Object),
    nativeMax = Math.max;

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  this.__data__ = new ListCache(entries);
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  return this.__data__['delete'](key);
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var cache = this.__data__;
  if (cache instanceof ListCache) {
    var pairs = cache.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      return this;
    }
    cache = this.__data__ = new MapCache(pairs);
  }
  cache.set(key, value);
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignMergeValue(object, key, value) {
  if ((value !== undefined && !eq(object[key], value)) ||
      (typeof key == 'number' && value === undefined && !(key in object))) {
    object[key] = value;
  }
}

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    object[key] = value;
  }
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @param {boolean} [isFull] Specify a clone including symbols.
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
  var result;
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      if (isHostObject(value)) {
        return object ? value : {};
      }
      result = initCloneObject(isFunc ? {} : value);
      if (!isDeep) {
        return copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, baseClone, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (!isArr) {
    var props = isFull ? getAllKeys(value) : keys(value);
  }
  arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, isDeep, isFull, customizer, key, value, stack));
  });
  return result;
}

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} prototype The object to inherit from.
 * @returns {Object} Returns the new object.
 */
function baseCreate(proto) {
  return isObject(proto) ? objectCreate(proto) : {};
}

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * The base implementation of `getTag`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  return objectToString.call(value);
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  if (!(isArray(source) || isTypedArray(source))) {
    var props = baseKeysIn(source);
  }
  arrayEach(props || source, function(srcValue, key) {
    if (props) {
      key = srcValue;
      srcValue = source[key];
    }
    if (isObject(srcValue)) {
      stack || (stack = new Stack);
      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
    }
    else {
      var newValue = customizer
        ? customizer(object[key], srcValue, (key + ''), object, source, stack)
        : undefined;

      if (newValue === undefined) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  });
}

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = object[key],
      srcValue = source[key],
      stacked = stack.get(srcValue);

  if (stacked) {
    assignMergeValue(object, key, stacked);
    return;
  }
  var newValue = customizer
    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
    : undefined;

  var isCommon = newValue === undefined;

  if (isCommon) {
    newValue = srcValue;
    if (isArray(srcValue) || isTypedArray(srcValue)) {
      if (isArray(objValue)) {
        newValue = objValue;
      }
      else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      }
      else {
        isCommon = false;
        newValue = baseClone(srcValue, true);
      }
    }
    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue);
      }
      else if (!isObject(objValue) || (srcIndex && isFunction(objValue))) {
        isCommon = false;
        newValue = baseClone(srcValue, true);
      }
      else {
        newValue = objValue;
      }
    }
    else {
      isCommon = false;
    }
  }
  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack['delete'](srcValue);
  }
  assignMergeValue(object, key, newValue);
}

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = array;
    return apply(func, this, otherArgs);
  };
}

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var result = new buffer.constructor(buffer.length);
  buffer.copy(result);
  return result;
}

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

/**
 * Creates a clone of `map`.
 *
 * @private
 * @param {Object} map The map to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned map.
 */
function cloneMap(map, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
  return arrayReduce(array, addMapEntry, new map.constructor);
}

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

/**
 * Creates a clone of `set`.
 *
 * @private
 * @param {Object} set The set to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned set.
 */
function cloneSet(set, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
  return arrayReduce(array, addSetEntry, new set.constructor);
}

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    assignValue(object, key, newValue === undefined ? source[key] : newValue);
  }
  return object;
}

/**
 * Copies own symbol properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Creates an array of the own enumerable symbol properties of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11,
// for data views in Edge < 14, and promises in Node.js.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = objectToString.call(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : undefined;

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, cloneFunc, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case dataViewTag:
      return cloneDataView(object, isDeep);

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      return cloneTypedArray(object, isDeep);

    case mapTag:
      return cloneMap(object, isDeep, cloneFunc);

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      return cloneRegExp(object);

    case setTag:
      return cloneSet(object, isDeep, cloneFunc);

    case symbolTag:
      return cloneSymbol(object);
  }
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) ||
      objectToString.call(value) != objectTag || isHostObject(value)) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return (typeof Ctor == 'function' &&
    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/**
 * Converts `value` to a plain object flattening inherited enumerable string
 * keyed properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject(value) {
  return copyObject(value, keysIn(value));
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

/**
 * This method is like `_.assign` except that it recursively merges own and
 * inherited enumerable string keyed properties of source objects into the
 * destination object. Source properties that resolve to `undefined` are
 * skipped if a destination value exists. Array and plain object properties
 * are merged recursively. Other objects and value types are overridden by
 * assignment. Source objects are applied from left to right. Subsequent
 * sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 0.5.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = {
 *   'a': [{ 'b': 2 }, { 'd': 4 }]
 * };
 *
 * var other = {
 *   'a': [{ 'c': 3 }, { 'e': 5 }]
 * };
 *
 * _.merge(object, other);
 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
 */
var merge = createAssigner(function(object, source, srcIndex) {
  baseMerge(object, source, srcIndex);
});

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = merge;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],"lseqtree":[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var merge = require('lodash.merge');

var Base = require('./base.js');
var Strategy = require('./strategy.js');
var Identifier = require('./identifier.js');
var Triple = require('./triple.js');
var LSeqNode = require('./lseqnode.js');

var ExOutOfBounds = require('./exoutofbounds.js');

/**
 * Distributed array using LSeq allocation strategy with an underlying
 * exponential tree.
 */

var LSeqTree = function () {

    /**
     * @param {Object} source The globally unique site identifier.
     * @param {Object} [options] The options of the LSeqTree.
     * @param {Number} [options.boundary = 10] The maximal interval between two
     * generated nodes.
     * @param {Number} [options.base = 15] The base, i.e., the maximal arity of
     * the root node. Default is 2**15.
     */
    function LSeqTree(site) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, LSeqTree);

        var listTriple = void 0;
        // #0 process options
        this.options = merge({ boundary: 10, base: 15 }, options);

        // #1 initialize source, counter, and strategy choice
        this._s = site;
        this._c = 0;
        this._hash = function (depth) {
            return depth % 2;
        };

        this._base = new Base(this.options.base);
        this._strategy = new Strategy(this._base, this.options.boundary);

        // #2 initialize tree structure with maximal bounds
        this.root = new LSeqNode();
        // #A minimal bound
        this.root.add(new LSeqNode([new Triple(0, 0, 0)], ''));
        // #B maximal bound
        this.root.add(new LSeqNode([new Triple(Math.pow(2, this._base.getBitBase(0)) - 1, Number.MAX_VALUE, Number.MAX_VALUE)], ''));
    }

    _createClass(LSeqTree, [{
        key: 'get',


        /**
         * Get the element at targeted index in the linearized sequence. It does not
         * take into account the hidden boundaries of the sequence [MIN, e_1, e_2,
         * ... e_length, MAX], hence index of e_1 is 0.
         * @param {Number} index The index of the element in the flattened array.
         * @return {Object} The element located at the index in argument.
         */
        value: function get(index) {
            if (index < 0 || index >= this.length) {
                throw new ExOutOfBounds(index, this.length);
            };

            var node = this.root.get(index + 1);
            while (!node.isLeaf) {
                node = node.child;
            };
            return node.e;
        }
    }, {
        key: '_get',


        /**
         * @private Get the LSeqNode at targeted index in the linearized
         * sequence. The sequence includes the hidden boundaries [MIN, e_1, e_2,
         * ... e_length, MAX], hence e_1's index is 1.
         * @param {Number} index The index of the element in the flattened array.
         * @return {LSeqNode} The LSeqNode targeting the element at index.
         */
        value: function _get(index) {
            if (index < 0 || index >= this.length + 2) {
                // +2: boundaries
                throw new ExOutOfBounds(index, this.length + 2);
            };

            return this.root.get(index);
        }
    }, {
        key: 'insert',


        /**
         * Insert a value at the targeted index.
         * @param {Object} element The element to insert, e.g. a character if the
         * sequence is a string.
         * @param {Number} index The position in the array.
         * @return {Object} {_e: element of Object type, _i: Identifier}
         */
        value: function insert(element, index) {
            var pei = this._get(index),
                // #1a previous bound
            qei = this._get(index + 1); // #1b next bound

            // #2a incrementing the local counter
            this._c += 1;
            // #2b generating the id inbetween the bounds
            var id = this.alloc(pei, qei);

            // #3 add it to the structure and return value
            var pair = { elem: element, id: id };
            this.applyInsert(pair);
            return pair;
        }
    }, {
        key: 'remove',


        /**
         * Delete the element at the index.
         * @param {Number} index The index of the element to delete in the array.
         * @return {Identifier} The identifier of the element at the index.
         */
        value: function remove(index) {
            var ei = this._get(index + 1);
            var i = new Identifier(this._base).fromNode(ei);
            this.applyRemove(ei);
            return i;
        }
    }, {
        key: 'alloc',


        /**
         * Generate the digit part of the identifiers  between p and q.
         * @param {LSeqNode} p The digit part of the previous identifier.
         * @param {LSeqNode} q The digit part of the next identifier.
         * @return {Identifier} The new identifier located between p and q.
         */
        value: function alloc(p, q) {
            var interval = 0,
                level = 0;
            // #1 process the level of the new identifier
            while (interval <= 0) {
                // no room for insertion
                interval = this._base.getInterval(level, p, q);
                ++level;
            };
            level -= 1;
            if (this._hash(level) === 0) {
                return this._strategy.bPlus(p, q, level, interval, this._s, this._c);
            } else {
                return this._strategy.bMinus(p, q, level, interval, this._s, this._c);
            };
        }
    }, {
        key: 'applyInsert',


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
        value: function applyInsert(pair) {
            var noIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            var node = void 0,
                result = void 0,
                i = void 0;
            // #0 cast from the proper type
            // #0A the identifier is an Identifier
            i = pair.id;
            node = i && i._d && i._s && i._c && new Identifier(this._base, i._d, i._s, i._c).toNode(pair.elem);
            // #0B the identifier is a LSeqNode
            node = i && i.t && i.children && LSeqNode.fromJSON(i) || node;
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
        }
    }, {
        key: 'applyRemove',


        /**
         * Delete the element with the targeted identifier.
         * @param {Identifier|LSeqNode} i The identifier of the element.
         * @return {Number} The index of the element freshly deleted, -1 if no
         * removal.
         */
        value: function applyRemove(i) {
            var node = void 0,
                position = void 0;
            // #0 cast from the proper type
            node = i && i._d && i._s && i._c && new Identifier(this._base, i._d, i._s, i._c).toNode(null);
            // #0B the identifier is a LSEQNode
            node = i && i.t && i.children && LSeqNode.fromJSON(i) || node;
            // #1 get the index of the element to remove
            position = this.root.indexOf(node);
            if (position !== -1) {
                // #2 if it exists remove it
                this.root.del(node);
            };
            return position;
        }
    }, {
        key: 'fromJSON',


        /**
         * Cast the JSON object into a proper LSeqTree.
         * @param {Object} object the JSON object to cast.
         * @return {LSeqTree} A self reference.
         */
        value: function fromJSON(object) {
            var _this = this;

            // #1 copy the source, counter, and length of the object
            this._s = object._s;
            this._c = object._c;
            this.options = object.options;

            this._base = new Base(this.options.base);
            this._boundary = new Strategy(this._base, this.options.boundary);

            // #2 depth first adding
            var depthFirst = function depthFirst(currentNode, currentPath) {
                var triple = new Triple(currentNode.t.p, currentNode.t.s, currentNode.t.c);
                currentPath.push(triple); // stack
                if (currentNode.e !== null) {
                    _this.root.add(new LSeqNode(currentPath.slice(), currentNode.e));
                };
                for (var i = 0; i < currentNode.children.length; ++i) {
                    depthFirst(currentNode.children[i], currentPath);
                };
                currentPath.pop(); // unstack
            };
            for (var i = 0; i < object.root.children.length; ++i) {
                depthFirst(object.root.children[i], []);
            };
            return this;
        }
    }, {
        key: 'length',
        get: function get() {
            var result = this.root.subCounter - 2; // -2: the boundaries
            result = this.root._hasElement && result + 1 || result;
            return result;
        }
    }]);

    return LSeqTree;
}();

;

module.exports = LSeqTree;

},{"./base.js":1,"./exoutofbounds.js":2,"./identifier.js":3,"./lseqnode.js":4,"./strategy.js":5,"./triple.js":6,"lodash.merge":8}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvYmFzZS5qcyIsImxpYi9leG91dG9mYm91bmRzLmpzIiwibGliL2lkZW50aWZpZXIuanMiLCJsaWIvbHNlcW5vZGUuanMiLCJsaWIvc3RyYXRlZ3kuanMiLCJsaWIvdHJpcGxlLmpzIiwibm9kZV9tb2R1bGVzL0JpZ0ludC9zcmMvQmlnSW50LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5tZXJnZS9pbmRleC5qcyIsImxpYi9sc2VxdHJlZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQUVBOzs7Ozs7Ozs7SUFJTSxJO0FBQ0Y7OztBQUdBLG9CQUFvQjtBQUFBLFlBQVAsQ0FBTyx1RUFBSCxDQUFHOztBQUFBOztBQUNoQixhQUFLLEVBQUwsR0FBVSxDQUFWO0FBQ0g7Ozs7OztBQUVEOzs7Ozs7O21DQU9ZLEssRUFBTztBQUNmLG1CQUFPLEtBQUssRUFBTCxHQUFVLEtBQWpCO0FBQ0g7Ozs7O0FBRUQ7Ozs7Ozs7a0NBT1csSyxFQUFPO0FBQ2QsZ0JBQU0sSUFBSSxLQUFLLFVBQUwsQ0FBZ0IsS0FBaEIsQ0FBVjtBQUNBLGdCQUFNLElBQUksS0FBSyxFQUFMLEdBQVUsQ0FBcEI7QUFDQSxtQkFBUSxLQUFLLElBQUksQ0FBVCxDQUFELEdBQWdCLENBQWhCLEdBQXFCLEtBQUssSUFBSSxDQUFULElBQWMsQ0FBMUM7QUFDSDs7Ozs7QUFFRDs7Ozs7Ozs7b0NBUWEsSyxFQUFPLEMsRUFBRyxDLEVBQUc7QUFDdEIsZ0JBQUksTUFBTSxDQUFWO0FBQUEsZ0JBQWEsSUFBSSxDQUFqQjtBQUFBLGdCQUNJLGFBQWEsS0FEakI7QUFBQSxnQkFDd0IsYUFBYSxJQURyQztBQUFBLGdCQUVJLFlBQVksQ0FGaEI7QUFBQSxnQkFFbUIsWUFBWSxDQUYvQjs7QUFJQSxtQkFBTyxLQUFLLEtBQVosRUFBbUI7QUFDZiw0QkFBYSxLQUFL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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQzdnREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDL3BFQTs7Ozs7O0FBRUEsSUFBTSxRQUFRLFFBQVEsY0FBUixDQUFkOztBQUVBLElBQU0sT0FBTyxRQUFRLFdBQVIsQ0FBYjtBQUNBLElBQU0sV0FBVyxRQUFRLGVBQVIsQ0FBakI7QUFDQSxJQUFNLGFBQWEsUUFBUSxpQkFBUixDQUFuQjtBQUNBLElBQU0sU0FBUyxRQUFRLGFBQVIsQ0FBZjtBQUNBLElBQU0sV0FBVyxRQUFRLGVBQVIsQ0FBakI7O0FBRUEsSUFBTSxnQkFBZ0IsUUFBUSxvQkFBUixDQUF0Qjs7QUFHQTs7Ozs7SUFJTSxROztBQUVGOzs7Ozs7OztBQVFBLHNCQUFhLElBQWIsRUFBaUM7QUFBQSxZQUFkLE9BQWMsdUVBQUosRUFBSTs7QUFBQTs7QUFDN0IsWUFBSSxtQkFBSjtBQUNBO0FBQ0EsYUFBSyxPQUFMLEdBQWUsTUFBTSxFQUFFLFVBQVUsRUFBWixFQUFnQixNQUFNLEVBQXRCLEVBQU4sRUFBa0MsT0FBbEMsQ0FBZjs7QUFFQTtBQUNBLGFBQUssRUFBTCxHQUFVLElBQVY7QUFDQSxhQUFLLEVBQUwsR0FBVSxDQUFWO0FBQ0EsYUFBSyxLQUFMLEdBQWEsVUFBQyxLQUFEO0FBQUEsbUJBQVcsUUFBTSxDQUFqQjtBQUFBLFNBQWI7O0FBRUEsYUFBSyxLQUFMLEdBQWEsSUFBSSxJQUFKLENBQVMsS0FBSyxPQUFMLENBQWEsSUFBdEIsQ0FBYjtBQUNBLGFBQUssU0FBTCxHQUFpQixJQUFJLFFBQUosQ0FBYSxLQUFLLEtBQWxCLEVBQXlCLEtBQUssT0FBTCxDQUFhLFFBQXRDLENBQWpCOztBQUVBO0FBQ0EsYUFBSyxJQUFMLEdBQVksSUFBSSxRQUFKLEVBQVo7QUFDQTtBQUNBLGFBQUssSUFBTCxDQUFVLEdBQVYsQ0FBYyxJQUFJLFFBQUosQ0FBYSxDQUFDLElBQUksTUFBSixDQUFXLENBQVgsRUFBYSxDQUFiLEVBQWUsQ0FBZixDQUFELENBQWIsRUFBa0MsRUFBbEMsQ0FBZDtBQUNBO0FBQ0EsYUFBSyxJQUFMLENBQVUsR0FBVixDQUNJLElBQUksUUFBSixDQUFhLENBQUMsSUFBSSxNQUFKLENBQVcsS0FBSyxHQUFMLENBQVMsQ0FBVCxFQUFZLEtBQUssS0FBTCxDQUFXLFVBQVgsQ0FBc0IsQ0FBdEIsQ0FBWixJQUF3QyxDQUFuRCxFQUNXLE9BQU8sU0FEbEIsRUFFVyxPQUFPLFNBRmxCLENBQUQsQ0FBYixFQUU2QyxFQUY3QyxDQURKO0FBSUg7Ozs7OztBQVNEOzs7Ozs7OzRCQU9LLEssRUFBTztBQUNSLGdCQUFJLFFBQVEsQ0FBUixJQUFhLFNBQVMsS0FBSyxNQUEvQixFQUF1QztBQUNuQyxzQkFBTSxJQUFJLGFBQUosQ0FBa0IsS0FBbEIsRUFBeUIsS0FBSyxNQUE5QixDQUFOO0FBQ0g7O0FBRUQsZ0JBQUksT0FBTyxLQUFLLElBQUwsQ0FBVSxHQUFWLENBQWMsUUFBUSxDQUF0QixDQUFYO0FBQ0EsbUJBQU8sQ0FBQyxLQUFLLE1BQWIsRUFBb0I7QUFDaEIsdUJBQU8sS0FBSyxLQUFaO0FBQ0g7QUFDRCxtQkFBTyxLQUFLLENBQVo7QUFDSDs7Ozs7QUFFRDs7Ozs7Ozs2QkFPTSxLLEVBQU87QUFDVCxnQkFBSSxRQUFRLENBQVIsSUFBYSxTQUFTLEtBQUssTUFBTCxHQUFjLENBQXhDLEVBQTJDO0FBQUU7QUFDekMsc0JBQU0sSUFBSSxhQUFKLENBQWtCLEtBQWxCLEVBQXlCLEtBQUssTUFBTCxHQUFjLENBQXZDLENBQU47QUFDSDs7QUFFRCxtQkFBTyxLQUFLLElBQUwsQ0FBVSxHQUFWLENBQWMsS0FBZCxDQUFQO0FBQ0g7Ozs7O0FBRUQ7Ozs7Ozs7K0JBT1EsTyxFQUFTLEssRUFBTztBQUNwQixnQkFBTSxNQUFNLEtBQUssSUFBTCxDQUFVLEtBQVYsQ0FBWjtBQUFBLGdCQUE4QjtBQUN4QixrQkFBTSxLQUFLLElBQUwsQ0FBVSxRQUFNLENBQWhCLENBRFosQ0FEb0IsQ0FFWTs7QUFFL0I7QUFDRCxpQkFBSyxFQUFMLElBQVcsQ0FBWDtBQUNBO0FBQ0EsZ0JBQU0sS0FBSyxLQUFLLEtBQUwsQ0FBVyxHQUFYLEVBQWdCLEdBQWhCLENBQVg7O0FBRUE7QUFDQSxnQkFBTSxPQUFPLEVBQUMsTUFBTSxPQUFQLEVBQWdCLElBQUksRUFBcEIsRUFBYjtBQUNBLGlCQUFLLFdBQUwsQ0FBaUIsSUFBakI7QUFDQSxtQkFBTyxJQUFQO0FBQ0g7Ozs7O0FBRUQ7Ozs7OytCQUtRLEssRUFBTztBQUNYLGdCQUFNLEtBQUssS0FBSyxJQUFMLENBQVUsUUFBUSxDQUFsQixDQUFYO0FBQ0EsZ0JBQU0sSUFBSSxJQUFJLFVBQUosQ0FBZSxLQUFLLEtBQXBCLEVBQTJCLFFBQTNCLENBQW9DLEVBQXBDLENBQVY7QUFDQSxpQkFBSyxXQUFMLENBQWlCLEVBQWpCO0FBQ0EsbUJBQU8sQ0FBUDtBQUNIOzs7OztBQUdEOzs7Ozs7OEJBTU8sQyxFQUFHLEMsRUFBRztBQUNULGdCQUFJLFdBQVcsQ0FBZjtBQUFBLGdCQUFrQixRQUFRLENBQTFCO0FBQ0E7QUFDQSxtQkFBTyxZQUFZLENBQW5CLEVBQXNCO0FBQUU7QUFDcEIsMkJBQVcsS0FBSyxLQUFMLENBQVcsV0FBWCxDQUF1QixLQUF2QixFQUE4QixDQUE5QixFQUFpQyxDQUFqQyxDQUFYO0FBQ0Esa0JBQUUsS0FBRjtBQUNIO0FBQ0QscUJBQVMsQ0FBVDtBQUNBLGdCQUFJLEtBQUssS0FBTCxDQUFXLEtBQVgsTUFBc0IsQ0FBMUIsRUFBNkI7QUFDekIsdUJBQU8sS0FBSyxTQUFMLENBQWUsS0FBZixDQUFxQixDQUFyQixFQUF3QixDQUF4QixFQUNxQixLQURyQixFQUM0QixRQUQ1QixFQUVxQixLQUFLLEVBRjFCLEVBRThCLEtBQUssRUFGbkMsQ0FBUDtBQUdILGFBSkQsTUFJTztBQUNILHVCQUFPLEtBQUssU0FBTCxDQUFlLE1BQWYsQ0FBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFDc0IsS0FEdEIsRUFDNkIsUUFEN0IsRUFFc0IsS0FBSyxFQUYzQixFQUUrQixLQUFLLEVBRnBDLENBQVA7QUFHSDtBQUNKOzs7OztBQUdEOzs7Ozs7Ozs7Ozs7b0NBWWEsSSxFQUFzQjtBQUFBLGdCQUFoQixPQUFnQix1RUFBTixJQUFNOztBQUMvQixnQkFBSSxhQUFKO0FBQUEsZ0JBQVUsZUFBVjtBQUFBLGdCQUFrQixVQUFsQjtBQUNBO0FBQ0E7QUFDQSxnQkFBSSxLQUFLLEVBQVQ7QUFDQSxtQkFBUSxLQUFLLEVBQUUsRUFBUCxJQUFhLEVBQUUsRUFBZixJQUFxQixFQUFFLEVBQXZCLElBQ0gsSUFBSSxVQUFKLENBQWUsS0FBSyxLQUFwQixFQUEyQixFQUFFLEVBQTdCLEVBQWlDLEVBQUUsRUFBbkMsRUFBdUMsRUFBRSxFQUF6QyxFQUE2QyxNQUE3QyxDQUFvRCxLQUFLLElBQXpELENBREw7QUFFQTtBQUNBLG1CQUFRLEtBQUssRUFBRSxDQUFQLElBQVksRUFBRSxRQUFkLElBQTBCLFNBQVMsUUFBVCxDQUFrQixDQUFsQixDQUEzQixJQUFvRCxJQUEzRDtBQUNBO0FBQ0EscUJBQVMsS0FBSyxJQUFMLENBQVUsR0FBVixDQUFjLElBQWQsQ0FBVDtBQUNBO0FBQ0EsZ0JBQUksT0FBSixFQUFhO0FBQ1QsdUJBQU8sTUFBUDtBQUNILGFBRkQsTUFFTyxJQUFJLE1BQUosRUFBWTtBQUNmLHVCQUFPLEtBQUssSUFBTCxDQUFVLE9BQVYsQ0FBa0IsSUFBbEIsQ0FBUDtBQUNILGFBRk0sTUFFQTtBQUNILHVCQUFPLENBQUMsQ0FBUjtBQUNIO0FBQ0o7Ozs7O0FBRUQ7Ozs7OztvQ0FNYSxDLEVBQUc7QUFDWixnQkFBSSxhQUFKO0FBQUEsZ0JBQVUsaUJBQVY7QUFDQTtBQUNBLG1CQUFPLEtBQUssRUFBRSxFQUFQLElBQWEsRUFBRSxFQUFmLElBQXFCLEVBQUUsRUFBdkIsSUFDRixJQUFJLFVBQUosQ0FBZSxLQUFLLEtBQXBCLEVBQTJCLEVBQUUsRUFBN0IsRUFBaUMsRUFBRSxFQUFuQyxFQUF1QyxFQUFFLEVBQXpDLENBQUQsQ0FBK0MsTUFBL0MsQ0FBc0QsSUFBdEQsQ0FESjtBQUVBO0FBQ0EsbUJBQVEsS0FBSyxFQUFFLENBQVAsSUFBWSxFQUFFLFFBQWQsSUFBMEIsU0FBUyxRQUFULENBQWtCLENBQWxCLENBQTNCLElBQW9ELElBQTNEO0FBQ0E7QUFDQSx1QkFBVyxLQUFLLElBQUwsQ0FBVSxPQUFWLENBQWtCLElBQWxCLENBQVg7QUFDQSxnQkFBSSxhQUFhLENBQUMsQ0FBbEIsRUFBb0I7QUFDaEI7QUFDQSxxQkFBSyxJQUFMLENBQVUsR0FBVixDQUFjLElBQWQ7QUFDSDtBQUNELG1CQUFPLFFBQVA7QUFDSDs7Ozs7QUFFRDs7Ozs7aUNBS1UsTSxFQUFRO0FBQUE7O0FBQ2Q7QUFDQSxpQkFBSyxFQUFMLEdBQVUsT0FBTyxFQUFqQjtBQUNBLGlCQUFLLEVBQUwsR0FBVSxPQUFPLEVBQWpCO0FBQ0EsaUJBQUssT0FBTCxHQUFlLE9BQU8sT0FBdEI7O0FBRUEsaUJBQUssS0FBTCxHQUFhLElBQUksSUFBSixDQUFTLEtBQUssT0FBTCxDQUFhLElBQXRCLENBQWI7QUFDQSxpQkFBSyxTQUFMLEdBQWlCLElBQUksUUFBSixDQUFhLEtBQUssS0FBbEIsRUFBeUIsS0FBSyxPQUFMLENBQWEsUUFBdEMsQ0FBakI7O0FBRUE7QUFDQSxnQkFBTSxhQUFhLFNBQWIsVUFBYSxDQUFDLFdBQUQsRUFBYyxXQUFkLEVBQThCO0FBQzdDLG9CQUFNLFNBQVMsSUFBSSxNQUFKLENBQVcsWUFBWSxDQUFaLENBQWMsQ0FBekIsRUFDVyxZQUFZLENBQVosQ0FBYyxDQUR6QixFQUVXLFlBQVksQ0FBWixDQUFjLENBRnpCLENBQWY7QUFHQSw0QkFBWSxJQUFaLENBQWlCLE1BQWpCLEVBSjZDLENBSW5CO0FBQzFCLG9CQUFJLFlBQVksQ0FBWixLQUFrQixJQUF0QixFQUE0QjtBQUN4QiwwQkFBSyxJQUFMLENBQVUsR0FBVixDQUFjLElBQUksUUFBSixDQUFhLFlBQVksS0FBWixFQUFiLEVBQWtDLFlBQVksQ0FBOUMsQ0FBZDtBQUNIO0FBQ0QscUJBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxZQUFZLFFBQVosQ0FBcUIsTUFBekMsRUFBaUQsRUFBRSxDQUFuRCxFQUFzRDtBQUNsRCwrQkFBVyxZQUFZLFFBQVosQ0FBcUIsQ0FBckIsQ0FBWCxFQUFvQyxXQUFwQztBQUNIO0FBQ0QsNEJBQVksR0FBWixHQVg2QyxDQVcxQjtBQUN0QixhQVpEO0FBYUEsaUJBQUssSUFBSSxJQUFJLENBQWIsRUFBZ0IsSUFBSSxPQUFPLElBQVAsQ0FBWSxRQUFaLENBQXFCLE1BQXpDLEVBQWlELEVBQUUsQ0FBbkQsRUFBcUQ7QUFDakQsMkJBQVcsT0FBTyxJQUFQLENBQVksUUFBWixDQUFxQixDQUFyQixDQUFYLEVBQW9DLEVBQXBDO0FBQ0g7QUFDRCxtQkFBTyxJQUFQO0FBQ0g7Ozs0QkE1TGE7QUFDVixnQkFBSSxTQUFTLEtBQUssSUFBTCxDQUFVLFVBQVYsR0FBdUIsQ0FBcEMsQ0FEVSxDQUM2QjtBQUN2QyxxQkFBVSxLQUFLLElBQUwsQ0FBVSxXQUFWLElBQXlCLFNBQVMsQ0FBbkMsSUFBeUMsTUFBbEQ7QUFDQSxtQkFBTyxNQUFQO0FBQ0g7Ozs7OztBQTBMSjs7QUFFRCxPQUFPLE9BQVAsR0FBaUIsUUFBakIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gYW5kIHV0aWwgY2xhc3Mgb2YgdGhlIGJhc2UsIGkuZS4gdGhlIG1heGltYWwgYXJpdHkgb2YgdGhlIGZpcnN0XG4gKiBsZXZlbCBvZiB0aGUgdHJlZS5cbiAqL1xuY2xhc3MgQmFzZSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtiID0gM10gVGhlIG51bWJlciBvZiBiaXRzIGF0IGxldmVsIDAgb2YgdGhlIGRlbnNlIHNwYWNlLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yIChiID0gMykge1xuICAgICAgICB0aGlzLl9iID0gYjtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUHJvY2VzcyB0aGUgbnVtYmVyIG9mIGJpdHMgdXNhZ2UgYXQgYSBjZXJ0YWluIGxldmVsIG9mIGRlbnNlIHNwYWNlLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBsZXZlbCBUaGUgbGV2ZWwgaW4gZGVuc2Ugc3BhY2UsIGkuZS4sIHRoZSBudW1iZXIgb2ZcbiAgICAgKiBjb25jYXRlbmF0aW9ucyBvZiB0aGUgaWRlbnRpZmllci5cbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSBudW1iZXIgb2YgYml0IHRvIGVuY29kZSBhIHNpbmdsZSBwYXRoIGNvbmNhdGVuYXRpb25cbiAgICAgKiBhdCB0aGUgZGVwdGggaW4gYXJndW1lbnQuXG4gICAgICovXG4gICAgZ2V0Qml0QmFzZSAobGV2ZWwpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2IgKyBsZXZlbDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUHJvY2VzcyB0aGUgdG90YWwgbnVtYmVyIG9mIGJpdHMgdXNhZ2UgdG8gZ2V0IHRvIGEgY2VydGFpbiBsZXZlbC5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbGV2ZWwgVGhlIGxldmVsIGluIGRlbnNlIHNwYWNlLCBpLmUuLCB0aGUgbnVtYmVyIG9mXG4gICAgICogY29uY2F0ZW5hdGlvbnMgb2YgdGhlIGlkZW50aWZpZXIuXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBUaGUgbnVtYmVyIG9mIGJpdHMgcmVxdWlyZWQgdG8gZW5jb2RlIHRoZSBwYXRoXG4gICAgICogY29tcHJpc2luZyBsZXZlbCBjb25jYXRlbmF0aW9ucy5cbiAgICAgKi9cbiAgICBnZXRTdW1CaXQgKGxldmVsKSB7XG4gICAgICAgIGNvbnN0IG4gPSB0aGlzLmdldEJpdEJhc2UobGV2ZWwpO1xuICAgICAgICBjb25zdCBtID0gdGhpcy5fYiAtIDE7ICAgICAgIFxuICAgICAgICByZXR1cm4gKG4gKiAobiArIDEpKSAvIDIgLSAobSAqIChtICsgMSkgLyAyKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUHJvY2VzcyB0aGUgbnVtYmVyIG9mIHBvc3NpYmxlIHBhdGhzIGJldHdlZW4gdHdvIExTRVFOb2RlLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBsZXZlbCBUaGUgZGVwdGggb2YgdGhlIHRyZWUgdG8gcHJvY2Vzcy5cbiAgICAgKiBAcGFyYW0ge0xTZXFOb2RlfSBwIFRoZSBwcmV2aW91cyBMU2VxTm9kZS5cbiAgICAgKiBAcGFyYW0ge0xTZXFOb2RlfSBxIFRoZSBuZXh0IExTZXFOb2RlLlxuICAgICAqIEByZXR1cm4ge051bWJlcn0gVGhlIGludGVydmFsIGJldHdlZW4gdGhlIHR3byBub2RlcyBhdCB0aGUgZGVwdGggaW5cbiAgICAgKiBhcmd1bWVudC5cbiAgICAgKi9cbiAgICBnZXRJbnRlcnZhbCAobGV2ZWwsIHAsIHEpIHsgICAgICAgICAgICAgICBcbiAgICAgICAgbGV0IHN1bSA9IDAsIGkgPSAwLFxuICAgICAgICAgICAgcElzR3JlYXRlciA9IGZhbHNlLCBjb21tb25Sb290ID0gdHJ1ZSxcbiAgICAgICAgICAgIHByZXZWYWx1ZSA9IDAsIG5leHRWYWx1ZSA9IDA7XG4gICAgICAgIFxuICAgICAgICB3aGlsZSAoaSA8PSBsZXZlbCkge1xuICAgICAgICAgICAgcHJldlZhbHVlID0gKHAgJiYgcC50LnApIHx8IDA7XG4gICAgICAgICAgICBuZXh0VmFsdWUgPSAocSAmJiBxLnQucCkgfHwgMDsgICAgICAgICAgICBcbiAgICAgICAgICAgIC8vICMxIGNoZWNrIGlmIHBhdGhzIGFyZSBpZGVudGljYWxcbiAgICAgICAgICAgIGlmIChjb21tb25Sb290ICYmIHByZXZWYWx1ZSAhPT0gbmV4dFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgY29tbW9uUm9vdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHBJc0dyZWF0ZXIgPSBwcmV2VmFsdWUgPiBuZXh0VmFsdWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyAjMiBwcm9jZXNzIHRoZSB2YWx1ZSB0byBhZGQgdG8gaW50ZXJ2YWxcbiAgICAgICAgICAgIGlmIChwSXNHcmVhdGVyKSB7IG5leHRWYWx1ZSA9IE1hdGgucG93KDIsdGhpcy5nZXRCaXRCYXNlKGkpKS0xOyB9XG4gICAgICAgICAgICBpZiAoY29tbW9uUm9vdCB8fCBwSXNHcmVhdGVyIHx8IGkgIT09IGxldmVsKSB7XG4gICAgICAgICAgICAgICAgc3VtICs9IG5leHRWYWx1ZSAtIHByZXZWYWx1ZTsgXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN1bSArPSBuZXh0VmFsdWUgLSBwcmV2VmFsdWUgLSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGkhPT1sZXZlbCl7IHN1bSAqPSBNYXRoLnBvdygyLHRoaXMuZ2V0Qml0QmFzZShpKzEpKTsgfTtcbiAgICAgICAgICAgIC8vICMzIGl0ZXJhdGUgb3ZlciBwYXRoIGNvbmNhdGVuYXRpb25zXG4gICAgICAgICAgICBwID0gcCAmJiBwLmNoaWxkIHx8IG51bGw7XG4gICAgICAgICAgICBxID0gcSAmJiBxLmNoaWxkIHx8IG51bGw7XG4gICAgICAgICAgICArK2k7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1bTtcbiAgICB9O1xuICAgIFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBCYXNlO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFRocm93biB3aGVuIHRoZSBpbmRleCBpcyBoaWdoZXIgdGhhbiB0aGUgY3VycmVudCBsZW5ndGgtMSBvZiB0aGUgYXJyYXksIG9yXG4gKiBsb3dlciB0aGFuIDAuXG4gKi9cbmNsYXNzIEV4T3V0T2ZCb3VuZHMge1xuXG4gICAgLyoqIFxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleCBUaGUgaW5kZXggb3V0IG9mIGJvdW5kcy5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gc2l6ZSBUaGUgc2l6ZSBvZiB0aGUgYXJyYXkuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IgKGluZGV4LCBzaXplKSB7XG4gICAgICAgIHRoaXMuaW5kZXggPSBpbmRleDtcbiAgICAgICAgdGhpcy5zaXplID0gc2l6ZTtcbiAgICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBFeE91dE9mQm91bmRzO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBCSSA9IHJlcXVpcmUoJ0JpZ0ludCcpO1xuY29uc3QgVHJpcGxlID0gcmVxdWlyZSgnLi90cmlwbGUuanMnKTtcbmNvbnN0IExTZXFOb2RlID0gcmVxdWlyZSgnLi9sc2Vxbm9kZS5qcycpO1xuXG4vKipcbiAqIFVuaXF1ZSBhbmQgaW1tdXRhYmxlIGlkZW50aWZpZXIgY29tcG9zZWQgb2YgZGlnaXQsIHNvdXJjZXMsIGNvdW50ZXJzLlxuICovXG5jbGFzcyBJZGVudGlmaWVyIHtcbiAgICBcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0Jhc2V9IGJhc2UgVGhlIGJhc2Ugb2YgaWRlbnRpZmllcnMuXG4gICAgICogQHBhcmFtIHtOdW1iZXJbXX0gZGlnaXRzIFRoZSBkaWdpdCAocG9zaXRpb24gaW4gZGVuc2Ugc3BhY2UpLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0W119IHNpdGVzIFRoZSBsaXN0IG9mIHNvdXJjZXMuXG4gICAgICogQHBhcmFtIHtOdW1iZXJbXX0gY291bnRlcnMgVGhlIGxpc3Qgb2YgY291bnRlcnMuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IgKGJhc2UsIGRpZ2l0cywgc2l0ZXMgPSBbXSwgY291bnRlcnMgPSBbXSkge1xuICAgICAgICB0aGlzLl9kID0gZGlnaXRzO1xuICAgICAgICB0aGlzLl9zID0gc2l0ZXM7XG4gICAgICAgIHRoaXMuX2MgPSBjb3VudGVycztcbiAgICAgICAgXG4gICAgICAgIHRoaXMuX2Jhc2UgPSBiYXNlO1xuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgZCxzLGMgdmFsdWVzIGFjY29yZGluZyB0byB0aGUgbm9kZSBpbiBhcmd1bWVudFxuICAgICAqIEBwYXJhbSB7TFNlcU5vZGV9IG5vZGUgVGhlIGxzZXFub2RlIGNvbnRhaW5pbmcgdGhlIHBhdGggaW4gdGhlIHRyZWVcbiAgICAgKiBzdHJ1Y3R1cmUuXG4gICAgICogQHJldHVybiB7SWRlbnRpZmllcn0gVGhpcyBpZGVudGlmaWVyIG1vZGlmaWVkLlxuICAgICAqL1xuICAgIGZyb21Ob2RlIChub2RlKSB7XG4gICAgICAgIC8vICMxIHByb2Nlc3MgdGhlIGxlbmd0aCBvZiB0aGUgcGF0aFxuICAgICAgICBsZXQgbGVuZ3RoID0gMSwgdGVtcE5vZGUgPSBub2RlO1xuICAgICAgICBcbiAgICAgICAgd2hpbGUgKCF0ZW1wTm9kZS5pc0xlYWYpIHtcblx0ICAgICsrbGVuZ3RoO1xuICAgICAgICAgICAgdGVtcE5vZGUgPSB0ZW1wTm9kZS5jaGlsZDtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gIzIgY29weSB0aGUgdmFsdWVzIGNvbnRhaW5lZCBpbiB0aGUgcGF0aFxuICAgICAgICB0aGlzLl9kID0gQkkuaW50MmJpZ0ludCgwLCB0aGlzLl9iYXNlLmdldFN1bUJpdChsZW5ndGggLSAxKSk7XG4gICAgICAgIFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aCA7ICsraSkge1xuICAgICAgICAgICAgLy8gIzFhIGNvcHkgdGhlIHNpdGUgaWRcbiAgICAgICAgICAgIHRoaXMuX3MucHVzaChub2RlLnQucyk7XG4gICAgICAgICAgICAvLyAjMWIgY29weSB0aGUgY291bnRlclxuICAgICAgICAgICAgdGhpcy5fYy5wdXNoKG5vZGUudC5jKTtcbiAgICAgICAgICAgIC8vICMxYyBjb3B5IHRoZSBkaWdpdFxuICAgICAgICAgICAgQkkuYWRkSW50Xyh0aGlzLl9kLCBub2RlLnQucCk7XG4gICAgICAgICAgICBpZiAoaSAhPT0gbGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgIEJJLmxlZnRTaGlmdF8odGhpcy5fZCwgdGhpcy5fYmFzZS5nZXRCaXRCYXNlKGkrMSkpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIG5vZGUgPSBub2RlLmNoaWxkO1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBcbiAgICAvKipcbiAgICAgKiBDb252ZXJ0IHRoZSBpZGVudGlmaWVyIGludG8gYSBub2RlIHdpdGhvdXQgZWxlbWVudC5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZSBUaGUgZWxlbWVudCBhc3NvY2lhdGVkIHdpdGggdGhlIG5vZGUuXG4gICAgICogQHJldHVybiB7TFNlcU5vZGV9IEFuIExTZXFOb2RlIGNvbnRhaW5pbmcgdGhlIGVsZW1lbnQgYW5kIHRoZSBwYXRoXG4gICAgICogZXh0cmFjdGVkIGZyb20gdGhpcyBpZGVudGlmaWVyLlxuICAgICAqL1xuICAgIHRvTm9kZSAoZSkge1xuICAgICAgICBjb25zdCBkQml0TGVuZ3RoID0gdGhpcy5fYmFzZS5nZXRTdW1CaXQodGhpcy5fYy5sZW5ndGggLSAxKTtcbiAgICAgICAgbGV0IHJlc3VsdFBhdGggPSBbXSwgbWluZTtcbiAgICAgICAgXG4gICAgICAgIC8vICMxIGRlY29uc3RydWN0IHRoZSBkaWdpdCBcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLl9jLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAvLyAjMSB0cnVuY2F0ZSBtaW5lXG4gICAgICAgICAgICBtaW5lID0gQkkuZHVwKHRoaXMuX2QpO1xuICAgICAgICAgICAgLy8gIzFhIHNoaWZ0IHJpZ2h0IHRvIGVyYXNlIHRoZSB0YWlsIG9mIHRoZSBwYXRoXG4gICAgICAgICAgICBCSS5yaWdodFNoaWZ0XyhtaW5lLCBkQml0TGVuZ3RoIC0gdGhpcy5fYmFzZS5nZXRTdW1CaXQoaSkpO1xuICAgICAgICAgICAgLy8gIzFiIGNvcHkgdmFsdWUgaW4gdGhlIHJlc3VsdFxuICAgICAgICAgICAgcmVzdWx0UGF0aC5wdXNoKFxuICAgICAgICAgICAgICAgIG5ldyBUcmlwbGUoQkkubW9kSW50KG1pbmUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5wb3coMiwgdGhpcy5fYmFzZS5nZXRCaXRCYXNlKGkpKSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zW2ldLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fY1tpXSkpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbmV3IExTZXFOb2RlKHJlc3VsdFBhdGgsIGUpO1xuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIENvbXBhcmUgdHdvIGlkZW50aWZpZXJzLlxuICAgICAqIEBwYXJhbSB7SWRlbnRpZmllcn0gbyBUaGUgb3RoZXIgaWRlbnRpZmllci5cbiAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfSAtMSBpZiB0aGlzIGlzIGxvd2VyLCAwIGlmIHRoZXkgYXJlIGVxdWFsLCAxIGlmIHRoaXMgaXNcbiAgICAgKiBncmVhdGVyLlxuICAgICAqL1xuICAgIGNvbXBhcmVUbyAobykge1xuICAgICAgICBsZXQgZEJpdExlbmd0aCA9IHRoaXMuX2Jhc2UuZ2V0U3VtQml0KHRoaXMuX2MubGVuZ3RoIC0gMSksXG4gICAgICAgICAgICBvZEJpdExlbmd0aCA9IHRoaXMuX2Jhc2UuZ2V0U3VtQml0KG8uX2MubGVuZ3RoIC0gMSksXG4gICAgICAgICAgICBjb21wYXJpbmcgPSB0cnVlLFxuICAgICAgICAgICAgcmVzdWx0ID0gMCwgaSA9IDAsXG4gICAgICAgICAgICBzdW0sIG1pbmUsIG90aGVyO1xuICAgICAgICBcbiAgICAgICAgLy8gIzEgQ29tcGFyZSB0aGUgbGlzdCBvZiA8ZCxzLGM+XG4gICAgICAgIHdoaWxlIChjb21wYXJpbmcgJiYgaSA8IE1hdGgubWluKHRoaXMuX2MubGVuZ3RoLCBvLl9jLmxlbmd0aCkgKSB7XG4gICAgICAgICAgICAvLyBjYW4gc3RvcCBiZWZvcmUgdGhlIGVuZCBvZiBmb3IgbG9vcCB3aXogcmV0dXJuXG4gICAgICAgICAgICBzdW0gPSB0aGlzLl9iYXNlLmdldFN1bUJpdChpKTtcbiAgICAgICAgICAgIC8vICMxYSB0cnVuY2F0ZSBtaW5lXG4gICAgICAgICAgICBtaW5lID0gQkkuZHVwKHRoaXMuX2QpO1xuICAgICAgICAgICAgQkkucmlnaHRTaGlmdF8obWluZSwgZEJpdExlbmd0aCAtIHN1bSk7XG4gICAgICAgICAgICAvLyAjMWIgdHJ1bmNhdGUgb3RoZXJcbiAgICAgICAgICAgIG90aGVyID0gQkkuZHVwKG8uX2QpO1xuICAgICAgICAgICAgQkkucmlnaHRTaGlmdF8ob3RoZXIsIG9kQml0TGVuZ3RoIC0gc3VtKTtcbiAgICAgICAgICAgIC8vICMyIENvbXBhcmUgdHJpcGxlc1xuICAgICAgICAgICAgLy8gI0EgZGlnaXRcbiAgICAgICAgICAgIGlmICghQkkuZXF1YWxzKG1pbmUsIG90aGVyKSkge1xuICAgICAgICAgICAgICAgIGlmIChCSS5ncmVhdGVyKG1pbmUsIG90aGVyKSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IC0xO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgY29tcGFyaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vICNCIHNvdXJjZVxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuX3NbaV0gLSBvLl9zW2ldOyBcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBhcmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vICNDIGNvdW50ZXJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5fY1tpXSAtIG8uX2NbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBhcmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgKytpO1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgLy8gIzMgY29tcGFyZSBsaXN0IHNpemVcbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gMCl7XG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLl9jLmxlbmd0aCAtIG8uX2MubGVuZ3RoO1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9OyAgICBcbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSBJZGVudGlmaWVyO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBUcmlwbGUgPSByZXF1aXJlKCcuL3RyaXBsZS5qcycpO1xuXG4vKipcbiAqIEEgbm9kZSBvZiB0aGUgTFNlcSB0cmVlLlxuICovXG5jbGFzcyBMU2VxTm9kZSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtUcmlwbGVbXX0gdHJpcGxlcyBUaGUgbGlzdCBvZiB0cmlwbGVzIGNvbXBvc2luZyB0aGUgcGF0aCB0byB0aGVcbiAgICAgKiBlbGVtZW50LlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtZW50IFRoZSBlbGVtZW50IHRvIGluc2VydCBpbiB0aGUgc3RydWN0dXJlLCBlLmcuLCBhXG4gICAgICogY2hhcmFjdGVyIGluIGEgdGV4dCBkb2N1bWVudC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvciAodHJpcGxlcyA9IFtdLCBlbGVtZW50ID0gbnVsbCkge1xuICAgICAgICB0aGlzLnQgPSB0cmlwbGVzLnNoaWZ0KCk7XG4gICAgICAgIHRoaXMuZSA9IG51bGw7XG4gICAgICAgIGlmICh0cmlwbGVzLmxlbmd0aCA9PT0gMCkgeyB0aGlzLmUgPSBlbGVtZW50OyB9O1xuICAgICAgICB0aGlzLnN1YkNvdW50ZXIgPSAodHJpcGxlcy5sZW5ndGggPiAwICYmIDEpIHx8IDA7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4gPSBbXTtcbiAgICAgICAgdHJpcGxlcy5sZW5ndGggPiAwICYmXG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLnB1c2gobmV3IExTZXFOb2RlKHRyaXBsZXMsIGVsZW1lbnQpKTtcbiAgICB9O1xuICAgIFxuICAgIC8qKlxuICAgICAqIEdldHRlciB0byB0aGUgZmlyc3QgY2hpbGQuXG4gICAgICogQHJldHVybnMge0xTZXFOb2RlfSBUaGUgZmlyc3QgY2hpbGQgb2YgdGhpcyBub2RlLiBOdWxsIGlmIGl0IGRvZXMgbm90XG4gICAgICogZXhpc3RzLlxuICAgICAqL1xuICAgIGdldCBjaGlsZCAoKSB7XG4gICAgICAgIHJldHVybiAoKHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMCkgJiYgdGhpcy5jaGlsZHJlblswXSkgfHwgbnVsbDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ29tcGFyYXRvciBiZXR3ZWVuIHRvIExTZXFOb2Rlcy5cbiAgICAgKiBAcGFyYW0ge0xTZXFOb2RlfSBvIFRoZSBvdGhlciBMU2VxTm9kZSB0byBjb21wYXJlIHRvLlxuICAgICAqL1xuICAgIGNvbXBhcmVUbyAobykge1xuICAgICAgICByZXR1cm4gdGhpcy50LmNvbXBhcmVUbyhvLnQpO1xuICAgIH07XG4gICAgXG4gICAgLyoqXG4gICAgICogQWRkIGEgbm9kZSB0byB0aGUgY3VycmVudCBub2RlLlxuICAgICAqIEBwYXJhbSB7TFNlcU5vZGV9IG5vZGUgVGhlIG5vZGUgdG8gYWRkIGFzIGEgY2hpbGRyZW4gb2YgdGhpcyBub2RlLlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IEZhbHNlIGlmIHRoZSBlbGVtZW50IGFscmVhZHkgZXhpc3RzLCBUcnVlIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBhZGQgKG5vZGUpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9iaW5hcnlJbmRleE9mKG5vZGUpO1xuICAgICAgICBcbiAgICAgICAgLy8gIzEgaWYgdGhlIHBhdGggZG8gbm8gZXhpc3QsIGNyZWF0ZSBpdFxuICAgICAgICBpZiAoIXRoaXMuX2NvbnRhaW5zKG5vZGUpKSB7XG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLnNwbGljZSgtaW5kZXgsIDAsIG5vZGUpO1xuICAgICAgICAgICAgdGhpcy5zdWJDb3VudGVyICs9IDE7XG4gICAgICAgICAgICAvLyAjMiBvdGhlcndpc2UsIGNvbnRpbnVlIHRvIGV4cGxvcmUgdGhlIHN1YnRyZWVzXG4gICAgICAgIH0gZWxzZSBpZiAobm9kZS5jaGlsZHJlbi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIC8vICMyYSBjaGVjayBpZiB0aGUgZWxlbWVudCBhbHJlYWR5IGV4aXN0c1xuICAgICAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW5baW5kZXhdLmUgIT09IG51bGwpe1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGlsZHJlbltpbmRleF0uZSA9IG5vZGUuZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN1YkNvdW50ZXIgKz0gMTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAvLyAjMyBpZiBkaWRub3QgZXhpc3QsIGluY3JlbWVudCB0aGUgY291bnRlclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY2hpbGRyZW5baW5kZXhdLmFkZChub2RlLmNoaWxkKSkge1xuICAgICAgICAgICAgdGhpcy5zdWJDb3VudGVyICs9IDE7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSB0aGUgbm9kZSBvZiB0aGUgdHJlZSBhbmQgYWxsIG5vZGUgd2l0aGluIHBhdGggYmVpbmcgdXNlbGVzcy5cbiAgICAgKiBAcGFyYW0ge0xTZXFOb2RlfSBub2RlIHRoZSBub2RlIGNvbnRhaW5pbmcgdGhlIHBhdGggdG8gcmVtb3ZlXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgbm9kZSBoYXMgYmVlbiByZW1vdmVkLCBGYWxzZSBpZiBpdCBkb2VzIG5vdFxuICAgICAqIGV4aXN0LlxuICAgICAqL1xuICAgIGRlbCAobm9kZSkge1xuICAgICAgICBjb25zdCBpbmRleGVzID0gdGhpcy5fZ2V0SW5kZXhlcyhub2RlKTtcbiAgICAgICAgbGV0IGN1cnJlbnRUcmVlID0gdGhpcywgaSA9IDAsIGlzU3BsaXR0ZWQgPSBmYWxzZTtcblxuICAgICAgICAvLyAjMSBUaGUgZWxlbWVudCBkb2VzIG5vdCBleGlzdHMsIHN0b3BcbiAgICAgICAgaWYgKGluZGV4ZXMubGVuZ3RoID09PSAwKSB7IHJldHVybiBmYWxzZTsgfTtcblxuICAgICAgICAvLyAjMiBDcmF3bCB0aGUgcGF0aCBhbmQgcmVtb3ZlIHRoZSBlbGVtZW50XG4gICAgICAgIGN1cnJlbnRUcmVlLnN1YkNvdW50ZXIgLT0gMTtcbiAgICAgICAgd2hpbGUgKGkgPCBpbmRleGVzLmxlbmd0aCAmJiAhKGlzU3BsaXR0ZWQpKSB7XG4gICAgICAgICAgICBsZXQgaXNMYXN0ID0gY3VycmVudFRyZWUuY2hpbGRyZW5baW5kZXhlc1tpXV0uX2hhc0VsZW1lbnQgJiZcbiAgICAgICAgICAgICAgICBpID09PSBpbmRleGVzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICBpZiAoIWlzTGFzdCkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRUcmVlLmNoaWxkcmVuW2luZGV4ZXNbaV1dLnN1YkNvdW50ZXIgLT0gMTsgICAgIFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmIChjdXJyZW50VHJlZS5jaGlsZHJlbltpbmRleGVzW2ldXS5zdWJDb3VudGVyIDw9IDAgJiZcbiAgICAgICAgICAgICAgICAoIWN1cnJlbnRUcmVlLmNoaWxkcmVuW2luZGV4ZXNbaV1dLl9oYXNFbGVtZW50IHx8IGlzTGFzdCkpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50VHJlZS5jaGlsZHJlbi5zcGxpY2UoaW5kZXhlc1tpXSwgMSk7XG4gICAgICAgICAgICAgICAgaXNTcGxpdHRlZCA9IHRydWU7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY3VycmVudFRyZWUgPSBjdXJyZW50VHJlZS5jaGlsZHJlbltpbmRleGVzW2ldXTtcbiAgICAgICAgICAgICsraTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKCFpc1NwbGl0dGVkKXsgY3VycmVudFRyZWUuZSA9IG51bGw7fTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBUaGUgb3JkZXJlZCB0cmVlIGNhbiBiZSBsaW5lYXJpemVkIGludG8gYSBzZXF1ZW5jZS4gVGhpcyBmdW5jdGlvbiBnZXQgdGhlXG4gICAgICogaW5kZXggb2YgdGhlIHBhdGggcmVwcmVzZW50ZWQgYnkgdGhlIGxpc3Qgb2YgdHJpcGxlcy5cbiAgICAgKiBAcGFyYW0ge0xTZXFOb2RlfSBub2RlIFRoZSBub2RlIGNvbnRhaW5pbmcgLS0gYXQgbGVhc3QgLS0gdGhlIHBhdGggdG8gdGhlXG4gICAgICogZWxlbWVudC5cbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSBpbmRleCBvZiB0aGUgbm9kZSBpbiB0aGUgbGluZWFyaXplZCBzZXF1ZW5jZTsgLTEgaWZcbiAgICAgKiB0aGUgZWxlbWVudCBkb2VzIG5vdCBleGlzdC5cbiAgICAgKi9cbiAgICBpbmRleE9mIChub2RlKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ZXMgPSB0aGlzLl9nZXRJbmRleGVzKG5vZGUpO1xuICAgICAgICBsZXQgc3VtID0gMCwgY3VycmVudFRyZWUgPSB0aGlzLCBqO1xuICAgICAgICBcbiAgICAgICAgLy8gIzEgSWYgdGhlIG5vZGUgZG9lcyBub3QgZXhpc3QsIHN0b3BcbiAgICAgICAgaWYgKGluZGV4ZXMubGVuZ3RoID09PSAwKSB7IHJldHVybiAtMTsgfTtcblxuICAgICAgICAvLyAjMiBPdGhlcndpc2UsIHN0YXJ0IGNvdW50aW5nXG4gICAgICAgIGlmIChjdXJyZW50VHJlZS5faGFzRWxlbWVudCkgeyBzdW0gKz0gMTsgfTtcbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5kZXhlcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgaWYgKGluZGV4ZXNbaV0gPCBjdXJyZW50VHJlZS5jaGlsZHJlbi5sZW5ndGgvMikge1xuICAgICAgICAgICAgICAgIC8vICNBIHN0YXJ0IGZyb20gdGhlIGJlZ2lubmluZyBbLS0tLT58ICAgICBdXG4gICAgICAgICAgICAgICAgaiA9IDA7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGogPCBpbmRleGVzW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VHJlZS5jaGlsZHJlbltqXS5faGFzRWxlbWVudCkgeyBzdW0gKz0gMTsgfTtcbiAgICAgICAgICAgICAgICAgICAgc3VtICs9IGN1cnJlbnRUcmVlLmNoaWxkcmVuW2pdLnN1YkNvdW50ZXI7XG4gICAgICAgICAgICAgICAgICAgICsrajtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyAjQiBzdGFydCBmcm9tIHRoZSBlbmQgWyAgICAgfDwtLS0tXVxuICAgICAgICAgICAgICAgIHN1bSArPSBjdXJyZW50VHJlZS5zdWJDb3VudGVyO1xuICAgICAgICAgICAgICAgIGogPSBjdXJyZW50VHJlZS5jaGlsZHJlbi5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICAgIHdoaWxlIChqID49IGluZGV4ZXNbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRUcmVlLmNoaWxkcmVuW2pdLl9oYXNFbGVtZW50KXsgc3VtIC09IDE7IH07XG4gICAgICAgICAgICAgICAgICAgIHN1bSAtPSBjdXJyZW50VHJlZS5jaGlsZHJlbltqXS5zdWJDb3VudGVyO1xuICAgICAgICAgICAgICAgICAgICAtLWo7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBqICs9IDE7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRUcmVlLmNoaWxkcmVuW2pdLl9oYXNFbGVtZW50KSB7IHN1bSArPSAxOyB9O1xuICAgICAgICAgICAgY3VycmVudFRyZWUgPSBjdXJyZW50VHJlZS5jaGlsZHJlbltqXTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHN1bSAtIDE7IC8vIC0xIGJlY2F1c2UgYWxnb3JpdGhtIGNvdW50ZWQgdGhlIGVsZW1lbnQgaXRzZWxmXG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICogVGhlIG9yZGVyZWQgdHJlZSBjYW4gYmUgbGluZWFyaXplZC4gVGhpcyBmdW5jdGlvbiBnZXRzIHRoZSBub2RlIGF0IHRoZVxuICAgICAqIGluZGV4IGluIHRoZSBwcm9qZWN0ZWQgc2VxdWVuY2UuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4IFRoZSBpbmRleCBpbiB0aGUgc2VxdWVuY2UuXG4gICAgICogQHJldHVybiB7TFNlcU5vZGV9IFRoZSBub2RlIGF0IHRoZSBpbmRleC5cbiAgICAgKi9cbiAgICBnZXQgKGluZGV4KSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBsZWZ0U3VtIFRoZSBzdW0gb2YgYWxsIGVsZW1lbnQgYXQgdGhlIGxlZnQgb2YgdGhlXG4gICAgICAgICAqIGN1cnJlbnQgaW5zcGVjdGVkIG5vZGUuXG4gICAgICAgICAqIEBwYXJhbSB7TFNlcU5vZGV9IGJ1aWxkaW5nTm9kZSBUaGUgaGVhZCBwYXJ0IG9mIHRoZSBub2RlIGJlaW5nIGJ1aWx0XG4gICAgICAgICAqIGFzIHdlIGNyYXdsLlxuICAgICAgICAgKiBAcGFyYW0ge0xTZXFOb2RlfSBxdWV1ZSBUaGUgcXVldWUgcGFydCBvZiB0aGUgbm9kZSBiZWluZyBidWlsdC5cbiAgICAgICAgICogQHBhcmFtIHtMU2VxTm9kZX0gY3VycmVudE5vZGUgVGhlIHN1YnRyZWUgYmVpbmcgY3Jhd2xlZC5cbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0IF9nZXQgPSAobGVmdFN1bSwgYnVpbGRpbmdOb2RlLCBxdWV1ZSwgY3VycmVudE5vZGUpID0+IHtcbiAgICAgICAgICAgIGxldCBzdGFydEJlZ2lubmluZyA9IHRydWUsIHVzZUZ1bmN0aW9uLCBpID0gMCwgcCwgdGVtcDtcbiAgICAgICAgICAgIC8vICMwIFRoZSBub2RlIGlzIGZvdW5kLCByZXR1cm4gdGhlIGluY3JlbWVudGFsbHkgYnVpbHQgbm9kZSBhbmRcbiAgICAgICAgICAgIC8vIHByYWlzZSB0aGUgc3VuICFcbiAgICAgICAgICAgIGlmIChsZWZ0U3VtID09PSBpbmRleCAmJiBjdXJyZW50Tm9kZS5faGFzRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIC8vIDFhIGNvcHkgdGhlIHZhbHVlIG9mIHRoZSBlbGVtZW50IGluIHRoZSBwYXRoXG4gICAgICAgICAgICAgICAgcXVldWUuZSA9IGN1cnJlbnROb2RlLmU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJ1aWxkaW5nTm9kZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoY3VycmVudE5vZGUuX2hhc0VsZW1lbnQpeyBsZWZ0U3VtICs9IDE7IH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vICMxIHNlYXJjaDogZG8gSSBzdGFydCBmcm9tIHRoZSBiZWdpbm5pbmcgb3IgdGhlIGVuZFxuICAgICAgICAgICAgc3RhcnRCZWdpbm5pbmcgPSBpbmRleC1sZWZ0U3VtIDwgY3VycmVudE5vZGUuc3ViQ291bnRlci8yO1xuICAgICAgICAgICAgaWYgKHN0YXJ0QmVnaW5uaW5nKSB7XG4gICAgICAgICAgICAgICAgdXNlRnVuY3Rpb24gPSAoYSwgYikgPT4gYSArIGI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxlZnRTdW0gKz0gY3VycmVudE5vZGUuc3ViQ291bnRlcjtcbiAgICAgICAgICAgICAgICB1c2VGdW5jdGlvbiA9IChhLCBiKSA9PiBhIC0gYjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gIzJhIGNvdW50aW5nIHRoZSBlbGVtZW50IGZyb20gbGVmdCB0byByaWdodFxuICAgICAgICAgICAgaWYgKCFzdGFydEJlZ2lubmluZykgeyBpID0gY3VycmVudE5vZGUuY2hpbGRyZW4ubGVuZ3RoIC0gMTsgfTtcbiAgICAgICAgICAgIHdoaWxlICgoc3RhcnRCZWdpbm5pbmcgJiYgbGVmdFN1bSA8PSBpbmRleCkgfHxcbiAgICAgICAgICAgICAgICAgICAoIXN0YXJ0QmVnaW5uaW5nICYmIGxlZnRTdW0gPiBpbmRleCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudE5vZGUuY2hpbGRyZW5baV0uX2hhc0VsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGVmdFN1bSA9IHVzZUZ1bmN0aW9uKGxlZnRTdW0sIDEpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgbGVmdFN1bSA9IHVzZUZ1bmN0aW9uKGxlZnRTdW0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlLmNoaWxkcmVuW2ldLnN1YkNvdW50ZXIpO1xuICAgICAgICAgICAgICAgIGkgPSB1c2VGdW5jdGlvbihpLCAxKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vICMyYiBkZWNyZWFzaW5nIHRoZSBpbmNyZW1lbnRhdGlvblxuICAgICAgICAgICAgaSA9IHVzZUZ1bmN0aW9uKGksIC0xKTtcbiAgICAgICAgICAgIGlmIChzdGFydEJlZ2lubmluZykge1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50Tm9kZS5jaGlsZHJlbltpXS5faGFzRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICBsZWZ0U3VtID0gdXNlRnVuY3Rpb24obGVmdFN1bSwgLTEpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgbGVmdFN1bSA9IHVzZUZ1bmN0aW9uKGxlZnRTdW0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC1jdXJyZW50Tm9kZS5jaGlsZHJlbltpXS5zdWJDb3VudGVyKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vICMzIGJ1aWxkIHBhdGhcbiAgICAgICAgICAgIHAgPSBbXTsgcC5wdXNoKGN1cnJlbnROb2RlLmNoaWxkcmVuW2ldLnQpO1xuICAgICAgICAgICAgaWYgKGJ1aWxkaW5nTm9kZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGJ1aWxkaW5nTm9kZSA9IG5ldyBMU2VxTm9kZShwLCBudWxsKTtcbiAgICAgICAgICAgICAgICBxdWV1ZSA9IGJ1aWxkaW5nTm9kZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGVtcCA9IG5ldyBMU2VxTm9kZShwLCBudWxsKTtcbiAgICAgICAgICAgICAgICBxdWV1ZS5hZGQodGVtcCk7XG4gICAgICAgICAgICAgICAgcXVldWUgPSB0ZW1wO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBfZ2V0KGxlZnRTdW0sIGJ1aWxkaW5nTm9kZSwgcXVldWUsIGN1cnJlbnROb2RlLmNoaWxkcmVuW2ldKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF9nZXQoMCwgbnVsbCwgbnVsbCwgdGhpcyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENhc3QgYSBKU09OIG9iamVjdCB0byBhbiBMU2VxTm9kZS4gXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG8gVGhlIEpTT04gb2JqZWN0LlxuICAgICAqIEByZXR1cm4ge0xTZXFOb2RlfSBBbiBMU2VxTm9kZS5cbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbUpTT04gKG8pIHtcbiAgICAgICAgbGV0IGJlaW5nQnVpbHQ7XG5cbiAgICAgICAgLy8gIzEgbGVhZlxuICAgICAgICBpZiAoby5jaGlsZHJlbi5sZW5ndGggPT09IDApe1xuICAgICAgICAgICAgYmVpbmdCdWlsdCA9IG5ldyBMU2VxTm9kZShbbmV3IFRyaXBsZShvLnQucCwgby50LnMsIG8udC5jKV0sIG8uZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyAjMiBicmFuY2hcbiAgICAgICAgICAgIGJlaW5nQnVpbHQgPSBuZXcgTFNlcU5vZGUoW25ldyBUcmlwbGUoby50LnAsIG8udC5zLCBvLnQuYyldKTtcbiAgICAgICAgICAgIGJlaW5nQnVpbHQuY2hpbGRyZW4ucHVzaChMU2VxTm9kZS5mcm9tSlNPTihvLmNoaWxkcmVuWzBdKSk7XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gYmVpbmdCdWlsdDtcbiAgICB9O1xuICAgIFxuICAgIC8qKlxuICAgICAqIEBwcml2YXRlIEdldCB0aGUgbGlzdCBvZiBpbmRleGVzIG9mIHRoZSBhcnJheXMgcmVwcmVzZW50aW5nIHRoZSBjaGlsZHJlblxuICAgICAqIGluIHRoZSB0cmVlLiAgXG4gICAgICogQHBhcmFtIHtMU2VxTm9kZX0gbm9kZSBUaGUgbm9kZSBjb250YWluaW5nIHRoZSBwYXRoLlxuICAgICAqIEByZXR1cm4ge051bWJlcltdfSBUaGUgc3VjY2Vzc2l2ZSBpbmRleGVzIHRvIGdldCB0byB0aGUgbm9kZS4gQW4gZW1wdHlcbiAgICAgKiBsaXN0IGlmIHRoZSBub2RlIGRvZXMgbm90IGV4aXN0LlxuICAgICAqL1xuICAgIF9nZXRJbmRleGVzIChub2RlKSB7XG4gICAgICAgIGNvbnN0IF9fZ2V0SW5kZXhlcyA9IChpbmRleGVzLCBjdXJyZW50VHJlZSwgY3VycmVudE5vZGUpID0+IHtcbiAgICAgICAgICAgIGlmICghY3VycmVudFRyZWUuX2NvbnRhaW5zKGN1cnJlbnROb2RlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gY3VycmVudFRyZWUuX2JpbmFyeUluZGV4T2YoY3VycmVudE5vZGUpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpbmRleGVzLnB1c2goaW5kZXgpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gKChjdXJyZW50Tm9kZS5jaGlsZHJlbi5sZW5ndGggPT09IDAgfHxcbiAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUcmVlLmNoaWxkcmVuLmxlbmd0aCA9PT0gMCkgJiYgaW5kZXhlcykgfHxcbiAgICAgICAgICAgICAgICBfX2dldEluZGV4ZXMoaW5kZXhlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFRyZWUuY2hpbGRyZW5baW5kZXhdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Tm9kZS5jaGlsZCk7ICAgICAgICAgICAgXG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gX19nZXRJbmRleGVzKFtdLCB0aGlzLCBub2RlKTtcbiAgICB9O1xuICAgIFxuICAgIFxuXG5cbiAgICAvKipcbiAgICAgKiBAcHJpdmF0ZSBmcm9tOiBbaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vV29sZnk4Ny81NzM0NTMwXSBQZXJmb3JtcyBhXG4gICAgICogYmluYXJ5IHNlYXJjaCBvbiB0aGUgaG9zdCBhcnJheS5cbiAgICAgKiBAcGFyYW0ge0xTZXFOb2RlfSBzZWFyY2hFbGVtZW50IFRoZSBpdGVtIHRvIHNlYXJjaCBmb3Igd2l0aGluIHRoZSBhcnJheS5cbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSBpbmRleCBvZiB0aGUgZWxlbWVudCB3aGljaCBkZWZhdWx0cyB0byAtMSB3aGVuIG5vdFxuICAgICAqIGZvdW5kLlxuICAgICAqL1xuICAgIF9iaW5hcnlJbmRleE9mIChzZWFyY2hFbGVtZW50KSB7XG4gICAgICAgIGxldCBtaW5JbmRleCA9IDA7XG4gICAgICAgIGxldCBtYXhJbmRleCA9IHRoaXMuY2hpbGRyZW4ubGVuZ3RoIC0gMTtcbiAgICAgICAgbGV0IGN1cnJlbnRJbmRleDtcbiAgICAgICAgbGV0IGN1cnJlbnRFbGVtZW50O1xuICAgICAgICBcbiAgICAgICAgd2hpbGUgKG1pbkluZGV4IDw9IG1heEluZGV4KSB7XG4gICAgICAgICAgICBjdXJyZW50SW5kZXggPSBNYXRoLmZsb29yKChtaW5JbmRleCArIG1heEluZGV4KSAvIDIpO1xuICAgICAgICAgICAgY3VycmVudEVsZW1lbnQgPSB0aGlzLmNoaWxkcmVuW2N1cnJlbnRJbmRleF07XG4gICAgICAgICAgICBpZiAoY3VycmVudEVsZW1lbnQuY29tcGFyZVRvKHNlYXJjaEVsZW1lbnQpIDwgMCkge1xuICAgICAgICAgICAgICAgIG1pbkluZGV4ID0gY3VycmVudEluZGV4ICsgMTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudEVsZW1lbnQuY29tcGFyZVRvKHNlYXJjaEVsZW1lbnQpID4gMCkge1xuICAgICAgICAgICAgICAgIG1heEluZGV4ID0gY3VycmVudEluZGV4IC0gMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRJbmRleDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB+bWF4SW5kZXg7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEBwcml2YXRlIENoZWNrIHdoZXRoZXIgdGhpcyBub2RlIGNvbnRhaW5zIHRoZSBzZWFyY2hFbGVtZW50IGFzIGNoaWxkcmVuLlxuICAgICAqIEBwYXJhbSB7TFNlcU5vZGV9IHNlYXJjaEVsZW1lbnQgVGhlIGVsZW1lbnQgdG8gbG9vayBmb3IuXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGlzIG5vZGUgY29udGFpbnMgdGhlIG5vZGUgaW4gaXRzXG4gICAgICogY2hpbGRyZW4sIEZhbHNlIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBfY29udGFpbnMgKHNlYXJjaEVsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9iaW5hcnlJbmRleE9mKHNlYXJjaEVsZW1lbnQpO1xuICAgICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5sZW5ndGggPiAwICYmXG4gICAgICAgICAgICAoaW5kZXggPiAwIHx8XG4gICAgICAgICAgICAgKChpbmRleCA9PT0gMCkgJiZcbiAgICAgICAgICAgICAgdGhpcy5jaGlsZC5jb21wYXJlVG8oc2VhcmNoRWxlbWVudCkgPT09IDApKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQHByaXZhdGUgQ2hlY2sgaWYgdGhlIG5vZGUgY29udGFpbnMgYW4gZWxlbWVudC5cbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSBUcnVlIGlmIHRoZSBub2RlIGhhcyBhbiBlbGVtZW50LCBmYWxzZSBvdGhlcndpc2UuXG4gICAgICovXG4gICAgZ2V0IF9oYXNFbGVtZW50ICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZSAhPT0gbnVsbDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdGhlIG5vZGUgaGFzIGNoaWxkcmVuLlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IFRydWUgaWYgdGhlIG5vZGUgaGFzIGNoaWxkcmVuLCBmYWxzZSBvdGhlcndpc2UuXG4gICAgICovXG4gICAgZ2V0IGlzTGVhZiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuLmxlbmd0aCA9PT0gMDtcbiAgICB9O1xuICAgIFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBMU2VxTm9kZTtcblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBCSSA9IHJlcXVpcmUoJ0JpZ0ludCcpO1xuY29uc3QgSWRlbnRpZmllciA9IHJlcXVpcmUoJy4vaWRlbnRpZmllci5qcycpO1xuXG4vKipcbiAqIEVudW1lcmF0ZSB0aGUgYXZhaWxhYmxlIHN1Yi1hbGxvY2F0aW9uIHN0cmF0ZWdpZXMuIFRoZSBzaWduYXR1cmUgb2YgdGhlc2VcbiAqIGZ1bmN0aW9ucyBpcyBmKElkLCBJZCwgTissIE4rLCBOLCBOKTogSWQuXG4gKi9cbmNsYXNzIFN0cmF0ZWd5IHsgICAgXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtCYXNlfSBiYXNlIFRoZSBiYXNlIHVzZWQgdG8gY3JlYXRlIHRoZSBuZXcgaWRlbnRpZmllcnMuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtib3VuZGFyeSA9IDEwXSBUaGUgdmFsdWUgdXNlZCBhcyB0aGUgZGVmYXVsdCBtYXhpbXVtXG4gICAgICogc3BhY2luZyBiZXR3ZWVuIGlkZW50aWZpZXJzLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yIChiYXNlLCBib3VuZGFyeSA9IDEwKSB7XG4gICAgICAgIHRoaXMuX2Jhc2UgPSBiYXNlO1xuICAgICAgICB0aGlzLl9ib3VuZGFyeSA9IGJvdW5kYXJ5O1xuICAgIH07XG4gICAgXG4gICAgLyoqXG4gICAgICogQ2hvb3NlIGFuIGlkZW50aWZpZXIgc3RhcnRpbmcgZnJvbSBwcmV2aW91cyBib3VuZCBhbmQgYWRkaW5nIHJhbmRvbVxuICAgICAqIG51bWJlci5cbiAgICAgKiBAcGFyYW0ge0xTZXFOb2RlfSBwIFRoZSBwcmV2aW91cyBpZGVudGlmaWVyLlxuICAgICAqIEBwYXJhbSB7TFNlcU5vZGV9IHEgVGhlIG5leHQgaWRlbnRpZmllci5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbGV2ZWwgVGhlIG51bWJlciBvZiBjb25jYXRlbmF0aW9uIGNvbXBvc2luZyB0aGUgbmV3XG4gICAgICogaWRlbnRpZmllci5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaW50ZXJ2YWwgVGhlIGludGVydmFsIGJldHdlZW4gcCBhbmQgcS5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcyBUaGUgc291cmNlIHRoYXQgY3JlYXRlcyB0aGUgbmV3IGlkZW50aWZpZXIuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGMgVGhlIGNvdW50ZXIgb2YgdGhhdCBzb3VyY2UuXG4gICAgICogQHJldHVybiB7SWRlbnRpZmllcn0gVGhlIG5ldyBhbGxvY2F0ZWQgaWRlbnRpZmllci5cbiAgICAgKi9cbiAgICBiUGx1cyAocCwgcSwgbGV2ZWwsIGludGVydmFsLCBzLCBjKSB7XG4gICAgICAgIGxldCBjb3B5UCA9IHAsIGNvcHlRID0gcSxcbiAgICAgICAgICAgIHN0ZXAgPSBNYXRoLm1pbih0aGlzLl9ib3VuZGFyeSwgaW50ZXJ2YWwpLCAvLyMwIHRoZSBtaW4gaW50ZXJ2YWxcbiAgICAgICAgICAgIGRpZ2l0ID0gQkkuaW50MmJpZ0ludCgwLCB0aGlzLl9iYXNlLmdldFN1bUJpdChsZXZlbCkpLFxuICAgICAgICAgICAgdmFsdWU7XG4gICAgICAgIFxuICAgICAgICAvLyAjMSBjb3B5IHRoZSBwcmV2aW91cyBpZGVudGlmaWVyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IGxldmVsOyArK2kpIHtcblx0ICAgIHZhbHVlID0gKHAgJiYgcC50LnApIHx8IDA7XG4gICAgICAgICAgICBCSS5hZGRJbnRfKGRpZ2l0LCB2YWx1ZSk7XG4gICAgICAgICAgICBpZiAoaSAhPT0gbGV2ZWwpIHtcbiAgICAgICAgICAgICAgICBCSS5sZWZ0U2hpZnRfKGRpZ2l0LCB0aGlzLl9iYXNlLmdldEJpdEJhc2UoaSArIDEpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBwID0gKHAgJiYgIXAuaXNMZWFmICYmIHAuY2hpbGQpIHx8IG51bGw7XG4gICAgICAgIH07XG4gICAgICAgIC8vICMyIGNyZWF0ZSBhIGRpZ2l0IGZvciBhbiBpZGVudGlmaWVyIGJ5IGFkZGluZyBhIHJhbmRvbSB2YWx1ZVxuICAgICAgICAvLyAjQSBEaWdpdFxuICAgICAgICBCSS5hZGRJbnRfKGRpZ2l0LCBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBzdGVwICsgMSkpO1xuICAgICAgICAvLyAjQiBTb3VyY2UgJiBjb3VudGVyXG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRTQyhkaWdpdCwgY29weVAsIGNvcHlRLCBsZXZlbCwgcywgYyk7XG4gICAgfTtcblxuXG4gICAgXG4gICAgLyoqXG4gICAgICogQ2hvb3NlIGFuIGlkZW50aWZpZXIgc3RhcnRpbmcgZnJvbSBuZXh0IGJvdW5kIGFuZCBzdWJzdHJhY3QgYSByYW5kb21cbiAgICAgKiBudW1iZXIuXG4gICAgICogQHBhcmFtIHtMU2VxTm9kZX0gcCBUaGUgcHJldmlvdXMgaWRlbnRpZmllci5cbiAgICAgKiBAcGFyYW0ge0xTZXFOb2RlfSBxIFRoZSBuZXh0IGlkZW50aWZpZXIuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGxldmVsIFRoZSBudW1iZXIgb2YgY29uY2F0ZW5hdGlvbiBjb21wb3NpbmcgdGhlIG5ld1xuICAgICAqIGlkZW50aWZpZXIuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGludGVydmFsIFRoZSBpbnRlcnZhbCBiZXR3ZWVuIHAgYW5kIHEuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHMgVGhlIHNvdXJjZSB0aGF0IGNyZWF0ZXMgdGhlIG5ldyBpZGVudGlmaWVyLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBjIFRoZSBjb3VudGVyIG9mIHRoYXQgc291cmNlLlxuICAgICAqL1xuICAgIGJNaW51cyAocCwgcSwgbGV2ZWwsIGludGVydmFsLCBzLCBjKSB7XG4gICAgICAgIGxldCBjb3B5UCA9IHAsIGNvcHlRID0gcSxcbiAgICAgICAgICAgIHN0ZXAgPSBNYXRoLm1pbih0aGlzLl9ib3VuZGFyeSwgaW50ZXJ2YWwpLC8vICMwIHByb2Nlc3MgbWluIGludGVydmFsXG4gICAgICAgICAgICBkaWdpdCA9IEJJLmludDJiaWdJbnQoMCwgdGhpcy5fYmFzZS5nZXRTdW1CaXQobGV2ZWwpKSxcbiAgICAgICAgICAgIHBJc0dyZWF0ZXIgPSBmYWxzZSwgY29tbW9uUm9vdCA9IHRydWUsXG4gICAgICAgICAgICBwcmV2VmFsdWUsIG5leHRWYWx1ZTtcbiAgICAgICAgXG4gICAgICAgIC8vICMxIGNvcHkgbmV4dCwgaWYgcHJldmlvdXMgaXMgZ3JlYXRlciwgY29weSBtYXhWYWx1ZSBAIGRlcHRoXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IGxldmVsOyArK2kpIHtcbiAgICAgICAgICAgIHByZXZWYWx1ZSA9IChwICYmIHAudC5wKSB8fCAwO1xuICAgICAgICAgICAgbmV4dFZhbHVlID0gKHEgJiYgcS50LnApIHx8IDA7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChjb21tb25Sb290ICYmIHByZXZWYWx1ZSAhPT0gbmV4dFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgY29tbW9uUm9vdCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHBJc0dyZWF0ZXIgPSBwcmV2VmFsdWUgPiBuZXh0VmFsdWU7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKHBJc0dyZWF0ZXIpIHtcbiAgICAgICAgICAgICAgICBuZXh0VmFsdWUgPSBNYXRoLnBvdygyLHRoaXMuX2Jhc2UuZ2V0Qml0QmFzZShpKSktMTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBCSS5hZGRJbnRfKGRpZ2l0LCBuZXh0VmFsdWUpO1xuICAgICAgICAgICAgaWYgKGkgIT09IGxldmVsKSB7XG4gICAgICAgICAgICAgICAgQkkubGVmdFNoaWZ0XyhkaWdpdCx0aGlzLl9iYXNlLmdldEJpdEJhc2UoaSsxKSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBxID0gKHEgJiYgIXEuaXNMZWFmICYmIHEuY2hpbGQpIHx8IG51bGw7XG4gICAgICAgICAgICBwID0gKHAgJiYgIXAuaXNMZWFmICYmIHAuY2hpbGQpIHx8IG51bGw7XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICAvLyAjMyBjcmVhdGUgYSBkaWdpdCBmb3IgYW4gaWRlbnRpZmllciBieSBzdWJpbmcgYSByYW5kb20gdmFsdWVcbiAgICAgICAgLy8gI0EgRGlnaXRcbiAgICAgICAgaWYgKHBJc0dyZWF0ZXIpIHtcbiAgICAgICAgICAgIEJJLmFkZEludF8oZGlnaXQsIC1NYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqc3RlcCkgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIEJJLmFkZEludF8oZGlnaXQsIC1NYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqc3RlcCktMSApO1xuICAgICAgICB9O1xuICAgIFxuICAgICAgICAvLyAjQiBTb3VyY2UgJiBjb3VudGVyXG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRTQyhkaWdpdCwgY29weVAsIGNvcHlRLCBsZXZlbCwgcywgYyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENvcGllcyB0aGUgYXBwcm9wcmlhdGVzIHNvdXJjZSBhbmQgY291bnRlciBmcm9tIHRoZSBhZGphY2VudCBpZGVudGlmaWVyc1xuICAgICAqIGF0IHRoZSBpbnNlcnRpb24gcG9zaXRpb24uXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGQgVGhlIGRpZ2l0IHBhcnQgb2YgdGhlIG5ldyBpZGVudGlmaWVyLlxuICAgICAqIEBwYXJhbSB7TFNlcU5vZGV9IHAgVGhlIHByZXZpb3VzIGlkZW50aWZpZXIuXG4gICAgICogQHBhcmFtIHtMU2VxTm9kZX0gcSB0aGUgbmV4dCBpZGVudGlmaWVyLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBsZXZlbCBUaGUgc2l6ZSBvZiB0aGUgbmV3IGlkZW50aWZpZXIuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHMgVGhlIGxvY2FsIHNpdGUgaWRlbnRpZmllci5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gYyBUaGUgbG9jYWwgbW9ub3RvbmljIGNvdW50ZXIuXG4gICAgICogQHJldHVybiB7SWRlbnRpZmllcn0gVGhlIG5ldyBhbGxvY2F0ZWQgaWRlbnRpZmllci5cbiAgICAgKi9cbiAgICBfZ2V0U0MgKGQsIHAsIHEsIGxldmVsLCBzLCBjKSB7XG4gICAgICAgIGxldCBzb3VyY2VzID0gW10sIGNvdW50ZXJzID0gW10sXG4gICAgICAgICAgICBpID0gMCxcbiAgICAgICAgICAgIHN1bUJpdCA9IHRoaXMuX2Jhc2UuZ2V0U3VtQml0KGxldmVsKSxcbiAgICAgICAgICAgIHRlbXBEaWdpdCwgdmFsdWU7XG4gICAgICAgIFxuICAgICAgICB3aGlsZSAoaSA8PSBsZXZlbCkge1xuICAgICAgICAgICAgdGVtcERpZ2l0ID0gQkkuZHVwKGQpO1xuICAgICAgICAgICAgQkkucmlnaHRTaGlmdF8odGVtcERpZ2l0LCBzdW1CaXQgLSB0aGlzLl9iYXNlLmdldFN1bUJpdChpKSk7XG4gICAgICAgICAgICB2YWx1ZSA9IEJJLm1vZEludCh0ZW1wRGlnaXQsIE1hdGgucG93KDIsIHRoaXMuX2Jhc2UuZ2V0Qml0QmFzZShpKSkpO1xuICAgICAgICAgICAgc291cmNlc1tpXT1zO1xuICAgICAgICAgICAgY291bnRlcnNbaV09YztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHEgJiYgcS50LnAgPT09IHZhbHVlKSB7IHNvdXJjZXNbaV09cS50LnM7IGNvdW50ZXJzW2ldPXEudC5jOyB9O1xuICAgICAgICAgICAgaWYgKHAgJiYgcC50LnAgPT09IHZhbHVlKSB7IHNvdXJjZXNbaV09cC50LnM7IGNvdW50ZXJzW2ldPXAudC5jOyB9O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBxID0gKHEgJiYgIXEuaXNMZWFmICYmIHEuY2hpbGQpIHx8IG51bGw7XG4gICAgICAgICAgICBwID0gKHAgJiYgIXAuaXNMZWFmICYmIHAuY2hpbGQpIHx8IG51bGw7XG5cbiAgICAgICAgICAgICsraTtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBuZXcgSWRlbnRpZmllcih0aGlzLl9iYXNlLCBkLCBzb3VyY2VzLCBjb3VudGVycyk7XG4gICAgfTtcbiAgICBcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU3RyYXRlZ3k7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVHJpcGxlIHRoYXQgY29udGFpbnMgPHBhdGg7IHNpdGU7IGNvdW50ZXI+LiBJZGVudGlmaWVycyBvZiBMU0VRIGFyZSBsaXN0cyBvZlxuICogdHJpcGxlcy5cbiAqL1xuY2xhc3MgVHJpcGxlIHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBwYXRoIFRoZSBwYXJ0IG9mIHRoZSBwYXRoIGluIHRoZSB0cmVlLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfFN0cmluZ30gc2l0ZSBUaGUgdW5pcXVlIHNpdGUgaWRlbnRpZmllciB0aGF0IGNyZWF0ZWQgdGhlXG4gICAgICogdHJpcGxlLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBjb3VudGVyIFRoZSBsb2NhbCBjb3VudGVyIG9mIHRoZSBzaXRlIHdoZW4gaXQgY3JlYXRlZCB0aGVcbiAgICAgKiB0cmlwbGUuXG4gICAgICovICAgICAgIFxuICAgIGNvbnN0cnVjdG9yIChwYXRoLCBzaXRlLCBjb3VudGVyKSB7XG4gICAgICAgIHRoaXMucCA9IHBhdGg7XG4gICAgICAgIHRoaXMucyA9IHNpdGU7XG4gICAgICAgIHRoaXMuYyA9IGNvdW50ZXI7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENvbXBhcmUgdHdvIHRyaXBsZXMgcHJpb3JpdGl6aW5nIHRoZSBwYXRoLCB0aGVuIHNpdGUsIHRoZW4gY291bnRlci5cbiAgICAgKiBAcGFyYW0ge1RyaXBsZX0gbyB0aGUgb3RoZXIgdHJpcGxlIHRvIGNvbXBhcmUgLlxuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9IC0xIGlmIHRoaXMgaXMgbG93ZXIgdGhhbiBvLCAxIGlmIHRoaXMgaXMgZ3JlYXRlciB0aGFuXG4gICAgICogbywgMCBvdGhlcndpc2UuXG4gICAgICovXG4gICAgY29tcGFyZVRvIChvKSB7XG4gICAgICAgIC8vICMxIHByb2Nlc3MgbWF4aW1hbCB2aXJ0dWFsIGJvdW5kc1xuICAgICAgICBpZiAodGhpcy5zID09PSBOdW1iZXIuTUFYX1ZBTFVFICYmIHRoaXMuYyA9PT0gTnVtYmVyLk1BWF9WQUxVRSl7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKG8ucyA9PT0gTnVtYmVyLk1BWF9WQUxVRSAmJiBvLnMgPT09IE51bWJlci5NQVhfVkFMVUUpe1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9O1xuICAgICAgICAvLyAjMiBjb21wYXJlIHAgdGhlbiBzIHRoZW4gY1xuICAgICAgICBpZiAodGhpcy5wIDwgby5wKSB7IHJldHVybiAtMTt9O1xuICAgICAgICBpZiAodGhpcy5wID4gby5wKSB7IHJldHVybiAxIDt9O1xuICAgICAgICBpZiAodGhpcy5zIDwgby5zKSB7IHJldHVybiAtMTt9O1xuICAgICAgICBpZiAodGhpcy5zID4gby5zKSB7IHJldHVybiAxIDt9O1xuICAgICAgICBpZiAodGhpcy5jIDwgby5jKSB7IHJldHVybiAtMTt9O1xuICAgICAgICBpZiAodGhpcy5jID4gby5jKSB7IHJldHVybiAxIDt9O1xuICAgICAgICAvLyAjMyB0aGV5IGFyZSBlcXVhbFxuICAgICAgICByZXR1cm4gMDtcbiAgICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBUcmlwbGU7XG4iLCIvLyBWamV1eDogQ3VzdG9taXplZCBiaWdJbnQyc3RyIGFuZCBzdHIyYmlnSW50IGluIG9yZGVyIHRvIGFjY2VwdCBjdXN0b20gYmFzZS5cblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gQmlnIEludGVnZXIgTGlicmFyeSB2LiA1LjRcbi8vIENyZWF0ZWQgMjAwMCwgbGFzdCBtb2RpZmllZCAyMDA5XG4vLyBMZWVtb24gQmFpcmRcbi8vIHd3dy5sZWVtb24uY29tXG4vL1xuLy8gVmVyc2lvbiBoaXN0b3J5OlxuLy8gdiA1LjQgIDMgT2N0IDIwMDlcbi8vICAgLSBhZGRlZCBcInZhciBpXCIgdG8gZ3JlYXRlclNoaWZ0KCkgc28gaSBpcyBub3QgZ2xvYmFsLiAoVGhhbmtzIHRvIFDvv710ZXIgU3phYu+/vSBmb3IgZmluZGluZyB0aGF0IGJ1Zylcbi8vXG4vLyB2IDUuMyAgMjEgU2VwIDIwMDlcbi8vICAgLSBhZGRlZCByYW5kUHJvYlByaW1lKGspIGZvciBwcm9iYWJsZSBwcmltZXNcbi8vICAgLSB1bnJvbGxlZCBsb29wIGluIG1vbnRfIChzbGlnaHRseSBmYXN0ZXIpXG4vLyAgIC0gbWlsbGVyUmFiaW4gbm93IHRha2VzIGEgYmlnSW50IHBhcmFtZXRlciByYXRoZXIgdGhhbiBhbiBpbnRcbi8vXG4vLyB2IDUuMiAgMTUgU2VwIDIwMDlcbi8vICAgLSBmaXhlZCBjYXBpdGFsaXphdGlvbiBpbiBjYWxsIHRvIGludDJiaWdJbnQgaW4gcmFuZEJpZ0ludFxuLy8gICAgICh0aGFua3MgdG8gRW1pbGkgRXZyaXBpZG91LCBSZWluaG9sZCBCZWhyaW5nZXIsIGFuZCBTYW11ZWwgTWFjYWxlZXNlIGZvciBmaW5kaW5nIHRoYXQgYnVnKVxuLy9cbi8vIHYgNS4xICA4IE9jdCAyMDA3XG4vLyAgIC0gcmVuYW1lZCBpbnZlcnNlTW9kSW50XyB0byBpbnZlcnNlTW9kSW50IHNpbmNlIGl0IGRvZXNuJ3QgY2hhbmdlIGl0cyBwYXJhbWV0ZXJzXG4vLyAgIC0gYWRkZWQgZnVuY3Rpb25zIEdDRCBhbmQgcmFuZEJpZ0ludCwgd2hpY2ggY2FsbCBHQ0RfIGFuZCByYW5kQmlnSW50X1xuLy8gICAtIGZpeGVkIGEgYnVnIGZvdW5kIGJ5IFJvYiBWaXNzZXIgKHNlZSBjb21tZW50IHdpdGggaGlzIG5hbWUgYmVsb3cpXG4vLyAgIC0gaW1wcm92ZWQgY29tbWVudHNcbi8vXG4vLyBUaGlzIGZpbGUgaXMgcHVibGljIGRvbWFpbi4gICBZb3UgY2FuIHVzZSBpdCBmb3IgYW55IHB1cnBvc2Ugd2l0aG91dCByZXN0cmljdGlvbi5cbi8vIEkgZG8gbm90IGd1YXJhbnRlZSB0aGF0IGl0IGlzIGNvcnJlY3QsIHNvIHVzZSBpdCBhdCB5b3VyIG93biByaXNrLiAgSWYgeW91IHVzZVxuLy8gaXQgZm9yIHNvbWV0aGluZyBpbnRlcmVzdGluZywgSSdkIGFwcHJlY2lhdGUgaGVhcmluZyBhYm91dCBpdC4gIElmIHlvdSBmaW5kXG4vLyBhbnkgYnVncyBvciBtYWtlIGFueSBpbXByb3ZlbWVudHMsIEknZCBhcHByZWNpYXRlIGhlYXJpbmcgYWJvdXQgdGhvc2UgdG9vLlxuLy8gSXQgd291bGQgYWxzbyBiZSBuaWNlIGlmIG15IG5hbWUgYW5kIFVSTCB3ZXJlIGxlZnQgaW4gdGhlIGNvbW1lbnRzLiAgQnV0IG5vbmVcbi8vIG9mIHRoYXQgaXMgcmVxdWlyZWQuXG4vL1xuLy8gVGhpcyBjb2RlIGRlZmluZXMgYSBiaWdJbnQgbGlicmFyeSBmb3IgYXJiaXRyYXJ5LXByZWNpc2lvbiBpbnRlZ2Vycy5cbi8vIEEgYmlnSW50IGlzIGFuIGFycmF5IG9mIGludGVnZXJzIHN0b3JpbmcgdGhlIHZhbHVlIGluIGNodW5rcyBvZiBicGUgYml0cyxcbi8vIGxpdHRsZSBlbmRpYW4gKGJ1ZmZbMF0gaXMgdGhlIGxlYXN0IHNpZ25pZmljYW50IHdvcmQpLlxuLy8gTmVnYXRpdmUgYmlnSW50cyBhcmUgc3RvcmVkIHR3bydzIGNvbXBsZW1lbnQuICBBbG1vc3QgYWxsIHRoZSBmdW5jdGlvbnMgdHJlYXRcbi8vIGJpZ0ludHMgYXMgbm9ubmVnYXRpdmUuICBUaGUgZmV3IHRoYXQgdmlldyB0aGVtIGFzIHR3bydzIGNvbXBsZW1lbnQgc2F5IHNvXG4vLyBpbiB0aGVpciBjb21tZW50cy4gIFNvbWUgZnVuY3Rpb25zIGFzc3VtZSB0aGVpciBwYXJhbWV0ZXJzIGhhdmUgYXQgbGVhc3Qgb25lXG4vLyBsZWFkaW5nIHplcm8gZWxlbWVudC4gRnVuY3Rpb25zIHdpdGggYW4gdW5kZXJzY29yZSBhdCB0aGUgZW5kIG9mIHRoZSBuYW1lIHB1dFxuLy8gdGhlaXIgYW5zd2VyIGludG8gb25lIG9mIHRoZSBhcnJheXMgcGFzc2VkIGluLCBhbmQgaGF2ZSB1bnByZWRpY3RhYmxlIGJlaGF2aW9yXG4vLyBpbiBjYXNlIG9mIG92ZXJmbG93LCBzbyB0aGUgY2FsbGVyIG11c3QgbWFrZSBzdXJlIHRoZSBhcnJheXMgYXJlIGJpZyBlbm91Z2ggdG9cbi8vIGhvbGQgdGhlIGFuc3dlci4gIEJ1dCB0aGUgYXZlcmFnZSB1c2VyIHNob3VsZCBuZXZlciBoYXZlIHRvIGNhbGwgYW55IG9mIHRoZVxuLy8gdW5kZXJzY29yZWQgZnVuY3Rpb25zLiAgRWFjaCBpbXBvcnRhbnQgdW5kZXJzY29yZWQgZnVuY3Rpb24gaGFzIGEgd3JhcHBlciBmdW5jdGlvblxuLy8gb2YgdGhlIHNhbWUgbmFtZSB3aXRob3V0IHRoZSB1bmRlcnNjb3JlIHRoYXQgdGFrZXMgY2FyZSBvZiB0aGUgZGV0YWlscyBmb3IgeW91LlxuLy8gRm9yIGVhY2ggdW5kZXJzY29yZWQgZnVuY3Rpb24gd2hlcmUgYSBwYXJhbWV0ZXIgaXMgbW9kaWZpZWQsIHRoYXQgc2FtZSB2YXJpYWJsZVxuLy8gbXVzdCBub3QgYmUgdXNlZCBhcyBhbm90aGVyIGFyZ3VtZW50IHRvby4gIFNvLCB5b3UgY2Fubm90IHNxdWFyZSB4IGJ5IGRvaW5nXG4vLyBtdWx0TW9kXyh4LHgsbikuICBZb3UgbXVzdCB1c2Ugc3F1YXJlTW9kXyh4LG4pIGluc3RlYWQsIG9yIGRvIHk9ZHVwKHgpOyBtdWx0TW9kXyh4LHksbikuXG4vLyBPciBzaW1wbHkgdXNlIHRoZSBtdWx0TW9kKHgseCxuKSBmdW5jdGlvbiB3aXRob3V0IHRoZSB1bmRlcnNjb3JlLCB3aGVyZVxuLy8gc3VjaCBpc3N1ZXMgbmV2ZXIgYXJpc2UsIGJlY2F1c2Ugbm9uLXVuZGVyc2NvcmVkIGZ1bmN0aW9ucyBuZXZlciBjaGFuZ2Vcbi8vIHRoZWlyIHBhcmFtZXRlcnM7IHRoZXkgYWx3YXlzIGFsbG9jYXRlIG5ldyBtZW1vcnkgZm9yIHRoZSBhbnN3ZXIgdGhhdCBpcyByZXR1cm5lZC5cbi8vXG4vLyBUaGVzZSBmdW5jdGlvbnMgYXJlIGRlc2lnbmVkIHRvIGF2b2lkIGZyZXF1ZW50IGR5bmFtaWMgbWVtb3J5IGFsbG9jYXRpb24gaW4gdGhlIGlubmVyIGxvb3AuXG4vLyBGb3IgbW9zdCBmdW5jdGlvbnMsIGlmIGl0IG5lZWRzIGEgQmlnSW50IGFzIGEgbG9jYWwgdmFyaWFibGUgaXQgd2lsbCBhY3R1YWxseSB1c2Vcbi8vIGEgZ2xvYmFsLCBhbmQgd2lsbCBvbmx5IGFsbG9jYXRlIHRvIGl0IG9ubHkgd2hlbiBpdCdzIG5vdCB0aGUgcmlnaHQgc2l6ZS4gIFRoaXMgZW5zdXJlc1xuLy8gdGhhdCB3aGVuIGEgZnVuY3Rpb24gaXMgY2FsbGVkIHJlcGVhdGVkbHkgd2l0aCBzYW1lLXNpemVkIHBhcmFtZXRlcnMsIGl0IG9ubHkgYWxsb2NhdGVzXG4vLyBtZW1vcnkgb24gdGhlIGZpcnN0IGNhbGwuXG4vL1xuLy8gTm90ZSB0aGF0IGZvciBjcnlwdG9ncmFwaGljIHB1cnBvc2VzLCB0aGUgY2FsbHMgdG8gTWF0aC5yYW5kb20oKSBtdXN0XG4vLyBiZSByZXBsYWNlZCB3aXRoIGNhbGxzIHRvIGEgYmV0dGVyIHBzZXVkb3JhbmRvbSBudW1iZXIgZ2VuZXJhdG9yLlxuLy9cbi8vIEluIHRoZSBmb2xsb3dpbmcsIFwiYmlnSW50XCIgbWVhbnMgYSBiaWdJbnQgd2l0aCBhdCBsZWFzdCBvbmUgbGVhZGluZyB6ZXJvIGVsZW1lbnQsXG4vLyBhbmQgXCJpbnRlZ2VyXCIgbWVhbnMgYSBub25uZWdhdGl2ZSBpbnRlZ2VyIGxlc3MgdGhhbiByYWRpeC4gIEluIHNvbWUgY2FzZXMsIGludGVnZXJcbi8vIGNhbiBiZSBuZWdhdGl2ZS4gIE5lZ2F0aXZlIGJpZ0ludHMgYXJlIDJzIGNvbXBsZW1lbnQuXG4vL1xuLy8gVGhlIGZvbGxvd2luZyBmdW5jdGlvbnMgZG8gbm90IG1vZGlmeSB0aGVpciBpbnB1dHMuXG4vLyBUaG9zZSByZXR1cm5pbmcgYSBiaWdJbnQsIHN0cmluZywgb3IgQXJyYXkgd2lsbCBkeW5hbWljYWxseSBhbGxvY2F0ZSBtZW1vcnkgZm9yIHRoYXQgdmFsdWUuXG4vLyBUaG9zZSByZXR1cm5pbmcgYSBib29sZWFuIHdpbGwgcmV0dXJuIHRoZSBpbnRlZ2VyIDAgKGZhbHNlKSBvciAxICh0cnVlKS5cbi8vIFRob3NlIHJldHVybmluZyBib29sZWFuIG9yIGludCB3aWxsIG5vdCBhbGxvY2F0ZSBtZW1vcnkgZXhjZXB0IHBvc3NpYmx5IG9uIHRoZSBmaXJzdFxuLy8gdGltZSB0aGV5J3JlIGNhbGxlZCB3aXRoIGEgZ2l2ZW4gcGFyYW1ldGVyIHNpemUuXG4vL1xuLy8gYmlnSW50ICBhZGQoeCx5KSAgICAgICAgICAgICAgIC8vcmV0dXJuICh4K3kpIGZvciBiaWdJbnRzIHggYW5kIHkuXG4vLyBiaWdJbnQgIGFkZEludCh4LG4pICAgICAgICAgICAgLy9yZXR1cm4gKHgrbikgd2hlcmUgeCBpcyBhIGJpZ0ludCBhbmQgbiBpcyBhbiBpbnRlZ2VyLlxuLy8gc3RyaW5nICBiaWdJbnQyc3RyKHgsYmFzZSkgICAgIC8vcmV0dXJuIGEgc3RyaW5nIGZvcm0gb2YgYmlnSW50IHggaW4gYSBnaXZlbiBiYXNlLCB3aXRoIDIgPD0gYmFzZSA8PSA5NVxuLy8gaW50ICAgICBiaXRTaXplKHgpICAgICAgICAgICAgIC8vcmV0dXJuIGhvdyBtYW55IGJpdHMgbG9uZyB0aGUgYmlnSW50IHggaXMsIG5vdCBjb3VudGluZyBsZWFkaW5nIHplcm9zXG4vLyBiaWdJbnQgIGR1cCh4KSAgICAgICAgICAgICAgICAgLy9yZXR1cm4gYSBjb3B5IG9mIGJpZ0ludCB4XG4vLyBib29sZWFuIGVxdWFscyh4LHkpICAgICAgICAgICAgLy9pcyB0aGUgYmlnSW50IHggZXF1YWwgdG8gdGhlIGJpZ2ludCB5P1xuLy8gYm9vbGVhbiBlcXVhbHNJbnQoeCx5KSAgICAgICAgIC8vaXMgYmlnaW50IHggZXF1YWwgdG8gaW50ZWdlciB5P1xuLy8gYmlnSW50ICBleHBhbmQoeCxuKSAgICAgICAgICAgIC8vcmV0dXJuIGEgY29weSBvZiB4IHdpdGggYXQgbGVhc3QgbiBlbGVtZW50cywgYWRkaW5nIGxlYWRpbmcgemVyb3MgaWYgbmVlZGVkXG4vLyBBcnJheSAgIGZpbmRQcmltZXMobikgICAgICAgICAgLy9yZXR1cm4gYXJyYXkgb2YgYWxsIHByaW1lcyBsZXNzIHRoYW4gaW50ZWdlciBuXG4vLyBiaWdJbnQgIEdDRCh4LHkpICAgICAgICAgICAgICAgLy9yZXR1cm4gZ3JlYXRlc3QgY29tbW9uIGRpdmlzb3Igb2YgYmlnSW50cyB4IGFuZCB5IChlYWNoIHdpdGggc2FtZSBudW1iZXIgb2YgZWxlbWVudHMpLlxuLy8gYm9vbGVhbiBncmVhdGVyKHgseSkgICAgICAgICAgIC8vaXMgeD55PyAgKHggYW5kIHkgYXJlIG5vbm5lZ2F0aXZlIGJpZ0ludHMpXG4vLyBib29sZWFuIGdyZWF0ZXJTaGlmdCh4LHksc2hpZnQpLy9pcyAoeCA8PChzaGlmdCpicGUpKSA+IHk/XG4vLyBiaWdJbnQgIGludDJiaWdJbnQodCxuLG0pICAgICAgLy9yZXR1cm4gYSBiaWdJbnQgZXF1YWwgdG8gaW50ZWdlciB0LCB3aXRoIGF0IGxlYXN0IG4gYml0cyBhbmQgbSBhcnJheSBlbGVtZW50c1xuLy8gYmlnSW50ICBpbnZlcnNlTW9kKHgsbikgICAgICAgIC8vcmV0dXJuICh4KiooLTEpIG1vZCBuKSBmb3IgYmlnSW50cyB4IGFuZCBuLiAgSWYgbm8gaW52ZXJzZSBleGlzdHMsIGl0IHJldHVybnMgbnVsbFxuLy8gaW50ICAgICBpbnZlcnNlTW9kSW50KHgsbikgICAgIC8vcmV0dXJuIHgqKigtMSkgbW9kIG4sIGZvciBpbnRlZ2VycyB4IGFuZCBuLiAgUmV0dXJuIDAgaWYgdGhlcmUgaXMgbm8gaW52ZXJzZVxuLy8gYm9vbGVhbiBpc1plcm8oeCkgICAgICAgICAgICAgIC8vaXMgdGhlIGJpZ0ludCB4IGVxdWFsIHRvIHplcm8/XG4vLyBib29sZWFuIG1pbGxlclJhYmluKHgsYikgICAgICAgLy9kb2VzIG9uZSByb3VuZCBvZiBNaWxsZXItUmFiaW4gYmFzZSBpbnRlZ2VyIGIgc2F5IHRoYXQgYmlnSW50IHggaXMgcG9zc2libHkgcHJpbWU/IChiIGlzIGJpZ0ludCwgMTxiPHgpXG4vLyBib29sZWFuIG1pbGxlclJhYmluSW50KHgsYikgICAgLy9kb2VzIG9uZSByb3VuZCBvZiBNaWxsZXItUmFiaW4gYmFzZSBpbnRlZ2VyIGIgc2F5IHRoYXQgYmlnSW50IHggaXMgcG9zc2libHkgcHJpbWU/IChiIGlzIGludCwgICAgMTxiPHgpXG4vLyBiaWdJbnQgIG1vZCh4LG4pICAgICAgICAgICAgICAgLy9yZXR1cm4gYSBuZXcgYmlnSW50IGVxdWFsIHRvICh4IG1vZCBuKSBmb3IgYmlnSW50cyB4IGFuZCBuLlxuLy8gaW50ICAgICBtb2RJbnQoeCxuKSAgICAgICAgICAgIC8vcmV0dXJuIHggbW9kIG4gZm9yIGJpZ0ludCB4IGFuZCBpbnRlZ2VyIG4uXG4vLyBiaWdJbnQgIG11bHQoeCx5KSAgICAgICAgICAgICAgLy9yZXR1cm4geCp5IGZvciBiaWdJbnRzIHggYW5kIHkuIFRoaXMgaXMgZmFzdGVyIHdoZW4geTx4LlxuLy8gYmlnSW50ICBtdWx0TW9kKHgseSxuKSAgICAgICAgIC8vcmV0dXJuICh4KnkgbW9kIG4pIGZvciBiaWdJbnRzIHgseSxuLiAgRm9yIGdyZWF0ZXIgc3BlZWQsIGxldCB5PHguXG4vLyBib29sZWFuIG5lZ2F0aXZlKHgpICAgICAgICAgICAgLy9pcyBiaWdJbnQgeCBuZWdhdGl2ZT9cbi8vIGJpZ0ludCAgcG93TW9kKHgseSxuKSAgICAgICAgICAvL3JldHVybiAoeCoqeSBtb2Qgbikgd2hlcmUgeCx5LG4gYXJlIGJpZ0ludHMgYW5kICoqIGlzIGV4cG9uZW50aWF0aW9uLiAgMCoqMD0xLiBGYXN0ZXIgZm9yIG9kZCBuLlxuLy8gYmlnSW50ICByYW5kQmlnSW50KG4scykgICAgICAgIC8vcmV0dXJuIGFuIG4tYml0IHJhbmRvbSBCaWdJbnQgKG4+PTEpLiAgSWYgcz0xLCB0aGVuIHRoZSBtb3N0IHNpZ25pZmljYW50IG9mIHRob3NlIG4gYml0cyBpcyBzZXQgdG8gMS5cbi8vIGJpZ0ludCAgcmFuZFRydWVQcmltZShrKSAgICAgICAvL3JldHVybiBhIG5ldywgcmFuZG9tLCBrLWJpdCwgdHJ1ZSBwcmltZSBiaWdJbnQgdXNpbmcgTWF1cmVyJ3MgYWxnb3JpdGhtLlxuLy8gYmlnSW50ICByYW5kUHJvYlByaW1lKGspICAgICAgIC8vcmV0dXJuIGEgbmV3LCByYW5kb20sIGstYml0LCBwcm9iYWJsZSBwcmltZSBiaWdJbnQgKHByb2JhYmlsaXR5IGl0J3MgY29tcG9zaXRlIGxlc3MgdGhhbiAyXi04MCkuXG4vLyBiaWdJbnQgIHN0cjJiaWdJbnQocyxiLG4sbSkgICAgLy9yZXR1cm4gYSBiaWdJbnQgZm9yIG51bWJlciByZXByZXNlbnRlZCBpbiBzdHJpbmcgcyBpbiBiYXNlIGIgd2l0aCBhdCBsZWFzdCBuIGJpdHMgYW5kIG0gYXJyYXkgZWxlbWVudHNcbi8vIGJpZ0ludCAgc3ViKHgseSkgICAgICAgICAgICAgICAvL3JldHVybiAoeC15KSBmb3IgYmlnSW50cyB4IGFuZCB5LiAgTmVnYXRpdmUgYW5zd2VycyB3aWxsIGJlIDJzIGNvbXBsZW1lbnRcbi8vIGJpZ0ludCAgdHJpbSh4LGspICAgICAgICAgICAgICAvL3JldHVybiBhIGNvcHkgb2YgeCB3aXRoIGV4YWN0bHkgayBsZWFkaW5nIHplcm8gZWxlbWVudHNcbi8vXG4vL1xuLy8gVGhlIGZvbGxvd2luZyBmdW5jdGlvbnMgZWFjaCBoYXZlIGEgbm9uLXVuZGVyc2NvcmVkIHZlcnNpb24sIHdoaWNoIG1vc3QgdXNlcnMgc2hvdWxkIGNhbGwgaW5zdGVhZC5cbi8vIFRoZXNlIGZ1bmN0aW9ucyBlYWNoIHdyaXRlIHRvIGEgc2luZ2xlIHBhcmFtZXRlciwgYW5kIHRoZSBjYWxsZXIgaXMgcmVzcG9uc2libGUgZm9yIGVuc3VyaW5nIHRoZSBhcnJheVxuLy8gcGFzc2VkIGluIGlzIGxhcmdlIGVub3VnaCB0byBob2xkIHRoZSByZXN1bHQuXG4vL1xuLy8gdm9pZCAgICBhZGRJbnRfKHgsbikgICAgICAgICAgLy9kbyB4PXgrbiB3aGVyZSB4IGlzIGEgYmlnSW50IGFuZCBuIGlzIGFuIGludGVnZXJcbi8vIHZvaWQgICAgYWRkXyh4LHkpICAgICAgICAgICAgIC8vZG8geD14K3kgZm9yIGJpZ0ludHMgeCBhbmQgeVxuLy8gdm9pZCAgICBjb3B5Xyh4LHkpICAgICAgICAgICAgLy9kbyB4PXkgb24gYmlnSW50cyB4IGFuZCB5XG4vLyB2b2lkICAgIGNvcHlJbnRfKHgsbikgICAgICAgICAvL2RvIHg9biBvbiBiaWdJbnQgeCBhbmQgaW50ZWdlciBuXG4vLyB2b2lkICAgIEdDRF8oeCx5KSAgICAgICAgICAgICAvL3NldCB4IHRvIHRoZSBncmVhdGVzdCBjb21tb24gZGl2aXNvciBvZiBiaWdJbnRzIHggYW5kIHksICh5IGlzIGRlc3Ryb3llZCkuICAoVGhpcyBuZXZlciBvdmVyZmxvd3MgaXRzIGFycmF5KS5cbi8vIGJvb2xlYW4gaW52ZXJzZU1vZF8oeCxuKSAgICAgIC8vZG8geD14KiooLTEpIG1vZCBuLCBmb3IgYmlnSW50cyB4IGFuZCBuLiBSZXR1cm5zIDEgKDApIGlmIGludmVyc2UgZG9lcyAoZG9lc24ndCkgZXhpc3Rcbi8vIHZvaWQgICAgbW9kXyh4LG4pICAgICAgICAgICAgIC8vZG8geD14IG1vZCBuIGZvciBiaWdJbnRzIHggYW5kIG4uIChUaGlzIG5ldmVyIG92ZXJmbG93cyBpdHMgYXJyYXkpLlxuLy8gdm9pZCAgICBtdWx0Xyh4LHkpICAgICAgICAgICAgLy9kbyB4PXgqeSBmb3IgYmlnSW50cyB4IGFuZCB5LlxuLy8gdm9pZCAgICBtdWx0TW9kXyh4LHksbikgICAgICAgLy9kbyB4PXgqeSAgbW9kIG4gZm9yIGJpZ0ludHMgeCx5LG4uXG4vLyB2b2lkICAgIHBvd01vZF8oeCx5LG4pICAgICAgICAvL2RvIHg9eCoqeSBtb2Qgbiwgd2hlcmUgeCx5LG4gYXJlIGJpZ0ludHMgKG4gaXMgb2RkKSBhbmQgKiogaXMgZXhwb25lbnRpYXRpb24uICAwKiowPTEuXG4vLyB2b2lkICAgIHJhbmRCaWdJbnRfKGIsbixzKSAgICAvL2RvIGIgPSBhbiBuLWJpdCByYW5kb20gQmlnSW50LiBpZiBzPTEsIHRoZW4gbnRoIGJpdCAobW9zdCBzaWduaWZpY2FudCBiaXQpIGlzIHNldCB0byAxLiBuPj0xLlxuLy8gdm9pZCAgICByYW5kVHJ1ZVByaW1lXyhhbnMsaykgLy9kbyBhbnMgPSBhIHJhbmRvbSBrLWJpdCB0cnVlIHJhbmRvbSBwcmltZSAobm90IGp1c3QgcHJvYmFibGUgcHJpbWUpIHdpdGggMSBpbiB0aGUgbXNiLlxuLy8gdm9pZCAgICBzdWJfKHgseSkgICAgICAgICAgICAgLy9kbyB4PXgteSBmb3IgYmlnSW50cyB4IGFuZCB5LiBOZWdhdGl2ZSBhbnN3ZXJzIHdpbGwgYmUgMnMgY29tcGxlbWVudC5cbi8vXG4vLyBUaGUgZm9sbG93aW5nIGZ1bmN0aW9ucyBkbyBOT1QgaGF2ZSBhIG5vbi11bmRlcnNjb3JlZCB2ZXJzaW9uLlxuLy8gVGhleSBlYWNoIHdyaXRlIGEgYmlnSW50IHJlc3VsdCB0byBvbmUgb3IgbW9yZSBwYXJhbWV0ZXJzLiAgVGhlIGNhbGxlciBpcyByZXNwb25zaWJsZSBmb3Jcbi8vIGVuc3VyaW5nIHRoZSBhcnJheXMgcGFzc2VkIGluIGFyZSBsYXJnZSBlbm91Z2ggdG8gaG9sZCB0aGUgcmVzdWx0cy5cbi8vXG4vLyB2b2lkIGFkZFNoaWZ0Xyh4LHkseXMpICAgICAgIC8vZG8geD14Kyh5PDwoeXMqYnBlKSlcbi8vIHZvaWQgY2FycnlfKHgpICAgICAgICAgICAgICAgLy9kbyBjYXJyaWVzIGFuZCBib3Jyb3dzIHNvIGVhY2ggZWxlbWVudCBvZiB0aGUgYmlnSW50IHggZml0cyBpbiBicGUgYml0cy5cbi8vIHZvaWQgZGl2aWRlXyh4LHkscSxyKSAgICAgICAgLy9kaXZpZGUgeCBieSB5IGdpdmluZyBxdW90aWVudCBxIGFuZCByZW1haW5kZXIgclxuLy8gaW50ICBkaXZJbnRfKHgsbikgICAgICAgICAgICAvL2RvIHg9Zmxvb3IoeC9uKSBmb3IgYmlnSW50IHggYW5kIGludGVnZXIgbiwgYW5kIHJldHVybiB0aGUgcmVtYWluZGVyLiAoVGhpcyBuZXZlciBvdmVyZmxvd3MgaXRzIGFycmF5KS5cbi8vIGludCAgZUdDRF8oeCx5LGQsYSxiKSAgICAgICAgLy9zZXRzIGEsYixkIHRvIHBvc2l0aXZlIGJpZ0ludHMgc3VjaCB0aGF0IGQgPSBHQ0RfKHgseSkgPSBhKngtYip5XG4vLyB2b2lkIGhhbHZlXyh4KSAgICAgICAgICAgICAgIC8vZG8geD1mbG9vcih8eHwvMikqc2duKHgpIGZvciBiaWdJbnQgeCBpbiAyJ3MgY29tcGxlbWVudC4gIChUaGlzIG5ldmVyIG92ZXJmbG93cyBpdHMgYXJyYXkpLlxuLy8gdm9pZCBsZWZ0U2hpZnRfKHgsbikgICAgICAgICAvL2xlZnQgc2hpZnQgYmlnSW50IHggYnkgbiBiaXRzLiAgbjxicGUuXG4vLyB2b2lkIGxpbkNvbWJfKHgseSxhLGIpICAgICAgIC8vZG8geD1hKngrYip5IGZvciBiaWdJbnRzIHggYW5kIHkgYW5kIGludGVnZXJzIGEgYW5kIGJcbi8vIHZvaWQgbGluQ29tYlNoaWZ0Xyh4LHksYix5cykgLy9kbyB4PXgrYiooeTw8KHlzKmJwZSkpIGZvciBiaWdJbnRzIHggYW5kIHksIGFuZCBpbnRlZ2VycyBiIGFuZCB5c1xuLy8gdm9pZCBtb250Xyh4LHksbixucCkgICAgICAgICAvL01vbnRnb21lcnkgbXVsdGlwbGljYXRpb24gKHNlZSBjb21tZW50cyB3aGVyZSB0aGUgZnVuY3Rpb24gaXMgZGVmaW5lZClcbi8vIHZvaWQgbXVsdEludF8oeCxuKSAgICAgICAgICAgLy9kbyB4PXgqbiB3aGVyZSB4IGlzIGEgYmlnSW50IGFuZCBuIGlzIGFuIGludGVnZXIuXG4vLyB2b2lkIHJpZ2h0U2hpZnRfKHgsbikgICAgICAgIC8vcmlnaHQgc2hpZnQgYmlnSW50IHggYnkgbiBiaXRzLiAgMCA8PSBuIDwgYnBlLiAoVGhpcyBuZXZlciBvdmVyZmxvd3MgaXRzIGFycmF5KS5cbi8vIHZvaWQgc3F1YXJlTW9kXyh4LG4pICAgICAgICAgLy9kbyB4PXgqeCAgbW9kIG4gZm9yIGJpZ0ludHMgeCxuXG4vLyB2b2lkIHN1YlNoaWZ0Xyh4LHkseXMpICAgICAgIC8vZG8geD14LSh5PDwoeXMqYnBlKSkuIE5lZ2F0aXZlIGFuc3dlcnMgd2lsbCBiZSAycyBjb21wbGVtZW50LlxuLy9cbi8vIFRoZSBmb2xsb3dpbmcgZnVuY3Rpb25zIGFyZSBiYXNlZCBvbiBhbGdvcml0aG1zIGZyb20gdGhlIF9IYW5kYm9vayBvZiBBcHBsaWVkIENyeXB0b2dyYXBoeV9cbi8vICAgIHBvd01vZF8oKSAgICAgICAgICAgPSBhbGdvcml0aG0gMTQuOTQsIE1vbnRnb21lcnkgZXhwb25lbnRpYXRpb25cbi8vICAgIGVHQ0RfLGludmVyc2VNb2RfKCkgPSBhbGdvcml0aG0gMTQuNjEsIEJpbmFyeSBleHRlbmRlZCBHQ0RfXG4vLyAgICBHQ0RfKCkgICAgICAgICAgICAgID0gYWxnb3JvdGhtIDE0LjU3LCBMZWhtZXIncyBhbGdvcml0aG1cbi8vICAgIG1vbnRfKCkgICAgICAgICAgICAgPSBhbGdvcml0aG0gMTQuMzYsIE1vbnRnb21lcnkgbXVsdGlwbGljYXRpb25cbi8vICAgIGRpdmlkZV8oKSAgICAgICAgICAgPSBhbGdvcml0aG0gMTQuMjAgIE11bHRpcGxlLXByZWNpc2lvbiBkaXZpc2lvblxuLy8gICAgc3F1YXJlTW9kXygpICAgICAgICA9IGFsZ29yaXRobSAxNC4xNiAgTXVsdGlwbGUtcHJlY2lzaW9uIHNxdWFyaW5nXG4vLyAgICByYW5kVHJ1ZVByaW1lXygpICAgID0gYWxnb3JpdGhtICA0LjYyLCBNYXVyZXIncyBhbGdvcml0aG1cbi8vICAgIG1pbGxlclJhYmluKCkgICAgICAgPSBhbGdvcml0aG0gIDQuMjQsIE1pbGxlci1SYWJpbiBhbGdvcml0aG1cbi8vXG4vLyBQcm9maWxpbmcgc2hvd3M6XG4vLyAgICAgcmFuZFRydWVQcmltZV8oKSBzcGVuZHM6XG4vLyAgICAgICAgIDEwJSBvZiBpdHMgdGltZSBpbiBjYWxscyB0byBwb3dNb2RfKClcbi8vICAgICAgICAgODUlIG9mIGl0cyB0aW1lIGluIGNhbGxzIHRvIG1pbGxlclJhYmluKClcbi8vICAgICBtaWxsZXJSYWJpbigpIHNwZW5kczpcbi8vICAgICAgICAgOTklIG9mIGl0cyB0aW1lIGluIGNhbGxzIHRvIHBvd01vZF8oKSAgIChhbHdheXMgd2l0aCBhIGJhc2Ugb2YgMilcbi8vICAgICBwb3dNb2RfKCkgc3BlbmRzOlxuLy8gICAgICAgICA5NCUgb2YgaXRzIHRpbWUgaW4gY2FsbHMgdG8gbW9udF8oKSAgKGFsbW9zdCBhbHdheXMgd2l0aCB4PT15KVxuLy9cbi8vIFRoaXMgc3VnZ2VzdHMgdGhlcmUgYXJlIHNldmVyYWwgd2F5cyB0byBzcGVlZCB1cCB0aGlzIGxpYnJhcnkgc2xpZ2h0bHk6XG4vLyAgICAgLSBjb252ZXJ0IHBvd01vZF8gdG8gdXNlIGEgTW9udGdvbWVyeSBmb3JtIG9mIGstYXJ5IHdpbmRvdyAob3IgbWF5YmUgYSBNb250Z29tZXJ5IGZvcm0gb2Ygc2xpZGluZyB3aW5kb3cpXG4vLyAgICAgICAgIC0tIHRoaXMgc2hvdWxkIGVzcGVjaWFsbHkgZm9jdXMgb24gYmVpbmcgZmFzdCB3aGVuIHJhaXNpbmcgMiB0byBhIHBvd2VyIG1vZCBuXG4vLyAgICAgLSBjb252ZXJ0IHJhbmRUcnVlUHJpbWVfKCkgdG8gdXNlIGEgbWluaW11bSByIG9mIDEvMyBpbnN0ZWFkIG9mIDEvMiB3aXRoIHRoZSBhcHByb3ByaWF0ZSBjaGFuZ2UgdG8gdGhlIHRlc3Rcbi8vICAgICAtIHR1bmUgdGhlIHBhcmFtZXRlcnMgaW4gcmFuZFRydWVQcmltZV8oKSwgaW5jbHVkaW5nIGMsIG0sIGFuZCByZWNMaW1pdFxuLy8gICAgIC0gc3BlZWQgdXAgdGhlIHNpbmdsZSBsb29wIGluIG1vbnRfKCkgdGhhdCB0YWtlcyA5NSUgb2YgdGhlIHJ1bnRpbWUsIHBlcmhhcHMgYnkgcmVkdWNpbmcgY2hlY2tpbmdcbi8vICAgICAgIHdpdGhpbiB0aGUgbG9vcCB3aGVuIGFsbCB0aGUgcGFyYW1ldGVycyBhcmUgdGhlIHNhbWUgbGVuZ3RoLlxuLy9cbi8vIFRoZXJlIGFyZSBzZXZlcmFsIGlkZWFzIHRoYXQgbG9vayBsaWtlIHRoZXkgd291bGRuJ3QgaGVscCBtdWNoIGF0IGFsbDpcbi8vICAgICAtIHJlcGxhY2luZyB0cmlhbCBkaXZpc2lvbiBpbiByYW5kVHJ1ZVByaW1lXygpIHdpdGggYSBzaWV2ZSAodGhhdCBzcGVlZHMgdXAgc29tZXRoaW5nIHRha2luZyBhbG1vc3Qgbm8gdGltZSBhbnl3YXkpXG4vLyAgICAgLSBpbmNyZWFzZSBicGUgZnJvbSAxNSB0byAzMCAodGhhdCB3b3VsZCBoZWxwIGlmIHdlIGhhZCBhIDMyKjMyLT42NCBtdWx0aXBsaWVyLCBidXQgbm90IHdpdGggSmF2YVNjcmlwdCdzIDMyKjMyLT4zMilcbi8vICAgICAtIHNwZWVkaW5nIHVwIG1vbnRfKHgseSxuLG5wKSB3aGVuIHg9PXkgYnkgZG9pbmcgYSBub24tbW9kdWxhciwgbm9uLU1vbnRnb21lcnkgc3F1YXJlXG4vLyAgICAgICBmb2xsb3dlZCBieSBhIE1vbnRnb21lcnkgcmVkdWN0aW9uLiAgVGhlIGludGVybWVkaWF0ZSBhbnN3ZXIgd2lsbCBiZSB0d2ljZSBhcyBsb25nIGFzIHgsIHNvIHRoYXRcbi8vICAgICAgIG1ldGhvZCB3b3VsZCBiZSBzbG93ZXIuICBUaGlzIGlzIHVuZm9ydHVuYXRlIGJlY2F1c2UgdGhlIGNvZGUgY3VycmVudGx5IHNwZW5kcyBhbG1vc3QgYWxsIG9mIGl0cyB0aW1lXG4vLyAgICAgICBkb2luZyBtb250Xyh4LHgsLi4uKSwgYm90aCBmb3IgcmFuZFRydWVQcmltZV8oKSBhbmQgcG93TW9kXygpLiAgQSBmYXN0ZXIgbWV0aG9kIGZvciBNb250Z29tZXJ5IHNxdWFyaW5nXG4vLyAgICAgICB3b3VsZCBoYXZlIGEgbGFyZ2UgaW1wYWN0IG9uIHRoZSBzcGVlZCBvZiByYW5kVHJ1ZVByaW1lXygpIGFuZCBwb3dNb2RfKCkuICBIQUMgaGFzIGEgY291cGxlIG9mIHBvb3JseS13b3JkZWRcbi8vICAgICAgIHNlbnRlbmNlcyB0aGF0IHNlZW0gdG8gaW1wbHkgaXQncyBmYXN0ZXIgdG8gZG8gYSBub24tbW9kdWxhciBzcXVhcmUgZm9sbG93ZWQgYnkgYSBzaW5nbGVcbi8vICAgICAgIE1vbnRnb21lcnkgcmVkdWN0aW9uLCBidXQgdGhhdCdzIG9idmlvdXNseSB3cm9uZy5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuKGZ1bmN0aW9uICgpIHtcbi8vZ2xvYmFsc1xuYnBlPTA7ICAgICAgICAgLy9iaXRzIHN0b3JlZCBwZXIgYXJyYXkgZWxlbWVudFxubWFzaz0wOyAgICAgICAgLy9BTkQgdGhpcyB3aXRoIGFuIGFycmF5IGVsZW1lbnQgdG8gY2hvcCBpdCBkb3duIHRvIGJwZSBiaXRzXG5yYWRpeD1tYXNrKzE7ICAvL2VxdWFscyAyXmJwZS4gIEEgc2luZ2xlIDEgYml0IHRvIHRoZSBsZWZ0IG9mIHRoZSBsYXN0IGJpdCBvZiBtYXNrLlxuXG4vL3RoZSBkaWdpdHMgZm9yIGNvbnZlcnRpbmcgdG8gZGlmZmVyZW50IGJhc2VzXG5kaWdpdHNTdHI9JzAxMjM0NTY3ODlBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6Xz0hQCMkJV4mKigpW117fXw7OiwuPD4vP2B+IFxcXFxcXCdcXFwiKy0nO1xuXG4vL2luaXRpYWxpemUgdGhlIGdsb2JhbCB2YXJpYWJsZXNcbmZvciAoYnBlPTA7ICgxPDwoYnBlKzEpKSA+ICgxPDxicGUpOyBicGUrKyk7ICAvL2JwZT1udW1iZXIgb2YgYml0cyBpbiB0aGUgbWFudGlzc2Egb24gdGhpcyBwbGF0Zm9ybVxuYnBlPj49MTsgICAgICAgICAgICAgICAgICAgLy9icGU9bnVtYmVyIG9mIGJpdHMgaW4gb25lIGVsZW1lbnQgb2YgdGhlIGFycmF5IHJlcHJlc2VudGluZyB0aGUgYmlnSW50XG5tYXNrPSgxPDxicGUpLTE7ICAgICAgICAgICAvL0FORCB0aGUgbWFzayB3aXRoIGFuIGludGVnZXIgdG8gZ2V0IGl0cyBicGUgbGVhc3Qgc2lnbmlmaWNhbnQgYml0c1xucmFkaXg9bWFzaysxOyAgICAgICAgICAgICAgLy8yXmJwZS4gIGEgc2luZ2xlIDEgYml0IHRvIHRoZSBsZWZ0IG9mIHRoZSBmaXJzdCBiaXQgb2YgbWFza1xub25lPWludDJiaWdJbnQoMSwxLDEpOyAgICAgLy9jb25zdGFudCB1c2VkIGluIHBvd01vZF8oKVxuXG4vL3RoZSBmb2xsb3dpbmcgZ2xvYmFsIHZhcmlhYmxlcyBhcmUgc2NyYXRjaHBhZCBtZW1vcnkgdG9cbi8vcmVkdWNlIGR5bmFtaWMgbWVtb3J5IGFsbG9jYXRpb24gaW4gdGhlIGlubmVyIGxvb3BcbnQ9bmV3IEFycmF5KDApO1xuc3M9dDsgICAgICAgLy91c2VkIGluIG11bHRfKClcbnMwPXQ7ICAgICAgIC8vdXNlZCBpbiBtdWx0TW9kXygpLCBzcXVhcmVNb2RfKClcbnMxPXQ7ICAgICAgIC8vdXNlZCBpbiBwb3dNb2RfKCksIG11bHRNb2RfKCksIHNxdWFyZU1vZF8oKVxuczI9dDsgICAgICAgLy91c2VkIGluIHBvd01vZF8oKSwgbXVsdE1vZF8oKVxuczM9dDsgICAgICAgLy91c2VkIGluIHBvd01vZF8oKVxuczQ9dDsgczU9dDsgLy91c2VkIGluIG1vZF8oKVxuczY9dDsgICAgICAgLy91c2VkIGluIGJpZ0ludDJzdHIoKVxuczc9dDsgICAgICAgLy91c2VkIGluIHBvd01vZF8oKVxuVD10OyAgICAgICAgLy91c2VkIGluIEdDRF8oKVxuc2E9dDsgICAgICAgLy91c2VkIGluIG1vbnRfKClcbm1yX3gxPXQ7IG1yX3I9dDsgbXJfYT10OyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy91c2VkIGluIG1pbGxlclJhYmluKClcbmVnX3Y9dDsgZWdfdT10OyBlZ19BPXQ7IGVnX0I9dDsgZWdfQz10OyBlZ19EPXQ7ICAgICAgICAgICAgICAgLy91c2VkIGluIGVHQ0RfKCksIGludmVyc2VNb2RfKClcbm1kX3ExPXQ7IG1kX3EyPXQ7IG1kX3EzPXQ7IG1kX3I9dDsgbWRfcjE9dDsgbWRfcjI9dDsgbWRfdHQ9dDsgLy91c2VkIGluIG1vZF8oKVxuXG5wcmltZXM9dDsgcG93cz10OyBzX2k9dDsgc19pMj10OyBzX1I9dDsgc19ybT10OyBzX3E9dDsgc19uMT10O1xuICBzX2E9dDsgc19yMj10OyBzX249dDsgc19iPXQ7IHNfZD10OyBzX3gxPXQ7IHNfeDI9dCwgc19hYT10OyAvL3VzZWQgaW4gcmFuZFRydWVQcmltZV8oKVxuXG5ycHByYj10OyAvL3VzZWQgaW4gcmFuZFByb2JQcmltZVJvdW5kcygpICh3aGljaCBhbHNvIHVzZXMgXCJwcmltZXNcIilcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5cbi8vcmV0dXJuIGFycmF5IG9mIGFsbCBwcmltZXMgbGVzcyB0aGFuIGludGVnZXIgblxuZnVuY3Rpb24gZmluZFByaW1lcyhuKSB7XG4gIHZhciBpLHMscCxhbnM7XG4gIHM9bmV3IEFycmF5KG4pO1xuICBmb3IgKGk9MDtpPG47aSsrKVxuICAgIHNbaV09MDtcbiAgc1swXT0yO1xuICBwPTA7ICAgIC8vZmlyc3QgcCBlbGVtZW50cyBvZiBzIGFyZSBwcmltZXMsIHRoZSByZXN0IGFyZSBhIHNpZXZlXG4gIGZvcig7c1twXTxuOykgeyAgICAgICAgICAgICAgICAgIC8vc1twXSBpcyB0aGUgcHRoIHByaW1lXG4gICAgZm9yKGk9c1twXSpzW3BdOyBpPG47IGkrPXNbcF0pIC8vbWFyayBtdWx0aXBsZXMgb2Ygc1twXVxuICAgICAgc1tpXT0xO1xuICAgIHArKztcbiAgICBzW3BdPXNbcC0xXSsxO1xuICAgIGZvcig7IHNbcF08biAmJiBzW3NbcF1dOyBzW3BdKyspOyAvL2ZpbmQgbmV4dCBwcmltZSAod2hlcmUgc1twXT09MClcbiAgfVxuICBhbnM9bmV3IEFycmF5KHApO1xuICBmb3IoaT0wO2k8cDtpKyspXG4gICAgYW5zW2ldPXNbaV07XG4gIHJldHVybiBhbnM7XG59XG5cblxuLy9kb2VzIGEgc2luZ2xlIHJvdW5kIG9mIE1pbGxlci1SYWJpbiBiYXNlIGIgY29uc2lkZXIgeCB0byBiZSBhIHBvc3NpYmxlIHByaW1lP1xuLy94IGlzIGEgYmlnSW50LCBhbmQgYiBpcyBhbiBpbnRlZ2VyLCB3aXRoIGI8eFxuZnVuY3Rpb24gbWlsbGVyUmFiaW5JbnQoeCxiKSB7XG4gIGlmIChtcl94MS5sZW5ndGghPXgubGVuZ3RoKSB7XG4gICAgbXJfeDE9ZHVwKHgpO1xuICAgIG1yX3I9ZHVwKHgpO1xuICAgIG1yX2E9ZHVwKHgpO1xuICB9XG5cbiAgY29weUludF8obXJfYSxiKTtcbiAgcmV0dXJuIG1pbGxlclJhYmluKHgsbXJfYSk7XG59XG5cbi8vZG9lcyBhIHNpbmdsZSByb3VuZCBvZiBNaWxsZXItUmFiaW4gYmFzZSBiIGNvbnNpZGVyIHggdG8gYmUgYSBwb3NzaWJsZSBwcmltZT9cbi8veCBhbmQgYiBhcmUgYmlnSW50cyB3aXRoIGI8eFxuZnVuY3Rpb24gbWlsbGVyUmFiaW4oeCxiKSB7XG4gIHZhciBpLGosayxzO1xuXG4gIGlmIChtcl94MS5sZW5ndGghPXgubGVuZ3RoKSB7XG4gICAgbXJfeDE9ZHVwKHgpO1xuICAgIG1yX3I9ZHVwKHgpO1xuICAgIG1yX2E9ZHVwKHgpO1xuICB9XG5cbiAgY29weV8obXJfYSxiKTtcbiAgY29weV8obXJfcix4KTtcbiAgY29weV8obXJfeDEseCk7XG5cbiAgYWRkSW50Xyhtcl9yLC0xKTtcbiAgYWRkSW50Xyhtcl94MSwtMSk7XG5cbiAgLy9zPXRoZSBoaWdoZXN0IHBvd2VyIG9mIHR3byB0aGF0IGRpdmlkZXMgbXJfclxuICBrPTA7XG4gIGZvciAoaT0wO2k8bXJfci5sZW5ndGg7aSsrKVxuICAgIGZvciAoaj0xO2o8bWFzaztqPDw9MSlcbiAgICAgIGlmICh4W2ldICYgaikge1xuICAgICAgICBzPShrPG1yX3IubGVuZ3RoK2JwZSA/IGsgOiAwKTtcbiAgICAgICAgIGk9bXJfci5sZW5ndGg7XG4gICAgICAgICBqPW1hc2s7XG4gICAgICB9IGVsc2VcbiAgICAgICAgaysrO1xuXG4gIGlmIChzKVxuICAgIHJpZ2h0U2hpZnRfKG1yX3Iscyk7XG5cbiAgcG93TW9kXyhtcl9hLG1yX3IseCk7XG5cbiAgaWYgKCFlcXVhbHNJbnQobXJfYSwxKSAmJiAhZXF1YWxzKG1yX2EsbXJfeDEpKSB7XG4gICAgaj0xO1xuICAgIHdoaWxlIChqPD1zLTEgJiYgIWVxdWFscyhtcl9hLG1yX3gxKSkge1xuICAgICAgc3F1YXJlTW9kXyhtcl9hLHgpO1xuICAgICAgaWYgKGVxdWFsc0ludChtcl9hLDEpKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfVxuICAgICAgaisrO1xuICAgIH1cbiAgICBpZiAoIWVxdWFscyhtcl9hLG1yX3gxKSkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICB9XG4gIHJldHVybiAxO1xufVxuXG4vL3JldHVybnMgaG93IG1hbnkgYml0cyBsb25nIHRoZSBiaWdJbnQgaXMsIG5vdCBjb3VudGluZyBsZWFkaW5nIHplcm9zLlxuZnVuY3Rpb24gYml0U2l6ZSh4KSB7XG4gIHZhciBqLHosdztcbiAgZm9yIChqPXgubGVuZ3RoLTE7ICh4W2pdPT0wKSAmJiAoaj4wKTsgai0tKTtcbiAgZm9yICh6PTAsdz14W2pdOyB3OyAodz4+PTEpLHorKyk7XG4gIHorPWJwZSpqO1xuICByZXR1cm4gejtcbn1cblxuLy9yZXR1cm4gYSBjb3B5IG9mIHggd2l0aCBhdCBsZWFzdCBuIGVsZW1lbnRzLCBhZGRpbmcgbGVhZGluZyB6ZXJvcyBpZiBuZWVkZWRcbmZ1bmN0aW9uIGV4cGFuZCh4LG4pIHtcbiAgdmFyIGFucz1pbnQyYmlnSW50KDAsKHgubGVuZ3RoPm4gPyB4Lmxlbmd0aCA6IG4pKmJwZSwwKTtcbiAgY29weV8oYW5zLHgpO1xuICByZXR1cm4gYW5zO1xufVxuXG4vL3JldHVybiBhIGstYml0IHRydWUgcmFuZG9tIHByaW1lIHVzaW5nIE1hdXJlcidzIGFsZ29yaXRobS5cbmZ1bmN0aW9uIHJhbmRUcnVlUHJpbWUoaykge1xuICB2YXIgYW5zPWludDJiaWdJbnQoMCxrLDApO1xuICByYW5kVHJ1ZVByaW1lXyhhbnMsayk7XG4gIHJldHVybiB0cmltKGFucywxKTtcbn1cblxuLy9yZXR1cm4gYSBrLWJpdCByYW5kb20gcHJvYmFibGUgcHJpbWUgd2l0aCBwcm9iYWJpbGl0eSBvZiBlcnJvciA8IDJeLTgwXG5mdW5jdGlvbiByYW5kUHJvYlByaW1lKGspIHtcbiAgaWYgKGs+PTYwMCkgcmV0dXJuIHJhbmRQcm9iUHJpbWVSb3VuZHMoaywyKTsgLy9udW1iZXJzIGZyb20gSEFDIHRhYmxlIDQuM1xuICBpZiAoaz49NTUwKSByZXR1cm4gcmFuZFByb2JQcmltZVJvdW5kcyhrLDQpO1xuICBpZiAoaz49NTAwKSByZXR1cm4gcmFuZFByb2JQcmltZVJvdW5kcyhrLDUpO1xuICBpZiAoaz49NDAwKSByZXR1cm4gcmFuZFByb2JQcmltZVJvdW5kcyhrLDYpO1xuICBpZiAoaz49MzUwKSByZXR1cm4gcmFuZFByb2JQcmltZVJvdW5kcyhrLDcpO1xuICBpZiAoaz49MzAwKSByZXR1cm4gcmFuZFByb2JQcmltZVJvdW5kcyhrLDkpO1xuICBpZiAoaz49MjUwKSByZXR1cm4gcmFuZFByb2JQcmltZVJvdW5kcyhrLDEyKTsgLy9udW1iZXJzIGZyb20gSEFDIHRhYmxlIDQuNFxuICBpZiAoaz49MjAwKSByZXR1cm4gcmFuZFByb2JQcmltZVJvdW5kcyhrLDE1KTtcbiAgaWYgKGs+PTE1MCkgcmV0dXJuIHJhbmRQcm9iUHJpbWVSb3VuZHMoaywxOCk7XG4gIGlmIChrPj0xMDApIHJldHVybiByYW5kUHJvYlByaW1lUm91bmRzKGssMjcpO1xuICAgICAgICAgICAgICByZXR1cm4gcmFuZFByb2JQcmltZVJvdW5kcyhrLDQwKTsgLy9udW1iZXIgZnJvbSBIQUMgcmVtYXJrIDQuMjYgKG9ubHkgYW4gZXN0aW1hdGUpXG59XG5cbi8vcmV0dXJuIGEgay1iaXQgcHJvYmFibGUgcmFuZG9tIHByaW1lIHVzaW5nIG4gcm91bmRzIG9mIE1pbGxlciBSYWJpbiAoYWZ0ZXIgdHJpYWwgZGl2aXNpb24gd2l0aCBzbWFsbCBwcmltZXMpXG5mdW5jdGlvbiByYW5kUHJvYlByaW1lUm91bmRzKGssbikge1xuICB2YXIgYW5zLCBpLCBkaXZpc2libGUsIEI7XG4gIEI9MzAwMDA7ICAvL0IgaXMgbGFyZ2VzdCBwcmltZSB0byB1c2UgaW4gdHJpYWwgZGl2aXNpb25cbiAgYW5zPWludDJiaWdJbnQoMCxrLDApO1xuXG4gIC8vb3B0aW1pemF0aW9uOiB0cnkgbGFyZ2VyIGFuZCBzbWFsbGVyIEIgdG8gZmluZCB0aGUgYmVzdCBsaW1pdC5cblxuICBpZiAocHJpbWVzLmxlbmd0aD09MClcbiAgICBwcmltZXM9ZmluZFByaW1lcygzMDAwMCk7ICAvL2NoZWNrIGZvciBkaXZpc2liaWxpdHkgYnkgcHJpbWVzIDw9MzAwMDBcblxuICBpZiAocnBwcmIubGVuZ3RoIT1hbnMubGVuZ3RoKVxuICAgIHJwcHJiPWR1cChhbnMpO1xuXG4gIGZvciAoOzspIHsgLy9rZWVwIHRyeWluZyByYW5kb20gdmFsdWVzIGZvciBhbnMgdW50aWwgb25lIGFwcGVhcnMgdG8gYmUgcHJpbWVcbiAgICAvL29wdGltaXphdGlvbjogcGljayBhIHJhbmRvbSBudW1iZXIgdGltZXMgTD0yKjMqNSouLi4qcCwgcGx1cyBhXG4gICAgLy8gICByYW5kb20gZWxlbWVudCBvZiB0aGUgbGlzdCBvZiBhbGwgbnVtYmVycyBpbiBbMCxMKSBub3QgZGl2aXNpYmxlIGJ5IGFueSBwcmltZSB1cCB0byBwLlxuICAgIC8vICAgVGhpcyBjYW4gcmVkdWNlIHRoZSBhbW91bnQgb2YgcmFuZG9tIG51bWJlciBnZW5lcmF0aW9uLlxuXG4gICAgcmFuZEJpZ0ludF8oYW5zLGssMCk7IC8vYW5zID0gYSByYW5kb20gb2RkIG51bWJlciB0byBjaGVja1xuICAgIGFuc1swXSB8PSAxO1xuICAgIGRpdmlzaWJsZT0wO1xuXG4gICAgLy9jaGVjayBhbnMgZm9yIGRpdmlzaWJpbGl0eSBieSBzbWFsbCBwcmltZXMgdXAgdG8gQlxuICAgIGZvciAoaT0wOyAoaTxwcmltZXMubGVuZ3RoKSAmJiAocHJpbWVzW2ldPD1CKTsgaSsrKVxuICAgICAgaWYgKG1vZEludChhbnMscHJpbWVzW2ldKT09MCAmJiAhZXF1YWxzSW50KGFucyxwcmltZXNbaV0pKSB7XG4gICAgICAgIGRpdmlzaWJsZT0xO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgIC8vb3B0aW1pemF0aW9uOiBjaGFuZ2UgbWlsbGVyUmFiaW4gc28gdGhlIGJhc2UgY2FuIGJlIGJpZ2dlciB0aGFuIHRoZSBudW1iZXIgYmVpbmcgY2hlY2tlZCwgdGhlbiBlbGltaW5hdGUgdGhlIHdoaWxlIGhlcmUuXG5cbiAgICAvL2RvIG4gcm91bmRzIG9mIE1pbGxlciBSYWJpbiwgd2l0aCByYW5kb20gYmFzZXMgbGVzcyB0aGFuIGFuc1xuICAgIGZvciAoaT0wOyBpPG4gJiYgIWRpdmlzaWJsZTsgaSsrKSB7XG4gICAgICByYW5kQmlnSW50XyhycHByYixrLDApO1xuICAgICAgd2hpbGUoIWdyZWF0ZXIoYW5zLHJwcHJiKSkgLy9waWNrIGEgcmFuZG9tIHJwcHJiIHRoYXQncyA8IGFuc1xuICAgICAgICByYW5kQmlnSW50XyhycHByYixrLDApO1xuICAgICAgaWYgKCFtaWxsZXJSYWJpbihhbnMscnBwcmIpKVxuICAgICAgICBkaXZpc2libGU9MTtcbiAgICB9XG5cbiAgICBpZighZGl2aXNpYmxlKVxuICAgICAgcmV0dXJuIGFucztcbiAgfVxufVxuXG4vL3JldHVybiBhIG5ldyBiaWdJbnQgZXF1YWwgdG8gKHggbW9kIG4pIGZvciBiaWdJbnRzIHggYW5kIG4uXG5mdW5jdGlvbiBtb2QoeCxuKSB7XG4gIHZhciBhbnM9ZHVwKHgpO1xuICBtb2RfKGFucyxuKTtcbiAgcmV0dXJuIHRyaW0oYW5zLDEpO1xufVxuXG4vL3JldHVybiAoeCtuKSB3aGVyZSB4IGlzIGEgYmlnSW50IGFuZCBuIGlzIGFuIGludGVnZXIuXG5mdW5jdGlvbiBhZGRJbnQoeCxuKSB7XG4gIHZhciBhbnM9ZXhwYW5kKHgseC5sZW5ndGgrMSk7XG4gIGFkZEludF8oYW5zLG4pO1xuICByZXR1cm4gdHJpbShhbnMsMSk7XG59XG5cbi8vcmV0dXJuIHgqeSBmb3IgYmlnSW50cyB4IGFuZCB5LiBUaGlzIGlzIGZhc3RlciB3aGVuIHk8eC5cbmZ1bmN0aW9uIG11bHQoeCx5KSB7XG4gIHZhciBhbnM9ZXhwYW5kKHgseC5sZW5ndGgreS5sZW5ndGgpO1xuICBtdWx0XyhhbnMseSk7XG4gIHJldHVybiB0cmltKGFucywxKTtcbn1cblxuLy9yZXR1cm4gKHgqKnkgbW9kIG4pIHdoZXJlIHgseSxuIGFyZSBiaWdJbnRzIGFuZCAqKiBpcyBleHBvbmVudGlhdGlvbi4gIDAqKjA9MS4gRmFzdGVyIGZvciBvZGQgbi5cbmZ1bmN0aW9uIHBvd01vZCh4LHksbikge1xuICB2YXIgYW5zPWV4cGFuZCh4LG4ubGVuZ3RoKTtcbiAgcG93TW9kXyhhbnMsdHJpbSh5LDIpLHRyaW0obiwyKSwwKTsgIC8vdGhpcyBzaG91bGQgd29yayB3aXRob3V0IHRoZSB0cmltLCBidXQgZG9lc24ndFxuICByZXR1cm4gdHJpbShhbnMsMSk7XG59XG5cbi8vcmV0dXJuICh4LXkpIGZvciBiaWdJbnRzIHggYW5kIHkuICBOZWdhdGl2ZSBhbnN3ZXJzIHdpbGwgYmUgMnMgY29tcGxlbWVudFxuZnVuY3Rpb24gc3ViKHgseSkge1xuICB2YXIgYW5zPWV4cGFuZCh4LCh4Lmxlbmd0aD55Lmxlbmd0aCA/IHgubGVuZ3RoKzEgOiB5Lmxlbmd0aCsxKSk7XG4gIHN1Yl8oYW5zLHkpO1xuICByZXR1cm4gdHJpbShhbnMsMSk7XG59XG5cbi8vcmV0dXJuICh4K3kpIGZvciBiaWdJbnRzIHggYW5kIHkuXG5mdW5jdGlvbiBhZGQoeCx5KSB7XG4gIHZhciBhbnM9ZXhwYW5kKHgsKHgubGVuZ3RoPnkubGVuZ3RoID8geC5sZW5ndGgrMSA6IHkubGVuZ3RoKzEpKTtcbiAgYWRkXyhhbnMseSk7XG4gIHJldHVybiB0cmltKGFucywxKTtcbn1cblxuLy9yZXR1cm4gKHgqKigtMSkgbW9kIG4pIGZvciBiaWdJbnRzIHggYW5kIG4uICBJZiBubyBpbnZlcnNlIGV4aXN0cywgaXQgcmV0dXJucyBudWxsXG5mdW5jdGlvbiBpbnZlcnNlTW9kKHgsbikge1xuICB2YXIgYW5zPWV4cGFuZCh4LG4ubGVuZ3RoKTtcbiAgdmFyIHM7XG4gIHM9aW52ZXJzZU1vZF8oYW5zLG4pO1xuICByZXR1cm4gcyA/IHRyaW0oYW5zLDEpIDogbnVsbDtcbn1cblxuLy9yZXR1cm4gKHgqeSBtb2QgbikgZm9yIGJpZ0ludHMgeCx5LG4uICBGb3IgZ3JlYXRlciBzcGVlZCwgbGV0IHk8eC5cbmZ1bmN0aW9uIG11bHRNb2QoeCx5LG4pIHtcbiAgdmFyIGFucz1leHBhbmQoeCxuLmxlbmd0aCk7XG4gIG11bHRNb2RfKGFucyx5LG4pO1xuICByZXR1cm4gdHJpbShhbnMsMSk7XG59XG5cbi8vZ2VuZXJhdGUgYSBrLWJpdCB0cnVlIHJhbmRvbSBwcmltZSB1c2luZyBNYXVyZXIncyBhbGdvcml0aG0sXG4vL2FuZCBwdXQgaXQgaW50byBhbnMuICBUaGUgYmlnSW50IGFucyBtdXN0IGJlIGxhcmdlIGVub3VnaCB0byBob2xkIGl0LlxuZnVuY3Rpb24gcmFuZFRydWVQcmltZV8oYW5zLGspIHtcbiAgdmFyIGMsbSxwbSxkZCxqLHIsQixkaXZpc2libGUseix6eixyZWNTaXplO1xuXG4gIGlmIChwcmltZXMubGVuZ3RoPT0wKVxuICAgIHByaW1lcz1maW5kUHJpbWVzKDMwMDAwKTsgIC8vY2hlY2sgZm9yIGRpdmlzaWJpbGl0eSBieSBwcmltZXMgPD0zMDAwMFxuXG4gIGlmIChwb3dzLmxlbmd0aD09MCkge1xuICAgIHBvd3M9bmV3IEFycmF5KDUxMik7XG4gICAgZm9yIChqPTA7ajw1MTI7aisrKSB7XG4gICAgICBwb3dzW2pdPU1hdGgucG93KDIsai81MTEuLTEuKTtcbiAgICB9XG4gIH1cblxuICAvL2MgYW5kIG0gc2hvdWxkIGJlIHR1bmVkIGZvciBhIHBhcnRpY3VsYXIgbWFjaGluZSBhbmQgdmFsdWUgb2YgaywgdG8gbWF4aW1pemUgc3BlZWRcbiAgYz0wLjE7ICAvL2M9MC4xIGluIEhBQ1xuICBtPTIwOyAgIC8vZ2VuZXJhdGUgdGhpcyBrLWJpdCBudW1iZXIgYnkgZmlyc3QgcmVjdXJzaXZlbHkgZ2VuZXJhdGluZyBhIG51bWJlciB0aGF0IGhhcyBiZXR3ZWVuIGsvMiBhbmQgay1tIGJpdHNcbiAgcmVjTGltaXQ9MjA7IC8vc3RvcCByZWN1cnNpb24gd2hlbiBrIDw9cmVjTGltaXQuICBNdXN0IGhhdmUgcmVjTGltaXQgPj0gMlxuXG4gIGlmIChzX2kyLmxlbmd0aCE9YW5zLmxlbmd0aCkge1xuICAgIHNfaTI9ZHVwKGFucyk7XG4gICAgc19SID1kdXAoYW5zKTtcbiAgICBzX24xPWR1cChhbnMpO1xuICAgIHNfcjI9ZHVwKGFucyk7XG4gICAgc19kID1kdXAoYW5zKTtcbiAgICBzX3gxPWR1cChhbnMpO1xuICAgIHNfeDI9ZHVwKGFucyk7XG4gICAgc19iID1kdXAoYW5zKTtcbiAgICBzX24gPWR1cChhbnMpO1xuICAgIHNfaSA9ZHVwKGFucyk7XG4gICAgc19ybT1kdXAoYW5zKTtcbiAgICBzX3EgPWR1cChhbnMpO1xuICAgIHNfYSA9ZHVwKGFucyk7XG4gICAgc19hYT1kdXAoYW5zKTtcbiAgfVxuXG4gIGlmIChrIDw9IHJlY0xpbWl0KSB7ICAvL2dlbmVyYXRlIHNtYWxsIHJhbmRvbSBwcmltZXMgYnkgdHJpYWwgZGl2aXNpb24gdXAgdG8gaXRzIHNxdWFyZSByb290XG4gICAgcG09KDE8PCgoaysyKT4+MSkpLTE7IC8vcG0gaXMgYmluYXJ5IG51bWJlciB3aXRoIGFsbCBvbmVzLCBqdXN0IG92ZXIgc3FydCgyXmspXG4gICAgY29weUludF8oYW5zLDApO1xuICAgIGZvciAoZGQ9MTtkZDspIHtcbiAgICAgIGRkPTA7XG4gICAgICBhbnNbMF09IDEgfCAoMTw8KGstMSkpIHwgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKigxPDxrKSk7ICAvL3JhbmRvbSwgay1iaXQsIG9kZCBpbnRlZ2VyLCB3aXRoIG1zYiAxXG4gICAgICBmb3IgKGo9MTsoajxwcmltZXMubGVuZ3RoKSAmJiAoKHByaW1lc1tqXSZwbSk9PXByaW1lc1tqXSk7aisrKSB7IC8vdHJpYWwgZGl2aXNpb24gYnkgYWxsIHByaW1lcyAzLi4uc3FydCgyXmspXG4gICAgICAgIGlmICgwPT0oYW5zWzBdJXByaW1lc1tqXSkpIHtcbiAgICAgICAgICBkZD0xO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGNhcnJ5XyhhbnMpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIEI9YyprKms7ICAgIC8vdHJ5IHNtYWxsIHByaW1lcyB1cCB0byBCIChvciBhbGwgdGhlIHByaW1lc1tdIGFycmF5IGlmIHRoZSBsYXJnZXN0IGlzIGxlc3MgdGhhbiBCKS5cbiAgaWYgKGs+MiptKSAgLy9nZW5lcmF0ZSB0aGlzIGstYml0IG51bWJlciBieSBmaXJzdCByZWN1cnNpdmVseSBnZW5lcmF0aW5nIGEgbnVtYmVyIHRoYXQgaGFzIGJldHdlZW4gay8yIGFuZCBrLW0gYml0c1xuICAgIGZvciAocj0xOyBrLWsqcjw9bTsgKVxuICAgICAgcj1wb3dzW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSo1MTIpXTsgICAvL3I9TWF0aC5wb3coMixNYXRoLnJhbmRvbSgpLTEpO1xuICBlbHNlXG4gICAgcj0uNTtcblxuICAvL3NpbXVsYXRpb24gc3VnZ2VzdHMgdGhlIG1vcmUgY29tcGxleCBhbGdvcml0aG0gdXNpbmcgcj0uMzMzIGlzIG9ubHkgc2xpZ2h0bHkgZmFzdGVyLlxuXG4gIHJlY1NpemU9TWF0aC5mbG9vcihyKmspKzE7XG5cbiAgcmFuZFRydWVQcmltZV8oc19xLHJlY1NpemUpO1xuICBjb3B5SW50XyhzX2kyLDApO1xuICBzX2kyW01hdGguZmxvb3IoKGstMikvYnBlKV0gfD0gKDE8PCgoay0yKSVicGUpKTsgICAvL3NfaTI9Ml4oay0yKVxuICBkaXZpZGVfKHNfaTIsc19xLHNfaSxzX3JtKTsgICAgICAgICAgICAgICAgICAgICAgICAvL3NfaT1mbG9vcigoMl4oay0xKSkvKDJxKSlcblxuICB6PWJpdFNpemUoc19pKTtcblxuICBmb3IgKDs7KSB7XG4gICAgZm9yICg7OykgeyAgLy9nZW5lcmF0ZSB6LWJpdCBudW1iZXJzIHVudGlsIG9uZSBmYWxscyBpbiB0aGUgcmFuZ2UgWzAsc19pLTFdXG4gICAgICByYW5kQmlnSW50XyhzX1IseiwwKTtcbiAgICAgIGlmIChncmVhdGVyKHNfaSxzX1IpKVxuICAgICAgICBicmVhaztcbiAgICB9ICAgICAgICAgICAgICAgIC8vbm93IHNfUiBpcyBpbiB0aGUgcmFuZ2UgWzAsc19pLTFdXG4gICAgYWRkSW50XyhzX1IsMSk7ICAvL25vdyBzX1IgaXMgaW4gdGhlIHJhbmdlIFsxLHNfaV1cbiAgICBhZGRfKHNfUixzX2kpOyAgIC8vbm93IHNfUiBpcyBpbiB0aGUgcmFuZ2UgW3NfaSsxLDIqc19pXVxuXG4gICAgY29weV8oc19uLHNfcSk7XG4gICAgbXVsdF8oc19uLHNfUik7XG4gICAgbXVsdEludF8oc19uLDIpO1xuICAgIGFkZEludF8oc19uLDEpOyAgICAvL3Nfbj0yKnNfUipzX3ErMVxuXG4gICAgY29weV8oc19yMixzX1IpO1xuICAgIG11bHRJbnRfKHNfcjIsMik7ICAvL3NfcjI9MipzX1JcblxuICAgIC8vY2hlY2sgc19uIGZvciBkaXZpc2liaWxpdHkgYnkgc21hbGwgcHJpbWVzIHVwIHRvIEJcbiAgICBmb3IgKGRpdmlzaWJsZT0wLGo9MDsgKGo8cHJpbWVzLmxlbmd0aCkgJiYgKHByaW1lc1tqXTxCKTsgaisrKVxuICAgICAgaWYgKG1vZEludChzX24scHJpbWVzW2pdKT09MCAmJiAhZXF1YWxzSW50KHNfbixwcmltZXNbal0pKSB7XG4gICAgICAgIGRpdmlzaWJsZT0xO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgIGlmICghZGl2aXNpYmxlKSAgICAvL2lmIGl0IHBhc3NlcyBzbWFsbCBwcmltZXMgY2hlY2ssIHRoZW4gdHJ5IGEgc2luZ2xlIE1pbGxlci1SYWJpbiBiYXNlIDJcbiAgICAgIGlmICghbWlsbGVyUmFiaW5JbnQoc19uLDIpKSAvL3RoaXMgbGluZSByZXByZXNlbnRzIDc1JSBvZiB0aGUgdG90YWwgcnVudGltZSBmb3IgcmFuZFRydWVQcmltZV9cbiAgICAgICAgZGl2aXNpYmxlPTE7XG5cbiAgICBpZiAoIWRpdmlzaWJsZSkgeyAgLy9pZiBpdCBwYXNzZXMgdGhhdCB0ZXN0LCBjb250aW51ZSBjaGVja2luZyBzX25cbiAgICAgIGFkZEludF8oc19uLC0zKTtcbiAgICAgIGZvciAoaj1zX24ubGVuZ3RoLTE7KHNfbltqXT09MCkgJiYgKGo+MCk7IGotLSk7ICAvL3N0cmlwIGxlYWRpbmcgemVyb3NcbiAgICAgIGZvciAoeno9MCx3PXNfbltqXTsgdzsgKHc+Pj0xKSx6eisrKTtcbiAgICAgIHp6Kz1icGUqajsgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8veno9bnVtYmVyIG9mIGJpdHMgaW4gc19uLCBpZ25vcmluZyBsZWFkaW5nIHplcm9zXG4gICAgICBmb3IgKDs7KSB7ICAvL2dlbmVyYXRlIHotYml0IG51bWJlcnMgdW50aWwgb25lIGZhbGxzIGluIHRoZSByYW5nZSBbMCxzX24tMV1cbiAgICAgICAgcmFuZEJpZ0ludF8oc19hLHp6LDApO1xuICAgICAgICBpZiAoZ3JlYXRlcihzX24sc19hKSlcbiAgICAgICAgICBicmVhaztcbiAgICAgIH0gICAgICAgICAgICAgICAgLy9ub3cgc19hIGlzIGluIHRoZSByYW5nZSBbMCxzX24tMV1cbiAgICAgIGFkZEludF8oc19uLDMpOyAgLy9ub3cgc19hIGlzIGluIHRoZSByYW5nZSBbMCxzX24tNF1cbiAgICAgIGFkZEludF8oc19hLDIpOyAgLy9ub3cgc19hIGlzIGluIHRoZSByYW5nZSBbMixzX24tMl1cbiAgICAgIGNvcHlfKHNfYixzX2EpO1xuICAgICAgY29weV8oc19uMSxzX24pO1xuICAgICAgYWRkSW50XyhzX24xLC0xKTtcbiAgICAgIHBvd01vZF8oc19iLHNfbjEsc19uKTsgICAvL3NfYj1zX2FeKHNfbi0xKSBtb2R1bG8gc19uXG4gICAgICBhZGRJbnRfKHNfYiwtMSk7XG4gICAgICBpZiAoaXNaZXJvKHNfYikpIHtcbiAgICAgICAgY29weV8oc19iLHNfYSk7XG4gICAgICAgIHBvd01vZF8oc19iLHNfcjIsc19uKTtcbiAgICAgICAgYWRkSW50XyhzX2IsLTEpO1xuICAgICAgICBjb3B5XyhzX2FhLHNfbik7XG4gICAgICAgIGNvcHlfKHNfZCxzX2IpO1xuICAgICAgICBHQ0RfKHNfZCxzX24pOyAgLy9pZiBzX2IgYW5kIHNfbiBhcmUgcmVsYXRpdmVseSBwcmltZSwgdGhlbiBzX24gaXMgYSBwcmltZVxuICAgICAgICBpZiAoZXF1YWxzSW50KHNfZCwxKSkge1xuICAgICAgICAgIGNvcHlfKGFucyxzX2FhKTtcbiAgICAgICAgICByZXR1cm47ICAgICAvL2lmIHdlJ3ZlIG1hZGUgaXQgdGhpcyBmYXIsIHRoZW4gc19uIGlzIGFic29sdXRlbHkgZ3VhcmFudGVlZCB0byBiZSBwcmltZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8vUmV0dXJuIGFuIG4tYml0IHJhbmRvbSBCaWdJbnQgKG4+PTEpLiAgSWYgcz0xLCB0aGVuIHRoZSBtb3N0IHNpZ25pZmljYW50IG9mIHRob3NlIG4gYml0cyBpcyBzZXQgdG8gMS5cbmZ1bmN0aW9uIHJhbmRCaWdJbnQobixzKSB7XG4gIHZhciBhLGI7XG4gIGE9TWF0aC5mbG9vcigobi0xKS9icGUpKzI7IC8vIyBhcnJheSBlbGVtZW50cyB0byBob2xkIHRoZSBCaWdJbnQgd2l0aCBhIGxlYWRpbmcgMCBlbGVtZW50XG4gIGI9aW50MmJpZ0ludCgwLDAsYSk7XG4gIHJhbmRCaWdJbnRfKGIsbixzKTtcbiAgcmV0dXJuIGI7XG59XG5cbi8vU2V0IGIgdG8gYW4gbi1iaXQgcmFuZG9tIEJpZ0ludC4gIElmIHM9MSwgdGhlbiB0aGUgbW9zdCBzaWduaWZpY2FudCBvZiB0aG9zZSBuIGJpdHMgaXMgc2V0IHRvIDEuXG4vL0FycmF5IGIgbXVzdCBiZSBiaWcgZW5vdWdoIHRvIGhvbGQgdGhlIHJlc3VsdC4gTXVzdCBoYXZlIG4+PTFcbmZ1bmN0aW9uIHJhbmRCaWdJbnRfKGIsbixzKSB7XG4gIHZhciBpLGE7XG4gIGZvciAoaT0wO2k8Yi5sZW5ndGg7aSsrKVxuICAgIGJbaV09MDtcbiAgYT1NYXRoLmZsb29yKChuLTEpL2JwZSkrMTsgLy8jIGFycmF5IGVsZW1lbnRzIHRvIGhvbGQgdGhlIEJpZ0ludFxuICBmb3IgKGk9MDtpPGE7aSsrKSB7XG4gICAgYltpXT1NYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqKDE8PChicGUtMSkpKTtcbiAgfVxuICBiW2EtMV0gJj0gKDI8PCgobi0xKSVicGUpKS0xO1xuICBpZiAocz09MSlcbiAgICBiW2EtMV0gfD0gKDE8PCgobi0xKSVicGUpKTtcbn1cblxuLy9SZXR1cm4gdGhlIGdyZWF0ZXN0IGNvbW1vbiBkaXZpc29yIG9mIGJpZ0ludHMgeCBhbmQgeSAoZWFjaCB3aXRoIHNhbWUgbnVtYmVyIG9mIGVsZW1lbnRzKS5cbmZ1bmN0aW9uIEdDRCh4LHkpIHtcbiAgdmFyIHhjLHljO1xuICB4Yz1kdXAoeCk7XG4gIHljPWR1cCh5KTtcbiAgR0NEXyh4Yyx5Yyk7XG4gIHJldHVybiB4Yztcbn1cblxuLy9zZXQgeCB0byB0aGUgZ3JlYXRlc3QgY29tbW9uIGRpdmlzb3Igb2YgYmlnSW50cyB4IGFuZCB5IChlYWNoIHdpdGggc2FtZSBudW1iZXIgb2YgZWxlbWVudHMpLlxuLy95IGlzIGRlc3Ryb3llZC5cbmZ1bmN0aW9uIEdDRF8oeCx5KSB7XG4gIHZhciBpLHhwLHlwLEEsQixDLEQscSxzaW5nO1xuICBpZiAoVC5sZW5ndGghPXgubGVuZ3RoKVxuICAgIFQ9ZHVwKHgpO1xuXG4gIHNpbmc9MTtcbiAgd2hpbGUgKHNpbmcpIHsgLy93aGlsZSB5IGhhcyBub256ZXJvIGVsZW1lbnRzIG90aGVyIHRoYW4geVswXVxuICAgIHNpbmc9MDtcbiAgICBmb3IgKGk9MTtpPHkubGVuZ3RoO2krKykgLy9jaGVjayBpZiB5IGhhcyBub256ZXJvIGVsZW1lbnRzIG90aGVyIHRoYW4gMFxuICAgICAgaWYgKHlbaV0pIHtcbiAgICAgICAgc2luZz0xO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICBpZiAoIXNpbmcpIGJyZWFrOyAvL3F1aXQgd2hlbiB5IGFsbCB6ZXJvIGVsZW1lbnRzIGV4Y2VwdCBwb3NzaWJseSB5WzBdXG5cbiAgICBmb3IgKGk9eC5sZW5ndGg7IXhbaV0gJiYgaT49MDtpLS0pOyAgLy9maW5kIG1vc3Qgc2lnbmlmaWNhbnQgZWxlbWVudCBvZiB4XG4gICAgeHA9eFtpXTtcbiAgICB5cD15W2ldO1xuICAgIEE9MTsgQj0wOyBDPTA7IEQ9MTtcbiAgICB3aGlsZSAoKHlwK0MpICYmICh5cCtEKSkge1xuICAgICAgcSA9TWF0aC5mbG9vcigoeHArQSkvKHlwK0MpKTtcbiAgICAgIHFwPU1hdGguZmxvb3IoKHhwK0IpLyh5cCtEKSk7XG4gICAgICBpZiAocSE9cXApXG4gICAgICAgIGJyZWFrO1xuICAgICAgdD0gQS1xKkM7ICAgQT1DOyAgIEM9dDsgICAgLy8gIGRvIChBLEIseHAsIEMsRCx5cCkgPSAoQyxELHlwLCBBLEIseHApIC0gcSooMCwwLDAsIEMsRCx5cClcbiAgICAgIHQ9IEItcSpEOyAgIEI9RDsgICBEPXQ7XG4gICAgICB0PXhwLXEqeXA7IHhwPXlwOyB5cD10O1xuICAgIH1cbiAgICBpZiAoQikge1xuICAgICAgY29weV8oVCx4KTtcbiAgICAgIGxpbkNvbWJfKHgseSxBLEIpOyAvL3g9QSp4K0IqeVxuICAgICAgbGluQ29tYl8oeSxULEQsQyk7IC8veT1EKnkrQypUXG4gICAgfSBlbHNlIHtcbiAgICAgIG1vZF8oeCx5KTtcbiAgICAgIGNvcHlfKFQseCk7XG4gICAgICBjb3B5Xyh4LHkpO1xuICAgICAgY29weV8oeSxUKTtcbiAgICB9XG4gIH1cbiAgaWYgKHlbMF09PTApXG4gICAgcmV0dXJuO1xuICB0PW1vZEludCh4LHlbMF0pO1xuICBjb3B5SW50Xyh4LHlbMF0pO1xuICB5WzBdPXQ7XG4gIHdoaWxlICh5WzBdKSB7XG4gICAgeFswXSU9eVswXTtcbiAgICB0PXhbMF07IHhbMF09eVswXTsgeVswXT10O1xuICB9XG59XG5cbi8vZG8geD14KiooLTEpIG1vZCBuLCBmb3IgYmlnSW50cyB4IGFuZCBuLlxuLy9JZiBubyBpbnZlcnNlIGV4aXN0cywgaXQgc2V0cyB4IHRvIHplcm8gYW5kIHJldHVybnMgMCwgZWxzZSBpdCByZXR1cm5zIDEuXG4vL1RoZSB4IGFycmF5IG11c3QgYmUgYXQgbGVhc3QgYXMgbGFyZ2UgYXMgdGhlIG4gYXJyYXkuXG5mdW5jdGlvbiBpbnZlcnNlTW9kXyh4LG4pIHtcbiAgdmFyIGs9MSsyKk1hdGgubWF4KHgubGVuZ3RoLG4ubGVuZ3RoKTtcblxuICBpZighKHhbMF0mMSkgICYmICEoblswXSYxKSkgeyAgLy9pZiBib3RoIGlucHV0cyBhcmUgZXZlbiwgdGhlbiBpbnZlcnNlIGRvZXNuJ3QgZXhpc3RcbiAgICBjb3B5SW50Xyh4LDApO1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgaWYgKGVnX3UubGVuZ3RoIT1rKSB7XG4gICAgZWdfdT1uZXcgQXJyYXkoayk7XG4gICAgZWdfdj1uZXcgQXJyYXkoayk7XG4gICAgZWdfQT1uZXcgQXJyYXkoayk7XG4gICAgZWdfQj1uZXcgQXJyYXkoayk7XG4gICAgZWdfQz1uZXcgQXJyYXkoayk7XG4gICAgZWdfRD1uZXcgQXJyYXkoayk7XG4gIH1cblxuICBjb3B5XyhlZ191LHgpO1xuICBjb3B5XyhlZ192LG4pO1xuICBjb3B5SW50XyhlZ19BLDEpO1xuICBjb3B5SW50XyhlZ19CLDApO1xuICBjb3B5SW50XyhlZ19DLDApO1xuICBjb3B5SW50XyhlZ19ELDEpO1xuICBmb3IgKDs7KSB7XG4gICAgd2hpbGUoIShlZ191WzBdJjEpKSB7ICAvL3doaWxlIGVnX3UgaXMgZXZlblxuICAgICAgaGFsdmVfKGVnX3UpO1xuICAgICAgaWYgKCEoZWdfQVswXSYxKSAmJiAhKGVnX0JbMF0mMSkpIHsgLy9pZiBlZ19BPT1lZ19CPT0wIG1vZCAyXG4gICAgICAgIGhhbHZlXyhlZ19BKTtcbiAgICAgICAgaGFsdmVfKGVnX0IpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWRkXyhlZ19BLG4pOyAgaGFsdmVfKGVnX0EpO1xuICAgICAgICBzdWJfKGVnX0IseCk7ICBoYWx2ZV8oZWdfQik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgd2hpbGUgKCEoZWdfdlswXSYxKSkgeyAgLy93aGlsZSBlZ192IGlzIGV2ZW5cbiAgICAgIGhhbHZlXyhlZ192KTtcbiAgICAgIGlmICghKGVnX0NbMF0mMSkgJiYgIShlZ19EWzBdJjEpKSB7IC8vaWYgZWdfQz09ZWdfRD09MCBtb2QgMlxuICAgICAgICBoYWx2ZV8oZWdfQyk7XG4gICAgICAgIGhhbHZlXyhlZ19EKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFkZF8oZWdfQyxuKTsgIGhhbHZlXyhlZ19DKTtcbiAgICAgICAgc3ViXyhlZ19ELHgpOyAgaGFsdmVfKGVnX0QpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghZ3JlYXRlcihlZ192LGVnX3UpKSB7IC8vZWdfdiA8PSBlZ191XG4gICAgICBzdWJfKGVnX3UsZWdfdik7XG4gICAgICBzdWJfKGVnX0EsZWdfQyk7XG4gICAgICBzdWJfKGVnX0IsZWdfRCk7XG4gICAgfSBlbHNlIHsgICAgICAgICAgICAgICAgICAgLy9lZ192ID4gZWdfdVxuICAgICAgc3ViXyhlZ192LGVnX3UpO1xuICAgICAgc3ViXyhlZ19DLGVnX0EpO1xuICAgICAgc3ViXyhlZ19ELGVnX0IpO1xuICAgIH1cblxuICAgIGlmIChlcXVhbHNJbnQoZWdfdSwwKSkge1xuICAgICAgaWYgKG5lZ2F0aXZlKGVnX0MpKSAvL21ha2Ugc3VyZSBhbnN3ZXIgaXMgbm9ubmVnYXRpdmVcbiAgICAgICAgYWRkXyhlZ19DLG4pO1xuICAgICAgY29weV8oeCxlZ19DKTtcblxuICAgICAgaWYgKCFlcXVhbHNJbnQoZWdfdiwxKSkgeyAvL2lmIEdDRF8oeCxuKSE9MSwgdGhlbiB0aGVyZSBpcyBubyBpbnZlcnNlXG4gICAgICAgIGNvcHlJbnRfKHgsMCk7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfVxuICAgICAgcmV0dXJuIDE7XG4gICAgfVxuICB9XG59XG5cbi8vcmV0dXJuIHgqKigtMSkgbW9kIG4sIGZvciBpbnRlZ2VycyB4IGFuZCBuLiAgUmV0dXJuIDAgaWYgdGhlcmUgaXMgbm8gaW52ZXJzZVxuZnVuY3Rpb24gaW52ZXJzZU1vZEludCh4LG4pIHtcbiAgdmFyIGE9MSxiPTAsdDtcbiAgZm9yICg7Oykge1xuICAgIGlmICh4PT0xKSByZXR1cm4gYTtcbiAgICBpZiAoeD09MCkgcmV0dXJuIDA7XG4gICAgYi09YSpNYXRoLmZsb29yKG4veCk7XG4gICAgbiU9eDtcblxuICAgIGlmIChuPT0xKSByZXR1cm4gYjsgLy90byBhdm9pZCBuZWdhdGl2ZXMsIGNoYW5nZSB0aGlzIGIgdG8gbi1iLCBhbmQgZWFjaCAtPSB0byArPVxuICAgIGlmIChuPT0wKSByZXR1cm4gMDtcbiAgICBhLT1iKk1hdGguZmxvb3IoeC9uKTtcbiAgICB4JT1uO1xuICB9XG59XG5cbi8vdGhpcyBkZXByZWNhdGVkIGZ1bmN0aW9uIGlzIGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5IG9ubHkuXG5mdW5jdGlvbiBpbnZlcnNlTW9kSW50Xyh4LG4pIHtcbiAgIHJldHVybiBpbnZlcnNlTW9kSW50KHgsbik7XG59XG5cblxuLy9HaXZlbiBwb3NpdGl2ZSBiaWdJbnRzIHggYW5kIHksIGNoYW5nZSB0aGUgYmlnaW50cyB2LCBhLCBhbmQgYiB0byBwb3NpdGl2ZSBiaWdJbnRzIHN1Y2ggdGhhdDpcbi8vICAgICB2ID0gR0NEXyh4LHkpID0gYSp4LWIqeVxuLy9UaGUgYmlnSW50cyB2LCBhLCBiLCBtdXN0IGhhdmUgZXhhY3RseSBhcyBtYW55IGVsZW1lbnRzIGFzIHRoZSBsYXJnZXIgb2YgeCBhbmQgeS5cbmZ1bmN0aW9uIGVHQ0RfKHgseSx2LGEsYikge1xuICB2YXIgZz0wO1xuICB2YXIgaz1NYXRoLm1heCh4Lmxlbmd0aCx5Lmxlbmd0aCk7XG4gIGlmIChlZ191Lmxlbmd0aCE9aykge1xuICAgIGVnX3U9bmV3IEFycmF5KGspO1xuICAgIGVnX0E9bmV3IEFycmF5KGspO1xuICAgIGVnX0I9bmV3IEFycmF5KGspO1xuICAgIGVnX0M9bmV3IEFycmF5KGspO1xuICAgIGVnX0Q9bmV3IEFycmF5KGspO1xuICB9XG4gIHdoaWxlKCEoeFswXSYxKSAgJiYgISh5WzBdJjEpKSB7ICAvL3doaWxlIHggYW5kIHkgYm90aCBldmVuXG4gICAgaGFsdmVfKHgpO1xuICAgIGhhbHZlXyh5KTtcbiAgICBnKys7XG4gIH1cbiAgY29weV8oZWdfdSx4KTtcbiAgY29weV8odix5KTtcbiAgY29weUludF8oZWdfQSwxKTtcbiAgY29weUludF8oZWdfQiwwKTtcbiAgY29weUludF8oZWdfQywwKTtcbiAgY29weUludF8oZWdfRCwxKTtcbiAgZm9yICg7Oykge1xuICAgIHdoaWxlKCEoZWdfdVswXSYxKSkgeyAgLy93aGlsZSB1IGlzIGV2ZW5cbiAgICAgIGhhbHZlXyhlZ191KTtcbiAgICAgIGlmICghKGVnX0FbMF0mMSkgJiYgIShlZ19CWzBdJjEpKSB7IC8vaWYgQT09Qj09MCBtb2QgMlxuICAgICAgICBoYWx2ZV8oZWdfQSk7XG4gICAgICAgIGhhbHZlXyhlZ19CKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFkZF8oZWdfQSx5KTsgIGhhbHZlXyhlZ19BKTtcbiAgICAgICAgc3ViXyhlZ19CLHgpOyAgaGFsdmVfKGVnX0IpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHdoaWxlICghKHZbMF0mMSkpIHsgIC8vd2hpbGUgdiBpcyBldmVuXG4gICAgICBoYWx2ZV8odik7XG4gICAgICBpZiAoIShlZ19DWzBdJjEpICYmICEoZWdfRFswXSYxKSkgeyAvL2lmIEM9PUQ9PTAgbW9kIDJcbiAgICAgICAgaGFsdmVfKGVnX0MpO1xuICAgICAgICBoYWx2ZV8oZWdfRCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhZGRfKGVnX0MseSk7ICBoYWx2ZV8oZWdfQyk7XG4gICAgICAgIHN1Yl8oZWdfRCx4KTsgIGhhbHZlXyhlZ19EKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWdyZWF0ZXIodixlZ191KSkgeyAvL3Y8PXVcbiAgICAgIHN1Yl8oZWdfdSx2KTtcbiAgICAgIHN1Yl8oZWdfQSxlZ19DKTtcbiAgICAgIHN1Yl8oZWdfQixlZ19EKTtcbiAgICB9IGVsc2UgeyAgICAgICAgICAgICAgICAvL3Y+dVxuICAgICAgc3ViXyh2LGVnX3UpO1xuICAgICAgc3ViXyhlZ19DLGVnX0EpO1xuICAgICAgc3ViXyhlZ19ELGVnX0IpO1xuICAgIH1cbiAgICBpZiAoZXF1YWxzSW50KGVnX3UsMCkpIHtcbiAgICAgIGlmIChuZWdhdGl2ZShlZ19DKSkgeyAgIC8vbWFrZSBzdXJlIGEgKEMpaXMgbm9ubmVnYXRpdmVcbiAgICAgICAgYWRkXyhlZ19DLHkpO1xuICAgICAgICBzdWJfKGVnX0QseCk7XG4gICAgICB9XG4gICAgICBtdWx0SW50XyhlZ19ELC0xKTsgIC8vL21ha2Ugc3VyZSBiIChEKSBpcyBub25uZWdhdGl2ZVxuICAgICAgY29weV8oYSxlZ19DKTtcbiAgICAgIGNvcHlfKGIsZWdfRCk7XG4gICAgICBsZWZ0U2hpZnRfKHYsZyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG59XG5cblxuLy9pcyBiaWdJbnQgeCBuZWdhdGl2ZT9cbmZ1bmN0aW9uIG5lZ2F0aXZlKHgpIHtcbiAgcmV0dXJuICgoeFt4Lmxlbmd0aC0xXT4+KGJwZS0xKSkmMSk7XG59XG5cblxuLy9pcyAoeCA8PCAoc2hpZnQqYnBlKSkgPiB5P1xuLy94IGFuZCB5IGFyZSBub25uZWdhdGl2ZSBiaWdJbnRzXG4vL3NoaWZ0IGlzIGEgbm9ubmVnYXRpdmUgaW50ZWdlclxuZnVuY3Rpb24gZ3JlYXRlclNoaWZ0KHgseSxzaGlmdCkge1xuICB2YXIgaSwga3g9eC5sZW5ndGgsIGt5PXkubGVuZ3RoO1xuICBrPSgoa3grc2hpZnQpPGt5KSA/IChreCtzaGlmdCkgOiBreTtcbiAgZm9yIChpPWt5LTEtc2hpZnQ7IGk8a3ggJiYgaT49MDsgaSsrKVxuICAgIGlmICh4W2ldPjApXG4gICAgICByZXR1cm4gMTsgLy9pZiB0aGVyZSBhcmUgbm9uemVyb3MgaW4geCB0byB0aGUgbGVmdCBvZiB0aGUgZmlyc3QgY29sdW1uIG9mIHksIHRoZW4geCBpcyBiaWdnZXJcbiAgZm9yIChpPWt4LTErc2hpZnQ7IGk8a3k7IGkrKylcbiAgICBpZiAoeVtpXT4wKVxuICAgICAgcmV0dXJuIDA7IC8vaWYgdGhlcmUgYXJlIG5vbnplcm9zIGluIHkgdG8gdGhlIGxlZnQgb2YgdGhlIGZpcnN0IGNvbHVtbiBvZiB4LCB0aGVuIHggaXMgbm90IGJpZ2dlclxuICBmb3IgKGk9ay0xOyBpPj1zaGlmdDsgaS0tKVxuICAgIGlmICAgICAgKHhbaS1zaGlmdF0+eVtpXSkgcmV0dXJuIDE7XG4gICAgZWxzZSBpZiAoeFtpLXNoaWZ0XTx5W2ldKSByZXR1cm4gMDtcbiAgcmV0dXJuIDA7XG59XG5cbi8vaXMgeCA+IHk/ICh4IGFuZCB5IGJvdGggbm9ubmVnYXRpdmUpXG5mdW5jdGlvbiBncmVhdGVyKHgseSkge1xuICB2YXIgaTtcbiAgdmFyIGs9KHgubGVuZ3RoPHkubGVuZ3RoKSA/IHgubGVuZ3RoIDogeS5sZW5ndGg7XG5cbiAgZm9yIChpPXgubGVuZ3RoO2k8eS5sZW5ndGg7aSsrKVxuICAgIGlmICh5W2ldKVxuICAgICAgcmV0dXJuIDA7ICAvL3kgaGFzIG1vcmUgZGlnaXRzXG5cbiAgZm9yIChpPXkubGVuZ3RoO2k8eC5sZW5ndGg7aSsrKVxuICAgIGlmICh4W2ldKVxuICAgICAgcmV0dXJuIDE7ICAvL3ggaGFzIG1vcmUgZGlnaXRzXG5cbiAgZm9yIChpPWstMTtpPj0wO2ktLSlcbiAgICBpZiAoeFtpXT55W2ldKVxuICAgICAgcmV0dXJuIDE7XG4gICAgZWxzZSBpZiAoeFtpXTx5W2ldKVxuICAgICAgcmV0dXJuIDA7XG4gIHJldHVybiAwO1xufVxuXG4vL2RpdmlkZSB4IGJ5IHkgZ2l2aW5nIHF1b3RpZW50IHEgYW5kIHJlbWFpbmRlciByLiAgKHE9Zmxvb3IoeC95KSwgIHI9eCBtb2QgeSkuICBBbGwgNCBhcmUgYmlnaW50cy5cbi8veCBtdXN0IGhhdmUgYXQgbGVhc3Qgb25lIGxlYWRpbmcgemVybyBlbGVtZW50LlxuLy95IG11c3QgYmUgbm9uemVyby5cbi8vcSBhbmQgciBtdXN0IGJlIGFycmF5cyB0aGF0IGFyZSBleGFjdGx5IHRoZSBzYW1lIGxlbmd0aCBhcyB4LiAoT3IgcSBjYW4gaGF2ZSBtb3JlKS5cbi8vTXVzdCBoYXZlIHgubGVuZ3RoID49IHkubGVuZ3RoID49IDIuXG5mdW5jdGlvbiBkaXZpZGVfKHgseSxxLHIpIHtcbiAgdmFyIGt4LCBreTtcbiAgdmFyIGksaix5MSx5MixjLGEsYjtcbiAgY29weV8ocix4KTtcbiAgZm9yIChreT15Lmxlbmd0aDt5W2t5LTFdPT0wO2t5LS0pOyAvL2t5IGlzIG51bWJlciBvZiBlbGVtZW50cyBpbiB5LCBub3QgaW5jbHVkaW5nIGxlYWRpbmcgemVyb3NcblxuICAvL25vcm1hbGl6ZTogZW5zdXJlIHRoZSBtb3N0IHNpZ25pZmljYW50IGVsZW1lbnQgb2YgeSBoYXMgaXRzIGhpZ2hlc3QgYml0IHNldFxuICBiPXlba3ktMV07XG4gIGZvciAoYT0wOyBiOyBhKyspXG4gICAgYj4+PTE7XG4gIGE9YnBlLWE7ICAvL2EgaXMgaG93IG1hbnkgYml0cyB0byBzaGlmdCBzbyB0aGF0IHRoZSBoaWdoIG9yZGVyIGJpdCBvZiB5IGlzIGxlZnRtb3N0IGluIGl0cyBhcnJheSBlbGVtZW50XG4gIGxlZnRTaGlmdF8oeSxhKTsgIC8vbXVsdGlwbHkgYm90aCBieSAxPDxhIG5vdywgdGhlbiBkaXZpZGUgYm90aCBieSB0aGF0IGF0IHRoZSBlbmRcbiAgbGVmdFNoaWZ0XyhyLGEpO1xuXG4gIC8vUm9iIFZpc3NlciBkaXNjb3ZlcmVkIGEgYnVnOiB0aGUgZm9sbG93aW5nIGxpbmUgd2FzIG9yaWdpbmFsbHkganVzdCBiZWZvcmUgdGhlIG5vcm1hbGl6YXRpb24uXG4gIGZvciAoa3g9ci5sZW5ndGg7cltreC0xXT09MCAmJiBreD5reTtreC0tKTsgLy9reCBpcyBudW1iZXIgb2YgZWxlbWVudHMgaW4gbm9ybWFsaXplZCB4LCBub3QgaW5jbHVkaW5nIGxlYWRpbmcgemVyb3NcblxuICBjb3B5SW50XyhxLDApOyAgICAgICAgICAgICAgICAgICAgICAvLyBxPTBcbiAgd2hpbGUgKCFncmVhdGVyU2hpZnQoeSxyLGt4LWt5KSkgeyAgLy8gd2hpbGUgKGxlZnRTaGlmdF8oeSxreC1reSkgPD0gcikge1xuICAgIHN1YlNoaWZ0XyhyLHksa3gta3kpOyAgICAgICAgICAgICAvLyAgIHI9ci1sZWZ0U2hpZnRfKHksa3gta3kpXG4gICAgcVtreC1reV0rKzsgICAgICAgICAgICAgICAgICAgICAgIC8vICAgcVtreC1reV0rKztcbiAgfSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gfVxuXG4gIGZvciAoaT1reC0xOyBpPj1reTsgaS0tKSB7XG4gICAgaWYgKHJbaV09PXlba3ktMV0pXG4gICAgICBxW2kta3ldPW1hc2s7XG4gICAgZWxzZVxuICAgICAgcVtpLWt5XT1NYXRoLmZsb29yKChyW2ldKnJhZGl4K3JbaS0xXSkveVtreS0xXSk7XG5cbiAgICAvL1RoZSBmb2xsb3dpbmcgZm9yKDs7KSBsb29wIGlzIGVxdWl2YWxlbnQgdG8gdGhlIGNvbW1lbnRlZCB3aGlsZSBsb29wLFxuICAgIC8vZXhjZXB0IHRoYXQgdGhlIHVuY29tbWVudGVkIHZlcnNpb24gYXZvaWRzIG92ZXJmbG93LlxuICAgIC8vVGhlIGNvbW1lbnRlZCBsb29wIGNvbWVzIGZyb20gSEFDLCB3aGljaCBhc3N1bWVzIHJbLTFdPT15Wy0xXT09MFxuICAgIC8vICB3aGlsZSAocVtpLWt5XSooeVtreS0xXSpyYWRpeCt5W2t5LTJdKSA+IHJbaV0qcmFkaXgqcmFkaXgrcltpLTFdKnJhZGl4K3JbaS0yXSlcbiAgICAvLyAgICBxW2kta3ldLS07XG4gICAgZm9yICg7Oykge1xuICAgICAgeTI9KGt5PjEgPyB5W2t5LTJdIDogMCkqcVtpLWt5XTtcbiAgICAgIGM9eTI+PmJwZTtcbiAgICAgIHkyPXkyICYgbWFzaztcbiAgICAgIHkxPWMrcVtpLWt5XSp5W2t5LTFdO1xuICAgICAgYz15MT4+YnBlO1xuICAgICAgeTE9eTEgJiBtYXNrO1xuXG4gICAgICBpZiAoYz09cltpXSA/IHkxPT1yW2ktMV0gPyB5Mj4oaT4xID8gcltpLTJdIDogMCkgOiB5MT5yW2ktMV0gOiBjPnJbaV0pXG4gICAgICAgIHFbaS1reV0tLTtcbiAgICAgIGVsc2VcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgbGluQ29tYlNoaWZ0XyhyLHksLXFbaS1reV0saS1reSk7ICAgIC8vcj1yLXFbaS1reV0qbGVmdFNoaWZ0Xyh5LGkta3kpXG4gICAgaWYgKG5lZ2F0aXZlKHIpKSB7XG4gICAgICBhZGRTaGlmdF8ocix5LGkta3kpOyAgICAgICAgIC8vcj1yK2xlZnRTaGlmdF8oeSxpLWt5KVxuICAgICAgcVtpLWt5XS0tO1xuICAgIH1cbiAgfVxuXG4gIHJpZ2h0U2hpZnRfKHksYSk7ICAvL3VuZG8gdGhlIG5vcm1hbGl6YXRpb24gc3RlcFxuICByaWdodFNoaWZ0XyhyLGEpOyAgLy91bmRvIHRoZSBub3JtYWxpemF0aW9uIHN0ZXBcbn1cblxuLy9kbyBjYXJyaWVzIGFuZCBib3Jyb3dzIHNvIGVhY2ggZWxlbWVudCBvZiB0aGUgYmlnSW50IHggZml0cyBpbiBicGUgYml0cy5cbmZ1bmN0aW9uIGNhcnJ5Xyh4KSB7XG4gIHZhciBpLGssYyxiO1xuICBrPXgubGVuZ3RoO1xuICBjPTA7XG4gIGZvciAoaT0wO2k8aztpKyspIHtcbiAgICBjKz14W2ldO1xuICAgIGI9MDtcbiAgICBpZiAoYzwwKSB7XG4gICAgICBiPS0oYz4+YnBlKTtcbiAgICAgIGMrPWIqcmFkaXg7XG4gICAgfVxuICAgIHhbaV09YyAmIG1hc2s7XG4gICAgYz0oYz4+YnBlKS1iO1xuICB9XG59XG5cbi8vcmV0dXJuIHggbW9kIG4gZm9yIGJpZ0ludCB4IGFuZCBpbnRlZ2VyIG4uXG5mdW5jdGlvbiBtb2RJbnQoeCxuKSB7XG4gIHZhciBpLGM9MDtcbiAgZm9yIChpPXgubGVuZ3RoLTE7IGk+PTA7IGktLSlcbiAgICBjPShjKnJhZGl4K3hbaV0pJW47XG4gIHJldHVybiBjO1xufVxuXG4vL2NvbnZlcnQgdGhlIGludGVnZXIgdCBpbnRvIGEgYmlnSW50IHdpdGggYXQgbGVhc3QgdGhlIGdpdmVuIG51bWJlciBvZiBiaXRzLlxuLy90aGUgcmV0dXJuZWQgYXJyYXkgc3RvcmVzIHRoZSBiaWdJbnQgaW4gYnBlLWJpdCBjaHVua3MsIGxpdHRsZSBlbmRpYW4gKGJ1ZmZbMF0gaXMgbGVhc3Qgc2lnbmlmaWNhbnQgd29yZClcbi8vUGFkIHRoZSBhcnJheSB3aXRoIGxlYWRpbmcgemVyb3Mgc28gdGhhdCBpdCBoYXMgYXQgbGVhc3QgbWluU2l6ZSBlbGVtZW50cy5cbi8vVGhlcmUgd2lsbCBhbHdheXMgYmUgYXQgbGVhc3Qgb25lIGxlYWRpbmcgMCBlbGVtZW50LlxuZnVuY3Rpb24gaW50MmJpZ0ludCh0LGJpdHMsbWluU2l6ZSkge1xuICB2YXIgaSxrO1xuICBrPU1hdGguY2VpbChiaXRzL2JwZSkrMTtcbiAgaz1taW5TaXplPmsgPyBtaW5TaXplIDogaztcbiAgYnVmZj1uZXcgQXJyYXkoayk7XG4gIGNvcHlJbnRfKGJ1ZmYsdCk7XG4gIHJldHVybiBidWZmO1xufVxuXG4vL3JldHVybiB0aGUgYmlnSW50IGdpdmVuIGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIGluIGEgZ2l2ZW4gYmFzZS5cbi8vUGFkIHRoZSBhcnJheSB3aXRoIGxlYWRpbmcgemVyb3Mgc28gdGhhdCBpdCBoYXMgYXQgbGVhc3QgbWluU2l6ZSBlbGVtZW50cy5cbi8vSWYgYmFzZT0tMSwgdGhlbiBpdCByZWFkcyBpbiBhIHNwYWNlLXNlcGFyYXRlZCBsaXN0IG9mIGFycmF5IGVsZW1lbnRzIGluIGRlY2ltYWwuXG4vL1RoZSBhcnJheSB3aWxsIGFsd2F5cyBoYXZlIGF0IGxlYXN0IG9uZSBsZWFkaW5nIHplcm8sIHVubGVzcyBiYXNlPS0xLlxuZnVuY3Rpb24gc3RyMmJpZ0ludChzLGIsbWluU2l6ZSkge1xuICB2YXIgZCwgaSwgaiwgYmFzZSwgc3RyLCB4LCB5LCBraztcbiAgaWYgKHR5cGVvZiBiID09PSAnc3RyaW5nJykge1xuXHQgIGJhc2UgPSBiLmxlbmd0aDtcblx0ICBzdHIgPSBiO1xuICB9IGVsc2Uge1xuXHQgIGJhc2UgPSBiO1xuXHQgIHN0ciA9IGRpZ2l0c1N0cjtcbiAgfVxuICB2YXIgaz1zLmxlbmd0aDtcbiAgaWYgKGJhc2U9PS0xKSB7IC8vY29tbWEtc2VwYXJhdGVkIGxpc3Qgb2YgYXJyYXkgZWxlbWVudHMgaW4gZGVjaW1hbFxuICAgIHg9bmV3IEFycmF5KDApO1xuICAgIGZvciAoOzspIHtcbiAgICAgIHk9bmV3IEFycmF5KHgubGVuZ3RoKzEpO1xuICAgICAgZm9yIChpPTA7aTx4Lmxlbmd0aDtpKyspXG4gICAgICAgIHlbaSsxXT14W2ldO1xuICAgICAgeVswXT1wYXJzZUludChzLDEwKTtcbiAgICAgIHg9eTtcbiAgICAgIGQ9cy5pbmRleE9mKCcsJywwKTtcbiAgICAgIGlmIChkPDEpXG4gICAgICAgIGJyZWFrO1xuICAgICAgcz1zLnN1YnN0cmluZyhkKzEpO1xuICAgICAgaWYgKHMubGVuZ3RoPT0wKVxuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgaWYgKHgubGVuZ3RoPG1pblNpemUpIHtcbiAgICAgIHk9bmV3IEFycmF5KG1pblNpemUpO1xuICAgICAgY29weV8oeSx4KTtcbiAgICAgIHJldHVybiB5O1xuICAgIH1cbiAgICByZXR1cm4geDtcbiAgfVxuXG4gIHg9aW50MmJpZ0ludCgwLGJhc2UqaywwKTtcbiAgZm9yIChpPTA7aTxrO2krKykge1xuICAgIGQ9c3RyLmluZGV4T2Yocy5zdWJzdHJpbmcoaSxpKzEpLDApO1xuLy8gICAgaWYgKGJhc2U8PTM2ICYmIGQ+PTM2KSAgLy9jb252ZXJ0IGxvd2VyY2FzZSB0byB1cHBlcmNhc2UgaWYgYmFzZTw9MzZcbi8vICAgICAgZC09MjY7XG4gICAgaWYgKGQ+PWJhc2UgfHwgZDwwKSB7ICAgLy9pZ25vcmUgaWxsZWdhbCBjaGFyYWN0ZXJzXG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgbXVsdEludF8oeCxiYXNlKTtcbiAgICBhZGRJbnRfKHgsZCk7XG4gIH1cblxuICBmb3IgKGs9eC5sZW5ndGg7az4wICYmICF4W2stMV07ay0tKTsgLy9zdHJpcCBvZmYgbGVhZGluZyB6ZXJvc1xuICBrPW1pblNpemU+aysxID8gbWluU2l6ZSA6IGsrMTtcbiAgeT1uZXcgQXJyYXkoayk7XG4gIGtrPWs8eC5sZW5ndGggPyBrIDogeC5sZW5ndGg7XG4gIGZvciAoaT0wO2k8a2s7aSsrKVxuICAgIHlbaV09eFtpXTtcbiAgZm9yICg7aTxrO2krKylcbiAgICB5W2ldPTA7XG4gIHJldHVybiB5O1xufVxuXG4vL2lzIGJpZ2ludCB4IGVxdWFsIHRvIGludGVnZXIgeT9cbi8veSBtdXN0IGhhdmUgbGVzcyB0aGFuIGJwZSBiaXRzXG5mdW5jdGlvbiBlcXVhbHNJbnQoeCx5KSB7XG4gIHZhciBpO1xuICBpZiAoeFswXSE9eSlcbiAgICByZXR1cm4gMDtcbiAgZm9yIChpPTE7aTx4Lmxlbmd0aDtpKyspXG4gICAgaWYgKHhbaV0pXG4gICAgICByZXR1cm4gMDtcbiAgcmV0dXJuIDE7XG59XG5cbi8vYXJlIGJpZ2ludHMgeCBhbmQgeSBlcXVhbD9cbi8vdGhpcyB3b3JrcyBldmVuIGlmIHggYW5kIHkgYXJlIGRpZmZlcmVudCBsZW5ndGhzIGFuZCBoYXZlIGFyYml0cmFyaWx5IG1hbnkgbGVhZGluZyB6ZXJvc1xuZnVuY3Rpb24gZXF1YWxzKHgseSkge1xuICB2YXIgaTtcbiAgdmFyIGs9eC5sZW5ndGg8eS5sZW5ndGggPyB4Lmxlbmd0aCA6IHkubGVuZ3RoO1xuICBmb3IgKGk9MDtpPGs7aSsrKVxuICAgIGlmICh4W2ldIT15W2ldKVxuICAgICAgcmV0dXJuIDA7XG4gIGlmICh4Lmxlbmd0aD55Lmxlbmd0aCkge1xuICAgIGZvciAoO2k8eC5sZW5ndGg7aSsrKVxuICAgICAgaWYgKHhbaV0pXG4gICAgICAgIHJldHVybiAwO1xuICB9IGVsc2Uge1xuICAgIGZvciAoO2k8eS5sZW5ndGg7aSsrKVxuICAgICAgaWYgKHlbaV0pXG4gICAgICAgIHJldHVybiAwO1xuICB9XG4gIHJldHVybiAxO1xufVxuXG4vL2lzIHRoZSBiaWdJbnQgeCBlcXVhbCB0byB6ZXJvP1xuZnVuY3Rpb24gaXNaZXJvKHgpIHtcbiAgdmFyIGk7XG4gIGZvciAoaT0wO2k8eC5sZW5ndGg7aSsrKVxuICAgIGlmICh4W2ldKVxuICAgICAgcmV0dXJuIDA7XG4gIHJldHVybiAxO1xufVxuXG4vL2NvbnZlcnQgYSBiaWdJbnQgaW50byBhIHN0cmluZyBpbiBhIGdpdmVuIGJhc2UsIGZyb20gYmFzZSAyIHVwIHRvIGJhc2UgOTUuXG4vL0Jhc2UgLTEgcHJpbnRzIHRoZSBjb250ZW50cyBvZiB0aGUgYXJyYXkgcmVwcmVzZW50aW5nIHRoZSBudW1iZXIuXG5mdW5jdGlvbiBiaWdJbnQyc3RyKHgsYikge1xuICB2YXIgaSx0LGJhc2Usc3RyLHM9XCJcIjtcbiAgaWYgKHR5cGVvZiBiID09PSAnc3RyaW5nJykge1xuXHQgIGJhc2UgPSBiLmxlbmd0aDtcblx0ICBzdHIgPSBiO1xuICB9IGVsc2Uge1xuXHQgIGJhc2UgPSBiO1xuXHQgIHN0ciA9IGRpZ2l0c1N0cjtcbiAgfVxuXG4gIGlmIChzNi5sZW5ndGghPXgubGVuZ3RoKVxuICAgIHM2PWR1cCh4KTtcbiAgZWxzZVxuICAgIGNvcHlfKHM2LHgpO1xuXG4gIGlmIChiYXNlPT0tMSkgeyAvL3JldHVybiB0aGUgbGlzdCBvZiBhcnJheSBjb250ZW50c1xuICAgIGZvciAoaT14Lmxlbmd0aC0xO2k+MDtpLS0pXG4gICAgICBzKz14W2ldKycsJztcbiAgICBzKz14WzBdO1xuICB9XG4gIGVsc2UgeyAvL3JldHVybiBpdCBpbiB0aGUgZ2l2ZW4gYmFzZVxuICAgIHdoaWxlICghaXNaZXJvKHM2KSkge1xuICAgICAgdD1kaXZJbnRfKHM2LGJhc2UpOyAgLy90PXM2ICUgYmFzZTsgczY9Zmxvb3IoczYvYmFzZSk7XG4gICAgICBzPXN0ci5zdWJzdHJpbmcodCx0KzEpK3M7XG4gICAgfVxuICB9XG4gIGlmIChzLmxlbmd0aD09MClcbiAgICBzPXN0clswXTtcbiAgcmV0dXJuIHM7XG59XG5cbi8vcmV0dXJucyBhIGR1cGxpY2F0ZSBvZiBiaWdJbnQgeFxuZnVuY3Rpb24gZHVwKHgpIHtcbiAgdmFyIGk7XG4gIGJ1ZmY9bmV3IEFycmF5KHgubGVuZ3RoKTtcbiAgY29weV8oYnVmZix4KTtcbiAgcmV0dXJuIGJ1ZmY7XG59XG5cbi8vZG8geD15IG9uIGJpZ0ludHMgeCBhbmQgeS4gIHggbXVzdCBiZSBhbiBhcnJheSBhdCBsZWFzdCBhcyBiaWcgYXMgeSAobm90IGNvdW50aW5nIHRoZSBsZWFkaW5nIHplcm9zIGluIHkpLlxuZnVuY3Rpb24gY29weV8oeCx5KSB7XG4gIHZhciBpO1xuICB2YXIgaz14Lmxlbmd0aDx5Lmxlbmd0aCA/IHgubGVuZ3RoIDogeS5sZW5ndGg7XG4gIGZvciAoaT0wO2k8aztpKyspXG4gICAgeFtpXT15W2ldO1xuICBmb3IgKGk9aztpPHgubGVuZ3RoO2krKylcbiAgICB4W2ldPTA7XG59XG5cbi8vZG8geD15IG9uIGJpZ0ludCB4IGFuZCBpbnRlZ2VyIHkuXG5mdW5jdGlvbiBjb3B5SW50Xyh4LG4pIHtcbiAgdmFyIGksYztcbiAgZm9yIChjPW4saT0wO2k8eC5sZW5ndGg7aSsrKSB7XG4gICAgeFtpXT1jICYgbWFzaztcbiAgICBjPj49YnBlO1xuICB9XG59XG5cbi8vZG8geD14K24gd2hlcmUgeCBpcyBhIGJpZ0ludCBhbmQgbiBpcyBhbiBpbnRlZ2VyLlxuLy94IG11c3QgYmUgbGFyZ2UgZW5vdWdoIHRvIGhvbGQgdGhlIHJlc3VsdC5cbmZ1bmN0aW9uIGFkZEludF8oeCxuKSB7XG4gIHZhciBpLGssYyxiO1xuICB4WzBdKz1uO1xuICBrPXgubGVuZ3RoO1xuICBjPTA7XG4gIGZvciAoaT0wO2k8aztpKyspIHtcbiAgICBjKz14W2ldO1xuICAgIGI9MDtcbiAgICBpZiAoYzwwKSB7XG4gICAgICBiPS0oYz4+YnBlKTtcbiAgICAgIGMrPWIqcmFkaXg7XG4gICAgfVxuICAgIHhbaV09YyAmIG1hc2s7XG4gICAgYz0oYz4+YnBlKS1iO1xuICAgIGlmICghYykgcmV0dXJuOyAvL3N0b3AgY2FycnlpbmcgYXMgc29vbiBhcyB0aGUgY2FycnkgaXMgemVyb1xuICB9XG59XG5cbi8vcmlnaHQgc2hpZnQgYmlnSW50IHggYnkgbiBiaXRzLiAgMCA8PSBuIDwgYnBlLlxuZnVuY3Rpb24gcmlnaHRTaGlmdF8oeCxuKSB7XG4gIHZhciBpO1xuICB2YXIgaz1NYXRoLmZsb29yKG4vYnBlKTtcbiAgaWYgKGspIHtcbiAgICBmb3IgKGk9MDtpPHgubGVuZ3RoLWs7aSsrKSAvL3JpZ2h0IHNoaWZ0IHggYnkgayBlbGVtZW50c1xuICAgICAgeFtpXT14W2kra107XG4gICAgZm9yICg7aTx4Lmxlbmd0aDtpKyspXG4gICAgICB4W2ldPTA7XG4gICAgbiU9YnBlO1xuICB9XG4gIGZvciAoaT0wO2k8eC5sZW5ndGgtMTtpKyspIHtcbiAgICB4W2ldPW1hc2sgJiAoKHhbaSsxXTw8KGJwZS1uKSkgfCAoeFtpXT4+bikpO1xuICB9XG4gIHhbaV0+Pj1uO1xufVxuXG4vL2RvIHg9Zmxvb3IofHh8LzIpKnNnbih4KSBmb3IgYmlnSW50IHggaW4gMidzIGNvbXBsZW1lbnRcbmZ1bmN0aW9uIGhhbHZlXyh4KSB7XG4gIHZhciBpO1xuICBmb3IgKGk9MDtpPHgubGVuZ3RoLTE7aSsrKSB7XG4gICAgeFtpXT1tYXNrICYgKCh4W2krMV08PChicGUtMSkpIHwgKHhbaV0+PjEpKTtcbiAgfVxuICB4W2ldPSh4W2ldPj4xKSB8ICh4W2ldICYgKHJhZGl4Pj4xKSk7ICAvL21vc3Qgc2lnbmlmaWNhbnQgYml0IHN0YXlzIHRoZSBzYW1lXG59XG5cbi8vbGVmdCBzaGlmdCBiaWdJbnQgeCBieSBuIGJpdHMuXG5mdW5jdGlvbiBsZWZ0U2hpZnRfKHgsbikge1xuICB2YXIgaTtcbiAgdmFyIGs9TWF0aC5mbG9vcihuL2JwZSk7XG4gIGlmIChrKSB7XG4gICAgZm9yIChpPXgubGVuZ3RoOyBpPj1rOyBpLS0pIC8vbGVmdCBzaGlmdCB4IGJ5IGsgZWxlbWVudHNcbiAgICAgIHhbaV09eFtpLWtdO1xuICAgIGZvciAoO2k+PTA7aS0tKVxuICAgICAgeFtpXT0wO1xuICAgIG4lPWJwZTtcbiAgfVxuICBpZiAoIW4pXG4gICAgcmV0dXJuO1xuICBmb3IgKGk9eC5sZW5ndGgtMTtpPjA7aS0tKSB7XG4gICAgeFtpXT1tYXNrICYgKCh4W2ldPDxuKSB8ICh4W2ktMV0+PihicGUtbikpKTtcbiAgfVxuICB4W2ldPW1hc2sgJiAoeFtpXTw8bik7XG59XG5cbi8vZG8geD14Km4gd2hlcmUgeCBpcyBhIGJpZ0ludCBhbmQgbiBpcyBhbiBpbnRlZ2VyLlxuLy94IG11c3QgYmUgbGFyZ2UgZW5vdWdoIHRvIGhvbGQgdGhlIHJlc3VsdC5cbmZ1bmN0aW9uIG11bHRJbnRfKHgsbikge1xuICB2YXIgaSxrLGMsYjtcbiAgaWYgKCFuKVxuICAgIHJldHVybjtcbiAgaz14Lmxlbmd0aDtcbiAgYz0wO1xuICBmb3IgKGk9MDtpPGs7aSsrKSB7XG4gICAgYys9eFtpXSpuO1xuICAgIGI9MDtcbiAgICBpZiAoYzwwKSB7XG4gICAgICBiPS0oYz4+YnBlKTtcbiAgICAgIGMrPWIqcmFkaXg7XG4gICAgfVxuICAgIHhbaV09YyAmIG1hc2s7XG4gICAgYz0oYz4+YnBlKS1iO1xuICB9XG59XG5cbi8vZG8geD1mbG9vcih4L24pIGZvciBiaWdJbnQgeCBhbmQgaW50ZWdlciBuLCBhbmQgcmV0dXJuIHRoZSByZW1haW5kZXJcbmZ1bmN0aW9uIGRpdkludF8oeCxuKSB7XG4gIHZhciBpLHI9MCxzO1xuICBmb3IgKGk9eC5sZW5ndGgtMTtpPj0wO2ktLSkge1xuICAgIHM9cipyYWRpeCt4W2ldO1xuICAgIHhbaV09TWF0aC5mbG9vcihzL24pO1xuICAgIHI9cyVuO1xuICB9XG4gIHJldHVybiByO1xufVxuXG4vL2RvIHRoZSBsaW5lYXIgY29tYmluYXRpb24geD1hKngrYip5IGZvciBiaWdJbnRzIHggYW5kIHksIGFuZCBpbnRlZ2VycyBhIGFuZCBiLlxuLy94IG11c3QgYmUgbGFyZ2UgZW5vdWdoIHRvIGhvbGQgdGhlIGFuc3dlci5cbmZ1bmN0aW9uIGxpbkNvbWJfKHgseSxhLGIpIHtcbiAgdmFyIGksYyxrLGtrO1xuICBrPXgubGVuZ3RoPHkubGVuZ3RoID8geC5sZW5ndGggOiB5Lmxlbmd0aDtcbiAga2s9eC5sZW5ndGg7XG4gIGZvciAoYz0wLGk9MDtpPGs7aSsrKSB7XG4gICAgYys9YSp4W2ldK2IqeVtpXTtcbiAgICB4W2ldPWMgJiBtYXNrO1xuICAgIGM+Pj1icGU7XG4gIH1cbiAgZm9yIChpPWs7aTxraztpKyspIHtcbiAgICBjKz1hKnhbaV07XG4gICAgeFtpXT1jICYgbWFzaztcbiAgICBjPj49YnBlO1xuICB9XG59XG5cbi8vZG8gdGhlIGxpbmVhciBjb21iaW5hdGlvbiB4PWEqeCtiKih5PDwoeXMqYnBlKSkgZm9yIGJpZ0ludHMgeCBhbmQgeSwgYW5kIGludGVnZXJzIGEsIGIgYW5kIHlzLlxuLy94IG11c3QgYmUgbGFyZ2UgZW5vdWdoIHRvIGhvbGQgdGhlIGFuc3dlci5cbmZ1bmN0aW9uIGxpbkNvbWJTaGlmdF8oeCx5LGIseXMpIHtcbiAgdmFyIGksYyxrLGtrO1xuICBrPXgubGVuZ3RoPHlzK3kubGVuZ3RoID8geC5sZW5ndGggOiB5cyt5Lmxlbmd0aDtcbiAga2s9eC5sZW5ndGg7XG4gIGZvciAoYz0wLGk9eXM7aTxrO2krKykge1xuICAgIGMrPXhbaV0rYip5W2kteXNdO1xuICAgIHhbaV09YyAmIG1hc2s7XG4gICAgYz4+PWJwZTtcbiAgfVxuICBmb3IgKGk9aztjICYmIGk8a2s7aSsrKSB7XG4gICAgYys9eFtpXTtcbiAgICB4W2ldPWMgJiBtYXNrO1xuICAgIGM+Pj1icGU7XG4gIH1cbn1cblxuLy9kbyB4PXgrKHk8PCh5cypicGUpKSBmb3IgYmlnSW50cyB4IGFuZCB5LCBhbmQgaW50ZWdlcnMgYSxiIGFuZCB5cy5cbi8veCBtdXN0IGJlIGxhcmdlIGVub3VnaCB0byBob2xkIHRoZSBhbnN3ZXIuXG5mdW5jdGlvbiBhZGRTaGlmdF8oeCx5LHlzKSB7XG4gIHZhciBpLGMsayxraztcbiAgaz14Lmxlbmd0aDx5cyt5Lmxlbmd0aCA/IHgubGVuZ3RoIDogeXMreS5sZW5ndGg7XG4gIGtrPXgubGVuZ3RoO1xuICBmb3IgKGM9MCxpPXlzO2k8aztpKyspIHtcbiAgICBjKz14W2ldK3lbaS15c107XG4gICAgeFtpXT1jICYgbWFzaztcbiAgICBjPj49YnBlO1xuICB9XG4gIGZvciAoaT1rO2MgJiYgaTxraztpKyspIHtcbiAgICBjKz14W2ldO1xuICAgIHhbaV09YyAmIG1hc2s7XG4gICAgYz4+PWJwZTtcbiAgfVxufVxuXG4vL2RvIHg9eC0oeTw8KHlzKmJwZSkpIGZvciBiaWdJbnRzIHggYW5kIHksIGFuZCBpbnRlZ2VycyBhLGIgYW5kIHlzLlxuLy94IG11c3QgYmUgbGFyZ2UgZW5vdWdoIHRvIGhvbGQgdGhlIGFuc3dlci5cbmZ1bmN0aW9uIHN1YlNoaWZ0Xyh4LHkseXMpIHtcbiAgdmFyIGksYyxrLGtrO1xuICBrPXgubGVuZ3RoPHlzK3kubGVuZ3RoID8geC5sZW5ndGggOiB5cyt5Lmxlbmd0aDtcbiAga2s9eC5sZW5ndGg7XG4gIGZvciAoYz0wLGk9eXM7aTxrO2krKykge1xuICAgIGMrPXhbaV0teVtpLXlzXTtcbiAgICB4W2ldPWMgJiBtYXNrO1xuICAgIGM+Pj1icGU7XG4gIH1cbiAgZm9yIChpPWs7YyAmJiBpPGtrO2krKykge1xuICAgIGMrPXhbaV07XG4gICAgeFtpXT1jICYgbWFzaztcbiAgICBjPj49YnBlO1xuICB9XG59XG5cbi8vZG8geD14LXkgZm9yIGJpZ0ludHMgeCBhbmQgeS5cbi8veCBtdXN0IGJlIGxhcmdlIGVub3VnaCB0byBob2xkIHRoZSBhbnN3ZXIuXG4vL25lZ2F0aXZlIGFuc3dlcnMgd2lsbCBiZSAycyBjb21wbGVtZW50XG5mdW5jdGlvbiBzdWJfKHgseSkge1xuICB2YXIgaSxjLGssa2s7XG4gIGs9eC5sZW5ndGg8eS5sZW5ndGggPyB4Lmxlbmd0aCA6IHkubGVuZ3RoO1xuICBmb3IgKGM9MCxpPTA7aTxrO2krKykge1xuICAgIGMrPXhbaV0teVtpXTtcbiAgICB4W2ldPWMgJiBtYXNrO1xuICAgIGM+Pj1icGU7XG4gIH1cbiAgZm9yIChpPWs7YyAmJiBpPHgubGVuZ3RoO2krKykge1xuICAgIGMrPXhbaV07XG4gICAgeFtpXT1jICYgbWFzaztcbiAgICBjPj49YnBlO1xuICB9XG59XG5cbi8vZG8geD14K3kgZm9yIGJpZ0ludHMgeCBhbmQgeS5cbi8veCBtdXN0IGJlIGxhcmdlIGVub3VnaCB0byBob2xkIHRoZSBhbnN3ZXIuXG5mdW5jdGlvbiBhZGRfKHgseSkge1xuICB2YXIgaSxjLGssa2s7XG4gIGs9eC5sZW5ndGg8eS5sZW5ndGggPyB4Lmxlbmd0aCA6IHkubGVuZ3RoO1xuICBmb3IgKGM9MCxpPTA7aTxrO2krKykge1xuICAgIGMrPXhbaV0reVtpXTtcbiAgICB4W2ldPWMgJiBtYXNrO1xuICAgIGM+Pj1icGU7XG4gIH1cbiAgZm9yIChpPWs7YyAmJiBpPHgubGVuZ3RoO2krKykge1xuICAgIGMrPXhbaV07XG4gICAgeFtpXT1jICYgbWFzaztcbiAgICBjPj49YnBlO1xuICB9XG59XG5cbi8vZG8geD14KnkgZm9yIGJpZ0ludHMgeCBhbmQgeS4gIFRoaXMgaXMgZmFzdGVyIHdoZW4geTx4LlxuZnVuY3Rpb24gbXVsdF8oeCx5KSB7XG4gIHZhciBpO1xuICBpZiAoc3MubGVuZ3RoIT0yKngubGVuZ3RoKVxuICAgIHNzPW5ldyBBcnJheSgyKngubGVuZ3RoKTtcbiAgY29weUludF8oc3MsMCk7XG4gIGZvciAoaT0wO2k8eS5sZW5ndGg7aSsrKVxuICAgIGlmICh5W2ldKVxuICAgICAgbGluQ29tYlNoaWZ0Xyhzcyx4LHlbaV0saSk7ICAgLy9zcz0xKnNzK3lbaV0qKHg8PChpKmJwZSkpXG4gIGNvcHlfKHgsc3MpO1xufVxuXG4vL2RvIHg9eCBtb2QgbiBmb3IgYmlnSW50cyB4IGFuZCBuLlxuZnVuY3Rpb24gbW9kXyh4LG4pIHtcbiAgaWYgKHM0Lmxlbmd0aCE9eC5sZW5ndGgpXG4gICAgczQ9ZHVwKHgpO1xuICBlbHNlXG4gICAgY29weV8oczQseCk7XG4gIGlmIChzNS5sZW5ndGghPXgubGVuZ3RoKVxuICAgIHM1PWR1cCh4KTtcbiAgZGl2aWRlXyhzNCxuLHM1LHgpOyAgLy94ID0gcmVtYWluZGVyIG9mIHM0IC8gblxufVxuXG4vL2RvIHg9eCp5IG1vZCBuIGZvciBiaWdJbnRzIHgseSxuLlxuLy9mb3IgZ3JlYXRlciBzcGVlZCwgbGV0IHk8eC5cbmZ1bmN0aW9uIG11bHRNb2RfKHgseSxuKSB7XG4gIHZhciBpO1xuICBpZiAoczAubGVuZ3RoIT0yKngubGVuZ3RoKVxuICAgIHMwPW5ldyBBcnJheSgyKngubGVuZ3RoKTtcbiAgY29weUludF8oczAsMCk7XG4gIGZvciAoaT0wO2k8eS5sZW5ndGg7aSsrKVxuICAgIGlmICh5W2ldKVxuICAgICAgbGluQ29tYlNoaWZ0XyhzMCx4LHlbaV0saSk7ICAgLy9zMD0xKnMwK3lbaV0qKHg8PChpKmJwZSkpXG4gIG1vZF8oczAsbik7XG4gIGNvcHlfKHgsczApO1xufVxuXG4vL2RvIHg9eCp4IG1vZCBuIGZvciBiaWdJbnRzIHgsbi5cbmZ1bmN0aW9uIHNxdWFyZU1vZF8oeCxuKSB7XG4gIHZhciBpLGosZCxjLGt4LGtuLGs7XG4gIGZvciAoa3g9eC5sZW5ndGg7IGt4PjAgJiYgIXhba3gtMV07IGt4LS0pOyAgLy9pZ25vcmUgbGVhZGluZyB6ZXJvcyBpbiB4XG4gIGs9a3g+bi5sZW5ndGggPyAyKmt4IDogMipuLmxlbmd0aDsgLy9rPSMgZWxlbWVudHMgaW4gdGhlIHByb2R1Y3QsIHdoaWNoIGlzIHR3aWNlIHRoZSBlbGVtZW50cyBpbiB0aGUgbGFyZ2VyIG9mIHggYW5kIG5cbiAgaWYgKHMwLmxlbmd0aCE9aylcbiAgICBzMD1uZXcgQXJyYXkoayk7XG4gIGNvcHlJbnRfKHMwLDApO1xuICBmb3IgKGk9MDtpPGt4O2krKykge1xuICAgIGM9czBbMippXSt4W2ldKnhbaV07XG4gICAgczBbMippXT1jICYgbWFzaztcbiAgICBjPj49YnBlO1xuICAgIGZvciAoaj1pKzE7ajxreDtqKyspIHtcbiAgICAgIGM9czBbaStqXSsyKnhbaV0qeFtqXStjO1xuICAgICAgczBbaStqXT0oYyAmIG1hc2spO1xuICAgICAgYz4+PWJwZTtcbiAgICB9XG4gICAgczBbaStreF09YztcbiAgfVxuICBtb2RfKHMwLG4pO1xuICBjb3B5Xyh4LHMwKTtcbn1cblxuLy9yZXR1cm4geCB3aXRoIGV4YWN0bHkgayBsZWFkaW5nIHplcm8gZWxlbWVudHNcbmZ1bmN0aW9uIHRyaW0oeCxrKSB7XG4gIHZhciBpLHk7XG4gIGZvciAoaT14Lmxlbmd0aDsgaT4wICYmICF4W2ktMV07IGktLSk7XG4gIHk9bmV3IEFycmF5KGkrayk7XG4gIGNvcHlfKHkseCk7XG4gIHJldHVybiB5O1xufVxuXG4vL2RvIHg9eCoqeSBtb2Qgbiwgd2hlcmUgeCx5LG4gYXJlIGJpZ0ludHMgYW5kICoqIGlzIGV4cG9uZW50aWF0aW9uLiAgMCoqMD0xLlxuLy90aGlzIGlzIGZhc3RlciB3aGVuIG4gaXMgb2RkLiAgeCB1c3VhbGx5IG5lZWRzIHRvIGhhdmUgYXMgbWFueSBlbGVtZW50cyBhcyBuLlxuZnVuY3Rpb24gcG93TW9kXyh4LHksbikge1xuICB2YXIgazEsazIsa24sbnA7XG4gIGlmKHM3Lmxlbmd0aCE9bi5sZW5ndGgpXG4gICAgczc9ZHVwKG4pO1xuXG4gIC8vZm9yIGV2ZW4gbW9kdWx1cywgdXNlIGEgc2ltcGxlIHNxdWFyZS1hbmQtbXVsdGlwbHkgYWxnb3JpdGhtLFxuICAvL3JhdGhlciB0aGFuIHVzaW5nIHRoZSBtb3JlIGNvbXBsZXggTW9udGdvbWVyeSBhbGdvcml0aG0uXG4gIGlmICgoblswXSYxKT09MCkge1xuICAgIGNvcHlfKHM3LHgpO1xuICAgIGNvcHlJbnRfKHgsMSk7XG4gICAgd2hpbGUoIWVxdWFsc0ludCh5LDApKSB7XG4gICAgICBpZiAoeVswXSYxKVxuICAgICAgICBtdWx0TW9kXyh4LHM3LG4pO1xuICAgICAgZGl2SW50Xyh5LDIpO1xuICAgICAgc3F1YXJlTW9kXyhzNyxuKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy9jYWxjdWxhdGUgbnAgZnJvbSBuIGZvciB0aGUgTW9udGdvbWVyeSBtdWx0aXBsaWNhdGlvbnNcbiAgY29weUludF8oczcsMCk7XG4gIGZvciAoa249bi5sZW5ndGg7a24+MCAmJiAhbltrbi0xXTtrbi0tKTtcbiAgbnA9cmFkaXgtaW52ZXJzZU1vZEludChtb2RJbnQobixyYWRpeCkscmFkaXgpO1xuICBzN1trbl09MTtcbiAgbXVsdE1vZF8oeCAsczcsbik7ICAgLy8geCA9IHggKiAyKiooa24qYnApIG1vZCBuXG5cbiAgaWYgKHMzLmxlbmd0aCE9eC5sZW5ndGgpXG4gICAgczM9ZHVwKHgpO1xuICBlbHNlXG4gICAgY29weV8oczMseCk7XG5cbiAgZm9yIChrMT15Lmxlbmd0aC0xO2sxPjAgJiAheVtrMV07IGsxLS0pOyAgLy9rMT1maXJzdCBub256ZXJvIGVsZW1lbnQgb2YgeVxuICBpZiAoeVtrMV09PTApIHsgIC8vYW55dGhpbmcgdG8gdGhlIDB0aCBwb3dlciBpcyAxXG4gICAgY29weUludF8oeCwxKTtcbiAgICByZXR1cm47XG4gIH1cbiAgZm9yIChrMj0xPDwoYnBlLTEpO2syICYmICEoeVtrMV0gJiBrMik7IGsyPj49MSk7ICAvL2syPXBvc2l0aW9uIG9mIGZpcnN0IDEgYml0IGluIHlbazFdXG4gIGZvciAoOzspIHtcbiAgICBpZiAoIShrMj4+PTEpKSB7ICAvL2xvb2sgYXQgbmV4dCBiaXQgb2YgeVxuICAgICAgazEtLTtcbiAgICAgIGlmIChrMTwwKSB7XG4gICAgICAgIG1vbnRfKHgsb25lLG4sbnApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBrMj0xPDwoYnBlLTEpO1xuICAgIH1cbiAgICBtb250Xyh4LHgsbixucCk7XG5cbiAgICBpZiAoazIgJiB5W2sxXSkgLy9pZiBuZXh0IGJpdCBpcyBhIDFcbiAgICAgIG1vbnRfKHgsczMsbixucCk7XG4gIH1cbn1cblxuXG4vL2RvIHg9eCp5KlJpIG1vZCBuIGZvciBiaWdJbnRzIHgseSxuLFxuLy8gIHdoZXJlIFJpID0gMioqKC1rbipicGUpIG1vZCBuLCBhbmQga24gaXMgdGhlXG4vLyAgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoZSBuIGFycmF5LCBub3Rcbi8vICBjb3VudGluZyBsZWFkaW5nIHplcm9zLlxuLy94IGFycmF5IG11c3QgaGF2ZSBhdCBsZWFzdCBhcyBtYW55IGVsZW1udHMgYXMgdGhlIG4gYXJyYXlcbi8vSXQncyBPSyBpZiB4IGFuZCB5IGFyZSB0aGUgc2FtZSB2YXJpYWJsZS5cbi8vbXVzdCBoYXZlOlxuLy8gIHgseSA8IG5cbi8vICBuIGlzIG9kZFxuLy8gIG5wID0gLShuXigtMSkpIG1vZCByYWRpeFxuZnVuY3Rpb24gbW9udF8oeCx5LG4sbnApIHtcbiAgdmFyIGksaixjLHVpLHQsa3M7XG4gIHZhciBrbj1uLmxlbmd0aDtcbiAgdmFyIGt5PXkubGVuZ3RoO1xuXG4gIGlmIChzYS5sZW5ndGghPWtuKVxuICAgIHNhPW5ldyBBcnJheShrbik7XG5cbiAgY29weUludF8oc2EsMCk7XG5cbiAgZm9yICg7a24+MCAmJiBuW2tuLTFdPT0wO2tuLS0pOyAvL2lnbm9yZSBsZWFkaW5nIHplcm9zIG9mIG5cbiAgZm9yICg7a3k+MCAmJiB5W2t5LTFdPT0wO2t5LS0pOyAvL2lnbm9yZSBsZWFkaW5nIHplcm9zIG9mIHlcbiAga3M9c2EubGVuZ3RoLTE7IC8vc2Egd2lsbCBuZXZlciBoYXZlIG1vcmUgdGhhbiB0aGlzIG1hbnkgbm9uemVybyBlbGVtZW50cy5cblxuICAvL3RoZSBmb2xsb3dpbmcgbG9vcCBjb25zdW1lcyA5NSUgb2YgdGhlIHJ1bnRpbWUgZm9yIHJhbmRUcnVlUHJpbWVfKCkgYW5kIHBvd01vZF8oKSBmb3IgbGFyZ2UgbnVtYmVyc1xuICBmb3IgKGk9MDsgaTxrbjsgaSsrKSB7XG4gICAgdD1zYVswXSt4W2ldKnlbMF07XG4gICAgdWk9KCh0ICYgbWFzaykgKiBucCkgJiBtYXNrOyAgLy90aGUgaW5uZXIgXCImIG1hc2tcIiB3YXMgbmVlZGVkIG9uIFNhZmFyaSAoYnV0IG5vdCBNU0lFKSBhdCBvbmUgdGltZVxuICAgIGM9KHQrdWkqblswXSkgPj4gYnBlO1xuICAgIHQ9eFtpXTtcblxuICAgIC8vZG8gc2E9KHNhK3hbaV0qeSt1aSpuKS9iICAgd2hlcmUgYj0yKipicGUuICBMb29wIGlzIHVucm9sbGVkIDUtZm9sZCBmb3Igc3BlZWRcbiAgICBqPTE7XG4gICAgZm9yICg7ajxreS00OykgeyBjKz1zYVtqXSt1aSpuW2pdK3QqeVtqXTsgICBzYVtqLTFdPWMgJiBtYXNrOyAgIGM+Pj1icGU7ICAgaisrO1xuICAgICAgICAgICAgICAgICAgICAgYys9c2Fbal0rdWkqbltqXSt0Knlbal07ICAgc2Fbai0xXT1jICYgbWFzazsgICBjPj49YnBlOyAgIGorKztcbiAgICAgICAgICAgICAgICAgICAgIGMrPXNhW2pdK3VpKm5bal0rdCp5W2pdOyAgIHNhW2otMV09YyAmIG1hc2s7ICAgYz4+PWJwZTsgICBqKys7XG4gICAgICAgICAgICAgICAgICAgICBjKz1zYVtqXSt1aSpuW2pdK3QqeVtqXTsgICBzYVtqLTFdPWMgJiBtYXNrOyAgIGM+Pj1icGU7ICAgaisrO1xuICAgICAgICAgICAgICAgICAgICAgYys9c2Fbal0rdWkqbltqXSt0Knlbal07ICAgc2Fbai0xXT1jICYgbWFzazsgICBjPj49YnBlOyAgIGorKzsgfVxuICAgIGZvciAoO2o8a3k7KSAgIHsgYys9c2Fbal0rdWkqbltqXSt0Knlbal07ICAgc2Fbai0xXT1jICYgbWFzazsgICBjPj49YnBlOyAgIGorKzsgfVxuICAgIGZvciAoO2o8a24tNDspIHsgYys9c2Fbal0rdWkqbltqXTsgICAgICAgICAgc2Fbai0xXT1jICYgbWFzazsgICBjPj49YnBlOyAgIGorKztcbiAgICAgICAgICAgICAgICAgICAgIGMrPXNhW2pdK3VpKm5bal07ICAgICAgICAgIHNhW2otMV09YyAmIG1hc2s7ICAgYz4+PWJwZTsgICBqKys7XG4gICAgICAgICAgICAgICAgICAgICBjKz1zYVtqXSt1aSpuW2pdOyAgICAgICAgICBzYVtqLTFdPWMgJiBtYXNrOyAgIGM+Pj1icGU7ICAgaisrO1xuICAgICAgICAgICAgICAgICAgICAgYys9c2Fbal0rdWkqbltqXTsgICAgICAgICAgc2Fbai0xXT1jICYgbWFzazsgICBjPj49YnBlOyAgIGorKztcbiAgICAgICAgICAgICAgICAgICAgIGMrPXNhW2pdK3VpKm5bal07ICAgICAgICAgIHNhW2otMV09YyAmIG1hc2s7ICAgYz4+PWJwZTsgICBqKys7IH1cbiAgICBmb3IgKDtqPGtuOykgICB7IGMrPXNhW2pdK3VpKm5bal07ICAgICAgICAgIHNhW2otMV09YyAmIG1hc2s7ICAgYz4+PWJwZTsgICBqKys7IH1cbiAgICBmb3IgKDtqPGtzOykgICB7IGMrPXNhW2pdOyAgICAgICAgICAgICAgICAgIHNhW2otMV09YyAmIG1hc2s7ICAgYz4+PWJwZTsgICBqKys7IH1cbiAgICBzYVtqLTFdPWMgJiBtYXNrO1xuICB9XG5cbiAgaWYgKCFncmVhdGVyKG4sc2EpKVxuICAgIHN1Yl8oc2Esbik7XG4gIGNvcHlfKHgsc2EpO1xufVxuXG5pZiAodHlwZW9mIG1vZHVsZSA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0bW9kdWxlID0ge307XG59XG5CaWdJbnQgPSBtb2R1bGUuZXhwb3J0cyA9IHtcblx0J2FkZCc6IGFkZCwgJ2FkZEludCc6IGFkZEludCwgJ2JpZ0ludDJzdHInOiBiaWdJbnQyc3RyLCAnYml0U2l6ZSc6IGJpdFNpemUsXG5cdCdkdXAnOiBkdXAsICdlcXVhbHMnOiBlcXVhbHMsICdlcXVhbHNJbnQnOiBlcXVhbHNJbnQsICdleHBhbmQnOiBleHBhbmQsXG5cdCdmaW5kUHJpbWVzJzogZmluZFByaW1lcywgJ0dDRCc6IEdDRCwgJ2dyZWF0ZXInOiBncmVhdGVyLFxuXHQnZ3JlYXRlclNoaWZ0JzogZ3JlYXRlclNoaWZ0LCAnaW50MmJpZ0ludCc6IGludDJiaWdJbnQsXG5cdCdpbnZlcnNlTW9kJzogaW52ZXJzZU1vZCwgJ2ludmVyc2VNb2RJbnQnOiBpbnZlcnNlTW9kSW50LCAnaXNaZXJvJzogaXNaZXJvLFxuXHQnbWlsbGVyUmFiaW4nOiBtaWxsZXJSYWJpbiwgJ21pbGxlclJhYmluSW50JzogbWlsbGVyUmFiaW5JbnQsICdtb2QnOiBtb2QsXG5cdCdtb2RJbnQnOiBtb2RJbnQsICdtdWx0JzogbXVsdCwgJ211bHRNb2QnOiBtdWx0TW9kLCAnbmVnYXRpdmUnOiBuZWdhdGl2ZSxcblx0J3Bvd01vZCc6IHBvd01vZCwgJ3JhbmRCaWdJbnQnOiByYW5kQmlnSW50LCAncmFuZFRydWVQcmltZSc6IHJhbmRUcnVlUHJpbWUsXG5cdCdyYW5kUHJvYlByaW1lJzogcmFuZFByb2JQcmltZSwgJ3N0cjJiaWdJbnQnOiBzdHIyYmlnSW50LCAnc3ViJzogc3ViLFxuXHQndHJpbSc6IHRyaW0sICdhZGRJbnRfJzogYWRkSW50XywgJ2FkZF8nOiBhZGRfLCAnY29weV8nOiBjb3B5Xyxcblx0J2NvcHlJbnRfJzogY29weUludF8sICdHQ0RfJzogR0NEXywgJ2ludmVyc2VNb2RfJzogaW52ZXJzZU1vZF8sICdtb2RfJzogbW9kXyxcblx0J211bHRfJzogbXVsdF8sICdtdWx0TW9kXyc6IG11bHRNb2RfLCAncG93TW9kXyc6IHBvd01vZF8sXG5cdCdyYW5kQmlnSW50Xyc6IHJhbmRCaWdJbnRfLCAncmFuZFRydWVQcmltZV8nOiByYW5kVHJ1ZVByaW1lXywgJ3N1Yl8nOiBzdWJfLFxuXHQnYWRkU2hpZnRfJzogYWRkU2hpZnRfLCAnY2FycnlfJzogY2FycnlfLCAnZGl2aWRlXyc6IGRpdmlkZV8sXG5cdCdkaXZJbnRfJzogZGl2SW50XywgJ2VHQ0RfJzogZUdDRF8sICdoYWx2ZV8nOiBoYWx2ZV8sICdsZWZ0U2hpZnRfJzogbGVmdFNoaWZ0Xyxcblx0J2xpbkNvbWJfJzogbGluQ29tYl8sICdsaW5Db21iU2hpZnRfJzogbGluQ29tYlNoaWZ0XywgJ21vbnRfJzogbW9udF8sXG5cdCdtdWx0SW50Xyc6IG11bHRJbnRfLCAncmlnaHRTaGlmdF8nOiByaWdodFNoaWZ0XywgJ3NxdWFyZU1vZF8nOiBzcXVhcmVNb2RfLFxuXHQnc3ViU2hpZnRfJzogc3ViU2hpZnRfLCAncG93TW9kXyc6IHBvd01vZF8sICdlR0NEXyc6IGVHQ0RfLFxuXHQnaW52ZXJzZU1vZF8nOiBpbnZlcnNlTW9kXywgJ0dDRF8nOiBHQ0RfLCAnbW9udF8nOiBtb250XywgJ2RpdmlkZV8nOiBkaXZpZGVfLFxuXHQnc3F1YXJlTW9kXyc6IHNxdWFyZU1vZF8sICdyYW5kVHJ1ZVByaW1lXyc6IHJhbmRUcnVlUHJpbWVfLFxuXHQnbWlsbGVyUmFiaW4nOiBtaWxsZXJSYWJpblxufTtcblxufSkoKTtcbiIsIi8qKlxuICogbG9kYXNoIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9ycyA8aHR0cHM6Ly9qcXVlcnkub3JnLz5cbiAqIFJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqL1xuXG4vKiogVXNlZCBhcyB0aGUgc2l6ZSB0byBlbmFibGUgbGFyZ2UgYXJyYXkgb3B0aW1pemF0aW9ucy4gKi9cbnZhciBMQVJHRV9BUlJBWV9TSVpFID0gMjAwO1xuXG4vKiogVXNlZCB0byBzdGFuZC1pbiBmb3IgYHVuZGVmaW5lZGAgaGFzaCB2YWx1ZXMuICovXG52YXIgSEFTSF9VTkRFRklORUQgPSAnX19sb2Rhc2hfaGFzaF91bmRlZmluZWRfXyc7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nLFxuICAgIGFycmF5VGFnID0gJ1tvYmplY3QgQXJyYXldJyxcbiAgICBib29sVGFnID0gJ1tvYmplY3QgQm9vbGVhbl0nLFxuICAgIGRhdGVUYWcgPSAnW29iamVjdCBEYXRlXScsXG4gICAgZXJyb3JUYWcgPSAnW29iamVjdCBFcnJvcl0nLFxuICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIGdlblRhZyA9ICdbb2JqZWN0IEdlbmVyYXRvckZ1bmN0aW9uXScsXG4gICAgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgbnVtYmVyVGFnID0gJ1tvYmplY3QgTnVtYmVyXScsXG4gICAgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XScsXG4gICAgcHJvbWlzZVRhZyA9ICdbb2JqZWN0IFByb21pc2VdJyxcbiAgICByZWdleHBUYWcgPSAnW29iamVjdCBSZWdFeHBdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJyxcbiAgICBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJyxcbiAgICB3ZWFrTWFwVGFnID0gJ1tvYmplY3QgV2Vha01hcF0nO1xuXG52YXIgYXJyYXlCdWZmZXJUYWcgPSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nLFxuICAgIGRhdGFWaWV3VGFnID0gJ1tvYmplY3QgRGF0YVZpZXddJyxcbiAgICBmbG9hdDMyVGFnID0gJ1tvYmplY3QgRmxvYXQzMkFycmF5XScsXG4gICAgZmxvYXQ2NFRhZyA9ICdbb2JqZWN0IEZsb2F0NjRBcnJheV0nLFxuICAgIGludDhUYWcgPSAnW29iamVjdCBJbnQ4QXJyYXldJyxcbiAgICBpbnQxNlRhZyA9ICdbb2JqZWN0IEludDE2QXJyYXldJyxcbiAgICBpbnQzMlRhZyA9ICdbb2JqZWN0IEludDMyQXJyYXldJyxcbiAgICB1aW50OFRhZyA9ICdbb2JqZWN0IFVpbnQ4QXJyYXldJyxcbiAgICB1aW50OENsYW1wZWRUYWcgPSAnW29iamVjdCBVaW50OENsYW1wZWRBcnJheV0nLFxuICAgIHVpbnQxNlRhZyA9ICdbb2JqZWN0IFVpbnQxNkFycmF5XScsXG4gICAgdWludDMyVGFnID0gJ1tvYmplY3QgVWludDMyQXJyYXldJztcblxuLyoqXG4gKiBVc2VkIHRvIG1hdGNoIGBSZWdFeHBgXG4gKiBbc3ludGF4IGNoYXJhY3RlcnNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXBhdHRlcm5zKS5cbiAqL1xudmFyIHJlUmVnRXhwQ2hhciA9IC9bXFxcXF4kLiorPygpW1xcXXt9fF0vZztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGAgZmxhZ3MgZnJvbSB0aGVpciBjb2VyY2VkIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVGbGFncyA9IC9cXHcqJC87XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBob3N0IGNvbnN0cnVjdG9ycyAoU2FmYXJpKS4gKi9cbnZhciByZUlzSG9zdEN0b3IgPSAvXlxcW29iamVjdCAuKz9Db25zdHJ1Y3RvclxcXSQvO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgdW5zaWduZWQgaW50ZWdlciB2YWx1ZXMuICovXG52YXIgcmVJc1VpbnQgPSAvXig/OjB8WzEtOV1cXGQqKSQvO1xuXG4vKiogVXNlZCB0byBpZGVudGlmeSBgdG9TdHJpbmdUYWdgIHZhbHVlcyBvZiB0eXBlZCBhcnJheXMuICovXG52YXIgdHlwZWRBcnJheVRhZ3MgPSB7fTtcbnR5cGVkQXJyYXlUYWdzW2Zsb2F0MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbZmxvYXQ2NFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50OFRhZ10gPSB0eXBlZEFycmF5VGFnc1tpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDhUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQ4Q2xhbXBlZFRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQzMlRhZ10gPSB0cnVlO1xudHlwZWRBcnJheVRhZ3NbYXJnc1RhZ10gPSB0eXBlZEFycmF5VGFnc1thcnJheVRhZ10gPVxudHlwZWRBcnJheVRhZ3NbYXJyYXlCdWZmZXJUYWddID0gdHlwZWRBcnJheVRhZ3NbYm9vbFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZGF0YVZpZXdUYWddID0gdHlwZWRBcnJheVRhZ3NbZGF0ZVRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZXJyb3JUYWddID0gdHlwZWRBcnJheVRhZ3NbZnVuY1RhZ10gPVxudHlwZWRBcnJheVRhZ3NbbWFwVGFnXSA9IHR5cGVkQXJyYXlUYWdzW251bWJlclRhZ10gPVxudHlwZWRBcnJheVRhZ3Nbb2JqZWN0VGFnXSA9IHR5cGVkQXJyYXlUYWdzW3JlZ2V4cFRhZ10gPVxudHlwZWRBcnJheVRhZ3Nbc2V0VGFnXSA9IHR5cGVkQXJyYXlUYWdzW3N0cmluZ1RhZ10gPVxudHlwZWRBcnJheVRhZ3Nbd2Vha01hcFRhZ10gPSBmYWxzZTtcblxuLyoqIFVzZWQgdG8gaWRlbnRpZnkgYHRvU3RyaW5nVGFnYCB2YWx1ZXMgc3VwcG9ydGVkIGJ5IGBfLmNsb25lYC4gKi9cbnZhciBjbG9uZWFibGVUYWdzID0ge307XG5jbG9uZWFibGVUYWdzW2FyZ3NUYWddID0gY2xvbmVhYmxlVGFnc1thcnJheVRhZ10gPVxuY2xvbmVhYmxlVGFnc1thcnJheUJ1ZmZlclRhZ10gPSBjbG9uZWFibGVUYWdzW2RhdGFWaWV3VGFnXSA9XG5jbG9uZWFibGVUYWdzW2Jvb2xUYWddID0gY2xvbmVhYmxlVGFnc1tkYXRlVGFnXSA9XG5jbG9uZWFibGVUYWdzW2Zsb2F0MzJUYWddID0gY2xvbmVhYmxlVGFnc1tmbG9hdDY0VGFnXSA9XG5jbG9uZWFibGVUYWdzW2ludDhUYWddID0gY2xvbmVhYmxlVGFnc1tpbnQxNlRhZ10gPVxuY2xvbmVhYmxlVGFnc1tpbnQzMlRhZ10gPSBjbG9uZWFibGVUYWdzW21hcFRhZ10gPVxuY2xvbmVhYmxlVGFnc1tudW1iZXJUYWddID0gY2xvbmVhYmxlVGFnc1tvYmplY3RUYWddID1cbmNsb25lYWJsZVRhZ3NbcmVnZXhwVGFnXSA9IGNsb25lYWJsZVRhZ3Nbc2V0VGFnXSA9XG5jbG9uZWFibGVUYWdzW3N0cmluZ1RhZ10gPSBjbG9uZWFibGVUYWdzW3N5bWJvbFRhZ10gPVxuY2xvbmVhYmxlVGFnc1t1aW50OFRhZ10gPSBjbG9uZWFibGVUYWdzW3VpbnQ4Q2xhbXBlZFRhZ10gPVxuY2xvbmVhYmxlVGFnc1t1aW50MTZUYWddID0gY2xvbmVhYmxlVGFnc1t1aW50MzJUYWddID0gdHJ1ZTtcbmNsb25lYWJsZVRhZ3NbZXJyb3JUYWddID0gY2xvbmVhYmxlVGFnc1tmdW5jVGFnXSA9XG5jbG9uZWFibGVUYWdzW3dlYWtNYXBUYWddID0gZmFsc2U7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBleHBvcnRzYC4gKi9cbnZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHMgJiYgIWV4cG9ydHMubm9kZVR5cGUgJiYgZXhwb3J0cztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBtb2R1bGVgLiAqL1xudmFyIGZyZWVNb2R1bGUgPSBmcmVlRXhwb3J0cyAmJiB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJiAhbW9kdWxlLm5vZGVUeXBlICYmIG1vZHVsZTtcblxuLyoqIERldGVjdCB0aGUgcG9wdWxhciBDb21tb25KUyBleHRlbnNpb24gYG1vZHVsZS5leHBvcnRzYC4gKi9cbnZhciBtb2R1bGVFeHBvcnRzID0gZnJlZU1vZHVsZSAmJiBmcmVlTW9kdWxlLmV4cG9ydHMgPT09IGZyZWVFeHBvcnRzO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHByb2Nlc3NgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlUHJvY2VzcyA9IG1vZHVsZUV4cG9ydHMgJiYgZnJlZUdsb2JhbC5wcm9jZXNzO1xuXG4vKiogVXNlZCB0byBhY2Nlc3MgZmFzdGVyIE5vZGUuanMgaGVscGVycy4gKi9cbnZhciBub2RlVXRpbCA9IChmdW5jdGlvbigpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZnJlZVByb2Nlc3MgJiYgZnJlZVByb2Nlc3MuYmluZGluZygndXRpbCcpO1xuICB9IGNhdGNoIChlKSB7fVxufSgpKTtcblxuLyogTm9kZS5qcyBoZWxwZXIgcmVmZXJlbmNlcy4gKi9cbnZhciBub2RlSXNUeXBlZEFycmF5ID0gbm9kZVV0aWwgJiYgbm9kZVV0aWwuaXNUeXBlZEFycmF5O1xuXG4vKipcbiAqIEFkZHMgdGhlIGtleS12YWx1ZSBgcGFpcmAgdG8gYG1hcGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge0FycmF5fSBwYWlyIFRoZSBrZXktdmFsdWUgcGFpciB0byBhZGQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBtYXBgLlxuICovXG5mdW5jdGlvbiBhZGRNYXBFbnRyeShtYXAsIHBhaXIpIHtcbiAgLy8gRG9uJ3QgcmV0dXJuIGBtYXAuc2V0YCBiZWNhdXNlIGl0J3Mgbm90IGNoYWluYWJsZSBpbiBJRSAxMS5cbiAgbWFwLnNldChwYWlyWzBdLCBwYWlyWzFdKTtcbiAgcmV0dXJuIG1hcDtcbn1cblxuLyoqXG4gKiBBZGRzIGB2YWx1ZWAgdG8gYHNldGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzZXQgVGhlIHNldCB0byBtb2RpZnkuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBhZGQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBzZXRgLlxuICovXG5mdW5jdGlvbiBhZGRTZXRFbnRyeShzZXQsIHZhbHVlKSB7XG4gIC8vIERvbid0IHJldHVybiBgc2V0LmFkZGAgYmVjYXVzZSBpdCdzIG5vdCBjaGFpbmFibGUgaW4gSUUgMTEuXG4gIHNldC5hZGQodmFsdWUpO1xuICByZXR1cm4gc2V0O1xufVxuXG4vKipcbiAqIEEgZmFzdGVyIGFsdGVybmF0aXZlIHRvIGBGdW5jdGlvbiNhcHBseWAsIHRoaXMgZnVuY3Rpb24gaW52b2tlcyBgZnVuY2BcbiAqIHdpdGggdGhlIGB0aGlzYCBiaW5kaW5nIG9mIGB0aGlzQXJnYCBhbmQgdGhlIGFyZ3VtZW50cyBvZiBgYXJnc2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGludm9rZS5cbiAqIEBwYXJhbSB7Kn0gdGhpc0FyZyBUaGUgYHRoaXNgIGJpbmRpbmcgb2YgYGZ1bmNgLlxuICogQHBhcmFtIHtBcnJheX0gYXJncyBUaGUgYXJndW1lbnRzIHRvIGludm9rZSBgZnVuY2Agd2l0aC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSByZXN1bHQgb2YgYGZ1bmNgLlxuICovXG5mdW5jdGlvbiBhcHBseShmdW5jLCB0aGlzQXJnLCBhcmdzKSB7XG4gIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICBjYXNlIDA6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZyk7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFyZ3NbMF0pO1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYXJnc1swXSwgYXJnc1sxXSwgYXJnc1syXSk7XG4gIH1cbiAgcmV0dXJuIGZ1bmMuYXBwbHkodGhpc0FyZywgYXJncyk7XG59XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLmZvckVhY2hgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvclxuICogaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBhcnJheUVhY2goYXJyYXksIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKGl0ZXJhdGVlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KSA9PT0gZmFsc2UpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbi8qKlxuICogQXBwZW5kcyB0aGUgZWxlbWVudHMgb2YgYHZhbHVlc2AgdG8gYGFycmF5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlcyBUaGUgdmFsdWVzIHRvIGFwcGVuZC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBhcnJheVB1c2goYXJyYXksIHZhbHVlcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHZhbHVlcy5sZW5ndGgsXG4gICAgICBvZmZzZXQgPSBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBhcnJheVtvZmZzZXQgKyBpbmRleF0gPSB2YWx1ZXNbaW5kZXhdO1xuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8ucmVkdWNlYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3JcbiAqIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0geyp9IFthY2N1bXVsYXRvcl0gVGhlIGluaXRpYWwgdmFsdWUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpbml0QWNjdW1dIFNwZWNpZnkgdXNpbmcgdGhlIGZpcnN0IGVsZW1lbnQgb2YgYGFycmF5YCBhc1xuICogIHRoZSBpbml0aWFsIHZhbHVlLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGFjY3VtdWxhdGVkIHZhbHVlLlxuICovXG5mdW5jdGlvbiBhcnJheVJlZHVjZShhcnJheSwgaXRlcmF0ZWUsIGFjY3VtdWxhdG9yLCBpbml0QWNjdW0pIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDA7XG5cbiAgaWYgKGluaXRBY2N1bSAmJiBsZW5ndGgpIHtcbiAgICBhY2N1bXVsYXRvciA9IGFycmF5WysraW5kZXhdO1xuICB9XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgYWNjdW11bGF0b3IgPSBpdGVyYXRlZShhY2N1bXVsYXRvciwgYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpO1xuICB9XG4gIHJldHVybiBhY2N1bXVsYXRvcjtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy50aW1lc2Agd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzXG4gKiBvciBtYXggYXJyYXkgbGVuZ3RoIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtudW1iZXJ9IG4gVGhlIG51bWJlciBvZiB0aW1lcyB0byBpbnZva2UgYGl0ZXJhdGVlYC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHJlc3VsdHMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUaW1lcyhuLCBpdGVyYXRlZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KG4pO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbikge1xuICAgIHJlc3VsdFtpbmRleF0gPSBpdGVyYXRlZShpbmRleCk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy51bmFyeWAgd2l0aG91dCBzdXBwb3J0IGZvciBzdG9yaW5nIG1ldGFkYXRhLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjYXAgYXJndW1lbnRzIGZvci5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGNhcHBlZCBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVVuYXJ5KGZ1bmMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIGZ1bmModmFsdWUpO1xuICB9O1xufVxuXG4vKipcbiAqIEdldHMgdGhlIHZhbHVlIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHByb3BlcnR5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBnZXRWYWx1ZShvYmplY3QsIGtleSkge1xuICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIGhvc3Qgb2JqZWN0IGluIElFIDwgOS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGhvc3Qgb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSG9zdE9iamVjdCh2YWx1ZSkge1xuICAvLyBNYW55IGhvc3Qgb2JqZWN0cyBhcmUgYE9iamVjdGAgb2JqZWN0cyB0aGF0IGNhbiBjb2VyY2UgdG8gc3RyaW5nc1xuICAvLyBkZXNwaXRlIGhhdmluZyBpbXByb3Blcmx5IGRlZmluZWQgYHRvU3RyaW5nYCBtZXRob2RzLlxuICB2YXIgcmVzdWx0ID0gZmFsc2U7XG4gIGlmICh2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZS50b1N0cmluZyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9ICEhKHZhbHVlICsgJycpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgbWFwYCB0byBpdHMga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gbWFwIFRoZSBtYXAgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUga2V5LXZhbHVlIHBhaXJzLlxuICovXG5mdW5jdGlvbiBtYXBUb0FycmF5KG1hcCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KG1hcC5zaXplKTtcblxuICBtYXAuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgcmVzdWx0WysraW5kZXhdID0gW2tleSwgdmFsdWVdO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgdW5hcnkgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGBmdW5jYCB3aXRoIGl0cyBhcmd1bWVudCB0cmFuc2Zvcm1lZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHRyYW5zZm9ybSBUaGUgYXJndW1lbnQgdHJhbnNmb3JtLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG92ZXJBcmcoZnVuYywgdHJhbnNmb3JtKSB7XG4gIHJldHVybiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gZnVuYyh0cmFuc2Zvcm0oYXJnKSk7XG4gIH07XG59XG5cbi8qKlxuICogQ29udmVydHMgYHNldGAgdG8gYW4gYXJyYXkgb2YgaXRzIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNldCBUaGUgc2V0IHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIHZhbHVlcy5cbiAqL1xuZnVuY3Rpb24gc2V0VG9BcnJheShzZXQpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBBcnJheShzZXQuc2l6ZSk7XG5cbiAgc2V0LmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXN1bHRbKytpbmRleF0gPSB2YWx1ZTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBhcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlLFxuICAgIGZ1bmNQcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZSxcbiAgICBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBvdmVycmVhY2hpbmcgY29yZS1qcyBzaGltcy4gKi9cbnZhciBjb3JlSnNEYXRhID0gcm9vdFsnX19jb3JlLWpzX3NoYXJlZF9fJ107XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBtZXRob2RzIG1hc3F1ZXJhZGluZyBhcyBuYXRpdmUuICovXG52YXIgbWFza1NyY0tleSA9IChmdW5jdGlvbigpIHtcbiAgdmFyIHVpZCA9IC9bXi5dKyQvLmV4ZWMoY29yZUpzRGF0YSAmJiBjb3JlSnNEYXRhLmtleXMgJiYgY29yZUpzRGF0YS5rZXlzLklFX1BST1RPIHx8ICcnKTtcbiAgcmV0dXJuIHVpZCA/ICgnU3ltYm9sKHNyYylfMS4nICsgdWlkKSA6ICcnO1xufSgpKTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIFVzZWQgdG8gaW5mZXIgdGhlIGBPYmplY3RgIGNvbnN0cnVjdG9yLiAqL1xudmFyIG9iamVjdEN0b3JTdHJpbmcgPSBmdW5jVG9TdHJpbmcuY2FsbChPYmplY3QpO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGlmIGEgbWV0aG9kIGlzIG5hdGl2ZS4gKi9cbnZhciByZUlzTmF0aXZlID0gUmVnRXhwKCdeJyArXG4gIGZ1bmNUb1N0cmluZy5jYWxsKGhhc093blByb3BlcnR5KS5yZXBsYWNlKHJlUmVnRXhwQ2hhciwgJ1xcXFwkJicpXG4gIC5yZXBsYWNlKC9oYXNPd25Qcm9wZXJ0eXwoZnVuY3Rpb24pLio/KD89XFxcXFxcKCl8IGZvciAuKz8oPz1cXFxcXFxdKS9nLCAnJDEuKj8nKSArICckJ1xuKTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgQnVmZmVyID0gbW9kdWxlRXhwb3J0cyA/IHJvb3QuQnVmZmVyIDogdW5kZWZpbmVkLFxuICAgIFN5bWJvbCA9IHJvb3QuU3ltYm9sLFxuICAgIFVpbnQ4QXJyYXkgPSByb290LlVpbnQ4QXJyYXksXG4gICAgZ2V0UHJvdG90eXBlID0gb3ZlckFyZyhPYmplY3QuZ2V0UHJvdG90eXBlT2YsIE9iamVjdCksXG4gICAgb2JqZWN0Q3JlYXRlID0gT2JqZWN0LmNyZWF0ZSxcbiAgICBwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IG9iamVjdFByb3RvLnByb3BlcnR5SXNFbnVtZXJhYmxlLFxuICAgIHNwbGljZSA9IGFycmF5UHJvdG8uc3BsaWNlO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlR2V0U3ltYm9scyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMsXG4gICAgbmF0aXZlSXNCdWZmZXIgPSBCdWZmZXIgPyBCdWZmZXIuaXNCdWZmZXIgOiB1bmRlZmluZWQsXG4gICAgbmF0aXZlS2V5cyA9IG92ZXJBcmcoT2JqZWN0LmtleXMsIE9iamVjdCksXG4gICAgbmF0aXZlTWF4ID0gTWF0aC5tYXg7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBEYXRhVmlldyA9IGdldE5hdGl2ZShyb290LCAnRGF0YVZpZXcnKSxcbiAgICBNYXAgPSBnZXROYXRpdmUocm9vdCwgJ01hcCcpLFxuICAgIFByb21pc2UgPSBnZXROYXRpdmUocm9vdCwgJ1Byb21pc2UnKSxcbiAgICBTZXQgPSBnZXROYXRpdmUocm9vdCwgJ1NldCcpLFxuICAgIFdlYWtNYXAgPSBnZXROYXRpdmUocm9vdCwgJ1dlYWtNYXAnKSxcbiAgICBuYXRpdmVDcmVhdGUgPSBnZXROYXRpdmUoT2JqZWN0LCAnY3JlYXRlJyk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBtYXBzLCBzZXRzLCBhbmQgd2Vha21hcHMuICovXG52YXIgZGF0YVZpZXdDdG9yU3RyaW5nID0gdG9Tb3VyY2UoRGF0YVZpZXcpLFxuICAgIG1hcEN0b3JTdHJpbmcgPSB0b1NvdXJjZShNYXApLFxuICAgIHByb21pc2VDdG9yU3RyaW5nID0gdG9Tb3VyY2UoUHJvbWlzZSksXG4gICAgc2V0Q3RvclN0cmluZyA9IHRvU291cmNlKFNldCksXG4gICAgd2Vha01hcEN0b3JTdHJpbmcgPSB0b1NvdXJjZShXZWFrTWFwKTtcblxuLyoqIFVzZWQgdG8gY29udmVydCBzeW1ib2xzIHRvIHByaW1pdGl2ZXMgYW5kIHN0cmluZ3MuICovXG52YXIgc3ltYm9sUHJvdG8gPSBTeW1ib2wgPyBTeW1ib2wucHJvdG90eXBlIDogdW5kZWZpbmVkLFxuICAgIHN5bWJvbFZhbHVlT2YgPSBzeW1ib2xQcm90byA/IHN5bWJvbFByb3RvLnZhbHVlT2YgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGhhc2ggb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBIYXNoKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID8gZW50cmllcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgaGFzaC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKi9cbmZ1bmN0aW9uIGhhc2hDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IG5hdGl2ZUNyZWF0ZSA/IG5hdGl2ZUNyZWF0ZShudWxsKSA6IHt9O1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBoYXNoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge09iamVjdH0gaGFzaCBUaGUgaGFzaCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzaERlbGV0ZShrZXkpIHtcbiAgcmV0dXJuIHRoaXMuaGFzKGtleSkgJiYgZGVsZXRlIHRoaXMuX19kYXRhX19ba2V5XTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBoYXNoIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGhhc2hHZXQoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgaWYgKG5hdGl2ZUNyZWF0ZSkge1xuICAgIHZhciByZXN1bHQgPSBkYXRhW2tleV07XG4gICAgcmV0dXJuIHJlc3VsdCA9PT0gSEFTSF9VTkRFRklORUQgPyB1bmRlZmluZWQgOiByZXN1bHQ7XG4gIH1cbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoZGF0YSwga2V5KSA/IGRhdGFba2V5XSA6IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBoYXNoIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNoSGFzKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIHJldHVybiBuYXRpdmVDcmVhdGUgPyBkYXRhW2tleV0gIT09IHVuZGVmaW5lZCA6IGhhc093blByb3BlcnR5LmNhbGwoZGF0YSwga2V5KTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBoYXNoIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgaGFzaCBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gaGFzaFNldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgZGF0YVtrZXldID0gKG5hdGl2ZUNyZWF0ZSAmJiB2YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IEhBU0hfVU5ERUZJTkVEIDogdmFsdWU7XG4gIHJldHVybiB0aGlzO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgSGFzaGAuXG5IYXNoLnByb3RvdHlwZS5jbGVhciA9IGhhc2hDbGVhcjtcbkhhc2gucHJvdG90eXBlWydkZWxldGUnXSA9IGhhc2hEZWxldGU7XG5IYXNoLnByb3RvdHlwZS5nZXQgPSBoYXNoR2V0O1xuSGFzaC5wcm90b3R5cGUuaGFzID0gaGFzaEhhcztcbkhhc2gucHJvdG90eXBlLnNldCA9IGhhc2hTZXQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBsaXN0IGNhY2hlIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gTGlzdENhY2hlKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID8gZW50cmllcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgbGlzdCBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSBbXTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgbGlzdCBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlRGVsZXRlKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIGlmIChpbmRleCA8IDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGxhc3RJbmRleCA9IGRhdGEubGVuZ3RoIC0gMTtcbiAgaWYgKGluZGV4ID09IGxhc3RJbmRleCkge1xuICAgIGRhdGEucG9wKCk7XG4gIH0gZWxzZSB7XG4gICAgc3BsaWNlLmNhbGwoZGF0YSwgaW5kZXgsIDEpO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGxpc3QgY2FjaGUgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVHZXQoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgcmV0dXJuIGluZGV4IDwgMCA/IHVuZGVmaW5lZCA6IGRhdGFbaW5kZXhdWzFdO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIGxpc3QgY2FjaGUgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlSGFzKGtleSkge1xuICByZXR1cm4gYXNzb2NJbmRleE9mKHRoaXMuX19kYXRhX18sIGtleSkgPiAtMTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBsaXN0IGNhY2hlIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBsaXN0IGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIGlmIChpbmRleCA8IDApIHtcbiAgICBkYXRhLnB1c2goW2tleSwgdmFsdWVdKTtcbiAgfSBlbHNlIHtcbiAgICBkYXRhW2luZGV4XVsxXSA9IHZhbHVlO1xuICB9XG4gIHJldHVybiB0aGlzO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgTGlzdENhY2hlYC5cbkxpc3RDYWNoZS5wcm90b3R5cGUuY2xlYXIgPSBsaXN0Q2FjaGVDbGVhcjtcbkxpc3RDYWNoZS5wcm90b3R5cGVbJ2RlbGV0ZSddID0gbGlzdENhY2hlRGVsZXRlO1xuTGlzdENhY2hlLnByb3RvdHlwZS5nZXQgPSBsaXN0Q2FjaGVHZXQ7XG5MaXN0Q2FjaGUucHJvdG90eXBlLmhhcyA9IGxpc3RDYWNoZUhhcztcbkxpc3RDYWNoZS5wcm90b3R5cGUuc2V0ID0gbGlzdENhY2hlU2V0O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBtYXAgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gTWFwQ2FjaGUoZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPyBlbnRyaWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBtYXAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IHtcbiAgICAnaGFzaCc6IG5ldyBIYXNoLFxuICAgICdtYXAnOiBuZXcgKE1hcCB8fCBMaXN0Q2FjaGUpLFxuICAgICdzdHJpbmcnOiBuZXcgSGFzaFxuICB9O1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBtYXAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVEZWxldGUoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSlbJ2RlbGV0ZSddKGtleSk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgbWFwIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUdldChrZXkpIHtcbiAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KS5nZXQoa2V5KTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBtYXAgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUhhcyhrZXkpIHtcbiAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KS5oYXMoa2V5KTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBtYXAgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbWFwIGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZVNldChrZXksIHZhbHVlKSB7XG4gIGdldE1hcERhdGEodGhpcywga2V5KS5zZXQoa2V5LCB2YWx1ZSk7XG4gIHJldHVybiB0aGlzO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgTWFwQ2FjaGVgLlxuTWFwQ2FjaGUucHJvdG90eXBlLmNsZWFyID0gbWFwQ2FjaGVDbGVhcjtcbk1hcENhY2hlLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBtYXBDYWNoZURlbGV0ZTtcbk1hcENhY2hlLnByb3RvdHlwZS5nZXQgPSBtYXBDYWNoZUdldDtcbk1hcENhY2hlLnByb3RvdHlwZS5oYXMgPSBtYXBDYWNoZUhhcztcbk1hcENhY2hlLnByb3RvdHlwZS5zZXQgPSBtYXBDYWNoZVNldDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgc3RhY2sgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gU3RhY2soZW50cmllcykge1xuICB0aGlzLl9fZGF0YV9fID0gbmV3IExpc3RDYWNoZShlbnRyaWVzKTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBzdGFjay5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBTdGFja1xuICovXG5mdW5jdGlvbiBzdGFja0NsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gbmV3IExpc3RDYWNoZTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgc3RhY2suXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gc3RhY2tEZWxldGUoa2V5KSB7XG4gIHJldHVybiB0aGlzLl9fZGF0YV9fWydkZWxldGUnXShrZXkpO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIHN0YWNrIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBzdGFja0dldChrZXkpIHtcbiAgcmV0dXJuIHRoaXMuX19kYXRhX18uZ2V0KGtleSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgc3RhY2sgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBzdGFja0hhcyhrZXkpIHtcbiAgcmV0dXJuIHRoaXMuX19kYXRhX18uaGFzKGtleSk7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgc3RhY2sgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgc3RhY2sgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGNhY2hlID0gdGhpcy5fX2RhdGFfXztcbiAgaWYgKGNhY2hlIGluc3RhbmNlb2YgTGlzdENhY2hlKSB7XG4gICAgdmFyIHBhaXJzID0gY2FjaGUuX19kYXRhX187XG4gICAgaWYgKCFNYXAgfHwgKHBhaXJzLmxlbmd0aCA8IExBUkdFX0FSUkFZX1NJWkUgLSAxKSkge1xuICAgICAgcGFpcnMucHVzaChba2V5LCB2YWx1ZV0pO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGNhY2hlID0gdGhpcy5fX2RhdGFfXyA9IG5ldyBNYXBDYWNoZShwYWlycyk7XG4gIH1cbiAgY2FjaGUuc2V0KGtleSwgdmFsdWUpO1xuICByZXR1cm4gdGhpcztcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYFN0YWNrYC5cblN0YWNrLnByb3RvdHlwZS5jbGVhciA9IHN0YWNrQ2xlYXI7XG5TdGFjay5wcm90b3R5cGVbJ2RlbGV0ZSddID0gc3RhY2tEZWxldGU7XG5TdGFjay5wcm90b3R5cGUuZ2V0ID0gc3RhY2tHZXQ7XG5TdGFjay5wcm90b3R5cGUuaGFzID0gc3RhY2tIYXM7XG5TdGFjay5wcm90b3R5cGUuc2V0ID0gc3RhY2tTZXQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiB0aGUgYXJyYXktbGlrZSBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5oZXJpdGVkIFNwZWNpZnkgcmV0dXJuaW5nIGluaGVyaXRlZCBwcm9wZXJ0eSBuYW1lcy5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGFycmF5TGlrZUtleXModmFsdWUsIGluaGVyaXRlZCkge1xuICAvLyBTYWZhcmkgOC4xIG1ha2VzIGBhcmd1bWVudHMuY2FsbGVlYCBlbnVtZXJhYmxlIGluIHN0cmljdCBtb2RlLlxuICAvLyBTYWZhcmkgOSBtYWtlcyBgYXJndW1lbnRzLmxlbmd0aGAgZW51bWVyYWJsZSBpbiBzdHJpY3QgbW9kZS5cbiAgdmFyIHJlc3VsdCA9IChpc0FycmF5KHZhbHVlKSB8fCBpc0FyZ3VtZW50cyh2YWx1ZSkpXG4gICAgPyBiYXNlVGltZXModmFsdWUubGVuZ3RoLCBTdHJpbmcpXG4gICAgOiBbXTtcblxuICB2YXIgbGVuZ3RoID0gcmVzdWx0Lmxlbmd0aCxcbiAgICAgIHNraXBJbmRleGVzID0gISFsZW5ndGg7XG5cbiAgZm9yICh2YXIga2V5IGluIHZhbHVlKSB7XG4gICAgaWYgKChpbmhlcml0ZWQgfHwgaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwga2V5KSkgJiZcbiAgICAgICAgIShza2lwSW5kZXhlcyAmJiAoa2V5ID09ICdsZW5ndGgnIHx8IGlzSW5kZXgoa2V5LCBsZW5ndGgpKSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBpcyBsaWtlIGBhc3NpZ25WYWx1ZWAgZXhjZXB0IHRoYXQgaXQgZG9lc24ndCBhc3NpZ25cbiAqIGB1bmRlZmluZWRgIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gYXNzaWduLlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gYXNzaWduLlxuICovXG5mdW5jdGlvbiBhc3NpZ25NZXJnZVZhbHVlKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICBpZiAoKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgIWVxKG9iamVjdFtrZXldLCB2YWx1ZSkpIHx8XG4gICAgICAodHlwZW9mIGtleSA9PSAnbnVtYmVyJyAmJiB2YWx1ZSA9PT0gdW5kZWZpbmVkICYmICEoa2V5IGluIG9iamVjdCkpKSB7XG4gICAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgfVxufVxuXG4vKipcbiAqIEFzc2lnbnMgYHZhbHVlYCB0byBga2V5YCBvZiBgb2JqZWN0YCBpZiB0aGUgZXhpc3RpbmcgdmFsdWUgaXMgbm90IGVxdWl2YWxlbnRcbiAqIHVzaW5nIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXNhbWV2YWx1ZXplcm8pXG4gKiBmb3IgZXF1YWxpdHkgY29tcGFyaXNvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGFzc2lnbi5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGFzc2lnbi5cbiAqL1xuZnVuY3Rpb24gYXNzaWduVmFsdWUob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHZhciBvYmpWYWx1ZSA9IG9iamVjdFtrZXldO1xuICBpZiAoIShoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSAmJiBlcShvYmpWYWx1ZSwgdmFsdWUpKSB8fFxuICAgICAgKHZhbHVlID09PSB1bmRlZmluZWQgJiYgIShrZXkgaW4gb2JqZWN0KSkpIHtcbiAgICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICB9XG59XG5cbi8qKlxuICogR2V0cyB0aGUgaW5kZXggYXQgd2hpY2ggdGhlIGBrZXlgIGlzIGZvdW5kIGluIGBhcnJheWAgb2Yga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7Kn0ga2V5IFRoZSBrZXkgdG8gc2VhcmNoIGZvci5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGluZGV4IG9mIHRoZSBtYXRjaGVkIHZhbHVlLCBlbHNlIGAtMWAuXG4gKi9cbmZ1bmN0aW9uIGFzc29jSW5kZXhPZihhcnJheSwga2V5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIGlmIChlcShhcnJheVtsZW5ndGhdWzBdLCBrZXkpKSB7XG4gICAgICByZXR1cm4gbGVuZ3RoO1xuICAgIH1cbiAgfVxuICByZXR1cm4gLTE7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uYXNzaWduYCB3aXRob3V0IHN1cHBvcnQgZm9yIG11bHRpcGxlIHNvdXJjZXNcbiAqIG9yIGBjdXN0b21pemVyYCBmdW5jdGlvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIHNvdXJjZSBvYmplY3QuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBiYXNlQXNzaWduKG9iamVjdCwgc291cmNlKSB7XG4gIHJldHVybiBvYmplY3QgJiYgY29weU9iamVjdChzb3VyY2UsIGtleXMoc291cmNlKSwgb2JqZWN0KTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5jbG9uZWAgYW5kIGBfLmNsb25lRGVlcGAgd2hpY2ggdHJhY2tzXG4gKiB0cmF2ZXJzZWQgb2JqZWN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2xvbmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0RlZXBdIFNwZWNpZnkgYSBkZWVwIGNsb25lLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNGdWxsXSBTcGVjaWZ5IGEgY2xvbmUgaW5jbHVkaW5nIHN5bWJvbHMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjbG9uaW5nLlxuICogQHBhcmFtIHtzdHJpbmd9IFtrZXldIFRoZSBrZXkgb2YgYHZhbHVlYC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgcGFyZW50IG9iamVjdCBvZiBgdmFsdWVgLlxuICogQHBhcmFtIHtPYmplY3R9IFtzdGFja10gVHJhY2tzIHRyYXZlcnNlZCBvYmplY3RzIGFuZCB0aGVpciBjbG9uZSBjb3VudGVycGFydHMuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgY2xvbmVkIHZhbHVlLlxuICovXG5mdW5jdGlvbiBiYXNlQ2xvbmUodmFsdWUsIGlzRGVlcCwgaXNGdWxsLCBjdXN0b21pemVyLCBrZXksIG9iamVjdCwgc3RhY2spIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKGN1c3RvbWl6ZXIpIHtcbiAgICByZXN1bHQgPSBvYmplY3QgPyBjdXN0b21pemVyKHZhbHVlLCBrZXksIG9iamVjdCwgc3RhY2spIDogY3VzdG9taXplcih2YWx1ZSk7XG4gIH1cbiAgaWYgKHJlc3VsdCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBpZiAoIWlzT2JqZWN0KHZhbHVlKSkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICB2YXIgaXNBcnIgPSBpc0FycmF5KHZhbHVlKTtcbiAgaWYgKGlzQXJyKSB7XG4gICAgcmVzdWx0ID0gaW5pdENsb25lQXJyYXkodmFsdWUpO1xuICAgIGlmICghaXNEZWVwKSB7XG4gICAgICByZXR1cm4gY29weUFycmF5KHZhbHVlLCByZXN1bHQpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgdGFnID0gZ2V0VGFnKHZhbHVlKSxcbiAgICAgICAgaXNGdW5jID0gdGFnID09IGZ1bmNUYWcgfHwgdGFnID09IGdlblRhZztcblxuICAgIGlmIChpc0J1ZmZlcih2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBjbG9uZUJ1ZmZlcih2YWx1ZSwgaXNEZWVwKTtcbiAgICB9XG4gICAgaWYgKHRhZyA9PSBvYmplY3RUYWcgfHwgdGFnID09IGFyZ3NUYWcgfHwgKGlzRnVuYyAmJiAhb2JqZWN0KSkge1xuICAgICAgaWYgKGlzSG9zdE9iamVjdCh2YWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdCA/IHZhbHVlIDoge307XG4gICAgICB9XG4gICAgICByZXN1bHQgPSBpbml0Q2xvbmVPYmplY3QoaXNGdW5jID8ge30gOiB2YWx1ZSk7XG4gICAgICBpZiAoIWlzRGVlcCkge1xuICAgICAgICByZXR1cm4gY29weVN5bWJvbHModmFsdWUsIGJhc2VBc3NpZ24ocmVzdWx0LCB2YWx1ZSkpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIWNsb25lYWJsZVRhZ3NbdGFnXSkge1xuICAgICAgICByZXR1cm4gb2JqZWN0ID8gdmFsdWUgOiB7fTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdCA9IGluaXRDbG9uZUJ5VGFnKHZhbHVlLCB0YWcsIGJhc2VDbG9uZSwgaXNEZWVwKTtcbiAgICB9XG4gIH1cbiAgLy8gQ2hlY2sgZm9yIGNpcmN1bGFyIHJlZmVyZW5jZXMgYW5kIHJldHVybiBpdHMgY29ycmVzcG9uZGluZyBjbG9uZS5cbiAgc3RhY2sgfHwgKHN0YWNrID0gbmV3IFN0YWNrKTtcbiAgdmFyIHN0YWNrZWQgPSBzdGFjay5nZXQodmFsdWUpO1xuICBpZiAoc3RhY2tlZCkge1xuICAgIHJldHVybiBzdGFja2VkO1xuICB9XG4gIHN0YWNrLnNldCh2YWx1ZSwgcmVzdWx0KTtcblxuICBpZiAoIWlzQXJyKSB7XG4gICAgdmFyIHByb3BzID0gaXNGdWxsID8gZ2V0QWxsS2V5cyh2YWx1ZSkgOiBrZXlzKHZhbHVlKTtcbiAgfVxuICBhcnJheUVhY2gocHJvcHMgfHwgdmFsdWUsIGZ1bmN0aW9uKHN1YlZhbHVlLCBrZXkpIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIGtleSA9IHN1YlZhbHVlO1xuICAgICAgc3ViVmFsdWUgPSB2YWx1ZVtrZXldO1xuICAgIH1cbiAgICAvLyBSZWN1cnNpdmVseSBwb3B1bGF0ZSBjbG9uZSAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgIGFzc2lnblZhbHVlKHJlc3VsdCwga2V5LCBiYXNlQ2xvbmUoc3ViVmFsdWUsIGlzRGVlcCwgaXNGdWxsLCBjdXN0b21pemVyLCBrZXksIHZhbHVlLCBzdGFjaykpO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5jcmVhdGVgIHdpdGhvdXQgc3VwcG9ydCBmb3IgYXNzaWduaW5nXG4gKiBwcm9wZXJ0aWVzIHRvIHRoZSBjcmVhdGVkIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHByb3RvdHlwZSBUaGUgb2JqZWN0IHRvIGluaGVyaXQgZnJvbS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG5ldyBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGJhc2VDcmVhdGUocHJvdG8pIHtcbiAgcmV0dXJuIGlzT2JqZWN0KHByb3RvKSA/IG9iamVjdENyZWF0ZShwcm90bykgOiB7fTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0QWxsS2V5c2AgYW5kIGBnZXRBbGxLZXlzSW5gIHdoaWNoIHVzZXNcbiAqIGBrZXlzRnVuY2AgYW5kIGBzeW1ib2xzRnVuY2AgdG8gZ2V0IHRoZSBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIGFuZFxuICogc3ltYm9scyBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtGdW5jdGlvbn0ga2V5c0Z1bmMgVGhlIGZ1bmN0aW9uIHRvIGdldCB0aGUga2V5cyBvZiBgb2JqZWN0YC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHN5bWJvbHNGdW5jIFRoZSBmdW5jdGlvbiB0byBnZXQgdGhlIHN5bWJvbHMgb2YgYG9iamVjdGAuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzIGFuZCBzeW1ib2xzLlxuICovXG5mdW5jdGlvbiBiYXNlR2V0QWxsS2V5cyhvYmplY3QsIGtleXNGdW5jLCBzeW1ib2xzRnVuYykge1xuICB2YXIgcmVzdWx0ID0ga2V5c0Z1bmMob2JqZWN0KTtcbiAgcmV0dXJuIGlzQXJyYXkob2JqZWN0KSA/IHJlc3VsdCA6IGFycmF5UHVzaChyZXN1bHQsIHN5bWJvbHNGdW5jKG9iamVjdCkpO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBnZXRUYWdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRUYWcodmFsdWUpIHtcbiAgcmV0dXJuIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzTmF0aXZlYCB3aXRob3V0IGJhZCBzaGltIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbixcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc05hdGl2ZSh2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0KHZhbHVlKSB8fCBpc01hc2tlZCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHBhdHRlcm4gPSAoaXNGdW5jdGlvbih2YWx1ZSkgfHwgaXNIb3N0T2JqZWN0KHZhbHVlKSkgPyByZUlzTmF0aXZlIDogcmVJc0hvc3RDdG9yO1xuICByZXR1cm4gcGF0dGVybi50ZXN0KHRvU291cmNlKHZhbHVlKSk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNUeXBlZEFycmF5YCB3aXRob3V0IE5vZGUuanMgb3B0aW1pemF0aW9ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHR5cGVkIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc1R5cGVkQXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiZcbiAgICBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmICEhdHlwZWRBcnJheVRhZ3Nbb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSldO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmtleXNgIHdoaWNoIGRvZXNuJ3QgdHJlYXQgc3BhcnNlIGFycmF5cyBhcyBkZW5zZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYmFzZUtleXMob2JqZWN0KSB7XG4gIGlmICghaXNQcm90b3R5cGUob2JqZWN0KSkge1xuICAgIHJldHVybiBuYXRpdmVLZXlzKG9iamVjdCk7XG4gIH1cbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gT2JqZWN0KG9iamVjdCkpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkgJiYga2V5ICE9ICdjb25zdHJ1Y3RvcicpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ua2V5c0luYCB3aGljaCBkb2Vzbid0IHRyZWF0IHNwYXJzZSBhcnJheXMgYXMgZGVuc2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VLZXlzSW4ob2JqZWN0KSB7XG4gIGlmICghaXNPYmplY3Qob2JqZWN0KSkge1xuICAgIHJldHVybiBuYXRpdmVLZXlzSW4ob2JqZWN0KTtcbiAgfVxuICB2YXIgaXNQcm90byA9IGlzUHJvdG90eXBlKG9iamVjdCksXG4gICAgICByZXN1bHQgPSBbXTtcblxuICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgaWYgKCEoa2V5ID09ICdjb25zdHJ1Y3RvcicgJiYgKGlzUHJvdG8gfHwgIWhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpKSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ubWVyZ2VgIHdpdGhvdXQgc3VwcG9ydCBmb3IgbXVsdGlwbGUgc291cmNlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBzcmNJbmRleCBUaGUgaW5kZXggb2YgYHNvdXJjZWAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBtZXJnZWQgdmFsdWVzLlxuICogQHBhcmFtIHtPYmplY3R9IFtzdGFja10gVHJhY2tzIHRyYXZlcnNlZCBzb3VyY2UgdmFsdWVzIGFuZCB0aGVpciBtZXJnZWRcbiAqICBjb3VudGVycGFydHMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VNZXJnZShvYmplY3QsIHNvdXJjZSwgc3JjSW5kZXgsIGN1c3RvbWl6ZXIsIHN0YWNrKSB7XG4gIGlmIChvYmplY3QgPT09IHNvdXJjZSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoIShpc0FycmF5KHNvdXJjZSkgfHwgaXNUeXBlZEFycmF5KHNvdXJjZSkpKSB7XG4gICAgdmFyIHByb3BzID0gYmFzZUtleXNJbihzb3VyY2UpO1xuICB9XG4gIGFycmF5RWFjaChwcm9wcyB8fCBzb3VyY2UsIGZ1bmN0aW9uKHNyY1ZhbHVlLCBrZXkpIHtcbiAgICBpZiAocHJvcHMpIHtcbiAgICAgIGtleSA9IHNyY1ZhbHVlO1xuICAgICAgc3JjVmFsdWUgPSBzb3VyY2Vba2V5XTtcbiAgICB9XG4gICAgaWYgKGlzT2JqZWN0KHNyY1ZhbHVlKSkge1xuICAgICAgc3RhY2sgfHwgKHN0YWNrID0gbmV3IFN0YWNrKTtcbiAgICAgIGJhc2VNZXJnZURlZXAob2JqZWN0LCBzb3VyY2UsIGtleSwgc3JjSW5kZXgsIGJhc2VNZXJnZSwgY3VzdG9taXplciwgc3RhY2spO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHZhciBuZXdWYWx1ZSA9IGN1c3RvbWl6ZXJcbiAgICAgICAgPyBjdXN0b21pemVyKG9iamVjdFtrZXldLCBzcmNWYWx1ZSwgKGtleSArICcnKSwgb2JqZWN0LCBzb3VyY2UsIHN0YWNrKVxuICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgICAgaWYgKG5ld1ZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbmV3VmFsdWUgPSBzcmNWYWx1ZTtcbiAgICAgIH1cbiAgICAgIGFzc2lnbk1lcmdlVmFsdWUob2JqZWN0LCBrZXksIG5ld1ZhbHVlKTtcbiAgICB9XG4gIH0pO1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZU1lcmdlYCBmb3IgYXJyYXlzIGFuZCBvYmplY3RzIHdoaWNoIHBlcmZvcm1zXG4gKiBkZWVwIG1lcmdlcyBhbmQgdHJhY2tzIHRyYXZlcnNlZCBvYmplY3RzIGVuYWJsaW5nIG9iamVjdHMgd2l0aCBjaXJjdWxhclxuICogcmVmZXJlbmNlcyB0byBiZSBtZXJnZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIHNvdXJjZSBvYmplY3QuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIG1lcmdlLlxuICogQHBhcmFtIHtudW1iZXJ9IHNyY0luZGV4IFRoZSBpbmRleCBvZiBgc291cmNlYC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG1lcmdlRnVuYyBUaGUgZnVuY3Rpb24gdG8gbWVyZ2UgdmFsdWVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgYXNzaWduZWQgdmFsdWVzLlxuICogQHBhcmFtIHtPYmplY3R9IFtzdGFja10gVHJhY2tzIHRyYXZlcnNlZCBzb3VyY2UgdmFsdWVzIGFuZCB0aGVpciBtZXJnZWRcbiAqICBjb3VudGVycGFydHMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VNZXJnZURlZXAob2JqZWN0LCBzb3VyY2UsIGtleSwgc3JjSW5kZXgsIG1lcmdlRnVuYywgY3VzdG9taXplciwgc3RhY2spIHtcbiAgdmFyIG9ialZhbHVlID0gb2JqZWN0W2tleV0sXG4gICAgICBzcmNWYWx1ZSA9IHNvdXJjZVtrZXldLFxuICAgICAgc3RhY2tlZCA9IHN0YWNrLmdldChzcmNWYWx1ZSk7XG5cbiAgaWYgKHN0YWNrZWQpIHtcbiAgICBhc3NpZ25NZXJnZVZhbHVlKG9iamVjdCwga2V5LCBzdGFja2VkKTtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFyIG5ld1ZhbHVlID0gY3VzdG9taXplclxuICAgID8gY3VzdG9taXplcihvYmpWYWx1ZSwgc3JjVmFsdWUsIChrZXkgKyAnJyksIG9iamVjdCwgc291cmNlLCBzdGFjaylcbiAgICA6IHVuZGVmaW5lZDtcblxuICB2YXIgaXNDb21tb24gPSBuZXdWYWx1ZSA9PT0gdW5kZWZpbmVkO1xuXG4gIGlmIChpc0NvbW1vbikge1xuICAgIG5ld1ZhbHVlID0gc3JjVmFsdWU7XG4gICAgaWYgKGlzQXJyYXkoc3JjVmFsdWUpIHx8IGlzVHlwZWRBcnJheShzcmNWYWx1ZSkpIHtcbiAgICAgIGlmIChpc0FycmF5KG9ialZhbHVlKSkge1xuICAgICAgICBuZXdWYWx1ZSA9IG9ialZhbHVlO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaXNBcnJheUxpa2VPYmplY3Qob2JqVmFsdWUpKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gY29weUFycmF5KG9ialZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBpc0NvbW1vbiA9IGZhbHNlO1xuICAgICAgICBuZXdWYWx1ZSA9IGJhc2VDbG9uZShzcmNWYWx1ZSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKGlzUGxhaW5PYmplY3Qoc3JjVmFsdWUpIHx8IGlzQXJndW1lbnRzKHNyY1ZhbHVlKSkge1xuICAgICAgaWYgKGlzQXJndW1lbnRzKG9ialZhbHVlKSkge1xuICAgICAgICBuZXdWYWx1ZSA9IHRvUGxhaW5PYmplY3Qob2JqVmFsdWUpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoIWlzT2JqZWN0KG9ialZhbHVlKSB8fCAoc3JjSW5kZXggJiYgaXNGdW5jdGlvbihvYmpWYWx1ZSkpKSB7XG4gICAgICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gICAgICAgIG5ld1ZhbHVlID0gYmFzZUNsb25lKHNyY1ZhbHVlLCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBuZXdWYWx1ZSA9IG9ialZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIGlmIChpc0NvbW1vbikge1xuICAgIC8vIFJlY3Vyc2l2ZWx5IG1lcmdlIG9iamVjdHMgYW5kIGFycmF5cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgIHN0YWNrLnNldChzcmNWYWx1ZSwgbmV3VmFsdWUpO1xuICAgIG1lcmdlRnVuYyhuZXdWYWx1ZSwgc3JjVmFsdWUsIHNyY0luZGV4LCBjdXN0b21pemVyLCBzdGFjayk7XG4gICAgc3RhY2tbJ2RlbGV0ZSddKHNyY1ZhbHVlKTtcbiAgfVxuICBhc3NpZ25NZXJnZVZhbHVlKG9iamVjdCwga2V5LCBuZXdWYWx1ZSk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucmVzdGAgd2hpY2ggZG9lc24ndCB2YWxpZGF0ZSBvciBjb2VyY2UgYXJndW1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBhcHBseSBhIHJlc3QgcGFyYW1ldGVyIHRvLlxuICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydD1mdW5jLmxlbmd0aC0xXSBUaGUgc3RhcnQgcG9zaXRpb24gb2YgdGhlIHJlc3QgcGFyYW1ldGVyLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VSZXN0KGZ1bmMsIHN0YXJ0KSB7XG4gIHN0YXJ0ID0gbmF0aXZlTWF4KHN0YXJ0ID09PSB1bmRlZmluZWQgPyAoZnVuYy5sZW5ndGggLSAxKSA6IHN0YXJ0LCAwKTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzLFxuICAgICAgICBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBuYXRpdmVNYXgoYXJncy5sZW5ndGggLSBzdGFydCwgMCksXG4gICAgICAgIGFycmF5ID0gQXJyYXkobGVuZ3RoKTtcblxuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICBhcnJheVtpbmRleF0gPSBhcmdzW3N0YXJ0ICsgaW5kZXhdO1xuICAgIH1cbiAgICBpbmRleCA9IC0xO1xuICAgIHZhciBvdGhlckFyZ3MgPSBBcnJheShzdGFydCArIDEpO1xuICAgIHdoaWxlICgrK2luZGV4IDwgc3RhcnQpIHtcbiAgICAgIG90aGVyQXJnc1tpbmRleF0gPSBhcmdzW2luZGV4XTtcbiAgICB9XG4gICAgb3RoZXJBcmdzW3N0YXJ0XSA9IGFycmF5O1xuICAgIHJldHVybiBhcHBseShmdW5jLCB0aGlzLCBvdGhlckFyZ3MpO1xuICB9O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiAgYGJ1ZmZlcmAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QnVmZmVyfSBidWZmZXIgVGhlIGJ1ZmZlciB0byBjbG9uZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRGVlcF0gU3BlY2lmeSBhIGRlZXAgY2xvbmUuXG4gKiBAcmV0dXJucyB7QnVmZmVyfSBSZXR1cm5zIHRoZSBjbG9uZWQgYnVmZmVyLlxuICovXG5mdW5jdGlvbiBjbG9uZUJ1ZmZlcihidWZmZXIsIGlzRGVlcCkge1xuICBpZiAoaXNEZWVwKSB7XG4gICAgcmV0dXJuIGJ1ZmZlci5zbGljZSgpO1xuICB9XG4gIHZhciByZXN1bHQgPSBuZXcgYnVmZmVyLmNvbnN0cnVjdG9yKGJ1ZmZlci5sZW5ndGgpO1xuICBidWZmZXIuY29weShyZXN1bHQpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiBgYXJyYXlCdWZmZXJgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5QnVmZmVyfSBhcnJheUJ1ZmZlciBUaGUgYXJyYXkgYnVmZmVyIHRvIGNsb25lLlxuICogQHJldHVybnMge0FycmF5QnVmZmVyfSBSZXR1cm5zIHRoZSBjbG9uZWQgYXJyYXkgYnVmZmVyLlxuICovXG5mdW5jdGlvbiBjbG9uZUFycmF5QnVmZmVyKGFycmF5QnVmZmVyKSB7XG4gIHZhciByZXN1bHQgPSBuZXcgYXJyYXlCdWZmZXIuY29uc3RydWN0b3IoYXJyYXlCdWZmZXIuYnl0ZUxlbmd0aCk7XG4gIG5ldyBVaW50OEFycmF5KHJlc3VsdCkuc2V0KG5ldyBVaW50OEFycmF5KGFycmF5QnVmZmVyKSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mIGBkYXRhVmlld2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhVmlldyBUaGUgZGF0YSB2aWV3IHRvIGNsb25lLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNsb25lZCBkYXRhIHZpZXcuXG4gKi9cbmZ1bmN0aW9uIGNsb25lRGF0YVZpZXcoZGF0YVZpZXcsIGlzRGVlcCkge1xuICB2YXIgYnVmZmVyID0gaXNEZWVwID8gY2xvbmVBcnJheUJ1ZmZlcihkYXRhVmlldy5idWZmZXIpIDogZGF0YVZpZXcuYnVmZmVyO1xuICByZXR1cm4gbmV3IGRhdGFWaWV3LmNvbnN0cnVjdG9yKGJ1ZmZlciwgZGF0YVZpZXcuYnl0ZU9mZnNldCwgZGF0YVZpZXcuYnl0ZUxlbmd0aCk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mIGBtYXBgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gbWFwIFRoZSBtYXAgdG8gY2xvbmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjbG9uZUZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNsb25lIHZhbHVlcy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRGVlcF0gU3BlY2lmeSBhIGRlZXAgY2xvbmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjbG9uZWQgbWFwLlxuICovXG5mdW5jdGlvbiBjbG9uZU1hcChtYXAsIGlzRGVlcCwgY2xvbmVGdW5jKSB7XG4gIHZhciBhcnJheSA9IGlzRGVlcCA/IGNsb25lRnVuYyhtYXBUb0FycmF5KG1hcCksIHRydWUpIDogbWFwVG9BcnJheShtYXApO1xuICByZXR1cm4gYXJyYXlSZWR1Y2UoYXJyYXksIGFkZE1hcEVudHJ5LCBuZXcgbWFwLmNvbnN0cnVjdG9yKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgYHJlZ2V4cGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSByZWdleHAgVGhlIHJlZ2V4cCB0byBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNsb25lZCByZWdleHAuXG4gKi9cbmZ1bmN0aW9uIGNsb25lUmVnRXhwKHJlZ2V4cCkge1xuICB2YXIgcmVzdWx0ID0gbmV3IHJlZ2V4cC5jb25zdHJ1Y3RvcihyZWdleHAuc291cmNlLCByZUZsYWdzLmV4ZWMocmVnZXhwKSk7XG4gIHJlc3VsdC5sYXN0SW5kZXggPSByZWdleHAubGFzdEluZGV4O1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiBgc2V0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNldCBUaGUgc2V0IHRvIGNsb25lLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2xvbmVGdW5jIFRoZSBmdW5jdGlvbiB0byBjbG9uZSB2YWx1ZXMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0RlZXBdIFNwZWNpZnkgYSBkZWVwIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY2xvbmVkIHNldC5cbiAqL1xuZnVuY3Rpb24gY2xvbmVTZXQoc2V0LCBpc0RlZXAsIGNsb25lRnVuYykge1xuICB2YXIgYXJyYXkgPSBpc0RlZXAgPyBjbG9uZUZ1bmMoc2V0VG9BcnJheShzZXQpLCB0cnVlKSA6IHNldFRvQXJyYXkoc2V0KTtcbiAgcmV0dXJuIGFycmF5UmVkdWNlKGFycmF5LCBhZGRTZXRFbnRyeSwgbmV3IHNldC5jb25zdHJ1Y3Rvcik7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mIHRoZSBgc3ltYm9sYCBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzeW1ib2wgVGhlIHN5bWJvbCBvYmplY3QgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjbG9uZWQgc3ltYm9sIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gY2xvbmVTeW1ib2woc3ltYm9sKSB7XG4gIHJldHVybiBzeW1ib2xWYWx1ZU9mID8gT2JqZWN0KHN5bWJvbFZhbHVlT2YuY2FsbChzeW1ib2wpKSA6IHt9O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiBgdHlwZWRBcnJheWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSB0eXBlZEFycmF5IFRoZSB0eXBlZCBhcnJheSB0byBjbG9uZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRGVlcF0gU3BlY2lmeSBhIGRlZXAgY2xvbmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjbG9uZWQgdHlwZWQgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGNsb25lVHlwZWRBcnJheSh0eXBlZEFycmF5LCBpc0RlZXApIHtcbiAgdmFyIGJ1ZmZlciA9IGlzRGVlcCA/IGNsb25lQXJyYXlCdWZmZXIodHlwZWRBcnJheS5idWZmZXIpIDogdHlwZWRBcnJheS5idWZmZXI7XG4gIHJldHVybiBuZXcgdHlwZWRBcnJheS5jb25zdHJ1Y3RvcihidWZmZXIsIHR5cGVkQXJyYXkuYnl0ZU9mZnNldCwgdHlwZWRBcnJheS5sZW5ndGgpO1xufVxuXG4vKipcbiAqIENvcGllcyB0aGUgdmFsdWVzIG9mIGBzb3VyY2VgIHRvIGBhcnJheWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IHNvdXJjZSBUaGUgYXJyYXkgdG8gY29weSB2YWx1ZXMgZnJvbS5cbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheT1bXV0gVGhlIGFycmF5IHRvIGNvcHkgdmFsdWVzIHRvLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGNvcHlBcnJheShzb3VyY2UsIGFycmF5KSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gc291cmNlLmxlbmd0aDtcblxuICBhcnJheSB8fCAoYXJyYXkgPSBBcnJheShsZW5ndGgpKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBhcnJheVtpbmRleF0gPSBzb3VyY2VbaW5kZXhdO1xuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxuLyoqXG4gKiBDb3BpZXMgcHJvcGVydGllcyBvZiBgc291cmNlYCB0byBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyBmcm9tLlxuICogQHBhcmFtIHtBcnJheX0gcHJvcHMgVGhlIHByb3BlcnR5IGlkZW50aWZpZXJzIHRvIGNvcHkuXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdD17fV0gVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgdG8uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb3BpZWQgdmFsdWVzLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gY29weU9iamVjdChzb3VyY2UsIHByb3BzLCBvYmplY3QsIGN1c3RvbWl6ZXIpIHtcbiAgb2JqZWN0IHx8IChvYmplY3QgPSB7fSk7XG5cbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBwcm9wcy5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIga2V5ID0gcHJvcHNbaW5kZXhdO1xuXG4gICAgdmFyIG5ld1ZhbHVlID0gY3VzdG9taXplclxuICAgICAgPyBjdXN0b21pemVyKG9iamVjdFtrZXldLCBzb3VyY2Vba2V5XSwga2V5LCBvYmplY3QsIHNvdXJjZSlcbiAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgYXNzaWduVmFsdWUob2JqZWN0LCBrZXksIG5ld1ZhbHVlID09PSB1bmRlZmluZWQgPyBzb3VyY2Vba2V5XSA6IG5ld1ZhbHVlKTtcbiAgfVxuICByZXR1cm4gb2JqZWN0O1xufVxuXG4vKipcbiAqIENvcGllcyBvd24gc3ltYm9sIHByb3BlcnRpZXMgb2YgYHNvdXJjZWAgdG8gYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIG9iamVjdCB0byBjb3B5IHN5bWJvbHMgZnJvbS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0PXt9XSBUaGUgb2JqZWN0IHRvIGNvcHkgc3ltYm9scyB0by5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGNvcHlTeW1ib2xzKHNvdXJjZSwgb2JqZWN0KSB7XG4gIHJldHVybiBjb3B5T2JqZWN0KHNvdXJjZSwgZ2V0U3ltYm9scyhzb3VyY2UpLCBvYmplY3QpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiBsaWtlIGBfLmFzc2lnbmAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGFzc2lnbmVyIFRoZSBmdW5jdGlvbiB0byBhc3NpZ24gdmFsdWVzLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYXNzaWduZXIgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUFzc2lnbmVyKGFzc2lnbmVyKSB7XG4gIHJldHVybiBiYXNlUmVzdChmdW5jdGlvbihvYmplY3QsIHNvdXJjZXMpIHtcbiAgICB2YXIgaW5kZXggPSAtMSxcbiAgICAgICAgbGVuZ3RoID0gc291cmNlcy5sZW5ndGgsXG4gICAgICAgIGN1c3RvbWl6ZXIgPSBsZW5ndGggPiAxID8gc291cmNlc1tsZW5ndGggLSAxXSA6IHVuZGVmaW5lZCxcbiAgICAgICAgZ3VhcmQgPSBsZW5ndGggPiAyID8gc291cmNlc1syXSA6IHVuZGVmaW5lZDtcblxuICAgIGN1c3RvbWl6ZXIgPSAoYXNzaWduZXIubGVuZ3RoID4gMyAmJiB0eXBlb2YgY3VzdG9taXplciA9PSAnZnVuY3Rpb24nKVxuICAgICAgPyAobGVuZ3RoLS0sIGN1c3RvbWl6ZXIpXG4gICAgICA6IHVuZGVmaW5lZDtcblxuICAgIGlmIChndWFyZCAmJiBpc0l0ZXJhdGVlQ2FsbChzb3VyY2VzWzBdLCBzb3VyY2VzWzFdLCBndWFyZCkpIHtcbiAgICAgIGN1c3RvbWl6ZXIgPSBsZW5ndGggPCAzID8gdW5kZWZpbmVkIDogY3VzdG9taXplcjtcbiAgICAgIGxlbmd0aCA9IDE7XG4gICAgfVxuICAgIG9iamVjdCA9IE9iamVjdChvYmplY3QpO1xuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICB2YXIgc291cmNlID0gc291cmNlc1tpbmRleF07XG4gICAgICBpZiAoc291cmNlKSB7XG4gICAgICAgIGFzc2lnbmVyKG9iamVjdCwgc291cmNlLCBpbmRleCwgY3VzdG9taXplcik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvYmplY3Q7XG4gIH0pO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2Ygb3duIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgYW5kIHN5bWJvbHMgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMgYW5kIHN5bWJvbHMuXG4gKi9cbmZ1bmN0aW9uIGdldEFsbEtleXMob2JqZWN0KSB7XG4gIHJldHVybiBiYXNlR2V0QWxsS2V5cyhvYmplY3QsIGtleXMsIGdldFN5bWJvbHMpO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGRhdGEgZm9yIGBtYXBgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gbWFwIFRoZSBtYXAgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSByZWZlcmVuY2Uga2V5LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIG1hcCBkYXRhLlxuICovXG5mdW5jdGlvbiBnZXRNYXBEYXRhKG1hcCwga2V5KSB7XG4gIHZhciBkYXRhID0gbWFwLl9fZGF0YV9fO1xuICByZXR1cm4gaXNLZXlhYmxlKGtleSlcbiAgICA/IGRhdGFbdHlwZW9mIGtleSA9PSAnc3RyaW5nJyA/ICdzdHJpbmcnIDogJ2hhc2gnXVxuICAgIDogZGF0YS5tYXA7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgbmF0aXZlIGZ1bmN0aW9uIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIG1ldGhvZCB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZnVuY3Rpb24gaWYgaXQncyBuYXRpdmUsIGVsc2UgYHVuZGVmaW5lZGAuXG4gKi9cbmZ1bmN0aW9uIGdldE5hdGl2ZShvYmplY3QsIGtleSkge1xuICB2YXIgdmFsdWUgPSBnZXRWYWx1ZShvYmplY3QsIGtleSk7XG4gIHJldHVybiBiYXNlSXNOYXRpdmUodmFsdWUpID8gdmFsdWUgOiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGVudW1lcmFibGUgc3ltYm9sIHByb3BlcnRpZXMgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2Ygc3ltYm9scy5cbiAqL1xudmFyIGdldFN5bWJvbHMgPSBuYXRpdmVHZXRTeW1ib2xzID8gb3ZlckFyZyhuYXRpdmVHZXRTeW1ib2xzLCBPYmplY3QpIDogc3R1YkFycmF5O1xuXG4vKipcbiAqIEdldHMgdGhlIGB0b1N0cmluZ1RhZ2Agb2YgYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBgdG9TdHJpbmdUYWdgLlxuICovXG52YXIgZ2V0VGFnID0gYmFzZUdldFRhZztcblxuLy8gRmFsbGJhY2sgZm9yIGRhdGEgdmlld3MsIG1hcHMsIHNldHMsIGFuZCB3ZWFrIG1hcHMgaW4gSUUgMTEsXG4vLyBmb3IgZGF0YSB2aWV3cyBpbiBFZGdlIDwgMTQsIGFuZCBwcm9taXNlcyBpbiBOb2RlLmpzLlxuaWYgKChEYXRhVmlldyAmJiBnZXRUYWcobmV3IERhdGFWaWV3KG5ldyBBcnJheUJ1ZmZlcigxKSkpICE9IGRhdGFWaWV3VGFnKSB8fFxuICAgIChNYXAgJiYgZ2V0VGFnKG5ldyBNYXApICE9IG1hcFRhZykgfHxcbiAgICAoUHJvbWlzZSAmJiBnZXRUYWcoUHJvbWlzZS5yZXNvbHZlKCkpICE9IHByb21pc2VUYWcpIHx8XG4gICAgKFNldCAmJiBnZXRUYWcobmV3IFNldCkgIT0gc2V0VGFnKSB8fFxuICAgIChXZWFrTWFwICYmIGdldFRhZyhuZXcgV2Vha01hcCkgIT0gd2Vha01hcFRhZykpIHtcbiAgZ2V0VGFnID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICB2YXIgcmVzdWx0ID0gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSksXG4gICAgICAgIEN0b3IgPSByZXN1bHQgPT0gb2JqZWN0VGFnID8gdmFsdWUuY29uc3RydWN0b3IgOiB1bmRlZmluZWQsXG4gICAgICAgIGN0b3JTdHJpbmcgPSBDdG9yID8gdG9Tb3VyY2UoQ3RvcikgOiB1bmRlZmluZWQ7XG5cbiAgICBpZiAoY3RvclN0cmluZykge1xuICAgICAgc3dpdGNoIChjdG9yU3RyaW5nKSB7XG4gICAgICAgIGNhc2UgZGF0YVZpZXdDdG9yU3RyaW5nOiByZXR1cm4gZGF0YVZpZXdUYWc7XG4gICAgICAgIGNhc2UgbWFwQ3RvclN0cmluZzogcmV0dXJuIG1hcFRhZztcbiAgICAgICAgY2FzZSBwcm9taXNlQ3RvclN0cmluZzogcmV0dXJuIHByb21pc2VUYWc7XG4gICAgICAgIGNhc2Ugc2V0Q3RvclN0cmluZzogcmV0dXJuIHNldFRhZztcbiAgICAgICAgY2FzZSB3ZWFrTWFwQ3RvclN0cmluZzogcmV0dXJuIHdlYWtNYXBUYWc7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG59XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgYW4gYXJyYXkgY2xvbmUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBjbG9uZS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgaW5pdGlhbGl6ZWQgY2xvbmUuXG4gKi9cbmZ1bmN0aW9uIGluaXRDbG9uZUFycmF5KGFycmF5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICByZXN1bHQgPSBhcnJheS5jb25zdHJ1Y3RvcihsZW5ndGgpO1xuXG4gIC8vIEFkZCBwcm9wZXJ0aWVzIGFzc2lnbmVkIGJ5IGBSZWdFeHAjZXhlY2AuXG4gIGlmIChsZW5ndGggJiYgdHlwZW9mIGFycmF5WzBdID09ICdzdHJpbmcnICYmIGhhc093blByb3BlcnR5LmNhbGwoYXJyYXksICdpbmRleCcpKSB7XG4gICAgcmVzdWx0LmluZGV4ID0gYXJyYXkuaW5kZXg7XG4gICAgcmVzdWx0LmlucHV0ID0gYXJyYXkuaW5wdXQ7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBJbml0aWFsaXplcyBhbiBvYmplY3QgY2xvbmUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGluaXRpYWxpemVkIGNsb25lLlxuICovXG5mdW5jdGlvbiBpbml0Q2xvbmVPYmplY3Qob2JqZWN0KSB7XG4gIHJldHVybiAodHlwZW9mIG9iamVjdC5jb25zdHJ1Y3RvciA9PSAnZnVuY3Rpb24nICYmICFpc1Byb3RvdHlwZShvYmplY3QpKVxuICAgID8gYmFzZUNyZWF0ZShnZXRQcm90b3R5cGUob2JqZWN0KSlcbiAgICA6IHt9O1xufVxuXG4vKipcbiAqIEluaXRpYWxpemVzIGFuIG9iamVjdCBjbG9uZSBiYXNlZCBvbiBpdHMgYHRvU3RyaW5nVGFnYC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBvbmx5IHN1cHBvcnRzIGNsb25pbmcgdmFsdWVzIHdpdGggdGFncyBvZlxuICogYEJvb2xlYW5gLCBgRGF0ZWAsIGBFcnJvcmAsIGBOdW1iZXJgLCBgUmVnRXhwYCwgb3IgYFN0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjbG9uZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSB0YWcgVGhlIGB0b1N0cmluZ1RhZ2Agb2YgdGhlIG9iamVjdCB0byBjbG9uZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNsb25lRnVuYyBUaGUgZnVuY3Rpb24gdG8gY2xvbmUgdmFsdWVzLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGluaXRpYWxpemVkIGNsb25lLlxuICovXG5mdW5jdGlvbiBpbml0Q2xvbmVCeVRhZyhvYmplY3QsIHRhZywgY2xvbmVGdW5jLCBpc0RlZXApIHtcbiAgdmFyIEN0b3IgPSBvYmplY3QuY29uc3RydWN0b3I7XG4gIHN3aXRjaCAodGFnKSB7XG4gICAgY2FzZSBhcnJheUJ1ZmZlclRhZzpcbiAgICAgIHJldHVybiBjbG9uZUFycmF5QnVmZmVyKG9iamVjdCk7XG5cbiAgICBjYXNlIGJvb2xUYWc6XG4gICAgY2FzZSBkYXRlVGFnOlxuICAgICAgcmV0dXJuIG5ldyBDdG9yKCtvYmplY3QpO1xuXG4gICAgY2FzZSBkYXRhVmlld1RhZzpcbiAgICAgIHJldHVybiBjbG9uZURhdGFWaWV3KG9iamVjdCwgaXNEZWVwKTtcblxuICAgIGNhc2UgZmxvYXQzMlRhZzogY2FzZSBmbG9hdDY0VGFnOlxuICAgIGNhc2UgaW50OFRhZzogY2FzZSBpbnQxNlRhZzogY2FzZSBpbnQzMlRhZzpcbiAgICBjYXNlIHVpbnQ4VGFnOiBjYXNlIHVpbnQ4Q2xhbXBlZFRhZzogY2FzZSB1aW50MTZUYWc6IGNhc2UgdWludDMyVGFnOlxuICAgICAgcmV0dXJuIGNsb25lVHlwZWRBcnJheShvYmplY3QsIGlzRGVlcCk7XG5cbiAgICBjYXNlIG1hcFRhZzpcbiAgICAgIHJldHVybiBjbG9uZU1hcChvYmplY3QsIGlzRGVlcCwgY2xvbmVGdW5jKTtcblxuICAgIGNhc2UgbnVtYmVyVGFnOlxuICAgIGNhc2Ugc3RyaW5nVGFnOlxuICAgICAgcmV0dXJuIG5ldyBDdG9yKG9iamVjdCk7XG5cbiAgICBjYXNlIHJlZ2V4cFRhZzpcbiAgICAgIHJldHVybiBjbG9uZVJlZ0V4cChvYmplY3QpO1xuXG4gICAgY2FzZSBzZXRUYWc6XG4gICAgICByZXR1cm4gY2xvbmVTZXQob2JqZWN0LCBpc0RlZXAsIGNsb25lRnVuYyk7XG5cbiAgICBjYXNlIHN5bWJvbFRhZzpcbiAgICAgIHJldHVybiBjbG9uZVN5bWJvbChvYmplY3QpO1xuICB9XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGluZGV4LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoPU1BWF9TQUZFX0lOVEVHRVJdIFRoZSB1cHBlciBib3VuZHMgb2YgYSB2YWxpZCBpbmRleC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgaW5kZXgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJbmRleCh2YWx1ZSwgbGVuZ3RoKSB7XG4gIGxlbmd0aCA9IGxlbmd0aCA9PSBudWxsID8gTUFYX1NBRkVfSU5URUdFUiA6IGxlbmd0aDtcbiAgcmV0dXJuICEhbGVuZ3RoICYmXG4gICAgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyB8fCByZUlzVWludC50ZXN0KHZhbHVlKSkgJiZcbiAgICAodmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8IGxlbmd0aCk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBnaXZlbiBhcmd1bWVudHMgYXJlIGZyb20gYW4gaXRlcmF0ZWUgY2FsbC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIHZhbHVlIGFyZ3VtZW50LlxuICogQHBhcmFtIHsqfSBpbmRleCBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIGluZGV4IG9yIGtleSBhcmd1bWVudC5cbiAqIEBwYXJhbSB7Kn0gb2JqZWN0IFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgb2JqZWN0IGFyZ3VtZW50LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBhcmd1bWVudHMgYXJlIGZyb20gYW4gaXRlcmF0ZWUgY2FsbCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSXRlcmF0ZWVDYWxsKHZhbHVlLCBpbmRleCwgb2JqZWN0KSB7XG4gIGlmICghaXNPYmplY3Qob2JqZWN0KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgdHlwZSA9IHR5cGVvZiBpbmRleDtcbiAgaWYgKHR5cGUgPT0gJ251bWJlcidcbiAgICAgICAgPyAoaXNBcnJheUxpa2Uob2JqZWN0KSAmJiBpc0luZGV4KGluZGV4LCBvYmplY3QubGVuZ3RoKSlcbiAgICAgICAgOiAodHlwZSA9PSAnc3RyaW5nJyAmJiBpbmRleCBpbiBvYmplY3QpXG4gICAgICApIHtcbiAgICByZXR1cm4gZXEob2JqZWN0W2luZGV4XSwgdmFsdWUpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBzdWl0YWJsZSBmb3IgdXNlIGFzIHVuaXF1ZSBvYmplY3Qga2V5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzS2V5YWJsZSh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICh0eXBlID09ICdzdHJpbmcnIHx8IHR5cGUgPT0gJ251bWJlcicgfHwgdHlwZSA9PSAnc3ltYm9sJyB8fCB0eXBlID09ICdib29sZWFuJylcbiAgICA/ICh2YWx1ZSAhPT0gJ19fcHJvdG9fXycpXG4gICAgOiAodmFsdWUgPT09IG51bGwpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgZnVuY2AgaGFzIGl0cyBzb3VyY2UgbWFza2VkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgZnVuY2AgaXMgbWFza2VkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzTWFza2VkKGZ1bmMpIHtcbiAgcmV0dXJuICEhbWFza1NyY0tleSAmJiAobWFza1NyY0tleSBpbiBmdW5jKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYSBwcm90b3R5cGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcHJvdG90eXBlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzUHJvdG90eXBlKHZhbHVlKSB7XG4gIHZhciBDdG9yID0gdmFsdWUgJiYgdmFsdWUuY29uc3RydWN0b3IsXG4gICAgICBwcm90byA9ICh0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IucHJvdG90eXBlKSB8fCBvYmplY3RQcm90bztcblxuICByZXR1cm4gdmFsdWUgPT09IHByb3RvO1xufVxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gaXMgbGlrZVxuICogW2BPYmplY3Qua2V5c2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5rZXlzKVxuICogZXhjZXB0IHRoYXQgaXQgaW5jbHVkZXMgaW5oZXJpdGVkIGVudW1lcmFibGUgcHJvcGVydGllcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gbmF0aXZlS2V5c0luKG9iamVjdCkge1xuICB2YXIgcmVzdWx0ID0gW107XG4gIGlmIChvYmplY3QgIT0gbnVsbCkge1xuICAgIGZvciAodmFyIGtleSBpbiBPYmplY3Qob2JqZWN0KSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgZnVuY2AgdG8gaXRzIHNvdXJjZSBjb2RlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc291cmNlIGNvZGUuXG4gKi9cbmZ1bmN0aW9uIHRvU291cmNlKGZ1bmMpIHtcbiAgaWYgKGZ1bmMgIT0gbnVsbCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gZnVuY1RvU3RyaW5nLmNhbGwoZnVuYyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgICB0cnkge1xuICAgICAgcmV0dXJuIChmdW5jICsgJycpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cbiAgcmV0dXJuICcnO1xufVxuXG4vKipcbiAqIFBlcmZvcm1zIGFcbiAqIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXNhbWV2YWx1ZXplcm8pXG4gKiBjb21wYXJpc29uIGJldHdlZW4gdHdvIHZhbHVlcyB0byBkZXRlcm1pbmUgaWYgdGhleSBhcmUgZXF1aXZhbGVudC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEgfTtcbiAqIHZhciBvdGhlciA9IHsgJ2EnOiAxIH07XG4gKlxuICogXy5lcShvYmplY3QsIG9iamVjdCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5lcShvYmplY3QsIG90aGVyKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5lcSgnYScsICdhJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5lcSgnYScsIE9iamVjdCgnYScpKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5lcShOYU4sIE5hTik7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGVxKHZhbHVlLCBvdGhlcikge1xuICByZXR1cm4gdmFsdWUgPT09IG90aGVyIHx8ICh2YWx1ZSAhPT0gdmFsdWUgJiYgb3RoZXIgIT09IG90aGVyKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGBhcmd1bWVudHNgIG9iamVjdCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcmd1bWVudHModmFsdWUpIHtcbiAgLy8gU2FmYXJpIDguMSBtYWtlcyBgYXJndW1lbnRzLmNhbGxlZWAgZW51bWVyYWJsZSBpbiBzdHJpY3QgbW9kZS5cbiAgcmV0dXJuIGlzQXJyYXlMaWtlT2JqZWN0KHZhbHVlKSAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgJiZcbiAgICAoIXByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwodmFsdWUsICdjYWxsZWUnKSB8fCBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBhcmdzVGFnKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBBcnJheWAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZS4gQSB2YWx1ZSBpcyBjb25zaWRlcmVkIGFycmF5LWxpa2UgaWYgaXQnc1xuICogbm90IGEgZnVuY3Rpb24gYW5kIGhhcyBhIGB2YWx1ZS5sZW5ndGhgIHRoYXQncyBhbiBpbnRlZ2VyIGdyZWF0ZXIgdGhhbiBvclxuICogZXF1YWwgdG8gYDBgIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gYE51bWJlci5NQVhfU0FGRV9JTlRFR0VSYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoJ2FiYycpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgIWlzRnVuY3Rpb24odmFsdWUpO1xufVxuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8uaXNBcnJheUxpa2VgIGV4Y2VwdCB0aGF0IGl0IGFsc28gY2hlY2tzIGlmIGB2YWx1ZWBcbiAqIGlzIGFuIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheS1saWtlIG9iamVjdCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZU9iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBpc0FycmF5TGlrZSh2YWx1ZSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBidWZmZXIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjMuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBidWZmZXIsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0J1ZmZlcihuZXcgQnVmZmVyKDIpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQnVmZmVyKG5ldyBVaW50OEFycmF5KDIpKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0J1ZmZlciA9IG5hdGl2ZUlzQnVmZmVyIHx8IHN0dWJGYWxzZTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYEZ1bmN0aW9uYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oXyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0Z1bmN0aW9uKC9hYmMvKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgLy8gVGhlIHVzZSBvZiBgT2JqZWN0I3RvU3RyaW5nYCBhdm9pZHMgaXNzdWVzIHdpdGggdGhlIGB0eXBlb2ZgIG9wZXJhdG9yXG4gIC8vIGluIFNhZmFyaSA4LTkgd2hpY2ggcmV0dXJucyAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXkgYW5kIG90aGVyIGNvbnN0cnVjdG9ycy5cbiAgdmFyIHRhZyA9IGlzT2JqZWN0KHZhbHVlKSA/IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpIDogJyc7XG4gIHJldHVybiB0YWcgPT0gZnVuY1RhZyB8fCB0YWcgPT0gZ2VuVGFnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGxvb3NlbHkgYmFzZWQgb25cbiAqIFtgVG9MZW5ndGhgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy10b2xlbmd0aCkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0xlbmd0aCgzKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTGVuZ3RoKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKEluZmluaXR5KTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aCgnMycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJlxuICAgIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuICEhdmFsdWUgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgcGxhaW4gb2JqZWN0LCB0aGF0IGlzLCBhbiBvYmplY3QgY3JlYXRlZCBieSB0aGVcbiAqIGBPYmplY3RgIGNvbnN0cnVjdG9yIG9yIG9uZSB3aXRoIGEgYFtbUHJvdG90eXBlXV1gIG9mIGBudWxsYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuOC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiB9XG4gKlxuICogXy5pc1BsYWluT2JqZWN0KG5ldyBGb28pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KHsgJ3gnOiAwLCAneSc6IDAgfSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KE9iamVjdC5jcmVhdGUobnVsbCkpO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3RMaWtlKHZhbHVlKSB8fFxuICAgICAgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgIT0gb2JqZWN0VGFnIHx8IGlzSG9zdE9iamVjdCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHByb3RvID0gZ2V0UHJvdG90eXBlKHZhbHVlKTtcbiAgaWYgKHByb3RvID09PSBudWxsKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgdmFyIEN0b3IgPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKHByb3RvLCAnY29uc3RydWN0b3InKSAmJiBwcm90by5jb25zdHJ1Y3RvcjtcbiAgcmV0dXJuICh0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmXG4gICAgQ3RvciBpbnN0YW5jZW9mIEN0b3IgJiYgZnVuY1RvU3RyaW5nLmNhbGwoQ3RvcikgPT0gb2JqZWN0Q3RvclN0cmluZyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIHR5cGVkIGFycmF5LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdHlwZWQgYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1R5cGVkQXJyYXkobmV3IFVpbnQ4QXJyYXkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KFtdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc1R5cGVkQXJyYXkgPSBub2RlSXNUeXBlZEFycmF5ID8gYmFzZVVuYXJ5KG5vZGVJc1R5cGVkQXJyYXkpIDogYmFzZUlzVHlwZWRBcnJheTtcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgcGxhaW4gb2JqZWN0IGZsYXR0ZW5pbmcgaW5oZXJpdGVkIGVudW1lcmFibGUgc3RyaW5nXG4gKiBrZXllZCBwcm9wZXJ0aWVzIG9mIGB2YWx1ZWAgdG8gb3duIHByb3BlcnRpZXMgb2YgdGhlIHBsYWluIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBwbGFpbiBvYmplY3QuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8uYXNzaWduKHsgJ2EnOiAxIH0sIG5ldyBGb28pO1xuICogLy8gPT4geyAnYSc6IDEsICdiJzogMiB9XG4gKlxuICogXy5hc3NpZ24oeyAnYSc6IDEgfSwgXy50b1BsYWluT2JqZWN0KG5ldyBGb28pKTtcbiAqIC8vID0+IHsgJ2EnOiAxLCAnYic6IDIsICdjJzogMyB9XG4gKi9cbmZ1bmN0aW9uIHRvUGxhaW5PYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIGNvcHlPYmplY3QodmFsdWUsIGtleXNJbih2YWx1ZSkpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLiBTZWUgdGhlXG4gKiBbRVMgc3BlY10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LmtleXMpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5cyhuZXcgRm9vKTtcbiAqIC8vID0+IFsnYScsICdiJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqXG4gKiBfLmtleXMoJ2hpJyk7XG4gKiAvLyA9PiBbJzAnLCAnMSddXG4gKi9cbmZ1bmN0aW9uIGtleXMob2JqZWN0KSB7XG4gIHJldHVybiBpc0FycmF5TGlrZShvYmplY3QpID8gYXJyYXlMaWtlS2V5cyhvYmplY3QpIDogYmFzZUtleXMob2JqZWN0KTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gYW5kIGluaGVyaXRlZCBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5c0luKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InLCAnYyddIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKi9cbmZ1bmN0aW9uIGtleXNJbihvYmplY3QpIHtcbiAgcmV0dXJuIGlzQXJyYXlMaWtlKG9iamVjdCkgPyBhcnJheUxpa2VLZXlzKG9iamVjdCwgdHJ1ZSkgOiBiYXNlS2V5c0luKG9iamVjdCk7XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5hc3NpZ25gIGV4Y2VwdCB0aGF0IGl0IHJlY3Vyc2l2ZWx5IG1lcmdlcyBvd24gYW5kXG4gKiBpbmhlcml0ZWQgZW51bWVyYWJsZSBzdHJpbmcga2V5ZWQgcHJvcGVydGllcyBvZiBzb3VyY2Ugb2JqZWN0cyBpbnRvIHRoZVxuICogZGVzdGluYXRpb24gb2JqZWN0LiBTb3VyY2UgcHJvcGVydGllcyB0aGF0IHJlc29sdmUgdG8gYHVuZGVmaW5lZGAgYXJlXG4gKiBza2lwcGVkIGlmIGEgZGVzdGluYXRpb24gdmFsdWUgZXhpc3RzLiBBcnJheSBhbmQgcGxhaW4gb2JqZWN0IHByb3BlcnRpZXNcbiAqIGFyZSBtZXJnZWQgcmVjdXJzaXZlbHkuIE90aGVyIG9iamVjdHMgYW5kIHZhbHVlIHR5cGVzIGFyZSBvdmVycmlkZGVuIGJ5XG4gKiBhc3NpZ25tZW50LiBTb3VyY2Ugb2JqZWN0cyBhcmUgYXBwbGllZCBmcm9tIGxlZnQgdG8gcmlnaHQuIFN1YnNlcXVlbnRcbiAqIHNvdXJjZXMgb3ZlcndyaXRlIHByb3BlcnR5IGFzc2lnbm1lbnRzIG9mIHByZXZpb3VzIHNvdXJjZXMuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIG11dGF0ZXMgYG9iamVjdGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjUuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHsuLi5PYmplY3R9IFtzb3VyY2VzXSBUaGUgc291cmNlIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0ge1xuICogICAnYSc6IFt7ICdiJzogMiB9LCB7ICdkJzogNCB9XVxuICogfTtcbiAqXG4gKiB2YXIgb3RoZXIgPSB7XG4gKiAgICdhJzogW3sgJ2MnOiAzIH0sIHsgJ2UnOiA1IH1dXG4gKiB9O1xuICpcbiAqIF8ubWVyZ2Uob2JqZWN0LCBvdGhlcik7XG4gKiAvLyA9PiB7ICdhJzogW3sgJ2InOiAyLCAnYyc6IDMgfSwgeyAnZCc6IDQsICdlJzogNSB9XSB9XG4gKi9cbnZhciBtZXJnZSA9IGNyZWF0ZUFzc2lnbmVyKGZ1bmN0aW9uKG9iamVjdCwgc291cmNlLCBzcmNJbmRleCkge1xuICBiYXNlTWVyZ2Uob2JqZWN0LCBzb3VyY2UsIHNyY0luZGV4KTtcbn0pO1xuXG4vKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgYSBuZXcgZW1wdHkgYXJyYXkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjEzLjBcbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBlbXB0eSBhcnJheS5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIGFycmF5cyA9IF8udGltZXMoMiwgXy5zdHViQXJyYXkpO1xuICpcbiAqIGNvbnNvbGUubG9nKGFycmF5cyk7XG4gKiAvLyA9PiBbW10sIFtdXVxuICpcbiAqIGNvbnNvbGUubG9nKGFycmF5c1swXSA9PT0gYXJyYXlzWzFdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIHN0dWJBcnJheSgpIHtcbiAgcmV0dXJuIFtdO1xufVxuXG4vKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgYGZhbHNlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMTMuMFxuICogQGNhdGVnb3J5IFV0aWxcbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udGltZXMoMiwgXy5zdHViRmFsc2UpO1xuICogLy8gPT4gW2ZhbHNlLCBmYWxzZV1cbiAqL1xuZnVuY3Rpb24gc3R1YkZhbHNlKCkge1xuICByZXR1cm4gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWVyZ2U7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IG1lcmdlID0gcmVxdWlyZSgnbG9kYXNoLm1lcmdlJyk7XG5cbmNvbnN0IEJhc2UgPSByZXF1aXJlKCcuL2Jhc2UuanMnKTtcbmNvbnN0IFN0cmF0ZWd5ID0gcmVxdWlyZSgnLi9zdHJhdGVneS5qcycpO1xuY29uc3QgSWRlbnRpZmllciA9IHJlcXVpcmUoJy4vaWRlbnRpZmllci5qcycpO1xuY29uc3QgVHJpcGxlID0gcmVxdWlyZSgnLi90cmlwbGUuanMnKTtcbmNvbnN0IExTZXFOb2RlID0gcmVxdWlyZSgnLi9sc2Vxbm9kZS5qcycpO1xuXG5jb25zdCBFeE91dE9mQm91bmRzID0gcmVxdWlyZSgnLi9leG91dG9mYm91bmRzLmpzJyk7XG5cblxuLyoqXG4gKiBEaXN0cmlidXRlZCBhcnJheSB1c2luZyBMU2VxIGFsbG9jYXRpb24gc3RyYXRlZ3kgd2l0aCBhbiB1bmRlcmx5aW5nXG4gKiBleHBvbmVudGlhbCB0cmVlLlxuICovXG5jbGFzcyBMU2VxVHJlZSB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBnbG9iYWxseSB1bmlxdWUgc2l0ZSBpZGVudGlmaWVyLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gVGhlIG9wdGlvbnMgb2YgdGhlIExTZXFUcmVlLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5ib3VuZGFyeSA9IDEwXSBUaGUgbWF4aW1hbCBpbnRlcnZhbCBiZXR3ZWVuIHR3b1xuICAgICAqIGdlbmVyYXRlZCBub2Rlcy5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuYmFzZSA9IDE1XSBUaGUgYmFzZSwgaS5lLiwgdGhlIG1heGltYWwgYXJpdHkgb2ZcbiAgICAgKiB0aGUgcm9vdCBub2RlLiBEZWZhdWx0IGlzIDIqKjE1LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yIChzaXRlLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgbGV0IGxpc3RUcmlwbGU7XG4gICAgICAgIC8vICMwIHByb2Nlc3Mgb3B0aW9uc1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBtZXJnZSh7IGJvdW5kYXJ5OiAxMCwgYmFzZTogMTUgfSwgb3B0aW9ucyk7XG5cbiAgICAgICAgLy8gIzEgaW5pdGlhbGl6ZSBzb3VyY2UsIGNvdW50ZXIsIGFuZCBzdHJhdGVneSBjaG9pY2VcbiAgICAgICAgdGhpcy5fcyA9IHNpdGU7XG4gICAgICAgIHRoaXMuX2MgPSAwO1xuICAgICAgICB0aGlzLl9oYXNoID0gKGRlcHRoKSA9PiBkZXB0aCUyO1xuXG4gICAgICAgIHRoaXMuX2Jhc2UgPSBuZXcgQmFzZSh0aGlzLm9wdGlvbnMuYmFzZSk7XG4gICAgICAgIHRoaXMuX3N0cmF0ZWd5ID0gbmV3IFN0cmF0ZWd5KHRoaXMuX2Jhc2UsIHRoaXMub3B0aW9ucy5ib3VuZGFyeSk7XG5cbiAgICAgICAgLy8gIzIgaW5pdGlhbGl6ZSB0cmVlIHN0cnVjdHVyZSB3aXRoIG1heGltYWwgYm91bmRzXG4gICAgICAgIHRoaXMucm9vdCA9IG5ldyBMU2VxTm9kZSgpO1xuICAgICAgICAvLyAjQSBtaW5pbWFsIGJvdW5kXG4gICAgICAgIHRoaXMucm9vdC5hZGQobmV3IExTZXFOb2RlKFtuZXcgVHJpcGxlKDAsMCwwKV0sICcnKSk7XG4gICAgICAgIC8vICNCIG1heGltYWwgYm91bmRcbiAgICAgICAgdGhpcy5yb290LmFkZChcbiAgICAgICAgICAgIG5ldyBMU2VxTm9kZShbbmV3IFRyaXBsZShNYXRoLnBvdygyLCB0aGlzLl9iYXNlLmdldEJpdEJhc2UoMCkpIC0gMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOdW1iZXIuTUFYX1ZBTFVFLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE51bWJlci5NQVhfVkFMVUUpXSwgJycpKTtcbiAgICB9O1xuXG4gICAgXG4gICAgZ2V0IGxlbmd0aCAoKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSB0aGlzLnJvb3Quc3ViQ291bnRlciAtIDI7IC8vIC0yOiB0aGUgYm91bmRhcmllc1xuICAgICAgICByZXN1bHQgPSAodGhpcy5yb290Ll9oYXNFbGVtZW50ICYmIHJlc3VsdCArIDEpIHx8IHJlc3VsdDtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuICAgIFxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgZWxlbWVudCBhdCB0YXJnZXRlZCBpbmRleCBpbiB0aGUgbGluZWFyaXplZCBzZXF1ZW5jZS4gSXQgZG9lcyBub3RcbiAgICAgKiB0YWtlIGludG8gYWNjb3VudCB0aGUgaGlkZGVuIGJvdW5kYXJpZXMgb2YgdGhlIHNlcXVlbmNlIFtNSU4sIGVfMSwgZV8yLFxuICAgICAqIC4uLiBlX2xlbmd0aCwgTUFYXSwgaGVuY2UgaW5kZXggb2YgZV8xIGlzIDAuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4IFRoZSBpbmRleCBvZiB0aGUgZWxlbWVudCBpbiB0aGUgZmxhdHRlbmVkIGFycmF5LlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIGVsZW1lbnQgbG9jYXRlZCBhdCB0aGUgaW5kZXggaW4gYXJndW1lbnQuXG4gICAgICovXG4gICAgZ2V0IChpbmRleCkge1xuICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXhPdXRPZkJvdW5kcyhpbmRleCwgdGhpcy5sZW5ndGgpO1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgbGV0IG5vZGUgPSB0aGlzLnJvb3QuZ2V0KGluZGV4ICsgMSk7XG4gICAgICAgIHdoaWxlICghbm9kZS5pc0xlYWYpe1xuICAgICAgICAgICAgbm9kZSA9IG5vZGUuY2hpbGQ7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBub2RlLmU7XG4gICAgfTtcbiAgICBcbiAgICAvKipcbiAgICAgKiBAcHJpdmF0ZSBHZXQgdGhlIExTZXFOb2RlIGF0IHRhcmdldGVkIGluZGV4IGluIHRoZSBsaW5lYXJpemVkXG4gICAgICogc2VxdWVuY2UuIFRoZSBzZXF1ZW5jZSBpbmNsdWRlcyB0aGUgaGlkZGVuIGJvdW5kYXJpZXMgW01JTiwgZV8xLCBlXzIsXG4gICAgICogLi4uIGVfbGVuZ3RoLCBNQVhdLCBoZW5jZSBlXzEncyBpbmRleCBpcyAxLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleCBUaGUgaW5kZXggb2YgdGhlIGVsZW1lbnQgaW4gdGhlIGZsYXR0ZW5lZCBhcnJheS5cbiAgICAgKiBAcmV0dXJuIHtMU2VxTm9kZX0gVGhlIExTZXFOb2RlIHRhcmdldGluZyB0aGUgZWxlbWVudCBhdCBpbmRleC5cbiAgICAgKi9cbiAgICBfZ2V0IChpbmRleCkge1xuICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMubGVuZ3RoICsgMikgeyAvLyArMjogYm91bmRhcmllc1xuICAgICAgICAgICAgdGhyb3cgbmV3IEV4T3V0T2ZCb3VuZHMoaW5kZXgsIHRoaXMubGVuZ3RoICsgMik7XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gdGhpcy5yb290LmdldChpbmRleCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEluc2VydCBhIHZhbHVlIGF0IHRoZSB0YXJnZXRlZCBpbmRleC5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZWxlbWVudCBUaGUgZWxlbWVudCB0byBpbnNlcnQsIGUuZy4gYSBjaGFyYWN0ZXIgaWYgdGhlXG4gICAgICogc2VxdWVuY2UgaXMgYSBzdHJpbmcuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4IFRoZSBwb3NpdGlvbiBpbiB0aGUgYXJyYXkuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSB7X2U6IGVsZW1lbnQgb2YgT2JqZWN0IHR5cGUsIF9pOiBJZGVudGlmaWVyfVxuICAgICAqL1xuICAgIGluc2VydCAoZWxlbWVudCwgaW5kZXgpIHtcbiAgICAgICAgY29uc3QgcGVpID0gdGhpcy5fZ2V0KGluZGV4KSwgLy8gIzFhIHByZXZpb3VzIGJvdW5kXG4gICAgICAgICAgICAgIHFlaSA9IHRoaXMuX2dldChpbmRleCsxKTsgLy8gIzFiIG5leHQgYm91bmRcblxuICAgICAgICAgLy8gIzJhIGluY3JlbWVudGluZyB0aGUgbG9jYWwgY291bnRlclxuICAgICAgICB0aGlzLl9jICs9IDE7XG4gICAgICAgIC8vICMyYiBnZW5lcmF0aW5nIHRoZSBpZCBpbmJldHdlZW4gdGhlIGJvdW5kc1xuICAgICAgICBjb25zdCBpZCA9IHRoaXMuYWxsb2MocGVpLCBxZWkpO1xuXG4gICAgICAgIC8vICMzIGFkZCBpdCB0byB0aGUgc3RydWN0dXJlIGFuZCByZXR1cm4gdmFsdWVcbiAgICAgICAgY29uc3QgcGFpciA9IHtlbGVtOiBlbGVtZW50LCBpZDogaWR9O1xuICAgICAgICB0aGlzLmFwcGx5SW5zZXJ0KHBhaXIpO1xuICAgICAgICByZXR1cm4gcGFpcjtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRGVsZXRlIHRoZSBlbGVtZW50IGF0IHRoZSBpbmRleC5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXggVGhlIGluZGV4IG9mIHRoZSBlbGVtZW50IHRvIGRlbGV0ZSBpbiB0aGUgYXJyYXkuXG4gICAgICogQHJldHVybiB7SWRlbnRpZmllcn0gVGhlIGlkZW50aWZpZXIgb2YgdGhlIGVsZW1lbnQgYXQgdGhlIGluZGV4LlxuICAgICAqL1xuICAgIHJlbW92ZSAoaW5kZXgpIHtcbiAgICAgICAgY29uc3QgZWkgPSB0aGlzLl9nZXQoaW5kZXggKyAxKTtcbiAgICAgICAgY29uc3QgaSA9IG5ldyBJZGVudGlmaWVyKHRoaXMuX2Jhc2UpLmZyb21Ob2RlKGVpKTtcbiAgICAgICAgdGhpcy5hcHBseVJlbW92ZShlaSk7XG4gICAgICAgIHJldHVybiBpO1xuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlIHRoZSBkaWdpdCBwYXJ0IG9mIHRoZSBpZGVudGlmaWVycyAgYmV0d2VlbiBwIGFuZCBxLlxuICAgICAqIEBwYXJhbSB7TFNlcU5vZGV9IHAgVGhlIGRpZ2l0IHBhcnQgb2YgdGhlIHByZXZpb3VzIGlkZW50aWZpZXIuXG4gICAgICogQHBhcmFtIHtMU2VxTm9kZX0gcSBUaGUgZGlnaXQgcGFydCBvZiB0aGUgbmV4dCBpZGVudGlmaWVyLlxuICAgICAqIEByZXR1cm4ge0lkZW50aWZpZXJ9IFRoZSBuZXcgaWRlbnRpZmllciBsb2NhdGVkIGJldHdlZW4gcCBhbmQgcS5cbiAgICAgKi9cbiAgICBhbGxvYyAocCwgcSkge1xuICAgICAgICBsZXQgaW50ZXJ2YWwgPSAwLCBsZXZlbCA9IDA7XG4gICAgICAgIC8vICMxIHByb2Nlc3MgdGhlIGxldmVsIG9mIHRoZSBuZXcgaWRlbnRpZmllclxuICAgICAgICB3aGlsZSAoaW50ZXJ2YWwgPD0gMCkgeyAvLyBubyByb29tIGZvciBpbnNlcnRpb25cbiAgICAgICAgICAgIGludGVydmFsID0gdGhpcy5fYmFzZS5nZXRJbnRlcnZhbChsZXZlbCwgcCwgcSk7XG4gICAgICAgICAgICArK2xldmVsO1xuICAgICAgICB9O1xuICAgICAgICBsZXZlbCAtPSAxO1xuICAgICAgICBpZiAodGhpcy5faGFzaChsZXZlbCkgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdHJhdGVneS5iUGx1cyhwLCBxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldmVsLCBpbnRlcnZhbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zLCB0aGlzLl9jKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdHJhdGVneS5iTWludXMocCwgcSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV2ZWwsIGludGVydmFsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zLCB0aGlzLl9jKTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIFxuICAgIFxuICAgIC8qKlxuICAgICAqIEluc2VydCBhbiBlbGVtZW50IGNyZWF0ZWQgZnJvbSBhIHJlbW90ZSBzaXRlIGludG8gdGhlIGFycmF5LlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYWlyIFBhaXIgY29udGFpbmluZyB0aGUgaWRlbnRpZmllciBhbmQgdGhlIGVsZW1lbnQgdG9cbiAgICAgKiBpbnNlcnQgaW4gdGhlIGRhdGEgc3RydWN0dXJlLlxuICAgICAqIEBwYXJhbSB7SWRlbnRpZmllcnxMU2VxTm9kZX0gcGFpci5pZCBUaGUgaWRlbnRpZmllciBvZiB0aGUgZWxlbWVudC5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcGFpci5lbGVtIFRoZSBlbGVtZW50IHRvIGluc2VydC5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtub0luZGV4ID0gdHJ1ZV0gV2hldGhlciBvciBub3QgaXQgc2hvdWxkIHJldHVybiB0aGVcbiAgICAgKiBpbmRleCBvZiB0aGUgaW5zZXJ0LlxuICAgICAqIEByZXR1cm4ge051bWJlcnxCb29sZWFufSBUaGUgaW5kZXggb2YgdGhlIG5ld2x5IGluc2VydGVkIGVsZW1lbnQgaW4gdGhlXG4gICAgICogYXJyYXksIGlmIGFza2VkLiAtMSBpZiB0aGUgZWxlbWVudCBhbHJlYWR5IGV4aXN0cyBhbmQgaGFzIG5vdCBiZWVuIGFkZGVkLlxuICAgICAqIElmIG5vSW5kZXgsIHJldHVybnMgdHJ1ZSBpZiB0aGUgZWxlbWVudCBoYXMgYmVlbiBhZGRlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAqL1xuICAgIGFwcGx5SW5zZXJ0IChwYWlyLCBub0luZGV4ID0gdHJ1ZSkge1xuICAgICAgICBsZXQgbm9kZSwgcmVzdWx0LCBpO1xuICAgICAgICAvLyAjMCBjYXN0IGZyb20gdGhlIHByb3BlciB0eXBlXG4gICAgICAgIC8vICMwQSB0aGUgaWRlbnRpZmllciBpcyBhbiBJZGVudGlmaWVyXG4gICAgICAgIGkgPSBwYWlyLmlkO1xuICAgICAgICBub2RlID0gIGkgJiYgaS5fZCAmJiBpLl9zICYmIGkuX2MgJiZcbiAgICAgICAgICAgIChuZXcgSWRlbnRpZmllcih0aGlzLl9iYXNlLCBpLl9kLCBpLl9zLCBpLl9jKS50b05vZGUocGFpci5lbGVtKSk7XG4gICAgICAgIC8vICMwQiB0aGUgaWRlbnRpZmllciBpcyBhIExTZXFOb2RlXG4gICAgICAgIG5vZGUgPSAoaSAmJiBpLnQgJiYgaS5jaGlsZHJlbiAmJiBMU2VxTm9kZS5mcm9tSlNPTihpKSkgfHwgbm9kZTtcbiAgICAgICAgLy8gIzEgaW50ZWdyYXRlcyB0aGUgbmV3IGVsZW1lbnQgdG8gdGhlIGRhdGEgc3RydWN0dXJlXG4gICAgICAgIHJlc3VsdCA9IHRoaXMucm9vdC5hZGQobm9kZSk7XG4gICAgICAgIC8vICMyIGlmIHRoZSBlbGVtZW50IGFzIGJlZW4gYWRkZWRcbiAgICAgICAgaWYgKG5vSW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0gZWxzZSBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yb290LmluZGV4T2Yobm9kZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH07ICAgICAgICBcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRGVsZXRlIHRoZSBlbGVtZW50IHdpdGggdGhlIHRhcmdldGVkIGlkZW50aWZpZXIuXG4gICAgICogQHBhcmFtIHtJZGVudGlmaWVyfExTZXFOb2RlfSBpIFRoZSBpZGVudGlmaWVyIG9mIHRoZSBlbGVtZW50LlxuICAgICAqIEByZXR1cm4ge051bWJlcn0gVGhlIGluZGV4IG9mIHRoZSBlbGVtZW50IGZyZXNobHkgZGVsZXRlZCwgLTEgaWYgbm9cbiAgICAgKiByZW1vdmFsLlxuICAgICAqL1xuICAgIGFwcGx5UmVtb3ZlIChpKSB7XG4gICAgICAgIGxldCBub2RlLCBwb3NpdGlvbjtcbiAgICAgICAgLy8gIzAgY2FzdCBmcm9tIHRoZSBwcm9wZXIgdHlwZVxuICAgICAgICBub2RlID0gaSAmJiBpLl9kICYmIGkuX3MgJiYgaS5fYyAmJlxuICAgICAgICAgICAgKG5ldyBJZGVudGlmaWVyKHRoaXMuX2Jhc2UsIGkuX2QsIGkuX3MsIGkuX2MpKS50b05vZGUobnVsbCk7XG4gICAgICAgIC8vICMwQiB0aGUgaWRlbnRpZmllciBpcyBhIExTRVFOb2RlXG4gICAgICAgIG5vZGUgPSAoaSAmJiBpLnQgJiYgaS5jaGlsZHJlbiAmJiBMU2VxTm9kZS5mcm9tSlNPTihpKSkgfHwgbm9kZTtcbiAgICAgICAgLy8gIzEgZ2V0IHRoZSBpbmRleCBvZiB0aGUgZWxlbWVudCB0byByZW1vdmVcbiAgICAgICAgcG9zaXRpb24gPSB0aGlzLnJvb3QuaW5kZXhPZihub2RlKTtcbiAgICAgICAgaWYgKHBvc2l0aW9uICE9PSAtMSl7XG4gICAgICAgICAgICAvLyAjMiBpZiBpdCBleGlzdHMgcmVtb3ZlIGl0XG4gICAgICAgICAgICB0aGlzLnJvb3QuZGVsKG5vZGUpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcG9zaXRpb247XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENhc3QgdGhlIEpTT04gb2JqZWN0IGludG8gYSBwcm9wZXIgTFNlcVRyZWUuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCB0aGUgSlNPTiBvYmplY3QgdG8gY2FzdC5cbiAgICAgKiBAcmV0dXJuIHtMU2VxVHJlZX0gQSBzZWxmIHJlZmVyZW5jZS5cbiAgICAgKi9cbiAgICBmcm9tSlNPTiAob2JqZWN0KSB7XG4gICAgICAgIC8vICMxIGNvcHkgdGhlIHNvdXJjZSwgY291bnRlciwgYW5kIGxlbmd0aCBvZiB0aGUgb2JqZWN0XG4gICAgICAgIHRoaXMuX3MgPSBvYmplY3QuX3M7XG4gICAgICAgIHRoaXMuX2MgPSBvYmplY3QuX2M7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9iamVjdC5vcHRpb25zO1xuXG4gICAgICAgIHRoaXMuX2Jhc2UgPSBuZXcgQmFzZSh0aGlzLm9wdGlvbnMuYmFzZSk7XG4gICAgICAgIHRoaXMuX2JvdW5kYXJ5ID0gbmV3IFN0cmF0ZWd5KHRoaXMuX2Jhc2UsIHRoaXMub3B0aW9ucy5ib3VuZGFyeSk7XG4gICAgICAgIFxuICAgICAgICAvLyAjMiBkZXB0aCBmaXJzdCBhZGRpbmdcbiAgICAgICAgY29uc3QgZGVwdGhGaXJzdCA9IChjdXJyZW50Tm9kZSwgY3VycmVudFBhdGgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRyaXBsZSA9IG5ldyBUcmlwbGUoY3VycmVudE5vZGUudC5wLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Tm9kZS50LnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlLnQuYyk7XG4gICAgICAgICAgICBjdXJyZW50UGF0aC5wdXNoKHRyaXBsZSk7IC8vIHN0YWNrXG4gICAgICAgICAgICBpZiAoY3VycmVudE5vZGUuZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMucm9vdC5hZGQobmV3IExTZXFOb2RlKGN1cnJlbnRQYXRoLnNsaWNlKCksIGN1cnJlbnROb2RlLmUpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGN1cnJlbnROb2RlLmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgZGVwdGhGaXJzdChjdXJyZW50Tm9kZS5jaGlsZHJlbltpXSwgY3VycmVudFBhdGgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGN1cnJlbnRQYXRoLnBvcCgpOyAvLyB1bnN0YWNrXG4gICAgICAgIH07XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2JqZWN0LnJvb3QuY2hpbGRyZW4ubGVuZ3RoOyArK2kpe1xuICAgICAgICAgICAgZGVwdGhGaXJzdChvYmplY3Qucm9vdC5jaGlsZHJlbltpXSwgW10pO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9OyAgICBcbiAgICBcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTFNlcVRyZWU7XG4iXX0=
