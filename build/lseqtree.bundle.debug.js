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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV4b3V0b2Zib3VuZHMuanMiXSwibmFtZXMiOlsiRXhPdXRPZkJvdW5kcyIsImluZGV4Iiwic2l6ZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBOzs7Ozs7O0lBSU1BLGE7O0FBRUY7Ozs7QUFJQSx1QkFBYUMsS0FBYixFQUFvQkMsSUFBcEIsRUFBMEI7QUFBQTs7QUFDdEIsT0FBS0QsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsT0FBS0MsSUFBTCxHQUFZQSxJQUFaO0FBQ0gsQzs7QUFDSjs7QUFFREMsT0FBT0MsT0FBUCxHQUFpQkosYUFBakIiLCJmaWxlIjoiZXhvdXRvZmJvdW5kcy5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBUaHJvd24gd2hlbiB0aGUgaW5kZXggaXMgaGlnaGVyIHRoYW4gdGhlIGN1cnJlbnQgbGVuZ3RoLTEgb2YgdGhlIGFycmF5LCBvclxuICogbG93ZXIgdGhhbiAwLlxuICovXG5jbGFzcyBFeE91dE9mQm91bmRzIHtcblxuICAgIC8qKiBcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXggVGhlIGluZGV4IG91dCBvZiBib3VuZHMuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHNpemUgVGhlIHNpemUgb2YgdGhlIGFycmF5LlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yIChpbmRleCwgc2l6ZSkge1xuICAgICAgICB0aGlzLmluZGV4ID0gaW5kZXg7XG4gICAgICAgIHRoaXMuc2l6ZSA9IHNpemU7XG4gICAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gRXhPdXRPZkJvdW5kcztcbiJdfQ==
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlkZW50aWZpZXIuanMiXSwibmFtZXMiOlsiQkkiLCJyZXF1aXJlIiwiVHJpcGxlIiwiTFNlcU5vZGUiLCJJZGVudGlmaWVyIiwiYmFzZSIsImRpZ2l0cyIsInNpdGVzIiwiY291bnRlcnMiLCJfZCIsIl9zIiwiX2MiLCJfYmFzZSIsIm5vZGUiLCJsZW5ndGgiLCJ0ZW1wTm9kZSIsImlzTGVhZiIsImNoaWxkIiwiaW50MmJpZ0ludCIsImdldFN1bUJpdCIsImkiLCJwdXNoIiwidCIsInMiLCJjIiwiYWRkSW50XyIsInAiLCJsZWZ0U2hpZnRfIiwiZ2V0Qml0QmFzZSIsImUiLCJkQml0TGVuZ3RoIiwicmVzdWx0UGF0aCIsIm1pbmUiLCJkdXAiLCJyaWdodFNoaWZ0XyIsIm1vZEludCIsIk1hdGgiLCJwb3ciLCJvIiwib2RCaXRMZW5ndGgiLCJjb21wYXJpbmciLCJyZXN1bHQiLCJzdW0iLCJvdGhlciIsIm1pbiIsImVxdWFscyIsImdyZWF0ZXIiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FBRUEsSUFBTUEsS0FBS0MsUUFBUSxRQUFSLENBQVg7QUFDQSxJQUFNQyxTQUFTRCxRQUFRLGFBQVIsQ0FBZjtBQUNBLElBQU1FLFdBQVdGLFFBQVEsZUFBUixDQUFqQjs7QUFFQTs7OztJQUdNRyxVOztBQUVGOzs7Ozs7QUFNQSx3QkFBYUMsSUFBYixFQUFtQkMsTUFBbkIsRUFBc0Q7QUFBQSxZQUEzQkMsS0FBMkIsdUVBQW5CLEVBQW1CO0FBQUEsWUFBZkMsUUFBZSx1RUFBSixFQUFJOztBQUFBOztBQUNsRCxhQUFLQyxFQUFMLEdBQVVILE1BQVY7QUFDQSxhQUFLSSxFQUFMLEdBQVVILEtBQVY7QUFDQSxhQUFLSSxFQUFMLEdBQVVILFFBQVY7O0FBRUEsYUFBS0ksS0FBTCxHQUFhUCxJQUFiO0FBQ0g7Ozs7OztBQUdEOzs7Ozs7aUNBTVVRLEksRUFBTTtBQUNaO0FBQ0EsZ0JBQUlDLFNBQVMsQ0FBYjtBQUFBLGdCQUFnQkMsV0FBV0YsSUFBM0I7O0FBRUEsbUJBQU8sQ0FBQ0UsU0FBU0MsTUFBakIsRUFBeUI7QUFDNUIsa0JBQUVGLE1BQUY7QUFDT0MsMkJBQVdBLFNBQVNFLEtBQXBCO0FBQ0g7QUFDRDtBQUNBLGlCQUFLUixFQUFMLEdBQVVULEdBQUdrQixVQUFILENBQWMsQ0FBZCxFQUFpQixLQUFLTixLQUFMLENBQVdPLFNBQVgsQ0FBcUJMLFNBQVMsQ0FBOUIsQ0FBakIsQ0FBVjs7QUFFQSxpQkFBSyxJQUFJTSxJQUFJLENBQWIsRUFBZ0JBLElBQUlOLE1BQXBCLEVBQTZCLEVBQUVNLENBQS9CLEVBQWtDO0FBQzlCO0FBQ0EscUJBQUtWLEVBQUwsQ0FBUVcsSUFBUixDQUFhUixLQUFLUyxDQUFMLENBQU9DLENBQXBCO0FBQ0E7QUFDQSxxQkFBS1osRUFBTCxDQUFRVSxJQUFSLENBQWFSLEtBQUtTLENBQUwsQ0FBT0UsQ0FBcEI7QUFDQTtBQUNBeEIsbUJBQUd5QixPQUFILENBQVcsS0FBS2hCLEVBQWhCLEVBQW9CSSxLQUFLUyxDQUFMLENBQU9JLENBQTNCO0FBQ0Esb0JBQUlOLE1BQU1OLFNBQVMsQ0FBbkIsRUFBc0I7QUFDbEJkLHVCQUFHMkIsVUFBSCxDQUFjLEtBQUtsQixFQUFuQixFQUF1QixLQUFLRyxLQUFMLENBQVdnQixVQUFYLENBQXNCUixJQUFFLENBQXhCLENBQXZCO0FBQ0g7QUFDRFAsdUJBQU9BLEtBQUtJLEtBQVo7QUFDSDs7QUFFRCxtQkFBTyxJQUFQO0FBQ0g7Ozs7O0FBRUQ7Ozs7OzsrQkFNUVksQyxFQUFHO0FBQ1AsZ0JBQU1DLGFBQWEsS0FBS2xCLEtBQUwsQ0FBV08sU0FBWCxDQUFxQixLQUFLUixFQUFMLENBQVFHLE1BQVIsR0FBaUIsQ0FBdEMsQ0FBbkI7QUFDQSxnQkFBSWlCLGFBQWEsRUFBakI7QUFBQSxnQkFBcUJDLGFBQXJCOztBQUVBO0FBQ0EsaUJBQUssSUFBSVosSUFBSSxDQUFiLEVBQWdCQSxJQUFJLEtBQUtULEVBQUwsQ0FBUUcsTUFBNUIsRUFBb0MsRUFBRU0sQ0FBdEMsRUFBeUM7QUFDckM7QUFDQVksdUJBQU9oQyxHQUFHaUMsR0FBSCxDQUFPLEtBQUt4QixFQUFaLENBQVA7QUFDQTtBQUNBVCxtQkFBR2tDLFdBQUgsQ0FBZUYsSUFBZixFQUFxQkYsYUFBYSxLQUFLbEIsS0FBTCxDQUFXTyxTQUFYLENBQXFCQyxDQUFyQixDQUFsQztBQUNBO0FBQ0FXLDJCQUFXVixJQUFYLENBQ0ksSUFBSW5CLE1BQUosQ0FBV0YsR0FBR21DLE1BQUgsQ0FBVUgsSUFBVixFQUNVSSxLQUFLQyxHQUFMLENBQVMsQ0FBVCxFQUFZLEtBQUt6QixLQUFMLENBQVdnQixVQUFYLENBQXNCUixDQUF0QixDQUFaLENBRFYsQ0FBWCxFQUVXLEtBQUtWLEVBQUwsQ0FBUVUsQ0FBUixDQUZYLEVBR1csS0FBS1QsRUFBTCxDQUFRUyxDQUFSLENBSFgsQ0FESjtBQUtIO0FBQ0QsbUJBQU8sSUFBSWpCLFFBQUosQ0FBYTRCLFVBQWIsRUFBeUJGLENBQXpCLENBQVA7QUFDSDs7Ozs7QUFHRDs7Ozs7O2tDQU1XUyxDLEVBQUc7QUFDVixnQkFBSVIsYUFBYSxLQUFLbEIsS0FBTCxDQUFXTyxTQUFYLENBQXFCLEtBQUtSLEVBQUwsQ0FBUUcsTUFBUixHQUFpQixDQUF0QyxDQUFqQjtBQUFBLGdCQUNJeUIsY0FBYyxLQUFLM0IsS0FBTCxDQUFXTyxTQUFYLENBQXFCbUIsRUFBRTNCLEVBQUYsQ0FBS0csTUFBTCxHQUFjLENBQW5DLENBRGxCO0FBQUEsZ0JBRUkwQixZQUFZLElBRmhCO0FBQUEsZ0JBR0lDLFNBQVMsQ0FIYjtBQUFBLGdCQUdnQnJCLElBQUksQ0FIcEI7QUFBQSxnQkFJSXNCLFlBSko7QUFBQSxnQkFJU1YsYUFKVDtBQUFBLGdCQUllVyxjQUpmOztBQU1BO0FBQ0EsbUJBQU9ILGFBQWFwQixJQUFJZ0IsS0FBS1EsR0FBTCxDQUFTLEtBQUtqQyxFQUFMLENBQVFHLE1BQWpCLEVBQXlCd0IsRUFBRTNCLEVBQUYsQ0FBS0csTUFBOUIsQ0FBeEIsRUFBZ0U7QUFDNUQ7QUFDQTRCLHNCQUFNLEtBQUs5QixLQUFMLENBQVdPLFNBQVgsQ0FBcUJDLENBQXJCLENBQU47QUFDQTtBQUNBWSx1QkFBT2hDLEdBQUdpQyxHQUFILENBQU8sS0FBS3hCLEVBQVosQ0FBUDtBQUNBVCxtQkFBR2tDLFdBQUgsQ0FBZUYsSUFBZixFQUFxQkYsYUFBYVksR0FBbEM7QUFDQTtBQUNBQyx3QkFBUTNDLEdBQUdpQyxHQUFILENBQU9LLEVBQUU3QixFQUFULENBQVI7QUFDQVQsbUJBQUdrQyxXQUFILENBQWVTLEtBQWYsRUFBc0JKLGNBQWNHLEdBQXBDO0FBQ0E7QUFDQTtBQUNBLG9CQUFJLENBQUMxQyxHQUFHNkMsTUFBSCxDQUFVYixJQUFWLEVBQWdCVyxLQUFoQixDQUFMLEVBQTZCO0FBQ3pCLHdCQUFJM0MsR0FBRzhDLE9BQUgsQ0FBV2QsSUFBWCxFQUFpQlcsS0FBakIsQ0FBSixFQUE2QjtBQUN6QkYsaUNBQVMsQ0FBVDtBQUNILHFCQUZELE1BRU87QUFDSEEsaUNBQVMsQ0FBQyxDQUFWO0FBQ0g7QUFDREQsZ0NBQVksS0FBWjtBQUNILGlCQVBELE1BT087QUFDSDtBQUNBQyw2QkFBUyxLQUFLL0IsRUFBTCxDQUFRVSxDQUFSLElBQWFrQixFQUFFNUIsRUFBRixDQUFLVSxDQUFMLENBQXRCO0FBQ0Esd0JBQUlxQixXQUFXLENBQWYsRUFBa0I7QUFDZEQsb0NBQVksS0FBWjtBQUNILHFCQUZELE1BRU87QUFDSDtBQUNBQyxpQ0FBUyxLQUFLOUIsRUFBTCxDQUFRUyxDQUFSLElBQWFrQixFQUFFM0IsRUFBRixDQUFLUyxDQUFMLENBQXRCO0FBQ0EsNEJBQUlxQixXQUFXLENBQWYsRUFBa0I7QUFDZEQsd0NBQVksS0FBWjtBQUNIO0FBQ0o7QUFDSjtBQUNELGtCQUFFcEIsQ0FBRjtBQUNIOztBQUVEO0FBQ0EsZ0JBQUlxQixXQUFXLENBQWYsRUFBaUI7QUFDYkEseUJBQVMsS0FBSzlCLEVBQUwsQ0FBUUcsTUFBUixHQUFpQndCLEVBQUUzQixFQUFGLENBQUtHLE1BQS9CO0FBQ0g7O0FBRUQsbUJBQU8yQixNQUFQO0FBQ0g7Ozs7OztBQUNKOztBQUdETSxPQUFPQyxPQUFQLEdBQWlCNUMsVUFBakIiLCJmaWxlIjoiaWRlbnRpZmllci5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgQkkgPSByZXF1aXJlKCdCaWdJbnQnKTtcbmNvbnN0IFRyaXBsZSA9IHJlcXVpcmUoJy4vdHJpcGxlLmpzJyk7XG5jb25zdCBMU2VxTm9kZSA9IHJlcXVpcmUoJy4vbHNlcW5vZGUuanMnKTtcblxuLyoqXG4gKiBVbmlxdWUgYW5kIGltbXV0YWJsZSBpZGVudGlmaWVyIGNvbXBvc2VkIG9mIGRpZ2l0LCBzb3VyY2VzLCBjb3VudGVycy5cbiAqL1xuY2xhc3MgSWRlbnRpZmllciB7XG4gICAgXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtCYXNlfSBiYXNlIFRoZSBiYXNlIG9mIGlkZW50aWZpZXJzLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyW119IGRpZ2l0cyBUaGUgZGlnaXQgKHBvc2l0aW9uIGluIGRlbnNlIHNwYWNlKS5cbiAgICAgKiBAcGFyYW0ge09iamVjdFtdfSBzaXRlcyBUaGUgbGlzdCBvZiBzb3VyY2VzLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyW119IGNvdW50ZXJzIFRoZSBsaXN0IG9mIGNvdW50ZXJzLlxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yIChiYXNlLCBkaWdpdHMsIHNpdGVzID0gW10sIGNvdW50ZXJzID0gW10pIHtcbiAgICAgICAgdGhpcy5fZCA9IGRpZ2l0cztcbiAgICAgICAgdGhpcy5fcyA9IHNpdGVzO1xuICAgICAgICB0aGlzLl9jID0gY291bnRlcnM7XG4gICAgICAgIFxuICAgICAgICB0aGlzLl9iYXNlID0gYmFzZTtcbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBTZXQgdGhlIGQscyxjIHZhbHVlcyBhY2NvcmRpbmcgdG8gdGhlIG5vZGUgaW4gYXJndW1lbnRcbiAgICAgKiBAcGFyYW0ge0xTZXFOb2RlfSBub2RlIFRoZSBsc2Vxbm9kZSBjb250YWluaW5nIHRoZSBwYXRoIGluIHRoZSB0cmVlXG4gICAgICogc3RydWN0dXJlLlxuICAgICAqIEByZXR1cm4ge0lkZW50aWZpZXJ9IFRoaXMgaWRlbnRpZmllciBtb2RpZmllZC5cbiAgICAgKi9cbiAgICBmcm9tTm9kZSAobm9kZSkge1xuICAgICAgICAvLyAjMSBwcm9jZXNzIHRoZSBsZW5ndGggb2YgdGhlIHBhdGhcbiAgICAgICAgbGV0IGxlbmd0aCA9IDEsIHRlbXBOb2RlID0gbm9kZTtcbiAgICAgICAgXG4gICAgICAgIHdoaWxlICghdGVtcE5vZGUuaXNMZWFmKSB7XG5cdCAgICArK2xlbmd0aDtcbiAgICAgICAgICAgIHRlbXBOb2RlID0gdGVtcE5vZGUuY2hpbGQ7XG4gICAgICAgIH07XG4gICAgICAgIC8vICMyIGNvcHkgdGhlIHZhbHVlcyBjb250YWluZWQgaW4gdGhlIHBhdGhcbiAgICAgICAgdGhpcy5fZCA9IEJJLmludDJiaWdJbnQoMCwgdGhpcy5fYmFzZS5nZXRTdW1CaXQobGVuZ3RoIC0gMSkpO1xuICAgICAgICBcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGggOyArK2kpIHtcbiAgICAgICAgICAgIC8vICMxYSBjb3B5IHRoZSBzaXRlIGlkXG4gICAgICAgICAgICB0aGlzLl9zLnB1c2gobm9kZS50LnMpO1xuICAgICAgICAgICAgLy8gIzFiIGNvcHkgdGhlIGNvdW50ZXJcbiAgICAgICAgICAgIHRoaXMuX2MucHVzaChub2RlLnQuYyk7XG4gICAgICAgICAgICAvLyAjMWMgY29weSB0aGUgZGlnaXRcbiAgICAgICAgICAgIEJJLmFkZEludF8odGhpcy5fZCwgbm9kZS50LnApO1xuICAgICAgICAgICAgaWYgKGkgIT09IGxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICBCSS5sZWZ0U2hpZnRfKHRoaXMuX2QsIHRoaXMuX2Jhc2UuZ2V0Qml0QmFzZShpKzEpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBub2RlID0gbm9kZS5jaGlsZDtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgXG4gICAgLyoqXG4gICAgICogQ29udmVydCB0aGUgaWRlbnRpZmllciBpbnRvIGEgbm9kZSB3aXRob3V0IGVsZW1lbnQuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGUgVGhlIGVsZW1lbnQgYXNzb2NpYXRlZCB3aXRoIHRoZSBub2RlLlxuICAgICAqIEByZXR1cm4ge0xTZXFOb2RlfSBBbiBMU2VxTm9kZSBjb250YWluaW5nIHRoZSBlbGVtZW50IGFuZCB0aGUgcGF0aFxuICAgICAqIGV4dHJhY3RlZCBmcm9tIHRoaXMgaWRlbnRpZmllci5cbiAgICAgKi9cbiAgICB0b05vZGUgKGUpIHtcbiAgICAgICAgY29uc3QgZEJpdExlbmd0aCA9IHRoaXMuX2Jhc2UuZ2V0U3VtQml0KHRoaXMuX2MubGVuZ3RoIC0gMSk7XG4gICAgICAgIGxldCByZXN1bHRQYXRoID0gW10sIG1pbmU7XG4gICAgICAgIFxuICAgICAgICAvLyAjMSBkZWNvbnN0cnVjdCB0aGUgZGlnaXQgXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5fYy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgLy8gIzEgdHJ1bmNhdGUgbWluZVxuICAgICAgICAgICAgbWluZSA9IEJJLmR1cCh0aGlzLl9kKTtcbiAgICAgICAgICAgIC8vICMxYSBzaGlmdCByaWdodCB0byBlcmFzZSB0aGUgdGFpbCBvZiB0aGUgcGF0aFxuICAgICAgICAgICAgQkkucmlnaHRTaGlmdF8obWluZSwgZEJpdExlbmd0aCAtIHRoaXMuX2Jhc2UuZ2V0U3VtQml0KGkpKTtcbiAgICAgICAgICAgIC8vICMxYiBjb3B5IHZhbHVlIGluIHRoZSByZXN1bHRcbiAgICAgICAgICAgIHJlc3VsdFBhdGgucHVzaChcbiAgICAgICAgICAgICAgICBuZXcgVHJpcGxlKEJJLm1vZEludChtaW5lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucG93KDIsIHRoaXMuX2Jhc2UuZ2V0Qml0QmFzZShpKSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc1tpXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2NbaV0pKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIG5ldyBMU2VxTm9kZShyZXN1bHRQYXRoLCBlKTtcbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBDb21wYXJlIHR3byBpZGVudGlmaWVycy5cbiAgICAgKiBAcGFyYW0ge0lkZW50aWZpZXJ9IG8gVGhlIG90aGVyIGlkZW50aWZpZXIuXG4gICAgICogQHJldHVybiB7SW50ZWdlcn0gLTEgaWYgdGhpcyBpcyBsb3dlciwgMCBpZiB0aGV5IGFyZSBlcXVhbCwgMSBpZiB0aGlzIGlzXG4gICAgICogZ3JlYXRlci5cbiAgICAgKi9cbiAgICBjb21wYXJlVG8gKG8pIHtcbiAgICAgICAgbGV0IGRCaXRMZW5ndGggPSB0aGlzLl9iYXNlLmdldFN1bUJpdCh0aGlzLl9jLmxlbmd0aCAtIDEpLFxuICAgICAgICAgICAgb2RCaXRMZW5ndGggPSB0aGlzLl9iYXNlLmdldFN1bUJpdChvLl9jLmxlbmd0aCAtIDEpLFxuICAgICAgICAgICAgY29tcGFyaW5nID0gdHJ1ZSxcbiAgICAgICAgICAgIHJlc3VsdCA9IDAsIGkgPSAwLFxuICAgICAgICAgICAgc3VtLCBtaW5lLCBvdGhlcjtcbiAgICAgICAgXG4gICAgICAgIC8vICMxIENvbXBhcmUgdGhlIGxpc3Qgb2YgPGQscyxjPlxuICAgICAgICB3aGlsZSAoY29tcGFyaW5nICYmIGkgPCBNYXRoLm1pbih0aGlzLl9jLmxlbmd0aCwgby5fYy5sZW5ndGgpICkge1xuICAgICAgICAgICAgLy8gY2FuIHN0b3AgYmVmb3JlIHRoZSBlbmQgb2YgZm9yIGxvb3Agd2l6IHJldHVyblxuICAgICAgICAgICAgc3VtID0gdGhpcy5fYmFzZS5nZXRTdW1CaXQoaSk7XG4gICAgICAgICAgICAvLyAjMWEgdHJ1bmNhdGUgbWluZVxuICAgICAgICAgICAgbWluZSA9IEJJLmR1cCh0aGlzLl9kKTtcbiAgICAgICAgICAgIEJJLnJpZ2h0U2hpZnRfKG1pbmUsIGRCaXRMZW5ndGggLSBzdW0pO1xuICAgICAgICAgICAgLy8gIzFiIHRydW5jYXRlIG90aGVyXG4gICAgICAgICAgICBvdGhlciA9IEJJLmR1cChvLl9kKTtcbiAgICAgICAgICAgIEJJLnJpZ2h0U2hpZnRfKG90aGVyLCBvZEJpdExlbmd0aCAtIHN1bSk7XG4gICAgICAgICAgICAvLyAjMiBDb21wYXJlIHRyaXBsZXNcbiAgICAgICAgICAgIC8vICNBIGRpZ2l0XG4gICAgICAgICAgICBpZiAoIUJJLmVxdWFscyhtaW5lLCBvdGhlcikpIHtcbiAgICAgICAgICAgICAgICBpZiAoQkkuZ3JlYXRlcihtaW5lLCBvdGhlcikpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSAtMTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGNvbXBhcmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyAjQiBzb3VyY2VcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLl9zW2ldIC0gby5fc1tpXTsgXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBjb21wYXJpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyAjQyBjb3VudGVyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMuX2NbaV0gLSBvLl9jW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21wYXJpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICsraTtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIC8vICMzIGNvbXBhcmUgbGlzdCBzaXplXG4gICAgICAgIGlmIChyZXN1bHQgPT09IDApe1xuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5fYy5sZW5ndGggLSBvLl9jLmxlbmd0aDtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTsgICAgXG59O1xuXG5cbm1vZHVsZS5leHBvcnRzID0gSWRlbnRpZmllcjtcbiJdfQ==
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxzZXFub2RlLmpzIl0sIm5hbWVzIjpbIlRyaXBsZSIsInJlcXVpcmUiLCJMU2VxTm9kZSIsInRyaXBsZXMiLCJlbGVtZW50IiwidCIsInNoaWZ0IiwiZSIsImxlbmd0aCIsInN1YkNvdW50ZXIiLCJjaGlsZHJlbiIsInB1c2giLCJvIiwiY29tcGFyZVRvIiwibm9kZSIsImluZGV4IiwiX2JpbmFyeUluZGV4T2YiLCJfY29udGFpbnMiLCJzcGxpY2UiLCJhZGQiLCJjaGlsZCIsImluZGV4ZXMiLCJfZ2V0SW5kZXhlcyIsImN1cnJlbnRUcmVlIiwiaSIsImlzU3BsaXR0ZWQiLCJpc0xhc3QiLCJfaGFzRWxlbWVudCIsInN1bSIsImoiLCJfZ2V0IiwibGVmdFN1bSIsImJ1aWxkaW5nTm9kZSIsInF1ZXVlIiwiY3VycmVudE5vZGUiLCJzdGFydEJlZ2lubmluZyIsInVzZUZ1bmN0aW9uIiwicCIsInRlbXAiLCJhIiwiYiIsIl9fZ2V0SW5kZXhlcyIsInNlYXJjaEVsZW1lbnQiLCJtaW5JbmRleCIsIm1heEluZGV4IiwiY3VycmVudEluZGV4IiwiY3VycmVudEVsZW1lbnQiLCJNYXRoIiwiZmxvb3IiLCJiZWluZ0J1aWx0IiwicyIsImMiLCJmcm9tSlNPTiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7QUFFQSxJQUFNQSxTQUFTQyxRQUFRLGFBQVIsQ0FBZjs7QUFFQTs7OztJQUdNQyxRO0FBQ0Y7Ozs7OztBQU1BLHdCQUEyQztBQUFBLFlBQTlCQyxPQUE4Qix1RUFBcEIsRUFBb0I7QUFBQSxZQUFoQkMsT0FBZ0IsdUVBQU4sSUFBTTs7QUFBQTs7QUFDdkMsYUFBS0MsQ0FBTCxHQUFTRixRQUFRRyxLQUFSLEVBQVQ7QUFDQSxhQUFLQyxDQUFMLEdBQVMsSUFBVDtBQUNBLFlBQUlKLFFBQVFLLE1BQVIsS0FBbUIsQ0FBdkIsRUFBMEI7QUFBRSxpQkFBS0QsQ0FBTCxHQUFTSCxPQUFUO0FBQW1CO0FBQy9DLGFBQUtLLFVBQUwsR0FBbUJOLFFBQVFLLE1BQVIsR0FBaUIsQ0FBakIsSUFBc0IsQ0FBdkIsSUFBNkIsQ0FBL0M7QUFDQSxhQUFLRSxRQUFMLEdBQWdCLEVBQWhCO0FBQ0FQLGdCQUFRSyxNQUFSLEdBQWlCLENBQWpCLElBQ0ksS0FBS0UsUUFBTCxDQUFjQyxJQUFkLENBQW1CLElBQUlULFFBQUosQ0FBYUMsT0FBYixFQUFzQkMsT0FBdEIsQ0FBbkIsQ0FESjtBQUVIOzs7Ozs7QUFXRDs7OztrQ0FJV1EsQyxFQUFHO0FBQ1YsbUJBQU8sS0FBS1AsQ0FBTCxDQUFPUSxTQUFQLENBQWlCRCxFQUFFUCxDQUFuQixDQUFQO0FBQ0g7Ozs7O0FBRUQ7Ozs7OzRCQUtLUyxJLEVBQU07QUFDUCxnQkFBTUMsUUFBUSxLQUFLQyxjQUFMLENBQW9CRixJQUFwQixDQUFkOztBQUVBO0FBQ0EsZ0JBQUksQ0FBQyxLQUFLRyxTQUFMLENBQWVILElBQWYsQ0FBTCxFQUEyQjtBQUN2QixxQkFBS0osUUFBTCxDQUFjUSxNQUFkLENBQXFCLENBQUNILEtBQXRCLEVBQTZCLENBQTdCLEVBQWdDRCxJQUFoQztBQUNBLHFCQUFLTCxVQUFMLElBQW1CLENBQW5CO0FBQ0E7QUFDSCxhQUpELE1BSU8sSUFBSUssS0FBS0osUUFBTCxDQUFjRixNQUFkLEtBQXlCLENBQTdCLEVBQWdDO0FBQ25DO0FBQ0Esb0JBQUksS0FBS0UsUUFBTCxDQUFjSyxLQUFkLEVBQXFCUixDQUFyQixLQUEyQixJQUEvQixFQUFvQztBQUNoQywyQkFBTyxLQUFQO0FBQ0gsaUJBRkQsTUFFTztBQUNILHlCQUFLRyxRQUFMLENBQWNLLEtBQWQsRUFBcUJSLENBQXJCLEdBQXlCTyxLQUFLUCxDQUE5QjtBQUNBLHlCQUFLRSxVQUFMLElBQW1CLENBQW5CO0FBQ0g7QUFDRDtBQUNILGFBVE0sTUFTQSxJQUFJLEtBQUtDLFFBQUwsQ0FBY0ssS0FBZCxFQUFxQkksR0FBckIsQ0FBeUJMLEtBQUtNLEtBQTlCLENBQUosRUFBMEM7QUFDN0MscUJBQUtYLFVBQUwsSUFBbUIsQ0FBbkI7QUFDSDtBQUNELG1CQUFPLElBQVA7QUFDSDs7Ozs7QUFHRDs7Ozs7OzRCQU1LSyxJLEVBQU07QUFDUCxnQkFBTU8sVUFBVSxLQUFLQyxXQUFMLENBQWlCUixJQUFqQixDQUFoQjtBQUNBLGdCQUFJUyxjQUFjLElBQWxCO0FBQUEsZ0JBQXdCQyxJQUFJLENBQTVCO0FBQUEsZ0JBQStCQyxhQUFhLEtBQTVDOztBQUVBO0FBQ0EsZ0JBQUlKLFFBQVFiLE1BQVIsS0FBbUIsQ0FBdkIsRUFBMEI7QUFBRSx1QkFBTyxLQUFQO0FBQWU7O0FBRTNDO0FBQ0FlLHdCQUFZZCxVQUFaLElBQTBCLENBQTFCO0FBQ0EsbUJBQU9lLElBQUlILFFBQVFiLE1BQVosSUFBc0IsQ0FBRWlCLFVBQS9CLEVBQTRDO0FBQ3hDLG9CQUFJQyxTQUFTSCxZQUFZYixRQUFaLENBQXFCVyxRQUFRRyxDQUFSLENBQXJCLEVBQWlDRyxXQUFqQyxJQUNUSCxNQUFNSCxRQUFRYixNQUFSLEdBQWlCLENBRDNCO0FBRUEsb0JBQUksQ0FBQ2tCLE1BQUwsRUFBYTtBQUNUSCxnQ0FBWWIsUUFBWixDQUFxQlcsUUFBUUcsQ0FBUixDQUFyQixFQUFpQ2YsVUFBakMsSUFBK0MsQ0FBL0M7QUFDSDtBQUNELG9CQUFJYyxZQUFZYixRQUFaLENBQXFCVyxRQUFRRyxDQUFSLENBQXJCLEVBQWlDZixVQUFqQyxJQUErQyxDQUEvQyxLQUNDLENBQUNjLFlBQVliLFFBQVosQ0FBcUJXLFFBQVFHLENBQVIsQ0FBckIsRUFBaUNHLFdBQWxDLElBQWlERCxNQURsRCxDQUFKLEVBQytEO0FBQzNESCxnQ0FBWWIsUUFBWixDQUFxQlEsTUFBckIsQ0FBNEJHLFFBQVFHLENBQVIsQ0FBNUIsRUFBd0MsQ0FBeEM7QUFDQUMsaUNBQWEsSUFBYjtBQUNIO0FBQ0RGLDhCQUFjQSxZQUFZYixRQUFaLENBQXFCVyxRQUFRRyxDQUFSLENBQXJCLENBQWQ7QUFDQSxrQkFBRUEsQ0FBRjtBQUNIO0FBQ0QsZ0JBQUksQ0FBQ0MsVUFBTCxFQUFnQjtBQUFFRiw0QkFBWWhCLENBQVosR0FBZ0IsSUFBaEI7QUFBc0I7O0FBRXhDLG1CQUFPLElBQVA7QUFDSDs7Ozs7QUFHRDs7Ozs7Ozs7Z0NBUVNPLEksRUFBTTtBQUNYLGdCQUFNTyxVQUFVLEtBQUtDLFdBQUwsQ0FBaUJSLElBQWpCLENBQWhCO0FBQ0EsZ0JBQUljLE1BQU0sQ0FBVjtBQUFBLGdCQUFhTCxjQUFjLElBQTNCO0FBQUEsZ0JBQWlDTSxVQUFqQzs7QUFFQTtBQUNBLGdCQUFJUixRQUFRYixNQUFSLEtBQW1CLENBQXZCLEVBQTBCO0FBQUUsdUJBQU8sQ0FBQyxDQUFSO0FBQVk7O0FBRXhDO0FBQ0EsZ0JBQUllLFlBQVlJLFdBQWhCLEVBQTZCO0FBQUVDLHVCQUFPLENBQVA7QUFBVzs7QUFFMUMsaUJBQUssSUFBSUosSUFBSSxDQUFiLEVBQWdCQSxJQUFJSCxRQUFRYixNQUE1QixFQUFvQyxFQUFFZ0IsQ0FBdEMsRUFBeUM7QUFDckMsb0JBQUlILFFBQVFHLENBQVIsSUFBYUQsWUFBWWIsUUFBWixDQUFxQkYsTUFBckIsR0FBNEIsQ0FBN0MsRUFBZ0Q7QUFDNUM7QUFDQXFCLHdCQUFJLENBQUo7QUFDQSwyQkFBT0EsSUFBSVIsUUFBUUcsQ0FBUixDQUFYLEVBQXVCO0FBQ25CLDRCQUFJRCxZQUFZYixRQUFaLENBQXFCbUIsQ0FBckIsRUFBd0JGLFdBQTVCLEVBQXlDO0FBQUVDLG1DQUFPLENBQVA7QUFBVztBQUN0REEsK0JBQU9MLFlBQVliLFFBQVosQ0FBcUJtQixDQUFyQixFQUF3QnBCLFVBQS9CO0FBQ0EsMEJBQUVvQixDQUFGO0FBQ0g7QUFDSixpQkFSRCxNQVFPO0FBQ0g7QUFDQUQsMkJBQU9MLFlBQVlkLFVBQW5CO0FBQ0FvQix3QkFBSU4sWUFBWWIsUUFBWixDQUFxQkYsTUFBckIsR0FBOEIsQ0FBbEM7QUFDQSwyQkFBT3FCLEtBQUtSLFFBQVFHLENBQVIsQ0FBWixFQUF3QjtBQUNwQiw0QkFBSUQsWUFBWWIsUUFBWixDQUFxQm1CLENBQXJCLEVBQXdCRixXQUE1QixFQUF3QztBQUFFQyxtQ0FBTyxDQUFQO0FBQVc7QUFDckRBLCtCQUFPTCxZQUFZYixRQUFaLENBQXFCbUIsQ0FBckIsRUFBd0JwQixVQUEvQjtBQUNBLDBCQUFFb0IsQ0FBRjtBQUNIO0FBQ0RBLHlCQUFLLENBQUw7QUFDSDtBQUNELG9CQUFJTixZQUFZYixRQUFaLENBQXFCbUIsQ0FBckIsRUFBd0JGLFdBQTVCLEVBQXlDO0FBQUVDLDJCQUFPLENBQVA7QUFBVztBQUN0REwsOEJBQWNBLFlBQVliLFFBQVosQ0FBcUJtQixDQUFyQixDQUFkO0FBQ0g7QUFDRCxtQkFBT0QsTUFBTSxDQUFiLENBakNXLENBaUNLO0FBQ25COzs7OztBQUdEOzs7Ozs7NEJBTUtiLEssRUFBTzs7QUFFUjs7Ozs7Ozs7QUFRQSxnQkFBTWUsT0FBTyxTQUFQQSxJQUFPLENBQUNDLE9BQUQsRUFBVUMsWUFBVixFQUF3QkMsS0FBeEIsRUFBK0JDLFdBQS9CLEVBQStDO0FBQ3hELG9CQUFJQyxpQkFBaUIsSUFBckI7QUFBQSxvQkFBMkJDLG9CQUEzQjtBQUFBLG9CQUF3Q1osSUFBSSxDQUE1QztBQUFBLG9CQUErQ2EsVUFBL0M7QUFBQSxvQkFBa0RDLGFBQWxEO0FBQ0E7QUFDQTtBQUNBLG9CQUFJUCxZQUFZaEIsS0FBWixJQUFxQm1CLFlBQVlQLFdBQXJDLEVBQWtEO0FBQzlDO0FBQ0FNLDBCQUFNMUIsQ0FBTixHQUFVMkIsWUFBWTNCLENBQXRCO0FBQ0EsMkJBQU95QixZQUFQO0FBQ0g7QUFDRCxvQkFBSUUsWUFBWVAsV0FBaEIsRUFBNEI7QUFBRUksK0JBQVcsQ0FBWDtBQUFlOztBQUU3QztBQUNBSSxpQ0FBaUJwQixRQUFNZ0IsT0FBTixHQUFnQkcsWUFBWXpCLFVBQVosR0FBdUIsQ0FBeEQ7QUFDQSxvQkFBSTBCLGNBQUosRUFBb0I7QUFDaEJDLGtDQUFjLHFCQUFDRyxDQUFELEVBQUlDLENBQUo7QUFBQSwrQkFBVUQsSUFBSUMsQ0FBZDtBQUFBLHFCQUFkO0FBQ0gsaUJBRkQsTUFFTztBQUNIVCwrQkFBV0csWUFBWXpCLFVBQXZCO0FBQ0EyQixrQ0FBYyxxQkFBQ0csQ0FBRCxFQUFJQyxDQUFKO0FBQUEsK0JBQVVELElBQUlDLENBQWQ7QUFBQSxxQkFBZDtBQUNIOztBQUVEO0FBQ0Esb0JBQUksQ0FBQ0wsY0FBTCxFQUFxQjtBQUFFWCx3QkFBSVUsWUFBWXhCLFFBQVosQ0FBcUJGLE1BQXJCLEdBQThCLENBQWxDO0FBQXNDO0FBQzdELHVCQUFRMkIsa0JBQWtCSixXQUFXaEIsS0FBOUIsSUFDQyxDQUFDb0IsY0FBRCxJQUFtQkosVUFBVWhCLEtBRHJDLEVBQzZDO0FBQ3pDLHdCQUFJbUIsWUFBWXhCLFFBQVosQ0FBcUJjLENBQXJCLEVBQXdCRyxXQUE1QixFQUF5QztBQUNyQ0ksa0NBQVVLLFlBQVlMLE9BQVosRUFBcUIsQ0FBckIsQ0FBVjtBQUNIO0FBQ0RBLDhCQUFVSyxZQUFZTCxPQUFaLEVBQ1lHLFlBQVl4QixRQUFaLENBQXFCYyxDQUFyQixFQUF3QmYsVUFEcEMsQ0FBVjtBQUVBZSx3QkFBSVksWUFBWVosQ0FBWixFQUFlLENBQWYsQ0FBSjtBQUNIOztBQUVEO0FBQ0FBLG9CQUFJWSxZQUFZWixDQUFaLEVBQWUsQ0FBQyxDQUFoQixDQUFKO0FBQ0Esb0JBQUlXLGNBQUosRUFBb0I7QUFDaEIsd0JBQUlELFlBQVl4QixRQUFaLENBQXFCYyxDQUFyQixFQUF3QkcsV0FBNUIsRUFBeUM7QUFDckNJLGtDQUFVSyxZQUFZTCxPQUFaLEVBQXFCLENBQUMsQ0FBdEIsQ0FBVjtBQUNIO0FBQ0RBLDhCQUFVSyxZQUFZTCxPQUFaLEVBQ1ksQ0FBQ0csWUFBWXhCLFFBQVosQ0FBcUJjLENBQXJCLEVBQXdCZixVQURyQyxDQUFWO0FBRUg7O0FBRUQ7QUFDQTRCLG9CQUFJLEVBQUosQ0FBUUEsRUFBRTFCLElBQUYsQ0FBT3VCLFlBQVl4QixRQUFaLENBQXFCYyxDQUFyQixFQUF3Qm5CLENBQS9CO0FBQ1Isb0JBQUkyQixpQkFBaUIsSUFBckIsRUFBMkI7QUFDdkJBLG1DQUFlLElBQUk5QixRQUFKLENBQWFtQyxDQUFiLEVBQWdCLElBQWhCLENBQWY7QUFDQUosNEJBQVFELFlBQVI7QUFDSCxpQkFIRCxNQUdPO0FBQ0hNLDJCQUFPLElBQUlwQyxRQUFKLENBQWFtQyxDQUFiLEVBQWdCLElBQWhCLENBQVA7QUFDQUosMEJBQU1kLEdBQU4sQ0FBVW1CLElBQVY7QUFDQUwsNEJBQVFLLElBQVI7QUFDSDtBQUNELHVCQUFPUixLQUFLQyxPQUFMLEVBQWNDLFlBQWQsRUFBNEJDLEtBQTVCLEVBQW1DQyxZQUFZeEIsUUFBWixDQUFxQmMsQ0FBckIsQ0FBbkMsQ0FBUDtBQUNILGFBckREO0FBc0RBLG1CQUFPTSxLQUFLLENBQUwsRUFBUSxJQUFSLEVBQWMsSUFBZCxFQUFvQixJQUFwQixDQUFQO0FBQ0g7Ozs7O0FBc0JEOzs7Ozs7O29DQU9haEIsSSxFQUFNO0FBQ2YsZ0JBQU0yQixlQUFlLFNBQWZBLFlBQWUsQ0FBQ3BCLE9BQUQsRUFBVUUsV0FBVixFQUF1QlcsV0FBdkIsRUFBdUM7QUFDeEQsb0JBQUksQ0FBQ1gsWUFBWU4sU0FBWixDQUFzQmlCLFdBQXRCLENBQUwsRUFBeUM7QUFDckMsMkJBQU8sRUFBUDtBQUNIOztBQUVELG9CQUFNbkIsUUFBUVEsWUFBWVAsY0FBWixDQUEyQmtCLFdBQTNCLENBQWQ7O0FBRUFiLHdCQUFRVixJQUFSLENBQWFJLEtBQWI7O0FBRUEsdUJBQVEsQ0FBQ21CLFlBQVl4QixRQUFaLENBQXFCRixNQUFyQixLQUFnQyxDQUFoQyxJQUNBZSxZQUFZYixRQUFaLENBQXFCRixNQUFyQixLQUFnQyxDQURqQyxLQUN1Q2EsT0FEeEMsSUFFSG9CLGFBQWFwQixPQUFiLEVBQ2FFLFlBQVliLFFBQVosQ0FBcUJLLEtBQXJCLENBRGIsRUFFYW1CLFlBQVlkLEtBRnpCLENBRko7QUFLSCxhQWREOztBQWdCQSxtQkFBT3FCLGFBQWEsRUFBYixFQUFpQixJQUFqQixFQUF1QjNCLElBQXZCLENBQVA7QUFDSDs7Ozs7QUFLRDs7Ozs7Ozt1Q0FPZ0I0QixhLEVBQWU7QUFDM0IsZ0JBQUlDLFdBQVcsQ0FBZjtBQUNBLGdCQUFJQyxXQUFXLEtBQUtsQyxRQUFMLENBQWNGLE1BQWQsR0FBdUIsQ0FBdEM7QUFDQSxnQkFBSXFDLHFCQUFKO0FBQ0EsZ0JBQUlDLHVCQUFKOztBQUVBLG1CQUFPSCxZQUFZQyxRQUFuQixFQUE2QjtBQUN6QkMsK0JBQWVFLEtBQUtDLEtBQUwsQ0FBVyxDQUFDTCxXQUFXQyxRQUFaLElBQXdCLENBQW5DLENBQWY7QUFDQUUsaUNBQWlCLEtBQUtwQyxRQUFMLENBQWNtQyxZQUFkLENBQWpCO0FBQ0Esb0JBQUlDLGVBQWVqQyxTQUFmLENBQXlCNkIsYUFBekIsSUFBMEMsQ0FBOUMsRUFBaUQ7QUFDN0NDLCtCQUFXRSxlQUFlLENBQTFCO0FBQ0gsaUJBRkQsTUFFTyxJQUFJQyxlQUFlakMsU0FBZixDQUF5QjZCLGFBQXpCLElBQTBDLENBQTlDLEVBQWlEO0FBQ3BERSwrQkFBV0MsZUFBZSxDQUExQjtBQUNILGlCQUZNLE1BRUE7QUFDSCwyQkFBT0EsWUFBUDtBQUNIO0FBQ0o7QUFDRCxtQkFBTyxDQUFDRCxRQUFSO0FBQ0g7Ozs7O0FBRUQ7Ozs7OztrQ0FNV0YsYSxFQUFlO0FBQ3RCLGdCQUFNM0IsUUFBUSxLQUFLQyxjQUFMLENBQW9CMEIsYUFBcEIsQ0FBZDtBQUNBLG1CQUFPLEtBQUtoQyxRQUFMLENBQWNGLE1BQWQsR0FBdUIsQ0FBdkIsS0FDRk8sUUFBUSxDQUFSLElBQ0VBLFVBQVUsQ0FBWCxJQUNBLEtBQUtLLEtBQUwsQ0FBV1AsU0FBWCxDQUFxQjZCLGFBQXJCLE1BQXdDLENBSHZDLENBQVA7QUFJSDs7Ozs7QUFoU0Q7Ozs7OzRCQUthO0FBQ1QsbUJBQVMsS0FBS2hDLFFBQUwsQ0FBY0YsTUFBZCxHQUF1QixDQUF4QixJQUE4QixLQUFLRSxRQUFMLENBQWMsQ0FBZCxDQUEvQixJQUFvRCxJQUEzRDtBQUNIOzs7OztBQTJSRDs7Ozs0QkFJbUI7QUFDZixtQkFBTyxLQUFLSCxDQUFMLEtBQVcsSUFBbEI7QUFDSDs7Ozs7QUFFRDs7Ozs0QkFJYztBQUNWLG1CQUFPLEtBQUtHLFFBQUwsQ0FBY0YsTUFBZCxLQUF5QixDQUFoQztBQUNIOzs7OztBQXpHRDs7Ozs7aUNBS2lCSSxDLEVBQUc7QUFDaEIsZ0JBQUlxQyxtQkFBSjs7QUFFQTtBQUNBLGdCQUFJckMsRUFBRUYsUUFBRixDQUFXRixNQUFYLEtBQXNCLENBQTFCLEVBQTRCO0FBQ3hCeUMsNkJBQWEsSUFBSS9DLFFBQUosQ0FBYSxDQUFDLElBQUlGLE1BQUosQ0FBV1ksRUFBRVAsQ0FBRixDQUFJZ0MsQ0FBZixFQUFrQnpCLEVBQUVQLENBQUYsQ0FBSTZDLENBQXRCLEVBQXlCdEMsRUFBRVAsQ0FBRixDQUFJOEMsQ0FBN0IsQ0FBRCxDQUFiLEVBQWdEdkMsRUFBRUwsQ0FBbEQsQ0FBYjtBQUNILGFBRkQsTUFFTztBQUNIO0FBQ0EwQyw2QkFBYSxJQUFJL0MsUUFBSixDQUFhLENBQUMsSUFBSUYsTUFBSixDQUFXWSxFQUFFUCxDQUFGLENBQUlnQyxDQUFmLEVBQWtCekIsRUFBRVAsQ0FBRixDQUFJNkMsQ0FBdEIsRUFBeUJ0QyxFQUFFUCxDQUFGLENBQUk4QyxDQUE3QixDQUFELENBQWIsQ0FBYjtBQUNBRiwyQkFBV3ZDLFFBQVgsQ0FBb0JDLElBQXBCLENBQXlCVCxTQUFTa0QsUUFBVCxDQUFrQnhDLEVBQUVGLFFBQUYsQ0FBVyxDQUFYLENBQWxCLENBQXpCO0FBQ0g7O0FBRUQsbUJBQU91QyxVQUFQO0FBQ0g7Ozs7OztBQXlGSjs7QUFFREksT0FBT0MsT0FBUCxHQUFpQnBELFFBQWpCIiwiZmlsZSI6ImxzZXFub2RlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBUcmlwbGUgPSByZXF1aXJlKCcuL3RyaXBsZS5qcycpO1xuXG4vKipcbiAqIEEgbm9kZSBvZiB0aGUgTFNlcSB0cmVlLlxuICovXG5jbGFzcyBMU2VxTm9kZSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtUcmlwbGVbXX0gdHJpcGxlcyBUaGUgbGlzdCBvZiB0cmlwbGVzIGNvbXBvc2luZyB0aGUgcGF0aCB0byB0aGVcbiAgICAgKiBlbGVtZW50LlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtZW50IFRoZSBlbGVtZW50IHRvIGluc2VydCBpbiB0aGUgc3RydWN0dXJlLCBlLmcuLCBhXG4gICAgICogY2hhcmFjdGVyIGluIGEgdGV4dCBkb2N1bWVudC5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvciAodHJpcGxlcyA9IFtdLCBlbGVtZW50ID0gbnVsbCkge1xuICAgICAgICB0aGlzLnQgPSB0cmlwbGVzLnNoaWZ0KCk7XG4gICAgICAgIHRoaXMuZSA9IG51bGw7XG4gICAgICAgIGlmICh0cmlwbGVzLmxlbmd0aCA9PT0gMCkgeyB0aGlzLmUgPSBlbGVtZW50OyB9O1xuICAgICAgICB0aGlzLnN1YkNvdW50ZXIgPSAodHJpcGxlcy5sZW5ndGggPiAwICYmIDEpIHx8IDA7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4gPSBbXTtcbiAgICAgICAgdHJpcGxlcy5sZW5ndGggPiAwICYmXG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLnB1c2gobmV3IExTZXFOb2RlKHRyaXBsZXMsIGVsZW1lbnQpKTtcbiAgICB9O1xuICAgIFxuICAgIC8qKlxuICAgICAqIEdldHRlciB0byB0aGUgZmlyc3QgY2hpbGQuXG4gICAgICogQHJldHVybnMge0xTZXFOb2RlfSBUaGUgZmlyc3QgY2hpbGQgb2YgdGhpcyBub2RlLiBOdWxsIGlmIGl0IGRvZXMgbm90XG4gICAgICogZXhpc3RzLlxuICAgICAqL1xuICAgIGdldCBjaGlsZCAoKSB7XG4gICAgICAgIHJldHVybiAoKHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMCkgJiYgdGhpcy5jaGlsZHJlblswXSkgfHwgbnVsbDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ29tcGFyYXRvciBiZXR3ZWVuIHRvIExTZXFOb2Rlcy5cbiAgICAgKiBAcGFyYW0ge0xTZXFOb2RlfSBvIFRoZSBvdGhlciBMU2VxTm9kZSB0byBjb21wYXJlIHRvLlxuICAgICAqL1xuICAgIGNvbXBhcmVUbyAobykge1xuICAgICAgICByZXR1cm4gdGhpcy50LmNvbXBhcmVUbyhvLnQpO1xuICAgIH07XG4gICAgXG4gICAgLyoqXG4gICAgICogQWRkIGEgbm9kZSB0byB0aGUgY3VycmVudCBub2RlLlxuICAgICAqIEBwYXJhbSB7TFNlcU5vZGV9IG5vZGUgVGhlIG5vZGUgdG8gYWRkIGFzIGEgY2hpbGRyZW4gb2YgdGhpcyBub2RlLlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IEZhbHNlIGlmIHRoZSBlbGVtZW50IGFscmVhZHkgZXhpc3RzLCBUcnVlIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBhZGQgKG5vZGUpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9iaW5hcnlJbmRleE9mKG5vZGUpO1xuICAgICAgICBcbiAgICAgICAgLy8gIzEgaWYgdGhlIHBhdGggZG8gbm8gZXhpc3QsIGNyZWF0ZSBpdFxuICAgICAgICBpZiAoIXRoaXMuX2NvbnRhaW5zKG5vZGUpKSB7XG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLnNwbGljZSgtaW5kZXgsIDAsIG5vZGUpO1xuICAgICAgICAgICAgdGhpcy5zdWJDb3VudGVyICs9IDE7XG4gICAgICAgICAgICAvLyAjMiBvdGhlcndpc2UsIGNvbnRpbnVlIHRvIGV4cGxvcmUgdGhlIHN1YnRyZWVzXG4gICAgICAgIH0gZWxzZSBpZiAobm9kZS5jaGlsZHJlbi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIC8vICMyYSBjaGVjayBpZiB0aGUgZWxlbWVudCBhbHJlYWR5IGV4aXN0c1xuICAgICAgICAgICAgaWYgKHRoaXMuY2hpbGRyZW5baW5kZXhdLmUgIT09IG51bGwpe1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jaGlsZHJlbltpbmRleF0uZSA9IG5vZGUuZTtcbiAgICAgICAgICAgICAgICB0aGlzLnN1YkNvdW50ZXIgKz0gMTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAvLyAjMyBpZiBkaWRub3QgZXhpc3QsIGluY3JlbWVudCB0aGUgY291bnRlclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY2hpbGRyZW5baW5kZXhdLmFkZChub2RlLmNoaWxkKSkge1xuICAgICAgICAgICAgdGhpcy5zdWJDb3VudGVyICs9IDE7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZSB0aGUgbm9kZSBvZiB0aGUgdHJlZSBhbmQgYWxsIG5vZGUgd2l0aGluIHBhdGggYmVpbmcgdXNlbGVzcy5cbiAgICAgKiBAcGFyYW0ge0xTZXFOb2RlfSBub2RlIHRoZSBub2RlIGNvbnRhaW5pbmcgdGhlIHBhdGggdG8gcmVtb3ZlXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgbm9kZSBoYXMgYmVlbiByZW1vdmVkLCBGYWxzZSBpZiBpdCBkb2VzIG5vdFxuICAgICAqIGV4aXN0LlxuICAgICAqL1xuICAgIGRlbCAobm9kZSkge1xuICAgICAgICBjb25zdCBpbmRleGVzID0gdGhpcy5fZ2V0SW5kZXhlcyhub2RlKTtcbiAgICAgICAgbGV0IGN1cnJlbnRUcmVlID0gdGhpcywgaSA9IDAsIGlzU3BsaXR0ZWQgPSBmYWxzZTtcblxuICAgICAgICAvLyAjMSBUaGUgZWxlbWVudCBkb2VzIG5vdCBleGlzdHMsIHN0b3BcbiAgICAgICAgaWYgKGluZGV4ZXMubGVuZ3RoID09PSAwKSB7IHJldHVybiBmYWxzZTsgfTtcblxuICAgICAgICAvLyAjMiBDcmF3bCB0aGUgcGF0aCBhbmQgcmVtb3ZlIHRoZSBlbGVtZW50XG4gICAgICAgIGN1cnJlbnRUcmVlLnN1YkNvdW50ZXIgLT0gMTtcbiAgICAgICAgd2hpbGUgKGkgPCBpbmRleGVzLmxlbmd0aCAmJiAhKGlzU3BsaXR0ZWQpKSB7XG4gICAgICAgICAgICBsZXQgaXNMYXN0ID0gY3VycmVudFRyZWUuY2hpbGRyZW5baW5kZXhlc1tpXV0uX2hhc0VsZW1lbnQgJiZcbiAgICAgICAgICAgICAgICBpID09PSBpbmRleGVzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICBpZiAoIWlzTGFzdCkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRUcmVlLmNoaWxkcmVuW2luZGV4ZXNbaV1dLnN1YkNvdW50ZXIgLT0gMTsgICAgIFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmIChjdXJyZW50VHJlZS5jaGlsZHJlbltpbmRleGVzW2ldXS5zdWJDb3VudGVyIDw9IDAgJiZcbiAgICAgICAgICAgICAgICAoIWN1cnJlbnRUcmVlLmNoaWxkcmVuW2luZGV4ZXNbaV1dLl9oYXNFbGVtZW50IHx8IGlzTGFzdCkpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50VHJlZS5jaGlsZHJlbi5zcGxpY2UoaW5kZXhlc1tpXSwgMSk7XG4gICAgICAgICAgICAgICAgaXNTcGxpdHRlZCA9IHRydWU7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY3VycmVudFRyZWUgPSBjdXJyZW50VHJlZS5jaGlsZHJlbltpbmRleGVzW2ldXTtcbiAgICAgICAgICAgICsraTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKCFpc1NwbGl0dGVkKXsgY3VycmVudFRyZWUuZSA9IG51bGw7fTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBUaGUgb3JkZXJlZCB0cmVlIGNhbiBiZSBsaW5lYXJpemVkIGludG8gYSBzZXF1ZW5jZS4gVGhpcyBmdW5jdGlvbiBnZXQgdGhlXG4gICAgICogaW5kZXggb2YgdGhlIHBhdGggcmVwcmVzZW50ZWQgYnkgdGhlIGxpc3Qgb2YgdHJpcGxlcy5cbiAgICAgKiBAcGFyYW0ge0xTZXFOb2RlfSBub2RlIFRoZSBub2RlIGNvbnRhaW5pbmcgLS0gYXQgbGVhc3QgLS0gdGhlIHBhdGggdG8gdGhlXG4gICAgICogZWxlbWVudC5cbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSBpbmRleCBvZiB0aGUgbm9kZSBpbiB0aGUgbGluZWFyaXplZCBzZXF1ZW5jZTsgLTEgaWZcbiAgICAgKiB0aGUgZWxlbWVudCBkb2VzIG5vdCBleGlzdC5cbiAgICAgKi9cbiAgICBpbmRleE9mIChub2RlKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ZXMgPSB0aGlzLl9nZXRJbmRleGVzKG5vZGUpO1xuICAgICAgICBsZXQgc3VtID0gMCwgY3VycmVudFRyZWUgPSB0aGlzLCBqO1xuICAgICAgICBcbiAgICAgICAgLy8gIzEgSWYgdGhlIG5vZGUgZG9lcyBub3QgZXhpc3QsIHN0b3BcbiAgICAgICAgaWYgKGluZGV4ZXMubGVuZ3RoID09PSAwKSB7IHJldHVybiAtMTsgfTtcblxuICAgICAgICAvLyAjMiBPdGhlcndpc2UsIHN0YXJ0IGNvdW50aW5nXG4gICAgICAgIGlmIChjdXJyZW50VHJlZS5faGFzRWxlbWVudCkgeyBzdW0gKz0gMTsgfTtcbiAgICAgICAgXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5kZXhlcy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgaWYgKGluZGV4ZXNbaV0gPCBjdXJyZW50VHJlZS5jaGlsZHJlbi5sZW5ndGgvMikge1xuICAgICAgICAgICAgICAgIC8vICNBIHN0YXJ0IGZyb20gdGhlIGJlZ2lubmluZyBbLS0tLT58ICAgICBdXG4gICAgICAgICAgICAgICAgaiA9IDA7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGogPCBpbmRleGVzW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VHJlZS5jaGlsZHJlbltqXS5faGFzRWxlbWVudCkgeyBzdW0gKz0gMTsgfTtcbiAgICAgICAgICAgICAgICAgICAgc3VtICs9IGN1cnJlbnRUcmVlLmNoaWxkcmVuW2pdLnN1YkNvdW50ZXI7XG4gICAgICAgICAgICAgICAgICAgICsrajtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyAjQiBzdGFydCBmcm9tIHRoZSBlbmQgWyAgICAgfDwtLS0tXVxuICAgICAgICAgICAgICAgIHN1bSArPSBjdXJyZW50VHJlZS5zdWJDb3VudGVyO1xuICAgICAgICAgICAgICAgIGogPSBjdXJyZW50VHJlZS5jaGlsZHJlbi5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICAgIHdoaWxlIChqID49IGluZGV4ZXNbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRUcmVlLmNoaWxkcmVuW2pdLl9oYXNFbGVtZW50KXsgc3VtIC09IDE7IH07XG4gICAgICAgICAgICAgICAgICAgIHN1bSAtPSBjdXJyZW50VHJlZS5jaGlsZHJlbltqXS5zdWJDb3VudGVyO1xuICAgICAgICAgICAgICAgICAgICAtLWo7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBqICs9IDE7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRUcmVlLmNoaWxkcmVuW2pdLl9oYXNFbGVtZW50KSB7IHN1bSArPSAxOyB9O1xuICAgICAgICAgICAgY3VycmVudFRyZWUgPSBjdXJyZW50VHJlZS5jaGlsZHJlbltqXTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHN1bSAtIDE7IC8vIC0xIGJlY2F1c2UgYWxnb3JpdGhtIGNvdW50ZWQgdGhlIGVsZW1lbnQgaXRzZWxmXG4gICAgfTtcblxuXG4gICAgLyoqXG4gICAgICogVGhlIG9yZGVyZWQgdHJlZSBjYW4gYmUgbGluZWFyaXplZC4gVGhpcyBmdW5jdGlvbiBnZXRzIHRoZSBub2RlIGF0IHRoZVxuICAgICAqIGluZGV4IGluIHRoZSBwcm9qZWN0ZWQgc2VxdWVuY2UuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4IFRoZSBpbmRleCBpbiB0aGUgc2VxdWVuY2UuXG4gICAgICogQHJldHVybiB7TFNlcU5vZGV9IFRoZSBub2RlIGF0IHRoZSBpbmRleC5cbiAgICAgKi9cbiAgICBnZXQgKGluZGV4KSB7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBsZWZ0U3VtIFRoZSBzdW0gb2YgYWxsIGVsZW1lbnQgYXQgdGhlIGxlZnQgb2YgdGhlXG4gICAgICAgICAqIGN1cnJlbnQgaW5zcGVjdGVkIG5vZGUuXG4gICAgICAgICAqIEBwYXJhbSB7TFNlcU5vZGV9IGJ1aWxkaW5nTm9kZSBUaGUgaGVhZCBwYXJ0IG9mIHRoZSBub2RlIGJlaW5nIGJ1aWx0XG4gICAgICAgICAqIGFzIHdlIGNyYXdsLlxuICAgICAgICAgKiBAcGFyYW0ge0xTZXFOb2RlfSBxdWV1ZSBUaGUgcXVldWUgcGFydCBvZiB0aGUgbm9kZSBiZWluZyBidWlsdC5cbiAgICAgICAgICogQHBhcmFtIHtMU2VxTm9kZX0gY3VycmVudE5vZGUgVGhlIHN1YnRyZWUgYmVpbmcgY3Jhd2xlZC5cbiAgICAgICAgICovXG4gICAgICAgIGNvbnN0IF9nZXQgPSAobGVmdFN1bSwgYnVpbGRpbmdOb2RlLCBxdWV1ZSwgY3VycmVudE5vZGUpID0+IHtcbiAgICAgICAgICAgIGxldCBzdGFydEJlZ2lubmluZyA9IHRydWUsIHVzZUZ1bmN0aW9uLCBpID0gMCwgcCwgdGVtcDtcbiAgICAgICAgICAgIC8vICMwIFRoZSBub2RlIGlzIGZvdW5kLCByZXR1cm4gdGhlIGluY3JlbWVudGFsbHkgYnVpbHQgbm9kZSBhbmRcbiAgICAgICAgICAgIC8vIHByYWlzZSB0aGUgc3VuICFcbiAgICAgICAgICAgIGlmIChsZWZ0U3VtID09PSBpbmRleCAmJiBjdXJyZW50Tm9kZS5faGFzRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIC8vIDFhIGNvcHkgdGhlIHZhbHVlIG9mIHRoZSBlbGVtZW50IGluIHRoZSBwYXRoXG4gICAgICAgICAgICAgICAgcXVldWUuZSA9IGN1cnJlbnROb2RlLmU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGJ1aWxkaW5nTm9kZTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoY3VycmVudE5vZGUuX2hhc0VsZW1lbnQpeyBsZWZ0U3VtICs9IDE7IH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vICMxIHNlYXJjaDogZG8gSSBzdGFydCBmcm9tIHRoZSBiZWdpbm5pbmcgb3IgdGhlIGVuZFxuICAgICAgICAgICAgc3RhcnRCZWdpbm5pbmcgPSBpbmRleC1sZWZ0U3VtIDwgY3VycmVudE5vZGUuc3ViQ291bnRlci8yO1xuICAgICAgICAgICAgaWYgKHN0YXJ0QmVnaW5uaW5nKSB7XG4gICAgICAgICAgICAgICAgdXNlRnVuY3Rpb24gPSAoYSwgYikgPT4gYSArIGI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxlZnRTdW0gKz0gY3VycmVudE5vZGUuc3ViQ291bnRlcjtcbiAgICAgICAgICAgICAgICB1c2VGdW5jdGlvbiA9IChhLCBiKSA9PiBhIC0gYjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgLy8gIzJhIGNvdW50aW5nIHRoZSBlbGVtZW50IGZyb20gbGVmdCB0byByaWdodFxuICAgICAgICAgICAgaWYgKCFzdGFydEJlZ2lubmluZykgeyBpID0gY3VycmVudE5vZGUuY2hpbGRyZW4ubGVuZ3RoIC0gMTsgfTtcbiAgICAgICAgICAgIHdoaWxlICgoc3RhcnRCZWdpbm5pbmcgJiYgbGVmdFN1bSA8PSBpbmRleCkgfHxcbiAgICAgICAgICAgICAgICAgICAoIXN0YXJ0QmVnaW5uaW5nICYmIGxlZnRTdW0gPiBpbmRleCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudE5vZGUuY2hpbGRyZW5baV0uX2hhc0VsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgbGVmdFN1bSA9IHVzZUZ1bmN0aW9uKGxlZnRTdW0sIDEpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgbGVmdFN1bSA9IHVzZUZ1bmN0aW9uKGxlZnRTdW0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnROb2RlLmNoaWxkcmVuW2ldLnN1YkNvdW50ZXIpO1xuICAgICAgICAgICAgICAgIGkgPSB1c2VGdW5jdGlvbihpLCAxKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vICMyYiBkZWNyZWFzaW5nIHRoZSBpbmNyZW1lbnRhdGlvblxuICAgICAgICAgICAgaSA9IHVzZUZ1bmN0aW9uKGksIC0xKTtcbiAgICAgICAgICAgIGlmIChzdGFydEJlZ2lubmluZykge1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50Tm9kZS5jaGlsZHJlbltpXS5faGFzRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICBsZWZ0U3VtID0gdXNlRnVuY3Rpb24obGVmdFN1bSwgLTEpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgbGVmdFN1bSA9IHVzZUZ1bmN0aW9uKGxlZnRTdW0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC1jdXJyZW50Tm9kZS5jaGlsZHJlbltpXS5zdWJDb3VudGVyKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vICMzIGJ1aWxkIHBhdGhcbiAgICAgICAgICAgIHAgPSBbXTsgcC5wdXNoKGN1cnJlbnROb2RlLmNoaWxkcmVuW2ldLnQpO1xuICAgICAgICAgICAgaWYgKGJ1aWxkaW5nTm9kZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGJ1aWxkaW5nTm9kZSA9IG5ldyBMU2VxTm9kZShwLCBudWxsKTtcbiAgICAgICAgICAgICAgICBxdWV1ZSA9IGJ1aWxkaW5nTm9kZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGVtcCA9IG5ldyBMU2VxTm9kZShwLCBudWxsKTtcbiAgICAgICAgICAgICAgICBxdWV1ZS5hZGQodGVtcCk7XG4gICAgICAgICAgICAgICAgcXVldWUgPSB0ZW1wO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBfZ2V0KGxlZnRTdW0sIGJ1aWxkaW5nTm9kZSwgcXVldWUsIGN1cnJlbnROb2RlLmNoaWxkcmVuW2ldKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF9nZXQoMCwgbnVsbCwgbnVsbCwgdGhpcyk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENhc3QgYSBKU09OIG9iamVjdCB0byBhbiBMU2VxTm9kZS4gXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG8gVGhlIEpTT04gb2JqZWN0LlxuICAgICAqIEByZXR1cm4ge0xTZXFOb2RlfSBBbiBMU2VxTm9kZS5cbiAgICAgKi9cbiAgICBzdGF0aWMgZnJvbUpTT04gKG8pIHtcbiAgICAgICAgbGV0IGJlaW5nQnVpbHQ7XG5cbiAgICAgICAgLy8gIzEgbGVhZlxuICAgICAgICBpZiAoby5jaGlsZHJlbi5sZW5ndGggPT09IDApe1xuICAgICAgICAgICAgYmVpbmdCdWlsdCA9IG5ldyBMU2VxTm9kZShbbmV3IFRyaXBsZShvLnQucCwgby50LnMsIG8udC5jKV0sIG8uZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyAjMiBicmFuY2hcbiAgICAgICAgICAgIGJlaW5nQnVpbHQgPSBuZXcgTFNlcU5vZGUoW25ldyBUcmlwbGUoby50LnAsIG8udC5zLCBvLnQuYyldKTtcbiAgICAgICAgICAgIGJlaW5nQnVpbHQuY2hpbGRyZW4ucHVzaChMU2VxTm9kZS5mcm9tSlNPTihvLmNoaWxkcmVuWzBdKSk7XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gYmVpbmdCdWlsdDtcbiAgICB9O1xuICAgIFxuICAgIC8qKlxuICAgICAqIEBwcml2YXRlIEdldCB0aGUgbGlzdCBvZiBpbmRleGVzIG9mIHRoZSBhcnJheXMgcmVwcmVzZW50aW5nIHRoZSBjaGlsZHJlblxuICAgICAqIGluIHRoZSB0cmVlLiAgXG4gICAgICogQHBhcmFtIHtMU2VxTm9kZX0gbm9kZSBUaGUgbm9kZSBjb250YWluaW5nIHRoZSBwYXRoLlxuICAgICAqIEByZXR1cm4ge051bWJlcltdfSBUaGUgc3VjY2Vzc2l2ZSBpbmRleGVzIHRvIGdldCB0byB0aGUgbm9kZS4gQW4gZW1wdHlcbiAgICAgKiBsaXN0IGlmIHRoZSBub2RlIGRvZXMgbm90IGV4aXN0LlxuICAgICAqL1xuICAgIF9nZXRJbmRleGVzIChub2RlKSB7XG4gICAgICAgIGNvbnN0IF9fZ2V0SW5kZXhlcyA9IChpbmRleGVzLCBjdXJyZW50VHJlZSwgY3VycmVudE5vZGUpID0+IHtcbiAgICAgICAgICAgIGlmICghY3VycmVudFRyZWUuX2NvbnRhaW5zKGN1cnJlbnROb2RlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gY3VycmVudFRyZWUuX2JpbmFyeUluZGV4T2YoY3VycmVudE5vZGUpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpbmRleGVzLnB1c2goaW5kZXgpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gKChjdXJyZW50Tm9kZS5jaGlsZHJlbi5sZW5ndGggPT09IDAgfHxcbiAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRUcmVlLmNoaWxkcmVuLmxlbmd0aCA9PT0gMCkgJiYgaW5kZXhlcykgfHxcbiAgICAgICAgICAgICAgICBfX2dldEluZGV4ZXMoaW5kZXhlcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFRyZWUuY2hpbGRyZW5baW5kZXhdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Tm9kZS5jaGlsZCk7ICAgICAgICAgICAgXG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gX19nZXRJbmRleGVzKFtdLCB0aGlzLCBub2RlKTtcbiAgICB9O1xuICAgIFxuICAgIFxuXG5cbiAgICAvKipcbiAgICAgKiBAcHJpdmF0ZSBmcm9tOiBbaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vV29sZnk4Ny81NzM0NTMwXSBQZXJmb3JtcyBhXG4gICAgICogYmluYXJ5IHNlYXJjaCBvbiB0aGUgaG9zdCBhcnJheS5cbiAgICAgKiBAcGFyYW0ge0xTZXFOb2RlfSBzZWFyY2hFbGVtZW50IFRoZSBpdGVtIHRvIHNlYXJjaCBmb3Igd2l0aGluIHRoZSBhcnJheS5cbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSBpbmRleCBvZiB0aGUgZWxlbWVudCB3aGljaCBkZWZhdWx0cyB0byAtMSB3aGVuIG5vdFxuICAgICAqIGZvdW5kLlxuICAgICAqL1xuICAgIF9iaW5hcnlJbmRleE9mIChzZWFyY2hFbGVtZW50KSB7XG4gICAgICAgIGxldCBtaW5JbmRleCA9IDA7XG4gICAgICAgIGxldCBtYXhJbmRleCA9IHRoaXMuY2hpbGRyZW4ubGVuZ3RoIC0gMTtcbiAgICAgICAgbGV0IGN1cnJlbnRJbmRleDtcbiAgICAgICAgbGV0IGN1cnJlbnRFbGVtZW50O1xuICAgICAgICBcbiAgICAgICAgd2hpbGUgKG1pbkluZGV4IDw9IG1heEluZGV4KSB7XG4gICAgICAgICAgICBjdXJyZW50SW5kZXggPSBNYXRoLmZsb29yKChtaW5JbmRleCArIG1heEluZGV4KSAvIDIpO1xuICAgICAgICAgICAgY3VycmVudEVsZW1lbnQgPSB0aGlzLmNoaWxkcmVuW2N1cnJlbnRJbmRleF07XG4gICAgICAgICAgICBpZiAoY3VycmVudEVsZW1lbnQuY29tcGFyZVRvKHNlYXJjaEVsZW1lbnQpIDwgMCkge1xuICAgICAgICAgICAgICAgIG1pbkluZGV4ID0gY3VycmVudEluZGV4ICsgMTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudEVsZW1lbnQuY29tcGFyZVRvKHNlYXJjaEVsZW1lbnQpID4gMCkge1xuICAgICAgICAgICAgICAgIG1heEluZGV4ID0gY3VycmVudEluZGV4IC0gMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRJbmRleDtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB+bWF4SW5kZXg7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEBwcml2YXRlIENoZWNrIHdoZXRoZXIgdGhpcyBub2RlIGNvbnRhaW5zIHRoZSBzZWFyY2hFbGVtZW50IGFzIGNoaWxkcmVuLlxuICAgICAqIEBwYXJhbSB7TFNlcU5vZGV9IHNlYXJjaEVsZW1lbnQgVGhlIGVsZW1lbnQgdG8gbG9vayBmb3IuXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGlzIG5vZGUgY29udGFpbnMgdGhlIG5vZGUgaW4gaXRzXG4gICAgICogY2hpbGRyZW4sIEZhbHNlIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBfY29udGFpbnMgKHNlYXJjaEVsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLl9iaW5hcnlJbmRleE9mKHNlYXJjaEVsZW1lbnQpO1xuICAgICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5sZW5ndGggPiAwICYmXG4gICAgICAgICAgICAoaW5kZXggPiAwIHx8XG4gICAgICAgICAgICAgKChpbmRleCA9PT0gMCkgJiZcbiAgICAgICAgICAgICAgdGhpcy5jaGlsZC5jb21wYXJlVG8oc2VhcmNoRWxlbWVudCkgPT09IDApKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQHByaXZhdGUgQ2hlY2sgaWYgdGhlIG5vZGUgY29udGFpbnMgYW4gZWxlbWVudC5cbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSBUcnVlIGlmIHRoZSBub2RlIGhhcyBhbiBlbGVtZW50LCBmYWxzZSBvdGhlcndpc2UuXG4gICAgICovXG4gICAgZ2V0IF9oYXNFbGVtZW50ICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZSAhPT0gbnVsbDtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdGhlIG5vZGUgaGFzIGNoaWxkcmVuLlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IFRydWUgaWYgdGhlIG5vZGUgaGFzIGNoaWxkcmVuLCBmYWxzZSBvdGhlcndpc2UuXG4gICAgICovXG4gICAgZ2V0IGlzTGVhZiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNoaWxkcmVuLmxlbmd0aCA9PT0gMDtcbiAgICB9O1xuICAgIFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBMU2VxTm9kZTtcblxuIl19
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0cmF0ZWd5LmpzIl0sIm5hbWVzIjpbIkJJIiwicmVxdWlyZSIsIklkZW50aWZpZXIiLCJTdHJhdGVneSIsImJhc2UiLCJib3VuZGFyeSIsIl9iYXNlIiwiX2JvdW5kYXJ5IiwicCIsInEiLCJsZXZlbCIsImludGVydmFsIiwicyIsImMiLCJjb3B5UCIsImNvcHlRIiwic3RlcCIsIk1hdGgiLCJtaW4iLCJkaWdpdCIsImludDJiaWdJbnQiLCJnZXRTdW1CaXQiLCJ2YWx1ZSIsImkiLCJ0IiwiYWRkSW50XyIsImxlZnRTaGlmdF8iLCJnZXRCaXRCYXNlIiwiaXNMZWFmIiwiY2hpbGQiLCJmbG9vciIsInJhbmRvbSIsIl9nZXRTQyIsInBJc0dyZWF0ZXIiLCJjb21tb25Sb290IiwicHJldlZhbHVlIiwibmV4dFZhbHVlIiwicG93IiwiZCIsInNvdXJjZXMiLCJjb3VudGVycyIsInN1bUJpdCIsInRlbXBEaWdpdCIsImR1cCIsInJpZ2h0U2hpZnRfIiwibW9kSW50IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztBQUVBLElBQU1BLEtBQUtDLFFBQVEsUUFBUixDQUFYO0FBQ0EsSUFBTUMsYUFBYUQsUUFBUSxpQkFBUixDQUFuQjs7QUFFQTs7Ozs7SUFJTUUsUTtBQUNGOzs7OztBQUtBLHNCQUFhQyxJQUFiLEVBQWtDO0FBQUEsWUFBZkMsUUFBZSx1RUFBSixFQUFJOztBQUFBOztBQUM5QixhQUFLQyxLQUFMLEdBQWFGLElBQWI7QUFDQSxhQUFLRyxTQUFMLEdBQWlCRixRQUFqQjtBQUNIOzs7Ozs7QUFFRDs7Ozs7Ozs7Ozs7OzhCQVlPRyxDLEVBQUdDLEMsRUFBR0MsSyxFQUFPQyxRLEVBQVVDLEMsRUFBR0MsQyxFQUFHO0FBQ2hDLGdCQUFJQyxRQUFRTixDQUFaO0FBQUEsZ0JBQWVPLFFBQVFOLENBQXZCO0FBQUEsZ0JBQ0lPLE9BQU9DLEtBQUtDLEdBQUwsQ0FBUyxLQUFLWCxTQUFkLEVBQXlCSSxRQUF6QixDQURYO0FBQUEsZ0JBQytDO0FBQzNDUSxvQkFBUW5CLEdBQUdvQixVQUFILENBQWMsQ0FBZCxFQUFpQixLQUFLZCxLQUFMLENBQVdlLFNBQVgsQ0FBcUJYLEtBQXJCLENBQWpCLENBRlo7QUFBQSxnQkFHSVksY0FISjs7QUFLQTtBQUNBLGlCQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsS0FBS2IsS0FBckIsRUFBNEIsRUFBRWEsQ0FBOUIsRUFBaUM7QUFDcENELHdCQUFTZCxLQUFLQSxFQUFFZ0IsQ0FBRixDQUFJaEIsQ0FBVixJQUFnQixDQUF4QjtBQUNPUixtQkFBR3lCLE9BQUgsQ0FBV04sS0FBWCxFQUFrQkcsS0FBbEI7QUFDQSxvQkFBSUMsTUFBTWIsS0FBVixFQUFpQjtBQUNiVix1QkFBRzBCLFVBQUgsQ0FBY1AsS0FBZCxFQUFxQixLQUFLYixLQUFMLENBQVdxQixVQUFYLENBQXNCSixJQUFJLENBQTFCLENBQXJCO0FBQ0g7QUFDRGYsb0JBQUtBLEtBQUssQ0FBQ0EsRUFBRW9CLE1BQVIsSUFBa0JwQixFQUFFcUIsS0FBckIsSUFBK0IsSUFBbkM7QUFDSDtBQUNEO0FBQ0E7QUFDQTdCLGVBQUd5QixPQUFILENBQVdOLEtBQVgsRUFBa0JGLEtBQUthLEtBQUwsQ0FBV2IsS0FBS2MsTUFBTCxLQUFnQmYsSUFBaEIsR0FBdUIsQ0FBbEMsQ0FBbEI7QUFDQTtBQUNBLG1CQUFPLEtBQUtnQixNQUFMLENBQVliLEtBQVosRUFBbUJMLEtBQW5CLEVBQTBCQyxLQUExQixFQUFpQ0wsS0FBakMsRUFBd0NFLENBQXhDLEVBQTJDQyxDQUEzQyxDQUFQO0FBQ0g7Ozs7O0FBSUQ7Ozs7Ozs7Ozs7OytCQVdRTCxDLEVBQUdDLEMsRUFBR0MsSyxFQUFPQyxRLEVBQVVDLEMsRUFBR0MsQyxFQUFHO0FBQ2pDLGdCQUFJQyxRQUFRTixDQUFaO0FBQUEsZ0JBQWVPLFFBQVFOLENBQXZCO0FBQUEsZ0JBQ0lPLE9BQU9DLEtBQUtDLEdBQUwsQ0FBUyxLQUFLWCxTQUFkLEVBQXlCSSxRQUF6QixDQURYO0FBQUEsZ0JBQzhDO0FBQzFDUSxvQkFBUW5CLEdBQUdvQixVQUFILENBQWMsQ0FBZCxFQUFpQixLQUFLZCxLQUFMLENBQVdlLFNBQVgsQ0FBcUJYLEtBQXJCLENBQWpCLENBRlo7QUFBQSxnQkFHSXVCLGFBQWEsS0FIakI7QUFBQSxnQkFHd0JDLGFBQWEsSUFIckM7QUFBQSxnQkFJSUMsa0JBSko7QUFBQSxnQkFJZUMsa0JBSmY7O0FBTUE7QUFDQSxpQkFBSyxJQUFJYixJQUFJLENBQWIsRUFBZ0JBLEtBQUtiLEtBQXJCLEVBQTRCLEVBQUVhLENBQTlCLEVBQWlDO0FBQzdCWSw0QkFBYTNCLEtBQUtBLEVBQUVnQixDQUFGLENBQUloQixDQUFWLElBQWdCLENBQTVCO0FBQ0E0Qiw0QkFBYTNCLEtBQUtBLEVBQUVlLENBQUYsQ0FBSWhCLENBQVYsSUFBZ0IsQ0FBNUI7O0FBRUEsb0JBQUkwQixjQUFjQyxjQUFjQyxTQUFoQyxFQUEyQztBQUN2Q0YsaUNBQWEsS0FBYjtBQUNBRCxpQ0FBYUUsWUFBWUMsU0FBekI7QUFDSDtBQUNELG9CQUFJSCxVQUFKLEVBQWdCO0FBQ1pHLGdDQUFZbkIsS0FBS29CLEdBQUwsQ0FBUyxDQUFULEVBQVcsS0FBSy9CLEtBQUwsQ0FBV3FCLFVBQVgsQ0FBc0JKLENBQXRCLENBQVgsSUFBcUMsQ0FBakQ7QUFDSDtBQUNEdkIsbUJBQUd5QixPQUFILENBQVdOLEtBQVgsRUFBa0JpQixTQUFsQjtBQUNBLG9CQUFJYixNQUFNYixLQUFWLEVBQWlCO0FBQ2JWLHVCQUFHMEIsVUFBSCxDQUFjUCxLQUFkLEVBQW9CLEtBQUtiLEtBQUwsQ0FBV3FCLFVBQVgsQ0FBc0JKLElBQUUsQ0FBeEIsQ0FBcEI7QUFDSDs7QUFFRGQsb0JBQUtBLEtBQUssQ0FBQ0EsRUFBRW1CLE1BQVIsSUFBa0JuQixFQUFFb0IsS0FBckIsSUFBK0IsSUFBbkM7QUFDQXJCLG9CQUFLQSxLQUFLLENBQUNBLEVBQUVvQixNQUFSLElBQWtCcEIsRUFBRXFCLEtBQXJCLElBQStCLElBQW5DO0FBQ0g7O0FBRUQ7QUFDQTtBQUNBLGdCQUFJSSxVQUFKLEVBQWdCO0FBQ1pqQyxtQkFBR3lCLE9BQUgsQ0FBV04sS0FBWCxFQUFrQixDQUFDRixLQUFLYSxLQUFMLENBQVdiLEtBQUtjLE1BQUwsS0FBY2YsSUFBekIsQ0FBbkI7QUFDSCxhQUZELE1BRU87QUFDSGhCLG1CQUFHeUIsT0FBSCxDQUFXTixLQUFYLEVBQWtCLENBQUNGLEtBQUthLEtBQUwsQ0FBV2IsS0FBS2MsTUFBTCxLQUFjZixJQUF6QixDQUFELEdBQWdDLENBQWxEO0FBQ0g7O0FBRUQ7QUFDQSxtQkFBTyxLQUFLZ0IsTUFBTCxDQUFZYixLQUFaLEVBQW1CTCxLQUFuQixFQUEwQkMsS0FBMUIsRUFBaUNMLEtBQWpDLEVBQXdDRSxDQUF4QyxFQUEyQ0MsQ0FBM0MsQ0FBUDtBQUNIOzs7OztBQUVEOzs7Ozs7Ozs7OzsrQkFXUXlCLEMsRUFBRzlCLEMsRUFBR0MsQyxFQUFHQyxLLEVBQU9FLEMsRUFBR0MsQyxFQUFHO0FBQzFCLGdCQUFJMEIsVUFBVSxFQUFkO0FBQUEsZ0JBQWtCQyxXQUFXLEVBQTdCO0FBQUEsZ0JBQ0lqQixJQUFJLENBRFI7QUFBQSxnQkFFSWtCLFNBQVMsS0FBS25DLEtBQUwsQ0FBV2UsU0FBWCxDQUFxQlgsS0FBckIsQ0FGYjtBQUFBLGdCQUdJZ0Msa0JBSEo7QUFBQSxnQkFHZXBCLGNBSGY7O0FBS0EsbUJBQU9DLEtBQUtiLEtBQVosRUFBbUI7QUFDZmdDLDRCQUFZMUMsR0FBRzJDLEdBQUgsQ0FBT0wsQ0FBUCxDQUFaO0FBQ0F0QyxtQkFBRzRDLFdBQUgsQ0FBZUYsU0FBZixFQUEwQkQsU0FBUyxLQUFLbkMsS0FBTCxDQUFXZSxTQUFYLENBQXFCRSxDQUFyQixDQUFuQztBQUNBRCx3QkFBUXRCLEdBQUc2QyxNQUFILENBQVVILFNBQVYsRUFBcUJ6QixLQUFLb0IsR0FBTCxDQUFTLENBQVQsRUFBWSxLQUFLL0IsS0FBTCxDQUFXcUIsVUFBWCxDQUFzQkosQ0FBdEIsQ0FBWixDQUFyQixDQUFSO0FBQ0FnQix3QkFBUWhCLENBQVIsSUFBV1gsQ0FBWDtBQUNBNEIseUJBQVNqQixDQUFULElBQVlWLENBQVo7O0FBRUEsb0JBQUlKLEtBQUtBLEVBQUVlLENBQUYsQ0FBSWhCLENBQUosS0FBVWMsS0FBbkIsRUFBMEI7QUFBRWlCLDRCQUFRaEIsQ0FBUixJQUFXZCxFQUFFZSxDQUFGLENBQUlaLENBQWYsQ0FBa0I0QixTQUFTakIsQ0FBVCxJQUFZZCxFQUFFZSxDQUFGLENBQUlYLENBQWhCO0FBQW9CO0FBQ2xFLG9CQUFJTCxLQUFLQSxFQUFFZ0IsQ0FBRixDQUFJaEIsQ0FBSixLQUFVYyxLQUFuQixFQUEwQjtBQUFFaUIsNEJBQVFoQixDQUFSLElBQVdmLEVBQUVnQixDQUFGLENBQUlaLENBQWYsQ0FBa0I0QixTQUFTakIsQ0FBVCxJQUFZZixFQUFFZ0IsQ0FBRixDQUFJWCxDQUFoQjtBQUFvQjs7QUFFbEVKLG9CQUFLQSxLQUFLLENBQUNBLEVBQUVtQixNQUFSLElBQWtCbkIsRUFBRW9CLEtBQXJCLElBQStCLElBQW5DO0FBQ0FyQixvQkFBS0EsS0FBSyxDQUFDQSxFQUFFb0IsTUFBUixJQUFrQnBCLEVBQUVxQixLQUFyQixJQUErQixJQUFuQzs7QUFFQSxrQkFBRU4sQ0FBRjtBQUNIOztBQUVELG1CQUFPLElBQUlyQixVQUFKLENBQWUsS0FBS0ksS0FBcEIsRUFBMkJnQyxDQUEzQixFQUE4QkMsT0FBOUIsRUFBdUNDLFFBQXZDLENBQVA7QUFDSDs7Ozs7O0FBRUo7O0FBRURNLE9BQU9DLE9BQVAsR0FBaUI1QyxRQUFqQiIsImZpbGUiOiJzdHJhdGVneS5qcyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuY29uc3QgQkkgPSByZXF1aXJlKCdCaWdJbnQnKTtcbmNvbnN0IElkZW50aWZpZXIgPSByZXF1aXJlKCcuL2lkZW50aWZpZXIuanMnKTtcblxuLyoqXG4gKiBFbnVtZXJhdGUgdGhlIGF2YWlsYWJsZSBzdWItYWxsb2NhdGlvbiBzdHJhdGVnaWVzLiBUaGUgc2lnbmF0dXJlIG9mIHRoZXNlXG4gKiBmdW5jdGlvbnMgaXMgZihJZCwgSWQsIE4rLCBOKywgTiwgTik6IElkLlxuICovXG5jbGFzcyBTdHJhdGVneSB7ICAgIFxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7QmFzZX0gYmFzZSBUaGUgYmFzZSB1c2VkIHRvIGNyZWF0ZSB0aGUgbmV3IGlkZW50aWZpZXJzLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbYm91bmRhcnkgPSAxMF0gVGhlIHZhbHVlIHVzZWQgYXMgdGhlIGRlZmF1bHQgbWF4aW11bVxuICAgICAqIHNwYWNpbmcgYmV0d2VlbiBpZGVudGlmaWVycy5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvciAoYmFzZSwgYm91bmRhcnkgPSAxMCkge1xuICAgICAgICB0aGlzLl9iYXNlID0gYmFzZTtcbiAgICAgICAgdGhpcy5fYm91bmRhcnkgPSBib3VuZGFyeTtcbiAgICB9O1xuICAgIFxuICAgIC8qKlxuICAgICAqIENob29zZSBhbiBpZGVudGlmaWVyIHN0YXJ0aW5nIGZyb20gcHJldmlvdXMgYm91bmQgYW5kIGFkZGluZyByYW5kb21cbiAgICAgKiBudW1iZXIuXG4gICAgICogQHBhcmFtIHtMU2VxTm9kZX0gcCBUaGUgcHJldmlvdXMgaWRlbnRpZmllci5cbiAgICAgKiBAcGFyYW0ge0xTZXFOb2RlfSBxIFRoZSBuZXh0IGlkZW50aWZpZXIuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGxldmVsIFRoZSBudW1iZXIgb2YgY29uY2F0ZW5hdGlvbiBjb21wb3NpbmcgdGhlIG5ld1xuICAgICAqIGlkZW50aWZpZXIuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGludGVydmFsIFRoZSBpbnRlcnZhbCBiZXR3ZWVuIHAgYW5kIHEuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHMgVGhlIHNvdXJjZSB0aGF0IGNyZWF0ZXMgdGhlIG5ldyBpZGVudGlmaWVyLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBjIFRoZSBjb3VudGVyIG9mIHRoYXQgc291cmNlLlxuICAgICAqIEByZXR1cm4ge0lkZW50aWZpZXJ9IFRoZSBuZXcgYWxsb2NhdGVkIGlkZW50aWZpZXIuXG4gICAgICovXG4gICAgYlBsdXMgKHAsIHEsIGxldmVsLCBpbnRlcnZhbCwgcywgYykge1xuICAgICAgICBsZXQgY29weVAgPSBwLCBjb3B5USA9IHEsXG4gICAgICAgICAgICBzdGVwID0gTWF0aC5taW4odGhpcy5fYm91bmRhcnksIGludGVydmFsKSwgLy8jMCB0aGUgbWluIGludGVydmFsXG4gICAgICAgICAgICBkaWdpdCA9IEJJLmludDJiaWdJbnQoMCwgdGhpcy5fYmFzZS5nZXRTdW1CaXQobGV2ZWwpKSxcbiAgICAgICAgICAgIHZhbHVlO1xuICAgICAgICBcbiAgICAgICAgLy8gIzEgY29weSB0aGUgcHJldmlvdXMgaWRlbnRpZmllclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBsZXZlbDsgKytpKSB7XG5cdCAgICB2YWx1ZSA9IChwICYmIHAudC5wKSB8fCAwO1xuICAgICAgICAgICAgQkkuYWRkSW50XyhkaWdpdCwgdmFsdWUpO1xuICAgICAgICAgICAgaWYgKGkgIT09IGxldmVsKSB7XG4gICAgICAgICAgICAgICAgQkkubGVmdFNoaWZ0XyhkaWdpdCwgdGhpcy5fYmFzZS5nZXRCaXRCYXNlKGkgKyAxKSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcCA9IChwICYmICFwLmlzTGVhZiAmJiBwLmNoaWxkKSB8fCBudWxsO1xuICAgICAgICB9O1xuICAgICAgICAvLyAjMiBjcmVhdGUgYSBkaWdpdCBmb3IgYW4gaWRlbnRpZmllciBieSBhZGRpbmcgYSByYW5kb20gdmFsdWVcbiAgICAgICAgLy8gI0EgRGlnaXRcbiAgICAgICAgQkkuYWRkSW50XyhkaWdpdCwgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogc3RlcCArIDEpKTtcbiAgICAgICAgLy8gI0IgU291cmNlICYgY291bnRlclxuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0U0MoZGlnaXQsIGNvcHlQLCBjb3B5USwgbGV2ZWwsIHMsIGMpO1xuICAgIH07XG5cblxuICAgIFxuICAgIC8qKlxuICAgICAqIENob29zZSBhbiBpZGVudGlmaWVyIHN0YXJ0aW5nIGZyb20gbmV4dCBib3VuZCBhbmQgc3Vic3RyYWN0IGEgcmFuZG9tXG4gICAgICogbnVtYmVyLlxuICAgICAqIEBwYXJhbSB7TFNlcU5vZGV9IHAgVGhlIHByZXZpb3VzIGlkZW50aWZpZXIuXG4gICAgICogQHBhcmFtIHtMU2VxTm9kZX0gcSBUaGUgbmV4dCBpZGVudGlmaWVyLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBsZXZlbCBUaGUgbnVtYmVyIG9mIGNvbmNhdGVuYXRpb24gY29tcG9zaW5nIHRoZSBuZXdcbiAgICAgKiBpZGVudGlmaWVyLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbnRlcnZhbCBUaGUgaW50ZXJ2YWwgYmV0d2VlbiBwIGFuZCBxLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzIFRoZSBzb3VyY2UgdGhhdCBjcmVhdGVzIHRoZSBuZXcgaWRlbnRpZmllci5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gYyBUaGUgY291bnRlciBvZiB0aGF0IHNvdXJjZS5cbiAgICAgKi9cbiAgICBiTWludXMgKHAsIHEsIGxldmVsLCBpbnRlcnZhbCwgcywgYykge1xuICAgICAgICBsZXQgY29weVAgPSBwLCBjb3B5USA9IHEsXG4gICAgICAgICAgICBzdGVwID0gTWF0aC5taW4odGhpcy5fYm91bmRhcnksIGludGVydmFsKSwvLyAjMCBwcm9jZXNzIG1pbiBpbnRlcnZhbFxuICAgICAgICAgICAgZGlnaXQgPSBCSS5pbnQyYmlnSW50KDAsIHRoaXMuX2Jhc2UuZ2V0U3VtQml0KGxldmVsKSksXG4gICAgICAgICAgICBwSXNHcmVhdGVyID0gZmFsc2UsIGNvbW1vblJvb3QgPSB0cnVlLFxuICAgICAgICAgICAgcHJldlZhbHVlLCBuZXh0VmFsdWU7XG4gICAgICAgIFxuICAgICAgICAvLyAjMSBjb3B5IG5leHQsIGlmIHByZXZpb3VzIGlzIGdyZWF0ZXIsIGNvcHkgbWF4VmFsdWUgQCBkZXB0aFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSBsZXZlbDsgKytpKSB7XG4gICAgICAgICAgICBwcmV2VmFsdWUgPSAocCAmJiBwLnQucCkgfHwgMDtcbiAgICAgICAgICAgIG5leHRWYWx1ZSA9IChxICYmIHEudC5wKSB8fCAwO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoY29tbW9uUm9vdCAmJiBwcmV2VmFsdWUgIT09IG5leHRWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGNvbW1vblJvb3QgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBwSXNHcmVhdGVyID0gcHJldlZhbHVlID4gbmV4dFZhbHVlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmIChwSXNHcmVhdGVyKSB7XG4gICAgICAgICAgICAgICAgbmV4dFZhbHVlID0gTWF0aC5wb3coMix0aGlzLl9iYXNlLmdldEJpdEJhc2UoaSkpLTE7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgQkkuYWRkSW50XyhkaWdpdCwgbmV4dFZhbHVlKTtcbiAgICAgICAgICAgIGlmIChpICE9PSBsZXZlbCkge1xuICAgICAgICAgICAgICAgIEJJLmxlZnRTaGlmdF8oZGlnaXQsdGhpcy5fYmFzZS5nZXRCaXRCYXNlKGkrMSkpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcSA9IChxICYmICFxLmlzTGVhZiAmJiBxLmNoaWxkKSB8fCBudWxsO1xuICAgICAgICAgICAgcCA9IChwICYmICFwLmlzTGVhZiAmJiBwLmNoaWxkKSB8fCBudWxsO1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgLy8gIzMgY3JlYXRlIGEgZGlnaXQgZm9yIGFuIGlkZW50aWZpZXIgYnkgc3ViaW5nIGEgcmFuZG9tIHZhbHVlXG4gICAgICAgIC8vICNBIERpZ2l0XG4gICAgICAgIGlmIChwSXNHcmVhdGVyKSB7XG4gICAgICAgICAgICBCSS5hZGRJbnRfKGRpZ2l0LCAtTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKnN0ZXApICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBCSS5hZGRJbnRfKGRpZ2l0LCAtTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKnN0ZXApLTEgKTtcbiAgICAgICAgfTtcbiAgICBcbiAgICAgICAgLy8gI0IgU291cmNlICYgY291bnRlclxuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0U0MoZGlnaXQsIGNvcHlQLCBjb3B5USwgbGV2ZWwsIHMsIGMpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDb3BpZXMgdGhlIGFwcHJvcHJpYXRlcyBzb3VyY2UgYW5kIGNvdW50ZXIgZnJvbSB0aGUgYWRqYWNlbnQgaWRlbnRpZmllcnNcbiAgICAgKiBhdCB0aGUgaW5zZXJ0aW9uIHBvc2l0aW9uLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBkIFRoZSBkaWdpdCBwYXJ0IG9mIHRoZSBuZXcgaWRlbnRpZmllci5cbiAgICAgKiBAcGFyYW0ge0xTZXFOb2RlfSBwIFRoZSBwcmV2aW91cyBpZGVudGlmaWVyLlxuICAgICAqIEBwYXJhbSB7TFNlcU5vZGV9IHEgdGhlIG5leHQgaWRlbnRpZmllci5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbGV2ZWwgVGhlIHNpemUgb2YgdGhlIG5ldyBpZGVudGlmaWVyLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzIFRoZSBsb2NhbCBzaXRlIGlkZW50aWZpZXIuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGMgVGhlIGxvY2FsIG1vbm90b25pYyBjb3VudGVyLlxuICAgICAqIEByZXR1cm4ge0lkZW50aWZpZXJ9IFRoZSBuZXcgYWxsb2NhdGVkIGlkZW50aWZpZXIuXG4gICAgICovXG4gICAgX2dldFNDIChkLCBwLCBxLCBsZXZlbCwgcywgYykge1xuICAgICAgICBsZXQgc291cmNlcyA9IFtdLCBjb3VudGVycyA9IFtdLFxuICAgICAgICAgICAgaSA9IDAsXG4gICAgICAgICAgICBzdW1CaXQgPSB0aGlzLl9iYXNlLmdldFN1bUJpdChsZXZlbCksXG4gICAgICAgICAgICB0ZW1wRGlnaXQsIHZhbHVlO1xuICAgICAgICBcbiAgICAgICAgd2hpbGUgKGkgPD0gbGV2ZWwpIHtcbiAgICAgICAgICAgIHRlbXBEaWdpdCA9IEJJLmR1cChkKTtcbiAgICAgICAgICAgIEJJLnJpZ2h0U2hpZnRfKHRlbXBEaWdpdCwgc3VtQml0IC0gdGhpcy5fYmFzZS5nZXRTdW1CaXQoaSkpO1xuICAgICAgICAgICAgdmFsdWUgPSBCSS5tb2RJbnQodGVtcERpZ2l0LCBNYXRoLnBvdygyLCB0aGlzLl9iYXNlLmdldEJpdEJhc2UoaSkpKTtcbiAgICAgICAgICAgIHNvdXJjZXNbaV09cztcbiAgICAgICAgICAgIGNvdW50ZXJzW2ldPWM7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChxICYmIHEudC5wID09PSB2YWx1ZSkgeyBzb3VyY2VzW2ldPXEudC5zOyBjb3VudGVyc1tpXT1xLnQuYzsgfTtcbiAgICAgICAgICAgIGlmIChwICYmIHAudC5wID09PSB2YWx1ZSkgeyBzb3VyY2VzW2ldPXAudC5zOyBjb3VudGVyc1tpXT1wLnQuYzsgfTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcSA9IChxICYmICFxLmlzTGVhZiAmJiBxLmNoaWxkKSB8fCBudWxsO1xuICAgICAgICAgICAgcCA9IChwICYmICFwLmlzTGVhZiAmJiBwLmNoaWxkKSB8fCBudWxsO1xuXG4gICAgICAgICAgICArK2k7XG4gICAgICAgIH07XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbmV3IElkZW50aWZpZXIodGhpcy5fYmFzZSwgZCwgc291cmNlcywgY291bnRlcnMpO1xuICAgIH07XG4gICAgXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0cmF0ZWd5O1xuIl19
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRyaXBsZS5qcyJdLCJuYW1lcyI6WyJUcmlwbGUiLCJwYXRoIiwic2l0ZSIsImNvdW50ZXIiLCJwIiwicyIsImMiLCJvIiwiTnVtYmVyIiwiTUFYX1ZBTFVFIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6IkFBQUE7O0FBRUE7Ozs7Ozs7OztJQUlNQSxNOztBQUVGOzs7Ozs7O0FBT0Esb0JBQWFDLElBQWIsRUFBbUJDLElBQW5CLEVBQXlCQyxPQUF6QixFQUFrQztBQUFBOztBQUM5QixhQUFLQyxDQUFMLEdBQVNILElBQVQ7QUFDQSxhQUFLSSxDQUFMLEdBQVNILElBQVQ7QUFDQSxhQUFLSSxDQUFMLEdBQVNILE9BQVQ7QUFDSDs7Ozs7O0FBRUQ7Ozs7OztrQ0FNV0ksQyxFQUFHO0FBQ1Y7QUFDQSxnQkFBSSxLQUFLRixDQUFMLEtBQVdHLE9BQU9DLFNBQWxCLElBQStCLEtBQUtILENBQUwsS0FBV0UsT0FBT0MsU0FBckQsRUFBK0Q7QUFDM0QsdUJBQU8sQ0FBUDtBQUNIO0FBQ0QsZ0JBQUlGLEVBQUVGLENBQUYsS0FBUUcsT0FBT0MsU0FBZixJQUE0QkYsRUFBRUYsQ0FBRixLQUFRRyxPQUFPQyxTQUEvQyxFQUF5RDtBQUNyRCx1QkFBTyxDQUFDLENBQVI7QUFDSDtBQUNEO0FBQ0EsZ0JBQUksS0FBS0wsQ0FBTCxHQUFTRyxFQUFFSCxDQUFmLEVBQWtCO0FBQUUsdUJBQU8sQ0FBQyxDQUFSO0FBQVc7QUFDL0IsZ0JBQUksS0FBS0EsQ0FBTCxHQUFTRyxFQUFFSCxDQUFmLEVBQWtCO0FBQUUsdUJBQU8sQ0FBUDtBQUFXO0FBQy9CLGdCQUFJLEtBQUtDLENBQUwsR0FBU0UsRUFBRUYsQ0FBZixFQUFrQjtBQUFFLHVCQUFPLENBQUMsQ0FBUjtBQUFXO0FBQy9CLGdCQUFJLEtBQUtBLENBQUwsR0FBU0UsRUFBRUYsQ0FBZixFQUFrQjtBQUFFLHVCQUFPLENBQVA7QUFBVztBQUMvQixnQkFBSSxLQUFLQyxDQUFMLEdBQVNDLEVBQUVELENBQWYsRUFBa0I7QUFBRSx1QkFBTyxDQUFDLENBQVI7QUFBVztBQUMvQixnQkFBSSxLQUFLQSxDQUFMLEdBQVNDLEVBQUVELENBQWYsRUFBa0I7QUFBRSx1QkFBTyxDQUFQO0FBQVc7QUFDL0I7QUFDQSxtQkFBTyxDQUFQO0FBQ0g7Ozs7OztBQUNKOztBQUVESSxPQUFPQyxPQUFQLEdBQWlCWCxNQUFqQiIsImZpbGUiOiJ0cmlwbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVHJpcGxlIHRoYXQgY29udGFpbnMgPHBhdGg7IHNpdGU7IGNvdW50ZXI+LiBJZGVudGlmaWVycyBvZiBMU0VRIGFyZSBsaXN0cyBvZlxuICogdHJpcGxlcy5cbiAqL1xuY2xhc3MgVHJpcGxlIHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBwYXRoIFRoZSBwYXJ0IG9mIHRoZSBwYXRoIGluIHRoZSB0cmVlLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfFN0cmluZ30gc2l0ZSBUaGUgdW5pcXVlIHNpdGUgaWRlbnRpZmllciB0aGF0IGNyZWF0ZWQgdGhlXG4gICAgICogdHJpcGxlLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBjb3VudGVyIFRoZSBsb2NhbCBjb3VudGVyIG9mIHRoZSBzaXRlIHdoZW4gaXQgY3JlYXRlZCB0aGVcbiAgICAgKiB0cmlwbGUuXG4gICAgICovICAgICAgIFxuICAgIGNvbnN0cnVjdG9yIChwYXRoLCBzaXRlLCBjb3VudGVyKSB7XG4gICAgICAgIHRoaXMucCA9IHBhdGg7XG4gICAgICAgIHRoaXMucyA9IHNpdGU7XG4gICAgICAgIHRoaXMuYyA9IGNvdW50ZXI7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENvbXBhcmUgdHdvIHRyaXBsZXMgcHJpb3JpdGl6aW5nIHRoZSBwYXRoLCB0aGVuIHNpdGUsIHRoZW4gY291bnRlci5cbiAgICAgKiBAcGFyYW0ge1RyaXBsZX0gbyB0aGUgb3RoZXIgdHJpcGxlIHRvIGNvbXBhcmUgLlxuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9IC0xIGlmIHRoaXMgaXMgbG93ZXIgdGhhbiBvLCAxIGlmIHRoaXMgaXMgZ3JlYXRlciB0aGFuXG4gICAgICogbywgMCBvdGhlcndpc2UuXG4gICAgICovXG4gICAgY29tcGFyZVRvIChvKSB7XG4gICAgICAgIC8vICMxIHByb2Nlc3MgbWF4aW1hbCB2aXJ0dWFsIGJvdW5kc1xuICAgICAgICBpZiAodGhpcy5zID09PSBOdW1iZXIuTUFYX1ZBTFVFICYmIHRoaXMuYyA9PT0gTnVtYmVyLk1BWF9WQUxVRSl7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKG8ucyA9PT0gTnVtYmVyLk1BWF9WQUxVRSAmJiBvLnMgPT09IE51bWJlci5NQVhfVkFMVUUpe1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9O1xuICAgICAgICAvLyAjMiBjb21wYXJlIHAgdGhlbiBzIHRoZW4gY1xuICAgICAgICBpZiAodGhpcy5wIDwgby5wKSB7IHJldHVybiAtMTt9O1xuICAgICAgICBpZiAodGhpcy5wID4gby5wKSB7IHJldHVybiAxIDt9O1xuICAgICAgICBpZiAodGhpcy5zIDwgby5zKSB7IHJldHVybiAtMTt9O1xuICAgICAgICBpZiAodGhpcy5zID4gby5zKSB7IHJldHVybiAxIDt9O1xuICAgICAgICBpZiAodGhpcy5jIDwgby5jKSB7IHJldHVybiAtMTt9O1xuICAgICAgICBpZiAodGhpcy5jID4gby5jKSB7IHJldHVybiAxIDt9O1xuICAgICAgICAvLyAjMyB0aGV5IGFyZSBlcXVhbFxuICAgICAgICByZXR1cm4gMDtcbiAgICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBUcmlwbGU7XG4iXX0=
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxzZXF0cmVlLmpzIl0sIm5hbWVzIjpbIm1lcmdlIiwicmVxdWlyZSIsIkJhc2UiLCJTdHJhdGVneSIsIklkZW50aWZpZXIiLCJUcmlwbGUiLCJMU2VxTm9kZSIsIkV4T3V0T2ZCb3VuZHMiLCJMU2VxVHJlZSIsInNpdGUiLCJvcHRpb25zIiwibGlzdFRyaXBsZSIsImJvdW5kYXJ5IiwiYmFzZSIsIl9zIiwiX2MiLCJfaGFzaCIsImRlcHRoIiwiX2Jhc2UiLCJfc3RyYXRlZ3kiLCJyb290IiwiYWRkIiwiTWF0aCIsInBvdyIsImdldEJpdEJhc2UiLCJOdW1iZXIiLCJNQVhfVkFMVUUiLCJpbmRleCIsImxlbmd0aCIsIm5vZGUiLCJnZXQiLCJpc0xlYWYiLCJjaGlsZCIsImUiLCJlbGVtZW50IiwicGVpIiwiX2dldCIsInFlaSIsImlkIiwiYWxsb2MiLCJwYWlyIiwiZWxlbSIsImFwcGx5SW5zZXJ0IiwiZWkiLCJpIiwiZnJvbU5vZGUiLCJhcHBseVJlbW92ZSIsInAiLCJxIiwiaW50ZXJ2YWwiLCJsZXZlbCIsImdldEludGVydmFsIiwiYlBsdXMiLCJiTWludXMiLCJub0luZGV4IiwicmVzdWx0IiwiX2QiLCJ0b05vZGUiLCJ0IiwiY2hpbGRyZW4iLCJmcm9tSlNPTiIsImluZGV4T2YiLCJwb3NpdGlvbiIsImRlbCIsIm9iamVjdCIsIl9ib3VuZGFyeSIsImRlcHRoRmlyc3QiLCJjdXJyZW50Tm9kZSIsImN1cnJlbnRQYXRoIiwidHJpcGxlIiwicyIsImMiLCJwdXNoIiwic2xpY2UiLCJwb3AiLCJzdWJDb3VudGVyIiwiX2hhc0VsZW1lbnQiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0FBRUEsSUFBTUEsUUFBUUMsUUFBUSxjQUFSLENBQWQ7O0FBRUEsSUFBTUMsT0FBT0QsUUFBUSxXQUFSLENBQWI7QUFDQSxJQUFNRSxXQUFXRixRQUFRLGVBQVIsQ0FBakI7QUFDQSxJQUFNRyxhQUFhSCxRQUFRLGlCQUFSLENBQW5CO0FBQ0EsSUFBTUksU0FBU0osUUFBUSxhQUFSLENBQWY7QUFDQSxJQUFNSyxXQUFXTCxRQUFRLGVBQVIsQ0FBakI7O0FBRUEsSUFBTU0sZ0JBQWdCTixRQUFRLG9CQUFSLENBQXRCOztBQUdBOzs7OztJQUlNTyxROztBQUVGOzs7Ozs7OztBQVFBLHNCQUFhQyxJQUFiLEVBQWlDO0FBQUEsWUFBZEMsT0FBYyx1RUFBSixFQUFJOztBQUFBOztBQUM3QixZQUFJQyxtQkFBSjtBQUNBO0FBQ0EsYUFBS0QsT0FBTCxHQUFlVixNQUFNLEVBQUVZLFVBQVUsRUFBWixFQUFnQkMsTUFBTSxFQUF0QixFQUFOLEVBQWtDSCxPQUFsQyxDQUFmOztBQUVBO0FBQ0EsYUFBS0ksRUFBTCxHQUFVTCxJQUFWO0FBQ0EsYUFBS00sRUFBTCxHQUFVLENBQVY7QUFDQSxhQUFLQyxLQUFMLEdBQWEsVUFBQ0MsS0FBRDtBQUFBLG1CQUFXQSxRQUFNLENBQWpCO0FBQUEsU0FBYjs7QUFFQSxhQUFLQyxLQUFMLEdBQWEsSUFBSWhCLElBQUosQ0FBUyxLQUFLUSxPQUFMLENBQWFHLElBQXRCLENBQWI7QUFDQSxhQUFLTSxTQUFMLEdBQWlCLElBQUloQixRQUFKLENBQWEsS0FBS2UsS0FBbEIsRUFBeUIsS0FBS1IsT0FBTCxDQUFhRSxRQUF0QyxDQUFqQjs7QUFFQTtBQUNBLGFBQUtRLElBQUwsR0FBWSxJQUFJZCxRQUFKLEVBQVo7QUFDQTtBQUNBLGFBQUtjLElBQUwsQ0FBVUMsR0FBVixDQUFjLElBQUlmLFFBQUosQ0FBYSxDQUFDLElBQUlELE1BQUosQ0FBVyxDQUFYLEVBQWEsQ0FBYixFQUFlLENBQWYsQ0FBRCxDQUFiLEVBQWtDLEVBQWxDLENBQWQ7QUFDQTtBQUNBLGFBQUtlLElBQUwsQ0FBVUMsR0FBVixDQUNJLElBQUlmLFFBQUosQ0FBYSxDQUFDLElBQUlELE1BQUosQ0FBV2lCLEtBQUtDLEdBQUwsQ0FBUyxDQUFULEVBQVksS0FBS0wsS0FBTCxDQUFXTSxVQUFYLENBQXNCLENBQXRCLENBQVosSUFBd0MsQ0FBbkQsRUFDV0MsT0FBT0MsU0FEbEIsRUFFV0QsT0FBT0MsU0FGbEIsQ0FBRCxDQUFiLEVBRTZDLEVBRjdDLENBREo7QUFJSDs7Ozs7O0FBU0Q7Ozs7Ozs7NEJBT0tDLEssRUFBTztBQUNSLGdCQUFJQSxRQUFRLENBQVIsSUFBYUEsU0FBUyxLQUFLQyxNQUEvQixFQUF1QztBQUNuQyxzQkFBTSxJQUFJckIsYUFBSixDQUFrQm9CLEtBQWxCLEVBQXlCLEtBQUtDLE1BQTlCLENBQU47QUFDSDs7QUFFRCxnQkFBSUMsT0FBTyxLQUFLVCxJQUFMLENBQVVVLEdBQVYsQ0FBY0gsUUFBUSxDQUF0QixDQUFYO0FBQ0EsbUJBQU8sQ0FBQ0UsS0FBS0UsTUFBYixFQUFvQjtBQUNoQkYsdUJBQU9BLEtBQUtHLEtBQVo7QUFDSDtBQUNELG1CQUFPSCxLQUFLSSxDQUFaO0FBQ0g7Ozs7O0FBRUQ7Ozs7Ozs7NkJBT01OLEssRUFBTztBQUNULGdCQUFJQSxRQUFRLENBQVIsSUFBYUEsU0FBUyxLQUFLQyxNQUFMLEdBQWMsQ0FBeEMsRUFBMkM7QUFBRTtBQUN6QyxzQkFBTSxJQUFJckIsYUFBSixDQUFrQm9CLEtBQWxCLEVBQXlCLEtBQUtDLE1BQUwsR0FBYyxDQUF2QyxDQUFOO0FBQ0g7O0FBRUQsbUJBQU8sS0FBS1IsSUFBTCxDQUFVVSxHQUFWLENBQWNILEtBQWQsQ0FBUDtBQUNIOzs7OztBQUVEOzs7Ozs7OytCQU9RTyxPLEVBQVNQLEssRUFBTztBQUNwQixnQkFBTVEsTUFBTSxLQUFLQyxJQUFMLENBQVVULEtBQVYsQ0FBWjtBQUFBLGdCQUE4QjtBQUN4QlUsa0JBQU0sS0FBS0QsSUFBTCxDQUFVVCxRQUFNLENBQWhCLENBRFosQ0FEb0IsQ0FFWTs7QUFFL0I7QUFDRCxpQkFBS1osRUFBTCxJQUFXLENBQVg7QUFDQTtBQUNBLGdCQUFNdUIsS0FBSyxLQUFLQyxLQUFMLENBQVdKLEdBQVgsRUFBZ0JFLEdBQWhCLENBQVg7O0FBRUE7QUFDQSxnQkFBTUcsT0FBTyxFQUFDQyxNQUFNUCxPQUFQLEVBQWdCSSxJQUFJQSxFQUFwQixFQUFiO0FBQ0EsaUJBQUtJLFdBQUwsQ0FBaUJGLElBQWpCO0FBQ0EsbUJBQU9BLElBQVA7QUFDSDs7Ozs7QUFFRDs7Ozs7K0JBS1FiLEssRUFBTztBQUNYLGdCQUFNZ0IsS0FBSyxLQUFLUCxJQUFMLENBQVVULFFBQVEsQ0FBbEIsQ0FBWDtBQUNBLGdCQUFNaUIsSUFBSSxJQUFJeEMsVUFBSixDQUFlLEtBQUtjLEtBQXBCLEVBQTJCMkIsUUFBM0IsQ0FBb0NGLEVBQXBDLENBQVY7QUFDQSxpQkFBS0csV0FBTCxDQUFpQkgsRUFBakI7QUFDQSxtQkFBT0MsQ0FBUDtBQUNIOzs7OztBQUdEOzs7Ozs7OEJBTU9HLEMsRUFBR0MsQyxFQUFHO0FBQ1QsZ0JBQUlDLFdBQVcsQ0FBZjtBQUFBLGdCQUFrQkMsUUFBUSxDQUExQjtBQUNBO0FBQ0EsbUJBQU9ELFlBQVksQ0FBbkIsRUFBc0I7QUFBRTtBQUNwQkEsMkJBQVcsS0FBSy9CLEtBQUwsQ0FBV2lDLFdBQVgsQ0FBdUJELEtBQXZCLEVBQThCSCxDQUE5QixFQUFpQ0MsQ0FBakMsQ0FBWDtBQUNBLGtCQUFFRSxLQUFGO0FBQ0g7QUFDREEscUJBQVMsQ0FBVDtBQUNBLGdCQUFJLEtBQUtsQyxLQUFMLENBQVdrQyxLQUFYLE1BQXNCLENBQTFCLEVBQTZCO0FBQ3pCLHVCQUFPLEtBQUsvQixTQUFMLENBQWVpQyxLQUFmLENBQXFCTCxDQUFyQixFQUF3QkMsQ0FBeEIsRUFDcUJFLEtBRHJCLEVBQzRCRCxRQUQ1QixFQUVxQixLQUFLbkMsRUFGMUIsRUFFOEIsS0FBS0MsRUFGbkMsQ0FBUDtBQUdILGFBSkQsTUFJTztBQUNILHVCQUFPLEtBQUtJLFNBQUwsQ0FBZWtDLE1BQWYsQ0FBc0JOLENBQXRCLEVBQXlCQyxDQUF6QixFQUNzQkUsS0FEdEIsRUFDNkJELFFBRDdCLEVBRXNCLEtBQUtuQyxFQUYzQixFQUUrQixLQUFLQyxFQUZwQyxDQUFQO0FBR0g7QUFDSjs7Ozs7QUFHRDs7Ozs7Ozs7Ozs7O29DQVlheUIsSSxFQUFzQjtBQUFBLGdCQUFoQmMsT0FBZ0IsdUVBQU4sSUFBTTs7QUFDL0IsZ0JBQUl6QixhQUFKO0FBQUEsZ0JBQVUwQixlQUFWO0FBQUEsZ0JBQWtCWCxVQUFsQjtBQUNBO0FBQ0E7QUFDQUEsZ0JBQUlKLEtBQUtGLEVBQVQ7QUFDQVQsbUJBQVFlLEtBQUtBLEVBQUVZLEVBQVAsSUFBYVosRUFBRTlCLEVBQWYsSUFBcUI4QixFQUFFN0IsRUFBdkIsSUFDSCxJQUFJWCxVQUFKLENBQWUsS0FBS2MsS0FBcEIsRUFBMkIwQixFQUFFWSxFQUE3QixFQUFpQ1osRUFBRTlCLEVBQW5DLEVBQXVDOEIsRUFBRTdCLEVBQXpDLEVBQTZDMEMsTUFBN0MsQ0FBb0RqQixLQUFLQyxJQUF6RCxDQURMO0FBRUE7QUFDQVosbUJBQVFlLEtBQUtBLEVBQUVjLENBQVAsSUFBWWQsRUFBRWUsUUFBZCxJQUEwQnJELFNBQVNzRCxRQUFULENBQWtCaEIsQ0FBbEIsQ0FBM0IsSUFBb0RmLElBQTNEO0FBQ0E7QUFDQTBCLHFCQUFTLEtBQUtuQyxJQUFMLENBQVVDLEdBQVYsQ0FBY1EsSUFBZCxDQUFUO0FBQ0E7QUFDQSxnQkFBSXlCLE9BQUosRUFBYTtBQUNULHVCQUFPQyxNQUFQO0FBQ0gsYUFGRCxNQUVPLElBQUlBLE1BQUosRUFBWTtBQUNmLHVCQUFPLEtBQUtuQyxJQUFMLENBQVV5QyxPQUFWLENBQWtCaEMsSUFBbEIsQ0FBUDtBQUNILGFBRk0sTUFFQTtBQUNILHVCQUFPLENBQUMsQ0FBUjtBQUNIO0FBQ0o7Ozs7O0FBRUQ7Ozs7OztvQ0FNYWUsQyxFQUFHO0FBQ1osZ0JBQUlmLGFBQUo7QUFBQSxnQkFBVWlDLGlCQUFWO0FBQ0E7QUFDQWpDLG1CQUFPZSxLQUFLQSxFQUFFWSxFQUFQLElBQWFaLEVBQUU5QixFQUFmLElBQXFCOEIsRUFBRTdCLEVBQXZCLElBQ0YsSUFBSVgsVUFBSixDQUFlLEtBQUtjLEtBQXBCLEVBQTJCMEIsRUFBRVksRUFBN0IsRUFBaUNaLEVBQUU5QixFQUFuQyxFQUF1QzhCLEVBQUU3QixFQUF6QyxDQUFELENBQStDMEMsTUFBL0MsQ0FBc0QsSUFBdEQsQ0FESjtBQUVBO0FBQ0E1QixtQkFBUWUsS0FBS0EsRUFBRWMsQ0FBUCxJQUFZZCxFQUFFZSxRQUFkLElBQTBCckQsU0FBU3NELFFBQVQsQ0FBa0JoQixDQUFsQixDQUEzQixJQUFvRGYsSUFBM0Q7QUFDQTtBQUNBaUMsdUJBQVcsS0FBSzFDLElBQUwsQ0FBVXlDLE9BQVYsQ0FBa0JoQyxJQUFsQixDQUFYO0FBQ0EsZ0JBQUlpQyxhQUFhLENBQUMsQ0FBbEIsRUFBb0I7QUFDaEI7QUFDQSxxQkFBSzFDLElBQUwsQ0FBVTJDLEdBQVYsQ0FBY2xDLElBQWQ7QUFDSDtBQUNELG1CQUFPaUMsUUFBUDtBQUNIOzs7OztBQUVEOzs7OztpQ0FLVUUsTSxFQUFRO0FBQUE7O0FBQ2Q7QUFDQSxpQkFBS2xELEVBQUwsR0FBVWtELE9BQU9sRCxFQUFqQjtBQUNBLGlCQUFLQyxFQUFMLEdBQVVpRCxPQUFPakQsRUFBakI7QUFDQSxpQkFBS0wsT0FBTCxHQUFlc0QsT0FBT3RELE9BQXRCOztBQUVBLGlCQUFLUSxLQUFMLEdBQWEsSUFBSWhCLElBQUosQ0FBUyxLQUFLUSxPQUFMLENBQWFHLElBQXRCLENBQWI7QUFDQSxpQkFBS29ELFNBQUwsR0FBaUIsSUFBSTlELFFBQUosQ0FBYSxLQUFLZSxLQUFsQixFQUF5QixLQUFLUixPQUFMLENBQWFFLFFBQXRDLENBQWpCOztBQUVBO0FBQ0EsZ0JBQU1zRCxhQUFhLFNBQWJBLFVBQWEsQ0FBQ0MsV0FBRCxFQUFjQyxXQUFkLEVBQThCO0FBQzdDLG9CQUFNQyxTQUFTLElBQUloRSxNQUFKLENBQVc4RCxZQUFZVCxDQUFaLENBQWNYLENBQXpCLEVBQ1dvQixZQUFZVCxDQUFaLENBQWNZLENBRHpCLEVBRVdILFlBQVlULENBQVosQ0FBY2EsQ0FGekIsQ0FBZjtBQUdBSCw0QkFBWUksSUFBWixDQUFpQkgsTUFBakIsRUFKNkMsQ0FJbkI7QUFDMUIsb0JBQUlGLFlBQVlsQyxDQUFaLEtBQWtCLElBQXRCLEVBQTRCO0FBQ3hCLDBCQUFLYixJQUFMLENBQVVDLEdBQVYsQ0FBYyxJQUFJZixRQUFKLENBQWE4RCxZQUFZSyxLQUFaLEVBQWIsRUFBa0NOLFlBQVlsQyxDQUE5QyxDQUFkO0FBQ0g7QUFDRCxxQkFBSyxJQUFJVyxJQUFJLENBQWIsRUFBZ0JBLElBQUl1QixZQUFZUixRQUFaLENBQXFCL0IsTUFBekMsRUFBaUQsRUFBRWdCLENBQW5ELEVBQXNEO0FBQ2xEc0IsK0JBQVdDLFlBQVlSLFFBQVosQ0FBcUJmLENBQXJCLENBQVgsRUFBb0N3QixXQUFwQztBQUNIO0FBQ0RBLDRCQUFZTSxHQUFaLEdBWDZDLENBVzFCO0FBQ3RCLGFBWkQ7QUFhQSxpQkFBSyxJQUFJOUIsSUFBSSxDQUFiLEVBQWdCQSxJQUFJb0IsT0FBTzVDLElBQVAsQ0FBWXVDLFFBQVosQ0FBcUIvQixNQUF6QyxFQUFpRCxFQUFFZ0IsQ0FBbkQsRUFBcUQ7QUFDakRzQiwyQkFBV0YsT0FBTzVDLElBQVAsQ0FBWXVDLFFBQVosQ0FBcUJmLENBQXJCLENBQVgsRUFBb0MsRUFBcEM7QUFDSDtBQUNELG1CQUFPLElBQVA7QUFDSDs7OzRCQTVMYTtBQUNWLGdCQUFJVyxTQUFTLEtBQUtuQyxJQUFMLENBQVV1RCxVQUFWLEdBQXVCLENBQXBDLENBRFUsQ0FDNkI7QUFDdkNwQixxQkFBVSxLQUFLbkMsSUFBTCxDQUFVd0QsV0FBVixJQUF5QnJCLFNBQVMsQ0FBbkMsSUFBeUNBLE1BQWxEO0FBQ0EsbUJBQU9BLE1BQVA7QUFDSDs7Ozs7O0FBMExKOztBQUVEc0IsT0FBT0MsT0FBUCxHQUFpQnRFLFFBQWpCIiwiZmlsZSI6ImxzZXF0cmVlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBtZXJnZSA9IHJlcXVpcmUoJ2xvZGFzaC5tZXJnZScpO1xuXG5jb25zdCBCYXNlID0gcmVxdWlyZSgnLi9iYXNlLmpzJyk7XG5jb25zdCBTdHJhdGVneSA9IHJlcXVpcmUoJy4vc3RyYXRlZ3kuanMnKTtcbmNvbnN0IElkZW50aWZpZXIgPSByZXF1aXJlKCcuL2lkZW50aWZpZXIuanMnKTtcbmNvbnN0IFRyaXBsZSA9IHJlcXVpcmUoJy4vdHJpcGxlLmpzJyk7XG5jb25zdCBMU2VxTm9kZSA9IHJlcXVpcmUoJy4vbHNlcW5vZGUuanMnKTtcblxuY29uc3QgRXhPdXRPZkJvdW5kcyA9IHJlcXVpcmUoJy4vZXhvdXRvZmJvdW5kcy5qcycpO1xuXG5cbi8qKlxuICogRGlzdHJpYnV0ZWQgYXJyYXkgdXNpbmcgTFNlcSBhbGxvY2F0aW9uIHN0cmF0ZWd5IHdpdGggYW4gdW5kZXJseWluZ1xuICogZXhwb25lbnRpYWwgdHJlZS5cbiAqL1xuY2xhc3MgTFNlcVRyZWUge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgZ2xvYmFsbHkgdW5pcXVlIHNpdGUgaWRlbnRpZmllci5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnNdIFRoZSBvcHRpb25zIG9mIHRoZSBMU2VxVHJlZS5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW29wdGlvbnMuYm91bmRhcnkgPSAxMF0gVGhlIG1heGltYWwgaW50ZXJ2YWwgYmV0d2VlbiB0d29cbiAgICAgKiBnZW5lcmF0ZWQgbm9kZXMuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmJhc2UgPSAxNV0gVGhlIGJhc2UsIGkuZS4sIHRoZSBtYXhpbWFsIGFyaXR5IG9mXG4gICAgICogdGhlIHJvb3Qgbm9kZS4gRGVmYXVsdCBpcyAyKioxNS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvciAoc2l0ZSwgb3B0aW9ucyA9IHt9KSB7XG4gICAgICAgIGxldCBsaXN0VHJpcGxlO1xuICAgICAgICAvLyAjMCBwcm9jZXNzIG9wdGlvbnNcbiAgICAgICAgdGhpcy5vcHRpb25zID0gbWVyZ2UoeyBib3VuZGFyeTogMTAsIGJhc2U6IDE1IH0sIG9wdGlvbnMpO1xuXG4gICAgICAgIC8vICMxIGluaXRpYWxpemUgc291cmNlLCBjb3VudGVyLCBhbmQgc3RyYXRlZ3kgY2hvaWNlXG4gICAgICAgIHRoaXMuX3MgPSBzaXRlO1xuICAgICAgICB0aGlzLl9jID0gMDtcbiAgICAgICAgdGhpcy5faGFzaCA9IChkZXB0aCkgPT4gZGVwdGglMjtcblxuICAgICAgICB0aGlzLl9iYXNlID0gbmV3IEJhc2UodGhpcy5vcHRpb25zLmJhc2UpO1xuICAgICAgICB0aGlzLl9zdHJhdGVneSA9IG5ldyBTdHJhdGVneSh0aGlzLl9iYXNlLCB0aGlzLm9wdGlvbnMuYm91bmRhcnkpO1xuXG4gICAgICAgIC8vICMyIGluaXRpYWxpemUgdHJlZSBzdHJ1Y3R1cmUgd2l0aCBtYXhpbWFsIGJvdW5kc1xuICAgICAgICB0aGlzLnJvb3QgPSBuZXcgTFNlcU5vZGUoKTtcbiAgICAgICAgLy8gI0EgbWluaW1hbCBib3VuZFxuICAgICAgICB0aGlzLnJvb3QuYWRkKG5ldyBMU2VxTm9kZShbbmV3IFRyaXBsZSgwLDAsMCldLCAnJykpO1xuICAgICAgICAvLyAjQiBtYXhpbWFsIGJvdW5kXG4gICAgICAgIHRoaXMucm9vdC5hZGQoXG4gICAgICAgICAgICBuZXcgTFNlcU5vZGUoW25ldyBUcmlwbGUoTWF0aC5wb3coMiwgdGhpcy5fYmFzZS5nZXRCaXRCYXNlKDApKSAtIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTnVtYmVyLk1BWF9WQUxVRSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOdW1iZXIuTUFYX1ZBTFVFKV0sICcnKSk7XG4gICAgfTtcblxuICAgIFxuICAgIGdldCBsZW5ndGggKCkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcy5yb290LnN1YkNvdW50ZXIgLSAyOyAvLyAtMjogdGhlIGJvdW5kYXJpZXNcbiAgICAgICAgcmVzdWx0ID0gKHRoaXMucm9vdC5faGFzRWxlbWVudCAmJiByZXN1bHQgKyAxKSB8fCByZXN1bHQ7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcbiAgICBcbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIGVsZW1lbnQgYXQgdGFyZ2V0ZWQgaW5kZXggaW4gdGhlIGxpbmVhcml6ZWQgc2VxdWVuY2UuIEl0IGRvZXMgbm90XG4gICAgICogdGFrZSBpbnRvIGFjY291bnQgdGhlIGhpZGRlbiBib3VuZGFyaWVzIG9mIHRoZSBzZXF1ZW5jZSBbTUlOLCBlXzEsIGVfMixcbiAgICAgKiAuLi4gZV9sZW5ndGgsIE1BWF0sIGhlbmNlIGluZGV4IG9mIGVfMSBpcyAwLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleCBUaGUgaW5kZXggb2YgdGhlIGVsZW1lbnQgaW4gdGhlIGZsYXR0ZW5lZCBhcnJheS5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBlbGVtZW50IGxvY2F0ZWQgYXQgdGhlIGluZGV4IGluIGFyZ3VtZW50LlxuICAgICAqL1xuICAgIGdldCAoaW5kZXgpIHtcbiAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEV4T3V0T2ZCb3VuZHMoaW5kZXgsIHRoaXMubGVuZ3RoKTtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIGxldCBub2RlID0gdGhpcy5yb290LmdldChpbmRleCArIDEpO1xuICAgICAgICB3aGlsZSAoIW5vZGUuaXNMZWFmKXtcbiAgICAgICAgICAgIG5vZGUgPSBub2RlLmNoaWxkO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbm9kZS5lO1xuICAgIH07XG4gICAgXG4gICAgLyoqXG4gICAgICogQHByaXZhdGUgR2V0IHRoZSBMU2VxTm9kZSBhdCB0YXJnZXRlZCBpbmRleCBpbiB0aGUgbGluZWFyaXplZFxuICAgICAqIHNlcXVlbmNlLiBUaGUgc2VxdWVuY2UgaW5jbHVkZXMgdGhlIGhpZGRlbiBib3VuZGFyaWVzIFtNSU4sIGVfMSwgZV8yLFxuICAgICAqIC4uLiBlX2xlbmd0aCwgTUFYXSwgaGVuY2UgZV8xJ3MgaW5kZXggaXMgMS5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXggVGhlIGluZGV4IG9mIHRoZSBlbGVtZW50IGluIHRoZSBmbGF0dGVuZWQgYXJyYXkuXG4gICAgICogQHJldHVybiB7TFNlcU5vZGV9IFRoZSBMU2VxTm9kZSB0YXJnZXRpbmcgdGhlIGVsZW1lbnQgYXQgaW5kZXguXG4gICAgICovXG4gICAgX2dldCAoaW5kZXgpIHtcbiAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLmxlbmd0aCArIDIpIHsgLy8gKzI6IGJvdW5kYXJpZXNcbiAgICAgICAgICAgIHRocm93IG5ldyBFeE91dE9mQm91bmRzKGluZGV4LCB0aGlzLmxlbmd0aCArIDIpO1xuICAgICAgICB9O1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXMucm9vdC5nZXQoaW5kZXgpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBJbnNlcnQgYSB2YWx1ZSBhdCB0aGUgdGFyZ2V0ZWQgaW5kZXguXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdG8gaW5zZXJ0LCBlLmcuIGEgY2hhcmFjdGVyIGlmIHRoZVxuICAgICAqIHNlcXVlbmNlIGlzIGEgc3RyaW5nLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleCBUaGUgcG9zaXRpb24gaW4gdGhlIGFycmF5LlxuICAgICAqIEByZXR1cm4ge09iamVjdH0ge19lOiBlbGVtZW50IG9mIE9iamVjdCB0eXBlLCBfaTogSWRlbnRpZmllcn1cbiAgICAgKi9cbiAgICBpbnNlcnQgKGVsZW1lbnQsIGluZGV4KSB7XG4gICAgICAgIGNvbnN0IHBlaSA9IHRoaXMuX2dldChpbmRleCksIC8vICMxYSBwcmV2aW91cyBib3VuZFxuICAgICAgICAgICAgICBxZWkgPSB0aGlzLl9nZXQoaW5kZXgrMSk7IC8vICMxYiBuZXh0IGJvdW5kXG5cbiAgICAgICAgIC8vICMyYSBpbmNyZW1lbnRpbmcgdGhlIGxvY2FsIGNvdW50ZXJcbiAgICAgICAgdGhpcy5fYyArPSAxO1xuICAgICAgICAvLyAjMmIgZ2VuZXJhdGluZyB0aGUgaWQgaW5iZXR3ZWVuIHRoZSBib3VuZHNcbiAgICAgICAgY29uc3QgaWQgPSB0aGlzLmFsbG9jKHBlaSwgcWVpKTtcblxuICAgICAgICAvLyAjMyBhZGQgaXQgdG8gdGhlIHN0cnVjdHVyZSBhbmQgcmV0dXJuIHZhbHVlXG4gICAgICAgIGNvbnN0IHBhaXIgPSB7ZWxlbTogZWxlbWVudCwgaWQ6IGlkfTtcbiAgICAgICAgdGhpcy5hcHBseUluc2VydChwYWlyKTtcbiAgICAgICAgcmV0dXJuIHBhaXI7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERlbGV0ZSB0aGUgZWxlbWVudCBhdCB0aGUgaW5kZXguXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4IFRoZSBpbmRleCBvZiB0aGUgZWxlbWVudCB0byBkZWxldGUgaW4gdGhlIGFycmF5LlxuICAgICAqIEByZXR1cm4ge0lkZW50aWZpZXJ9IFRoZSBpZGVudGlmaWVyIG9mIHRoZSBlbGVtZW50IGF0IHRoZSBpbmRleC5cbiAgICAgKi9cbiAgICByZW1vdmUgKGluZGV4KSB7XG4gICAgICAgIGNvbnN0IGVpID0gdGhpcy5fZ2V0KGluZGV4ICsgMSk7XG4gICAgICAgIGNvbnN0IGkgPSBuZXcgSWRlbnRpZmllcih0aGlzLl9iYXNlKS5mcm9tTm9kZShlaSk7XG4gICAgICAgIHRoaXMuYXBwbHlSZW1vdmUoZWkpO1xuICAgICAgICByZXR1cm4gaTtcbiAgICB9O1xuXG5cbiAgICAvKipcbiAgICAgKiBHZW5lcmF0ZSB0aGUgZGlnaXQgcGFydCBvZiB0aGUgaWRlbnRpZmllcnMgIGJldHdlZW4gcCBhbmQgcS5cbiAgICAgKiBAcGFyYW0ge0xTZXFOb2RlfSBwIFRoZSBkaWdpdCBwYXJ0IG9mIHRoZSBwcmV2aW91cyBpZGVudGlmaWVyLlxuICAgICAqIEBwYXJhbSB7TFNlcU5vZGV9IHEgVGhlIGRpZ2l0IHBhcnQgb2YgdGhlIG5leHQgaWRlbnRpZmllci5cbiAgICAgKiBAcmV0dXJuIHtJZGVudGlmaWVyfSBUaGUgbmV3IGlkZW50aWZpZXIgbG9jYXRlZCBiZXR3ZWVuIHAgYW5kIHEuXG4gICAgICovXG4gICAgYWxsb2MgKHAsIHEpIHtcbiAgICAgICAgbGV0IGludGVydmFsID0gMCwgbGV2ZWwgPSAwO1xuICAgICAgICAvLyAjMSBwcm9jZXNzIHRoZSBsZXZlbCBvZiB0aGUgbmV3IGlkZW50aWZpZXJcbiAgICAgICAgd2hpbGUgKGludGVydmFsIDw9IDApIHsgLy8gbm8gcm9vbSBmb3IgaW5zZXJ0aW9uXG4gICAgICAgICAgICBpbnRlcnZhbCA9IHRoaXMuX2Jhc2UuZ2V0SW50ZXJ2YWwobGV2ZWwsIHAsIHEpO1xuICAgICAgICAgICAgKytsZXZlbDtcbiAgICAgICAgfTtcbiAgICAgICAgbGV2ZWwgLT0gMTtcbiAgICAgICAgaWYgKHRoaXMuX2hhc2gobGV2ZWwpID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3RyYXRlZ3kuYlBsdXMocCwgcSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXZlbCwgaW50ZXJ2YWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcywgdGhpcy5fYyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3RyYXRlZ3kuYk1pbnVzKHAsIHEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldmVsLCBpbnRlcnZhbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fcywgdGhpcy5fYyk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBcbiAgICBcbiAgICAvKipcbiAgICAgKiBJbnNlcnQgYW4gZWxlbWVudCBjcmVhdGVkIGZyb20gYSByZW1vdGUgc2l0ZSBpbnRvIHRoZSBhcnJheS5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gcGFpciBQYWlyIGNvbnRhaW5pbmcgdGhlIGlkZW50aWZpZXIgYW5kIHRoZSBlbGVtZW50IHRvXG4gICAgICogaW5zZXJ0IGluIHRoZSBkYXRhIHN0cnVjdHVyZS5cbiAgICAgKiBAcGFyYW0ge0lkZW50aWZpZXJ8TFNlcU5vZGV9IHBhaXIuaWQgVGhlIGlkZW50aWZpZXIgb2YgdGhlIGVsZW1lbnQuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHBhaXIuZWxlbSBUaGUgZWxlbWVudCB0byBpbnNlcnQuXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbbm9JbmRleCA9IHRydWVdIFdoZXRoZXIgb3Igbm90IGl0IHNob3VsZCByZXR1cm4gdGhlXG4gICAgICogaW5kZXggb2YgdGhlIGluc2VydC5cbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ8Qm9vbGVhbn0gVGhlIGluZGV4IG9mIHRoZSBuZXdseSBpbnNlcnRlZCBlbGVtZW50IGluIHRoZVxuICAgICAqIGFycmF5LCBpZiBhc2tlZC4gLTEgaWYgdGhlIGVsZW1lbnQgYWxyZWFkeSBleGlzdHMgYW5kIGhhcyBub3QgYmVlbiBhZGRlZC5cbiAgICAgKiBJZiBub0luZGV4LCByZXR1cm5zIHRydWUgaWYgdGhlIGVsZW1lbnQgaGFzIGJlZW4gYWRkZWQsIGZhbHNlIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBhcHBseUluc2VydCAocGFpciwgbm9JbmRleCA9IHRydWUpIHtcbiAgICAgICAgbGV0IG5vZGUsIHJlc3VsdCwgaTtcbiAgICAgICAgLy8gIzAgY2FzdCBmcm9tIHRoZSBwcm9wZXIgdHlwZVxuICAgICAgICAvLyAjMEEgdGhlIGlkZW50aWZpZXIgaXMgYW4gSWRlbnRpZmllclxuICAgICAgICBpID0gcGFpci5pZDtcbiAgICAgICAgbm9kZSA9ICBpICYmIGkuX2QgJiYgaS5fcyAmJiBpLl9jICYmXG4gICAgICAgICAgICAobmV3IElkZW50aWZpZXIodGhpcy5fYmFzZSwgaS5fZCwgaS5fcywgaS5fYykudG9Ob2RlKHBhaXIuZWxlbSkpO1xuICAgICAgICAvLyAjMEIgdGhlIGlkZW50aWZpZXIgaXMgYSBMU2VxTm9kZVxuICAgICAgICBub2RlID0gKGkgJiYgaS50ICYmIGkuY2hpbGRyZW4gJiYgTFNlcU5vZGUuZnJvbUpTT04oaSkpIHx8IG5vZGU7XG4gICAgICAgIC8vICMxIGludGVncmF0ZXMgdGhlIG5ldyBlbGVtZW50IHRvIHRoZSBkYXRhIHN0cnVjdHVyZVxuICAgICAgICByZXN1bHQgPSB0aGlzLnJvb3QuYWRkKG5vZGUpO1xuICAgICAgICAvLyAjMiBpZiB0aGUgZWxlbWVudCBhcyBiZWVuIGFkZGVkXG4gICAgICAgIGlmIChub0luZGV4KSB7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9IGVsc2UgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucm9vdC5pbmRleE9mKG5vZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9OyAgICAgICAgXG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERlbGV0ZSB0aGUgZWxlbWVudCB3aXRoIHRoZSB0YXJnZXRlZCBpZGVudGlmaWVyLlxuICAgICAqIEBwYXJhbSB7SWRlbnRpZmllcnxMU2VxTm9kZX0gaSBUaGUgaWRlbnRpZmllciBvZiB0aGUgZWxlbWVudC5cbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSBpbmRleCBvZiB0aGUgZWxlbWVudCBmcmVzaGx5IGRlbGV0ZWQsIC0xIGlmIG5vXG4gICAgICogcmVtb3ZhbC5cbiAgICAgKi9cbiAgICBhcHBseVJlbW92ZSAoaSkge1xuICAgICAgICBsZXQgbm9kZSwgcG9zaXRpb247XG4gICAgICAgIC8vICMwIGNhc3QgZnJvbSB0aGUgcHJvcGVyIHR5cGVcbiAgICAgICAgbm9kZSA9IGkgJiYgaS5fZCAmJiBpLl9zICYmIGkuX2MgJiZcbiAgICAgICAgICAgIChuZXcgSWRlbnRpZmllcih0aGlzLl9iYXNlLCBpLl9kLCBpLl9zLCBpLl9jKSkudG9Ob2RlKG51bGwpO1xuICAgICAgICAvLyAjMEIgdGhlIGlkZW50aWZpZXIgaXMgYSBMU0VRTm9kZVxuICAgICAgICBub2RlID0gKGkgJiYgaS50ICYmIGkuY2hpbGRyZW4gJiYgTFNlcU5vZGUuZnJvbUpTT04oaSkpIHx8IG5vZGU7XG4gICAgICAgIC8vICMxIGdldCB0aGUgaW5kZXggb2YgdGhlIGVsZW1lbnQgdG8gcmVtb3ZlXG4gICAgICAgIHBvc2l0aW9uID0gdGhpcy5yb290LmluZGV4T2Yobm9kZSk7XG4gICAgICAgIGlmIChwb3NpdGlvbiAhPT0gLTEpe1xuICAgICAgICAgICAgLy8gIzIgaWYgaXQgZXhpc3RzIHJlbW92ZSBpdFxuICAgICAgICAgICAgdGhpcy5yb290LmRlbChub2RlKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHBvc2l0aW9uO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDYXN0IHRoZSBKU09OIG9iamVjdCBpbnRvIGEgcHJvcGVyIExTZXFUcmVlLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgdGhlIEpTT04gb2JqZWN0IHRvIGNhc3QuXG4gICAgICogQHJldHVybiB7TFNlcVRyZWV9IEEgc2VsZiByZWZlcmVuY2UuXG4gICAgICovXG4gICAgZnJvbUpTT04gKG9iamVjdCkge1xuICAgICAgICAvLyAjMSBjb3B5IHRoZSBzb3VyY2UsIGNvdW50ZXIsIGFuZCBsZW5ndGggb2YgdGhlIG9iamVjdFxuICAgICAgICB0aGlzLl9zID0gb2JqZWN0Ll9zO1xuICAgICAgICB0aGlzLl9jID0gb2JqZWN0Ll9jO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSBvYmplY3Qub3B0aW9ucztcblxuICAgICAgICB0aGlzLl9iYXNlID0gbmV3IEJhc2UodGhpcy5vcHRpb25zLmJhc2UpO1xuICAgICAgICB0aGlzLl9ib3VuZGFyeSA9IG5ldyBTdHJhdGVneSh0aGlzLl9iYXNlLCB0aGlzLm9wdGlvbnMuYm91bmRhcnkpO1xuICAgICAgICBcbiAgICAgICAgLy8gIzIgZGVwdGggZmlyc3QgYWRkaW5nXG4gICAgICAgIGNvbnN0IGRlcHRoRmlyc3QgPSAoY3VycmVudE5vZGUsIGN1cnJlbnRQYXRoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCB0cmlwbGUgPSBuZXcgVHJpcGxlKGN1cnJlbnROb2RlLnQucCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudE5vZGUudC5zLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Tm9kZS50LmMpO1xuICAgICAgICAgICAgY3VycmVudFBhdGgucHVzaCh0cmlwbGUpOyAvLyBzdGFja1xuICAgICAgICAgICAgaWYgKGN1cnJlbnROb2RlLmUgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJvb3QuYWRkKG5ldyBMU2VxTm9kZShjdXJyZW50UGF0aC5zbGljZSgpLCBjdXJyZW50Tm9kZS5lKSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjdXJyZW50Tm9kZS5jaGlsZHJlbi5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIGRlcHRoRmlyc3QoY3VycmVudE5vZGUuY2hpbGRyZW5baV0sIGN1cnJlbnRQYXRoKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjdXJyZW50UGF0aC5wb3AoKTsgLy8gdW5zdGFja1xuICAgICAgICB9O1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9iamVjdC5yb290LmNoaWxkcmVuLmxlbmd0aDsgKytpKXtcbiAgICAgICAgICAgIGRlcHRoRmlyc3Qob2JqZWN0LnJvb3QuY2hpbGRyZW5baV0sIFtdKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTsgICAgXG4gICAgXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IExTZXFUcmVlO1xuIl19
},{"./base.js":1,"./exoutofbounds.js":2,"./identifier.js":3,"./lseqnode.js":4,"./strategy.js":5,"./triple.js":6,"lodash.merge":8}]},{},[])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJsaWIvYmFzZS5qcyIsImxpYi9leG91dG9mYm91bmRzLmpzIiwibGliL2lkZW50aWZpZXIuanMiLCJsaWIvbHNlcW5vZGUuanMiLCJsaWIvc3RyYXRlZ3kuanMiLCJsaWIvdHJpcGxlLmpzIiwibm9kZV9tb2R1bGVzL0JpZ0ludC9zcmMvQmlnSW50LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5tZXJnZS9pbmRleC5qcyIsImxpYi9sc2VxdHJlZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3WUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25MQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdnREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gYW5kIHV0aWwgY2xhc3Mgb2YgdGhlIGJhc2UsIGkuZS4gdGhlIG1heGltYWwgYXJpdHkgb2YgdGhlIGZpcnN0XG4gKiBsZXZlbCBvZiB0aGUgdHJlZS5cbiAqL1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgQmFzZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW2IgPSAzXSBUaGUgbnVtYmVyIG9mIGJpdHMgYXQgbGV2ZWwgMCBvZiB0aGUgZGVuc2Ugc3BhY2UuXG4gICAgICovXG4gICAgZnVuY3Rpb24gQmFzZSgpIHtcbiAgICAgICAgdmFyIGIgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IDM7XG5cbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEJhc2UpO1xuXG4gICAgICAgIHRoaXMuX2IgPSBiO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhCYXNlLCBbe1xuICAgICAgICBrZXk6ICdnZXRCaXRCYXNlJyxcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQcm9jZXNzIHRoZSBudW1iZXIgb2YgYml0cyB1c2FnZSBhdCBhIGNlcnRhaW4gbGV2ZWwgb2YgZGVuc2Ugc3BhY2UuXG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBsZXZlbCBUaGUgbGV2ZWwgaW4gZGVuc2Ugc3BhY2UsIGkuZS4sIHRoZSBudW1iZXIgb2ZcbiAgICAgICAgICogY29uY2F0ZW5hdGlvbnMgb2YgdGhlIGlkZW50aWZpZXIuXG4gICAgICAgICAqIEByZXR1cm4ge051bWJlcn0gVGhlIG51bWJlciBvZiBiaXQgdG8gZW5jb2RlIGEgc2luZ2xlIHBhdGggY29uY2F0ZW5hdGlvblxuICAgICAgICAgKiBhdCB0aGUgZGVwdGggaW4gYXJndW1lbnQuXG4gICAgICAgICAqL1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0Qml0QmFzZShsZXZlbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2IgKyBsZXZlbDtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZ2V0U3VtQml0JyxcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBQcm9jZXNzIHRoZSB0b3RhbCBudW1iZXIgb2YgYml0cyB1c2FnZSB0byBnZXQgdG8gYSBjZXJ0YWluIGxldmVsLlxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gbGV2ZWwgVGhlIGxldmVsIGluIGRlbnNlIHNwYWNlLCBpLmUuLCB0aGUgbnVtYmVyIG9mXG4gICAgICAgICAqIGNvbmNhdGVuYXRpb25zIG9mIHRoZSBpZGVudGlmaWVyLlxuICAgICAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSBudW1iZXIgb2YgYml0cyByZXF1aXJlZCB0byBlbmNvZGUgdGhlIHBhdGhcbiAgICAgICAgICogY29tcHJpc2luZyBsZXZlbCBjb25jYXRlbmF0aW9ucy5cbiAgICAgICAgICovXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXRTdW1CaXQobGV2ZWwpIHtcbiAgICAgICAgICAgIHZhciBuID0gdGhpcy5nZXRCaXRCYXNlKGxldmVsKTtcbiAgICAgICAgICAgIHZhciBtID0gdGhpcy5fYiAtIDE7XG4gICAgICAgICAgICByZXR1cm4gbiAqIChuICsgMSkgLyAyIC0gbSAqIChtICsgMSkgLyAyO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdnZXRJbnRlcnZhbCcsXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogUHJvY2VzcyB0aGUgbnVtYmVyIG9mIHBvc3NpYmxlIHBhdGhzIGJldHdlZW4gdHdvIExTRVFOb2RlLlxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gbGV2ZWwgVGhlIGRlcHRoIG9mIHRoZSB0cmVlIHRvIHByb2Nlc3MuXG4gICAgICAgICAqIEBwYXJhbSB7TFNlcU5vZGV9IHAgVGhlIHByZXZpb3VzIExTZXFOb2RlLlxuICAgICAgICAgKiBAcGFyYW0ge0xTZXFOb2RlfSBxIFRoZSBuZXh0IExTZXFOb2RlLlxuICAgICAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSBpbnRlcnZhbCBiZXR3ZWVuIHRoZSB0d28gbm9kZXMgYXQgdGhlIGRlcHRoIGluXG4gICAgICAgICAqIGFyZ3VtZW50LlxuICAgICAgICAgKi9cbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldEludGVydmFsKGxldmVsLCBwLCBxKSB7XG4gICAgICAgICAgICB2YXIgc3VtID0gMCxcbiAgICAgICAgICAgICAgICBpID0gMCxcbiAgICAgICAgICAgICAgICBwSXNHcmVhdGVyID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgY29tbW9uUm9vdCA9IHRydWUsXG4gICAgICAgICAgICAgICAgcHJldlZhbHVlID0gMCxcbiAgICAgICAgICAgICAgICBuZXh0VmFsdWUgPSAwO1xuXG4gICAgICAgICAgICB3aGlsZSAoaSA8PSBsZXZlbCkge1xuICAgICAgICAgICAgICAgIHByZXZWYWx1ZSA9IHAgJiYgcC50LnAgfHwgMDtcbiAgICAgICAgICAgICAgICBuZXh0VmFsdWUgPSBxICYmIHEudC5wIHx8IDA7XG4gICAgICAgICAgICAgICAgLy8gIzEgY2hlY2sgaWYgcGF0aHMgYXJlIGlkZW50aWNhbFxuICAgICAgICAgICAgICAgIGlmIChjb21tb25Sb290ICYmIHByZXZWYWx1ZSAhPT0gbmV4dFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbW1vblJvb3QgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgcElzR3JlYXRlciA9IHByZXZWYWx1ZSA+IG5leHRWYWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gIzIgcHJvY2VzcyB0aGUgdmFsdWUgdG8gYWRkIHRvIGludGVydmFsXG4gICAgICAgICAgICAgICAgaWYgKHBJc0dyZWF0ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dFZhbHVlID0gTWF0aC5wb3coMiwgdGhpcy5nZXRCaXRCYXNlKGkpKSAtIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChjb21tb25Sb290IHx8IHBJc0dyZWF0ZXIgfHwgaSAhPT0gbGV2ZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgc3VtICs9IG5leHRWYWx1ZSAtIHByZXZWYWx1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzdW0gKz0gbmV4dFZhbHVlIC0gcHJldlZhbHVlIC0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGkgIT09IGxldmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1bSAqPSBNYXRoLnBvdygyLCB0aGlzLmdldEJpdEJhc2UoaSArIDEpKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIC8vICMzIGl0ZXJhdGUgb3ZlciBwYXRoIGNvbmNhdGVuYXRpb25zXG4gICAgICAgICAgICAgICAgcCA9IHAgJiYgcC5jaGlsZCB8fCBudWxsO1xuICAgICAgICAgICAgICAgIHEgPSBxICYmIHEuY2hpbGQgfHwgbnVsbDtcbiAgICAgICAgICAgICAgICArK2k7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc3VtO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIEJhc2U7XG59KCk7XG5cbjtcblxubW9kdWxlLmV4cG9ydHMgPSBCYXNlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW1KaGMyVXVhbk1pWFN3aWJtRnRaWE1pT2xzaVFtRnpaU0lzSW1JaUxDSmZZaUlzSW14bGRtVnNJaXdpYmlJc0ltZGxkRUpwZEVKaGMyVWlMQ0p0SWl3aWNDSXNJbkVpTENKemRXMGlMQ0pwSWl3aWNFbHpSM0psWVhSbGNpSXNJbU52YlcxdmJsSnZiM1FpTENKd2NtVjJWbUZzZFdVaUxDSnVaWGgwVm1Gc2RXVWlMQ0owSWl3aVRXRjBhQ0lzSW5CdmR5SXNJbU5vYVd4a0lpd2liVzlrZFd4bElpd2laWGh3YjNKMGN5SmRMQ0p0WVhCd2FXNW5jeUk2SWtGQlFVRTdPMEZCUlVFN096czdPenM3T3p0SlFVbE5RU3hKTzBGQlEwWTdPenRCUVVkQkxHOUNRVUZ2UWp0QlFVRkJMRmxCUVZCRExFTkJRVThzZFVWQlFVZ3NRMEZCUnpzN1FVRkJRVHM3UVVGRGFFSXNZVUZCUzBNc1JVRkJUQ3hIUVVGVlJDeERRVUZXTzBGQlEwZzdPenM3T3p0QlFVVkVPenM3T3pzN08yMURRVTlaUlN4TExFVkJRVTg3UVVGRFppeHRRa0ZCVHl4TFFVRkxSQ3hGUVVGTUxFZEJRVlZETEV0QlFXcENPMEZCUTBnN096czdPMEZCUlVRN096czdPenM3YTBOQlQxZEJMRXNzUlVGQlR6dEJRVU5rTEdkQ1FVRk5ReXhKUVVGSkxFdEJRVXRETEZWQlFVd3NRMEZCWjBKR0xFdEJRV2hDTEVOQlFWWTdRVUZEUVN4blFrRkJUVWNzU1VGQlNTeExRVUZMU2l4RlFVRk1MRWRCUVZVc1EwRkJjRUk3UVVGRFFTeHRRa0ZCVVVVc1MwRkJTMEVzU1VGQlNTeERRVUZVTEVOQlFVUXNSMEZCWjBJc1EwRkJhRUlzUjBGQmNVSkZMRXRCUVV0QkxFbEJRVWtzUTBGQlZDeEpRVUZqTEVOQlFURkRPMEZCUTBnN096czdPMEZCUlVRN096czdPenM3TzI5RFFWRmhTQ3hMTEVWQlFVOUpMRU1zUlVGQlIwTXNReXhGUVVGSE8wRkJRM1JDTEdkQ1FVRkpReXhOUVVGTkxFTkJRVlk3UVVGQlFTeG5Ra0ZCWVVNc1NVRkJTU3hEUVVGcVFqdEJRVUZCTEdkQ1FVTkpReXhoUVVGaExFdEJSR3BDTzBGQlFVRXNaMEpCUTNkQ1F5eGhRVUZoTEVsQlJISkRPMEZCUVVFc1owSkJSVWxETEZsQlFWa3NRMEZHYUVJN1FVRkJRU3huUWtGRmJVSkRMRmxCUVZrc1EwRkdMMEk3TzBGQlNVRXNiVUpCUVU5S0xFdEJRVXRRTEV0QlFWb3NSVUZCYlVJN1FVRkRabFVzTkVKQlFXRk9MRXRCUVV0QkxFVkJRVVZSTEVOQlFVWXNRMEZCU1ZJc1EwRkJWaXhKUVVGblFpeERRVUUxUWp0QlFVTkJUeXcwUWtGQllVNHNTMEZCUzBFc1JVRkJSVThzUTBGQlJpeERRVUZKVWl4RFFVRldMRWxCUVdkQ0xFTkJRVFZDTzBGQlEwRTdRVUZEUVN4dlFrRkJTVXNzWTBGQlkwTXNZMEZCWTBNc1UwRkJhRU1zUlVGQk1rTTdRVUZEZGtOR0xHbERRVUZoTEV0QlFXSTdRVUZEUVVRc2FVTkJRV0ZGTEZsQlFWbERMRk5CUVhwQ08wRkJRMGc3UVVGRFJEdEJRVU5CTEc5Q1FVRkpTQ3hWUVVGS0xFVkJRV2RDTzBGQlFVVkhMR2REUVVGWlJTeExRVUZMUXl4SFFVRk1MRU5CUVZNc1EwRkJWQ3hGUVVGWExFdEJRVXRhTEZWQlFVd3NRMEZCWjBKTExFTkJRV2hDTEVOQlFWZ3NTVUZCSzBJc1EwRkJNME03UVVGQkswTTdRVUZEYWtVc2IwSkJRVWxGTEdOQlFXTkVMRlZCUVdRc1NVRkJORUpFTEUxQlFVMVFMRXRCUVhSRExFVkJRVFpETzBGQlEzcERUU3d5UWtGQlQwc3NXVUZCV1VRc1UwRkJia0k3UVVGRFNDeHBRa0ZHUkN4TlFVVlBPMEZCUTBoS0xESkNRVUZQU3l4WlFVRlpSQ3hUUVVGYUxFZEJRWGRDTEVOQlFTOUNPMEZCUTBnN1FVRkRSQ3h2UWtGQlNVZ3NUVUZCU1ZBc1MwRkJVaXhGUVVGak8wRkJRVVZOTERKQ1FVRlBUeXhMUVVGTFF5eEhRVUZNTEVOQlFWTXNRMEZCVkN4RlFVRlhMRXRCUVV0YUxGVkJRVXdzUTBGQlowSkxMRWxCUVVVc1EwRkJiRUlzUTBGQldDeERRVUZRTzBGQlFUQkRPMEZCUXpGRU8wRkJRMEZJTEc5Q1FVRkpRU3hMUVVGTFFTeEZRVUZGVnl4TFFVRlFMRWxCUVdkQ0xFbEJRWEJDTzBGQlEwRldMRzlDUVVGSlFTeExRVUZMUVN4RlFVRkZWU3hMUVVGUUxFbEJRV2RDTEVsQlFYQkNPMEZCUTBFc2EwSkJRVVZTTEVOQlFVWTdRVUZEU0R0QlFVTkVMRzFDUVVGUFJDeEhRVUZRTzBGQlEwZzdPenM3T3p0QlFVVktPenRCUVVWRVZTeFBRVUZQUXl4UFFVRlFMRWRCUVdsQ2NFSXNTVUZCYWtJaUxDSm1hV3hsSWpvaVltRnpaUzVxY3lJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYklpZDFjMlVnYzNSeWFXTjBKenRjYmx4dUx5b3FYRzRnS2lCRGIyNW1hV2QxY21GMGFXOXVJR0Z1WkNCMWRHbHNJR05zWVhOeklHOW1JSFJvWlNCaVlYTmxMQ0JwTG1VdUlIUm9aU0J0WVhocGJXRnNJR0Z5YVhSNUlHOW1JSFJvWlNCbWFYSnpkRnh1SUNvZ2JHVjJaV3dnYjJZZ2RHaGxJSFJ5WldVdVhHNGdLaTljYm1Oc1lYTnpJRUpoYzJVZ2UxeHVJQ0FnSUM4cUtseHVJQ0FnSUNBcUlFQndZWEpoYlNCN1RuVnRZbVZ5ZlNCYllpQTlJRE5kSUZSb1pTQnVkVzFpWlhJZ2IyWWdZbWwwY3lCaGRDQnNaWFpsYkNBd0lHOW1JSFJvWlNCa1pXNXpaU0J6Y0dGalpTNWNiaUFnSUNBZ0tpOWNiaUFnSUNCamIyNXpkSEoxWTNSdmNpQW9ZaUE5SURNcElIdGNiaUFnSUNBZ0lDQWdkR2hwY3k1ZllpQTlJR0k3WEc0Z0lDQWdmVHRjYmx4dUlDQWdJQzhxS2x4dUlDQWdJQ0FxSUZCeWIyTmxjM01nZEdobElHNTFiV0psY2lCdlppQmlhWFJ6SUhWellXZGxJR0YwSUdFZ1kyVnlkR0ZwYmlCc1pYWmxiQ0J2WmlCa1pXNXpaU0J6Y0dGalpTNWNiaUFnSUNBZ0tpQkFjR0Z5WVcwZ2UwNTFiV0psY24wZ2JHVjJaV3dnVkdobElHeGxkbVZzSUdsdUlHUmxibk5sSUhOd1lXTmxMQ0JwTG1VdUxDQjBhR1VnYm5WdFltVnlJRzltWEc0Z0lDQWdJQ29nWTI5dVkyRjBaVzVoZEdsdmJuTWdiMllnZEdobElHbGtaVzUwYVdacFpYSXVYRzRnSUNBZ0lDb2dRSEpsZEhWeWJpQjdUblZ0WW1WeWZTQlVhR1VnYm5WdFltVnlJRzltSUdKcGRDQjBieUJsYm1OdlpHVWdZU0J6YVc1bmJHVWdjR0YwYUNCamIyNWpZWFJsYm1GMGFXOXVYRzRnSUNBZ0lDb2dZWFFnZEdobElHUmxjSFJvSUdsdUlHRnlaM1Z0Wlc1MExseHVJQ0FnSUNBcUwxeHVJQ0FnSUdkbGRFSnBkRUpoYzJVZ0tHeGxkbVZzS1NCN1hHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCMGFHbHpMbDlpSUNzZ2JHVjJaV3c3WEc0Z0lDQWdmVHRjYmx4dUlDQWdJQzhxS2x4dUlDQWdJQ0FxSUZCeWIyTmxjM01nZEdobElIUnZkR0ZzSUc1MWJXSmxjaUJ2WmlCaWFYUnpJSFZ6WVdkbElIUnZJR2RsZENCMGJ5QmhJR05sY25SaGFXNGdiR1YyWld3dVhHNGdJQ0FnSUNvZ1FIQmhjbUZ0SUh0T2RXMWlaWEo5SUd4bGRtVnNJRlJvWlNCc1pYWmxiQ0JwYmlCa1pXNXpaU0J6Y0dGalpTd2dhUzVsTGl3Z2RHaGxJRzUxYldKbGNpQnZabHh1SUNBZ0lDQXFJR052Ym1OaGRHVnVZWFJwYjI1eklHOW1JSFJvWlNCcFpHVnVkR2xtYVdWeUxseHVJQ0FnSUNBcUlFQnlaWFIxY200Z2UwNTFiV0psY24wZ1ZHaGxJRzUxYldKbGNpQnZaaUJpYVhSeklISmxjWFZwY21Wa0lIUnZJR1Z1WTI5a1pTQjBhR1VnY0dGMGFGeHVJQ0FnSUNBcUlHTnZiWEJ5YVhOcGJtY2diR1YyWld3Z1kyOXVZMkYwWlc1aGRHbHZibk11WEc0Z0lDQWdJQ292WEc0Z0lDQWdaMlYwVTNWdFFtbDBJQ2hzWlhabGJDa2dlMXh1SUNBZ0lDQWdJQ0JqYjI1emRDQnVJRDBnZEdocGN5NW5aWFJDYVhSQ1lYTmxLR3hsZG1Wc0tUdGNiaUFnSUNBZ0lDQWdZMjl1YzNRZ2JTQTlJSFJvYVhNdVgySWdMU0F4T3lBZ0lDQWdJQ0JjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJQ2h1SUNvZ0tHNGdLeUF4S1NrZ0x5QXlJQzBnS0cwZ0tpQW9iU0FySURFcElDOGdNaWs3WEc0Z0lDQWdmVHRjYmx4dUlDQWdJQzhxS2x4dUlDQWdJQ0FxSUZCeWIyTmxjM01nZEdobElHNTFiV0psY2lCdlppQndiM056YVdKc1pTQndZWFJvY3lCaVpYUjNaV1Z1SUhSM2J5Qk1VMFZSVG05a1pTNWNiaUFnSUNBZ0tpQkFjR0Z5WVcwZ2UwNTFiV0psY24wZ2JHVjJaV3dnVkdobElHUmxjSFJvSUc5bUlIUm9aU0IwY21WbElIUnZJSEJ5YjJObGMzTXVYRzRnSUNBZ0lDb2dRSEJoY21GdElIdE1VMlZ4VG05a1pYMGdjQ0JVYUdVZ2NISmxkbWx2ZFhNZ1RGTmxjVTV2WkdVdVhHNGdJQ0FnSUNvZ1FIQmhjbUZ0SUh0TVUyVnhUbTlrWlgwZ2NTQlVhR1VnYm1WNGRDQk1VMlZ4VG05a1pTNWNiaUFnSUNBZ0tpQkFjbVYwZFhKdUlIdE9kVzFpWlhKOUlGUm9aU0JwYm5SbGNuWmhiQ0JpWlhSM1pXVnVJSFJvWlNCMGQyOGdibTlrWlhNZ1lYUWdkR2hsSUdSbGNIUm9JR2x1WEc0Z0lDQWdJQ29nWVhKbmRXMWxiblF1WEc0Z0lDQWdJQ292WEc0Z0lDQWdaMlYwU1c1MFpYSjJZV3dnS0d4bGRtVnNMQ0J3TENCeEtTQjdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1hHNGdJQ0FnSUNBZ0lHeGxkQ0J6ZFcwZ1BTQXdMQ0JwSUQwZ01DeGNiaUFnSUNBZ0lDQWdJQ0FnSUhCSmMwZHlaV0YwWlhJZ1BTQm1ZV3h6WlN3Z1kyOXRiVzl1VW05dmRDQTlJSFJ5ZFdVc1hHNGdJQ0FnSUNBZ0lDQWdJQ0J3Y21WMlZtRnNkV1VnUFNBd0xDQnVaWGgwVm1Gc2RXVWdQU0F3TzF4dUlDQWdJQ0FnSUNCY2JpQWdJQ0FnSUNBZ2QyaHBiR1VnS0drZ1BEMGdiR1YyWld3cElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhCeVpYWldZV3gxWlNBOUlDaHdJQ1ltSUhBdWRDNXdLU0I4ZkNBd08xeHVJQ0FnSUNBZ0lDQWdJQ0FnYm1WNGRGWmhiSFZsSUQwZ0tIRWdKaVlnY1M1MExuQXBJSHg4SURBN0lDQWdJQ0FnSUNBZ0lDQWdYRzRnSUNBZ0lDQWdJQ0FnSUNBdkx5QWpNU0JqYUdWamF5QnBaaUJ3WVhSb2N5QmhjbVVnYVdSbGJuUnBZMkZzWEc0Z0lDQWdJQ0FnSUNBZ0lDQnBaaUFvWTI5dGJXOXVVbTl2ZENBbUppQndjbVYyVm1Gc2RXVWdJVDA5SUc1bGVIUldZV3gxWlNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHTnZiVzF2YmxKdmIzUWdQU0JtWVd4elpUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQndTWE5IY21WaGRHVnlJRDBnY0hKbGRsWmhiSFZsSUQ0Z2JtVjRkRlpoYkhWbE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnZlZ4dUlDQWdJQ0FnSUNBZ0lDQWdMeThnSXpJZ2NISnZZMlZ6Y3lCMGFHVWdkbUZzZFdVZ2RHOGdZV1JrSUhSdklHbHVkR1Z5ZG1Gc1hHNGdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb2NFbHpSM0psWVhSbGNpa2dleUJ1WlhoMFZtRnNkV1VnUFNCTllYUm9MbkJ2ZHlneUxIUm9hWE11WjJWMFFtbDBRbUZ6WlNocEtTa3RNVHNnZlZ4dUlDQWdJQ0FnSUNBZ0lDQWdhV1lnS0dOdmJXMXZibEp2YjNRZ2ZId2djRWx6UjNKbFlYUmxjaUI4ZkNCcElDRTlQU0JzWlhabGJDa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSE4xYlNBclBTQnVaWGgwVm1Gc2RXVWdMU0J3Y21WMlZtRnNkV1U3SUZ4dUlDQWdJQ0FnSUNBZ0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnpkVzBnS3owZ2JtVjRkRlpoYkhWbElDMGdjSEpsZGxaaGJIVmxJQzBnTVR0Y2JpQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2hwSVQwOWJHVjJaV3dwZXlCemRXMGdLajBnVFdGMGFDNXdiM2NvTWl4MGFHbHpMbWRsZEVKcGRFSmhjMlVvYVNzeEtTazdJSDA3WEc0Z0lDQWdJQ0FnSUNBZ0lDQXZMeUFqTXlCcGRHVnlZWFJsSUc5MlpYSWdjR0YwYUNCamIyNWpZWFJsYm1GMGFXOXVjMXh1SUNBZ0lDQWdJQ0FnSUNBZ2NDQTlJSEFnSmlZZ2NDNWphR2xzWkNCOGZDQnVkV3hzTzF4dUlDQWdJQ0FnSUNBZ0lDQWdjU0E5SUhFZ0ppWWdjUzVqYUdsc1pDQjhmQ0J1ZFd4c08xeHVJQ0FnSUNBZ0lDQWdJQ0FnS3l0cE8xeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQnpkVzA3WEc0Z0lDQWdmVHRjYmlBZ0lDQmNibjA3WEc1Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ1FtRnpaVHRjYmlKZGZRPT0iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVGhyb3duIHdoZW4gdGhlIGluZGV4IGlzIGhpZ2hlciB0aGFuIHRoZSBjdXJyZW50IGxlbmd0aC0xIG9mIHRoZSBhcnJheSwgb3JcbiAqIGxvd2VyIHRoYW4gMC5cbiAqL1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgRXhPdXRPZkJvdW5kcyA9XG5cbi8qKiBcbiAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleCBUaGUgaW5kZXggb3V0IG9mIGJvdW5kcy5cbiAqIEBwYXJhbSB7TnVtYmVyfSBzaXplIFRoZSBzaXplIG9mIHRoZSBhcnJheS5cbiAqL1xuZnVuY3Rpb24gRXhPdXRPZkJvdW5kcyhpbmRleCwgc2l6ZSkge1xuICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRXhPdXRPZkJvdW5kcyk7XG5cbiAgdGhpcy5pbmRleCA9IGluZGV4O1xuICB0aGlzLnNpemUgPSBzaXplO1xufTtcblxuO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEV4T3V0T2ZCb3VuZHM7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbVY0YjNWMGIyWmliM1Z1WkhNdWFuTWlYU3dpYm1GdFpYTWlPbHNpUlhoUGRYUlBaa0p2ZFc1a2N5SXNJbWx1WkdWNElpd2ljMmw2WlNJc0ltMXZaSFZzWlNJc0ltVjRjRzl5ZEhNaVhTd2liV0Z3Y0dsdVozTWlPaUpCUVVGQk96dEJRVVZCT3pzN096czdPMGxCU1UxQkxHRTdPMEZCUlVZN096czdRVUZKUVN4MVFrRkJZVU1zUzBGQllpeEZRVUZ2UWtNc1NVRkJjRUlzUlVGQk1FSTdRVUZCUVRzN1FVRkRkRUlzVDBGQlMwUXNTMEZCVEN4SFFVRmhRU3hMUVVGaU8wRkJRMEVzVDBGQlMwTXNTVUZCVEN4SFFVRlpRU3hKUVVGYU8wRkJRMGdzUXpzN1FVRkRTanM3UVVGRlJFTXNUMEZCVDBNc1QwRkJVQ3hIUVVGcFFrb3NZVUZCYWtJaUxDSm1hV3hsSWpvaVpYaHZkWFJ2Wm1KdmRXNWtjeTVxY3lJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYklpZDFjMlVnYzNSeWFXTjBKenRjYmx4dUx5b3FYRzRnS2lCVWFISnZkMjRnZDJobGJpQjBhR1VnYVc1a1pYZ2dhWE1nYUdsbmFHVnlJSFJvWVc0Z2RHaGxJR04xY25KbGJuUWdiR1Z1WjNSb0xURWdiMllnZEdobElHRnljbUY1TENCdmNseHVJQ29nYkc5M1pYSWdkR2hoYmlBd0xseHVJQ292WEc1amJHRnpjeUJGZUU5MWRFOW1RbTkxYm1SeklIdGNibHh1SUNBZ0lDOHFLaUJjYmlBZ0lDQWdLaUJBY0dGeVlXMGdlMDUxYldKbGNuMGdhVzVrWlhnZ1ZHaGxJR2x1WkdWNElHOTFkQ0J2WmlCaWIzVnVaSE11WEc0Z0lDQWdJQ29nUUhCaGNtRnRJSHRPZFcxaVpYSjlJSE5wZW1VZ1ZHaGxJSE5wZW1VZ2IyWWdkR2hsSUdGeWNtRjVMbHh1SUNBZ0lDQXFMMXh1SUNBZ0lHTnZibk4wY25WamRHOXlJQ2hwYm1SbGVDd2djMmw2WlNrZ2UxeHVJQ0FnSUNBZ0lDQjBhR2x6TG1sdVpHVjRJRDBnYVc1a1pYZzdYRzRnSUNBZ0lDQWdJSFJvYVhNdWMybDZaU0E5SUhOcGVtVTdYRzRnSUNBZ2ZUdGNibjA3WEc1Y2JtMXZaSFZzWlM1bGVIQnZjblJ6SUQwZ1JYaFBkWFJQWmtKdmRXNWtjenRjYmlKZGZRPT0iLCIndXNlIHN0cmljdCc7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBCSSA9IHJlcXVpcmUoJ0JpZ0ludCcpO1xudmFyIFRyaXBsZSA9IHJlcXVpcmUoJy4vdHJpcGxlLmpzJyk7XG52YXIgTFNlcU5vZGUgPSByZXF1aXJlKCcuL2xzZXFub2RlLmpzJyk7XG5cbi8qKlxuICogVW5pcXVlIGFuZCBpbW11dGFibGUgaWRlbnRpZmllciBjb21wb3NlZCBvZiBkaWdpdCwgc291cmNlcywgY291bnRlcnMuXG4gKi9cblxudmFyIElkZW50aWZpZXIgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0Jhc2V9IGJhc2UgVGhlIGJhc2Ugb2YgaWRlbnRpZmllcnMuXG4gICAgICogQHBhcmFtIHtOdW1iZXJbXX0gZGlnaXRzIFRoZSBkaWdpdCAocG9zaXRpb24gaW4gZGVuc2Ugc3BhY2UpLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0W119IHNpdGVzIFRoZSBsaXN0IG9mIHNvdXJjZXMuXG4gICAgICogQHBhcmFtIHtOdW1iZXJbXX0gY291bnRlcnMgVGhlIGxpc3Qgb2YgY291bnRlcnMuXG4gICAgICovXG4gICAgZnVuY3Rpb24gSWRlbnRpZmllcihiYXNlLCBkaWdpdHMpIHtcbiAgICAgICAgdmFyIHNpdGVzID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMl0gOiBbXTtcbiAgICAgICAgdmFyIGNvdW50ZXJzID0gYXJndW1lbnRzLmxlbmd0aCA+IDMgJiYgYXJndW1lbnRzWzNdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbM10gOiBbXTtcblxuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgSWRlbnRpZmllcik7XG5cbiAgICAgICAgdGhpcy5fZCA9IGRpZ2l0cztcbiAgICAgICAgdGhpcy5fcyA9IHNpdGVzO1xuICAgICAgICB0aGlzLl9jID0gY291bnRlcnM7XG5cbiAgICAgICAgdGhpcy5fYmFzZSA9IGJhc2U7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKElkZW50aWZpZXIsIFt7XG4gICAgICAgIGtleTogJ2Zyb21Ob2RlJyxcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXQgdGhlIGQscyxjIHZhbHVlcyBhY2NvcmRpbmcgdG8gdGhlIG5vZGUgaW4gYXJndW1lbnRcbiAgICAgICAgICogQHBhcmFtIHtMU2VxTm9kZX0gbm9kZSBUaGUgbHNlcW5vZGUgY29udGFpbmluZyB0aGUgcGF0aCBpbiB0aGUgdHJlZVxuICAgICAgICAgKiBzdHJ1Y3R1cmUuXG4gICAgICAgICAqIEByZXR1cm4ge0lkZW50aWZpZXJ9IFRoaXMgaWRlbnRpZmllciBtb2RpZmllZC5cbiAgICAgICAgICovXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBmcm9tTm9kZShub2RlKSB7XG4gICAgICAgICAgICAvLyAjMSBwcm9jZXNzIHRoZSBsZW5ndGggb2YgdGhlIHBhdGhcbiAgICAgICAgICAgIHZhciBsZW5ndGggPSAxLFxuICAgICAgICAgICAgICAgIHRlbXBOb2RlID0gbm9kZTtcblxuICAgICAgICAgICAgd2hpbGUgKCF0ZW1wTm9kZS5pc0xlYWYpIHtcbiAgICAgICAgICAgICAgICArK2xlbmd0aDtcbiAgICAgICAgICAgICAgICB0ZW1wTm9kZSA9IHRlbXBOb2RlLmNoaWxkO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8vICMyIGNvcHkgdGhlIHZhbHVlcyBjb250YWluZWQgaW4gdGhlIHBhdGhcbiAgICAgICAgICAgIHRoaXMuX2QgPSBCSS5pbnQyYmlnSW50KDAsIHRoaXMuX2Jhc2UuZ2V0U3VtQml0KGxlbmd0aCAtIDEpKTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgICAgIC8vICMxYSBjb3B5IHRoZSBzaXRlIGlkXG4gICAgICAgICAgICAgICAgdGhpcy5fcy5wdXNoKG5vZGUudC5zKTtcbiAgICAgICAgICAgICAgICAvLyAjMWIgY29weSB0aGUgY291bnRlclxuICAgICAgICAgICAgICAgIHRoaXMuX2MucHVzaChub2RlLnQuYyk7XG4gICAgICAgICAgICAgICAgLy8gIzFjIGNvcHkgdGhlIGRpZ2l0XG4gICAgICAgICAgICAgICAgQkkuYWRkSW50Xyh0aGlzLl9kLCBub2RlLnQucCk7XG4gICAgICAgICAgICAgICAgaWYgKGkgIT09IGxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgICAgICAgICAgQkkubGVmdFNoaWZ0Xyh0aGlzLl9kLCB0aGlzLl9iYXNlLmdldEJpdEJhc2UoaSArIDEpKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIG5vZGUgPSBub2RlLmNoaWxkO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3RvTm9kZScsXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29udmVydCB0aGUgaWRlbnRpZmllciBpbnRvIGEgbm9kZSB3aXRob3V0IGVsZW1lbnQuXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBlIFRoZSBlbGVtZW50IGFzc29jaWF0ZWQgd2l0aCB0aGUgbm9kZS5cbiAgICAgICAgICogQHJldHVybiB7TFNlcU5vZGV9IEFuIExTZXFOb2RlIGNvbnRhaW5pbmcgdGhlIGVsZW1lbnQgYW5kIHRoZSBwYXRoXG4gICAgICAgICAqIGV4dHJhY3RlZCBmcm9tIHRoaXMgaWRlbnRpZmllci5cbiAgICAgICAgICovXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiB0b05vZGUoZSkge1xuICAgICAgICAgICAgdmFyIGRCaXRMZW5ndGggPSB0aGlzLl9iYXNlLmdldFN1bUJpdCh0aGlzLl9jLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgdmFyIHJlc3VsdFBhdGggPSBbXSxcbiAgICAgICAgICAgICAgICBtaW5lID0gdm9pZCAwO1xuXG4gICAgICAgICAgICAvLyAjMSBkZWNvbnN0cnVjdCB0aGUgZGlnaXQgXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICAvLyAjMSB0cnVuY2F0ZSBtaW5lXG4gICAgICAgICAgICAgICAgbWluZSA9IEJJLmR1cCh0aGlzLl9kKTtcbiAgICAgICAgICAgICAgICAvLyAjMWEgc2hpZnQgcmlnaHQgdG8gZXJhc2UgdGhlIHRhaWwgb2YgdGhlIHBhdGhcbiAgICAgICAgICAgICAgICBCSS5yaWdodFNoaWZ0XyhtaW5lLCBkQml0TGVuZ3RoIC0gdGhpcy5fYmFzZS5nZXRTdW1CaXQoaSkpO1xuICAgICAgICAgICAgICAgIC8vICMxYiBjb3B5IHZhbHVlIGluIHRoZSByZXN1bHRcbiAgICAgICAgICAgICAgICByZXN1bHRQYXRoLnB1c2gobmV3IFRyaXBsZShCSS5tb2RJbnQobWluZSwgTWF0aC5wb3coMiwgdGhpcy5fYmFzZS5nZXRCaXRCYXNlKGkpKSksIHRoaXMuX3NbaV0sIHRoaXMuX2NbaV0pKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gbmV3IExTZXFOb2RlKHJlc3VsdFBhdGgsIGUpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdjb21wYXJlVG8nLFxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbXBhcmUgdHdvIGlkZW50aWZpZXJzLlxuICAgICAgICAgKiBAcGFyYW0ge0lkZW50aWZpZXJ9IG8gVGhlIG90aGVyIGlkZW50aWZpZXIuXG4gICAgICAgICAqIEByZXR1cm4ge0ludGVnZXJ9IC0xIGlmIHRoaXMgaXMgbG93ZXIsIDAgaWYgdGhleSBhcmUgZXF1YWwsIDEgaWYgdGhpcyBpc1xuICAgICAgICAgKiBncmVhdGVyLlxuICAgICAgICAgKi9cbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNvbXBhcmVUbyhvKSB7XG4gICAgICAgICAgICB2YXIgZEJpdExlbmd0aCA9IHRoaXMuX2Jhc2UuZ2V0U3VtQml0KHRoaXMuX2MubGVuZ3RoIC0gMSksXG4gICAgICAgICAgICAgICAgb2RCaXRMZW5ndGggPSB0aGlzLl9iYXNlLmdldFN1bUJpdChvLl9jLmxlbmd0aCAtIDEpLFxuICAgICAgICAgICAgICAgIGNvbXBhcmluZyA9IHRydWUsXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gMCxcbiAgICAgICAgICAgICAgICBpID0gMCxcbiAgICAgICAgICAgICAgICBzdW0gPSB2b2lkIDAsXG4gICAgICAgICAgICAgICAgbWluZSA9IHZvaWQgMCxcbiAgICAgICAgICAgICAgICBvdGhlciA9IHZvaWQgMDtcblxuICAgICAgICAgICAgLy8gIzEgQ29tcGFyZSB0aGUgbGlzdCBvZiA8ZCxzLGM+XG4gICAgICAgICAgICB3aGlsZSAoY29tcGFyaW5nICYmIGkgPCBNYXRoLm1pbih0aGlzLl9jLmxlbmd0aCwgby5fYy5sZW5ndGgpKSB7XG4gICAgICAgICAgICAgICAgLy8gY2FuIHN0b3AgYmVmb3JlIHRoZSBlbmQgb2YgZm9yIGxvb3Agd2l6IHJldHVyblxuICAgICAgICAgICAgICAgIHN1bSA9IHRoaXMuX2Jhc2UuZ2V0U3VtQml0KGkpO1xuICAgICAgICAgICAgICAgIC8vICMxYSB0cnVuY2F0ZSBtaW5lXG4gICAgICAgICAgICAgICAgbWluZSA9IEJJLmR1cCh0aGlzLl9kKTtcbiAgICAgICAgICAgICAgICBCSS5yaWdodFNoaWZ0XyhtaW5lLCBkQml0TGVuZ3RoIC0gc3VtKTtcbiAgICAgICAgICAgICAgICAvLyAjMWIgdHJ1bmNhdGUgb3RoZXJcbiAgICAgICAgICAgICAgICBvdGhlciA9IEJJLmR1cChvLl9kKTtcbiAgICAgICAgICAgICAgICBCSS5yaWdodFNoaWZ0XyhvdGhlciwgb2RCaXRMZW5ndGggLSBzdW0pO1xuICAgICAgICAgICAgICAgIC8vICMyIENvbXBhcmUgdHJpcGxlc1xuICAgICAgICAgICAgICAgIC8vICNBIGRpZ2l0XG4gICAgICAgICAgICAgICAgaWYgKCFCSS5lcXVhbHMobWluZSwgb3RoZXIpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChCSS5ncmVhdGVyKG1pbmUsIG90aGVyKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gMTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IC0xO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBjb21wYXJpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyAjQiBzb3VyY2VcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5fc1tpXSAtIG8uX3NbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBhcmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gI0MgY291bnRlclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5fY1tpXSAtIG8uX2NbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0ICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tcGFyaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgKytpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gIzMgY29tcGFyZSBsaXN0IHNpemVcbiAgICAgICAgICAgIGlmIChyZXN1bHQgPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLl9jLmxlbmd0aCAtIG8uX2MubGVuZ3RoO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBJZGVudGlmaWVyO1xufSgpO1xuXG47XG5cbm1vZHVsZS5leHBvcnRzID0gSWRlbnRpZmllcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltbGtaVzUwYVdacFpYSXVhbk1pWFN3aWJtRnRaWE1pT2xzaVFra2lMQ0p5WlhGMWFYSmxJaXdpVkhKcGNHeGxJaXdpVEZObGNVNXZaR1VpTENKSlpHVnVkR2xtYVdWeUlpd2lZbUZ6WlNJc0ltUnBaMmwwY3lJc0luTnBkR1Z6SWl3aVkyOTFiblJsY25NaUxDSmZaQ0lzSWw5eklpd2lYMk1pTENKZlltRnpaU0lzSW01dlpHVWlMQ0pzWlc1bmRHZ2lMQ0owWlcxd1RtOWtaU0lzSW1selRHVmhaaUlzSW1Ob2FXeGtJaXdpYVc1ME1tSnBaMGx1ZENJc0ltZGxkRk4xYlVKcGRDSXNJbWtpTENKd2RYTm9JaXdpZENJc0luTWlMQ0pqSWl3aVlXUmtTVzUwWHlJc0luQWlMQ0pzWldaMFUyaHBablJmSWl3aVoyVjBRbWwwUW1GelpTSXNJbVVpTENKa1FtbDBUR1Z1WjNSb0lpd2ljbVZ6ZFd4MFVHRjBhQ0lzSW0xcGJtVWlMQ0prZFhBaUxDSnlhV2RvZEZOb2FXWjBYeUlzSW0xdlpFbHVkQ0lzSWsxaGRHZ2lMQ0p3YjNjaUxDSnZJaXdpYjJSQ2FYUk1aVzVuZEdnaUxDSmpiMjF3WVhKcGJtY2lMQ0p5WlhOMWJIUWlMQ0p6ZFcwaUxDSnZkR2hsY2lJc0ltMXBiaUlzSW1WeGRXRnNjeUlzSW1keVpXRjBaWElpTENKdGIyUjFiR1VpTENKbGVIQnZjblJ6SWwwc0ltMWhjSEJwYm1keklqb2lRVUZCUVRzN096czdPMEZCUlVFc1NVRkJUVUVzUzBGQlMwTXNVVUZCVVN4UlFVRlNMRU5CUVZnN1FVRkRRU3hKUVVGTlF5eFRRVUZUUkN4UlFVRlJMR0ZCUVZJc1EwRkJaanRCUVVOQkxFbEJRVTFGTEZkQlFWZEdMRkZCUVZFc1pVRkJVaXhEUVVGcVFqczdRVUZGUVRzN096dEpRVWROUnl4Vk96dEJRVVZHT3pzN096czdRVUZOUVN4M1FrRkJZVU1zU1VGQllpeEZRVUZ0UWtNc1RVRkJia0lzUlVGQmMwUTdRVUZCUVN4WlFVRXpRa01zUzBGQk1rSXNkVVZCUVc1Q0xFVkJRVzFDTzBGQlFVRXNXVUZCWmtNc1VVRkJaU3gxUlVGQlNpeEZRVUZKT3p0QlFVRkJPenRCUVVOc1JDeGhRVUZMUXl4RlFVRk1MRWRCUVZWSUxFMUJRVlk3UVVGRFFTeGhRVUZMU1N4RlFVRk1MRWRCUVZWSUxFdEJRVlk3UVVGRFFTeGhRVUZMU1N4RlFVRk1MRWRCUVZWSUxGRkJRVlk3TzBGQlJVRXNZVUZCUzBrc1MwRkJUQ3hIUVVGaFVDeEpRVUZpTzBGQlEwZzdPenM3T3p0QlFVZEVPenM3T3pzN2FVTkJUVlZSTEVrc1JVRkJUVHRCUVVOYU8wRkJRMEVzWjBKQlFVbERMRk5CUVZNc1EwRkJZanRCUVVGQkxHZENRVUZuUWtNc1YwRkJWMFlzU1VGQk0wSTdPMEZCUlVFc2JVSkJRVThzUTBGQlEwVXNVMEZCVTBNc1RVRkJha0lzUlVGQmVVSTdRVUZETlVJc2EwSkJRVVZHTEUxQlFVWTdRVUZEVDBNc01rSkJRVmRCTEZOQlFWTkZMRXRCUVhCQ08wRkJRMGc3UVVGRFJEdEJRVU5CTEdsQ1FVRkxVaXhGUVVGTUxFZEJRVlZVTEVkQlFVZHJRaXhWUVVGSUxFTkJRV01zUTBGQlpDeEZRVUZwUWl4TFFVRkxUaXhMUVVGTUxFTkJRVmRQTEZOQlFWZ3NRMEZCY1VKTUxGTkJRVk1zUTBGQk9VSXNRMEZCYWtJc1EwRkJWanM3UVVGRlFTeHBRa0ZCU3l4SlFVRkpUU3hKUVVGSkxFTkJRV0lzUlVGQlowSkJMRWxCUVVsT0xFMUJRWEJDTEVWQlFUWkNMRVZCUVVWTkxFTkJRUzlDTEVWQlFXdERPMEZCUXpsQ08wRkJRMEVzY1VKQlFVdFdMRVZCUVV3c1EwRkJVVmNzU1VGQlVpeERRVUZoVWl4TFFVRkxVeXhEUVVGTUxFTkJRVTlETEVOQlFYQkNPMEZCUTBFN1FVRkRRU3h4UWtGQlMxb3NSVUZCVEN4RFFVRlJWU3hKUVVGU0xFTkJRV0ZTTEV0QlFVdFRMRU5CUVV3c1EwRkJUMFVzUTBGQmNFSTdRVUZEUVR0QlFVTkJlRUlzYlVKQlFVZDVRaXhQUVVGSUxFTkJRVmNzUzBGQlMyaENMRVZCUVdoQ0xFVkJRVzlDU1N4TFFVRkxVeXhEUVVGTUxFTkJRVTlKTEVOQlFUTkNPMEZCUTBFc2IwSkJRVWxPTEUxQlFVMU9MRk5CUVZNc1EwRkJia0lzUlVGQmMwSTdRVUZEYkVKa0xIVkNRVUZITWtJc1ZVRkJTQ3hEUVVGakxFdEJRVXRzUWl4RlFVRnVRaXhGUVVGMVFpeExRVUZMUnl4TFFVRk1MRU5CUVZkblFpeFZRVUZZTEVOQlFYTkNVaXhKUVVGRkxFTkJRWGhDTEVOQlFYWkNPMEZCUTBnN1FVRkRSRkFzZFVKQlFVOUJMRXRCUVV0SkxFdEJRVm83UVVGRFNEczdRVUZGUkN4dFFrRkJUeXhKUVVGUU8wRkJRMGc3T3pzN08wRkJSVVE3T3pzN096c3JRa0ZOVVZrc1F5eEZRVUZITzBGQlExQXNaMEpCUVUxRExHRkJRV0VzUzBGQlMyeENMRXRCUVV3c1EwRkJWMDhzVTBGQldDeERRVUZ4UWl4TFFVRkxVaXhGUVVGTUxFTkJRVkZITEUxQlFWSXNSMEZCYVVJc1EwRkJkRU1zUTBGQmJrSTdRVUZEUVN4blFrRkJTV2xDTEdGQlFXRXNSVUZCYWtJN1FVRkJRU3huUWtGQmNVSkRMR0ZCUVhKQ096dEJRVVZCTzBGQlEwRXNhVUpCUVVzc1NVRkJTVm9zU1VGQlNTeERRVUZpTEVWQlFXZENRU3hKUVVGSkxFdEJRVXRVTEVWQlFVd3NRMEZCVVVjc1RVRkJOVUlzUlVGQmIwTXNSVUZCUlUwc1EwRkJkRU1zUlVGQmVVTTdRVUZEY2tNN1FVRkRRVmtzZFVKQlFVOW9ReXhIUVVGSGFVTXNSMEZCU0N4RFFVRlBMRXRCUVV0NFFpeEZRVUZhTEVOQlFWQTdRVUZEUVR0QlFVTkJWQ3h0UWtGQlIydERMRmRCUVVnc1EwRkJaVVlzU1VGQlppeEZRVUZ4UWtZc1lVRkJZU3hMUVVGTGJFSXNTMEZCVEN4RFFVRlhUeXhUUVVGWUxFTkJRWEZDUXl4RFFVRnlRaXhEUVVGc1F6dEJRVU5CTzBGQlEwRlhMREpDUVVGWFZpeEpRVUZZTEVOQlEwa3NTVUZCU1c1Q0xFMUJRVW9zUTBGQlYwWXNSMEZCUjIxRExFMUJRVWdzUTBGQlZVZ3NTVUZCVml4RlFVTlZTU3hMUVVGTFF5eEhRVUZNTEVOQlFWTXNRMEZCVkN4RlFVRlpMRXRCUVV0NlFpeExRVUZNTEVOQlFWZG5RaXhWUVVGWUxFTkJRWE5DVWl4RFFVRjBRaXhEUVVGYUxFTkJSRllzUTBGQldDeEZRVVZYTEV0QlFVdFdMRVZCUVV3c1EwRkJVVlVzUTBGQlVpeERRVVpZTEVWQlIxY3NTMEZCUzFRc1JVRkJUQ3hEUVVGUlV5eERRVUZTTEVOQlNGZ3NRMEZFU2p0QlFVdElPMEZCUTBRc2JVSkJRVThzU1VGQlNXcENMRkZCUVVvc1EwRkJZVFJDTEZWQlFXSXNSVUZCZVVKR0xFTkJRWHBDTEVOQlFWQTdRVUZEU0RzN096czdRVUZIUkRzN096czdPMnREUVUxWFV5eERMRVZCUVVjN1FVRkRWaXhuUWtGQlNWSXNZVUZCWVN4TFFVRkxiRUlzUzBGQlRDeERRVUZYVHl4VFFVRllMRU5CUVhGQ0xFdEJRVXRTTEVWQlFVd3NRMEZCVVVjc1RVRkJVaXhIUVVGcFFpeERRVUYwUXl4RFFVRnFRanRCUVVGQkxHZENRVU5KZVVJc1kwRkJZeXhMUVVGTE0wSXNTMEZCVEN4RFFVRlhUeXhUUVVGWUxFTkJRWEZDYlVJc1JVRkJSVE5DTEVWQlFVWXNRMEZCUzBjc1RVRkJUQ3hIUVVGakxFTkJRVzVETEVOQlJHeENPMEZCUVVFc1owSkJSVWt3UWl4WlFVRlpMRWxCUm1oQ08wRkJRVUVzWjBKQlIwbERMRk5CUVZNc1EwRklZanRCUVVGQkxHZENRVWRuUW5KQ0xFbEJRVWtzUTBGSWNFSTdRVUZCUVN4blFrRkpTWE5DTEZsQlNrbzdRVUZCUVN4blFrRkpVMVlzWVVGS1ZEdEJRVUZCTEdkQ1FVbGxWeXhqUVVwbU96dEJRVTFCTzBGQlEwRXNiVUpCUVU5SUxHRkJRV0Z3UWl4SlFVRkpaMElzUzBGQlMxRXNSMEZCVEN4RFFVRlRMRXRCUVV0cVF5eEZRVUZNTEVOQlFWRkhMRTFCUVdwQ0xFVkJRWGxDZDBJc1JVRkJSVE5DTEVWQlFVWXNRMEZCUzBjc1RVRkJPVUlzUTBGQmVFSXNSVUZCWjBVN1FVRkROVVE3UVVGRFFUUkNMSE5DUVVGTkxFdEJRVXM1UWl4TFFVRk1MRU5CUVZkUExGTkJRVmdzUTBGQmNVSkRMRU5CUVhKQ0xFTkJRVTQ3UVVGRFFUdEJRVU5CV1N4MVFrRkJUMmhETEVkQlFVZHBReXhIUVVGSUxFTkJRVThzUzBGQlMzaENMRVZCUVZvc1EwRkJVRHRCUVVOQlZDeHRRa0ZCUjJ0RExGZEJRVWdzUTBGQlpVWXNTVUZCWml4RlFVRnhRa1lzWVVGQllWa3NSMEZCYkVNN1FVRkRRVHRCUVVOQlF5eDNRa0ZCVVRORExFZEJRVWRwUXl4SFFVRklMRU5CUVU5TExFVkJRVVUzUWl4RlFVRlVMRU5CUVZJN1FVRkRRVlFzYlVKQlFVZHJReXhYUVVGSUxFTkJRV1ZUTEV0QlFXWXNSVUZCYzBKS0xHTkJRV05ITEVkQlFYQkRPMEZCUTBFN1FVRkRRVHRCUVVOQkxHOUNRVUZKTEVOQlFVTXhReXhIUVVGSE5rTXNUVUZCU0N4RFFVRlZZaXhKUVVGV0xFVkJRV2RDVnl4TFFVRm9RaXhEUVVGTUxFVkJRVFpDTzBGQlEzcENMSGRDUVVGSk0wTXNSMEZCUnpoRExFOUJRVWdzUTBGQlYyUXNTVUZCV0N4RlFVRnBRbGNzUzBGQmFrSXNRMEZCU2l4RlFVRTJRanRCUVVONlFrWXNhVU5CUVZNc1EwRkJWRHRCUVVOSUxIRkNRVVpFTEUxQlJVODdRVUZEU0VFc2FVTkJRVk1zUTBGQlF5eERRVUZXTzBGQlEwZzdRVUZEUkVRc1owTkJRVmtzUzBGQldqdEJRVU5JTEdsQ1FWQkVMRTFCVDA4N1FVRkRTRHRCUVVOQlF5dzJRa0ZCVXl4TFFVRkxMMElzUlVGQlRDeERRVUZSVlN4RFFVRlNMRWxCUVdGclFpeEZRVUZGTlVJc1JVRkJSaXhEUVVGTFZTeERRVUZNTEVOQlFYUkNPMEZCUTBFc2QwSkJRVWx4UWl4WFFVRlhMRU5CUVdZc1JVRkJhMEk3UVVGRFpFUXNiME5CUVZrc1MwRkJXanRCUVVOSUxIRkNRVVpFTEUxQlJVODdRVUZEU0R0QlFVTkJReXhwUTBGQlV5eExRVUZMT1VJc1JVRkJUQ3hEUVVGUlV5eERRVUZTTEVsQlFXRnJRaXhGUVVGRk0wSXNSVUZCUml4RFFVRkxVeXhEUVVGTUxFTkJRWFJDTzBGQlEwRXNORUpCUVVseFFpeFhRVUZYTEVOQlFXWXNSVUZCYTBJN1FVRkRaRVFzZDBOQlFWa3NTMEZCV2p0QlFVTklPMEZCUTBvN1FVRkRTanRCUVVORUxHdENRVUZGY0VJc1EwRkJSanRCUVVOSU96dEJRVVZFTzBGQlEwRXNaMEpCUVVseFFpeFhRVUZYTEVOQlFXWXNSVUZCYVVJN1FVRkRZa0VzZVVKQlFWTXNTMEZCU3psQ0xFVkJRVXdzUTBGQlVVY3NUVUZCVWl4SFFVRnBRbmRDTEVWQlFVVXpRaXhGUVVGR0xFTkJRVXRITEUxQlFTOUNPMEZCUTBnN08wRkJSVVFzYlVKQlFVOHlRaXhOUVVGUU8wRkJRMGc3T3pzN096dEJRVU5LT3p0QlFVZEVUU3hQUVVGUFF5eFBRVUZRTEVkQlFXbENOVU1zVlVGQmFrSWlMQ0ptYVd4bElqb2lhV1JsYm5ScFptbGxjaTVxY3lJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYklpZDFjMlVnYzNSeWFXTjBKenRjYmx4dVkyOXVjM1FnUWtrZ1BTQnlaWEYxYVhKbEtDZENhV2RKYm5RbktUdGNibU52Ym5OMElGUnlhWEJzWlNBOUlISmxjWFZwY21Vb0p5NHZkSEpwY0d4bExtcHpKeWs3WEc1amIyNXpkQ0JNVTJWeFRtOWtaU0E5SUhKbGNYVnBjbVVvSnk0dmJITmxjVzV2WkdVdWFuTW5LVHRjYmx4dUx5b3FYRzRnS2lCVmJtbHhkV1VnWVc1a0lHbHRiWFYwWVdKc1pTQnBaR1Z1ZEdsbWFXVnlJR052YlhCdmMyVmtJRzltSUdScFoybDBMQ0J6YjNWeVkyVnpMQ0JqYjNWdWRHVnljeTVjYmlBcUwxeHVZMnhoYzNNZ1NXUmxiblJwWm1sbGNpQjdYRzRnSUNBZ1hHNGdJQ0FnTHlvcVhHNGdJQ0FnSUNvZ1FIQmhjbUZ0SUh0Q1lYTmxmU0JpWVhObElGUm9aU0JpWVhObElHOW1JR2xrWlc1MGFXWnBaWEp6TGx4dUlDQWdJQ0FxSUVCd1lYSmhiU0I3VG5WdFltVnlXMTE5SUdScFoybDBjeUJVYUdVZ1pHbG5hWFFnS0hCdmMybDBhVzl1SUdsdUlHUmxibk5sSUhOd1lXTmxLUzVjYmlBZ0lDQWdLaUJBY0dGeVlXMGdlMDlpYW1WamRGdGRmU0J6YVhSbGN5QlVhR1VnYkdsemRDQnZaaUJ6YjNWeVkyVnpMbHh1SUNBZ0lDQXFJRUJ3WVhKaGJTQjdUblZ0WW1WeVcxMTlJR052ZFc1MFpYSnpJRlJvWlNCc2FYTjBJRzltSUdOdmRXNTBaWEp6TGx4dUlDQWdJQ0FxTDF4dUlDQWdJR052Ym5OMGNuVmpkRzl5SUNoaVlYTmxMQ0JrYVdkcGRITXNJSE5wZEdWeklEMGdXMTBzSUdOdmRXNTBaWEp6SUQwZ1cxMHBJSHRjYmlBZ0lDQWdJQ0FnZEdocGN5NWZaQ0E5SUdScFoybDBjenRjYmlBZ0lDQWdJQ0FnZEdocGN5NWZjeUE5SUhOcGRHVnpPMXh1SUNBZ0lDQWdJQ0IwYUdsekxsOWpJRDBnWTI5MWJuUmxjbk03WEc0Z0lDQWdJQ0FnSUZ4dUlDQWdJQ0FnSUNCMGFHbHpMbDlpWVhObElEMGdZbUZ6WlR0Y2JpQWdJQ0I5TzF4dVhHNWNiaUFnSUNBdktpcGNiaUFnSUNBZ0tpQlRaWFFnZEdobElHUXNjeXhqSUhaaGJIVmxjeUJoWTJOdmNtUnBibWNnZEc4Z2RHaGxJRzV2WkdVZ2FXNGdZWEpuZFcxbGJuUmNiaUFnSUNBZ0tpQkFjR0Z5WVcwZ2UweFRaWEZPYjJSbGZTQnViMlJsSUZSb1pTQnNjMlZ4Ym05a1pTQmpiMjUwWVdsdWFXNW5JSFJvWlNCd1lYUm9JR2x1SUhSb1pTQjBjbVZsWEc0Z0lDQWdJQ29nYzNSeWRXTjBkWEpsTGx4dUlDQWdJQ0FxSUVCeVpYUjFjbTRnZTBsa1pXNTBhV1pwWlhKOUlGUm9hWE1nYVdSbGJuUnBabWxsY2lCdGIyUnBabWxsWkM1Y2JpQWdJQ0FnS2k5Y2JpQWdJQ0JtY205dFRtOWtaU0FvYm05a1pTa2dlMXh1SUNBZ0lDQWdJQ0F2THlBak1TQndjbTlqWlhOeklIUm9aU0JzWlc1bmRHZ2diMllnZEdobElIQmhkR2hjYmlBZ0lDQWdJQ0FnYkdWMElHeGxibWQwYUNBOUlERXNJSFJsYlhCT2IyUmxJRDBnYm05a1pUdGNiaUFnSUNBZ0lDQWdYRzRnSUNBZ0lDQWdJSGRvYVd4bElDZ2hkR1Z0Y0U1dlpHVXVhWE5NWldGbUtTQjdYRzVjZENBZ0lDQXJLMnhsYm1kMGFEdGNiaUFnSUNBZ0lDQWdJQ0FnSUhSbGJYQk9iMlJsSUQwZ2RHVnRjRTV2WkdVdVkyaHBiR1E3WEc0Z0lDQWdJQ0FnSUgwN1hHNGdJQ0FnSUNBZ0lDOHZJQ015SUdOdmNIa2dkR2hsSUhaaGJIVmxjeUJqYjI1MFlXbHVaV1FnYVc0Z2RHaGxJSEJoZEdoY2JpQWdJQ0FnSUNBZ2RHaHBjeTVmWkNBOUlFSkpMbWx1ZERKaWFXZEpiblFvTUN3Z2RHaHBjeTVmWW1GelpTNW5aWFJUZFcxQ2FYUW9iR1Z1WjNSb0lDMGdNU2twTzF4dUlDQWdJQ0FnSUNCY2JpQWdJQ0FnSUNBZ1ptOXlJQ2hzWlhRZ2FTQTlJREE3SUdrZ1BDQnNaVzVuZEdnZ095QXJLMmtwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQzh2SUNNeFlTQmpiM0I1SUhSb1pTQnphWFJsSUdsa1hHNGdJQ0FnSUNBZ0lDQWdJQ0IwYUdsekxsOXpMbkIxYzJnb2JtOWtaUzUwTG5NcE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnTHk4Z0l6RmlJR052Y0hrZ2RHaGxJR052ZFc1MFpYSmNiaUFnSUNBZ0lDQWdJQ0FnSUhSb2FYTXVYMk11Y0hWemFDaHViMlJsTG5RdVl5azdYRzRnSUNBZ0lDQWdJQ0FnSUNBdkx5QWpNV01nWTI5d2VTQjBhR1VnWkdsbmFYUmNiaUFnSUNBZ0lDQWdJQ0FnSUVKSkxtRmtaRWx1ZEY4b2RHaHBjeTVmWkN3Z2JtOWtaUzUwTG5BcE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnYVdZZ0tHa2dJVDA5SUd4bGJtZDBhQ0F0SURFcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQkNTUzVzWldaMFUyaHBablJmS0hSb2FYTXVYMlFzSUhSb2FYTXVYMkpoYzJVdVoyVjBRbWwwUW1GelpTaHBLekVwS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJSDA3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnViMlJsSUQwZ2JtOWtaUzVqYUdsc1pEdGNiaUFnSUNBZ0lDQWdmVHRjYmlBZ0lDQWdJQ0FnWEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUIwYUdsek8xeHVJQ0FnSUgwN1hHNGdJQ0FnWEc0Z0lDQWdMeW9xWEc0Z0lDQWdJQ29nUTI5dWRtVnlkQ0IwYUdVZ2FXUmxiblJwWm1sbGNpQnBiblJ2SUdFZ2JtOWtaU0IzYVhSb2IzVjBJR1ZzWlcxbGJuUXVYRzRnSUNBZ0lDb2dRSEJoY21GdElIdFBZbXBsWTNSOUlHVWdWR2hsSUdWc1pXMWxiblFnWVhOemIyTnBZWFJsWkNCM2FYUm9JSFJvWlNCdWIyUmxMbHh1SUNBZ0lDQXFJRUJ5WlhSMWNtNGdlMHhUWlhGT2IyUmxmU0JCYmlCTVUyVnhUbTlrWlNCamIyNTBZV2x1YVc1bklIUm9aU0JsYkdWdFpXNTBJR0Z1WkNCMGFHVWdjR0YwYUZ4dUlDQWdJQ0FxSUdWNGRISmhZM1JsWkNCbWNtOXRJSFJvYVhNZ2FXUmxiblJwWm1sbGNpNWNiaUFnSUNBZ0tpOWNiaUFnSUNCMGIwNXZaR1VnS0dVcElIdGNiaUFnSUNBZ0lDQWdZMjl1YzNRZ1pFSnBkRXhsYm1kMGFDQTlJSFJvYVhNdVgySmhjMlV1WjJWMFUzVnRRbWwwS0hSb2FYTXVYMk11YkdWdVozUm9JQzBnTVNrN1hHNGdJQ0FnSUNBZ0lHeGxkQ0J5WlhOMWJIUlFZWFJvSUQwZ1cxMHNJRzFwYm1VN1hHNGdJQ0FnSUNBZ0lGeHVJQ0FnSUNBZ0lDQXZMeUFqTVNCa1pXTnZibk4wY25WamRDQjBhR1VnWkdsbmFYUWdYRzRnSUNBZ0lDQWdJR1p2Y2lBb2JHVjBJR2tnUFNBd095QnBJRHdnZEdocGN5NWZZeTVzWlc1bmRHZzdJQ3NyYVNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnTHk4Z0l6RWdkSEoxYm1OaGRHVWdiV2x1WlZ4dUlDQWdJQ0FnSUNBZ0lDQWdiV2x1WlNBOUlFSkpMbVIxY0NoMGFHbHpMbDlrS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJQzh2SUNNeFlTQnphR2xtZENCeWFXZG9kQ0IwYnlCbGNtRnpaU0IwYUdVZ2RHRnBiQ0J2WmlCMGFHVWdjR0YwYUZ4dUlDQWdJQ0FnSUNBZ0lDQWdRa2t1Y21sbmFIUlRhR2xtZEY4b2JXbHVaU3dnWkVKcGRFeGxibWQwYUNBdElIUm9hWE11WDJKaGMyVXVaMlYwVTNWdFFtbDBLR2twS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJQzh2SUNNeFlpQmpiM0I1SUhaaGJIVmxJR2x1SUhSb1pTQnlaWE4xYkhSY2JpQWdJQ0FnSUNBZ0lDQWdJSEpsYzNWc2RGQmhkR2d1Y0hWemFDaGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnVaWGNnVkhKcGNHeGxLRUpKTG0xdlpFbHVkQ2h0YVc1bExGeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRTFoZEdndWNHOTNLRElzSUhSb2FYTXVYMkpoYzJVdVoyVjBRbWwwUW1GelpTaHBLU2twTEZ4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RHaHBjeTVmYzF0cFhTeGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSFJvYVhNdVgyTmJhVjBwS1R0Y2JpQWdJQ0FnSUNBZ2ZUdGNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlHNWxkeUJNVTJWeFRtOWtaU2h5WlhOMWJIUlFZWFJvTENCbEtUdGNiaUFnSUNCOU8xeHVYRzVjYmlBZ0lDQXZLaXBjYmlBZ0lDQWdLaUJEYjIxd1lYSmxJSFIzYnlCcFpHVnVkR2xtYVdWeWN5NWNiaUFnSUNBZ0tpQkFjR0Z5WVcwZ2UwbGtaVzUwYVdacFpYSjlJRzhnVkdobElHOTBhR1Z5SUdsa1pXNTBhV1pwWlhJdVhHNGdJQ0FnSUNvZ1FISmxkSFZ5YmlCN1NXNTBaV2RsY24wZ0xURWdhV1lnZEdocGN5QnBjeUJzYjNkbGNpd2dNQ0JwWmlCMGFHVjVJR0Z5WlNCbGNYVmhiQ3dnTVNCcFppQjBhR2x6SUdselhHNGdJQ0FnSUNvZ1ozSmxZWFJsY2k1Y2JpQWdJQ0FnS2k5Y2JpQWdJQ0JqYjIxd1lYSmxWRzhnS0c4cElIdGNiaUFnSUNBZ0lDQWdiR1YwSUdSQ2FYUk1aVzVuZEdnZ1BTQjBhR2x6TGw5aVlYTmxMbWRsZEZOMWJVSnBkQ2gwYUdsekxsOWpMbXhsYm1kMGFDQXRJREVwTEZ4dUlDQWdJQ0FnSUNBZ0lDQWdiMlJDYVhSTVpXNW5kR2dnUFNCMGFHbHpMbDlpWVhObExtZGxkRk4xYlVKcGRDaHZMbDlqTG14bGJtZDBhQ0F0SURFcExGeHVJQ0FnSUNBZ0lDQWdJQ0FnWTI5dGNHRnlhVzVuSUQwZ2RISjFaU3hjYmlBZ0lDQWdJQ0FnSUNBZ0lISmxjM1ZzZENBOUlEQXNJR2tnUFNBd0xGeHVJQ0FnSUNBZ0lDQWdJQ0FnYzNWdExDQnRhVzVsTENCdmRHaGxjanRjYmlBZ0lDQWdJQ0FnWEc0Z0lDQWdJQ0FnSUM4dklDTXhJRU52YlhCaGNtVWdkR2hsSUd4cGMzUWdiMllnUEdRc2N5eGpQbHh1SUNBZ0lDQWdJQ0IzYUdsc1pTQW9ZMjl0Y0dGeWFXNW5JQ1ltSUdrZ1BDQk5ZWFJvTG0xcGJpaDBhR2x6TGw5akxteGxibWQwYUN3Z2J5NWZZeTVzWlc1bmRHZ3BJQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdMeThnWTJGdUlITjBiM0FnWW1WbWIzSmxJSFJvWlNCbGJtUWdiMllnWm05eUlHeHZiM0FnZDJsNklISmxkSFZ5Ymx4dUlDQWdJQ0FnSUNBZ0lDQWdjM1Z0SUQwZ2RHaHBjeTVmWW1GelpTNW5aWFJUZFcxQ2FYUW9hU2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQXZMeUFqTVdFZ2RISjFibU5oZEdVZ2JXbHVaVnh1SUNBZ0lDQWdJQ0FnSUNBZ2JXbHVaU0E5SUVKSkxtUjFjQ2gwYUdsekxsOWtLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lFSkpMbkpwWjJoMFUyaHBablJmS0cxcGJtVXNJR1JDYVhSTVpXNW5kR2dnTFNCemRXMHBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0x5OGdJekZpSUhSeWRXNWpZWFJsSUc5MGFHVnlYRzRnSUNBZ0lDQWdJQ0FnSUNCdmRHaGxjaUE5SUVKSkxtUjFjQ2h2TGw5a0tUdGNiaUFnSUNBZ0lDQWdJQ0FnSUVKSkxuSnBaMmgwVTJocFpuUmZLRzkwYUdWeUxDQnZaRUpwZEV4bGJtZDBhQ0F0SUhOMWJTazdYRzRnSUNBZ0lDQWdJQ0FnSUNBdkx5QWpNaUJEYjIxd1lYSmxJSFJ5YVhCc1pYTmNiaUFnSUNBZ0lDQWdJQ0FnSUM4dklDTkJJR1JwWjJsMFhHNGdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb0lVSkpMbVZ4ZFdGc2N5aHRhVzVsTENCdmRHaGxjaWtwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCcFppQW9Ra2t1WjNKbFlYUmxjaWh0YVc1bExDQnZkR2hsY2lrcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnY21WemRXeDBJRDBnTVR0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnlaWE4xYkhRZ1BTQXRNVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5TzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUdOdmJYQmhjbWx1WnlBOUlHWmhiSE5sTzF4dUlDQWdJQ0FnSUNBZ0lDQWdmU0JsYkhObElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQXZMeUFqUWlCemIzVnlZMlZjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J5WlhOMWJIUWdQU0IwYUdsekxsOXpXMmxkSUMwZ2J5NWZjMXRwWFRzZ1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLSEpsYzNWc2RDQWhQVDBnTUNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JqYjIxd1lYSnBibWNnUFNCbVlXeHpaVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBdkx5QWpReUJqYjNWdWRHVnlYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhKbGMzVnNkQ0E5SUhSb2FYTXVYMk5iYVYwZ0xTQnZMbDlqVzJsZE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb2NtVnpkV3gwSUNFOVBTQXdLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JqYjIxd1lYSnBibWNnUFNCbVlXeHpaVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2ZUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2ZUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNzcmFUdGNiaUFnSUNBZ0lDQWdmVHRjYmlBZ0lDQWdJQ0FnWEc0Z0lDQWdJQ0FnSUM4dklDTXpJR052YlhCaGNtVWdiR2x6ZENCemFYcGxYRzRnSUNBZ0lDQWdJR2xtSUNoeVpYTjFiSFFnUFQwOUlEQXBlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2NtVnpkV3gwSUQwZ2RHaHBjeTVmWXk1c1pXNW5kR2dnTFNCdkxsOWpMbXhsYm1kMGFEdGNiaUFnSUNBZ0lDQWdmVHRjYmlBZ0lDQWdJQ0FnWEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUJ5WlhOMWJIUTdYRzRnSUNBZ2ZUc2dJQ0FnWEc1OU8xeHVYRzVjYm0xdlpIVnNaUzVsZUhCdmNuUnpJRDBnU1dSbGJuUnBabWxsY2p0Y2JpSmRmUT09IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgVHJpcGxlID0gcmVxdWlyZSgnLi90cmlwbGUuanMnKTtcblxuLyoqXG4gKiBBIG5vZGUgb2YgdGhlIExTZXEgdHJlZS5cbiAqL1xuXG52YXIgTFNlcU5vZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtUcmlwbGVbXX0gdHJpcGxlcyBUaGUgbGlzdCBvZiB0cmlwbGVzIGNvbXBvc2luZyB0aGUgcGF0aCB0byB0aGVcbiAgICAgKiBlbGVtZW50LlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBlbGVtZW50IFRoZSBlbGVtZW50IHRvIGluc2VydCBpbiB0aGUgc3RydWN0dXJlLCBlLmcuLCBhXG4gICAgICogY2hhcmFjdGVyIGluIGEgdGV4dCBkb2N1bWVudC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBMU2VxTm9kZSgpIHtcbiAgICAgICAgdmFyIHRyaXBsZXMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IFtdO1xuICAgICAgICB2YXIgZWxlbWVudCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogbnVsbDtcblxuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTFNlcU5vZGUpO1xuXG4gICAgICAgIHRoaXMudCA9IHRyaXBsZXMuc2hpZnQoKTtcbiAgICAgICAgdGhpcy5lID0gbnVsbDtcbiAgICAgICAgaWYgKHRyaXBsZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmUgPSBlbGVtZW50O1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLnN1YkNvdW50ZXIgPSB0cmlwbGVzLmxlbmd0aCA+IDAgJiYgMSB8fCAwO1xuICAgICAgICB0aGlzLmNoaWxkcmVuID0gW107XG4gICAgICAgIHRyaXBsZXMubGVuZ3RoID4gMCAmJiB0aGlzLmNoaWxkcmVuLnB1c2gobmV3IExTZXFOb2RlKHRyaXBsZXMsIGVsZW1lbnQpKTtcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoTFNlcU5vZGUsIFt7XG4gICAgICAgIGtleTogJ2NvbXBhcmVUbycsXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ29tcGFyYXRvciBiZXR3ZWVuIHRvIExTZXFOb2Rlcy5cbiAgICAgICAgICogQHBhcmFtIHtMU2VxTm9kZX0gbyBUaGUgb3RoZXIgTFNlcU5vZGUgdG8gY29tcGFyZSB0by5cbiAgICAgICAgICovXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBjb21wYXJlVG8obykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudC5jb21wYXJlVG8oby50KTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnYWRkJyxcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBBZGQgYSBub2RlIHRvIHRoZSBjdXJyZW50IG5vZGUuXG4gICAgICAgICAqIEBwYXJhbSB7TFNlcU5vZGV9IG5vZGUgVGhlIG5vZGUgdG8gYWRkIGFzIGEgY2hpbGRyZW4gb2YgdGhpcyBub2RlLlxuICAgICAgICAgKiBAcmV0dXJuIHtCb29sZWFufSBGYWxzZSBpZiB0aGUgZWxlbWVudCBhbHJlYWR5IGV4aXN0cywgVHJ1ZSBvdGhlcndpc2UuXG4gICAgICAgICAqL1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gYWRkKG5vZGUpIHtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMuX2JpbmFyeUluZGV4T2Yobm9kZSk7XG5cbiAgICAgICAgICAgIC8vICMxIGlmIHRoZSBwYXRoIGRvIG5vIGV4aXN0LCBjcmVhdGUgaXRcbiAgICAgICAgICAgIGlmICghdGhpcy5fY29udGFpbnMobm9kZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuLnNwbGljZSgtaW5kZXgsIDAsIG5vZGUpO1xuICAgICAgICAgICAgICAgIHRoaXMuc3ViQ291bnRlciArPSAxO1xuICAgICAgICAgICAgICAgIC8vICMyIG90aGVyd2lzZSwgY29udGludWUgdG8gZXhwbG9yZSB0aGUgc3VidHJlZXNcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobm9kZS5jaGlsZHJlbi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICAvLyAjMmEgY2hlY2sgaWYgdGhlIGVsZW1lbnQgYWxyZWFkeSBleGlzdHNcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGlsZHJlbltpbmRleF0uZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGlsZHJlbltpbmRleF0uZSA9IG5vZGUuZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdWJDb3VudGVyICs9IDE7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAvLyAjMyBpZiBkaWRub3QgZXhpc3QsIGluY3JlbWVudCB0aGUgY291bnRlclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmNoaWxkcmVuW2luZGV4XS5hZGQobm9kZS5jaGlsZCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN1YkNvdW50ZXIgKz0gMTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZGVsJyxcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZW1vdmUgdGhlIG5vZGUgb2YgdGhlIHRyZWUgYW5kIGFsbCBub2RlIHdpdGhpbiBwYXRoIGJlaW5nIHVzZWxlc3MuXG4gICAgICAgICAqIEBwYXJhbSB7TFNlcU5vZGV9IG5vZGUgdGhlIG5vZGUgY29udGFpbmluZyB0aGUgcGF0aCB0byByZW1vdmVcbiAgICAgICAgICogQHJldHVybiB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgbm9kZSBoYXMgYmVlbiByZW1vdmVkLCBGYWxzZSBpZiBpdCBkb2VzIG5vdFxuICAgICAgICAgKiBleGlzdC5cbiAgICAgICAgICovXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBkZWwobm9kZSkge1xuICAgICAgICAgICAgdmFyIGluZGV4ZXMgPSB0aGlzLl9nZXRJbmRleGVzKG5vZGUpO1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRUcmVlID0gdGhpcyxcbiAgICAgICAgICAgICAgICBpID0gMCxcbiAgICAgICAgICAgICAgICBpc1NwbGl0dGVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIC8vICMxIFRoZSBlbGVtZW50IGRvZXMgbm90IGV4aXN0cywgc3RvcFxuICAgICAgICAgICAgaWYgKGluZGV4ZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgLy8gIzIgQ3Jhd2wgdGhlIHBhdGggYW5kIHJlbW92ZSB0aGUgZWxlbWVudFxuICAgICAgICAgICAgY3VycmVudFRyZWUuc3ViQ291bnRlciAtPSAxO1xuICAgICAgICAgICAgd2hpbGUgKGkgPCBpbmRleGVzLmxlbmd0aCAmJiAhaXNTcGxpdHRlZCkge1xuICAgICAgICAgICAgICAgIHZhciBpc0xhc3QgPSBjdXJyZW50VHJlZS5jaGlsZHJlbltpbmRleGVzW2ldXS5faGFzRWxlbWVudCAmJiBpID09PSBpbmRleGVzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgaWYgKCFpc0xhc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFRyZWUuY2hpbGRyZW5baW5kZXhlc1tpXV0uc3ViQ291bnRlciAtPSAxO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRUcmVlLmNoaWxkcmVuW2luZGV4ZXNbaV1dLnN1YkNvdW50ZXIgPD0gMCAmJiAoIWN1cnJlbnRUcmVlLmNoaWxkcmVuW2luZGV4ZXNbaV1dLl9oYXNFbGVtZW50IHx8IGlzTGFzdCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFRyZWUuY2hpbGRyZW4uc3BsaWNlKGluZGV4ZXNbaV0sIDEpO1xuICAgICAgICAgICAgICAgICAgICBpc1NwbGl0dGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGN1cnJlbnRUcmVlID0gY3VycmVudFRyZWUuY2hpbGRyZW5baW5kZXhlc1tpXV07XG4gICAgICAgICAgICAgICAgKytpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmICghaXNTcGxpdHRlZCkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRUcmVlLmUgPSBudWxsO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2luZGV4T2YnLFxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoZSBvcmRlcmVkIHRyZWUgY2FuIGJlIGxpbmVhcml6ZWQgaW50byBhIHNlcXVlbmNlLiBUaGlzIGZ1bmN0aW9uIGdldCB0aGVcbiAgICAgICAgICogaW5kZXggb2YgdGhlIHBhdGggcmVwcmVzZW50ZWQgYnkgdGhlIGxpc3Qgb2YgdHJpcGxlcy5cbiAgICAgICAgICogQHBhcmFtIHtMU2VxTm9kZX0gbm9kZSBUaGUgbm9kZSBjb250YWluaW5nIC0tIGF0IGxlYXN0IC0tIHRoZSBwYXRoIHRvIHRoZVxuICAgICAgICAgKiBlbGVtZW50LlxuICAgICAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSBpbmRleCBvZiB0aGUgbm9kZSBpbiB0aGUgbGluZWFyaXplZCBzZXF1ZW5jZTsgLTEgaWZcbiAgICAgICAgICogdGhlIGVsZW1lbnQgZG9lcyBub3QgZXhpc3QuXG4gICAgICAgICAqL1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gaW5kZXhPZihub2RlKSB7XG4gICAgICAgICAgICB2YXIgaW5kZXhlcyA9IHRoaXMuX2dldEluZGV4ZXMobm9kZSk7XG4gICAgICAgICAgICB2YXIgc3VtID0gMCxcbiAgICAgICAgICAgICAgICBjdXJyZW50VHJlZSA9IHRoaXMsXG4gICAgICAgICAgICAgICAgaiA9IHZvaWQgMDtcblxuICAgICAgICAgICAgLy8gIzEgSWYgdGhlIG5vZGUgZG9lcyBub3QgZXhpc3QsIHN0b3BcbiAgICAgICAgICAgIGlmIChpbmRleGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vICMyIE90aGVyd2lzZSwgc3RhcnQgY291bnRpbmdcbiAgICAgICAgICAgIGlmIChjdXJyZW50VHJlZS5faGFzRWxlbWVudCkge1xuICAgICAgICAgICAgICAgIHN1bSArPSAxO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpbmRleGVzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGluZGV4ZXNbaV0gPCBjdXJyZW50VHJlZS5jaGlsZHJlbi5sZW5ndGggLyAyKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vICNBIHN0YXJ0IGZyb20gdGhlIGJlZ2lubmluZyBbLS0tLT58ICAgICBdXG4gICAgICAgICAgICAgICAgICAgIGogPSAwO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoaiA8IGluZGV4ZXNbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VHJlZS5jaGlsZHJlbltqXS5faGFzRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1bSArPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1bSArPSBjdXJyZW50VHJlZS5jaGlsZHJlbltqXS5zdWJDb3VudGVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgKytqO1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vICNCIHN0YXJ0IGZyb20gdGhlIGVuZCBbICAgICB8PC0tLS1dXG4gICAgICAgICAgICAgICAgICAgIHN1bSArPSBjdXJyZW50VHJlZS5zdWJDb3VudGVyO1xuICAgICAgICAgICAgICAgICAgICBqID0gY3VycmVudFRyZWUuY2hpbGRyZW4ubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGogPj0gaW5kZXhlc1tpXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRUcmVlLmNoaWxkcmVuW2pdLl9oYXNFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3VtIC09IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VtIC09IGN1cnJlbnRUcmVlLmNoaWxkcmVuW2pdLnN1YkNvdW50ZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICAtLWo7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGogKz0gMTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VHJlZS5jaGlsZHJlbltqXS5faGFzRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICBzdW0gKz0gMTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGN1cnJlbnRUcmVlID0gY3VycmVudFRyZWUuY2hpbGRyZW5bal07XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIHN1bSAtIDE7IC8vIC0xIGJlY2F1c2UgYWxnb3JpdGhtIGNvdW50ZWQgdGhlIGVsZW1lbnQgaXRzZWxmXG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2dldCcsXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhlIG9yZGVyZWQgdHJlZSBjYW4gYmUgbGluZWFyaXplZC4gVGhpcyBmdW5jdGlvbiBnZXRzIHRoZSBub2RlIGF0IHRoZVxuICAgICAgICAgKiBpbmRleCBpbiB0aGUgcHJvamVjdGVkIHNlcXVlbmNlLlxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXggVGhlIGluZGV4IGluIHRoZSBzZXF1ZW5jZS5cbiAgICAgICAgICogQHJldHVybiB7TFNlcU5vZGV9IFRoZSBub2RlIGF0IHRoZSBpbmRleC5cbiAgICAgICAgICovXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXQoaW5kZXgpIHtcblxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gbGVmdFN1bSBUaGUgc3VtIG9mIGFsbCBlbGVtZW50IGF0IHRoZSBsZWZ0IG9mIHRoZVxuICAgICAgICAgICAgICogY3VycmVudCBpbnNwZWN0ZWQgbm9kZS5cbiAgICAgICAgICAgICAqIEBwYXJhbSB7TFNlcU5vZGV9IGJ1aWxkaW5nTm9kZSBUaGUgaGVhZCBwYXJ0IG9mIHRoZSBub2RlIGJlaW5nIGJ1aWx0XG4gICAgICAgICAgICAgKiBhcyB3ZSBjcmF3bC5cbiAgICAgICAgICAgICAqIEBwYXJhbSB7TFNlcU5vZGV9IHF1ZXVlIFRoZSBxdWV1ZSBwYXJ0IG9mIHRoZSBub2RlIGJlaW5nIGJ1aWx0LlxuICAgICAgICAgICAgICogQHBhcmFtIHtMU2VxTm9kZX0gY3VycmVudE5vZGUgVGhlIHN1YnRyZWUgYmVpbmcgY3Jhd2xlZC5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdmFyIF9nZXQgPSBmdW5jdGlvbiBfZ2V0KGxlZnRTdW0sIGJ1aWxkaW5nTm9kZSwgcXVldWUsIGN1cnJlbnROb2RlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN0YXJ0QmVnaW5uaW5nID0gdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgdXNlRnVuY3Rpb24gPSB2b2lkIDAsXG4gICAgICAgICAgICAgICAgICAgIGkgPSAwLFxuICAgICAgICAgICAgICAgICAgICBwID0gdm9pZCAwLFxuICAgICAgICAgICAgICAgICAgICB0ZW1wID0gdm9pZCAwO1xuICAgICAgICAgICAgICAgIC8vICMwIFRoZSBub2RlIGlzIGZvdW5kLCByZXR1cm4gdGhlIGluY3JlbWVudGFsbHkgYnVpbHQgbm9kZSBhbmRcbiAgICAgICAgICAgICAgICAvLyBwcmFpc2UgdGhlIHN1biAhXG4gICAgICAgICAgICAgICAgaWYgKGxlZnRTdW0gPT09IGluZGV4ICYmIGN1cnJlbnROb2RlLl9oYXNFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIDFhIGNvcHkgdGhlIHZhbHVlIG9mIHRoZSBlbGVtZW50IGluIHRoZSBwYXRoXG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlLmUgPSBjdXJyZW50Tm9kZS5lO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYnVpbGRpbmdOb2RlO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnROb2RlLl9oYXNFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGxlZnRTdW0gKz0gMTtcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgLy8gIzEgc2VhcmNoOiBkbyBJIHN0YXJ0IGZyb20gdGhlIGJlZ2lubmluZyBvciB0aGUgZW5kXG4gICAgICAgICAgICAgICAgc3RhcnRCZWdpbm5pbmcgPSBpbmRleCAtIGxlZnRTdW0gPCBjdXJyZW50Tm9kZS5zdWJDb3VudGVyIC8gMjtcbiAgICAgICAgICAgICAgICBpZiAoc3RhcnRCZWdpbm5pbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgdXNlRnVuY3Rpb24gPSBmdW5jdGlvbiB1c2VGdW5jdGlvbihhLCBiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYSArIGI7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGVmdFN1bSArPSBjdXJyZW50Tm9kZS5zdWJDb3VudGVyO1xuICAgICAgICAgICAgICAgICAgICB1c2VGdW5jdGlvbiA9IGZ1bmN0aW9uIHVzZUZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhIC0gYjtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyAjMmEgY291bnRpbmcgdGhlIGVsZW1lbnQgZnJvbSBsZWZ0IHRvIHJpZ2h0XG4gICAgICAgICAgICAgICAgaWYgKCFzdGFydEJlZ2lubmluZykge1xuICAgICAgICAgICAgICAgICAgICBpID0gY3VycmVudE5vZGUuY2hpbGRyZW4ubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHdoaWxlIChzdGFydEJlZ2lubmluZyAmJiBsZWZ0U3VtIDw9IGluZGV4IHx8ICFzdGFydEJlZ2lubmluZyAmJiBsZWZ0U3VtID4gaW5kZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1cnJlbnROb2RlLmNoaWxkcmVuW2ldLl9oYXNFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZWZ0U3VtID0gdXNlRnVuY3Rpb24obGVmdFN1bSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGxlZnRTdW0gPSB1c2VGdW5jdGlvbihsZWZ0U3VtLCBjdXJyZW50Tm9kZS5jaGlsZHJlbltpXS5zdWJDb3VudGVyKTtcbiAgICAgICAgICAgICAgICAgICAgaSA9IHVzZUZ1bmN0aW9uKGksIDEpO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAvLyAjMmIgZGVjcmVhc2luZyB0aGUgaW5jcmVtZW50YXRpb25cbiAgICAgICAgICAgICAgICBpID0gdXNlRnVuY3Rpb24oaSwgLTEpO1xuICAgICAgICAgICAgICAgIGlmIChzdGFydEJlZ2lubmluZykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3VycmVudE5vZGUuY2hpbGRyZW5baV0uX2hhc0VsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxlZnRTdW0gPSB1c2VGdW5jdGlvbihsZWZ0U3VtLCAtMSk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGxlZnRTdW0gPSB1c2VGdW5jdGlvbihsZWZ0U3VtLCAtY3VycmVudE5vZGUuY2hpbGRyZW5baV0uc3ViQ291bnRlcik7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIC8vICMzIGJ1aWxkIHBhdGhcbiAgICAgICAgICAgICAgICBwID0gW107cC5wdXNoKGN1cnJlbnROb2RlLmNoaWxkcmVuW2ldLnQpO1xuICAgICAgICAgICAgICAgIGlmIChidWlsZGluZ05vZGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgYnVpbGRpbmdOb2RlID0gbmV3IExTZXFOb2RlKHAsIG51bGwpO1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZSA9IGJ1aWxkaW5nTm9kZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0ZW1wID0gbmV3IExTZXFOb2RlKHAsIG51bGwpO1xuICAgICAgICAgICAgICAgICAgICBxdWV1ZS5hZGQodGVtcCk7XG4gICAgICAgICAgICAgICAgICAgIHF1ZXVlID0gdGVtcDtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHJldHVybiBfZ2V0KGxlZnRTdW0sIGJ1aWxkaW5nTm9kZSwgcXVldWUsIGN1cnJlbnROb2RlLmNoaWxkcmVuW2ldKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gX2dldCgwLCBudWxsLCBudWxsLCB0aGlzKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnX2dldEluZGV4ZXMnLFxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwcml2YXRlIEdldCB0aGUgbGlzdCBvZiBpbmRleGVzIG9mIHRoZSBhcnJheXMgcmVwcmVzZW50aW5nIHRoZSBjaGlsZHJlblxuICAgICAgICAgKiBpbiB0aGUgdHJlZS4gIFxuICAgICAgICAgKiBAcGFyYW0ge0xTZXFOb2RlfSBub2RlIFRoZSBub2RlIGNvbnRhaW5pbmcgdGhlIHBhdGguXG4gICAgICAgICAqIEByZXR1cm4ge051bWJlcltdfSBUaGUgc3VjY2Vzc2l2ZSBpbmRleGVzIHRvIGdldCB0byB0aGUgbm9kZS4gQW4gZW1wdHlcbiAgICAgICAgICogbGlzdCBpZiB0aGUgbm9kZSBkb2VzIG5vdCBleGlzdC5cbiAgICAgICAgICovXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfZ2V0SW5kZXhlcyhub2RlKSB7XG4gICAgICAgICAgICB2YXIgX19nZXRJbmRleGVzID0gZnVuY3Rpb24gX19nZXRJbmRleGVzKGluZGV4ZXMsIGN1cnJlbnRUcmVlLCBjdXJyZW50Tm9kZSkge1xuICAgICAgICAgICAgICAgIGlmICghY3VycmVudFRyZWUuX2NvbnRhaW5zKGN1cnJlbnROb2RlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IGN1cnJlbnRUcmVlLl9iaW5hcnlJbmRleE9mKGN1cnJlbnROb2RlKTtcblxuICAgICAgICAgICAgICAgIGluZGV4ZXMucHVzaChpbmRleCk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKGN1cnJlbnROb2RlLmNoaWxkcmVuLmxlbmd0aCA9PT0gMCB8fCBjdXJyZW50VHJlZS5jaGlsZHJlbi5sZW5ndGggPT09IDApICYmIGluZGV4ZXMgfHwgX19nZXRJbmRleGVzKGluZGV4ZXMsIGN1cnJlbnRUcmVlLmNoaWxkcmVuW2luZGV4XSwgY3VycmVudE5vZGUuY2hpbGQpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIF9fZ2V0SW5kZXhlcyhbXSwgdGhpcywgbm9kZSk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ19iaW5hcnlJbmRleE9mJyxcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcHJpdmF0ZSBmcm9tOiBbaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vV29sZnk4Ny81NzM0NTMwXSBQZXJmb3JtcyBhXG4gICAgICAgICAqIGJpbmFyeSBzZWFyY2ggb24gdGhlIGhvc3QgYXJyYXkuXG4gICAgICAgICAqIEBwYXJhbSB7TFNlcU5vZGV9IHNlYXJjaEVsZW1lbnQgVGhlIGl0ZW0gdG8gc2VhcmNoIGZvciB3aXRoaW4gdGhlIGFycmF5LlxuICAgICAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSBpbmRleCBvZiB0aGUgZWxlbWVudCB3aGljaCBkZWZhdWx0cyB0byAtMSB3aGVuIG5vdFxuICAgICAgICAgKiBmb3VuZC5cbiAgICAgICAgICovXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBfYmluYXJ5SW5kZXhPZihzZWFyY2hFbGVtZW50KSB7XG4gICAgICAgICAgICB2YXIgbWluSW5kZXggPSAwO1xuICAgICAgICAgICAgdmFyIG1heEluZGV4ID0gdGhpcy5jaGlsZHJlbi5sZW5ndGggLSAxO1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRJbmRleCA9IHZvaWQgMDtcbiAgICAgICAgICAgIHZhciBjdXJyZW50RWxlbWVudCA9IHZvaWQgMDtcblxuICAgICAgICAgICAgd2hpbGUgKG1pbkluZGV4IDw9IG1heEluZGV4KSB7XG4gICAgICAgICAgICAgICAgY3VycmVudEluZGV4ID0gTWF0aC5mbG9vcigobWluSW5kZXggKyBtYXhJbmRleCkgLyAyKTtcbiAgICAgICAgICAgICAgICBjdXJyZW50RWxlbWVudCA9IHRoaXMuY2hpbGRyZW5bY3VycmVudEluZGV4XTtcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudEVsZW1lbnQuY29tcGFyZVRvKHNlYXJjaEVsZW1lbnQpIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICBtaW5JbmRleCA9IGN1cnJlbnRJbmRleCArIDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50RWxlbWVudC5jb21wYXJlVG8oc2VhcmNoRWxlbWVudCkgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG1heEluZGV4ID0gY3VycmVudEluZGV4IC0gMTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY3VycmVudEluZGV4O1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcmV0dXJuIH5tYXhJbmRleDtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnX2NvbnRhaW5zJyxcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcHJpdmF0ZSBDaGVjayB3aGV0aGVyIHRoaXMgbm9kZSBjb250YWlucyB0aGUgc2VhcmNoRWxlbWVudCBhcyBjaGlsZHJlbi5cbiAgICAgICAgICogQHBhcmFtIHtMU2VxTm9kZX0gc2VhcmNoRWxlbWVudCBUaGUgZWxlbWVudCB0byBsb29rIGZvci5cbiAgICAgICAgICogQHJldHVybiB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGlzIG5vZGUgY29udGFpbnMgdGhlIG5vZGUgaW4gaXRzXG4gICAgICAgICAqIGNoaWxkcmVuLCBGYWxzZSBvdGhlcndpc2UuXG4gICAgICAgICAqL1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX2NvbnRhaW5zKHNlYXJjaEVsZW1lbnQpIHtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHRoaXMuX2JpbmFyeUluZGV4T2Yoc2VhcmNoRWxlbWVudCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5sZW5ndGggPiAwICYmIChpbmRleCA+IDAgfHwgaW5kZXggPT09IDAgJiYgdGhpcy5jaGlsZC5jb21wYXJlVG8oc2VhcmNoRWxlbWVudCkgPT09IDApO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdjaGlsZCcsXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogR2V0dGVyIHRvIHRoZSBmaXJzdCBjaGlsZC5cbiAgICAgICAgICogQHJldHVybnMge0xTZXFOb2RlfSBUaGUgZmlyc3QgY2hpbGQgb2YgdGhpcyBub2RlLiBOdWxsIGlmIGl0IGRvZXMgbm90XG4gICAgICAgICAqIGV4aXN0cy5cbiAgICAgICAgICovXG4gICAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2hpbGRyZW4ubGVuZ3RoID4gMCAmJiB0aGlzLmNoaWxkcmVuWzBdIHx8IG51bGw7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ19oYXNFbGVtZW50JyxcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcHJpdmF0ZSBDaGVjayBpZiB0aGUgbm9kZSBjb250YWlucyBhbiBlbGVtZW50LlxuICAgICAgICAgKiBAcmV0dXJuIHtCb29sZWFufSBUcnVlIGlmIHRoZSBub2RlIGhhcyBhbiBlbGVtZW50LCBmYWxzZSBvdGhlcndpc2UuXG4gICAgICAgICAqL1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmUgIT09IG51bGw7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2lzTGVhZicsXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2hlY2sgaWYgdGhlIG5vZGUgaGFzIGNoaWxkcmVuLlxuICAgICAgICAgKiBAcmV0dXJuIHtCb29sZWFufSBUcnVlIGlmIHRoZSBub2RlIGhhcyBjaGlsZHJlbiwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgICAgICAgKi9cbiAgICAgICAgZ2V0OiBmdW5jdGlvbiBnZXQoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jaGlsZHJlbi5sZW5ndGggPT09IDA7XG4gICAgICAgIH1cbiAgICB9XSwgW3tcbiAgICAgICAga2V5OiAnZnJvbUpTT04nLFxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENhc3QgYSBKU09OIG9iamVjdCB0byBhbiBMU2VxTm9kZS4gXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvIFRoZSBKU09OIG9iamVjdC5cbiAgICAgICAgICogQHJldHVybiB7TFNlcU5vZGV9IEFuIExTZXFOb2RlLlxuICAgICAgICAgKi9cbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGZyb21KU09OKG8pIHtcbiAgICAgICAgICAgIHZhciBiZWluZ0J1aWx0ID0gdm9pZCAwO1xuXG4gICAgICAgICAgICAvLyAjMSBsZWFmXG4gICAgICAgICAgICBpZiAoby5jaGlsZHJlbi5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICBiZWluZ0J1aWx0ID0gbmV3IExTZXFOb2RlKFtuZXcgVHJpcGxlKG8udC5wLCBvLnQucywgby50LmMpXSwgby5lKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gIzIgYnJhbmNoXG4gICAgICAgICAgICAgICAgYmVpbmdCdWlsdCA9IG5ldyBMU2VxTm9kZShbbmV3IFRyaXBsZShvLnQucCwgby50LnMsIG8udC5jKV0pO1xuICAgICAgICAgICAgICAgIGJlaW5nQnVpbHQuY2hpbGRyZW4ucHVzaChMU2VxTm9kZS5mcm9tSlNPTihvLmNoaWxkcmVuWzBdKSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXR1cm4gYmVpbmdCdWlsdDtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBMU2VxTm9kZTtcbn0oKTtcblxuO1xuXG5tb2R1bGUuZXhwb3J0cyA9IExTZXFOb2RlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW14elpYRnViMlJsTG1weklsMHNJbTVoYldWeklqcGJJbFJ5YVhCc1pTSXNJbkpsY1hWcGNtVWlMQ0pNVTJWeFRtOWtaU0lzSW5SeWFYQnNaWE1pTENKbGJHVnRaVzUwSWl3aWRDSXNJbk5vYVdaMElpd2laU0lzSW14bGJtZDBhQ0lzSW5OMVlrTnZkVzUwWlhJaUxDSmphR2xzWkhKbGJpSXNJbkIxYzJnaUxDSnZJaXdpWTI5dGNHRnlaVlJ2SWl3aWJtOWtaU0lzSW1sdVpHVjRJaXdpWDJKcGJtRnllVWx1WkdWNFQyWWlMQ0pmWTI5dWRHRnBibk1pTENKemNHeHBZMlVpTENKaFpHUWlMQ0pqYUdsc1pDSXNJbWx1WkdWNFpYTWlMQ0pmWjJWMFNXNWtaWGhsY3lJc0ltTjFjbkpsYm5SVWNtVmxJaXdpYVNJc0ltbHpVM0JzYVhSMFpXUWlMQ0pwYzB4aGMzUWlMQ0pmYUdGelJXeGxiV1Z1ZENJc0luTjFiU0lzSW1vaUxDSmZaMlYwSWl3aWJHVm1kRk4xYlNJc0ltSjFhV3hrYVc1blRtOWtaU0lzSW5GMVpYVmxJaXdpWTNWeWNtVnVkRTV2WkdVaUxDSnpkR0Z5ZEVKbFoybHVibWx1WnlJc0luVnpaVVoxYm1OMGFXOXVJaXdpY0NJc0luUmxiWEFpTENKaElpd2lZaUlzSWw5ZloyVjBTVzVrWlhobGN5SXNJbk5sWVhKamFFVnNaVzFsYm5RaUxDSnRhVzVKYm1SbGVDSXNJbTFoZUVsdVpHVjRJaXdpWTNWeWNtVnVkRWx1WkdWNElpd2lZM1Z5Y21WdWRFVnNaVzFsYm5RaUxDSk5ZWFJvSWl3aVpteHZiM0lpTENKaVpXbHVaMEoxYVd4MElpd2ljeUlzSW1NaUxDSm1jbTl0U2xOUFRpSXNJbTF2WkhWc1pTSXNJbVY0Y0c5eWRITWlYU3dpYldGd2NHbHVaM01pT2lKQlFVRkJPenM3T3pzN1FVRkZRU3hKUVVGTlFTeFRRVUZUUXl4UlFVRlJMR0ZCUVZJc1EwRkJaanM3UVVGRlFUczdPenRKUVVkTlF5eFJPMEZCUTBZN096czdPenRCUVUxQkxIZENRVUV5UXp0QlFVRkJMRmxCUVRsQ1F5eFBRVUU0UWl4MVJVRkJjRUlzUlVGQmIwSTdRVUZCUVN4WlFVRm9Ra01zVDBGQlowSXNkVVZCUVU0c1NVRkJUVHM3UVVGQlFUczdRVUZEZGtNc1lVRkJTME1zUTBGQlRDeEhRVUZUUml4UlFVRlJSeXhMUVVGU0xFVkJRVlE3UVVGRFFTeGhRVUZMUXl4RFFVRk1MRWRCUVZNc1NVRkJWRHRCUVVOQkxGbEJRVWxLTEZGQlFWRkxMRTFCUVZJc1MwRkJiVUlzUTBGQmRrSXNSVUZCTUVJN1FVRkJSU3hwUWtGQlMwUXNRMEZCVEN4SFFVRlRTQ3hQUVVGVU8wRkJRVzFDTzBGQlF5OURMR0ZCUVV0TExGVkJRVXdzUjBGQmJVSk9MRkZCUVZGTExFMUJRVklzUjBGQmFVSXNRMEZCYWtJc1NVRkJjMElzUTBGQmRrSXNTVUZCTmtJc1EwRkJMME03UVVGRFFTeGhRVUZMUlN4UlFVRk1MRWRCUVdkQ0xFVkJRV2hDTzBGQlEwRlFMR2RDUVVGUlN5eE5RVUZTTEVkQlFXbENMRU5CUVdwQ0xFbEJRMGtzUzBGQlMwVXNVVUZCVEN4RFFVRmpReXhKUVVGa0xFTkJRVzFDTEVsQlFVbFVMRkZCUVVvc1EwRkJZVU1zVDBGQllpeEZRVUZ6UWtNc1QwRkJkRUlzUTBGQmJrSXNRMEZFU2p0QlFVVklPenM3T3pzN1FVRlhSRHM3T3p0clEwRkpWMUVzUXl4RlFVRkhPMEZCUTFZc2JVSkJRVThzUzBGQlMxQXNRMEZCVEN4RFFVRlBVU3hUUVVGUUxFTkJRV2xDUkN4RlFVRkZVQ3hEUVVGdVFpeERRVUZRTzBGQlEwZzdPenM3TzBGQlJVUTdPenM3T3pSQ1FVdExVeXhKTEVWQlFVMDdRVUZEVUN4blFrRkJUVU1zVVVGQlVTeExRVUZMUXl4alFVRk1MRU5CUVc5Q1JpeEpRVUZ3UWl4RFFVRmtPenRCUVVWQk8wRkJRMEVzWjBKQlFVa3NRMEZCUXl4TFFVRkxSeXhUUVVGTUxFTkJRV1ZJTEVsQlFXWXNRMEZCVEN4RlFVRXlRanRCUVVOMlFpeHhRa0ZCUzBvc1VVRkJUQ3hEUVVGalVTeE5RVUZrTEVOQlFYRkNMRU5CUVVOSUxFdEJRWFJDTEVWQlFUWkNMRU5CUVRkQ0xFVkJRV2REUkN4SlFVRm9RenRCUVVOQkxIRkNRVUZMVEN4VlFVRk1MRWxCUVcxQ0xFTkJRVzVDTzBGQlEwRTdRVUZEU0N4aFFVcEVMRTFCU1U4c1NVRkJTVXNzUzBGQlMwb3NVVUZCVEN4RFFVRmpSaXhOUVVGa0xFdEJRWGxDTEVOQlFUZENMRVZCUVdkRE8wRkJRMjVETzBGQlEwRXNiMEpCUVVrc1MwRkJTMFVzVVVGQlRDeERRVUZqU3l4TFFVRmtMRVZCUVhGQ1VpeERRVUZ5UWl4TFFVRXlRaXhKUVVFdlFpeEZRVUZ2UXp0QlFVTm9ReXd5UWtGQlR5eExRVUZRTzBGQlEwZ3NhVUpCUmtRc1RVRkZUenRCUVVOSUxIbENRVUZMUnl4UlFVRk1MRU5CUVdOTExFdEJRV1FzUlVGQmNVSlNMRU5CUVhKQ0xFZEJRWGxDVHl4TFFVRkxVQ3hEUVVFNVFqdEJRVU5CTEhsQ1FVRkxSU3hWUVVGTUxFbEJRVzFDTEVOQlFXNUNPMEZCUTBnN1FVRkRSRHRCUVVOSUxHRkJWRTBzVFVGVFFTeEpRVUZKTEV0QlFVdERMRkZCUVV3c1EwRkJZMHNzUzBGQlpDeEZRVUZ4UWtrc1IwRkJja0lzUTBGQmVVSk1MRXRCUVV0TkxFdEJRVGxDTEVOQlFVb3NSVUZCTUVNN1FVRkROME1zY1VKQlFVdFlMRlZCUVV3c1NVRkJiVUlzUTBGQmJrSTdRVUZEU0R0QlFVTkVMRzFDUVVGUExFbEJRVkE3UVVGRFNEczdPenM3UVVGSFJEczdPenM3T3pSQ1FVMUxTeXhKTEVWQlFVMDdRVUZEVUN4blFrRkJUVThzVlVGQlZTeExRVUZMUXl4WFFVRk1MRU5CUVdsQ1VpeEpRVUZxUWl4RFFVRm9RanRCUVVOQkxHZENRVUZKVXl4alFVRmpMRWxCUVd4Q08wRkJRVUVzWjBKQlFYZENReXhKUVVGSkxFTkJRVFZDTzBGQlFVRXNaMEpCUVN0Q1F5eGhRVUZoTEV0QlFUVkRPenRCUVVWQk8wRkJRMEVzWjBKQlFVbEtMRkZCUVZGaUxFMUJRVklzUzBGQmJVSXNRMEZCZGtJc1JVRkJNRUk3UVVGQlJTeDFRa0ZCVHl4TFFVRlFPMEZCUVdVN08wRkJSVE5ETzBGQlEwRmxMSGRDUVVGWlpDeFZRVUZhTEVsQlFUQkNMRU5CUVRGQ08wRkJRMEVzYlVKQlFVOWxMRWxCUVVsSUxGRkJRVkZpTEUxQlFWb3NTVUZCYzBJc1EwRkJSV2xDTEZWQlFTOUNMRVZCUVRSRE8wRkJRM2hETEc5Q1FVRkpReXhUUVVGVFNDeFpRVUZaWWl4UlFVRmFMRU5CUVhGQ1Z5eFJRVUZSUnl4RFFVRlNMRU5CUVhKQ0xFVkJRV2xEUnl4WFFVRnFReXhKUVVOVVNDeE5RVUZOU0N4UlFVRlJZaXhOUVVGU0xFZEJRV2xDTEVOQlJETkNPMEZCUlVFc2IwSkJRVWtzUTBGQlEydENMRTFCUVV3c1JVRkJZVHRCUVVOVVNDeG5RMEZCV1dJc1VVRkJXaXhEUVVGeFFsY3NVVUZCVVVjc1EwRkJVaXhEUVVGeVFpeEZRVUZwUTJZc1ZVRkJha01zU1VGQkswTXNRMEZCTDBNN1FVRkRTRHRCUVVORUxHOUNRVUZKWXl4WlFVRlpZaXhSUVVGYUxFTkJRWEZDVnl4UlFVRlJSeXhEUVVGU0xFTkJRWEpDTEVWQlFXbERaaXhWUVVGcVF5eEpRVUVyUXl4RFFVRXZReXhMUVVORExFTkJRVU5qTEZsQlFWbGlMRkZCUVZvc1EwRkJjVUpYTEZGQlFWRkhMRU5CUVZJc1EwRkJja0lzUlVGQmFVTkhMRmRCUVd4RExFbEJRV2xFUkN4TlFVUnNSQ3hEUVVGS0xFVkJReXRFTzBGQlF6TkVTQ3huUTBGQldXSXNVVUZCV2l4RFFVRnhRbEVzVFVGQmNrSXNRMEZCTkVKSExGRkJRVkZITEVOQlFWSXNRMEZCTlVJc1JVRkJkME1zUTBGQmVFTTdRVUZEUVVNc2FVTkJRV0VzU1VGQllqdEJRVU5JTzBGQlEwUkdMRGhDUVVGalFTeFpRVUZaWWl4UlFVRmFMRU5CUVhGQ1Z5eFJRVUZSUnl4RFFVRlNMRU5CUVhKQ0xFTkJRV1E3UVVGRFFTeHJRa0ZCUlVFc1EwRkJSanRCUVVOSU8wRkJRMFFzWjBKQlFVa3NRMEZCUTBNc1ZVRkJUQ3hGUVVGblFqdEJRVUZGUml3MFFrRkJXV2hDTEVOQlFWb3NSMEZCWjBJc1NVRkJhRUk3UVVGQmMwSTdPMEZCUlhoRExHMUNRVUZQTEVsQlFWQTdRVUZEU0RzN096czdRVUZIUkRzN096czdPenM3WjBOQlVWTlBMRWtzUlVGQlRUdEJRVU5ZTEdkQ1FVRk5UeXhWUVVGVkxFdEJRVXRETEZkQlFVd3NRMEZCYVVKU0xFbEJRV3BDTEVOQlFXaENPMEZCUTBFc1owSkJRVWxqTEUxQlFVMHNRMEZCVmp0QlFVRkJMR2RDUVVGaFRDeGpRVUZqTEVsQlFUTkNPMEZCUVVFc1owSkJRV2xEVFN4VlFVRnFRenM3UVVGRlFUdEJRVU5CTEdkQ1FVRkpVaXhSUVVGUllpeE5RVUZTTEV0QlFXMUNMRU5CUVhaQ0xFVkJRVEJDTzBGQlFVVXNkVUpCUVU4c1EwRkJReXhEUVVGU08wRkJRVms3TzBGQlJYaERPMEZCUTBFc1owSkJRVWxsTEZsQlFWbEpMRmRCUVdoQ0xFVkJRVFpDTzBGQlFVVkRMSFZDUVVGUExFTkJRVkE3UVVGQlZ6czdRVUZGTVVNc2FVSkJRVXNzU1VGQlNVb3NTVUZCU1N4RFFVRmlMRVZCUVdkQ1FTeEpRVUZKU0N4UlFVRlJZaXhOUVVFMVFpeEZRVUZ2UXl4RlFVRkZaMElzUTBGQmRFTXNSVUZCZVVNN1FVRkRja01zYjBKQlFVbElMRkZCUVZGSExFTkJRVklzU1VGQllVUXNXVUZCV1dJc1VVRkJXaXhEUVVGeFFrWXNUVUZCY2tJc1IwRkJORUlzUTBGQk4wTXNSVUZCWjBRN1FVRkROVU03UVVGRFFYRkNMSGRDUVVGSkxFTkJRVW83UVVGRFFTd3lRa0ZCVDBFc1NVRkJTVklzVVVGQlVVY3NRMEZCVWl4RFFVRllMRVZCUVhWQ08wRkJRMjVDTERSQ1FVRkpSQ3haUVVGWllpeFJRVUZhTEVOQlFYRkNiVUlzUTBGQmNrSXNSVUZCZDBKR0xGZEJRVFZDTEVWQlFYbERPMEZCUVVWRExHMURRVUZQTEVOQlFWQTdRVUZCVnp0QlFVTjBSRUVzSzBKQlFVOU1MRmxCUVZsaUxGRkJRVm9zUTBGQmNVSnRRaXhEUVVGeVFpeEZRVUYzUW5CQ0xGVkJRUzlDTzBGQlEwRXNNRUpCUVVWdlFpeERRVUZHTzBGQlEwZzdRVUZEU2l4cFFrRlNSQ3hOUVZGUE8wRkJRMGc3UVVGRFFVUXNNa0pCUVU5TUxGbEJRVmxrTEZWQlFXNUNPMEZCUTBGdlFpeDNRa0ZCU1U0c1dVRkJXV0lzVVVGQldpeERRVUZ4UWtZc1RVRkJja0lzUjBGQk9FSXNRMEZCYkVNN1FVRkRRU3d5UWtGQlQzRkNMRXRCUVV0U0xGRkJRVkZITEVOQlFWSXNRMEZCV2l4RlFVRjNRanRCUVVOd1FpdzBRa0ZCU1VRc1dVRkJXV0lzVVVGQldpeERRVUZ4UW0xQ0xFTkJRWEpDTEVWQlFYZENSaXhYUVVFMVFpeEZRVUYzUXp0QlFVRkZReXh0UTBGQlR5eERRVUZRTzBGQlFWYzdRVUZEY2tSQkxDdENRVUZQVEN4WlFVRlpZaXhSUVVGYUxFTkJRWEZDYlVJc1EwRkJja0lzUlVGQmQwSndRaXhWUVVFdlFqdEJRVU5CTERCQ1FVRkZiMElzUTBGQlJqdEJRVU5JTzBGQlEwUkJMSGxDUVVGTExFTkJRVXc3UVVGRFNEdEJRVU5FTEc5Q1FVRkpUaXhaUVVGWllpeFJRVUZhTEVOQlFYRkNiVUlzUTBGQmNrSXNSVUZCZDBKR0xGZEJRVFZDTEVWQlFYbERPMEZCUVVWRExESkNRVUZQTEVOQlFWQTdRVUZCVnp0QlFVTjBSRXdzT0VKQlFXTkJMRmxCUVZsaUxGRkJRVm9zUTBGQmNVSnRRaXhEUVVGeVFpeERRVUZrTzBGQlEwZzdRVUZEUkN4dFFrRkJUMFFzVFVGQlRTeERRVUZpTEVOQmFrTlhMRU5CYVVOTE8wRkJRMjVDT3pzN096dEJRVWRFT3pzN096czdORUpCVFV0aUxFc3NSVUZCVHpzN1FVRkZVanM3T3pzN096czdRVUZSUVN4blFrRkJUV1VzVDBGQlR5eFRRVUZRUVN4SlFVRlBMRU5CUVVORExFOUJRVVFzUlVGQlZVTXNXVUZCVml4RlFVRjNRa01zUzBGQmVFSXNSVUZCSzBKRExGZEJRUzlDTEVWQlFTdERPMEZCUTNoRUxHOUNRVUZKUXl4cFFrRkJhVUlzU1VGQmNrSTdRVUZCUVN4dlFrRkJNa0pETEc5Q1FVRXpRanRCUVVGQkxHOUNRVUYzUTFvc1NVRkJTU3hEUVVFMVF6dEJRVUZCTEc5Q1FVRXJRMkVzVlVGQkwwTTdRVUZCUVN4dlFrRkJhMFJETEdGQlFXeEVPMEZCUTBFN1FVRkRRVHRCUVVOQkxHOUNRVUZKVUN4WlFVRlphRUlzUzBGQldpeEpRVUZ4UW0xQ0xGbEJRVmxRTEZkQlFYSkRMRVZCUVd0RU8wRkJRemxETzBGQlEwRk5MREJDUVVGTk1VSXNRMEZCVGl4SFFVRlZNa0lzV1VGQldUTkNMRU5CUVhSQ08wRkJRMEVzTWtKQlFVOTVRaXhaUVVGUU8wRkJRMGc3UVVGRFJDeHZRa0ZCU1VVc1dVRkJXVkFzVjBGQmFFSXNSVUZCTkVJN1FVRkJSVWtzSzBKQlFWY3NRMEZCV0R0QlFVRmxPenRCUVVVM1F6dEJRVU5CU1N4cFEwRkJhVUp3UWl4UlFVRk5aMElzVDBGQlRpeEhRVUZuUWtjc1dVRkJXWHBDTEZWQlFWb3NSMEZCZFVJc1EwRkJlRVE3UVVGRFFTeHZRa0ZCU1RCQ0xHTkJRVW9zUlVGQmIwSTdRVUZEYUVKRExHdERRVUZqTEhGQ1FVRkRSeXhEUVVGRUxFVkJRVWxETEVOQlFVbzdRVUZCUVN3clFrRkJWVVFzU1VGQlNVTXNRMEZCWkR0QlFVRkJMSEZDUVVGa08wRkJRMGdzYVVKQlJrUXNUVUZGVHp0QlFVTklWQ3dyUWtGQlYwY3NXVUZCV1hwQ0xGVkJRWFpDTzBGQlEwRXlRaXhyUTBGQll5eHhRa0ZCUTBjc1EwRkJSQ3hGUVVGSlF5eERRVUZLTzBGQlFVRXNLMEpCUVZWRUxFbEJRVWxETEVOQlFXUTdRVUZCUVN4eFFrRkJaRHRCUVVOSU96dEJRVVZFTzBGQlEwRXNiMEpCUVVrc1EwRkJRMHdzWTBGQlRDeEZRVUZ4UWp0QlFVRkZXQ3gzUWtGQlNWVXNXVUZCV1hoQ0xGRkJRVm9zUTBGQmNVSkdMRTFCUVhKQ0xFZEJRVGhDTEVOQlFXeERPMEZCUVhORE8wRkJRemRFTEhWQ1FVRlJNa0lzYTBKQlFXdENTaXhYUVVGWGFFSXNTMEZCT1VJc1NVRkRReXhEUVVGRGIwSXNZMEZCUkN4SlFVRnRRa29zVlVGQlZXaENMRXRCUkhKRExFVkJRelpETzBGQlEzcERMSGRDUVVGSmJVSXNXVUZCV1hoQ0xGRkJRVm9zUTBGQmNVSmpMRU5CUVhKQ0xFVkJRWGRDUnl4WFFVRTFRaXhGUVVGNVF6dEJRVU55UTBrc2EwTkJRVlZMTEZsQlFWbE1MRTlCUVZvc1JVRkJjVUlzUTBGQmNrSXNRMEZCVmp0QlFVTklPMEZCUTBSQkxEaENRVUZWU3l4WlFVRlpUQ3hQUVVGYUxFVkJRMWxITEZsQlFWbDRRaXhSUVVGYUxFTkJRWEZDWXl4RFFVRnlRaXhGUVVGM1FtWXNWVUZFY0VNc1EwRkJWanRCUVVWQlpTeDNRa0ZCU1Zrc1dVRkJXVm9zUTBGQldpeEZRVUZsTEVOQlFXWXNRMEZCU2p0QlFVTklPenRCUVVWRU8wRkJRMEZCTEc5Q1FVRkpXU3haUVVGWldpeERRVUZhTEVWQlFXVXNRMEZCUXl4RFFVRm9RaXhEUVVGS08wRkJRMEVzYjBKQlFVbFhMR05CUVVvc1JVRkJiMEk3UVVGRGFFSXNkMEpCUVVsRUxGbEJRVmw0UWl4UlFVRmFMRU5CUVhGQ1l5eERRVUZ5UWl4RlFVRjNRa2NzVjBGQk5VSXNSVUZCZVVNN1FVRkRja05KTEd0RFFVRlZTeXhaUVVGWlRDeFBRVUZhTEVWQlFYRkNMRU5CUVVNc1EwRkJkRUlzUTBGQlZqdEJRVU5JTzBGQlEwUkJMRGhDUVVGVlN5eFpRVUZaVEN4UFFVRmFMRVZCUTFrc1EwRkJRMGNzV1VGQldYaENMRkZCUVZvc1EwRkJjVUpqTEVOQlFYSkNMRVZCUVhkQ1ppeFZRVVJ5UXl4RFFVRldPMEZCUlVnN08wRkJSVVE3UVVGRFFUUkNMRzlDUVVGSkxFVkJRVW9zUTBGQlVVRXNSVUZCUlRGQ0xFbEJRVVlzUTBGQlQzVkNMRmxCUVZsNFFpeFJRVUZhTEVOQlFYRkNZeXhEUVVGeVFpeEZRVUYzUW01Q0xFTkJRUzlDTzBGQlExSXNiMEpCUVVreVFpeHBRa0ZCYVVJc1NVRkJja0lzUlVGQk1rSTdRVUZEZGtKQkxHMURRVUZsTEVsQlFVazVRaXhSUVVGS0xFTkJRV0Z0UXl4RFFVRmlMRVZCUVdkQ0xFbEJRV2hDTEVOQlFXWTdRVUZEUVVvc05FSkJRVkZFTEZsQlFWSTdRVUZEU0N4cFFrRklSQ3hOUVVkUE8wRkJRMGhOTERKQ1FVRlBMRWxCUVVsd1F5eFJRVUZLTEVOQlFXRnRReXhEUVVGaUxFVkJRV2RDTEVsQlFXaENMRU5CUVZBN1FVRkRRVW9zTUVKQlFVMWtMRWRCUVU0c1EwRkJWVzFDTEVsQlFWWTdRVUZEUVV3c05FSkJRVkZMTEVsQlFWSTdRVUZEU0R0QlFVTkVMSFZDUVVGUFVpeExRVUZMUXl4UFFVRk1MRVZCUVdORExGbEJRV1FzUlVGQk5FSkRMRXRCUVRWQ0xFVkJRVzFEUXl4WlFVRlplRUlzVVVGQldpeERRVUZ4UW1Nc1EwRkJja0lzUTBGQmJrTXNRMEZCVUR0QlFVTklMR0ZCY2tSRU8wRkJjMFJCTEcxQ1FVRlBUU3hMUVVGTExFTkJRVXdzUlVGQlVTeEpRVUZTTEVWQlFXTXNTVUZCWkN4RlFVRnZRaXhKUVVGd1FpeERRVUZRTzBGQlEwZzdPenM3TzBGQmMwSkVPenM3T3pzN08yOURRVTloYUVJc1NTeEZRVUZOTzBGQlEyWXNaMEpCUVUweVFpeGxRVUZsTEZOQlFXWkJMRmxCUVdVc1EwRkJRM0JDTEU5QlFVUXNSVUZCVlVVc1YwRkJWaXhGUVVGMVFsY3NWMEZCZGtJc1JVRkJkVU03UVVGRGVFUXNiMEpCUVVrc1EwRkJRMWdzV1VGQldVNHNVMEZCV2l4RFFVRnpRbWxDTEZkQlFYUkNMRU5CUVV3c1JVRkJlVU03UVVGRGNrTXNNa0pCUVU4c1JVRkJVRHRCUVVOSU96dEJRVVZFTEc5Q1FVRk5ia0lzVVVGQlVWRXNXVUZCV1ZBc1kwRkJXaXhEUVVFeVFtdENMRmRCUVROQ0xFTkJRV1E3TzBGQlJVRmlMSGRDUVVGUlZpeEpRVUZTTEVOQlFXRkpMRXRCUVdJN08wRkJSVUVzZFVKQlFWRXNRMEZCUTIxQ0xGbEJRVmw0UWl4UlFVRmFMRU5CUVhGQ1JpeE5RVUZ5UWl4TFFVRm5ReXhEUVVGb1F5eEpRVU5CWlN4WlFVRlpZaXhSUVVGYUxFTkJRWEZDUml4TlFVRnlRaXhMUVVGblF5eERRVVJxUXl4TFFVTjFRMkVzVDBGRWVFTXNTVUZGU0c5Q0xHRkJRV0Z3UWl4UFFVRmlMRVZCUTJGRkxGbEJRVmxpTEZGQlFWb3NRMEZCY1VKTExFdEJRWEpDTEVOQlJHSXNSVUZGWVcxQ0xGbEJRVmxrTEV0QlJucENMRU5CUmtvN1FVRkxTQ3hoUVdSRU96dEJRV2RDUVN4dFFrRkJUM0ZDTEdGQlFXRXNSVUZCWWl4RlFVRnBRaXhKUVVGcVFpeEZRVUYxUWpOQ0xFbEJRWFpDTEVOQlFWQTdRVUZEU0RzN096czdRVUZMUkRzN096czdPenQxUTBGUFowSTBRaXhoTEVWQlFXVTdRVUZETTBJc1owSkJRVWxETEZkQlFWY3NRMEZCWmp0QlFVTkJMR2RDUVVGSlF5eFhRVUZYTEV0QlFVdHNReXhSUVVGTUxFTkJRV05HTEUxQlFXUXNSMEZCZFVJc1EwRkJkRU03UVVGRFFTeG5Ra0ZCU1hGRExIRkNRVUZLTzBGQlEwRXNaMEpCUVVsRExIVkNRVUZLT3p0QlFVVkJMRzFDUVVGUFNDeFpRVUZaUXl4UlFVRnVRaXhGUVVFMlFqdEJRVU42UWtNc0swSkJRV1ZGTEV0QlFVdERMRXRCUVV3c1EwRkJWeXhEUVVGRFRDeFhRVUZYUXl4UlFVRmFMRWxCUVhkQ0xFTkJRVzVETEVOQlFXWTdRVUZEUVVVc2FVTkJRV2xDTEV0QlFVdHdReXhSUVVGTUxFTkJRV050UXl4WlFVRmtMRU5CUVdwQ08wRkJRMEVzYjBKQlFVbERMR1ZCUVdWcVF5eFRRVUZtTEVOQlFYbENOa0lzWVVGQmVrSXNTVUZCTUVNc1EwRkJPVU1zUlVGQmFVUTdRVUZETjBORExDdENRVUZYUlN4bFFVRmxMRU5CUVRGQ08wRkJRMGdzYVVKQlJrUXNUVUZGVHl4SlFVRkpReXhsUVVGbGFrTXNVMEZCWml4RFFVRjVRalpDTEdGQlFYcENMRWxCUVRCRExFTkJRVGxETEVWQlFXbEVPMEZCUTNCRVJTd3JRa0ZCVjBNc1pVRkJaU3hEUVVFeFFqdEJRVU5JTEdsQ1FVWk5MRTFCUlVFN1FVRkRTQ3d5UWtGQlQwRXNXVUZCVUR0QlFVTklPMEZCUTBvN1FVRkRSQ3h0UWtGQlR5eERRVUZEUkN4UlFVRlNPMEZCUTBnN096czdPMEZCUlVRN096czdPenRyUTBGTlYwWXNZU3hGUVVGbE8wRkJRM1JDTEdkQ1FVRk5NMElzVVVGQlVTeExRVUZMUXl4alFVRk1MRU5CUVc5Q01FSXNZVUZCY0VJc1EwRkJaRHRCUVVOQkxHMUNRVUZQTEV0QlFVdG9ReXhSUVVGTUxFTkJRV05HTEUxQlFXUXNSMEZCZFVJc1EwRkJka0lzUzBGRFJrOHNVVUZCVVN4RFFVRlNMRWxCUTBWQkxGVkJRVlVzUTBGQldDeEpRVU5CTEV0QlFVdExMRXRCUVV3c1EwRkJWMUFzVTBGQldDeERRVUZ4UWpaQ0xHRkJRWEpDTEUxQlFYZERMRU5CU0haRExFTkJRVkE3UVVGSlNEczdPenM3UVVGb1UwUTdPenM3T3pSQ1FVdGhPMEZCUTFRc2JVSkJRVk1zUzBGQlMyaERMRkZCUVV3c1EwRkJZMFlzVFVGQlpDeEhRVUYxUWl4RFFVRjRRaXhKUVVFNFFpeExRVUZMUlN4UlFVRk1MRU5CUVdNc1EwRkJaQ3hEUVVFdlFpeEpRVUZ2UkN4SlFVRXpSRHRCUVVOSU96czdPenRCUVRKU1JEczdPenMwUWtGSmJVSTdRVUZEWml4dFFrRkJUeXhMUVVGTFNDeERRVUZNTEV0QlFWY3NTVUZCYkVJN1FVRkRTRHM3T3pzN1FVRkZSRHM3T3pzMFFrRkpZenRCUVVOV0xHMUNRVUZQTEV0QlFVdEhMRkZCUVV3c1EwRkJZMFlzVFVGQlpDeExRVUY1UWl4RFFVRm9RenRCUVVOSU96czdPenRCUVhwSFJEczdPenM3YVVOQlMybENTU3hETEVWQlFVYzdRVUZEYUVJc1owSkJRVWx4UXl4dFFrRkJTanM3UVVGRlFUdEJRVU5CTEdkQ1FVRkpja01zUlVGQlJVWXNVVUZCUml4RFFVRlhSaXhOUVVGWUxFdEJRWE5DTEVOQlFURkNMRVZCUVRSQ08wRkJRM2hDZVVNc05rSkJRV0VzU1VGQlNTOURMRkZCUVVvc1EwRkJZU3hEUVVGRExFbEJRVWxHTEUxQlFVb3NRMEZCVjFrc1JVRkJSVkFzUTBGQlJpeERRVUZKWjBNc1EwRkJaaXhGUVVGclFucENMRVZCUVVWUUxFTkJRVVlzUTBGQlNUWkRMRU5CUVhSQ0xFVkJRWGxDZEVNc1JVRkJSVkFzUTBGQlJpeERRVUZKT0VNc1EwRkJOMElzUTBGQlJDeERRVUZpTEVWQlFXZEVka01zUlVGQlJVd3NRMEZCYkVRc1EwRkJZanRCUVVOSUxHRkJSa1FzVFVGRlR6dEJRVU5JTzBGQlEwRXdReXcyUWtGQllTeEpRVUZKTDBNc1VVRkJTaXhEUVVGaExFTkJRVU1zU1VGQlNVWXNUVUZCU2l4RFFVRlhXU3hGUVVGRlVDeERRVUZHTEVOQlFVbG5ReXhEUVVGbUxFVkJRV3RDZWtJc1JVRkJSVkFzUTBGQlJpeERRVUZKTmtNc1EwRkJkRUlzUlVGQmVVSjBReXhGUVVGRlVDeERRVUZHTEVOQlFVazRReXhEUVVFM1FpeERRVUZFTEVOQlFXSXNRMEZCWWp0QlFVTkJSaXd5UWtGQlYzWkRMRkZCUVZnc1EwRkJiMEpETEVsQlFYQkNMRU5CUVhsQ1ZDeFRRVUZUYTBRc1VVRkJWQ3hEUVVGclFuaERMRVZCUVVWR0xGRkJRVVlzUTBGQlZ5eERRVUZZTEVOQlFXeENMRU5CUVhwQ08wRkJRMGc3TzBGQlJVUXNiVUpCUVU5MVF5eFZRVUZRTzBGQlEwZzdPenM3T3p0QlFYbEdTanM3UVVGRlJFa3NUMEZCVDBNc1QwRkJVQ3hIUVVGcFFuQkVMRkZCUVdwQ0lpd2labWxzWlNJNklteHpaWEZ1YjJSbExtcHpJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpSjNWelpTQnpkSEpwWTNRbk8xeHVYRzVqYjI1emRDQlVjbWx3YkdVZ1BTQnlaWEYxYVhKbEtDY3VMM1J5YVhCc1pTNXFjeWNwTzF4dVhHNHZLaXBjYmlBcUlFRWdibTlrWlNCdlppQjBhR1VnVEZObGNTQjBjbVZsTGx4dUlDb3ZYRzVqYkdGemN5Qk1VMlZ4VG05a1pTQjdYRzRnSUNBZ0x5b3FYRzRnSUNBZ0lDb2dRSEJoY21GdElIdFVjbWx3YkdWYlhYMGdkSEpwY0d4bGN5QlVhR1VnYkdsemRDQnZaaUIwY21sd2JHVnpJR052YlhCdmMybHVaeUIwYUdVZ2NHRjBhQ0IwYnlCMGFHVmNiaUFnSUNBZ0tpQmxiR1Z0Wlc1MExseHVJQ0FnSUNBcUlFQndZWEpoYlNCN1QySnFaV04wZlNCbGJHVnRaVzUwSUZSb1pTQmxiR1Z0Wlc1MElIUnZJR2x1YzJWeWRDQnBiaUIwYUdVZ2MzUnlkV04wZFhKbExDQmxMbWN1TENCaFhHNGdJQ0FnSUNvZ1kyaGhjbUZqZEdWeUlHbHVJR0VnZEdWNGRDQmtiMk4xYldWdWRDNWNiaUFnSUNBZ0tpOWNiaUFnSUNCamIyNXpkSEoxWTNSdmNpQW9kSEpwY0d4bGN5QTlJRnRkTENCbGJHVnRaVzUwSUQwZ2JuVnNiQ2tnZTF4dUlDQWdJQ0FnSUNCMGFHbHpMblFnUFNCMGNtbHdiR1Z6TG5Ob2FXWjBLQ2s3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVaU0E5SUc1MWJHdzdYRzRnSUNBZ0lDQWdJR2xtSUNoMGNtbHdiR1Z6TG14bGJtZDBhQ0E5UFQwZ01Da2dleUIwYUdsekxtVWdQU0JsYkdWdFpXNTBPeUI5TzF4dUlDQWdJQ0FnSUNCMGFHbHpMbk4xWWtOdmRXNTBaWElnUFNBb2RISnBjR3hsY3k1c1pXNW5kR2dnUGlBd0lDWW1JREVwSUh4OElEQTdYRzRnSUNBZ0lDQWdJSFJvYVhNdVkyaHBiR1J5Wlc0Z1BTQmJYVHRjYmlBZ0lDQWdJQ0FnZEhKcGNHeGxjeTVzWlc1bmRHZ2dQaUF3SUNZbVhHNGdJQ0FnSUNBZ0lDQWdJQ0IwYUdsekxtTm9hV3hrY21WdUxuQjFjMmdvYm1WM0lFeFRaWEZPYjJSbEtIUnlhWEJzWlhNc0lHVnNaVzFsYm5RcEtUdGNiaUFnSUNCOU8xeHVJQ0FnSUZ4dUlDQWdJQzhxS2x4dUlDQWdJQ0FxSUVkbGRIUmxjaUIwYnlCMGFHVWdabWx5YzNRZ1kyaHBiR1F1WEc0Z0lDQWdJQ29nUUhKbGRIVnlibk1nZTB4VFpYRk9iMlJsZlNCVWFHVWdabWx5YzNRZ1kyaHBiR1FnYjJZZ2RHaHBjeUJ1YjJSbExpQk9kV3hzSUdsbUlHbDBJR1J2WlhNZ2JtOTBYRzRnSUNBZ0lDb2daWGhwYzNSekxseHVJQ0FnSUNBcUwxeHVJQ0FnSUdkbGRDQmphR2xzWkNBb0tTQjdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQW9LSFJvYVhNdVkyaHBiR1J5Wlc0dWJHVnVaM1JvSUQ0Z01Da2dKaVlnZEdocGN5NWphR2xzWkhKbGJsc3dYU2tnZkh3Z2JuVnNiRHRjYmlBZ0lDQjlPMXh1WEc0Z0lDQWdMeW9xWEc0Z0lDQWdJQ29nUTI5dGNHRnlZWFJ2Y2lCaVpYUjNaV1Z1SUhSdklFeFRaWEZPYjJSbGN5NWNiaUFnSUNBZ0tpQkFjR0Z5WVcwZ2UweFRaWEZPYjJSbGZTQnZJRlJvWlNCdmRHaGxjaUJNVTJWeFRtOWtaU0IwYnlCamIyMXdZWEpsSUhSdkxseHVJQ0FnSUNBcUwxeHVJQ0FnSUdOdmJYQmhjbVZVYnlBb2J5a2dlMXh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdkR2hwY3k1MExtTnZiWEJoY21WVWJ5aHZMblFwTzF4dUlDQWdJSDA3WEc0Z0lDQWdYRzRnSUNBZ0x5b3FYRzRnSUNBZ0lDb2dRV1JrSUdFZ2JtOWtaU0IwYnlCMGFHVWdZM1Z5Y21WdWRDQnViMlJsTGx4dUlDQWdJQ0FxSUVCd1lYSmhiU0I3VEZObGNVNXZaR1Y5SUc1dlpHVWdWR2hsSUc1dlpHVWdkRzhnWVdSa0lHRnpJR0VnWTJocGJHUnlaVzRnYjJZZ2RHaHBjeUJ1YjJSbExseHVJQ0FnSUNBcUlFQnlaWFIxY200Z2UwSnZiMnhsWVc1OUlFWmhiSE5sSUdsbUlIUm9aU0JsYkdWdFpXNTBJR0ZzY21WaFpIa2daWGhwYzNSekxDQlVjblZsSUc5MGFHVnlkMmx6WlM1Y2JpQWdJQ0FnS2k5Y2JpQWdJQ0JoWkdRZ0tHNXZaR1VwSUh0Y2JpQWdJQ0FnSUNBZ1kyOXVjM1FnYVc1a1pYZ2dQU0IwYUdsekxsOWlhVzVoY25sSmJtUmxlRTltS0c1dlpHVXBPMXh1SUNBZ0lDQWdJQ0JjYmlBZ0lDQWdJQ0FnTHk4Z0l6RWdhV1lnZEdobElIQmhkR2dnWkc4Z2JtOGdaWGhwYzNRc0lHTnlaV0YwWlNCcGRGeHVJQ0FnSUNBZ0lDQnBaaUFvSVhSb2FYTXVYMk52Ym5SaGFXNXpLRzV2WkdVcEtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCMGFHbHpMbU5vYVd4a2NtVnVMbk53YkdsalpTZ3RhVzVrWlhnc0lEQXNJRzV2WkdVcE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnZEdocGN5NXpkV0pEYjNWdWRHVnlJQ3M5SURFN1hHNGdJQ0FnSUNBZ0lDQWdJQ0F2THlBak1pQnZkR2hsY25kcGMyVXNJR052Ym5ScGJuVmxJSFJ2SUdWNGNHeHZjbVVnZEdobElITjFZblJ5WldWelhHNGdJQ0FnSUNBZ0lIMGdaV3h6WlNCcFppQW9ibTlrWlM1amFHbHNaSEpsYmk1c1pXNW5kR2dnUFQwOUlEQXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDOHZJQ015WVNCamFHVmpheUJwWmlCMGFHVWdaV3hsYldWdWRDQmhiSEpsWVdSNUlHVjRhWE4wYzF4dUlDQWdJQ0FnSUNBZ0lDQWdhV1lnS0hSb2FYTXVZMmhwYkdSeVpXNWJhVzVrWlhoZExtVWdJVDA5SUc1MWJHd3BlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSEpsZEhWeWJpQm1ZV3h6WlR0Y2JpQWdJQ0FnSUNBZ0lDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkR2hwY3k1amFHbHNaSEpsYmx0cGJtUmxlRjB1WlNBOUlHNXZaR1V1WlR0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCMGFHbHpMbk4xWWtOdmRXNTBaWElnS3owZ01UdGNiaUFnSUNBZ0lDQWdJQ0FnSUgwN1hHNGdJQ0FnSUNBZ0lDQWdJQ0F2THlBak15QnBaaUJrYVdSdWIzUWdaWGhwYzNRc0lHbHVZM0psYldWdWRDQjBhR1VnWTI5MWJuUmxjbHh1SUNBZ0lDQWdJQ0I5SUdWc2MyVWdhV1lnS0hSb2FYTXVZMmhwYkdSeVpXNWJhVzVrWlhoZExtRmtaQ2h1YjJSbExtTm9hV3hrS1NrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnZEdocGN5NXpkV0pEYjNWdWRHVnlJQ3M5SURFN1hHNGdJQ0FnSUNBZ0lIMDdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQjBjblZsTzF4dUlDQWdJSDA3WEc1Y2JseHVJQ0FnSUM4cUtseHVJQ0FnSUNBcUlGSmxiVzkyWlNCMGFHVWdibTlrWlNCdlppQjBhR1VnZEhKbFpTQmhibVFnWVd4c0lHNXZaR1VnZDJsMGFHbHVJSEJoZEdnZ1ltVnBibWNnZFhObGJHVnpjeTVjYmlBZ0lDQWdLaUJBY0dGeVlXMGdlMHhUWlhGT2IyUmxmU0J1YjJSbElIUm9aU0J1YjJSbElHTnZiblJoYVc1cGJtY2dkR2hsSUhCaGRHZ2dkRzhnY21WdGIzWmxYRzRnSUNBZ0lDb2dRSEpsZEhWeWJpQjdRbTl2YkdWaGJuMGdWSEoxWlNCcFppQjBhR1VnYm05a1pTQm9ZWE1nWW1WbGJpQnlaVzF2ZG1Wa0xDQkdZV3h6WlNCcFppQnBkQ0JrYjJWeklHNXZkRnh1SUNBZ0lDQXFJR1Y0YVhOMExseHVJQ0FnSUNBcUwxeHVJQ0FnSUdSbGJDQW9ibTlrWlNrZ2UxeHVJQ0FnSUNBZ0lDQmpiMjV6ZENCcGJtUmxlR1Z6SUQwZ2RHaHBjeTVmWjJWMFNXNWtaWGhsY3lodWIyUmxLVHRjYmlBZ0lDQWdJQ0FnYkdWMElHTjFjbkpsYm5SVWNtVmxJRDBnZEdocGN5d2dhU0E5SURBc0lHbHpVM0JzYVhSMFpXUWdQU0JtWVd4elpUdGNibHh1SUNBZ0lDQWdJQ0F2THlBak1TQlVhR1VnWld4bGJXVnVkQ0JrYjJWeklHNXZkQ0JsZUdsemRITXNJSE4wYjNCY2JpQWdJQ0FnSUNBZ2FXWWdLR2x1WkdWNFpYTXViR1Z1WjNSb0lEMDlQU0F3S1NCN0lISmxkSFZ5YmlCbVlXeHpaVHNnZlR0Y2JseHVJQ0FnSUNBZ0lDQXZMeUFqTWlCRGNtRjNiQ0IwYUdVZ2NHRjBhQ0JoYm1RZ2NtVnRiM1psSUhSb1pTQmxiR1Z0Wlc1MFhHNGdJQ0FnSUNBZ0lHTjFjbkpsYm5SVWNtVmxMbk4xWWtOdmRXNTBaWElnTFQwZ01UdGNiaUFnSUNBZ0lDQWdkMmhwYkdVZ0tHa2dQQ0JwYm1SbGVHVnpMbXhsYm1kMGFDQW1KaUFoS0dselUzQnNhWFIwWldRcEtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCc1pYUWdhWE5NWVhOMElEMGdZM1Z5Y21WdWRGUnlaV1V1WTJocGJHUnlaVzViYVc1a1pYaGxjMXRwWFYwdVgyaGhjMFZzWlcxbGJuUWdKaVpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JwSUQwOVBTQnBibVJsZUdWekxteGxibWQwYUNBdElERTdYRzRnSUNBZ0lDQWdJQ0FnSUNCcFppQW9JV2x6VEdGemRDa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR04xY25KbGJuUlVjbVZsTG1Ob2FXeGtjbVZ1VzJsdVpHVjRaWE5iYVYxZExuTjFZa052ZFc1MFpYSWdMVDBnTVRzZ0lDQWdJRnh1SUNBZ0lDQWdJQ0FnSUNBZ2ZUdGNiaUFnSUNBZ0lDQWdJQ0FnSUdsbUlDaGpkWEp5Wlc1MFZISmxaUzVqYUdsc1pISmxibHRwYm1SbGVHVnpXMmxkWFM1emRXSkRiM1Z1ZEdWeUlEdzlJREFnSmlaY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBb0lXTjFjbkpsYm5SVWNtVmxMbU5vYVd4a2NtVnVXMmx1WkdWNFpYTmJhVjFkTGw5b1lYTkZiR1Z0Wlc1MElIeDhJR2x6VEdGemRDa3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JqZFhKeVpXNTBWSEpsWlM1amFHbHNaSEpsYmk1emNHeHBZMlVvYVc1a1pYaGxjMXRwWFN3Z01TazdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdhWE5UY0d4cGRIUmxaQ0E5SUhSeWRXVTdYRzRnSUNBZ0lDQWdJQ0FnSUNCOU8xeHVJQ0FnSUNBZ0lDQWdJQ0FnWTNWeWNtVnVkRlJ5WldVZ1BTQmpkWEp5Wlc1MFZISmxaUzVqYUdsc1pISmxibHRwYm1SbGVHVnpXMmxkWFR0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ3NyYVR0Y2JpQWdJQ0FnSUNBZ2ZUdGNiaUFnSUNBZ0lDQWdhV1lnS0NGcGMxTndiR2wwZEdWa0tYc2dZM1Z5Y21WdWRGUnlaV1V1WlNBOUlHNTFiR3c3ZlR0Y2JseHVJQ0FnSUNBZ0lDQnlaWFIxY200Z2RISjFaVHRjYmlBZ0lDQjlPMXh1WEc1Y2JpQWdJQ0F2S2lwY2JpQWdJQ0FnS2lCVWFHVWdiM0prWlhKbFpDQjBjbVZsSUdOaGJpQmlaU0JzYVc1bFlYSnBlbVZrSUdsdWRHOGdZU0J6WlhGMVpXNWpaUzRnVkdocGN5Qm1kVzVqZEdsdmJpQm5aWFFnZEdobFhHNGdJQ0FnSUNvZ2FXNWtaWGdnYjJZZ2RHaGxJSEJoZEdnZ2NtVndjbVZ6Wlc1MFpXUWdZbmtnZEdobElHeHBjM1FnYjJZZ2RISnBjR3hsY3k1Y2JpQWdJQ0FnS2lCQWNHRnlZVzBnZTB4VFpYRk9iMlJsZlNCdWIyUmxJRlJvWlNCdWIyUmxJR052Ym5SaGFXNXBibWNnTFMwZ1lYUWdiR1ZoYzNRZ0xTMGdkR2hsSUhCaGRHZ2dkRzhnZEdobFhHNGdJQ0FnSUNvZ1pXeGxiV1Z1ZEM1Y2JpQWdJQ0FnS2lCQWNtVjBkWEp1SUh0T2RXMWlaWEo5SUZSb1pTQnBibVJsZUNCdlppQjBhR1VnYm05a1pTQnBiaUIwYUdVZ2JHbHVaV0Z5YVhwbFpDQnpaWEYxWlc1alpUc2dMVEVnYVdaY2JpQWdJQ0FnS2lCMGFHVWdaV3hsYldWdWRDQmtiMlZ6SUc1dmRDQmxlR2x6ZEM1Y2JpQWdJQ0FnS2k5Y2JpQWdJQ0JwYm1SbGVFOW1JQ2h1YjJSbEtTQjdYRzRnSUNBZ0lDQWdJR052Ym5OMElHbHVaR1Y0WlhNZ1BTQjBhR2x6TGw5blpYUkpibVJsZUdWektHNXZaR1VwTzF4dUlDQWdJQ0FnSUNCc1pYUWdjM1Z0SUQwZ01Dd2dZM1Z5Y21WdWRGUnlaV1VnUFNCMGFHbHpMQ0JxTzF4dUlDQWdJQ0FnSUNCY2JpQWdJQ0FnSUNBZ0x5OGdJekVnU1dZZ2RHaGxJRzV2WkdVZ1pHOWxjeUJ1YjNRZ1pYaHBjM1FzSUhOMGIzQmNiaUFnSUNBZ0lDQWdhV1lnS0dsdVpHVjRaWE11YkdWdVozUm9JRDA5UFNBd0tTQjdJSEpsZEhWeWJpQXRNVHNnZlR0Y2JseHVJQ0FnSUNBZ0lDQXZMeUFqTWlCUGRHaGxjbmRwYzJVc0lITjBZWEowSUdOdmRXNTBhVzVuWEc0Z0lDQWdJQ0FnSUdsbUlDaGpkWEp5Wlc1MFZISmxaUzVmYUdGelJXeGxiV1Z1ZENrZ2V5QnpkVzBnS3owZ01Uc2dmVHRjYmlBZ0lDQWdJQ0FnWEc0Z0lDQWdJQ0FnSUdadmNpQW9iR1YwSUdrZ1BTQXdPeUJwSUR3Z2FXNWtaWGhsY3k1c1pXNW5kR2c3SUNzcmFTa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLR2x1WkdWNFpYTmJhVjBnUENCamRYSnlaVzUwVkhKbFpTNWphR2xzWkhKbGJpNXNaVzVuZEdndk1pa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQzh2SUNOQklITjBZWEowSUdaeWIyMGdkR2hsSUdKbFoybHVibWx1WnlCYkxTMHRMVDU4SUNBZ0lDQmRYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdhaUE5SURBN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2QyaHBiR1VnS0dvZ1BDQnBibVJsZUdWelcybGRLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2hqZFhKeVpXNTBWSEpsWlM1amFHbHNaSEpsYmx0cVhTNWZhR0Z6Uld4bGJXVnVkQ2tnZXlCemRXMGdLejBnTVRzZ2ZUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYzNWdElDczlJR04xY25KbGJuUlVjbVZsTG1Ob2FXeGtjbVZ1VzJwZExuTjFZa052ZFc1MFpYSTdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNzcmFqdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjlPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBdkx5QWpRaUJ6ZEdGeWRDQm1jbTl0SUhSb1pTQmxibVFnV3lBZ0lDQWdmRHd0TFMwdFhWeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lITjFiU0FyUFNCamRYSnlaVzUwVkhKbFpTNXpkV0pEYjNWdWRHVnlPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR29nUFNCamRYSnlaVzUwVkhKbFpTNWphR2xzWkhKbGJpNXNaVzVuZEdnZ0xTQXhPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSGRvYVd4bElDaHFJRDQ5SUdsdVpHVjRaWE5iYVYwcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYVdZZ0tHTjFjbkpsYm5SVWNtVmxMbU5vYVd4a2NtVnVXMnBkTGw5b1lYTkZiR1Z0Wlc1MEtYc2djM1Z0SUMwOUlERTdJSDA3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lITjFiU0F0UFNCamRYSnlaVzUwVkhKbFpTNWphR2xzWkhKbGJsdHFYUzV6ZFdKRGIzVnVkR1Z5TzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQXRMV283WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlR0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCcUlDczlJREU3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjlPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLR04xY25KbGJuUlVjbVZsTG1Ob2FXeGtjbVZ1VzJwZExsOW9ZWE5GYkdWdFpXNTBLU0I3SUhOMWJTQXJQU0F4T3lCOU8xeHVJQ0FnSUNBZ0lDQWdJQ0FnWTNWeWNtVnVkRlJ5WldVZ1BTQmpkWEp5Wlc1MFZISmxaUzVqYUdsc1pISmxibHRxWFR0Y2JpQWdJQ0FnSUNBZ2ZUdGNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlITjFiU0F0SURFN0lDOHZJQzB4SUdKbFkyRjFjMlVnWVd4bmIzSnBkR2h0SUdOdmRXNTBaV1FnZEdobElHVnNaVzFsYm5RZ2FYUnpaV3htWEc0Z0lDQWdmVHRjYmx4dVhHNGdJQ0FnTHlvcVhHNGdJQ0FnSUNvZ1ZHaGxJRzl5WkdWeVpXUWdkSEpsWlNCallXNGdZbVVnYkdsdVpXRnlhWHBsWkM0Z1ZHaHBjeUJtZFc1amRHbHZiaUJuWlhSeklIUm9aU0J1YjJSbElHRjBJSFJvWlZ4dUlDQWdJQ0FxSUdsdVpHVjRJR2x1SUhSb1pTQndjbTlxWldOMFpXUWdjMlZ4ZFdWdVkyVXVYRzRnSUNBZ0lDb2dRSEJoY21GdElIdE9kVzFpWlhKOUlHbHVaR1Y0SUZSb1pTQnBibVJsZUNCcGJpQjBhR1VnYzJWeGRXVnVZMlV1WEc0Z0lDQWdJQ29nUUhKbGRIVnliaUI3VEZObGNVNXZaR1Y5SUZSb1pTQnViMlJsSUdGMElIUm9aU0JwYm1SbGVDNWNiaUFnSUNBZ0tpOWNiaUFnSUNCblpYUWdLR2x1WkdWNEtTQjdYRzVjYmlBZ0lDQWdJQ0FnTHlvcVhHNGdJQ0FnSUNBZ0lDQXFJRUJ3WVhKaGJTQjdUblZ0WW1WeWZTQnNaV1owVTNWdElGUm9aU0J6ZFcwZ2IyWWdZV3hzSUdWc1pXMWxiblFnWVhRZ2RHaGxJR3hsWm5RZ2IyWWdkR2hsWEc0Z0lDQWdJQ0FnSUNBcUlHTjFjbkpsYm5RZ2FXNXpjR1ZqZEdWa0lHNXZaR1V1WEc0Z0lDQWdJQ0FnSUNBcUlFQndZWEpoYlNCN1RGTmxjVTV2WkdWOUlHSjFhV3hrYVc1blRtOWtaU0JVYUdVZ2FHVmhaQ0J3WVhKMElHOW1JSFJvWlNCdWIyUmxJR0psYVc1bklHSjFhV3gwWEc0Z0lDQWdJQ0FnSUNBcUlHRnpJSGRsSUdOeVlYZHNMbHh1SUNBZ0lDQWdJQ0FnS2lCQWNHRnlZVzBnZTB4VFpYRk9iMlJsZlNCeGRXVjFaU0JVYUdVZ2NYVmxkV1VnY0dGeWRDQnZaaUIwYUdVZ2JtOWtaU0JpWldsdVp5QmlkV2xzZEM1Y2JpQWdJQ0FnSUNBZ0lDb2dRSEJoY21GdElIdE1VMlZ4VG05a1pYMGdZM1Z5Y21WdWRFNXZaR1VnVkdobElITjFZblJ5WldVZ1ltVnBibWNnWTNKaGQyeGxaQzVjYmlBZ0lDQWdJQ0FnSUNvdlhHNGdJQ0FnSUNBZ0lHTnZibk4wSUY5blpYUWdQU0FvYkdWbWRGTjFiU3dnWW5WcGJHUnBibWRPYjJSbExDQnhkV1YxWlN3Z1kzVnljbVZ1ZEU1dlpHVXBJRDArSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJR3hsZENCemRHRnlkRUpsWjJsdWJtbHVaeUE5SUhSeWRXVXNJSFZ6WlVaMWJtTjBhVzl1TENCcElEMGdNQ3dnY0N3Z2RHVnRjRHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDOHZJQ013SUZSb1pTQnViMlJsSUdseklHWnZkVzVrTENCeVpYUjFjbTRnZEdobElHbHVZM0psYldWdWRHRnNiSGtnWW5WcGJIUWdibTlrWlNCaGJtUmNiaUFnSUNBZ0lDQWdJQ0FnSUM4dklIQnlZV2x6WlNCMGFHVWdjM1Z1SUNGY2JpQWdJQ0FnSUNBZ0lDQWdJR2xtSUNoc1pXWjBVM1Z0SUQwOVBTQnBibVJsZUNBbUppQmpkWEp5Wlc1MFRtOWtaUzVmYUdGelJXeGxiV1Z1ZENrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDOHZJREZoSUdOdmNIa2dkR2hsSUhaaGJIVmxJRzltSUhSb1pTQmxiR1Z0Wlc1MElHbHVJSFJvWlNCd1lYUm9YRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdjWFZsZFdVdVpTQTlJR04xY25KbGJuUk9iMlJsTG1VN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUdKMWFXeGthVzVuVG05a1pUdGNiaUFnSUNBZ0lDQWdJQ0FnSUgwN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb1kzVnljbVZ1ZEU1dlpHVXVYMmhoYzBWc1pXMWxiblFwZXlCc1pXWjBVM1Z0SUNzOUlERTdJSDA3WEc0Z0lDQWdJQ0FnSUNBZ0lDQmNiaUFnSUNBZ0lDQWdJQ0FnSUM4dklDTXhJSE5sWVhKamFEb2daRzhnU1NCemRHRnlkQ0JtY205dElIUm9aU0JpWldkcGJtNXBibWNnYjNJZ2RHaGxJR1Z1WkZ4dUlDQWdJQ0FnSUNBZ0lDQWdjM1JoY25SQ1pXZHBibTVwYm1jZ1BTQnBibVJsZUMxc1pXWjBVM1Z0SUR3Z1kzVnljbVZ1ZEU1dlpHVXVjM1ZpUTI5MWJuUmxjaTh5TzF4dUlDQWdJQ0FnSUNBZ0lDQWdhV1lnS0hOMFlYSjBRbVZuYVc1dWFXNW5LU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZFhObFJuVnVZM1JwYjI0Z1BTQW9ZU3dnWWlrZ1BUNGdZU0FySUdJN1hHNGdJQ0FnSUNBZ0lDQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR3hsWm5SVGRXMGdLejBnWTNWeWNtVnVkRTV2WkdVdWMzVmlRMjkxYm5SbGNqdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQjFjMlZHZFc1amRHbHZiaUE5SUNoaExDQmlLU0E5UGlCaElDMGdZanRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdJQ0FnSUZ4dUlDQWdJQ0FnSUNBZ0lDQWdMeThnSXpKaElHTnZkVzUwYVc1bklIUm9aU0JsYkdWdFpXNTBJR1p5YjIwZ2JHVm1kQ0IwYnlCeWFXZG9kRnh1SUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLQ0Z6ZEdGeWRFSmxaMmx1Ym1sdVp5a2dleUJwSUQwZ1kzVnljbVZ1ZEU1dlpHVXVZMmhwYkdSeVpXNHViR1Z1WjNSb0lDMGdNVHNnZlR0Y2JpQWdJQ0FnSUNBZ0lDQWdJSGRvYVd4bElDZ29jM1JoY25SQ1pXZHBibTVwYm1jZ0ppWWdiR1ZtZEZOMWJTQThQU0JwYm1SbGVDa2dmSHhjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBb0lYTjBZWEowUW1WbmFXNXVhVzVuSUNZbUlHeGxablJUZFcwZ1BpQnBibVJsZUNrcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnBaaUFvWTNWeWNtVnVkRTV2WkdVdVkyaHBiR1J5Wlc1YmFWMHVYMmhoYzBWc1pXMWxiblFwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdiR1ZtZEZOMWJTQTlJSFZ6WlVaMWJtTjBhVzl1S0d4bFpuUlRkVzBzSURFcE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIMDdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdiR1ZtZEZOMWJTQTlJSFZ6WlVaMWJtTjBhVzl1S0d4bFpuUlRkVzBzWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHTjFjbkpsYm5ST2IyUmxMbU5vYVd4a2NtVnVXMmxkTG5OMVlrTnZkVzUwWlhJcE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHa2dQU0IxYzJWR2RXNWpkR2x2YmlocExDQXhLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMDdYRzRnSUNBZ0lDQWdJQ0FnSUNCY2JpQWdJQ0FnSUNBZ0lDQWdJQzh2SUNNeVlpQmtaV055WldGemFXNW5JSFJvWlNCcGJtTnlaVzFsYm5SaGRHbHZibHh1SUNBZ0lDQWdJQ0FnSUNBZ2FTQTlJSFZ6WlVaMWJtTjBhVzl1S0drc0lDMHhLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2h6ZEdGeWRFSmxaMmx1Ym1sdVp5a2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR2xtSUNoamRYSnlaVzUwVG05a1pTNWphR2xzWkhKbGJsdHBYUzVmYUdGelJXeGxiV1Z1ZENrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JzWldaMFUzVnRJRDBnZFhObFJuVnVZM1JwYjI0b2JHVm1kRk4xYlN3Z0xURXBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDA3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnYkdWbWRGTjFiU0E5SUhWelpVWjFibU4wYVc5dUtHeGxablJUZFcwc1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQzFqZFhKeVpXNTBUbTlrWlM1amFHbHNaSEpsYmx0cFhTNXpkV0pEYjNWdWRHVnlLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMDdYRzRnSUNBZ0lDQWdJQ0FnSUNCY2JpQWdJQ0FnSUNBZ0lDQWdJQzh2SUNNeklHSjFhV3hrSUhCaGRHaGNiaUFnSUNBZ0lDQWdJQ0FnSUhBZ1BTQmJYVHNnY0M1d2RYTm9LR04xY25KbGJuUk9iMlJsTG1Ob2FXeGtjbVZ1VzJsZExuUXBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLR0oxYVd4a2FXNW5UbTlrWlNBOVBUMGdiblZzYkNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHSjFhV3hrYVc1blRtOWtaU0E5SUc1bGR5Qk1VMlZ4VG05a1pTaHdMQ0J1ZFd4c0tUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnhkV1YxWlNBOUlHSjFhV3hrYVc1blRtOWtaVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RHVnRjQ0E5SUc1bGR5Qk1VMlZ4VG05a1pTaHdMQ0J1ZFd4c0tUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnhkV1YxWlM1aFpHUW9kR1Z0Y0NrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2NYVmxkV1VnUFNCMFpXMXdPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2ZUdGNiaUFnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJmWjJWMEtHeGxablJUZFcwc0lHSjFhV3hrYVc1blRtOWtaU3dnY1hWbGRXVXNJR04xY25KbGJuUk9iMlJsTG1Ob2FXeGtjbVZ1VzJsZEtUdGNiaUFnSUNBZ0lDQWdmVHRjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJRjluWlhRb01Dd2diblZzYkN3Z2JuVnNiQ3dnZEdocGN5azdYRzRnSUNBZ2ZUdGNibHh1SUNBZ0lDOHFLbHh1SUNBZ0lDQXFJRU5oYzNRZ1lTQktVMDlPSUc5aWFtVmpkQ0IwYnlCaGJpQk1VMlZ4VG05a1pTNGdYRzRnSUNBZ0lDb2dRSEJoY21GdElIdFBZbXBsWTNSOUlHOGdWR2hsSUVwVFQwNGdiMkpxWldOMExseHVJQ0FnSUNBcUlFQnlaWFIxY200Z2UweFRaWEZPYjJSbGZTQkJiaUJNVTJWeFRtOWtaUzVjYmlBZ0lDQWdLaTljYmlBZ0lDQnpkR0YwYVdNZ1puSnZiVXBUVDA0Z0tHOHBJSHRjYmlBZ0lDQWdJQ0FnYkdWMElHSmxhVzVuUW5WcGJIUTdYRzVjYmlBZ0lDQWdJQ0FnTHk4Z0l6RWdiR1ZoWmx4dUlDQWdJQ0FnSUNCcFppQW9ieTVqYUdsc1pISmxiaTVzWlc1bmRHZ2dQVDA5SURBcGUxeHVJQ0FnSUNBZ0lDQWdJQ0FnWW1WcGJtZENkV2xzZENBOUlHNWxkeUJNVTJWeFRtOWtaU2hiYm1WM0lGUnlhWEJzWlNodkxuUXVjQ3dnYnk1MExuTXNJRzh1ZEM1aktWMHNJRzh1WlNrN1hHNGdJQ0FnSUNBZ0lIMGdaV3h6WlNCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0F2THlBak1pQmljbUZ1WTJoY2JpQWdJQ0FnSUNBZ0lDQWdJR0psYVc1blFuVnBiSFFnUFNCdVpYY2dURk5sY1U1dlpHVW9XMjVsZHlCVWNtbHdiR1VvYnk1MExuQXNJRzh1ZEM1ekxDQnZMblF1WXlsZEtUdGNiaUFnSUNBZ0lDQWdJQ0FnSUdKbGFXNW5RblZwYkhRdVkyaHBiR1J5Wlc0dWNIVnphQ2hNVTJWeFRtOWtaUzVtY205dFNsTlBUaWh2TG1Ob2FXeGtjbVZ1V3pCZEtTazdYRzRnSUNBZ0lDQWdJSDA3WEc0Z0lDQWdJQ0FnSUZ4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnWW1WcGJtZENkV2xzZER0Y2JpQWdJQ0I5TzF4dUlDQWdJRnh1SUNBZ0lDOHFLbHh1SUNBZ0lDQXFJRUJ3Y21sMllYUmxJRWRsZENCMGFHVWdiR2x6ZENCdlppQnBibVJsZUdWeklHOW1JSFJvWlNCaGNuSmhlWE1nY21Wd2NtVnpaVzUwYVc1bklIUm9aU0JqYUdsc1pISmxibHh1SUNBZ0lDQXFJR2x1SUhSb1pTQjBjbVZsTGlBZ1hHNGdJQ0FnSUNvZ1FIQmhjbUZ0SUh0TVUyVnhUbTlrWlgwZ2JtOWtaU0JVYUdVZ2JtOWtaU0JqYjI1MFlXbHVhVzVuSUhSb1pTQndZWFJvTGx4dUlDQWdJQ0FxSUVCeVpYUjFjbTRnZTA1MWJXSmxjbHRkZlNCVWFHVWdjM1ZqWTJWemMybDJaU0JwYm1SbGVHVnpJSFJ2SUdkbGRDQjBieUIwYUdVZ2JtOWtaUzRnUVc0Z1pXMXdkSGxjYmlBZ0lDQWdLaUJzYVhOMElHbG1JSFJvWlNCdWIyUmxJR1J2WlhNZ2JtOTBJR1Y0YVhOMExseHVJQ0FnSUNBcUwxeHVJQ0FnSUY5blpYUkpibVJsZUdWeklDaHViMlJsS1NCN1hHNGdJQ0FnSUNBZ0lHTnZibk4wSUY5ZloyVjBTVzVrWlhobGN5QTlJQ2hwYm1SbGVHVnpMQ0JqZFhKeVpXNTBWSEpsWlN3Z1kzVnljbVZ1ZEU1dlpHVXBJRDArSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJR2xtSUNnaFkzVnljbVZ1ZEZSeVpXVXVYMk52Ym5SaGFXNXpLR04xY25KbGJuUk9iMlJsS1NrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCYlhUdGNiaUFnSUNBZ0lDQWdJQ0FnSUgwN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JjYmlBZ0lDQWdJQ0FnSUNBZ0lHTnZibk4wSUdsdVpHVjRJRDBnWTNWeWNtVnVkRlJ5WldVdVgySnBibUZ5ZVVsdVpHVjRUMllvWTNWeWNtVnVkRTV2WkdVcE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnWEc0Z0lDQWdJQ0FnSUNBZ0lDQnBibVJsZUdWekxuQjFjMmdvYVc1a1pYZ3BPMXh1SUNBZ0lDQWdJQ0FnSUNBZ1hHNGdJQ0FnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdLQ2hqZFhKeVpXNTBUbTlrWlM1amFHbHNaSEpsYmk1c1pXNW5kR2dnUFQwOUlEQWdmSHhjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHTjFjbkpsYm5SVWNtVmxMbU5vYVd4a2NtVnVMbXhsYm1kMGFDQTlQVDBnTUNrZ0ppWWdhVzVrWlhobGN5a2dmSHhjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JmWDJkbGRFbHVaR1Y0WlhNb2FXNWtaWGhsY3l4Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdZM1Z5Y21WdWRGUnlaV1V1WTJocGJHUnlaVzViYVc1a1pYaGRMRnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCamRYSnlaVzUwVG05a1pTNWphR2xzWkNrN0lDQWdJQ0FnSUNBZ0lDQWdYRzRnSUNBZ0lDQWdJSDA3WEc0Z0lDQWdJQ0FnSUZ4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnWDE5blpYUkpibVJsZUdWektGdGRMQ0IwYUdsekxDQnViMlJsS1R0Y2JpQWdJQ0I5TzF4dUlDQWdJRnh1SUNBZ0lGeHVYRzVjYmlBZ0lDQXZLaXBjYmlBZ0lDQWdLaUJBY0hKcGRtRjBaU0JtY205dE9pQmJhSFIwY0hNNkx5OW5hWE4wTG1kcGRHaDFZaTVqYjIwdlYyOXNabms0Tnk4MU56TTBOVE13WFNCUVpYSm1iM0p0Y3lCaFhHNGdJQ0FnSUNvZ1ltbHVZWEo1SUhObFlYSmphQ0J2YmlCMGFHVWdhRzl6ZENCaGNuSmhlUzVjYmlBZ0lDQWdLaUJBY0dGeVlXMGdlMHhUWlhGT2IyUmxmU0J6WldGeVkyaEZiR1Z0Wlc1MElGUm9aU0JwZEdWdElIUnZJSE5sWVhKamFDQm1iM0lnZDJsMGFHbHVJSFJvWlNCaGNuSmhlUzVjYmlBZ0lDQWdLaUJBY21WMGRYSnVJSHRPZFcxaVpYSjlJRlJvWlNCcGJtUmxlQ0J2WmlCMGFHVWdaV3hsYldWdWRDQjNhR2xqYUNCa1pXWmhkV3gwY3lCMGJ5QXRNU0IzYUdWdUlHNXZkRnh1SUNBZ0lDQXFJR1p2ZFc1a0xseHVJQ0FnSUNBcUwxeHVJQ0FnSUY5aWFXNWhjbmxKYm1SbGVFOW1JQ2h6WldGeVkyaEZiR1Z0Wlc1MEtTQjdYRzRnSUNBZ0lDQWdJR3hsZENCdGFXNUpibVJsZUNBOUlEQTdYRzRnSUNBZ0lDQWdJR3hsZENCdFlYaEpibVJsZUNBOUlIUm9hWE11WTJocGJHUnlaVzR1YkdWdVozUm9JQzBnTVR0Y2JpQWdJQ0FnSUNBZ2JHVjBJR04xY25KbGJuUkpibVJsZUR0Y2JpQWdJQ0FnSUNBZ2JHVjBJR04xY25KbGJuUkZiR1Z0Wlc1ME8xeHVJQ0FnSUNBZ0lDQmNiaUFnSUNBZ0lDQWdkMmhwYkdVZ0tHMXBia2x1WkdWNElEdzlJRzFoZUVsdVpHVjRLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQmpkWEp5Wlc1MFNXNWtaWGdnUFNCTllYUm9MbVpzYjI5eUtDaHRhVzVKYm1SbGVDQXJJRzFoZUVsdVpHVjRLU0F2SURJcE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnWTNWeWNtVnVkRVZzWlcxbGJuUWdQU0IwYUdsekxtTm9hV3hrY21WdVcyTjFjbkpsYm5SSmJtUmxlRjA3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnBaaUFvWTNWeWNtVnVkRVZzWlcxbGJuUXVZMjl0Y0dGeVpWUnZLSE5sWVhKamFFVnNaVzFsYm5RcElEd2dNQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUcxcGJrbHVaR1Y0SUQwZ1kzVnljbVZ1ZEVsdVpHVjRJQ3NnTVR0Y2JpQWdJQ0FnSUNBZ0lDQWdJSDBnWld4elpTQnBaaUFvWTNWeWNtVnVkRVZzWlcxbGJuUXVZMjl0Y0dGeVpWUnZLSE5sWVhKamFFVnNaVzFsYm5RcElENGdNQ2tnZTF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUcxaGVFbHVaR1Y0SUQwZ1kzVnljbVZ1ZEVsdVpHVjRJQzBnTVR0Y2JpQWdJQ0FnSUNBZ0lDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlHTjFjbkpsYm5SSmJtUmxlRHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMDdYRzRnSUNBZ0lDQWdJSDA3WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUIrYldGNFNXNWtaWGc3WEc0Z0lDQWdmVHRjYmx4dUlDQWdJQzhxS2x4dUlDQWdJQ0FxSUVCd2NtbDJZWFJsSUVOb1pXTnJJSGRvWlhSb1pYSWdkR2hwY3lCdWIyUmxJR052Ym5SaGFXNXpJSFJvWlNCelpXRnlZMmhGYkdWdFpXNTBJR0Z6SUdOb2FXeGtjbVZ1TGx4dUlDQWdJQ0FxSUVCd1lYSmhiU0I3VEZObGNVNXZaR1Y5SUhObFlYSmphRVZzWlcxbGJuUWdWR2hsSUdWc1pXMWxiblFnZEc4Z2JHOXZheUJtYjNJdVhHNGdJQ0FnSUNvZ1FISmxkSFZ5YmlCN1FtOXZiR1ZoYm4wZ1ZISjFaU0JwWmlCMGFHbHpJRzV2WkdVZ1kyOXVkR0ZwYm5NZ2RHaGxJRzV2WkdVZ2FXNGdhWFJ6WEc0Z0lDQWdJQ29nWTJocGJHUnlaVzRzSUVaaGJITmxJRzkwYUdWeWQybHpaUzVjYmlBZ0lDQWdLaTljYmlBZ0lDQmZZMjl1ZEdGcGJuTWdLSE5sWVhKamFFVnNaVzFsYm5RcElIdGNiaUFnSUNBZ0lDQWdZMjl1YzNRZ2FXNWtaWGdnUFNCMGFHbHpMbDlpYVc1aGNubEpibVJsZUU5bUtITmxZWEpqYUVWc1pXMWxiblFwTzF4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnZEdocGN5NWphR2xzWkhKbGJpNXNaVzVuZEdnZ1BpQXdJQ1ltWEc0Z0lDQWdJQ0FnSUNBZ0lDQW9hVzVrWlhnZ1BpQXdJSHg4WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdLQ2hwYm1SbGVDQTlQVDBnTUNrZ0ppWmNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ2RHaHBjeTVqYUdsc1pDNWpiMjF3WVhKbFZHOG9jMlZoY21Ob1JXeGxiV1Z1ZENrZ1BUMDlJREFwS1R0Y2JpQWdJQ0I5TzF4dVhHNGdJQ0FnTHlvcVhHNGdJQ0FnSUNvZ1FIQnlhWFpoZEdVZ1EyaGxZMnNnYVdZZ2RHaGxJRzV2WkdVZ1kyOXVkR0ZwYm5NZ1lXNGdaV3hsYldWdWRDNWNiaUFnSUNBZ0tpQkFjbVYwZFhKdUlIdENiMjlzWldGdWZTQlVjblZsSUdsbUlIUm9aU0J1YjJSbElHaGhjeUJoYmlCbGJHVnRaVzUwTENCbVlXeHpaU0J2ZEdobGNuZHBjMlV1WEc0Z0lDQWdJQ292WEc0Z0lDQWdaMlYwSUY5b1lYTkZiR1Z0Wlc1MElDZ3BJSHRjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJSFJvYVhNdVpTQWhQVDBnYm5Wc2JEdGNiaUFnSUNCOU8xeHVYRzRnSUNBZ0x5b3FYRzRnSUNBZ0lDb2dRMmhsWTJzZ2FXWWdkR2hsSUc1dlpHVWdhR0Z6SUdOb2FXeGtjbVZ1TGx4dUlDQWdJQ0FxSUVCeVpYUjFjbTRnZTBKdmIyeGxZVzU5SUZSeWRXVWdhV1lnZEdobElHNXZaR1VnYUdGeklHTm9hV3hrY21WdUxDQm1ZV3h6WlNCdmRHaGxjbmRwYzJVdVhHNGdJQ0FnSUNvdlhHNGdJQ0FnWjJWMElHbHpUR1ZoWmlBb0tTQjdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQjBhR2x6TG1Ob2FXeGtjbVZ1TG14bGJtZDBhQ0E5UFQwZ01EdGNiaUFnSUNCOU8xeHVJQ0FnSUZ4dWZUdGNibHh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0JNVTJWeFRtOWtaVHRjYmx4dUlsMTkiLCIndXNlIHN0cmljdCc7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBCSSA9IHJlcXVpcmUoJ0JpZ0ludCcpO1xudmFyIElkZW50aWZpZXIgPSByZXF1aXJlKCcuL2lkZW50aWZpZXIuanMnKTtcblxuLyoqXG4gKiBFbnVtZXJhdGUgdGhlIGF2YWlsYWJsZSBzdWItYWxsb2NhdGlvbiBzdHJhdGVnaWVzLiBUaGUgc2lnbmF0dXJlIG9mIHRoZXNlXG4gKiBmdW5jdGlvbnMgaXMgZihJZCwgSWQsIE4rLCBOKywgTiwgTik6IElkLlxuICovXG5cbnZhciBTdHJhdGVneSA9IGZ1bmN0aW9uICgpIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0Jhc2V9IGJhc2UgVGhlIGJhc2UgdXNlZCB0byBjcmVhdGUgdGhlIG5ldyBpZGVudGlmaWVycy5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gW2JvdW5kYXJ5ID0gMTBdIFRoZSB2YWx1ZSB1c2VkIGFzIHRoZSBkZWZhdWx0IG1heGltdW1cbiAgICAgKiBzcGFjaW5nIGJldHdlZW4gaWRlbnRpZmllcnMuXG4gICAgICovXG4gICAgZnVuY3Rpb24gU3RyYXRlZ3koYmFzZSkge1xuICAgICAgICB2YXIgYm91bmRhcnkgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IDEwO1xuXG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBTdHJhdGVneSk7XG5cbiAgICAgICAgdGhpcy5fYmFzZSA9IGJhc2U7XG4gICAgICAgIHRoaXMuX2JvdW5kYXJ5ID0gYm91bmRhcnk7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKFN0cmF0ZWd5LCBbe1xuICAgICAgICBrZXk6ICdiUGx1cycsXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogQ2hvb3NlIGFuIGlkZW50aWZpZXIgc3RhcnRpbmcgZnJvbSBwcmV2aW91cyBib3VuZCBhbmQgYWRkaW5nIHJhbmRvbVxuICAgICAgICAgKiBudW1iZXIuXG4gICAgICAgICAqIEBwYXJhbSB7TFNlcU5vZGV9IHAgVGhlIHByZXZpb3VzIGlkZW50aWZpZXIuXG4gICAgICAgICAqIEBwYXJhbSB7TFNlcU5vZGV9IHEgVGhlIG5leHQgaWRlbnRpZmllci5cbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IGxldmVsIFRoZSBudW1iZXIgb2YgY29uY2F0ZW5hdGlvbiBjb21wb3NpbmcgdGhlIG5ld1xuICAgICAgICAgKiBpZGVudGlmaWVyLlxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gaW50ZXJ2YWwgVGhlIGludGVydmFsIGJldHdlZW4gcCBhbmQgcS5cbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHMgVGhlIHNvdXJjZSB0aGF0IGNyZWF0ZXMgdGhlIG5ldyBpZGVudGlmaWVyLlxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gYyBUaGUgY291bnRlciBvZiB0aGF0IHNvdXJjZS5cbiAgICAgICAgICogQHJldHVybiB7SWRlbnRpZmllcn0gVGhlIG5ldyBhbGxvY2F0ZWQgaWRlbnRpZmllci5cbiAgICAgICAgICovXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBiUGx1cyhwLCBxLCBsZXZlbCwgaW50ZXJ2YWwsIHMsIGMpIHtcbiAgICAgICAgICAgIHZhciBjb3B5UCA9IHAsXG4gICAgICAgICAgICAgICAgY29weVEgPSBxLFxuICAgICAgICAgICAgICAgIHN0ZXAgPSBNYXRoLm1pbih0aGlzLl9ib3VuZGFyeSwgaW50ZXJ2YWwpLFxuICAgICAgICAgICAgICAgIC8vIzAgdGhlIG1pbiBpbnRlcnZhbFxuICAgICAgICAgICAgZGlnaXQgPSBCSS5pbnQyYmlnSW50KDAsIHRoaXMuX2Jhc2UuZ2V0U3VtQml0KGxldmVsKSksXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2b2lkIDA7XG5cbiAgICAgICAgICAgIC8vICMxIGNvcHkgdGhlIHByZXZpb3VzIGlkZW50aWZpZXJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDw9IGxldmVsOyArK2kpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHAgJiYgcC50LnAgfHwgMDtcbiAgICAgICAgICAgICAgICBCSS5hZGRJbnRfKGRpZ2l0LCB2YWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKGkgIT09IGxldmVsKSB7XG4gICAgICAgICAgICAgICAgICAgIEJJLmxlZnRTaGlmdF8oZGlnaXQsIHRoaXMuX2Jhc2UuZ2V0Qml0QmFzZShpICsgMSkpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgcCA9IHAgJiYgIXAuaXNMZWFmICYmIHAuY2hpbGQgfHwgbnVsbDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAvLyAjMiBjcmVhdGUgYSBkaWdpdCBmb3IgYW4gaWRlbnRpZmllciBieSBhZGRpbmcgYSByYW5kb20gdmFsdWVcbiAgICAgICAgICAgIC8vICNBIERpZ2l0XG4gICAgICAgICAgICBCSS5hZGRJbnRfKGRpZ2l0LCBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBzdGVwICsgMSkpO1xuICAgICAgICAgICAgLy8gI0IgU291cmNlICYgY291bnRlclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2dldFNDKGRpZ2l0LCBjb3B5UCwgY29weVEsIGxldmVsLCBzLCBjKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnYk1pbnVzJyxcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDaG9vc2UgYW4gaWRlbnRpZmllciBzdGFydGluZyBmcm9tIG5leHQgYm91bmQgYW5kIHN1YnN0cmFjdCBhIHJhbmRvbVxuICAgICAgICAgKiBudW1iZXIuXG4gICAgICAgICAqIEBwYXJhbSB7TFNlcU5vZGV9IHAgVGhlIHByZXZpb3VzIGlkZW50aWZpZXIuXG4gICAgICAgICAqIEBwYXJhbSB7TFNlcU5vZGV9IHEgVGhlIG5leHQgaWRlbnRpZmllci5cbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IGxldmVsIFRoZSBudW1iZXIgb2YgY29uY2F0ZW5hdGlvbiBjb21wb3NpbmcgdGhlIG5ld1xuICAgICAgICAgKiBpZGVudGlmaWVyLlxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gaW50ZXJ2YWwgVGhlIGludGVydmFsIGJldHdlZW4gcCBhbmQgcS5cbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHMgVGhlIHNvdXJjZSB0aGF0IGNyZWF0ZXMgdGhlIG5ldyBpZGVudGlmaWVyLlxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gYyBUaGUgY291bnRlciBvZiB0aGF0IHNvdXJjZS5cbiAgICAgICAgICovXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBiTWludXMocCwgcSwgbGV2ZWwsIGludGVydmFsLCBzLCBjKSB7XG4gICAgICAgICAgICB2YXIgY29weVAgPSBwLFxuICAgICAgICAgICAgICAgIGNvcHlRID0gcSxcbiAgICAgICAgICAgICAgICBzdGVwID0gTWF0aC5taW4odGhpcy5fYm91bmRhcnksIGludGVydmFsKSxcbiAgICAgICAgICAgICAgICAvLyAjMCBwcm9jZXNzIG1pbiBpbnRlcnZhbFxuICAgICAgICAgICAgZGlnaXQgPSBCSS5pbnQyYmlnSW50KDAsIHRoaXMuX2Jhc2UuZ2V0U3VtQml0KGxldmVsKSksXG4gICAgICAgICAgICAgICAgcElzR3JlYXRlciA9IGZhbHNlLFxuICAgICAgICAgICAgICAgIGNvbW1vblJvb3QgPSB0cnVlLFxuICAgICAgICAgICAgICAgIHByZXZWYWx1ZSA9IHZvaWQgMCxcbiAgICAgICAgICAgICAgICBuZXh0VmFsdWUgPSB2b2lkIDA7XG5cbiAgICAgICAgICAgIC8vICMxIGNvcHkgbmV4dCwgaWYgcHJldmlvdXMgaXMgZ3JlYXRlciwgY29weSBtYXhWYWx1ZSBAIGRlcHRoXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8PSBsZXZlbDsgKytpKSB7XG4gICAgICAgICAgICAgICAgcHJldlZhbHVlID0gcCAmJiBwLnQucCB8fCAwO1xuICAgICAgICAgICAgICAgIG5leHRWYWx1ZSA9IHEgJiYgcS50LnAgfHwgMDtcblxuICAgICAgICAgICAgICAgIGlmIChjb21tb25Sb290ICYmIHByZXZWYWx1ZSAhPT0gbmV4dFZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbW1vblJvb3QgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgcElzR3JlYXRlciA9IHByZXZWYWx1ZSA+IG5leHRWYWx1ZTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGlmIChwSXNHcmVhdGVyKSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHRWYWx1ZSA9IE1hdGgucG93KDIsIHRoaXMuX2Jhc2UuZ2V0Qml0QmFzZShpKSkgLSAxO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgQkkuYWRkSW50XyhkaWdpdCwgbmV4dFZhbHVlKTtcbiAgICAgICAgICAgICAgICBpZiAoaSAhPT0gbGV2ZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgQkkubGVmdFNoaWZ0XyhkaWdpdCwgdGhpcy5fYmFzZS5nZXRCaXRCYXNlKGkgKyAxKSk7XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHEgPSBxICYmICFxLmlzTGVhZiAmJiBxLmNoaWxkIHx8IG51bGw7XG4gICAgICAgICAgICAgICAgcCA9IHAgJiYgIXAuaXNMZWFmICYmIHAuY2hpbGQgfHwgbnVsbDtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vICMzIGNyZWF0ZSBhIGRpZ2l0IGZvciBhbiBpZGVudGlmaWVyIGJ5IHN1YmluZyBhIHJhbmRvbSB2YWx1ZVxuICAgICAgICAgICAgLy8gI0EgRGlnaXRcbiAgICAgICAgICAgIGlmIChwSXNHcmVhdGVyKSB7XG4gICAgICAgICAgICAgICAgQkkuYWRkSW50XyhkaWdpdCwgLU1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHN0ZXApKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgQkkuYWRkSW50XyhkaWdpdCwgLU1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHN0ZXApIC0gMSk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAvLyAjQiBTb3VyY2UgJiBjb3VudGVyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ2V0U0MoZGlnaXQsIGNvcHlQLCBjb3B5USwgbGV2ZWwsIHMsIGMpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdfZ2V0U0MnLFxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvcGllcyB0aGUgYXBwcm9wcmlhdGVzIHNvdXJjZSBhbmQgY291bnRlciBmcm9tIHRoZSBhZGphY2VudCBpZGVudGlmaWVyc1xuICAgICAgICAgKiBhdCB0aGUgaW5zZXJ0aW9uIHBvc2l0aW9uLlxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gZCBUaGUgZGlnaXQgcGFydCBvZiB0aGUgbmV3IGlkZW50aWZpZXIuXG4gICAgICAgICAqIEBwYXJhbSB7TFNlcU5vZGV9IHAgVGhlIHByZXZpb3VzIGlkZW50aWZpZXIuXG4gICAgICAgICAqIEBwYXJhbSB7TFNlcU5vZGV9IHEgdGhlIG5leHQgaWRlbnRpZmllci5cbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IGxldmVsIFRoZSBzaXplIG9mIHRoZSBuZXcgaWRlbnRpZmllci5cbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHMgVGhlIGxvY2FsIHNpdGUgaWRlbnRpZmllci5cbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IGMgVGhlIGxvY2FsIG1vbm90b25pYyBjb3VudGVyLlxuICAgICAgICAgKiBAcmV0dXJuIHtJZGVudGlmaWVyfSBUaGUgbmV3IGFsbG9jYXRlZCBpZGVudGlmaWVyLlxuICAgICAgICAgKi9cbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIF9nZXRTQyhkLCBwLCBxLCBsZXZlbCwgcywgYykge1xuICAgICAgICAgICAgdmFyIHNvdXJjZXMgPSBbXSxcbiAgICAgICAgICAgICAgICBjb3VudGVycyA9IFtdLFxuICAgICAgICAgICAgICAgIGkgPSAwLFxuICAgICAgICAgICAgICAgIHN1bUJpdCA9IHRoaXMuX2Jhc2UuZ2V0U3VtQml0KGxldmVsKSxcbiAgICAgICAgICAgICAgICB0ZW1wRGlnaXQgPSB2b2lkIDAsXG4gICAgICAgICAgICAgICAgdmFsdWUgPSB2b2lkIDA7XG5cbiAgICAgICAgICAgIHdoaWxlIChpIDw9IGxldmVsKSB7XG4gICAgICAgICAgICAgICAgdGVtcERpZ2l0ID0gQkkuZHVwKGQpO1xuICAgICAgICAgICAgICAgIEJJLnJpZ2h0U2hpZnRfKHRlbXBEaWdpdCwgc3VtQml0IC0gdGhpcy5fYmFzZS5nZXRTdW1CaXQoaSkpO1xuICAgICAgICAgICAgICAgIHZhbHVlID0gQkkubW9kSW50KHRlbXBEaWdpdCwgTWF0aC5wb3coMiwgdGhpcy5fYmFzZS5nZXRCaXRCYXNlKGkpKSk7XG4gICAgICAgICAgICAgICAgc291cmNlc1tpXSA9IHM7XG4gICAgICAgICAgICAgICAgY291bnRlcnNbaV0gPSBjO1xuXG4gICAgICAgICAgICAgICAgaWYgKHEgJiYgcS50LnAgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZXNbaV0gPSBxLnQucztjb3VudGVyc1tpXSA9IHEudC5jO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgaWYgKHAgJiYgcC50LnAgPT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNvdXJjZXNbaV0gPSBwLnQucztjb3VudGVyc1tpXSA9IHAudC5jO1xuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICBxID0gcSAmJiAhcS5pc0xlYWYgJiYgcS5jaGlsZCB8fCBudWxsO1xuICAgICAgICAgICAgICAgIHAgPSBwICYmICFwLmlzTGVhZiAmJiBwLmNoaWxkIHx8IG51bGw7XG5cbiAgICAgICAgICAgICAgICArK2k7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IElkZW50aWZpZXIodGhpcy5fYmFzZSwgZCwgc291cmNlcywgY291bnRlcnMpO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIFN0cmF0ZWd5O1xufSgpO1xuXG47XG5cbm1vZHVsZS5leHBvcnRzID0gU3RyYXRlZ3k7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbk4wY21GMFpXZDVMbXB6SWwwc0ltNWhiV1Z6SWpwYklrSkpJaXdpY21WeGRXbHlaU0lzSWtsa1pXNTBhV1pwWlhJaUxDSlRkSEpoZEdWbmVTSXNJbUpoYzJVaUxDSmliM1Z1WkdGeWVTSXNJbDlpWVhObElpd2lYMkp2ZFc1a1lYSjVJaXdpY0NJc0luRWlMQ0pzWlhabGJDSXNJbWx1ZEdWeWRtRnNJaXdpY3lJc0ltTWlMQ0pqYjNCNVVDSXNJbU52Y0hsUklpd2ljM1JsY0NJc0lrMWhkR2dpTENKdGFXNGlMQ0prYVdkcGRDSXNJbWx1ZERKaWFXZEpiblFpTENKblpYUlRkVzFDYVhRaUxDSjJZV3gxWlNJc0lta2lMQ0owSWl3aVlXUmtTVzUwWHlJc0lteGxablJUYUdsbWRGOGlMQ0puWlhSQ2FYUkNZWE5sSWl3aWFYTk1aV0ZtSWl3aVkyaHBiR1FpTENKbWJHOXZjaUlzSW5KaGJtUnZiU0lzSWw5blpYUlRReUlzSW5CSmMwZHlaV0YwWlhJaUxDSmpiMjF0YjI1U2IyOTBJaXdpY0hKbGRsWmhiSFZsSWl3aWJtVjRkRlpoYkhWbElpd2ljRzkzSWl3aVpDSXNJbk52ZFhKalpYTWlMQ0pqYjNWdWRHVnljeUlzSW5OMWJVSnBkQ0lzSW5SbGJYQkVhV2RwZENJc0ltUjFjQ0lzSW5KcFoyaDBVMmhwWm5SZklpd2liVzlrU1c1MElpd2liVzlrZFd4bElpd2laWGh3YjNKMGN5SmRMQ0p0WVhCd2FXNW5jeUk2SWtGQlFVRTdPenM3T3p0QlFVVkJMRWxCUVUxQkxFdEJRVXRETEZGQlFWRXNVVUZCVWl4RFFVRllPMEZCUTBFc1NVRkJUVU1zWVVGQllVUXNVVUZCVVN4cFFrRkJVaXhEUVVGdVFqczdRVUZGUVRzN096czdTVUZKVFVVc1VUdEJRVU5HT3pzN096dEJRVXRCTEhOQ1FVRmhReXhKUVVGaUxFVkJRV3RETzBGQlFVRXNXVUZCWmtNc1VVRkJaU3gxUlVGQlNpeEZRVUZKT3p0QlFVRkJPenRCUVVNNVFpeGhRVUZMUXl4TFFVRk1MRWRCUVdGR0xFbEJRV0k3UVVGRFFTeGhRVUZMUnl4VFFVRk1MRWRCUVdsQ1JpeFJRVUZxUWp0QlFVTklPenM3T3pzN1FVRkZSRHM3T3pzN096czdPenM3T3poQ1FWbFBSeXhETEVWQlFVZERMRU1zUlVGQlIwTXNTeXhGUVVGUFF5eFJMRVZCUVZWRExFTXNSVUZCUjBNc1F5eEZRVUZITzBGQlEyaERMR2RDUVVGSlF5eFJRVUZSVGl4RFFVRmFPMEZCUVVFc1owSkJRV1ZQTEZGQlFWRk9MRU5CUVhaQ08wRkJRVUVzWjBKQlEwbFBMRTlCUVU5RExFdEJRVXRETEVkQlFVd3NRMEZCVXl4TFFVRkxXQ3hUUVVGa0xFVkJRWGxDU1N4UlFVRjZRaXhEUVVSWU8wRkJRVUVzWjBKQlF5dERPMEZCUXpORFVTeHZRa0ZCVVc1Q0xFZEJRVWR2UWl4VlFVRklMRU5CUVdNc1EwRkJaQ3hGUVVGcFFpeExRVUZMWkN4TFFVRk1MRU5CUVZkbExGTkJRVmdzUTBGQmNVSllMRXRCUVhKQ0xFTkJRV3BDTEVOQlJsbzdRVUZCUVN4blFrRkhTVmtzWTBGSVNqczdRVUZMUVR0QlFVTkJMR2xDUVVGTExFbEJRVWxETEVsQlFVa3NRMEZCWWl4RlFVRm5Ra0VzUzBGQlMySXNTMEZCY2tJc1JVRkJORUlzUlVGQlJXRXNRMEZCT1VJc1JVRkJhVU03UVVGRGNFTkVMSGRDUVVGVFpDeExRVUZMUVN4RlFVRkZaMElzUTBGQlJpeERRVUZKYUVJc1EwRkJWaXhKUVVGblFpeERRVUY0UWp0QlFVTlBVaXh0UWtGQlIzbENMRTlCUVVnc1EwRkJWMDRzUzBGQldDeEZRVUZyUWtjc1MwRkJiRUk3UVVGRFFTeHZRa0ZCU1VNc1RVRkJUV0lzUzBGQlZpeEZRVUZwUWp0QlFVTmlWaXgxUWtGQlJ6QkNMRlZCUVVnc1EwRkJZMUFzUzBGQlpDeEZRVUZ4UWl4TFFVRkxZaXhMUVVGTUxFTkJRVmR4UWl4VlFVRllMRU5CUVhOQ1NpeEpRVUZKTEVOQlFURkNMRU5CUVhKQ08wRkJRMGc3UVVGRFJHWXNiMEpCUVV0QkxFdEJRVXNzUTBGQlEwRXNSVUZCUlc5Q0xFMUJRVklzU1VGQmEwSndRaXhGUVVGRmNVSXNTMEZCY2tJc1NVRkJLMElzU1VGQmJrTTdRVUZEU0R0QlFVTkVPMEZCUTBFN1FVRkRRVGRDTEdWQlFVZDVRaXhQUVVGSUxFTkJRVmRPTEV0QlFWZ3NSVUZCYTBKR0xFdEJRVXRoTEV0QlFVd3NRMEZCVjJJc1MwRkJTMk1zVFVGQlRDeExRVUZuUW1Zc1NVRkJhRUlzUjBGQmRVSXNRMEZCYkVNc1EwRkJiRUk3UVVGRFFUdEJRVU5CTEcxQ1FVRlBMRXRCUVV0blFpeE5RVUZNTEVOQlFWbGlMRXRCUVZvc1JVRkJiVUpNTEV0QlFXNUNMRVZCUVRCQ1F5eExRVUV4UWl4RlFVRnBRMHdzUzBGQmFrTXNSVUZCZDBORkxFTkJRWGhETEVWQlFUSkRReXhEUVVFelF5eERRVUZRTzBGQlEwZzdPenM3TzBGQlNVUTdPenM3T3pzN096czdPeXRDUVZkUlRDeERMRVZCUVVkRExFTXNSVUZCUjBNc1N5eEZRVUZQUXl4UkxFVkJRVlZETEVNc1JVRkJSME1zUXl4RlFVRkhPMEZCUTJwRExHZENRVUZKUXl4UlFVRlJUaXhEUVVGYU8wRkJRVUVzWjBKQlFXVlBMRkZCUVZGT0xFTkJRWFpDTzBGQlFVRXNaMEpCUTBsUExFOUJRVTlETEV0QlFVdERMRWRCUVV3c1EwRkJVeXhMUVVGTFdDeFRRVUZrTEVWQlFYbENTU3hSUVVGNlFpeERRVVJZTzBGQlFVRXNaMEpCUXpoRE8wRkJRekZEVVN4dlFrRkJVVzVDTEVkQlFVZHZRaXhWUVVGSUxFTkJRV01zUTBGQlpDeEZRVUZwUWl4TFFVRkxaQ3hMUVVGTUxFTkJRVmRsTEZOQlFWZ3NRMEZCY1VKWUxFdEJRWEpDTEVOQlFXcENMRU5CUmxvN1FVRkJRU3huUWtGSFNYVkNMR0ZCUVdFc1MwRklha0k3UVVGQlFTeG5Ra0ZIZDBKRExHRkJRV0VzU1VGSWNrTTdRVUZCUVN4blFrRkpTVU1zYTBKQlNrbzdRVUZCUVN4blFrRkpaVU1zYTBKQlNtWTdPMEZCVFVFN1FVRkRRU3hwUWtGQlN5eEpRVUZKWWl4SlFVRkpMRU5CUVdJc1JVRkJaMEpCTEV0QlFVdGlMRXRCUVhKQ0xFVkJRVFJDTEVWQlFVVmhMRU5CUVRsQ0xFVkJRV2xETzBGQlF6ZENXU3cwUWtGQllUTkNMRXRCUVV0QkxFVkJRVVZuUWl4RFFVRkdMRU5CUVVsb1FpeERRVUZXTEVsQlFXZENMRU5CUVRWQ08wRkJRMEUwUWl3MFFrRkJZVE5DTEV0QlFVdEJMRVZCUVVWbExFTkJRVVlzUTBGQlNXaENMRU5CUVZZc1NVRkJaMElzUTBGQk5VSTdPMEZCUlVFc2IwSkJRVWt3UWl4alFVRmpReXhqUVVGalF5eFRRVUZvUXl4RlFVRXlRenRCUVVOMlEwWXNhVU5CUVdFc1MwRkJZanRCUVVOQlJDeHBRMEZCWVVVc1dVRkJXVU1zVTBGQmVrSTdRVUZEU0R0QlFVTkVMRzlDUVVGSlNDeFZRVUZLTEVWQlFXZENPMEZCUTFwSExHZERRVUZaYmtJc1MwRkJTMjlDTEVkQlFVd3NRMEZCVXl4RFFVRlVMRVZCUVZjc1MwRkJTeTlDTEV0QlFVd3NRMEZCVjNGQ0xGVkJRVmdzUTBGQmMwSktMRU5CUVhSQ0xFTkJRVmdzU1VGQmNVTXNRMEZCYWtRN1FVRkRTRHRCUVVORWRrSXNiVUpCUVVkNVFpeFBRVUZJTEVOQlFWZE9MRXRCUVZnc1JVRkJhMEpwUWl4VFFVRnNRanRCUVVOQkxHOUNRVUZKWWl4TlFVRk5ZaXhMUVVGV0xFVkJRV2xDTzBGQlEySldMSFZDUVVGSE1FSXNWVUZCU0N4RFFVRmpVQ3hMUVVGa0xFVkJRVzlDTEV0QlFVdGlMRXRCUVV3c1EwRkJWM0ZDTEZWQlFWZ3NRMEZCYzBKS0xFbEJRVVVzUTBGQmVFSXNRMEZCY0VJN1FVRkRTRHM3UVVGRlJHUXNiMEpCUVV0QkxFdEJRVXNzUTBGQlEwRXNSVUZCUlcxQ0xFMUJRVklzU1VGQmEwSnVRaXhGUVVGRmIwSXNTMEZCY2tJc1NVRkJLMElzU1VGQmJrTTdRVUZEUVhKQ0xHOUNRVUZMUVN4TFFVRkxMRU5CUVVOQkxFVkJRVVZ2UWl4TlFVRlNMRWxCUVd0Q2NFSXNSVUZCUlhGQ0xFdEJRWEpDTEVsQlFTdENMRWxCUVc1RE8wRkJRMGc3TzBGQlJVUTdRVUZEUVR0QlFVTkJMR2RDUVVGSlNTeFZRVUZLTEVWQlFXZENPMEZCUTFwcVF5eHRRa0ZCUjNsQ0xFOUJRVWdzUTBGQlYwNHNTMEZCV0N4RlFVRnJRaXhEUVVGRFJpeExRVUZMWVN4TFFVRk1MRU5CUVZkaUxFdEJRVXRqTEUxQlFVd3NTMEZCWTJZc1NVRkJla0lzUTBGQmJrSTdRVUZEU0N4aFFVWkVMRTFCUlU4N1FVRkRTR2hDTEcxQ1FVRkhlVUlzVDBGQlNDeERRVUZYVGl4TFFVRllMRVZCUVd0Q0xFTkJRVU5HTEV0QlFVdGhMRXRCUVV3c1EwRkJWMklzUzBGQlMyTXNUVUZCVEN4TFFVRmpaaXhKUVVGNlFpeERRVUZFTEVkQlFXZERMRU5CUVd4RU8wRkJRMGc3TzBGQlJVUTdRVUZEUVN4dFFrRkJUeXhMUVVGTFowSXNUVUZCVEN4RFFVRlpZaXhMUVVGYUxFVkJRVzFDVEN4TFFVRnVRaXhGUVVFd1FrTXNTMEZCTVVJc1JVRkJhVU5NTEV0QlFXcERMRVZCUVhkRFJTeERRVUY0UXl4RlFVRXlRME1zUTBGQk0wTXNRMEZCVUR0QlFVTklPenM3T3p0QlFVVkVPenM3T3pzN096czdPenNyUWtGWFVYbENMRU1zUlVGQlJ6bENMRU1zUlVGQlIwTXNReXhGUVVGSFF5eExMRVZCUVU5RkxFTXNSVUZCUjBNc1F5eEZRVUZITzBGQlF6RkNMR2RDUVVGSk1FSXNWVUZCVlN4RlFVRmtPMEZCUVVFc1owSkJRV3RDUXl4WFFVRlhMRVZCUVRkQ08wRkJRVUVzWjBKQlEwbHFRaXhKUVVGSkxFTkJSRkk3UVVGQlFTeG5Ra0ZGU1d0Q0xGTkJRVk1zUzBGQlMyNURMRXRCUVV3c1EwRkJWMlVzVTBGQldDeERRVUZ4UWxnc1MwRkJja0lzUTBGR1lqdEJRVUZCTEdkQ1FVZEpaME1zYTBKQlNFbzdRVUZCUVN4blFrRkhaWEJDTEdOQlNHWTdPMEZCUzBFc2JVSkJRVTlETEV0QlFVdGlMRXRCUVZvc1JVRkJiVUk3UVVGRFptZERMRFJDUVVGWk1VTXNSMEZCUnpKRExFZEJRVWdzUTBGQlQwd3NRMEZCVUN4RFFVRmFPMEZCUTBGMFF5eHRRa0ZCUnpSRExGZEJRVWdzUTBGQlpVWXNVMEZCWml4RlFVRXdRa1FzVTBGQlV5eExRVUZMYmtNc1MwRkJUQ3hEUVVGWFpTeFRRVUZZTEVOQlFYRkNSU3hEUVVGeVFpeERRVUZ1UXp0QlFVTkJSQ3gzUWtGQlVYUkNMRWRCUVVjMlF5eE5RVUZJTEVOQlFWVklMRk5CUVZZc1JVRkJjVUo2UWl4TFFVRkxiMElzUjBGQlRDeERRVUZUTEVOQlFWUXNSVUZCV1N4TFFVRkxMMElzUzBGQlRDeERRVUZYY1VJc1ZVRkJXQ3hEUVVGelFrb3NRMEZCZEVJc1EwRkJXaXhEUVVGeVFpeERRVUZTTzBGQlEwRm5RaXgzUWtGQlVXaENMRU5CUVZJc1NVRkJWMWdzUTBGQldEdEJRVU5CTkVJc2VVSkJRVk5xUWl4RFFVRlVMRWxCUVZsV0xFTkJRVm83TzBGQlJVRXNiMEpCUVVsS0xFdEJRVXRCTEVWQlFVVmxMRU5CUVVZc1EwRkJTV2hDTEVOQlFVb3NTMEZCVldNc1MwRkJia0lzUlVGQk1FSTdRVUZCUldsQ0xEUkNRVUZSYUVJc1EwRkJVaXhKUVVGWFpDeEZRVUZGWlN4RFFVRkdMRU5CUVVsYUxFTkJRV1lzUTBGQmEwSTBRaXhUUVVGVGFrSXNRMEZCVkN4SlFVRlpaQ3hGUVVGRlpTeERRVUZHTEVOQlFVbFlMRU5CUVdoQ08wRkJRVzlDTzBGQlEyeEZMRzlDUVVGSlRDeExRVUZMUVN4RlFVRkZaMElzUTBGQlJpeERRVUZKYUVJc1EwRkJTaXhMUVVGVll5eExRVUZ1UWl4RlFVRXdRanRCUVVGRmFVSXNORUpCUVZGb1FpeERRVUZTTEVsQlFWZG1MRVZCUVVWblFpeERRVUZHTEVOQlFVbGFMRU5CUVdZc1EwRkJhMEkwUWl4VFFVRlRha0lzUTBGQlZDeEpRVUZaWml4RlFVRkZaMElzUTBGQlJpeERRVUZKV0N4RFFVRm9RanRCUVVGdlFqczdRVUZGYkVWS0xHOUNRVUZMUVN4TFFVRkxMRU5CUVVOQkxFVkJRVVZ0UWl4TlFVRlNMRWxCUVd0Q2JrSXNSVUZCUlc5Q0xFdEJRWEpDTEVsQlFTdENMRWxCUVc1RE8wRkJRMEZ5UWl4dlFrRkJTMEVzUzBGQlN5eERRVUZEUVN4RlFVRkZiMElzVFVGQlVpeEpRVUZyUW5CQ0xFVkJRVVZ4UWl4TFFVRnlRaXhKUVVFclFpeEpRVUZ1UXpzN1FVRkZRU3hyUWtGQlJVNHNRMEZCUmp0QlFVTklPenRCUVVWRUxHMUNRVUZQTEVsQlFVbHlRaXhWUVVGS0xFTkJRV1VzUzBGQlMwa3NTMEZCY0VJc1JVRkJNa0puUXl4RFFVRXpRaXhGUVVFNFFrTXNUMEZCT1VJc1JVRkJkVU5ETEZGQlFYWkRMRU5CUVZBN1FVRkRTRHM3T3pzN08wRkJSVW83TzBGQlJVUk5MRTlCUVU5RExFOUJRVkFzUjBGQmFVSTFReXhSUVVGcVFpSXNJbVpwYkdVaU9pSnpkSEpoZEdWbmVTNXFjeUlzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSWlkMWMyVWdjM1J5YVdOMEp6dGNibHh1WTI5dWMzUWdRa2tnUFNCeVpYRjFhWEpsS0NkQ2FXZEpiblFuS1R0Y2JtTnZibk4wSUVsa1pXNTBhV1pwWlhJZ1BTQnlaWEYxYVhKbEtDY3VMMmxrWlc1MGFXWnBaWEl1YW5NbktUdGNibHh1THlvcVhHNGdLaUJGYm5WdFpYSmhkR1VnZEdobElHRjJZV2xzWVdKc1pTQnpkV0l0WVd4c2IyTmhkR2x2YmlCemRISmhkR1ZuYVdWekxpQlVhR1VnYzJsbmJtRjBkWEpsSUc5bUlIUm9aWE5sWEc0Z0tpQm1kVzVqZEdsdmJuTWdhWE1nWmloSlpDd2dTV1FzSUU0ckxDQk9LeXdnVGl3Z1RpazZJRWxrTGx4dUlDb3ZYRzVqYkdGemN5QlRkSEpoZEdWbmVTQjdJQ0FnSUZ4dUlDQWdJQzhxS2x4dUlDQWdJQ0FxSUVCd1lYSmhiU0I3UW1GelpYMGdZbUZ6WlNCVWFHVWdZbUZ6WlNCMWMyVmtJSFJ2SUdOeVpXRjBaU0IwYUdVZ2JtVjNJR2xrWlc1MGFXWnBaWEp6TGx4dUlDQWdJQ0FxSUVCd1lYSmhiU0I3VG5WdFltVnlmU0JiWW05MWJtUmhjbmtnUFNBeE1GMGdWR2hsSUhaaGJIVmxJSFZ6WldRZ1lYTWdkR2hsSUdSbFptRjFiSFFnYldGNGFXMTFiVnh1SUNBZ0lDQXFJSE53WVdOcGJtY2dZbVYwZDJWbGJpQnBaR1Z1ZEdsbWFXVnljeTVjYmlBZ0lDQWdLaTljYmlBZ0lDQmpiMjV6ZEhKMVkzUnZjaUFvWW1GelpTd2dZbTkxYm1SaGNua2dQU0F4TUNrZ2UxeHVJQ0FnSUNBZ0lDQjBhR2x6TGw5aVlYTmxJRDBnWW1GelpUdGNiaUFnSUNBZ0lDQWdkR2hwY3k1ZlltOTFibVJoY25rZ1BTQmliM1Z1WkdGeWVUdGNiaUFnSUNCOU8xeHVJQ0FnSUZ4dUlDQWdJQzhxS2x4dUlDQWdJQ0FxSUVOb2IyOXpaU0JoYmlCcFpHVnVkR2xtYVdWeUlITjBZWEowYVc1bklHWnliMjBnY0hKbGRtbHZkWE1nWW05MWJtUWdZVzVrSUdGa1pHbHVaeUJ5WVc1a2IyMWNiaUFnSUNBZ0tpQnVkVzFpWlhJdVhHNGdJQ0FnSUNvZ1FIQmhjbUZ0SUh0TVUyVnhUbTlrWlgwZ2NDQlVhR1VnY0hKbGRtbHZkWE1nYVdSbGJuUnBabWxsY2k1Y2JpQWdJQ0FnS2lCQWNHRnlZVzBnZTB4VFpYRk9iMlJsZlNCeElGUm9aU0J1WlhoMElHbGtaVzUwYVdacFpYSXVYRzRnSUNBZ0lDb2dRSEJoY21GdElIdE9kVzFpWlhKOUlHeGxkbVZzSUZSb1pTQnVkVzFpWlhJZ2IyWWdZMjl1WTJGMFpXNWhkR2x2YmlCamIyMXdiM05wYm1jZ2RHaGxJRzVsZDF4dUlDQWdJQ0FxSUdsa1pXNTBhV1pwWlhJdVhHNGdJQ0FnSUNvZ1FIQmhjbUZ0SUh0T2RXMWlaWEo5SUdsdWRHVnlkbUZzSUZSb1pTQnBiblJsY25aaGJDQmlaWFIzWldWdUlIQWdZVzVrSUhFdVhHNGdJQ0FnSUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I5SUhNZ1ZHaGxJSE52ZFhKalpTQjBhR0YwSUdOeVpXRjBaWE1nZEdobElHNWxkeUJwWkdWdWRHbG1hV1Z5TGx4dUlDQWdJQ0FxSUVCd1lYSmhiU0I3VG5WdFltVnlmU0JqSUZSb1pTQmpiM1Z1ZEdWeUlHOW1JSFJvWVhRZ2MyOTFjbU5sTGx4dUlDQWdJQ0FxSUVCeVpYUjFjbTRnZTBsa1pXNTBhV1pwWlhKOUlGUm9aU0J1WlhjZ1lXeHNiMk5oZEdWa0lHbGtaVzUwYVdacFpYSXVYRzRnSUNBZ0lDb3ZYRzRnSUNBZ1lsQnNkWE1nS0hBc0lIRXNJR3hsZG1Wc0xDQnBiblJsY25aaGJDd2djeXdnWXlrZ2UxeHVJQ0FnSUNBZ0lDQnNaWFFnWTI5d2VWQWdQU0J3TENCamIzQjVVU0E5SUhFc1hHNGdJQ0FnSUNBZ0lDQWdJQ0J6ZEdWd0lEMGdUV0YwYUM1dGFXNG9kR2hwY3k1ZlltOTFibVJoY25rc0lHbHVkR1Z5ZG1Gc0tTd2dMeThqTUNCMGFHVWdiV2x1SUdsdWRHVnlkbUZzWEc0Z0lDQWdJQ0FnSUNBZ0lDQmthV2RwZENBOUlFSkpMbWx1ZERKaWFXZEpiblFvTUN3Z2RHaHBjeTVmWW1GelpTNW5aWFJUZFcxQ2FYUW9iR1YyWld3cEtTeGNiaUFnSUNBZ0lDQWdJQ0FnSUhaaGJIVmxPMXh1SUNBZ0lDQWdJQ0JjYmlBZ0lDQWdJQ0FnTHk4Z0l6RWdZMjl3ZVNCMGFHVWdjSEpsZG1sdmRYTWdhV1JsYm5ScFptbGxjbHh1SUNBZ0lDQWdJQ0JtYjNJZ0tHeGxkQ0JwSUQwZ01Ec2dhU0E4UFNCc1pYWmxiRHNnS3l0cEtTQjdYRzVjZENBZ0lDQjJZV3gxWlNBOUlDaHdJQ1ltSUhBdWRDNXdLU0I4ZkNBd08xeHVJQ0FnSUNBZ0lDQWdJQ0FnUWtrdVlXUmtTVzUwWHloa2FXZHBkQ3dnZG1Gc2RXVXBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLR2tnSVQwOUlHeGxkbVZzS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ1Fra3ViR1ZtZEZOb2FXWjBYeWhrYVdkcGRDd2dkR2hwY3k1ZlltRnpaUzVuWlhSQ2FYUkNZWE5sS0drZ0t5QXhLU2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjlPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2NDQTlJQ2h3SUNZbUlDRndMbWx6VEdWaFppQW1KaUJ3TG1Ob2FXeGtLU0I4ZkNCdWRXeHNPMXh1SUNBZ0lDQWdJQ0I5TzF4dUlDQWdJQ0FnSUNBdkx5QWpNaUJqY21WaGRHVWdZU0JrYVdkcGRDQm1iM0lnWVc0Z2FXUmxiblJwWm1sbGNpQmllU0JoWkdScGJtY2dZU0J5WVc1a2IyMGdkbUZzZFdWY2JpQWdJQ0FnSUNBZ0x5OGdJMEVnUkdsbmFYUmNiaUFnSUNBZ0lDQWdRa2t1WVdSa1NXNTBYeWhrYVdkcGRDd2dUV0YwYUM1bWJHOXZjaWhOWVhSb0xuSmhibVJ2YlNncElDb2djM1JsY0NBcklERXBLVHRjYmlBZ0lDQWdJQ0FnTHk4Z0kwSWdVMjkxY21ObElDWWdZMjkxYm5SbGNseHVJQ0FnSUNBZ0lDQnlaWFIxY200Z2RHaHBjeTVmWjJWMFUwTW9aR2xuYVhRc0lHTnZjSGxRTENCamIzQjVVU3dnYkdWMlpXd3NJSE1zSUdNcE8xeHVJQ0FnSUgwN1hHNWNibHh1SUNBZ0lGeHVJQ0FnSUM4cUtseHVJQ0FnSUNBcUlFTm9iMjl6WlNCaGJpQnBaR1Z1ZEdsbWFXVnlJSE4wWVhKMGFXNW5JR1p5YjIwZ2JtVjRkQ0JpYjNWdVpDQmhibVFnYzNWaWMzUnlZV04wSUdFZ2NtRnVaRzl0WEc0Z0lDQWdJQ29nYm5WdFltVnlMbHh1SUNBZ0lDQXFJRUJ3WVhKaGJTQjdURk5sY1U1dlpHVjlJSEFnVkdobElIQnlaWFpwYjNWeklHbGtaVzUwYVdacFpYSXVYRzRnSUNBZ0lDb2dRSEJoY21GdElIdE1VMlZ4VG05a1pYMGdjU0JVYUdVZ2JtVjRkQ0JwWkdWdWRHbG1hV1Z5TGx4dUlDQWdJQ0FxSUVCd1lYSmhiU0I3VG5WdFltVnlmU0JzWlhabGJDQlVhR1VnYm5WdFltVnlJRzltSUdOdmJtTmhkR1Z1WVhScGIyNGdZMjl0Y0c5emFXNW5JSFJvWlNCdVpYZGNiaUFnSUNBZ0tpQnBaR1Z1ZEdsbWFXVnlMbHh1SUNBZ0lDQXFJRUJ3WVhKaGJTQjdUblZ0WW1WeWZTQnBiblJsY25aaGJDQlVhR1VnYVc1MFpYSjJZV3dnWW1WMGQyVmxiaUJ3SUdGdVpDQnhMbHh1SUNBZ0lDQXFJRUJ3WVhKaGJTQjdUMkpxWldOMGZTQnpJRlJvWlNCemIzVnlZMlVnZEdoaGRDQmpjbVZoZEdWeklIUm9aU0J1WlhjZ2FXUmxiblJwWm1sbGNpNWNiaUFnSUNBZ0tpQkFjR0Z5WVcwZ2UwNTFiV0psY24wZ1l5QlVhR1VnWTI5MWJuUmxjaUJ2WmlCMGFHRjBJSE52ZFhKalpTNWNiaUFnSUNBZ0tpOWNiaUFnSUNCaVRXbHVkWE1nS0hBc0lIRXNJR3hsZG1Wc0xDQnBiblJsY25aaGJDd2djeXdnWXlrZ2UxeHVJQ0FnSUNBZ0lDQnNaWFFnWTI5d2VWQWdQU0J3TENCamIzQjVVU0E5SUhFc1hHNGdJQ0FnSUNBZ0lDQWdJQ0J6ZEdWd0lEMGdUV0YwYUM1dGFXNG9kR2hwY3k1ZlltOTFibVJoY25rc0lHbHVkR1Z5ZG1Gc0tTd3ZMeUFqTUNCd2NtOWpaWE56SUcxcGJpQnBiblJsY25aaGJGeHVJQ0FnSUNBZ0lDQWdJQ0FnWkdsbmFYUWdQU0JDU1M1cGJuUXlZbWxuU1c1MEtEQXNJSFJvYVhNdVgySmhjMlV1WjJWMFUzVnRRbWwwS0d4bGRtVnNLU2tzWEc0Z0lDQWdJQ0FnSUNBZ0lDQndTWE5IY21WaGRHVnlJRDBnWm1Gc2MyVXNJR052YlcxdmJsSnZiM1FnUFNCMGNuVmxMRnh1SUNBZ0lDQWdJQ0FnSUNBZ2NISmxkbFpoYkhWbExDQnVaWGgwVm1Gc2RXVTdYRzRnSUNBZ0lDQWdJRnh1SUNBZ0lDQWdJQ0F2THlBak1TQmpiM0I1SUc1bGVIUXNJR2xtSUhCeVpYWnBiM1Z6SUdseklHZHlaV0YwWlhJc0lHTnZjSGtnYldGNFZtRnNkV1VnUUNCa1pYQjBhRnh1SUNBZ0lDQWdJQ0JtYjNJZ0tHeGxkQ0JwSUQwZ01Ec2dhU0E4UFNCc1pYWmxiRHNnS3l0cEtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCd2NtVjJWbUZzZFdVZ1BTQW9jQ0FtSmlCd0xuUXVjQ2tnZkh3Z01EdGNiaUFnSUNBZ0lDQWdJQ0FnSUc1bGVIUldZV3gxWlNBOUlDaHhJQ1ltSUhFdWRDNXdLU0I4ZkNBd08xeHVJQ0FnSUNBZ0lDQWdJQ0FnWEc0Z0lDQWdJQ0FnSUNBZ0lDQnBaaUFvWTI5dGJXOXVVbTl2ZENBbUppQndjbVYyVm1Gc2RXVWdJVDA5SUc1bGVIUldZV3gxWlNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHTnZiVzF2YmxKdmIzUWdQU0JtWVd4elpUdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQndTWE5IY21WaGRHVnlJRDBnY0hKbGRsWmhiSFZsSUQ0Z2JtVjRkRlpoYkhWbE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnZlR0Y2JpQWdJQ0FnSUNBZ0lDQWdJR2xtSUNod1NYTkhjbVZoZEdWeUtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdibVY0ZEZaaGJIVmxJRDBnVFdGMGFDNXdiM2NvTWl4MGFHbHpMbDlpWVhObExtZGxkRUpwZEVKaGMyVW9hU2twTFRFN1hHNGdJQ0FnSUNBZ0lDQWdJQ0I5TzF4dUlDQWdJQ0FnSUNBZ0lDQWdRa2t1WVdSa1NXNTBYeWhrYVdkcGRDd2dibVY0ZEZaaGJIVmxLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHbG1JQ2hwSUNFOVBTQnNaWFpsYkNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lFSkpMbXhsWm5SVGFHbG1kRjhvWkdsbmFYUXNkR2hwY3k1ZlltRnpaUzVuWlhSQ2FYUkNZWE5sS0drck1Ta3BPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2ZUdGNibHh1SUNBZ0lDQWdJQ0FnSUNBZ2NTQTlJQ2h4SUNZbUlDRnhMbWx6VEdWaFppQW1KaUJ4TG1Ob2FXeGtLU0I4ZkNCdWRXeHNPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2NDQTlJQ2h3SUNZbUlDRndMbWx6VEdWaFppQW1KaUJ3TG1Ob2FXeGtLU0I4ZkNCdWRXeHNPMXh1SUNBZ0lDQWdJQ0I5TzF4dUlDQWdJQ0FnSUNCY2JpQWdJQ0FnSUNBZ0x5OGdJek1nWTNKbFlYUmxJR0VnWkdsbmFYUWdabTl5SUdGdUlHbGtaVzUwYVdacFpYSWdZbmtnYzNWaWFXNW5JR0VnY21GdVpHOXRJSFpoYkhWbFhHNGdJQ0FnSUNBZ0lDOHZJQ05CSUVScFoybDBYRzRnSUNBZ0lDQWdJR2xtSUNod1NYTkhjbVZoZEdWeUtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCQ1NTNWhaR1JKYm5SZktHUnBaMmwwTENBdFRXRjBhQzVtYkc5dmNpaE5ZWFJvTG5KaGJtUnZiU2dwS25OMFpYQXBJQ2s3WEc0Z0lDQWdJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQkNTUzVoWkdSSmJuUmZLR1JwWjJsMExDQXRUV0YwYUM1bWJHOXZjaWhOWVhSb0xuSmhibVJ2YlNncEtuTjBaWEFwTFRFZ0tUdGNiaUFnSUNBZ0lDQWdmVHRjYmlBZ0lDQmNiaUFnSUNBZ0lDQWdMeThnSTBJZ1UyOTFjbU5sSUNZZ1kyOTFiblJsY2x4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnZEdocGN5NWZaMlYwVTBNb1pHbG5hWFFzSUdOdmNIbFFMQ0JqYjNCNVVTd2diR1YyWld3c0lITXNJR01wTzF4dUlDQWdJSDA3WEc1Y2JpQWdJQ0F2S2lwY2JpQWdJQ0FnS2lCRGIzQnBaWE1nZEdobElHRndjSEp2Y0hKcFlYUmxjeUJ6YjNWeVkyVWdZVzVrSUdOdmRXNTBaWElnWm5KdmJTQjBhR1VnWVdScVlXTmxiblFnYVdSbGJuUnBabWxsY25OY2JpQWdJQ0FnS2lCaGRDQjBhR1VnYVc1elpYSjBhVzl1SUhCdmMybDBhVzl1TGx4dUlDQWdJQ0FxSUVCd1lYSmhiU0I3VG5WdFltVnlmU0JrSUZSb1pTQmthV2RwZENCd1lYSjBJRzltSUhSb1pTQnVaWGNnYVdSbGJuUnBabWxsY2k1Y2JpQWdJQ0FnS2lCQWNHRnlZVzBnZTB4VFpYRk9iMlJsZlNCd0lGUm9aU0J3Y21WMmFXOTFjeUJwWkdWdWRHbG1hV1Z5TGx4dUlDQWdJQ0FxSUVCd1lYSmhiU0I3VEZObGNVNXZaR1Y5SUhFZ2RHaGxJRzVsZUhRZ2FXUmxiblJwWm1sbGNpNWNiaUFnSUNBZ0tpQkFjR0Z5WVcwZ2UwNTFiV0psY24wZ2JHVjJaV3dnVkdobElITnBlbVVnYjJZZ2RHaGxJRzVsZHlCcFpHVnVkR2xtYVdWeUxseHVJQ0FnSUNBcUlFQndZWEpoYlNCN1QySnFaV04wZlNCeklGUm9aU0JzYjJOaGJDQnphWFJsSUdsa1pXNTBhV1pwWlhJdVhHNGdJQ0FnSUNvZ1FIQmhjbUZ0SUh0T2RXMWlaWEo5SUdNZ1ZHaGxJR3h2WTJGc0lHMXZibTkwYjI1cFl5QmpiM1Z1ZEdWeUxseHVJQ0FnSUNBcUlFQnlaWFIxY200Z2UwbGtaVzUwYVdacFpYSjlJRlJvWlNCdVpYY2dZV3hzYjJOaGRHVmtJR2xrWlc1MGFXWnBaWEl1WEc0Z0lDQWdJQ292WEc0Z0lDQWdYMmRsZEZORElDaGtMQ0J3TENCeExDQnNaWFpsYkN3Z2N5d2dZeWtnZTF4dUlDQWdJQ0FnSUNCc1pYUWdjMjkxY21ObGN5QTlJRnRkTENCamIzVnVkR1Z5Y3lBOUlGdGRMRnh1SUNBZ0lDQWdJQ0FnSUNBZ2FTQTlJREFzWEc0Z0lDQWdJQ0FnSUNBZ0lDQnpkVzFDYVhRZ1BTQjBhR2x6TGw5aVlYTmxMbWRsZEZOMWJVSnBkQ2hzWlhabGJDa3NYRzRnSUNBZ0lDQWdJQ0FnSUNCMFpXMXdSR2xuYVhRc0lIWmhiSFZsTzF4dUlDQWdJQ0FnSUNCY2JpQWdJQ0FnSUNBZ2QyaHBiR1VnS0drZ1BEMGdiR1YyWld3cElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUhSbGJYQkVhV2RwZENBOUlFSkpMbVIxY0Noa0tUdGNiaUFnSUNBZ0lDQWdJQ0FnSUVKSkxuSnBaMmgwVTJocFpuUmZLSFJsYlhCRWFXZHBkQ3dnYzNWdFFtbDBJQzBnZEdocGN5NWZZbUZ6WlM1blpYUlRkVzFDYVhRb2FTa3BPMXh1SUNBZ0lDQWdJQ0FnSUNBZ2RtRnNkV1VnUFNCQ1NTNXRiMlJKYm5Rb2RHVnRjRVJwWjJsMExDQk5ZWFJvTG5CdmR5Z3lMQ0IwYUdsekxsOWlZWE5sTG1kbGRFSnBkRUpoYzJVb2FTa3BLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lITnZkWEpqWlhOYmFWMDljenRjYmlBZ0lDQWdJQ0FnSUNBZ0lHTnZkVzUwWlhKelcybGRQV003WEc0Z0lDQWdJQ0FnSUNBZ0lDQmNiaUFnSUNBZ0lDQWdJQ0FnSUdsbUlDaHhJQ1ltSUhFdWRDNXdJRDA5UFNCMllXeDFaU2tnZXlCemIzVnlZMlZ6VzJsZFBYRXVkQzV6T3lCamIzVnVkR1Z5YzF0cFhUMXhMblF1WXpzZ2ZUdGNiaUFnSUNBZ0lDQWdJQ0FnSUdsbUlDaHdJQ1ltSUhBdWRDNXdJRDA5UFNCMllXeDFaU2tnZXlCemIzVnlZMlZ6VzJsZFBYQXVkQzV6T3lCamIzVnVkR1Z5YzF0cFhUMXdMblF1WXpzZ2ZUdGNiaUFnSUNBZ0lDQWdJQ0FnSUZ4dUlDQWdJQ0FnSUNBZ0lDQWdjU0E5SUNoeElDWW1JQ0Z4TG1selRHVmhaaUFtSmlCeExtTm9hV3hrS1NCOGZDQnVkV3hzTzF4dUlDQWdJQ0FnSUNBZ0lDQWdjQ0E5SUNod0lDWW1JQ0Z3TG1selRHVmhaaUFtSmlCd0xtTm9hV3hrS1NCOGZDQnVkV3hzTzF4dVhHNGdJQ0FnSUNBZ0lDQWdJQ0FySzJrN1hHNGdJQ0FnSUNBZ0lIMDdYRzRnSUNBZ0lDQWdJRnh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdibVYzSUVsa1pXNTBhV1pwWlhJb2RHaHBjeTVmWW1GelpTd2daQ3dnYzI5MWNtTmxjeXdnWTI5MWJuUmxjbk1wTzF4dUlDQWdJSDA3WEc0Z0lDQWdYRzU5TzF4dVhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlGTjBjbUYwWldkNU8xeHVJbDE5IiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFRyaXBsZSB0aGF0IGNvbnRhaW5zIDxwYXRoOyBzaXRlOyBjb3VudGVyPi4gSWRlbnRpZmllcnMgb2YgTFNFUSBhcmUgbGlzdHMgb2ZcbiAqIHRyaXBsZXMuXG4gKi9cblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxudmFyIFRyaXBsZSA9IGZ1bmN0aW9uICgpIHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBwYXRoIFRoZSBwYXJ0IG9mIHRoZSBwYXRoIGluIHRoZSB0cmVlLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfFN0cmluZ30gc2l0ZSBUaGUgdW5pcXVlIHNpdGUgaWRlbnRpZmllciB0aGF0IGNyZWF0ZWQgdGhlXG4gICAgICogdHJpcGxlLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBjb3VudGVyIFRoZSBsb2NhbCBjb3VudGVyIG9mIHRoZSBzaXRlIHdoZW4gaXQgY3JlYXRlZCB0aGVcbiAgICAgKiB0cmlwbGUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gVHJpcGxlKHBhdGgsIHNpdGUsIGNvdW50ZXIpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFRyaXBsZSk7XG5cbiAgICAgICAgdGhpcy5wID0gcGF0aDtcbiAgICAgICAgdGhpcy5zID0gc2l0ZTtcbiAgICAgICAgdGhpcy5jID0gY291bnRlcjtcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoVHJpcGxlLCBbe1xuICAgICAgICBrZXk6ICdjb21wYXJlVG8nLFxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENvbXBhcmUgdHdvIHRyaXBsZXMgcHJpb3JpdGl6aW5nIHRoZSBwYXRoLCB0aGVuIHNpdGUsIHRoZW4gY291bnRlci5cbiAgICAgICAgICogQHBhcmFtIHtUcmlwbGV9IG8gdGhlIG90aGVyIHRyaXBsZSB0byBjb21wYXJlIC5cbiAgICAgICAgICogQHJldHVybnMge051bWJlcn0gLTEgaWYgdGhpcyBpcyBsb3dlciB0aGFuIG8sIDEgaWYgdGhpcyBpcyBncmVhdGVyIHRoYW5cbiAgICAgICAgICogbywgMCBvdGhlcndpc2UuXG4gICAgICAgICAqL1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gY29tcGFyZVRvKG8pIHtcbiAgICAgICAgICAgIC8vICMxIHByb2Nlc3MgbWF4aW1hbCB2aXJ0dWFsIGJvdW5kc1xuICAgICAgICAgICAgaWYgKHRoaXMucyA9PT0gTnVtYmVyLk1BWF9WQUxVRSAmJiB0aGlzLmMgPT09IE51bWJlci5NQVhfVkFMVUUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoby5zID09PSBOdW1iZXIuTUFYX1ZBTFVFICYmIG8ucyA9PT0gTnVtYmVyLk1BWF9WQUxVRSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAvLyAjMiBjb21wYXJlIHAgdGhlbiBzIHRoZW4gY1xuICAgICAgICAgICAgaWYgKHRoaXMucCA8IG8ucCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAodGhpcy5wID4gby5wKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKHRoaXMucyA8IG8ucykge1xuICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAodGhpcy5zID4gby5zKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKHRoaXMuYyA8IG8uYykge1xuICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAodGhpcy5jID4gby5jKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLy8gIzMgdGhleSBhcmUgZXF1YWxcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIFRyaXBsZTtcbn0oKTtcblxuO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRyaXBsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkluUnlhWEJzWlM1cWN5SmRMQ0p1WVcxbGN5STZXeUpVY21sd2JHVWlMQ0p3WVhSb0lpd2ljMmwwWlNJc0ltTnZkVzUwWlhJaUxDSndJaXdpY3lJc0ltTWlMQ0p2SWl3aVRuVnRZbVZ5SWl3aVRVRllYMVpCVEZWRklpd2liVzlrZFd4bElpd2laWGh3YjNKMGN5SmRMQ0p0WVhCd2FXNW5jeUk2SWtGQlFVRTdPMEZCUlVFN096czdPenM3T3p0SlFVbE5RU3hOT3p0QlFVVkdPenM3T3pzN08wRkJUMEVzYjBKQlFXRkRMRWxCUVdJc1JVRkJiVUpETEVsQlFXNUNMRVZCUVhsQ1F5eFBRVUY2UWl4RlFVRnJRenRCUVVGQk96dEJRVU01UWl4aFFVRkxReXhEUVVGTUxFZEJRVk5JTEVsQlFWUTdRVUZEUVN4aFFVRkxTU3hEUVVGTUxFZEJRVk5JTEVsQlFWUTdRVUZEUVN4aFFVRkxTU3hEUVVGTUxFZEJRVk5JTEU5QlFWUTdRVUZEU0RzN096czdPMEZCUlVRN096czdPenRyUTBGTlYwa3NReXhGUVVGSE8wRkJRMVk3UVVGRFFTeG5Ra0ZCU1N4TFFVRkxSaXhEUVVGTUxFdEJRVmRITEU5QlFVOURMRk5CUVd4Q0xFbEJRU3RDTEV0QlFVdElMRU5CUVV3c1MwRkJWMFVzVDBGQlQwTXNVMEZCY2tRc1JVRkJLMFE3UVVGRE0wUXNkVUpCUVU4c1EwRkJVRHRCUVVOSU8wRkJRMFFzWjBKQlFVbEdMRVZCUVVWR0xFTkJRVVlzUzBGQlVVY3NUMEZCVDBNc1UwRkJaaXhKUVVFMFFrWXNSVUZCUlVZc1EwRkJSaXhMUVVGUlJ5eFBRVUZQUXl4VFFVRXZReXhGUVVGNVJEdEJRVU55UkN4MVFrRkJUeXhEUVVGRExFTkJRVkk3UVVGRFNEdEJRVU5FTzBGQlEwRXNaMEpCUVVrc1MwRkJTMHdzUTBGQlRDeEhRVUZUUnl4RlFVRkZTQ3hEUVVGbUxFVkJRV3RDTzBGQlFVVXNkVUpCUVU4c1EwRkJReXhEUVVGU08wRkJRVmM3UVVGREwwSXNaMEpCUVVrc1MwRkJTMEVzUTBGQlRDeEhRVUZUUnl4RlFVRkZTQ3hEUVVGbUxFVkJRV3RDTzBGQlFVVXNkVUpCUVU4c1EwRkJVRHRCUVVGWE8wRkJReTlDTEdkQ1FVRkpMRXRCUVV0RExFTkJRVXdzUjBGQlUwVXNSVUZCUlVZc1EwRkJaaXhGUVVGclFqdEJRVUZGTEhWQ1FVRlBMRU5CUVVNc1EwRkJVanRCUVVGWE8wRkJReTlDTEdkQ1FVRkpMRXRCUVV0QkxFTkJRVXdzUjBGQlUwVXNSVUZCUlVZc1EwRkJaaXhGUVVGclFqdEJRVUZGTEhWQ1FVRlBMRU5CUVZBN1FVRkJWenRCUVVNdlFpeG5Ra0ZCU1N4TFFVRkxReXhEUVVGTUxFZEJRVk5ETEVWQlFVVkVMRU5CUVdZc1JVRkJhMEk3UVVGQlJTeDFRa0ZCVHl4RFFVRkRMRU5CUVZJN1FVRkJWenRCUVVNdlFpeG5Ra0ZCU1N4TFFVRkxRU3hEUVVGTUxFZEJRVk5ETEVWQlFVVkVMRU5CUVdZc1JVRkJhMEk3UVVGQlJTeDFRa0ZCVHl4RFFVRlFPMEZCUVZjN1FVRkRMMEk3UVVGRFFTeHRRa0ZCVHl4RFFVRlFPMEZCUTBnN096czdPenRCUVVOS096dEJRVVZFU1N4UFFVRlBReXhQUVVGUUxFZEJRV2xDV0N4TlFVRnFRaUlzSW1acGJHVWlPaUowY21sd2JHVXVhbk1pTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lJbmRYTmxJSE4wY21samRDYzdYRzVjYmk4cUtseHVJQ29nVkhKcGNHeGxJSFJvWVhRZ1kyOXVkR0ZwYm5NZ1BIQmhkR2c3SUhOcGRHVTdJR052ZFc1MFpYSStMaUJKWkdWdWRHbG1hV1Z5Y3lCdlppQk1VMFZSSUdGeVpTQnNhWE4wY3lCdlpseHVJQ29nZEhKcGNHeGxjeTVjYmlBcUwxeHVZMnhoYzNNZ1ZISnBjR3hsSUh0Y2JseHVJQ0FnSUM4cUtseHVJQ0FnSUNBcUlFQndZWEpoYlNCN1RuVnRZbVZ5ZlNCd1lYUm9JRlJvWlNCd1lYSjBJRzltSUhSb1pTQndZWFJvSUdsdUlIUm9aU0IwY21WbExseHVJQ0FnSUNBcUlFQndZWEpoYlNCN1RuVnRZbVZ5ZkZOMGNtbHVaMzBnYzJsMFpTQlVhR1VnZFc1cGNYVmxJSE5wZEdVZ2FXUmxiblJwWm1sbGNpQjBhR0YwSUdOeVpXRjBaV1FnZEdobFhHNGdJQ0FnSUNvZ2RISnBjR3hsTGx4dUlDQWdJQ0FxSUVCd1lYSmhiU0I3VG5WdFltVnlmU0JqYjNWdWRHVnlJRlJvWlNCc2IyTmhiQ0JqYjNWdWRHVnlJRzltSUhSb1pTQnphWFJsSUhkb1pXNGdhWFFnWTNKbFlYUmxaQ0IwYUdWY2JpQWdJQ0FnS2lCMGNtbHdiR1V1WEc0Z0lDQWdJQ292SUNBZ0lDQWdJRnh1SUNBZ0lHTnZibk4wY25WamRHOXlJQ2h3WVhSb0xDQnphWFJsTENCamIzVnVkR1Z5S1NCN1hHNGdJQ0FnSUNBZ0lIUm9hWE11Y0NBOUlIQmhkR2c3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVjeUE5SUhOcGRHVTdYRzRnSUNBZ0lDQWdJSFJvYVhNdVl5QTlJR052ZFc1MFpYSTdYRzRnSUNBZ2ZUdGNibHh1SUNBZ0lDOHFLbHh1SUNBZ0lDQXFJRU52YlhCaGNtVWdkSGR2SUhSeWFYQnNaWE1nY0hKcGIzSnBkR2w2YVc1bklIUm9aU0J3WVhSb0xDQjBhR1Z1SUhOcGRHVXNJSFJvWlc0Z1kyOTFiblJsY2k1Y2JpQWdJQ0FnS2lCQWNHRnlZVzBnZTFSeWFYQnNaWDBnYnlCMGFHVWdiM1JvWlhJZ2RISnBjR3hsSUhSdklHTnZiWEJoY21VZ0xseHVJQ0FnSUNBcUlFQnlaWFIxY201eklIdE9kVzFpWlhKOUlDMHhJR2xtSUhSb2FYTWdhWE1nYkc5M1pYSWdkR2hoYmlCdkxDQXhJR2xtSUhSb2FYTWdhWE1nWjNKbFlYUmxjaUIwYUdGdVhHNGdJQ0FnSUNvZ2J5d2dNQ0J2ZEdobGNuZHBjMlV1WEc0Z0lDQWdJQ292WEc0Z0lDQWdZMjl0Y0dGeVpWUnZJQ2h2S1NCN1hHNGdJQ0FnSUNBZ0lDOHZJQ014SUhCeWIyTmxjM01nYldGNGFXMWhiQ0IyYVhKMGRXRnNJR0p2ZFc1a2MxeHVJQ0FnSUNBZ0lDQnBaaUFvZEdocGN5NXpJRDA5UFNCT2RXMWlaWEl1VFVGWVgxWkJURlZGSUNZbUlIUm9hWE11WXlBOVBUMGdUblZ0WW1WeUxrMUJXRjlXUVV4VlJTbDdYRzRnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnTVR0Y2JpQWdJQ0FnSUNBZ2ZUdGNiaUFnSUNBZ0lDQWdhV1lnS0c4dWN5QTlQVDBnVG5WdFltVnlMazFCV0Y5V1FVeFZSU0FtSmlCdkxuTWdQVDA5SUU1MWJXSmxjaTVOUVZoZlZrRk1WVVVwZTF4dUlDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlDMHhPMXh1SUNBZ0lDQWdJQ0I5TzF4dUlDQWdJQ0FnSUNBdkx5QWpNaUJqYjIxd1lYSmxJSEFnZEdobGJpQnpJSFJvWlc0Z1kxeHVJQ0FnSUNBZ0lDQnBaaUFvZEdocGN5NXdJRHdnYnk1d0tTQjdJSEpsZEhWeWJpQXRNVHQ5TzF4dUlDQWdJQ0FnSUNCcFppQW9kR2hwY3k1d0lENGdieTV3S1NCN0lISmxkSFZ5YmlBeElEdDlPMXh1SUNBZ0lDQWdJQ0JwWmlBb2RHaHBjeTV6SUR3Z2J5NXpLU0I3SUhKbGRIVnliaUF0TVR0OU8xeHVJQ0FnSUNBZ0lDQnBaaUFvZEdocGN5NXpJRDRnYnk1ektTQjdJSEpsZEhWeWJpQXhJRHQ5TzF4dUlDQWdJQ0FnSUNCcFppQW9kR2hwY3k1aklEd2dieTVqS1NCN0lISmxkSFZ5YmlBdE1UdDlPMXh1SUNBZ0lDQWdJQ0JwWmlBb2RHaHBjeTVqSUQ0Z2J5NWpLU0I3SUhKbGRIVnliaUF4SUR0OU8xeHVJQ0FnSUNBZ0lDQXZMeUFqTXlCMGFHVjVJR0Z5WlNCbGNYVmhiRnh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdNRHRjYmlBZ0lDQjlPMXh1ZlR0Y2JseHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQlVjbWx3YkdVN1hHNGlYWDA9IiwiLy8gVmpldXg6IEN1c3RvbWl6ZWQgYmlnSW50MnN0ciBhbmQgc3RyMmJpZ0ludCBpbiBvcmRlciB0byBhY2NlcHQgY3VzdG9tIGJhc2UuXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIEJpZyBJbnRlZ2VyIExpYnJhcnkgdi4gNS40XG4vLyBDcmVhdGVkIDIwMDAsIGxhc3QgbW9kaWZpZWQgMjAwOVxuLy8gTGVlbW9uIEJhaXJkXG4vLyB3d3cubGVlbW9uLmNvbVxuLy9cbi8vIFZlcnNpb24gaGlzdG9yeTpcbi8vIHYgNS40ICAzIE9jdCAyMDA5XG4vLyAgIC0gYWRkZWQgXCJ2YXIgaVwiIHRvIGdyZWF0ZXJTaGlmdCgpIHNvIGkgaXMgbm90IGdsb2JhbC4gKFRoYW5rcyB0byBQ77+9dGVyIFN6YWLvv70gZm9yIGZpbmRpbmcgdGhhdCBidWcpXG4vL1xuLy8gdiA1LjMgIDIxIFNlcCAyMDA5XG4vLyAgIC0gYWRkZWQgcmFuZFByb2JQcmltZShrKSBmb3IgcHJvYmFibGUgcHJpbWVzXG4vLyAgIC0gdW5yb2xsZWQgbG9vcCBpbiBtb250XyAoc2xpZ2h0bHkgZmFzdGVyKVxuLy8gICAtIG1pbGxlclJhYmluIG5vdyB0YWtlcyBhIGJpZ0ludCBwYXJhbWV0ZXIgcmF0aGVyIHRoYW4gYW4gaW50XG4vL1xuLy8gdiA1LjIgIDE1IFNlcCAyMDA5XG4vLyAgIC0gZml4ZWQgY2FwaXRhbGl6YXRpb24gaW4gY2FsbCB0byBpbnQyYmlnSW50IGluIHJhbmRCaWdJbnRcbi8vICAgICAodGhhbmtzIHRvIEVtaWxpIEV2cmlwaWRvdSwgUmVpbmhvbGQgQmVocmluZ2VyLCBhbmQgU2FtdWVsIE1hY2FsZWVzZSBmb3IgZmluZGluZyB0aGF0IGJ1Zylcbi8vXG4vLyB2IDUuMSAgOCBPY3QgMjAwN1xuLy8gICAtIHJlbmFtZWQgaW52ZXJzZU1vZEludF8gdG8gaW52ZXJzZU1vZEludCBzaW5jZSBpdCBkb2Vzbid0IGNoYW5nZSBpdHMgcGFyYW1ldGVyc1xuLy8gICAtIGFkZGVkIGZ1bmN0aW9ucyBHQ0QgYW5kIHJhbmRCaWdJbnQsIHdoaWNoIGNhbGwgR0NEXyBhbmQgcmFuZEJpZ0ludF9cbi8vICAgLSBmaXhlZCBhIGJ1ZyBmb3VuZCBieSBSb2IgVmlzc2VyIChzZWUgY29tbWVudCB3aXRoIGhpcyBuYW1lIGJlbG93KVxuLy8gICAtIGltcHJvdmVkIGNvbW1lbnRzXG4vL1xuLy8gVGhpcyBmaWxlIGlzIHB1YmxpYyBkb21haW4uICAgWW91IGNhbiB1c2UgaXQgZm9yIGFueSBwdXJwb3NlIHdpdGhvdXQgcmVzdHJpY3Rpb24uXG4vLyBJIGRvIG5vdCBndWFyYW50ZWUgdGhhdCBpdCBpcyBjb3JyZWN0LCBzbyB1c2UgaXQgYXQgeW91ciBvd24gcmlzay4gIElmIHlvdSB1c2Vcbi8vIGl0IGZvciBzb21ldGhpbmcgaW50ZXJlc3RpbmcsIEknZCBhcHByZWNpYXRlIGhlYXJpbmcgYWJvdXQgaXQuICBJZiB5b3UgZmluZFxuLy8gYW55IGJ1Z3Mgb3IgbWFrZSBhbnkgaW1wcm92ZW1lbnRzLCBJJ2QgYXBwcmVjaWF0ZSBoZWFyaW5nIGFib3V0IHRob3NlIHRvby5cbi8vIEl0IHdvdWxkIGFsc28gYmUgbmljZSBpZiBteSBuYW1lIGFuZCBVUkwgd2VyZSBsZWZ0IGluIHRoZSBjb21tZW50cy4gIEJ1dCBub25lXG4vLyBvZiB0aGF0IGlzIHJlcXVpcmVkLlxuLy9cbi8vIFRoaXMgY29kZSBkZWZpbmVzIGEgYmlnSW50IGxpYnJhcnkgZm9yIGFyYml0cmFyeS1wcmVjaXNpb24gaW50ZWdlcnMuXG4vLyBBIGJpZ0ludCBpcyBhbiBhcnJheSBvZiBpbnRlZ2VycyBzdG9yaW5nIHRoZSB2YWx1ZSBpbiBjaHVua3Mgb2YgYnBlIGJpdHMsXG4vLyBsaXR0bGUgZW5kaWFuIChidWZmWzBdIGlzIHRoZSBsZWFzdCBzaWduaWZpY2FudCB3b3JkKS5cbi8vIE5lZ2F0aXZlIGJpZ0ludHMgYXJlIHN0b3JlZCB0d28ncyBjb21wbGVtZW50LiAgQWxtb3N0IGFsbCB0aGUgZnVuY3Rpb25zIHRyZWF0XG4vLyBiaWdJbnRzIGFzIG5vbm5lZ2F0aXZlLiAgVGhlIGZldyB0aGF0IHZpZXcgdGhlbSBhcyB0d28ncyBjb21wbGVtZW50IHNheSBzb1xuLy8gaW4gdGhlaXIgY29tbWVudHMuICBTb21lIGZ1bmN0aW9ucyBhc3N1bWUgdGhlaXIgcGFyYW1ldGVycyBoYXZlIGF0IGxlYXN0IG9uZVxuLy8gbGVhZGluZyB6ZXJvIGVsZW1lbnQuIEZ1bmN0aW9ucyB3aXRoIGFuIHVuZGVyc2NvcmUgYXQgdGhlIGVuZCBvZiB0aGUgbmFtZSBwdXRcbi8vIHRoZWlyIGFuc3dlciBpbnRvIG9uZSBvZiB0aGUgYXJyYXlzIHBhc3NlZCBpbiwgYW5kIGhhdmUgdW5wcmVkaWN0YWJsZSBiZWhhdmlvclxuLy8gaW4gY2FzZSBvZiBvdmVyZmxvdywgc28gdGhlIGNhbGxlciBtdXN0IG1ha2Ugc3VyZSB0aGUgYXJyYXlzIGFyZSBiaWcgZW5vdWdoIHRvXG4vLyBob2xkIHRoZSBhbnN3ZXIuICBCdXQgdGhlIGF2ZXJhZ2UgdXNlciBzaG91bGQgbmV2ZXIgaGF2ZSB0byBjYWxsIGFueSBvZiB0aGVcbi8vIHVuZGVyc2NvcmVkIGZ1bmN0aW9ucy4gIEVhY2ggaW1wb3J0YW50IHVuZGVyc2NvcmVkIGZ1bmN0aW9uIGhhcyBhIHdyYXBwZXIgZnVuY3Rpb25cbi8vIG9mIHRoZSBzYW1lIG5hbWUgd2l0aG91dCB0aGUgdW5kZXJzY29yZSB0aGF0IHRha2VzIGNhcmUgb2YgdGhlIGRldGFpbHMgZm9yIHlvdS5cbi8vIEZvciBlYWNoIHVuZGVyc2NvcmVkIGZ1bmN0aW9uIHdoZXJlIGEgcGFyYW1ldGVyIGlzIG1vZGlmaWVkLCB0aGF0IHNhbWUgdmFyaWFibGVcbi8vIG11c3Qgbm90IGJlIHVzZWQgYXMgYW5vdGhlciBhcmd1bWVudCB0b28uICBTbywgeW91IGNhbm5vdCBzcXVhcmUgeCBieSBkb2luZ1xuLy8gbXVsdE1vZF8oeCx4LG4pLiAgWW91IG11c3QgdXNlIHNxdWFyZU1vZF8oeCxuKSBpbnN0ZWFkLCBvciBkbyB5PWR1cCh4KTsgbXVsdE1vZF8oeCx5LG4pLlxuLy8gT3Igc2ltcGx5IHVzZSB0aGUgbXVsdE1vZCh4LHgsbikgZnVuY3Rpb24gd2l0aG91dCB0aGUgdW5kZXJzY29yZSwgd2hlcmVcbi8vIHN1Y2ggaXNzdWVzIG5ldmVyIGFyaXNlLCBiZWNhdXNlIG5vbi11bmRlcnNjb3JlZCBmdW5jdGlvbnMgbmV2ZXIgY2hhbmdlXG4vLyB0aGVpciBwYXJhbWV0ZXJzOyB0aGV5IGFsd2F5cyBhbGxvY2F0ZSBuZXcgbWVtb3J5IGZvciB0aGUgYW5zd2VyIHRoYXQgaXMgcmV0dXJuZWQuXG4vL1xuLy8gVGhlc2UgZnVuY3Rpb25zIGFyZSBkZXNpZ25lZCB0byBhdm9pZCBmcmVxdWVudCBkeW5hbWljIG1lbW9yeSBhbGxvY2F0aW9uIGluIHRoZSBpbm5lciBsb29wLlxuLy8gRm9yIG1vc3QgZnVuY3Rpb25zLCBpZiBpdCBuZWVkcyBhIEJpZ0ludCBhcyBhIGxvY2FsIHZhcmlhYmxlIGl0IHdpbGwgYWN0dWFsbHkgdXNlXG4vLyBhIGdsb2JhbCwgYW5kIHdpbGwgb25seSBhbGxvY2F0ZSB0byBpdCBvbmx5IHdoZW4gaXQncyBub3QgdGhlIHJpZ2h0IHNpemUuICBUaGlzIGVuc3VyZXNcbi8vIHRoYXQgd2hlbiBhIGZ1bmN0aW9uIGlzIGNhbGxlZCByZXBlYXRlZGx5IHdpdGggc2FtZS1zaXplZCBwYXJhbWV0ZXJzLCBpdCBvbmx5IGFsbG9jYXRlc1xuLy8gbWVtb3J5IG9uIHRoZSBmaXJzdCBjYWxsLlxuLy9cbi8vIE5vdGUgdGhhdCBmb3IgY3J5cHRvZ3JhcGhpYyBwdXJwb3NlcywgdGhlIGNhbGxzIHRvIE1hdGgucmFuZG9tKCkgbXVzdFxuLy8gYmUgcmVwbGFjZWQgd2l0aCBjYWxscyB0byBhIGJldHRlciBwc2V1ZG9yYW5kb20gbnVtYmVyIGdlbmVyYXRvci5cbi8vXG4vLyBJbiB0aGUgZm9sbG93aW5nLCBcImJpZ0ludFwiIG1lYW5zIGEgYmlnSW50IHdpdGggYXQgbGVhc3Qgb25lIGxlYWRpbmcgemVybyBlbGVtZW50LFxuLy8gYW5kIFwiaW50ZWdlclwiIG1lYW5zIGEgbm9ubmVnYXRpdmUgaW50ZWdlciBsZXNzIHRoYW4gcmFkaXguICBJbiBzb21lIGNhc2VzLCBpbnRlZ2VyXG4vLyBjYW4gYmUgbmVnYXRpdmUuICBOZWdhdGl2ZSBiaWdJbnRzIGFyZSAycyBjb21wbGVtZW50LlxuLy9cbi8vIFRoZSBmb2xsb3dpbmcgZnVuY3Rpb25zIGRvIG5vdCBtb2RpZnkgdGhlaXIgaW5wdXRzLlxuLy8gVGhvc2UgcmV0dXJuaW5nIGEgYmlnSW50LCBzdHJpbmcsIG9yIEFycmF5IHdpbGwgZHluYW1pY2FsbHkgYWxsb2NhdGUgbWVtb3J5IGZvciB0aGF0IHZhbHVlLlxuLy8gVGhvc2UgcmV0dXJuaW5nIGEgYm9vbGVhbiB3aWxsIHJldHVybiB0aGUgaW50ZWdlciAwIChmYWxzZSkgb3IgMSAodHJ1ZSkuXG4vLyBUaG9zZSByZXR1cm5pbmcgYm9vbGVhbiBvciBpbnQgd2lsbCBub3QgYWxsb2NhdGUgbWVtb3J5IGV4Y2VwdCBwb3NzaWJseSBvbiB0aGUgZmlyc3Rcbi8vIHRpbWUgdGhleSdyZSBjYWxsZWQgd2l0aCBhIGdpdmVuIHBhcmFtZXRlciBzaXplLlxuLy9cbi8vIGJpZ0ludCAgYWRkKHgseSkgICAgICAgICAgICAgICAvL3JldHVybiAoeCt5KSBmb3IgYmlnSW50cyB4IGFuZCB5LlxuLy8gYmlnSW50ICBhZGRJbnQoeCxuKSAgICAgICAgICAgIC8vcmV0dXJuICh4K24pIHdoZXJlIHggaXMgYSBiaWdJbnQgYW5kIG4gaXMgYW4gaW50ZWdlci5cbi8vIHN0cmluZyAgYmlnSW50MnN0cih4LGJhc2UpICAgICAvL3JldHVybiBhIHN0cmluZyBmb3JtIG9mIGJpZ0ludCB4IGluIGEgZ2l2ZW4gYmFzZSwgd2l0aCAyIDw9IGJhc2UgPD0gOTVcbi8vIGludCAgICAgYml0U2l6ZSh4KSAgICAgICAgICAgICAvL3JldHVybiBob3cgbWFueSBiaXRzIGxvbmcgdGhlIGJpZ0ludCB4IGlzLCBub3QgY291bnRpbmcgbGVhZGluZyB6ZXJvc1xuLy8gYmlnSW50ICBkdXAoeCkgICAgICAgICAgICAgICAgIC8vcmV0dXJuIGEgY29weSBvZiBiaWdJbnQgeFxuLy8gYm9vbGVhbiBlcXVhbHMoeCx5KSAgICAgICAgICAgIC8vaXMgdGhlIGJpZ0ludCB4IGVxdWFsIHRvIHRoZSBiaWdpbnQgeT9cbi8vIGJvb2xlYW4gZXF1YWxzSW50KHgseSkgICAgICAgICAvL2lzIGJpZ2ludCB4IGVxdWFsIHRvIGludGVnZXIgeT9cbi8vIGJpZ0ludCAgZXhwYW5kKHgsbikgICAgICAgICAgICAvL3JldHVybiBhIGNvcHkgb2YgeCB3aXRoIGF0IGxlYXN0IG4gZWxlbWVudHMsIGFkZGluZyBsZWFkaW5nIHplcm9zIGlmIG5lZWRlZFxuLy8gQXJyYXkgICBmaW5kUHJpbWVzKG4pICAgICAgICAgIC8vcmV0dXJuIGFycmF5IG9mIGFsbCBwcmltZXMgbGVzcyB0aGFuIGludGVnZXIgblxuLy8gYmlnSW50ICBHQ0QoeCx5KSAgICAgICAgICAgICAgIC8vcmV0dXJuIGdyZWF0ZXN0IGNvbW1vbiBkaXZpc29yIG9mIGJpZ0ludHMgeCBhbmQgeSAoZWFjaCB3aXRoIHNhbWUgbnVtYmVyIG9mIGVsZW1lbnRzKS5cbi8vIGJvb2xlYW4gZ3JlYXRlcih4LHkpICAgICAgICAgICAvL2lzIHg+eT8gICh4IGFuZCB5IGFyZSBub25uZWdhdGl2ZSBiaWdJbnRzKVxuLy8gYm9vbGVhbiBncmVhdGVyU2hpZnQoeCx5LHNoaWZ0KS8vaXMgKHggPDwoc2hpZnQqYnBlKSkgPiB5P1xuLy8gYmlnSW50ICBpbnQyYmlnSW50KHQsbixtKSAgICAgIC8vcmV0dXJuIGEgYmlnSW50IGVxdWFsIHRvIGludGVnZXIgdCwgd2l0aCBhdCBsZWFzdCBuIGJpdHMgYW5kIG0gYXJyYXkgZWxlbWVudHNcbi8vIGJpZ0ludCAgaW52ZXJzZU1vZCh4LG4pICAgICAgICAvL3JldHVybiAoeCoqKC0xKSBtb2QgbikgZm9yIGJpZ0ludHMgeCBhbmQgbi4gIElmIG5vIGludmVyc2UgZXhpc3RzLCBpdCByZXR1cm5zIG51bGxcbi8vIGludCAgICAgaW52ZXJzZU1vZEludCh4LG4pICAgICAvL3JldHVybiB4KiooLTEpIG1vZCBuLCBmb3IgaW50ZWdlcnMgeCBhbmQgbi4gIFJldHVybiAwIGlmIHRoZXJlIGlzIG5vIGludmVyc2Vcbi8vIGJvb2xlYW4gaXNaZXJvKHgpICAgICAgICAgICAgICAvL2lzIHRoZSBiaWdJbnQgeCBlcXVhbCB0byB6ZXJvP1xuLy8gYm9vbGVhbiBtaWxsZXJSYWJpbih4LGIpICAgICAgIC8vZG9lcyBvbmUgcm91bmQgb2YgTWlsbGVyLVJhYmluIGJhc2UgaW50ZWdlciBiIHNheSB0aGF0IGJpZ0ludCB4IGlzIHBvc3NpYmx5IHByaW1lPyAoYiBpcyBiaWdJbnQsIDE8Yjx4KVxuLy8gYm9vbGVhbiBtaWxsZXJSYWJpbkludCh4LGIpICAgIC8vZG9lcyBvbmUgcm91bmQgb2YgTWlsbGVyLVJhYmluIGJhc2UgaW50ZWdlciBiIHNheSB0aGF0IGJpZ0ludCB4IGlzIHBvc3NpYmx5IHByaW1lPyAoYiBpcyBpbnQsICAgIDE8Yjx4KVxuLy8gYmlnSW50ICBtb2QoeCxuKSAgICAgICAgICAgICAgIC8vcmV0dXJuIGEgbmV3IGJpZ0ludCBlcXVhbCB0byAoeCBtb2QgbikgZm9yIGJpZ0ludHMgeCBhbmQgbi5cbi8vIGludCAgICAgbW9kSW50KHgsbikgICAgICAgICAgICAvL3JldHVybiB4IG1vZCBuIGZvciBiaWdJbnQgeCBhbmQgaW50ZWdlciBuLlxuLy8gYmlnSW50ICBtdWx0KHgseSkgICAgICAgICAgICAgIC8vcmV0dXJuIHgqeSBmb3IgYmlnSW50cyB4IGFuZCB5LiBUaGlzIGlzIGZhc3RlciB3aGVuIHk8eC5cbi8vIGJpZ0ludCAgbXVsdE1vZCh4LHksbikgICAgICAgICAvL3JldHVybiAoeCp5IG1vZCBuKSBmb3IgYmlnSW50cyB4LHksbi4gIEZvciBncmVhdGVyIHNwZWVkLCBsZXQgeTx4LlxuLy8gYm9vbGVhbiBuZWdhdGl2ZSh4KSAgICAgICAgICAgIC8vaXMgYmlnSW50IHggbmVnYXRpdmU/XG4vLyBiaWdJbnQgIHBvd01vZCh4LHksbikgICAgICAgICAgLy9yZXR1cm4gKHgqKnkgbW9kIG4pIHdoZXJlIHgseSxuIGFyZSBiaWdJbnRzIGFuZCAqKiBpcyBleHBvbmVudGlhdGlvbi4gIDAqKjA9MS4gRmFzdGVyIGZvciBvZGQgbi5cbi8vIGJpZ0ludCAgcmFuZEJpZ0ludChuLHMpICAgICAgICAvL3JldHVybiBhbiBuLWJpdCByYW5kb20gQmlnSW50IChuPj0xKS4gIElmIHM9MSwgdGhlbiB0aGUgbW9zdCBzaWduaWZpY2FudCBvZiB0aG9zZSBuIGJpdHMgaXMgc2V0IHRvIDEuXG4vLyBiaWdJbnQgIHJhbmRUcnVlUHJpbWUoaykgICAgICAgLy9yZXR1cm4gYSBuZXcsIHJhbmRvbSwgay1iaXQsIHRydWUgcHJpbWUgYmlnSW50IHVzaW5nIE1hdXJlcidzIGFsZ29yaXRobS5cbi8vIGJpZ0ludCAgcmFuZFByb2JQcmltZShrKSAgICAgICAvL3JldHVybiBhIG5ldywgcmFuZG9tLCBrLWJpdCwgcHJvYmFibGUgcHJpbWUgYmlnSW50IChwcm9iYWJpbGl0eSBpdCdzIGNvbXBvc2l0ZSBsZXNzIHRoYW4gMl4tODApLlxuLy8gYmlnSW50ICBzdHIyYmlnSW50KHMsYixuLG0pICAgIC8vcmV0dXJuIGEgYmlnSW50IGZvciBudW1iZXIgcmVwcmVzZW50ZWQgaW4gc3RyaW5nIHMgaW4gYmFzZSBiIHdpdGggYXQgbGVhc3QgbiBiaXRzIGFuZCBtIGFycmF5IGVsZW1lbnRzXG4vLyBiaWdJbnQgIHN1Yih4LHkpICAgICAgICAgICAgICAgLy9yZXR1cm4gKHgteSkgZm9yIGJpZ0ludHMgeCBhbmQgeS4gIE5lZ2F0aXZlIGFuc3dlcnMgd2lsbCBiZSAycyBjb21wbGVtZW50XG4vLyBiaWdJbnQgIHRyaW0oeCxrKSAgICAgICAgICAgICAgLy9yZXR1cm4gYSBjb3B5IG9mIHggd2l0aCBleGFjdGx5IGsgbGVhZGluZyB6ZXJvIGVsZW1lbnRzXG4vL1xuLy9cbi8vIFRoZSBmb2xsb3dpbmcgZnVuY3Rpb25zIGVhY2ggaGF2ZSBhIG5vbi11bmRlcnNjb3JlZCB2ZXJzaW9uLCB3aGljaCBtb3N0IHVzZXJzIHNob3VsZCBjYWxsIGluc3RlYWQuXG4vLyBUaGVzZSBmdW5jdGlvbnMgZWFjaCB3cml0ZSB0byBhIHNpbmdsZSBwYXJhbWV0ZXIsIGFuZCB0aGUgY2FsbGVyIGlzIHJlc3BvbnNpYmxlIGZvciBlbnN1cmluZyB0aGUgYXJyYXlcbi8vIHBhc3NlZCBpbiBpcyBsYXJnZSBlbm91Z2ggdG8gaG9sZCB0aGUgcmVzdWx0LlxuLy9cbi8vIHZvaWQgICAgYWRkSW50Xyh4LG4pICAgICAgICAgIC8vZG8geD14K24gd2hlcmUgeCBpcyBhIGJpZ0ludCBhbmQgbiBpcyBhbiBpbnRlZ2VyXG4vLyB2b2lkICAgIGFkZF8oeCx5KSAgICAgICAgICAgICAvL2RvIHg9eCt5IGZvciBiaWdJbnRzIHggYW5kIHlcbi8vIHZvaWQgICAgY29weV8oeCx5KSAgICAgICAgICAgIC8vZG8geD15IG9uIGJpZ0ludHMgeCBhbmQgeVxuLy8gdm9pZCAgICBjb3B5SW50Xyh4LG4pICAgICAgICAgLy9kbyB4PW4gb24gYmlnSW50IHggYW5kIGludGVnZXIgblxuLy8gdm9pZCAgICBHQ0RfKHgseSkgICAgICAgICAgICAgLy9zZXQgeCB0byB0aGUgZ3JlYXRlc3QgY29tbW9uIGRpdmlzb3Igb2YgYmlnSW50cyB4IGFuZCB5LCAoeSBpcyBkZXN0cm95ZWQpLiAgKFRoaXMgbmV2ZXIgb3ZlcmZsb3dzIGl0cyBhcnJheSkuXG4vLyBib29sZWFuIGludmVyc2VNb2RfKHgsbikgICAgICAvL2RvIHg9eCoqKC0xKSBtb2QgbiwgZm9yIGJpZ0ludHMgeCBhbmQgbi4gUmV0dXJucyAxICgwKSBpZiBpbnZlcnNlIGRvZXMgKGRvZXNuJ3QpIGV4aXN0XG4vLyB2b2lkICAgIG1vZF8oeCxuKSAgICAgICAgICAgICAvL2RvIHg9eCBtb2QgbiBmb3IgYmlnSW50cyB4IGFuZCBuLiAoVGhpcyBuZXZlciBvdmVyZmxvd3MgaXRzIGFycmF5KS5cbi8vIHZvaWQgICAgbXVsdF8oeCx5KSAgICAgICAgICAgIC8vZG8geD14KnkgZm9yIGJpZ0ludHMgeCBhbmQgeS5cbi8vIHZvaWQgICAgbXVsdE1vZF8oeCx5LG4pICAgICAgIC8vZG8geD14KnkgIG1vZCBuIGZvciBiaWdJbnRzIHgseSxuLlxuLy8gdm9pZCAgICBwb3dNb2RfKHgseSxuKSAgICAgICAgLy9kbyB4PXgqKnkgbW9kIG4sIHdoZXJlIHgseSxuIGFyZSBiaWdJbnRzIChuIGlzIG9kZCkgYW5kICoqIGlzIGV4cG9uZW50aWF0aW9uLiAgMCoqMD0xLlxuLy8gdm9pZCAgICByYW5kQmlnSW50XyhiLG4scykgICAgLy9kbyBiID0gYW4gbi1iaXQgcmFuZG9tIEJpZ0ludC4gaWYgcz0xLCB0aGVuIG50aCBiaXQgKG1vc3Qgc2lnbmlmaWNhbnQgYml0KSBpcyBzZXQgdG8gMS4gbj49MS5cbi8vIHZvaWQgICAgcmFuZFRydWVQcmltZV8oYW5zLGspIC8vZG8gYW5zID0gYSByYW5kb20gay1iaXQgdHJ1ZSByYW5kb20gcHJpbWUgKG5vdCBqdXN0IHByb2JhYmxlIHByaW1lKSB3aXRoIDEgaW4gdGhlIG1zYi5cbi8vIHZvaWQgICAgc3ViXyh4LHkpICAgICAgICAgICAgIC8vZG8geD14LXkgZm9yIGJpZ0ludHMgeCBhbmQgeS4gTmVnYXRpdmUgYW5zd2VycyB3aWxsIGJlIDJzIGNvbXBsZW1lbnQuXG4vL1xuLy8gVGhlIGZvbGxvd2luZyBmdW5jdGlvbnMgZG8gTk9UIGhhdmUgYSBub24tdW5kZXJzY29yZWQgdmVyc2lvbi5cbi8vIFRoZXkgZWFjaCB3cml0ZSBhIGJpZ0ludCByZXN1bHQgdG8gb25lIG9yIG1vcmUgcGFyYW1ldGVycy4gIFRoZSBjYWxsZXIgaXMgcmVzcG9uc2libGUgZm9yXG4vLyBlbnN1cmluZyB0aGUgYXJyYXlzIHBhc3NlZCBpbiBhcmUgbGFyZ2UgZW5vdWdoIHRvIGhvbGQgdGhlIHJlc3VsdHMuXG4vL1xuLy8gdm9pZCBhZGRTaGlmdF8oeCx5LHlzKSAgICAgICAvL2RvIHg9eCsoeTw8KHlzKmJwZSkpXG4vLyB2b2lkIGNhcnJ5Xyh4KSAgICAgICAgICAgICAgIC8vZG8gY2FycmllcyBhbmQgYm9ycm93cyBzbyBlYWNoIGVsZW1lbnQgb2YgdGhlIGJpZ0ludCB4IGZpdHMgaW4gYnBlIGJpdHMuXG4vLyB2b2lkIGRpdmlkZV8oeCx5LHEscikgICAgICAgIC8vZGl2aWRlIHggYnkgeSBnaXZpbmcgcXVvdGllbnQgcSBhbmQgcmVtYWluZGVyIHJcbi8vIGludCAgZGl2SW50Xyh4LG4pICAgICAgICAgICAgLy9kbyB4PWZsb29yKHgvbikgZm9yIGJpZ0ludCB4IGFuZCBpbnRlZ2VyIG4sIGFuZCByZXR1cm4gdGhlIHJlbWFpbmRlci4gKFRoaXMgbmV2ZXIgb3ZlcmZsb3dzIGl0cyBhcnJheSkuXG4vLyBpbnQgIGVHQ0RfKHgseSxkLGEsYikgICAgICAgIC8vc2V0cyBhLGIsZCB0byBwb3NpdGl2ZSBiaWdJbnRzIHN1Y2ggdGhhdCBkID0gR0NEXyh4LHkpID0gYSp4LWIqeVxuLy8gdm9pZCBoYWx2ZV8oeCkgICAgICAgICAgICAgICAvL2RvIHg9Zmxvb3IofHh8LzIpKnNnbih4KSBmb3IgYmlnSW50IHggaW4gMidzIGNvbXBsZW1lbnQuICAoVGhpcyBuZXZlciBvdmVyZmxvd3MgaXRzIGFycmF5KS5cbi8vIHZvaWQgbGVmdFNoaWZ0Xyh4LG4pICAgICAgICAgLy9sZWZ0IHNoaWZ0IGJpZ0ludCB4IGJ5IG4gYml0cy4gIG48YnBlLlxuLy8gdm9pZCBsaW5Db21iXyh4LHksYSxiKSAgICAgICAvL2RvIHg9YSp4K2IqeSBmb3IgYmlnSW50cyB4IGFuZCB5IGFuZCBpbnRlZ2VycyBhIGFuZCBiXG4vLyB2b2lkIGxpbkNvbWJTaGlmdF8oeCx5LGIseXMpIC8vZG8geD14K2IqKHk8PCh5cypicGUpKSBmb3IgYmlnSW50cyB4IGFuZCB5LCBhbmQgaW50ZWdlcnMgYiBhbmQgeXNcbi8vIHZvaWQgbW9udF8oeCx5LG4sbnApICAgICAgICAgLy9Nb250Z29tZXJ5IG11bHRpcGxpY2F0aW9uIChzZWUgY29tbWVudHMgd2hlcmUgdGhlIGZ1bmN0aW9uIGlzIGRlZmluZWQpXG4vLyB2b2lkIG11bHRJbnRfKHgsbikgICAgICAgICAgIC8vZG8geD14Km4gd2hlcmUgeCBpcyBhIGJpZ0ludCBhbmQgbiBpcyBhbiBpbnRlZ2VyLlxuLy8gdm9pZCByaWdodFNoaWZ0Xyh4LG4pICAgICAgICAvL3JpZ2h0IHNoaWZ0IGJpZ0ludCB4IGJ5IG4gYml0cy4gIDAgPD0gbiA8IGJwZS4gKFRoaXMgbmV2ZXIgb3ZlcmZsb3dzIGl0cyBhcnJheSkuXG4vLyB2b2lkIHNxdWFyZU1vZF8oeCxuKSAgICAgICAgIC8vZG8geD14KnggIG1vZCBuIGZvciBiaWdJbnRzIHgsblxuLy8gdm9pZCBzdWJTaGlmdF8oeCx5LHlzKSAgICAgICAvL2RvIHg9eC0oeTw8KHlzKmJwZSkpLiBOZWdhdGl2ZSBhbnN3ZXJzIHdpbGwgYmUgMnMgY29tcGxlbWVudC5cbi8vXG4vLyBUaGUgZm9sbG93aW5nIGZ1bmN0aW9ucyBhcmUgYmFzZWQgb24gYWxnb3JpdGhtcyBmcm9tIHRoZSBfSGFuZGJvb2sgb2YgQXBwbGllZCBDcnlwdG9ncmFwaHlfXG4vLyAgICBwb3dNb2RfKCkgICAgICAgICAgID0gYWxnb3JpdGhtIDE0Ljk0LCBNb250Z29tZXJ5IGV4cG9uZW50aWF0aW9uXG4vLyAgICBlR0NEXyxpbnZlcnNlTW9kXygpID0gYWxnb3JpdGhtIDE0LjYxLCBCaW5hcnkgZXh0ZW5kZWQgR0NEX1xuLy8gICAgR0NEXygpICAgICAgICAgICAgICA9IGFsZ29yb3RobSAxNC41NywgTGVobWVyJ3MgYWxnb3JpdGhtXG4vLyAgICBtb250XygpICAgICAgICAgICAgID0gYWxnb3JpdGhtIDE0LjM2LCBNb250Z29tZXJ5IG11bHRpcGxpY2F0aW9uXG4vLyAgICBkaXZpZGVfKCkgICAgICAgICAgID0gYWxnb3JpdGhtIDE0LjIwICBNdWx0aXBsZS1wcmVjaXNpb24gZGl2aXNpb25cbi8vICAgIHNxdWFyZU1vZF8oKSAgICAgICAgPSBhbGdvcml0aG0gMTQuMTYgIE11bHRpcGxlLXByZWNpc2lvbiBzcXVhcmluZ1xuLy8gICAgcmFuZFRydWVQcmltZV8oKSAgICA9IGFsZ29yaXRobSAgNC42MiwgTWF1cmVyJ3MgYWxnb3JpdGhtXG4vLyAgICBtaWxsZXJSYWJpbigpICAgICAgID0gYWxnb3JpdGhtICA0LjI0LCBNaWxsZXItUmFiaW4gYWxnb3JpdGhtXG4vL1xuLy8gUHJvZmlsaW5nIHNob3dzOlxuLy8gICAgIHJhbmRUcnVlUHJpbWVfKCkgc3BlbmRzOlxuLy8gICAgICAgICAxMCUgb2YgaXRzIHRpbWUgaW4gY2FsbHMgdG8gcG93TW9kXygpXG4vLyAgICAgICAgIDg1JSBvZiBpdHMgdGltZSBpbiBjYWxscyB0byBtaWxsZXJSYWJpbigpXG4vLyAgICAgbWlsbGVyUmFiaW4oKSBzcGVuZHM6XG4vLyAgICAgICAgIDk5JSBvZiBpdHMgdGltZSBpbiBjYWxscyB0byBwb3dNb2RfKCkgICAoYWx3YXlzIHdpdGggYSBiYXNlIG9mIDIpXG4vLyAgICAgcG93TW9kXygpIHNwZW5kczpcbi8vICAgICAgICAgOTQlIG9mIGl0cyB0aW1lIGluIGNhbGxzIHRvIG1vbnRfKCkgIChhbG1vc3QgYWx3YXlzIHdpdGggeD09eSlcbi8vXG4vLyBUaGlzIHN1Z2dlc3RzIHRoZXJlIGFyZSBzZXZlcmFsIHdheXMgdG8gc3BlZWQgdXAgdGhpcyBsaWJyYXJ5IHNsaWdodGx5OlxuLy8gICAgIC0gY29udmVydCBwb3dNb2RfIHRvIHVzZSBhIE1vbnRnb21lcnkgZm9ybSBvZiBrLWFyeSB3aW5kb3cgKG9yIG1heWJlIGEgTW9udGdvbWVyeSBmb3JtIG9mIHNsaWRpbmcgd2luZG93KVxuLy8gICAgICAgICAtLSB0aGlzIHNob3VsZCBlc3BlY2lhbGx5IGZvY3VzIG9uIGJlaW5nIGZhc3Qgd2hlbiByYWlzaW5nIDIgdG8gYSBwb3dlciBtb2QgblxuLy8gICAgIC0gY29udmVydCByYW5kVHJ1ZVByaW1lXygpIHRvIHVzZSBhIG1pbmltdW0gciBvZiAxLzMgaW5zdGVhZCBvZiAxLzIgd2l0aCB0aGUgYXBwcm9wcmlhdGUgY2hhbmdlIHRvIHRoZSB0ZXN0XG4vLyAgICAgLSB0dW5lIHRoZSBwYXJhbWV0ZXJzIGluIHJhbmRUcnVlUHJpbWVfKCksIGluY2x1ZGluZyBjLCBtLCBhbmQgcmVjTGltaXRcbi8vICAgICAtIHNwZWVkIHVwIHRoZSBzaW5nbGUgbG9vcCBpbiBtb250XygpIHRoYXQgdGFrZXMgOTUlIG9mIHRoZSBydW50aW1lLCBwZXJoYXBzIGJ5IHJlZHVjaW5nIGNoZWNraW5nXG4vLyAgICAgICB3aXRoaW4gdGhlIGxvb3Agd2hlbiBhbGwgdGhlIHBhcmFtZXRlcnMgYXJlIHRoZSBzYW1lIGxlbmd0aC5cbi8vXG4vLyBUaGVyZSBhcmUgc2V2ZXJhbCBpZGVhcyB0aGF0IGxvb2sgbGlrZSB0aGV5IHdvdWxkbid0IGhlbHAgbXVjaCBhdCBhbGw6XG4vLyAgICAgLSByZXBsYWNpbmcgdHJpYWwgZGl2aXNpb24gaW4gcmFuZFRydWVQcmltZV8oKSB3aXRoIGEgc2lldmUgKHRoYXQgc3BlZWRzIHVwIHNvbWV0aGluZyB0YWtpbmcgYWxtb3N0IG5vIHRpbWUgYW55d2F5KVxuLy8gICAgIC0gaW5jcmVhc2UgYnBlIGZyb20gMTUgdG8gMzAgKHRoYXQgd291bGQgaGVscCBpZiB3ZSBoYWQgYSAzMiozMi0+NjQgbXVsdGlwbGllciwgYnV0IG5vdCB3aXRoIEphdmFTY3JpcHQncyAzMiozMi0+MzIpXG4vLyAgICAgLSBzcGVlZGluZyB1cCBtb250Xyh4LHksbixucCkgd2hlbiB4PT15IGJ5IGRvaW5nIGEgbm9uLW1vZHVsYXIsIG5vbi1Nb250Z29tZXJ5IHNxdWFyZVxuLy8gICAgICAgZm9sbG93ZWQgYnkgYSBNb250Z29tZXJ5IHJlZHVjdGlvbi4gIFRoZSBpbnRlcm1lZGlhdGUgYW5zd2VyIHdpbGwgYmUgdHdpY2UgYXMgbG9uZyBhcyB4LCBzbyB0aGF0XG4vLyAgICAgICBtZXRob2Qgd291bGQgYmUgc2xvd2VyLiAgVGhpcyBpcyB1bmZvcnR1bmF0ZSBiZWNhdXNlIHRoZSBjb2RlIGN1cnJlbnRseSBzcGVuZHMgYWxtb3N0IGFsbCBvZiBpdHMgdGltZVxuLy8gICAgICAgZG9pbmcgbW9udF8oeCx4LC4uLiksIGJvdGggZm9yIHJhbmRUcnVlUHJpbWVfKCkgYW5kIHBvd01vZF8oKS4gIEEgZmFzdGVyIG1ldGhvZCBmb3IgTW9udGdvbWVyeSBzcXVhcmluZ1xuLy8gICAgICAgd291bGQgaGF2ZSBhIGxhcmdlIGltcGFjdCBvbiB0aGUgc3BlZWQgb2YgcmFuZFRydWVQcmltZV8oKSBhbmQgcG93TW9kXygpLiAgSEFDIGhhcyBhIGNvdXBsZSBvZiBwb29ybHktd29yZGVkXG4vLyAgICAgICBzZW50ZW5jZXMgdGhhdCBzZWVtIHRvIGltcGx5IGl0J3MgZmFzdGVyIHRvIGRvIGEgbm9uLW1vZHVsYXIgc3F1YXJlIGZvbGxvd2VkIGJ5IGEgc2luZ2xlXG4vLyAgICAgICBNb250Z29tZXJ5IHJlZHVjdGlvbiwgYnV0IHRoYXQncyBvYnZpb3VzbHkgd3JvbmcuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbihmdW5jdGlvbiAoKSB7XG4vL2dsb2JhbHNcbmJwZT0wOyAgICAgICAgIC8vYml0cyBzdG9yZWQgcGVyIGFycmF5IGVsZW1lbnRcbm1hc2s9MDsgICAgICAgIC8vQU5EIHRoaXMgd2l0aCBhbiBhcnJheSBlbGVtZW50IHRvIGNob3AgaXQgZG93biB0byBicGUgYml0c1xucmFkaXg9bWFzaysxOyAgLy9lcXVhbHMgMl5icGUuICBBIHNpbmdsZSAxIGJpdCB0byB0aGUgbGVmdCBvZiB0aGUgbGFzdCBiaXQgb2YgbWFzay5cblxuLy90aGUgZGlnaXRzIGZvciBjb252ZXJ0aW5nIHRvIGRpZmZlcmVudCBiYXNlc1xuZGlnaXRzU3RyPScwMTIzNDU2Nzg5QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5el89IUAjJCVeJiooKVtde318OzosLjw+Lz9gfiBcXFxcXFwnXFxcIistJztcblxuLy9pbml0aWFsaXplIHRoZSBnbG9iYWwgdmFyaWFibGVzXG5mb3IgKGJwZT0wOyAoMTw8KGJwZSsxKSkgPiAoMTw8YnBlKTsgYnBlKyspOyAgLy9icGU9bnVtYmVyIG9mIGJpdHMgaW4gdGhlIG1hbnRpc3NhIG9uIHRoaXMgcGxhdGZvcm1cbmJwZT4+PTE7ICAgICAgICAgICAgICAgICAgIC8vYnBlPW51bWJlciBvZiBiaXRzIGluIG9uZSBlbGVtZW50IG9mIHRoZSBhcnJheSByZXByZXNlbnRpbmcgdGhlIGJpZ0ludFxubWFzaz0oMTw8YnBlKS0xOyAgICAgICAgICAgLy9BTkQgdGhlIG1hc2sgd2l0aCBhbiBpbnRlZ2VyIHRvIGdldCBpdHMgYnBlIGxlYXN0IHNpZ25pZmljYW50IGJpdHNcbnJhZGl4PW1hc2srMTsgICAgICAgICAgICAgIC8vMl5icGUuICBhIHNpbmdsZSAxIGJpdCB0byB0aGUgbGVmdCBvZiB0aGUgZmlyc3QgYml0IG9mIG1hc2tcbm9uZT1pbnQyYmlnSW50KDEsMSwxKTsgICAgIC8vY29uc3RhbnQgdXNlZCBpbiBwb3dNb2RfKClcblxuLy90aGUgZm9sbG93aW5nIGdsb2JhbCB2YXJpYWJsZXMgYXJlIHNjcmF0Y2hwYWQgbWVtb3J5IHRvXG4vL3JlZHVjZSBkeW5hbWljIG1lbW9yeSBhbGxvY2F0aW9uIGluIHRoZSBpbm5lciBsb29wXG50PW5ldyBBcnJheSgwKTtcbnNzPXQ7ICAgICAgIC8vdXNlZCBpbiBtdWx0XygpXG5zMD10OyAgICAgICAvL3VzZWQgaW4gbXVsdE1vZF8oKSwgc3F1YXJlTW9kXygpXG5zMT10OyAgICAgICAvL3VzZWQgaW4gcG93TW9kXygpLCBtdWx0TW9kXygpLCBzcXVhcmVNb2RfKClcbnMyPXQ7ICAgICAgIC8vdXNlZCBpbiBwb3dNb2RfKCksIG11bHRNb2RfKClcbnMzPXQ7ICAgICAgIC8vdXNlZCBpbiBwb3dNb2RfKClcbnM0PXQ7IHM1PXQ7IC8vdXNlZCBpbiBtb2RfKClcbnM2PXQ7ICAgICAgIC8vdXNlZCBpbiBiaWdJbnQyc3RyKClcbnM3PXQ7ICAgICAgIC8vdXNlZCBpbiBwb3dNb2RfKClcblQ9dDsgICAgICAgIC8vdXNlZCBpbiBHQ0RfKClcbnNhPXQ7ICAgICAgIC8vdXNlZCBpbiBtb250XygpXG5tcl94MT10OyBtcl9yPXQ7IG1yX2E9dDsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdXNlZCBpbiBtaWxsZXJSYWJpbigpXG5lZ192PXQ7IGVnX3U9dDsgZWdfQT10OyBlZ19CPXQ7IGVnX0M9dDsgZWdfRD10OyAgICAgICAgICAgICAgIC8vdXNlZCBpbiBlR0NEXygpLCBpbnZlcnNlTW9kXygpXG5tZF9xMT10OyBtZF9xMj10OyBtZF9xMz10OyBtZF9yPXQ7IG1kX3IxPXQ7IG1kX3IyPXQ7IG1kX3R0PXQ7IC8vdXNlZCBpbiBtb2RfKClcblxucHJpbWVzPXQ7IHBvd3M9dDsgc19pPXQ7IHNfaTI9dDsgc19SPXQ7IHNfcm09dDsgc19xPXQ7IHNfbjE9dDtcbiAgc19hPXQ7IHNfcjI9dDsgc19uPXQ7IHNfYj10OyBzX2Q9dDsgc194MT10OyBzX3gyPXQsIHNfYWE9dDsgLy91c2VkIGluIHJhbmRUcnVlUHJpbWVfKClcblxucnBwcmI9dDsgLy91c2VkIGluIHJhbmRQcm9iUHJpbWVSb3VuZHMoKSAod2hpY2ggYWxzbyB1c2VzIFwicHJpbWVzXCIpXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG4vL3JldHVybiBhcnJheSBvZiBhbGwgcHJpbWVzIGxlc3MgdGhhbiBpbnRlZ2VyIG5cbmZ1bmN0aW9uIGZpbmRQcmltZXMobikge1xuICB2YXIgaSxzLHAsYW5zO1xuICBzPW5ldyBBcnJheShuKTtcbiAgZm9yIChpPTA7aTxuO2krKylcbiAgICBzW2ldPTA7XG4gIHNbMF09MjtcbiAgcD0wOyAgICAvL2ZpcnN0IHAgZWxlbWVudHMgb2YgcyBhcmUgcHJpbWVzLCB0aGUgcmVzdCBhcmUgYSBzaWV2ZVxuICBmb3IoO3NbcF08bjspIHsgICAgICAgICAgICAgICAgICAvL3NbcF0gaXMgdGhlIHB0aCBwcmltZVxuICAgIGZvcihpPXNbcF0qc1twXTsgaTxuOyBpKz1zW3BdKSAvL21hcmsgbXVsdGlwbGVzIG9mIHNbcF1cbiAgICAgIHNbaV09MTtcbiAgICBwKys7XG4gICAgc1twXT1zW3AtMV0rMTtcbiAgICBmb3IoOyBzW3BdPG4gJiYgc1tzW3BdXTsgc1twXSsrKTsgLy9maW5kIG5leHQgcHJpbWUgKHdoZXJlIHNbcF09PTApXG4gIH1cbiAgYW5zPW5ldyBBcnJheShwKTtcbiAgZm9yKGk9MDtpPHA7aSsrKVxuICAgIGFuc1tpXT1zW2ldO1xuICByZXR1cm4gYW5zO1xufVxuXG5cbi8vZG9lcyBhIHNpbmdsZSByb3VuZCBvZiBNaWxsZXItUmFiaW4gYmFzZSBiIGNvbnNpZGVyIHggdG8gYmUgYSBwb3NzaWJsZSBwcmltZT9cbi8veCBpcyBhIGJpZ0ludCwgYW5kIGIgaXMgYW4gaW50ZWdlciwgd2l0aCBiPHhcbmZ1bmN0aW9uIG1pbGxlclJhYmluSW50KHgsYikge1xuICBpZiAobXJfeDEubGVuZ3RoIT14Lmxlbmd0aCkge1xuICAgIG1yX3gxPWR1cCh4KTtcbiAgICBtcl9yPWR1cCh4KTtcbiAgICBtcl9hPWR1cCh4KTtcbiAgfVxuXG4gIGNvcHlJbnRfKG1yX2EsYik7XG4gIHJldHVybiBtaWxsZXJSYWJpbih4LG1yX2EpO1xufVxuXG4vL2RvZXMgYSBzaW5nbGUgcm91bmQgb2YgTWlsbGVyLVJhYmluIGJhc2UgYiBjb25zaWRlciB4IHRvIGJlIGEgcG9zc2libGUgcHJpbWU/XG4vL3ggYW5kIGIgYXJlIGJpZ0ludHMgd2l0aCBiPHhcbmZ1bmN0aW9uIG1pbGxlclJhYmluKHgsYikge1xuICB2YXIgaSxqLGsscztcblxuICBpZiAobXJfeDEubGVuZ3RoIT14Lmxlbmd0aCkge1xuICAgIG1yX3gxPWR1cCh4KTtcbiAgICBtcl9yPWR1cCh4KTtcbiAgICBtcl9hPWR1cCh4KTtcbiAgfVxuXG4gIGNvcHlfKG1yX2EsYik7XG4gIGNvcHlfKG1yX3IseCk7XG4gIGNvcHlfKG1yX3gxLHgpO1xuXG4gIGFkZEludF8obXJfciwtMSk7XG4gIGFkZEludF8obXJfeDEsLTEpO1xuXG4gIC8vcz10aGUgaGlnaGVzdCBwb3dlciBvZiB0d28gdGhhdCBkaXZpZGVzIG1yX3JcbiAgaz0wO1xuICBmb3IgKGk9MDtpPG1yX3IubGVuZ3RoO2krKylcbiAgICBmb3IgKGo9MTtqPG1hc2s7ajw8PTEpXG4gICAgICBpZiAoeFtpXSAmIGopIHtcbiAgICAgICAgcz0oazxtcl9yLmxlbmd0aCticGUgPyBrIDogMCk7XG4gICAgICAgICBpPW1yX3IubGVuZ3RoO1xuICAgICAgICAgaj1tYXNrO1xuICAgICAgfSBlbHNlXG4gICAgICAgIGsrKztcblxuICBpZiAocylcbiAgICByaWdodFNoaWZ0Xyhtcl9yLHMpO1xuXG4gIHBvd01vZF8obXJfYSxtcl9yLHgpO1xuXG4gIGlmICghZXF1YWxzSW50KG1yX2EsMSkgJiYgIWVxdWFscyhtcl9hLG1yX3gxKSkge1xuICAgIGo9MTtcbiAgICB3aGlsZSAoajw9cy0xICYmICFlcXVhbHMobXJfYSxtcl94MSkpIHtcbiAgICAgIHNxdWFyZU1vZF8obXJfYSx4KTtcbiAgICAgIGlmIChlcXVhbHNJbnQobXJfYSwxKSkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH1cbiAgICAgIGorKztcbiAgICB9XG4gICAgaWYgKCFlcXVhbHMobXJfYSxtcl94MSkpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgfVxuICByZXR1cm4gMTtcbn1cblxuLy9yZXR1cm5zIGhvdyBtYW55IGJpdHMgbG9uZyB0aGUgYmlnSW50IGlzLCBub3QgY291bnRpbmcgbGVhZGluZyB6ZXJvcy5cbmZ1bmN0aW9uIGJpdFNpemUoeCkge1xuICB2YXIgaix6LHc7XG4gIGZvciAoaj14Lmxlbmd0aC0xOyAoeFtqXT09MCkgJiYgKGo+MCk7IGotLSk7XG4gIGZvciAoej0wLHc9eFtqXTsgdzsgKHc+Pj0xKSx6KyspO1xuICB6Kz1icGUqajtcbiAgcmV0dXJuIHo7XG59XG5cbi8vcmV0dXJuIGEgY29weSBvZiB4IHdpdGggYXQgbGVhc3QgbiBlbGVtZW50cywgYWRkaW5nIGxlYWRpbmcgemVyb3MgaWYgbmVlZGVkXG5mdW5jdGlvbiBleHBhbmQoeCxuKSB7XG4gIHZhciBhbnM9aW50MmJpZ0ludCgwLCh4Lmxlbmd0aD5uID8geC5sZW5ndGggOiBuKSpicGUsMCk7XG4gIGNvcHlfKGFucyx4KTtcbiAgcmV0dXJuIGFucztcbn1cblxuLy9yZXR1cm4gYSBrLWJpdCB0cnVlIHJhbmRvbSBwcmltZSB1c2luZyBNYXVyZXIncyBhbGdvcml0aG0uXG5mdW5jdGlvbiByYW5kVHJ1ZVByaW1lKGspIHtcbiAgdmFyIGFucz1pbnQyYmlnSW50KDAsaywwKTtcbiAgcmFuZFRydWVQcmltZV8oYW5zLGspO1xuICByZXR1cm4gdHJpbShhbnMsMSk7XG59XG5cbi8vcmV0dXJuIGEgay1iaXQgcmFuZG9tIHByb2JhYmxlIHByaW1lIHdpdGggcHJvYmFiaWxpdHkgb2YgZXJyb3IgPCAyXi04MFxuZnVuY3Rpb24gcmFuZFByb2JQcmltZShrKSB7XG4gIGlmIChrPj02MDApIHJldHVybiByYW5kUHJvYlByaW1lUm91bmRzKGssMik7IC8vbnVtYmVycyBmcm9tIEhBQyB0YWJsZSA0LjNcbiAgaWYgKGs+PTU1MCkgcmV0dXJuIHJhbmRQcm9iUHJpbWVSb3VuZHMoayw0KTtcbiAgaWYgKGs+PTUwMCkgcmV0dXJuIHJhbmRQcm9iUHJpbWVSb3VuZHMoayw1KTtcbiAgaWYgKGs+PTQwMCkgcmV0dXJuIHJhbmRQcm9iUHJpbWVSb3VuZHMoayw2KTtcbiAgaWYgKGs+PTM1MCkgcmV0dXJuIHJhbmRQcm9iUHJpbWVSb3VuZHMoayw3KTtcbiAgaWYgKGs+PTMwMCkgcmV0dXJuIHJhbmRQcm9iUHJpbWVSb3VuZHMoayw5KTtcbiAgaWYgKGs+PTI1MCkgcmV0dXJuIHJhbmRQcm9iUHJpbWVSb3VuZHMoaywxMik7IC8vbnVtYmVycyBmcm9tIEhBQyB0YWJsZSA0LjRcbiAgaWYgKGs+PTIwMCkgcmV0dXJuIHJhbmRQcm9iUHJpbWVSb3VuZHMoaywxNSk7XG4gIGlmIChrPj0xNTApIHJldHVybiByYW5kUHJvYlByaW1lUm91bmRzKGssMTgpO1xuICBpZiAoaz49MTAwKSByZXR1cm4gcmFuZFByb2JQcmltZVJvdW5kcyhrLDI3KTtcbiAgICAgICAgICAgICAgcmV0dXJuIHJhbmRQcm9iUHJpbWVSb3VuZHMoayw0MCk7IC8vbnVtYmVyIGZyb20gSEFDIHJlbWFyayA0LjI2IChvbmx5IGFuIGVzdGltYXRlKVxufVxuXG4vL3JldHVybiBhIGstYml0IHByb2JhYmxlIHJhbmRvbSBwcmltZSB1c2luZyBuIHJvdW5kcyBvZiBNaWxsZXIgUmFiaW4gKGFmdGVyIHRyaWFsIGRpdmlzaW9uIHdpdGggc21hbGwgcHJpbWVzKVxuZnVuY3Rpb24gcmFuZFByb2JQcmltZVJvdW5kcyhrLG4pIHtcbiAgdmFyIGFucywgaSwgZGl2aXNpYmxlLCBCO1xuICBCPTMwMDAwOyAgLy9CIGlzIGxhcmdlc3QgcHJpbWUgdG8gdXNlIGluIHRyaWFsIGRpdmlzaW9uXG4gIGFucz1pbnQyYmlnSW50KDAsaywwKTtcblxuICAvL29wdGltaXphdGlvbjogdHJ5IGxhcmdlciBhbmQgc21hbGxlciBCIHRvIGZpbmQgdGhlIGJlc3QgbGltaXQuXG5cbiAgaWYgKHByaW1lcy5sZW5ndGg9PTApXG4gICAgcHJpbWVzPWZpbmRQcmltZXMoMzAwMDApOyAgLy9jaGVjayBmb3IgZGl2aXNpYmlsaXR5IGJ5IHByaW1lcyA8PTMwMDAwXG5cbiAgaWYgKHJwcHJiLmxlbmd0aCE9YW5zLmxlbmd0aClcbiAgICBycHByYj1kdXAoYW5zKTtcblxuICBmb3IgKDs7KSB7IC8va2VlcCB0cnlpbmcgcmFuZG9tIHZhbHVlcyBmb3IgYW5zIHVudGlsIG9uZSBhcHBlYXJzIHRvIGJlIHByaW1lXG4gICAgLy9vcHRpbWl6YXRpb246IHBpY2sgYSByYW5kb20gbnVtYmVyIHRpbWVzIEw9MiozKjUqLi4uKnAsIHBsdXMgYVxuICAgIC8vICAgcmFuZG9tIGVsZW1lbnQgb2YgdGhlIGxpc3Qgb2YgYWxsIG51bWJlcnMgaW4gWzAsTCkgbm90IGRpdmlzaWJsZSBieSBhbnkgcHJpbWUgdXAgdG8gcC5cbiAgICAvLyAgIFRoaXMgY2FuIHJlZHVjZSB0aGUgYW1vdW50IG9mIHJhbmRvbSBudW1iZXIgZ2VuZXJhdGlvbi5cblxuICAgIHJhbmRCaWdJbnRfKGFucyxrLDApOyAvL2FucyA9IGEgcmFuZG9tIG9kZCBudW1iZXIgdG8gY2hlY2tcbiAgICBhbnNbMF0gfD0gMTtcbiAgICBkaXZpc2libGU9MDtcblxuICAgIC8vY2hlY2sgYW5zIGZvciBkaXZpc2liaWxpdHkgYnkgc21hbGwgcHJpbWVzIHVwIHRvIEJcbiAgICBmb3IgKGk9MDsgKGk8cHJpbWVzLmxlbmd0aCkgJiYgKHByaW1lc1tpXTw9Qik7IGkrKylcbiAgICAgIGlmIChtb2RJbnQoYW5zLHByaW1lc1tpXSk9PTAgJiYgIWVxdWFsc0ludChhbnMscHJpbWVzW2ldKSkge1xuICAgICAgICBkaXZpc2libGU9MTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAvL29wdGltaXphdGlvbjogY2hhbmdlIG1pbGxlclJhYmluIHNvIHRoZSBiYXNlIGNhbiBiZSBiaWdnZXIgdGhhbiB0aGUgbnVtYmVyIGJlaW5nIGNoZWNrZWQsIHRoZW4gZWxpbWluYXRlIHRoZSB3aGlsZSBoZXJlLlxuXG4gICAgLy9kbyBuIHJvdW5kcyBvZiBNaWxsZXIgUmFiaW4sIHdpdGggcmFuZG9tIGJhc2VzIGxlc3MgdGhhbiBhbnNcbiAgICBmb3IgKGk9MDsgaTxuICYmICFkaXZpc2libGU7IGkrKykge1xuICAgICAgcmFuZEJpZ0ludF8ocnBwcmIsaywwKTtcbiAgICAgIHdoaWxlKCFncmVhdGVyKGFucyxycHByYikpIC8vcGljayBhIHJhbmRvbSBycHByYiB0aGF0J3MgPCBhbnNcbiAgICAgICAgcmFuZEJpZ0ludF8ocnBwcmIsaywwKTtcbiAgICAgIGlmICghbWlsbGVyUmFiaW4oYW5zLHJwcHJiKSlcbiAgICAgICAgZGl2aXNpYmxlPTE7XG4gICAgfVxuXG4gICAgaWYoIWRpdmlzaWJsZSlcbiAgICAgIHJldHVybiBhbnM7XG4gIH1cbn1cblxuLy9yZXR1cm4gYSBuZXcgYmlnSW50IGVxdWFsIHRvICh4IG1vZCBuKSBmb3IgYmlnSW50cyB4IGFuZCBuLlxuZnVuY3Rpb24gbW9kKHgsbikge1xuICB2YXIgYW5zPWR1cCh4KTtcbiAgbW9kXyhhbnMsbik7XG4gIHJldHVybiB0cmltKGFucywxKTtcbn1cblxuLy9yZXR1cm4gKHgrbikgd2hlcmUgeCBpcyBhIGJpZ0ludCBhbmQgbiBpcyBhbiBpbnRlZ2VyLlxuZnVuY3Rpb24gYWRkSW50KHgsbikge1xuICB2YXIgYW5zPWV4cGFuZCh4LHgubGVuZ3RoKzEpO1xuICBhZGRJbnRfKGFucyxuKTtcbiAgcmV0dXJuIHRyaW0oYW5zLDEpO1xufVxuXG4vL3JldHVybiB4KnkgZm9yIGJpZ0ludHMgeCBhbmQgeS4gVGhpcyBpcyBmYXN0ZXIgd2hlbiB5PHguXG5mdW5jdGlvbiBtdWx0KHgseSkge1xuICB2YXIgYW5zPWV4cGFuZCh4LHgubGVuZ3RoK3kubGVuZ3RoKTtcbiAgbXVsdF8oYW5zLHkpO1xuICByZXR1cm4gdHJpbShhbnMsMSk7XG59XG5cbi8vcmV0dXJuICh4Kip5IG1vZCBuKSB3aGVyZSB4LHksbiBhcmUgYmlnSW50cyBhbmQgKiogaXMgZXhwb25lbnRpYXRpb24uICAwKiowPTEuIEZhc3RlciBmb3Igb2RkIG4uXG5mdW5jdGlvbiBwb3dNb2QoeCx5LG4pIHtcbiAgdmFyIGFucz1leHBhbmQoeCxuLmxlbmd0aCk7XG4gIHBvd01vZF8oYW5zLHRyaW0oeSwyKSx0cmltKG4sMiksMCk7ICAvL3RoaXMgc2hvdWxkIHdvcmsgd2l0aG91dCB0aGUgdHJpbSwgYnV0IGRvZXNuJ3RcbiAgcmV0dXJuIHRyaW0oYW5zLDEpO1xufVxuXG4vL3JldHVybiAoeC15KSBmb3IgYmlnSW50cyB4IGFuZCB5LiAgTmVnYXRpdmUgYW5zd2VycyB3aWxsIGJlIDJzIGNvbXBsZW1lbnRcbmZ1bmN0aW9uIHN1Yih4LHkpIHtcbiAgdmFyIGFucz1leHBhbmQoeCwoeC5sZW5ndGg+eS5sZW5ndGggPyB4Lmxlbmd0aCsxIDogeS5sZW5ndGgrMSkpO1xuICBzdWJfKGFucyx5KTtcbiAgcmV0dXJuIHRyaW0oYW5zLDEpO1xufVxuXG4vL3JldHVybiAoeCt5KSBmb3IgYmlnSW50cyB4IGFuZCB5LlxuZnVuY3Rpb24gYWRkKHgseSkge1xuICB2YXIgYW5zPWV4cGFuZCh4LCh4Lmxlbmd0aD55Lmxlbmd0aCA/IHgubGVuZ3RoKzEgOiB5Lmxlbmd0aCsxKSk7XG4gIGFkZF8oYW5zLHkpO1xuICByZXR1cm4gdHJpbShhbnMsMSk7XG59XG5cbi8vcmV0dXJuICh4KiooLTEpIG1vZCBuKSBmb3IgYmlnSW50cyB4IGFuZCBuLiAgSWYgbm8gaW52ZXJzZSBleGlzdHMsIGl0IHJldHVybnMgbnVsbFxuZnVuY3Rpb24gaW52ZXJzZU1vZCh4LG4pIHtcbiAgdmFyIGFucz1leHBhbmQoeCxuLmxlbmd0aCk7XG4gIHZhciBzO1xuICBzPWludmVyc2VNb2RfKGFucyxuKTtcbiAgcmV0dXJuIHMgPyB0cmltKGFucywxKSA6IG51bGw7XG59XG5cbi8vcmV0dXJuICh4KnkgbW9kIG4pIGZvciBiaWdJbnRzIHgseSxuLiAgRm9yIGdyZWF0ZXIgc3BlZWQsIGxldCB5PHguXG5mdW5jdGlvbiBtdWx0TW9kKHgseSxuKSB7XG4gIHZhciBhbnM9ZXhwYW5kKHgsbi5sZW5ndGgpO1xuICBtdWx0TW9kXyhhbnMseSxuKTtcbiAgcmV0dXJuIHRyaW0oYW5zLDEpO1xufVxuXG4vL2dlbmVyYXRlIGEgay1iaXQgdHJ1ZSByYW5kb20gcHJpbWUgdXNpbmcgTWF1cmVyJ3MgYWxnb3JpdGhtLFxuLy9hbmQgcHV0IGl0IGludG8gYW5zLiAgVGhlIGJpZ0ludCBhbnMgbXVzdCBiZSBsYXJnZSBlbm91Z2ggdG8gaG9sZCBpdC5cbmZ1bmN0aW9uIHJhbmRUcnVlUHJpbWVfKGFucyxrKSB7XG4gIHZhciBjLG0scG0sZGQsaixyLEIsZGl2aXNpYmxlLHosenoscmVjU2l6ZTtcblxuICBpZiAocHJpbWVzLmxlbmd0aD09MClcbiAgICBwcmltZXM9ZmluZFByaW1lcygzMDAwMCk7ICAvL2NoZWNrIGZvciBkaXZpc2liaWxpdHkgYnkgcHJpbWVzIDw9MzAwMDBcblxuICBpZiAocG93cy5sZW5ndGg9PTApIHtcbiAgICBwb3dzPW5ldyBBcnJheSg1MTIpO1xuICAgIGZvciAoaj0wO2o8NTEyO2orKykge1xuICAgICAgcG93c1tqXT1NYXRoLnBvdygyLGovNTExLi0xLik7XG4gICAgfVxuICB9XG5cbiAgLy9jIGFuZCBtIHNob3VsZCBiZSB0dW5lZCBmb3IgYSBwYXJ0aWN1bGFyIG1hY2hpbmUgYW5kIHZhbHVlIG9mIGssIHRvIG1heGltaXplIHNwZWVkXG4gIGM9MC4xOyAgLy9jPTAuMSBpbiBIQUNcbiAgbT0yMDsgICAvL2dlbmVyYXRlIHRoaXMgay1iaXQgbnVtYmVyIGJ5IGZpcnN0IHJlY3Vyc2l2ZWx5IGdlbmVyYXRpbmcgYSBudW1iZXIgdGhhdCBoYXMgYmV0d2VlbiBrLzIgYW5kIGstbSBiaXRzXG4gIHJlY0xpbWl0PTIwOyAvL3N0b3AgcmVjdXJzaW9uIHdoZW4gayA8PXJlY0xpbWl0LiAgTXVzdCBoYXZlIHJlY0xpbWl0ID49IDJcblxuICBpZiAoc19pMi5sZW5ndGghPWFucy5sZW5ndGgpIHtcbiAgICBzX2kyPWR1cChhbnMpO1xuICAgIHNfUiA9ZHVwKGFucyk7XG4gICAgc19uMT1kdXAoYW5zKTtcbiAgICBzX3IyPWR1cChhbnMpO1xuICAgIHNfZCA9ZHVwKGFucyk7XG4gICAgc194MT1kdXAoYW5zKTtcbiAgICBzX3gyPWR1cChhbnMpO1xuICAgIHNfYiA9ZHVwKGFucyk7XG4gICAgc19uID1kdXAoYW5zKTtcbiAgICBzX2kgPWR1cChhbnMpO1xuICAgIHNfcm09ZHVwKGFucyk7XG4gICAgc19xID1kdXAoYW5zKTtcbiAgICBzX2EgPWR1cChhbnMpO1xuICAgIHNfYWE9ZHVwKGFucyk7XG4gIH1cblxuICBpZiAoayA8PSByZWNMaW1pdCkgeyAgLy9nZW5lcmF0ZSBzbWFsbCByYW5kb20gcHJpbWVzIGJ5IHRyaWFsIGRpdmlzaW9uIHVwIHRvIGl0cyBzcXVhcmUgcm9vdFxuICAgIHBtPSgxPDwoKGsrMik+PjEpKS0xOyAvL3BtIGlzIGJpbmFyeSBudW1iZXIgd2l0aCBhbGwgb25lcywganVzdCBvdmVyIHNxcnQoMl5rKVxuICAgIGNvcHlJbnRfKGFucywwKTtcbiAgICBmb3IgKGRkPTE7ZGQ7KSB7XG4gICAgICBkZD0wO1xuICAgICAgYW5zWzBdPSAxIHwgKDE8PChrLTEpKSB8IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSooMTw8aykpOyAgLy9yYW5kb20sIGstYml0LCBvZGQgaW50ZWdlciwgd2l0aCBtc2IgMVxuICAgICAgZm9yIChqPTE7KGo8cHJpbWVzLmxlbmd0aCkgJiYgKChwcmltZXNbal0mcG0pPT1wcmltZXNbal0pO2orKykgeyAvL3RyaWFsIGRpdmlzaW9uIGJ5IGFsbCBwcmltZXMgMy4uLnNxcnQoMl5rKVxuICAgICAgICBpZiAoMD09KGFuc1swXSVwcmltZXNbal0pKSB7XG4gICAgICAgICAgZGQ9MTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBjYXJyeV8oYW5zKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBCPWMqayprOyAgICAvL3RyeSBzbWFsbCBwcmltZXMgdXAgdG8gQiAob3IgYWxsIHRoZSBwcmltZXNbXSBhcnJheSBpZiB0aGUgbGFyZ2VzdCBpcyBsZXNzIHRoYW4gQikuXG4gIGlmIChrPjIqbSkgIC8vZ2VuZXJhdGUgdGhpcyBrLWJpdCBudW1iZXIgYnkgZmlyc3QgcmVjdXJzaXZlbHkgZ2VuZXJhdGluZyBhIG51bWJlciB0aGF0IGhhcyBiZXR3ZWVuIGsvMiBhbmQgay1tIGJpdHNcbiAgICBmb3IgKHI9MTsgay1rKnI8PW07IClcbiAgICAgIHI9cG93c1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqNTEyKV07ICAgLy9yPU1hdGgucG93KDIsTWF0aC5yYW5kb20oKS0xKTtcbiAgZWxzZVxuICAgIHI9LjU7XG5cbiAgLy9zaW11bGF0aW9uIHN1Z2dlc3RzIHRoZSBtb3JlIGNvbXBsZXggYWxnb3JpdGhtIHVzaW5nIHI9LjMzMyBpcyBvbmx5IHNsaWdodGx5IGZhc3Rlci5cblxuICByZWNTaXplPU1hdGguZmxvb3IociprKSsxO1xuXG4gIHJhbmRUcnVlUHJpbWVfKHNfcSxyZWNTaXplKTtcbiAgY29weUludF8oc19pMiwwKTtcbiAgc19pMltNYXRoLmZsb29yKChrLTIpL2JwZSldIHw9ICgxPDwoKGstMiklYnBlKSk7ICAgLy9zX2kyPTJeKGstMilcbiAgZGl2aWRlXyhzX2kyLHNfcSxzX2ksc19ybSk7ICAgICAgICAgICAgICAgICAgICAgICAgLy9zX2k9Zmxvb3IoKDJeKGstMSkpLygycSkpXG5cbiAgej1iaXRTaXplKHNfaSk7XG5cbiAgZm9yICg7Oykge1xuICAgIGZvciAoOzspIHsgIC8vZ2VuZXJhdGUgei1iaXQgbnVtYmVycyB1bnRpbCBvbmUgZmFsbHMgaW4gdGhlIHJhbmdlIFswLHNfaS0xXVxuICAgICAgcmFuZEJpZ0ludF8oc19SLHosMCk7XG4gICAgICBpZiAoZ3JlYXRlcihzX2ksc19SKSlcbiAgICAgICAgYnJlYWs7XG4gICAgfSAgICAgICAgICAgICAgICAvL25vdyBzX1IgaXMgaW4gdGhlIHJhbmdlIFswLHNfaS0xXVxuICAgIGFkZEludF8oc19SLDEpOyAgLy9ub3cgc19SIGlzIGluIHRoZSByYW5nZSBbMSxzX2ldXG4gICAgYWRkXyhzX1Isc19pKTsgICAvL25vdyBzX1IgaXMgaW4gdGhlIHJhbmdlIFtzX2krMSwyKnNfaV1cblxuICAgIGNvcHlfKHNfbixzX3EpO1xuICAgIG11bHRfKHNfbixzX1IpO1xuICAgIG11bHRJbnRfKHNfbiwyKTtcbiAgICBhZGRJbnRfKHNfbiwxKTsgICAgLy9zX249MipzX1Iqc19xKzFcblxuICAgIGNvcHlfKHNfcjIsc19SKTtcbiAgICBtdWx0SW50XyhzX3IyLDIpOyAgLy9zX3IyPTIqc19SXG5cbiAgICAvL2NoZWNrIHNfbiBmb3IgZGl2aXNpYmlsaXR5IGJ5IHNtYWxsIHByaW1lcyB1cCB0byBCXG4gICAgZm9yIChkaXZpc2libGU9MCxqPTA7IChqPHByaW1lcy5sZW5ndGgpICYmIChwcmltZXNbal08Qik7IGorKylcbiAgICAgIGlmIChtb2RJbnQoc19uLHByaW1lc1tqXSk9PTAgJiYgIWVxdWFsc0ludChzX24scHJpbWVzW2pdKSkge1xuICAgICAgICBkaXZpc2libGU9MTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICBpZiAoIWRpdmlzaWJsZSkgICAgLy9pZiBpdCBwYXNzZXMgc21hbGwgcHJpbWVzIGNoZWNrLCB0aGVuIHRyeSBhIHNpbmdsZSBNaWxsZXItUmFiaW4gYmFzZSAyXG4gICAgICBpZiAoIW1pbGxlclJhYmluSW50KHNfbiwyKSkgLy90aGlzIGxpbmUgcmVwcmVzZW50cyA3NSUgb2YgdGhlIHRvdGFsIHJ1bnRpbWUgZm9yIHJhbmRUcnVlUHJpbWVfXG4gICAgICAgIGRpdmlzaWJsZT0xO1xuXG4gICAgaWYgKCFkaXZpc2libGUpIHsgIC8vaWYgaXQgcGFzc2VzIHRoYXQgdGVzdCwgY29udGludWUgY2hlY2tpbmcgc19uXG4gICAgICBhZGRJbnRfKHNfbiwtMyk7XG4gICAgICBmb3IgKGo9c19uLmxlbmd0aC0xOyhzX25bal09PTApICYmIChqPjApOyBqLS0pOyAgLy9zdHJpcCBsZWFkaW5nIHplcm9zXG4gICAgICBmb3IgKHp6PTAsdz1zX25bal07IHc7ICh3Pj49MSksenorKyk7XG4gICAgICB6eis9YnBlKmo7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3p6PW51bWJlciBvZiBiaXRzIGluIHNfbiwgaWdub3JpbmcgbGVhZGluZyB6ZXJvc1xuICAgICAgZm9yICg7OykgeyAgLy9nZW5lcmF0ZSB6LWJpdCBudW1iZXJzIHVudGlsIG9uZSBmYWxscyBpbiB0aGUgcmFuZ2UgWzAsc19uLTFdXG4gICAgICAgIHJhbmRCaWdJbnRfKHNfYSx6eiwwKTtcbiAgICAgICAgaWYgKGdyZWF0ZXIoc19uLHNfYSkpXG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9ICAgICAgICAgICAgICAgIC8vbm93IHNfYSBpcyBpbiB0aGUgcmFuZ2UgWzAsc19uLTFdXG4gICAgICBhZGRJbnRfKHNfbiwzKTsgIC8vbm93IHNfYSBpcyBpbiB0aGUgcmFuZ2UgWzAsc19uLTRdXG4gICAgICBhZGRJbnRfKHNfYSwyKTsgIC8vbm93IHNfYSBpcyBpbiB0aGUgcmFuZ2UgWzIsc19uLTJdXG4gICAgICBjb3B5XyhzX2Isc19hKTtcbiAgICAgIGNvcHlfKHNfbjEsc19uKTtcbiAgICAgIGFkZEludF8oc19uMSwtMSk7XG4gICAgICBwb3dNb2RfKHNfYixzX24xLHNfbik7ICAgLy9zX2I9c19hXihzX24tMSkgbW9kdWxvIHNfblxuICAgICAgYWRkSW50XyhzX2IsLTEpO1xuICAgICAgaWYgKGlzWmVybyhzX2IpKSB7XG4gICAgICAgIGNvcHlfKHNfYixzX2EpO1xuICAgICAgICBwb3dNb2RfKHNfYixzX3IyLHNfbik7XG4gICAgICAgIGFkZEludF8oc19iLC0xKTtcbiAgICAgICAgY29weV8oc19hYSxzX24pO1xuICAgICAgICBjb3B5XyhzX2Qsc19iKTtcbiAgICAgICAgR0NEXyhzX2Qsc19uKTsgIC8vaWYgc19iIGFuZCBzX24gYXJlIHJlbGF0aXZlbHkgcHJpbWUsIHRoZW4gc19uIGlzIGEgcHJpbWVcbiAgICAgICAgaWYgKGVxdWFsc0ludChzX2QsMSkpIHtcbiAgICAgICAgICBjb3B5XyhhbnMsc19hYSk7XG4gICAgICAgICAgcmV0dXJuOyAgICAgLy9pZiB3ZSd2ZSBtYWRlIGl0IHRoaXMgZmFyLCB0aGVuIHNfbiBpcyBhYnNvbHV0ZWx5IGd1YXJhbnRlZWQgdG8gYmUgcHJpbWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vL1JldHVybiBhbiBuLWJpdCByYW5kb20gQmlnSW50IChuPj0xKS4gIElmIHM9MSwgdGhlbiB0aGUgbW9zdCBzaWduaWZpY2FudCBvZiB0aG9zZSBuIGJpdHMgaXMgc2V0IHRvIDEuXG5mdW5jdGlvbiByYW5kQmlnSW50KG4scykge1xuICB2YXIgYSxiO1xuICBhPU1hdGguZmxvb3IoKG4tMSkvYnBlKSsyOyAvLyMgYXJyYXkgZWxlbWVudHMgdG8gaG9sZCB0aGUgQmlnSW50IHdpdGggYSBsZWFkaW5nIDAgZWxlbWVudFxuICBiPWludDJiaWdJbnQoMCwwLGEpO1xuICByYW5kQmlnSW50XyhiLG4scyk7XG4gIHJldHVybiBiO1xufVxuXG4vL1NldCBiIHRvIGFuIG4tYml0IHJhbmRvbSBCaWdJbnQuICBJZiBzPTEsIHRoZW4gdGhlIG1vc3Qgc2lnbmlmaWNhbnQgb2YgdGhvc2UgbiBiaXRzIGlzIHNldCB0byAxLlxuLy9BcnJheSBiIG11c3QgYmUgYmlnIGVub3VnaCB0byBob2xkIHRoZSByZXN1bHQuIE11c3QgaGF2ZSBuPj0xXG5mdW5jdGlvbiByYW5kQmlnSW50XyhiLG4scykge1xuICB2YXIgaSxhO1xuICBmb3IgKGk9MDtpPGIubGVuZ3RoO2krKylcbiAgICBiW2ldPTA7XG4gIGE9TWF0aC5mbG9vcigobi0xKS9icGUpKzE7IC8vIyBhcnJheSBlbGVtZW50cyB0byBob2xkIHRoZSBCaWdJbnRcbiAgZm9yIChpPTA7aTxhO2krKykge1xuICAgIGJbaV09TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKigxPDwoYnBlLTEpKSk7XG4gIH1cbiAgYlthLTFdICY9ICgyPDwoKG4tMSklYnBlKSktMTtcbiAgaWYgKHM9PTEpXG4gICAgYlthLTFdIHw9ICgxPDwoKG4tMSklYnBlKSk7XG59XG5cbi8vUmV0dXJuIHRoZSBncmVhdGVzdCBjb21tb24gZGl2aXNvciBvZiBiaWdJbnRzIHggYW5kIHkgKGVhY2ggd2l0aCBzYW1lIG51bWJlciBvZiBlbGVtZW50cykuXG5mdW5jdGlvbiBHQ0QoeCx5KSB7XG4gIHZhciB4Yyx5YztcbiAgeGM9ZHVwKHgpO1xuICB5Yz1kdXAoeSk7XG4gIEdDRF8oeGMseWMpO1xuICByZXR1cm4geGM7XG59XG5cbi8vc2V0IHggdG8gdGhlIGdyZWF0ZXN0IGNvbW1vbiBkaXZpc29yIG9mIGJpZ0ludHMgeCBhbmQgeSAoZWFjaCB3aXRoIHNhbWUgbnVtYmVyIG9mIGVsZW1lbnRzKS5cbi8veSBpcyBkZXN0cm95ZWQuXG5mdW5jdGlvbiBHQ0RfKHgseSkge1xuICB2YXIgaSx4cCx5cCxBLEIsQyxELHEsc2luZztcbiAgaWYgKFQubGVuZ3RoIT14Lmxlbmd0aClcbiAgICBUPWR1cCh4KTtcblxuICBzaW5nPTE7XG4gIHdoaWxlIChzaW5nKSB7IC8vd2hpbGUgeSBoYXMgbm9uemVybyBlbGVtZW50cyBvdGhlciB0aGFuIHlbMF1cbiAgICBzaW5nPTA7XG4gICAgZm9yIChpPTE7aTx5Lmxlbmd0aDtpKyspIC8vY2hlY2sgaWYgeSBoYXMgbm9uemVybyBlbGVtZW50cyBvdGhlciB0aGFuIDBcbiAgICAgIGlmICh5W2ldKSB7XG4gICAgICAgIHNpbmc9MTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgaWYgKCFzaW5nKSBicmVhazsgLy9xdWl0IHdoZW4geSBhbGwgemVybyBlbGVtZW50cyBleGNlcHQgcG9zc2libHkgeVswXVxuXG4gICAgZm9yIChpPXgubGVuZ3RoOyF4W2ldICYmIGk+PTA7aS0tKTsgIC8vZmluZCBtb3N0IHNpZ25pZmljYW50IGVsZW1lbnQgb2YgeFxuICAgIHhwPXhbaV07XG4gICAgeXA9eVtpXTtcbiAgICBBPTE7IEI9MDsgQz0wOyBEPTE7XG4gICAgd2hpbGUgKCh5cCtDKSAmJiAoeXArRCkpIHtcbiAgICAgIHEgPU1hdGguZmxvb3IoKHhwK0EpLyh5cCtDKSk7XG4gICAgICBxcD1NYXRoLmZsb29yKCh4cCtCKS8oeXArRCkpO1xuICAgICAgaWYgKHEhPXFwKVxuICAgICAgICBicmVhaztcbiAgICAgIHQ9IEEtcSpDOyAgIEE9QzsgICBDPXQ7ICAgIC8vICBkbyAoQSxCLHhwLCBDLEQseXApID0gKEMsRCx5cCwgQSxCLHhwKSAtIHEqKDAsMCwwLCBDLEQseXApXG4gICAgICB0PSBCLXEqRDsgICBCPUQ7ICAgRD10O1xuICAgICAgdD14cC1xKnlwOyB4cD15cDsgeXA9dDtcbiAgICB9XG4gICAgaWYgKEIpIHtcbiAgICAgIGNvcHlfKFQseCk7XG4gICAgICBsaW5Db21iXyh4LHksQSxCKTsgLy94PUEqeCtCKnlcbiAgICAgIGxpbkNvbWJfKHksVCxELEMpOyAvL3k9RCp5K0MqVFxuICAgIH0gZWxzZSB7XG4gICAgICBtb2RfKHgseSk7XG4gICAgICBjb3B5XyhULHgpO1xuICAgICAgY29weV8oeCx5KTtcbiAgICAgIGNvcHlfKHksVCk7XG4gICAgfVxuICB9XG4gIGlmICh5WzBdPT0wKVxuICAgIHJldHVybjtcbiAgdD1tb2RJbnQoeCx5WzBdKTtcbiAgY29weUludF8oeCx5WzBdKTtcbiAgeVswXT10O1xuICB3aGlsZSAoeVswXSkge1xuICAgIHhbMF0lPXlbMF07XG4gICAgdD14WzBdOyB4WzBdPXlbMF07IHlbMF09dDtcbiAgfVxufVxuXG4vL2RvIHg9eCoqKC0xKSBtb2QgbiwgZm9yIGJpZ0ludHMgeCBhbmQgbi5cbi8vSWYgbm8gaW52ZXJzZSBleGlzdHMsIGl0IHNldHMgeCB0byB6ZXJvIGFuZCByZXR1cm5zIDAsIGVsc2UgaXQgcmV0dXJucyAxLlxuLy9UaGUgeCBhcnJheSBtdXN0IGJlIGF0IGxlYXN0IGFzIGxhcmdlIGFzIHRoZSBuIGFycmF5LlxuZnVuY3Rpb24gaW52ZXJzZU1vZF8oeCxuKSB7XG4gIHZhciBrPTErMipNYXRoLm1heCh4Lmxlbmd0aCxuLmxlbmd0aCk7XG5cbiAgaWYoISh4WzBdJjEpICAmJiAhKG5bMF0mMSkpIHsgIC8vaWYgYm90aCBpbnB1dHMgYXJlIGV2ZW4sIHRoZW4gaW52ZXJzZSBkb2Vzbid0IGV4aXN0XG4gICAgY29weUludF8oeCwwKTtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIGlmIChlZ191Lmxlbmd0aCE9aykge1xuICAgIGVnX3U9bmV3IEFycmF5KGspO1xuICAgIGVnX3Y9bmV3IEFycmF5KGspO1xuICAgIGVnX0E9bmV3IEFycmF5KGspO1xuICAgIGVnX0I9bmV3IEFycmF5KGspO1xuICAgIGVnX0M9bmV3IEFycmF5KGspO1xuICAgIGVnX0Q9bmV3IEFycmF5KGspO1xuICB9XG5cbiAgY29weV8oZWdfdSx4KTtcbiAgY29weV8oZWdfdixuKTtcbiAgY29weUludF8oZWdfQSwxKTtcbiAgY29weUludF8oZWdfQiwwKTtcbiAgY29weUludF8oZWdfQywwKTtcbiAgY29weUludF8oZWdfRCwxKTtcbiAgZm9yICg7Oykge1xuICAgIHdoaWxlKCEoZWdfdVswXSYxKSkgeyAgLy93aGlsZSBlZ191IGlzIGV2ZW5cbiAgICAgIGhhbHZlXyhlZ191KTtcbiAgICAgIGlmICghKGVnX0FbMF0mMSkgJiYgIShlZ19CWzBdJjEpKSB7IC8vaWYgZWdfQT09ZWdfQj09MCBtb2QgMlxuICAgICAgICBoYWx2ZV8oZWdfQSk7XG4gICAgICAgIGhhbHZlXyhlZ19CKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFkZF8oZWdfQSxuKTsgIGhhbHZlXyhlZ19BKTtcbiAgICAgICAgc3ViXyhlZ19CLHgpOyAgaGFsdmVfKGVnX0IpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHdoaWxlICghKGVnX3ZbMF0mMSkpIHsgIC8vd2hpbGUgZWdfdiBpcyBldmVuXG4gICAgICBoYWx2ZV8oZWdfdik7XG4gICAgICBpZiAoIShlZ19DWzBdJjEpICYmICEoZWdfRFswXSYxKSkgeyAvL2lmIGVnX0M9PWVnX0Q9PTAgbW9kIDJcbiAgICAgICAgaGFsdmVfKGVnX0MpO1xuICAgICAgICBoYWx2ZV8oZWdfRCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhZGRfKGVnX0Msbik7ICBoYWx2ZV8oZWdfQyk7XG4gICAgICAgIHN1Yl8oZWdfRCx4KTsgIGhhbHZlXyhlZ19EKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWdyZWF0ZXIoZWdfdixlZ191KSkgeyAvL2VnX3YgPD0gZWdfdVxuICAgICAgc3ViXyhlZ191LGVnX3YpO1xuICAgICAgc3ViXyhlZ19BLGVnX0MpO1xuICAgICAgc3ViXyhlZ19CLGVnX0QpO1xuICAgIH0gZWxzZSB7ICAgICAgICAgICAgICAgICAgIC8vZWdfdiA+IGVnX3VcbiAgICAgIHN1Yl8oZWdfdixlZ191KTtcbiAgICAgIHN1Yl8oZWdfQyxlZ19BKTtcbiAgICAgIHN1Yl8oZWdfRCxlZ19CKTtcbiAgICB9XG5cbiAgICBpZiAoZXF1YWxzSW50KGVnX3UsMCkpIHtcbiAgICAgIGlmIChuZWdhdGl2ZShlZ19DKSkgLy9tYWtlIHN1cmUgYW5zd2VyIGlzIG5vbm5lZ2F0aXZlXG4gICAgICAgIGFkZF8oZWdfQyxuKTtcbiAgICAgIGNvcHlfKHgsZWdfQyk7XG5cbiAgICAgIGlmICghZXF1YWxzSW50KGVnX3YsMSkpIHsgLy9pZiBHQ0RfKHgsbikhPTEsIHRoZW4gdGhlcmUgaXMgbm8gaW52ZXJzZVxuICAgICAgICBjb3B5SW50Xyh4LDApO1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH1cbiAgICAgIHJldHVybiAxO1xuICAgIH1cbiAgfVxufVxuXG4vL3JldHVybiB4KiooLTEpIG1vZCBuLCBmb3IgaW50ZWdlcnMgeCBhbmQgbi4gIFJldHVybiAwIGlmIHRoZXJlIGlzIG5vIGludmVyc2VcbmZ1bmN0aW9uIGludmVyc2VNb2RJbnQoeCxuKSB7XG4gIHZhciBhPTEsYj0wLHQ7XG4gIGZvciAoOzspIHtcbiAgICBpZiAoeD09MSkgcmV0dXJuIGE7XG4gICAgaWYgKHg9PTApIHJldHVybiAwO1xuICAgIGItPWEqTWF0aC5mbG9vcihuL3gpO1xuICAgIG4lPXg7XG5cbiAgICBpZiAobj09MSkgcmV0dXJuIGI7IC8vdG8gYXZvaWQgbmVnYXRpdmVzLCBjaGFuZ2UgdGhpcyBiIHRvIG4tYiwgYW5kIGVhY2ggLT0gdG8gKz1cbiAgICBpZiAobj09MCkgcmV0dXJuIDA7XG4gICAgYS09YipNYXRoLmZsb29yKHgvbik7XG4gICAgeCU9bjtcbiAgfVxufVxuXG4vL3RoaXMgZGVwcmVjYXRlZCBmdW5jdGlvbiBpcyBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSBvbmx5LlxuZnVuY3Rpb24gaW52ZXJzZU1vZEludF8oeCxuKSB7XG4gICByZXR1cm4gaW52ZXJzZU1vZEludCh4LG4pO1xufVxuXG5cbi8vR2l2ZW4gcG9zaXRpdmUgYmlnSW50cyB4IGFuZCB5LCBjaGFuZ2UgdGhlIGJpZ2ludHMgdiwgYSwgYW5kIGIgdG8gcG9zaXRpdmUgYmlnSW50cyBzdWNoIHRoYXQ6XG4vLyAgICAgdiA9IEdDRF8oeCx5KSA9IGEqeC1iKnlcbi8vVGhlIGJpZ0ludHMgdiwgYSwgYiwgbXVzdCBoYXZlIGV4YWN0bHkgYXMgbWFueSBlbGVtZW50cyBhcyB0aGUgbGFyZ2VyIG9mIHggYW5kIHkuXG5mdW5jdGlvbiBlR0NEXyh4LHksdixhLGIpIHtcbiAgdmFyIGc9MDtcbiAgdmFyIGs9TWF0aC5tYXgoeC5sZW5ndGgseS5sZW5ndGgpO1xuICBpZiAoZWdfdS5sZW5ndGghPWspIHtcbiAgICBlZ191PW5ldyBBcnJheShrKTtcbiAgICBlZ19BPW5ldyBBcnJheShrKTtcbiAgICBlZ19CPW5ldyBBcnJheShrKTtcbiAgICBlZ19DPW5ldyBBcnJheShrKTtcbiAgICBlZ19EPW5ldyBBcnJheShrKTtcbiAgfVxuICB3aGlsZSghKHhbMF0mMSkgICYmICEoeVswXSYxKSkgeyAgLy93aGlsZSB4IGFuZCB5IGJvdGggZXZlblxuICAgIGhhbHZlXyh4KTtcbiAgICBoYWx2ZV8oeSk7XG4gICAgZysrO1xuICB9XG4gIGNvcHlfKGVnX3UseCk7XG4gIGNvcHlfKHYseSk7XG4gIGNvcHlJbnRfKGVnX0EsMSk7XG4gIGNvcHlJbnRfKGVnX0IsMCk7XG4gIGNvcHlJbnRfKGVnX0MsMCk7XG4gIGNvcHlJbnRfKGVnX0QsMSk7XG4gIGZvciAoOzspIHtcbiAgICB3aGlsZSghKGVnX3VbMF0mMSkpIHsgIC8vd2hpbGUgdSBpcyBldmVuXG4gICAgICBoYWx2ZV8oZWdfdSk7XG4gICAgICBpZiAoIShlZ19BWzBdJjEpICYmICEoZWdfQlswXSYxKSkgeyAvL2lmIEE9PUI9PTAgbW9kIDJcbiAgICAgICAgaGFsdmVfKGVnX0EpO1xuICAgICAgICBoYWx2ZV8oZWdfQik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhZGRfKGVnX0EseSk7ICBoYWx2ZV8oZWdfQSk7XG4gICAgICAgIHN1Yl8oZWdfQix4KTsgIGhhbHZlXyhlZ19CKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB3aGlsZSAoISh2WzBdJjEpKSB7ICAvL3doaWxlIHYgaXMgZXZlblxuICAgICAgaGFsdmVfKHYpO1xuICAgICAgaWYgKCEoZWdfQ1swXSYxKSAmJiAhKGVnX0RbMF0mMSkpIHsgLy9pZiBDPT1EPT0wIG1vZCAyXG4gICAgICAgIGhhbHZlXyhlZ19DKTtcbiAgICAgICAgaGFsdmVfKGVnX0QpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWRkXyhlZ19DLHkpOyAgaGFsdmVfKGVnX0MpO1xuICAgICAgICBzdWJfKGVnX0QseCk7ICBoYWx2ZV8oZWdfRCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFncmVhdGVyKHYsZWdfdSkpIHsgLy92PD11XG4gICAgICBzdWJfKGVnX3Usdik7XG4gICAgICBzdWJfKGVnX0EsZWdfQyk7XG4gICAgICBzdWJfKGVnX0IsZWdfRCk7XG4gICAgfSBlbHNlIHsgICAgICAgICAgICAgICAgLy92PnVcbiAgICAgIHN1Yl8odixlZ191KTtcbiAgICAgIHN1Yl8oZWdfQyxlZ19BKTtcbiAgICAgIHN1Yl8oZWdfRCxlZ19CKTtcbiAgICB9XG4gICAgaWYgKGVxdWFsc0ludChlZ191LDApKSB7XG4gICAgICBpZiAobmVnYXRpdmUoZWdfQykpIHsgICAvL21ha2Ugc3VyZSBhIChDKWlzIG5vbm5lZ2F0aXZlXG4gICAgICAgIGFkZF8oZWdfQyx5KTtcbiAgICAgICAgc3ViXyhlZ19ELHgpO1xuICAgICAgfVxuICAgICAgbXVsdEludF8oZWdfRCwtMSk7ICAvLy9tYWtlIHN1cmUgYiAoRCkgaXMgbm9ubmVnYXRpdmVcbiAgICAgIGNvcHlfKGEsZWdfQyk7XG4gICAgICBjb3B5XyhiLGVnX0QpO1xuICAgICAgbGVmdFNoaWZ0Xyh2LGcpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxufVxuXG5cbi8vaXMgYmlnSW50IHggbmVnYXRpdmU/XG5mdW5jdGlvbiBuZWdhdGl2ZSh4KSB7XG4gIHJldHVybiAoKHhbeC5sZW5ndGgtMV0+PihicGUtMSkpJjEpO1xufVxuXG5cbi8vaXMgKHggPDwgKHNoaWZ0KmJwZSkpID4geT9cbi8veCBhbmQgeSBhcmUgbm9ubmVnYXRpdmUgYmlnSW50c1xuLy9zaGlmdCBpcyBhIG5vbm5lZ2F0aXZlIGludGVnZXJcbmZ1bmN0aW9uIGdyZWF0ZXJTaGlmdCh4LHksc2hpZnQpIHtcbiAgdmFyIGksIGt4PXgubGVuZ3RoLCBreT15Lmxlbmd0aDtcbiAgaz0oKGt4K3NoaWZ0KTxreSkgPyAoa3grc2hpZnQpIDoga3k7XG4gIGZvciAoaT1reS0xLXNoaWZ0OyBpPGt4ICYmIGk+PTA7IGkrKylcbiAgICBpZiAoeFtpXT4wKVxuICAgICAgcmV0dXJuIDE7IC8vaWYgdGhlcmUgYXJlIG5vbnplcm9zIGluIHggdG8gdGhlIGxlZnQgb2YgdGhlIGZpcnN0IGNvbHVtbiBvZiB5LCB0aGVuIHggaXMgYmlnZ2VyXG4gIGZvciAoaT1reC0xK3NoaWZ0OyBpPGt5OyBpKyspXG4gICAgaWYgKHlbaV0+MClcbiAgICAgIHJldHVybiAwOyAvL2lmIHRoZXJlIGFyZSBub256ZXJvcyBpbiB5IHRvIHRoZSBsZWZ0IG9mIHRoZSBmaXJzdCBjb2x1bW4gb2YgeCwgdGhlbiB4IGlzIG5vdCBiaWdnZXJcbiAgZm9yIChpPWstMTsgaT49c2hpZnQ7IGktLSlcbiAgICBpZiAgICAgICh4W2ktc2hpZnRdPnlbaV0pIHJldHVybiAxO1xuICAgIGVsc2UgaWYgKHhbaS1zaGlmdF08eVtpXSkgcmV0dXJuIDA7XG4gIHJldHVybiAwO1xufVxuXG4vL2lzIHggPiB5PyAoeCBhbmQgeSBib3RoIG5vbm5lZ2F0aXZlKVxuZnVuY3Rpb24gZ3JlYXRlcih4LHkpIHtcbiAgdmFyIGk7XG4gIHZhciBrPSh4Lmxlbmd0aDx5Lmxlbmd0aCkgPyB4Lmxlbmd0aCA6IHkubGVuZ3RoO1xuXG4gIGZvciAoaT14Lmxlbmd0aDtpPHkubGVuZ3RoO2krKylcbiAgICBpZiAoeVtpXSlcbiAgICAgIHJldHVybiAwOyAgLy95IGhhcyBtb3JlIGRpZ2l0c1xuXG4gIGZvciAoaT15Lmxlbmd0aDtpPHgubGVuZ3RoO2krKylcbiAgICBpZiAoeFtpXSlcbiAgICAgIHJldHVybiAxOyAgLy94IGhhcyBtb3JlIGRpZ2l0c1xuXG4gIGZvciAoaT1rLTE7aT49MDtpLS0pXG4gICAgaWYgKHhbaV0+eVtpXSlcbiAgICAgIHJldHVybiAxO1xuICAgIGVsc2UgaWYgKHhbaV08eVtpXSlcbiAgICAgIHJldHVybiAwO1xuICByZXR1cm4gMDtcbn1cblxuLy9kaXZpZGUgeCBieSB5IGdpdmluZyBxdW90aWVudCBxIGFuZCByZW1haW5kZXIgci4gIChxPWZsb29yKHgveSksICByPXggbW9kIHkpLiAgQWxsIDQgYXJlIGJpZ2ludHMuXG4vL3ggbXVzdCBoYXZlIGF0IGxlYXN0IG9uZSBsZWFkaW5nIHplcm8gZWxlbWVudC5cbi8veSBtdXN0IGJlIG5vbnplcm8uXG4vL3EgYW5kIHIgbXVzdCBiZSBhcnJheXMgdGhhdCBhcmUgZXhhY3RseSB0aGUgc2FtZSBsZW5ndGggYXMgeC4gKE9yIHEgY2FuIGhhdmUgbW9yZSkuXG4vL011c3QgaGF2ZSB4Lmxlbmd0aCA+PSB5Lmxlbmd0aCA+PSAyLlxuZnVuY3Rpb24gZGl2aWRlXyh4LHkscSxyKSB7XG4gIHZhciBreCwga3k7XG4gIHZhciBpLGoseTEseTIsYyxhLGI7XG4gIGNvcHlfKHIseCk7XG4gIGZvciAoa3k9eS5sZW5ndGg7eVtreS0xXT09MDtreS0tKTsgLy9reSBpcyBudW1iZXIgb2YgZWxlbWVudHMgaW4geSwgbm90IGluY2x1ZGluZyBsZWFkaW5nIHplcm9zXG5cbiAgLy9ub3JtYWxpemU6IGVuc3VyZSB0aGUgbW9zdCBzaWduaWZpY2FudCBlbGVtZW50IG9mIHkgaGFzIGl0cyBoaWdoZXN0IGJpdCBzZXRcbiAgYj15W2t5LTFdO1xuICBmb3IgKGE9MDsgYjsgYSsrKVxuICAgIGI+Pj0xO1xuICBhPWJwZS1hOyAgLy9hIGlzIGhvdyBtYW55IGJpdHMgdG8gc2hpZnQgc28gdGhhdCB0aGUgaGlnaCBvcmRlciBiaXQgb2YgeSBpcyBsZWZ0bW9zdCBpbiBpdHMgYXJyYXkgZWxlbWVudFxuICBsZWZ0U2hpZnRfKHksYSk7ICAvL211bHRpcGx5IGJvdGggYnkgMTw8YSBub3csIHRoZW4gZGl2aWRlIGJvdGggYnkgdGhhdCBhdCB0aGUgZW5kXG4gIGxlZnRTaGlmdF8ocixhKTtcblxuICAvL1JvYiBWaXNzZXIgZGlzY292ZXJlZCBhIGJ1ZzogdGhlIGZvbGxvd2luZyBsaW5lIHdhcyBvcmlnaW5hbGx5IGp1c3QgYmVmb3JlIHRoZSBub3JtYWxpemF0aW9uLlxuICBmb3IgKGt4PXIubGVuZ3RoO3Jba3gtMV09PTAgJiYga3g+a3k7a3gtLSk7IC8va3ggaXMgbnVtYmVyIG9mIGVsZW1lbnRzIGluIG5vcm1hbGl6ZWQgeCwgbm90IGluY2x1ZGluZyBsZWFkaW5nIHplcm9zXG5cbiAgY29weUludF8ocSwwKTsgICAgICAgICAgICAgICAgICAgICAgLy8gcT0wXG4gIHdoaWxlICghZ3JlYXRlclNoaWZ0KHkscixreC1reSkpIHsgIC8vIHdoaWxlIChsZWZ0U2hpZnRfKHksa3gta3kpIDw9IHIpIHtcbiAgICBzdWJTaGlmdF8ocix5LGt4LWt5KTsgICAgICAgICAgICAgLy8gICByPXItbGVmdFNoaWZ0Xyh5LGt4LWt5KVxuICAgIHFba3gta3ldKys7ICAgICAgICAgICAgICAgICAgICAgICAvLyAgIHFba3gta3ldKys7XG4gIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cblxuICBmb3IgKGk9a3gtMTsgaT49a3k7IGktLSkge1xuICAgIGlmIChyW2ldPT15W2t5LTFdKVxuICAgICAgcVtpLWt5XT1tYXNrO1xuICAgIGVsc2VcbiAgICAgIHFbaS1reV09TWF0aC5mbG9vcigocltpXSpyYWRpeCtyW2ktMV0pL3lba3ktMV0pO1xuXG4gICAgLy9UaGUgZm9sbG93aW5nIGZvcig7OykgbG9vcCBpcyBlcXVpdmFsZW50IHRvIHRoZSBjb21tZW50ZWQgd2hpbGUgbG9vcCxcbiAgICAvL2V4Y2VwdCB0aGF0IHRoZSB1bmNvbW1lbnRlZCB2ZXJzaW9uIGF2b2lkcyBvdmVyZmxvdy5cbiAgICAvL1RoZSBjb21tZW50ZWQgbG9vcCBjb21lcyBmcm9tIEhBQywgd2hpY2ggYXNzdW1lcyByWy0xXT09eVstMV09PTBcbiAgICAvLyAgd2hpbGUgKHFbaS1reV0qKHlba3ktMV0qcmFkaXgreVtreS0yXSkgPiByW2ldKnJhZGl4KnJhZGl4K3JbaS0xXSpyYWRpeCtyW2ktMl0pXG4gICAgLy8gICAgcVtpLWt5XS0tO1xuICAgIGZvciAoOzspIHtcbiAgICAgIHkyPShreT4xID8geVtreS0yXSA6IDApKnFbaS1reV07XG4gICAgICBjPXkyPj5icGU7XG4gICAgICB5Mj15MiAmIG1hc2s7XG4gICAgICB5MT1jK3FbaS1reV0qeVtreS0xXTtcbiAgICAgIGM9eTE+PmJwZTtcbiAgICAgIHkxPXkxICYgbWFzaztcblxuICAgICAgaWYgKGM9PXJbaV0gPyB5MT09cltpLTFdID8geTI+KGk+MSA/IHJbaS0yXSA6IDApIDogeTE+cltpLTFdIDogYz5yW2ldKVxuICAgICAgICBxW2kta3ldLS07XG4gICAgICBlbHNlXG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGxpbkNvbWJTaGlmdF8ocix5LC1xW2kta3ldLGkta3kpOyAgICAvL3I9ci1xW2kta3ldKmxlZnRTaGlmdF8oeSxpLWt5KVxuICAgIGlmIChuZWdhdGl2ZShyKSkge1xuICAgICAgYWRkU2hpZnRfKHIseSxpLWt5KTsgICAgICAgICAvL3I9citsZWZ0U2hpZnRfKHksaS1reSlcbiAgICAgIHFbaS1reV0tLTtcbiAgICB9XG4gIH1cblxuICByaWdodFNoaWZ0Xyh5LGEpOyAgLy91bmRvIHRoZSBub3JtYWxpemF0aW9uIHN0ZXBcbiAgcmlnaHRTaGlmdF8ocixhKTsgIC8vdW5kbyB0aGUgbm9ybWFsaXphdGlvbiBzdGVwXG59XG5cbi8vZG8gY2FycmllcyBhbmQgYm9ycm93cyBzbyBlYWNoIGVsZW1lbnQgb2YgdGhlIGJpZ0ludCB4IGZpdHMgaW4gYnBlIGJpdHMuXG5mdW5jdGlvbiBjYXJyeV8oeCkge1xuICB2YXIgaSxrLGMsYjtcbiAgaz14Lmxlbmd0aDtcbiAgYz0wO1xuICBmb3IgKGk9MDtpPGs7aSsrKSB7XG4gICAgYys9eFtpXTtcbiAgICBiPTA7XG4gICAgaWYgKGM8MCkge1xuICAgICAgYj0tKGM+PmJwZSk7XG4gICAgICBjKz1iKnJhZGl4O1xuICAgIH1cbiAgICB4W2ldPWMgJiBtYXNrO1xuICAgIGM9KGM+PmJwZSktYjtcbiAgfVxufVxuXG4vL3JldHVybiB4IG1vZCBuIGZvciBiaWdJbnQgeCBhbmQgaW50ZWdlciBuLlxuZnVuY3Rpb24gbW9kSW50KHgsbikge1xuICB2YXIgaSxjPTA7XG4gIGZvciAoaT14Lmxlbmd0aC0xOyBpPj0wOyBpLS0pXG4gICAgYz0oYypyYWRpeCt4W2ldKSVuO1xuICByZXR1cm4gYztcbn1cblxuLy9jb252ZXJ0IHRoZSBpbnRlZ2VyIHQgaW50byBhIGJpZ0ludCB3aXRoIGF0IGxlYXN0IHRoZSBnaXZlbiBudW1iZXIgb2YgYml0cy5cbi8vdGhlIHJldHVybmVkIGFycmF5IHN0b3JlcyB0aGUgYmlnSW50IGluIGJwZS1iaXQgY2h1bmtzLCBsaXR0bGUgZW5kaWFuIChidWZmWzBdIGlzIGxlYXN0IHNpZ25pZmljYW50IHdvcmQpXG4vL1BhZCB0aGUgYXJyYXkgd2l0aCBsZWFkaW5nIHplcm9zIHNvIHRoYXQgaXQgaGFzIGF0IGxlYXN0IG1pblNpemUgZWxlbWVudHMuXG4vL1RoZXJlIHdpbGwgYWx3YXlzIGJlIGF0IGxlYXN0IG9uZSBsZWFkaW5nIDAgZWxlbWVudC5cbmZ1bmN0aW9uIGludDJiaWdJbnQodCxiaXRzLG1pblNpemUpIHtcbiAgdmFyIGksaztcbiAgaz1NYXRoLmNlaWwoYml0cy9icGUpKzE7XG4gIGs9bWluU2l6ZT5rID8gbWluU2l6ZSA6IGs7XG4gIGJ1ZmY9bmV3IEFycmF5KGspO1xuICBjb3B5SW50XyhidWZmLHQpO1xuICByZXR1cm4gYnVmZjtcbn1cblxuLy9yZXR1cm4gdGhlIGJpZ0ludCBnaXZlbiBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBpbiBhIGdpdmVuIGJhc2UuXG4vL1BhZCB0aGUgYXJyYXkgd2l0aCBsZWFkaW5nIHplcm9zIHNvIHRoYXQgaXQgaGFzIGF0IGxlYXN0IG1pblNpemUgZWxlbWVudHMuXG4vL0lmIGJhc2U9LTEsIHRoZW4gaXQgcmVhZHMgaW4gYSBzcGFjZS1zZXBhcmF0ZWQgbGlzdCBvZiBhcnJheSBlbGVtZW50cyBpbiBkZWNpbWFsLlxuLy9UaGUgYXJyYXkgd2lsbCBhbHdheXMgaGF2ZSBhdCBsZWFzdCBvbmUgbGVhZGluZyB6ZXJvLCB1bmxlc3MgYmFzZT0tMS5cbmZ1bmN0aW9uIHN0cjJiaWdJbnQocyxiLG1pblNpemUpIHtcbiAgdmFyIGQsIGksIGosIGJhc2UsIHN0ciwgeCwgeSwga2s7XG4gIGlmICh0eXBlb2YgYiA9PT0gJ3N0cmluZycpIHtcblx0ICBiYXNlID0gYi5sZW5ndGg7XG5cdCAgc3RyID0gYjtcbiAgfSBlbHNlIHtcblx0ICBiYXNlID0gYjtcblx0ICBzdHIgPSBkaWdpdHNTdHI7XG4gIH1cbiAgdmFyIGs9cy5sZW5ndGg7XG4gIGlmIChiYXNlPT0tMSkgeyAvL2NvbW1hLXNlcGFyYXRlZCBsaXN0IG9mIGFycmF5IGVsZW1lbnRzIGluIGRlY2ltYWxcbiAgICB4PW5ldyBBcnJheSgwKTtcbiAgICBmb3IgKDs7KSB7XG4gICAgICB5PW5ldyBBcnJheSh4Lmxlbmd0aCsxKTtcbiAgICAgIGZvciAoaT0wO2k8eC5sZW5ndGg7aSsrKVxuICAgICAgICB5W2krMV09eFtpXTtcbiAgICAgIHlbMF09cGFyc2VJbnQocywxMCk7XG4gICAgICB4PXk7XG4gICAgICBkPXMuaW5kZXhPZignLCcsMCk7XG4gICAgICBpZiAoZDwxKVxuICAgICAgICBicmVhaztcbiAgICAgIHM9cy5zdWJzdHJpbmcoZCsxKTtcbiAgICAgIGlmIChzLmxlbmd0aD09MClcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGlmICh4Lmxlbmd0aDxtaW5TaXplKSB7XG4gICAgICB5PW5ldyBBcnJheShtaW5TaXplKTtcbiAgICAgIGNvcHlfKHkseCk7XG4gICAgICByZXR1cm4geTtcbiAgICB9XG4gICAgcmV0dXJuIHg7XG4gIH1cblxuICB4PWludDJiaWdJbnQoMCxiYXNlKmssMCk7XG4gIGZvciAoaT0wO2k8aztpKyspIHtcbiAgICBkPXN0ci5pbmRleE9mKHMuc3Vic3RyaW5nKGksaSsxKSwwKTtcbi8vICAgIGlmIChiYXNlPD0zNiAmJiBkPj0zNikgIC8vY29udmVydCBsb3dlcmNhc2UgdG8gdXBwZXJjYXNlIGlmIGJhc2U8PTM2XG4vLyAgICAgIGQtPTI2O1xuICAgIGlmIChkPj1iYXNlIHx8IGQ8MCkgeyAgIC8vaWdub3JlIGlsbGVnYWwgY2hhcmFjdGVyc1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIG11bHRJbnRfKHgsYmFzZSk7XG4gICAgYWRkSW50Xyh4LGQpO1xuICB9XG5cbiAgZm9yIChrPXgubGVuZ3RoO2s+MCAmJiAheFtrLTFdO2stLSk7IC8vc3RyaXAgb2ZmIGxlYWRpbmcgemVyb3NcbiAgaz1taW5TaXplPmsrMSA/IG1pblNpemUgOiBrKzE7XG4gIHk9bmV3IEFycmF5KGspO1xuICBraz1rPHgubGVuZ3RoID8gayA6IHgubGVuZ3RoO1xuICBmb3IgKGk9MDtpPGtrO2krKylcbiAgICB5W2ldPXhbaV07XG4gIGZvciAoO2k8aztpKyspXG4gICAgeVtpXT0wO1xuICByZXR1cm4geTtcbn1cblxuLy9pcyBiaWdpbnQgeCBlcXVhbCB0byBpbnRlZ2VyIHk/XG4vL3kgbXVzdCBoYXZlIGxlc3MgdGhhbiBicGUgYml0c1xuZnVuY3Rpb24gZXF1YWxzSW50KHgseSkge1xuICB2YXIgaTtcbiAgaWYgKHhbMF0hPXkpXG4gICAgcmV0dXJuIDA7XG4gIGZvciAoaT0xO2k8eC5sZW5ndGg7aSsrKVxuICAgIGlmICh4W2ldKVxuICAgICAgcmV0dXJuIDA7XG4gIHJldHVybiAxO1xufVxuXG4vL2FyZSBiaWdpbnRzIHggYW5kIHkgZXF1YWw/XG4vL3RoaXMgd29ya3MgZXZlbiBpZiB4IGFuZCB5IGFyZSBkaWZmZXJlbnQgbGVuZ3RocyBhbmQgaGF2ZSBhcmJpdHJhcmlseSBtYW55IGxlYWRpbmcgemVyb3NcbmZ1bmN0aW9uIGVxdWFscyh4LHkpIHtcbiAgdmFyIGk7XG4gIHZhciBrPXgubGVuZ3RoPHkubGVuZ3RoID8geC5sZW5ndGggOiB5Lmxlbmd0aDtcbiAgZm9yIChpPTA7aTxrO2krKylcbiAgICBpZiAoeFtpXSE9eVtpXSlcbiAgICAgIHJldHVybiAwO1xuICBpZiAoeC5sZW5ndGg+eS5sZW5ndGgpIHtcbiAgICBmb3IgKDtpPHgubGVuZ3RoO2krKylcbiAgICAgIGlmICh4W2ldKVxuICAgICAgICByZXR1cm4gMDtcbiAgfSBlbHNlIHtcbiAgICBmb3IgKDtpPHkubGVuZ3RoO2krKylcbiAgICAgIGlmICh5W2ldKVxuICAgICAgICByZXR1cm4gMDtcbiAgfVxuICByZXR1cm4gMTtcbn1cblxuLy9pcyB0aGUgYmlnSW50IHggZXF1YWwgdG8gemVybz9cbmZ1bmN0aW9uIGlzWmVybyh4KSB7XG4gIHZhciBpO1xuICBmb3IgKGk9MDtpPHgubGVuZ3RoO2krKylcbiAgICBpZiAoeFtpXSlcbiAgICAgIHJldHVybiAwO1xuICByZXR1cm4gMTtcbn1cblxuLy9jb252ZXJ0IGEgYmlnSW50IGludG8gYSBzdHJpbmcgaW4gYSBnaXZlbiBiYXNlLCBmcm9tIGJhc2UgMiB1cCB0byBiYXNlIDk1LlxuLy9CYXNlIC0xIHByaW50cyB0aGUgY29udGVudHMgb2YgdGhlIGFycmF5IHJlcHJlc2VudGluZyB0aGUgbnVtYmVyLlxuZnVuY3Rpb24gYmlnSW50MnN0cih4LGIpIHtcbiAgdmFyIGksdCxiYXNlLHN0cixzPVwiXCI7XG4gIGlmICh0eXBlb2YgYiA9PT0gJ3N0cmluZycpIHtcblx0ICBiYXNlID0gYi5sZW5ndGg7XG5cdCAgc3RyID0gYjtcbiAgfSBlbHNlIHtcblx0ICBiYXNlID0gYjtcblx0ICBzdHIgPSBkaWdpdHNTdHI7XG4gIH1cblxuICBpZiAoczYubGVuZ3RoIT14Lmxlbmd0aClcbiAgICBzNj1kdXAoeCk7XG4gIGVsc2VcbiAgICBjb3B5XyhzNix4KTtcblxuICBpZiAoYmFzZT09LTEpIHsgLy9yZXR1cm4gdGhlIGxpc3Qgb2YgYXJyYXkgY29udGVudHNcbiAgICBmb3IgKGk9eC5sZW5ndGgtMTtpPjA7aS0tKVxuICAgICAgcys9eFtpXSsnLCc7XG4gICAgcys9eFswXTtcbiAgfVxuICBlbHNlIHsgLy9yZXR1cm4gaXQgaW4gdGhlIGdpdmVuIGJhc2VcbiAgICB3aGlsZSAoIWlzWmVybyhzNikpIHtcbiAgICAgIHQ9ZGl2SW50XyhzNixiYXNlKTsgIC8vdD1zNiAlIGJhc2U7IHM2PWZsb29yKHM2L2Jhc2UpO1xuICAgICAgcz1zdHIuc3Vic3RyaW5nKHQsdCsxKStzO1xuICAgIH1cbiAgfVxuICBpZiAocy5sZW5ndGg9PTApXG4gICAgcz1zdHJbMF07XG4gIHJldHVybiBzO1xufVxuXG4vL3JldHVybnMgYSBkdXBsaWNhdGUgb2YgYmlnSW50IHhcbmZ1bmN0aW9uIGR1cCh4KSB7XG4gIHZhciBpO1xuICBidWZmPW5ldyBBcnJheSh4Lmxlbmd0aCk7XG4gIGNvcHlfKGJ1ZmYseCk7XG4gIHJldHVybiBidWZmO1xufVxuXG4vL2RvIHg9eSBvbiBiaWdJbnRzIHggYW5kIHkuICB4IG11c3QgYmUgYW4gYXJyYXkgYXQgbGVhc3QgYXMgYmlnIGFzIHkgKG5vdCBjb3VudGluZyB0aGUgbGVhZGluZyB6ZXJvcyBpbiB5KS5cbmZ1bmN0aW9uIGNvcHlfKHgseSkge1xuICB2YXIgaTtcbiAgdmFyIGs9eC5sZW5ndGg8eS5sZW5ndGggPyB4Lmxlbmd0aCA6IHkubGVuZ3RoO1xuICBmb3IgKGk9MDtpPGs7aSsrKVxuICAgIHhbaV09eVtpXTtcbiAgZm9yIChpPWs7aTx4Lmxlbmd0aDtpKyspXG4gICAgeFtpXT0wO1xufVxuXG4vL2RvIHg9eSBvbiBiaWdJbnQgeCBhbmQgaW50ZWdlciB5LlxuZnVuY3Rpb24gY29weUludF8oeCxuKSB7XG4gIHZhciBpLGM7XG4gIGZvciAoYz1uLGk9MDtpPHgubGVuZ3RoO2krKykge1xuICAgIHhbaV09YyAmIG1hc2s7XG4gICAgYz4+PWJwZTtcbiAgfVxufVxuXG4vL2RvIHg9eCtuIHdoZXJlIHggaXMgYSBiaWdJbnQgYW5kIG4gaXMgYW4gaW50ZWdlci5cbi8veCBtdXN0IGJlIGxhcmdlIGVub3VnaCB0byBob2xkIHRoZSByZXN1bHQuXG5mdW5jdGlvbiBhZGRJbnRfKHgsbikge1xuICB2YXIgaSxrLGMsYjtcbiAgeFswXSs9bjtcbiAgaz14Lmxlbmd0aDtcbiAgYz0wO1xuICBmb3IgKGk9MDtpPGs7aSsrKSB7XG4gICAgYys9eFtpXTtcbiAgICBiPTA7XG4gICAgaWYgKGM8MCkge1xuICAgICAgYj0tKGM+PmJwZSk7XG4gICAgICBjKz1iKnJhZGl4O1xuICAgIH1cbiAgICB4W2ldPWMgJiBtYXNrO1xuICAgIGM9KGM+PmJwZSktYjtcbiAgICBpZiAoIWMpIHJldHVybjsgLy9zdG9wIGNhcnJ5aW5nIGFzIHNvb24gYXMgdGhlIGNhcnJ5IGlzIHplcm9cbiAgfVxufVxuXG4vL3JpZ2h0IHNoaWZ0IGJpZ0ludCB4IGJ5IG4gYml0cy4gIDAgPD0gbiA8IGJwZS5cbmZ1bmN0aW9uIHJpZ2h0U2hpZnRfKHgsbikge1xuICB2YXIgaTtcbiAgdmFyIGs9TWF0aC5mbG9vcihuL2JwZSk7XG4gIGlmIChrKSB7XG4gICAgZm9yIChpPTA7aTx4Lmxlbmd0aC1rO2krKykgLy9yaWdodCBzaGlmdCB4IGJ5IGsgZWxlbWVudHNcbiAgICAgIHhbaV09eFtpK2tdO1xuICAgIGZvciAoO2k8eC5sZW5ndGg7aSsrKVxuICAgICAgeFtpXT0wO1xuICAgIG4lPWJwZTtcbiAgfVxuICBmb3IgKGk9MDtpPHgubGVuZ3RoLTE7aSsrKSB7XG4gICAgeFtpXT1tYXNrICYgKCh4W2krMV08PChicGUtbikpIHwgKHhbaV0+Pm4pKTtcbiAgfVxuICB4W2ldPj49bjtcbn1cblxuLy9kbyB4PWZsb29yKHx4fC8yKSpzZ24oeCkgZm9yIGJpZ0ludCB4IGluIDIncyBjb21wbGVtZW50XG5mdW5jdGlvbiBoYWx2ZV8oeCkge1xuICB2YXIgaTtcbiAgZm9yIChpPTA7aTx4Lmxlbmd0aC0xO2krKykge1xuICAgIHhbaV09bWFzayAmICgoeFtpKzFdPDwoYnBlLTEpKSB8ICh4W2ldPj4xKSk7XG4gIH1cbiAgeFtpXT0oeFtpXT4+MSkgfCAoeFtpXSAmIChyYWRpeD4+MSkpOyAgLy9tb3N0IHNpZ25pZmljYW50IGJpdCBzdGF5cyB0aGUgc2FtZVxufVxuXG4vL2xlZnQgc2hpZnQgYmlnSW50IHggYnkgbiBiaXRzLlxuZnVuY3Rpb24gbGVmdFNoaWZ0Xyh4LG4pIHtcbiAgdmFyIGk7XG4gIHZhciBrPU1hdGguZmxvb3Iobi9icGUpO1xuICBpZiAoaykge1xuICAgIGZvciAoaT14Lmxlbmd0aDsgaT49azsgaS0tKSAvL2xlZnQgc2hpZnQgeCBieSBrIGVsZW1lbnRzXG4gICAgICB4W2ldPXhbaS1rXTtcbiAgICBmb3IgKDtpPj0wO2ktLSlcbiAgICAgIHhbaV09MDtcbiAgICBuJT1icGU7XG4gIH1cbiAgaWYgKCFuKVxuICAgIHJldHVybjtcbiAgZm9yIChpPXgubGVuZ3RoLTE7aT4wO2ktLSkge1xuICAgIHhbaV09bWFzayAmICgoeFtpXTw8bikgfCAoeFtpLTFdPj4oYnBlLW4pKSk7XG4gIH1cbiAgeFtpXT1tYXNrICYgKHhbaV08PG4pO1xufVxuXG4vL2RvIHg9eCpuIHdoZXJlIHggaXMgYSBiaWdJbnQgYW5kIG4gaXMgYW4gaW50ZWdlci5cbi8veCBtdXN0IGJlIGxhcmdlIGVub3VnaCB0byBob2xkIHRoZSByZXN1bHQuXG5mdW5jdGlvbiBtdWx0SW50Xyh4LG4pIHtcbiAgdmFyIGksayxjLGI7XG4gIGlmICghbilcbiAgICByZXR1cm47XG4gIGs9eC5sZW5ndGg7XG4gIGM9MDtcbiAgZm9yIChpPTA7aTxrO2krKykge1xuICAgIGMrPXhbaV0qbjtcbiAgICBiPTA7XG4gICAgaWYgKGM8MCkge1xuICAgICAgYj0tKGM+PmJwZSk7XG4gICAgICBjKz1iKnJhZGl4O1xuICAgIH1cbiAgICB4W2ldPWMgJiBtYXNrO1xuICAgIGM9KGM+PmJwZSktYjtcbiAgfVxufVxuXG4vL2RvIHg9Zmxvb3IoeC9uKSBmb3IgYmlnSW50IHggYW5kIGludGVnZXIgbiwgYW5kIHJldHVybiB0aGUgcmVtYWluZGVyXG5mdW5jdGlvbiBkaXZJbnRfKHgsbikge1xuICB2YXIgaSxyPTAscztcbiAgZm9yIChpPXgubGVuZ3RoLTE7aT49MDtpLS0pIHtcbiAgICBzPXIqcmFkaXgreFtpXTtcbiAgICB4W2ldPU1hdGguZmxvb3Iocy9uKTtcbiAgICByPXMlbjtcbiAgfVxuICByZXR1cm4gcjtcbn1cblxuLy9kbyB0aGUgbGluZWFyIGNvbWJpbmF0aW9uIHg9YSp4K2IqeSBmb3IgYmlnSW50cyB4IGFuZCB5LCBhbmQgaW50ZWdlcnMgYSBhbmQgYi5cbi8veCBtdXN0IGJlIGxhcmdlIGVub3VnaCB0byBob2xkIHRoZSBhbnN3ZXIuXG5mdW5jdGlvbiBsaW5Db21iXyh4LHksYSxiKSB7XG4gIHZhciBpLGMsayxraztcbiAgaz14Lmxlbmd0aDx5Lmxlbmd0aCA/IHgubGVuZ3RoIDogeS5sZW5ndGg7XG4gIGtrPXgubGVuZ3RoO1xuICBmb3IgKGM9MCxpPTA7aTxrO2krKykge1xuICAgIGMrPWEqeFtpXStiKnlbaV07XG4gICAgeFtpXT1jICYgbWFzaztcbiAgICBjPj49YnBlO1xuICB9XG4gIGZvciAoaT1rO2k8a2s7aSsrKSB7XG4gICAgYys9YSp4W2ldO1xuICAgIHhbaV09YyAmIG1hc2s7XG4gICAgYz4+PWJwZTtcbiAgfVxufVxuXG4vL2RvIHRoZSBsaW5lYXIgY29tYmluYXRpb24geD1hKngrYiooeTw8KHlzKmJwZSkpIGZvciBiaWdJbnRzIHggYW5kIHksIGFuZCBpbnRlZ2VycyBhLCBiIGFuZCB5cy5cbi8veCBtdXN0IGJlIGxhcmdlIGVub3VnaCB0byBob2xkIHRoZSBhbnN3ZXIuXG5mdW5jdGlvbiBsaW5Db21iU2hpZnRfKHgseSxiLHlzKSB7XG4gIHZhciBpLGMsayxraztcbiAgaz14Lmxlbmd0aDx5cyt5Lmxlbmd0aCA/IHgubGVuZ3RoIDogeXMreS5sZW5ndGg7XG4gIGtrPXgubGVuZ3RoO1xuICBmb3IgKGM9MCxpPXlzO2k8aztpKyspIHtcbiAgICBjKz14W2ldK2IqeVtpLXlzXTtcbiAgICB4W2ldPWMgJiBtYXNrO1xuICAgIGM+Pj1icGU7XG4gIH1cbiAgZm9yIChpPWs7YyAmJiBpPGtrO2krKykge1xuICAgIGMrPXhbaV07XG4gICAgeFtpXT1jICYgbWFzaztcbiAgICBjPj49YnBlO1xuICB9XG59XG5cbi8vZG8geD14Kyh5PDwoeXMqYnBlKSkgZm9yIGJpZ0ludHMgeCBhbmQgeSwgYW5kIGludGVnZXJzIGEsYiBhbmQgeXMuXG4vL3ggbXVzdCBiZSBsYXJnZSBlbm91Z2ggdG8gaG9sZCB0aGUgYW5zd2VyLlxuZnVuY3Rpb24gYWRkU2hpZnRfKHgseSx5cykge1xuICB2YXIgaSxjLGssa2s7XG4gIGs9eC5sZW5ndGg8eXMreS5sZW5ndGggPyB4Lmxlbmd0aCA6IHlzK3kubGVuZ3RoO1xuICBraz14Lmxlbmd0aDtcbiAgZm9yIChjPTAsaT15cztpPGs7aSsrKSB7XG4gICAgYys9eFtpXSt5W2kteXNdO1xuICAgIHhbaV09YyAmIG1hc2s7XG4gICAgYz4+PWJwZTtcbiAgfVxuICBmb3IgKGk9aztjICYmIGk8a2s7aSsrKSB7XG4gICAgYys9eFtpXTtcbiAgICB4W2ldPWMgJiBtYXNrO1xuICAgIGM+Pj1icGU7XG4gIH1cbn1cblxuLy9kbyB4PXgtKHk8PCh5cypicGUpKSBmb3IgYmlnSW50cyB4IGFuZCB5LCBhbmQgaW50ZWdlcnMgYSxiIGFuZCB5cy5cbi8veCBtdXN0IGJlIGxhcmdlIGVub3VnaCB0byBob2xkIHRoZSBhbnN3ZXIuXG5mdW5jdGlvbiBzdWJTaGlmdF8oeCx5LHlzKSB7XG4gIHZhciBpLGMsayxraztcbiAgaz14Lmxlbmd0aDx5cyt5Lmxlbmd0aCA/IHgubGVuZ3RoIDogeXMreS5sZW5ndGg7XG4gIGtrPXgubGVuZ3RoO1xuICBmb3IgKGM9MCxpPXlzO2k8aztpKyspIHtcbiAgICBjKz14W2ldLXlbaS15c107XG4gICAgeFtpXT1jICYgbWFzaztcbiAgICBjPj49YnBlO1xuICB9XG4gIGZvciAoaT1rO2MgJiYgaTxraztpKyspIHtcbiAgICBjKz14W2ldO1xuICAgIHhbaV09YyAmIG1hc2s7XG4gICAgYz4+PWJwZTtcbiAgfVxufVxuXG4vL2RvIHg9eC15IGZvciBiaWdJbnRzIHggYW5kIHkuXG4vL3ggbXVzdCBiZSBsYXJnZSBlbm91Z2ggdG8gaG9sZCB0aGUgYW5zd2VyLlxuLy9uZWdhdGl2ZSBhbnN3ZXJzIHdpbGwgYmUgMnMgY29tcGxlbWVudFxuZnVuY3Rpb24gc3ViXyh4LHkpIHtcbiAgdmFyIGksYyxrLGtrO1xuICBrPXgubGVuZ3RoPHkubGVuZ3RoID8geC5sZW5ndGggOiB5Lmxlbmd0aDtcbiAgZm9yIChjPTAsaT0wO2k8aztpKyspIHtcbiAgICBjKz14W2ldLXlbaV07XG4gICAgeFtpXT1jICYgbWFzaztcbiAgICBjPj49YnBlO1xuICB9XG4gIGZvciAoaT1rO2MgJiYgaTx4Lmxlbmd0aDtpKyspIHtcbiAgICBjKz14W2ldO1xuICAgIHhbaV09YyAmIG1hc2s7XG4gICAgYz4+PWJwZTtcbiAgfVxufVxuXG4vL2RvIHg9eCt5IGZvciBiaWdJbnRzIHggYW5kIHkuXG4vL3ggbXVzdCBiZSBsYXJnZSBlbm91Z2ggdG8gaG9sZCB0aGUgYW5zd2VyLlxuZnVuY3Rpb24gYWRkXyh4LHkpIHtcbiAgdmFyIGksYyxrLGtrO1xuICBrPXgubGVuZ3RoPHkubGVuZ3RoID8geC5sZW5ndGggOiB5Lmxlbmd0aDtcbiAgZm9yIChjPTAsaT0wO2k8aztpKyspIHtcbiAgICBjKz14W2ldK3lbaV07XG4gICAgeFtpXT1jICYgbWFzaztcbiAgICBjPj49YnBlO1xuICB9XG4gIGZvciAoaT1rO2MgJiYgaTx4Lmxlbmd0aDtpKyspIHtcbiAgICBjKz14W2ldO1xuICAgIHhbaV09YyAmIG1hc2s7XG4gICAgYz4+PWJwZTtcbiAgfVxufVxuXG4vL2RvIHg9eCp5IGZvciBiaWdJbnRzIHggYW5kIHkuICBUaGlzIGlzIGZhc3RlciB3aGVuIHk8eC5cbmZ1bmN0aW9uIG11bHRfKHgseSkge1xuICB2YXIgaTtcbiAgaWYgKHNzLmxlbmd0aCE9Mip4Lmxlbmd0aClcbiAgICBzcz1uZXcgQXJyYXkoMip4Lmxlbmd0aCk7XG4gIGNvcHlJbnRfKHNzLDApO1xuICBmb3IgKGk9MDtpPHkubGVuZ3RoO2krKylcbiAgICBpZiAoeVtpXSlcbiAgICAgIGxpbkNvbWJTaGlmdF8oc3MseCx5W2ldLGkpOyAgIC8vc3M9MSpzcyt5W2ldKih4PDwoaSpicGUpKVxuICBjb3B5Xyh4LHNzKTtcbn1cblxuLy9kbyB4PXggbW9kIG4gZm9yIGJpZ0ludHMgeCBhbmQgbi5cbmZ1bmN0aW9uIG1vZF8oeCxuKSB7XG4gIGlmIChzNC5sZW5ndGghPXgubGVuZ3RoKVxuICAgIHM0PWR1cCh4KTtcbiAgZWxzZVxuICAgIGNvcHlfKHM0LHgpO1xuICBpZiAoczUubGVuZ3RoIT14Lmxlbmd0aClcbiAgICBzNT1kdXAoeCk7XG4gIGRpdmlkZV8oczQsbixzNSx4KTsgIC8veCA9IHJlbWFpbmRlciBvZiBzNCAvIG5cbn1cblxuLy9kbyB4PXgqeSBtb2QgbiBmb3IgYmlnSW50cyB4LHksbi5cbi8vZm9yIGdyZWF0ZXIgc3BlZWQsIGxldCB5PHguXG5mdW5jdGlvbiBtdWx0TW9kXyh4LHksbikge1xuICB2YXIgaTtcbiAgaWYgKHMwLmxlbmd0aCE9Mip4Lmxlbmd0aClcbiAgICBzMD1uZXcgQXJyYXkoMip4Lmxlbmd0aCk7XG4gIGNvcHlJbnRfKHMwLDApO1xuICBmb3IgKGk9MDtpPHkubGVuZ3RoO2krKylcbiAgICBpZiAoeVtpXSlcbiAgICAgIGxpbkNvbWJTaGlmdF8oczAseCx5W2ldLGkpOyAgIC8vczA9MSpzMCt5W2ldKih4PDwoaSpicGUpKVxuICBtb2RfKHMwLG4pO1xuICBjb3B5Xyh4LHMwKTtcbn1cblxuLy9kbyB4PXgqeCBtb2QgbiBmb3IgYmlnSW50cyB4LG4uXG5mdW5jdGlvbiBzcXVhcmVNb2RfKHgsbikge1xuICB2YXIgaSxqLGQsYyxreCxrbixrO1xuICBmb3IgKGt4PXgubGVuZ3RoOyBreD4wICYmICF4W2t4LTFdOyBreC0tKTsgIC8vaWdub3JlIGxlYWRpbmcgemVyb3MgaW4geFxuICBrPWt4Pm4ubGVuZ3RoID8gMipreCA6IDIqbi5sZW5ndGg7IC8vaz0jIGVsZW1lbnRzIGluIHRoZSBwcm9kdWN0LCB3aGljaCBpcyB0d2ljZSB0aGUgZWxlbWVudHMgaW4gdGhlIGxhcmdlciBvZiB4IGFuZCBuXG4gIGlmIChzMC5sZW5ndGghPWspXG4gICAgczA9bmV3IEFycmF5KGspO1xuICBjb3B5SW50XyhzMCwwKTtcbiAgZm9yIChpPTA7aTxreDtpKyspIHtcbiAgICBjPXMwWzIqaV0reFtpXSp4W2ldO1xuICAgIHMwWzIqaV09YyAmIG1hc2s7XG4gICAgYz4+PWJwZTtcbiAgICBmb3IgKGo9aSsxO2o8a3g7aisrKSB7XG4gICAgICBjPXMwW2kral0rMip4W2ldKnhbal0rYztcbiAgICAgIHMwW2kral09KGMgJiBtYXNrKTtcbiAgICAgIGM+Pj1icGU7XG4gICAgfVxuICAgIHMwW2kra3hdPWM7XG4gIH1cbiAgbW9kXyhzMCxuKTtcbiAgY29weV8oeCxzMCk7XG59XG5cbi8vcmV0dXJuIHggd2l0aCBleGFjdGx5IGsgbGVhZGluZyB6ZXJvIGVsZW1lbnRzXG5mdW5jdGlvbiB0cmltKHgsaykge1xuICB2YXIgaSx5O1xuICBmb3IgKGk9eC5sZW5ndGg7IGk+MCAmJiAheFtpLTFdOyBpLS0pO1xuICB5PW5ldyBBcnJheShpK2spO1xuICBjb3B5Xyh5LHgpO1xuICByZXR1cm4geTtcbn1cblxuLy9kbyB4PXgqKnkgbW9kIG4sIHdoZXJlIHgseSxuIGFyZSBiaWdJbnRzIGFuZCAqKiBpcyBleHBvbmVudGlhdGlvbi4gIDAqKjA9MS5cbi8vdGhpcyBpcyBmYXN0ZXIgd2hlbiBuIGlzIG9kZC4gIHggdXN1YWxseSBuZWVkcyB0byBoYXZlIGFzIG1hbnkgZWxlbWVudHMgYXMgbi5cbmZ1bmN0aW9uIHBvd01vZF8oeCx5LG4pIHtcbiAgdmFyIGsxLGsyLGtuLG5wO1xuICBpZihzNy5sZW5ndGghPW4ubGVuZ3RoKVxuICAgIHM3PWR1cChuKTtcblxuICAvL2ZvciBldmVuIG1vZHVsdXMsIHVzZSBhIHNpbXBsZSBzcXVhcmUtYW5kLW11bHRpcGx5IGFsZ29yaXRobSxcbiAgLy9yYXRoZXIgdGhhbiB1c2luZyB0aGUgbW9yZSBjb21wbGV4IE1vbnRnb21lcnkgYWxnb3JpdGhtLlxuICBpZiAoKG5bMF0mMSk9PTApIHtcbiAgICBjb3B5XyhzNyx4KTtcbiAgICBjb3B5SW50Xyh4LDEpO1xuICAgIHdoaWxlKCFlcXVhbHNJbnQoeSwwKSkge1xuICAgICAgaWYgKHlbMF0mMSlcbiAgICAgICAgbXVsdE1vZF8oeCxzNyxuKTtcbiAgICAgIGRpdkludF8oeSwyKTtcbiAgICAgIHNxdWFyZU1vZF8oczcsbik7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vY2FsY3VsYXRlIG5wIGZyb20gbiBmb3IgdGhlIE1vbnRnb21lcnkgbXVsdGlwbGljYXRpb25zXG4gIGNvcHlJbnRfKHM3LDApO1xuICBmb3IgKGtuPW4ubGVuZ3RoO2tuPjAgJiYgIW5ba24tMV07a24tLSk7XG4gIG5wPXJhZGl4LWludmVyc2VNb2RJbnQobW9kSW50KG4scmFkaXgpLHJhZGl4KTtcbiAgczdba25dPTE7XG4gIG11bHRNb2RfKHggLHM3LG4pOyAgIC8vIHggPSB4ICogMioqKGtuKmJwKSBtb2QgblxuXG4gIGlmIChzMy5sZW5ndGghPXgubGVuZ3RoKVxuICAgIHMzPWR1cCh4KTtcbiAgZWxzZVxuICAgIGNvcHlfKHMzLHgpO1xuXG4gIGZvciAoazE9eS5sZW5ndGgtMTtrMT4wICYgIXlbazFdOyBrMS0tKTsgIC8vazE9Zmlyc3Qgbm9uemVybyBlbGVtZW50IG9mIHlcbiAgaWYgKHlbazFdPT0wKSB7ICAvL2FueXRoaW5nIHRvIHRoZSAwdGggcG93ZXIgaXMgMVxuICAgIGNvcHlJbnRfKHgsMSk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGZvciAoazI9MTw8KGJwZS0xKTtrMiAmJiAhKHlbazFdICYgazIpOyBrMj4+PTEpOyAgLy9rMj1wb3NpdGlvbiBvZiBmaXJzdCAxIGJpdCBpbiB5W2sxXVxuICBmb3IgKDs7KSB7XG4gICAgaWYgKCEoazI+Pj0xKSkgeyAgLy9sb29rIGF0IG5leHQgYml0IG9mIHlcbiAgICAgIGsxLS07XG4gICAgICBpZiAoazE8MCkge1xuICAgICAgICBtb250Xyh4LG9uZSxuLG5wKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgazI9MTw8KGJwZS0xKTtcbiAgICB9XG4gICAgbW9udF8oeCx4LG4sbnApO1xuXG4gICAgaWYgKGsyICYgeVtrMV0pIC8vaWYgbmV4dCBiaXQgaXMgYSAxXG4gICAgICBtb250Xyh4LHMzLG4sbnApO1xuICB9XG59XG5cblxuLy9kbyB4PXgqeSpSaSBtb2QgbiBmb3IgYmlnSW50cyB4LHksbixcbi8vICB3aGVyZSBSaSA9IDIqKigta24qYnBlKSBtb2QgbiwgYW5kIGtuIGlzIHRoZVxuLy8gIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGUgbiBhcnJheSwgbm90XG4vLyAgY291bnRpbmcgbGVhZGluZyB6ZXJvcy5cbi8veCBhcnJheSBtdXN0IGhhdmUgYXQgbGVhc3QgYXMgbWFueSBlbGVtbnRzIGFzIHRoZSBuIGFycmF5XG4vL0l0J3MgT0sgaWYgeCBhbmQgeSBhcmUgdGhlIHNhbWUgdmFyaWFibGUuXG4vL211c3QgaGF2ZTpcbi8vICB4LHkgPCBuXG4vLyAgbiBpcyBvZGRcbi8vICBucCA9IC0obl4oLTEpKSBtb2QgcmFkaXhcbmZ1bmN0aW9uIG1vbnRfKHgseSxuLG5wKSB7XG4gIHZhciBpLGosYyx1aSx0LGtzO1xuICB2YXIga249bi5sZW5ndGg7XG4gIHZhciBreT15Lmxlbmd0aDtcblxuICBpZiAoc2EubGVuZ3RoIT1rbilcbiAgICBzYT1uZXcgQXJyYXkoa24pO1xuXG4gIGNvcHlJbnRfKHNhLDApO1xuXG4gIGZvciAoO2tuPjAgJiYgbltrbi0xXT09MDtrbi0tKTsgLy9pZ25vcmUgbGVhZGluZyB6ZXJvcyBvZiBuXG4gIGZvciAoO2t5PjAgJiYgeVtreS0xXT09MDtreS0tKTsgLy9pZ25vcmUgbGVhZGluZyB6ZXJvcyBvZiB5XG4gIGtzPXNhLmxlbmd0aC0xOyAvL3NhIHdpbGwgbmV2ZXIgaGF2ZSBtb3JlIHRoYW4gdGhpcyBtYW55IG5vbnplcm8gZWxlbWVudHMuXG5cbiAgLy90aGUgZm9sbG93aW5nIGxvb3AgY29uc3VtZXMgOTUlIG9mIHRoZSBydW50aW1lIGZvciByYW5kVHJ1ZVByaW1lXygpIGFuZCBwb3dNb2RfKCkgZm9yIGxhcmdlIG51bWJlcnNcbiAgZm9yIChpPTA7IGk8a247IGkrKykge1xuICAgIHQ9c2FbMF0reFtpXSp5WzBdO1xuICAgIHVpPSgodCAmIG1hc2spICogbnApICYgbWFzazsgIC8vdGhlIGlubmVyIFwiJiBtYXNrXCIgd2FzIG5lZWRlZCBvbiBTYWZhcmkgKGJ1dCBub3QgTVNJRSkgYXQgb25lIHRpbWVcbiAgICBjPSh0K3VpKm5bMF0pID4+IGJwZTtcbiAgICB0PXhbaV07XG5cbiAgICAvL2RvIHNhPShzYSt4W2ldKnkrdWkqbikvYiAgIHdoZXJlIGI9MioqYnBlLiAgTG9vcCBpcyB1bnJvbGxlZCA1LWZvbGQgZm9yIHNwZWVkXG4gICAgaj0xO1xuICAgIGZvciAoO2o8a3ktNDspIHsgYys9c2Fbal0rdWkqbltqXSt0Knlbal07ICAgc2Fbai0xXT1jICYgbWFzazsgICBjPj49YnBlOyAgIGorKztcbiAgICAgICAgICAgICAgICAgICAgIGMrPXNhW2pdK3VpKm5bal0rdCp5W2pdOyAgIHNhW2otMV09YyAmIG1hc2s7ICAgYz4+PWJwZTsgICBqKys7XG4gICAgICAgICAgICAgICAgICAgICBjKz1zYVtqXSt1aSpuW2pdK3QqeVtqXTsgICBzYVtqLTFdPWMgJiBtYXNrOyAgIGM+Pj1icGU7ICAgaisrO1xuICAgICAgICAgICAgICAgICAgICAgYys9c2Fbal0rdWkqbltqXSt0Knlbal07ICAgc2Fbai0xXT1jICYgbWFzazsgICBjPj49YnBlOyAgIGorKztcbiAgICAgICAgICAgICAgICAgICAgIGMrPXNhW2pdK3VpKm5bal0rdCp5W2pdOyAgIHNhW2otMV09YyAmIG1hc2s7ICAgYz4+PWJwZTsgICBqKys7IH1cbiAgICBmb3IgKDtqPGt5OykgICB7IGMrPXNhW2pdK3VpKm5bal0rdCp5W2pdOyAgIHNhW2otMV09YyAmIG1hc2s7ICAgYz4+PWJwZTsgICBqKys7IH1cbiAgICBmb3IgKDtqPGtuLTQ7KSB7IGMrPXNhW2pdK3VpKm5bal07ICAgICAgICAgIHNhW2otMV09YyAmIG1hc2s7ICAgYz4+PWJwZTsgICBqKys7XG4gICAgICAgICAgICAgICAgICAgICBjKz1zYVtqXSt1aSpuW2pdOyAgICAgICAgICBzYVtqLTFdPWMgJiBtYXNrOyAgIGM+Pj1icGU7ICAgaisrO1xuICAgICAgICAgICAgICAgICAgICAgYys9c2Fbal0rdWkqbltqXTsgICAgICAgICAgc2Fbai0xXT1jICYgbWFzazsgICBjPj49YnBlOyAgIGorKztcbiAgICAgICAgICAgICAgICAgICAgIGMrPXNhW2pdK3VpKm5bal07ICAgICAgICAgIHNhW2otMV09YyAmIG1hc2s7ICAgYz4+PWJwZTsgICBqKys7XG4gICAgICAgICAgICAgICAgICAgICBjKz1zYVtqXSt1aSpuW2pdOyAgICAgICAgICBzYVtqLTFdPWMgJiBtYXNrOyAgIGM+Pj1icGU7ICAgaisrOyB9XG4gICAgZm9yICg7ajxrbjspICAgeyBjKz1zYVtqXSt1aSpuW2pdOyAgICAgICAgICBzYVtqLTFdPWMgJiBtYXNrOyAgIGM+Pj1icGU7ICAgaisrOyB9XG4gICAgZm9yICg7ajxrczspICAgeyBjKz1zYVtqXTsgICAgICAgICAgICAgICAgICBzYVtqLTFdPWMgJiBtYXNrOyAgIGM+Pj1icGU7ICAgaisrOyB9XG4gICAgc2Fbai0xXT1jICYgbWFzaztcbiAgfVxuXG4gIGlmICghZ3JlYXRlcihuLHNhKSlcbiAgICBzdWJfKHNhLG4pO1xuICBjb3B5Xyh4LHNhKTtcbn1cblxuaWYgKHR5cGVvZiBtb2R1bGUgPT09ICd1bmRlZmluZWQnKSB7XG5cdG1vZHVsZSA9IHt9O1xufVxuQmlnSW50ID0gbW9kdWxlLmV4cG9ydHMgPSB7XG5cdCdhZGQnOiBhZGQsICdhZGRJbnQnOiBhZGRJbnQsICdiaWdJbnQyc3RyJzogYmlnSW50MnN0ciwgJ2JpdFNpemUnOiBiaXRTaXplLFxuXHQnZHVwJzogZHVwLCAnZXF1YWxzJzogZXF1YWxzLCAnZXF1YWxzSW50JzogZXF1YWxzSW50LCAnZXhwYW5kJzogZXhwYW5kLFxuXHQnZmluZFByaW1lcyc6IGZpbmRQcmltZXMsICdHQ0QnOiBHQ0QsICdncmVhdGVyJzogZ3JlYXRlcixcblx0J2dyZWF0ZXJTaGlmdCc6IGdyZWF0ZXJTaGlmdCwgJ2ludDJiaWdJbnQnOiBpbnQyYmlnSW50LFxuXHQnaW52ZXJzZU1vZCc6IGludmVyc2VNb2QsICdpbnZlcnNlTW9kSW50JzogaW52ZXJzZU1vZEludCwgJ2lzWmVybyc6IGlzWmVybyxcblx0J21pbGxlclJhYmluJzogbWlsbGVyUmFiaW4sICdtaWxsZXJSYWJpbkludCc6IG1pbGxlclJhYmluSW50LCAnbW9kJzogbW9kLFxuXHQnbW9kSW50JzogbW9kSW50LCAnbXVsdCc6IG11bHQsICdtdWx0TW9kJzogbXVsdE1vZCwgJ25lZ2F0aXZlJzogbmVnYXRpdmUsXG5cdCdwb3dNb2QnOiBwb3dNb2QsICdyYW5kQmlnSW50JzogcmFuZEJpZ0ludCwgJ3JhbmRUcnVlUHJpbWUnOiByYW5kVHJ1ZVByaW1lLFxuXHQncmFuZFByb2JQcmltZSc6IHJhbmRQcm9iUHJpbWUsICdzdHIyYmlnSW50Jzogc3RyMmJpZ0ludCwgJ3N1Yic6IHN1Yixcblx0J3RyaW0nOiB0cmltLCAnYWRkSW50Xyc6IGFkZEludF8sICdhZGRfJzogYWRkXywgJ2NvcHlfJzogY29weV8sXG5cdCdjb3B5SW50Xyc6IGNvcHlJbnRfLCAnR0NEXyc6IEdDRF8sICdpbnZlcnNlTW9kXyc6IGludmVyc2VNb2RfLCAnbW9kXyc6IG1vZF8sXG5cdCdtdWx0Xyc6IG11bHRfLCAnbXVsdE1vZF8nOiBtdWx0TW9kXywgJ3Bvd01vZF8nOiBwb3dNb2RfLFxuXHQncmFuZEJpZ0ludF8nOiByYW5kQmlnSW50XywgJ3JhbmRUcnVlUHJpbWVfJzogcmFuZFRydWVQcmltZV8sICdzdWJfJzogc3ViXyxcblx0J2FkZFNoaWZ0Xyc6IGFkZFNoaWZ0XywgJ2NhcnJ5Xyc6IGNhcnJ5XywgJ2RpdmlkZV8nOiBkaXZpZGVfLFxuXHQnZGl2SW50Xyc6IGRpdkludF8sICdlR0NEXyc6IGVHQ0RfLCAnaGFsdmVfJzogaGFsdmVfLCAnbGVmdFNoaWZ0Xyc6IGxlZnRTaGlmdF8sXG5cdCdsaW5Db21iXyc6IGxpbkNvbWJfLCAnbGluQ29tYlNoaWZ0Xyc6IGxpbkNvbWJTaGlmdF8sICdtb250Xyc6IG1vbnRfLFxuXHQnbXVsdEludF8nOiBtdWx0SW50XywgJ3JpZ2h0U2hpZnRfJzogcmlnaHRTaGlmdF8sICdzcXVhcmVNb2RfJzogc3F1YXJlTW9kXyxcblx0J3N1YlNoaWZ0Xyc6IHN1YlNoaWZ0XywgJ3Bvd01vZF8nOiBwb3dNb2RfLCAnZUdDRF8nOiBlR0NEXyxcblx0J2ludmVyc2VNb2RfJzogaW52ZXJzZU1vZF8sICdHQ0RfJzogR0NEXywgJ21vbnRfJzogbW9udF8sICdkaXZpZGVfJzogZGl2aWRlXyxcblx0J3NxdWFyZU1vZF8nOiBzcXVhcmVNb2RfLCAncmFuZFRydWVQcmltZV8nOiByYW5kVHJ1ZVByaW1lXyxcblx0J21pbGxlclJhYmluJzogbWlsbGVyUmFiaW5cbn07XG5cbn0pKCk7XG4iLCIoZnVuY3Rpb24gKGdsb2JhbCl7XG4vKipcbiAqIGxvZGFzaCAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IGpRdWVyeSBGb3VuZGF0aW9uIGFuZCBvdGhlciBjb250cmlidXRvcnMgPGh0dHBzOi8vanF1ZXJ5Lm9yZy8+XG4gKiBSZWxlYXNlZCB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKi9cblxuLyoqIFVzZWQgYXMgdGhlIHNpemUgdG8gZW5hYmxlIGxhcmdlIGFycmF5IG9wdGltaXphdGlvbnMuICovXG52YXIgTEFSR0VfQVJSQVlfU0laRSA9IDIwMDtcblxuLyoqIFVzZWQgdG8gc3RhbmQtaW4gZm9yIGB1bmRlZmluZWRgIGhhc2ggdmFsdWVzLiAqL1xudmFyIEhBU0hfVU5ERUZJTkVEID0gJ19fbG9kYXNoX2hhc2hfdW5kZWZpbmVkX18nO1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XScsXG4gICAgYm9vbFRhZyA9ICdbb2JqZWN0IEJvb2xlYW5dJyxcbiAgICBkYXRlVGFnID0gJ1tvYmplY3QgRGF0ZV0nLFxuICAgIGVycm9yVGFnID0gJ1tvYmplY3QgRXJyb3JdJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBnZW5UYWcgPSAnW29iamVjdCBHZW5lcmF0b3JGdW5jdGlvbl0nLFxuICAgIG1hcFRhZyA9ICdbb2JqZWN0IE1hcF0nLFxuICAgIG51bWJlclRhZyA9ICdbb2JqZWN0IE51bWJlcl0nLFxuICAgIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nLFxuICAgIHByb21pc2VUYWcgPSAnW29iamVjdCBQcm9taXNlXScsXG4gICAgcmVnZXhwVGFnID0gJ1tvYmplY3QgUmVnRXhwXScsXG4gICAgc2V0VGFnID0gJ1tvYmplY3QgU2V0XScsXG4gICAgc3RyaW5nVGFnID0gJ1tvYmplY3QgU3RyaW5nXScsXG4gICAgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXScsXG4gICAgd2Vha01hcFRhZyA9ICdbb2JqZWN0IFdlYWtNYXBdJztcblxudmFyIGFycmF5QnVmZmVyVGFnID0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJyxcbiAgICBkYXRhVmlld1RhZyA9ICdbb2JqZWN0IERhdGFWaWV3XScsXG4gICAgZmxvYXQzMlRhZyA9ICdbb2JqZWN0IEZsb2F0MzJBcnJheV0nLFxuICAgIGZsb2F0NjRUYWcgPSAnW29iamVjdCBGbG9hdDY0QXJyYXldJyxcbiAgICBpbnQ4VGFnID0gJ1tvYmplY3QgSW50OEFycmF5XScsXG4gICAgaW50MTZUYWcgPSAnW29iamVjdCBJbnQxNkFycmF5XScsXG4gICAgaW50MzJUYWcgPSAnW29iamVjdCBJbnQzMkFycmF5XScsXG4gICAgdWludDhUYWcgPSAnW29iamVjdCBVaW50OEFycmF5XScsXG4gICAgdWludDhDbGFtcGVkVGFnID0gJ1tvYmplY3QgVWludDhDbGFtcGVkQXJyYXldJyxcbiAgICB1aW50MTZUYWcgPSAnW29iamVjdCBVaW50MTZBcnJheV0nLFxuICAgIHVpbnQzMlRhZyA9ICdbb2JqZWN0IFVpbnQzMkFycmF5XSc7XG5cbi8qKlxuICogVXNlZCB0byBtYXRjaCBgUmVnRXhwYFxuICogW3N5bnRheCBjaGFyYWN0ZXJzXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1wYXR0ZXJucykuXG4gKi9cbnZhciByZVJlZ0V4cENoYXIgPSAvW1xcXFxeJC4qKz8oKVtcXF17fXxdL2c7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGBSZWdFeHBgIGZsYWdzIGZyb20gdGhlaXIgY29lcmNlZCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlRmxhZ3MgPSAvXFx3KiQvO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaG9zdCBjb25zdHJ1Y3RvcnMgKFNhZmFyaSkuICovXG52YXIgcmVJc0hvc3RDdG9yID0gL15cXFtvYmplY3QgLis/Q29uc3RydWN0b3JcXF0kLztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IHVuc2lnbmVkIGludGVnZXIgdmFsdWVzLiAqL1xudmFyIHJlSXNVaW50ID0gL14oPzowfFsxLTldXFxkKikkLztcblxuLyoqIFVzZWQgdG8gaWRlbnRpZnkgYHRvU3RyaW5nVGFnYCB2YWx1ZXMgb2YgdHlwZWQgYXJyYXlzLiAqL1xudmFyIHR5cGVkQXJyYXlUYWdzID0ge307XG50eXBlZEFycmF5VGFnc1tmbG9hdDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Zsb2F0NjRUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDhUYWddID0gdHlwZWRBcnJheVRhZ3NbaW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQ4VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50OENsYW1wZWRUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDE2VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50MzJUYWddID0gdHJ1ZTtcbnR5cGVkQXJyYXlUYWdzW2FyZ3NUYWddID0gdHlwZWRBcnJheVRhZ3NbYXJyYXlUYWddID1cbnR5cGVkQXJyYXlUYWdzW2FycmF5QnVmZmVyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Jvb2xUYWddID1cbnR5cGVkQXJyYXlUYWdzW2RhdGFWaWV3VGFnXSA9IHR5cGVkQXJyYXlUYWdzW2RhdGVUYWddID1cbnR5cGVkQXJyYXlUYWdzW2Vycm9yVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Z1bmNUYWddID1cbnR5cGVkQXJyYXlUYWdzW21hcFRhZ10gPSB0eXBlZEFycmF5VGFnc1tudW1iZXJUYWddID1cbnR5cGVkQXJyYXlUYWdzW29iamVjdFRhZ10gPSB0eXBlZEFycmF5VGFnc1tyZWdleHBUYWddID1cbnR5cGVkQXJyYXlUYWdzW3NldFRhZ10gPSB0eXBlZEFycmF5VGFnc1tzdHJpbmdUYWddID1cbnR5cGVkQXJyYXlUYWdzW3dlYWtNYXBUYWddID0gZmFsc2U7XG5cbi8qKiBVc2VkIHRvIGlkZW50aWZ5IGB0b1N0cmluZ1RhZ2AgdmFsdWVzIHN1cHBvcnRlZCBieSBgXy5jbG9uZWAuICovXG52YXIgY2xvbmVhYmxlVGFncyA9IHt9O1xuY2xvbmVhYmxlVGFnc1thcmdzVGFnXSA9IGNsb25lYWJsZVRhZ3NbYXJyYXlUYWddID1cbmNsb25lYWJsZVRhZ3NbYXJyYXlCdWZmZXJUYWddID0gY2xvbmVhYmxlVGFnc1tkYXRhVmlld1RhZ10gPVxuY2xvbmVhYmxlVGFnc1tib29sVGFnXSA9IGNsb25lYWJsZVRhZ3NbZGF0ZVRhZ10gPVxuY2xvbmVhYmxlVGFnc1tmbG9hdDMyVGFnXSA9IGNsb25lYWJsZVRhZ3NbZmxvYXQ2NFRhZ10gPVxuY2xvbmVhYmxlVGFnc1tpbnQ4VGFnXSA9IGNsb25lYWJsZVRhZ3NbaW50MTZUYWddID1cbmNsb25lYWJsZVRhZ3NbaW50MzJUYWddID0gY2xvbmVhYmxlVGFnc1ttYXBUYWddID1cbmNsb25lYWJsZVRhZ3NbbnVtYmVyVGFnXSA9IGNsb25lYWJsZVRhZ3Nbb2JqZWN0VGFnXSA9XG5jbG9uZWFibGVUYWdzW3JlZ2V4cFRhZ10gPSBjbG9uZWFibGVUYWdzW3NldFRhZ10gPVxuY2xvbmVhYmxlVGFnc1tzdHJpbmdUYWddID0gY2xvbmVhYmxlVGFnc1tzeW1ib2xUYWddID1cbmNsb25lYWJsZVRhZ3NbdWludDhUYWddID0gY2xvbmVhYmxlVGFnc1t1aW50OENsYW1wZWRUYWddID1cbmNsb25lYWJsZVRhZ3NbdWludDE2VGFnXSA9IGNsb25lYWJsZVRhZ3NbdWludDMyVGFnXSA9IHRydWU7XG5jbG9uZWFibGVUYWdzW2Vycm9yVGFnXSA9IGNsb25lYWJsZVRhZ3NbZnVuY1RhZ10gPVxuY2xvbmVhYmxlVGFnc1t3ZWFrTWFwVGFnXSA9IGZhbHNlO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZXhwb3J0c2AuICovXG52YXIgZnJlZUV4cG9ydHMgPSB0eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyAmJiBleHBvcnRzICYmICFleHBvcnRzLm5vZGVUeXBlICYmIGV4cG9ydHM7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgbW9kdWxlYC4gKi9cbnZhciBmcmVlTW9kdWxlID0gZnJlZUV4cG9ydHMgJiYgdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiYgIW1vZHVsZS5ub2RlVHlwZSAmJiBtb2R1bGU7XG5cbi8qKiBEZXRlY3QgdGhlIHBvcHVsYXIgQ29tbW9uSlMgZXh0ZW5zaW9uIGBtb2R1bGUuZXhwb3J0c2AuICovXG52YXIgbW9kdWxlRXhwb3J0cyA9IGZyZWVNb2R1bGUgJiYgZnJlZU1vZHVsZS5leHBvcnRzID09PSBmcmVlRXhwb3J0cztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBwcm9jZXNzYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZVByb2Nlc3MgPSBtb2R1bGVFeHBvcnRzICYmIGZyZWVHbG9iYWwucHJvY2VzcztcblxuLyoqIFVzZWQgdG8gYWNjZXNzIGZhc3RlciBOb2RlLmpzIGhlbHBlcnMuICovXG52YXIgbm9kZVV0aWwgPSAoZnVuY3Rpb24oKSB7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGZyZWVQcm9jZXNzICYmIGZyZWVQcm9jZXNzLmJpbmRpbmcoJ3V0aWwnKTtcbiAgfSBjYXRjaCAoZSkge31cbn0oKSk7XG5cbi8qIE5vZGUuanMgaGVscGVyIHJlZmVyZW5jZXMuICovXG52YXIgbm9kZUlzVHlwZWRBcnJheSA9IG5vZGVVdGlsICYmIG5vZGVVdGlsLmlzVHlwZWRBcnJheTtcblxuLyoqXG4gKiBBZGRzIHRoZSBrZXktdmFsdWUgYHBhaXJgIHRvIGBtYXBgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gbWFwIFRoZSBtYXAgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtBcnJheX0gcGFpciBUaGUga2V5LXZhbHVlIHBhaXIgdG8gYWRkLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgbWFwYC5cbiAqL1xuZnVuY3Rpb24gYWRkTWFwRW50cnkobWFwLCBwYWlyKSB7XG4gIC8vIERvbid0IHJldHVybiBgbWFwLnNldGAgYmVjYXVzZSBpdCdzIG5vdCBjaGFpbmFibGUgaW4gSUUgMTEuXG4gIG1hcC5zZXQocGFpclswXSwgcGFpclsxXSk7XG4gIHJldHVybiBtYXA7XG59XG5cbi8qKlxuICogQWRkcyBgdmFsdWVgIHRvIGBzZXRgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc2V0IFRoZSBzZXQgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gYWRkLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgc2V0YC5cbiAqL1xuZnVuY3Rpb24gYWRkU2V0RW50cnkoc2V0LCB2YWx1ZSkge1xuICAvLyBEb24ndCByZXR1cm4gYHNldC5hZGRgIGJlY2F1c2UgaXQncyBub3QgY2hhaW5hYmxlIGluIElFIDExLlxuICBzZXQuYWRkKHZhbHVlKTtcbiAgcmV0dXJuIHNldDtcbn1cblxuLyoqXG4gKiBBIGZhc3RlciBhbHRlcm5hdGl2ZSB0byBgRnVuY3Rpb24jYXBwbHlgLCB0aGlzIGZ1bmN0aW9uIGludm9rZXMgYGZ1bmNgXG4gKiB3aXRoIHRoZSBgdGhpc2AgYmluZGluZyBvZiBgdGhpc0FyZ2AgYW5kIHRoZSBhcmd1bWVudHMgb2YgYGFyZ3NgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBpbnZva2UuXG4gKiBAcGFyYW0geyp9IHRoaXNBcmcgVGhlIGB0aGlzYCBiaW5kaW5nIG9mIGBmdW5jYC5cbiAqIEBwYXJhbSB7QXJyYXl9IGFyZ3MgVGhlIGFyZ3VtZW50cyB0byBpbnZva2UgYGZ1bmNgIHdpdGguXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmVzdWx0IG9mIGBmdW5jYC5cbiAqL1xuZnVuY3Rpb24gYXBwbHkoZnVuYywgdGhpc0FyZywgYXJncykge1xuICBzd2l0Y2ggKGFyZ3MubGVuZ3RoKSB7XG4gICAgY2FzZSAwOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcpO1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhcmdzWzBdKTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFyZ3NbMF0sIGFyZ3NbMV0sIGFyZ3NbMl0pO1xuICB9XG4gIHJldHVybiBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5mb3JFYWNoYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3JcbiAqIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlFYWNoKGFycmF5LCBpdGVyYXRlZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChpdGVyYXRlZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSkgPT09IGZhbHNlKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG4vKipcbiAqIEFwcGVuZHMgdGhlIGVsZW1lbnRzIG9mIGB2YWx1ZXNgIHRvIGBhcnJheWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge0FycmF5fSB2YWx1ZXMgVGhlIHZhbHVlcyB0byBhcHBlbmQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYXJyYXlQdXNoKGFycmF5LCB2YWx1ZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSB2YWx1ZXMubGVuZ3RoLFxuICAgICAgb2Zmc2V0ID0gYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgYXJyYXlbb2Zmc2V0ICsgaW5kZXhdID0gdmFsdWVzW2luZGV4XTtcbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLnJlZHVjZWAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yXG4gKiBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHsqfSBbYWNjdW11bGF0b3JdIFRoZSBpbml0aWFsIHZhbHVlLlxuICogQHBhcmFtIHtib29sZWFufSBbaW5pdEFjY3VtXSBTcGVjaWZ5IHVzaW5nIHRoZSBmaXJzdCBlbGVtZW50IG9mIGBhcnJheWAgYXNcbiAqICB0aGUgaW5pdGlhbCB2YWx1ZS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBhY2N1bXVsYXRlZCB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gYXJyYXlSZWR1Y2UoYXJyYXksIGl0ZXJhdGVlLCBhY2N1bXVsYXRvciwgaW5pdEFjY3VtKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwO1xuXG4gIGlmIChpbml0QWNjdW0gJiYgbGVuZ3RoKSB7XG4gICAgYWNjdW11bGF0b3IgPSBhcnJheVsrK2luZGV4XTtcbiAgfVxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGFjY3VtdWxhdG9yID0gaXRlcmF0ZWUoYWNjdW11bGF0b3IsIGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KTtcbiAgfVxuICByZXR1cm4gYWNjdW11bGF0b3I7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udGltZXNgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kc1xuICogb3IgbWF4IGFycmF5IGxlbmd0aCBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBudW1iZXIgb2YgdGltZXMgdG8gaW52b2tlIGBpdGVyYXRlZWAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiByZXN1bHRzLlxuICovXG5mdW5jdGlvbiBiYXNlVGltZXMobiwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBBcnJheShuKTtcblxuICB3aGlsZSAoKytpbmRleCA8IG4pIHtcbiAgICByZXN1bHRbaW5kZXhdID0gaXRlcmF0ZWUoaW5kZXgpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udW5hcnlgIHdpdGhvdXQgc3VwcG9ydCBmb3Igc3RvcmluZyBtZXRhZGF0YS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY2FwIGFyZ3VtZW50cyBmb3IuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBjYXBwZWQgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VVbmFyeShmdW5jKSB7XG4gIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBmdW5jKHZhbHVlKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSB2YWx1ZSBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBwcm9wZXJ0eSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gZ2V0VmFsdWUob2JqZWN0LCBrZXkpIHtcbiAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBob3N0IG9iamVjdCBpbiBJRSA8IDkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBob3N0IG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0hvc3RPYmplY3QodmFsdWUpIHtcbiAgLy8gTWFueSBob3N0IG9iamVjdHMgYXJlIGBPYmplY3RgIG9iamVjdHMgdGhhdCBjYW4gY29lcmNlIHRvIHN0cmluZ3NcbiAgLy8gZGVzcGl0ZSBoYXZpbmcgaW1wcm9wZXJseSBkZWZpbmVkIGB0b1N0cmluZ2AgbWV0aG9kcy5cbiAgdmFyIHJlc3VsdCA9IGZhbHNlO1xuICBpZiAodmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUudG9TdHJpbmcgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRyeSB7XG4gICAgICByZXN1bHQgPSAhISh2YWx1ZSArICcnKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ29udmVydHMgYG1hcGAgdG8gaXRzIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG1hcCBUaGUgbWFwIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGtleS12YWx1ZSBwYWlycy5cbiAqL1xuZnVuY3Rpb24gbWFwVG9BcnJheShtYXApIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBBcnJheShtYXAuc2l6ZSk7XG5cbiAgbWFwLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIGtleSkge1xuICAgIHJlc3VsdFsrK2luZGV4XSA9IFtrZXksIHZhbHVlXTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIHVuYXJ5IGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCBpdHMgYXJndW1lbnQgdHJhbnNmb3JtZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm0gVGhlIGFyZ3VtZW50IHRyYW5zZm9ybS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBvdmVyQXJnKGZ1bmMsIHRyYW5zZm9ybSkge1xuICByZXR1cm4gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIGZ1bmModHJhbnNmb3JtKGFyZykpO1xuICB9O1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGBzZXRgIHRvIGFuIGFycmF5IG9mIGl0cyB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzZXQgVGhlIHNldCB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSB2YWx1ZXMuXG4gKi9cbmZ1bmN0aW9uIHNldFRvQXJyYXkoc2V0KSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkoc2V0LnNpemUpO1xuXG4gIHNldC5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmVzdWx0WysraW5kZXhdID0gdmFsdWU7XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgYXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZSxcbiAgICBmdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGUsXG4gICAgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgb3ZlcnJlYWNoaW5nIGNvcmUtanMgc2hpbXMuICovXG52YXIgY29yZUpzRGF0YSA9IHJvb3RbJ19fY29yZS1qc19zaGFyZWRfXyddO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgbWV0aG9kcyBtYXNxdWVyYWRpbmcgYXMgbmF0aXZlLiAqL1xudmFyIG1hc2tTcmNLZXkgPSAoZnVuY3Rpb24oKSB7XG4gIHZhciB1aWQgPSAvW14uXSskLy5leGVjKGNvcmVKc0RhdGEgJiYgY29yZUpzRGF0YS5rZXlzICYmIGNvcmVKc0RhdGEua2V5cy5JRV9QUk9UTyB8fCAnJyk7XG4gIHJldHVybiB1aWQgPyAoJ1N5bWJvbChzcmMpXzEuJyArIHVpZCkgOiAnJztcbn0oKSk7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmdW5jVG9TdHJpbmcgPSBmdW5jUHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKiBVc2VkIHRvIGluZmVyIHRoZSBgT2JqZWN0YCBjb25zdHJ1Y3Rvci4gKi9cbnZhciBvYmplY3RDdG9yU3RyaW5nID0gZnVuY1RvU3RyaW5nLmNhbGwoT2JqZWN0KTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBpZiBhIG1ldGhvZCBpcyBuYXRpdmUuICovXG52YXIgcmVJc05hdGl2ZSA9IFJlZ0V4cCgnXicgK1xuICBmdW5jVG9TdHJpbmcuY2FsbChoYXNPd25Qcm9wZXJ0eSkucmVwbGFjZShyZVJlZ0V4cENoYXIsICdcXFxcJCYnKVxuICAucmVwbGFjZSgvaGFzT3duUHJvcGVydHl8KGZ1bmN0aW9uKS4qPyg/PVxcXFxcXCgpfCBmb3IgLis/KD89XFxcXFxcXSkvZywgJyQxLio/JykgKyAnJCdcbik7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIEJ1ZmZlciA9IG1vZHVsZUV4cG9ydHMgPyByb290LkJ1ZmZlciA6IHVuZGVmaW5lZCxcbiAgICBTeW1ib2wgPSByb290LlN5bWJvbCxcbiAgICBVaW50OEFycmF5ID0gcm9vdC5VaW50OEFycmF5LFxuICAgIGdldFByb3RvdHlwZSA9IG92ZXJBcmcoT2JqZWN0LmdldFByb3RvdHlwZU9mLCBPYmplY3QpLFxuICAgIG9iamVjdENyZWF0ZSA9IE9iamVjdC5jcmVhdGUsXG4gICAgcHJvcGVydHlJc0VudW1lcmFibGUgPSBvYmplY3RQcm90by5wcm9wZXJ0eUlzRW51bWVyYWJsZSxcbiAgICBzcGxpY2UgPSBhcnJheVByb3RvLnNwbGljZTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUdldFN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzLFxuICAgIG5hdGl2ZUlzQnVmZmVyID0gQnVmZmVyID8gQnVmZmVyLmlzQnVmZmVyIDogdW5kZWZpbmVkLFxuICAgIG5hdGl2ZUtleXMgPSBvdmVyQXJnKE9iamVjdC5rZXlzLCBPYmplY3QpLFxuICAgIG5hdGl2ZU1heCA9IE1hdGgubWF4O1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgRGF0YVZpZXcgPSBnZXROYXRpdmUocm9vdCwgJ0RhdGFWaWV3JyksXG4gICAgTWFwID0gZ2V0TmF0aXZlKHJvb3QsICdNYXAnKSxcbiAgICBQcm9taXNlID0gZ2V0TmF0aXZlKHJvb3QsICdQcm9taXNlJyksXG4gICAgU2V0ID0gZ2V0TmF0aXZlKHJvb3QsICdTZXQnKSxcbiAgICBXZWFrTWFwID0gZ2V0TmF0aXZlKHJvb3QsICdXZWFrTWFwJyksXG4gICAgbmF0aXZlQ3JlYXRlID0gZ2V0TmF0aXZlKE9iamVjdCwgJ2NyZWF0ZScpO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgbWFwcywgc2V0cywgYW5kIHdlYWttYXBzLiAqL1xudmFyIGRhdGFWaWV3Q3RvclN0cmluZyA9IHRvU291cmNlKERhdGFWaWV3KSxcbiAgICBtYXBDdG9yU3RyaW5nID0gdG9Tb3VyY2UoTWFwKSxcbiAgICBwcm9taXNlQ3RvclN0cmluZyA9IHRvU291cmNlKFByb21pc2UpLFxuICAgIHNldEN0b3JTdHJpbmcgPSB0b1NvdXJjZShTZXQpLFxuICAgIHdlYWtNYXBDdG9yU3RyaW5nID0gdG9Tb3VyY2UoV2Vha01hcCk7XG5cbi8qKiBVc2VkIHRvIGNvbnZlcnQgc3ltYm9scyB0byBwcmltaXRpdmVzIGFuZCBzdHJpbmdzLiAqL1xudmFyIHN5bWJvbFByb3RvID0gU3ltYm9sID8gU3ltYm9sLnByb3RvdHlwZSA6IHVuZGVmaW5lZCxcbiAgICBzeW1ib2xWYWx1ZU9mID0gc3ltYm9sUHJvdG8gPyBzeW1ib2xQcm90by52YWx1ZU9mIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBoYXNoIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gSGFzaChlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA/IGVudHJpZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIGhhc2guXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgSGFzaFxuICovXG5mdW5jdGlvbiBoYXNoQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSBuYXRpdmVDcmVhdGUgPyBuYXRpdmVDcmVhdGUobnVsbCkgOiB7fTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgaGFzaC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtPYmplY3R9IGhhc2ggVGhlIGhhc2ggdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc2hEZWxldGUoa2V5KSB7XG4gIHJldHVybiB0aGlzLmhhcyhrZXkpICYmIGRlbGV0ZSB0aGlzLl9fZGF0YV9fW2tleV07XG59XG5cbi8qKlxuICogR2V0cyB0aGUgaGFzaCB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBoYXNoR2V0KGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIGlmIChuYXRpdmVDcmVhdGUpIHtcbiAgICB2YXIgcmVzdWx0ID0gZGF0YVtrZXldO1xuICAgIHJldHVybiByZXN1bHQgPT09IEhBU0hfVU5ERUZJTkVEID8gdW5kZWZpbmVkIDogcmVzdWx0O1xuICB9XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSkgPyBkYXRhW2tleV0gOiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgaGFzaCB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzaEhhcyhrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICByZXR1cm4gbmF0aXZlQ3JlYXRlID8gZGF0YVtrZXldICE9PSB1bmRlZmluZWQgOiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSk7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgaGFzaCBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGhhc2ggaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIGhhc2hTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIGRhdGFba2V5XSA9IChuYXRpdmVDcmVhdGUgJiYgdmFsdWUgPT09IHVuZGVmaW5lZCkgPyBIQVNIX1VOREVGSU5FRCA6IHZhbHVlO1xuICByZXR1cm4gdGhpcztcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYEhhc2hgLlxuSGFzaC5wcm90b3R5cGUuY2xlYXIgPSBoYXNoQ2xlYXI7XG5IYXNoLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBoYXNoRGVsZXRlO1xuSGFzaC5wcm90b3R5cGUuZ2V0ID0gaGFzaEdldDtcbkhhc2gucHJvdG90eXBlLmhhcyA9IGhhc2hIYXM7XG5IYXNoLnByb3RvdHlwZS5zZXQgPSBoYXNoU2V0O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gbGlzdCBjYWNoZSBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIExpc3RDYWNoZShlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA/IGVudHJpZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIGxpc3QgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUNsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gW107XG59XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIGxpc3QgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZURlbGV0ZShrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICBpZiAoaW5kZXggPCAwKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBsYXN0SW5kZXggPSBkYXRhLmxlbmd0aCAtIDE7XG4gIGlmIChpbmRleCA9PSBsYXN0SW5kZXgpIHtcbiAgICBkYXRhLnBvcCgpO1xuICB9IGVsc2Uge1xuICAgIHNwbGljZS5jYWxsKGRhdGEsIGluZGV4LCAxKTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBsaXN0IGNhY2hlIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlR2V0KGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIHJldHVybiBpbmRleCA8IDAgPyB1bmRlZmluZWQgOiBkYXRhW2luZGV4XVsxXTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBsaXN0IGNhY2hlIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUhhcyhrZXkpIHtcbiAgcmV0dXJuIGFzc29jSW5kZXhPZih0aGlzLl9fZGF0YV9fLCBrZXkpID4gLTE7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgbGlzdCBjYWNoZSBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbGlzdCBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICBpZiAoaW5kZXggPCAwKSB7XG4gICAgZGF0YS5wdXNoKFtrZXksIHZhbHVlXSk7XG4gIH0gZWxzZSB7XG4gICAgZGF0YVtpbmRleF1bMV0gPSB2YWx1ZTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYExpc3RDYWNoZWAuXG5MaXN0Q2FjaGUucHJvdG90eXBlLmNsZWFyID0gbGlzdENhY2hlQ2xlYXI7XG5MaXN0Q2FjaGUucHJvdG90eXBlWydkZWxldGUnXSA9IGxpc3RDYWNoZURlbGV0ZTtcbkxpc3RDYWNoZS5wcm90b3R5cGUuZ2V0ID0gbGlzdENhY2hlR2V0O1xuTGlzdENhY2hlLnByb3RvdHlwZS5oYXMgPSBsaXN0Q2FjaGVIYXM7XG5MaXN0Q2FjaGUucHJvdG90eXBlLnNldCA9IGxpc3RDYWNoZVNldDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbWFwIGNhY2hlIG9iamVjdCB0byBzdG9yZSBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIE1hcENhY2hlKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID8gZW50cmllcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgbWFwLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSB7XG4gICAgJ2hhc2gnOiBuZXcgSGFzaCxcbiAgICAnbWFwJzogbmV3IChNYXAgfHwgTGlzdENhY2hlKSxcbiAgICAnc3RyaW5nJzogbmV3IEhhc2hcbiAgfTtcbn1cblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgbWFwLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlRGVsZXRlKGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpWydkZWxldGUnXShrZXkpO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIG1hcCB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVHZXQoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSkuZ2V0KGtleSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbWFwIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVIYXMoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSkuaGFzKGtleSk7XG59XG5cbi8qKlxuICogU2V0cyB0aGUgbWFwIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIG1hcCBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVTZXQoa2V5LCB2YWx1ZSkge1xuICBnZXRNYXBEYXRhKHRoaXMsIGtleSkuc2V0KGtleSwgdmFsdWUpO1xuICByZXR1cm4gdGhpcztcbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYE1hcENhY2hlYC5cbk1hcENhY2hlLnByb3RvdHlwZS5jbGVhciA9IG1hcENhY2hlQ2xlYXI7XG5NYXBDYWNoZS5wcm90b3R5cGVbJ2RlbGV0ZSddID0gbWFwQ2FjaGVEZWxldGU7XG5NYXBDYWNoZS5wcm90b3R5cGUuZ2V0ID0gbWFwQ2FjaGVHZXQ7XG5NYXBDYWNoZS5wcm90b3R5cGUuaGFzID0gbWFwQ2FjaGVIYXM7XG5NYXBDYWNoZS5wcm90b3R5cGUuc2V0ID0gbWFwQ2FjaGVTZXQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhIHN0YWNrIGNhY2hlIG9iamVjdCB0byBzdG9yZSBrZXktdmFsdWUgcGFpcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIFN0YWNrKGVudHJpZXMpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IG5ldyBMaXN0Q2FjaGUoZW50cmllcyk7XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgc3RhY2suXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqL1xuZnVuY3Rpb24gc3RhY2tDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IG5ldyBMaXN0Q2FjaGU7XG59XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIHN0YWNrLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrRGVsZXRlKGtleSkge1xuICByZXR1cm4gdGhpcy5fX2RhdGFfX1snZGVsZXRlJ10oa2V5KTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBzdGFjayB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gc3RhY2tHZXQoa2V5KSB7XG4gIHJldHVybiB0aGlzLl9fZGF0YV9fLmdldChrZXkpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIHN0YWNrIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gc3RhY2tIYXMoa2V5KSB7XG4gIHJldHVybiB0aGlzLl9fZGF0YV9fLmhhcyhrZXkpO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIHN0YWNrIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIHN0YWNrIGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBzdGFja1NldChrZXksIHZhbHVlKSB7XG4gIHZhciBjYWNoZSA9IHRoaXMuX19kYXRhX187XG4gIGlmIChjYWNoZSBpbnN0YW5jZW9mIExpc3RDYWNoZSkge1xuICAgIHZhciBwYWlycyA9IGNhY2hlLl9fZGF0YV9fO1xuICAgIGlmICghTWFwIHx8IChwYWlycy5sZW5ndGggPCBMQVJHRV9BUlJBWV9TSVpFIC0gMSkpIHtcbiAgICAgIHBhaXJzLnB1c2goW2tleSwgdmFsdWVdKTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBjYWNoZSA9IHRoaXMuX19kYXRhX18gPSBuZXcgTWFwQ2FjaGUocGFpcnMpO1xuICB9XG4gIGNhY2hlLnNldChrZXksIHZhbHVlKTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBTdGFja2AuXG5TdGFjay5wcm90b3R5cGUuY2xlYXIgPSBzdGFja0NsZWFyO1xuU3RhY2sucHJvdG90eXBlWydkZWxldGUnXSA9IHN0YWNrRGVsZXRlO1xuU3RhY2sucHJvdG90eXBlLmdldCA9IHN0YWNrR2V0O1xuU3RhY2sucHJvdG90eXBlLmhhcyA9IHN0YWNrSGFzO1xuU3RhY2sucHJvdG90eXBlLnNldCA9IHN0YWNrU2V0O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgdGhlIGFycmF5LWxpa2UgYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGluaGVyaXRlZCBTcGVjaWZ5IHJldHVybmluZyBpbmhlcml0ZWQgcHJvcGVydHkgbmFtZXMuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBhcnJheUxpa2VLZXlzKHZhbHVlLCBpbmhlcml0ZWQpIHtcbiAgLy8gU2FmYXJpIDguMSBtYWtlcyBgYXJndW1lbnRzLmNhbGxlZWAgZW51bWVyYWJsZSBpbiBzdHJpY3QgbW9kZS5cbiAgLy8gU2FmYXJpIDkgbWFrZXMgYGFyZ3VtZW50cy5sZW5ndGhgIGVudW1lcmFibGUgaW4gc3RyaWN0IG1vZGUuXG4gIHZhciByZXN1bHQgPSAoaXNBcnJheSh2YWx1ZSkgfHwgaXNBcmd1bWVudHModmFsdWUpKVxuICAgID8gYmFzZVRpbWVzKHZhbHVlLmxlbmd0aCwgU3RyaW5nKVxuICAgIDogW107XG5cbiAgdmFyIGxlbmd0aCA9IHJlc3VsdC5sZW5ndGgsXG4gICAgICBza2lwSW5kZXhlcyA9ICEhbGVuZ3RoO1xuXG4gIGZvciAodmFyIGtleSBpbiB2YWx1ZSkge1xuICAgIGlmICgoaW5oZXJpdGVkIHx8IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIGtleSkpICYmXG4gICAgICAgICEoc2tpcEluZGV4ZXMgJiYgKGtleSA9PSAnbGVuZ3RoJyB8fCBpc0luZGV4KGtleSwgbGVuZ3RoKSkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gaXMgbGlrZSBgYXNzaWduVmFsdWVgIGV4Y2VwdCB0aGF0IGl0IGRvZXNuJ3QgYXNzaWduXG4gKiBgdW5kZWZpbmVkYCB2YWx1ZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGFzc2lnbi5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGFzc2lnbi5cbiAqL1xuZnVuY3Rpb24gYXNzaWduTWVyZ2VWYWx1ZShvYmplY3QsIGtleSwgdmFsdWUpIHtcbiAgaWYgKCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmICFlcShvYmplY3Rba2V5XSwgdmFsdWUpKSB8fFxuICAgICAgKHR5cGVvZiBrZXkgPT0gJ251bWJlcicgJiYgdmFsdWUgPT09IHVuZGVmaW5lZCAmJiAhKGtleSBpbiBvYmplY3QpKSkge1xuICAgIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIH1cbn1cblxuLyoqXG4gKiBBc3NpZ25zIGB2YWx1ZWAgdG8gYGtleWAgb2YgYG9iamVjdGAgaWYgdGhlIGV4aXN0aW5nIHZhbHVlIGlzIG5vdCBlcXVpdmFsZW50XG4gKiB1c2luZyBbYFNhbWVWYWx1ZVplcm9gXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1zYW1ldmFsdWV6ZXJvKVxuICogZm9yIGVxdWFsaXR5IGNvbXBhcmlzb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBhc3NpZ24uXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBhc3NpZ24uXG4gKi9cbmZ1bmN0aW9uIGFzc2lnblZhbHVlKG9iamVjdCwga2V5LCB2YWx1ZSkge1xuICB2YXIgb2JqVmFsdWUgPSBvYmplY3Rba2V5XTtcbiAgaWYgKCEoaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkgJiYgZXEob2JqVmFsdWUsIHZhbHVlKSkgfHxcbiAgICAgICh2YWx1ZSA9PT0gdW5kZWZpbmVkICYmICEoa2V5IGluIG9iamVjdCkpKSB7XG4gICAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgfVxufVxuXG4vKipcbiAqIEdldHMgdGhlIGluZGV4IGF0IHdoaWNoIHRoZSBga2V5YCBpcyBmb3VuZCBpbiBgYXJyYXlgIG9mIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0geyp9IGtleSBUaGUga2V5IHRvIHNlYXJjaCBmb3IuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBhc3NvY0luZGV4T2YoYXJyYXksIGtleSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICBpZiAoZXEoYXJyYXlbbGVuZ3RoXVswXSwga2V5KSkge1xuICAgICAgcmV0dXJuIGxlbmd0aDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmFzc2lnbmAgd2l0aG91dCBzdXBwb3J0IGZvciBtdWx0aXBsZSBzb3VyY2VzXG4gKiBvciBgY3VzdG9taXplcmAgZnVuY3Rpb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqL1xuZnVuY3Rpb24gYmFzZUFzc2lnbihvYmplY3QsIHNvdXJjZSkge1xuICByZXR1cm4gb2JqZWN0ICYmIGNvcHlPYmplY3Qoc291cmNlLCBrZXlzKHNvdXJjZSksIG9iamVjdCk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uY2xvbmVgIGFuZCBgXy5jbG9uZURlZXBgIHdoaWNoIHRyYWNrc1xuICogdHJhdmVyc2VkIG9iamVjdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNsb25lLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBjbG9uZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRnVsbF0gU3BlY2lmeSBhIGNsb25lIGluY2x1ZGluZyBzeW1ib2xzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY2xvbmluZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBba2V5XSBUaGUga2V5IG9mIGB2YWx1ZWAuXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIHBhcmVudCBvYmplY3Qgb2YgYHZhbHVlYC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhY2tdIFRyYWNrcyB0cmF2ZXJzZWQgb2JqZWN0cyBhbmQgdGhlaXIgY2xvbmUgY291bnRlcnBhcnRzLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGNsb25lZCB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gYmFzZUNsb25lKHZhbHVlLCBpc0RlZXAsIGlzRnVsbCwgY3VzdG9taXplciwga2V5LCBvYmplY3QsIHN0YWNrKSB7XG4gIHZhciByZXN1bHQ7XG4gIGlmIChjdXN0b21pemVyKSB7XG4gICAgcmVzdWx0ID0gb2JqZWN0ID8gY3VzdG9taXplcih2YWx1ZSwga2V5LCBvYmplY3QsIHN0YWNrKSA6IGN1c3RvbWl6ZXIodmFsdWUpO1xuICB9XG4gIGlmIChyZXN1bHQgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgaWYgKCFpc09iamVjdCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgdmFyIGlzQXJyID0gaXNBcnJheSh2YWx1ZSk7XG4gIGlmIChpc0Fycikge1xuICAgIHJlc3VsdCA9IGluaXRDbG9uZUFycmF5KHZhbHVlKTtcbiAgICBpZiAoIWlzRGVlcCkge1xuICAgICAgcmV0dXJuIGNvcHlBcnJheSh2YWx1ZSwgcmVzdWx0KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIHRhZyA9IGdldFRhZyh2YWx1ZSksXG4gICAgICAgIGlzRnVuYyA9IHRhZyA9PSBmdW5jVGFnIHx8IHRhZyA9PSBnZW5UYWc7XG5cbiAgICBpZiAoaXNCdWZmZXIodmFsdWUpKSB7XG4gICAgICByZXR1cm4gY2xvbmVCdWZmZXIodmFsdWUsIGlzRGVlcCk7XG4gICAgfVxuICAgIGlmICh0YWcgPT0gb2JqZWN0VGFnIHx8IHRhZyA9PSBhcmdzVGFnIHx8IChpc0Z1bmMgJiYgIW9iamVjdCkpIHtcbiAgICAgIGlmIChpc0hvc3RPYmplY3QodmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBvYmplY3QgPyB2YWx1ZSA6IHt9O1xuICAgICAgfVxuICAgICAgcmVzdWx0ID0gaW5pdENsb25lT2JqZWN0KGlzRnVuYyA/IHt9IDogdmFsdWUpO1xuICAgICAgaWYgKCFpc0RlZXApIHtcbiAgICAgICAgcmV0dXJuIGNvcHlTeW1ib2xzKHZhbHVlLCBiYXNlQXNzaWduKHJlc3VsdCwgdmFsdWUpKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFjbG9uZWFibGVUYWdzW3RhZ10pIHtcbiAgICAgICAgcmV0dXJuIG9iamVjdCA/IHZhbHVlIDoge307XG4gICAgICB9XG4gICAgICByZXN1bHQgPSBpbml0Q2xvbmVCeVRhZyh2YWx1ZSwgdGFnLCBiYXNlQ2xvbmUsIGlzRGVlcCk7XG4gICAgfVxuICB9XG4gIC8vIENoZWNrIGZvciBjaXJjdWxhciByZWZlcmVuY2VzIGFuZCByZXR1cm4gaXRzIGNvcnJlc3BvbmRpbmcgY2xvbmUuXG4gIHN0YWNrIHx8IChzdGFjayA9IG5ldyBTdGFjayk7XG4gIHZhciBzdGFja2VkID0gc3RhY2suZ2V0KHZhbHVlKTtcbiAgaWYgKHN0YWNrZWQpIHtcbiAgICByZXR1cm4gc3RhY2tlZDtcbiAgfVxuICBzdGFjay5zZXQodmFsdWUsIHJlc3VsdCk7XG5cbiAgaWYgKCFpc0Fycikge1xuICAgIHZhciBwcm9wcyA9IGlzRnVsbCA/IGdldEFsbEtleXModmFsdWUpIDoga2V5cyh2YWx1ZSk7XG4gIH1cbiAgYXJyYXlFYWNoKHByb3BzIHx8IHZhbHVlLCBmdW5jdGlvbihzdWJWYWx1ZSwga2V5KSB7XG4gICAgaWYgKHByb3BzKSB7XG4gICAgICBrZXkgPSBzdWJWYWx1ZTtcbiAgICAgIHN1YlZhbHVlID0gdmFsdWVba2V5XTtcbiAgICB9XG4gICAgLy8gUmVjdXJzaXZlbHkgcG9wdWxhdGUgY2xvbmUgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICBhc3NpZ25WYWx1ZShyZXN1bHQsIGtleSwgYmFzZUNsb25lKHN1YlZhbHVlLCBpc0RlZXAsIGlzRnVsbCwgY3VzdG9taXplciwga2V5LCB2YWx1ZSwgc3RhY2spKTtcbiAgfSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uY3JlYXRlYCB3aXRob3V0IHN1cHBvcnQgZm9yIGFzc2lnbmluZ1xuICogcHJvcGVydGllcyB0byB0aGUgY3JlYXRlZCBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBwcm90b3R5cGUgVGhlIG9iamVjdCB0byBpbmhlcml0IGZyb20uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBuZXcgb2JqZWN0LlxuICovXG5mdW5jdGlvbiBiYXNlQ3JlYXRlKHByb3RvKSB7XG4gIHJldHVybiBpc09iamVjdChwcm90bykgPyBvYmplY3RDcmVhdGUocHJvdG8pIDoge307XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGdldEFsbEtleXNgIGFuZCBgZ2V0QWxsS2V5c0luYCB3aGljaCB1c2VzXG4gKiBga2V5c0Z1bmNgIGFuZCBgc3ltYm9sc0Z1bmNgIHRvIGdldCB0aGUgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBhbmRcbiAqIHN5bWJvbHMgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGtleXNGdW5jIFRoZSBmdW5jdGlvbiB0byBnZXQgdGhlIGtleXMgb2YgYG9iamVjdGAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBzeW1ib2xzRnVuYyBUaGUgZnVuY3Rpb24gdG8gZ2V0IHRoZSBzeW1ib2xzIG9mIGBvYmplY3RgLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcyBhbmQgc3ltYm9scy5cbiAqL1xuZnVuY3Rpb24gYmFzZUdldEFsbEtleXMob2JqZWN0LCBrZXlzRnVuYywgc3ltYm9sc0Z1bmMpIHtcbiAgdmFyIHJlc3VsdCA9IGtleXNGdW5jKG9iamVjdCk7XG4gIHJldHVybiBpc0FycmF5KG9iamVjdCkgPyByZXN1bHQgOiBhcnJheVB1c2gocmVzdWx0LCBzeW1ib2xzRnVuYyhvYmplY3QpKTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgZ2V0VGFnYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBgdG9TdHJpbmdUYWdgLlxuICovXG5mdW5jdGlvbiBiYXNlR2V0VGFnKHZhbHVlKSB7XG4gIHJldHVybiBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc05hdGl2ZWAgd2l0aG91dCBiYWQgc2hpbSBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24sXG4gKiAgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNOYXRpdmUodmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdCh2YWx1ZSkgfHwgaXNNYXNrZWQodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBwYXR0ZXJuID0gKGlzRnVuY3Rpb24odmFsdWUpIHx8IGlzSG9zdE9iamVjdCh2YWx1ZSkpID8gcmVJc05hdGl2ZSA6IHJlSXNIb3N0Q3RvcjtcbiAgcmV0dXJuIHBhdHRlcm4udGVzdCh0b1NvdXJjZSh2YWx1ZSkpO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzVHlwZWRBcnJheWAgd2l0aG91dCBOb2RlLmpzIG9wdGltaXphdGlvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB0eXBlZCBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNUeXBlZEFycmF5KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmXG4gICAgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhIXR5cGVkQXJyYXlUYWdzW29iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpXTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5rZXlzYCB3aGljaCBkb2Vzbid0IHRyZWF0IHNwYXJzZSBhcnJheXMgYXMgZGVuc2UuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VLZXlzKG9iamVjdCkge1xuICBpZiAoIWlzUHJvdG90eXBlKG9iamVjdCkpIHtcbiAgICByZXR1cm4gbmF0aXZlS2V5cyhvYmplY3QpO1xuICB9XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgZm9yICh2YXIga2V5IGluIE9iamVjdChvYmplY3QpKSB7XG4gICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpICYmIGtleSAhPSAnY29uc3RydWN0b3InKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmtleXNJbmAgd2hpY2ggZG9lc24ndCB0cmVhdCBzcGFyc2UgYXJyYXlzIGFzIGRlbnNlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBiYXNlS2V5c0luKG9iamVjdCkge1xuICBpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHtcbiAgICByZXR1cm4gbmF0aXZlS2V5c0luKG9iamVjdCk7XG4gIH1cbiAgdmFyIGlzUHJvdG8gPSBpc1Byb3RvdHlwZShvYmplY3QpLFxuICAgICAgcmVzdWx0ID0gW107XG5cbiAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgIGlmICghKGtleSA9PSAnY29uc3RydWN0b3InICYmIChpc1Byb3RvIHx8ICFoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLm1lcmdlYCB3aXRob3V0IHN1cHBvcnQgZm9yIG11bHRpcGxlIHNvdXJjZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIHNvdXJjZSBvYmplY3QuXG4gKiBAcGFyYW0ge251bWJlcn0gc3JjSW5kZXggVGhlIGluZGV4IG9mIGBzb3VyY2VgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgbWVyZ2VkIHZhbHVlcy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhY2tdIFRyYWNrcyB0cmF2ZXJzZWQgc291cmNlIHZhbHVlcyBhbmQgdGhlaXIgbWVyZ2VkXG4gKiAgY291bnRlcnBhcnRzLlxuICovXG5mdW5jdGlvbiBiYXNlTWVyZ2Uob2JqZWN0LCBzb3VyY2UsIHNyY0luZGV4LCBjdXN0b21pemVyLCBzdGFjaykge1xuICBpZiAob2JqZWN0ID09PSBzb3VyY2UpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKCEoaXNBcnJheShzb3VyY2UpIHx8IGlzVHlwZWRBcnJheShzb3VyY2UpKSkge1xuICAgIHZhciBwcm9wcyA9IGJhc2VLZXlzSW4oc291cmNlKTtcbiAgfVxuICBhcnJheUVhY2gocHJvcHMgfHwgc291cmNlLCBmdW5jdGlvbihzcmNWYWx1ZSwga2V5KSB7XG4gICAgaWYgKHByb3BzKSB7XG4gICAgICBrZXkgPSBzcmNWYWx1ZTtcbiAgICAgIHNyY1ZhbHVlID0gc291cmNlW2tleV07XG4gICAgfVxuICAgIGlmIChpc09iamVjdChzcmNWYWx1ZSkpIHtcbiAgICAgIHN0YWNrIHx8IChzdGFjayA9IG5ldyBTdGFjayk7XG4gICAgICBiYXNlTWVyZ2VEZWVwKG9iamVjdCwgc291cmNlLCBrZXksIHNyY0luZGV4LCBiYXNlTWVyZ2UsIGN1c3RvbWl6ZXIsIHN0YWNrKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2YXIgbmV3VmFsdWUgPSBjdXN0b21pemVyXG4gICAgICAgID8gY3VzdG9taXplcihvYmplY3Rba2V5XSwgc3JjVmFsdWUsIChrZXkgKyAnJyksIG9iamVjdCwgc291cmNlLCBzdGFjaylcbiAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICAgIGlmIChuZXdWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gc3JjVmFsdWU7XG4gICAgICB9XG4gICAgICBhc3NpZ25NZXJnZVZhbHVlKG9iamVjdCwga2V5LCBuZXdWYWx1ZSk7XG4gICAgfVxuICB9KTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VNZXJnZWAgZm9yIGFycmF5cyBhbmQgb2JqZWN0cyB3aGljaCBwZXJmb3Jtc1xuICogZGVlcCBtZXJnZXMgYW5kIHRyYWNrcyB0cmF2ZXJzZWQgb2JqZWN0cyBlbmFibGluZyBvYmplY3RzIHdpdGggY2lyY3VsYXJcbiAqIHJlZmVyZW5jZXMgdG8gYmUgbWVyZ2VkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBtZXJnZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBzcmNJbmRleCBUaGUgaW5kZXggb2YgYHNvdXJjZWAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBtZXJnZUZ1bmMgVGhlIGZ1bmN0aW9uIHRvIG1lcmdlIHZhbHVlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGFzc2lnbmVkIHZhbHVlcy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhY2tdIFRyYWNrcyB0cmF2ZXJzZWQgc291cmNlIHZhbHVlcyBhbmQgdGhlaXIgbWVyZ2VkXG4gKiAgY291bnRlcnBhcnRzLlxuICovXG5mdW5jdGlvbiBiYXNlTWVyZ2VEZWVwKG9iamVjdCwgc291cmNlLCBrZXksIHNyY0luZGV4LCBtZXJnZUZ1bmMsIGN1c3RvbWl6ZXIsIHN0YWNrKSB7XG4gIHZhciBvYmpWYWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgc3JjVmFsdWUgPSBzb3VyY2Vba2V5XSxcbiAgICAgIHN0YWNrZWQgPSBzdGFjay5nZXQoc3JjVmFsdWUpO1xuXG4gIGlmIChzdGFja2VkKSB7XG4gICAgYXNzaWduTWVyZ2VWYWx1ZShvYmplY3QsIGtleSwgc3RhY2tlZCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBuZXdWYWx1ZSA9IGN1c3RvbWl6ZXJcbiAgICA/IGN1c3RvbWl6ZXIob2JqVmFsdWUsIHNyY1ZhbHVlLCAoa2V5ICsgJycpLCBvYmplY3QsIHNvdXJjZSwgc3RhY2spXG4gICAgOiB1bmRlZmluZWQ7XG5cbiAgdmFyIGlzQ29tbW9uID0gbmV3VmFsdWUgPT09IHVuZGVmaW5lZDtcblxuICBpZiAoaXNDb21tb24pIHtcbiAgICBuZXdWYWx1ZSA9IHNyY1ZhbHVlO1xuICAgIGlmIChpc0FycmF5KHNyY1ZhbHVlKSB8fCBpc1R5cGVkQXJyYXkoc3JjVmFsdWUpKSB7XG4gICAgICBpZiAoaXNBcnJheShvYmpWYWx1ZSkpIHtcbiAgICAgICAgbmV3VmFsdWUgPSBvYmpWYWx1ZTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGlzQXJyYXlMaWtlT2JqZWN0KG9ialZhbHVlKSkge1xuICAgICAgICBuZXdWYWx1ZSA9IGNvcHlBcnJheShvYmpWYWx1ZSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgaXNDb21tb24gPSBmYWxzZTtcbiAgICAgICAgbmV3VmFsdWUgPSBiYXNlQ2xvbmUoc3JjVmFsdWUsIHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBlbHNlIGlmIChpc1BsYWluT2JqZWN0KHNyY1ZhbHVlKSB8fCBpc0FyZ3VtZW50cyhzcmNWYWx1ZSkpIHtcbiAgICAgIGlmIChpc0FyZ3VtZW50cyhvYmpWYWx1ZSkpIHtcbiAgICAgICAgbmV3VmFsdWUgPSB0b1BsYWluT2JqZWN0KG9ialZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKCFpc09iamVjdChvYmpWYWx1ZSkgfHwgKHNyY0luZGV4ICYmIGlzRnVuY3Rpb24ob2JqVmFsdWUpKSkge1xuICAgICAgICBpc0NvbW1vbiA9IGZhbHNlO1xuICAgICAgICBuZXdWYWx1ZSA9IGJhc2VDbG9uZShzcmNWYWx1ZSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgbmV3VmFsdWUgPSBvYmpWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBpc0NvbW1vbiA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICBpZiAoaXNDb21tb24pIHtcbiAgICAvLyBSZWN1cnNpdmVseSBtZXJnZSBvYmplY3RzIGFuZCBhcnJheXMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICBzdGFjay5zZXQoc3JjVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICBtZXJnZUZ1bmMobmV3VmFsdWUsIHNyY1ZhbHVlLCBzcmNJbmRleCwgY3VzdG9taXplciwgc3RhY2spO1xuICAgIHN0YWNrWydkZWxldGUnXShzcmNWYWx1ZSk7XG4gIH1cbiAgYXNzaWduTWVyZ2VWYWx1ZShvYmplY3QsIGtleSwgbmV3VmFsdWUpO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnJlc3RgIHdoaWNoIGRvZXNuJ3QgdmFsaWRhdGUgb3IgY29lcmNlIGFyZ3VtZW50cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gYXBwbHkgYSByZXN0IHBhcmFtZXRlciB0by5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbc3RhcnQ9ZnVuYy5sZW5ndGgtMV0gVGhlIHN0YXJ0IHBvc2l0aW9uIG9mIHRoZSByZXN0IHBhcmFtZXRlci5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlUmVzdChmdW5jLCBzdGFydCkge1xuICBzdGFydCA9IG5hdGl2ZU1heChzdGFydCA9PT0gdW5kZWZpbmVkID8gKGZ1bmMubGVuZ3RoIC0gMSkgOiBzdGFydCwgMCk7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cyxcbiAgICAgICAgaW5kZXggPSAtMSxcbiAgICAgICAgbGVuZ3RoID0gbmF0aXZlTWF4KGFyZ3MubGVuZ3RoIC0gc3RhcnQsIDApLFxuICAgICAgICBhcnJheSA9IEFycmF5KGxlbmd0aCk7XG5cbiAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgYXJyYXlbaW5kZXhdID0gYXJnc1tzdGFydCArIGluZGV4XTtcbiAgICB9XG4gICAgaW5kZXggPSAtMTtcbiAgICB2YXIgb3RoZXJBcmdzID0gQXJyYXkoc3RhcnQgKyAxKTtcbiAgICB3aGlsZSAoKytpbmRleCA8IHN0YXJ0KSB7XG4gICAgICBvdGhlckFyZ3NbaW5kZXhdID0gYXJnc1tpbmRleF07XG4gICAgfVxuICAgIG90aGVyQXJnc1tzdGFydF0gPSBhcnJheTtcbiAgICByZXR1cm4gYXBwbHkoZnVuYywgdGhpcywgb3RoZXJBcmdzKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgIGBidWZmZXJgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0J1ZmZlcn0gYnVmZmVyIFRoZSBidWZmZXIgdG8gY2xvbmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0RlZXBdIFNwZWNpZnkgYSBkZWVwIGNsb25lLlxuICogQHJldHVybnMge0J1ZmZlcn0gUmV0dXJucyB0aGUgY2xvbmVkIGJ1ZmZlci5cbiAqL1xuZnVuY3Rpb24gY2xvbmVCdWZmZXIoYnVmZmVyLCBpc0RlZXApIHtcbiAgaWYgKGlzRGVlcCkge1xuICAgIHJldHVybiBidWZmZXIuc2xpY2UoKTtcbiAgfVxuICB2YXIgcmVzdWx0ID0gbmV3IGJ1ZmZlci5jb25zdHJ1Y3RvcihidWZmZXIubGVuZ3RoKTtcbiAgYnVmZmVyLmNvcHkocmVzdWx0KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgYGFycmF5QnVmZmVyYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheUJ1ZmZlcn0gYXJyYXlCdWZmZXIgVGhlIGFycmF5IGJ1ZmZlciB0byBjbG9uZS5cbiAqIEByZXR1cm5zIHtBcnJheUJ1ZmZlcn0gUmV0dXJucyB0aGUgY2xvbmVkIGFycmF5IGJ1ZmZlci5cbiAqL1xuZnVuY3Rpb24gY2xvbmVBcnJheUJ1ZmZlcihhcnJheUJ1ZmZlcikge1xuICB2YXIgcmVzdWx0ID0gbmV3IGFycmF5QnVmZmVyLmNvbnN0cnVjdG9yKGFycmF5QnVmZmVyLmJ5dGVMZW5ndGgpO1xuICBuZXcgVWludDhBcnJheShyZXN1bHQpLnNldChuZXcgVWludDhBcnJheShhcnJheUJ1ZmZlcikpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiBgZGF0YVZpZXdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gZGF0YVZpZXcgVGhlIGRhdGEgdmlldyB0byBjbG9uZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRGVlcF0gU3BlY2lmeSBhIGRlZXAgY2xvbmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjbG9uZWQgZGF0YSB2aWV3LlxuICovXG5mdW5jdGlvbiBjbG9uZURhdGFWaWV3KGRhdGFWaWV3LCBpc0RlZXApIHtcbiAgdmFyIGJ1ZmZlciA9IGlzRGVlcCA/IGNsb25lQXJyYXlCdWZmZXIoZGF0YVZpZXcuYnVmZmVyKSA6IGRhdGFWaWV3LmJ1ZmZlcjtcbiAgcmV0dXJuIG5ldyBkYXRhVmlldy5jb25zdHJ1Y3RvcihidWZmZXIsIGRhdGFWaWV3LmJ5dGVPZmZzZXQsIGRhdGFWaWV3LmJ5dGVMZW5ndGgpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiBgbWFwYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG1hcCBUaGUgbWFwIHRvIGNsb25lLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2xvbmVGdW5jIFRoZSBmdW5jdGlvbiB0byBjbG9uZSB2YWx1ZXMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0RlZXBdIFNwZWNpZnkgYSBkZWVwIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY2xvbmVkIG1hcC5cbiAqL1xuZnVuY3Rpb24gY2xvbmVNYXAobWFwLCBpc0RlZXAsIGNsb25lRnVuYykge1xuICB2YXIgYXJyYXkgPSBpc0RlZXAgPyBjbG9uZUZ1bmMobWFwVG9BcnJheShtYXApLCB0cnVlKSA6IG1hcFRvQXJyYXkobWFwKTtcbiAgcmV0dXJuIGFycmF5UmVkdWNlKGFycmF5LCBhZGRNYXBFbnRyeSwgbmV3IG1hcC5jb25zdHJ1Y3Rvcik7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mIGByZWdleHBgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gcmVnZXhwIFRoZSByZWdleHAgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjbG9uZWQgcmVnZXhwLlxuICovXG5mdW5jdGlvbiBjbG9uZVJlZ0V4cChyZWdleHApIHtcbiAgdmFyIHJlc3VsdCA9IG5ldyByZWdleHAuY29uc3RydWN0b3IocmVnZXhwLnNvdXJjZSwgcmVGbGFncy5leGVjKHJlZ2V4cCkpO1xuICByZXN1bHQubGFzdEluZGV4ID0gcmVnZXhwLmxhc3RJbmRleDtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgYHNldGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzZXQgVGhlIHNldCB0byBjbG9uZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNsb25lRnVuYyBUaGUgZnVuY3Rpb24gdG8gY2xvbmUgdmFsdWVzLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBjbG9uZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGNsb25lZCBzZXQuXG4gKi9cbmZ1bmN0aW9uIGNsb25lU2V0KHNldCwgaXNEZWVwLCBjbG9uZUZ1bmMpIHtcbiAgdmFyIGFycmF5ID0gaXNEZWVwID8gY2xvbmVGdW5jKHNldFRvQXJyYXkoc2V0KSwgdHJ1ZSkgOiBzZXRUb0FycmF5KHNldCk7XG4gIHJldHVybiBhcnJheVJlZHVjZShhcnJheSwgYWRkU2V0RW50cnksIG5ldyBzZXQuY29uc3RydWN0b3IpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiB0aGUgYHN5bWJvbGAgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc3ltYm9sIFRoZSBzeW1ib2wgb2JqZWN0IHRvIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY2xvbmVkIHN5bWJvbCBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIGNsb25lU3ltYm9sKHN5bWJvbCkge1xuICByZXR1cm4gc3ltYm9sVmFsdWVPZiA/IE9iamVjdChzeW1ib2xWYWx1ZU9mLmNhbGwoc3ltYm9sKSkgOiB7fTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgYHR5cGVkQXJyYXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gdHlwZWRBcnJheSBUaGUgdHlwZWQgYXJyYXkgdG8gY2xvbmUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc0RlZXBdIFNwZWNpZnkgYSBkZWVwIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY2xvbmVkIHR5cGVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBjbG9uZVR5cGVkQXJyYXkodHlwZWRBcnJheSwgaXNEZWVwKSB7XG4gIHZhciBidWZmZXIgPSBpc0RlZXAgPyBjbG9uZUFycmF5QnVmZmVyKHR5cGVkQXJyYXkuYnVmZmVyKSA6IHR5cGVkQXJyYXkuYnVmZmVyO1xuICByZXR1cm4gbmV3IHR5cGVkQXJyYXkuY29uc3RydWN0b3IoYnVmZmVyLCB0eXBlZEFycmF5LmJ5dGVPZmZzZXQsIHR5cGVkQXJyYXkubGVuZ3RoKTtcbn1cblxuLyoqXG4gKiBDb3BpZXMgdGhlIHZhbHVlcyBvZiBgc291cmNlYCB0byBgYXJyYXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBzb3VyY2UgVGhlIGFycmF5IHRvIGNvcHkgdmFsdWVzIGZyb20uXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXk9W11dIFRoZSBhcnJheSB0byBjb3B5IHZhbHVlcyB0by5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBjb3B5QXJyYXkoc291cmNlLCBhcnJheSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHNvdXJjZS5sZW5ndGg7XG5cbiAgYXJyYXkgfHwgKGFycmF5ID0gQXJyYXkobGVuZ3RoKSk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgYXJyYXlbaW5kZXhdID0gc291cmNlW2luZGV4XTtcbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbi8qKlxuICogQ29waWVzIHByb3BlcnRpZXMgb2YgYHNvdXJjZWAgdG8gYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbS5cbiAqIEBwYXJhbSB7QXJyYXl9IHByb3BzIFRoZSBwcm9wZXJ0eSBpZGVudGlmaWVycyB0byBjb3B5LlxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3Q9e31dIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIHRvLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29waWVkIHZhbHVlcy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGNvcHlPYmplY3Qoc291cmNlLCBwcm9wcywgb2JqZWN0LCBjdXN0b21pemVyKSB7XG4gIG9iamVjdCB8fCAob2JqZWN0ID0ge30pO1xuXG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IHByb3BzW2luZGV4XTtcblxuICAgIHZhciBuZXdWYWx1ZSA9IGN1c3RvbWl6ZXJcbiAgICAgID8gY3VzdG9taXplcihvYmplY3Rba2V5XSwgc291cmNlW2tleV0sIGtleSwgb2JqZWN0LCBzb3VyY2UpXG4gICAgICA6IHVuZGVmaW5lZDtcblxuICAgIGFzc2lnblZhbHVlKG9iamVjdCwga2V5LCBuZXdWYWx1ZSA9PT0gdW5kZWZpbmVkID8gc291cmNlW2tleV0gOiBuZXdWYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIG9iamVjdDtcbn1cblxuLyoqXG4gKiBDb3BpZXMgb3duIHN5bWJvbCBwcm9wZXJ0aWVzIG9mIGBzb3VyY2VgIHRvIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBvYmplY3QgdG8gY29weSBzeW1ib2xzIGZyb20uXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdD17fV0gVGhlIG9iamVjdCB0byBjb3B5IHN5bWJvbHMgdG8uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBjb3B5U3ltYm9scyhzb3VyY2UsIG9iamVjdCkge1xuICByZXR1cm4gY29weU9iamVjdChzb3VyY2UsIGdldFN5bWJvbHMoc291cmNlKSwgb2JqZWN0KTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gbGlrZSBgXy5hc3NpZ25gLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBhc3NpZ25lciBUaGUgZnVuY3Rpb24gdG8gYXNzaWduIHZhbHVlcy5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGFzc2lnbmVyIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBjcmVhdGVBc3NpZ25lcihhc3NpZ25lcikge1xuICByZXR1cm4gYmFzZVJlc3QoZnVuY3Rpb24ob2JqZWN0LCBzb3VyY2VzKSB7XG4gICAgdmFyIGluZGV4ID0gLTEsXG4gICAgICAgIGxlbmd0aCA9IHNvdXJjZXMubGVuZ3RoLFxuICAgICAgICBjdXN0b21pemVyID0gbGVuZ3RoID4gMSA/IHNvdXJjZXNbbGVuZ3RoIC0gMV0gOiB1bmRlZmluZWQsXG4gICAgICAgIGd1YXJkID0gbGVuZ3RoID4gMiA/IHNvdXJjZXNbMl0gOiB1bmRlZmluZWQ7XG5cbiAgICBjdXN0b21pemVyID0gKGFzc2lnbmVyLmxlbmd0aCA+IDMgJiYgdHlwZW9mIGN1c3RvbWl6ZXIgPT0gJ2Z1bmN0aW9uJylcbiAgICAgID8gKGxlbmd0aC0tLCBjdXN0b21pemVyKVxuICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICBpZiAoZ3VhcmQgJiYgaXNJdGVyYXRlZUNhbGwoc291cmNlc1swXSwgc291cmNlc1sxXSwgZ3VhcmQpKSB7XG4gICAgICBjdXN0b21pemVyID0gbGVuZ3RoIDwgMyA/IHVuZGVmaW5lZCA6IGN1c3RvbWl6ZXI7XG4gICAgICBsZW5ndGggPSAxO1xuICAgIH1cbiAgICBvYmplY3QgPSBPYmplY3Qob2JqZWN0KTtcbiAgICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgICAgdmFyIHNvdXJjZSA9IHNvdXJjZXNbaW5kZXhdO1xuICAgICAgaWYgKHNvdXJjZSkge1xuICAgICAgICBhc3NpZ25lcihvYmplY3QsIHNvdXJjZSwgaW5kZXgsIGN1c3RvbWl6ZXIpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqZWN0O1xuICB9KTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIGFuZCBzeW1ib2xzIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzIGFuZCBzeW1ib2xzLlxuICovXG5mdW5jdGlvbiBnZXRBbGxLZXlzKG9iamVjdCkge1xuICByZXR1cm4gYmFzZUdldEFsbEtleXMob2JqZWN0LCBrZXlzLCBnZXRTeW1ib2xzKTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBkYXRhIGZvciBgbWFwYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG1hcCBUaGUgbWFwIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUgcmVmZXJlbmNlIGtleS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBtYXAgZGF0YS5cbiAqL1xuZnVuY3Rpb24gZ2V0TWFwRGF0YShtYXAsIGtleSkge1xuICB2YXIgZGF0YSA9IG1hcC5fX2RhdGFfXztcbiAgcmV0dXJuIGlzS2V5YWJsZShrZXkpXG4gICAgPyBkYXRhW3R5cGVvZiBrZXkgPT0gJ3N0cmluZycgPyAnc3RyaW5nJyA6ICdoYXNoJ11cbiAgICA6IGRhdGEubWFwO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIG5hdGl2ZSBmdW5jdGlvbiBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBtZXRob2QgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGZ1bmN0aW9uIGlmIGl0J3MgbmF0aXZlLCBlbHNlIGB1bmRlZmluZWRgLlxuICovXG5mdW5jdGlvbiBnZXROYXRpdmUob2JqZWN0LCBrZXkpIHtcbiAgdmFyIHZhbHVlID0gZ2V0VmFsdWUob2JqZWN0LCBrZXkpO1xuICByZXR1cm4gYmFzZUlzTmF0aXZlKHZhbHVlKSA/IHZhbHVlIDogdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBlbnVtZXJhYmxlIHN5bWJvbCBwcm9wZXJ0aWVzIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHN5bWJvbHMuXG4gKi9cbnZhciBnZXRTeW1ib2xzID0gbmF0aXZlR2V0U3ltYm9scyA/IG92ZXJBcmcobmF0aXZlR2V0U3ltYm9scywgT2JqZWN0KSA6IHN0dWJBcnJheTtcblxuLyoqXG4gKiBHZXRzIHRoZSBgdG9TdHJpbmdUYWdgIG9mIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgYHRvU3RyaW5nVGFnYC5cbiAqL1xudmFyIGdldFRhZyA9IGJhc2VHZXRUYWc7XG5cbi8vIEZhbGxiYWNrIGZvciBkYXRhIHZpZXdzLCBtYXBzLCBzZXRzLCBhbmQgd2VhayBtYXBzIGluIElFIDExLFxuLy8gZm9yIGRhdGEgdmlld3MgaW4gRWRnZSA8IDE0LCBhbmQgcHJvbWlzZXMgaW4gTm9kZS5qcy5cbmlmICgoRGF0YVZpZXcgJiYgZ2V0VGFnKG5ldyBEYXRhVmlldyhuZXcgQXJyYXlCdWZmZXIoMSkpKSAhPSBkYXRhVmlld1RhZykgfHxcbiAgICAoTWFwICYmIGdldFRhZyhuZXcgTWFwKSAhPSBtYXBUYWcpIHx8XG4gICAgKFByb21pc2UgJiYgZ2V0VGFnKFByb21pc2UucmVzb2x2ZSgpKSAhPSBwcm9taXNlVGFnKSB8fFxuICAgIChTZXQgJiYgZ2V0VGFnKG5ldyBTZXQpICE9IHNldFRhZykgfHxcbiAgICAoV2Vha01hcCAmJiBnZXRUYWcobmV3IFdlYWtNYXApICE9IHdlYWtNYXBUYWcpKSB7XG4gIGdldFRhZyA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgdmFyIHJlc3VsdCA9IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpLFxuICAgICAgICBDdG9yID0gcmVzdWx0ID09IG9iamVjdFRhZyA/IHZhbHVlLmNvbnN0cnVjdG9yIDogdW5kZWZpbmVkLFxuICAgICAgICBjdG9yU3RyaW5nID0gQ3RvciA/IHRvU291cmNlKEN0b3IpIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKGN0b3JTdHJpbmcpIHtcbiAgICAgIHN3aXRjaCAoY3RvclN0cmluZykge1xuICAgICAgICBjYXNlIGRhdGFWaWV3Q3RvclN0cmluZzogcmV0dXJuIGRhdGFWaWV3VGFnO1xuICAgICAgICBjYXNlIG1hcEN0b3JTdHJpbmc6IHJldHVybiBtYXBUYWc7XG4gICAgICAgIGNhc2UgcHJvbWlzZUN0b3JTdHJpbmc6IHJldHVybiBwcm9taXNlVGFnO1xuICAgICAgICBjYXNlIHNldEN0b3JTdHJpbmc6IHJldHVybiBzZXRUYWc7XG4gICAgICAgIGNhc2Ugd2Vha01hcEN0b3JTdHJpbmc6IHJldHVybiB3ZWFrTWFwVGFnO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xufVxuXG4vKipcbiAqIEluaXRpYWxpemVzIGFuIGFycmF5IGNsb25lLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGluaXRpYWxpemVkIGNsb25lLlxuICovXG5mdW5jdGlvbiBpbml0Q2xvbmVBcnJheShhcnJheSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgcmVzdWx0ID0gYXJyYXkuY29uc3RydWN0b3IobGVuZ3RoKTtcblxuICAvLyBBZGQgcHJvcGVydGllcyBhc3NpZ25lZCBieSBgUmVnRXhwI2V4ZWNgLlxuICBpZiAobGVuZ3RoICYmIHR5cGVvZiBhcnJheVswXSA9PSAnc3RyaW5nJyAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGFycmF5LCAnaW5kZXgnKSkge1xuICAgIHJlc3VsdC5pbmRleCA9IGFycmF5LmluZGV4O1xuICAgIHJlc3VsdC5pbnB1dCA9IGFycmF5LmlucHV0O1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgYW4gb2JqZWN0IGNsb25lLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY2xvbmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBpbml0aWFsaXplZCBjbG9uZS5cbiAqL1xuZnVuY3Rpb24gaW5pdENsb25lT2JqZWN0KG9iamVjdCkge1xuICByZXR1cm4gKHR5cGVvZiBvYmplY3QuY29uc3RydWN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNQcm90b3R5cGUob2JqZWN0KSlcbiAgICA/IGJhc2VDcmVhdGUoZ2V0UHJvdG90eXBlKG9iamVjdCkpXG4gICAgOiB7fTtcbn1cblxuLyoqXG4gKiBJbml0aWFsaXplcyBhbiBvYmplY3QgY2xvbmUgYmFzZWQgb24gaXRzIGB0b1N0cmluZ1RhZ2AuXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gb25seSBzdXBwb3J0cyBjbG9uaW5nIHZhbHVlcyB3aXRoIHRhZ3Mgb2ZcbiAqIGBCb29sZWFuYCwgYERhdGVgLCBgRXJyb3JgLCBgTnVtYmVyYCwgYFJlZ0V4cGAsIG9yIGBTdHJpbmdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY2xvbmUuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGFnIFRoZSBgdG9TdHJpbmdUYWdgIG9mIHRoZSBvYmplY3QgdG8gY2xvbmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjbG9uZUZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGNsb25lIHZhbHVlcy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRGVlcF0gU3BlY2lmeSBhIGRlZXAgY2xvbmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBpbml0aWFsaXplZCBjbG9uZS5cbiAqL1xuZnVuY3Rpb24gaW5pdENsb25lQnlUYWcob2JqZWN0LCB0YWcsIGNsb25lRnVuYywgaXNEZWVwKSB7XG4gIHZhciBDdG9yID0gb2JqZWN0LmNvbnN0cnVjdG9yO1xuICBzd2l0Y2ggKHRhZykge1xuICAgIGNhc2UgYXJyYXlCdWZmZXJUYWc6XG4gICAgICByZXR1cm4gY2xvbmVBcnJheUJ1ZmZlcihvYmplY3QpO1xuXG4gICAgY2FzZSBib29sVGFnOlxuICAgIGNhc2UgZGF0ZVRhZzpcbiAgICAgIHJldHVybiBuZXcgQ3Rvcigrb2JqZWN0KTtcblxuICAgIGNhc2UgZGF0YVZpZXdUYWc6XG4gICAgICByZXR1cm4gY2xvbmVEYXRhVmlldyhvYmplY3QsIGlzRGVlcCk7XG5cbiAgICBjYXNlIGZsb2F0MzJUYWc6IGNhc2UgZmxvYXQ2NFRhZzpcbiAgICBjYXNlIGludDhUYWc6IGNhc2UgaW50MTZUYWc6IGNhc2UgaW50MzJUYWc6XG4gICAgY2FzZSB1aW50OFRhZzogY2FzZSB1aW50OENsYW1wZWRUYWc6IGNhc2UgdWludDE2VGFnOiBjYXNlIHVpbnQzMlRhZzpcbiAgICAgIHJldHVybiBjbG9uZVR5cGVkQXJyYXkob2JqZWN0LCBpc0RlZXApO1xuXG4gICAgY2FzZSBtYXBUYWc6XG4gICAgICByZXR1cm4gY2xvbmVNYXAob2JqZWN0LCBpc0RlZXAsIGNsb25lRnVuYyk7XG5cbiAgICBjYXNlIG51bWJlclRhZzpcbiAgICBjYXNlIHN0cmluZ1RhZzpcbiAgICAgIHJldHVybiBuZXcgQ3RvcihvYmplY3QpO1xuXG4gICAgY2FzZSByZWdleHBUYWc6XG4gICAgICByZXR1cm4gY2xvbmVSZWdFeHAob2JqZWN0KTtcblxuICAgIGNhc2Ugc2V0VGFnOlxuICAgICAgcmV0dXJuIGNsb25lU2V0KG9iamVjdCwgaXNEZWVwLCBjbG9uZUZ1bmMpO1xuXG4gICAgY2FzZSBzeW1ib2xUYWc6XG4gICAgICByZXR1cm4gY2xvbmVTeW1ib2wob2JqZWN0KTtcbiAgfVxufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBpbmRleC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aD1NQVhfU0FGRV9JTlRFR0VSXSBUaGUgdXBwZXIgYm91bmRzIG9mIGEgdmFsaWQgaW5kZXguXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGluZGV4LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSW5kZXgodmFsdWUsIGxlbmd0aCkge1xuICBsZW5ndGggPSBsZW5ndGggPT0gbnVsbCA/IE1BWF9TQUZFX0lOVEVHRVIgOiBsZW5ndGg7XG4gIHJldHVybiAhIWxlbmd0aCAmJlxuICAgICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgfHwgcmVJc1VpbnQudGVzdCh2YWx1ZSkpICYmXG4gICAgKHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPCBsZW5ndGgpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gYXJndW1lbnRzIGFyZSBmcm9tIGFuIGl0ZXJhdGVlIGNhbGwuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHBvdGVudGlhbCBpdGVyYXRlZSB2YWx1ZSBhcmd1bWVudC5cbiAqIEBwYXJhbSB7Kn0gaW5kZXggVGhlIHBvdGVudGlhbCBpdGVyYXRlZSBpbmRleCBvciBrZXkgYXJndW1lbnQuXG4gKiBAcGFyYW0geyp9IG9iamVjdCBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIG9iamVjdCBhcmd1bWVudC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgYXJndW1lbnRzIGFyZSBmcm9tIGFuIGl0ZXJhdGVlIGNhbGwsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0l0ZXJhdGVlQ2FsbCh2YWx1ZSwgaW5kZXgsIG9iamVjdCkge1xuICBpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHR5cGUgPSB0eXBlb2YgaW5kZXg7XG4gIGlmICh0eXBlID09ICdudW1iZXInXG4gICAgICAgID8gKGlzQXJyYXlMaWtlKG9iamVjdCkgJiYgaXNJbmRleChpbmRleCwgb2JqZWN0Lmxlbmd0aCkpXG4gICAgICAgIDogKHR5cGUgPT0gJ3N0cmluZycgJiYgaW5kZXggaW4gb2JqZWN0KVxuICAgICAgKSB7XG4gICAgcmV0dXJuIGVxKG9iamVjdFtpbmRleF0sIHZhbHVlKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUgZm9yIHVzZSBhcyB1bmlxdWUgb2JqZWN0IGtleS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBzdWl0YWJsZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0tleWFibGUodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAodHlwZSA9PSAnc3RyaW5nJyB8fCB0eXBlID09ICdudW1iZXInIHx8IHR5cGUgPT0gJ3N5bWJvbCcgfHwgdHlwZSA9PSAnYm9vbGVhbicpXG4gICAgPyAodmFsdWUgIT09ICdfX3Byb3RvX18nKVxuICAgIDogKHZhbHVlID09PSBudWxsKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYGZ1bmNgIGhhcyBpdHMgc291cmNlIG1hc2tlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYGZ1bmNgIGlzIG1hc2tlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc01hc2tlZChmdW5jKSB7XG4gIHJldHVybiAhIW1hc2tTcmNLZXkgJiYgKG1hc2tTcmNLZXkgaW4gZnVuYyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgbGlrZWx5IGEgcHJvdG90eXBlIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHByb3RvdHlwZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc1Byb3RvdHlwZSh2YWx1ZSkge1xuICB2YXIgQ3RvciA9IHZhbHVlICYmIHZhbHVlLmNvbnN0cnVjdG9yLFxuICAgICAgcHJvdG8gPSAodHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yLnByb3RvdHlwZSkgfHwgb2JqZWN0UHJvdG87XG5cbiAgcmV0dXJuIHZhbHVlID09PSBwcm90bztcbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIGxpa2VcbiAqIFtgT2JqZWN0LmtleXNgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3Qua2V5cylcbiAqIGV4Y2VwdCB0aGF0IGl0IGluY2x1ZGVzIGluaGVyaXRlZCBlbnVtZXJhYmxlIHByb3BlcnRpZXMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIG5hdGl2ZUtleXNJbihvYmplY3QpIHtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBpZiAob2JqZWN0ICE9IG51bGwpIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gT2JqZWN0KG9iamVjdCkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ29udmVydHMgYGZ1bmNgIHRvIGl0cyBzb3VyY2UgY29kZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHNvdXJjZSBjb2RlLlxuICovXG5mdW5jdGlvbiB0b1NvdXJjZShmdW5jKSB7XG4gIGlmIChmdW5jICE9IG51bGwpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGZ1bmNUb1N0cmluZy5jYWxsKGZ1bmMpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiAoZnVuYyArICcnKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG4gIHJldHVybiAnJztcbn1cblxuLyoqXG4gKiBQZXJmb3JtcyBhXG4gKiBbYFNhbWVWYWx1ZVplcm9gXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1zYW1ldmFsdWV6ZXJvKVxuICogY29tcGFyaXNvbiBiZXR3ZWVuIHR3byB2YWx1ZXMgdG8gZGV0ZXJtaW5lIGlmIHRoZXkgYXJlIGVxdWl2YWxlbnQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxIH07XG4gKiB2YXIgb3RoZXIgPSB7ICdhJzogMSB9O1xuICpcbiAqIF8uZXEob2JqZWN0LCBvYmplY3QpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uZXEob2JqZWN0LCBvdGhlcik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uZXEoJ2EnLCAnYScpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uZXEoJ2EnLCBPYmplY3QoJ2EnKSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uZXEoTmFOLCBOYU4pO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBlcSh2YWx1ZSwgb3RoZXIpIHtcbiAgcmV0dXJuIHZhbHVlID09PSBvdGhlciB8fCAodmFsdWUgIT09IHZhbHVlICYmIG90aGVyICE9PSBvdGhlcik7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgbGlrZWx5IGFuIGBhcmd1bWVudHNgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBgYXJndW1lbnRzYCBvYmplY3QsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJndW1lbnRzKHZhbHVlKSB7XG4gIC8vIFNhZmFyaSA4LjEgbWFrZXMgYGFyZ3VtZW50cy5jYWxsZWVgIGVudW1lcmFibGUgaW4gc3RyaWN0IG1vZGUuXG4gIHJldHVybiBpc0FycmF5TGlrZU9iamVjdCh2YWx1ZSkgJiYgaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpICYmXG4gICAgKCFwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgfHwgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gYXJnc1RhZyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgQXJyYXlgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXkoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXkoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheSgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UuIEEgdmFsdWUgaXMgY29uc2lkZXJlZCBhcnJheS1saWtlIGlmIGl0J3NcbiAqIG5vdCBhIGZ1bmN0aW9uIGFuZCBoYXMgYSBgdmFsdWUubGVuZ3RoYCB0aGF0J3MgYW4gaW50ZWdlciBncmVhdGVyIHRoYW4gb3JcbiAqIGVxdWFsIHRvIGAwYCBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIGBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUmAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKCdhYmMnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmICFpc0Z1bmN0aW9uKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLmlzQXJyYXlMaWtlYCBleGNlcHQgdGhhdCBpdCBhbHNvIGNoZWNrcyBpZiBgdmFsdWVgXG4gKiBpcyBhbiBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXktbGlrZSBvYmplY3QsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2VPYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaXNBcnJheUxpa2UodmFsdWUpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgYnVmZmVyLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4zLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgYnVmZmVyLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNCdWZmZXIobmV3IEJ1ZmZlcigyKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0J1ZmZlcihuZXcgVWludDhBcnJheSgyKSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNCdWZmZXIgPSBuYXRpdmVJc0J1ZmZlciB8fCBzdHViRmFsc2U7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBGdW5jdGlvbmAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Z1bmN0aW9uKF8pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNGdW5jdGlvbigvYWJjLyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIC8vIFRoZSB1c2Ugb2YgYE9iamVjdCN0b1N0cmluZ2AgYXZvaWRzIGlzc3VlcyB3aXRoIHRoZSBgdHlwZW9mYCBvcGVyYXRvclxuICAvLyBpbiBTYWZhcmkgOC05IHdoaWNoIHJldHVybnMgJ29iamVjdCcgZm9yIHR5cGVkIGFycmF5IGFuZCBvdGhlciBjb25zdHJ1Y3RvcnMuXG4gIHZhciB0YWcgPSBpc09iamVjdCh2YWx1ZSkgPyBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA6ICcnO1xuICByZXR1cm4gdGFnID09IGZ1bmNUYWcgfHwgdGFnID09IGdlblRhZztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBpcyBsb29zZWx5IGJhc2VkIG9uXG4gKiBbYFRvTGVuZ3RoYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtdG9sZW5ndGgpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNMZW5ndGgoMyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0xlbmd0aChOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aChJbmZpbml0eSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoJzMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiZcbiAgICB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gISF2YWx1ZSAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgdGhhdCBpcywgYW4gb2JqZWN0IGNyZWF0ZWQgYnkgdGhlXG4gKiBgT2JqZWN0YCBjb25zdHJ1Y3RvciBvciBvbmUgd2l0aCBhIGBbW1Byb3RvdHlwZV1dYCBvZiBgbnVsbGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjguMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwbGFpbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogfVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChuZXcgRm9vKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdCh7ICd4JzogMCwgJ3knOiAwIH0pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChPYmplY3QuY3JlYXRlKG51bGwpKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaXNQbGFpbk9iamVjdCh2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0TGlrZSh2YWx1ZSkgfHxcbiAgICAgIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpICE9IG9iamVjdFRhZyB8fCBpc0hvc3RPYmplY3QodmFsdWUpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBwcm90byA9IGdldFByb3RvdHlwZSh2YWx1ZSk7XG4gIGlmIChwcm90byA9PT0gbnVsbCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHZhciBDdG9yID0gaGFzT3duUHJvcGVydHkuY2FsbChwcm90bywgJ2NvbnN0cnVjdG9yJykgJiYgcHJvdG8uY29uc3RydWN0b3I7XG4gIHJldHVybiAodHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJlxuICAgIEN0b3IgaW5zdGFuY2VvZiBDdG9yICYmIGZ1bmNUb1N0cmluZy5jYWxsKEN0b3IpID09IG9iamVjdEN0b3JTdHJpbmcpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSB0eXBlZCBhcnJheS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHR5cGVkIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KG5ldyBVaW50OEFycmF5KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShbXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNUeXBlZEFycmF5ID0gbm9kZUlzVHlwZWRBcnJheSA/IGJhc2VVbmFyeShub2RlSXNUeXBlZEFycmF5KSA6IGJhc2VJc1R5cGVkQXJyYXk7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHBsYWluIG9iamVjdCBmbGF0dGVuaW5nIGluaGVyaXRlZCBlbnVtZXJhYmxlIHN0cmluZ1xuICoga2V5ZWQgcHJvcGVydGllcyBvZiBgdmFsdWVgIHRvIG93biBwcm9wZXJ0aWVzIG9mIHRoZSBwbGFpbiBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgcGxhaW4gb2JqZWN0LlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmFzc2lnbih7ICdhJzogMSB9LCBuZXcgRm9vKTtcbiAqIC8vID0+IHsgJ2EnOiAxLCAnYic6IDIgfVxuICpcbiAqIF8uYXNzaWduKHsgJ2EnOiAxIH0sIF8udG9QbGFpbk9iamVjdChuZXcgRm9vKSk7XG4gKiAvLyA9PiB7ICdhJzogMSwgJ2InOiAyLCAnYyc6IDMgfVxuICovXG5mdW5jdGlvbiB0b1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBjb3B5T2JqZWN0KHZhbHVlLCBrZXlzSW4odmFsdWUpKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHRoZSBvd24gZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy4gU2VlIHRoZVxuICogW0VTIHNwZWNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5rZXlzKVxuICogZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmtleXMobmV3IEZvbyk7XG4gKiAvLyA9PiBbJ2EnLCAnYiddIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKlxuICogXy5rZXlzKCdoaScpO1xuICogLy8gPT4gWycwJywgJzEnXVxuICovXG5mdW5jdGlvbiBrZXlzKG9iamVjdCkge1xuICByZXR1cm4gaXNBcnJheUxpa2Uob2JqZWN0KSA/IGFycmF5TGlrZUtleXMob2JqZWN0KSA6IGJhc2VLZXlzKG9iamVjdCk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGFuZCBpbmhlcml0ZWQgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmtleXNJbihuZXcgRm9vKTtcbiAqIC8vID0+IFsnYScsICdiJywgJ2MnXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICovXG5mdW5jdGlvbiBrZXlzSW4ob2JqZWN0KSB7XG4gIHJldHVybiBpc0FycmF5TGlrZShvYmplY3QpID8gYXJyYXlMaWtlS2V5cyhvYmplY3QsIHRydWUpIDogYmFzZUtleXNJbihvYmplY3QpO1xufVxuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8uYXNzaWduYCBleGNlcHQgdGhhdCBpdCByZWN1cnNpdmVseSBtZXJnZXMgb3duIGFuZFxuICogaW5oZXJpdGVkIGVudW1lcmFibGUgc3RyaW5nIGtleWVkIHByb3BlcnRpZXMgb2Ygc291cmNlIG9iamVjdHMgaW50byB0aGVcbiAqIGRlc3RpbmF0aW9uIG9iamVjdC4gU291cmNlIHByb3BlcnRpZXMgdGhhdCByZXNvbHZlIHRvIGB1bmRlZmluZWRgIGFyZVxuICogc2tpcHBlZCBpZiBhIGRlc3RpbmF0aW9uIHZhbHVlIGV4aXN0cy4gQXJyYXkgYW5kIHBsYWluIG9iamVjdCBwcm9wZXJ0aWVzXG4gKiBhcmUgbWVyZ2VkIHJlY3Vyc2l2ZWx5LiBPdGhlciBvYmplY3RzIGFuZCB2YWx1ZSB0eXBlcyBhcmUgb3ZlcnJpZGRlbiBieVxuICogYXNzaWdubWVudC4gU291cmNlIG9iamVjdHMgYXJlIGFwcGxpZWQgZnJvbSBsZWZ0IHRvIHJpZ2h0LiBTdWJzZXF1ZW50XG4gKiBzb3VyY2VzIG92ZXJ3cml0ZSBwcm9wZXJ0eSBhc3NpZ25tZW50cyBvZiBwcmV2aW91cyBzb3VyY2VzLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBtdXRhdGVzIGBvYmplY3RgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC41LjBcbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIGRlc3RpbmF0aW9uIG9iamVjdC5cbiAqIEBwYXJhbSB7Li4uT2JqZWN0fSBbc291cmNlc10gVGhlIHNvdXJjZSBvYmplY3RzLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyBgb2JqZWN0YC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHtcbiAqICAgJ2EnOiBbeyAnYic6IDIgfSwgeyAnZCc6IDQgfV1cbiAqIH07XG4gKlxuICogdmFyIG90aGVyID0ge1xuICogICAnYSc6IFt7ICdjJzogMyB9LCB7ICdlJzogNSB9XVxuICogfTtcbiAqXG4gKiBfLm1lcmdlKG9iamVjdCwgb3RoZXIpO1xuICogLy8gPT4geyAnYSc6IFt7ICdiJzogMiwgJ2MnOiAzIH0sIHsgJ2QnOiA0LCAnZSc6IDUgfV0gfVxuICovXG52YXIgbWVyZ2UgPSBjcmVhdGVBc3NpZ25lcihmdW5jdGlvbihvYmplY3QsIHNvdXJjZSwgc3JjSW5kZXgpIHtcbiAgYmFzZU1lcmdlKG9iamVjdCwgc291cmNlLCBzcmNJbmRleCk7XG59KTtcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIGEgbmV3IGVtcHR5IGFycmF5LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4xMy4wXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgZW1wdHkgYXJyYXkuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBhcnJheXMgPSBfLnRpbWVzKDIsIF8uc3R1YkFycmF5KTtcbiAqXG4gKiBjb25zb2xlLmxvZyhhcnJheXMpO1xuICogLy8gPT4gW1tdLCBbXV1cbiAqXG4gKiBjb25zb2xlLmxvZyhhcnJheXNbMF0gPT09IGFycmF5c1sxXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBzdHViQXJyYXkoKSB7XG4gIHJldHVybiBbXTtcbn1cblxuLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIGBmYWxzZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjEzLjBcbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRpbWVzKDIsIF8uc3R1YkZhbHNlKTtcbiAqIC8vID0+IFtmYWxzZSwgZmFsc2VdXG4gKi9cbmZ1bmN0aW9uIHN0dWJGYWxzZSgpIHtcbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1lcmdlO1xuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0OnV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltNXZaR1ZmYlc5a2RXeGxjeTlzYjJSaGMyZ3ViV1Z5WjJVdmFXNWtaWGd1YW5NaVhTd2libUZ0WlhNaU9sdGRMQ0p0WVhCd2FXNW5jeUk2SWp0QlFVRkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVR0QlFVTkJPMEZCUTBFN1FVRkRRU0lzSW1acGJHVWlPaUpuWlc1bGNtRjBaV1F1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaUx5b3FYRzRnS2lCc2IyUmhjMmdnS0VOMWMzUnZiU0JDZFdsc1pDa2dQR2gwZEhCek9pOHZiRzlrWVhOb0xtTnZiUzgrWEc0Z0tpQkNkV2xzWkRvZ1lHeHZaR0Z6YUNCdGIyUjFiR0Z5YVhwbElHVjRjRzl5ZEhNOVhDSnVjRzFjSWlBdGJ5QXVMMkJjYmlBcUlFTnZjSGx5YVdkb2RDQnFVWFZsY25rZ1JtOTFibVJoZEdsdmJpQmhibVFnYjNSb1pYSWdZMjl1ZEhKcFluVjBiM0p6SUR4b2RIUndjem92TDJweGRXVnllUzV2Y21jdlBseHVJQ29nVW1Wc1pXRnpaV1FnZFc1a1pYSWdUVWxVSUd4cFkyVnVjMlVnUEdoMGRIQnpPaTh2Ykc5a1lYTm9MbU52YlM5c2FXTmxibk5sUGx4dUlDb2dRbUZ6WldRZ2IyNGdWVzVrWlhKelkyOXlaUzVxY3lBeExqZ3VNeUE4YUhSMGNEb3ZMM1Z1WkdWeWMyTnZjbVZxY3k1dmNtY3ZURWxEUlU1VFJUNWNiaUFxSUVOdmNIbHlhV2RvZENCS1pYSmxiWGtnUVhOb2EyVnVZWE1zSUVSdlkzVnRaVzUwUTJ4dmRXUWdZVzVrSUVsdWRtVnpkR2xuWVhScGRtVWdVbVZ3YjNKMFpYSnpJQ1lnUldScGRHOXljMXh1SUNvdlhHNWNiaThxS2lCVmMyVmtJR0Z6SUhSb1pTQnphWHBsSUhSdklHVnVZV0pzWlNCc1lYSm5aU0JoY25KaGVTQnZjSFJwYldsNllYUnBiMjV6TGlBcUwxeHVkbUZ5SUV4QlVrZEZYMEZTVWtGWlgxTkpXa1VnUFNBeU1EQTdYRzVjYmk4cUtpQlZjMlZrSUhSdklITjBZVzVrTFdsdUlHWnZjaUJnZFc1a1pXWnBibVZrWUNCb1lYTm9JSFpoYkhWbGN5NGdLaTljYm5aaGNpQklRVk5JWDFWT1JFVkdTVTVGUkNBOUlDZGZYMnh2WkdGemFGOW9ZWE5vWDNWdVpHVm1hVzVsWkY5Zkp6dGNibHh1THlvcUlGVnpaV1FnWVhNZ2NtVm1aWEpsYm1ObGN5Qm1iM0lnZG1GeWFXOTFjeUJnVG5WdFltVnlZQ0JqYjI1emRHRnVkSE11SUNvdlhHNTJZWElnVFVGWVgxTkJSa1ZmU1U1VVJVZEZVaUE5SURrd01EY3hPVGt5TlRRM05EQTVPVEU3WEc1Y2JpOHFLaUJnVDJKcVpXTjBJM1J2VTNSeWFXNW5ZQ0J5WlhOMWJIUWdjbVZtWlhKbGJtTmxjeTRnS2k5Y2JuWmhjaUJoY21kelZHRm5JRDBnSjF0dlltcGxZM1FnUVhKbmRXMWxiblJ6WFNjc1hHNGdJQ0FnWVhKeVlYbFVZV2NnUFNBblcyOWlhbVZqZENCQmNuSmhlVjBuTEZ4dUlDQWdJR0p2YjJ4VVlXY2dQU0FuVzI5aWFtVmpkQ0JDYjI5c1pXRnVYU2NzWEc0Z0lDQWdaR0YwWlZSaFp5QTlJQ2RiYjJKcVpXTjBJRVJoZEdWZEp5eGNiaUFnSUNCbGNuSnZjbFJoWnlBOUlDZGJiMkpxWldOMElFVnljbTl5WFNjc1hHNGdJQ0FnWm5WdVkxUmhaeUE5SUNkYmIySnFaV04wSUVaMWJtTjBhVzl1WFNjc1hHNGdJQ0FnWjJWdVZHRm5JRDBnSjF0dlltcGxZM1FnUjJWdVpYSmhkRzl5Um5WdVkzUnBiMjVkSnl4Y2JpQWdJQ0J0WVhCVVlXY2dQU0FuVzI5aWFtVmpkQ0JOWVhCZEp5eGNiaUFnSUNCdWRXMWlaWEpVWVdjZ1BTQW5XMjlpYW1WamRDQk9kVzFpWlhKZEp5eGNiaUFnSUNCdlltcGxZM1JVWVdjZ1BTQW5XMjlpYW1WamRDQlBZbXBsWTNSZEp5eGNiaUFnSUNCd2NtOXRhWE5sVkdGbklEMGdKMXR2WW1wbFkzUWdVSEp2YldselpWMG5MRnh1SUNBZ0lISmxaMlY0Y0ZSaFp5QTlJQ2RiYjJKcVpXTjBJRkpsWjBWNGNGMG5MRnh1SUNBZ0lITmxkRlJoWnlBOUlDZGJiMkpxWldOMElGTmxkRjBuTEZ4dUlDQWdJSE4wY21sdVoxUmhaeUE5SUNkYmIySnFaV04wSUZOMGNtbHVaMTBuTEZ4dUlDQWdJSE41YldKdmJGUmhaeUE5SUNkYmIySnFaV04wSUZONWJXSnZiRjBuTEZ4dUlDQWdJSGRsWVd0TllYQlVZV2NnUFNBblcyOWlhbVZqZENCWFpXRnJUV0Z3WFNjN1hHNWNiblpoY2lCaGNuSmhlVUoxWm1abGNsUmhaeUE5SUNkYmIySnFaV04wSUVGeWNtRjVRblZtWm1WeVhTY3NYRzRnSUNBZ1pHRjBZVlpwWlhkVVlXY2dQU0FuVzI5aWFtVmpkQ0JFWVhSaFZtbGxkMTBuTEZ4dUlDQWdJR1pzYjJGME16SlVZV2NnUFNBblcyOWlhbVZqZENCR2JHOWhkRE15UVhKeVlYbGRKeXhjYmlBZ0lDQm1iRzloZERZMFZHRm5JRDBnSjF0dlltcGxZM1FnUm14dllYUTJORUZ5Y21GNVhTY3NYRzRnSUNBZ2FXNTBPRlJoWnlBOUlDZGJiMkpxWldOMElFbHVkRGhCY25KaGVWMG5MRnh1SUNBZ0lHbHVkREUyVkdGbklEMGdKMXR2WW1wbFkzUWdTVzUwTVRaQmNuSmhlVjBuTEZ4dUlDQWdJR2x1ZERNeVZHRm5JRDBnSjF0dlltcGxZM1FnU1c1ME16SkJjbkpoZVYwbkxGeHVJQ0FnSUhWcGJuUTRWR0ZuSUQwZ0oxdHZZbXBsWTNRZ1ZXbHVkRGhCY25KaGVWMG5MRnh1SUNBZ0lIVnBiblE0UTJ4aGJYQmxaRlJoWnlBOUlDZGJiMkpxWldOMElGVnBiblE0UTJ4aGJYQmxaRUZ5Y21GNVhTY3NYRzRnSUNBZ2RXbHVkREUyVkdGbklEMGdKMXR2WW1wbFkzUWdWV2x1ZERFMlFYSnlZWGxkSnl4Y2JpQWdJQ0IxYVc1ME16SlVZV2NnUFNBblcyOWlhbVZqZENCVmFXNTBNekpCY25KaGVWMG5PMXh1WEc0dktpcGNiaUFxSUZWelpXUWdkRzhnYldGMFkyZ2dZRkpsWjBWNGNHQmNiaUFxSUZ0emVXNTBZWGdnWTJoaGNtRmpkR1Z5YzEwb2FIUjBjRG92TDJWamJXRXRhVzUwWlhKdVlYUnBiMjVoYkM1dmNtY3ZaV050WVMweU5qSXZOeTR3THlOelpXTXRjR0YwZEdWeWJuTXBMbHh1SUNvdlhHNTJZWElnY21WU1pXZEZlSEJEYUdGeUlEMGdMMXRjWEZ4Y1hpUXVLaXMvS0NsYlhGeGRlMzE4WFM5bk8xeHVYRzR2S2lvZ1ZYTmxaQ0IwYnlCdFlYUmphQ0JnVW1WblJYaHdZQ0JtYkdGbmN5Qm1jbTl0SUhSb1pXbHlJR052WlhKalpXUWdjM1J5YVc1bklIWmhiSFZsY3k0Z0tpOWNiblpoY2lCeVpVWnNZV2R6SUQwZ0wxeGNkeW9rTHp0Y2JseHVMeW9xSUZWelpXUWdkRzhnWkdWMFpXTjBJR2h2YzNRZ1kyOXVjM1J5ZFdOMGIzSnpJQ2hUWVdaaGNta3BMaUFxTDF4dWRtRnlJSEpsU1hOSWIzTjBRM1J2Y2lBOUlDOWVYRnhiYjJKcVpXTjBJQzRyUDBOdmJuTjBjblZqZEc5eVhGeGRKQzg3WEc1Y2JpOHFLaUJWYzJWa0lIUnZJR1JsZEdWamRDQjFibk5wWjI1bFpDQnBiblJsWjJWeUlIWmhiSFZsY3k0Z0tpOWNiblpoY2lCeVpVbHpWV2x1ZENBOUlDOWVLRDg2TUh4Yk1TMDVYVnhjWkNvcEpDODdYRzVjYmk4cUtpQlZjMlZrSUhSdklHbGtaVzUwYVdaNUlHQjBiMU4wY21sdVoxUmhaMkFnZG1Gc2RXVnpJRzltSUhSNWNHVmtJR0Z5Y21GNWN5NGdLaTljYm5aaGNpQjBlWEJsWkVGeWNtRjVWR0ZuY3lBOUlIdDlPMXh1ZEhsd1pXUkJjbkpoZVZSaFozTmJabXh2WVhRek1sUmhaMTBnUFNCMGVYQmxaRUZ5Y21GNVZHRm5jMXRtYkc5aGREWTBWR0ZuWFNBOVhHNTBlWEJsWkVGeWNtRjVWR0ZuYzF0cGJuUTRWR0ZuWFNBOUlIUjVjR1ZrUVhKeVlYbFVZV2R6VzJsdWRERTJWR0ZuWFNBOVhHNTBlWEJsWkVGeWNtRjVWR0ZuYzF0cGJuUXpNbFJoWjEwZ1BTQjBlWEJsWkVGeWNtRjVWR0ZuYzF0MWFXNTBPRlJoWjEwZ1BWeHVkSGx3WldSQmNuSmhlVlJoWjNOYmRXbHVkRGhEYkdGdGNHVmtWR0ZuWFNBOUlIUjVjR1ZrUVhKeVlYbFVZV2R6VzNWcGJuUXhObFJoWjEwZ1BWeHVkSGx3WldSQmNuSmhlVlJoWjNOYmRXbHVkRE15VkdGblhTQTlJSFJ5ZFdVN1hHNTBlWEJsWkVGeWNtRjVWR0ZuYzF0aGNtZHpWR0ZuWFNBOUlIUjVjR1ZrUVhKeVlYbFVZV2R6VzJGeWNtRjVWR0ZuWFNBOVhHNTBlWEJsWkVGeWNtRjVWR0ZuYzF0aGNuSmhlVUoxWm1abGNsUmhaMTBnUFNCMGVYQmxaRUZ5Y21GNVZHRm5jMXRpYjI5c1ZHRm5YU0E5WEc1MGVYQmxaRUZ5Y21GNVZHRm5jMXRrWVhSaFZtbGxkMVJoWjEwZ1BTQjBlWEJsWkVGeWNtRjVWR0ZuYzF0a1lYUmxWR0ZuWFNBOVhHNTBlWEJsWkVGeWNtRjVWR0ZuYzF0bGNuSnZjbFJoWjEwZ1BTQjBlWEJsWkVGeWNtRjVWR0ZuYzF0bWRXNWpWR0ZuWFNBOVhHNTBlWEJsWkVGeWNtRjVWR0ZuYzF0dFlYQlVZV2RkSUQwZ2RIbHdaV1JCY25KaGVWUmhaM05iYm5WdFltVnlWR0ZuWFNBOVhHNTBlWEJsWkVGeWNtRjVWR0ZuYzF0dlltcGxZM1JVWVdkZElEMGdkSGx3WldSQmNuSmhlVlJoWjNOYmNtVm5aWGh3VkdGblhTQTlYRzUwZVhCbFpFRnljbUY1VkdGbmMxdHpaWFJVWVdkZElEMGdkSGx3WldSQmNuSmhlVlJoWjNOYmMzUnlhVzVuVkdGblhTQTlYRzUwZVhCbFpFRnljbUY1VkdGbmMxdDNaV0ZyVFdGd1ZHRm5YU0E5SUdaaGJITmxPMXh1WEc0dktpb2dWWE5sWkNCMGJ5QnBaR1Z1ZEdsbWVTQmdkRzlUZEhKcGJtZFVZV2RnSUhaaGJIVmxjeUJ6ZFhCd2IzSjBaV1FnWW5rZ1lGOHVZMnh2Ym1WZ0xpQXFMMXh1ZG1GeUlHTnNiMjVsWVdKc1pWUmhaM01nUFNCN2ZUdGNibU5zYjI1bFlXSnNaVlJoWjNOYllYSm5jMVJoWjEwZ1BTQmpiRzl1WldGaWJHVlVZV2R6VzJGeWNtRjVWR0ZuWFNBOVhHNWpiRzl1WldGaWJHVlVZV2R6VzJGeWNtRjVRblZtWm1WeVZHRm5YU0E5SUdOc2IyNWxZV0pzWlZSaFozTmJaR0YwWVZacFpYZFVZV2RkSUQxY2JtTnNiMjVsWVdKc1pWUmhaM05iWW05dmJGUmhaMTBnUFNCamJHOXVaV0ZpYkdWVVlXZHpXMlJoZEdWVVlXZGRJRDFjYm1Oc2IyNWxZV0pzWlZSaFozTmJabXh2WVhRek1sUmhaMTBnUFNCamJHOXVaV0ZpYkdWVVlXZHpXMlpzYjJGME5qUlVZV2RkSUQxY2JtTnNiMjVsWVdKc1pWUmhaM05iYVc1ME9GUmhaMTBnUFNCamJHOXVaV0ZpYkdWVVlXZHpXMmx1ZERFMlZHRm5YU0E5WEc1amJHOXVaV0ZpYkdWVVlXZHpXMmx1ZERNeVZHRm5YU0E5SUdOc2IyNWxZV0pzWlZSaFozTmJiV0Z3VkdGblhTQTlYRzVqYkc5dVpXRmliR1ZVWVdkelcyNTFiV0psY2xSaFoxMGdQU0JqYkc5dVpXRmliR1ZVWVdkelcyOWlhbVZqZEZSaFoxMGdQVnh1WTJ4dmJtVmhZbXhsVkdGbmMxdHlaV2RsZUhCVVlXZGRJRDBnWTJ4dmJtVmhZbXhsVkdGbmMxdHpaWFJVWVdkZElEMWNibU5zYjI1bFlXSnNaVlJoWjNOYmMzUnlhVzVuVkdGblhTQTlJR05zYjI1bFlXSnNaVlJoWjNOYmMzbHRZbTlzVkdGblhTQTlYRzVqYkc5dVpXRmliR1ZVWVdkelczVnBiblE0VkdGblhTQTlJR05zYjI1bFlXSnNaVlJoWjNOYmRXbHVkRGhEYkdGdGNHVmtWR0ZuWFNBOVhHNWpiRzl1WldGaWJHVlVZV2R6VzNWcGJuUXhObFJoWjEwZ1BTQmpiRzl1WldGaWJHVlVZV2R6VzNWcGJuUXpNbFJoWjEwZ1BTQjBjblZsTzF4dVkyeHZibVZoWW14bFZHRm5jMXRsY25KdmNsUmhaMTBnUFNCamJHOXVaV0ZpYkdWVVlXZHpXMloxYm1OVVlXZGRJRDFjYm1Oc2IyNWxZV0pzWlZSaFozTmJkMlZoYTAxaGNGUmhaMTBnUFNCbVlXeHpaVHRjYmx4dUx5b3FJRVJsZEdWamRDQm1jbVZsSUhaaGNtbGhZbXhsSUdCbmJHOWlZV3hnSUdaeWIyMGdUbTlrWlM1cWN5NGdLaTljYm5aaGNpQm1jbVZsUjJ4dlltRnNJRDBnZEhsd1pXOW1JR2RzYjJKaGJDQTlQU0FuYjJKcVpXTjBKeUFtSmlCbmJHOWlZV3dnSmlZZ1oyeHZZbUZzTGs5aWFtVmpkQ0E5UFQwZ1QySnFaV04wSUNZbUlHZHNiMkpoYkR0Y2JseHVMeW9xSUVSbGRHVmpkQ0JtY21WbElIWmhjbWxoWW14bElHQnpaV3htWUM0Z0tpOWNiblpoY2lCbWNtVmxVMlZzWmlBOUlIUjVjR1Z2WmlCelpXeG1JRDA5SUNkdlltcGxZM1FuSUNZbUlITmxiR1lnSmlZZ2MyVnNaaTVQWW1wbFkzUWdQVDA5SUU5aWFtVmpkQ0FtSmlCelpXeG1PMXh1WEc0dktpb2dWWE5sWkNCaGN5QmhJSEpsWm1WeVpXNWpaU0IwYnlCMGFHVWdaMnh2WW1Gc0lHOWlhbVZqZEM0Z0tpOWNiblpoY2lCeWIyOTBJRDBnWm5KbFpVZHNiMkpoYkNCOGZDQm1jbVZsVTJWc1ppQjhmQ0JHZFc1amRHbHZiaWduY21WMGRYSnVJSFJvYVhNbktTZ3BPMXh1WEc0dktpb2dSR1YwWldOMElHWnlaV1VnZG1GeWFXRmliR1VnWUdWNGNHOXlkSE5nTGlBcUwxeHVkbUZ5SUdaeVpXVkZlSEJ2Y25SeklEMGdkSGx3Wlc5bUlHVjRjRzl5ZEhNZ1BUMGdKMjlpYW1WamRDY2dKaVlnWlhod2IzSjBjeUFtSmlBaFpYaHdiM0owY3k1dWIyUmxWSGx3WlNBbUppQmxlSEJ2Y25Sek8xeHVYRzR2S2lvZ1JHVjBaV04wSUdaeVpXVWdkbUZ5YVdGaWJHVWdZRzF2WkhWc1pXQXVJQ292WEc1MllYSWdabkpsWlUxdlpIVnNaU0E5SUdaeVpXVkZlSEJ2Y25SeklDWW1JSFI1Y0dWdlppQnRiMlIxYkdVZ1BUMGdKMjlpYW1WamRDY2dKaVlnYlc5a2RXeGxJQ1ltSUNGdGIyUjFiR1V1Ym05a1pWUjVjR1VnSmlZZ2JXOWtkV3hsTzF4dVhHNHZLaW9nUkdWMFpXTjBJSFJvWlNCd2IzQjFiR0Z5SUVOdmJXMXZia3BUSUdWNGRHVnVjMmx2YmlCZ2JXOWtkV3hsTG1WNGNHOXlkSE5nTGlBcUwxeHVkbUZ5SUcxdlpIVnNaVVY0Y0c5eWRITWdQU0JtY21WbFRXOWtkV3hsSUNZbUlHWnlaV1ZOYjJSMWJHVXVaWGh3YjNKMGN5QTlQVDBnWm5KbFpVVjRjRzl5ZEhNN1hHNWNiaThxS2lCRVpYUmxZM1FnWm5KbFpTQjJZWEpwWVdKc1pTQmdjSEp2WTJWemMyQWdabkp2YlNCT2IyUmxMbXB6TGlBcUwxeHVkbUZ5SUdaeVpXVlFjbTlqWlhOeklEMGdiVzlrZFd4bFJYaHdiM0owY3lBbUppQm1jbVZsUjJ4dlltRnNMbkJ5YjJObGMzTTdYRzVjYmk4cUtpQlZjMlZrSUhSdklHRmpZMlZ6Y3lCbVlYTjBaWElnVG05a1pTNXFjeUJvWld4d1pYSnpMaUFxTDF4dWRtRnlJRzV2WkdWVmRHbHNJRDBnS0daMWJtTjBhVzl1S0NrZ2UxeHVJQ0IwY25rZ2UxeHVJQ0FnSUhKbGRIVnliaUJtY21WbFVISnZZMlZ6Y3lBbUppQm1jbVZsVUhKdlkyVnpjeTVpYVc1a2FXNW5LQ2QxZEdsc0p5azdYRzRnSUgwZ1kyRjBZMmdnS0dVcElIdDlYRzU5S0NrcE8xeHVYRzR2S2lCT2IyUmxMbXB6SUdobGJIQmxjaUJ5WldabGNtVnVZMlZ6TGlBcUwxeHVkbUZ5SUc1dlpHVkpjMVI1Y0dWa1FYSnlZWGtnUFNCdWIyUmxWWFJwYkNBbUppQnViMlJsVlhScGJDNXBjMVI1Y0dWa1FYSnlZWGs3WEc1Y2JpOHFLbHh1SUNvZ1FXUmtjeUIwYUdVZ2EyVjVMWFpoYkhWbElHQndZV2x5WUNCMGJ5QmdiV0Z3WUM1Y2JpQXFYRzRnS2lCQWNISnBkbUYwWlZ4dUlDb2dRSEJoY21GdElIdFBZbXBsWTNSOUlHMWhjQ0JVYUdVZ2JXRndJSFJ2SUcxdlpHbG1lUzVjYmlBcUlFQndZWEpoYlNCN1FYSnlZWGw5SUhCaGFYSWdWR2hsSUd0bGVTMTJZV3gxWlNCd1lXbHlJSFJ2SUdGa1pDNWNiaUFxSUVCeVpYUjFjbTV6SUh0UFltcGxZM1I5SUZKbGRIVnlibk1nWUcxaGNHQXVYRzRnS2k5Y2JtWjFibU4wYVc5dUlHRmtaRTFoY0VWdWRISjVLRzFoY0N3Z2NHRnBjaWtnZTF4dUlDQXZMeUJFYjI0bmRDQnlaWFIxY200Z1lHMWhjQzV6WlhSZ0lHSmxZMkYxYzJVZ2FYUW5jeUJ1YjNRZ1kyaGhhVzVoWW14bElHbHVJRWxGSURFeExseHVJQ0J0WVhBdWMyVjBLSEJoYVhKYk1GMHNJSEJoYVhKYk1WMHBPMXh1SUNCeVpYUjFjbTRnYldGd08xeHVmVnh1WEc0dktpcGNiaUFxSUVGa1pITWdZSFpoYkhWbFlDQjBieUJnYzJWMFlDNWNiaUFxWEc0Z0tpQkFjSEpwZG1GMFpWeHVJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJSE5sZENCVWFHVWdjMlYwSUhSdklHMXZaR2xtZVM1Y2JpQXFJRUJ3WVhKaGJTQjdLbjBnZG1Gc2RXVWdWR2hsSUhaaGJIVmxJSFJ2SUdGa1pDNWNiaUFxSUVCeVpYUjFjbTV6SUh0UFltcGxZM1I5SUZKbGRIVnlibk1nWUhObGRHQXVYRzRnS2k5Y2JtWjFibU4wYVc5dUlHRmtaRk5sZEVWdWRISjVLSE5sZEN3Z2RtRnNkV1VwSUh0Y2JpQWdMeThnUkc5dUozUWdjbVYwZFhKdUlHQnpaWFF1WVdSa1lDQmlaV05oZFhObElHbDBKM01nYm05MElHTm9ZV2x1WVdKc1pTQnBiaUJKUlNBeE1TNWNiaUFnYzJWMExtRmtaQ2gyWVd4MVpTazdYRzRnSUhKbGRIVnliaUJ6WlhRN1hHNTlYRzVjYmk4cUtseHVJQ29nUVNCbVlYTjBaWElnWVd4MFpYSnVZWFJwZG1VZ2RHOGdZRVoxYm1OMGFXOXVJMkZ3Y0d4NVlDd2dkR2hwY3lCbWRXNWpkR2x2YmlCcGJuWnZhMlZ6SUdCbWRXNWpZRnh1SUNvZ2QybDBhQ0IwYUdVZ1lIUm9hWE5nSUdKcGJtUnBibWNnYjJZZ1lIUm9hWE5CY21kZ0lHRnVaQ0IwYUdVZ1lYSm5kVzFsYm5SeklHOW1JR0JoY21kellDNWNiaUFxWEc0Z0tpQkFjSEpwZG1GMFpWeHVJQ29nUUhCaGNtRnRJSHRHZFc1amRHbHZibjBnWm5WdVl5QlVhR1VnWm5WdVkzUnBiMjRnZEc4Z2FXNTJiMnRsTGx4dUlDb2dRSEJoY21GdElIc3FmU0IwYUdselFYSm5JRlJvWlNCZ2RHaHBjMkFnWW1sdVpHbHVaeUJ2WmlCZ1puVnVZMkF1WEc0Z0tpQkFjR0Z5WVcwZ2UwRnljbUY1ZlNCaGNtZHpJRlJvWlNCaGNtZDFiV1Z1ZEhNZ2RHOGdhVzUyYjJ0bElHQm1kVzVqWUNCM2FYUm9MbHh1SUNvZ1FISmxkSFZ5Ym5NZ2V5cDlJRkpsZEhWeWJuTWdkR2hsSUhKbGMzVnNkQ0J2WmlCZ1puVnVZMkF1WEc0Z0tpOWNibVoxYm1OMGFXOXVJR0Z3Y0d4NUtHWjFibU1zSUhSb2FYTkJjbWNzSUdGeVozTXBJSHRjYmlBZ2MzZHBkR05vSUNoaGNtZHpMbXhsYm1kMGFDa2dlMXh1SUNBZ0lHTmhjMlVnTURvZ2NtVjBkWEp1SUdaMWJtTXVZMkZzYkNoMGFHbHpRWEpuS1R0Y2JpQWdJQ0JqWVhObElERTZJSEpsZEhWeWJpQm1kVzVqTG1OaGJHd29kR2hwYzBGeVp5d2dZWEpuYzFzd1hTazdYRzRnSUNBZ1kyRnpaU0F5T2lCeVpYUjFjbTRnWm5WdVl5NWpZV3hzS0hSb2FYTkJjbWNzSUdGeVozTmJNRjBzSUdGeVozTmJNVjBwTzF4dUlDQWdJR05oYzJVZ016b2djbVYwZFhKdUlHWjFibU11WTJGc2JDaDBhR2x6UVhKbkxDQmhjbWR6V3pCZExDQmhjbWR6V3pGZExDQmhjbWR6V3pKZEtUdGNiaUFnZlZ4dUlDQnlaWFIxY200Z1puVnVZeTVoY0hCc2VTaDBhR2x6UVhKbkxDQmhjbWR6S1R0Y2JuMWNibHh1THlvcVhHNGdLaUJCSUhOd1pXTnBZV3hwZW1Wa0lIWmxjbk5wYjI0Z2IyWWdZRjh1Wm05eVJXRmphR0FnWm05eUlHRnljbUY1Y3lCM2FYUm9iM1YwSUhOMWNIQnZjblFnWm05eVhHNGdLaUJwZEdWeVlYUmxaU0J6YUc5eWRHaGhibVJ6TGx4dUlDcGNiaUFxSUVCd2NtbDJZWFJsWEc0Z0tpQkFjR0Z5WVcwZ2UwRnljbUY1ZlNCYllYSnlZWGxkSUZSb1pTQmhjbkpoZVNCMGJ5QnBkR1Z5WVhSbElHOTJaWEl1WEc0Z0tpQkFjR0Z5WVcwZ2UwWjFibU4wYVc5dWZTQnBkR1Z5WVhSbFpTQlVhR1VnWm5WdVkzUnBiMjRnYVc1MmIydGxaQ0J3WlhJZ2FYUmxjbUYwYVc5dUxseHVJQ29nUUhKbGRIVnlibk1nZTBGeWNtRjVmU0JTWlhSMWNtNXpJR0JoY25KaGVXQXVYRzRnS2k5Y2JtWjFibU4wYVc5dUlHRnljbUY1UldGamFDaGhjbkpoZVN3Z2FYUmxjbUYwWldVcElIdGNiaUFnZG1GeUlHbHVaR1Y0SUQwZ0xURXNYRzRnSUNBZ0lDQnNaVzVuZEdnZ1BTQmhjbkpoZVNBL0lHRnljbUY1TG14bGJtZDBhQ0E2SURBN1hHNWNiaUFnZDJocGJHVWdLQ3NyYVc1a1pYZ2dQQ0JzWlc1bmRHZ3BJSHRjYmlBZ0lDQnBaaUFvYVhSbGNtRjBaV1VvWVhKeVlYbGJhVzVrWlhoZExDQnBibVJsZUN3Z1lYSnlZWGtwSUQwOVBTQm1ZV3h6WlNrZ2UxeHVJQ0FnSUNBZ1luSmxZV3M3WEc0Z0lDQWdmVnh1SUNCOVhHNGdJSEpsZEhWeWJpQmhjbkpoZVR0Y2JuMWNibHh1THlvcVhHNGdLaUJCY0hCbGJtUnpJSFJvWlNCbGJHVnRaVzUwY3lCdlppQmdkbUZzZFdWellDQjBieUJnWVhKeVlYbGdMbHh1SUNwY2JpQXFJRUJ3Y21sMllYUmxYRzRnS2lCQWNHRnlZVzBnZTBGeWNtRjVmU0JoY25KaGVTQlVhR1VnWVhKeVlYa2dkRzhnYlc5a2FXWjVMbHh1SUNvZ1FIQmhjbUZ0SUh0QmNuSmhlWDBnZG1Gc2RXVnpJRlJvWlNCMllXeDFaWE1nZEc4Z1lYQndaVzVrTGx4dUlDb2dRSEpsZEhWeWJuTWdlMEZ5Y21GNWZTQlNaWFIxY201eklHQmhjbkpoZVdBdVhHNGdLaTljYm1aMWJtTjBhVzl1SUdGeWNtRjVVSFZ6YUNoaGNuSmhlU3dnZG1Gc2RXVnpLU0I3WEc0Z0lIWmhjaUJwYm1SbGVDQTlJQzB4TEZ4dUlDQWdJQ0FnYkdWdVozUm9JRDBnZG1Gc2RXVnpMbXhsYm1kMGFDeGNiaUFnSUNBZ0lHOW1abk5sZENBOUlHRnljbUY1TG14bGJtZDBhRHRjYmx4dUlDQjNhR2xzWlNBb0t5dHBibVJsZUNBOElHeGxibWQwYUNrZ2UxeHVJQ0FnSUdGeWNtRjVXMjltWm5ObGRDQXJJR2x1WkdWNFhTQTlJSFpoYkhWbGMxdHBibVJsZUYwN1hHNGdJSDFjYmlBZ2NtVjBkWEp1SUdGeWNtRjVPMXh1ZlZ4dVhHNHZLaXBjYmlBcUlFRWdjM0JsWTJsaGJHbDZaV1FnZG1WeWMybHZiaUJ2WmlCZ1h5NXlaV1IxWTJWZ0lHWnZjaUJoY25KaGVYTWdkMmwwYUc5MWRDQnpkWEJ3YjNKMElHWnZjbHh1SUNvZ2FYUmxjbUYwWldVZ2MyaHZjblJvWVc1a2N5NWNiaUFxWEc0Z0tpQkFjSEpwZG1GMFpWeHVJQ29nUUhCaGNtRnRJSHRCY25KaGVYMGdXMkZ5Y21GNVhTQlVhR1VnWVhKeVlYa2dkRzhnYVhSbGNtRjBaU0J2ZG1WeUxseHVJQ29nUUhCaGNtRnRJSHRHZFc1amRHbHZibjBnYVhSbGNtRjBaV1VnVkdobElHWjFibU4wYVc5dUlHbHVkbTlyWldRZ2NHVnlJR2wwWlhKaGRHbHZiaTVjYmlBcUlFQndZWEpoYlNCN0tuMGdXMkZqWTNWdGRXeGhkRzl5WFNCVWFHVWdhVzVwZEdsaGJDQjJZV3gxWlM1Y2JpQXFJRUJ3WVhKaGJTQjdZbTl2YkdWaGJuMGdXMmx1YVhSQlkyTjFiVjBnVTNCbFkybG1lU0IxYzJsdVp5QjBhR1VnWm1seWMzUWdaV3hsYldWdWRDQnZaaUJnWVhKeVlYbGdJR0Z6WEc0Z0tpQWdkR2hsSUdsdWFYUnBZV3dnZG1Gc2RXVXVYRzRnS2lCQWNtVjBkWEp1Y3lCN0tuMGdVbVYwZFhKdWN5QjBhR1VnWVdOamRXMTFiR0YwWldRZ2RtRnNkV1V1WEc0Z0tpOWNibVoxYm1OMGFXOXVJR0Z5Y21GNVVtVmtkV05sS0dGeWNtRjVMQ0JwZEdWeVlYUmxaU3dnWVdOamRXMTFiR0YwYjNJc0lHbHVhWFJCWTJOMWJTa2dlMXh1SUNCMllYSWdhVzVrWlhnZ1BTQXRNU3hjYmlBZ0lDQWdJR3hsYm1kMGFDQTlJR0Z5Y21GNUlEOGdZWEp5WVhrdWJHVnVaM1JvSURvZ01EdGNibHh1SUNCcFppQW9hVzVwZEVGalkzVnRJQ1ltSUd4bGJtZDBhQ2tnZTF4dUlDQWdJR0ZqWTNWdGRXeGhkRzl5SUQwZ1lYSnlZWGxiS3l0cGJtUmxlRjA3WEc0Z0lIMWNiaUFnZDJocGJHVWdLQ3NyYVc1a1pYZ2dQQ0JzWlc1bmRHZ3BJSHRjYmlBZ0lDQmhZMk4xYlhWc1lYUnZjaUE5SUdsMFpYSmhkR1ZsS0dGalkzVnRkV3hoZEc5eUxDQmhjbkpoZVZ0cGJtUmxlRjBzSUdsdVpHVjRMQ0JoY25KaGVTazdYRzRnSUgxY2JpQWdjbVYwZFhKdUlHRmpZM1Z0ZFd4aGRHOXlPMXh1ZlZ4dVhHNHZLaXBjYmlBcUlGUm9aU0JpWVhObElHbHRjR3hsYldWdWRHRjBhVzl1SUc5bUlHQmZMblJwYldWellDQjNhWFJvYjNWMElITjFjSEJ2Y25RZ1ptOXlJR2wwWlhKaGRHVmxJSE5vYjNKMGFHRnVaSE5jYmlBcUlHOXlJRzFoZUNCaGNuSmhlU0JzWlc1bmRHZ2dZMmhsWTJ0ekxseHVJQ3BjYmlBcUlFQndjbWwyWVhSbFhHNGdLaUJBY0dGeVlXMGdlMjUxYldKbGNuMGdiaUJVYUdVZ2JuVnRZbVZ5SUc5bUlIUnBiV1Z6SUhSdklHbHVkbTlyWlNCZ2FYUmxjbUYwWldWZ0xseHVJQ29nUUhCaGNtRnRJSHRHZFc1amRHbHZibjBnYVhSbGNtRjBaV1VnVkdobElHWjFibU4wYVc5dUlHbHVkbTlyWldRZ2NHVnlJR2wwWlhKaGRHbHZiaTVjYmlBcUlFQnlaWFIxY201eklIdEJjbkpoZVgwZ1VtVjBkWEp1Y3lCMGFHVWdZWEp5WVhrZ2IyWWdjbVZ6ZFd4MGN5NWNiaUFxTDF4dVpuVnVZM1JwYjI0Z1ltRnpaVlJwYldWektHNHNJR2wwWlhKaGRHVmxLU0I3WEc0Z0lIWmhjaUJwYm1SbGVDQTlJQzB4TEZ4dUlDQWdJQ0FnY21WemRXeDBJRDBnUVhKeVlYa29iaWs3WEc1Y2JpQWdkMmhwYkdVZ0tDc3JhVzVrWlhnZ1BDQnVLU0I3WEc0Z0lDQWdjbVZ6ZFd4MFcybHVaR1Y0WFNBOUlHbDBaWEpoZEdWbEtHbHVaR1Y0S1R0Y2JpQWdmVnh1SUNCeVpYUjFjbTRnY21WemRXeDBPMXh1ZlZ4dVhHNHZLaXBjYmlBcUlGUm9aU0JpWVhObElHbHRjR3hsYldWdWRHRjBhVzl1SUc5bUlHQmZMblZ1WVhKNVlDQjNhWFJvYjNWMElITjFjSEJ2Y25RZ1ptOXlJSE4wYjNKcGJtY2diV1YwWVdSaGRHRXVYRzRnS2x4dUlDb2dRSEJ5YVhaaGRHVmNiaUFxSUVCd1lYSmhiU0I3Um5WdVkzUnBiMjU5SUdaMWJtTWdWR2hsSUdaMWJtTjBhVzl1SUhSdklHTmhjQ0JoY21kMWJXVnVkSE1nWm05eUxseHVJQ29nUUhKbGRIVnlibk1nZTBaMWJtTjBhVzl1ZlNCU1pYUjFjbTV6SUhSb1pTQnVaWGNnWTJGd2NHVmtJR1oxYm1OMGFXOXVMbHh1SUNvdlhHNW1kVzVqZEdsdmJpQmlZWE5sVlc1aGNua29ablZ1WXlrZ2UxeHVJQ0J5WlhSMWNtNGdablZ1WTNScGIyNG9kbUZzZFdVcElIdGNiaUFnSUNCeVpYUjFjbTRnWm5WdVl5aDJZV3gxWlNrN1hHNGdJSDA3WEc1OVhHNWNiaThxS2x4dUlDb2dSMlYwY3lCMGFHVWdkbUZzZFdVZ1lYUWdZR3RsZVdBZ2IyWWdZRzlpYW1WamRHQXVYRzRnS2x4dUlDb2dRSEJ5YVhaaGRHVmNiaUFxSUVCd1lYSmhiU0I3VDJKcVpXTjBmU0JiYjJKcVpXTjBYU0JVYUdVZ2IySnFaV04wSUhSdklIRjFaWEo1TGx4dUlDb2dRSEJoY21GdElIdHpkSEpwYm1kOUlHdGxlU0JVYUdVZ2EyVjVJRzltSUhSb1pTQndjbTl3WlhKMGVTQjBieUJuWlhRdVhHNGdLaUJBY21WMGRYSnVjeUI3S24wZ1VtVjBkWEp1Y3lCMGFHVWdjSEp2Y0dWeWRIa2dkbUZzZFdVdVhHNGdLaTljYm1aMWJtTjBhVzl1SUdkbGRGWmhiSFZsS0c5aWFtVmpkQ3dnYTJWNUtTQjdYRzRnSUhKbGRIVnliaUJ2WW1wbFkzUWdQVDBnYm5Wc2JDQS9JSFZ1WkdWbWFXNWxaQ0E2SUc5aWFtVmpkRnRyWlhsZE8xeHVmVnh1WEc0dktpcGNiaUFxSUVOb1pXTnJjeUJwWmlCZ2RtRnNkV1ZnSUdseklHRWdhRzl6ZENCdlltcGxZM1FnYVc0Z1NVVWdQQ0E1TGx4dUlDcGNiaUFxSUVCd2NtbDJZWFJsWEc0Z0tpQkFjR0Z5WVcwZ2V5cDlJSFpoYkhWbElGUm9aU0IyWVd4MVpTQjBieUJqYUdWamF5NWNiaUFxSUVCeVpYUjFjbTV6SUh0aWIyOXNaV0Z1ZlNCU1pYUjFjbTV6SUdCMGNuVmxZQ0JwWmlCZ2RtRnNkV1ZnSUdseklHRWdhRzl6ZENCdlltcGxZM1FzSUdWc2MyVWdZR1poYkhObFlDNWNiaUFxTDF4dVpuVnVZM1JwYjI0Z2FYTkliM04wVDJKcVpXTjBLSFpoYkhWbEtTQjdYRzRnSUM4dklFMWhibmtnYUc5emRDQnZZbXBsWTNSeklHRnlaU0JnVDJKcVpXTjBZQ0J2WW1wbFkzUnpJSFJvWVhRZ1kyRnVJR052WlhKalpTQjBieUJ6ZEhKcGJtZHpYRzRnSUM4dklHUmxjM0JwZEdVZ2FHRjJhVzVuSUdsdGNISnZjR1Z5YkhrZ1pHVm1hVzVsWkNCZ2RHOVRkSEpwYm1kZ0lHMWxkR2h2WkhNdVhHNGdJSFpoY2lCeVpYTjFiSFFnUFNCbVlXeHpaVHRjYmlBZ2FXWWdLSFpoYkhWbElDRTlJRzUxYkd3Z0ppWWdkSGx3Wlc5bUlIWmhiSFZsTG5SdlUzUnlhVzVuSUNFOUlDZG1kVzVqZEdsdmJpY3BJSHRjYmlBZ0lDQjBjbmtnZTF4dUlDQWdJQ0FnY21WemRXeDBJRDBnSVNFb2RtRnNkV1VnS3lBbkp5azdYRzRnSUNBZ2ZTQmpZWFJqYUNBb1pTa2dlMzFjYmlBZ2ZWeHVJQ0J5WlhSMWNtNGdjbVZ6ZFd4ME8xeHVmVnh1WEc0dktpcGNiaUFxSUVOdmJuWmxjblJ6SUdCdFlYQmdJSFJ2SUdsMGN5QnJaWGt0ZG1Gc2RXVWdjR0ZwY25NdVhHNGdLbHh1SUNvZ1FIQnlhWFpoZEdWY2JpQXFJRUJ3WVhKaGJTQjdUMkpxWldOMGZTQnRZWEFnVkdobElHMWhjQ0IwYnlCamIyNTJaWEowTGx4dUlDb2dRSEpsZEhWeWJuTWdlMEZ5Y21GNWZTQlNaWFIxY201eklIUm9aU0JyWlhrdGRtRnNkV1VnY0dGcGNuTXVYRzRnS2k5Y2JtWjFibU4wYVc5dUlHMWhjRlJ2UVhKeVlYa29iV0Z3S1NCN1hHNGdJSFpoY2lCcGJtUmxlQ0E5SUMweExGeHVJQ0FnSUNBZ2NtVnpkV3gwSUQwZ1FYSnlZWGtvYldGd0xuTnBlbVVwTzF4dVhHNGdJRzFoY0M1bWIzSkZZV05vS0daMWJtTjBhVzl1S0haaGJIVmxMQ0JyWlhrcElIdGNiaUFnSUNCeVpYTjFiSFJiS3l0cGJtUmxlRjBnUFNCYmEyVjVMQ0IyWVd4MVpWMDdYRzRnSUgwcE8xeHVJQ0J5WlhSMWNtNGdjbVZ6ZFd4ME8xeHVmVnh1WEc0dktpcGNiaUFxSUVOeVpXRjBaWE1nWVNCMWJtRnllU0JtZFc1amRHbHZiaUIwYUdGMElHbHVkbTlyWlhNZ1lHWjFibU5nSUhkcGRHZ2dhWFJ6SUdGeVozVnRaVzUwSUhSeVlXNXpabTl5YldWa0xseHVJQ3BjYmlBcUlFQndjbWwyWVhSbFhHNGdLaUJBY0dGeVlXMGdlMFoxYm1OMGFXOXVmU0JtZFc1aklGUm9aU0JtZFc1amRHbHZiaUIwYnlCM2NtRndMbHh1SUNvZ1FIQmhjbUZ0SUh0R2RXNWpkR2x2Ym4wZ2RISmhibk5tYjNKdElGUm9aU0JoY21kMWJXVnVkQ0IwY21GdWMyWnZjbTB1WEc0Z0tpQkFjbVYwZFhKdWN5QjdSblZ1WTNScGIyNTlJRkpsZEhWeWJuTWdkR2hsSUc1bGR5Qm1kVzVqZEdsdmJpNWNiaUFxTDF4dVpuVnVZM1JwYjI0Z2IzWmxja0Z5WnlobWRXNWpMQ0IwY21GdWMyWnZjbTBwSUh0Y2JpQWdjbVYwZFhKdUlHWjFibU4wYVc5dUtHRnlaeWtnZTF4dUlDQWdJSEpsZEhWeWJpQm1kVzVqS0hSeVlXNXpabTl5YlNoaGNtY3BLVHRjYmlBZ2ZUdGNibjFjYmx4dUx5b3FYRzRnS2lCRGIyNTJaWEowY3lCZ2MyVjBZQ0IwYnlCaGJpQmhjbkpoZVNCdlppQnBkSE1nZG1Gc2RXVnpMbHh1SUNwY2JpQXFJRUJ3Y21sMllYUmxYRzRnS2lCQWNHRnlZVzBnZTA5aWFtVmpkSDBnYzJWMElGUm9aU0J6WlhRZ2RHOGdZMjl1ZG1WeWRDNWNiaUFxSUVCeVpYUjFjbTV6SUh0QmNuSmhlWDBnVW1WMGRYSnVjeUIwYUdVZ2RtRnNkV1Z6TGx4dUlDb3ZYRzVtZFc1amRHbHZiaUJ6WlhSVWIwRnljbUY1S0hObGRDa2dlMXh1SUNCMllYSWdhVzVrWlhnZ1BTQXRNU3hjYmlBZ0lDQWdJSEpsYzNWc2RDQTlJRUZ5Y21GNUtITmxkQzV6YVhwbEtUdGNibHh1SUNCelpYUXVabTl5UldGamFDaG1kVzVqZEdsdmJpaDJZV3gxWlNrZ2UxeHVJQ0FnSUhKbGMzVnNkRnNySzJsdVpHVjRYU0E5SUhaaGJIVmxPMXh1SUNCOUtUdGNiaUFnY21WMGRYSnVJSEpsYzNWc2REdGNibjFjYmx4dUx5b3FJRlZ6WldRZ1ptOXlJR0oxYVd4MExXbHVJRzFsZEdodlpDQnlaV1psY21WdVkyVnpMaUFxTDF4dWRtRnlJR0Z5Y21GNVVISnZkRzhnUFNCQmNuSmhlUzV3Y205MGIzUjVjR1VzWEc0Z0lDQWdablZ1WTFCeWIzUnZJRDBnUm5WdVkzUnBiMjR1Y0hKdmRHOTBlWEJsTEZ4dUlDQWdJRzlpYW1WamRGQnliM1J2SUQwZ1QySnFaV04wTG5CeWIzUnZkSGx3WlR0Y2JseHVMeW9xSUZWelpXUWdkRzhnWkdWMFpXTjBJRzkyWlhKeVpXRmphR2x1WnlCamIzSmxMV3B6SUhOb2FXMXpMaUFxTDF4dWRtRnlJR052Y21WS2MwUmhkR0VnUFNCeWIyOTBXeWRmWDJOdmNtVXRhbk5mYzJoaGNtVmtYMThuWFR0Y2JseHVMeW9xSUZWelpXUWdkRzhnWkdWMFpXTjBJRzFsZEdodlpITWdiV0Z6Y1hWbGNtRmthVzVuSUdGeklHNWhkR2wyWlM0Z0tpOWNiblpoY2lCdFlYTnJVM0pqUzJWNUlEMGdLR1oxYm1OMGFXOXVLQ2tnZTF4dUlDQjJZWElnZFdsa0lEMGdMMXRlTGwwckpDOHVaWGhsWXloamIzSmxTbk5FWVhSaElDWW1JR052Y21WS2MwUmhkR0V1YTJWNWN5QW1KaUJqYjNKbFNuTkVZWFJoTG10bGVYTXVTVVZmVUZKUFZFOGdmSHdnSnljcE8xeHVJQ0J5WlhSMWNtNGdkV2xrSUQ4Z0tDZFRlVzFpYjJ3b2MzSmpLVjh4TGljZ0t5QjFhV1FwSURvZ0p5YzdYRzU5S0NrcE8xeHVYRzR2S2lvZ1ZYTmxaQ0IwYnlCeVpYTnZiSFpsSUhSb1pTQmtaV052YlhCcGJHVmtJSE52ZFhKalpTQnZaaUJtZFc1amRHbHZibk11SUNvdlhHNTJZWElnWm5WdVkxUnZVM1J5YVc1bklEMGdablZ1WTFCeWIzUnZMblJ2VTNSeWFXNW5PMXh1WEc0dktpb2dWWE5sWkNCMGJ5QmphR1ZqYXlCdlltcGxZM1J6SUdadmNpQnZkMjRnY0hKdmNHVnlkR2xsY3k0Z0tpOWNiblpoY2lCb1lYTlBkMjVRY205d1pYSjBlU0E5SUc5aWFtVmpkRkJ5YjNSdkxtaGhjMDkzYmxCeWIzQmxjblI1TzF4dVhHNHZLaW9nVlhObFpDQjBieUJwYm1abGNpQjBhR1VnWUU5aWFtVmpkR0FnWTI5dWMzUnlkV04wYjNJdUlDb3ZYRzUyWVhJZ2IySnFaV04wUTNSdmNsTjBjbWx1WnlBOUlHWjFibU5VYjFOMGNtbHVaeTVqWVd4c0tFOWlhbVZqZENrN1hHNWNiaThxS2x4dUlDb2dWWE5sWkNCMGJ5QnlaWE52YkhabElIUm9aVnh1SUNvZ1cyQjBiMU4wY21sdVoxUmhaMkJkS0doMGRIQTZMeTlsWTIxaExXbHVkR1Z5Ym1GMGFXOXVZV3d1YjNKbkwyVmpiV0V0TWpZeUx6Y3VNQzhqYzJWakxXOWlhbVZqZEM1d2NtOTBiM1I1Y0dVdWRHOXpkSEpwYm1jcFhHNGdLaUJ2WmlCMllXeDFaWE11WEc0Z0tpOWNiblpoY2lCdlltcGxZM1JVYjFOMGNtbHVaeUE5SUc5aWFtVmpkRkJ5YjNSdkxuUnZVM1J5YVc1bk8xeHVYRzR2S2lvZ1ZYTmxaQ0IwYnlCa1pYUmxZM1FnYVdZZ1lTQnRaWFJvYjJRZ2FYTWdibUYwYVhabExpQXFMMXh1ZG1GeUlISmxTWE5PWVhScGRtVWdQU0JTWldkRmVIQW9KMTRuSUN0Y2JpQWdablZ1WTFSdlUzUnlhVzVuTG1OaGJHd29hR0Z6VDNkdVVISnZjR1Z5ZEhrcExuSmxjR3hoWTJVb2NtVlNaV2RGZUhCRGFHRnlMQ0FuWEZ4Y1hDUW1KeWxjYmlBZ0xuSmxjR3hoWTJVb0wyaGhjMDkzYmxCeWIzQmxjblI1ZkNobWRXNWpkR2x2YmlrdUtqOG9QejFjWEZ4Y1hGd29LWHdnWm05eUlDNHJQeWcvUFZ4Y1hGeGNYRjBwTDJjc0lDY2tNUzRxUHljcElDc2dKeVFuWEc0cE8xeHVYRzR2S2lvZ1FuVnBiSFF0YVc0Z2RtRnNkV1VnY21WbVpYSmxibU5sY3k0Z0tpOWNiblpoY2lCQ2RXWm1aWElnUFNCdGIyUjFiR1ZGZUhCdmNuUnpJRDhnY205dmRDNUNkV1ptWlhJZ09pQjFibVJsWm1sdVpXUXNYRzRnSUNBZ1UzbHRZbTlzSUQwZ2NtOXZkQzVUZVcxaWIyd3NYRzRnSUNBZ1ZXbHVkRGhCY25KaGVTQTlJSEp2YjNRdVZXbHVkRGhCY25KaGVTeGNiaUFnSUNCblpYUlFjbTkwYjNSNWNHVWdQU0J2ZG1WeVFYSm5LRTlpYW1WamRDNW5aWFJRY205MGIzUjVjR1ZQWml3Z1QySnFaV04wS1N4Y2JpQWdJQ0J2WW1wbFkzUkRjbVZoZEdVZ1BTQlBZbXBsWTNRdVkzSmxZWFJsTEZ4dUlDQWdJSEJ5YjNCbGNuUjVTWE5GYm5WdFpYSmhZbXhsSUQwZ2IySnFaV04wVUhKdmRHOHVjSEp2Y0dWeWRIbEpjMFZ1ZFcxbGNtRmliR1VzWEc0Z0lDQWdjM0JzYVdObElEMGdZWEp5WVhsUWNtOTBieTV6Y0d4cFkyVTdYRzVjYmk4cUlFSjFhV3gwTFdsdUlHMWxkR2h2WkNCeVpXWmxjbVZ1WTJWeklHWnZjaUIwYUc5elpTQjNhWFJvSUhSb1pTQnpZVzFsSUc1aGJXVWdZWE1nYjNSb1pYSWdZR3h2WkdGemFHQWdiV1YwYUc5a2N5NGdLaTljYm5aaGNpQnVZWFJwZG1WSFpYUlRlVzFpYjJ4eklEMGdUMkpxWldOMExtZGxkRTkzYmxCeWIzQmxjblI1VTNsdFltOXNjeXhjYmlBZ0lDQnVZWFJwZG1WSmMwSjFabVpsY2lBOUlFSjFabVpsY2lBL0lFSjFabVpsY2k1cGMwSjFabVpsY2lBNklIVnVaR1ZtYVc1bFpDeGNiaUFnSUNCdVlYUnBkbVZMWlhseklEMGdiM1psY2tGeVp5aFBZbXBsWTNRdWEyVjVjeXdnVDJKcVpXTjBLU3hjYmlBZ0lDQnVZWFJwZG1WTllYZ2dQU0JOWVhSb0xtMWhlRHRjYmx4dUx5b2dRblZwYkhRdGFXNGdiV1YwYUc5a0lISmxabVZ5Wlc1alpYTWdkR2hoZENCaGNtVWdkbVZ5YVdacFpXUWdkRzhnWW1VZ2JtRjBhWFpsTGlBcUwxeHVkbUZ5SUVSaGRHRldhV1YzSUQwZ1oyVjBUbUYwYVhabEtISnZiM1FzSUNkRVlYUmhWbWxsZHljcExGeHVJQ0FnSUUxaGNDQTlJR2RsZEU1aGRHbDJaU2h5YjI5MExDQW5UV0Z3Snlrc1hHNGdJQ0FnVUhKdmJXbHpaU0E5SUdkbGRFNWhkR2wyWlNoeWIyOTBMQ0FuVUhKdmJXbHpaU2NwTEZ4dUlDQWdJRk5sZENBOUlHZGxkRTVoZEdsMlpTaHliMjkwTENBblUyVjBKeWtzWEc0Z0lDQWdWMlZoYTAxaGNDQTlJR2RsZEU1aGRHbDJaU2h5YjI5MExDQW5WMlZoYTAxaGNDY3BMRnh1SUNBZ0lHNWhkR2wyWlVOeVpXRjBaU0E5SUdkbGRFNWhkR2wyWlNoUFltcGxZM1FzSUNkamNtVmhkR1VuS1R0Y2JseHVMeW9xSUZWelpXUWdkRzhnWkdWMFpXTjBJRzFoY0hNc0lITmxkSE1zSUdGdVpDQjNaV0ZyYldGd2N5NGdLaTljYm5aaGNpQmtZWFJoVm1sbGQwTjBiM0pUZEhKcGJtY2dQU0IwYjFOdmRYSmpaU2hFWVhSaFZtbGxkeWtzWEc0Z0lDQWdiV0Z3UTNSdmNsTjBjbWx1WnlBOUlIUnZVMjkxY21ObEtFMWhjQ2tzWEc0Z0lDQWdjSEp2YldselpVTjBiM0pUZEhKcGJtY2dQU0IwYjFOdmRYSmpaU2hRY205dGFYTmxLU3hjYmlBZ0lDQnpaWFJEZEc5eVUzUnlhVzVuSUQwZ2RHOVRiM1Z5WTJVb1UyVjBLU3hjYmlBZ0lDQjNaV0ZyVFdGd1EzUnZjbE4wY21sdVp5QTlJSFJ2VTI5MWNtTmxLRmRsWVd0TllYQXBPMXh1WEc0dktpb2dWWE5sWkNCMGJ5QmpiMjUyWlhKMElITjViV0p2YkhNZ2RHOGdjSEpwYldsMGFYWmxjeUJoYm1RZ2MzUnlhVzVuY3k0Z0tpOWNiblpoY2lCemVXMWliMnhRY205MGJ5QTlJRk41YldKdmJDQS9JRk41YldKdmJDNXdjbTkwYjNSNWNHVWdPaUIxYm1SbFptbHVaV1FzWEc0Z0lDQWdjM2x0WW05c1ZtRnNkV1ZQWmlBOUlITjViV0p2YkZCeWIzUnZJRDhnYzNsdFltOXNVSEp2ZEc4dWRtRnNkV1ZQWmlBNklIVnVaR1ZtYVc1bFpEdGNibHh1THlvcVhHNGdLaUJEY21WaGRHVnpJR0VnYUdGemFDQnZZbXBsWTNRdVhHNGdLbHh1SUNvZ1FIQnlhWFpoZEdWY2JpQXFJRUJqYjI1emRISjFZM1J2Y2x4dUlDb2dRSEJoY21GdElIdEJjbkpoZVgwZ1cyVnVkSEpwWlhOZElGUm9aU0JyWlhrdGRtRnNkV1VnY0dGcGNuTWdkRzhnWTJGamFHVXVYRzRnS2k5Y2JtWjFibU4wYVc5dUlFaGhjMmdvWlc1MGNtbGxjeWtnZTF4dUlDQjJZWElnYVc1a1pYZ2dQU0F0TVN4Y2JpQWdJQ0FnSUd4bGJtZDBhQ0E5SUdWdWRISnBaWE1nUHlCbGJuUnlhV1Z6TG14bGJtZDBhQ0E2SURBN1hHNWNiaUFnZEdocGN5NWpiR1ZoY2lncE8xeHVJQ0IzYUdsc1pTQW9LeXRwYm1SbGVDQThJR3hsYm1kMGFDa2dlMXh1SUNBZ0lIWmhjaUJsYm5SeWVTQTlJR1Z1ZEhKcFpYTmJhVzVrWlhoZE8xeHVJQ0FnSUhSb2FYTXVjMlYwS0dWdWRISjVXekJkTENCbGJuUnllVnN4WFNrN1hHNGdJSDFjYm4xY2JseHVMeW9xWEc0Z0tpQlNaVzF2ZG1WeklHRnNiQ0JyWlhrdGRtRnNkV1VnWlc1MGNtbGxjeUJtY205dElIUm9aU0JvWVhOb0xseHVJQ3BjYmlBcUlFQndjbWwyWVhSbFhHNGdLaUJBYm1GdFpTQmpiR1ZoY2x4dUlDb2dRRzFsYldKbGNrOW1JRWhoYzJoY2JpQXFMMXh1Wm5WdVkzUnBiMjRnYUdGemFFTnNaV0Z5S0NrZ2UxeHVJQ0IwYUdsekxsOWZaR0YwWVY5ZklEMGdibUYwYVhabFEzSmxZWFJsSUQ4Z2JtRjBhWFpsUTNKbFlYUmxLRzUxYkd3cElEb2dlMzA3WEc1OVhHNWNiaThxS2x4dUlDb2dVbVZ0YjNabGN5QmdhMlY1WUNCaGJtUWdhWFJ6SUhaaGJIVmxJR1p5YjIwZ2RHaGxJR2hoYzJndVhHNGdLbHh1SUNvZ1FIQnlhWFpoZEdWY2JpQXFJRUJ1WVcxbElHUmxiR1YwWlZ4dUlDb2dRRzFsYldKbGNrOW1JRWhoYzJoY2JpQXFJRUJ3WVhKaGJTQjdUMkpxWldOMGZTQm9ZWE5vSUZSb1pTQm9ZWE5vSUhSdklHMXZaR2xtZVM1Y2JpQXFJRUJ3WVhKaGJTQjdjM1J5YVc1bmZTQnJaWGtnVkdobElHdGxlU0J2WmlCMGFHVWdkbUZzZFdVZ2RHOGdjbVZ0YjNabExseHVJQ29nUUhKbGRIVnlibk1nZTJKdmIyeGxZVzU5SUZKbGRIVnlibk1nWUhSeWRXVmdJR2xtSUhSb1pTQmxiblJ5ZVNCM1lYTWdjbVZ0YjNabFpDd2daV3h6WlNCZ1ptRnNjMlZnTGx4dUlDb3ZYRzVtZFc1amRHbHZiaUJvWVhOb1JHVnNaWFJsS0d0bGVTa2dlMXh1SUNCeVpYUjFjbTRnZEdocGN5NW9ZWE1vYTJWNUtTQW1KaUJrWld4bGRHVWdkR2hwY3k1ZlgyUmhkR0ZmWDF0clpYbGRPMXh1ZlZ4dVhHNHZLaXBjYmlBcUlFZGxkSE1nZEdobElHaGhjMmdnZG1Gc2RXVWdabTl5SUdCclpYbGdMbHh1SUNwY2JpQXFJRUJ3Y21sMllYUmxYRzRnS2lCQWJtRnRaU0JuWlhSY2JpQXFJRUJ0WlcxaVpYSlBaaUJJWVhOb1hHNGdLaUJBY0dGeVlXMGdlM04wY21sdVozMGdhMlY1SUZSb1pTQnJaWGtnYjJZZ2RHaGxJSFpoYkhWbElIUnZJR2RsZEM1Y2JpQXFJRUJ5WlhSMWNtNXpJSHNxZlNCU1pYUjFjbTV6SUhSb1pTQmxiblJ5ZVNCMllXeDFaUzVjYmlBcUwxeHVablZ1WTNScGIyNGdhR0Z6YUVkbGRDaHJaWGtwSUh0Y2JpQWdkbUZ5SUdSaGRHRWdQU0IwYUdsekxsOWZaR0YwWVY5Zk8xeHVJQ0JwWmlBb2JtRjBhWFpsUTNKbFlYUmxLU0I3WEc0Z0lDQWdkbUZ5SUhKbGMzVnNkQ0E5SUdSaGRHRmJhMlY1WFR0Y2JpQWdJQ0J5WlhSMWNtNGdjbVZ6ZFd4MElEMDlQU0JJUVZOSVgxVk9SRVZHU1U1RlJDQS9JSFZ1WkdWbWFXNWxaQ0E2SUhKbGMzVnNkRHRjYmlBZ2ZWeHVJQ0J5WlhSMWNtNGdhR0Z6VDNkdVVISnZjR1Z5ZEhrdVkyRnNiQ2hrWVhSaExDQnJaWGtwSUQ4Z1pHRjBZVnRyWlhsZElEb2dkVzVrWldacGJtVmtPMXh1ZlZ4dVhHNHZLaXBjYmlBcUlFTm9aV05yY3lCcFppQmhJR2hoYzJnZ2RtRnNkV1VnWm05eUlHQnJaWGxnSUdWNGFYTjBjeTVjYmlBcVhHNGdLaUJBY0hKcGRtRjBaVnh1SUNvZ1FHNWhiV1VnYUdGelhHNGdLaUJBYldWdFltVnlUMllnU0dGemFGeHVJQ29nUUhCaGNtRnRJSHR6ZEhKcGJtZDlJR3RsZVNCVWFHVWdhMlY1SUc5bUlIUm9aU0JsYm5SeWVTQjBieUJqYUdWamF5NWNiaUFxSUVCeVpYUjFjbTV6SUh0aWIyOXNaV0Z1ZlNCU1pYUjFjbTV6SUdCMGNuVmxZQ0JwWmlCaGJpQmxiblJ5ZVNCbWIzSWdZR3RsZVdBZ1pYaHBjM1J6TENCbGJITmxJR0JtWVd4elpXQXVYRzRnS2k5Y2JtWjFibU4wYVc5dUlHaGhjMmhJWVhNb2EyVjVLU0I3WEc0Z0lIWmhjaUJrWVhSaElEMGdkR2hwY3k1ZlgyUmhkR0ZmWHp0Y2JpQWdjbVYwZFhKdUlHNWhkR2wyWlVOeVpXRjBaU0EvSUdSaGRHRmJhMlY1WFNBaFBUMGdkVzVrWldacGJtVmtJRG9nYUdGelQzZHVVSEp2Y0dWeWRIa3VZMkZzYkNoa1lYUmhMQ0JyWlhrcE8xeHVmVnh1WEc0dktpcGNiaUFxSUZObGRITWdkR2hsSUdoaGMyZ2dZR3RsZVdBZ2RHOGdZSFpoYkhWbFlDNWNiaUFxWEc0Z0tpQkFjSEpwZG1GMFpWeHVJQ29nUUc1aGJXVWdjMlYwWEc0Z0tpQkFiV1Z0WW1WeVQyWWdTR0Z6YUZ4dUlDb2dRSEJoY21GdElIdHpkSEpwYm1kOUlHdGxlU0JVYUdVZ2EyVjVJRzltSUhSb1pTQjJZV3gxWlNCMGJ5QnpaWFF1WEc0Z0tpQkFjR0Z5WVcwZ2V5cDlJSFpoYkhWbElGUm9aU0IyWVd4MVpTQjBieUJ6WlhRdVhHNGdLaUJBY21WMGRYSnVjeUI3VDJKcVpXTjBmU0JTWlhSMWNtNXpJSFJvWlNCb1lYTm9JR2x1YzNSaGJtTmxMbHh1SUNvdlhHNW1kVzVqZEdsdmJpQm9ZWE5vVTJWMEtHdGxlU3dnZG1Gc2RXVXBJSHRjYmlBZ2RtRnlJR1JoZEdFZ1BTQjBhR2x6TGw5ZlpHRjBZVjlmTzF4dUlDQmtZWFJoVzJ0bGVWMGdQU0FvYm1GMGFYWmxRM0psWVhSbElDWW1JSFpoYkhWbElEMDlQU0IxYm1SbFptbHVaV1FwSUQ4Z1NFRlRTRjlWVGtSRlJrbE9SVVFnT2lCMllXeDFaVHRjYmlBZ2NtVjBkWEp1SUhSb2FYTTdYRzU5WEc1Y2JpOHZJRUZrWkNCdFpYUm9iMlJ6SUhSdklHQklZWE5vWUM1Y2JraGhjMmd1Y0hKdmRHOTBlWEJsTG1Oc1pXRnlJRDBnYUdGemFFTnNaV0Z5TzF4dVNHRnphQzV3Y205MGIzUjVjR1ZiSjJSbGJHVjBaU2RkSUQwZ2FHRnphRVJsYkdWMFpUdGNia2hoYzJndWNISnZkRzkwZVhCbExtZGxkQ0E5SUdoaGMyaEhaWFE3WEc1SVlYTm9MbkJ5YjNSdmRIbHdaUzVvWVhNZ1BTQm9ZWE5vU0dGek8xeHVTR0Z6YUM1d2NtOTBiM1I1Y0dVdWMyVjBJRDBnYUdGemFGTmxkRHRjYmx4dUx5b3FYRzRnS2lCRGNtVmhkR1Z6SUdGdUlHeHBjM1FnWTJGamFHVWdiMkpxWldOMExseHVJQ3BjYmlBcUlFQndjbWwyWVhSbFhHNGdLaUJBWTI5dWMzUnlkV04wYjNKY2JpQXFJRUJ3WVhKaGJTQjdRWEp5WVhsOUlGdGxiblJ5YVdWelhTQlVhR1VnYTJWNUxYWmhiSFZsSUhCaGFYSnpJSFJ2SUdOaFkyaGxMbHh1SUNvdlhHNW1kVzVqZEdsdmJpQk1hWE4wUTJGamFHVW9aVzUwY21sbGN5a2dlMXh1SUNCMllYSWdhVzVrWlhnZ1BTQXRNU3hjYmlBZ0lDQWdJR3hsYm1kMGFDQTlJR1Z1ZEhKcFpYTWdQeUJsYm5SeWFXVnpMbXhsYm1kMGFDQTZJREE3WEc1Y2JpQWdkR2hwY3k1amJHVmhjaWdwTzF4dUlDQjNhR2xzWlNBb0t5dHBibVJsZUNBOElHeGxibWQwYUNrZ2UxeHVJQ0FnSUhaaGNpQmxiblJ5ZVNBOUlHVnVkSEpwWlhOYmFXNWtaWGhkTzF4dUlDQWdJSFJvYVhNdWMyVjBLR1Z1ZEhKNVd6QmRMQ0JsYm5SeWVWc3hYU2s3WEc0Z0lIMWNibjFjYmx4dUx5b3FYRzRnS2lCU1pXMXZkbVZ6SUdGc2JDQnJaWGt0ZG1Gc2RXVWdaVzUwY21sbGN5Qm1jbTl0SUhSb1pTQnNhWE4wSUdOaFkyaGxMbHh1SUNwY2JpQXFJRUJ3Y21sMllYUmxYRzRnS2lCQWJtRnRaU0JqYkdWaGNseHVJQ29nUUcxbGJXSmxjazltSUV4cGMzUkRZV05vWlZ4dUlDb3ZYRzVtZFc1amRHbHZiaUJzYVhOMFEyRmphR1ZEYkdWaGNpZ3BJSHRjYmlBZ2RHaHBjeTVmWDJSaGRHRmZYeUE5SUZ0ZE8xeHVmVnh1WEc0dktpcGNiaUFxSUZKbGJXOTJaWE1nWUd0bGVXQWdZVzVrSUdsMGN5QjJZV3gxWlNCbWNtOXRJSFJvWlNCc2FYTjBJR05oWTJobExseHVJQ3BjYmlBcUlFQndjbWwyWVhSbFhHNGdLaUJBYm1GdFpTQmtaV3hsZEdWY2JpQXFJRUJ0WlcxaVpYSlBaaUJNYVhOMFEyRmphR1ZjYmlBcUlFQndZWEpoYlNCN2MzUnlhVzVuZlNCclpYa2dWR2hsSUd0bGVTQnZaaUIwYUdVZ2RtRnNkV1VnZEc4Z2NtVnRiM1psTGx4dUlDb2dRSEpsZEhWeWJuTWdlMkp2YjJ4bFlXNTlJRkpsZEhWeWJuTWdZSFJ5ZFdWZ0lHbG1JSFJvWlNCbGJuUnllU0IzWVhNZ2NtVnRiM1psWkN3Z1pXeHpaU0JnWm1Gc2MyVmdMbHh1SUNvdlhHNW1kVzVqZEdsdmJpQnNhWE4wUTJGamFHVkVaV3hsZEdVb2EyVjVLU0I3WEc0Z0lIWmhjaUJrWVhSaElEMGdkR2hwY3k1ZlgyUmhkR0ZmWHl4Y2JpQWdJQ0FnSUdsdVpHVjRJRDBnWVhOemIyTkpibVJsZUU5bUtHUmhkR0VzSUd0bGVTazdYRzVjYmlBZ2FXWWdLR2x1WkdWNElEd2dNQ2tnZTF4dUlDQWdJSEpsZEhWeWJpQm1ZV3h6WlR0Y2JpQWdmVnh1SUNCMllYSWdiR0Z6ZEVsdVpHVjRJRDBnWkdGMFlTNXNaVzVuZEdnZ0xTQXhPMXh1SUNCcFppQW9hVzVrWlhnZ1BUMGdiR0Z6ZEVsdVpHVjRLU0I3WEc0Z0lDQWdaR0YwWVM1d2IzQW9LVHRjYmlBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0J6Y0d4cFkyVXVZMkZzYkNoa1lYUmhMQ0JwYm1SbGVDd2dNU2s3WEc0Z0lIMWNiaUFnY21WMGRYSnVJSFJ5ZFdVN1hHNTlYRzVjYmk4cUtseHVJQ29nUjJWMGN5QjBhR1VnYkdsemRDQmpZV05vWlNCMllXeDFaU0JtYjNJZ1lHdGxlV0F1WEc0Z0tseHVJQ29nUUhCeWFYWmhkR1ZjYmlBcUlFQnVZVzFsSUdkbGRGeHVJQ29nUUcxbGJXSmxjazltSUV4cGMzUkRZV05vWlZ4dUlDb2dRSEJoY21GdElIdHpkSEpwYm1kOUlHdGxlU0JVYUdVZ2EyVjVJRzltSUhSb1pTQjJZV3gxWlNCMGJ5Qm5aWFF1WEc0Z0tpQkFjbVYwZFhKdWN5QjdLbjBnVW1WMGRYSnVjeUIwYUdVZ1pXNTBjbmtnZG1Gc2RXVXVYRzRnS2k5Y2JtWjFibU4wYVc5dUlHeHBjM1JEWVdOb1pVZGxkQ2hyWlhrcElIdGNiaUFnZG1GeUlHUmhkR0VnUFNCMGFHbHpMbDlmWkdGMFlWOWZMRnh1SUNBZ0lDQWdhVzVrWlhnZ1BTQmhjM052WTBsdVpHVjRUMllvWkdGMFlTd2dhMlY1S1R0Y2JseHVJQ0J5WlhSMWNtNGdhVzVrWlhnZ1BDQXdJRDhnZFc1a1pXWnBibVZrSURvZ1pHRjBZVnRwYm1SbGVGMWJNVjA3WEc1OVhHNWNiaThxS2x4dUlDb2dRMmhsWTJ0eklHbG1JR0VnYkdsemRDQmpZV05vWlNCMllXeDFaU0JtYjNJZ1lHdGxlV0FnWlhocGMzUnpMbHh1SUNwY2JpQXFJRUJ3Y21sMllYUmxYRzRnS2lCQWJtRnRaU0JvWVhOY2JpQXFJRUJ0WlcxaVpYSlBaaUJNYVhOMFEyRmphR1ZjYmlBcUlFQndZWEpoYlNCN2MzUnlhVzVuZlNCclpYa2dWR2hsSUd0bGVTQnZaaUIwYUdVZ1pXNTBjbmtnZEc4Z1kyaGxZMnN1WEc0Z0tpQkFjbVYwZFhKdWN5QjdZbTl2YkdWaGJuMGdVbVYwZFhKdWN5QmdkSEoxWldBZ2FXWWdZVzRnWlc1MGNua2dabTl5SUdCclpYbGdJR1Y0YVhOMGN5d2daV3h6WlNCZ1ptRnNjMlZnTGx4dUlDb3ZYRzVtZFc1amRHbHZiaUJzYVhOMFEyRmphR1ZJWVhNb2EyVjVLU0I3WEc0Z0lISmxkSFZ5YmlCaGMzTnZZMGx1WkdWNFQyWW9kR2hwY3k1ZlgyUmhkR0ZmWHl3Z2EyVjVLU0ErSUMweE8xeHVmVnh1WEc0dktpcGNiaUFxSUZObGRITWdkR2hsSUd4cGMzUWdZMkZqYUdVZ1lHdGxlV0FnZEc4Z1lIWmhiSFZsWUM1Y2JpQXFYRzRnS2lCQWNISnBkbUYwWlZ4dUlDb2dRRzVoYldVZ2MyVjBYRzRnS2lCQWJXVnRZbVZ5VDJZZ1RHbHpkRU5oWTJobFhHNGdLaUJBY0dGeVlXMGdlM04wY21sdVozMGdhMlY1SUZSb1pTQnJaWGtnYjJZZ2RHaGxJSFpoYkhWbElIUnZJSE5sZEM1Y2JpQXFJRUJ3WVhKaGJTQjdLbjBnZG1Gc2RXVWdWR2hsSUhaaGJIVmxJSFJ2SUhObGRDNWNiaUFxSUVCeVpYUjFjbTV6SUh0UFltcGxZM1I5SUZKbGRIVnlibk1nZEdobElHeHBjM1FnWTJGamFHVWdhVzV6ZEdGdVkyVXVYRzRnS2k5Y2JtWjFibU4wYVc5dUlHeHBjM1JEWVdOb1pWTmxkQ2hyWlhrc0lIWmhiSFZsS1NCN1hHNGdJSFpoY2lCa1lYUmhJRDBnZEdocGN5NWZYMlJoZEdGZlh5eGNiaUFnSUNBZ0lHbHVaR1Y0SUQwZ1lYTnpiMk5KYm1SbGVFOW1LR1JoZEdFc0lHdGxlU2s3WEc1Y2JpQWdhV1lnS0dsdVpHVjRJRHdnTUNrZ2UxeHVJQ0FnSUdSaGRHRXVjSFZ6YUNoYmEyVjVMQ0IyWVd4MVpWMHBPMXh1SUNCOUlHVnNjMlVnZTF4dUlDQWdJR1JoZEdGYmFXNWtaWGhkV3pGZElEMGdkbUZzZFdVN1hHNGdJSDFjYmlBZ2NtVjBkWEp1SUhSb2FYTTdYRzU5WEc1Y2JpOHZJRUZrWkNCdFpYUm9iMlJ6SUhSdklHQk1hWE4wUTJGamFHVmdMbHh1VEdsemRFTmhZMmhsTG5CeWIzUnZkSGx3WlM1amJHVmhjaUE5SUd4cGMzUkRZV05vWlVOc1pXRnlPMXh1VEdsemRFTmhZMmhsTG5CeWIzUnZkSGx3WlZzblpHVnNaWFJsSjEwZ1BTQnNhWE4wUTJGamFHVkVaV3hsZEdVN1hHNU1hWE4wUTJGamFHVXVjSEp2ZEc5MGVYQmxMbWRsZENBOUlHeHBjM1JEWVdOb1pVZGxkRHRjYmt4cGMzUkRZV05vWlM1d2NtOTBiM1I1Y0dVdWFHRnpJRDBnYkdsemRFTmhZMmhsU0dGek8xeHVUR2x6ZEVOaFkyaGxMbkJ5YjNSdmRIbHdaUzV6WlhRZ1BTQnNhWE4wUTJGamFHVlRaWFE3WEc1Y2JpOHFLbHh1SUNvZ1EzSmxZWFJsY3lCaElHMWhjQ0JqWVdOb1pTQnZZbXBsWTNRZ2RHOGdjM1J2Y21VZ2EyVjVMWFpoYkhWbElIQmhhWEp6TGx4dUlDcGNiaUFxSUVCd2NtbDJZWFJsWEc0Z0tpQkFZMjl1YzNSeWRXTjBiM0pjYmlBcUlFQndZWEpoYlNCN1FYSnlZWGw5SUZ0bGJuUnlhV1Z6WFNCVWFHVWdhMlY1TFhaaGJIVmxJSEJoYVhKeklIUnZJR05oWTJobExseHVJQ292WEc1bWRXNWpkR2x2YmlCTllYQkRZV05vWlNobGJuUnlhV1Z6S1NCN1hHNGdJSFpoY2lCcGJtUmxlQ0E5SUMweExGeHVJQ0FnSUNBZ2JHVnVaM1JvSUQwZ1pXNTBjbWxsY3lBL0lHVnVkSEpwWlhNdWJHVnVaM1JvSURvZ01EdGNibHh1SUNCMGFHbHpMbU5zWldGeUtDazdYRzRnSUhkb2FXeGxJQ2dySzJsdVpHVjRJRHdnYkdWdVozUm9LU0I3WEc0Z0lDQWdkbUZ5SUdWdWRISjVJRDBnWlc1MGNtbGxjMXRwYm1SbGVGMDdYRzRnSUNBZ2RHaHBjeTV6WlhRb1pXNTBjbmxiTUYwc0lHVnVkSEo1V3pGZEtUdGNiaUFnZlZ4dWZWeHVYRzR2S2lwY2JpQXFJRkpsYlc5MlpYTWdZV3hzSUd0bGVTMTJZV3gxWlNCbGJuUnlhV1Z6SUdaeWIyMGdkR2hsSUcxaGNDNWNiaUFxWEc0Z0tpQkFjSEpwZG1GMFpWeHVJQ29nUUc1aGJXVWdZMnhsWVhKY2JpQXFJRUJ0WlcxaVpYSlBaaUJOWVhCRFlXTm9aVnh1SUNvdlhHNW1kVzVqZEdsdmJpQnRZWEJEWVdOb1pVTnNaV0Z5S0NrZ2UxeHVJQ0IwYUdsekxsOWZaR0YwWVY5ZklEMGdlMXh1SUNBZ0lDZG9ZWE5vSnpvZ2JtVjNJRWhoYzJnc1hHNGdJQ0FnSjIxaGNDYzZJRzVsZHlBb1RXRndJSHg4SUV4cGMzUkRZV05vWlNrc1hHNGdJQ0FnSjNOMGNtbHVaeWM2SUc1bGR5QklZWE5vWEc0Z0lIMDdYRzU5WEc1Y2JpOHFLbHh1SUNvZ1VtVnRiM1psY3lCZ2EyVjVZQ0JoYm1RZ2FYUnpJSFpoYkhWbElHWnliMjBnZEdobElHMWhjQzVjYmlBcVhHNGdLaUJBY0hKcGRtRjBaVnh1SUNvZ1FHNWhiV1VnWkdWc1pYUmxYRzRnS2lCQWJXVnRZbVZ5VDJZZ1RXRndRMkZqYUdWY2JpQXFJRUJ3WVhKaGJTQjdjM1J5YVc1bmZTQnJaWGtnVkdobElHdGxlU0J2WmlCMGFHVWdkbUZzZFdVZ2RHOGdjbVZ0YjNabExseHVJQ29nUUhKbGRIVnlibk1nZTJKdmIyeGxZVzU5SUZKbGRIVnlibk1nWUhSeWRXVmdJR2xtSUhSb1pTQmxiblJ5ZVNCM1lYTWdjbVZ0YjNabFpDd2daV3h6WlNCZ1ptRnNjMlZnTGx4dUlDb3ZYRzVtZFc1amRHbHZiaUJ0WVhCRFlXTm9aVVJsYkdWMFpTaHJaWGtwSUh0Y2JpQWdjbVYwZFhKdUlHZGxkRTFoY0VSaGRHRW9kR2hwY3l3Z2EyVjVLVnNuWkdWc1pYUmxKMTBvYTJWNUtUdGNibjFjYmx4dUx5b3FYRzRnS2lCSFpYUnpJSFJvWlNCdFlYQWdkbUZzZFdVZ1ptOXlJR0JyWlhsZ0xseHVJQ3BjYmlBcUlFQndjbWwyWVhSbFhHNGdLaUJBYm1GdFpTQm5aWFJjYmlBcUlFQnRaVzFpWlhKUFppQk5ZWEJEWVdOb1pWeHVJQ29nUUhCaGNtRnRJSHR6ZEhKcGJtZDlJR3RsZVNCVWFHVWdhMlY1SUc5bUlIUm9aU0IyWVd4MVpTQjBieUJuWlhRdVhHNGdLaUJBY21WMGRYSnVjeUI3S24wZ1VtVjBkWEp1Y3lCMGFHVWdaVzUwY25rZ2RtRnNkV1V1WEc0Z0tpOWNibVoxYm1OMGFXOXVJRzFoY0VOaFkyaGxSMlYwS0d0bGVTa2dlMXh1SUNCeVpYUjFjbTRnWjJWMFRXRndSR0YwWVNoMGFHbHpMQ0JyWlhrcExtZGxkQ2hyWlhrcE8xeHVmVnh1WEc0dktpcGNiaUFxSUVOb1pXTnJjeUJwWmlCaElHMWhjQ0IyWVd4MVpTQm1iM0lnWUd0bGVXQWdaWGhwYzNSekxseHVJQ3BjYmlBcUlFQndjbWwyWVhSbFhHNGdLaUJBYm1GdFpTQm9ZWE5jYmlBcUlFQnRaVzFpWlhKUFppQk5ZWEJEWVdOb1pWeHVJQ29nUUhCaGNtRnRJSHR6ZEhKcGJtZDlJR3RsZVNCVWFHVWdhMlY1SUc5bUlIUm9aU0JsYm5SeWVTQjBieUJqYUdWamF5NWNiaUFxSUVCeVpYUjFjbTV6SUh0aWIyOXNaV0Z1ZlNCU1pYUjFjbTV6SUdCMGNuVmxZQ0JwWmlCaGJpQmxiblJ5ZVNCbWIzSWdZR3RsZVdBZ1pYaHBjM1J6TENCbGJITmxJR0JtWVd4elpXQXVYRzRnS2k5Y2JtWjFibU4wYVc5dUlHMWhjRU5oWTJobFNHRnpLR3RsZVNrZ2UxeHVJQ0J5WlhSMWNtNGdaMlYwVFdGd1JHRjBZU2gwYUdsekxDQnJaWGtwTG1oaGN5aHJaWGtwTzF4dWZWeHVYRzR2S2lwY2JpQXFJRk5sZEhNZ2RHaGxJRzFoY0NCZ2EyVjVZQ0IwYnlCZ2RtRnNkV1ZnTGx4dUlDcGNiaUFxSUVCd2NtbDJZWFJsWEc0Z0tpQkFibUZ0WlNCelpYUmNiaUFxSUVCdFpXMWlaWEpQWmlCTllYQkRZV05vWlZ4dUlDb2dRSEJoY21GdElIdHpkSEpwYm1kOUlHdGxlU0JVYUdVZ2EyVjVJRzltSUhSb1pTQjJZV3gxWlNCMGJ5QnpaWFF1WEc0Z0tpQkFjR0Z5WVcwZ2V5cDlJSFpoYkhWbElGUm9aU0IyWVd4MVpTQjBieUJ6WlhRdVhHNGdLaUJBY21WMGRYSnVjeUI3VDJKcVpXTjBmU0JTWlhSMWNtNXpJSFJvWlNCdFlYQWdZMkZqYUdVZ2FXNXpkR0Z1WTJVdVhHNGdLaTljYm1aMWJtTjBhVzl1SUcxaGNFTmhZMmhsVTJWMEtHdGxlU3dnZG1Gc2RXVXBJSHRjYmlBZ1oyVjBUV0Z3UkdGMFlTaDBhR2x6TENCclpYa3BMbk5sZENoclpYa3NJSFpoYkhWbEtUdGNiaUFnY21WMGRYSnVJSFJvYVhNN1hHNTlYRzVjYmk4dklFRmtaQ0J0WlhSb2IyUnpJSFJ2SUdCTllYQkRZV05vWldBdVhHNU5ZWEJEWVdOb1pTNXdjbTkwYjNSNWNHVXVZMnhsWVhJZ1BTQnRZWEJEWVdOb1pVTnNaV0Z5TzF4dVRXRndRMkZqYUdVdWNISnZkRzkwZVhCbFd5ZGtaV3hsZEdVblhTQTlJRzFoY0VOaFkyaGxSR1ZzWlhSbE8xeHVUV0Z3UTJGamFHVXVjSEp2ZEc5MGVYQmxMbWRsZENBOUlHMWhjRU5oWTJobFIyVjBPMXh1VFdGd1EyRmphR1V1Y0hKdmRHOTBlWEJsTG1oaGN5QTlJRzFoY0VOaFkyaGxTR0Z6TzF4dVRXRndRMkZqYUdVdWNISnZkRzkwZVhCbExuTmxkQ0E5SUcxaGNFTmhZMmhsVTJWME8xeHVYRzR2S2lwY2JpQXFJRU55WldGMFpYTWdZU0J6ZEdGamF5QmpZV05vWlNCdlltcGxZM1FnZEc4Z2MzUnZjbVVnYTJWNUxYWmhiSFZsSUhCaGFYSnpMbHh1SUNwY2JpQXFJRUJ3Y21sMllYUmxYRzRnS2lCQVkyOXVjM1J5ZFdOMGIzSmNiaUFxSUVCd1lYSmhiU0I3UVhKeVlYbDlJRnRsYm5SeWFXVnpYU0JVYUdVZ2EyVjVMWFpoYkhWbElIQmhhWEp6SUhSdklHTmhZMmhsTGx4dUlDb3ZYRzVtZFc1amRHbHZiaUJUZEdGamF5aGxiblJ5YVdWektTQjdYRzRnSUhSb2FYTXVYMTlrWVhSaFgxOGdQU0J1WlhjZ1RHbHpkRU5oWTJobEtHVnVkSEpwWlhNcE8xeHVmVnh1WEc0dktpcGNiaUFxSUZKbGJXOTJaWE1nWVd4c0lHdGxlUzEyWVd4MVpTQmxiblJ5YVdWeklHWnliMjBnZEdobElITjBZV05yTGx4dUlDcGNiaUFxSUVCd2NtbDJZWFJsWEc0Z0tpQkFibUZ0WlNCamJHVmhjbHh1SUNvZ1FHMWxiV0psY2s5bUlGTjBZV05yWEc0Z0tpOWNibVoxYm1OMGFXOXVJSE4wWVdOclEyeGxZWElvS1NCN1hHNGdJSFJvYVhNdVgxOWtZWFJoWDE4Z1BTQnVaWGNnVEdsemRFTmhZMmhsTzF4dWZWeHVYRzR2S2lwY2JpQXFJRkpsYlc5MlpYTWdZR3RsZVdBZ1lXNWtJR2wwY3lCMllXeDFaU0JtY205dElIUm9aU0J6ZEdGamF5NWNiaUFxWEc0Z0tpQkFjSEpwZG1GMFpWeHVJQ29nUUc1aGJXVWdaR1ZzWlhSbFhHNGdLaUJBYldWdFltVnlUMllnVTNSaFkydGNiaUFxSUVCd1lYSmhiU0I3YzNSeWFXNW5mU0JyWlhrZ1ZHaGxJR3RsZVNCdlppQjBhR1VnZG1Gc2RXVWdkRzhnY21WdGIzWmxMbHh1SUNvZ1FISmxkSFZ5Ym5NZ2UySnZiMnhsWVc1OUlGSmxkSFZ5Ym5NZ1lIUnlkV1ZnSUdsbUlIUm9aU0JsYm5SeWVTQjNZWE1nY21WdGIzWmxaQ3dnWld4elpTQmdabUZzYzJWZ0xseHVJQ292WEc1bWRXNWpkR2x2YmlCemRHRmphMFJsYkdWMFpTaHJaWGtwSUh0Y2JpQWdjbVYwZFhKdUlIUm9hWE11WDE5a1lYUmhYMTliSjJSbGJHVjBaU2RkS0d0bGVTazdYRzU5WEc1Y2JpOHFLbHh1SUNvZ1IyVjBjeUIwYUdVZ2MzUmhZMnNnZG1Gc2RXVWdabTl5SUdCclpYbGdMbHh1SUNwY2JpQXFJRUJ3Y21sMllYUmxYRzRnS2lCQWJtRnRaU0JuWlhSY2JpQXFJRUJ0WlcxaVpYSlBaaUJUZEdGamExeHVJQ29nUUhCaGNtRnRJSHR6ZEhKcGJtZDlJR3RsZVNCVWFHVWdhMlY1SUc5bUlIUm9aU0IyWVd4MVpTQjBieUJuWlhRdVhHNGdLaUJBY21WMGRYSnVjeUI3S24wZ1VtVjBkWEp1Y3lCMGFHVWdaVzUwY25rZ2RtRnNkV1V1WEc0Z0tpOWNibVoxYm1OMGFXOXVJSE4wWVdOclIyVjBLR3RsZVNrZ2UxeHVJQ0J5WlhSMWNtNGdkR2hwY3k1ZlgyUmhkR0ZmWHk1blpYUW9hMlY1S1R0Y2JuMWNibHh1THlvcVhHNGdLaUJEYUdWamEzTWdhV1lnWVNCemRHRmpheUIyWVd4MVpTQm1iM0lnWUd0bGVXQWdaWGhwYzNSekxseHVJQ3BjYmlBcUlFQndjbWwyWVhSbFhHNGdLaUJBYm1GdFpTQm9ZWE5jYmlBcUlFQnRaVzFpWlhKUFppQlRkR0ZqYTF4dUlDb2dRSEJoY21GdElIdHpkSEpwYm1kOUlHdGxlU0JVYUdVZ2EyVjVJRzltSUhSb1pTQmxiblJ5ZVNCMGJ5QmphR1ZqYXk1Y2JpQXFJRUJ5WlhSMWNtNXpJSHRpYjI5c1pXRnVmU0JTWlhSMWNtNXpJR0IwY25WbFlDQnBaaUJoYmlCbGJuUnllU0JtYjNJZ1lHdGxlV0FnWlhocGMzUnpMQ0JsYkhObElHQm1ZV3h6WldBdVhHNGdLaTljYm1aMWJtTjBhVzl1SUhOMFlXTnJTR0Z6S0d0bGVTa2dlMXh1SUNCeVpYUjFjbTRnZEdocGN5NWZYMlJoZEdGZlh5NW9ZWE1vYTJWNUtUdGNibjFjYmx4dUx5b3FYRzRnS2lCVFpYUnpJSFJvWlNCemRHRmpheUJnYTJWNVlDQjBieUJnZG1Gc2RXVmdMbHh1SUNwY2JpQXFJRUJ3Y21sMllYUmxYRzRnS2lCQWJtRnRaU0J6WlhSY2JpQXFJRUJ0WlcxaVpYSlBaaUJUZEdGamExeHVJQ29nUUhCaGNtRnRJSHR6ZEhKcGJtZDlJR3RsZVNCVWFHVWdhMlY1SUc5bUlIUm9aU0IyWVd4MVpTQjBieUJ6WlhRdVhHNGdLaUJBY0dGeVlXMGdleXA5SUhaaGJIVmxJRlJvWlNCMllXeDFaU0IwYnlCelpYUXVYRzRnS2lCQWNtVjBkWEp1Y3lCN1QySnFaV04wZlNCU1pYUjFjbTV6SUhSb1pTQnpkR0ZqYXlCallXTm9aU0JwYm5OMFlXNWpaUzVjYmlBcUwxeHVablZ1WTNScGIyNGdjM1JoWTJ0VFpYUW9hMlY1TENCMllXeDFaU2tnZTF4dUlDQjJZWElnWTJGamFHVWdQU0IwYUdsekxsOWZaR0YwWVY5Zk8xeHVJQ0JwWmlBb1kyRmphR1VnYVc1emRHRnVZMlZ2WmlCTWFYTjBRMkZqYUdVcElIdGNiaUFnSUNCMllYSWdjR0ZwY25NZ1BTQmpZV05vWlM1ZlgyUmhkR0ZmWHp0Y2JpQWdJQ0JwWmlBb0lVMWhjQ0I4ZkNBb2NHRnBjbk11YkdWdVozUm9JRHdnVEVGU1IwVmZRVkpTUVZsZlUwbGFSU0F0SURFcEtTQjdYRzRnSUNBZ0lDQndZV2x5Y3k1d2RYTm9LRnRyWlhrc0lIWmhiSFZsWFNrN1hHNGdJQ0FnSUNCeVpYUjFjbTRnZEdocGN6dGNiaUFnSUNCOVhHNGdJQ0FnWTJGamFHVWdQU0IwYUdsekxsOWZaR0YwWVY5ZklEMGdibVYzSUUxaGNFTmhZMmhsS0hCaGFYSnpLVHRjYmlBZ2ZWeHVJQ0JqWVdOb1pTNXpaWFFvYTJWNUxDQjJZV3gxWlNrN1hHNGdJSEpsZEhWeWJpQjBhR2x6TzF4dWZWeHVYRzR2THlCQlpHUWdiV1YwYUc5a2N5QjBieUJnVTNSaFkydGdMbHh1VTNSaFkyc3VjSEp2ZEc5MGVYQmxMbU5zWldGeUlEMGdjM1JoWTJ0RGJHVmhjanRjYmxOMFlXTnJMbkJ5YjNSdmRIbHdaVnNuWkdWc1pYUmxKMTBnUFNCemRHRmphMFJsYkdWMFpUdGNibE4wWVdOckxuQnliM1J2ZEhsd1pTNW5aWFFnUFNCemRHRmphMGRsZER0Y2JsTjBZV05yTG5CeWIzUnZkSGx3WlM1b1lYTWdQU0J6ZEdGamEwaGhjenRjYmxOMFlXTnJMbkJ5YjNSdmRIbHdaUzV6WlhRZ1BTQnpkR0ZqYTFObGREdGNibHh1THlvcVhHNGdLaUJEY21WaGRHVnpJR0Z1SUdGeWNtRjVJRzltSUhSb1pTQmxiblZ0WlhKaFlteGxJSEJ5YjNCbGNuUjVJRzVoYldWeklHOW1JSFJvWlNCaGNuSmhlUzFzYVd0bElHQjJZV3gxWldBdVhHNGdLbHh1SUNvZ1FIQnlhWFpoZEdWY2JpQXFJRUJ3WVhKaGJTQjdLbjBnZG1Gc2RXVWdWR2hsSUhaaGJIVmxJSFJ2SUhGMVpYSjVMbHh1SUNvZ1FIQmhjbUZ0SUh0aWIyOXNaV0Z1ZlNCcGJtaGxjbWwwWldRZ1UzQmxZMmxtZVNCeVpYUjFjbTVwYm1jZ2FXNW9aWEpwZEdWa0lIQnliM0JsY25SNUlHNWhiV1Z6TGx4dUlDb2dRSEpsZEhWeWJuTWdlMEZ5Y21GNWZTQlNaWFIxY201eklIUm9aU0JoY25KaGVTQnZaaUJ3Y205d1pYSjBlU0J1WVcxbGN5NWNiaUFxTDF4dVpuVnVZM1JwYjI0Z1lYSnlZWGxNYVd0bFMyVjVjeWgyWVd4MVpTd2dhVzVvWlhKcGRHVmtLU0I3WEc0Z0lDOHZJRk5oWm1GeWFTQTRMakVnYldGclpYTWdZR0Z5WjNWdFpXNTBjeTVqWVd4c1pXVmdJR1Z1ZFcxbGNtRmliR1VnYVc0Z2MzUnlhV04wSUcxdlpHVXVYRzRnSUM4dklGTmhabUZ5YVNBNUlHMWhhMlZ6SUdCaGNtZDFiV1Z1ZEhNdWJHVnVaM1JvWUNCbGJuVnRaWEpoWW14bElHbHVJSE4wY21samRDQnRiMlJsTGx4dUlDQjJZWElnY21WemRXeDBJRDBnS0dselFYSnlZWGtvZG1Gc2RXVXBJSHg4SUdselFYSm5kVzFsYm5SektIWmhiSFZsS1NsY2JpQWdJQ0EvSUdKaGMyVlVhVzFsY3loMllXeDFaUzVzWlc1bmRHZ3NJRk4wY21sdVp5bGNiaUFnSUNBNklGdGRPMXh1WEc0Z0lIWmhjaUJzWlc1bmRHZ2dQU0J5WlhOMWJIUXViR1Z1WjNSb0xGeHVJQ0FnSUNBZ2MydHBjRWx1WkdWNFpYTWdQU0FoSVd4bGJtZDBhRHRjYmx4dUlDQm1iM0lnS0haaGNpQnJaWGtnYVc0Z2RtRnNkV1VwSUh0Y2JpQWdJQ0JwWmlBb0tHbHVhR1Z5YVhSbFpDQjhmQ0JvWVhOUGQyNVFjbTl3WlhKMGVTNWpZV3hzS0haaGJIVmxMQ0JyWlhrcEtTQW1KbHh1SUNBZ0lDQWdJQ0FoS0hOcmFYQkpibVJsZUdWeklDWW1JQ2hyWlhrZ1BUMGdKMnhsYm1kMGFDY2dmSHdnYVhOSmJtUmxlQ2hyWlhrc0lHeGxibWQwYUNrcEtTa2dlMXh1SUNBZ0lDQWdjbVZ6ZFd4MExuQjFjMmdvYTJWNUtUdGNiaUFnSUNCOVhHNGdJSDFjYmlBZ2NtVjBkWEp1SUhKbGMzVnNkRHRjYm4xY2JseHVMeW9xWEc0Z0tpQlVhR2x6SUdaMWJtTjBhVzl1SUdseklHeHBhMlVnWUdGemMybG5ibFpoYkhWbFlDQmxlR05sY0hRZ2RHaGhkQ0JwZENCa2IyVnpiaWQwSUdGemMybG5ibHh1SUNvZ1lIVnVaR1ZtYVc1bFpHQWdkbUZzZFdWekxseHVJQ3BjYmlBcUlFQndjbWwyWVhSbFhHNGdLaUJBY0dGeVlXMGdlMDlpYW1WamRIMGdiMkpxWldOMElGUm9aU0J2WW1wbFkzUWdkRzhnYlc5a2FXWjVMbHh1SUNvZ1FIQmhjbUZ0SUh0emRISnBibWQ5SUd0bGVTQlVhR1VnYTJWNUlHOW1JSFJvWlNCd2NtOXdaWEowZVNCMGJ5QmhjM05wWjI0dVhHNGdLaUJBY0dGeVlXMGdleXA5SUhaaGJIVmxJRlJvWlNCMllXeDFaU0IwYnlCaGMzTnBaMjR1WEc0Z0tpOWNibVoxYm1OMGFXOXVJR0Z6YzJsbmJrMWxjbWRsVm1Gc2RXVW9iMkpxWldOMExDQnJaWGtzSUhaaGJIVmxLU0I3WEc0Z0lHbG1JQ2dvZG1Gc2RXVWdJVDA5SUhWdVpHVm1hVzVsWkNBbUppQWhaWEVvYjJKcVpXTjBXMnRsZVYwc0lIWmhiSFZsS1NrZ2ZIeGNiaUFnSUNBZ0lDaDBlWEJsYjJZZ2EyVjVJRDA5SUNkdWRXMWlaWEluSUNZbUlIWmhiSFZsSUQwOVBTQjFibVJsWm1sdVpXUWdKaVlnSVNoclpYa2dhVzRnYjJKcVpXTjBLU2twSUh0Y2JpQWdJQ0J2WW1wbFkzUmJhMlY1WFNBOUlIWmhiSFZsTzF4dUlDQjlYRzU5WEc1Y2JpOHFLbHh1SUNvZ1FYTnphV2R1Y3lCZ2RtRnNkV1ZnSUhSdklHQnJaWGxnSUc5bUlHQnZZbXBsWTNSZ0lHbG1JSFJvWlNCbGVHbHpkR2x1WnlCMllXeDFaU0JwY3lCdWIzUWdaWEYxYVhaaGJHVnVkRnh1SUNvZ2RYTnBibWNnVzJCVFlXMWxWbUZzZFdWYVpYSnZZRjBvYUhSMGNEb3ZMMlZqYldFdGFXNTBaWEp1WVhScGIyNWhiQzV2Y21jdlpXTnRZUzB5TmpJdk55NHdMeU56WldNdGMyRnRaWFpoYkhWbGVtVnlieWxjYmlBcUlHWnZjaUJsY1hWaGJHbDBlU0JqYjIxd1lYSnBjMjl1Y3k1Y2JpQXFYRzRnS2lCQWNISnBkbUYwWlZ4dUlDb2dRSEJoY21GdElIdFBZbXBsWTNSOUlHOWlhbVZqZENCVWFHVWdiMkpxWldOMElIUnZJRzF2WkdsbWVTNWNiaUFxSUVCd1lYSmhiU0I3YzNSeWFXNW5mU0JyWlhrZ1ZHaGxJR3RsZVNCdlppQjBhR1VnY0hKdmNHVnlkSGtnZEc4Z1lYTnphV2R1TGx4dUlDb2dRSEJoY21GdElIc3FmU0IyWVd4MVpTQlVhR1VnZG1Gc2RXVWdkRzhnWVhOemFXZHVMbHh1SUNvdlhHNW1kVzVqZEdsdmJpQmhjM05wWjI1V1lXeDFaU2h2WW1wbFkzUXNJR3RsZVN3Z2RtRnNkV1VwSUh0Y2JpQWdkbUZ5SUc5aWFsWmhiSFZsSUQwZ2IySnFaV04wVzJ0bGVWMDdYRzRnSUdsbUlDZ2hLR2hoYzA5M2JsQnliM0JsY25SNUxtTmhiR3dvYjJKcVpXTjBMQ0JyWlhrcElDWW1JR1Z4S0c5aWFsWmhiSFZsTENCMllXeDFaU2twSUh4OFhHNGdJQ0FnSUNBb2RtRnNkV1VnUFQwOUlIVnVaR1ZtYVc1bFpDQW1KaUFoS0d0bGVTQnBiaUJ2WW1wbFkzUXBLU2tnZTF4dUlDQWdJRzlpYW1WamRGdHJaWGxkSUQwZ2RtRnNkV1U3WEc0Z0lIMWNibjFjYmx4dUx5b3FYRzRnS2lCSFpYUnpJSFJvWlNCcGJtUmxlQ0JoZENCM2FHbGphQ0IwYUdVZ1lHdGxlV0FnYVhNZ1ptOTFibVFnYVc0Z1lHRnljbUY1WUNCdlppQnJaWGt0ZG1Gc2RXVWdjR0ZwY25NdVhHNGdLbHh1SUNvZ1FIQnlhWFpoZEdWY2JpQXFJRUJ3WVhKaGJTQjdRWEp5WVhsOUlHRnljbUY1SUZSb1pTQmhjbkpoZVNCMGJ5QnBibk53WldOMExseHVJQ29nUUhCaGNtRnRJSHNxZlNCclpYa2dWR2hsSUd0bGVTQjBieUJ6WldGeVkyZ2dabTl5TGx4dUlDb2dRSEpsZEhWeWJuTWdlMjUxYldKbGNuMGdVbVYwZFhKdWN5QjBhR1VnYVc1a1pYZ2diMllnZEdobElHMWhkR05vWldRZ2RtRnNkV1VzSUdWc2MyVWdZQzB4WUM1Y2JpQXFMMXh1Wm5WdVkzUnBiMjRnWVhOemIyTkpibVJsZUU5bUtHRnljbUY1TENCclpYa3BJSHRjYmlBZ2RtRnlJR3hsYm1kMGFDQTlJR0Z5Y21GNUxteGxibWQwYUR0Y2JpQWdkMmhwYkdVZ0tHeGxibWQwYUMwdEtTQjdYRzRnSUNBZ2FXWWdLR1Z4S0dGeWNtRjVXMnhsYm1kMGFGMWJNRjBzSUd0bGVTa3BJSHRjYmlBZ0lDQWdJSEpsZEhWeWJpQnNaVzVuZEdnN1hHNGdJQ0FnZlZ4dUlDQjlYRzRnSUhKbGRIVnliaUF0TVR0Y2JuMWNibHh1THlvcVhHNGdLaUJVYUdVZ1ltRnpaU0JwYlhCc1pXMWxiblJoZEdsdmJpQnZaaUJnWHk1aGMzTnBaMjVnSUhkcGRHaHZkWFFnYzNWd2NHOXlkQ0JtYjNJZ2JYVnNkR2x3YkdVZ2MyOTFjbU5sYzF4dUlDb2diM0lnWUdOMWMzUnZiV2w2WlhKZ0lHWjFibU4wYVc5dWN5NWNiaUFxWEc0Z0tpQkFjSEpwZG1GMFpWeHVJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJRzlpYW1WamRDQlVhR1VnWkdWemRHbHVZWFJwYjI0Z2IySnFaV04wTGx4dUlDb2dRSEJoY21GdElIdFBZbXBsWTNSOUlITnZkWEpqWlNCVWFHVWdjMjkxY21ObElHOWlhbVZqZEM1Y2JpQXFJRUJ5WlhSMWNtNXpJSHRQWW1wbFkzUjlJRkpsZEhWeWJuTWdZRzlpYW1WamRHQXVYRzRnS2k5Y2JtWjFibU4wYVc5dUlHSmhjMlZCYzNOcFoyNG9iMkpxWldOMExDQnpiM1Z5WTJVcElIdGNiaUFnY21WMGRYSnVJRzlpYW1WamRDQW1KaUJqYjNCNVQySnFaV04wS0hOdmRYSmpaU3dnYTJWNWN5aHpiM1Z5WTJVcExDQnZZbXBsWTNRcE8xeHVmVnh1WEc0dktpcGNiaUFxSUZSb1pTQmlZWE5sSUdsdGNHeGxiV1Z1ZEdGMGFXOXVJRzltSUdCZkxtTnNiMjVsWUNCaGJtUWdZRjh1WTJ4dmJtVkVaV1Z3WUNCM2FHbGphQ0IwY21GamEzTmNiaUFxSUhSeVlYWmxjbk5sWkNCdlltcGxZM1J6TGx4dUlDcGNiaUFxSUVCd2NtbDJZWFJsWEc0Z0tpQkFjR0Z5WVcwZ2V5cDlJSFpoYkhWbElGUm9aU0IyWVd4MVpTQjBieUJqYkc5dVpTNWNiaUFxSUVCd1lYSmhiU0I3WW05dmJHVmhibjBnVzJselJHVmxjRjBnVTNCbFkybG1lU0JoSUdSbFpYQWdZMnh2Ym1VdVhHNGdLaUJBY0dGeVlXMGdlMkp2YjJ4bFlXNTlJRnRwYzBaMWJHeGRJRk53WldOcFpua2dZU0JqYkc5dVpTQnBibU5zZFdScGJtY2djM2x0WW05c2N5NWNiaUFxSUVCd1lYSmhiU0I3Um5WdVkzUnBiMjU5SUZ0amRYTjBiMjFwZW1WeVhTQlVhR1VnWm5WdVkzUnBiMjRnZEc4Z1kzVnpkRzl0YVhwbElHTnNiMjVwYm1jdVhHNGdLaUJBY0dGeVlXMGdlM04wY21sdVozMGdXMnRsZVYwZ1ZHaGxJR3RsZVNCdlppQmdkbUZzZFdWZ0xseHVJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJRnR2WW1wbFkzUmRJRlJvWlNCd1lYSmxiblFnYjJKcVpXTjBJRzltSUdCMllXeDFaV0F1WEc0Z0tpQkFjR0Z5WVcwZ2UwOWlhbVZqZEgwZ1czTjBZV05yWFNCVWNtRmphM01nZEhKaGRtVnljMlZrSUc5aWFtVmpkSE1nWVc1a0lIUm9aV2x5SUdOc2IyNWxJR052ZFc1MFpYSndZWEowY3k1Y2JpQXFJRUJ5WlhSMWNtNXpJSHNxZlNCU1pYUjFjbTV6SUhSb1pTQmpiRzl1WldRZ2RtRnNkV1V1WEc0Z0tpOWNibVoxYm1OMGFXOXVJR0poYzJWRGJHOXVaU2gyWVd4MVpTd2dhWE5FWldWd0xDQnBjMFoxYkd3c0lHTjFjM1J2YldsNlpYSXNJR3RsZVN3Z2IySnFaV04wTENCemRHRmpheWtnZTF4dUlDQjJZWElnY21WemRXeDBPMXh1SUNCcFppQW9ZM1Z6ZEc5dGFYcGxjaWtnZTF4dUlDQWdJSEpsYzNWc2RDQTlJRzlpYW1WamRDQS9JR04xYzNSdmJXbDZaWElvZG1Gc2RXVXNJR3RsZVN3Z2IySnFaV04wTENCemRHRmpheWtnT2lCamRYTjBiMjFwZW1WeUtIWmhiSFZsS1R0Y2JpQWdmVnh1SUNCcFppQW9jbVZ6ZFd4MElDRTlQU0IxYm1SbFptbHVaV1FwSUh0Y2JpQWdJQ0J5WlhSMWNtNGdjbVZ6ZFd4ME8xeHVJQ0I5WEc0Z0lHbG1JQ2doYVhOUFltcGxZM1FvZG1Gc2RXVXBLU0I3WEc0Z0lDQWdjbVYwZFhKdUlIWmhiSFZsTzF4dUlDQjlYRzRnSUhaaGNpQnBjMEZ5Y2lBOUlHbHpRWEp5WVhrb2RtRnNkV1VwTzF4dUlDQnBaaUFvYVhOQmNuSXBJSHRjYmlBZ0lDQnlaWE4xYkhRZ1BTQnBibWwwUTJ4dmJtVkJjbkpoZVNoMllXeDFaU2s3WEc0Z0lDQWdhV1lnS0NGcGMwUmxaWEFwSUh0Y2JpQWdJQ0FnSUhKbGRIVnliaUJqYjNCNVFYSnlZWGtvZG1Gc2RXVXNJSEpsYzNWc2RDazdYRzRnSUNBZ2ZWeHVJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lIWmhjaUIwWVdjZ1BTQm5aWFJVWVdjb2RtRnNkV1VwTEZ4dUlDQWdJQ0FnSUNCcGMwWjFibU1nUFNCMFlXY2dQVDBnWm5WdVkxUmhaeUI4ZkNCMFlXY2dQVDBnWjJWdVZHRm5PMXh1WEc0Z0lDQWdhV1lnS0dselFuVm1abVZ5S0haaGJIVmxLU2tnZTF4dUlDQWdJQ0FnY21WMGRYSnVJR05zYjI1bFFuVm1abVZ5S0haaGJIVmxMQ0JwYzBSbFpYQXBPMXh1SUNBZ0lIMWNiaUFnSUNCcFppQW9kR0ZuSUQwOUlHOWlhbVZqZEZSaFp5QjhmQ0IwWVdjZ1BUMGdZWEpuYzFSaFp5QjhmQ0FvYVhOR2RXNWpJQ1ltSUNGdlltcGxZM1FwS1NCN1hHNGdJQ0FnSUNCcFppQW9hWE5JYjNOMFQySnFaV04wS0haaGJIVmxLU2tnZTF4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnYjJKcVpXTjBJRDhnZG1Gc2RXVWdPaUI3ZlR0Y2JpQWdJQ0FnSUgxY2JpQWdJQ0FnSUhKbGMzVnNkQ0E5SUdsdWFYUkRiRzl1WlU5aWFtVmpkQ2hwYzBaMWJtTWdQeUI3ZlNBNklIWmhiSFZsS1R0Y2JpQWdJQ0FnSUdsbUlDZ2hhWE5FWldWd0tTQjdYRzRnSUNBZ0lDQWdJSEpsZEhWeWJpQmpiM0I1VTNsdFltOXNjeWgyWVd4MVpTd2dZbUZ6WlVGemMybG5iaWh5WlhOMWJIUXNJSFpoYkhWbEtTazdYRzRnSUNBZ0lDQjlYRzRnSUNBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0FnSUdsbUlDZ2hZMnh2Ym1WaFlteGxWR0ZuYzF0MFlXZGRLU0I3WEc0Z0lDQWdJQ0FnSUhKbGRIVnliaUJ2WW1wbFkzUWdQeUIyWVd4MVpTQTZJSHQ5TzF4dUlDQWdJQ0FnZlZ4dUlDQWdJQ0FnY21WemRXeDBJRDBnYVc1cGRFTnNiMjVsUW5sVVlXY29kbUZzZFdVc0lIUmhaeXdnWW1GelpVTnNiMjVsTENCcGMwUmxaWEFwTzF4dUlDQWdJSDFjYmlBZ2ZWeHVJQ0F2THlCRGFHVmpheUJtYjNJZ1kybHlZM1ZzWVhJZ2NtVm1aWEpsYm1ObGN5QmhibVFnY21WMGRYSnVJR2wwY3lCamIzSnlaWE53YjI1a2FXNW5JR05zYjI1bExseHVJQ0J6ZEdGamF5QjhmQ0FvYzNSaFkyc2dQU0J1WlhjZ1UzUmhZMnNwTzF4dUlDQjJZWElnYzNSaFkydGxaQ0E5SUhOMFlXTnJMbWRsZENoMllXeDFaU2s3WEc0Z0lHbG1JQ2h6ZEdGamEyVmtLU0I3WEc0Z0lDQWdjbVYwZFhKdUlITjBZV05yWldRN1hHNGdJSDFjYmlBZ2MzUmhZMnN1YzJWMEtIWmhiSFZsTENCeVpYTjFiSFFwTzF4dVhHNGdJR2xtSUNnaGFYTkJjbklwSUh0Y2JpQWdJQ0IyWVhJZ2NISnZjSE1nUFNCcGMwWjFiR3dnUHlCblpYUkJiR3hMWlhsektIWmhiSFZsS1NBNklHdGxlWE1vZG1Gc2RXVXBPMXh1SUNCOVhHNGdJR0Z5Y21GNVJXRmphQ2h3Y205d2N5QjhmQ0IyWVd4MVpTd2dablZ1WTNScGIyNG9jM1ZpVm1Gc2RXVXNJR3RsZVNrZ2UxeHVJQ0FnSUdsbUlDaHdjbTl3Y3lrZ2UxeHVJQ0FnSUNBZ2EyVjVJRDBnYzNWaVZtRnNkV1U3WEc0Z0lDQWdJQ0J6ZFdKV1lXeDFaU0E5SUhaaGJIVmxXMnRsZVYwN1hHNGdJQ0FnZlZ4dUlDQWdJQzh2SUZKbFkzVnljMmwyWld4NUlIQnZjSFZzWVhSbElHTnNiMjVsSUNoemRYTmpaWEIwYVdKc1pTQjBieUJqWVd4c0lITjBZV05ySUd4cGJXbDBjeWt1WEc0Z0lDQWdZWE56YVdkdVZtRnNkV1VvY21WemRXeDBMQ0JyWlhrc0lHSmhjMlZEYkc5dVpTaHpkV0pXWVd4MVpTd2dhWE5FWldWd0xDQnBjMFoxYkd3c0lHTjFjM1J2YldsNlpYSXNJR3RsZVN3Z2RtRnNkV1VzSUhOMFlXTnJLU2s3WEc0Z0lIMHBPMXh1SUNCeVpYUjFjbTRnY21WemRXeDBPMXh1ZlZ4dVhHNHZLaXBjYmlBcUlGUm9aU0JpWVhObElHbHRjR3hsYldWdWRHRjBhVzl1SUc5bUlHQmZMbU55WldGMFpXQWdkMmwwYUc5MWRDQnpkWEJ3YjNKMElHWnZjaUJoYzNOcFoyNXBibWRjYmlBcUlIQnliM0JsY25ScFpYTWdkRzhnZEdobElHTnlaV0YwWldRZ2IySnFaV04wTGx4dUlDcGNiaUFxSUVCd2NtbDJZWFJsWEc0Z0tpQkFjR0Z5WVcwZ2UwOWlhbVZqZEgwZ2NISnZkRzkwZVhCbElGUm9aU0J2WW1wbFkzUWdkRzhnYVc1b1pYSnBkQ0JtY205dExseHVJQ29nUUhKbGRIVnlibk1nZTA5aWFtVmpkSDBnVW1WMGRYSnVjeUIwYUdVZ2JtVjNJRzlpYW1WamRDNWNiaUFxTDF4dVpuVnVZM1JwYjI0Z1ltRnpaVU55WldGMFpTaHdjbTkwYnlrZ2UxeHVJQ0J5WlhSMWNtNGdhWE5QWW1wbFkzUW9jSEp2ZEc4cElEOGdiMkpxWldOMFEzSmxZWFJsS0hCeWIzUnZLU0E2SUh0OU8xeHVmVnh1WEc0dktpcGNiaUFxSUZSb1pTQmlZWE5sSUdsdGNHeGxiV1Z1ZEdGMGFXOXVJRzltSUdCblpYUkJiR3hMWlhsellDQmhibVFnWUdkbGRFRnNiRXRsZVhOSmJtQWdkMmhwWTJnZ2RYTmxjMXh1SUNvZ1lHdGxlWE5HZFc1allDQmhibVFnWUhONWJXSnZiSE5HZFc1allDQjBieUJuWlhRZ2RHaGxJR1Z1ZFcxbGNtRmliR1VnY0hKdmNHVnlkSGtnYm1GdFpYTWdZVzVrWEc0Z0tpQnplVzFpYjJ4eklHOW1JR0J2WW1wbFkzUmdMbHh1SUNwY2JpQXFJRUJ3Y21sMllYUmxYRzRnS2lCQWNHRnlZVzBnZTA5aWFtVmpkSDBnYjJKcVpXTjBJRlJvWlNCdlltcGxZM1FnZEc4Z2NYVmxjbmt1WEc0Z0tpQkFjR0Z5WVcwZ2UwWjFibU4wYVc5dWZTQnJaWGx6Um5WdVl5QlVhR1VnWm5WdVkzUnBiMjRnZEc4Z1oyVjBJSFJvWlNCclpYbHpJRzltSUdCdlltcGxZM1JnTGx4dUlDb2dRSEJoY21GdElIdEdkVzVqZEdsdmJuMGdjM2x0WW05c2MwWjFibU1nVkdobElHWjFibU4wYVc5dUlIUnZJR2RsZENCMGFHVWdjM2x0WW05c2N5QnZaaUJnYjJKcVpXTjBZQzVjYmlBcUlFQnlaWFIxY201eklIdEJjbkpoZVgwZ1VtVjBkWEp1Y3lCMGFHVWdZWEp5WVhrZ2IyWWdjSEp2Y0dWeWRIa2dibUZ0WlhNZ1lXNWtJSE41YldKdmJITXVYRzRnS2k5Y2JtWjFibU4wYVc5dUlHSmhjMlZIWlhSQmJHeExaWGx6S0c5aWFtVmpkQ3dnYTJWNWMwWjFibU1zSUhONWJXSnZiSE5HZFc1aktTQjdYRzRnSUhaaGNpQnlaWE4xYkhRZ1BTQnJaWGx6Um5WdVl5aHZZbXBsWTNRcE8xeHVJQ0J5WlhSMWNtNGdhWE5CY25KaGVTaHZZbXBsWTNRcElEOGdjbVZ6ZFd4MElEb2dZWEp5WVhsUWRYTm9LSEpsYzNWc2RDd2djM2x0WW05c2MwWjFibU1vYjJKcVpXTjBLU2s3WEc1OVhHNWNiaThxS2x4dUlDb2dWR2hsSUdKaGMyVWdhVzF3YkdWdFpXNTBZWFJwYjI0Z2IyWWdZR2RsZEZSaFoyQXVYRzRnS2x4dUlDb2dRSEJ5YVhaaGRHVmNiaUFxSUVCd1lYSmhiU0I3S24wZ2RtRnNkV1VnVkdobElIWmhiSFZsSUhSdklIRjFaWEo1TGx4dUlDb2dRSEpsZEhWeWJuTWdlM04wY21sdVozMGdVbVYwZFhKdWN5QjBhR1VnWUhSdlUzUnlhVzVuVkdGbllDNWNiaUFxTDF4dVpuVnVZM1JwYjI0Z1ltRnpaVWRsZEZSaFp5aDJZV3gxWlNrZ2UxeHVJQ0J5WlhSMWNtNGdiMkpxWldOMFZHOVRkSEpwYm1jdVkyRnNiQ2gyWVd4MVpTazdYRzU5WEc1Y2JpOHFLbHh1SUNvZ1ZHaGxJR0poYzJVZ2FXMXdiR1Z0Wlc1MFlYUnBiMjRnYjJZZ1lGOHVhWE5PWVhScGRtVmdJSGRwZEdodmRYUWdZbUZrSUhOb2FXMGdZMmhsWTJ0ekxseHVJQ3BjYmlBcUlFQndjbWwyWVhSbFhHNGdLaUJBY0dGeVlXMGdleXA5SUhaaGJIVmxJRlJvWlNCMllXeDFaU0IwYnlCamFHVmpheTVjYmlBcUlFQnlaWFIxY201eklIdGliMjlzWldGdWZTQlNaWFIxY201eklHQjBjblZsWUNCcFppQmdkbUZzZFdWZ0lHbHpJR0VnYm1GMGFYWmxJR1oxYm1OMGFXOXVMRnh1SUNvZ0lHVnNjMlVnWUdaaGJITmxZQzVjYmlBcUwxeHVablZ1WTNScGIyNGdZbUZ6WlVselRtRjBhWFpsS0haaGJIVmxLU0I3WEc0Z0lHbG1JQ2doYVhOUFltcGxZM1FvZG1Gc2RXVXBJSHg4SUdselRXRnphMlZrS0haaGJIVmxLU2tnZTF4dUlDQWdJSEpsZEhWeWJpQm1ZV3h6WlR0Y2JpQWdmVnh1SUNCMllYSWdjR0YwZEdWeWJpQTlJQ2hwYzBaMWJtTjBhVzl1S0haaGJIVmxLU0I4ZkNCcGMwaHZjM1JQWW1wbFkzUW9kbUZzZFdVcEtTQS9JSEpsU1hOT1lYUnBkbVVnT2lCeVpVbHpTRzl6ZEVOMGIzSTdYRzRnSUhKbGRIVnliaUJ3WVhSMFpYSnVMblJsYzNRb2RHOVRiM1Z5WTJVb2RtRnNkV1VwS1R0Y2JuMWNibHh1THlvcVhHNGdLaUJVYUdVZ1ltRnpaU0JwYlhCc1pXMWxiblJoZEdsdmJpQnZaaUJnWHk1cGMxUjVjR1ZrUVhKeVlYbGdJSGRwZEdodmRYUWdUbTlrWlM1cWN5QnZjSFJwYldsNllYUnBiMjV6TGx4dUlDcGNiaUFxSUVCd2NtbDJZWFJsWEc0Z0tpQkFjR0Z5WVcwZ2V5cDlJSFpoYkhWbElGUm9aU0IyWVd4MVpTQjBieUJqYUdWamF5NWNiaUFxSUVCeVpYUjFjbTV6SUh0aWIyOXNaV0Z1ZlNCU1pYUjFjbTV6SUdCMGNuVmxZQ0JwWmlCZ2RtRnNkV1ZnSUdseklHRWdkSGx3WldRZ1lYSnlZWGtzSUdWc2MyVWdZR1poYkhObFlDNWNiaUFxTDF4dVpuVnVZM1JwYjI0Z1ltRnpaVWx6Vkhsd1pXUkJjbkpoZVNoMllXeDFaU2tnZTF4dUlDQnlaWFIxY200Z2FYTlBZbXBsWTNSTWFXdGxLSFpoYkhWbEtTQW1KbHh1SUNBZ0lHbHpUR1Z1WjNSb0tIWmhiSFZsTG14bGJtZDBhQ2tnSmlZZ0lTRjBlWEJsWkVGeWNtRjVWR0ZuYzF0dlltcGxZM1JVYjFOMGNtbHVaeTVqWVd4c0tIWmhiSFZsS1YwN1hHNTlYRzVjYmk4cUtseHVJQ29nVkdobElHSmhjMlVnYVcxd2JHVnRaVzUwWVhScGIyNGdiMllnWUY4dWEyVjVjMkFnZDJocFkyZ2daRzlsYzI0bmRDQjBjbVZoZENCemNHRnljMlVnWVhKeVlYbHpJR0Z6SUdSbGJuTmxMbHh1SUNwY2JpQXFJRUJ3Y21sMllYUmxYRzRnS2lCQWNHRnlZVzBnZTA5aWFtVmpkSDBnYjJKcVpXTjBJRlJvWlNCdlltcGxZM1FnZEc4Z2NYVmxjbmt1WEc0Z0tpQkFjbVYwZFhKdWN5QjdRWEp5WVhsOUlGSmxkSFZ5Ym5NZ2RHaGxJR0Z5Y21GNUlHOW1JSEJ5YjNCbGNuUjVJRzVoYldWekxseHVJQ292WEc1bWRXNWpkR2x2YmlCaVlYTmxTMlY1Y3lodlltcGxZM1FwSUh0Y2JpQWdhV1lnS0NGcGMxQnliM1J2ZEhsd1pTaHZZbXBsWTNRcEtTQjdYRzRnSUNBZ2NtVjBkWEp1SUc1aGRHbDJaVXRsZVhNb2IySnFaV04wS1R0Y2JpQWdmVnh1SUNCMllYSWdjbVZ6ZFd4MElEMGdXMTA3WEc0Z0lHWnZjaUFvZG1GeUlHdGxlU0JwYmlCUFltcGxZM1FvYjJKcVpXTjBLU2tnZTF4dUlDQWdJR2xtSUNob1lYTlBkMjVRY205d1pYSjBlUzVqWVd4c0tHOWlhbVZqZEN3Z2EyVjVLU0FtSmlCclpYa2dJVDBnSjJOdmJuTjBjblZqZEc5eUp5a2dlMXh1SUNBZ0lDQWdjbVZ6ZFd4MExuQjFjMmdvYTJWNUtUdGNiaUFnSUNCOVhHNGdJSDFjYmlBZ2NtVjBkWEp1SUhKbGMzVnNkRHRjYm4xY2JseHVMeW9xWEc0Z0tpQlVhR1VnWW1GelpTQnBiWEJzWlcxbGJuUmhkR2x2YmlCdlppQmdYeTVyWlhselNXNWdJSGRvYVdOb0lHUnZaWE51SjNRZ2RISmxZWFFnYzNCaGNuTmxJR0Z5Y21GNWN5QmhjeUJrWlc1elpTNWNiaUFxWEc0Z0tpQkFjSEpwZG1GMFpWeHVJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJRzlpYW1WamRDQlVhR1VnYjJKcVpXTjBJSFJ2SUhGMVpYSjVMbHh1SUNvZ1FISmxkSFZ5Ym5NZ2UwRnljbUY1ZlNCU1pYUjFjbTV6SUhSb1pTQmhjbkpoZVNCdlppQndjbTl3WlhKMGVTQnVZVzFsY3k1Y2JpQXFMMXh1Wm5WdVkzUnBiMjRnWW1GelpVdGxlWE5KYmlodlltcGxZM1FwSUh0Y2JpQWdhV1lnS0NGcGMwOWlhbVZqZENodlltcGxZM1FwS1NCN1hHNGdJQ0FnY21WMGRYSnVJRzVoZEdsMlpVdGxlWE5KYmlodlltcGxZM1FwTzF4dUlDQjlYRzRnSUhaaGNpQnBjMUJ5YjNSdklEMGdhWE5RY205MGIzUjVjR1VvYjJKcVpXTjBLU3hjYmlBZ0lDQWdJSEpsYzNWc2RDQTlJRnRkTzF4dVhHNGdJR1p2Y2lBb2RtRnlJR3RsZVNCcGJpQnZZbXBsWTNRcElIdGNiaUFnSUNCcFppQW9JU2hyWlhrZ1BUMGdKMk52Ym5OMGNuVmpkRzl5SnlBbUppQW9hWE5RY205MGJ5QjhmQ0FoYUdGelQzZHVVSEp2Y0dWeWRIa3VZMkZzYkNodlltcGxZM1FzSUd0bGVTa3BLU2tnZTF4dUlDQWdJQ0FnY21WemRXeDBMbkIxYzJnb2EyVjVLVHRjYmlBZ0lDQjlYRzRnSUgxY2JpQWdjbVYwZFhKdUlISmxjM1ZzZER0Y2JuMWNibHh1THlvcVhHNGdLaUJVYUdVZ1ltRnpaU0JwYlhCc1pXMWxiblJoZEdsdmJpQnZaaUJnWHk1dFpYSm5aV0FnZDJsMGFHOTFkQ0J6ZFhCd2IzSjBJR1p2Y2lCdGRXeDBhWEJzWlNCemIzVnlZMlZ6TGx4dUlDcGNiaUFxSUVCd2NtbDJZWFJsWEc0Z0tpQkFjR0Z5WVcwZ2UwOWlhbVZqZEgwZ2IySnFaV04wSUZSb1pTQmtaWE4wYVc1aGRHbHZiaUJ2WW1wbFkzUXVYRzRnS2lCQWNHRnlZVzBnZTA5aWFtVmpkSDBnYzI5MWNtTmxJRlJvWlNCemIzVnlZMlVnYjJKcVpXTjBMbHh1SUNvZ1FIQmhjbUZ0SUh0dWRXMWlaWEo5SUhOeVkwbHVaR1Y0SUZSb1pTQnBibVJsZUNCdlppQmdjMjkxY21ObFlDNWNiaUFxSUVCd1lYSmhiU0I3Um5WdVkzUnBiMjU5SUZ0amRYTjBiMjFwZW1WeVhTQlVhR1VnWm5WdVkzUnBiMjRnZEc4Z1kzVnpkRzl0YVhwbElHMWxjbWRsWkNCMllXeDFaWE11WEc0Z0tpQkFjR0Z5WVcwZ2UwOWlhbVZqZEgwZ1czTjBZV05yWFNCVWNtRmphM01nZEhKaGRtVnljMlZrSUhOdmRYSmpaU0IyWVd4MVpYTWdZVzVrSUhSb1pXbHlJRzFsY21kbFpGeHVJQ29nSUdOdmRXNTBaWEp3WVhKMGN5NWNiaUFxTDF4dVpuVnVZM1JwYjI0Z1ltRnpaVTFsY21kbEtHOWlhbVZqZEN3Z2MyOTFjbU5sTENCemNtTkpibVJsZUN3Z1kzVnpkRzl0YVhwbGNpd2djM1JoWTJzcElIdGNiaUFnYVdZZ0tHOWlhbVZqZENBOVBUMGdjMjkxY21ObEtTQjdYRzRnSUNBZ2NtVjBkWEp1TzF4dUlDQjlYRzRnSUdsbUlDZ2hLR2x6UVhKeVlYa29jMjkxY21ObEtTQjhmQ0JwYzFSNWNHVmtRWEp5WVhrb2MyOTFjbU5sS1NrcElIdGNiaUFnSUNCMllYSWdjSEp2Y0hNZ1BTQmlZWE5sUzJWNWMwbHVLSE52ZFhKalpTazdYRzRnSUgxY2JpQWdZWEp5WVhsRllXTm9LSEJ5YjNCeklIeDhJSE52ZFhKalpTd2dablZ1WTNScGIyNG9jM0pqVm1Gc2RXVXNJR3RsZVNrZ2UxeHVJQ0FnSUdsbUlDaHdjbTl3Y3lrZ2UxeHVJQ0FnSUNBZ2EyVjVJRDBnYzNKalZtRnNkV1U3WEc0Z0lDQWdJQ0J6Y21OV1lXeDFaU0E5SUhOdmRYSmpaVnRyWlhsZE8xeHVJQ0FnSUgxY2JpQWdJQ0JwWmlBb2FYTlBZbXBsWTNRb2MzSmpWbUZzZFdVcEtTQjdYRzRnSUNBZ0lDQnpkR0ZqYXlCOGZDQW9jM1JoWTJzZ1BTQnVaWGNnVTNSaFkyc3BPMXh1SUNBZ0lDQWdZbUZ6WlUxbGNtZGxSR1ZsY0NodlltcGxZM1FzSUhOdmRYSmpaU3dnYTJWNUxDQnpjbU5KYm1SbGVDd2dZbUZ6WlUxbGNtZGxMQ0JqZFhOMGIyMXBlbVZ5TENCemRHRmpheWs3WEc0Z0lDQWdmVnh1SUNBZ0lHVnNjMlVnZTF4dUlDQWdJQ0FnZG1GeUlHNWxkMVpoYkhWbElEMGdZM1Z6ZEc5dGFYcGxjbHh1SUNBZ0lDQWdJQ0EvSUdOMWMzUnZiV2w2WlhJb2IySnFaV04wVzJ0bGVWMHNJSE55WTFaaGJIVmxMQ0FvYTJWNUlDc2dKeWNwTENCdlltcGxZM1FzSUhOdmRYSmpaU3dnYzNSaFkyc3BYRzRnSUNBZ0lDQWdJRG9nZFc1a1pXWnBibVZrTzF4dVhHNGdJQ0FnSUNCcFppQW9ibVYzVm1Gc2RXVWdQVDA5SUhWdVpHVm1hVzVsWkNrZ2UxeHVJQ0FnSUNBZ0lDQnVaWGRXWVd4MVpTQTlJSE55WTFaaGJIVmxPMXh1SUNBZ0lDQWdmVnh1SUNBZ0lDQWdZWE56YVdkdVRXVnlaMlZXWVd4MVpTaHZZbXBsWTNRc0lHdGxlU3dnYm1WM1ZtRnNkV1VwTzF4dUlDQWdJSDFjYmlBZ2ZTazdYRzU5WEc1Y2JpOHFLbHh1SUNvZ1FTQnpjR1ZqYVdGc2FYcGxaQ0IyWlhKemFXOXVJRzltSUdCaVlYTmxUV1Z5WjJWZ0lHWnZjaUJoY25KaGVYTWdZVzVrSUc5aWFtVmpkSE1nZDJocFkyZ2djR1Z5Wm05eWJYTmNiaUFxSUdSbFpYQWdiV1Z5WjJWeklHRnVaQ0IwY21GamEzTWdkSEpoZG1WeWMyVmtJRzlpYW1WamRITWdaVzVoWW14cGJtY2diMkpxWldOMGN5QjNhWFJvSUdOcGNtTjFiR0Z5WEc0Z0tpQnlaV1psY21WdVkyVnpJSFJ2SUdKbElHMWxjbWRsWkM1Y2JpQXFYRzRnS2lCQWNISnBkbUYwWlZ4dUlDb2dRSEJoY21GdElIdFBZbXBsWTNSOUlHOWlhbVZqZENCVWFHVWdaR1Z6ZEdsdVlYUnBiMjRnYjJKcVpXTjBMbHh1SUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I5SUhOdmRYSmpaU0JVYUdVZ2MyOTFjbU5sSUc5aWFtVmpkQzVjYmlBcUlFQndZWEpoYlNCN2MzUnlhVzVuZlNCclpYa2dWR2hsSUd0bGVTQnZaaUIwYUdVZ2RtRnNkV1VnZEc4Z2JXVnlaMlV1WEc0Z0tpQkFjR0Z5WVcwZ2UyNTFiV0psY24wZ2MzSmpTVzVrWlhnZ1ZHaGxJR2x1WkdWNElHOW1JR0J6YjNWeVkyVmdMbHh1SUNvZ1FIQmhjbUZ0SUh0R2RXNWpkR2x2Ym4wZ2JXVnlaMlZHZFc1aklGUm9aU0JtZFc1amRHbHZiaUIwYnlCdFpYSm5aU0IyWVd4MVpYTXVYRzRnS2lCQWNHRnlZVzBnZTBaMWJtTjBhVzl1ZlNCYlkzVnpkRzl0YVhwbGNsMGdWR2hsSUdaMWJtTjBhVzl1SUhSdklHTjFjM1J2YldsNlpTQmhjM05wWjI1bFpDQjJZV3gxWlhNdVhHNGdLaUJBY0dGeVlXMGdlMDlpYW1WamRIMGdXM04wWVdOclhTQlVjbUZqYTNNZ2RISmhkbVZ5YzJWa0lITnZkWEpqWlNCMllXeDFaWE1nWVc1a0lIUm9aV2x5SUcxbGNtZGxaRnh1SUNvZ0lHTnZkVzUwWlhKd1lYSjBjeTVjYmlBcUwxeHVablZ1WTNScGIyNGdZbUZ6WlUxbGNtZGxSR1ZsY0NodlltcGxZM1FzSUhOdmRYSmpaU3dnYTJWNUxDQnpjbU5KYm1SbGVDd2diV1Z5WjJWR2RXNWpMQ0JqZFhOMGIyMXBlbVZ5TENCemRHRmpheWtnZTF4dUlDQjJZWElnYjJKcVZtRnNkV1VnUFNCdlltcGxZM1JiYTJWNVhTeGNiaUFnSUNBZ0lITnlZMVpoYkhWbElEMGdjMjkxY21ObFcydGxlVjBzWEc0Z0lDQWdJQ0J6ZEdGamEyVmtJRDBnYzNSaFkyc3VaMlYwS0hOeVkxWmhiSFZsS1R0Y2JseHVJQ0JwWmlBb2MzUmhZMnRsWkNrZ2UxeHVJQ0FnSUdGemMybG5iazFsY21kbFZtRnNkV1VvYjJKcVpXTjBMQ0JyWlhrc0lITjBZV05yWldRcE8xeHVJQ0FnSUhKbGRIVnlianRjYmlBZ2ZWeHVJQ0IyWVhJZ2JtVjNWbUZzZFdVZ1BTQmpkWE4wYjIxcGVtVnlYRzRnSUNBZ1B5QmpkWE4wYjIxcGVtVnlLRzlpYWxaaGJIVmxMQ0J6Y21OV1lXeDFaU3dnS0d0bGVTQXJJQ2NuS1N3Z2IySnFaV04wTENCemIzVnlZMlVzSUhOMFlXTnJLVnh1SUNBZ0lEb2dkVzVrWldacGJtVmtPMXh1WEc0Z0lIWmhjaUJwYzBOdmJXMXZiaUE5SUc1bGQxWmhiSFZsSUQwOVBTQjFibVJsWm1sdVpXUTdYRzVjYmlBZ2FXWWdLR2x6UTI5dGJXOXVLU0I3WEc0Z0lDQWdibVYzVm1Gc2RXVWdQU0J6Y21OV1lXeDFaVHRjYmlBZ0lDQnBaaUFvYVhOQmNuSmhlU2h6Y21OV1lXeDFaU2tnZkh3Z2FYTlVlWEJsWkVGeWNtRjVLSE55WTFaaGJIVmxLU2tnZTF4dUlDQWdJQ0FnYVdZZ0tHbHpRWEp5WVhrb2IySnFWbUZzZFdVcEtTQjdYRzRnSUNBZ0lDQWdJRzVsZDFaaGJIVmxJRDBnYjJKcVZtRnNkV1U3WEc0Z0lDQWdJQ0I5WEc0Z0lDQWdJQ0JsYkhObElHbG1JQ2hwYzBGeWNtRjVUR2xyWlU5aWFtVmpkQ2h2WW1wV1lXeDFaU2twSUh0Y2JpQWdJQ0FnSUNBZ2JtVjNWbUZzZFdVZ1BTQmpiM0I1UVhKeVlYa29iMkpxVm1Gc2RXVXBPMXh1SUNBZ0lDQWdmVnh1SUNBZ0lDQWdaV3h6WlNCN1hHNGdJQ0FnSUNBZ0lHbHpRMjl0Ylc5dUlEMGdabUZzYzJVN1hHNGdJQ0FnSUNBZ0lHNWxkMVpoYkhWbElEMGdZbUZ6WlVOc2IyNWxLSE55WTFaaGJIVmxMQ0IwY25WbEtUdGNiaUFnSUNBZ0lIMWNiaUFnSUNCOVhHNGdJQ0FnWld4elpTQnBaaUFvYVhOUWJHRnBiazlpYW1WamRDaHpjbU5XWVd4MVpTa2dmSHdnYVhOQmNtZDFiV1Z1ZEhNb2MzSmpWbUZzZFdVcEtTQjdYRzRnSUNBZ0lDQnBaaUFvYVhOQmNtZDFiV1Z1ZEhNb2IySnFWbUZzZFdVcEtTQjdYRzRnSUNBZ0lDQWdJRzVsZDFaaGJIVmxJRDBnZEc5UWJHRnBiazlpYW1WamRDaHZZbXBXWVd4MVpTazdYRzRnSUNBZ0lDQjlYRzRnSUNBZ0lDQmxiSE5sSUdsbUlDZ2hhWE5QWW1wbFkzUW9iMkpxVm1Gc2RXVXBJSHg4SUNoemNtTkpibVJsZUNBbUppQnBjMFoxYm1OMGFXOXVLRzlpYWxaaGJIVmxLU2twSUh0Y2JpQWdJQ0FnSUNBZ2FYTkRiMjF0YjI0Z1BTQm1ZV3h6WlR0Y2JpQWdJQ0FnSUNBZ2JtVjNWbUZzZFdVZ1BTQmlZWE5sUTJ4dmJtVW9jM0pqVm1Gc2RXVXNJSFJ5ZFdVcE8xeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ1pXeHpaU0I3WEc0Z0lDQWdJQ0FnSUc1bGQxWmhiSFZsSUQwZ2IySnFWbUZzZFdVN1hHNGdJQ0FnSUNCOVhHNGdJQ0FnZlZ4dUlDQWdJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ2FYTkRiMjF0YjI0Z1BTQm1ZV3h6WlR0Y2JpQWdJQ0I5WEc0Z0lIMWNiaUFnYVdZZ0tHbHpRMjl0Ylc5dUtTQjdYRzRnSUNBZ0x5OGdVbVZqZFhKemFYWmxiSGtnYldWeVoyVWdiMkpxWldOMGN5QmhibVFnWVhKeVlYbHpJQ2h6ZFhOalpYQjBhV0pzWlNCMGJ5QmpZV3hzSUhOMFlXTnJJR3hwYldsMGN5a3VYRzRnSUNBZ2MzUmhZMnN1YzJWMEtITnlZMVpoYkhWbExDQnVaWGRXWVd4MVpTazdYRzRnSUNBZ2JXVnlaMlZHZFc1aktHNWxkMVpoYkhWbExDQnpjbU5XWVd4MVpTd2djM0pqU1c1a1pYZ3NJR04xYzNSdmJXbDZaWElzSUhOMFlXTnJLVHRjYmlBZ0lDQnpkR0ZqYTFzblpHVnNaWFJsSjEwb2MzSmpWbUZzZFdVcE8xeHVJQ0I5WEc0Z0lHRnpjMmxuYmsxbGNtZGxWbUZzZFdVb2IySnFaV04wTENCclpYa3NJRzVsZDFaaGJIVmxLVHRjYm4xY2JseHVMeW9xWEc0Z0tpQlVhR1VnWW1GelpTQnBiWEJzWlcxbGJuUmhkR2x2YmlCdlppQmdYeTV5WlhOMFlDQjNhR2xqYUNCa2IyVnpiaWQwSUhaaGJHbGtZWFJsSUc5eUlHTnZaWEpqWlNCaGNtZDFiV1Z1ZEhNdVhHNGdLbHh1SUNvZ1FIQnlhWFpoZEdWY2JpQXFJRUJ3WVhKaGJTQjdSblZ1WTNScGIyNTlJR1oxYm1NZ1ZHaGxJR1oxYm1OMGFXOXVJSFJ2SUdGd2NHeDVJR0VnY21WemRDQndZWEpoYldWMFpYSWdkRzh1WEc0Z0tpQkFjR0Z5WVcwZ2UyNTFiV0psY24wZ1czTjBZWEowUFdaMWJtTXViR1Z1WjNSb0xURmRJRlJvWlNCemRHRnlkQ0J3YjNOcGRHbHZiaUJ2WmlCMGFHVWdjbVZ6ZENCd1lYSmhiV1YwWlhJdVhHNGdLaUJBY21WMGRYSnVjeUI3Um5WdVkzUnBiMjU5SUZKbGRIVnlibk1nZEdobElHNWxkeUJtZFc1amRHbHZiaTVjYmlBcUwxeHVablZ1WTNScGIyNGdZbUZ6WlZKbGMzUW9ablZ1WXl3Z2MzUmhjblFwSUh0Y2JpQWdjM1JoY25RZ1BTQnVZWFJwZG1WTllYZ29jM1JoY25RZ1BUMDlJSFZ1WkdWbWFXNWxaQ0EvSUNobWRXNWpMbXhsYm1kMGFDQXRJREVwSURvZ2MzUmhjblFzSURBcE8xeHVJQ0J5WlhSMWNtNGdablZ1WTNScGIyNG9LU0I3WEc0Z0lDQWdkbUZ5SUdGeVozTWdQU0JoY21kMWJXVnVkSE1zWEc0Z0lDQWdJQ0FnSUdsdVpHVjRJRDBnTFRFc1hHNGdJQ0FnSUNBZ0lHeGxibWQwYUNBOUlHNWhkR2wyWlUxaGVDaGhjbWR6TG14bGJtZDBhQ0F0SUhOMFlYSjBMQ0F3S1N4Y2JpQWdJQ0FnSUNBZ1lYSnlZWGtnUFNCQmNuSmhlU2hzWlc1bmRHZ3BPMXh1WEc0Z0lDQWdkMmhwYkdVZ0tDc3JhVzVrWlhnZ1BDQnNaVzVuZEdncElIdGNiaUFnSUNBZ0lHRnljbUY1VzJsdVpHVjRYU0E5SUdGeVozTmJjM1JoY25RZ0t5QnBibVJsZUYwN1hHNGdJQ0FnZlZ4dUlDQWdJR2x1WkdWNElEMGdMVEU3WEc0Z0lDQWdkbUZ5SUc5MGFHVnlRWEpuY3lBOUlFRnljbUY1S0hOMFlYSjBJQ3NnTVNrN1hHNGdJQ0FnZDJocGJHVWdLQ3NyYVc1a1pYZ2dQQ0J6ZEdGeWRDa2dlMXh1SUNBZ0lDQWdiM1JvWlhKQmNtZHpXMmx1WkdWNFhTQTlJR0Z5WjNOYmFXNWtaWGhkTzF4dUlDQWdJSDFjYmlBZ0lDQnZkR2hsY2tGeVozTmJjM1JoY25SZElEMGdZWEp5WVhrN1hHNGdJQ0FnY21WMGRYSnVJR0Z3Y0d4NUtHWjFibU1zSUhSb2FYTXNJRzkwYUdWeVFYSm5jeWs3WEc0Z0lIMDdYRzU5WEc1Y2JpOHFLbHh1SUNvZ1EzSmxZWFJsY3lCaElHTnNiMjVsSUc5bUlDQmdZblZtWm1WeVlDNWNiaUFxWEc0Z0tpQkFjSEpwZG1GMFpWeHVJQ29nUUhCaGNtRnRJSHRDZFdabVpYSjlJR0oxWm1abGNpQlVhR1VnWW5WbVptVnlJSFJ2SUdOc2IyNWxMbHh1SUNvZ1FIQmhjbUZ0SUh0aWIyOXNaV0Z1ZlNCYmFYTkVaV1Z3WFNCVGNHVmphV1o1SUdFZ1pHVmxjQ0JqYkc5dVpTNWNiaUFxSUVCeVpYUjFjbTV6SUh0Q2RXWm1aWEo5SUZKbGRIVnlibk1nZEdobElHTnNiMjVsWkNCaWRXWm1aWEl1WEc0Z0tpOWNibVoxYm1OMGFXOXVJR05zYjI1bFFuVm1abVZ5S0dKMVptWmxjaXdnYVhORVpXVndLU0I3WEc0Z0lHbG1JQ2hwYzBSbFpYQXBJSHRjYmlBZ0lDQnlaWFIxY200Z1luVm1abVZ5TG5Oc2FXTmxLQ2s3WEc0Z0lIMWNiaUFnZG1GeUlISmxjM1ZzZENBOUlHNWxkeUJpZFdabVpYSXVZMjl1YzNSeWRXTjBiM0lvWW5WbVptVnlMbXhsYm1kMGFDazdYRzRnSUdKMVptWmxjaTVqYjNCNUtISmxjM1ZzZENrN1hHNGdJSEpsZEhWeWJpQnlaWE4xYkhRN1hHNTlYRzVjYmk4cUtseHVJQ29nUTNKbFlYUmxjeUJoSUdOc2IyNWxJRzltSUdCaGNuSmhlVUoxWm1abGNtQXVYRzRnS2x4dUlDb2dRSEJ5YVhaaGRHVmNiaUFxSUVCd1lYSmhiU0I3UVhKeVlYbENkV1ptWlhKOUlHRnljbUY1UW5WbVptVnlJRlJvWlNCaGNuSmhlU0JpZFdabVpYSWdkRzhnWTJ4dmJtVXVYRzRnS2lCQWNtVjBkWEp1Y3lCN1FYSnlZWGxDZFdabVpYSjlJRkpsZEhWeWJuTWdkR2hsSUdOc2IyNWxaQ0JoY25KaGVTQmlkV1ptWlhJdVhHNGdLaTljYm1aMWJtTjBhVzl1SUdOc2IyNWxRWEp5WVhsQ2RXWm1aWElvWVhKeVlYbENkV1ptWlhJcElIdGNiaUFnZG1GeUlISmxjM1ZzZENBOUlHNWxkeUJoY25KaGVVSjFabVpsY2k1amIyNXpkSEoxWTNSdmNpaGhjbkpoZVVKMVptWmxjaTVpZVhSbFRHVnVaM1JvS1R0Y2JpQWdibVYzSUZWcGJuUTRRWEp5WVhrb2NtVnpkV3gwS1M1elpYUW9ibVYzSUZWcGJuUTRRWEp5WVhrb1lYSnlZWGxDZFdabVpYSXBLVHRjYmlBZ2NtVjBkWEp1SUhKbGMzVnNkRHRjYm4xY2JseHVMeW9xWEc0Z0tpQkRjbVZoZEdWeklHRWdZMnh2Ym1VZ2IyWWdZR1JoZEdGV2FXVjNZQzVjYmlBcVhHNGdLaUJBY0hKcGRtRjBaVnh1SUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I5SUdSaGRHRldhV1YzSUZSb1pTQmtZWFJoSUhacFpYY2dkRzhnWTJ4dmJtVXVYRzRnS2lCQWNHRnlZVzBnZTJKdmIyeGxZVzU5SUZ0cGMwUmxaWEJkSUZOd1pXTnBabmtnWVNCa1pXVndJR05zYjI1bExseHVJQ29nUUhKbGRIVnlibk1nZTA5aWFtVmpkSDBnVW1WMGRYSnVjeUIwYUdVZ1kyeHZibVZrSUdSaGRHRWdkbWxsZHk1Y2JpQXFMMXh1Wm5WdVkzUnBiMjRnWTJ4dmJtVkVZWFJoVm1sbGR5aGtZWFJoVm1sbGR5d2dhWE5FWldWd0tTQjdYRzRnSUhaaGNpQmlkV1ptWlhJZ1BTQnBjMFJsWlhBZ1B5QmpiRzl1WlVGeWNtRjVRblZtWm1WeUtHUmhkR0ZXYVdWM0xtSjFabVpsY2lrZ09pQmtZWFJoVm1sbGR5NWlkV1ptWlhJN1hHNGdJSEpsZEhWeWJpQnVaWGNnWkdGMFlWWnBaWGN1WTI5dWMzUnlkV04wYjNJb1luVm1abVZ5TENCa1lYUmhWbWxsZHk1aWVYUmxUMlptYzJWMExDQmtZWFJoVm1sbGR5NWllWFJsVEdWdVozUm9LVHRjYm4xY2JseHVMeW9xWEc0Z0tpQkRjbVZoZEdWeklHRWdZMnh2Ym1VZ2IyWWdZRzFoY0dBdVhHNGdLbHh1SUNvZ1FIQnlhWFpoZEdWY2JpQXFJRUJ3WVhKaGJTQjdUMkpxWldOMGZTQnRZWEFnVkdobElHMWhjQ0IwYnlCamJHOXVaUzVjYmlBcUlFQndZWEpoYlNCN1JuVnVZM1JwYjI1OUlHTnNiMjVsUm5WdVl5QlVhR1VnWm5WdVkzUnBiMjRnZEc4Z1kyeHZibVVnZG1Gc2RXVnpMbHh1SUNvZ1FIQmhjbUZ0SUh0aWIyOXNaV0Z1ZlNCYmFYTkVaV1Z3WFNCVGNHVmphV1o1SUdFZ1pHVmxjQ0JqYkc5dVpTNWNiaUFxSUVCeVpYUjFjbTV6SUh0UFltcGxZM1I5SUZKbGRIVnlibk1nZEdobElHTnNiMjVsWkNCdFlYQXVYRzRnS2k5Y2JtWjFibU4wYVc5dUlHTnNiMjVsVFdGd0tHMWhjQ3dnYVhORVpXVndMQ0JqYkc5dVpVWjFibU1wSUh0Y2JpQWdkbUZ5SUdGeWNtRjVJRDBnYVhORVpXVndJRDhnWTJ4dmJtVkdkVzVqS0cxaGNGUnZRWEp5WVhrb2JXRndLU3dnZEhKMVpTa2dPaUJ0WVhCVWIwRnljbUY1S0cxaGNDazdYRzRnSUhKbGRIVnliaUJoY25KaGVWSmxaSFZqWlNoaGNuSmhlU3dnWVdSa1RXRndSVzUwY25rc0lHNWxkeUJ0WVhBdVkyOXVjM1J5ZFdOMGIzSXBPMXh1ZlZ4dVhHNHZLaXBjYmlBcUlFTnlaV0YwWlhNZ1lTQmpiRzl1WlNCdlppQmdjbVZuWlhod1lDNWNiaUFxWEc0Z0tpQkFjSEpwZG1GMFpWeHVJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJSEpsWjJWNGNDQlVhR1VnY21WblpYaHdJSFJ2SUdOc2IyNWxMbHh1SUNvZ1FISmxkSFZ5Ym5NZ2UwOWlhbVZqZEgwZ1VtVjBkWEp1Y3lCMGFHVWdZMnh2Ym1Wa0lISmxaMlY0Y0M1Y2JpQXFMMXh1Wm5WdVkzUnBiMjRnWTJ4dmJtVlNaV2RGZUhBb2NtVm5aWGh3S1NCN1hHNGdJSFpoY2lCeVpYTjFiSFFnUFNCdVpYY2djbVZuWlhod0xtTnZibk4wY25WamRHOXlLSEpsWjJWNGNDNXpiM1Z5WTJVc0lISmxSbXhoWjNNdVpYaGxZeWh5WldkbGVIQXBLVHRjYmlBZ2NtVnpkV3gwTG14aGMzUkpibVJsZUNBOUlISmxaMlY0Y0M1c1lYTjBTVzVrWlhnN1hHNGdJSEpsZEhWeWJpQnlaWE4xYkhRN1hHNTlYRzVjYmk4cUtseHVJQ29nUTNKbFlYUmxjeUJoSUdOc2IyNWxJRzltSUdCelpYUmdMbHh1SUNwY2JpQXFJRUJ3Y21sMllYUmxYRzRnS2lCQWNHRnlZVzBnZTA5aWFtVmpkSDBnYzJWMElGUm9aU0J6WlhRZ2RHOGdZMnh2Ym1VdVhHNGdLaUJBY0dGeVlXMGdlMFoxYm1OMGFXOXVmU0JqYkc5dVpVWjFibU1nVkdobElHWjFibU4wYVc5dUlIUnZJR05zYjI1bElIWmhiSFZsY3k1Y2JpQXFJRUJ3WVhKaGJTQjdZbTl2YkdWaGJuMGdXMmx6UkdWbGNGMGdVM0JsWTJsbWVTQmhJR1JsWlhBZ1kyeHZibVV1WEc0Z0tpQkFjbVYwZFhKdWN5QjdUMkpxWldOMGZTQlNaWFIxY201eklIUm9aU0JqYkc5dVpXUWdjMlYwTGx4dUlDb3ZYRzVtZFc1amRHbHZiaUJqYkc5dVpWTmxkQ2h6WlhRc0lHbHpSR1ZsY0N3Z1kyeHZibVZHZFc1aktTQjdYRzRnSUhaaGNpQmhjbkpoZVNBOUlHbHpSR1ZsY0NBL0lHTnNiMjVsUm5WdVl5aHpaWFJVYjBGeWNtRjVLSE5sZENrc0lIUnlkV1VwSURvZ2MyVjBWRzlCY25KaGVTaHpaWFFwTzF4dUlDQnlaWFIxY200Z1lYSnlZWGxTWldSMVkyVW9ZWEp5WVhrc0lHRmtaRk5sZEVWdWRISjVMQ0J1WlhjZ2MyVjBMbU52Ym5OMGNuVmpkRzl5S1R0Y2JuMWNibHh1THlvcVhHNGdLaUJEY21WaGRHVnpJR0VnWTJ4dmJtVWdiMllnZEdobElHQnplVzFpYjJ4Z0lHOWlhbVZqZEM1Y2JpQXFYRzRnS2lCQWNISnBkbUYwWlZ4dUlDb2dRSEJoY21GdElIdFBZbXBsWTNSOUlITjViV0p2YkNCVWFHVWdjM2x0WW05c0lHOWlhbVZqZENCMGJ5QmpiRzl1WlM1Y2JpQXFJRUJ5WlhSMWNtNXpJSHRQWW1wbFkzUjlJRkpsZEhWeWJuTWdkR2hsSUdOc2IyNWxaQ0J6ZVcxaWIyd2diMkpxWldOMExseHVJQ292WEc1bWRXNWpkR2x2YmlCamJHOXVaVk41YldKdmJDaHplVzFpYjJ3cElIdGNiaUFnY21WMGRYSnVJSE41YldKdmJGWmhiSFZsVDJZZ1B5QlBZbXBsWTNRb2MzbHRZbTlzVm1Gc2RXVlBaaTVqWVd4c0tITjViV0p2YkNrcElEb2dlMzA3WEc1OVhHNWNiaThxS2x4dUlDb2dRM0psWVhSbGN5QmhJR05zYjI1bElHOW1JR0IwZVhCbFpFRnljbUY1WUM1Y2JpQXFYRzRnS2lCQWNISnBkbUYwWlZ4dUlDb2dRSEJoY21GdElIdFBZbXBsWTNSOUlIUjVjR1ZrUVhKeVlYa2dWR2hsSUhSNWNHVmtJR0Z5Y21GNUlIUnZJR05zYjI1bExseHVJQ29nUUhCaGNtRnRJSHRpYjI5c1pXRnVmU0JiYVhORVpXVndYU0JUY0dWamFXWjVJR0VnWkdWbGNDQmpiRzl1WlM1Y2JpQXFJRUJ5WlhSMWNtNXpJSHRQWW1wbFkzUjlJRkpsZEhWeWJuTWdkR2hsSUdOc2IyNWxaQ0IwZVhCbFpDQmhjbkpoZVM1Y2JpQXFMMXh1Wm5WdVkzUnBiMjRnWTJ4dmJtVlVlWEJsWkVGeWNtRjVLSFI1Y0dWa1FYSnlZWGtzSUdselJHVmxjQ2tnZTF4dUlDQjJZWElnWW5WbVptVnlJRDBnYVhORVpXVndJRDhnWTJ4dmJtVkJjbkpoZVVKMVptWmxjaWgwZVhCbFpFRnljbUY1TG1KMVptWmxjaWtnT2lCMGVYQmxaRUZ5Y21GNUxtSjFabVpsY2p0Y2JpQWdjbVYwZFhKdUlHNWxkeUIwZVhCbFpFRnljbUY1TG1OdmJuTjBjblZqZEc5eUtHSjFabVpsY2l3Z2RIbHdaV1JCY25KaGVTNWllWFJsVDJabWMyVjBMQ0IwZVhCbFpFRnljbUY1TG14bGJtZDBhQ2s3WEc1OVhHNWNiaThxS2x4dUlDb2dRMjl3YVdWeklIUm9aU0IyWVd4MVpYTWdiMllnWUhOdmRYSmpaV0FnZEc4Z1lHRnljbUY1WUM1Y2JpQXFYRzRnS2lCQWNISnBkbUYwWlZ4dUlDb2dRSEJoY21GdElIdEJjbkpoZVgwZ2MyOTFjbU5sSUZSb1pTQmhjbkpoZVNCMGJ5QmpiM0I1SUhaaGJIVmxjeUJtY205dExseHVJQ29nUUhCaGNtRnRJSHRCY25KaGVYMGdXMkZ5Y21GNVBWdGRYU0JVYUdVZ1lYSnlZWGtnZEc4Z1kyOXdlU0IyWVd4MVpYTWdkRzh1WEc0Z0tpQkFjbVYwZFhKdWN5QjdRWEp5WVhsOUlGSmxkSFZ5Ym5NZ1lHRnljbUY1WUM1Y2JpQXFMMXh1Wm5WdVkzUnBiMjRnWTI5d2VVRnljbUY1S0hOdmRYSmpaU3dnWVhKeVlYa3BJSHRjYmlBZ2RtRnlJR2x1WkdWNElEMGdMVEVzWEc0Z0lDQWdJQ0JzWlc1bmRHZ2dQU0J6YjNWeVkyVXViR1Z1WjNSb08xeHVYRzRnSUdGeWNtRjVJSHg4SUNoaGNuSmhlU0E5SUVGeWNtRjVLR3hsYm1kMGFDa3BPMXh1SUNCM2FHbHNaU0FvS3l0cGJtUmxlQ0E4SUd4bGJtZDBhQ2tnZTF4dUlDQWdJR0Z5Y21GNVcybHVaR1Y0WFNBOUlITnZkWEpqWlZ0cGJtUmxlRjA3WEc0Z0lIMWNiaUFnY21WMGRYSnVJR0Z5Y21GNU8xeHVmVnh1WEc0dktpcGNiaUFxSUVOdmNHbGxjeUJ3Y205d1pYSjBhV1Z6SUc5bUlHQnpiM1Z5WTJWZ0lIUnZJR0J2WW1wbFkzUmdMbHh1SUNwY2JpQXFJRUJ3Y21sMllYUmxYRzRnS2lCQWNHRnlZVzBnZTA5aWFtVmpkSDBnYzI5MWNtTmxJRlJvWlNCdlltcGxZM1FnZEc4Z1kyOXdlU0J3Y205d1pYSjBhV1Z6SUdaeWIyMHVYRzRnS2lCQWNHRnlZVzBnZTBGeWNtRjVmU0J3Y205d2N5QlVhR1VnY0hKdmNHVnlkSGtnYVdSbGJuUnBabWxsY25NZ2RHOGdZMjl3ZVM1Y2JpQXFJRUJ3WVhKaGJTQjdUMkpxWldOMGZTQmJiMkpxWldOMFBYdDlYU0JVYUdVZ2IySnFaV04wSUhSdklHTnZjSGtnY0hKdmNHVnlkR2xsY3lCMGJ5NWNiaUFxSUVCd1lYSmhiU0I3Um5WdVkzUnBiMjU5SUZ0amRYTjBiMjFwZW1WeVhTQlVhR1VnWm5WdVkzUnBiMjRnZEc4Z1kzVnpkRzl0YVhwbElHTnZjR2xsWkNCMllXeDFaWE11WEc0Z0tpQkFjbVYwZFhKdWN5QjdUMkpxWldOMGZTQlNaWFIxY201eklHQnZZbXBsWTNSZ0xseHVJQ292WEc1bWRXNWpkR2x2YmlCamIzQjVUMkpxWldOMEtITnZkWEpqWlN3Z2NISnZjSE1zSUc5aWFtVmpkQ3dnWTNWemRHOXRhWHBsY2lrZ2UxeHVJQ0J2WW1wbFkzUWdmSHdnS0c5aWFtVmpkQ0E5SUh0OUtUdGNibHh1SUNCMllYSWdhVzVrWlhnZ1BTQXRNU3hjYmlBZ0lDQWdJR3hsYm1kMGFDQTlJSEJ5YjNCekxteGxibWQwYUR0Y2JseHVJQ0IzYUdsc1pTQW9LeXRwYm1SbGVDQThJR3hsYm1kMGFDa2dlMXh1SUNBZ0lIWmhjaUJyWlhrZ1BTQndjbTl3YzF0cGJtUmxlRjA3WEc1Y2JpQWdJQ0IyWVhJZ2JtVjNWbUZzZFdVZ1BTQmpkWE4wYjIxcGVtVnlYRzRnSUNBZ0lDQS9JR04xYzNSdmJXbDZaWElvYjJKcVpXTjBXMnRsZVYwc0lITnZkWEpqWlZ0clpYbGRMQ0JyWlhrc0lHOWlhbVZqZEN3Z2MyOTFjbU5sS1Z4dUlDQWdJQ0FnT2lCMWJtUmxabWx1WldRN1hHNWNiaUFnSUNCaGMzTnBaMjVXWVd4MVpTaHZZbXBsWTNRc0lHdGxlU3dnYm1WM1ZtRnNkV1VnUFQwOUlIVnVaR1ZtYVc1bFpDQS9JSE52ZFhKalpWdHJaWGxkSURvZ2JtVjNWbUZzZFdVcE8xeHVJQ0I5WEc0Z0lISmxkSFZ5YmlCdlltcGxZM1E3WEc1OVhHNWNiaThxS2x4dUlDb2dRMjl3YVdWeklHOTNiaUJ6ZVcxaWIyd2djSEp2Y0dWeWRHbGxjeUJ2WmlCZ2MyOTFjbU5sWUNCMGJ5QmdiMkpxWldOMFlDNWNiaUFxWEc0Z0tpQkFjSEpwZG1GMFpWeHVJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJSE52ZFhKalpTQlVhR1VnYjJKcVpXTjBJSFJ2SUdOdmNIa2djM2x0WW05c2N5Qm1jbTl0TGx4dUlDb2dRSEJoY21GdElIdFBZbXBsWTNSOUlGdHZZbXBsWTNROWUzMWRJRlJvWlNCdlltcGxZM1FnZEc4Z1kyOXdlU0J6ZVcxaWIyeHpJSFJ2TGx4dUlDb2dRSEpsZEhWeWJuTWdlMDlpYW1WamRIMGdVbVYwZFhKdWN5QmdiMkpxWldOMFlDNWNiaUFxTDF4dVpuVnVZM1JwYjI0Z1kyOXdlVk41YldKdmJITW9jMjkxY21ObExDQnZZbXBsWTNRcElIdGNiaUFnY21WMGRYSnVJR052Y0hsUFltcGxZM1FvYzI5MWNtTmxMQ0JuWlhSVGVXMWliMnh6S0hOdmRYSmpaU2tzSUc5aWFtVmpkQ2s3WEc1OVhHNWNiaThxS2x4dUlDb2dRM0psWVhSbGN5QmhJR1oxYm1OMGFXOXVJR3hwYTJVZ1lGOHVZWE56YVdkdVlDNWNiaUFxWEc0Z0tpQkFjSEpwZG1GMFpWeHVJQ29nUUhCaGNtRnRJSHRHZFc1amRHbHZibjBnWVhOemFXZHVaWElnVkdobElHWjFibU4wYVc5dUlIUnZJR0Z6YzJsbmJpQjJZV3gxWlhNdVhHNGdLaUJBY21WMGRYSnVjeUI3Um5WdVkzUnBiMjU5SUZKbGRIVnlibk1nZEdobElHNWxkeUJoYzNOcFoyNWxjaUJtZFc1amRHbHZiaTVjYmlBcUwxeHVablZ1WTNScGIyNGdZM0psWVhSbFFYTnphV2R1WlhJb1lYTnphV2R1WlhJcElIdGNiaUFnY21WMGRYSnVJR0poYzJWU1pYTjBLR1oxYm1OMGFXOXVLRzlpYW1WamRDd2djMjkxY21ObGN5a2dlMXh1SUNBZ0lIWmhjaUJwYm1SbGVDQTlJQzB4TEZ4dUlDQWdJQ0FnSUNCc1pXNW5kR2dnUFNCemIzVnlZMlZ6TG14bGJtZDBhQ3hjYmlBZ0lDQWdJQ0FnWTNWemRHOXRhWHBsY2lBOUlHeGxibWQwYUNBK0lERWdQeUJ6YjNWeVkyVnpXMnhsYm1kMGFDQXRJREZkSURvZ2RXNWtaV1pwYm1Wa0xGeHVJQ0FnSUNBZ0lDQm5kV0Z5WkNBOUlHeGxibWQwYUNBK0lESWdQeUJ6YjNWeVkyVnpXekpkSURvZ2RXNWtaV1pwYm1Wa08xeHVYRzRnSUNBZ1kzVnpkRzl0YVhwbGNpQTlJQ2hoYzNOcFoyNWxjaTVzWlc1bmRHZ2dQaUF6SUNZbUlIUjVjR1Z2WmlCamRYTjBiMjFwZW1WeUlEMDlJQ2RtZFc1amRHbHZiaWNwWEc0Z0lDQWdJQ0EvSUNoc1pXNW5kR2d0TFN3Z1kzVnpkRzl0YVhwbGNpbGNiaUFnSUNBZ0lEb2dkVzVrWldacGJtVmtPMXh1WEc0Z0lDQWdhV1lnS0dkMVlYSmtJQ1ltSUdselNYUmxjbUYwWldWRFlXeHNLSE52ZFhKalpYTmJNRjBzSUhOdmRYSmpaWE5iTVYwc0lHZDFZWEprS1NrZ2UxeHVJQ0FnSUNBZ1kzVnpkRzl0YVhwbGNpQTlJR3hsYm1kMGFDQThJRE1nUHlCMWJtUmxabWx1WldRZ09pQmpkWE4wYjIxcGVtVnlPMXh1SUNBZ0lDQWdiR1Z1WjNSb0lEMGdNVHRjYmlBZ0lDQjlYRzRnSUNBZ2IySnFaV04wSUQwZ1QySnFaV04wS0c5aWFtVmpkQ2s3WEc0Z0lDQWdkMmhwYkdVZ0tDc3JhVzVrWlhnZ1BDQnNaVzVuZEdncElIdGNiaUFnSUNBZ0lIWmhjaUJ6YjNWeVkyVWdQU0J6YjNWeVkyVnpXMmx1WkdWNFhUdGNiaUFnSUNBZ0lHbG1JQ2h6YjNWeVkyVXBJSHRjYmlBZ0lDQWdJQ0FnWVhOemFXZHVaWElvYjJKcVpXTjBMQ0J6YjNWeVkyVXNJR2x1WkdWNExDQmpkWE4wYjIxcGVtVnlLVHRjYmlBZ0lDQWdJSDFjYmlBZ0lDQjlYRzRnSUNBZ2NtVjBkWEp1SUc5aWFtVmpkRHRjYmlBZ2ZTazdYRzU5WEc1Y2JpOHFLbHh1SUNvZ1EzSmxZWFJsY3lCaGJpQmhjbkpoZVNCdlppQnZkMjRnWlc1MWJXVnlZV0pzWlNCd2NtOXdaWEowZVNCdVlXMWxjeUJoYm1RZ2MzbHRZbTlzY3lCdlppQmdiMkpxWldOMFlDNWNiaUFxWEc0Z0tpQkFjSEpwZG1GMFpWeHVJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJRzlpYW1WamRDQlVhR1VnYjJKcVpXTjBJSFJ2SUhGMVpYSjVMbHh1SUNvZ1FISmxkSFZ5Ym5NZ2UwRnljbUY1ZlNCU1pYUjFjbTV6SUhSb1pTQmhjbkpoZVNCdlppQndjbTl3WlhKMGVTQnVZVzFsY3lCaGJtUWdjM2x0WW05c2N5NWNiaUFxTDF4dVpuVnVZM1JwYjI0Z1oyVjBRV3hzUzJWNWN5aHZZbXBsWTNRcElIdGNiaUFnY21WMGRYSnVJR0poYzJWSFpYUkJiR3hMWlhsektHOWlhbVZqZEN3Z2EyVjVjeXdnWjJWMFUzbHRZbTlzY3lrN1hHNTlYRzVjYmk4cUtseHVJQ29nUjJWMGN5QjBhR1VnWkdGMFlTQm1iM0lnWUcxaGNHQXVYRzRnS2x4dUlDb2dRSEJ5YVhaaGRHVmNiaUFxSUVCd1lYSmhiU0I3VDJKcVpXTjBmU0J0WVhBZ1ZHaGxJRzFoY0NCMGJ5QnhkV1Z5ZVM1Y2JpQXFJRUJ3WVhKaGJTQjdjM1J5YVc1bmZTQnJaWGtnVkdobElISmxabVZ5Wlc1alpTQnJaWGt1WEc0Z0tpQkFjbVYwZFhKdWN5QjdLbjBnVW1WMGRYSnVjeUIwYUdVZ2JXRndJR1JoZEdFdVhHNGdLaTljYm1aMWJtTjBhVzl1SUdkbGRFMWhjRVJoZEdFb2JXRndMQ0JyWlhrcElIdGNiaUFnZG1GeUlHUmhkR0VnUFNCdFlYQXVYMTlrWVhSaFgxODdYRzRnSUhKbGRIVnliaUJwYzB0bGVXRmliR1VvYTJWNUtWeHVJQ0FnSUQ4Z1pHRjBZVnQwZVhCbGIyWWdhMlY1SUQwOUlDZHpkSEpwYm1jbklEOGdKM04wY21sdVp5Y2dPaUFuYUdGemFDZGRYRzRnSUNBZ09pQmtZWFJoTG0xaGNEdGNibjFjYmx4dUx5b3FYRzRnS2lCSFpYUnpJSFJvWlNCdVlYUnBkbVVnWm5WdVkzUnBiMjRnWVhRZ1lHdGxlV0FnYjJZZ1lHOWlhbVZqZEdBdVhHNGdLbHh1SUNvZ1FIQnlhWFpoZEdWY2JpQXFJRUJ3WVhKaGJTQjdUMkpxWldOMGZTQnZZbXBsWTNRZ1ZHaGxJRzlpYW1WamRDQjBieUJ4ZFdWeWVTNWNiaUFxSUVCd1lYSmhiU0I3YzNSeWFXNW5mU0JyWlhrZ1ZHaGxJR3RsZVNCdlppQjBhR1VnYldWMGFHOWtJSFJ2SUdkbGRDNWNiaUFxSUVCeVpYUjFjbTV6SUhzcWZTQlNaWFIxY201eklIUm9aU0JtZFc1amRHbHZiaUJwWmlCcGRDZHpJRzVoZEdsMlpTd2daV3h6WlNCZ2RXNWtaV1pwYm1Wa1lDNWNiaUFxTDF4dVpuVnVZM1JwYjI0Z1oyVjBUbUYwYVhabEtHOWlhbVZqZEN3Z2EyVjVLU0I3WEc0Z0lIWmhjaUIyWVd4MVpTQTlJR2RsZEZaaGJIVmxLRzlpYW1WamRDd2dhMlY1S1R0Y2JpQWdjbVYwZFhKdUlHSmhjMlZKYzA1aGRHbDJaU2gyWVd4MVpTa2dQeUIyWVd4MVpTQTZJSFZ1WkdWbWFXNWxaRHRjYm4xY2JseHVMeW9xWEc0Z0tpQkRjbVZoZEdWeklHRnVJR0Z5Y21GNUlHOW1JSFJvWlNCdmQyNGdaVzUxYldWeVlXSnNaU0J6ZVcxaWIyd2djSEp2Y0dWeWRHbGxjeUJ2WmlCZ2IySnFaV04wWUM1Y2JpQXFYRzRnS2lCQWNISnBkbUYwWlZ4dUlDb2dRSEJoY21GdElIdFBZbXBsWTNSOUlHOWlhbVZqZENCVWFHVWdiMkpxWldOMElIUnZJSEYxWlhKNUxseHVJQ29nUUhKbGRIVnlibk1nZTBGeWNtRjVmU0JTWlhSMWNtNXpJSFJvWlNCaGNuSmhlU0J2WmlCemVXMWliMnh6TGx4dUlDb3ZYRzUyWVhJZ1oyVjBVM2x0WW05c2N5QTlJRzVoZEdsMlpVZGxkRk41YldKdmJITWdQeUJ2ZG1WeVFYSm5LRzVoZEdsMlpVZGxkRk41YldKdmJITXNJRTlpYW1WamRDa2dPaUJ6ZEhWaVFYSnlZWGs3WEc1Y2JpOHFLbHh1SUNvZ1IyVjBjeUIwYUdVZ1lIUnZVM1J5YVc1blZHRm5ZQ0J2WmlCZ2RtRnNkV1ZnTGx4dUlDcGNiaUFxSUVCd2NtbDJZWFJsWEc0Z0tpQkFjR0Z5WVcwZ2V5cDlJSFpoYkhWbElGUm9aU0IyWVd4MVpTQjBieUJ4ZFdWeWVTNWNiaUFxSUVCeVpYUjFjbTV6SUh0emRISnBibWQ5SUZKbGRIVnlibk1nZEdobElHQjBiMU4wY21sdVoxUmhaMkF1WEc0Z0tpOWNiblpoY2lCblpYUlVZV2NnUFNCaVlYTmxSMlYwVkdGbk8xeHVYRzR2THlCR1lXeHNZbUZqYXlCbWIzSWdaR0YwWVNCMmFXVjNjeXdnYldGd2N5d2djMlYwY3l3Z1lXNWtJSGRsWVdzZ2JXRndjeUJwYmlCSlJTQXhNU3hjYmk4dklHWnZjaUJrWVhSaElIWnBaWGR6SUdsdUlFVmtaMlVnUENBeE5Dd2dZVzVrSUhCeWIyMXBjMlZ6SUdsdUlFNXZaR1V1YW5NdVhHNXBaaUFvS0VSaGRHRldhV1YzSUNZbUlHZGxkRlJoWnlodVpYY2dSR0YwWVZacFpYY29ibVYzSUVGeWNtRjVRblZtWm1WeUtERXBLU2tnSVQwZ1pHRjBZVlpwWlhkVVlXY3BJSHg4WEc0Z0lDQWdLRTFoY0NBbUppQm5aWFJVWVdjb2JtVjNJRTFoY0NrZ0lUMGdiV0Z3VkdGbktTQjhmRnh1SUNBZ0lDaFFjbTl0YVhObElDWW1JR2RsZEZSaFp5aFFjbTl0YVhObExuSmxjMjlzZG1Vb0tTa2dJVDBnY0hKdmJXbHpaVlJoWnlrZ2ZIeGNiaUFnSUNBb1UyVjBJQ1ltSUdkbGRGUmhaeWh1WlhjZ1UyVjBLU0FoUFNCelpYUlVZV2NwSUh4OFhHNGdJQ0FnS0ZkbFlXdE5ZWEFnSmlZZ1oyVjBWR0ZuS0c1bGR5QlhaV0ZyVFdGd0tTQWhQU0IzWldGclRXRndWR0ZuS1NrZ2UxeHVJQ0JuWlhSVVlXY2dQU0JtZFc1amRHbHZiaWgyWVd4MVpTa2dlMXh1SUNBZ0lIWmhjaUJ5WlhOMWJIUWdQU0J2WW1wbFkzUlViMU4wY21sdVp5NWpZV3hzS0haaGJIVmxLU3hjYmlBZ0lDQWdJQ0FnUTNSdmNpQTlJSEpsYzNWc2RDQTlQU0J2WW1wbFkzUlVZV2NnUHlCMllXeDFaUzVqYjI1emRISjFZM1J2Y2lBNklIVnVaR1ZtYVc1bFpDeGNiaUFnSUNBZ0lDQWdZM1J2Y2xOMGNtbHVaeUE5SUVOMGIzSWdQeUIwYjFOdmRYSmpaU2hEZEc5eUtTQTZJSFZ1WkdWbWFXNWxaRHRjYmx4dUlDQWdJR2xtSUNoamRHOXlVM1J5YVc1bktTQjdYRzRnSUNBZ0lDQnpkMmwwWTJnZ0tHTjBiM0pUZEhKcGJtY3BJSHRjYmlBZ0lDQWdJQ0FnWTJGelpTQmtZWFJoVm1sbGQwTjBiM0pUZEhKcGJtYzZJSEpsZEhWeWJpQmtZWFJoVm1sbGQxUmhaenRjYmlBZ0lDQWdJQ0FnWTJGelpTQnRZWEJEZEc5eVUzUnlhVzVuT2lCeVpYUjFjbTRnYldGd1ZHRm5PMXh1SUNBZ0lDQWdJQ0JqWVhObElIQnliMjFwYzJWRGRHOXlVM1J5YVc1bk9pQnlaWFIxY200Z2NISnZiV2x6WlZSaFp6dGNiaUFnSUNBZ0lDQWdZMkZ6WlNCelpYUkRkRzl5VTNSeWFXNW5PaUJ5WlhSMWNtNGdjMlYwVkdGbk8xeHVJQ0FnSUNBZ0lDQmpZWE5sSUhkbFlXdE5ZWEJEZEc5eVUzUnlhVzVuT2lCeVpYUjFjbTRnZDJWaGEwMWhjRlJoWnp0Y2JpQWdJQ0FnSUgxY2JpQWdJQ0I5WEc0Z0lDQWdjbVYwZFhKdUlISmxjM1ZzZER0Y2JpQWdmVHRjYm4xY2JseHVMeW9xWEc0Z0tpQkpibWwwYVdGc2FYcGxjeUJoYmlCaGNuSmhlU0JqYkc5dVpTNWNiaUFxWEc0Z0tpQkFjSEpwZG1GMFpWeHVJQ29nUUhCaGNtRnRJSHRCY25KaGVYMGdZWEp5WVhrZ1ZHaGxJR0Z5Y21GNUlIUnZJR05zYjI1bExseHVJQ29nUUhKbGRIVnlibk1nZTBGeWNtRjVmU0JTWlhSMWNtNXpJSFJvWlNCcGJtbDBhV0ZzYVhwbFpDQmpiRzl1WlM1Y2JpQXFMMXh1Wm5WdVkzUnBiMjRnYVc1cGRFTnNiMjVsUVhKeVlYa29ZWEp5WVhrcElIdGNiaUFnZG1GeUlHeGxibWQwYUNBOUlHRnljbUY1TG14bGJtZDBhQ3hjYmlBZ0lDQWdJSEpsYzNWc2RDQTlJR0Z5Y21GNUxtTnZibk4wY25WamRHOXlLR3hsYm1kMGFDazdYRzVjYmlBZ0x5OGdRV1JrSUhCeWIzQmxjblJwWlhNZ1lYTnphV2R1WldRZ1lua2dZRkpsWjBWNGNDTmxlR1ZqWUM1Y2JpQWdhV1lnS0d4bGJtZDBhQ0FtSmlCMGVYQmxiMllnWVhKeVlYbGJNRjBnUFQwZ0ozTjBjbWx1WnljZ0ppWWdhR0Z6VDNkdVVISnZjR1Z5ZEhrdVkyRnNiQ2hoY25KaGVTd2dKMmx1WkdWNEp5a3BJSHRjYmlBZ0lDQnlaWE4xYkhRdWFXNWtaWGdnUFNCaGNuSmhlUzVwYm1SbGVEdGNiaUFnSUNCeVpYTjFiSFF1YVc1d2RYUWdQU0JoY25KaGVTNXBibkIxZER0Y2JpQWdmVnh1SUNCeVpYUjFjbTRnY21WemRXeDBPMXh1ZlZ4dVhHNHZLaXBjYmlBcUlFbHVhWFJwWVd4cGVtVnpJR0Z1SUc5aWFtVmpkQ0JqYkc5dVpTNWNiaUFxWEc0Z0tpQkFjSEpwZG1GMFpWeHVJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJRzlpYW1WamRDQlVhR1VnYjJKcVpXTjBJSFJ2SUdOc2IyNWxMbHh1SUNvZ1FISmxkSFZ5Ym5NZ2UwOWlhbVZqZEgwZ1VtVjBkWEp1Y3lCMGFHVWdhVzVwZEdsaGJHbDZaV1FnWTJ4dmJtVXVYRzRnS2k5Y2JtWjFibU4wYVc5dUlHbHVhWFJEYkc5dVpVOWlhbVZqZENodlltcGxZM1FwSUh0Y2JpQWdjbVYwZFhKdUlDaDBlWEJsYjJZZ2IySnFaV04wTG1OdmJuTjBjblZqZEc5eUlEMDlJQ2RtZFc1amRHbHZiaWNnSmlZZ0lXbHpVSEp2ZEc5MGVYQmxLRzlpYW1WamRDa3BYRzRnSUNBZ1B5QmlZWE5sUTNKbFlYUmxLR2RsZEZCeWIzUnZkSGx3WlNodlltcGxZM1FwS1Z4dUlDQWdJRG9nZTMwN1hHNTlYRzVjYmk4cUtseHVJQ29nU1c1cGRHbGhiR2w2WlhNZ1lXNGdiMkpxWldOMElHTnNiMjVsSUdKaGMyVmtJRzl1SUdsMGN5QmdkRzlUZEhKcGJtZFVZV2RnTGx4dUlDcGNiaUFxSUNvcVRtOTBaVG9xS2lCVWFHbHpJR1oxYm1OMGFXOXVJRzl1YkhrZ2MzVndjRzl5ZEhNZ1kyeHZibWx1WnlCMllXeDFaWE1nZDJsMGFDQjBZV2R6SUc5bVhHNGdLaUJnUW05dmJHVmhibUFzSUdCRVlYUmxZQ3dnWUVWeWNtOXlZQ3dnWUU1MWJXSmxjbUFzSUdCU1pXZEZlSEJnTENCdmNpQmdVM1J5YVc1bllDNWNiaUFxWEc0Z0tpQkFjSEpwZG1GMFpWeHVJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJRzlpYW1WamRDQlVhR1VnYjJKcVpXTjBJSFJ2SUdOc2IyNWxMbHh1SUNvZ1FIQmhjbUZ0SUh0emRISnBibWQ5SUhSaFp5QlVhR1VnWUhSdlUzUnlhVzVuVkdGbllDQnZaaUIwYUdVZ2IySnFaV04wSUhSdklHTnNiMjVsTGx4dUlDb2dRSEJoY21GdElIdEdkVzVqZEdsdmJuMGdZMnh2Ym1WR2RXNWpJRlJvWlNCbWRXNWpkR2x2YmlCMGJ5QmpiRzl1WlNCMllXeDFaWE11WEc0Z0tpQkFjR0Z5WVcwZ2UySnZiMnhsWVc1OUlGdHBjMFJsWlhCZElGTndaV05wWm5rZ1lTQmtaV1Z3SUdOc2IyNWxMbHh1SUNvZ1FISmxkSFZ5Ym5NZ2UwOWlhbVZqZEgwZ1VtVjBkWEp1Y3lCMGFHVWdhVzVwZEdsaGJHbDZaV1FnWTJ4dmJtVXVYRzRnS2k5Y2JtWjFibU4wYVc5dUlHbHVhWFJEYkc5dVpVSjVWR0ZuS0c5aWFtVmpkQ3dnZEdGbkxDQmpiRzl1WlVaMWJtTXNJR2x6UkdWbGNDa2dlMXh1SUNCMllYSWdRM1J2Y2lBOUlHOWlhbVZqZEM1amIyNXpkSEoxWTNSdmNqdGNiaUFnYzNkcGRHTm9JQ2gwWVdjcElIdGNiaUFnSUNCallYTmxJR0Z5Y21GNVFuVm1abVZ5VkdGbk9seHVJQ0FnSUNBZ2NtVjBkWEp1SUdOc2IyNWxRWEp5WVhsQ2RXWm1aWElvYjJKcVpXTjBLVHRjYmx4dUlDQWdJR05oYzJVZ1ltOXZiRlJoWnpwY2JpQWdJQ0JqWVhObElHUmhkR1ZVWVdjNlhHNGdJQ0FnSUNCeVpYUjFjbTRnYm1WM0lFTjBiM0lvSzI5aWFtVmpkQ2s3WEc1Y2JpQWdJQ0JqWVhObElHUmhkR0ZXYVdWM1ZHRm5PbHh1SUNBZ0lDQWdjbVYwZFhKdUlHTnNiMjVsUkdGMFlWWnBaWGNvYjJKcVpXTjBMQ0JwYzBSbFpYQXBPMXh1WEc0Z0lDQWdZMkZ6WlNCbWJHOWhkRE15VkdGbk9pQmpZWE5sSUdac2IyRjBOalJVWVdjNlhHNGdJQ0FnWTJGelpTQnBiblE0VkdGbk9pQmpZWE5sSUdsdWRERTJWR0ZuT2lCallYTmxJR2x1ZERNeVZHRm5PbHh1SUNBZ0lHTmhjMlVnZFdsdWREaFVZV2M2SUdOaGMyVWdkV2x1ZERoRGJHRnRjR1ZrVkdGbk9pQmpZWE5sSUhWcGJuUXhObFJoWnpvZ1kyRnpaU0IxYVc1ME16SlVZV2M2WEc0Z0lDQWdJQ0J5WlhSMWNtNGdZMnh2Ym1WVWVYQmxaRUZ5Y21GNUtHOWlhbVZqZEN3Z2FYTkVaV1Z3S1R0Y2JseHVJQ0FnSUdOaGMyVWdiV0Z3VkdGbk9seHVJQ0FnSUNBZ2NtVjBkWEp1SUdOc2IyNWxUV0Z3S0c5aWFtVmpkQ3dnYVhORVpXVndMQ0JqYkc5dVpVWjFibU1wTzF4dVhHNGdJQ0FnWTJGelpTQnVkVzFpWlhKVVlXYzZYRzRnSUNBZ1kyRnpaU0J6ZEhKcGJtZFVZV2M2WEc0Z0lDQWdJQ0J5WlhSMWNtNGdibVYzSUVOMGIzSW9iMkpxWldOMEtUdGNibHh1SUNBZ0lHTmhjMlVnY21WblpYaHdWR0ZuT2x4dUlDQWdJQ0FnY21WMGRYSnVJR05zYjI1bFVtVm5SWGh3S0c5aWFtVmpkQ2s3WEc1Y2JpQWdJQ0JqWVhObElITmxkRlJoWnpwY2JpQWdJQ0FnSUhKbGRIVnliaUJqYkc5dVpWTmxkQ2h2WW1wbFkzUXNJR2x6UkdWbGNDd2dZMnh2Ym1WR2RXNWpLVHRjYmx4dUlDQWdJR05oYzJVZ2MzbHRZbTlzVkdGbk9seHVJQ0FnSUNBZ2NtVjBkWEp1SUdOc2IyNWxVM2x0WW05c0tHOWlhbVZqZENrN1hHNGdJSDFjYm4xY2JseHVMeW9xWEc0Z0tpQkRhR1ZqYTNNZ2FXWWdZSFpoYkhWbFlDQnBjeUJoSUhaaGJHbGtJR0Z5Y21GNUxXeHBhMlVnYVc1a1pYZ3VYRzRnS2x4dUlDb2dRSEJ5YVhaaGRHVmNiaUFxSUVCd1lYSmhiU0I3S24wZ2RtRnNkV1VnVkdobElIWmhiSFZsSUhSdklHTm9aV05yTGx4dUlDb2dRSEJoY21GdElIdHVkVzFpWlhKOUlGdHNaVzVuZEdnOVRVRllYMU5CUmtWZlNVNVVSVWRGVWwwZ1ZHaGxJSFZ3Y0dWeUlHSnZkVzVrY3lCdlppQmhJSFpoYkdsa0lHbHVaR1Y0TGx4dUlDb2dRSEpsZEhWeWJuTWdlMkp2YjJ4bFlXNTlJRkpsZEhWeWJuTWdZSFJ5ZFdWZ0lHbG1JR0IyWVd4MVpXQWdhWE1nWVNCMllXeHBaQ0JwYm1SbGVDd2daV3h6WlNCZ1ptRnNjMlZnTGx4dUlDb3ZYRzVtZFc1amRHbHZiaUJwYzBsdVpHVjRLSFpoYkhWbExDQnNaVzVuZEdncElIdGNiaUFnYkdWdVozUm9JRDBnYkdWdVozUm9JRDA5SUc1MWJHd2dQeUJOUVZoZlUwRkdSVjlKVGxSRlIwVlNJRG9nYkdWdVozUm9PMXh1SUNCeVpYUjFjbTRnSVNGc1pXNW5kR2dnSmlaY2JpQWdJQ0FvZEhsd1pXOW1JSFpoYkhWbElEMDlJQ2R1ZFcxaVpYSW5JSHg4SUhKbFNYTlZhVzUwTG5SbGMzUW9kbUZzZFdVcEtTQW1KbHh1SUNBZ0lDaDJZV3gxWlNBK0lDMHhJQ1ltSUhaaGJIVmxJQ1VnTVNBOVBTQXdJQ1ltSUhaaGJIVmxJRHdnYkdWdVozUm9LVHRjYm4xY2JseHVMeW9xWEc0Z0tpQkRhR1ZqYTNNZ2FXWWdkR2hsSUdkcGRtVnVJR0Z5WjNWdFpXNTBjeUJoY21VZ1puSnZiU0JoYmlCcGRHVnlZWFJsWlNCallXeHNMbHh1SUNwY2JpQXFJRUJ3Y21sMllYUmxYRzRnS2lCQWNHRnlZVzBnZXlwOUlIWmhiSFZsSUZSb1pTQndiM1JsYm5ScFlXd2dhWFJsY21GMFpXVWdkbUZzZFdVZ1lYSm5kVzFsYm5RdVhHNGdLaUJBY0dGeVlXMGdleXA5SUdsdVpHVjRJRlJvWlNCd2IzUmxiblJwWVd3Z2FYUmxjbUYwWldVZ2FXNWtaWGdnYjNJZ2EyVjVJR0Z5WjNWdFpXNTBMbHh1SUNvZ1FIQmhjbUZ0SUhzcWZTQnZZbXBsWTNRZ1ZHaGxJSEJ2ZEdWdWRHbGhiQ0JwZEdWeVlYUmxaU0J2WW1wbFkzUWdZWEpuZFcxbGJuUXVYRzRnS2lCQWNtVjBkWEp1Y3lCN1ltOXZiR1ZoYm4wZ1VtVjBkWEp1Y3lCZ2RISjFaV0FnYVdZZ2RHaGxJR0Z5WjNWdFpXNTBjeUJoY21VZ1puSnZiU0JoYmlCcGRHVnlZWFJsWlNCallXeHNMRnh1SUNvZ0lHVnNjMlVnWUdaaGJITmxZQzVjYmlBcUwxeHVablZ1WTNScGIyNGdhWE5KZEdWeVlYUmxaVU5oYkd3b2RtRnNkV1VzSUdsdVpHVjRMQ0J2WW1wbFkzUXBJSHRjYmlBZ2FXWWdLQ0ZwYzA5aWFtVmpkQ2h2WW1wbFkzUXBLU0I3WEc0Z0lDQWdjbVYwZFhKdUlHWmhiSE5sTzF4dUlDQjlYRzRnSUhaaGNpQjBlWEJsSUQwZ2RIbHdaVzltSUdsdVpHVjRPMXh1SUNCcFppQW9kSGx3WlNBOVBTQW5iblZ0WW1WeUoxeHVJQ0FnSUNBZ0lDQS9JQ2hwYzBGeWNtRjVUR2xyWlNodlltcGxZM1FwSUNZbUlHbHpTVzVrWlhnb2FXNWtaWGdzSUc5aWFtVmpkQzVzWlc1bmRHZ3BLVnh1SUNBZ0lDQWdJQ0E2SUNoMGVYQmxJRDA5SUNkemRISnBibWNuSUNZbUlHbHVaR1Y0SUdsdUlHOWlhbVZqZENsY2JpQWdJQ0FnSUNrZ2UxeHVJQ0FnSUhKbGRIVnliaUJsY1NodlltcGxZM1JiYVc1a1pYaGRMQ0IyWVd4MVpTazdYRzRnSUgxY2JpQWdjbVYwZFhKdUlHWmhiSE5sTzF4dWZWeHVYRzR2S2lwY2JpQXFJRU5vWldOcmN5QnBaaUJnZG1Gc2RXVmdJR2x6SUhOMWFYUmhZbXhsSUdadmNpQjFjMlVnWVhNZ2RXNXBjWFZsSUc5aWFtVmpkQ0JyWlhrdVhHNGdLbHh1SUNvZ1FIQnlhWFpoZEdWY2JpQXFJRUJ3WVhKaGJTQjdLbjBnZG1Gc2RXVWdWR2hsSUhaaGJIVmxJSFJ2SUdOb1pXTnJMbHh1SUNvZ1FISmxkSFZ5Ym5NZ2UySnZiMnhsWVc1OUlGSmxkSFZ5Ym5NZ1lIUnlkV1ZnSUdsbUlHQjJZV3gxWldBZ2FYTWdjM1ZwZEdGaWJHVXNJR1ZzYzJVZ1lHWmhiSE5sWUM1Y2JpQXFMMXh1Wm5WdVkzUnBiMjRnYVhOTFpYbGhZbXhsS0haaGJIVmxLU0I3WEc0Z0lIWmhjaUIwZVhCbElEMGdkSGx3Wlc5bUlIWmhiSFZsTzF4dUlDQnlaWFIxY200Z0tIUjVjR1VnUFQwZ0ozTjBjbWx1WnljZ2ZId2dkSGx3WlNBOVBTQW5iblZ0WW1WeUp5QjhmQ0IwZVhCbElEMDlJQ2R6ZVcxaWIyd25JSHg4SUhSNWNHVWdQVDBnSjJKdmIyeGxZVzRuS1Z4dUlDQWdJRDhnS0haaGJIVmxJQ0U5UFNBblgxOXdjbTkwYjE5Zkp5bGNiaUFnSUNBNklDaDJZV3gxWlNBOVBUMGdiblZzYkNrN1hHNTlYRzVjYmk4cUtseHVJQ29nUTJobFkydHpJR2xtSUdCbWRXNWpZQ0JvWVhNZ2FYUnpJSE52ZFhKalpTQnRZWE5yWldRdVhHNGdLbHh1SUNvZ1FIQnlhWFpoZEdWY2JpQXFJRUJ3WVhKaGJTQjdSblZ1WTNScGIyNTlJR1oxYm1NZ1ZHaGxJR1oxYm1OMGFXOXVJSFJ2SUdOb1pXTnJMbHh1SUNvZ1FISmxkSFZ5Ym5NZ2UySnZiMnhsWVc1OUlGSmxkSFZ5Ym5NZ1lIUnlkV1ZnSUdsbUlHQm1kVzVqWUNCcGN5QnRZWE5yWldRc0lHVnNjMlVnWUdaaGJITmxZQzVjYmlBcUwxeHVablZ1WTNScGIyNGdhWE5OWVhOclpXUW9ablZ1WXlrZ2UxeHVJQ0J5WlhSMWNtNGdJU0Z0WVhOclUzSmpTMlY1SUNZbUlDaHRZWE5yVTNKalMyVjVJR2x1SUdaMWJtTXBPMXh1ZlZ4dVhHNHZLaXBjYmlBcUlFTm9aV05yY3lCcFppQmdkbUZzZFdWZ0lHbHpJR3hwYTJWc2VTQmhJSEJ5YjNSdmRIbHdaU0J2WW1wbFkzUXVYRzRnS2x4dUlDb2dRSEJ5YVhaaGRHVmNiaUFxSUVCd1lYSmhiU0I3S24wZ2RtRnNkV1VnVkdobElIWmhiSFZsSUhSdklHTm9aV05yTGx4dUlDb2dRSEpsZEhWeWJuTWdlMkp2YjJ4bFlXNTlJRkpsZEhWeWJuTWdZSFJ5ZFdWZ0lHbG1JR0IyWVd4MVpXQWdhWE1nWVNCd2NtOTBiM1I1Y0dVc0lHVnNjMlVnWUdaaGJITmxZQzVjYmlBcUwxeHVablZ1WTNScGIyNGdhWE5RY205MGIzUjVjR1VvZG1Gc2RXVXBJSHRjYmlBZ2RtRnlJRU4wYjNJZ1BTQjJZV3gxWlNBbUppQjJZV3gxWlM1amIyNXpkSEoxWTNSdmNpeGNiaUFnSUNBZ0lIQnliM1J2SUQwZ0tIUjVjR1Z2WmlCRGRHOXlJRDA5SUNkbWRXNWpkR2x2YmljZ0ppWWdRM1J2Y2k1d2NtOTBiM1I1Y0dVcElIeDhJRzlpYW1WamRGQnliM1J2TzF4dVhHNGdJSEpsZEhWeWJpQjJZV3gxWlNBOVBUMGdjSEp2ZEc4N1hHNTlYRzVjYmk4cUtseHVJQ29nVkdocGN5Qm1kVzVqZEdsdmJpQnBjeUJzYVd0bFhHNGdLaUJiWUU5aWFtVmpkQzVyWlhsellGMG9hSFIwY0RvdkwyVmpiV0V0YVc1MFpYSnVZWFJwYjI1aGJDNXZjbWN2WldOdFlTMHlOakl2Tnk0d0x5TnpaV010YjJKcVpXTjBMbXRsZVhNcFhHNGdLaUJsZUdObGNIUWdkR2hoZENCcGRDQnBibU5zZFdSbGN5QnBibWhsY21sMFpXUWdaVzUxYldWeVlXSnNaU0J3Y205d1pYSjBhV1Z6TGx4dUlDcGNiaUFxSUVCd2NtbDJZWFJsWEc0Z0tpQkFjR0Z5WVcwZ2UwOWlhbVZqZEgwZ2IySnFaV04wSUZSb1pTQnZZbXBsWTNRZ2RHOGdjWFZsY25rdVhHNGdLaUJBY21WMGRYSnVjeUI3UVhKeVlYbDlJRkpsZEhWeWJuTWdkR2hsSUdGeWNtRjVJRzltSUhCeWIzQmxjblI1SUc1aGJXVnpMbHh1SUNvdlhHNW1kVzVqZEdsdmJpQnVZWFJwZG1WTFpYbHpTVzRvYjJKcVpXTjBLU0I3WEc0Z0lIWmhjaUJ5WlhOMWJIUWdQU0JiWFR0Y2JpQWdhV1lnS0c5aWFtVmpkQ0FoUFNCdWRXeHNLU0I3WEc0Z0lDQWdabTl5SUNoMllYSWdhMlY1SUdsdUlFOWlhbVZqZENodlltcGxZM1FwS1NCN1hHNGdJQ0FnSUNCeVpYTjFiSFF1Y0hWemFDaHJaWGtwTzF4dUlDQWdJSDFjYmlBZ2ZWeHVJQ0J5WlhSMWNtNGdjbVZ6ZFd4ME8xeHVmVnh1WEc0dktpcGNiaUFxSUVOdmJuWmxjblJ6SUdCbWRXNWpZQ0IwYnlCcGRITWdjMjkxY21ObElHTnZaR1V1WEc0Z0tseHVJQ29nUUhCeWFYWmhkR1ZjYmlBcUlFQndZWEpoYlNCN1JuVnVZM1JwYjI1OUlHWjFibU1nVkdobElHWjFibU4wYVc5dUlIUnZJSEJ5YjJObGMzTXVYRzRnS2lCQWNtVjBkWEp1Y3lCN2MzUnlhVzVuZlNCU1pYUjFjbTV6SUhSb1pTQnpiM1Z5WTJVZ1kyOWtaUzVjYmlBcUwxeHVablZ1WTNScGIyNGdkRzlUYjNWeVkyVW9ablZ1WXlrZ2UxeHVJQ0JwWmlBb1puVnVZeUFoUFNCdWRXeHNLU0I3WEc0Z0lDQWdkSEo1SUh0Y2JpQWdJQ0FnSUhKbGRIVnliaUJtZFc1alZHOVRkSEpwYm1jdVkyRnNiQ2htZFc1aktUdGNiaUFnSUNCOUlHTmhkR05vSUNobEtTQjdmVnh1SUNBZ0lIUnllU0I3WEc0Z0lDQWdJQ0J5WlhSMWNtNGdLR1oxYm1NZ0t5QW5KeWs3WEc0Z0lDQWdmU0JqWVhSamFDQW9aU2tnZTMxY2JpQWdmVnh1SUNCeVpYUjFjbTRnSnljN1hHNTlYRzVjYmk4cUtseHVJQ29nVUdWeVptOXliWE1nWVZ4dUlDb2dXMkJUWVcxbFZtRnNkV1ZhWlhKdllGMG9hSFIwY0RvdkwyVmpiV0V0YVc1MFpYSnVZWFJwYjI1aGJDNXZjbWN2WldOdFlTMHlOakl2Tnk0d0x5TnpaV010YzJGdFpYWmhiSFZsZW1WeWJ5bGNiaUFxSUdOdmJYQmhjbWx6YjI0Z1ltVjBkMlZsYmlCMGQyOGdkbUZzZFdWeklIUnZJR1JsZEdWeWJXbHVaU0JwWmlCMGFHVjVJR0Z5WlNCbGNYVnBkbUZzWlc1MExseHVJQ3BjYmlBcUlFQnpkR0YwYVdOY2JpQXFJRUJ0WlcxaVpYSlBaaUJmWEc0Z0tpQkFjMmx1WTJVZ05DNHdMakJjYmlBcUlFQmpZWFJsWjI5eWVTQk1ZVzVuWEc0Z0tpQkFjR0Z5WVcwZ2V5cDlJSFpoYkhWbElGUm9aU0IyWVd4MVpTQjBieUJqYjIxd1lYSmxMbHh1SUNvZ1FIQmhjbUZ0SUhzcWZTQnZkR2hsY2lCVWFHVWdiM1JvWlhJZ2RtRnNkV1VnZEc4Z1kyOXRjR0Z5WlM1Y2JpQXFJRUJ5WlhSMWNtNXpJSHRpYjI5c1pXRnVmU0JTWlhSMWNtNXpJR0IwY25WbFlDQnBaaUIwYUdVZ2RtRnNkV1Z6SUdGeVpTQmxjWFZwZG1Gc1pXNTBMQ0JsYkhObElHQm1ZV3h6WldBdVhHNGdLaUJBWlhoaGJYQnNaVnh1SUNwY2JpQXFJSFpoY2lCdlltcGxZM1FnUFNCN0lDZGhKem9nTVNCOU8xeHVJQ29nZG1GeUlHOTBhR1Z5SUQwZ2V5QW5ZU2M2SURFZ2ZUdGNiaUFxWEc0Z0tpQmZMbVZ4S0c5aWFtVmpkQ3dnYjJKcVpXTjBLVHRjYmlBcUlDOHZJRDArSUhSeWRXVmNiaUFxWEc0Z0tpQmZMbVZ4S0c5aWFtVmpkQ3dnYjNSb1pYSXBPMXh1SUNvZ0x5OGdQVDRnWm1Gc2MyVmNiaUFxWEc0Z0tpQmZMbVZ4S0NkaEp5d2dKMkVuS1R0Y2JpQXFJQzh2SUQwK0lIUnlkV1ZjYmlBcVhHNGdLaUJmTG1WeEtDZGhKeXdnVDJKcVpXTjBLQ2RoSnlrcE8xeHVJQ29nTHk4Z1BUNGdabUZzYzJWY2JpQXFYRzRnS2lCZkxtVnhLRTVoVGl3Z1RtRk9LVHRjYmlBcUlDOHZJRDArSUhSeWRXVmNiaUFxTDF4dVpuVnVZM1JwYjI0Z1pYRW9kbUZzZFdVc0lHOTBhR1Z5S1NCN1hHNGdJSEpsZEhWeWJpQjJZV3gxWlNBOVBUMGdiM1JvWlhJZ2ZId2dLSFpoYkhWbElDRTlQU0IyWVd4MVpTQW1KaUJ2ZEdobGNpQWhQVDBnYjNSb1pYSXBPMXh1ZlZ4dVhHNHZLaXBjYmlBcUlFTm9aV05yY3lCcFppQmdkbUZzZFdWZ0lHbHpJR3hwYTJWc2VTQmhiaUJnWVhKbmRXMWxiblJ6WUNCdlltcGxZM1F1WEc0Z0tseHVJQ29nUUhOMFlYUnBZMXh1SUNvZ1FHMWxiV0psY2s5bUlGOWNiaUFxSUVCemFXNWpaU0F3TGpFdU1GeHVJQ29nUUdOaGRHVm5iM0o1SUV4aGJtZGNiaUFxSUVCd1lYSmhiU0I3S24wZ2RtRnNkV1VnVkdobElIWmhiSFZsSUhSdklHTm9aV05yTGx4dUlDb2dRSEpsZEhWeWJuTWdlMkp2YjJ4bFlXNTlJRkpsZEhWeWJuTWdZSFJ5ZFdWZ0lHbG1JR0IyWVd4MVpXQWdhWE1nWVc0Z1lHRnlaM1Z0Wlc1MGMyQWdiMkpxWldOMExGeHVJQ29nSUdWc2MyVWdZR1poYkhObFlDNWNiaUFxSUVCbGVHRnRjR3hsWEc0Z0tseHVJQ29nWHk1cGMwRnlaM1Z0Wlc1MGN5aG1kVzVqZEdsdmJpZ3BJSHNnY21WMGRYSnVJR0Z5WjNWdFpXNTBjenNnZlNncEtUdGNiaUFxSUM4dklEMCtJSFJ5ZFdWY2JpQXFYRzRnS2lCZkxtbHpRWEpuZFcxbGJuUnpLRnN4TENBeUxDQXpYU2s3WEc0Z0tpQXZMeUE5UGlCbVlXeHpaVnh1SUNvdlhHNW1kVzVqZEdsdmJpQnBjMEZ5WjNWdFpXNTBjeWgyWVd4MVpTa2dlMXh1SUNBdkx5QlRZV1poY21rZ09DNHhJRzFoYTJWeklHQmhjbWQxYldWdWRITXVZMkZzYkdWbFlDQmxiblZ0WlhKaFlteGxJR2x1SUhOMGNtbGpkQ0J0YjJSbExseHVJQ0J5WlhSMWNtNGdhWE5CY25KaGVVeHBhMlZQWW1wbFkzUW9kbUZzZFdVcElDWW1JR2hoYzA5M2JsQnliM0JsY25SNUxtTmhiR3dvZG1Gc2RXVXNJQ2RqWVd4c1pXVW5LU0FtSmx4dUlDQWdJQ2doY0hKdmNHVnlkSGxKYzBWdWRXMWxjbUZpYkdVdVkyRnNiQ2gyWVd4MVpTd2dKMk5oYkd4bFpTY3BJSHg4SUc5aWFtVmpkRlJ2VTNSeWFXNW5MbU5oYkd3b2RtRnNkV1VwSUQwOUlHRnlaM05VWVdjcE8xeHVmVnh1WEc0dktpcGNiaUFxSUVOb1pXTnJjeUJwWmlCZ2RtRnNkV1ZnSUdseklHTnNZWE56YVdacFpXUWdZWE1nWVc0Z1lFRnljbUY1WUNCdlltcGxZM1F1WEc0Z0tseHVJQ29nUUhOMFlYUnBZMXh1SUNvZ1FHMWxiV0psY2s5bUlGOWNiaUFxSUVCemFXNWpaU0F3TGpFdU1GeHVJQ29nUUdOaGRHVm5iM0o1SUV4aGJtZGNiaUFxSUVCd1lYSmhiU0I3S24wZ2RtRnNkV1VnVkdobElIWmhiSFZsSUhSdklHTm9aV05yTGx4dUlDb2dRSEpsZEhWeWJuTWdlMkp2YjJ4bFlXNTlJRkpsZEhWeWJuTWdZSFJ5ZFdWZ0lHbG1JR0IyWVd4MVpXQWdhWE1nWVc0Z1lYSnlZWGtzSUdWc2MyVWdZR1poYkhObFlDNWNiaUFxSUVCbGVHRnRjR3hsWEc0Z0tseHVJQ29nWHk1cGMwRnljbUY1S0ZzeExDQXlMQ0F6WFNrN1hHNGdLaUF2THlBOVBpQjBjblZsWEc0Z0tseHVJQ29nWHk1cGMwRnljbUY1S0dSdlkzVnRaVzUwTG1KdlpIa3VZMmhwYkdSeVpXNHBPMXh1SUNvZ0x5OGdQVDRnWm1Gc2MyVmNiaUFxWEc0Z0tpQmZMbWx6UVhKeVlYa29KMkZpWXljcE8xeHVJQ29nTHk4Z1BUNGdabUZzYzJWY2JpQXFYRzRnS2lCZkxtbHpRWEp5WVhrb1h5NXViMjl3S1R0Y2JpQXFJQzh2SUQwK0lHWmhiSE5sWEc0Z0tpOWNiblpoY2lCcGMwRnljbUY1SUQwZ1FYSnlZWGt1YVhOQmNuSmhlVHRjYmx4dUx5b3FYRzRnS2lCRGFHVmphM01nYVdZZ1lIWmhiSFZsWUNCcGN5QmhjbkpoZVMxc2FXdGxMaUJCSUhaaGJIVmxJR2x6SUdOdmJuTnBaR1Z5WldRZ1lYSnlZWGt0YkdsclpTQnBaaUJwZENkelhHNGdLaUJ1YjNRZ1lTQm1kVzVqZEdsdmJpQmhibVFnYUdGeklHRWdZSFpoYkhWbExteGxibWQwYUdBZ2RHaGhkQ2R6SUdGdUlHbHVkR1ZuWlhJZ1ozSmxZWFJsY2lCMGFHRnVJRzl5WEc0Z0tpQmxjWFZoYkNCMGJ5QmdNR0FnWVc1a0lHeGxjM01nZEdoaGJpQnZjaUJsY1hWaGJDQjBieUJnVG5WdFltVnlMazFCV0Y5VFFVWkZYMGxPVkVWSFJWSmdMbHh1SUNwY2JpQXFJRUJ6ZEdGMGFXTmNiaUFxSUVCdFpXMWlaWEpQWmlCZlhHNGdLaUJBYzJsdVkyVWdOQzR3TGpCY2JpQXFJRUJqWVhSbFoyOXllU0JNWVc1blhHNGdLaUJBY0dGeVlXMGdleXA5SUhaaGJIVmxJRlJvWlNCMllXeDFaU0IwYnlCamFHVmpheTVjYmlBcUlFQnlaWFIxY201eklIdGliMjlzWldGdWZTQlNaWFIxY201eklHQjBjblZsWUNCcFppQmdkbUZzZFdWZ0lHbHpJR0Z5Y21GNUxXeHBhMlVzSUdWc2MyVWdZR1poYkhObFlDNWNiaUFxSUVCbGVHRnRjR3hsWEc0Z0tseHVJQ29nWHk1cGMwRnljbUY1VEdsclpTaGJNU3dnTWl3Z00xMHBPMXh1SUNvZ0x5OGdQVDRnZEhKMVpWeHVJQ3BjYmlBcUlGOHVhWE5CY25KaGVVeHBhMlVvWkc5amRXMWxiblF1WW05a2VTNWphR2xzWkhKbGJpazdYRzRnS2lBdkx5QTlQaUIwY25WbFhHNGdLbHh1SUNvZ1h5NXBjMEZ5Y21GNVRHbHJaU2duWVdKakp5azdYRzRnS2lBdkx5QTlQaUIwY25WbFhHNGdLbHh1SUNvZ1h5NXBjMEZ5Y21GNVRHbHJaU2hmTG01dmIzQXBPMXh1SUNvZ0x5OGdQVDRnWm1Gc2MyVmNiaUFxTDF4dVpuVnVZM1JwYjI0Z2FYTkJjbkpoZVV4cGEyVW9kbUZzZFdVcElIdGNiaUFnY21WMGRYSnVJSFpoYkhWbElDRTlJRzUxYkd3Z0ppWWdhWE5NWlc1bmRHZ29kbUZzZFdVdWJHVnVaM1JvS1NBbUppQWhhWE5HZFc1amRHbHZiaWgyWVd4MVpTazdYRzU5WEc1Y2JpOHFLbHh1SUNvZ1ZHaHBjeUJ0WlhSb2IyUWdhWE1nYkdsclpTQmdYeTVwYzBGeWNtRjVUR2xyWldBZ1pYaGpaWEIwSUhSb1lYUWdhWFFnWVd4emJ5QmphR1ZqYTNNZ2FXWWdZSFpoYkhWbFlGeHVJQ29nYVhNZ1lXNGdiMkpxWldOMExseHVJQ3BjYmlBcUlFQnpkR0YwYVdOY2JpQXFJRUJ0WlcxaVpYSlBaaUJmWEc0Z0tpQkFjMmx1WTJVZ05DNHdMakJjYmlBcUlFQmpZWFJsWjI5eWVTQk1ZVzVuWEc0Z0tpQkFjR0Z5WVcwZ2V5cDlJSFpoYkhWbElGUm9aU0IyWVd4MVpTQjBieUJqYUdWamF5NWNiaUFxSUVCeVpYUjFjbTV6SUh0aWIyOXNaV0Z1ZlNCU1pYUjFjbTV6SUdCMGNuVmxZQ0JwWmlCZ2RtRnNkV1ZnSUdseklHRnVJR0Z5Y21GNUxXeHBhMlVnYjJKcVpXTjBMRnh1SUNvZ0lHVnNjMlVnWUdaaGJITmxZQzVjYmlBcUlFQmxlR0Z0Y0d4bFhHNGdLbHh1SUNvZ1h5NXBjMEZ5Y21GNVRHbHJaVTlpYW1WamRDaGJNU3dnTWl3Z00xMHBPMXh1SUNvZ0x5OGdQVDRnZEhKMVpWeHVJQ3BjYmlBcUlGOHVhWE5CY25KaGVVeHBhMlZQWW1wbFkzUW9aRzlqZFcxbGJuUXVZbTlrZVM1amFHbHNaSEpsYmlrN1hHNGdLaUF2THlBOVBpQjBjblZsWEc0Z0tseHVJQ29nWHk1cGMwRnljbUY1VEdsclpVOWlhbVZqZENnbllXSmpKeWs3WEc0Z0tpQXZMeUE5UGlCbVlXeHpaVnh1SUNwY2JpQXFJRjh1YVhOQmNuSmhlVXhwYTJWUFltcGxZM1FvWHk1dWIyOXdLVHRjYmlBcUlDOHZJRDArSUdaaGJITmxYRzRnS2k5Y2JtWjFibU4wYVc5dUlHbHpRWEp5WVhsTWFXdGxUMkpxWldOMEtIWmhiSFZsS1NCN1hHNGdJSEpsZEhWeWJpQnBjMDlpYW1WamRFeHBhMlVvZG1Gc2RXVXBJQ1ltSUdselFYSnlZWGxNYVd0bEtIWmhiSFZsS1R0Y2JuMWNibHh1THlvcVhHNGdLaUJEYUdWamEzTWdhV1lnWUhaaGJIVmxZQ0JwY3lCaElHSjFabVpsY2k1Y2JpQXFYRzRnS2lCQWMzUmhkR2xqWEc0Z0tpQkFiV1Z0WW1WeVQyWWdYMXh1SUNvZ1FITnBibU5sSURRdU15NHdYRzRnS2lCQVkyRjBaV2R2Y25rZ1RHRnVaMXh1SUNvZ1FIQmhjbUZ0SUhzcWZTQjJZV3gxWlNCVWFHVWdkbUZzZFdVZ2RHOGdZMmhsWTJzdVhHNGdLaUJBY21WMGRYSnVjeUI3WW05dmJHVmhibjBnVW1WMGRYSnVjeUJnZEhKMVpXQWdhV1lnWUhaaGJIVmxZQ0JwY3lCaElHSjFabVpsY2l3Z1pXeHpaU0JnWm1Gc2MyVmdMbHh1SUNvZ1FHVjRZVzF3YkdWY2JpQXFYRzRnS2lCZkxtbHpRblZtWm1WeUtHNWxkeUJDZFdabVpYSW9NaWtwTzF4dUlDb2dMeThnUFQ0Z2RISjFaVnh1SUNwY2JpQXFJRjh1YVhOQ2RXWm1aWElvYm1WM0lGVnBiblE0UVhKeVlYa29NaWtwTzF4dUlDb2dMeThnUFQ0Z1ptRnNjMlZjYmlBcUwxeHVkbUZ5SUdselFuVm1abVZ5SUQwZ2JtRjBhWFpsU1hOQ2RXWm1aWElnZkh3Z2MzUjFZa1poYkhObE8xeHVYRzR2S2lwY2JpQXFJRU5vWldOcmN5QnBaaUJnZG1Gc2RXVmdJR2x6SUdOc1lYTnphV1pwWldRZ1lYTWdZU0JnUm5WdVkzUnBiMjVnSUc5aWFtVmpkQzVjYmlBcVhHNGdLaUJBYzNSaGRHbGpYRzRnS2lCQWJXVnRZbVZ5VDJZZ1gxeHVJQ29nUUhOcGJtTmxJREF1TVM0d1hHNGdLaUJBWTJGMFpXZHZjbmtnVEdGdVoxeHVJQ29nUUhCaGNtRnRJSHNxZlNCMllXeDFaU0JVYUdVZ2RtRnNkV1VnZEc4Z1kyaGxZMnN1WEc0Z0tpQkFjbVYwZFhKdWN5QjdZbTl2YkdWaGJuMGdVbVYwZFhKdWN5QmdkSEoxWldBZ2FXWWdZSFpoYkhWbFlDQnBjeUJoSUdaMWJtTjBhVzl1TENCbGJITmxJR0JtWVd4elpXQXVYRzRnS2lCQVpYaGhiWEJzWlZ4dUlDcGNiaUFxSUY4dWFYTkdkVzVqZEdsdmJpaGZLVHRjYmlBcUlDOHZJRDArSUhSeWRXVmNiaUFxWEc0Z0tpQmZMbWx6Um5WdVkzUnBiMjRvTDJGaVl5OHBPMXh1SUNvZ0x5OGdQVDRnWm1Gc2MyVmNiaUFxTDF4dVpuVnVZM1JwYjI0Z2FYTkdkVzVqZEdsdmJpaDJZV3gxWlNrZ2UxeHVJQ0F2THlCVWFHVWdkWE5sSUc5bUlHQlBZbXBsWTNRamRHOVRkSEpwYm1kZ0lHRjJiMmxrY3lCcGMzTjFaWE1nZDJsMGFDQjBhR1VnWUhSNWNHVnZabUFnYjNCbGNtRjBiM0pjYmlBZ0x5OGdhVzRnVTJGbVlYSnBJRGd0T1NCM2FHbGphQ0J5WlhSMWNtNXpJQ2R2WW1wbFkzUW5JR1p2Y2lCMGVYQmxaQ0JoY25KaGVTQmhibVFnYjNSb1pYSWdZMjl1YzNSeWRXTjBiM0p6TGx4dUlDQjJZWElnZEdGbklEMGdhWE5QWW1wbFkzUW9kbUZzZFdVcElEOGdiMkpxWldOMFZHOVRkSEpwYm1jdVkyRnNiQ2gyWVd4MVpTa2dPaUFuSnp0Y2JpQWdjbVYwZFhKdUlIUmhaeUE5UFNCbWRXNWpWR0ZuSUh4OElIUmhaeUE5UFNCblpXNVVZV2M3WEc1OVhHNWNiaThxS2x4dUlDb2dRMmhsWTJ0eklHbG1JR0IyWVd4MVpXQWdhWE1nWVNCMllXeHBaQ0JoY25KaGVTMXNhV3RsSUd4bGJtZDBhQzVjYmlBcVhHNGdLaUFxS2s1dmRHVTZLaW9nVkdocGN5QnRaWFJvYjJRZ2FYTWdiRzl2YzJWc2VTQmlZWE5sWkNCdmJseHVJQ29nVzJCVWIweGxibWQwYUdCZEtHaDBkSEE2THk5bFkyMWhMV2x1ZEdWeWJtRjBhVzl1WVd3dWIzSm5MMlZqYldFdE1qWXlMemN1TUM4amMyVmpMWFJ2YkdWdVozUm9LUzVjYmlBcVhHNGdLaUJBYzNSaGRHbGpYRzRnS2lCQWJXVnRZbVZ5VDJZZ1gxeHVJQ29nUUhOcGJtTmxJRFF1TUM0d1hHNGdLaUJBWTJGMFpXZHZjbmtnVEdGdVoxeHVJQ29nUUhCaGNtRnRJSHNxZlNCMllXeDFaU0JVYUdVZ2RtRnNkV1VnZEc4Z1kyaGxZMnN1WEc0Z0tpQkFjbVYwZFhKdWN5QjdZbTl2YkdWaGJuMGdVbVYwZFhKdWN5QmdkSEoxWldBZ2FXWWdZSFpoYkhWbFlDQnBjeUJoSUhaaGJHbGtJR3hsYm1kMGFDd2daV3h6WlNCZ1ptRnNjMlZnTGx4dUlDb2dRR1Y0WVcxd2JHVmNiaUFxWEc0Z0tpQmZMbWx6VEdWdVozUm9LRE1wTzF4dUlDb2dMeThnUFQ0Z2RISjFaVnh1SUNwY2JpQXFJRjh1YVhOTVpXNW5kR2dvVG5WdFltVnlMazFKVGw5V1FVeFZSU2s3WEc0Z0tpQXZMeUE5UGlCbVlXeHpaVnh1SUNwY2JpQXFJRjh1YVhOTVpXNW5kR2dvU1c1bWFXNXBkSGtwTzF4dUlDb2dMeThnUFQ0Z1ptRnNjMlZjYmlBcVhHNGdLaUJmTG1selRHVnVaM1JvS0Njekp5azdYRzRnS2lBdkx5QTlQaUJtWVd4elpWeHVJQ292WEc1bWRXNWpkR2x2YmlCcGMweGxibWQwYUNoMllXeDFaU2tnZTF4dUlDQnlaWFIxY200Z2RIbHdaVzltSUhaaGJIVmxJRDA5SUNkdWRXMWlaWEluSUNZbVhHNGdJQ0FnZG1Gc2RXVWdQaUF0TVNBbUppQjJZV3gxWlNBbElERWdQVDBnTUNBbUppQjJZV3gxWlNBOFBTQk5RVmhmVTBGR1JWOUpUbFJGUjBWU08xeHVmVnh1WEc0dktpcGNiaUFxSUVOb1pXTnJjeUJwWmlCZ2RtRnNkV1ZnSUdseklIUm9aVnh1SUNvZ1cyeGhibWQxWVdkbElIUjVjR1ZkS0doMGRIQTZMeTkzZDNjdVpXTnRZUzFwYm5SbGNtNWhkR2x2Ym1Gc0xtOXlaeTlsWTIxaExUSTJNaTgzTGpBdkkzTmxZeTFsWTIxaGMyTnlhWEIwTFd4aGJtZDFZV2RsTFhSNWNHVnpLVnh1SUNvZ2IyWWdZRTlpYW1WamRHQXVJQ2hsTG1jdUlHRnljbUY1Y3l3Z1puVnVZM1JwYjI1ekxDQnZZbXBsWTNSekxDQnlaV2RsZUdWekxDQmdibVYzSUU1MWJXSmxjaWd3S1dBc0lHRnVaQ0JnYm1WM0lGTjBjbWx1Wnlnbkp5bGdLVnh1SUNwY2JpQXFJRUJ6ZEdGMGFXTmNiaUFxSUVCdFpXMWlaWEpQWmlCZlhHNGdLaUJBYzJsdVkyVWdNQzR4TGpCY2JpQXFJRUJqWVhSbFoyOXllU0JNWVc1blhHNGdLaUJBY0dGeVlXMGdleXA5SUhaaGJIVmxJRlJvWlNCMllXeDFaU0IwYnlCamFHVmpheTVjYmlBcUlFQnlaWFIxY201eklIdGliMjlzWldGdWZTQlNaWFIxY201eklHQjBjblZsWUNCcFppQmdkbUZzZFdWZ0lHbHpJR0Z1SUc5aWFtVmpkQ3dnWld4elpTQmdabUZzYzJWZ0xseHVJQ29nUUdWNFlXMXdiR1ZjYmlBcVhHNGdLaUJmTG1selQySnFaV04wS0h0OUtUdGNiaUFxSUM4dklEMCtJSFJ5ZFdWY2JpQXFYRzRnS2lCZkxtbHpUMkpxWldOMEtGc3hMQ0F5TENBelhTazdYRzRnS2lBdkx5QTlQaUIwY25WbFhHNGdLbHh1SUNvZ1h5NXBjMDlpYW1WamRDaGZMbTV2YjNBcE8xeHVJQ29nTHk4Z1BUNGdkSEoxWlZ4dUlDcGNiaUFxSUY4dWFYTlBZbXBsWTNRb2JuVnNiQ2s3WEc0Z0tpQXZMeUE5UGlCbVlXeHpaVnh1SUNvdlhHNW1kVzVqZEdsdmJpQnBjMDlpYW1WamRDaDJZV3gxWlNrZ2UxeHVJQ0IyWVhJZ2RIbHdaU0E5SUhSNWNHVnZaaUIyWVd4MVpUdGNiaUFnY21WMGRYSnVJQ0VoZG1Gc2RXVWdKaVlnS0hSNWNHVWdQVDBnSjI5aWFtVmpkQ2NnZkh3Z2RIbHdaU0E5UFNBblpuVnVZM1JwYjI0bktUdGNibjFjYmx4dUx5b3FYRzRnS2lCRGFHVmphM01nYVdZZ1lIWmhiSFZsWUNCcGN5QnZZbXBsWTNRdGJHbHJaUzRnUVNCMllXeDFaU0JwY3lCdlltcGxZM1F0YkdsclpTQnBaaUJwZENkeklHNXZkQ0JnYm5Wc2JHQmNiaUFxSUdGdVpDQm9ZWE1nWVNCZ2RIbHdaVzltWUNCeVpYTjFiSFFnYjJZZ1hDSnZZbXBsWTNSY0lpNWNiaUFxWEc0Z0tpQkFjM1JoZEdsalhHNGdLaUJBYldWdFltVnlUMllnWDF4dUlDb2dRSE5wYm1ObElEUXVNQzR3WEc0Z0tpQkFZMkYwWldkdmNua2dUR0Z1WjF4dUlDb2dRSEJoY21GdElIc3FmU0IyWVd4MVpTQlVhR1VnZG1Gc2RXVWdkRzhnWTJobFkyc3VYRzRnS2lCQWNtVjBkWEp1Y3lCN1ltOXZiR1ZoYm4wZ1VtVjBkWEp1Y3lCZ2RISjFaV0FnYVdZZ1lIWmhiSFZsWUNCcGN5QnZZbXBsWTNRdGJHbHJaU3dnWld4elpTQmdabUZzYzJWZ0xseHVJQ29nUUdWNFlXMXdiR1ZjYmlBcVhHNGdLaUJmTG1selQySnFaV04wVEdsclpTaDdmU2s3WEc0Z0tpQXZMeUE5UGlCMGNuVmxYRzRnS2x4dUlDb2dYeTVwYzA5aWFtVmpkRXhwYTJVb1d6RXNJRElzSUROZEtUdGNiaUFxSUM4dklEMCtJSFJ5ZFdWY2JpQXFYRzRnS2lCZkxtbHpUMkpxWldOMFRHbHJaU2hmTG01dmIzQXBPMXh1SUNvZ0x5OGdQVDRnWm1Gc2MyVmNiaUFxWEc0Z0tpQmZMbWx6VDJKcVpXTjBUR2xyWlNodWRXeHNLVHRjYmlBcUlDOHZJRDArSUdaaGJITmxYRzRnS2k5Y2JtWjFibU4wYVc5dUlHbHpUMkpxWldOMFRHbHJaU2gyWVd4MVpTa2dlMXh1SUNCeVpYUjFjbTRnSVNGMllXeDFaU0FtSmlCMGVYQmxiMllnZG1Gc2RXVWdQVDBnSjI5aWFtVmpkQ2M3WEc1OVhHNWNiaThxS2x4dUlDb2dRMmhsWTJ0eklHbG1JR0IyWVd4MVpXQWdhWE1nWVNCd2JHRnBiaUJ2WW1wbFkzUXNJSFJvWVhRZ2FYTXNJR0Z1SUc5aWFtVmpkQ0JqY21WaGRHVmtJR0o1SUhSb1pWeHVJQ29nWUU5aWFtVmpkR0FnWTI5dWMzUnlkV04wYjNJZ2IzSWdiMjVsSUhkcGRHZ2dZU0JnVzF0UWNtOTBiM1I1Y0dWZFhXQWdiMllnWUc1MWJHeGdMbHh1SUNwY2JpQXFJRUJ6ZEdGMGFXTmNiaUFxSUVCdFpXMWlaWEpQWmlCZlhHNGdLaUJBYzJsdVkyVWdNQzQ0TGpCY2JpQXFJRUJqWVhSbFoyOXllU0JNWVc1blhHNGdLaUJBY0dGeVlXMGdleXA5SUhaaGJIVmxJRlJvWlNCMllXeDFaU0IwYnlCamFHVmpheTVjYmlBcUlFQnlaWFIxY201eklIdGliMjlzWldGdWZTQlNaWFIxY201eklHQjBjblZsWUNCcFppQmdkbUZzZFdWZ0lHbHpJR0VnY0d4aGFXNGdiMkpxWldOMExDQmxiSE5sSUdCbVlXeHpaV0F1WEc0Z0tpQkFaWGhoYlhCc1pWeHVJQ3BjYmlBcUlHWjFibU4wYVc5dUlFWnZieWdwSUh0Y2JpQXFJQ0FnZEdocGN5NWhJRDBnTVR0Y2JpQXFJSDFjYmlBcVhHNGdLaUJmTG1selVHeGhhVzVQWW1wbFkzUW9ibVYzSUVadmJ5azdYRzRnS2lBdkx5QTlQaUJtWVd4elpWeHVJQ3BjYmlBcUlGOHVhWE5RYkdGcGJrOWlhbVZqZENoYk1Td2dNaXdnTTEwcE8xeHVJQ29nTHk4Z1BUNGdabUZzYzJWY2JpQXFYRzRnS2lCZkxtbHpVR3hoYVc1UFltcGxZM1FvZXlBbmVDYzZJREFzSUNkNUp6b2dNQ0I5S1R0Y2JpQXFJQzh2SUQwK0lIUnlkV1ZjYmlBcVhHNGdLaUJmTG1selVHeGhhVzVQWW1wbFkzUW9UMkpxWldOMExtTnlaV0YwWlNodWRXeHNLU2s3WEc0Z0tpQXZMeUE5UGlCMGNuVmxYRzRnS2k5Y2JtWjFibU4wYVc5dUlHbHpVR3hoYVc1UFltcGxZM1FvZG1Gc2RXVXBJSHRjYmlBZ2FXWWdLQ0ZwYzA5aWFtVmpkRXhwYTJVb2RtRnNkV1VwSUh4OFhHNGdJQ0FnSUNCdlltcGxZM1JVYjFOMGNtbHVaeTVqWVd4c0tIWmhiSFZsS1NBaFBTQnZZbXBsWTNSVVlXY2dmSHdnYVhOSWIzTjBUMkpxWldOMEtIWmhiSFZsS1NrZ2UxeHVJQ0FnSUhKbGRIVnliaUJtWVd4elpUdGNiaUFnZlZ4dUlDQjJZWElnY0hKdmRHOGdQU0JuWlhSUWNtOTBiM1I1Y0dVb2RtRnNkV1VwTzF4dUlDQnBaaUFvY0hKdmRHOGdQVDA5SUc1MWJHd3BJSHRjYmlBZ0lDQnlaWFIxY200Z2RISjFaVHRjYmlBZ2ZWeHVJQ0IyWVhJZ1EzUnZjaUE5SUdoaGMwOTNibEJ5YjNCbGNuUjVMbU5oYkd3b2NISnZkRzhzSUNkamIyNXpkSEoxWTNSdmNpY3BJQ1ltSUhCeWIzUnZMbU52Ym5OMGNuVmpkRzl5TzF4dUlDQnlaWFIxY200Z0tIUjVjR1Z2WmlCRGRHOXlJRDA5SUNkbWRXNWpkR2x2YmljZ0ppWmNiaUFnSUNCRGRHOXlJR2x1YzNSaGJtTmxiMllnUTNSdmNpQW1KaUJtZFc1alZHOVRkSEpwYm1jdVkyRnNiQ2hEZEc5eUtTQTlQU0J2WW1wbFkzUkRkRzl5VTNSeWFXNW5LVHRjYm4xY2JseHVMeW9xWEc0Z0tpQkRhR1ZqYTNNZ2FXWWdZSFpoYkhWbFlDQnBjeUJqYkdGemMybG1hV1ZrSUdGeklHRWdkSGx3WldRZ1lYSnlZWGt1WEc0Z0tseHVJQ29nUUhOMFlYUnBZMXh1SUNvZ1FHMWxiV0psY2s5bUlGOWNiaUFxSUVCemFXNWpaU0F6TGpBdU1GeHVJQ29nUUdOaGRHVm5iM0o1SUV4aGJtZGNiaUFxSUVCd1lYSmhiU0I3S24wZ2RtRnNkV1VnVkdobElIWmhiSFZsSUhSdklHTm9aV05yTGx4dUlDb2dRSEpsZEhWeWJuTWdlMkp2YjJ4bFlXNTlJRkpsZEhWeWJuTWdZSFJ5ZFdWZ0lHbG1JR0IyWVd4MVpXQWdhWE1nWVNCMGVYQmxaQ0JoY25KaGVTd2daV3h6WlNCZ1ptRnNjMlZnTGx4dUlDb2dRR1Y0WVcxd2JHVmNiaUFxWEc0Z0tpQmZMbWx6Vkhsd1pXUkJjbkpoZVNodVpYY2dWV2x1ZERoQmNuSmhlU2s3WEc0Z0tpQXZMeUE5UGlCMGNuVmxYRzRnS2x4dUlDb2dYeTVwYzFSNWNHVmtRWEp5WVhrb1cxMHBPMXh1SUNvZ0x5OGdQVDRnWm1Gc2MyVmNiaUFxTDF4dWRtRnlJR2x6Vkhsd1pXUkJjbkpoZVNBOUlHNXZaR1ZKYzFSNWNHVmtRWEp5WVhrZ1B5QmlZWE5sVlc1aGNua29ibTlrWlVselZIbHdaV1JCY25KaGVTa2dPaUJpWVhObFNYTlVlWEJsWkVGeWNtRjVPMXh1WEc0dktpcGNiaUFxSUVOdmJuWmxjblJ6SUdCMllXeDFaV0FnZEc4Z1lTQndiR0ZwYmlCdlltcGxZM1FnWm14aGRIUmxibWx1WnlCcGJtaGxjbWwwWldRZ1pXNTFiV1Z5WVdKc1pTQnpkSEpwYm1kY2JpQXFJR3RsZVdWa0lIQnliM0JsY25ScFpYTWdiMllnWUhaaGJIVmxZQ0IwYnlCdmQyNGdjSEp2Y0dWeWRHbGxjeUJ2WmlCMGFHVWdjR3hoYVc0Z2IySnFaV04wTGx4dUlDcGNiaUFxSUVCemRHRjBhV05jYmlBcUlFQnRaVzFpWlhKUFppQmZYRzRnS2lCQWMybHVZMlVnTXk0d0xqQmNiaUFxSUVCallYUmxaMjl5ZVNCTVlXNW5YRzRnS2lCQWNHRnlZVzBnZXlwOUlIWmhiSFZsSUZSb1pTQjJZV3gxWlNCMGJ5QmpiMjUyWlhKMExseHVJQ29nUUhKbGRIVnlibk1nZTA5aWFtVmpkSDBnVW1WMGRYSnVjeUIwYUdVZ1kyOXVkbVZ5ZEdWa0lIQnNZV2x1SUc5aWFtVmpkQzVjYmlBcUlFQmxlR0Z0Y0d4bFhHNGdLbHh1SUNvZ1puVnVZM1JwYjI0Z1JtOXZLQ2tnZTF4dUlDb2dJQ0IwYUdsekxtSWdQU0F5TzF4dUlDb2dmVnh1SUNwY2JpQXFJRVp2Ynk1d2NtOTBiM1I1Y0dVdVl5QTlJRE03WEc0Z0tseHVJQ29nWHk1aGMzTnBaMjRvZXlBbllTYzZJREVnZlN3Z2JtVjNJRVp2YnlrN1hHNGdLaUF2THlBOVBpQjdJQ2RoSnpvZ01Td2dKMkluT2lBeUlIMWNiaUFxWEc0Z0tpQmZMbUZ6YzJsbmJpaDdJQ2RoSnpvZ01TQjlMQ0JmTG5SdlVHeGhhVzVQWW1wbFkzUW9ibVYzSUVadmJ5a3BPMXh1SUNvZ0x5OGdQVDRnZXlBbllTYzZJREVzSUNkaUp6b2dNaXdnSjJNbk9pQXpJSDFjYmlBcUwxeHVablZ1WTNScGIyNGdkRzlRYkdGcGJrOWlhbVZqZENoMllXeDFaU2tnZTF4dUlDQnlaWFIxY200Z1kyOXdlVTlpYW1WamRDaDJZV3gxWlN3Z2EyVjVjMGx1S0haaGJIVmxLU2s3WEc1OVhHNWNiaThxS2x4dUlDb2dRM0psWVhSbGN5QmhiaUJoY25KaGVTQnZaaUIwYUdVZ2IzZHVJR1Z1ZFcxbGNtRmliR1VnY0hKdmNHVnlkSGtnYm1GdFpYTWdiMllnWUc5aWFtVmpkR0F1WEc0Z0tseHVJQ29nS2lwT2IzUmxPaW9xSUU1dmJpMXZZbXBsWTNRZ2RtRnNkV1Z6SUdGeVpTQmpiMlZ5WTJWa0lIUnZJRzlpYW1WamRITXVJRk5sWlNCMGFHVmNiaUFxSUZ0RlV5QnpjR1ZqWFNob2RIUndPaTh2WldOdFlTMXBiblJsY201aGRHbHZibUZzTG05eVp5OWxZMjFoTFRJMk1pODNMakF2STNObFl5MXZZbXBsWTNRdWEyVjVjeWxjYmlBcUlHWnZjaUJ0YjNKbElHUmxkR0ZwYkhNdVhHNGdLbHh1SUNvZ1FITjBZWFJwWTF4dUlDb2dRSE5wYm1ObElEQXVNUzR3WEc0Z0tpQkFiV1Z0WW1WeVQyWWdYMXh1SUNvZ1FHTmhkR1ZuYjNKNUlFOWlhbVZqZEZ4dUlDb2dRSEJoY21GdElIdFBZbXBsWTNSOUlHOWlhbVZqZENCVWFHVWdiMkpxWldOMElIUnZJSEYxWlhKNUxseHVJQ29nUUhKbGRIVnlibk1nZTBGeWNtRjVmU0JTWlhSMWNtNXpJSFJvWlNCaGNuSmhlU0J2WmlCd2NtOXdaWEowZVNCdVlXMWxjeTVjYmlBcUlFQmxlR0Z0Y0d4bFhHNGdLbHh1SUNvZ1puVnVZM1JwYjI0Z1JtOXZLQ2tnZTF4dUlDb2dJQ0IwYUdsekxtRWdQU0F4TzF4dUlDb2dJQ0IwYUdsekxtSWdQU0F5TzF4dUlDb2dmVnh1SUNwY2JpQXFJRVp2Ynk1d2NtOTBiM1I1Y0dVdVl5QTlJRE03WEc0Z0tseHVJQ29nWHk1clpYbHpLRzVsZHlCR2IyOHBPMXh1SUNvZ0x5OGdQVDRnV3lkaEp5d2dKMkluWFNBb2FYUmxjbUYwYVc5dUlHOXlaR1Z5SUdseklHNXZkQ0JuZFdGeVlXNTBaV1ZrS1Z4dUlDcGNiaUFxSUY4dWEyVjVjeWduYUdrbktUdGNiaUFxSUM4dklEMCtJRnNuTUNjc0lDY3hKMTFjYmlBcUwxeHVablZ1WTNScGIyNGdhMlY1Y3lodlltcGxZM1FwSUh0Y2JpQWdjbVYwZFhKdUlHbHpRWEp5WVhsTWFXdGxLRzlpYW1WamRDa2dQeUJoY25KaGVVeHBhMlZMWlhsektHOWlhbVZqZENrZ09pQmlZWE5sUzJWNWN5aHZZbXBsWTNRcE8xeHVmVnh1WEc0dktpcGNiaUFxSUVOeVpXRjBaWE1nWVc0Z1lYSnlZWGtnYjJZZ2RHaGxJRzkzYmlCaGJtUWdhVzVvWlhKcGRHVmtJR1Z1ZFcxbGNtRmliR1VnY0hKdmNHVnlkSGtnYm1GdFpYTWdiMllnWUc5aWFtVmpkR0F1WEc0Z0tseHVJQ29nS2lwT2IzUmxPaW9xSUU1dmJpMXZZbXBsWTNRZ2RtRnNkV1Z6SUdGeVpTQmpiMlZ5WTJWa0lIUnZJRzlpYW1WamRITXVYRzRnS2x4dUlDb2dRSE4wWVhScFkxeHVJQ29nUUcxbGJXSmxjazltSUY5Y2JpQXFJRUJ6YVc1alpTQXpMakF1TUZ4dUlDb2dRR05oZEdWbmIzSjVJRTlpYW1WamRGeHVJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJRzlpYW1WamRDQlVhR1VnYjJKcVpXTjBJSFJ2SUhGMVpYSjVMbHh1SUNvZ1FISmxkSFZ5Ym5NZ2UwRnljbUY1ZlNCU1pYUjFjbTV6SUhSb1pTQmhjbkpoZVNCdlppQndjbTl3WlhKMGVTQnVZVzFsY3k1Y2JpQXFJRUJsZUdGdGNHeGxYRzRnS2x4dUlDb2dablZ1WTNScGIyNGdSbTl2S0NrZ2UxeHVJQ29nSUNCMGFHbHpMbUVnUFNBeE8xeHVJQ29nSUNCMGFHbHpMbUlnUFNBeU8xeHVJQ29nZlZ4dUlDcGNiaUFxSUVadmJ5NXdjbTkwYjNSNWNHVXVZeUE5SURNN1hHNGdLbHh1SUNvZ1h5NXJaWGx6U1c0b2JtVjNJRVp2YnlrN1hHNGdLaUF2THlBOVBpQmJKMkVuTENBbllpY3NJQ2RqSjEwZ0tHbDBaWEpoZEdsdmJpQnZjbVJsY2lCcGN5QnViM1FnWjNWaGNtRnVkR1ZsWkNsY2JpQXFMMXh1Wm5WdVkzUnBiMjRnYTJWNWMwbHVLRzlpYW1WamRDa2dlMXh1SUNCeVpYUjFjbTRnYVhOQmNuSmhlVXhwYTJVb2IySnFaV04wS1NBL0lHRnljbUY1VEdsclpVdGxlWE1vYjJKcVpXTjBMQ0IwY25WbEtTQTZJR0poYzJWTFpYbHpTVzRvYjJKcVpXTjBLVHRjYm4xY2JseHVMeW9xWEc0Z0tpQlVhR2x6SUcxbGRHaHZaQ0JwY3lCc2FXdGxJR0JmTG1GemMybG5ibUFnWlhoalpYQjBJSFJvWVhRZ2FYUWdjbVZqZFhKemFYWmxiSGtnYldWeVoyVnpJRzkzYmlCaGJtUmNiaUFxSUdsdWFHVnlhWFJsWkNCbGJuVnRaWEpoWW14bElITjBjbWx1WnlCclpYbGxaQ0J3Y205d1pYSjBhV1Z6SUc5bUlITnZkWEpqWlNCdlltcGxZM1J6SUdsdWRHOGdkR2hsWEc0Z0tpQmtaWE4wYVc1aGRHbHZiaUJ2WW1wbFkzUXVJRk52ZFhKalpTQndjbTl3WlhKMGFXVnpJSFJvWVhRZ2NtVnpiMngyWlNCMGJ5QmdkVzVrWldacGJtVmtZQ0JoY21WY2JpQXFJSE5yYVhCd1pXUWdhV1lnWVNCa1pYTjBhVzVoZEdsdmJpQjJZV3gxWlNCbGVHbHpkSE11SUVGeWNtRjVJR0Z1WkNCd2JHRnBiaUJ2WW1wbFkzUWdjSEp2Y0dWeWRHbGxjMXh1SUNvZ1lYSmxJRzFsY21kbFpDQnlaV04xY25OcGRtVnNlUzRnVDNSb1pYSWdiMkpxWldOMGN5QmhibVFnZG1Gc2RXVWdkSGx3WlhNZ1lYSmxJRzkyWlhKeWFXUmtaVzRnWW5sY2JpQXFJR0Z6YzJsbmJtMWxiblF1SUZOdmRYSmpaU0J2WW1wbFkzUnpJR0Z5WlNCaGNIQnNhV1ZrSUdaeWIyMGdiR1ZtZENCMGJ5QnlhV2RvZEM0Z1UzVmljMlZ4ZFdWdWRGeHVJQ29nYzI5MWNtTmxjeUJ2ZG1WeWQzSnBkR1VnY0hKdmNHVnlkSGtnWVhOemFXZHViV1Z1ZEhNZ2IyWWdjSEpsZG1sdmRYTWdjMjkxY21ObGN5NWNiaUFxWEc0Z0tpQXFLazV2ZEdVNktpb2dWR2hwY3lCdFpYUm9iMlFnYlhWMFlYUmxjeUJnYjJKcVpXTjBZQzVjYmlBcVhHNGdLaUJBYzNSaGRHbGpYRzRnS2lCQWJXVnRZbVZ5VDJZZ1gxeHVJQ29nUUhOcGJtTmxJREF1TlM0d1hHNGdLaUJBWTJGMFpXZHZjbmtnVDJKcVpXTjBYRzRnS2lCQWNHRnlZVzBnZTA5aWFtVmpkSDBnYjJKcVpXTjBJRlJvWlNCa1pYTjBhVzVoZEdsdmJpQnZZbXBsWTNRdVhHNGdLaUJBY0dGeVlXMGdleTR1TGs5aWFtVmpkSDBnVzNOdmRYSmpaWE5kSUZSb1pTQnpiM1Z5WTJVZ2IySnFaV04wY3k1Y2JpQXFJRUJ5WlhSMWNtNXpJSHRQWW1wbFkzUjlJRkpsZEhWeWJuTWdZRzlpYW1WamRHQXVYRzRnS2lCQVpYaGhiWEJzWlZ4dUlDcGNiaUFxSUhaaGNpQnZZbXBsWTNRZ1BTQjdYRzRnS2lBZ0lDZGhKem9nVzNzZ0oySW5PaUF5SUgwc0lIc2dKMlFuT2lBMElIMWRYRzRnS2lCOU8xeHVJQ3BjYmlBcUlIWmhjaUJ2ZEdobGNpQTlJSHRjYmlBcUlDQWdKMkVuT2lCYmV5QW5ZeWM2SURNZ2ZTd2dleUFuWlNjNklEVWdmVjFjYmlBcUlIMDdYRzRnS2x4dUlDb2dYeTV0WlhKblpTaHZZbXBsWTNRc0lHOTBhR1Z5S1R0Y2JpQXFJQzh2SUQwK0lIc2dKMkVuT2lCYmV5QW5ZaWM2SURJc0lDZGpKem9nTXlCOUxDQjdJQ2RrSnpvZ05Dd2dKMlVuT2lBMUlIMWRJSDFjYmlBcUwxeHVkbUZ5SUcxbGNtZGxJRDBnWTNKbFlYUmxRWE56YVdkdVpYSW9ablZ1WTNScGIyNG9iMkpxWldOMExDQnpiM1Z5WTJVc0lITnlZMGx1WkdWNEtTQjdYRzRnSUdKaGMyVk5aWEpuWlNodlltcGxZM1FzSUhOdmRYSmpaU3dnYzNKalNXNWtaWGdwTzF4dWZTazdYRzVjYmk4cUtseHVJQ29nVkdocGN5QnRaWFJvYjJRZ2NtVjBkWEp1Y3lCaElHNWxkeUJsYlhCMGVTQmhjbkpoZVM1Y2JpQXFYRzRnS2lCQWMzUmhkR2xqWEc0Z0tpQkFiV1Z0WW1WeVQyWWdYMXh1SUNvZ1FITnBibU5sSURRdU1UTXVNRnh1SUNvZ1FHTmhkR1ZuYjNKNUlGVjBhV3hjYmlBcUlFQnlaWFIxY201eklIdEJjbkpoZVgwZ1VtVjBkWEp1Y3lCMGFHVWdibVYzSUdWdGNIUjVJR0Z5Y21GNUxseHVJQ29nUUdWNFlXMXdiR1ZjYmlBcVhHNGdLaUIyWVhJZ1lYSnlZWGx6SUQwZ1h5NTBhVzFsY3lneUxDQmZMbk4wZFdKQmNuSmhlU2s3WEc0Z0tseHVJQ29nWTI5dWMyOXNaUzVzYjJjb1lYSnlZWGx6S1R0Y2JpQXFJQzh2SUQwK0lGdGJYU3dnVzExZFhHNGdLbHh1SUNvZ1kyOXVjMjlzWlM1c2IyY29ZWEp5WVhseld6QmRJRDA5UFNCaGNuSmhlWE5iTVYwcE8xeHVJQ29nTHk4Z1BUNGdabUZzYzJWY2JpQXFMMXh1Wm5WdVkzUnBiMjRnYzNSMVlrRnljbUY1S0NrZ2UxeHVJQ0J5WlhSMWNtNGdXMTA3WEc1OVhHNWNiaThxS2x4dUlDb2dWR2hwY3lCdFpYUm9iMlFnY21WMGRYSnVjeUJnWm1Gc2MyVmdMbHh1SUNwY2JpQXFJRUJ6ZEdGMGFXTmNiaUFxSUVCdFpXMWlaWEpQWmlCZlhHNGdLaUJBYzJsdVkyVWdOQzR4TXk0d1hHNGdLaUJBWTJGMFpXZHZjbmtnVlhScGJGeHVJQ29nUUhKbGRIVnlibk1nZTJKdmIyeGxZVzU5SUZKbGRIVnlibk1nWUdaaGJITmxZQzVjYmlBcUlFQmxlR0Z0Y0d4bFhHNGdLbHh1SUNvZ1h5NTBhVzFsY3lneUxDQmZMbk4wZFdKR1lXeHpaU2s3WEc0Z0tpQXZMeUE5UGlCYlptRnNjMlVzSUdaaGJITmxYVnh1SUNvdlhHNW1kVzVqZEdsdmJpQnpkSFZpUm1Gc2MyVW9LU0I3WEc0Z0lISmxkSFZ5YmlCbVlXeHpaVHRjYm4xY2JseHViVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQnRaWEpuWlR0Y2JpSmRmUT09IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgbWVyZ2UgPSByZXF1aXJlKCdsb2Rhc2gubWVyZ2UnKTtcblxudmFyIEJhc2UgPSByZXF1aXJlKCcuL2Jhc2UuanMnKTtcbnZhciBTdHJhdGVneSA9IHJlcXVpcmUoJy4vc3RyYXRlZ3kuanMnKTtcbnZhciBJZGVudGlmaWVyID0gcmVxdWlyZSgnLi9pZGVudGlmaWVyLmpzJyk7XG52YXIgVHJpcGxlID0gcmVxdWlyZSgnLi90cmlwbGUuanMnKTtcbnZhciBMU2VxTm9kZSA9IHJlcXVpcmUoJy4vbHNlcW5vZGUuanMnKTtcblxudmFyIEV4T3V0T2ZCb3VuZHMgPSByZXF1aXJlKCcuL2V4b3V0b2Zib3VuZHMuanMnKTtcblxuLyoqXG4gKiBEaXN0cmlidXRlZCBhcnJheSB1c2luZyBMU2VxIGFsbG9jYXRpb24gc3RyYXRlZ3kgd2l0aCBhbiB1bmRlcmx5aW5nXG4gKiBleHBvbmVudGlhbCB0cmVlLlxuICovXG5cbnZhciBMU2VxVHJlZSA9IGZ1bmN0aW9uICgpIHtcblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIGdsb2JhbGx5IHVuaXF1ZSBzaXRlIGlkZW50aWZpZXIuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zXSBUaGUgb3B0aW9ucyBvZiB0aGUgTFNlcVRyZWUuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtvcHRpb25zLmJvdW5kYXJ5ID0gMTBdIFRoZSBtYXhpbWFsIGludGVydmFsIGJldHdlZW4gdHdvXG4gICAgICogZ2VuZXJhdGVkIG5vZGVzLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBbb3B0aW9ucy5iYXNlID0gMTVdIFRoZSBiYXNlLCBpLmUuLCB0aGUgbWF4aW1hbCBhcml0eSBvZlxuICAgICAqIHRoZSByb290IG5vZGUuIERlZmF1bHQgaXMgMioqMTUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gTFNlcVRyZWUoc2l0ZSkge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDoge307XG5cbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIExTZXFUcmVlKTtcblxuICAgICAgICB2YXIgbGlzdFRyaXBsZSA9IHZvaWQgMDtcbiAgICAgICAgLy8gIzAgcHJvY2VzcyBvcHRpb25zXG4gICAgICAgIHRoaXMub3B0aW9ucyA9IG1lcmdlKHsgYm91bmRhcnk6IDEwLCBiYXNlOiAxNSB9LCBvcHRpb25zKTtcblxuICAgICAgICAvLyAjMSBpbml0aWFsaXplIHNvdXJjZSwgY291bnRlciwgYW5kIHN0cmF0ZWd5IGNob2ljZVxuICAgICAgICB0aGlzLl9zID0gc2l0ZTtcbiAgICAgICAgdGhpcy5fYyA9IDA7XG4gICAgICAgIHRoaXMuX2hhc2ggPSBmdW5jdGlvbiAoZGVwdGgpIHtcbiAgICAgICAgICAgIHJldHVybiBkZXB0aCAlIDI7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5fYmFzZSA9IG5ldyBCYXNlKHRoaXMub3B0aW9ucy5iYXNlKTtcbiAgICAgICAgdGhpcy5fc3RyYXRlZ3kgPSBuZXcgU3RyYXRlZ3kodGhpcy5fYmFzZSwgdGhpcy5vcHRpb25zLmJvdW5kYXJ5KTtcblxuICAgICAgICAvLyAjMiBpbml0aWFsaXplIHRyZWUgc3RydWN0dXJlIHdpdGggbWF4aW1hbCBib3VuZHNcbiAgICAgICAgdGhpcy5yb290ID0gbmV3IExTZXFOb2RlKCk7XG4gICAgICAgIC8vICNBIG1pbmltYWwgYm91bmRcbiAgICAgICAgdGhpcy5yb290LmFkZChuZXcgTFNlcU5vZGUoW25ldyBUcmlwbGUoMCwgMCwgMCldLCAnJykpO1xuICAgICAgICAvLyAjQiBtYXhpbWFsIGJvdW5kXG4gICAgICAgIHRoaXMucm9vdC5hZGQobmV3IExTZXFOb2RlKFtuZXcgVHJpcGxlKE1hdGgucG93KDIsIHRoaXMuX2Jhc2UuZ2V0Qml0QmFzZSgwKSkgLSAxLCBOdW1iZXIuTUFYX1ZBTFVFLCBOdW1iZXIuTUFYX1ZBTFVFKV0sICcnKSk7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKExTZXFUcmVlLCBbe1xuICAgICAgICBrZXk6ICdnZXQnLFxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCB0aGUgZWxlbWVudCBhdCB0YXJnZXRlZCBpbmRleCBpbiB0aGUgbGluZWFyaXplZCBzZXF1ZW5jZS4gSXQgZG9lcyBub3RcbiAgICAgICAgICogdGFrZSBpbnRvIGFjY291bnQgdGhlIGhpZGRlbiBib3VuZGFyaWVzIG9mIHRoZSBzZXF1ZW5jZSBbTUlOLCBlXzEsIGVfMixcbiAgICAgICAgICogLi4uIGVfbGVuZ3RoLCBNQVhdLCBoZW5jZSBpbmRleCBvZiBlXzEgaXMgMC5cbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4IFRoZSBpbmRleCBvZiB0aGUgZWxlbWVudCBpbiB0aGUgZmxhdHRlbmVkIGFycmF5LlxuICAgICAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBlbGVtZW50IGxvY2F0ZWQgYXQgdGhlIGluZGV4IGluIGFyZ3VtZW50LlxuICAgICAgICAgKi9cbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldChpbmRleCkge1xuICAgICAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFeE91dE9mQm91bmRzKGluZGV4LCB0aGlzLmxlbmd0aCk7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgbm9kZSA9IHRoaXMucm9vdC5nZXQoaW5kZXggKyAxKTtcbiAgICAgICAgICAgIHdoaWxlICghbm9kZS5pc0xlYWYpIHtcbiAgICAgICAgICAgICAgICBub2RlID0gbm9kZS5jaGlsZDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gbm9kZS5lO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdfZ2V0JyxcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcHJpdmF0ZSBHZXQgdGhlIExTZXFOb2RlIGF0IHRhcmdldGVkIGluZGV4IGluIHRoZSBsaW5lYXJpemVkXG4gICAgICAgICAqIHNlcXVlbmNlLiBUaGUgc2VxdWVuY2UgaW5jbHVkZXMgdGhlIGhpZGRlbiBib3VuZGFyaWVzIFtNSU4sIGVfMSwgZV8yLFxuICAgICAgICAgKiAuLi4gZV9sZW5ndGgsIE1BWF0sIGhlbmNlIGVfMSdzIGluZGV4IGlzIDEuXG4gICAgICAgICAqIEBwYXJhbSB7TnVtYmVyfSBpbmRleCBUaGUgaW5kZXggb2YgdGhlIGVsZW1lbnQgaW4gdGhlIGZsYXR0ZW5lZCBhcnJheS5cbiAgICAgICAgICogQHJldHVybiB7TFNlcU5vZGV9IFRoZSBMU2VxTm9kZSB0YXJnZXRpbmcgdGhlIGVsZW1lbnQgYXQgaW5kZXguXG4gICAgICAgICAqL1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gX2dldChpbmRleCkge1xuICAgICAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLmxlbmd0aCArIDIpIHtcbiAgICAgICAgICAgICAgICAvLyArMjogYm91bmRhcmllc1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFeE91dE9mQm91bmRzKGluZGV4LCB0aGlzLmxlbmd0aCArIDIpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucm9vdC5nZXQoaW5kZXgpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdpbnNlcnQnLFxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEluc2VydCBhIHZhbHVlIGF0IHRoZSB0YXJnZXRlZCBpbmRleC5cbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IGVsZW1lbnQgVGhlIGVsZW1lbnQgdG8gaW5zZXJ0LCBlLmcuIGEgY2hhcmFjdGVyIGlmIHRoZVxuICAgICAgICAgKiBzZXF1ZW5jZSBpcyBhIHN0cmluZy5cbiAgICAgICAgICogQHBhcmFtIHtOdW1iZXJ9IGluZGV4IFRoZSBwb3NpdGlvbiBpbiB0aGUgYXJyYXkuXG4gICAgICAgICAqIEByZXR1cm4ge09iamVjdH0ge19lOiBlbGVtZW50IG9mIE9iamVjdCB0eXBlLCBfaTogSWRlbnRpZmllcn1cbiAgICAgICAgICovXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBpbnNlcnQoZWxlbWVudCwgaW5kZXgpIHtcbiAgICAgICAgICAgIHZhciBwZWkgPSB0aGlzLl9nZXQoaW5kZXgpLFxuICAgICAgICAgICAgICAgIC8vICMxYSBwcmV2aW91cyBib3VuZFxuICAgICAgICAgICAgcWVpID0gdGhpcy5fZ2V0KGluZGV4ICsgMSk7IC8vICMxYiBuZXh0IGJvdW5kXG5cbiAgICAgICAgICAgIC8vICMyYSBpbmNyZW1lbnRpbmcgdGhlIGxvY2FsIGNvdW50ZXJcbiAgICAgICAgICAgIHRoaXMuX2MgKz0gMTtcbiAgICAgICAgICAgIC8vICMyYiBnZW5lcmF0aW5nIHRoZSBpZCBpbmJldHdlZW4gdGhlIGJvdW5kc1xuICAgICAgICAgICAgdmFyIGlkID0gdGhpcy5hbGxvYyhwZWksIHFlaSk7XG5cbiAgICAgICAgICAgIC8vICMzIGFkZCBpdCB0byB0aGUgc3RydWN0dXJlIGFuZCByZXR1cm4gdmFsdWVcbiAgICAgICAgICAgIHZhciBwYWlyID0geyBlbGVtOiBlbGVtZW50LCBpZDogaWQgfTtcbiAgICAgICAgICAgIHRoaXMuYXBwbHlJbnNlcnQocGFpcik7XG4gICAgICAgICAgICByZXR1cm4gcGFpcjtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVtb3ZlJyxcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZWxldGUgdGhlIGVsZW1lbnQgYXQgdGhlIGluZGV4LlxuICAgICAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXggVGhlIGluZGV4IG9mIHRoZSBlbGVtZW50IHRvIGRlbGV0ZSBpbiB0aGUgYXJyYXkuXG4gICAgICAgICAqIEByZXR1cm4ge0lkZW50aWZpZXJ9IFRoZSBpZGVudGlmaWVyIG9mIHRoZSBlbGVtZW50IGF0IHRoZSBpbmRleC5cbiAgICAgICAgICovXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW1vdmUoaW5kZXgpIHtcbiAgICAgICAgICAgIHZhciBlaSA9IHRoaXMuX2dldChpbmRleCArIDEpO1xuICAgICAgICAgICAgdmFyIGkgPSBuZXcgSWRlbnRpZmllcih0aGlzLl9iYXNlKS5mcm9tTm9kZShlaSk7XG4gICAgICAgICAgICB0aGlzLmFwcGx5UmVtb3ZlKGVpKTtcbiAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdhbGxvYycsXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogR2VuZXJhdGUgdGhlIGRpZ2l0IHBhcnQgb2YgdGhlIGlkZW50aWZpZXJzICBiZXR3ZWVuIHAgYW5kIHEuXG4gICAgICAgICAqIEBwYXJhbSB7TFNlcU5vZGV9IHAgVGhlIGRpZ2l0IHBhcnQgb2YgdGhlIHByZXZpb3VzIGlkZW50aWZpZXIuXG4gICAgICAgICAqIEBwYXJhbSB7TFNlcU5vZGV9IHEgVGhlIGRpZ2l0IHBhcnQgb2YgdGhlIG5leHQgaWRlbnRpZmllci5cbiAgICAgICAgICogQHJldHVybiB7SWRlbnRpZmllcn0gVGhlIG5ldyBpZGVudGlmaWVyIGxvY2F0ZWQgYmV0d2VlbiBwIGFuZCBxLlxuICAgICAgICAgKi9cbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGFsbG9jKHAsIHEpIHtcbiAgICAgICAgICAgIHZhciBpbnRlcnZhbCA9IDAsXG4gICAgICAgICAgICAgICAgbGV2ZWwgPSAwO1xuICAgICAgICAgICAgLy8gIzEgcHJvY2VzcyB0aGUgbGV2ZWwgb2YgdGhlIG5ldyBpZGVudGlmaWVyXG4gICAgICAgICAgICB3aGlsZSAoaW50ZXJ2YWwgPD0gMCkge1xuICAgICAgICAgICAgICAgIC8vIG5vIHJvb20gZm9yIGluc2VydGlvblxuICAgICAgICAgICAgICAgIGludGVydmFsID0gdGhpcy5fYmFzZS5nZXRJbnRlcnZhbChsZXZlbCwgcCwgcSk7XG4gICAgICAgICAgICAgICAgKytsZXZlbDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBsZXZlbCAtPSAxO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2hhc2gobGV2ZWwpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0cmF0ZWd5LmJQbHVzKHAsIHEsIGxldmVsLCBpbnRlcnZhbCwgdGhpcy5fcywgdGhpcy5fYyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdHJhdGVneS5iTWludXMocCwgcSwgbGV2ZWwsIGludGVydmFsLCB0aGlzLl9zLCB0aGlzLl9jKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2FwcGx5SW5zZXJ0JyxcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbnNlcnQgYW4gZWxlbWVudCBjcmVhdGVkIGZyb20gYSByZW1vdGUgc2l0ZSBpbnRvIHRoZSBhcnJheS5cbiAgICAgICAgICogQHBhcmFtIHtPYmplY3R9IHBhaXIgUGFpciBjb250YWluaW5nIHRoZSBpZGVudGlmaWVyIGFuZCB0aGUgZWxlbWVudCB0b1xuICAgICAgICAgKiBpbnNlcnQgaW4gdGhlIGRhdGEgc3RydWN0dXJlLlxuICAgICAgICAgKiBAcGFyYW0ge0lkZW50aWZpZXJ8TFNlcU5vZGV9IHBhaXIuaWQgVGhlIGlkZW50aWZpZXIgb2YgdGhlIGVsZW1lbnQuXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBwYWlyLmVsZW0gVGhlIGVsZW1lbnQgdG8gaW5zZXJ0LlxuICAgICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtub0luZGV4ID0gdHJ1ZV0gV2hldGhlciBvciBub3QgaXQgc2hvdWxkIHJldHVybiB0aGVcbiAgICAgICAgICogaW5kZXggb2YgdGhlIGluc2VydC5cbiAgICAgICAgICogQHJldHVybiB7TnVtYmVyfEJvb2xlYW59IFRoZSBpbmRleCBvZiB0aGUgbmV3bHkgaW5zZXJ0ZWQgZWxlbWVudCBpbiB0aGVcbiAgICAgICAgICogYXJyYXksIGlmIGFza2VkLiAtMSBpZiB0aGUgZWxlbWVudCBhbHJlYWR5IGV4aXN0cyBhbmQgaGFzIG5vdCBiZWVuIGFkZGVkLlxuICAgICAgICAgKiBJZiBub0luZGV4LCByZXR1cm5zIHRydWUgaWYgdGhlIGVsZW1lbnQgaGFzIGJlZW4gYWRkZWQsIGZhbHNlIG90aGVyd2lzZS5cbiAgICAgICAgICovXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBhcHBseUluc2VydChwYWlyKSB7XG4gICAgICAgICAgICB2YXIgbm9JbmRleCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogdHJ1ZTtcblxuICAgICAgICAgICAgdmFyIG5vZGUgPSB2b2lkIDAsXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdm9pZCAwLFxuICAgICAgICAgICAgICAgIGkgPSB2b2lkIDA7XG4gICAgICAgICAgICAvLyAjMCBjYXN0IGZyb20gdGhlIHByb3BlciB0eXBlXG4gICAgICAgICAgICAvLyAjMEEgdGhlIGlkZW50aWZpZXIgaXMgYW4gSWRlbnRpZmllclxuICAgICAgICAgICAgaSA9IHBhaXIuaWQ7XG4gICAgICAgICAgICBub2RlID0gaSAmJiBpLl9kICYmIGkuX3MgJiYgaS5fYyAmJiBuZXcgSWRlbnRpZmllcih0aGlzLl9iYXNlLCBpLl9kLCBpLl9zLCBpLl9jKS50b05vZGUocGFpci5lbGVtKTtcbiAgICAgICAgICAgIC8vICMwQiB0aGUgaWRlbnRpZmllciBpcyBhIExTZXFOb2RlXG4gICAgICAgICAgICBub2RlID0gaSAmJiBpLnQgJiYgaS5jaGlsZHJlbiAmJiBMU2VxTm9kZS5mcm9tSlNPTihpKSB8fCBub2RlO1xuICAgICAgICAgICAgLy8gIzEgaW50ZWdyYXRlcyB0aGUgbmV3IGVsZW1lbnQgdG8gdGhlIGRhdGEgc3RydWN0dXJlXG4gICAgICAgICAgICByZXN1bHQgPSB0aGlzLnJvb3QuYWRkKG5vZGUpO1xuICAgICAgICAgICAgLy8gIzIgaWYgdGhlIGVsZW1lbnQgYXMgYmVlbiBhZGRlZFxuICAgICAgICAgICAgaWYgKG5vSW5kZXgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yb290LmluZGV4T2Yobm9kZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2FwcGx5UmVtb3ZlJyxcblxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZWxldGUgdGhlIGVsZW1lbnQgd2l0aCB0aGUgdGFyZ2V0ZWQgaWRlbnRpZmllci5cbiAgICAgICAgICogQHBhcmFtIHtJZGVudGlmaWVyfExTZXFOb2RlfSBpIFRoZSBpZGVudGlmaWVyIG9mIHRoZSBlbGVtZW50LlxuICAgICAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSBpbmRleCBvZiB0aGUgZWxlbWVudCBmcmVzaGx5IGRlbGV0ZWQsIC0xIGlmIG5vXG4gICAgICAgICAqIHJlbW92YWwuXG4gICAgICAgICAqL1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gYXBwbHlSZW1vdmUoaSkge1xuICAgICAgICAgICAgdmFyIG5vZGUgPSB2b2lkIDAsXG4gICAgICAgICAgICAgICAgcG9zaXRpb24gPSB2b2lkIDA7XG4gICAgICAgICAgICAvLyAjMCBjYXN0IGZyb20gdGhlIHByb3BlciB0eXBlXG4gICAgICAgICAgICBub2RlID0gaSAmJiBpLl9kICYmIGkuX3MgJiYgaS5fYyAmJiBuZXcgSWRlbnRpZmllcih0aGlzLl9iYXNlLCBpLl9kLCBpLl9zLCBpLl9jKS50b05vZGUobnVsbCk7XG4gICAgICAgICAgICAvLyAjMEIgdGhlIGlkZW50aWZpZXIgaXMgYSBMU0VRTm9kZVxuICAgICAgICAgICAgbm9kZSA9IGkgJiYgaS50ICYmIGkuY2hpbGRyZW4gJiYgTFNlcU5vZGUuZnJvbUpTT04oaSkgfHwgbm9kZTtcbiAgICAgICAgICAgIC8vICMxIGdldCB0aGUgaW5kZXggb2YgdGhlIGVsZW1lbnQgdG8gcmVtb3ZlXG4gICAgICAgICAgICBwb3NpdGlvbiA9IHRoaXMucm9vdC5pbmRleE9mKG5vZGUpO1xuICAgICAgICAgICAgaWYgKHBvc2l0aW9uICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIC8vICMyIGlmIGl0IGV4aXN0cyByZW1vdmUgaXRcbiAgICAgICAgICAgICAgICB0aGlzLnJvb3QuZGVsKG5vZGUpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBwb3NpdGlvbjtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZnJvbUpTT04nLFxuXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENhc3QgdGhlIEpTT04gb2JqZWN0IGludG8gYSBwcm9wZXIgTFNlcVRyZWUuXG4gICAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgdGhlIEpTT04gb2JqZWN0IHRvIGNhc3QuXG4gICAgICAgICAqIEByZXR1cm4ge0xTZXFUcmVlfSBBIHNlbGYgcmVmZXJlbmNlLlxuICAgICAgICAgKi9cbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGZyb21KU09OKG9iamVjdCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICAgICAgLy8gIzEgY29weSB0aGUgc291cmNlLCBjb3VudGVyLCBhbmQgbGVuZ3RoIG9mIHRoZSBvYmplY3RcbiAgICAgICAgICAgIHRoaXMuX3MgPSBvYmplY3QuX3M7XG4gICAgICAgICAgICB0aGlzLl9jID0gb2JqZWN0Ll9jO1xuICAgICAgICAgICAgdGhpcy5vcHRpb25zID0gb2JqZWN0Lm9wdGlvbnM7XG5cbiAgICAgICAgICAgIHRoaXMuX2Jhc2UgPSBuZXcgQmFzZSh0aGlzLm9wdGlvbnMuYmFzZSk7XG4gICAgICAgICAgICB0aGlzLl9ib3VuZGFyeSA9IG5ldyBTdHJhdGVneSh0aGlzLl9iYXNlLCB0aGlzLm9wdGlvbnMuYm91bmRhcnkpO1xuXG4gICAgICAgICAgICAvLyAjMiBkZXB0aCBmaXJzdCBhZGRpbmdcbiAgICAgICAgICAgIHZhciBkZXB0aEZpcnN0ID0gZnVuY3Rpb24gZGVwdGhGaXJzdChjdXJyZW50Tm9kZSwgY3VycmVudFBhdGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgdHJpcGxlID0gbmV3IFRyaXBsZShjdXJyZW50Tm9kZS50LnAsIGN1cnJlbnROb2RlLnQucywgY3VycmVudE5vZGUudC5jKTtcbiAgICAgICAgICAgICAgICBjdXJyZW50UGF0aC5wdXNoKHRyaXBsZSk7IC8vIHN0YWNrXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnROb2RlLmUgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMucm9vdC5hZGQobmV3IExTZXFOb2RlKGN1cnJlbnRQYXRoLnNsaWNlKCksIGN1cnJlbnROb2RlLmUpKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY3VycmVudE5vZGUuY2hpbGRyZW4ubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVwdGhGaXJzdChjdXJyZW50Tm9kZS5jaGlsZHJlbltpXSwgY3VycmVudFBhdGgpO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgY3VycmVudFBhdGgucG9wKCk7IC8vIHVuc3RhY2tcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iamVjdC5yb290LmNoaWxkcmVuLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgZGVwdGhGaXJzdChvYmplY3Qucm9vdC5jaGlsZHJlbltpXSwgW10pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgfSwge1xuICAgICAgICBrZXk6ICdsZW5ndGgnLFxuICAgICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSB0aGlzLnJvb3Quc3ViQ291bnRlciAtIDI7IC8vIC0yOiB0aGUgYm91bmRhcmllc1xuICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy5yb290Ll9oYXNFbGVtZW50ICYmIHJlc3VsdCArIDEgfHwgcmVzdWx0O1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBMU2VxVHJlZTtcbn0oKTtcblxuO1xuXG5tb2R1bGUuZXhwb3J0cyA9IExTZXFUcmVlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW14elpYRjBjbVZsTG1weklsMHNJbTVoYldWeklqcGJJbTFsY21kbElpd2ljbVZ4ZFdseVpTSXNJa0poYzJVaUxDSlRkSEpoZEdWbmVTSXNJa2xrWlc1MGFXWnBaWElpTENKVWNtbHdiR1VpTENKTVUyVnhUbTlrWlNJc0lrVjRUM1YwVDJaQ2IzVnVaSE1pTENKTVUyVnhWSEpsWlNJc0luTnBkR1VpTENKdmNIUnBiMjV6SWl3aWJHbHpkRlJ5YVhCc1pTSXNJbUp2ZFc1a1lYSjVJaXdpWW1GelpTSXNJbDl6SWl3aVgyTWlMQ0pmYUdGemFDSXNJbVJsY0hSb0lpd2lYMkpoYzJVaUxDSmZjM1J5WVhSbFoza2lMQ0p5YjI5MElpd2lZV1JrSWl3aVRXRjBhQ0lzSW5CdmR5SXNJbWRsZEVKcGRFSmhjMlVpTENKT2RXMWlaWElpTENKTlFWaGZWa0ZNVlVVaUxDSnBibVJsZUNJc0lteGxibWQwYUNJc0ltNXZaR1VpTENKblpYUWlMQ0pwYzB4bFlXWWlMQ0pqYUdsc1pDSXNJbVVpTENKbGJHVnRaVzUwSWl3aWNHVnBJaXdpWDJkbGRDSXNJbkZsYVNJc0ltbGtJaXdpWVd4c2IyTWlMQ0p3WVdseUlpd2laV3hsYlNJc0ltRndjR3g1U1c1elpYSjBJaXdpWldraUxDSnBJaXdpWm5KdmJVNXZaR1VpTENKaGNIQnNlVkpsYlc5MlpTSXNJbkFpTENKeElpd2lhVzUwWlhKMllXd2lMQ0pzWlhabGJDSXNJbWRsZEVsdWRHVnlkbUZzSWl3aVlsQnNkWE1pTENKaVRXbHVkWE1pTENKdWIwbHVaR1Y0SWl3aWNtVnpkV3gwSWl3aVgyUWlMQ0owYjA1dlpHVWlMQ0owSWl3aVkyaHBiR1J5Wlc0aUxDSm1jbTl0U2xOUFRpSXNJbWx1WkdWNFQyWWlMQ0p3YjNOcGRHbHZiaUlzSW1SbGJDSXNJbTlpYW1WamRDSXNJbDlpYjNWdVpHRnllU0lzSW1SbGNIUm9SbWx5YzNRaUxDSmpkWEp5Wlc1MFRtOWtaU0lzSW1OMWNuSmxiblJRWVhSb0lpd2lkSEpwY0d4bElpd2ljeUlzSW1NaUxDSndkWE5vSWl3aWMyeHBZMlVpTENKd2IzQWlMQ0p6ZFdKRGIzVnVkR1Z5SWl3aVgyaGhjMFZzWlcxbGJuUWlMQ0p0YjJSMWJHVWlMQ0psZUhCdmNuUnpJbDBzSW0xaGNIQnBibWR6SWpvaVFVRkJRVHM3T3pzN08wRkJSVUVzU1VGQlRVRXNVVUZCVVVNc1VVRkJVU3hqUVVGU0xFTkJRV1E3TzBGQlJVRXNTVUZCVFVNc1QwRkJUMFFzVVVGQlVTeFhRVUZTTEVOQlFXSTdRVUZEUVN4SlFVRk5SU3hYUVVGWFJpeFJRVUZSTEdWQlFWSXNRMEZCYWtJN1FVRkRRU3hKUVVGTlJ5eGhRVUZoU0N4UlFVRlJMR2xDUVVGU0xFTkJRVzVDTzBGQlEwRXNTVUZCVFVrc1UwRkJVMG9zVVVGQlVTeGhRVUZTTEVOQlFXWTdRVUZEUVN4SlFVRk5TeXhYUVVGWFRDeFJRVUZSTEdWQlFWSXNRMEZCYWtJN08wRkJSVUVzU1VGQlRVMHNaMEpCUVdkQ1RpeFJRVUZSTEc5Q1FVRlNMRU5CUVhSQ096dEJRVWRCT3pzN096dEpRVWxOVHl4Uk96dEJRVVZHT3pzN096czdPenRCUVZGQkxITkNRVUZoUXl4SlFVRmlMRVZCUVdsRE8wRkJRVUVzV1VGQlpFTXNUMEZCWXl4MVJVRkJTaXhGUVVGSk96dEJRVUZCT3p0QlFVTTNRaXhaUVVGSlF5eHRRa0ZCU2p0QlFVTkJPMEZCUTBFc1lVRkJTMFFzVDBGQlRDeEhRVUZsVml4TlFVRk5MRVZCUVVWWkxGVkJRVlVzUlVGQldpeEZRVUZuUWtNc1RVRkJUU3hGUVVGMFFpeEZRVUZPTEVWQlFXdERTQ3hQUVVGc1F5eERRVUZtT3p0QlFVVkJPMEZCUTBFc1lVRkJTMGtzUlVGQlRDeEhRVUZWVEN4SlFVRldPMEZCUTBFc1lVRkJTMDBzUlVGQlRDeEhRVUZWTEVOQlFWWTdRVUZEUVN4aFFVRkxReXhMUVVGTUxFZEJRV0VzVlVGQlEwTXNTMEZCUkR0QlFVRkJMRzFDUVVGWFFTeFJRVUZOTEVOQlFXcENPMEZCUVVFc1UwRkJZanM3UVVGRlFTeGhRVUZMUXl4TFFVRk1MRWRCUVdFc1NVRkJTV2hDTEVsQlFVb3NRMEZCVXl4TFFVRkxVU3hQUVVGTUxFTkJRV0ZITEVsQlFYUkNMRU5CUVdJN1FVRkRRU3hoUVVGTFRTeFRRVUZNTEVkQlFXbENMRWxCUVVsb1FpeFJRVUZLTEVOQlFXRXNTMEZCUzJVc1MwRkJiRUlzUlVGQmVVSXNTMEZCUzFJc1QwRkJUQ3hEUVVGaFJTeFJRVUYwUXl4RFFVRnFRanM3UVVGRlFUdEJRVU5CTEdGQlFVdFJMRWxCUVV3c1IwRkJXU3hKUVVGSlpDeFJRVUZLTEVWQlFWbzdRVUZEUVR0QlFVTkJMR0ZCUVV0akxFbEJRVXdzUTBGQlZVTXNSMEZCVml4RFFVRmpMRWxCUVVsbUxGRkJRVW9zUTBGQllTeERRVUZETEVsQlFVbEVMRTFCUVVvc1EwRkJWeXhEUVVGWUxFVkJRV0VzUTBGQllpeEZRVUZsTEVOQlFXWXNRMEZCUkN4RFFVRmlMRVZCUVd0RExFVkJRV3hETEVOQlFXUTdRVUZEUVR0QlFVTkJMR0ZCUVV0bExFbEJRVXdzUTBGQlZVTXNSMEZCVml4RFFVTkpMRWxCUVVsbUxGRkJRVW9zUTBGQllTeERRVUZETEVsQlFVbEVMRTFCUVVvc1EwRkJWMmxDTEV0QlFVdERMRWRCUVV3c1EwRkJVeXhEUVVGVUxFVkJRVmtzUzBGQlMwd3NTMEZCVEN4RFFVRlhUU3hWUVVGWUxFTkJRWE5DTEVOQlFYUkNMRU5CUVZvc1NVRkJkME1zUTBGQmJrUXNSVUZEVjBNc1QwRkJUME1zVTBGRWJFSXNSVUZGVjBRc1QwRkJUME1zVTBGR2JFSXNRMEZCUkN4RFFVRmlMRVZCUlRaRExFVkJSamRETEVOQlJFbzdRVUZKU0RzN096czdPMEZCVTBRN096czdPenM3TkVKQlQwdERMRXNzUlVGQlR6dEJRVU5TTEdkQ1FVRkpRU3hSUVVGUkxFTkJRVklzU1VGQllVRXNVMEZCVXl4TFFVRkxReXhOUVVFdlFpeEZRVUYxUXp0QlFVTnVReXh6UWtGQlRTeEpRVUZKY2tJc1lVRkJTaXhEUVVGclFtOUNMRXRCUVd4Q0xFVkJRWGxDTEV0QlFVdERMRTFCUVRsQ0xFTkJRVTQ3UVVGRFNEczdRVUZGUkN4blFrRkJTVU1zVDBGQlR5eExRVUZMVkN4SlFVRk1MRU5CUVZWVkxFZEJRVllzUTBGQlkwZ3NVVUZCVVN4RFFVRjBRaXhEUVVGWU8wRkJRMEVzYlVKQlFVOHNRMEZCUTBVc1MwRkJTMFVzVFVGQllpeEZRVUZ2UWp0QlFVTm9Ra1lzZFVKQlFVOUJMRXRCUVV0SExFdEJRVm83UVVGRFNEdEJRVU5FTEcxQ1FVRlBTQ3hMUVVGTFNTeERRVUZhTzBGQlEwZzdPenM3TzBGQlJVUTdPenM3T3pzN05rSkJUMDFPTEVzc1JVRkJUenRCUVVOVUxHZENRVUZKUVN4UlFVRlJMRU5CUVZJc1NVRkJZVUVzVTBGQlV5eExRVUZMUXl4TlFVRk1MRWRCUVdNc1EwRkJlRU1zUlVGQk1rTTdRVUZCUlR0QlFVTjZReXh6UWtGQlRTeEpRVUZKY2tJc1lVRkJTaXhEUVVGclFtOUNMRXRCUVd4Q0xFVkJRWGxDTEV0QlFVdERMRTFCUVV3c1IwRkJZeXhEUVVGMlF5eERRVUZPTzBGQlEwZzdPMEZCUlVRc2JVSkJRVThzUzBGQlMxSXNTVUZCVEN4RFFVRlZWU3hIUVVGV0xFTkJRV05JTEV0QlFXUXNRMEZCVUR0QlFVTklPenM3T3p0QlFVVkVPenM3T3pzN095dENRVTlSVHl4UExFVkJRVk5RTEVzc1JVRkJUenRCUVVOd1FpeG5Ra0ZCVFZFc1RVRkJUU3hMUVVGTFF5eEpRVUZNTEVOQlFWVlVMRXRCUVZZc1EwRkJXanRCUVVGQkxHZENRVUU0UWp0QlFVTjRRbFVzYTBKQlFVMHNTMEZCUzBRc1NVRkJUQ3hEUVVGVlZDeFJRVUZOTEVOQlFXaENMRU5CUkZvc1EwRkViMElzUTBGRldUczdRVUZGTDBJN1FVRkRSQ3hwUWtGQlMxb3NSVUZCVEN4SlFVRlhMRU5CUVZnN1FVRkRRVHRCUVVOQkxHZENRVUZOZFVJc1MwRkJTeXhMUVVGTFF5eExRVUZNTEVOQlFWZEtMRWRCUVZnc1JVRkJaMEpGTEVkQlFXaENMRU5CUVZnN08wRkJSVUU3UVVGRFFTeG5Ra0ZCVFVjc1QwRkJUeXhGUVVGRFF5eE5RVUZOVUN4UFFVRlFMRVZCUVdkQ1NTeEpRVUZKUVN4RlFVRndRaXhGUVVGaU8wRkJRMEVzYVVKQlFVdEpMRmRCUVV3c1EwRkJhVUpHTEVsQlFXcENPMEZCUTBFc2JVSkJRVTlCTEVsQlFWQTdRVUZEU0RzN096czdRVUZGUkRzN096czdLMEpCUzFGaUxFc3NSVUZCVHp0QlFVTllMR2RDUVVGTlowSXNTMEZCU3l4TFFVRkxVQ3hKUVVGTUxFTkJRVlZVTEZGQlFWRXNRMEZCYkVJc1EwRkJXRHRCUVVOQkxHZENRVUZOYVVJc1NVRkJTU3hKUVVGSmVFTXNWVUZCU2l4RFFVRmxMRXRCUVV0akxFdEJRWEJDTEVWQlFUSkNNa0lzVVVGQk0wSXNRMEZCYjBOR0xFVkJRWEJETEVOQlFWWTdRVUZEUVN4cFFrRkJTMGNzVjBGQlRDeERRVUZwUWtnc1JVRkJha0k3UVVGRFFTeHRRa0ZCVDBNc1EwRkJVRHRCUVVOSU96czdPenRCUVVkRU96czdPenM3T0VKQlRVOUhMRU1zUlVGQlIwTXNReXhGUVVGSE8wRkJRMVFzWjBKQlFVbERMRmRCUVZjc1EwRkJaanRCUVVGQkxHZENRVUZyUWtNc1VVRkJVU3hEUVVFeFFqdEJRVU5CTzBGQlEwRXNiVUpCUVU5RUxGbEJRVmtzUTBGQmJrSXNSVUZCYzBJN1FVRkJSVHRCUVVOd1FrRXNNa0pCUVZjc1MwRkJTeTlDTEV0QlFVd3NRMEZCVjJsRExGZEJRVmdzUTBGQmRVSkVMRXRCUVhaQ0xFVkJRVGhDU0N4RFFVRTVRaXhGUVVGcFEwTXNRMEZCYWtNc1EwRkJXRHRCUVVOQkxHdENRVUZGUlN4TFFVRkdPMEZCUTBnN1FVRkRSRUVzY1VKQlFWTXNRMEZCVkR0QlFVTkJMR2RDUVVGSkxFdEJRVXRzUXl4TFFVRk1MRU5CUVZkclF5eExRVUZZTEUxQlFYTkNMRU5CUVRGQ0xFVkJRVFpDTzBGQlEzcENMSFZDUVVGUExFdEJRVXN2UWl4VFFVRk1MRU5CUVdWcFF5eExRVUZtTEVOQlFYRkNUQ3hEUVVGeVFpeEZRVUYzUWtNc1EwRkJlRUlzUlVGRGNVSkZMRXRCUkhKQ0xFVkJRelJDUkN4UlFVUTFRaXhGUVVWeFFpeExRVUZMYmtNc1JVRkdNVUlzUlVGRk9FSXNTMEZCUzBNc1JVRkdia01zUTBGQlVEdEJRVWRJTEdGQlNrUXNUVUZKVHp0QlFVTklMSFZDUVVGUExFdEJRVXRKTEZOQlFVd3NRMEZCWld0RExFMUJRV1lzUTBGQmMwSk9MRU5CUVhSQ0xFVkJRWGxDUXl4RFFVRjZRaXhGUVVOelFrVXNTMEZFZEVJc1JVRkROa0pFTEZGQlJEZENMRVZCUlhOQ0xFdEJRVXR1UXl4RlFVWXpRaXhGUVVVclFpeExRVUZMUXl4RlFVWndReXhEUVVGUU8wRkJSMGc3UVVGRFNqczdPenM3UVVGSFJEczdPenM3T3pzN096czdPMjlEUVZsaGVVSXNTU3hGUVVGelFqdEJRVUZCTEdkQ1FVRm9RbU1zVDBGQlowSXNkVVZCUVU0c1NVRkJUVHM3UVVGREwwSXNaMEpCUVVsNlFpeGhRVUZLTzBGQlFVRXNaMEpCUVZVd1FpeGxRVUZXTzBGQlFVRXNaMEpCUVd0Q1dDeFZRVUZzUWp0QlFVTkJPMEZCUTBFN1FVRkRRVUVzWjBKQlFVbEtMRXRCUVV0R0xFVkJRVlE3UVVGRFFWUXNiVUpCUVZGbExFdEJRVXRCTEVWQlFVVlpMRVZCUVZBc1NVRkJZVm9zUlVGQlJUbENMRVZCUVdZc1NVRkJjVUk0UWl4RlFVRkZOMElzUlVGQmRrSXNTVUZEU0N4SlFVRkpXQ3hWUVVGS0xFTkJRV1VzUzBGQlMyTXNTMEZCY0VJc1JVRkJNa0l3UWl4RlFVRkZXU3hGUVVFM1FpeEZRVUZwUTFvc1JVRkJSVGxDTEVWQlFXNURMRVZCUVhWRE9FSXNSVUZCUlRkQ0xFVkJRWHBETEVWQlFUWkRNRU1zVFVGQk4wTXNRMEZCYjBScVFpeExRVUZMUXl4SlFVRjZSQ3hEUVVSTU8wRkJSVUU3UVVGRFFWb3NiVUpCUVZGbExFdEJRVXRCTEVWQlFVVmpMRU5CUVZBc1NVRkJXV1FzUlVGQlJXVXNVVUZCWkN4SlFVRXdRbkpFTEZOQlFWTnpSQ3hSUVVGVUxFTkJRV3RDYUVJc1EwRkJiRUlzUTBGQk0wSXNTVUZCYjBSbUxFbEJRVE5FTzBGQlEwRTdRVUZEUVRCQ0xIRkNRVUZUTEV0QlFVdHVReXhKUVVGTUxFTkJRVlZETEVkQlFWWXNRMEZCWTFFc1NVRkJaQ3hEUVVGVU8wRkJRMEU3UVVGRFFTeG5Ra0ZCU1hsQ0xFOUJRVW9zUlVGQllUdEJRVU5VTEhWQ1FVRlBReXhOUVVGUU8wRkJRMGdzWVVGR1JDeE5RVVZQTEVsQlFVbEJMRTFCUVVvc1JVRkJXVHRCUVVObUxIVkNRVUZQTEV0QlFVdHVReXhKUVVGTUxFTkJRVlY1UXl4UFFVRldMRU5CUVd0Q2FFTXNTVUZCYkVJc1EwRkJVRHRCUVVOSUxHRkJSazBzVFVGRlFUdEJRVU5JTEhWQ1FVRlBMRU5CUVVNc1EwRkJVanRCUVVOSU8wRkJRMG83T3pzN08wRkJSVVE3T3pzN096dHZRMEZOWVdVc1F5eEZRVUZITzBGQlExb3NaMEpCUVVsbUxHRkJRVW83UVVGQlFTeG5Ra0ZCVldsRExHbENRVUZXTzBGQlEwRTdRVUZEUVdwRExHMUNRVUZQWlN4TFFVRkxRU3hGUVVGRldTeEZRVUZRTEVsQlFXRmFMRVZCUVVVNVFpeEZRVUZtTEVsQlFYRkNPRUlzUlVGQlJUZENMRVZCUVhaQ0xFbEJRMFlzU1VGQlNWZ3NWVUZCU2l4RFFVRmxMRXRCUVV0akxFdEJRWEJDTEVWQlFUSkNNRUlzUlVGQlJWa3NSVUZCTjBJc1JVRkJhVU5hTEVWQlFVVTVRaXhGUVVGdVF5eEZRVUYxUXpoQ0xFVkJRVVUzUWl4RlFVRjZReXhEUVVGRUxFTkJRU3RETUVNc1RVRkJMME1zUTBGQmMwUXNTVUZCZEVRc1EwRkVTanRCUVVWQk8wRkJRMEUxUWl4dFFrRkJVV1VzUzBGQlMwRXNSVUZCUldNc1EwRkJVQ3hKUVVGWlpDeEZRVUZGWlN4UlFVRmtMRWxCUVRCQ2NrUXNVMEZCVTNORUxGRkJRVlFzUTBGQmEwSm9RaXhEUVVGc1FpeERRVUV6UWl4SlFVRnZSR1lzU1VGQk0wUTdRVUZEUVR0QlFVTkJhVU1zZFVKQlFWY3NTMEZCU3pGRExFbEJRVXdzUTBGQlZYbERMRTlCUVZZc1EwRkJhMEpvUXl4SlFVRnNRaXhEUVVGWU8wRkJRMEVzWjBKQlFVbHBReXhoUVVGaExFTkJRVU1zUTBGQmJFSXNSVUZCYjBJN1FVRkRhRUk3UVVGRFFTeHhRa0ZCU3pGRExFbEJRVXdzUTBGQlZUSkRMRWRCUVZZc1EwRkJZMnhETEVsQlFXUTdRVUZEU0R0QlFVTkVMRzFDUVVGUGFVTXNVVUZCVUR0QlFVTklPenM3T3p0QlFVVkVPenM3T3p0cFEwRkxWVVVzVFN4RlFVRlJPMEZCUVVFN08wRkJRMlE3UVVGRFFTeHBRa0ZCUzJ4RUxFVkJRVXdzUjBGQlZXdEVMRTlCUVU5c1JDeEZRVUZxUWp0QlFVTkJMR2xDUVVGTFF5eEZRVUZNTEVkQlFWVnBSQ3hQUVVGUGFrUXNSVUZCYWtJN1FVRkRRU3hwUWtGQlMwd3NUMEZCVEN4SFFVRmxjMFFzVDBGQlQzUkVMRTlCUVhSQ096dEJRVVZCTEdsQ1FVRkxVU3hMUVVGTUxFZEJRV0VzU1VGQlNXaENMRWxCUVVvc1EwRkJVeXhMUVVGTFVTeFBRVUZNTEVOQlFXRkhMRWxCUVhSQ0xFTkJRV0k3UVVGRFFTeHBRa0ZCUzI5RUxGTkJRVXdzUjBGQmFVSXNTVUZCU1RsRUxGRkJRVW9zUTBGQllTeExRVUZMWlN4TFFVRnNRaXhGUVVGNVFpeExRVUZMVWl4UFFVRk1MRU5CUVdGRkxGRkJRWFJETEVOQlFXcENPenRCUVVWQk8wRkJRMEVzWjBKQlFVMXpSQ3hoUVVGaExGTkJRV0pCTEZWQlFXRXNRMEZCUTBNc1YwRkJSQ3hGUVVGalF5eFhRVUZrTEVWQlFUaENPMEZCUXpkRExHOUNRVUZOUXl4VFFVRlRMRWxCUVVsb1JTeE5RVUZLTEVOQlFWYzRSQ3haUVVGWlZDeERRVUZhTEVOQlFXTllMRU5CUVhwQ0xFVkJRMWR2UWl4WlFVRlpWQ3hEUVVGYUxFTkJRV05aTEVOQlJIcENMRVZCUlZkSUxGbEJRVmxVTEVOQlFWb3NRMEZCWTJFc1EwRkdla0lzUTBGQlpqdEJRVWRCU0N3MFFrRkJXVWtzU1VGQldpeERRVUZwUWtnc1RVRkJha0lzUlVGS05rTXNRMEZKYmtJN1FVRkRNVUlzYjBKQlFVbEdMRmxCUVZsc1F5eERRVUZhTEV0QlFXdENMRWxCUVhSQ0xFVkJRVFJDTzBGQlEzaENMREJDUVVGTFlpeEpRVUZNTEVOQlFWVkRMRWRCUVZZc1EwRkJZeXhKUVVGSlppeFJRVUZLTEVOQlFXRTRSQ3haUVVGWlN5eExRVUZhTEVWQlFXSXNSVUZCYTBOT0xGbEJRVmxzUXl4RFFVRTVReXhEUVVGa08wRkJRMGc3UVVGRFJDeHhRa0ZCU3l4SlFVRkpWeXhKUVVGSkxFTkJRV0lzUlVGQlowSkJMRWxCUVVsMVFpeFpRVUZaVWl4UlFVRmFMRU5CUVhGQ0wwSXNUVUZCZWtNc1JVRkJhVVFzUlVGQlJXZENMRU5CUVc1RUxFVkJRWE5FTzBGQlEyeEVjMElzSzBKQlFWZERMRmxCUVZsU0xGRkJRVm9zUTBGQmNVSm1MRU5CUVhKQ0xFTkJRVmdzUlVGQmIwTjNRaXhYUVVGd1F6dEJRVU5JTzBGQlEwUkJMRFJDUVVGWlRTeEhRVUZhTEVkQldEWkRMRU5CVnpGQ08wRkJRM1JDTEdGQldrUTdRVUZoUVN4cFFrRkJTeXhKUVVGSk9VSXNTVUZCU1N4RFFVRmlMRVZCUVdkQ1FTeEpRVUZKYjBJc1QwRkJUelZETEVsQlFWQXNRMEZCV1hWRExGRkJRVm9zUTBGQmNVSXZRaXhOUVVGNlF5eEZRVUZwUkN4RlFVRkZaMElzUTBGQmJrUXNSVUZCY1VRN1FVRkRha1J6UWl3eVFrRkJWMFlzVDBGQlR6VkRMRWxCUVZBc1EwRkJXWFZETEZGQlFWb3NRMEZCY1VKbUxFTkJRWEpDTEVOQlFWZ3NSVUZCYjBNc1JVRkJjRU03UVVGRFNEdEJRVU5FTEcxQ1FVRlBMRWxCUVZBN1FVRkRTRHM3T3pSQ1FUVk1ZVHRCUVVOV0xHZENRVUZKVnl4VFFVRlRMRXRCUVV0dVF5eEpRVUZNTEVOQlFWVjFSQ3hWUVVGV0xFZEJRWFZDTEVOQlFYQkRMRU5CUkZVc1EwRkROa0k3UVVGRGRrTndRaXh4UWtGQlZTeExRVUZMYmtNc1NVRkJUQ3hEUVVGVmQwUXNWMEZCVml4SlFVRjVRbkpDTEZOQlFWTXNRMEZCYmtNc1NVRkJlVU5CTEUxQlFXeEVPMEZCUTBFc2JVSkJRVTlCTEUxQlFWQTdRVUZEU0RzN096czdPMEZCTUV4S096dEJRVVZFYzBJc1QwRkJUME1zVDBGQlVDeEhRVUZwUW5SRkxGRkJRV3BDSWl3aVptbHNaU0k2SW14elpYRjBjbVZsTG1weklpd2ljMjkxY21ObGMwTnZiblJsYm5RaU9sc2lKM1Z6WlNCemRISnBZM1FuTzF4dVhHNWpiMjV6ZENCdFpYSm5aU0E5SUhKbGNYVnBjbVVvSjJ4dlpHRnphQzV0WlhKblpTY3BPMXh1WEc1amIyNXpkQ0JDWVhObElEMGdjbVZ4ZFdseVpTZ25MaTlpWVhObExtcHpKeWs3WEc1amIyNXpkQ0JUZEhKaGRHVm5lU0E5SUhKbGNYVnBjbVVvSnk0dmMzUnlZWFJsWjNrdWFuTW5LVHRjYm1OdmJuTjBJRWxrWlc1MGFXWnBaWElnUFNCeVpYRjFhWEpsS0NjdUwybGtaVzUwYVdacFpYSXVhbk1uS1R0Y2JtTnZibk4wSUZSeWFYQnNaU0E5SUhKbGNYVnBjbVVvSnk0dmRISnBjR3hsTG1wekp5azdYRzVqYjI1emRDQk1VMlZ4VG05a1pTQTlJSEpsY1hWcGNtVW9KeTR2YkhObGNXNXZaR1V1YW5NbktUdGNibHh1WTI5dWMzUWdSWGhQZFhSUFprSnZkVzVrY3lBOUlISmxjWFZwY21Vb0p5NHZaWGh2ZFhSdlptSnZkVzVrY3k1cWN5Y3BPMXh1WEc1Y2JpOHFLbHh1SUNvZ1JHbHpkSEpwWW5WMFpXUWdZWEp5WVhrZ2RYTnBibWNnVEZObGNTQmhiR3h2WTJGMGFXOXVJSE4wY21GMFpXZDVJSGRwZEdnZ1lXNGdkVzVrWlhKc2VXbHVaMXh1SUNvZ1pYaHdiMjVsYm5ScFlXd2dkSEpsWlM1Y2JpQXFMMXh1WTJ4aGMzTWdURk5sY1ZSeVpXVWdlMXh1WEc0Z0lDQWdMeW9xWEc0Z0lDQWdJQ29nUUhCaGNtRnRJSHRQWW1wbFkzUjlJSE52ZFhKalpTQlVhR1VnWjJ4dlltRnNiSGtnZFc1cGNYVmxJSE5wZEdVZ2FXUmxiblJwWm1sbGNpNWNiaUFnSUNBZ0tpQkFjR0Z5WVcwZ2UwOWlhbVZqZEgwZ1cyOXdkR2x2Ym5OZElGUm9aU0J2Y0hScGIyNXpJRzltSUhSb1pTQk1VMlZ4VkhKbFpTNWNiaUFnSUNBZ0tpQkFjR0Z5WVcwZ2UwNTFiV0psY24wZ1cyOXdkR2x2Ym5NdVltOTFibVJoY25rZ1BTQXhNRjBnVkdobElHMWhlR2x0WVd3Z2FXNTBaWEoyWVd3Z1ltVjBkMlZsYmlCMGQyOWNiaUFnSUNBZ0tpQm5aVzVsY21GMFpXUWdibTlrWlhNdVhHNGdJQ0FnSUNvZ1FIQmhjbUZ0SUh0T2RXMWlaWEo5SUZ0dmNIUnBiMjV6TG1KaGMyVWdQU0F4TlYwZ1ZHaGxJR0poYzJVc0lHa3VaUzRzSUhSb1pTQnRZWGhwYldGc0lHRnlhWFI1SUc5bVhHNGdJQ0FnSUNvZ2RHaGxJSEp2YjNRZ2JtOWtaUzRnUkdWbVlYVnNkQ0JwY3lBeUtpb3hOUzVjYmlBZ0lDQWdLaTljYmlBZ0lDQmpiMjV6ZEhKMVkzUnZjaUFvYzJsMFpTd2diM0IwYVc5dWN5QTlJSHQ5S1NCN1hHNGdJQ0FnSUNBZ0lHeGxkQ0JzYVhOMFZISnBjR3hsTzF4dUlDQWdJQ0FnSUNBdkx5QWpNQ0J3Y205alpYTnpJRzl3ZEdsdmJuTmNiaUFnSUNBZ0lDQWdkR2hwY3k1dmNIUnBiMjV6SUQwZ2JXVnlaMlVvZXlCaWIzVnVaR0Z5ZVRvZ01UQXNJR0poYzJVNklERTFJSDBzSUc5d2RHbHZibk1wTzF4dVhHNGdJQ0FnSUNBZ0lDOHZJQ014SUdsdWFYUnBZV3hwZW1VZ2MyOTFjbU5sTENCamIzVnVkR1Z5TENCaGJtUWdjM1J5WVhSbFoza2dZMmh2YVdObFhHNGdJQ0FnSUNBZ0lIUm9hWE11WDNNZ1BTQnphWFJsTzF4dUlDQWdJQ0FnSUNCMGFHbHpMbDlqSUQwZ01EdGNiaUFnSUNBZ0lDQWdkR2hwY3k1ZmFHRnphQ0E5SUNoa1pYQjBhQ2tnUFQ0Z1pHVndkR2dsTWp0Y2JseHVJQ0FnSUNBZ0lDQjBhR2x6TGw5aVlYTmxJRDBnYm1WM0lFSmhjMlVvZEdocGN5NXZjSFJwYjI1ekxtSmhjMlVwTzF4dUlDQWdJQ0FnSUNCMGFHbHpMbDl6ZEhKaGRHVm5lU0E5SUc1bGR5QlRkSEpoZEdWbmVTaDBhR2x6TGw5aVlYTmxMQ0IwYUdsekxtOXdkR2x2Ym5NdVltOTFibVJoY25rcE8xeHVYRzRnSUNBZ0lDQWdJQzh2SUNNeUlHbHVhWFJwWVd4cGVtVWdkSEpsWlNCemRISjFZM1IxY21VZ2QybDBhQ0J0WVhocGJXRnNJR0p2ZFc1a2MxeHVJQ0FnSUNBZ0lDQjBhR2x6TG5KdmIzUWdQU0J1WlhjZ1RGTmxjVTV2WkdVb0tUdGNiaUFnSUNBZ0lDQWdMeThnSTBFZ2JXbHVhVzFoYkNCaWIzVnVaRnh1SUNBZ0lDQWdJQ0IwYUdsekxuSnZiM1F1WVdSa0tHNWxkeUJNVTJWeFRtOWtaU2hiYm1WM0lGUnlhWEJzWlNnd0xEQXNNQ2xkTENBbkp5a3BPMXh1SUNBZ0lDQWdJQ0F2THlBalFpQnRZWGhwYldGc0lHSnZkVzVrWEc0Z0lDQWdJQ0FnSUhSb2FYTXVjbTl2ZEM1aFpHUW9YRzRnSUNBZ0lDQWdJQ0FnSUNCdVpYY2dURk5sY1U1dlpHVW9XMjVsZHlCVWNtbHdiR1VvVFdGMGFDNXdiM2NvTWl3Z2RHaHBjeTVmWW1GelpTNW5aWFJDYVhSQ1lYTmxLREFwS1NBdElERXNYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnVG5WdFltVnlMazFCV0Y5V1FVeFZSU3hjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCT2RXMWlaWEl1VFVGWVgxWkJURlZGS1Ywc0lDY25LU2s3WEc0Z0lDQWdmVHRjYmx4dUlDQWdJRnh1SUNBZ0lHZGxkQ0JzWlc1bmRHZ2dLQ2tnZTF4dUlDQWdJQ0FnSUNCc1pYUWdjbVZ6ZFd4MElEMGdkR2hwY3k1eWIyOTBMbk4xWWtOdmRXNTBaWElnTFNBeU95QXZMeUF0TWpvZ2RHaGxJR0p2ZFc1a1lYSnBaWE5jYmlBZ0lDQWdJQ0FnY21WemRXeDBJRDBnS0hSb2FYTXVjbTl2ZEM1ZmFHRnpSV3hsYldWdWRDQW1KaUJ5WlhOMWJIUWdLeUF4S1NCOGZDQnlaWE4xYkhRN1hHNGdJQ0FnSUNBZ0lISmxkSFZ5YmlCeVpYTjFiSFE3WEc0Z0lDQWdmVHRjYmlBZ0lDQmNiaUFnSUNBdktpcGNiaUFnSUNBZ0tpQkhaWFFnZEdobElHVnNaVzFsYm5RZ1lYUWdkR0Z5WjJWMFpXUWdhVzVrWlhnZ2FXNGdkR2hsSUd4cGJtVmhjbWw2WldRZ2MyVnhkV1Z1WTJVdUlFbDBJR1J2WlhNZ2JtOTBYRzRnSUNBZ0lDb2dkR0ZyWlNCcGJuUnZJR0ZqWTI5MWJuUWdkR2hsSUdocFpHUmxiaUJpYjNWdVpHRnlhV1Z6SUc5bUlIUm9aU0J6WlhGMVpXNWpaU0JiVFVsT0xDQmxYekVzSUdWZk1peGNiaUFnSUNBZ0tpQXVMaTRnWlY5c1pXNW5kR2dzSUUxQldGMHNJR2hsYm1ObElHbHVaR1Y0SUc5bUlHVmZNU0JwY3lBd0xseHVJQ0FnSUNBcUlFQndZWEpoYlNCN1RuVnRZbVZ5ZlNCcGJtUmxlQ0JVYUdVZ2FXNWtaWGdnYjJZZ2RHaGxJR1ZzWlcxbGJuUWdhVzRnZEdobElHWnNZWFIwWlc1bFpDQmhjbkpoZVM1Y2JpQWdJQ0FnS2lCQWNtVjBkWEp1SUh0UFltcGxZM1I5SUZSb1pTQmxiR1Z0Wlc1MElHeHZZMkYwWldRZ1lYUWdkR2hsSUdsdVpHVjRJR2x1SUdGeVozVnRaVzUwTGx4dUlDQWdJQ0FxTDF4dUlDQWdJR2RsZENBb2FXNWtaWGdwSUh0Y2JpQWdJQ0FnSUNBZ2FXWWdLR2x1WkdWNElEd2dNQ0I4ZkNCcGJtUmxlQ0ErUFNCMGFHbHpMbXhsYm1kMGFDa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2RHaHliM2NnYm1WM0lFVjRUM1YwVDJaQ2IzVnVaSE1vYVc1a1pYZ3NJSFJvYVhNdWJHVnVaM1JvS1R0Y2JpQWdJQ0FnSUNBZ2ZUdGNiaUFnSUNBZ0lDQWdYRzRnSUNBZ0lDQWdJR3hsZENCdWIyUmxJRDBnZEdocGN5NXliMjkwTG1kbGRDaHBibVJsZUNBcklERXBPMXh1SUNBZ0lDQWdJQ0IzYUdsc1pTQW9JVzV2WkdVdWFYTk1aV0ZtS1h0Y2JpQWdJQ0FnSUNBZ0lDQWdJRzV2WkdVZ1BTQnViMlJsTG1Ob2FXeGtPMXh1SUNBZ0lDQWdJQ0I5TzF4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnYm05a1pTNWxPMXh1SUNBZ0lIMDdYRzRnSUNBZ1hHNGdJQ0FnTHlvcVhHNGdJQ0FnSUNvZ1FIQnlhWFpoZEdVZ1IyVjBJSFJvWlNCTVUyVnhUbTlrWlNCaGRDQjBZWEpuWlhSbFpDQnBibVJsZUNCcGJpQjBhR1VnYkdsdVpXRnlhWHBsWkZ4dUlDQWdJQ0FxSUhObGNYVmxibU5sTGlCVWFHVWdjMlZ4ZFdWdVkyVWdhVzVqYkhWa1pYTWdkR2hsSUdocFpHUmxiaUJpYjNWdVpHRnlhV1Z6SUZ0TlNVNHNJR1ZmTVN3Z1pWOHlMRnh1SUNBZ0lDQXFJQzR1TGlCbFgyeGxibWQwYUN3Z1RVRllYU3dnYUdWdVkyVWdaVjh4SjNNZ2FXNWtaWGdnYVhNZ01TNWNiaUFnSUNBZ0tpQkFjR0Z5WVcwZ2UwNTFiV0psY24wZ2FXNWtaWGdnVkdobElHbHVaR1Y0SUc5bUlIUm9aU0JsYkdWdFpXNTBJR2x1SUhSb1pTQm1iR0YwZEdWdVpXUWdZWEp5WVhrdVhHNGdJQ0FnSUNvZ1FISmxkSFZ5YmlCN1RGTmxjVTV2WkdWOUlGUm9aU0JNVTJWeFRtOWtaU0IwWVhKblpYUnBibWNnZEdobElHVnNaVzFsYm5RZ1lYUWdhVzVrWlhndVhHNGdJQ0FnSUNvdlhHNGdJQ0FnWDJkbGRDQW9hVzVrWlhncElIdGNiaUFnSUNBZ0lDQWdhV1lnS0dsdVpHVjRJRHdnTUNCOGZDQnBibVJsZUNBK1BTQjBhR2x6TG14bGJtZDBhQ0FySURJcElIc2dMeThnS3pJNklHSnZkVzVrWVhKcFpYTmNiaUFnSUNBZ0lDQWdJQ0FnSUhSb2NtOTNJRzVsZHlCRmVFOTFkRTltUW05MWJtUnpLR2x1WkdWNExDQjBhR2x6TG14bGJtZDBhQ0FySURJcE8xeHVJQ0FnSUNBZ0lDQjlPMXh1SUNBZ0lDQWdJQ0JjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJSFJvYVhNdWNtOXZkQzVuWlhRb2FXNWtaWGdwTzF4dUlDQWdJSDA3WEc1Y2JpQWdJQ0F2S2lwY2JpQWdJQ0FnS2lCSmJuTmxjblFnWVNCMllXeDFaU0JoZENCMGFHVWdkR0Z5WjJWMFpXUWdhVzVrWlhndVhHNGdJQ0FnSUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I5SUdWc1pXMWxiblFnVkdobElHVnNaVzFsYm5RZ2RHOGdhVzV6WlhKMExDQmxMbWN1SUdFZ1kyaGhjbUZqZEdWeUlHbG1JSFJvWlZ4dUlDQWdJQ0FxSUhObGNYVmxibU5sSUdseklHRWdjM1J5YVc1bkxseHVJQ0FnSUNBcUlFQndZWEpoYlNCN1RuVnRZbVZ5ZlNCcGJtUmxlQ0JVYUdVZ2NHOXphWFJwYjI0Z2FXNGdkR2hsSUdGeWNtRjVMbHh1SUNBZ0lDQXFJRUJ5WlhSMWNtNGdlMDlpYW1WamRIMGdlMTlsT2lCbGJHVnRaVzUwSUc5bUlFOWlhbVZqZENCMGVYQmxMQ0JmYVRvZ1NXUmxiblJwWm1sbGNuMWNiaUFnSUNBZ0tpOWNiaUFnSUNCcGJuTmxjblFnS0dWc1pXMWxiblFzSUdsdVpHVjRLU0I3WEc0Z0lDQWdJQ0FnSUdOdmJuTjBJSEJsYVNBOUlIUm9hWE11WDJkbGRDaHBibVJsZUNrc0lDOHZJQ014WVNCd2NtVjJhVzkxY3lCaWIzVnVaRnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQnhaV2tnUFNCMGFHbHpMbDluWlhRb2FXNWtaWGdyTVNrN0lDOHZJQ014WWlCdVpYaDBJR0p2ZFc1a1hHNWNiaUFnSUNBZ0lDQWdJQzh2SUNNeVlTQnBibU55WlcxbGJuUnBibWNnZEdobElHeHZZMkZzSUdOdmRXNTBaWEpjYmlBZ0lDQWdJQ0FnZEdocGN5NWZZeUFyUFNBeE8xeHVJQ0FnSUNBZ0lDQXZMeUFqTW1JZ1oyVnVaWEpoZEdsdVp5QjBhR1VnYVdRZ2FXNWlaWFIzWldWdUlIUm9aU0JpYjNWdVpITmNiaUFnSUNBZ0lDQWdZMjl1YzNRZ2FXUWdQU0IwYUdsekxtRnNiRzlqS0hCbGFTd2djV1ZwS1R0Y2JseHVJQ0FnSUNBZ0lDQXZMeUFqTXlCaFpHUWdhWFFnZEc4Z2RHaGxJSE4wY25WamRIVnlaU0JoYm1RZ2NtVjBkWEp1SUhaaGJIVmxYRzRnSUNBZ0lDQWdJR052Ym5OMElIQmhhWElnUFNCN1pXeGxiVG9nWld4bGJXVnVkQ3dnYVdRNklHbGtmVHRjYmlBZ0lDQWdJQ0FnZEdocGN5NWhjSEJzZVVsdWMyVnlkQ2h3WVdseUtUdGNiaUFnSUNBZ0lDQWdjbVYwZFhKdUlIQmhhWEk3WEc0Z0lDQWdmVHRjYmx4dUlDQWdJQzhxS2x4dUlDQWdJQ0FxSUVSbGJHVjBaU0IwYUdVZ1pXeGxiV1Z1ZENCaGRDQjBhR1VnYVc1a1pYZ3VYRzRnSUNBZ0lDb2dRSEJoY21GdElIdE9kVzFpWlhKOUlHbHVaR1Y0SUZSb1pTQnBibVJsZUNCdlppQjBhR1VnWld4bGJXVnVkQ0IwYnlCa1pXeGxkR1VnYVc0Z2RHaGxJR0Z5Y21GNUxseHVJQ0FnSUNBcUlFQnlaWFIxY200Z2UwbGtaVzUwYVdacFpYSjlJRlJvWlNCcFpHVnVkR2xtYVdWeUlHOW1JSFJvWlNCbGJHVnRaVzUwSUdGMElIUm9aU0JwYm1SbGVDNWNiaUFnSUNBZ0tpOWNiaUFnSUNCeVpXMXZkbVVnS0dsdVpHVjRLU0I3WEc0Z0lDQWdJQ0FnSUdOdmJuTjBJR1ZwSUQwZ2RHaHBjeTVmWjJWMEtHbHVaR1Y0SUNzZ01TazdYRzRnSUNBZ0lDQWdJR052Ym5OMElHa2dQU0J1WlhjZ1NXUmxiblJwWm1sbGNpaDBhR2x6TGw5aVlYTmxLUzVtY205dFRtOWtaU2hsYVNrN1hHNGdJQ0FnSUNBZ0lIUm9hWE11WVhCd2JIbFNaVzF2ZG1Vb1pXa3BPMXh1SUNBZ0lDQWdJQ0J5WlhSMWNtNGdhVHRjYmlBZ0lDQjlPMXh1WEc1Y2JpQWdJQ0F2S2lwY2JpQWdJQ0FnS2lCSFpXNWxjbUYwWlNCMGFHVWdaR2xuYVhRZ2NHRnlkQ0J2WmlCMGFHVWdhV1JsYm5ScFptbGxjbk1nSUdKbGRIZGxaVzRnY0NCaGJtUWdjUzVjYmlBZ0lDQWdLaUJBY0dGeVlXMGdlMHhUWlhGT2IyUmxmU0J3SUZSb1pTQmthV2RwZENCd1lYSjBJRzltSUhSb1pTQndjbVYyYVc5MWN5QnBaR1Z1ZEdsbWFXVnlMbHh1SUNBZ0lDQXFJRUJ3WVhKaGJTQjdURk5sY1U1dlpHVjlJSEVnVkdobElHUnBaMmwwSUhCaGNuUWdiMllnZEdobElHNWxlSFFnYVdSbGJuUnBabWxsY2k1Y2JpQWdJQ0FnS2lCQWNtVjBkWEp1SUh0SlpHVnVkR2xtYVdWeWZTQlVhR1VnYm1WM0lHbGtaVzUwYVdacFpYSWdiRzlqWVhSbFpDQmlaWFIzWldWdUlIQWdZVzVrSUhFdVhHNGdJQ0FnSUNvdlhHNGdJQ0FnWVd4c2IyTWdLSEFzSUhFcElIdGNiaUFnSUNBZ0lDQWdiR1YwSUdsdWRHVnlkbUZzSUQwZ01Dd2diR1YyWld3Z1BTQXdPMXh1SUNBZ0lDQWdJQ0F2THlBak1TQndjbTlqWlhOeklIUm9aU0JzWlhabGJDQnZaaUIwYUdVZ2JtVjNJR2xrWlc1MGFXWnBaWEpjYmlBZ0lDQWdJQ0FnZDJocGJHVWdLR2x1ZEdWeWRtRnNJRHc5SURBcElIc2dMeThnYm04Z2NtOXZiU0JtYjNJZ2FXNXpaWEowYVc5dVhHNGdJQ0FnSUNBZ0lDQWdJQ0JwYm5SbGNuWmhiQ0E5SUhSb2FYTXVYMkpoYzJVdVoyVjBTVzUwWlhKMllXd29iR1YyWld3c0lIQXNJSEVwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdLeXRzWlhabGJEdGNiaUFnSUNBZ0lDQWdmVHRjYmlBZ0lDQWdJQ0FnYkdWMlpXd2dMVDBnTVR0Y2JpQWdJQ0FnSUNBZ2FXWWdLSFJvYVhNdVgyaGhjMmdvYkdWMlpXd3BJRDA5UFNBd0tTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCeVpYUjFjbTRnZEdocGN5NWZjM1J5WVhSbFoza3VZbEJzZFhNb2NDd2djU3hjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnNaWFpsYkN3Z2FXNTBaWEoyWVd3c1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZEdocGN5NWZjeXdnZEdocGN5NWZZeWs3WEc0Z0lDQWdJQ0FnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z2RHaHBjeTVmYzNSeVlYUmxaM2t1WWsxcGJuVnpLSEFzSUhFc1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUd4bGRtVnNMQ0JwYm5SbGNuWmhiQ3hjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkR2hwY3k1ZmN5d2dkR2hwY3k1Zll5azdYRzRnSUNBZ0lDQWdJSDA3WEc0Z0lDQWdmVHRjYmlBZ0lDQmNiaUFnSUNCY2JpQWdJQ0F2S2lwY2JpQWdJQ0FnS2lCSmJuTmxjblFnWVc0Z1pXeGxiV1Z1ZENCamNtVmhkR1ZrSUdaeWIyMGdZU0J5WlcxdmRHVWdjMmwwWlNCcGJuUnZJSFJvWlNCaGNuSmhlUzVjYmlBZ0lDQWdLaUJBY0dGeVlXMGdlMDlpYW1WamRIMGdjR0ZwY2lCUVlXbHlJR052Ym5SaGFXNXBibWNnZEdobElHbGtaVzUwYVdacFpYSWdZVzVrSUhSb1pTQmxiR1Z0Wlc1MElIUnZYRzRnSUNBZ0lDb2dhVzV6WlhKMElHbHVJSFJvWlNCa1lYUmhJSE4wY25WamRIVnlaUzVjYmlBZ0lDQWdLaUJBY0dGeVlXMGdlMGxrWlc1MGFXWnBaWEo4VEZObGNVNXZaR1Y5SUhCaGFYSXVhV1FnVkdobElHbGtaVzUwYVdacFpYSWdiMllnZEdobElHVnNaVzFsYm5RdVhHNGdJQ0FnSUNvZ1FIQmhjbUZ0SUh0UFltcGxZM1I5SUhCaGFYSXVaV3hsYlNCVWFHVWdaV3hsYldWdWRDQjBieUJwYm5ObGNuUXVYRzRnSUNBZ0lDb2dRSEJoY21GdElIdGliMjlzWldGdWZTQmJibTlKYm1SbGVDQTlJSFJ5ZFdWZElGZG9aWFJvWlhJZ2IzSWdibTkwSUdsMElITm9iM1ZzWkNCeVpYUjFjbTRnZEdobFhHNGdJQ0FnSUNvZ2FXNWtaWGdnYjJZZ2RHaGxJR2x1YzJWeWRDNWNiaUFnSUNBZ0tpQkFjbVYwZFhKdUlIdE9kVzFpWlhKOFFtOXZiR1ZoYm4wZ1ZHaGxJR2x1WkdWNElHOW1JSFJvWlNCdVpYZHNlU0JwYm5ObGNuUmxaQ0JsYkdWdFpXNTBJR2x1SUhSb1pWeHVJQ0FnSUNBcUlHRnljbUY1TENCcFppQmhjMnRsWkM0Z0xURWdhV1lnZEdobElHVnNaVzFsYm5RZ1lXeHlaV0ZrZVNCbGVHbHpkSE1nWVc1a0lHaGhjeUJ1YjNRZ1ltVmxiaUJoWkdSbFpDNWNiaUFnSUNBZ0tpQkpaaUJ1YjBsdVpHVjRMQ0J5WlhSMWNtNXpJSFJ5ZFdVZ2FXWWdkR2hsSUdWc1pXMWxiblFnYUdGeklHSmxaVzRnWVdSa1pXUXNJR1poYkhObElHOTBhR1Z5ZDJselpTNWNiaUFnSUNBZ0tpOWNiaUFnSUNCaGNIQnNlVWx1YzJWeWRDQW9jR0ZwY2l3Z2JtOUpibVJsZUNBOUlIUnlkV1VwSUh0Y2JpQWdJQ0FnSUNBZ2JHVjBJRzV2WkdVc0lISmxjM1ZzZEN3Z2FUdGNiaUFnSUNBZ0lDQWdMeThnSXpBZ1kyRnpkQ0JtY205dElIUm9aU0J3Y205d1pYSWdkSGx3WlZ4dUlDQWdJQ0FnSUNBdkx5QWpNRUVnZEdobElHbGtaVzUwYVdacFpYSWdhWE1nWVc0Z1NXUmxiblJwWm1sbGNseHVJQ0FnSUNBZ0lDQnBJRDBnY0dGcGNpNXBaRHRjYmlBZ0lDQWdJQ0FnYm05a1pTQTlJQ0JwSUNZbUlHa3VYMlFnSmlZZ2FTNWZjeUFtSmlCcExsOWpJQ1ltWEc0Z0lDQWdJQ0FnSUNBZ0lDQW9ibVYzSUVsa1pXNTBhV1pwWlhJb2RHaHBjeTVmWW1GelpTd2dhUzVmWkN3Z2FTNWZjeXdnYVM1Zll5a3VkRzlPYjJSbEtIQmhhWEl1Wld4bGJTa3BPMXh1SUNBZ0lDQWdJQ0F2THlBak1FSWdkR2hsSUdsa1pXNTBhV1pwWlhJZ2FYTWdZU0JNVTJWeFRtOWtaVnh1SUNBZ0lDQWdJQ0J1YjJSbElEMGdLR2tnSmlZZ2FTNTBJQ1ltSUdrdVkyaHBiR1J5Wlc0Z0ppWWdURk5sY1U1dlpHVXVabkp2YlVwVFQwNG9hU2twSUh4OElHNXZaR1U3WEc0Z0lDQWdJQ0FnSUM4dklDTXhJR2x1ZEdWbmNtRjBaWE1nZEdobElHNWxkeUJsYkdWdFpXNTBJSFJ2SUhSb1pTQmtZWFJoSUhOMGNuVmpkSFZ5WlZ4dUlDQWdJQ0FnSUNCeVpYTjFiSFFnUFNCMGFHbHpMbkp2YjNRdVlXUmtLRzV2WkdVcE8xeHVJQ0FnSUNBZ0lDQXZMeUFqTWlCcFppQjBhR1VnWld4bGJXVnVkQ0JoY3lCaVpXVnVJR0ZrWkdWa1hHNGdJQ0FnSUNBZ0lHbG1JQ2h1YjBsdVpHVjRLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z2NtVnpkV3gwTzF4dUlDQWdJQ0FnSUNCOUlHVnNjMlVnYVdZZ0tISmxjM1ZzZENrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJSFJvYVhNdWNtOXZkQzVwYm1SbGVFOW1LRzV2WkdVcE8xeHVJQ0FnSUNBZ0lDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnY21WMGRYSnVJQzB4TzF4dUlDQWdJQ0FnSUNCOU95QWdJQ0FnSUNBZ1hHNGdJQ0FnZlR0Y2JseHVJQ0FnSUM4cUtseHVJQ0FnSUNBcUlFUmxiR1YwWlNCMGFHVWdaV3hsYldWdWRDQjNhWFJvSUhSb1pTQjBZWEpuWlhSbFpDQnBaR1Z1ZEdsbWFXVnlMbHh1SUNBZ0lDQXFJRUJ3WVhKaGJTQjdTV1JsYm5ScFptbGxjbnhNVTJWeFRtOWtaWDBnYVNCVWFHVWdhV1JsYm5ScFptbGxjaUJ2WmlCMGFHVWdaV3hsYldWdWRDNWNiaUFnSUNBZ0tpQkFjbVYwZFhKdUlIdE9kVzFpWlhKOUlGUm9aU0JwYm1SbGVDQnZaaUIwYUdVZ1pXeGxiV1Z1ZENCbWNtVnphR3g1SUdSbGJHVjBaV1FzSUMweElHbG1JRzV2WEc0Z0lDQWdJQ29nY21WdGIzWmhiQzVjYmlBZ0lDQWdLaTljYmlBZ0lDQmhjSEJzZVZKbGJXOTJaU0FvYVNrZ2UxeHVJQ0FnSUNBZ0lDQnNaWFFnYm05a1pTd2djRzl6YVhScGIyNDdYRzRnSUNBZ0lDQWdJQzh2SUNNd0lHTmhjM1FnWm5KdmJTQjBhR1VnY0hKdmNHVnlJSFI1Y0dWY2JpQWdJQ0FnSUNBZ2JtOWtaU0E5SUdrZ0ppWWdhUzVmWkNBbUppQnBMbDl6SUNZbUlHa3VYMk1nSmlaY2JpQWdJQ0FnSUNBZ0lDQWdJQ2h1WlhjZ1NXUmxiblJwWm1sbGNpaDBhR2x6TGw5aVlYTmxMQ0JwTGw5a0xDQnBMbDl6TENCcExsOWpLU2t1ZEc5T2IyUmxLRzUxYkd3cE8xeHVJQ0FnSUNBZ0lDQXZMeUFqTUVJZ2RHaGxJR2xrWlc1MGFXWnBaWElnYVhNZ1lTQk1VMFZSVG05a1pWeHVJQ0FnSUNBZ0lDQnViMlJsSUQwZ0tHa2dKaVlnYVM1MElDWW1JR2t1WTJocGJHUnlaVzRnSmlZZ1RGTmxjVTV2WkdVdVpuSnZiVXBUVDA0b2FTa3BJSHg4SUc1dlpHVTdYRzRnSUNBZ0lDQWdJQzh2SUNNeElHZGxkQ0IwYUdVZ2FXNWtaWGdnYjJZZ2RHaGxJR1ZzWlcxbGJuUWdkRzhnY21WdGIzWmxYRzRnSUNBZ0lDQWdJSEJ2YzJsMGFXOXVJRDBnZEdocGN5NXliMjkwTG1sdVpHVjRUMllvYm05a1pTazdYRzRnSUNBZ0lDQWdJR2xtSUNod2IzTnBkR2x2YmlBaFBUMGdMVEVwZTF4dUlDQWdJQ0FnSUNBZ0lDQWdMeThnSXpJZ2FXWWdhWFFnWlhocGMzUnpJSEpsYlc5MlpTQnBkRnh1SUNBZ0lDQWdJQ0FnSUNBZ2RHaHBjeTV5YjI5MExtUmxiQ2h1YjJSbEtUdGNiaUFnSUNBZ0lDQWdmVHRjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJSEJ2YzJsMGFXOXVPMXh1SUNBZ0lIMDdYRzVjYmlBZ0lDQXZLaXBjYmlBZ0lDQWdLaUJEWVhOMElIUm9aU0JLVTA5T0lHOWlhbVZqZENCcGJuUnZJR0VnY0hKdmNHVnlJRXhUWlhGVWNtVmxMbHh1SUNBZ0lDQXFJRUJ3WVhKaGJTQjdUMkpxWldOMGZTQnZZbXBsWTNRZ2RHaGxJRXBUVDA0Z2IySnFaV04wSUhSdklHTmhjM1F1WEc0Z0lDQWdJQ29nUUhKbGRIVnliaUI3VEZObGNWUnlaV1Y5SUVFZ2MyVnNaaUJ5WldabGNtVnVZMlV1WEc0Z0lDQWdJQ292WEc0Z0lDQWdabkp2YlVwVFQwNGdLRzlpYW1WamRDa2dlMXh1SUNBZ0lDQWdJQ0F2THlBak1TQmpiM0I1SUhSb1pTQnpiM1Z5WTJVc0lHTnZkVzUwWlhJc0lHRnVaQ0JzWlc1bmRHZ2diMllnZEdobElHOWlhbVZqZEZ4dUlDQWdJQ0FnSUNCMGFHbHpMbDl6SUQwZ2IySnFaV04wTGw5ek8xeHVJQ0FnSUNBZ0lDQjBhR2x6TGw5aklEMGdiMkpxWldOMExsOWpPMXh1SUNBZ0lDQWdJQ0IwYUdsekxtOXdkR2x2Ym5NZ1BTQnZZbXBsWTNRdWIzQjBhVzl1Y3p0Y2JseHVJQ0FnSUNBZ0lDQjBhR2x6TGw5aVlYTmxJRDBnYm1WM0lFSmhjMlVvZEdocGN5NXZjSFJwYjI1ekxtSmhjMlVwTzF4dUlDQWdJQ0FnSUNCMGFHbHpMbDlpYjNWdVpHRnllU0E5SUc1bGR5QlRkSEpoZEdWbmVTaDBhR2x6TGw5aVlYTmxMQ0IwYUdsekxtOXdkR2x2Ym5NdVltOTFibVJoY25rcE8xeHVJQ0FnSUNBZ0lDQmNiaUFnSUNBZ0lDQWdMeThnSXpJZ1pHVndkR2dnWm1seWMzUWdZV1JrYVc1blhHNGdJQ0FnSUNBZ0lHTnZibk4wSUdSbGNIUm9SbWx5YzNRZ1BTQW9ZM1Z5Y21WdWRFNXZaR1VzSUdOMWNuSmxiblJRWVhSb0tTQTlQaUI3WEc0Z0lDQWdJQ0FnSUNBZ0lDQmpiMjV6ZENCMGNtbHdiR1VnUFNCdVpYY2dWSEpwY0d4bEtHTjFjbkpsYm5ST2IyUmxMblF1Y0N4Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdZM1Z5Y21WdWRFNXZaR1V1ZEM1ekxGeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JqZFhKeVpXNTBUbTlrWlM1MExtTXBPMXh1SUNBZ0lDQWdJQ0FnSUNBZ1kzVnljbVZ1ZEZCaGRHZ3VjSFZ6YUNoMGNtbHdiR1VwT3lBdkx5QnpkR0ZqYTF4dUlDQWdJQ0FnSUNBZ0lDQWdhV1lnS0dOMWNuSmxiblJPYjJSbExtVWdJVDA5SUc1MWJHd3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IwYUdsekxuSnZiM1F1WVdSa0tHNWxkeUJNVTJWeFRtOWtaU2hqZFhKeVpXNTBVR0YwYUM1emJHbGpaU2dwTENCamRYSnlaVzUwVG05a1pTNWxLU2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjlPMXh1SUNBZ0lDQWdJQ0FnSUNBZ1ptOXlJQ2hzWlhRZ2FTQTlJREE3SUdrZ1BDQmpkWEp5Wlc1MFRtOWtaUzVqYUdsc1pISmxiaTVzWlc1bmRHZzdJQ3NyYVNrZ2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHUmxjSFJvUm1seWMzUW9ZM1Z5Y21WdWRFNXZaR1V1WTJocGJHUnlaVzViYVYwc0lHTjFjbkpsYm5SUVlYUm9LVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMDdYRzRnSUNBZ0lDQWdJQ0FnSUNCamRYSnlaVzUwVUdGMGFDNXdiM0FvS1RzZ0x5OGdkVzV6ZEdGamExeHVJQ0FnSUNBZ0lDQjlPMXh1SUNBZ0lDQWdJQ0JtYjNJZ0tHeGxkQ0JwSUQwZ01Ec2dhU0E4SUc5aWFtVmpkQzV5YjI5MExtTm9hV3hrY21WdUxteGxibWQwYURzZ0t5dHBLWHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHUmxjSFJvUm1seWMzUW9iMkpxWldOMExuSnZiM1F1WTJocGJHUnlaVzViYVYwc0lGdGRLVHRjYmlBZ0lDQWdJQ0FnZlR0Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUhSb2FYTTdYRzRnSUNBZ2ZUc2dJQ0FnWEc0Z0lDQWdYRzU5TzF4dVhHNXRiMlIxYkdVdVpYaHdiM0owY3lBOUlFeFRaWEZVY21WbE8xeHVJbDE5Il19
