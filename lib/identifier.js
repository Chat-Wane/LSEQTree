var BI = require('BigInt');
var Base = require('./base.js').getInstance();
var Triple = require('./triple.js');

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

/*!
 * set the d,s,c values according to the path in argument
 * \param path the path in the tree structure
 */
Identifier.prototype.fromPath = function(path){
    this._d = BI.int2bigInt(0,Base.getSumBit(path.length -1));
    for (var i=0; i<path.length; ++i){
	// #1 copy the site id
	this._s.push(path[i].s);
	// #2 copy the counter
	this._c.push(path[i].c);
	// #3 copy the digit
	BI.addInt(this._d, path[i].p);
	if (i!=path.length-1){
	    BI.leftShift_(this._d, Base.getBitBase(i));
	};
    };
};

/*!
 * \brief convert the identifier into a path
 */
Identifier.prototype.toPath = function(){
    var resultPath = [];
    var dBitLength = Base.getSumBit(this._c.length -1);
    
    // #1 deconstruct the digit 
    for (var i = 0; i < this._c.length; ++i){
	// #1 truncate mine
	var mine = BI.dup(this._d);
	// #1a shift right to erase the tail of the path
        BI.rightShift_(mine, dBitLength - Base.getSumBit(i));
	// #1b copy value in the result
	resultPath.push(new Triple(BI.modInt(mine,
					     Math.pow(2,Base.getBitBase(i))),
				   this._s[i],
				   this._c[i]));
    };
    return resultPath;
};

/*!
 * \brief compare two identifiers
 * \param o the other identifier
 * \return -1 if this is lower, 0 if they are equal, 1 if this is greater
 */
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
