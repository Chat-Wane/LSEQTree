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
    var copyP = p;
    var copyQ = q;
    
    // #0 process the interval for random
    var step = Math.min(this._boundary, interval);
    // #1 copy the previous identifier
    var digit = BI.int2bigInt(0,Base.getSumBit(level));
    for (var i = 0; i<=level;++i){
	var value = 0;
	if (p!==null){ value = p.t.p; };
	BI.addInt_(digit,value);
	if (i!=level){ BI.leftShift_(digit,Base.getBitBase(i+1)); };
	if (p!==null && p.children.length!=0){
	    p = p.children[0];
	} else {
	    p = null;
	};
    };
    // #2 create a digit for an identifier by adding a random value
    // #2a Digit
    BI.addInt_(digit, Math.floor(Math.random()*step+1));
    // #2b Source & counter
    return getSC(digit, copyP, copyQ, level, s, c);
};


Strategy.prototype.bMinus = function (p, q, level, interval, s, c){
    var copyP = p; var copyQ = q;
    // #0 process the interval for random
    var step = Math.min(this._boundary, interval);
    // #1 copy next, if previous is greater, copy maxValue @ depth
    var digit = BI.int2bigInt(0,Base.getSumBit(level));
    var pIsGreater = false;
    var commonRoot = true;
    for (var i = 0; i<=level;++i){
	var prevValue = 0; if (p !== null){ prevValue = p.t.p; }
	var nextValue = 0; if (q !== null){ nextValue = q.t.p; }
	if (commonRoot && prevValue != nextValue){
	    commonRoot = false;
	    pIsGreater = prevValue > nextValue;
	}
	if (pIsGreater){ nextValue = Math.pow(2,Base.getBitBase(i))-1; }
	BI.addInt_(digit, nextValue);
	if (i!=level){ BI.leftShift_(digit,Base.getBitBase(i+1)); }
	if (q!==null && q.children.length!=0){
	    q = q.children[0];
	} else {
	    q = null;
	};
	if (p!==null && p.children.length!=0){
	    p = p.children[0];
	} else {
	    p = null;
	};
    };
    // #3 create a digit for an identifier by subing a random value
    // #3a Digit
    if (pIsGreater){
	BI.addInt_(digit, -Math.floor(Math.random()*step) );
    } else {
	BI.addInt_(digit, -Math.floor(Math.random()*step)-1 );
    };
    
    // #3b Source & counter
    return getSC(digit, copyP, copyQ, level, s, c);
};

function getSC(d, p, q, level, s, c){
    var sources = [];
    var counters = [];

    var i = 0;
    var sumBit = Base.getSumBit(level);
    while (i<=level){
	var tempDigit = BI.dup(d);
	BI.rightShift_(tempDigit, sumBit - Base.getSumBit(i));
	var value = BI.modInt(tempDigit,Math.pow(2,Base.getBitBase(i)));
	sources[i]=s;
	counters[i]=c
	if (q!==null && q.t.p==value){ sources[i]=q.t.s; counters[i]=q.t.c};
	if (p!==null && p.t.p==value){ sources[i]=p.t.s; counters[i]=p.t.c};
	if (q!==null && q.children.length!=0){
	    q = q.children[0];
	} else {
	    q = null;
	};
	if (p!==null && p.children.length!=0){
	    p = p.children[0];
	} else {
	    p = null;
	};
	++i;
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
