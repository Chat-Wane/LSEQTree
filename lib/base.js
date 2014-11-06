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
  \brief process the interval between two LSEQNode
  \param p the previous LSEQNode
  \param q the next LSEQNode
  \param level the depth of the tree to process
  \return an integer which is the interval between the two node at the depth
*/
Base.prototype.getInterval = function(p, q, level){
    var sum = 0;
    var i = 0;
    var pIsGreater = false;
    var commonRoot = true;
    while (i<=level){
	var prevValue = 0; if (p !== null){ prevValue = p.t.p; }
	var nextValue = 0; if (q !== null){ nextValue = q.t.p; }
	if ( commonRoot && prevValue != nextValue){
	    commonRoot = false;
	    pIsGreater = prevValue > nextValue;
	}
	if (pIsGreater){ nextValue = Math.pow(2,this.getBitBase(i))-1; }
	if (commonRoot || pIsGreater || i!=level){
	    sum += nextValue - prevValue; 
	} else {
	    sum += nextValue - prevValue - 1;
	}
	if (i!=level){
	    sum *= Math.pow(2,this.getBitBase(i+1));
	};
	if (p!==null && p.children.length!=0){p = p.children[0];}else{p=null;};
	if (q!==null && q.children.length!=0){q = q.children[0];}else{q=null;};
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
