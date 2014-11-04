var BI = require('BigInt');

/*!
 * \class Base
 * \brief provides basic function to bit manipulation
 * \param b the number of bits at level 0 of the dense space
 */
function Base(b){    
    var DEFAULT_BASE = 3;
    this._b = b || DEFAULT_BASE;
};

/*!
 * \brief Process the number of bits usage at a certain level of dense space
 * \param level the level in dense space, i.e., the number of concatenation
 */
Base.prototype.getBitBase = function(level){
    return this._b + level;
};

/*!
 * \brief Process the total number of bits usage to get to a certain level
 * \param level the level in dense space
 */
Base.prototype.getSumBit = function(level){
    var n = this.getBitBase(level);
    var m = this._b-1;
    return (n * (n + 1)) / 2 - (m * (m + 1) / 2);
};

/*!
 * \brief Process the discrete space available between p and q at a level
 * \param p the previous identifier including the position in the dense space
 * \param q the next identifier including the position in the dense space
 * \param level the targeted level in the dense space
 * \param return the number of possible digit at a certain level in dense space
 */
Base.prototype.getInterval = function(p, q, level){
    var prevBitLength = this.getSumBit(p._c.length -1);
    var nextBitLength = this.getSumBit(q._c.length -1);
    
    var bitBaseSum = this.getSumBit(level);
    
    // #1 truncate or expend
    // #1a process the previous digit
    // if (prevBitLength < bitBaseSum): Add 0
    // if (prevBitLength > bitBaseSum): truncate
    var prev = BI.dup(p._d);
    if (bitBaseSum < prevBitLength){
	BI.rightShift_(prev, prevBitLength - bitBaseSum);
    } else {
        prev = BI.int2bigInt(0,bitBaseSum);
        BI.copy_(prev, p._d);
	BI.leftShift_(prev, bitBaseSum - prevBitLength);
    };
    // #1b process the next digit
    var next = BI.dup(q._d);
    if (bitBaseSum < nextBitLength){
	BI.rightShift_(next, nextBitLength - bitBaseSum);
    } else {
	next = BI.int2bigInt(0,bitBaseSum);
        BI.copy_(next, q._d);
	if ((level==(p._c.length+1))&&(level==(q._c.length+1))&&
	    (BI.equals(p._d,q._d))){
	    BI.addInt_(next,1);
	};
	BI.leftShift_(next, bitBaseSum - nextBitLength);
    };
    
    // #2 process the particular case: q<p at the targeted level
    if (BI.greater(prev,next)) {
	// #2a: look for the common root
	var i = 0;
	do{
	    var sumBitI = this.getSumBit(i);
	    if (bitBaseSum >= sumBitI){
		++i;
		var tempPrev = BI.dup(prev);
		var tempNext = BI.dup(next);
		BI.rightShift_(tempPrev, prevBitLength - sumBitI);
		BI.rightShift_(tempNext, nextBitLength - sumBitI);}
	}while(BI.equals(tempPrev,tempNext) && (bitBaseSum >= sumBitI));
	
	// #2b: add one
	BI.rightShift_(next, nextBitLength - this.getSumBit(i - 2));
	BI.addInt_(next,1);
	nextBitLength = this.getSumBit(i-2);
	// #2c: append missing zeros
	BI.leftShift_(next, bitBaseSum - nextBitLength);
    };
    BI.sub_(next,prev); // next - prev - 1
    BI.addInt_(next,-1);

    return next;
};

/*!
  \brief process the interval between two LSEQNode
  \param p the previous LSEQNode
  \param q the next LSEQNode
  \param level the depth of the tree to process
  \return an integer which is the interval between the two node at the depth
*/
Base.prototype.getIntervalLSEQNode = function(p, q, level){
    var sum = 0;
    var i = 0; 
    while (i<=level){	
	var prevValue = 0;
	if (p !== null){ prevValue = p.t.p; }
	var nextValue = 0;
	if (q !== null) {
	    nextValue = q.t.p;
	} else {
	    nextValue = Math.pow(2,this.getBitBase(i))-1;
	};
	if (!(prevValue+1>=nextValue)){
	    sum += nextValue - prevValue - 1;
	} else if (prevValue > nextValue) {
	    sum += Math.pow(2,this.getBitBase(i)) - prevValue - 1;
	}
	if (i!=level){
	    sum *= Math.pow(2,this.getBitBase(i+1));
	};

	if (p!==null && p.children.length!=0){p = p.children[0];}else{p=null};
	if (q!==null && q.children.length!=0){q = q.children[0];}else{q=null};
	++i;
    }
    return sum;
};

Base.instance = null;

Base.getInstance = function(args){
    if (this.instance === null){
	this.instance = new Base(args)
    };
    return this.instance;
};

module.exports = Base;
