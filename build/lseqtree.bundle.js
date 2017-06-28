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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aWZpZXIuanMiXSwibmFtZXMiOlsiQkkiLCJyZXF1aXJlIiwiVHJpcGxlIiwiTFNlcU5vZGUiLCJJZGVudGlmaWVyIiwiYmFzZSIsImRpZ2l0cyIsInNpdGVzIiwiY291bnRlcnMiLCJfZCIsIl9zIiwiX2MiLCJfYmFzZSIsIm5vZGUiLCJsZW5ndGgiLCJ0ZW1wTm9kZSIsImlzTGVhZiIsImNoaWxkIiwiaW50MmJpZ0ludCIsImdldFN1bUJpdCIsImkiLCJwdXNoIiwidCIsInMiLCJjIiwiYWRkSW50XyIsInAiLCJsZWZ0U2hpZnRfIiwiZ2V0Qml0QmFzZSIsImUiLCJkQml0TGVuZ3RoIiwicmVzdWx0UGF0aCIsIm1pbmUiLCJkdXAiLCJyaWdodFNoaWZ0XyIsIm1vZEludCIsIk1hdGgiLCJwb3ciLCJvIiwib2RCaXRMZW5ndGgiLCJjb21wYXJpbmciLCJyZXN1bHQiLCJzdW0iLCJvdGhlciIsIm1pbiIsImVxdWFscyIsImdyZWF0ZXIiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FBRUEsSUFBTUEsS0FBS0MsUUFBUSxRQUFSLENBQVg7QUFDQSxJQUFNQyxTQUFTRCxRQUFRLGFBQVIsQ0FBZjtBQUNBLElBQU1FLFdBQVdGLFFBQVEsZUFBUixDQUFqQjs7QUFFQTs7OztJQUdNRyxVOztBQUVGOzs7Ozs7QUFNQSx3QkFBYUMsSUFBYixFQUFtQkMsTUFBbkIsRUFBc0Q7QUFBQSxZQUEzQkMsS0FBMkIsdUVBQW5CLEVBQW1CO0FBQUEsWUFBZkMsUUFBZSx1RUFBSixFQUFJOztBQUFBOztBQUNsRCxhQUFLQyxFQUFMLEdBQVVILE1BQVY7QUFDQSxhQUFLSSxFQUFMLEdBQVVILEtBQVY7QUFDQSxhQUFLSSxFQUFMLEdBQVVILFFBQVY7O0FBRUEsYUFBS0ksS0FBTCxHQUFhUCxJQUFiO0FBQ0g7Ozs7OztBQUdEOzs7Ozs7aUNBTVVRLEksRUFBTTtBQUNaO0FBQ0EsZ0JBQUlDLFNBQVMsQ0FBYjtBQUFBLGdCQUFnQkMsV0FB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QUNKOztBQUdETSxPQUFPQyxPQUFQLEdBQWlCNUMsVUFBakIiLCJmaWxlIjoiaWRlbnRpZmllci5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgQkkgPSByZXF1aXJlKCdCaWdJbnQnKTtcbmNvbnN0IFRyaXBsZSA9IHJlcXVpcmUoJy4vdHJpcGxlLmpzJyk7XG5jb25zdCBMU2VxTm9kZSA9IHJlcXVpcmUoJy4vbHNlcW5vZGUuanMnKTtcblxuLyoqXG4gKiBVbmlxdWUgYW5kIGltbXV0YWJsZSBpZGVudGlmaWVyIGNvbXBvc2VkIG9mIGRpZ2l0LCBzb3VyY2VzLCBjb3VudGVycy5cbiAqL1xuY2xhc3MgSWRlbnRpZmllciB7XG4gICAgXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtCYXNlfSBiYXNlIFRoZSBiYXNlIG9mIGlkZW50aWZpZXJzLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyW119IGRpZ2l0cyBUaGUgZGlnaXQgKHBvc2l0aW9uIGluIGRlbnNlIHNwYWNlKS5cbiAgICAgKiBAcGFyYW0ge09iamVjdFtdfSBzaXRlcyBUaGUgbGlzdCBvZiBzb3VyY2VzLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyW119IGNvdW50ZXJzIFRoZSBsaXN0IG9mIGNvdW50ZXJzLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yIChiYXNlLCBkaWdpdHMsIHNpdGVzID0gW10sIGNvdW50ZXJzID0gW10pIHtcbiAgICAgICAgdGhpcy5fZCA9IGRpZ2l0cztcbiAgICAgICAgdGhpcy5fcyA9IHNpdGVzO1xuICAgICAgICB0aGlzLl9jID0gY291bnRlcnM7XG4gICAgICAgIFxuICAgICAgICB0aGlzLl9iYXNlID0gYmFzZTtcbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIGQscyxjIHZhbHVlcyBhY2NvcmRpbmcgdG8gdGhlIG5vZGUgaW4gYXJndW1lbnRcbiAgICAgKiBAcGFyYW0ge0xTZXFOb2RlfSBub2RlIFRoZSBsc2Vxbm9kZSBjb250YWluaW5nIHRoZSBwYXRoIGluIHRoZSB0cmVlXG4gICAgICogc3RydWN0dXJlLlxuICAgICAqIEByZXR1cm4ge0lkZW50aWZpZXJ9IFRoaXMgaWRlbnRpZmllciBtb2RpZmllZC5cbiAgICAgKi9cbiAgICBmcm9tTm9kZSAobm9kZSkge1xuICAgICAgICAvLyAjMSBwcm9jZXNzIHRoZSBsZW5ndGggb2YgdGhlIHBhdGhcbiAgICAgICAgbGV0IGxlbmd0aCA9IDEsIHRlbXBOb2RlID0gbm9kZTtcbiAgICAgICAgXG4gICAgICAgIHdoaWxlICghdGVtcE5vZGUuaXNMZWFmKSB7XG5cdCAgICArK2xlbmd0aDtcbiAgICAgICAgICAgIHRlbXBOb2RlID0gdGVtcE5vZGUuY2hpbGQ7XG4gICAgICAgIH07XG4gICAgICAgIC8vICMyIGNvcHkgdGhlIHZhbHVlcyBjb250YWluZWQgaW4gdGhlIHBhdGhcbiAgICAgICAgdGhpcy5fZCA9IEJJLmludDJiaWdJbnQoMCwgdGhpcy5fYmFzZS5nZXRTdW1CaXQobGVuZ3RoIC0gMSkpO1xuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGggOyArK2kpIHtcbiAgICAgICAgICAgIC8vICMxYSBjb3B5IHRoZSBzaXRlIGlkXG4gICAgICAgICAgICB0aGlzLl9zLnB1c2gobm9kZS50LnMpO1xuICAgICAgICAgICAgLy8gIzFiIGNvcHkgdGhlIGNvdW50ZXJcbiAgICAgICAgICAgIHRoaXMuX2MucHVzaChub2RlLnQuYyk7XG4gICAgICAgICAgICAvLyAjMWMgY29weSB0aGUgZGlnaXRcbiAgICAgICAgICAgIEJJLmFkZEludF8odGhpcy5fZCwgbm9kZS50LnApO1xuICAgICAgICAgICAgaWYgKGkgIT09IGxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICBCSS5sZWZ0U2hpZnRfKHRoaXMuX2QsIHRoaXMuX2Jhc2UuZ2V0Qml0QmFzZShpKzEpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBub2RlID0gbm9kZS5jaGlsZDtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgXG4gICAgLyoqXG4gICAgICogQ29udmVydCB0aGUgaWRlbnRpZmllciBpbnRvIGEgbm9kZSB3aXRob3V0IGVsZW1lbnQuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGUgVGhlIGVsZW1lbnQgYXNzb2NpYXRlZCB3aXRoIHRoZSBub2RlLlxuICAgICAqIEByZXR1cm4ge0xTZXFOb2RlfSBBbiBMU2VxTm9kZSBjb250YWluaW5nIHRoZSBlbGVtZW50IGFuZCB0aGUgcGF0aFxuICAgICAqIGV4dHJhY3RlZCBmcm9tIHRoaXMgaWRlbnRpZmllci5cbiAgICAgKi9cbiAgICB0b05vZGUgKGUpIHtcbiAgICAgICAgY29uc3QgZEJpdExlbmd0aCA9IHRoaXMuX2Jhc2UuZ2V0U3VtQml0KHRoaXMuX2MubGVuZ3RoIC0gMSk7XG4gICAgICAgIGxldCByZXN1bHRQYXRoID0gW10sIG1pbmU7XG4gICAgICAgIFxuICAgICAgICAvLyAjMSBkZWNvbnN0cnVjdCB0aGUgZGlnaXQgXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fYy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgLy8gIzEgdHJ1bmNhdGUgbWluZVxuICAgICAgICAgICAgbWluZSA9IEJJLmR1cCh0aGlzLl9kKTtcbiAgICAgICAgICAgIC8vICMxYSBzaGlmdCByaWdodCB0byBlcmFzZSB0aGUgdGFpbCBvZiB0aGUgcGF0aFxuICAgICAgICAgICAgQkkucmlnaHRTaGlmdF8obWluZSwgZEJpdExlbmd0aCAtIHRoaXMuX2Jhc2UuZ2V0U3VtQml0KGkpKTtcbiAgICAgICAgICAgIC8vICMxYiBjb3B5IHZhbHVlIGluIHRoZSByZXN1bHRcbiAgICAgICAgICAgIHJlc3VsdFBhdGgucHVzaChcbiAgICAgICAgICAgICAgICBuZXcgVHJpcGxlKEJJLm1vZEludChtaW5lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucG93KDIsIHRoaXMuX2Jhc2UuZ2V0Qml0QmFzZShpKSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc1tpXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NbaV0pKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5ldyBMU2VxTm9kZShyZXN1bHRQYXRoLCBlKTtcbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBDb21wYXJlIHR3byBpZGVudGlmaWVycy5cbiAgICAgKiBAcGFyYW0ge0lkZW50aWZpZXJ9IG8gVGhlIG90aGVyIGlkZW50aWZpZXIuXG4gICAgICogQHJldHVybiB7SW50ZWdlcn0gLTEgaWYgdGhpcyBpcyBsb3dlciwgMCBpZiB0aGV5IGFyZSBlcXVhbCwgMSBpZiB0aGlzIGlzXG4gICAgICogZ3JlYXRlci5cbiAgICAgKi9cbiAgICBjb21wYXJlVG8gKG8pIHtcbiAgICAgICAgbGV0IGRCaXRMZW5ndGggPSB0aGlzLl9iYXNlLmdldFN1bUJpdCh0aGlzLl9jLmxlbmd0aCAtIDEpLFxuICAgICAgICAgICAgb2RCaXRMZW5ndGggPSB0aGlzLl9iYXNlLmdldFN1bUJpdChvLl9jLmxlbmd0aCAtIDEpLFxuICAgICAgICAgICAgY29tcGFyaW5nID0gdHJ1ZSxcbiAgICAgICAgICAgIHJlc3VsdCA9IDAsIGkgPSAwLFxuICAgICAgICAgICAgc3VtLCBtaW5lLCBvdGhlcjtcbiAgICAgICAgXG4gICAgICAgIC8vICMxIENvbXBhcmUgdGhlIGxpc3Qgb2YgPGQscyxjPlxuICAgICAgICB3aGlsZSAoY29tcGFyaW5nICYmIGkgPCBNYXRoLm1pbih0aGlzLl9jLmxlbmd0aCwgby5fYy5sZW5ndGgpICkge1xuICAgICAgICAgICAgLy8gY2FuIHN0b3AgYmVmb3JlIHRoZSBlbmQgb2YgZm9yIGxvb3Agd2l6IHJldHVyblxuICAgICAgICAgICAgc3VtID0gdGhpcy5fYmFzZS5nZXRTdW1CaXQoaSk7XG4gICAgICAgICAgICAvLyAjMWEgdHJ1bmNhdGUgbWluZVxuICAgICAgICAgICAgbWluZSA9IEJJLmR1cCh0aGlzLl9kKTtcbiAgICAgICAgICAgIEJJLnJpZ2h0U2hpZnRfKG1pbmUsIGRCaXRMZW5ndGggLSBzdW0pO1xuICAgICAgICAgICAgLy8gIzFiIHRydW5jYXRlIG90aGVyXG4gICAgICAgICAgICBvdGhlciA9IEJJLmR1cChvLl9kKTtcbiAgICAgICAgICAgIEJJLnJpZ2h0U2hpZnRfKG90aGVyLCBvZEJpdExlbmd0aCAtIHN1bSk7XG4gICAgICAgICAgICAvLyAjMiBDb21wYXJlIHRyaXBsZXNcbiAgICAgICAgICAgIC8vICNBIGRpZ2l0XG4gICAgICAgICAgICBpZiAoIUJJLmVxdWFscyhtaW5lLCBvdGhlcikpIHtcbiAgICAgICAgICAgICAgICBpZiAoQkkuZ3JlYXRlcihtaW5lLCBvdGhlcikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSAtMTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGNvbXBhcmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyAjQiBzb3VyY2VcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLl9zW2ldIC0gby5fc1tpXTsgXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBjb21wYXJpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyAjQyBjb3VudGVyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuX2NbaV0gLSBvLl9jW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wYXJpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICsraTtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIC8vICMzIGNvbXBhcmUgbGlzdCBzaXplXG4gICAgICAgIGlmIChyZXN1bHQgPT09IDApe1xuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5fYy5sZW5ndGggLSBvLl9jLmxlbmd0aDtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTsgICAgXG59O1xuXG5cbm1vZHVsZS5leHBvcnRzID0gSWRlbnRpZmllcjtcbiJdfQ==
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxzZXFub2RlLmpzIl0sIm5hbWVzIjpbIlRyaXBsZSIsInJlcXVpcmUiLCJMU2VxTm9kZSIsInRyaXBsZXMiLCJlbGVtZW50IiwidCIsInNoaWZ0IiwiZSIsImxlbmd0aCIsInN1YkNvdW50ZXIiLCJjaGlsZHJlbiIsInB1c2giLCJvIiwiY29tcGFyZVRvIiwibm9kZSIsImluZGV4IiwiX2JpbmFyeUluZGV4T2YiLCJfY29udGFpbnMiLCJzcGxpY2UiLCJhZGQiLCJjaGlsZCIsImluZGV4ZXMiLCJfZ2V0SW5kZXhlcyIsImN1cnJlbnRUcmVlIiwiaSIsImlzU3BsaXR0ZWQiLCJpc0xhc3QiLCJfaGFzRWxlbWVudCIsInN1bSIsImoiLCJfZ2V0IiwibGVmdFN1bSIsImJ1aWxkaW5nTm9kZSIsInF1ZXVlIiwiY3VycmVudE5vZGUiLCJzdGFydEJlZ2lubmluZyIsInVzZUZ1bmN0aW9uIiwicCIsInRlbXAiLCJhIiwiYiIsIl9fZ2V0SW5kZXhlcyIsInNlYXJjaEVsZW1lbnQiLCJtaW5JbmRleCIsIm1heEluZGV4IiwiY3VycmVudEluZGV4IiwiY3VycmVudEVsZW1lbnQiLCJNYXRoIiwiZmxvb3IiLCJiZWluZ0J1aWx0IiwicyIsImMiLCJmcm9tSlNPTiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFFQSxJQUFNQSxTQUFTQyxRQUFRLGFBQVIsQ0FBZjs7QUFFQTs7OztJQUdNQyxRO0FBQ0Y7Ozs7OztBQU1BLHdCQUEyQztBQUFBLFlBQTlCQyxPQUE4Qix1RUFBcEIsRUFBb0I7QUFBQSxZQUFoQkMsT0FBZ0IsdUVBQU4sSUFBTTs7QUFBQTs7QUFDdkMsYUFBS0MsQ0FBTCxHQUFTRixRQUFRRyxLQUFSLEVBQVQ7QUFDQSxhQUFLQyxDQUFMLEdBQVMsSUFBVDtBQUNBLFlBQUlKLFFBQVFLLE1BQVIsS0FBbUIsQ0FBdkIsRUFBMEI7QUFBRSxpQkFBS0QsQ0FBTCxHQUFTSCxPQUFUO0FBQW1CO0FBQy9DLGFBQUtLLFVBQUwsR0FB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S2lCSSxDLEVBQUc7QUFDaEIsZ0JBQUlxQyxtQkFBSjs7QUFFQTtBQUNBLGdCQUFJckMsRUFBRUYsUUFBRixDQUFXRixNQUFYLEtBQXNCLENBQTFCLEVBQTRCO0FBQ3hCeUMsNkJBQWEsSUFBSS9DLFFBQUosQ0FBYSxDQUFDLElBQUlGLE1BQUosQ0FBV1ksRUFBRVAsQ0FBRixDQUFJZ0MsQ0FBZixFQUFrQnpCLEVBQUVQLENBQUYsQ0FBSTZDLENBQXRCLEVBQXlCdEMsRUFBRVAsQ0FBRixDQUFJOEMsQ0FBN0IsQ0FBRCxDQUFiLEVBQWdEdkMsRUFBRUwsQ0FBbEQsQ0FBYjtBQUNILGFBRkQsTUFFTztBQUNIO0FBQ0EwQyw2QkFBYSxJQUFJL0MsUUFBSixDQUFhLENBQUMsSUFBSUYsTUFBSixDQUFXWSxFQUFFUCxDQUFGLENBQUlnQyxDQUFmLEVBQWtCekIsRUFBRVAsQ0FBRixDQUFJNkMsQ0FBdEIsRUFBeUJ0QyxFQUFFUCxDQUFGLENBQUk4QyxDQUE3QixDQUFELENBQWIsQ0FBYjtBQUNBRiwyQkFBV3ZDLFFBQVgsQ0FBb0JDLElBQXBCLENBQXlCVCxTQUFTa0QsUUFBVCxDQUFrQnhDLEVBQUVGLFFBQUYsQ0FBVyxDQUFYLENBQWxCLENBQXpCO0FBQ0g7O0FBRUQsbUJBQU91QyxVQUFQO0FBQ0g7Ozs7OztBQXlGSjs7QUFFREksT0FBT0MsT0FBUCxHQUFpQnBELFFBQWpCIiwiZmlsZSI6ImxzZXFub2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBUcmlwbGUgPSByZXF1aXJlKCcuL3RyaXBsZS5qcycpO1xuXG4vKipcbiAqIEEgbm9kZSBvZiB0aGUgTFNlcSB0cmVlLlxuICovXG5jbGFzcyBMU2VxTm9kZSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtUcmlwbGVbXX0gdHJpcGxlcyBUaGUgbGlzdCBvZiB0cmlwbGVzIGNvbXBvc2luZyB0aGUgcGF0aCB0byB0aGVcbiAgICAgKiBlbGVtZW50LlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtZW50IFRoZSBlbGVtZW50IHRvIGluc2VydCBpbiB0aGUgc3RydWN0dXJlLCBlLmcuLCBhXG4gICAgICogY2hhcmFjdGVyIGluIGEgdGV4dCBkb2N1bWVudC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvciAodHJpcGxlcyA9IFtdLCBlbGVtZW50ID0gbnVsbCkge1xuICAgICAgICB0aGlzLnQgPSB0cmlwbGVzLnNoaWZ0KCk7XG4gICAgICAgIHRoaXMuZSA9IG51bGw7XG4gICAgICAgIGlmICh0cmlwbGVzLmxlbmd0aCA9PT0gMCkgeyB0aGlzLmUgPSBlbGVtZW50OyB9O1xuICAgICAgICB0aGlzLnN1YkNvdW50ZXIgPSAodHJpcGxlcy5sZW5ndGggPiAwICYmIDEpIHx8IDA7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4gPSBbXTtcbiAgICAgICAgdHJpcGxlcy5sZW5ndGggPiAwICYmXG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLnB1c2gobmV3IExTZXFOb2RlKHRyaXBsZXMsIGVsZW1lbnQpKTtcbiAgICB9O1xuICAgIFxuICAgIC8qKlxuICAgICAqIEdldHRlciB0byB0aGUgZmlyc3QgY2hpbGQuXG4gICAgICogQHJldHVybnMge0xTZXFOb2RlfSBUaGUgZmlyc3QgY2hpbGQgb2YgdGhpcyBub2RlLiBOdWxsIGlmIGl0IGRvZXMgbm90XG4gICAgICogZXhpc3RzLlxuICAgICAqL1xuICAgIGdldCBjaGlsZCAoKSB7XG4gICAgICAgIHJldHVybiAoKHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMCkgJiYgdGhpcy5jaGlsZHJlblswXSkgfHwgbnVsbDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ29tcGFyYXRvciBiZXR3ZWVuIHRvIExTZXFOb2Rlcy5cbiAgICAgKiBAcGFyYW0ge0xTZXFOb2RlfSBvIFRoZSBvdGhlciBMU2VxTm9kZSB0byBjb21wYXJlIHRvLlxuICAgICAqL1xuICAgIGNvbXBhcmVUbyAobykge1xuICAgICAgICByZXR1cm4gdGhpcy50LmNvbXBhcmVUbyhvLnQpO1xuICAgIH07XG4gICAgXG4gICAgLyoqXG4gICAgICogQWRkIGEgbm9kZSB0byB0aGUgY3VycmVudCBub2RlLlxuICAgICAqIEBwYXJhbSB7TFNlcU5vZGV9IG5vZGUgVGhlIG5vZGUgdG8gYWRkIGFzIGEgY2hpbGRyZW4gb2YgdGhpcyBub2RlLlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IEZhbHNlIGlmIHRoZSBlbGVtZW50IGFscmVhZHkgZXhpc3RzLCBUcnVlIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBhZGQgKG5vZGUpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9iaW5hcnlJbmRleE9mKG5vZGUpO1xuICAgICAgICBcbiAgICAgICAgLy8gIzEgaWYgdGhlIHBhdGggZG8gbm8gZXhpc3QsIGNyZWF0ZSBpdFxuICAgICAgICBpZiAoIXRoaXMuX2NvbnRhaW5zKG5vZGUpKSB7XG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLnNwbGljZSgtaW5kZXgsIDAsIG5vZGUpO1xuICAgICAgICAgICAgdGhpcy5zdWJDb3VudGVyICs9IDE7XG4gICAgICAgICAgICAvLyAjMiBvdGhlcndpc2UsIGNvbnRpbnVlIHRvIGV4cGxvcmUgdGhlIHN1YnRyZWVzXG4gICAgICAgIH0gZWxzZSBpZiAobm9kZS5jaGlsZHJlbi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIC8vICMyYSBjaGVjayBpZiB0aGUgZWxlbWVudCBhbHJlYWR5IGV4aXN0c1xuICAgICAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW5baW5kZXhdLmUgIT09IG51bGwpe1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGlsZHJlbltpbmRleF0uZSA9IG5vZGUuZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN1YkNvdW50ZXIgKz0gMTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAvLyAjMyBpZiBkaWRub3QgZXhpc3QsIGluY3JlbWVudCB0aGUgY291bnRlclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY2hpbGRyZW5baW5kZXhdLmFkZChub2RlLmNoaWxkKSkge1xuICAgICAgICAgICAgdGhpcy5zdWJDb3VudGVyICs9IDE7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSB0aGUgbm9kZSBvZiB0aGUgdHJlZSBhbmQgYWxsIG5vZGUgd2l0aGluIHBhdGggYmVpbmcgdXNlbGVzcy5cbiAgICAgKiBAcGFyYW0ge0xTZXFOb2RlfSBub2RlIHRoZSBub2RlIGNvbnRhaW5pbmcgdGhlIHBhdGggdG8gcmVtb3ZlXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgbm9kZSBoYXMgYmVlbiByZW1vdmVkLCBGYWxzZSBpZiBpdCBkb2VzIG5vdFxuICAgICAqIGV4aXN0LlxuICAgICAqL1xuICAgIGRlbCAobm9kZSkge1xuICAgICAgICBjb25zdCBpbmRleGVzID0gdGhpcy5fZ2V0SW5kZXhlcyhub2RlKTtcbiAgICAgICAgbGV0IGN1cnJlbnRUcmVlID0gdGhpcywgaSA9IDAsIGlzU3BsaXR0ZWQgPSBmYWxzZTtcblxuICAgICAgICAvLyAjMSBUaGUgZWxlbWVudCBkb2VzIG5vdCBleGlzdHMsIHN0b3BcbiAgICAgICAgaWYgKGluZGV4ZXMubGVuZ3RoID09PSAwKSB7IHJldHVybiBmYWxzZTsgfTtcblxuICAgICAgICAvLyAjMiBDcmF3bCB0aGUgcGF0aCBhbmQgcmVtb3ZlIHRoZSBlbGVtZW50XG4gICAgICAgIGN1cnJlbnRUcmVlLnN1YkNvdW50ZXIgLT0gMTtcbiAgICAgICAgd2hpbGUgKGkgPCBpbmRleGVzLmxlbmd0aCAmJiAhKGlzU3BsaXR0ZWQpKSB7XG4gICAgICAgICAgICBsZXQgaXNMYXN0ID0gY3VycmVudFRyZWUuY2hpbGRyZW5baW5kZXhlc1tpXV0uX2hhc0VsZW1lbnQgJiZcbiAgICAgICAgICAgICAgICBpID09PSBpbmRleGVzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICBpZiAoIWlzTGFzdCkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRUcmVlLmNoaWxkcmVuW2luZGV4ZXNbaV1dLnN1YkNvdW50ZXIgLT0gMTsgICAgIFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmIChjdXJyZW50VHJlZS5jaGlsZHJlbltpbmRleGVzW2ldXS5zdWJDb3VudGVyIDw9IDAgJiZcbiAgICAgICAgICAgICAgICAoIWN1cnJlbnRUcmVlLmNoaWxkcmVuW2luZGV4ZXNbaV1dLl9oYXNFbGVtZW50IHx8IGlzTGFzdCkpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50VHJlZS5jaGlsZHJlbi5zcGxpY2UoaW5kZXhlc1tpXSwgMSk7XG4gICAgICAgICAgICAgICAgaXNTcGxpdHRlZCA9IHRydWU7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY3VycmVudFRyZWUgPSBjdXJyZW50VHJlZS5jaGlsZHJlbltpbmRleGVzW2ldXTtcbiAgICAgICAgICAgICsraTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKCFpc1NwbGl0dGVkKXsgY3VycmVudFRyZWUuZSA9IG51bGw7fTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBUaGUgb3JkZXJlZCB0cmVlIGNhbiBiZSBsaW5lYXJpemVkIGludG8gYSBzZXF1ZW5jZS4gVGhpcyBmdW5jdGlvbiBnZXQgdGhlXG4gICAgICogaW5kZXggb2YgdGhlIHBhdGggcmVwcmVzZW50ZWQgYnkgdGhlIGxpc3Qgb2YgdHJpcGxlcy5cbiAgICAgKiBAcGFyYW0ge0xTZXFOb2RlfSBub2RlIFRoZSBub2RlIGNvbnRhaW5pbmcgLS0gYXQgbGVhc3QgLS0gdGhlIHBhdGggdG8gdGhlXG4gICAgICogZWxlbWVudC5cbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSBpbmRleCBvZiB0aGUgbm9kZSBpbiB0aGUgbGluZWFyaXplZCBzZXF1ZW5jZTsgLTEgaWZcbiAgICAgKiB0aGUgZWxlbWVudCBkb2VzIG5vdCBleGlzdC5cbiAgICAgKi9cbiAgICBpbmRleE9mIChub2RlKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ZXMgPSB0aGlzLl9nZXRJbmRleGVzKG5vZGUpO1xuICAgICAgICBsZXQgc3VtID0gMCwgY3VycmVudFRyZWUgPSB0aGlzLCBqO1xuICAgICAgICBcbiAgICAgICAgLy8gIzEgSWYgdGhlIG5vZGUgZG9lcyBub3QgZXhpc3QsIHN0b3BcbiAgICAgICAgaWYgKGluZGV4ZXMubGVuZ3RoID09PSAwKSB7IHJldHVybiAtMTsgfTtcblxuICAgICAgICAvLyAjMiBPdGhlcndpc2UsIHN0YXJ0IGNvdW50aW5nXG4gICAgICAgIGlmIChjdXJyZW50VHJlZS5faGFzRWxlbWVudCkgeyBzdW0gKz0gMTsgfTtcbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5kZXhlcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgaWYgKGluZGV4ZXNbaV0gPCBjdXJyZW50VHJlZS5jaGlsZHJlbi5sZW5ndGgvMikge1xuICAgICAgICAgICAgICAgIC8vICNBIHN0YXJ0IGZyb20gdGhlIGJlZ2lubmluZyBbLS0tLT58ICAgICBdXG4gICAgICAgICAgICAgICAgaiA9IDA7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGogPCBpbmRleGVzW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VHJlZS5jaGlsZHJlbltqXS5faGFzRWxlbWVudCkgeyBzdW0gKz0gMTsgfTtcbiAgICAgICAgICAgICAgICAgICAgc3VtICs9IGN1cnJlbnRUcmVlLmNoaWxkcmVuW2pdLnN1YkNvdW50ZXI7XG4gICAgICAgICAgICAgICAgICAgICsrajtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyAjQiBzdGFydCBmcm9tIHRoZSBlbmQgWyAgICAgfDwtLS0tXVxuICAgICAgICAgICAgICAgIHN1bSArPSBjdXJyZW50VHJlZS5zdWJDb3VudGVyO1xuICAgICAgICAgICAgICAgIGogPSBjdXJyZW50VHJlZS5jaGlsZHJlbi5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICAgIHdoaWxlIChqID49IGluZGV4ZXNbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRUcmVlLmNoaWxkcmVuW2pdLl9oYXNFbGVtZW50KXsgc3VtIC09IDE7IH07XG4gICAgICAgICAgICAgICAgICAgIHN1bSAtPSBjdXJyZW50VHJlZS5jaGlsZHJlbltqXS5zdWJDb3VudGVyO1xuICAgICAgICAgICAgICAgICAgICAtLWo7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBqICs9IDE7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRUcmVlLmNoaWxkcmVuW2pdLl9oYXNFbGVtZW50KSB7IHN1bSArPSAxOyB9O1xuICAgICAgICAgICAgY3VycmVudFRyZWUgPSBjdXJyZW50VHJlZS5jaGlsZHJlbltqXTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHN1bSAtIDE7IC8vIC0xIGJlY2F1c2UgYWxnb3JpdGhtIGNvdW50ZWQgdGhlIGVsZW1lbnQgaXRzZWxmXG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICogVGhlIG9yZGVyZWQgdHJlZSBjYW4gYmUgbGluZWFyaXplZC4gVGhpcyBmdW5jdGlvbiBnZXRzIHRoZSBub2RlIGF0IHRoZVxuICAgICAqIGluZGV4IGluIHRoZSBwcm9qZWN0ZWQgc2VxdWVuY2UuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4IFRoZSBpbmRleCBpbiB0aGUgc2VxdWVuY2UuXG4gICAgICogQHJldHVybiB7TFNlcU5vZGV9IFRoZSBub2RlIGF0IHRoZSBpbmRleC5cbiAgICAgKi9cbiAgICBnZXQgKGluZGV4KSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBsZWZ0U3VtIFRoZSBzdW0gb2YgYWxsIGVsZW1lbnQgYXQgdGhlIGxlZnQgb2YgdGhlXG4gICAgICAgICAqIGN1cnJlbnQgaW5zcGVjdGVkIG5vZGUuXG4gICAgICAgICAqIEBwYXJhbSB7TFNlcU5vZGV9IGJ1aWxkaW5nTm9kZSBUaGUgaGVhZCBwYXJ0IG9mIHRoZSBub2RlIGJlaW5nIGJ1aWx0XG4gICAgICAgICAqIGFzIHdlIGNyYXdsLlxuICAgICAgICAgKiBAcGFyYW0ge0xTZXFOb2RlfSBxdWV1ZSBUaGUgcXVldWUgcGFydCBvZiB0aGUgbm9kZSBiZWluZyBidWlsdC5cbiAgICAgICAgICogQHBhcmFtIHtMU2VxTm9kZX0gY3VycmVudE5vZGUgVGhlIHN1YnRyZWUgYmVpbmcgY3Jhd2xlZC5cbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0IF9nZXQgPSAobGVmdFN1bSwgYnVpbGRpbmdOb2RlLCBxdWV1ZSwgY3VycmVudE5vZGUpID0+IHtcbiAgICAgICAgICAgIGxldCBzdGFydEJlZ2lubmluZyA9IHRydWUsIHVzZUZ1bmN0aW9uLCBpID0gMCwgcCwgdGVtcDtcbiAgICAgICAgICAgIC8vICMwIFRoZSBub2RlIGlzIGZvdW5kLCByZXR1cm4gdGhlIGluY3JlbWVudGFsbHkgYnVpbHQgbm9kZSBhbmRcbiAgICAgICAgICAgIC8vIHByYWlzZSB0aGUgc3VuICFcbiAgICAgICAgICAgIGlmIChsZWZ0U3VtID09PSBpbmRleCAmJiBjdXJyZW50Tm9kZS5faGFzRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIC8vIDFhIGNvcHkgdGhlIHZhbHVlIG9mIHRoZSBlbGVtZW50IGluIHRoZSBwYXRoXG4gICAgICAgICAgICAgICAgcXVldWUuZSA9IGN1cnJlbnROb2RlLmU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJ1aWxkaW5nTm9kZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoY3VycmVudE5vZGUuX2hhc0VsZW1lbnQpeyBsZWZ0U3VtICs9IDE7IH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vICMxIHNlYXJjaDogZG8gSSBzdGFydCBmcm9tIHRoZSBiZWdpbm5pbmcgb3IgdGhlIGVuZFxuICAgICAgICAgICAgc3RhcnRCZWdpbm5pbmcgPSBpbmRleC1sZWZ0U3VtIDwgY3VycmVudE5vZGUuc3ViQ291bnRlci8yO1xuICAgICAgICAgICAgaWYgKHN0YXJ0QmVnaW5uaW5nKSB7XG4gICAgICAgICAgICAgICAgdXNlRnVuY3Rpb24gPSAoYSwgYikgPT4gYSArIGI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxlZnRTdW0gKz0gY3VycmVudE5vZGUuc3ViQ291bnRlcjtcbiAgICAgICAgICAgICAgICB1c2VGdW5jdGlvbiA9IChhLCBiKSA9PiBhIC0gYjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gIzJhIGNvdW50aW5nIHRoZSBlbGVtZW50IGZyb20gbGVmdCB0byByaWdodFxuICAgICAgICAgICAgaWYgKCFzdGFydEJlZ2lubmluZykgeyBpID0gY3VycmVudE5vZGUuY2hpbGRyZW4ubGVuZ3RoIC0gMTsgfTtcbiAgICAgICAgICAgIHdoaWxlICgoc3RhcnRCZWdpbm5pbmcgJiYgbGVmdFN1bSA8PSBpbmRleCkgfHxcbiAgICAgICAgICAgICAgICAgICAoIXN0YXJ0QmVnaW5uaW5nICYmIGxlZnRTdW0gPiBpbmRleCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudE5vZGUuY2hpbGRyZW5baV0uX2hhc0VsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGVmdFN1bSA9IHVzZUZ1bmN0aW9uKGxlZnRTdW0sIDEpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgbGVmdFN1bSA9IHVzZUZ1bmN0aW9uKGxlZnRTdW0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlLmNoaWxkcmVuW2ldLnN1YkNvdW50ZXIpO1xuICAgICAgICAgICAgICAgIGkgPSB1c2VGdW5jdGlvbihpLCAxKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vICMyYiBkZWNyZWFzaW5nIHRoZSBpbmNyZW1lbnRhdGlvblxuICAgICAgICAgICAgaSA9IHVzZUZ1bmN0aW9uKGksIC0xKTtcbiAgICAgICAgICAgIGlmIChzdGFydEJlZ2lubmluZykge1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50Tm9kZS5jaGlsZHJlbltpXS5faGFzRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICBsZWZ0U3VtID0gdXNlRnVuY3Rpb24obGVmdFN1bSwgLTEpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgbGVmdFN1bSA9IHVzZUZ1bmN0aW9uKGxlZnRTdW0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC1jdXJyZW50Tm9kZS5jaGlsZHJlbltpXS5zdWJDb3VudGVyKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vICMzIGJ1aWxkIHBhdGhcbiAgICAgICAgICAgIHAgPSBbXTsgcC5wdXNoKGN1cnJlbnROb2RlLmNoaWxkcmVuW2ldLnQpO1xuICAgICAgICAgICAgaWYgKGJ1aWxkaW5nTm9kZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGJ1aWxkaW5nTm9kZSA9IG5ldyBMU2VxTm9kZShwLCBudWxsKTtcbiAgICAgICAgICAgICAgICBxdWV1ZSA9IGJ1aWxkaW5nTm9kZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGVtcCA9IG5ldyBMU2VxTm9kZShwLCBudWxsKTtcbiAgICAgICAgICAgICAgICBxdWV1ZS5hZGQodGVtcCk7XG4gICAgICAgICAgICAgICAgcXVldWUgPSB0ZW1wO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBfZ2V0KGxlZnRTdW0sIGJ1aWxkaW5nTm9kZSwgcXVldWUsIGN1cnJlbnROb2RlLmNoaWxkcmVuW2ldKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF9nZXQoMCwgbnVsbCwgbnVsbCwgdGhpcyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENhc3QgYSBKU09OIG9iamVjdCB0byBhbiBMU2VxTm9kZS4gXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG8gVGhlIEpTT04gb2JqZWN0LlxuICAgICAqIEByZXR1cm4ge0xTZXFOb2RlfSBBbiBMU2VxTm9kZS5cbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbUpTT04gKG8pIHtcbiAgICAgICAgbGV0IGJlaW5nQnVpbHQ7XG5cbiAgICAgICAgLy8gIzEgbGVhZlxuICAgICAgICBpZiAoby5jaGlsZHJlbi5sZW5ndGggPT09IDApe1xuICAgICAgICAgICAgYmVpbmdCdWlsdCA9IG5ldyBMU2VxTm9kZShbbmV3IFRyaXBsZShvLnQucCwgby50LnMsIG8udC5jKV0sIG8uZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyAjMiBicmFuY2hcbiAgICAgICAgICAgIGJlaW5nQnVpbHQgPSBuZXcgTFNlcU5vZGUoW25ldyBUcmlwbGUoby50LnAsIG8udC5zLCBvLnQuYyldKTtcbiAgICAgICAgICAgIGJlaW5nQnVpbHQuY2hpbGRyZW4ucHVzaChMU2VxTm9kZS5mcm9tSlNPTihvLmNoaWxkcmVuWzBdKSk7XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gYmVpbmdCdWlsdDtcbiAgICB9O1xuICAgIFxuICAgIC8qKlxuICAgICAqIEBwcml2YXRlIEdldCB0aGUgbGlzdCBvZiBpbmRleGVzIG9mIHRoZSBhcnJheXMgcmVwcmVzZW50aW5nIHRoZSBjaGlsZHJlblxuICAgICAqIGluIHRoZSB0cmVlLiAgXG4gICAgICogQHBhcmFtIHtMU2VxTm9kZX0gbm9kZSBUaGUgbm9kZSBjb250YWluaW5nIHRoZSBwYXRoLlxuICAgICAqIEByZXR1cm4ge051bWJlcltdfSBUaGUgc3VjY2Vzc2l2ZSBpbmRleGVzIHRvIGdldCB0byB0aGUgbm9kZS4gQW4gZW1wdHlcbiAgICAgKiBsaXN0IGlmIHRoZSBub2RlIGRvZXMgbm90IGV4aXN0LlxuICAgICAqL1xuICAgIF9nZXRJbmRleGVzIChub2RlKSB7XG4gICAgICAgIGNvbnN0IF9fZ2V0SW5kZXhlcyA9IChpbmRleGVzLCBjdXJyZW50VHJlZSwgY3VycmVudE5vZGUpID0+IHtcbiAgICAgICAgICAgIGlmICghY3VycmVudFRyZWUuX2NvbnRhaW5zKGN1cnJlbnROb2RlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gY3VycmVudFRyZWUuX2JpbmFyeUluZGV4T2YoY3VycmVudE5vZGUpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpbmRleGVzLnB1c2goaW5kZXgpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gKChjdXJyZW50Tm9kZS5jaGlsZHJlbi5sZW5ndGggPT09IDAgfHxcbiAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUcmVlLmNoaWxkcmVuLmxlbmd0aCA9PT0gMCkgJiYgaW5kZXhlcykgfHxcbiAgICAgICAgICAgICAgICBfX2dldEluZGV4ZXMoaW5kZXhlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFRyZWUuY2hpbGRyZW5baW5kZXhdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Tm9kZS5jaGlsZCk7ICAgICAgICAgICAgXG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gX19nZXRJbmRleGVzKFtdLCB0aGlzLCBub2RlKTtcbiAgICB9O1xuICAgIFxuICAgIFxuXG5cbiAgICAvKipcbiAgICAgKiBAcHJpdmF0ZSBmcm9tOiBbaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vV29sZnk4Ny81NzM0NTMwXSBQZXJmb3JtcyBhXG4gICAgICogYmluYXJ5IHNlYXJjaCBvbiB0aGUgaG9zdCBhcnJheS5cbiAgICAgKiBAcGFyYW0ge0xTZXFOb2RlfSBzZWFyY2hFbGVtZW50IFRoZSBpdGVtIHRvIHNlYXJjaCBmb3Igd2l0aGluIHRoZSBhcnJheS5cbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSBpbmRleCBvZiB0aGUgZWxlbWVudCB3aGljaCBkZWZhdWx0cyB0byAtMSB3aGVuIG5vdFxuICAgICAqIGZvdW5kLlxuICAgICAqL1xuICAgIF9iaW5hcnlJbmRleE9mIChzZWFyY2hFbGVtZW50KSB7XG4gICAgICAgIGxldCBtaW5JbmRleCA9IDA7XG4gICAgICAgIGxldCBtYXhJbmRleCA9IHRoaXMuY2hpbGRyZW4ubGVuZ3RoIC0gMTtcbiAgICAgICAgbGV0IGN1cnJlbnRJbmRleDtcbiAgICAgICAgbGV0IGN1cnJlbnRFbGVtZW50O1xuICAgICAgICBcbiAgICAgICAgd2hpbGUgKG1pbkluZGV4IDw9IG1heEluZGV4KSB7XG4gICAgICAgICAgICBjdXJyZW50SW5kZXggPSBNYXRoLmZsb29yKChtaW5JbmRleCArIG1heEluZGV4KSAvIDIpO1xuICAgICAgICAgICAgY3VycmVudEVsZW1lbnQgPSB0aGlzLmNoaWxkcmVuW2N1cnJlbnRJbmRleF07XG4gICAgICAgICAgICBpZiAoY3VycmVudEVsZW1lbnQuY29tcGFyZVRvKHNlYXJjaEVsZW1lbnQpIDwgMCkge1xuICAgICAgICAgICAgICAgIG1pbkluZGV4ID0gY3VycmVudEluZGV4ICsgMTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudEVsZW1lbnQuY29tcGFyZVRvKHNlYXJjaEVsZW1lbnQpID4gMCkge1xuICAgICAgICAgICAgICAgIG1heEluZGV4ID0gY3VycmVudEluZGV4IC0gMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRJbmRleDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB+bWF4SW5kZXg7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEBwcml2YXRlIENoZWNrIHdoZXRoZXIgdGhpcyBub2RlIGNvbnRhaW5zIHRoZSBzZWFyY2hFbGVtZW50IGFzIGNoaWxkcmVuLlxuICAgICAqIEBwYXJhbSB7TFNlcU5vZGV9IHNlYXJjaEVsZW1lbnQgVGhlIGVsZW1lbnQgdG8gbG9vayBmb3IuXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGlzIG5vZGUgY29udGFpbnMgdGhlIG5vZGUgaW4gaXRzXG4gICAgICogY2hpbGRyZW4sIEZhbHNlIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBfY29udGFpbnMgKHNlYXJjaEVsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9iaW5hcnlJbmRleE9mKHNlYXJjaEVsZW1lbnQpO1xuICAgICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5sZW5ndGggPiAwICYmXG4gICAgICAgICAgICAoaW5kZXggPiAwIHx8XG4gICAgICAgICAgICAgKChpbmRleCA9PT0gMCkgJiZcbiAgICAgICAgICAgICAgdGhpcy5jaGlsZC5jb21wYXJlVG8oc2VhcmNoRWxlbWVudCkgPT09IDApKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQHByaXZhdGUgQ2hlY2sgaWYgdGhlIG5vZGUgY29udGFpbnMgYW4gZWxlbWVudC5cbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSBUcnVlIGlmIHRoZSBub2RlIGhhcyBhbiBlbGVtZW50LCBmYWxzZSBvdGhlcndpc2UuXG4gICAgICovXG4gICAgZ2V0IF9oYXNFbGVtZW50ICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZSAhPT0gbnVsbDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdGhlIG5vZGUgaGFzIGNoaWxkcmVuLlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IFRydWUgaWYgdGhlIG5vZGUgaGFzIGNoaWxkcmVuLCBmYWxzZSBvdGhlcndpc2UuXG4gICAgICovXG4gICAgZ2V0IGlzTGVhZiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuLmxlbmd0aCA9PT0gMDtcbiAgICB9O1xuICAgIFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBMU2VxTm9kZTtcblxuIl19
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0cmF0ZWd5LmpzIl0sIm5hbWVzIjpbIkJJIiwicmVxdWlyZSIsIklkZW50aWZpZXIiLCJTdHJhdGVneSIsImJhc2UiLCJib3VuZGFyeSIsIl9iYXNlIiwiX2JvdW5kYXJ5IiwicCIsInEiLCJsZXZlbCIsImludGVydmFsIiwicyIsImMiLCJjb3B5UCIsImNvcHlRIiwic3RlcCIsIk1hdGgiLCJtaW4iLCJkaWdpdCIsImludDJiaWdJbnQiLCJnZXRTdW1CaXQiLCJ2YWx1ZSIsImkiLCJ0IiwiYWRkSW50XyIsImxlZnRTaGlmdF8iLCJnZXRCaXRCYXNlIiwiaXNMZWFmIiwiY2hpbGQiLCJmbG9vciIsInJhbmRvbSIsIl9nZXRTQyIsInBJc0dyZWF0ZXIiLCJjb21tb25Sb290IiwicHJldlZhbHVlIiwibmV4dFZhbHVlIiwicG93IiwiZCIsInNvdXJjZXMiLCJjb3VudGVycyIsInN1bUJpdCIsInRlbXBEaWdpdCIsImR1cCIsInJpZ2h0U2hpZnRfIiwibW9kSW50IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQUVBLElBQU1BLEtBQUtDLFFBQVEsUUFBUixDQUFYO0FBQ0EsSUFBTUMsYUFBYUQsUUFBUSxpQkFBUixDQUFuQjs7QUFFQTs7Ozs7SUFJTUUsUTtBQUNGOzs7OztBQUtBLHNCQUFhQyxJQUFiLEVBQWtDO0FBQUEsWUFBZkMsUUFBZSx1RUFBSixFQUFJOztBQUFBOztBQUM5QixhQUFLQyxLQUFMLEdBQWFGLElBQWI7QUFDQSxhQUFLRyxTQUFMLEdBQWlCRixRQUFqQjtBQUNIOzs7Ozs7QUFFRDs7Ozs7Ozs7Ozs7OzhCQVlPRyxDLEVBQUdDLEMsRUFBR0MsSyxFQUFPQyxRLEVBQVVDLEMsRUFBR0MsQyxFQUFHO0FBQ2hDLGdCQUFJQyxRQUFRTixDQUFaO0FBQUEsZ0JBQWVPLFFBQVFOLENBQXZCO0FBQUEsZ0JBQ0lPLE9BQU9DLEtBQUtDLEdBQUwsQ0FBUyxLQUFLWCxTQUFkLEVBQXlCSSxRQUF6QixDQURYO0FBQUEs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QixDQUFULElBQVlWLENBQVo7O0FBRUEsb0JBQUlKLEtBQUtBLEVBQUVlLENBQUYsQ0FBSWhCLENBQUosS0FBVWMsS0FBbkIsRUFBMEI7QUFBRWlCLDRCQUFRaEIsQ0FBUixJQUFXZCxFQUFFZSxDQUFGLENBQUlaLENBQWYsQ0FBa0I0QixTQUFTakIsQ0FBVCxJQUFZZCxFQUFFZSxDQUFGLENBQUlYLENBQWhCO0FBQW9CO0FBQ2xFLG9CQUFJTCxLQUFLQSxFQUFFZ0IsQ0FBRixDQUFJaEIsQ0FBSixLQUFVYyxLQUFuQixFQUEwQjtBQUFFaUIsNEJBQVFoQixDQUFSLElBQVdmLEVBQUVnQixDQUFGLENBQUlaLENBQWYsQ0FBa0I0QixTQUFTakIsQ0FBVCxJQUFZZixFQUFFZ0IsQ0FBRixDQUFJWCxDQUFoQjtBQUFvQjs7QUFFbEVKLG9CQUFLQSxLQUFLLENBQUNBLEVBQUVtQixNQUFSLElBQWtCbkIsRUFBRW9CLEtBQXJCLElBQStCLElBQW5DO0FBQ0FyQixvQkFBS0EsS0FBSyxDQUFDQSxFQUFFb0IsTUFBUixJQUFrQnBCLEVBQUVxQixLQUFyQixJQUErQixJQUFuQzs7QUFFQSxrQkFBRU4sQ0FBRjtBQUNIOztBQUVELG1CQUFPLElBQUlyQixVQUFKLENBQWUsS0FBS0ksS0FBcEIsRUFBMkJnQyxDQUEzQixFQUE4QkMsT0FBOUIsRUFBdUNDLFFBQXZDLENBQVA7QUFDSDs7Ozs7O0FBRUo7O0FBRURNLE9BQU9DLE9BQVAsR0FBaUI1QyxRQUFqQiIsImZpbGUiOiJzdHJhdGVneS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgQkkgPSByZXF1aXJlKCdCaWdJbnQnKTtcbmNvbnN0IElkZW50aWZpZXIgPSByZXF1aXJlKCcuL2lkZW50aWZpZXIuanMnKTtcblxuLyoqXG4gKiBFbnVtZXJhdGUgdGhlIGF2YWlsYWJsZSBzdWItYWxsb2NhdGlvbiBzdHJhdGVnaWVzLiBUaGUgc2lnbmF0dXJlIG9mIHRoZXNlXG4gKiBmdW5jdGlvbnMgaXMgZihJZCwgSWQsIE4rLCBOKywgTiwgTik6IElkLlxuICovXG5jbGFzcyBTdHJhdGVneSB7ICAgIFxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7QmFzZX0gYmFzZSBUaGUgYmFzZSB1c2VkIHRvIGNyZWF0ZSB0aGUgbmV3IGlkZW50aWZpZXJzLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbYm91bmRhcnkgPSAxMF0gVGhlIHZhbHVlIHVzZWQgYXMgdGhlIGRlZmF1bHQgbWF4aW11bVxuICAgICAqIHNwYWNpbmcgYmV0d2VlbiBpZGVudGlmaWVycy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvciAoYmFzZSwgYm91bmRhcnkgPSAxMCkge1xuICAgICAgICB0aGlzLl9iYXNlID0gYmFzZTtcbiAgICAgICAgdGhpcy5fYm91bmRhcnkgPSBib3VuZGFyeTtcbiAgICB9O1xuICAgIFxuICAgIC8qKlxuICAgICAqIENob29zZSBhbiBpZGVudGlmaWVyIHN0YXJ0aW5nIGZyb20gcHJldmlvdXMgYm91bmQgYW5kIGFkZGluZyByYW5kb21cbiAgICAgKiBudW1iZXIuXG4gICAgICogQHBhcmFtIHtMU2VxTm9kZX0gcCBUaGUgcHJldmlvdXMgaWRlbnRpZmllci5cbiAgICAgKiBAcGFyYW0ge0xTZXFOb2RlfSBxIFRoZSBuZXh0IGlkZW50aWZpZXIuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGxldmVsIFRoZSBudW1iZXIgb2YgY29uY2F0ZW5hdGlvbiBjb21wb3NpbmcgdGhlIG5ld1xuICAgICAqIGlkZW50aWZpZXIuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGludGVydmFsIFRoZSBpbnRlcnZhbCBiZXR3ZWVuIHAgYW5kIHEuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHMgVGhlIHNvdXJjZSB0aGF0IGNyZWF0ZXMgdGhlIG5ldyBpZGVudGlmaWVyLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBjIFRoZSBjb3VudGVyIG9mIHRoYXQgc291cmNlLlxuICAgICAqIEByZXR1cm4ge0lkZW50aWZpZXJ9IFRoZSBuZXcgYWxsb2NhdGVkIGlkZW50aWZpZXIuXG4gICAgICovXG4gICAgYlBsdXMgKHAsIHEsIGxldmVsLCBpbnRlcnZhbCwgcywgYykge1xuICAgICAgICBsZXQgY29weVAgPSBwLCBjb3B5USA9IHEsXG4gICAgICAgICAgICBzdGVwID0gTWF0aC5taW4odGhpcy5fYm91bmRhcnksIGludGVydmFsKSwgLy8jMCB0aGUgbWluIGludGVydmFsXG4gICAgICAgICAgICBkaWdpdCA9IEJJLmludDJiaWdJbnQoMCwgdGhpcy5fYmFzZS5nZXRTdW1CaXQobGV2ZWwpKSxcbiAgICAgICAgICAgIHZhbHVlO1xuICAgICAgICBcbiAgICAgICAgLy8gIzEgY29weSB0aGUgcHJldmlvdXMgaWRlbnRpZmllclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBsZXZlbDsgKytpKSB7XG5cdCAgICB2YWx1ZSA9IChwICYmIHAudC5wKSB8fCAwO1xuICAgICAgICAgICAgQkkuYWRkSW50XyhkaWdpdCwgdmFsdWUpO1xuICAgICAgICAgICAgaWYgKGkgIT09IGxldmVsKSB7XG4gICAgICAgICAgICAgICAgQkkubGVmdFNoaWZ0XyhkaWdpdCwgdGhpcy5fYmFzZS5nZXRCaXRCYXNlKGkgKyAxKSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcCA9IChwICYmICFwLmlzTGVhZiAmJiBwLmNoaWxkKSB8fCBudWxsO1xuICAgICAgICB9O1xuICAgICAgICAvLyAjMiBjcmVhdGUgYSBkaWdpdCBmb3IgYW4gaWRlbnRpZmllciBieSBhZGRpbmcgYSByYW5kb20gdmFsdWVcbiAgICAgICAgLy8gI0EgRGlnaXRcbiAgICAgICAgQkkuYWRkSW50XyhkaWdpdCwgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogc3RlcCArIDEpKTtcbiAgICAgICAgLy8gI0IgU291cmNlICYgY291bnRlclxuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0U0MoZGlnaXQsIGNvcHlQLCBjb3B5USwgbGV2ZWwsIHMsIGMpO1xuICAgIH07XG5cblxuICAgIFxuICAgIC8qKlxuICAgICAqIENob29zZSBhbiBpZGVudGlmaWVyIHN0YXJ0aW5nIGZyb20gbmV4dCBib3VuZCBhbmQgc3Vic3RyYWN0IGEgcmFuZG9tXG4gICAgICogbnVtYmVyLlxuICAgICAqIEBwYXJhbSB7TFNlcU5vZGV9IHAgVGhlIHByZXZpb3VzIGlkZW50aWZpZXIuXG4gICAgICogQHBhcmFtIHtMU2VxTm9kZX0gcSBUaGUgbmV4dCBpZGVudGlmaWVyLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBsZXZlbCBUaGUgbnVtYmVyIG9mIGNvbmNhdGVuYXRpb24gY29tcG9zaW5nIHRoZSBuZXdcbiAgICAgKiBpZGVudGlmaWVyLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbnRlcnZhbCBUaGUgaW50ZXJ2YWwgYmV0d2VlbiBwIGFuZCBxLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzIFRoZSBzb3VyY2UgdGhhdCBjcmVhdGVzIHRoZSBuZXcgaWRlbnRpZmllci5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gYyBUaGUgY291bnRlciBvZiB0aGF0IHNvdXJjZS5cbiAgICAgKi9cbiAgICBiTWludXMgKHAsIHEsIGxldmVsLCBpbnRlcnZhbCwgcywgYykge1xuICAgICAgICBsZXQgY29weVAgPSBwLCBjb3B5USA9IHEsXG4gICAgICAgICAgICBzdGVwID0gTWF0aC5taW4odGhpcy5fYm91bmRhcnksIGludGVydmFsKSwvLyAjMCBwcm9jZXNzIG1pbiBpbnRlcnZhbFxuICAgICAgICAgICAgZGlnaXQgPSBCSS5pbnQyYmlnSW50KDAsIHRoaXMuX2Jhc2UuZ2V0U3VtQml0KGxldmVsKSksXG4gICAgICAgICAgICBwSXNHcmVhdGVyID0gZmFsc2UsIGNvbW1vblJvb3QgPSB0cnVlLFxuICAgICAgICAgICAgcHJldlZhbHVlLCBuZXh0VmFsdWU7XG4gICAgICAgIFxuICAgICAgICAvLyAjMSBjb3B5IG5leHQsIGlmIHByZXZpb3VzIGlzIGdyZWF0ZXIsIGNvcHkgbWF4VmFsdWUgQCBkZXB0aFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBsZXZlbDsgKytpKSB7XG4gICAgICAgICAgICBwcmV2VmFsdWUgPSAocCAmJiBwLnQucCkgfHwgMDtcbiAgICAgICAgICAgIG5leHRWYWx1ZSA9IChxICYmIHEudC5wKSB8fCAwO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoY29tbW9uUm9vdCAmJiBwcmV2VmFsdWUgIT09IG5leHRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGNvbW1vblJvb3QgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBwSXNHcmVhdGVyID0gcHJldlZhbHVlID4gbmV4dFZhbHVlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmIChwSXNHcmVhdGVyKSB7XG4gICAgICAgICAgICAgICAgbmV4dFZhbHVlID0gTWF0aC5wb3coMix0aGlzLl9iYXNlLmdldEJpdEJhc2UoaSkpLTE7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgQkkuYWRkSW50XyhkaWdpdCwgbmV4dFZhbHVlKTtcbiAgICAgICAgICAgIGlmIChpICE9PSBsZXZlbCkge1xuICAgICAgICAgICAgICAgIEJJLmxlZnRTaGlmdF8oZGlnaXQsdGhpcy5fYmFzZS5nZXRCaXRCYXNlKGkrMSkpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcSA9IChxICYmICFxLmlzTGVhZiAmJiBxLmNoaWxkKSB8fCBudWxsO1xuICAgICAgICAgICAgcCA9IChwICYmICFwLmlzTGVhZiAmJiBwLmNoaWxkKSB8fCBudWxsO1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgLy8gIzMgY3JlYXRlIGEgZGlnaXQgZm9yIGFuIGlkZW50aWZpZXIgYnkgc3ViaW5nIGEgcmFuZG9tIHZhbHVlXG4gICAgICAgIC8vICNBIERpZ2l0XG4gICAgICAgIGlmIChwSXNHcmVhdGVyKSB7XG4gICAgICAgICAgICBCSS5hZGRJbnRfKGRpZ2l0LCAtTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKnN0ZXApICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBCSS5hZGRJbnRfKGRpZ2l0LCAtTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKnN0ZXApLTEgKTtcbiAgICAgICAgfTtcbiAgICBcbiAgICAgICAgLy8gI0IgU291cmNlICYgY291bnRlclxuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0U0MoZGlnaXQsIGNvcHlQLCBjb3B5USwgbGV2ZWwsIHMsIGMpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDb3BpZXMgdGhlIGFwcHJvcHJpYXRlcyBzb3VyY2UgYW5kIGNvdW50ZXIgZnJvbSB0aGUgYWRqYWNlbnQgaWRlbnRpZmllcnNcbiAgICAgKiBhdCB0aGUgaW5zZXJ0aW9uIHBvc2l0aW9uLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBkIFRoZSBkaWdpdCBwYXJ0IG9mIHRoZSBuZXcgaWRlbnRpZmllci5cbiAgICAgKiBAcGFyYW0ge0xTZXFOb2RlfSBwIFRoZSBwcmV2aW91cyBpZGVudGlmaWVyLlxuICAgICAqIEBwYXJhbSB7TFNlcU5vZGV9IHEgdGhlIG5leHQgaWRlbnRpZmllci5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbGV2ZWwgVGhlIHNpemUgb2YgdGhlIG5ldyBpZGVudGlmaWVyLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzIFRoZSBsb2NhbCBzaXRlIGlkZW50aWZpZXIuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGMgVGhlIGxvY2FsIG1vbm90b25pYyBjb3VudGVyLlxuICAgICAqIEByZXR1cm4ge0lkZW50aWZpZXJ9IFRoZSBuZXcgYWxsb2NhdGVkIGlkZW50aWZpZXIuXG4gICAgICovXG4gICAgX2dldFNDIChkLCBwLCBxLCBsZXZlbCwgcywgYykge1xuICAgICAgICBsZXQgc291cmNlcyA9IFtdLCBjb3VudGVycyA9IFtdLFxuICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICBzdW1CaXQgPSB0aGlzLl9iYXNlLmdldFN1bUJpdChsZXZlbCksXG4gICAgICAgICAgICB0ZW1wRGlnaXQsIHZhbHVlO1xuICAgICAgICBcbiAgICAgICAgd2hpbGUgKGkgPD0gbGV2ZWwpIHtcbiAgICAgICAgICAgIHRlbXBEaWdpdCA9IEJJLmR1cChkKTtcbiAgICAgICAgICAgIEJJLnJpZ2h0U2hpZnRfKHRlbXBEaWdpdCwgc3VtQml0IC0gdGhpcy5fYmFzZS5nZXRTdW1CaXQoaSkpO1xuICAgICAgICAgICAgdmFsdWUgPSBCSS5tb2RJbnQodGVtcERpZ2l0LCBNYXRoLnBvdygyLCB0aGlzLl9iYXNlLmdldEJpdEJhc2UoaSkpKTtcbiAgICAgICAgICAgIHNvdXJjZXNbaV09cztcbiAgICAgICAgICAgIGNvdW50ZXJzW2ldPWM7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChxICYmIHEudC5wID09PSB2YWx1ZSkgeyBzb3VyY2VzW2ldPXEudC5zOyBjb3VudGVyc1tpXT1xLnQuYzsgfTtcbiAgICAgICAgICAgIGlmIChwICYmIHAudC5wID09PSB2YWx1ZSkgeyBzb3VyY2VzW2ldPXAudC5zOyBjb3VudGVyc1tpXT1wLnQuYzsgfTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcSA9IChxICYmICFxLmlzTGVhZiAmJiBxLmNoaWxkKSB8fCBudWxsO1xuICAgICAgICAgICAgcCA9IChwICYmICFwLmlzTGVhZiAmJiBwLmNoaWxkKSB8fCBudWxsO1xuXG4gICAgICAgICAgICArK2k7XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbmV3IElkZW50aWZpZXIodGhpcy5fYmFzZSwgZCwgc291cmNlcywgY291bnRlcnMpO1xuICAgIH07XG4gICAgXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0cmF0ZWd5O1xuIl19
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxzZXF0cmVlLmpzIl0sIm5hbWVzIjpbIm1lcmdlIiwicmVxdWlyZSIsIkJhc2UiLCJTdHJhdGVneSIsIklkZW50aWZpZXIiLCJUcmlwbGUiLCJMU2VxTm9kZSIsIkxTZXFUcmVlIiwic2l0ZSIsIm9wdGlvbnMiLCJsaXN0VHJpcGxlIiwiYm91bmRhcnkiLCJiYXNlIiwiX3MiLCJfYyIsIl9oYXNoIiwiZGVwdGgiLCJfYmFzZSIsIl9zdHJhdGVneSIsInJvb3QiLCJhZGQiLCJNYXRoIiwicG93IiwiZ2V0Qml0QmFzZSIsIk51bWJlciIsIk1BWF9WQUxVRSIsImluZGV4Iiwibm9kZSIsImdldCIsImlzTGVhZiIsImNoaWxkIiwiZSIsImVsZW1lbnQiLCJwZWkiLCJfZ2V0IiwicWVpIiwiaWQiLCJhbGxvYyIsInBhaXIiLCJlbGVtIiwiYXBwbHlJbnNlcnQiLCJlaSIsImkiLCJmcm9tTm9kZSIsImFwcGx5UmVtb3ZlIiwicCIsInEiLCJpbnRlcnZhbCIsImxldmVsIiwiZ2V0SW50ZXJ2YWwiLCJiUGx1cyIsImJNaW51cyIsIm5vSW5kZXgiLCJyZXN1bHQiLCJfZCIsInRvTm9kZSIsInQiLCJjaGlsZHJlbiIsImZyb21KU09OIiwiaW5kZXhPZiIsInBvc2l0aW9uIiwiZGVsIiwib2JqZWN0IiwiX2JvdW5kYXJ5IiwiZGVwdGhGaXJzdCIsImN1cnJlbnROb2RlIiwiY3VycmVudFBhdGgiLCJ0cmlwbGUiLCJzIiwiYyIsInB1c2giLCJzbGljZSIsImxlbmd0aCIsInBvcCIsInN1YkNvdW50ZXIiLCJfaGFzRWxlbWVudCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFFQSxJQUFNQSxRQUFRQyxRQUFRLGNBQVIsQ0FBZDtBQUNBLElBQU1DLE9BQU9ELFFBQVEsV0FBUixDQUFiO0FBQ0EsSUFBTUUsV0FBV0YsUUFBUSxlQUFSLENBQWpCO0FBQ0EsSUFBTUcsYUFBYUgsUUFBUSxpQkFBUixDQUFuQjtBQUNBLElBQU1JLFNBQVNKLFFB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LENBQXFCZSxNQUF6QyxFQUFpRCxFQUFFOUIsQ0FBbkQsRUFBcUQ7QUFDakRzQiwyQkFBV0YsT0FBTzNDLElBQVAsQ0FBWXNDLFFBQVosQ0FBcUJmLENBQXJCLENBQVgsRUFBb0MsRUFBcEM7QUFDSDtBQUNELG1CQUFPLElBQVA7QUFDSDs7OzRCQXBMYTtBQUNWLGdCQUFJVyxTQUFTLEtBQUtsQyxJQUFMLENBQVV1RCxVQUFWLEdBQXVCLENBQXBDLENBRFUsQ0FDNkI7QUFDdkNyQixxQkFBVSxLQUFLbEMsSUFBTCxDQUFVd0QsV0FBVixJQUF5QnRCLFNBQVMsQ0FBbkMsSUFBeUNBLE1BQWxEO0FBQ0EsbUJBQU9BLE1BQVA7QUFDSDs7Ozs7O0FBa0xKOztBQUVEdUIsT0FBT0MsT0FBUCxHQUFpQnRFLFFBQWpCIiwiZmlsZSI6ImxzZXF0cmVlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBtZXJnZSA9IHJlcXVpcmUoJ2xvZGFzaC5tZXJnZScpO1xuY29uc3QgQmFzZSA9IHJlcXVpcmUoJy4vYmFzZS5qcycpO1xuY29uc3QgU3RyYXRlZ3kgPSByZXF1aXJlKCcuL3N0cmF0ZWd5LmpzJyk7XG5jb25zdCBJZGVudGlmaWVyID0gcmVxdWlyZSgnLi9pZGVudGlmaWVyLmpzJyk7XG5jb25zdCBUcmlwbGUgPSByZXF1aXJlKCcuL3RyaXBsZS5qcycpO1xuY29uc3QgTFNlcU5vZGUgPSByZXF1aXJlKCcuL2xzZXFub2RlLmpzJyk7XG5cblxuLyoqXG4gKiBEaXN0cmlidXRlZCBhcnJheSB1c2luZyBMU2VxIGFsbG9jYXRpb24gc3RyYXRlZ3kgd2l0aCBhbiB1bmRlcmx5aW5nXG4gKiBleHBvbmVudGlhbCB0cmVlLlxuICovXG5jbGFzcyBMU2VxVHJlZSB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBnbG9iYWxseSB1bmlxdWUgc2l0ZSBpZGVudGlmaWVyLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9uc10gVGhlIG9wdGlvbnMgb2YgdGhlIExTZXFUcmVlLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5ib3VuZGFyeSA9IDEwXSBUaGUgbWF4aW1hbCBpbnRlcnZhbCBiZXR3ZWVuIHR3b1xuICAgICAqIGdlbmVyYXRlZCBub2Rlcy5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuYmFzZSA9IDE1XSBUaGUgYmFzZSwgaS5lLiwgdGhlIG1heGltYWwgYXJpdHkgb2ZcbiAgICAgKiB0aGUgcm9vdCBub2RlLiBEZWZhdWx0IGlzIDIqKjE1LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yIChzaXRlLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgbGV0IGxpc3RUcmlwbGU7XG4gICAgICAgIC8vICMwIHByb2Nlc3Mgb3B0aW9uc1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBtZXJnZSh7IGJvdW5kYXJ5OiAxMCwgYmFzZTogMTUgfSwgb3B0aW9ucyk7XG5cbiAgICAgICAgLy8gIzEgaW5pdGlhbGl6ZSBzb3VyY2UsIGNvdW50ZXIsIGFuZCBzdHJhdGVneSBjaG9pY2VcbiAgICAgICAgdGhpcy5fcyA9IHNpdGU7XG4gICAgICAgIHRoaXMuX2MgPSAwO1xuICAgICAgICB0aGlzLl9oYXNoID0gKGRlcHRoKSA9PiBkZXB0aCUyO1xuXG4gICAgICAgIHRoaXMuX2Jhc2UgPSBuZXcgQmFzZSh0aGlzLm9wdGlvbnMuYmFzZSk7XG4gICAgICAgIHRoaXMuX3N0cmF0ZWd5ID0gbmV3IFN0cmF0ZWd5KHRoaXMuX2Jhc2UsIHRoaXMub3B0aW9ucy5ib3VuZGFyeSk7XG5cbiAgICAgICAgLy8gIzIgaW5pdGlhbGl6ZSB0cmVlIHN0cnVjdHVyZSB3aXRoIG1heGltYWwgYm91bmRzXG4gICAgICAgIHRoaXMucm9vdCA9IG5ldyBMU2VxTm9kZSgpO1xuICAgICAgICAvLyAjQSBtaW5pbWFsIGJvdW5kXG4gICAgICAgIHRoaXMucm9vdC5hZGQobmV3IExTZXFOb2RlKFtuZXcgVHJpcGxlKDAsMCwwKV0sICcnKSk7XG4gICAgICAgIC8vICNCIG1heGltYWwgYm91bmRcbiAgICAgICAgdGhpcy5yb290LmFkZChcbiAgICAgICAgICAgIG5ldyBMU2VxTm9kZShbbmV3IFRyaXBsZShNYXRoLnBvdygyLCB0aGlzLl9iYXNlLmdldEJpdEJhc2UoMCkpIC0gMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOdW1iZXIuTUFYX1ZBTFVFLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE51bWJlci5NQVhfVkFMVUUpXSwgJycpKTtcbiAgICB9O1xuXG4gICAgXG4gICAgZ2V0IGxlbmd0aCAoKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSB0aGlzLnJvb3Quc3ViQ291bnRlciAtIDI7IC8vIC0yIDogdGhlIGJvdW5kYXJpZXNcbiAgICAgICAgcmVzdWx0ID0gKHRoaXMucm9vdC5faGFzRWxlbWVudCAmJiByZXN1bHQgKyAxKSB8fCByZXN1bHQ7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICBcbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGVsZW1lbnQgYXQgdGFyZ2V0ZWQgaW5kZXggaW4gdGhlIGxpbmVhcml6ZWQgc2VxdWVuY2UuIEl0IGRvZXMgbm90XG4gICAgICogdGFrZSBpbnRvIGFjY291bnQgdGhlIGhpZGRlbiBib3VuZGFyaWVzIG9mIHRoZSBzZXF1ZW5jZSBbTUlOLCBlXzEsIGVfMixcbiAgICAgKiAuLi4gZV9sZW5ndGgsIE1BWF0sIGhlbmNlIGluZGV4IG9mIGVfMSBpcyAwLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleCBUaGUgaW5kZXggb2YgdGhlIGVsZW1lbnQgaW4gdGhlIGZsYXR0ZW5lZCBhcnJheS5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBlbGVtZW50IGxvY2F0ZWQgYXQgdGhlIGluZGV4IGluIGFyZ3VtZW50LlxuICAgICAqL1xuICAgIGdldCAoaW5kZXgpIHtcbiAgICAgICAgbGV0IG5vZGUgPSB0aGlzLnJvb3QuZ2V0KGluZGV4ICsgMSk7XG4gICAgICAgIHdoaWxlICghbm9kZS5pc0xlYWYpe1xuICAgICAgICAgICAgbm9kZSA9IG5vZGUuY2hpbGQ7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBub2RlLmU7XG4gICAgfTtcbiAgICBcbiAgICAvKipcbiAgICAgKiBAcHJpdmF0ZSBHZXQgdGhlIExTZXFOb2RlIGF0IHRhcmdldGVkIGluZGV4IGluIHRoZSBsaW5lYXJpemVkXG4gICAgICogc2VxdWVuY2UuIFRoZSBzZXF1ZW5jZSBpbmNsdWRlcyB0aGUgaGlkZGVuIGJvdW5kYXJpZXMgW01JTiwgZV8xLCBlXzIsXG4gICAgICogLi4uIGVfbGVuZ3RoLCBNQVhdLCBoZW5jZSBlXzEncyBpbmRleCBpcyAxLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleCBUaGUgaW5kZXggb2YgdGhlIGVsZW1lbnQgaW4gdGhlIGZsYXR0ZW5lZCBhcnJheS5cbiAgICAgKiBAcmV0dXJuIHtMU2VxTm9kZX0gVGhlIExTZXFOb2RlIHRhcmdldGluZyB0aGUgZWxlbWVudCBhdCBpbmRleC5cbiAgICAgKi9cbiAgICBfZ2V0IChpbmRleCkge1xuICAgICAgICByZXR1cm4gdGhpcy5yb290LmdldChpbmRleCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEluc2VydCBhIHZhbHVlIGF0IHRoZSB0YXJnZXRlZCBpbmRleC5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gZWxlbWVudCBUaGUgZWxlbWVudCB0byBpbnNlcnQsIGUuZy4gYSBjaGFyYWN0ZXIgaWYgdGhlXG4gICAgICogc2VxdWVuY2UgaXMgYSBzdHJpbmcuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4IFRoZSBwb3NpdGlvbiBpbiB0aGUgYXJyYXkuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSB7X2U6IGVsZW1lbnQgb2YgT2JqZWN0IHR5cGUsIF9pOiBJZGVudGlmaWVyfVxuICAgICAqL1xuICAgIGluc2VydCAoZWxlbWVudCwgaW5kZXgpIHtcbiAgICAgICAgY29uc3QgcGVpID0gdGhpcy5fZ2V0KGluZGV4KSwgLy8gIzFhIHByZXZpb3VzIGJvdW5kXG4gICAgICAgICAgICAgIHFlaSA9IHRoaXMuX2dldChpbmRleCsxKTsgLy8gIzFiIG5leHQgYm91bmRcblxuICAgICAgICAgLy8gIzJhIGluY3JlbWVudGluZyB0aGUgbG9jYWwgY291bnRlclxuICAgICAgICB0aGlzLl9jICs9IDE7XG4gICAgICAgIC8vICMyYiBnZW5lcmF0aW5nIHRoZSBpZCBpbmJldHdlZW4gdGhlIGJvdW5kc1xuICAgICAgICBjb25zdCBpZCA9IHRoaXMuYWxsb2MocGVpLCBxZWkpO1xuXG4gICAgICAgIC8vICMzIGFkZCBpdCB0byB0aGUgc3RydWN0dXJlIGFuZCByZXR1cm4gdmFsdWVcbiAgICAgICAgY29uc3QgcGFpciA9IHtlbGVtOiBlbGVtZW50LCBpZDogaWR9O1xuICAgICAgICB0aGlzLmFwcGx5SW5zZXJ0KHBhaXIpO1xuICAgICAgICByZXR1cm4gcGFpcjtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRGVsZXRlIHRoZSBlbGVtZW50IGF0IHRoZSBpbmRleC5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXggVGhlIGluZGV4IG9mIHRoZSBlbGVtZW50IHRvIGRlbGV0ZSBpbiB0aGUgYXJyYXkuXG4gICAgICogQHJldHVybiB7SWRlbnRpZmllcn0gVGhlIGlkZW50aWZpZXIgb2YgdGhlIGVsZW1lbnQgYXQgdGhlIGluZGV4LlxuICAgICAqL1xuICAgIHJlbW92ZSAoaW5kZXgpIHtcbiAgICAgICAgY29uc3QgZWkgPSB0aGlzLl9nZXQoaW5kZXggKyAxKTtcbiAgICAgICAgY29uc3QgaSA9IG5ldyBJZGVudGlmaWVyKHRoaXMuX2Jhc2UpLmZyb21Ob2RlKGVpKTtcbiAgICAgICAgdGhpcy5hcHBseVJlbW92ZShlaSk7XG4gICAgICAgIHJldHVybiBpO1xuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIEdlbmVyYXRlIHRoZSBkaWdpdCBwYXJ0IG9mIHRoZSBpZGVudGlmaWVycyAgYmV0d2VlbiBwIGFuZCBxLlxuICAgICAqIEBwYXJhbSB7TFNlcU5vZGV9IHAgVGhlIGRpZ2l0IHBhcnQgb2YgdGhlIHByZXZpb3VzIGlkZW50aWZpZXIuXG4gICAgICogQHBhcmFtIHtMU2VxTm9kZX0gcSBUaGUgZGlnaXQgcGFydCBvZiB0aGUgbmV4dCBpZGVudGlmaWVyLlxuICAgICAqIEByZXR1cm4ge0lkZW50aWZpZXJ9IFRoZSBuZXcgaWRlbnRpZmllciBsb2NhdGVkIGJldHdlZW4gcCBhbmQgcS5cbiAgICAgKi9cbiAgICBhbGxvYyAocCwgcSkge1xuICAgICAgICBsZXQgaW50ZXJ2YWwgPSAwLCBsZXZlbCA9IDA7XG4gICAgICAgIC8vICMxIHByb2Nlc3MgdGhlIGxldmVsIG9mIHRoZSBuZXcgaWRlbnRpZmllclxuICAgICAgICB3aGlsZSAoaW50ZXJ2YWwgPD0gMCkgeyAvLyBubyByb29tIGZvciBpbnNlcnRpb25cbiAgICAgICAgICAgIGludGVydmFsID0gdGhpcy5fYmFzZS5nZXRJbnRlcnZhbChsZXZlbCwgcCwgcSk7XG4gICAgICAgICAgICArK2xldmVsO1xuICAgICAgICB9O1xuICAgICAgICBsZXZlbCAtPSAxO1xuICAgICAgICBpZiAodGhpcy5faGFzaChsZXZlbCkgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdHJhdGVneS5iUGx1cyhwLCBxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldmVsLCBpbnRlcnZhbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zLCB0aGlzLl9jKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdHJhdGVneS5iTWludXMocCwgcSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV2ZWwsIGludGVydmFsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zLCB0aGlzLl9jKTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIFxuICAgIFxuICAgIC8qKlxuICAgICAqIEluc2VydCBhbiBlbGVtZW50IGNyZWF0ZWQgZnJvbSBhIHJlbW90ZSBzaXRlIGludG8gdGhlIGFycmF5LlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYWlyIFBhaXIgY29udGFpbmluZyB0aGUgaWRlbnRpZmllciBhbmQgdGhlIGVsZW1lbnQgdG9cbiAgICAgKiBpbnNlcnQgaW4gdGhlIGRhdGEgc3RydWN0dXJlLlxuICAgICAqIEBwYXJhbSB7SWRlbnRpZmllcnxMU2VxTm9kZX0gcGFpci5pZCBUaGUgaWRlbnRpZmllciBvZiB0aGUgZWxlbWVudC5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcGFpci5lbGVtIFRoZSBlbGVtZW50IHRvIGluc2VydC5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtub0luZGV4ID0gdHJ1ZV0gV2hldGhlciBvciBub3QgaXQgc2hvdWxkIHJldHVybiB0aGVcbiAgICAgKiBpbmRleCBvZiB0aGUgaW5zZXJ0LlxuICAgICAqIEByZXR1cm4ge051bWJlcnxCb29sZWFufSBUaGUgaW5kZXggb2YgdGhlIG5ld2x5IGluc2VydGVkIGVsZW1lbnQgaW4gdGhlXG4gICAgICogYXJyYXksIGlmIGFza2VkLiAtMSBpZiB0aGUgZWxlbWVudCBhbHJlYWR5IGV4aXN0cyBhbmQgaGFzIG5vdCBiZWVuIGFkZGVkLlxuICAgICAqIElmIG5vSW5kZXgsIHJldHVybnMgdHJ1ZSBpZiB0aGUgZWxlbWVudCBoYXMgYmVlbiBhZGRlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAqL1xuICAgIGFwcGx5SW5zZXJ0IChwYWlyLCBub0luZGV4ID0gdHJ1ZSkge1xuICAgICAgICBsZXQgbm9kZSwgcmVzdWx0LCBpO1xuICAgICAgICAvLyAjMCBjYXN0IGZyb20gdGhlIHByb3BlciB0eXBlXG4gICAgICAgIC8vICMwQSB0aGUgaWRlbnRpZmllciBpcyBhbiBJZGVudGlmaWVyXG4gICAgICAgIGkgPSBwYWlyLmlkO1xuICAgICAgICBub2RlID0gIGkgJiYgaS5fZCAmJiBpLl9zICYmIGkuX2MgJiZcbiAgICAgICAgICAgIChuZXcgSWRlbnRpZmllcih0aGlzLl9iYXNlLCBpLl9kLCBpLl9zLCBpLl9jKS50b05vZGUocGFpci5lbGVtKSk7XG4gICAgICAgIC8vICMwQiB0aGUgaWRlbnRpZmllciBpcyBhIExTZXFOb2RlXG4gICAgICAgIG5vZGUgPSAoaSAmJiBpLnQgJiYgaS5jaGlsZHJlbiAmJiBMU2VxTm9kZS5mcm9tSlNPTihpKSkgfHwgbm9kZTtcbiAgICAgICAgLy8gIzEgaW50ZWdyYXRlcyB0aGUgbmV3IGVsZW1lbnQgdG8gdGhlIGRhdGEgc3RydWN0dXJlXG4gICAgICAgIHJlc3VsdCA9IHRoaXMucm9vdC5hZGQobm9kZSk7XG4gICAgICAgIC8vICMyIGlmIHRoZSBlbGVtZW50IGFzIGJlZW4gYWRkZWRcbiAgICAgICAgaWYgKG5vSW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0gZWxzZSBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yb290LmluZGV4T2Yobm9kZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH07ICAgICAgICBcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRGVsZXRlIHRoZSBlbGVtZW50IHdpdGggdGhlIHRhcmdldGVkIGlkZW50aWZpZXIuXG4gICAgICogQHBhcmFtIHtJZGVudGlmaWVyfExTZXFOb2RlfSBpIFRoZSBpZGVudGlmaWVyIG9mIHRoZSBlbGVtZW50LlxuICAgICAqIEByZXR1cm4ge051bWJlcn0gVGhlIGluZGV4IG9mIHRoZSBlbGVtZW50IGZyZXNobHkgZGVsZXRlZCwgLTEgaWYgbm9cbiAgICAgKiByZW1vdmFsLlxuICAgICAqL1xuICAgIGFwcGx5UmVtb3ZlIChpKSB7XG4gICAgICAgIGxldCBub2RlLCBwb3NpdGlvbjtcbiAgICAgICAgLy8gIzAgY2FzdCBmcm9tIHRoZSBwcm9wZXIgdHlwZVxuICAgICAgICBub2RlID0gaSAmJiBpLl9kICYmIGkuX3MgJiYgaS5fYyAmJlxuICAgICAgICAgICAgKG5ldyBJZGVudGlmaWVyKHRoaXMuX2Jhc2UsIGkuX2QsIGkuX3MsIGkuX2MpKS50b05vZGUobnVsbCk7XG4gICAgICAgIC8vICMwQiB0aGUgaWRlbnRpZmllciBpcyBhIExTRVFOb2RlXG4gICAgICAgIG5vZGUgPSAoaSAmJiBpLnQgJiYgaS5jaGlsZHJlbiAmJiBMU2VxTm9kZS5mcm9tSlNPTihpKSkgfHwgbm9kZTtcbiAgICAgICAgLy8gIzEgZ2V0IHRoZSBpbmRleCBvZiB0aGUgZWxlbWVudCB0byByZW1vdmVcbiAgICAgICAgcG9zaXRpb24gPSB0aGlzLnJvb3QuaW5kZXhPZihub2RlKTtcbiAgICAgICAgaWYgKHBvc2l0aW9uICE9PSAtMSl7XG4gICAgICAgICAgICAvLyAjMiBpZiBpdCBleGlzdHMgcmVtb3ZlIGl0XG4gICAgICAgICAgICB0aGlzLnJvb3QuZGVsKG5vZGUpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gcG9zaXRpb247XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENhc3QgdGhlIEpTT04gb2JqZWN0IGludG8gYSBwcm9wZXIgTFNlcVRyZWUuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCB0aGUgSlNPTiBvYmplY3QgdG8gY2FzdC5cbiAgICAgKiBAcmV0dXJuIHtMU2VxVHJlZX0gQSBzZWxmIHJlZmVyZW5jZS5cbiAgICAgKi9cbiAgICBmcm9tSlNPTiAob2JqZWN0KSB7XG4gICAgICAgIC8vICMxIGNvcHkgdGhlIHNvdXJjZSwgY291bnRlciwgYW5kIGxlbmd0aCBvZiB0aGUgb2JqZWN0XG4gICAgICAgIHRoaXMuX3MgPSBvYmplY3QuX3M7XG4gICAgICAgIHRoaXMuX2MgPSBvYmplY3QuX2M7XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG9iamVjdC5vcHRpb25zO1xuXG4gICAgICAgIHRoaXMuX2Jhc2UgPSBuZXcgQmFzZSh0aGlzLm9wdGlvbnMuYmFzZSk7XG4gICAgICAgIHRoaXMuX2JvdW5kYXJ5ID0gbmV3IFN0cmF0ZWd5KHRoaXMuX2Jhc2UsIHRoaXMub3B0aW9ucy5ib3VuZGFyeSk7XG4gICAgICAgIFxuICAgICAgICAvLyAjMiBkZXB0aCBmaXJzdCBhZGRpbmdcbiAgICAgICAgY29uc3QgZGVwdGhGaXJzdCA9IChjdXJyZW50Tm9kZSwgY3VycmVudFBhdGgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRyaXBsZSA9IG5ldyBUcmlwbGUoY3VycmVudE5vZGUudC5wLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Tm9kZS50LnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlLnQuYyk7XG4gICAgICAgICAgICBjdXJyZW50UGF0aC5wdXNoKHRyaXBsZSk7IC8vIHN0YWNrXG4gICAgICAgICAgICBpZiAoY3VycmVudE5vZGUuZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMucm9vdC5hZGQobmV3IExTZXFOb2RlKGN1cnJlbnRQYXRoLnNsaWNlKCksIGN1cnJlbnROb2RlLmUpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGN1cnJlbnROb2RlLmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgZGVwdGhGaXJzdChjdXJyZW50Tm9kZS5jaGlsZHJlbltpXSwgY3VycmVudFBhdGgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGN1cnJlbnRQYXRoLnBvcCgpOyAvLyB1bnN0YWNrXG4gICAgICAgIH07XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2JqZWN0LnJvb3QuY2hpbGRyZW4ubGVuZ3RoOyArK2kpe1xuICAgICAgICAgICAgZGVwdGhGaXJzdChvYmplY3Qucm9vdC5jaGlsZHJlbltpXSwgW10pO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9OyAgICBcbiAgICBcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTFNlcVRyZWU7XG4iXX0=
},{"./base.js":1,"./identifier.js":2,"./lseqnode.js":3,"./strategy.js":4,"./triple.js":5,"lodash.merge":7}]},{},[]);
