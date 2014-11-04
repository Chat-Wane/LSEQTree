var BI = require('BigInt');
var Base = require('./base.js').getInstance();
var ID = require('./identifier.js');

/*!
 * \class Strategy
 * \brief Enumerate the available sub-allocation strategies. The signature of
 * these functions is f(Id, Id, N+, N+, N, N): Id.
 * \param boundary the value used as the default maximum spacing between ids
 */
function Strategy(boundary){
    var DEFAULT_BOUNDARY = 10;
    this._boundary = boundary || DEFAULT_BOUNDARY;
};

/*!
 * \brief Choose an id starting from previous bound and adding random number
 * \param p the previous identifier
 * \param q the next identifier
 * \param level the number of concatenation composing the new identifier
 * \param interval the interval between p and q
 * \param s the source that creates the new identifier
 * \param c the counter of that source
 */
Strategy.prototype.bPlus = function (p, q, level, interval, s, c){
    // #0 process the interval for random
    var step = Math.min(this._boundary, interval);
    // #1 copy the previous identifier
    var digit = BI.int2bigInt(0,Base.getSumBit(level));
    for (var i = 0; i<=level;++i){
	var value = 0;
	if (p!==null){ value = p.t.p; };
	BI.addInt_(digit,p.t.p);
	if (i!=level){ BI.leftShift(digit,Base.getBitBase(i+1)); };
	if (p.children.length!=0){ p = p.children[0]; } else { p = null; };
    };
    // #2 create a digit for an identifier by adding a random value
    // #2a Digit
    BI.addInt_(oldD, Math.floor(Math.random()*step)+1);
    // #2b Source & counter
    var id = getSC(oldD, p, q, level, s, c);
    return id;
};


Strategy.prototype.bMinus = function (p, q, level, interval, s, c){
    // #0 process the interval for random
    var step = Math.min(this._boundary, interval);

    // #1 copy next, if previous is greater, copy maxValue @ depth
    var digit = BI.int2bigInt(0,Base.getSumBit(level));
    for (var i = 0; i<=level;++i){
	var prevValue = 0;
	if (p !== null){ prevValue = p.t.p; }
	var value = 0;
	if (q !== null){
	    value = q.t.p;
	} else {
	    value = Math.pow(2,this.getBitBase(i))-1;
	};
	if (prevValue > value){
	    value = Math.pow(2,this.getBitBase(i))-1;
	};
	BI.addInt_(digit, value);
	if (i!=level){ BI.leftShift(digit,Base.getBitBase(i+1)); };
	if (q.children.length!=0){ q = q.children[0]; } else { q = null; };
	if (p.children.length!=0){ p = p.children[0]; } else { p = null; };
    };
    // #3 create a digit for an identifier by subing a random value
    // #3a Digit
    BI.addInt_(next, -Math.floor(Math.random()*step)+1 );
    
    // #3b Source & counter
    var id = getSC(next, p, q, level, s, c);
    return id;
};

function getSC(d, p, q, level, s, c){
    var sources = [];
    var counters = [];
    
    var bitLength = Base.getSumBit(level);
    for (var i = 0; i <= level; ++i) {
	// #1 truncate the digit of the new id to get the i^th value
	var sumBit = Base.getSumBit(i);
	var mask = BI.int2bigInt(Math.pow(2,Base.getBitBase(i)),
				 Base.getBitBase(i)+1);

	var tempD = BI.dup(d);
	BI.rightShift_(tempD, bitLength - sumBit);
	var valD = BI.mod(tempD, mask);

	var copied = false;
	// #2 truncate previous value the same way
	if (i < p._c.length){
	    var valP; // pow(
	    if (Base.getSumBit(p._c.length-1) < sumBit){
		valP = BI.int2bigInt(0,1);
	    } else {
		var tempP = BI.dup(p._d);
		BI.rightShift_(tempP, Base.getSumBit(p._c.length-1) - sumBit);
		valP = BI.mod(tempP, mask);
	    };
	    
	    if (BI.equals(valD,valP)) {
		// #2a copy p source & counter
		sources[i] = p._s[i];
		counters[i] = p._c[i];
		copied = true; 
	    }
	};
	
	if (!copied && i < q._c.length){
	    var valQ;
	    if (Base.getSumBit(q._c.length-1) < sumBit){
		valQ = BI.int2bigInt(0,1);
	    } else {
		var tempQ = BI.dup(q._d);
		BI.rightShift_(tempQ, Base.getSumBit(q._c.length-1)-sumBit);
		valQ = BI.mod(tempQ, mask);
	    };
	    if (BI.equals(valD,valQ)) {
		// #2b copy q site & counter
		sources[i] = q._s[i];
		counters[i] = q._c[i];
		copied = true;
	    };
	};
	if (!copied){ // 2c copy our source & counter
	    sources[i] = s;
	    counters[i] = c;
	};	
    };
    return new ID(d, sources, counters);
};

Strategy.instance = null;

Strategy.getInstance = function(args){
    if (this.instance == null){
	this.instance = new Strategy(args);
    };
    return this.instance;
};

module.exports = Strategy;
