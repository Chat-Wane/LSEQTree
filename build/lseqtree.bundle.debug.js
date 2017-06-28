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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhc2UuanMiXSwibmFtZXMiOlsiQmFzZSIsImIiLCJfYiIsImxldmVsIiwibiIsImdldEJpdEJhc2UiLCJtIiwicCIsInEiLCJzdW0iLCJpIiwicElzR3JlYXRlciIsImNvbW1vblJvb3QiLCJwcmV2VmFsdWUiLCJuZXh0VmFsdWUiLCJ0IiwiTWF0aCIsInBvdyIsImNoaWxkIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7Ozs7Ozs7OztJQUlNQSxJO0FBQ0Y7OztBQUdBLG9CQUFvQjtBQUFBLFlBQVBDLENBQU8sdUVBQUgsQ0FBRzs7QUFBQTs7QUFDaEIsYUFBS0MsRUFBTCxHQUFVRCxDQUFWO0FBQ0g7Ozs7OztBQUVEOzs7Ozs7O21DQU9ZRSxLLEVBQU87QUFDZixtQkFBTyxLQUFLRCxFQUFMLEdBQVVDLEtBQWpCO0FBQ0g7Ozs7O0FBRUQ7Ozs7Ozs7a0NBT1dBLEssRUFBTztBQUNkLGdCQUFNQyxJQUFJLEtBQUtDLFVBQUwsQ0FBZ0JGLEtBQWhCLENBQVY7QUFDQSxnQkFBTUcsSUFBSSxLQUFLSixFQUFMLEdBQVUsQ0FBcEI7QUFDQSxtQkFBUUUsS0FBS0EsSUFBSSxDQUFULENBQUQsR0FBZ0IsQ0FBaEIsR0FBcUJFLEtBQUtBLElBQUksQ0FBVCxJQUFjLENBQTFDO0FBQ0g7Ozs7O0FBRUQ7Ozs7Ozs7O29DQVFhSCxLLEVBQU9JLEMsRUFBR0MsQyxFQUFHO0FBQ3RCLGdCQUFJQyxNQUFNLENBQVY7QUFBQSxnQkFBYUMsSUFBSSxDQUFqQjtBQUFBLGdCQUNJQyxhQUFhLEtBRGpCO0FBQUEsZ0JBQ3dCQyxhQUFhLElBRHJDO0FBQUEsZ0JBRUlDLFlBQVksQ0FGaEI7QUFBQSxnQkFFbUJDLFlBQVksQ0FGL0I7O0FBSUEsbUJBQU9KLEtBQUtQLEtBQVosRUFBbUI7QUFDZlUsNEJBQWFOLEtBQUtBLEVBQUVRLENBQUYsQ0FBSVIsQ0FBVixJQUFnQixDQUE1QjtBQUNBTyw0QkFBYU4sS0FBS0EsRUFBRU8sQ0FBRixDQUFJUixDQUFWLElBQWdCLENBQTVCO0FBQ0E7QUFDQSxvQkFBSUssY0FBY0MsY0FBY0MsU0FBaEMsRUFBMkM7QUFDdkNGLGlDQUFhLEtBQWI7QUFDQUQsaUNBQWFFLFlBQVlDLFNBQXpCO0FBQ0g7QUFDRDtBQUNBLG9CQUFJSCxVQUFKLEVBQWdCO0FBQUVHLGdDQUFZRSxLQUFLQyxHQUFMLENBQVMsQ0FBVCxFQUFXLEtBQUtaLFVBQUwsQ0FBZ0JLLENBQWhCLENBQVgsSUFBK0IsQ0FBM0M7QUFBK0M7QUFDakUsb0JBQUlFLGNBQWNELFVBQWQsSUFBNEJELE1BQU1QLEtBQXRDLEVBQTZDO0FBQ3pDTSwyQkFBT0ssWUFBWUQsU0FBbkI7QUFDSCxpQkFGRCxNQUVPO0FBQ0hKLDJCQUFPSyxZQUFZRCxTQUFaLEdBQXdCLENBQS9CO0FBQ0g7QUFDRCxvQkFBSUgsTUFBSVAsS0FBUixFQUFjO0FBQUVNLDJCQUFPTyxLQUFLQyxHQUFMLENBQVMsQ0FBVCxFQUFXLEtBQUtaLFVBQUwsQ0FBZ0JLLElBQUUsQ0FBbEIsQ0FBWCxDQUFQO0FBQTBDO0FBQzFEO0FBQ0FILG9CQUFJQSxLQUFLQSxFQUFFVyxLQUFQLElBQWdCLElBQXBCO0FBQ0FWLG9CQUFJQSxLQUFLQSxFQUFFVSxLQUFQLElBQWdCLElBQXBCO0FBQ0Esa0JBQUVSLENBQUY7QUFDSDtBQUNELG1CQUFPRCxHQUFQO0FBQ0g7Ozs7OztBQUVKOztBQUVEVSxPQUFPQyxPQUFQLEdBQWlCcEIsSUFBakIiLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGFuZCB1dGlsIGNsYXNzIG9mIHRoZSBiYXNlLCBpLmUuIHRoZSBtYXhpbWFsIGFyaXR5IG9mIHRoZSBmaXJzdFxuICogbGV2ZWwgb2YgdGhlIHRyZWUuXG4gKi9cbmNsYXNzIEJhc2Uge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbYiA9IDNdIFRoZSBudW1iZXIgb2YgYml0cyBhdCBsZXZlbCAwIG9mIHRoZSBkZW5zZSBzcGFjZS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvciAoYiA9IDMpIHtcbiAgICAgICAgdGhpcy5fYiA9IGI7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFByb2Nlc3MgdGhlIG51bWJlciBvZiBiaXRzIHVzYWdlIGF0IGEgY2VydGFpbiBsZXZlbCBvZiBkZW5zZSBzcGFjZS5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbGV2ZWwgVGhlIGxldmVsIGluIGRlbnNlIHNwYWNlLCBpLmUuLCB0aGUgbnVtYmVyIG9mXG4gICAgICogY29uY2F0ZW5hdGlvbnMgb2YgdGhlIGlkZW50aWZpZXIuXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBUaGUgbnVtYmVyIG9mIGJpdCB0byBlbmNvZGUgYSBzaW5nbGUgcGF0aCBjb25jYXRlbmF0aW9uXG4gICAgICogYXQgdGhlIGRlcHRoIGluIGFyZ3VtZW50LlxuICAgICAqL1xuICAgIGdldEJpdEJhc2UgKGxldmVsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iICsgbGV2ZWw7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFByb2Nlc3MgdGhlIHRvdGFsIG51bWJlciBvZiBiaXRzIHVzYWdlIHRvIGdldCB0byBhIGNlcnRhaW4gbGV2ZWwuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGxldmVsIFRoZSBsZXZlbCBpbiBkZW5zZSBzcGFjZSwgaS5lLiwgdGhlIG51bWJlciBvZlxuICAgICAqIGNvbmNhdGVuYXRpb25zIG9mIHRoZSBpZGVudGlmaWVyLlxuICAgICAqIEByZXR1cm4ge051bWJlcn0gVGhlIG51bWJlciBvZiBiaXRzIHJlcXVpcmVkIHRvIGVuY29kZSB0aGUgcGF0aFxuICAgICAqIGNvbXByaXNpbmcgbGV2ZWwgY29uY2F0ZW5hdGlvbnMuXG4gICAgICovXG4gICAgZ2V0U3VtQml0IChsZXZlbCkge1xuICAgICAgICBjb25zdCBuID0gdGhpcy5nZXRCaXRCYXNlKGxldmVsKTtcbiAgICAgICAgY29uc3QgbSA9IHRoaXMuX2IgLSAxOyAgICAgICBcbiAgICAgICAgcmV0dXJuIChuICogKG4gKyAxKSkgLyAyIC0gKG0gKiAobSArIDEpIC8gMik7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFByb2Nlc3MgdGhlIG51bWJlciBvZiBwb3NzaWJsZSBwYXRocyBiZXR3ZWVuIHR3byBMU0VRTm9kZS5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbGV2ZWwgVGhlIGRlcHRoIG9mIHRoZSB0cmVlIHRvIHByb2Nlc3MuXG4gICAgICogQHBhcmFtIHtMU2VxTm9kZX0gcCBUaGUgcHJldmlvdXMgTFNlcU5vZGUuXG4gICAgICogQHBhcmFtIHtMU2VxTm9kZX0gcSBUaGUgbmV4dCBMU2VxTm9kZS5cbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSBpbnRlcnZhbCBiZXR3ZWVuIHRoZSB0d28gbm9kZXMgYXQgdGhlIGRlcHRoIGluXG4gICAgICogYXJndW1lbnQuXG4gICAgICovXG4gICAgZ2V0SW50ZXJ2YWwgKGxldmVsLCBwLCBxKSB7ICAgICAgICAgICAgICAgXG4gICAgICAgIGxldCBzdW0gPSAwLCBpID0gMCxcbiAgICAgICAgICAgIHBJc0dyZWF0ZXIgPSBmYWxzZSwgY29tbW9uUm9vdCA9IHRydWUsXG4gICAgICAgICAgICBwcmV2VmFsdWUgPSAwLCBuZXh0VmFsdWUgPSAwO1xuICAgICAgICBcbiAgICAgICAgd2hpbGUgKGkgPD0gbGV2ZWwpIHtcbiAgICAgICAgICAgIHByZXZWYWx1ZSA9IChwICYmIHAudC5wKSB8fCAwO1xuICAgICAgICAgICAgbmV4dFZhbHVlID0gKHEgJiYgcS50LnApIHx8IDA7ICAgICAgICAgICAgXG4gICAgICAgICAgICAvLyAjMSBjaGVjayBpZiBwYXRocyBhcmUgaWRlbnRpY2FsXG4gICAgICAgICAgICBpZiAoY29tbW9uUm9vdCAmJiBwcmV2VmFsdWUgIT09IG5leHRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGNvbW1vblJvb3QgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBwSXNHcmVhdGVyID0gcHJldlZhbHVlID4gbmV4dFZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gIzIgcHJvY2VzcyB0aGUgdmFsdWUgdG8gYWRkIHRvIGludGVydmFsXG4gICAgICAgICAgICBpZiAocElzR3JlYXRlcikgeyBuZXh0VmFsdWUgPSBNYXRoLnBvdygyLHRoaXMuZ2V0Qml0QmFzZShpKSktMTsgfVxuICAgICAgICAgICAgaWYgKGNvbW1vblJvb3QgfHwgcElzR3JlYXRlciB8fCBpICE9PSBsZXZlbCkge1xuICAgICAgICAgICAgICAgIHN1bSArPSBuZXh0VmFsdWUgLSBwcmV2VmFsdWU7IFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdW0gKz0gbmV4dFZhbHVlIC0gcHJldlZhbHVlIC0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpIT09bGV2ZWwpeyBzdW0gKj0gTWF0aC5wb3coMix0aGlzLmdldEJpdEJhc2UoaSsxKSk7IH07XG4gICAgICAgICAgICAvLyAjMyBpdGVyYXRlIG92ZXIgcGF0aCBjb25jYXRlbmF0aW9uc1xuICAgICAgICAgICAgcCA9IHAgJiYgcC5jaGlsZCB8fCBudWxsO1xuICAgICAgICAgICAgcSA9IHEgJiYgcS5jaGlsZCB8fCBudWxsO1xuICAgICAgICAgICAgKytpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdW07XG4gICAgfTtcbiAgICBcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gQmFzZTtcbiJdfQ==
},{}],2:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aWZpZXIuanMiXSwibmFtZXMiOlsiQkkiLCJyZXF1aXJlIiwiVHJpcGxlIiwiTFNlcU5vZGUiLCJJZGVudGlmaWVyIiwiYmFzZSIsImRpZ2l0cyIsInNpdGVzIiwiY291bnRlcnMiLCJfZCIsIl9zIiwiX2MiLCJfYmFzZSIsIm5vZGUiLCJsZW5ndGgiLCJ0ZW1wTm9kZSIsImlzTGVhZiIsImNoaWxkIiwiaW50MmJpZ0ludCIsImdldFN1bUJpdCIsImkiLCJwdXNoIiwidCIsInMiLCJjIiwiYWRkSW50XyIsInAiLCJsZWZ0U2hpZnRfIiwiZ2V0Qml0QmFzZSIsImUiLCJkQml0TGVuZ3RoIiwicmVzdWx0UGF0aCIsIm1pbmUiLCJkdXAiLCJyaWdodFNoaWZ0XyIsIm1vZEludCIsIk1hdGgiLCJwb3ciLCJvIiwib2RCaXRMZW5ndGgiLCJjb21wYXJpbmciLCJyZXN1bHQiLCJzdW0iLCJvdGhlciIsIm1pbiIsImVxdWFscyIsImdyZWF0ZXIiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FBRUEsSUFBTUEsS0FBS0MsUUFBUSxRQUFSLENBQVg7QUFDQSxJQUFNQyxTQUFTRCxRQUFRLGFBQVIsQ0FBZjtBQUNBLElBQU1FLFdBQVdGLFFBQVEsZUFBUixDQUFqQjs7QUFFQTs7OztJQUdNRyxVOztBQUVGOzs7Ozs7QUFNQSx3QkFBYUMsSUFBYixFQUFtQkMsTUFBbkIsRUFBc0Q7QUFBQSxZQUEzQkMsS0FBMkIsdUVBQW5CLEVBQW1CO0FBQUEsWUFBZkMsUUFBZSx1RUFBSixFQUFJOztBQUFBOztBQUNsRCxhQUFLQyxFQUFMLEdBQVVILE1BQVY7QUFDQSxhQUFLSSxFQUFMLEdBQVVILEtBQVY7QUFDQSxhQUFLSSxFQUFMLEdBQVVILFFBQVY7O0FBRUEsYUFBS0ksS0FBTCxHQUFhUCxJQUFiO0FBQ0g7Ozs7OztBQUdEOzs7Ozs7aUNBTVVRLEksRUFBTTtBQUNaO0FBQ0EsZ0JBQUlDLFNBQVMsQ0FBYjtBQUFBLGdCQUFnQkMsV0FBV0YsSUFBM0I7O0FBRUEsbUJBQU8sQ0FBQ0UsU0FBU0MsTUFBakIsRUFBeUI7QUFDNUIsa0JBQUVGLE1BQUY7QUFDT0MsMkJBQVdBLFNBQVNFLEtBQXBCO0FBQ0g7QUFDRDtBQUNBLGlCQUFLUixFQUFMLEdBQVVULEdBQUdrQixVQUFILENBQWMsQ0FBZCxFQUFpQixLQUFLTixLQUFMLENBQVdPLFNBQVgsQ0FBcUJMLFNBQVMsQ0FBOUIsQ0FBakIsQ0FBVjs7QUFFQSxpQkFBSyxJQUFJTSxJQUFJLENBQWIsRUFBZ0JBLElBQUlOLE1BQXBCLEVBQTZCLEVBQUVNLENBQS9CLEVBQWtDO0FBQzlCO0FBQ0EscUJBQUtWLEVBQUwsQ0FBUVcsSUFBUixDQUFhUixLQUFLUyxDQUFMLENBQU9DLENBQXBCO0FBQ0E7QUFDQSxxQkFBS1osRUFBTCxDQUFRVSxJQUFSLENBQWFSLEtBQUtTLENBQUwsQ0FBT0UsQ0FBcEI7QUFDQTtBQUNBeEIsbUJBQUd5QixPQUFILENBQVcsS0FBS2hCLEVBQWhCLEVBQW9CSSxLQUFLUyxDQUFMLENBQU9JLENBQTNCO0FBQ0Esb0JBQUlOLE1BQU1OLFNBQVMsQ0FBbkIsRUFBc0I7QUFDbEJkLHVCQUFHMkIsVUFBSCxDQUFjLEtBQUtsQixFQUFuQixFQUF1QixLQUFLRyxLQUFMLENBQVdnQixVQUFYLENBQXNCUixJQUFFLENBQXhCLENBQXZCO0FBQ0g7QUFDRFAsdUJBQU9BLEtBQUtJLEtBQVo7QUFDSDs7QUFFRCxtQkFBTyxJQUFQO0FBQ0g7Ozs7O0FBRUQ7Ozs7OzsrQkFNUVksQyxFQUFHO0FBQ1AsZ0JBQU1DLGFBQWEsS0FBS2xCLEtBQUwsQ0FBV08sU0FBWCxDQUFxQixLQUFLUixFQUFMLENBQVFHLE1BQVIsR0FBaUIsQ0FBdEMsQ0FBbkI7QUFDQSxnQkFBSWlCLGFBQWEsRUFBakI7QUFBQSxnQkFBcUJDLGFBQXJCOztBQUVBO0FBQ0EsaUJBQUssSUFBSVosSUFBSSxDQUFiLEVBQWdCQSxJQUFJLEtBQUtULEVBQUwsQ0FBUUcsTUFBNUIsRUFBb0MsRUFBRU0sQ0FBdEMsRUFBeUM7QUFDckM7QUFDQVksdUJBQU9oQyxHQUFHaUMsR0FBSCxDQUFPLEtBQUt4QixFQUFaLENBQVA7QUFDQTtBQUNBVCxtQkFBR2tDLFdBQUgsQ0FBZUYsSUFBZixFQUFxQkYsYUFBYSxLQUFLbEIsS0FBTCxDQUFXTyxTQUFYLENBQXFCQyxDQUFyQixDQUFsQztBQUNBO0FBQ0FXLDJCQUFXVixJQUFYLENBQ0ksSUFBSW5CLE1BQUosQ0FBV0YsR0FBR21DLE1BQUgsQ0FBVUgsSUFBVixFQUNVSSxLQUFLQyxHQUFMLENBQVMsQ0FBVCxFQUFZLEtBQUt6QixLQUFMLENBQVdnQixVQUFYLENBQXNCUixDQUF0QixDQUFaLENBRFYsQ0FBWCxFQUVXLEtBQUtWLEVBQUwsQ0FBUVUsQ0FBUixDQUZYLEVBR1csS0FBS1QsRUFBTCxDQUFRUyxDQUFSLENBSFgsQ0FESjtBQUtIO0FBQ0QsbUJBQU8sSUFBSWpCLFFBQUosQ0FBYTRCLFVBQWIsRUFBeUJGLENBQXpCLENBQVA7QUFDSDs7Ozs7QUFHRDs7Ozs7O2tDQU1XUyxDLEVBQUc7QUFDVixnQkFBSVIsYUFBYSxLQUFLbEIsS0FBTCxDQUFXTyxTQUFYLENBQXFCLEtBQUtSLEVBQUwsQ0FBUUcsTUFBUixHQUFpQixDQUF0QyxDQUFqQjtBQUFBLGdCQUNJeUIsY0FBYyxLQUFLM0IsS0FBTCxDQUFXTyxTQUFYLENBQXFCbUIsRUFBRTNCLEVBQUYsQ0FBS0csTUFBTCxHQUFjLENBQW5DLENBRGxCO0FBQUEsZ0JBRUkwQixZQUFZLElBRmhCO0FBQUEsZ0JBR0lDLFNBQVMsQ0FIYjtBQUFBLGdCQUdnQnJCLElBQUksQ0FIcEI7QUFBQSxnQkFJSXNCLFlBSko7QUFBQSxnQkFJU1YsYUFKVDtBQUFBLGdCQUllVyxjQUpmOztBQU1BO0FBQ0EsbUJBQU9ILGFBQWFwQixJQUFJZ0IsS0FBS1EsR0FBTCxDQUFTLEtBQUtqQyxFQUFMLENBQVFHLE1BQWpCLEVBQXlCd0IsRUFBRTNCLEVBQUYsQ0FBS0csTUFBOUIsQ0FBeEIsRUFBZ0U7QUFDNUQ7QUFDQTRCLHNCQUFNLEtBQUs5QixLQUFMLENBQVdPLFNBQVgsQ0FBcUJDLENBQXJCLENBQU47QUFDQTtBQUNBWSx1QkFBT2hDLEdBQUdpQyxHQUFILENBQU8sS0FBS3hCLEVBQVosQ0FBUDtBQUNBVCxtQkFBR2tDLFdBQUgsQ0FBZUYsSUFBZixFQUFxQkYsYUFBYVksR0FBbEM7QUFDQTtBQUNBQyx3QkFBUTNDLEdBQUdpQyxHQUFILENBQU9LLEVBQUU3QixFQUFULENBQVI7QUFDQVQsbUJBQUdrQyxXQUFILENBQWVTLEtBQWYsRUFBc0JKLGNBQWNHLEdBQXBDO0FBQ0E7QUFDQTtBQUNBLG9CQUFJLENBQUMxQyxHQUFHNkMsTUFBSCxDQUFVYixJQUFWLEVBQWdCVyxLQUFoQixDQUFMLEVBQTZCO0FBQ3pCLHdCQUFJM0MsR0FBRzhDLE9BQUgsQ0FBV2QsSUFBWCxFQUFpQlcsS0FBakIsQ0FBSixFQUE2QjtBQUN6QkYsaUNBQVMsQ0FBVDtBQUNILHFCQUZELE1BRU87QUFDSEEsaUNBQVMsQ0FBQyxDQUFWO0FBQ0g7QUFDREQsZ0NBQVksS0FBWjtBQUNILGlCQVBELE1BT087QUFDSDtBQUNBQyw2QkFBUyxLQUFLL0IsRUFBTCxDQUFRVSxDQUFSLElBQWFrQixFQUFFNUIsRUFBRixDQUFLVSxDQUFMLENBQXRCO0FBQ0Esd0JBQUlxQixXQUFXLENBQWYsRUFBa0I7QUFDZEQsb0NBQVksS0FBWjtBQUNILHFCQUZELE1BRU87QUFDSDtBQUNBQyxpQ0FBUyxLQUFLOUIsRUFBTCxDQUFRUyxDQUFSLElBQWFrQixFQUFFM0IsRUFBRixDQUFLUyxDQUFMLENBQXRCO0FBQ0EsNEJBQUlxQixXQUFXLENBQWYsRUFBa0I7QUFDZEQsd0NBQVksS0FBWjtBQUNIO0FBQ0o7QUFDSjtBQUNELGtCQUFFcEIsQ0FBRjtBQUNIOztBQUVEO0FBQ0EsZ0JBQUlxQixXQUFXLENBQWYsRUFBaUI7QUFDYkEseUJBQVMsS0FBSzlCLEVBQUwsQ0FBUUcsTUFBUixHQUFpQndCLEVBQUUzQixFQUFGLENBQUtHLE1BQS9CO0FBQ0g7O0FBRUQsbUJBQU8yQixNQUFQO0FBQ0g7Ozs7OztBQUNKOztBQUdETSxPQUFPQyxPQUFQLEdBQWlCNUMsVUFBakIiLCJmaWxlIjoiaWRlbnRpZmllci5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgQkkgPSByZXF1aXJlKCdCaWdJbnQnKTtcbmNvbnN0IFRyaXBsZSA9IHJlcXVpcmUoJy4vdHJpcGxlLmpzJyk7XG5jb25zdCBMU2VxTm9kZSA9IHJlcXVpcmUoJy4vbHNlcW5vZGUuanMnKTtcblxuLyoqXG4gKiBVbmlxdWUgYW5kIGltbXV0YWJsZSBpZGVudGlmaWVyIGNvbXBvc2VkIG9mIGRpZ2l0LCBzb3VyY2VzLCBjb3VudGVycy5cbiAqL1xuY2xhc3MgSWRlbnRpZmllciB7XG4gICAgXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtCYXNlfSBiYXNlIFRoZSBiYXNlIG9mIGlkZW50aWZpZXJzLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyW119IGRpZ2l0cyBUaGUgZGlnaXQgKHBvc2l0aW9uIGluIGRlbnNlIHNwYWNlKS5cbiAgICAgKiBAcGFyYW0ge09iamVjdFtdfSBzaXRlcyBUaGUgbGlzdCBvZiBzb3VyY2VzLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyW119IGNvdW50ZXJzIFRoZSBsaXN0IG9mIGNvdW50ZXJzLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yIChiYXNlLCBkaWdpdHMsIHNpdGVzID0gW10sIGNvdW50ZXJzID0gW10pIHtcbiAgICAgICAgdGhpcy5fZCA9IGRpZ2l0cztcbiAgICAgICAgdGhpcy5fcyA9IHNpdGVzO1xuICAgICAgICB0aGlzLl9jID0gY291bnRlcnM7XG4gICAgICAgIFxuICAgICAgICB0aGlzLl9iYXNlID0gYmFzZTtcbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIGQscyxjIHZhbHVlcyBhY2NvcmRpbmcgdG8gdGhlIG5vZGUgaW4gYXJndW1lbnRcbiAgICAgKiBAcGFyYW0ge0xTZXFOb2RlfSBub2RlIFRoZSBsc2Vxbm9kZSBjb250YWluaW5nIHRoZSBwYXRoIGluIHRoZSB0cmVlXG4gICAgICogc3RydWN0dXJlLlxuICAgICAqIEByZXR1cm4ge0lkZW50aWZpZXJ9IFRoaXMgaWRlbnRpZmllciBtb2RpZmllZC5cbiAgICAgKi9cbiAgICBmcm9tTm9kZSAobm9kZSkge1xuICAgICAgICAvLyAjMSBwcm9jZXNzIHRoZSBsZW5ndGggb2YgdGhlIHBhdGhcbiAgICAgICAgbGV0IGxlbmd0aCA9IDEsIHRlbXBOb2RlID0gbm9kZTtcbiAgICAgICAgXG4gICAgICAgIHdoaWxlICghdGVtcE5vZGUuaXNMZWFmKSB7XG5cdCAgICArK2xlbmd0aDtcbiAgICAgICAgICAgIHRlbXBOb2RlID0gdGVtcE5vZGUuY2hpbGQ7XG4gICAgICAgIH07XG4gICAgICAgIC8vICMyIGNvcHkgdGhlIHZhbHVlcyBjb250YWluZWQgaW4gdGhlIHBhdGhcbiAgICAgICAgdGhpcy5fZCA9IEJJLmludDJiaWdJbnQoMCwgdGhpcy5fYmFzZS5nZXRTdW1CaXQobGVuZ3RoIC0gMSkpO1xuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGggOyArK2kpIHtcbiAgICAgICAgICAgIC8vICMxYSBjb3B5IHRoZSBzaXRlIGlkXG4gICAgICAgICAgICB0aGlzLl9zLnB1c2gobm9kZS50LnMpO1xuICAgICAgICAgICAgLy8gIzFiIGNvcHkgdGhlIGNvdW50ZXJcbiAgICAgICAgICAgIHRoaXMuX2MucHVzaChub2RlLnQuYyk7XG4gICAgICAgICAgICAvLyAjMWMgY29weSB0aGUgZGlnaXRcbiAgICAgICAgICAgIEJJLmFkZEludF8odGhpcy5fZCwgbm9kZS50LnApO1xuICAgICAgICAgICAgaWYgKGkgIT09IGxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICBCSS5sZWZ0U2hpZnRfKHRoaXMuX2QsIHRoaXMuX2Jhc2UuZ2V0Qml0QmFzZShpKzEpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBub2RlID0gbm9kZS5jaGlsZDtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgXG4gICAgLyoqXG4gICAgICogQ29udmVydCB0aGUgaWRlbnRpZmllciBpbnRvIGEgbm9kZSB3aXRob3V0IGVsZW1lbnQuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGUgVGhlIGVsZW1lbnQgYXNzb2NpYXRlZCB3aXRoIHRoZSBub2RlLlxuICAgICAqIEByZXR1cm4ge0xTZXFOb2RlfSBBbiBMU2VxTm9kZSBjb250YWluaW5nIHRoZSBlbGVtZW50IGFuZCB0aGUgcGF0aFxuICAgICAqIGV4dHJhY3RlZCBmcm9tIHRoaXMgaWRlbnRpZmllci5cbiAgICAgKi9cbiAgICB0b05vZGUgKGUpIHtcbiAgICAgICAgY29uc3QgZEJpdExlbmd0aCA9IHRoaXMuX2Jhc2UuZ2V0U3VtQml0KHRoaXMuX2MubGVuZ3RoIC0gMSk7XG4gICAgICAgIGxldCByZXN1bHRQYXRoID0gW10sIG1pbmU7XG4gICAgICAgIFxuICAgICAgICAvLyAjMSBkZWNvbnN0cnVjdCB0aGUgZGlnaXQgXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fYy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgLy8gIzEgdHJ1bmNhdGUgbWluZVxuICAgICAgICAgICAgbWluZSA9IEJJLmR1cCh0aGlzLl9kKTtcbiAgICAgICAgICAgIC8vICMxYSBzaGlmdCByaWdodCB0byBlcmFzZSB0aGUgdGFpbCBvZiB0aGUgcGF0aFxuICAgICAgICAgICAgQkkucmlnaHRTaGlmdF8obWluZSwgZEJpdExlbmd0aCAtIHRoaXMuX2Jhc2UuZ2V0U3VtQml0KGkpKTtcbiAgICAgICAgICAgIC8vICMxYiBjb3B5IHZhbHVlIGluIHRoZSByZXN1bHRcbiAgICAgICAgICAgIHJlc3VsdFBhdGgucHVzaChcbiAgICAgICAgICAgICAgICBuZXcgVHJpcGxlKEJJLm1vZEludChtaW5lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucG93KDIsIHRoaXMuX2Jhc2UuZ2V0Qml0QmFzZShpKSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc1tpXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NbaV0pKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5ldyBMU2VxTm9kZShyZXN1bHRQYXRoLCBlKTtcbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBDb21wYXJlIHR3byBpZGVudGlmaWVycy5cbiAgICAgKiBAcGFyYW0ge0lkZW50aWZpZXJ9IG8gVGhlIG90aGVyIGlkZW50aWZpZXIuXG4gICAgICogQHJldHVybiB7SW50ZWdlcn0gLTEgaWYgdGhpcyBpcyBsb3dlciwgMCBpZiB0aGV5IGFyZSBlcXVhbCwgMSBpZiB0aGlzIGlzXG4gICAgICogZ3JlYXRlci5cbiAgICAgKi9cbiAgICBjb21wYXJlVG8gKG8pIHtcbiAgICAgICAgbGV0IGRCaXRMZW5ndGggPSB0aGlzLl9iYXNlLmdldFN1bUJpdCh0aGlzLl9jLmxlbmd0aCAtIDEpLFxuICAgICAgICAgICAgb2RCaXRMZW5ndGggPSB0aGlzLl9iYXNlLmdldFN1bUJpdChvLl9jLmxlbmd0aCAtIDEpLFxuICAgICAgICAgICAgY29tcGFyaW5nID0gdHJ1ZSxcbiAgICAgICAgICAgIHJlc3VsdCA9IDAsIGkgPSAwLFxuICAgICAgICAgICAgc3VtLCBtaW5lLCBvdGhlcjtcbiAgICAgICAgXG4gICAgICAgIC8vICMxIENvbXBhcmUgdGhlIGxpc3Qgb2YgPGQscyxjPlxuICAgICAgICB3aGlsZSAoY29tcGFyaW5nICYmIGkgPCBNYXRoLm1pbih0aGlzLl9jLmxlbmd0aCwgby5fYy5sZW5ndGgpICkge1xuICAgICAgICAgICAgLy8gY2FuIHN0b3AgYmVmb3JlIHRoZSBlbmQgb2YgZm9yIGxvb3Agd2l6IHJldHVyblxuICAgICAgICAgICAgc3VtID0gdGhpcy5fYmFzZS5nZXRTdW1CaXQoaSk7XG4gICAgICAgICAgICAvLyAjMWEgdHJ1bmNhdGUgbWluZVxuICAgICAgICAgICAgbWluZSA9IEJJLmR1cCh0aGlzLl9kKTtcbiAgICAgICAgICAgIEJJLnJpZ2h0U2hpZnRfKG1pbmUsIGRCaXRMZW5ndGggLSBzdW0pO1xuICAgICAgICAgICAgLy8gIzFiIHRydW5jYXRlIG90aGVyXG4gICAgICAgICAgICBvdGhlciA9IEJJLmR1cChvLl9kKTtcbiAgICAgICAgICAgIEJJLnJpZ2h0U2hpZnRfKG90aGVyLCBvZEJpdExlbmd0aCAtIHN1bSk7XG4gICAgICAgICAgICAvLyAjMiBDb21wYXJlIHRyaXBsZXNcbiAgICAgICAgICAgIC8vICNBIGRpZ2l0XG4gICAgICAgICAgICBpZiAoIUJJLmVxdWFscyhtaW5lLCBvdGhlcikpIHtcbiAgICAgICAgICAgICAgICBpZiAoQkkuZ3JlYXRlcihtaW5lLCBvdGhlcikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSAtMTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGNvbXBhcmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyAjQiBzb3VyY2VcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLl9zW2ldIC0gby5fc1tpXTsgXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBjb21wYXJpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyAjQyBjb3VudGVyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuX2NbaV0gLSBvLl9jW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wYXJpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICsraTtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIC8vICMzIGNvbXBhcmUgbGlzdCBzaXplXG4gICAgICAgIGlmIChyZXN1bHQgPT09IDApe1xuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5fYy5sZW5ndGggLSBvLl9jLmxlbmd0aDtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTsgICAgXG59O1xuXG5cbm1vZHVsZS5leHBvcnRzID0gSWRlbnRpZmllcjtcbiJdfQ==
},{"./lseqnode.js":3,"./triple.js":5,"BigInt":6}],3:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxzZXFub2RlLmpzIl0sIm5hbWVzIjpbIlRyaXBsZSIsInJlcXVpcmUiLCJMU2VxTm9kZSIsInRyaXBsZXMiLCJlbGVtZW50IiwidCIsInNoaWZ0IiwiZSIsImxlbmd0aCIsInN1YkNvdW50ZXIiLCJjaGlsZHJlbiIsInB1c2giLCJvIiwiY29tcGFyZVRvIiwibm9kZSIsImluZGV4IiwiX2JpbmFyeUluZGV4T2YiLCJfY29udGFpbnMiLCJzcGxpY2UiLCJhZGQiLCJjaGlsZCIsImluZGV4ZXMiLCJfZ2V0SW5kZXhlcyIsImN1cnJlbnRUcmVlIiwiaSIsImlzU3BsaXR0ZWQiLCJpc0xhc3QiLCJfaGFzRWxlbWVudCIsInN1bSIsImoiLCJfZ2V0IiwibGVmdFN1bSIsImJ1aWxkaW5nTm9kZSIsInF1ZXVlIiwiY3VycmVudE5vZGUiLCJzdGFydEJlZ2lubmluZyIsInVzZUZ1bmN0aW9uIiwicCIsInRlbXAiLCJhIiwiYiIsIl9fZ2V0SW5kZXhlcyIsInNlYXJjaEVsZW1lbnQiLCJtaW5JbmRleCIsIm1heEluZGV4IiwiY3VycmVudEluZGV4IiwiY3VycmVudEVsZW1lbnQiLCJNYXRoIiwiZmxvb3IiLCJiZWluZ0J1aWx0IiwicyIsImMiLCJmcm9tSlNPTiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFFQSxJQUFNQSxTQUFTQyxRQUFRLGFBQVIsQ0FBZjs7QUFFQTs7OztJQUdNQyxRO0FBQ0Y7Ozs7OztBQU1BLHdCQUEyQztBQUFBLFlBQTlCQyxPQUE4Qix1RUFBcEIsRUFBb0I7QUFBQSxZQUFoQkMsT0FBZ0IsdUVBQU4sSUFBTTs7QUFBQTs7QUFDdkMsYUFBS0MsQ0FBTCxHQUFTRixRQUFRRyxLQUFSLEVBQVQ7QUFDQSxhQUFLQyxDQUFMLEdBQVMsSUFBVDtBQUNBLFlBQUlKLFFBQVFLLE1BQVIsS0FBbUIsQ0FBdkIsRUFBMEI7QUFBRSxpQkFBS0QsQ0FBTCxHQUFTSCxPQUFUO0FBQW1CO0FBQy9DLGFBQUtLLFVBQUwsR0FBbUJOLFFBQVFLLE1BQVIsR0FBaUIsQ0FBakIsSUFBc0IsQ0FBdkIsSUFBNkIsQ0FBL0M7QUFDQSxhQUFLRSxRQUFMLEdBQWdCLEVBQWhCO0FBQ0FQLGdCQUFRSyxNQUFSLEdBQWlCLENBQWpCLElBQ0ksS0FBS0UsUUFBTCxDQUFjQyxJQUFkLENBQW1CLElBQUlULFFBQUosQ0FBYUMsT0FBYixFQUFzQkMsT0FBdEIsQ0FBbkIsQ0FESjtBQUVIOzs7Ozs7QUFXRDs7OztrQ0FJV1EsQyxFQUFHO0FBQ1YsbUJBQU8sS0FBS1AsQ0FBTCxDQUFPUSxTQUFQLENBQWlCRCxFQUFFUCxDQUFuQixDQUFQO0FBQ0g7Ozs7O0FBRUQ7Ozs7OzRCQUtLUyxJLEVBQU07QUFDUCxnQkFBTUMsUUFBUSxLQUFLQyxjQUFMLENBQW9CRixJQUFwQixDQUFkOztBQUVBO0FBQ0EsZ0JBQUksQ0FBQyxLQUFLRyxTQUFMLENBQWVILElBQWYsQ0FBTCxFQUEyQjtBQUN2QixxQkFBS0osUUFBTCxDQUFjUSxNQUFkLENBQXFCLENBQUNILEtBQXRCLEVBQTZCLENBQTdCLEVBQWdDRCxJQUFoQztBQUNBLHFCQUFLTCxVQUFMLElBQW1CLENBQW5CO0FBQ0E7QUFDSCxhQUpELE1BSU8sSUFBSUssS0FBS0osUUFBTCxDQUFjRixNQUFkLEtBQXlCLENBQTdCLEVBQWdDO0FBQ25DO0FBQ0Esb0JBQUksS0FBS0UsUUFBTCxDQUFjSyxLQUFkLEVBQXFCUixDQUFyQixLQUEyQixJQUEvQixFQUFvQztBQUNoQywyQkFBTyxLQUFQO0FBQ0gsaUJBRkQsTUFFTztBQUNILHlCQUFLRyxRQUFMLENBQWNLLEtBQWQsRUFBcUJSLENBQXJCLEdBQXlCTyxLQUFLUCxDQUE5QjtBQUNBLHlCQUFLRSxVQUFMLElBQW1CLENBQW5CO0FBQ0g7QUFDRDtBQUNILGFBVE0sTUFTQSxJQUFJLEtBQUtDLFFBQUwsQ0FBY0ssS0FBZCxFQUFxQkksR0FBckIsQ0FBeUJMLEtBQUtNLEtBQTlCLENBQUosRUFBMEM7QUFDN0MscUJBQUtYLFVBQUwsSUFBbUIsQ0FBbkI7QUFDSDtBQUNELG1CQUFPLElBQVA7QUFDSDs7Ozs7QUFHRDs7Ozs7OzRCQU1LSyxJLEVBQU07QUFDUCxnQkFBTU8sVUFBVSxLQUFLQyxXQUFMLENBQWlCUixJQUFqQixDQUFoQjtBQUNBLGdCQUFJUyxjQUFjLElBQWxCO0FBQUEsZ0JBQXdCQyxJQUFJLENBQTVCO0FBQUEsZ0JBQStCQyxhQUFhLEtBQTVDOztBQUVBO0FBQ0EsZ0JBQUlKLFFBQVFiLE1BQVIsS0FBbUIsQ0FBdkIsRUFBMEI7QUFBRSx1QkFBTyxLQUFQO0FBQWU7O0FBRTNDO0FBQ0FlLHdCQUFZZCxVQUFaLElBQTBCLENBQTFCO0FBQ0EsbUJBQU9lLElBQUlILFFBQVFiLE1BQVosSUFBc0IsQ0FBRWlCLFVBQS9CLEVBQTRDO0FBQ3hDLG9CQUFJQyxTQUFTSCxZQUFZYixRQUFaLENBQXFCVyxRQUFRRyxDQUFSLENBQXJCLEVBQWlDRyxXQUFqQyxJQUNUSCxNQUFNSCxRQUFRYixNQUFSLEdBQWlCLENBRDNCO0FBRUEsb0JBQUksQ0FBQ2tCLE1BQUwsRUFBYTtBQUNUSCxnQ0FBWWIsUUFBWixDQUFxQlcsUUFBUUcsQ0FBUixDQUFyQixFQUFpQ2YsVUFBakMsSUFBK0MsQ0FBL0M7QUFDSDtBQUNELG9CQUFJYyxZQUFZYixRQUFaLENBQXFCVyxRQUFRRyxDQUFSLENBQXJCLEVBQWlDZixVQUFqQyxJQUErQyxDQUEvQyxLQUNDLENBQUNjLFlBQVliLFFBQVosQ0FBcUJXLFFBQVFHLENBQVIsQ0FBckIsRUFBaUNHLFdBQWxDLElBQWlERCxNQURsRCxDQUFKLEVBQytEO0FBQzNESCxnQ0FBWWIsUUFBWixDQUFxQlEsTUFBckIsQ0FBNEJHLFFBQVFHLENBQVIsQ0FBNUIsRUFBd0MsQ0FBeEM7QUFDQUMsaUNBQWEsSUFBYjtBQUNIO0FBQ0RGLDhCQUFjQSxZQUFZYixRQUFaLENBQXFCVyxRQUFRRyxDQUFSLENBQXJCLENBQWQ7QUFDQSxrQkFBRUEsQ0FBRjtBQUNIO0FBQ0QsZ0JBQUksQ0FBQ0MsVUFBTCxFQUFnQjtBQUFFRiw0QkFBWWhCLENBQVosR0FBZ0IsSUFBaEI7QUFBc0I7O0FBRXhDLG1CQUFPLElBQVA7QUFDSDs7Ozs7QUFHRDs7Ozs7Ozs7Z0NBUVNPLEksRUFBTTtBQUNYLGdCQUFNTyxVQUFVLEtBQUtDLFdBQUwsQ0FBaUJSLElBQWpCLENBQWhCO0FBQ0EsZ0JBQUljLE1BQU0sQ0FBVjtBQUFBLGdCQUFhTCxjQUFjLElBQTNCO0FBQUEsZ0JBQWlDTSxVQUFqQzs7QUFFQTtBQUNBLGdCQUFJUixRQUFRYixNQUFSLEtBQW1CLENBQXZCLEVBQTBCO0FBQUUsdUJBQU8sQ0FBQyxDQUFSO0FBQVk7O0FBRXhDO0FBQ0EsZ0JBQUllLFlBQVlJLFdBQWhCLEVBQTZCO0FBQUVDLHVCQUFPLENBQVA7QUFBVzs7QUFFMUMsaUJBQUssSUFBSUosSUFBSSxDQUFiLEVBQWdCQSxJQUFJSCxRQUFRYixNQUE1QixFQUFvQyxFQUFFZ0IsQ0FBdEMsRUFBeUM7QUFDckMsb0JBQUlILFFBQVFHLENBQVIsSUFBYUQsWUFBWWIsUUFBWixDQUFxQkYsTUFBckIsR0FBNEIsQ0FBN0MsRUFBZ0Q7QUFDNUM7QUFDQXFCLHdCQUFJLENBQUo7QUFDQSwyQkFBT0EsSUFBSVIsUUFBUUcsQ0FBUixDQUFYLEVBQXVCO0FBQ25CLDRCQUFJRCxZQUFZYixRQUFaLENBQXFCbUIsQ0FBckIsRUFBd0JGLFdBQTVCLEVBQXlDO0FBQUVDLG1DQUFPLENBQVA7QUFBVztBQUN0REEsK0JBQU9MLFlBQVliLFFBQVosQ0FBcUJtQixDQUFyQixFQUF3QnBCLFVBQS9CO0FBQ0EsMEJBQUVvQixDQUFGO0FBQ0g7QUFDSixpQkFSRCxNQVFPO0FBQ0g7QUFDQUQsMkJBQU9MLFlBQVlkLFVBQW5CO0FBQ0FvQix3QkFBSU4sWUFBWWIsUUFBWixDQUFxQkYsTUFBckIsR0FBOEIsQ0FBbEM7QUFDQSwyQkFBT3FCLEtBQUtSLFFBQVFHLENBQVIsQ0FBWixFQUF3QjtBQUNwQiw0QkFBSUQsWUFBWWIsUUFBWixDQUFxQm1CLENBQXJCLEVBQXdCRixXQUE1QixFQUF3QztBQUFFQyxtQ0FBTyxDQUFQO0FBQVc7QUFDckRBLCtCQUFPTCxZQUFZYixRQUFaLENBQXFCbUIsQ0FBckIsRUFBd0JwQixVQUEvQjtBQUNBLDBCQUFFb0IsQ0FBRjtBQUNIO0FBQ0RBLHlCQUFLLENBQUw7QUFDSDtBQUNELG9CQUFJTixZQUFZYixRQUFaLENBQXFCbUIsQ0FBckIsRUFBd0JGLFdBQTVCLEVBQXlDO0FBQUVDLDJCQUFPLENBQVA7QUFBVztBQUN0REwsOEJBQWNBLFlBQVliLFFBQVosQ0FBcUJtQixDQUFyQixDQUFkO0FBQ0g7QUFDRCxtQkFBT0QsTUFBTSxDQUFiLENBakNXLENBaUNLO0FBQ25COzs7OztBQUdEOzs7Ozs7NEJBTUtiLEssRUFBTzs7QUFFUjs7Ozs7Ozs7QUFRQSxnQkFBTWUsT0FBTyxTQUFQQSxJQUFPLENBQUNDLE9BQUQsRUFBVUMsWUFBVixFQUF3QkMsS0FBeEIsRUFBK0JDLFdBQS9CLEVBQStDO0FBQ3hELG9CQUFJQyxpQkFBaUIsSUFBckI7QUFBQSxvQkFBMkJDLG9CQUEzQjtBQUFBLG9CQUF3Q1osSUFBSSxDQUE1QztBQUFBLG9CQUErQ2EsVUFBL0M7QUFBQSxvQkFBa0RDLGFBQWxEO0FBQ0E7QUFDQTtBQUNBLG9CQUFJUCxZQUFZaEIsS0FBWixJQUFxQm1CLFlBQVlQLFdBQXJDLEVBQWtEO0FBQzlDO0FBQ0FNLDBCQUFNMUIsQ0FBTixHQUFVMkIsWUFBWTNCLENBQXRCO0FBQ0EsMkJBQU95QixZQUFQO0FBQ0g7QUFDRCxvQkFBSUUsWUFBWVAsV0FBaEIsRUFBNEI7QUFBRUksK0JBQVcsQ0FBWDtBQUFlOztBQUU3QztBQUNBSSxpQ0FBaUJwQixRQUFNZ0IsT0FBTixHQUFnQkcsWUFBWXpCLFVBQVosR0FBdUIsQ0FBeEQ7QUFDQSxvQkFBSTBCLGNBQUosRUFBb0I7QUFDaEJDLGtDQUFjLHFCQUFDRyxDQUFELEVBQUlDLENBQUo7QUFBQSwrQkFBVUQsSUFBSUMsQ0FBZDtBQUFBLHFCQUFkO0FBQ0gsaUJBRkQsTUFFTztBQUNIVCwrQkFBV0csWUFBWXpCLFVBQXZCO0FBQ0EyQixrQ0FBYyxxQkFBQ0csQ0FBRCxFQUFJQyxDQUFKO0FBQUEsK0JBQVVELElBQUlDLENBQWQ7QUFBQSxxQkFBZDtBQUNIOztBQUVEO0FBQ0Esb0JBQUksQ0FBQ0wsY0FBTCxFQUFxQjtBQUFFWCx3QkFBSVUsWUFBWXhCLFFBQVosQ0FBcUJGLE1BQXJCLEdBQThCLENBQWxDO0FBQXNDO0FBQzdELHVCQUFRMkIsa0JBQWtCSixXQUFXaEIsS0FBOUIsSUFDQyxDQUFDb0IsY0FBRCxJQUFtQkosVUFBVWhCLEtBRHJDLEVBQzZDO0FBQ3pDLHdCQUFJbUIsWUFBWXhCLFFBQVosQ0FBcUJjLENBQXJCLEVBQXdCRyxXQUE1QixFQUF5QztBQUNyQ0ksa0NBQVVLLFlBQVlMLE9BQVosRUFBcUIsQ0FBckIsQ0FBVjtBQUNIO0FBQ0RBLDhCQUFVSyxZQUFZTCxPQUFaLEVBQ1lHLFlBQVl4QixRQUFaLENBQXFCYyxDQUFyQixFQUF3QmYsVUFEcEMsQ0FBVjtBQUVBZSx3QkFBSVksWUFBWVosQ0FBWixFQUFlLENBQWYsQ0FBSjtBQUNIOztBQUVEO0FBQ0FBLG9CQUFJWSxZQUFZWixDQUFaLEVBQWUsQ0FBQyxDQUFoQixDQUFKO0FBQ0Esb0JBQUlXLGNBQUosRUFBb0I7QUFDaEIsd0JBQUlELFlBQVl4QixRQUFaLENBQXFCYyxDQUFyQixFQUF3QkcsV0FBNUIsRUFBeUM7QUFDckNJLGtDQUFVSyxZQUFZTCxPQUFaLEVBQXFCLENBQUMsQ0FBdEIsQ0FBVjtBQUNIO0FBQ0RBLDhCQUFVSyxZQUFZTCxPQUFaLEVBQ1ksQ0FBQ0csWUFBWXhCLFFBQVosQ0FBcUJjLENBQXJCLEVBQXdCZixVQURyQyxDQUFWO0FBRUg7O0FBRUQ7QUFDQTRCLG9CQUFJLEVBQUosQ0FBUUEsRUFBRTFCLElBQUYsQ0FBT3VCLFlBQVl4QixRQUFaLENBQXFCYyxDQUFyQixFQUF3Qm5CLENBQS9CO0FBQ1Isb0JBQUkyQixpQkFBaUIsSUFBckIsRUFBMkI7QUFDdkJBLG1DQUFlLElBQUk5QixRQUFKLENBQWFtQyxDQUFiLEVBQWdCLElBQWhCLENBQWY7QUFDQUosNEJBQVFELFlBQVI7QUFDSCxpQkFIRCxNQUdPO0FBQ0hNLDJCQUFPLElBQUlwQyxRQUFKLENBQWFtQyxDQUFiLEVBQWdCLElBQWhCLENBQVA7QUFDQUosMEJBQU1kLEdBQU4sQ0FBVW1CLElBQVY7QUFDQUwsNEJBQVFLLElBQVI7QUFDSDtBQUNELHVCQUFPUixLQUFLQyxPQUFMLEVBQWNDLFlBQWQsRUFBNEJDLEtBQTVCLEVBQW1DQyxZQUFZeEIsUUFBWixDQUFxQmMsQ0FBckIsQ0FBbkMsQ0FBUDtBQUNILGFBckREO0FBc0RBLG1CQUFPTSxLQUFLLENBQUwsRUFBUSxJQUFSLEVBQWMsSUFBZCxFQUFvQixJQUFwQixDQUFQO0FBQ0g7Ozs7O0FBc0JEOzs7Ozs7O29DQU9haEIsSSxFQUFNO0FBQ2YsZ0JBQU0yQixlQUFlLFNBQWZBLFlBQWUsQ0FBQ3BCLE9BQUQsRUFBVUUsV0FBVixFQUF1QlcsV0FBdkIsRUFBdUM7QUFDeEQsb0JBQUksQ0FBQ1gsWUFBWU4sU0FBWixDQUFzQmlCLFdBQXRCLENBQUwsRUFBeUM7QUFDckMsMkJBQU8sRUFBUDtBQUNIOztBQUVELG9CQUFNbkIsUUFBUVEsWUFBWVAsY0FBWixDQUEyQmtCLFdBQTNCLENBQWQ7O0FBRUFiLHdCQUFRVixJQUFSLENBQWFJLEtBQWI7O0FBRUEsdUJBQVEsQ0FBQ21CLFlBQVl4QixRQUFaLENBQXFCRixNQUFyQixLQUFnQyxDQUFoQyxJQUNBZSxZQUFZYixRQUFaLENBQXFCRixNQUFyQixLQUFnQyxDQURqQyxLQUN1Q2EsT0FEeEMsSUFFSG9CLGFBQWFwQixPQUFiLEVBQ2FFLFlBQVliLFFBQVosQ0FBcUJLLEtBQXJCLENBRGIsRUFFYW1CLFlBQVlkLEtBRnpCLENBRko7QUFLSCxhQWREOztBQWdCQSxtQkFBT3FCLGFBQWEsRUFBYixFQUFpQixJQUFqQixFQUF1QjNCLElBQXZCLENBQVA7QUFDSDs7Ozs7QUFLRDs7Ozs7Ozt1Q0FPZ0I0QixhLEVBQWU7QUFDM0IsZ0JBQUlDLFdBQVcsQ0FBZjtBQUNBLGdCQUFJQyxXQUFXLEtBQUtsQyxRQUFMLENBQWNGLE1BQWQsR0FBdUIsQ0FBdEM7QUFDQSxnQkFBSXFDLHFCQUFKO0FBQ0EsZ0JBQUlDLHVCQUFKOztBQUVBLG1CQUFPSCxZQUFZQyxRQUFuQixFQUE2QjtBQUN6QkMsK0JBQWVFLEtBQUtDLEtBQUwsQ0FBVyxDQUFDTCxXQUFXQyxRQUFaLElBQXdCLENBQW5DLENBQWY7QUFDQUUsaUNBQWlCLEtBQUtwQyxRQUFMLENBQWNtQyxZQUFkLENBQWpCO0FBQ0Esb0JBQUlDLGVBQWVqQyxTQUFmLENBQXlCNkIsYUFBekIsSUFBMEMsQ0FBOUMsRUFBaUQ7QUFDN0NDLCtCQUFXRSxlQUFlLENBQTFCO0FBQ0gsaUJBRkQsTUFFTyxJQUFJQyxlQUFlakMsU0FBZixDQUF5QjZCLGFBQXpCLElBQTBDLENBQTlDLEVBQWlEO0FBQ3BERSwrQkFBV0MsZUFBZSxDQUExQjtBQUNILGlCQUZNLE1BRUE7QUFDSCwyQkFBT0EsWUFBUDtBQUNIO0FBQ0o7QUFDRCxtQkFBTyxDQUFDRCxRQUFSO0FBQ0g7Ozs7O0FBRUQ7Ozs7OztrQ0FNV0YsYSxFQUFlO0FBQ3RCLGdCQUFNM0IsUUFBUSxLQUFLQyxjQUFMLENBQW9CMEIsYUFBcEIsQ0FBZDtBQUNBLG1CQUFPLEtBQUtoQyxRQUFMLENBQWNGLE1BQWQsR0FBdUIsQ0FBdkIsS0FDRk8sUUFBUSxDQUFSLElBQ0VBLFVBQVUsQ0FBWCxJQUNBLEtBQUtLLEtBQUwsQ0FBV1AsU0FBWCxDQUFxQjZCLGFBQXJCLE1BQXdDLENBSHZDLENBQVA7QUFJSDs7Ozs7QUFoU0Q7Ozs7OzRCQUthO0FBQ1QsbUJBQVMsS0FBS2hDLFFBQUwsQ0FBY0YsTUFBZCxHQUF1QixDQUF4QixJQUE4QixLQUFLRSxRQUFMLENBQWMsQ0FBZCxDQUEvQixJQUFvRCxJQUEzRDtBQUNIOzs7OztBQTJSRDs7Ozs0QkFJbUI7QUFDZixtQkFBTyxLQUFLSCxDQUFMLEtBQVcsSUFBbEI7QUFDSDs7Ozs7QUFFRDs7Ozs0QkFJYztBQUNWLG1CQUFPLEtBQUtHLFFBQUwsQ0FBY0YsTUFBZCxLQUF5QixDQUFoQztBQUNIOzs7OztBQXpHRDs7Ozs7aUNBS2lCSSxDLEVBQUc7QUFDaEIsZ0JBQUlxQyxtQkFBSjs7QUFFQTtBQUNBLGdCQUFJckMsRUFBRUYsUUFBRixDQUFXRixNQUFYLEtBQXNCLENBQTFCLEVBQTRCO0FBQ3hCeUMsNkJBQWEsSUFBSS9DLFFBQUosQ0FBYSxDQUFDLElBQUlGLE1BQUosQ0FBV1ksRUFBRVAsQ0FBRixDQUFJZ0MsQ0FBZixFQUFrQnpCLEVBQUVQLENBQUYsQ0FBSTZDLENBQXRCLEVBQXlCdEMsRUFBRVAsQ0FBRixDQUFJOEMsQ0FBN0IsQ0FBRCxDQUFiLEVBQWdEdkMsRUFBRUwsQ0FBbEQsQ0FBYjtBQUNILGFBRkQsTUFFTztBQUNIO0FBQ0EwQyw2QkFBYSxJQUFJL0MsUUFBSixDQUFhLENBQUMsSUFBSUYsTUFBSixDQUFXWSxFQUFFUCxDQUFGLENBQUlnQyxDQUFmLEVBQWtCekIsRUFBRVAsQ0FBRixDQUFJNkMsQ0FBdEIsRUFBeUJ0QyxFQUFFUCxDQUFGLENBQUk4QyxDQUE3QixDQUFELENBQWIsQ0FBYjtBQUNBRiwyQkFBV3ZDLFFBQVgsQ0FBb0JDLElBQXBCLENBQXlCVCxTQUFTa0QsUUFBVCxDQUFrQnhDLEVBQUVGLFFBQUYsQ0FBVyxDQUFYLENBQWxCLENBQXpCO0FBQ0g7O0FBRUQsbUJBQU91QyxVQUFQO0FBQ0g7Ozs7OztBQXlGSjs7QUFFREksT0FBT0MsT0FBUCxHQUFpQnBELFFBQWpCIiwiZmlsZSI6ImxzZXFub2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBUcmlwbGUgPSByZXF1aXJlKCcuL3RyaXBsZS5qcycpO1xuXG4vKipcbiAqIEEgbm9kZSBvZiB0aGUgTFNlcSB0cmVlLlxuICovXG5jbGFzcyBMU2VxTm9kZSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtUcmlwbGVbXX0gdHJpcGxlcyBUaGUgbGlzdCBvZiB0cmlwbGVzIGNvbXBvc2luZyB0aGUgcGF0aCB0byB0aGVcbiAgICAgKiBlbGVtZW50LlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtZW50IFRoZSBlbGVtZW50IHRvIGluc2VydCBpbiB0aGUgc3RydWN0dXJlLCBlLmcuLCBhXG4gICAgICogY2hhcmFjdGVyIGluIGEgdGV4dCBkb2N1bWVudC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvciAodHJpcGxlcyA9IFtdLCBlbGVtZW50ID0gbnVsbCkge1xuICAgICAgICB0aGlzLnQgPSB0cmlwbGVzLnNoaWZ0KCk7XG4gICAgICAgIHRoaXMuZSA9IG51bGw7XG4gICAgICAgIGlmICh0cmlwbGVzLmxlbmd0aCA9PT0gMCkgeyB0aGlzLmUgPSBlbGVtZW50OyB9O1xuICAgICAgICB0aGlzLnN1YkNvdW50ZXIgPSAodHJpcGxlcy5sZW5ndGggPiAwICYmIDEpIHx8IDA7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4gPSBbXTtcbiAgICAgICAgdHJpcGxlcy5sZW5ndGggPiAwICYmXG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLnB1c2gobmV3IExTZXFOb2RlKHRyaXBsZXMsIGVsZW1lbnQpKTtcbiAgICB9O1xuICAgIFxuICAgIC8qKlxuICAgICAqIEdldHRlciB0byB0aGUgZmlyc3QgY2hpbGQuXG4gICAgICogQHJldHVybnMge0xTZXFOb2RlfSBUaGUgZmlyc3QgY2hpbGQgb2YgdGhpcyBub2RlLiBOdWxsIGlmIGl0IGRvZXMgbm90XG4gICAgICogZXhpc3RzLlxuICAgICAqL1xuICAgIGdldCBjaGlsZCAoKSB7XG4gICAgICAgIHJldHVybiAoKHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMCkgJiYgdGhpcy5jaGlsZHJlblswXSkgfHwgbnVsbDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ29tcGFyYXRvciBiZXR3ZWVuIHRvIExTZXFOb2Rlcy5cbiAgICAgKiBAcGFyYW0ge0xTZXFOb2RlfSBvIFRoZSBvdGhlciBMU2VxTm9kZSB0byBjb21wYXJlIHRvLlxuICAgICAqL1xuICAgIGNvbXBhcmVUbyAobykge1xuICAgICAgICByZXR1cm4gdGhpcy50LmNvbXBhcmVUbyhvLnQpO1xuICAgIH07XG4gICAgXG4gICAgLyoqXG4gICAgICogQWRkIGEgbm9kZSB0byB0aGUgY3VycmVudCBub2RlLlxuICAgICAqIEBwYXJhbSB7TFNlcU5vZGV9IG5vZGUgVGhlIG5vZGUgdG8gYWRkIGFzIGEgY2hpbGRyZW4gb2YgdGhpcyBub2RlLlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IEZhbHNlIGlmIHRoZSBlbGVtZW50IGFscmVhZHkgZXhpc3RzLCBUcnVlIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBhZGQgKG5vZGUpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9iaW5hcnlJbmRleE9mKG5vZGUpO1xuICAgICAgICBcbiAgICAgICAgLy8gIzEgaWYgdGhlIHBhdGggZG8gbm8gZXhpc3QsIGNyZWF0ZSBpdFxuICAgICAgICBpZiAoIXRoaXMuX2NvbnRhaW5zKG5vZGUpKSB7XG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLnNwbGljZSgtaW5kZXgsIDAsIG5vZGUpO1xuICAgICAgICAgICAgdGhpcy5zdWJDb3VudGVyICs9IDE7XG4gICAgICAgICAgICAvLyAjMiBvdGhlcndpc2UsIGNvbnRpbnVlIHRvIGV4cGxvcmUgdGhlIHN1YnRyZWVzXG4gICAgICAgIH0gZWxzZSBpZiAobm9kZS5jaGlsZHJlbi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIC8vICMyYSBjaGVjayBpZiB0aGUgZWxlbWVudCBhbHJlYWR5IGV4aXN0c1xuICAgICAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW5baW5kZXhdLmUgIT09IG51bGwpe1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGlsZHJlbltpbmRleF0uZSA9IG5vZGUuZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN1YkNvdW50ZXIgKz0gMTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAvLyAjMyBpZiBkaWRub3QgZXhpc3QsIGluY3JlbWVudCB0aGUgY291bnRlclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY2hpbGRyZW5baW5kZXhdLmFkZChub2RlLmNoaWxkKSkge1xuICAgICAgICAgICAgdGhpcy5zdWJDb3VudGVyICs9IDE7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSB0aGUgbm9kZSBvZiB0aGUgdHJlZSBhbmQgYWxsIG5vZGUgd2l0aGluIHBhdGggYmVpbmcgdXNlbGVzcy5cbiAgICAgKiBAcGFyYW0ge0xTZXFOb2RlfSBub2RlIHRoZSBub2RlIGNvbnRhaW5pbmcgdGhlIHBhdGggdG8gcmVtb3ZlXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgbm9kZSBoYXMgYmVlbiByZW1vdmVkLCBGYWxzZSBpZiBpdCBkb2VzIG5vdFxuICAgICAqIGV4aXN0LlxuICAgICAqL1xuICAgIGRlbCAobm9kZSkge1xuICAgICAgICBjb25zdCBpbmRleGVzID0gdGhpcy5fZ2V0SW5kZXhlcyhub2RlKTtcbiAgICAgICAgbGV0IGN1cnJlbnRUcmVlID0gdGhpcywgaSA9IDAsIGlzU3BsaXR0ZWQgPSBmYWxzZTtcblxuICAgICAgICAvLyAjMSBUaGUgZWxlbWVudCBkb2VzIG5vdCBleGlzdHMsIHN0b3BcbiAgICAgICAgaWYgKGluZGV4ZXMubGVuZ3RoID09PSAwKSB7IHJldHVybiBmYWxzZTsgfTtcblxuICAgICAgICAvLyAjMiBDcmF3bCB0aGUgcGF0aCBhbmQgcmVtb3ZlIHRoZSBlbGVtZW50XG4gICAgICAgIGN1cnJlbnRUcmVlLnN1YkNvdW50ZXIgLT0gMTtcbiAgICAgICAgd2hpbGUgKGkgPCBpbmRleGVzLmxlbmd0aCAmJiAhKGlzU3BsaXR0ZWQpKSB7XG4gICAgICAgICAgICBsZXQgaXNMYXN0ID0gY3VycmVudFRyZWUuY2hpbGRyZW5baW5kZXhlc1tpXV0uX2hhc0VsZW1lbnQgJiZcbiAgICAgICAgICAgICAgICBpID09PSBpbmRleGVzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICBpZiAoIWlzTGFzdCkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRUcmVlLmNoaWxkcmVuW2luZGV4ZXNbaV1dLnN1YkNvdW50ZXIgLT0gMTsgICAgIFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmIChjdXJyZW50VHJlZS5jaGlsZHJlbltpbmRleGVzW2ldXS5zdWJDb3VudGVyIDw9IDAgJiZcbiAgICAgICAgICAgICAgICAoIWN1cnJlbnRUcmVlLmNoaWxkcmVuW2luZGV4ZXNbaV1dLl9oYXNFbGVtZW50IHx8IGlzTGFzdCkpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50VHJlZS5jaGlsZHJlbi5zcGxpY2UoaW5kZXhlc1tpXSwgMSk7XG4gICAgICAgICAgICAgICAgaXNTcGxpdHRlZCA9IHRydWU7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY3VycmVudFRyZWUgPSBjdXJyZW50VHJlZS5jaGlsZHJlbltpbmRleGVzW2ldXTtcbiAgICAgICAgICAgICsraTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKCFpc1NwbGl0dGVkKXsgY3VycmVudFRyZWUuZSA9IG51bGw7fTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBUaGUgb3JkZXJlZCB0cmVlIGNhbiBiZSBsaW5lYXJpemVkIGludG8gYSBzZXF1ZW5jZS4gVGhpcyBmdW5jdGlvbiBnZXQgdGhlXG4gICAgICogaW5kZXggb2YgdGhlIHBhdGggcmVwcmVzZW50ZWQgYnkgdGhlIGxpc3Qgb2YgdHJpcGxlcy5cbiAgICAgKiBAcGFyYW0ge0xTZXFOb2RlfSBub2RlIFRoZSBub2RlIGNvbnRhaW5pbmcgLS0gYXQgbGVhc3QgLS0gdGhlIHBhdGggdG8gdGhlXG4gICAgICogZWxlbWVudC5cbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSBpbmRleCBvZiB0aGUgbm9kZSBpbiB0aGUgbGluZWFyaXplZCBzZXF1ZW5jZTsgLTEgaWZcbiAgICAgKiB0aGUgZWxlbWVudCBkb2VzIG5vdCBleGlzdC5cbiAgICAgKi9cbiAgICBpbmRleE9mIChub2RlKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ZXMgPSB0aGlzLl9nZXRJbmRleGVzKG5vZGUpO1xuICAgICAgICBsZXQgc3VtID0gMCwgY3VycmVudFRyZWUgPSB0aGlzLCBqO1xuICAgICAgICBcbiAgICAgICAgLy8gIzEgSWYgdGhlIG5vZGUgZG9lcyBub3QgZXhpc3QsIHN0b3BcbiAgICAgICAgaWYgKGluZGV4ZXMubGVuZ3RoID09PSAwKSB7IHJldHVybiAtMTsgfTtcblxuICAgICAgICAvLyAjMiBPdGhlcndpc2UsIHN0YXJ0IGNvdW50aW5nXG4gICAgICAgIGlmIChjdXJyZW50VHJlZS5faGFzRWxlbWVudCkgeyBzdW0gKz0gMTsgfTtcbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5kZXhlcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgaWYgKGluZGV4ZXNbaV0gPCBjdXJyZW50VHJlZS5jaGlsZHJlbi5sZW5ndGgvMikge1xuICAgICAgICAgICAgICAgIC8vICNBIHN0YXJ0IGZyb20gdGhlIGJlZ2lubmluZyBbLS0tLT58ICAgICBdXG4gICAgICAgICAgICAgICAgaiA9IDA7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGogPCBpbmRleGVzW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VHJlZS5jaGlsZHJlbltqXS5faGFzRWxlbWVudCkgeyBzdW0gKz0gMTsgfTtcbiAgICAgICAgICAgICAgICAgICAgc3VtICs9IGN1cnJlbnRUcmVlLmNoaWxkcmVuW2pdLnN1YkNvdW50ZXI7XG4gICAgICAgICAgICAgICAgICAgICsrajtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyAjQiBzdGFydCBmcm9tIHRoZSBlbmQgWyAgICAgfDwtLS0tXVxuICAgICAgICAgICAgICAgIHN1bSArPSBjdXJyZW50VHJlZS5zdWJDb3VudGVyO1xuICAgICAgICAgICAgICAgIGogPSBjdXJyZW50VHJlZS5jaGlsZHJlbi5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICAgIHdoaWxlIChqID49IGluZGV4ZXNbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRUcmVlLmNoaWxkcmVuW2pdLl9oYXNFbGVtZW50KXsgc3VtIC09IDE7IH07XG4gICAgICAgICAgICAgICAgICAgIHN1bSAtPSBjdXJyZW50VHJlZS5jaGlsZHJlbltqXS5zdWJDb3VudGVyO1xuICAgICAgICAgICAgICAgICAgICAtLWo7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBqICs9IDE7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRUcmVlLmNoaWxkcmVuW2pdLl9oYXNFbGVtZW50KSB7IHN1bSArPSAxOyB9O1xuICAgICAgICAgICAgY3VycmVudFRyZWUgPSBjdXJyZW50VHJlZS5jaGlsZHJlbltqXTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHN1bSAtIDE7IC8vIC0xIGJlY2F1c2UgYWxnb3JpdGhtIGNvdW50ZWQgdGhlIGVsZW1lbnQgaXRzZWxmXG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICogVGhlIG9yZGVyZWQgdHJlZSBjYW4gYmUgbGluZWFyaXplZC4gVGhpcyBmdW5jdGlvbiBnZXRzIHRoZSBub2RlIGF0IHRoZVxuICAgICAqIGluZGV4IGluIHRoZSBwcm9qZWN0ZWQgc2VxdWVuY2UuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4IFRoZSBpbmRleCBpbiB0aGUgc2VxdWVuY2UuXG4gICAgICogQHJldHVybiB7TFNlcU5vZGV9IFRoZSBub2RlIGF0IHRoZSBpbmRleC5cbiAgICAgKi9cbiAgICBnZXQgKGluZGV4KSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBsZWZ0U3VtIFRoZSBzdW0gb2YgYWxsIGVsZW1lbnQgYXQgdGhlIGxlZnQgb2YgdGhlXG4gICAgICAgICAqIGN1cnJlbnQgaW5zcGVjdGVkIG5vZGUuXG4gICAgICAgICAqIEBwYXJhbSB7TFNlcU5vZGV9IGJ1aWxkaW5nTm9kZSBUaGUgaGVhZCBwYXJ0IG9mIHRoZSBub2RlIGJlaW5nIGJ1aWx0XG4gICAgICAgICAqIGFzIHdlIGNyYXdsLlxuICAgICAgICAgKiBAcGFyYW0ge0xTZXFOb2RlfSBxdWV1ZSBUaGUgcXVldWUgcGFydCBvZiB0aGUgbm9kZSBiZWluZyBidWlsdC5cbiAgICAgICAgICogQHBhcmFtIHtMU2VxTm9kZX0gY3VycmVudE5vZGUgVGhlIHN1YnRyZWUgYmVpbmcgY3Jhd2xlZC5cbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0IF9nZXQgPSAobGVmdFN1bSwgYnVpbGRpbmdOb2RlLCBxdWV1ZSwgY3VycmVudE5vZGUpID0+IHtcbiAgICAgICAgICAgIGxldCBzdGFydEJlZ2lubmluZyA9IHRydWUsIHVzZUZ1bmN0aW9uLCBpID0gMCwgcCwgdGVtcDtcbiAgICAgICAgICAgIC8vICMwIFRoZSBub2RlIGlzIGZvdW5kLCByZXR1cm4gdGhlIGluY3JlbWVudGFsbHkgYnVpbHQgbm9kZSBhbmRcbiAgICAgICAgICAgIC8vIHByYWlzZSB0aGUgc3VuICFcbiAgICAgICAgICAgIGlmIChsZWZ0U3VtID09PSBpbmRleCAmJiBjdXJyZW50Tm9kZS5faGFzRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIC8vIDFhIGNvcHkgdGhlIHZhbHVlIG9mIHRoZSBlbGVtZW50IGluIHRoZSBwYXRoXG4gICAgICAgICAgICAgICAgcXVldWUuZSA9IGN1cnJlbnROb2RlLmU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJ1aWxkaW5nTm9kZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoY3VycmVudE5vZGUuX2hhc0VsZW1lbnQpeyBsZWZ0U3VtICs9IDE7IH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vICMxIHNlYXJjaDogZG8gSSBzdGFydCBmcm9tIHRoZSBiZWdpbm5pbmcgb3IgdGhlIGVuZFxuICAgICAgICAgICAgc3RhcnRCZWdpbm5pbmcgPSBpbmRleC1sZWZ0U3VtIDwgY3VycmVudE5vZGUuc3ViQ291bnRlci8yO1xuICAgICAgICAgICAgaWYgKHN0YXJ0QmVnaW5uaW5nKSB7XG4gICAgICAgICAgICAgICAgdXNlRnVuY3Rpb24gPSAoYSwgYikgPT4gYSArIGI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxlZnRTdW0gKz0gY3VycmVudE5vZGUuc3ViQ291bnRlcjtcbiAgICAgICAgICAgICAgICB1c2VGdW5jdGlvbiA9IChhLCBiKSA9PiBhIC0gYjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gIzJhIGNvdW50aW5nIHRoZSBlbGVtZW50IGZyb20gbGVmdCB0byByaWdodFxuICAgICAgICAgICAgaWYgKCFzdGFydEJlZ2lubmluZykgeyBpID0gY3VycmVudE5vZGUuY2hpbGRyZW4ubGVuZ3RoIC0gMTsgfTtcbiAgICAgICAgICAgIHdoaWxlICgoc3RhcnRCZWdpbm5pbmcgJiYgbGVmdFN1bSA8PSBpbmRleCkgfHxcbiAgICAgICAgICAgICAgICAgICAoIXN0YXJ0QmVnaW5uaW5nICYmIGxlZnRTdW0gPiBpbmRleCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudE5vZGUuY2hpbGRyZW5baV0uX2hhc0VsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGVmdFN1bSA9IHVzZUZ1bmN0aW9uKGxlZnRTdW0sIDEpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgbGVmdFN1bSA9IHVzZUZ1bmN0aW9uKGxlZnRTdW0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlLmNoaWxkcmVuW2ldLnN1YkNvdW50ZXIpO1xuICAgICAgICAgICAgICAgIGkgPSB1c2VGdW5jdGlvbihpLCAxKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vICMyYiBkZWNyZWFzaW5nIHRoZSBpbmNyZW1lbnRhdGlvblxuICAgICAgICAgICAgaSA9IHVzZUZ1bmN0aW9uKGksIC0xKTtcbiAgICAgICAgICAgIGlmIChzdGFydEJlZ2lubmluZykge1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50Tm9kZS5jaGlsZHJlbltpXS5faGFzRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICBsZWZ0U3VtID0gdXNlRnVuY3Rpb24obGVmdFN1bSwgLTEpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgbGVmdFN1bSA9IHVzZUZ1bmN0aW9uKGxlZnRTdW0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC1jdXJyZW50Tm9kZS5jaGlsZHJlbltpXS5zdWJDb3VudGVyKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vICMzIGJ1aWxkIHBhdGhcbiAgICAgICAgICAgIHAgPSBbXTsgcC5wdXNoKGN1cnJlbnROb2RlLmNoaWxkcmVuW2ldLnQpO1xuICAgICAgICAgICAgaWYgKGJ1aWxkaW5nTm9kZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGJ1aWxkaW5nTm9kZSA9IG5ldyBMU2VxTm9kZShwLCBudWxsKTtcbiAgICAgICAgICAgICAgICBxdWV1ZSA9IGJ1aWxkaW5nTm9kZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGVtcCA9IG5ldyBMU2VxTm9kZShwLCBudWxsKTtcbiAgICAgICAgICAgICAgICBxdWV1ZS5hZGQodGVtcCk7XG4gICAgICAgICAgICAgICAgcXVldWUgPSB0ZW1wO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBfZ2V0KGxlZnRTdW0sIGJ1aWxkaW5nTm9kZSwgcXVldWUsIGN1cnJlbnROb2RlLmNoaWxkcmVuW2ldKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF9nZXQoMCwgbnVsbCwgbnVsbCwgdGhpcyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENhc3QgYSBKU09OIG9iamVjdCB0byBhbiBMU2VxTm9kZS4gXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG8gVGhlIEpTT04gb2JqZWN0LlxuICAgICAqIEByZXR1cm4ge0xTZXFOb2RlfSBBbiBMU2VxTm9kZS5cbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbUpTT04gKG8pIHtcbiAgICAgICAgbGV0IGJlaW5nQnVpbHQ7XG5cbiAgICAgICAgLy8gIzEgbGVhZlxuICAgICAgICBpZiAoby5jaGlsZHJlbi5sZW5ndGggPT09IDApe1xuICAgICAgICAgICAgYmVpbmdCdWlsdCA9IG5ldyBMU2VxTm9kZShbbmV3IFRyaXBsZShvLnQucCwgby50LnMsIG8udC5jKV0sIG8uZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyAjMiBicmFuY2hcbiAgICAgICAgICAgIGJlaW5nQnVpbHQgPSBuZXcgTFNlcU5vZGUoW25ldyBUcmlwbGUoby50LnAsIG8udC5zLCBvLnQuYyldKTtcbiAgICAgICAgICAgIGJlaW5nQnVpbHQuY2hpbGRyZW4ucHVzaChMU2VxTm9kZS5mcm9tSlNPTihvLmNoaWxkcmVuWzBdKSk7XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gYmVpbmdCdWlsdDtcbiAgICB9O1xuICAgIFxuICAgIC8qKlxuICAgICAqIEBwcml2YXRlIEdldCB0aGUgbGlzdCBvZiBpbmRleGVzIG9mIHRoZSBhcnJheXMgcmVwcmVzZW50aW5nIHRoZSBjaGlsZHJlblxuICAgICAqIGluIHRoZSB0cmVlLiAgXG4gICAgICogQHBhcmFtIHtMU2VxTm9kZX0gbm9kZSBUaGUgbm9kZSBjb250YWluaW5nIHRoZSBwYXRoLlxuICAgICAqIEByZXR1cm4ge051bWJlcltdfSBUaGUgc3VjY2Vzc2l2ZSBpbmRleGVzIHRvIGdldCB0byB0aGUgbm9kZS4gQW4gZW1wdHlcbiAgICAgKiBsaXN0IGlmIHRoZSBub2RlIGRvZXMgbm90IGV4aXN0LlxuICAgICAqL1xuICAgIF9nZXRJbmRleGVzIChub2RlKSB7XG4gICAgICAgIGNvbnN0IF9fZ2V0SW5kZXhlcyA9IChpbmRleGVzLCBjdXJyZW50VHJlZSwgY3VycmVudE5vZGUpID0+IHtcbiAgICAgICAgICAgIGlmICghY3VycmVudFRyZWUuX2NvbnRhaW5zKGN1cnJlbnROb2RlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gY3VycmVudFRyZWUuX2JpbmFyeUluZGV4T2YoY3VycmVudE5vZGUpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpbmRleGVzLnB1c2goaW5kZXgpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gKChjdXJyZW50Tm9kZS5jaGlsZHJlbi5sZW5ndGggPT09IDAgfHxcbiAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUcmVlLmNoaWxkcmVuLmxlbmd0aCA9PT0gMCkgJiYgaW5kZXhlcykgfHxcbiAgICAgICAgICAgICAgICBfX2dldEluZGV4ZXMoaW5kZXhlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFRyZWUuY2hpbGRyZW5baW5kZXhdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Tm9kZS5jaGlsZCk7ICAgICAgICAgICAgXG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gX19nZXRJbmRleGVzKFtdLCB0aGlzLCBub2RlKTtcbiAgICB9O1xuICAgIFxuICAgIFxuXG5cbiAgICAvKipcbiAgICAgKiBAcHJpdmF0ZSBmcm9tOiBbaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vV29sZnk4Ny81NzM0NTMwXSBQZXJmb3JtcyBhXG4gICAgICogYmluYXJ5IHNlYXJjaCBvbiB0aGUgaG9zdCBhcnJheS5cbiAgICAgKiBAcGFyYW0ge0xTZXFOb2RlfSBzZWFyY2hFbGVtZW50IFRoZSBpdGVtIHRvIHNlYXJjaCBmb3Igd2l0aGluIHRoZSBhcnJheS5cbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSBpbmRleCBvZiB0aGUgZWxlbWVudCB3aGljaCBkZWZhdWx0cyB0byAtMSB3aGVuIG5vdFxuICAgICAqIGZvdW5kLlxuICAgICAqL1xuICAgIF9iaW5hcnlJbmRleE9mIChzZWFyY2hFbGVtZW50KSB7XG4gICAgICAgIGxldCBtaW5JbmRleCA9IDA7XG4gICAgICAgIGxldCBtYXhJbmRleCA9IHRoaXMuY2hpbGRyZW4ubGVuZ3RoIC0gMTtcbiAgICAgICAgbGV0IGN1cnJlbnRJbmRleDtcbiAgICAgICAgbGV0IGN1cnJlbnRFbGVtZW50O1xuICAgICAgICBcbiAgICAgICAgd2hpbGUgKG1pbkluZGV4IDw9IG1heEluZGV4KSB7XG4gICAgICAgICAgICBjdXJyZW50SW5kZXggPSBNYXRoLmZsb29yKChtaW5JbmRleCArIG1heEluZGV4KSAvIDIpO1xuICAgICAgICAgICAgY3VycmVudEVsZW1lbnQgPSB0aGlzLmNoaWxkcmVuW2N1cnJlbnRJbmRleF07XG4gICAgICAgICAgICBpZiAoY3VycmVudEVsZW1lbnQuY29tcGFyZVRvKHNlYXJjaEVsZW1lbnQpIDwgMCkge1xuICAgICAgICAgICAgICAgIG1pbkluZGV4ID0gY3VycmVudEluZGV4ICsgMTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudEVsZW1lbnQuY29tcGFyZVRvKHNlYXJjaEVsZW1lbnQpID4gMCkge1xuICAgICAgICAgICAgICAgIG1heEluZGV4ID0gY3VycmVudEluZGV4IC0gMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRJbmRleDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB+bWF4SW5kZXg7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEBwcml2YXRlIENoZWNrIHdoZXRoZXIgdGhpcyBub2RlIGNvbnRhaW5zIHRoZSBzZWFyY2hFbGVtZW50IGFzIGNoaWxkcmVuLlxuICAgICAqIEBwYXJhbSB7TFNlcU5vZGV9IHNlYXJjaEVsZW1lbnQgVGhlIGVsZW1lbnQgdG8gbG9vayBmb3IuXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGlzIG5vZGUgY29udGFpbnMgdGhlIG5vZGUgaW4gaXRzXG4gICAgICogY2hpbGRyZW4sIEZhbHNlIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBfY29udGFpbnMgKHNlYXJjaEVsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9iaW5hcnlJbmRleE9mKHNlYXJjaEVsZW1lbnQpO1xuICAgICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5sZW5ndGggPiAwICYmXG4gICAgICAgICAgICAoaW5kZXggPiAwIHx8XG4gICAgICAgICAgICAgKChpbmRleCA9PT0gMCkgJiZcbiAgICAgICAgICAgICAgdGhpcy5jaGlsZC5jb21wYXJlVG8oc2VhcmNoRWxlbWVudCkgPT09IDApKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQHByaXZhdGUgQ2hlY2sgaWYgdGhlIG5vZGUgY29udGFpbnMgYW4gZWxlbWVudC5cbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSBUcnVlIGlmIHRoZSBub2RlIGhhcyBhbiBlbGVtZW50LCBmYWxzZSBvdGhlcndpc2UuXG4gICAgICovXG4gICAgZ2V0IF9oYXNFbGVtZW50ICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZSAhPT0gbnVsbDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdGhlIG5vZGUgaGFzIGNoaWxkcmVuLlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IFRydWUgaWYgdGhlIG5vZGUgaGFzIGNoaWxkcmVuLCBmYWxzZSBvdGhlcndpc2UuXG4gICAgICovXG4gICAgZ2V0IGlzTGVhZiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuLmxlbmd0aCA9PT0gMDtcbiAgICB9O1xuICAgIFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBMU2VxTm9kZTtcblxuIl19
},{"./triple.js":5}],4:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0cmF0ZWd5LmpzIl0sIm5hbWVzIjpbIkJJIiwicmVxdWlyZSIsIklkZW50aWZpZXIiLCJTdHJhdGVneSIsImJhc2UiLCJib3VuZGFyeSIsIl9iYXNlIiwiX2JvdW5kYXJ5IiwicCIsInEiLCJsZXZlbCIsImludGVydmFsIiwicyIsImMiLCJjb3B5UCIsImNvcHlRIiwic3RlcCIsIk1hdGgiLCJtaW4iLCJkaWdpdCIsImludDJiaWdJbnQiLCJnZXRTdW1CaXQiLCJ2YWx1ZSIsImkiLCJ0IiwiYWRkSW50XyIsImxlZnRTaGlmdF8iLCJnZXRCaXRCYXNlIiwiaXNMZWFmIiwiY2hpbGQiLCJmbG9vciIsInJhbmRvbSIsIl9nZXRTQyIsInBJc0dyZWF0ZXIiLCJjb21tb25Sb290IiwicHJldlZhbHVlIiwibmV4dFZhbHVlIiwicG93IiwiZCIsInNvdXJjZXMiLCJjb3VudGVycyIsInN1bUJpdCIsInRlbXBEaWdpdCIsImR1cCIsInJpZ2h0U2hpZnRfIiwibW9kSW50IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQUVBLElBQU1BLEtBQUtDLFFBQVEsUUFBUixDQUFYO0FBQ0EsSUFBTUMsYUFBYUQsUUFBUSxpQkFBUixDQUFuQjs7QUFFQTs7Ozs7SUFJTUUsUTtBQUNGOzs7OztBQUtBLHNCQUFhQyxJQUFiLEVBQWtDO0FBQUEsWUFBZkMsUUFBZSx1RUFBSixFQUFJOztBQUFBOztBQUM5QixhQUFLQyxLQUFMLEdBQWFGLElBQWI7QUFDQSxhQUFLRyxTQUFMLEdBQWlCRixRQUFqQjtBQUNIOzs7Ozs7QUFFRDs7Ozs7Ozs7Ozs7OzhCQVlPRyxDLEVBQUdDLEMsRUFBR0MsSyxFQUFPQyxRLEVBQVVDLEMsRUFBR0MsQyxFQUFHO0FBQ2hDLGdCQUFJQyxRQUFRTixDQUFaO0FBQUEsZ0JBQWVPLFFBQVFOLENBQXZCO0FBQUEsZ0JBQ0lPLE9BQU9DLEtBQUtDLEdBQUwsQ0FBUyxLQUFLWCxTQUFkLEVBQXlCSSxRQUF6QixDQURYO0FBQUEsZ0JBQytDO0FBQzNDUSxvQkFBUW5CLEdBQUdvQixVQUFILENBQWMsQ0FBZCxFQUFpQixLQUFLZCxLQUFMLENBQVdlLFNBQVgsQ0FBcUJYLEtBQXJCLENBQWpCLENBRlo7QUFBQSxnQkFHSVksY0FISjs7QUFLQTtBQUNBLGlCQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsS0FBS2IsS0FBckIsRUFBNEIsRUFBRWEsQ0FBOUIsRUFBaUM7QUFDcENELHdCQUFTZCxLQUFLQSxFQUFFZ0IsQ0FBRixDQUFJaEIsQ0FBVixJQUFnQixDQUF4QjtBQUNPUixtQkFBR3lCLE9BQUgsQ0FBV04sS0FBWCxFQUFrQkcsS0FBbEI7QUFDQSxvQkFBSUMsTUFBTWIsS0FBVixFQUFpQjtBQUNiVix1QkFBRzBCLFVBQUgsQ0FBY1AsS0FBZCxFQUFxQixLQUFLYixLQUFMLENBQVdxQixVQUFYLENBQXNCSixJQUFJLENBQTFCLENBQXJCO0FBQ0g7QUFDRGYsb0JBQUtBLEtBQUssQ0FBQ0EsRUFBRW9CLE1BQVIsSUFBa0JwQixFQUFFcUIsS0FBckIsSUFBK0IsSUFBbkM7QUFDSDtBQUNEO0FBQ0E7QUFDQTdCLGVBQUd5QixPQUFILENBQVdOLEtBQVgsRUFBa0JGLEtBQUthLEtBQUwsQ0FBV2IsS0FBS2MsTUFBTCxLQUFnQmYsSUFBaEIsR0FBdUIsQ0FBbEMsQ0FBbEI7QUFDQTtBQUNBLG1CQUFPLEtBQUtnQixNQUFMLENBQVliLEtBQVosRUFBbUJMLEtBQW5CLEVBQTBCQyxLQUExQixFQUFpQ0wsS0FBakMsRUFBd0NFLENBQXhDLEVBQTJDQyxDQUEzQyxDQUFQO0FBQ0g7Ozs7O0FBSUQ7Ozs7Ozs7Ozs7OytCQVdRTCxDLEVBQUdDLEMsRUFBR0MsSyxFQUFPQyxRLEVBQVVDLEMsRUFBR0MsQyxFQUFHO0FBQ2pDLGdCQUFJQyxRQUFRTixDQUFaO0FBQUEsZ0JBQWVPLFFBQVFOLENBQXZCO0FBQUEsZ0JBQ0lPLE9BQU9DLEtBQUtDLEdBQUwsQ0FBUyxLQUFLWCxTQUFkLEVBQXlCSSxRQUF6QixDQURYO0FBQUEsZ0JBQzhDO0FBQzFDUSxvQkFBUW5CLEdBQUdvQixVQUFILENBQWMsQ0FBZCxFQUFpQixLQUFLZCxLQUFMLENBQVdlLFNBQVgsQ0FBcUJYLEtBQXJCLENBQWpCLENBRlo7QUFBQSxnQkFHSXVCLGFBQWEsS0FIakI7QUFBQSxnQkFHd0JDLGFBQWEsSUFIckM7QUFBQSxnQkFJSUMsa0JBSko7QUFBQSxnQkFJZUMsa0JBSmY7O0FBTUE7QUFDQSxpQkFBSyxJQUFJYixJQUFJLENBQWIsRUFBZ0JBLEtBQUtiLEtBQXJCLEVBQTRCLEVBQUVhLENBQTlCLEVBQWlDO0FBQzdCWSw0QkFBYTNCLEtBQUtBLEVBQUVnQixDQUFGLENBQUloQixDQUFWLElBQWdCLENBQTVCO0FBQ0E0Qiw0QkFBYTNCLEtBQUtBLEVBQUVlLENBQUYsQ0FBSWhCLENBQVYsSUFBZ0IsQ0FBNUI7O0FBRUEsb0JBQUkwQixjQUFjQyxjQUFjQyxTQUFoQyxFQUEyQztBQUN2Q0YsaUNBQWEsS0FBYjtBQUNBRCxpQ0FBYUUsWUFBWUMsU0FBekI7QUFDSDtBQUNELG9CQUFJSCxVQUFKLEVBQWdCO0FBQ1pHLGdDQUFZbkIsS0FBS29CLEdBQUwsQ0FBUyxDQUFULEVBQVcsS0FBSy9CLEtBQUwsQ0FBV3FCLFVBQVgsQ0FBc0JKLENBQXRCLENBQVgsSUFBcUMsQ0FBakQ7QUFDSDtBQUNEdkIsbUJBQUd5QixPQUFILENBQVdOLEtBQVgsRUFBa0JpQixTQUFsQjtBQUNBLG9CQUFJYixNQUFNYixLQUFWLEVBQWlCO0FBQ2JWLHVCQUFHMEIsVUFBSCxDQUFjUCxLQUFkLEVBQW9CLEtBQUtiLEtBQUwsQ0FBV3FCLFVBQVgsQ0FBc0JKLElBQUUsQ0FBeEIsQ0FBcEI7QUFDSDs7QUFFRGQsb0JBQUtBLEtBQUssQ0FBQ0EsRUFBRW1CLE1BQVIsSUFBa0JuQixFQUFFb0IsS0FBckIsSUFBK0IsSUFBbkM7QUFDQXJCLG9CQUFLQSxLQUFLLENBQUNBLEVBQUVvQixNQUFSLElBQWtCcEIsRUFBRXFCLEtBQXJCLElBQStCLElBQW5DO0FBQ0g7O0FBRUQ7QUFDQTtBQUNBLGdCQUFJSSxVQUFKLEVBQWdCO0FBQ1pqQyxtQkFBR3lCLE9BQUgsQ0FBV04sS0FBWCxFQUFrQixDQUFDRixLQUFLYSxLQUFMLENBQVdiLEtBQUtjLE1BQUwsS0FBY2YsSUFBekIsQ0FBbkI7QUFDSCxhQUZELE1BRU87QUFDSGhCLG1CQUFHeUIsT0FBSCxDQUFXTixLQUFYLEVBQWtCLENBQUNGLEtBQUthLEtBQUwsQ0FBV2IsS0FBS2MsTUFBTCxLQUFjZixJQUF6QixDQUFELEdBQWdDLENBQWxEO0FBQ0g7O0FBRUQ7QUFDQSxtQkFBTyxLQUFLZ0IsTUFBTCxDQUFZYixLQUFaLEVBQW1CTCxLQUFuQixFQUEwQkMsS0FBMUIsRUFBaUNMLEtBQWpDLEVBQXdDRSxDQUF4QyxFQUEyQ0MsQ0FBM0MsQ0FBUDtBQUNIOzs7OztBQUVEOzs7Ozs7Ozs7OzsrQkFXUXlCLEMsRUFBRzlCLEMsRUFBR0MsQyxFQUFHQyxLLEVBQU9FLEMsRUFBR0MsQyxFQUFHO0FBQzFCLGdCQUFJMEIsVUFBVSxFQUFkO0FBQUEsZ0JBQWtCQyxXQUFXLEVBQTdCO0FBQUEsZ0JBQ0lqQixJQUFJLENBRFI7QUFBQSxnQkFFSWtCLFNBQVMsS0FBS25DLEtBQUwsQ0FBV2UsU0FBWCxDQUFxQlgsS0FBckIsQ0FGYjtBQUFBLGdCQUdJZ0Msa0JBSEo7QUFBQSxnQkFHZXBCLGNBSGY7O0FBS0EsbUJBQU9DLEtBQUtiLEtBQVosRUFBbUI7QUFDZmdDLDRCQUFZMUMsR0FBRzJDLEdBQUgsQ0FBT0wsQ0FBUCxDQUFaO0FBQ0F0QyxtQkFBRzRDLFdBQUgsQ0FBZUYsU0FBZixFQUEwQkQsU0FBUyxLQUFLbkMsS0FBTCxDQUFXZSxTQUFYLENBQXFCRSxDQUFyQixDQUFuQztBQUNBRCx3QkFBUXRCLEdBQUc2QyxNQUFILENBQVVILFNBQVYsRUFBcUJ6QixLQUFLb0IsR0FBTCxDQUFTLENBQVQsRUFBWSxLQUFLL0IsS0FBTCxDQUFXcUIsVUFBWCxDQUFzQkosQ0FBdEIsQ0FBWixDQUFyQixDQUFSO0FBQ0FnQix3QkFBUWhCLENBQVIsSUFBV1gsQ0FBWDtBQUNBNEIseUJBQVNqQixDQUFULElBQVlWLENBQVo7O0FBRUEsb0JBQUlKLEtBQUtBLEVBQUVlLENBQUYsQ0FBSWhCLENBQUosS0FBVWMsS0FBbkIsRUFBMEI7QUFBRWlCLDRCQUFRaEIsQ0FBUixJQUFXZCxFQUFFZSxDQUFGLENBQUlaLENBQWYsQ0FBa0I0QixTQUFTakIsQ0FBVCxJQUFZZCxFQUFFZSxDQUFGLENBQUlYLENBQWhCO0FBQW9CO0FBQ2xFLG9CQUFJTCxLQUFLQSxFQUFFZ0IsQ0FBRixDQUFJaEIsQ0FBSixLQUFVYyxLQUFuQixFQUEwQjtBQUFFaUIsNEJBQVFoQixDQUFSLElBQVdmLEVBQUVnQixDQUFGLENBQUlaLENBQWYsQ0FBa0I0QixTQUFTakIsQ0FBVCxJQUFZZixFQUFFZ0IsQ0FBRixDQUFJWCxDQUFoQjtBQUFvQjs7QUFFbEVKLG9CQUFLQSxLQUFLLENBQUNBLEVBQUVtQixNQUFSLElBQWtCbkIsRUFBRW9CLEtBQXJCLElBQStCLElBQW5DO0FBQ0FyQixvQkFBS0EsS0FBSyxDQUFDQSxFQUFFb0IsTUFBUixJQUFrQnBCLEVBQUVxQixLQUFyQixJQUErQixJQUFuQzs7QUFFQSxrQkFBRU4sQ0FBRjtBQUNIOztBQUVELG1CQUFPLElBQUlyQixVQUFKLENBQWUsS0FBS0ksS0FBcEIsRUFBMkJnQyxDQUEzQixFQUE4QkMsT0FBOUIsRUFBdUNDLFFBQXZDLENBQVA7QUFDSDs7Ozs7O0FBRUo7O0FBRURNLE9BQU9DLE9BQVAsR0FBaUI1QyxRQUFqQiIsImZpbGUiOiJzdHJhdGVneS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgQkkgPSByZXF1aXJlKCdCaWdJbnQnKTtcbmNvbnN0IElkZW50aWZpZXIgPSByZXF1aXJlKCcuL2lkZW50aWZpZXIuanMnKTtcblxuLyoqXG4gKiBFbnVtZXJhdGUgdGhlIGF2YWlsYWJsZSBzdWItYWxsb2NhdGlvbiBzdHJhdGVnaWVzLiBUaGUgc2lnbmF0dXJlIG9mIHRoZXNlXG4gKiBmdW5jdGlvbnMgaXMgZihJZCwgSWQsIE4rLCBOKywgTiwgTik6IElkLlxuICovXG5jbGFzcyBTdHJhdGVneSB7ICAgIFxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7QmFzZX0gYmFzZSBUaGUgYmFzZSB1c2VkIHRvIGNyZWF0ZSB0aGUgbmV3IGlkZW50aWZpZXJzLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbYm91bmRhcnkgPSAxMF0gVGhlIHZhbHVlIHVzZWQgYXMgdGhlIGRlZmF1bHQgbWF4aW11bVxuICAgICAqIHNwYWNpbmcgYmV0d2VlbiBpZGVudGlmaWVycy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvciAoYmFzZSwgYm91bmRhcnkgPSAxMCkge1xuICAgICAgICB0aGlzLl9iYXNlID0gYmFzZTtcbiAgICAgICAgdGhpcy5fYm91bmRhcnkgPSBib3VuZGFyeTtcbiAgICB9O1xuICAgIFxuICAgIC8qKlxuICAgICAqIENob29zZSBhbiBpZGVudGlmaWVyIHN0YXJ0aW5nIGZyb20gcHJldmlvdXMgYm91bmQgYW5kIGFkZGluZyByYW5kb21cbiAgICAgKiBudW1iZXIuXG4gICAgICogQHBhcmFtIHtMU2VxTm9kZX0gcCBUaGUgcHJldmlvdXMgaWRlbnRpZmllci5cbiAgICAgKiBAcGFyYW0ge0xTZXFOb2RlfSBxIFRoZSBuZXh0IGlkZW50aWZpZXIuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGxldmVsIFRoZSBudW1iZXIgb2YgY29uY2F0ZW5hdGlvbiBjb21wb3NpbmcgdGhlIG5ld1xuICAgICAqIGlkZW50aWZpZXIuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGludGVydmFsIFRoZSBpbnRlcnZhbCBiZXR3ZWVuIHAgYW5kIHEuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHMgVGhlIHNvdXJjZSB0aGF0IGNyZWF0ZXMgdGhlIG5ldyBpZGVudGlmaWVyLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBjIFRoZSBjb3VudGVyIG9mIHRoYXQgc291cmNlLlxuICAgICAqIEByZXR1cm4ge0lkZW50aWZpZXJ9IFRoZSBuZXcgYWxsb2NhdGVkIGlkZW50aWZpZXIuXG4gICAgICovXG4gICAgYlBsdXMgKHAsIHEsIGxldmVsLCBpbnRlcnZhbCwgcywgYykge1xuICAgICAgICBsZXQgY29weVAgPSBwLCBjb3B5USA9IHEsXG4gICAgICAgICAgICBzdGVwID0gTWF0aC5taW4odGhpcy5fYm91bmRhcnksIGludGVydmFsKSwgLy8jMCB0aGUgbWluIGludGVydmFsXG4gICAgICAgICAgICBkaWdpdCA9IEJJLmludDJiaWdJbnQoMCwgdGhpcy5fYmFzZS5nZXRTdW1CaXQobGV2ZWwpKSxcbiAgICAgICAgICAgIHZhbHVlO1xuICAgICAgICBcbiAgICAgICAgLy8gIzEgY29weSB0aGUgcHJldmlvdXMgaWRlbnRpZmllclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBsZXZlbDsgKytpKSB7XG5cdCAgICB2YWx1ZSA9IChwICYmIHAudC5wKSB8fCAwO1xuICAgICAgICAgICAgQkkuYWRkSW50XyhkaWdpdCwgdmFsdWUpO1xuICAgICAgICAgICAgaWYgKGkgIT09IGxldmVsKSB7XG4gICAgICAgICAgICAgICAgQkkubGVmdFNoaWZ0XyhkaWdpdCwgdGhpcy5fYmFzZS5nZXRCaXRCYXNlKGkgKyAxKSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcCA9IChwICYmICFwLmlzTGVhZiAmJiBwLmNoaWxkKSB8fCBudWxsO1xuICAgICAgICB9O1xuICAgICAgICAvLyAjMiBjcmVhdGUgYSBkaWdpdCBmb3IgYW4gaWRlbnRpZmllciBieSBhZGRpbmcgYSByYW5kb20gdmFsdWVcbiAgICAgICAgLy8gI0EgRGlnaXRcbiAgICAgICAgQkkuYWRkSW50XyhkaWdpdCwgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogc3RlcCArIDEpKTtcbiAgICAgICAgLy8gI0IgU291cmNlICYgY291bnRlclxuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0U0MoZGlnaXQsIGNvcHlQLCBjb3B5USwgbGV2ZWwsIHMsIGMpO1xuICAgIH07XG5cblxuICAgIFxuICAgIC8qKlxuICAgICAqIENob29zZSBhbiBpZGVudGlmaWVyIHN0YXJ0aW5nIGZyb20gbmV4dCBib3VuZCBhbmQgc3Vic3RyYWN0IGEgcmFuZG9tXG4gICAgICogbnVtYmVyLlxuICAgICAqIEBwYXJhbSB7TFNlcU5vZGV9IHAgVGhlIHByZXZpb3VzIGlkZW50aWZpZXIuXG4gICAgICogQHBhcmFtIHtMU2VxTm9kZX0gcSBUaGUgbmV4dCBpZGVudGlmaWVyLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBsZXZlbCBUaGUgbnVtYmVyIG9mIGNvbmNhdGVuYXRpb24gY29tcG9zaW5nIHRoZSBuZXdcbiAgICAgKiBpZGVudGlmaWVyLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbnRlcnZhbCBUaGUgaW50ZXJ2YWwgYmV0d2VlbiBwIGFuZCBxLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzIFRoZSBzb3VyY2UgdGhhdCBjcmVhdGVzIHRoZSBuZXcgaWRlbnRpZmllci5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gYyBUaGUgY291bnRlciBvZiB0aGF0IHNvdXJjZS5cbiAgICAgKi9cbiAgICBiTWludXMgKHAsIHEsIGxldmVsLCBpbnRlcnZhbCwgcywgYykge1xuICAgICAgICBsZXQgY29weVAgPSBwLCBjb3B5USA9IHEsXG4gICAgICAgICAgICBzdGVwID0gTWF0aC5taW4odGhpcy5fYm91bmRhcnksIGludGVydmFsKSwvLyAjMCBwcm9jZXNzIG1pbiBpbnRlcnZhbFxuICAgICAgICAgICAgZGlnaXQgPSBCSS5pbnQyYmlnSW50KDAsIHRoaXMuX2Jhc2UuZ2V0U3VtQml0KGxldmVsKSksXG4gICAgICAgICAgICBwSXNHcmVhdGVyID0gZmFsc2UsIGNvbW1vblJvb3QgPSB0cnVlLFxuICAgICAgICAgICAgcHJldlZhbHVlLCBuZXh0VmFsdWU7XG4gICAgICAgIFxuICAgICAgICAvLyAjMSBjb3B5IG5leHQsIGlmIHByZXZpb3VzIGlzIGdyZWF0ZXIsIGNvcHkgbWF4VmFsdWUgQCBkZXB0aFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBsZXZlbDsgKytpKSB7XG4gICAgICAgICAgICBwcmV2VmFsdWUgPSAocCAmJiBwLnQucCkgfHwgMDtcbiAgICAgICAgICAgIG5leHRWYWx1ZSA9IChxICYmIHEudC5wKSB8fCAwO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoY29tbW9uUm9vdCAmJiBwcmV2VmFsdWUgIT09IG5leHRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGNvbW1vblJvb3QgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBwSXNHcmVhdGVyID0gcHJldlZhbHVlID4gbmV4dFZhbHVlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmIChwSXNHcmVhdGVyKSB7XG4gICAgICAgICAgICAgICAgbmV4dFZhbHVlID0gTWF0aC5wb3coMix0aGlzLl9iYXNlLmdldEJpdEJhc2UoaSkpLTE7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgQkkuYWRkSW50XyhkaWdpdCwgbmV4dFZhbHVlKTtcbiAgICAgICAgICAgIGlmIChpICE9PSBsZXZlbCkge1xuICAgICAgICAgICAgICAgIEJJLmxlZnRTaGlmdF8oZGlnaXQsdGhpcy5fYmFzZS5nZXRCaXRCYXNlKGkrMSkpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcSA9IChxICYmICFxLmlzTGVhZiAmJiBxLmNoaWxkKSB8fCBudWxsO1xuICAgICAgICAgICAgcCA9IChwICYmICFwLmlzTGVhZiAmJiBwLmNoaWxkKSB8fCBudWxsO1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgLy8gIzMgY3JlYXRlIGEgZGlnaXQgZm9yIGFuIGlkZW50aWZpZXIgYnkgc3ViaW5nIGEgcmFuZG9tIHZhbHVlXG4gICAgICAgIC8vICNBIERpZ2l0XG4gICAgICAgIGlmIChwSXNHcmVhdGVyKSB7XG4gICAgICAgICAgICBCSS5hZGRJbnRfKGRpZ2l0LCAtTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKnN0ZXApICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBCSS5hZGRJbnRfKGRpZ2l0LCAtTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKnN0ZXApLTEgKTtcbiAgICAgICAgfTtcbiAgICBcbiAgICAgICAgLy8gI0IgU291cmNlICYgY291bnRlclxuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0U0MoZGlnaXQsIGNvcHlQLCBjb3B5USwgbGV2ZWwsIHMsIGMpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDb3BpZXMgdGhlIGFwcHJvcHJpYXRlcyBzb3VyY2UgYW5kIGNvdW50ZXIgZnJvbSB0aGUgYWRqYWNlbnQgaWRlbnRpZmllcnNcbiAgICAgKiBhdCB0aGUgaW5zZXJ0aW9uIHBvc2l0aW9uLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBkIFRoZSBkaWdpdCBwYXJ0IG9mIHRoZSBuZXcgaWRlbnRpZmllci5cbiAgICAgKiBAcGFyYW0ge0xTZXFOb2RlfSBwIFRoZSBwcmV2aW91cyBpZGVudGlmaWVyLlxuICAgICAqIEBwYXJhbSB7TFNlcU5vZGV9IHEgdGhlIG5leHQgaWRlbnRpZmllci5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbGV2ZWwgVGhlIHNpemUgb2YgdGhlIG5ldyBpZGVudGlmaWVyLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzIFRoZSBsb2NhbCBzaXRlIGlkZW50aWZpZXIuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGMgVGhlIGxvY2FsIG1vbm90b25pYyBjb3VudGVyLlxuICAgICAqIEByZXR1cm4ge0lkZW50aWZpZXJ9IFRoZSBuZXcgYWxsb2NhdGVkIGlkZW50aWZpZXIuXG4gICAgICovXG4gICAgX2dldFNDIChkLCBwLCBxLCBsZXZlbCwgcywgYykge1xuICAgICAgICBsZXQgc291cmNlcyA9IFtdLCBjb3VudGVycyA9IFtdLFxuICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICBzdW1CaXQgPSB0aGlzLl9iYXNlLmdldFN1bUJpdChsZXZlbCksXG4gICAgICAgICAgICB0ZW1wRGlnaXQsIHZhbHVlO1xuICAgICAgICBcbiAgICAgICAgd2hpbGUgKGkgPD0gbGV2ZWwpIHtcbiAgICAgICAgICAgIHRlbXBEaWdpdCA9IEJJLmR1cChkKTtcbiAgICAgICAgICAgIEJJLnJpZ2h0U2hpZnRfKHRlbXBEaWdpdCwgc3VtQml0IC0gdGhpcy5fYmFzZS5nZXRTdW1CaXQoaSkpO1xuICAgICAgICAgICAgdmFsdWUgPSBCSS5tb2RJbnQodGVtcERpZ2l0LCBNYXRoLnBvdygyLCB0aGlzLl9iYXNlLmdldEJpdEJhc2UoaSkpKTtcbiAgICAgICAgICAgIHNvdXJjZXNbaV09cztcbiAgICAgICAgICAgIGNvdW50ZXJzW2ldPWM7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChxICYmIHEudC5wID09PSB2YWx1ZSkgeyBzb3VyY2VzW2ldPXEudC5zOyBjb3VudGVyc1tpXT1xLnQuYzsgfTtcbiAgICAgICAgICAgIGlmIChwICYmIHAudC5wID09PSB2YWx1ZSkgeyBzb3VyY2VzW2ldPXAudC5zOyBjb3VudGVyc1tpXT1wLnQuYzsgfTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcSA9IChxICYmICFxLmlzTGVhZiAmJiBxLmNoaWxkKSB8fCBudWxsO1xuICAgICAgICAgICAgcCA9IChwICYmICFwLmlzTGVhZiAmJiBwLmNoaWxkKSB8fCBudWxsO1xuXG4gICAgICAgICAgICArK2k7XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbmV3IElkZW50aWZpZXIodGhpcy5fYmFzZSwgZCwgc291cmNlcywgY291bnRlcnMpO1xuICAgIH07XG4gICAgXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0cmF0ZWd5O1xuIl19
},{"./identifier.js":2,"BigInt":6}],5:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRyaXBsZS5qcyJdLCJuYW1lcyI6WyJUcmlwbGUiLCJwYXRoIiwic2l0ZSIsImNvdW50ZXIiLCJwIiwicyIsImMiLCJvIiwiTnVtYmVyIiwiTUFYX1ZBTFVFIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7Ozs7Ozs7OztJQUlNQSxNOztBQUVGOzs7Ozs7O0FBT0Esb0JBQWFDLElBQWIsRUFBbUJDLElBQW5CLEVBQXlCQyxPQUF6QixFQUFrQztBQUFBOztBQUM5QixhQUFLQyxDQUFMLEdBQVNILElBQVQ7QUFDQSxhQUFLSSxDQUFMLEdBQVNILElBQVQ7QUFDQSxhQUFLSSxDQUFMLEdBQVNILE9BQVQ7QUFDSDs7Ozs7O0FBRUQ7Ozs7OztrQ0FNV0ksQyxFQUFHO0FBQ1Y7QUFDQSxnQkFBSSxLQUFLRixDQUFMLEtBQVdHLE9BQU9DLFNBQWxCLElBQStCLEtBQUtILENBQUwsS0FBV0UsT0FBT0MsU0FBckQsRUFBK0Q7QUFDM0QsdUJBQU8sQ0FBUDtBQUNIO0FBQ0QsZ0JBQUlGLEVBQUVGLENBQUYsS0FBUUcsT0FBT0MsU0FBZixJQUE0QkYsRUFBRUYsQ0FBRixLQUFRRyxPQUFPQyxTQUEvQyxFQUF5RDtBQUNyRCx1QkFBTyxDQUFDLENBQVI7QUFDSDtBQUNEO0FBQ0EsZ0JBQUksS0FBS0wsQ0FBTCxHQUFTRyxFQUFFSCxDQUFmLEVBQWtCO0FBQUUsdUJBQU8sQ0FBQyxDQUFSO0FBQVc7QUFDL0IsZ0JBQUksS0FBS0EsQ0FBTCxHQUFTRyxFQUFFSCxDQUFmLEVBQWtCO0FBQUUsdUJBQU8sQ0FBUDtBQUFXO0FBQy9CLGdCQUFJLEtBQUtDLENBQUwsR0FBU0UsRUFBRUYsQ0FBZixFQUFrQjtBQUFFLHVCQUFPLENBQUMsQ0FBUjtBQUFXO0FBQy9CLGdCQUFJLEtBQUtBLENBQUwsR0FBU0UsRUFBRUYsQ0FBZixFQUFrQjtBQUFFLHVCQUFPLENBQVA7QUFBVztBQUMvQixnQkFBSSxLQUFLQyxDQUFMLEdBQVNDLEVBQUVELENBQWYsRUFBa0I7QUFBRSx1QkFBTyxDQUFDLENBQVI7QUFBVztBQUMvQixnQkFBSSxLQUFLQSxDQUFMLEdBQVNDLEVBQUVELENBQWYsRUFBa0I7QUFBRSx1QkFBTyxDQUFQO0FBQVc7QUFDL0I7QUFDQSxtQkFBTyxDQUFQO0FBQ0g7Ozs7OztBQUNKOztBQUVESSxPQUFPQyxPQUFQLEdBQWlCWCxNQUFqQiIsImZpbGUiOiJ0cmlwbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVHJpcGxlIHRoYXQgY29udGFpbnMgPHBhdGg7IHNpdGU7IGNvdW50ZXI+LiBJZGVudGlmaWVycyBvZiBMU0VRIGFyZSBsaXN0cyBvZlxuICogdHJpcGxlcy5cbiAqL1xuY2xhc3MgVHJpcGxlIHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBwYXRoIFRoZSBwYXJ0IG9mIHRoZSBwYXRoIGluIHRoZSB0cmVlLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfFN0cmluZ30gc2l0ZSBUaGUgdW5pcXVlIHNpdGUgaWRlbnRpZmllciB0aGF0IGNyZWF0ZWQgdGhlXG4gICAgICogdHJpcGxlLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBjb3VudGVyIFRoZSBsb2NhbCBjb3VudGVyIG9mIHRoZSBzaXRlIHdoZW4gaXQgY3JlYXRlZCB0aGVcbiAgICAgKiB0cmlwbGUuXG4gICAgICovICAgICAgIFxuICAgIGNvbnN0cnVjdG9yIChwYXRoLCBzaXRlLCBjb3VudGVyKSB7XG4gICAgICAgIHRoaXMucCA9IHBhdGg7XG4gICAgICAgIHRoaXMucyA9IHNpdGU7XG4gICAgICAgIHRoaXMuYyA9IGNvdW50ZXI7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENvbXBhcmUgdHdvIHRyaXBsZXMgcHJpb3JpdGl6aW5nIHRoZSBwYXRoLCB0aGVuIHNpdGUsIHRoZW4gY291bnRlci5cbiAgICAgKiBAcGFyYW0ge1RyaXBsZX0gbyB0aGUgb3RoZXIgdHJpcGxlIHRvIGNvbXBhcmUgLlxuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9IC0xIGlmIHRoaXMgaXMgbG93ZXIgdGhhbiBvLCAxIGlmIHRoaXMgaXMgZ3JlYXRlciB0aGFuXG4gICAgICogbywgMCBvdGhlcndpc2UuXG4gICAgICovXG4gICAgY29tcGFyZVRvIChvKSB7XG4gICAgICAgIC8vICMxIHByb2Nlc3MgbWF4aW1hbCB2aXJ0dWFsIGJvdW5kc1xuICAgICAgICBpZiAodGhpcy5zID09PSBOdW1iZXIuTUFYX1ZBTFVFICYmIHRoaXMuYyA9PT0gTnVtYmVyLk1BWF9WQUxVRSl7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKG8ucyA9PT0gTnVtYmVyLk1BWF9WQUxVRSAmJiBvLnMgPT09IE51bWJlci5NQVhfVkFMVUUpe1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9O1xuICAgICAgICAvLyAjMiBjb21wYXJlIHAgdGhlbiBzIHRoZW4gY1xuICAgICAgICBpZiAodGhpcy5wIDwgby5wKSB7IHJldHVybiAtMTt9O1xuICAgICAgICBpZiAodGhpcy5wID4gby5wKSB7IHJldHVybiAxIDt9O1xuICAgICAgICBpZiAodGhpcy5zIDwgby5zKSB7IHJldHVybiAtMTt9O1xuICAgICAgICBpZiAodGhpcy5zID4gby5zKSB7IHJldHVybiAxIDt9O1xuICAgICAgICBpZiAodGhpcy5jIDwgby5jKSB7IHJldHVybiAtMTt9O1xuICAgICAgICBpZiAodGhpcy5jID4gby5jKSB7IHJldHVybiAxIDt9O1xuICAgICAgICAvLyAjMyB0aGV5IGFyZSBlcXVhbFxuICAgICAgICByZXR1cm4gMDtcbiAgICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBUcmlwbGU7XG4iXX0=
},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9sb2Rhc2gubWVyZ2UvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBsb2Rhc2ggKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzIDxodHRwczovL2pxdWVyeS5vcmcvPlxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICovXG5cbi8qKiBVc2VkIGFzIHRoZSBzaXplIHRvIGVuYWJsZSBsYXJnZSBhcnJheSBvcHRpbWl6YXRpb25zLiAqL1xudmFyIExBUkdFX0FSUkFZX1NJWkUgPSAyMDA7XG5cbi8qKiBVc2VkIHRvIHN0YW5kLWluIGZvciBgdW5kZWZpbmVkYCBoYXNoIHZhbHVlcy4gKi9cbnZhciBIQVNIX1VOREVGSU5FRCA9ICdfX2xvZGFzaF9oYXNoX3VuZGVmaW5lZF9fJztcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgIGJvb2xUYWcgPSAnW29iamVjdCBCb29sZWFuXScsXG4gICAgZGF0ZVRhZyA9ICdbb2JqZWN0IERhdGVdJyxcbiAgICBlcnJvclRhZyA9ICdbb2JqZWN0IEVycm9yXScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgZ2VuVGFnID0gJ1tvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dJyxcbiAgICBtYXBUYWcgPSAnW29iamVjdCBNYXBdJyxcbiAgICBudW1iZXJUYWcgPSAnW29iamVjdCBOdW1iZXJdJyxcbiAgICBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJyxcbiAgICBwcm9taXNlVGFnID0gJ1tvYmplY3QgUHJvbWlzZV0nLFxuICAgIHJlZ2V4cFRhZyA9ICdbb2JqZWN0IFJlZ0V4cF0nLFxuICAgIHNldFRhZyA9ICdbb2JqZWN0IFNldF0nLFxuICAgIHN0cmluZ1RhZyA9ICdbb2JqZWN0IFN0cmluZ10nLFxuICAgIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nLFxuICAgIHdlYWtNYXBUYWcgPSAnW29iamVjdCBXZWFrTWFwXSc7XG5cbnZhciBhcnJheUJ1ZmZlclRhZyA9ICdbb2JqZWN0IEFycmF5QnVmZmVyXScsXG4gICAgZGF0YVZpZXdUYWcgPSAnW29iamVjdCBEYXRhVmlld10nLFxuICAgIGZsb2F0MzJUYWcgPSAnW29iamVjdCBGbG9hdDMyQXJyYXldJyxcbiAgICBmbG9hdDY0VGFnID0gJ1tvYmplY3QgRmxvYXQ2NEFycmF5XScsXG4gICAgaW50OFRhZyA9ICdbb2JqZWN0IEludDhBcnJheV0nLFxuICAgIGludDE2VGFnID0gJ1tvYmplY3QgSW50MTZBcnJheV0nLFxuICAgIGludDMyVGFnID0gJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgIHVpbnQ4VGFnID0gJ1tvYmplY3QgVWludDhBcnJheV0nLFxuICAgIHVpbnQ4Q2xhbXBlZFRhZyA9ICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgdWludDE2VGFnID0gJ1tvYmplY3QgVWludDE2QXJyYXldJyxcbiAgICB1aW50MzJUYWcgPSAnW29iamVjdCBVaW50MzJBcnJheV0nO1xuXG4vKipcbiAqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGBcbiAqIFtzeW50YXggY2hhcmFjdGVyc10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtcGF0dGVybnMpLlxuICovXG52YXIgcmVSZWdFeHBDaGFyID0gL1tcXFxcXiQuKis/KClbXFxde318XS9nO1xuXG4vKiogVXNlZCB0byBtYXRjaCBgUmVnRXhwYCBmbGFncyBmcm9tIHRoZWlyIGNvZXJjZWQgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUZsYWdzID0gL1xcdyokLztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGhvc3QgY29uc3RydWN0b3JzIChTYWZhcmkpLiAqL1xudmFyIHJlSXNIb3N0Q3RvciA9IC9eXFxbb2JqZWN0IC4rP0NvbnN0cnVjdG9yXFxdJC87XG5cbi8qKiBVc2VkIHRvIGRldGVjdCB1bnNpZ25lZCBpbnRlZ2VyIHZhbHVlcy4gKi9cbnZhciByZUlzVWludCA9IC9eKD86MHxbMS05XVxcZCopJC87XG5cbi8qKiBVc2VkIHRvIGlkZW50aWZ5IGB0b1N0cmluZ1RhZ2AgdmFsdWVzIG9mIHR5cGVkIGFycmF5cy4gKi9cbnZhciB0eXBlZEFycmF5VGFncyA9IHt9O1xudHlwZWRBcnJheVRhZ3NbZmxvYXQzMlRhZ10gPSB0eXBlZEFycmF5VGFnc1tmbG9hdDY0VGFnXSA9XG50eXBlZEFycmF5VGFnc1tpbnQ4VGFnXSA9IHR5cGVkQXJyYXlUYWdzW2ludDE2VGFnXSA9XG50eXBlZEFycmF5VGFnc1tpbnQzMlRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50OFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbdWludDhDbGFtcGVkVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbdWludDMyVGFnXSA9IHRydWU7XG50eXBlZEFycmF5VGFnc1thcmdzVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2FycmF5VGFnXSA9XG50eXBlZEFycmF5VGFnc1thcnJheUJ1ZmZlclRhZ10gPSB0eXBlZEFycmF5VGFnc1tib29sVGFnXSA9XG50eXBlZEFycmF5VGFnc1tkYXRhVmlld1RhZ10gPSB0eXBlZEFycmF5VGFnc1tkYXRlVGFnXSA9XG50eXBlZEFycmF5VGFnc1tlcnJvclRhZ10gPSB0eXBlZEFycmF5VGFnc1tmdW5jVGFnXSA9XG50eXBlZEFycmF5VGFnc1ttYXBUYWddID0gdHlwZWRBcnJheVRhZ3NbbnVtYmVyVGFnXSA9XG50eXBlZEFycmF5VGFnc1tvYmplY3RUYWddID0gdHlwZWRBcnJheVRhZ3NbcmVnZXhwVGFnXSA9XG50eXBlZEFycmF5VGFnc1tzZXRUYWddID0gdHlwZWRBcnJheVRhZ3Nbc3RyaW5nVGFnXSA9XG50eXBlZEFycmF5VGFnc1t3ZWFrTWFwVGFnXSA9IGZhbHNlO1xuXG4vKiogVXNlZCB0byBpZGVudGlmeSBgdG9TdHJpbmdUYWdgIHZhbHVlcyBzdXBwb3J0ZWQgYnkgYF8uY2xvbmVgLiAqL1xudmFyIGNsb25lYWJsZVRhZ3MgPSB7fTtcbmNsb25lYWJsZVRhZ3NbYXJnc1RhZ10gPSBjbG9uZWFibGVUYWdzW2FycmF5VGFnXSA9XG5jbG9uZWFibGVUYWdzW2FycmF5QnVmZmVyVGFnXSA9IGNsb25lYWJsZVRhZ3NbZGF0YVZpZXdUYWddID1cbmNsb25lYWJsZVRhZ3NbYm9vbFRhZ10gPSBjbG9uZWFibGVUYWdzW2RhdGVUYWddID1cbmNsb25lYWJsZVRhZ3NbZmxvYXQzMlRhZ10gPSBjbG9uZWFibGVUYWdzW2Zsb2F0NjRUYWddID1cbmNsb25lYWJsZVRhZ3NbaW50OFRhZ10gPSBjbG9uZWFibGVUYWdzW2ludDE2VGFnXSA9XG5jbG9uZWFibGVUYWdzW2ludDMyVGFnXSA9IGNsb25lYWJsZVRhZ3NbbWFwVGFnXSA9XG5jbG9uZWFibGVUYWdzW251bWJlclRhZ10gPSBjbG9uZWFibGVUYWdzW29iamVjdFRhZ10gPVxuY2xvbmVhYmxlVGFnc1tyZWdleHBUYWddID0gY2xvbmVhYmxlVGFnc1tzZXRUYWddID1cbmNsb25lYWJsZVRhZ3Nbc3RyaW5nVGFnXSA9IGNsb25lYWJsZVRhZ3Nbc3ltYm9sVGFnXSA9XG5jbG9uZWFibGVUYWdzW3VpbnQ4VGFnXSA9IGNsb25lYWJsZVRhZ3NbdWludDhDbGFtcGVkVGFnXSA9XG5jbG9uZWFibGVUYWdzW3VpbnQxNlRhZ10gPSBjbG9uZWFibGVUYWdzW3VpbnQzMlRhZ10gPSB0cnVlO1xuY2xvbmVhYmxlVGFnc1tlcnJvclRhZ10gPSBjbG9uZWFibGVUYWdzW2Z1bmNUYWddID1cbmNsb25lYWJsZVRhZ3Nbd2Vha01hcFRhZ10gPSBmYWxzZTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGV4cG9ydHNgLiAqL1xudmFyIGZyZWVFeHBvcnRzID0gdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0cyAmJiAhZXhwb3J0cy5ub2RlVHlwZSAmJiBleHBvcnRzO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWAuICovXG52YXIgZnJlZU1vZHVsZSA9IGZyZWVFeHBvcnRzICYmIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlICYmICFtb2R1bGUubm9kZVR5cGUgJiYgbW9kdWxlO1xuXG4vKiogRGV0ZWN0IHRoZSBwb3B1bGFyIENvbW1vbkpTIGV4dGVuc2lvbiBgbW9kdWxlLmV4cG9ydHNgLiAqL1xudmFyIG1vZHVsZUV4cG9ydHMgPSBmcmVlTW9kdWxlICYmIGZyZWVNb2R1bGUuZXhwb3J0cyA9PT0gZnJlZUV4cG9ydHM7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgcHJvY2Vzc2AgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVQcm9jZXNzID0gbW9kdWxlRXhwb3J0cyAmJiBmcmVlR2xvYmFsLnByb2Nlc3M7XG5cbi8qKiBVc2VkIHRvIGFjY2VzcyBmYXN0ZXIgTm9kZS5qcyBoZWxwZXJzLiAqL1xudmFyIG5vZGVVdGlsID0gKGZ1bmN0aW9uKCkge1xuICB0cnkge1xuICAgIHJldHVybiBmcmVlUHJvY2VzcyAmJiBmcmVlUHJvY2Vzcy5iaW5kaW5nKCd1dGlsJyk7XG4gIH0gY2F0Y2ggKGUpIHt9XG59KCkpO1xuXG4vKiBOb2RlLmpzIGhlbHBlciByZWZlcmVuY2VzLiAqL1xudmFyIG5vZGVJc1R5cGVkQXJyYXkgPSBub2RlVXRpbCAmJiBub2RlVXRpbC5pc1R5cGVkQXJyYXk7XG5cbi8qKlxuICogQWRkcyB0aGUga2V5LXZhbHVlIGBwYWlyYCB0byBgbWFwYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG1hcCBUaGUgbWFwIHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7QXJyYXl9IHBhaXIgVGhlIGtleS12YWx1ZSBwYWlyIHRvIGFkZC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG1hcGAuXG4gKi9cbmZ1bmN0aW9uIGFkZE1hcEVudHJ5KG1hcCwgcGFpcikge1xuICAvLyBEb24ndCByZXR1cm4gYG1hcC5zZXRgIGJlY2F1c2UgaXQncyBub3QgY2hhaW5hYmxlIGluIElFIDExLlxuICBtYXAuc2V0KHBhaXJbMF0sIHBhaXJbMV0pO1xuICByZXR1cm4gbWFwO1xufVxuXG4vKipcbiAqIEFkZHMgYHZhbHVlYCB0byBgc2V0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNldCBUaGUgc2V0IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGFkZC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYHNldGAuXG4gKi9cbmZ1bmN0aW9uIGFkZFNldEVudHJ5KHNldCwgdmFsdWUpIHtcbiAgLy8gRG9uJ3QgcmV0dXJuIGBzZXQuYWRkYCBiZWNhdXNlIGl0J3Mgbm90IGNoYWluYWJsZSBpbiBJRSAxMS5cbiAgc2V0LmFkZCh2YWx1ZSk7XG4gIHJldHVybiBzZXQ7XG59XG5cbi8qKlxuICogQSBmYXN0ZXIgYWx0ZXJuYXRpdmUgdG8gYEZ1bmN0aW9uI2FwcGx5YCwgdGhpcyBmdW5jdGlvbiBpbnZva2VzIGBmdW5jYFxuICogd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgb2YgYHRoaXNBcmdgIGFuZCB0aGUgYXJndW1lbnRzIG9mIGBhcmdzYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gaW52b2tlLlxuICogQHBhcmFtIHsqfSB0aGlzQXJnIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgZnVuY2AuXG4gKiBAcGFyYW0ge0FycmF5fSBhcmdzIFRoZSBhcmd1bWVudHMgdG8gaW52b2tlIGBmdW5jYCB3aXRoLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHJlc3VsdCBvZiBgZnVuY2AuXG4gKi9cbmZ1bmN0aW9uIGFwcGx5KGZ1bmMsIHRoaXNBcmcsIGFyZ3MpIHtcbiAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgIGNhc2UgMDogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnKTtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYXJnc1swXSk7XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgfVxuICByZXR1cm4gZnVuYy5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uZm9yRWFjaGAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yXG4gKiBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5RWFjaChhcnJheSwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDA7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAoaXRlcmF0ZWUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpID09PSBmYWxzZSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxuLyoqXG4gKiBBcHBlbmRzIHRoZSBlbGVtZW50cyBvZiBgdmFsdWVzYCB0byBgYXJyYXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtBcnJheX0gdmFsdWVzIFRoZSB2YWx1ZXMgdG8gYXBwZW5kLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5UHVzaChhcnJheSwgdmFsdWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gdmFsdWVzLmxlbmd0aCxcbiAgICAgIG9mZnNldCA9IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGFycmF5W29mZnNldCArIGluZGV4XSA9IHZhbHVlc1tpbmRleF07XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5yZWR1Y2VgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvclxuICogaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7Kn0gW2FjY3VtdWxhdG9yXSBUaGUgaW5pdGlhbCB2YWx1ZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2luaXRBY2N1bV0gU3BlY2lmeSB1c2luZyB0aGUgZmlyc3QgZWxlbWVudCBvZiBgYXJyYXlgIGFzXG4gKiAgdGhlIGluaXRpYWwgdmFsdWUuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgYWNjdW11bGF0ZWQgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGFycmF5UmVkdWNlKGFycmF5LCBpdGVyYXRlZSwgYWNjdW11bGF0b3IsIGluaXRBY2N1bSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMDtcblxuICBpZiAoaW5pdEFjY3VtICYmIGxlbmd0aCkge1xuICAgIGFjY3VtdWxhdG9yID0gYXJyYXlbKytpbmRleF07XG4gIH1cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBhY2N1bXVsYXRvciA9IGl0ZXJhdGVlKGFjY3VtdWxhdG9yLCBhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSk7XG4gIH1cbiAgcmV0dXJuIGFjY3VtdWxhdG9yO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnRpbWVzYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHNcbiAqIG9yIG1heCBhcnJheSBsZW5ndGggY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgbnVtYmVyIG9mIHRpbWVzIHRvIGludm9rZSBgaXRlcmF0ZWVgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcmVzdWx0cy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRpbWVzKG4sIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobik7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBuKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IGl0ZXJhdGVlKGluZGV4KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnVuYXJ5YCB3aXRob3V0IHN1cHBvcnQgZm9yIHN0b3JpbmcgbWV0YWRhdGEuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNhcCBhcmd1bWVudHMgZm9yLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgY2FwcGVkIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlVW5hcnkoZnVuYykge1xuICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gZnVuYyh2YWx1ZSk7XG4gIH07XG59XG5cbi8qKlxuICogR2V0cyB0aGUgdmFsdWUgYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcHJvcGVydHkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGdldFZhbHVlKG9iamVjdCwga2V5KSB7XG4gIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgaG9zdCBvYmplY3QgaW4gSUUgPCA5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgaG9zdCBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNIb3N0T2JqZWN0KHZhbHVlKSB7XG4gIC8vIE1hbnkgaG9zdCBvYmplY3RzIGFyZSBgT2JqZWN0YCBvYmplY3RzIHRoYXQgY2FuIGNvZXJjZSB0byBzdHJpbmdzXG4gIC8vIGRlc3BpdGUgaGF2aW5nIGltcHJvcGVybHkgZGVmaW5lZCBgdG9TdHJpbmdgIG1ldGhvZHMuXG4gIHZhciByZXN1bHQgPSBmYWxzZTtcbiAgaWYgKHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlLnRvU3RyaW5nICE9ICdmdW5jdGlvbicpIHtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gISEodmFsdWUgKyAnJyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGBtYXBgIHRvIGl0cyBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBrZXktdmFsdWUgcGFpcnMuXG4gKi9cbmZ1bmN0aW9uIG1hcFRvQXJyYXkobWFwKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobWFwLnNpemUpO1xuXG4gIG1hcC5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICByZXN1bHRbKytpbmRleF0gPSBba2V5LCB2YWx1ZV07XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSB1bmFyeSBmdW5jdGlvbiB0aGF0IGludm9rZXMgYGZ1bmNgIHdpdGggaXRzIGFyZ3VtZW50IHRyYW5zZm9ybWVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byB3cmFwLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gdHJhbnNmb3JtIFRoZSBhcmd1bWVudCB0cmFuc2Zvcm0uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gb3ZlckFyZyhmdW5jLCB0cmFuc2Zvcm0pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiBmdW5jKHRyYW5zZm9ybShhcmcpKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgc2V0YCB0byBhbiBhcnJheSBvZiBpdHMgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc2V0IFRoZSBzZXQgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgdmFsdWVzLlxuICovXG5mdW5jdGlvbiBzZXRUb0FycmF5KHNldCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KHNldC5zaXplKTtcblxuICBzZXQuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJlc3VsdFsrK2luZGV4XSA9IHZhbHVlO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGUsXG4gICAgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlLFxuICAgIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG92ZXJyZWFjaGluZyBjb3JlLWpzIHNoaW1zLiAqL1xudmFyIGNvcmVKc0RhdGEgPSByb290WydfX2NvcmUtanNfc2hhcmVkX18nXTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG1ldGhvZHMgbWFzcXVlcmFkaW5nIGFzIG5hdGl2ZS4gKi9cbnZhciBtYXNrU3JjS2V5ID0gKGZ1bmN0aW9uKCkge1xuICB2YXIgdWlkID0gL1teLl0rJC8uZXhlYyhjb3JlSnNEYXRhICYmIGNvcmVKc0RhdGEua2V5cyAmJiBjb3JlSnNEYXRhLmtleXMuSUVfUFJPVE8gfHwgJycpO1xuICByZXR1cm4gdWlkID8gKCdTeW1ib2woc3JjKV8xLicgKyB1aWQpIDogJyc7XG59KCkpO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogVXNlZCB0byBpbmZlciB0aGUgYE9iamVjdGAgY29uc3RydWN0b3IuICovXG52YXIgb2JqZWN0Q3RvclN0cmluZyA9IGZ1bmNUb1N0cmluZy5jYWxsKE9iamVjdCk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlSXNOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgZnVuY1RvU3RyaW5nLmNhbGwoaGFzT3duUHJvcGVydHkpLnJlcGxhY2UocmVSZWdFeHBDaGFyLCAnXFxcXCQmJylcbiAgLnJlcGxhY2UoL2hhc093blByb3BlcnR5fChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4pO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBCdWZmZXIgPSBtb2R1bGVFeHBvcnRzID8gcm9vdC5CdWZmZXIgOiB1bmRlZmluZWQsXG4gICAgU3ltYm9sID0gcm9vdC5TeW1ib2wsXG4gICAgVWludDhBcnJheSA9IHJvb3QuVWludDhBcnJheSxcbiAgICBnZXRQcm90b3R5cGUgPSBvdmVyQXJnKE9iamVjdC5nZXRQcm90b3R5cGVPZiwgT2JqZWN0KSxcbiAgICBvYmplY3RDcmVhdGUgPSBPYmplY3QuY3JlYXRlLFxuICAgIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gb2JqZWN0UHJvdG8ucHJvcGVydHlJc0VudW1lcmFibGUsXG4gICAgc3BsaWNlID0gYXJyYXlQcm90by5zcGxpY2U7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVHZXRTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyxcbiAgICBuYXRpdmVJc0J1ZmZlciA9IEJ1ZmZlciA/IEJ1ZmZlci5pc0J1ZmZlciA6IHVuZGVmaW5lZCxcbiAgICBuYXRpdmVLZXlzID0gb3ZlckFyZyhPYmplY3Qua2V5cywgT2JqZWN0KSxcbiAgICBuYXRpdmVNYXggPSBNYXRoLm1heDtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIERhdGFWaWV3ID0gZ2V0TmF0aXZlKHJvb3QsICdEYXRhVmlldycpLFxuICAgIE1hcCA9IGdldE5hdGl2ZShyb290LCAnTWFwJyksXG4gICAgUHJvbWlzZSA9IGdldE5hdGl2ZShyb290LCAnUHJvbWlzZScpLFxuICAgIFNldCA9IGdldE5hdGl2ZShyb290LCAnU2V0JyksXG4gICAgV2Vha01hcCA9IGdldE5hdGl2ZShyb290LCAnV2Vha01hcCcpLFxuICAgIG5hdGl2ZUNyZWF0ZSA9IGdldE5hdGl2ZShPYmplY3QsICdjcmVhdGUnKTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG1hcHMsIHNldHMsIGFuZCB3ZWFrbWFwcy4gKi9cbnZhciBkYXRhVmlld0N0b3JTdHJpbmcgPSB0b1NvdXJjZShEYXRhVmlldyksXG4gICAgbWFwQ3RvclN0cmluZyA9IHRvU291cmNlKE1hcCksXG4gICAgcHJvbWlzZUN0b3JTdHJpbmcgPSB0b1NvdXJjZShQcm9taXNlKSxcbiAgICBzZXRDdG9yU3RyaW5nID0gdG9Tb3VyY2UoU2V0KSxcbiAgICB3ZWFrTWFwQ3RvclN0cmluZyA9IHRvU291cmNlKFdlYWtNYXApO1xuXG4vKiogVXNlZCB0byBjb252ZXJ0IHN5bWJvbHMgdG8gcHJpbWl0aXZlcyBhbmQgc3RyaW5ncy4gKi9cbnZhciBzeW1ib2xQcm90byA9IFN5bWJvbCA/IFN5bWJvbC5wcm90b3R5cGUgOiB1bmRlZmluZWQsXG4gICAgc3ltYm9sVmFsdWVPZiA9IHN5bWJvbFByb3RvID8gc3ltYm9sUHJvdG8udmFsdWVPZiA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgaGFzaCBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIEhhc2goZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPyBlbnRyaWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBoYXNoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIEhhc2hcbiAqL1xuZnVuY3Rpb24gaGFzaENsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gbmF0aXZlQ3JlYXRlID8gbmF0aXZlQ3JlYXRlKG51bGwpIDoge307XG59XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIGhhc2guXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7T2JqZWN0fSBoYXNoIFRoZSBoYXNoIHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNoRGVsZXRlKGtleSkge1xuICByZXR1cm4gdGhpcy5oYXMoa2V5KSAmJiBkZWxldGUgdGhpcy5fX2RhdGFfX1trZXldO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGhhc2ggdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gaGFzaEdldChrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICBpZiAobmF0aXZlQ3JlYXRlKSB7XG4gICAgdmFyIHJlc3VsdCA9IGRhdGFba2V5XTtcbiAgICByZXR1cm4gcmVzdWx0ID09PSBIQVNIX1VOREVGSU5FRCA/IHVuZGVmaW5lZCA6IHJlc3VsdDtcbiAgfVxuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpID8gZGF0YVtrZXldIDogdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIGhhc2ggdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc2hIYXMoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgcmV0dXJuIG5hdGl2ZUNyZWF0ZSA/IGRhdGFba2V5XSAhPT0gdW5kZWZpbmVkIDogaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIGhhc2ggYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBoYXNoIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBoYXNoU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICBkYXRhW2tleV0gPSAobmF0aXZlQ3JlYXRlICYmIHZhbHVlID09PSB1bmRlZmluZWQpID8gSEFTSF9VTkRFRklORUQgOiB2YWx1ZTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBIYXNoYC5cbkhhc2gucHJvdG90eXBlLmNsZWFyID0gaGFzaENsZWFyO1xuSGFzaC5wcm90b3R5cGVbJ2RlbGV0ZSddID0gaGFzaERlbGV0ZTtcbkhhc2gucHJvdG90eXBlLmdldCA9IGhhc2hHZXQ7XG5IYXNoLnByb3RvdHlwZS5oYXMgPSBoYXNoSGFzO1xuSGFzaC5wcm90b3R5cGUuc2V0ID0gaGFzaFNldDtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGxpc3QgY2FjaGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBMaXN0Q2FjaGUoZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPyBlbnRyaWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBsaXN0IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IFtdO1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBsaXN0IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVEZWxldGUoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgaWYgKGluZGV4IDwgMCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgbGFzdEluZGV4ID0gZGF0YS5sZW5ndGggLSAxO1xuICBpZiAoaW5kZXggPT0gbGFzdEluZGV4KSB7XG4gICAgZGF0YS5wb3AoKTtcbiAgfSBlbHNlIHtcbiAgICBzcGxpY2UuY2FsbChkYXRhLCBpbmRleCwgMSk7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUdldChrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICByZXR1cm4gaW5kZXggPCAwID8gdW5kZWZpbmVkIDogZGF0YVtpbmRleF1bMV07XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVIYXMoa2V5KSB7XG4gIHJldHVybiBhc3NvY0luZGV4T2YodGhpcy5fX2RhdGFfXywga2V5KSA+IC0xO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIGxpc3QgY2FjaGUgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGxpc3QgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZVNldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgaWYgKGluZGV4IDwgMCkge1xuICAgIGRhdGEucHVzaChba2V5LCB2YWx1ZV0pO1xuICB9IGVsc2Uge1xuICAgIGRhdGFbaW5kZXhdWzFdID0gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBMaXN0Q2FjaGVgLlxuTGlzdENhY2hlLnByb3RvdHlwZS5jbGVhciA9IGxpc3RDYWNoZUNsZWFyO1xuTGlzdENhY2hlLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBsaXN0Q2FjaGVEZWxldGU7XG5MaXN0Q2FjaGUucHJvdG90eXBlLmdldCA9IGxpc3RDYWNoZUdldDtcbkxpc3RDYWNoZS5wcm90b3R5cGUuaGFzID0gbGlzdENhY2hlSGFzO1xuTGlzdENhY2hlLnByb3RvdHlwZS5zZXQgPSBsaXN0Q2FjaGVTZXQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG1hcCBjYWNoZSBvYmplY3QgdG8gc3RvcmUga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBNYXBDYWNoZShlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA/IGVudHJpZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIG1hcC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUNsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0ge1xuICAgICdoYXNoJzogbmV3IEhhc2gsXG4gICAgJ21hcCc6IG5ldyAoTWFwIHx8IExpc3RDYWNoZSksXG4gICAgJ3N0cmluZyc6IG5ldyBIYXNoXG4gIH07XG59XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIG1hcC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZURlbGV0ZShrZXkpIHtcbiAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KVsnZGVsZXRlJ10oa2V5KTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBtYXAgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlR2V0KGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLmdldChrZXkpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIG1hcCB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlSGFzKGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLmhhcyhrZXkpO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIG1hcCBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBtYXAgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlU2V0KGtleSwgdmFsdWUpIHtcbiAgZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLnNldChrZXksIHZhbHVlKTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBNYXBDYWNoZWAuXG5NYXBDYWNoZS5wcm90b3R5cGUuY2xlYXIgPSBtYXBDYWNoZUNsZWFyO1xuTWFwQ2FjaGUucHJvdG90eXBlWydkZWxldGUnXSA9IG1hcENhY2hlRGVsZXRlO1xuTWFwQ2FjaGUucHJvdG90eXBlLmdldCA9IG1hcENhY2hlR2V0O1xuTWFwQ2FjaGUucHJvdG90eXBlLmhhcyA9IG1hcENhY2hlSGFzO1xuTWFwQ2FjaGUucHJvdG90eXBlLnNldCA9IG1hcENhY2hlU2V0O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBzdGFjayBjYWNoZSBvYmplY3QgdG8gc3RvcmUga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBTdGFjayhlbnRyaWVzKSB7XG4gIHRoaXMuX19kYXRhX18gPSBuZXcgTGlzdENhY2hlKGVudHJpZXMpO1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIHN0YWNrLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIFN0YWNrXG4gKi9cbmZ1bmN0aW9uIHN0YWNrQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSBuZXcgTGlzdENhY2hlO1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBzdGFjay5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBzdGFja0RlbGV0ZShrZXkpIHtcbiAgcmV0dXJuIHRoaXMuX19kYXRhX19bJ2RlbGV0ZSddKGtleSk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgc3RhY2sgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrR2V0KGtleSkge1xuICByZXR1cm4gdGhpcy5fX2RhdGFfXy5nZXQoa2V5KTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBzdGFjayB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrSGFzKGtleSkge1xuICByZXR1cm4gdGhpcy5fX2RhdGFfXy5oYXMoa2V5KTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBzdGFjayBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBzdGFjayBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gc3RhY2tTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgY2FjaGUgPSB0aGlzLl9fZGF0YV9fO1xuICBpZiAoY2FjaGUgaW5zdGFuY2VvZiBMaXN0Q2FjaGUpIHtcbiAgICB2YXIgcGFpcnMgPSBjYWNoZS5fX2RhdGFfXztcbiAgICBpZiAoIU1hcCB8fCAocGFpcnMubGVuZ3RoIDwgTEFSR0VfQVJSQVlfU0laRSAtIDEpKSB7XG4gICAgICBwYWlycy5wdXNoKFtrZXksIHZhbHVlXSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgY2FjaGUgPSB0aGlzLl9fZGF0YV9fID0gbmV3IE1hcENhY2hlKHBhaXJzKTtcbiAgfVxuICBjYWNoZS5zZXQoa2V5LCB2YWx1ZSk7XG4gIHJldHVybiB0aGlzO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgU3RhY2tgLlxuU3RhY2sucHJvdG90eXBlLmNsZWFyID0gc3RhY2tDbGVhcjtcblN0YWNrLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBzdGFja0RlbGV0ZTtcblN0YWNrLnByb3RvdHlwZS5nZXQgPSBzdGFja0dldDtcblN0YWNrLnByb3RvdHlwZS5oYXMgPSBzdGFja0hhcztcblN0YWNrLnByb3RvdHlwZS5zZXQgPSBzdGFja1NldDtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIHRoZSBhcnJheS1saWtlIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtib29sZWFufSBpbmhlcml0ZWQgU3BlY2lmeSByZXR1cm5pbmcgaW5oZXJpdGVkIHByb3BlcnR5IG5hbWVzLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYXJyYXlMaWtlS2V5cyh2YWx1ZSwgaW5oZXJpdGVkKSB7XG4gIC8vIFNhZmFyaSA4LjEgbWFrZXMgYGFyZ3VtZW50cy5jYWxsZWVgIGVudW1lcmFibGUgaW4gc3RyaWN0IG1vZGUuXG4gIC8vIFNhZmFyaSA5IG1ha2VzIGBhcmd1bWVudHMubGVuZ3RoYCBlbnVtZXJhYmxlIGluIHN0cmljdCBtb2RlLlxuICB2YXIgcmVzdWx0ID0gKGlzQXJyYXkodmFsdWUpIHx8IGlzQXJndW1lbnRzKHZhbHVlKSlcbiAgICA/IGJhc2VUaW1lcyh2YWx1ZS5sZW5ndGgsIFN0cmluZylcbiAgICA6IFtdO1xuXG4gIHZhciBsZW5ndGggPSByZXN1bHQubGVuZ3RoLFxuICAgICAgc2tpcEluZGV4ZXMgPSAhIWxlbmd0aDtcblxuICBmb3IgKHZhciBrZXkgaW4gdmFsdWUpIHtcbiAgICBpZiAoKGluaGVyaXRlZCB8fCBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBrZXkpKSAmJlxuICAgICAgICAhKHNraXBJbmRleGVzICYmIChrZXkgPT0gJ2xlbmd0aCcgfHwgaXNJbmRleChrZXksIGxlbmd0aCkpKSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIGxpa2UgYGFzc2lnblZhbHVlYCBleGNlcHQgdGhhdCBpdCBkb2Vzbid0IGFzc2lnblxuICogYHVuZGVmaW5lZGAgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBhc3NpZ24uXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBhc3NpZ24uXG4gKi9cbmZ1bmN0aW9uIGFzc2lnbk1lcmdlVmFsdWUob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIGlmICgodmFsdWUgIT09IHVuZGVmaW5lZCAmJiAhZXEob2JqZWN0W2tleV0sIHZhbHVlKSkgfHxcbiAgICAgICh0eXBlb2Yga2V5ID09ICdudW1iZXInICYmIHZhbHVlID09PSB1bmRlZmluZWQgJiYgIShrZXkgaW4gb2JqZWN0KSkpIHtcbiAgICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICB9XG59XG5cbi8qKlxuICogQXNzaWducyBgdmFsdWVgIHRvIGBrZXlgIG9mIGBvYmplY3RgIGlmIHRoZSBleGlzdGluZyB2YWx1ZSBpcyBub3QgZXF1aXZhbGVudFxuICogdXNpbmcgW2BTYW1lVmFsdWVaZXJvYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtc2FtZXZhbHVlemVybylcbiAqIGZvciBlcXVhbGl0eSBjb21wYXJpc29ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gYXNzaWduLlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gYXNzaWduLlxuICovXG5mdW5jdGlvbiBhc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgdmFyIG9ialZhbHVlID0gb2JqZWN0W2tleV07XG4gIGlmICghKGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpICYmIGVxKG9ialZhbHVlLCB2YWx1ZSkpIHx8XG4gICAgICAodmFsdWUgPT09IHVuZGVmaW5lZCAmJiAhKGtleSBpbiBvYmplY3QpKSkge1xuICAgIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIH1cbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBpbmRleCBhdCB3aGljaCB0aGUgYGtleWAgaXMgZm91bmQgaW4gYGFycmF5YCBvZiBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSBrZXkgVGhlIGtleSB0byBzZWFyY2ggZm9yLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gYXNzb2NJbmRleE9mKGFycmF5LCBrZXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgaWYgKGVxKGFycmF5W2xlbmd0aF1bMF0sIGtleSkpIHtcbiAgICAgIHJldHVybiBsZW5ndGg7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5hc3NpZ25gIHdpdGhvdXQgc3VwcG9ydCBmb3IgbXVsdGlwbGUgc291cmNlc1xuICogb3IgYGN1c3RvbWl6ZXJgIGZ1bmN0aW9ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgc291cmNlIG9iamVjdC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VBc3NpZ24ob2JqZWN0LCBzb3VyY2UpIHtcbiAgcmV0dXJuIG9iamVjdCAmJiBjb3B5T2JqZWN0KHNvdXJjZSwga2V5cyhzb3VyY2UpLCBvYmplY3QpO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmNsb25lYCBhbmQgYF8uY2xvbmVEZWVwYCB3aGljaCB0cmFja3NcbiAqIHRyYXZlcnNlZCBvYmplY3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjbG9uZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRGVlcF0gU3BlY2lmeSBhIGRlZXAgY2xvbmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0Z1bGxdIFNwZWNpZnkgYSBjbG9uZSBpbmNsdWRpbmcgc3ltYm9scy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNsb25pbmcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2tleV0gVGhlIGtleSBvZiBgdmFsdWVgLlxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBwYXJlbnQgb2JqZWN0IG9mIGB2YWx1ZWAuXG4gKiBAcGFyYW0ge09iamVjdH0gW3N0YWNrXSBUcmFja3MgdHJhdmVyc2VkIG9iamVjdHMgYW5kIHRoZWlyIGNsb25lIGNvdW50ZXJwYXJ0cy5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBjbG9uZWQgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGJhc2VDbG9uZSh2YWx1ZSwgaXNEZWVwLCBpc0Z1bGwsIGN1c3RvbWl6ZXIsIGtleSwgb2JqZWN0LCBzdGFjaykge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoY3VzdG9taXplcikge1xuICAgIHJlc3VsdCA9IG9iamVjdCA/IGN1c3RvbWl6ZXIodmFsdWUsIGtleSwgb2JqZWN0LCBzdGFjaykgOiBjdXN0b21pemVyKHZhbHVlKTtcbiAgfVxuICBpZiAocmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGlmICghaXNPYmplY3QodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHZhciBpc0FyciA9IGlzQXJyYXkodmFsdWUpO1xuICBpZiAoaXNBcnIpIHtcbiAgICByZXN1bHQgPSBpbml0Q2xvbmVBcnJheSh2YWx1ZSk7XG4gICAgaWYgKCFpc0RlZXApIHtcbiAgICAgIHJldHVybiBjb3B5QXJyYXkodmFsdWUsIHJlc3VsdCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciB0YWcgPSBnZXRUYWcodmFsdWUpLFxuICAgICAgICBpc0Z1bmMgPSB0YWcgPT0gZnVuY1RhZyB8fCB0YWcgPT0gZ2VuVGFnO1xuXG4gICAgaWYgKGlzQnVmZmVyKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGNsb25lQnVmZmVyKHZhbHVlLCBpc0RlZXApO1xuICAgIH1cbiAgICBpZiAodGFnID09IG9iamVjdFRhZyB8fCB0YWcgPT0gYXJnc1RhZyB8fCAoaXNGdW5jICYmICFvYmplY3QpKSB7XG4gICAgICBpZiAoaXNIb3N0T2JqZWN0KHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gb2JqZWN0ID8gdmFsdWUgOiB7fTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdCA9IGluaXRDbG9uZU9iamVjdChpc0Z1bmMgPyB7fSA6IHZhbHVlKTtcbiAgICAgIGlmICghaXNEZWVwKSB7XG4gICAgICAgIHJldHVybiBjb3B5U3ltYm9scyh2YWx1ZSwgYmFzZUFzc2lnbihyZXN1bHQsIHZhbHVlKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghY2xvbmVhYmxlVGFnc1t0YWddKSB7XG4gICAgICAgIHJldHVybiBvYmplY3QgPyB2YWx1ZSA6IHt9O1xuICAgICAgfVxuICAgICAgcmVzdWx0ID0gaW5pdENsb25lQnlUYWcodmFsdWUsIHRhZywgYmFzZUNsb25lLCBpc0RlZXApO1xuICAgIH1cbiAgfVxuICAvLyBDaGVjayBmb3IgY2lyY3VsYXIgcmVmZXJlbmNlcyBhbmQgcmV0dXJuIGl0cyBjb3JyZXNwb25kaW5nIGNsb25lLlxuICBzdGFjayB8fCAoc3RhY2sgPSBuZXcgU3RhY2spO1xuICB2YXIgc3RhY2tlZCA9IHN0YWNrLmdldCh2YWx1ZSk7XG4gIGlmIChzdGFja2VkKSB7XG4gICAgcmV0dXJuIHN0YWNrZWQ7XG4gIH1cbiAgc3RhY2suc2V0KHZhbHVlLCByZXN1bHQpO1xuXG4gIGlmICghaXNBcnIpIHtcbiAgICB2YXIgcHJvcHMgPSBpc0Z1bGwgPyBnZXRBbGxLZXlzKHZhbHVlKSA6IGtleXModmFsdWUpO1xuICB9XG4gIGFycmF5RWFjaChwcm9wcyB8fCB2YWx1ZSwgZnVuY3Rpb24oc3ViVmFsdWUsIGtleSkge1xuICAgIGlmIChwcm9wcykge1xuICAgICAga2V5ID0gc3ViVmFsdWU7XG4gICAgICBzdWJWYWx1ZSA9IHZhbHVlW2tleV07XG4gICAgfVxuICAgIC8vIFJlY3Vyc2l2ZWx5IHBvcHVsYXRlIGNsb25lIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgYXNzaWduVmFsdWUocmVzdWx0LCBrZXksIGJhc2VDbG9uZShzdWJWYWx1ZSwgaXNEZWVwLCBpc0Z1bGwsIGN1c3RvbWl6ZXIsIGtleSwgdmFsdWUsIHN0YWNrKSk7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmNyZWF0ZWAgd2l0aG91dCBzdXBwb3J0IGZvciBhc3NpZ25pbmdcbiAqIHByb3BlcnRpZXMgdG8gdGhlIGNyZWF0ZWQgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gcHJvdG90eXBlIFRoZSBvYmplY3QgdG8gaW5oZXJpdCBmcm9tLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbmV3IG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gYmFzZUNyZWF0ZShwcm90bykge1xuICByZXR1cm4gaXNPYmplY3QocHJvdG8pID8gb2JqZWN0Q3JlYXRlKHByb3RvKSA6IHt9O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBnZXRBbGxLZXlzYCBhbmQgYGdldEFsbEtleXNJbmAgd2hpY2ggdXNlc1xuICogYGtleXNGdW5jYCBhbmQgYHN5bWJvbHNGdW5jYCB0byBnZXQgdGhlIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgYW5kXG4gKiBzeW1ib2xzIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBrZXlzRnVuYyBUaGUgZnVuY3Rpb24gdG8gZ2V0IHRoZSBrZXlzIG9mIGBvYmplY3RgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gc3ltYm9sc0Z1bmMgVGhlIGZ1bmN0aW9uIHRvIGdldCB0aGUgc3ltYm9scyBvZiBgb2JqZWN0YC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMgYW5kIHN5bWJvbHMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRBbGxLZXlzKG9iamVjdCwga2V5c0Z1bmMsIHN5bWJvbHNGdW5jKSB7XG4gIHZhciByZXN1bHQgPSBrZXlzRnVuYyhvYmplY3QpO1xuICByZXR1cm4gaXNBcnJheShvYmplY3QpID8gcmVzdWx0IDogYXJyYXlQdXNoKHJlc3VsdCwgc3ltYm9sc0Z1bmMob2JqZWN0KSk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGdldFRhZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUdldFRhZyh2YWx1ZSkge1xuICByZXR1cm4gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNOYXRpdmVgIHdpdGhvdXQgYmFkIHNoaW0gY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzTmF0aXZlKHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3QodmFsdWUpIHx8IGlzTWFza2VkKHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgcGF0dGVybiA9IChpc0Z1bmN0aW9uKHZhbHVlKSB8fCBpc0hvc3RPYmplY3QodmFsdWUpKSA/IHJlSXNOYXRpdmUgOiByZUlzSG9zdEN0b3I7XG4gIHJldHVybiBwYXR0ZXJuLnRlc3QodG9Tb3VyY2UodmFsdWUpKTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc1R5cGVkQXJyYXlgIHdpdGhvdXQgTm9kZS5qcyBvcHRpbWl6YXRpb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdHlwZWQgYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzVHlwZWRBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJlxuICAgIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgISF0eXBlZEFycmF5VGFnc1tvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKV07XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ua2V5c2Agd2hpY2ggZG9lc24ndCB0cmVhdCBzcGFyc2UgYXJyYXlzIGFzIGRlbnNlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBiYXNlS2V5cyhvYmplY3QpIHtcbiAgaWYgKCFpc1Byb3RvdHlwZShvYmplY3QpKSB7XG4gICAgcmV0dXJuIG5hdGl2ZUtleXMob2JqZWN0KTtcbiAgfVxuICB2YXIgcmVzdWx0ID0gW107XG4gIGZvciAodmFyIGtleSBpbiBPYmplY3Qob2JqZWN0KSkge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSAmJiBrZXkgIT0gJ2NvbnN0cnVjdG9yJykge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5rZXlzSW5gIHdoaWNoIGRvZXNuJ3QgdHJlYXQgc3BhcnNlIGFycmF5cyBhcyBkZW5zZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYmFzZUtleXNJbihvYmplY3QpIHtcbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgcmV0dXJuIG5hdGl2ZUtleXNJbihvYmplY3QpO1xuICB9XG4gIHZhciBpc1Byb3RvID0gaXNQcm90b3R5cGUob2JqZWN0KSxcbiAgICAgIHJlc3VsdCA9IFtdO1xuXG4gIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICBpZiAoIShrZXkgPT0gJ2NvbnN0cnVjdG9yJyAmJiAoaXNQcm90byB8fCAhaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkpKSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5tZXJnZWAgd2l0aG91dCBzdXBwb3J0IGZvciBtdWx0aXBsZSBzb3VyY2VzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHBhcmFtIHtudW1iZXJ9IHNyY0luZGV4IFRoZSBpbmRleCBvZiBgc291cmNlYC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIG1lcmdlZCB2YWx1ZXMuXG4gKiBAcGFyYW0ge09iamVjdH0gW3N0YWNrXSBUcmFja3MgdHJhdmVyc2VkIHNvdXJjZSB2YWx1ZXMgYW5kIHRoZWlyIG1lcmdlZFxuICogIGNvdW50ZXJwYXJ0cy5cbiAqL1xuZnVuY3Rpb24gYmFzZU1lcmdlKG9iamVjdCwgc291cmNlLCBzcmNJbmRleCwgY3VzdG9taXplciwgc3RhY2spIHtcbiAgaWYgKG9iamVjdCA9PT0gc291cmNlKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICghKGlzQXJyYXkoc291cmNlKSB8fCBpc1R5cGVkQXJyYXkoc291cmNlKSkpIHtcbiAgICB2YXIgcHJvcHMgPSBiYXNlS2V5c0luKHNvdXJjZSk7XG4gIH1cbiAgYXJyYXlFYWNoKHByb3BzIHx8IHNvdXJjZSwgZnVuY3Rpb24oc3JjVmFsdWUsIGtleSkge1xuICAgIGlmIChwcm9wcykge1xuICAgICAga2V5ID0gc3JjVmFsdWU7XG4gICAgICBzcmNWYWx1ZSA9IHNvdXJjZVtrZXldO1xuICAgIH1cbiAgICBpZiAoaXNPYmplY3Qoc3JjVmFsdWUpKSB7XG4gICAgICBzdGFjayB8fCAoc3RhY2sgPSBuZXcgU3RhY2spO1xuICAgICAgYmFzZU1lcmdlRGVlcChvYmplY3QsIHNvdXJjZSwga2V5LCBzcmNJbmRleCwgYmFzZU1lcmdlLCBjdXN0b21pemVyLCBzdGFjayk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFyIG5ld1ZhbHVlID0gY3VzdG9taXplclxuICAgICAgICA/IGN1c3RvbWl6ZXIob2JqZWN0W2tleV0sIHNyY1ZhbHVlLCAoa2V5ICsgJycpLCBvYmplY3QsIHNvdXJjZSwgc3RhY2spXG4gICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgICBpZiAobmV3VmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBuZXdWYWx1ZSA9IHNyY1ZhbHVlO1xuICAgICAgfVxuICAgICAgYXNzaWduTWVyZ2VWYWx1ZShvYmplY3QsIGtleSwgbmV3VmFsdWUpO1xuICAgIH1cbiAgfSk7XG59XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlTWVyZ2VgIGZvciBhcnJheXMgYW5kIG9iamVjdHMgd2hpY2ggcGVyZm9ybXNcbiAqIGRlZXAgbWVyZ2VzIGFuZCB0cmFja3MgdHJhdmVyc2VkIG9iamVjdHMgZW5hYmxpbmcgb2JqZWN0cyB3aXRoIGNpcmN1bGFyXG4gKiByZWZlcmVuY2VzIHRvIGJlIG1lcmdlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gbWVyZ2UuXG4gKiBAcGFyYW0ge251bWJlcn0gc3JjSW5kZXggVGhlIGluZGV4IG9mIGBzb3VyY2VgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gbWVyZ2VGdW5jIFRoZSBmdW5jdGlvbiB0byBtZXJnZSB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBhc3NpZ25lZCB2YWx1ZXMuXG4gKiBAcGFyYW0ge09iamVjdH0gW3N0YWNrXSBUcmFja3MgdHJhdmVyc2VkIHNvdXJjZSB2YWx1ZXMgYW5kIHRoZWlyIG1lcmdlZFxuICogIGNvdW50ZXJwYXJ0cy5cbiAqL1xuZnVuY3Rpb24gYmFzZU1lcmdlRGVlcChvYmplY3QsIHNvdXJjZSwga2V5LCBzcmNJbmRleCwgbWVyZ2VGdW5jLCBjdXN0b21pemVyLCBzdGFjaykge1xuICB2YXIgb2JqVmFsdWUgPSBvYmplY3Rba2V5XSxcbiAgICAgIHNyY1ZhbHVlID0gc291cmNlW2tleV0sXG4gICAgICBzdGFja2VkID0gc3RhY2suZ2V0KHNyY1ZhbHVlKTtcblxuICBpZiAoc3RhY2tlZCkge1xuICAgIGFzc2lnbk1lcmdlVmFsdWUob2JqZWN0LCBrZXksIHN0YWNrZWQpO1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbmV3VmFsdWUgPSBjdXN0b21pemVyXG4gICAgPyBjdXN0b21pemVyKG9ialZhbHVlLCBzcmNWYWx1ZSwgKGtleSArICcnKSwgb2JqZWN0LCBzb3VyY2UsIHN0YWNrKVxuICAgIDogdW5kZWZpbmVkO1xuXG4gIHZhciBpc0NvbW1vbiA9IG5ld1ZhbHVlID09PSB1bmRlZmluZWQ7XG5cbiAgaWYgKGlzQ29tbW9uKSB7XG4gICAgbmV3VmFsdWUgPSBzcmNWYWx1ZTtcbiAgICBpZiAoaXNBcnJheShzcmNWYWx1ZSkgfHwgaXNUeXBlZEFycmF5KHNyY1ZhbHVlKSkge1xuICAgICAgaWYgKGlzQXJyYXkob2JqVmFsdWUpKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gb2JqVmFsdWU7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChpc0FycmF5TGlrZU9iamVjdChvYmpWYWx1ZSkpIHtcbiAgICAgICAgbmV3VmFsdWUgPSBjb3B5QXJyYXkob2JqVmFsdWUpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gICAgICAgIG5ld1ZhbHVlID0gYmFzZUNsb25lKHNyY1ZhbHVlLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoaXNQbGFpbk9iamVjdChzcmNWYWx1ZSkgfHwgaXNBcmd1bWVudHMoc3JjVmFsdWUpKSB7XG4gICAgICBpZiAoaXNBcmd1bWVudHMob2JqVmFsdWUpKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gdG9QbGFpbk9iamVjdChvYmpWYWx1ZSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICghaXNPYmplY3Qob2JqVmFsdWUpIHx8IChzcmNJbmRleCAmJiBpc0Z1bmN0aW9uKG9ialZhbHVlKSkpIHtcbiAgICAgICAgaXNDb21tb24gPSBmYWxzZTtcbiAgICAgICAgbmV3VmFsdWUgPSBiYXNlQ2xvbmUoc3JjVmFsdWUsIHRydWUpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIG5ld1ZhbHVlID0gb2JqVmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaXNDb21tb24gPSBmYWxzZTtcbiAgICB9XG4gIH1cbiAgaWYgKGlzQ29tbW9uKSB7XG4gICAgLy8gUmVjdXJzaXZlbHkgbWVyZ2Ugb2JqZWN0cyBhbmQgYXJyYXlzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgc3RhY2suc2V0KHNyY1ZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgbWVyZ2VGdW5jKG5ld1ZhbHVlLCBzcmNWYWx1ZSwgc3JjSW5kZXgsIGN1c3RvbWl6ZXIsIHN0YWNrKTtcbiAgICBzdGFja1snZGVsZXRlJ10oc3JjVmFsdWUpO1xuICB9XG4gIGFzc2lnbk1lcmdlVmFsdWUob2JqZWN0LCBrZXksIG5ld1ZhbHVlKTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5yZXN0YCB3aGljaCBkb2Vzbid0IHZhbGlkYXRlIG9yIGNvZXJjZSBhcmd1bWVudHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGFwcGx5IGEgcmVzdCBwYXJhbWV0ZXIgdG8uXG4gKiBAcGFyYW0ge251bWJlcn0gW3N0YXJ0PWZ1bmMubGVuZ3RoLTFdIFRoZSBzdGFydCBwb3NpdGlvbiBvZiB0aGUgcmVzdCBwYXJhbWV0ZXIuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVJlc3QoZnVuYywgc3RhcnQpIHtcbiAgc3RhcnQgPSBuYXRpdmVNYXgoc3RhcnQgPT09IHVuZGVmaW5lZCA/IChmdW5jLmxlbmd0aCAtIDEpIDogc3RhcnQsIDApO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMsXG4gICAgICAgIGluZGV4ID0gLTEsXG4gICAgICAgIGxlbmd0aCA9IG5hdGl2ZU1heChhcmdzLmxlbmd0aCAtIHN0YXJ0LCAwKSxcbiAgICAgICAgYXJyYXkgPSBBcnJheShsZW5ndGgpO1xuXG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIGFycmF5W2luZGV4XSA9IGFyZ3Nbc3RhcnQgKyBpbmRleF07XG4gICAgfVxuICAgIGluZGV4ID0gLTE7XG4gICAgdmFyIG90aGVyQXJncyA9IEFycmF5KHN0YXJ0ICsgMSk7XG4gICAgd2hpbGUgKCsraW5kZXggPCBzdGFydCkge1xuICAgICAgb3RoZXJBcmdzW2luZGV4XSA9IGFyZ3NbaW5kZXhdO1xuICAgIH1cbiAgICBvdGhlckFyZ3Nbc3RhcnRdID0gYXJyYXk7XG4gICAgcmV0dXJuIGFwcGx5KGZ1bmMsIHRoaXMsIG90aGVyQXJncyk7XG4gIH07XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mICBgYnVmZmVyYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtCdWZmZXJ9IGJ1ZmZlciBUaGUgYnVmZmVyIHRvIGNsb25lLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBjbG9uZS5cbiAqIEByZXR1cm5zIHtCdWZmZXJ9IFJldHVybnMgdGhlIGNsb25lZCBidWZmZXIuXG4gKi9cbmZ1bmN0aW9uIGNsb25lQnVmZmVyKGJ1ZmZlciwgaXNEZWVwKSB7XG4gIGlmIChpc0RlZXApIHtcbiAgICByZXR1cm4gYnVmZmVyLnNsaWNlKCk7XG4gIH1cbiAgdmFyIHJlc3VsdCA9IG5ldyBidWZmZXIuY29uc3RydWN0b3IoYnVmZmVyLmxlbmd0aCk7XG4gIGJ1ZmZlci5jb3B5KHJlc3VsdCk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mIGBhcnJheUJ1ZmZlcmAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXlCdWZmZXJ9IGFycmF5QnVmZmVyIFRoZSBhcnJheSBidWZmZXIgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyB7QXJyYXlCdWZmZXJ9IFJldHVybnMgdGhlIGNsb25lZCBhcnJheSBidWZmZXIuXG4gKi9cbmZ1bmN0aW9uIGNsb25lQXJyYXlCdWZmZXIoYXJyYXlCdWZmZXIpIHtcbiAgdmFyIHJlc3VsdCA9IG5ldyBhcnJheUJ1ZmZlci5jb25zdHJ1Y3RvcihhcnJheUJ1ZmZlci5ieXRlTGVuZ3RoKTtcbiAgbmV3IFVpbnQ4QXJyYXkocmVzdWx0KS5zZXQobmV3IFVpbnQ4QXJyYXkoYXJyYXlCdWZmZXIpKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgYGRhdGFWaWV3YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IGRhdGFWaWV3IFRoZSBkYXRhIHZpZXcgdG8gY2xvbmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0RlZXBdIFNwZWNpZnkgYSBkZWVwIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY2xvbmVkIGRhdGEgdmlldy5cbiAqL1xuZnVuY3Rpb24gY2xvbmVEYXRhVmlldyhkYXRhVmlldywgaXNEZWVwKSB7XG4gIHZhciBidWZmZXIgPSBpc0RlZXAgPyBjbG9uZUFycmF5QnVmZmVyKGRhdGFWaWV3LmJ1ZmZlcikgOiBkYXRhVmlldy5idWZmZXI7XG4gIHJldHVybiBuZXcgZGF0YVZpZXcuY29uc3RydWN0b3IoYnVmZmVyLCBkYXRhVmlldy5ieXRlT2Zmc2V0LCBkYXRhVmlldy5ieXRlTGVuZ3RoKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgYG1hcGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBjbG9uZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNsb25lRnVuYyBUaGUgZnVuY3Rpb24gdG8gY2xvbmUgdmFsdWVzLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNsb25lZCBtYXAuXG4gKi9cbmZ1bmN0aW9uIGNsb25lTWFwKG1hcCwgaXNEZWVwLCBjbG9uZUZ1bmMpIHtcbiAgdmFyIGFycmF5ID0gaXNEZWVwID8gY2xvbmVGdW5jKG1hcFRvQXJyYXkobWFwKSwgdHJ1ZSkgOiBtYXBUb0FycmF5KG1hcCk7XG4gIHJldHVybiBhcnJheVJlZHVjZShhcnJheSwgYWRkTWFwRW50cnksIG5ldyBtYXAuY29uc3RydWN0b3IpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiBgcmVnZXhwYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHJlZ2V4cCBUaGUgcmVnZXhwIHRvIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY2xvbmVkIHJlZ2V4cC5cbiAqL1xuZnVuY3Rpb24gY2xvbmVSZWdFeHAocmVnZXhwKSB7XG4gIHZhciByZXN1bHQgPSBuZXcgcmVnZXhwLmNvbnN0cnVjdG9yKHJlZ2V4cC5zb3VyY2UsIHJlRmxhZ3MuZXhlYyhyZWdleHApKTtcbiAgcmVzdWx0Lmxhc3RJbmRleCA9IHJlZ2V4cC5sYXN0SW5kZXg7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mIGBzZXRgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc2V0IFRoZSBzZXQgdG8gY2xvbmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjbG9uZUZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNsb25lIHZhbHVlcy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRGVlcF0gU3BlY2lmeSBhIGRlZXAgY2xvbmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjbG9uZWQgc2V0LlxuICovXG5mdW5jdGlvbiBjbG9uZVNldChzZXQsIGlzRGVlcCwgY2xvbmVGdW5jKSB7XG4gIHZhciBhcnJheSA9IGlzRGVlcCA/IGNsb25lRnVuYyhzZXRUb0FycmF5KHNldCksIHRydWUpIDogc2V0VG9BcnJheShzZXQpO1xuICByZXR1cm4gYXJyYXlSZWR1Y2UoYXJyYXksIGFkZFNldEVudHJ5LCBuZXcgc2V0LmNvbnN0cnVjdG9yKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgdGhlIGBzeW1ib2xgIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHN5bWJvbCBUaGUgc3ltYm9sIG9iamVjdCB0byBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNsb25lZCBzeW1ib2wgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBjbG9uZVN5bWJvbChzeW1ib2wpIHtcbiAgcmV0dXJuIHN5bWJvbFZhbHVlT2YgPyBPYmplY3Qoc3ltYm9sVmFsdWVPZi5jYWxsKHN5bWJvbCkpIDoge307XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mIGB0eXBlZEFycmF5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHR5cGVkQXJyYXkgVGhlIHR5cGVkIGFycmF5IHRvIGNsb25lLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNsb25lZCB0eXBlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gY2xvbmVUeXBlZEFycmF5KHR5cGVkQXJyYXksIGlzRGVlcCkge1xuICB2YXIgYnVmZmVyID0gaXNEZWVwID8gY2xvbmVBcnJheUJ1ZmZlcih0eXBlZEFycmF5LmJ1ZmZlcikgOiB0eXBlZEFycmF5LmJ1ZmZlcjtcbiAgcmV0dXJuIG5ldyB0eXBlZEFycmF5LmNvbnN0cnVjdG9yKGJ1ZmZlciwgdHlwZWRBcnJheS5ieXRlT2Zmc2V0LCB0eXBlZEFycmF5Lmxlbmd0aCk7XG59XG5cbi8qKlxuICogQ29waWVzIHRoZSB2YWx1ZXMgb2YgYHNvdXJjZWAgdG8gYGFycmF5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gc291cmNlIFRoZSBhcnJheSB0byBjb3B5IHZhbHVlcyBmcm9tLlxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5PVtdXSBUaGUgYXJyYXkgdG8gY29weSB2YWx1ZXMgdG8uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gY29weUFycmF5KHNvdXJjZSwgYXJyYXkpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBzb3VyY2UubGVuZ3RoO1xuXG4gIGFycmF5IHx8IChhcnJheSA9IEFycmF5KGxlbmd0aCkpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGFycmF5W2luZGV4XSA9IHNvdXJjZVtpbmRleF07XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG4vKipcbiAqIENvcGllcyBwcm9wZXJ0aWVzIG9mIGBzb3VyY2VgIHRvIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb20uXG4gKiBAcGFyYW0ge0FycmF5fSBwcm9wcyBUaGUgcHJvcGVydHkgaWRlbnRpZmllcnMgdG8gY29weS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0PXt9XSBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyB0by5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvcGllZCB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBjb3B5T2JqZWN0KHNvdXJjZSwgcHJvcHMsIG9iamVjdCwgY3VzdG9taXplcikge1xuICBvYmplY3QgfHwgKG9iamVjdCA9IHt9KTtcblxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG5cbiAgICB2YXIgbmV3VmFsdWUgPSBjdXN0b21pemVyXG4gICAgICA/IGN1c3RvbWl6ZXIob2JqZWN0W2tleV0sIHNvdXJjZVtrZXldLCBrZXksIG9iamVjdCwgc291cmNlKVxuICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICBhc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgbmV3VmFsdWUgPT09IHVuZGVmaW5lZCA/IHNvdXJjZVtrZXldIDogbmV3VmFsdWUpO1xuICB9XG4gIHJldHVybiBvYmplY3Q7XG59XG5cbi8qKlxuICogQ29waWVzIG93biBzeW1ib2wgcHJvcGVydGllcyBvZiBgc291cmNlYCB0byBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgb2JqZWN0IHRvIGNvcHkgc3ltYm9scyBmcm9tLlxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3Q9e31dIFRoZSBvYmplY3QgdG8gY29weSBzeW1ib2xzIHRvLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gY29weVN5bWJvbHMoc291cmNlLCBvYmplY3QpIHtcbiAgcmV0dXJuIGNvcHlPYmplY3Qoc291cmNlLCBnZXRTeW1ib2xzKHNvdXJjZSksIG9iamVjdCk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIGxpa2UgYF8uYXNzaWduYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gYXNzaWduZXIgVGhlIGZ1bmN0aW9uIHRvIGFzc2lnbiB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBhc3NpZ25lciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQXNzaWduZXIoYXNzaWduZXIpIHtcbiAgcmV0dXJuIGJhc2VSZXN0KGZ1bmN0aW9uKG9iamVjdCwgc291cmNlcykge1xuICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBzb3VyY2VzLmxlbmd0aCxcbiAgICAgICAgY3VzdG9taXplciA9IGxlbmd0aCA+IDEgPyBzb3VyY2VzW2xlbmd0aCAtIDFdIDogdW5kZWZpbmVkLFxuICAgICAgICBndWFyZCA9IGxlbmd0aCA+IDIgPyBzb3VyY2VzWzJdIDogdW5kZWZpbmVkO1xuXG4gICAgY3VzdG9taXplciA9IChhc3NpZ25lci5sZW5ndGggPiAzICYmIHR5cGVvZiBjdXN0b21pemVyID09ICdmdW5jdGlvbicpXG4gICAgICA/IChsZW5ndGgtLSwgY3VzdG9taXplcilcbiAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKGd1YXJkICYmIGlzSXRlcmF0ZWVDYWxsKHNvdXJjZXNbMF0sIHNvdXJjZXNbMV0sIGd1YXJkKSkge1xuICAgICAgY3VzdG9taXplciA9IGxlbmd0aCA8IDMgPyB1bmRlZmluZWQgOiBjdXN0b21pemVyO1xuICAgICAgbGVuZ3RoID0gMTtcbiAgICB9XG4gICAgb2JqZWN0ID0gT2JqZWN0KG9iamVjdCk7XG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIHZhciBzb3VyY2UgPSBzb3VyY2VzW2luZGV4XTtcbiAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgYXNzaWduZXIob2JqZWN0LCBzb3VyY2UsIGluZGV4LCBjdXN0b21pemVyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfSk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBhbmQgc3ltYm9scyBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcyBhbmQgc3ltYm9scy5cbiAqL1xuZnVuY3Rpb24gZ2V0QWxsS2V5cyhvYmplY3QpIHtcbiAgcmV0dXJuIGJhc2VHZXRBbGxLZXlzKG9iamVjdCwga2V5cywgZ2V0U3ltYm9scyk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgZGF0YSBmb3IgYG1hcGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIHJlZmVyZW5jZSBrZXkuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgbWFwIGRhdGEuXG4gKi9cbmZ1bmN0aW9uIGdldE1hcERhdGEobWFwLCBrZXkpIHtcbiAgdmFyIGRhdGEgPSBtYXAuX19kYXRhX187XG4gIHJldHVybiBpc0tleWFibGUoa2V5KVxuICAgID8gZGF0YVt0eXBlb2Yga2V5ID09ICdzdHJpbmcnID8gJ3N0cmluZycgOiAnaGFzaCddXG4gICAgOiBkYXRhLm1hcDtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBuYXRpdmUgZnVuY3Rpb24gYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgbWV0aG9kIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBmdW5jdGlvbiBpZiBpdCdzIG5hdGl2ZSwgZWxzZSBgdW5kZWZpbmVkYC5cbiAqL1xuZnVuY3Rpb24gZ2V0TmF0aXZlKG9iamVjdCwga2V5KSB7XG4gIHZhciB2YWx1ZSA9IGdldFZhbHVlKG9iamVjdCwga2V5KTtcbiAgcmV0dXJuIGJhc2VJc05hdGl2ZSh2YWx1ZSkgPyB2YWx1ZSA6IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBzeW1ib2wgcHJvcGVydGllcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBzeW1ib2xzLlxuICovXG52YXIgZ2V0U3ltYm9scyA9IG5hdGl2ZUdldFN5bWJvbHMgPyBvdmVyQXJnKG5hdGl2ZUdldFN5bWJvbHMsIE9iamVjdCkgOiBzdHViQXJyYXk7XG5cbi8qKlxuICogR2V0cyB0aGUgYHRvU3RyaW5nVGFnYCBvZiBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbnZhciBnZXRUYWcgPSBiYXNlR2V0VGFnO1xuXG4vLyBGYWxsYmFjayBmb3IgZGF0YSB2aWV3cywgbWFwcywgc2V0cywgYW5kIHdlYWsgbWFwcyBpbiBJRSAxMSxcbi8vIGZvciBkYXRhIHZpZXdzIGluIEVkZ2UgPCAxNCwgYW5kIHByb21pc2VzIGluIE5vZGUuanMuXG5pZiAoKERhdGFWaWV3ICYmIGdldFRhZyhuZXcgRGF0YVZpZXcobmV3IEFycmF5QnVmZmVyKDEpKSkgIT0gZGF0YVZpZXdUYWcpIHx8XG4gICAgKE1hcCAmJiBnZXRUYWcobmV3IE1hcCkgIT0gbWFwVGFnKSB8fFxuICAgIChQcm9taXNlICYmIGdldFRhZyhQcm9taXNlLnJlc29sdmUoKSkgIT0gcHJvbWlzZVRhZykgfHxcbiAgICAoU2V0ICYmIGdldFRhZyhuZXcgU2V0KSAhPSBzZXRUYWcpIHx8XG4gICAgKFdlYWtNYXAgJiYgZ2V0VGFnKG5ldyBXZWFrTWFwKSAhPSB3ZWFrTWFwVGFnKSkge1xuICBnZXRUYWcgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHZhciByZXN1bHQgPSBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSxcbiAgICAgICAgQ3RvciA9IHJlc3VsdCA9PSBvYmplY3RUYWcgPyB2YWx1ZS5jb25zdHJ1Y3RvciA6IHVuZGVmaW5lZCxcbiAgICAgICAgY3RvclN0cmluZyA9IEN0b3IgPyB0b1NvdXJjZShDdG9yKSA6IHVuZGVmaW5lZDtcblxuICAgIGlmIChjdG9yU3RyaW5nKSB7XG4gICAgICBzd2l0Y2ggKGN0b3JTdHJpbmcpIHtcbiAgICAgICAgY2FzZSBkYXRhVmlld0N0b3JTdHJpbmc6IHJldHVybiBkYXRhVmlld1RhZztcbiAgICAgICAgY2FzZSBtYXBDdG9yU3RyaW5nOiByZXR1cm4gbWFwVGFnO1xuICAgICAgICBjYXNlIHByb21pc2VDdG9yU3RyaW5nOiByZXR1cm4gcHJvbWlzZVRhZztcbiAgICAgICAgY2FzZSBzZXRDdG9yU3RyaW5nOiByZXR1cm4gc2V0VGFnO1xuICAgICAgICBjYXNlIHdlYWtNYXBDdG9yU3RyaW5nOiByZXR1cm4gd2Vha01hcFRhZztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn1cblxuLyoqXG4gKiBJbml0aWFsaXplcyBhbiBhcnJheSBjbG9uZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGNsb25lLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBpbml0aWFsaXplZCBjbG9uZS5cbiAqL1xuZnVuY3Rpb24gaW5pdENsb25lQXJyYXkoYXJyYXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIHJlc3VsdCA9IGFycmF5LmNvbnN0cnVjdG9yKGxlbmd0aCk7XG5cbiAgLy8gQWRkIHByb3BlcnRpZXMgYXNzaWduZWQgYnkgYFJlZ0V4cCNleGVjYC5cbiAgaWYgKGxlbmd0aCAmJiB0eXBlb2YgYXJyYXlbMF0gPT0gJ3N0cmluZycgJiYgaGFzT3duUHJvcGVydHkuY2FsbChhcnJheSwgJ2luZGV4JykpIHtcbiAgICByZXN1bHQuaW5kZXggPSBhcnJheS5pbmRleDtcbiAgICByZXN1bHQuaW5wdXQgPSBhcnJheS5pbnB1dDtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEluaXRpYWxpemVzIGFuIG9iamVjdCBjbG9uZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgaW5pdGlhbGl6ZWQgY2xvbmUuXG4gKi9cbmZ1bmN0aW9uIGluaXRDbG9uZU9iamVjdChvYmplY3QpIHtcbiAgcmV0dXJuICh0eXBlb2Ygb2JqZWN0LmNvbnN0cnVjdG9yID09ICdmdW5jdGlvbicgJiYgIWlzUHJvdG90eXBlKG9iamVjdCkpXG4gICAgPyBiYXNlQ3JlYXRlKGdldFByb3RvdHlwZShvYmplY3QpKVxuICAgIDoge307XG59XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgYW4gb2JqZWN0IGNsb25lIGJhc2VkIG9uIGl0cyBgdG9TdHJpbmdUYWdgLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIG9ubHkgc3VwcG9ydHMgY2xvbmluZyB2YWx1ZXMgd2l0aCB0YWdzIG9mXG4gKiBgQm9vbGVhbmAsIGBEYXRlYCwgYEVycm9yYCwgYE51bWJlcmAsIGBSZWdFeHBgLCBvciBgU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHBhcmFtIHtzdHJpbmd9IHRhZyBUaGUgYHRvU3RyaW5nVGFnYCBvZiB0aGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2xvbmVGdW5jIFRoZSBmdW5jdGlvbiB0byBjbG9uZSB2YWx1ZXMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0RlZXBdIFNwZWNpZnkgYSBkZWVwIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgaW5pdGlhbGl6ZWQgY2xvbmUuXG4gKi9cbmZ1bmN0aW9uIGluaXRDbG9uZUJ5VGFnKG9iamVjdCwgdGFnLCBjbG9uZUZ1bmMsIGlzRGVlcCkge1xuICB2YXIgQ3RvciA9IG9iamVjdC5jb25zdHJ1Y3RvcjtcbiAgc3dpdGNoICh0YWcpIHtcbiAgICBjYXNlIGFycmF5QnVmZmVyVGFnOlxuICAgICAgcmV0dXJuIGNsb25lQXJyYXlCdWZmZXIob2JqZWN0KTtcblxuICAgIGNhc2UgYm9vbFRhZzpcbiAgICBjYXNlIGRhdGVUYWc6XG4gICAgICByZXR1cm4gbmV3IEN0b3IoK29iamVjdCk7XG5cbiAgICBjYXNlIGRhdGFWaWV3VGFnOlxuICAgICAgcmV0dXJuIGNsb25lRGF0YVZpZXcob2JqZWN0LCBpc0RlZXApO1xuXG4gICAgY2FzZSBmbG9hdDMyVGFnOiBjYXNlIGZsb2F0NjRUYWc6XG4gICAgY2FzZSBpbnQ4VGFnOiBjYXNlIGludDE2VGFnOiBjYXNlIGludDMyVGFnOlxuICAgIGNhc2UgdWludDhUYWc6IGNhc2UgdWludDhDbGFtcGVkVGFnOiBjYXNlIHVpbnQxNlRhZzogY2FzZSB1aW50MzJUYWc6XG4gICAgICByZXR1cm4gY2xvbmVUeXBlZEFycmF5KG9iamVjdCwgaXNEZWVwKTtcblxuICAgIGNhc2UgbWFwVGFnOlxuICAgICAgcmV0dXJuIGNsb25lTWFwKG9iamVjdCwgaXNEZWVwLCBjbG9uZUZ1bmMpO1xuXG4gICAgY2FzZSBudW1iZXJUYWc6XG4gICAgY2FzZSBzdHJpbmdUYWc6XG4gICAgICByZXR1cm4gbmV3IEN0b3Iob2JqZWN0KTtcblxuICAgIGNhc2UgcmVnZXhwVGFnOlxuICAgICAgcmV0dXJuIGNsb25lUmVnRXhwKG9iamVjdCk7XG5cbiAgICBjYXNlIHNldFRhZzpcbiAgICAgIHJldHVybiBjbG9uZVNldChvYmplY3QsIGlzRGVlcCwgY2xvbmVGdW5jKTtcblxuICAgIGNhc2Ugc3ltYm9sVGFnOlxuICAgICAgcmV0dXJuIGNsb25lU3ltYm9sKG9iamVjdCk7XG4gIH1cbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgaW5kZXguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGg9TUFYX1NBRkVfSU5URUdFUl0gVGhlIHVwcGVyIGJvdW5kcyBvZiBhIHZhbGlkIGluZGV4LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBpbmRleCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0luZGV4KHZhbHVlLCBsZW5ndGgpIHtcbiAgbGVuZ3RoID0gbGVuZ3RoID09IG51bGwgPyBNQVhfU0FGRV9JTlRFR0VSIDogbGVuZ3RoO1xuICByZXR1cm4gISFsZW5ndGggJiZcbiAgICAodHlwZW9mIHZhbHVlID09ICdudW1iZXInIHx8IHJlSXNVaW50LnRlc3QodmFsdWUpKSAmJlxuICAgICh2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDwgbGVuZ3RoKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgdGhlIGdpdmVuIGFyZ3VtZW50cyBhcmUgZnJvbSBhbiBpdGVyYXRlZSBjYWxsLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgdmFsdWUgYXJndW1lbnQuXG4gKiBAcGFyYW0geyp9IGluZGV4IFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgaW5kZXggb3Iga2V5IGFyZ3VtZW50LlxuICogQHBhcmFtIHsqfSBvYmplY3QgVGhlIHBvdGVudGlhbCBpdGVyYXRlZSBvYmplY3QgYXJndW1lbnQuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGFyZ3VtZW50cyBhcmUgZnJvbSBhbiBpdGVyYXRlZSBjYWxsLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJdGVyYXRlZUNhbGwodmFsdWUsIGluZGV4LCBvYmplY3QpIHtcbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciB0eXBlID0gdHlwZW9mIGluZGV4O1xuICBpZiAodHlwZSA9PSAnbnVtYmVyJ1xuICAgICAgICA/IChpc0FycmF5TGlrZShvYmplY3QpICYmIGlzSW5kZXgoaW5kZXgsIG9iamVjdC5sZW5ndGgpKVxuICAgICAgICA6ICh0eXBlID09ICdzdHJpbmcnICYmIGluZGV4IGluIG9iamVjdClcbiAgICAgICkge1xuICAgIHJldHVybiBlcShvYmplY3RbaW5kZXhdLCB2YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlIGZvciB1c2UgYXMgdW5pcXVlIG9iamVjdCBrZXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNLZXlhYmxlKHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gKHR5cGUgPT0gJ3N0cmluZycgfHwgdHlwZSA9PSAnbnVtYmVyJyB8fCB0eXBlID09ICdzeW1ib2wnIHx8IHR5cGUgPT0gJ2Jvb2xlYW4nKVxuICAgID8gKHZhbHVlICE9PSAnX19wcm90b19fJylcbiAgICA6ICh2YWx1ZSA9PT0gbnVsbCk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBmdW5jYCBoYXMgaXRzIHNvdXJjZSBtYXNrZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBmdW5jYCBpcyBtYXNrZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNNYXNrZWQoZnVuYykge1xuICByZXR1cm4gISFtYXNrU3JjS2V5ICYmIChtYXNrU3JjS2V5IGluIGZ1bmMpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhIHByb3RvdHlwZSBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwcm90b3R5cGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNQcm90b3R5cGUodmFsdWUpIHtcbiAgdmFyIEN0b3IgPSB2YWx1ZSAmJiB2YWx1ZS5jb25zdHJ1Y3RvcixcbiAgICAgIHByb3RvID0gKHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3Rvci5wcm90b3R5cGUpIHx8IG9iamVjdFByb3RvO1xuXG4gIHJldHVybiB2YWx1ZSA9PT0gcHJvdG87XG59XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBpcyBsaWtlXG4gKiBbYE9iamVjdC5rZXlzYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LmtleXMpXG4gKiBleGNlcHQgdGhhdCBpdCBpbmNsdWRlcyBpbmhlcml0ZWQgZW51bWVyYWJsZSBwcm9wZXJ0aWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBuYXRpdmVLZXlzSW4ob2JqZWN0KSB7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgaWYgKG9iamVjdCAhPSBudWxsKSB7XG4gICAgZm9yICh2YXIga2V5IGluIE9iamVjdChvYmplY3QpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGBmdW5jYCB0byBpdHMgc291cmNlIGNvZGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzb3VyY2UgY29kZS5cbiAqL1xuZnVuY3Rpb24gdG9Tb3VyY2UoZnVuYykge1xuICBpZiAoZnVuYyAhPSBudWxsKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBmdW5jVG9TdHJpbmcuY2FsbChmdW5jKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gKGZ1bmMgKyAnJyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuICByZXR1cm4gJyc7XG59XG5cbi8qKlxuICogUGVyZm9ybXMgYVxuICogW2BTYW1lVmFsdWVaZXJvYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtc2FtZXZhbHVlemVybylcbiAqIGNvbXBhcmlzb24gYmV0d2VlbiB0d28gdmFsdWVzIHRvIGRldGVybWluZSBpZiB0aGV5IGFyZSBlcXVpdmFsZW50LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSB9O1xuICogdmFyIG90aGVyID0geyAnYSc6IDEgfTtcbiAqXG4gKiBfLmVxKG9iamVjdCwgb2JqZWN0KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKG9iamVjdCwgb3RoZXIpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKCdhJywgJ2EnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKCdhJywgT2JqZWN0KCdhJykpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKE5hTiwgTmFOKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gZXEodmFsdWUsIG90aGVyKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gb3RoZXIgfHwgKHZhbHVlICE9PSB2YWx1ZSAmJiBvdGhlciAhPT0gb3RoZXIpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhbiBgYXJndW1lbnRzYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FyZ3VtZW50cyh2YWx1ZSkge1xuICAvLyBTYWZhcmkgOC4xIG1ha2VzIGBhcmd1bWVudHMuY2FsbGVlYCBlbnVtZXJhYmxlIGluIHN0cmljdCBtb2RlLlxuICByZXR1cm4gaXNBcnJheUxpa2VPYmplY3QodmFsdWUpICYmIGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsICdjYWxsZWUnKSAmJlxuICAgICghcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpIHx8IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IGFyZ3NUYWcpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYW4gYEFycmF5YCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLiBBIHZhbHVlIGlzIGNvbnNpZGVyZWQgYXJyYXktbGlrZSBpZiBpdCdzXG4gKiBub3QgYSBmdW5jdGlvbiBhbmQgaGFzIGEgYHZhbHVlLmxlbmd0aGAgdGhhdCdzIGFuIGludGVnZXIgZ3JlYXRlciB0aGFuIG9yXG4gKiBlcXVhbCB0byBgMGAgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byBgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZSgnYWJjJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhaXNGdW5jdGlvbih2YWx1ZSk7XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5pc0FycmF5TGlrZWAgZXhjZXB0IHRoYXQgaXQgYWxzbyBjaGVja3MgaWYgYHZhbHVlYFxuICogaXMgYW4gb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LWxpa2Ugb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGlzQXJyYXlMaWtlKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIGJ1ZmZlci5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMy4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGJ1ZmZlciwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQnVmZmVyKG5ldyBCdWZmZXIoMikpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNCdWZmZXIobmV3IFVpbnQ4QXJyYXkoMikpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQnVmZmVyID0gbmF0aXZlSXNCdWZmZXIgfHwgc3R1YkZhbHNlO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNGdW5jdGlvbihfKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oL2FiYy8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICAvLyBUaGUgdXNlIG9mIGBPYmplY3QjdG9TdHJpbmdgIGF2b2lkcyBpc3N1ZXMgd2l0aCB0aGUgYHR5cGVvZmAgb3BlcmF0b3JcbiAgLy8gaW4gU2FmYXJpIDgtOSB3aGljaCByZXR1cm5zICdvYmplY3QnIGZvciB0eXBlZCBhcnJheSBhbmQgb3RoZXIgY29uc3RydWN0b3JzLlxuICB2YXIgdGFnID0gaXNPYmplY3QodmFsdWUpID8gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgOiAnJztcbiAgcmV0dXJuIHRhZyA9PSBmdW5jVGFnIHx8IHRhZyA9PSBnZW5UYWc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgaXMgbG9vc2VseSBiYXNlZCBvblxuICogW2BUb0xlbmd0aGBdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXRvbGVuZ3RoKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTGVuZ3RoKDMpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNMZW5ndGgoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoSW5maW5pdHkpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKCczJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmXG4gICAgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBwbGFpbiBvYmplY3QsIHRoYXQgaXMsIGFuIG9iamVjdCBjcmVhdGVkIGJ5IHRoZVxuICogYE9iamVjdGAgY29uc3RydWN0b3Igb3Igb25lIHdpdGggYSBgW1tQcm90b3R5cGVdXWAgb2YgYG51bGxgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC44LjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcGxhaW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqIH1cbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QobmV3IEZvbyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoeyAneCc6IDAsICd5JzogMCB9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoT2JqZWN0LmNyZWF0ZShudWxsKSk7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3QodmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdExpa2UodmFsdWUpIHx8XG4gICAgICBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSAhPSBvYmplY3RUYWcgfHwgaXNIb3N0T2JqZWN0KHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgcHJvdG8gPSBnZXRQcm90b3R5cGUodmFsdWUpO1xuICBpZiAocHJvdG8gPT09IG51bGwpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICB2YXIgQ3RvciA9IGhhc093blByb3BlcnR5LmNhbGwocHJvdG8sICdjb25zdHJ1Y3RvcicpICYmIHByb3RvLmNvbnN0cnVjdG9yO1xuICByZXR1cm4gKHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiZcbiAgICBDdG9yIGluc3RhbmNlb2YgQ3RvciAmJiBmdW5jVG9TdHJpbmcuY2FsbChDdG9yKSA9PSBvYmplY3RDdG9yU3RyaW5nKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgdHlwZWQgYXJyYXkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB0eXBlZCBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShuZXcgVWludDhBcnJheSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1R5cGVkQXJyYXkoW10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzVHlwZWRBcnJheSA9IG5vZGVJc1R5cGVkQXJyYXkgPyBiYXNlVW5hcnkobm9kZUlzVHlwZWRBcnJheSkgOiBiYXNlSXNUeXBlZEFycmF5O1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBwbGFpbiBvYmplY3QgZmxhdHRlbmluZyBpbmhlcml0ZWQgZW51bWVyYWJsZSBzdHJpbmdcbiAqIGtleWVkIHByb3BlcnRpZXMgb2YgYHZhbHVlYCB0byBvd24gcHJvcGVydGllcyBvZiB0aGUgcGxhaW4gb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY29udmVydGVkIHBsYWluIG9iamVjdC5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5hc3NpZ24oeyAnYSc6IDEgfSwgbmV3IEZvbyk7XG4gKiAvLyA9PiB7ICdhJzogMSwgJ2InOiAyIH1cbiAqXG4gKiBfLmFzc2lnbih7ICdhJzogMSB9LCBfLnRvUGxhaW5PYmplY3QobmV3IEZvbykpO1xuICogLy8gPT4geyAnYSc6IDEsICdiJzogMiwgJ2MnOiAzIH1cbiAqL1xuZnVuY3Rpb24gdG9QbGFpbk9iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gY29weU9iamVjdCh2YWx1ZSwga2V5c0luKHZhbHVlKSk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuIFNlZSB0aGVcbiAqIFtFUyBzcGVjXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3Qua2V5cylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICpcbiAqIF8ua2V5cygnaGknKTtcbiAqIC8vID0+IFsnMCcsICcxJ11cbiAqL1xuZnVuY3Rpb24ga2V5cyhvYmplY3QpIHtcbiAgcmV0dXJuIGlzQXJyYXlMaWtlKG9iamVjdCkgPyBhcnJheUxpa2VLZXlzKG9iamVjdCkgOiBiYXNlS2V5cyhvYmplY3QpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBhbmQgaW5oZXJpdGVkIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzSW4obmV3IEZvbyk7XG4gKiAvLyA9PiBbJ2EnLCAnYicsICdjJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqL1xuZnVuY3Rpb24ga2V5c0luKG9iamVjdCkge1xuICByZXR1cm4gaXNBcnJheUxpa2Uob2JqZWN0KSA/IGFycmF5TGlrZUtleXMob2JqZWN0LCB0cnVlKSA6IGJhc2VLZXlzSW4ob2JqZWN0KTtcbn1cblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLmFzc2lnbmAgZXhjZXB0IHRoYXQgaXQgcmVjdXJzaXZlbHkgbWVyZ2VzIG93biBhbmRcbiAqIGluaGVyaXRlZCBlbnVtZXJhYmxlIHN0cmluZyBrZXllZCBwcm9wZXJ0aWVzIG9mIHNvdXJjZSBvYmplY3RzIGludG8gdGhlXG4gKiBkZXN0aW5hdGlvbiBvYmplY3QuIFNvdXJjZSBwcm9wZXJ0aWVzIHRoYXQgcmVzb2x2ZSB0byBgdW5kZWZpbmVkYCBhcmVcbiAqIHNraXBwZWQgaWYgYSBkZXN0aW5hdGlvbiB2YWx1ZSBleGlzdHMuIEFycmF5IGFuZCBwbGFpbiBvYmplY3QgcHJvcGVydGllc1xuICogYXJlIG1lcmdlZCByZWN1cnNpdmVseS4gT3RoZXIgb2JqZWN0cyBhbmQgdmFsdWUgdHlwZXMgYXJlIG92ZXJyaWRkZW4gYnlcbiAqIGFzc2lnbm1lbnQuIFNvdXJjZSBvYmplY3RzIGFyZSBhcHBsaWVkIGZyb20gbGVmdCB0byByaWdodC4gU3Vic2VxdWVudFxuICogc291cmNlcyBvdmVyd3JpdGUgcHJvcGVydHkgYXNzaWdubWVudHMgb2YgcHJldmlvdXMgc291cmNlcy5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgbXV0YXRlcyBgb2JqZWN0YC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuNS4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0gey4uLk9iamVjdH0gW3NvdXJjZXNdIFRoZSBzb3VyY2Ugb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7XG4gKiAgICdhJzogW3sgJ2InOiAyIH0sIHsgJ2QnOiA0IH1dXG4gKiB9O1xuICpcbiAqIHZhciBvdGhlciA9IHtcbiAqICAgJ2EnOiBbeyAnYyc6IDMgfSwgeyAnZSc6IDUgfV1cbiAqIH07XG4gKlxuICogXy5tZXJnZShvYmplY3QsIG90aGVyKTtcbiAqIC8vID0+IHsgJ2EnOiBbeyAnYic6IDIsICdjJzogMyB9LCB7ICdkJzogNCwgJ2UnOiA1IH1dIH1cbiAqL1xudmFyIG1lcmdlID0gY3JlYXRlQXNzaWduZXIoZnVuY3Rpb24ob2JqZWN0LCBzb3VyY2UsIHNyY0luZGV4KSB7XG4gIGJhc2VNZXJnZShvYmplY3QsIHNvdXJjZSwgc3JjSW5kZXgpO1xufSk7XG5cbi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyBhIG5ldyBlbXB0eSBhcnJheS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMTMuMFxuICogQGNhdGVnb3J5IFV0aWxcbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGVtcHR5IGFycmF5LlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgYXJyYXlzID0gXy50aW1lcygyLCBfLnN0dWJBcnJheSk7XG4gKlxuICogY29uc29sZS5sb2coYXJyYXlzKTtcbiAqIC8vID0+IFtbXSwgW11dXG4gKlxuICogY29uc29sZS5sb2coYXJyYXlzWzBdID09PSBhcnJheXNbMV0pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gc3R1YkFycmF5KCkge1xuICByZXR1cm4gW107XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyBgZmFsc2VgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4xMy4wXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50aW1lcygyLCBfLnN0dWJGYWxzZSk7XG4gKiAvLyA9PiBbZmFsc2UsIGZhbHNlXVxuICovXG5mdW5jdGlvbiBzdHViRmFsc2UoKSB7XG4gIHJldHVybiBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtZXJnZTtcbiJdfQ==
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
            var result = this.root.subCounter - 2; // -2 : the boundaries
            result = this.root._hasElement && result + 1 || result;
            return result;
        }
    }]);

    return LSeqTree;
}();

;

module.exports = LSeqTree;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxzZXF0cmVlLmpzIl0sIm5hbWVzIjpbIm1lcmdlIiwicmVxdWlyZSIsIkJhc2UiLCJTdHJhdGVneSIsIklkZW50aWZpZXIiLCJUcmlwbGUiLCJMU2VxTm9kZSIsIkxTZXFUcmVlIiwic2l0ZSIsIm9wdGlvbnMiLCJsaXN0VHJpcGxlIiwiYm91bmRhcnkiLCJiYXNlIiwiX3MiLCJfYyIsIl9oYXNoIiwiZGVwdGgiLCJfYmFzZSIsIl9zdHJhdGVneSIsInJvb3QiLCJhZGQiLCJNYXRoIiwicG93IiwiZ2V0Qml0QmFzZSIsIk51bWJlciIsIk1BWF9WQUxVRSIsImluZGV4Iiwibm9kZSIsImdldCIsImlzTGVhZiIsImNoaWxkIiwiZSIsImVsZW1lbnQiLCJwZWkiLCJfZ2V0IiwicWVpIiwiaWQiLCJhbGxvYyIsInBhaXIiLCJlbGVtIiwiYXBwbHlJbnNlcnQiLCJlaSIsImkiLCJmcm9tTm9kZSIsImFwcGx5UmVtb3ZlIiwicCIsInEiLCJpbnRlcnZhbCIsImxldmVsIiwiZ2V0SW50ZXJ2YWwiLCJiUGx1cyIsImJNaW51cyIsIm5vSW5kZXgiLCJyZXN1bHQiLCJfZCIsInRvTm9kZSIsInQiLCJjaGlsZHJlbiIsImZyb21KU09OIiwiaW5kZXhPZiIsInBvc2l0aW9uIiwiZGVsIiwib2JqZWN0IiwiX2JvdW5kYXJ5IiwiZGVwdGhGaXJzdCIsImN1cnJlbnROb2RlIiwiY3VycmVudFBhdGgiLCJ0cmlwbGUiLCJzIiwiYyIsInB1c2giLCJzbGljZSIsImxlbmd0aCIsInBvcCIsInN1YkNvdW50ZXIiLCJfaGFzRWxlbWVudCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFFQSxJQUFNQSxRQUFRQyxRQUFRLGNBQVIsQ0FBZDtBQUNBLElBQU1DLE9BQU9ELFFBQVEsV0FBUixDQUFiO0FBQ0EsSUFBTUUsV0FBV0YsUUFBUSxlQUFSLENBQWpCO0FBQ0EsSUFBTUcsYUFBYUgsUUFBUSxpQkFBUixDQUFuQjtBQUNBLElBQU1JLFNBQVNKLFFBQVEsYUFBUixDQUFmO0FBQ0EsSUFBTUssV0FBV0wsUUFBUSxlQUFSLENBQWpCOztBQUdBOzs7OztJQUlNTSxROztBQUVGOzs7Ozs7OztBQVFBLHNCQUFhQyxJQUFiLEVBQWlDO0FBQUEsWUFBZEMsT0FBYyx1RUFBSixFQUFJOztBQUFBOztBQUM3QixZQUFJQyxtQkFBSjtBQUNBO0FBQ0EsYUFBS0QsT0FBTCxHQUFlVCxNQUFNLEVBQUVXLFVBQVUsRUFBWixFQUFnQkMsTUFBTSxFQUF0QixFQUFOLEVBQWtDSCxPQUFsQyxDQUFmOztBQUVBO0FBQ0EsYUFBS0ksRUFBTCxHQUFVTCxJQUFWO0FBQ0EsYUFBS00sRUFBTCxHQUFVLENBQVY7QUFDQSxhQUFLQyxLQUFMLEdBQWEsVUFBQ0MsS0FBRDtBQUFBLG1CQUFXQSxRQUFNLENBQWpCO0FBQUEsU0FBYjs7QUFFQSxhQUFLQyxLQUFMLEdBQWEsSUFBSWYsSUFBSixDQUFTLEtBQUtPLE9BQUwsQ0FBYUcsSUFBdEIsQ0FBYjtBQUNBLGFBQUtNLFNBQUwsR0FBaUIsSUFBSWYsUUFBSixDQUFhLEtBQUtjLEtBQWxCLEVBQXlCLEtBQUtSLE9BQUwsQ0FBYUUsUUFBdEMsQ0FBakI7O0FBRUE7QUFDQSxhQUFLUSxJQUFMLEdBQVksSUFBSWIsUUFBSixFQUFaO0FBQ0E7QUFDQSxhQUFLYSxJQUFMLENBQVVDLEdBQVYsQ0FBYyxJQUFJZCxRQUFKLENBQWEsQ0FBQyxJQUFJRCxNQUFKLENBQVcsQ0FBWCxFQUFhLENBQWIsRUFBZSxDQUFmLENBQUQsQ0FBYixFQUFrQyxFQUFsQyxDQUFkO0FBQ0E7QUFDQSxhQUFLYyxJQUFMLENBQVVDLEdBQVYsQ0FDSSxJQUFJZCxRQUFKLENBQWEsQ0FBQyxJQUFJRCxNQUFKLENBQVdnQixLQUFLQyxHQUFMLENBQVMsQ0FBVCxFQUFZLEtBQUtMLEtBQUwsQ0FBV00sVUFBWCxDQUFzQixDQUF0QixDQUFaLElBQXdDLENBQW5ELEVBQ1dDLE9BQU9DLFNBRGxCLEVBRVdELE9BQU9DLFNBRmxCLENBQUQsQ0FBYixFQUU2QyxFQUY3QyxDQURKO0FBSUg7Ozs7OztBQVNEOzs7Ozs7OzRCQU9LQyxLLEVBQU87QUFDUixnQkFBSUMsT0FBTyxLQUFLUixJQUFMLENBQVVTLEdBQVYsQ0FBY0YsUUFBUSxDQUF0QixDQUFYO0FBQ0EsbUJBQU8sQ0FBQ0MsS0FBS0UsTUFBYixFQUFvQjtBQUNoQkYsdUJBQU9BLEtBQUtHLEtBQVo7QUFDSDtBQUNELG1CQUFPSCxLQUFLSSxDQUFaO0FBQ0g7Ozs7O0FBRUQ7Ozs7Ozs7NkJBT01MLEssRUFBTztBQUNULG1CQUFPLEtBQUtQLElBQUwsQ0FBVVMsR0FBVixDQUFjRixLQUFkLENBQVA7QUFDSDs7Ozs7QUFFRDs7Ozs7OzsrQkFPUU0sTyxFQUFTTixLLEVBQU87QUFDcEIsZ0JBQU1PLE1BQU0sS0FBS0MsSUFBTCxDQUFVUixLQUFWLENBQVo7QUFBQSxnQkFBOEI7QUFDeEJTLGtCQUFNLEtBQUtELElBQUwsQ0FBVVIsUUFBTSxDQUFoQixDQURaLENBRG9CLENBRVk7O0FBRS9CO0FBQ0QsaUJBQUtaLEVBQUwsSUFBVyxDQUFYO0FBQ0E7QUFDQSxnQkFBTXNCLEtBQUssS0FBS0MsS0FBTCxDQUFXSixHQUFYLEVBQWdCRSxHQUFoQixDQUFYOztBQUVBO0FBQ0EsZ0JBQU1HLE9BQU8sRUFBQ0MsTUFBTVAsT0FBUCxFQUFnQkksSUFBSUEsRUFBcEIsRUFBYjtBQUNBLGlCQUFLSSxXQUFMLENBQWlCRixJQUFqQjtBQUNBLG1CQUFPQSxJQUFQO0FBQ0g7Ozs7O0FBRUQ7Ozs7OytCQUtRWixLLEVBQU87QUFDWCxnQkFBTWUsS0FBSyxLQUFLUCxJQUFMLENBQVVSLFFBQVEsQ0FBbEIsQ0FBWDtBQUNBLGdCQUFNZ0IsSUFBSSxJQUFJdEMsVUFBSixDQUFlLEtBQUthLEtBQXBCLEVBQTJCMEIsUUFBM0IsQ0FBb0NGLEVBQXBDLENBQVY7QUFDQSxpQkFBS0csV0FBTCxDQUFpQkgsRUFBakI7QUFDQSxtQkFBT0MsQ0FBUDtBQUNIOzs7OztBQUdEOzs7Ozs7OEJBTU9HLEMsRUFBR0MsQyxFQUFHO0FBQ1QsZ0JBQUlDLFdBQVcsQ0FBZjtBQUFBLGdCQUFrQkMsUUFBUSxDQUExQjtBQUNBO0FBQ0EsbUJBQU9ELFlBQVksQ0FBbkIsRUFBc0I7QUFBRTtBQUNwQkEsMkJBQVcsS0FBSzlCLEtBQUwsQ0FBV2dDLFdBQVgsQ0FBdUJELEtBQXZCLEVBQThCSCxDQUE5QixFQUFpQ0MsQ0FBakMsQ0FBWDtBQUNBLGtCQUFFRSxLQUFGO0FBQ0g7QUFDREEscUJBQVMsQ0FBVDtBQUNBLGdCQUFJLEtBQUtqQyxLQUFMLENBQVdpQyxLQUFYLE1BQXNCLENBQTFCLEVBQTZCO0FBQ3pCLHVCQUFPLEtBQUs5QixTQUFMLENBQWVnQyxLQUFmLENBQXFCTCxDQUFyQixFQUF3QkMsQ0FBeEIsRUFDcUJFLEtBRHJCLEVBQzRCRCxRQUQ1QixFQUVxQixLQUFLbEMsRUFGMUIsRUFFOEIsS0FBS0MsRUFGbkMsQ0FBUDtBQUdILGFBSkQsTUFJTztBQUNILHVCQUFPLEtBQUtJLFNBQUwsQ0FBZWlDLE1BQWYsQ0FBc0JOLENBQXRCLEVBQXlCQyxDQUF6QixFQUNzQkUsS0FEdEIsRUFDNkJELFFBRDdCLEVBRXNCLEtBQUtsQyxFQUYzQixFQUUrQixLQUFLQyxFQUZwQyxDQUFQO0FBR0g7QUFDSjs7Ozs7QUFHRDs7Ozs7Ozs7Ozs7O29DQVlhd0IsSSxFQUFzQjtBQUFBLGdCQUFoQmMsT0FBZ0IsdUVBQU4sSUFBTTs7QUFDL0IsZ0JBQUl6QixhQUFKO0FBQUEsZ0JBQVUwQixlQUFWO0FBQUEsZ0JBQWtCWCxVQUFsQjtBQUNBO0FBQ0E7QUFDQUEsZ0JBQUlKLEtBQUtGLEVBQVQ7QUFDQVQsbUJBQVFlLEtBQUtBLEVBQUVZLEVBQVAsSUFBYVosRUFBRTdCLEVBQWYsSUFBcUI2QixFQUFFNUIsRUFBdkIsSUFDSCxJQUFJVixVQUFKLENBQWUsS0FBS2EsS0FBcEIsRUFBMkJ5QixFQUFFWSxFQUE3QixFQUFpQ1osRUFBRTdCLEVBQW5DLEVBQXVDNkIsRUFBRTVCLEVBQXpDLEVBQTZDeUMsTUFBN0MsQ0FBb0RqQixLQUFLQyxJQUF6RCxDQURMO0FBRUE7QUFDQVosbUJBQVFlLEtBQUtBLEVBQUVjLENBQVAsSUFBWWQsRUFBRWUsUUFBZCxJQUEwQm5ELFNBQVNvRCxRQUFULENBQWtCaEIsQ0FBbEIsQ0FBM0IsSUFBb0RmLElBQTNEO0FBQ0E7QUFDQTBCLHFCQUFTLEtBQUtsQyxJQUFMLENBQVVDLEdBQVYsQ0FBY08sSUFBZCxDQUFUO0FBQ0E7QUFDQSxnQkFBSXlCLE9BQUosRUFBYTtBQUNULHVCQUFPQyxNQUFQO0FBQ0gsYUFGRCxNQUVPLElBQUlBLE1BQUosRUFBWTtBQUNmLHVCQUFPLEtBQUtsQyxJQUFMLENBQVV3QyxPQUFWLENBQWtCaEMsSUFBbEIsQ0FBUDtBQUNILGFBRk0sTUFFQTtBQUNILHVCQUFPLENBQUMsQ0FBUjtBQUNIO0FBQ0o7Ozs7O0FBRUQ7Ozs7OztvQ0FNYWUsQyxFQUFHO0FBQ1osZ0JBQUlmLGFBQUo7QUFBQSxnQkFBVWlDLGlCQUFWO0FBQ0E7QUFDQWpDLG1CQUFPZSxLQUFLQSxFQUFFWSxFQUFQLElBQWFaLEVBQUU3QixFQUFmLElBQXFCNkIsRUFBRTVCLEVBQXZCLElBQ0YsSUFBSVYsVUFBSixDQUFlLEtBQUthLEtBQXBCLEVBQTJCeUIsRUFBRVksRUFBN0IsRUFBaUNaLEVBQUU3QixFQUFuQyxFQUF1QzZCLEVBQUU1QixFQUF6QyxDQUFELENBQStDeUMsTUFBL0MsQ0FBc0QsSUFBdEQsQ0FESjtBQUVBO0FBQ0E1QixtQkFBUWUsS0FBS0EsRUFBRWMsQ0FBUCxJQUFZZCxFQUFFZSxRQUFkLElBQTBCbkQsU0FBU29ELFFBQVQsQ0FBa0JoQixDQUFsQixDQUEzQixJQUFvRGYsSUFBM0Q7QUFDQTtBQUNBaUMsdUJBQVcsS0FBS3pDLElBQUwsQ0FBVXdDLE9BQVYsQ0FBa0JoQyxJQUFsQixDQUFYO0FBQ0EsZ0JBQUlpQyxhQUFhLENBQUMsQ0FBbEIsRUFBb0I7QUFDaEI7QUFDQSxxQkFBS3pDLElBQUwsQ0FBVTBDLEdBQVYsQ0FBY2xDLElBQWQ7QUFDSDtBQUNELG1CQUFPaUMsUUFBUDtBQUNIOzs7OztBQUVEOzs7OztpQ0FLVUUsTSxFQUFRO0FBQUE7O0FBQ2Q7QUFDQSxpQkFBS2pELEVBQUwsR0FBVWlELE9BQU9qRCxFQUFqQjtBQUNBLGlCQUFLQyxFQUFMLEdBQVVnRCxPQUFPaEQsRUFBakI7QUFDQSxpQkFBS0wsT0FBTCxHQUFlcUQsT0FBT3JELE9BQXRCOztBQUVBLGlCQUFLUSxLQUFMLEdBQWEsSUFBSWYsSUFBSixDQUFTLEtBQUtPLE9BQUwsQ0FBYUcsSUFBdEIsQ0FBYjtBQUNBLGlCQUFLbUQsU0FBTCxHQUFpQixJQUFJNUQsUUFBSixDQUFhLEtBQUtjLEtBQWxCLEVBQXlCLEtBQUtSLE9BQUwsQ0FBYUUsUUFBdEMsQ0FBakI7O0FBRUE7QUFDQSxnQkFBTXFELGFBQWEsU0FBYkEsVUFBYSxDQUFDQyxXQUFELEVBQWNDLFdBQWQsRUFBOEI7QUFDN0Msb0JBQU1DLFNBQVMsSUFBSTlELE1BQUosQ0FBVzRELFlBQVlULENBQVosQ0FBY1gsQ0FBekIsRUFDV29CLFlBQVlULENBQVosQ0FBY1ksQ0FEekIsRUFFV0gsWUFBWVQsQ0FBWixDQUFjYSxDQUZ6QixDQUFmO0FBR0FILDRCQUFZSSxJQUFaLENBQWlCSCxNQUFqQixFQUo2QyxDQUluQjtBQUMxQixvQkFBSUYsWUFBWWxDLENBQVosS0FBa0IsSUFBdEIsRUFBNEI7QUFDeEIsMEJBQUtaLElBQUwsQ0FBVUMsR0FBVixDQUFjLElBQUlkLFFBQUosQ0FBYTRELFlBQVlLLEtBQVosRUFBYixFQUFrQ04sWUFBWWxDLENBQTlDLENBQWQ7QUFDSDtBQUNELHFCQUFLLElBQUlXLElBQUksQ0FBYixFQUFnQkEsSUFBSXVCLFlBQVlSLFFBQVosQ0FBcUJlLE1BQXpDLEVBQWlELEVBQUU5QixDQUFuRCxFQUFzRDtBQUNsRHNCLCtCQUFXQyxZQUFZUixRQUFaLENBQXFCZixDQUFyQixDQUFYLEVBQW9Dd0IsV0FBcEM7QUFDSDtBQUNEQSw0QkFBWU8sR0FBWixHQVg2QyxDQVcxQjtBQUN0QixhQVpEO0FBYUEsaUJBQUssSUFBSS9CLElBQUksQ0FBYixFQUFnQkEsSUFBSW9CLE9BQU8zQyxJQUFQLENBQVlzQyxRQUFaLENBQXFCZSxNQUF6QyxFQUFpRCxFQUFFOUIsQ0FBbkQsRUFBcUQ7QUFDakRzQiwyQkFBV0YsT0FBTzNDLElBQVAsQ0FBWXNDLFFBQVosQ0FBcUJmLENBQXJCLENBQVgsRUFBb0MsRUFBcEM7QUFDSDtBQUNELG1CQUFPLElBQVA7QUFDSDs7OzRCQXBMYTtBQUNWLGdCQUFJVyxTQUFTLEtBQUtsQyxJQUFMLENBQVV1RCxVQUFWLEdBQXVCLENBQXBDLENBRFUsQ0FDNkI7QUFDdkNyQixxQkFBVSxLQUFLbEMsSUFBTCxDQUFVd0QsV0FBVixJQUF5QnRCLFNBQVMsQ0FBbkMsSUFBeUNBLE1BQWxEO0FBQ0EsbUJBQU9BLE1BQVA7QUFDSDs7Ozs7O0FBa0xKOztBQUVEdUIsT0FBT0MsT0FBUCxHQUFpQnRFLFFBQWpCIiwiZmlsZSI6ImxzZXF0cmVlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBtZXJnZSA9IHJlcXVpcmUoJ2xvZGFzaC5tZXJnZScpO1xuY29uc3QgQmFzZSA9IHJlcXVpcmUoJy4vYmFzZS5qcycpO1xuY29uc3QgU3RyYXRlZ3kgPSByZXF1aXJlKCcuL3N0cmF0ZWd5LmpzJyk7XG5jb25zdCBJZGVudGlmaWVyID0gcmVxdWlyZSgnLi9pZGVudGlmaWVyLmpzJyk7XG5jb25zdCBUcmlwbGUgPSByZXF1aXJlKCcuL3RyaXBsZS5qcycpO1xuY29uc3QgTFNlcU5vZGUgPSByZXF1aXJlKCcuL2xzZXFub2RlLmpzJyk7XG5cblxuLyoqXG4gKiBEaXN0cmlidXRlZCBhcnJheSB1c2luZyBMU2VxIGFsbG9jYXRpb24gc3RyYXRlZ3kgd2l0aCBhbiB1bmRlcmx5aW5nXG4gKiBleHBvbmVudGlhbCB0cmVlLlxuICovXG5jbGFzcyBMU2VxVHJlZSB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBnbG9iYWxseSB1bmlxdWUgc2l0ZSBpZGVudGlmaWVyLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gVGhlIG9wdGlvbnMgb2YgdGhlIExTZXFUcmVlLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5ib3VuZGFyeSA9IDEwXSBUaGUgbWF4aW1hbCBpbnRlcnZhbCBiZXR3ZWVuIHR3b1xuICAgICAqIGdlbmVyYXRlZCBub2Rlcy5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuYmFzZSA9IDE1XSBUaGUgYmFzZSwgaS5lLiwgdGhlIG1heGltYWwgYXJpdHkgb2ZcbiAgICAgKiB0aGUgcm9vdCBub2RlLiBEZWZhdWx0IGlzIDIqKjE1LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yIChzaXRlLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgbGV0IGxpc3RUcmlwbGU7XG4gICAgICAgIC8vICMwIHByb2Nlc3Mgb3B0aW9uc1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBtZXJnZSh7IGJvdW5kYXJ5OiAxMCwgYmFzZTogMTUgfSwgb3B0aW9ucyk7XG5cbiAgICAgICAgLy8gIzEgaW5pdGlhbGl6ZSBzb3VyY2UsIGNvdW50ZXIsIGFuZCBzdHJhdGVneSBjaG9pY2VcbiAgICAgICAgdGhpcy5fcyA9IHNpdGU7XG4gICAgICAgIHRoaXMuX2MgPSAwO1xuICAgICAgICB0aGlzLl9oYXNoID0gKGRlcHRoKSA9PiBkZXB0aCUyO1xuXG4gICAgICAgIHRoaXMuX2Jhc2UgPSBuZXcgQmFzZSh0aGlzLm9wdGlvbnMuYmFzZSk7XG4gICAgICAgIHRoaXMuX3N0cmF0ZWd5ID0gbmV3IFN0cmF0ZWd5KHRoaXMuX2Jhc2UsIHRoaXMub3B0aW9ucy5ib3VuZGFyeSk7XG5cbiAgICAgICAgLy8gIzIgaW5pdGlhbGl6ZSB0cmVlIHN0cnVjdHVyZSB3aXRoIG1heGltYWwgYm91bmRzXG4gICAgICAgIHRoaXMucm9vdCA9IG5ldyBMU2VxTm9kZSgpO1xuICAgICAgICAvLyAjQSBtaW5pbWFsIGJvdW5kXG4gICAgICAgIHRoaXMucm9vdC5hZGQobmV3IExTZXFOb2RlKFtuZXcgVHJpcGxlKDAsMCwwKV0sICcnKSk7XG4gICAgICAgIC8vICNCIG1heGltYWwgYm91bmRcbiAgICAgICAgdGhpcy5yb290LmFkZChcbiAgICAgICAgICAgIG5ldyBMU2VxTm9kZShbbmV3IFRyaXBsZShNYXRoLnBvdygyLCB0aGlzLl9iYXNlLmdldEJpdEJhc2UoMCkpIC0gMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOdW1iZXIuTUFYX1ZBTFVFLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE51bWJlci5NQVhfVkFMVUUpXSwgJycpKTtcbiAgICB9O1xuXG4gICAgXG4gICAgZ2V0IGxlbmd0aCAoKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSB0aGlzLnJvb3Quc3ViQ291bnRlciAtIDI7IC8vIC0yIDogdGhlIGJvdW5kYXJpZXNcbiAgICAgICAgcmVzdWx0ID0gKHRoaXMucm9vdC5faGFzRWxlbWVudCAmJiByZXN1bHQgKyAxKSB8fCByZXN1bHQ7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICBcbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGVsZW1lbnQgYXQgdGFyZ2V0ZWQgaW5kZXggaW4gdGhlIGxpbmVhcml6ZWQgc2VxdWVuY2UuIEl0IGRvZXMgbm90XG4gICAgICogdGFrZSBpbnRvIGFjY291bnQgdGhlIGhpZGRlbiBib3VuZGFyaWVzIG9mIHRoZSBzZXF1ZW5jZSBbTUlOLCBlXzEsIGVfMixcbiAgICAgKiAuLi4gZV9sZW5ndGgsIE1BWF0sIGhlbmNlIGluZGV4IG9mIGVfMSBpcyAwLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleCBUaGUgaW5kZXggb2YgdGhlIGVsZW1lbnQgaW4gdGhlIGZsYXR0ZW5lZCBhcnJheS5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBlbGVtZW50IGxvY2F0ZWQgYXQgdGhlIGluZGV4IGluIGFyZ3VtZW50LlxuICAgICAqL1xuICAgIGdldCAoaW5kZXgpIHtcbiAgICAgICAgbGV0IG5vZGUgPSB0aGlzLnJvb3QuZ2V0KGluZGV4ICsgMSk7XG4gICAgICAgIHdoaWxlICghbm9kZS5pc0xlYWYpe1xuICAgICAgICAgICAgbm9kZSA9IG5vZGUuY2hpbGQ7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBub2RlLmU7XG4gICAgfTtcbiAgICBcbiAgICAvKipcbiAgICAgKiBAcHJpdmF0ZSBHZXQgdGhlIExTZXFOb2RlIGF0IHRhcmdldGVkIGluZGV4IGluIHRoZSBsaW5lYXJpemVkXG4gICAgICogc2VxdWVuY2UuIFRoZSBzZXF1ZW5jZSBpbmNsdWRlcyB0aGUgaGlkZGVuIGJvdW5kYXJpZXMgW01JTiwgZV8xLCBlXzIsXG4gICAgICogLi4uIGVfbGVuZ3RoLCBNQVhdLCBoZW5jZSBlXzEncyBpbmRleCBpcyAxLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleCBUaGUgaW5kZXggb2YgdGhlIGVsZW1lbnQgaW4gdGhlIGZsYXR0ZW5lZCBhcnJheS5cbiAgICAgKiBAcmV0dXJuIHtMU2VxTm9kZX0gVGhlIExTZXFOb2RlIHRhcmdldGluZyB0aGUgZWxlbWVudCBhdCBpbmRleC5cbiAgICAgKi9cbiAgICBfZ2V0IChpbmRleCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yb290LmdldChpbmRleCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEluc2VydCBhIHZhbHVlIGF0IHRoZSB0YXJnZXRlZCBpbmRleC5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZWxlbWVudCBUaGUgZWxlbWVudCB0byBpbnNlcnQsIGUuZy4gYSBjaGFyYWN0ZXIgaWYgdGhlXG4gICAgICogc2VxdWVuY2UgaXMgYSBzdHJpbmcuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4IFRoZSBwb3NpdGlvbiBpbiB0aGUgYXJyYXkuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSB7X2U6IGVsZW1lbnQgb2YgT2JqZWN0IHR5cGUsIF9pOiBJZGVudGlmaWVyfVxuICAgICAqL1xuICAgIGluc2VydCAoZWxlbWVudCwgaW5kZXgpIHtcbiAgICAgICAgY29uc3QgcGVpID0gdGhpcy5fZ2V0KGluZGV4KSwgLy8gIzFhIHByZXZpb3VzIGJvdW5kXG4gICAgICAgICAgICAgIHFlaSA9IHRoaXMuX2dldChpbmRleCsxKTsgLy8gIzFiIG5leHQgYm91bmRcblxuICAgICAgICAgLy8gIzJhIGluY3JlbWVudGluZyB0aGUgbG9jYWwgY291bnRlclxuICAgICAgICB0aGlzLl9jICs9IDE7XG4gICAgICAgIC8vICMyYiBnZW5lcmF0aW5nIHRoZSBpZCBpbmJldHdlZW4gdGhlIGJvdW5kc1xuICAgICAgICBjb25zdCBpZCA9IHRoaXMuYWxsb2MocGVpLCBxZWkpO1xuXG4gICAgICAgIC8vICMzIGFkZCBpdCB0byB0aGUgc3RydWN0dXJlIGFuZCByZXR1cm4gdmFsdWVcbiAgICAgICAgY29uc3QgcGFpciA9IHtlbGVtOiBlbGVtZW50LCBpZDogaWR9O1xuICAgICAgICB0aGlzLmFwcGx5SW5zZXJ0KHBhaXIpO1xuICAgICAgICByZXR1cm4gcGFpcjtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRGVsZXRlIHRoZSBlbGVtZW50IGF0IHRoZSBpbmRleC5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXggVGhlIGluZGV4IG9mIHRoZSBlbGVtZW50IHRvIGRlbGV0ZSBpbiB0aGUgYXJyYXkuXG4gICAgICogQHJldHVybiB7SWRlbnRpZmllcn0gVGhlIGlkZW50aWZpZXIgb2YgdGhlIGVsZW1lbnQgYXQgdGhlIGluZGV4LlxuICAgICAqL1xuICAgIHJlbW92ZSAoaW5kZXgpIHtcbiAgICAgICAgY29uc3QgZWkgPSB0aGlzLl9nZXQoaW5kZXggKyAxKTtcbiAgICAgICAgY29uc3QgaSA9IG5ldyBJZGVudGlmaWVyKHRoaXMuX2Jhc2UpLmZyb21Ob2RlKGVpKTtcbiAgICAgICAgdGhpcy5hcHBseVJlbW92ZShlaSk7XG4gICAgICAgIHJldHVybiBpO1xuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlIHRoZSBkaWdpdCBwYXJ0IG9mIHRoZSBpZGVudGlmaWVycyAgYmV0d2VlbiBwIGFuZCBxLlxuICAgICAqIEBwYXJhbSB7TFNlcU5vZGV9IHAgVGhlIGRpZ2l0IHBhcnQgb2YgdGhlIHByZXZpb3VzIGlkZW50aWZpZXIuXG4gICAgICogQHBhcmFtIHtMU2VxTm9kZX0gcSBUaGUgZGlnaXQgcGFydCBvZiB0aGUgbmV4dCBpZGVudGlmaWVyLlxuICAgICAqIEByZXR1cm4ge0lkZW50aWZpZXJ9IFRoZSBuZXcgaWRlbnRpZmllciBsb2NhdGVkIGJldHdlZW4gcCBhbmQgcS5cbiAgICAgKi9cbiAgICBhbGxvYyAocCwgcSkge1xuICAgICAgICBsZXQgaW50ZXJ2YWwgPSAwLCBsZXZlbCA9IDA7XG4gICAgICAgIC8vICMxIHByb2Nlc3MgdGhlIGxldmVsIG9mIHRoZSBuZXcgaWRlbnRpZmllclxuICAgICAgICB3aGlsZSAoaW50ZXJ2YWwgPD0gMCkgeyAvLyBubyByb29tIGZvciBpbnNlcnRpb25cbiAgICAgICAgICAgIGludGVydmFsID0gdGhpcy5fYmFzZS5nZXRJbnRlcnZhbChsZXZlbCwgcCwgcSk7XG4gICAgICAgICAgICArK2xldmVsO1xuICAgICAgICB9O1xuICAgICAgICBsZXZlbCAtPSAxO1xuICAgICAgICBpZiAodGhpcy5faGFzaChsZXZlbCkgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdHJhdGVneS5iUGx1cyhwLCBxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldmVsLCBpbnRlcnZhbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zLCB0aGlzLl9jKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdHJhdGVneS5iTWludXMocCwgcSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV2ZWwsIGludGVydmFsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zLCB0aGlzLl9jKTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIFxuICAgIFxuICAgIC8qKlxuICAgICAqIEluc2VydCBhbiBlbGVtZW50IGNyZWF0ZWQgZnJvbSBhIHJlbW90ZSBzaXRlIGludG8gdGhlIGFycmF5LlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYWlyIFBhaXIgY29udGFpbmluZyB0aGUgaWRlbnRpZmllciBhbmQgdGhlIGVsZW1lbnQgdG9cbiAgICAgKiBpbnNlcnQgaW4gdGhlIGRhdGEgc3RydWN0dXJlLlxuICAgICAqIEBwYXJhbSB7SWRlbnRpZmllcnxMU2VxTm9kZX0gcGFpci5pZCBUaGUgaWRlbnRpZmllciBvZiB0aGUgZWxlbWVudC5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcGFpci5lbGVtIFRoZSBlbGVtZW50IHRvIGluc2VydC5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtub0luZGV4ID0gdHJ1ZV0gV2hldGhlciBvciBub3QgaXQgc2hvdWxkIHJldHVybiB0aGVcbiAgICAgKiBpbmRleCBvZiB0aGUgaW5zZXJ0LlxuICAgICAqIEByZXR1cm4ge051bWJlcnxCb29sZWFufSBUaGUgaW5kZXggb2YgdGhlIG5ld2x5IGluc2VydGVkIGVsZW1lbnQgaW4gdGhlXG4gICAgICogYXJyYXksIGlmIGFza2VkLiAtMSBpZiB0aGUgZWxlbWVudCBhbHJlYWR5IGV4aXN0cyBhbmQgaGFzIG5vdCBiZWVuIGFkZGVkLlxuICAgICAqIElmIG5vSW5kZXgsIHJldHVybnMgdHJ1ZSBpZiB0aGUgZWxlbWVudCBoYXMgYmVlbiBhZGRlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAqL1xuICAgIGFwcGx5SW5zZXJ0IChwYWlyLCBub0luZGV4ID0gdHJ1ZSkge1xuICAgICAgICBsZXQgbm9kZSwgcmVzdWx0LCBpO1xuICAgICAgICAvLyAjMCBjYXN0IGZyb20gdGhlIHByb3BlciB0eXBlXG4gICAgICAgIC8vICMwQSB0aGUgaWRlbnRpZmllciBpcyBhbiBJZGVudGlmaWVyXG4gICAgICAgIGkgPSBwYWlyLmlkO1xuICAgICAgICBub2RlID0gIGkgJiYgaS5fZCAmJiBpLl9zICYmIGkuX2MgJiZcbiAgICAgICAgICAgIChuZXcgSWRlbnRpZmllcih0aGlzLl9iYXNlLCBpLl9kLCBpLl9zLCBpLl9jKS50b05vZGUocGFpci5lbGVtKSk7XG4gICAgICAgIC8vICMwQiB0aGUgaWRlbnRpZmllciBpcyBhIExTZXFOb2RlXG4gICAgICAgIG5vZGUgPSAoaSAmJiBpLnQgJiYgaS5jaGlsZHJlbiAmJiBMU2VxTm9kZS5mcm9tSlNPTihpKSkgfHwgbm9kZTtcbiAgICAgICAgLy8gIzEgaW50ZWdyYXRlcyB0aGUgbmV3IGVsZW1lbnQgdG8gdGhlIGRhdGEgc3RydWN0dXJlXG4gICAgICAgIHJlc3VsdCA9IHRoaXMucm9vdC5hZGQobm9kZSk7XG4gICAgICAgIC8vICMyIGlmIHRoZSBlbGVtZW50IGFzIGJlZW4gYWRkZWRcbiAgICAgICAgaWYgKG5vSW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0gZWxzZSBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yb290LmluZGV4T2Yobm9kZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH07ICAgICAgICBcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRGVsZXRlIHRoZSBlbGVtZW50IHdpdGggdGhlIHRhcmdldGVkIGlkZW50aWZpZXIuXG4gICAgICogQHBhcmFtIHtJZGVudGlmaWVyfExTZXFOb2RlfSBpIFRoZSBpZGVudGlmaWVyIG9mIHRoZSBlbGVtZW50LlxuICAgICAqIEByZXR1cm4ge051bWJlcn0gVGhlIGluZGV4IG9mIHRoZSBlbGVtZW50IGZyZXNobHkgZGVsZXRlZCwgLTEgaWYgbm9cbiAgICAgKiByZW1vdmFsLlxuICAgICAqL1xuICAgIGFwcGx5UmVtb3ZlIChpKSB7XG4gICAgICAgIGxldCBub2RlLCBwb3NpdGlvbjtcbiAgICAgICAgLy8gIzAgY2FzdCBmcm9tIHRoZSBwcm9wZXIgdHlwZVxuICAgICAgICBub2RlID0gaSAmJiBpLl9kICYmIGkuX3MgJiYgaS5fYyAmJlxuICAgICAgICAgICAgKG5ldyBJZGVudGlmaWVyKHRoaXMuX2Jhc2UsIGkuX2QsIGkuX3MsIGkuX2MpKS50b05vZGUobnVsbCk7XG4gICAgICAgIC8vICMwQiB0aGUgaWRlbnRpZmllciBpcyBhIExTRVFOb2RlXG4gICAgICAgIG5vZGUgPSAoaSAmJiBpLnQgJiYgaS5jaGlsZHJlbiAmJiBMU2VxTm9kZS5mcm9tSlNPTihpKSkgfHwgbm9kZTtcbiAgICAgICAgLy8gIzEgZ2V0IHRoZSBpbmRleCBvZiB0aGUgZWxlbWVudCB0byByZW1vdmVcbiAgICAgICAgcG9zaXRpb24gPSB0aGlzLnJvb3QuaW5kZXhPZihub2RlKTtcbiAgICAgICAgaWYgKHBvc2l0aW9uICE9PSAtMSl7XG4gICAgICAgICAgICAvLyAjMiBpZiBpdCBleGlzdHMgcmVtb3ZlIGl0XG4gICAgICAgICAgICB0aGlzLnJvb3QuZGVsKG5vZGUpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcG9zaXRpb247XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENhc3QgdGhlIEpTT04gb2JqZWN0IGludG8gYSBwcm9wZXIgTFNlcVRyZWUuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCB0aGUgSlNPTiBvYmplY3QgdG8gY2FzdC5cbiAgICAgKiBAcmV0dXJuIHtMU2VxVHJlZX0gQSBzZWxmIHJlZmVyZW5jZS5cbiAgICAgKi9cbiAgICBmcm9tSlNPTiAob2JqZWN0KSB7XG4gICAgICAgIC8vICMxIGNvcHkgdGhlIHNvdXJjZSwgY291bnRlciwgYW5kIGxlbmd0aCBvZiB0aGUgb2JqZWN0XG4gICAgICAgIHRoaXMuX3MgPSBvYmplY3QuX3M7XG4gICAgICAgIHRoaXMuX2MgPSBvYmplY3QuX2M7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9iamVjdC5vcHRpb25zO1xuXG4gICAgICAgIHRoaXMuX2Jhc2UgPSBuZXcgQmFzZSh0aGlzLm9wdGlvbnMuYmFzZSk7XG4gICAgICAgIHRoaXMuX2JvdW5kYXJ5ID0gbmV3IFN0cmF0ZWd5KHRoaXMuX2Jhc2UsIHRoaXMub3B0aW9ucy5ib3VuZGFyeSk7XG4gICAgICAgIFxuICAgICAgICAvLyAjMiBkZXB0aCBmaXJzdCBhZGRpbmdcbiAgICAgICAgY29uc3QgZGVwdGhGaXJzdCA9IChjdXJyZW50Tm9kZSwgY3VycmVudFBhdGgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRyaXBsZSA9IG5ldyBUcmlwbGUoY3VycmVudE5vZGUudC5wLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Tm9kZS50LnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlLnQuYyk7XG4gICAgICAgICAgICBjdXJyZW50UGF0aC5wdXNoKHRyaXBsZSk7IC8vIHN0YWNrXG4gICAgICAgICAgICBpZiAoY3VycmVudE5vZGUuZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMucm9vdC5hZGQobmV3IExTZXFOb2RlKGN1cnJlbnRQYXRoLnNsaWNlKCksIGN1cnJlbnROb2RlLmUpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGN1cnJlbnROb2RlLmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgZGVwdGhGaXJzdChjdXJyZW50Tm9kZS5jaGlsZHJlbltpXSwgY3VycmVudFBhdGgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGN1cnJlbnRQYXRoLnBvcCgpOyAvLyB1bnN0YWNrXG4gICAgICAgIH07XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2JqZWN0LnJvb3QuY2hpbGRyZW4ubGVuZ3RoOyArK2kpe1xuICAgICAgICAgICAgZGVwdGhGaXJzdChvYmplY3Qucm9vdC5jaGlsZHJlbltpXSwgW10pO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9OyAgICBcbiAgICBcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTFNlcVRyZWU7XG4iXX0=
},{"./base.js":1,"./identifier.js":2,"./lseqnode.js":3,"./strategy.js":4,"./triple.js":5,"lodash.merge":7}]},{},[])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvYmFzZS5qcyIsImxpYi9pZGVudGlmaWVyLmpzIiwibGliL2xzZXFub2RlLmpzIiwibGliL3N0cmF0ZWd5LmpzIiwibGliL3RyaXBsZS5qcyIsIm5vZGVfbW9kdWxlcy9CaWdJbnQvc3JjL0JpZ0ludC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gubWVyZ2UvaW5kZXguanMiLCJsaWIvbHNlcXRyZWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN1lBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Z0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNscUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIGFuZCB1dGlsIGNsYXNzIG9mIHRoZSBiYXNlLCBpLmUuIHRoZSBtYXhpbWFsIGFyaXR5IG9mIHRoZSBmaXJzdFxuICogbGV2ZWwgb2YgdGhlIHRyZWUuXG4gKi9cblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIEJhc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtiID0gM10gVGhlIG51bWJlciBvZiBiaXRzIGF0IGxldmVsIDAgb2YgdGhlIGRlbnNlIHNwYWNlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIEJhc2UoKSB7XG4gICAgICAgIHZhciBiID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiAzO1xuXG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBCYXNlKTtcblxuICAgICAgICB0aGlzLl9iID0gYjtcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoQmFzZSwgW3tcbiAgICAgICAga2V5OiAnZ2V0Qml0QmFzZScsXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogUHJvY2VzcyB0aGUgbnVtYmVyIG9mIGJpdHMgdXNhZ2UgYXQgYSBjZXJ0YWluIGxldmVsIG9mIGRlbnNlIHNwYWNlLlxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gbGV2ZWwgVGhlIGxldmVsIGluIGRlbnNlIHNwYWNlLCBpLmUuLCB0aGUgbnVtYmVyIG9mXG4gICAgICAgICAqIGNvbmNhdGVuYXRpb25zIG9mIHRoZSBpZGVudGlmaWVyLlxuICAgICAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSBudW1iZXIgb2YgYml0IHRvIGVuY29kZSBhIHNpbmdsZSBwYXRoIGNvbmNhdGVuYXRpb25cbiAgICAgICAgICogYXQgdGhlIGRlcHRoIGluIGFyZ3VtZW50LlxuICAgICAgICAgKi9cbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldEJpdEJhc2UobGV2ZWwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9iICsgbGV2ZWw7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2dldFN1bUJpdCcsXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogUHJvY2VzcyB0aGUgdG90YWwgbnVtYmVyIG9mIGJpdHMgdXNhZ2UgdG8gZ2V0IHRvIGEgY2VydGFpbiBsZXZlbC5cbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IGxldmVsIFRoZSBsZXZlbCBpbiBkZW5zZSBzcGFjZSwgaS5lLiwgdGhlIG51bWJlciBvZlxuICAgICAgICAgKiBjb25jYXRlbmF0aW9ucyBvZiB0aGUgaWRlbnRpZmllci5cbiAgICAgICAgICogQHJldHVybiB7TnVtYmVyfSBUaGUgbnVtYmVyIG9mIGJpdHMgcmVxdWlyZWQgdG8gZW5jb2RlIHRoZSBwYXRoXG4gICAgICAgICAqIGNvbXByaXNpbmcgbGV2ZWwgY29uY2F0ZW5hdGlvbnMuXG4gICAgICAgICAqL1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0U3VtQml0KGxldmVsKSB7XG4gICAgICAgICAgICB2YXIgbiA9IHRoaXMuZ2V0Qml0QmFzZShsZXZlbCk7XG4gICAgICAgICAgICB2YXIgbSA9IHRoaXMuX2IgLSAxO1xuICAgICAgICAgICAgcmV0dXJuIG4gKiAobiArIDEpIC8gMiAtIG0gKiAobSArIDEpIC8gMjtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZ2V0SW50ZXJ2YWwnLFxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFByb2Nlc3MgdGhlIG51bWJlciBvZiBwb3NzaWJsZSBwYXRocyBiZXR3ZWVuIHR3byBMU0VRTm9kZS5cbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IGxldmVsIFRoZSBkZXB0aCBvZiB0aGUgdHJlZSB0byBwcm9jZXNzLlxuICAgICAgICAgKiBAcGFyYW0ge0xTZXFOb2RlfSBwIFRoZSBwcmV2aW91cyBMU2VxTm9kZS5cbiAgICAgICAgICogQHBhcmFtIHtMU2VxTm9kZX0gcSBUaGUgbmV4dCBMU2VxTm9kZS5cbiAgICAgICAgICogQHJldHVybiB7TnVtYmVyfSBUaGUgaW50ZXJ2YWwgYmV0d2VlbiB0aGUgdHdvIG5vZGVzIGF0IHRoZSBkZXB0aCBpblxuICAgICAgICAgKiBhcmd1bWVudC5cbiAgICAgICAgICovXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRJbnRlcnZhbChsZXZlbCwgcCwgcSkge1xuICAgICAgICAgICAgdmFyIHN1bSA9IDAsXG4gICAgICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICAgICAgcElzR3JlYXRlciA9IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbW1vblJvb3QgPSB0cnVlLFxuICAgICAgICAgICAgICAgIHByZXZWYWx1ZSA9IDAsXG4gICAgICAgICAgICAgICAgbmV4dFZhbHVlID0gMDtcblxuICAgICAgICAgICAgd2hpbGUgKGkgPD0gbGV2ZWwpIHtcbiAgICAgICAgICAgICAgICBwcmV2VmFsdWUgPSBwICYmIHAudC5wIHx8IDA7XG4gICAgICAgICAgICAgICAgbmV4dFZhbHVlID0gcSAmJiBxLnQucCB8fCAwO1xuICAgICAgICAgICAgICAgIC8vICMxIGNoZWNrIGlmIHBhdGhzIGFyZSBpZGVudGljYWxcbiAgICAgICAgICAgICAgICBpZiAoY29tbW9uUm9vdCAmJiBwcmV2VmFsdWUgIT09IG5leHRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBjb21tb25Sb290ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHBJc0dyZWF0ZXIgPSBwcmV2VmFsdWUgPiBuZXh0VmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vICMyIHByb2Nlc3MgdGhlIHZhbHVlIHRvIGFkZCB0byBpbnRlcnZhbFxuICAgICAgICAgICAgICAgIGlmIChwSXNHcmVhdGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHRWYWx1ZSA9IE1hdGgucG93KDIsIHRoaXMuZ2V0Qml0QmFzZShpKSkgLSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoY29tbW9uUm9vdCB8fCBwSXNHcmVhdGVyIHx8IGkgIT09IGxldmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1bSArPSBuZXh0VmFsdWUgLSBwcmV2VmFsdWU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc3VtICs9IG5leHRWYWx1ZSAtIHByZXZWYWx1ZSAtIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpICE9PSBsZXZlbCkge1xuICAgICAgICAgICAgICAgICAgICBzdW0gKj0gTWF0aC5wb3coMiwgdGhpcy5nZXRCaXRCYXNlKGkgKyAxKSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAvLyAjMyBpdGVyYXRlIG92ZXIgcGF0aCBjb25jYXRlbmF0aW9uc1xuICAgICAgICAgICAgICAgIHAgPSBwICYmIHAuY2hpbGQgfHwgbnVsbDtcbiAgICAgICAgICAgICAgICBxID0gcSAmJiBxLmNoaWxkIHx8IG51bGw7XG4gICAgICAgICAgICAgICAgKytpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHN1bTtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBCYXNlO1xufSgpO1xuXG47XG5cbm1vZHVsZS5leHBvcnRzID0gQmFzZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltSmhjMlV1YW5NaVhTd2libUZ0WlhNaU9sc2lRbUZ6WlNJc0ltSWlMQ0pmWWlJc0lteGxkbVZzSWl3aWJpSXNJbWRsZEVKcGRFSmhjMlVpTENKdElpd2ljQ0lzSW5FaUxDSnpkVzBpTENKcElpd2ljRWx6UjNKbFlYUmxjaUlzSW1OdmJXMXZibEp2YjNRaUxDSndjbVYyVm1Gc2RXVWlMQ0p1WlhoMFZtRnNkV1VpTENKMElpd2lUV0YwYUNJc0luQnZkeUlzSW1Ob2FXeGtJaXdpYlc5a2RXeGxJaXdpWlhod2IzSjBjeUpkTENKdFlYQndhVzVuY3lJNklrRkJRVUU3TzBGQlJVRTdPenM3T3pzN096dEpRVWxOUVN4Sk8wRkJRMFk3T3p0QlFVZEJMRzlDUVVGdlFqdEJRVUZCTEZsQlFWQkRMRU5CUVU4c2RVVkJRVWdzUTBGQlJ6czdRVUZCUVRzN1FVRkRhRUlzWVVGQlMwTXNSVUZCVEN4SFFVRlZSQ3hEUVVGV08wRkJRMGc3T3pzN096dEJRVVZFT3pzN096czdPMjFEUVU5WlJTeExMRVZCUVU4N1FVRkRaaXh0UWtGQlR5eExRVUZMUkN4RlFVRk1MRWRCUVZWRExFdEJRV3BDTzBGQlEwZzdPenM3TzBGQlJVUTdPenM3T3pzN2EwTkJUMWRCTEVzc1JVRkJUenRCUVVOa0xHZENRVUZOUXl4SlFVRkpMRXRCUVV0RExGVkJRVXdzUTBGQlowSkdMRXRCUVdoQ0xFTkJRVlk3UVVGRFFTeG5Ra0ZCVFVjc1NVRkJTU3hMUVVGTFNpeEZRVUZNTEVkQlFWVXNRMEZCY0VJN1FVRkRRU3h0UWtGQlVVVXNTMEZCUzBFc1NVRkJTU3hEUVVGVUxFTkJRVVFzUjBGQlowSXNRMEZCYUVJc1IwRkJjVUpGTEV0QlFVdEJMRWxCUVVrc1EwRkJWQ3hKUVVGakxFTkJRVEZETzBGQlEwZzdPenM3TzBGQlJVUTdPenM3T3pzN08yOURRVkZoU0N4TExFVkJRVTlKTEVNc1JVRkJSME1zUXl4RlFVRkhPMEZCUTNSQ0xHZENRVUZKUXl4TlFVRk5MRU5CUVZZN1FVRkJRU3huUWtGQllVTXNTVUZCU1N4RFFVRnFRanRCUVVGQkxHZENRVU5KUXl4aFFVRmhMRXRCUkdwQ08wRkJRVUVzWjBKQlEzZENReXhoUVVGaExFbEJSSEpETzBGQlFVRXNaMEpCUlVsRExGbEJRVmtzUTBGR2FFSTdRVUZCUVN4blFrRkZiVUpETEZsQlFWa3NRMEZHTDBJN08wRkJTVUVzYlVKQlFVOUtMRXRCUVV0UUxFdEJRVm9zUlVGQmJVSTdRVUZEWmxVc05FSkJRV0ZPTEV0QlFVdEJMRVZCUVVWUkxFTkJRVVlzUTBGQlNWSXNRMEZCVml4SlFVRm5RaXhEUVVFMVFqdEJRVU5CVHl3MFFrRkJZVTRzUzBGQlMwRXNSVUZCUlU4c1EwRkJSaXhEUVVGSlVpeERRVUZXTEVsQlFXZENMRU5CUVRWQ08wRkJRMEU3UVVGRFFTeHZRa0ZCU1Vzc1kwRkJZME1zWTBGQlkwTXNVMEZCYUVNc1JVRkJNa003UVVGRGRrTkdMR2xEUVVGaExFdEJRV0k3UVVGRFFVUXNhVU5CUVdGRkxGbEJRVmxETEZOQlFYcENPMEZCUTBnN1FVRkRSRHRCUVVOQkxHOUNRVUZKU0N4VlFVRktMRVZCUVdkQ08wRkJRVVZITEdkRFFVRlpSU3hMUVVGTFF5eEhRVUZNTEVOQlFWTXNRMEZCVkN4RlFVRlhMRXRCUVV0YUxGVkJRVXdzUTBGQlowSkxMRU5CUVdoQ0xFTkJRVmdzU1VGQkswSXNRMEZCTTBNN1FVRkJLME03UVVGRGFrVXNiMEpCUVVsRkxHTkJRV05FTEZWQlFXUXNTVUZCTkVKRUxFMUJRVTFRTEV0QlFYUkRMRVZCUVRaRE8wRkJRM3BEVFN3eVFrRkJUMHNzV1VGQldVUXNVMEZCYmtJN1FVRkRTQ3hwUWtGR1JDeE5RVVZQTzBGQlEwaEtMREpDUVVGUFN5eFpRVUZaUkN4VFFVRmFMRWRCUVhkQ0xFTkJRUzlDTzBGQlEwZzdRVUZEUkN4dlFrRkJTVWdzVFVGQlNWQXNTMEZCVWl4RlFVRmpPMEZCUVVWTkxESkNRVUZQVHl4TFFVRkxReXhIUVVGTUxFTkJRVk1zUTBGQlZDeEZRVUZYTEV0QlFVdGFMRlZCUVV3c1EwRkJaMEpMTEVsQlFVVXNRMEZCYkVJc1EwRkJXQ3hEUVVGUU8wRkJRVEJETzBGQlF6RkVPMEZCUTBGSUxHOUNRVUZKUVN4TFFVRkxRU3hGUVVGRlZ5eExRVUZRTEVsQlFXZENMRWxCUVhCQ08wRkJRMEZXTEc5Q1FVRkpRU3hMUVVGTFFTeEZRVUZGVlN4TFFVRlFMRWxCUVdkQ0xFbEJRWEJDTzBGQlEwRXNhMEpCUVVWU0xFTkJRVVk3UVVGRFNEdEJRVU5FTEcxQ1FVRlBSQ3hIUVVGUU8wRkJRMGc3T3pzN096dEJRVVZLT3p0QlFVVkVWU3hQUVVGUFF5eFBRVUZRTEVkQlFXbENjRUlzU1VGQmFrSWlMQ0ptYVd4bElqb2lZbUZ6WlM1cWN5SXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJaWQxYzJVZ2MzUnlhV04wSnp0Y2JseHVMeW9xWEc0Z0tpQkRiMjVtYVdkMWNtRjBhVzl1SUdGdVpDQjFkR2xzSUdOc1lYTnpJRzltSUhSb1pTQmlZWE5sTENCcExtVXVJSFJvWlNCdFlYaHBiV0ZzSUdGeWFYUjVJRzltSUhSb1pTQm1hWEp6ZEZ4dUlDb2diR1YyWld3Z2IyWWdkR2hsSUhSeVpXVXVYRzRnS2k5Y2JtTnNZWE56SUVKaGMyVWdlMXh1SUNBZ0lDOHFLbHh1SUNBZ0lDQXFJRUJ3WVhKaGJTQjdUblZ0WW1WeWZTQmJZaUE5SUROZElGUm9aU0J1ZFcxaVpYSWdiMllnWW1sMGN5QmhkQ0JzWlhabGJDQXdJRzltSUhSb1pTQmtaVzV6WlNCemNHRmpaUzVjYmlBZ0lDQWdLaTljYmlBZ0lDQmpiMjV6ZEhKMVkzUnZjaUFvWWlBOUlETXBJSHRjYmlBZ0lDQWdJQ0FnZEdocGN5NWZZaUE5SUdJN1hHNGdJQ0FnZlR0Y2JseHVJQ0FnSUM4cUtseHVJQ0FnSUNBcUlGQnliMk5sYzNNZ2RHaGxJRzUxYldKbGNpQnZaaUJpYVhSeklIVnpZV2RsSUdGMElHRWdZMlZ5ZEdGcGJpQnNaWFpsYkNCdlppQmtaVzV6WlNCemNHRmpaUzVjYmlBZ0lDQWdLaUJBY0dGeVlXMGdlMDUxYldKbGNuMGdiR1YyWld3Z1ZHaGxJR3hsZG1Wc0lHbHVJR1JsYm5ObElITndZV05sTENCcExtVXVMQ0IwYUdVZ2JuVnRZbVZ5SUc5bVhHNGdJQ0FnSUNvZ1kyOXVZMkYwWlc1aGRHbHZibk1nYjJZZ2RHaGxJR2xrWlc1MGFXWnBaWEl1WEc0Z0lDQWdJQ29nUUhKbGRIVnliaUI3VG5WdFltVnlmU0JVYUdVZ2JuVnRZbVZ5SUc5bUlHSnBkQ0IwYnlCbGJtTnZaR1VnWVNCemFXNW5iR1VnY0dGMGFDQmpiMjVqWVhSbGJtRjBhVzl1WEc0Z0lDQWdJQ29nWVhRZ2RHaGxJR1JsY0hSb0lHbHVJR0Z5WjNWdFpXNTBMbHh1SUNBZ0lDQXFMMXh1SUNBZ0lHZGxkRUpwZEVKaGMyVWdLR3hsZG1Wc0tTQjdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQjBhR2x6TGw5aUlDc2diR1YyWld3N1hHNGdJQ0FnZlR0Y2JseHVJQ0FnSUM4cUtseHVJQ0FnSUNBcUlGQnliMk5sYzNNZ2RHaGxJSFJ2ZEdGc0lHNTFiV0psY2lCdlppQmlhWFJ6SUhWellXZGxJSFJ2SUdkbGRDQjBieUJoSUdObGNuUmhhVzRnYkdWMlpXd3VYRzRnSUNBZ0lDb2dRSEJoY21GdElIdE9kVzFpWlhKOUlHeGxkbVZzSUZSb1pTQnNaWFpsYkNCcGJpQmtaVzV6WlNCemNHRmpaU3dnYVM1bExpd2dkR2hsSUc1MWJXSmxjaUJ2Wmx4dUlDQWdJQ0FxSUdOdmJtTmhkR1Z1WVhScGIyNXpJRzltSUhSb1pTQnBaR1Z1ZEdsbWFXVnlMbHh1SUNBZ0lDQXFJRUJ5WlhSMWNtNGdlMDUxYldKbGNuMGdWR2hsSUc1MWJXSmxjaUJ2WmlCaWFYUnpJSEpsY1hWcGNtVmtJSFJ2SUdWdVkyOWtaU0IwYUdVZ2NHRjBhRnh1SUNBZ0lDQXFJR052YlhCeWFYTnBibWNnYkdWMlpXd2dZMjl1WTJGMFpXNWhkR2x2Ym5NdVhHNGdJQ0FnSUNvdlhHNGdJQ0FnWjJWMFUzVnRRbWwwSUNoc1pYWmxiQ2tnZTF4dUlDQWdJQ0FnSUNCamIyNXpkQ0J1SUQwZ2RHaHBjeTVuWlhSQ2FYUkNZWE5sS0d4bGRtVnNLVHRjYmlBZ0lDQWdJQ0FnWTI5dWMzUWdiU0E5SUhSb2FYTXVYMklnTFNBeE95QWdJQ0FnSUNCY2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUNodUlDb2dLRzRnS3lBeEtTa2dMeUF5SUMwZ0tHMGdLaUFvYlNBcklERXBJQzhnTWlrN1hHNGdJQ0FnZlR0Y2JseHVJQ0FnSUM4cUtseHVJQ0FnSUNBcUlGQnliMk5sYzNNZ2RHaGxJRzUxYldKbGNpQnZaaUJ3YjNOemFXSnNaU0J3WVhSb2N5QmlaWFIzWldWdUlIUjNieUJNVTBWUlRtOWtaUzVjYmlBZ0lDQWdLaUJBY0dGeVlXMGdlMDUxYldKbGNuMGdiR1YyWld3Z1ZHaGxJR1JsY0hSb0lHOW1JSFJvWlNCMGNtVmxJSFJ2SUhCeWIyTmxjM011WEc0Z0lDQWdJQ29nUUhCaGNtRnRJSHRNVTJWeFRtOWtaWDBnY0NCVWFHVWdjSEpsZG1sdmRYTWdURk5sY1U1dlpHVXVYRzRnSUNBZ0lDb2dRSEJoY21GdElIdE1VMlZ4VG05a1pYMGdjU0JVYUdVZ2JtVjRkQ0JNVTJWeFRtOWtaUzVjYmlBZ0lDQWdLaUJBY21WMGRYSnVJSHRPZFcxaVpYSjlJRlJvWlNCcGJuUmxjblpoYkNCaVpYUjNaV1Z1SUhSb1pTQjBkMjhnYm05a1pYTWdZWFFnZEdobElHUmxjSFJvSUdsdVhHNGdJQ0FnSUNvZ1lYSm5kVzFsYm5RdVhHNGdJQ0FnSUNvdlhHNGdJQ0FnWjJWMFNXNTBaWEoyWVd3Z0tHeGxkbVZzTENCd0xDQnhLU0I3SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdYRzRnSUNBZ0lDQWdJR3hsZENCemRXMGdQU0F3TENCcElEMGdNQ3hjYmlBZ0lDQWdJQ0FnSUNBZ0lIQkpjMGR5WldGMFpYSWdQU0JtWVd4elpTd2dZMjl0Ylc5dVVtOXZkQ0E5SUhSeWRXVXNYRzRnSUNBZ0lDQWdJQ0FnSUNCd2NtVjJWbUZzZFdVZ1BTQXdMQ0J1WlhoMFZtRnNkV1VnUFNBd08xeHVJQ0FnSUNBZ0lDQmNiaUFnSUNBZ0lDQWdkMmhwYkdVZ0tHa2dQRDBnYkdWMlpXd3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIQnlaWFpXWVd4MVpTQTlJQ2h3SUNZbUlIQXVkQzV3S1NCOGZDQXdPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2JtVjRkRlpoYkhWbElEMGdLSEVnSmlZZ2NTNTBMbkFwSUh4OElEQTdJQ0FnSUNBZ0lDQWdJQ0FnWEc0Z0lDQWdJQ0FnSUNBZ0lDQXZMeUFqTVNCamFHVmpheUJwWmlCd1lYUm9jeUJoY21VZ2FXUmxiblJwWTJGc1hHNGdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb1kyOXRiVzl1VW05dmRDQW1KaUJ3Y21WMlZtRnNkV1VnSVQwOUlHNWxlSFJXWVd4MVpTa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR052YlcxdmJsSnZiM1FnUFNCbVlXeHpaVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J3U1hOSGNtVmhkR1Z5SUQwZ2NISmxkbFpoYkhWbElENGdibVY0ZEZaaGJIVmxPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQWdJQ0FnTHk4Z0l6SWdjSEp2WTJWemN5QjBhR1VnZG1Gc2RXVWdkRzhnWVdSa0lIUnZJR2x1ZEdWeWRtRnNYRzRnSUNBZ0lDQWdJQ0FnSUNCcFppQW9jRWx6UjNKbFlYUmxjaWtnZXlCdVpYaDBWbUZzZFdVZ1BTQk5ZWFJvTG5CdmR5Z3lMSFJvYVhNdVoyVjBRbWwwUW1GelpTaHBLU2t0TVRzZ2ZWeHVJQ0FnSUNBZ0lDQWdJQ0FnYVdZZ0tHTnZiVzF2YmxKdmIzUWdmSHdnY0VselIzSmxZWFJsY2lCOGZDQnBJQ0U5UFNCc1pYWmxiQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhOMWJTQXJQU0J1WlhoMFZtRnNkV1VnTFNCd2NtVjJWbUZzZFdVN0lGeHVJQ0FnSUNBZ0lDQWdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J6ZFcwZ0t6MGdibVY0ZEZaaGJIVmxJQzBnY0hKbGRsWmhiSFZsSUMwZ01UdGNiaUFnSUNBZ0lDQWdJQ0FnSUgxY2JpQWdJQ0FnSUNBZ0lDQWdJR2xtSUNocElUMDliR1YyWld3cGV5QnpkVzBnS2owZ1RXRjBhQzV3YjNjb01peDBhR2x6TG1kbGRFSnBkRUpoYzJVb2FTc3hLU2s3SUgwN1hHNGdJQ0FnSUNBZ0lDQWdJQ0F2THlBak15QnBkR1Z5WVhSbElHOTJaWElnY0dGMGFDQmpiMjVqWVhSbGJtRjBhVzl1YzF4dUlDQWdJQ0FnSUNBZ0lDQWdjQ0E5SUhBZ0ppWWdjQzVqYUdsc1pDQjhmQ0J1ZFd4c08xeHVJQ0FnSUNBZ0lDQWdJQ0FnY1NBOUlIRWdKaVlnY1M1amFHbHNaQ0I4ZkNCdWRXeHNPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0t5dHBPMXh1SUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUJ6ZFcwN1hHNGdJQ0FnZlR0Y2JpQWdJQ0JjYm4wN1hHNWNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdRbUZ6WlR0Y2JpSmRmUT09IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgQkkgPSByZXF1aXJlKCdCaWdJbnQnKTtcbnZhciBUcmlwbGUgPSByZXF1aXJlKCcuL3RyaXBsZS5qcycpO1xudmFyIExTZXFOb2RlID0gcmVxdWlyZSgnLi9sc2Vxbm9kZS5qcycpO1xuXG4vKipcbiAqIFVuaXF1ZSBhbmQgaW1tdXRhYmxlIGlkZW50aWZpZXIgY29tcG9zZWQgb2YgZGlnaXQsIHNvdXJjZXMsIGNvdW50ZXJzLlxuICovXG5cbnZhciBJZGVudGlmaWVyID0gZnVuY3Rpb24gKCkge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtCYXNlfSBiYXNlIFRoZSBiYXNlIG9mIGlkZW50aWZpZXJzLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyW119IGRpZ2l0cyBUaGUgZGlnaXQgKHBvc2l0aW9uIGluIGRlbnNlIHNwYWNlKS5cbiAgICAgKiBAcGFyYW0ge09iamVjdFtdfSBzaXRlcyBUaGUgbGlzdCBvZiBzb3VyY2VzLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyW119IGNvdW50ZXJzIFRoZSBsaXN0IG9mIGNvdW50ZXJzLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIElkZW50aWZpZXIoYmFzZSwgZGlnaXRzKSB7XG4gICAgICAgIHZhciBzaXRlcyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogW107XG4gICAgICAgIHZhciBjb3VudGVycyA9IGFyZ3VtZW50cy5sZW5ndGggPiAzICYmIGFyZ3VtZW50c1szXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzNdIDogW107XG5cbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIElkZW50aWZpZXIpO1xuXG4gICAgICAgIHRoaXMuX2QgPSBkaWdpdHM7XG4gICAgICAgIHRoaXMuX3MgPSBzaXRlcztcbiAgICAgICAgdGhpcy5fYyA9IGNvdW50ZXJzO1xuXG4gICAgICAgIHRoaXMuX2Jhc2UgPSBiYXNlO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhJZGVudGlmaWVyLCBbe1xuICAgICAgICBrZXk6ICdmcm9tTm9kZScsXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0IHRoZSBkLHMsYyB2YWx1ZXMgYWNjb3JkaW5nIHRvIHRoZSBub2RlIGluIGFyZ3VtZW50XG4gICAgICAgICAqIEBwYXJhbSB7TFNlcU5vZGV9IG5vZGUgVGhlIGxzZXFub2RlIGNvbnRhaW5pbmcgdGhlIHBhdGggaW4gdGhlIHRyZWVcbiAgICAgICAgICogc3RydWN0dXJlLlxuICAgICAgICAgKiBAcmV0dXJuIHtJZGVudGlmaWVyfSBUaGlzIGlkZW50aWZpZXIgbW9kaWZpZWQuXG4gICAgICAgICAqL1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZnJvbU5vZGUobm9kZSkge1xuICAgICAgICAgICAgLy8gIzEgcHJvY2VzcyB0aGUgbGVuZ3RoIG9mIHRoZSBwYXRoXG4gICAgICAgICAgICB2YXIgbGVuZ3RoID0gMSxcbiAgICAgICAgICAgICAgICB0ZW1wTm9kZSA9IG5vZGU7XG5cbiAgICAgICAgICAgIHdoaWxlICghdGVtcE5vZGUuaXNMZWFmKSB7XG4gICAgICAgICAgICAgICAgKytsZW5ndGg7XG4gICAgICAgICAgICAgICAgdGVtcE5vZGUgPSB0ZW1wTm9kZS5jaGlsZDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAvLyAjMiBjb3B5IHRoZSB2YWx1ZXMgY29udGFpbmVkIGluIHRoZSBwYXRoXG4gICAgICAgICAgICB0aGlzLl9kID0gQkkuaW50MmJpZ0ludCgwLCB0aGlzLl9iYXNlLmdldFN1bUJpdChsZW5ndGggLSAxKSk7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICAvLyAjMWEgY29weSB0aGUgc2l0ZSBpZFxuICAgICAgICAgICAgICAgIHRoaXMuX3MucHVzaChub2RlLnQucyk7XG4gICAgICAgICAgICAgICAgLy8gIzFiIGNvcHkgdGhlIGNvdW50ZXJcbiAgICAgICAgICAgICAgICB0aGlzLl9jLnB1c2gobm9kZS50LmMpO1xuICAgICAgICAgICAgICAgIC8vICMxYyBjb3B5IHRoZSBkaWdpdFxuICAgICAgICAgICAgICAgIEJJLmFkZEludF8odGhpcy5fZCwgbm9kZS50LnApO1xuICAgICAgICAgICAgICAgIGlmIChpICE9PSBsZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIEJJLmxlZnRTaGlmdF8odGhpcy5fZCwgdGhpcy5fYmFzZS5nZXRCaXRCYXNlKGkgKyAxKSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBub2RlID0gbm9kZS5jaGlsZDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICd0b05vZGUnLFxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbnZlcnQgdGhlIGlkZW50aWZpZXIgaW50byBhIG5vZGUgd2l0aG91dCBlbGVtZW50LlxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gZSBUaGUgZWxlbWVudCBhc3NvY2lhdGVkIHdpdGggdGhlIG5vZGUuXG4gICAgICAgICAqIEByZXR1cm4ge0xTZXFOb2RlfSBBbiBMU2VxTm9kZSBjb250YWluaW5nIHRoZSBlbGVtZW50IGFuZCB0aGUgcGF0aFxuICAgICAgICAgKiBleHRyYWN0ZWQgZnJvbSB0aGlzIGlkZW50aWZpZXIuXG4gICAgICAgICAqL1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gdG9Ob2RlKGUpIHtcbiAgICAgICAgICAgIHZhciBkQml0TGVuZ3RoID0gdGhpcy5fYmFzZS5nZXRTdW1CaXQodGhpcy5fYy5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgIHZhciByZXN1bHRQYXRoID0gW10sXG4gICAgICAgICAgICAgICAgbWluZSA9IHZvaWQgMDtcblxuICAgICAgICAgICAgLy8gIzEgZGVjb25zdHJ1Y3QgdGhlIGRpZ2l0IFxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9jLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgLy8gIzEgdHJ1bmNhdGUgbWluZVxuICAgICAgICAgICAgICAgIG1pbmUgPSBCSS5kdXAodGhpcy5fZCk7XG4gICAgICAgICAgICAgICAgLy8gIzFhIHNoaWZ0IHJpZ2h0IHRvIGVyYXNlIHRoZSB0YWlsIG9mIHRoZSBwYXRoXG4gICAgICAgICAgICAgICAgQkkucmlnaHRTaGlmdF8obWluZSwgZEJpdExlbmd0aCAtIHRoaXMuX2Jhc2UuZ2V0U3VtQml0KGkpKTtcbiAgICAgICAgICAgICAgICAvLyAjMWIgY29weSB2YWx1ZSBpbiB0aGUgcmVzdWx0XG4gICAgICAgICAgICAgICAgcmVzdWx0UGF0aC5wdXNoKG5ldyBUcmlwbGUoQkkubW9kSW50KG1pbmUsIE1hdGgucG93KDIsIHRoaXMuX2Jhc2UuZ2V0Qml0QmFzZShpKSkpLCB0aGlzLl9zW2ldLCB0aGlzLl9jW2ldKSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBMU2VxTm9kZShyZXN1bHRQYXRoLCBlKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnY29tcGFyZVRvJyxcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb21wYXJlIHR3byBpZGVudGlmaWVycy5cbiAgICAgICAgICogQHBhcmFtIHtJZGVudGlmaWVyfSBvIFRoZSBvdGhlciBpZGVudGlmaWVyLlxuICAgICAgICAgKiBAcmV0dXJuIHtJbnRlZ2VyfSAtMSBpZiB0aGlzIGlzIGxvd2VyLCAwIGlmIHRoZXkgYXJlIGVxdWFsLCAxIGlmIHRoaXMgaXNcbiAgICAgICAgICogZ3JlYXRlci5cbiAgICAgICAgICovXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wYXJlVG8obykge1xuICAgICAgICAgICAgdmFyIGRCaXRMZW5ndGggPSB0aGlzLl9iYXNlLmdldFN1bUJpdCh0aGlzLl9jLmxlbmd0aCAtIDEpLFxuICAgICAgICAgICAgICAgIG9kQml0TGVuZ3RoID0gdGhpcy5fYmFzZS5nZXRTdW1CaXQoby5fYy5sZW5ndGggLSAxKSxcbiAgICAgICAgICAgICAgICBjb21wYXJpbmcgPSB0cnVlLFxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IDAsXG4gICAgICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICAgICAgc3VtID0gdm9pZCAwLFxuICAgICAgICAgICAgICAgIG1pbmUgPSB2b2lkIDAsXG4gICAgICAgICAgICAgICAgb3RoZXIgPSB2b2lkIDA7XG5cbiAgICAgICAgICAgIC8vICMxIENvbXBhcmUgdGhlIGxpc3Qgb2YgPGQscyxjPlxuICAgICAgICAgICAgd2hpbGUgKGNvbXBhcmluZyAmJiBpIDwgTWF0aC5taW4odGhpcy5fYy5sZW5ndGgsIG8uX2MubGVuZ3RoKSkge1xuICAgICAgICAgICAgICAgIC8vIGNhbiBzdG9wIGJlZm9yZSB0aGUgZW5kIG9mIGZvciBsb29wIHdpeiByZXR1cm5cbiAgICAgICAgICAgICAgICBzdW0gPSB0aGlzLl9iYXNlLmdldFN1bUJpdChpKTtcbiAgICAgICAgICAgICAgICAvLyAjMWEgdHJ1bmNhdGUgbWluZVxuICAgICAgICAgICAgICAgIG1pbmUgPSBCSS5kdXAodGhpcy5fZCk7XG4gICAgICAgICAgICAgICAgQkkucmlnaHRTaGlmdF8obWluZSwgZEJpdExlbmd0aCAtIHN1bSk7XG4gICAgICAgICAgICAgICAgLy8gIzFiIHRydW5jYXRlIG90aGVyXG4gICAgICAgICAgICAgICAgb3RoZXIgPSBCSS5kdXAoby5fZCk7XG4gICAgICAgICAgICAgICAgQkkucmlnaHRTaGlmdF8ob3RoZXIsIG9kQml0TGVuZ3RoIC0gc3VtKTtcbiAgICAgICAgICAgICAgICAvLyAjMiBDb21wYXJlIHRyaXBsZXNcbiAgICAgICAgICAgICAgICAvLyAjQSBkaWdpdFxuICAgICAgICAgICAgICAgIGlmICghQkkuZXF1YWxzKG1pbmUsIG90aGVyKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoQkkuZ3JlYXRlcihtaW5lLCBvdGhlcikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSAtMTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgY29tcGFyaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gI0Igc291cmNlXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuX3NbaV0gLSBvLl9zW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wYXJpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICNDIGNvdW50ZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuX2NbaV0gLSBvLl9jW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBhcmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICsraTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vICMzIGNvbXBhcmUgbGlzdCBzaXplXG4gICAgICAgICAgICBpZiAocmVzdWx0ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5fYy5sZW5ndGggLSBvLl9jLmxlbmd0aDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gSWRlbnRpZmllcjtcbn0oKTtcblxuO1xuXG5tb2R1bGUuZXhwb3J0cyA9IElkZW50aWZpZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbWxrWlc1MGFXWnBaWEl1YW5NaVhTd2libUZ0WlhNaU9sc2lRa2tpTENKeVpYRjFhWEpsSWl3aVZISnBjR3hsSWl3aVRGTmxjVTV2WkdVaUxDSkpaR1Z1ZEdsbWFXVnlJaXdpWW1GelpTSXNJbVJwWjJsMGN5SXNJbk5wZEdWeklpd2lZMjkxYm5SbGNuTWlMQ0pmWkNJc0lsOXpJaXdpWDJNaUxDSmZZbUZ6WlNJc0ltNXZaR1VpTENKc1pXNW5kR2dpTENKMFpXMXdUbTlrWlNJc0ltbHpUR1ZoWmlJc0ltTm9hV3hrSWl3aWFXNTBNbUpwWjBsdWRDSXNJbWRsZEZOMWJVSnBkQ0lzSW1raUxDSndkWE5vSWl3aWRDSXNJbk1pTENKaklpd2lZV1JrU1c1MFh5SXNJbkFpTENKc1pXWjBVMmhwWm5SZklpd2laMlYwUW1sMFFtRnpaU0lzSW1VaUxDSmtRbWwwVEdWdVozUm9JaXdpY21WemRXeDBVR0YwYUNJc0ltMXBibVVpTENKa2RYQWlMQ0p5YVdkb2RGTm9hV1owWHlJc0ltMXZaRWx1ZENJc0lrMWhkR2dpTENKd2IzY2lMQ0p2SWl3aWIyUkNhWFJNWlc1bmRHZ2lMQ0pqYjIxd1lYSnBibWNpTENKeVpYTjFiSFFpTENKemRXMGlMQ0p2ZEdobGNpSXNJbTFwYmlJc0ltVnhkV0ZzY3lJc0ltZHlaV0YwWlhJaUxDSnRiMlIxYkdVaUxDSmxlSEJ2Y25SeklsMHNJbTFoY0hCcGJtZHpJam9pUVVGQlFUczdPenM3TzBGQlJVRXNTVUZCVFVFc1MwRkJTME1zVVVGQlVTeFJRVUZTTEVOQlFWZzdRVUZEUVN4SlFVRk5ReXhUUVVGVFJDeFJRVUZSTEdGQlFWSXNRMEZCWmp0QlFVTkJMRWxCUVUxRkxGZEJRVmRHTEZGQlFWRXNaVUZCVWl4RFFVRnFRanM3UVVGRlFUczdPenRKUVVkTlJ5eFZPenRCUVVWR096czdPenM3UVVGTlFTeDNRa0ZCWVVNc1NVRkJZaXhGUVVGdFFrTXNUVUZCYmtJc1JVRkJjMFE3UVVGQlFTeFpRVUV6UWtNc1MwRkJNa0lzZFVWQlFXNUNMRVZCUVcxQ08wRkJRVUVzV1VGQlprTXNVVUZCWlN4MVJVRkJTaXhGUVVGSk96dEJRVUZCT3p0QlFVTnNSQ3hoUVVGTFF5eEZRVUZNTEVkQlFWVklMRTFCUVZZN1FVRkRRU3hoUVVGTFNTeEZRVUZNTEVkQlFWVklMRXRCUVZZN1FVRkRRU3hoUVVGTFNTeEZRVUZNTEVkQlFWVklMRkZCUVZZN08wRkJSVUVzWVVGQlMwa3NTMEZCVEN4SFFVRmhVQ3hKUVVGaU8wRkJRMGc3T3pzN096dEJRVWRFT3pzN096czdhVU5CVFZWUkxFa3NSVUZCVFR0QlFVTmFPMEZCUTBFc1owSkJRVWxETEZOQlFWTXNRMEZCWWp0QlFVRkJMR2RDUVVGblFrTXNWMEZCVjBZc1NVRkJNMEk3TzBGQlJVRXNiVUpCUVU4c1EwRkJRMFVzVTBGQlUwTXNUVUZCYWtJc1JVRkJlVUk3UVVGRE5VSXNhMEpCUVVWR0xFMUJRVVk3UVVGRFQwTXNNa0pCUVZkQkxGTkJRVk5GTEV0QlFYQkNPMEZCUTBnN1FVRkRSRHRCUVVOQkxHbENRVUZMVWl4RlFVRk1MRWRCUVZWVUxFZEJRVWRyUWl4VlFVRklMRU5CUVdNc1EwRkJaQ3hGUVVGcFFpeExRVUZMVGl4TFFVRk1MRU5CUVZkUExGTkJRVmdzUTBGQmNVSk1MRk5CUVZNc1EwRkJPVUlzUTBGQmFrSXNRMEZCVmpzN1FVRkZRU3hwUWtGQlN5eEpRVUZKVFN4SlFVRkpMRU5CUVdJc1JVRkJaMEpCTEVsQlFVbE9MRTFCUVhCQ0xFVkJRVFpDTEVWQlFVVk5MRU5CUVM5Q0xFVkJRV3RETzBGQlF6bENPMEZCUTBFc2NVSkJRVXRXTEVWQlFVd3NRMEZCVVZjc1NVRkJVaXhEUVVGaFVpeExRVUZMVXl4RFFVRk1MRU5CUVU5RExFTkJRWEJDTzBGQlEwRTdRVUZEUVN4eFFrRkJTMW9zUlVGQlRDeERRVUZSVlN4SlFVRlNMRU5CUVdGU0xFdEJRVXRUTEVOQlFVd3NRMEZCVDBVc1EwRkJjRUk3UVVGRFFUdEJRVU5CZUVJc2JVSkJRVWQ1UWl4UFFVRklMRU5CUVZjc1MwRkJTMmhDTEVWQlFXaENMRVZCUVc5Q1NTeExRVUZMVXl4RFFVRk1MRU5CUVU5SkxFTkJRVE5DTzBGQlEwRXNiMEpCUVVsT0xFMUJRVTFPTEZOQlFWTXNRMEZCYmtJc1JVRkJjMEk3UVVGRGJFSmtMSFZDUVVGSE1rSXNWVUZCU0N4RFFVRmpMRXRCUVV0c1FpeEZRVUZ1UWl4RlFVRjFRaXhMUVVGTFJ5eExRVUZNTEVOQlFWZG5RaXhWUVVGWUxFTkJRWE5DVWl4SlFVRkZMRU5CUVhoQ0xFTkJRWFpDTzBGQlEwZzdRVUZEUkZBc2RVSkJRVTlCTEV0QlFVdEpMRXRCUVZvN1FVRkRTRHM3UVVGRlJDeHRRa0ZCVHl4SlFVRlFPMEZCUTBnN096czdPMEZCUlVRN096czdPenNyUWtGTlVWa3NReXhGUVVGSE8wRkJRMUFzWjBKQlFVMURMR0ZCUVdFc1MwRkJTMnhDTEV0QlFVd3NRMEZCVjA4c1UwRkJXQ3hEUVVGeFFpeExRVUZMVWl4RlFVRk1MRU5CUVZGSExFMUJRVklzUjBGQmFVSXNRMEZCZEVNc1EwRkJia0k3UVVGRFFTeG5Ra0ZCU1dsQ0xHRkJRV0VzUlVGQmFrSTdRVUZCUVN4blFrRkJjVUpETEdGQlFYSkNPenRCUVVWQk8wRkJRMEVzYVVKQlFVc3NTVUZCU1Zvc1NVRkJTU3hEUVVGaUxFVkJRV2RDUVN4SlFVRkpMRXRCUVV0VUxFVkJRVXdzUTBGQlVVY3NUVUZCTlVJc1JVRkJiME1zUlVGQlJVMHNRMEZCZEVNc1JVRkJlVU03UVVGRGNrTTdRVUZEUVZrc2RVSkJRVTlvUXl4SFFVRkhhVU1zUjBGQlNDeERRVUZQTEV0QlFVdDRRaXhGUVVGYUxFTkJRVkE3UVVGRFFUdEJRVU5CVkN4dFFrRkJSMnRETEZkQlFVZ3NRMEZCWlVZc1NVRkJaaXhGUVVGeFFrWXNZVUZCWVN4TFFVRkxiRUlzUzBGQlRDeERRVUZYVHl4VFFVRllMRU5CUVhGQ1F5eERRVUZ5UWl4RFFVRnNRenRCUVVOQk8wRkJRMEZYTERKQ1FVRlhWaXhKUVVGWUxFTkJRMGtzU1VGQlNXNUNMRTFCUVVvc1EwRkJWMFlzUjBGQlIyMURMRTFCUVVnc1EwRkJWVWdzU1VGQlZpeEZRVU5WU1N4TFFVRkxReXhIUVVGTUxFTkJRVk1zUTBGQlZDeEZRVUZaTEV0QlFVdDZRaXhMUVVGTUxFTkJRVmRuUWl4VlFVRllMRU5CUVhOQ1VpeERRVUYwUWl4RFFVRmFMRU5CUkZZc1EwRkJXQ3hGUVVWWExFdEJRVXRXTEVWQlFVd3NRMEZCVVZVc1EwRkJVaXhEUVVaWUxFVkJSMWNzUzBGQlMxUXNSVUZCVEN4RFFVRlJVeXhEUVVGU0xFTkJTRmdzUTBGRVNqdEJRVXRJTzBGQlEwUXNiVUpCUVU4c1NVRkJTV3BDTEZGQlFVb3NRMEZCWVRSQ0xGVkJRV0lzUlVGQmVVSkdMRU5CUVhwQ0xFTkJRVkE3UVVGRFNEczdPenM3UVVGSFJEczdPenM3TzJ0RFFVMVhVeXhETEVWQlFVYzdRVUZEVml4blFrRkJTVklzWVVGQllTeExRVUZMYkVJc1MwRkJUQ3hEUVVGWFR5eFRRVUZZTEVOQlFYRkNMRXRCUVV0U0xFVkJRVXdzUTBGQlVVY3NUVUZCVWl4SFFVRnBRaXhEUVVGMFF5eERRVUZxUWp0QlFVRkJMR2RDUVVOSmVVSXNZMEZCWXl4TFFVRkxNMElzUzBGQlRDeERRVUZYVHl4VFFVRllMRU5CUVhGQ2JVSXNSVUZCUlROQ0xFVkJRVVlzUTBGQlMwY3NUVUZCVEN4SFFVRmpMRU5CUVc1RExFTkJSR3hDTzBGQlFVRXNaMEpCUlVrd1FpeFpRVUZaTEVsQlJtaENPMEZCUVVFc1owSkJSMGxETEZOQlFWTXNRMEZJWWp0QlFVRkJMR2RDUVVkblFuSkNMRWxCUVVrc1EwRkljRUk3UVVGQlFTeG5Ra0ZKU1hOQ0xGbEJTa283UVVGQlFTeG5Ra0ZKVTFZc1lVRktWRHRCUVVGQkxHZENRVWxsVnl4alFVcG1PenRCUVUxQk8wRkJRMEVzYlVKQlFVOUlMR0ZCUVdGd1FpeEpRVUZKWjBJc1MwRkJTMUVzUjBGQlRDeERRVUZUTEV0QlFVdHFReXhGUVVGTUxFTkJRVkZITEUxQlFXcENMRVZCUVhsQ2QwSXNSVUZCUlROQ0xFVkJRVVlzUTBGQlMwY3NUVUZCT1VJc1EwRkJlRUlzUlVGQlowVTdRVUZETlVRN1FVRkRRVFJDTEhOQ1FVRk5MRXRCUVVzNVFpeExRVUZNTEVOQlFWZFBMRk5CUVZnc1EwRkJjVUpETEVOQlFYSkNMRU5CUVU0N1FVRkRRVHRCUVVOQldTeDFRa0ZCVDJoRExFZEJRVWRwUXl4SFFVRklMRU5CUVU4c1MwRkJTM2hDTEVWQlFWb3NRMEZCVUR0QlFVTkJWQ3h0UWtGQlIydERMRmRCUVVnc1EwRkJaVVlzU1VGQlppeEZRVUZ4UWtZc1lVRkJZVmtzUjBGQmJFTTdRVUZEUVR0QlFVTkJReXgzUWtGQlVUTkRMRWRCUVVkcFF5eEhRVUZJTEVOQlFVOUxMRVZCUVVVM1FpeEZRVUZVTEVOQlFWSTdRVUZEUVZRc2JVSkJRVWRyUXl4WFFVRklMRU5CUVdWVExFdEJRV1lzUlVGQmMwSktMR05CUVdOSExFZEJRWEJETzBGQlEwRTdRVUZEUVR0QlFVTkJMRzlDUVVGSkxFTkJRVU14UXl4SFFVRkhOa01zVFVGQlNDeERRVUZWWWl4SlFVRldMRVZCUVdkQ1Z5eExRVUZvUWl4RFFVRk1MRVZCUVRaQ08wRkJRM3BDTEhkQ1FVRkpNME1zUjBGQlJ6aERMRTlCUVVnc1EwRkJWMlFzU1VGQldDeEZRVUZwUWxjc1MwRkJha0lzUTBGQlNpeEZRVUUyUWp0QlFVTjZRa1lzYVVOQlFWTXNRMEZCVkR0QlFVTklMSEZDUVVaRUxFMUJSVTg3UVVGRFNFRXNhVU5CUVZNc1EwRkJReXhEUVVGV08wRkJRMGc3UVVGRFJFUXNaME5CUVZrc1MwRkJXanRCUVVOSUxHbENRVkJFTEUxQlQwODdRVUZEU0R0QlFVTkJReXcyUWtGQlV5eExRVUZMTDBJc1JVRkJUQ3hEUVVGUlZTeERRVUZTTEVsQlFXRnJRaXhGUVVGRk5VSXNSVUZCUml4RFFVRkxWU3hEUVVGTUxFTkJRWFJDTzBGQlEwRXNkMEpCUVVseFFpeFhRVUZYTEVOQlFXWXNSVUZCYTBJN1FVRkRaRVFzYjBOQlFWa3NTMEZCV2p0QlFVTklMSEZDUVVaRUxFMUJSVTg3UVVGRFNEdEJRVU5CUXl4cFEwRkJVeXhMUVVGTE9VSXNSVUZCVEN4RFFVRlJVeXhEUVVGU0xFbEJRV0ZyUWl4RlFVRkZNMElzUlVGQlJpeERRVUZMVXl4RFFVRk1MRU5CUVhSQ08wRkJRMEVzTkVKQlFVbHhRaXhYUVVGWExFTkJRV1lzUlVGQmEwSTdRVUZEWkVRc2QwTkJRVmtzUzBGQldqdEJRVU5JTzBGQlEwbzdRVUZEU2p0QlFVTkVMR3RDUVVGRmNFSXNRMEZCUmp0QlFVTklPenRCUVVWRU8wRkJRMEVzWjBKQlFVbHhRaXhYUVVGWExFTkJRV1lzUlVGQmFVSTdRVUZEWWtFc2VVSkJRVk1zUzBGQlN6bENMRVZCUVV3c1EwRkJVVWNzVFVGQlVpeEhRVUZwUW5kQ0xFVkJRVVV6UWl4RlFVRkdMRU5CUVV0SExFMUJRUzlDTzBGQlEwZzdPMEZCUlVRc2JVSkJRVTh5UWl4TlFVRlFPMEZCUTBnN096czdPenRCUVVOS096dEJRVWRFVFN4UFFVRlBReXhQUVVGUUxFZEJRV2xDTlVNc1ZVRkJha0lpTENKbWFXeGxJam9pYVdSbGJuUnBabWxsY2k1cWN5SXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJaWQxYzJVZ2MzUnlhV04wSnp0Y2JseHVZMjl1YzNRZ1Fra2dQU0J5WlhGMWFYSmxLQ2RDYVdkSmJuUW5LVHRjYm1OdmJuTjBJRlJ5YVhCc1pTQTlJSEpsY1hWcGNtVW9KeTR2ZEhKcGNHeGxMbXB6SnlrN1hHNWpiMjV6ZENCTVUyVnhUbTlrWlNBOUlISmxjWFZwY21Vb0p5NHZiSE5sY1c1dlpHVXVhbk1uS1R0Y2JseHVMeW9xWEc0Z0tpQlZibWx4ZFdVZ1lXNWtJR2x0YlhWMFlXSnNaU0JwWkdWdWRHbG1hV1Z5SUdOdmJYQnZjMlZrSUc5bUlHUnBaMmwwTENCemIzVnlZMlZ6TENCamIzVnVkR1Z5Y3k1Y2JpQXFMMXh1WTJ4aGMzTWdTV1JsYm5ScFptbGxjaUI3WEc0Z0lDQWdYRzRnSUNBZ0x5b3FYRzRnSUNBZ0lDb2dRSEJoY21GdElIdENZWE5sZlNCaVlYTmxJRlJvWlNCaVlYTmxJRzltSUdsa1pXNTBhV1pwWlhKekxseHVJQ0FnSUNBcUlFQndZWEpoYlNCN1RuVnRZbVZ5VzExOUlHUnBaMmwwY3lCVWFHVWdaR2xuYVhRZ0tIQnZjMmwwYVc5dUlHbHVJR1JsYm5ObElITndZV05sS1M1Y2JpQWdJQ0FnS2lCQWNHRnlZVzBnZTA5aWFtVmpkRnRkZlNCemFYUmxjeUJVYUdVZ2JHbHpkQ0J2WmlCemIzVnlZMlZ6TGx4dUlDQWdJQ0FxSUVCd1lYSmhiU0I3VG5WdFltVnlXMTE5SUdOdmRXNTBaWEp6SUZSb1pTQnNhWE4wSUc5bUlHTnZkVzUwWlhKekxseHVJQ0FnSUNBcUwxeHVJQ0FnSUdOdmJuTjBjblZqZEc5eUlDaGlZWE5sTENCa2FXZHBkSE1zSUhOcGRHVnpJRDBnVzEwc0lHTnZkVzUwWlhKeklEMGdXMTBwSUh0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTVmWkNBOUlHUnBaMmwwY3p0Y2JpQWdJQ0FnSUNBZ2RHaHBjeTVmY3lBOUlITnBkR1Z6TzF4dUlDQWdJQ0FnSUNCMGFHbHpMbDlqSUQwZ1kyOTFiblJsY25NN1hHNGdJQ0FnSUNBZ0lGeHVJQ0FnSUNBZ0lDQjBhR2x6TGw5aVlYTmxJRDBnWW1GelpUdGNiaUFnSUNCOU8xeHVYRzVjYmlBZ0lDQXZLaXBjYmlBZ0lDQWdLaUJUWlhRZ2RHaGxJR1FzY3l4aklIWmhiSFZsY3lCaFkyTnZjbVJwYm1jZ2RHOGdkR2hsSUc1dlpHVWdhVzRnWVhKbmRXMWxiblJjYmlBZ0lDQWdLaUJBY0dGeVlXMGdlMHhUWlhGT2IyUmxmU0J1YjJSbElGUm9aU0JzYzJWeGJtOWtaU0JqYjI1MFlXbHVhVzVuSUhSb1pTQndZWFJvSUdsdUlIUm9aU0IwY21WbFhHNGdJQ0FnSUNvZ2MzUnlkV04wZFhKbExseHVJQ0FnSUNBcUlFQnlaWFIxY200Z2UwbGtaVzUwYVdacFpYSjlJRlJvYVhNZ2FXUmxiblJwWm1sbGNpQnRiMlJwWm1sbFpDNWNiaUFnSUNBZ0tpOWNiaUFnSUNCbWNtOXRUbTlrWlNBb2JtOWtaU2tnZTF4dUlDQWdJQ0FnSUNBdkx5QWpNU0J3Y205alpYTnpJSFJvWlNCc1pXNW5kR2dnYjJZZ2RHaGxJSEJoZEdoY2JpQWdJQ0FnSUNBZ2JHVjBJR3hsYm1kMGFDQTlJREVzSUhSbGJYQk9iMlJsSUQwZ2JtOWtaVHRjYmlBZ0lDQWdJQ0FnWEc0Z0lDQWdJQ0FnSUhkb2FXeGxJQ2doZEdWdGNFNXZaR1V1YVhOTVpXRm1LU0I3WEc1Y2RDQWdJQ0FySzJ4bGJtZDBhRHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIUmxiWEJPYjJSbElEMGdkR1Z0Y0U1dlpHVXVZMmhwYkdRN1hHNGdJQ0FnSUNBZ0lIMDdYRzRnSUNBZ0lDQWdJQzh2SUNNeUlHTnZjSGtnZEdobElIWmhiSFZsY3lCamIyNTBZV2x1WldRZ2FXNGdkR2hsSUhCaGRHaGNiaUFnSUNBZ0lDQWdkR2hwY3k1ZlpDQTlJRUpKTG1sdWRESmlhV2RKYm5Rb01Dd2dkR2hwY3k1ZlltRnpaUzVuWlhSVGRXMUNhWFFvYkdWdVozUm9JQzBnTVNrcE8xeHVJQ0FnSUNBZ0lDQmNiaUFnSUNBZ0lDQWdabTl5SUNoc1pYUWdhU0E5SURBN0lHa2dQQ0JzWlc1bmRHZ2dPeUFySzJrcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUM4dklDTXhZU0JqYjNCNUlIUm9aU0J6YVhSbElHbGtYRzRnSUNBZ0lDQWdJQ0FnSUNCMGFHbHpMbDl6TG5CMWMyZ29ibTlrWlM1MExuTXBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0x5OGdJekZpSUdOdmNIa2dkR2hsSUdOdmRXNTBaWEpjYmlBZ0lDQWdJQ0FnSUNBZ0lIUm9hWE11WDJNdWNIVnphQ2h1YjJSbExuUXVZeWs3WEc0Z0lDQWdJQ0FnSUNBZ0lDQXZMeUFqTVdNZ1kyOXdlU0IwYUdVZ1pHbG5hWFJjYmlBZ0lDQWdJQ0FnSUNBZ0lFSkpMbUZrWkVsdWRGOG9kR2hwY3k1ZlpDd2dibTlrWlM1MExuQXBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLR2tnSVQwOUlHeGxibWQwYUNBdElERXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JDU1M1c1pXWjBVMmhwWm5SZktIUm9hWE11WDJRc0lIUm9hWE11WDJKaGMyVXVaMlYwUW1sMFFtRnpaU2hwS3pFcEtUdGNiaUFnSUNBZ0lDQWdJQ0FnSUgwN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J1YjJSbElEMGdibTlrWlM1amFHbHNaRHRjYmlBZ0lDQWdJQ0FnZlR0Y2JpQWdJQ0FnSUNBZ1hHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCMGFHbHpPMXh1SUNBZ0lIMDdYRzRnSUNBZ1hHNGdJQ0FnTHlvcVhHNGdJQ0FnSUNvZ1EyOXVkbVZ5ZENCMGFHVWdhV1JsYm5ScFptbGxjaUJwYm5SdklHRWdibTlrWlNCM2FYUm9iM1YwSUdWc1pXMWxiblF1WEc0Z0lDQWdJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJR1VnVkdobElHVnNaVzFsYm5RZ1lYTnpiMk5wWVhSbFpDQjNhWFJvSUhSb1pTQnViMlJsTGx4dUlDQWdJQ0FxSUVCeVpYUjFjbTRnZTB4VFpYRk9iMlJsZlNCQmJpQk1VMlZ4VG05a1pTQmpiMjUwWVdsdWFXNW5JSFJvWlNCbGJHVnRaVzUwSUdGdVpDQjBhR1VnY0dGMGFGeHVJQ0FnSUNBcUlHVjRkSEpoWTNSbFpDQm1jbTl0SUhSb2FYTWdhV1JsYm5ScFptbGxjaTVjYmlBZ0lDQWdLaTljYmlBZ0lDQjBiMDV2WkdVZ0tHVXBJSHRjYmlBZ0lDQWdJQ0FnWTI5dWMzUWdaRUpwZEV4bGJtZDBhQ0E5SUhSb2FYTXVYMkpoYzJVdVoyVjBVM1Z0UW1sMEtIUm9hWE11WDJNdWJHVnVaM1JvSUMwZ01TazdYRzRnSUNBZ0lDQWdJR3hsZENCeVpYTjFiSFJRWVhSb0lEMGdXMTBzSUcxcGJtVTdYRzRnSUNBZ0lDQWdJRnh1SUNBZ0lDQWdJQ0F2THlBak1TQmtaV052Ym5OMGNuVmpkQ0IwYUdVZ1pHbG5hWFFnWEc0Z0lDQWdJQ0FnSUdadmNpQW9iR1YwSUdrZ1BTQXdPeUJwSUR3Z2RHaHBjeTVmWXk1c1pXNW5kR2c3SUNzcmFTa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0x5OGdJekVnZEhKMWJtTmhkR1VnYldsdVpWeHVJQ0FnSUNBZ0lDQWdJQ0FnYldsdVpTQTlJRUpKTG1SMWNDaDBhR2x6TGw5a0tUdGNiaUFnSUNBZ0lDQWdJQ0FnSUM4dklDTXhZU0J6YUdsbWRDQnlhV2RvZENCMGJ5QmxjbUZ6WlNCMGFHVWdkR0ZwYkNCdlppQjBhR1VnY0dGMGFGeHVJQ0FnSUNBZ0lDQWdJQ0FnUWtrdWNtbG5hSFJUYUdsbWRGOG9iV2x1WlN3Z1pFSnBkRXhsYm1kMGFDQXRJSFJvYVhNdVgySmhjMlV1WjJWMFUzVnRRbWwwS0drcEtUdGNiaUFnSUNBZ0lDQWdJQ0FnSUM4dklDTXhZaUJqYjNCNUlIWmhiSFZsSUdsdUlIUm9aU0J5WlhOMWJIUmNiaUFnSUNBZ0lDQWdJQ0FnSUhKbGMzVnNkRkJoZEdndWNIVnphQ2hjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J1WlhjZ1ZISnBjR3hsS0VKSkxtMXZaRWx1ZENodGFXNWxMRnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUUxaGRHZ3VjRzkzS0RJc0lIUm9hWE11WDJKaGMyVXVaMlYwUW1sMFFtRnpaU2hwS1NrcExGeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkR2hwY3k1ZmMxdHBYU3hjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhSb2FYTXVYMk5iYVYwcEtUdGNiaUFnSUNBZ0lDQWdmVHRjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJRzVsZHlCTVUyVnhUbTlrWlNoeVpYTjFiSFJRWVhSb0xDQmxLVHRjYmlBZ0lDQjlPMXh1WEc1Y2JpQWdJQ0F2S2lwY2JpQWdJQ0FnS2lCRGIyMXdZWEpsSUhSM2J5QnBaR1Z1ZEdsbWFXVnljeTVjYmlBZ0lDQWdLaUJBY0dGeVlXMGdlMGxrWlc1MGFXWnBaWEo5SUc4Z1ZHaGxJRzkwYUdWeUlHbGtaVzUwYVdacFpYSXVYRzRnSUNBZ0lDb2dRSEpsZEhWeWJpQjdTVzUwWldkbGNuMGdMVEVnYVdZZ2RHaHBjeUJwY3lCc2IzZGxjaXdnTUNCcFppQjBhR1Y1SUdGeVpTQmxjWFZoYkN3Z01TQnBaaUIwYUdseklHbHpYRzRnSUNBZ0lDb2daM0psWVhSbGNpNWNiaUFnSUNBZ0tpOWNiaUFnSUNCamIyMXdZWEpsVkc4Z0tHOHBJSHRjYmlBZ0lDQWdJQ0FnYkdWMElHUkNhWFJNWlc1bmRHZ2dQU0IwYUdsekxsOWlZWE5sTG1kbGRGTjFiVUpwZENoMGFHbHpMbDlqTG14bGJtZDBhQ0F0SURFcExGeHVJQ0FnSUNBZ0lDQWdJQ0FnYjJSQ2FYUk1aVzVuZEdnZ1BTQjBhR2x6TGw5aVlYTmxMbWRsZEZOMWJVSnBkQ2h2TGw5akxteGxibWQwYUNBdElERXBMRnh1SUNBZ0lDQWdJQ0FnSUNBZ1kyOXRjR0Z5YVc1bklEMGdkSEoxWlN4Y2JpQWdJQ0FnSUNBZ0lDQWdJSEpsYzNWc2RDQTlJREFzSUdrZ1BTQXdMRnh1SUNBZ0lDQWdJQ0FnSUNBZ2MzVnRMQ0J0YVc1bExDQnZkR2hsY2p0Y2JpQWdJQ0FnSUNBZ1hHNGdJQ0FnSUNBZ0lDOHZJQ014SUVOdmJYQmhjbVVnZEdobElHeHBjM1FnYjJZZ1BHUXNjeXhqUGx4dUlDQWdJQ0FnSUNCM2FHbHNaU0FvWTI5dGNHRnlhVzVuSUNZbUlHa2dQQ0JOWVhSb0xtMXBiaWgwYUdsekxsOWpMbXhsYm1kMGFDd2dieTVmWXk1c1pXNW5kR2dwSUNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnTHk4Z1kyRnVJSE4wYjNBZ1ltVm1iM0psSUhSb1pTQmxibVFnYjJZZ1ptOXlJR3h2YjNBZ2QybDZJSEpsZEhWeWJseHVJQ0FnSUNBZ0lDQWdJQ0FnYzNWdElEMGdkR2hwY3k1ZlltRnpaUzVuWlhSVGRXMUNhWFFvYVNrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0F2THlBak1XRWdkSEoxYm1OaGRHVWdiV2x1WlZ4dUlDQWdJQ0FnSUNBZ0lDQWdiV2x1WlNBOUlFSkpMbVIxY0NoMGFHbHpMbDlrS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJRUpKTG5KcFoyaDBVMmhwWm5SZktHMXBibVVzSUdSQ2FYUk1aVzVuZEdnZ0xTQnpkVzBwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdMeThnSXpGaUlIUnlkVzVqWVhSbElHOTBhR1Z5WEc0Z0lDQWdJQ0FnSUNBZ0lDQnZkR2hsY2lBOUlFSkpMbVIxY0NodkxsOWtLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lFSkpMbkpwWjJoMFUyaHBablJmS0c5MGFHVnlMQ0J2WkVKcGRFeGxibWQwYUNBdElITjFiU2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQXZMeUFqTWlCRGIyMXdZWEpsSUhSeWFYQnNaWE5jYmlBZ0lDQWdJQ0FnSUNBZ0lDOHZJQ05CSUdScFoybDBYRzRnSUNBZ0lDQWdJQ0FnSUNCcFppQW9JVUpKTG1WeGRXRnNjeWh0YVc1bExDQnZkR2hsY2lrcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnBaaUFvUWtrdVozSmxZWFJsY2lodGFXNWxMQ0J2ZEdobGNpa3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2NtVnpkV3gwSUQwZ01UdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J5WlhOMWJIUWdQU0F0TVR0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCOU8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHTnZiWEJoY21sdVp5QTlJR1poYkhObE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0F2THlBalFpQnpiM1Z5WTJWY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCeVpYTjFiSFFnUFNCMGFHbHpMbDl6VzJsZElDMGdieTVmYzF0cFhUc2dYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdhV1lnS0hKbGMzVnNkQ0FoUFQwZ01Da2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCamIyMXdZWEpwYm1jZ1BTQm1ZV3h6WlR0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQXZMeUFqUXlCamIzVnVkR1Z5WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lISmxjM1ZzZENBOUlIUm9hWE11WDJOYmFWMGdMU0J2TGw5alcybGRPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCcFppQW9jbVZ6ZFd4MElDRTlQU0F3S1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCamIyMXdZWEpwYm1jZ1BTQm1ZV3h6WlR0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdmVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5TzF4dUlDQWdJQ0FnSUNBZ0lDQWdmVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDc3JhVHRjYmlBZ0lDQWdJQ0FnZlR0Y2JpQWdJQ0FnSUNBZ1hHNGdJQ0FnSUNBZ0lDOHZJQ016SUdOdmJYQmhjbVVnYkdsemRDQnphWHBsWEc0Z0lDQWdJQ0FnSUdsbUlDaHlaWE4xYkhRZ1BUMDlJREFwZTF4dUlDQWdJQ0FnSUNBZ0lDQWdjbVZ6ZFd4MElEMGdkR2hwY3k1Zll5NXNaVzVuZEdnZ0xTQnZMbDlqTG14bGJtZDBhRHRjYmlBZ0lDQWdJQ0FnZlR0Y2JpQWdJQ0FnSUNBZ1hHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCeVpYTjFiSFE3WEc0Z0lDQWdmVHNnSUNBZ1hHNTlPMXh1WEc1Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ1NXUmxiblJwWm1sbGNqdGNiaUpkZlE9PSIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIFRyaXBsZSA9IHJlcXVpcmUoJy4vdHJpcGxlLmpzJyk7XG5cbi8qKlxuICogQSBub2RlIG9mIHRoZSBMU2VxIHRyZWUuXG4gKi9cblxudmFyIExTZXFOb2RlID0gZnVuY3Rpb24gKCkge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7VHJpcGxlW119IHRyaXBsZXMgVGhlIGxpc3Qgb2YgdHJpcGxlcyBjb21wb3NpbmcgdGhlIHBhdGggdG8gdGhlXG4gICAgICogZWxlbWVudC5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZWxlbWVudCBUaGUgZWxlbWVudCB0byBpbnNlcnQgaW4gdGhlIHN0cnVjdHVyZSwgZS5nLiwgYVxuICAgICAqIGNoYXJhY3RlciBpbiBhIHRleHQgZG9jdW1lbnQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gTFNlcU5vZGUoKSB7XG4gICAgICAgIHZhciB0cmlwbGVzID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiBbXTtcbiAgICAgICAgdmFyIGVsZW1lbnQgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IG51bGw7XG5cbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIExTZXFOb2RlKTtcblxuICAgICAgICB0aGlzLnQgPSB0cmlwbGVzLnNoaWZ0KCk7XG4gICAgICAgIHRoaXMuZSA9IG51bGw7XG4gICAgICAgIGlmICh0cmlwbGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5lID0gZWxlbWVudDtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zdWJDb3VudGVyID0gdHJpcGxlcy5sZW5ndGggPiAwICYmIDEgfHwgMDtcbiAgICAgICAgdGhpcy5jaGlsZHJlbiA9IFtdO1xuICAgICAgICB0cmlwbGVzLmxlbmd0aCA+IDAgJiYgdGhpcy5jaGlsZHJlbi5wdXNoKG5ldyBMU2VxTm9kZSh0cmlwbGVzLCBlbGVtZW50KSk7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKExTZXFOb2RlLCBbe1xuICAgICAgICBrZXk6ICdjb21wYXJlVG8nLFxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbXBhcmF0b3IgYmV0d2VlbiB0byBMU2VxTm9kZXMuXG4gICAgICAgICAqIEBwYXJhbSB7TFNlcU5vZGV9IG8gVGhlIG90aGVyIExTZXFOb2RlIHRvIGNvbXBhcmUgdG8uXG4gICAgICAgICAqL1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gY29tcGFyZVRvKG8pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnQuY29tcGFyZVRvKG8udCk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2FkZCcsXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQWRkIGEgbm9kZSB0byB0aGUgY3VycmVudCBub2RlLlxuICAgICAgICAgKiBAcGFyYW0ge0xTZXFOb2RlfSBub2RlIFRoZSBub2RlIHRvIGFkZCBhcyBhIGNoaWxkcmVuIG9mIHRoaXMgbm9kZS5cbiAgICAgICAgICogQHJldHVybiB7Qm9vbGVhbn0gRmFsc2UgaWYgdGhlIGVsZW1lbnQgYWxyZWFkeSBleGlzdHMsIFRydWUgb3RoZXJ3aXNlLlxuICAgICAgICAgKi9cbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGFkZChub2RlKSB7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLl9iaW5hcnlJbmRleE9mKG5vZGUpO1xuXG4gICAgICAgICAgICAvLyAjMSBpZiB0aGUgcGF0aCBkbyBubyBleGlzdCwgY3JlYXRlIGl0XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2NvbnRhaW5zKG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5zcGxpY2UoLWluZGV4LCAwLCBub2RlKTtcbiAgICAgICAgICAgICAgICB0aGlzLnN1YkNvdW50ZXIgKz0gMTtcbiAgICAgICAgICAgICAgICAvLyAjMiBvdGhlcndpc2UsIGNvbnRpbnVlIHRvIGV4cGxvcmUgdGhlIHN1YnRyZWVzXG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5vZGUuY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8gIzJhIGNoZWNrIGlmIHRoZSBlbGVtZW50IGFscmVhZHkgZXhpc3RzXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW5baW5kZXhdLmUgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRyZW5baW5kZXhdLmUgPSBub2RlLmU7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3ViQ291bnRlciArPSAxO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgLy8gIzMgaWYgZGlkbm90IGV4aXN0LCBpbmNyZW1lbnQgdGhlIGNvdW50ZXJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5jaGlsZHJlbltpbmRleF0uYWRkKG5vZGUuY2hpbGQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdWJDb3VudGVyICs9IDE7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2RlbCcsXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVtb3ZlIHRoZSBub2RlIG9mIHRoZSB0cmVlIGFuZCBhbGwgbm9kZSB3aXRoaW4gcGF0aCBiZWluZyB1c2VsZXNzLlxuICAgICAgICAgKiBAcGFyYW0ge0xTZXFOb2RlfSBub2RlIHRoZSBub2RlIGNvbnRhaW5pbmcgdGhlIHBhdGggdG8gcmVtb3ZlXG4gICAgICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IFRydWUgaWYgdGhlIG5vZGUgaGFzIGJlZW4gcmVtb3ZlZCwgRmFsc2UgaWYgaXQgZG9lcyBub3RcbiAgICAgICAgICogZXhpc3QuXG4gICAgICAgICAqL1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZGVsKG5vZGUpIHtcbiAgICAgICAgICAgIHZhciBpbmRleGVzID0gdGhpcy5fZ2V0SW5kZXhlcyhub2RlKTtcbiAgICAgICAgICAgIHZhciBjdXJyZW50VHJlZSA9IHRoaXMsXG4gICAgICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICAgICAgaXNTcGxpdHRlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAvLyAjMSBUaGUgZWxlbWVudCBkb2VzIG5vdCBleGlzdHMsIHN0b3BcbiAgICAgICAgICAgIGlmIChpbmRleGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vICMyIENyYXdsIHRoZSBwYXRoIGFuZCByZW1vdmUgdGhlIGVsZW1lbnRcbiAgICAgICAgICAgIGN1cnJlbnRUcmVlLnN1YkNvdW50ZXIgLT0gMTtcbiAgICAgICAgICAgIHdoaWxlIChpIDwgaW5kZXhlcy5sZW5ndGggJiYgIWlzU3BsaXR0ZWQpIHtcbiAgICAgICAgICAgICAgICB2YXIgaXNMYXN0ID0gY3VycmVudFRyZWUuY2hpbGRyZW5baW5kZXhlc1tpXV0uX2hhc0VsZW1lbnQgJiYgaSA9PT0gaW5kZXhlcy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICAgIGlmICghaXNMYXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUcmVlLmNoaWxkcmVuW2luZGV4ZXNbaV1dLnN1YkNvdW50ZXIgLT0gMTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VHJlZS5jaGlsZHJlbltpbmRleGVzW2ldXS5zdWJDb3VudGVyIDw9IDAgJiYgKCFjdXJyZW50VHJlZS5jaGlsZHJlbltpbmRleGVzW2ldXS5faGFzRWxlbWVudCB8fCBpc0xhc3QpKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUcmVlLmNoaWxkcmVuLnNwbGljZShpbmRleGVzW2ldLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgaXNTcGxpdHRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBjdXJyZW50VHJlZSA9IGN1cnJlbnRUcmVlLmNoaWxkcmVuW2luZGV4ZXNbaV1dO1xuICAgICAgICAgICAgICAgICsraTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoIWlzU3BsaXR0ZWQpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50VHJlZS5lID0gbnVsbDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdpbmRleE9mJyxcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGUgb3JkZXJlZCB0cmVlIGNhbiBiZSBsaW5lYXJpemVkIGludG8gYSBzZXF1ZW5jZS4gVGhpcyBmdW5jdGlvbiBnZXQgdGhlXG4gICAgICAgICAqIGluZGV4IG9mIHRoZSBwYXRoIHJlcHJlc2VudGVkIGJ5IHRoZSBsaXN0IG9mIHRyaXBsZXMuXG4gICAgICAgICAqIEBwYXJhbSB7TFNlcU5vZGV9IG5vZGUgVGhlIG5vZGUgY29udGFpbmluZyAtLSBhdCBsZWFzdCAtLSB0aGUgcGF0aCB0byB0aGVcbiAgICAgICAgICogZWxlbWVudC5cbiAgICAgICAgICogQHJldHVybiB7TnVtYmVyfSBUaGUgaW5kZXggb2YgdGhlIG5vZGUgaW4gdGhlIGxpbmVhcml6ZWQgc2VxdWVuY2U7IC0xIGlmXG4gICAgICAgICAqIHRoZSBlbGVtZW50IGRvZXMgbm90IGV4aXN0LlxuICAgICAgICAgKi9cbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGluZGV4T2Yobm9kZSkge1xuICAgICAgICAgICAgdmFyIGluZGV4ZXMgPSB0aGlzLl9nZXRJbmRleGVzKG5vZGUpO1xuICAgICAgICAgICAgdmFyIHN1bSA9IDAsXG4gICAgICAgICAgICAgICAgY3VycmVudFRyZWUgPSB0aGlzLFxuICAgICAgICAgICAgICAgIGogPSB2b2lkIDA7XG5cbiAgICAgICAgICAgIC8vICMxIElmIHRoZSBub2RlIGRvZXMgbm90IGV4aXN0LCBzdG9wXG4gICAgICAgICAgICBpZiAoaW5kZXhlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyAjMiBPdGhlcndpc2UsIHN0YXJ0IGNvdW50aW5nXG4gICAgICAgICAgICBpZiAoY3VycmVudFRyZWUuX2hhc0VsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBzdW0gKz0gMTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaW5kZXhlcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIGlmIChpbmRleGVzW2ldIDwgY3VycmVudFRyZWUuY2hpbGRyZW4ubGVuZ3RoIC8gMikge1xuICAgICAgICAgICAgICAgICAgICAvLyAjQSBzdGFydCBmcm9tIHRoZSBiZWdpbm5pbmcgWy0tLS0+fCAgICAgXVxuICAgICAgICAgICAgICAgICAgICBqID0gMDtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGogPCBpbmRleGVzW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudFRyZWUuY2hpbGRyZW5bal0uX2hhc0VsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdW0gKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICBzdW0gKz0gY3VycmVudFRyZWUuY2hpbGRyZW5bal0uc3ViQ291bnRlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICsrajtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyAjQiBzdGFydCBmcm9tIHRoZSBlbmQgWyAgICAgfDwtLS0tXVxuICAgICAgICAgICAgICAgICAgICBzdW0gKz0gY3VycmVudFRyZWUuc3ViQ291bnRlcjtcbiAgICAgICAgICAgICAgICAgICAgaiA9IGN1cnJlbnRUcmVlLmNoaWxkcmVuLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChqID49IGluZGV4ZXNbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VHJlZS5jaGlsZHJlbltqXS5faGFzRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1bSAtPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1bSAtPSBjdXJyZW50VHJlZS5jaGlsZHJlbltqXS5zdWJDb3VudGVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgLS1qO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBqICs9IDE7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFRyZWUuY2hpbGRyZW5bal0uX2hhc0VsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3VtICs9IDE7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBjdXJyZW50VHJlZSA9IGN1cnJlbnRUcmVlLmNoaWxkcmVuW2pdO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBzdW0gLSAxOyAvLyAtMSBiZWNhdXNlIGFsZ29yaXRobSBjb3VudGVkIHRoZSBlbGVtZW50IGl0c2VsZlxuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdnZXQnLFxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBvcmRlcmVkIHRyZWUgY2FuIGJlIGxpbmVhcml6ZWQuIFRoaXMgZnVuY3Rpb24gZ2V0cyB0aGUgbm9kZSBhdCB0aGVcbiAgICAgICAgICogaW5kZXggaW4gdGhlIHByb2plY3RlZCBzZXF1ZW5jZS5cbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4IFRoZSBpbmRleCBpbiB0aGUgc2VxdWVuY2UuXG4gICAgICAgICAqIEByZXR1cm4ge0xTZXFOb2RlfSBUaGUgbm9kZSBhdCB0aGUgaW5kZXguXG4gICAgICAgICAqL1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0KGluZGV4KSB7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IGxlZnRTdW0gVGhlIHN1bSBvZiBhbGwgZWxlbWVudCBhdCB0aGUgbGVmdCBvZiB0aGVcbiAgICAgICAgICAgICAqIGN1cnJlbnQgaW5zcGVjdGVkIG5vZGUuXG4gICAgICAgICAgICAgKiBAcGFyYW0ge0xTZXFOb2RlfSBidWlsZGluZ05vZGUgVGhlIGhlYWQgcGFydCBvZiB0aGUgbm9kZSBiZWluZyBidWlsdFxuICAgICAgICAgICAgICogYXMgd2UgY3Jhd2wuXG4gICAgICAgICAgICAgKiBAcGFyYW0ge0xTZXFOb2RlfSBxdWV1ZSBUaGUgcXVldWUgcGFydCBvZiB0aGUgbm9kZSBiZWluZyBidWlsdC5cbiAgICAgICAgICAgICAqIEBwYXJhbSB7TFNlcU5vZGV9IGN1cnJlbnROb2RlIFRoZSBzdWJ0cmVlIGJlaW5nIGNyYXdsZWQuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHZhciBfZ2V0ID0gZnVuY3Rpb24gX2dldChsZWZ0U3VtLCBidWlsZGluZ05vZGUsIHF1ZXVlLCBjdXJyZW50Tm9kZSkge1xuICAgICAgICAgICAgICAgIHZhciBzdGFydEJlZ2lubmluZyA9IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHVzZUZ1bmN0aW9uID0gdm9pZCAwLFxuICAgICAgICAgICAgICAgICAgICBpID0gMCxcbiAgICAgICAgICAgICAgICAgICAgcCA9IHZvaWQgMCxcbiAgICAgICAgICAgICAgICAgICAgdGVtcCA9IHZvaWQgMDtcbiAgICAgICAgICAgICAgICAvLyAjMCBUaGUgbm9kZSBpcyBmb3VuZCwgcmV0dXJuIHRoZSBpbmNyZW1lbnRhbGx5IGJ1aWx0IG5vZGUgYW5kXG4gICAgICAgICAgICAgICAgLy8gcHJhaXNlIHRoZSBzdW4gIVxuICAgICAgICAgICAgICAgIGlmIChsZWZ0U3VtID09PSBpbmRleCAmJiBjdXJyZW50Tm9kZS5faGFzRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAvLyAxYSBjb3B5IHRoZSB2YWx1ZSBvZiB0aGUgZWxlbWVudCBpbiB0aGUgcGF0aFxuICAgICAgICAgICAgICAgICAgICBxdWV1ZS5lID0gY3VycmVudE5vZGUuZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGJ1aWxkaW5nTm9kZTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50Tm9kZS5faGFzRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICBsZWZ0U3VtICs9IDE7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIC8vICMxIHNlYXJjaDogZG8gSSBzdGFydCBmcm9tIHRoZSBiZWdpbm5pbmcgb3IgdGhlIGVuZFxuICAgICAgICAgICAgICAgIHN0YXJ0QmVnaW5uaW5nID0gaW5kZXggLSBsZWZ0U3VtIDwgY3VycmVudE5vZGUuc3ViQ291bnRlciAvIDI7XG4gICAgICAgICAgICAgICAgaWYgKHN0YXJ0QmVnaW5uaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHVzZUZ1bmN0aW9uID0gZnVuY3Rpb24gdXNlRnVuY3Rpb24oYSwgYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGEgKyBiO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxlZnRTdW0gKz0gY3VycmVudE5vZGUuc3ViQ291bnRlcjtcbiAgICAgICAgICAgICAgICAgICAgdXNlRnVuY3Rpb24gPSBmdW5jdGlvbiB1c2VGdW5jdGlvbihhLCBiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYSAtIGI7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gIzJhIGNvdW50aW5nIHRoZSBlbGVtZW50IGZyb20gbGVmdCB0byByaWdodFxuICAgICAgICAgICAgICAgIGlmICghc3RhcnRCZWdpbm5pbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgaSA9IGN1cnJlbnROb2RlLmNoaWxkcmVuLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB3aGlsZSAoc3RhcnRCZWdpbm5pbmcgJiYgbGVmdFN1bSA8PSBpbmRleCB8fCAhc3RhcnRCZWdpbm5pbmcgJiYgbGVmdFN1bSA+IGluZGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50Tm9kZS5jaGlsZHJlbltpXS5faGFzRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGVmdFN1bSA9IHVzZUZ1bmN0aW9uKGxlZnRTdW0sIDEpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBsZWZ0U3VtID0gdXNlRnVuY3Rpb24obGVmdFN1bSwgY3VycmVudE5vZGUuY2hpbGRyZW5baV0uc3ViQ291bnRlcik7XG4gICAgICAgICAgICAgICAgICAgIGkgPSB1c2VGdW5jdGlvbihpLCAxKTtcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgLy8gIzJiIGRlY3JlYXNpbmcgdGhlIGluY3JlbWVudGF0aW9uXG4gICAgICAgICAgICAgICAgaSA9IHVzZUZ1bmN0aW9uKGksIC0xKTtcbiAgICAgICAgICAgICAgICBpZiAoc3RhcnRCZWdpbm5pbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnROb2RlLmNoaWxkcmVuW2ldLl9oYXNFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0U3VtID0gdXNlRnVuY3Rpb24obGVmdFN1bSwgLTEpO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBsZWZ0U3VtID0gdXNlRnVuY3Rpb24obGVmdFN1bSwgLWN1cnJlbnROb2RlLmNoaWxkcmVuW2ldLnN1YkNvdW50ZXIpO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAvLyAjMyBidWlsZCBwYXRoXG4gICAgICAgICAgICAgICAgcCA9IFtdO3AucHVzaChjdXJyZW50Tm9kZS5jaGlsZHJlbltpXS50KTtcbiAgICAgICAgICAgICAgICBpZiAoYnVpbGRpbmdOb2RlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGJ1aWxkaW5nTm9kZSA9IG5ldyBMU2VxTm9kZShwLCBudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUgPSBidWlsZGluZ05vZGU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGVtcCA9IG5ldyBMU2VxTm9kZShwLCBudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgcXVldWUuYWRkKHRlbXApO1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IHRlbXA7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2dldChsZWZ0U3VtLCBidWlsZGluZ05vZGUsIHF1ZXVlLCBjdXJyZW50Tm9kZS5jaGlsZHJlbltpXSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIF9nZXQoMCwgbnVsbCwgbnVsbCwgdGhpcyk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ19nZXRJbmRleGVzJyxcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcHJpdmF0ZSBHZXQgdGhlIGxpc3Qgb2YgaW5kZXhlcyBvZiB0aGUgYXJyYXlzIHJlcHJlc2VudGluZyB0aGUgY2hpbGRyZW5cbiAgICAgICAgICogaW4gdGhlIHRyZWUuICBcbiAgICAgICAgICogQHBhcmFtIHtMU2VxTm9kZX0gbm9kZSBUaGUgbm9kZSBjb250YWluaW5nIHRoZSBwYXRoLlxuICAgICAgICAgKiBAcmV0dXJuIHtOdW1iZXJbXX0gVGhlIHN1Y2Nlc3NpdmUgaW5kZXhlcyB0byBnZXQgdG8gdGhlIG5vZGUuIEFuIGVtcHR5XG4gICAgICAgICAqIGxpc3QgaWYgdGhlIG5vZGUgZG9lcyBub3QgZXhpc3QuXG4gICAgICAgICAqL1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX2dldEluZGV4ZXMobm9kZSkge1xuICAgICAgICAgICAgdmFyIF9fZ2V0SW5kZXhlcyA9IGZ1bmN0aW9uIF9fZ2V0SW5kZXhlcyhpbmRleGVzLCBjdXJyZW50VHJlZSwgY3VycmVudE5vZGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWN1cnJlbnRUcmVlLl9jb250YWlucyhjdXJyZW50Tm9kZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBjdXJyZW50VHJlZS5fYmluYXJ5SW5kZXhPZihjdXJyZW50Tm9kZSk7XG5cbiAgICAgICAgICAgICAgICBpbmRleGVzLnB1c2goaW5kZXgpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIChjdXJyZW50Tm9kZS5jaGlsZHJlbi5sZW5ndGggPT09IDAgfHwgY3VycmVudFRyZWUuY2hpbGRyZW4ubGVuZ3RoID09PSAwKSAmJiBpbmRleGVzIHx8IF9fZ2V0SW5kZXhlcyhpbmRleGVzLCBjdXJyZW50VHJlZS5jaGlsZHJlbltpbmRleF0sIGN1cnJlbnROb2RlLmNoaWxkKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJldHVybiBfX2dldEluZGV4ZXMoW10sIHRoaXMsIG5vZGUpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdfYmluYXJ5SW5kZXhPZicsXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHByaXZhdGUgZnJvbTogW2h0dHBzOi8vZ2lzdC5naXRodWIuY29tL1dvbGZ5ODcvNTczNDUzMF0gUGVyZm9ybXMgYVxuICAgICAgICAgKiBiaW5hcnkgc2VhcmNoIG9uIHRoZSBob3N0IGFycmF5LlxuICAgICAgICAgKiBAcGFyYW0ge0xTZXFOb2RlfSBzZWFyY2hFbGVtZW50IFRoZSBpdGVtIHRvIHNlYXJjaCBmb3Igd2l0aGluIHRoZSBhcnJheS5cbiAgICAgICAgICogQHJldHVybiB7TnVtYmVyfSBUaGUgaW5kZXggb2YgdGhlIGVsZW1lbnQgd2hpY2ggZGVmYXVsdHMgdG8gLTEgd2hlbiBub3RcbiAgICAgICAgICogZm91bmQuXG4gICAgICAgICAqL1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX2JpbmFyeUluZGV4T2Yoc2VhcmNoRWxlbWVudCkge1xuICAgICAgICAgICAgdmFyIG1pbkluZGV4ID0gMDtcbiAgICAgICAgICAgIHZhciBtYXhJbmRleCA9IHRoaXMuY2hpbGRyZW4ubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgIHZhciBjdXJyZW50SW5kZXggPSB2b2lkIDA7XG4gICAgICAgICAgICB2YXIgY3VycmVudEVsZW1lbnQgPSB2b2lkIDA7XG5cbiAgICAgICAgICAgIHdoaWxlIChtaW5JbmRleCA8PSBtYXhJbmRleCkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRJbmRleCA9IE1hdGguZmxvb3IoKG1pbkluZGV4ICsgbWF4SW5kZXgpIC8gMik7XG4gICAgICAgICAgICAgICAgY3VycmVudEVsZW1lbnQgPSB0aGlzLmNoaWxkcmVuW2N1cnJlbnRJbmRleF07XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRFbGVtZW50LmNvbXBhcmVUbyhzZWFyY2hFbGVtZW50KSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbWluSW5kZXggPSBjdXJyZW50SW5kZXggKyAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudEVsZW1lbnQuY29tcGFyZVRvKHNlYXJjaEVsZW1lbnQpID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBtYXhJbmRleCA9IGN1cnJlbnRJbmRleCAtIDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRJbmRleDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiB+bWF4SW5kZXg7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ19jb250YWlucycsXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHByaXZhdGUgQ2hlY2sgd2hldGhlciB0aGlzIG5vZGUgY29udGFpbnMgdGhlIHNlYXJjaEVsZW1lbnQgYXMgY2hpbGRyZW4uXG4gICAgICAgICAqIEBwYXJhbSB7TFNlcU5vZGV9IHNlYXJjaEVsZW1lbnQgVGhlIGVsZW1lbnQgdG8gbG9vayBmb3IuXG4gICAgICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IFRydWUgaWYgdGhpcyBub2RlIGNvbnRhaW5zIHRoZSBub2RlIGluIGl0c1xuICAgICAgICAgKiBjaGlsZHJlbiwgRmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAgICAgKi9cbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9jb250YWlucyhzZWFyY2hFbGVtZW50KSB7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSB0aGlzLl9iaW5hcnlJbmRleE9mKHNlYXJjaEVsZW1lbnQpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMCAmJiAoaW5kZXggPiAwIHx8IGluZGV4ID09PSAwICYmIHRoaXMuY2hpbGQuY29tcGFyZVRvKHNlYXJjaEVsZW1lbnQpID09PSAwKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnY2hpbGQnLFxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldHRlciB0byB0aGUgZmlyc3QgY2hpbGQuXG4gICAgICAgICAqIEByZXR1cm5zIHtMU2VxTm9kZX0gVGhlIGZpcnN0IGNoaWxkIG9mIHRoaXMgbm9kZS4gTnVsbCBpZiBpdCBkb2VzIG5vdFxuICAgICAgICAgKiBleGlzdHMuXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDAgJiYgdGhpcy5jaGlsZHJlblswXSB8fCBudWxsO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdfaGFzRWxlbWVudCcsXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHByaXZhdGUgQ2hlY2sgaWYgdGhlIG5vZGUgY29udGFpbnMgYW4gZWxlbWVudC5cbiAgICAgICAgICogQHJldHVybiB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgbm9kZSBoYXMgYW4gZWxlbWVudCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5lICE9PSBudWxsO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdpc0xlYWYnLFxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENoZWNrIGlmIHRoZSBub2RlIGhhcyBjaGlsZHJlbi5cbiAgICAgICAgICogQHJldHVybiB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgbm9kZSBoYXMgY2hpbGRyZW4sIGZhbHNlIG90aGVyd2lzZS5cbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4ubGVuZ3RoID09PSAwO1xuICAgICAgICB9XG4gICAgfV0sIFt7XG4gICAgICAgIGtleTogJ2Zyb21KU09OJyxcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDYXN0IGEgSlNPTiBvYmplY3QgdG8gYW4gTFNlcU5vZGUuIFxuICAgICAgICAgKiBAcGFyYW0ge09iamVjdH0gbyBUaGUgSlNPTiBvYmplY3QuXG4gICAgICAgICAqIEByZXR1cm4ge0xTZXFOb2RlfSBBbiBMU2VxTm9kZS5cbiAgICAgICAgICovXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBmcm9tSlNPTihvKSB7XG4gICAgICAgICAgICB2YXIgYmVpbmdCdWlsdCA9IHZvaWQgMDtcblxuICAgICAgICAgICAgLy8gIzEgbGVhZlxuICAgICAgICAgICAgaWYgKG8uY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgYmVpbmdCdWlsdCA9IG5ldyBMU2VxTm9kZShbbmV3IFRyaXBsZShvLnQucCwgby50LnMsIG8udC5jKV0sIG8uZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vICMyIGJyYW5jaFxuICAgICAgICAgICAgICAgIGJlaW5nQnVpbHQgPSBuZXcgTFNlcU5vZGUoW25ldyBUcmlwbGUoby50LnAsIG8udC5zLCBvLnQuYyldKTtcbiAgICAgICAgICAgICAgICBiZWluZ0J1aWx0LmNoaWxkcmVuLnB1c2goTFNlcU5vZGUuZnJvbUpTT04oby5jaGlsZHJlblswXSkpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIGJlaW5nQnVpbHQ7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gTFNlcU5vZGU7XG59KCk7XG5cbjtcblxubW9kdWxlLmV4cG9ydHMgPSBMU2VxTm9kZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYklteHpaWEZ1YjJSbExtcHpJbDBzSW01aGJXVnpJanBiSWxSeWFYQnNaU0lzSW5KbGNYVnBjbVVpTENKTVUyVnhUbTlrWlNJc0luUnlhWEJzWlhNaUxDSmxiR1Z0Wlc1MElpd2lkQ0lzSW5Ob2FXWjBJaXdpWlNJc0lteGxibWQwYUNJc0luTjFZa052ZFc1MFpYSWlMQ0pqYUdsc1pISmxiaUlzSW5CMWMyZ2lMQ0p2SWl3aVkyOXRjR0Z5WlZSdklpd2libTlrWlNJc0ltbHVaR1Y0SWl3aVgySnBibUZ5ZVVsdVpHVjRUMllpTENKZlkyOXVkR0ZwYm5NaUxDSnpjR3hwWTJVaUxDSmhaR1FpTENKamFHbHNaQ0lzSW1sdVpHVjRaWE1pTENKZloyVjBTVzVrWlhobGN5SXNJbU4xY25KbGJuUlVjbVZsSWl3aWFTSXNJbWx6VTNCc2FYUjBaV1FpTENKcGMweGhjM1FpTENKZmFHRnpSV3hsYldWdWRDSXNJbk4xYlNJc0ltb2lMQ0pmWjJWMElpd2liR1ZtZEZOMWJTSXNJbUoxYVd4a2FXNW5UbTlrWlNJc0luRjFaWFZsSWl3aVkzVnljbVZ1ZEU1dlpHVWlMQ0p6ZEdGeWRFSmxaMmx1Ym1sdVp5SXNJblZ6WlVaMWJtTjBhVzl1SWl3aWNDSXNJblJsYlhBaUxDSmhJaXdpWWlJc0lsOWZaMlYwU1c1a1pYaGxjeUlzSW5ObFlYSmphRVZzWlcxbGJuUWlMQ0p0YVc1SmJtUmxlQ0lzSW0xaGVFbHVaR1Y0SWl3aVkzVnljbVZ1ZEVsdVpHVjRJaXdpWTNWeWNtVnVkRVZzWlcxbGJuUWlMQ0pOWVhSb0lpd2labXh2YjNJaUxDSmlaV2x1WjBKMWFXeDBJaXdpY3lJc0ltTWlMQ0ptY205dFNsTlBUaUlzSW0xdlpIVnNaU0lzSW1WNGNHOXlkSE1pWFN3aWJXRndjR2x1WjNNaU9pSkJRVUZCT3pzN096czdRVUZGUVN4SlFVRk5RU3hUUVVGVFF5eFJRVUZSTEdGQlFWSXNRMEZCWmpzN1FVRkZRVHM3T3p0SlFVZE5ReXhSTzBGQlEwWTdPenM3T3p0QlFVMUJMSGRDUVVFeVF6dEJRVUZCTEZsQlFUbENReXhQUVVFNFFpeDFSVUZCY0VJc1JVRkJiMEk3UVVGQlFTeFpRVUZvUWtNc1QwRkJaMElzZFVWQlFVNHNTVUZCVFRzN1FVRkJRVHM3UVVGRGRrTXNZVUZCUzBNc1EwRkJUQ3hIUVVGVFJpeFJRVUZSUnl4TFFVRlNMRVZCUVZRN1FVRkRRU3hoUVVGTFF5eERRVUZNTEVkQlFWTXNTVUZCVkR0QlFVTkJMRmxCUVVsS0xGRkJRVkZMTEUxQlFWSXNTMEZCYlVJc1EwRkJka0lzUlVGQk1FSTdRVUZCUlN4cFFrRkJTMFFzUTBGQlRDeEhRVUZUU0N4UFFVRlVPMEZCUVcxQ08wRkJReTlETEdGQlFVdExMRlZCUVV3c1IwRkJiVUpPTEZGQlFWRkxMRTFCUVZJc1IwRkJhVUlzUTBGQmFrSXNTVUZCYzBJc1EwRkJka0lzU1VGQk5rSXNRMEZCTDBNN1FVRkRRU3hoUVVGTFJTeFJRVUZNTEVkQlFXZENMRVZCUVdoQ08wRkJRMEZRTEdkQ1FVRlJTeXhOUVVGU0xFZEJRV2xDTEVOQlFXcENMRWxCUTBrc1MwRkJTMFVzVVVGQlRDeERRVUZqUXl4SlFVRmtMRU5CUVcxQ0xFbEJRVWxVTEZGQlFVb3NRMEZCWVVNc1QwRkJZaXhGUVVGelFrTXNUMEZCZEVJc1EwRkJia0lzUTBGRVNqdEJRVVZJT3pzN096czdRVUZYUkRzN096dHJRMEZKVjFFc1F5eEZRVUZITzBGQlExWXNiVUpCUVU4c1MwRkJTMUFzUTBGQlRDeERRVUZQVVN4VFFVRlFMRU5CUVdsQ1JDeEZRVUZGVUN4RFFVRnVRaXhEUVVGUU8wRkJRMGc3T3pzN08wRkJSVVE3T3pzN096UkNRVXRMVXl4SkxFVkJRVTA3UVVGRFVDeG5Ra0ZCVFVNc1VVRkJVU3hMUVVGTFF5eGpRVUZNTEVOQlFXOUNSaXhKUVVGd1FpeERRVUZrT3p0QlFVVkJPMEZCUTBFc1owSkJRVWtzUTBGQlF5eExRVUZMUnl4VFFVRk1MRU5CUVdWSUxFbEJRV1lzUTBGQlRDeEZRVUV5UWp0QlFVTjJRaXh4UWtGQlMwb3NVVUZCVEN4RFFVRmpVU3hOUVVGa0xFTkJRWEZDTEVOQlFVTklMRXRCUVhSQ0xFVkJRVFpDTEVOQlFUZENMRVZCUVdkRFJDeEpRVUZvUXp0QlFVTkJMSEZDUVVGTFRDeFZRVUZNTEVsQlFXMUNMRU5CUVc1Q08wRkJRMEU3UVVGRFNDeGhRVXBFTEUxQlNVOHNTVUZCU1Vzc1MwRkJTMG9zVVVGQlRDeERRVUZqUml4TlFVRmtMRXRCUVhsQ0xFTkJRVGRDTEVWQlFXZERPMEZCUTI1RE8wRkJRMEVzYjBKQlFVa3NTMEZCUzBVc1VVRkJUQ3hEUVVGalN5eExRVUZrTEVWQlFYRkNVaXhEUVVGeVFpeExRVUV5UWl4SlFVRXZRaXhGUVVGdlF6dEJRVU5vUXl3eVFrRkJUeXhMUVVGUU8wRkJRMGdzYVVKQlJrUXNUVUZGVHp0QlFVTklMSGxDUVVGTFJ5eFJRVUZNTEVOQlFXTkxMRXRCUVdRc1JVRkJjVUpTTEVOQlFYSkNMRWRCUVhsQ1R5eExRVUZMVUN4RFFVRTVRanRCUVVOQkxIbENRVUZMUlN4VlFVRk1MRWxCUVcxQ0xFTkJRVzVDTzBGQlEwZzdRVUZEUkR0QlFVTklMR0ZCVkUwc1RVRlRRU3hKUVVGSkxFdEJRVXRETEZGQlFVd3NRMEZCWTBzc1MwRkJaQ3hGUVVGeFFra3NSMEZCY2tJc1EwRkJlVUpNTEV0QlFVdE5MRXRCUVRsQ0xFTkJRVW9zUlVGQk1FTTdRVUZETjBNc2NVSkJRVXRZTEZWQlFVd3NTVUZCYlVJc1EwRkJia0k3UVVGRFNEdEJRVU5FTEcxQ1FVRlBMRWxCUVZBN1FVRkRTRHM3T3pzN1FVRkhSRHM3T3pzN096UkNRVTFMU3l4SkxFVkJRVTA3UVVGRFVDeG5Ra0ZCVFU4c1ZVRkJWU3hMUVVGTFF5eFhRVUZNTEVOQlFXbENVaXhKUVVGcVFpeERRVUZvUWp0QlFVTkJMR2RDUVVGSlV5eGpRVUZqTEVsQlFXeENPMEZCUVVFc1owSkJRWGRDUXl4SlFVRkpMRU5CUVRWQ08wRkJRVUVzWjBKQlFTdENReXhoUVVGaExFdEJRVFZET3p0QlFVVkJPMEZCUTBFc1owSkJRVWxLTEZGQlFWRmlMRTFCUVZJc1MwRkJiVUlzUTBGQmRrSXNSVUZCTUVJN1FVRkJSU3gxUWtGQlR5eExRVUZRTzBGQlFXVTdPMEZCUlRORE8wRkJRMEZsTEhkQ1FVRlpaQ3hWUVVGYUxFbEJRVEJDTEVOQlFURkNPMEZCUTBFc2JVSkJRVTlsTEVsQlFVbElMRkZCUVZGaUxFMUJRVm9zU1VGQmMwSXNRMEZCUldsQ0xGVkJRUzlDTEVWQlFUUkRPMEZCUTNoRExHOUNRVUZKUXl4VFFVRlRTQ3haUVVGWllpeFJRVUZhTEVOQlFYRkNWeXhSUVVGUlJ5eERRVUZTTEVOQlFYSkNMRVZCUVdsRFJ5eFhRVUZxUXl4SlFVTlVTQ3hOUVVGTlNDeFJRVUZSWWl4TlFVRlNMRWRCUVdsQ0xFTkJSRE5DTzBGQlJVRXNiMEpCUVVrc1EwRkJRMnRDTEUxQlFVd3NSVUZCWVR0QlFVTlVTQ3huUTBGQldXSXNVVUZCV2l4RFFVRnhRbGNzVVVGQlVVY3NRMEZCVWl4RFFVRnlRaXhGUVVGcFEyWXNWVUZCYWtNc1NVRkJLME1zUTBGQkwwTTdRVUZEU0R0QlFVTkVMRzlDUVVGSll5eFpRVUZaWWl4UlFVRmFMRU5CUVhGQ1Z5eFJRVUZSUnl4RFFVRlNMRU5CUVhKQ0xFVkJRV2xEWml4VlFVRnFReXhKUVVFclF5eERRVUV2UXl4TFFVTkRMRU5CUVVOakxGbEJRVmxpTEZGQlFWb3NRMEZCY1VKWExGRkJRVkZITEVOQlFWSXNRMEZCY2tJc1JVRkJhVU5ITEZkQlFXeERMRWxCUVdsRVJDeE5RVVJzUkN4RFFVRktMRVZCUXl0RU8wRkJRek5FU0N4blEwRkJXV0lzVVVGQldpeERRVUZ4UWxFc1RVRkJja0lzUTBGQk5FSkhMRkZCUVZGSExFTkJRVklzUTBGQk5VSXNSVUZCZDBNc1EwRkJlRU03UVVGRFFVTXNhVU5CUVdFc1NVRkJZanRCUVVOSU8wRkJRMFJHTERoQ1FVRmpRU3haUVVGWllpeFJRVUZhTEVOQlFYRkNWeXhSUVVGUlJ5eERRVUZTTEVOQlFYSkNMRU5CUVdRN1FVRkRRU3hyUWtGQlJVRXNRMEZCUmp0QlFVTklPMEZCUTBRc1owSkJRVWtzUTBGQlEwTXNWVUZCVEN4RlFVRm5RanRCUVVGRlJpdzBRa0ZCV1doQ0xFTkJRVm9zUjBGQlowSXNTVUZCYUVJN1FVRkJjMEk3TzBGQlJYaERMRzFDUVVGUExFbEJRVkE3UVVGRFNEczdPenM3UVVGSFJEczdPenM3T3pzN1owTkJVVk5QTEVrc1JVRkJUVHRCUVVOWUxHZENRVUZOVHl4VlFVRlZMRXRCUVV0RExGZEJRVXdzUTBGQmFVSlNMRWxCUVdwQ0xFTkJRV2hDTzBGQlEwRXNaMEpCUVVsakxFMUJRVTBzUTBGQlZqdEJRVUZCTEdkQ1FVRmhUQ3hqUVVGakxFbEJRVE5DTzBGQlFVRXNaMEpCUVdsRFRTeFZRVUZxUXpzN1FVRkZRVHRCUVVOQkxHZENRVUZKVWl4UlFVRlJZaXhOUVVGU0xFdEJRVzFDTEVOQlFYWkNMRVZCUVRCQ08wRkJRVVVzZFVKQlFVOHNRMEZCUXl4RFFVRlNPMEZCUVZrN08wRkJSWGhETzBGQlEwRXNaMEpCUVVsbExGbEJRVmxKTEZkQlFXaENMRVZCUVRaQ08wRkJRVVZETEhWQ1FVRlBMRU5CUVZBN1FVRkJWenM3UVVGRk1VTXNhVUpCUVVzc1NVRkJTVW9zU1VGQlNTeERRVUZpTEVWQlFXZENRU3hKUVVGSlNDeFJRVUZSWWl4TlFVRTFRaXhGUVVGdlF5eEZRVUZGWjBJc1EwRkJkRU1zUlVGQmVVTTdRVUZEY2tNc2IwSkJRVWxJTEZGQlFWRkhMRU5CUVZJc1NVRkJZVVFzV1VGQldXSXNVVUZCV2l4RFFVRnhRa1lzVFVGQmNrSXNSMEZCTkVJc1EwRkJOME1zUlVGQlowUTdRVUZETlVNN1FVRkRRWEZDTEhkQ1FVRkpMRU5CUVVvN1FVRkRRU3d5UWtGQlQwRXNTVUZCU1ZJc1VVRkJVVWNzUTBGQlVpeERRVUZZTEVWQlFYVkNPMEZCUTI1Q0xEUkNRVUZKUkN4WlFVRlpZaXhSUVVGYUxFTkJRWEZDYlVJc1EwRkJja0lzUlVGQmQwSkdMRmRCUVRWQ0xFVkJRWGxETzBGQlFVVkRMRzFEUVVGUExFTkJRVkE3UVVGQlZ6dEJRVU4wUkVFc0swSkJRVTlNTEZsQlFWbGlMRkZCUVZvc1EwRkJjVUp0UWl4RFFVRnlRaXhGUVVGM1FuQkNMRlZCUVM5Q08wRkJRMEVzTUVKQlFVVnZRaXhEUVVGR08wRkJRMGc3UVVGRFNpeHBRa0ZTUkN4TlFWRlBPMEZCUTBnN1FVRkRRVVFzTWtKQlFVOU1MRmxCUVZsa0xGVkJRVzVDTzBGQlEwRnZRaXgzUWtGQlNVNHNXVUZCV1dJc1VVRkJXaXhEUVVGeFFrWXNUVUZCY2tJc1IwRkJPRUlzUTBGQmJFTTdRVUZEUVN3eVFrRkJUM0ZDTEV0QlFVdFNMRkZCUVZGSExFTkJRVklzUTBGQldpeEZRVUYzUWp0QlFVTndRaXcwUWtGQlNVUXNXVUZCV1dJc1VVRkJXaXhEUVVGeFFtMUNMRU5CUVhKQ0xFVkJRWGRDUml4WFFVRTFRaXhGUVVGM1F6dEJRVUZGUXl4dFEwRkJUeXhEUVVGUU8wRkJRVmM3UVVGRGNrUkJMQ3RDUVVGUFRDeFpRVUZaWWl4UlFVRmFMRU5CUVhGQ2JVSXNRMEZCY2tJc1JVRkJkMEp3UWl4VlFVRXZRanRCUVVOQkxEQkNRVUZGYjBJc1EwRkJSanRCUVVOSU8wRkJRMFJCTEhsQ1FVRkxMRU5CUVV3N1FVRkRTRHRCUVVORUxHOUNRVUZKVGl4WlFVRlpZaXhSUVVGYUxFTkJRWEZDYlVJc1EwRkJja0lzUlVGQmQwSkdMRmRCUVRWQ0xFVkJRWGxETzBGQlFVVkRMREpDUVVGUExFTkJRVkE3UVVGQlZ6dEJRVU4wUkV3c09FSkJRV05CTEZsQlFWbGlMRkZCUVZvc1EwRkJjVUp0UWl4RFFVRnlRaXhEUVVGa08wRkJRMGc3UVVGRFJDeHRRa0ZCVDBRc1RVRkJUU3hEUVVGaUxFTkJha05YTEVOQmFVTkxPMEZCUTI1Q096czdPenRCUVVkRU96czdPenM3TkVKQlRVdGlMRXNzUlVGQlR6czdRVUZGVWpzN096czdPenM3UVVGUlFTeG5Ra0ZCVFdVc1QwRkJUeXhUUVVGUVFTeEpRVUZQTEVOQlFVTkRMRTlCUVVRc1JVRkJWVU1zV1VGQlZpeEZRVUYzUWtNc1MwRkJlRUlzUlVGQkswSkRMRmRCUVM5Q0xFVkJRU3RETzBGQlEzaEVMRzlDUVVGSlF5eHBRa0ZCYVVJc1NVRkJja0k3UVVGQlFTeHZRa0ZCTWtKRExHOUNRVUV6UWp0QlFVRkJMRzlDUVVGM1Exb3NTVUZCU1N4RFFVRTFRenRCUVVGQkxHOUNRVUVyUTJFc1ZVRkJMME03UVVGQlFTeHZRa0ZCYTBSRExHRkJRV3hFTzBGQlEwRTdRVUZEUVR0QlFVTkJMRzlDUVVGSlVDeFpRVUZaYUVJc1MwRkJXaXhKUVVGeFFtMUNMRmxCUVZsUUxGZEJRWEpETEVWQlFXdEVPMEZCUXpsRE8wRkJRMEZOTERCQ1FVRk5NVUlzUTBGQlRpeEhRVUZWTWtJc1dVRkJXVE5DTEVOQlFYUkNPMEZCUTBFc01rSkJRVTk1UWl4WlFVRlFPMEZCUTBnN1FVRkRSQ3h2UWtGQlNVVXNXVUZCV1ZBc1YwRkJhRUlzUlVGQk5FSTdRVUZCUlVrc0swSkJRVmNzUTBGQldEdEJRVUZsT3p0QlFVVTNRenRCUVVOQlNTeHBRMEZCYVVKd1FpeFJRVUZOWjBJc1QwRkJUaXhIUVVGblFrY3NXVUZCV1hwQ0xGVkJRVm9zUjBGQmRVSXNRMEZCZUVRN1FVRkRRU3h2UWtGQlNUQkNMR05CUVVvc1JVRkJiMEk3UVVGRGFFSkRMR3REUVVGakxIRkNRVUZEUnl4RFFVRkVMRVZCUVVsRExFTkJRVW83UVVGQlFTd3JRa0ZCVlVRc1NVRkJTVU1zUTBGQlpEdEJRVUZCTEhGQ1FVRmtPMEZCUTBnc2FVSkJSa1FzVFVGRlR6dEJRVU5JVkN3clFrRkJWMGNzV1VGQldYcENMRlZCUVhaQ08wRkJRMEV5UWl4clEwRkJZeXh4UWtGQlEwY3NRMEZCUkN4RlFVRkpReXhEUVVGS08wRkJRVUVzSzBKQlFWVkVMRWxCUVVsRExFTkJRV1E3UVVGQlFTeHhRa0ZCWkR0QlFVTklPenRCUVVWRU8wRkJRMEVzYjBKQlFVa3NRMEZCUTB3c1kwRkJUQ3hGUVVGeFFqdEJRVUZGV0N4M1FrRkJTVlVzV1VGQldYaENMRkZCUVZvc1EwRkJjVUpHTEUxQlFYSkNMRWRCUVRoQ0xFTkJRV3hETzBGQlFYTkRPMEZCUXpkRUxIVkNRVUZSTWtJc2EwSkJRV3RDU2l4WFFVRlhhRUlzUzBGQk9VSXNTVUZEUXl4RFFVRkRiMElzWTBGQlJDeEpRVUZ0UWtvc1ZVRkJWV2hDTEV0QlJISkRMRVZCUXpaRE8wRkJRM3BETEhkQ1FVRkpiVUlzV1VGQldYaENMRkZCUVZvc1EwRkJjVUpqTEVOQlFYSkNMRVZCUVhkQ1J5eFhRVUUxUWl4RlFVRjVRenRCUVVOeVEwa3NhME5CUVZWTExGbEJRVmxNTEU5QlFWb3NSVUZCY1VJc1EwRkJja0lzUTBGQlZqdEJRVU5JTzBGQlEwUkJMRGhDUVVGVlN5eFpRVUZaVEN4UFFVRmFMRVZCUTFsSExGbEJRVmw0UWl4UlFVRmFMRU5CUVhGQ1l5eERRVUZ5UWl4RlFVRjNRbVlzVlVGRWNFTXNRMEZCVmp0QlFVVkJaU3gzUWtGQlNWa3NXVUZCV1Zvc1EwRkJXaXhGUVVGbExFTkJRV1lzUTBGQlNqdEJRVU5JT3p0QlFVVkVPMEZCUTBGQkxHOUNRVUZKV1N4WlFVRlpXaXhEUVVGYUxFVkJRV1VzUTBGQlF5eERRVUZvUWl4RFFVRktPMEZCUTBFc2IwSkJRVWxYTEdOQlFVb3NSVUZCYjBJN1FVRkRhRUlzZDBKQlFVbEVMRmxCUVZsNFFpeFJRVUZhTEVOQlFYRkNZeXhEUVVGeVFpeEZRVUYzUWtjc1YwRkJOVUlzUlVGQmVVTTdRVUZEY2tOSkxHdERRVUZWU3l4WlFVRlpUQ3hQUVVGYUxFVkJRWEZDTEVOQlFVTXNRMEZCZEVJc1EwRkJWanRCUVVOSU8wRkJRMFJCTERoQ1FVRlZTeXhaUVVGWlRDeFBRVUZhTEVWQlExa3NRMEZCUTBjc1dVRkJXWGhDTEZGQlFWb3NRMEZCY1VKakxFTkJRWEpDTEVWQlFYZENaaXhWUVVSeVF5eERRVUZXTzBGQlJVZzdPMEZCUlVRN1FVRkRRVFJDTEc5Q1FVRkpMRVZCUVVvc1EwRkJVVUVzUlVGQlJURkNMRWxCUVVZc1EwRkJUM1ZDTEZsQlFWbDRRaXhSUVVGYUxFTkJRWEZDWXl4RFFVRnlRaXhGUVVGM1FtNUNMRU5CUVM5Q08wRkJRMUlzYjBKQlFVa3lRaXhwUWtGQmFVSXNTVUZCY2tJc1JVRkJNa0k3UVVGRGRrSkJMRzFEUVVGbExFbEJRVWs1UWl4UlFVRktMRU5CUVdGdFF5eERRVUZpTEVWQlFXZENMRWxCUVdoQ0xFTkJRV1k3UVVGRFFVb3NORUpCUVZGRUxGbEJRVkk3UVVGRFNDeHBRa0ZJUkN4TlFVZFBPMEZCUTBoTkxESkNRVUZQTEVsQlFVbHdReXhSUVVGS0xFTkJRV0Z0UXl4RFFVRmlMRVZCUVdkQ0xFbEJRV2hDTEVOQlFWQTdRVUZEUVVvc01FSkJRVTFrTEVkQlFVNHNRMEZCVlcxQ0xFbEJRVlk3UVVGRFFVd3NORUpCUVZGTExFbEJRVkk3UVVGRFNEdEJRVU5FTEhWQ1FVRlBVaXhMUVVGTFF5eFBRVUZNTEVWQlFXTkRMRmxCUVdRc1JVRkJORUpETEV0QlFUVkNMRVZCUVcxRFF5eFpRVUZaZUVJc1VVRkJXaXhEUVVGeFFtTXNRMEZCY2tJc1EwRkJia01zUTBGQlVEdEJRVU5JTEdGQmNrUkVPMEZCYzBSQkxHMUNRVUZQVFN4TFFVRkxMRU5CUVV3c1JVRkJVU3hKUVVGU0xFVkJRV01zU1VGQlpDeEZRVUZ2UWl4SlFVRndRaXhEUVVGUU8wRkJRMGc3T3pzN08wRkJjMEpFT3pzN096czdPMjlEUVU5aGFFSXNTU3hGUVVGTk8wRkJRMllzWjBKQlFVMHlRaXhsUVVGbExGTkJRV1pCTEZsQlFXVXNRMEZCUTNCQ0xFOUJRVVFzUlVGQlZVVXNWMEZCVml4RlFVRjFRbGNzVjBGQmRrSXNSVUZCZFVNN1FVRkRlRVFzYjBKQlFVa3NRMEZCUTFnc1dVRkJXVTRzVTBGQldpeERRVUZ6UW1sQ0xGZEJRWFJDTEVOQlFVd3NSVUZCZVVNN1FVRkRja01zTWtKQlFVOHNSVUZCVUR0QlFVTklPenRCUVVWRUxHOUNRVUZOYmtJc1VVRkJVVkVzV1VGQldWQXNZMEZCV2l4RFFVRXlRbXRDTEZkQlFUTkNMRU5CUVdRN08wRkJSVUZpTEhkQ1FVRlJWaXhKUVVGU0xFTkJRV0ZKTEV0QlFXSTdPMEZCUlVFc2RVSkJRVkVzUTBGQlEyMUNMRmxCUVZsNFFpeFJRVUZhTEVOQlFYRkNSaXhOUVVGeVFpeExRVUZuUXl4RFFVRm9ReXhKUVVOQlpTeFpRVUZaWWl4UlFVRmFMRU5CUVhGQ1JpeE5RVUZ5UWl4TFFVRm5ReXhEUVVScVF5eExRVU4xUTJFc1QwRkVlRU1zU1VGRlNHOUNMR0ZCUVdGd1FpeFBRVUZpTEVWQlEyRkZMRmxCUVZsaUxGRkJRVm9zUTBGQmNVSkxMRXRCUVhKQ0xFTkJSR0lzUlVGRllXMUNMRmxCUVZsa0xFdEJSbnBDTEVOQlJrbzdRVUZMU0N4aFFXUkVPenRCUVdkQ1FTeHRRa0ZCVDNGQ0xHRkJRV0VzUlVGQllpeEZRVUZwUWl4SlFVRnFRaXhGUVVGMVFqTkNMRWxCUVhaQ0xFTkJRVkE3UVVGRFNEczdPenM3UVVGTFJEczdPenM3T3p0MVEwRlBaMEkwUWl4aExFVkJRV1U3UVVGRE0wSXNaMEpCUVVsRExGZEJRVmNzUTBGQlpqdEJRVU5CTEdkQ1FVRkpReXhYUVVGWExFdEJRVXRzUXl4UlFVRk1MRU5CUVdOR0xFMUJRV1FzUjBGQmRVSXNRMEZCZEVNN1FVRkRRU3huUWtGQlNYRkRMSEZDUVVGS08wRkJRMEVzWjBKQlFVbERMSFZDUVVGS096dEJRVVZCTEcxQ1FVRlBTQ3haUVVGWlF5eFJRVUZ1UWl4RlFVRTJRanRCUVVONlFrTXNLMEpCUVdWRkxFdEJRVXRETEV0QlFVd3NRMEZCVnl4RFFVRkRUQ3hYUVVGWFF5eFJRVUZhTEVsQlFYZENMRU5CUVc1RExFTkJRV1k3UVVGRFFVVXNhVU5CUVdsQ0xFdEJRVXR3UXl4UlFVRk1MRU5CUVdOdFF5eFpRVUZrTEVOQlFXcENPMEZCUTBFc2IwSkJRVWxETEdWQlFXVnFReXhUUVVGbUxFTkJRWGxDTmtJc1lVRkJla0lzU1VGQk1FTXNRMEZCT1VNc1JVRkJhVVE3UVVGRE4wTkRMQ3RDUVVGWFJTeGxRVUZsTEVOQlFURkNPMEZCUTBnc2FVSkJSa1FzVFVGRlR5eEpRVUZKUXl4bFFVRmxha01zVTBGQlppeERRVUY1UWpaQ0xHRkJRWHBDTEVsQlFUQkRMRU5CUVRsRExFVkJRV2xFTzBGQlEzQkVSU3dyUWtGQlYwTXNaVUZCWlN4RFFVRXhRanRCUVVOSUxHbENRVVpOTEUxQlJVRTdRVUZEU0N3eVFrRkJUMEVzV1VGQlVEdEJRVU5JTzBGQlEwbzdRVUZEUkN4dFFrRkJUeXhEUVVGRFJDeFJRVUZTTzBGQlEwZzdPenM3TzBGQlJVUTdPenM3T3p0clEwRk5WMFlzWVN4RlFVRmxPMEZCUTNSQ0xHZENRVUZOTTBJc1VVRkJVU3hMUVVGTFF5eGpRVUZNTEVOQlFXOUNNRUlzWVVGQmNFSXNRMEZCWkR0QlFVTkJMRzFDUVVGUExFdEJRVXRvUXl4UlFVRk1MRU5CUVdOR0xFMUJRV1FzUjBGQmRVSXNRMEZCZGtJc1MwRkRSazhzVVVGQlVTeERRVUZTTEVsQlEwVkJMRlZCUVZVc1EwRkJXQ3hKUVVOQkxFdEJRVXRMTEV0QlFVd3NRMEZCVjFBc1UwRkJXQ3hEUVVGeFFqWkNMR0ZCUVhKQ0xFMUJRWGRETEVOQlNIWkRMRU5CUVZBN1FVRkpTRHM3T3pzN1FVRm9VMFE3T3pzN096UkNRVXRoTzBGQlExUXNiVUpCUVZNc1MwRkJTMmhETEZGQlFVd3NRMEZCWTBZc1RVRkJaQ3hIUVVGMVFpeERRVUY0UWl4SlFVRTRRaXhMUVVGTFJTeFJRVUZNTEVOQlFXTXNRMEZCWkN4RFFVRXZRaXhKUVVGdlJDeEpRVUV6UkR0QlFVTklPenM3T3p0QlFUSlNSRHM3T3pzMFFrRkpiVUk3UVVGRFppeHRRa0ZCVHl4TFFVRkxTQ3hEUVVGTUxFdEJRVmNzU1VGQmJFSTdRVUZEU0RzN096czdRVUZGUkRzN096czBRa0ZKWXp0QlFVTldMRzFDUVVGUExFdEJRVXRITEZGQlFVd3NRMEZCWTBZc1RVRkJaQ3hMUVVGNVFpeERRVUZvUXp0QlFVTklPenM3T3p0QlFYcEhSRHM3T3pzN2FVTkJTMmxDU1N4RExFVkJRVWM3UVVGRGFFSXNaMEpCUVVseFF5eHRRa0ZCU2pzN1FVRkZRVHRCUVVOQkxHZENRVUZKY2tNc1JVRkJSVVlzVVVGQlJpeERRVUZYUml4TlFVRllMRXRCUVhOQ0xFTkJRVEZDTEVWQlFUUkNPMEZCUTNoQ2VVTXNOa0pCUVdFc1NVRkJTUzlETEZGQlFVb3NRMEZCWVN4RFFVRkRMRWxCUVVsR0xFMUJRVW9zUTBGQlYxa3NSVUZCUlZBc1EwRkJSaXhEUVVGSlowTXNRMEZCWml4RlFVRnJRbnBDTEVWQlFVVlFMRU5CUVVZc1EwRkJTVFpETEVOQlFYUkNMRVZCUVhsQ2RFTXNSVUZCUlZBc1EwRkJSaXhEUVVGSk9FTXNRMEZCTjBJc1EwRkJSQ3hEUVVGaUxFVkJRV2RFZGtNc1JVRkJSVXdzUTBGQmJFUXNRMEZCWWp0QlFVTklMR0ZCUmtRc1RVRkZUenRCUVVOSU8wRkJRMEV3UXl3MlFrRkJZU3hKUVVGSkwwTXNVVUZCU2l4RFFVRmhMRU5CUVVNc1NVRkJTVVlzVFVGQlNpeERRVUZYV1N4RlFVRkZVQ3hEUVVGR0xFTkJRVWxuUXl4RFFVRm1MRVZCUVd0Q2VrSXNSVUZCUlZBc1EwRkJSaXhEUVVGSk5rTXNRMEZCZEVJc1JVRkJlVUowUXl4RlFVRkZVQ3hEUVVGR0xFTkJRVWs0UXl4RFFVRTNRaXhEUVVGRUxFTkJRV0lzUTBGQllqdEJRVU5CUml3eVFrRkJWM1pETEZGQlFWZ3NRMEZCYjBKRExFbEJRWEJDTEVOQlFYbENWQ3hUUVVGVGEwUXNVVUZCVkN4RFFVRnJRbmhETEVWQlFVVkdMRkZCUVVZc1EwRkJWeXhEUVVGWUxFTkJRV3hDTEVOQlFYcENPMEZCUTBnN08wRkJSVVFzYlVKQlFVOTFReXhWUVVGUU8wRkJRMGc3T3pzN096dEJRWGxHU2pzN1FVRkZSRWtzVDBGQlQwTXNUMEZCVUN4SFFVRnBRbkJFTEZGQlFXcENJaXdpWm1sc1pTSTZJbXh6WlhGdWIyUmxMbXB6SWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaUozVnpaU0J6ZEhKcFkzUW5PMXh1WEc1amIyNXpkQ0JVY21sd2JHVWdQU0J5WlhGMWFYSmxLQ2N1TDNSeWFYQnNaUzVxY3ljcE8xeHVYRzR2S2lwY2JpQXFJRUVnYm05a1pTQnZaaUIwYUdVZ1RGTmxjU0IwY21WbExseHVJQ292WEc1amJHRnpjeUJNVTJWeFRtOWtaU0I3WEc0Z0lDQWdMeW9xWEc0Z0lDQWdJQ29nUUhCaGNtRnRJSHRVY21sd2JHVmJYWDBnZEhKcGNHeGxjeUJVYUdVZ2JHbHpkQ0J2WmlCMGNtbHdiR1Z6SUdOdmJYQnZjMmx1WnlCMGFHVWdjR0YwYUNCMGJ5QjBhR1ZjYmlBZ0lDQWdLaUJsYkdWdFpXNTBMbHh1SUNBZ0lDQXFJRUJ3WVhKaGJTQjdUMkpxWldOMGZTQmxiR1Z0Wlc1MElGUm9aU0JsYkdWdFpXNTBJSFJ2SUdsdWMyVnlkQ0JwYmlCMGFHVWdjM1J5ZFdOMGRYSmxMQ0JsTG1jdUxDQmhYRzRnSUNBZ0lDb2dZMmhoY21GamRHVnlJR2x1SUdFZ2RHVjRkQ0JrYjJOMWJXVnVkQzVjYmlBZ0lDQWdLaTljYmlBZ0lDQmpiMjV6ZEhKMVkzUnZjaUFvZEhKcGNHeGxjeUE5SUZ0ZExDQmxiR1Z0Wlc1MElEMGdiblZzYkNrZ2UxeHVJQ0FnSUNBZ0lDQjBhR2x6TG5RZ1BTQjBjbWx3YkdWekxuTm9hV1owS0NrN1hHNGdJQ0FnSUNBZ0lIUm9hWE11WlNBOUlHNTFiR3c3WEc0Z0lDQWdJQ0FnSUdsbUlDaDBjbWx3YkdWekxteGxibWQwYUNBOVBUMGdNQ2tnZXlCMGFHbHpMbVVnUFNCbGJHVnRaVzUwT3lCOU8xeHVJQ0FnSUNBZ0lDQjBhR2x6TG5OMVlrTnZkVzUwWlhJZ1BTQW9kSEpwY0d4bGN5NXNaVzVuZEdnZ1BpQXdJQ1ltSURFcElIeDhJREE3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVZMmhwYkdSeVpXNGdQU0JiWFR0Y2JpQWdJQ0FnSUNBZ2RISnBjR3hsY3k1c1pXNW5kR2dnUGlBd0lDWW1YRzRnSUNBZ0lDQWdJQ0FnSUNCMGFHbHpMbU5vYVd4a2NtVnVMbkIxYzJnb2JtVjNJRXhUWlhGT2IyUmxLSFJ5YVhCc1pYTXNJR1ZzWlcxbGJuUXBLVHRjYmlBZ0lDQjlPMXh1SUNBZ0lGeHVJQ0FnSUM4cUtseHVJQ0FnSUNBcUlFZGxkSFJsY2lCMGJ5QjBhR1VnWm1seWMzUWdZMmhwYkdRdVhHNGdJQ0FnSUNvZ1FISmxkSFZ5Ym5NZ2UweFRaWEZPYjJSbGZTQlVhR1VnWm1seWMzUWdZMmhwYkdRZ2IyWWdkR2hwY3lCdWIyUmxMaUJPZFd4c0lHbG1JR2wwSUdSdlpYTWdibTkwWEc0Z0lDQWdJQ29nWlhocGMzUnpMbHh1SUNBZ0lDQXFMMXh1SUNBZ0lHZGxkQ0JqYUdsc1pDQW9LU0I3WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUFvS0hSb2FYTXVZMmhwYkdSeVpXNHViR1Z1WjNSb0lENGdNQ2tnSmlZZ2RHaHBjeTVqYUdsc1pISmxibHN3WFNrZ2ZId2diblZzYkR0Y2JpQWdJQ0I5TzF4dVhHNGdJQ0FnTHlvcVhHNGdJQ0FnSUNvZ1EyOXRjR0Z5WVhSdmNpQmlaWFIzWldWdUlIUnZJRXhUWlhGT2IyUmxjeTVjYmlBZ0lDQWdLaUJBY0dGeVlXMGdlMHhUWlhGT2IyUmxmU0J2SUZSb1pTQnZkR2hsY2lCTVUyVnhUbTlrWlNCMGJ5QmpiMjF3WVhKbElIUnZMbHh1SUNBZ0lDQXFMMXh1SUNBZ0lHTnZiWEJoY21WVWJ5QW9ieWtnZTF4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnZEdocGN5NTBMbU52YlhCaGNtVlVieWh2TG5RcE8xeHVJQ0FnSUgwN1hHNGdJQ0FnWEc0Z0lDQWdMeW9xWEc0Z0lDQWdJQ29nUVdSa0lHRWdibTlrWlNCMGJ5QjBhR1VnWTNWeWNtVnVkQ0J1YjJSbExseHVJQ0FnSUNBcUlFQndZWEpoYlNCN1RGTmxjVTV2WkdWOUlHNXZaR1VnVkdobElHNXZaR1VnZEc4Z1lXUmtJR0Z6SUdFZ1kyaHBiR1J5Wlc0Z2IyWWdkR2hwY3lCdWIyUmxMbHh1SUNBZ0lDQXFJRUJ5WlhSMWNtNGdlMEp2YjJ4bFlXNTlJRVpoYkhObElHbG1JSFJvWlNCbGJHVnRaVzUwSUdGc2NtVmhaSGtnWlhocGMzUnpMQ0JVY25WbElHOTBhR1Z5ZDJselpTNWNiaUFnSUNBZ0tpOWNiaUFnSUNCaFpHUWdLRzV2WkdVcElIdGNiaUFnSUNBZ0lDQWdZMjl1YzNRZ2FXNWtaWGdnUFNCMGFHbHpMbDlpYVc1aGNubEpibVJsZUU5bUtHNXZaR1VwTzF4dUlDQWdJQ0FnSUNCY2JpQWdJQ0FnSUNBZ0x5OGdJekVnYVdZZ2RHaGxJSEJoZEdnZ1pHOGdibThnWlhocGMzUXNJR055WldGMFpTQnBkRnh1SUNBZ0lDQWdJQ0JwWmlBb0lYUm9hWE11WDJOdmJuUmhhVzV6S0c1dlpHVXBLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjBhR2x6TG1Ob2FXeGtjbVZ1TG5Od2JHbGpaU2d0YVc1a1pYZ3NJREFzSUc1dlpHVXBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2RHaHBjeTV6ZFdKRGIzVnVkR1Z5SUNzOUlERTdYRzRnSUNBZ0lDQWdJQ0FnSUNBdkx5QWpNaUJ2ZEdobGNuZHBjMlVzSUdOdmJuUnBiblZsSUhSdklHVjRjR3h2Y21VZ2RHaGxJSE4xWW5SeVpXVnpYRzRnSUNBZ0lDQWdJSDBnWld4elpTQnBaaUFvYm05a1pTNWphR2xzWkhKbGJpNXNaVzVuZEdnZ1BUMDlJREFwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQzh2SUNNeVlTQmphR1ZqYXlCcFppQjBhR1VnWld4bGJXVnVkQ0JoYkhKbFlXUjVJR1Y0YVhOMGMxeHVJQ0FnSUNBZ0lDQWdJQ0FnYVdZZ0tIUm9hWE11WTJocGJHUnlaVzViYVc1a1pYaGRMbVVnSVQwOUlHNTFiR3dwZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJtWVd4elpUdGNiaUFnSUNBZ0lDQWdJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZEdocGN5NWphR2xzWkhKbGJsdHBibVJsZUYwdVpTQTlJRzV2WkdVdVpUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjBhR2x6TG5OMVlrTnZkVzUwWlhJZ0t6MGdNVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMDdYRzRnSUNBZ0lDQWdJQ0FnSUNBdkx5QWpNeUJwWmlCa2FXUnViM1FnWlhocGMzUXNJR2x1WTNKbGJXVnVkQ0IwYUdVZ1kyOTFiblJsY2x4dUlDQWdJQ0FnSUNCOUlHVnNjMlVnYVdZZ0tIUm9hWE11WTJocGJHUnlaVzViYVc1a1pYaGRMbUZrWkNodWIyUmxMbU5vYVd4a0tTa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2RHaHBjeTV6ZFdKRGIzVnVkR1Z5SUNzOUlERTdYRzRnSUNBZ0lDQWdJSDA3WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUIwY25WbE8xeHVJQ0FnSUgwN1hHNWNibHh1SUNBZ0lDOHFLbHh1SUNBZ0lDQXFJRkpsYlc5MlpTQjBhR1VnYm05a1pTQnZaaUIwYUdVZ2RISmxaU0JoYm1RZ1lXeHNJRzV2WkdVZ2QybDBhR2x1SUhCaGRHZ2dZbVZwYm1jZ2RYTmxiR1Z6Y3k1Y2JpQWdJQ0FnS2lCQWNHRnlZVzBnZTB4VFpYRk9iMlJsZlNCdWIyUmxJSFJvWlNCdWIyUmxJR052Ym5SaGFXNXBibWNnZEdobElIQmhkR2dnZEc4Z2NtVnRiM1psWEc0Z0lDQWdJQ29nUUhKbGRIVnliaUI3UW05dmJHVmhibjBnVkhKMVpTQnBaaUIwYUdVZ2JtOWtaU0JvWVhNZ1ltVmxiaUJ5WlcxdmRtVmtMQ0JHWVd4elpTQnBaaUJwZENCa2IyVnpJRzV2ZEZ4dUlDQWdJQ0FxSUdWNGFYTjBMbHh1SUNBZ0lDQXFMMXh1SUNBZ0lHUmxiQ0FvYm05a1pTa2dlMXh1SUNBZ0lDQWdJQ0JqYjI1emRDQnBibVJsZUdWeklEMGdkR2hwY3k1ZloyVjBTVzVrWlhobGN5aHViMlJsS1R0Y2JpQWdJQ0FnSUNBZ2JHVjBJR04xY25KbGJuUlVjbVZsSUQwZ2RHaHBjeXdnYVNBOUlEQXNJR2x6VTNCc2FYUjBaV1FnUFNCbVlXeHpaVHRjYmx4dUlDQWdJQ0FnSUNBdkx5QWpNU0JVYUdVZ1pXeGxiV1Z1ZENCa2IyVnpJRzV2ZENCbGVHbHpkSE1zSUhOMGIzQmNiaUFnSUNBZ0lDQWdhV1lnS0dsdVpHVjRaWE11YkdWdVozUm9JRDA5UFNBd0tTQjdJSEpsZEhWeWJpQm1ZV3h6WlRzZ2ZUdGNibHh1SUNBZ0lDQWdJQ0F2THlBak1pQkRjbUYzYkNCMGFHVWdjR0YwYUNCaGJtUWdjbVZ0YjNabElIUm9aU0JsYkdWdFpXNTBYRzRnSUNBZ0lDQWdJR04xY25KbGJuUlVjbVZsTG5OMVlrTnZkVzUwWlhJZ0xUMGdNVHRjYmlBZ0lDQWdJQ0FnZDJocGJHVWdLR2tnUENCcGJtUmxlR1Z6TG14bGJtZDBhQ0FtSmlBaEtHbHpVM0JzYVhSMFpXUXBLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnNaWFFnYVhOTVlYTjBJRDBnWTNWeWNtVnVkRlJ5WldVdVkyaHBiR1J5Wlc1YmFXNWtaWGhsYzF0cFhWMHVYMmhoYzBWc1pXMWxiblFnSmlaY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCcElEMDlQU0JwYm1SbGVHVnpMbXhsYm1kMGFDQXRJREU3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnBaaUFvSVdselRHRnpkQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdOMWNuSmxiblJVY21WbExtTm9hV3hrY21WdVcybHVaR1Y0WlhOYmFWMWRMbk4xWWtOdmRXNTBaWElnTFQwZ01Uc2dJQ0FnSUZ4dUlDQWdJQ0FnSUNBZ0lDQWdmVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2hqZFhKeVpXNTBWSEpsWlM1amFHbHNaSEpsYmx0cGJtUmxlR1Z6VzJsZFhTNXpkV0pEYjNWdWRHVnlJRHc5SURBZ0ppWmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQW9JV04xY25KbGJuUlVjbVZsTG1Ob2FXeGtjbVZ1VzJsdVpHVjRaWE5iYVYxZExsOW9ZWE5GYkdWdFpXNTBJSHg4SUdselRHRnpkQ2twSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCamRYSnlaVzUwVkhKbFpTNWphR2xzWkhKbGJpNXpjR3hwWTJVb2FXNWtaWGhsYzF0cFhTd2dNU2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYVhOVGNHeHBkSFJsWkNBOUlIUnlkV1U3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjlPMXh1SUNBZ0lDQWdJQ0FnSUNBZ1kzVnljbVZ1ZEZSeVpXVWdQU0JqZFhKeVpXNTBWSEpsWlM1amFHbHNaSEpsYmx0cGJtUmxlR1Z6VzJsZFhUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNzcmFUdGNiaUFnSUNBZ0lDQWdmVHRjYmlBZ0lDQWdJQ0FnYVdZZ0tDRnBjMU53YkdsMGRHVmtLWHNnWTNWeWNtVnVkRlJ5WldVdVpTQTlJRzUxYkd3N2ZUdGNibHh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdkSEoxWlR0Y2JpQWdJQ0I5TzF4dVhHNWNiaUFnSUNBdktpcGNiaUFnSUNBZ0tpQlVhR1VnYjNKa1pYSmxaQ0IwY21WbElHTmhiaUJpWlNCc2FXNWxZWEpwZW1Wa0lHbHVkRzhnWVNCelpYRjFaVzVqWlM0Z1ZHaHBjeUJtZFc1amRHbHZiaUJuWlhRZ2RHaGxYRzRnSUNBZ0lDb2dhVzVrWlhnZ2IyWWdkR2hsSUhCaGRHZ2djbVZ3Y21WelpXNTBaV1FnWW5rZ2RHaGxJR3hwYzNRZ2IyWWdkSEpwY0d4bGN5NWNiaUFnSUNBZ0tpQkFjR0Z5WVcwZ2UweFRaWEZPYjJSbGZTQnViMlJsSUZSb1pTQnViMlJsSUdOdmJuUmhhVzVwYm1jZ0xTMGdZWFFnYkdWaGMzUWdMUzBnZEdobElIQmhkR2dnZEc4Z2RHaGxYRzRnSUNBZ0lDb2daV3hsYldWdWRDNWNiaUFnSUNBZ0tpQkFjbVYwZFhKdUlIdE9kVzFpWlhKOUlGUm9aU0JwYm1SbGVDQnZaaUIwYUdVZ2JtOWtaU0JwYmlCMGFHVWdiR2x1WldGeWFYcGxaQ0J6WlhGMVpXNWpaVHNnTFRFZ2FXWmNiaUFnSUNBZ0tpQjBhR1VnWld4bGJXVnVkQ0JrYjJWeklHNXZkQ0JsZUdsemRDNWNiaUFnSUNBZ0tpOWNiaUFnSUNCcGJtUmxlRTltSUNodWIyUmxLU0I3WEc0Z0lDQWdJQ0FnSUdOdmJuTjBJR2x1WkdWNFpYTWdQU0IwYUdsekxsOW5aWFJKYm1SbGVHVnpLRzV2WkdVcE8xeHVJQ0FnSUNBZ0lDQnNaWFFnYzNWdElEMGdNQ3dnWTNWeWNtVnVkRlJ5WldVZ1BTQjBhR2x6TENCcU8xeHVJQ0FnSUNBZ0lDQmNiaUFnSUNBZ0lDQWdMeThnSXpFZ1NXWWdkR2hsSUc1dlpHVWdaRzlsY3lCdWIzUWdaWGhwYzNRc0lITjBiM0JjYmlBZ0lDQWdJQ0FnYVdZZ0tHbHVaR1Y0WlhNdWJHVnVaM1JvSUQwOVBTQXdLU0I3SUhKbGRIVnliaUF0TVRzZ2ZUdGNibHh1SUNBZ0lDQWdJQ0F2THlBak1pQlBkR2hsY25kcGMyVXNJSE4wWVhKMElHTnZkVzUwYVc1blhHNGdJQ0FnSUNBZ0lHbG1JQ2hqZFhKeVpXNTBWSEpsWlM1ZmFHRnpSV3hsYldWdWRDa2dleUJ6ZFcwZ0t6MGdNVHNnZlR0Y2JpQWdJQ0FnSUNBZ1hHNGdJQ0FnSUNBZ0lHWnZjaUFvYkdWMElHa2dQU0F3T3lCcElEd2dhVzVrWlhobGN5NXNaVzVuZEdnN0lDc3JhU2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdhV1lnS0dsdVpHVjRaWE5iYVYwZ1BDQmpkWEp5Wlc1MFZISmxaUzVqYUdsc1pISmxiaTVzWlc1bmRHZ3ZNaWtnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUM4dklDTkJJSE4wWVhKMElHWnliMjBnZEdobElHSmxaMmx1Ym1sdVp5QmJMUzB0TFQ1OElDQWdJQ0JkWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYWlBOUlEQTdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkMmhwYkdVZ0tHb2dQQ0JwYm1SbGVHVnpXMmxkS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR2xtSUNoamRYSnlaVzUwVkhKbFpTNWphR2xzWkhKbGJsdHFYUzVmYUdGelJXeGxiV1Z1ZENrZ2V5QnpkVzBnS3owZ01Uc2dmVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2MzVnRJQ3M5SUdOMWNuSmxiblJVY21WbExtTm9hV3hrY21WdVcycGRMbk4xWWtOdmRXNTBaWEk3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDc3JhanRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5TzF4dUlDQWdJQ0FnSUNBZ0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQXZMeUFqUWlCemRHRnlkQ0JtY205dElIUm9aU0JsYm1RZ1d5QWdJQ0FnZkR3dExTMHRYVnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSE4xYlNBclBTQmpkWEp5Wlc1MFZISmxaUzV6ZFdKRGIzVnVkR1Z5TzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdvZ1BTQmpkWEp5Wlc1MFZISmxaUzVqYUdsc1pISmxiaTVzWlc1bmRHZ2dMU0F4TzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhkb2FXeGxJQ2hxSUQ0OUlHbHVaR1Y0WlhOYmFWMHBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLR04xY25KbGJuUlVjbVZsTG1Ob2FXeGtjbVZ1VzJwZExsOW9ZWE5GYkdWdFpXNTBLWHNnYzNWdElDMDlJREU3SUgwN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSE4xYlNBdFBTQmpkWEp5Wlc1MFZISmxaUzVqYUdsc1pISmxibHRxWFM1emRXSkRiM1Z1ZEdWeU8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0F0TFdvN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2ZUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnFJQ3M5SURFN1hHNGdJQ0FnSUNBZ0lDQWdJQ0I5TzF4dUlDQWdJQ0FnSUNBZ0lDQWdhV1lnS0dOMWNuSmxiblJVY21WbExtTm9hV3hrY21WdVcycGRMbDlvWVhORmJHVnRaVzUwS1NCN0lITjFiU0FyUFNBeE95QjlPMXh1SUNBZ0lDQWdJQ0FnSUNBZ1kzVnljbVZ1ZEZSeVpXVWdQU0JqZFhKeVpXNTBWSEpsWlM1amFHbHNaSEpsYmx0cVhUdGNiaUFnSUNBZ0lDQWdmVHRjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJSE4xYlNBdElERTdJQzh2SUMweElHSmxZMkYxYzJVZ1lXeG5iM0pwZEdodElHTnZkVzUwWldRZ2RHaGxJR1ZzWlcxbGJuUWdhWFJ6Wld4bVhHNGdJQ0FnZlR0Y2JseHVYRzRnSUNBZ0x5b3FYRzRnSUNBZ0lDb2dWR2hsSUc5eVpHVnlaV1FnZEhKbFpTQmpZVzRnWW1VZ2JHbHVaV0Z5YVhwbFpDNGdWR2hwY3lCbWRXNWpkR2x2YmlCblpYUnpJSFJvWlNCdWIyUmxJR0YwSUhSb1pWeHVJQ0FnSUNBcUlHbHVaR1Y0SUdsdUlIUm9aU0J3Y205cVpXTjBaV1FnYzJWeGRXVnVZMlV1WEc0Z0lDQWdJQ29nUUhCaGNtRnRJSHRPZFcxaVpYSjlJR2x1WkdWNElGUm9aU0JwYm1SbGVDQnBiaUIwYUdVZ2MyVnhkV1Z1WTJVdVhHNGdJQ0FnSUNvZ1FISmxkSFZ5YmlCN1RGTmxjVTV2WkdWOUlGUm9aU0J1YjJSbElHRjBJSFJvWlNCcGJtUmxlQzVjYmlBZ0lDQWdLaTljYmlBZ0lDQm5aWFFnS0dsdVpHVjRLU0I3WEc1Y2JpQWdJQ0FnSUNBZ0x5b3FYRzRnSUNBZ0lDQWdJQ0FxSUVCd1lYSmhiU0I3VG5WdFltVnlmU0JzWldaMFUzVnRJRlJvWlNCemRXMGdiMllnWVd4c0lHVnNaVzFsYm5RZ1lYUWdkR2hsSUd4bFpuUWdiMllnZEdobFhHNGdJQ0FnSUNBZ0lDQXFJR04xY25KbGJuUWdhVzV6Y0dWamRHVmtJRzV2WkdVdVhHNGdJQ0FnSUNBZ0lDQXFJRUJ3WVhKaGJTQjdURk5sY1U1dlpHVjlJR0oxYVd4a2FXNW5UbTlrWlNCVWFHVWdhR1ZoWkNCd1lYSjBJRzltSUhSb1pTQnViMlJsSUdKbGFXNW5JR0oxYVd4MFhHNGdJQ0FnSUNBZ0lDQXFJR0Z6SUhkbElHTnlZWGRzTGx4dUlDQWdJQ0FnSUNBZ0tpQkFjR0Z5WVcwZ2UweFRaWEZPYjJSbGZTQnhkV1YxWlNCVWFHVWdjWFZsZFdVZ2NHRnlkQ0J2WmlCMGFHVWdibTlrWlNCaVpXbHVaeUJpZFdsc2RDNWNiaUFnSUNBZ0lDQWdJQ29nUUhCaGNtRnRJSHRNVTJWeFRtOWtaWDBnWTNWeWNtVnVkRTV2WkdVZ1ZHaGxJSE4xWW5SeVpXVWdZbVZwYm1jZ1kzSmhkMnhsWkM1Y2JpQWdJQ0FnSUNBZ0lDb3ZYRzRnSUNBZ0lDQWdJR052Ym5OMElGOW5aWFFnUFNBb2JHVm1kRk4xYlN3Z1luVnBiR1JwYm1kT2IyUmxMQ0J4ZFdWMVpTd2dZM1Z5Y21WdWRFNXZaR1VwSUQwK0lIdGNiaUFnSUNBZ0lDQWdJQ0FnSUd4bGRDQnpkR0Z5ZEVKbFoybHVibWx1WnlBOUlIUnlkV1VzSUhWelpVWjFibU4wYVc5dUxDQnBJRDBnTUN3Z2NDd2dkR1Z0Y0R0Y2JpQWdJQ0FnSUNBZ0lDQWdJQzh2SUNNd0lGUm9aU0J1YjJSbElHbHpJR1p2ZFc1a0xDQnlaWFIxY200Z2RHaGxJR2x1WTNKbGJXVnVkR0ZzYkhrZ1luVnBiSFFnYm05a1pTQmhibVJjYmlBZ0lDQWdJQ0FnSUNBZ0lDOHZJSEJ5WVdselpTQjBhR1VnYzNWdUlDRmNiaUFnSUNBZ0lDQWdJQ0FnSUdsbUlDaHNaV1owVTNWdElEMDlQU0JwYm1SbGVDQW1KaUJqZFhKeVpXNTBUbTlrWlM1ZmFHRnpSV3hsYldWdWRDa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQzh2SURGaElHTnZjSGtnZEdobElIWmhiSFZsSUc5bUlIUm9aU0JsYkdWdFpXNTBJR2x1SUhSb1pTQndZWFJvWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnY1hWbGRXVXVaU0E5SUdOMWNuSmxiblJPYjJSbExtVTdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlHSjFhV3hrYVc1blRtOWtaVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMDdYRzRnSUNBZ0lDQWdJQ0FnSUNCcFppQW9ZM1Z5Y21WdWRFNXZaR1V1WDJoaGMwVnNaVzFsYm5RcGV5QnNaV1owVTNWdElDczlJREU3SUgwN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JjYmlBZ0lDQWdJQ0FnSUNBZ0lDOHZJQ014SUhObFlYSmphRG9nWkc4Z1NTQnpkR0Z5ZENCbWNtOXRJSFJvWlNCaVpXZHBibTVwYm1jZ2IzSWdkR2hsSUdWdVpGeHVJQ0FnSUNBZ0lDQWdJQ0FnYzNSaGNuUkNaV2RwYm01cGJtY2dQU0JwYm1SbGVDMXNaV1owVTNWdElEd2dZM1Z5Y21WdWRFNXZaR1V1YzNWaVEyOTFiblJsY2k4eU8xeHVJQ0FnSUNBZ0lDQWdJQ0FnYVdZZ0tITjBZWEowUW1WbmFXNXVhVzVuS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RYTmxSblZ1WTNScGIyNGdQU0FvWVN3Z1lpa2dQVDRnWVNBcklHSTdYRzRnSUNBZ0lDQWdJQ0FnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUd4bFpuUlRkVzBnS3owZ1kzVnljbVZ1ZEU1dlpHVXVjM1ZpUTI5MWJuUmxjanRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IxYzJWR2RXNWpkR2x2YmlBOUlDaGhMQ0JpS1NBOVBpQmhJQzBnWWp0Y2JpQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnSUNBZ0lGeHVJQ0FnSUNBZ0lDQWdJQ0FnTHk4Z0l6SmhJR052ZFc1MGFXNW5JSFJvWlNCbGJHVnRaVzUwSUdaeWIyMGdiR1ZtZENCMGJ5QnlhV2RvZEZ4dUlDQWdJQ0FnSUNBZ0lDQWdhV1lnS0NGemRHRnlkRUpsWjJsdWJtbHVaeWtnZXlCcElEMGdZM1Z5Y21WdWRFNXZaR1V1WTJocGJHUnlaVzR1YkdWdVozUm9JQzBnTVRzZ2ZUdGNiaUFnSUNBZ0lDQWdJQ0FnSUhkb2FXeGxJQ2dvYzNSaGNuUkNaV2RwYm01cGJtY2dKaVlnYkdWbWRGTjFiU0E4UFNCcGJtUmxlQ2tnZkh4Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQW9JWE4wWVhKMFFtVm5hVzV1YVc1bklDWW1JR3hsWm5SVGRXMGdQaUJwYm1SbGVDa3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb1kzVnljbVZ1ZEU1dlpHVXVZMmhwYkdSeVpXNWJhVjB1WDJoaGMwVnNaVzFsYm5RcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYkdWbWRGTjFiU0E5SUhWelpVWjFibU4wYVc5dUtHeGxablJUZFcwc0lERXBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDA3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYkdWbWRGTjFiU0E5SUhWelpVWjFibU4wYVc5dUtHeGxablJUZFcwc1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR04xY25KbGJuUk9iMlJsTG1Ob2FXeGtjbVZ1VzJsZExuTjFZa052ZFc1MFpYSXBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR2tnUFNCMWMyVkdkVzVqZEdsdmJpaHBMQ0F4S1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJSDA3WEc0Z0lDQWdJQ0FnSUNBZ0lDQmNiaUFnSUNBZ0lDQWdJQ0FnSUM4dklDTXlZaUJrWldOeVpXRnphVzVuSUhSb1pTQnBibU55WlcxbGJuUmhkR2x2Ymx4dUlDQWdJQ0FnSUNBZ0lDQWdhU0E5SUhWelpVWjFibU4wYVc5dUtHa3NJQzB4S1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJR2xtSUNoemRHRnlkRUpsWjJsdWJtbHVaeWtnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdsbUlDaGpkWEp5Wlc1MFRtOWtaUzVqYUdsc1pISmxibHRwWFM1ZmFHRnpSV3hsYldWdWRDa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCc1pXWjBVM1Z0SUQwZ2RYTmxSblZ1WTNScGIyNG9iR1ZtZEZOMWJTd2dMVEVwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUgwN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2JHVm1kRk4xYlNBOUlIVnpaVVoxYm1OMGFXOXVLR3hsWm5SVGRXMHNYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUMxamRYSnlaVzUwVG05a1pTNWphR2xzWkhKbGJsdHBYUzV6ZFdKRGIzVnVkR1Z5S1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJSDA3WEc0Z0lDQWdJQ0FnSUNBZ0lDQmNiaUFnSUNBZ0lDQWdJQ0FnSUM4dklDTXpJR0oxYVd4a0lIQmhkR2hjYmlBZ0lDQWdJQ0FnSUNBZ0lIQWdQU0JiWFRzZ2NDNXdkWE5vS0dOMWNuSmxiblJPYjJSbExtTm9hV3hrY21WdVcybGRMblFwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdhV1lnS0dKMWFXeGthVzVuVG05a1pTQTlQVDBnYm5Wc2JDa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR0oxYVd4a2FXNW5UbTlrWlNBOUlHNWxkeUJNVTJWeFRtOWtaU2h3TENCdWRXeHNLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J4ZFdWMVpTQTlJR0oxYVd4a2FXNW5UbTlrWlR0Y2JpQWdJQ0FnSUNBZ0lDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkR1Z0Y0NBOUlHNWxkeUJNVTJWeFRtOWtaU2h3TENCdWRXeHNLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J4ZFdWMVpTNWhaR1FvZEdWdGNDazdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdjWFZsZFdVZ1BTQjBaVzF3TzF4dUlDQWdJQ0FnSUNBZ0lDQWdmVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCZloyVjBLR3hsWm5SVGRXMHNJR0oxYVd4a2FXNW5UbTlrWlN3Z2NYVmxkV1VzSUdOMWNuSmxiblJPYjJSbExtTm9hV3hrY21WdVcybGRLVHRjYmlBZ0lDQWdJQ0FnZlR0Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUY5blpYUW9NQ3dnYm5Wc2JDd2diblZzYkN3Z2RHaHBjeWs3WEc0Z0lDQWdmVHRjYmx4dUlDQWdJQzhxS2x4dUlDQWdJQ0FxSUVOaGMzUWdZU0JLVTA5T0lHOWlhbVZqZENCMGJ5QmhiaUJNVTJWeFRtOWtaUzRnWEc0Z0lDQWdJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJRzhnVkdobElFcFRUMDRnYjJKcVpXTjBMbHh1SUNBZ0lDQXFJRUJ5WlhSMWNtNGdlMHhUWlhGT2IyUmxmU0JCYmlCTVUyVnhUbTlrWlM1Y2JpQWdJQ0FnS2k5Y2JpQWdJQ0J6ZEdGMGFXTWdabkp2YlVwVFQwNGdLRzhwSUh0Y2JpQWdJQ0FnSUNBZ2JHVjBJR0psYVc1blFuVnBiSFE3WEc1Y2JpQWdJQ0FnSUNBZ0x5OGdJekVnYkdWaFpseHVJQ0FnSUNBZ0lDQnBaaUFvYnk1amFHbHNaSEpsYmk1c1pXNW5kR2dnUFQwOUlEQXBlMXh1SUNBZ0lDQWdJQ0FnSUNBZ1ltVnBibWRDZFdsc2RDQTlJRzVsZHlCTVUyVnhUbTlrWlNoYmJtVjNJRlJ5YVhCc1pTaHZMblF1Y0N3Z2J5NTBMbk1zSUc4dWRDNWpLVjBzSUc4dVpTazdYRzRnSUNBZ0lDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBdkx5QWpNaUJpY21GdVkyaGNiaUFnSUNBZ0lDQWdJQ0FnSUdKbGFXNW5RblZwYkhRZ1BTQnVaWGNnVEZObGNVNXZaR1VvVzI1bGR5QlVjbWx3YkdVb2J5NTBMbkFzSUc4dWRDNXpMQ0J2TG5RdVl5bGRLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHSmxhVzVuUW5WcGJIUXVZMmhwYkdSeVpXNHVjSFZ6YUNoTVUyVnhUbTlrWlM1bWNtOXRTbE5QVGlodkxtTm9hV3hrY21WdVd6QmRLU2s3WEc0Z0lDQWdJQ0FnSUgwN1hHNGdJQ0FnSUNBZ0lGeHVJQ0FnSUNBZ0lDQnlaWFIxY200Z1ltVnBibWRDZFdsc2REdGNiaUFnSUNCOU8xeHVJQ0FnSUZ4dUlDQWdJQzhxS2x4dUlDQWdJQ0FxSUVCd2NtbDJZWFJsSUVkbGRDQjBhR1VnYkdsemRDQnZaaUJwYm1SbGVHVnpJRzltSUhSb1pTQmhjbkpoZVhNZ2NtVndjbVZ6Wlc1MGFXNW5JSFJvWlNCamFHbHNaSEpsYmx4dUlDQWdJQ0FxSUdsdUlIUm9aU0IwY21WbExpQWdYRzRnSUNBZ0lDb2dRSEJoY21GdElIdE1VMlZ4VG05a1pYMGdibTlrWlNCVWFHVWdibTlrWlNCamIyNTBZV2x1YVc1bklIUm9aU0J3WVhSb0xseHVJQ0FnSUNBcUlFQnlaWFIxY200Z2UwNTFiV0psY2x0ZGZTQlVhR1VnYzNWalkyVnpjMmwyWlNCcGJtUmxlR1Z6SUhSdklHZGxkQ0IwYnlCMGFHVWdibTlrWlM0Z1FXNGdaVzF3ZEhsY2JpQWdJQ0FnS2lCc2FYTjBJR2xtSUhSb1pTQnViMlJsSUdSdlpYTWdibTkwSUdWNGFYTjBMbHh1SUNBZ0lDQXFMMXh1SUNBZ0lGOW5aWFJKYm1SbGVHVnpJQ2h1YjJSbEtTQjdYRzRnSUNBZ0lDQWdJR052Ym5OMElGOWZaMlYwU1c1a1pYaGxjeUE5SUNocGJtUmxlR1Z6TENCamRYSnlaVzUwVkhKbFpTd2dZM1Z5Y21WdWRFNXZaR1VwSUQwK0lIdGNiaUFnSUNBZ0lDQWdJQ0FnSUdsbUlDZ2hZM1Z5Y21WdWRGUnlaV1V1WDJOdmJuUmhhVzV6S0dOMWNuSmxiblJPYjJSbEtTa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQmJYVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMDdYRzRnSUNBZ0lDQWdJQ0FnSUNCY2JpQWdJQ0FnSUNBZ0lDQWdJR052Ym5OMElHbHVaR1Y0SUQwZ1kzVnljbVZ1ZEZSeVpXVXVYMkpwYm1GeWVVbHVaR1Y0VDJZb1kzVnljbVZ1ZEU1dlpHVXBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ1hHNGdJQ0FnSUNBZ0lDQWdJQ0JwYm1SbGVHVnpMbkIxYzJnb2FXNWtaWGdwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdYRzRnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnS0NoamRYSnlaVzUwVG05a1pTNWphR2xzWkhKbGJpNXNaVzVuZEdnZ1BUMDlJREFnZkh4Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR04xY25KbGJuUlVjbVZsTG1Ob2FXeGtjbVZ1TG14bGJtZDBhQ0E5UFQwZ01Da2dKaVlnYVc1a1pYaGxjeWtnZkh4Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCZlgyZGxkRWx1WkdWNFpYTW9hVzVrWlhobGN5eGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWTNWeWNtVnVkRlJ5WldVdVkyaHBiR1J5Wlc1YmFXNWtaWGhkTEZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmpkWEp5Wlc1MFRtOWtaUzVqYUdsc1pDazdJQ0FnSUNBZ0lDQWdJQ0FnWEc0Z0lDQWdJQ0FnSUgwN1hHNGdJQ0FnSUNBZ0lGeHVJQ0FnSUNBZ0lDQnlaWFIxY200Z1gxOW5aWFJKYm1SbGVHVnpLRnRkTENCMGFHbHpMQ0J1YjJSbEtUdGNiaUFnSUNCOU8xeHVJQ0FnSUZ4dUlDQWdJRnh1WEc1Y2JpQWdJQ0F2S2lwY2JpQWdJQ0FnS2lCQWNISnBkbUYwWlNCbWNtOXRPaUJiYUhSMGNITTZMeTluYVhOMExtZHBkR2gxWWk1amIyMHZWMjlzWm5rNE55ODFOek0wTlRNd1hTQlFaWEptYjNKdGN5QmhYRzRnSUNBZ0lDb2dZbWx1WVhKNUlITmxZWEpqYUNCdmJpQjBhR1VnYUc5emRDQmhjbkpoZVM1Y2JpQWdJQ0FnS2lCQWNHRnlZVzBnZTB4VFpYRk9iMlJsZlNCelpXRnlZMmhGYkdWdFpXNTBJRlJvWlNCcGRHVnRJSFJ2SUhObFlYSmphQ0JtYjNJZ2QybDBhR2x1SUhSb1pTQmhjbkpoZVM1Y2JpQWdJQ0FnS2lCQWNtVjBkWEp1SUh0T2RXMWlaWEo5SUZSb1pTQnBibVJsZUNCdlppQjBhR1VnWld4bGJXVnVkQ0IzYUdsamFDQmtaV1poZFd4MGN5QjBieUF0TVNCM2FHVnVJRzV2ZEZ4dUlDQWdJQ0FxSUdadmRXNWtMbHh1SUNBZ0lDQXFMMXh1SUNBZ0lGOWlhVzVoY25sSmJtUmxlRTltSUNoelpXRnlZMmhGYkdWdFpXNTBLU0I3WEc0Z0lDQWdJQ0FnSUd4bGRDQnRhVzVKYm1SbGVDQTlJREE3WEc0Z0lDQWdJQ0FnSUd4bGRDQnRZWGhKYm1SbGVDQTlJSFJvYVhNdVkyaHBiR1J5Wlc0dWJHVnVaM1JvSUMwZ01UdGNiaUFnSUNBZ0lDQWdiR1YwSUdOMWNuSmxiblJKYm1SbGVEdGNiaUFnSUNBZ0lDQWdiR1YwSUdOMWNuSmxiblJGYkdWdFpXNTBPMXh1SUNBZ0lDQWdJQ0JjYmlBZ0lDQWdJQ0FnZDJocGJHVWdLRzFwYmtsdVpHVjRJRHc5SUcxaGVFbHVaR1Y0S1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JqZFhKeVpXNTBTVzVrWlhnZ1BTQk5ZWFJvTG1ac2IyOXlLQ2h0YVc1SmJtUmxlQ0FySUcxaGVFbHVaR1Y0S1NBdklESXBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ1kzVnljbVZ1ZEVWc1pXMWxiblFnUFNCMGFHbHpMbU5vYVd4a2NtVnVXMk4xY25KbGJuUkpibVJsZUYwN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb1kzVnljbVZ1ZEVWc1pXMWxiblF1WTI5dGNHRnlaVlJ2S0hObFlYSmphRVZzWlcxbGJuUXBJRHdnTUNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHMXBia2x1WkdWNElEMGdZM1Z5Y21WdWRFbHVaR1Y0SUNzZ01UdGNiaUFnSUNBZ0lDQWdJQ0FnSUgwZ1pXeHpaU0JwWmlBb1kzVnljbVZ1ZEVWc1pXMWxiblF1WTI5dGNHRnlaVlJ2S0hObFlYSmphRVZzWlcxbGJuUXBJRDRnTUNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHMWhlRWx1WkdWNElEMGdZM1Z5Y21WdWRFbHVaR1Y0SUMwZ01UdGNiaUFnSUNBZ0lDQWdJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJR04xY25KbGJuUkpibVJsZUR0Y2JpQWdJQ0FnSUNBZ0lDQWdJSDA3WEc0Z0lDQWdJQ0FnSUgwN1hHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCK2JXRjRTVzVrWlhnN1hHNGdJQ0FnZlR0Y2JseHVJQ0FnSUM4cUtseHVJQ0FnSUNBcUlFQndjbWwyWVhSbElFTm9aV05ySUhkb1pYUm9aWElnZEdocGN5QnViMlJsSUdOdmJuUmhhVzV6SUhSb1pTQnpaV0Z5WTJoRmJHVnRaVzUwSUdGeklHTm9hV3hrY21WdUxseHVJQ0FnSUNBcUlFQndZWEpoYlNCN1RGTmxjVTV2WkdWOUlITmxZWEpqYUVWc1pXMWxiblFnVkdobElHVnNaVzFsYm5RZ2RHOGdiRzl2YXlCbWIzSXVYRzRnSUNBZ0lDb2dRSEpsZEhWeWJpQjdRbTl2YkdWaGJuMGdWSEoxWlNCcFppQjBhR2x6SUc1dlpHVWdZMjl1ZEdGcGJuTWdkR2hsSUc1dlpHVWdhVzRnYVhSelhHNGdJQ0FnSUNvZ1kyaHBiR1J5Wlc0c0lFWmhiSE5sSUc5MGFHVnlkMmx6WlM1Y2JpQWdJQ0FnS2k5Y2JpQWdJQ0JmWTI5dWRHRnBibk1nS0hObFlYSmphRVZzWlcxbGJuUXBJSHRjYmlBZ0lDQWdJQ0FnWTI5dWMzUWdhVzVrWlhnZ1BTQjBhR2x6TGw5aWFXNWhjbmxKYm1SbGVFOW1LSE5sWVhKamFFVnNaVzFsYm5RcE8xeHVJQ0FnSUNBZ0lDQnlaWFIxY200Z2RHaHBjeTVqYUdsc1pISmxiaTVzWlc1bmRHZ2dQaUF3SUNZbVhHNGdJQ0FnSUNBZ0lDQWdJQ0FvYVc1a1pYZ2dQaUF3SUh4OFhHNGdJQ0FnSUNBZ0lDQWdJQ0FnS0NocGJtUmxlQ0E5UFQwZ01Da2dKaVpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdkR2hwY3k1amFHbHNaQzVqYjIxd1lYSmxWRzhvYzJWaGNtTm9SV3hsYldWdWRDa2dQVDA5SURBcEtUdGNiaUFnSUNCOU8xeHVYRzRnSUNBZ0x5b3FYRzRnSUNBZ0lDb2dRSEJ5YVhaaGRHVWdRMmhsWTJzZ2FXWWdkR2hsSUc1dlpHVWdZMjl1ZEdGcGJuTWdZVzRnWld4bGJXVnVkQzVjYmlBZ0lDQWdLaUJBY21WMGRYSnVJSHRDYjI5c1pXRnVmU0JVY25WbElHbG1JSFJvWlNCdWIyUmxJR2hoY3lCaGJpQmxiR1Z0Wlc1MExDQm1ZV3h6WlNCdmRHaGxjbmRwYzJVdVhHNGdJQ0FnSUNvdlhHNGdJQ0FnWjJWMElGOW9ZWE5GYkdWdFpXNTBJQ2dwSUh0Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUhSb2FYTXVaU0FoUFQwZ2JuVnNiRHRjYmlBZ0lDQjlPMXh1WEc0Z0lDQWdMeW9xWEc0Z0lDQWdJQ29nUTJobFkyc2dhV1lnZEdobElHNXZaR1VnYUdGeklHTm9hV3hrY21WdUxseHVJQ0FnSUNBcUlFQnlaWFIxY200Z2UwSnZiMnhsWVc1OUlGUnlkV1VnYVdZZ2RHaGxJRzV2WkdVZ2FHRnpJR05vYVd4a2NtVnVMQ0JtWVd4elpTQnZkR2hsY25kcGMyVXVYRzRnSUNBZ0lDb3ZYRzRnSUNBZ1oyVjBJR2x6VEdWaFppQW9LU0I3WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUIwYUdsekxtTm9hV3hrY21WdUxteGxibWQwYUNBOVBUMGdNRHRjYmlBZ0lDQjlPMXh1SUNBZ0lGeHVmVHRjYmx4dWJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCTVUyVnhUbTlrWlR0Y2JseHVJbDE5IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgQkkgPSByZXF1aXJlKCdCaWdJbnQnKTtcbnZhciBJZGVudGlmaWVyID0gcmVxdWlyZSgnLi9pZGVudGlmaWVyLmpzJyk7XG5cbi8qKlxuICogRW51bWVyYXRlIHRoZSBhdmFpbGFibGUgc3ViLWFsbG9jYXRpb24gc3RyYXRlZ2llcy4gVGhlIHNpZ25hdHVyZSBvZiB0aGVzZVxuICogZnVuY3Rpb25zIGlzIGYoSWQsIElkLCBOKywgTissIE4sIE4pOiBJZC5cbiAqL1xuXG52YXIgU3RyYXRlZ3kgPSBmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtCYXNlfSBiYXNlIFRoZSBiYXNlIHVzZWQgdG8gY3JlYXRlIHRoZSBuZXcgaWRlbnRpZmllcnMuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtib3VuZGFyeSA9IDEwXSBUaGUgdmFsdWUgdXNlZCBhcyB0aGUgZGVmYXVsdCBtYXhpbXVtXG4gICAgICogc3BhY2luZyBiZXR3ZWVuIGlkZW50aWZpZXJzLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFN0cmF0ZWd5KGJhc2UpIHtcbiAgICAgICAgdmFyIGJvdW5kYXJ5ID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiAxMDtcblxuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgU3RyYXRlZ3kpO1xuXG4gICAgICAgIHRoaXMuX2Jhc2UgPSBiYXNlO1xuICAgICAgICB0aGlzLl9ib3VuZGFyeSA9IGJvdW5kYXJ5O1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhTdHJhdGVneSwgW3tcbiAgICAgICAga2V5OiAnYlBsdXMnLFxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENob29zZSBhbiBpZGVudGlmaWVyIHN0YXJ0aW5nIGZyb20gcHJldmlvdXMgYm91bmQgYW5kIGFkZGluZyByYW5kb21cbiAgICAgICAgICogbnVtYmVyLlxuICAgICAgICAgKiBAcGFyYW0ge0xTZXFOb2RlfSBwIFRoZSBwcmV2aW91cyBpZGVudGlmaWVyLlxuICAgICAgICAgKiBAcGFyYW0ge0xTZXFOb2RlfSBxIFRoZSBuZXh0IGlkZW50aWZpZXIuXG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBsZXZlbCBUaGUgbnVtYmVyIG9mIGNvbmNhdGVuYXRpb24gY29tcG9zaW5nIHRoZSBuZXdcbiAgICAgICAgICogaWRlbnRpZmllci5cbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IGludGVydmFsIFRoZSBpbnRlcnZhbCBiZXR3ZWVuIHAgYW5kIHEuXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzIFRoZSBzb3VyY2UgdGhhdCBjcmVhdGVzIHRoZSBuZXcgaWRlbnRpZmllci5cbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IGMgVGhlIGNvdW50ZXIgb2YgdGhhdCBzb3VyY2UuXG4gICAgICAgICAqIEByZXR1cm4ge0lkZW50aWZpZXJ9IFRoZSBuZXcgYWxsb2NhdGVkIGlkZW50aWZpZXIuXG4gICAgICAgICAqL1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gYlBsdXMocCwgcSwgbGV2ZWwsIGludGVydmFsLCBzLCBjKSB7XG4gICAgICAgICAgICB2YXIgY29weVAgPSBwLFxuICAgICAgICAgICAgICAgIGNvcHlRID0gcSxcbiAgICAgICAgICAgICAgICBzdGVwID0gTWF0aC5taW4odGhpcy5fYm91bmRhcnksIGludGVydmFsKSxcbiAgICAgICAgICAgICAgICAvLyMwIHRoZSBtaW4gaW50ZXJ2YWxcbiAgICAgICAgICAgIGRpZ2l0ID0gQkkuaW50MmJpZ0ludCgwLCB0aGlzLl9iYXNlLmdldFN1bUJpdChsZXZlbCkpLFxuICAgICAgICAgICAgICAgIHZhbHVlID0gdm9pZCAwO1xuXG4gICAgICAgICAgICAvLyAjMSBjb3B5IHRoZSBwcmV2aW91cyBpZGVudGlmaWVyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8PSBsZXZlbDsgKytpKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSBwICYmIHAudC5wIHx8IDA7XG4gICAgICAgICAgICAgICAgQkkuYWRkSW50XyhkaWdpdCwgdmFsdWUpO1xuICAgICAgICAgICAgICAgIGlmIChpICE9PSBsZXZlbCkge1xuICAgICAgICAgICAgICAgICAgICBCSS5sZWZ0U2hpZnRfKGRpZ2l0LCB0aGlzLl9iYXNlLmdldEJpdEJhc2UoaSArIDEpKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHAgPSBwICYmICFwLmlzTGVhZiAmJiBwLmNoaWxkIHx8IG51bGw7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLy8gIzIgY3JlYXRlIGEgZGlnaXQgZm9yIGFuIGlkZW50aWZpZXIgYnkgYWRkaW5nIGEgcmFuZG9tIHZhbHVlXG4gICAgICAgICAgICAvLyAjQSBEaWdpdFxuICAgICAgICAgICAgQkkuYWRkSW50XyhkaWdpdCwgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogc3RlcCArIDEpKTtcbiAgICAgICAgICAgIC8vICNCIFNvdXJjZSAmIGNvdW50ZXJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9nZXRTQyhkaWdpdCwgY29weVAsIGNvcHlRLCBsZXZlbCwgcywgYyk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2JNaW51cycsXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2hvb3NlIGFuIGlkZW50aWZpZXIgc3RhcnRpbmcgZnJvbSBuZXh0IGJvdW5kIGFuZCBzdWJzdHJhY3QgYSByYW5kb21cbiAgICAgICAgICogbnVtYmVyLlxuICAgICAgICAgKiBAcGFyYW0ge0xTZXFOb2RlfSBwIFRoZSBwcmV2aW91cyBpZGVudGlmaWVyLlxuICAgICAgICAgKiBAcGFyYW0ge0xTZXFOb2RlfSBxIFRoZSBuZXh0IGlkZW50aWZpZXIuXG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBsZXZlbCBUaGUgbnVtYmVyIG9mIGNvbmNhdGVuYXRpb24gY29tcG9zaW5nIHRoZSBuZXdcbiAgICAgICAgICogaWRlbnRpZmllci5cbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IGludGVydmFsIFRoZSBpbnRlcnZhbCBiZXR3ZWVuIHAgYW5kIHEuXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzIFRoZSBzb3VyY2UgdGhhdCBjcmVhdGVzIHRoZSBuZXcgaWRlbnRpZmllci5cbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IGMgVGhlIGNvdW50ZXIgb2YgdGhhdCBzb3VyY2UuXG4gICAgICAgICAqL1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gYk1pbnVzKHAsIHEsIGxldmVsLCBpbnRlcnZhbCwgcywgYykge1xuICAgICAgICAgICAgdmFyIGNvcHlQID0gcCxcbiAgICAgICAgICAgICAgICBjb3B5USA9IHEsXG4gICAgICAgICAgICAgICAgc3RlcCA9IE1hdGgubWluKHRoaXMuX2JvdW5kYXJ5LCBpbnRlcnZhbCksXG4gICAgICAgICAgICAgICAgLy8gIzAgcHJvY2VzcyBtaW4gaW50ZXJ2YWxcbiAgICAgICAgICAgIGRpZ2l0ID0gQkkuaW50MmJpZ0ludCgwLCB0aGlzLl9iYXNlLmdldFN1bUJpdChsZXZlbCkpLFxuICAgICAgICAgICAgICAgIHBJc0dyZWF0ZXIgPSBmYWxzZSxcbiAgICAgICAgICAgICAgICBjb21tb25Sb290ID0gdHJ1ZSxcbiAgICAgICAgICAgICAgICBwcmV2VmFsdWUgPSB2b2lkIDAsXG4gICAgICAgICAgICAgICAgbmV4dFZhbHVlID0gdm9pZCAwO1xuXG4gICAgICAgICAgICAvLyAjMSBjb3B5IG5leHQsIGlmIHByZXZpb3VzIGlzIGdyZWF0ZXIsIGNvcHkgbWF4VmFsdWUgQCBkZXB0aFxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPD0gbGV2ZWw7ICsraSkge1xuICAgICAgICAgICAgICAgIHByZXZWYWx1ZSA9IHAgJiYgcC50LnAgfHwgMDtcbiAgICAgICAgICAgICAgICBuZXh0VmFsdWUgPSBxICYmIHEudC5wIHx8IDA7XG5cbiAgICAgICAgICAgICAgICBpZiAoY29tbW9uUm9vdCAmJiBwcmV2VmFsdWUgIT09IG5leHRWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBjb21tb25Sb290ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHBJc0dyZWF0ZXIgPSBwcmV2VmFsdWUgPiBuZXh0VmFsdWU7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBpZiAocElzR3JlYXRlcikge1xuICAgICAgICAgICAgICAgICAgICBuZXh0VmFsdWUgPSBNYXRoLnBvdygyLCB0aGlzLl9iYXNlLmdldEJpdEJhc2UoaSkpIC0gMTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIEJJLmFkZEludF8oZGlnaXQsIG5leHRWYWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKGkgIT09IGxldmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIEJJLmxlZnRTaGlmdF8oZGlnaXQsIHRoaXMuX2Jhc2UuZ2V0Qml0QmFzZShpICsgMSkpO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBxID0gcSAmJiAhcS5pc0xlYWYgJiYgcS5jaGlsZCB8fCBudWxsO1xuICAgICAgICAgICAgICAgIHAgPSBwICYmICFwLmlzTGVhZiAmJiBwLmNoaWxkIHx8IG51bGw7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyAjMyBjcmVhdGUgYSBkaWdpdCBmb3IgYW4gaWRlbnRpZmllciBieSBzdWJpbmcgYSByYW5kb20gdmFsdWVcbiAgICAgICAgICAgIC8vICNBIERpZ2l0XG4gICAgICAgICAgICBpZiAocElzR3JlYXRlcikge1xuICAgICAgICAgICAgICAgIEJJLmFkZEludF8oZGlnaXQsIC1NYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBzdGVwKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIEJJLmFkZEludF8oZGlnaXQsIC1NYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBzdGVwKSAtIDEpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gI0IgU291cmNlICYgY291bnRlclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldFNDKGRpZ2l0LCBjb3B5UCwgY29weVEsIGxldmVsLCBzLCBjKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnX2dldFNDJyxcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb3BpZXMgdGhlIGFwcHJvcHJpYXRlcyBzb3VyY2UgYW5kIGNvdW50ZXIgZnJvbSB0aGUgYWRqYWNlbnQgaWRlbnRpZmllcnNcbiAgICAgICAgICogYXQgdGhlIGluc2VydGlvbiBwb3NpdGlvbi5cbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IGQgVGhlIGRpZ2l0IHBhcnQgb2YgdGhlIG5ldyBpZGVudGlmaWVyLlxuICAgICAgICAgKiBAcGFyYW0ge0xTZXFOb2RlfSBwIFRoZSBwcmV2aW91cyBpZGVudGlmaWVyLlxuICAgICAgICAgKiBAcGFyYW0ge0xTZXFOb2RlfSBxIHRoZSBuZXh0IGlkZW50aWZpZXIuXG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBsZXZlbCBUaGUgc2l6ZSBvZiB0aGUgbmV3IGlkZW50aWZpZXIuXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzIFRoZSBsb2NhbCBzaXRlIGlkZW50aWZpZXIuXG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBjIFRoZSBsb2NhbCBtb25vdG9uaWMgY291bnRlci5cbiAgICAgICAgICogQHJldHVybiB7SWRlbnRpZmllcn0gVGhlIG5ldyBhbGxvY2F0ZWQgaWRlbnRpZmllci5cbiAgICAgICAgICovXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfZ2V0U0MoZCwgcCwgcSwgbGV2ZWwsIHMsIGMpIHtcbiAgICAgICAgICAgIHZhciBzb3VyY2VzID0gW10sXG4gICAgICAgICAgICAgICAgY291bnRlcnMgPSBbXSxcbiAgICAgICAgICAgICAgICBpID0gMCxcbiAgICAgICAgICAgICAgICBzdW1CaXQgPSB0aGlzLl9iYXNlLmdldFN1bUJpdChsZXZlbCksXG4gICAgICAgICAgICAgICAgdGVtcERpZ2l0ID0gdm9pZCAwLFxuICAgICAgICAgICAgICAgIHZhbHVlID0gdm9pZCAwO1xuXG4gICAgICAgICAgICB3aGlsZSAoaSA8PSBsZXZlbCkge1xuICAgICAgICAgICAgICAgIHRlbXBEaWdpdCA9IEJJLmR1cChkKTtcbiAgICAgICAgICAgICAgICBCSS5yaWdodFNoaWZ0Xyh0ZW1wRGlnaXQsIHN1bUJpdCAtIHRoaXMuX2Jhc2UuZ2V0U3VtQml0KGkpKTtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IEJJLm1vZEludCh0ZW1wRGlnaXQsIE1hdGgucG93KDIsIHRoaXMuX2Jhc2UuZ2V0Qml0QmFzZShpKSkpO1xuICAgICAgICAgICAgICAgIHNvdXJjZXNbaV0gPSBzO1xuICAgICAgICAgICAgICAgIGNvdW50ZXJzW2ldID0gYztcblxuICAgICAgICAgICAgICAgIGlmIChxICYmIHEudC5wID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBzb3VyY2VzW2ldID0gcS50LnM7Y291bnRlcnNbaV0gPSBxLnQuYztcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGlmIChwICYmIHAudC5wID09PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBzb3VyY2VzW2ldID0gcC50LnM7Y291bnRlcnNbaV0gPSBwLnQuYztcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgcSA9IHEgJiYgIXEuaXNMZWFmICYmIHEuY2hpbGQgfHwgbnVsbDtcbiAgICAgICAgICAgICAgICBwID0gcCAmJiAhcC5pc0xlYWYgJiYgcC5jaGlsZCB8fCBudWxsO1xuXG4gICAgICAgICAgICAgICAgKytpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBJZGVudGlmaWVyKHRoaXMuX2Jhc2UsIGQsIHNvdXJjZXMsIGNvdW50ZXJzKTtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBTdHJhdGVneTtcbn0oKTtcblxuO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0cmF0ZWd5O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW5OMGNtRjBaV2Q1TG1weklsMHNJbTVoYldWeklqcGJJa0pKSWl3aWNtVnhkV2x5WlNJc0lrbGtaVzUwYVdacFpYSWlMQ0pUZEhKaGRHVm5lU0lzSW1KaGMyVWlMQ0ppYjNWdVpHRnllU0lzSWw5aVlYTmxJaXdpWDJKdmRXNWtZWEo1SWl3aWNDSXNJbkVpTENKc1pYWmxiQ0lzSW1sdWRHVnlkbUZzSWl3aWN5SXNJbU1pTENKamIzQjVVQ0lzSW1OdmNIbFJJaXdpYzNSbGNDSXNJazFoZEdnaUxDSnRhVzRpTENKa2FXZHBkQ0lzSW1sdWRESmlhV2RKYm5RaUxDSm5aWFJUZFcxQ2FYUWlMQ0oyWVd4MVpTSXNJbWtpTENKMElpd2lZV1JrU1c1MFh5SXNJbXhsWm5SVGFHbG1kRjhpTENKblpYUkNhWFJDWVhObElpd2lhWE5NWldGbUlpd2lZMmhwYkdRaUxDSm1iRzl2Y2lJc0luSmhibVJ2YlNJc0lsOW5aWFJUUXlJc0luQkpjMGR5WldGMFpYSWlMQ0pqYjIxdGIyNVNiMjkwSWl3aWNISmxkbFpoYkhWbElpd2libVY0ZEZaaGJIVmxJaXdpY0c5M0lpd2laQ0lzSW5OdmRYSmpaWE1pTENKamIzVnVkR1Z5Y3lJc0luTjFiVUpwZENJc0luUmxiWEJFYVdkcGRDSXNJbVIxY0NJc0luSnBaMmgwVTJocFpuUmZJaXdpYlc5a1NXNTBJaXdpYlc5a2RXeGxJaXdpWlhod2IzSjBjeUpkTENKdFlYQndhVzVuY3lJNklrRkJRVUU3T3pzN096dEJRVVZCTEVsQlFVMUJMRXRCUVV0RExGRkJRVkVzVVVGQlVpeERRVUZZTzBGQlEwRXNTVUZCVFVNc1lVRkJZVVFzVVVGQlVTeHBRa0ZCVWl4RFFVRnVRanM3UVVGRlFUczdPenM3U1VGSlRVVXNVVHRCUVVOR096czdPenRCUVV0QkxITkNRVUZoUXl4SlFVRmlMRVZCUVd0RE8wRkJRVUVzV1VGQlprTXNVVUZCWlN4MVJVRkJTaXhGUVVGSk96dEJRVUZCT3p0QlFVTTVRaXhoUVVGTFF5eExRVUZNTEVkQlFXRkdMRWxCUVdJN1FVRkRRU3hoUVVGTFJ5eFRRVUZNTEVkQlFXbENSaXhSUVVGcVFqdEJRVU5JT3pzN096czdRVUZGUkRzN096czdPenM3T3pzN096aENRVmxQUnl4RExFVkJRVWRETEVNc1JVRkJSME1zU3l4RlFVRlBReXhSTEVWQlFWVkRMRU1zUlVGQlIwTXNReXhGUVVGSE8wRkJRMmhETEdkQ1FVRkpReXhSUVVGUlRpeERRVUZhTzBGQlFVRXNaMEpCUVdWUExGRkJRVkZPTEVOQlFYWkNPMEZCUVVFc1owSkJRMGxQTEU5QlFVOURMRXRCUVV0RExFZEJRVXdzUTBGQlV5eExRVUZMV0N4VFFVRmtMRVZCUVhsQ1NTeFJRVUY2UWl4RFFVUllPMEZCUVVFc1owSkJReXRETzBGQlF6TkRVU3h2UWtGQlVXNUNMRWRCUVVkdlFpeFZRVUZJTEVOQlFXTXNRMEZCWkN4RlFVRnBRaXhMUVVGTFpDeExRVUZNTEVOQlFWZGxMRk5CUVZnc1EwRkJjVUpZTEV0QlFYSkNMRU5CUVdwQ0xFTkJSbG83UVVGQlFTeG5Ra0ZIU1Zrc1kwRklTanM3UVVGTFFUdEJRVU5CTEdsQ1FVRkxMRWxCUVVsRExFbEJRVWtzUTBGQllpeEZRVUZuUWtFc1MwRkJTMklzUzBGQmNrSXNSVUZCTkVJc1JVRkJSV0VzUTBGQk9VSXNSVUZCYVVNN1FVRkRjRU5FTEhkQ1FVRlRaQ3hMUVVGTFFTeEZRVUZGWjBJc1EwRkJSaXhEUVVGSmFFSXNRMEZCVml4SlFVRm5RaXhEUVVGNFFqdEJRVU5QVWl4dFFrRkJSM2xDTEU5QlFVZ3NRMEZCVjA0c1MwRkJXQ3hGUVVGclFrY3NTMEZCYkVJN1FVRkRRU3h2UWtGQlNVTXNUVUZCVFdJc1MwRkJWaXhGUVVGcFFqdEJRVU5pVml4MVFrRkJSekJDTEZWQlFVZ3NRMEZCWTFBc1MwRkJaQ3hGUVVGeFFpeExRVUZMWWl4TFFVRk1MRU5CUVZkeFFpeFZRVUZZTEVOQlFYTkNTaXhKUVVGSkxFTkJRVEZDTEVOQlFYSkNPMEZCUTBnN1FVRkRSR1lzYjBKQlFVdEJMRXRCUVVzc1EwRkJRMEVzUlVGQlJXOUNMRTFCUVZJc1NVRkJhMEp3UWl4RlFVRkZjVUlzUzBGQmNrSXNTVUZCSzBJc1NVRkJia003UVVGRFNEdEJRVU5FTzBGQlEwRTdRVUZEUVRkQ0xHVkJRVWQ1UWl4UFFVRklMRU5CUVZkT0xFdEJRVmdzUlVGQmEwSkdMRXRCUVV0aExFdEJRVXdzUTBGQlYySXNTMEZCUzJNc1RVRkJUQ3hMUVVGblFtWXNTVUZCYUVJc1IwRkJkVUlzUTBGQmJFTXNRMEZCYkVJN1FVRkRRVHRCUVVOQkxHMUNRVUZQTEV0QlFVdG5RaXhOUVVGTUxFTkJRVmxpTEV0QlFWb3NSVUZCYlVKTUxFdEJRVzVDTEVWQlFUQkNReXhMUVVFeFFpeEZRVUZwUTB3c1MwRkJha01zUlVGQmQwTkZMRU5CUVhoRExFVkJRVEpEUXl4RFFVRXpReXhEUVVGUU8wRkJRMGc3T3pzN08wRkJTVVE3T3pzN096czdPenM3T3l0Q1FWZFJUQ3hETEVWQlFVZERMRU1zUlVGQlIwTXNTeXhGUVVGUFF5eFJMRVZCUVZWRExFTXNSVUZCUjBNc1F5eEZRVUZITzBGQlEycERMR2RDUVVGSlF5eFJRVUZSVGl4RFFVRmFPMEZCUVVFc1owSkJRV1ZQTEZGQlFWRk9MRU5CUVhaQ08wRkJRVUVzWjBKQlEwbFBMRTlCUVU5RExFdEJRVXRETEVkQlFVd3NRMEZCVXl4TFFVRkxXQ3hUUVVGa0xFVkJRWGxDU1N4UlFVRjZRaXhEUVVSWU8wRkJRVUVzWjBKQlF6aERPMEZCUXpGRFVTeHZRa0ZCVVc1Q0xFZEJRVWR2UWl4VlFVRklMRU5CUVdNc1EwRkJaQ3hGUVVGcFFpeExRVUZMWkN4TFFVRk1MRU5CUVZkbExGTkJRVmdzUTBGQmNVSllMRXRCUVhKQ0xFTkJRV3BDTEVOQlJsbzdRVUZCUVN4blFrRkhTWFZDTEdGQlFXRXNTMEZJYWtJN1FVRkJRU3huUWtGSGQwSkRMR0ZCUVdFc1NVRklja003UVVGQlFTeG5Ra0ZKU1VNc2EwSkJTa283UVVGQlFTeG5Ra0ZKWlVNc2EwSkJTbVk3TzBGQlRVRTdRVUZEUVN4cFFrRkJTeXhKUVVGSllpeEpRVUZKTEVOQlFXSXNSVUZCWjBKQkxFdEJRVXRpTEV0QlFYSkNMRVZCUVRSQ0xFVkJRVVZoTEVOQlFUbENMRVZCUVdsRE8wRkJRemRDV1N3MFFrRkJZVE5DTEV0QlFVdEJMRVZCUVVWblFpeERRVUZHTEVOQlFVbG9RaXhEUVVGV0xFbEJRV2RDTEVOQlFUVkNPMEZCUTBFMFFpdzBRa0ZCWVROQ0xFdEJRVXRCTEVWQlFVVmxMRU5CUVVZc1EwRkJTV2hDTEVOQlFWWXNTVUZCWjBJc1EwRkJOVUk3TzBGQlJVRXNiMEpCUVVrd1FpeGpRVUZqUXl4alFVRmpReXhUUVVGb1F5eEZRVUV5UXp0QlFVTjJRMFlzYVVOQlFXRXNTMEZCWWp0QlFVTkJSQ3hwUTBGQllVVXNXVUZCV1VNc1UwRkJla0k3UVVGRFNEdEJRVU5FTEc5Q1FVRkpTQ3hWUVVGS0xFVkJRV2RDTzBGQlExcEhMR2REUVVGWmJrSXNTMEZCUzI5Q0xFZEJRVXdzUTBGQlV5eERRVUZVTEVWQlFWY3NTMEZCU3k5Q0xFdEJRVXdzUTBGQlYzRkNMRlZCUVZnc1EwRkJjMEpLTEVOQlFYUkNMRU5CUVZnc1NVRkJjVU1zUTBGQmFrUTdRVUZEU0R0QlFVTkVka0lzYlVKQlFVZDVRaXhQUVVGSUxFTkJRVmRPTEV0QlFWZ3NSVUZCYTBKcFFpeFRRVUZzUWp0QlFVTkJMRzlDUVVGSllpeE5RVUZOWWl4TFFVRldMRVZCUVdsQ08wRkJRMkpXTEhWQ1FVRkhNRUlzVlVGQlNDeERRVUZqVUN4TFFVRmtMRVZCUVc5Q0xFdEJRVXRpTEV0QlFVd3NRMEZCVjNGQ0xGVkJRVmdzUTBGQmMwSktMRWxCUVVVc1EwRkJlRUlzUTBGQmNFSTdRVUZEU0RzN1FVRkZSR1FzYjBKQlFVdEJMRXRCUVVzc1EwRkJRMEVzUlVGQlJXMUNMRTFCUVZJc1NVRkJhMEp1UWl4RlFVRkZiMElzUzBGQmNrSXNTVUZCSzBJc1NVRkJia003UVVGRFFYSkNMRzlDUVVGTFFTeExRVUZMTEVOQlFVTkJMRVZCUVVWdlFpeE5RVUZTTEVsQlFXdENjRUlzUlVGQlJYRkNMRXRCUVhKQ0xFbEJRU3RDTEVsQlFXNURPMEZCUTBnN08wRkJSVVE3UVVGRFFUdEJRVU5CTEdkQ1FVRkpTU3hWUVVGS0xFVkJRV2RDTzBGQlExcHFReXh0UWtGQlIzbENMRTlCUVVnc1EwRkJWMDRzUzBGQldDeEZRVUZyUWl4RFFVRkRSaXhMUVVGTFlTeExRVUZNTEVOQlFWZGlMRXRCUVV0akxFMUJRVXdzUzBGQlkyWXNTVUZCZWtJc1EwRkJia0k3UVVGRFNDeGhRVVpFTEUxQlJVODdRVUZEU0doQ0xHMUNRVUZIZVVJc1QwRkJTQ3hEUVVGWFRpeExRVUZZTEVWQlFXdENMRU5CUVVOR0xFdEJRVXRoTEV0QlFVd3NRMEZCVjJJc1MwRkJTMk1zVFVGQlRDeExRVUZqWml4SlFVRjZRaXhEUVVGRUxFZEJRV2RETEVOQlFXeEVPMEZCUTBnN08wRkJSVVE3UVVGRFFTeHRRa0ZCVHl4TFFVRkxaMElzVFVGQlRDeERRVUZaWWl4TFFVRmFMRVZCUVcxQ1RDeExRVUZ1UWl4RlFVRXdRa01zUzBGQk1VSXNSVUZCYVVOTUxFdEJRV3BETEVWQlFYZERSU3hEUVVGNFF5eEZRVUV5UTBNc1EwRkJNME1zUTBGQlVEdEJRVU5JT3pzN096dEJRVVZFT3pzN096czdPenM3T3pzclFrRlhVWGxDTEVNc1JVRkJSemxDTEVNc1JVRkJSME1zUXl4RlFVRkhReXhMTEVWQlFVOUZMRU1zUlVGQlIwTXNReXhGUVVGSE8wRkJRekZDTEdkQ1FVRkpNRUlzVlVGQlZTeEZRVUZrTzBGQlFVRXNaMEpCUVd0Q1F5eFhRVUZYTEVWQlFUZENPMEZCUVVFc1owSkJRMGxxUWl4SlFVRkpMRU5CUkZJN1FVRkJRU3huUWtGRlNXdENMRk5CUVZNc1MwRkJTMjVETEV0QlFVd3NRMEZCVjJVc1UwRkJXQ3hEUVVGeFFsZ3NTMEZCY2tJc1EwRkdZanRCUVVGQkxHZENRVWRKWjBNc2EwSkJTRW83UVVGQlFTeG5Ra0ZIWlhCQ0xHTkJTR1k3TzBGQlMwRXNiVUpCUVU5RExFdEJRVXRpTEV0QlFWb3NSVUZCYlVJN1FVRkRabWRETERSQ1FVRlpNVU1zUjBGQlJ6SkRMRWRCUVVnc1EwRkJUMHdzUTBGQlVDeERRVUZhTzBGQlEwRjBReXh0UWtGQlJ6UkRMRmRCUVVnc1EwRkJaVVlzVTBGQlppeEZRVUV3UWtRc1UwRkJVeXhMUVVGTGJrTXNTMEZCVEN4RFFVRlhaU3hUUVVGWUxFTkJRWEZDUlN4RFFVRnlRaXhEUVVGdVF6dEJRVU5CUkN4M1FrRkJVWFJDTEVkQlFVYzJReXhOUVVGSUxFTkJRVlZJTEZOQlFWWXNSVUZCY1VKNlFpeExRVUZMYjBJc1IwRkJUQ3hEUVVGVExFTkJRVlFzUlVGQldTeExRVUZMTDBJc1MwRkJUQ3hEUVVGWGNVSXNWVUZCV0N4RFFVRnpRa29zUTBGQmRFSXNRMEZCV2l4RFFVRnlRaXhEUVVGU08wRkJRMEZuUWl4M1FrRkJVV2hDTEVOQlFWSXNTVUZCVjFnc1EwRkJXRHRCUVVOQk5FSXNlVUpCUVZOcVFpeERRVUZVTEVsQlFWbFdMRU5CUVZvN08wRkJSVUVzYjBKQlFVbEtMRXRCUVV0QkxFVkJRVVZsTEVOQlFVWXNRMEZCU1doQ0xFTkJRVW9zUzBGQlZXTXNTMEZCYmtJc1JVRkJNRUk3UVVGQlJXbENMRFJDUVVGUmFFSXNRMEZCVWl4SlFVRlhaQ3hGUVVGRlpTeERRVUZHTEVOQlFVbGFMRU5CUVdZc1EwRkJhMEkwUWl4VFFVRlRha0lzUTBGQlZDeEpRVUZaWkN4RlFVRkZaU3hEUVVGR0xFTkJRVWxZTEVOQlFXaENPMEZCUVc5Q08wRkJRMnhGTEc5Q1FVRkpUQ3hMUVVGTFFTeEZRVUZGWjBJc1EwRkJSaXhEUVVGSmFFSXNRMEZCU2l4TFFVRlZZeXhMUVVGdVFpeEZRVUV3UWp0QlFVRkZhVUlzTkVKQlFWRm9RaXhEUVVGU0xFbEJRVmRtTEVWQlFVVm5RaXhEUVVGR0xFTkJRVWxhTEVOQlFXWXNRMEZCYTBJMFFpeFRRVUZUYWtJc1EwRkJWQ3hKUVVGWlppeEZRVUZGWjBJc1EwRkJSaXhEUVVGSldDeERRVUZvUWp0QlFVRnZRanM3UVVGRmJFVktMRzlDUVVGTFFTeExRVUZMTEVOQlFVTkJMRVZCUVVWdFFpeE5RVUZTTEVsQlFXdENia0lzUlVGQlJXOUNMRXRCUVhKQ0xFbEJRU3RDTEVsQlFXNURPMEZCUTBGeVFpeHZRa0ZCUzBFc1MwRkJTeXhEUVVGRFFTeEZRVUZGYjBJc1RVRkJVaXhKUVVGclFuQkNMRVZCUVVWeFFpeExRVUZ5UWl4SlFVRXJRaXhKUVVGdVF6czdRVUZGUVN4clFrRkJSVTRzUTBGQlJqdEJRVU5JT3p0QlFVVkVMRzFDUVVGUExFbEJRVWx5UWl4VlFVRktMRU5CUVdVc1MwRkJTMGtzUzBGQmNFSXNSVUZCTWtKblF5eERRVUV6UWl4RlFVRTRRa01zVDBGQk9VSXNSVUZCZFVORExGRkJRWFpETEVOQlFWQTdRVUZEU0RzN096czdPMEZCUlVvN08wRkJSVVJOTEU5QlFVOURMRTlCUVZBc1IwRkJhVUkxUXl4UlFVRnFRaUlzSW1acGJHVWlPaUp6ZEhKaGRHVm5lUzVxY3lJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYklpZDFjMlVnYzNSeWFXTjBKenRjYmx4dVkyOXVjM1FnUWtrZ1BTQnlaWEYxYVhKbEtDZENhV2RKYm5RbktUdGNibU52Ym5OMElFbGtaVzUwYVdacFpYSWdQU0J5WlhGMWFYSmxLQ2N1TDJsa1pXNTBhV1pwWlhJdWFuTW5LVHRjYmx4dUx5b3FYRzRnS2lCRmJuVnRaWEpoZEdVZ2RHaGxJR0YyWVdsc1lXSnNaU0J6ZFdJdFlXeHNiMk5oZEdsdmJpQnpkSEpoZEdWbmFXVnpMaUJVYUdVZ2MybG5ibUYwZFhKbElHOW1JSFJvWlhObFhHNGdLaUJtZFc1amRHbHZibk1nYVhNZ1ppaEpaQ3dnU1dRc0lFNHJMQ0JPS3l3Z1Rpd2dUaWs2SUVsa0xseHVJQ292WEc1amJHRnpjeUJUZEhKaGRHVm5lU0I3SUNBZ0lGeHVJQ0FnSUM4cUtseHVJQ0FnSUNBcUlFQndZWEpoYlNCN1FtRnpaWDBnWW1GelpTQlVhR1VnWW1GelpTQjFjMlZrSUhSdklHTnlaV0YwWlNCMGFHVWdibVYzSUdsa1pXNTBhV1pwWlhKekxseHVJQ0FnSUNBcUlFQndZWEpoYlNCN1RuVnRZbVZ5ZlNCYlltOTFibVJoY25rZ1BTQXhNRjBnVkdobElIWmhiSFZsSUhWelpXUWdZWE1nZEdobElHUmxabUYxYkhRZ2JXRjRhVzExYlZ4dUlDQWdJQ0FxSUhOd1lXTnBibWNnWW1WMGQyVmxiaUJwWkdWdWRHbG1hV1Z5Y3k1Y2JpQWdJQ0FnS2k5Y2JpQWdJQ0JqYjI1emRISjFZM1J2Y2lBb1ltRnpaU3dnWW05MWJtUmhjbmtnUFNBeE1Da2dlMXh1SUNBZ0lDQWdJQ0IwYUdsekxsOWlZWE5sSUQwZ1ltRnpaVHRjYmlBZ0lDQWdJQ0FnZEdocGN5NWZZbTkxYm1SaGNua2dQU0JpYjNWdVpHRnllVHRjYmlBZ0lDQjlPMXh1SUNBZ0lGeHVJQ0FnSUM4cUtseHVJQ0FnSUNBcUlFTm9iMjl6WlNCaGJpQnBaR1Z1ZEdsbWFXVnlJSE4wWVhKMGFXNW5JR1p5YjIwZ2NISmxkbWx2ZFhNZ1ltOTFibVFnWVc1a0lHRmtaR2x1WnlCeVlXNWtiMjFjYmlBZ0lDQWdLaUJ1ZFcxaVpYSXVYRzRnSUNBZ0lDb2dRSEJoY21GdElIdE1VMlZ4VG05a1pYMGdjQ0JVYUdVZ2NISmxkbWx2ZFhNZ2FXUmxiblJwWm1sbGNpNWNiaUFnSUNBZ0tpQkFjR0Z5WVcwZ2UweFRaWEZPYjJSbGZTQnhJRlJvWlNCdVpYaDBJR2xrWlc1MGFXWnBaWEl1WEc0Z0lDQWdJQ29nUUhCaGNtRnRJSHRPZFcxaVpYSjlJR3hsZG1Wc0lGUm9aU0J1ZFcxaVpYSWdiMllnWTI5dVkyRjBaVzVoZEdsdmJpQmpiMjF3YjNOcGJtY2dkR2hsSUc1bGQxeHVJQ0FnSUNBcUlHbGtaVzUwYVdacFpYSXVYRzRnSUNBZ0lDb2dRSEJoY21GdElIdE9kVzFpWlhKOUlHbHVkR1Z5ZG1Gc0lGUm9aU0JwYm5SbGNuWmhiQ0JpWlhSM1pXVnVJSEFnWVc1a0lIRXVYRzRnSUNBZ0lDb2dRSEJoY21GdElIdFBZbXBsWTNSOUlITWdWR2hsSUhOdmRYSmpaU0IwYUdGMElHTnlaV0YwWlhNZ2RHaGxJRzVsZHlCcFpHVnVkR2xtYVdWeUxseHVJQ0FnSUNBcUlFQndZWEpoYlNCN1RuVnRZbVZ5ZlNCaklGUm9aU0JqYjNWdWRHVnlJRzltSUhSb1lYUWdjMjkxY21ObExseHVJQ0FnSUNBcUlFQnlaWFIxY200Z2UwbGtaVzUwYVdacFpYSjlJRlJvWlNCdVpYY2dZV3hzYjJOaGRHVmtJR2xrWlc1MGFXWnBaWEl1WEc0Z0lDQWdJQ292WEc0Z0lDQWdZbEJzZFhNZ0tIQXNJSEVzSUd4bGRtVnNMQ0JwYm5SbGNuWmhiQ3dnY3l3Z1l5a2dlMXh1SUNBZ0lDQWdJQ0JzWlhRZ1kyOXdlVkFnUFNCd0xDQmpiM0I1VVNBOUlIRXNYRzRnSUNBZ0lDQWdJQ0FnSUNCemRHVndJRDBnVFdGMGFDNXRhVzRvZEdocGN5NWZZbTkxYm1SaGNua3NJR2x1ZEdWeWRtRnNLU3dnTHk4ak1DQjBhR1VnYldsdUlHbHVkR1Z5ZG1Gc1hHNGdJQ0FnSUNBZ0lDQWdJQ0JrYVdkcGRDQTlJRUpKTG1sdWRESmlhV2RKYm5Rb01Dd2dkR2hwY3k1ZlltRnpaUzVuWlhSVGRXMUNhWFFvYkdWMlpXd3BLU3hjYmlBZ0lDQWdJQ0FnSUNBZ0lIWmhiSFZsTzF4dUlDQWdJQ0FnSUNCY2JpQWdJQ0FnSUNBZ0x5OGdJekVnWTI5d2VTQjBhR1VnY0hKbGRtbHZkWE1nYVdSbGJuUnBabWxsY2x4dUlDQWdJQ0FnSUNCbWIzSWdLR3hsZENCcElEMGdNRHNnYVNBOFBTQnNaWFpsYkRzZ0t5dHBLU0I3WEc1Y2RDQWdJQ0IyWVd4MVpTQTlJQ2h3SUNZbUlIQXVkQzV3S1NCOGZDQXdPMXh1SUNBZ0lDQWdJQ0FnSUNBZ1Fra3VZV1JrU1c1MFh5aGthV2RwZEN3Z2RtRnNkV1VwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdhV1lnS0drZ0lUMDlJR3hsZG1Wc0tTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdRa2t1YkdWbWRGTm9hV1owWHloa2FXZHBkQ3dnZEdocGN5NWZZbUZ6WlM1blpYUkNhWFJDWVhObEtHa2dLeUF4S1NrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0I5TzF4dUlDQWdJQ0FnSUNBZ0lDQWdjQ0E5SUNod0lDWW1JQ0Z3TG1selRHVmhaaUFtSmlCd0xtTm9hV3hrS1NCOGZDQnVkV3hzTzF4dUlDQWdJQ0FnSUNCOU8xeHVJQ0FnSUNBZ0lDQXZMeUFqTWlCamNtVmhkR1VnWVNCa2FXZHBkQ0JtYjNJZ1lXNGdhV1JsYm5ScFptbGxjaUJpZVNCaFpHUnBibWNnWVNCeVlXNWtiMjBnZG1Gc2RXVmNiaUFnSUNBZ0lDQWdMeThnSTBFZ1JHbG5hWFJjYmlBZ0lDQWdJQ0FnUWtrdVlXUmtTVzUwWHloa2FXZHBkQ3dnVFdGMGFDNW1iRzl2Y2loTllYUm9MbkpoYm1SdmJTZ3BJQ29nYzNSbGNDQXJJREVwS1R0Y2JpQWdJQ0FnSUNBZ0x5OGdJMElnVTI5MWNtTmxJQ1lnWTI5MWJuUmxjbHh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdkR2hwY3k1ZloyVjBVME1vWkdsbmFYUXNJR052Y0hsUUxDQmpiM0I1VVN3Z2JHVjJaV3dzSUhNc0lHTXBPMXh1SUNBZ0lIMDdYRzVjYmx4dUlDQWdJRnh1SUNBZ0lDOHFLbHh1SUNBZ0lDQXFJRU5vYjI5elpTQmhiaUJwWkdWdWRHbG1hV1Z5SUhOMFlYSjBhVzVuSUdaeWIyMGdibVY0ZENCaWIzVnVaQ0JoYm1RZ2MzVmljM1J5WVdOMElHRWdjbUZ1Wkc5dFhHNGdJQ0FnSUNvZ2JuVnRZbVZ5TGx4dUlDQWdJQ0FxSUVCd1lYSmhiU0I3VEZObGNVNXZaR1Y5SUhBZ1ZHaGxJSEJ5WlhacGIzVnpJR2xrWlc1MGFXWnBaWEl1WEc0Z0lDQWdJQ29nUUhCaGNtRnRJSHRNVTJWeFRtOWtaWDBnY1NCVWFHVWdibVY0ZENCcFpHVnVkR2xtYVdWeUxseHVJQ0FnSUNBcUlFQndZWEpoYlNCN1RuVnRZbVZ5ZlNCc1pYWmxiQ0JVYUdVZ2JuVnRZbVZ5SUc5bUlHTnZibU5oZEdWdVlYUnBiMjRnWTI5dGNHOXphVzVuSUhSb1pTQnVaWGRjYmlBZ0lDQWdLaUJwWkdWdWRHbG1hV1Z5TGx4dUlDQWdJQ0FxSUVCd1lYSmhiU0I3VG5WdFltVnlmU0JwYm5SbGNuWmhiQ0JVYUdVZ2FXNTBaWEoyWVd3Z1ltVjBkMlZsYmlCd0lHRnVaQ0J4TGx4dUlDQWdJQ0FxSUVCd1lYSmhiU0I3VDJKcVpXTjBmU0J6SUZSb1pTQnpiM1Z5WTJVZ2RHaGhkQ0JqY21WaGRHVnpJSFJvWlNCdVpYY2dhV1JsYm5ScFptbGxjaTVjYmlBZ0lDQWdLaUJBY0dGeVlXMGdlMDUxYldKbGNuMGdZeUJVYUdVZ1kyOTFiblJsY2lCdlppQjBhR0YwSUhOdmRYSmpaUzVjYmlBZ0lDQWdLaTljYmlBZ0lDQmlUV2x1ZFhNZ0tIQXNJSEVzSUd4bGRtVnNMQ0JwYm5SbGNuWmhiQ3dnY3l3Z1l5a2dlMXh1SUNBZ0lDQWdJQ0JzWlhRZ1kyOXdlVkFnUFNCd0xDQmpiM0I1VVNBOUlIRXNYRzRnSUNBZ0lDQWdJQ0FnSUNCemRHVndJRDBnVFdGMGFDNXRhVzRvZEdocGN5NWZZbTkxYm1SaGNua3NJR2x1ZEdWeWRtRnNLU3d2THlBak1DQndjbTlqWlhOeklHMXBiaUJwYm5SbGNuWmhiRnh1SUNBZ0lDQWdJQ0FnSUNBZ1pHbG5hWFFnUFNCQ1NTNXBiblF5WW1sblNXNTBLREFzSUhSb2FYTXVYMkpoYzJVdVoyVjBVM1Z0UW1sMEtHeGxkbVZzS1Nrc1hHNGdJQ0FnSUNBZ0lDQWdJQ0J3U1hOSGNtVmhkR1Z5SUQwZ1ptRnNjMlVzSUdOdmJXMXZibEp2YjNRZ1BTQjBjblZsTEZ4dUlDQWdJQ0FnSUNBZ0lDQWdjSEpsZGxaaGJIVmxMQ0J1WlhoMFZtRnNkV1U3WEc0Z0lDQWdJQ0FnSUZ4dUlDQWdJQ0FnSUNBdkx5QWpNU0JqYjNCNUlHNWxlSFFzSUdsbUlIQnlaWFpwYjNWeklHbHpJR2R5WldGMFpYSXNJR052Y0hrZ2JXRjRWbUZzZFdVZ1FDQmtaWEIwYUZ4dUlDQWdJQ0FnSUNCbWIzSWdLR3hsZENCcElEMGdNRHNnYVNBOFBTQnNaWFpsYkRzZ0t5dHBLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQndjbVYyVm1Gc2RXVWdQU0FvY0NBbUppQndMblF1Y0NrZ2ZId2dNRHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHNWxlSFJXWVd4MVpTQTlJQ2h4SUNZbUlIRXVkQzV3S1NCOGZDQXdPMXh1SUNBZ0lDQWdJQ0FnSUNBZ1hHNGdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb1kyOXRiVzl1VW05dmRDQW1KaUJ3Y21WMlZtRnNkV1VnSVQwOUlHNWxlSFJXWVd4MVpTa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR052YlcxdmJsSnZiM1FnUFNCbVlXeHpaVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J3U1hOSGNtVmhkR1Z5SUQwZ2NISmxkbFpoYkhWbElENGdibVY0ZEZaaGJIVmxPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2ZUdGNiaUFnSUNBZ0lDQWdJQ0FnSUdsbUlDaHdTWE5IY21WaGRHVnlLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYm1WNGRGWmhiSFZsSUQwZ1RXRjBhQzV3YjNjb01peDBhR2x6TGw5aVlYTmxMbWRsZEVKcGRFSmhjMlVvYVNrcExURTdYRzRnSUNBZ0lDQWdJQ0FnSUNCOU8xeHVJQ0FnSUNBZ0lDQWdJQ0FnUWtrdVlXUmtTVzUwWHloa2FXZHBkQ3dnYm1WNGRGWmhiSFZsS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJR2xtSUNocElDRTlQU0JzWlhabGJDa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRUpKTG14bFpuUlRhR2xtZEY4b1pHbG5hWFFzZEdocGN5NWZZbUZ6WlM1blpYUkNhWFJDWVhObEtHa3JNU2twTzF4dUlDQWdJQ0FnSUNBZ0lDQWdmVHRjYmx4dUlDQWdJQ0FnSUNBZ0lDQWdjU0E5SUNoeElDWW1JQ0Z4TG1selRHVmhaaUFtSmlCeExtTm9hV3hrS1NCOGZDQnVkV3hzTzF4dUlDQWdJQ0FnSUNBZ0lDQWdjQ0E5SUNod0lDWW1JQ0Z3TG1selRHVmhaaUFtSmlCd0xtTm9hV3hrS1NCOGZDQnVkV3hzTzF4dUlDQWdJQ0FnSUNCOU8xeHVJQ0FnSUNBZ0lDQmNiaUFnSUNBZ0lDQWdMeThnSXpNZ1kzSmxZWFJsSUdFZ1pHbG5hWFFnWm05eUlHRnVJR2xrWlc1MGFXWnBaWElnWW5rZ2MzVmlhVzVuSUdFZ2NtRnVaRzl0SUhaaGJIVmxYRzRnSUNBZ0lDQWdJQzh2SUNOQklFUnBaMmwwWEc0Z0lDQWdJQ0FnSUdsbUlDaHdTWE5IY21WaGRHVnlLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQkNTUzVoWkdSSmJuUmZLR1JwWjJsMExDQXRUV0YwYUM1bWJHOXZjaWhOWVhSb0xuSmhibVJ2YlNncEtuTjBaWEFwSUNrN1hHNGdJQ0FnSUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JDU1M1aFpHUkpiblJmS0dScFoybDBMQ0F0VFdGMGFDNW1iRzl2Y2loTllYUm9MbkpoYm1SdmJTZ3BLbk4wWlhBcExURWdLVHRjYmlBZ0lDQWdJQ0FnZlR0Y2JpQWdJQ0JjYmlBZ0lDQWdJQ0FnTHk4Z0kwSWdVMjkxY21ObElDWWdZMjkxYm5SbGNseHVJQ0FnSUNBZ0lDQnlaWFIxY200Z2RHaHBjeTVmWjJWMFUwTW9aR2xuYVhRc0lHTnZjSGxRTENCamIzQjVVU3dnYkdWMlpXd3NJSE1zSUdNcE8xeHVJQ0FnSUgwN1hHNWNiaUFnSUNBdktpcGNiaUFnSUNBZ0tpQkRiM0JwWlhNZ2RHaGxJR0Z3Y0hKdmNISnBZWFJsY3lCemIzVnlZMlVnWVc1a0lHTnZkVzUwWlhJZ1puSnZiU0IwYUdVZ1lXUnFZV05sYm5RZ2FXUmxiblJwWm1sbGNuTmNiaUFnSUNBZ0tpQmhkQ0IwYUdVZ2FXNXpaWEowYVc5dUlIQnZjMmwwYVc5dUxseHVJQ0FnSUNBcUlFQndZWEpoYlNCN1RuVnRZbVZ5ZlNCa0lGUm9aU0JrYVdkcGRDQndZWEowSUc5bUlIUm9aU0J1WlhjZ2FXUmxiblJwWm1sbGNpNWNiaUFnSUNBZ0tpQkFjR0Z5WVcwZ2UweFRaWEZPYjJSbGZTQndJRlJvWlNCd2NtVjJhVzkxY3lCcFpHVnVkR2xtYVdWeUxseHVJQ0FnSUNBcUlFQndZWEpoYlNCN1RGTmxjVTV2WkdWOUlIRWdkR2hsSUc1bGVIUWdhV1JsYm5ScFptbGxjaTVjYmlBZ0lDQWdLaUJBY0dGeVlXMGdlMDUxYldKbGNuMGdiR1YyWld3Z1ZHaGxJSE5wZW1VZ2IyWWdkR2hsSUc1bGR5QnBaR1Z1ZEdsbWFXVnlMbHh1SUNBZ0lDQXFJRUJ3WVhKaGJTQjdUMkpxWldOMGZTQnpJRlJvWlNCc2IyTmhiQ0J6YVhSbElHbGtaVzUwYVdacFpYSXVYRzRnSUNBZ0lDb2dRSEJoY21GdElIdE9kVzFpWlhKOUlHTWdWR2hsSUd4dlkyRnNJRzF2Ym05MGIyNXBZeUJqYjNWdWRHVnlMbHh1SUNBZ0lDQXFJRUJ5WlhSMWNtNGdlMGxrWlc1MGFXWnBaWEo5SUZSb1pTQnVaWGNnWVd4c2IyTmhkR1ZrSUdsa1pXNTBhV1pwWlhJdVhHNGdJQ0FnSUNvdlhHNGdJQ0FnWDJkbGRGTkRJQ2hrTENCd0xDQnhMQ0JzWlhabGJDd2djeXdnWXlrZ2UxeHVJQ0FnSUNBZ0lDQnNaWFFnYzI5MWNtTmxjeUE5SUZ0ZExDQmpiM1Z1ZEdWeWN5QTlJRnRkTEZ4dUlDQWdJQ0FnSUNBZ0lDQWdhU0E5SURBc1hHNGdJQ0FnSUNBZ0lDQWdJQ0J6ZFcxQ2FYUWdQU0IwYUdsekxsOWlZWE5sTG1kbGRGTjFiVUpwZENoc1pYWmxiQ2tzWEc0Z0lDQWdJQ0FnSUNBZ0lDQjBaVzF3UkdsbmFYUXNJSFpoYkhWbE8xeHVJQ0FnSUNBZ0lDQmNiaUFnSUNBZ0lDQWdkMmhwYkdVZ0tHa2dQRDBnYkdWMlpXd3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIUmxiWEJFYVdkcGRDQTlJRUpKTG1SMWNDaGtLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lFSkpMbkpwWjJoMFUyaHBablJmS0hSbGJYQkVhV2RwZEN3Z2MzVnRRbWwwSUMwZ2RHaHBjeTVmWW1GelpTNW5aWFJUZFcxQ2FYUW9hU2twTzF4dUlDQWdJQ0FnSUNBZ0lDQWdkbUZzZFdVZ1BTQkNTUzV0YjJSSmJuUW9kR1Z0Y0VScFoybDBMQ0JOWVhSb0xuQnZkeWd5TENCMGFHbHpMbDlpWVhObExtZGxkRUpwZEVKaGMyVW9hU2twS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJSE52ZFhKalpYTmJhVjA5Y3p0Y2JpQWdJQ0FnSUNBZ0lDQWdJR052ZFc1MFpYSnpXMmxkUFdNN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JjYmlBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2h4SUNZbUlIRXVkQzV3SUQwOVBTQjJZV3gxWlNrZ2V5QnpiM1Z5WTJWelcybGRQWEV1ZEM1ek95QmpiM1Z1ZEdWeWMxdHBYVDF4TG5RdVl6c2dmVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2h3SUNZbUlIQXVkQzV3SUQwOVBTQjJZV3gxWlNrZ2V5QnpiM1Z5WTJWelcybGRQWEF1ZEM1ek95QmpiM1Z1ZEdWeWMxdHBYVDF3TG5RdVl6c2dmVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lGeHVJQ0FnSUNBZ0lDQWdJQ0FnY1NBOUlDaHhJQ1ltSUNGeExtbHpUR1ZoWmlBbUppQnhMbU5vYVd4a0tTQjhmQ0J1ZFd4c08xeHVJQ0FnSUNBZ0lDQWdJQ0FnY0NBOUlDaHdJQ1ltSUNGd0xtbHpUR1ZoWmlBbUppQndMbU5vYVd4a0tTQjhmQ0J1ZFd4c08xeHVYRzRnSUNBZ0lDQWdJQ0FnSUNBcksyazdYRzRnSUNBZ0lDQWdJSDA3WEc0Z0lDQWdJQ0FnSUZ4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnYm1WM0lFbGtaVzUwYVdacFpYSW9kR2hwY3k1ZlltRnpaU3dnWkN3Z2MyOTFjbU5sY3l3Z1kyOTFiblJsY25NcE8xeHVJQ0FnSUgwN1hHNGdJQ0FnWEc1OU8xeHVYRzV0YjJSMWJHVXVaWGh3YjNKMGN5QTlJRk4wY21GMFpXZDVPMXh1SWwxOSIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBUcmlwbGUgdGhhdCBjb250YWlucyA8cGF0aDsgc2l0ZTsgY291bnRlcj4uIElkZW50aWZpZXJzIG9mIExTRVEgYXJlIGxpc3RzIG9mXG4gKiB0cmlwbGVzLlxuICovXG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBUcmlwbGUgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gcGF0aCBUaGUgcGFydCBvZiB0aGUgcGF0aCBpbiB0aGUgdHJlZS5cbiAgICAgKiBAcGFyYW0ge051bWJlcnxTdHJpbmd9IHNpdGUgVGhlIHVuaXF1ZSBzaXRlIGlkZW50aWZpZXIgdGhhdCBjcmVhdGVkIHRoZVxuICAgICAqIHRyaXBsZS5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gY291bnRlciBUaGUgbG9jYWwgY291bnRlciBvZiB0aGUgc2l0ZSB3aGVuIGl0IGNyZWF0ZWQgdGhlXG4gICAgICogdHJpcGxlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFRyaXBsZShwYXRoLCBzaXRlLCBjb3VudGVyKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBUcmlwbGUpO1xuXG4gICAgICAgIHRoaXMucCA9IHBhdGg7XG4gICAgICAgIHRoaXMucyA9IHNpdGU7XG4gICAgICAgIHRoaXMuYyA9IGNvdW50ZXI7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKFRyaXBsZSwgW3tcbiAgICAgICAga2V5OiAnY29tcGFyZVRvJyxcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb21wYXJlIHR3byB0cmlwbGVzIHByaW9yaXRpemluZyB0aGUgcGF0aCwgdGhlbiBzaXRlLCB0aGVuIGNvdW50ZXIuXG4gICAgICAgICAqIEBwYXJhbSB7VHJpcGxlfSBvIHRoZSBvdGhlciB0cmlwbGUgdG8gY29tcGFyZSAuXG4gICAgICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9IC0xIGlmIHRoaXMgaXMgbG93ZXIgdGhhbiBvLCAxIGlmIHRoaXMgaXMgZ3JlYXRlciB0aGFuXG4gICAgICAgICAqIG8sIDAgb3RoZXJ3aXNlLlxuICAgICAgICAgKi9cbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBhcmVUbyhvKSB7XG4gICAgICAgICAgICAvLyAjMSBwcm9jZXNzIG1heGltYWwgdmlydHVhbCBib3VuZHNcbiAgICAgICAgICAgIGlmICh0aGlzLnMgPT09IE51bWJlci5NQVhfVkFMVUUgJiYgdGhpcy5jID09PSBOdW1iZXIuTUFYX1ZBTFVFKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKG8ucyA9PT0gTnVtYmVyLk1BWF9WQUxVRSAmJiBvLnMgPT09IE51bWJlci5NQVhfVkFMVUUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLy8gIzIgY29tcGFyZSBwIHRoZW4gcyB0aGVuIGNcbiAgICAgICAgICAgIGlmICh0aGlzLnAgPCBvLnApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKHRoaXMucCA+IG8ucCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmICh0aGlzLnMgPCBvLnMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKHRoaXMucyA+IG8ucykge1xuICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmICh0aGlzLmMgPCBvLmMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKHRoaXMuYyA+IG8uYykge1xuICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8vICMzIHRoZXkgYXJlIGVxdWFsXG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBUcmlwbGU7XG59KCk7XG5cbjtcblxubW9kdWxlLmV4cG9ydHMgPSBUcmlwbGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJblJ5YVhCc1pTNXFjeUpkTENKdVlXMWxjeUk2V3lKVWNtbHdiR1VpTENKd1lYUm9JaXdpYzJsMFpTSXNJbU52ZFc1MFpYSWlMQ0p3SWl3aWN5SXNJbU1pTENKdklpd2lUblZ0WW1WeUlpd2lUVUZZWDFaQlRGVkZJaXdpYlc5a2RXeGxJaXdpWlhod2IzSjBjeUpkTENKdFlYQndhVzVuY3lJNklrRkJRVUU3TzBGQlJVRTdPenM3T3pzN096dEpRVWxOUVN4Tk96dEJRVVZHT3pzN096czdPMEZCVDBFc2IwSkJRV0ZETEVsQlFXSXNSVUZCYlVKRExFbEJRVzVDTEVWQlFYbENReXhQUVVGNlFpeEZRVUZyUXp0QlFVRkJPenRCUVVNNVFpeGhRVUZMUXl4RFFVRk1MRWRCUVZOSUxFbEJRVlE3UVVGRFFTeGhRVUZMU1N4RFFVRk1MRWRCUVZOSUxFbEJRVlE3UVVGRFFTeGhRVUZMU1N4RFFVRk1MRWRCUVZOSUxFOUJRVlE3UVVGRFNEczdPenM3TzBGQlJVUTdPenM3T3p0clEwRk5WMGtzUXl4RlFVRkhPMEZCUTFZN1FVRkRRU3huUWtGQlNTeExRVUZMUml4RFFVRk1MRXRCUVZkSExFOUJRVTlETEZOQlFXeENMRWxCUVN0Q0xFdEJRVXRJTEVOQlFVd3NTMEZCVjBVc1QwRkJUME1zVTBGQmNrUXNSVUZCSzBRN1FVRkRNMFFzZFVKQlFVOHNRMEZCVUR0QlFVTklPMEZCUTBRc1owSkJRVWxHTEVWQlFVVkdMRU5CUVVZc1MwRkJVVWNzVDBGQlQwTXNVMEZCWml4SlFVRTBRa1lzUlVGQlJVWXNRMEZCUml4TFFVRlJSeXhQUVVGUFF5eFRRVUV2UXl4RlFVRjVSRHRCUVVOeVJDeDFRa0ZCVHl4RFFVRkRMRU5CUVZJN1FVRkRTRHRCUVVORU8wRkJRMEVzWjBKQlFVa3NTMEZCUzB3c1EwRkJUQ3hIUVVGVFJ5eEZRVUZGU0N4RFFVRm1MRVZCUVd0Q08wRkJRVVVzZFVKQlFVOHNRMEZCUXl4RFFVRlNPMEZCUVZjN1FVRkRMMElzWjBKQlFVa3NTMEZCUzBFc1EwRkJUQ3hIUVVGVFJ5eEZRVUZGU0N4RFFVRm1MRVZCUVd0Q08wRkJRVVVzZFVKQlFVOHNRMEZCVUR0QlFVRlhPMEZCUXk5Q0xHZENRVUZKTEV0QlFVdERMRU5CUVV3c1IwRkJVMFVzUlVGQlJVWXNRMEZCWml4RlFVRnJRanRCUVVGRkxIVkNRVUZQTEVOQlFVTXNRMEZCVWp0QlFVRlhPMEZCUXk5Q0xHZENRVUZKTEV0QlFVdEJMRU5CUVV3c1IwRkJVMFVzUlVGQlJVWXNRMEZCWml4RlFVRnJRanRCUVVGRkxIVkNRVUZQTEVOQlFWQTdRVUZCVnp0QlFVTXZRaXhuUWtGQlNTeExRVUZMUXl4RFFVRk1MRWRCUVZORExFVkJRVVZFTEVOQlFXWXNSVUZCYTBJN1FVRkJSU3gxUWtGQlR5eERRVUZETEVOQlFWSTdRVUZCVnp0QlFVTXZRaXhuUWtGQlNTeExRVUZMUVN4RFFVRk1MRWRCUVZORExFVkJRVVZFTEVOQlFXWXNSVUZCYTBJN1FVRkJSU3gxUWtGQlR5eERRVUZRTzBGQlFWYzdRVUZETDBJN1FVRkRRU3h0UWtGQlR5eERRVUZRTzBGQlEwZzdPenM3T3p0QlFVTktPenRCUVVWRVNTeFBRVUZQUXl4UFFVRlFMRWRCUVdsQ1dDeE5RVUZxUWlJc0ltWnBiR1VpT2lKMGNtbHdiR1V1YW5NaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SW5kWE5sSUhOMGNtbGpkQ2M3WEc1Y2JpOHFLbHh1SUNvZ1ZISnBjR3hsSUhSb1lYUWdZMjl1ZEdGcGJuTWdQSEJoZEdnN0lITnBkR1U3SUdOdmRXNTBaWEkrTGlCSlpHVnVkR2xtYVdWeWN5QnZaaUJNVTBWUklHRnlaU0JzYVhOMGN5QnZabHh1SUNvZ2RISnBjR3hsY3k1Y2JpQXFMMXh1WTJ4aGMzTWdWSEpwY0d4bElIdGNibHh1SUNBZ0lDOHFLbHh1SUNBZ0lDQXFJRUJ3WVhKaGJTQjdUblZ0WW1WeWZTQndZWFJvSUZSb1pTQndZWEowSUc5bUlIUm9aU0J3WVhSb0lHbHVJSFJvWlNCMGNtVmxMbHh1SUNBZ0lDQXFJRUJ3WVhKaGJTQjdUblZ0WW1WeWZGTjBjbWx1WjMwZ2MybDBaU0JVYUdVZ2RXNXBjWFZsSUhOcGRHVWdhV1JsYm5ScFptbGxjaUIwYUdGMElHTnlaV0YwWldRZ2RHaGxYRzRnSUNBZ0lDb2dkSEpwY0d4bExseHVJQ0FnSUNBcUlFQndZWEpoYlNCN1RuVnRZbVZ5ZlNCamIzVnVkR1Z5SUZSb1pTQnNiMk5oYkNCamIzVnVkR1Z5SUc5bUlIUm9aU0J6YVhSbElIZG9aVzRnYVhRZ1kzSmxZWFJsWkNCMGFHVmNiaUFnSUNBZ0tpQjBjbWx3YkdVdVhHNGdJQ0FnSUNvdklDQWdJQ0FnSUZ4dUlDQWdJR052Ym5OMGNuVmpkRzl5SUNod1lYUm9MQ0J6YVhSbExDQmpiM1Z1ZEdWeUtTQjdYRzRnSUNBZ0lDQWdJSFJvYVhNdWNDQTlJSEJoZEdnN1hHNGdJQ0FnSUNBZ0lIUm9hWE11Y3lBOUlITnBkR1U3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVZeUE5SUdOdmRXNTBaWEk3WEc0Z0lDQWdmVHRjYmx4dUlDQWdJQzhxS2x4dUlDQWdJQ0FxSUVOdmJYQmhjbVVnZEhkdklIUnlhWEJzWlhNZ2NISnBiM0pwZEdsNmFXNW5JSFJvWlNCd1lYUm9MQ0IwYUdWdUlITnBkR1VzSUhSb1pXNGdZMjkxYm5SbGNpNWNiaUFnSUNBZ0tpQkFjR0Z5WVcwZ2UxUnlhWEJzWlgwZ2J5QjBhR1VnYjNSb1pYSWdkSEpwY0d4bElIUnZJR052YlhCaGNtVWdMbHh1SUNBZ0lDQXFJRUJ5WlhSMWNtNXpJSHRPZFcxaVpYSjlJQzB4SUdsbUlIUm9hWE1nYVhNZ2JHOTNaWElnZEdoaGJpQnZMQ0F4SUdsbUlIUm9hWE1nYVhNZ1ozSmxZWFJsY2lCMGFHRnVYRzRnSUNBZ0lDb2dieXdnTUNCdmRHaGxjbmRwYzJVdVhHNGdJQ0FnSUNvdlhHNGdJQ0FnWTI5dGNHRnlaVlJ2SUNodktTQjdYRzRnSUNBZ0lDQWdJQzh2SUNNeElIQnliMk5sYzNNZ2JXRjRhVzFoYkNCMmFYSjBkV0ZzSUdKdmRXNWtjMXh1SUNBZ0lDQWdJQ0JwWmlBb2RHaHBjeTV6SUQwOVBTQk9kVzFpWlhJdVRVRllYMVpCVEZWRklDWW1JSFJvYVhNdVl5QTlQVDBnVG5WdFltVnlMazFCV0Y5V1FVeFZSU2w3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z01UdGNiaUFnSUNBZ0lDQWdmVHRjYmlBZ0lDQWdJQ0FnYVdZZ0tHOHVjeUE5UFQwZ1RuVnRZbVZ5TGsxQldGOVdRVXhWUlNBbUppQnZMbk1nUFQwOUlFNTFiV0psY2k1TlFWaGZWa0ZNVlVVcGUxeHVJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJQzB4TzF4dUlDQWdJQ0FnSUNCOU8xeHVJQ0FnSUNBZ0lDQXZMeUFqTWlCamIyMXdZWEpsSUhBZ2RHaGxiaUJ6SUhSb1pXNGdZMXh1SUNBZ0lDQWdJQ0JwWmlBb2RHaHBjeTV3SUR3Z2J5NXdLU0I3SUhKbGRIVnliaUF0TVR0OU8xeHVJQ0FnSUNBZ0lDQnBaaUFvZEdocGN5NXdJRDRnYnk1d0tTQjdJSEpsZEhWeWJpQXhJRHQ5TzF4dUlDQWdJQ0FnSUNCcFppQW9kR2hwY3k1eklEd2dieTV6S1NCN0lISmxkSFZ5YmlBdE1UdDlPMXh1SUNBZ0lDQWdJQ0JwWmlBb2RHaHBjeTV6SUQ0Z2J5NXpLU0I3SUhKbGRIVnliaUF4SUR0OU8xeHVJQ0FnSUNBZ0lDQnBaaUFvZEdocGN5NWpJRHdnYnk1aktTQjdJSEpsZEhWeWJpQXRNVHQ5TzF4dUlDQWdJQ0FnSUNCcFppQW9kR2hwY3k1aklENGdieTVqS1NCN0lISmxkSFZ5YmlBeElEdDlPMXh1SUNBZ0lDQWdJQ0F2THlBak15QjBhR1Y1SUdGeVpTQmxjWFZoYkZ4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnTUR0Y2JpQWdJQ0I5TzF4dWZUdGNibHh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0JVY21sd2JHVTdYRzRpWFgwPSIsIi8vIFZqZXV4OiBDdXN0b21pemVkIGJpZ0ludDJzdHIgYW5kIHN0cjJiaWdJbnQgaW4gb3JkZXIgdG8gYWNjZXB0IGN1c3RvbSBiYXNlLlxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBCaWcgSW50ZWdlciBMaWJyYXJ5IHYuIDUuNFxuLy8gQ3JlYXRlZCAyMDAwLCBsYXN0IG1vZGlmaWVkIDIwMDlcbi8vIExlZW1vbiBCYWlyZFxuLy8gd3d3LmxlZW1vbi5jb21cbi8vXG4vLyBWZXJzaW9uIGhpc3Rvcnk6XG4vLyB2IDUuNCAgMyBPY3QgMjAwOVxuLy8gICAtIGFkZGVkIFwidmFyIGlcIiB0byBncmVhdGVyU2hpZnQoKSBzbyBpIGlzIG5vdCBnbG9iYWwuIChUaGFua3MgdG8gUO+/vXRlciBTemFi77+9IGZvciBmaW5kaW5nIHRoYXQgYnVnKVxuLy9cbi8vIHYgNS4zICAyMSBTZXAgMjAwOVxuLy8gICAtIGFkZGVkIHJhbmRQcm9iUHJpbWUoaykgZm9yIHByb2JhYmxlIHByaW1lc1xuLy8gICAtIHVucm9sbGVkIGxvb3AgaW4gbW9udF8gKHNsaWdodGx5IGZhc3Rlcilcbi8vICAgLSBtaWxsZXJSYWJpbiBub3cgdGFrZXMgYSBiaWdJbnQgcGFyYW1ldGVyIHJhdGhlciB0aGFuIGFuIGludFxuLy9cbi8vIHYgNS4yICAxNSBTZXAgMjAwOVxuLy8gICAtIGZpeGVkIGNhcGl0YWxpemF0aW9uIGluIGNhbGwgdG8gaW50MmJpZ0ludCBpbiByYW5kQmlnSW50XG4vLyAgICAgKHRoYW5rcyB0byBFbWlsaSBFdnJpcGlkb3UsIFJlaW5ob2xkIEJlaHJpbmdlciwgYW5kIFNhbXVlbCBNYWNhbGVlc2UgZm9yIGZpbmRpbmcgdGhhdCBidWcpXG4vL1xuLy8gdiA1LjEgIDggT2N0IDIwMDdcbi8vICAgLSByZW5hbWVkIGludmVyc2VNb2RJbnRfIHRvIGludmVyc2VNb2RJbnQgc2luY2UgaXQgZG9lc24ndCBjaGFuZ2UgaXRzIHBhcmFtZXRlcnNcbi8vICAgLSBhZGRlZCBmdW5jdGlvbnMgR0NEIGFuZCByYW5kQmlnSW50LCB3aGljaCBjYWxsIEdDRF8gYW5kIHJhbmRCaWdJbnRfXG4vLyAgIC0gZml4ZWQgYSBidWcgZm91bmQgYnkgUm9iIFZpc3NlciAoc2VlIGNvbW1lbnQgd2l0aCBoaXMgbmFtZSBiZWxvdylcbi8vICAgLSBpbXByb3ZlZCBjb21tZW50c1xuLy9cbi8vIFRoaXMgZmlsZSBpcyBwdWJsaWMgZG9tYWluLiAgIFlvdSBjYW4gdXNlIGl0IGZvciBhbnkgcHVycG9zZSB3aXRob3V0IHJlc3RyaWN0aW9uLlxuLy8gSSBkbyBub3QgZ3VhcmFudGVlIHRoYXQgaXQgaXMgY29ycmVjdCwgc28gdXNlIGl0IGF0IHlvdXIgb3duIHJpc2suICBJZiB5b3UgdXNlXG4vLyBpdCBmb3Igc29tZXRoaW5nIGludGVyZXN0aW5nLCBJJ2QgYXBwcmVjaWF0ZSBoZWFyaW5nIGFib3V0IGl0LiAgSWYgeW91IGZpbmRcbi8vIGFueSBidWdzIG9yIG1ha2UgYW55IGltcHJvdmVtZW50cywgSSdkIGFwcHJlY2lhdGUgaGVhcmluZyBhYm91dCB0aG9zZSB0b28uXG4vLyBJdCB3b3VsZCBhbHNvIGJlIG5pY2UgaWYgbXkgbmFtZSBhbmQgVVJMIHdlcmUgbGVmdCBpbiB0aGUgY29tbWVudHMuICBCdXQgbm9uZVxuLy8gb2YgdGhhdCBpcyByZXF1aXJlZC5cbi8vXG4vLyBUaGlzIGNvZGUgZGVmaW5lcyBhIGJpZ0ludCBsaWJyYXJ5IGZvciBhcmJpdHJhcnktcHJlY2lzaW9uIGludGVnZXJzLlxuLy8gQSBiaWdJbnQgaXMgYW4gYXJyYXkgb2YgaW50ZWdlcnMgc3RvcmluZyB0aGUgdmFsdWUgaW4gY2h1bmtzIG9mIGJwZSBiaXRzLFxuLy8gbGl0dGxlIGVuZGlhbiAoYnVmZlswXSBpcyB0aGUgbGVhc3Qgc2lnbmlmaWNhbnQgd29yZCkuXG4vLyBOZWdhdGl2ZSBiaWdJbnRzIGFyZSBzdG9yZWQgdHdvJ3MgY29tcGxlbWVudC4gIEFsbW9zdCBhbGwgdGhlIGZ1bmN0aW9ucyB0cmVhdFxuLy8gYmlnSW50cyBhcyBub25uZWdhdGl2ZS4gIFRoZSBmZXcgdGhhdCB2aWV3IHRoZW0gYXMgdHdvJ3MgY29tcGxlbWVudCBzYXkgc29cbi8vIGluIHRoZWlyIGNvbW1lbnRzLiAgU29tZSBmdW5jdGlvbnMgYXNzdW1lIHRoZWlyIHBhcmFtZXRlcnMgaGF2ZSBhdCBsZWFzdCBvbmVcbi8vIGxlYWRpbmcgemVybyBlbGVtZW50LiBGdW5jdGlvbnMgd2l0aCBhbiB1bmRlcnNjb3JlIGF0IHRoZSBlbmQgb2YgdGhlIG5hbWUgcHV0XG4vLyB0aGVpciBhbnN3ZXIgaW50byBvbmUgb2YgdGhlIGFycmF5cyBwYXNzZWQgaW4sIGFuZCBoYXZlIHVucHJlZGljdGFibGUgYmVoYXZpb3Jcbi8vIGluIGNhc2Ugb2Ygb3ZlcmZsb3csIHNvIHRoZSBjYWxsZXIgbXVzdCBtYWtlIHN1cmUgdGhlIGFycmF5cyBhcmUgYmlnIGVub3VnaCB0b1xuLy8gaG9sZCB0aGUgYW5zd2VyLiAgQnV0IHRoZSBhdmVyYWdlIHVzZXIgc2hvdWxkIG5ldmVyIGhhdmUgdG8gY2FsbCBhbnkgb2YgdGhlXG4vLyB1bmRlcnNjb3JlZCBmdW5jdGlvbnMuICBFYWNoIGltcG9ydGFudCB1bmRlcnNjb3JlZCBmdW5jdGlvbiBoYXMgYSB3cmFwcGVyIGZ1bmN0aW9uXG4vLyBvZiB0aGUgc2FtZSBuYW1lIHdpdGhvdXQgdGhlIHVuZGVyc2NvcmUgdGhhdCB0YWtlcyBjYXJlIG9mIHRoZSBkZXRhaWxzIGZvciB5b3UuXG4vLyBGb3IgZWFjaCB1bmRlcnNjb3JlZCBmdW5jdGlvbiB3aGVyZSBhIHBhcmFtZXRlciBpcyBtb2RpZmllZCwgdGhhdCBzYW1lIHZhcmlhYmxlXG4vLyBtdXN0IG5vdCBiZSB1c2VkIGFzIGFub3RoZXIgYXJndW1lbnQgdG9vLiAgU28sIHlvdSBjYW5ub3Qgc3F1YXJlIHggYnkgZG9pbmdcbi8vIG11bHRNb2RfKHgseCxuKS4gIFlvdSBtdXN0IHVzZSBzcXVhcmVNb2RfKHgsbikgaW5zdGVhZCwgb3IgZG8geT1kdXAoeCk7IG11bHRNb2RfKHgseSxuKS5cbi8vIE9yIHNpbXBseSB1c2UgdGhlIG11bHRNb2QoeCx4LG4pIGZ1bmN0aW9uIHdpdGhvdXQgdGhlIHVuZGVyc2NvcmUsIHdoZXJlXG4vLyBzdWNoIGlzc3VlcyBuZXZlciBhcmlzZSwgYmVjYXVzZSBub24tdW5kZXJzY29yZWQgZnVuY3Rpb25zIG5ldmVyIGNoYW5nZVxuLy8gdGhlaXIgcGFyYW1ldGVyczsgdGhleSBhbHdheXMgYWxsb2NhdGUgbmV3IG1lbW9yeSBmb3IgdGhlIGFuc3dlciB0aGF0IGlzIHJldHVybmVkLlxuLy9cbi8vIFRoZXNlIGZ1bmN0aW9ucyBhcmUgZGVzaWduZWQgdG8gYXZvaWQgZnJlcXVlbnQgZHluYW1pYyBtZW1vcnkgYWxsb2NhdGlvbiBpbiB0aGUgaW5uZXIgbG9vcC5cbi8vIEZvciBtb3N0IGZ1bmN0aW9ucywgaWYgaXQgbmVlZHMgYSBCaWdJbnQgYXMgYSBsb2NhbCB2YXJpYWJsZSBpdCB3aWxsIGFjdHVhbGx5IHVzZVxuLy8gYSBnbG9iYWwsIGFuZCB3aWxsIG9ubHkgYWxsb2NhdGUgdG8gaXQgb25seSB3aGVuIGl0J3Mgbm90IHRoZSByaWdodCBzaXplLiAgVGhpcyBlbnN1cmVzXG4vLyB0aGF0IHdoZW4gYSBmdW5jdGlvbiBpcyBjYWxsZWQgcmVwZWF0ZWRseSB3aXRoIHNhbWUtc2l6ZWQgcGFyYW1ldGVycywgaXQgb25seSBhbGxvY2F0ZXNcbi8vIG1lbW9yeSBvbiB0aGUgZmlyc3QgY2FsbC5cbi8vXG4vLyBOb3RlIHRoYXQgZm9yIGNyeXB0b2dyYXBoaWMgcHVycG9zZXMsIHRoZSBjYWxscyB0byBNYXRoLnJhbmRvbSgpIG11c3Rcbi8vIGJlIHJlcGxhY2VkIHdpdGggY2FsbHMgdG8gYSBiZXR0ZXIgcHNldWRvcmFuZG9tIG51bWJlciBnZW5lcmF0b3IuXG4vL1xuLy8gSW4gdGhlIGZvbGxvd2luZywgXCJiaWdJbnRcIiBtZWFucyBhIGJpZ0ludCB3aXRoIGF0IGxlYXN0IG9uZSBsZWFkaW5nIHplcm8gZWxlbWVudCxcbi8vIGFuZCBcImludGVnZXJcIiBtZWFucyBhIG5vbm5lZ2F0aXZlIGludGVnZXIgbGVzcyB0aGFuIHJhZGl4LiAgSW4gc29tZSBjYXNlcywgaW50ZWdlclxuLy8gY2FuIGJlIG5lZ2F0aXZlLiAgTmVnYXRpdmUgYmlnSW50cyBhcmUgMnMgY29tcGxlbWVudC5cbi8vXG4vLyBUaGUgZm9sbG93aW5nIGZ1bmN0aW9ucyBkbyBub3QgbW9kaWZ5IHRoZWlyIGlucHV0cy5cbi8vIFRob3NlIHJldHVybmluZyBhIGJpZ0ludCwgc3RyaW5nLCBvciBBcnJheSB3aWxsIGR5bmFtaWNhbGx5IGFsbG9jYXRlIG1lbW9yeSBmb3IgdGhhdCB2YWx1ZS5cbi8vIFRob3NlIHJldHVybmluZyBhIGJvb2xlYW4gd2lsbCByZXR1cm4gdGhlIGludGVnZXIgMCAoZmFsc2UpIG9yIDEgKHRydWUpLlxuLy8gVGhvc2UgcmV0dXJuaW5nIGJvb2xlYW4gb3IgaW50IHdpbGwgbm90IGFsbG9jYXRlIG1lbW9yeSBleGNlcHQgcG9zc2libHkgb24gdGhlIGZpcnN0XG4vLyB0aW1lIHRoZXkncmUgY2FsbGVkIHdpdGggYSBnaXZlbiBwYXJhbWV0ZXIgc2l6ZS5cbi8vXG4vLyBiaWdJbnQgIGFkZCh4LHkpICAgICAgICAgICAgICAgLy9yZXR1cm4gKHgreSkgZm9yIGJpZ0ludHMgeCBhbmQgeS5cbi8vIGJpZ0ludCAgYWRkSW50KHgsbikgICAgICAgICAgICAvL3JldHVybiAoeCtuKSB3aGVyZSB4IGlzIGEgYmlnSW50IGFuZCBuIGlzIGFuIGludGVnZXIuXG4vLyBzdHJpbmcgIGJpZ0ludDJzdHIoeCxiYXNlKSAgICAgLy9yZXR1cm4gYSBzdHJpbmcgZm9ybSBvZiBiaWdJbnQgeCBpbiBhIGdpdmVuIGJhc2UsIHdpdGggMiA8PSBiYXNlIDw9IDk1XG4vLyBpbnQgICAgIGJpdFNpemUoeCkgICAgICAgICAgICAgLy9yZXR1cm4gaG93IG1hbnkgYml0cyBsb25nIHRoZSBiaWdJbnQgeCBpcywgbm90IGNvdW50aW5nIGxlYWRpbmcgemVyb3Ncbi8vIGJpZ0ludCAgZHVwKHgpICAgICAgICAgICAgICAgICAvL3JldHVybiBhIGNvcHkgb2YgYmlnSW50IHhcbi8vIGJvb2xlYW4gZXF1YWxzKHgseSkgICAgICAgICAgICAvL2lzIHRoZSBiaWdJbnQgeCBlcXVhbCB0byB0aGUgYmlnaW50IHk/XG4vLyBib29sZWFuIGVxdWFsc0ludCh4LHkpICAgICAgICAgLy9pcyBiaWdpbnQgeCBlcXVhbCB0byBpbnRlZ2VyIHk/XG4vLyBiaWdJbnQgIGV4cGFuZCh4LG4pICAgICAgICAgICAgLy9yZXR1cm4gYSBjb3B5IG9mIHggd2l0aCBhdCBsZWFzdCBuIGVsZW1lbnRzLCBhZGRpbmcgbGVhZGluZyB6ZXJvcyBpZiBuZWVkZWRcbi8vIEFycmF5ICAgZmluZFByaW1lcyhuKSAgICAgICAgICAvL3JldHVybiBhcnJheSBvZiBhbGwgcHJpbWVzIGxlc3MgdGhhbiBpbnRlZ2VyIG5cbi8vIGJpZ0ludCAgR0NEKHgseSkgICAgICAgICAgICAgICAvL3JldHVybiBncmVhdGVzdCBjb21tb24gZGl2aXNvciBvZiBiaWdJbnRzIHggYW5kIHkgKGVhY2ggd2l0aCBzYW1lIG51bWJlciBvZiBlbGVtZW50cykuXG4vLyBib29sZWFuIGdyZWF0ZXIoeCx5KSAgICAgICAgICAgLy9pcyB4Pnk/ICAoeCBhbmQgeSBhcmUgbm9ubmVnYXRpdmUgYmlnSW50cylcbi8vIGJvb2xlYW4gZ3JlYXRlclNoaWZ0KHgseSxzaGlmdCkvL2lzICh4IDw8KHNoaWZ0KmJwZSkpID4geT9cbi8vIGJpZ0ludCAgaW50MmJpZ0ludCh0LG4sbSkgICAgICAvL3JldHVybiBhIGJpZ0ludCBlcXVhbCB0byBpbnRlZ2VyIHQsIHdpdGggYXQgbGVhc3QgbiBiaXRzIGFuZCBtIGFycmF5IGVsZW1lbnRzXG4vLyBiaWdJbnQgIGludmVyc2VNb2QoeCxuKSAgICAgICAgLy9yZXR1cm4gKHgqKigtMSkgbW9kIG4pIGZvciBiaWdJbnRzIHggYW5kIG4uICBJZiBubyBpbnZlcnNlIGV4aXN0cywgaXQgcmV0dXJucyBudWxsXG4vLyBpbnQgICAgIGludmVyc2VNb2RJbnQoeCxuKSAgICAgLy9yZXR1cm4geCoqKC0xKSBtb2QgbiwgZm9yIGludGVnZXJzIHggYW5kIG4uICBSZXR1cm4gMCBpZiB0aGVyZSBpcyBubyBpbnZlcnNlXG4vLyBib29sZWFuIGlzWmVybyh4KSAgICAgICAgICAgICAgLy9pcyB0aGUgYmlnSW50IHggZXF1YWwgdG8gemVybz9cbi8vIGJvb2xlYW4gbWlsbGVyUmFiaW4oeCxiKSAgICAgICAvL2RvZXMgb25lIHJvdW5kIG9mIE1pbGxlci1SYWJpbiBiYXNlIGludGVnZXIgYiBzYXkgdGhhdCBiaWdJbnQgeCBpcyBwb3NzaWJseSBwcmltZT8gKGIgaXMgYmlnSW50LCAxPGI8eClcbi8vIGJvb2xlYW4gbWlsbGVyUmFiaW5JbnQoeCxiKSAgICAvL2RvZXMgb25lIHJvdW5kIG9mIE1pbGxlci1SYWJpbiBiYXNlIGludGVnZXIgYiBzYXkgdGhhdCBiaWdJbnQgeCBpcyBwb3NzaWJseSBwcmltZT8gKGIgaXMgaW50LCAgICAxPGI8eClcbi8vIGJpZ0ludCAgbW9kKHgsbikgICAgICAgICAgICAgICAvL3JldHVybiBhIG5ldyBiaWdJbnQgZXF1YWwgdG8gKHggbW9kIG4pIGZvciBiaWdJbnRzIHggYW5kIG4uXG4vLyBpbnQgICAgIG1vZEludCh4LG4pICAgICAgICAgICAgLy9yZXR1cm4geCBtb2QgbiBmb3IgYmlnSW50IHggYW5kIGludGVnZXIgbi5cbi8vIGJpZ0ludCAgbXVsdCh4LHkpICAgICAgICAgICAgICAvL3JldHVybiB4KnkgZm9yIGJpZ0ludHMgeCBhbmQgeS4gVGhpcyBpcyBmYXN0ZXIgd2hlbiB5PHguXG4vLyBiaWdJbnQgIG11bHRNb2QoeCx5LG4pICAgICAgICAgLy9yZXR1cm4gKHgqeSBtb2QgbikgZm9yIGJpZ0ludHMgeCx5LG4uICBGb3IgZ3JlYXRlciBzcGVlZCwgbGV0IHk8eC5cbi8vIGJvb2xlYW4gbmVnYXRpdmUoeCkgICAgICAgICAgICAvL2lzIGJpZ0ludCB4IG5lZ2F0aXZlP1xuLy8gYmlnSW50ICBwb3dNb2QoeCx5LG4pICAgICAgICAgIC8vcmV0dXJuICh4Kip5IG1vZCBuKSB3aGVyZSB4LHksbiBhcmUgYmlnSW50cyBhbmQgKiogaXMgZXhwb25lbnRpYXRpb24uICAwKiowPTEuIEZhc3RlciBmb3Igb2RkIG4uXG4vLyBiaWdJbnQgIHJhbmRCaWdJbnQobixzKSAgICAgICAgLy9yZXR1cm4gYW4gbi1iaXQgcmFuZG9tIEJpZ0ludCAobj49MSkuICBJZiBzPTEsIHRoZW4gdGhlIG1vc3Qgc2lnbmlmaWNhbnQgb2YgdGhvc2UgbiBiaXRzIGlzIHNldCB0byAxLlxuLy8gYmlnSW50ICByYW5kVHJ1ZVByaW1lKGspICAgICAgIC8vcmV0dXJuIGEgbmV3LCByYW5kb20sIGstYml0LCB0cnVlIHByaW1lIGJpZ0ludCB1c2luZyBNYXVyZXIncyBhbGdvcml0aG0uXG4vLyBiaWdJbnQgIHJhbmRQcm9iUHJpbWUoaykgICAgICAgLy9yZXR1cm4gYSBuZXcsIHJhbmRvbSwgay1iaXQsIHByb2JhYmxlIHByaW1lIGJpZ0ludCAocHJvYmFiaWxpdHkgaXQncyBjb21wb3NpdGUgbGVzcyB0aGFuIDJeLTgwKS5cbi8vIGJpZ0ludCAgc3RyMmJpZ0ludChzLGIsbixtKSAgICAvL3JldHVybiBhIGJpZ0ludCBmb3IgbnVtYmVyIHJlcHJlc2VudGVkIGluIHN0cmluZyBzIGluIGJhc2UgYiB3aXRoIGF0IGxlYXN0IG4gYml0cyBhbmQgbSBhcnJheSBlbGVtZW50c1xuLy8gYmlnSW50ICBzdWIoeCx5KSAgICAgICAgICAgICAgIC8vcmV0dXJuICh4LXkpIGZvciBiaWdJbnRzIHggYW5kIHkuICBOZWdhdGl2ZSBhbnN3ZXJzIHdpbGwgYmUgMnMgY29tcGxlbWVudFxuLy8gYmlnSW50ICB0cmltKHgsaykgICAgICAgICAgICAgIC8vcmV0dXJuIGEgY29weSBvZiB4IHdpdGggZXhhY3RseSBrIGxlYWRpbmcgemVybyBlbGVtZW50c1xuLy9cbi8vXG4vLyBUaGUgZm9sbG93aW5nIGZ1bmN0aW9ucyBlYWNoIGhhdmUgYSBub24tdW5kZXJzY29yZWQgdmVyc2lvbiwgd2hpY2ggbW9zdCB1c2VycyBzaG91bGQgY2FsbCBpbnN0ZWFkLlxuLy8gVGhlc2UgZnVuY3Rpb25zIGVhY2ggd3JpdGUgdG8gYSBzaW5nbGUgcGFyYW1ldGVyLCBhbmQgdGhlIGNhbGxlciBpcyByZXNwb25zaWJsZSBmb3IgZW5zdXJpbmcgdGhlIGFycmF5XG4vLyBwYXNzZWQgaW4gaXMgbGFyZ2UgZW5vdWdoIHRvIGhvbGQgdGhlIHJlc3VsdC5cbi8vXG4vLyB2b2lkICAgIGFkZEludF8oeCxuKSAgICAgICAgICAvL2RvIHg9eCtuIHdoZXJlIHggaXMgYSBiaWdJbnQgYW5kIG4gaXMgYW4gaW50ZWdlclxuLy8gdm9pZCAgICBhZGRfKHgseSkgICAgICAgICAgICAgLy9kbyB4PXgreSBmb3IgYmlnSW50cyB4IGFuZCB5XG4vLyB2b2lkICAgIGNvcHlfKHgseSkgICAgICAgICAgICAvL2RvIHg9eSBvbiBiaWdJbnRzIHggYW5kIHlcbi8vIHZvaWQgICAgY29weUludF8oeCxuKSAgICAgICAgIC8vZG8geD1uIG9uIGJpZ0ludCB4IGFuZCBpbnRlZ2VyIG5cbi8vIHZvaWQgICAgR0NEXyh4LHkpICAgICAgICAgICAgIC8vc2V0IHggdG8gdGhlIGdyZWF0ZXN0IGNvbW1vbiBkaXZpc29yIG9mIGJpZ0ludHMgeCBhbmQgeSwgKHkgaXMgZGVzdHJveWVkKS4gIChUaGlzIG5ldmVyIG92ZXJmbG93cyBpdHMgYXJyYXkpLlxuLy8gYm9vbGVhbiBpbnZlcnNlTW9kXyh4LG4pICAgICAgLy9kbyB4PXgqKigtMSkgbW9kIG4sIGZvciBiaWdJbnRzIHggYW5kIG4uIFJldHVybnMgMSAoMCkgaWYgaW52ZXJzZSBkb2VzIChkb2Vzbid0KSBleGlzdFxuLy8gdm9pZCAgICBtb2RfKHgsbikgICAgICAgICAgICAgLy9kbyB4PXggbW9kIG4gZm9yIGJpZ0ludHMgeCBhbmQgbi4gKFRoaXMgbmV2ZXIgb3ZlcmZsb3dzIGl0cyBhcnJheSkuXG4vLyB2b2lkICAgIG11bHRfKHgseSkgICAgICAgICAgICAvL2RvIHg9eCp5IGZvciBiaWdJbnRzIHggYW5kIHkuXG4vLyB2b2lkICAgIG11bHRNb2RfKHgseSxuKSAgICAgICAvL2RvIHg9eCp5ICBtb2QgbiBmb3IgYmlnSW50cyB4LHksbi5cbi8vIHZvaWQgICAgcG93TW9kXyh4LHksbikgICAgICAgIC8vZG8geD14Kip5IG1vZCBuLCB3aGVyZSB4LHksbiBhcmUgYmlnSW50cyAobiBpcyBvZGQpIGFuZCAqKiBpcyBleHBvbmVudGlhdGlvbi4gIDAqKjA9MS5cbi8vIHZvaWQgICAgcmFuZEJpZ0ludF8oYixuLHMpICAgIC8vZG8gYiA9IGFuIG4tYml0IHJhbmRvbSBCaWdJbnQuIGlmIHM9MSwgdGhlbiBudGggYml0IChtb3N0IHNpZ25pZmljYW50IGJpdCkgaXMgc2V0IHRvIDEuIG4+PTEuXG4vLyB2b2lkICAgIHJhbmRUcnVlUHJpbWVfKGFucyxrKSAvL2RvIGFucyA9IGEgcmFuZG9tIGstYml0IHRydWUgcmFuZG9tIHByaW1lIChub3QganVzdCBwcm9iYWJsZSBwcmltZSkgd2l0aCAxIGluIHRoZSBtc2IuXG4vLyB2b2lkICAgIHN1Yl8oeCx5KSAgICAgICAgICAgICAvL2RvIHg9eC15IGZvciBiaWdJbnRzIHggYW5kIHkuIE5lZ2F0aXZlIGFuc3dlcnMgd2lsbCBiZSAycyBjb21wbGVtZW50LlxuLy9cbi8vIFRoZSBmb2xsb3dpbmcgZnVuY3Rpb25zIGRvIE5PVCBoYXZlIGEgbm9uLXVuZGVyc2NvcmVkIHZlcnNpb24uXG4vLyBUaGV5IGVhY2ggd3JpdGUgYSBiaWdJbnQgcmVzdWx0IHRvIG9uZSBvciBtb3JlIHBhcmFtZXRlcnMuICBUaGUgY2FsbGVyIGlzIHJlc3BvbnNpYmxlIGZvclxuLy8gZW5zdXJpbmcgdGhlIGFycmF5cyBwYXNzZWQgaW4gYXJlIGxhcmdlIGVub3VnaCB0byBob2xkIHRoZSByZXN1bHRzLlxuLy9cbi8vIHZvaWQgYWRkU2hpZnRfKHgseSx5cykgICAgICAgLy9kbyB4PXgrKHk8PCh5cypicGUpKVxuLy8gdm9pZCBjYXJyeV8oeCkgICAgICAgICAgICAgICAvL2RvIGNhcnJpZXMgYW5kIGJvcnJvd3Mgc28gZWFjaCBlbGVtZW50IG9mIHRoZSBiaWdJbnQgeCBmaXRzIGluIGJwZSBiaXRzLlxuLy8gdm9pZCBkaXZpZGVfKHgseSxxLHIpICAgICAgICAvL2RpdmlkZSB4IGJ5IHkgZ2l2aW5nIHF1b3RpZW50IHEgYW5kIHJlbWFpbmRlciByXG4vLyBpbnQgIGRpdkludF8oeCxuKSAgICAgICAgICAgIC8vZG8geD1mbG9vcih4L24pIGZvciBiaWdJbnQgeCBhbmQgaW50ZWdlciBuLCBhbmQgcmV0dXJuIHRoZSByZW1haW5kZXIuIChUaGlzIG5ldmVyIG92ZXJmbG93cyBpdHMgYXJyYXkpLlxuLy8gaW50ICBlR0NEXyh4LHksZCxhLGIpICAgICAgICAvL3NldHMgYSxiLGQgdG8gcG9zaXRpdmUgYmlnSW50cyBzdWNoIHRoYXQgZCA9IEdDRF8oeCx5KSA9IGEqeC1iKnlcbi8vIHZvaWQgaGFsdmVfKHgpICAgICAgICAgICAgICAgLy9kbyB4PWZsb29yKHx4fC8yKSpzZ24oeCkgZm9yIGJpZ0ludCB4IGluIDIncyBjb21wbGVtZW50LiAgKFRoaXMgbmV2ZXIgb3ZlcmZsb3dzIGl0cyBhcnJheSkuXG4vLyB2b2lkIGxlZnRTaGlmdF8oeCxuKSAgICAgICAgIC8vbGVmdCBzaGlmdCBiaWdJbnQgeCBieSBuIGJpdHMuICBuPGJwZS5cbi8vIHZvaWQgbGluQ29tYl8oeCx5LGEsYikgICAgICAgLy9kbyB4PWEqeCtiKnkgZm9yIGJpZ0ludHMgeCBhbmQgeSBhbmQgaW50ZWdlcnMgYSBhbmQgYlxuLy8gdm9pZCBsaW5Db21iU2hpZnRfKHgseSxiLHlzKSAvL2RvIHg9eCtiKih5PDwoeXMqYnBlKSkgZm9yIGJpZ0ludHMgeCBhbmQgeSwgYW5kIGludGVnZXJzIGIgYW5kIHlzXG4vLyB2b2lkIG1vbnRfKHgseSxuLG5wKSAgICAgICAgIC8vTW9udGdvbWVyeSBtdWx0aXBsaWNhdGlvbiAoc2VlIGNvbW1lbnRzIHdoZXJlIHRoZSBmdW5jdGlvbiBpcyBkZWZpbmVkKVxuLy8gdm9pZCBtdWx0SW50Xyh4LG4pICAgICAgICAgICAvL2RvIHg9eCpuIHdoZXJlIHggaXMgYSBiaWdJbnQgYW5kIG4gaXMgYW4gaW50ZWdlci5cbi8vIHZvaWQgcmlnaHRTaGlmdF8oeCxuKSAgICAgICAgLy9yaWdodCBzaGlmdCBiaWdJbnQgeCBieSBuIGJpdHMuICAwIDw9IG4gPCBicGUuIChUaGlzIG5ldmVyIG92ZXJmbG93cyBpdHMgYXJyYXkpLlxuLy8gdm9pZCBzcXVhcmVNb2RfKHgsbikgICAgICAgICAvL2RvIHg9eCp4ICBtb2QgbiBmb3IgYmlnSW50cyB4LG5cbi8vIHZvaWQgc3ViU2hpZnRfKHgseSx5cykgICAgICAgLy9kbyB4PXgtKHk8PCh5cypicGUpKS4gTmVnYXRpdmUgYW5zd2VycyB3aWxsIGJlIDJzIGNvbXBsZW1lbnQuXG4vL1xuLy8gVGhlIGZvbGxvd2luZyBmdW5jdGlvbnMgYXJlIGJhc2VkIG9uIGFsZ29yaXRobXMgZnJvbSB0aGUgX0hhbmRib29rIG9mIEFwcGxpZWQgQ3J5cHRvZ3JhcGh5X1xuLy8gICAgcG93TW9kXygpICAgICAgICAgICA9IGFsZ29yaXRobSAxNC45NCwgTW9udGdvbWVyeSBleHBvbmVudGlhdGlvblxuLy8gICAgZUdDRF8saW52ZXJzZU1vZF8oKSA9IGFsZ29yaXRobSAxNC42MSwgQmluYXJ5IGV4dGVuZGVkIEdDRF9cbi8vICAgIEdDRF8oKSAgICAgICAgICAgICAgPSBhbGdvcm90aG0gMTQuNTcsIExlaG1lcidzIGFsZ29yaXRobVxuLy8gICAgbW9udF8oKSAgICAgICAgICAgICA9IGFsZ29yaXRobSAxNC4zNiwgTW9udGdvbWVyeSBtdWx0aXBsaWNhdGlvblxuLy8gICAgZGl2aWRlXygpICAgICAgICAgICA9IGFsZ29yaXRobSAxNC4yMCAgTXVsdGlwbGUtcHJlY2lzaW9uIGRpdmlzaW9uXG4vLyAgICBzcXVhcmVNb2RfKCkgICAgICAgID0gYWxnb3JpdGhtIDE0LjE2ICBNdWx0aXBsZS1wcmVjaXNpb24gc3F1YXJpbmdcbi8vICAgIHJhbmRUcnVlUHJpbWVfKCkgICAgPSBhbGdvcml0aG0gIDQuNjIsIE1hdXJlcidzIGFsZ29yaXRobVxuLy8gICAgbWlsbGVyUmFiaW4oKSAgICAgICA9IGFsZ29yaXRobSAgNC4yNCwgTWlsbGVyLVJhYmluIGFsZ29yaXRobVxuLy9cbi8vIFByb2ZpbGluZyBzaG93czpcbi8vICAgICByYW5kVHJ1ZVByaW1lXygpIHNwZW5kczpcbi8vICAgICAgICAgMTAlIG9mIGl0cyB0aW1lIGluIGNhbGxzIHRvIHBvd01vZF8oKVxuLy8gICAgICAgICA4NSUgb2YgaXRzIHRpbWUgaW4gY2FsbHMgdG8gbWlsbGVyUmFiaW4oKVxuLy8gICAgIG1pbGxlclJhYmluKCkgc3BlbmRzOlxuLy8gICAgICAgICA5OSUgb2YgaXRzIHRpbWUgaW4gY2FsbHMgdG8gcG93TW9kXygpICAgKGFsd2F5cyB3aXRoIGEgYmFzZSBvZiAyKVxuLy8gICAgIHBvd01vZF8oKSBzcGVuZHM6XG4vLyAgICAgICAgIDk0JSBvZiBpdHMgdGltZSBpbiBjYWxscyB0byBtb250XygpICAoYWxtb3N0IGFsd2F5cyB3aXRoIHg9PXkpXG4vL1xuLy8gVGhpcyBzdWdnZXN0cyB0aGVyZSBhcmUgc2V2ZXJhbCB3YXlzIHRvIHNwZWVkIHVwIHRoaXMgbGlicmFyeSBzbGlnaHRseTpcbi8vICAgICAtIGNvbnZlcnQgcG93TW9kXyB0byB1c2UgYSBNb250Z29tZXJ5IGZvcm0gb2Ygay1hcnkgd2luZG93IChvciBtYXliZSBhIE1vbnRnb21lcnkgZm9ybSBvZiBzbGlkaW5nIHdpbmRvdylcbi8vICAgICAgICAgLS0gdGhpcyBzaG91bGQgZXNwZWNpYWxseSBmb2N1cyBvbiBiZWluZyBmYXN0IHdoZW4gcmFpc2luZyAyIHRvIGEgcG93ZXIgbW9kIG5cbi8vICAgICAtIGNvbnZlcnQgcmFuZFRydWVQcmltZV8oKSB0byB1c2UgYSBtaW5pbXVtIHIgb2YgMS8zIGluc3RlYWQgb2YgMS8yIHdpdGggdGhlIGFwcHJvcHJpYXRlIGNoYW5nZSB0byB0aGUgdGVzdFxuLy8gICAgIC0gdHVuZSB0aGUgcGFyYW1ldGVycyBpbiByYW5kVHJ1ZVByaW1lXygpLCBpbmNsdWRpbmcgYywgbSwgYW5kIHJlY0xpbWl0XG4vLyAgICAgLSBzcGVlZCB1cCB0aGUgc2luZ2xlIGxvb3AgaW4gbW9udF8oKSB0aGF0IHRha2VzIDk1JSBvZiB0aGUgcnVudGltZSwgcGVyaGFwcyBieSByZWR1Y2luZyBjaGVja2luZ1xuLy8gICAgICAgd2l0aGluIHRoZSBsb29wIHdoZW4gYWxsIHRoZSBwYXJhbWV0ZXJzIGFyZSB0aGUgc2FtZSBsZW5ndGguXG4vL1xuLy8gVGhlcmUgYXJlIHNldmVyYWwgaWRlYXMgdGhhdCBsb29rIGxpa2UgdGhleSB3b3VsZG4ndCBoZWxwIG11Y2ggYXQgYWxsOlxuLy8gICAgIC0gcmVwbGFjaW5nIHRyaWFsIGRpdmlzaW9uIGluIHJhbmRUcnVlUHJpbWVfKCkgd2l0aCBhIHNpZXZlICh0aGF0IHNwZWVkcyB1cCBzb21ldGhpbmcgdGFraW5nIGFsbW9zdCBubyB0aW1lIGFueXdheSlcbi8vICAgICAtIGluY3JlYXNlIGJwZSBmcm9tIDE1IHRvIDMwICh0aGF0IHdvdWxkIGhlbHAgaWYgd2UgaGFkIGEgMzIqMzItPjY0IG11bHRpcGxpZXIsIGJ1dCBub3Qgd2l0aCBKYXZhU2NyaXB0J3MgMzIqMzItPjMyKVxuLy8gICAgIC0gc3BlZWRpbmcgdXAgbW9udF8oeCx5LG4sbnApIHdoZW4geD09eSBieSBkb2luZyBhIG5vbi1tb2R1bGFyLCBub24tTW9udGdvbWVyeSBzcXVhcmVcbi8vICAgICAgIGZvbGxvd2VkIGJ5IGEgTW9udGdvbWVyeSByZWR1Y3Rpb24uICBUaGUgaW50ZXJtZWRpYXRlIGFuc3dlciB3aWxsIGJlIHR3aWNlIGFzIGxvbmcgYXMgeCwgc28gdGhhdFxuLy8gICAgICAgbWV0aG9kIHdvdWxkIGJlIHNsb3dlci4gIFRoaXMgaXMgdW5mb3J0dW5hdGUgYmVjYXVzZSB0aGUgY29kZSBjdXJyZW50bHkgc3BlbmRzIGFsbW9zdCBhbGwgb2YgaXRzIHRpbWVcbi8vICAgICAgIGRvaW5nIG1vbnRfKHgseCwuLi4pLCBib3RoIGZvciByYW5kVHJ1ZVByaW1lXygpIGFuZCBwb3dNb2RfKCkuICBBIGZhc3RlciBtZXRob2QgZm9yIE1vbnRnb21lcnkgc3F1YXJpbmdcbi8vICAgICAgIHdvdWxkIGhhdmUgYSBsYXJnZSBpbXBhY3Qgb24gdGhlIHNwZWVkIG9mIHJhbmRUcnVlUHJpbWVfKCkgYW5kIHBvd01vZF8oKS4gIEhBQyBoYXMgYSBjb3VwbGUgb2YgcG9vcmx5LXdvcmRlZFxuLy8gICAgICAgc2VudGVuY2VzIHRoYXQgc2VlbSB0byBpbXBseSBpdCdzIGZhc3RlciB0byBkbyBhIG5vbi1tb2R1bGFyIHNxdWFyZSBmb2xsb3dlZCBieSBhIHNpbmdsZVxuLy8gICAgICAgTW9udGdvbWVyeSByZWR1Y3Rpb24sIGJ1dCB0aGF0J3Mgb2J2aW91c2x5IHdyb25nLlxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG4oZnVuY3Rpb24gKCkge1xuLy9nbG9iYWxzXG5icGU9MDsgICAgICAgICAvL2JpdHMgc3RvcmVkIHBlciBhcnJheSBlbGVtZW50XG5tYXNrPTA7ICAgICAgICAvL0FORCB0aGlzIHdpdGggYW4gYXJyYXkgZWxlbWVudCB0byBjaG9wIGl0IGRvd24gdG8gYnBlIGJpdHNcbnJhZGl4PW1hc2srMTsgIC8vZXF1YWxzIDJeYnBlLiAgQSBzaW5nbGUgMSBiaXQgdG8gdGhlIGxlZnQgb2YgdGhlIGxhc3QgYml0IG9mIG1hc2suXG5cbi8vdGhlIGRpZ2l0cyBmb3IgY29udmVydGluZyB0byBkaWZmZXJlbnQgYmFzZXNcbmRpZ2l0c1N0cj0nMDEyMzQ1Njc4OUFCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXpfPSFAIyQlXiYqKClbXXt9fDs6LC48Pi8/YH4gXFxcXFxcJ1xcXCIrLSc7XG5cbi8vaW5pdGlhbGl6ZSB0aGUgZ2xvYmFsIHZhcmlhYmxlc1xuZm9yIChicGU9MDsgKDE8PChicGUrMSkpID4gKDE8PGJwZSk7IGJwZSsrKTsgIC8vYnBlPW51bWJlciBvZiBiaXRzIGluIHRoZSBtYW50aXNzYSBvbiB0aGlzIHBsYXRmb3JtXG5icGU+Pj0xOyAgICAgICAgICAgICAgICAgICAvL2JwZT1udW1iZXIgb2YgYml0cyBpbiBvbmUgZWxlbWVudCBvZiB0aGUgYXJyYXkgcmVwcmVzZW50aW5nIHRoZSBiaWdJbnRcbm1hc2s9KDE8PGJwZSktMTsgICAgICAgICAgIC8vQU5EIHRoZSBtYXNrIHdpdGggYW4gaW50ZWdlciB0byBnZXQgaXRzIGJwZSBsZWFzdCBzaWduaWZpY2FudCBiaXRzXG5yYWRpeD1tYXNrKzE7ICAgICAgICAgICAgICAvLzJeYnBlLiAgYSBzaW5nbGUgMSBiaXQgdG8gdGhlIGxlZnQgb2YgdGhlIGZpcnN0IGJpdCBvZiBtYXNrXG5vbmU9aW50MmJpZ0ludCgxLDEsMSk7ICAgICAvL2NvbnN0YW50IHVzZWQgaW4gcG93TW9kXygpXG5cbi8vdGhlIGZvbGxvd2luZyBnbG9iYWwgdmFyaWFibGVzIGFyZSBzY3JhdGNocGFkIG1lbW9yeSB0b1xuLy9yZWR1Y2UgZHluYW1pYyBtZW1vcnkgYWxsb2NhdGlvbiBpbiB0aGUgaW5uZXIgbG9vcFxudD1uZXcgQXJyYXkoMCk7XG5zcz10OyAgICAgICAvL3VzZWQgaW4gbXVsdF8oKVxuczA9dDsgICAgICAgLy91c2VkIGluIG11bHRNb2RfKCksIHNxdWFyZU1vZF8oKVxuczE9dDsgICAgICAgLy91c2VkIGluIHBvd01vZF8oKSwgbXVsdE1vZF8oKSwgc3F1YXJlTW9kXygpXG5zMj10OyAgICAgICAvL3VzZWQgaW4gcG93TW9kXygpLCBtdWx0TW9kXygpXG5zMz10OyAgICAgICAvL3VzZWQgaW4gcG93TW9kXygpXG5zND10OyBzNT10OyAvL3VzZWQgaW4gbW9kXygpXG5zNj10OyAgICAgICAvL3VzZWQgaW4gYmlnSW50MnN0cigpXG5zNz10OyAgICAgICAvL3VzZWQgaW4gcG93TW9kXygpXG5UPXQ7ICAgICAgICAvL3VzZWQgaW4gR0NEXygpXG5zYT10OyAgICAgICAvL3VzZWQgaW4gbW9udF8oKVxubXJfeDE9dDsgbXJfcj10OyBtcl9hPXQ7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3VzZWQgaW4gbWlsbGVyUmFiaW4oKVxuZWdfdj10OyBlZ191PXQ7IGVnX0E9dDsgZWdfQj10OyBlZ19DPXQ7IGVnX0Q9dDsgICAgICAgICAgICAgICAvL3VzZWQgaW4gZUdDRF8oKSwgaW52ZXJzZU1vZF8oKVxubWRfcTE9dDsgbWRfcTI9dDsgbWRfcTM9dDsgbWRfcj10OyBtZF9yMT10OyBtZF9yMj10OyBtZF90dD10OyAvL3VzZWQgaW4gbW9kXygpXG5cbnByaW1lcz10OyBwb3dzPXQ7IHNfaT10OyBzX2kyPXQ7IHNfUj10OyBzX3JtPXQ7IHNfcT10OyBzX24xPXQ7XG4gIHNfYT10OyBzX3IyPXQ7IHNfbj10OyBzX2I9dDsgc19kPXQ7IHNfeDE9dDsgc194Mj10LCBzX2FhPXQ7IC8vdXNlZCBpbiByYW5kVHJ1ZVByaW1lXygpXG5cbnJwcHJiPXQ7IC8vdXNlZCBpbiByYW5kUHJvYlByaW1lUm91bmRzKCkgKHdoaWNoIGFsc28gdXNlcyBcInByaW1lc1wiKVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cblxuLy9yZXR1cm4gYXJyYXkgb2YgYWxsIHByaW1lcyBsZXNzIHRoYW4gaW50ZWdlciBuXG5mdW5jdGlvbiBmaW5kUHJpbWVzKG4pIHtcbiAgdmFyIGkscyxwLGFucztcbiAgcz1uZXcgQXJyYXkobik7XG4gIGZvciAoaT0wO2k8bjtpKyspXG4gICAgc1tpXT0wO1xuICBzWzBdPTI7XG4gIHA9MDsgICAgLy9maXJzdCBwIGVsZW1lbnRzIG9mIHMgYXJlIHByaW1lcywgdGhlIHJlc3QgYXJlIGEgc2lldmVcbiAgZm9yKDtzW3BdPG47KSB7ICAgICAgICAgICAgICAgICAgLy9zW3BdIGlzIHRoZSBwdGggcHJpbWVcbiAgICBmb3IoaT1zW3BdKnNbcF07IGk8bjsgaSs9c1twXSkgLy9tYXJrIG11bHRpcGxlcyBvZiBzW3BdXG4gICAgICBzW2ldPTE7XG4gICAgcCsrO1xuICAgIHNbcF09c1twLTFdKzE7XG4gICAgZm9yKDsgc1twXTxuICYmIHNbc1twXV07IHNbcF0rKyk7IC8vZmluZCBuZXh0IHByaW1lICh3aGVyZSBzW3BdPT0wKVxuICB9XG4gIGFucz1uZXcgQXJyYXkocCk7XG4gIGZvcihpPTA7aTxwO2krKylcbiAgICBhbnNbaV09c1tpXTtcbiAgcmV0dXJuIGFucztcbn1cblxuXG4vL2RvZXMgYSBzaW5nbGUgcm91bmQgb2YgTWlsbGVyLVJhYmluIGJhc2UgYiBjb25zaWRlciB4IHRvIGJlIGEgcG9zc2libGUgcHJpbWU/XG4vL3ggaXMgYSBiaWdJbnQsIGFuZCBiIGlzIGFuIGludGVnZXIsIHdpdGggYjx4XG5mdW5jdGlvbiBtaWxsZXJSYWJpbkludCh4LGIpIHtcbiAgaWYgKG1yX3gxLmxlbmd0aCE9eC5sZW5ndGgpIHtcbiAgICBtcl94MT1kdXAoeCk7XG4gICAgbXJfcj1kdXAoeCk7XG4gICAgbXJfYT1kdXAoeCk7XG4gIH1cblxuICBjb3B5SW50Xyhtcl9hLGIpO1xuICByZXR1cm4gbWlsbGVyUmFiaW4oeCxtcl9hKTtcbn1cblxuLy9kb2VzIGEgc2luZ2xlIHJvdW5kIG9mIE1pbGxlci1SYWJpbiBiYXNlIGIgY29uc2lkZXIgeCB0byBiZSBhIHBvc3NpYmxlIHByaW1lP1xuLy94IGFuZCBiIGFyZSBiaWdJbnRzIHdpdGggYjx4XG5mdW5jdGlvbiBtaWxsZXJSYWJpbih4LGIpIHtcbiAgdmFyIGksaixrLHM7XG5cbiAgaWYgKG1yX3gxLmxlbmd0aCE9eC5sZW5ndGgpIHtcbiAgICBtcl94MT1kdXAoeCk7XG4gICAgbXJfcj1kdXAoeCk7XG4gICAgbXJfYT1kdXAoeCk7XG4gIH1cblxuICBjb3B5Xyhtcl9hLGIpO1xuICBjb3B5Xyhtcl9yLHgpO1xuICBjb3B5Xyhtcl94MSx4KTtcblxuICBhZGRJbnRfKG1yX3IsLTEpO1xuICBhZGRJbnRfKG1yX3gxLC0xKTtcblxuICAvL3M9dGhlIGhpZ2hlc3QgcG93ZXIgb2YgdHdvIHRoYXQgZGl2aWRlcyBtcl9yXG4gIGs9MDtcbiAgZm9yIChpPTA7aTxtcl9yLmxlbmd0aDtpKyspXG4gICAgZm9yIChqPTE7ajxtYXNrO2o8PD0xKVxuICAgICAgaWYgKHhbaV0gJiBqKSB7XG4gICAgICAgIHM9KGs8bXJfci5sZW5ndGgrYnBlID8gayA6IDApO1xuICAgICAgICAgaT1tcl9yLmxlbmd0aDtcbiAgICAgICAgIGo9bWFzaztcbiAgICAgIH0gZWxzZVxuICAgICAgICBrKys7XG5cbiAgaWYgKHMpXG4gICAgcmlnaHRTaGlmdF8obXJfcixzKTtcblxuICBwb3dNb2RfKG1yX2EsbXJfcix4KTtcblxuICBpZiAoIWVxdWFsc0ludChtcl9hLDEpICYmICFlcXVhbHMobXJfYSxtcl94MSkpIHtcbiAgICBqPTE7XG4gICAgd2hpbGUgKGo8PXMtMSAmJiAhZXF1YWxzKG1yX2EsbXJfeDEpKSB7XG4gICAgICBzcXVhcmVNb2RfKG1yX2EseCk7XG4gICAgICBpZiAoZXF1YWxzSW50KG1yX2EsMSkpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9XG4gICAgICBqKys7XG4gICAgfVxuICAgIGlmICghZXF1YWxzKG1yX2EsbXJfeDEpKSB7XG4gICAgICByZXR1cm4gMDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIDE7XG59XG5cbi8vcmV0dXJucyBob3cgbWFueSBiaXRzIGxvbmcgdGhlIGJpZ0ludCBpcywgbm90IGNvdW50aW5nIGxlYWRpbmcgemVyb3MuXG5mdW5jdGlvbiBiaXRTaXplKHgpIHtcbiAgdmFyIGoseix3O1xuICBmb3IgKGo9eC5sZW5ndGgtMTsgKHhbal09PTApICYmIChqPjApOyBqLS0pO1xuICBmb3IgKHo9MCx3PXhbal07IHc7ICh3Pj49MSkseisrKTtcbiAgeis9YnBlKmo7XG4gIHJldHVybiB6O1xufVxuXG4vL3JldHVybiBhIGNvcHkgb2YgeCB3aXRoIGF0IGxlYXN0IG4gZWxlbWVudHMsIGFkZGluZyBsZWFkaW5nIHplcm9zIGlmIG5lZWRlZFxuZnVuY3Rpb24gZXhwYW5kKHgsbikge1xuICB2YXIgYW5zPWludDJiaWdJbnQoMCwoeC5sZW5ndGg+biA/IHgubGVuZ3RoIDogbikqYnBlLDApO1xuICBjb3B5XyhhbnMseCk7XG4gIHJldHVybiBhbnM7XG59XG5cbi8vcmV0dXJuIGEgay1iaXQgdHJ1ZSByYW5kb20gcHJpbWUgdXNpbmcgTWF1cmVyJ3MgYWxnb3JpdGhtLlxuZnVuY3Rpb24gcmFuZFRydWVQcmltZShrKSB7XG4gIHZhciBhbnM9aW50MmJpZ0ludCgwLGssMCk7XG4gIHJhbmRUcnVlUHJpbWVfKGFucyxrKTtcbiAgcmV0dXJuIHRyaW0oYW5zLDEpO1xufVxuXG4vL3JldHVybiBhIGstYml0IHJhbmRvbSBwcm9iYWJsZSBwcmltZSB3aXRoIHByb2JhYmlsaXR5IG9mIGVycm9yIDwgMl4tODBcbmZ1bmN0aW9uIHJhbmRQcm9iUHJpbWUoaykge1xuICBpZiAoaz49NjAwKSByZXR1cm4gcmFuZFByb2JQcmltZVJvdW5kcyhrLDIpOyAvL251bWJlcnMgZnJvbSBIQUMgdGFibGUgNC4zXG4gIGlmIChrPj01NTApIHJldHVybiByYW5kUHJvYlByaW1lUm91bmRzKGssNCk7XG4gIGlmIChrPj01MDApIHJldHVybiByYW5kUHJvYlByaW1lUm91bmRzKGssNSk7XG4gIGlmIChrPj00MDApIHJldHVybiByYW5kUHJvYlByaW1lUm91bmRzKGssNik7XG4gIGlmIChrPj0zNTApIHJldHVybiByYW5kUHJvYlByaW1lUm91bmRzKGssNyk7XG4gIGlmIChrPj0zMDApIHJldHVybiByYW5kUHJvYlByaW1lUm91bmRzKGssOSk7XG4gIGlmIChrPj0yNTApIHJldHVybiByYW5kUHJvYlByaW1lUm91bmRzKGssMTIpOyAvL251bWJlcnMgZnJvbSBIQUMgdGFibGUgNC40XG4gIGlmIChrPj0yMDApIHJldHVybiByYW5kUHJvYlByaW1lUm91bmRzKGssMTUpO1xuICBpZiAoaz49MTUwKSByZXR1cm4gcmFuZFByb2JQcmltZVJvdW5kcyhrLDE4KTtcbiAgaWYgKGs+PTEwMCkgcmV0dXJuIHJhbmRQcm9iUHJpbWVSb3VuZHMoaywyNyk7XG4gICAgICAgICAgICAgIHJldHVybiByYW5kUHJvYlByaW1lUm91bmRzKGssNDApOyAvL251bWJlciBmcm9tIEhBQyByZW1hcmsgNC4yNiAob25seSBhbiBlc3RpbWF0ZSlcbn1cblxuLy9yZXR1cm4gYSBrLWJpdCBwcm9iYWJsZSByYW5kb20gcHJpbWUgdXNpbmcgbiByb3VuZHMgb2YgTWlsbGVyIFJhYmluIChhZnRlciB0cmlhbCBkaXZpc2lvbiB3aXRoIHNtYWxsIHByaW1lcylcbmZ1bmN0aW9uIHJhbmRQcm9iUHJpbWVSb3VuZHMoayxuKSB7XG4gIHZhciBhbnMsIGksIGRpdmlzaWJsZSwgQjtcbiAgQj0zMDAwMDsgIC8vQiBpcyBsYXJnZXN0IHByaW1lIHRvIHVzZSBpbiB0cmlhbCBkaXZpc2lvblxuICBhbnM9aW50MmJpZ0ludCgwLGssMCk7XG5cbiAgLy9vcHRpbWl6YXRpb246IHRyeSBsYXJnZXIgYW5kIHNtYWxsZXIgQiB0byBmaW5kIHRoZSBiZXN0IGxpbWl0LlxuXG4gIGlmIChwcmltZXMubGVuZ3RoPT0wKVxuICAgIHByaW1lcz1maW5kUHJpbWVzKDMwMDAwKTsgIC8vY2hlY2sgZm9yIGRpdmlzaWJpbGl0eSBieSBwcmltZXMgPD0zMDAwMFxuXG4gIGlmIChycHByYi5sZW5ndGghPWFucy5sZW5ndGgpXG4gICAgcnBwcmI9ZHVwKGFucyk7XG5cbiAgZm9yICg7OykgeyAvL2tlZXAgdHJ5aW5nIHJhbmRvbSB2YWx1ZXMgZm9yIGFucyB1bnRpbCBvbmUgYXBwZWFycyB0byBiZSBwcmltZVxuICAgIC8vb3B0aW1pemF0aW9uOiBwaWNrIGEgcmFuZG9tIG51bWJlciB0aW1lcyBMPTIqMyo1Ki4uLipwLCBwbHVzIGFcbiAgICAvLyAgIHJhbmRvbSBlbGVtZW50IG9mIHRoZSBsaXN0IG9mIGFsbCBudW1iZXJzIGluIFswLEwpIG5vdCBkaXZpc2libGUgYnkgYW55IHByaW1lIHVwIHRvIHAuXG4gICAgLy8gICBUaGlzIGNhbiByZWR1Y2UgdGhlIGFtb3VudCBvZiByYW5kb20gbnVtYmVyIGdlbmVyYXRpb24uXG5cbiAgICByYW5kQmlnSW50XyhhbnMsaywwKTsgLy9hbnMgPSBhIHJhbmRvbSBvZGQgbnVtYmVyIHRvIGNoZWNrXG4gICAgYW5zWzBdIHw9IDE7XG4gICAgZGl2aXNpYmxlPTA7XG5cbiAgICAvL2NoZWNrIGFucyBmb3IgZGl2aXNpYmlsaXR5IGJ5IHNtYWxsIHByaW1lcyB1cCB0byBCXG4gICAgZm9yIChpPTA7IChpPHByaW1lcy5sZW5ndGgpICYmIChwcmltZXNbaV08PUIpOyBpKyspXG4gICAgICBpZiAobW9kSW50KGFucyxwcmltZXNbaV0pPT0wICYmICFlcXVhbHNJbnQoYW5zLHByaW1lc1tpXSkpIHtcbiAgICAgICAgZGl2aXNpYmxlPTE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgLy9vcHRpbWl6YXRpb246IGNoYW5nZSBtaWxsZXJSYWJpbiBzbyB0aGUgYmFzZSBjYW4gYmUgYmlnZ2VyIHRoYW4gdGhlIG51bWJlciBiZWluZyBjaGVja2VkLCB0aGVuIGVsaW1pbmF0ZSB0aGUgd2hpbGUgaGVyZS5cblxuICAgIC8vZG8gbiByb3VuZHMgb2YgTWlsbGVyIFJhYmluLCB3aXRoIHJhbmRvbSBiYXNlcyBsZXNzIHRoYW4gYW5zXG4gICAgZm9yIChpPTA7IGk8biAmJiAhZGl2aXNpYmxlOyBpKyspIHtcbiAgICAgIHJhbmRCaWdJbnRfKHJwcHJiLGssMCk7XG4gICAgICB3aGlsZSghZ3JlYXRlcihhbnMscnBwcmIpKSAvL3BpY2sgYSByYW5kb20gcnBwcmIgdGhhdCdzIDwgYW5zXG4gICAgICAgIHJhbmRCaWdJbnRfKHJwcHJiLGssMCk7XG4gICAgICBpZiAoIW1pbGxlclJhYmluKGFucyxycHByYikpXG4gICAgICAgIGRpdmlzaWJsZT0xO1xuICAgIH1cblxuICAgIGlmKCFkaXZpc2libGUpXG4gICAgICByZXR1cm4gYW5zO1xuICB9XG59XG5cbi8vcmV0dXJuIGEgbmV3IGJpZ0ludCBlcXVhbCB0byAoeCBtb2QgbikgZm9yIGJpZ0ludHMgeCBhbmQgbi5cbmZ1bmN0aW9uIG1vZCh4LG4pIHtcbiAgdmFyIGFucz1kdXAoeCk7XG4gIG1vZF8oYW5zLG4pO1xuICByZXR1cm4gdHJpbShhbnMsMSk7XG59XG5cbi8vcmV0dXJuICh4K24pIHdoZXJlIHggaXMgYSBiaWdJbnQgYW5kIG4gaXMgYW4gaW50ZWdlci5cbmZ1bmN0aW9uIGFkZEludCh4LG4pIHtcbiAgdmFyIGFucz1leHBhbmQoeCx4Lmxlbmd0aCsxKTtcbiAgYWRkSW50XyhhbnMsbik7XG4gIHJldHVybiB0cmltKGFucywxKTtcbn1cblxuLy9yZXR1cm4geCp5IGZvciBiaWdJbnRzIHggYW5kIHkuIFRoaXMgaXMgZmFzdGVyIHdoZW4geTx4LlxuZnVuY3Rpb24gbXVsdCh4LHkpIHtcbiAgdmFyIGFucz1leHBhbmQoeCx4Lmxlbmd0aCt5Lmxlbmd0aCk7XG4gIG11bHRfKGFucyx5KTtcbiAgcmV0dXJuIHRyaW0oYW5zLDEpO1xufVxuXG4vL3JldHVybiAoeCoqeSBtb2Qgbikgd2hlcmUgeCx5LG4gYXJlIGJpZ0ludHMgYW5kICoqIGlzIGV4cG9uZW50aWF0aW9uLiAgMCoqMD0xLiBGYXN0ZXIgZm9yIG9kZCBuLlxuZnVuY3Rpb24gcG93TW9kKHgseSxuKSB7XG4gIHZhciBhbnM9ZXhwYW5kKHgsbi5sZW5ndGgpO1xuICBwb3dNb2RfKGFucyx0cmltKHksMiksdHJpbShuLDIpLDApOyAgLy90aGlzIHNob3VsZCB3b3JrIHdpdGhvdXQgdGhlIHRyaW0sIGJ1dCBkb2Vzbid0XG4gIHJldHVybiB0cmltKGFucywxKTtcbn1cblxuLy9yZXR1cm4gKHgteSkgZm9yIGJpZ0ludHMgeCBhbmQgeS4gIE5lZ2F0aXZlIGFuc3dlcnMgd2lsbCBiZSAycyBjb21wbGVtZW50XG5mdW5jdGlvbiBzdWIoeCx5KSB7XG4gIHZhciBhbnM9ZXhwYW5kKHgsKHgubGVuZ3RoPnkubGVuZ3RoID8geC5sZW5ndGgrMSA6IHkubGVuZ3RoKzEpKTtcbiAgc3ViXyhhbnMseSk7XG4gIHJldHVybiB0cmltKGFucywxKTtcbn1cblxuLy9yZXR1cm4gKHgreSkgZm9yIGJpZ0ludHMgeCBhbmQgeS5cbmZ1bmN0aW9uIGFkZCh4LHkpIHtcbiAgdmFyIGFucz1leHBhbmQoeCwoeC5sZW5ndGg+eS5sZW5ndGggPyB4Lmxlbmd0aCsxIDogeS5sZW5ndGgrMSkpO1xuICBhZGRfKGFucyx5KTtcbiAgcmV0dXJuIHRyaW0oYW5zLDEpO1xufVxuXG4vL3JldHVybiAoeCoqKC0xKSBtb2QgbikgZm9yIGJpZ0ludHMgeCBhbmQgbi4gIElmIG5vIGludmVyc2UgZXhpc3RzLCBpdCByZXR1cm5zIG51bGxcbmZ1bmN0aW9uIGludmVyc2VNb2QoeCxuKSB7XG4gIHZhciBhbnM9ZXhwYW5kKHgsbi5sZW5ndGgpO1xuICB2YXIgcztcbiAgcz1pbnZlcnNlTW9kXyhhbnMsbik7XG4gIHJldHVybiBzID8gdHJpbShhbnMsMSkgOiBudWxsO1xufVxuXG4vL3JldHVybiAoeCp5IG1vZCBuKSBmb3IgYmlnSW50cyB4LHksbi4gIEZvciBncmVhdGVyIHNwZWVkLCBsZXQgeTx4LlxuZnVuY3Rpb24gbXVsdE1vZCh4LHksbikge1xuICB2YXIgYW5zPWV4cGFuZCh4LG4ubGVuZ3RoKTtcbiAgbXVsdE1vZF8oYW5zLHksbik7XG4gIHJldHVybiB0cmltKGFucywxKTtcbn1cblxuLy9nZW5lcmF0ZSBhIGstYml0IHRydWUgcmFuZG9tIHByaW1lIHVzaW5nIE1hdXJlcidzIGFsZ29yaXRobSxcbi8vYW5kIHB1dCBpdCBpbnRvIGFucy4gIFRoZSBiaWdJbnQgYW5zIG11c3QgYmUgbGFyZ2UgZW5vdWdoIHRvIGhvbGQgaXQuXG5mdW5jdGlvbiByYW5kVHJ1ZVByaW1lXyhhbnMsaykge1xuICB2YXIgYyxtLHBtLGRkLGoscixCLGRpdmlzaWJsZSx6LHp6LHJlY1NpemU7XG5cbiAgaWYgKHByaW1lcy5sZW5ndGg9PTApXG4gICAgcHJpbWVzPWZpbmRQcmltZXMoMzAwMDApOyAgLy9jaGVjayBmb3IgZGl2aXNpYmlsaXR5IGJ5IHByaW1lcyA8PTMwMDAwXG5cbiAgaWYgKHBvd3MubGVuZ3RoPT0wKSB7XG4gICAgcG93cz1uZXcgQXJyYXkoNTEyKTtcbiAgICBmb3IgKGo9MDtqPDUxMjtqKyspIHtcbiAgICAgIHBvd3Nbal09TWF0aC5wb3coMixqLzUxMS4tMS4pO1xuICAgIH1cbiAgfVxuXG4gIC8vYyBhbmQgbSBzaG91bGQgYmUgdHVuZWQgZm9yIGEgcGFydGljdWxhciBtYWNoaW5lIGFuZCB2YWx1ZSBvZiBrLCB0byBtYXhpbWl6ZSBzcGVlZFxuICBjPTAuMTsgIC8vYz0wLjEgaW4gSEFDXG4gIG09MjA7ICAgLy9nZW5lcmF0ZSB0aGlzIGstYml0IG51bWJlciBieSBmaXJzdCByZWN1cnNpdmVseSBnZW5lcmF0aW5nIGEgbnVtYmVyIHRoYXQgaGFzIGJldHdlZW4gay8yIGFuZCBrLW0gYml0c1xuICByZWNMaW1pdD0yMDsgLy9zdG9wIHJlY3Vyc2lvbiB3aGVuIGsgPD1yZWNMaW1pdC4gIE11c3QgaGF2ZSByZWNMaW1pdCA+PSAyXG5cbiAgaWYgKHNfaTIubGVuZ3RoIT1hbnMubGVuZ3RoKSB7XG4gICAgc19pMj1kdXAoYW5zKTtcbiAgICBzX1IgPWR1cChhbnMpO1xuICAgIHNfbjE9ZHVwKGFucyk7XG4gICAgc19yMj1kdXAoYW5zKTtcbiAgICBzX2QgPWR1cChhbnMpO1xuICAgIHNfeDE9ZHVwKGFucyk7XG4gICAgc194Mj1kdXAoYW5zKTtcbiAgICBzX2IgPWR1cChhbnMpO1xuICAgIHNfbiA9ZHVwKGFucyk7XG4gICAgc19pID1kdXAoYW5zKTtcbiAgICBzX3JtPWR1cChhbnMpO1xuICAgIHNfcSA9ZHVwKGFucyk7XG4gICAgc19hID1kdXAoYW5zKTtcbiAgICBzX2FhPWR1cChhbnMpO1xuICB9XG5cbiAgaWYgKGsgPD0gcmVjTGltaXQpIHsgIC8vZ2VuZXJhdGUgc21hbGwgcmFuZG9tIHByaW1lcyBieSB0cmlhbCBkaXZpc2lvbiB1cCB0byBpdHMgc3F1YXJlIHJvb3RcbiAgICBwbT0oMTw8KChrKzIpPj4xKSktMTsgLy9wbSBpcyBiaW5hcnkgbnVtYmVyIHdpdGggYWxsIG9uZXMsIGp1c3Qgb3ZlciBzcXJ0KDJeaylcbiAgICBjb3B5SW50XyhhbnMsMCk7XG4gICAgZm9yIChkZD0xO2RkOykge1xuICAgICAgZGQ9MDtcbiAgICAgIGFuc1swXT0gMSB8ICgxPDwoay0xKSkgfCBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqKDE8PGspKTsgIC8vcmFuZG9tLCBrLWJpdCwgb2RkIGludGVnZXIsIHdpdGggbXNiIDFcbiAgICAgIGZvciAoaj0xOyhqPHByaW1lcy5sZW5ndGgpICYmICgocHJpbWVzW2pdJnBtKT09cHJpbWVzW2pdKTtqKyspIHsgLy90cmlhbCBkaXZpc2lvbiBieSBhbGwgcHJpbWVzIDMuLi5zcXJ0KDJeaylcbiAgICAgICAgaWYgKDA9PShhbnNbMF0lcHJpbWVzW2pdKSkge1xuICAgICAgICAgIGRkPTE7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgY2FycnlfKGFucyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgQj1jKmsqazsgICAgLy90cnkgc21hbGwgcHJpbWVzIHVwIHRvIEIgKG9yIGFsbCB0aGUgcHJpbWVzW10gYXJyYXkgaWYgdGhlIGxhcmdlc3QgaXMgbGVzcyB0aGFuIEIpLlxuICBpZiAoaz4yKm0pICAvL2dlbmVyYXRlIHRoaXMgay1iaXQgbnVtYmVyIGJ5IGZpcnN0IHJlY3Vyc2l2ZWx5IGdlbmVyYXRpbmcgYSBudW1iZXIgdGhhdCBoYXMgYmV0d2VlbiBrLzIgYW5kIGstbSBiaXRzXG4gICAgZm9yIChyPTE7IGstaypyPD1tOyApXG4gICAgICByPXBvd3NbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjUxMildOyAgIC8vcj1NYXRoLnBvdygyLE1hdGgucmFuZG9tKCktMSk7XG4gIGVsc2VcbiAgICByPS41O1xuXG4gIC8vc2ltdWxhdGlvbiBzdWdnZXN0cyB0aGUgbW9yZSBjb21wbGV4IGFsZ29yaXRobSB1c2luZyByPS4zMzMgaXMgb25seSBzbGlnaHRseSBmYXN0ZXIuXG5cbiAgcmVjU2l6ZT1NYXRoLmZsb29yKHIqaykrMTtcblxuICByYW5kVHJ1ZVByaW1lXyhzX3EscmVjU2l6ZSk7XG4gIGNvcHlJbnRfKHNfaTIsMCk7XG4gIHNfaTJbTWF0aC5mbG9vcigoay0yKS9icGUpXSB8PSAoMTw8KChrLTIpJWJwZSkpOyAgIC8vc19pMj0yXihrLTIpXG4gIGRpdmlkZV8oc19pMixzX3Esc19pLHNfcm0pOyAgICAgICAgICAgICAgICAgICAgICAgIC8vc19pPWZsb29yKCgyXihrLTEpKS8oMnEpKVxuXG4gIHo9Yml0U2l6ZShzX2kpO1xuXG4gIGZvciAoOzspIHtcbiAgICBmb3IgKDs7KSB7ICAvL2dlbmVyYXRlIHotYml0IG51bWJlcnMgdW50aWwgb25lIGZhbGxzIGluIHRoZSByYW5nZSBbMCxzX2ktMV1cbiAgICAgIHJhbmRCaWdJbnRfKHNfUix6LDApO1xuICAgICAgaWYgKGdyZWF0ZXIoc19pLHNfUikpXG4gICAgICAgIGJyZWFrO1xuICAgIH0gICAgICAgICAgICAgICAgLy9ub3cgc19SIGlzIGluIHRoZSByYW5nZSBbMCxzX2ktMV1cbiAgICBhZGRJbnRfKHNfUiwxKTsgIC8vbm93IHNfUiBpcyBpbiB0aGUgcmFuZ2UgWzEsc19pXVxuICAgIGFkZF8oc19SLHNfaSk7ICAgLy9ub3cgc19SIGlzIGluIHRoZSByYW5nZSBbc19pKzEsMipzX2ldXG5cbiAgICBjb3B5XyhzX24sc19xKTtcbiAgICBtdWx0XyhzX24sc19SKTtcbiAgICBtdWx0SW50XyhzX24sMik7XG4gICAgYWRkSW50XyhzX24sMSk7ICAgIC8vc19uPTIqc19SKnNfcSsxXG5cbiAgICBjb3B5XyhzX3IyLHNfUik7XG4gICAgbXVsdEludF8oc19yMiwyKTsgIC8vc19yMj0yKnNfUlxuXG4gICAgLy9jaGVjayBzX24gZm9yIGRpdmlzaWJpbGl0eSBieSBzbWFsbCBwcmltZXMgdXAgdG8gQlxuICAgIGZvciAoZGl2aXNpYmxlPTAsaj0wOyAoajxwcmltZXMubGVuZ3RoKSAmJiAocHJpbWVzW2pdPEIpOyBqKyspXG4gICAgICBpZiAobW9kSW50KHNfbixwcmltZXNbal0pPT0wICYmICFlcXVhbHNJbnQoc19uLHByaW1lc1tqXSkpIHtcbiAgICAgICAgZGl2aXNpYmxlPTE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgaWYgKCFkaXZpc2libGUpICAgIC8vaWYgaXQgcGFzc2VzIHNtYWxsIHByaW1lcyBjaGVjaywgdGhlbiB0cnkgYSBzaW5nbGUgTWlsbGVyLVJhYmluIGJhc2UgMlxuICAgICAgaWYgKCFtaWxsZXJSYWJpbkludChzX24sMikpIC8vdGhpcyBsaW5lIHJlcHJlc2VudHMgNzUlIG9mIHRoZSB0b3RhbCBydW50aW1lIGZvciByYW5kVHJ1ZVByaW1lX1xuICAgICAgICBkaXZpc2libGU9MTtcblxuICAgIGlmICghZGl2aXNpYmxlKSB7ICAvL2lmIGl0IHBhc3NlcyB0aGF0IHRlc3QsIGNvbnRpbnVlIGNoZWNraW5nIHNfblxuICAgICAgYWRkSW50XyhzX24sLTMpO1xuICAgICAgZm9yIChqPXNfbi5sZW5ndGgtMTsoc19uW2pdPT0wKSAmJiAoaj4wKTsgai0tKTsgIC8vc3RyaXAgbGVhZGluZyB6ZXJvc1xuICAgICAgZm9yICh6ej0wLHc9c19uW2pdOyB3OyAodz4+PTEpLHp6KyspO1xuICAgICAgenorPWJwZSpqOyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy96ej1udW1iZXIgb2YgYml0cyBpbiBzX24sIGlnbm9yaW5nIGxlYWRpbmcgemVyb3NcbiAgICAgIGZvciAoOzspIHsgIC8vZ2VuZXJhdGUgei1iaXQgbnVtYmVycyB1bnRpbCBvbmUgZmFsbHMgaW4gdGhlIHJhbmdlIFswLHNfbi0xXVxuICAgICAgICByYW5kQmlnSW50XyhzX2EsenosMCk7XG4gICAgICAgIGlmIChncmVhdGVyKHNfbixzX2EpKVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfSAgICAgICAgICAgICAgICAvL25vdyBzX2EgaXMgaW4gdGhlIHJhbmdlIFswLHNfbi0xXVxuICAgICAgYWRkSW50XyhzX24sMyk7ICAvL25vdyBzX2EgaXMgaW4gdGhlIHJhbmdlIFswLHNfbi00XVxuICAgICAgYWRkSW50XyhzX2EsMik7ICAvL25vdyBzX2EgaXMgaW4gdGhlIHJhbmdlIFsyLHNfbi0yXVxuICAgICAgY29weV8oc19iLHNfYSk7XG4gICAgICBjb3B5XyhzX24xLHNfbik7XG4gICAgICBhZGRJbnRfKHNfbjEsLTEpO1xuICAgICAgcG93TW9kXyhzX2Isc19uMSxzX24pOyAgIC8vc19iPXNfYV4oc19uLTEpIG1vZHVsbyBzX25cbiAgICAgIGFkZEludF8oc19iLC0xKTtcbiAgICAgIGlmIChpc1plcm8oc19iKSkge1xuICAgICAgICBjb3B5XyhzX2Isc19hKTtcbiAgICAgICAgcG93TW9kXyhzX2Isc19yMixzX24pO1xuICAgICAgICBhZGRJbnRfKHNfYiwtMSk7XG4gICAgICAgIGNvcHlfKHNfYWEsc19uKTtcbiAgICAgICAgY29weV8oc19kLHNfYik7XG4gICAgICAgIEdDRF8oc19kLHNfbik7ICAvL2lmIHNfYiBhbmQgc19uIGFyZSByZWxhdGl2ZWx5IHByaW1lLCB0aGVuIHNfbiBpcyBhIHByaW1lXG4gICAgICAgIGlmIChlcXVhbHNJbnQoc19kLDEpKSB7XG4gICAgICAgICAgY29weV8oYW5zLHNfYWEpO1xuICAgICAgICAgIHJldHVybjsgICAgIC8vaWYgd2UndmUgbWFkZSBpdCB0aGlzIGZhciwgdGhlbiBzX24gaXMgYWJzb2x1dGVseSBndWFyYW50ZWVkIHRvIGJlIHByaW1lXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLy9SZXR1cm4gYW4gbi1iaXQgcmFuZG9tIEJpZ0ludCAobj49MSkuICBJZiBzPTEsIHRoZW4gdGhlIG1vc3Qgc2lnbmlmaWNhbnQgb2YgdGhvc2UgbiBiaXRzIGlzIHNldCB0byAxLlxuZnVuY3Rpb24gcmFuZEJpZ0ludChuLHMpIHtcbiAgdmFyIGEsYjtcbiAgYT1NYXRoLmZsb29yKChuLTEpL2JwZSkrMjsgLy8jIGFycmF5IGVsZW1lbnRzIHRvIGhvbGQgdGhlIEJpZ0ludCB3aXRoIGEgbGVhZGluZyAwIGVsZW1lbnRcbiAgYj1pbnQyYmlnSW50KDAsMCxhKTtcbiAgcmFuZEJpZ0ludF8oYixuLHMpO1xuICByZXR1cm4gYjtcbn1cblxuLy9TZXQgYiB0byBhbiBuLWJpdCByYW5kb20gQmlnSW50LiAgSWYgcz0xLCB0aGVuIHRoZSBtb3N0IHNpZ25pZmljYW50IG9mIHRob3NlIG4gYml0cyBpcyBzZXQgdG8gMS5cbi8vQXJyYXkgYiBtdXN0IGJlIGJpZyBlbm91Z2ggdG8gaG9sZCB0aGUgcmVzdWx0LiBNdXN0IGhhdmUgbj49MVxuZnVuY3Rpb24gcmFuZEJpZ0ludF8oYixuLHMpIHtcbiAgdmFyIGksYTtcbiAgZm9yIChpPTA7aTxiLmxlbmd0aDtpKyspXG4gICAgYltpXT0wO1xuICBhPU1hdGguZmxvb3IoKG4tMSkvYnBlKSsxOyAvLyMgYXJyYXkgZWxlbWVudHMgdG8gaG9sZCB0aGUgQmlnSW50XG4gIGZvciAoaT0wO2k8YTtpKyspIHtcbiAgICBiW2ldPU1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSooMTw8KGJwZS0xKSkpO1xuICB9XG4gIGJbYS0xXSAmPSAoMjw8KChuLTEpJWJwZSkpLTE7XG4gIGlmIChzPT0xKVxuICAgIGJbYS0xXSB8PSAoMTw8KChuLTEpJWJwZSkpO1xufVxuXG4vL1JldHVybiB0aGUgZ3JlYXRlc3QgY29tbW9uIGRpdmlzb3Igb2YgYmlnSW50cyB4IGFuZCB5IChlYWNoIHdpdGggc2FtZSBudW1iZXIgb2YgZWxlbWVudHMpLlxuZnVuY3Rpb24gR0NEKHgseSkge1xuICB2YXIgeGMseWM7XG4gIHhjPWR1cCh4KTtcbiAgeWM9ZHVwKHkpO1xuICBHQ0RfKHhjLHljKTtcbiAgcmV0dXJuIHhjO1xufVxuXG4vL3NldCB4IHRvIHRoZSBncmVhdGVzdCBjb21tb24gZGl2aXNvciBvZiBiaWdJbnRzIHggYW5kIHkgKGVhY2ggd2l0aCBzYW1lIG51bWJlciBvZiBlbGVtZW50cykuXG4vL3kgaXMgZGVzdHJveWVkLlxuZnVuY3Rpb24gR0NEXyh4LHkpIHtcbiAgdmFyIGkseHAseXAsQSxCLEMsRCxxLHNpbmc7XG4gIGlmIChULmxlbmd0aCE9eC5sZW5ndGgpXG4gICAgVD1kdXAoeCk7XG5cbiAgc2luZz0xO1xuICB3aGlsZSAoc2luZykgeyAvL3doaWxlIHkgaGFzIG5vbnplcm8gZWxlbWVudHMgb3RoZXIgdGhhbiB5WzBdXG4gICAgc2luZz0wO1xuICAgIGZvciAoaT0xO2k8eS5sZW5ndGg7aSsrKSAvL2NoZWNrIGlmIHkgaGFzIG5vbnplcm8gZWxlbWVudHMgb3RoZXIgdGhhbiAwXG4gICAgICBpZiAoeVtpXSkge1xuICAgICAgICBzaW5nPTE7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIGlmICghc2luZykgYnJlYWs7IC8vcXVpdCB3aGVuIHkgYWxsIHplcm8gZWxlbWVudHMgZXhjZXB0IHBvc3NpYmx5IHlbMF1cblxuICAgIGZvciAoaT14Lmxlbmd0aDsheFtpXSAmJiBpPj0wO2ktLSk7ICAvL2ZpbmQgbW9zdCBzaWduaWZpY2FudCBlbGVtZW50IG9mIHhcbiAgICB4cD14W2ldO1xuICAgIHlwPXlbaV07XG4gICAgQT0xOyBCPTA7IEM9MDsgRD0xO1xuICAgIHdoaWxlICgoeXArQykgJiYgKHlwK0QpKSB7XG4gICAgICBxID1NYXRoLmZsb29yKCh4cCtBKS8oeXArQykpO1xuICAgICAgcXA9TWF0aC5mbG9vcigoeHArQikvKHlwK0QpKTtcbiAgICAgIGlmIChxIT1xcClcbiAgICAgICAgYnJlYWs7XG4gICAgICB0PSBBLXEqQzsgICBBPUM7ICAgQz10OyAgICAvLyAgZG8gKEEsQix4cCwgQyxELHlwKSA9IChDLEQseXAsIEEsQix4cCkgLSBxKigwLDAsMCwgQyxELHlwKVxuICAgICAgdD0gQi1xKkQ7ICAgQj1EOyAgIEQ9dDtcbiAgICAgIHQ9eHAtcSp5cDsgeHA9eXA7IHlwPXQ7XG4gICAgfVxuICAgIGlmIChCKSB7XG4gICAgICBjb3B5XyhULHgpO1xuICAgICAgbGluQ29tYl8oeCx5LEEsQik7IC8veD1BKngrQip5XG4gICAgICBsaW5Db21iXyh5LFQsRCxDKTsgLy95PUQqeStDKlRcbiAgICB9IGVsc2Uge1xuICAgICAgbW9kXyh4LHkpO1xuICAgICAgY29weV8oVCx4KTtcbiAgICAgIGNvcHlfKHgseSk7XG4gICAgICBjb3B5Xyh5LFQpO1xuICAgIH1cbiAgfVxuICBpZiAoeVswXT09MClcbiAgICByZXR1cm47XG4gIHQ9bW9kSW50KHgseVswXSk7XG4gIGNvcHlJbnRfKHgseVswXSk7XG4gIHlbMF09dDtcbiAgd2hpbGUgKHlbMF0pIHtcbiAgICB4WzBdJT15WzBdO1xuICAgIHQ9eFswXTsgeFswXT15WzBdOyB5WzBdPXQ7XG4gIH1cbn1cblxuLy9kbyB4PXgqKigtMSkgbW9kIG4sIGZvciBiaWdJbnRzIHggYW5kIG4uXG4vL0lmIG5vIGludmVyc2UgZXhpc3RzLCBpdCBzZXRzIHggdG8gemVybyBhbmQgcmV0dXJucyAwLCBlbHNlIGl0IHJldHVybnMgMS5cbi8vVGhlIHggYXJyYXkgbXVzdCBiZSBhdCBsZWFzdCBhcyBsYXJnZSBhcyB0aGUgbiBhcnJheS5cbmZ1bmN0aW9uIGludmVyc2VNb2RfKHgsbikge1xuICB2YXIgaz0xKzIqTWF0aC5tYXgoeC5sZW5ndGgsbi5sZW5ndGgpO1xuXG4gIGlmKCEoeFswXSYxKSAgJiYgIShuWzBdJjEpKSB7ICAvL2lmIGJvdGggaW5wdXRzIGFyZSBldmVuLCB0aGVuIGludmVyc2UgZG9lc24ndCBleGlzdFxuICAgIGNvcHlJbnRfKHgsMCk7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICBpZiAoZWdfdS5sZW5ndGghPWspIHtcbiAgICBlZ191PW5ldyBBcnJheShrKTtcbiAgICBlZ192PW5ldyBBcnJheShrKTtcbiAgICBlZ19BPW5ldyBBcnJheShrKTtcbiAgICBlZ19CPW5ldyBBcnJheShrKTtcbiAgICBlZ19DPW5ldyBBcnJheShrKTtcbiAgICBlZ19EPW5ldyBBcnJheShrKTtcbiAgfVxuXG4gIGNvcHlfKGVnX3UseCk7XG4gIGNvcHlfKGVnX3Ysbik7XG4gIGNvcHlJbnRfKGVnX0EsMSk7XG4gIGNvcHlJbnRfKGVnX0IsMCk7XG4gIGNvcHlJbnRfKGVnX0MsMCk7XG4gIGNvcHlJbnRfKGVnX0QsMSk7XG4gIGZvciAoOzspIHtcbiAgICB3aGlsZSghKGVnX3VbMF0mMSkpIHsgIC8vd2hpbGUgZWdfdSBpcyBldmVuXG4gICAgICBoYWx2ZV8oZWdfdSk7XG4gICAgICBpZiAoIShlZ19BWzBdJjEpICYmICEoZWdfQlswXSYxKSkgeyAvL2lmIGVnX0E9PWVnX0I9PTAgbW9kIDJcbiAgICAgICAgaGFsdmVfKGVnX0EpO1xuICAgICAgICBoYWx2ZV8oZWdfQik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhZGRfKGVnX0Esbik7ICBoYWx2ZV8oZWdfQSk7XG4gICAgICAgIHN1Yl8oZWdfQix4KTsgIGhhbHZlXyhlZ19CKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB3aGlsZSAoIShlZ192WzBdJjEpKSB7ICAvL3doaWxlIGVnX3YgaXMgZXZlblxuICAgICAgaGFsdmVfKGVnX3YpO1xuICAgICAgaWYgKCEoZWdfQ1swXSYxKSAmJiAhKGVnX0RbMF0mMSkpIHsgLy9pZiBlZ19DPT1lZ19EPT0wIG1vZCAyXG4gICAgICAgIGhhbHZlXyhlZ19DKTtcbiAgICAgICAgaGFsdmVfKGVnX0QpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWRkXyhlZ19DLG4pOyAgaGFsdmVfKGVnX0MpO1xuICAgICAgICBzdWJfKGVnX0QseCk7ICBoYWx2ZV8oZWdfRCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFncmVhdGVyKGVnX3YsZWdfdSkpIHsgLy9lZ192IDw9IGVnX3VcbiAgICAgIHN1Yl8oZWdfdSxlZ192KTtcbiAgICAgIHN1Yl8oZWdfQSxlZ19DKTtcbiAgICAgIHN1Yl8oZWdfQixlZ19EKTtcbiAgICB9IGVsc2UgeyAgICAgICAgICAgICAgICAgICAvL2VnX3YgPiBlZ191XG4gICAgICBzdWJfKGVnX3YsZWdfdSk7XG4gICAgICBzdWJfKGVnX0MsZWdfQSk7XG4gICAgICBzdWJfKGVnX0QsZWdfQik7XG4gICAgfVxuXG4gICAgaWYgKGVxdWFsc0ludChlZ191LDApKSB7XG4gICAgICBpZiAobmVnYXRpdmUoZWdfQykpIC8vbWFrZSBzdXJlIGFuc3dlciBpcyBub25uZWdhdGl2ZVxuICAgICAgICBhZGRfKGVnX0Msbik7XG4gICAgICBjb3B5Xyh4LGVnX0MpO1xuXG4gICAgICBpZiAoIWVxdWFsc0ludChlZ192LDEpKSB7IC8vaWYgR0NEXyh4LG4pIT0xLCB0aGVuIHRoZXJlIGlzIG5vIGludmVyc2VcbiAgICAgICAgY29weUludF8oeCwwKTtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9XG4gICAgICByZXR1cm4gMTtcbiAgICB9XG4gIH1cbn1cblxuLy9yZXR1cm4geCoqKC0xKSBtb2QgbiwgZm9yIGludGVnZXJzIHggYW5kIG4uICBSZXR1cm4gMCBpZiB0aGVyZSBpcyBubyBpbnZlcnNlXG5mdW5jdGlvbiBpbnZlcnNlTW9kSW50KHgsbikge1xuICB2YXIgYT0xLGI9MCx0O1xuICBmb3IgKDs7KSB7XG4gICAgaWYgKHg9PTEpIHJldHVybiBhO1xuICAgIGlmICh4PT0wKSByZXR1cm4gMDtcbiAgICBiLT1hKk1hdGguZmxvb3Iobi94KTtcbiAgICBuJT14O1xuXG4gICAgaWYgKG49PTEpIHJldHVybiBiOyAvL3RvIGF2b2lkIG5lZ2F0aXZlcywgY2hhbmdlIHRoaXMgYiB0byBuLWIsIGFuZCBlYWNoIC09IHRvICs9XG4gICAgaWYgKG49PTApIHJldHVybiAwO1xuICAgIGEtPWIqTWF0aC5mbG9vcih4L24pO1xuICAgIHglPW47XG4gIH1cbn1cblxuLy90aGlzIGRlcHJlY2F0ZWQgZnVuY3Rpb24gaXMgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkgb25seS5cbmZ1bmN0aW9uIGludmVyc2VNb2RJbnRfKHgsbikge1xuICAgcmV0dXJuIGludmVyc2VNb2RJbnQoeCxuKTtcbn1cblxuXG4vL0dpdmVuIHBvc2l0aXZlIGJpZ0ludHMgeCBhbmQgeSwgY2hhbmdlIHRoZSBiaWdpbnRzIHYsIGEsIGFuZCBiIHRvIHBvc2l0aXZlIGJpZ0ludHMgc3VjaCB0aGF0OlxuLy8gICAgIHYgPSBHQ0RfKHgseSkgPSBhKngtYip5XG4vL1RoZSBiaWdJbnRzIHYsIGEsIGIsIG11c3QgaGF2ZSBleGFjdGx5IGFzIG1hbnkgZWxlbWVudHMgYXMgdGhlIGxhcmdlciBvZiB4IGFuZCB5LlxuZnVuY3Rpb24gZUdDRF8oeCx5LHYsYSxiKSB7XG4gIHZhciBnPTA7XG4gIHZhciBrPU1hdGgubWF4KHgubGVuZ3RoLHkubGVuZ3RoKTtcbiAgaWYgKGVnX3UubGVuZ3RoIT1rKSB7XG4gICAgZWdfdT1uZXcgQXJyYXkoayk7XG4gICAgZWdfQT1uZXcgQXJyYXkoayk7XG4gICAgZWdfQj1uZXcgQXJyYXkoayk7XG4gICAgZWdfQz1uZXcgQXJyYXkoayk7XG4gICAgZWdfRD1uZXcgQXJyYXkoayk7XG4gIH1cbiAgd2hpbGUoISh4WzBdJjEpICAmJiAhKHlbMF0mMSkpIHsgIC8vd2hpbGUgeCBhbmQgeSBib3RoIGV2ZW5cbiAgICBoYWx2ZV8oeCk7XG4gICAgaGFsdmVfKHkpO1xuICAgIGcrKztcbiAgfVxuICBjb3B5XyhlZ191LHgpO1xuICBjb3B5Xyh2LHkpO1xuICBjb3B5SW50XyhlZ19BLDEpO1xuICBjb3B5SW50XyhlZ19CLDApO1xuICBjb3B5SW50XyhlZ19DLDApO1xuICBjb3B5SW50XyhlZ19ELDEpO1xuICBmb3IgKDs7KSB7XG4gICAgd2hpbGUoIShlZ191WzBdJjEpKSB7ICAvL3doaWxlIHUgaXMgZXZlblxuICAgICAgaGFsdmVfKGVnX3UpO1xuICAgICAgaWYgKCEoZWdfQVswXSYxKSAmJiAhKGVnX0JbMF0mMSkpIHsgLy9pZiBBPT1CPT0wIG1vZCAyXG4gICAgICAgIGhhbHZlXyhlZ19BKTtcbiAgICAgICAgaGFsdmVfKGVnX0IpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWRkXyhlZ19BLHkpOyAgaGFsdmVfKGVnX0EpO1xuICAgICAgICBzdWJfKGVnX0IseCk7ICBoYWx2ZV8oZWdfQik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgd2hpbGUgKCEodlswXSYxKSkgeyAgLy93aGlsZSB2IGlzIGV2ZW5cbiAgICAgIGhhbHZlXyh2KTtcbiAgICAgIGlmICghKGVnX0NbMF0mMSkgJiYgIShlZ19EWzBdJjEpKSB7IC8vaWYgQz09RD09MCBtb2QgMlxuICAgICAgICBoYWx2ZV8oZWdfQyk7XG4gICAgICAgIGhhbHZlXyhlZ19EKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFkZF8oZWdfQyx5KTsgIGhhbHZlXyhlZ19DKTtcbiAgICAgICAgc3ViXyhlZ19ELHgpOyAgaGFsdmVfKGVnX0QpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghZ3JlYXRlcih2LGVnX3UpKSB7IC8vdjw9dVxuICAgICAgc3ViXyhlZ191LHYpO1xuICAgICAgc3ViXyhlZ19BLGVnX0MpO1xuICAgICAgc3ViXyhlZ19CLGVnX0QpO1xuICAgIH0gZWxzZSB7ICAgICAgICAgICAgICAgIC8vdj51XG4gICAgICBzdWJfKHYsZWdfdSk7XG4gICAgICBzdWJfKGVnX0MsZWdfQSk7XG4gICAgICBzdWJfKGVnX0QsZWdfQik7XG4gICAgfVxuICAgIGlmIChlcXVhbHNJbnQoZWdfdSwwKSkge1xuICAgICAgaWYgKG5lZ2F0aXZlKGVnX0MpKSB7ICAgLy9tYWtlIHN1cmUgYSAoQylpcyBub25uZWdhdGl2ZVxuICAgICAgICBhZGRfKGVnX0MseSk7XG4gICAgICAgIHN1Yl8oZWdfRCx4KTtcbiAgICAgIH1cbiAgICAgIG11bHRJbnRfKGVnX0QsLTEpOyAgLy8vbWFrZSBzdXJlIGIgKEQpIGlzIG5vbm5lZ2F0aXZlXG4gICAgICBjb3B5XyhhLGVnX0MpO1xuICAgICAgY29weV8oYixlZ19EKTtcbiAgICAgIGxlZnRTaGlmdF8odixnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cbn1cblxuXG4vL2lzIGJpZ0ludCB4IG5lZ2F0aXZlP1xuZnVuY3Rpb24gbmVnYXRpdmUoeCkge1xuICByZXR1cm4gKCh4W3gubGVuZ3RoLTFdPj4oYnBlLTEpKSYxKTtcbn1cblxuXG4vL2lzICh4IDw8IChzaGlmdCpicGUpKSA+IHk/XG4vL3ggYW5kIHkgYXJlIG5vbm5lZ2F0aXZlIGJpZ0ludHNcbi8vc2hpZnQgaXMgYSBub25uZWdhdGl2ZSBpbnRlZ2VyXG5mdW5jdGlvbiBncmVhdGVyU2hpZnQoeCx5LHNoaWZ0KSB7XG4gIHZhciBpLCBreD14Lmxlbmd0aCwga3k9eS5sZW5ndGg7XG4gIGs9KChreCtzaGlmdCk8a3kpID8gKGt4K3NoaWZ0KSA6IGt5O1xuICBmb3IgKGk9a3ktMS1zaGlmdDsgaTxreCAmJiBpPj0wOyBpKyspXG4gICAgaWYgKHhbaV0+MClcbiAgICAgIHJldHVybiAxOyAvL2lmIHRoZXJlIGFyZSBub256ZXJvcyBpbiB4IHRvIHRoZSBsZWZ0IG9mIHRoZSBmaXJzdCBjb2x1bW4gb2YgeSwgdGhlbiB4IGlzIGJpZ2dlclxuICBmb3IgKGk9a3gtMStzaGlmdDsgaTxreTsgaSsrKVxuICAgIGlmICh5W2ldPjApXG4gICAgICByZXR1cm4gMDsgLy9pZiB0aGVyZSBhcmUgbm9uemVyb3MgaW4geSB0byB0aGUgbGVmdCBvZiB0aGUgZmlyc3QgY29sdW1uIG9mIHgsIHRoZW4geCBpcyBub3QgYmlnZ2VyXG4gIGZvciAoaT1rLTE7IGk+PXNoaWZ0OyBpLS0pXG4gICAgaWYgICAgICAoeFtpLXNoaWZ0XT55W2ldKSByZXR1cm4gMTtcbiAgICBlbHNlIGlmICh4W2ktc2hpZnRdPHlbaV0pIHJldHVybiAwO1xuICByZXR1cm4gMDtcbn1cblxuLy9pcyB4ID4geT8gKHggYW5kIHkgYm90aCBub25uZWdhdGl2ZSlcbmZ1bmN0aW9uIGdyZWF0ZXIoeCx5KSB7XG4gIHZhciBpO1xuICB2YXIgaz0oeC5sZW5ndGg8eS5sZW5ndGgpID8geC5sZW5ndGggOiB5Lmxlbmd0aDtcblxuICBmb3IgKGk9eC5sZW5ndGg7aTx5Lmxlbmd0aDtpKyspXG4gICAgaWYgKHlbaV0pXG4gICAgICByZXR1cm4gMDsgIC8veSBoYXMgbW9yZSBkaWdpdHNcblxuICBmb3IgKGk9eS5sZW5ndGg7aTx4Lmxlbmd0aDtpKyspXG4gICAgaWYgKHhbaV0pXG4gICAgICByZXR1cm4gMTsgIC8veCBoYXMgbW9yZSBkaWdpdHNcblxuICBmb3IgKGk9ay0xO2k+PTA7aS0tKVxuICAgIGlmICh4W2ldPnlbaV0pXG4gICAgICByZXR1cm4gMTtcbiAgICBlbHNlIGlmICh4W2ldPHlbaV0pXG4gICAgICByZXR1cm4gMDtcbiAgcmV0dXJuIDA7XG59XG5cbi8vZGl2aWRlIHggYnkgeSBnaXZpbmcgcXVvdGllbnQgcSBhbmQgcmVtYWluZGVyIHIuICAocT1mbG9vcih4L3kpLCAgcj14IG1vZCB5KS4gIEFsbCA0IGFyZSBiaWdpbnRzLlxuLy94IG11c3QgaGF2ZSBhdCBsZWFzdCBvbmUgbGVhZGluZyB6ZXJvIGVsZW1lbnQuXG4vL3kgbXVzdCBiZSBub256ZXJvLlxuLy9xIGFuZCByIG11c3QgYmUgYXJyYXlzIHRoYXQgYXJlIGV4YWN0bHkgdGhlIHNhbWUgbGVuZ3RoIGFzIHguIChPciBxIGNhbiBoYXZlIG1vcmUpLlxuLy9NdXN0IGhhdmUgeC5sZW5ndGggPj0geS5sZW5ndGggPj0gMi5cbmZ1bmN0aW9uIGRpdmlkZV8oeCx5LHEscikge1xuICB2YXIga3gsIGt5O1xuICB2YXIgaSxqLHkxLHkyLGMsYSxiO1xuICBjb3B5XyhyLHgpO1xuICBmb3IgKGt5PXkubGVuZ3RoO3lba3ktMV09PTA7a3ktLSk7IC8va3kgaXMgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHksIG5vdCBpbmNsdWRpbmcgbGVhZGluZyB6ZXJvc1xuXG4gIC8vbm9ybWFsaXplOiBlbnN1cmUgdGhlIG1vc3Qgc2lnbmlmaWNhbnQgZWxlbWVudCBvZiB5IGhhcyBpdHMgaGlnaGVzdCBiaXQgc2V0XG4gIGI9eVtreS0xXTtcbiAgZm9yIChhPTA7IGI7IGErKylcbiAgICBiPj49MTtcbiAgYT1icGUtYTsgIC8vYSBpcyBob3cgbWFueSBiaXRzIHRvIHNoaWZ0IHNvIHRoYXQgdGhlIGhpZ2ggb3JkZXIgYml0IG9mIHkgaXMgbGVmdG1vc3QgaW4gaXRzIGFycmF5IGVsZW1lbnRcbiAgbGVmdFNoaWZ0Xyh5LGEpOyAgLy9tdWx0aXBseSBib3RoIGJ5IDE8PGEgbm93LCB0aGVuIGRpdmlkZSBib3RoIGJ5IHRoYXQgYXQgdGhlIGVuZFxuICBsZWZ0U2hpZnRfKHIsYSk7XG5cbiAgLy9Sb2IgVmlzc2VyIGRpc2NvdmVyZWQgYSBidWc6IHRoZSBmb2xsb3dpbmcgbGluZSB3YXMgb3JpZ2luYWxseSBqdXN0IGJlZm9yZSB0aGUgbm9ybWFsaXphdGlvbi5cbiAgZm9yIChreD1yLmxlbmd0aDtyW2t4LTFdPT0wICYmIGt4Pmt5O2t4LS0pOyAvL2t4IGlzIG51bWJlciBvZiBlbGVtZW50cyBpbiBub3JtYWxpemVkIHgsIG5vdCBpbmNsdWRpbmcgbGVhZGluZyB6ZXJvc1xuXG4gIGNvcHlJbnRfKHEsMCk7ICAgICAgICAgICAgICAgICAgICAgIC8vIHE9MFxuICB3aGlsZSAoIWdyZWF0ZXJTaGlmdCh5LHIsa3gta3kpKSB7ICAvLyB3aGlsZSAobGVmdFNoaWZ0Xyh5LGt4LWt5KSA8PSByKSB7XG4gICAgc3ViU2hpZnRfKHIseSxreC1reSk7ICAgICAgICAgICAgIC8vICAgcj1yLWxlZnRTaGlmdF8oeSxreC1reSlcbiAgICBxW2t4LWt5XSsrOyAgICAgICAgICAgICAgICAgICAgICAgLy8gICBxW2t4LWt5XSsrO1xuICB9ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB9XG5cbiAgZm9yIChpPWt4LTE7IGk+PWt5OyBpLS0pIHtcbiAgICBpZiAocltpXT09eVtreS0xXSlcbiAgICAgIHFbaS1reV09bWFzaztcbiAgICBlbHNlXG4gICAgICBxW2kta3ldPU1hdGguZmxvb3IoKHJbaV0qcmFkaXgrcltpLTFdKS95W2t5LTFdKTtcblxuICAgIC8vVGhlIGZvbGxvd2luZyBmb3IoOzspIGxvb3AgaXMgZXF1aXZhbGVudCB0byB0aGUgY29tbWVudGVkIHdoaWxlIGxvb3AsXG4gICAgLy9leGNlcHQgdGhhdCB0aGUgdW5jb21tZW50ZWQgdmVyc2lvbiBhdm9pZHMgb3ZlcmZsb3cuXG4gICAgLy9UaGUgY29tbWVudGVkIGxvb3AgY29tZXMgZnJvbSBIQUMsIHdoaWNoIGFzc3VtZXMgclstMV09PXlbLTFdPT0wXG4gICAgLy8gIHdoaWxlIChxW2kta3ldKih5W2t5LTFdKnJhZGl4K3lba3ktMl0pID4gcltpXSpyYWRpeCpyYWRpeCtyW2ktMV0qcmFkaXgrcltpLTJdKVxuICAgIC8vICAgIHFbaS1reV0tLTtcbiAgICBmb3IgKDs7KSB7XG4gICAgICB5Mj0oa3k+MSA/IHlba3ktMl0gOiAwKSpxW2kta3ldO1xuICAgICAgYz15Mj4+YnBlO1xuICAgICAgeTI9eTIgJiBtYXNrO1xuICAgICAgeTE9YytxW2kta3ldKnlba3ktMV07XG4gICAgICBjPXkxPj5icGU7XG4gICAgICB5MT15MSAmIG1hc2s7XG5cbiAgICAgIGlmIChjPT1yW2ldID8geTE9PXJbaS0xXSA/IHkyPihpPjEgPyByW2ktMl0gOiAwKSA6IHkxPnJbaS0xXSA6IGM+cltpXSlcbiAgICAgICAgcVtpLWt5XS0tO1xuICAgICAgZWxzZVxuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBsaW5Db21iU2hpZnRfKHIseSwtcVtpLWt5XSxpLWt5KTsgICAgLy9yPXItcVtpLWt5XSpsZWZ0U2hpZnRfKHksaS1reSlcbiAgICBpZiAobmVnYXRpdmUocikpIHtcbiAgICAgIGFkZFNoaWZ0XyhyLHksaS1reSk7ICAgICAgICAgLy9yPXIrbGVmdFNoaWZ0Xyh5LGkta3kpXG4gICAgICBxW2kta3ldLS07XG4gICAgfVxuICB9XG5cbiAgcmlnaHRTaGlmdF8oeSxhKTsgIC8vdW5kbyB0aGUgbm9ybWFsaXphdGlvbiBzdGVwXG4gIHJpZ2h0U2hpZnRfKHIsYSk7ICAvL3VuZG8gdGhlIG5vcm1hbGl6YXRpb24gc3RlcFxufVxuXG4vL2RvIGNhcnJpZXMgYW5kIGJvcnJvd3Mgc28gZWFjaCBlbGVtZW50IG9mIHRoZSBiaWdJbnQgeCBmaXRzIGluIGJwZSBiaXRzLlxuZnVuY3Rpb24gY2FycnlfKHgpIHtcbiAgdmFyIGksayxjLGI7XG4gIGs9eC5sZW5ndGg7XG4gIGM9MDtcbiAgZm9yIChpPTA7aTxrO2krKykge1xuICAgIGMrPXhbaV07XG4gICAgYj0wO1xuICAgIGlmIChjPDApIHtcbiAgICAgIGI9LShjPj5icGUpO1xuICAgICAgYys9YipyYWRpeDtcbiAgICB9XG4gICAgeFtpXT1jICYgbWFzaztcbiAgICBjPShjPj5icGUpLWI7XG4gIH1cbn1cblxuLy9yZXR1cm4geCBtb2QgbiBmb3IgYmlnSW50IHggYW5kIGludGVnZXIgbi5cbmZ1bmN0aW9uIG1vZEludCh4LG4pIHtcbiAgdmFyIGksYz0wO1xuICBmb3IgKGk9eC5sZW5ndGgtMTsgaT49MDsgaS0tKVxuICAgIGM9KGMqcmFkaXgreFtpXSklbjtcbiAgcmV0dXJuIGM7XG59XG5cbi8vY29udmVydCB0aGUgaW50ZWdlciB0IGludG8gYSBiaWdJbnQgd2l0aCBhdCBsZWFzdCB0aGUgZ2l2ZW4gbnVtYmVyIG9mIGJpdHMuXG4vL3RoZSByZXR1cm5lZCBhcnJheSBzdG9yZXMgdGhlIGJpZ0ludCBpbiBicGUtYml0IGNodW5rcywgbGl0dGxlIGVuZGlhbiAoYnVmZlswXSBpcyBsZWFzdCBzaWduaWZpY2FudCB3b3JkKVxuLy9QYWQgdGhlIGFycmF5IHdpdGggbGVhZGluZyB6ZXJvcyBzbyB0aGF0IGl0IGhhcyBhdCBsZWFzdCBtaW5TaXplIGVsZW1lbnRzLlxuLy9UaGVyZSB3aWxsIGFsd2F5cyBiZSBhdCBsZWFzdCBvbmUgbGVhZGluZyAwIGVsZW1lbnQuXG5mdW5jdGlvbiBpbnQyYmlnSW50KHQsYml0cyxtaW5TaXplKSB7XG4gIHZhciBpLGs7XG4gIGs9TWF0aC5jZWlsKGJpdHMvYnBlKSsxO1xuICBrPW1pblNpemU+ayA/IG1pblNpemUgOiBrO1xuICBidWZmPW5ldyBBcnJheShrKTtcbiAgY29weUludF8oYnVmZix0KTtcbiAgcmV0dXJuIGJ1ZmY7XG59XG5cbi8vcmV0dXJuIHRoZSBiaWdJbnQgZ2l2ZW4gYSBzdHJpbmcgcmVwcmVzZW50YXRpb24gaW4gYSBnaXZlbiBiYXNlLlxuLy9QYWQgdGhlIGFycmF5IHdpdGggbGVhZGluZyB6ZXJvcyBzbyB0aGF0IGl0IGhhcyBhdCBsZWFzdCBtaW5TaXplIGVsZW1lbnRzLlxuLy9JZiBiYXNlPS0xLCB0aGVuIGl0IHJlYWRzIGluIGEgc3BhY2Utc2VwYXJhdGVkIGxpc3Qgb2YgYXJyYXkgZWxlbWVudHMgaW4gZGVjaW1hbC5cbi8vVGhlIGFycmF5IHdpbGwgYWx3YXlzIGhhdmUgYXQgbGVhc3Qgb25lIGxlYWRpbmcgemVybywgdW5sZXNzIGJhc2U9LTEuXG5mdW5jdGlvbiBzdHIyYmlnSW50KHMsYixtaW5TaXplKSB7XG4gIHZhciBkLCBpLCBqLCBiYXNlLCBzdHIsIHgsIHksIGtrO1xuICBpZiAodHlwZW9mIGIgPT09ICdzdHJpbmcnKSB7XG5cdCAgYmFzZSA9IGIubGVuZ3RoO1xuXHQgIHN0ciA9IGI7XG4gIH0gZWxzZSB7XG5cdCAgYmFzZSA9IGI7XG5cdCAgc3RyID0gZGlnaXRzU3RyO1xuICB9XG4gIHZhciBrPXMubGVuZ3RoO1xuICBpZiAoYmFzZT09LTEpIHsgLy9jb21tYS1zZXBhcmF0ZWQgbGlzdCBvZiBhcnJheSBlbGVtZW50cyBpbiBkZWNpbWFsXG4gICAgeD1uZXcgQXJyYXkoMCk7XG4gICAgZm9yICg7Oykge1xuICAgICAgeT1uZXcgQXJyYXkoeC5sZW5ndGgrMSk7XG4gICAgICBmb3IgKGk9MDtpPHgubGVuZ3RoO2krKylcbiAgICAgICAgeVtpKzFdPXhbaV07XG4gICAgICB5WzBdPXBhcnNlSW50KHMsMTApO1xuICAgICAgeD15O1xuICAgICAgZD1zLmluZGV4T2YoJywnLDApO1xuICAgICAgaWYgKGQ8MSlcbiAgICAgICAgYnJlYWs7XG4gICAgICBzPXMuc3Vic3RyaW5nKGQrMSk7XG4gICAgICBpZiAocy5sZW5ndGg9PTApXG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBpZiAoeC5sZW5ndGg8bWluU2l6ZSkge1xuICAgICAgeT1uZXcgQXJyYXkobWluU2l6ZSk7XG4gICAgICBjb3B5Xyh5LHgpO1xuICAgICAgcmV0dXJuIHk7XG4gICAgfVxuICAgIHJldHVybiB4O1xuICB9XG5cbiAgeD1pbnQyYmlnSW50KDAsYmFzZSprLDApO1xuICBmb3IgKGk9MDtpPGs7aSsrKSB7XG4gICAgZD1zdHIuaW5kZXhPZihzLnN1YnN0cmluZyhpLGkrMSksMCk7XG4vLyAgICBpZiAoYmFzZTw9MzYgJiYgZD49MzYpICAvL2NvbnZlcnQgbG93ZXJjYXNlIHRvIHVwcGVyY2FzZSBpZiBiYXNlPD0zNlxuLy8gICAgICBkLT0yNjtcbiAgICBpZiAoZD49YmFzZSB8fCBkPDApIHsgICAvL2lnbm9yZSBpbGxlZ2FsIGNoYXJhY3RlcnNcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBtdWx0SW50Xyh4LGJhc2UpO1xuICAgIGFkZEludF8oeCxkKTtcbiAgfVxuXG4gIGZvciAoaz14Lmxlbmd0aDtrPjAgJiYgIXhbay0xXTtrLS0pOyAvL3N0cmlwIG9mZiBsZWFkaW5nIHplcm9zXG4gIGs9bWluU2l6ZT5rKzEgPyBtaW5TaXplIDogaysxO1xuICB5PW5ldyBBcnJheShrKTtcbiAga2s9azx4Lmxlbmd0aCA/IGsgOiB4Lmxlbmd0aDtcbiAgZm9yIChpPTA7aTxraztpKyspXG4gICAgeVtpXT14W2ldO1xuICBmb3IgKDtpPGs7aSsrKVxuICAgIHlbaV09MDtcbiAgcmV0dXJuIHk7XG59XG5cbi8vaXMgYmlnaW50IHggZXF1YWwgdG8gaW50ZWdlciB5P1xuLy95IG11c3QgaGF2ZSBsZXNzIHRoYW4gYnBlIGJpdHNcbmZ1bmN0aW9uIGVxdWFsc0ludCh4LHkpIHtcbiAgdmFyIGk7XG4gIGlmICh4WzBdIT15KVxuICAgIHJldHVybiAwO1xuICBmb3IgKGk9MTtpPHgubGVuZ3RoO2krKylcbiAgICBpZiAoeFtpXSlcbiAgICAgIHJldHVybiAwO1xuICByZXR1cm4gMTtcbn1cblxuLy9hcmUgYmlnaW50cyB4IGFuZCB5IGVxdWFsP1xuLy90aGlzIHdvcmtzIGV2ZW4gaWYgeCBhbmQgeSBhcmUgZGlmZmVyZW50IGxlbmd0aHMgYW5kIGhhdmUgYXJiaXRyYXJpbHkgbWFueSBsZWFkaW5nIHplcm9zXG5mdW5jdGlvbiBlcXVhbHMoeCx5KSB7XG4gIHZhciBpO1xuICB2YXIgaz14Lmxlbmd0aDx5Lmxlbmd0aCA/IHgubGVuZ3RoIDogeS5sZW5ndGg7XG4gIGZvciAoaT0wO2k8aztpKyspXG4gICAgaWYgKHhbaV0hPXlbaV0pXG4gICAgICByZXR1cm4gMDtcbiAgaWYgKHgubGVuZ3RoPnkubGVuZ3RoKSB7XG4gICAgZm9yICg7aTx4Lmxlbmd0aDtpKyspXG4gICAgICBpZiAoeFtpXSlcbiAgICAgICAgcmV0dXJuIDA7XG4gIH0gZWxzZSB7XG4gICAgZm9yICg7aTx5Lmxlbmd0aDtpKyspXG4gICAgICBpZiAoeVtpXSlcbiAgICAgICAgcmV0dXJuIDA7XG4gIH1cbiAgcmV0dXJuIDE7XG59XG5cbi8vaXMgdGhlIGJpZ0ludCB4IGVxdWFsIHRvIHplcm8/XG5mdW5jdGlvbiBpc1plcm8oeCkge1xuICB2YXIgaTtcbiAgZm9yIChpPTA7aTx4Lmxlbmd0aDtpKyspXG4gICAgaWYgKHhbaV0pXG4gICAgICByZXR1cm4gMDtcbiAgcmV0dXJuIDE7XG59XG5cbi8vY29udmVydCBhIGJpZ0ludCBpbnRvIGEgc3RyaW5nIGluIGEgZ2l2ZW4gYmFzZSwgZnJvbSBiYXNlIDIgdXAgdG8gYmFzZSA5NS5cbi8vQmFzZSAtMSBwcmludHMgdGhlIGNvbnRlbnRzIG9mIHRoZSBhcnJheSByZXByZXNlbnRpbmcgdGhlIG51bWJlci5cbmZ1bmN0aW9uIGJpZ0ludDJzdHIoeCxiKSB7XG4gIHZhciBpLHQsYmFzZSxzdHIscz1cIlwiO1xuICBpZiAodHlwZW9mIGIgPT09ICdzdHJpbmcnKSB7XG5cdCAgYmFzZSA9IGIubGVuZ3RoO1xuXHQgIHN0ciA9IGI7XG4gIH0gZWxzZSB7XG5cdCAgYmFzZSA9IGI7XG5cdCAgc3RyID0gZGlnaXRzU3RyO1xuICB9XG5cbiAgaWYgKHM2Lmxlbmd0aCE9eC5sZW5ndGgpXG4gICAgczY9ZHVwKHgpO1xuICBlbHNlXG4gICAgY29weV8oczYseCk7XG5cbiAgaWYgKGJhc2U9PS0xKSB7IC8vcmV0dXJuIHRoZSBsaXN0IG9mIGFycmF5IGNvbnRlbnRzXG4gICAgZm9yIChpPXgubGVuZ3RoLTE7aT4wO2ktLSlcbiAgICAgIHMrPXhbaV0rJywnO1xuICAgIHMrPXhbMF07XG4gIH1cbiAgZWxzZSB7IC8vcmV0dXJuIGl0IGluIHRoZSBnaXZlbiBiYXNlXG4gICAgd2hpbGUgKCFpc1plcm8oczYpKSB7XG4gICAgICB0PWRpdkludF8oczYsYmFzZSk7ICAvL3Q9czYgJSBiYXNlOyBzNj1mbG9vcihzNi9iYXNlKTtcbiAgICAgIHM9c3RyLnN1YnN0cmluZyh0LHQrMSkrcztcbiAgICB9XG4gIH1cbiAgaWYgKHMubGVuZ3RoPT0wKVxuICAgIHM9c3RyWzBdO1xuICByZXR1cm4gcztcbn1cblxuLy9yZXR1cm5zIGEgZHVwbGljYXRlIG9mIGJpZ0ludCB4XG5mdW5jdGlvbiBkdXAoeCkge1xuICB2YXIgaTtcbiAgYnVmZj1uZXcgQXJyYXkoeC5sZW5ndGgpO1xuICBjb3B5XyhidWZmLHgpO1xuICByZXR1cm4gYnVmZjtcbn1cblxuLy9kbyB4PXkgb24gYmlnSW50cyB4IGFuZCB5LiAgeCBtdXN0IGJlIGFuIGFycmF5IGF0IGxlYXN0IGFzIGJpZyBhcyB5IChub3QgY291bnRpbmcgdGhlIGxlYWRpbmcgemVyb3MgaW4geSkuXG5mdW5jdGlvbiBjb3B5Xyh4LHkpIHtcbiAgdmFyIGk7XG4gIHZhciBrPXgubGVuZ3RoPHkubGVuZ3RoID8geC5sZW5ndGggOiB5Lmxlbmd0aDtcbiAgZm9yIChpPTA7aTxrO2krKylcbiAgICB4W2ldPXlbaV07XG4gIGZvciAoaT1rO2k8eC5sZW5ndGg7aSsrKVxuICAgIHhbaV09MDtcbn1cblxuLy9kbyB4PXkgb24gYmlnSW50IHggYW5kIGludGVnZXIgeS5cbmZ1bmN0aW9uIGNvcHlJbnRfKHgsbikge1xuICB2YXIgaSxjO1xuICBmb3IgKGM9bixpPTA7aTx4Lmxlbmd0aDtpKyspIHtcbiAgICB4W2ldPWMgJiBtYXNrO1xuICAgIGM+Pj1icGU7XG4gIH1cbn1cblxuLy9kbyB4PXgrbiB3aGVyZSB4IGlzIGEgYmlnSW50IGFuZCBuIGlzIGFuIGludGVnZXIuXG4vL3ggbXVzdCBiZSBsYXJnZSBlbm91Z2ggdG8gaG9sZCB0aGUgcmVzdWx0LlxuZnVuY3Rpb24gYWRkSW50Xyh4LG4pIHtcbiAgdmFyIGksayxjLGI7XG4gIHhbMF0rPW47XG4gIGs9eC5sZW5ndGg7XG4gIGM9MDtcbiAgZm9yIChpPTA7aTxrO2krKykge1xuICAgIGMrPXhbaV07XG4gICAgYj0wO1xuICAgIGlmIChjPDApIHtcbiAgICAgIGI9LShjPj5icGUpO1xuICAgICAgYys9YipyYWRpeDtcbiAgICB9XG4gICAgeFtpXT1jICYgbWFzaztcbiAgICBjPShjPj5icGUpLWI7XG4gICAgaWYgKCFjKSByZXR1cm47IC8vc3RvcCBjYXJyeWluZyBhcyBzb29uIGFzIHRoZSBjYXJyeSBpcyB6ZXJvXG4gIH1cbn1cblxuLy9yaWdodCBzaGlmdCBiaWdJbnQgeCBieSBuIGJpdHMuICAwIDw9IG4gPCBicGUuXG5mdW5jdGlvbiByaWdodFNoaWZ0Xyh4LG4pIHtcbiAgdmFyIGk7XG4gIHZhciBrPU1hdGguZmxvb3Iobi9icGUpO1xuICBpZiAoaykge1xuICAgIGZvciAoaT0wO2k8eC5sZW5ndGgtaztpKyspIC8vcmlnaHQgc2hpZnQgeCBieSBrIGVsZW1lbnRzXG4gICAgICB4W2ldPXhbaStrXTtcbiAgICBmb3IgKDtpPHgubGVuZ3RoO2krKylcbiAgICAgIHhbaV09MDtcbiAgICBuJT1icGU7XG4gIH1cbiAgZm9yIChpPTA7aTx4Lmxlbmd0aC0xO2krKykge1xuICAgIHhbaV09bWFzayAmICgoeFtpKzFdPDwoYnBlLW4pKSB8ICh4W2ldPj5uKSk7XG4gIH1cbiAgeFtpXT4+PW47XG59XG5cbi8vZG8geD1mbG9vcih8eHwvMikqc2duKHgpIGZvciBiaWdJbnQgeCBpbiAyJ3MgY29tcGxlbWVudFxuZnVuY3Rpb24gaGFsdmVfKHgpIHtcbiAgdmFyIGk7XG4gIGZvciAoaT0wO2k8eC5sZW5ndGgtMTtpKyspIHtcbiAgICB4W2ldPW1hc2sgJiAoKHhbaSsxXTw8KGJwZS0xKSkgfCAoeFtpXT4+MSkpO1xuICB9XG4gIHhbaV09KHhbaV0+PjEpIHwgKHhbaV0gJiAocmFkaXg+PjEpKTsgIC8vbW9zdCBzaWduaWZpY2FudCBiaXQgc3RheXMgdGhlIHNhbWVcbn1cblxuLy9sZWZ0IHNoaWZ0IGJpZ0ludCB4IGJ5IG4gYml0cy5cbmZ1bmN0aW9uIGxlZnRTaGlmdF8oeCxuKSB7XG4gIHZhciBpO1xuICB2YXIgaz1NYXRoLmZsb29yKG4vYnBlKTtcbiAgaWYgKGspIHtcbiAgICBmb3IgKGk9eC5sZW5ndGg7IGk+PWs7IGktLSkgLy9sZWZ0IHNoaWZ0IHggYnkgayBlbGVtZW50c1xuICAgICAgeFtpXT14W2kta107XG4gICAgZm9yICg7aT49MDtpLS0pXG4gICAgICB4W2ldPTA7XG4gICAgbiU9YnBlO1xuICB9XG4gIGlmICghbilcbiAgICByZXR1cm47XG4gIGZvciAoaT14Lmxlbmd0aC0xO2k+MDtpLS0pIHtcbiAgICB4W2ldPW1hc2sgJiAoKHhbaV08PG4pIHwgKHhbaS0xXT4+KGJwZS1uKSkpO1xuICB9XG4gIHhbaV09bWFzayAmICh4W2ldPDxuKTtcbn1cblxuLy9kbyB4PXgqbiB3aGVyZSB4IGlzIGEgYmlnSW50IGFuZCBuIGlzIGFuIGludGVnZXIuXG4vL3ggbXVzdCBiZSBsYXJnZSBlbm91Z2ggdG8gaG9sZCB0aGUgcmVzdWx0LlxuZnVuY3Rpb24gbXVsdEludF8oeCxuKSB7XG4gIHZhciBpLGssYyxiO1xuICBpZiAoIW4pXG4gICAgcmV0dXJuO1xuICBrPXgubGVuZ3RoO1xuICBjPTA7XG4gIGZvciAoaT0wO2k8aztpKyspIHtcbiAgICBjKz14W2ldKm47XG4gICAgYj0wO1xuICAgIGlmIChjPDApIHtcbiAgICAgIGI9LShjPj5icGUpO1xuICAgICAgYys9YipyYWRpeDtcbiAgICB9XG4gICAgeFtpXT1jICYgbWFzaztcbiAgICBjPShjPj5icGUpLWI7XG4gIH1cbn1cblxuLy9kbyB4PWZsb29yKHgvbikgZm9yIGJpZ0ludCB4IGFuZCBpbnRlZ2VyIG4sIGFuZCByZXR1cm4gdGhlIHJlbWFpbmRlclxuZnVuY3Rpb24gZGl2SW50Xyh4LG4pIHtcbiAgdmFyIGkscj0wLHM7XG4gIGZvciAoaT14Lmxlbmd0aC0xO2k+PTA7aS0tKSB7XG4gICAgcz1yKnJhZGl4K3hbaV07XG4gICAgeFtpXT1NYXRoLmZsb29yKHMvbik7XG4gICAgcj1zJW47XG4gIH1cbiAgcmV0dXJuIHI7XG59XG5cbi8vZG8gdGhlIGxpbmVhciBjb21iaW5hdGlvbiB4PWEqeCtiKnkgZm9yIGJpZ0ludHMgeCBhbmQgeSwgYW5kIGludGVnZXJzIGEgYW5kIGIuXG4vL3ggbXVzdCBiZSBsYXJnZSBlbm91Z2ggdG8gaG9sZCB0aGUgYW5zd2VyLlxuZnVuY3Rpb24gbGluQ29tYl8oeCx5LGEsYikge1xuICB2YXIgaSxjLGssa2s7XG4gIGs9eC5sZW5ndGg8eS5sZW5ndGggPyB4Lmxlbmd0aCA6IHkubGVuZ3RoO1xuICBraz14Lmxlbmd0aDtcbiAgZm9yIChjPTAsaT0wO2k8aztpKyspIHtcbiAgICBjKz1hKnhbaV0rYip5W2ldO1xuICAgIHhbaV09YyAmIG1hc2s7XG4gICAgYz4+PWJwZTtcbiAgfVxuICBmb3IgKGk9aztpPGtrO2krKykge1xuICAgIGMrPWEqeFtpXTtcbiAgICB4W2ldPWMgJiBtYXNrO1xuICAgIGM+Pj1icGU7XG4gIH1cbn1cblxuLy9kbyB0aGUgbGluZWFyIGNvbWJpbmF0aW9uIHg9YSp4K2IqKHk8PCh5cypicGUpKSBmb3IgYmlnSW50cyB4IGFuZCB5LCBhbmQgaW50ZWdlcnMgYSwgYiBhbmQgeXMuXG4vL3ggbXVzdCBiZSBsYXJnZSBlbm91Z2ggdG8gaG9sZCB0aGUgYW5zd2VyLlxuZnVuY3Rpb24gbGluQ29tYlNoaWZ0Xyh4LHksYix5cykge1xuICB2YXIgaSxjLGssa2s7XG4gIGs9eC5sZW5ndGg8eXMreS5sZW5ndGggPyB4Lmxlbmd0aCA6IHlzK3kubGVuZ3RoO1xuICBraz14Lmxlbmd0aDtcbiAgZm9yIChjPTAsaT15cztpPGs7aSsrKSB7XG4gICAgYys9eFtpXStiKnlbaS15c107XG4gICAgeFtpXT1jICYgbWFzaztcbiAgICBjPj49YnBlO1xuICB9XG4gIGZvciAoaT1rO2MgJiYgaTxraztpKyspIHtcbiAgICBjKz14W2ldO1xuICAgIHhbaV09YyAmIG1hc2s7XG4gICAgYz4+PWJwZTtcbiAgfVxufVxuXG4vL2RvIHg9eCsoeTw8KHlzKmJwZSkpIGZvciBiaWdJbnRzIHggYW5kIHksIGFuZCBpbnRlZ2VycyBhLGIgYW5kIHlzLlxuLy94IG11c3QgYmUgbGFyZ2UgZW5vdWdoIHRvIGhvbGQgdGhlIGFuc3dlci5cbmZ1bmN0aW9uIGFkZFNoaWZ0Xyh4LHkseXMpIHtcbiAgdmFyIGksYyxrLGtrO1xuICBrPXgubGVuZ3RoPHlzK3kubGVuZ3RoID8geC5sZW5ndGggOiB5cyt5Lmxlbmd0aDtcbiAga2s9eC5sZW5ndGg7XG4gIGZvciAoYz0wLGk9eXM7aTxrO2krKykge1xuICAgIGMrPXhbaV0reVtpLXlzXTtcbiAgICB4W2ldPWMgJiBtYXNrO1xuICAgIGM+Pj1icGU7XG4gIH1cbiAgZm9yIChpPWs7YyAmJiBpPGtrO2krKykge1xuICAgIGMrPXhbaV07XG4gICAgeFtpXT1jICYgbWFzaztcbiAgICBjPj49YnBlO1xuICB9XG59XG5cbi8vZG8geD14LSh5PDwoeXMqYnBlKSkgZm9yIGJpZ0ludHMgeCBhbmQgeSwgYW5kIGludGVnZXJzIGEsYiBhbmQgeXMuXG4vL3ggbXVzdCBiZSBsYXJnZSBlbm91Z2ggdG8gaG9sZCB0aGUgYW5zd2VyLlxuZnVuY3Rpb24gc3ViU2hpZnRfKHgseSx5cykge1xuICB2YXIgaSxjLGssa2s7XG4gIGs9eC5sZW5ndGg8eXMreS5sZW5ndGggPyB4Lmxlbmd0aCA6IHlzK3kubGVuZ3RoO1xuICBraz14Lmxlbmd0aDtcbiAgZm9yIChjPTAsaT15cztpPGs7aSsrKSB7XG4gICAgYys9eFtpXS15W2kteXNdO1xuICAgIHhbaV09YyAmIG1hc2s7XG4gICAgYz4+PWJwZTtcbiAgfVxuICBmb3IgKGk9aztjICYmIGk8a2s7aSsrKSB7XG4gICAgYys9eFtpXTtcbiAgICB4W2ldPWMgJiBtYXNrO1xuICAgIGM+Pj1icGU7XG4gIH1cbn1cblxuLy9kbyB4PXgteSBmb3IgYmlnSW50cyB4IGFuZCB5LlxuLy94IG11c3QgYmUgbGFyZ2UgZW5vdWdoIHRvIGhvbGQgdGhlIGFuc3dlci5cbi8vbmVnYXRpdmUgYW5zd2VycyB3aWxsIGJlIDJzIGNvbXBsZW1lbnRcbmZ1bmN0aW9uIHN1Yl8oeCx5KSB7XG4gIHZhciBpLGMsayxraztcbiAgaz14Lmxlbmd0aDx5Lmxlbmd0aCA/IHgubGVuZ3RoIDogeS5sZW5ndGg7XG4gIGZvciAoYz0wLGk9MDtpPGs7aSsrKSB7XG4gICAgYys9eFtpXS15W2ldO1xuICAgIHhbaV09YyAmIG1hc2s7XG4gICAgYz4+PWJwZTtcbiAgfVxuICBmb3IgKGk9aztjICYmIGk8eC5sZW5ndGg7aSsrKSB7XG4gICAgYys9eFtpXTtcbiAgICB4W2ldPWMgJiBtYXNrO1xuICAgIGM+Pj1icGU7XG4gIH1cbn1cblxuLy9kbyB4PXgreSBmb3IgYmlnSW50cyB4IGFuZCB5LlxuLy94IG11c3QgYmUgbGFyZ2UgZW5vdWdoIHRvIGhvbGQgdGhlIGFuc3dlci5cbmZ1bmN0aW9uIGFkZF8oeCx5KSB7XG4gIHZhciBpLGMsayxraztcbiAgaz14Lmxlbmd0aDx5Lmxlbmd0aCA/IHgubGVuZ3RoIDogeS5sZW5ndGg7XG4gIGZvciAoYz0wLGk9MDtpPGs7aSsrKSB7XG4gICAgYys9eFtpXSt5W2ldO1xuICAgIHhbaV09YyAmIG1hc2s7XG4gICAgYz4+PWJwZTtcbiAgfVxuICBmb3IgKGk9aztjICYmIGk8eC5sZW5ndGg7aSsrKSB7XG4gICAgYys9eFtpXTtcbiAgICB4W2ldPWMgJiBtYXNrO1xuICAgIGM+Pj1icGU7XG4gIH1cbn1cblxuLy9kbyB4PXgqeSBmb3IgYmlnSW50cyB4IGFuZCB5LiAgVGhpcyBpcyBmYXN0ZXIgd2hlbiB5PHguXG5mdW5jdGlvbiBtdWx0Xyh4LHkpIHtcbiAgdmFyIGk7XG4gIGlmIChzcy5sZW5ndGghPTIqeC5sZW5ndGgpXG4gICAgc3M9bmV3IEFycmF5KDIqeC5sZW5ndGgpO1xuICBjb3B5SW50XyhzcywwKTtcbiAgZm9yIChpPTA7aTx5Lmxlbmd0aDtpKyspXG4gICAgaWYgKHlbaV0pXG4gICAgICBsaW5Db21iU2hpZnRfKHNzLHgseVtpXSxpKTsgICAvL3NzPTEqc3MreVtpXSooeDw8KGkqYnBlKSlcbiAgY29weV8oeCxzcyk7XG59XG5cbi8vZG8geD14IG1vZCBuIGZvciBiaWdJbnRzIHggYW5kIG4uXG5mdW5jdGlvbiBtb2RfKHgsbikge1xuICBpZiAoczQubGVuZ3RoIT14Lmxlbmd0aClcbiAgICBzND1kdXAoeCk7XG4gIGVsc2VcbiAgICBjb3B5XyhzNCx4KTtcbiAgaWYgKHM1Lmxlbmd0aCE9eC5sZW5ndGgpXG4gICAgczU9ZHVwKHgpO1xuICBkaXZpZGVfKHM0LG4sczUseCk7ICAvL3ggPSByZW1haW5kZXIgb2YgczQgLyBuXG59XG5cbi8vZG8geD14KnkgbW9kIG4gZm9yIGJpZ0ludHMgeCx5LG4uXG4vL2ZvciBncmVhdGVyIHNwZWVkLCBsZXQgeTx4LlxuZnVuY3Rpb24gbXVsdE1vZF8oeCx5LG4pIHtcbiAgdmFyIGk7XG4gIGlmIChzMC5sZW5ndGghPTIqeC5sZW5ndGgpXG4gICAgczA9bmV3IEFycmF5KDIqeC5sZW5ndGgpO1xuICBjb3B5SW50XyhzMCwwKTtcbiAgZm9yIChpPTA7aTx5Lmxlbmd0aDtpKyspXG4gICAgaWYgKHlbaV0pXG4gICAgICBsaW5Db21iU2hpZnRfKHMwLHgseVtpXSxpKTsgICAvL3MwPTEqczAreVtpXSooeDw8KGkqYnBlKSlcbiAgbW9kXyhzMCxuKTtcbiAgY29weV8oeCxzMCk7XG59XG5cbi8vZG8geD14KnggbW9kIG4gZm9yIGJpZ0ludHMgeCxuLlxuZnVuY3Rpb24gc3F1YXJlTW9kXyh4LG4pIHtcbiAgdmFyIGksaixkLGMsa3gsa24saztcbiAgZm9yIChreD14Lmxlbmd0aDsga3g+MCAmJiAheFtreC0xXTsga3gtLSk7ICAvL2lnbm9yZSBsZWFkaW5nIHplcm9zIGluIHhcbiAgaz1reD5uLmxlbmd0aCA/IDIqa3ggOiAyKm4ubGVuZ3RoOyAvL2s9IyBlbGVtZW50cyBpbiB0aGUgcHJvZHVjdCwgd2hpY2ggaXMgdHdpY2UgdGhlIGVsZW1lbnRzIGluIHRoZSBsYXJnZXIgb2YgeCBhbmQgblxuICBpZiAoczAubGVuZ3RoIT1rKVxuICAgIHMwPW5ldyBBcnJheShrKTtcbiAgY29weUludF8oczAsMCk7XG4gIGZvciAoaT0wO2k8a3g7aSsrKSB7XG4gICAgYz1zMFsyKmldK3hbaV0qeFtpXTtcbiAgICBzMFsyKmldPWMgJiBtYXNrO1xuICAgIGM+Pj1icGU7XG4gICAgZm9yIChqPWkrMTtqPGt4O2orKykge1xuICAgICAgYz1zMFtpK2pdKzIqeFtpXSp4W2pdK2M7XG4gICAgICBzMFtpK2pdPShjICYgbWFzayk7XG4gICAgICBjPj49YnBlO1xuICAgIH1cbiAgICBzMFtpK2t4XT1jO1xuICB9XG4gIG1vZF8oczAsbik7XG4gIGNvcHlfKHgsczApO1xufVxuXG4vL3JldHVybiB4IHdpdGggZXhhY3RseSBrIGxlYWRpbmcgemVybyBlbGVtZW50c1xuZnVuY3Rpb24gdHJpbSh4LGspIHtcbiAgdmFyIGkseTtcbiAgZm9yIChpPXgubGVuZ3RoOyBpPjAgJiYgIXhbaS0xXTsgaS0tKTtcbiAgeT1uZXcgQXJyYXkoaStrKTtcbiAgY29weV8oeSx4KTtcbiAgcmV0dXJuIHk7XG59XG5cbi8vZG8geD14Kip5IG1vZCBuLCB3aGVyZSB4LHksbiBhcmUgYmlnSW50cyBhbmQgKiogaXMgZXhwb25lbnRpYXRpb24uICAwKiowPTEuXG4vL3RoaXMgaXMgZmFzdGVyIHdoZW4gbiBpcyBvZGQuICB4IHVzdWFsbHkgbmVlZHMgdG8gaGF2ZSBhcyBtYW55IGVsZW1lbnRzIGFzIG4uXG5mdW5jdGlvbiBwb3dNb2RfKHgseSxuKSB7XG4gIHZhciBrMSxrMixrbixucDtcbiAgaWYoczcubGVuZ3RoIT1uLmxlbmd0aClcbiAgICBzNz1kdXAobik7XG5cbiAgLy9mb3IgZXZlbiBtb2R1bHVzLCB1c2UgYSBzaW1wbGUgc3F1YXJlLWFuZC1tdWx0aXBseSBhbGdvcml0aG0sXG4gIC8vcmF0aGVyIHRoYW4gdXNpbmcgdGhlIG1vcmUgY29tcGxleCBNb250Z29tZXJ5IGFsZ29yaXRobS5cbiAgaWYgKChuWzBdJjEpPT0wKSB7XG4gICAgY29weV8oczcseCk7XG4gICAgY29weUludF8oeCwxKTtcbiAgICB3aGlsZSghZXF1YWxzSW50KHksMCkpIHtcbiAgICAgIGlmICh5WzBdJjEpXG4gICAgICAgIG11bHRNb2RfKHgsczcsbik7XG4gICAgICBkaXZJbnRfKHksMik7XG4gICAgICBzcXVhcmVNb2RfKHM3LG4pO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cblxuICAvL2NhbGN1bGF0ZSBucCBmcm9tIG4gZm9yIHRoZSBNb250Z29tZXJ5IG11bHRpcGxpY2F0aW9uc1xuICBjb3B5SW50XyhzNywwKTtcbiAgZm9yIChrbj1uLmxlbmd0aDtrbj4wICYmICFuW2tuLTFdO2tuLS0pO1xuICBucD1yYWRpeC1pbnZlcnNlTW9kSW50KG1vZEludChuLHJhZGl4KSxyYWRpeCk7XG4gIHM3W2tuXT0xO1xuICBtdWx0TW9kXyh4ICxzNyxuKTsgICAvLyB4ID0geCAqIDIqKihrbipicCkgbW9kIG5cblxuICBpZiAoczMubGVuZ3RoIT14Lmxlbmd0aClcbiAgICBzMz1kdXAoeCk7XG4gIGVsc2VcbiAgICBjb3B5XyhzMyx4KTtcblxuICBmb3IgKGsxPXkubGVuZ3RoLTE7azE+MCAmICF5W2sxXTsgazEtLSk7ICAvL2sxPWZpcnN0IG5vbnplcm8gZWxlbWVudCBvZiB5XG4gIGlmICh5W2sxXT09MCkgeyAgLy9hbnl0aGluZyB0byB0aGUgMHRoIHBvd2VyIGlzIDFcbiAgICBjb3B5SW50Xyh4LDEpO1xuICAgIHJldHVybjtcbiAgfVxuICBmb3IgKGsyPTE8PChicGUtMSk7azIgJiYgISh5W2sxXSAmIGsyKTsgazI+Pj0xKTsgIC8vazI9cG9zaXRpb24gb2YgZmlyc3QgMSBiaXQgaW4geVtrMV1cbiAgZm9yICg7Oykge1xuICAgIGlmICghKGsyPj49MSkpIHsgIC8vbG9vayBhdCBuZXh0IGJpdCBvZiB5XG4gICAgICBrMS0tO1xuICAgICAgaWYgKGsxPDApIHtcbiAgICAgICAgbW9udF8oeCxvbmUsbixucCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGsyPTE8PChicGUtMSk7XG4gICAgfVxuICAgIG1vbnRfKHgseCxuLG5wKTtcblxuICAgIGlmIChrMiAmIHlbazFdKSAvL2lmIG5leHQgYml0IGlzIGEgMVxuICAgICAgbW9udF8oeCxzMyxuLG5wKTtcbiAgfVxufVxuXG5cbi8vZG8geD14KnkqUmkgbW9kIG4gZm9yIGJpZ0ludHMgeCx5LG4sXG4vLyAgd2hlcmUgUmkgPSAyKiooLWtuKmJwZSkgbW9kIG4sIGFuZCBrbiBpcyB0aGVcbi8vICBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhlIG4gYXJyYXksIG5vdFxuLy8gIGNvdW50aW5nIGxlYWRpbmcgemVyb3MuXG4vL3ggYXJyYXkgbXVzdCBoYXZlIGF0IGxlYXN0IGFzIG1hbnkgZWxlbW50cyBhcyB0aGUgbiBhcnJheVxuLy9JdCdzIE9LIGlmIHggYW5kIHkgYXJlIHRoZSBzYW1lIHZhcmlhYmxlLlxuLy9tdXN0IGhhdmU6XG4vLyAgeCx5IDwgblxuLy8gIG4gaXMgb2RkXG4vLyAgbnAgPSAtKG5eKC0xKSkgbW9kIHJhZGl4XG5mdW5jdGlvbiBtb250Xyh4LHksbixucCkge1xuICB2YXIgaSxqLGMsdWksdCxrcztcbiAgdmFyIGtuPW4ubGVuZ3RoO1xuICB2YXIga3k9eS5sZW5ndGg7XG5cbiAgaWYgKHNhLmxlbmd0aCE9a24pXG4gICAgc2E9bmV3IEFycmF5KGtuKTtcblxuICBjb3B5SW50XyhzYSwwKTtcblxuICBmb3IgKDtrbj4wICYmIG5ba24tMV09PTA7a24tLSk7IC8vaWdub3JlIGxlYWRpbmcgemVyb3Mgb2YgblxuICBmb3IgKDtreT4wICYmIHlba3ktMV09PTA7a3ktLSk7IC8vaWdub3JlIGxlYWRpbmcgemVyb3Mgb2YgeVxuICBrcz1zYS5sZW5ndGgtMTsgLy9zYSB3aWxsIG5ldmVyIGhhdmUgbW9yZSB0aGFuIHRoaXMgbWFueSBub256ZXJvIGVsZW1lbnRzLlxuXG4gIC8vdGhlIGZvbGxvd2luZyBsb29wIGNvbnN1bWVzIDk1JSBvZiB0aGUgcnVudGltZSBmb3IgcmFuZFRydWVQcmltZV8oKSBhbmQgcG93TW9kXygpIGZvciBsYXJnZSBudW1iZXJzXG4gIGZvciAoaT0wOyBpPGtuOyBpKyspIHtcbiAgICB0PXNhWzBdK3hbaV0qeVswXTtcbiAgICB1aT0oKHQgJiBtYXNrKSAqIG5wKSAmIG1hc2s7ICAvL3RoZSBpbm5lciBcIiYgbWFza1wiIHdhcyBuZWVkZWQgb24gU2FmYXJpIChidXQgbm90IE1TSUUpIGF0IG9uZSB0aW1lXG4gICAgYz0odCt1aSpuWzBdKSA+PiBicGU7XG4gICAgdD14W2ldO1xuXG4gICAgLy9kbyBzYT0oc2EreFtpXSp5K3VpKm4pL2IgICB3aGVyZSBiPTIqKmJwZS4gIExvb3AgaXMgdW5yb2xsZWQgNS1mb2xkIGZvciBzcGVlZFxuICAgIGo9MTtcbiAgICBmb3IgKDtqPGt5LTQ7KSB7IGMrPXNhW2pdK3VpKm5bal0rdCp5W2pdOyAgIHNhW2otMV09YyAmIG1hc2s7ICAgYz4+PWJwZTsgICBqKys7XG4gICAgICAgICAgICAgICAgICAgICBjKz1zYVtqXSt1aSpuW2pdK3QqeVtqXTsgICBzYVtqLTFdPWMgJiBtYXNrOyAgIGM+Pj1icGU7ICAgaisrO1xuICAgICAgICAgICAgICAgICAgICAgYys9c2Fbal0rdWkqbltqXSt0Knlbal07ICAgc2Fbai0xXT1jICYgbWFzazsgICBjPj49YnBlOyAgIGorKztcbiAgICAgICAgICAgICAgICAgICAgIGMrPXNhW2pdK3VpKm5bal0rdCp5W2pdOyAgIHNhW2otMV09YyAmIG1hc2s7ICAgYz4+PWJwZTsgICBqKys7XG4gICAgICAgICAgICAgICAgICAgICBjKz1zYVtqXSt1aSpuW2pdK3QqeVtqXTsgICBzYVtqLTFdPWMgJiBtYXNrOyAgIGM+Pj1icGU7ICAgaisrOyB9XG4gICAgZm9yICg7ajxreTspICAgeyBjKz1zYVtqXSt1aSpuW2pdK3QqeVtqXTsgICBzYVtqLTFdPWMgJiBtYXNrOyAgIGM+Pj1icGU7ICAgaisrOyB9XG4gICAgZm9yICg7ajxrbi00OykgeyBjKz1zYVtqXSt1aSpuW2pdOyAgICAgICAgICBzYVtqLTFdPWMgJiBtYXNrOyAgIGM+Pj1icGU7ICAgaisrO1xuICAgICAgICAgICAgICAgICAgICAgYys9c2Fbal0rdWkqbltqXTsgICAgICAgICAgc2Fbai0xXT1jICYgbWFzazsgICBjPj49YnBlOyAgIGorKztcbiAgICAgICAgICAgICAgICAgICAgIGMrPXNhW2pdK3VpKm5bal07ICAgICAgICAgIHNhW2otMV09YyAmIG1hc2s7ICAgYz4+PWJwZTsgICBqKys7XG4gICAgICAgICAgICAgICAgICAgICBjKz1zYVtqXSt1aSpuW2pdOyAgICAgICAgICBzYVtqLTFdPWMgJiBtYXNrOyAgIGM+Pj1icGU7ICAgaisrO1xuICAgICAgICAgICAgICAgICAgICAgYys9c2Fbal0rdWkqbltqXTsgICAgICAgICAgc2Fbai0xXT1jICYgbWFzazsgICBjPj49YnBlOyAgIGorKzsgfVxuICAgIGZvciAoO2o8a247KSAgIHsgYys9c2Fbal0rdWkqbltqXTsgICAgICAgICAgc2Fbai0xXT1jICYgbWFzazsgICBjPj49YnBlOyAgIGorKzsgfVxuICAgIGZvciAoO2o8a3M7KSAgIHsgYys9c2Fbal07ICAgICAgICAgICAgICAgICAgc2Fbai0xXT1jICYgbWFzazsgICBjPj49YnBlOyAgIGorKzsgfVxuICAgIHNhW2otMV09YyAmIG1hc2s7XG4gIH1cblxuICBpZiAoIWdyZWF0ZXIobixzYSkpXG4gICAgc3ViXyhzYSxuKTtcbiAgY29weV8oeCxzYSk7XG59XG5cbmlmICh0eXBlb2YgbW9kdWxlID09PSAndW5kZWZpbmVkJykge1xuXHRtb2R1bGUgPSB7fTtcbn1cbkJpZ0ludCA9IG1vZHVsZS5leHBvcnRzID0ge1xuXHQnYWRkJzogYWRkLCAnYWRkSW50JzogYWRkSW50LCAnYmlnSW50MnN0cic6IGJpZ0ludDJzdHIsICdiaXRTaXplJzogYml0U2l6ZSxcblx0J2R1cCc6IGR1cCwgJ2VxdWFscyc6IGVxdWFscywgJ2VxdWFsc0ludCc6IGVxdWFsc0ludCwgJ2V4cGFuZCc6IGV4cGFuZCxcblx0J2ZpbmRQcmltZXMnOiBmaW5kUHJpbWVzLCAnR0NEJzogR0NELCAnZ3JlYXRlcic6IGdyZWF0ZXIsXG5cdCdncmVhdGVyU2hpZnQnOiBncmVhdGVyU2hpZnQsICdpbnQyYmlnSW50JzogaW50MmJpZ0ludCxcblx0J2ludmVyc2VNb2QnOiBpbnZlcnNlTW9kLCAnaW52ZXJzZU1vZEludCc6IGludmVyc2VNb2RJbnQsICdpc1plcm8nOiBpc1plcm8sXG5cdCdtaWxsZXJSYWJpbic6IG1pbGxlclJhYmluLCAnbWlsbGVyUmFiaW5JbnQnOiBtaWxsZXJSYWJpbkludCwgJ21vZCc6IG1vZCxcblx0J21vZEludCc6IG1vZEludCwgJ211bHQnOiBtdWx0LCAnbXVsdE1vZCc6IG11bHRNb2QsICduZWdhdGl2ZSc6IG5lZ2F0aXZlLFxuXHQncG93TW9kJzogcG93TW9kLCAncmFuZEJpZ0ludCc6IHJhbmRCaWdJbnQsICdyYW5kVHJ1ZVByaW1lJzogcmFuZFRydWVQcmltZSxcblx0J3JhbmRQcm9iUHJpbWUnOiByYW5kUHJvYlByaW1lLCAnc3RyMmJpZ0ludCc6IHN0cjJiaWdJbnQsICdzdWInOiBzdWIsXG5cdCd0cmltJzogdHJpbSwgJ2FkZEludF8nOiBhZGRJbnRfLCAnYWRkXyc6IGFkZF8sICdjb3B5Xyc6IGNvcHlfLFxuXHQnY29weUludF8nOiBjb3B5SW50XywgJ0dDRF8nOiBHQ0RfLCAnaW52ZXJzZU1vZF8nOiBpbnZlcnNlTW9kXywgJ21vZF8nOiBtb2RfLFxuXHQnbXVsdF8nOiBtdWx0XywgJ211bHRNb2RfJzogbXVsdE1vZF8sICdwb3dNb2RfJzogcG93TW9kXyxcblx0J3JhbmRCaWdJbnRfJzogcmFuZEJpZ0ludF8sICdyYW5kVHJ1ZVByaW1lXyc6IHJhbmRUcnVlUHJpbWVfLCAnc3ViXyc6IHN1Yl8sXG5cdCdhZGRTaGlmdF8nOiBhZGRTaGlmdF8sICdjYXJyeV8nOiBjYXJyeV8sICdkaXZpZGVfJzogZGl2aWRlXyxcblx0J2RpdkludF8nOiBkaXZJbnRfLCAnZUdDRF8nOiBlR0NEXywgJ2hhbHZlXyc6IGhhbHZlXywgJ2xlZnRTaGlmdF8nOiBsZWZ0U2hpZnRfLFxuXHQnbGluQ29tYl8nOiBsaW5Db21iXywgJ2xpbkNvbWJTaGlmdF8nOiBsaW5Db21iU2hpZnRfLCAnbW9udF8nOiBtb250Xyxcblx0J211bHRJbnRfJzogbXVsdEludF8sICdyaWdodFNoaWZ0Xyc6IHJpZ2h0U2hpZnRfLCAnc3F1YXJlTW9kXyc6IHNxdWFyZU1vZF8sXG5cdCdzdWJTaGlmdF8nOiBzdWJTaGlmdF8sICdwb3dNb2RfJzogcG93TW9kXywgJ2VHQ0RfJzogZUdDRF8sXG5cdCdpbnZlcnNlTW9kXyc6IGludmVyc2VNb2RfLCAnR0NEXyc6IEdDRF8sICdtb250Xyc6IG1vbnRfLCAnZGl2aWRlXyc6IGRpdmlkZV8sXG5cdCdzcXVhcmVNb2RfJzogc3F1YXJlTW9kXywgJ3JhbmRUcnVlUHJpbWVfJzogcmFuZFRydWVQcmltZV8sXG5cdCdtaWxsZXJSYWJpbic6IG1pbGxlclJhYmluXG59O1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uIChnbG9iYWwpe1xuLyoqXG4gKiBsb2Rhc2ggKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzIDxodHRwczovL2pxdWVyeS5vcmcvPlxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICovXG5cbi8qKiBVc2VkIGFzIHRoZSBzaXplIHRvIGVuYWJsZSBsYXJnZSBhcnJheSBvcHRpbWl6YXRpb25zLiAqL1xudmFyIExBUkdFX0FSUkFZX1NJWkUgPSAyMDA7XG5cbi8qKiBVc2VkIHRvIHN0YW5kLWluIGZvciBgdW5kZWZpbmVkYCBoYXNoIHZhbHVlcy4gKi9cbnZhciBIQVNIX1VOREVGSU5FRCA9ICdfX2xvZGFzaF9oYXNoX3VuZGVmaW5lZF9fJztcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgIGJvb2xUYWcgPSAnW29iamVjdCBCb29sZWFuXScsXG4gICAgZGF0ZVRhZyA9ICdbb2JqZWN0IERhdGVdJyxcbiAgICBlcnJvclRhZyA9ICdbb2JqZWN0IEVycm9yXScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgZ2VuVGFnID0gJ1tvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dJyxcbiAgICBtYXBUYWcgPSAnW29iamVjdCBNYXBdJyxcbiAgICBudW1iZXJUYWcgPSAnW29iamVjdCBOdW1iZXJdJyxcbiAgICBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJyxcbiAgICBwcm9taXNlVGFnID0gJ1tvYmplY3QgUHJvbWlzZV0nLFxuICAgIHJlZ2V4cFRhZyA9ICdbb2JqZWN0IFJlZ0V4cF0nLFxuICAgIHNldFRhZyA9ICdbb2JqZWN0IFNldF0nLFxuICAgIHN0cmluZ1RhZyA9ICdbb2JqZWN0IFN0cmluZ10nLFxuICAgIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nLFxuICAgIHdlYWtNYXBUYWcgPSAnW29iamVjdCBXZWFrTWFwXSc7XG5cbnZhciBhcnJheUJ1ZmZlclRhZyA9ICdbb2JqZWN0IEFycmF5QnVmZmVyXScsXG4gICAgZGF0YVZpZXdUYWcgPSAnW29iamVjdCBEYXRhVmlld10nLFxuICAgIGZsb2F0MzJUYWcgPSAnW29iamVjdCBGbG9hdDMyQXJyYXldJyxcbiAgICBmbG9hdDY0VGFnID0gJ1tvYmplY3QgRmxvYXQ2NEFycmF5XScsXG4gICAgaW50OFRhZyA9ICdbb2JqZWN0IEludDhBcnJheV0nLFxuICAgIGludDE2VGFnID0gJ1tvYmplY3QgSW50MTZBcnJheV0nLFxuICAgIGludDMyVGFnID0gJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgIHVpbnQ4VGFnID0gJ1tvYmplY3QgVWludDhBcnJheV0nLFxuICAgIHVpbnQ4Q2xhbXBlZFRhZyA9ICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgdWludDE2VGFnID0gJ1tvYmplY3QgVWludDE2QXJyYXldJyxcbiAgICB1aW50MzJUYWcgPSAnW29iamVjdCBVaW50MzJBcnJheV0nO1xuXG4vKipcbiAqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGBcbiAqIFtzeW50YXggY2hhcmFjdGVyc10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtcGF0dGVybnMpLlxuICovXG52YXIgcmVSZWdFeHBDaGFyID0gL1tcXFxcXiQuKis/KClbXFxde318XS9nO1xuXG4vKiogVXNlZCB0byBtYXRjaCBgUmVnRXhwYCBmbGFncyBmcm9tIHRoZWlyIGNvZXJjZWQgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUZsYWdzID0gL1xcdyokLztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGhvc3QgY29uc3RydWN0b3JzIChTYWZhcmkpLiAqL1xudmFyIHJlSXNIb3N0Q3RvciA9IC9eXFxbb2JqZWN0IC4rP0NvbnN0cnVjdG9yXFxdJC87XG5cbi8qKiBVc2VkIHRvIGRldGVjdCB1bnNpZ25lZCBpbnRlZ2VyIHZhbHVlcy4gKi9cbnZhciByZUlzVWludCA9IC9eKD86MHxbMS05XVxcZCopJC87XG5cbi8qKiBVc2VkIHRvIGlkZW50aWZ5IGB0b1N0cmluZ1RhZ2AgdmFsdWVzIG9mIHR5cGVkIGFycmF5cy4gKi9cbnZhciB0eXBlZEFycmF5VGFncyA9IHt9O1xudHlwZWRBcnJheVRhZ3NbZmxvYXQzMlRhZ10gPSB0eXBlZEFycmF5VGFnc1tmbG9hdDY0VGFnXSA9XG50eXBlZEFycmF5VGFnc1tpbnQ4VGFnXSA9IHR5cGVkQXJyYXlUYWdzW2ludDE2VGFnXSA9XG50eXBlZEFycmF5VGFnc1tpbnQzMlRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50OFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbdWludDhDbGFtcGVkVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbdWludDMyVGFnXSA9IHRydWU7XG50eXBlZEFycmF5VGFnc1thcmdzVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2FycmF5VGFnXSA9XG50eXBlZEFycmF5VGFnc1thcnJheUJ1ZmZlclRhZ10gPSB0eXBlZEFycmF5VGFnc1tib29sVGFnXSA9XG50eXBlZEFycmF5VGFnc1tkYXRhVmlld1RhZ10gPSB0eXBlZEFycmF5VGFnc1tkYXRlVGFnXSA9XG50eXBlZEFycmF5VGFnc1tlcnJvclRhZ10gPSB0eXBlZEFycmF5VGFnc1tmdW5jVGFnXSA9XG50eXBlZEFycmF5VGFnc1ttYXBUYWddID0gdHlwZWRBcnJheVRhZ3NbbnVtYmVyVGFnXSA9XG50eXBlZEFycmF5VGFnc1tvYmplY3RUYWddID0gdHlwZWRBcnJheVRhZ3NbcmVnZXhwVGFnXSA9XG50eXBlZEFycmF5VGFnc1tzZXRUYWddID0gdHlwZWRBcnJheVRhZ3Nbc3RyaW5nVGFnXSA9XG50eXBlZEFycmF5VGFnc1t3ZWFrTWFwVGFnXSA9IGZhbHNlO1xuXG4vKiogVXNlZCB0byBpZGVudGlmeSBgdG9TdHJpbmdUYWdgIHZhbHVlcyBzdXBwb3J0ZWQgYnkgYF8uY2xvbmVgLiAqL1xudmFyIGNsb25lYWJsZVRhZ3MgPSB7fTtcbmNsb25lYWJsZVRhZ3NbYXJnc1RhZ10gPSBjbG9uZWFibGVUYWdzW2FycmF5VGFnXSA9XG5jbG9uZWFibGVUYWdzW2FycmF5QnVmZmVyVGFnXSA9IGNsb25lYWJsZVRhZ3NbZGF0YVZpZXdUYWddID1cbmNsb25lYWJsZVRhZ3NbYm9vbFRhZ10gPSBjbG9uZWFibGVUYWdzW2RhdGVUYWddID1cbmNsb25lYWJsZVRhZ3NbZmxvYXQzMlRhZ10gPSBjbG9uZWFibGVUYWdzW2Zsb2F0NjRUYWddID1cbmNsb25lYWJsZVRhZ3NbaW50OFRhZ10gPSBjbG9uZWFibGVUYWdzW2ludDE2VGFnXSA9XG5jbG9uZWFibGVUYWdzW2ludDMyVGFnXSA9IGNsb25lYWJsZVRhZ3NbbWFwVGFnXSA9XG5jbG9uZWFibGVUYWdzW251bWJlclRhZ10gPSBjbG9uZWFibGVUYWdzW29iamVjdFRhZ10gPVxuY2xvbmVhYmxlVGFnc1tyZWdleHBUYWddID0gY2xvbmVhYmxlVGFnc1tzZXRUYWddID1cbmNsb25lYWJsZVRhZ3Nbc3RyaW5nVGFnXSA9IGNsb25lYWJsZVRhZ3Nbc3ltYm9sVGFnXSA9XG5jbG9uZWFibGVUYWdzW3VpbnQ4VGFnXSA9IGNsb25lYWJsZVRhZ3NbdWludDhDbGFtcGVkVGFnXSA9XG5jbG9uZWFibGVUYWdzW3VpbnQxNlRhZ10gPSBjbG9uZWFibGVUYWdzW3VpbnQzMlRhZ10gPSB0cnVlO1xuY2xvbmVhYmxlVGFnc1tlcnJvclRhZ10gPSBjbG9uZWFibGVUYWdzW2Z1bmNUYWddID1cbmNsb25lYWJsZVRhZ3Nbd2Vha01hcFRhZ10gPSBmYWxzZTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGV4cG9ydHNgLiAqL1xudmFyIGZyZWVFeHBvcnRzID0gdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0cyAmJiAhZXhwb3J0cy5ub2RlVHlwZSAmJiBleHBvcnRzO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWAuICovXG52YXIgZnJlZU1vZHVsZSA9IGZyZWVFeHBvcnRzICYmIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlICYmICFtb2R1bGUubm9kZVR5cGUgJiYgbW9kdWxlO1xuXG4vKiogRGV0ZWN0IHRoZSBwb3B1bGFyIENvbW1vbkpTIGV4dGVuc2lvbiBgbW9kdWxlLmV4cG9ydHNgLiAqL1xudmFyIG1vZHVsZUV4cG9ydHMgPSBmcmVlTW9kdWxlICYmIGZyZWVNb2R1bGUuZXhwb3J0cyA9PT0gZnJlZUV4cG9ydHM7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgcHJvY2Vzc2AgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVQcm9jZXNzID0gbW9kdWxlRXhwb3J0cyAmJiBmcmVlR2xvYmFsLnByb2Nlc3M7XG5cbi8qKiBVc2VkIHRvIGFjY2VzcyBmYXN0ZXIgTm9kZS5qcyBoZWxwZXJzLiAqL1xudmFyIG5vZGVVdGlsID0gKGZ1bmN0aW9uKCkge1xuICB0cnkge1xuICAgIHJldHVybiBmcmVlUHJvY2VzcyAmJiBmcmVlUHJvY2Vzcy5iaW5kaW5nKCd1dGlsJyk7XG4gIH0gY2F0Y2ggKGUpIHt9XG59KCkpO1xuXG4vKiBOb2RlLmpzIGhlbHBlciByZWZlcmVuY2VzLiAqL1xudmFyIG5vZGVJc1R5cGVkQXJyYXkgPSBub2RlVXRpbCAmJiBub2RlVXRpbC5pc1R5cGVkQXJyYXk7XG5cbi8qKlxuICogQWRkcyB0aGUga2V5LXZhbHVlIGBwYWlyYCB0byBgbWFwYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG1hcCBUaGUgbWFwIHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7QXJyYXl9IHBhaXIgVGhlIGtleS12YWx1ZSBwYWlyIHRvIGFkZC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG1hcGAuXG4gKi9cbmZ1bmN0aW9uIGFkZE1hcEVudHJ5KG1hcCwgcGFpcikge1xuICAvLyBEb24ndCByZXR1cm4gYG1hcC5zZXRgIGJlY2F1c2UgaXQncyBub3QgY2hhaW5hYmxlIGluIElFIDExLlxuICBtYXAuc2V0KHBhaXJbMF0sIHBhaXJbMV0pO1xuICByZXR1cm4gbWFwO1xufVxuXG4vKipcbiAqIEFkZHMgYHZhbHVlYCB0byBgc2V0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNldCBUaGUgc2V0IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGFkZC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYHNldGAuXG4gKi9cbmZ1bmN0aW9uIGFkZFNldEVudHJ5KHNldCwgdmFsdWUpIHtcbiAgLy8gRG9uJ3QgcmV0dXJuIGBzZXQuYWRkYCBiZWNhdXNlIGl0J3Mgbm90IGNoYWluYWJsZSBpbiBJRSAxMS5cbiAgc2V0LmFkZCh2YWx1ZSk7XG4gIHJldHVybiBzZXQ7XG59XG5cbi8qKlxuICogQSBmYXN0ZXIgYWx0ZXJuYXRpdmUgdG8gYEZ1bmN0aW9uI2FwcGx5YCwgdGhpcyBmdW5jdGlvbiBpbnZva2VzIGBmdW5jYFxuICogd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgb2YgYHRoaXNBcmdgIGFuZCB0aGUgYXJndW1lbnRzIG9mIGBhcmdzYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gaW52b2tlLlxuICogQHBhcmFtIHsqfSB0aGlzQXJnIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgZnVuY2AuXG4gKiBAcGFyYW0ge0FycmF5fSBhcmdzIFRoZSBhcmd1bWVudHMgdG8gaW52b2tlIGBmdW5jYCB3aXRoLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHJlc3VsdCBvZiBgZnVuY2AuXG4gKi9cbmZ1bmN0aW9uIGFwcGx5KGZ1bmMsIHRoaXNBcmcsIGFyZ3MpIHtcbiAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgIGNhc2UgMDogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnKTtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYXJnc1swXSk7XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgfVxuICByZXR1cm4gZnVuYy5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uZm9yRWFjaGAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yXG4gKiBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5RWFjaChhcnJheSwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDA7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBpZiAoaXRlcmF0ZWUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpID09PSBmYWxzZSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxuLyoqXG4gKiBBcHBlbmRzIHRoZSBlbGVtZW50cyBvZiBgdmFsdWVzYCB0byBgYXJyYXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtBcnJheX0gdmFsdWVzIFRoZSB2YWx1ZXMgdG8gYXBwZW5kLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5UHVzaChhcnJheSwgdmFsdWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gdmFsdWVzLmxlbmd0aCxcbiAgICAgIG9mZnNldCA9IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGFycmF5W29mZnNldCArIGluZGV4XSA9IHZhbHVlc1tpbmRleF07XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5yZWR1Y2VgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvclxuICogaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7Kn0gW2FjY3VtdWxhdG9yXSBUaGUgaW5pdGlhbCB2YWx1ZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2luaXRBY2N1bV0gU3BlY2lmeSB1c2luZyB0aGUgZmlyc3QgZWxlbWVudCBvZiBgYXJyYXlgIGFzXG4gKiAgdGhlIGluaXRpYWwgdmFsdWUuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgYWNjdW11bGF0ZWQgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGFycmF5UmVkdWNlKGFycmF5LCBpdGVyYXRlZSwgYWNjdW11bGF0b3IsIGluaXRBY2N1bSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMDtcblxuICBpZiAoaW5pdEFjY3VtICYmIGxlbmd0aCkge1xuICAgIGFjY3VtdWxhdG9yID0gYXJyYXlbKytpbmRleF07XG4gIH1cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBhY2N1bXVsYXRvciA9IGl0ZXJhdGVlKGFjY3VtdWxhdG9yLCBhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSk7XG4gIH1cbiAgcmV0dXJuIGFjY3VtdWxhdG9yO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnRpbWVzYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHNcbiAqIG9yIG1heCBhcnJheSBsZW5ndGggY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgbnVtYmVyIG9mIHRpbWVzIHRvIGludm9rZSBgaXRlcmF0ZWVgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcmVzdWx0cy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRpbWVzKG4sIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobik7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBuKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IGl0ZXJhdGVlKGluZGV4KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnVuYXJ5YCB3aXRob3V0IHN1cHBvcnQgZm9yIHN0b3JpbmcgbWV0YWRhdGEuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNhcCBhcmd1bWVudHMgZm9yLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgY2FwcGVkIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlVW5hcnkoZnVuYykge1xuICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gZnVuYyh2YWx1ZSk7XG4gIH07XG59XG5cbi8qKlxuICogR2V0cyB0aGUgdmFsdWUgYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0XSBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcHJvcGVydHkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGdldFZhbHVlKG9iamVjdCwga2V5KSB7XG4gIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgaG9zdCBvYmplY3QgaW4gSUUgPCA5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgaG9zdCBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNIb3N0T2JqZWN0KHZhbHVlKSB7XG4gIC8vIE1hbnkgaG9zdCBvYmplY3RzIGFyZSBgT2JqZWN0YCBvYmplY3RzIHRoYXQgY2FuIGNvZXJjZSB0byBzdHJpbmdzXG4gIC8vIGRlc3BpdGUgaGF2aW5nIGltcHJvcGVybHkgZGVmaW5lZCBgdG9TdHJpbmdgIG1ldGhvZHMuXG4gIHZhciByZXN1bHQgPSBmYWxzZTtcbiAgaWYgKHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlLnRvU3RyaW5nICE9ICdmdW5jdGlvbicpIHtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gISEodmFsdWUgKyAnJyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGBtYXBgIHRvIGl0cyBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBrZXktdmFsdWUgcGFpcnMuXG4gKi9cbmZ1bmN0aW9uIG1hcFRvQXJyYXkobWFwKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobWFwLnNpemUpO1xuXG4gIG1hcC5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICByZXN1bHRbKytpbmRleF0gPSBba2V5LCB2YWx1ZV07XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSB1bmFyeSBmdW5jdGlvbiB0aGF0IGludm9rZXMgYGZ1bmNgIHdpdGggaXRzIGFyZ3VtZW50IHRyYW5zZm9ybWVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byB3cmFwLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gdHJhbnNmb3JtIFRoZSBhcmd1bWVudCB0cmFuc2Zvcm0uXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gb3ZlckFyZyhmdW5jLCB0cmFuc2Zvcm0pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGFyZykge1xuICAgIHJldHVybiBmdW5jKHRyYW5zZm9ybShhcmcpKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgc2V0YCB0byBhbiBhcnJheSBvZiBpdHMgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc2V0IFRoZSBzZXQgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgdmFsdWVzLlxuICovXG5mdW5jdGlvbiBzZXRUb0FycmF5KHNldCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KHNldC5zaXplKTtcblxuICBzZXQuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJlc3VsdFsrK2luZGV4XSA9IHZhbHVlO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGUsXG4gICAgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlLFxuICAgIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG92ZXJyZWFjaGluZyBjb3JlLWpzIHNoaW1zLiAqL1xudmFyIGNvcmVKc0RhdGEgPSByb290WydfX2NvcmUtanNfc2hhcmVkX18nXTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG1ldGhvZHMgbWFzcXVlcmFkaW5nIGFzIG5hdGl2ZS4gKi9cbnZhciBtYXNrU3JjS2V5ID0gKGZ1bmN0aW9uKCkge1xuICB2YXIgdWlkID0gL1teLl0rJC8uZXhlYyhjb3JlSnNEYXRhICYmIGNvcmVKc0RhdGEua2V5cyAmJiBjb3JlSnNEYXRhLmtleXMuSUVfUFJPVE8gfHwgJycpO1xuICByZXR1cm4gdWlkID8gKCdTeW1ib2woc3JjKV8xLicgKyB1aWQpIDogJyc7XG59KCkpO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogVXNlZCB0byBpbmZlciB0aGUgYE9iamVjdGAgY29uc3RydWN0b3IuICovXG52YXIgb2JqZWN0Q3RvclN0cmluZyA9IGZ1bmNUb1N0cmluZy5jYWxsKE9iamVjdCk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlSXNOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgZnVuY1RvU3RyaW5nLmNhbGwoaGFzT3duUHJvcGVydHkpLnJlcGxhY2UocmVSZWdFeHBDaGFyLCAnXFxcXCQmJylcbiAgLnJlcGxhY2UoL2hhc093blByb3BlcnR5fChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4pO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBCdWZmZXIgPSBtb2R1bGVFeHBvcnRzID8gcm9vdC5CdWZmZXIgOiB1bmRlZmluZWQsXG4gICAgU3ltYm9sID0gcm9vdC5TeW1ib2wsXG4gICAgVWludDhBcnJheSA9IHJvb3QuVWludDhBcnJheSxcbiAgICBnZXRQcm90b3R5cGUgPSBvdmVyQXJnKE9iamVjdC5nZXRQcm90b3R5cGVPZiwgT2JqZWN0KSxcbiAgICBvYmplY3RDcmVhdGUgPSBPYmplY3QuY3JlYXRlLFxuICAgIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gb2JqZWN0UHJvdG8ucHJvcGVydHlJc0VudW1lcmFibGUsXG4gICAgc3BsaWNlID0gYXJyYXlQcm90by5zcGxpY2U7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVHZXRTeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyxcbiAgICBuYXRpdmVJc0J1ZmZlciA9IEJ1ZmZlciA/IEJ1ZmZlci5pc0J1ZmZlciA6IHVuZGVmaW5lZCxcbiAgICBuYXRpdmVLZXlzID0gb3ZlckFyZyhPYmplY3Qua2V5cywgT2JqZWN0KSxcbiAgICBuYXRpdmVNYXggPSBNYXRoLm1heDtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIERhdGFWaWV3ID0gZ2V0TmF0aXZlKHJvb3QsICdEYXRhVmlldycpLFxuICAgIE1hcCA9IGdldE5hdGl2ZShyb290LCAnTWFwJyksXG4gICAgUHJvbWlzZSA9IGdldE5hdGl2ZShyb290LCAnUHJvbWlzZScpLFxuICAgIFNldCA9IGdldE5hdGl2ZShyb290LCAnU2V0JyksXG4gICAgV2Vha01hcCA9IGdldE5hdGl2ZShyb290LCAnV2Vha01hcCcpLFxuICAgIG5hdGl2ZUNyZWF0ZSA9IGdldE5hdGl2ZShPYmplY3QsICdjcmVhdGUnKTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG1hcHMsIHNldHMsIGFuZCB3ZWFrbWFwcy4gKi9cbnZhciBkYXRhVmlld0N0b3JTdHJpbmcgPSB0b1NvdXJjZShEYXRhVmlldyksXG4gICAgbWFwQ3RvclN0cmluZyA9IHRvU291cmNlKE1hcCksXG4gICAgcHJvbWlzZUN0b3JTdHJpbmcgPSB0b1NvdXJjZShQcm9taXNlKSxcbiAgICBzZXRDdG9yU3RyaW5nID0gdG9Tb3VyY2UoU2V0KSxcbiAgICB3ZWFrTWFwQ3RvclN0cmluZyA9IHRvU291cmNlKFdlYWtNYXApO1xuXG4vKiogVXNlZCB0byBjb252ZXJ0IHN5bWJvbHMgdG8gcHJpbWl0aXZlcyBhbmQgc3RyaW5ncy4gKi9cbnZhciBzeW1ib2xQcm90byA9IFN5bWJvbCA/IFN5bWJvbC5wcm90b3R5cGUgOiB1bmRlZmluZWQsXG4gICAgc3ltYm9sVmFsdWVPZiA9IHN5bWJvbFByb3RvID8gc3ltYm9sUHJvdG8udmFsdWVPZiA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgaGFzaCBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIEhhc2goZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPyBlbnRyaWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBoYXNoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIEhhc2hcbiAqL1xuZnVuY3Rpb24gaGFzaENsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gbmF0aXZlQ3JlYXRlID8gbmF0aXZlQ3JlYXRlKG51bGwpIDoge307XG59XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIGhhc2guXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7T2JqZWN0fSBoYXNoIFRoZSBoYXNoIHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNoRGVsZXRlKGtleSkge1xuICByZXR1cm4gdGhpcy5oYXMoa2V5KSAmJiBkZWxldGUgdGhpcy5fX2RhdGFfX1trZXldO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGhhc2ggdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gaGFzaEdldChrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICBpZiAobmF0aXZlQ3JlYXRlKSB7XG4gICAgdmFyIHJlc3VsdCA9IGRhdGFba2V5XTtcbiAgICByZXR1cm4gcmVzdWx0ID09PSBIQVNIX1VOREVGSU5FRCA/IHVuZGVmaW5lZCA6IHJlc3VsdDtcbiAgfVxuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpID8gZGF0YVtrZXldIDogdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIGhhc2ggdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc2hIYXMoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXztcbiAgcmV0dXJuIG5hdGl2ZUNyZWF0ZSA/IGRhdGFba2V5XSAhPT0gdW5kZWZpbmVkIDogaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIGhhc2ggYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBoYXNoIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBoYXNoU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICBkYXRhW2tleV0gPSAobmF0aXZlQ3JlYXRlICYmIHZhbHVlID09PSB1bmRlZmluZWQpID8gSEFTSF9VTkRFRklORUQgOiB2YWx1ZTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBIYXNoYC5cbkhhc2gucHJvdG90eXBlLmNsZWFyID0gaGFzaENsZWFyO1xuSGFzaC5wcm90b3R5cGVbJ2RlbGV0ZSddID0gaGFzaERlbGV0ZTtcbkhhc2gucHJvdG90eXBlLmdldCA9IGhhc2hHZXQ7XG5IYXNoLnByb3RvdHlwZS5oYXMgPSBoYXNoSGFzO1xuSGFzaC5wcm90b3R5cGUuc2V0ID0gaGFzaFNldDtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGxpc3QgY2FjaGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBMaXN0Q2FjaGUoZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPyBlbnRyaWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBsaXN0IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IFtdO1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBsaXN0IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVEZWxldGUoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgaWYgKGluZGV4IDwgMCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgbGFzdEluZGV4ID0gZGF0YS5sZW5ndGggLSAxO1xuICBpZiAoaW5kZXggPT0gbGFzdEluZGV4KSB7XG4gICAgZGF0YS5wb3AoKTtcbiAgfSBlbHNlIHtcbiAgICBzcGxpY2UuY2FsbChkYXRhLCBpbmRleCwgMSk7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUdldChrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICByZXR1cm4gaW5kZXggPCAwID8gdW5kZWZpbmVkIDogZGF0YVtpbmRleF1bMV07XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBsaXN0Q2FjaGVIYXMoa2V5KSB7XG4gIHJldHVybiBhc3NvY0luZGV4T2YodGhpcy5fX2RhdGFfXywga2V5KSA+IC0xO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIGxpc3QgY2FjaGUgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGxpc3QgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZVNldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGluZGV4ID0gYXNzb2NJbmRleE9mKGRhdGEsIGtleSk7XG5cbiAgaWYgKGluZGV4IDwgMCkge1xuICAgIGRhdGEucHVzaChba2V5LCB2YWx1ZV0pO1xuICB9IGVsc2Uge1xuICAgIGRhdGFbaW5kZXhdWzFdID0gdmFsdWU7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBMaXN0Q2FjaGVgLlxuTGlzdENhY2hlLnByb3RvdHlwZS5jbGVhciA9IGxpc3RDYWNoZUNsZWFyO1xuTGlzdENhY2hlLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBsaXN0Q2FjaGVEZWxldGU7XG5MaXN0Q2FjaGUucHJvdG90eXBlLmdldCA9IGxpc3RDYWNoZUdldDtcbkxpc3RDYWNoZS5wcm90b3R5cGUuaGFzID0gbGlzdENhY2hlSGFzO1xuTGlzdENhY2hlLnByb3RvdHlwZS5zZXQgPSBsaXN0Q2FjaGVTZXQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG1hcCBjYWNoZSBvYmplY3QgdG8gc3RvcmUga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBNYXBDYWNoZShlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA/IGVudHJpZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIG1hcC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICovXG5mdW5jdGlvbiBtYXBDYWNoZUNsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0ge1xuICAgICdoYXNoJzogbmV3IEhhc2gsXG4gICAgJ21hcCc6IG5ldyAoTWFwIHx8IExpc3RDYWNoZSksXG4gICAgJ3N0cmluZyc6IG5ldyBIYXNoXG4gIH07XG59XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIG1hcC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZURlbGV0ZShrZXkpIHtcbiAgcmV0dXJuIGdldE1hcERhdGEodGhpcywga2V5KVsnZGVsZXRlJ10oa2V5KTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBtYXAgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlR2V0KGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLmdldChrZXkpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIG1hcCB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlSGFzKGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLmhhcyhrZXkpO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIG1hcCBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBtYXAgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlU2V0KGtleSwgdmFsdWUpIHtcbiAgZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLnNldChrZXksIHZhbHVlKTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBNYXBDYWNoZWAuXG5NYXBDYWNoZS5wcm90b3R5cGUuY2xlYXIgPSBtYXBDYWNoZUNsZWFyO1xuTWFwQ2FjaGUucHJvdG90eXBlWydkZWxldGUnXSA9IG1hcENhY2hlRGVsZXRlO1xuTWFwQ2FjaGUucHJvdG90eXBlLmdldCA9IG1hcENhY2hlR2V0O1xuTWFwQ2FjaGUucHJvdG90eXBlLmhhcyA9IG1hcENhY2hlSGFzO1xuTWFwQ2FjaGUucHJvdG90eXBlLnNldCA9IG1hcENhY2hlU2V0O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBzdGFjayBjYWNoZSBvYmplY3QgdG8gc3RvcmUga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBTdGFjayhlbnRyaWVzKSB7XG4gIHRoaXMuX19kYXRhX18gPSBuZXcgTGlzdENhY2hlKGVudHJpZXMpO1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIHN0YWNrLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIFN0YWNrXG4gKi9cbmZ1bmN0aW9uIHN0YWNrQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSBuZXcgTGlzdENhY2hlO1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBzdGFjay5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBzdGFja0RlbGV0ZShrZXkpIHtcbiAgcmV0dXJuIHRoaXMuX19kYXRhX19bJ2RlbGV0ZSddKGtleSk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgc3RhY2sgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrR2V0KGtleSkge1xuICByZXR1cm4gdGhpcy5fX2RhdGFfXy5nZXQoa2V5KTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBzdGFjayB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrSGFzKGtleSkge1xuICByZXR1cm4gdGhpcy5fX2RhdGFfXy5oYXMoa2V5KTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBzdGFjayBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBzdGFjayBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gc3RhY2tTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgY2FjaGUgPSB0aGlzLl9fZGF0YV9fO1xuICBpZiAoY2FjaGUgaW5zdGFuY2VvZiBMaXN0Q2FjaGUpIHtcbiAgICB2YXIgcGFpcnMgPSBjYWNoZS5fX2RhdGFfXztcbiAgICBpZiAoIU1hcCB8fCAocGFpcnMubGVuZ3RoIDwgTEFSR0VfQVJSQVlfU0laRSAtIDEpKSB7XG4gICAgICBwYWlycy5wdXNoKFtrZXksIHZhbHVlXSk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgY2FjaGUgPSB0aGlzLl9fZGF0YV9fID0gbmV3IE1hcENhY2hlKHBhaXJzKTtcbiAgfVxuICBjYWNoZS5zZXQoa2V5LCB2YWx1ZSk7XG4gIHJldHVybiB0aGlzO1xufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgU3RhY2tgLlxuU3RhY2sucHJvdG90eXBlLmNsZWFyID0gc3RhY2tDbGVhcjtcblN0YWNrLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBzdGFja0RlbGV0ZTtcblN0YWNrLnByb3RvdHlwZS5nZXQgPSBzdGFja0dldDtcblN0YWNrLnByb3RvdHlwZS5oYXMgPSBzdGFja0hhcztcblN0YWNrLnByb3RvdHlwZS5zZXQgPSBzdGFja1NldDtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIHRoZSBhcnJheS1saWtlIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtib29sZWFufSBpbmhlcml0ZWQgU3BlY2lmeSByZXR1cm5pbmcgaW5oZXJpdGVkIHByb3BlcnR5IG5hbWVzLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYXJyYXlMaWtlS2V5cyh2YWx1ZSwgaW5oZXJpdGVkKSB7XG4gIC8vIFNhZmFyaSA4LjEgbWFrZXMgYGFyZ3VtZW50cy5jYWxsZWVgIGVudW1lcmFibGUgaW4gc3RyaWN0IG1vZGUuXG4gIC8vIFNhZmFyaSA5IG1ha2VzIGBhcmd1bWVudHMubGVuZ3RoYCBlbnVtZXJhYmxlIGluIHN0cmljdCBtb2RlLlxuICB2YXIgcmVzdWx0ID0gKGlzQXJyYXkodmFsdWUpIHx8IGlzQXJndW1lbnRzKHZhbHVlKSlcbiAgICA/IGJhc2VUaW1lcyh2YWx1ZS5sZW5ndGgsIFN0cmluZylcbiAgICA6IFtdO1xuXG4gIHZhciBsZW5ndGggPSByZXN1bHQubGVuZ3RoLFxuICAgICAgc2tpcEluZGV4ZXMgPSAhIWxlbmd0aDtcblxuICBmb3IgKHZhciBrZXkgaW4gdmFsdWUpIHtcbiAgICBpZiAoKGluaGVyaXRlZCB8fCBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCBrZXkpKSAmJlxuICAgICAgICAhKHNraXBJbmRleGVzICYmIChrZXkgPT0gJ2xlbmd0aCcgfHwgaXNJbmRleChrZXksIGxlbmd0aCkpKSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIGxpa2UgYGFzc2lnblZhbHVlYCBleGNlcHQgdGhhdCBpdCBkb2Vzbid0IGFzc2lnblxuICogYHVuZGVmaW5lZGAgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBhc3NpZ24uXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBhc3NpZ24uXG4gKi9cbmZ1bmN0aW9uIGFzc2lnbk1lcmdlVmFsdWUob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIGlmICgodmFsdWUgIT09IHVuZGVmaW5lZCAmJiAhZXEob2JqZWN0W2tleV0sIHZhbHVlKSkgfHxcbiAgICAgICh0eXBlb2Yga2V5ID09ICdudW1iZXInICYmIHZhbHVlID09PSB1bmRlZmluZWQgJiYgIShrZXkgaW4gb2JqZWN0KSkpIHtcbiAgICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICB9XG59XG5cbi8qKlxuICogQXNzaWducyBgdmFsdWVgIHRvIGBrZXlgIG9mIGBvYmplY3RgIGlmIHRoZSBleGlzdGluZyB2YWx1ZSBpcyBub3QgZXF1aXZhbGVudFxuICogdXNpbmcgW2BTYW1lVmFsdWVaZXJvYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtc2FtZXZhbHVlemVybylcbiAqIGZvciBlcXVhbGl0eSBjb21wYXJpc29ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gYXNzaWduLlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gYXNzaWduLlxuICovXG5mdW5jdGlvbiBhc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgdmFyIG9ialZhbHVlID0gb2JqZWN0W2tleV07XG4gIGlmICghKGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpICYmIGVxKG9ialZhbHVlLCB2YWx1ZSkpIHx8XG4gICAgICAodmFsdWUgPT09IHVuZGVmaW5lZCAmJiAhKGtleSBpbiBvYmplY3QpKSkge1xuICAgIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIH1cbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBpbmRleCBhdCB3aGljaCB0aGUgYGtleWAgaXMgZm91bmQgaW4gYGFycmF5YCBvZiBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHsqfSBrZXkgVGhlIGtleSB0byBzZWFyY2ggZm9yLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gYXNzb2NJbmRleE9mKGFycmF5LCBrZXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgaWYgKGVxKGFycmF5W2xlbmd0aF1bMF0sIGtleSkpIHtcbiAgICAgIHJldHVybiBsZW5ndGg7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5hc3NpZ25gIHdpdGhvdXQgc3VwcG9ydCBmb3IgbXVsdGlwbGUgc291cmNlc1xuICogb3IgYGN1c3RvbWl6ZXJgIGZ1bmN0aW9ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgc291cmNlIG9iamVjdC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VBc3NpZ24ob2JqZWN0LCBzb3VyY2UpIHtcbiAgcmV0dXJuIG9iamVjdCAmJiBjb3B5T2JqZWN0KHNvdXJjZSwga2V5cyhzb3VyY2UpLCBvYmplY3QpO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmNsb25lYCBhbmQgYF8uY2xvbmVEZWVwYCB3aGljaCB0cmFja3NcbiAqIHRyYXZlcnNlZCBvYmplY3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjbG9uZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRGVlcF0gU3BlY2lmeSBhIGRlZXAgY2xvbmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0Z1bGxdIFNwZWNpZnkgYSBjbG9uZSBpbmNsdWRpbmcgc3ltYm9scy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNsb25pbmcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2tleV0gVGhlIGtleSBvZiBgdmFsdWVgLlxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBwYXJlbnQgb2JqZWN0IG9mIGB2YWx1ZWAuXG4gKiBAcGFyYW0ge09iamVjdH0gW3N0YWNrXSBUcmFja3MgdHJhdmVyc2VkIG9iamVjdHMgYW5kIHRoZWlyIGNsb25lIGNvdW50ZXJwYXJ0cy5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBjbG9uZWQgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGJhc2VDbG9uZSh2YWx1ZSwgaXNEZWVwLCBpc0Z1bGwsIGN1c3RvbWl6ZXIsIGtleSwgb2JqZWN0LCBzdGFjaykge1xuICB2YXIgcmVzdWx0O1xuICBpZiAoY3VzdG9taXplcikge1xuICAgIHJlc3VsdCA9IG9iamVjdCA/IGN1c3RvbWl6ZXIodmFsdWUsIGtleSwgb2JqZWN0LCBzdGFjaykgOiBjdXN0b21pemVyKHZhbHVlKTtcbiAgfVxuICBpZiAocmVzdWx0ICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGlmICghaXNPYmplY3QodmFsdWUpKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIHZhciBpc0FyciA9IGlzQXJyYXkodmFsdWUpO1xuICBpZiAoaXNBcnIpIHtcbiAgICByZXN1bHQgPSBpbml0Q2xvbmVBcnJheSh2YWx1ZSk7XG4gICAgaWYgKCFpc0RlZXApIHtcbiAgICAgIHJldHVybiBjb3B5QXJyYXkodmFsdWUsIHJlc3VsdCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciB0YWcgPSBnZXRUYWcodmFsdWUpLFxuICAgICAgICBpc0Z1bmMgPSB0YWcgPT0gZnVuY1RhZyB8fCB0YWcgPT0gZ2VuVGFnO1xuXG4gICAgaWYgKGlzQnVmZmVyKHZhbHVlKSkge1xuICAgICAgcmV0dXJuIGNsb25lQnVmZmVyKHZhbHVlLCBpc0RlZXApO1xuICAgIH1cbiAgICBpZiAodGFnID09IG9iamVjdFRhZyB8fCB0YWcgPT0gYXJnc1RhZyB8fCAoaXNGdW5jICYmICFvYmplY3QpKSB7XG4gICAgICBpZiAoaXNIb3N0T2JqZWN0KHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gb2JqZWN0ID8gdmFsdWUgOiB7fTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdCA9IGluaXRDbG9uZU9iamVjdChpc0Z1bmMgPyB7fSA6IHZhbHVlKTtcbiAgICAgIGlmICghaXNEZWVwKSB7XG4gICAgICAgIHJldHVybiBjb3B5U3ltYm9scyh2YWx1ZSwgYmFzZUFzc2lnbihyZXN1bHQsIHZhbHVlKSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghY2xvbmVhYmxlVGFnc1t0YWddKSB7XG4gICAgICAgIHJldHVybiBvYmplY3QgPyB2YWx1ZSA6IHt9O1xuICAgICAgfVxuICAgICAgcmVzdWx0ID0gaW5pdENsb25lQnlUYWcodmFsdWUsIHRhZywgYmFzZUNsb25lLCBpc0RlZXApO1xuICAgIH1cbiAgfVxuICAvLyBDaGVjayBmb3IgY2lyY3VsYXIgcmVmZXJlbmNlcyBhbmQgcmV0dXJuIGl0cyBjb3JyZXNwb25kaW5nIGNsb25lLlxuICBzdGFjayB8fCAoc3RhY2sgPSBuZXcgU3RhY2spO1xuICB2YXIgc3RhY2tlZCA9IHN0YWNrLmdldCh2YWx1ZSk7XG4gIGlmIChzdGFja2VkKSB7XG4gICAgcmV0dXJuIHN0YWNrZWQ7XG4gIH1cbiAgc3RhY2suc2V0KHZhbHVlLCByZXN1bHQpO1xuXG4gIGlmICghaXNBcnIpIHtcbiAgICB2YXIgcHJvcHMgPSBpc0Z1bGwgPyBnZXRBbGxLZXlzKHZhbHVlKSA6IGtleXModmFsdWUpO1xuICB9XG4gIGFycmF5RWFjaChwcm9wcyB8fCB2YWx1ZSwgZnVuY3Rpb24oc3ViVmFsdWUsIGtleSkge1xuICAgIGlmIChwcm9wcykge1xuICAgICAga2V5ID0gc3ViVmFsdWU7XG4gICAgICBzdWJWYWx1ZSA9IHZhbHVlW2tleV07XG4gICAgfVxuICAgIC8vIFJlY3Vyc2l2ZWx5IHBvcHVsYXRlIGNsb25lIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgYXNzaWduVmFsdWUocmVzdWx0LCBrZXksIGJhc2VDbG9uZShzdWJWYWx1ZSwgaXNEZWVwLCBpc0Z1bGwsIGN1c3RvbWl6ZXIsIGtleSwgdmFsdWUsIHN0YWNrKSk7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmNyZWF0ZWAgd2l0aG91dCBzdXBwb3J0IGZvciBhc3NpZ25pbmdcbiAqIHByb3BlcnRpZXMgdG8gdGhlIGNyZWF0ZWQgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gcHJvdG90eXBlIFRoZSBvYmplY3QgdG8gaW5oZXJpdCBmcm9tLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbmV3IG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gYmFzZUNyZWF0ZShwcm90bykge1xuICByZXR1cm4gaXNPYmplY3QocHJvdG8pID8gb2JqZWN0Q3JlYXRlKHByb3RvKSA6IHt9O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBnZXRBbGxLZXlzYCBhbmQgYGdldEFsbEtleXNJbmAgd2hpY2ggdXNlc1xuICogYGtleXNGdW5jYCBhbmQgYHN5bWJvbHNGdW5jYCB0byBnZXQgdGhlIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgYW5kXG4gKiBzeW1ib2xzIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBrZXlzRnVuYyBUaGUgZnVuY3Rpb24gdG8gZ2V0IHRoZSBrZXlzIG9mIGBvYmplY3RgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gc3ltYm9sc0Z1bmMgVGhlIGZ1bmN0aW9uIHRvIGdldCB0aGUgc3ltYm9scyBvZiBgb2JqZWN0YC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMgYW5kIHN5bWJvbHMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRBbGxLZXlzKG9iamVjdCwga2V5c0Z1bmMsIHN5bWJvbHNGdW5jKSB7XG4gIHZhciByZXN1bHQgPSBrZXlzRnVuYyhvYmplY3QpO1xuICByZXR1cm4gaXNBcnJheShvYmplY3QpID8gcmVzdWx0IDogYXJyYXlQdXNoKHJlc3VsdCwgc3ltYm9sc0Z1bmMob2JqZWN0KSk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGdldFRhZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUdldFRhZyh2YWx1ZSkge1xuICByZXR1cm4gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNOYXRpdmVgIHdpdGhvdXQgYmFkIHNoaW0gY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzTmF0aXZlKHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3QodmFsdWUpIHx8IGlzTWFza2VkKHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgcGF0dGVybiA9IChpc0Z1bmN0aW9uKHZhbHVlKSB8fCBpc0hvc3RPYmplY3QodmFsdWUpKSA/IHJlSXNOYXRpdmUgOiByZUlzSG9zdEN0b3I7XG4gIHJldHVybiBwYXR0ZXJuLnRlc3QodG9Tb3VyY2UodmFsdWUpKTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc1R5cGVkQXJyYXlgIHdpdGhvdXQgTm9kZS5qcyBvcHRpbWl6YXRpb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdHlwZWQgYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzVHlwZWRBcnJheSh2YWx1ZSkge1xuICByZXR1cm4gaXNPYmplY3RMaWtlKHZhbHVlKSAmJlxuICAgIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgISF0eXBlZEFycmF5VGFnc1tvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKV07XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ua2V5c2Agd2hpY2ggZG9lc24ndCB0cmVhdCBzcGFyc2UgYXJyYXlzIGFzIGRlbnNlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBiYXNlS2V5cyhvYmplY3QpIHtcbiAgaWYgKCFpc1Byb3RvdHlwZShvYmplY3QpKSB7XG4gICAgcmV0dXJuIG5hdGl2ZUtleXMob2JqZWN0KTtcbiAgfVxuICB2YXIgcmVzdWx0ID0gW107XG4gIGZvciAodmFyIGtleSBpbiBPYmplY3Qob2JqZWN0KSkge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSAmJiBrZXkgIT0gJ2NvbnN0cnVjdG9yJykge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5rZXlzSW5gIHdoaWNoIGRvZXNuJ3QgdHJlYXQgc3BhcnNlIGFycmF5cyBhcyBkZW5zZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYmFzZUtleXNJbihvYmplY3QpIHtcbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgcmV0dXJuIG5hdGl2ZUtleXNJbihvYmplY3QpO1xuICB9XG4gIHZhciBpc1Byb3RvID0gaXNQcm90b3R5cGUob2JqZWN0KSxcbiAgICAgIHJlc3VsdCA9IFtdO1xuXG4gIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICBpZiAoIShrZXkgPT0gJ2NvbnN0cnVjdG9yJyAmJiAoaXNQcm90byB8fCAhaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkpKSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5tZXJnZWAgd2l0aG91dCBzdXBwb3J0IGZvciBtdWx0aXBsZSBzb3VyY2VzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHBhcmFtIHtudW1iZXJ9IHNyY0luZGV4IFRoZSBpbmRleCBvZiBgc291cmNlYC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIG1lcmdlZCB2YWx1ZXMuXG4gKiBAcGFyYW0ge09iamVjdH0gW3N0YWNrXSBUcmFja3MgdHJhdmVyc2VkIHNvdXJjZSB2YWx1ZXMgYW5kIHRoZWlyIG1lcmdlZFxuICogIGNvdW50ZXJwYXJ0cy5cbiAqL1xuZnVuY3Rpb24gYmFzZU1lcmdlKG9iamVjdCwgc291cmNlLCBzcmNJbmRleCwgY3VzdG9taXplciwgc3RhY2spIHtcbiAgaWYgKG9iamVjdCA9PT0gc291cmNlKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICghKGlzQXJyYXkoc291cmNlKSB8fCBpc1R5cGVkQXJyYXkoc291cmNlKSkpIHtcbiAgICB2YXIgcHJvcHMgPSBiYXNlS2V5c0luKHNvdXJjZSk7XG4gIH1cbiAgYXJyYXlFYWNoKHByb3BzIHx8IHNvdXJjZSwgZnVuY3Rpb24oc3JjVmFsdWUsIGtleSkge1xuICAgIGlmIChwcm9wcykge1xuICAgICAga2V5ID0gc3JjVmFsdWU7XG4gICAgICBzcmNWYWx1ZSA9IHNvdXJjZVtrZXldO1xuICAgIH1cbiAgICBpZiAoaXNPYmplY3Qoc3JjVmFsdWUpKSB7XG4gICAgICBzdGFjayB8fCAoc3RhY2sgPSBuZXcgU3RhY2spO1xuICAgICAgYmFzZU1lcmdlRGVlcChvYmplY3QsIHNvdXJjZSwga2V5LCBzcmNJbmRleCwgYmFzZU1lcmdlLCBjdXN0b21pemVyLCBzdGFjayk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdmFyIG5ld1ZhbHVlID0gY3VzdG9taXplclxuICAgICAgICA/IGN1c3RvbWl6ZXIob2JqZWN0W2tleV0sIHNyY1ZhbHVlLCAoa2V5ICsgJycpLCBvYmplY3QsIHNvdXJjZSwgc3RhY2spXG4gICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgICBpZiAobmV3VmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBuZXdWYWx1ZSA9IHNyY1ZhbHVlO1xuICAgICAgfVxuICAgICAgYXNzaWduTWVyZ2VWYWx1ZShvYmplY3QsIGtleSwgbmV3VmFsdWUpO1xuICAgIH1cbiAgfSk7XG59XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlTWVyZ2VgIGZvciBhcnJheXMgYW5kIG9iamVjdHMgd2hpY2ggcGVyZm9ybXNcbiAqIGRlZXAgbWVyZ2VzIGFuZCB0cmFja3MgdHJhdmVyc2VkIG9iamVjdHMgZW5hYmxpbmcgb2JqZWN0cyB3aXRoIGNpcmN1bGFyXG4gKiByZWZlcmVuY2VzIHRvIGJlIG1lcmdlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gbWVyZ2UuXG4gKiBAcGFyYW0ge251bWJlcn0gc3JjSW5kZXggVGhlIGluZGV4IG9mIGBzb3VyY2VgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gbWVyZ2VGdW5jIFRoZSBmdW5jdGlvbiB0byBtZXJnZSB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBhc3NpZ25lZCB2YWx1ZXMuXG4gKiBAcGFyYW0ge09iamVjdH0gW3N0YWNrXSBUcmFja3MgdHJhdmVyc2VkIHNvdXJjZSB2YWx1ZXMgYW5kIHRoZWlyIG1lcmdlZFxuICogIGNvdW50ZXJwYXJ0cy5cbiAqL1xuZnVuY3Rpb24gYmFzZU1lcmdlRGVlcChvYmplY3QsIHNvdXJjZSwga2V5LCBzcmNJbmRleCwgbWVyZ2VGdW5jLCBjdXN0b21pemVyLCBzdGFjaykge1xuICB2YXIgb2JqVmFsdWUgPSBvYmplY3Rba2V5XSxcbiAgICAgIHNyY1ZhbHVlID0gc291cmNlW2tleV0sXG4gICAgICBzdGFja2VkID0gc3RhY2suZ2V0KHNyY1ZhbHVlKTtcblxuICBpZiAoc3RhY2tlZCkge1xuICAgIGFzc2lnbk1lcmdlVmFsdWUob2JqZWN0LCBrZXksIHN0YWNrZWQpO1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbmV3VmFsdWUgPSBjdXN0b21pemVyXG4gICAgPyBjdXN0b21pemVyKG9ialZhbHVlLCBzcmNWYWx1ZSwgKGtleSArICcnKSwgb2JqZWN0LCBzb3VyY2UsIHN0YWNrKVxuICAgIDogdW5kZWZpbmVkO1xuXG4gIHZhciBpc0NvbW1vbiA9IG5ld1ZhbHVlID09PSB1bmRlZmluZWQ7XG5cbiAgaWYgKGlzQ29tbW9uKSB7XG4gICAgbmV3VmFsdWUgPSBzcmNWYWx1ZTtcbiAgICBpZiAoaXNBcnJheShzcmNWYWx1ZSkgfHwgaXNUeXBlZEFycmF5KHNyY1ZhbHVlKSkge1xuICAgICAgaWYgKGlzQXJyYXkob2JqVmFsdWUpKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gb2JqVmFsdWU7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChpc0FycmF5TGlrZU9iamVjdChvYmpWYWx1ZSkpIHtcbiAgICAgICAgbmV3VmFsdWUgPSBjb3B5QXJyYXkob2JqVmFsdWUpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gICAgICAgIG5ld1ZhbHVlID0gYmFzZUNsb25lKHNyY1ZhbHVlLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoaXNQbGFpbk9iamVjdChzcmNWYWx1ZSkgfHwgaXNBcmd1bWVudHMoc3JjVmFsdWUpKSB7XG4gICAgICBpZiAoaXNBcmd1bWVudHMob2JqVmFsdWUpKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gdG9QbGFpbk9iamVjdChvYmpWYWx1ZSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmICghaXNPYmplY3Qob2JqVmFsdWUpIHx8IChzcmNJbmRleCAmJiBpc0Z1bmN0aW9uKG9ialZhbHVlKSkpIHtcbiAgICAgICAgaXNDb21tb24gPSBmYWxzZTtcbiAgICAgICAgbmV3VmFsdWUgPSBiYXNlQ2xvbmUoc3JjVmFsdWUsIHRydWUpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIG5ld1ZhbHVlID0gb2JqVmFsdWU7XG4gICAgICB9XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgaXNDb21tb24gPSBmYWxzZTtcbiAgICB9XG4gIH1cbiAgaWYgKGlzQ29tbW9uKSB7XG4gICAgLy8gUmVjdXJzaXZlbHkgbWVyZ2Ugb2JqZWN0cyBhbmQgYXJyYXlzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgc3RhY2suc2V0KHNyY1ZhbHVlLCBuZXdWYWx1ZSk7XG4gICAgbWVyZ2VGdW5jKG5ld1ZhbHVlLCBzcmNWYWx1ZSwgc3JjSW5kZXgsIGN1c3RvbWl6ZXIsIHN0YWNrKTtcbiAgICBzdGFja1snZGVsZXRlJ10oc3JjVmFsdWUpO1xuICB9XG4gIGFzc2lnbk1lcmdlVmFsdWUob2JqZWN0LCBrZXksIG5ld1ZhbHVlKTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5yZXN0YCB3aGljaCBkb2Vzbid0IHZhbGlkYXRlIG9yIGNvZXJjZSBhcmd1bWVudHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGFwcGx5IGEgcmVzdCBwYXJhbWV0ZXIgdG8uXG4gKiBAcGFyYW0ge251bWJlcn0gW3N0YXJ0PWZ1bmMubGVuZ3RoLTFdIFRoZSBzdGFydCBwb3NpdGlvbiBvZiB0aGUgcmVzdCBwYXJhbWV0ZXIuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVJlc3QoZnVuYywgc3RhcnQpIHtcbiAgc3RhcnQgPSBuYXRpdmVNYXgoc3RhcnQgPT09IHVuZGVmaW5lZCA/IChmdW5jLmxlbmd0aCAtIDEpIDogc3RhcnQsIDApO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMsXG4gICAgICAgIGluZGV4ID0gLTEsXG4gICAgICAgIGxlbmd0aCA9IG5hdGl2ZU1heChhcmdzLmxlbmd0aCAtIHN0YXJ0LCAwKSxcbiAgICAgICAgYXJyYXkgPSBBcnJheShsZW5ndGgpO1xuXG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIGFycmF5W2luZGV4XSA9IGFyZ3Nbc3RhcnQgKyBpbmRleF07XG4gICAgfVxuICAgIGluZGV4ID0gLTE7XG4gICAgdmFyIG90aGVyQXJncyA9IEFycmF5KHN0YXJ0ICsgMSk7XG4gICAgd2hpbGUgKCsraW5kZXggPCBzdGFydCkge1xuICAgICAgb3RoZXJBcmdzW2luZGV4XSA9IGFyZ3NbaW5kZXhdO1xuICAgIH1cbiAgICBvdGhlckFyZ3Nbc3RhcnRdID0gYXJyYXk7XG4gICAgcmV0dXJuIGFwcGx5KGZ1bmMsIHRoaXMsIG90aGVyQXJncyk7XG4gIH07XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mICBgYnVmZmVyYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtCdWZmZXJ9IGJ1ZmZlciBUaGUgYnVmZmVyIHRvIGNsb25lLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBjbG9uZS5cbiAqIEByZXR1cm5zIHtCdWZmZXJ9IFJldHVybnMgdGhlIGNsb25lZCBidWZmZXIuXG4gKi9cbmZ1bmN0aW9uIGNsb25lQnVmZmVyKGJ1ZmZlciwgaXNEZWVwKSB7XG4gIGlmIChpc0RlZXApIHtcbiAgICByZXR1cm4gYnVmZmVyLnNsaWNlKCk7XG4gIH1cbiAgdmFyIHJlc3VsdCA9IG5ldyBidWZmZXIuY29uc3RydWN0b3IoYnVmZmVyLmxlbmd0aCk7XG4gIGJ1ZmZlci5jb3B5KHJlc3VsdCk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mIGBhcnJheUJ1ZmZlcmAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXlCdWZmZXJ9IGFycmF5QnVmZmVyIFRoZSBhcnJheSBidWZmZXIgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyB7QXJyYXlCdWZmZXJ9IFJldHVybnMgdGhlIGNsb25lZCBhcnJheSBidWZmZXIuXG4gKi9cbmZ1bmN0aW9uIGNsb25lQXJyYXlCdWZmZXIoYXJyYXlCdWZmZXIpIHtcbiAgdmFyIHJlc3VsdCA9IG5ldyBhcnJheUJ1ZmZlci5jb25zdHJ1Y3RvcihhcnJheUJ1ZmZlci5ieXRlTGVuZ3RoKTtcbiAgbmV3IFVpbnQ4QXJyYXkocmVzdWx0KS5zZXQobmV3IFVpbnQ4QXJyYXkoYXJyYXlCdWZmZXIpKTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgYGRhdGFWaWV3YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IGRhdGFWaWV3IFRoZSBkYXRhIHZpZXcgdG8gY2xvbmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0RlZXBdIFNwZWNpZnkgYSBkZWVwIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY2xvbmVkIGRhdGEgdmlldy5cbiAqL1xuZnVuY3Rpb24gY2xvbmVEYXRhVmlldyhkYXRhVmlldywgaXNEZWVwKSB7XG4gIHZhciBidWZmZXIgPSBpc0RlZXAgPyBjbG9uZUFycmF5QnVmZmVyKGRhdGFWaWV3LmJ1ZmZlcikgOiBkYXRhVmlldy5idWZmZXI7XG4gIHJldHVybiBuZXcgZGF0YVZpZXcuY29uc3RydWN0b3IoYnVmZmVyLCBkYXRhVmlldy5ieXRlT2Zmc2V0LCBkYXRhVmlldy5ieXRlTGVuZ3RoKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgYG1hcGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBjbG9uZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNsb25lRnVuYyBUaGUgZnVuY3Rpb24gdG8gY2xvbmUgdmFsdWVzLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNsb25lZCBtYXAuXG4gKi9cbmZ1bmN0aW9uIGNsb25lTWFwKG1hcCwgaXNEZWVwLCBjbG9uZUZ1bmMpIHtcbiAgdmFyIGFycmF5ID0gaXNEZWVwID8gY2xvbmVGdW5jKG1hcFRvQXJyYXkobWFwKSwgdHJ1ZSkgOiBtYXBUb0FycmF5KG1hcCk7XG4gIHJldHVybiBhcnJheVJlZHVjZShhcnJheSwgYWRkTWFwRW50cnksIG5ldyBtYXAuY29uc3RydWN0b3IpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiBgcmVnZXhwYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHJlZ2V4cCBUaGUgcmVnZXhwIHRvIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY2xvbmVkIHJlZ2V4cC5cbiAqL1xuZnVuY3Rpb24gY2xvbmVSZWdFeHAocmVnZXhwKSB7XG4gIHZhciByZXN1bHQgPSBuZXcgcmVnZXhwLmNvbnN0cnVjdG9yKHJlZ2V4cC5zb3VyY2UsIHJlRmxhZ3MuZXhlYyhyZWdleHApKTtcbiAgcmVzdWx0Lmxhc3RJbmRleCA9IHJlZ2V4cC5sYXN0SW5kZXg7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mIGBzZXRgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc2V0IFRoZSBzZXQgdG8gY2xvbmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjbG9uZUZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNsb25lIHZhbHVlcy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRGVlcF0gU3BlY2lmeSBhIGRlZXAgY2xvbmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjbG9uZWQgc2V0LlxuICovXG5mdW5jdGlvbiBjbG9uZVNldChzZXQsIGlzRGVlcCwgY2xvbmVGdW5jKSB7XG4gIHZhciBhcnJheSA9IGlzRGVlcCA/IGNsb25lRnVuYyhzZXRUb0FycmF5KHNldCksIHRydWUpIDogc2V0VG9BcnJheShzZXQpO1xuICByZXR1cm4gYXJyYXlSZWR1Y2UoYXJyYXksIGFkZFNldEVudHJ5LCBuZXcgc2V0LmNvbnN0cnVjdG9yKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgdGhlIGBzeW1ib2xgIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHN5bWJvbCBUaGUgc3ltYm9sIG9iamVjdCB0byBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNsb25lZCBzeW1ib2wgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBjbG9uZVN5bWJvbChzeW1ib2wpIHtcbiAgcmV0dXJuIHN5bWJvbFZhbHVlT2YgPyBPYmplY3Qoc3ltYm9sVmFsdWVPZi5jYWxsKHN5bWJvbCkpIDoge307XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mIGB0eXBlZEFycmF5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHR5cGVkQXJyYXkgVGhlIHR5cGVkIGFycmF5IHRvIGNsb25lLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNsb25lZCB0eXBlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gY2xvbmVUeXBlZEFycmF5KHR5cGVkQXJyYXksIGlzRGVlcCkge1xuICB2YXIgYnVmZmVyID0gaXNEZWVwID8gY2xvbmVBcnJheUJ1ZmZlcih0eXBlZEFycmF5LmJ1ZmZlcikgOiB0eXBlZEFycmF5LmJ1ZmZlcjtcbiAgcmV0dXJuIG5ldyB0eXBlZEFycmF5LmNvbnN0cnVjdG9yKGJ1ZmZlciwgdHlwZWRBcnJheS5ieXRlT2Zmc2V0LCB0eXBlZEFycmF5Lmxlbmd0aCk7XG59XG5cbi8qKlxuICogQ29waWVzIHRoZSB2YWx1ZXMgb2YgYHNvdXJjZWAgdG8gYGFycmF5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gc291cmNlIFRoZSBhcnJheSB0byBjb3B5IHZhbHVlcyBmcm9tLlxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5PVtdXSBUaGUgYXJyYXkgdG8gY29weSB2YWx1ZXMgdG8uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gY29weUFycmF5KHNvdXJjZSwgYXJyYXkpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBzb3VyY2UubGVuZ3RoO1xuXG4gIGFycmF5IHx8IChhcnJheSA9IEFycmF5KGxlbmd0aCkpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGFycmF5W2luZGV4XSA9IHNvdXJjZVtpbmRleF07XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG4vKipcbiAqIENvcGllcyBwcm9wZXJ0aWVzIG9mIGBzb3VyY2VgIHRvIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb20uXG4gKiBAcGFyYW0ge0FycmF5fSBwcm9wcyBUaGUgcHJvcGVydHkgaWRlbnRpZmllcnMgdG8gY29weS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb2JqZWN0PXt9XSBUaGUgb2JqZWN0IHRvIGNvcHkgcHJvcGVydGllcyB0by5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvcGllZCB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBjb3B5T2JqZWN0KHNvdXJjZSwgcHJvcHMsIG9iamVjdCwgY3VzdG9taXplcikge1xuICBvYmplY3QgfHwgKG9iamVjdCA9IHt9KTtcblxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBrZXkgPSBwcm9wc1tpbmRleF07XG5cbiAgICB2YXIgbmV3VmFsdWUgPSBjdXN0b21pemVyXG4gICAgICA/IGN1c3RvbWl6ZXIob2JqZWN0W2tleV0sIHNvdXJjZVtrZXldLCBrZXksIG9iamVjdCwgc291cmNlKVxuICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICBhc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgbmV3VmFsdWUgPT09IHVuZGVmaW5lZCA/IHNvdXJjZVtrZXldIDogbmV3VmFsdWUpO1xuICB9XG4gIHJldHVybiBvYmplY3Q7XG59XG5cbi8qKlxuICogQ29waWVzIG93biBzeW1ib2wgcHJvcGVydGllcyBvZiBgc291cmNlYCB0byBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgb2JqZWN0IHRvIGNvcHkgc3ltYm9scyBmcm9tLlxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3Q9e31dIFRoZSBvYmplY3QgdG8gY29weSBzeW1ib2xzIHRvLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gY29weVN5bWJvbHMoc291cmNlLCBvYmplY3QpIHtcbiAgcmV0dXJuIGNvcHlPYmplY3Qoc291cmNlLCBnZXRTeW1ib2xzKHNvdXJjZSksIG9iamVjdCk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIGxpa2UgYF8uYXNzaWduYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gYXNzaWduZXIgVGhlIGZ1bmN0aW9uIHRvIGFzc2lnbiB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBhc3NpZ25lciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQXNzaWduZXIoYXNzaWduZXIpIHtcbiAgcmV0dXJuIGJhc2VSZXN0KGZ1bmN0aW9uKG9iamVjdCwgc291cmNlcykge1xuICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBzb3VyY2VzLmxlbmd0aCxcbiAgICAgICAgY3VzdG9taXplciA9IGxlbmd0aCA+IDEgPyBzb3VyY2VzW2xlbmd0aCAtIDFdIDogdW5kZWZpbmVkLFxuICAgICAgICBndWFyZCA9IGxlbmd0aCA+IDIgPyBzb3VyY2VzWzJdIDogdW5kZWZpbmVkO1xuXG4gICAgY3VzdG9taXplciA9IChhc3NpZ25lci5sZW5ndGggPiAzICYmIHR5cGVvZiBjdXN0b21pemVyID09ICdmdW5jdGlvbicpXG4gICAgICA/IChsZW5ndGgtLSwgY3VzdG9taXplcilcbiAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKGd1YXJkICYmIGlzSXRlcmF0ZWVDYWxsKHNvdXJjZXNbMF0sIHNvdXJjZXNbMV0sIGd1YXJkKSkge1xuICAgICAgY3VzdG9taXplciA9IGxlbmd0aCA8IDMgPyB1bmRlZmluZWQgOiBjdXN0b21pemVyO1xuICAgICAgbGVuZ3RoID0gMTtcbiAgICB9XG4gICAgb2JqZWN0ID0gT2JqZWN0KG9iamVjdCk7XG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIHZhciBzb3VyY2UgPSBzb3VyY2VzW2luZGV4XTtcbiAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgYXNzaWduZXIob2JqZWN0LCBzb3VyY2UsIGluZGV4LCBjdXN0b21pemVyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfSk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBhbmQgc3ltYm9scyBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcyBhbmQgc3ltYm9scy5cbiAqL1xuZnVuY3Rpb24gZ2V0QWxsS2V5cyhvYmplY3QpIHtcbiAgcmV0dXJuIGJhc2VHZXRBbGxLZXlzKG9iamVjdCwga2V5cywgZ2V0U3ltYm9scyk7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgZGF0YSBmb3IgYG1hcGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIHJlZmVyZW5jZSBrZXkuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgbWFwIGRhdGEuXG4gKi9cbmZ1bmN0aW9uIGdldE1hcERhdGEobWFwLCBrZXkpIHtcbiAgdmFyIGRhdGEgPSBtYXAuX19kYXRhX187XG4gIHJldHVybiBpc0tleWFibGUoa2V5KVxuICAgID8gZGF0YVt0eXBlb2Yga2V5ID09ICdzdHJpbmcnID8gJ3N0cmluZycgOiAnaGFzaCddXG4gICAgOiBkYXRhLm1hcDtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBuYXRpdmUgZnVuY3Rpb24gYXQgYGtleWAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgbWV0aG9kIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBmdW5jdGlvbiBpZiBpdCdzIG5hdGl2ZSwgZWxzZSBgdW5kZWZpbmVkYC5cbiAqL1xuZnVuY3Rpb24gZ2V0TmF0aXZlKG9iamVjdCwga2V5KSB7XG4gIHZhciB2YWx1ZSA9IGdldFZhbHVlKG9iamVjdCwga2V5KTtcbiAgcmV0dXJuIGJhc2VJc05hdGl2ZSh2YWx1ZSkgPyB2YWx1ZSA6IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBzeW1ib2wgcHJvcGVydGllcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBzeW1ib2xzLlxuICovXG52YXIgZ2V0U3ltYm9scyA9IG5hdGl2ZUdldFN5bWJvbHMgPyBvdmVyQXJnKG5hdGl2ZUdldFN5bWJvbHMsIE9iamVjdCkgOiBzdHViQXJyYXk7XG5cbi8qKlxuICogR2V0cyB0aGUgYHRvU3RyaW5nVGFnYCBvZiBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbnZhciBnZXRUYWcgPSBiYXNlR2V0VGFnO1xuXG4vLyBGYWxsYmFjayBmb3IgZGF0YSB2aWV3cywgbWFwcywgc2V0cywgYW5kIHdlYWsgbWFwcyBpbiBJRSAxMSxcbi8vIGZvciBkYXRhIHZpZXdzIGluIEVkZ2UgPCAxNCwgYW5kIHByb21pc2VzIGluIE5vZGUuanMuXG5pZiAoKERhdGFWaWV3ICYmIGdldFRhZyhuZXcgRGF0YVZpZXcobmV3IEFycmF5QnVmZmVyKDEpKSkgIT0gZGF0YVZpZXdUYWcpIHx8XG4gICAgKE1hcCAmJiBnZXRUYWcobmV3IE1hcCkgIT0gbWFwVGFnKSB8fFxuICAgIChQcm9taXNlICYmIGdldFRhZyhQcm9taXNlLnJlc29sdmUoKSkgIT0gcHJvbWlzZVRhZykgfHxcbiAgICAoU2V0ICYmIGdldFRhZyhuZXcgU2V0KSAhPSBzZXRUYWcpIHx8XG4gICAgKFdlYWtNYXAgJiYgZ2V0VGFnKG5ldyBXZWFrTWFwKSAhPSB3ZWFrTWFwVGFnKSkge1xuICBnZXRUYWcgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHZhciByZXN1bHQgPSBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSxcbiAgICAgICAgQ3RvciA9IHJlc3VsdCA9PSBvYmplY3RUYWcgPyB2YWx1ZS5jb25zdHJ1Y3RvciA6IHVuZGVmaW5lZCxcbiAgICAgICAgY3RvclN0cmluZyA9IEN0b3IgPyB0b1NvdXJjZShDdG9yKSA6IHVuZGVmaW5lZDtcblxuICAgIGlmIChjdG9yU3RyaW5nKSB7XG4gICAgICBzd2l0Y2ggKGN0b3JTdHJpbmcpIHtcbiAgICAgICAgY2FzZSBkYXRhVmlld0N0b3JTdHJpbmc6IHJldHVybiBkYXRhVmlld1RhZztcbiAgICAgICAgY2FzZSBtYXBDdG9yU3RyaW5nOiByZXR1cm4gbWFwVGFnO1xuICAgICAgICBjYXNlIHByb21pc2VDdG9yU3RyaW5nOiByZXR1cm4gcHJvbWlzZVRhZztcbiAgICAgICAgY2FzZSBzZXRDdG9yU3RyaW5nOiByZXR1cm4gc2V0VGFnO1xuICAgICAgICBjYXNlIHdlYWtNYXBDdG9yU3RyaW5nOiByZXR1cm4gd2Vha01hcFRhZztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn1cblxuLyoqXG4gKiBJbml0aWFsaXplcyBhbiBhcnJheSBjbG9uZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGNsb25lLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBpbml0aWFsaXplZCBjbG9uZS5cbiAqL1xuZnVuY3Rpb24gaW5pdENsb25lQXJyYXkoYXJyYXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIHJlc3VsdCA9IGFycmF5LmNvbnN0cnVjdG9yKGxlbmd0aCk7XG5cbiAgLy8gQWRkIHByb3BlcnRpZXMgYXNzaWduZWQgYnkgYFJlZ0V4cCNleGVjYC5cbiAgaWYgKGxlbmd0aCAmJiB0eXBlb2YgYXJyYXlbMF0gPT0gJ3N0cmluZycgJiYgaGFzT3duUHJvcGVydHkuY2FsbChhcnJheSwgJ2luZGV4JykpIHtcbiAgICByZXN1bHQuaW5kZXggPSBhcnJheS5pbmRleDtcbiAgICByZXN1bHQuaW5wdXQgPSBhcnJheS5pbnB1dDtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEluaXRpYWxpemVzIGFuIG9iamVjdCBjbG9uZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgaW5pdGlhbGl6ZWQgY2xvbmUuXG4gKi9cbmZ1bmN0aW9uIGluaXRDbG9uZU9iamVjdChvYmplY3QpIHtcbiAgcmV0dXJuICh0eXBlb2Ygb2JqZWN0LmNvbnN0cnVjdG9yID09ICdmdW5jdGlvbicgJiYgIWlzUHJvdG90eXBlKG9iamVjdCkpXG4gICAgPyBiYXNlQ3JlYXRlKGdldFByb3RvdHlwZShvYmplY3QpKVxuICAgIDoge307XG59XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgYW4gb2JqZWN0IGNsb25lIGJhc2VkIG9uIGl0cyBgdG9TdHJpbmdUYWdgLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIG9ubHkgc3VwcG9ydHMgY2xvbmluZyB2YWx1ZXMgd2l0aCB0YWdzIG9mXG4gKiBgQm9vbGVhbmAsIGBEYXRlYCwgYEVycm9yYCwgYE51bWJlcmAsIGBSZWdFeHBgLCBvciBgU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHBhcmFtIHtzdHJpbmd9IHRhZyBUaGUgYHRvU3RyaW5nVGFnYCBvZiB0aGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2xvbmVGdW5jIFRoZSBmdW5jdGlvbiB0byBjbG9uZSB2YWx1ZXMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0RlZXBdIFNwZWNpZnkgYSBkZWVwIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgaW5pdGlhbGl6ZWQgY2xvbmUuXG4gKi9cbmZ1bmN0aW9uIGluaXRDbG9uZUJ5VGFnKG9iamVjdCwgdGFnLCBjbG9uZUZ1bmMsIGlzRGVlcCkge1xuICB2YXIgQ3RvciA9IG9iamVjdC5jb25zdHJ1Y3RvcjtcbiAgc3dpdGNoICh0YWcpIHtcbiAgICBjYXNlIGFycmF5QnVmZmVyVGFnOlxuICAgICAgcmV0dXJuIGNsb25lQXJyYXlCdWZmZXIob2JqZWN0KTtcblxuICAgIGNhc2UgYm9vbFRhZzpcbiAgICBjYXNlIGRhdGVUYWc6XG4gICAgICByZXR1cm4gbmV3IEN0b3IoK29iamVjdCk7XG5cbiAgICBjYXNlIGRhdGFWaWV3VGFnOlxuICAgICAgcmV0dXJuIGNsb25lRGF0YVZpZXcob2JqZWN0LCBpc0RlZXApO1xuXG4gICAgY2FzZSBmbG9hdDMyVGFnOiBjYXNlIGZsb2F0NjRUYWc6XG4gICAgY2FzZSBpbnQ4VGFnOiBjYXNlIGludDE2VGFnOiBjYXNlIGludDMyVGFnOlxuICAgIGNhc2UgdWludDhUYWc6IGNhc2UgdWludDhDbGFtcGVkVGFnOiBjYXNlIHVpbnQxNlRhZzogY2FzZSB1aW50MzJUYWc6XG4gICAgICByZXR1cm4gY2xvbmVUeXBlZEFycmF5KG9iamVjdCwgaXNEZWVwKTtcblxuICAgIGNhc2UgbWFwVGFnOlxuICAgICAgcmV0dXJuIGNsb25lTWFwKG9iamVjdCwgaXNEZWVwLCBjbG9uZUZ1bmMpO1xuXG4gICAgY2FzZSBudW1iZXJUYWc6XG4gICAgY2FzZSBzdHJpbmdUYWc6XG4gICAgICByZXR1cm4gbmV3IEN0b3Iob2JqZWN0KTtcblxuICAgIGNhc2UgcmVnZXhwVGFnOlxuICAgICAgcmV0dXJuIGNsb25lUmVnRXhwKG9iamVjdCk7XG5cbiAgICBjYXNlIHNldFRhZzpcbiAgICAgIHJldHVybiBjbG9uZVNldChvYmplY3QsIGlzRGVlcCwgY2xvbmVGdW5jKTtcblxuICAgIGNhc2Ugc3ltYm9sVGFnOlxuICAgICAgcmV0dXJuIGNsb25lU3ltYm9sKG9iamVjdCk7XG4gIH1cbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgaW5kZXguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGg9TUFYX1NBRkVfSU5URUdFUl0gVGhlIHVwcGVyIGJvdW5kcyBvZiBhIHZhbGlkIGluZGV4LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBpbmRleCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0luZGV4KHZhbHVlLCBsZW5ndGgpIHtcbiAgbGVuZ3RoID0gbGVuZ3RoID09IG51bGwgPyBNQVhfU0FGRV9JTlRFR0VSIDogbGVuZ3RoO1xuICByZXR1cm4gISFsZW5ndGggJiZcbiAgICAodHlwZW9mIHZhbHVlID09ICdudW1iZXInIHx8IHJlSXNVaW50LnRlc3QodmFsdWUpKSAmJlxuICAgICh2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDwgbGVuZ3RoKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgdGhlIGdpdmVuIGFyZ3VtZW50cyBhcmUgZnJvbSBhbiBpdGVyYXRlZSBjYWxsLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgdmFsdWUgYXJndW1lbnQuXG4gKiBAcGFyYW0geyp9IGluZGV4IFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgaW5kZXggb3Iga2V5IGFyZ3VtZW50LlxuICogQHBhcmFtIHsqfSBvYmplY3QgVGhlIHBvdGVudGlhbCBpdGVyYXRlZSBvYmplY3QgYXJndW1lbnQuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGFyZ3VtZW50cyBhcmUgZnJvbSBhbiBpdGVyYXRlZSBjYWxsLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJdGVyYXRlZUNhbGwodmFsdWUsIGluZGV4LCBvYmplY3QpIHtcbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciB0eXBlID0gdHlwZW9mIGluZGV4O1xuICBpZiAodHlwZSA9PSAnbnVtYmVyJ1xuICAgICAgICA/IChpc0FycmF5TGlrZShvYmplY3QpICYmIGlzSW5kZXgoaW5kZXgsIG9iamVjdC5sZW5ndGgpKVxuICAgICAgICA6ICh0eXBlID09ICdzdHJpbmcnICYmIGluZGV4IGluIG9iamVjdClcbiAgICAgICkge1xuICAgIHJldHVybiBlcShvYmplY3RbaW5kZXhdLCB2YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlIGZvciB1c2UgYXMgdW5pcXVlIG9iamVjdCBrZXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNLZXlhYmxlKHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gKHR5cGUgPT0gJ3N0cmluZycgfHwgdHlwZSA9PSAnbnVtYmVyJyB8fCB0eXBlID09ICdzeW1ib2wnIHx8IHR5cGUgPT0gJ2Jvb2xlYW4nKVxuICAgID8gKHZhbHVlICE9PSAnX19wcm90b19fJylcbiAgICA6ICh2YWx1ZSA9PT0gbnVsbCk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBmdW5jYCBoYXMgaXRzIHNvdXJjZSBtYXNrZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBmdW5jYCBpcyBtYXNrZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNNYXNrZWQoZnVuYykge1xuICByZXR1cm4gISFtYXNrU3JjS2V5ICYmIChtYXNrU3JjS2V5IGluIGZ1bmMpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhIHByb3RvdHlwZSBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwcm90b3R5cGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNQcm90b3R5cGUodmFsdWUpIHtcbiAgdmFyIEN0b3IgPSB2YWx1ZSAmJiB2YWx1ZS5jb25zdHJ1Y3RvcixcbiAgICAgIHByb3RvID0gKHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3Rvci5wcm90b3R5cGUpIHx8IG9iamVjdFByb3RvO1xuXG4gIHJldHVybiB2YWx1ZSA9PT0gcHJvdG87XG59XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBpcyBsaWtlXG4gKiBbYE9iamVjdC5rZXlzYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LmtleXMpXG4gKiBleGNlcHQgdGhhdCBpdCBpbmNsdWRlcyBpbmhlcml0ZWQgZW51bWVyYWJsZSBwcm9wZXJ0aWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBuYXRpdmVLZXlzSW4ob2JqZWN0KSB7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgaWYgKG9iamVjdCAhPSBudWxsKSB7XG4gICAgZm9yICh2YXIga2V5IGluIE9iamVjdChvYmplY3QpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGBmdW5jYCB0byBpdHMgc291cmNlIGNvZGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzb3VyY2UgY29kZS5cbiAqL1xuZnVuY3Rpb24gdG9Tb3VyY2UoZnVuYykge1xuICBpZiAoZnVuYyAhPSBudWxsKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBmdW5jVG9TdHJpbmcuY2FsbChmdW5jKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gKGZ1bmMgKyAnJyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuICByZXR1cm4gJyc7XG59XG5cbi8qKlxuICogUGVyZm9ybXMgYVxuICogW2BTYW1lVmFsdWVaZXJvYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtc2FtZXZhbHVlemVybylcbiAqIGNvbXBhcmlzb24gYmV0d2VlbiB0d28gdmFsdWVzIHRvIGRldGVybWluZSBpZiB0aGV5IGFyZSBlcXVpdmFsZW50LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSB9O1xuICogdmFyIG90aGVyID0geyAnYSc6IDEgfTtcbiAqXG4gKiBfLmVxKG9iamVjdCwgb2JqZWN0KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKG9iamVjdCwgb3RoZXIpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKCdhJywgJ2EnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKCdhJywgT2JqZWN0KCdhJykpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKE5hTiwgTmFOKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gZXEodmFsdWUsIG90aGVyKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gb3RoZXIgfHwgKHZhbHVlICE9PSB2YWx1ZSAmJiBvdGhlciAhPT0gb3RoZXIpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhbiBgYXJndW1lbnRzYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYGFyZ3VtZW50c2Agb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FyZ3VtZW50cyh2YWx1ZSkge1xuICAvLyBTYWZhcmkgOC4xIG1ha2VzIGBhcmd1bWVudHMuY2FsbGVlYCBlbnVtZXJhYmxlIGluIHN0cmljdCBtb2RlLlxuICByZXR1cm4gaXNBcnJheUxpa2VPYmplY3QodmFsdWUpICYmIGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsICdjYWxsZWUnKSAmJlxuICAgICghcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpIHx8IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IGFyZ3NUYWcpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYW4gYEFycmF5YCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXksIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLiBBIHZhbHVlIGlzIGNvbnNpZGVyZWQgYXJyYXktbGlrZSBpZiBpdCdzXG4gKiBub3QgYSBmdW5jdGlvbiBhbmQgaGFzIGEgYHZhbHVlLmxlbmd0aGAgdGhhdCdzIGFuIGludGVnZXIgZ3JlYXRlciB0aGFuIG9yXG4gKiBlcXVhbCB0byBgMGAgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byBgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZSgnYWJjJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhaXNGdW5jdGlvbih2YWx1ZSk7XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5pc0FycmF5TGlrZWAgZXhjZXB0IHRoYXQgaXQgYWxzbyBjaGVja3MgaWYgYHZhbHVlYFxuICogaXMgYW4gb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LWxpa2Ugb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGlzQXJyYXlMaWtlKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIGJ1ZmZlci5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMy4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGJ1ZmZlciwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQnVmZmVyKG5ldyBCdWZmZXIoMikpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNCdWZmZXIobmV3IFVpbnQ4QXJyYXkoMikpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQnVmZmVyID0gbmF0aXZlSXNCdWZmZXIgfHwgc3R1YkZhbHNlO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNGdW5jdGlvbihfKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oL2FiYy8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICAvLyBUaGUgdXNlIG9mIGBPYmplY3QjdG9TdHJpbmdgIGF2b2lkcyBpc3N1ZXMgd2l0aCB0aGUgYHR5cGVvZmAgb3BlcmF0b3JcbiAgLy8gaW4gU2FmYXJpIDgtOSB3aGljaCByZXR1cm5zICdvYmplY3QnIGZvciB0eXBlZCBhcnJheSBhbmQgb3RoZXIgY29uc3RydWN0b3JzLlxuICB2YXIgdGFnID0gaXNPYmplY3QodmFsdWUpID8gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgOiAnJztcbiAgcmV0dXJuIHRhZyA9PSBmdW5jVGFnIHx8IHRhZyA9PSBnZW5UYWc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgaXMgbG9vc2VseSBiYXNlZCBvblxuICogW2BUb0xlbmd0aGBdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXRvbGVuZ3RoKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTGVuZ3RoKDMpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNMZW5ndGgoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoSW5maW5pdHkpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKCczJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmXG4gICAgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBwbGFpbiBvYmplY3QsIHRoYXQgaXMsIGFuIG9iamVjdCBjcmVhdGVkIGJ5IHRoZVxuICogYE9iamVjdGAgY29uc3RydWN0b3Igb3Igb25lIHdpdGggYSBgW1tQcm90b3R5cGVdXWAgb2YgYG51bGxgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC44LjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcGxhaW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqIH1cbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QobmV3IEZvbyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoeyAneCc6IDAsICd5JzogMCB9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoT2JqZWN0LmNyZWF0ZShudWxsKSk7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3QodmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdExpa2UodmFsdWUpIHx8XG4gICAgICBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSAhPSBvYmplY3RUYWcgfHwgaXNIb3N0T2JqZWN0KHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgcHJvdG8gPSBnZXRQcm90b3R5cGUodmFsdWUpO1xuICBpZiAocHJvdG8gPT09IG51bGwpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICB2YXIgQ3RvciA9IGhhc093blByb3BlcnR5LmNhbGwocHJvdG8sICdjb25zdHJ1Y3RvcicpICYmIHByb3RvLmNvbnN0cnVjdG9yO1xuICByZXR1cm4gKHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiZcbiAgICBDdG9yIGluc3RhbmNlb2YgQ3RvciAmJiBmdW5jVG9TdHJpbmcuY2FsbChDdG9yKSA9PSBvYmplY3RDdG9yU3RyaW5nKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgdHlwZWQgYXJyYXkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB0eXBlZCBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShuZXcgVWludDhBcnJheSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1R5cGVkQXJyYXkoW10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzVHlwZWRBcnJheSA9IG5vZGVJc1R5cGVkQXJyYXkgPyBiYXNlVW5hcnkobm9kZUlzVHlwZWRBcnJheSkgOiBiYXNlSXNUeXBlZEFycmF5O1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBwbGFpbiBvYmplY3QgZmxhdHRlbmluZyBpbmhlcml0ZWQgZW51bWVyYWJsZSBzdHJpbmdcbiAqIGtleWVkIHByb3BlcnRpZXMgb2YgYHZhbHVlYCB0byBvd24gcHJvcGVydGllcyBvZiB0aGUgcGxhaW4gb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY29udmVydGVkIHBsYWluIG9iamVjdC5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5hc3NpZ24oeyAnYSc6IDEgfSwgbmV3IEZvbyk7XG4gKiAvLyA9PiB7ICdhJzogMSwgJ2InOiAyIH1cbiAqXG4gKiBfLmFzc2lnbih7ICdhJzogMSB9LCBfLnRvUGxhaW5PYmplY3QobmV3IEZvbykpO1xuICogLy8gPT4geyAnYSc6IDEsICdiJzogMiwgJ2MnOiAzIH1cbiAqL1xuZnVuY3Rpb24gdG9QbGFpbk9iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gY29weU9iamVjdCh2YWx1ZSwga2V5c0luKHZhbHVlKSk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuIFNlZSB0aGVcbiAqIFtFUyBzcGVjXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3Qua2V5cylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHN0YXRpY1xuICogQHNpbmNlIDAuMS4wXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzKG5ldyBGb28pO1xuICogLy8gPT4gWydhJywgJ2InXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICpcbiAqIF8ua2V5cygnaGknKTtcbiAqIC8vID0+IFsnMCcsICcxJ11cbiAqL1xuZnVuY3Rpb24ga2V5cyhvYmplY3QpIHtcbiAgcmV0dXJuIGlzQXJyYXlMaWtlKG9iamVjdCkgPyBhcnJheUxpa2VLZXlzKG9iamVjdCkgOiBiYXNlS2V5cyhvYmplY3QpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBhbmQgaW5oZXJpdGVkIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5rZXlzSW4obmV3IEZvbyk7XG4gKiAvLyA9PiBbJ2EnLCAnYicsICdjJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqL1xuZnVuY3Rpb24ga2V5c0luKG9iamVjdCkge1xuICByZXR1cm4gaXNBcnJheUxpa2Uob2JqZWN0KSA/IGFycmF5TGlrZUtleXMob2JqZWN0LCB0cnVlKSA6IGJhc2VLZXlzSW4ob2JqZWN0KTtcbn1cblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLmFzc2lnbmAgZXhjZXB0IHRoYXQgaXQgcmVjdXJzaXZlbHkgbWVyZ2VzIG93biBhbmRcbiAqIGluaGVyaXRlZCBlbnVtZXJhYmxlIHN0cmluZyBrZXllZCBwcm9wZXJ0aWVzIG9mIHNvdXJjZSBvYmplY3RzIGludG8gdGhlXG4gKiBkZXN0aW5hdGlvbiBvYmplY3QuIFNvdXJjZSBwcm9wZXJ0aWVzIHRoYXQgcmVzb2x2ZSB0byBgdW5kZWZpbmVkYCBhcmVcbiAqIHNraXBwZWQgaWYgYSBkZXN0aW5hdGlvbiB2YWx1ZSBleGlzdHMuIEFycmF5IGFuZCBwbGFpbiBvYmplY3QgcHJvcGVydGllc1xuICogYXJlIG1lcmdlZCByZWN1cnNpdmVseS4gT3RoZXIgb2JqZWN0cyBhbmQgdmFsdWUgdHlwZXMgYXJlIG92ZXJyaWRkZW4gYnlcbiAqIGFzc2lnbm1lbnQuIFNvdXJjZSBvYmplY3RzIGFyZSBhcHBsaWVkIGZyb20gbGVmdCB0byByaWdodC4gU3Vic2VxdWVudFxuICogc291cmNlcyBvdmVyd3JpdGUgcHJvcGVydHkgYXNzaWdubWVudHMgb2YgcHJldmlvdXMgc291cmNlcy5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgbXV0YXRlcyBgb2JqZWN0YC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuNS4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0gey4uLk9iamVjdH0gW3NvdXJjZXNdIFRoZSBzb3VyY2Ugb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7XG4gKiAgICdhJzogW3sgJ2InOiAyIH0sIHsgJ2QnOiA0IH1dXG4gKiB9O1xuICpcbiAqIHZhciBvdGhlciA9IHtcbiAqICAgJ2EnOiBbeyAnYyc6IDMgfSwgeyAnZSc6IDUgfV1cbiAqIH07XG4gKlxuICogXy5tZXJnZShvYmplY3QsIG90aGVyKTtcbiAqIC8vID0+IHsgJ2EnOiBbeyAnYic6IDIsICdjJzogMyB9LCB7ICdkJzogNCwgJ2UnOiA1IH1dIH1cbiAqL1xudmFyIG1lcmdlID0gY3JlYXRlQXNzaWduZXIoZnVuY3Rpb24ob2JqZWN0LCBzb3VyY2UsIHNyY0luZGV4KSB7XG4gIGJhc2VNZXJnZShvYmplY3QsIHNvdXJjZSwgc3JjSW5kZXgpO1xufSk7XG5cbi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyBhIG5ldyBlbXB0eSBhcnJheS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMTMuMFxuICogQGNhdGVnb3J5IFV0aWxcbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGVtcHR5IGFycmF5LlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgYXJyYXlzID0gXy50aW1lcygyLCBfLnN0dWJBcnJheSk7XG4gKlxuICogY29uc29sZS5sb2coYXJyYXlzKTtcbiAqIC8vID0+IFtbXSwgW11dXG4gKlxuICogY29uc29sZS5sb2coYXJyYXlzWzBdID09PSBhcnJheXNbMV0pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gc3R1YkFycmF5KCkge1xuICByZXR1cm4gW107XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyBgZmFsc2VgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4xMy4wXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50aW1lcygyLCBfLnN0dWJGYWxzZSk7XG4gKiAvLyA9PiBbZmFsc2UsIGZhbHNlXVxuICovXG5mdW5jdGlvbiBzdHViRmFsc2UoKSB7XG4gIHJldHVybiBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtZXJnZTtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbTV2WkdWZmJXOWtkV3hsY3k5c2IyUmhjMmd1YldWeVoyVXZhVzVrWlhndWFuTWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqdEJRVUZCTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVNJc0ltWnBiR1VpT2lKblpXNWxjbUYwWldRdWFuTWlMQ0p6YjNWeVkyVlNiMjkwSWpvaUlpd2ljMjkxY21ObGMwTnZiblJsYm5RaU9sc2lMeW9xWEc0Z0tpQnNiMlJoYzJnZ0tFTjFjM1J2YlNCQ2RXbHNaQ2tnUEdoMGRIQnpPaTh2Ykc5a1lYTm9MbU52YlM4K1hHNGdLaUJDZFdsc1pEb2dZR3h2WkdGemFDQnRiMlIxYkdGeWFYcGxJR1Y0Y0c5eWRITTlYQ0p1Y0cxY0lpQXRieUF1TDJCY2JpQXFJRU52Y0hseWFXZG9kQ0JxVVhWbGNua2dSbTkxYm1SaGRHbHZiaUJoYm1RZ2IzUm9aWElnWTI5dWRISnBZblYwYjNKeklEeG9kSFJ3Y3pvdkwycHhkV1Z5ZVM1dmNtY3ZQbHh1SUNvZ1VtVnNaV0Z6WldRZ2RXNWtaWElnVFVsVUlHeHBZMlZ1YzJVZ1BHaDBkSEJ6T2k4dmJHOWtZWE5vTG1OdmJTOXNhV05sYm5ObFBseHVJQ29nUW1GelpXUWdiMjRnVlc1a1pYSnpZMjl5WlM1cWN5QXhMamd1TXlBOGFIUjBjRG92TDNWdVpHVnljMk52Y21WcWN5NXZjbWN2VEVsRFJVNVRSVDVjYmlBcUlFTnZjSGx5YVdkb2RDQktaWEpsYlhrZ1FYTm9hMlZ1WVhNc0lFUnZZM1Z0Wlc1MFEyeHZkV1FnWVc1a0lFbHVkbVZ6ZEdsbllYUnBkbVVnVW1Wd2IzSjBaWEp6SUNZZ1JXUnBkRzl5YzF4dUlDb3ZYRzVjYmk4cUtpQlZjMlZrSUdGeklIUm9aU0J6YVhwbElIUnZJR1Z1WVdKc1pTQnNZWEpuWlNCaGNuSmhlU0J2Y0hScGJXbDZZWFJwYjI1ekxpQXFMMXh1ZG1GeUlFeEJVa2RGWDBGU1VrRlpYMU5KV2tVZ1BTQXlNREE3WEc1Y2JpOHFLaUJWYzJWa0lIUnZJSE4wWVc1a0xXbHVJR1p2Y2lCZ2RXNWtaV1pwYm1Wa1lDQm9ZWE5vSUhaaGJIVmxjeTRnS2k5Y2JuWmhjaUJJUVZOSVgxVk9SRVZHU1U1RlJDQTlJQ2RmWDJ4dlpHRnphRjlvWVhOb1gzVnVaR1ZtYVc1bFpGOWZKenRjYmx4dUx5b3FJRlZ6WldRZ1lYTWdjbVZtWlhKbGJtTmxjeUJtYjNJZ2RtRnlhVzkxY3lCZ1RuVnRZbVZ5WUNCamIyNXpkR0Z1ZEhNdUlDb3ZYRzUyWVhJZ1RVRllYMU5CUmtWZlNVNVVSVWRGVWlBOUlEa3dNRGN4T1RreU5UUTNOREE1T1RFN1hHNWNiaThxS2lCZ1QySnFaV04wSTNSdlUzUnlhVzVuWUNCeVpYTjFiSFFnY21WbVpYSmxibU5sY3k0Z0tpOWNiblpoY2lCaGNtZHpWR0ZuSUQwZ0oxdHZZbXBsWTNRZ1FYSm5kVzFsYm5SelhTY3NYRzRnSUNBZ1lYSnlZWGxVWVdjZ1BTQW5XMjlpYW1WamRDQkJjbkpoZVYwbkxGeHVJQ0FnSUdKdmIyeFVZV2NnUFNBblcyOWlhbVZqZENCQ2IyOXNaV0Z1WFNjc1hHNGdJQ0FnWkdGMFpWUmhaeUE5SUNkYmIySnFaV04wSUVSaGRHVmRKeXhjYmlBZ0lDQmxjbkp2Y2xSaFp5QTlJQ2RiYjJKcVpXTjBJRVZ5Y205eVhTY3NYRzRnSUNBZ1puVnVZMVJoWnlBOUlDZGJiMkpxWldOMElFWjFibU4wYVc5dVhTY3NYRzRnSUNBZ1oyVnVWR0ZuSUQwZ0oxdHZZbXBsWTNRZ1IyVnVaWEpoZEc5eVJuVnVZM1JwYjI1ZEp5eGNiaUFnSUNCdFlYQlVZV2NnUFNBblcyOWlhbVZqZENCTllYQmRKeXhjYmlBZ0lDQnVkVzFpWlhKVVlXY2dQU0FuVzI5aWFtVmpkQ0JPZFcxaVpYSmRKeXhjYmlBZ0lDQnZZbXBsWTNSVVlXY2dQU0FuVzI5aWFtVmpkQ0JQWW1wbFkzUmRKeXhjYmlBZ0lDQndjbTl0YVhObFZHRm5JRDBnSjF0dlltcGxZM1FnVUhKdmJXbHpaVjBuTEZ4dUlDQWdJSEpsWjJWNGNGUmhaeUE5SUNkYmIySnFaV04wSUZKbFowVjRjRjBuTEZ4dUlDQWdJSE5sZEZSaFp5QTlJQ2RiYjJKcVpXTjBJRk5sZEYwbkxGeHVJQ0FnSUhOMGNtbHVaMVJoWnlBOUlDZGJiMkpxWldOMElGTjBjbWx1WjEwbkxGeHVJQ0FnSUhONWJXSnZiRlJoWnlBOUlDZGJiMkpxWldOMElGTjViV0p2YkYwbkxGeHVJQ0FnSUhkbFlXdE5ZWEJVWVdjZ1BTQW5XMjlpYW1WamRDQlhaV0ZyVFdGd1hTYzdYRzVjYm5aaGNpQmhjbkpoZVVKMVptWmxjbFJoWnlBOUlDZGJiMkpxWldOMElFRnljbUY1UW5WbVptVnlYU2NzWEc0Z0lDQWdaR0YwWVZacFpYZFVZV2NnUFNBblcyOWlhbVZqZENCRVlYUmhWbWxsZDEwbkxGeHVJQ0FnSUdac2IyRjBNekpVWVdjZ1BTQW5XMjlpYW1WamRDQkdiRzloZERNeVFYSnlZWGxkSnl4Y2JpQWdJQ0JtYkc5aGREWTBWR0ZuSUQwZ0oxdHZZbXBsWTNRZ1JteHZZWFEyTkVGeWNtRjVYU2NzWEc0Z0lDQWdhVzUwT0ZSaFp5QTlJQ2RiYjJKcVpXTjBJRWx1ZERoQmNuSmhlVjBuTEZ4dUlDQWdJR2x1ZERFMlZHRm5JRDBnSjF0dlltcGxZM1FnU1c1ME1UWkJjbkpoZVYwbkxGeHVJQ0FnSUdsdWRETXlWR0ZuSUQwZ0oxdHZZbXBsWTNRZ1NXNTBNekpCY25KaGVWMG5MRnh1SUNBZ0lIVnBiblE0VkdGbklEMGdKMXR2WW1wbFkzUWdWV2x1ZERoQmNuSmhlVjBuTEZ4dUlDQWdJSFZwYm5RNFEyeGhiWEJsWkZSaFp5QTlJQ2RiYjJKcVpXTjBJRlZwYm5RNFEyeGhiWEJsWkVGeWNtRjVYU2NzWEc0Z0lDQWdkV2x1ZERFMlZHRm5JRDBnSjF0dlltcGxZM1FnVldsdWRERTJRWEp5WVhsZEp5eGNiaUFnSUNCMWFXNTBNekpVWVdjZ1BTQW5XMjlpYW1WamRDQlZhVzUwTXpKQmNuSmhlVjBuTzF4dVhHNHZLaXBjYmlBcUlGVnpaV1FnZEc4Z2JXRjBZMmdnWUZKbFowVjRjR0JjYmlBcUlGdHplVzUwWVhnZ1kyaGhjbUZqZEdWeWMxMG9hSFIwY0RvdkwyVmpiV0V0YVc1MFpYSnVZWFJwYjI1aGJDNXZjbWN2WldOdFlTMHlOakl2Tnk0d0x5TnpaV010Y0dGMGRHVnlibk1wTGx4dUlDb3ZYRzUyWVhJZ2NtVlNaV2RGZUhCRGFHRnlJRDBnTDF0Y1hGeGNYaVF1S2lzL0tDbGJYRnhkZTMxOFhTOW5PMXh1WEc0dktpb2dWWE5sWkNCMGJ5QnRZWFJqYUNCZ1VtVm5SWGh3WUNCbWJHRm5jeUJtY205dElIUm9aV2x5SUdOdlpYSmpaV1FnYzNSeWFXNW5JSFpoYkhWbGN5NGdLaTljYm5aaGNpQnlaVVpzWVdkeklEMGdMMXhjZHlva0x6dGNibHh1THlvcUlGVnpaV1FnZEc4Z1pHVjBaV04wSUdodmMzUWdZMjl1YzNSeWRXTjBiM0p6SUNoVFlXWmhjbWtwTGlBcUwxeHVkbUZ5SUhKbFNYTkliM04wUTNSdmNpQTlJQzllWEZ4YmIySnFaV04wSUM0clAwTnZibk4wY25WamRHOXlYRnhkSkM4N1hHNWNiaThxS2lCVmMyVmtJSFJ2SUdSbGRHVmpkQ0IxYm5OcFoyNWxaQ0JwYm5SbFoyVnlJSFpoYkhWbGN5NGdLaTljYm5aaGNpQnlaVWx6VldsdWRDQTlJQzllS0Q4Nk1IeGJNUzA1WFZ4Y1pDb3BKQzg3WEc1Y2JpOHFLaUJWYzJWa0lIUnZJR2xrWlc1MGFXWjVJR0IwYjFOMGNtbHVaMVJoWjJBZ2RtRnNkV1Z6SUc5bUlIUjVjR1ZrSUdGeWNtRjVjeTRnS2k5Y2JuWmhjaUIwZVhCbFpFRnljbUY1VkdGbmN5QTlJSHQ5TzF4dWRIbHdaV1JCY25KaGVWUmhaM05iWm14dllYUXpNbFJoWjEwZ1BTQjBlWEJsWkVGeWNtRjVWR0ZuYzF0bWJHOWhkRFkwVkdGblhTQTlYRzUwZVhCbFpFRnljbUY1VkdGbmMxdHBiblE0VkdGblhTQTlJSFI1Y0dWa1FYSnlZWGxVWVdkelcybHVkREUyVkdGblhTQTlYRzUwZVhCbFpFRnljbUY1VkdGbmMxdHBiblF6TWxSaFoxMGdQU0IwZVhCbFpFRnljbUY1VkdGbmMxdDFhVzUwT0ZSaFoxMGdQVnh1ZEhsd1pXUkJjbkpoZVZSaFozTmJkV2x1ZERoRGJHRnRjR1ZrVkdGblhTQTlJSFI1Y0dWa1FYSnlZWGxVWVdkelczVnBiblF4TmxSaFoxMGdQVnh1ZEhsd1pXUkJjbkpoZVZSaFozTmJkV2x1ZERNeVZHRm5YU0E5SUhSeWRXVTdYRzUwZVhCbFpFRnljbUY1VkdGbmMxdGhjbWR6VkdGblhTQTlJSFI1Y0dWa1FYSnlZWGxVWVdkelcyRnljbUY1VkdGblhTQTlYRzUwZVhCbFpFRnljbUY1VkdGbmMxdGhjbkpoZVVKMVptWmxjbFJoWjEwZ1BTQjBlWEJsWkVGeWNtRjVWR0ZuYzF0aWIyOXNWR0ZuWFNBOVhHNTBlWEJsWkVGeWNtRjVWR0ZuYzF0a1lYUmhWbWxsZDFSaFoxMGdQU0IwZVhCbFpFRnljbUY1VkdGbmMxdGtZWFJsVkdGblhTQTlYRzUwZVhCbFpFRnljbUY1VkdGbmMxdGxjbkp2Y2xSaFoxMGdQU0IwZVhCbFpFRnljbUY1VkdGbmMxdG1kVzVqVkdGblhTQTlYRzUwZVhCbFpFRnljbUY1VkdGbmMxdHRZWEJVWVdkZElEMGdkSGx3WldSQmNuSmhlVlJoWjNOYmJuVnRZbVZ5VkdGblhTQTlYRzUwZVhCbFpFRnljbUY1VkdGbmMxdHZZbXBsWTNSVVlXZGRJRDBnZEhsd1pXUkJjbkpoZVZSaFozTmJjbVZuWlhod1ZHRm5YU0E5WEc1MGVYQmxaRUZ5Y21GNVZHRm5jMXR6WlhSVVlXZGRJRDBnZEhsd1pXUkJjbkpoZVZSaFozTmJjM1J5YVc1blZHRm5YU0E5WEc1MGVYQmxaRUZ5Y21GNVZHRm5jMXQzWldGclRXRndWR0ZuWFNBOUlHWmhiSE5sTzF4dVhHNHZLaW9nVlhObFpDQjBieUJwWkdWdWRHbG1lU0JnZEc5VGRISnBibWRVWVdkZ0lIWmhiSFZsY3lCemRYQndiM0owWldRZ1lua2dZRjh1WTJ4dmJtVmdMaUFxTDF4dWRtRnlJR05zYjI1bFlXSnNaVlJoWjNNZ1BTQjdmVHRjYm1Oc2IyNWxZV0pzWlZSaFozTmJZWEpuYzFSaFoxMGdQU0JqYkc5dVpXRmliR1ZVWVdkelcyRnljbUY1VkdGblhTQTlYRzVqYkc5dVpXRmliR1ZVWVdkelcyRnljbUY1UW5WbVptVnlWR0ZuWFNBOUlHTnNiMjVsWVdKc1pWUmhaM05iWkdGMFlWWnBaWGRVWVdkZElEMWNibU5zYjI1bFlXSnNaVlJoWjNOYlltOXZiRlJoWjEwZ1BTQmpiRzl1WldGaWJHVlVZV2R6VzJSaGRHVlVZV2RkSUQxY2JtTnNiMjVsWVdKc1pWUmhaM05iWm14dllYUXpNbFJoWjEwZ1BTQmpiRzl1WldGaWJHVlVZV2R6VzJac2IyRjBOalJVWVdkZElEMWNibU5zYjI1bFlXSnNaVlJoWjNOYmFXNTBPRlJoWjEwZ1BTQmpiRzl1WldGaWJHVlVZV2R6VzJsdWRERTJWR0ZuWFNBOVhHNWpiRzl1WldGaWJHVlVZV2R6VzJsdWRETXlWR0ZuWFNBOUlHTnNiMjVsWVdKc1pWUmhaM05iYldGd1ZHRm5YU0E5WEc1amJHOXVaV0ZpYkdWVVlXZHpXMjUxYldKbGNsUmhaMTBnUFNCamJHOXVaV0ZpYkdWVVlXZHpXMjlpYW1WamRGUmhaMTBnUFZ4dVkyeHZibVZoWW14bFZHRm5jMXR5WldkbGVIQlVZV2RkSUQwZ1kyeHZibVZoWW14bFZHRm5jMXR6WlhSVVlXZGRJRDFjYm1Oc2IyNWxZV0pzWlZSaFozTmJjM1J5YVc1blZHRm5YU0E5SUdOc2IyNWxZV0pzWlZSaFozTmJjM2x0WW05c1ZHRm5YU0E5WEc1amJHOXVaV0ZpYkdWVVlXZHpXM1ZwYm5RNFZHRm5YU0E5SUdOc2IyNWxZV0pzWlZSaFozTmJkV2x1ZERoRGJHRnRjR1ZrVkdGblhTQTlYRzVqYkc5dVpXRmliR1ZVWVdkelczVnBiblF4TmxSaFoxMGdQU0JqYkc5dVpXRmliR1ZVWVdkelczVnBiblF6TWxSaFoxMGdQU0IwY25WbE8xeHVZMnh2Ym1WaFlteGxWR0ZuYzF0bGNuSnZjbFJoWjEwZ1BTQmpiRzl1WldGaWJHVlVZV2R6VzJaMWJtTlVZV2RkSUQxY2JtTnNiMjVsWVdKc1pWUmhaM05iZDJWaGEwMWhjRlJoWjEwZ1BTQm1ZV3h6WlR0Y2JseHVMeW9xSUVSbGRHVmpkQ0JtY21WbElIWmhjbWxoWW14bElHQm5iRzlpWVd4Z0lHWnliMjBnVG05a1pTNXFjeTRnS2k5Y2JuWmhjaUJtY21WbFIyeHZZbUZzSUQwZ2RIbHdaVzltSUdkc2IySmhiQ0E5UFNBbmIySnFaV04wSnlBbUppQm5iRzlpWVd3Z0ppWWdaMnh2WW1Gc0xrOWlhbVZqZENBOVBUMGdUMkpxWldOMElDWW1JR2RzYjJKaGJEdGNibHh1THlvcUlFUmxkR1ZqZENCbWNtVmxJSFpoY21saFlteGxJR0J6Wld4bVlDNGdLaTljYm5aaGNpQm1jbVZsVTJWc1ppQTlJSFI1Y0dWdlppQnpaV3htSUQwOUlDZHZZbXBsWTNRbklDWW1JSE5sYkdZZ0ppWWdjMlZzWmk1UFltcGxZM1FnUFQwOUlFOWlhbVZqZENBbUppQnpaV3htTzF4dVhHNHZLaW9nVlhObFpDQmhjeUJoSUhKbFptVnlaVzVqWlNCMGJ5QjBhR1VnWjJ4dlltRnNJRzlpYW1WamRDNGdLaTljYm5aaGNpQnliMjkwSUQwZ1puSmxaVWRzYjJKaGJDQjhmQ0JtY21WbFUyVnNaaUI4ZkNCR2RXNWpkR2x2YmlnbmNtVjBkWEp1SUhSb2FYTW5LU2dwTzF4dVhHNHZLaW9nUkdWMFpXTjBJR1p5WldVZ2RtRnlhV0ZpYkdVZ1lHVjRjRzl5ZEhOZ0xpQXFMMXh1ZG1GeUlHWnlaV1ZGZUhCdmNuUnpJRDBnZEhsd1pXOW1JR1Y0Y0c5eWRITWdQVDBnSjI5aWFtVmpkQ2NnSmlZZ1pYaHdiM0owY3lBbUppQWhaWGh3YjNKMGN5NXViMlJsVkhsd1pTQW1KaUJsZUhCdmNuUnpPMXh1WEc0dktpb2dSR1YwWldOMElHWnlaV1VnZG1GeWFXRmliR1VnWUcxdlpIVnNaV0F1SUNvdlhHNTJZWElnWm5KbFpVMXZaSFZzWlNBOUlHWnlaV1ZGZUhCdmNuUnpJQ1ltSUhSNWNHVnZaaUJ0YjJSMWJHVWdQVDBnSjI5aWFtVmpkQ2NnSmlZZ2JXOWtkV3hsSUNZbUlDRnRiMlIxYkdVdWJtOWtaVlI1Y0dVZ0ppWWdiVzlrZFd4bE8xeHVYRzR2S2lvZ1JHVjBaV04wSUhSb1pTQndiM0IxYkdGeUlFTnZiVzF2YmtwVElHVjRkR1Z1YzJsdmJpQmdiVzlrZFd4bExtVjRjRzl5ZEhOZ0xpQXFMMXh1ZG1GeUlHMXZaSFZzWlVWNGNHOXlkSE1nUFNCbWNtVmxUVzlrZFd4bElDWW1JR1p5WldWTmIyUjFiR1V1Wlhod2IzSjBjeUE5UFQwZ1puSmxaVVY0Y0c5eWRITTdYRzVjYmk4cUtpQkVaWFJsWTNRZ1puSmxaU0IyWVhKcFlXSnNaU0JnY0hKdlkyVnpjMkFnWm5KdmJTQk9iMlJsTG1wekxpQXFMMXh1ZG1GeUlHWnlaV1ZRY205alpYTnpJRDBnYlc5a2RXeGxSWGh3YjNKMGN5QW1KaUJtY21WbFIyeHZZbUZzTG5CeWIyTmxjM003WEc1Y2JpOHFLaUJWYzJWa0lIUnZJR0ZqWTJWemN5Qm1ZWE4wWlhJZ1RtOWtaUzVxY3lCb1pXeHdaWEp6TGlBcUwxeHVkbUZ5SUc1dlpHVlZkR2xzSUQwZ0tHWjFibU4wYVc5dUtDa2dlMXh1SUNCMGNua2dlMXh1SUNBZ0lISmxkSFZ5YmlCbWNtVmxVSEp2WTJWemN5QW1KaUJtY21WbFVISnZZMlZ6Y3k1aWFXNWthVzVuS0NkMWRHbHNKeWs3WEc0Z0lIMGdZMkYwWTJnZ0tHVXBJSHQ5WEc1OUtDa3BPMXh1WEc0dktpQk9iMlJsTG1weklHaGxiSEJsY2lCeVpXWmxjbVZ1WTJWekxpQXFMMXh1ZG1GeUlHNXZaR1ZKYzFSNWNHVmtRWEp5WVhrZ1BTQnViMlJsVlhScGJDQW1KaUJ1YjJSbFZYUnBiQzVwYzFSNWNHVmtRWEp5WVhrN1hHNWNiaThxS2x4dUlDb2dRV1JrY3lCMGFHVWdhMlY1TFhaaGJIVmxJR0J3WVdseVlDQjBieUJnYldGd1lDNWNiaUFxWEc0Z0tpQkFjSEpwZG1GMFpWeHVJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJRzFoY0NCVWFHVWdiV0Z3SUhSdklHMXZaR2xtZVM1Y2JpQXFJRUJ3WVhKaGJTQjdRWEp5WVhsOUlIQmhhWElnVkdobElHdGxlUzEyWVd4MVpTQndZV2x5SUhSdklHRmtaQzVjYmlBcUlFQnlaWFIxY201eklIdFBZbXBsWTNSOUlGSmxkSFZ5Ym5NZ1lHMWhjR0F1WEc0Z0tpOWNibVoxYm1OMGFXOXVJR0ZrWkUxaGNFVnVkSEo1S0cxaGNDd2djR0ZwY2lrZ2UxeHVJQ0F2THlCRWIyNG5kQ0J5WlhSMWNtNGdZRzFoY0M1elpYUmdJR0psWTJGMWMyVWdhWFFuY3lCdWIzUWdZMmhoYVc1aFlteGxJR2x1SUVsRklERXhMbHh1SUNCdFlYQXVjMlYwS0hCaGFYSmJNRjBzSUhCaGFYSmJNVjBwTzF4dUlDQnlaWFIxY200Z2JXRndPMXh1ZlZ4dVhHNHZLaXBjYmlBcUlFRmtaSE1nWUhaaGJIVmxZQ0IwYnlCZ2MyVjBZQzVjYmlBcVhHNGdLaUJBY0hKcGRtRjBaVnh1SUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I5SUhObGRDQlVhR1VnYzJWMElIUnZJRzF2WkdsbWVTNWNiaUFxSUVCd1lYSmhiU0I3S24wZ2RtRnNkV1VnVkdobElIWmhiSFZsSUhSdklHRmtaQzVjYmlBcUlFQnlaWFIxY201eklIdFBZbXBsWTNSOUlGSmxkSFZ5Ym5NZ1lITmxkR0F1WEc0Z0tpOWNibVoxYm1OMGFXOXVJR0ZrWkZObGRFVnVkSEo1S0hObGRDd2dkbUZzZFdVcElIdGNiaUFnTHk4Z1JHOXVKM1FnY21WMGRYSnVJR0J6WlhRdVlXUmtZQ0JpWldOaGRYTmxJR2wwSjNNZ2JtOTBJR05vWVdsdVlXSnNaU0JwYmlCSlJTQXhNUzVjYmlBZ2MyVjBMbUZrWkNoMllXeDFaU2s3WEc0Z0lISmxkSFZ5YmlCelpYUTdYRzU5WEc1Y2JpOHFLbHh1SUNvZ1FTQm1ZWE4wWlhJZ1lXeDBaWEp1WVhScGRtVWdkRzhnWUVaMWJtTjBhVzl1STJGd2NHeDVZQ3dnZEdocGN5Qm1kVzVqZEdsdmJpQnBiblp2YTJWeklHQm1kVzVqWUZ4dUlDb2dkMmwwYUNCMGFHVWdZSFJvYVhOZ0lHSnBibVJwYm1jZ2IyWWdZSFJvYVhOQmNtZGdJR0Z1WkNCMGFHVWdZWEpuZFcxbGJuUnpJRzltSUdCaGNtZHpZQzVjYmlBcVhHNGdLaUJBY0hKcGRtRjBaVnh1SUNvZ1FIQmhjbUZ0SUh0R2RXNWpkR2x2Ym4wZ1puVnVZeUJVYUdVZ1puVnVZM1JwYjI0Z2RHOGdhVzUyYjJ0bExseHVJQ29nUUhCaGNtRnRJSHNxZlNCMGFHbHpRWEpuSUZSb1pTQmdkR2hwYzJBZ1ltbHVaR2x1WnlCdlppQmdablZ1WTJBdVhHNGdLaUJBY0dGeVlXMGdlMEZ5Y21GNWZTQmhjbWR6SUZSb1pTQmhjbWQxYldWdWRITWdkRzhnYVc1MmIydGxJR0JtZFc1allDQjNhWFJvTGx4dUlDb2dRSEpsZEhWeWJuTWdleXA5SUZKbGRIVnlibk1nZEdobElISmxjM1ZzZENCdlppQmdablZ1WTJBdVhHNGdLaTljYm1aMWJtTjBhVzl1SUdGd2NHeDVLR1oxYm1Nc0lIUm9hWE5CY21jc0lHRnlaM01wSUh0Y2JpQWdjM2RwZEdOb0lDaGhjbWR6TG14bGJtZDBhQ2tnZTF4dUlDQWdJR05oYzJVZ01Eb2djbVYwZFhKdUlHWjFibU11WTJGc2JDaDBhR2x6UVhKbktUdGNiaUFnSUNCallYTmxJREU2SUhKbGRIVnliaUJtZFc1akxtTmhiR3dvZEdocGMwRnlaeXdnWVhKbmMxc3dYU2s3WEc0Z0lDQWdZMkZ6WlNBeU9pQnlaWFIxY200Z1puVnVZeTVqWVd4c0tIUm9hWE5CY21jc0lHRnlaM05iTUYwc0lHRnlaM05iTVYwcE8xeHVJQ0FnSUdOaGMyVWdNem9nY21WMGRYSnVJR1oxYm1NdVkyRnNiQ2gwYUdselFYSm5MQ0JoY21keld6QmRMQ0JoY21keld6RmRMQ0JoY21keld6SmRLVHRjYmlBZ2ZWeHVJQ0J5WlhSMWNtNGdablZ1WXk1aGNIQnNlU2gwYUdselFYSm5MQ0JoY21kektUdGNibjFjYmx4dUx5b3FYRzRnS2lCQklITndaV05wWVd4cGVtVmtJSFpsY25OcGIyNGdiMllnWUY4dVptOXlSV0ZqYUdBZ1ptOXlJR0Z5Y21GNWN5QjNhWFJvYjNWMElITjFjSEJ2Y25RZ1ptOXlYRzRnS2lCcGRHVnlZWFJsWlNCemFHOXlkR2hoYm1SekxseHVJQ3BjYmlBcUlFQndjbWwyWVhSbFhHNGdLaUJBY0dGeVlXMGdlMEZ5Y21GNWZTQmJZWEp5WVhsZElGUm9aU0JoY25KaGVTQjBieUJwZEdWeVlYUmxJRzkyWlhJdVhHNGdLaUJBY0dGeVlXMGdlMFoxYm1OMGFXOXVmU0JwZEdWeVlYUmxaU0JVYUdVZ1puVnVZM1JwYjI0Z2FXNTJiMnRsWkNCd1pYSWdhWFJsY21GMGFXOXVMbHh1SUNvZ1FISmxkSFZ5Ym5NZ2UwRnljbUY1ZlNCU1pYUjFjbTV6SUdCaGNuSmhlV0F1WEc0Z0tpOWNibVoxYm1OMGFXOXVJR0Z5Y21GNVJXRmphQ2hoY25KaGVTd2dhWFJsY21GMFpXVXBJSHRjYmlBZ2RtRnlJR2x1WkdWNElEMGdMVEVzWEc0Z0lDQWdJQ0JzWlc1bmRHZ2dQU0JoY25KaGVTQS9JR0Z5Y21GNUxteGxibWQwYUNBNklEQTdYRzVjYmlBZ2QyaHBiR1VnS0NzcmFXNWtaWGdnUENCc1pXNW5kR2dwSUh0Y2JpQWdJQ0JwWmlBb2FYUmxjbUYwWldVb1lYSnlZWGxiYVc1a1pYaGRMQ0JwYm1SbGVDd2dZWEp5WVhrcElEMDlQU0JtWVd4elpTa2dlMXh1SUNBZ0lDQWdZbkpsWVdzN1hHNGdJQ0FnZlZ4dUlDQjlYRzRnSUhKbGRIVnliaUJoY25KaGVUdGNibjFjYmx4dUx5b3FYRzRnS2lCQmNIQmxibVJ6SUhSb1pTQmxiR1Z0Wlc1MGN5QnZaaUJnZG1Gc2RXVnpZQ0IwYnlCZ1lYSnlZWGxnTGx4dUlDcGNiaUFxSUVCd2NtbDJZWFJsWEc0Z0tpQkFjR0Z5WVcwZ2UwRnljbUY1ZlNCaGNuSmhlU0JVYUdVZ1lYSnlZWGtnZEc4Z2JXOWthV1o1TGx4dUlDb2dRSEJoY21GdElIdEJjbkpoZVgwZ2RtRnNkV1Z6SUZSb1pTQjJZV3gxWlhNZ2RHOGdZWEJ3Wlc1a0xseHVJQ29nUUhKbGRIVnlibk1nZTBGeWNtRjVmU0JTWlhSMWNtNXpJR0JoY25KaGVXQXVYRzRnS2k5Y2JtWjFibU4wYVc5dUlHRnljbUY1VUhWemFDaGhjbkpoZVN3Z2RtRnNkV1Z6S1NCN1hHNGdJSFpoY2lCcGJtUmxlQ0E5SUMweExGeHVJQ0FnSUNBZ2JHVnVaM1JvSUQwZ2RtRnNkV1Z6TG14bGJtZDBhQ3hjYmlBZ0lDQWdJRzltWm5ObGRDQTlJR0Z5Y21GNUxteGxibWQwYUR0Y2JseHVJQ0IzYUdsc1pTQW9LeXRwYm1SbGVDQThJR3hsYm1kMGFDa2dlMXh1SUNBZ0lHRnljbUY1VzI5bVpuTmxkQ0FySUdsdVpHVjRYU0E5SUhaaGJIVmxjMXRwYm1SbGVGMDdYRzRnSUgxY2JpQWdjbVYwZFhKdUlHRnljbUY1TzF4dWZWeHVYRzR2S2lwY2JpQXFJRUVnYzNCbFkybGhiR2w2WldRZ2RtVnljMmx2YmlCdlppQmdYeTV5WldSMVkyVmdJR1p2Y2lCaGNuSmhlWE1nZDJsMGFHOTFkQ0J6ZFhCd2IzSjBJR1p2Y2x4dUlDb2dhWFJsY21GMFpXVWdjMmh2Y25Sb1lXNWtjeTVjYmlBcVhHNGdLaUJBY0hKcGRtRjBaVnh1SUNvZ1FIQmhjbUZ0SUh0QmNuSmhlWDBnVzJGeWNtRjVYU0JVYUdVZ1lYSnlZWGtnZEc4Z2FYUmxjbUYwWlNCdmRtVnlMbHh1SUNvZ1FIQmhjbUZ0SUh0R2RXNWpkR2x2Ym4wZ2FYUmxjbUYwWldVZ1ZHaGxJR1oxYm1OMGFXOXVJR2x1ZG05clpXUWdjR1Z5SUdsMFpYSmhkR2x2Ymk1Y2JpQXFJRUJ3WVhKaGJTQjdLbjBnVzJGalkzVnRkV3hoZEc5eVhTQlVhR1VnYVc1cGRHbGhiQ0IyWVd4MVpTNWNiaUFxSUVCd1lYSmhiU0I3WW05dmJHVmhibjBnVzJsdWFYUkJZMk4xYlYwZ1UzQmxZMmxtZVNCMWMybHVaeUIwYUdVZ1ptbHljM1FnWld4bGJXVnVkQ0J2WmlCZ1lYSnlZWGxnSUdGelhHNGdLaUFnZEdobElHbHVhWFJwWVd3Z2RtRnNkV1V1WEc0Z0tpQkFjbVYwZFhKdWN5QjdLbjBnVW1WMGRYSnVjeUIwYUdVZ1lXTmpkVzExYkdGMFpXUWdkbUZzZFdVdVhHNGdLaTljYm1aMWJtTjBhVzl1SUdGeWNtRjVVbVZrZFdObEtHRnljbUY1TENCcGRHVnlZWFJsWlN3Z1lXTmpkVzExYkdGMGIzSXNJR2x1YVhSQlkyTjFiU2tnZTF4dUlDQjJZWElnYVc1a1pYZ2dQU0F0TVN4Y2JpQWdJQ0FnSUd4bGJtZDBhQ0E5SUdGeWNtRjVJRDhnWVhKeVlYa3ViR1Z1WjNSb0lEb2dNRHRjYmx4dUlDQnBaaUFvYVc1cGRFRmpZM1Z0SUNZbUlHeGxibWQwYUNrZ2UxeHVJQ0FnSUdGalkzVnRkV3hoZEc5eUlEMGdZWEp5WVhsYkt5dHBibVJsZUYwN1hHNGdJSDFjYmlBZ2QyaHBiR1VnS0NzcmFXNWtaWGdnUENCc1pXNW5kR2dwSUh0Y2JpQWdJQ0JoWTJOMWJYVnNZWFJ2Y2lBOUlHbDBaWEpoZEdWbEtHRmpZM1Z0ZFd4aGRHOXlMQ0JoY25KaGVWdHBibVJsZUYwc0lHbHVaR1Y0TENCaGNuSmhlU2s3WEc0Z0lIMWNiaUFnY21WMGRYSnVJR0ZqWTNWdGRXeGhkRzl5TzF4dWZWeHVYRzR2S2lwY2JpQXFJRlJvWlNCaVlYTmxJR2x0Y0d4bGJXVnVkR0YwYVc5dUlHOW1JR0JmTG5ScGJXVnpZQ0IzYVhSb2IzVjBJSE4xY0hCdmNuUWdabTl5SUdsMFpYSmhkR1ZsSUhOb2IzSjBhR0Z1WkhOY2JpQXFJRzl5SUcxaGVDQmhjbkpoZVNCc1pXNW5kR2dnWTJobFkydHpMbHh1SUNwY2JpQXFJRUJ3Y21sMllYUmxYRzRnS2lCQWNHRnlZVzBnZTI1MWJXSmxjbjBnYmlCVWFHVWdiblZ0WW1WeUlHOW1JSFJwYldWeklIUnZJR2x1ZG05clpTQmdhWFJsY21GMFpXVmdMbHh1SUNvZ1FIQmhjbUZ0SUh0R2RXNWpkR2x2Ym4wZ2FYUmxjbUYwWldVZ1ZHaGxJR1oxYm1OMGFXOXVJR2x1ZG05clpXUWdjR1Z5SUdsMFpYSmhkR2x2Ymk1Y2JpQXFJRUJ5WlhSMWNtNXpJSHRCY25KaGVYMGdVbVYwZFhKdWN5QjBhR1VnWVhKeVlYa2diMllnY21WemRXeDBjeTVjYmlBcUwxeHVablZ1WTNScGIyNGdZbUZ6WlZScGJXVnpLRzRzSUdsMFpYSmhkR1ZsS1NCN1hHNGdJSFpoY2lCcGJtUmxlQ0E5SUMweExGeHVJQ0FnSUNBZ2NtVnpkV3gwSUQwZ1FYSnlZWGtvYmlrN1hHNWNiaUFnZDJocGJHVWdLQ3NyYVc1a1pYZ2dQQ0J1S1NCN1hHNGdJQ0FnY21WemRXeDBXMmx1WkdWNFhTQTlJR2wwWlhKaGRHVmxLR2x1WkdWNEtUdGNiaUFnZlZ4dUlDQnlaWFIxY200Z2NtVnpkV3gwTzF4dWZWeHVYRzR2S2lwY2JpQXFJRlJvWlNCaVlYTmxJR2x0Y0d4bGJXVnVkR0YwYVc5dUlHOW1JR0JmTG5WdVlYSjVZQ0IzYVhSb2IzVjBJSE4xY0hCdmNuUWdabTl5SUhOMGIzSnBibWNnYldWMFlXUmhkR0V1WEc0Z0tseHVJQ29nUUhCeWFYWmhkR1ZjYmlBcUlFQndZWEpoYlNCN1JuVnVZM1JwYjI1OUlHWjFibU1nVkdobElHWjFibU4wYVc5dUlIUnZJR05oY0NCaGNtZDFiV1Z1ZEhNZ1ptOXlMbHh1SUNvZ1FISmxkSFZ5Ym5NZ2UwWjFibU4wYVc5dWZTQlNaWFIxY201eklIUm9aU0J1WlhjZ1kyRndjR1ZrSUdaMWJtTjBhVzl1TGx4dUlDb3ZYRzVtZFc1amRHbHZiaUJpWVhObFZXNWhjbmtvWm5WdVl5a2dlMXh1SUNCeVpYUjFjbTRnWm5WdVkzUnBiMjRvZG1Gc2RXVXBJSHRjYmlBZ0lDQnlaWFIxY200Z1puVnVZeWgyWVd4MVpTazdYRzRnSUgwN1hHNTlYRzVjYmk4cUtseHVJQ29nUjJWMGN5QjBhR1VnZG1Gc2RXVWdZWFFnWUd0bGVXQWdiMllnWUc5aWFtVmpkR0F1WEc0Z0tseHVJQ29nUUhCeWFYWmhkR1ZjYmlBcUlFQndZWEpoYlNCN1QySnFaV04wZlNCYmIySnFaV04wWFNCVWFHVWdiMkpxWldOMElIUnZJSEYxWlhKNUxseHVJQ29nUUhCaGNtRnRJSHR6ZEhKcGJtZDlJR3RsZVNCVWFHVWdhMlY1SUc5bUlIUm9aU0J3Y205d1pYSjBlU0IwYnlCblpYUXVYRzRnS2lCQWNtVjBkWEp1Y3lCN0tuMGdVbVYwZFhKdWN5QjBhR1VnY0hKdmNHVnlkSGtnZG1Gc2RXVXVYRzRnS2k5Y2JtWjFibU4wYVc5dUlHZGxkRlpoYkhWbEtHOWlhbVZqZEN3Z2EyVjVLU0I3WEc0Z0lISmxkSFZ5YmlCdlltcGxZM1FnUFQwZ2JuVnNiQ0EvSUhWdVpHVm1hVzVsWkNBNklHOWlhbVZqZEZ0clpYbGRPMXh1ZlZ4dVhHNHZLaXBjYmlBcUlFTm9aV05yY3lCcFppQmdkbUZzZFdWZ0lHbHpJR0VnYUc5emRDQnZZbXBsWTNRZ2FXNGdTVVVnUENBNUxseHVJQ3BjYmlBcUlFQndjbWwyWVhSbFhHNGdLaUJBY0dGeVlXMGdleXA5SUhaaGJIVmxJRlJvWlNCMllXeDFaU0IwYnlCamFHVmpheTVjYmlBcUlFQnlaWFIxY201eklIdGliMjlzWldGdWZTQlNaWFIxY201eklHQjBjblZsWUNCcFppQmdkbUZzZFdWZ0lHbHpJR0VnYUc5emRDQnZZbXBsWTNRc0lHVnNjMlVnWUdaaGJITmxZQzVjYmlBcUwxeHVablZ1WTNScGIyNGdhWE5JYjNOMFQySnFaV04wS0haaGJIVmxLU0I3WEc0Z0lDOHZJRTFoYm5rZ2FHOXpkQ0J2WW1wbFkzUnpJR0Z5WlNCZ1QySnFaV04wWUNCdlltcGxZM1J6SUhSb1lYUWdZMkZ1SUdOdlpYSmpaU0IwYnlCemRISnBibWR6WEc0Z0lDOHZJR1JsYzNCcGRHVWdhR0YyYVc1bklHbHRjSEp2Y0dWeWJIa2daR1ZtYVc1bFpDQmdkRzlUZEhKcGJtZGdJRzFsZEdodlpITXVYRzRnSUhaaGNpQnlaWE4xYkhRZ1BTQm1ZV3h6WlR0Y2JpQWdhV1lnS0haaGJIVmxJQ0U5SUc1MWJHd2dKaVlnZEhsd1pXOW1JSFpoYkhWbExuUnZVM1J5YVc1bklDRTlJQ2RtZFc1amRHbHZiaWNwSUh0Y2JpQWdJQ0IwY25rZ2UxeHVJQ0FnSUNBZ2NtVnpkV3gwSUQwZ0lTRW9kbUZzZFdVZ0t5QW5KeWs3WEc0Z0lDQWdmU0JqWVhSamFDQW9aU2tnZTMxY2JpQWdmVnh1SUNCeVpYUjFjbTRnY21WemRXeDBPMXh1ZlZ4dVhHNHZLaXBjYmlBcUlFTnZiblpsY25SeklHQnRZWEJnSUhSdklHbDBjeUJyWlhrdGRtRnNkV1VnY0dGcGNuTXVYRzRnS2x4dUlDb2dRSEJ5YVhaaGRHVmNiaUFxSUVCd1lYSmhiU0I3VDJKcVpXTjBmU0J0WVhBZ1ZHaGxJRzFoY0NCMGJ5QmpiMjUyWlhKMExseHVJQ29nUUhKbGRIVnlibk1nZTBGeWNtRjVmU0JTWlhSMWNtNXpJSFJvWlNCclpYa3RkbUZzZFdVZ2NHRnBjbk11WEc0Z0tpOWNibVoxYm1OMGFXOXVJRzFoY0ZSdlFYSnlZWGtvYldGd0tTQjdYRzRnSUhaaGNpQnBibVJsZUNBOUlDMHhMRnh1SUNBZ0lDQWdjbVZ6ZFd4MElEMGdRWEp5WVhrb2JXRndMbk5wZW1VcE8xeHVYRzRnSUcxaGNDNW1iM0pGWVdOb0tHWjFibU4wYVc5dUtIWmhiSFZsTENCclpYa3BJSHRjYmlBZ0lDQnlaWE4xYkhSYkt5dHBibVJsZUYwZ1BTQmJhMlY1TENCMllXeDFaVjA3WEc0Z0lIMHBPMXh1SUNCeVpYUjFjbTRnY21WemRXeDBPMXh1ZlZ4dVhHNHZLaXBjYmlBcUlFTnlaV0YwWlhNZ1lTQjFibUZ5ZVNCbWRXNWpkR2x2YmlCMGFHRjBJR2x1ZG05clpYTWdZR1oxYm1OZ0lIZHBkR2dnYVhSeklHRnlaM1Z0Wlc1MElIUnlZVzV6Wm05eWJXVmtMbHh1SUNwY2JpQXFJRUJ3Y21sMllYUmxYRzRnS2lCQWNHRnlZVzBnZTBaMWJtTjBhVzl1ZlNCbWRXNWpJRlJvWlNCbWRXNWpkR2x2YmlCMGJ5QjNjbUZ3TGx4dUlDb2dRSEJoY21GdElIdEdkVzVqZEdsdmJuMGdkSEpoYm5ObWIzSnRJRlJvWlNCaGNtZDFiV1Z1ZENCMGNtRnVjMlp2Y20wdVhHNGdLaUJBY21WMGRYSnVjeUI3Um5WdVkzUnBiMjU5SUZKbGRIVnlibk1nZEdobElHNWxkeUJtZFc1amRHbHZiaTVjYmlBcUwxeHVablZ1WTNScGIyNGdiM1psY2tGeVp5aG1kVzVqTENCMGNtRnVjMlp2Y20wcElIdGNiaUFnY21WMGRYSnVJR1oxYm1OMGFXOXVLR0Z5WnlrZ2UxeHVJQ0FnSUhKbGRIVnliaUJtZFc1aktIUnlZVzV6Wm05eWJTaGhjbWNwS1R0Y2JpQWdmVHRjYm4xY2JseHVMeW9xWEc0Z0tpQkRiMjUyWlhKMGN5QmdjMlYwWUNCMGJ5QmhiaUJoY25KaGVTQnZaaUJwZEhNZ2RtRnNkV1Z6TGx4dUlDcGNiaUFxSUVCd2NtbDJZWFJsWEc0Z0tpQkFjR0Z5WVcwZ2UwOWlhbVZqZEgwZ2MyVjBJRlJvWlNCelpYUWdkRzhnWTI5dWRtVnlkQzVjYmlBcUlFQnlaWFIxY201eklIdEJjbkpoZVgwZ1VtVjBkWEp1Y3lCMGFHVWdkbUZzZFdWekxseHVJQ292WEc1bWRXNWpkR2x2YmlCelpYUlViMEZ5Y21GNUtITmxkQ2tnZTF4dUlDQjJZWElnYVc1a1pYZ2dQU0F0TVN4Y2JpQWdJQ0FnSUhKbGMzVnNkQ0E5SUVGeWNtRjVLSE5sZEM1emFYcGxLVHRjYmx4dUlDQnpaWFF1Wm05eVJXRmphQ2htZFc1amRHbHZiaWgyWVd4MVpTa2dlMXh1SUNBZ0lISmxjM1ZzZEZzcksybHVaR1Y0WFNBOUlIWmhiSFZsTzF4dUlDQjlLVHRjYmlBZ2NtVjBkWEp1SUhKbGMzVnNkRHRjYm4xY2JseHVMeW9xSUZWelpXUWdabTl5SUdKMWFXeDBMV2x1SUcxbGRHaHZaQ0J5WldabGNtVnVZMlZ6TGlBcUwxeHVkbUZ5SUdGeWNtRjVVSEp2ZEc4Z1BTQkJjbkpoZVM1d2NtOTBiM1I1Y0dVc1hHNGdJQ0FnWm5WdVkxQnliM1J2SUQwZ1JuVnVZM1JwYjI0dWNISnZkRzkwZVhCbExGeHVJQ0FnSUc5aWFtVmpkRkJ5YjNSdklEMGdUMkpxWldOMExuQnliM1J2ZEhsd1pUdGNibHh1THlvcUlGVnpaV1FnZEc4Z1pHVjBaV04wSUc5MlpYSnlaV0ZqYUdsdVp5QmpiM0psTFdweklITm9hVzF6TGlBcUwxeHVkbUZ5SUdOdmNtVktjMFJoZEdFZ1BTQnliMjkwV3lkZlgyTnZjbVV0YW5OZmMyaGhjbVZrWDE4blhUdGNibHh1THlvcUlGVnpaV1FnZEc4Z1pHVjBaV04wSUcxbGRHaHZaSE1nYldGemNYVmxjbUZrYVc1bklHRnpJRzVoZEdsMlpTNGdLaTljYm5aaGNpQnRZWE5yVTNKalMyVjVJRDBnS0daMWJtTjBhVzl1S0NrZ2UxeHVJQ0IyWVhJZ2RXbGtJRDBnTDF0ZUxsMHJKQzh1WlhobFl5aGpiM0psU25ORVlYUmhJQ1ltSUdOdmNtVktjMFJoZEdFdWEyVjVjeUFtSmlCamIzSmxTbk5FWVhSaExtdGxlWE11U1VWZlVGSlBWRThnZkh3Z0p5Y3BPMXh1SUNCeVpYUjFjbTRnZFdsa0lEOGdLQ2RUZVcxaWIyd29jM0pqS1Y4eExpY2dLeUIxYVdRcElEb2dKeWM3WEc1OUtDa3BPMXh1WEc0dktpb2dWWE5sWkNCMGJ5QnlaWE52YkhabElIUm9aU0JrWldOdmJYQnBiR1ZrSUhOdmRYSmpaU0J2WmlCbWRXNWpkR2x2Ym5NdUlDb3ZYRzUyWVhJZ1puVnVZMVJ2VTNSeWFXNW5JRDBnWm5WdVkxQnliM1J2TG5SdlUzUnlhVzVuTzF4dVhHNHZLaW9nVlhObFpDQjBieUJqYUdWamF5QnZZbXBsWTNSeklHWnZjaUJ2ZDI0Z2NISnZjR1Z5ZEdsbGN5NGdLaTljYm5aaGNpQm9ZWE5QZDI1UWNtOXdaWEowZVNBOUlHOWlhbVZqZEZCeWIzUnZMbWhoYzA5M2JsQnliM0JsY25SNU8xeHVYRzR2S2lvZ1ZYTmxaQ0IwYnlCcGJtWmxjaUIwYUdVZ1lFOWlhbVZqZEdBZ1kyOXVjM1J5ZFdOMGIzSXVJQ292WEc1MllYSWdiMkpxWldOMFEzUnZjbE4wY21sdVp5QTlJR1oxYm1OVWIxTjBjbWx1Wnk1allXeHNLRTlpYW1WamRDazdYRzVjYmk4cUtseHVJQ29nVlhObFpDQjBieUJ5WlhOdmJIWmxJSFJvWlZ4dUlDb2dXMkIwYjFOMGNtbHVaMVJoWjJCZEtHaDBkSEE2THk5bFkyMWhMV2x1ZEdWeWJtRjBhVzl1WVd3dWIzSm5MMlZqYldFdE1qWXlMemN1TUM4amMyVmpMVzlpYW1WamRDNXdjbTkwYjNSNWNHVXVkRzl6ZEhKcGJtY3BYRzRnS2lCdlppQjJZV3gxWlhNdVhHNGdLaTljYm5aaGNpQnZZbXBsWTNSVWIxTjBjbWx1WnlBOUlHOWlhbVZqZEZCeWIzUnZMblJ2VTNSeWFXNW5PMXh1WEc0dktpb2dWWE5sWkNCMGJ5QmtaWFJsWTNRZ2FXWWdZU0J0WlhSb2IyUWdhWE1nYm1GMGFYWmxMaUFxTDF4dWRtRnlJSEpsU1hOT1lYUnBkbVVnUFNCU1pXZEZlSEFvSjE0bklDdGNiaUFnWm5WdVkxUnZVM1J5YVc1bkxtTmhiR3dvYUdGelQzZHVVSEp2Y0dWeWRIa3BMbkpsY0d4aFkyVW9jbVZTWldkRmVIQkRhR0Z5TENBblhGeGNYQ1FtSnlsY2JpQWdMbkpsY0d4aFkyVW9MMmhoYzA5M2JsQnliM0JsY25SNWZDaG1kVzVqZEdsdmJpa3VLajhvUHoxY1hGeGNYRndvS1h3Z1ptOXlJQzRyUHlnL1BWeGNYRnhjWEYwcEwyY3NJQ2NrTVM0cVB5Y3BJQ3NnSnlRblhHNHBPMXh1WEc0dktpb2dRblZwYkhRdGFXNGdkbUZzZFdVZ2NtVm1aWEpsYm1ObGN5NGdLaTljYm5aaGNpQkNkV1ptWlhJZ1BTQnRiMlIxYkdWRmVIQnZjblJ6SUQ4Z2NtOXZkQzVDZFdabVpYSWdPaUIxYm1SbFptbHVaV1FzWEc0Z0lDQWdVM2x0WW05c0lEMGdjbTl2ZEM1VGVXMWliMndzWEc0Z0lDQWdWV2x1ZERoQmNuSmhlU0E5SUhKdmIzUXVWV2x1ZERoQmNuSmhlU3hjYmlBZ0lDQm5aWFJRY205MGIzUjVjR1VnUFNCdmRtVnlRWEpuS0U5aWFtVmpkQzVuWlhSUWNtOTBiM1I1Y0dWUFppd2dUMkpxWldOMEtTeGNiaUFnSUNCdlltcGxZM1JEY21WaGRHVWdQU0JQWW1wbFkzUXVZM0psWVhSbExGeHVJQ0FnSUhCeWIzQmxjblI1U1hORmJuVnRaWEpoWW14bElEMGdiMkpxWldOMFVISnZkRzh1Y0hKdmNHVnlkSGxKYzBWdWRXMWxjbUZpYkdVc1hHNGdJQ0FnYzNCc2FXTmxJRDBnWVhKeVlYbFFjbTkwYnk1emNHeHBZMlU3WEc1Y2JpOHFJRUoxYVd4MExXbHVJRzFsZEdodlpDQnlaV1psY21WdVkyVnpJR1p2Y2lCMGFHOXpaU0IzYVhSb0lIUm9aU0J6WVcxbElHNWhiV1VnWVhNZ2IzUm9aWElnWUd4dlpHRnphR0FnYldWMGFHOWtjeTRnS2k5Y2JuWmhjaUJ1WVhScGRtVkhaWFJUZVcxaWIyeHpJRDBnVDJKcVpXTjBMbWRsZEU5M2JsQnliM0JsY25SNVUzbHRZbTlzY3l4Y2JpQWdJQ0J1WVhScGRtVkpjMEoxWm1abGNpQTlJRUoxWm1abGNpQS9JRUoxWm1abGNpNXBjMEoxWm1abGNpQTZJSFZ1WkdWbWFXNWxaQ3hjYmlBZ0lDQnVZWFJwZG1WTFpYbHpJRDBnYjNabGNrRnlaeWhQWW1wbFkzUXVhMlY1Y3l3Z1QySnFaV04wS1N4Y2JpQWdJQ0J1WVhScGRtVk5ZWGdnUFNCTllYUm9MbTFoZUR0Y2JseHVMeW9nUW5WcGJIUXRhVzRnYldWMGFHOWtJSEpsWm1WeVpXNWpaWE1nZEdoaGRDQmhjbVVnZG1WeWFXWnBaV1FnZEc4Z1ltVWdibUYwYVhabExpQXFMMXh1ZG1GeUlFUmhkR0ZXYVdWM0lEMGdaMlYwVG1GMGFYWmxLSEp2YjNRc0lDZEVZWFJoVm1sbGR5Y3BMRnh1SUNBZ0lFMWhjQ0E5SUdkbGRFNWhkR2wyWlNoeWIyOTBMQ0FuVFdGd0p5a3NYRzRnSUNBZ1VISnZiV2x6WlNBOUlHZGxkRTVoZEdsMlpTaHliMjkwTENBblVISnZiV2x6WlNjcExGeHVJQ0FnSUZObGRDQTlJR2RsZEU1aGRHbDJaU2h5YjI5MExDQW5VMlYwSnlrc1hHNGdJQ0FnVjJWaGEwMWhjQ0E5SUdkbGRFNWhkR2wyWlNoeWIyOTBMQ0FuVjJWaGEwMWhjQ2NwTEZ4dUlDQWdJRzVoZEdsMlpVTnlaV0YwWlNBOUlHZGxkRTVoZEdsMlpTaFBZbXBsWTNRc0lDZGpjbVZoZEdVbktUdGNibHh1THlvcUlGVnpaV1FnZEc4Z1pHVjBaV04wSUcxaGNITXNJSE5sZEhNc0lHRnVaQ0IzWldGcmJXRndjeTRnS2k5Y2JuWmhjaUJrWVhSaFZtbGxkME4wYjNKVGRISnBibWNnUFNCMGIxTnZkWEpqWlNoRVlYUmhWbWxsZHlrc1hHNGdJQ0FnYldGd1EzUnZjbE4wY21sdVp5QTlJSFJ2VTI5MWNtTmxLRTFoY0Nrc1hHNGdJQ0FnY0hKdmJXbHpaVU4wYjNKVGRISnBibWNnUFNCMGIxTnZkWEpqWlNoUWNtOXRhWE5sS1N4Y2JpQWdJQ0J6WlhSRGRHOXlVM1J5YVc1bklEMGdkRzlUYjNWeVkyVW9VMlYwS1N4Y2JpQWdJQ0IzWldGclRXRndRM1J2Y2xOMGNtbHVaeUE5SUhSdlUyOTFjbU5sS0ZkbFlXdE5ZWEFwTzF4dVhHNHZLaW9nVlhObFpDQjBieUJqYjI1MlpYSjBJSE41YldKdmJITWdkRzhnY0hKcGJXbDBhWFpsY3lCaGJtUWdjM1J5YVc1bmN5NGdLaTljYm5aaGNpQnplVzFpYjJ4UWNtOTBieUE5SUZONWJXSnZiQ0EvSUZONWJXSnZiQzV3Y205MGIzUjVjR1VnT2lCMWJtUmxabWx1WldRc1hHNGdJQ0FnYzNsdFltOXNWbUZzZFdWUFppQTlJSE41YldKdmJGQnliM1J2SUQ4Z2MzbHRZbTlzVUhKdmRHOHVkbUZzZFdWUFppQTZJSFZ1WkdWbWFXNWxaRHRjYmx4dUx5b3FYRzRnS2lCRGNtVmhkR1Z6SUdFZ2FHRnphQ0J2WW1wbFkzUXVYRzRnS2x4dUlDb2dRSEJ5YVhaaGRHVmNiaUFxSUVCamIyNXpkSEoxWTNSdmNseHVJQ29nUUhCaGNtRnRJSHRCY25KaGVYMGdXMlZ1ZEhKcFpYTmRJRlJvWlNCclpYa3RkbUZzZFdVZ2NHRnBjbk1nZEc4Z1kyRmphR1V1WEc0Z0tpOWNibVoxYm1OMGFXOXVJRWhoYzJnb1pXNTBjbWxsY3lrZ2UxeHVJQ0IyWVhJZ2FXNWtaWGdnUFNBdE1TeGNiaUFnSUNBZ0lHeGxibWQwYUNBOUlHVnVkSEpwWlhNZ1B5QmxiblJ5YVdWekxteGxibWQwYUNBNklEQTdYRzVjYmlBZ2RHaHBjeTVqYkdWaGNpZ3BPMXh1SUNCM2FHbHNaU0FvS3l0cGJtUmxlQ0E4SUd4bGJtZDBhQ2tnZTF4dUlDQWdJSFpoY2lCbGJuUnllU0E5SUdWdWRISnBaWE5iYVc1a1pYaGRPMXh1SUNBZ0lIUm9hWE11YzJWMEtHVnVkSEo1V3pCZExDQmxiblJ5ZVZzeFhTazdYRzRnSUgxY2JuMWNibHh1THlvcVhHNGdLaUJTWlcxdmRtVnpJR0ZzYkNCclpYa3RkbUZzZFdVZ1pXNTBjbWxsY3lCbWNtOXRJSFJvWlNCb1lYTm9MbHh1SUNwY2JpQXFJRUJ3Y21sMllYUmxYRzRnS2lCQWJtRnRaU0JqYkdWaGNseHVJQ29nUUcxbGJXSmxjazltSUVoaGMyaGNiaUFxTDF4dVpuVnVZM1JwYjI0Z2FHRnphRU5zWldGeUtDa2dlMXh1SUNCMGFHbHpMbDlmWkdGMFlWOWZJRDBnYm1GMGFYWmxRM0psWVhSbElEOGdibUYwYVhabFEzSmxZWFJsS0c1MWJHd3BJRG9nZTMwN1hHNTlYRzVjYmk4cUtseHVJQ29nVW1WdGIzWmxjeUJnYTJWNVlDQmhibVFnYVhSeklIWmhiSFZsSUdaeWIyMGdkR2hsSUdoaGMyZ3VYRzRnS2x4dUlDb2dRSEJ5YVhaaGRHVmNiaUFxSUVCdVlXMWxJR1JsYkdWMFpWeHVJQ29nUUcxbGJXSmxjazltSUVoaGMyaGNiaUFxSUVCd1lYSmhiU0I3VDJKcVpXTjBmU0JvWVhOb0lGUm9aU0JvWVhOb0lIUnZJRzF2WkdsbWVTNWNiaUFxSUVCd1lYSmhiU0I3YzNSeWFXNW5mU0JyWlhrZ1ZHaGxJR3RsZVNCdlppQjBhR1VnZG1Gc2RXVWdkRzhnY21WdGIzWmxMbHh1SUNvZ1FISmxkSFZ5Ym5NZ2UySnZiMnhsWVc1OUlGSmxkSFZ5Ym5NZ1lIUnlkV1ZnSUdsbUlIUm9aU0JsYm5SeWVTQjNZWE1nY21WdGIzWmxaQ3dnWld4elpTQmdabUZzYzJWZ0xseHVJQ292WEc1bWRXNWpkR2x2YmlCb1lYTm9SR1ZzWlhSbEtHdGxlU2tnZTF4dUlDQnlaWFIxY200Z2RHaHBjeTVvWVhNb2EyVjVLU0FtSmlCa1pXeGxkR1VnZEdocGN5NWZYMlJoZEdGZlgxdHJaWGxkTzF4dWZWeHVYRzR2S2lwY2JpQXFJRWRsZEhNZ2RHaGxJR2hoYzJnZ2RtRnNkV1VnWm05eUlHQnJaWGxnTGx4dUlDcGNiaUFxSUVCd2NtbDJZWFJsWEc0Z0tpQkFibUZ0WlNCblpYUmNiaUFxSUVCdFpXMWlaWEpQWmlCSVlYTm9YRzRnS2lCQWNHRnlZVzBnZTNOMGNtbHVaMzBnYTJWNUlGUm9aU0JyWlhrZ2IyWWdkR2hsSUhaaGJIVmxJSFJ2SUdkbGRDNWNiaUFxSUVCeVpYUjFjbTV6SUhzcWZTQlNaWFIxY201eklIUm9aU0JsYm5SeWVTQjJZV3gxWlM1Y2JpQXFMMXh1Wm5WdVkzUnBiMjRnYUdGemFFZGxkQ2hyWlhrcElIdGNiaUFnZG1GeUlHUmhkR0VnUFNCMGFHbHpMbDlmWkdGMFlWOWZPMXh1SUNCcFppQW9ibUYwYVhabFEzSmxZWFJsS1NCN1hHNGdJQ0FnZG1GeUlISmxjM1ZzZENBOUlHUmhkR0ZiYTJWNVhUdGNiaUFnSUNCeVpYUjFjbTRnY21WemRXeDBJRDA5UFNCSVFWTklYMVZPUkVWR1NVNUZSQ0EvSUhWdVpHVm1hVzVsWkNBNklISmxjM1ZzZER0Y2JpQWdmVnh1SUNCeVpYUjFjbTRnYUdGelQzZHVVSEp2Y0dWeWRIa3VZMkZzYkNoa1lYUmhMQ0JyWlhrcElEOGdaR0YwWVZ0clpYbGRJRG9nZFc1a1pXWnBibVZrTzF4dWZWeHVYRzR2S2lwY2JpQXFJRU5vWldOcmN5QnBaaUJoSUdoaGMyZ2dkbUZzZFdVZ1ptOXlJR0JyWlhsZ0lHVjRhWE4wY3k1Y2JpQXFYRzRnS2lCQWNISnBkbUYwWlZ4dUlDb2dRRzVoYldVZ2FHRnpYRzRnS2lCQWJXVnRZbVZ5VDJZZ1NHRnphRnh1SUNvZ1FIQmhjbUZ0SUh0emRISnBibWQ5SUd0bGVTQlVhR1VnYTJWNUlHOW1JSFJvWlNCbGJuUnllU0IwYnlCamFHVmpheTVjYmlBcUlFQnlaWFIxY201eklIdGliMjlzWldGdWZTQlNaWFIxY201eklHQjBjblZsWUNCcFppQmhiaUJsYm5SeWVTQm1iM0lnWUd0bGVXQWdaWGhwYzNSekxDQmxiSE5sSUdCbVlXeHpaV0F1WEc0Z0tpOWNibVoxYm1OMGFXOXVJR2hoYzJoSVlYTW9hMlY1S1NCN1hHNGdJSFpoY2lCa1lYUmhJRDBnZEdocGN5NWZYMlJoZEdGZlh6dGNiaUFnY21WMGRYSnVJRzVoZEdsMlpVTnlaV0YwWlNBL0lHUmhkR0ZiYTJWNVhTQWhQVDBnZFc1a1pXWnBibVZrSURvZ2FHRnpUM2R1VUhKdmNHVnlkSGt1WTJGc2JDaGtZWFJoTENCclpYa3BPMXh1ZlZ4dVhHNHZLaXBjYmlBcUlGTmxkSE1nZEdobElHaGhjMmdnWUd0bGVXQWdkRzhnWUhaaGJIVmxZQzVjYmlBcVhHNGdLaUJBY0hKcGRtRjBaVnh1SUNvZ1FHNWhiV1VnYzJWMFhHNGdLaUJBYldWdFltVnlUMllnU0dGemFGeHVJQ29nUUhCaGNtRnRJSHR6ZEhKcGJtZDlJR3RsZVNCVWFHVWdhMlY1SUc5bUlIUm9aU0IyWVd4MVpTQjBieUJ6WlhRdVhHNGdLaUJBY0dGeVlXMGdleXA5SUhaaGJIVmxJRlJvWlNCMllXeDFaU0IwYnlCelpYUXVYRzRnS2lCQWNtVjBkWEp1Y3lCN1QySnFaV04wZlNCU1pYUjFjbTV6SUhSb1pTQm9ZWE5vSUdsdWMzUmhibU5sTGx4dUlDb3ZYRzVtZFc1amRHbHZiaUJvWVhOb1UyVjBLR3RsZVN3Z2RtRnNkV1VwSUh0Y2JpQWdkbUZ5SUdSaGRHRWdQU0IwYUdsekxsOWZaR0YwWVY5Zk8xeHVJQ0JrWVhSaFcydGxlVjBnUFNBb2JtRjBhWFpsUTNKbFlYUmxJQ1ltSUhaaGJIVmxJRDA5UFNCMWJtUmxabWx1WldRcElEOGdTRUZUU0Y5VlRrUkZSa2xPUlVRZ09pQjJZV3gxWlR0Y2JpQWdjbVYwZFhKdUlIUm9hWE03WEc1OVhHNWNiaTh2SUVGa1pDQnRaWFJvYjJSeklIUnZJR0JJWVhOb1lDNWNia2hoYzJndWNISnZkRzkwZVhCbExtTnNaV0Z5SUQwZ2FHRnphRU5zWldGeU8xeHVTR0Z6YUM1d2NtOTBiM1I1Y0dWYkoyUmxiR1YwWlNkZElEMGdhR0Z6YUVSbGJHVjBaVHRjYmtoaGMyZ3VjSEp2ZEc5MGVYQmxMbWRsZENBOUlHaGhjMmhIWlhRN1hHNUlZWE5vTG5CeWIzUnZkSGx3WlM1b1lYTWdQU0JvWVhOb1NHRnpPMXh1U0dGemFDNXdjbTkwYjNSNWNHVXVjMlYwSUQwZ2FHRnphRk5sZER0Y2JseHVMeW9xWEc0Z0tpQkRjbVZoZEdWeklHRnVJR3hwYzNRZ1kyRmphR1VnYjJKcVpXTjBMbHh1SUNwY2JpQXFJRUJ3Y21sMllYUmxYRzRnS2lCQVkyOXVjM1J5ZFdOMGIzSmNiaUFxSUVCd1lYSmhiU0I3UVhKeVlYbDlJRnRsYm5SeWFXVnpYU0JVYUdVZ2EyVjVMWFpoYkhWbElIQmhhWEp6SUhSdklHTmhZMmhsTGx4dUlDb3ZYRzVtZFc1amRHbHZiaUJNYVhOMFEyRmphR1VvWlc1MGNtbGxjeWtnZTF4dUlDQjJZWElnYVc1a1pYZ2dQU0F0TVN4Y2JpQWdJQ0FnSUd4bGJtZDBhQ0E5SUdWdWRISnBaWE1nUHlCbGJuUnlhV1Z6TG14bGJtZDBhQ0E2SURBN1hHNWNiaUFnZEdocGN5NWpiR1ZoY2lncE8xeHVJQ0IzYUdsc1pTQW9LeXRwYm1SbGVDQThJR3hsYm1kMGFDa2dlMXh1SUNBZ0lIWmhjaUJsYm5SeWVTQTlJR1Z1ZEhKcFpYTmJhVzVrWlhoZE8xeHVJQ0FnSUhSb2FYTXVjMlYwS0dWdWRISjVXekJkTENCbGJuUnllVnN4WFNrN1hHNGdJSDFjYm4xY2JseHVMeW9xWEc0Z0tpQlNaVzF2ZG1WeklHRnNiQ0JyWlhrdGRtRnNkV1VnWlc1MGNtbGxjeUJtY205dElIUm9aU0JzYVhOMElHTmhZMmhsTGx4dUlDcGNiaUFxSUVCd2NtbDJZWFJsWEc0Z0tpQkFibUZ0WlNCamJHVmhjbHh1SUNvZ1FHMWxiV0psY2s5bUlFeHBjM1JEWVdOb1pWeHVJQ292WEc1bWRXNWpkR2x2YmlCc2FYTjBRMkZqYUdWRGJHVmhjaWdwSUh0Y2JpQWdkR2hwY3k1ZlgyUmhkR0ZmWHlBOUlGdGRPMXh1ZlZ4dVhHNHZLaXBjYmlBcUlGSmxiVzkyWlhNZ1lHdGxlV0FnWVc1a0lHbDBjeUIyWVd4MVpTQm1jbTl0SUhSb1pTQnNhWE4wSUdOaFkyaGxMbHh1SUNwY2JpQXFJRUJ3Y21sMllYUmxYRzRnS2lCQWJtRnRaU0JrWld4bGRHVmNiaUFxSUVCdFpXMWlaWEpQWmlCTWFYTjBRMkZqYUdWY2JpQXFJRUJ3WVhKaGJTQjdjM1J5YVc1bmZTQnJaWGtnVkdobElHdGxlU0J2WmlCMGFHVWdkbUZzZFdVZ2RHOGdjbVZ0YjNabExseHVJQ29nUUhKbGRIVnlibk1nZTJKdmIyeGxZVzU5SUZKbGRIVnlibk1nWUhSeWRXVmdJR2xtSUhSb1pTQmxiblJ5ZVNCM1lYTWdjbVZ0YjNabFpDd2daV3h6WlNCZ1ptRnNjMlZnTGx4dUlDb3ZYRzVtZFc1amRHbHZiaUJzYVhOMFEyRmphR1ZFWld4bGRHVW9hMlY1S1NCN1hHNGdJSFpoY2lCa1lYUmhJRDBnZEdocGN5NWZYMlJoZEdGZlh5eGNiaUFnSUNBZ0lHbHVaR1Y0SUQwZ1lYTnpiMk5KYm1SbGVFOW1LR1JoZEdFc0lHdGxlU2s3WEc1Y2JpQWdhV1lnS0dsdVpHVjRJRHdnTUNrZ2UxeHVJQ0FnSUhKbGRIVnliaUJtWVd4elpUdGNiaUFnZlZ4dUlDQjJZWElnYkdGemRFbHVaR1Y0SUQwZ1pHRjBZUzVzWlc1bmRHZ2dMU0F4TzF4dUlDQnBaaUFvYVc1a1pYZ2dQVDBnYkdGemRFbHVaR1Y0S1NCN1hHNGdJQ0FnWkdGMFlTNXdiM0FvS1R0Y2JpQWdmU0JsYkhObElIdGNiaUFnSUNCemNHeHBZMlV1WTJGc2JDaGtZWFJoTENCcGJtUmxlQ3dnTVNrN1hHNGdJSDFjYmlBZ2NtVjBkWEp1SUhSeWRXVTdYRzU5WEc1Y2JpOHFLbHh1SUNvZ1IyVjBjeUIwYUdVZ2JHbHpkQ0JqWVdOb1pTQjJZV3gxWlNCbWIzSWdZR3RsZVdBdVhHNGdLbHh1SUNvZ1FIQnlhWFpoZEdWY2JpQXFJRUJ1WVcxbElHZGxkRnh1SUNvZ1FHMWxiV0psY2s5bUlFeHBjM1JEWVdOb1pWeHVJQ29nUUhCaGNtRnRJSHR6ZEhKcGJtZDlJR3RsZVNCVWFHVWdhMlY1SUc5bUlIUm9aU0IyWVd4MVpTQjBieUJuWlhRdVhHNGdLaUJBY21WMGRYSnVjeUI3S24wZ1VtVjBkWEp1Y3lCMGFHVWdaVzUwY25rZ2RtRnNkV1V1WEc0Z0tpOWNibVoxYm1OMGFXOXVJR3hwYzNSRFlXTm9aVWRsZENoclpYa3BJSHRjYmlBZ2RtRnlJR1JoZEdFZ1BTQjBhR2x6TGw5ZlpHRjBZVjlmTEZ4dUlDQWdJQ0FnYVc1a1pYZ2dQU0JoYzNOdlkwbHVaR1Y0VDJZb1pHRjBZU3dnYTJWNUtUdGNibHh1SUNCeVpYUjFjbTRnYVc1a1pYZ2dQQ0F3SUQ4Z2RXNWtaV1pwYm1Wa0lEb2daR0YwWVZ0cGJtUmxlRjFiTVYwN1hHNTlYRzVjYmk4cUtseHVJQ29nUTJobFkydHpJR2xtSUdFZ2JHbHpkQ0JqWVdOb1pTQjJZV3gxWlNCbWIzSWdZR3RsZVdBZ1pYaHBjM1J6TGx4dUlDcGNiaUFxSUVCd2NtbDJZWFJsWEc0Z0tpQkFibUZ0WlNCb1lYTmNiaUFxSUVCdFpXMWlaWEpQWmlCTWFYTjBRMkZqYUdWY2JpQXFJRUJ3WVhKaGJTQjdjM1J5YVc1bmZTQnJaWGtnVkdobElHdGxlU0J2WmlCMGFHVWdaVzUwY25rZ2RHOGdZMmhsWTJzdVhHNGdLaUJBY21WMGRYSnVjeUI3WW05dmJHVmhibjBnVW1WMGRYSnVjeUJnZEhKMVpXQWdhV1lnWVc0Z1pXNTBjbmtnWm05eUlHQnJaWGxnSUdWNGFYTjBjeXdnWld4elpTQmdabUZzYzJWZ0xseHVJQ292WEc1bWRXNWpkR2x2YmlCc2FYTjBRMkZqYUdWSVlYTW9hMlY1S1NCN1hHNGdJSEpsZEhWeWJpQmhjM052WTBsdVpHVjRUMllvZEdocGN5NWZYMlJoZEdGZlh5d2dhMlY1S1NBK0lDMHhPMXh1ZlZ4dVhHNHZLaXBjYmlBcUlGTmxkSE1nZEdobElHeHBjM1FnWTJGamFHVWdZR3RsZVdBZ2RHOGdZSFpoYkhWbFlDNWNiaUFxWEc0Z0tpQkFjSEpwZG1GMFpWeHVJQ29nUUc1aGJXVWdjMlYwWEc0Z0tpQkFiV1Z0WW1WeVQyWWdUR2x6ZEVOaFkyaGxYRzRnS2lCQWNHRnlZVzBnZTNOMGNtbHVaMzBnYTJWNUlGUm9aU0JyWlhrZ2IyWWdkR2hsSUhaaGJIVmxJSFJ2SUhObGRDNWNiaUFxSUVCd1lYSmhiU0I3S24wZ2RtRnNkV1VnVkdobElIWmhiSFZsSUhSdklITmxkQzVjYmlBcUlFQnlaWFIxY201eklIdFBZbXBsWTNSOUlGSmxkSFZ5Ym5NZ2RHaGxJR3hwYzNRZ1kyRmphR1VnYVc1emRHRnVZMlV1WEc0Z0tpOWNibVoxYm1OMGFXOXVJR3hwYzNSRFlXTm9aVk5sZENoclpYa3NJSFpoYkhWbEtTQjdYRzRnSUhaaGNpQmtZWFJoSUQwZ2RHaHBjeTVmWDJSaGRHRmZYeXhjYmlBZ0lDQWdJR2x1WkdWNElEMGdZWE56YjJOSmJtUmxlRTltS0dSaGRHRXNJR3RsZVNrN1hHNWNiaUFnYVdZZ0tHbHVaR1Y0SUR3Z01Da2dlMXh1SUNBZ0lHUmhkR0V1Y0hWemFDaGJhMlY1TENCMllXeDFaVjBwTzF4dUlDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUdSaGRHRmJhVzVrWlhoZFd6RmRJRDBnZG1Gc2RXVTdYRzRnSUgxY2JpQWdjbVYwZFhKdUlIUm9hWE03WEc1OVhHNWNiaTh2SUVGa1pDQnRaWFJvYjJSeklIUnZJR0JNYVhOMFEyRmphR1ZnTGx4dVRHbHpkRU5oWTJobExuQnliM1J2ZEhsd1pTNWpiR1ZoY2lBOUlHeHBjM1JEWVdOb1pVTnNaV0Z5TzF4dVRHbHpkRU5oWTJobExuQnliM1J2ZEhsd1pWc25aR1ZzWlhSbEoxMGdQU0JzYVhOMFEyRmphR1ZFWld4bGRHVTdYRzVNYVhOMFEyRmphR1V1Y0hKdmRHOTBlWEJsTG1kbGRDQTlJR3hwYzNSRFlXTm9aVWRsZER0Y2JreHBjM1JEWVdOb1pTNXdjbTkwYjNSNWNHVXVhR0Z6SUQwZ2JHbHpkRU5oWTJobFNHRnpPMXh1VEdsemRFTmhZMmhsTG5CeWIzUnZkSGx3WlM1elpYUWdQU0JzYVhOMFEyRmphR1ZUWlhRN1hHNWNiaThxS2x4dUlDb2dRM0psWVhSbGN5QmhJRzFoY0NCallXTm9aU0J2WW1wbFkzUWdkRzhnYzNSdmNtVWdhMlY1TFhaaGJIVmxJSEJoYVhKekxseHVJQ3BjYmlBcUlFQndjbWwyWVhSbFhHNGdLaUJBWTI5dWMzUnlkV04wYjNKY2JpQXFJRUJ3WVhKaGJTQjdRWEp5WVhsOUlGdGxiblJ5YVdWelhTQlVhR1VnYTJWNUxYWmhiSFZsSUhCaGFYSnpJSFJ2SUdOaFkyaGxMbHh1SUNvdlhHNW1kVzVqZEdsdmJpQk5ZWEJEWVdOb1pTaGxiblJ5YVdWektTQjdYRzRnSUhaaGNpQnBibVJsZUNBOUlDMHhMRnh1SUNBZ0lDQWdiR1Z1WjNSb0lEMGdaVzUwY21sbGN5QS9JR1Z1ZEhKcFpYTXViR1Z1WjNSb0lEb2dNRHRjYmx4dUlDQjBhR2x6TG1Oc1pXRnlLQ2s3WEc0Z0lIZG9hV3hsSUNncksybHVaR1Y0SUR3Z2JHVnVaM1JvS1NCN1hHNGdJQ0FnZG1GeUlHVnVkSEo1SUQwZ1pXNTBjbWxsYzF0cGJtUmxlRjA3WEc0Z0lDQWdkR2hwY3k1elpYUW9aVzUwY25sYk1GMHNJR1Z1ZEhKNVd6RmRLVHRjYmlBZ2ZWeHVmVnh1WEc0dktpcGNiaUFxSUZKbGJXOTJaWE1nWVd4c0lHdGxlUzEyWVd4MVpTQmxiblJ5YVdWeklHWnliMjBnZEdobElHMWhjQzVjYmlBcVhHNGdLaUJBY0hKcGRtRjBaVnh1SUNvZ1FHNWhiV1VnWTJ4bFlYSmNiaUFxSUVCdFpXMWlaWEpQWmlCTllYQkRZV05vWlZ4dUlDb3ZYRzVtZFc1amRHbHZiaUJ0WVhCRFlXTm9aVU5zWldGeUtDa2dlMXh1SUNCMGFHbHpMbDlmWkdGMFlWOWZJRDBnZTF4dUlDQWdJQ2RvWVhOb0p6b2dibVYzSUVoaGMyZ3NYRzRnSUNBZ0oyMWhjQ2M2SUc1bGR5QW9UV0Z3SUh4OElFeHBjM1JEWVdOb1pTa3NYRzRnSUNBZ0ozTjBjbWx1WnljNklHNWxkeUJJWVhOb1hHNGdJSDA3WEc1OVhHNWNiaThxS2x4dUlDb2dVbVZ0YjNabGN5QmdhMlY1WUNCaGJtUWdhWFJ6SUhaaGJIVmxJR1p5YjIwZ2RHaGxJRzFoY0M1Y2JpQXFYRzRnS2lCQWNISnBkbUYwWlZ4dUlDb2dRRzVoYldVZ1pHVnNaWFJsWEc0Z0tpQkFiV1Z0WW1WeVQyWWdUV0Z3UTJGamFHVmNiaUFxSUVCd1lYSmhiU0I3YzNSeWFXNW5mU0JyWlhrZ1ZHaGxJR3RsZVNCdlppQjBhR1VnZG1Gc2RXVWdkRzhnY21WdGIzWmxMbHh1SUNvZ1FISmxkSFZ5Ym5NZ2UySnZiMnhsWVc1OUlGSmxkSFZ5Ym5NZ1lIUnlkV1ZnSUdsbUlIUm9aU0JsYm5SeWVTQjNZWE1nY21WdGIzWmxaQ3dnWld4elpTQmdabUZzYzJWZ0xseHVJQ292WEc1bWRXNWpkR2x2YmlCdFlYQkRZV05vWlVSbGJHVjBaU2hyWlhrcElIdGNiaUFnY21WMGRYSnVJR2RsZEUxaGNFUmhkR0VvZEdocGN5d2dhMlY1S1ZzblpHVnNaWFJsSjEwb2EyVjVLVHRjYm4xY2JseHVMeW9xWEc0Z0tpQkhaWFJ6SUhSb1pTQnRZWEFnZG1Gc2RXVWdabTl5SUdCclpYbGdMbHh1SUNwY2JpQXFJRUJ3Y21sMllYUmxYRzRnS2lCQWJtRnRaU0JuWlhSY2JpQXFJRUJ0WlcxaVpYSlBaaUJOWVhCRFlXTm9aVnh1SUNvZ1FIQmhjbUZ0SUh0emRISnBibWQ5SUd0bGVTQlVhR1VnYTJWNUlHOW1JSFJvWlNCMllXeDFaU0IwYnlCblpYUXVYRzRnS2lCQWNtVjBkWEp1Y3lCN0tuMGdVbVYwZFhKdWN5QjBhR1VnWlc1MGNua2dkbUZzZFdVdVhHNGdLaTljYm1aMWJtTjBhVzl1SUcxaGNFTmhZMmhsUjJWMEtHdGxlU2tnZTF4dUlDQnlaWFIxY200Z1oyVjBUV0Z3UkdGMFlTaDBhR2x6TENCclpYa3BMbWRsZENoclpYa3BPMXh1ZlZ4dVhHNHZLaXBjYmlBcUlFTm9aV05yY3lCcFppQmhJRzFoY0NCMllXeDFaU0JtYjNJZ1lHdGxlV0FnWlhocGMzUnpMbHh1SUNwY2JpQXFJRUJ3Y21sMllYUmxYRzRnS2lCQWJtRnRaU0JvWVhOY2JpQXFJRUJ0WlcxaVpYSlBaaUJOWVhCRFlXTm9aVnh1SUNvZ1FIQmhjbUZ0SUh0emRISnBibWQ5SUd0bGVTQlVhR1VnYTJWNUlHOW1JSFJvWlNCbGJuUnllU0IwYnlCamFHVmpheTVjYmlBcUlFQnlaWFIxY201eklIdGliMjlzWldGdWZTQlNaWFIxY201eklHQjBjblZsWUNCcFppQmhiaUJsYm5SeWVTQm1iM0lnWUd0bGVXQWdaWGhwYzNSekxDQmxiSE5sSUdCbVlXeHpaV0F1WEc0Z0tpOWNibVoxYm1OMGFXOXVJRzFoY0VOaFkyaGxTR0Z6S0d0bGVTa2dlMXh1SUNCeVpYUjFjbTRnWjJWMFRXRndSR0YwWVNoMGFHbHpMQ0JyWlhrcExtaGhjeWhyWlhrcE8xeHVmVnh1WEc0dktpcGNiaUFxSUZObGRITWdkR2hsSUcxaGNDQmdhMlY1WUNCMGJ5QmdkbUZzZFdWZ0xseHVJQ3BjYmlBcUlFQndjbWwyWVhSbFhHNGdLaUJBYm1GdFpTQnpaWFJjYmlBcUlFQnRaVzFpWlhKUFppQk5ZWEJEWVdOb1pWeHVJQ29nUUhCaGNtRnRJSHR6ZEhKcGJtZDlJR3RsZVNCVWFHVWdhMlY1SUc5bUlIUm9aU0IyWVd4MVpTQjBieUJ6WlhRdVhHNGdLaUJBY0dGeVlXMGdleXA5SUhaaGJIVmxJRlJvWlNCMllXeDFaU0IwYnlCelpYUXVYRzRnS2lCQWNtVjBkWEp1Y3lCN1QySnFaV04wZlNCU1pYUjFjbTV6SUhSb1pTQnRZWEFnWTJGamFHVWdhVzV6ZEdGdVkyVXVYRzRnS2k5Y2JtWjFibU4wYVc5dUlHMWhjRU5oWTJobFUyVjBLR3RsZVN3Z2RtRnNkV1VwSUh0Y2JpQWdaMlYwVFdGd1JHRjBZU2gwYUdsekxDQnJaWGtwTG5ObGRDaHJaWGtzSUhaaGJIVmxLVHRjYmlBZ2NtVjBkWEp1SUhSb2FYTTdYRzU5WEc1Y2JpOHZJRUZrWkNCdFpYUm9iMlJ6SUhSdklHQk5ZWEJEWVdOb1pXQXVYRzVOWVhCRFlXTm9aUzV3Y205MGIzUjVjR1V1WTJ4bFlYSWdQU0J0WVhCRFlXTm9aVU5zWldGeU8xeHVUV0Z3UTJGamFHVXVjSEp2ZEc5MGVYQmxXeWRrWld4bGRHVW5YU0E5SUcxaGNFTmhZMmhsUkdWc1pYUmxPMXh1VFdGd1EyRmphR1V1Y0hKdmRHOTBlWEJsTG1kbGRDQTlJRzFoY0VOaFkyaGxSMlYwTzF4dVRXRndRMkZqYUdVdWNISnZkRzkwZVhCbExtaGhjeUE5SUcxaGNFTmhZMmhsU0dGek8xeHVUV0Z3UTJGamFHVXVjSEp2ZEc5MGVYQmxMbk5sZENBOUlHMWhjRU5oWTJobFUyVjBPMXh1WEc0dktpcGNiaUFxSUVOeVpXRjBaWE1nWVNCemRHRmpheUJqWVdOb1pTQnZZbXBsWTNRZ2RHOGdjM1J2Y21VZ2EyVjVMWFpoYkhWbElIQmhhWEp6TGx4dUlDcGNiaUFxSUVCd2NtbDJZWFJsWEc0Z0tpQkFZMjl1YzNSeWRXTjBiM0pjYmlBcUlFQndZWEpoYlNCN1FYSnlZWGw5SUZ0bGJuUnlhV1Z6WFNCVWFHVWdhMlY1TFhaaGJIVmxJSEJoYVhKeklIUnZJR05oWTJobExseHVJQ292WEc1bWRXNWpkR2x2YmlCVGRHRmpheWhsYm5SeWFXVnpLU0I3WEc0Z0lIUm9hWE11WDE5a1lYUmhYMThnUFNCdVpYY2dUR2x6ZEVOaFkyaGxLR1Z1ZEhKcFpYTXBPMXh1ZlZ4dVhHNHZLaXBjYmlBcUlGSmxiVzkyWlhNZ1lXeHNJR3RsZVMxMllXeDFaU0JsYm5SeWFXVnpJR1p5YjIwZ2RHaGxJSE4wWVdOckxseHVJQ3BjYmlBcUlFQndjbWwyWVhSbFhHNGdLaUJBYm1GdFpTQmpiR1ZoY2x4dUlDb2dRRzFsYldKbGNrOW1JRk4wWVdOclhHNGdLaTljYm1aMWJtTjBhVzl1SUhOMFlXTnJRMnhsWVhJb0tTQjdYRzRnSUhSb2FYTXVYMTlrWVhSaFgxOGdQU0J1WlhjZ1RHbHpkRU5oWTJobE8xeHVmVnh1WEc0dktpcGNiaUFxSUZKbGJXOTJaWE1nWUd0bGVXQWdZVzVrSUdsMGN5QjJZV3gxWlNCbWNtOXRJSFJvWlNCemRHRmpheTVjYmlBcVhHNGdLaUJBY0hKcGRtRjBaVnh1SUNvZ1FHNWhiV1VnWkdWc1pYUmxYRzRnS2lCQWJXVnRZbVZ5VDJZZ1UzUmhZMnRjYmlBcUlFQndZWEpoYlNCN2MzUnlhVzVuZlNCclpYa2dWR2hsSUd0bGVTQnZaaUIwYUdVZ2RtRnNkV1VnZEc4Z2NtVnRiM1psTGx4dUlDb2dRSEpsZEhWeWJuTWdlMkp2YjJ4bFlXNTlJRkpsZEhWeWJuTWdZSFJ5ZFdWZ0lHbG1JSFJvWlNCbGJuUnllU0IzWVhNZ2NtVnRiM1psWkN3Z1pXeHpaU0JnWm1Gc2MyVmdMbHh1SUNvdlhHNW1kVzVqZEdsdmJpQnpkR0ZqYTBSbGJHVjBaU2hyWlhrcElIdGNiaUFnY21WMGRYSnVJSFJvYVhNdVgxOWtZWFJoWDE5YkoyUmxiR1YwWlNkZEtHdGxlU2s3WEc1OVhHNWNiaThxS2x4dUlDb2dSMlYwY3lCMGFHVWdjM1JoWTJzZ2RtRnNkV1VnWm05eUlHQnJaWGxnTGx4dUlDcGNiaUFxSUVCd2NtbDJZWFJsWEc0Z0tpQkFibUZ0WlNCblpYUmNiaUFxSUVCdFpXMWlaWEpQWmlCVGRHRmphMXh1SUNvZ1FIQmhjbUZ0SUh0emRISnBibWQ5SUd0bGVTQlVhR1VnYTJWNUlHOW1JSFJvWlNCMllXeDFaU0IwYnlCblpYUXVYRzRnS2lCQWNtVjBkWEp1Y3lCN0tuMGdVbVYwZFhKdWN5QjBhR1VnWlc1MGNua2dkbUZzZFdVdVhHNGdLaTljYm1aMWJtTjBhVzl1SUhOMFlXTnJSMlYwS0d0bGVTa2dlMXh1SUNCeVpYUjFjbTRnZEdocGN5NWZYMlJoZEdGZlh5NW5aWFFvYTJWNUtUdGNibjFjYmx4dUx5b3FYRzRnS2lCRGFHVmphM01nYVdZZ1lTQnpkR0ZqYXlCMllXeDFaU0JtYjNJZ1lHdGxlV0FnWlhocGMzUnpMbHh1SUNwY2JpQXFJRUJ3Y21sMllYUmxYRzRnS2lCQWJtRnRaU0JvWVhOY2JpQXFJRUJ0WlcxaVpYSlBaaUJUZEdGamExeHVJQ29nUUhCaGNtRnRJSHR6ZEhKcGJtZDlJR3RsZVNCVWFHVWdhMlY1SUc5bUlIUm9aU0JsYm5SeWVTQjBieUJqYUdWamF5NWNiaUFxSUVCeVpYUjFjbTV6SUh0aWIyOXNaV0Z1ZlNCU1pYUjFjbTV6SUdCMGNuVmxZQ0JwWmlCaGJpQmxiblJ5ZVNCbWIzSWdZR3RsZVdBZ1pYaHBjM1J6TENCbGJITmxJR0JtWVd4elpXQXVYRzRnS2k5Y2JtWjFibU4wYVc5dUlITjBZV05yU0dGektHdGxlU2tnZTF4dUlDQnlaWFIxY200Z2RHaHBjeTVmWDJSaGRHRmZYeTVvWVhNb2EyVjVLVHRjYm4xY2JseHVMeW9xWEc0Z0tpQlRaWFJ6SUhSb1pTQnpkR0ZqYXlCZ2EyVjVZQ0IwYnlCZ2RtRnNkV1ZnTGx4dUlDcGNiaUFxSUVCd2NtbDJZWFJsWEc0Z0tpQkFibUZ0WlNCelpYUmNiaUFxSUVCdFpXMWlaWEpQWmlCVGRHRmphMXh1SUNvZ1FIQmhjbUZ0SUh0emRISnBibWQ5SUd0bGVTQlVhR1VnYTJWNUlHOW1JSFJvWlNCMllXeDFaU0IwYnlCelpYUXVYRzRnS2lCQWNHRnlZVzBnZXlwOUlIWmhiSFZsSUZSb1pTQjJZV3gxWlNCMGJ5QnpaWFF1WEc0Z0tpQkFjbVYwZFhKdWN5QjdUMkpxWldOMGZTQlNaWFIxY201eklIUm9aU0J6ZEdGamF5QmpZV05vWlNCcGJuTjBZVzVqWlM1Y2JpQXFMMXh1Wm5WdVkzUnBiMjRnYzNSaFkydFRaWFFvYTJWNUxDQjJZV3gxWlNrZ2UxeHVJQ0IyWVhJZ1kyRmphR1VnUFNCMGFHbHpMbDlmWkdGMFlWOWZPMXh1SUNCcFppQW9ZMkZqYUdVZ2FXNXpkR0Z1WTJWdlppQk1hWE4wUTJGamFHVXBJSHRjYmlBZ0lDQjJZWElnY0dGcGNuTWdQU0JqWVdOb1pTNWZYMlJoZEdGZlh6dGNiaUFnSUNCcFppQW9JVTFoY0NCOGZDQW9jR0ZwY25NdWJHVnVaM1JvSUR3Z1RFRlNSMFZmUVZKU1FWbGZVMGxhUlNBdElERXBLU0I3WEc0Z0lDQWdJQ0J3WVdseWN5NXdkWE5vS0Z0clpYa3NJSFpoYkhWbFhTazdYRzRnSUNBZ0lDQnlaWFIxY200Z2RHaHBjenRjYmlBZ0lDQjlYRzRnSUNBZ1kyRmphR1VnUFNCMGFHbHpMbDlmWkdGMFlWOWZJRDBnYm1WM0lFMWhjRU5oWTJobEtIQmhhWEp6S1R0Y2JpQWdmVnh1SUNCallXTm9aUzV6WlhRb2EyVjVMQ0IyWVd4MVpTazdYRzRnSUhKbGRIVnliaUIwYUdsek8xeHVmVnh1WEc0dkx5QkJaR1FnYldWMGFHOWtjeUIwYnlCZ1UzUmhZMnRnTGx4dVUzUmhZMnN1Y0hKdmRHOTBlWEJsTG1Oc1pXRnlJRDBnYzNSaFkydERiR1ZoY2p0Y2JsTjBZV05yTG5CeWIzUnZkSGx3WlZzblpHVnNaWFJsSjEwZ1BTQnpkR0ZqYTBSbGJHVjBaVHRjYmxOMFlXTnJMbkJ5YjNSdmRIbHdaUzVuWlhRZ1BTQnpkR0ZqYTBkbGREdGNibE4wWVdOckxuQnliM1J2ZEhsd1pTNW9ZWE1nUFNCemRHRmphMGhoY3p0Y2JsTjBZV05yTG5CeWIzUnZkSGx3WlM1elpYUWdQU0J6ZEdGamExTmxkRHRjYmx4dUx5b3FYRzRnS2lCRGNtVmhkR1Z6SUdGdUlHRnljbUY1SUc5bUlIUm9aU0JsYm5WdFpYSmhZbXhsSUhCeWIzQmxjblI1SUc1aGJXVnpJRzltSUhSb1pTQmhjbkpoZVMxc2FXdGxJR0IyWVd4MVpXQXVYRzRnS2x4dUlDb2dRSEJ5YVhaaGRHVmNiaUFxSUVCd1lYSmhiU0I3S24wZ2RtRnNkV1VnVkdobElIWmhiSFZsSUhSdklIRjFaWEo1TGx4dUlDb2dRSEJoY21GdElIdGliMjlzWldGdWZTQnBibWhsY21sMFpXUWdVM0JsWTJsbWVTQnlaWFIxY201cGJtY2dhVzVvWlhKcGRHVmtJSEJ5YjNCbGNuUjVJRzVoYldWekxseHVJQ29nUUhKbGRIVnlibk1nZTBGeWNtRjVmU0JTWlhSMWNtNXpJSFJvWlNCaGNuSmhlU0J2WmlCd2NtOXdaWEowZVNCdVlXMWxjeTVjYmlBcUwxeHVablZ1WTNScGIyNGdZWEp5WVhsTWFXdGxTMlY1Y3loMllXeDFaU3dnYVc1b1pYSnBkR1ZrS1NCN1hHNGdJQzh2SUZOaFptRnlhU0E0TGpFZ2JXRnJaWE1nWUdGeVozVnRaVzUwY3k1allXeHNaV1ZnSUdWdWRXMWxjbUZpYkdVZ2FXNGdjM1J5YVdOMElHMXZaR1V1WEc0Z0lDOHZJRk5oWm1GeWFTQTVJRzFoYTJWeklHQmhjbWQxYldWdWRITXViR1Z1WjNSb1lDQmxiblZ0WlhKaFlteGxJR2x1SUhOMGNtbGpkQ0J0YjJSbExseHVJQ0IyWVhJZ2NtVnpkV3gwSUQwZ0tHbHpRWEp5WVhrb2RtRnNkV1VwSUh4OElHbHpRWEpuZFcxbGJuUnpLSFpoYkhWbEtTbGNiaUFnSUNBL0lHSmhjMlZVYVcxbGN5aDJZV3gxWlM1c1pXNW5kR2dzSUZOMGNtbHVaeWxjYmlBZ0lDQTZJRnRkTzF4dVhHNGdJSFpoY2lCc1pXNW5kR2dnUFNCeVpYTjFiSFF1YkdWdVozUm9MRnh1SUNBZ0lDQWdjMnRwY0VsdVpHVjRaWE1nUFNBaElXeGxibWQwYUR0Y2JseHVJQ0JtYjNJZ0tIWmhjaUJyWlhrZ2FXNGdkbUZzZFdVcElIdGNiaUFnSUNCcFppQW9LR2x1YUdWeWFYUmxaQ0I4ZkNCb1lYTlBkMjVRY205d1pYSjBlUzVqWVd4c0tIWmhiSFZsTENCclpYa3BLU0FtSmx4dUlDQWdJQ0FnSUNBaEtITnJhWEJKYm1SbGVHVnpJQ1ltSUNoclpYa2dQVDBnSjJ4bGJtZDBhQ2NnZkh3Z2FYTkpibVJsZUNoclpYa3NJR3hsYm1kMGFDa3BLU2tnZTF4dUlDQWdJQ0FnY21WemRXeDBMbkIxYzJnb2EyVjVLVHRjYmlBZ0lDQjlYRzRnSUgxY2JpQWdjbVYwZFhKdUlISmxjM1ZzZER0Y2JuMWNibHh1THlvcVhHNGdLaUJVYUdseklHWjFibU4wYVc5dUlHbHpJR3hwYTJVZ1lHRnpjMmxuYmxaaGJIVmxZQ0JsZUdObGNIUWdkR2hoZENCcGRDQmtiMlZ6YmlkMElHRnpjMmxuYmx4dUlDb2dZSFZ1WkdWbWFXNWxaR0FnZG1Gc2RXVnpMbHh1SUNwY2JpQXFJRUJ3Y21sMllYUmxYRzRnS2lCQWNHRnlZVzBnZTA5aWFtVmpkSDBnYjJKcVpXTjBJRlJvWlNCdlltcGxZM1FnZEc4Z2JXOWthV1o1TGx4dUlDb2dRSEJoY21GdElIdHpkSEpwYm1kOUlHdGxlU0JVYUdVZ2EyVjVJRzltSUhSb1pTQndjbTl3WlhKMGVTQjBieUJoYzNOcFoyNHVYRzRnS2lCQWNHRnlZVzBnZXlwOUlIWmhiSFZsSUZSb1pTQjJZV3gxWlNCMGJ5QmhjM05wWjI0dVhHNGdLaTljYm1aMWJtTjBhVzl1SUdGemMybG5iazFsY21kbFZtRnNkV1VvYjJKcVpXTjBMQ0JyWlhrc0lIWmhiSFZsS1NCN1hHNGdJR2xtSUNnb2RtRnNkV1VnSVQwOUlIVnVaR1ZtYVc1bFpDQW1KaUFoWlhFb2IySnFaV04wVzJ0bGVWMHNJSFpoYkhWbEtTa2dmSHhjYmlBZ0lDQWdJQ2gwZVhCbGIyWWdhMlY1SUQwOUlDZHVkVzFpWlhJbklDWW1JSFpoYkhWbElEMDlQU0IxYm1SbFptbHVaV1FnSmlZZ0lTaHJaWGtnYVc0Z2IySnFaV04wS1NrcElIdGNiaUFnSUNCdlltcGxZM1JiYTJWNVhTQTlJSFpoYkhWbE8xeHVJQ0I5WEc1OVhHNWNiaThxS2x4dUlDb2dRWE56YVdkdWN5QmdkbUZzZFdWZ0lIUnZJR0JyWlhsZ0lHOW1JR0J2WW1wbFkzUmdJR2xtSUhSb1pTQmxlR2x6ZEdsdVp5QjJZV3gxWlNCcGN5QnViM1FnWlhGMWFYWmhiR1Z1ZEZ4dUlDb2dkWE5wYm1jZ1cyQlRZVzFsVm1Gc2RXVmFaWEp2WUYwb2FIUjBjRG92TDJWamJXRXRhVzUwWlhKdVlYUnBiMjVoYkM1dmNtY3ZaV050WVMweU5qSXZOeTR3THlOelpXTXRjMkZ0WlhaaGJIVmxlbVZ5YnlsY2JpQXFJR1p2Y2lCbGNYVmhiR2wwZVNCamIyMXdZWEpwYzI5dWN5NWNiaUFxWEc0Z0tpQkFjSEpwZG1GMFpWeHVJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJRzlpYW1WamRDQlVhR1VnYjJKcVpXTjBJSFJ2SUcxdlpHbG1lUzVjYmlBcUlFQndZWEpoYlNCN2MzUnlhVzVuZlNCclpYa2dWR2hsSUd0bGVTQnZaaUIwYUdVZ2NISnZjR1Z5ZEhrZ2RHOGdZWE56YVdkdUxseHVJQ29nUUhCaGNtRnRJSHNxZlNCMllXeDFaU0JVYUdVZ2RtRnNkV1VnZEc4Z1lYTnphV2R1TGx4dUlDb3ZYRzVtZFc1amRHbHZiaUJoYzNOcFoyNVdZV3gxWlNodlltcGxZM1FzSUd0bGVTd2dkbUZzZFdVcElIdGNiaUFnZG1GeUlHOWlhbFpoYkhWbElEMGdiMkpxWldOMFcydGxlVjA3WEc0Z0lHbG1JQ2doS0doaGMwOTNibEJ5YjNCbGNuUjVMbU5oYkd3b2IySnFaV04wTENCclpYa3BJQ1ltSUdWeEtHOWlhbFpoYkhWbExDQjJZV3gxWlNrcElIeDhYRzRnSUNBZ0lDQW9kbUZzZFdVZ1BUMDlJSFZ1WkdWbWFXNWxaQ0FtSmlBaEtHdGxlU0JwYmlCdlltcGxZM1FwS1NrZ2UxeHVJQ0FnSUc5aWFtVmpkRnRyWlhsZElEMGdkbUZzZFdVN1hHNGdJSDFjYm4xY2JseHVMeW9xWEc0Z0tpQkhaWFJ6SUhSb1pTQnBibVJsZUNCaGRDQjNhR2xqYUNCMGFHVWdZR3RsZVdBZ2FYTWdabTkxYm1RZ2FXNGdZR0Z5Y21GNVlDQnZaaUJyWlhrdGRtRnNkV1VnY0dGcGNuTXVYRzRnS2x4dUlDb2dRSEJ5YVhaaGRHVmNiaUFxSUVCd1lYSmhiU0I3UVhKeVlYbDlJR0Z5Y21GNUlGUm9aU0JoY25KaGVTQjBieUJwYm5Od1pXTjBMbHh1SUNvZ1FIQmhjbUZ0SUhzcWZTQnJaWGtnVkdobElHdGxlU0IwYnlCelpXRnlZMmdnWm05eUxseHVJQ29nUUhKbGRIVnlibk1nZTI1MWJXSmxjbjBnVW1WMGRYSnVjeUIwYUdVZ2FXNWtaWGdnYjJZZ2RHaGxJRzFoZEdOb1pXUWdkbUZzZFdVc0lHVnNjMlVnWUMweFlDNWNiaUFxTDF4dVpuVnVZM1JwYjI0Z1lYTnpiMk5KYm1SbGVFOW1LR0Z5Y21GNUxDQnJaWGtwSUh0Y2JpQWdkbUZ5SUd4bGJtZDBhQ0E5SUdGeWNtRjVMbXhsYm1kMGFEdGNiaUFnZDJocGJHVWdLR3hsYm1kMGFDMHRLU0I3WEc0Z0lDQWdhV1lnS0dWeEtHRnljbUY1VzJ4bGJtZDBhRjFiTUYwc0lHdGxlU2twSUh0Y2JpQWdJQ0FnSUhKbGRIVnliaUJzWlc1bmRHZzdYRzRnSUNBZ2ZWeHVJQ0I5WEc0Z0lISmxkSFZ5YmlBdE1UdGNibjFjYmx4dUx5b3FYRzRnS2lCVWFHVWdZbUZ6WlNCcGJYQnNaVzFsYm5SaGRHbHZiaUJ2WmlCZ1h5NWhjM05wWjI1Z0lIZHBkR2h2ZFhRZ2MzVndjRzl5ZENCbWIzSWdiWFZzZEdsd2JHVWdjMjkxY21ObGMxeHVJQ29nYjNJZ1lHTjFjM1J2YldsNlpYSmdJR1oxYm1OMGFXOXVjeTVjYmlBcVhHNGdLaUJBY0hKcGRtRjBaVnh1SUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I5SUc5aWFtVmpkQ0JVYUdVZ1pHVnpkR2x1WVhScGIyNGdiMkpxWldOMExseHVJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJSE52ZFhKalpTQlVhR1VnYzI5MWNtTmxJRzlpYW1WamRDNWNiaUFxSUVCeVpYUjFjbTV6SUh0UFltcGxZM1I5SUZKbGRIVnlibk1nWUc5aWFtVmpkR0F1WEc0Z0tpOWNibVoxYm1OMGFXOXVJR0poYzJWQmMzTnBaMjRvYjJKcVpXTjBMQ0J6YjNWeVkyVXBJSHRjYmlBZ2NtVjBkWEp1SUc5aWFtVmpkQ0FtSmlCamIzQjVUMkpxWldOMEtITnZkWEpqWlN3Z2EyVjVjeWh6YjNWeVkyVXBMQ0J2WW1wbFkzUXBPMXh1ZlZ4dVhHNHZLaXBjYmlBcUlGUm9aU0JpWVhObElHbHRjR3hsYldWdWRHRjBhVzl1SUc5bUlHQmZMbU5zYjI1bFlDQmhibVFnWUY4dVkyeHZibVZFWldWd1lDQjNhR2xqYUNCMGNtRmphM05jYmlBcUlIUnlZWFpsY25ObFpDQnZZbXBsWTNSekxseHVJQ3BjYmlBcUlFQndjbWwyWVhSbFhHNGdLaUJBY0dGeVlXMGdleXA5SUhaaGJIVmxJRlJvWlNCMllXeDFaU0IwYnlCamJHOXVaUzVjYmlBcUlFQndZWEpoYlNCN1ltOXZiR1ZoYm4wZ1cybHpSR1ZsY0YwZ1UzQmxZMmxtZVNCaElHUmxaWEFnWTJ4dmJtVXVYRzRnS2lCQWNHRnlZVzBnZTJKdmIyeGxZVzU5SUZ0cGMwWjFiR3hkSUZOd1pXTnBabmtnWVNCamJHOXVaU0JwYm1Oc2RXUnBibWNnYzNsdFltOXNjeTVjYmlBcUlFQndZWEpoYlNCN1JuVnVZM1JwYjI1OUlGdGpkWE4wYjIxcGVtVnlYU0JVYUdVZ1puVnVZM1JwYjI0Z2RHOGdZM1Z6ZEc5dGFYcGxJR05zYjI1cGJtY3VYRzRnS2lCQWNHRnlZVzBnZTNOMGNtbHVaMzBnVzJ0bGVWMGdWR2hsSUd0bGVTQnZaaUJnZG1Gc2RXVmdMbHh1SUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I5SUZ0dlltcGxZM1JkSUZSb1pTQndZWEpsYm5RZ2IySnFaV04wSUc5bUlHQjJZV3gxWldBdVhHNGdLaUJBY0dGeVlXMGdlMDlpYW1WamRIMGdXM04wWVdOclhTQlVjbUZqYTNNZ2RISmhkbVZ5YzJWa0lHOWlhbVZqZEhNZ1lXNWtJSFJvWldseUlHTnNiMjVsSUdOdmRXNTBaWEp3WVhKMGN5NWNiaUFxSUVCeVpYUjFjbTV6SUhzcWZTQlNaWFIxY201eklIUm9aU0JqYkc5dVpXUWdkbUZzZFdVdVhHNGdLaTljYm1aMWJtTjBhVzl1SUdKaGMyVkRiRzl1WlNoMllXeDFaU3dnYVhORVpXVndMQ0JwYzBaMWJHd3NJR04xYzNSdmJXbDZaWElzSUd0bGVTd2diMkpxWldOMExDQnpkR0ZqYXlrZ2UxeHVJQ0IyWVhJZ2NtVnpkV3gwTzF4dUlDQnBaaUFvWTNWemRHOXRhWHBsY2lrZ2UxeHVJQ0FnSUhKbGMzVnNkQ0E5SUc5aWFtVmpkQ0EvSUdOMWMzUnZiV2w2WlhJb2RtRnNkV1VzSUd0bGVTd2diMkpxWldOMExDQnpkR0ZqYXlrZ09pQmpkWE4wYjIxcGVtVnlLSFpoYkhWbEtUdGNiaUFnZlZ4dUlDQnBaaUFvY21WemRXeDBJQ0U5UFNCMWJtUmxabWx1WldRcElIdGNiaUFnSUNCeVpYUjFjbTRnY21WemRXeDBPMXh1SUNCOVhHNGdJR2xtSUNnaGFYTlBZbXBsWTNRb2RtRnNkV1VwS1NCN1hHNGdJQ0FnY21WMGRYSnVJSFpoYkhWbE8xeHVJQ0I5WEc0Z0lIWmhjaUJwYzBGeWNpQTlJR2x6UVhKeVlYa29kbUZzZFdVcE8xeHVJQ0JwWmlBb2FYTkJjbklwSUh0Y2JpQWdJQ0J5WlhOMWJIUWdQU0JwYm1sMFEyeHZibVZCY25KaGVTaDJZV3gxWlNrN1hHNGdJQ0FnYVdZZ0tDRnBjMFJsWlhBcElIdGNiaUFnSUNBZ0lISmxkSFZ5YmlCamIzQjVRWEp5WVhrb2RtRnNkV1VzSUhKbGMzVnNkQ2s3WEc0Z0lDQWdmVnh1SUNCOUlHVnNjMlVnZTF4dUlDQWdJSFpoY2lCMFlXY2dQU0JuWlhSVVlXY29kbUZzZFdVcExGeHVJQ0FnSUNBZ0lDQnBjMFoxYm1NZ1BTQjBZV2NnUFQwZ1puVnVZMVJoWnlCOGZDQjBZV2NnUFQwZ1oyVnVWR0ZuTzF4dVhHNGdJQ0FnYVdZZ0tHbHpRblZtWm1WeUtIWmhiSFZsS1NrZ2UxeHVJQ0FnSUNBZ2NtVjBkWEp1SUdOc2IyNWxRblZtWm1WeUtIWmhiSFZsTENCcGMwUmxaWEFwTzF4dUlDQWdJSDFjYmlBZ0lDQnBaaUFvZEdGbklEMDlJRzlpYW1WamRGUmhaeUI4ZkNCMFlXY2dQVDBnWVhKbmMxUmhaeUI4ZkNBb2FYTkdkVzVqSUNZbUlDRnZZbXBsWTNRcEtTQjdYRzRnSUNBZ0lDQnBaaUFvYVhOSWIzTjBUMkpxWldOMEtIWmhiSFZsS1NrZ2UxeHVJQ0FnSUNBZ0lDQnlaWFIxY200Z2IySnFaV04wSUQ4Z2RtRnNkV1VnT2lCN2ZUdGNiaUFnSUNBZ0lIMWNiaUFnSUNBZ0lISmxjM1ZzZENBOUlHbHVhWFJEYkc5dVpVOWlhbVZqZENocGMwWjFibU1nUHlCN2ZTQTZJSFpoYkhWbEtUdGNiaUFnSUNBZ0lHbG1JQ2doYVhORVpXVndLU0I3WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUJqYjNCNVUzbHRZbTlzY3loMllXeDFaU3dnWW1GelpVRnpjMmxuYmloeVpYTjFiSFFzSUhaaGJIVmxLU2s3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lHbG1JQ2doWTJ4dmJtVmhZbXhsVkdGbmMxdDBZV2RkS1NCN1hHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCdlltcGxZM1FnUHlCMllXeDFaU0E2SUh0OU8xeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ2NtVnpkV3gwSUQwZ2FXNXBkRU5zYjI1bFFubFVZV2NvZG1Gc2RXVXNJSFJoWnl3Z1ltRnpaVU5zYjI1bExDQnBjMFJsWlhBcE8xeHVJQ0FnSUgxY2JpQWdmVnh1SUNBdkx5QkRhR1ZqYXlCbWIzSWdZMmx5WTNWc1lYSWdjbVZtWlhKbGJtTmxjeUJoYm1RZ2NtVjBkWEp1SUdsMGN5QmpiM0p5WlhOd2IyNWthVzVuSUdOc2IyNWxMbHh1SUNCemRHRmpheUI4ZkNBb2MzUmhZMnNnUFNCdVpYY2dVM1JoWTJzcE8xeHVJQ0IyWVhJZ2MzUmhZMnRsWkNBOUlITjBZV05yTG1kbGRDaDJZV3gxWlNrN1hHNGdJR2xtSUNoemRHRmphMlZrS1NCN1hHNGdJQ0FnY21WMGRYSnVJSE4wWVdOclpXUTdYRzRnSUgxY2JpQWdjM1JoWTJzdWMyVjBLSFpoYkhWbExDQnlaWE4xYkhRcE8xeHVYRzRnSUdsbUlDZ2hhWE5CY25JcElIdGNiaUFnSUNCMllYSWdjSEp2Y0hNZ1BTQnBjMFoxYkd3Z1B5Qm5aWFJCYkd4TFpYbHpLSFpoYkhWbEtTQTZJR3RsZVhNb2RtRnNkV1VwTzF4dUlDQjlYRzRnSUdGeWNtRjVSV0ZqYUNod2NtOXdjeUI4ZkNCMllXeDFaU3dnWm5WdVkzUnBiMjRvYzNWaVZtRnNkV1VzSUd0bGVTa2dlMXh1SUNBZ0lHbG1JQ2h3Y205d2N5a2dlMXh1SUNBZ0lDQWdhMlY1SUQwZ2MzVmlWbUZzZFdVN1hHNGdJQ0FnSUNCemRXSldZV3gxWlNBOUlIWmhiSFZsVzJ0bGVWMDdYRzRnSUNBZ2ZWeHVJQ0FnSUM4dklGSmxZM1Z5YzJsMlpXeDVJSEJ2Y0hWc1lYUmxJR05zYjI1bElDaHpkWE5qWlhCMGFXSnNaU0IwYnlCallXeHNJSE4wWVdOcklHeHBiV2wwY3lrdVhHNGdJQ0FnWVhOemFXZHVWbUZzZFdVb2NtVnpkV3gwTENCclpYa3NJR0poYzJWRGJHOXVaU2h6ZFdKV1lXeDFaU3dnYVhORVpXVndMQ0JwYzBaMWJHd3NJR04xYzNSdmJXbDZaWElzSUd0bGVTd2dkbUZzZFdVc0lITjBZV05yS1NrN1hHNGdJSDBwTzF4dUlDQnlaWFIxY200Z2NtVnpkV3gwTzF4dWZWeHVYRzR2S2lwY2JpQXFJRlJvWlNCaVlYTmxJR2x0Y0d4bGJXVnVkR0YwYVc5dUlHOW1JR0JmTG1OeVpXRjBaV0FnZDJsMGFHOTFkQ0J6ZFhCd2IzSjBJR1p2Y2lCaGMzTnBaMjVwYm1kY2JpQXFJSEJ5YjNCbGNuUnBaWE1nZEc4Z2RHaGxJR055WldGMFpXUWdiMkpxWldOMExseHVJQ3BjYmlBcUlFQndjbWwyWVhSbFhHNGdLaUJBY0dGeVlXMGdlMDlpYW1WamRIMGdjSEp2ZEc5MGVYQmxJRlJvWlNCdlltcGxZM1FnZEc4Z2FXNW9aWEpwZENCbWNtOXRMbHh1SUNvZ1FISmxkSFZ5Ym5NZ2UwOWlhbVZqZEgwZ1VtVjBkWEp1Y3lCMGFHVWdibVYzSUc5aWFtVmpkQzVjYmlBcUwxeHVablZ1WTNScGIyNGdZbUZ6WlVOeVpXRjBaU2h3Y205MGJ5a2dlMXh1SUNCeVpYUjFjbTRnYVhOUFltcGxZM1FvY0hKdmRHOHBJRDhnYjJKcVpXTjBRM0psWVhSbEtIQnliM1J2S1NBNklIdDlPMXh1ZlZ4dVhHNHZLaXBjYmlBcUlGUm9aU0JpWVhObElHbHRjR3hsYldWdWRHRjBhVzl1SUc5bUlHQm5aWFJCYkd4TFpYbHpZQ0JoYm1RZ1lHZGxkRUZzYkV0bGVYTkpibUFnZDJocFkyZ2dkWE5sYzF4dUlDb2dZR3RsZVhOR2RXNWpZQ0JoYm1RZ1lITjViV0p2YkhOR2RXNWpZQ0IwYnlCblpYUWdkR2hsSUdWdWRXMWxjbUZpYkdVZ2NISnZjR1Z5ZEhrZ2JtRnRaWE1nWVc1a1hHNGdLaUJ6ZVcxaWIyeHpJRzltSUdCdlltcGxZM1JnTGx4dUlDcGNiaUFxSUVCd2NtbDJZWFJsWEc0Z0tpQkFjR0Z5WVcwZ2UwOWlhbVZqZEgwZ2IySnFaV04wSUZSb1pTQnZZbXBsWTNRZ2RHOGdjWFZsY25rdVhHNGdLaUJBY0dGeVlXMGdlMFoxYm1OMGFXOXVmU0JyWlhselJuVnVZeUJVYUdVZ1puVnVZM1JwYjI0Z2RHOGdaMlYwSUhSb1pTQnJaWGx6SUc5bUlHQnZZbXBsWTNSZ0xseHVJQ29nUUhCaGNtRnRJSHRHZFc1amRHbHZibjBnYzNsdFltOXNjMFoxYm1NZ1ZHaGxJR1oxYm1OMGFXOXVJSFJ2SUdkbGRDQjBhR1VnYzNsdFltOXNjeUJ2WmlCZ2IySnFaV04wWUM1Y2JpQXFJRUJ5WlhSMWNtNXpJSHRCY25KaGVYMGdVbVYwZFhKdWN5QjBhR1VnWVhKeVlYa2diMllnY0hKdmNHVnlkSGtnYm1GdFpYTWdZVzVrSUhONWJXSnZiSE11WEc0Z0tpOWNibVoxYm1OMGFXOXVJR0poYzJWSFpYUkJiR3hMWlhsektHOWlhbVZqZEN3Z2EyVjVjMFoxYm1Nc0lITjViV0p2YkhOR2RXNWpLU0I3WEc0Z0lIWmhjaUJ5WlhOMWJIUWdQU0JyWlhselJuVnVZeWh2WW1wbFkzUXBPMXh1SUNCeVpYUjFjbTRnYVhOQmNuSmhlU2h2WW1wbFkzUXBJRDhnY21WemRXeDBJRG9nWVhKeVlYbFFkWE5vS0hKbGMzVnNkQ3dnYzNsdFltOXNjMFoxYm1Nb2IySnFaV04wS1NrN1hHNTlYRzVjYmk4cUtseHVJQ29nVkdobElHSmhjMlVnYVcxd2JHVnRaVzUwWVhScGIyNGdiMllnWUdkbGRGUmhaMkF1WEc0Z0tseHVJQ29nUUhCeWFYWmhkR1ZjYmlBcUlFQndZWEpoYlNCN0tuMGdkbUZzZFdVZ1ZHaGxJSFpoYkhWbElIUnZJSEYxWlhKNUxseHVJQ29nUUhKbGRIVnlibk1nZTNOMGNtbHVaMzBnVW1WMGRYSnVjeUIwYUdVZ1lIUnZVM1J5YVc1blZHRm5ZQzVjYmlBcUwxeHVablZ1WTNScGIyNGdZbUZ6WlVkbGRGUmhaeWgyWVd4MVpTa2dlMXh1SUNCeVpYUjFjbTRnYjJKcVpXTjBWRzlUZEhKcGJtY3VZMkZzYkNoMllXeDFaU2s3WEc1OVhHNWNiaThxS2x4dUlDb2dWR2hsSUdKaGMyVWdhVzF3YkdWdFpXNTBZWFJwYjI0Z2IyWWdZRjh1YVhOT1lYUnBkbVZnSUhkcGRHaHZkWFFnWW1Ga0lITm9hVzBnWTJobFkydHpMbHh1SUNwY2JpQXFJRUJ3Y21sMllYUmxYRzRnS2lCQWNHRnlZVzBnZXlwOUlIWmhiSFZsSUZSb1pTQjJZV3gxWlNCMGJ5QmphR1ZqYXk1Y2JpQXFJRUJ5WlhSMWNtNXpJSHRpYjI5c1pXRnVmU0JTWlhSMWNtNXpJR0IwY25WbFlDQnBaaUJnZG1Gc2RXVmdJR2x6SUdFZ2JtRjBhWFpsSUdaMWJtTjBhVzl1TEZ4dUlDb2dJR1ZzYzJVZ1lHWmhiSE5sWUM1Y2JpQXFMMXh1Wm5WdVkzUnBiMjRnWW1GelpVbHpUbUYwYVhabEtIWmhiSFZsS1NCN1hHNGdJR2xtSUNnaGFYTlBZbXBsWTNRb2RtRnNkV1VwSUh4OElHbHpUV0Z6YTJWa0tIWmhiSFZsS1NrZ2UxeHVJQ0FnSUhKbGRIVnliaUJtWVd4elpUdGNiaUFnZlZ4dUlDQjJZWElnY0dGMGRHVnliaUE5SUNocGMwWjFibU4wYVc5dUtIWmhiSFZsS1NCOGZDQnBjMGh2YzNSUFltcGxZM1FvZG1Gc2RXVXBLU0EvSUhKbFNYTk9ZWFJwZG1VZ09pQnlaVWx6U0c5emRFTjBiM0k3WEc0Z0lISmxkSFZ5YmlCd1lYUjBaWEp1TG5SbGMzUW9kRzlUYjNWeVkyVW9kbUZzZFdVcEtUdGNibjFjYmx4dUx5b3FYRzRnS2lCVWFHVWdZbUZ6WlNCcGJYQnNaVzFsYm5SaGRHbHZiaUJ2WmlCZ1h5NXBjMVI1Y0dWa1FYSnlZWGxnSUhkcGRHaHZkWFFnVG05a1pTNXFjeUJ2Y0hScGJXbDZZWFJwYjI1ekxseHVJQ3BjYmlBcUlFQndjbWwyWVhSbFhHNGdLaUJBY0dGeVlXMGdleXA5SUhaaGJIVmxJRlJvWlNCMllXeDFaU0IwYnlCamFHVmpheTVjYmlBcUlFQnlaWFIxY201eklIdGliMjlzWldGdWZTQlNaWFIxY201eklHQjBjblZsWUNCcFppQmdkbUZzZFdWZ0lHbHpJR0VnZEhsd1pXUWdZWEp5WVhrc0lHVnNjMlVnWUdaaGJITmxZQzVjYmlBcUwxeHVablZ1WTNScGIyNGdZbUZ6WlVselZIbHdaV1JCY25KaGVTaDJZV3gxWlNrZ2UxeHVJQ0J5WlhSMWNtNGdhWE5QWW1wbFkzUk1hV3RsS0haaGJIVmxLU0FtSmx4dUlDQWdJR2x6VEdWdVozUm9LSFpoYkhWbExteGxibWQwYUNrZ0ppWWdJU0YwZVhCbFpFRnljbUY1VkdGbmMxdHZZbXBsWTNSVWIxTjBjbWx1Wnk1allXeHNLSFpoYkhWbEtWMDdYRzU5WEc1Y2JpOHFLbHh1SUNvZ1ZHaGxJR0poYzJVZ2FXMXdiR1Z0Wlc1MFlYUnBiMjRnYjJZZ1lGOHVhMlY1YzJBZ2QyaHBZMmdnWkc5bGMyNG5kQ0IwY21WaGRDQnpjR0Z5YzJVZ1lYSnlZWGx6SUdGeklHUmxibk5sTGx4dUlDcGNiaUFxSUVCd2NtbDJZWFJsWEc0Z0tpQkFjR0Z5WVcwZ2UwOWlhbVZqZEgwZ2IySnFaV04wSUZSb1pTQnZZbXBsWTNRZ2RHOGdjWFZsY25rdVhHNGdLaUJBY21WMGRYSnVjeUI3UVhKeVlYbDlJRkpsZEhWeWJuTWdkR2hsSUdGeWNtRjVJRzltSUhCeWIzQmxjblI1SUc1aGJXVnpMbHh1SUNvdlhHNW1kVzVqZEdsdmJpQmlZWE5sUzJWNWN5aHZZbXBsWTNRcElIdGNiaUFnYVdZZ0tDRnBjMUJ5YjNSdmRIbHdaU2h2WW1wbFkzUXBLU0I3WEc0Z0lDQWdjbVYwZFhKdUlHNWhkR2wyWlV0bGVYTW9iMkpxWldOMEtUdGNiaUFnZlZ4dUlDQjJZWElnY21WemRXeDBJRDBnVzEwN1hHNGdJR1p2Y2lBb2RtRnlJR3RsZVNCcGJpQlBZbXBsWTNRb2IySnFaV04wS1NrZ2UxeHVJQ0FnSUdsbUlDaG9ZWE5QZDI1UWNtOXdaWEowZVM1allXeHNLRzlpYW1WamRDd2dhMlY1S1NBbUppQnJaWGtnSVQwZ0oyTnZibk4wY25WamRHOXlKeWtnZTF4dUlDQWdJQ0FnY21WemRXeDBMbkIxYzJnb2EyVjVLVHRjYmlBZ0lDQjlYRzRnSUgxY2JpQWdjbVYwZFhKdUlISmxjM1ZzZER0Y2JuMWNibHh1THlvcVhHNGdLaUJVYUdVZ1ltRnpaU0JwYlhCc1pXMWxiblJoZEdsdmJpQnZaaUJnWHk1clpYbHpTVzVnSUhkb2FXTm9JR1J2WlhOdUozUWdkSEpsWVhRZ2MzQmhjbk5sSUdGeWNtRjVjeUJoY3lCa1pXNXpaUzVjYmlBcVhHNGdLaUJBY0hKcGRtRjBaVnh1SUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I5SUc5aWFtVmpkQ0JVYUdVZ2IySnFaV04wSUhSdklIRjFaWEo1TGx4dUlDb2dRSEpsZEhWeWJuTWdlMEZ5Y21GNWZTQlNaWFIxY201eklIUm9aU0JoY25KaGVTQnZaaUJ3Y205d1pYSjBlU0J1WVcxbGN5NWNiaUFxTDF4dVpuVnVZM1JwYjI0Z1ltRnpaVXRsZVhOSmJpaHZZbXBsWTNRcElIdGNiaUFnYVdZZ0tDRnBjMDlpYW1WamRDaHZZbXBsWTNRcEtTQjdYRzRnSUNBZ2NtVjBkWEp1SUc1aGRHbDJaVXRsZVhOSmJpaHZZbXBsWTNRcE8xeHVJQ0I5WEc0Z0lIWmhjaUJwYzFCeWIzUnZJRDBnYVhOUWNtOTBiM1I1Y0dVb2IySnFaV04wS1N4Y2JpQWdJQ0FnSUhKbGMzVnNkQ0E5SUZ0ZE8xeHVYRzRnSUdadmNpQW9kbUZ5SUd0bGVTQnBiaUJ2WW1wbFkzUXBJSHRjYmlBZ0lDQnBaaUFvSVNoclpYa2dQVDBnSjJOdmJuTjBjblZqZEc5eUp5QW1KaUFvYVhOUWNtOTBieUI4ZkNBaGFHRnpUM2R1VUhKdmNHVnlkSGt1WTJGc2JDaHZZbXBsWTNRc0lHdGxlU2twS1NrZ2UxeHVJQ0FnSUNBZ2NtVnpkV3gwTG5CMWMyZ29hMlY1S1R0Y2JpQWdJQ0I5WEc0Z0lIMWNiaUFnY21WMGRYSnVJSEpsYzNWc2REdGNibjFjYmx4dUx5b3FYRzRnS2lCVWFHVWdZbUZ6WlNCcGJYQnNaVzFsYm5SaGRHbHZiaUJ2WmlCZ1h5NXRaWEpuWldBZ2QybDBhRzkxZENCemRYQndiM0owSUdadmNpQnRkV3gwYVhCc1pTQnpiM1Z5WTJWekxseHVJQ3BjYmlBcUlFQndjbWwyWVhSbFhHNGdLaUJBY0dGeVlXMGdlMDlpYW1WamRIMGdiMkpxWldOMElGUm9aU0JrWlhOMGFXNWhkR2x2YmlCdlltcGxZM1F1WEc0Z0tpQkFjR0Z5WVcwZ2UwOWlhbVZqZEgwZ2MyOTFjbU5sSUZSb1pTQnpiM1Z5WTJVZ2IySnFaV04wTGx4dUlDb2dRSEJoY21GdElIdHVkVzFpWlhKOUlITnlZMGx1WkdWNElGUm9aU0JwYm1SbGVDQnZaaUJnYzI5MWNtTmxZQzVjYmlBcUlFQndZWEpoYlNCN1JuVnVZM1JwYjI1OUlGdGpkWE4wYjIxcGVtVnlYU0JVYUdVZ1puVnVZM1JwYjI0Z2RHOGdZM1Z6ZEc5dGFYcGxJRzFsY21kbFpDQjJZV3gxWlhNdVhHNGdLaUJBY0dGeVlXMGdlMDlpYW1WamRIMGdXM04wWVdOclhTQlVjbUZqYTNNZ2RISmhkbVZ5YzJWa0lITnZkWEpqWlNCMllXeDFaWE1nWVc1a0lIUm9aV2x5SUcxbGNtZGxaRnh1SUNvZ0lHTnZkVzUwWlhKd1lYSjBjeTVjYmlBcUwxeHVablZ1WTNScGIyNGdZbUZ6WlUxbGNtZGxLRzlpYW1WamRDd2djMjkxY21ObExDQnpjbU5KYm1SbGVDd2dZM1Z6ZEc5dGFYcGxjaXdnYzNSaFkyc3BJSHRjYmlBZ2FXWWdLRzlpYW1WamRDQTlQVDBnYzI5MWNtTmxLU0I3WEc0Z0lDQWdjbVYwZFhKdU8xeHVJQ0I5WEc0Z0lHbG1JQ2doS0dselFYSnlZWGtvYzI5MWNtTmxLU0I4ZkNCcGMxUjVjR1ZrUVhKeVlYa29jMjkxY21ObEtTa3BJSHRjYmlBZ0lDQjJZWElnY0hKdmNITWdQU0JpWVhObFMyVjVjMGx1S0hOdmRYSmpaU2s3WEc0Z0lIMWNiaUFnWVhKeVlYbEZZV05vS0hCeWIzQnpJSHg4SUhOdmRYSmpaU3dnWm5WdVkzUnBiMjRvYzNKalZtRnNkV1VzSUd0bGVTa2dlMXh1SUNBZ0lHbG1JQ2h3Y205d2N5a2dlMXh1SUNBZ0lDQWdhMlY1SUQwZ2MzSmpWbUZzZFdVN1hHNGdJQ0FnSUNCemNtTldZV3gxWlNBOUlITnZkWEpqWlZ0clpYbGRPMXh1SUNBZ0lIMWNiaUFnSUNCcFppQW9hWE5QWW1wbFkzUW9jM0pqVm1Gc2RXVXBLU0I3WEc0Z0lDQWdJQ0J6ZEdGamF5QjhmQ0FvYzNSaFkyc2dQU0J1WlhjZ1UzUmhZMnNwTzF4dUlDQWdJQ0FnWW1GelpVMWxjbWRsUkdWbGNDaHZZbXBsWTNRc0lITnZkWEpqWlN3Z2EyVjVMQ0J6Y21OSmJtUmxlQ3dnWW1GelpVMWxjbWRsTENCamRYTjBiMjFwZW1WeUxDQnpkR0ZqYXlrN1hHNGdJQ0FnZlZ4dUlDQWdJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ2RtRnlJRzVsZDFaaGJIVmxJRDBnWTNWemRHOXRhWHBsY2x4dUlDQWdJQ0FnSUNBL0lHTjFjM1J2YldsNlpYSW9iMkpxWldOMFcydGxlVjBzSUhOeVkxWmhiSFZsTENBb2EyVjVJQ3NnSnljcExDQnZZbXBsWTNRc0lITnZkWEpqWlN3Z2MzUmhZMnNwWEc0Z0lDQWdJQ0FnSURvZ2RXNWtaV1pwYm1Wa08xeHVYRzRnSUNBZ0lDQnBaaUFvYm1WM1ZtRnNkV1VnUFQwOUlIVnVaR1ZtYVc1bFpDa2dlMXh1SUNBZ0lDQWdJQ0J1WlhkV1lXeDFaU0E5SUhOeVkxWmhiSFZsTzF4dUlDQWdJQ0FnZlZ4dUlDQWdJQ0FnWVhOemFXZHVUV1Z5WjJWV1lXeDFaU2h2WW1wbFkzUXNJR3RsZVN3Z2JtVjNWbUZzZFdVcE8xeHVJQ0FnSUgxY2JpQWdmU2s3WEc1OVhHNWNiaThxS2x4dUlDb2dRU0J6Y0dWamFXRnNhWHBsWkNCMlpYSnphVzl1SUc5bUlHQmlZWE5sVFdWeVoyVmdJR1p2Y2lCaGNuSmhlWE1nWVc1a0lHOWlhbVZqZEhNZ2QyaHBZMmdnY0dWeVptOXliWE5jYmlBcUlHUmxaWEFnYldWeVoyVnpJR0Z1WkNCMGNtRmphM01nZEhKaGRtVnljMlZrSUc5aWFtVmpkSE1nWlc1aFlteHBibWNnYjJKcVpXTjBjeUIzYVhSb0lHTnBjbU4xYkdGeVhHNGdLaUJ5WldabGNtVnVZMlZ6SUhSdklHSmxJRzFsY21kbFpDNWNiaUFxWEc0Z0tpQkFjSEpwZG1GMFpWeHVJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJRzlpYW1WamRDQlVhR1VnWkdWemRHbHVZWFJwYjI0Z2IySnFaV04wTGx4dUlDb2dRSEJoY21GdElIdFBZbXBsWTNSOUlITnZkWEpqWlNCVWFHVWdjMjkxY21ObElHOWlhbVZqZEM1Y2JpQXFJRUJ3WVhKaGJTQjdjM1J5YVc1bmZTQnJaWGtnVkdobElHdGxlU0J2WmlCMGFHVWdkbUZzZFdVZ2RHOGdiV1Z5WjJVdVhHNGdLaUJBY0dGeVlXMGdlMjUxYldKbGNuMGdjM0pqU1c1a1pYZ2dWR2hsSUdsdVpHVjRJRzltSUdCemIzVnlZMlZnTGx4dUlDb2dRSEJoY21GdElIdEdkVzVqZEdsdmJuMGdiV1Z5WjJWR2RXNWpJRlJvWlNCbWRXNWpkR2x2YmlCMGJ5QnRaWEpuWlNCMllXeDFaWE11WEc0Z0tpQkFjR0Z5WVcwZ2UwWjFibU4wYVc5dWZTQmJZM1Z6ZEc5dGFYcGxjbDBnVkdobElHWjFibU4wYVc5dUlIUnZJR04xYzNSdmJXbDZaU0JoYzNOcFoyNWxaQ0IyWVd4MVpYTXVYRzRnS2lCQWNHRnlZVzBnZTA5aWFtVmpkSDBnVzNOMFlXTnJYU0JVY21GamEzTWdkSEpoZG1WeWMyVmtJSE52ZFhKalpTQjJZV3gxWlhNZ1lXNWtJSFJvWldseUlHMWxjbWRsWkZ4dUlDb2dJR052ZFc1MFpYSndZWEowY3k1Y2JpQXFMMXh1Wm5WdVkzUnBiMjRnWW1GelpVMWxjbWRsUkdWbGNDaHZZbXBsWTNRc0lITnZkWEpqWlN3Z2EyVjVMQ0J6Y21OSmJtUmxlQ3dnYldWeVoyVkdkVzVqTENCamRYTjBiMjFwZW1WeUxDQnpkR0ZqYXlrZ2UxeHVJQ0IyWVhJZ2IySnFWbUZzZFdVZ1BTQnZZbXBsWTNSYmEyVjVYU3hjYmlBZ0lDQWdJSE55WTFaaGJIVmxJRDBnYzI5MWNtTmxXMnRsZVYwc1hHNGdJQ0FnSUNCemRHRmphMlZrSUQwZ2MzUmhZMnN1WjJWMEtITnlZMVpoYkhWbEtUdGNibHh1SUNCcFppQW9jM1JoWTJ0bFpDa2dlMXh1SUNBZ0lHRnpjMmxuYmsxbGNtZGxWbUZzZFdVb2IySnFaV04wTENCclpYa3NJSE4wWVdOclpXUXBPMXh1SUNBZ0lISmxkSFZ5Ymp0Y2JpQWdmVnh1SUNCMllYSWdibVYzVm1Gc2RXVWdQU0JqZFhOMGIyMXBlbVZ5WEc0Z0lDQWdQeUJqZFhOMGIyMXBlbVZ5S0c5aWFsWmhiSFZsTENCemNtTldZV3gxWlN3Z0tHdGxlU0FySUNjbktTd2diMkpxWldOMExDQnpiM1Z5WTJVc0lITjBZV05yS1Z4dUlDQWdJRG9nZFc1a1pXWnBibVZrTzF4dVhHNGdJSFpoY2lCcGMwTnZiVzF2YmlBOUlHNWxkMVpoYkhWbElEMDlQU0IxYm1SbFptbHVaV1E3WEc1Y2JpQWdhV1lnS0dselEyOXRiVzl1S1NCN1hHNGdJQ0FnYm1WM1ZtRnNkV1VnUFNCemNtTldZV3gxWlR0Y2JpQWdJQ0JwWmlBb2FYTkJjbkpoZVNoemNtTldZV3gxWlNrZ2ZId2dhWE5VZVhCbFpFRnljbUY1S0hOeVkxWmhiSFZsS1NrZ2UxeHVJQ0FnSUNBZ2FXWWdLR2x6UVhKeVlYa29iMkpxVm1Gc2RXVXBLU0I3WEc0Z0lDQWdJQ0FnSUc1bGQxWmhiSFZsSUQwZ2IySnFWbUZzZFdVN1hHNGdJQ0FnSUNCOVhHNGdJQ0FnSUNCbGJITmxJR2xtSUNocGMwRnljbUY1VEdsclpVOWlhbVZqZENodlltcFdZV3gxWlNrcElIdGNiaUFnSUNBZ0lDQWdibVYzVm1Gc2RXVWdQU0JqYjNCNVFYSnlZWGtvYjJKcVZtRnNkV1VwTzF4dUlDQWdJQ0FnZlZ4dUlDQWdJQ0FnWld4elpTQjdYRzRnSUNBZ0lDQWdJR2x6UTI5dGJXOXVJRDBnWm1Gc2MyVTdYRzRnSUNBZ0lDQWdJRzVsZDFaaGJIVmxJRDBnWW1GelpVTnNiMjVsS0hOeVkxWmhiSFZsTENCMGNuVmxLVHRjYmlBZ0lDQWdJSDFjYmlBZ0lDQjlYRzRnSUNBZ1pXeHpaU0JwWmlBb2FYTlFiR0ZwYms5aWFtVmpkQ2h6Y21OV1lXeDFaU2tnZkh3Z2FYTkJjbWQxYldWdWRITW9jM0pqVm1Gc2RXVXBLU0I3WEc0Z0lDQWdJQ0JwWmlBb2FYTkJjbWQxYldWdWRITW9iMkpxVm1Gc2RXVXBLU0I3WEc0Z0lDQWdJQ0FnSUc1bGQxWmhiSFZsSUQwZ2RHOVFiR0ZwYms5aWFtVmpkQ2h2WW1wV1lXeDFaU2s3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdJQ0JsYkhObElHbG1JQ2doYVhOUFltcGxZM1FvYjJKcVZtRnNkV1VwSUh4OElDaHpjbU5KYm1SbGVDQW1KaUJwYzBaMWJtTjBhVzl1S0c5aWFsWmhiSFZsS1NrcElIdGNiaUFnSUNBZ0lDQWdhWE5EYjIxdGIyNGdQU0JtWVd4elpUdGNiaUFnSUNBZ0lDQWdibVYzVm1Gc2RXVWdQU0JpWVhObFEyeHZibVVvYzNKalZtRnNkV1VzSUhSeWRXVXBPMXh1SUNBZ0lDQWdmVnh1SUNBZ0lDQWdaV3h6WlNCN1hHNGdJQ0FnSUNBZ0lHNWxkMVpoYkhWbElEMGdiMkpxVm1Gc2RXVTdYRzRnSUNBZ0lDQjlYRzRnSUNBZ2ZWeHVJQ0FnSUdWc2MyVWdlMXh1SUNBZ0lDQWdhWE5EYjIxdGIyNGdQU0JtWVd4elpUdGNiaUFnSUNCOVhHNGdJSDFjYmlBZ2FXWWdLR2x6UTI5dGJXOXVLU0I3WEc0Z0lDQWdMeThnVW1WamRYSnphWFpsYkhrZ2JXVnlaMlVnYjJKcVpXTjBjeUJoYm1RZ1lYSnlZWGx6SUNoemRYTmpaWEIwYVdKc1pTQjBieUJqWVd4c0lITjBZV05ySUd4cGJXbDBjeWt1WEc0Z0lDQWdjM1JoWTJzdWMyVjBLSE55WTFaaGJIVmxMQ0J1WlhkV1lXeDFaU2s3WEc0Z0lDQWdiV1Z5WjJWR2RXNWpLRzVsZDFaaGJIVmxMQ0J6Y21OV1lXeDFaU3dnYzNKalNXNWtaWGdzSUdOMWMzUnZiV2w2WlhJc0lITjBZV05yS1R0Y2JpQWdJQ0J6ZEdGamExc25aR1ZzWlhSbEoxMG9jM0pqVm1Gc2RXVXBPMXh1SUNCOVhHNGdJR0Z6YzJsbmJrMWxjbWRsVm1Gc2RXVW9iMkpxWldOMExDQnJaWGtzSUc1bGQxWmhiSFZsS1R0Y2JuMWNibHh1THlvcVhHNGdLaUJVYUdVZ1ltRnpaU0JwYlhCc1pXMWxiblJoZEdsdmJpQnZaaUJnWHk1eVpYTjBZQ0IzYUdsamFDQmtiMlZ6YmlkMElIWmhiR2xrWVhSbElHOXlJR052WlhKalpTQmhjbWQxYldWdWRITXVYRzRnS2x4dUlDb2dRSEJ5YVhaaGRHVmNiaUFxSUVCd1lYSmhiU0I3Um5WdVkzUnBiMjU5SUdaMWJtTWdWR2hsSUdaMWJtTjBhVzl1SUhSdklHRndjR3g1SUdFZ2NtVnpkQ0J3WVhKaGJXVjBaWElnZEc4dVhHNGdLaUJBY0dGeVlXMGdlMjUxYldKbGNuMGdXM04wWVhKMFBXWjFibU11YkdWdVozUm9MVEZkSUZSb1pTQnpkR0Z5ZENCd2IzTnBkR2x2YmlCdlppQjBhR1VnY21WemRDQndZWEpoYldWMFpYSXVYRzRnS2lCQWNtVjBkWEp1Y3lCN1JuVnVZM1JwYjI1OUlGSmxkSFZ5Ym5NZ2RHaGxJRzVsZHlCbWRXNWpkR2x2Ymk1Y2JpQXFMMXh1Wm5WdVkzUnBiMjRnWW1GelpWSmxjM1FvWm5WdVl5d2djM1JoY25RcElIdGNiaUFnYzNSaGNuUWdQU0J1WVhScGRtVk5ZWGdvYzNSaGNuUWdQVDA5SUhWdVpHVm1hVzVsWkNBL0lDaG1kVzVqTG14bGJtZDBhQ0F0SURFcElEb2djM1JoY25Rc0lEQXBPMXh1SUNCeVpYUjFjbTRnWm5WdVkzUnBiMjRvS1NCN1hHNGdJQ0FnZG1GeUlHRnlaM01nUFNCaGNtZDFiV1Z1ZEhNc1hHNGdJQ0FnSUNBZ0lHbHVaR1Y0SUQwZ0xURXNYRzRnSUNBZ0lDQWdJR3hsYm1kMGFDQTlJRzVoZEdsMlpVMWhlQ2hoY21kekxteGxibWQwYUNBdElITjBZWEowTENBd0tTeGNiaUFnSUNBZ0lDQWdZWEp5WVhrZ1BTQkJjbkpoZVNoc1pXNW5kR2dwTzF4dVhHNGdJQ0FnZDJocGJHVWdLQ3NyYVc1a1pYZ2dQQ0JzWlc1bmRHZ3BJSHRjYmlBZ0lDQWdJR0Z5Y21GNVcybHVaR1Y0WFNBOUlHRnlaM05iYzNSaGNuUWdLeUJwYm1SbGVGMDdYRzRnSUNBZ2ZWeHVJQ0FnSUdsdVpHVjRJRDBnTFRFN1hHNGdJQ0FnZG1GeUlHOTBhR1Z5UVhKbmN5QTlJRUZ5Y21GNUtITjBZWEowSUNzZ01TazdYRzRnSUNBZ2QyaHBiR1VnS0NzcmFXNWtaWGdnUENCemRHRnlkQ2tnZTF4dUlDQWdJQ0FnYjNSb1pYSkJjbWR6VzJsdVpHVjRYU0E5SUdGeVozTmJhVzVrWlhoZE8xeHVJQ0FnSUgxY2JpQWdJQ0J2ZEdobGNrRnlaM05iYzNSaGNuUmRJRDBnWVhKeVlYazdYRzRnSUNBZ2NtVjBkWEp1SUdGd2NHeDVLR1oxYm1Nc0lIUm9hWE1zSUc5MGFHVnlRWEpuY3lrN1hHNGdJSDA3WEc1OVhHNWNiaThxS2x4dUlDb2dRM0psWVhSbGN5QmhJR05zYjI1bElHOW1JQ0JnWW5WbVptVnlZQzVjYmlBcVhHNGdLaUJBY0hKcGRtRjBaVnh1SUNvZ1FIQmhjbUZ0SUh0Q2RXWm1aWEo5SUdKMVptWmxjaUJVYUdVZ1luVm1abVZ5SUhSdklHTnNiMjVsTGx4dUlDb2dRSEJoY21GdElIdGliMjlzWldGdWZTQmJhWE5FWldWd1hTQlRjR1ZqYVdaNUlHRWdaR1ZsY0NCamJHOXVaUzVjYmlBcUlFQnlaWFIxY201eklIdENkV1ptWlhKOUlGSmxkSFZ5Ym5NZ2RHaGxJR05zYjI1bFpDQmlkV1ptWlhJdVhHNGdLaTljYm1aMWJtTjBhVzl1SUdOc2IyNWxRblZtWm1WeUtHSjFabVpsY2l3Z2FYTkVaV1Z3S1NCN1hHNGdJR2xtSUNocGMwUmxaWEFwSUh0Y2JpQWdJQ0J5WlhSMWNtNGdZblZtWm1WeUxuTnNhV05sS0NrN1hHNGdJSDFjYmlBZ2RtRnlJSEpsYzNWc2RDQTlJRzVsZHlCaWRXWm1aWEl1WTI5dWMzUnlkV04wYjNJb1luVm1abVZ5TG14bGJtZDBhQ2s3WEc0Z0lHSjFabVpsY2k1amIzQjVLSEpsYzNWc2RDazdYRzRnSUhKbGRIVnliaUJ5WlhOMWJIUTdYRzU5WEc1Y2JpOHFLbHh1SUNvZ1EzSmxZWFJsY3lCaElHTnNiMjVsSUc5bUlHQmhjbkpoZVVKMVptWmxjbUF1WEc0Z0tseHVJQ29nUUhCeWFYWmhkR1ZjYmlBcUlFQndZWEpoYlNCN1FYSnlZWGxDZFdabVpYSjlJR0Z5Y21GNVFuVm1abVZ5SUZSb1pTQmhjbkpoZVNCaWRXWm1aWElnZEc4Z1kyeHZibVV1WEc0Z0tpQkFjbVYwZFhKdWN5QjdRWEp5WVhsQ2RXWm1aWEo5SUZKbGRIVnlibk1nZEdobElHTnNiMjVsWkNCaGNuSmhlU0JpZFdabVpYSXVYRzRnS2k5Y2JtWjFibU4wYVc5dUlHTnNiMjVsUVhKeVlYbENkV1ptWlhJb1lYSnlZWGxDZFdabVpYSXBJSHRjYmlBZ2RtRnlJSEpsYzNWc2RDQTlJRzVsZHlCaGNuSmhlVUoxWm1abGNpNWpiMjV6ZEhKMVkzUnZjaWhoY25KaGVVSjFabVpsY2k1aWVYUmxUR1Z1WjNSb0tUdGNiaUFnYm1WM0lGVnBiblE0UVhKeVlYa29jbVZ6ZFd4MEtTNXpaWFFvYm1WM0lGVnBiblE0UVhKeVlYa29ZWEp5WVhsQ2RXWm1aWElwS1R0Y2JpQWdjbVYwZFhKdUlISmxjM1ZzZER0Y2JuMWNibHh1THlvcVhHNGdLaUJEY21WaGRHVnpJR0VnWTJ4dmJtVWdiMllnWUdSaGRHRldhV1YzWUM1Y2JpQXFYRzRnS2lCQWNISnBkbUYwWlZ4dUlDb2dRSEJoY21GdElIdFBZbXBsWTNSOUlHUmhkR0ZXYVdWM0lGUm9aU0JrWVhSaElIWnBaWGNnZEc4Z1kyeHZibVV1WEc0Z0tpQkFjR0Z5WVcwZ2UySnZiMnhsWVc1OUlGdHBjMFJsWlhCZElGTndaV05wWm5rZ1lTQmtaV1Z3SUdOc2IyNWxMbHh1SUNvZ1FISmxkSFZ5Ym5NZ2UwOWlhbVZqZEgwZ1VtVjBkWEp1Y3lCMGFHVWdZMnh2Ym1Wa0lHUmhkR0VnZG1sbGR5NWNiaUFxTDF4dVpuVnVZM1JwYjI0Z1kyeHZibVZFWVhSaFZtbGxkeWhrWVhSaFZtbGxkeXdnYVhORVpXVndLU0I3WEc0Z0lIWmhjaUJpZFdabVpYSWdQU0JwYzBSbFpYQWdQeUJqYkc5dVpVRnljbUY1UW5WbVptVnlLR1JoZEdGV2FXVjNMbUoxWm1abGNpa2dPaUJrWVhSaFZtbGxkeTVpZFdabVpYSTdYRzRnSUhKbGRIVnliaUJ1WlhjZ1pHRjBZVlpwWlhjdVkyOXVjM1J5ZFdOMGIzSW9ZblZtWm1WeUxDQmtZWFJoVm1sbGR5NWllWFJsVDJabWMyVjBMQ0JrWVhSaFZtbGxkeTVpZVhSbFRHVnVaM1JvS1R0Y2JuMWNibHh1THlvcVhHNGdLaUJEY21WaGRHVnpJR0VnWTJ4dmJtVWdiMllnWUcxaGNHQXVYRzRnS2x4dUlDb2dRSEJ5YVhaaGRHVmNiaUFxSUVCd1lYSmhiU0I3VDJKcVpXTjBmU0J0WVhBZ1ZHaGxJRzFoY0NCMGJ5QmpiRzl1WlM1Y2JpQXFJRUJ3WVhKaGJTQjdSblZ1WTNScGIyNTlJR05zYjI1bFJuVnVZeUJVYUdVZ1puVnVZM1JwYjI0Z2RHOGdZMnh2Ym1VZ2RtRnNkV1Z6TGx4dUlDb2dRSEJoY21GdElIdGliMjlzWldGdWZTQmJhWE5FWldWd1hTQlRjR1ZqYVdaNUlHRWdaR1ZsY0NCamJHOXVaUzVjYmlBcUlFQnlaWFIxY201eklIdFBZbXBsWTNSOUlGSmxkSFZ5Ym5NZ2RHaGxJR05zYjI1bFpDQnRZWEF1WEc0Z0tpOWNibVoxYm1OMGFXOXVJR05zYjI1bFRXRndLRzFoY0N3Z2FYTkVaV1Z3TENCamJHOXVaVVoxYm1NcElIdGNiaUFnZG1GeUlHRnljbUY1SUQwZ2FYTkVaV1Z3SUQ4Z1kyeHZibVZHZFc1aktHMWhjRlJ2UVhKeVlYa29iV0Z3S1N3Z2RISjFaU2tnT2lCdFlYQlViMEZ5Y21GNUtHMWhjQ2s3WEc0Z0lISmxkSFZ5YmlCaGNuSmhlVkpsWkhWalpTaGhjbkpoZVN3Z1lXUmtUV0Z3Ulc1MGNua3NJRzVsZHlCdFlYQXVZMjl1YzNSeWRXTjBiM0lwTzF4dWZWeHVYRzR2S2lwY2JpQXFJRU55WldGMFpYTWdZU0JqYkc5dVpTQnZaaUJnY21WblpYaHdZQzVjYmlBcVhHNGdLaUJBY0hKcGRtRjBaVnh1SUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I5SUhKbFoyVjRjQ0JVYUdVZ2NtVm5aWGh3SUhSdklHTnNiMjVsTGx4dUlDb2dRSEpsZEhWeWJuTWdlMDlpYW1WamRIMGdVbVYwZFhKdWN5QjBhR1VnWTJ4dmJtVmtJSEpsWjJWNGNDNWNiaUFxTDF4dVpuVnVZM1JwYjI0Z1kyeHZibVZTWldkRmVIQW9jbVZuWlhod0tTQjdYRzRnSUhaaGNpQnlaWE4xYkhRZ1BTQnVaWGNnY21WblpYaHdMbU52Ym5OMGNuVmpkRzl5S0hKbFoyVjRjQzV6YjNWeVkyVXNJSEpsUm14aFozTXVaWGhsWXloeVpXZGxlSEFwS1R0Y2JpQWdjbVZ6ZFd4MExteGhjM1JKYm1SbGVDQTlJSEpsWjJWNGNDNXNZWE4wU1c1a1pYZzdYRzRnSUhKbGRIVnliaUJ5WlhOMWJIUTdYRzU5WEc1Y2JpOHFLbHh1SUNvZ1EzSmxZWFJsY3lCaElHTnNiMjVsSUc5bUlHQnpaWFJnTGx4dUlDcGNiaUFxSUVCd2NtbDJZWFJsWEc0Z0tpQkFjR0Z5WVcwZ2UwOWlhbVZqZEgwZ2MyVjBJRlJvWlNCelpYUWdkRzhnWTJ4dmJtVXVYRzRnS2lCQWNHRnlZVzBnZTBaMWJtTjBhVzl1ZlNCamJHOXVaVVoxYm1NZ1ZHaGxJR1oxYm1OMGFXOXVJSFJ2SUdOc2IyNWxJSFpoYkhWbGN5NWNiaUFxSUVCd1lYSmhiU0I3WW05dmJHVmhibjBnVzJselJHVmxjRjBnVTNCbFkybG1lU0JoSUdSbFpYQWdZMnh2Ym1VdVhHNGdLaUJBY21WMGRYSnVjeUI3VDJKcVpXTjBmU0JTWlhSMWNtNXpJSFJvWlNCamJHOXVaV1FnYzJWMExseHVJQ292WEc1bWRXNWpkR2x2YmlCamJHOXVaVk5sZENoelpYUXNJR2x6UkdWbGNDd2dZMnh2Ym1WR2RXNWpLU0I3WEc0Z0lIWmhjaUJoY25KaGVTQTlJR2x6UkdWbGNDQS9JR05zYjI1bFJuVnVZeWh6WlhSVWIwRnljbUY1S0hObGRDa3NJSFJ5ZFdVcElEb2djMlYwVkc5QmNuSmhlU2h6WlhRcE8xeHVJQ0J5WlhSMWNtNGdZWEp5WVhsU1pXUjFZMlVvWVhKeVlYa3NJR0ZrWkZObGRFVnVkSEo1TENCdVpYY2djMlYwTG1OdmJuTjBjblZqZEc5eUtUdGNibjFjYmx4dUx5b3FYRzRnS2lCRGNtVmhkR1Z6SUdFZ1kyeHZibVVnYjJZZ2RHaGxJR0J6ZVcxaWIyeGdJRzlpYW1WamRDNWNiaUFxWEc0Z0tpQkFjSEpwZG1GMFpWeHVJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJSE41YldKdmJDQlVhR1VnYzNsdFltOXNJRzlpYW1WamRDQjBieUJqYkc5dVpTNWNiaUFxSUVCeVpYUjFjbTV6SUh0UFltcGxZM1I5SUZKbGRIVnlibk1nZEdobElHTnNiMjVsWkNCemVXMWliMndnYjJKcVpXTjBMbHh1SUNvdlhHNW1kVzVqZEdsdmJpQmpiRzl1WlZONWJXSnZiQ2h6ZVcxaWIyd3BJSHRjYmlBZ2NtVjBkWEp1SUhONWJXSnZiRlpoYkhWbFQyWWdQeUJQWW1wbFkzUW9jM2x0WW05c1ZtRnNkV1ZQWmk1allXeHNLSE41YldKdmJDa3BJRG9nZTMwN1hHNTlYRzVjYmk4cUtseHVJQ29nUTNKbFlYUmxjeUJoSUdOc2IyNWxJRzltSUdCMGVYQmxaRUZ5Y21GNVlDNWNiaUFxWEc0Z0tpQkFjSEpwZG1GMFpWeHVJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJSFI1Y0dWa1FYSnlZWGtnVkdobElIUjVjR1ZrSUdGeWNtRjVJSFJ2SUdOc2IyNWxMbHh1SUNvZ1FIQmhjbUZ0SUh0aWIyOXNaV0Z1ZlNCYmFYTkVaV1Z3WFNCVGNHVmphV1o1SUdFZ1pHVmxjQ0JqYkc5dVpTNWNiaUFxSUVCeVpYUjFjbTV6SUh0UFltcGxZM1I5SUZKbGRIVnlibk1nZEdobElHTnNiMjVsWkNCMGVYQmxaQ0JoY25KaGVTNWNiaUFxTDF4dVpuVnVZM1JwYjI0Z1kyeHZibVZVZVhCbFpFRnljbUY1S0hSNWNHVmtRWEp5WVhrc0lHbHpSR1ZsY0NrZ2UxeHVJQ0IyWVhJZ1luVm1abVZ5SUQwZ2FYTkVaV1Z3SUQ4Z1kyeHZibVZCY25KaGVVSjFabVpsY2loMGVYQmxaRUZ5Y21GNUxtSjFabVpsY2lrZ09pQjBlWEJsWkVGeWNtRjVMbUoxWm1abGNqdGNiaUFnY21WMGRYSnVJRzVsZHlCMGVYQmxaRUZ5Y21GNUxtTnZibk4wY25WamRHOXlLR0oxWm1abGNpd2dkSGx3WldSQmNuSmhlUzVpZVhSbFQyWm1jMlYwTENCMGVYQmxaRUZ5Y21GNUxteGxibWQwYUNrN1hHNTlYRzVjYmk4cUtseHVJQ29nUTI5d2FXVnpJSFJvWlNCMllXeDFaWE1nYjJZZ1lITnZkWEpqWldBZ2RHOGdZR0Z5Y21GNVlDNWNiaUFxWEc0Z0tpQkFjSEpwZG1GMFpWeHVJQ29nUUhCaGNtRnRJSHRCY25KaGVYMGdjMjkxY21ObElGUm9aU0JoY25KaGVTQjBieUJqYjNCNUlIWmhiSFZsY3lCbWNtOXRMbHh1SUNvZ1FIQmhjbUZ0SUh0QmNuSmhlWDBnVzJGeWNtRjVQVnRkWFNCVWFHVWdZWEp5WVhrZ2RHOGdZMjl3ZVNCMllXeDFaWE1nZEc4dVhHNGdLaUJBY21WMGRYSnVjeUI3UVhKeVlYbDlJRkpsZEhWeWJuTWdZR0Z5Y21GNVlDNWNiaUFxTDF4dVpuVnVZM1JwYjI0Z1kyOXdlVUZ5Y21GNUtITnZkWEpqWlN3Z1lYSnlZWGtwSUh0Y2JpQWdkbUZ5SUdsdVpHVjRJRDBnTFRFc1hHNGdJQ0FnSUNCc1pXNW5kR2dnUFNCemIzVnlZMlV1YkdWdVozUm9PMXh1WEc0Z0lHRnljbUY1SUh4OElDaGhjbkpoZVNBOUlFRnljbUY1S0d4bGJtZDBhQ2twTzF4dUlDQjNhR2xzWlNBb0t5dHBibVJsZUNBOElHeGxibWQwYUNrZ2UxeHVJQ0FnSUdGeWNtRjVXMmx1WkdWNFhTQTlJSE52ZFhKalpWdHBibVJsZUYwN1hHNGdJSDFjYmlBZ2NtVjBkWEp1SUdGeWNtRjVPMXh1ZlZ4dVhHNHZLaXBjYmlBcUlFTnZjR2xsY3lCd2NtOXdaWEowYVdWeklHOW1JR0J6YjNWeVkyVmdJSFJ2SUdCdlltcGxZM1JnTGx4dUlDcGNiaUFxSUVCd2NtbDJZWFJsWEc0Z0tpQkFjR0Z5WVcwZ2UwOWlhbVZqZEgwZ2MyOTFjbU5sSUZSb1pTQnZZbXBsWTNRZ2RHOGdZMjl3ZVNCd2NtOXdaWEowYVdWeklHWnliMjB1WEc0Z0tpQkFjR0Z5WVcwZ2UwRnljbUY1ZlNCd2NtOXdjeUJVYUdVZ2NISnZjR1Z5ZEhrZ2FXUmxiblJwWm1sbGNuTWdkRzhnWTI5d2VTNWNiaUFxSUVCd1lYSmhiU0I3VDJKcVpXTjBmU0JiYjJKcVpXTjBQWHQ5WFNCVWFHVWdiMkpxWldOMElIUnZJR052Y0hrZ2NISnZjR1Z5ZEdsbGN5QjBieTVjYmlBcUlFQndZWEpoYlNCN1JuVnVZM1JwYjI1OUlGdGpkWE4wYjIxcGVtVnlYU0JVYUdVZ1puVnVZM1JwYjI0Z2RHOGdZM1Z6ZEc5dGFYcGxJR052Y0dsbFpDQjJZV3gxWlhNdVhHNGdLaUJBY21WMGRYSnVjeUI3VDJKcVpXTjBmU0JTWlhSMWNtNXpJR0J2WW1wbFkzUmdMbHh1SUNvdlhHNW1kVzVqZEdsdmJpQmpiM0I1VDJKcVpXTjBLSE52ZFhKalpTd2djSEp2Y0hNc0lHOWlhbVZqZEN3Z1kzVnpkRzl0YVhwbGNpa2dlMXh1SUNCdlltcGxZM1FnZkh3Z0tHOWlhbVZqZENBOUlIdDlLVHRjYmx4dUlDQjJZWElnYVc1a1pYZ2dQU0F0TVN4Y2JpQWdJQ0FnSUd4bGJtZDBhQ0E5SUhCeWIzQnpMbXhsYm1kMGFEdGNibHh1SUNCM2FHbHNaU0FvS3l0cGJtUmxlQ0E4SUd4bGJtZDBhQ2tnZTF4dUlDQWdJSFpoY2lCclpYa2dQU0J3Y205d2MxdHBibVJsZUYwN1hHNWNiaUFnSUNCMllYSWdibVYzVm1Gc2RXVWdQU0JqZFhOMGIyMXBlbVZ5WEc0Z0lDQWdJQ0EvSUdOMWMzUnZiV2w2WlhJb2IySnFaV04wVzJ0bGVWMHNJSE52ZFhKalpWdHJaWGxkTENCclpYa3NJRzlpYW1WamRDd2djMjkxY21ObEtWeHVJQ0FnSUNBZ09pQjFibVJsWm1sdVpXUTdYRzVjYmlBZ0lDQmhjM05wWjI1V1lXeDFaU2h2WW1wbFkzUXNJR3RsZVN3Z2JtVjNWbUZzZFdVZ1BUMDlJSFZ1WkdWbWFXNWxaQ0EvSUhOdmRYSmpaVnRyWlhsZElEb2dibVYzVm1Gc2RXVXBPMXh1SUNCOVhHNGdJSEpsZEhWeWJpQnZZbXBsWTNRN1hHNTlYRzVjYmk4cUtseHVJQ29nUTI5d2FXVnpJRzkzYmlCemVXMWliMndnY0hKdmNHVnlkR2xsY3lCdlppQmdjMjkxY21ObFlDQjBieUJnYjJKcVpXTjBZQzVjYmlBcVhHNGdLaUJBY0hKcGRtRjBaVnh1SUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I5SUhOdmRYSmpaU0JVYUdVZ2IySnFaV04wSUhSdklHTnZjSGtnYzNsdFltOXNjeUJtY205dExseHVJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJRnR2WW1wbFkzUTllMzFkSUZSb1pTQnZZbXBsWTNRZ2RHOGdZMjl3ZVNCemVXMWliMnh6SUhSdkxseHVJQ29nUUhKbGRIVnlibk1nZTA5aWFtVmpkSDBnVW1WMGRYSnVjeUJnYjJKcVpXTjBZQzVjYmlBcUwxeHVablZ1WTNScGIyNGdZMjl3ZVZONWJXSnZiSE1vYzI5MWNtTmxMQ0J2WW1wbFkzUXBJSHRjYmlBZ2NtVjBkWEp1SUdOdmNIbFBZbXBsWTNRb2MyOTFjbU5sTENCblpYUlRlVzFpYjJ4ektITnZkWEpqWlNrc0lHOWlhbVZqZENrN1hHNTlYRzVjYmk4cUtseHVJQ29nUTNKbFlYUmxjeUJoSUdaMWJtTjBhVzl1SUd4cGEyVWdZRjh1WVhOemFXZHVZQzVjYmlBcVhHNGdLaUJBY0hKcGRtRjBaVnh1SUNvZ1FIQmhjbUZ0SUh0R2RXNWpkR2x2Ym4wZ1lYTnphV2R1WlhJZ1ZHaGxJR1oxYm1OMGFXOXVJSFJ2SUdGemMybG5iaUIyWVd4MVpYTXVYRzRnS2lCQWNtVjBkWEp1Y3lCN1JuVnVZM1JwYjI1OUlGSmxkSFZ5Ym5NZ2RHaGxJRzVsZHlCaGMzTnBaMjVsY2lCbWRXNWpkR2x2Ymk1Y2JpQXFMMXh1Wm5WdVkzUnBiMjRnWTNKbFlYUmxRWE56YVdkdVpYSW9ZWE56YVdkdVpYSXBJSHRjYmlBZ2NtVjBkWEp1SUdKaGMyVlNaWE4wS0daMWJtTjBhVzl1S0c5aWFtVmpkQ3dnYzI5MWNtTmxjeWtnZTF4dUlDQWdJSFpoY2lCcGJtUmxlQ0E5SUMweExGeHVJQ0FnSUNBZ0lDQnNaVzVuZEdnZ1BTQnpiM1Z5WTJWekxteGxibWQwYUN4Y2JpQWdJQ0FnSUNBZ1kzVnpkRzl0YVhwbGNpQTlJR3hsYm1kMGFDQStJREVnUHlCemIzVnlZMlZ6VzJ4bGJtZDBhQ0F0SURGZElEb2dkVzVrWldacGJtVmtMRnh1SUNBZ0lDQWdJQ0JuZFdGeVpDQTlJR3hsYm1kMGFDQStJRElnUHlCemIzVnlZMlZ6V3pKZElEb2dkVzVrWldacGJtVmtPMXh1WEc0Z0lDQWdZM1Z6ZEc5dGFYcGxjaUE5SUNoaGMzTnBaMjVsY2k1c1pXNW5kR2dnUGlBeklDWW1JSFI1Y0dWdlppQmpkWE4wYjIxcGVtVnlJRDA5SUNkbWRXNWpkR2x2YmljcFhHNGdJQ0FnSUNBL0lDaHNaVzVuZEdndExTd2dZM1Z6ZEc5dGFYcGxjaWxjYmlBZ0lDQWdJRG9nZFc1a1pXWnBibVZrTzF4dVhHNGdJQ0FnYVdZZ0tHZDFZWEprSUNZbUlHbHpTWFJsY21GMFpXVkRZV3hzS0hOdmRYSmpaWE5iTUYwc0lITnZkWEpqWlhOYk1WMHNJR2QxWVhKa0tTa2dlMXh1SUNBZ0lDQWdZM1Z6ZEc5dGFYcGxjaUE5SUd4bGJtZDBhQ0E4SURNZ1B5QjFibVJsWm1sdVpXUWdPaUJqZFhOMGIyMXBlbVZ5TzF4dUlDQWdJQ0FnYkdWdVozUm9JRDBnTVR0Y2JpQWdJQ0I5WEc0Z0lDQWdiMkpxWldOMElEMGdUMkpxWldOMEtHOWlhbVZqZENrN1hHNGdJQ0FnZDJocGJHVWdLQ3NyYVc1a1pYZ2dQQ0JzWlc1bmRHZ3BJSHRjYmlBZ0lDQWdJSFpoY2lCemIzVnlZMlVnUFNCemIzVnlZMlZ6VzJsdVpHVjRYVHRjYmlBZ0lDQWdJR2xtSUNoemIzVnlZMlVwSUh0Y2JpQWdJQ0FnSUNBZ1lYTnphV2R1WlhJb2IySnFaV04wTENCemIzVnlZMlVzSUdsdVpHVjRMQ0JqZFhOMGIyMXBlbVZ5S1R0Y2JpQWdJQ0FnSUgxY2JpQWdJQ0I5WEc0Z0lDQWdjbVYwZFhKdUlHOWlhbVZqZER0Y2JpQWdmU2s3WEc1OVhHNWNiaThxS2x4dUlDb2dRM0psWVhSbGN5QmhiaUJoY25KaGVTQnZaaUJ2ZDI0Z1pXNTFiV1Z5WVdKc1pTQndjbTl3WlhKMGVTQnVZVzFsY3lCaGJtUWdjM2x0WW05c2N5QnZaaUJnYjJKcVpXTjBZQzVjYmlBcVhHNGdLaUJBY0hKcGRtRjBaVnh1SUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I5SUc5aWFtVmpkQ0JVYUdVZ2IySnFaV04wSUhSdklIRjFaWEo1TGx4dUlDb2dRSEpsZEhWeWJuTWdlMEZ5Y21GNWZTQlNaWFIxY201eklIUm9aU0JoY25KaGVTQnZaaUJ3Y205d1pYSjBlU0J1WVcxbGN5QmhibVFnYzNsdFltOXNjeTVjYmlBcUwxeHVablZ1WTNScGIyNGdaMlYwUVd4c1MyVjVjeWh2WW1wbFkzUXBJSHRjYmlBZ2NtVjBkWEp1SUdKaGMyVkhaWFJCYkd4TFpYbHpLRzlpYW1WamRDd2dhMlY1Y3l3Z1oyVjBVM2x0WW05c2N5azdYRzU5WEc1Y2JpOHFLbHh1SUNvZ1IyVjBjeUIwYUdVZ1pHRjBZU0JtYjNJZ1lHMWhjR0F1WEc0Z0tseHVJQ29nUUhCeWFYWmhkR1ZjYmlBcUlFQndZWEpoYlNCN1QySnFaV04wZlNCdFlYQWdWR2hsSUcxaGNDQjBieUJ4ZFdWeWVTNWNiaUFxSUVCd1lYSmhiU0I3YzNSeWFXNW5mU0JyWlhrZ1ZHaGxJSEpsWm1WeVpXNWpaU0JyWlhrdVhHNGdLaUJBY21WMGRYSnVjeUI3S24wZ1VtVjBkWEp1Y3lCMGFHVWdiV0Z3SUdSaGRHRXVYRzRnS2k5Y2JtWjFibU4wYVc5dUlHZGxkRTFoY0VSaGRHRW9iV0Z3TENCclpYa3BJSHRjYmlBZ2RtRnlJR1JoZEdFZ1BTQnRZWEF1WDE5a1lYUmhYMTg3WEc0Z0lISmxkSFZ5YmlCcGMwdGxlV0ZpYkdVb2EyVjVLVnh1SUNBZ0lEOGdaR0YwWVZ0MGVYQmxiMllnYTJWNUlEMDlJQ2R6ZEhKcGJtY25JRDhnSjNOMGNtbHVaeWNnT2lBbmFHRnphQ2RkWEc0Z0lDQWdPaUJrWVhSaExtMWhjRHRjYm4xY2JseHVMeW9xWEc0Z0tpQkhaWFJ6SUhSb1pTQnVZWFJwZG1VZ1puVnVZM1JwYjI0Z1lYUWdZR3RsZVdBZ2IyWWdZRzlpYW1WamRHQXVYRzRnS2x4dUlDb2dRSEJ5YVhaaGRHVmNiaUFxSUVCd1lYSmhiU0I3VDJKcVpXTjBmU0J2WW1wbFkzUWdWR2hsSUc5aWFtVmpkQ0IwYnlCeGRXVnllUzVjYmlBcUlFQndZWEpoYlNCN2MzUnlhVzVuZlNCclpYa2dWR2hsSUd0bGVTQnZaaUIwYUdVZ2JXVjBhRzlrSUhSdklHZGxkQzVjYmlBcUlFQnlaWFIxY201eklIc3FmU0JTWlhSMWNtNXpJSFJvWlNCbWRXNWpkR2x2YmlCcFppQnBkQ2R6SUc1aGRHbDJaU3dnWld4elpTQmdkVzVrWldacGJtVmtZQzVjYmlBcUwxeHVablZ1WTNScGIyNGdaMlYwVG1GMGFYWmxLRzlpYW1WamRDd2dhMlY1S1NCN1hHNGdJSFpoY2lCMllXeDFaU0E5SUdkbGRGWmhiSFZsS0c5aWFtVmpkQ3dnYTJWNUtUdGNiaUFnY21WMGRYSnVJR0poYzJWSmMwNWhkR2wyWlNoMllXeDFaU2tnUHlCMllXeDFaU0E2SUhWdVpHVm1hVzVsWkR0Y2JuMWNibHh1THlvcVhHNGdLaUJEY21WaGRHVnpJR0Z1SUdGeWNtRjVJRzltSUhSb1pTQnZkMjRnWlc1MWJXVnlZV0pzWlNCemVXMWliMndnY0hKdmNHVnlkR2xsY3lCdlppQmdiMkpxWldOMFlDNWNiaUFxWEc0Z0tpQkFjSEpwZG1GMFpWeHVJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJRzlpYW1WamRDQlVhR1VnYjJKcVpXTjBJSFJ2SUhGMVpYSjVMbHh1SUNvZ1FISmxkSFZ5Ym5NZ2UwRnljbUY1ZlNCU1pYUjFjbTV6SUhSb1pTQmhjbkpoZVNCdlppQnplVzFpYjJ4ekxseHVJQ292WEc1MllYSWdaMlYwVTNsdFltOXNjeUE5SUc1aGRHbDJaVWRsZEZONWJXSnZiSE1nUHlCdmRtVnlRWEpuS0c1aGRHbDJaVWRsZEZONWJXSnZiSE1zSUU5aWFtVmpkQ2tnT2lCemRIVmlRWEp5WVhrN1hHNWNiaThxS2x4dUlDb2dSMlYwY3lCMGFHVWdZSFJ2VTNSeWFXNW5WR0ZuWUNCdlppQmdkbUZzZFdWZ0xseHVJQ3BjYmlBcUlFQndjbWwyWVhSbFhHNGdLaUJBY0dGeVlXMGdleXA5SUhaaGJIVmxJRlJvWlNCMllXeDFaU0IwYnlCeGRXVnllUzVjYmlBcUlFQnlaWFIxY201eklIdHpkSEpwYm1kOUlGSmxkSFZ5Ym5NZ2RHaGxJR0IwYjFOMGNtbHVaMVJoWjJBdVhHNGdLaTljYm5aaGNpQm5aWFJVWVdjZ1BTQmlZWE5sUjJWMFZHRm5PMXh1WEc0dkx5QkdZV3hzWW1GamF5Qm1iM0lnWkdGMFlTQjJhV1YzY3l3Z2JXRndjeXdnYzJWMGN5d2dZVzVrSUhkbFlXc2diV0Z3Y3lCcGJpQkpSU0F4TVN4Y2JpOHZJR1p2Y2lCa1lYUmhJSFpwWlhkeklHbHVJRVZrWjJVZ1BDQXhOQ3dnWVc1a0lIQnliMjFwYzJWeklHbHVJRTV2WkdVdWFuTXVYRzVwWmlBb0tFUmhkR0ZXYVdWM0lDWW1JR2RsZEZSaFp5aHVaWGNnUkdGMFlWWnBaWGNvYm1WM0lFRnljbUY1UW5WbVptVnlLREVwS1NrZ0lUMGdaR0YwWVZacFpYZFVZV2NwSUh4OFhHNGdJQ0FnS0UxaGNDQW1KaUJuWlhSVVlXY29ibVYzSUUxaGNDa2dJVDBnYldGd1ZHRm5LU0I4ZkZ4dUlDQWdJQ2hRY205dGFYTmxJQ1ltSUdkbGRGUmhaeWhRY205dGFYTmxMbkpsYzI5c2RtVW9LU2tnSVQwZ2NISnZiV2x6WlZSaFp5a2dmSHhjYmlBZ0lDQW9VMlYwSUNZbUlHZGxkRlJoWnlodVpYY2dVMlYwS1NBaFBTQnpaWFJVWVdjcElIeDhYRzRnSUNBZ0tGZGxZV3ROWVhBZ0ppWWdaMlYwVkdGbktHNWxkeUJYWldGclRXRndLU0FoUFNCM1pXRnJUV0Z3VkdGbktTa2dlMXh1SUNCblpYUlVZV2NnUFNCbWRXNWpkR2x2YmloMllXeDFaU2tnZTF4dUlDQWdJSFpoY2lCeVpYTjFiSFFnUFNCdlltcGxZM1JVYjFOMGNtbHVaeTVqWVd4c0tIWmhiSFZsS1N4Y2JpQWdJQ0FnSUNBZ1EzUnZjaUE5SUhKbGMzVnNkQ0E5UFNCdlltcGxZM1JVWVdjZ1B5QjJZV3gxWlM1amIyNXpkSEoxWTNSdmNpQTZJSFZ1WkdWbWFXNWxaQ3hjYmlBZ0lDQWdJQ0FnWTNSdmNsTjBjbWx1WnlBOUlFTjBiM0lnUHlCMGIxTnZkWEpqWlNoRGRHOXlLU0E2SUhWdVpHVm1hVzVsWkR0Y2JseHVJQ0FnSUdsbUlDaGpkRzl5VTNSeWFXNW5LU0I3WEc0Z0lDQWdJQ0J6ZDJsMFkyZ2dLR04wYjNKVGRISnBibWNwSUh0Y2JpQWdJQ0FnSUNBZ1kyRnpaU0JrWVhSaFZtbGxkME4wYjNKVGRISnBibWM2SUhKbGRIVnliaUJrWVhSaFZtbGxkMVJoWnp0Y2JpQWdJQ0FnSUNBZ1kyRnpaU0J0WVhCRGRHOXlVM1J5YVc1bk9pQnlaWFIxY200Z2JXRndWR0ZuTzF4dUlDQWdJQ0FnSUNCallYTmxJSEJ5YjIxcGMyVkRkRzl5VTNSeWFXNW5PaUJ5WlhSMWNtNGdjSEp2YldselpWUmhaenRjYmlBZ0lDQWdJQ0FnWTJGelpTQnpaWFJEZEc5eVUzUnlhVzVuT2lCeVpYUjFjbTRnYzJWMFZHRm5PMXh1SUNBZ0lDQWdJQ0JqWVhObElIZGxZV3ROWVhCRGRHOXlVM1J5YVc1bk9pQnlaWFIxY200Z2QyVmhhMDFoY0ZSaFp6dGNiaUFnSUNBZ0lIMWNiaUFnSUNCOVhHNGdJQ0FnY21WMGRYSnVJSEpsYzNWc2REdGNiaUFnZlR0Y2JuMWNibHh1THlvcVhHNGdLaUJKYm1sMGFXRnNhWHBsY3lCaGJpQmhjbkpoZVNCamJHOXVaUzVjYmlBcVhHNGdLaUJBY0hKcGRtRjBaVnh1SUNvZ1FIQmhjbUZ0SUh0QmNuSmhlWDBnWVhKeVlYa2dWR2hsSUdGeWNtRjVJSFJ2SUdOc2IyNWxMbHh1SUNvZ1FISmxkSFZ5Ym5NZ2UwRnljbUY1ZlNCU1pYUjFjbTV6SUhSb1pTQnBibWwwYVdGc2FYcGxaQ0JqYkc5dVpTNWNiaUFxTDF4dVpuVnVZM1JwYjI0Z2FXNXBkRU5zYjI1bFFYSnlZWGtvWVhKeVlYa3BJSHRjYmlBZ2RtRnlJR3hsYm1kMGFDQTlJR0Z5Y21GNUxteGxibWQwYUN4Y2JpQWdJQ0FnSUhKbGMzVnNkQ0E5SUdGeWNtRjVMbU52Ym5OMGNuVmpkRzl5S0d4bGJtZDBhQ2s3WEc1Y2JpQWdMeThnUVdSa0lIQnliM0JsY25ScFpYTWdZWE56YVdkdVpXUWdZbmtnWUZKbFowVjRjQ05sZUdWallDNWNiaUFnYVdZZ0tHeGxibWQwYUNBbUppQjBlWEJsYjJZZ1lYSnlZWGxiTUYwZ1BUMGdKM04wY21sdVp5Y2dKaVlnYUdGelQzZHVVSEp2Y0dWeWRIa3VZMkZzYkNoaGNuSmhlU3dnSjJsdVpHVjRKeWtwSUh0Y2JpQWdJQ0J5WlhOMWJIUXVhVzVrWlhnZ1BTQmhjbkpoZVM1cGJtUmxlRHRjYmlBZ0lDQnlaWE4xYkhRdWFXNXdkWFFnUFNCaGNuSmhlUzVwYm5CMWREdGNiaUFnZlZ4dUlDQnlaWFIxY200Z2NtVnpkV3gwTzF4dWZWeHVYRzR2S2lwY2JpQXFJRWx1YVhScFlXeHBlbVZ6SUdGdUlHOWlhbVZqZENCamJHOXVaUzVjYmlBcVhHNGdLaUJBY0hKcGRtRjBaVnh1SUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I5SUc5aWFtVmpkQ0JVYUdVZ2IySnFaV04wSUhSdklHTnNiMjVsTGx4dUlDb2dRSEpsZEhWeWJuTWdlMDlpYW1WamRIMGdVbVYwZFhKdWN5QjBhR1VnYVc1cGRHbGhiR2w2WldRZ1kyeHZibVV1WEc0Z0tpOWNibVoxYm1OMGFXOXVJR2x1YVhSRGJHOXVaVTlpYW1WamRDaHZZbXBsWTNRcElIdGNiaUFnY21WMGRYSnVJQ2gwZVhCbGIyWWdiMkpxWldOMExtTnZibk4wY25WamRHOXlJRDA5SUNkbWRXNWpkR2x2YmljZ0ppWWdJV2x6VUhKdmRHOTBlWEJsS0c5aWFtVmpkQ2twWEc0Z0lDQWdQeUJpWVhObFEzSmxZWFJsS0dkbGRGQnliM1J2ZEhsd1pTaHZZbXBsWTNRcEtWeHVJQ0FnSURvZ2UzMDdYRzU5WEc1Y2JpOHFLbHh1SUNvZ1NXNXBkR2xoYkdsNlpYTWdZVzRnYjJKcVpXTjBJR05zYjI1bElHSmhjMlZrSUc5dUlHbDBjeUJnZEc5VGRISnBibWRVWVdkZ0xseHVJQ3BjYmlBcUlDb3FUbTkwWlRvcUtpQlVhR2x6SUdaMWJtTjBhVzl1SUc5dWJIa2djM1Z3Y0c5eWRITWdZMnh2Ym1sdVp5QjJZV3gxWlhNZ2QybDBhQ0IwWVdkeklHOW1YRzRnS2lCZ1FtOXZiR1ZoYm1Bc0lHQkVZWFJsWUN3Z1lFVnljbTl5WUN3Z1lFNTFiV0psY21Bc0lHQlNaV2RGZUhCZ0xDQnZjaUJnVTNSeWFXNW5ZQzVjYmlBcVhHNGdLaUJBY0hKcGRtRjBaVnh1SUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I5SUc5aWFtVmpkQ0JVYUdVZ2IySnFaV04wSUhSdklHTnNiMjVsTGx4dUlDb2dRSEJoY21GdElIdHpkSEpwYm1kOUlIUmhaeUJVYUdVZ1lIUnZVM1J5YVc1blZHRm5ZQ0J2WmlCMGFHVWdiMkpxWldOMElIUnZJR05zYjI1bExseHVJQ29nUUhCaGNtRnRJSHRHZFc1amRHbHZibjBnWTJ4dmJtVkdkVzVqSUZSb1pTQm1kVzVqZEdsdmJpQjBieUJqYkc5dVpTQjJZV3gxWlhNdVhHNGdLaUJBY0dGeVlXMGdlMkp2YjJ4bFlXNTlJRnRwYzBSbFpYQmRJRk53WldOcFpua2dZU0JrWldWd0lHTnNiMjVsTGx4dUlDb2dRSEpsZEhWeWJuTWdlMDlpYW1WamRIMGdVbVYwZFhKdWN5QjBhR1VnYVc1cGRHbGhiR2w2WldRZ1kyeHZibVV1WEc0Z0tpOWNibVoxYm1OMGFXOXVJR2x1YVhSRGJHOXVaVUo1VkdGbktHOWlhbVZqZEN3Z2RHRm5MQ0JqYkc5dVpVWjFibU1zSUdselJHVmxjQ2tnZTF4dUlDQjJZWElnUTNSdmNpQTlJRzlpYW1WamRDNWpiMjV6ZEhKMVkzUnZjanRjYmlBZ2MzZHBkR05vSUNoMFlXY3BJSHRjYmlBZ0lDQmpZWE5sSUdGeWNtRjVRblZtWm1WeVZHRm5PbHh1SUNBZ0lDQWdjbVYwZFhKdUlHTnNiMjVsUVhKeVlYbENkV1ptWlhJb2IySnFaV04wS1R0Y2JseHVJQ0FnSUdOaGMyVWdZbTl2YkZSaFp6cGNiaUFnSUNCallYTmxJR1JoZEdWVVlXYzZYRzRnSUNBZ0lDQnlaWFIxY200Z2JtVjNJRU4wYjNJb0syOWlhbVZqZENrN1hHNWNiaUFnSUNCallYTmxJR1JoZEdGV2FXVjNWR0ZuT2x4dUlDQWdJQ0FnY21WMGRYSnVJR05zYjI1bFJHRjBZVlpwWlhjb2IySnFaV04wTENCcGMwUmxaWEFwTzF4dVhHNGdJQ0FnWTJGelpTQm1iRzloZERNeVZHRm5PaUJqWVhObElHWnNiMkYwTmpSVVlXYzZYRzRnSUNBZ1kyRnpaU0JwYm5RNFZHRm5PaUJqWVhObElHbHVkREUyVkdGbk9pQmpZWE5sSUdsdWRETXlWR0ZuT2x4dUlDQWdJR05oYzJVZ2RXbHVkRGhVWVdjNklHTmhjMlVnZFdsdWREaERiR0Z0Y0dWa1ZHRm5PaUJqWVhObElIVnBiblF4TmxSaFp6b2dZMkZ6WlNCMWFXNTBNekpVWVdjNlhHNGdJQ0FnSUNCeVpYUjFjbTRnWTJ4dmJtVlVlWEJsWkVGeWNtRjVLRzlpYW1WamRDd2dhWE5FWldWd0tUdGNibHh1SUNBZ0lHTmhjMlVnYldGd1ZHRm5PbHh1SUNBZ0lDQWdjbVYwZFhKdUlHTnNiMjVsVFdGd0tHOWlhbVZqZEN3Z2FYTkVaV1Z3TENCamJHOXVaVVoxYm1NcE8xeHVYRzRnSUNBZ1kyRnpaU0J1ZFcxaVpYSlVZV2M2WEc0Z0lDQWdZMkZ6WlNCemRISnBibWRVWVdjNlhHNGdJQ0FnSUNCeVpYUjFjbTRnYm1WM0lFTjBiM0lvYjJKcVpXTjBLVHRjYmx4dUlDQWdJR05oYzJVZ2NtVm5aWGh3VkdGbk9seHVJQ0FnSUNBZ2NtVjBkWEp1SUdOc2IyNWxVbVZuUlhod0tHOWlhbVZqZENrN1hHNWNiaUFnSUNCallYTmxJSE5sZEZSaFp6cGNiaUFnSUNBZ0lISmxkSFZ5YmlCamJHOXVaVk5sZENodlltcGxZM1FzSUdselJHVmxjQ3dnWTJ4dmJtVkdkVzVqS1R0Y2JseHVJQ0FnSUdOaGMyVWdjM2x0WW05c1ZHRm5PbHh1SUNBZ0lDQWdjbVYwZFhKdUlHTnNiMjVsVTNsdFltOXNLRzlpYW1WamRDazdYRzRnSUgxY2JuMWNibHh1THlvcVhHNGdLaUJEYUdWamEzTWdhV1lnWUhaaGJIVmxZQ0JwY3lCaElIWmhiR2xrSUdGeWNtRjVMV3hwYTJVZ2FXNWtaWGd1WEc0Z0tseHVJQ29nUUhCeWFYWmhkR1ZjYmlBcUlFQndZWEpoYlNCN0tuMGdkbUZzZFdVZ1ZHaGxJSFpoYkhWbElIUnZJR05vWldOckxseHVJQ29nUUhCaGNtRnRJSHR1ZFcxaVpYSjlJRnRzWlc1bmRHZzlUVUZZWDFOQlJrVmZTVTVVUlVkRlVsMGdWR2hsSUhWd2NHVnlJR0p2ZFc1a2N5QnZaaUJoSUhaaGJHbGtJR2x1WkdWNExseHVJQ29nUUhKbGRIVnlibk1nZTJKdmIyeGxZVzU5SUZKbGRIVnlibk1nWUhSeWRXVmdJR2xtSUdCMllXeDFaV0FnYVhNZ1lTQjJZV3hwWkNCcGJtUmxlQ3dnWld4elpTQmdabUZzYzJWZ0xseHVJQ292WEc1bWRXNWpkR2x2YmlCcGMwbHVaR1Y0S0haaGJIVmxMQ0JzWlc1bmRHZ3BJSHRjYmlBZ2JHVnVaM1JvSUQwZ2JHVnVaM1JvSUQwOUlHNTFiR3dnUHlCTlFWaGZVMEZHUlY5SlRsUkZSMFZTSURvZ2JHVnVaM1JvTzF4dUlDQnlaWFIxY200Z0lTRnNaVzVuZEdnZ0ppWmNiaUFnSUNBb2RIbHdaVzltSUhaaGJIVmxJRDA5SUNkdWRXMWlaWEluSUh4OElISmxTWE5WYVc1MExuUmxjM1FvZG1Gc2RXVXBLU0FtSmx4dUlDQWdJQ2gyWVd4MVpTQStJQzB4SUNZbUlIWmhiSFZsSUNVZ01TQTlQU0F3SUNZbUlIWmhiSFZsSUR3Z2JHVnVaM1JvS1R0Y2JuMWNibHh1THlvcVhHNGdLaUJEYUdWamEzTWdhV1lnZEdobElHZHBkbVZ1SUdGeVozVnRaVzUwY3lCaGNtVWdabkp2YlNCaGJpQnBkR1Z5WVhSbFpTQmpZV3hzTGx4dUlDcGNiaUFxSUVCd2NtbDJZWFJsWEc0Z0tpQkFjR0Z5WVcwZ2V5cDlJSFpoYkhWbElGUm9aU0J3YjNSbGJuUnBZV3dnYVhSbGNtRjBaV1VnZG1Gc2RXVWdZWEpuZFcxbGJuUXVYRzRnS2lCQWNHRnlZVzBnZXlwOUlHbHVaR1Y0SUZSb1pTQndiM1JsYm5ScFlXd2dhWFJsY21GMFpXVWdhVzVrWlhnZ2IzSWdhMlY1SUdGeVozVnRaVzUwTGx4dUlDb2dRSEJoY21GdElIc3FmU0J2WW1wbFkzUWdWR2hsSUhCdmRHVnVkR2xoYkNCcGRHVnlZWFJsWlNCdlltcGxZM1FnWVhKbmRXMWxiblF1WEc0Z0tpQkFjbVYwZFhKdWN5QjdZbTl2YkdWaGJuMGdVbVYwZFhKdWN5QmdkSEoxWldBZ2FXWWdkR2hsSUdGeVozVnRaVzUwY3lCaGNtVWdabkp2YlNCaGJpQnBkR1Z5WVhSbFpTQmpZV3hzTEZ4dUlDb2dJR1ZzYzJVZ1lHWmhiSE5sWUM1Y2JpQXFMMXh1Wm5WdVkzUnBiMjRnYVhOSmRHVnlZWFJsWlVOaGJHd29kbUZzZFdVc0lHbHVaR1Y0TENCdlltcGxZM1FwSUh0Y2JpQWdhV1lnS0NGcGMwOWlhbVZqZENodlltcGxZM1FwS1NCN1hHNGdJQ0FnY21WMGRYSnVJR1poYkhObE8xeHVJQ0I5WEc0Z0lIWmhjaUIwZVhCbElEMGdkSGx3Wlc5bUlHbHVaR1Y0TzF4dUlDQnBaaUFvZEhsd1pTQTlQU0FuYm5WdFltVnlKMXh1SUNBZ0lDQWdJQ0EvSUNocGMwRnljbUY1VEdsclpTaHZZbXBsWTNRcElDWW1JR2x6U1c1a1pYZ29hVzVrWlhnc0lHOWlhbVZqZEM1c1pXNW5kR2dwS1Z4dUlDQWdJQ0FnSUNBNklDaDBlWEJsSUQwOUlDZHpkSEpwYm1jbklDWW1JR2x1WkdWNElHbHVJRzlpYW1WamRDbGNiaUFnSUNBZ0lDa2dlMXh1SUNBZ0lISmxkSFZ5YmlCbGNTaHZZbXBsWTNSYmFXNWtaWGhkTENCMllXeDFaU2s3WEc0Z0lIMWNiaUFnY21WMGRYSnVJR1poYkhObE8xeHVmVnh1WEc0dktpcGNiaUFxSUVOb1pXTnJjeUJwWmlCZ2RtRnNkV1ZnSUdseklITjFhWFJoWW14bElHWnZjaUIxYzJVZ1lYTWdkVzVwY1hWbElHOWlhbVZqZENCclpYa3VYRzRnS2x4dUlDb2dRSEJ5YVhaaGRHVmNiaUFxSUVCd1lYSmhiU0I3S24wZ2RtRnNkV1VnVkdobElIWmhiSFZsSUhSdklHTm9aV05yTGx4dUlDb2dRSEpsZEhWeWJuTWdlMkp2YjJ4bFlXNTlJRkpsZEhWeWJuTWdZSFJ5ZFdWZ0lHbG1JR0IyWVd4MVpXQWdhWE1nYzNWcGRHRmliR1VzSUdWc2MyVWdZR1poYkhObFlDNWNiaUFxTDF4dVpuVnVZM1JwYjI0Z2FYTkxaWGxoWW14bEtIWmhiSFZsS1NCN1hHNGdJSFpoY2lCMGVYQmxJRDBnZEhsd1pXOW1JSFpoYkhWbE8xeHVJQ0J5WlhSMWNtNGdLSFI1Y0dVZ1BUMGdKM04wY21sdVp5Y2dmSHdnZEhsd1pTQTlQU0FuYm5WdFltVnlKeUI4ZkNCMGVYQmxJRDA5SUNkemVXMWliMnduSUh4OElIUjVjR1VnUFQwZ0oySnZiMnhsWVc0bktWeHVJQ0FnSUQ4Z0tIWmhiSFZsSUNFOVBTQW5YMTl3Y205MGIxOWZKeWxjYmlBZ0lDQTZJQ2gyWVd4MVpTQTlQVDBnYm5Wc2JDazdYRzU5WEc1Y2JpOHFLbHh1SUNvZ1EyaGxZMnR6SUdsbUlHQm1kVzVqWUNCb1lYTWdhWFJ6SUhOdmRYSmpaU0J0WVhOclpXUXVYRzRnS2x4dUlDb2dRSEJ5YVhaaGRHVmNiaUFxSUVCd1lYSmhiU0I3Um5WdVkzUnBiMjU5SUdaMWJtTWdWR2hsSUdaMWJtTjBhVzl1SUhSdklHTm9aV05yTGx4dUlDb2dRSEpsZEhWeWJuTWdlMkp2YjJ4bFlXNTlJRkpsZEhWeWJuTWdZSFJ5ZFdWZ0lHbG1JR0JtZFc1allDQnBjeUJ0WVhOclpXUXNJR1ZzYzJVZ1lHWmhiSE5sWUM1Y2JpQXFMMXh1Wm5WdVkzUnBiMjRnYVhOTllYTnJaV1FvWm5WdVl5a2dlMXh1SUNCeVpYUjFjbTRnSVNGdFlYTnJVM0pqUzJWNUlDWW1JQ2h0WVhOclUzSmpTMlY1SUdsdUlHWjFibU1wTzF4dWZWeHVYRzR2S2lwY2JpQXFJRU5vWldOcmN5QnBaaUJnZG1Gc2RXVmdJR2x6SUd4cGEyVnNlU0JoSUhCeWIzUnZkSGx3WlNCdlltcGxZM1F1WEc0Z0tseHVJQ29nUUhCeWFYWmhkR1ZjYmlBcUlFQndZWEpoYlNCN0tuMGdkbUZzZFdVZ1ZHaGxJSFpoYkhWbElIUnZJR05vWldOckxseHVJQ29nUUhKbGRIVnlibk1nZTJKdmIyeGxZVzU5SUZKbGRIVnlibk1nWUhSeWRXVmdJR2xtSUdCMllXeDFaV0FnYVhNZ1lTQndjbTkwYjNSNWNHVXNJR1ZzYzJVZ1lHWmhiSE5sWUM1Y2JpQXFMMXh1Wm5WdVkzUnBiMjRnYVhOUWNtOTBiM1I1Y0dVb2RtRnNkV1VwSUh0Y2JpQWdkbUZ5SUVOMGIzSWdQU0IyWVd4MVpTQW1KaUIyWVd4MVpTNWpiMjV6ZEhKMVkzUnZjaXhjYmlBZ0lDQWdJSEJ5YjNSdklEMGdLSFI1Y0dWdlppQkRkRzl5SUQwOUlDZG1kVzVqZEdsdmJpY2dKaVlnUTNSdmNpNXdjbTkwYjNSNWNHVXBJSHg4SUc5aWFtVmpkRkJ5YjNSdk8xeHVYRzRnSUhKbGRIVnliaUIyWVd4MVpTQTlQVDBnY0hKdmRHODdYRzU5WEc1Y2JpOHFLbHh1SUNvZ1ZHaHBjeUJtZFc1amRHbHZiaUJwY3lCc2FXdGxYRzRnS2lCYllFOWlhbVZqZEM1clpYbHpZRjBvYUhSMGNEb3ZMMlZqYldFdGFXNTBaWEp1WVhScGIyNWhiQzV2Y21jdlpXTnRZUzB5TmpJdk55NHdMeU56WldNdGIySnFaV04wTG10bGVYTXBYRzRnS2lCbGVHTmxjSFFnZEdoaGRDQnBkQ0JwYm1Oc2RXUmxjeUJwYm1obGNtbDBaV1FnWlc1MWJXVnlZV0pzWlNCd2NtOXdaWEowYVdWekxseHVJQ3BjYmlBcUlFQndjbWwyWVhSbFhHNGdLaUJBY0dGeVlXMGdlMDlpYW1WamRIMGdiMkpxWldOMElGUm9aU0J2WW1wbFkzUWdkRzhnY1hWbGNua3VYRzRnS2lCQWNtVjBkWEp1Y3lCN1FYSnlZWGw5SUZKbGRIVnlibk1nZEdobElHRnljbUY1SUc5bUlIQnliM0JsY25SNUlHNWhiV1Z6TGx4dUlDb3ZYRzVtZFc1amRHbHZiaUJ1WVhScGRtVkxaWGx6U1c0b2IySnFaV04wS1NCN1hHNGdJSFpoY2lCeVpYTjFiSFFnUFNCYlhUdGNiaUFnYVdZZ0tHOWlhbVZqZENBaFBTQnVkV3hzS1NCN1hHNGdJQ0FnWm05eUlDaDJZWElnYTJWNUlHbHVJRTlpYW1WamRDaHZZbXBsWTNRcEtTQjdYRzRnSUNBZ0lDQnlaWE4xYkhRdWNIVnphQ2hyWlhrcE8xeHVJQ0FnSUgxY2JpQWdmVnh1SUNCeVpYUjFjbTRnY21WemRXeDBPMXh1ZlZ4dVhHNHZLaXBjYmlBcUlFTnZiblpsY25SeklHQm1kVzVqWUNCMGJ5QnBkSE1nYzI5MWNtTmxJR052WkdVdVhHNGdLbHh1SUNvZ1FIQnlhWFpoZEdWY2JpQXFJRUJ3WVhKaGJTQjdSblZ1WTNScGIyNTlJR1oxYm1NZ1ZHaGxJR1oxYm1OMGFXOXVJSFJ2SUhCeWIyTmxjM011WEc0Z0tpQkFjbVYwZFhKdWN5QjdjM1J5YVc1bmZTQlNaWFIxY201eklIUm9aU0J6YjNWeVkyVWdZMjlrWlM1Y2JpQXFMMXh1Wm5WdVkzUnBiMjRnZEc5VGIzVnlZMlVvWm5WdVl5a2dlMXh1SUNCcFppQW9ablZ1WXlBaFBTQnVkV3hzS1NCN1hHNGdJQ0FnZEhKNUlIdGNiaUFnSUNBZ0lISmxkSFZ5YmlCbWRXNWpWRzlUZEhKcGJtY3VZMkZzYkNobWRXNWpLVHRjYmlBZ0lDQjlJR05oZEdOb0lDaGxLU0I3ZlZ4dUlDQWdJSFJ5ZVNCN1hHNGdJQ0FnSUNCeVpYUjFjbTRnS0daMWJtTWdLeUFuSnlrN1hHNGdJQ0FnZlNCallYUmphQ0FvWlNrZ2UzMWNiaUFnZlZ4dUlDQnlaWFIxY200Z0p5YzdYRzU5WEc1Y2JpOHFLbHh1SUNvZ1VHVnlabTl5YlhNZ1lWeHVJQ29nVzJCVFlXMWxWbUZzZFdWYVpYSnZZRjBvYUhSMGNEb3ZMMlZqYldFdGFXNTBaWEp1WVhScGIyNWhiQzV2Y21jdlpXTnRZUzB5TmpJdk55NHdMeU56WldNdGMyRnRaWFpoYkhWbGVtVnlieWxjYmlBcUlHTnZiWEJoY21semIyNGdZbVYwZDJWbGJpQjBkMjhnZG1Gc2RXVnpJSFJ2SUdSbGRHVnliV2x1WlNCcFppQjBhR1Y1SUdGeVpTQmxjWFZwZG1Gc1pXNTBMbHh1SUNwY2JpQXFJRUJ6ZEdGMGFXTmNiaUFxSUVCdFpXMWlaWEpQWmlCZlhHNGdLaUJBYzJsdVkyVWdOQzR3TGpCY2JpQXFJRUJqWVhSbFoyOXllU0JNWVc1blhHNGdLaUJBY0dGeVlXMGdleXA5SUhaaGJIVmxJRlJvWlNCMllXeDFaU0IwYnlCamIyMXdZWEpsTGx4dUlDb2dRSEJoY21GdElIc3FmU0J2ZEdobGNpQlVhR1VnYjNSb1pYSWdkbUZzZFdVZ2RHOGdZMjl0Y0dGeVpTNWNiaUFxSUVCeVpYUjFjbTV6SUh0aWIyOXNaV0Z1ZlNCU1pYUjFjbTV6SUdCMGNuVmxZQ0JwWmlCMGFHVWdkbUZzZFdWeklHRnlaU0JsY1hWcGRtRnNaVzUwTENCbGJITmxJR0JtWVd4elpXQXVYRzRnS2lCQVpYaGhiWEJzWlZ4dUlDcGNiaUFxSUhaaGNpQnZZbXBsWTNRZ1BTQjdJQ2RoSnpvZ01TQjlPMXh1SUNvZ2RtRnlJRzkwYUdWeUlEMGdleUFuWVNjNklERWdmVHRjYmlBcVhHNGdLaUJmTG1WeEtHOWlhbVZqZEN3Z2IySnFaV04wS1R0Y2JpQXFJQzh2SUQwK0lIUnlkV1ZjYmlBcVhHNGdLaUJmTG1WeEtHOWlhbVZqZEN3Z2IzUm9aWElwTzF4dUlDb2dMeThnUFQ0Z1ptRnNjMlZjYmlBcVhHNGdLaUJmTG1WeEtDZGhKeXdnSjJFbktUdGNiaUFxSUM4dklEMCtJSFJ5ZFdWY2JpQXFYRzRnS2lCZkxtVnhLQ2RoSnl3Z1QySnFaV04wS0NkaEp5a3BPMXh1SUNvZ0x5OGdQVDRnWm1Gc2MyVmNiaUFxWEc0Z0tpQmZMbVZ4S0U1aFRpd2dUbUZPS1R0Y2JpQXFJQzh2SUQwK0lIUnlkV1ZjYmlBcUwxeHVablZ1WTNScGIyNGdaWEVvZG1Gc2RXVXNJRzkwYUdWeUtTQjdYRzRnSUhKbGRIVnliaUIyWVd4MVpTQTlQVDBnYjNSb1pYSWdmSHdnS0haaGJIVmxJQ0U5UFNCMllXeDFaU0FtSmlCdmRHaGxjaUFoUFQwZ2IzUm9aWElwTzF4dWZWeHVYRzR2S2lwY2JpQXFJRU5vWldOcmN5QnBaaUJnZG1Gc2RXVmdJR2x6SUd4cGEyVnNlU0JoYmlCZ1lYSm5kVzFsYm5SellDQnZZbXBsWTNRdVhHNGdLbHh1SUNvZ1FITjBZWFJwWTF4dUlDb2dRRzFsYldKbGNrOW1JRjljYmlBcUlFQnphVzVqWlNBd0xqRXVNRnh1SUNvZ1FHTmhkR1ZuYjNKNUlFeGhibWRjYmlBcUlFQndZWEpoYlNCN0tuMGdkbUZzZFdVZ1ZHaGxJSFpoYkhWbElIUnZJR05vWldOckxseHVJQ29nUUhKbGRIVnlibk1nZTJKdmIyeGxZVzU5SUZKbGRIVnlibk1nWUhSeWRXVmdJR2xtSUdCMllXeDFaV0FnYVhNZ1lXNGdZR0Z5WjNWdFpXNTBjMkFnYjJKcVpXTjBMRnh1SUNvZ0lHVnNjMlVnWUdaaGJITmxZQzVjYmlBcUlFQmxlR0Z0Y0d4bFhHNGdLbHh1SUNvZ1h5NXBjMEZ5WjNWdFpXNTBjeWhtZFc1amRHbHZiaWdwSUhzZ2NtVjBkWEp1SUdGeVozVnRaVzUwY3pzZ2ZTZ3BLVHRjYmlBcUlDOHZJRDArSUhSeWRXVmNiaUFxWEc0Z0tpQmZMbWx6UVhKbmRXMWxiblJ6S0ZzeExDQXlMQ0F6WFNrN1hHNGdLaUF2THlBOVBpQm1ZV3h6WlZ4dUlDb3ZYRzVtZFc1amRHbHZiaUJwYzBGeVozVnRaVzUwY3loMllXeDFaU2tnZTF4dUlDQXZMeUJUWVdaaGNta2dPQzR4SUcxaGEyVnpJR0JoY21kMWJXVnVkSE11WTJGc2JHVmxZQ0JsYm5WdFpYSmhZbXhsSUdsdUlITjBjbWxqZENCdGIyUmxMbHh1SUNCeVpYUjFjbTRnYVhOQmNuSmhlVXhwYTJWUFltcGxZM1FvZG1Gc2RXVXBJQ1ltSUdoaGMwOTNibEJ5YjNCbGNuUjVMbU5oYkd3b2RtRnNkV1VzSUNkallXeHNaV1VuS1NBbUpseHVJQ0FnSUNnaGNISnZjR1Z5ZEhsSmMwVnVkVzFsY21GaWJHVXVZMkZzYkNoMllXeDFaU3dnSjJOaGJHeGxaU2NwSUh4OElHOWlhbVZqZEZSdlUzUnlhVzVuTG1OaGJHd29kbUZzZFdVcElEMDlJR0Z5WjNOVVlXY3BPMXh1ZlZ4dVhHNHZLaXBjYmlBcUlFTm9aV05yY3lCcFppQmdkbUZzZFdWZ0lHbHpJR05zWVhOemFXWnBaV1FnWVhNZ1lXNGdZRUZ5Y21GNVlDQnZZbXBsWTNRdVhHNGdLbHh1SUNvZ1FITjBZWFJwWTF4dUlDb2dRRzFsYldKbGNrOW1JRjljYmlBcUlFQnphVzVqWlNBd0xqRXVNRnh1SUNvZ1FHTmhkR1ZuYjNKNUlFeGhibWRjYmlBcUlFQndZWEpoYlNCN0tuMGdkbUZzZFdVZ1ZHaGxJSFpoYkhWbElIUnZJR05vWldOckxseHVJQ29nUUhKbGRIVnlibk1nZTJKdmIyeGxZVzU5SUZKbGRIVnlibk1nWUhSeWRXVmdJR2xtSUdCMllXeDFaV0FnYVhNZ1lXNGdZWEp5WVhrc0lHVnNjMlVnWUdaaGJITmxZQzVjYmlBcUlFQmxlR0Z0Y0d4bFhHNGdLbHh1SUNvZ1h5NXBjMEZ5Y21GNUtGc3hMQ0F5TENBelhTazdYRzRnS2lBdkx5QTlQaUIwY25WbFhHNGdLbHh1SUNvZ1h5NXBjMEZ5Y21GNUtHUnZZM1Z0Wlc1MExtSnZaSGt1WTJocGJHUnlaVzRwTzF4dUlDb2dMeThnUFQ0Z1ptRnNjMlZjYmlBcVhHNGdLaUJmTG1selFYSnlZWGtvSjJGaVl5Y3BPMXh1SUNvZ0x5OGdQVDRnWm1Gc2MyVmNiaUFxWEc0Z0tpQmZMbWx6UVhKeVlYa29YeTV1YjI5d0tUdGNiaUFxSUM4dklEMCtJR1poYkhObFhHNGdLaTljYm5aaGNpQnBjMEZ5Y21GNUlEMGdRWEp5WVhrdWFYTkJjbkpoZVR0Y2JseHVMeW9xWEc0Z0tpQkRhR1ZqYTNNZ2FXWWdZSFpoYkhWbFlDQnBjeUJoY25KaGVTMXNhV3RsTGlCQklIWmhiSFZsSUdseklHTnZibk5wWkdWeVpXUWdZWEp5WVhrdGJHbHJaU0JwWmlCcGRDZHpYRzRnS2lCdWIzUWdZU0JtZFc1amRHbHZiaUJoYm1RZ2FHRnpJR0VnWUhaaGJIVmxMbXhsYm1kMGFHQWdkR2hoZENkeklHRnVJR2x1ZEdWblpYSWdaM0psWVhSbGNpQjBhR0Z1SUc5eVhHNGdLaUJsY1hWaGJDQjBieUJnTUdBZ1lXNWtJR3hsYzNNZ2RHaGhiaUJ2Y2lCbGNYVmhiQ0IwYnlCZ1RuVnRZbVZ5TGsxQldGOVRRVVpGWDBsT1ZFVkhSVkpnTGx4dUlDcGNiaUFxSUVCemRHRjBhV05jYmlBcUlFQnRaVzFpWlhKUFppQmZYRzRnS2lCQWMybHVZMlVnTkM0d0xqQmNiaUFxSUVCallYUmxaMjl5ZVNCTVlXNW5YRzRnS2lCQWNHRnlZVzBnZXlwOUlIWmhiSFZsSUZSb1pTQjJZV3gxWlNCMGJ5QmphR1ZqYXk1Y2JpQXFJRUJ5WlhSMWNtNXpJSHRpYjI5c1pXRnVmU0JTWlhSMWNtNXpJR0IwY25WbFlDQnBaaUJnZG1Gc2RXVmdJR2x6SUdGeWNtRjVMV3hwYTJVc0lHVnNjMlVnWUdaaGJITmxZQzVjYmlBcUlFQmxlR0Z0Y0d4bFhHNGdLbHh1SUNvZ1h5NXBjMEZ5Y21GNVRHbHJaU2hiTVN3Z01pd2dNMTBwTzF4dUlDb2dMeThnUFQ0Z2RISjFaVnh1SUNwY2JpQXFJRjh1YVhOQmNuSmhlVXhwYTJVb1pHOWpkVzFsYm5RdVltOWtlUzVqYUdsc1pISmxiaWs3WEc0Z0tpQXZMeUE5UGlCMGNuVmxYRzRnS2x4dUlDb2dYeTVwYzBGeWNtRjVUR2xyWlNnbllXSmpKeWs3WEc0Z0tpQXZMeUE5UGlCMGNuVmxYRzRnS2x4dUlDb2dYeTVwYzBGeWNtRjVUR2xyWlNoZkxtNXZiM0FwTzF4dUlDb2dMeThnUFQ0Z1ptRnNjMlZjYmlBcUwxeHVablZ1WTNScGIyNGdhWE5CY25KaGVVeHBhMlVvZG1Gc2RXVXBJSHRjYmlBZ2NtVjBkWEp1SUhaaGJIVmxJQ0U5SUc1MWJHd2dKaVlnYVhOTVpXNW5kR2dvZG1Gc2RXVXViR1Z1WjNSb0tTQW1KaUFoYVhOR2RXNWpkR2x2YmloMllXeDFaU2s3WEc1OVhHNWNiaThxS2x4dUlDb2dWR2hwY3lCdFpYUm9iMlFnYVhNZ2JHbHJaU0JnWHk1cGMwRnljbUY1VEdsclpXQWdaWGhqWlhCMElIUm9ZWFFnYVhRZ1lXeHpieUJqYUdWamEzTWdhV1lnWUhaaGJIVmxZRnh1SUNvZ2FYTWdZVzRnYjJKcVpXTjBMbHh1SUNwY2JpQXFJRUJ6ZEdGMGFXTmNiaUFxSUVCdFpXMWlaWEpQWmlCZlhHNGdLaUJBYzJsdVkyVWdOQzR3TGpCY2JpQXFJRUJqWVhSbFoyOXllU0JNWVc1blhHNGdLaUJBY0dGeVlXMGdleXA5SUhaaGJIVmxJRlJvWlNCMllXeDFaU0IwYnlCamFHVmpheTVjYmlBcUlFQnlaWFIxY201eklIdGliMjlzWldGdWZTQlNaWFIxY201eklHQjBjblZsWUNCcFppQmdkbUZzZFdWZ0lHbHpJR0Z1SUdGeWNtRjVMV3hwYTJVZ2IySnFaV04wTEZ4dUlDb2dJR1ZzYzJVZ1lHWmhiSE5sWUM1Y2JpQXFJRUJsZUdGdGNHeGxYRzRnS2x4dUlDb2dYeTVwYzBGeWNtRjVUR2xyWlU5aWFtVmpkQ2hiTVN3Z01pd2dNMTBwTzF4dUlDb2dMeThnUFQ0Z2RISjFaVnh1SUNwY2JpQXFJRjh1YVhOQmNuSmhlVXhwYTJWUFltcGxZM1FvWkc5amRXMWxiblF1WW05a2VTNWphR2xzWkhKbGJpazdYRzRnS2lBdkx5QTlQaUIwY25WbFhHNGdLbHh1SUNvZ1h5NXBjMEZ5Y21GNVRHbHJaVTlpYW1WamRDZ25ZV0pqSnlrN1hHNGdLaUF2THlBOVBpQm1ZV3h6WlZ4dUlDcGNiaUFxSUY4dWFYTkJjbkpoZVV4cGEyVlBZbXBsWTNRb1h5NXViMjl3S1R0Y2JpQXFJQzh2SUQwK0lHWmhiSE5sWEc0Z0tpOWNibVoxYm1OMGFXOXVJR2x6UVhKeVlYbE1hV3RsVDJKcVpXTjBLSFpoYkhWbEtTQjdYRzRnSUhKbGRIVnliaUJwYzA5aWFtVmpkRXhwYTJVb2RtRnNkV1VwSUNZbUlHbHpRWEp5WVhsTWFXdGxLSFpoYkhWbEtUdGNibjFjYmx4dUx5b3FYRzRnS2lCRGFHVmphM01nYVdZZ1lIWmhiSFZsWUNCcGN5QmhJR0oxWm1abGNpNWNiaUFxWEc0Z0tpQkFjM1JoZEdsalhHNGdLaUJBYldWdFltVnlUMllnWDF4dUlDb2dRSE5wYm1ObElEUXVNeTR3WEc0Z0tpQkFZMkYwWldkdmNua2dUR0Z1WjF4dUlDb2dRSEJoY21GdElIc3FmU0IyWVd4MVpTQlVhR1VnZG1Gc2RXVWdkRzhnWTJobFkyc3VYRzRnS2lCQWNtVjBkWEp1Y3lCN1ltOXZiR1ZoYm4wZ1VtVjBkWEp1Y3lCZ2RISjFaV0FnYVdZZ1lIWmhiSFZsWUNCcGN5QmhJR0oxWm1abGNpd2daV3h6WlNCZ1ptRnNjMlZnTGx4dUlDb2dRR1Y0WVcxd2JHVmNiaUFxWEc0Z0tpQmZMbWx6UW5WbVptVnlLRzVsZHlCQ2RXWm1aWElvTWlrcE8xeHVJQ29nTHk4Z1BUNGdkSEoxWlZ4dUlDcGNiaUFxSUY4dWFYTkNkV1ptWlhJb2JtVjNJRlZwYm5RNFFYSnlZWGtvTWlrcE8xeHVJQ29nTHk4Z1BUNGdabUZzYzJWY2JpQXFMMXh1ZG1GeUlHbHpRblZtWm1WeUlEMGdibUYwYVhabFNYTkNkV1ptWlhJZ2ZId2djM1IxWWtaaGJITmxPMXh1WEc0dktpcGNiaUFxSUVOb1pXTnJjeUJwWmlCZ2RtRnNkV1ZnSUdseklHTnNZWE56YVdacFpXUWdZWE1nWVNCZ1JuVnVZM1JwYjI1Z0lHOWlhbVZqZEM1Y2JpQXFYRzRnS2lCQWMzUmhkR2xqWEc0Z0tpQkFiV1Z0WW1WeVQyWWdYMXh1SUNvZ1FITnBibU5sSURBdU1TNHdYRzRnS2lCQVkyRjBaV2R2Y25rZ1RHRnVaMXh1SUNvZ1FIQmhjbUZ0SUhzcWZTQjJZV3gxWlNCVWFHVWdkbUZzZFdVZ2RHOGdZMmhsWTJzdVhHNGdLaUJBY21WMGRYSnVjeUI3WW05dmJHVmhibjBnVW1WMGRYSnVjeUJnZEhKMVpXQWdhV1lnWUhaaGJIVmxZQ0JwY3lCaElHWjFibU4wYVc5dUxDQmxiSE5sSUdCbVlXeHpaV0F1WEc0Z0tpQkFaWGhoYlhCc1pWeHVJQ3BjYmlBcUlGOHVhWE5HZFc1amRHbHZiaWhmS1R0Y2JpQXFJQzh2SUQwK0lIUnlkV1ZjYmlBcVhHNGdLaUJmTG1selJuVnVZM1JwYjI0b0wyRmlZeThwTzF4dUlDb2dMeThnUFQ0Z1ptRnNjMlZjYmlBcUwxeHVablZ1WTNScGIyNGdhWE5HZFc1amRHbHZiaWgyWVd4MVpTa2dlMXh1SUNBdkx5QlVhR1VnZFhObElHOW1JR0JQWW1wbFkzUWpkRzlUZEhKcGJtZGdJR0YyYjJsa2N5QnBjM04xWlhNZ2QybDBhQ0IwYUdVZ1lIUjVjR1Z2Wm1BZ2IzQmxjbUYwYjNKY2JpQWdMeThnYVc0Z1UyRm1ZWEpwSURndE9TQjNhR2xqYUNCeVpYUjFjbTV6SUNkdlltcGxZM1FuSUdadmNpQjBlWEJsWkNCaGNuSmhlU0JoYm1RZ2IzUm9aWElnWTI5dWMzUnlkV04wYjNKekxseHVJQ0IyWVhJZ2RHRm5JRDBnYVhOUFltcGxZM1FvZG1Gc2RXVXBJRDhnYjJKcVpXTjBWRzlUZEhKcGJtY3VZMkZzYkNoMllXeDFaU2tnT2lBbkp6dGNiaUFnY21WMGRYSnVJSFJoWnlBOVBTQm1kVzVqVkdGbklIeDhJSFJoWnlBOVBTQm5aVzVVWVdjN1hHNTlYRzVjYmk4cUtseHVJQ29nUTJobFkydHpJR2xtSUdCMllXeDFaV0FnYVhNZ1lTQjJZV3hwWkNCaGNuSmhlUzFzYVd0bElHeGxibWQwYUM1Y2JpQXFYRzRnS2lBcUtrNXZkR1U2S2lvZ1ZHaHBjeUJ0WlhSb2IyUWdhWE1nYkc5dmMyVnNlU0JpWVhObFpDQnZibHh1SUNvZ1cyQlViMHhsYm1kMGFHQmRLR2gwZEhBNkx5OWxZMjFoTFdsdWRHVnlibUYwYVc5dVlXd3ViM0puTDJWamJXRXRNall5THpjdU1DOGpjMlZqTFhSdmJHVnVaM1JvS1M1Y2JpQXFYRzRnS2lCQWMzUmhkR2xqWEc0Z0tpQkFiV1Z0WW1WeVQyWWdYMXh1SUNvZ1FITnBibU5sSURRdU1DNHdYRzRnS2lCQVkyRjBaV2R2Y25rZ1RHRnVaMXh1SUNvZ1FIQmhjbUZ0SUhzcWZTQjJZV3gxWlNCVWFHVWdkbUZzZFdVZ2RHOGdZMmhsWTJzdVhHNGdLaUJBY21WMGRYSnVjeUI3WW05dmJHVmhibjBnVW1WMGRYSnVjeUJnZEhKMVpXQWdhV1lnWUhaaGJIVmxZQ0JwY3lCaElIWmhiR2xrSUd4bGJtZDBhQ3dnWld4elpTQmdabUZzYzJWZ0xseHVJQ29nUUdWNFlXMXdiR1ZjYmlBcVhHNGdLaUJmTG1selRHVnVaM1JvS0RNcE8xeHVJQ29nTHk4Z1BUNGdkSEoxWlZ4dUlDcGNiaUFxSUY4dWFYTk1aVzVuZEdnb1RuVnRZbVZ5TGsxSlRsOVdRVXhWUlNrN1hHNGdLaUF2THlBOVBpQm1ZV3h6WlZ4dUlDcGNiaUFxSUY4dWFYTk1aVzVuZEdnb1NXNW1hVzVwZEhrcE8xeHVJQ29nTHk4Z1BUNGdabUZzYzJWY2JpQXFYRzRnS2lCZkxtbHpUR1Z1WjNSb0tDY3pKeWs3WEc0Z0tpQXZMeUE5UGlCbVlXeHpaVnh1SUNvdlhHNW1kVzVqZEdsdmJpQnBjMHhsYm1kMGFDaDJZV3gxWlNrZ2UxeHVJQ0J5WlhSMWNtNGdkSGx3Wlc5bUlIWmhiSFZsSUQwOUlDZHVkVzFpWlhJbklDWW1YRzRnSUNBZ2RtRnNkV1VnUGlBdE1TQW1KaUIyWVd4MVpTQWxJREVnUFQwZ01DQW1KaUIyWVd4MVpTQThQU0JOUVZoZlUwRkdSVjlKVGxSRlIwVlNPMXh1ZlZ4dVhHNHZLaXBjYmlBcUlFTm9aV05yY3lCcFppQmdkbUZzZFdWZ0lHbHpJSFJvWlZ4dUlDb2dXMnhoYm1kMVlXZGxJSFI1Y0dWZEtHaDBkSEE2THk5M2QzY3VaV050WVMxcGJuUmxjbTVoZEdsdmJtRnNMbTl5Wnk5bFkyMWhMVEkyTWk4M0xqQXZJM05sWXkxbFkyMWhjMk55YVhCMExXeGhibWQxWVdkbExYUjVjR1Z6S1Z4dUlDb2diMllnWUU5aWFtVmpkR0F1SUNobExtY3VJR0Z5Y21GNWN5d2dablZ1WTNScGIyNXpMQ0J2WW1wbFkzUnpMQ0J5WldkbGVHVnpMQ0JnYm1WM0lFNTFiV0psY2lnd0tXQXNJR0Z1WkNCZ2JtVjNJRk4wY21sdVp5Z25KeWxnS1Z4dUlDcGNiaUFxSUVCemRHRjBhV05jYmlBcUlFQnRaVzFpWlhKUFppQmZYRzRnS2lCQWMybHVZMlVnTUM0eExqQmNiaUFxSUVCallYUmxaMjl5ZVNCTVlXNW5YRzRnS2lCQWNHRnlZVzBnZXlwOUlIWmhiSFZsSUZSb1pTQjJZV3gxWlNCMGJ5QmphR1ZqYXk1Y2JpQXFJRUJ5WlhSMWNtNXpJSHRpYjI5c1pXRnVmU0JTWlhSMWNtNXpJR0IwY25WbFlDQnBaaUJnZG1Gc2RXVmdJR2x6SUdGdUlHOWlhbVZqZEN3Z1pXeHpaU0JnWm1Gc2MyVmdMbHh1SUNvZ1FHVjRZVzF3YkdWY2JpQXFYRzRnS2lCZkxtbHpUMkpxWldOMEtIdDlLVHRjYmlBcUlDOHZJRDArSUhSeWRXVmNiaUFxWEc0Z0tpQmZMbWx6VDJKcVpXTjBLRnN4TENBeUxDQXpYU2s3WEc0Z0tpQXZMeUE5UGlCMGNuVmxYRzRnS2x4dUlDb2dYeTVwYzA5aWFtVmpkQ2hmTG01dmIzQXBPMXh1SUNvZ0x5OGdQVDRnZEhKMVpWeHVJQ3BjYmlBcUlGOHVhWE5QWW1wbFkzUW9iblZzYkNrN1hHNGdLaUF2THlBOVBpQm1ZV3h6WlZ4dUlDb3ZYRzVtZFc1amRHbHZiaUJwYzA5aWFtVmpkQ2gyWVd4MVpTa2dlMXh1SUNCMllYSWdkSGx3WlNBOUlIUjVjR1Z2WmlCMllXeDFaVHRjYmlBZ2NtVjBkWEp1SUNFaGRtRnNkV1VnSmlZZ0tIUjVjR1VnUFQwZ0oyOWlhbVZqZENjZ2ZId2dkSGx3WlNBOVBTQW5ablZ1WTNScGIyNG5LVHRjYm4xY2JseHVMeW9xWEc0Z0tpQkRhR1ZqYTNNZ2FXWWdZSFpoYkhWbFlDQnBjeUJ2WW1wbFkzUXRiR2xyWlM0Z1FTQjJZV3gxWlNCcGN5QnZZbXBsWTNRdGJHbHJaU0JwWmlCcGRDZHpJRzV2ZENCZ2JuVnNiR0JjYmlBcUlHRnVaQ0JvWVhNZ1lTQmdkSGx3Wlc5bVlDQnlaWE4xYkhRZ2IyWWdYQ0p2WW1wbFkzUmNJaTVjYmlBcVhHNGdLaUJBYzNSaGRHbGpYRzRnS2lCQWJXVnRZbVZ5VDJZZ1gxeHVJQ29nUUhOcGJtTmxJRFF1TUM0d1hHNGdLaUJBWTJGMFpXZHZjbmtnVEdGdVoxeHVJQ29nUUhCaGNtRnRJSHNxZlNCMllXeDFaU0JVYUdVZ2RtRnNkV1VnZEc4Z1kyaGxZMnN1WEc0Z0tpQkFjbVYwZFhKdWN5QjdZbTl2YkdWaGJuMGdVbVYwZFhKdWN5QmdkSEoxWldBZ2FXWWdZSFpoYkhWbFlDQnBjeUJ2WW1wbFkzUXRiR2xyWlN3Z1pXeHpaU0JnWm1Gc2MyVmdMbHh1SUNvZ1FHVjRZVzF3YkdWY2JpQXFYRzRnS2lCZkxtbHpUMkpxWldOMFRHbHJaU2g3ZlNrN1hHNGdLaUF2THlBOVBpQjBjblZsWEc0Z0tseHVJQ29nWHk1cGMwOWlhbVZqZEV4cGEyVW9XekVzSURJc0lETmRLVHRjYmlBcUlDOHZJRDArSUhSeWRXVmNiaUFxWEc0Z0tpQmZMbWx6VDJKcVpXTjBUR2xyWlNoZkxtNXZiM0FwTzF4dUlDb2dMeThnUFQ0Z1ptRnNjMlZjYmlBcVhHNGdLaUJmTG1selQySnFaV04wVEdsclpTaHVkV3hzS1R0Y2JpQXFJQzh2SUQwK0lHWmhiSE5sWEc0Z0tpOWNibVoxYm1OMGFXOXVJR2x6VDJKcVpXTjBUR2xyWlNoMllXeDFaU2tnZTF4dUlDQnlaWFIxY200Z0lTRjJZV3gxWlNBbUppQjBlWEJsYjJZZ2RtRnNkV1VnUFQwZ0oyOWlhbVZqZENjN1hHNTlYRzVjYmk4cUtseHVJQ29nUTJobFkydHpJR2xtSUdCMllXeDFaV0FnYVhNZ1lTQndiR0ZwYmlCdlltcGxZM1FzSUhSb1lYUWdhWE1zSUdGdUlHOWlhbVZqZENCamNtVmhkR1ZrSUdKNUlIUm9aVnh1SUNvZ1lFOWlhbVZqZEdBZ1kyOXVjM1J5ZFdOMGIzSWdiM0lnYjI1bElIZHBkR2dnWVNCZ1cxdFFjbTkwYjNSNWNHVmRYV0FnYjJZZ1lHNTFiR3hnTGx4dUlDcGNiaUFxSUVCemRHRjBhV05jYmlBcUlFQnRaVzFpWlhKUFppQmZYRzRnS2lCQWMybHVZMlVnTUM0NExqQmNiaUFxSUVCallYUmxaMjl5ZVNCTVlXNW5YRzRnS2lCQWNHRnlZVzBnZXlwOUlIWmhiSFZsSUZSb1pTQjJZV3gxWlNCMGJ5QmphR1ZqYXk1Y2JpQXFJRUJ5WlhSMWNtNXpJSHRpYjI5c1pXRnVmU0JTWlhSMWNtNXpJR0IwY25WbFlDQnBaaUJnZG1Gc2RXVmdJR2x6SUdFZ2NHeGhhVzRnYjJKcVpXTjBMQ0JsYkhObElHQm1ZV3h6WldBdVhHNGdLaUJBWlhoaGJYQnNaVnh1SUNwY2JpQXFJR1oxYm1OMGFXOXVJRVp2YnlncElIdGNiaUFxSUNBZ2RHaHBjeTVoSUQwZ01UdGNiaUFxSUgxY2JpQXFYRzRnS2lCZkxtbHpVR3hoYVc1UFltcGxZM1FvYm1WM0lFWnZieWs3WEc0Z0tpQXZMeUE5UGlCbVlXeHpaVnh1SUNwY2JpQXFJRjh1YVhOUWJHRnBiazlpYW1WamRDaGJNU3dnTWl3Z00xMHBPMXh1SUNvZ0x5OGdQVDRnWm1Gc2MyVmNiaUFxWEc0Z0tpQmZMbWx6VUd4aGFXNVBZbXBsWTNRb2V5QW5lQ2M2SURBc0lDZDVKem9nTUNCOUtUdGNiaUFxSUM4dklEMCtJSFJ5ZFdWY2JpQXFYRzRnS2lCZkxtbHpVR3hoYVc1UFltcGxZM1FvVDJKcVpXTjBMbU55WldGMFpTaHVkV3hzS1NrN1hHNGdLaUF2THlBOVBpQjBjblZsWEc0Z0tpOWNibVoxYm1OMGFXOXVJR2x6VUd4aGFXNVBZbXBsWTNRb2RtRnNkV1VwSUh0Y2JpQWdhV1lnS0NGcGMwOWlhbVZqZEV4cGEyVW9kbUZzZFdVcElIeDhYRzRnSUNBZ0lDQnZZbXBsWTNSVWIxTjBjbWx1Wnk1allXeHNLSFpoYkhWbEtTQWhQU0J2WW1wbFkzUlVZV2NnZkh3Z2FYTkliM04wVDJKcVpXTjBLSFpoYkhWbEtTa2dlMXh1SUNBZ0lISmxkSFZ5YmlCbVlXeHpaVHRjYmlBZ2ZWeHVJQ0IyWVhJZ2NISnZkRzhnUFNCblpYUlFjbTkwYjNSNWNHVW9kbUZzZFdVcE8xeHVJQ0JwWmlBb2NISnZkRzhnUFQwOUlHNTFiR3dwSUh0Y2JpQWdJQ0J5WlhSMWNtNGdkSEoxWlR0Y2JpQWdmVnh1SUNCMllYSWdRM1J2Y2lBOUlHaGhjMDkzYmxCeWIzQmxjblI1TG1OaGJHd29jSEp2ZEc4c0lDZGpiMjV6ZEhKMVkzUnZjaWNwSUNZbUlIQnliM1J2TG1OdmJuTjBjblZqZEc5eU8xeHVJQ0J5WlhSMWNtNGdLSFI1Y0dWdlppQkRkRzl5SUQwOUlDZG1kVzVqZEdsdmJpY2dKaVpjYmlBZ0lDQkRkRzl5SUdsdWMzUmhibU5sYjJZZ1EzUnZjaUFtSmlCbWRXNWpWRzlUZEhKcGJtY3VZMkZzYkNoRGRHOXlLU0E5UFNCdlltcGxZM1JEZEc5eVUzUnlhVzVuS1R0Y2JuMWNibHh1THlvcVhHNGdLaUJEYUdWamEzTWdhV1lnWUhaaGJIVmxZQ0JwY3lCamJHRnpjMmxtYVdWa0lHRnpJR0VnZEhsd1pXUWdZWEp5WVhrdVhHNGdLbHh1SUNvZ1FITjBZWFJwWTF4dUlDb2dRRzFsYldKbGNrOW1JRjljYmlBcUlFQnphVzVqWlNBekxqQXVNRnh1SUNvZ1FHTmhkR1ZuYjNKNUlFeGhibWRjYmlBcUlFQndZWEpoYlNCN0tuMGdkbUZzZFdVZ1ZHaGxJSFpoYkhWbElIUnZJR05vWldOckxseHVJQ29nUUhKbGRIVnlibk1nZTJKdmIyeGxZVzU5SUZKbGRIVnlibk1nWUhSeWRXVmdJR2xtSUdCMllXeDFaV0FnYVhNZ1lTQjBlWEJsWkNCaGNuSmhlU3dnWld4elpTQmdabUZzYzJWZ0xseHVJQ29nUUdWNFlXMXdiR1ZjYmlBcVhHNGdLaUJmTG1selZIbHdaV1JCY25KaGVTaHVaWGNnVldsdWREaEJjbkpoZVNrN1hHNGdLaUF2THlBOVBpQjBjblZsWEc0Z0tseHVJQ29nWHk1cGMxUjVjR1ZrUVhKeVlYa29XMTBwTzF4dUlDb2dMeThnUFQ0Z1ptRnNjMlZjYmlBcUwxeHVkbUZ5SUdselZIbHdaV1JCY25KaGVTQTlJRzV2WkdWSmMxUjVjR1ZrUVhKeVlYa2dQeUJpWVhObFZXNWhjbmtvYm05a1pVbHpWSGx3WldSQmNuSmhlU2tnT2lCaVlYTmxTWE5VZVhCbFpFRnljbUY1TzF4dVhHNHZLaXBjYmlBcUlFTnZiblpsY25SeklHQjJZV3gxWldBZ2RHOGdZU0J3YkdGcGJpQnZZbXBsWTNRZ1pteGhkSFJsYm1sdVp5QnBibWhsY21sMFpXUWdaVzUxYldWeVlXSnNaU0J6ZEhKcGJtZGNiaUFxSUd0bGVXVmtJSEJ5YjNCbGNuUnBaWE1nYjJZZ1lIWmhiSFZsWUNCMGJ5QnZkMjRnY0hKdmNHVnlkR2xsY3lCdlppQjBhR1VnY0d4aGFXNGdiMkpxWldOMExseHVJQ3BjYmlBcUlFQnpkR0YwYVdOY2JpQXFJRUJ0WlcxaVpYSlBaaUJmWEc0Z0tpQkFjMmx1WTJVZ015NHdMakJjYmlBcUlFQmpZWFJsWjI5eWVTQk1ZVzVuWEc0Z0tpQkFjR0Z5WVcwZ2V5cDlJSFpoYkhWbElGUm9aU0IyWVd4MVpTQjBieUJqYjI1MlpYSjBMbHh1SUNvZ1FISmxkSFZ5Ym5NZ2UwOWlhbVZqZEgwZ1VtVjBkWEp1Y3lCMGFHVWdZMjl1ZG1WeWRHVmtJSEJzWVdsdUlHOWlhbVZqZEM1Y2JpQXFJRUJsZUdGdGNHeGxYRzRnS2x4dUlDb2dablZ1WTNScGIyNGdSbTl2S0NrZ2UxeHVJQ29nSUNCMGFHbHpMbUlnUFNBeU8xeHVJQ29nZlZ4dUlDcGNiaUFxSUVadmJ5NXdjbTkwYjNSNWNHVXVZeUE5SURNN1hHNGdLbHh1SUNvZ1h5NWhjM05wWjI0b2V5QW5ZU2M2SURFZ2ZTd2dibVYzSUVadmJ5azdYRzRnS2lBdkx5QTlQaUI3SUNkaEp6b2dNU3dnSjJJbk9pQXlJSDFjYmlBcVhHNGdLaUJmTG1GemMybG5iaWg3SUNkaEp6b2dNU0I5TENCZkxuUnZVR3hoYVc1UFltcGxZM1FvYm1WM0lFWnZieWtwTzF4dUlDb2dMeThnUFQ0Z2V5QW5ZU2M2SURFc0lDZGlKem9nTWl3Z0oyTW5PaUF6SUgxY2JpQXFMMXh1Wm5WdVkzUnBiMjRnZEc5UWJHRnBiazlpYW1WamRDaDJZV3gxWlNrZ2UxeHVJQ0J5WlhSMWNtNGdZMjl3ZVU5aWFtVmpkQ2gyWVd4MVpTd2dhMlY1YzBsdUtIWmhiSFZsS1NrN1hHNTlYRzVjYmk4cUtseHVJQ29nUTNKbFlYUmxjeUJoYmlCaGNuSmhlU0J2WmlCMGFHVWdiM2R1SUdWdWRXMWxjbUZpYkdVZ2NISnZjR1Z5ZEhrZ2JtRnRaWE1nYjJZZ1lHOWlhbVZqZEdBdVhHNGdLbHh1SUNvZ0tpcE9iM1JsT2lvcUlFNXZiaTF2WW1wbFkzUWdkbUZzZFdWeklHRnlaU0JqYjJWeVkyVmtJSFJ2SUc5aWFtVmpkSE11SUZObFpTQjBhR1ZjYmlBcUlGdEZVeUJ6Y0dWalhTaG9kSFJ3T2k4dlpXTnRZUzFwYm5SbGNtNWhkR2x2Ym1Gc0xtOXlaeTlsWTIxaExUSTJNaTgzTGpBdkkzTmxZeTF2WW1wbFkzUXVhMlY1Y3lsY2JpQXFJR1p2Y2lCdGIzSmxJR1JsZEdGcGJITXVYRzRnS2x4dUlDb2dRSE4wWVhScFkxeHVJQ29nUUhOcGJtTmxJREF1TVM0d1hHNGdLaUJBYldWdFltVnlUMllnWDF4dUlDb2dRR05oZEdWbmIzSjVJRTlpYW1WamRGeHVJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJRzlpYW1WamRDQlVhR1VnYjJKcVpXTjBJSFJ2SUhGMVpYSjVMbHh1SUNvZ1FISmxkSFZ5Ym5NZ2UwRnljbUY1ZlNCU1pYUjFjbTV6SUhSb1pTQmhjbkpoZVNCdlppQndjbTl3WlhKMGVTQnVZVzFsY3k1Y2JpQXFJRUJsZUdGdGNHeGxYRzRnS2x4dUlDb2dablZ1WTNScGIyNGdSbTl2S0NrZ2UxeHVJQ29nSUNCMGFHbHpMbUVnUFNBeE8xeHVJQ29nSUNCMGFHbHpMbUlnUFNBeU8xeHVJQ29nZlZ4dUlDcGNiaUFxSUVadmJ5NXdjbTkwYjNSNWNHVXVZeUE5SURNN1hHNGdLbHh1SUNvZ1h5NXJaWGx6S0c1bGR5QkdiMjhwTzF4dUlDb2dMeThnUFQ0Z1d5ZGhKeXdnSjJJblhTQW9hWFJsY21GMGFXOXVJRzl5WkdWeUlHbHpJRzV2ZENCbmRXRnlZVzUwWldWa0tWeHVJQ3BjYmlBcUlGOHVhMlY1Y3lnbmFHa25LVHRjYmlBcUlDOHZJRDArSUZzbk1DY3NJQ2N4SjExY2JpQXFMMXh1Wm5WdVkzUnBiMjRnYTJWNWN5aHZZbXBsWTNRcElIdGNiaUFnY21WMGRYSnVJR2x6UVhKeVlYbE1hV3RsS0c5aWFtVmpkQ2tnUHlCaGNuSmhlVXhwYTJWTFpYbHpLRzlpYW1WamRDa2dPaUJpWVhObFMyVjVjeWh2WW1wbFkzUXBPMXh1ZlZ4dVhHNHZLaXBjYmlBcUlFTnlaV0YwWlhNZ1lXNGdZWEp5WVhrZ2IyWWdkR2hsSUc5M2JpQmhibVFnYVc1b1pYSnBkR1ZrSUdWdWRXMWxjbUZpYkdVZ2NISnZjR1Z5ZEhrZ2JtRnRaWE1nYjJZZ1lHOWlhbVZqZEdBdVhHNGdLbHh1SUNvZ0tpcE9iM1JsT2lvcUlFNXZiaTF2WW1wbFkzUWdkbUZzZFdWeklHRnlaU0JqYjJWeVkyVmtJSFJ2SUc5aWFtVmpkSE11WEc0Z0tseHVJQ29nUUhOMFlYUnBZMXh1SUNvZ1FHMWxiV0psY2s5bUlGOWNiaUFxSUVCemFXNWpaU0F6TGpBdU1GeHVJQ29nUUdOaGRHVm5iM0o1SUU5aWFtVmpkRnh1SUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I5SUc5aWFtVmpkQ0JVYUdVZ2IySnFaV04wSUhSdklIRjFaWEo1TGx4dUlDb2dRSEpsZEhWeWJuTWdlMEZ5Y21GNWZTQlNaWFIxY201eklIUm9aU0JoY25KaGVTQnZaaUJ3Y205d1pYSjBlU0J1WVcxbGN5NWNiaUFxSUVCbGVHRnRjR3hsWEc0Z0tseHVJQ29nWm5WdVkzUnBiMjRnUm05dktDa2dlMXh1SUNvZ0lDQjBhR2x6TG1FZ1BTQXhPMXh1SUNvZ0lDQjBhR2x6TG1JZ1BTQXlPMXh1SUNvZ2ZWeHVJQ3BjYmlBcUlFWnZieTV3Y205MGIzUjVjR1V1WXlBOUlETTdYRzRnS2x4dUlDb2dYeTVyWlhselNXNG9ibVYzSUVadmJ5azdYRzRnS2lBdkx5QTlQaUJiSjJFbkxDQW5ZaWNzSUNkakoxMGdLR2wwWlhKaGRHbHZiaUJ2Y21SbGNpQnBjeUJ1YjNRZ1ozVmhjbUZ1ZEdWbFpDbGNiaUFxTDF4dVpuVnVZM1JwYjI0Z2EyVjVjMGx1S0c5aWFtVmpkQ2tnZTF4dUlDQnlaWFIxY200Z2FYTkJjbkpoZVV4cGEyVW9iMkpxWldOMEtTQS9JR0Z5Y21GNVRHbHJaVXRsZVhNb2IySnFaV04wTENCMGNuVmxLU0E2SUdKaGMyVkxaWGx6U1c0b2IySnFaV04wS1R0Y2JuMWNibHh1THlvcVhHNGdLaUJVYUdseklHMWxkR2h2WkNCcGN5QnNhV3RsSUdCZkxtRnpjMmxuYm1BZ1pYaGpaWEIwSUhSb1lYUWdhWFFnY21WamRYSnphWFpsYkhrZ2JXVnlaMlZ6SUc5M2JpQmhibVJjYmlBcUlHbHVhR1Z5YVhSbFpDQmxiblZ0WlhKaFlteGxJSE4wY21sdVp5QnJaWGxsWkNCd2NtOXdaWEowYVdWeklHOW1JSE52ZFhKalpTQnZZbXBsWTNSeklHbHVkRzhnZEdobFhHNGdLaUJrWlhOMGFXNWhkR2x2YmlCdlltcGxZM1F1SUZOdmRYSmpaU0J3Y205d1pYSjBhV1Z6SUhSb1lYUWdjbVZ6YjJ4MlpTQjBieUJnZFc1a1pXWnBibVZrWUNCaGNtVmNiaUFxSUhOcmFYQndaV1FnYVdZZ1lTQmtaWE4wYVc1aGRHbHZiaUIyWVd4MVpTQmxlR2x6ZEhNdUlFRnljbUY1SUdGdVpDQndiR0ZwYmlCdlltcGxZM1FnY0hKdmNHVnlkR2xsYzF4dUlDb2dZWEpsSUcxbGNtZGxaQ0J5WldOMWNuTnBkbVZzZVM0Z1QzUm9aWElnYjJKcVpXTjBjeUJoYm1RZ2RtRnNkV1VnZEhsd1pYTWdZWEpsSUc5MlpYSnlhV1JrWlc0Z1lubGNiaUFxSUdGemMybG5ibTFsYm5RdUlGTnZkWEpqWlNCdlltcGxZM1J6SUdGeVpTQmhjSEJzYVdWa0lHWnliMjBnYkdWbWRDQjBieUJ5YVdkb2RDNGdVM1ZpYzJWeGRXVnVkRnh1SUNvZ2MyOTFjbU5sY3lCdmRtVnlkM0pwZEdVZ2NISnZjR1Z5ZEhrZ1lYTnphV2R1YldWdWRITWdiMllnY0hKbGRtbHZkWE1nYzI5MWNtTmxjeTVjYmlBcVhHNGdLaUFxS2s1dmRHVTZLaW9nVkdocGN5QnRaWFJvYjJRZ2JYVjBZWFJsY3lCZ2IySnFaV04wWUM1Y2JpQXFYRzRnS2lCQWMzUmhkR2xqWEc0Z0tpQkFiV1Z0WW1WeVQyWWdYMXh1SUNvZ1FITnBibU5sSURBdU5TNHdYRzRnS2lCQVkyRjBaV2R2Y25rZ1QySnFaV04wWEc0Z0tpQkFjR0Z5WVcwZ2UwOWlhbVZqZEgwZ2IySnFaV04wSUZSb1pTQmtaWE4wYVc1aGRHbHZiaUJ2WW1wbFkzUXVYRzRnS2lCQWNHRnlZVzBnZXk0dUxrOWlhbVZqZEgwZ1czTnZkWEpqWlhOZElGUm9aU0J6YjNWeVkyVWdiMkpxWldOMGN5NWNiaUFxSUVCeVpYUjFjbTV6SUh0UFltcGxZM1I5SUZKbGRIVnlibk1nWUc5aWFtVmpkR0F1WEc0Z0tpQkFaWGhoYlhCc1pWeHVJQ3BjYmlBcUlIWmhjaUJ2WW1wbFkzUWdQU0I3WEc0Z0tpQWdJQ2RoSnpvZ1czc2dKMkluT2lBeUlIMHNJSHNnSjJRbk9pQTBJSDFkWEc0Z0tpQjlPMXh1SUNwY2JpQXFJSFpoY2lCdmRHaGxjaUE5SUh0Y2JpQXFJQ0FnSjJFbk9pQmJleUFuWXljNklETWdmU3dnZXlBblpTYzZJRFVnZlYxY2JpQXFJSDA3WEc0Z0tseHVJQ29nWHk1dFpYSm5aU2h2WW1wbFkzUXNJRzkwYUdWeUtUdGNiaUFxSUM4dklEMCtJSHNnSjJFbk9pQmJleUFuWWljNklESXNJQ2RqSnpvZ015QjlMQ0I3SUNka0p6b2dOQ3dnSjJVbk9pQTFJSDFkSUgxY2JpQXFMMXh1ZG1GeUlHMWxjbWRsSUQwZ1kzSmxZWFJsUVhOemFXZHVaWElvWm5WdVkzUnBiMjRvYjJKcVpXTjBMQ0J6YjNWeVkyVXNJSE55WTBsdVpHVjRLU0I3WEc0Z0lHSmhjMlZOWlhKblpTaHZZbXBsWTNRc0lITnZkWEpqWlN3Z2MzSmpTVzVrWlhncE8xeHVmU2s3WEc1Y2JpOHFLbHh1SUNvZ1ZHaHBjeUJ0WlhSb2IyUWdjbVYwZFhKdWN5QmhJRzVsZHlCbGJYQjBlU0JoY25KaGVTNWNiaUFxWEc0Z0tpQkFjM1JoZEdsalhHNGdLaUJBYldWdFltVnlUMllnWDF4dUlDb2dRSE5wYm1ObElEUXVNVE11TUZ4dUlDb2dRR05oZEdWbmIzSjVJRlYwYVd4Y2JpQXFJRUJ5WlhSMWNtNXpJSHRCY25KaGVYMGdVbVYwZFhKdWN5QjBhR1VnYm1WM0lHVnRjSFI1SUdGeWNtRjVMbHh1SUNvZ1FHVjRZVzF3YkdWY2JpQXFYRzRnS2lCMllYSWdZWEp5WVhseklEMGdYeTUwYVcxbGN5Z3lMQ0JmTG5OMGRXSkJjbkpoZVNrN1hHNGdLbHh1SUNvZ1kyOXVjMjlzWlM1c2IyY29ZWEp5WVhsektUdGNiaUFxSUM4dklEMCtJRnRiWFN3Z1cxMWRYRzRnS2x4dUlDb2dZMjl1YzI5c1pTNXNiMmNvWVhKeVlYbHpXekJkSUQwOVBTQmhjbkpoZVhOYk1WMHBPMXh1SUNvZ0x5OGdQVDRnWm1Gc2MyVmNiaUFxTDF4dVpuVnVZM1JwYjI0Z2MzUjFZa0Z5Y21GNUtDa2dlMXh1SUNCeVpYUjFjbTRnVzEwN1hHNTlYRzVjYmk4cUtseHVJQ29nVkdocGN5QnRaWFJvYjJRZ2NtVjBkWEp1Y3lCZ1ptRnNjMlZnTGx4dUlDcGNiaUFxSUVCemRHRjBhV05jYmlBcUlFQnRaVzFpWlhKUFppQmZYRzRnS2lCQWMybHVZMlVnTkM0eE15NHdYRzRnS2lCQVkyRjBaV2R2Y25rZ1ZYUnBiRnh1SUNvZ1FISmxkSFZ5Ym5NZ2UySnZiMnhsWVc1OUlGSmxkSFZ5Ym5NZ1lHWmhiSE5sWUM1Y2JpQXFJRUJsZUdGdGNHeGxYRzRnS2x4dUlDb2dYeTUwYVcxbGN5Z3lMQ0JmTG5OMGRXSkdZV3h6WlNrN1hHNGdLaUF2THlBOVBpQmJabUZzYzJVc0lHWmhiSE5sWFZ4dUlDb3ZYRzVtZFc1amRHbHZiaUJ6ZEhWaVJtRnNjMlVvS1NCN1hHNGdJSEpsZEhWeWJpQm1ZV3h6WlR0Y2JuMWNibHh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0J0WlhKblpUdGNiaUpkZlE9PSIsIid1c2Ugc3RyaWN0JztcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIG1lcmdlID0gcmVxdWlyZSgnbG9kYXNoLm1lcmdlJyk7XG52YXIgQmFzZSA9IHJlcXVpcmUoJy4vYmFzZS5qcycpO1xudmFyIFN0cmF0ZWd5ID0gcmVxdWlyZSgnLi9zdHJhdGVneS5qcycpO1xudmFyIElkZW50aWZpZXIgPSByZXF1aXJlKCcuL2lkZW50aWZpZXIuanMnKTtcbnZhciBUcmlwbGUgPSByZXF1aXJlKCcuL3RyaXBsZS5qcycpO1xudmFyIExTZXFOb2RlID0gcmVxdWlyZSgnLi9sc2Vxbm9kZS5qcycpO1xuXG4vKipcbiAqIERpc3RyaWJ1dGVkIGFycmF5IHVzaW5nIExTZXEgYWxsb2NhdGlvbiBzdHJhdGVneSB3aXRoIGFuIHVuZGVybHlpbmdcbiAqIGV4cG9uZW50aWFsIHRyZWUuXG4gKi9cblxudmFyIExTZXFUcmVlID0gZnVuY3Rpb24gKCkge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgZ2xvYmFsbHkgdW5pcXVlIHNpdGUgaWRlbnRpZmllci5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIFRoZSBvcHRpb25zIG9mIHRoZSBMU2VxVHJlZS5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuYm91bmRhcnkgPSAxMF0gVGhlIG1heGltYWwgaW50ZXJ2YWwgYmV0d2VlbiB0d29cbiAgICAgKiBnZW5lcmF0ZWQgbm9kZXMuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmJhc2UgPSAxNV0gVGhlIGJhc2UsIGkuZS4sIHRoZSBtYXhpbWFsIGFyaXR5IG9mXG4gICAgICogdGhlIHJvb3Qgbm9kZS4gRGVmYXVsdCBpcyAyKioxNS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBMU2VxVHJlZShzaXRlKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgJiYgYXJndW1lbnRzWzFdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMV0gOiB7fTtcblxuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTFNlcVRyZWUpO1xuXG4gICAgICAgIHZhciBsaXN0VHJpcGxlID0gdm9pZCAwO1xuICAgICAgICAvLyAjMCBwcm9jZXNzIG9wdGlvbnNcbiAgICAgICAgdGhpcy5vcHRpb25zID0gbWVyZ2UoeyBib3VuZGFyeTogMTAsIGJhc2U6IDE1IH0sIG9wdGlvbnMpO1xuXG4gICAgICAgIC8vICMxIGluaXRpYWxpemUgc291cmNlLCBjb3VudGVyLCBhbmQgc3RyYXRlZ3kgY2hvaWNlXG4gICAgICAgIHRoaXMuX3MgPSBzaXRlO1xuICAgICAgICB0aGlzLl9jID0gMDtcbiAgICAgICAgdGhpcy5faGFzaCA9IGZ1bmN0aW9uIChkZXB0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGRlcHRoICUgMjtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLl9iYXNlID0gbmV3IEJhc2UodGhpcy5vcHRpb25zLmJhc2UpO1xuICAgICAgICB0aGlzLl9zdHJhdGVneSA9IG5ldyBTdHJhdGVneSh0aGlzLl9iYXNlLCB0aGlzLm9wdGlvbnMuYm91bmRhcnkpO1xuXG4gICAgICAgIC8vICMyIGluaXRpYWxpemUgdHJlZSBzdHJ1Y3R1cmUgd2l0aCBtYXhpbWFsIGJvdW5kc1xuICAgICAgICB0aGlzLnJvb3QgPSBuZXcgTFNlcU5vZGUoKTtcbiAgICAgICAgLy8gI0EgbWluaW1hbCBib3VuZFxuICAgICAgICB0aGlzLnJvb3QuYWRkKG5ldyBMU2VxTm9kZShbbmV3IFRyaXBsZSgwLCAwLCAwKV0sICcnKSk7XG4gICAgICAgIC8vICNCIG1heGltYWwgYm91bmRcbiAgICAgICAgdGhpcy5yb290LmFkZChuZXcgTFNlcU5vZGUoW25ldyBUcmlwbGUoTWF0aC5wb3coMiwgdGhpcy5fYmFzZS5nZXRCaXRCYXNlKDApKSAtIDEsIE51bWJlci5NQVhfVkFMVUUsIE51bWJlci5NQVhfVkFMVUUpXSwgJycpKTtcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoTFNlcVRyZWUsIFt7XG4gICAgICAgIGtleTogJ2dldCcsXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IHRoZSBlbGVtZW50IGF0IHRhcmdldGVkIGluZGV4IGluIHRoZSBsaW5lYXJpemVkIHNlcXVlbmNlLiBJdCBkb2VzIG5vdFxuICAgICAgICAgKiB0YWtlIGludG8gYWNjb3VudCB0aGUgaGlkZGVuIGJvdW5kYXJpZXMgb2YgdGhlIHNlcXVlbmNlIFtNSU4sIGVfMSwgZV8yLFxuICAgICAgICAgKiAuLi4gZV9sZW5ndGgsIE1BWF0sIGhlbmNlIGluZGV4IG9mIGVfMSBpcyAwLlxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXggVGhlIGluZGV4IG9mIHRoZSBlbGVtZW50IGluIHRoZSBmbGF0dGVuZWQgYXJyYXkuXG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIGVsZW1lbnQgbG9jYXRlZCBhdCB0aGUgaW5kZXggaW4gYXJndW1lbnQuXG4gICAgICAgICAqL1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0KGluZGV4KSB7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IHRoaXMucm9vdC5nZXQoaW5kZXggKyAxKTtcbiAgICAgICAgICAgIHdoaWxlICghbm9kZS5pc0xlYWYpIHtcbiAgICAgICAgICAgICAgICBub2RlID0gbm9kZS5jaGlsZDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gbm9kZS5lO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdfZ2V0JyxcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcHJpdmF0ZSBHZXQgdGhlIExTZXFOb2RlIGF0IHRhcmdldGVkIGluZGV4IGluIHRoZSBsaW5lYXJpemVkXG4gICAgICAgICAqIHNlcXVlbmNlLiBUaGUgc2VxdWVuY2UgaW5jbHVkZXMgdGhlIGhpZGRlbiBib3VuZGFyaWVzIFtNSU4sIGVfMSwgZV8yLFxuICAgICAgICAgKiAuLi4gZV9sZW5ndGgsIE1BWF0sIGhlbmNlIGVfMSdzIGluZGV4IGlzIDEuXG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleCBUaGUgaW5kZXggb2YgdGhlIGVsZW1lbnQgaW4gdGhlIGZsYXR0ZW5lZCBhcnJheS5cbiAgICAgICAgICogQHJldHVybiB7TFNlcU5vZGV9IFRoZSBMU2VxTm9kZSB0YXJnZXRpbmcgdGhlIGVsZW1lbnQgYXQgaW5kZXguXG4gICAgICAgICAqL1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX2dldChpbmRleCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucm9vdC5nZXQoaW5kZXgpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdpbnNlcnQnLFxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEluc2VydCBhIHZhbHVlIGF0IHRoZSB0YXJnZXRlZCBpbmRleC5cbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdG8gaW5zZXJ0LCBlLmcuIGEgY2hhcmFjdGVyIGlmIHRoZVxuICAgICAgICAgKiBzZXF1ZW5jZSBpcyBhIHN0cmluZy5cbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4IFRoZSBwb3NpdGlvbiBpbiB0aGUgYXJyYXkuXG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH0ge19lOiBlbGVtZW50IG9mIE9iamVjdCB0eXBlLCBfaTogSWRlbnRpZmllcn1cbiAgICAgICAgICovXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBpbnNlcnQoZWxlbWVudCwgaW5kZXgpIHtcbiAgICAgICAgICAgIHZhciBwZWkgPSB0aGlzLl9nZXQoaW5kZXgpLFxuICAgICAgICAgICAgICAgIC8vICMxYSBwcmV2aW91cyBib3VuZFxuICAgICAgICAgICAgcWVpID0gdGhpcy5fZ2V0KGluZGV4ICsgMSk7IC8vICMxYiBuZXh0IGJvdW5kXG5cbiAgICAgICAgICAgIC8vICMyYSBpbmNyZW1lbnRpbmcgdGhlIGxvY2FsIGNvdW50ZXJcbiAgICAgICAgICAgIHRoaXMuX2MgKz0gMTtcbiAgICAgICAgICAgIC8vICMyYiBnZW5lcmF0aW5nIHRoZSBpZCBpbmJldHdlZW4gdGhlIGJvdW5kc1xuICAgICAgICAgICAgdmFyIGlkID0gdGhpcy5hbGxvYyhwZWksIHFlaSk7XG5cbiAgICAgICAgICAgIC8vICMzIGFkZCBpdCB0byB0aGUgc3RydWN0dXJlIGFuZCByZXR1cm4gdmFsdWVcbiAgICAgICAgICAgIHZhciBwYWlyID0geyBlbGVtOiBlbGVtZW50LCBpZDogaWQgfTtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlJbnNlcnQocGFpcik7XG4gICAgICAgICAgICByZXR1cm4gcGFpcjtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVtb3ZlJyxcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZWxldGUgdGhlIGVsZW1lbnQgYXQgdGhlIGluZGV4LlxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXggVGhlIGluZGV4IG9mIHRoZSBlbGVtZW50IHRvIGRlbGV0ZSBpbiB0aGUgYXJyYXkuXG4gICAgICAgICAqIEByZXR1cm4ge0lkZW50aWZpZXJ9IFRoZSBpZGVudGlmaWVyIG9mIHRoZSBlbGVtZW50IGF0IHRoZSBpbmRleC5cbiAgICAgICAgICovXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW1vdmUoaW5kZXgpIHtcbiAgICAgICAgICAgIHZhciBlaSA9IHRoaXMuX2dldChpbmRleCArIDEpO1xuICAgICAgICAgICAgdmFyIGkgPSBuZXcgSWRlbnRpZmllcih0aGlzLl9iYXNlKS5mcm9tTm9kZShlaSk7XG4gICAgICAgICAgICB0aGlzLmFwcGx5UmVtb3ZlKGVpKTtcbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdhbGxvYycsXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogR2VuZXJhdGUgdGhlIGRpZ2l0IHBhcnQgb2YgdGhlIGlkZW50aWZpZXJzICBiZXR3ZWVuIHAgYW5kIHEuXG4gICAgICAgICAqIEBwYXJhbSB7TFNlcU5vZGV9IHAgVGhlIGRpZ2l0IHBhcnQgb2YgdGhlIHByZXZpb3VzIGlkZW50aWZpZXIuXG4gICAgICAgICAqIEBwYXJhbSB7TFNlcU5vZGV9IHEgVGhlIGRpZ2l0IHBhcnQgb2YgdGhlIG5leHQgaWRlbnRpZmllci5cbiAgICAgICAgICogQHJldHVybiB7SWRlbnRpZmllcn0gVGhlIG5ldyBpZGVudGlmaWVyIGxvY2F0ZWQgYmV0d2VlbiBwIGFuZCBxLlxuICAgICAgICAgKi9cbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGFsbG9jKHAsIHEpIHtcbiAgICAgICAgICAgIHZhciBpbnRlcnZhbCA9IDAsXG4gICAgICAgICAgICAgICAgbGV2ZWwgPSAwO1xuICAgICAgICAgICAgLy8gIzEgcHJvY2VzcyB0aGUgbGV2ZWwgb2YgdGhlIG5ldyBpZGVudGlmaWVyXG4gICAgICAgICAgICB3aGlsZSAoaW50ZXJ2YWwgPD0gMCkge1xuICAgICAgICAgICAgICAgIC8vIG5vIHJvb20gZm9yIGluc2VydGlvblxuICAgICAgICAgICAgICAgIGludGVydmFsID0gdGhpcy5fYmFzZS5nZXRJbnRlcnZhbChsZXZlbCwgcCwgcSk7XG4gICAgICAgICAgICAgICAgKytsZXZlbDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBsZXZlbCAtPSAxO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2hhc2gobGV2ZWwpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0cmF0ZWd5LmJQbHVzKHAsIHEsIGxldmVsLCBpbnRlcnZhbCwgdGhpcy5fcywgdGhpcy5fYyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdHJhdGVneS5iTWludXMocCwgcSwgbGV2ZWwsIGludGVydmFsLCB0aGlzLl9zLCB0aGlzLl9jKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2FwcGx5SW5zZXJ0JyxcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbnNlcnQgYW4gZWxlbWVudCBjcmVhdGVkIGZyb20gYSByZW1vdGUgc2l0ZSBpbnRvIHRoZSBhcnJheS5cbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHBhaXIgUGFpciBjb250YWluaW5nIHRoZSBpZGVudGlmaWVyIGFuZCB0aGUgZWxlbWVudCB0b1xuICAgICAgICAgKiBpbnNlcnQgaW4gdGhlIGRhdGEgc3RydWN0dXJlLlxuICAgICAgICAgKiBAcGFyYW0ge0lkZW50aWZpZXJ8TFNlcU5vZGV9IHBhaXIuaWQgVGhlIGlkZW50aWZpZXIgb2YgdGhlIGVsZW1lbnQuXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYWlyLmVsZW0gVGhlIGVsZW1lbnQgdG8gaW5zZXJ0LlxuICAgICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtub0luZGV4ID0gdHJ1ZV0gV2hldGhlciBvciBub3QgaXQgc2hvdWxkIHJldHVybiB0aGVcbiAgICAgICAgICogaW5kZXggb2YgdGhlIGluc2VydC5cbiAgICAgICAgICogQHJldHVybiB7TnVtYmVyfEJvb2xlYW59IFRoZSBpbmRleCBvZiB0aGUgbmV3bHkgaW5zZXJ0ZWQgZWxlbWVudCBpbiB0aGVcbiAgICAgICAgICogYXJyYXksIGlmIGFza2VkLiAtMSBpZiB0aGUgZWxlbWVudCBhbHJlYWR5IGV4aXN0cyBhbmQgaGFzIG5vdCBiZWVuIGFkZGVkLlxuICAgICAgICAgKiBJZiBub0luZGV4LCByZXR1cm5zIHRydWUgaWYgdGhlIGVsZW1lbnQgaGFzIGJlZW4gYWRkZWQsIGZhbHNlIG90aGVyd2lzZS5cbiAgICAgICAgICovXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBhcHBseUluc2VydChwYWlyKSB7XG4gICAgICAgICAgICB2YXIgbm9JbmRleCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogdHJ1ZTtcblxuICAgICAgICAgICAgdmFyIG5vZGUgPSB2b2lkIDAsXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdm9pZCAwLFxuICAgICAgICAgICAgICAgIGkgPSB2b2lkIDA7XG4gICAgICAgICAgICAvLyAjMCBjYXN0IGZyb20gdGhlIHByb3BlciB0eXBlXG4gICAgICAgICAgICAvLyAjMEEgdGhlIGlkZW50aWZpZXIgaXMgYW4gSWRlbnRpZmllclxuICAgICAgICAgICAgaSA9IHBhaXIuaWQ7XG4gICAgICAgICAgICBub2RlID0gaSAmJiBpLl9kICYmIGkuX3MgJiYgaS5fYyAmJiBuZXcgSWRlbnRpZmllcih0aGlzLl9iYXNlLCBpLl9kLCBpLl9zLCBpLl9jKS50b05vZGUocGFpci5lbGVtKTtcbiAgICAgICAgICAgIC8vICMwQiB0aGUgaWRlbnRpZmllciBpcyBhIExTZXFOb2RlXG4gICAgICAgICAgICBub2RlID0gaSAmJiBpLnQgJiYgaS5jaGlsZHJlbiAmJiBMU2VxTm9kZS5mcm9tSlNPTihpKSB8fCBub2RlO1xuICAgICAgICAgICAgLy8gIzEgaW50ZWdyYXRlcyB0aGUgbmV3IGVsZW1lbnQgdG8gdGhlIGRhdGEgc3RydWN0dXJlXG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLnJvb3QuYWRkKG5vZGUpO1xuICAgICAgICAgICAgLy8gIzIgaWYgdGhlIGVsZW1lbnQgYXMgYmVlbiBhZGRlZFxuICAgICAgICAgICAgaWYgKG5vSW5kZXgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yb290LmluZGV4T2Yobm9kZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2FwcGx5UmVtb3ZlJyxcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZWxldGUgdGhlIGVsZW1lbnQgd2l0aCB0aGUgdGFyZ2V0ZWQgaWRlbnRpZmllci5cbiAgICAgICAgICogQHBhcmFtIHtJZGVudGlmaWVyfExTZXFOb2RlfSBpIFRoZSBpZGVudGlmaWVyIG9mIHRoZSBlbGVtZW50LlxuICAgICAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSBpbmRleCBvZiB0aGUgZWxlbWVudCBmcmVzaGx5IGRlbGV0ZWQsIC0xIGlmIG5vXG4gICAgICAgICAqIHJlbW92YWwuXG4gICAgICAgICAqL1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gYXBwbHlSZW1vdmUoaSkge1xuICAgICAgICAgICAgdmFyIG5vZGUgPSB2b2lkIDAsXG4gICAgICAgICAgICAgICAgcG9zaXRpb24gPSB2b2lkIDA7XG4gICAgICAgICAgICAvLyAjMCBjYXN0IGZyb20gdGhlIHByb3BlciB0eXBlXG4gICAgICAgICAgICBub2RlID0gaSAmJiBpLl9kICYmIGkuX3MgJiYgaS5fYyAmJiBuZXcgSWRlbnRpZmllcih0aGlzLl9iYXNlLCBpLl9kLCBpLl9zLCBpLl9jKS50b05vZGUobnVsbCk7XG4gICAgICAgICAgICAvLyAjMEIgdGhlIGlkZW50aWZpZXIgaXMgYSBMU0VRTm9kZVxuICAgICAgICAgICAgbm9kZSA9IGkgJiYgaS50ICYmIGkuY2hpbGRyZW4gJiYgTFNlcU5vZGUuZnJvbUpTT04oaSkgfHwgbm9kZTtcbiAgICAgICAgICAgIC8vICMxIGdldCB0aGUgaW5kZXggb2YgdGhlIGVsZW1lbnQgdG8gcmVtb3ZlXG4gICAgICAgICAgICBwb3NpdGlvbiA9IHRoaXMucm9vdC5pbmRleE9mKG5vZGUpO1xuICAgICAgICAgICAgaWYgKHBvc2l0aW9uICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIC8vICMyIGlmIGl0IGV4aXN0cyByZW1vdmUgaXRcbiAgICAgICAgICAgICAgICB0aGlzLnJvb3QuZGVsKG5vZGUpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBwb3NpdGlvbjtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZnJvbUpTT04nLFxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENhc3QgdGhlIEpTT04gb2JqZWN0IGludG8gYSBwcm9wZXIgTFNlcVRyZWUuXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgdGhlIEpTT04gb2JqZWN0IHRvIGNhc3QuXG4gICAgICAgICAqIEByZXR1cm4ge0xTZXFUcmVlfSBBIHNlbGYgcmVmZXJlbmNlLlxuICAgICAgICAgKi9cbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGZyb21KU09OKG9iamVjdCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICAgICAgLy8gIzEgY29weSB0aGUgc291cmNlLCBjb3VudGVyLCBhbmQgbGVuZ3RoIG9mIHRoZSBvYmplY3RcbiAgICAgICAgICAgIHRoaXMuX3MgPSBvYmplY3QuX3M7XG4gICAgICAgICAgICB0aGlzLl9jID0gb2JqZWN0Ll9jO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gb2JqZWN0Lm9wdGlvbnM7XG5cbiAgICAgICAgICAgIHRoaXMuX2Jhc2UgPSBuZXcgQmFzZSh0aGlzLm9wdGlvbnMuYmFzZSk7XG4gICAgICAgICAgICB0aGlzLl9ib3VuZGFyeSA9IG5ldyBTdHJhdGVneSh0aGlzLl9iYXNlLCB0aGlzLm9wdGlvbnMuYm91bmRhcnkpO1xuXG4gICAgICAgICAgICAvLyAjMiBkZXB0aCBmaXJzdCBhZGRpbmdcbiAgICAgICAgICAgIHZhciBkZXB0aEZpcnN0ID0gZnVuY3Rpb24gZGVwdGhGaXJzdChjdXJyZW50Tm9kZSwgY3VycmVudFBhdGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgdHJpcGxlID0gbmV3IFRyaXBsZShjdXJyZW50Tm9kZS50LnAsIGN1cnJlbnROb2RlLnQucywgY3VycmVudE5vZGUudC5jKTtcbiAgICAgICAgICAgICAgICBjdXJyZW50UGF0aC5wdXNoKHRyaXBsZSk7IC8vIHN0YWNrXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnROb2RlLmUgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMucm9vdC5hZGQobmV3IExTZXFOb2RlKGN1cnJlbnRQYXRoLnNsaWNlKCksIGN1cnJlbnROb2RlLmUpKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY3VycmVudE5vZGUuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVwdGhGaXJzdChjdXJyZW50Tm9kZS5jaGlsZHJlbltpXSwgY3VycmVudFBhdGgpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgY3VycmVudFBhdGgucG9wKCk7IC8vIHVuc3RhY2tcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iamVjdC5yb290LmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgZGVwdGhGaXJzdChvYmplY3Qucm9vdC5jaGlsZHJlbltpXSwgW10pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdsZW5ndGgnLFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzLnJvb3Quc3ViQ291bnRlciAtIDI7IC8vIC0yIDogdGhlIGJvdW5kYXJpZXNcbiAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMucm9vdC5faGFzRWxlbWVudCAmJiByZXN1bHQgKyAxIHx8IHJlc3VsdDtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gTFNlcVRyZWU7XG59KCk7XG5cbjtcblxubW9kdWxlLmV4cG9ydHMgPSBMU2VxVHJlZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYklteHpaWEYwY21WbExtcHpJbDBzSW01aGJXVnpJanBiSW0xbGNtZGxJaXdpY21WeGRXbHlaU0lzSWtKaGMyVWlMQ0pUZEhKaGRHVm5lU0lzSWtsa1pXNTBhV1pwWlhJaUxDSlVjbWx3YkdVaUxDSk1VMlZ4VG05a1pTSXNJa3hUWlhGVWNtVmxJaXdpYzJsMFpTSXNJbTl3ZEdsdmJuTWlMQ0pzYVhOMFZISnBjR3hsSWl3aVltOTFibVJoY25raUxDSmlZWE5sSWl3aVgzTWlMQ0pmWXlJc0lsOW9ZWE5vSWl3aVpHVndkR2dpTENKZlltRnpaU0lzSWw5emRISmhkR1ZuZVNJc0luSnZiM1FpTENKaFpHUWlMQ0pOWVhSb0lpd2ljRzkzSWl3aVoyVjBRbWwwUW1GelpTSXNJazUxYldKbGNpSXNJazFCV0Y5V1FVeFZSU0lzSW1sdVpHVjRJaXdpYm05a1pTSXNJbWRsZENJc0ltbHpUR1ZoWmlJc0ltTm9hV3hrSWl3aVpTSXNJbVZzWlcxbGJuUWlMQ0p3WldraUxDSmZaMlYwSWl3aWNXVnBJaXdpYVdRaUxDSmhiR3h2WXlJc0luQmhhWElpTENKbGJHVnRJaXdpWVhCd2JIbEpibk5sY25RaUxDSmxhU0lzSW1raUxDSm1jbTl0VG05a1pTSXNJbUZ3Y0d4NVVtVnRiM1psSWl3aWNDSXNJbkVpTENKcGJuUmxjblpoYkNJc0lteGxkbVZzSWl3aVoyVjBTVzUwWlhKMllXd2lMQ0ppVUd4MWN5SXNJbUpOYVc1MWN5SXNJbTV2U1c1a1pYZ2lMQ0p5WlhOMWJIUWlMQ0pmWkNJc0luUnZUbTlrWlNJc0luUWlMQ0pqYUdsc1pISmxiaUlzSW1aeWIyMUtVMDlPSWl3aWFXNWtaWGhQWmlJc0luQnZjMmwwYVc5dUlpd2laR1ZzSWl3aWIySnFaV04wSWl3aVgySnZkVzVrWVhKNUlpd2laR1Z3ZEdoR2FYSnpkQ0lzSW1OMWNuSmxiblJPYjJSbElpd2lZM1Z5Y21WdWRGQmhkR2dpTENKMGNtbHdiR1VpTENKeklpd2lZeUlzSW5CMWMyZ2lMQ0p6YkdsalpTSXNJbXhsYm1kMGFDSXNJbkJ2Y0NJc0luTjFZa052ZFc1MFpYSWlMQ0pmYUdGelJXeGxiV1Z1ZENJc0ltMXZaSFZzWlNJc0ltVjRjRzl5ZEhNaVhTd2liV0Z3Y0dsdVozTWlPaUpCUVVGQk96czdPenM3UVVGRlFTeEpRVUZOUVN4UlFVRlJReXhSUVVGUkxHTkJRVklzUTBGQlpEdEJRVU5CTEVsQlFVMURMRTlCUVU5RUxGRkJRVkVzVjBGQlVpeERRVUZpTzBGQlEwRXNTVUZCVFVVc1YwRkJWMFlzVVVGQlVTeGxRVUZTTEVOQlFXcENPMEZCUTBFc1NVRkJUVWNzWVVGQllVZ3NVVUZCVVN4cFFrRkJVaXhEUVVGdVFqdEJRVU5CTEVsQlFVMUpMRk5CUVZOS0xGRkJRVkVzWVVGQlVpeERRVUZtTzBGQlEwRXNTVUZCVFVzc1YwRkJWMHdzVVVGQlVTeGxRVUZTTEVOQlFXcENPenRCUVVkQk96czdPenRKUVVsTlRTeFJPenRCUVVWR096czdPenM3T3p0QlFWRkJMSE5DUVVGaFF5eEpRVUZpTEVWQlFXbERPMEZCUVVFc1dVRkJaRU1zVDBGQll5eDFSVUZCU2l4RlFVRkpPenRCUVVGQk96dEJRVU0zUWl4WlFVRkpReXh0UWtGQlNqdEJRVU5CTzBGQlEwRXNZVUZCUzBRc1QwRkJUQ3hIUVVGbFZDeE5RVUZOTEVWQlFVVlhMRlZCUVZVc1JVRkJXaXhGUVVGblFrTXNUVUZCVFN4RlFVRjBRaXhGUVVGT0xFVkJRV3REU0N4UFFVRnNReXhEUVVGbU96dEJRVVZCTzBGQlEwRXNZVUZCUzBrc1JVRkJUQ3hIUVVGVlRDeEpRVUZXTzBGQlEwRXNZVUZCUzAwc1JVRkJUQ3hIUVVGVkxFTkJRVlk3UVVGRFFTeGhRVUZMUXl4TFFVRk1MRWRCUVdFc1ZVRkJRME1zUzBGQlJEdEJRVUZCTEcxQ1FVRlhRU3hSUVVGTkxFTkJRV3BDTzBGQlFVRXNVMEZCWWpzN1FVRkZRU3hoUVVGTFF5eExRVUZNTEVkQlFXRXNTVUZCU1dZc1NVRkJTaXhEUVVGVExFdEJRVXRQTEU5QlFVd3NRMEZCWVVjc1NVRkJkRUlzUTBGQllqdEJRVU5CTEdGQlFVdE5MRk5CUVV3c1IwRkJhVUlzU1VGQlNXWXNVVUZCU2l4RFFVRmhMRXRCUVV0akxFdEJRV3hDTEVWQlFYbENMRXRCUVV0U0xFOUJRVXdzUTBGQllVVXNVVUZCZEVNc1EwRkJha0k3TzBGQlJVRTdRVUZEUVN4aFFVRkxVU3hKUVVGTUxFZEJRVmtzU1VGQlNXSXNVVUZCU2l4RlFVRmFPMEZCUTBFN1FVRkRRU3hoUVVGTFlTeEpRVUZNTEVOQlFWVkRMRWRCUVZZc1EwRkJZeXhKUVVGSlpDeFJRVUZLTEVOQlFXRXNRMEZCUXl4SlFVRkpSQ3hOUVVGS0xFTkJRVmNzUTBGQldDeEZRVUZoTEVOQlFXSXNSVUZCWlN4RFFVRm1MRU5CUVVRc1EwRkJZaXhGUVVGclF5eEZRVUZzUXl4RFFVRmtPMEZCUTBFN1FVRkRRU3hoUVVGTFl5eEpRVUZNTEVOQlFWVkRMRWRCUVZZc1EwRkRTU3hKUVVGSlpDeFJRVUZLTEVOQlFXRXNRMEZCUXl4SlFVRkpSQ3hOUVVGS0xFTkJRVmRuUWl4TFFVRkxReXhIUVVGTUxFTkJRVk1zUTBGQlZDeEZRVUZaTEV0QlFVdE1MRXRCUVV3c1EwRkJWMDBzVlVGQldDeERRVUZ6UWl4RFFVRjBRaXhEUVVGYUxFbEJRWGRETEVOQlFXNUVMRVZCUTFkRExFOUJRVTlETEZOQlJHeENMRVZCUlZkRUxFOUJRVTlETEZOQlJteENMRU5CUVVRc1EwRkJZaXhGUVVVMlF5eEZRVVkzUXl4RFFVUktPMEZCU1VnN096czdPenRCUVZORU96czdPenM3T3pSQ1FVOUxReXhMTEVWQlFVODdRVUZEVWl4blFrRkJTVU1zVDBGQlR5eExRVUZMVWl4SlFVRk1MRU5CUVZWVExFZEJRVllzUTBGQlkwWXNVVUZCVVN4RFFVRjBRaXhEUVVGWU8wRkJRMEVzYlVKQlFVOHNRMEZCUTBNc1MwRkJTMFVzVFVGQllpeEZRVUZ2UWp0QlFVTm9Ra1lzZFVKQlFVOUJMRXRCUVV0SExFdEJRVm83UVVGRFNEdEJRVU5FTEcxQ1FVRlBTQ3hMUVVGTFNTeERRVUZhTzBGQlEwZzdPenM3TzBGQlJVUTdPenM3T3pzN05rSkJUMDFNTEVzc1JVRkJUenRCUVVOVUxHMUNRVUZQTEV0QlFVdFFMRWxCUVV3c1EwRkJWVk1zUjBGQlZpeERRVUZqUml4TFFVRmtMRU5CUVZBN1FVRkRTRHM3T3pzN1FVRkZSRHM3T3pzN096c3JRa0ZQVVUwc1R5eEZRVUZUVGl4TExFVkJRVTg3UVVGRGNFSXNaMEpCUVUxUExFMUJRVTBzUzBGQlMwTXNTVUZCVEN4RFFVRlZVaXhMUVVGV0xFTkJRVm83UVVGQlFTeG5Ra0ZCT0VJN1FVRkRlRUpUTEd0Q1FVRk5MRXRCUVV0RUxFbEJRVXdzUTBGQlZWSXNVVUZCVFN4RFFVRm9RaXhEUVVSYUxFTkJSRzlDTEVOQlJWazdPMEZCUlM5Q08wRkJRMFFzYVVKQlFVdGFMRVZCUVV3c1NVRkJWeXhEUVVGWU8wRkJRMEU3UVVGRFFTeG5Ra0ZCVFhOQ0xFdEJRVXNzUzBGQlMwTXNTMEZCVEN4RFFVRlhTaXhIUVVGWUxFVkJRV2RDUlN4SFFVRm9RaXhEUVVGWU96dEJRVVZCTzBGQlEwRXNaMEpCUVUxSExFOUJRVThzUlVGQlEwTXNUVUZCVFZBc1QwRkJVQ3hGUVVGblFra3NTVUZCU1VFc1JVRkJjRUlzUlVGQllqdEJRVU5CTEdsQ1FVRkxTU3hYUVVGTUxFTkJRV2xDUml4SlFVRnFRanRCUVVOQkxHMUNRVUZQUVN4SlFVRlFPMEZCUTBnN096czdPMEZCUlVRN096czdPeXRDUVV0UldpeExMRVZCUVU4N1FVRkRXQ3huUWtGQlRXVXNTMEZCU3l4TFFVRkxVQ3hKUVVGTUxFTkJRVlZTTEZGQlFWRXNRMEZCYkVJc1EwRkJXRHRCUVVOQkxHZENRVUZOWjBJc1NVRkJTU3hKUVVGSmRFTXNWVUZCU2l4RFFVRmxMRXRCUVV0aExFdEJRWEJDTEVWQlFUSkNNRUlzVVVGQk0wSXNRMEZCYjBOR0xFVkJRWEJETEVOQlFWWTdRVUZEUVN4cFFrRkJTMGNzVjBGQlRDeERRVUZwUWtnc1JVRkJha0k3UVVGRFFTeHRRa0ZCVDBNc1EwRkJVRHRCUVVOSU96czdPenRCUVVkRU96czdPenM3T0VKQlRVOUhMRU1zUlVGQlIwTXNReXhGUVVGSE8wRkJRMVFzWjBKQlFVbERMRmRCUVZjc1EwRkJaanRCUVVGQkxHZENRVUZyUWtNc1VVRkJVU3hEUVVFeFFqdEJRVU5CTzBGQlEwRXNiVUpCUVU5RUxGbEJRVmtzUTBGQmJrSXNSVUZCYzBJN1FVRkJSVHRCUVVOd1FrRXNNa0pCUVZjc1MwRkJTemxDTEV0QlFVd3NRMEZCVjJkRExGZEJRVmdzUTBGQmRVSkVMRXRCUVhaQ0xFVkJRVGhDU0N4RFFVRTVRaXhGUVVGcFEwTXNRMEZCYWtNc1EwRkJXRHRCUVVOQkxHdENRVUZGUlN4TFFVRkdPMEZCUTBnN1FVRkRSRUVzY1VKQlFWTXNRMEZCVkR0QlFVTkJMR2RDUVVGSkxFdEJRVXRxUXl4TFFVRk1MRU5CUVZkcFF5eExRVUZZTEUxQlFYTkNMRU5CUVRGQ0xFVkJRVFpDTzBGQlEzcENMSFZDUVVGUExFdEJRVXM1UWl4VFFVRk1MRU5CUVdWblF5eExRVUZtTEVOQlFYRkNUQ3hEUVVGeVFpeEZRVUYzUWtNc1EwRkJlRUlzUlVGRGNVSkZMRXRCUkhKQ0xFVkJRelJDUkN4UlFVUTFRaXhGUVVWeFFpeExRVUZMYkVNc1JVRkdNVUlzUlVGRk9FSXNTMEZCUzBNc1JVRkdia01zUTBGQlVEdEJRVWRJTEdGQlNrUXNUVUZKVHp0QlFVTklMSFZDUVVGUExFdEJRVXRKTEZOQlFVd3NRMEZCWldsRExFMUJRV1lzUTBGQmMwSk9MRU5CUVhSQ0xFVkJRWGxDUXl4RFFVRjZRaXhGUVVOelFrVXNTMEZFZEVJc1JVRkROa0pFTEZGQlJEZENMRVZCUlhOQ0xFdEJRVXRzUXl4RlFVWXpRaXhGUVVVclFpeExRVUZMUXl4RlFVWndReXhEUVVGUU8wRkJSMGc3UVVGRFNqczdPenM3UVVGSFJEczdPenM3T3pzN096czdPMjlEUVZsaGQwSXNTU3hGUVVGelFqdEJRVUZCTEdkQ1FVRm9RbU1zVDBGQlowSXNkVVZCUVU0c1NVRkJUVHM3UVVGREwwSXNaMEpCUVVsNlFpeGhRVUZLTzBGQlFVRXNaMEpCUVZVd1FpeGxRVUZXTzBGQlFVRXNaMEpCUVd0Q1dDeFZRVUZzUWp0QlFVTkJPMEZCUTBFN1FVRkRRVUVzWjBKQlFVbEtMRXRCUVV0R0xFVkJRVlE3UVVGRFFWUXNiVUpCUVZGbExFdEJRVXRCTEVWQlFVVlpMRVZCUVZBc1NVRkJZVm9zUlVGQlJUZENMRVZCUVdZc1NVRkJjVUkyUWl4RlFVRkZOVUlzUlVGQmRrSXNTVUZEU0N4SlFVRkpWaXhWUVVGS0xFTkJRV1VzUzBGQlMyRXNTMEZCY0VJc1JVRkJNa0o1UWl4RlFVRkZXU3hGUVVFM1FpeEZRVUZwUTFvc1JVRkJSVGRDTEVWQlFXNURMRVZCUVhWRE5rSXNSVUZCUlRWQ0xFVkJRWHBETEVWQlFUWkRlVU1zVFVGQk4wTXNRMEZCYjBScVFpeExRVUZMUXl4SlFVRjZSQ3hEUVVSTU8wRkJSVUU3UVVGRFFWb3NiVUpCUVZGbExFdEJRVXRCTEVWQlFVVmpMRU5CUVZBc1NVRkJXV1FzUlVGQlJXVXNVVUZCWkN4SlFVRXdRbTVFTEZOQlFWTnZSQ3hSUVVGVUxFTkJRV3RDYUVJc1EwRkJiRUlzUTBGQk0wSXNTVUZCYjBSbUxFbEJRVE5FTzBGQlEwRTdRVUZEUVRCQ0xIRkNRVUZUTEV0QlFVdHNReXhKUVVGTUxFTkJRVlZETEVkQlFWWXNRMEZCWTA4c1NVRkJaQ3hEUVVGVU8wRkJRMEU3UVVGRFFTeG5Ra0ZCU1hsQ0xFOUJRVW9zUlVGQllUdEJRVU5VTEhWQ1FVRlBReXhOUVVGUU8wRkJRMGdzWVVGR1JDeE5RVVZQTEVsQlFVbEJMRTFCUVVvc1JVRkJXVHRCUVVObUxIVkNRVUZQTEV0QlFVdHNReXhKUVVGTUxFTkJRVlYzUXl4UFFVRldMRU5CUVd0Q2FFTXNTVUZCYkVJc1EwRkJVRHRCUVVOSUxHRkJSazBzVFVGRlFUdEJRVU5JTEhWQ1FVRlBMRU5CUVVNc1EwRkJVanRCUVVOSU8wRkJRMG83T3pzN08wRkJSVVE3T3pzN096dHZRMEZOWVdVc1F5eEZRVUZITzBGQlExb3NaMEpCUVVsbUxHRkJRVW83UVVGQlFTeG5Ra0ZCVldsRExHbENRVUZXTzBGQlEwRTdRVUZEUVdwRExHMUNRVUZQWlN4TFFVRkxRU3hGUVVGRldTeEZRVUZRTEVsQlFXRmFMRVZCUVVVM1FpeEZRVUZtTEVsQlFYRkNOa0lzUlVGQlJUVkNMRVZCUVhaQ0xFbEJRMFlzU1VGQlNWWXNWVUZCU2l4RFFVRmxMRXRCUVV0aExFdEJRWEJDTEVWQlFUSkNlVUlzUlVGQlJWa3NSVUZCTjBJc1JVRkJhVU5hTEVWQlFVVTNRaXhGUVVGdVF5eEZRVUYxUXpaQ0xFVkJRVVUxUWl4RlFVRjZReXhEUVVGRUxFTkJRU3REZVVNc1RVRkJMME1zUTBGQmMwUXNTVUZCZEVRc1EwRkVTanRCUVVWQk8wRkJRMEUxUWl4dFFrRkJVV1VzUzBGQlMwRXNSVUZCUldNc1EwRkJVQ3hKUVVGWlpDeEZRVUZGWlN4UlFVRmtMRWxCUVRCQ2JrUXNVMEZCVTI5RUxGRkJRVlFzUTBGQmEwSm9RaXhEUVVGc1FpeERRVUV6UWl4SlFVRnZSR1lzU1VGQk0wUTdRVUZEUVR0QlFVTkJhVU1zZFVKQlFWY3NTMEZCUzNwRExFbEJRVXdzUTBGQlZYZERMRTlCUVZZc1EwRkJhMEpvUXl4SlFVRnNRaXhEUVVGWU8wRkJRMEVzWjBKQlFVbHBReXhoUVVGaExFTkJRVU1zUTBGQmJFSXNSVUZCYjBJN1FVRkRhRUk3UVVGRFFTeHhRa0ZCUzNwRExFbEJRVXdzUTBGQlZUQkRMRWRCUVZZc1EwRkJZMnhETEVsQlFXUTdRVUZEU0R0QlFVTkVMRzFDUVVGUGFVTXNVVUZCVUR0QlFVTklPenM3T3p0QlFVVkVPenM3T3p0cFEwRkxWVVVzVFN4RlFVRlJPMEZCUVVFN08wRkJRMlE3UVVGRFFTeHBRa0ZCUzJwRUxFVkJRVXdzUjBGQlZXbEVMRTlCUVU5cVJDeEZRVUZxUWp0QlFVTkJMR2xDUVVGTFF5eEZRVUZNTEVkQlFWVm5SQ3hQUVVGUGFFUXNSVUZCYWtJN1FVRkRRU3hwUWtGQlMwd3NUMEZCVEN4SFFVRmxjVVFzVDBGQlQzSkVMRTlCUVhSQ096dEJRVVZCTEdsQ1FVRkxVU3hMUVVGTUxFZEJRV0VzU1VGQlNXWXNTVUZCU2l4RFFVRlRMRXRCUVV0UExFOUJRVXdzUTBGQllVY3NTVUZCZEVJc1EwRkJZanRCUVVOQkxHbENRVUZMYlVRc1UwRkJUQ3hIUVVGcFFpeEpRVUZKTlVRc1VVRkJTaXhEUVVGaExFdEJRVXRqTEV0QlFXeENMRVZCUVhsQ0xFdEJRVXRTTEU5QlFVd3NRMEZCWVVVc1VVRkJkRU1zUTBGQmFrSTdPMEZCUlVFN1FVRkRRU3huUWtGQlRYRkVMR0ZCUVdFc1UwRkJZa0VzVlVGQllTeERRVUZEUXl4WFFVRkVMRVZCUVdORExGZEJRV1FzUlVGQk9FSTdRVUZETjBNc2IwSkJRVTFETEZOQlFWTXNTVUZCU1RsRUxFMUJRVW9zUTBGQlZ6UkVMRmxCUVZsVUxFTkJRVm9zUTBGQlkxZ3NRMEZCZWtJc1JVRkRWMjlDTEZsQlFWbFVMRU5CUVZvc1EwRkJZMWtzUTBGRWVrSXNSVUZGVjBnc1dVRkJXVlFzUTBGQldpeERRVUZqWVN4RFFVWjZRaXhEUVVGbU8wRkJSMEZJTERSQ1FVRlpTU3hKUVVGYUxFTkJRV2xDU0N4TlFVRnFRaXhGUVVvMlF5eERRVWx1UWp0QlFVTXhRaXh2UWtGQlNVWXNXVUZCV1d4RExFTkJRVm9zUzBGQmEwSXNTVUZCZEVJc1JVRkJORUk3UVVGRGVFSXNNRUpCUVV0YUxFbEJRVXdzUTBGQlZVTXNSMEZCVml4RFFVRmpMRWxCUVVsa0xGRkJRVW9zUTBGQllUUkVMRmxCUVZsTExFdEJRVm9zUlVGQllpeEZRVUZyUTA0c1dVRkJXV3hETEVOQlFUbERMRU5CUVdRN1FVRkRTRHRCUVVORUxIRkNRVUZMTEVsQlFVbFhMRWxCUVVrc1EwRkJZaXhGUVVGblFrRXNTVUZCU1hWQ0xGbEJRVmxTTEZGQlFWb3NRMEZCY1VKbExFMUJRWHBETEVWQlFXbEVMRVZCUVVVNVFpeERRVUZ1UkN4RlFVRnpSRHRCUVVOc1JITkNMQ3RDUVVGWFF5eFpRVUZaVWl4UlFVRmFMRU5CUVhGQ1ppeERRVUZ5UWl4RFFVRllMRVZCUVc5RGQwSXNWMEZCY0VNN1FVRkRTRHRCUVVORVFTdzBRa0ZCV1U4c1IwRkJXaXhIUVZnMlF5eERRVmN4UWp0QlFVTjBRaXhoUVZwRU8wRkJZVUVzYVVKQlFVc3NTVUZCU1M5Q0xFbEJRVWtzUTBGQllpeEZRVUZuUWtFc1NVRkJTVzlDTEU5QlFVOHpReXhKUVVGUUxFTkJRVmx6UXl4UlFVRmFMRU5CUVhGQ1pTeE5RVUY2UXl4RlFVRnBSQ3hGUVVGRk9VSXNRMEZCYmtRc1JVRkJjVVE3UVVGRGFrUnpRaXd5UWtGQlYwWXNUMEZCVHpORExFbEJRVkFzUTBGQldYTkRMRkZCUVZvc1EwRkJjVUptTEVOQlFYSkNMRU5CUVZnc1JVRkJiME1zUlVGQmNFTTdRVUZEU0R0QlFVTkVMRzFDUVVGUExFbEJRVkE3UVVGRFNEczdPelJDUVhCTVlUdEJRVU5XTEdkQ1FVRkpWeXhUUVVGVExFdEJRVXRzUXl4SlFVRk1MRU5CUVZWMVJDeFZRVUZXTEVkQlFYVkNMRU5CUVhCRExFTkJSRlVzUTBGRE5rSTdRVUZEZGtOeVFpeHhRa0ZCVlN4TFFVRkxiRU1zU1VGQlRDeERRVUZWZDBRc1YwRkJWaXhKUVVGNVFuUkNMRk5CUVZNc1EwRkJia01zU1VGQmVVTkJMRTFCUVd4RU8wRkJRMEVzYlVKQlFVOUJMRTFCUVZBN1FVRkRTRHM3T3pzN08wRkJhMHhLT3p0QlFVVkVkVUlzVDBGQlQwTXNUMEZCVUN4SFFVRnBRblJGTEZGQlFXcENJaXdpWm1sc1pTSTZJbXh6WlhGMGNtVmxMbXB6SWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaUozVnpaU0J6ZEhKcFkzUW5PMXh1WEc1amIyNXpkQ0J0WlhKblpTQTlJSEpsY1hWcGNtVW9KMnh2WkdGemFDNXRaWEpuWlNjcE8xeHVZMjl1YzNRZ1FtRnpaU0E5SUhKbGNYVnBjbVVvSnk0dlltRnpaUzVxY3ljcE8xeHVZMjl1YzNRZ1UzUnlZWFJsWjNrZ1BTQnlaWEYxYVhKbEtDY3VMM04wY21GMFpXZDVMbXB6SnlrN1hHNWpiMjV6ZENCSlpHVnVkR2xtYVdWeUlEMGdjbVZ4ZFdseVpTZ25MaTlwWkdWdWRHbG1hV1Z5TG1wekp5azdYRzVqYjI1emRDQlVjbWx3YkdVZ1BTQnlaWEYxYVhKbEtDY3VMM1J5YVhCc1pTNXFjeWNwTzF4dVkyOXVjM1FnVEZObGNVNXZaR1VnUFNCeVpYRjFhWEpsS0NjdUwyeHpaWEZ1YjJSbExtcHpKeWs3WEc1Y2JseHVMeW9xWEc0Z0tpQkVhWE4wY21saWRYUmxaQ0JoY25KaGVTQjFjMmx1WnlCTVUyVnhJR0ZzYkc5allYUnBiMjRnYzNSeVlYUmxaM2tnZDJsMGFDQmhiaUIxYm1SbGNteDVhVzVuWEc0Z0tpQmxlSEJ2Ym1WdWRHbGhiQ0IwY21WbExseHVJQ292WEc1amJHRnpjeUJNVTJWeFZISmxaU0I3WEc1Y2JpQWdJQ0F2S2lwY2JpQWdJQ0FnS2lCQWNHRnlZVzBnZTA5aWFtVmpkSDBnYzI5MWNtTmxJRlJvWlNCbmJHOWlZV3hzZVNCMWJtbHhkV1VnYzJsMFpTQnBaR1Z1ZEdsbWFXVnlMbHh1SUNBZ0lDQXFJRUJ3WVhKaGJTQjdUMkpxWldOMGZTQmJiM0IwYVc5dWMxMGdWR2hsSUc5d2RHbHZibk1nYjJZZ2RHaGxJRXhUWlhGVWNtVmxMbHh1SUNBZ0lDQXFJRUJ3WVhKaGJTQjdUblZ0WW1WeWZTQmJiM0IwYVc5dWN5NWliM1Z1WkdGeWVTQTlJREV3WFNCVWFHVWdiV0Y0YVcxaGJDQnBiblJsY25aaGJDQmlaWFIzWldWdUlIUjNiMXh1SUNBZ0lDQXFJR2RsYm1WeVlYUmxaQ0J1YjJSbGN5NWNiaUFnSUNBZ0tpQkFjR0Z5WVcwZ2UwNTFiV0psY24wZ1cyOXdkR2x2Ym5NdVltRnpaU0E5SURFMVhTQlVhR1VnWW1GelpTd2dhUzVsTGl3Z2RHaGxJRzFoZUdsdFlXd2dZWEpwZEhrZ2IyWmNiaUFnSUNBZ0tpQjBhR1VnY205dmRDQnViMlJsTGlCRVpXWmhkV3gwSUdseklESXFLakUxTGx4dUlDQWdJQ0FxTDF4dUlDQWdJR052Ym5OMGNuVmpkRzl5SUNoemFYUmxMQ0J2Y0hScGIyNXpJRDBnZTMwcElIdGNiaUFnSUNBZ0lDQWdiR1YwSUd4cGMzUlVjbWx3YkdVN1hHNGdJQ0FnSUNBZ0lDOHZJQ013SUhCeWIyTmxjM01nYjNCMGFXOXVjMXh1SUNBZ0lDQWdJQ0IwYUdsekxtOXdkR2x2Ym5NZ1BTQnRaWEpuWlNoN0lHSnZkVzVrWVhKNU9pQXhNQ3dnWW1GelpUb2dNVFVnZlN3Z2IzQjBhVzl1Y3lrN1hHNWNiaUFnSUNBZ0lDQWdMeThnSXpFZ2FXNXBkR2xoYkdsNlpTQnpiM1Z5WTJVc0lHTnZkVzUwWlhJc0lHRnVaQ0J6ZEhKaGRHVm5lU0JqYUc5cFkyVmNiaUFnSUNBZ0lDQWdkR2hwY3k1ZmN5QTlJSE5wZEdVN1hHNGdJQ0FnSUNBZ0lIUm9hWE11WDJNZ1BTQXdPMXh1SUNBZ0lDQWdJQ0IwYUdsekxsOW9ZWE5vSUQwZ0tHUmxjSFJvS1NBOVBpQmtaWEIwYUNVeU8xeHVYRzRnSUNBZ0lDQWdJSFJvYVhNdVgySmhjMlVnUFNCdVpYY2dRbUZ6WlNoMGFHbHpMbTl3ZEdsdmJuTXVZbUZ6WlNrN1hHNGdJQ0FnSUNBZ0lIUm9hWE11WDNOMGNtRjBaV2Q1SUQwZ2JtVjNJRk4wY21GMFpXZDVLSFJvYVhNdVgySmhjMlVzSUhSb2FYTXViM0IwYVc5dWN5NWliM1Z1WkdGeWVTazdYRzVjYmlBZ0lDQWdJQ0FnTHk4Z0l6SWdhVzVwZEdsaGJHbDZaU0IwY21WbElITjBjblZqZEhWeVpTQjNhWFJvSUcxaGVHbHRZV3dnWW05MWJtUnpYRzRnSUNBZ0lDQWdJSFJvYVhNdWNtOXZkQ0E5SUc1bGR5Qk1VMlZ4VG05a1pTZ3BPMXh1SUNBZ0lDQWdJQ0F2THlBalFTQnRhVzVwYldGc0lHSnZkVzVrWEc0Z0lDQWdJQ0FnSUhSb2FYTXVjbTl2ZEM1aFpHUW9ibVYzSUV4VFpYRk9iMlJsS0Z0dVpYY2dWSEpwY0d4bEtEQXNNQ3d3S1Ywc0lDY25LU2s3WEc0Z0lDQWdJQ0FnSUM4dklDTkNJRzFoZUdsdFlXd2dZbTkxYm1SY2JpQWdJQ0FnSUNBZ2RHaHBjeTV5YjI5MExtRmtaQ2hjYmlBZ0lDQWdJQ0FnSUNBZ0lHNWxkeUJNVTJWeFRtOWtaU2hiYm1WM0lGUnlhWEJzWlNoTllYUm9MbkJ2ZHlneUxDQjBhR2x6TGw5aVlYTmxMbWRsZEVKcGRFSmhjMlVvTUNrcElDMGdNU3hjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCT2RXMWlaWEl1VFVGWVgxWkJURlZGTEZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lFNTFiV0psY2k1TlFWaGZWa0ZNVlVVcFhTd2dKeWNwS1R0Y2JpQWdJQ0I5TzF4dVhHNGdJQ0FnWEc0Z0lDQWdaMlYwSUd4bGJtZDBhQ0FvS1NCN1hHNGdJQ0FnSUNBZ0lHeGxkQ0J5WlhOMWJIUWdQU0IwYUdsekxuSnZiM1F1YzNWaVEyOTFiblJsY2lBdElESTdJQzh2SUMweUlEb2dkR2hsSUdKdmRXNWtZWEpwWlhOY2JpQWdJQ0FnSUNBZ2NtVnpkV3gwSUQwZ0tIUm9hWE11Y205dmRDNWZhR0Z6Uld4bGJXVnVkQ0FtSmlCeVpYTjFiSFFnS3lBeEtTQjhmQ0J5WlhOMWJIUTdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQnlaWE4xYkhRN1hHNGdJQ0FnZlR0Y2JpQWdJQ0JjYmlBZ0lDQXZLaXBjYmlBZ0lDQWdLaUJIWlhRZ2RHaGxJR1ZzWlcxbGJuUWdZWFFnZEdGeVoyVjBaV1FnYVc1a1pYZ2dhVzRnZEdobElHeHBibVZoY21sNlpXUWdjMlZ4ZFdWdVkyVXVJRWwwSUdSdlpYTWdibTkwWEc0Z0lDQWdJQ29nZEdGclpTQnBiblJ2SUdGalkyOTFiblFnZEdobElHaHBaR1JsYmlCaWIzVnVaR0Z5YVdWeklHOW1JSFJvWlNCelpYRjFaVzVqWlNCYlRVbE9MQ0JsWHpFc0lHVmZNaXhjYmlBZ0lDQWdLaUF1TGk0Z1pWOXNaVzVuZEdnc0lFMUJXRjBzSUdobGJtTmxJR2x1WkdWNElHOW1JR1ZmTVNCcGN5QXdMbHh1SUNBZ0lDQXFJRUJ3WVhKaGJTQjdUblZ0WW1WeWZTQnBibVJsZUNCVWFHVWdhVzVrWlhnZ2IyWWdkR2hsSUdWc1pXMWxiblFnYVc0Z2RHaGxJR1pzWVhSMFpXNWxaQ0JoY25KaGVTNWNiaUFnSUNBZ0tpQkFjbVYwZFhKdUlIdFBZbXBsWTNSOUlGUm9aU0JsYkdWdFpXNTBJR3h2WTJGMFpXUWdZWFFnZEdobElHbHVaR1Y0SUdsdUlHRnlaM1Z0Wlc1MExseHVJQ0FnSUNBcUwxeHVJQ0FnSUdkbGRDQW9hVzVrWlhncElIdGNiaUFnSUNBZ0lDQWdiR1YwSUc1dlpHVWdQU0IwYUdsekxuSnZiM1F1WjJWMEtHbHVaR1Y0SUNzZ01TazdYRzRnSUNBZ0lDQWdJSGRvYVd4bElDZ2hibTlrWlM1cGMweGxZV1lwZTF4dUlDQWdJQ0FnSUNBZ0lDQWdibTlrWlNBOUlHNXZaR1V1WTJocGJHUTdYRzRnSUNBZ0lDQWdJSDA3WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUJ1YjJSbExtVTdYRzRnSUNBZ2ZUdGNiaUFnSUNCY2JpQWdJQ0F2S2lwY2JpQWdJQ0FnS2lCQWNISnBkbUYwWlNCSFpYUWdkR2hsSUV4VFpYRk9iMlJsSUdGMElIUmhjbWRsZEdWa0lHbHVaR1Y0SUdsdUlIUm9aU0JzYVc1bFlYSnBlbVZrWEc0Z0lDQWdJQ29nYzJWeGRXVnVZMlV1SUZSb1pTQnpaWEYxWlc1alpTQnBibU5zZFdSbGN5QjBhR1VnYUdsa1pHVnVJR0p2ZFc1a1lYSnBaWE1nVzAxSlRpd2daVjh4TENCbFh6SXNYRzRnSUNBZ0lDb2dMaTR1SUdWZmJHVnVaM1JvTENCTlFWaGRMQ0JvWlc1alpTQmxYekVuY3lCcGJtUmxlQ0JwY3lBeExseHVJQ0FnSUNBcUlFQndZWEpoYlNCN1RuVnRZbVZ5ZlNCcGJtUmxlQ0JVYUdVZ2FXNWtaWGdnYjJZZ2RHaGxJR1ZzWlcxbGJuUWdhVzRnZEdobElHWnNZWFIwWlc1bFpDQmhjbkpoZVM1Y2JpQWdJQ0FnS2lCQWNtVjBkWEp1SUh0TVUyVnhUbTlrWlgwZ1ZHaGxJRXhUWlhGT2IyUmxJSFJoY21kbGRHbHVaeUIwYUdVZ1pXeGxiV1Z1ZENCaGRDQnBibVJsZUM1Y2JpQWdJQ0FnS2k5Y2JpQWdJQ0JmWjJWMElDaHBibVJsZUNrZ2UxeHVJQ0FnSUNBZ0lDQnlaWFIxY200Z2RHaHBjeTV5YjI5MExtZGxkQ2hwYm1SbGVDazdYRzRnSUNBZ2ZUdGNibHh1SUNBZ0lDOHFLbHh1SUNBZ0lDQXFJRWx1YzJWeWRDQmhJSFpoYkhWbElHRjBJSFJvWlNCMFlYSm5aWFJsWkNCcGJtUmxlQzVjYmlBZ0lDQWdLaUJBY0dGeVlXMGdlMDlpYW1WamRIMGdaV3hsYldWdWRDQlVhR1VnWld4bGJXVnVkQ0IwYnlCcGJuTmxjblFzSUdVdVp5NGdZU0JqYUdGeVlXTjBaWElnYVdZZ2RHaGxYRzRnSUNBZ0lDb2djMlZ4ZFdWdVkyVWdhWE1nWVNCemRISnBibWN1WEc0Z0lDQWdJQ29nUUhCaGNtRnRJSHRPZFcxaVpYSjlJR2x1WkdWNElGUm9aU0J3YjNOcGRHbHZiaUJwYmlCMGFHVWdZWEp5WVhrdVhHNGdJQ0FnSUNvZ1FISmxkSFZ5YmlCN1QySnFaV04wZlNCN1gyVTZJR1ZzWlcxbGJuUWdiMllnVDJKcVpXTjBJSFI1Y0dVc0lGOXBPaUJKWkdWdWRHbG1hV1Z5ZlZ4dUlDQWdJQ0FxTDF4dUlDQWdJR2x1YzJWeWRDQW9aV3hsYldWdWRDd2dhVzVrWlhncElIdGNiaUFnSUNBZ0lDQWdZMjl1YzNRZ2NHVnBJRDBnZEdocGN5NWZaMlYwS0dsdVpHVjRLU3dnTHk4Z0l6RmhJSEJ5WlhacGIzVnpJR0p2ZFc1a1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUhGbGFTQTlJSFJvYVhNdVgyZGxkQ2hwYm1SbGVDc3hLVHNnTHk4Z0l6RmlJRzVsZUhRZ1ltOTFibVJjYmx4dUlDQWdJQ0FnSUNBZ0x5OGdJekpoSUdsdVkzSmxiV1Z1ZEdsdVp5QjBhR1VnYkc5allXd2dZMjkxYm5SbGNseHVJQ0FnSUNBZ0lDQjBhR2x6TGw5aklDczlJREU3WEc0Z0lDQWdJQ0FnSUM4dklDTXlZaUJuWlc1bGNtRjBhVzVuSUhSb1pTQnBaQ0JwYm1KbGRIZGxaVzRnZEdobElHSnZkVzVrYzF4dUlDQWdJQ0FnSUNCamIyNXpkQ0JwWkNBOUlIUm9hWE11WVd4c2IyTW9jR1ZwTENCeFpXa3BPMXh1WEc0Z0lDQWdJQ0FnSUM4dklDTXpJR0ZrWkNCcGRDQjBieUIwYUdVZ2MzUnlkV04wZFhKbElHRnVaQ0J5WlhSMWNtNGdkbUZzZFdWY2JpQWdJQ0FnSUNBZ1kyOXVjM1FnY0dGcGNpQTlJSHRsYkdWdE9pQmxiR1Z0Wlc1MExDQnBaRG9nYVdSOU8xeHVJQ0FnSUNBZ0lDQjBhR2x6TG1Gd2NHeDVTVzV6WlhKMEtIQmhhWElwTzF4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnY0dGcGNqdGNiaUFnSUNCOU8xeHVYRzRnSUNBZ0x5b3FYRzRnSUNBZ0lDb2dSR1ZzWlhSbElIUm9aU0JsYkdWdFpXNTBJR0YwSUhSb1pTQnBibVJsZUM1Y2JpQWdJQ0FnS2lCQWNHRnlZVzBnZTA1MWJXSmxjbjBnYVc1a1pYZ2dWR2hsSUdsdVpHVjRJRzltSUhSb1pTQmxiR1Z0Wlc1MElIUnZJR1JsYkdWMFpTQnBiaUIwYUdVZ1lYSnlZWGt1WEc0Z0lDQWdJQ29nUUhKbGRIVnliaUI3U1dSbGJuUnBabWxsY24wZ1ZHaGxJR2xrWlc1MGFXWnBaWElnYjJZZ2RHaGxJR1ZzWlcxbGJuUWdZWFFnZEdobElHbHVaR1Y0TGx4dUlDQWdJQ0FxTDF4dUlDQWdJSEpsYlc5MlpTQW9hVzVrWlhncElIdGNiaUFnSUNBZ0lDQWdZMjl1YzNRZ1pXa2dQU0IwYUdsekxsOW5aWFFvYVc1a1pYZ2dLeUF4S1R0Y2JpQWdJQ0FnSUNBZ1kyOXVjM1FnYVNBOUlHNWxkeUJKWkdWdWRHbG1hV1Z5S0hSb2FYTXVYMkpoYzJVcExtWnliMjFPYjJSbEtHVnBLVHRjYmlBZ0lDQWdJQ0FnZEdocGN5NWhjSEJzZVZKbGJXOTJaU2hsYVNrN1hHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCcE8xeHVJQ0FnSUgwN1hHNWNibHh1SUNBZ0lDOHFLbHh1SUNBZ0lDQXFJRWRsYm1WeVlYUmxJSFJvWlNCa2FXZHBkQ0J3WVhKMElHOW1JSFJvWlNCcFpHVnVkR2xtYVdWeWN5QWdZbVYwZDJWbGJpQndJR0Z1WkNCeExseHVJQ0FnSUNBcUlFQndZWEpoYlNCN1RGTmxjVTV2WkdWOUlIQWdWR2hsSUdScFoybDBJSEJoY25RZ2IyWWdkR2hsSUhCeVpYWnBiM1Z6SUdsa1pXNTBhV1pwWlhJdVhHNGdJQ0FnSUNvZ1FIQmhjbUZ0SUh0TVUyVnhUbTlrWlgwZ2NTQlVhR1VnWkdsbmFYUWdjR0Z5ZENCdlppQjBhR1VnYm1WNGRDQnBaR1Z1ZEdsbWFXVnlMbHh1SUNBZ0lDQXFJRUJ5WlhSMWNtNGdlMGxrWlc1MGFXWnBaWEo5SUZSb1pTQnVaWGNnYVdSbGJuUnBabWxsY2lCc2IyTmhkR1ZrSUdKbGRIZGxaVzRnY0NCaGJtUWdjUzVjYmlBZ0lDQWdLaTljYmlBZ0lDQmhiR3h2WXlBb2NDd2djU2tnZTF4dUlDQWdJQ0FnSUNCc1pYUWdhVzUwWlhKMllXd2dQU0F3TENCc1pYWmxiQ0E5SURBN1hHNGdJQ0FnSUNBZ0lDOHZJQ014SUhCeWIyTmxjM01nZEdobElHeGxkbVZzSUc5bUlIUm9aU0J1WlhjZ2FXUmxiblJwWm1sbGNseHVJQ0FnSUNBZ0lDQjNhR2xzWlNBb2FXNTBaWEoyWVd3Z1BEMGdNQ2tnZXlBdkx5QnVieUJ5YjI5dElHWnZjaUJwYm5ObGNuUnBiMjVjYmlBZ0lDQWdJQ0FnSUNBZ0lHbHVkR1Z5ZG1Gc0lEMGdkR2hwY3k1ZlltRnpaUzVuWlhSSmJuUmxjblpoYkNoc1pYWmxiQ3dnY0N3Z2NTazdYRzRnSUNBZ0lDQWdJQ0FnSUNBcksyeGxkbVZzTzF4dUlDQWdJQ0FnSUNCOU8xeHVJQ0FnSUNBZ0lDQnNaWFpsYkNBdFBTQXhPMXh1SUNBZ0lDQWdJQ0JwWmlBb2RHaHBjeTVmYUdGemFDaHNaWFpsYkNrZ1BUMDlJREFwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQjBhR2x6TGw5emRISmhkR1ZuZVM1aVVHeDFjeWh3TENCeExGeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUd4bGRtVnNMQ0JwYm5SbGNuWmhiQ3hjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjBhR2x6TGw5ekxDQjBhR2x6TGw5aktUdGNiaUFnSUNBZ0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUIwYUdsekxsOXpkSEpoZEdWbmVTNWlUV2x1ZFhNb2NDd2djU3hjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdiR1YyWld3c0lHbHVkR1Z5ZG1Gc0xGeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCMGFHbHpMbDl6TENCMGFHbHpMbDlqS1R0Y2JpQWdJQ0FnSUNBZ2ZUdGNiaUFnSUNCOU8xeHVJQ0FnSUZ4dUlDQWdJRnh1SUNBZ0lDOHFLbHh1SUNBZ0lDQXFJRWx1YzJWeWRDQmhiaUJsYkdWdFpXNTBJR055WldGMFpXUWdabkp2YlNCaElISmxiVzkwWlNCemFYUmxJR2x1ZEc4Z2RHaGxJR0Z5Y21GNUxseHVJQ0FnSUNBcUlFQndZWEpoYlNCN1QySnFaV04wZlNCd1lXbHlJRkJoYVhJZ1kyOXVkR0ZwYm1sdVp5QjBhR1VnYVdSbGJuUnBabWxsY2lCaGJtUWdkR2hsSUdWc1pXMWxiblFnZEc5Y2JpQWdJQ0FnS2lCcGJuTmxjblFnYVc0Z2RHaGxJR1JoZEdFZ2MzUnlkV04wZFhKbExseHVJQ0FnSUNBcUlFQndZWEpoYlNCN1NXUmxiblJwWm1sbGNueE1VMlZ4VG05a1pYMGdjR0ZwY2k1cFpDQlVhR1VnYVdSbGJuUnBabWxsY2lCdlppQjBhR1VnWld4bGJXVnVkQzVjYmlBZ0lDQWdLaUJBY0dGeVlXMGdlMDlpYW1WamRIMGdjR0ZwY2k1bGJHVnRJRlJvWlNCbGJHVnRaVzUwSUhSdklHbHVjMlZ5ZEM1Y2JpQWdJQ0FnS2lCQWNHRnlZVzBnZTJKdmIyeGxZVzU5SUZ0dWIwbHVaR1Y0SUQwZ2RISjFaVjBnVjJobGRHaGxjaUJ2Y2lCdWIzUWdhWFFnYzJodmRXeGtJSEpsZEhWeWJpQjBhR1ZjYmlBZ0lDQWdLaUJwYm1SbGVDQnZaaUIwYUdVZ2FXNXpaWEowTGx4dUlDQWdJQ0FxSUVCeVpYUjFjbTRnZTA1MWJXSmxjbnhDYjI5c1pXRnVmU0JVYUdVZ2FXNWtaWGdnYjJZZ2RHaGxJRzVsZDJ4NUlHbHVjMlZ5ZEdWa0lHVnNaVzFsYm5RZ2FXNGdkR2hsWEc0Z0lDQWdJQ29nWVhKeVlYa3NJR2xtSUdGemEyVmtMaUF0TVNCcFppQjBhR1VnWld4bGJXVnVkQ0JoYkhKbFlXUjVJR1Y0YVhOMGN5QmhibVFnYUdGeklHNXZkQ0JpWldWdUlHRmtaR1ZrTGx4dUlDQWdJQ0FxSUVsbUlHNXZTVzVrWlhnc0lISmxkSFZ5Ym5NZ2RISjFaU0JwWmlCMGFHVWdaV3hsYldWdWRDQm9ZWE1nWW1WbGJpQmhaR1JsWkN3Z1ptRnNjMlVnYjNSb1pYSjNhWE5sTGx4dUlDQWdJQ0FxTDF4dUlDQWdJR0Z3Y0d4NVNXNXpaWEowSUNod1lXbHlMQ0J1YjBsdVpHVjRJRDBnZEhKMVpTa2dlMXh1SUNBZ0lDQWdJQ0JzWlhRZ2JtOWtaU3dnY21WemRXeDBMQ0JwTzF4dUlDQWdJQ0FnSUNBdkx5QWpNQ0JqWVhOMElHWnliMjBnZEdobElIQnliM0JsY2lCMGVYQmxYRzRnSUNBZ0lDQWdJQzh2SUNNd1FTQjBhR1VnYVdSbGJuUnBabWxsY2lCcGN5QmhiaUJKWkdWdWRHbG1hV1Z5WEc0Z0lDQWdJQ0FnSUdrZ1BTQndZV2x5TG1sa08xeHVJQ0FnSUNBZ0lDQnViMlJsSUQwZ0lHa2dKaVlnYVM1ZlpDQW1KaUJwTGw5eklDWW1JR2t1WDJNZ0ppWmNiaUFnSUNBZ0lDQWdJQ0FnSUNodVpYY2dTV1JsYm5ScFptbGxjaWgwYUdsekxsOWlZWE5sTENCcExsOWtMQ0JwTGw5ekxDQnBMbDlqS1M1MGIwNXZaR1VvY0dGcGNpNWxiR1Z0S1NrN1hHNGdJQ0FnSUNBZ0lDOHZJQ013UWlCMGFHVWdhV1JsYm5ScFptbGxjaUJwY3lCaElFeFRaWEZPYjJSbFhHNGdJQ0FnSUNBZ0lHNXZaR1VnUFNBb2FTQW1KaUJwTG5RZ0ppWWdhUzVqYUdsc1pISmxiaUFtSmlCTVUyVnhUbTlrWlM1bWNtOXRTbE5QVGlocEtTa2dmSHdnYm05a1pUdGNiaUFnSUNBZ0lDQWdMeThnSXpFZ2FXNTBaV2R5WVhSbGN5QjBhR1VnYm1WM0lHVnNaVzFsYm5RZ2RHOGdkR2hsSUdSaGRHRWdjM1J5ZFdOMGRYSmxYRzRnSUNBZ0lDQWdJSEpsYzNWc2RDQTlJSFJvYVhNdWNtOXZkQzVoWkdRb2JtOWtaU2s3WEc0Z0lDQWdJQ0FnSUM4dklDTXlJR2xtSUhSb1pTQmxiR1Z0Wlc1MElHRnpJR0psWlc0Z1lXUmtaV1JjYmlBZ0lDQWdJQ0FnYVdZZ0tHNXZTVzVrWlhncElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJ5WlhOMWJIUTdYRzRnSUNBZ0lDQWdJSDBnWld4elpTQnBaaUFvY21WemRXeDBLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z2RHaHBjeTV5YjI5MExtbHVaR1Y0VDJZb2JtOWtaU2s3WEc0Z0lDQWdJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z0xURTdYRzRnSUNBZ0lDQWdJSDA3SUNBZ0lDQWdJQ0JjYmlBZ0lDQjlPMXh1WEc0Z0lDQWdMeW9xWEc0Z0lDQWdJQ29nUkdWc1pYUmxJSFJvWlNCbGJHVnRaVzUwSUhkcGRHZ2dkR2hsSUhSaGNtZGxkR1ZrSUdsa1pXNTBhV1pwWlhJdVhHNGdJQ0FnSUNvZ1FIQmhjbUZ0SUh0SlpHVnVkR2xtYVdWeWZFeFRaWEZPYjJSbGZTQnBJRlJvWlNCcFpHVnVkR2xtYVdWeUlHOW1JSFJvWlNCbGJHVnRaVzUwTGx4dUlDQWdJQ0FxSUVCeVpYUjFjbTRnZTA1MWJXSmxjbjBnVkdobElHbHVaR1Y0SUc5bUlIUm9aU0JsYkdWdFpXNTBJR1p5WlhOb2JIa2daR1ZzWlhSbFpDd2dMVEVnYVdZZ2JtOWNiaUFnSUNBZ0tpQnlaVzF2ZG1Gc0xseHVJQ0FnSUNBcUwxeHVJQ0FnSUdGd2NHeDVVbVZ0YjNabElDaHBLU0I3WEc0Z0lDQWdJQ0FnSUd4bGRDQnViMlJsTENCd2IzTnBkR2x2Ymp0Y2JpQWdJQ0FnSUNBZ0x5OGdJekFnWTJGemRDQm1jbTl0SUhSb1pTQndjbTl3WlhJZ2RIbHdaVnh1SUNBZ0lDQWdJQ0J1YjJSbElEMGdhU0FtSmlCcExsOWtJQ1ltSUdrdVgzTWdKaVlnYVM1Zll5QW1KbHh1SUNBZ0lDQWdJQ0FnSUNBZ0tHNWxkeUJKWkdWdWRHbG1hV1Z5S0hSb2FYTXVYMkpoYzJVc0lHa3VYMlFzSUdrdVgzTXNJR2t1WDJNcEtTNTBiMDV2WkdVb2JuVnNiQ2s3WEc0Z0lDQWdJQ0FnSUM4dklDTXdRaUIwYUdVZ2FXUmxiblJwWm1sbGNpQnBjeUJoSUV4VFJWRk9iMlJsWEc0Z0lDQWdJQ0FnSUc1dlpHVWdQU0FvYVNBbUppQnBMblFnSmlZZ2FTNWphR2xzWkhKbGJpQW1KaUJNVTJWeFRtOWtaUzVtY205dFNsTlBUaWhwS1NrZ2ZId2dibTlrWlR0Y2JpQWdJQ0FnSUNBZ0x5OGdJekVnWjJWMElIUm9aU0JwYm1SbGVDQnZaaUIwYUdVZ1pXeGxiV1Z1ZENCMGJ5QnlaVzF2ZG1WY2JpQWdJQ0FnSUNBZ2NHOXphWFJwYjI0Z1BTQjBhR2x6TG5KdmIzUXVhVzVrWlhoUFppaHViMlJsS1R0Y2JpQWdJQ0FnSUNBZ2FXWWdLSEJ2YzJsMGFXOXVJQ0U5UFNBdE1TbDdYRzRnSUNBZ0lDQWdJQ0FnSUNBdkx5QWpNaUJwWmlCcGRDQmxlR2x6ZEhNZ2NtVnRiM1psSUdsMFhHNGdJQ0FnSUNBZ0lDQWdJQ0IwYUdsekxuSnZiM1F1WkdWc0tHNXZaR1VwTzF4dUlDQWdJQ0FnSUNCOU8xeHVJQ0FnSUNBZ0lDQnlaWFIxY200Z2NHOXphWFJwYjI0N1hHNGdJQ0FnZlR0Y2JseHVJQ0FnSUM4cUtseHVJQ0FnSUNBcUlFTmhjM1FnZEdobElFcFRUMDRnYjJKcVpXTjBJR2x1ZEc4Z1lTQndjbTl3WlhJZ1RGTmxjVlJ5WldVdVhHNGdJQ0FnSUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I5SUc5aWFtVmpkQ0IwYUdVZ1NsTlBUaUJ2WW1wbFkzUWdkRzhnWTJGemRDNWNiaUFnSUNBZ0tpQkFjbVYwZFhKdUlIdE1VMlZ4VkhKbFpYMGdRU0J6Wld4bUlISmxabVZ5Wlc1alpTNWNiaUFnSUNBZ0tpOWNiaUFnSUNCbWNtOXRTbE5QVGlBb2IySnFaV04wS1NCN1hHNGdJQ0FnSUNBZ0lDOHZJQ014SUdOdmNIa2dkR2hsSUhOdmRYSmpaU3dnWTI5MWJuUmxjaXdnWVc1a0lHeGxibWQwYUNCdlppQjBhR1VnYjJKcVpXTjBYRzRnSUNBZ0lDQWdJSFJvYVhNdVgzTWdQU0J2WW1wbFkzUXVYM003WEc0Z0lDQWdJQ0FnSUhSb2FYTXVYMk1nUFNCdlltcGxZM1F1WDJNN1hHNGdJQ0FnSUNBZ0lIUm9hWE11YjNCMGFXOXVjeUE5SUc5aWFtVmpkQzV2Y0hScGIyNXpPMXh1WEc0Z0lDQWdJQ0FnSUhSb2FYTXVYMkpoYzJVZ1BTQnVaWGNnUW1GelpTaDBhR2x6TG05d2RHbHZibk11WW1GelpTazdYRzRnSUNBZ0lDQWdJSFJvYVhNdVgySnZkVzVrWVhKNUlEMGdibVYzSUZOMGNtRjBaV2Q1S0hSb2FYTXVYMkpoYzJVc0lIUm9hWE11YjNCMGFXOXVjeTVpYjNWdVpHRnllU2s3WEc0Z0lDQWdJQ0FnSUZ4dUlDQWdJQ0FnSUNBdkx5QWpNaUJrWlhCMGFDQm1hWEp6ZENCaFpHUnBibWRjYmlBZ0lDQWdJQ0FnWTI5dWMzUWdaR1Z3ZEdoR2FYSnpkQ0E5SUNoamRYSnlaVzUwVG05a1pTd2dZM1Z5Y21WdWRGQmhkR2dwSUQwK0lIdGNiaUFnSUNBZ0lDQWdJQ0FnSUdOdmJuTjBJSFJ5YVhCc1pTQTlJRzVsZHlCVWNtbHdiR1VvWTNWeWNtVnVkRTV2WkdVdWRDNXdMRnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCamRYSnlaVzUwVG05a1pTNTBMbk1zWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHTjFjbkpsYm5ST2IyUmxMblF1WXlrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JqZFhKeVpXNTBVR0YwYUM1d2RYTm9LSFJ5YVhCc1pTazdJQzh2SUhOMFlXTnJYRzRnSUNBZ0lDQWdJQ0FnSUNCcFppQW9ZM1Z5Y21WdWRFNXZaR1V1WlNBaFBUMGdiblZzYkNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIUm9hWE11Y205dmRDNWhaR1FvYm1WM0lFeFRaWEZPYjJSbEtHTjFjbkpsYm5SUVlYUm9Mbk5zYVdObEtDa3NJR04xY25KbGJuUk9iMlJsTG1VcEtUdGNiaUFnSUNBZ0lDQWdJQ0FnSUgwN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JtYjNJZ0tHeGxkQ0JwSUQwZ01Ec2dhU0E4SUdOMWNuSmxiblJPYjJSbExtTm9hV3hrY21WdUxteGxibWQwYURzZ0t5dHBLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnWkdWd2RHaEdhWEp6ZENoamRYSnlaVzUwVG05a1pTNWphR2xzWkhKbGJsdHBYU3dnWTNWeWNtVnVkRkJoZEdncE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnZlR0Y2JpQWdJQ0FnSUNBZ0lDQWdJR04xY25KbGJuUlFZWFJvTG5CdmNDZ3BPeUF2THlCMWJuTjBZV05yWEc0Z0lDQWdJQ0FnSUgwN1hHNGdJQ0FnSUNBZ0lHWnZjaUFvYkdWMElHa2dQU0F3T3lCcElEd2diMkpxWldOMExuSnZiM1F1WTJocGJHUnlaVzR1YkdWdVozUm9PeUFySzJrcGUxeHVJQ0FnSUNBZ0lDQWdJQ0FnWkdWd2RHaEdhWEp6ZENodlltcGxZM1F1Y205dmRDNWphR2xzWkhKbGJsdHBYU3dnVzEwcE8xeHVJQ0FnSUNBZ0lDQjlPMXh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdkR2hwY3p0Y2JpQWdJQ0I5T3lBZ0lDQmNiaUFnSUNCY2JuMDdYRzVjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnVEZObGNWUnlaV1U3WEc0aVhYMD0iXX0=
