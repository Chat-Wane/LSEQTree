require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
    var n = this.getBitBase(level),
        m = this._b-1;
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
    var sum = 0, i = 0,
        pIsGreater = false, commonRoot = true,
        prevValue = 0, nextValue = 0;
    
    while (i<=level){
	prevValue = 0; if (p !== null){ prevValue = p.t.p; }
        nextValue = 0; if (q !== null){ nextValue = q.t.p; }
        if (commonRoot && prevValue !== nextValue){
            commonRoot = false;
            pIsGreater = prevValue > nextValue;
        }
        if (pIsGreater){ nextValue = Math.pow(2,this.getBitBase(i))-1; }
        if (commonRoot || pIsGreater || i!==level){
            sum += nextValue - prevValue; 
        } else {
            sum += nextValue - prevValue - 1;
        }
        if (i!==level){
            sum *= Math.pow(2,this.getBitBase(i+1));
        };
        if (p!==null && p.children.length!==0){p=p.children[0];} else{p=null;};
        if (q!==null && q.children.length!==0){q=q.children[0];} else{q=null;};
        ++i;
    }
    return sum;
};

Base.instance = null;

module.exports = function(args){
    if (args){
        Base.instance = new Base(args);
    } else {
        if (Base.instance === null){
            Base.instance = new Base();
        };
    };
    return Base.instance;
};

},{"BigInt":7}],2:[function(require,module,exports){
var BI = require('BigInt');
var Base = require('./base.js')();
var Triple = require('./triple.js');
var LSEQNode = require('./lseqnode.js');

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
 * \brief set the d,s,c values according to the node in argument
 * \param node the lseqnode containing the path in the tree structure
 */
Identifier.prototype.fromNode = function(node){
    // #1 process the length of the path
    var length = 1, tempNode = node, i = 0;
    
    while (tempNode.children.length !== 0){
	++length;
        tempNode = tempNode.children[0];
    };
    // #1 copy the values contained in the path
    this._d = BI.int2bigInt(0,Base.getSumBit(length - 1));
    
    for (var i = 0; i < length ; ++i){
        // #1a copy the site id
        this._s.push(node.t.s);
        // #1b copy the counter
        this._c.push(node.t.c);
        // #1c copy the digit
        BI.addInt_(this._d, node.t.p);
        if (i!==(length-1)){
            BI.leftShift_(this._d, Base.getBitBase(i+1));
        };
        node = node.children[0];
    };
};

/*!
 * \brief convert the identifier into a node without element
 * \param e the element associated with the node
 */
Identifier.prototype.toNode = function(e){
    var resultPath = [], dBitLength = Base.getSumBit(this._c.length -1), i = 0,
        mine;
    // #1 deconstruct the digit 
    for (var i = 0; i < this._c.length; ++i){
        // #1 truncate mine
        mine = BI.dup(this._d);
        // #1a shift right to erase the tail of the path
        BI.rightShift_(mine, dBitLength - Base.getSumBit(i));
        // #1b copy value in the result
        resultPath.push(new Triple(BI.modInt(mine,
                                             Math.pow(2,Base.getBitBase(i))),
                                   this._s[i],
                                   this._c[i]));
    };
    return new LSEQNode(resultPath, e);
};

/*!
 * \brief compare two identifiers
 * \param o the other identifier
 * \return -1 if this is lower, 0 if they are equal, 1 if this is greater
 */
Identifier.prototype.compare = function(o){
    var dBitLength = Base.getSumBit(this._c.length - 1),
        odBitLength = Base.getSumBit(o._c.length - 1),
        comparing = true,
        comp = 0, i = 0,
        sum, mine, other;
    
    // #1 Compare the list of <d,s,c>
    while (comparing && i < Math.min(this._c.length, o._c.length) ) {
        // can stop before the end of for loop wiz return
        sum = Base.getSumBit(i);
        // #1a truncate mine
        mine = BI.dup(this._d);
        BI.rightShift_(mine, dBitLength - sum);
        // #1b truncate other
        other = BI.dup(o._d);
        BI.rightShift_(other, odBitLength - sum);
        // #2 Compare triples
        if (!BI.equals(mine,other)) {  // #2a digit
            if (BI.greater(mine,other)){comp = 1;}else{comp = -1;};
            comparing = false;
        } else {
            comp = this._s[i] - o._s[i]; // #2b source
            if (comp !== 0) {
                comparing = false;
            } else {
                comp = this._c[i] - o._c[i]; // 2c clock
                if (comp !== 0) {
                    comparing = false;
                };
            };
        };
        ++i;
    };
    
    if (comp===0){
        comp = this._c.length - o._c.length; // #3 compare list size
    };
    return comp;
};


module.exports = Identifier;

},{"./base.js":1,"./lseqnode.js":3,"./triple.js":5,"BigInt":7}],3:[function(require,module,exports){
var Triple = require('./triple.js');
require('./util.js');

/*!
 * \brief a node of the LSEQ tree
 * \param tripleList the list of triple composing the path to the element
 * \param element the element to insert in the structure
 */
function LSEQNode(tripleList, element){
    this.t = tripleList.shift();
    if (tripleList.length === 0){
        this.e = element;
        this.subCounter = 0; // count the number of children and subchildren
        this.children = [];
    } else {
        this.e = null;
        this.subCounter = 1;
        this.children = [];
        this.children.push(new LSEQNode(tripleList, element));
    };
};

/*!
 * \brief add a path element to the current node
 * \param node the node to add as a children of this node
 * \return -1 if the element already exists
 */
LSEQNode.prototype.add = function(node){
    var index = this.children.binaryIndexOf(node);
    
    // #1 if the path do no exist, create it
    if (index < 0 || this.children.length === 0  ||
        (index === 0 && this.children.length > 0 && 
         this.children[0].compare(node)!==0)){
        this.children.splice(-index, 0, node);
        this.subCounter+=1;
    } else {
        // #2 otherwise, continue to explore the subtrees
        if (node.children.length === 0){
            // #2a check if the element already exists
            if (this.children[index].e !== null){
                return -1;
            } else {
                this.children[index].e = node.e;
                this.subCounter+=1;
            };
        } else {
            // #3 if didnot exist, increment the counter
            if (this.children[index].add(node.children[0])!==-1){
                this.subCounter+=1;
            };
        };
    };
};

/*! 
 * \brief remove the node of the tree and all node within path being useless
 * \param node the node containing the path to remove
 * \return -1 if the node does not exist
 */
LSEQNode.prototype.del = function(node){
    var indexes = this.getIndexes(node),
        currentTree = this, i = 0, isSplitted = false;

    if (indexes === -1) { return -1; }; // it does not exists
    this.subCounter -= 1;
    while (i < indexes.length && !(isSplitted)){
        if (!(currentTree.children[indexes[i]].e !== null &&
              i===(indexes.length - 1))){
            currentTree.children[indexes[i]].subCounter -= 1;     
        };
        if (currentTree.children[indexes[i]].subCounter <= 0
            && (currentTree.children[indexes[i]].e === null ||
                (currentTree.children[indexes[i]].e !== null &&
                 i===(indexes.length - 1)))){
            currentTree.children.splice(indexes[i],1);
            isSplitted = true;
        };
        currentTree = currentTree.children[indexes[i]];
        ++i;
    };
    if (!isSplitted){ currentTree.e = null;};
};

/*!
 * \brief comparison function used to order the list of children at each node
 * \param o the other node to compare with
 */
LSEQNode.prototype.compare = function(o){
    return this.t.compare(o.t);
};

/*!
 * \brief the ordered tree can be linearized into a sequence. This function get
 * the index of the path represented by the list of triples
 * \param node the node containing the path
 * \return the index of the path in the node
 */
LSEQNode.prototype.indexOf = function(node){
    var indexes = this.getIndexes(node),
        sum = 0, currentTree = this,
        j = 0;
    if (indexes === -1){return -1;}; // node does not exist
    if (this.e !== null){ sum +=1; };
    
    for (var i = 0; i<indexes.length; ++i){
        if (indexes[i] < (currentTree.children.length/2)){
            // #A start from the beginning
            for (var j = 0; j<indexes[i]; ++j){
                if (currentTree.children[j].e !== null){ sum+=1; };
                sum += currentTree.children[j].subCounter;
            };
        } else {
            // #B start from the end
            sum += currentTree.subCounter;
            for (var j = currentTree.children.length-1; j>=indexes[i];--j){
                if (currentTree.children[j].e !== null){ sum-=1; };
                sum -= currentTree.children[j].subCounter;  
            };
            j += 1;
        };
        if (currentTree.children[j].e !== null){ sum+=1; };
        currentTree = currentTree.children[j];
    };
    return sum-1; // -1 because algorithm counted the element itself
};

/*!
 * \brief get the list of indexes of the arrays representing the children in
 * the tree
 * \param node the node containing the path
 * \return a list of integer
 */
LSEQNode.prototype.getIndexes = function(node){
    function _getIndexes(indexes, currentTree, currentNode){
        var index = currentTree.children.binaryIndexOf(currentNode);
        if (index < 0 ||
            (index===0 && currentTree.children.length===0)){ return -1; }
        indexes.push(index);
        if (currentNode.children.length===0 ||
            currentTree.children.length===0){
            return indexes;
        };
        return _getIndexes(indexes,
                           currentTree.children[index],
                           currentNode.children[0]);
        
    };
    return _getIndexes([], this, node);
};

/*!
 * \brief the ordered tree can be linearized. This function gets the node at
 * the index in the projected sequence.
 * \param index the index in the sequence
 * \returns the node at the index
 */
LSEQNode.prototype.get = function(index){
    function _get(leftSum, buildingNode, queue, currentNode){
        var startBeginning = true, useFunction, i = 0,
            p, temp;
        // #0 the node is found, return the incrementally built node and praise
        // #the sun !
        if (leftSum === index && currentNode.e !== null){
            // 1a copy the value of the element in the path
            queue.e = currentNode.e;
            return buildingNode;
        };
        if (currentNode.e !== null){ leftSum += 1; };

        // #1 search: do I start from the beginning or the end
        startBeginning = ((index-leftSum)<(currentNode.subCounter/2));
        if (startBeginning){
            useFunction = function(a,b){return a+b;};
        } else {
            leftSum += currentNode.subCounter;
            useFunction = function(a,b){return a-b;};
        }

        // #2a counting the element from left to right
        if (!startBeginning) { i = currentNode.children.length-1; };
        while ((startBeginning && leftSum <= index) ||
               (!startBeginning && leftSum > index)){
            if (currentNode.children[i].e!==null){
                leftSum = useFunction(leftSum, 1);
            };
            leftSum = useFunction(leftSum,currentNode.children[i].subCounter);
            i = useFunction(i, 1);
        };

        // #2b decreasing the incrementation
        i = useFunction(i,-1);
        if (startBeginning){
            if (currentNode.children[i].e!==null){
                leftSum = useFunction(leftSum, -1);
            };
            leftSum = useFunction(leftSum,-currentNode.children[i].subCounter);
        };
        
        // #3 build path
        p = []; p.push(currentNode.children[i].t);
        if (buildingNode === null){
            buildingNode = new LSEQNode(p,null);
            queue = buildingNode;
        } else {
            temp = new LSEQNode(p,null);
            queue.add(temp);
            queue = temp;
        };
        return _get(leftSum, buildingNode, queue,
                    currentNode.children[i]);
    };
    return _get(0, null, null, this);
};

/*!
 * \brief cast the JSON object to a LSEQNode
 * \param object the JSON object
 * \return a self reference
 */
LSEQNode.prototype.fromJSON = function(object){
    this.t = new Triple(object.t.p, object.t.s, object.t.c);
    if (object.children.length === 0){
        this.e = object.e;
        this.subCounter = 0;
        this.children = [];
    } else {
        this.e = null;
        this.subCounter = 1;
        this.children = [];
        this.children.push(
            (new LSEQNode([], null).fromJSON(object.children[0])));
    };
    return this;
};

module.exports = LSEQNode;

},{"./triple.js":5,"./util.js":6}],4:[function(require,module,exports){
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

},{"./base.js":1,"./identifier.js":2,"BigInt":7}],5:[function(require,module,exports){

/*!
 * \brief triple that contains a <path site counter>
 * \param path the part of the path in the tree
 * \param site the unique site identifier that created the triple
 * \param counter the counter of the site when it created the triple
 */
function Triple(path, site, counter){
    this.p = path;
    this.s = site;
    this.c = counter;
};

/*!
 * \brief compare two triples prioritizing the path, then site, then counter
 * \param o the other triple to compare
 * \return -1 if this is lower than o, 1 if this is greater than o, 0 otherwise
 */
Triple.prototype.compare = function(o){
    if (this.s === Number.MAX_VALUE && this.c === Number.MAX_VALUE){
        return 1;
    };
    if (o.s === Number.MAX_VALUE && o.s === Number.MAX_VALUE){
        return -1;
    };
    
    if (this.p < o.p) { return -1;};
    if (this.p > o.p) { return 1 ;};
    if (this.s < o.s) { return -1;};
    if (this.s > o.s) { return 1 ;};
    if (this.c < o.c) { return -1;};
    if (this.c > o.c) { return 1 ;};
    return 0;
};

module.exports = Triple;

},{}],6:[function(require,module,exports){

function binaryIndexOf(){

/**
 * \from: [https://gist.github.com/Wolfy87/5734530]
 * Performs a binary search on the host array. This method can either be
 * injected into Array.prototype or called with a specified scope like this:
 * binaryIndexOf.call(someArray, searchElement);
 *
 *
 * @param {*} searchElement The item to search for within the array.
 * @return {Number} The index of the element which defaults to -1 when not
 * found.
 */
Array.prototype.binaryIndexOf = function(searchElement) {
    var minIndex = 0;
    var maxIndex = this.length - 1;
    var currentIndex;
    var currentElement;

    while (minIndex <= maxIndex) {
        currentIndex = Math.floor((minIndex + maxIndex) / 2);
        currentElement = this[currentIndex];
        if (currentElement.compare(searchElement) < 0) {
            minIndex = currentIndex + 1;
        }
        else if (currentElement.compare(searchElement) > 0) {
            maxIndex = currentIndex - 1;
        }
        else {
            return currentIndex;
        }
    };
    return ~maxIndex;
};

}

module.exports = binaryIndexOf();
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

},{}],"lseqtree":[function(require,module,exports){
var BI = require('BigInt');
var Base = require('./base.js')(15);
var S = require('./strategy.js')(10);
var ID = require('./identifier.js');
var Triple = require('./triple.js');
var LSEQNode = require('./lseqnode.js');

/*!
 * \class LSEQTree
 *
 * \brief Distributed array using LSEQ allocation strategy with an underlying
 * exponential tree model
 */
function LSEQTree(s){
    var listTriple;
    
    this._s = s;
    this._c = 0;
    this._hash = function(depth) { return depth%2; };
    this.length = 0;

    this.root = new LSEQNode([],null);
    listTriple = []; listTriple.push(new Triple(0,0,0));  // min bound
    this.root.add(new LSEQNode(listTriple, ""));
    listTriple = [];
    listTriple.push(new Triple(Math.pow(2,Base.getBitBase(0))-1,
                               Number.MAX_VALUE,
                               Number.MAX_VALUE)); // max bound
    this.root.add(new LSEQNode(listTriple, ""));
};

/*!
 * \brief return the LSEQNode of the element at  targeted index
 * \param index the index of the element in the flattened array
 * \return the LSEQNode targeting the element at index
 */
LSEQTree.prototype.get = function(index){
    // #1 search in the tree to get the value
    return this.root.get(index);
};

/*!
 * \brief insert a value at the targeted index
 * \param element the element to insert
 * \param index the position in the array
 * \return a pair {_e: element , _i: identifier}
 */
LSEQTree.prototype.insert = function(element, index){
    var pei = this.get(index), // #1a previous bound
        qei = this.get(index+1), // #1b next bound
        id, couple;
    this._c += 1; // #2a incrementing the local counter
    id = this.alloc(pei, qei); // #2b generating the id inbetween the bounds
    // #3 add it to the structure and return value
    couple = {_e: element, _i: id}
    this.applyInsert(element, id, true);
    return couple;
};

/*!
 * \brief delete the element at the index
 * \param index the index of the element to delete in the array
 * \return the identifier of the element at the index
 */
LSEQTree.prototype.remove = function(index){
    var ei = this.get(index+1),
        i = new ID(null, [], []);
    i.fromNode(ei); // from node -> id
    this.applyRemove(ei); 
    return i;
};

/*!
 * \brief generate the digit part of the identifiers  between p and q
 * \param p the digit part of the previous identifier
 * \param q the digit part of the next identifier
 * \return the digit part located between p and q
 */
LSEQTree.prototype.alloc = function (p,q){
    var interval = 0, level = 0;
    // #1 process the level of the new identifier
    while (interval<=0){ // no room for insertion
        interval = Base.getInterval(p, q, level); // (TODO) optimize
        ++level;
    };
    level -= 1;
    if (this._hash(level) === 0){
        return S.bPlus(p, q, level, interval, this._s, this._c);
    } else {
        return S.bMinus(p, q, level, interval, this._s, this._c);
    };
};

/*!
 * \brief insert an element created from a remote site into the array
 * \param e the element to insert
 * \param i the identifier of the element
 * \param noIndex whether or not it should return the index of the insert
 * \return the index of the newly inserted element in the array
 */
LSEQTree.prototype.applyInsert = function(e, i, noIndex){
    var node, result;
    // #0 cast from the proper type
    // #0A the identifier is an ID
    if (i && i._d && i._s && i._c){
        node = (new ID(i._d, i._s, i._c).toNode(e));
    };
    // #0B the identifier is a LSEQNode
    if (i && i.t && i.children){
        node = (new LSEQNode([],null)).fromJSON(i);
    };
    // #2 integrates the new element to the data structure
    result = this.root.add(node);
    if (result !== -1){
        // #3 if the element as been added
        this.length += 1;
    };
    return result || (!noIndex && this.root.indexOf(node));
};

/*!
 * \brief delete the element with the targeted identifier
 * \param i the identifier of the element
 * \return the index of the element feshly deleted, -1 if no removal
 */
LSEQTree.prototype.applyRemove = function(i){
    var node, position;
    // #0 cast from the proper type
    if (i && i._d && i._s && i._c){
        node = (new ID(i._d, i._s, i._c)).toNode(null);
    };
    // #0B the identifier is a LSEQNode
    if (i && i.t && i.children){
        node = (new LSEQNode([],null)).fromJSON(i);
    };
    // #1 get the index of the element to remove
    position = this.root.indexOf(node);
    if (position !== -1){
        // #2 if it exists remove it
        this.root.del(node);
        this.length -= 1;
    };
    return position;
};


/*!
 * \brief cast the JSON object into a proper LSEQTree.
 * \param object the JSON object to cast
 * \return a self reference
 */
LSEQTree.prototype.fromJSON = function(object){
    // #1 copy the source, counter, and length of the object
    this._s = object._s;
    this._c = object._c;
    this.length = object.length;
    // #2 depth first adding
    var self = this;
    function depthFirst(currentNode, currentPath){
        var triple = new Triple(currentNode.t.p,
                                currentNode.t.s,
                                currentNode.t.c);
        currentPath.push(triple);
        if (currentNode.e!==null){
            self.root.add(new LSEQNode(currentPath, currentNode.e));
        };
        for (var i = 0; i<currentNode.children.length; ++i){
            depthFirst(currentNode.children[i], currentPath);
        };
    };
    for (var i = 0; i<object.root.children.length; ++i){
        depthFirst(object.root, []);
    };
    return this;
};

module.exports = LSEQTree;

},{"./base.js":1,"./identifier.js":2,"./lseqnode.js":3,"./strategy.js":4,"./triple.js":5,"BigInt":7}]},{},[])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImxpYi9iYXNlLmpzIiwibGliL2lkZW50aWZpZXIuanMiLCJsaWIvbHNlcW5vZGUuanMiLCJsaWIvc3RyYXRlZ3kuanMiLCJsaWIvdHJpcGxlLmpzIiwibGliL3V0aWwuanMiLCJub2RlX21vZHVsZXMvQmlnSW50L3NyYy9CaWdJbnQuanMiLCJsaWIvbHNlcXRyZWUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdnREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIEJJID0gcmVxdWlyZSgnQmlnSW50Jyk7XG5cbi8qIVxuICogXFxjbGFzcyBCYXNlXG4gKiBcXGJyaWVmIHByb3ZpZGVzIGJhc2ljIGZ1bmN0aW9uIHRvIGJpdCBtYW5pcHVsYXRpb25cbiAqIFxccGFyYW0gYiB0aGUgbnVtYmVyIG9mIGJpdHMgYXQgbGV2ZWwgMCBvZiB0aGUgZGVuc2Ugc3BhY2VcbiAqL1xuZnVuY3Rpb24gQmFzZShiKXsgICAgXG4gICAgdmFyIERFRkFVTFRfQkFTRSA9IDM7XG4gICAgdGhpcy5fYiA9IGIgfHwgREVGQVVMVF9CQVNFO1xufTtcblxuLyohXG4gKiBcXGJyaWVmIFByb2Nlc3MgdGhlIG51bWJlciBvZiBiaXRzIHVzYWdlIGF0IGEgY2VydGFpbiBsZXZlbCBvZiBkZW5zZSBzcGFjZVxuICogXFxwYXJhbSBsZXZlbCB0aGUgbGV2ZWwgaW4gZGVuc2Ugc3BhY2UsIGkuZS4sIHRoZSBudW1iZXIgb2YgY29uY2F0ZW5hdGlvblxuICovXG5CYXNlLnByb3RvdHlwZS5nZXRCaXRCYXNlID0gZnVuY3Rpb24obGV2ZWwpe1xuICAgIHJldHVybiB0aGlzLl9iICsgbGV2ZWw7XG59O1xuXG4vKiFcbiAqIFxcYnJpZWYgUHJvY2VzcyB0aGUgdG90YWwgbnVtYmVyIG9mIGJpdHMgdXNhZ2UgdG8gZ2V0IHRvIGEgY2VydGFpbiBsZXZlbFxuICogXFxwYXJhbSBsZXZlbCB0aGUgbGV2ZWwgaW4gZGVuc2Ugc3BhY2VcbiAqL1xuQmFzZS5wcm90b3R5cGUuZ2V0U3VtQml0ID0gZnVuY3Rpb24obGV2ZWwpe1xuICAgIHZhciBuID0gdGhpcy5nZXRCaXRCYXNlKGxldmVsKSxcbiAgICAgICAgbSA9IHRoaXMuX2ItMTtcbiAgICByZXR1cm4gKG4gKiAobiArIDEpKSAvIDIgLSAobSAqIChtICsgMSkgLyAyKTtcbn07XG5cbi8qIVxuICBcXGJyaWVmIHByb2Nlc3MgdGhlIGludGVydmFsIGJldHdlZW4gdHdvIExTRVFOb2RlXG4gIFxccGFyYW0gcCB0aGUgcHJldmlvdXMgTFNFUU5vZGVcbiAgXFxwYXJhbSBxIHRoZSBuZXh0IExTRVFOb2RlXG4gIFxccGFyYW0gbGV2ZWwgdGhlIGRlcHRoIG9mIHRoZSB0cmVlIHRvIHByb2Nlc3NcbiAgXFxyZXR1cm4gYW4gaW50ZWdlciB3aGljaCBpcyB0aGUgaW50ZXJ2YWwgYmV0d2VlbiB0aGUgdHdvIG5vZGUgYXQgdGhlIGRlcHRoXG4qL1xuQmFzZS5wcm90b3R5cGUuZ2V0SW50ZXJ2YWwgPSBmdW5jdGlvbihwLCBxLCBsZXZlbCl7XG4gICAgdmFyIHN1bSA9IDAsIGkgPSAwLFxuICAgICAgICBwSXNHcmVhdGVyID0gZmFsc2UsIGNvbW1vblJvb3QgPSB0cnVlLFxuICAgICAgICBwcmV2VmFsdWUgPSAwLCBuZXh0VmFsdWUgPSAwO1xuICAgIFxuICAgIHdoaWxlIChpPD1sZXZlbCl7XG5cdHByZXZWYWx1ZSA9IDA7IGlmIChwICE9PSBudWxsKXsgcHJldlZhbHVlID0gcC50LnA7IH1cbiAgICAgICAgbmV4dFZhbHVlID0gMDsgaWYgKHEgIT09IG51bGwpeyBuZXh0VmFsdWUgPSBxLnQucDsgfVxuICAgICAgICBpZiAoY29tbW9uUm9vdCAmJiBwcmV2VmFsdWUgIT09IG5leHRWYWx1ZSl7XG4gICAgICAgICAgICBjb21tb25Sb290ID0gZmFsc2U7XG4gICAgICAgICAgICBwSXNHcmVhdGVyID0gcHJldlZhbHVlID4gbmV4dFZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwSXNHcmVhdGVyKXsgbmV4dFZhbHVlID0gTWF0aC5wb3coMix0aGlzLmdldEJpdEJhc2UoaSkpLTE7IH1cbiAgICAgICAgaWYgKGNvbW1vblJvb3QgfHwgcElzR3JlYXRlciB8fCBpIT09bGV2ZWwpe1xuICAgICAgICAgICAgc3VtICs9IG5leHRWYWx1ZSAtIHByZXZWYWx1ZTsgXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdW0gKz0gbmV4dFZhbHVlIC0gcHJldlZhbHVlIC0gMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaSE9PWxldmVsKXtcbiAgICAgICAgICAgIHN1bSAqPSBNYXRoLnBvdygyLHRoaXMuZ2V0Qml0QmFzZShpKzEpKTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHAhPT1udWxsICYmIHAuY2hpbGRyZW4ubGVuZ3RoIT09MCl7cD1wLmNoaWxkcmVuWzBdO30gZWxzZXtwPW51bGw7fTtcbiAgICAgICAgaWYgKHEhPT1udWxsICYmIHEuY2hpbGRyZW4ubGVuZ3RoIT09MCl7cT1xLmNoaWxkcmVuWzBdO30gZWxzZXtxPW51bGw7fTtcbiAgICAgICAgKytpO1xuICAgIH1cbiAgICByZXR1cm4gc3VtO1xufTtcblxuQmFzZS5pbnN0YW5jZSA9IG51bGw7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXJncyl7XG4gICAgaWYgKGFyZ3Mpe1xuICAgICAgICBCYXNlLmluc3RhbmNlID0gbmV3IEJhc2UoYXJncyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKEJhc2UuaW5zdGFuY2UgPT09IG51bGwpe1xuICAgICAgICAgICAgQmFzZS5pbnN0YW5jZSA9IG5ldyBCYXNlKCk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICByZXR1cm4gQmFzZS5pbnN0YW5jZTtcbn07XG4iLCJ2YXIgQkkgPSByZXF1aXJlKCdCaWdJbnQnKTtcbnZhciBCYXNlID0gcmVxdWlyZSgnLi9iYXNlLmpzJykoKTtcbnZhciBUcmlwbGUgPSByZXF1aXJlKCcuL3RyaXBsZS5qcycpO1xudmFyIExTRVFOb2RlID0gcmVxdWlyZSgnLi9sc2Vxbm9kZS5qcycpO1xuXG4vKiFcbiAqIFxcY2xhc3MgSWRlbnRpZmllclxuICogXFxicmllZiBVbmlxdWUgYW5kIGltbXV0YWJsZSBpZGVudGlmaWVyIGNvbXBvc2VkIG9mIGRpZ2l0LCBzb3VyY2VzLCBjb3VudGVyc1xuICogXFxwYXJhbSBkIHRoZSBkaWdpdCAocG9zaXRpb24gaW4gZGVuc2Ugc3BhY2UpXG4gKiBcXHBhcmFtIHMgdGhlIGxpc3Qgb2Ygc291cmNlc1xuICogXFxwYXJhbSBjIHRoZSBsaXN0IG9mIGNvdW50ZXJzXG4gKi9cbmZ1bmN0aW9uIElkZW50aWZpZXIoZCwgcywgYyl7XG4gICAgdGhpcy5fZCA9IGQ7XG4gICAgdGhpcy5fcyA9IHM7XG4gICAgdGhpcy5fYyA9IGM7XG59O1xuXG4vKiFcbiAqIFxcYnJpZWYgc2V0IHRoZSBkLHMsYyB2YWx1ZXMgYWNjb3JkaW5nIHRvIHRoZSBub2RlIGluIGFyZ3VtZW50XG4gKiBcXHBhcmFtIG5vZGUgdGhlIGxzZXFub2RlIGNvbnRhaW5pbmcgdGhlIHBhdGggaW4gdGhlIHRyZWUgc3RydWN0dXJlXG4gKi9cbklkZW50aWZpZXIucHJvdG90eXBlLmZyb21Ob2RlID0gZnVuY3Rpb24obm9kZSl7XG4gICAgLy8gIzEgcHJvY2VzcyB0aGUgbGVuZ3RoIG9mIHRoZSBwYXRoXG4gICAgdmFyIGxlbmd0aCA9IDEsIHRlbXBOb2RlID0gbm9kZSwgaSA9IDA7XG4gICAgXG4gICAgd2hpbGUgKHRlbXBOb2RlLmNoaWxkcmVuLmxlbmd0aCAhPT0gMCl7XG5cdCsrbGVuZ3RoO1xuICAgICAgICB0ZW1wTm9kZSA9IHRlbXBOb2RlLmNoaWxkcmVuWzBdO1xuICAgIH07XG4gICAgLy8gIzEgY29weSB0aGUgdmFsdWVzIGNvbnRhaW5lZCBpbiB0aGUgcGF0aFxuICAgIHRoaXMuX2QgPSBCSS5pbnQyYmlnSW50KDAsQmFzZS5nZXRTdW1CaXQobGVuZ3RoIC0gMSkpO1xuICAgIFxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoIDsgKytpKXtcbiAgICAgICAgLy8gIzFhIGNvcHkgdGhlIHNpdGUgaWRcbiAgICAgICAgdGhpcy5fcy5wdXNoKG5vZGUudC5zKTtcbiAgICAgICAgLy8gIzFiIGNvcHkgdGhlIGNvdW50ZXJcbiAgICAgICAgdGhpcy5fYy5wdXNoKG5vZGUudC5jKTtcbiAgICAgICAgLy8gIzFjIGNvcHkgdGhlIGRpZ2l0XG4gICAgICAgIEJJLmFkZEludF8odGhpcy5fZCwgbm9kZS50LnApO1xuICAgICAgICBpZiAoaSE9PShsZW5ndGgtMSkpe1xuICAgICAgICAgICAgQkkubGVmdFNoaWZ0Xyh0aGlzLl9kLCBCYXNlLmdldEJpdEJhc2UoaSsxKSk7XG4gICAgICAgIH07XG4gICAgICAgIG5vZGUgPSBub2RlLmNoaWxkcmVuWzBdO1xuICAgIH07XG59O1xuXG4vKiFcbiAqIFxcYnJpZWYgY29udmVydCB0aGUgaWRlbnRpZmllciBpbnRvIGEgbm9kZSB3aXRob3V0IGVsZW1lbnRcbiAqIFxccGFyYW0gZSB0aGUgZWxlbWVudCBhc3NvY2lhdGVkIHdpdGggdGhlIG5vZGVcbiAqL1xuSWRlbnRpZmllci5wcm90b3R5cGUudG9Ob2RlID0gZnVuY3Rpb24oZSl7XG4gICAgdmFyIHJlc3VsdFBhdGggPSBbXSwgZEJpdExlbmd0aCA9IEJhc2UuZ2V0U3VtQml0KHRoaXMuX2MubGVuZ3RoIC0xKSwgaSA9IDAsXG4gICAgICAgIG1pbmU7XG4gICAgLy8gIzEgZGVjb25zdHJ1Y3QgdGhlIGRpZ2l0IFxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fYy5sZW5ndGg7ICsraSl7XG4gICAgICAgIC8vICMxIHRydW5jYXRlIG1pbmVcbiAgICAgICAgbWluZSA9IEJJLmR1cCh0aGlzLl9kKTtcbiAgICAgICAgLy8gIzFhIHNoaWZ0IHJpZ2h0IHRvIGVyYXNlIHRoZSB0YWlsIG9mIHRoZSBwYXRoXG4gICAgICAgIEJJLnJpZ2h0U2hpZnRfKG1pbmUsIGRCaXRMZW5ndGggLSBCYXNlLmdldFN1bUJpdChpKSk7XG4gICAgICAgIC8vICMxYiBjb3B5IHZhbHVlIGluIHRoZSByZXN1bHRcbiAgICAgICAgcmVzdWx0UGF0aC5wdXNoKG5ldyBUcmlwbGUoQkkubW9kSW50KG1pbmUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoLnBvdygyLEJhc2UuZ2V0Qml0QmFzZShpKSkpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zW2ldLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9jW2ldKSk7XG4gICAgfTtcbiAgICByZXR1cm4gbmV3IExTRVFOb2RlKHJlc3VsdFBhdGgsIGUpO1xufTtcblxuLyohXG4gKiBcXGJyaWVmIGNvbXBhcmUgdHdvIGlkZW50aWZpZXJzXG4gKiBcXHBhcmFtIG8gdGhlIG90aGVyIGlkZW50aWZpZXJcbiAqIFxccmV0dXJuIC0xIGlmIHRoaXMgaXMgbG93ZXIsIDAgaWYgdGhleSBhcmUgZXF1YWwsIDEgaWYgdGhpcyBpcyBncmVhdGVyXG4gKi9cbklkZW50aWZpZXIucHJvdG90eXBlLmNvbXBhcmUgPSBmdW5jdGlvbihvKXtcbiAgICB2YXIgZEJpdExlbmd0aCA9IEJhc2UuZ2V0U3VtQml0KHRoaXMuX2MubGVuZ3RoIC0gMSksXG4gICAgICAgIG9kQml0TGVuZ3RoID0gQmFzZS5nZXRTdW1CaXQoby5fYy5sZW5ndGggLSAxKSxcbiAgICAgICAgY29tcGFyaW5nID0gdHJ1ZSxcbiAgICAgICAgY29tcCA9IDAsIGkgPSAwLFxuICAgICAgICBzdW0sIG1pbmUsIG90aGVyO1xuICAgIFxuICAgIC8vICMxIENvbXBhcmUgdGhlIGxpc3Qgb2YgPGQscyxjPlxuICAgIHdoaWxlIChjb21wYXJpbmcgJiYgaSA8IE1hdGgubWluKHRoaXMuX2MubGVuZ3RoLCBvLl9jLmxlbmd0aCkgKSB7XG4gICAgICAgIC8vIGNhbiBzdG9wIGJlZm9yZSB0aGUgZW5kIG9mIGZvciBsb29wIHdpeiByZXR1cm5cbiAgICAgICAgc3VtID0gQmFzZS5nZXRTdW1CaXQoaSk7XG4gICAgICAgIC8vICMxYSB0cnVuY2F0ZSBtaW5lXG4gICAgICAgIG1pbmUgPSBCSS5kdXAodGhpcy5fZCk7XG4gICAgICAgIEJJLnJpZ2h0U2hpZnRfKG1pbmUsIGRCaXRMZW5ndGggLSBzdW0pO1xuICAgICAgICAvLyAjMWIgdHJ1bmNhdGUgb3RoZXJcbiAgICAgICAgb3RoZXIgPSBCSS5kdXAoby5fZCk7XG4gICAgICAgIEJJLnJpZ2h0U2hpZnRfKG90aGVyLCBvZEJpdExlbmd0aCAtIHN1bSk7XG4gICAgICAgIC8vICMyIENvbXBhcmUgdHJpcGxlc1xuICAgICAgICBpZiAoIUJJLmVxdWFscyhtaW5lLG90aGVyKSkgeyAgLy8gIzJhIGRpZ2l0XG4gICAgICAgICAgICBpZiAoQkkuZ3JlYXRlcihtaW5lLG90aGVyKSl7Y29tcCA9IDE7fWVsc2V7Y29tcCA9IC0xO307XG4gICAgICAgICAgICBjb21wYXJpbmcgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbXAgPSB0aGlzLl9zW2ldIC0gby5fc1tpXTsgLy8gIzJiIHNvdXJjZVxuICAgICAgICAgICAgaWYgKGNvbXAgIT09IDApIHtcbiAgICAgICAgICAgICAgICBjb21wYXJpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29tcCA9IHRoaXMuX2NbaV0gLSBvLl9jW2ldOyAvLyAyYyBjbG9ja1xuICAgICAgICAgICAgICAgIGlmIChjb21wICE9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbXBhcmluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICArK2k7XG4gICAgfTtcbiAgICBcbiAgICBpZiAoY29tcD09PTApe1xuICAgICAgICBjb21wID0gdGhpcy5fYy5sZW5ndGggLSBvLl9jLmxlbmd0aDsgLy8gIzMgY29tcGFyZSBsaXN0IHNpemVcbiAgICB9O1xuICAgIHJldHVybiBjb21wO1xufTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IElkZW50aWZpZXI7XG4iLCJ2YXIgVHJpcGxlID0gcmVxdWlyZSgnLi90cmlwbGUuanMnKTtcbnJlcXVpcmUoJy4vdXRpbC5qcycpO1xuXG4vKiFcbiAqIFxcYnJpZWYgYSBub2RlIG9mIHRoZSBMU0VRIHRyZWVcbiAqIFxccGFyYW0gdHJpcGxlTGlzdCB0aGUgbGlzdCBvZiB0cmlwbGUgY29tcG9zaW5nIHRoZSBwYXRoIHRvIHRoZSBlbGVtZW50XG4gKiBcXHBhcmFtIGVsZW1lbnQgdGhlIGVsZW1lbnQgdG8gaW5zZXJ0IGluIHRoZSBzdHJ1Y3R1cmVcbiAqL1xuZnVuY3Rpb24gTFNFUU5vZGUodHJpcGxlTGlzdCwgZWxlbWVudCl7XG4gICAgdGhpcy50ID0gdHJpcGxlTGlzdC5zaGlmdCgpO1xuICAgIGlmICh0cmlwbGVMaXN0Lmxlbmd0aCA9PT0gMCl7XG4gICAgICAgIHRoaXMuZSA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuc3ViQ291bnRlciA9IDA7IC8vIGNvdW50IHRoZSBudW1iZXIgb2YgY2hpbGRyZW4gYW5kIHN1YmNoaWxkcmVuXG4gICAgICAgIHRoaXMuY2hpbGRyZW4gPSBbXTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmUgPSBudWxsO1xuICAgICAgICB0aGlzLnN1YkNvdW50ZXIgPSAxO1xuICAgICAgICB0aGlzLmNoaWxkcmVuID0gW107XG4gICAgICAgIHRoaXMuY2hpbGRyZW4ucHVzaChuZXcgTFNFUU5vZGUodHJpcGxlTGlzdCwgZWxlbWVudCkpO1xuICAgIH07XG59O1xuXG4vKiFcbiAqIFxcYnJpZWYgYWRkIGEgcGF0aCBlbGVtZW50IHRvIHRoZSBjdXJyZW50IG5vZGVcbiAqIFxccGFyYW0gbm9kZSB0aGUgbm9kZSB0byBhZGQgYXMgYSBjaGlsZHJlbiBvZiB0aGlzIG5vZGVcbiAqIFxccmV0dXJuIC0xIGlmIHRoZSBlbGVtZW50IGFscmVhZHkgZXhpc3RzXG4gKi9cbkxTRVFOb2RlLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbihub2RlKXtcbiAgICB2YXIgaW5kZXggPSB0aGlzLmNoaWxkcmVuLmJpbmFyeUluZGV4T2Yobm9kZSk7XG4gICAgXG4gICAgLy8gIzEgaWYgdGhlIHBhdGggZG8gbm8gZXhpc3QsIGNyZWF0ZSBpdFxuICAgIGlmIChpbmRleCA8IDAgfHwgdGhpcy5jaGlsZHJlbi5sZW5ndGggPT09IDAgIHx8XG4gICAgICAgIChpbmRleCA9PT0gMCAmJiB0aGlzLmNoaWxkcmVuLmxlbmd0aCA+IDAgJiYgXG4gICAgICAgICB0aGlzLmNoaWxkcmVuWzBdLmNvbXBhcmUobm9kZSkhPT0wKSl7XG4gICAgICAgIHRoaXMuY2hpbGRyZW4uc3BsaWNlKC1pbmRleCwgMCwgbm9kZSk7XG4gICAgICAgIHRoaXMuc3ViQ291bnRlcis9MTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyAjMiBvdGhlcndpc2UsIGNvbnRpbnVlIHRvIGV4cGxvcmUgdGhlIHN1YnRyZWVzXG4gICAgICAgIGlmIChub2RlLmNoaWxkcmVuLmxlbmd0aCA9PT0gMCl7XG4gICAgICAgICAgICAvLyAjMmEgY2hlY2sgaWYgdGhlIGVsZW1lbnQgYWxyZWFkeSBleGlzdHNcbiAgICAgICAgICAgIGlmICh0aGlzLmNoaWxkcmVuW2luZGV4XS5lICE9PSBudWxsKXtcbiAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY2hpbGRyZW5baW5kZXhdLmUgPSBub2RlLmU7XG4gICAgICAgICAgICAgICAgdGhpcy5zdWJDb3VudGVyKz0xO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vICMzIGlmIGRpZG5vdCBleGlzdCwgaW5jcmVtZW50IHRoZSBjb3VudGVyXG4gICAgICAgICAgICBpZiAodGhpcy5jaGlsZHJlbltpbmRleF0uYWRkKG5vZGUuY2hpbGRyZW5bMF0pIT09LTEpe1xuICAgICAgICAgICAgICAgIHRoaXMuc3ViQ291bnRlcis9MTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfTtcbn07XG5cbi8qISBcbiAqIFxcYnJpZWYgcmVtb3ZlIHRoZSBub2RlIG9mIHRoZSB0cmVlIGFuZCBhbGwgbm9kZSB3aXRoaW4gcGF0aCBiZWluZyB1c2VsZXNzXG4gKiBcXHBhcmFtIG5vZGUgdGhlIG5vZGUgY29udGFpbmluZyB0aGUgcGF0aCB0byByZW1vdmVcbiAqIFxccmV0dXJuIC0xIGlmIHRoZSBub2RlIGRvZXMgbm90IGV4aXN0XG4gKi9cbkxTRVFOb2RlLnByb3RvdHlwZS5kZWwgPSBmdW5jdGlvbihub2RlKXtcbiAgICB2YXIgaW5kZXhlcyA9IHRoaXMuZ2V0SW5kZXhlcyhub2RlKSxcbiAgICAgICAgY3VycmVudFRyZWUgPSB0aGlzLCBpID0gMCwgaXNTcGxpdHRlZCA9IGZhbHNlO1xuXG4gICAgaWYgKGluZGV4ZXMgPT09IC0xKSB7IHJldHVybiAtMTsgfTsgLy8gaXQgZG9lcyBub3QgZXhpc3RzXG4gICAgdGhpcy5zdWJDb3VudGVyIC09IDE7XG4gICAgd2hpbGUgKGkgPCBpbmRleGVzLmxlbmd0aCAmJiAhKGlzU3BsaXR0ZWQpKXtcbiAgICAgICAgaWYgKCEoY3VycmVudFRyZWUuY2hpbGRyZW5baW5kZXhlc1tpXV0uZSAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgICBpPT09KGluZGV4ZXMubGVuZ3RoIC0gMSkpKXtcbiAgICAgICAgICAgIGN1cnJlbnRUcmVlLmNoaWxkcmVuW2luZGV4ZXNbaV1dLnN1YkNvdW50ZXIgLT0gMTsgICAgIFxuICAgICAgICB9O1xuICAgICAgICBpZiAoY3VycmVudFRyZWUuY2hpbGRyZW5baW5kZXhlc1tpXV0uc3ViQ291bnRlciA8PSAwXG4gICAgICAgICAgICAmJiAoY3VycmVudFRyZWUuY2hpbGRyZW5baW5kZXhlc1tpXV0uZSA9PT0gbnVsbCB8fFxuICAgICAgICAgICAgICAgIChjdXJyZW50VHJlZS5jaGlsZHJlbltpbmRleGVzW2ldXS5lICE9PSBudWxsICYmXG4gICAgICAgICAgICAgICAgIGk9PT0oaW5kZXhlcy5sZW5ndGggLSAxKSkpKXtcbiAgICAgICAgICAgIGN1cnJlbnRUcmVlLmNoaWxkcmVuLnNwbGljZShpbmRleGVzW2ldLDEpO1xuICAgICAgICAgICAgaXNTcGxpdHRlZCA9IHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIGN1cnJlbnRUcmVlID0gY3VycmVudFRyZWUuY2hpbGRyZW5baW5kZXhlc1tpXV07XG4gICAgICAgICsraTtcbiAgICB9O1xuICAgIGlmICghaXNTcGxpdHRlZCl7IGN1cnJlbnRUcmVlLmUgPSBudWxsO307XG59O1xuXG4vKiFcbiAqIFxcYnJpZWYgY29tcGFyaXNvbiBmdW5jdGlvbiB1c2VkIHRvIG9yZGVyIHRoZSBsaXN0IG9mIGNoaWxkcmVuIGF0IGVhY2ggbm9kZVxuICogXFxwYXJhbSBvIHRoZSBvdGhlciBub2RlIHRvIGNvbXBhcmUgd2l0aFxuICovXG5MU0VRTm9kZS5wcm90b3R5cGUuY29tcGFyZSA9IGZ1bmN0aW9uKG8pe1xuICAgIHJldHVybiB0aGlzLnQuY29tcGFyZShvLnQpO1xufTtcblxuLyohXG4gKiBcXGJyaWVmIHRoZSBvcmRlcmVkIHRyZWUgY2FuIGJlIGxpbmVhcml6ZWQgaW50byBhIHNlcXVlbmNlLiBUaGlzIGZ1bmN0aW9uIGdldFxuICogdGhlIGluZGV4IG9mIHRoZSBwYXRoIHJlcHJlc2VudGVkIGJ5IHRoZSBsaXN0IG9mIHRyaXBsZXNcbiAqIFxccGFyYW0gbm9kZSB0aGUgbm9kZSBjb250YWluaW5nIHRoZSBwYXRoXG4gKiBcXHJldHVybiB0aGUgaW5kZXggb2YgdGhlIHBhdGggaW4gdGhlIG5vZGVcbiAqL1xuTFNFUU5vZGUucHJvdG90eXBlLmluZGV4T2YgPSBmdW5jdGlvbihub2RlKXtcbiAgICB2YXIgaW5kZXhlcyA9IHRoaXMuZ2V0SW5kZXhlcyhub2RlKSxcbiAgICAgICAgc3VtID0gMCwgY3VycmVudFRyZWUgPSB0aGlzLFxuICAgICAgICBqID0gMDtcbiAgICBpZiAoaW5kZXhlcyA9PT0gLTEpe3JldHVybiAtMTt9OyAvLyBub2RlIGRvZXMgbm90IGV4aXN0XG4gICAgaWYgKHRoaXMuZSAhPT0gbnVsbCl7IHN1bSArPTE7IH07XG4gICAgXG4gICAgZm9yICh2YXIgaSA9IDA7IGk8aW5kZXhlcy5sZW5ndGg7ICsraSl7XG4gICAgICAgIGlmIChpbmRleGVzW2ldIDwgKGN1cnJlbnRUcmVlLmNoaWxkcmVuLmxlbmd0aC8yKSl7XG4gICAgICAgICAgICAvLyAjQSBzdGFydCBmcm9tIHRoZSBiZWdpbm5pbmdcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqPGluZGV4ZXNbaV07ICsrail7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnJlbnRUcmVlLmNoaWxkcmVuW2pdLmUgIT09IG51bGwpeyBzdW0rPTE7IH07XG4gICAgICAgICAgICAgICAgc3VtICs9IGN1cnJlbnRUcmVlLmNoaWxkcmVuW2pdLnN1YkNvdW50ZXI7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gI0Igc3RhcnQgZnJvbSB0aGUgZW5kXG4gICAgICAgICAgICBzdW0gKz0gY3VycmVudFRyZWUuc3ViQ291bnRlcjtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSBjdXJyZW50VHJlZS5jaGlsZHJlbi5sZW5ndGgtMTsgaj49aW5kZXhlc1tpXTstLWope1xuICAgICAgICAgICAgICAgIGlmIChjdXJyZW50VHJlZS5jaGlsZHJlbltqXS5lICE9PSBudWxsKXsgc3VtLT0xOyB9O1xuICAgICAgICAgICAgICAgIHN1bSAtPSBjdXJyZW50VHJlZS5jaGlsZHJlbltqXS5zdWJDb3VudGVyOyAgXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaiArPSAxO1xuICAgICAgICB9O1xuICAgICAgICBpZiAoY3VycmVudFRyZWUuY2hpbGRyZW5bal0uZSAhPT0gbnVsbCl7IHN1bSs9MTsgfTtcbiAgICAgICAgY3VycmVudFRyZWUgPSBjdXJyZW50VHJlZS5jaGlsZHJlbltqXTtcbiAgICB9O1xuICAgIHJldHVybiBzdW0tMTsgLy8gLTEgYmVjYXVzZSBhbGdvcml0aG0gY291bnRlZCB0aGUgZWxlbWVudCBpdHNlbGZcbn07XG5cbi8qIVxuICogXFxicmllZiBnZXQgdGhlIGxpc3Qgb2YgaW5kZXhlcyBvZiB0aGUgYXJyYXlzIHJlcHJlc2VudGluZyB0aGUgY2hpbGRyZW4gaW5cbiAqIHRoZSB0cmVlXG4gKiBcXHBhcmFtIG5vZGUgdGhlIG5vZGUgY29udGFpbmluZyB0aGUgcGF0aFxuICogXFxyZXR1cm4gYSBsaXN0IG9mIGludGVnZXJcbiAqL1xuTFNFUU5vZGUucHJvdG90eXBlLmdldEluZGV4ZXMgPSBmdW5jdGlvbihub2RlKXtcbiAgICBmdW5jdGlvbiBfZ2V0SW5kZXhlcyhpbmRleGVzLCBjdXJyZW50VHJlZSwgY3VycmVudE5vZGUpe1xuICAgICAgICB2YXIgaW5kZXggPSBjdXJyZW50VHJlZS5jaGlsZHJlbi5iaW5hcnlJbmRleE9mKGN1cnJlbnROb2RlKTtcbiAgICAgICAgaWYgKGluZGV4IDwgMCB8fFxuICAgICAgICAgICAgKGluZGV4PT09MCAmJiBjdXJyZW50VHJlZS5jaGlsZHJlbi5sZW5ndGg9PT0wKSl7IHJldHVybiAtMTsgfVxuICAgICAgICBpbmRleGVzLnB1c2goaW5kZXgpO1xuICAgICAgICBpZiAoY3VycmVudE5vZGUuY2hpbGRyZW4ubGVuZ3RoPT09MCB8fFxuICAgICAgICAgICAgY3VycmVudFRyZWUuY2hpbGRyZW4ubGVuZ3RoPT09MCl7XG4gICAgICAgICAgICByZXR1cm4gaW5kZXhlcztcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF9nZXRJbmRleGVzKGluZGV4ZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50VHJlZS5jaGlsZHJlbltpbmRleF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Tm9kZS5jaGlsZHJlblswXSk7XG4gICAgICAgIFxuICAgIH07XG4gICAgcmV0dXJuIF9nZXRJbmRleGVzKFtdLCB0aGlzLCBub2RlKTtcbn07XG5cbi8qIVxuICogXFxicmllZiB0aGUgb3JkZXJlZCB0cmVlIGNhbiBiZSBsaW5lYXJpemVkLiBUaGlzIGZ1bmN0aW9uIGdldHMgdGhlIG5vZGUgYXRcbiAqIHRoZSBpbmRleCBpbiB0aGUgcHJvamVjdGVkIHNlcXVlbmNlLlxuICogXFxwYXJhbSBpbmRleCB0aGUgaW5kZXggaW4gdGhlIHNlcXVlbmNlXG4gKiBcXHJldHVybnMgdGhlIG5vZGUgYXQgdGhlIGluZGV4XG4gKi9cbkxTRVFOb2RlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbihpbmRleCl7XG4gICAgZnVuY3Rpb24gX2dldChsZWZ0U3VtLCBidWlsZGluZ05vZGUsIHF1ZXVlLCBjdXJyZW50Tm9kZSl7XG4gICAgICAgIHZhciBzdGFydEJlZ2lubmluZyA9IHRydWUsIHVzZUZ1bmN0aW9uLCBpID0gMCxcbiAgICAgICAgICAgIHAsIHRlbXA7XG4gICAgICAgIC8vICMwIHRoZSBub2RlIGlzIGZvdW5kLCByZXR1cm4gdGhlIGluY3JlbWVudGFsbHkgYnVpbHQgbm9kZSBhbmQgcHJhaXNlXG4gICAgICAgIC8vICN0aGUgc3VuICFcbiAgICAgICAgaWYgKGxlZnRTdW0gPT09IGluZGV4ICYmIGN1cnJlbnROb2RlLmUgIT09IG51bGwpe1xuICAgICAgICAgICAgLy8gMWEgY29weSB0aGUgdmFsdWUgb2YgdGhlIGVsZW1lbnQgaW4gdGhlIHBhdGhcbiAgICAgICAgICAgIHF1ZXVlLmUgPSBjdXJyZW50Tm9kZS5lO1xuICAgICAgICAgICAgcmV0dXJuIGJ1aWxkaW5nTm9kZTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGN1cnJlbnROb2RlLmUgIT09IG51bGwpeyBsZWZ0U3VtICs9IDE7IH07XG5cbiAgICAgICAgLy8gIzEgc2VhcmNoOiBkbyBJIHN0YXJ0IGZyb20gdGhlIGJlZ2lubmluZyBvciB0aGUgZW5kXG4gICAgICAgIHN0YXJ0QmVnaW5uaW5nID0gKChpbmRleC1sZWZ0U3VtKTwoY3VycmVudE5vZGUuc3ViQ291bnRlci8yKSk7XG4gICAgICAgIGlmIChzdGFydEJlZ2lubmluZyl7XG4gICAgICAgICAgICB1c2VGdW5jdGlvbiA9IGZ1bmN0aW9uKGEsYil7cmV0dXJuIGErYjt9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGVmdFN1bSArPSBjdXJyZW50Tm9kZS5zdWJDb3VudGVyO1xuICAgICAgICAgICAgdXNlRnVuY3Rpb24gPSBmdW5jdGlvbihhLGIpe3JldHVybiBhLWI7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vICMyYSBjb3VudGluZyB0aGUgZWxlbWVudCBmcm9tIGxlZnQgdG8gcmlnaHRcbiAgICAgICAgaWYgKCFzdGFydEJlZ2lubmluZykgeyBpID0gY3VycmVudE5vZGUuY2hpbGRyZW4ubGVuZ3RoLTE7IH07XG4gICAgICAgIHdoaWxlICgoc3RhcnRCZWdpbm5pbmcgJiYgbGVmdFN1bSA8PSBpbmRleCkgfHxcbiAgICAgICAgICAgICAgICghc3RhcnRCZWdpbm5pbmcgJiYgbGVmdFN1bSA+IGluZGV4KSl7XG4gICAgICAgICAgICBpZiAoY3VycmVudE5vZGUuY2hpbGRyZW5baV0uZSE9PW51bGwpe1xuICAgICAgICAgICAgICAgIGxlZnRTdW0gPSB1c2VGdW5jdGlvbihsZWZ0U3VtLCAxKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBsZWZ0U3VtID0gdXNlRnVuY3Rpb24obGVmdFN1bSxjdXJyZW50Tm9kZS5jaGlsZHJlbltpXS5zdWJDb3VudGVyKTtcbiAgICAgICAgICAgIGkgPSB1c2VGdW5jdGlvbihpLCAxKTtcbiAgICAgICAgfTtcblxuICAgICAgICAvLyAjMmIgZGVjcmVhc2luZyB0aGUgaW5jcmVtZW50YXRpb25cbiAgICAgICAgaSA9IHVzZUZ1bmN0aW9uKGksLTEpO1xuICAgICAgICBpZiAoc3RhcnRCZWdpbm5pbmcpe1xuICAgICAgICAgICAgaWYgKGN1cnJlbnROb2RlLmNoaWxkcmVuW2ldLmUhPT1udWxsKXtcbiAgICAgICAgICAgICAgICBsZWZ0U3VtID0gdXNlRnVuY3Rpb24obGVmdFN1bSwgLTEpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGxlZnRTdW0gPSB1c2VGdW5jdGlvbihsZWZ0U3VtLC1jdXJyZW50Tm9kZS5jaGlsZHJlbltpXS5zdWJDb3VudGVyKTtcbiAgICAgICAgfTtcbiAgICAgICAgXG4gICAgICAgIC8vICMzIGJ1aWxkIHBhdGhcbiAgICAgICAgcCA9IFtdOyBwLnB1c2goY3VycmVudE5vZGUuY2hpbGRyZW5baV0udCk7XG4gICAgICAgIGlmIChidWlsZGluZ05vZGUgPT09IG51bGwpe1xuICAgICAgICAgICAgYnVpbGRpbmdOb2RlID0gbmV3IExTRVFOb2RlKHAsbnVsbCk7XG4gICAgICAgICAgICBxdWV1ZSA9IGJ1aWxkaW5nTm9kZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRlbXAgPSBuZXcgTFNFUU5vZGUocCxudWxsKTtcbiAgICAgICAgICAgIHF1ZXVlLmFkZCh0ZW1wKTtcbiAgICAgICAgICAgIHF1ZXVlID0gdGVtcDtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF9nZXQobGVmdFN1bSwgYnVpbGRpbmdOb2RlLCBxdWV1ZSxcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudE5vZGUuY2hpbGRyZW5baV0pO1xuICAgIH07XG4gICAgcmV0dXJuIF9nZXQoMCwgbnVsbCwgbnVsbCwgdGhpcyk7XG59O1xuXG4vKiFcbiAqIFxcYnJpZWYgY2FzdCB0aGUgSlNPTiBvYmplY3QgdG8gYSBMU0VRTm9kZVxuICogXFxwYXJhbSBvYmplY3QgdGhlIEpTT04gb2JqZWN0XG4gKiBcXHJldHVybiBhIHNlbGYgcmVmZXJlbmNlXG4gKi9cbkxTRVFOb2RlLnByb3RvdHlwZS5mcm9tSlNPTiA9IGZ1bmN0aW9uKG9iamVjdCl7XG4gICAgdGhpcy50ID0gbmV3IFRyaXBsZShvYmplY3QudC5wLCBvYmplY3QudC5zLCBvYmplY3QudC5jKTtcbiAgICBpZiAob2JqZWN0LmNoaWxkcmVuLmxlbmd0aCA9PT0gMCl7XG4gICAgICAgIHRoaXMuZSA9IG9iamVjdC5lO1xuICAgICAgICB0aGlzLnN1YkNvdW50ZXIgPSAwO1xuICAgICAgICB0aGlzLmNoaWxkcmVuID0gW107XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5lID0gbnVsbDtcbiAgICAgICAgdGhpcy5zdWJDb3VudGVyID0gMTtcbiAgICAgICAgdGhpcy5jaGlsZHJlbiA9IFtdO1xuICAgICAgICB0aGlzLmNoaWxkcmVuLnB1c2goXG4gICAgICAgICAgICAobmV3IExTRVFOb2RlKFtdLCBudWxsKS5mcm9tSlNPTihvYmplY3QuY2hpbGRyZW5bMF0pKSk7XG4gICAgfTtcbiAgICByZXR1cm4gdGhpcztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTFNFUU5vZGU7XG4iLCJ2YXIgQkkgPSByZXF1aXJlKCdCaWdJbnQnKTtcbnZhciBCYXNlID0gcmVxdWlyZSgnLi9iYXNlLmpzJykoKTtcbnZhciBJRCA9IHJlcXVpcmUoJy4vaWRlbnRpZmllci5qcycpO1xuXG4vKiFcbiAqIFxcY2xhc3MgU3RyYXRlZ3lcbiAqIFxcYnJpZWYgRW51bWVyYXRlIHRoZSBhdmFpbGFibGUgc3ViLWFsbG9jYXRpb24gc3RyYXRlZ2llcy4gVGhlIHNpZ25hdHVyZSBvZlxuICogdGhlc2UgZnVuY3Rpb25zIGlzIGYoSWQsIElkLCBOKywgTissIE4sIE4pOiBJZC5cbiAqIFxccGFyYW0gYm91bmRhcnkgdGhlIHZhbHVlIHVzZWQgYXMgdGhlIGRlZmF1bHQgbWF4aW11bSBzcGFjaW5nIGJldHdlZW4gaWRzXG4gKi9cbmZ1bmN0aW9uIFN0cmF0ZWd5KGJvdW5kYXJ5KXtcbiAgICB2YXIgREVGQVVMVF9CT1VOREFSWSA9IDEwO1xuICAgIHRoaXMuX2JvdW5kYXJ5ID0gYm91bmRhcnkgfHwgREVGQVVMVF9CT1VOREFSWTtcbn07XG5cbi8qIVxuICogXFxicmllZiBDaG9vc2UgYW4gaWQgc3RhcnRpbmcgZnJvbSBwcmV2aW91cyBib3VuZCBhbmQgYWRkaW5nIHJhbmRvbSBudW1iZXJcbiAqIFxccGFyYW0gcCB0aGUgcHJldmlvdXMgaWRlbnRpZmllclxuICogXFxwYXJhbSBxIHRoZSBuZXh0IGlkZW50aWZpZXJcbiAqIFxccGFyYW0gbGV2ZWwgdGhlIG51bWJlciBvZiBjb25jYXRlbmF0aW9uIGNvbXBvc2luZyB0aGUgbmV3IGlkZW50aWZpZXJcbiAqIFxccGFyYW0gaW50ZXJ2YWwgdGhlIGludGVydmFsIGJldHdlZW4gcCBhbmQgcVxuICogXFxwYXJhbSBzIHRoZSBzb3VyY2UgdGhhdCBjcmVhdGVzIHRoZSBuZXcgaWRlbnRpZmllclxuICogXFxwYXJhbSBjIHRoZSBjb3VudGVyIG9mIHRoYXQgc291cmNlXG4gKi9cblN0cmF0ZWd5LnByb3RvdHlwZS5iUGx1cyA9IGZ1bmN0aW9uIChwLCBxLCBsZXZlbCwgaW50ZXJ2YWwsIHMsIGMpe1xuICAgIHZhciBjb3B5UCA9IHAsIGNvcHlRID0gcSxcbiAgICAgICAgc3RlcCA9IE1hdGgubWluKHRoaXMuX2JvdW5kYXJ5LCBpbnRlcnZhbCksIC8vIzAgdGhlIG1pbiBpbnRlcnZhbFxuICAgICAgICBkaWdpdCA9IEJJLmludDJiaWdJbnQoMCxCYXNlLmdldFN1bUJpdChsZXZlbCkpLFxuICAgICAgICB2YWx1ZTtcbiAgICBcbiAgICAvLyAjMSBjb3B5IHRoZSBwcmV2aW91cyBpZGVudGlmaWVyXG4gICAgZm9yICh2YXIgaSA9IDA7IGk8PWxldmVsOysraSl7XG5cdCAgICAgIHZhbHVlID0gMDtcbiAgICAgICAgaWYgKHAhPT1udWxsKXsgdmFsdWUgPSBwLnQucDsgfTtcbiAgICAgICAgQkkuYWRkSW50XyhkaWdpdCx2YWx1ZSk7XG4gICAgICAgIGlmIChpIT09bGV2ZWwpeyBCSS5sZWZ0U2hpZnRfKGRpZ2l0LEJhc2UuZ2V0Qml0QmFzZShpKzEpKTsgfTtcbiAgICAgICAgaWYgKHAhPT1udWxsICYmIHAuY2hpbGRyZW4ubGVuZ3RoIT09MCl7XG4gICAgICAgICAgICBwID0gcC5jaGlsZHJlblswXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHAgPSBudWxsO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgLy8gIzIgY3JlYXRlIGEgZGlnaXQgZm9yIGFuIGlkZW50aWZpZXIgYnkgYWRkaW5nIGEgcmFuZG9tIHZhbHVlXG4gICAgLy8gIzJhIERpZ2l0XG4gICAgQkkuYWRkSW50XyhkaWdpdCwgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKnN0ZXArMSkpO1xuICAgIC8vICMyYiBTb3VyY2UgJiBjb3VudGVyXG4gICAgcmV0dXJuIGdldFNDKGRpZ2l0LCBjb3B5UCwgY29weVEsIGxldmVsLCBzLCBjKTtcbn07XG5cblxuLyohXG4gKiBcXGJyaWVmIENob29zZSBhbiBpZCBzdGFydGluZyBmcm9tIG5leHQgYm91bmQgYW5kIHN1YnN0cmFjdCBhIHJhbmRvbSBudW1iZXJcbiAqIFxccGFyYW0gcCB0aGUgcHJldmlvdXMgaWRlbnRpZmllclxuICogXFxwYXJhbSBxIHRoZSBuZXh0IGlkZW50aWZpZXJcbiAqIFxccGFyYW0gbGV2ZWwgdGhlIG51bWJlciBvZiBjb25jYXRlbmF0aW9uIGNvbXBvc2luZyB0aGUgbmV3IGlkZW50aWZpZXJcbiAqIFxccGFyYW0gaW50ZXJ2YWwgdGhlIGludGVydmFsIGJldHdlZW4gcCBhbmQgcVxuICogXFxwYXJhbSBzIHRoZSBzb3VyY2UgdGhhdCBjcmVhdGVzIHRoZSBuZXcgaWRlbnRpZmllclxuICogXFxwYXJhbSBjIHRoZSBjb3VudGVyIG9mIHRoYXQgc291cmNlXG4gKi9cblN0cmF0ZWd5LnByb3RvdHlwZS5iTWludXMgPSBmdW5jdGlvbiAocCwgcSwgbGV2ZWwsIGludGVydmFsLCBzLCBjKXtcbiAgICB2YXIgY29weVAgPSBwLCBjb3B5USA9IHEsXG4gICAgICAgIHN0ZXAgPSBNYXRoLm1pbih0aGlzLl9ib3VuZGFyeSwgaW50ZXJ2YWwpLCAvLyAjMCBwcm9jZXNzIG1pbiBpbnRlcnZhbFxuICAgICAgICBkaWdpdCA9IEJJLmludDJiaWdJbnQoMCxCYXNlLmdldFN1bUJpdChsZXZlbCkpLFxuICAgICAgICBwSXNHcmVhdGVyID0gZmFsc2UsIGNvbW1vblJvb3QgPSB0cnVlLFxuICAgICAgICBwcmV2VmFsdWUsIG5leHRWYWx1ZTtcbiAgICBcbiAgICAvLyAjMSBjb3B5IG5leHQsIGlmIHByZXZpb3VzIGlzIGdyZWF0ZXIsIGNvcHkgbWF4VmFsdWUgQCBkZXB0aFxuICAgIGZvciAodmFyIGkgPSAwOyBpPD1sZXZlbDsrK2kpe1xuICAgICAgICBwcmV2VmFsdWUgPSAwOyBpZiAocCAhPT0gbnVsbCl7IHByZXZWYWx1ZSA9IHAudC5wOyB9XG4gICAgICAgIG5leHRWYWx1ZSA9IDA7IGlmIChxICE9PSBudWxsKXsgbmV4dFZhbHVlID0gcS50LnA7IH1cbiAgICAgICAgaWYgKGNvbW1vblJvb3QgJiYgcHJldlZhbHVlICE9PSBuZXh0VmFsdWUpe1xuICAgICAgICAgICAgY29tbW9uUm9vdCA9IGZhbHNlO1xuICAgICAgICAgICAgcElzR3JlYXRlciA9IHByZXZWYWx1ZSA+IG5leHRWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocElzR3JlYXRlcil7IG5leHRWYWx1ZSA9IE1hdGgucG93KDIsQmFzZS5nZXRCaXRCYXNlKGkpKS0xOyB9XG4gICAgICAgIEJJLmFkZEludF8oZGlnaXQsIG5leHRWYWx1ZSk7XG4gICAgICAgIGlmIChpIT09bGV2ZWwpeyBCSS5sZWZ0U2hpZnRfKGRpZ2l0LEJhc2UuZ2V0Qml0QmFzZShpKzEpKTsgfVxuICAgICAgICBpZiAocSE9PW51bGwgJiYgcS5jaGlsZHJlbi5sZW5ndGghPT0wKXtcbiAgICAgICAgICAgIHEgPSBxLmNoaWxkcmVuWzBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcSA9IG51bGw7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChwIT09bnVsbCAmJiBwLmNoaWxkcmVuLmxlbmd0aCE9PTApe1xuICAgICAgICAgICAgcCA9IHAuY2hpbGRyZW5bMF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwID0gbnVsbDtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIC8vICMzIGNyZWF0ZSBhIGRpZ2l0IGZvciBhbiBpZGVudGlmaWVyIGJ5IHN1YmluZyBhIHJhbmRvbSB2YWx1ZVxuICAgIC8vICMzYSBEaWdpdFxuICAgIGlmIChwSXNHcmVhdGVyKXtcbiAgICAgICAgQkkuYWRkSW50XyhkaWdpdCwgLU1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSpzdGVwKSApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIEJJLmFkZEludF8oZGlnaXQsIC1NYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqc3RlcCktMSApO1xuICAgIH07XG4gICAgXG4gICAgLy8gIzNiIFNvdXJjZSAmIGNvdW50ZXJcbiAgICByZXR1cm4gZ2V0U0MoZGlnaXQsIGNvcHlQLCBjb3B5USwgbGV2ZWwsIHMsIGMpO1xufTtcblxuLyohXG4gKiBcXGJyaWVmIGNvcGllcyB0aGUgYXBwcm9wcmlhdGVzIHNvdXJjZSBhbmQgY291bnRlciBmcm9tIHRoZSBhZGphY2VudCBcbiAqIGlkZW50aWZpZXJzIGF0IHRoZSBpbnNlcnRpb24gcG9zaXRpb24uXG4gKiBcXHBhcmFtIGQgdGhlIGRpZ2l0IHBhcnQgb2YgdGhlIG5ldyBpZGVudGlmaWVyXG4gKiBcXHBhcmFtIHAgdGhlIHByZXZpb3VzIGlkZW50aWZpZXJcbiAqIFxccGFyYW0gcSB0aGUgbmV4dCBpZGVudGlmaWVyXG4gKiBcXHBhcmFtIGxldmVsIHRoZSBzaXplIG9mIHRoZSBuZXcgaWRlbnRpZmllclxuICogXFxwYXJhbSBzIHRoZSBsb2NhbCBzaXRlIGlkZW50aWZpZXIgXG4gKiBcXHBhcmFtIGMgdGhlIGxvY2FsIG1vbm90b25pYyBjb3VudGVyXG4gKi9cbmZ1bmN0aW9uIGdldFNDKGQsIHAsIHEsIGxldmVsLCBzLCBjKXtcbiAgICB2YXIgc291cmNlcyA9IFtdLCBjb3VudGVycyA9IFtdLFxuICAgICAgICBpID0gMCxcbiAgICAgICAgc3VtQml0ID0gQmFzZS5nZXRTdW1CaXQobGV2ZWwpLFxuICAgICAgICB0ZW1wRGlnaXQsIHZhbHVlO1xuICAgIFxuICAgIHdoaWxlIChpPD1sZXZlbCl7XG4gICAgICAgIHRlbXBEaWdpdCA9IEJJLmR1cChkKTtcbiAgICAgICAgQkkucmlnaHRTaGlmdF8odGVtcERpZ2l0LCBzdW1CaXQgLSBCYXNlLmdldFN1bUJpdChpKSk7XG4gICAgICAgIHZhbHVlID0gQkkubW9kSW50KHRlbXBEaWdpdCxNYXRoLnBvdygyLEJhc2UuZ2V0Qml0QmFzZShpKSkpO1xuICAgICAgICBzb3VyY2VzW2ldPXM7XG4gICAgICAgIGNvdW50ZXJzW2ldPWNcbiAgICAgICAgaWYgKHEhPT1udWxsICYmIHEudC5wPT09dmFsdWUpeyBzb3VyY2VzW2ldPXEudC5zOyBjb3VudGVyc1tpXT1xLnQuY307XG4gICAgICAgIGlmIChwIT09bnVsbCAmJiBwLnQucD09PXZhbHVlKXsgc291cmNlc1tpXT1wLnQuczsgY291bnRlcnNbaV09cC50LmN9O1xuICAgICAgICBpZiAocSE9PW51bGwgJiYgcS5jaGlsZHJlbi5sZW5ndGghPT0wKXtcbiAgICAgICAgICAgIHEgPSBxLmNoaWxkcmVuWzBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcSA9IG51bGw7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChwIT09bnVsbCAmJiBwLmNoaWxkcmVuLmxlbmd0aCE9PTApe1xuICAgICAgICAgICAgcCA9IHAuY2hpbGRyZW5bMF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwID0gbnVsbDtcbiAgICAgICAgfTtcbiAgICAgICAgKytpO1xuICAgIH07XG4gICAgXG4gICAgcmV0dXJuIG5ldyBJRChkLCBzb3VyY2VzLCBjb3VudGVycyk7XG59O1xuXG5TdHJhdGVneS5pbnN0YW5jZSA9IG51bGw7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXJncyl7XG4gICAgaWYgKGFyZ3Mpe1xuICAgICAgICBTdHJhdGVneS5pbnN0YW5jZSA9IG5ldyBTdHJhdGVneShhcmdzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoU3RyYXRlZ3kuaW5zdGFuY2UgPT09IG51bGwpe1xuICAgICAgICAgICAgU3RyYXRlZ3kuaW5zdGFuY2UgPSBuZXcgU3RyYXRlZ3koKTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIHJldHVybiBTdHJhdGVneS5pbnN0YW5jZTtcbn07XG4iLCJcbi8qIVxuICogXFxicmllZiB0cmlwbGUgdGhhdCBjb250YWlucyBhIDxwYXRoIHNpdGUgY291bnRlcj5cbiAqIFxccGFyYW0gcGF0aCB0aGUgcGFydCBvZiB0aGUgcGF0aCBpbiB0aGUgdHJlZVxuICogXFxwYXJhbSBzaXRlIHRoZSB1bmlxdWUgc2l0ZSBpZGVudGlmaWVyIHRoYXQgY3JlYXRlZCB0aGUgdHJpcGxlXG4gKiBcXHBhcmFtIGNvdW50ZXIgdGhlIGNvdW50ZXIgb2YgdGhlIHNpdGUgd2hlbiBpdCBjcmVhdGVkIHRoZSB0cmlwbGVcbiAqL1xuZnVuY3Rpb24gVHJpcGxlKHBhdGgsIHNpdGUsIGNvdW50ZXIpe1xuICAgIHRoaXMucCA9IHBhdGg7XG4gICAgdGhpcy5zID0gc2l0ZTtcbiAgICB0aGlzLmMgPSBjb3VudGVyO1xufTtcblxuLyohXG4gKiBcXGJyaWVmIGNvbXBhcmUgdHdvIHRyaXBsZXMgcHJpb3JpdGl6aW5nIHRoZSBwYXRoLCB0aGVuIHNpdGUsIHRoZW4gY291bnRlclxuICogXFxwYXJhbSBvIHRoZSBvdGhlciB0cmlwbGUgdG8gY29tcGFyZVxuICogXFxyZXR1cm4gLTEgaWYgdGhpcyBpcyBsb3dlciB0aGFuIG8sIDEgaWYgdGhpcyBpcyBncmVhdGVyIHRoYW4gbywgMCBvdGhlcndpc2VcbiAqL1xuVHJpcGxlLnByb3RvdHlwZS5jb21wYXJlID0gZnVuY3Rpb24obyl7XG4gICAgaWYgKHRoaXMucyA9PT0gTnVtYmVyLk1BWF9WQUxVRSAmJiB0aGlzLmMgPT09IE51bWJlci5NQVhfVkFMVUUpe1xuICAgICAgICByZXR1cm4gMTtcbiAgICB9O1xuICAgIGlmIChvLnMgPT09IE51bWJlci5NQVhfVkFMVUUgJiYgby5zID09PSBOdW1iZXIuTUFYX1ZBTFVFKXtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH07XG4gICAgXG4gICAgaWYgKHRoaXMucCA8IG8ucCkgeyByZXR1cm4gLTE7fTtcbiAgICBpZiAodGhpcy5wID4gby5wKSB7IHJldHVybiAxIDt9O1xuICAgIGlmICh0aGlzLnMgPCBvLnMpIHsgcmV0dXJuIC0xO307XG4gICAgaWYgKHRoaXMucyA+IG8ucykgeyByZXR1cm4gMSA7fTtcbiAgICBpZiAodGhpcy5jIDwgby5jKSB7IHJldHVybiAtMTt9O1xuICAgIGlmICh0aGlzLmMgPiBvLmMpIHsgcmV0dXJuIDEgO307XG4gICAgcmV0dXJuIDA7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFRyaXBsZTtcbiIsIlxuZnVuY3Rpb24gYmluYXJ5SW5kZXhPZigpe1xuXG4vKipcbiAqIFxcZnJvbTogW2h0dHBzOi8vZ2lzdC5naXRodWIuY29tL1dvbGZ5ODcvNTczNDUzMF1cbiAqIFBlcmZvcm1zIGEgYmluYXJ5IHNlYXJjaCBvbiB0aGUgaG9zdCBhcnJheS4gVGhpcyBtZXRob2QgY2FuIGVpdGhlciBiZVxuICogaW5qZWN0ZWQgaW50byBBcnJheS5wcm90b3R5cGUgb3IgY2FsbGVkIHdpdGggYSBzcGVjaWZpZWQgc2NvcGUgbGlrZSB0aGlzOlxuICogYmluYXJ5SW5kZXhPZi5jYWxsKHNvbWVBcnJheSwgc2VhcmNoRWxlbWVudCk7XG4gKlxuICpcbiAqIEBwYXJhbSB7Kn0gc2VhcmNoRWxlbWVudCBUaGUgaXRlbSB0byBzZWFyY2ggZm9yIHdpdGhpbiB0aGUgYXJyYXkuXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSBpbmRleCBvZiB0aGUgZWxlbWVudCB3aGljaCBkZWZhdWx0cyB0byAtMSB3aGVuIG5vdFxuICogZm91bmQuXG4gKi9cbkFycmF5LnByb3RvdHlwZS5iaW5hcnlJbmRleE9mID0gZnVuY3Rpb24oc2VhcmNoRWxlbWVudCkge1xuICAgIHZhciBtaW5JbmRleCA9IDA7XG4gICAgdmFyIG1heEluZGV4ID0gdGhpcy5sZW5ndGggLSAxO1xuICAgIHZhciBjdXJyZW50SW5kZXg7XG4gICAgdmFyIGN1cnJlbnRFbGVtZW50O1xuXG4gICAgd2hpbGUgKG1pbkluZGV4IDw9IG1heEluZGV4KSB7XG4gICAgICAgIGN1cnJlbnRJbmRleCA9IE1hdGguZmxvb3IoKG1pbkluZGV4ICsgbWF4SW5kZXgpIC8gMik7XG4gICAgICAgIGN1cnJlbnRFbGVtZW50ID0gdGhpc1tjdXJyZW50SW5kZXhdO1xuICAgICAgICBpZiAoY3VycmVudEVsZW1lbnQuY29tcGFyZShzZWFyY2hFbGVtZW50KSA8IDApIHtcbiAgICAgICAgICAgIG1pbkluZGV4ID0gY3VycmVudEluZGV4ICsgMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChjdXJyZW50RWxlbWVudC5jb21wYXJlKHNlYXJjaEVsZW1lbnQpID4gMCkge1xuICAgICAgICAgICAgbWF4SW5kZXggPSBjdXJyZW50SW5kZXggLSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRJbmRleDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIH5tYXhJbmRleDtcbn07XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiaW5hcnlJbmRleE9mKCk7IiwiLy8gVmpldXg6IEN1c3RvbWl6ZWQgYmlnSW50MnN0ciBhbmQgc3RyMmJpZ0ludCBpbiBvcmRlciB0byBhY2NlcHQgY3VzdG9tIGJhc2UuXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIEJpZyBJbnRlZ2VyIExpYnJhcnkgdi4gNS40XG4vLyBDcmVhdGVkIDIwMDAsIGxhc3QgbW9kaWZpZWQgMjAwOVxuLy8gTGVlbW9uIEJhaXJkXG4vLyB3d3cubGVlbW9uLmNvbVxuLy9cbi8vIFZlcnNpb24gaGlzdG9yeTpcbi8vIHYgNS40ICAzIE9jdCAyMDA5XG4vLyAgIC0gYWRkZWQgXCJ2YXIgaVwiIHRvIGdyZWF0ZXJTaGlmdCgpIHNvIGkgaXMgbm90IGdsb2JhbC4gKFRoYW5rcyB0byBQ77+9dGVyIFN6YWLvv70gZm9yIGZpbmRpbmcgdGhhdCBidWcpXG4vL1xuLy8gdiA1LjMgIDIxIFNlcCAyMDA5XG4vLyAgIC0gYWRkZWQgcmFuZFByb2JQcmltZShrKSBmb3IgcHJvYmFibGUgcHJpbWVzXG4vLyAgIC0gdW5yb2xsZWQgbG9vcCBpbiBtb250XyAoc2xpZ2h0bHkgZmFzdGVyKVxuLy8gICAtIG1pbGxlclJhYmluIG5vdyB0YWtlcyBhIGJpZ0ludCBwYXJhbWV0ZXIgcmF0aGVyIHRoYW4gYW4gaW50XG4vL1xuLy8gdiA1LjIgIDE1IFNlcCAyMDA5XG4vLyAgIC0gZml4ZWQgY2FwaXRhbGl6YXRpb24gaW4gY2FsbCB0byBpbnQyYmlnSW50IGluIHJhbmRCaWdJbnRcbi8vICAgICAodGhhbmtzIHRvIEVtaWxpIEV2cmlwaWRvdSwgUmVpbmhvbGQgQmVocmluZ2VyLCBhbmQgU2FtdWVsIE1hY2FsZWVzZSBmb3IgZmluZGluZyB0aGF0IGJ1Zylcbi8vXG4vLyB2IDUuMSAgOCBPY3QgMjAwN1xuLy8gICAtIHJlbmFtZWQgaW52ZXJzZU1vZEludF8gdG8gaW52ZXJzZU1vZEludCBzaW5jZSBpdCBkb2Vzbid0IGNoYW5nZSBpdHMgcGFyYW1ldGVyc1xuLy8gICAtIGFkZGVkIGZ1bmN0aW9ucyBHQ0QgYW5kIHJhbmRCaWdJbnQsIHdoaWNoIGNhbGwgR0NEXyBhbmQgcmFuZEJpZ0ludF9cbi8vICAgLSBmaXhlZCBhIGJ1ZyBmb3VuZCBieSBSb2IgVmlzc2VyIChzZWUgY29tbWVudCB3aXRoIGhpcyBuYW1lIGJlbG93KVxuLy8gICAtIGltcHJvdmVkIGNvbW1lbnRzXG4vL1xuLy8gVGhpcyBmaWxlIGlzIHB1YmxpYyBkb21haW4uICAgWW91IGNhbiB1c2UgaXQgZm9yIGFueSBwdXJwb3NlIHdpdGhvdXQgcmVzdHJpY3Rpb24uXG4vLyBJIGRvIG5vdCBndWFyYW50ZWUgdGhhdCBpdCBpcyBjb3JyZWN0LCBzbyB1c2UgaXQgYXQgeW91ciBvd24gcmlzay4gIElmIHlvdSB1c2Vcbi8vIGl0IGZvciBzb21ldGhpbmcgaW50ZXJlc3RpbmcsIEknZCBhcHByZWNpYXRlIGhlYXJpbmcgYWJvdXQgaXQuICBJZiB5b3UgZmluZFxuLy8gYW55IGJ1Z3Mgb3IgbWFrZSBhbnkgaW1wcm92ZW1lbnRzLCBJJ2QgYXBwcmVjaWF0ZSBoZWFyaW5nIGFib3V0IHRob3NlIHRvby5cbi8vIEl0IHdvdWxkIGFsc28gYmUgbmljZSBpZiBteSBuYW1lIGFuZCBVUkwgd2VyZSBsZWZ0IGluIHRoZSBjb21tZW50cy4gIEJ1dCBub25lXG4vLyBvZiB0aGF0IGlzIHJlcXVpcmVkLlxuLy9cbi8vIFRoaXMgY29kZSBkZWZpbmVzIGEgYmlnSW50IGxpYnJhcnkgZm9yIGFyYml0cmFyeS1wcmVjaXNpb24gaW50ZWdlcnMuXG4vLyBBIGJpZ0ludCBpcyBhbiBhcnJheSBvZiBpbnRlZ2VycyBzdG9yaW5nIHRoZSB2YWx1ZSBpbiBjaHVua3Mgb2YgYnBlIGJpdHMsXG4vLyBsaXR0bGUgZW5kaWFuIChidWZmWzBdIGlzIHRoZSBsZWFzdCBzaWduaWZpY2FudCB3b3JkKS5cbi8vIE5lZ2F0aXZlIGJpZ0ludHMgYXJlIHN0b3JlZCB0d28ncyBjb21wbGVtZW50LiAgQWxtb3N0IGFsbCB0aGUgZnVuY3Rpb25zIHRyZWF0XG4vLyBiaWdJbnRzIGFzIG5vbm5lZ2F0aXZlLiAgVGhlIGZldyB0aGF0IHZpZXcgdGhlbSBhcyB0d28ncyBjb21wbGVtZW50IHNheSBzb1xuLy8gaW4gdGhlaXIgY29tbWVudHMuICBTb21lIGZ1bmN0aW9ucyBhc3N1bWUgdGhlaXIgcGFyYW1ldGVycyBoYXZlIGF0IGxlYXN0IG9uZVxuLy8gbGVhZGluZyB6ZXJvIGVsZW1lbnQuIEZ1bmN0aW9ucyB3aXRoIGFuIHVuZGVyc2NvcmUgYXQgdGhlIGVuZCBvZiB0aGUgbmFtZSBwdXRcbi8vIHRoZWlyIGFuc3dlciBpbnRvIG9uZSBvZiB0aGUgYXJyYXlzIHBhc3NlZCBpbiwgYW5kIGhhdmUgdW5wcmVkaWN0YWJsZSBiZWhhdmlvclxuLy8gaW4gY2FzZSBvZiBvdmVyZmxvdywgc28gdGhlIGNhbGxlciBtdXN0IG1ha2Ugc3VyZSB0aGUgYXJyYXlzIGFyZSBiaWcgZW5vdWdoIHRvXG4vLyBob2xkIHRoZSBhbnN3ZXIuICBCdXQgdGhlIGF2ZXJhZ2UgdXNlciBzaG91bGQgbmV2ZXIgaGF2ZSB0byBjYWxsIGFueSBvZiB0aGVcbi8vIHVuZGVyc2NvcmVkIGZ1bmN0aW9ucy4gIEVhY2ggaW1wb3J0YW50IHVuZGVyc2NvcmVkIGZ1bmN0aW9uIGhhcyBhIHdyYXBwZXIgZnVuY3Rpb25cbi8vIG9mIHRoZSBzYW1lIG5hbWUgd2l0aG91dCB0aGUgdW5kZXJzY29yZSB0aGF0IHRha2VzIGNhcmUgb2YgdGhlIGRldGFpbHMgZm9yIHlvdS5cbi8vIEZvciBlYWNoIHVuZGVyc2NvcmVkIGZ1bmN0aW9uIHdoZXJlIGEgcGFyYW1ldGVyIGlzIG1vZGlmaWVkLCB0aGF0IHNhbWUgdmFyaWFibGVcbi8vIG11c3Qgbm90IGJlIHVzZWQgYXMgYW5vdGhlciBhcmd1bWVudCB0b28uICBTbywgeW91IGNhbm5vdCBzcXVhcmUgeCBieSBkb2luZ1xuLy8gbXVsdE1vZF8oeCx4LG4pLiAgWW91IG11c3QgdXNlIHNxdWFyZU1vZF8oeCxuKSBpbnN0ZWFkLCBvciBkbyB5PWR1cCh4KTsgbXVsdE1vZF8oeCx5LG4pLlxuLy8gT3Igc2ltcGx5IHVzZSB0aGUgbXVsdE1vZCh4LHgsbikgZnVuY3Rpb24gd2l0aG91dCB0aGUgdW5kZXJzY29yZSwgd2hlcmVcbi8vIHN1Y2ggaXNzdWVzIG5ldmVyIGFyaXNlLCBiZWNhdXNlIG5vbi11bmRlcnNjb3JlZCBmdW5jdGlvbnMgbmV2ZXIgY2hhbmdlXG4vLyB0aGVpciBwYXJhbWV0ZXJzOyB0aGV5IGFsd2F5cyBhbGxvY2F0ZSBuZXcgbWVtb3J5IGZvciB0aGUgYW5zd2VyIHRoYXQgaXMgcmV0dXJuZWQuXG4vL1xuLy8gVGhlc2UgZnVuY3Rpb25zIGFyZSBkZXNpZ25lZCB0byBhdm9pZCBmcmVxdWVudCBkeW5hbWljIG1lbW9yeSBhbGxvY2F0aW9uIGluIHRoZSBpbm5lciBsb29wLlxuLy8gRm9yIG1vc3QgZnVuY3Rpb25zLCBpZiBpdCBuZWVkcyBhIEJpZ0ludCBhcyBhIGxvY2FsIHZhcmlhYmxlIGl0IHdpbGwgYWN0dWFsbHkgdXNlXG4vLyBhIGdsb2JhbCwgYW5kIHdpbGwgb25seSBhbGxvY2F0ZSB0byBpdCBvbmx5IHdoZW4gaXQncyBub3QgdGhlIHJpZ2h0IHNpemUuICBUaGlzIGVuc3VyZXNcbi8vIHRoYXQgd2hlbiBhIGZ1bmN0aW9uIGlzIGNhbGxlZCByZXBlYXRlZGx5IHdpdGggc2FtZS1zaXplZCBwYXJhbWV0ZXJzLCBpdCBvbmx5IGFsbG9jYXRlc1xuLy8gbWVtb3J5IG9uIHRoZSBmaXJzdCBjYWxsLlxuLy9cbi8vIE5vdGUgdGhhdCBmb3IgY3J5cHRvZ3JhcGhpYyBwdXJwb3NlcywgdGhlIGNhbGxzIHRvIE1hdGgucmFuZG9tKCkgbXVzdFxuLy8gYmUgcmVwbGFjZWQgd2l0aCBjYWxscyB0byBhIGJldHRlciBwc2V1ZG9yYW5kb20gbnVtYmVyIGdlbmVyYXRvci5cbi8vXG4vLyBJbiB0aGUgZm9sbG93aW5nLCBcImJpZ0ludFwiIG1lYW5zIGEgYmlnSW50IHdpdGggYXQgbGVhc3Qgb25lIGxlYWRpbmcgemVybyBlbGVtZW50LFxuLy8gYW5kIFwiaW50ZWdlclwiIG1lYW5zIGEgbm9ubmVnYXRpdmUgaW50ZWdlciBsZXNzIHRoYW4gcmFkaXguICBJbiBzb21lIGNhc2VzLCBpbnRlZ2VyXG4vLyBjYW4gYmUgbmVnYXRpdmUuICBOZWdhdGl2ZSBiaWdJbnRzIGFyZSAycyBjb21wbGVtZW50LlxuLy9cbi8vIFRoZSBmb2xsb3dpbmcgZnVuY3Rpb25zIGRvIG5vdCBtb2RpZnkgdGhlaXIgaW5wdXRzLlxuLy8gVGhvc2UgcmV0dXJuaW5nIGEgYmlnSW50LCBzdHJpbmcsIG9yIEFycmF5IHdpbGwgZHluYW1pY2FsbHkgYWxsb2NhdGUgbWVtb3J5IGZvciB0aGF0IHZhbHVlLlxuLy8gVGhvc2UgcmV0dXJuaW5nIGEgYm9vbGVhbiB3aWxsIHJldHVybiB0aGUgaW50ZWdlciAwIChmYWxzZSkgb3IgMSAodHJ1ZSkuXG4vLyBUaG9zZSByZXR1cm5pbmcgYm9vbGVhbiBvciBpbnQgd2lsbCBub3QgYWxsb2NhdGUgbWVtb3J5IGV4Y2VwdCBwb3NzaWJseSBvbiB0aGUgZmlyc3Rcbi8vIHRpbWUgdGhleSdyZSBjYWxsZWQgd2l0aCBhIGdpdmVuIHBhcmFtZXRlciBzaXplLlxuLy9cbi8vIGJpZ0ludCAgYWRkKHgseSkgICAgICAgICAgICAgICAvL3JldHVybiAoeCt5KSBmb3IgYmlnSW50cyB4IGFuZCB5LlxuLy8gYmlnSW50ICBhZGRJbnQoeCxuKSAgICAgICAgICAgIC8vcmV0dXJuICh4K24pIHdoZXJlIHggaXMgYSBiaWdJbnQgYW5kIG4gaXMgYW4gaW50ZWdlci5cbi8vIHN0cmluZyAgYmlnSW50MnN0cih4LGJhc2UpICAgICAvL3JldHVybiBhIHN0cmluZyBmb3JtIG9mIGJpZ0ludCB4IGluIGEgZ2l2ZW4gYmFzZSwgd2l0aCAyIDw9IGJhc2UgPD0gOTVcbi8vIGludCAgICAgYml0U2l6ZSh4KSAgICAgICAgICAgICAvL3JldHVybiBob3cgbWFueSBiaXRzIGxvbmcgdGhlIGJpZ0ludCB4IGlzLCBub3QgY291bnRpbmcgbGVhZGluZyB6ZXJvc1xuLy8gYmlnSW50ICBkdXAoeCkgICAgICAgICAgICAgICAgIC8vcmV0dXJuIGEgY29weSBvZiBiaWdJbnQgeFxuLy8gYm9vbGVhbiBlcXVhbHMoeCx5KSAgICAgICAgICAgIC8vaXMgdGhlIGJpZ0ludCB4IGVxdWFsIHRvIHRoZSBiaWdpbnQgeT9cbi8vIGJvb2xlYW4gZXF1YWxzSW50KHgseSkgICAgICAgICAvL2lzIGJpZ2ludCB4IGVxdWFsIHRvIGludGVnZXIgeT9cbi8vIGJpZ0ludCAgZXhwYW5kKHgsbikgICAgICAgICAgICAvL3JldHVybiBhIGNvcHkgb2YgeCB3aXRoIGF0IGxlYXN0IG4gZWxlbWVudHMsIGFkZGluZyBsZWFkaW5nIHplcm9zIGlmIG5lZWRlZFxuLy8gQXJyYXkgICBmaW5kUHJpbWVzKG4pICAgICAgICAgIC8vcmV0dXJuIGFycmF5IG9mIGFsbCBwcmltZXMgbGVzcyB0aGFuIGludGVnZXIgblxuLy8gYmlnSW50ICBHQ0QoeCx5KSAgICAgICAgICAgICAgIC8vcmV0dXJuIGdyZWF0ZXN0IGNvbW1vbiBkaXZpc29yIG9mIGJpZ0ludHMgeCBhbmQgeSAoZWFjaCB3aXRoIHNhbWUgbnVtYmVyIG9mIGVsZW1lbnRzKS5cbi8vIGJvb2xlYW4gZ3JlYXRlcih4LHkpICAgICAgICAgICAvL2lzIHg+eT8gICh4IGFuZCB5IGFyZSBub25uZWdhdGl2ZSBiaWdJbnRzKVxuLy8gYm9vbGVhbiBncmVhdGVyU2hpZnQoeCx5LHNoaWZ0KS8vaXMgKHggPDwoc2hpZnQqYnBlKSkgPiB5P1xuLy8gYmlnSW50ICBpbnQyYmlnSW50KHQsbixtKSAgICAgIC8vcmV0dXJuIGEgYmlnSW50IGVxdWFsIHRvIGludGVnZXIgdCwgd2l0aCBhdCBsZWFzdCBuIGJpdHMgYW5kIG0gYXJyYXkgZWxlbWVudHNcbi8vIGJpZ0ludCAgaW52ZXJzZU1vZCh4LG4pICAgICAgICAvL3JldHVybiAoeCoqKC0xKSBtb2QgbikgZm9yIGJpZ0ludHMgeCBhbmQgbi4gIElmIG5vIGludmVyc2UgZXhpc3RzLCBpdCByZXR1cm5zIG51bGxcbi8vIGludCAgICAgaW52ZXJzZU1vZEludCh4LG4pICAgICAvL3JldHVybiB4KiooLTEpIG1vZCBuLCBmb3IgaW50ZWdlcnMgeCBhbmQgbi4gIFJldHVybiAwIGlmIHRoZXJlIGlzIG5vIGludmVyc2Vcbi8vIGJvb2xlYW4gaXNaZXJvKHgpICAgICAgICAgICAgICAvL2lzIHRoZSBiaWdJbnQgeCBlcXVhbCB0byB6ZXJvP1xuLy8gYm9vbGVhbiBtaWxsZXJSYWJpbih4LGIpICAgICAgIC8vZG9lcyBvbmUgcm91bmQgb2YgTWlsbGVyLVJhYmluIGJhc2UgaW50ZWdlciBiIHNheSB0aGF0IGJpZ0ludCB4IGlzIHBvc3NpYmx5IHByaW1lPyAoYiBpcyBiaWdJbnQsIDE8Yjx4KVxuLy8gYm9vbGVhbiBtaWxsZXJSYWJpbkludCh4LGIpICAgIC8vZG9lcyBvbmUgcm91bmQgb2YgTWlsbGVyLVJhYmluIGJhc2UgaW50ZWdlciBiIHNheSB0aGF0IGJpZ0ludCB4IGlzIHBvc3NpYmx5IHByaW1lPyAoYiBpcyBpbnQsICAgIDE8Yjx4KVxuLy8gYmlnSW50ICBtb2QoeCxuKSAgICAgICAgICAgICAgIC8vcmV0dXJuIGEgbmV3IGJpZ0ludCBlcXVhbCB0byAoeCBtb2QgbikgZm9yIGJpZ0ludHMgeCBhbmQgbi5cbi8vIGludCAgICAgbW9kSW50KHgsbikgICAgICAgICAgICAvL3JldHVybiB4IG1vZCBuIGZvciBiaWdJbnQgeCBhbmQgaW50ZWdlciBuLlxuLy8gYmlnSW50ICBtdWx0KHgseSkgICAgICAgICAgICAgIC8vcmV0dXJuIHgqeSBmb3IgYmlnSW50cyB4IGFuZCB5LiBUaGlzIGlzIGZhc3RlciB3aGVuIHk8eC5cbi8vIGJpZ0ludCAgbXVsdE1vZCh4LHksbikgICAgICAgICAvL3JldHVybiAoeCp5IG1vZCBuKSBmb3IgYmlnSW50cyB4LHksbi4gIEZvciBncmVhdGVyIHNwZWVkLCBsZXQgeTx4LlxuLy8gYm9vbGVhbiBuZWdhdGl2ZSh4KSAgICAgICAgICAgIC8vaXMgYmlnSW50IHggbmVnYXRpdmU/XG4vLyBiaWdJbnQgIHBvd01vZCh4LHksbikgICAgICAgICAgLy9yZXR1cm4gKHgqKnkgbW9kIG4pIHdoZXJlIHgseSxuIGFyZSBiaWdJbnRzIGFuZCAqKiBpcyBleHBvbmVudGlhdGlvbi4gIDAqKjA9MS4gRmFzdGVyIGZvciBvZGQgbi5cbi8vIGJpZ0ludCAgcmFuZEJpZ0ludChuLHMpICAgICAgICAvL3JldHVybiBhbiBuLWJpdCByYW5kb20gQmlnSW50IChuPj0xKS4gIElmIHM9MSwgdGhlbiB0aGUgbW9zdCBzaWduaWZpY2FudCBvZiB0aG9zZSBuIGJpdHMgaXMgc2V0IHRvIDEuXG4vLyBiaWdJbnQgIHJhbmRUcnVlUHJpbWUoaykgICAgICAgLy9yZXR1cm4gYSBuZXcsIHJhbmRvbSwgay1iaXQsIHRydWUgcHJpbWUgYmlnSW50IHVzaW5nIE1hdXJlcidzIGFsZ29yaXRobS5cbi8vIGJpZ0ludCAgcmFuZFByb2JQcmltZShrKSAgICAgICAvL3JldHVybiBhIG5ldywgcmFuZG9tLCBrLWJpdCwgcHJvYmFibGUgcHJpbWUgYmlnSW50IChwcm9iYWJpbGl0eSBpdCdzIGNvbXBvc2l0ZSBsZXNzIHRoYW4gMl4tODApLlxuLy8gYmlnSW50ICBzdHIyYmlnSW50KHMsYixuLG0pICAgIC8vcmV0dXJuIGEgYmlnSW50IGZvciBudW1iZXIgcmVwcmVzZW50ZWQgaW4gc3RyaW5nIHMgaW4gYmFzZSBiIHdpdGggYXQgbGVhc3QgbiBiaXRzIGFuZCBtIGFycmF5IGVsZW1lbnRzXG4vLyBiaWdJbnQgIHN1Yih4LHkpICAgICAgICAgICAgICAgLy9yZXR1cm4gKHgteSkgZm9yIGJpZ0ludHMgeCBhbmQgeS4gIE5lZ2F0aXZlIGFuc3dlcnMgd2lsbCBiZSAycyBjb21wbGVtZW50XG4vLyBiaWdJbnQgIHRyaW0oeCxrKSAgICAgICAgICAgICAgLy9yZXR1cm4gYSBjb3B5IG9mIHggd2l0aCBleGFjdGx5IGsgbGVhZGluZyB6ZXJvIGVsZW1lbnRzXG4vL1xuLy9cbi8vIFRoZSBmb2xsb3dpbmcgZnVuY3Rpb25zIGVhY2ggaGF2ZSBhIG5vbi11bmRlcnNjb3JlZCB2ZXJzaW9uLCB3aGljaCBtb3N0IHVzZXJzIHNob3VsZCBjYWxsIGluc3RlYWQuXG4vLyBUaGVzZSBmdW5jdGlvbnMgZWFjaCB3cml0ZSB0byBhIHNpbmdsZSBwYXJhbWV0ZXIsIGFuZCB0aGUgY2FsbGVyIGlzIHJlc3BvbnNpYmxlIGZvciBlbnN1cmluZyB0aGUgYXJyYXlcbi8vIHBhc3NlZCBpbiBpcyBsYXJnZSBlbm91Z2ggdG8gaG9sZCB0aGUgcmVzdWx0LlxuLy9cbi8vIHZvaWQgICAgYWRkSW50Xyh4LG4pICAgICAgICAgIC8vZG8geD14K24gd2hlcmUgeCBpcyBhIGJpZ0ludCBhbmQgbiBpcyBhbiBpbnRlZ2VyXG4vLyB2b2lkICAgIGFkZF8oeCx5KSAgICAgICAgICAgICAvL2RvIHg9eCt5IGZvciBiaWdJbnRzIHggYW5kIHlcbi8vIHZvaWQgICAgY29weV8oeCx5KSAgICAgICAgICAgIC8vZG8geD15IG9uIGJpZ0ludHMgeCBhbmQgeVxuLy8gdm9pZCAgICBjb3B5SW50Xyh4LG4pICAgICAgICAgLy9kbyB4PW4gb24gYmlnSW50IHggYW5kIGludGVnZXIgblxuLy8gdm9pZCAgICBHQ0RfKHgseSkgICAgICAgICAgICAgLy9zZXQgeCB0byB0aGUgZ3JlYXRlc3QgY29tbW9uIGRpdmlzb3Igb2YgYmlnSW50cyB4IGFuZCB5LCAoeSBpcyBkZXN0cm95ZWQpLiAgKFRoaXMgbmV2ZXIgb3ZlcmZsb3dzIGl0cyBhcnJheSkuXG4vLyBib29sZWFuIGludmVyc2VNb2RfKHgsbikgICAgICAvL2RvIHg9eCoqKC0xKSBtb2QgbiwgZm9yIGJpZ0ludHMgeCBhbmQgbi4gUmV0dXJucyAxICgwKSBpZiBpbnZlcnNlIGRvZXMgKGRvZXNuJ3QpIGV4aXN0XG4vLyB2b2lkICAgIG1vZF8oeCxuKSAgICAgICAgICAgICAvL2RvIHg9eCBtb2QgbiBmb3IgYmlnSW50cyB4IGFuZCBuLiAoVGhpcyBuZXZlciBvdmVyZmxvd3MgaXRzIGFycmF5KS5cbi8vIHZvaWQgICAgbXVsdF8oeCx5KSAgICAgICAgICAgIC8vZG8geD14KnkgZm9yIGJpZ0ludHMgeCBhbmQgeS5cbi8vIHZvaWQgICAgbXVsdE1vZF8oeCx5LG4pICAgICAgIC8vZG8geD14KnkgIG1vZCBuIGZvciBiaWdJbnRzIHgseSxuLlxuLy8gdm9pZCAgICBwb3dNb2RfKHgseSxuKSAgICAgICAgLy9kbyB4PXgqKnkgbW9kIG4sIHdoZXJlIHgseSxuIGFyZSBiaWdJbnRzIChuIGlzIG9kZCkgYW5kICoqIGlzIGV4cG9uZW50aWF0aW9uLiAgMCoqMD0xLlxuLy8gdm9pZCAgICByYW5kQmlnSW50XyhiLG4scykgICAgLy9kbyBiID0gYW4gbi1iaXQgcmFuZG9tIEJpZ0ludC4gaWYgcz0xLCB0aGVuIG50aCBiaXQgKG1vc3Qgc2lnbmlmaWNhbnQgYml0KSBpcyBzZXQgdG8gMS4gbj49MS5cbi8vIHZvaWQgICAgcmFuZFRydWVQcmltZV8oYW5zLGspIC8vZG8gYW5zID0gYSByYW5kb20gay1iaXQgdHJ1ZSByYW5kb20gcHJpbWUgKG5vdCBqdXN0IHByb2JhYmxlIHByaW1lKSB3aXRoIDEgaW4gdGhlIG1zYi5cbi8vIHZvaWQgICAgc3ViXyh4LHkpICAgICAgICAgICAgIC8vZG8geD14LXkgZm9yIGJpZ0ludHMgeCBhbmQgeS4gTmVnYXRpdmUgYW5zd2VycyB3aWxsIGJlIDJzIGNvbXBsZW1lbnQuXG4vL1xuLy8gVGhlIGZvbGxvd2luZyBmdW5jdGlvbnMgZG8gTk9UIGhhdmUgYSBub24tdW5kZXJzY29yZWQgdmVyc2lvbi5cbi8vIFRoZXkgZWFjaCB3cml0ZSBhIGJpZ0ludCByZXN1bHQgdG8gb25lIG9yIG1vcmUgcGFyYW1ldGVycy4gIFRoZSBjYWxsZXIgaXMgcmVzcG9uc2libGUgZm9yXG4vLyBlbnN1cmluZyB0aGUgYXJyYXlzIHBhc3NlZCBpbiBhcmUgbGFyZ2UgZW5vdWdoIHRvIGhvbGQgdGhlIHJlc3VsdHMuXG4vL1xuLy8gdm9pZCBhZGRTaGlmdF8oeCx5LHlzKSAgICAgICAvL2RvIHg9eCsoeTw8KHlzKmJwZSkpXG4vLyB2b2lkIGNhcnJ5Xyh4KSAgICAgICAgICAgICAgIC8vZG8gY2FycmllcyBhbmQgYm9ycm93cyBzbyBlYWNoIGVsZW1lbnQgb2YgdGhlIGJpZ0ludCB4IGZpdHMgaW4gYnBlIGJpdHMuXG4vLyB2b2lkIGRpdmlkZV8oeCx5LHEscikgICAgICAgIC8vZGl2aWRlIHggYnkgeSBnaXZpbmcgcXVvdGllbnQgcSBhbmQgcmVtYWluZGVyIHJcbi8vIGludCAgZGl2SW50Xyh4LG4pICAgICAgICAgICAgLy9kbyB4PWZsb29yKHgvbikgZm9yIGJpZ0ludCB4IGFuZCBpbnRlZ2VyIG4sIGFuZCByZXR1cm4gdGhlIHJlbWFpbmRlci4gKFRoaXMgbmV2ZXIgb3ZlcmZsb3dzIGl0cyBhcnJheSkuXG4vLyBpbnQgIGVHQ0RfKHgseSxkLGEsYikgICAgICAgIC8vc2V0cyBhLGIsZCB0byBwb3NpdGl2ZSBiaWdJbnRzIHN1Y2ggdGhhdCBkID0gR0NEXyh4LHkpID0gYSp4LWIqeVxuLy8gdm9pZCBoYWx2ZV8oeCkgICAgICAgICAgICAgICAvL2RvIHg9Zmxvb3IofHh8LzIpKnNnbih4KSBmb3IgYmlnSW50IHggaW4gMidzIGNvbXBsZW1lbnQuICAoVGhpcyBuZXZlciBvdmVyZmxvd3MgaXRzIGFycmF5KS5cbi8vIHZvaWQgbGVmdFNoaWZ0Xyh4LG4pICAgICAgICAgLy9sZWZ0IHNoaWZ0IGJpZ0ludCB4IGJ5IG4gYml0cy4gIG48YnBlLlxuLy8gdm9pZCBsaW5Db21iXyh4LHksYSxiKSAgICAgICAvL2RvIHg9YSp4K2IqeSBmb3IgYmlnSW50cyB4IGFuZCB5IGFuZCBpbnRlZ2VycyBhIGFuZCBiXG4vLyB2b2lkIGxpbkNvbWJTaGlmdF8oeCx5LGIseXMpIC8vZG8geD14K2IqKHk8PCh5cypicGUpKSBmb3IgYmlnSW50cyB4IGFuZCB5LCBhbmQgaW50ZWdlcnMgYiBhbmQgeXNcbi8vIHZvaWQgbW9udF8oeCx5LG4sbnApICAgICAgICAgLy9Nb250Z29tZXJ5IG11bHRpcGxpY2F0aW9uIChzZWUgY29tbWVudHMgd2hlcmUgdGhlIGZ1bmN0aW9uIGlzIGRlZmluZWQpXG4vLyB2b2lkIG11bHRJbnRfKHgsbikgICAgICAgICAgIC8vZG8geD14Km4gd2hlcmUgeCBpcyBhIGJpZ0ludCBhbmQgbiBpcyBhbiBpbnRlZ2VyLlxuLy8gdm9pZCByaWdodFNoaWZ0Xyh4LG4pICAgICAgICAvL3JpZ2h0IHNoaWZ0IGJpZ0ludCB4IGJ5IG4gYml0cy4gIDAgPD0gbiA8IGJwZS4gKFRoaXMgbmV2ZXIgb3ZlcmZsb3dzIGl0cyBhcnJheSkuXG4vLyB2b2lkIHNxdWFyZU1vZF8oeCxuKSAgICAgICAgIC8vZG8geD14KnggIG1vZCBuIGZvciBiaWdJbnRzIHgsblxuLy8gdm9pZCBzdWJTaGlmdF8oeCx5LHlzKSAgICAgICAvL2RvIHg9eC0oeTw8KHlzKmJwZSkpLiBOZWdhdGl2ZSBhbnN3ZXJzIHdpbGwgYmUgMnMgY29tcGxlbWVudC5cbi8vXG4vLyBUaGUgZm9sbG93aW5nIGZ1bmN0aW9ucyBhcmUgYmFzZWQgb24gYWxnb3JpdGhtcyBmcm9tIHRoZSBfSGFuZGJvb2sgb2YgQXBwbGllZCBDcnlwdG9ncmFwaHlfXG4vLyAgICBwb3dNb2RfKCkgICAgICAgICAgID0gYWxnb3JpdGhtIDE0Ljk0LCBNb250Z29tZXJ5IGV4cG9uZW50aWF0aW9uXG4vLyAgICBlR0NEXyxpbnZlcnNlTW9kXygpID0gYWxnb3JpdGhtIDE0LjYxLCBCaW5hcnkgZXh0ZW5kZWQgR0NEX1xuLy8gICAgR0NEXygpICAgICAgICAgICAgICA9IGFsZ29yb3RobSAxNC41NywgTGVobWVyJ3MgYWxnb3JpdGhtXG4vLyAgICBtb250XygpICAgICAgICAgICAgID0gYWxnb3JpdGhtIDE0LjM2LCBNb250Z29tZXJ5IG11bHRpcGxpY2F0aW9uXG4vLyAgICBkaXZpZGVfKCkgICAgICAgICAgID0gYWxnb3JpdGhtIDE0LjIwICBNdWx0aXBsZS1wcmVjaXNpb24gZGl2aXNpb25cbi8vICAgIHNxdWFyZU1vZF8oKSAgICAgICAgPSBhbGdvcml0aG0gMTQuMTYgIE11bHRpcGxlLXByZWNpc2lvbiBzcXVhcmluZ1xuLy8gICAgcmFuZFRydWVQcmltZV8oKSAgICA9IGFsZ29yaXRobSAgNC42MiwgTWF1cmVyJ3MgYWxnb3JpdGhtXG4vLyAgICBtaWxsZXJSYWJpbigpICAgICAgID0gYWxnb3JpdGhtICA0LjI0LCBNaWxsZXItUmFiaW4gYWxnb3JpdGhtXG4vL1xuLy8gUHJvZmlsaW5nIHNob3dzOlxuLy8gICAgIHJhbmRUcnVlUHJpbWVfKCkgc3BlbmRzOlxuLy8gICAgICAgICAxMCUgb2YgaXRzIHRpbWUgaW4gY2FsbHMgdG8gcG93TW9kXygpXG4vLyAgICAgICAgIDg1JSBvZiBpdHMgdGltZSBpbiBjYWxscyB0byBtaWxsZXJSYWJpbigpXG4vLyAgICAgbWlsbGVyUmFiaW4oKSBzcGVuZHM6XG4vLyAgICAgICAgIDk5JSBvZiBpdHMgdGltZSBpbiBjYWxscyB0byBwb3dNb2RfKCkgICAoYWx3YXlzIHdpdGggYSBiYXNlIG9mIDIpXG4vLyAgICAgcG93TW9kXygpIHNwZW5kczpcbi8vICAgICAgICAgOTQlIG9mIGl0cyB0aW1lIGluIGNhbGxzIHRvIG1vbnRfKCkgIChhbG1vc3QgYWx3YXlzIHdpdGggeD09eSlcbi8vXG4vLyBUaGlzIHN1Z2dlc3RzIHRoZXJlIGFyZSBzZXZlcmFsIHdheXMgdG8gc3BlZWQgdXAgdGhpcyBsaWJyYXJ5IHNsaWdodGx5OlxuLy8gICAgIC0gY29udmVydCBwb3dNb2RfIHRvIHVzZSBhIE1vbnRnb21lcnkgZm9ybSBvZiBrLWFyeSB3aW5kb3cgKG9yIG1heWJlIGEgTW9udGdvbWVyeSBmb3JtIG9mIHNsaWRpbmcgd2luZG93KVxuLy8gICAgICAgICAtLSB0aGlzIHNob3VsZCBlc3BlY2lhbGx5IGZvY3VzIG9uIGJlaW5nIGZhc3Qgd2hlbiByYWlzaW5nIDIgdG8gYSBwb3dlciBtb2QgblxuLy8gICAgIC0gY29udmVydCByYW5kVHJ1ZVByaW1lXygpIHRvIHVzZSBhIG1pbmltdW0gciBvZiAxLzMgaW5zdGVhZCBvZiAxLzIgd2l0aCB0aGUgYXBwcm9wcmlhdGUgY2hhbmdlIHRvIHRoZSB0ZXN0XG4vLyAgICAgLSB0dW5lIHRoZSBwYXJhbWV0ZXJzIGluIHJhbmRUcnVlUHJpbWVfKCksIGluY2x1ZGluZyBjLCBtLCBhbmQgcmVjTGltaXRcbi8vICAgICAtIHNwZWVkIHVwIHRoZSBzaW5nbGUgbG9vcCBpbiBtb250XygpIHRoYXQgdGFrZXMgOTUlIG9mIHRoZSBydW50aW1lLCBwZXJoYXBzIGJ5IHJlZHVjaW5nIGNoZWNraW5nXG4vLyAgICAgICB3aXRoaW4gdGhlIGxvb3Agd2hlbiBhbGwgdGhlIHBhcmFtZXRlcnMgYXJlIHRoZSBzYW1lIGxlbmd0aC5cbi8vXG4vLyBUaGVyZSBhcmUgc2V2ZXJhbCBpZGVhcyB0aGF0IGxvb2sgbGlrZSB0aGV5IHdvdWxkbid0IGhlbHAgbXVjaCBhdCBhbGw6XG4vLyAgICAgLSByZXBsYWNpbmcgdHJpYWwgZGl2aXNpb24gaW4gcmFuZFRydWVQcmltZV8oKSB3aXRoIGEgc2lldmUgKHRoYXQgc3BlZWRzIHVwIHNvbWV0aGluZyB0YWtpbmcgYWxtb3N0IG5vIHRpbWUgYW55d2F5KVxuLy8gICAgIC0gaW5jcmVhc2UgYnBlIGZyb20gMTUgdG8gMzAgKHRoYXQgd291bGQgaGVscCBpZiB3ZSBoYWQgYSAzMiozMi0+NjQgbXVsdGlwbGllciwgYnV0IG5vdCB3aXRoIEphdmFTY3JpcHQncyAzMiozMi0+MzIpXG4vLyAgICAgLSBzcGVlZGluZyB1cCBtb250Xyh4LHksbixucCkgd2hlbiB4PT15IGJ5IGRvaW5nIGEgbm9uLW1vZHVsYXIsIG5vbi1Nb250Z29tZXJ5IHNxdWFyZVxuLy8gICAgICAgZm9sbG93ZWQgYnkgYSBNb250Z29tZXJ5IHJlZHVjdGlvbi4gIFRoZSBpbnRlcm1lZGlhdGUgYW5zd2VyIHdpbGwgYmUgdHdpY2UgYXMgbG9uZyBhcyB4LCBzbyB0aGF0XG4vLyAgICAgICBtZXRob2Qgd291bGQgYmUgc2xvd2VyLiAgVGhpcyBpcyB1bmZvcnR1bmF0ZSBiZWNhdXNlIHRoZSBjb2RlIGN1cnJlbnRseSBzcGVuZHMgYWxtb3N0IGFsbCBvZiBpdHMgdGltZVxuLy8gICAgICAgZG9pbmcgbW9udF8oeCx4LC4uLiksIGJvdGggZm9yIHJhbmRUcnVlUHJpbWVfKCkgYW5kIHBvd01vZF8oKS4gIEEgZmFzdGVyIG1ldGhvZCBmb3IgTW9udGdvbWVyeSBzcXVhcmluZ1xuLy8gICAgICAgd291bGQgaGF2ZSBhIGxhcmdlIGltcGFjdCBvbiB0aGUgc3BlZWQgb2YgcmFuZFRydWVQcmltZV8oKSBhbmQgcG93TW9kXygpLiAgSEFDIGhhcyBhIGNvdXBsZSBvZiBwb29ybHktd29yZGVkXG4vLyAgICAgICBzZW50ZW5jZXMgdGhhdCBzZWVtIHRvIGltcGx5IGl0J3MgZmFzdGVyIHRvIGRvIGEgbm9uLW1vZHVsYXIgc3F1YXJlIGZvbGxvd2VkIGJ5IGEgc2luZ2xlXG4vLyAgICAgICBNb250Z29tZXJ5IHJlZHVjdGlvbiwgYnV0IHRoYXQncyBvYnZpb3VzbHkgd3JvbmcuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5cbihmdW5jdGlvbiAoKSB7XG4vL2dsb2JhbHNcbmJwZT0wOyAgICAgICAgIC8vYml0cyBzdG9yZWQgcGVyIGFycmF5IGVsZW1lbnRcbm1hc2s9MDsgICAgICAgIC8vQU5EIHRoaXMgd2l0aCBhbiBhcnJheSBlbGVtZW50IHRvIGNob3AgaXQgZG93biB0byBicGUgYml0c1xucmFkaXg9bWFzaysxOyAgLy9lcXVhbHMgMl5icGUuICBBIHNpbmdsZSAxIGJpdCB0byB0aGUgbGVmdCBvZiB0aGUgbGFzdCBiaXQgb2YgbWFzay5cblxuLy90aGUgZGlnaXRzIGZvciBjb252ZXJ0aW5nIHRvIGRpZmZlcmVudCBiYXNlc1xuZGlnaXRzU3RyPScwMTIzNDU2Nzg5QUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5el89IUAjJCVeJiooKVtde318OzosLjw+Lz9gfiBcXFxcXFwnXFxcIistJztcblxuLy9pbml0aWFsaXplIHRoZSBnbG9iYWwgdmFyaWFibGVzXG5mb3IgKGJwZT0wOyAoMTw8KGJwZSsxKSkgPiAoMTw8YnBlKTsgYnBlKyspOyAgLy9icGU9bnVtYmVyIG9mIGJpdHMgaW4gdGhlIG1hbnRpc3NhIG9uIHRoaXMgcGxhdGZvcm1cbmJwZT4+PTE7ICAgICAgICAgICAgICAgICAgIC8vYnBlPW51bWJlciBvZiBiaXRzIGluIG9uZSBlbGVtZW50IG9mIHRoZSBhcnJheSByZXByZXNlbnRpbmcgdGhlIGJpZ0ludFxubWFzaz0oMTw8YnBlKS0xOyAgICAgICAgICAgLy9BTkQgdGhlIG1hc2sgd2l0aCBhbiBpbnRlZ2VyIHRvIGdldCBpdHMgYnBlIGxlYXN0IHNpZ25pZmljYW50IGJpdHNcbnJhZGl4PW1hc2srMTsgICAgICAgICAgICAgIC8vMl5icGUuICBhIHNpbmdsZSAxIGJpdCB0byB0aGUgbGVmdCBvZiB0aGUgZmlyc3QgYml0IG9mIG1hc2tcbm9uZT1pbnQyYmlnSW50KDEsMSwxKTsgICAgIC8vY29uc3RhbnQgdXNlZCBpbiBwb3dNb2RfKClcblxuLy90aGUgZm9sbG93aW5nIGdsb2JhbCB2YXJpYWJsZXMgYXJlIHNjcmF0Y2hwYWQgbWVtb3J5IHRvXG4vL3JlZHVjZSBkeW5hbWljIG1lbW9yeSBhbGxvY2F0aW9uIGluIHRoZSBpbm5lciBsb29wXG50PW5ldyBBcnJheSgwKTtcbnNzPXQ7ICAgICAgIC8vdXNlZCBpbiBtdWx0XygpXG5zMD10OyAgICAgICAvL3VzZWQgaW4gbXVsdE1vZF8oKSwgc3F1YXJlTW9kXygpXG5zMT10OyAgICAgICAvL3VzZWQgaW4gcG93TW9kXygpLCBtdWx0TW9kXygpLCBzcXVhcmVNb2RfKClcbnMyPXQ7ICAgICAgIC8vdXNlZCBpbiBwb3dNb2RfKCksIG11bHRNb2RfKClcbnMzPXQ7ICAgICAgIC8vdXNlZCBpbiBwb3dNb2RfKClcbnM0PXQ7IHM1PXQ7IC8vdXNlZCBpbiBtb2RfKClcbnM2PXQ7ICAgICAgIC8vdXNlZCBpbiBiaWdJbnQyc3RyKClcbnM3PXQ7ICAgICAgIC8vdXNlZCBpbiBwb3dNb2RfKClcblQ9dDsgICAgICAgIC8vdXNlZCBpbiBHQ0RfKClcbnNhPXQ7ICAgICAgIC8vdXNlZCBpbiBtb250XygpXG5tcl94MT10OyBtcl9yPXQ7IG1yX2E9dDsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vdXNlZCBpbiBtaWxsZXJSYWJpbigpXG5lZ192PXQ7IGVnX3U9dDsgZWdfQT10OyBlZ19CPXQ7IGVnX0M9dDsgZWdfRD10OyAgICAgICAgICAgICAgIC8vdXNlZCBpbiBlR0NEXygpLCBpbnZlcnNlTW9kXygpXG5tZF9xMT10OyBtZF9xMj10OyBtZF9xMz10OyBtZF9yPXQ7IG1kX3IxPXQ7IG1kX3IyPXQ7IG1kX3R0PXQ7IC8vdXNlZCBpbiBtb2RfKClcblxucHJpbWVzPXQ7IHBvd3M9dDsgc19pPXQ7IHNfaTI9dDsgc19SPXQ7IHNfcm09dDsgc19xPXQ7IHNfbjE9dDtcbiAgc19hPXQ7IHNfcjI9dDsgc19uPXQ7IHNfYj10OyBzX2Q9dDsgc194MT10OyBzX3gyPXQsIHNfYWE9dDsgLy91c2VkIGluIHJhbmRUcnVlUHJpbWVfKClcblxucnBwcmI9dDsgLy91c2VkIGluIHJhbmRQcm9iUHJpbWVSb3VuZHMoKSAod2hpY2ggYWxzbyB1c2VzIFwicHJpbWVzXCIpXG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuXG4vL3JldHVybiBhcnJheSBvZiBhbGwgcHJpbWVzIGxlc3MgdGhhbiBpbnRlZ2VyIG5cbmZ1bmN0aW9uIGZpbmRQcmltZXMobikge1xuICB2YXIgaSxzLHAsYW5zO1xuICBzPW5ldyBBcnJheShuKTtcbiAgZm9yIChpPTA7aTxuO2krKylcbiAgICBzW2ldPTA7XG4gIHNbMF09MjtcbiAgcD0wOyAgICAvL2ZpcnN0IHAgZWxlbWVudHMgb2YgcyBhcmUgcHJpbWVzLCB0aGUgcmVzdCBhcmUgYSBzaWV2ZVxuICBmb3IoO3NbcF08bjspIHsgICAgICAgICAgICAgICAgICAvL3NbcF0gaXMgdGhlIHB0aCBwcmltZVxuICAgIGZvcihpPXNbcF0qc1twXTsgaTxuOyBpKz1zW3BdKSAvL21hcmsgbXVsdGlwbGVzIG9mIHNbcF1cbiAgICAgIHNbaV09MTtcbiAgICBwKys7XG4gICAgc1twXT1zW3AtMV0rMTtcbiAgICBmb3IoOyBzW3BdPG4gJiYgc1tzW3BdXTsgc1twXSsrKTsgLy9maW5kIG5leHQgcHJpbWUgKHdoZXJlIHNbcF09PTApXG4gIH1cbiAgYW5zPW5ldyBBcnJheShwKTtcbiAgZm9yKGk9MDtpPHA7aSsrKVxuICAgIGFuc1tpXT1zW2ldO1xuICByZXR1cm4gYW5zO1xufVxuXG5cbi8vZG9lcyBhIHNpbmdsZSByb3VuZCBvZiBNaWxsZXItUmFiaW4gYmFzZSBiIGNvbnNpZGVyIHggdG8gYmUgYSBwb3NzaWJsZSBwcmltZT9cbi8veCBpcyBhIGJpZ0ludCwgYW5kIGIgaXMgYW4gaW50ZWdlciwgd2l0aCBiPHhcbmZ1bmN0aW9uIG1pbGxlclJhYmluSW50KHgsYikge1xuICBpZiAobXJfeDEubGVuZ3RoIT14Lmxlbmd0aCkge1xuICAgIG1yX3gxPWR1cCh4KTtcbiAgICBtcl9yPWR1cCh4KTtcbiAgICBtcl9hPWR1cCh4KTtcbiAgfVxuXG4gIGNvcHlJbnRfKG1yX2EsYik7XG4gIHJldHVybiBtaWxsZXJSYWJpbih4LG1yX2EpO1xufVxuXG4vL2RvZXMgYSBzaW5nbGUgcm91bmQgb2YgTWlsbGVyLVJhYmluIGJhc2UgYiBjb25zaWRlciB4IHRvIGJlIGEgcG9zc2libGUgcHJpbWU/XG4vL3ggYW5kIGIgYXJlIGJpZ0ludHMgd2l0aCBiPHhcbmZ1bmN0aW9uIG1pbGxlclJhYmluKHgsYikge1xuICB2YXIgaSxqLGsscztcblxuICBpZiAobXJfeDEubGVuZ3RoIT14Lmxlbmd0aCkge1xuICAgIG1yX3gxPWR1cCh4KTtcbiAgICBtcl9yPWR1cCh4KTtcbiAgICBtcl9hPWR1cCh4KTtcbiAgfVxuXG4gIGNvcHlfKG1yX2EsYik7XG4gIGNvcHlfKG1yX3IseCk7XG4gIGNvcHlfKG1yX3gxLHgpO1xuXG4gIGFkZEludF8obXJfciwtMSk7XG4gIGFkZEludF8obXJfeDEsLTEpO1xuXG4gIC8vcz10aGUgaGlnaGVzdCBwb3dlciBvZiB0d28gdGhhdCBkaXZpZGVzIG1yX3JcbiAgaz0wO1xuICBmb3IgKGk9MDtpPG1yX3IubGVuZ3RoO2krKylcbiAgICBmb3IgKGo9MTtqPG1hc2s7ajw8PTEpXG4gICAgICBpZiAoeFtpXSAmIGopIHtcbiAgICAgICAgcz0oazxtcl9yLmxlbmd0aCticGUgPyBrIDogMCk7XG4gICAgICAgICBpPW1yX3IubGVuZ3RoO1xuICAgICAgICAgaj1tYXNrO1xuICAgICAgfSBlbHNlXG4gICAgICAgIGsrKztcblxuICBpZiAocylcbiAgICByaWdodFNoaWZ0Xyhtcl9yLHMpO1xuXG4gIHBvd01vZF8obXJfYSxtcl9yLHgpO1xuXG4gIGlmICghZXF1YWxzSW50KG1yX2EsMSkgJiYgIWVxdWFscyhtcl9hLG1yX3gxKSkge1xuICAgIGo9MTtcbiAgICB3aGlsZSAoajw9cy0xICYmICFlcXVhbHMobXJfYSxtcl94MSkpIHtcbiAgICAgIHNxdWFyZU1vZF8obXJfYSx4KTtcbiAgICAgIGlmIChlcXVhbHNJbnQobXJfYSwxKSkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH1cbiAgICAgIGorKztcbiAgICB9XG4gICAgaWYgKCFlcXVhbHMobXJfYSxtcl94MSkpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgfVxuICByZXR1cm4gMTtcbn1cblxuLy9yZXR1cm5zIGhvdyBtYW55IGJpdHMgbG9uZyB0aGUgYmlnSW50IGlzLCBub3QgY291bnRpbmcgbGVhZGluZyB6ZXJvcy5cbmZ1bmN0aW9uIGJpdFNpemUoeCkge1xuICB2YXIgaix6LHc7XG4gIGZvciAoaj14Lmxlbmd0aC0xOyAoeFtqXT09MCkgJiYgKGo+MCk7IGotLSk7XG4gIGZvciAoej0wLHc9eFtqXTsgdzsgKHc+Pj0xKSx6KyspO1xuICB6Kz1icGUqajtcbiAgcmV0dXJuIHo7XG59XG5cbi8vcmV0dXJuIGEgY29weSBvZiB4IHdpdGggYXQgbGVhc3QgbiBlbGVtZW50cywgYWRkaW5nIGxlYWRpbmcgemVyb3MgaWYgbmVlZGVkXG5mdW5jdGlvbiBleHBhbmQoeCxuKSB7XG4gIHZhciBhbnM9aW50MmJpZ0ludCgwLCh4Lmxlbmd0aD5uID8geC5sZW5ndGggOiBuKSpicGUsMCk7XG4gIGNvcHlfKGFucyx4KTtcbiAgcmV0dXJuIGFucztcbn1cblxuLy9yZXR1cm4gYSBrLWJpdCB0cnVlIHJhbmRvbSBwcmltZSB1c2luZyBNYXVyZXIncyBhbGdvcml0aG0uXG5mdW5jdGlvbiByYW5kVHJ1ZVByaW1lKGspIHtcbiAgdmFyIGFucz1pbnQyYmlnSW50KDAsaywwKTtcbiAgcmFuZFRydWVQcmltZV8oYW5zLGspO1xuICByZXR1cm4gdHJpbShhbnMsMSk7XG59XG5cbi8vcmV0dXJuIGEgay1iaXQgcmFuZG9tIHByb2JhYmxlIHByaW1lIHdpdGggcHJvYmFiaWxpdHkgb2YgZXJyb3IgPCAyXi04MFxuZnVuY3Rpb24gcmFuZFByb2JQcmltZShrKSB7XG4gIGlmIChrPj02MDApIHJldHVybiByYW5kUHJvYlByaW1lUm91bmRzKGssMik7IC8vbnVtYmVycyBmcm9tIEhBQyB0YWJsZSA0LjNcbiAgaWYgKGs+PTU1MCkgcmV0dXJuIHJhbmRQcm9iUHJpbWVSb3VuZHMoayw0KTtcbiAgaWYgKGs+PTUwMCkgcmV0dXJuIHJhbmRQcm9iUHJpbWVSb3VuZHMoayw1KTtcbiAgaWYgKGs+PTQwMCkgcmV0dXJuIHJhbmRQcm9iUHJpbWVSb3VuZHMoayw2KTtcbiAgaWYgKGs+PTM1MCkgcmV0dXJuIHJhbmRQcm9iUHJpbWVSb3VuZHMoayw3KTtcbiAgaWYgKGs+PTMwMCkgcmV0dXJuIHJhbmRQcm9iUHJpbWVSb3VuZHMoayw5KTtcbiAgaWYgKGs+PTI1MCkgcmV0dXJuIHJhbmRQcm9iUHJpbWVSb3VuZHMoaywxMik7IC8vbnVtYmVycyBmcm9tIEhBQyB0YWJsZSA0LjRcbiAgaWYgKGs+PTIwMCkgcmV0dXJuIHJhbmRQcm9iUHJpbWVSb3VuZHMoaywxNSk7XG4gIGlmIChrPj0xNTApIHJldHVybiByYW5kUHJvYlByaW1lUm91bmRzKGssMTgpO1xuICBpZiAoaz49MTAwKSByZXR1cm4gcmFuZFByb2JQcmltZVJvdW5kcyhrLDI3KTtcbiAgICAgICAgICAgICAgcmV0dXJuIHJhbmRQcm9iUHJpbWVSb3VuZHMoayw0MCk7IC8vbnVtYmVyIGZyb20gSEFDIHJlbWFyayA0LjI2IChvbmx5IGFuIGVzdGltYXRlKVxufVxuXG4vL3JldHVybiBhIGstYml0IHByb2JhYmxlIHJhbmRvbSBwcmltZSB1c2luZyBuIHJvdW5kcyBvZiBNaWxsZXIgUmFiaW4gKGFmdGVyIHRyaWFsIGRpdmlzaW9uIHdpdGggc21hbGwgcHJpbWVzKVxuZnVuY3Rpb24gcmFuZFByb2JQcmltZVJvdW5kcyhrLG4pIHtcbiAgdmFyIGFucywgaSwgZGl2aXNpYmxlLCBCO1xuICBCPTMwMDAwOyAgLy9CIGlzIGxhcmdlc3QgcHJpbWUgdG8gdXNlIGluIHRyaWFsIGRpdmlzaW9uXG4gIGFucz1pbnQyYmlnSW50KDAsaywwKTtcblxuICAvL29wdGltaXphdGlvbjogdHJ5IGxhcmdlciBhbmQgc21hbGxlciBCIHRvIGZpbmQgdGhlIGJlc3QgbGltaXQuXG5cbiAgaWYgKHByaW1lcy5sZW5ndGg9PTApXG4gICAgcHJpbWVzPWZpbmRQcmltZXMoMzAwMDApOyAgLy9jaGVjayBmb3IgZGl2aXNpYmlsaXR5IGJ5IHByaW1lcyA8PTMwMDAwXG5cbiAgaWYgKHJwcHJiLmxlbmd0aCE9YW5zLmxlbmd0aClcbiAgICBycHByYj1kdXAoYW5zKTtcblxuICBmb3IgKDs7KSB7IC8va2VlcCB0cnlpbmcgcmFuZG9tIHZhbHVlcyBmb3IgYW5zIHVudGlsIG9uZSBhcHBlYXJzIHRvIGJlIHByaW1lXG4gICAgLy9vcHRpbWl6YXRpb246IHBpY2sgYSByYW5kb20gbnVtYmVyIHRpbWVzIEw9MiozKjUqLi4uKnAsIHBsdXMgYVxuICAgIC8vICAgcmFuZG9tIGVsZW1lbnQgb2YgdGhlIGxpc3Qgb2YgYWxsIG51bWJlcnMgaW4gWzAsTCkgbm90IGRpdmlzaWJsZSBieSBhbnkgcHJpbWUgdXAgdG8gcC5cbiAgICAvLyAgIFRoaXMgY2FuIHJlZHVjZSB0aGUgYW1vdW50IG9mIHJhbmRvbSBudW1iZXIgZ2VuZXJhdGlvbi5cblxuICAgIHJhbmRCaWdJbnRfKGFucyxrLDApOyAvL2FucyA9IGEgcmFuZG9tIG9kZCBudW1iZXIgdG8gY2hlY2tcbiAgICBhbnNbMF0gfD0gMTtcbiAgICBkaXZpc2libGU9MDtcblxuICAgIC8vY2hlY2sgYW5zIGZvciBkaXZpc2liaWxpdHkgYnkgc21hbGwgcHJpbWVzIHVwIHRvIEJcbiAgICBmb3IgKGk9MDsgKGk8cHJpbWVzLmxlbmd0aCkgJiYgKHByaW1lc1tpXTw9Qik7IGkrKylcbiAgICAgIGlmIChtb2RJbnQoYW5zLHByaW1lc1tpXSk9PTAgJiYgIWVxdWFsc0ludChhbnMscHJpbWVzW2ldKSkge1xuICAgICAgICBkaXZpc2libGU9MTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAvL29wdGltaXphdGlvbjogY2hhbmdlIG1pbGxlclJhYmluIHNvIHRoZSBiYXNlIGNhbiBiZSBiaWdnZXIgdGhhbiB0aGUgbnVtYmVyIGJlaW5nIGNoZWNrZWQsIHRoZW4gZWxpbWluYXRlIHRoZSB3aGlsZSBoZXJlLlxuXG4gICAgLy9kbyBuIHJvdW5kcyBvZiBNaWxsZXIgUmFiaW4sIHdpdGggcmFuZG9tIGJhc2VzIGxlc3MgdGhhbiBhbnNcbiAgICBmb3IgKGk9MDsgaTxuICYmICFkaXZpc2libGU7IGkrKykge1xuICAgICAgcmFuZEJpZ0ludF8ocnBwcmIsaywwKTtcbiAgICAgIHdoaWxlKCFncmVhdGVyKGFucyxycHByYikpIC8vcGljayBhIHJhbmRvbSBycHByYiB0aGF0J3MgPCBhbnNcbiAgICAgICAgcmFuZEJpZ0ludF8ocnBwcmIsaywwKTtcbiAgICAgIGlmICghbWlsbGVyUmFiaW4oYW5zLHJwcHJiKSlcbiAgICAgICAgZGl2aXNpYmxlPTE7XG4gICAgfVxuXG4gICAgaWYoIWRpdmlzaWJsZSlcbiAgICAgIHJldHVybiBhbnM7XG4gIH1cbn1cblxuLy9yZXR1cm4gYSBuZXcgYmlnSW50IGVxdWFsIHRvICh4IG1vZCBuKSBmb3IgYmlnSW50cyB4IGFuZCBuLlxuZnVuY3Rpb24gbW9kKHgsbikge1xuICB2YXIgYW5zPWR1cCh4KTtcbiAgbW9kXyhhbnMsbik7XG4gIHJldHVybiB0cmltKGFucywxKTtcbn1cblxuLy9yZXR1cm4gKHgrbikgd2hlcmUgeCBpcyBhIGJpZ0ludCBhbmQgbiBpcyBhbiBpbnRlZ2VyLlxuZnVuY3Rpb24gYWRkSW50KHgsbikge1xuICB2YXIgYW5zPWV4cGFuZCh4LHgubGVuZ3RoKzEpO1xuICBhZGRJbnRfKGFucyxuKTtcbiAgcmV0dXJuIHRyaW0oYW5zLDEpO1xufVxuXG4vL3JldHVybiB4KnkgZm9yIGJpZ0ludHMgeCBhbmQgeS4gVGhpcyBpcyBmYXN0ZXIgd2hlbiB5PHguXG5mdW5jdGlvbiBtdWx0KHgseSkge1xuICB2YXIgYW5zPWV4cGFuZCh4LHgubGVuZ3RoK3kubGVuZ3RoKTtcbiAgbXVsdF8oYW5zLHkpO1xuICByZXR1cm4gdHJpbShhbnMsMSk7XG59XG5cbi8vcmV0dXJuICh4Kip5IG1vZCBuKSB3aGVyZSB4LHksbiBhcmUgYmlnSW50cyBhbmQgKiogaXMgZXhwb25lbnRpYXRpb24uICAwKiowPTEuIEZhc3RlciBmb3Igb2RkIG4uXG5mdW5jdGlvbiBwb3dNb2QoeCx5LG4pIHtcbiAgdmFyIGFucz1leHBhbmQoeCxuLmxlbmd0aCk7XG4gIHBvd01vZF8oYW5zLHRyaW0oeSwyKSx0cmltKG4sMiksMCk7ICAvL3RoaXMgc2hvdWxkIHdvcmsgd2l0aG91dCB0aGUgdHJpbSwgYnV0IGRvZXNuJ3RcbiAgcmV0dXJuIHRyaW0oYW5zLDEpO1xufVxuXG4vL3JldHVybiAoeC15KSBmb3IgYmlnSW50cyB4IGFuZCB5LiAgTmVnYXRpdmUgYW5zd2VycyB3aWxsIGJlIDJzIGNvbXBsZW1lbnRcbmZ1bmN0aW9uIHN1Yih4LHkpIHtcbiAgdmFyIGFucz1leHBhbmQoeCwoeC5sZW5ndGg+eS5sZW5ndGggPyB4Lmxlbmd0aCsxIDogeS5sZW5ndGgrMSkpO1xuICBzdWJfKGFucyx5KTtcbiAgcmV0dXJuIHRyaW0oYW5zLDEpO1xufVxuXG4vL3JldHVybiAoeCt5KSBmb3IgYmlnSW50cyB4IGFuZCB5LlxuZnVuY3Rpb24gYWRkKHgseSkge1xuICB2YXIgYW5zPWV4cGFuZCh4LCh4Lmxlbmd0aD55Lmxlbmd0aCA/IHgubGVuZ3RoKzEgOiB5Lmxlbmd0aCsxKSk7XG4gIGFkZF8oYW5zLHkpO1xuICByZXR1cm4gdHJpbShhbnMsMSk7XG59XG5cbi8vcmV0dXJuICh4KiooLTEpIG1vZCBuKSBmb3IgYmlnSW50cyB4IGFuZCBuLiAgSWYgbm8gaW52ZXJzZSBleGlzdHMsIGl0IHJldHVybnMgbnVsbFxuZnVuY3Rpb24gaW52ZXJzZU1vZCh4LG4pIHtcbiAgdmFyIGFucz1leHBhbmQoeCxuLmxlbmd0aCk7XG4gIHZhciBzO1xuICBzPWludmVyc2VNb2RfKGFucyxuKTtcbiAgcmV0dXJuIHMgPyB0cmltKGFucywxKSA6IG51bGw7XG59XG5cbi8vcmV0dXJuICh4KnkgbW9kIG4pIGZvciBiaWdJbnRzIHgseSxuLiAgRm9yIGdyZWF0ZXIgc3BlZWQsIGxldCB5PHguXG5mdW5jdGlvbiBtdWx0TW9kKHgseSxuKSB7XG4gIHZhciBhbnM9ZXhwYW5kKHgsbi5sZW5ndGgpO1xuICBtdWx0TW9kXyhhbnMseSxuKTtcbiAgcmV0dXJuIHRyaW0oYW5zLDEpO1xufVxuXG4vL2dlbmVyYXRlIGEgay1iaXQgdHJ1ZSByYW5kb20gcHJpbWUgdXNpbmcgTWF1cmVyJ3MgYWxnb3JpdGhtLFxuLy9hbmQgcHV0IGl0IGludG8gYW5zLiAgVGhlIGJpZ0ludCBhbnMgbXVzdCBiZSBsYXJnZSBlbm91Z2ggdG8gaG9sZCBpdC5cbmZ1bmN0aW9uIHJhbmRUcnVlUHJpbWVfKGFucyxrKSB7XG4gIHZhciBjLG0scG0sZGQsaixyLEIsZGl2aXNpYmxlLHosenoscmVjU2l6ZTtcblxuICBpZiAocHJpbWVzLmxlbmd0aD09MClcbiAgICBwcmltZXM9ZmluZFByaW1lcygzMDAwMCk7ICAvL2NoZWNrIGZvciBkaXZpc2liaWxpdHkgYnkgcHJpbWVzIDw9MzAwMDBcblxuICBpZiAocG93cy5sZW5ndGg9PTApIHtcbiAgICBwb3dzPW5ldyBBcnJheSg1MTIpO1xuICAgIGZvciAoaj0wO2o8NTEyO2orKykge1xuICAgICAgcG93c1tqXT1NYXRoLnBvdygyLGovNTExLi0xLik7XG4gICAgfVxuICB9XG5cbiAgLy9jIGFuZCBtIHNob3VsZCBiZSB0dW5lZCBmb3IgYSBwYXJ0aWN1bGFyIG1hY2hpbmUgYW5kIHZhbHVlIG9mIGssIHRvIG1heGltaXplIHNwZWVkXG4gIGM9MC4xOyAgLy9jPTAuMSBpbiBIQUNcbiAgbT0yMDsgICAvL2dlbmVyYXRlIHRoaXMgay1iaXQgbnVtYmVyIGJ5IGZpcnN0IHJlY3Vyc2l2ZWx5IGdlbmVyYXRpbmcgYSBudW1iZXIgdGhhdCBoYXMgYmV0d2VlbiBrLzIgYW5kIGstbSBiaXRzXG4gIHJlY0xpbWl0PTIwOyAvL3N0b3AgcmVjdXJzaW9uIHdoZW4gayA8PXJlY0xpbWl0LiAgTXVzdCBoYXZlIHJlY0xpbWl0ID49IDJcblxuICBpZiAoc19pMi5sZW5ndGghPWFucy5sZW5ndGgpIHtcbiAgICBzX2kyPWR1cChhbnMpO1xuICAgIHNfUiA9ZHVwKGFucyk7XG4gICAgc19uMT1kdXAoYW5zKTtcbiAgICBzX3IyPWR1cChhbnMpO1xuICAgIHNfZCA9ZHVwKGFucyk7XG4gICAgc194MT1kdXAoYW5zKTtcbiAgICBzX3gyPWR1cChhbnMpO1xuICAgIHNfYiA9ZHVwKGFucyk7XG4gICAgc19uID1kdXAoYW5zKTtcbiAgICBzX2kgPWR1cChhbnMpO1xuICAgIHNfcm09ZHVwKGFucyk7XG4gICAgc19xID1kdXAoYW5zKTtcbiAgICBzX2EgPWR1cChhbnMpO1xuICAgIHNfYWE9ZHVwKGFucyk7XG4gIH1cblxuICBpZiAoayA8PSByZWNMaW1pdCkgeyAgLy9nZW5lcmF0ZSBzbWFsbCByYW5kb20gcHJpbWVzIGJ5IHRyaWFsIGRpdmlzaW9uIHVwIHRvIGl0cyBzcXVhcmUgcm9vdFxuICAgIHBtPSgxPDwoKGsrMik+PjEpKS0xOyAvL3BtIGlzIGJpbmFyeSBudW1iZXIgd2l0aCBhbGwgb25lcywganVzdCBvdmVyIHNxcnQoMl5rKVxuICAgIGNvcHlJbnRfKGFucywwKTtcbiAgICBmb3IgKGRkPTE7ZGQ7KSB7XG4gICAgICBkZD0wO1xuICAgICAgYW5zWzBdPSAxIHwgKDE8PChrLTEpKSB8IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSooMTw8aykpOyAgLy9yYW5kb20sIGstYml0LCBvZGQgaW50ZWdlciwgd2l0aCBtc2IgMVxuICAgICAgZm9yIChqPTE7KGo8cHJpbWVzLmxlbmd0aCkgJiYgKChwcmltZXNbal0mcG0pPT1wcmltZXNbal0pO2orKykgeyAvL3RyaWFsIGRpdmlzaW9uIGJ5IGFsbCBwcmltZXMgMy4uLnNxcnQoMl5rKVxuICAgICAgICBpZiAoMD09KGFuc1swXSVwcmltZXNbal0pKSB7XG4gICAgICAgICAgZGQ9MTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBjYXJyeV8oYW5zKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBCPWMqayprOyAgICAvL3RyeSBzbWFsbCBwcmltZXMgdXAgdG8gQiAob3IgYWxsIHRoZSBwcmltZXNbXSBhcnJheSBpZiB0aGUgbGFyZ2VzdCBpcyBsZXNzIHRoYW4gQikuXG4gIGlmIChrPjIqbSkgIC8vZ2VuZXJhdGUgdGhpcyBrLWJpdCBudW1iZXIgYnkgZmlyc3QgcmVjdXJzaXZlbHkgZ2VuZXJhdGluZyBhIG51bWJlciB0aGF0IGhhcyBiZXR3ZWVuIGsvMiBhbmQgay1tIGJpdHNcbiAgICBmb3IgKHI9MTsgay1rKnI8PW07IClcbiAgICAgIHI9cG93c1tNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqNTEyKV07ICAgLy9yPU1hdGgucG93KDIsTWF0aC5yYW5kb20oKS0xKTtcbiAgZWxzZVxuICAgIHI9LjU7XG5cbiAgLy9zaW11bGF0aW9uIHN1Z2dlc3RzIHRoZSBtb3JlIGNvbXBsZXggYWxnb3JpdGhtIHVzaW5nIHI9LjMzMyBpcyBvbmx5IHNsaWdodGx5IGZhc3Rlci5cblxuICByZWNTaXplPU1hdGguZmxvb3IociprKSsxO1xuXG4gIHJhbmRUcnVlUHJpbWVfKHNfcSxyZWNTaXplKTtcbiAgY29weUludF8oc19pMiwwKTtcbiAgc19pMltNYXRoLmZsb29yKChrLTIpL2JwZSldIHw9ICgxPDwoKGstMiklYnBlKSk7ICAgLy9zX2kyPTJeKGstMilcbiAgZGl2aWRlXyhzX2kyLHNfcSxzX2ksc19ybSk7ICAgICAgICAgICAgICAgICAgICAgICAgLy9zX2k9Zmxvb3IoKDJeKGstMSkpLygycSkpXG5cbiAgej1iaXRTaXplKHNfaSk7XG5cbiAgZm9yICg7Oykge1xuICAgIGZvciAoOzspIHsgIC8vZ2VuZXJhdGUgei1iaXQgbnVtYmVycyB1bnRpbCBvbmUgZmFsbHMgaW4gdGhlIHJhbmdlIFswLHNfaS0xXVxuICAgICAgcmFuZEJpZ0ludF8oc19SLHosMCk7XG4gICAgICBpZiAoZ3JlYXRlcihzX2ksc19SKSlcbiAgICAgICAgYnJlYWs7XG4gICAgfSAgICAgICAgICAgICAgICAvL25vdyBzX1IgaXMgaW4gdGhlIHJhbmdlIFswLHNfaS0xXVxuICAgIGFkZEludF8oc19SLDEpOyAgLy9ub3cgc19SIGlzIGluIHRoZSByYW5nZSBbMSxzX2ldXG4gICAgYWRkXyhzX1Isc19pKTsgICAvL25vdyBzX1IgaXMgaW4gdGhlIHJhbmdlIFtzX2krMSwyKnNfaV1cblxuICAgIGNvcHlfKHNfbixzX3EpO1xuICAgIG11bHRfKHNfbixzX1IpO1xuICAgIG11bHRJbnRfKHNfbiwyKTtcbiAgICBhZGRJbnRfKHNfbiwxKTsgICAgLy9zX249MipzX1Iqc19xKzFcblxuICAgIGNvcHlfKHNfcjIsc19SKTtcbiAgICBtdWx0SW50XyhzX3IyLDIpOyAgLy9zX3IyPTIqc19SXG5cbiAgICAvL2NoZWNrIHNfbiBmb3IgZGl2aXNpYmlsaXR5IGJ5IHNtYWxsIHByaW1lcyB1cCB0byBCXG4gICAgZm9yIChkaXZpc2libGU9MCxqPTA7IChqPHByaW1lcy5sZW5ndGgpICYmIChwcmltZXNbal08Qik7IGorKylcbiAgICAgIGlmIChtb2RJbnQoc19uLHByaW1lc1tqXSk9PTAgJiYgIWVxdWFsc0ludChzX24scHJpbWVzW2pdKSkge1xuICAgICAgICBkaXZpc2libGU9MTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICBpZiAoIWRpdmlzaWJsZSkgICAgLy9pZiBpdCBwYXNzZXMgc21hbGwgcHJpbWVzIGNoZWNrLCB0aGVuIHRyeSBhIHNpbmdsZSBNaWxsZXItUmFiaW4gYmFzZSAyXG4gICAgICBpZiAoIW1pbGxlclJhYmluSW50KHNfbiwyKSkgLy90aGlzIGxpbmUgcmVwcmVzZW50cyA3NSUgb2YgdGhlIHRvdGFsIHJ1bnRpbWUgZm9yIHJhbmRUcnVlUHJpbWVfXG4gICAgICAgIGRpdmlzaWJsZT0xO1xuXG4gICAgaWYgKCFkaXZpc2libGUpIHsgIC8vaWYgaXQgcGFzc2VzIHRoYXQgdGVzdCwgY29udGludWUgY2hlY2tpbmcgc19uXG4gICAgICBhZGRJbnRfKHNfbiwtMyk7XG4gICAgICBmb3IgKGo9c19uLmxlbmd0aC0xOyhzX25bal09PTApICYmIChqPjApOyBqLS0pOyAgLy9zdHJpcCBsZWFkaW5nIHplcm9zXG4gICAgICBmb3IgKHp6PTAsdz1zX25bal07IHc7ICh3Pj49MSksenorKyk7XG4gICAgICB6eis9YnBlKmo7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvL3p6PW51bWJlciBvZiBiaXRzIGluIHNfbiwgaWdub3JpbmcgbGVhZGluZyB6ZXJvc1xuICAgICAgZm9yICg7OykgeyAgLy9nZW5lcmF0ZSB6LWJpdCBudW1iZXJzIHVudGlsIG9uZSBmYWxscyBpbiB0aGUgcmFuZ2UgWzAsc19uLTFdXG4gICAgICAgIHJhbmRCaWdJbnRfKHNfYSx6eiwwKTtcbiAgICAgICAgaWYgKGdyZWF0ZXIoc19uLHNfYSkpXG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9ICAgICAgICAgICAgICAgIC8vbm93IHNfYSBpcyBpbiB0aGUgcmFuZ2UgWzAsc19uLTFdXG4gICAgICBhZGRJbnRfKHNfbiwzKTsgIC8vbm93IHNfYSBpcyBpbiB0aGUgcmFuZ2UgWzAsc19uLTRdXG4gICAgICBhZGRJbnRfKHNfYSwyKTsgIC8vbm93IHNfYSBpcyBpbiB0aGUgcmFuZ2UgWzIsc19uLTJdXG4gICAgICBjb3B5XyhzX2Isc19hKTtcbiAgICAgIGNvcHlfKHNfbjEsc19uKTtcbiAgICAgIGFkZEludF8oc19uMSwtMSk7XG4gICAgICBwb3dNb2RfKHNfYixzX24xLHNfbik7ICAgLy9zX2I9c19hXihzX24tMSkgbW9kdWxvIHNfblxuICAgICAgYWRkSW50XyhzX2IsLTEpO1xuICAgICAgaWYgKGlzWmVybyhzX2IpKSB7XG4gICAgICAgIGNvcHlfKHNfYixzX2EpO1xuICAgICAgICBwb3dNb2RfKHNfYixzX3IyLHNfbik7XG4gICAgICAgIGFkZEludF8oc19iLC0xKTtcbiAgICAgICAgY29weV8oc19hYSxzX24pO1xuICAgICAgICBjb3B5XyhzX2Qsc19iKTtcbiAgICAgICAgR0NEXyhzX2Qsc19uKTsgIC8vaWYgc19iIGFuZCBzX24gYXJlIHJlbGF0aXZlbHkgcHJpbWUsIHRoZW4gc19uIGlzIGEgcHJpbWVcbiAgICAgICAgaWYgKGVxdWFsc0ludChzX2QsMSkpIHtcbiAgICAgICAgICBjb3B5XyhhbnMsc19hYSk7XG4gICAgICAgICAgcmV0dXJuOyAgICAgLy9pZiB3ZSd2ZSBtYWRlIGl0IHRoaXMgZmFyLCB0aGVuIHNfbiBpcyBhYnNvbHV0ZWx5IGd1YXJhbnRlZWQgdG8gYmUgcHJpbWVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vL1JldHVybiBhbiBuLWJpdCByYW5kb20gQmlnSW50IChuPj0xKS4gIElmIHM9MSwgdGhlbiB0aGUgbW9zdCBzaWduaWZpY2FudCBvZiB0aG9zZSBuIGJpdHMgaXMgc2V0IHRvIDEuXG5mdW5jdGlvbiByYW5kQmlnSW50KG4scykge1xuICB2YXIgYSxiO1xuICBhPU1hdGguZmxvb3IoKG4tMSkvYnBlKSsyOyAvLyMgYXJyYXkgZWxlbWVudHMgdG8gaG9sZCB0aGUgQmlnSW50IHdpdGggYSBsZWFkaW5nIDAgZWxlbWVudFxuICBiPWludDJiaWdJbnQoMCwwLGEpO1xuICByYW5kQmlnSW50XyhiLG4scyk7XG4gIHJldHVybiBiO1xufVxuXG4vL1NldCBiIHRvIGFuIG4tYml0IHJhbmRvbSBCaWdJbnQuICBJZiBzPTEsIHRoZW4gdGhlIG1vc3Qgc2lnbmlmaWNhbnQgb2YgdGhvc2UgbiBiaXRzIGlzIHNldCB0byAxLlxuLy9BcnJheSBiIG11c3QgYmUgYmlnIGVub3VnaCB0byBob2xkIHRoZSByZXN1bHQuIE11c3QgaGF2ZSBuPj0xXG5mdW5jdGlvbiByYW5kQmlnSW50XyhiLG4scykge1xuICB2YXIgaSxhO1xuICBmb3IgKGk9MDtpPGIubGVuZ3RoO2krKylcbiAgICBiW2ldPTA7XG4gIGE9TWF0aC5mbG9vcigobi0xKS9icGUpKzE7IC8vIyBhcnJheSBlbGVtZW50cyB0byBob2xkIHRoZSBCaWdJbnRcbiAgZm9yIChpPTA7aTxhO2krKykge1xuICAgIGJbaV09TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKigxPDwoYnBlLTEpKSk7XG4gIH1cbiAgYlthLTFdICY9ICgyPDwoKG4tMSklYnBlKSktMTtcbiAgaWYgKHM9PTEpXG4gICAgYlthLTFdIHw9ICgxPDwoKG4tMSklYnBlKSk7XG59XG5cbi8vUmV0dXJuIHRoZSBncmVhdGVzdCBjb21tb24gZGl2aXNvciBvZiBiaWdJbnRzIHggYW5kIHkgKGVhY2ggd2l0aCBzYW1lIG51bWJlciBvZiBlbGVtZW50cykuXG5mdW5jdGlvbiBHQ0QoeCx5KSB7XG4gIHZhciB4Yyx5YztcbiAgeGM9ZHVwKHgpO1xuICB5Yz1kdXAoeSk7XG4gIEdDRF8oeGMseWMpO1xuICByZXR1cm4geGM7XG59XG5cbi8vc2V0IHggdG8gdGhlIGdyZWF0ZXN0IGNvbW1vbiBkaXZpc29yIG9mIGJpZ0ludHMgeCBhbmQgeSAoZWFjaCB3aXRoIHNhbWUgbnVtYmVyIG9mIGVsZW1lbnRzKS5cbi8veSBpcyBkZXN0cm95ZWQuXG5mdW5jdGlvbiBHQ0RfKHgseSkge1xuICB2YXIgaSx4cCx5cCxBLEIsQyxELHEsc2luZztcbiAgaWYgKFQubGVuZ3RoIT14Lmxlbmd0aClcbiAgICBUPWR1cCh4KTtcblxuICBzaW5nPTE7XG4gIHdoaWxlIChzaW5nKSB7IC8vd2hpbGUgeSBoYXMgbm9uemVybyBlbGVtZW50cyBvdGhlciB0aGFuIHlbMF1cbiAgICBzaW5nPTA7XG4gICAgZm9yIChpPTE7aTx5Lmxlbmd0aDtpKyspIC8vY2hlY2sgaWYgeSBoYXMgbm9uemVybyBlbGVtZW50cyBvdGhlciB0aGFuIDBcbiAgICAgIGlmICh5W2ldKSB7XG4gICAgICAgIHNpbmc9MTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgaWYgKCFzaW5nKSBicmVhazsgLy9xdWl0IHdoZW4geSBhbGwgemVybyBlbGVtZW50cyBleGNlcHQgcG9zc2libHkgeVswXVxuXG4gICAgZm9yIChpPXgubGVuZ3RoOyF4W2ldICYmIGk+PTA7aS0tKTsgIC8vZmluZCBtb3N0IHNpZ25pZmljYW50IGVsZW1lbnQgb2YgeFxuICAgIHhwPXhbaV07XG4gICAgeXA9eVtpXTtcbiAgICBBPTE7IEI9MDsgQz0wOyBEPTE7XG4gICAgd2hpbGUgKCh5cCtDKSAmJiAoeXArRCkpIHtcbiAgICAgIHEgPU1hdGguZmxvb3IoKHhwK0EpLyh5cCtDKSk7XG4gICAgICBxcD1NYXRoLmZsb29yKCh4cCtCKS8oeXArRCkpO1xuICAgICAgaWYgKHEhPXFwKVxuICAgICAgICBicmVhaztcbiAgICAgIHQ9IEEtcSpDOyAgIEE9QzsgICBDPXQ7ICAgIC8vICBkbyAoQSxCLHhwLCBDLEQseXApID0gKEMsRCx5cCwgQSxCLHhwKSAtIHEqKDAsMCwwLCBDLEQseXApXG4gICAgICB0PSBCLXEqRDsgICBCPUQ7ICAgRD10O1xuICAgICAgdD14cC1xKnlwOyB4cD15cDsgeXA9dDtcbiAgICB9XG4gICAgaWYgKEIpIHtcbiAgICAgIGNvcHlfKFQseCk7XG4gICAgICBsaW5Db21iXyh4LHksQSxCKTsgLy94PUEqeCtCKnlcbiAgICAgIGxpbkNvbWJfKHksVCxELEMpOyAvL3k9RCp5K0MqVFxuICAgIH0gZWxzZSB7XG4gICAgICBtb2RfKHgseSk7XG4gICAgICBjb3B5XyhULHgpO1xuICAgICAgY29weV8oeCx5KTtcbiAgICAgIGNvcHlfKHksVCk7XG4gICAgfVxuICB9XG4gIGlmICh5WzBdPT0wKVxuICAgIHJldHVybjtcbiAgdD1tb2RJbnQoeCx5WzBdKTtcbiAgY29weUludF8oeCx5WzBdKTtcbiAgeVswXT10O1xuICB3aGlsZSAoeVswXSkge1xuICAgIHhbMF0lPXlbMF07XG4gICAgdD14WzBdOyB4WzBdPXlbMF07IHlbMF09dDtcbiAgfVxufVxuXG4vL2RvIHg9eCoqKC0xKSBtb2QgbiwgZm9yIGJpZ0ludHMgeCBhbmQgbi5cbi8vSWYgbm8gaW52ZXJzZSBleGlzdHMsIGl0IHNldHMgeCB0byB6ZXJvIGFuZCByZXR1cm5zIDAsIGVsc2UgaXQgcmV0dXJucyAxLlxuLy9UaGUgeCBhcnJheSBtdXN0IGJlIGF0IGxlYXN0IGFzIGxhcmdlIGFzIHRoZSBuIGFycmF5LlxuZnVuY3Rpb24gaW52ZXJzZU1vZF8oeCxuKSB7XG4gIHZhciBrPTErMipNYXRoLm1heCh4Lmxlbmd0aCxuLmxlbmd0aCk7XG5cbiAgaWYoISh4WzBdJjEpICAmJiAhKG5bMF0mMSkpIHsgIC8vaWYgYm90aCBpbnB1dHMgYXJlIGV2ZW4sIHRoZW4gaW52ZXJzZSBkb2Vzbid0IGV4aXN0XG4gICAgY29weUludF8oeCwwKTtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIGlmIChlZ191Lmxlbmd0aCE9aykge1xuICAgIGVnX3U9bmV3IEFycmF5KGspO1xuICAgIGVnX3Y9bmV3IEFycmF5KGspO1xuICAgIGVnX0E9bmV3IEFycmF5KGspO1xuICAgIGVnX0I9bmV3IEFycmF5KGspO1xuICAgIGVnX0M9bmV3IEFycmF5KGspO1xuICAgIGVnX0Q9bmV3IEFycmF5KGspO1xuICB9XG5cbiAgY29weV8oZWdfdSx4KTtcbiAgY29weV8oZWdfdixuKTtcbiAgY29weUludF8oZWdfQSwxKTtcbiAgY29weUludF8oZWdfQiwwKTtcbiAgY29weUludF8oZWdfQywwKTtcbiAgY29weUludF8oZWdfRCwxKTtcbiAgZm9yICg7Oykge1xuICAgIHdoaWxlKCEoZWdfdVswXSYxKSkgeyAgLy93aGlsZSBlZ191IGlzIGV2ZW5cbiAgICAgIGhhbHZlXyhlZ191KTtcbiAgICAgIGlmICghKGVnX0FbMF0mMSkgJiYgIShlZ19CWzBdJjEpKSB7IC8vaWYgZWdfQT09ZWdfQj09MCBtb2QgMlxuICAgICAgICBoYWx2ZV8oZWdfQSk7XG4gICAgICAgIGhhbHZlXyhlZ19CKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFkZF8oZWdfQSxuKTsgIGhhbHZlXyhlZ19BKTtcbiAgICAgICAgc3ViXyhlZ19CLHgpOyAgaGFsdmVfKGVnX0IpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHdoaWxlICghKGVnX3ZbMF0mMSkpIHsgIC8vd2hpbGUgZWdfdiBpcyBldmVuXG4gICAgICBoYWx2ZV8oZWdfdik7XG4gICAgICBpZiAoIShlZ19DWzBdJjEpICYmICEoZWdfRFswXSYxKSkgeyAvL2lmIGVnX0M9PWVnX0Q9PTAgbW9kIDJcbiAgICAgICAgaGFsdmVfKGVnX0MpO1xuICAgICAgICBoYWx2ZV8oZWdfRCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhZGRfKGVnX0Msbik7ICBoYWx2ZV8oZWdfQyk7XG4gICAgICAgIHN1Yl8oZWdfRCx4KTsgIGhhbHZlXyhlZ19EKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWdyZWF0ZXIoZWdfdixlZ191KSkgeyAvL2VnX3YgPD0gZWdfdVxuICAgICAgc3ViXyhlZ191LGVnX3YpO1xuICAgICAgc3ViXyhlZ19BLGVnX0MpO1xuICAgICAgc3ViXyhlZ19CLGVnX0QpO1xuICAgIH0gZWxzZSB7ICAgICAgICAgICAgICAgICAgIC8vZWdfdiA+IGVnX3VcbiAgICAgIHN1Yl8oZWdfdixlZ191KTtcbiAgICAgIHN1Yl8oZWdfQyxlZ19BKTtcbiAgICAgIHN1Yl8oZWdfRCxlZ19CKTtcbiAgICB9XG5cbiAgICBpZiAoZXF1YWxzSW50KGVnX3UsMCkpIHtcbiAgICAgIGlmIChuZWdhdGl2ZShlZ19DKSkgLy9tYWtlIHN1cmUgYW5zd2VyIGlzIG5vbm5lZ2F0aXZlXG4gICAgICAgIGFkZF8oZWdfQyxuKTtcbiAgICAgIGNvcHlfKHgsZWdfQyk7XG5cbiAgICAgIGlmICghZXF1YWxzSW50KGVnX3YsMSkpIHsgLy9pZiBHQ0RfKHgsbikhPTEsIHRoZW4gdGhlcmUgaXMgbm8gaW52ZXJzZVxuICAgICAgICBjb3B5SW50Xyh4LDApO1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH1cbiAgICAgIHJldHVybiAxO1xuICAgIH1cbiAgfVxufVxuXG4vL3JldHVybiB4KiooLTEpIG1vZCBuLCBmb3IgaW50ZWdlcnMgeCBhbmQgbi4gIFJldHVybiAwIGlmIHRoZXJlIGlzIG5vIGludmVyc2VcbmZ1bmN0aW9uIGludmVyc2VNb2RJbnQoeCxuKSB7XG4gIHZhciBhPTEsYj0wLHQ7XG4gIGZvciAoOzspIHtcbiAgICBpZiAoeD09MSkgcmV0dXJuIGE7XG4gICAgaWYgKHg9PTApIHJldHVybiAwO1xuICAgIGItPWEqTWF0aC5mbG9vcihuL3gpO1xuICAgIG4lPXg7XG5cbiAgICBpZiAobj09MSkgcmV0dXJuIGI7IC8vdG8gYXZvaWQgbmVnYXRpdmVzLCBjaGFuZ2UgdGhpcyBiIHRvIG4tYiwgYW5kIGVhY2ggLT0gdG8gKz1cbiAgICBpZiAobj09MCkgcmV0dXJuIDA7XG4gICAgYS09YipNYXRoLmZsb29yKHgvbik7XG4gICAgeCU9bjtcbiAgfVxufVxuXG4vL3RoaXMgZGVwcmVjYXRlZCBmdW5jdGlvbiBpcyBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eSBvbmx5LlxuZnVuY3Rpb24gaW52ZXJzZU1vZEludF8oeCxuKSB7XG4gICByZXR1cm4gaW52ZXJzZU1vZEludCh4LG4pO1xufVxuXG5cbi8vR2l2ZW4gcG9zaXRpdmUgYmlnSW50cyB4IGFuZCB5LCBjaGFuZ2UgdGhlIGJpZ2ludHMgdiwgYSwgYW5kIGIgdG8gcG9zaXRpdmUgYmlnSW50cyBzdWNoIHRoYXQ6XG4vLyAgICAgdiA9IEdDRF8oeCx5KSA9IGEqeC1iKnlcbi8vVGhlIGJpZ0ludHMgdiwgYSwgYiwgbXVzdCBoYXZlIGV4YWN0bHkgYXMgbWFueSBlbGVtZW50cyBhcyB0aGUgbGFyZ2VyIG9mIHggYW5kIHkuXG5mdW5jdGlvbiBlR0NEXyh4LHksdixhLGIpIHtcbiAgdmFyIGc9MDtcbiAgdmFyIGs9TWF0aC5tYXgoeC5sZW5ndGgseS5sZW5ndGgpO1xuICBpZiAoZWdfdS5sZW5ndGghPWspIHtcbiAgICBlZ191PW5ldyBBcnJheShrKTtcbiAgICBlZ19BPW5ldyBBcnJheShrKTtcbiAgICBlZ19CPW5ldyBBcnJheShrKTtcbiAgICBlZ19DPW5ldyBBcnJheShrKTtcbiAgICBlZ19EPW5ldyBBcnJheShrKTtcbiAgfVxuICB3aGlsZSghKHhbMF0mMSkgICYmICEoeVswXSYxKSkgeyAgLy93aGlsZSB4IGFuZCB5IGJvdGggZXZlblxuICAgIGhhbHZlXyh4KTtcbiAgICBoYWx2ZV8oeSk7XG4gICAgZysrO1xuICB9XG4gIGNvcHlfKGVnX3UseCk7XG4gIGNvcHlfKHYseSk7XG4gIGNvcHlJbnRfKGVnX0EsMSk7XG4gIGNvcHlJbnRfKGVnX0IsMCk7XG4gIGNvcHlJbnRfKGVnX0MsMCk7XG4gIGNvcHlJbnRfKGVnX0QsMSk7XG4gIGZvciAoOzspIHtcbiAgICB3aGlsZSghKGVnX3VbMF0mMSkpIHsgIC8vd2hpbGUgdSBpcyBldmVuXG4gICAgICBoYWx2ZV8oZWdfdSk7XG4gICAgICBpZiAoIShlZ19BWzBdJjEpICYmICEoZWdfQlswXSYxKSkgeyAvL2lmIEE9PUI9PTAgbW9kIDJcbiAgICAgICAgaGFsdmVfKGVnX0EpO1xuICAgICAgICBoYWx2ZV8oZWdfQik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhZGRfKGVnX0EseSk7ICBoYWx2ZV8oZWdfQSk7XG4gICAgICAgIHN1Yl8oZWdfQix4KTsgIGhhbHZlXyhlZ19CKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB3aGlsZSAoISh2WzBdJjEpKSB7ICAvL3doaWxlIHYgaXMgZXZlblxuICAgICAgaGFsdmVfKHYpO1xuICAgICAgaWYgKCEoZWdfQ1swXSYxKSAmJiAhKGVnX0RbMF0mMSkpIHsgLy9pZiBDPT1EPT0wIG1vZCAyXG4gICAgICAgIGhhbHZlXyhlZ19DKTtcbiAgICAgICAgaGFsdmVfKGVnX0QpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWRkXyhlZ19DLHkpOyAgaGFsdmVfKGVnX0MpO1xuICAgICAgICBzdWJfKGVnX0QseCk7ICBoYWx2ZV8oZWdfRCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFncmVhdGVyKHYsZWdfdSkpIHsgLy92PD11XG4gICAgICBzdWJfKGVnX3Usdik7XG4gICAgICBzdWJfKGVnX0EsZWdfQyk7XG4gICAgICBzdWJfKGVnX0IsZWdfRCk7XG4gICAgfSBlbHNlIHsgICAgICAgICAgICAgICAgLy92PnVcbiAgICAgIHN1Yl8odixlZ191KTtcbiAgICAgIHN1Yl8oZWdfQyxlZ19BKTtcbiAgICAgIHN1Yl8oZWdfRCxlZ19CKTtcbiAgICB9XG4gICAgaWYgKGVxdWFsc0ludChlZ191LDApKSB7XG4gICAgICBpZiAobmVnYXRpdmUoZWdfQykpIHsgICAvL21ha2Ugc3VyZSBhIChDKWlzIG5vbm5lZ2F0aXZlXG4gICAgICAgIGFkZF8oZWdfQyx5KTtcbiAgICAgICAgc3ViXyhlZ19ELHgpO1xuICAgICAgfVxuICAgICAgbXVsdEludF8oZWdfRCwtMSk7ICAvLy9tYWtlIHN1cmUgYiAoRCkgaXMgbm9ubmVnYXRpdmVcbiAgICAgIGNvcHlfKGEsZWdfQyk7XG4gICAgICBjb3B5XyhiLGVnX0QpO1xuICAgICAgbGVmdFNoaWZ0Xyh2LGcpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxufVxuXG5cbi8vaXMgYmlnSW50IHggbmVnYXRpdmU/XG5mdW5jdGlvbiBuZWdhdGl2ZSh4KSB7XG4gIHJldHVybiAoKHhbeC5sZW5ndGgtMV0+PihicGUtMSkpJjEpO1xufVxuXG5cbi8vaXMgKHggPDwgKHNoaWZ0KmJwZSkpID4geT9cbi8veCBhbmQgeSBhcmUgbm9ubmVnYXRpdmUgYmlnSW50c1xuLy9zaGlmdCBpcyBhIG5vbm5lZ2F0aXZlIGludGVnZXJcbmZ1bmN0aW9uIGdyZWF0ZXJTaGlmdCh4LHksc2hpZnQpIHtcbiAgdmFyIGksIGt4PXgubGVuZ3RoLCBreT15Lmxlbmd0aDtcbiAgaz0oKGt4K3NoaWZ0KTxreSkgPyAoa3grc2hpZnQpIDoga3k7XG4gIGZvciAoaT1reS0xLXNoaWZ0OyBpPGt4ICYmIGk+PTA7IGkrKylcbiAgICBpZiAoeFtpXT4wKVxuICAgICAgcmV0dXJuIDE7IC8vaWYgdGhlcmUgYXJlIG5vbnplcm9zIGluIHggdG8gdGhlIGxlZnQgb2YgdGhlIGZpcnN0IGNvbHVtbiBvZiB5LCB0aGVuIHggaXMgYmlnZ2VyXG4gIGZvciAoaT1reC0xK3NoaWZ0OyBpPGt5OyBpKyspXG4gICAgaWYgKHlbaV0+MClcbiAgICAgIHJldHVybiAwOyAvL2lmIHRoZXJlIGFyZSBub256ZXJvcyBpbiB5IHRvIHRoZSBsZWZ0IG9mIHRoZSBmaXJzdCBjb2x1bW4gb2YgeCwgdGhlbiB4IGlzIG5vdCBiaWdnZXJcbiAgZm9yIChpPWstMTsgaT49c2hpZnQ7IGktLSlcbiAgICBpZiAgICAgICh4W2ktc2hpZnRdPnlbaV0pIHJldHVybiAxO1xuICAgIGVsc2UgaWYgKHhbaS1zaGlmdF08eVtpXSkgcmV0dXJuIDA7XG4gIHJldHVybiAwO1xufVxuXG4vL2lzIHggPiB5PyAoeCBhbmQgeSBib3RoIG5vbm5lZ2F0aXZlKVxuZnVuY3Rpb24gZ3JlYXRlcih4LHkpIHtcbiAgdmFyIGk7XG4gIHZhciBrPSh4Lmxlbmd0aDx5Lmxlbmd0aCkgPyB4Lmxlbmd0aCA6IHkubGVuZ3RoO1xuXG4gIGZvciAoaT14Lmxlbmd0aDtpPHkubGVuZ3RoO2krKylcbiAgICBpZiAoeVtpXSlcbiAgICAgIHJldHVybiAwOyAgLy95IGhhcyBtb3JlIGRpZ2l0c1xuXG4gIGZvciAoaT15Lmxlbmd0aDtpPHgubGVuZ3RoO2krKylcbiAgICBpZiAoeFtpXSlcbiAgICAgIHJldHVybiAxOyAgLy94IGhhcyBtb3JlIGRpZ2l0c1xuXG4gIGZvciAoaT1rLTE7aT49MDtpLS0pXG4gICAgaWYgKHhbaV0+eVtpXSlcbiAgICAgIHJldHVybiAxO1xuICAgIGVsc2UgaWYgKHhbaV08eVtpXSlcbiAgICAgIHJldHVybiAwO1xuICByZXR1cm4gMDtcbn1cblxuLy9kaXZpZGUgeCBieSB5IGdpdmluZyBxdW90aWVudCBxIGFuZCByZW1haW5kZXIgci4gIChxPWZsb29yKHgveSksICByPXggbW9kIHkpLiAgQWxsIDQgYXJlIGJpZ2ludHMuXG4vL3ggbXVzdCBoYXZlIGF0IGxlYXN0IG9uZSBsZWFkaW5nIHplcm8gZWxlbWVudC5cbi8veSBtdXN0IGJlIG5vbnplcm8uXG4vL3EgYW5kIHIgbXVzdCBiZSBhcnJheXMgdGhhdCBhcmUgZXhhY3RseSB0aGUgc2FtZSBsZW5ndGggYXMgeC4gKE9yIHEgY2FuIGhhdmUgbW9yZSkuXG4vL011c3QgaGF2ZSB4Lmxlbmd0aCA+PSB5Lmxlbmd0aCA+PSAyLlxuZnVuY3Rpb24gZGl2aWRlXyh4LHkscSxyKSB7XG4gIHZhciBreCwga3k7XG4gIHZhciBpLGoseTEseTIsYyxhLGI7XG4gIGNvcHlfKHIseCk7XG4gIGZvciAoa3k9eS5sZW5ndGg7eVtreS0xXT09MDtreS0tKTsgLy9reSBpcyBudW1iZXIgb2YgZWxlbWVudHMgaW4geSwgbm90IGluY2x1ZGluZyBsZWFkaW5nIHplcm9zXG5cbiAgLy9ub3JtYWxpemU6IGVuc3VyZSB0aGUgbW9zdCBzaWduaWZpY2FudCBlbGVtZW50IG9mIHkgaGFzIGl0cyBoaWdoZXN0IGJpdCBzZXRcbiAgYj15W2t5LTFdO1xuICBmb3IgKGE9MDsgYjsgYSsrKVxuICAgIGI+Pj0xO1xuICBhPWJwZS1hOyAgLy9hIGlzIGhvdyBtYW55IGJpdHMgdG8gc2hpZnQgc28gdGhhdCB0aGUgaGlnaCBvcmRlciBiaXQgb2YgeSBpcyBsZWZ0bW9zdCBpbiBpdHMgYXJyYXkgZWxlbWVudFxuICBsZWZ0U2hpZnRfKHksYSk7ICAvL211bHRpcGx5IGJvdGggYnkgMTw8YSBub3csIHRoZW4gZGl2aWRlIGJvdGggYnkgdGhhdCBhdCB0aGUgZW5kXG4gIGxlZnRTaGlmdF8ocixhKTtcblxuICAvL1JvYiBWaXNzZXIgZGlzY292ZXJlZCBhIGJ1ZzogdGhlIGZvbGxvd2luZyBsaW5lIHdhcyBvcmlnaW5hbGx5IGp1c3QgYmVmb3JlIHRoZSBub3JtYWxpemF0aW9uLlxuICBmb3IgKGt4PXIubGVuZ3RoO3Jba3gtMV09PTAgJiYga3g+a3k7a3gtLSk7IC8va3ggaXMgbnVtYmVyIG9mIGVsZW1lbnRzIGluIG5vcm1hbGl6ZWQgeCwgbm90IGluY2x1ZGluZyBsZWFkaW5nIHplcm9zXG5cbiAgY29weUludF8ocSwwKTsgICAgICAgICAgICAgICAgICAgICAgLy8gcT0wXG4gIHdoaWxlICghZ3JlYXRlclNoaWZ0KHkscixreC1reSkpIHsgIC8vIHdoaWxlIChsZWZ0U2hpZnRfKHksa3gta3kpIDw9IHIpIHtcbiAgICBzdWJTaGlmdF8ocix5LGt4LWt5KTsgICAgICAgICAgICAgLy8gICByPXItbGVmdFNoaWZ0Xyh5LGt4LWt5KVxuICAgIHFba3gta3ldKys7ICAgICAgICAgICAgICAgICAgICAgICAvLyAgIHFba3gta3ldKys7XG4gIH0gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIH1cblxuICBmb3IgKGk9a3gtMTsgaT49a3k7IGktLSkge1xuICAgIGlmIChyW2ldPT15W2t5LTFdKVxuICAgICAgcVtpLWt5XT1tYXNrO1xuICAgIGVsc2VcbiAgICAgIHFbaS1reV09TWF0aC5mbG9vcigocltpXSpyYWRpeCtyW2ktMV0pL3lba3ktMV0pO1xuXG4gICAgLy9UaGUgZm9sbG93aW5nIGZvcig7OykgbG9vcCBpcyBlcXVpdmFsZW50IHRvIHRoZSBjb21tZW50ZWQgd2hpbGUgbG9vcCxcbiAgICAvL2V4Y2VwdCB0aGF0IHRoZSB1bmNvbW1lbnRlZCB2ZXJzaW9uIGF2b2lkcyBvdmVyZmxvdy5cbiAgICAvL1RoZSBjb21tZW50ZWQgbG9vcCBjb21lcyBmcm9tIEhBQywgd2hpY2ggYXNzdW1lcyByWy0xXT09eVstMV09PTBcbiAgICAvLyAgd2hpbGUgKHFbaS1reV0qKHlba3ktMV0qcmFkaXgreVtreS0yXSkgPiByW2ldKnJhZGl4KnJhZGl4K3JbaS0xXSpyYWRpeCtyW2ktMl0pXG4gICAgLy8gICAgcVtpLWt5XS0tO1xuICAgIGZvciAoOzspIHtcbiAgICAgIHkyPShreT4xID8geVtreS0yXSA6IDApKnFbaS1reV07XG4gICAgICBjPXkyPj5icGU7XG4gICAgICB5Mj15MiAmIG1hc2s7XG4gICAgICB5MT1jK3FbaS1reV0qeVtreS0xXTtcbiAgICAgIGM9eTE+PmJwZTtcbiAgICAgIHkxPXkxICYgbWFzaztcblxuICAgICAgaWYgKGM9PXJbaV0gPyB5MT09cltpLTFdID8geTI+KGk+MSA/IHJbaS0yXSA6IDApIDogeTE+cltpLTFdIDogYz5yW2ldKVxuICAgICAgICBxW2kta3ldLS07XG4gICAgICBlbHNlXG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGxpbkNvbWJTaGlmdF8ocix5LC1xW2kta3ldLGkta3kpOyAgICAvL3I9ci1xW2kta3ldKmxlZnRTaGlmdF8oeSxpLWt5KVxuICAgIGlmIChuZWdhdGl2ZShyKSkge1xuICAgICAgYWRkU2hpZnRfKHIseSxpLWt5KTsgICAgICAgICAvL3I9citsZWZ0U2hpZnRfKHksaS1reSlcbiAgICAgIHFbaS1reV0tLTtcbiAgICB9XG4gIH1cblxuICByaWdodFNoaWZ0Xyh5LGEpOyAgLy91bmRvIHRoZSBub3JtYWxpemF0aW9uIHN0ZXBcbiAgcmlnaHRTaGlmdF8ocixhKTsgIC8vdW5kbyB0aGUgbm9ybWFsaXphdGlvbiBzdGVwXG59XG5cbi8vZG8gY2FycmllcyBhbmQgYm9ycm93cyBzbyBlYWNoIGVsZW1lbnQgb2YgdGhlIGJpZ0ludCB4IGZpdHMgaW4gYnBlIGJpdHMuXG5mdW5jdGlvbiBjYXJyeV8oeCkge1xuICB2YXIgaSxrLGMsYjtcbiAgaz14Lmxlbmd0aDtcbiAgYz0wO1xuICBmb3IgKGk9MDtpPGs7aSsrKSB7XG4gICAgYys9eFtpXTtcbiAgICBiPTA7XG4gICAgaWYgKGM8MCkge1xuICAgICAgYj0tKGM+PmJwZSk7XG4gICAgICBjKz1iKnJhZGl4O1xuICAgIH1cbiAgICB4W2ldPWMgJiBtYXNrO1xuICAgIGM9KGM+PmJwZSktYjtcbiAgfVxufVxuXG4vL3JldHVybiB4IG1vZCBuIGZvciBiaWdJbnQgeCBhbmQgaW50ZWdlciBuLlxuZnVuY3Rpb24gbW9kSW50KHgsbikge1xuICB2YXIgaSxjPTA7XG4gIGZvciAoaT14Lmxlbmd0aC0xOyBpPj0wOyBpLS0pXG4gICAgYz0oYypyYWRpeCt4W2ldKSVuO1xuICByZXR1cm4gYztcbn1cblxuLy9jb252ZXJ0IHRoZSBpbnRlZ2VyIHQgaW50byBhIGJpZ0ludCB3aXRoIGF0IGxlYXN0IHRoZSBnaXZlbiBudW1iZXIgb2YgYml0cy5cbi8vdGhlIHJldHVybmVkIGFycmF5IHN0b3JlcyB0aGUgYmlnSW50IGluIGJwZS1iaXQgY2h1bmtzLCBsaXR0bGUgZW5kaWFuIChidWZmWzBdIGlzIGxlYXN0IHNpZ25pZmljYW50IHdvcmQpXG4vL1BhZCB0aGUgYXJyYXkgd2l0aCBsZWFkaW5nIHplcm9zIHNvIHRoYXQgaXQgaGFzIGF0IGxlYXN0IG1pblNpemUgZWxlbWVudHMuXG4vL1RoZXJlIHdpbGwgYWx3YXlzIGJlIGF0IGxlYXN0IG9uZSBsZWFkaW5nIDAgZWxlbWVudC5cbmZ1bmN0aW9uIGludDJiaWdJbnQodCxiaXRzLG1pblNpemUpIHtcbiAgdmFyIGksaztcbiAgaz1NYXRoLmNlaWwoYml0cy9icGUpKzE7XG4gIGs9bWluU2l6ZT5rID8gbWluU2l6ZSA6IGs7XG4gIGJ1ZmY9bmV3IEFycmF5KGspO1xuICBjb3B5SW50XyhidWZmLHQpO1xuICByZXR1cm4gYnVmZjtcbn1cblxuLy9yZXR1cm4gdGhlIGJpZ0ludCBnaXZlbiBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBpbiBhIGdpdmVuIGJhc2UuXG4vL1BhZCB0aGUgYXJyYXkgd2l0aCBsZWFkaW5nIHplcm9zIHNvIHRoYXQgaXQgaGFzIGF0IGxlYXN0IG1pblNpemUgZWxlbWVudHMuXG4vL0lmIGJhc2U9LTEsIHRoZW4gaXQgcmVhZHMgaW4gYSBzcGFjZS1zZXBhcmF0ZWQgbGlzdCBvZiBhcnJheSBlbGVtZW50cyBpbiBkZWNpbWFsLlxuLy9UaGUgYXJyYXkgd2lsbCBhbHdheXMgaGF2ZSBhdCBsZWFzdCBvbmUgbGVhZGluZyB6ZXJvLCB1bmxlc3MgYmFzZT0tMS5cbmZ1bmN0aW9uIHN0cjJiaWdJbnQocyxiLG1pblNpemUpIHtcbiAgdmFyIGQsIGksIGosIGJhc2UsIHN0ciwgeCwgeSwga2s7XG4gIGlmICh0eXBlb2YgYiA9PT0gJ3N0cmluZycpIHtcblx0ICBiYXNlID0gYi5sZW5ndGg7XG5cdCAgc3RyID0gYjtcbiAgfSBlbHNlIHtcblx0ICBiYXNlID0gYjtcblx0ICBzdHIgPSBkaWdpdHNTdHI7XG4gIH1cbiAgdmFyIGs9cy5sZW5ndGg7XG4gIGlmIChiYXNlPT0tMSkgeyAvL2NvbW1hLXNlcGFyYXRlZCBsaXN0IG9mIGFycmF5IGVsZW1lbnRzIGluIGRlY2ltYWxcbiAgICB4PW5ldyBBcnJheSgwKTtcbiAgICBmb3IgKDs7KSB7XG4gICAgICB5PW5ldyBBcnJheSh4Lmxlbmd0aCsxKTtcbiAgICAgIGZvciAoaT0wO2k8eC5sZW5ndGg7aSsrKVxuICAgICAgICB5W2krMV09eFtpXTtcbiAgICAgIHlbMF09cGFyc2VJbnQocywxMCk7XG4gICAgICB4PXk7XG4gICAgICBkPXMuaW5kZXhPZignLCcsMCk7XG4gICAgICBpZiAoZDwxKVxuICAgICAgICBicmVhaztcbiAgICAgIHM9cy5zdWJzdHJpbmcoZCsxKTtcbiAgICAgIGlmIChzLmxlbmd0aD09MClcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGlmICh4Lmxlbmd0aDxtaW5TaXplKSB7XG4gICAgICB5PW5ldyBBcnJheShtaW5TaXplKTtcbiAgICAgIGNvcHlfKHkseCk7XG4gICAgICByZXR1cm4geTtcbiAgICB9XG4gICAgcmV0dXJuIHg7XG4gIH1cblxuICB4PWludDJiaWdJbnQoMCxiYXNlKmssMCk7XG4gIGZvciAoaT0wO2k8aztpKyspIHtcbiAgICBkPXN0ci5pbmRleE9mKHMuc3Vic3RyaW5nKGksaSsxKSwwKTtcbi8vICAgIGlmIChiYXNlPD0zNiAmJiBkPj0zNikgIC8vY29udmVydCBsb3dlcmNhc2UgdG8gdXBwZXJjYXNlIGlmIGJhc2U8PTM2XG4vLyAgICAgIGQtPTI2O1xuICAgIGlmIChkPj1iYXNlIHx8IGQ8MCkgeyAgIC8vaWdub3JlIGlsbGVnYWwgY2hhcmFjdGVyc1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIG11bHRJbnRfKHgsYmFzZSk7XG4gICAgYWRkSW50Xyh4LGQpO1xuICB9XG5cbiAgZm9yIChrPXgubGVuZ3RoO2s+MCAmJiAheFtrLTFdO2stLSk7IC8vc3RyaXAgb2ZmIGxlYWRpbmcgemVyb3NcbiAgaz1taW5TaXplPmsrMSA/IG1pblNpemUgOiBrKzE7XG4gIHk9bmV3IEFycmF5KGspO1xuICBraz1rPHgubGVuZ3RoID8gayA6IHgubGVuZ3RoO1xuICBmb3IgKGk9MDtpPGtrO2krKylcbiAgICB5W2ldPXhbaV07XG4gIGZvciAoO2k8aztpKyspXG4gICAgeVtpXT0wO1xuICByZXR1cm4geTtcbn1cblxuLy9pcyBiaWdpbnQgeCBlcXVhbCB0byBpbnRlZ2VyIHk/XG4vL3kgbXVzdCBoYXZlIGxlc3MgdGhhbiBicGUgYml0c1xuZnVuY3Rpb24gZXF1YWxzSW50KHgseSkge1xuICB2YXIgaTtcbiAgaWYgKHhbMF0hPXkpXG4gICAgcmV0dXJuIDA7XG4gIGZvciAoaT0xO2k8eC5sZW5ndGg7aSsrKVxuICAgIGlmICh4W2ldKVxuICAgICAgcmV0dXJuIDA7XG4gIHJldHVybiAxO1xufVxuXG4vL2FyZSBiaWdpbnRzIHggYW5kIHkgZXF1YWw/XG4vL3RoaXMgd29ya3MgZXZlbiBpZiB4IGFuZCB5IGFyZSBkaWZmZXJlbnQgbGVuZ3RocyBhbmQgaGF2ZSBhcmJpdHJhcmlseSBtYW55IGxlYWRpbmcgemVyb3NcbmZ1bmN0aW9uIGVxdWFscyh4LHkpIHtcbiAgdmFyIGk7XG4gIHZhciBrPXgubGVuZ3RoPHkubGVuZ3RoID8geC5sZW5ndGggOiB5Lmxlbmd0aDtcbiAgZm9yIChpPTA7aTxrO2krKylcbiAgICBpZiAoeFtpXSE9eVtpXSlcbiAgICAgIHJldHVybiAwO1xuICBpZiAoeC5sZW5ndGg+eS5sZW5ndGgpIHtcbiAgICBmb3IgKDtpPHgubGVuZ3RoO2krKylcbiAgICAgIGlmICh4W2ldKVxuICAgICAgICByZXR1cm4gMDtcbiAgfSBlbHNlIHtcbiAgICBmb3IgKDtpPHkubGVuZ3RoO2krKylcbiAgICAgIGlmICh5W2ldKVxuICAgICAgICByZXR1cm4gMDtcbiAgfVxuICByZXR1cm4gMTtcbn1cblxuLy9pcyB0aGUgYmlnSW50IHggZXF1YWwgdG8gemVybz9cbmZ1bmN0aW9uIGlzWmVybyh4KSB7XG4gIHZhciBpO1xuICBmb3IgKGk9MDtpPHgubGVuZ3RoO2krKylcbiAgICBpZiAoeFtpXSlcbiAgICAgIHJldHVybiAwO1xuICByZXR1cm4gMTtcbn1cblxuLy9jb252ZXJ0IGEgYmlnSW50IGludG8gYSBzdHJpbmcgaW4gYSBnaXZlbiBiYXNlLCBmcm9tIGJhc2UgMiB1cCB0byBiYXNlIDk1LlxuLy9CYXNlIC0xIHByaW50cyB0aGUgY29udGVudHMgb2YgdGhlIGFycmF5IHJlcHJlc2VudGluZyB0aGUgbnVtYmVyLlxuZnVuY3Rpb24gYmlnSW50MnN0cih4LGIpIHtcbiAgdmFyIGksdCxiYXNlLHN0cixzPVwiXCI7XG4gIGlmICh0eXBlb2YgYiA9PT0gJ3N0cmluZycpIHtcblx0ICBiYXNlID0gYi5sZW5ndGg7XG5cdCAgc3RyID0gYjtcbiAgfSBlbHNlIHtcblx0ICBiYXNlID0gYjtcblx0ICBzdHIgPSBkaWdpdHNTdHI7XG4gIH1cblxuICBpZiAoczYubGVuZ3RoIT14Lmxlbmd0aClcbiAgICBzNj1kdXAoeCk7XG4gIGVsc2VcbiAgICBjb3B5XyhzNix4KTtcblxuICBpZiAoYmFzZT09LTEpIHsgLy9yZXR1cm4gdGhlIGxpc3Qgb2YgYXJyYXkgY29udGVudHNcbiAgICBmb3IgKGk9eC5sZW5ndGgtMTtpPjA7aS0tKVxuICAgICAgcys9eFtpXSsnLCc7XG4gICAgcys9eFswXTtcbiAgfVxuICBlbHNlIHsgLy9yZXR1cm4gaXQgaW4gdGhlIGdpdmVuIGJhc2VcbiAgICB3aGlsZSAoIWlzWmVybyhzNikpIHtcbiAgICAgIHQ9ZGl2SW50XyhzNixiYXNlKTsgIC8vdD1zNiAlIGJhc2U7IHM2PWZsb29yKHM2L2Jhc2UpO1xuICAgICAgcz1zdHIuc3Vic3RyaW5nKHQsdCsxKStzO1xuICAgIH1cbiAgfVxuICBpZiAocy5sZW5ndGg9PTApXG4gICAgcz1zdHJbMF07XG4gIHJldHVybiBzO1xufVxuXG4vL3JldHVybnMgYSBkdXBsaWNhdGUgb2YgYmlnSW50IHhcbmZ1bmN0aW9uIGR1cCh4KSB7XG4gIHZhciBpO1xuICBidWZmPW5ldyBBcnJheSh4Lmxlbmd0aCk7XG4gIGNvcHlfKGJ1ZmYseCk7XG4gIHJldHVybiBidWZmO1xufVxuXG4vL2RvIHg9eSBvbiBiaWdJbnRzIHggYW5kIHkuICB4IG11c3QgYmUgYW4gYXJyYXkgYXQgbGVhc3QgYXMgYmlnIGFzIHkgKG5vdCBjb3VudGluZyB0aGUgbGVhZGluZyB6ZXJvcyBpbiB5KS5cbmZ1bmN0aW9uIGNvcHlfKHgseSkge1xuICB2YXIgaTtcbiAgdmFyIGs9eC5sZW5ndGg8eS5sZW5ndGggPyB4Lmxlbmd0aCA6IHkubGVuZ3RoO1xuICBmb3IgKGk9MDtpPGs7aSsrKVxuICAgIHhbaV09eVtpXTtcbiAgZm9yIChpPWs7aTx4Lmxlbmd0aDtpKyspXG4gICAgeFtpXT0wO1xufVxuXG4vL2RvIHg9eSBvbiBiaWdJbnQgeCBhbmQgaW50ZWdlciB5LlxuZnVuY3Rpb24gY29weUludF8oeCxuKSB7XG4gIHZhciBpLGM7XG4gIGZvciAoYz1uLGk9MDtpPHgubGVuZ3RoO2krKykge1xuICAgIHhbaV09YyAmIG1hc2s7XG4gICAgYz4+PWJwZTtcbiAgfVxufVxuXG4vL2RvIHg9eCtuIHdoZXJlIHggaXMgYSBiaWdJbnQgYW5kIG4gaXMgYW4gaW50ZWdlci5cbi8veCBtdXN0IGJlIGxhcmdlIGVub3VnaCB0byBob2xkIHRoZSByZXN1bHQuXG5mdW5jdGlvbiBhZGRJbnRfKHgsbikge1xuICB2YXIgaSxrLGMsYjtcbiAgeFswXSs9bjtcbiAgaz14Lmxlbmd0aDtcbiAgYz0wO1xuICBmb3IgKGk9MDtpPGs7aSsrKSB7XG4gICAgYys9eFtpXTtcbiAgICBiPTA7XG4gICAgaWYgKGM8MCkge1xuICAgICAgYj0tKGM+PmJwZSk7XG4gICAgICBjKz1iKnJhZGl4O1xuICAgIH1cbiAgICB4W2ldPWMgJiBtYXNrO1xuICAgIGM9KGM+PmJwZSktYjtcbiAgICBpZiAoIWMpIHJldHVybjsgLy9zdG9wIGNhcnJ5aW5nIGFzIHNvb24gYXMgdGhlIGNhcnJ5IGlzIHplcm9cbiAgfVxufVxuXG4vL3JpZ2h0IHNoaWZ0IGJpZ0ludCB4IGJ5IG4gYml0cy4gIDAgPD0gbiA8IGJwZS5cbmZ1bmN0aW9uIHJpZ2h0U2hpZnRfKHgsbikge1xuICB2YXIgaTtcbiAgdmFyIGs9TWF0aC5mbG9vcihuL2JwZSk7XG4gIGlmIChrKSB7XG4gICAgZm9yIChpPTA7aTx4Lmxlbmd0aC1rO2krKykgLy9yaWdodCBzaGlmdCB4IGJ5IGsgZWxlbWVudHNcbiAgICAgIHhbaV09eFtpK2tdO1xuICAgIGZvciAoO2k8eC5sZW5ndGg7aSsrKVxuICAgICAgeFtpXT0wO1xuICAgIG4lPWJwZTtcbiAgfVxuICBmb3IgKGk9MDtpPHgubGVuZ3RoLTE7aSsrKSB7XG4gICAgeFtpXT1tYXNrICYgKCh4W2krMV08PChicGUtbikpIHwgKHhbaV0+Pm4pKTtcbiAgfVxuICB4W2ldPj49bjtcbn1cblxuLy9kbyB4PWZsb29yKHx4fC8yKSpzZ24oeCkgZm9yIGJpZ0ludCB4IGluIDIncyBjb21wbGVtZW50XG5mdW5jdGlvbiBoYWx2ZV8oeCkge1xuICB2YXIgaTtcbiAgZm9yIChpPTA7aTx4Lmxlbmd0aC0xO2krKykge1xuICAgIHhbaV09bWFzayAmICgoeFtpKzFdPDwoYnBlLTEpKSB8ICh4W2ldPj4xKSk7XG4gIH1cbiAgeFtpXT0oeFtpXT4+MSkgfCAoeFtpXSAmIChyYWRpeD4+MSkpOyAgLy9tb3N0IHNpZ25pZmljYW50IGJpdCBzdGF5cyB0aGUgc2FtZVxufVxuXG4vL2xlZnQgc2hpZnQgYmlnSW50IHggYnkgbiBiaXRzLlxuZnVuY3Rpb24gbGVmdFNoaWZ0Xyh4LG4pIHtcbiAgdmFyIGk7XG4gIHZhciBrPU1hdGguZmxvb3Iobi9icGUpO1xuICBpZiAoaykge1xuICAgIGZvciAoaT14Lmxlbmd0aDsgaT49azsgaS0tKSAvL2xlZnQgc2hpZnQgeCBieSBrIGVsZW1lbnRzXG4gICAgICB4W2ldPXhbaS1rXTtcbiAgICBmb3IgKDtpPj0wO2ktLSlcbiAgICAgIHhbaV09MDtcbiAgICBuJT1icGU7XG4gIH1cbiAgaWYgKCFuKVxuICAgIHJldHVybjtcbiAgZm9yIChpPXgubGVuZ3RoLTE7aT4wO2ktLSkge1xuICAgIHhbaV09bWFzayAmICgoeFtpXTw8bikgfCAoeFtpLTFdPj4oYnBlLW4pKSk7XG4gIH1cbiAgeFtpXT1tYXNrICYgKHhbaV08PG4pO1xufVxuXG4vL2RvIHg9eCpuIHdoZXJlIHggaXMgYSBiaWdJbnQgYW5kIG4gaXMgYW4gaW50ZWdlci5cbi8veCBtdXN0IGJlIGxhcmdlIGVub3VnaCB0byBob2xkIHRoZSByZXN1bHQuXG5mdW5jdGlvbiBtdWx0SW50Xyh4LG4pIHtcbiAgdmFyIGksayxjLGI7XG4gIGlmICghbilcbiAgICByZXR1cm47XG4gIGs9eC5sZW5ndGg7XG4gIGM9MDtcbiAgZm9yIChpPTA7aTxrO2krKykge1xuICAgIGMrPXhbaV0qbjtcbiAgICBiPTA7XG4gICAgaWYgKGM8MCkge1xuICAgICAgYj0tKGM+PmJwZSk7XG4gICAgICBjKz1iKnJhZGl4O1xuICAgIH1cbiAgICB4W2ldPWMgJiBtYXNrO1xuICAgIGM9KGM+PmJwZSktYjtcbiAgfVxufVxuXG4vL2RvIHg9Zmxvb3IoeC9uKSBmb3IgYmlnSW50IHggYW5kIGludGVnZXIgbiwgYW5kIHJldHVybiB0aGUgcmVtYWluZGVyXG5mdW5jdGlvbiBkaXZJbnRfKHgsbikge1xuICB2YXIgaSxyPTAscztcbiAgZm9yIChpPXgubGVuZ3RoLTE7aT49MDtpLS0pIHtcbiAgICBzPXIqcmFkaXgreFtpXTtcbiAgICB4W2ldPU1hdGguZmxvb3Iocy9uKTtcbiAgICByPXMlbjtcbiAgfVxuICByZXR1cm4gcjtcbn1cblxuLy9kbyB0aGUgbGluZWFyIGNvbWJpbmF0aW9uIHg9YSp4K2IqeSBmb3IgYmlnSW50cyB4IGFuZCB5LCBhbmQgaW50ZWdlcnMgYSBhbmQgYi5cbi8veCBtdXN0IGJlIGxhcmdlIGVub3VnaCB0byBob2xkIHRoZSBhbnN3ZXIuXG5mdW5jdGlvbiBsaW5Db21iXyh4LHksYSxiKSB7XG4gIHZhciBpLGMsayxraztcbiAgaz14Lmxlbmd0aDx5Lmxlbmd0aCA/IHgubGVuZ3RoIDogeS5sZW5ndGg7XG4gIGtrPXgubGVuZ3RoO1xuICBmb3IgKGM9MCxpPTA7aTxrO2krKykge1xuICAgIGMrPWEqeFtpXStiKnlbaV07XG4gICAgeFtpXT1jICYgbWFzaztcbiAgICBjPj49YnBlO1xuICB9XG4gIGZvciAoaT1rO2k8a2s7aSsrKSB7XG4gICAgYys9YSp4W2ldO1xuICAgIHhbaV09YyAmIG1hc2s7XG4gICAgYz4+PWJwZTtcbiAgfVxufVxuXG4vL2RvIHRoZSBsaW5lYXIgY29tYmluYXRpb24geD1hKngrYiooeTw8KHlzKmJwZSkpIGZvciBiaWdJbnRzIHggYW5kIHksIGFuZCBpbnRlZ2VycyBhLCBiIGFuZCB5cy5cbi8veCBtdXN0IGJlIGxhcmdlIGVub3VnaCB0byBob2xkIHRoZSBhbnN3ZXIuXG5mdW5jdGlvbiBsaW5Db21iU2hpZnRfKHgseSxiLHlzKSB7XG4gIHZhciBpLGMsayxraztcbiAgaz14Lmxlbmd0aDx5cyt5Lmxlbmd0aCA/IHgubGVuZ3RoIDogeXMreS5sZW5ndGg7XG4gIGtrPXgubGVuZ3RoO1xuICBmb3IgKGM9MCxpPXlzO2k8aztpKyspIHtcbiAgICBjKz14W2ldK2IqeVtpLXlzXTtcbiAgICB4W2ldPWMgJiBtYXNrO1xuICAgIGM+Pj1icGU7XG4gIH1cbiAgZm9yIChpPWs7YyAmJiBpPGtrO2krKykge1xuICAgIGMrPXhbaV07XG4gICAgeFtpXT1jICYgbWFzaztcbiAgICBjPj49YnBlO1xuICB9XG59XG5cbi8vZG8geD14Kyh5PDwoeXMqYnBlKSkgZm9yIGJpZ0ludHMgeCBhbmQgeSwgYW5kIGludGVnZXJzIGEsYiBhbmQgeXMuXG4vL3ggbXVzdCBiZSBsYXJnZSBlbm91Z2ggdG8gaG9sZCB0aGUgYW5zd2VyLlxuZnVuY3Rpb24gYWRkU2hpZnRfKHgseSx5cykge1xuICB2YXIgaSxjLGssa2s7XG4gIGs9eC5sZW5ndGg8eXMreS5sZW5ndGggPyB4Lmxlbmd0aCA6IHlzK3kubGVuZ3RoO1xuICBraz14Lmxlbmd0aDtcbiAgZm9yIChjPTAsaT15cztpPGs7aSsrKSB7XG4gICAgYys9eFtpXSt5W2kteXNdO1xuICAgIHhbaV09YyAmIG1hc2s7XG4gICAgYz4+PWJwZTtcbiAgfVxuICBmb3IgKGk9aztjICYmIGk8a2s7aSsrKSB7XG4gICAgYys9eFtpXTtcbiAgICB4W2ldPWMgJiBtYXNrO1xuICAgIGM+Pj1icGU7XG4gIH1cbn1cblxuLy9kbyB4PXgtKHk8PCh5cypicGUpKSBmb3IgYmlnSW50cyB4IGFuZCB5LCBhbmQgaW50ZWdlcnMgYSxiIGFuZCB5cy5cbi8veCBtdXN0IGJlIGxhcmdlIGVub3VnaCB0byBob2xkIHRoZSBhbnN3ZXIuXG5mdW5jdGlvbiBzdWJTaGlmdF8oeCx5LHlzKSB7XG4gIHZhciBpLGMsayxraztcbiAgaz14Lmxlbmd0aDx5cyt5Lmxlbmd0aCA/IHgubGVuZ3RoIDogeXMreS5sZW5ndGg7XG4gIGtrPXgubGVuZ3RoO1xuICBmb3IgKGM9MCxpPXlzO2k8aztpKyspIHtcbiAgICBjKz14W2ldLXlbaS15c107XG4gICAgeFtpXT1jICYgbWFzaztcbiAgICBjPj49YnBlO1xuICB9XG4gIGZvciAoaT1rO2MgJiYgaTxraztpKyspIHtcbiAgICBjKz14W2ldO1xuICAgIHhbaV09YyAmIG1hc2s7XG4gICAgYz4+PWJwZTtcbiAgfVxufVxuXG4vL2RvIHg9eC15IGZvciBiaWdJbnRzIHggYW5kIHkuXG4vL3ggbXVzdCBiZSBsYXJnZSBlbm91Z2ggdG8gaG9sZCB0aGUgYW5zd2VyLlxuLy9uZWdhdGl2ZSBhbnN3ZXJzIHdpbGwgYmUgMnMgY29tcGxlbWVudFxuZnVuY3Rpb24gc3ViXyh4LHkpIHtcbiAgdmFyIGksYyxrLGtrO1xuICBrPXgubGVuZ3RoPHkubGVuZ3RoID8geC5sZW5ndGggOiB5Lmxlbmd0aDtcbiAgZm9yIChjPTAsaT0wO2k8aztpKyspIHtcbiAgICBjKz14W2ldLXlbaV07XG4gICAgeFtpXT1jICYgbWFzaztcbiAgICBjPj49YnBlO1xuICB9XG4gIGZvciAoaT1rO2MgJiYgaTx4Lmxlbmd0aDtpKyspIHtcbiAgICBjKz14W2ldO1xuICAgIHhbaV09YyAmIG1hc2s7XG4gICAgYz4+PWJwZTtcbiAgfVxufVxuXG4vL2RvIHg9eCt5IGZvciBiaWdJbnRzIHggYW5kIHkuXG4vL3ggbXVzdCBiZSBsYXJnZSBlbm91Z2ggdG8gaG9sZCB0aGUgYW5zd2VyLlxuZnVuY3Rpb24gYWRkXyh4LHkpIHtcbiAgdmFyIGksYyxrLGtrO1xuICBrPXgubGVuZ3RoPHkubGVuZ3RoID8geC5sZW5ndGggOiB5Lmxlbmd0aDtcbiAgZm9yIChjPTAsaT0wO2k8aztpKyspIHtcbiAgICBjKz14W2ldK3lbaV07XG4gICAgeFtpXT1jICYgbWFzaztcbiAgICBjPj49YnBlO1xuICB9XG4gIGZvciAoaT1rO2MgJiYgaTx4Lmxlbmd0aDtpKyspIHtcbiAgICBjKz14W2ldO1xuICAgIHhbaV09YyAmIG1hc2s7XG4gICAgYz4+PWJwZTtcbiAgfVxufVxuXG4vL2RvIHg9eCp5IGZvciBiaWdJbnRzIHggYW5kIHkuICBUaGlzIGlzIGZhc3RlciB3aGVuIHk8eC5cbmZ1bmN0aW9uIG11bHRfKHgseSkge1xuICB2YXIgaTtcbiAgaWYgKHNzLmxlbmd0aCE9Mip4Lmxlbmd0aClcbiAgICBzcz1uZXcgQXJyYXkoMip4Lmxlbmd0aCk7XG4gIGNvcHlJbnRfKHNzLDApO1xuICBmb3IgKGk9MDtpPHkubGVuZ3RoO2krKylcbiAgICBpZiAoeVtpXSlcbiAgICAgIGxpbkNvbWJTaGlmdF8oc3MseCx5W2ldLGkpOyAgIC8vc3M9MSpzcyt5W2ldKih4PDwoaSpicGUpKVxuICBjb3B5Xyh4LHNzKTtcbn1cblxuLy9kbyB4PXggbW9kIG4gZm9yIGJpZ0ludHMgeCBhbmQgbi5cbmZ1bmN0aW9uIG1vZF8oeCxuKSB7XG4gIGlmIChzNC5sZW5ndGghPXgubGVuZ3RoKVxuICAgIHM0PWR1cCh4KTtcbiAgZWxzZVxuICAgIGNvcHlfKHM0LHgpO1xuICBpZiAoczUubGVuZ3RoIT14Lmxlbmd0aClcbiAgICBzNT1kdXAoeCk7XG4gIGRpdmlkZV8oczQsbixzNSx4KTsgIC8veCA9IHJlbWFpbmRlciBvZiBzNCAvIG5cbn1cblxuLy9kbyB4PXgqeSBtb2QgbiBmb3IgYmlnSW50cyB4LHksbi5cbi8vZm9yIGdyZWF0ZXIgc3BlZWQsIGxldCB5PHguXG5mdW5jdGlvbiBtdWx0TW9kXyh4LHksbikge1xuICB2YXIgaTtcbiAgaWYgKHMwLmxlbmd0aCE9Mip4Lmxlbmd0aClcbiAgICBzMD1uZXcgQXJyYXkoMip4Lmxlbmd0aCk7XG4gIGNvcHlJbnRfKHMwLDApO1xuICBmb3IgKGk9MDtpPHkubGVuZ3RoO2krKylcbiAgICBpZiAoeVtpXSlcbiAgICAgIGxpbkNvbWJTaGlmdF8oczAseCx5W2ldLGkpOyAgIC8vczA9MSpzMCt5W2ldKih4PDwoaSpicGUpKVxuICBtb2RfKHMwLG4pO1xuICBjb3B5Xyh4LHMwKTtcbn1cblxuLy9kbyB4PXgqeCBtb2QgbiBmb3IgYmlnSW50cyB4LG4uXG5mdW5jdGlvbiBzcXVhcmVNb2RfKHgsbikge1xuICB2YXIgaSxqLGQsYyxreCxrbixrO1xuICBmb3IgKGt4PXgubGVuZ3RoOyBreD4wICYmICF4W2t4LTFdOyBreC0tKTsgIC8vaWdub3JlIGxlYWRpbmcgemVyb3MgaW4geFxuICBrPWt4Pm4ubGVuZ3RoID8gMipreCA6IDIqbi5sZW5ndGg7IC8vaz0jIGVsZW1lbnRzIGluIHRoZSBwcm9kdWN0LCB3aGljaCBpcyB0d2ljZSB0aGUgZWxlbWVudHMgaW4gdGhlIGxhcmdlciBvZiB4IGFuZCBuXG4gIGlmIChzMC5sZW5ndGghPWspXG4gICAgczA9bmV3IEFycmF5KGspO1xuICBjb3B5SW50XyhzMCwwKTtcbiAgZm9yIChpPTA7aTxreDtpKyspIHtcbiAgICBjPXMwWzIqaV0reFtpXSp4W2ldO1xuICAgIHMwWzIqaV09YyAmIG1hc2s7XG4gICAgYz4+PWJwZTtcbiAgICBmb3IgKGo9aSsxO2o8a3g7aisrKSB7XG4gICAgICBjPXMwW2kral0rMip4W2ldKnhbal0rYztcbiAgICAgIHMwW2kral09KGMgJiBtYXNrKTtcbiAgICAgIGM+Pj1icGU7XG4gICAgfVxuICAgIHMwW2kra3hdPWM7XG4gIH1cbiAgbW9kXyhzMCxuKTtcbiAgY29weV8oeCxzMCk7XG59XG5cbi8vcmV0dXJuIHggd2l0aCBleGFjdGx5IGsgbGVhZGluZyB6ZXJvIGVsZW1lbnRzXG5mdW5jdGlvbiB0cmltKHgsaykge1xuICB2YXIgaSx5O1xuICBmb3IgKGk9eC5sZW5ndGg7IGk+MCAmJiAheFtpLTFdOyBpLS0pO1xuICB5PW5ldyBBcnJheShpK2spO1xuICBjb3B5Xyh5LHgpO1xuICByZXR1cm4geTtcbn1cblxuLy9kbyB4PXgqKnkgbW9kIG4sIHdoZXJlIHgseSxuIGFyZSBiaWdJbnRzIGFuZCAqKiBpcyBleHBvbmVudGlhdGlvbi4gIDAqKjA9MS5cbi8vdGhpcyBpcyBmYXN0ZXIgd2hlbiBuIGlzIG9kZC4gIHggdXN1YWxseSBuZWVkcyB0byBoYXZlIGFzIG1hbnkgZWxlbWVudHMgYXMgbi5cbmZ1bmN0aW9uIHBvd01vZF8oeCx5LG4pIHtcbiAgdmFyIGsxLGsyLGtuLG5wO1xuICBpZihzNy5sZW5ndGghPW4ubGVuZ3RoKVxuICAgIHM3PWR1cChuKTtcblxuICAvL2ZvciBldmVuIG1vZHVsdXMsIHVzZSBhIHNpbXBsZSBzcXVhcmUtYW5kLW11bHRpcGx5IGFsZ29yaXRobSxcbiAgLy9yYXRoZXIgdGhhbiB1c2luZyB0aGUgbW9yZSBjb21wbGV4IE1vbnRnb21lcnkgYWxnb3JpdGhtLlxuICBpZiAoKG5bMF0mMSk9PTApIHtcbiAgICBjb3B5XyhzNyx4KTtcbiAgICBjb3B5SW50Xyh4LDEpO1xuICAgIHdoaWxlKCFlcXVhbHNJbnQoeSwwKSkge1xuICAgICAgaWYgKHlbMF0mMSlcbiAgICAgICAgbXVsdE1vZF8oeCxzNyxuKTtcbiAgICAgIGRpdkludF8oeSwyKTtcbiAgICAgIHNxdWFyZU1vZF8oczcsbik7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vY2FsY3VsYXRlIG5wIGZyb20gbiBmb3IgdGhlIE1vbnRnb21lcnkgbXVsdGlwbGljYXRpb25zXG4gIGNvcHlJbnRfKHM3LDApO1xuICBmb3IgKGtuPW4ubGVuZ3RoO2tuPjAgJiYgIW5ba24tMV07a24tLSk7XG4gIG5wPXJhZGl4LWludmVyc2VNb2RJbnQobW9kSW50KG4scmFkaXgpLHJhZGl4KTtcbiAgczdba25dPTE7XG4gIG11bHRNb2RfKHggLHM3LG4pOyAgIC8vIHggPSB4ICogMioqKGtuKmJwKSBtb2QgblxuXG4gIGlmIChzMy5sZW5ndGghPXgubGVuZ3RoKVxuICAgIHMzPWR1cCh4KTtcbiAgZWxzZVxuICAgIGNvcHlfKHMzLHgpO1xuXG4gIGZvciAoazE9eS5sZW5ndGgtMTtrMT4wICYgIXlbazFdOyBrMS0tKTsgIC8vazE9Zmlyc3Qgbm9uemVybyBlbGVtZW50IG9mIHlcbiAgaWYgKHlbazFdPT0wKSB7ICAvL2FueXRoaW5nIHRvIHRoZSAwdGggcG93ZXIgaXMgMVxuICAgIGNvcHlJbnRfKHgsMSk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGZvciAoazI9MTw8KGJwZS0xKTtrMiAmJiAhKHlbazFdICYgazIpOyBrMj4+PTEpOyAgLy9rMj1wb3NpdGlvbiBvZiBmaXJzdCAxIGJpdCBpbiB5W2sxXVxuICBmb3IgKDs7KSB7XG4gICAgaWYgKCEoazI+Pj0xKSkgeyAgLy9sb29rIGF0IG5leHQgYml0IG9mIHlcbiAgICAgIGsxLS07XG4gICAgICBpZiAoazE8MCkge1xuICAgICAgICBtb250Xyh4LG9uZSxuLG5wKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgazI9MTw8KGJwZS0xKTtcbiAgICB9XG4gICAgbW9udF8oeCx4LG4sbnApO1xuXG4gICAgaWYgKGsyICYgeVtrMV0pIC8vaWYgbmV4dCBiaXQgaXMgYSAxXG4gICAgICBtb250Xyh4LHMzLG4sbnApO1xuICB9XG59XG5cblxuLy9kbyB4PXgqeSpSaSBtb2QgbiBmb3IgYmlnSW50cyB4LHksbixcbi8vICB3aGVyZSBSaSA9IDIqKigta24qYnBlKSBtb2QgbiwgYW5kIGtuIGlzIHRoZVxuLy8gIG51bWJlciBvZiBlbGVtZW50cyBpbiB0aGUgbiBhcnJheSwgbm90XG4vLyAgY291bnRpbmcgbGVhZGluZyB6ZXJvcy5cbi8veCBhcnJheSBtdXN0IGhhdmUgYXQgbGVhc3QgYXMgbWFueSBlbGVtbnRzIGFzIHRoZSBuIGFycmF5XG4vL0l0J3MgT0sgaWYgeCBhbmQgeSBhcmUgdGhlIHNhbWUgdmFyaWFibGUuXG4vL211c3QgaGF2ZTpcbi8vICB4LHkgPCBuXG4vLyAgbiBpcyBvZGRcbi8vICBucCA9IC0obl4oLTEpKSBtb2QgcmFkaXhcbmZ1bmN0aW9uIG1vbnRfKHgseSxuLG5wKSB7XG4gIHZhciBpLGosYyx1aSx0LGtzO1xuICB2YXIga249bi5sZW5ndGg7XG4gIHZhciBreT15Lmxlbmd0aDtcblxuICBpZiAoc2EubGVuZ3RoIT1rbilcbiAgICBzYT1uZXcgQXJyYXkoa24pO1xuXG4gIGNvcHlJbnRfKHNhLDApO1xuXG4gIGZvciAoO2tuPjAgJiYgbltrbi0xXT09MDtrbi0tKTsgLy9pZ25vcmUgbGVhZGluZyB6ZXJvcyBvZiBuXG4gIGZvciAoO2t5PjAgJiYgeVtreS0xXT09MDtreS0tKTsgLy9pZ25vcmUgbGVhZGluZyB6ZXJvcyBvZiB5XG4gIGtzPXNhLmxlbmd0aC0xOyAvL3NhIHdpbGwgbmV2ZXIgaGF2ZSBtb3JlIHRoYW4gdGhpcyBtYW55IG5vbnplcm8gZWxlbWVudHMuXG5cbiAgLy90aGUgZm9sbG93aW5nIGxvb3AgY29uc3VtZXMgOTUlIG9mIHRoZSBydW50aW1lIGZvciByYW5kVHJ1ZVByaW1lXygpIGFuZCBwb3dNb2RfKCkgZm9yIGxhcmdlIG51bWJlcnNcbiAgZm9yIChpPTA7IGk8a247IGkrKykge1xuICAgIHQ9c2FbMF0reFtpXSp5WzBdO1xuICAgIHVpPSgodCAmIG1hc2spICogbnApICYgbWFzazsgIC8vdGhlIGlubmVyIFwiJiBtYXNrXCIgd2FzIG5lZWRlZCBvbiBTYWZhcmkgKGJ1dCBub3QgTVNJRSkgYXQgb25lIHRpbWVcbiAgICBjPSh0K3VpKm5bMF0pID4+IGJwZTtcbiAgICB0PXhbaV07XG5cbiAgICAvL2RvIHNhPShzYSt4W2ldKnkrdWkqbikvYiAgIHdoZXJlIGI9MioqYnBlLiAgTG9vcCBpcyB1bnJvbGxlZCA1LWZvbGQgZm9yIHNwZWVkXG4gICAgaj0xO1xuICAgIGZvciAoO2o8a3ktNDspIHsgYys9c2Fbal0rdWkqbltqXSt0Knlbal07ICAgc2Fbai0xXT1jICYgbWFzazsgICBjPj49YnBlOyAgIGorKztcbiAgICAgICAgICAgICAgICAgICAgIGMrPXNhW2pdK3VpKm5bal0rdCp5W2pdOyAgIHNhW2otMV09YyAmIG1hc2s7ICAgYz4+PWJwZTsgICBqKys7XG4gICAgICAgICAgICAgICAgICAgICBjKz1zYVtqXSt1aSpuW2pdK3QqeVtqXTsgICBzYVtqLTFdPWMgJiBtYXNrOyAgIGM+Pj1icGU7ICAgaisrO1xuICAgICAgICAgICAgICAgICAgICAgYys9c2Fbal0rdWkqbltqXSt0Knlbal07ICAgc2Fbai0xXT1jICYgbWFzazsgICBjPj49YnBlOyAgIGorKztcbiAgICAgICAgICAgICAgICAgICAgIGMrPXNhW2pdK3VpKm5bal0rdCp5W2pdOyAgIHNhW2otMV09YyAmIG1hc2s7ICAgYz4+PWJwZTsgICBqKys7IH1cbiAgICBmb3IgKDtqPGt5OykgICB7IGMrPXNhW2pdK3VpKm5bal0rdCp5W2pdOyAgIHNhW2otMV09YyAmIG1hc2s7ICAgYz4+PWJwZTsgICBqKys7IH1cbiAgICBmb3IgKDtqPGtuLTQ7KSB7IGMrPXNhW2pdK3VpKm5bal07ICAgICAgICAgIHNhW2otMV09YyAmIG1hc2s7ICAgYz4+PWJwZTsgICBqKys7XG4gICAgICAgICAgICAgICAgICAgICBjKz1zYVtqXSt1aSpuW2pdOyAgICAgICAgICBzYVtqLTFdPWMgJiBtYXNrOyAgIGM+Pj1icGU7ICAgaisrO1xuICAgICAgICAgICAgICAgICAgICAgYys9c2Fbal0rdWkqbltqXTsgICAgICAgICAgc2Fbai0xXT1jICYgbWFzazsgICBjPj49YnBlOyAgIGorKztcbiAgICAgICAgICAgICAgICAgICAgIGMrPXNhW2pdK3VpKm5bal07ICAgICAgICAgIHNhW2otMV09YyAmIG1hc2s7ICAgYz4+PWJwZTsgICBqKys7XG4gICAgICAgICAgICAgICAgICAgICBjKz1zYVtqXSt1aSpuW2pdOyAgICAgICAgICBzYVtqLTFdPWMgJiBtYXNrOyAgIGM+Pj1icGU7ICAgaisrOyB9XG4gICAgZm9yICg7ajxrbjspICAgeyBjKz1zYVtqXSt1aSpuW2pdOyAgICAgICAgICBzYVtqLTFdPWMgJiBtYXNrOyAgIGM+Pj1icGU7ICAgaisrOyB9XG4gICAgZm9yICg7ajxrczspICAgeyBjKz1zYVtqXTsgICAgICAgICAgICAgICAgICBzYVtqLTFdPWMgJiBtYXNrOyAgIGM+Pj1icGU7ICAgaisrOyB9XG4gICAgc2Fbai0xXT1jICYgbWFzaztcbiAgfVxuXG4gIGlmICghZ3JlYXRlcihuLHNhKSlcbiAgICBzdWJfKHNhLG4pO1xuICBjb3B5Xyh4LHNhKTtcbn1cblxuaWYgKHR5cGVvZiBtb2R1bGUgPT09ICd1bmRlZmluZWQnKSB7XG5cdG1vZHVsZSA9IHt9O1xufVxuQmlnSW50ID0gbW9kdWxlLmV4cG9ydHMgPSB7XG5cdCdhZGQnOiBhZGQsICdhZGRJbnQnOiBhZGRJbnQsICdiaWdJbnQyc3RyJzogYmlnSW50MnN0ciwgJ2JpdFNpemUnOiBiaXRTaXplLFxuXHQnZHVwJzogZHVwLCAnZXF1YWxzJzogZXF1YWxzLCAnZXF1YWxzSW50JzogZXF1YWxzSW50LCAnZXhwYW5kJzogZXhwYW5kLFxuXHQnZmluZFByaW1lcyc6IGZpbmRQcmltZXMsICdHQ0QnOiBHQ0QsICdncmVhdGVyJzogZ3JlYXRlcixcblx0J2dyZWF0ZXJTaGlmdCc6IGdyZWF0ZXJTaGlmdCwgJ2ludDJiaWdJbnQnOiBpbnQyYmlnSW50LFxuXHQnaW52ZXJzZU1vZCc6IGludmVyc2VNb2QsICdpbnZlcnNlTW9kSW50JzogaW52ZXJzZU1vZEludCwgJ2lzWmVybyc6IGlzWmVybyxcblx0J21pbGxlclJhYmluJzogbWlsbGVyUmFiaW4sICdtaWxsZXJSYWJpbkludCc6IG1pbGxlclJhYmluSW50LCAnbW9kJzogbW9kLFxuXHQnbW9kSW50JzogbW9kSW50LCAnbXVsdCc6IG11bHQsICdtdWx0TW9kJzogbXVsdE1vZCwgJ25lZ2F0aXZlJzogbmVnYXRpdmUsXG5cdCdwb3dNb2QnOiBwb3dNb2QsICdyYW5kQmlnSW50JzogcmFuZEJpZ0ludCwgJ3JhbmRUcnVlUHJpbWUnOiByYW5kVHJ1ZVByaW1lLFxuXHQncmFuZFByb2JQcmltZSc6IHJhbmRQcm9iUHJpbWUsICdzdHIyYmlnSW50Jzogc3RyMmJpZ0ludCwgJ3N1Yic6IHN1Yixcblx0J3RyaW0nOiB0cmltLCAnYWRkSW50Xyc6IGFkZEludF8sICdhZGRfJzogYWRkXywgJ2NvcHlfJzogY29weV8sXG5cdCdjb3B5SW50Xyc6IGNvcHlJbnRfLCAnR0NEXyc6IEdDRF8sICdpbnZlcnNlTW9kXyc6IGludmVyc2VNb2RfLCAnbW9kXyc6IG1vZF8sXG5cdCdtdWx0Xyc6IG11bHRfLCAnbXVsdE1vZF8nOiBtdWx0TW9kXywgJ3Bvd01vZF8nOiBwb3dNb2RfLFxuXHQncmFuZEJpZ0ludF8nOiByYW5kQmlnSW50XywgJ3JhbmRUcnVlUHJpbWVfJzogcmFuZFRydWVQcmltZV8sICdzdWJfJzogc3ViXyxcblx0J2FkZFNoaWZ0Xyc6IGFkZFNoaWZ0XywgJ2NhcnJ5Xyc6IGNhcnJ5XywgJ2RpdmlkZV8nOiBkaXZpZGVfLFxuXHQnZGl2SW50Xyc6IGRpdkludF8sICdlR0NEXyc6IGVHQ0RfLCAnaGFsdmVfJzogaGFsdmVfLCAnbGVmdFNoaWZ0Xyc6IGxlZnRTaGlmdF8sXG5cdCdsaW5Db21iXyc6IGxpbkNvbWJfLCAnbGluQ29tYlNoaWZ0Xyc6IGxpbkNvbWJTaGlmdF8sICdtb250Xyc6IG1vbnRfLFxuXHQnbXVsdEludF8nOiBtdWx0SW50XywgJ3JpZ2h0U2hpZnRfJzogcmlnaHRTaGlmdF8sICdzcXVhcmVNb2RfJzogc3F1YXJlTW9kXyxcblx0J3N1YlNoaWZ0Xyc6IHN1YlNoaWZ0XywgJ3Bvd01vZF8nOiBwb3dNb2RfLCAnZUdDRF8nOiBlR0NEXyxcblx0J2ludmVyc2VNb2RfJzogaW52ZXJzZU1vZF8sICdHQ0RfJzogR0NEXywgJ21vbnRfJzogbW9udF8sICdkaXZpZGVfJzogZGl2aWRlXyxcblx0J3NxdWFyZU1vZF8nOiBzcXVhcmVNb2RfLCAncmFuZFRydWVQcmltZV8nOiByYW5kVHJ1ZVByaW1lXyxcblx0J21pbGxlclJhYmluJzogbWlsbGVyUmFiaW5cbn07XG5cbn0pKCk7XG4iLCJ2YXIgQkkgPSByZXF1aXJlKCdCaWdJbnQnKTtcbnZhciBCYXNlID0gcmVxdWlyZSgnLi9iYXNlLmpzJykoMTUpO1xudmFyIFMgPSByZXF1aXJlKCcuL3N0cmF0ZWd5LmpzJykoMTApO1xudmFyIElEID0gcmVxdWlyZSgnLi9pZGVudGlmaWVyLmpzJyk7XG52YXIgVHJpcGxlID0gcmVxdWlyZSgnLi90cmlwbGUuanMnKTtcbnZhciBMU0VRTm9kZSA9IHJlcXVpcmUoJy4vbHNlcW5vZGUuanMnKTtcblxuLyohXG4gKiBcXGNsYXNzIExTRVFUcmVlXG4gKlxuICogXFxicmllZiBEaXN0cmlidXRlZCBhcnJheSB1c2luZyBMU0VRIGFsbG9jYXRpb24gc3RyYXRlZ3kgd2l0aCBhbiB1bmRlcmx5aW5nXG4gKiBleHBvbmVudGlhbCB0cmVlIG1vZGVsXG4gKi9cbmZ1bmN0aW9uIExTRVFUcmVlKHMpe1xuICAgIHZhciBsaXN0VHJpcGxlO1xuICAgIFxuICAgIHRoaXMuX3MgPSBzO1xuICAgIHRoaXMuX2MgPSAwO1xuICAgIHRoaXMuX2hhc2ggPSBmdW5jdGlvbihkZXB0aCkgeyByZXR1cm4gZGVwdGglMjsgfTtcbiAgICB0aGlzLmxlbmd0aCA9IDA7XG5cbiAgICB0aGlzLnJvb3QgPSBuZXcgTFNFUU5vZGUoW10sbnVsbCk7XG4gICAgbGlzdFRyaXBsZSA9IFtdOyBsaXN0VHJpcGxlLnB1c2gobmV3IFRyaXBsZSgwLDAsMCkpOyAgLy8gbWluIGJvdW5kXG4gICAgdGhpcy5yb290LmFkZChuZXcgTFNFUU5vZGUobGlzdFRyaXBsZSwgXCJcIikpO1xuICAgIGxpc3RUcmlwbGUgPSBbXTtcbiAgICBsaXN0VHJpcGxlLnB1c2gobmV3IFRyaXBsZShNYXRoLnBvdygyLEJhc2UuZ2V0Qml0QmFzZSgwKSktMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBOdW1iZXIuTUFYX1ZBTFVFLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE51bWJlci5NQVhfVkFMVUUpKTsgLy8gbWF4IGJvdW5kXG4gICAgdGhpcy5yb290LmFkZChuZXcgTFNFUU5vZGUobGlzdFRyaXBsZSwgXCJcIikpO1xufTtcblxuLyohXG4gKiBcXGJyaWVmIHJldHVybiB0aGUgTFNFUU5vZGUgb2YgdGhlIGVsZW1lbnQgYXQgIHRhcmdldGVkIGluZGV4XG4gKiBcXHBhcmFtIGluZGV4IHRoZSBpbmRleCBvZiB0aGUgZWxlbWVudCBpbiB0aGUgZmxhdHRlbmVkIGFycmF5XG4gKiBcXHJldHVybiB0aGUgTFNFUU5vZGUgdGFyZ2V0aW5nIHRoZSBlbGVtZW50IGF0IGluZGV4XG4gKi9cbkxTRVFUcmVlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbihpbmRleCl7XG4gICAgLy8gIzEgc2VhcmNoIGluIHRoZSB0cmVlIHRvIGdldCB0aGUgdmFsdWVcbiAgICByZXR1cm4gdGhpcy5yb290LmdldChpbmRleCk7XG59O1xuXG4vKiFcbiAqIFxcYnJpZWYgaW5zZXJ0IGEgdmFsdWUgYXQgdGhlIHRhcmdldGVkIGluZGV4XG4gKiBcXHBhcmFtIGVsZW1lbnQgdGhlIGVsZW1lbnQgdG8gaW5zZXJ0XG4gKiBcXHBhcmFtIGluZGV4IHRoZSBwb3NpdGlvbiBpbiB0aGUgYXJyYXlcbiAqIFxccmV0dXJuIGEgcGFpciB7X2U6IGVsZW1lbnQgLCBfaTogaWRlbnRpZmllcn1cbiAqL1xuTFNFUVRyZWUucHJvdG90eXBlLmluc2VydCA9IGZ1bmN0aW9uKGVsZW1lbnQsIGluZGV4KXtcbiAgICB2YXIgcGVpID0gdGhpcy5nZXQoaW5kZXgpLCAvLyAjMWEgcHJldmlvdXMgYm91bmRcbiAgICAgICAgcWVpID0gdGhpcy5nZXQoaW5kZXgrMSksIC8vICMxYiBuZXh0IGJvdW5kXG4gICAgICAgIGlkLCBjb3VwbGU7XG4gICAgdGhpcy5fYyArPSAxOyAvLyAjMmEgaW5jcmVtZW50aW5nIHRoZSBsb2NhbCBjb3VudGVyXG4gICAgaWQgPSB0aGlzLmFsbG9jKHBlaSwgcWVpKTsgLy8gIzJiIGdlbmVyYXRpbmcgdGhlIGlkIGluYmV0d2VlbiB0aGUgYm91bmRzXG4gICAgLy8gIzMgYWRkIGl0IHRvIHRoZSBzdHJ1Y3R1cmUgYW5kIHJldHVybiB2YWx1ZVxuICAgIGNvdXBsZSA9IHtfZTogZWxlbWVudCwgX2k6IGlkfVxuICAgIHRoaXMuYXBwbHlJbnNlcnQoZWxlbWVudCwgaWQsIHRydWUpO1xuICAgIHJldHVybiBjb3VwbGU7XG59O1xuXG4vKiFcbiAqIFxcYnJpZWYgZGVsZXRlIHRoZSBlbGVtZW50IGF0IHRoZSBpbmRleFxuICogXFxwYXJhbSBpbmRleCB0aGUgaW5kZXggb2YgdGhlIGVsZW1lbnQgdG8gZGVsZXRlIGluIHRoZSBhcnJheVxuICogXFxyZXR1cm4gdGhlIGlkZW50aWZpZXIgb2YgdGhlIGVsZW1lbnQgYXQgdGhlIGluZGV4XG4gKi9cbkxTRVFUcmVlLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbihpbmRleCl7XG4gICAgdmFyIGVpID0gdGhpcy5nZXQoaW5kZXgrMSksXG4gICAgICAgIGkgPSBuZXcgSUQobnVsbCwgW10sIFtdKTtcbiAgICBpLmZyb21Ob2RlKGVpKTsgLy8gZnJvbSBub2RlIC0+IGlkXG4gICAgdGhpcy5hcHBseVJlbW92ZShlaSk7IFxuICAgIHJldHVybiBpO1xufTtcblxuLyohXG4gKiBcXGJyaWVmIGdlbmVyYXRlIHRoZSBkaWdpdCBwYXJ0IG9mIHRoZSBpZGVudGlmaWVycyAgYmV0d2VlbiBwIGFuZCBxXG4gKiBcXHBhcmFtIHAgdGhlIGRpZ2l0IHBhcnQgb2YgdGhlIHByZXZpb3VzIGlkZW50aWZpZXJcbiAqIFxccGFyYW0gcSB0aGUgZGlnaXQgcGFydCBvZiB0aGUgbmV4dCBpZGVudGlmaWVyXG4gKiBcXHJldHVybiB0aGUgZGlnaXQgcGFydCBsb2NhdGVkIGJldHdlZW4gcCBhbmQgcVxuICovXG5MU0VRVHJlZS5wcm90b3R5cGUuYWxsb2MgPSBmdW5jdGlvbiAocCxxKXtcbiAgICB2YXIgaW50ZXJ2YWwgPSAwLCBsZXZlbCA9IDA7XG4gICAgLy8gIzEgcHJvY2VzcyB0aGUgbGV2ZWwgb2YgdGhlIG5ldyBpZGVudGlmaWVyXG4gICAgd2hpbGUgKGludGVydmFsPD0wKXsgLy8gbm8gcm9vbSBmb3IgaW5zZXJ0aW9uXG4gICAgICAgIGludGVydmFsID0gQmFzZS5nZXRJbnRlcnZhbChwLCBxLCBsZXZlbCk7IC8vIChUT0RPKSBvcHRpbWl6ZVxuICAgICAgICArK2xldmVsO1xuICAgIH07XG4gICAgbGV2ZWwgLT0gMTtcbiAgICBpZiAodGhpcy5faGFzaChsZXZlbCkgPT09IDApe1xuICAgICAgICByZXR1cm4gUy5iUGx1cyhwLCBxLCBsZXZlbCwgaW50ZXJ2YWwsIHRoaXMuX3MsIHRoaXMuX2MpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBTLmJNaW51cyhwLCBxLCBsZXZlbCwgaW50ZXJ2YWwsIHRoaXMuX3MsIHRoaXMuX2MpO1xuICAgIH07XG59O1xuXG4vKiFcbiAqIFxcYnJpZWYgaW5zZXJ0IGFuIGVsZW1lbnQgY3JlYXRlZCBmcm9tIGEgcmVtb3RlIHNpdGUgaW50byB0aGUgYXJyYXlcbiAqIFxccGFyYW0gZSB0aGUgZWxlbWVudCB0byBpbnNlcnRcbiAqIFxccGFyYW0gaSB0aGUgaWRlbnRpZmllciBvZiB0aGUgZWxlbWVudFxuICogXFxwYXJhbSBub0luZGV4IHdoZXRoZXIgb3Igbm90IGl0IHNob3VsZCByZXR1cm4gdGhlIGluZGV4IG9mIHRoZSBpbnNlcnRcbiAqIFxccmV0dXJuIHRoZSBpbmRleCBvZiB0aGUgbmV3bHkgaW5zZXJ0ZWQgZWxlbWVudCBpbiB0aGUgYXJyYXlcbiAqL1xuTFNFUVRyZWUucHJvdG90eXBlLmFwcGx5SW5zZXJ0ID0gZnVuY3Rpb24oZSwgaSwgbm9JbmRleCl7XG4gICAgdmFyIG5vZGUsIHJlc3VsdDtcbiAgICAvLyAjMCBjYXN0IGZyb20gdGhlIHByb3BlciB0eXBlXG4gICAgLy8gIzBBIHRoZSBpZGVudGlmaWVyIGlzIGFuIElEXG4gICAgaWYgKGkgJiYgaS5fZCAmJiBpLl9zICYmIGkuX2Mpe1xuICAgICAgICBub2RlID0gKG5ldyBJRChpLl9kLCBpLl9zLCBpLl9jKS50b05vZGUoZSkpO1xuICAgIH07XG4gICAgLy8gIzBCIHRoZSBpZGVudGlmaWVyIGlzIGEgTFNFUU5vZGVcbiAgICBpZiAoaSAmJiBpLnQgJiYgaS5jaGlsZHJlbil7XG4gICAgICAgIG5vZGUgPSAobmV3IExTRVFOb2RlKFtdLG51bGwpKS5mcm9tSlNPTihpKTtcbiAgICB9O1xuICAgIC8vICMyIGludGVncmF0ZXMgdGhlIG5ldyBlbGVtZW50IHRvIHRoZSBkYXRhIHN0cnVjdHVyZVxuICAgIHJlc3VsdCA9IHRoaXMucm9vdC5hZGQobm9kZSk7XG4gICAgaWYgKHJlc3VsdCAhPT0gLTEpe1xuICAgICAgICAvLyAjMyBpZiB0aGUgZWxlbWVudCBhcyBiZWVuIGFkZGVkXG4gICAgICAgIHRoaXMubGVuZ3RoICs9IDE7XG4gICAgfTtcbiAgICByZXR1cm4gcmVzdWx0IHx8ICghbm9JbmRleCAmJiB0aGlzLnJvb3QuaW5kZXhPZihub2RlKSk7XG59O1xuXG4vKiFcbiAqIFxcYnJpZWYgZGVsZXRlIHRoZSBlbGVtZW50IHdpdGggdGhlIHRhcmdldGVkIGlkZW50aWZpZXJcbiAqIFxccGFyYW0gaSB0aGUgaWRlbnRpZmllciBvZiB0aGUgZWxlbWVudFxuICogXFxyZXR1cm4gdGhlIGluZGV4IG9mIHRoZSBlbGVtZW50IGZlc2hseSBkZWxldGVkLCAtMSBpZiBubyByZW1vdmFsXG4gKi9cbkxTRVFUcmVlLnByb3RvdHlwZS5hcHBseVJlbW92ZSA9IGZ1bmN0aW9uKGkpe1xuICAgIHZhciBub2RlLCBwb3NpdGlvbjtcbiAgICAvLyAjMCBjYXN0IGZyb20gdGhlIHByb3BlciB0eXBlXG4gICAgaWYgKGkgJiYgaS5fZCAmJiBpLl9zICYmIGkuX2Mpe1xuICAgICAgICBub2RlID0gKG5ldyBJRChpLl9kLCBpLl9zLCBpLl9jKSkudG9Ob2RlKG51bGwpO1xuICAgIH07XG4gICAgLy8gIzBCIHRoZSBpZGVudGlmaWVyIGlzIGEgTFNFUU5vZGVcbiAgICBpZiAoaSAmJiBpLnQgJiYgaS5jaGlsZHJlbil7XG4gICAgICAgIG5vZGUgPSAobmV3IExTRVFOb2RlKFtdLG51bGwpKS5mcm9tSlNPTihpKTtcbiAgICB9O1xuICAgIC8vICMxIGdldCB0aGUgaW5kZXggb2YgdGhlIGVsZW1lbnQgdG8gcmVtb3ZlXG4gICAgcG9zaXRpb24gPSB0aGlzLnJvb3QuaW5kZXhPZihub2RlKTtcbiAgICBpZiAocG9zaXRpb24gIT09IC0xKXtcbiAgICAgICAgLy8gIzIgaWYgaXQgZXhpc3RzIHJlbW92ZSBpdFxuICAgICAgICB0aGlzLnJvb3QuZGVsKG5vZGUpO1xuICAgICAgICB0aGlzLmxlbmd0aCAtPSAxO1xuICAgIH07XG4gICAgcmV0dXJuIHBvc2l0aW9uO1xufTtcblxuXG4vKiFcbiAqIFxcYnJpZWYgY2FzdCB0aGUgSlNPTiBvYmplY3QgaW50byBhIHByb3BlciBMU0VRVHJlZS5cbiAqIFxccGFyYW0gb2JqZWN0IHRoZSBKU09OIG9iamVjdCB0byBjYXN0XG4gKiBcXHJldHVybiBhIHNlbGYgcmVmZXJlbmNlXG4gKi9cbkxTRVFUcmVlLnByb3RvdHlwZS5mcm9tSlNPTiA9IGZ1bmN0aW9uKG9iamVjdCl7XG4gICAgLy8gIzEgY29weSB0aGUgc291cmNlLCBjb3VudGVyLCBhbmQgbGVuZ3RoIG9mIHRoZSBvYmplY3RcbiAgICB0aGlzLl9zID0gb2JqZWN0Ll9zO1xuICAgIHRoaXMuX2MgPSBvYmplY3QuX2M7XG4gICAgdGhpcy5sZW5ndGggPSBvYmplY3QubGVuZ3RoO1xuICAgIC8vICMyIGRlcHRoIGZpcnN0IGFkZGluZ1xuICAgIHZhciBzZWxmID0gdGhpcztcbiAgICBmdW5jdGlvbiBkZXB0aEZpcnN0KGN1cnJlbnROb2RlLCBjdXJyZW50UGF0aCl7XG4gICAgICAgIHZhciB0cmlwbGUgPSBuZXcgVHJpcGxlKGN1cnJlbnROb2RlLnQucCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudE5vZGUudC5zLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50Tm9kZS50LmMpO1xuICAgICAgICBjdXJyZW50UGF0aC5wdXNoKHRyaXBsZSk7XG4gICAgICAgIGlmIChjdXJyZW50Tm9kZS5lIT09bnVsbCl7XG4gICAgICAgICAgICBzZWxmLnJvb3QuYWRkKG5ldyBMU0VRTm9kZShjdXJyZW50UGF0aCwgY3VycmVudE5vZGUuZSkpO1xuICAgICAgICB9O1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaTxjdXJyZW50Tm9kZS5jaGlsZHJlbi5sZW5ndGg7ICsraSl7XG4gICAgICAgICAgICBkZXB0aEZpcnN0KGN1cnJlbnROb2RlLmNoaWxkcmVuW2ldLCBjdXJyZW50UGF0aCk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBmb3IgKHZhciBpID0gMDsgaTxvYmplY3Qucm9vdC5jaGlsZHJlbi5sZW5ndGg7ICsraSl7XG4gICAgICAgIGRlcHRoRmlyc3Qob2JqZWN0LnJvb3QsIFtdKTtcbiAgICB9O1xuICAgIHJldHVybiB0aGlzO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBMU0VRVHJlZTtcbiJdfQ==
