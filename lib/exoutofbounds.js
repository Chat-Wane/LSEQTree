'use strict';

/**
 * Thrown when the index is higher than the current length-1 of the array, or
 * lower than 0.
 */
class ExOutOfBounds {

    /** 
     * @param {Number} index The index out of bounds.
     * @param {Number} size The size of the array.
     */
    constructor (index, size) {
        this.index = index;
        this.size = size;
    };
};

module.exports = ExOutOfBounds;
