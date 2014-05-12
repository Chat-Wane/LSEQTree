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
    this._boundary =  BI.int2bigInt(boundary , Math.log(boundary));
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
    var step;
    if (BI.greater(interval, this._boundary)){
	step = this._boundary;
    } else {
	step = interval;
    };
    // #1 Truncate or extends p
    var diffBitCount = Base.getSumBit(p._c.length-1) - Base.getSumBit(level);
    var oldD = BI.dup(p._d);
    if (diffBitCount < 0){
	oldD = BI.int2bigInt(0,Base.getSumBit(level));
	BI.copy_(oldD, p._d);
	BI.leftShift_(oldD, -diffBitCount);
    } else {
	BI.rightShift_(oldD, diffBitCount);
    }
    // #2 create a digit for an identifier by adding a random value
    var randomInt = Math.floor(Math.random()* step[0] +1); // XXX
    // #2a Digit
    BI.addInt_(oldD, randomInt);
    // #2b Source & counter
    var id = getSC(oldD, p, q, level, s, c);
    return id;
};


Strategy.prototype.bMinus = function (p, q, level, interval, s, c){
    // #0 process the interval for random
    var step;
    if (BI.greater(interval, this._boundary)){
        step = this._boundary;
    } else {
        step = interval;
    };
    
    var prevBitLength = Base.getSumBit(p._c.length - 1);
    var nextBitLength = Base.getSumBit(q._c.length - 1);
    var bitBaseSum = Base.getSumBit(level);

    // #1 Truncate or extends p and q
    var prev
    if (bitBaseSum < prevBitLength){
	prev = BI.dup(p._d);
	BI.rightShift_(prev, prevBitLength - bitBaseSum);
    }else{
	prev = BI.int2bigInt(0,bitBaseSum);
	BI.copy_(prev,p._d);
	BI.leftShift_(prev, bitBaseSum - prevBitLength);
    };
    var next;
    if (bitBaseSum < nextBitLength){
	next = BI.dup(q._d);
	BI.rightShift_(next, nextBitLength - bitBaseSum);
    }else{
	next = BI.int2bigInt(0,bitBaseSum);
	BI.copy_(next,q._d);
	// handle specific case where p._d = q._d
	if((level==(p._c.length+1))&&(level==(q._c.length+1))&&
	   (BI.equals(p._d,q._d))){
	    BI.addInt_(next,1);
	};
	BI.leftShift_(next, bitBaseSum - nextBitLength);
    };
    
    // #2 Handling particular case of next < prev
    if (BI.greater(prev,next)){
	// #2a Look for the common root
        var i = 0;
        do{
            var sumBitI = Base.getSumBit(i);
            if (bitBaseSum >= sumBitI){
                ++i;
                var tempPrev = BI.dup(prev);
                var tempNext = BI.dup(next);
                BI.rightShift_(tempPrev, prevBitLength - sumBitI);
                BI.rightShift_(tempNext, nextBitLength - sumBitI);}
        }while(BI.equals(tempPrev,tempNext) && (bitBaseSum >= sumBitI));
	
        // #2b: add one
        BI.rightShift_(next, nextBitLength - Base.getSumBit(i - 2));
        BI.addInt_(next,1);
        nextBitLength = Base.getSumBit(i - 2);
        // #2c: append missing zeros
        BI.leftShift_(next, bitBaseSum - nextBitLength);
    };
    
    // #3 create a digit for an identifier by subing a random value
    var randomInt = Math.floor(Math.random()*step[0] +1); // XXX

    // #3a Digit
    BI.addInt_(next, -randomInt);
    
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
