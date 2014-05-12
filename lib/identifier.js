var BI = require('BigInt');
var Base = require('./base.js').getInstance();

/*!
 * \class Identifier
 * \brief Unique and immutable identifier composed of digit, sources, counters
 * \param d the digit (position in dense space)
 * \param s the list of sources
 * \param c the list of counters
 */
function Identifier(d, s, c){
    this._d = d;
    this._s = s;
    this._c = c;
};

Identifier.prototype.compare = function(o){
    var dBitLength = Base.getSumBit(this._c.length - 1);
    var odBitLength = Base.getSumBit(o._c.length - 1);
    var comparing = true;

    var comp = 0;
    var i = 0;
    // #1 Compare the list of <d,s,c>
    while (comparing && i < Math.min(this._c.length, o._c.length) ) {
	// can stop before the end of for loop wiz return
	var sum = Base.getSumBit(i);
	// #1a truncate mine
	var mine = BI.dup(this._d);
	BI.rightShift_(mine, dBitLength - sum);
	// #1b truncate other
	var other = BI.dup(o._d);
	BI.rightShift_(other, odBitLength - sum);
	// #2 Compare triples
	if (!BI.equals(mine,other)) {  // #2a digit
	    if (BI.greater(mine,other)){
		comp = 1;
	    } else {
		comp = -1;
	    };
	    comparing = false;
	} else {
	    comp = this._s[i] - o._s[i]; // #2b source
	    if (comp != 0) {
		comparing = false;
	    } else {
		comp = this._c[i] - o._c[i]; // 2c clock
		if (comp != 0) {
		    comparing = false;
		};
	    };
	};
	++i;
    };
    
    if (comp==0){
	comp = this._c.length - o._c.length; // #3 compare list size
    };
    return comp;

};


module.exports = Identifier;
