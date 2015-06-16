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
