var BI = require('BigInt');
var Base = require('./base.js')();
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
    var copyP = p, copyQ = q,
        step = Math.min(this._boundary, interval), //#0 the min interval
        digit = BI.int2bigInt(0,Base.getSumBit(level)),
        value;
    
    // #1 copy the previous identifier
    for (var i = 0; i<=level;++i){
	      value = 0;
        if (p!==null){ value = p.t.p; };
        BI.addInt_(digit,value);
        if (i!==level){ BI.leftShift_(digit,Base.getBitBase(i+1)); };
        if (p!==null && p.children.length!==0){
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


/*!
 * \brief Choose an id starting from next bound and substract a random number
 * \param p the previous identifier
 * \param q the next identifier
 * \param level the number of concatenation composing the new identifier
 * \param interval the interval between p and q
 * \param s the source that creates the new identifier
 * \param c the counter of that source
 */
Strategy.prototype.bMinus = function (p, q, level, interval, s, c){
    var copyP = p, copyQ = q,
        step = Math.min(this._boundary, interval), // #0 process min interval
        digit = BI.int2bigInt(0,Base.getSumBit(level)),
        pIsGreater = false, commonRoot = true,
        prevValue, nextValue;
    
    // #1 copy next, if previous is greater, copy maxValue @ depth
    for (var i = 0; i<=level;++i){
        prevValue = 0; if (p !== null){ prevValue = p.t.p; }
        nextValue = 0; if (q !== null){ nextValue = q.t.p; }
        if (commonRoot && prevValue !== nextValue){
            commonRoot = false;
            pIsGreater = prevValue > nextValue;
        }
        if (pIsGreater){ nextValue = Math.pow(2,Base.getBitBase(i))-1; }
        BI.addInt_(digit, nextValue);
        if (i!==level){ BI.leftShift_(digit,Base.getBitBase(i+1)); }
        if (q!==null && q.children.length!==0){
            q = q.children[0];
        } else {
            q = null;
        };
        if (p!==null && p.children.length!==0){
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

/*!
 * \brief copies the appropriates source and counter from the adjacent 
 * identifiers at the insertion position.
 * \param d the digit part of the new identifier
 * \param p the previous identifier
 * \param q the next identifier
 * \param level the size of the new identifier
 * \param s the local site identifier 
 * \param c the local monotonic counter
 */
function getSC(d, p, q, level, s, c){
    var sources = [], counters = [],
        i = 0,
        sumBit = Base.getSumBit(level),
        tempDigit, value;
    
    while (i<=level){
        tempDigit = BI.dup(d);
        BI.rightShift_(tempDigit, sumBit - Base.getSumBit(i));
        value = BI.modInt(tempDigit,Math.pow(2,Base.getBitBase(i)));
        sources[i]=s;
        counters[i]=c
        if (q!==null && q.t.p===value){ sources[i]=q.t.s; counters[i]=q.t.c};
        if (p!==null && p.t.p===value){ sources[i]=p.t.s; counters[i]=p.t.c};
        if (q!==null && q.children.length!==0){
            q = q.children[0];
        } else {
            q = null;
        };
        if (p!==null && p.children.length!==0){
            p = p.children[0];
        } else {
            p = null;
        };
        ++i;
    };
    
    return new ID(d, sources, counters);
};

Strategy.instance = null;

module.exports = function(args){
    if (args){
        Strategy.instance = new Strategy(args);
    } else {
        if (Strategy.instance === null){
            Strategy.instance = new Strategy();
        };
    };
    return Strategy.instance;
};
