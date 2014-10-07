require('./util.js');

/*!
 * \brief a node of the LSEQ tree
 * \param tripleList the list of triple composing the path to the element
 * \param element the element to insert in the structure
 */
function LSEQNode(tripleList, element){
    this.t = tripleList.shift();
    if (tripleList.length == 0){
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
 */
LSEQNode.prototype.add = function(node){
    this.subCounter+=1;
    var index = this.children.binaryIndexOf(node);
    // #1 if the path do no exist, create it
    if (index < 0 || this.children.length == 0){
	this.children.splice(-index, 0, node);
    } else {
	// otherwise, continue to explore the subtrees
	if (node.children.length == 0){
	    this.children[index].e = node.e;
	} else {
	    this.children[index].add(node.children[0]);
	};
    };
};

LSEQNode.prototype.compare = function(o){
    return this.t.compare(o.t);
};

/*!
 * \brief the ordered tree can be linearized into a sequence. This function get
 * the index of the path represented by the list of triples
 * \param node the node containing the path
 * \return the index of the path in the node
 */
LSEQNode.prototype.getIndex = function(node){
    var sum = 0;
    var index = this.children.binaryIndexOf(node);
    // #1 sum of the left branches 
    for (var i = 0; i < Math.abs(index); ++i){
	if (this.children[i].e !== null){sum += 1;};
	sum += this.children[i].subCounter;
    };
    // #2 explore the subpath of the found path
    if (index >= 0 && this.children.length > 0){
	if (this.children[i].e !== null){sum += 1;};
	if (node.children[0] == undefined){
	    return sum;
	} else {
	    sum += this.children[index].getIndex(node.children[0]);
	};
    };
    return sum;
};

/*!
 * \brief the ordered tree can be linearized. This function gets the node at
 * the index in the projected sequence.
 * \param index the index in the sequence
 * \returns the node at the index
 */
LSEQNode.prototype.get = function(index){
    function _get(leftSum, buildingNode, currentNode){
	// #1 the node is found, return the incrementally built node and praise
	// #the sun !
	if (leftSum == index && currentNode.e !== null){
	    // 1a copy the value of the element in the path
	    var temp = buildingNode;
	    while (temp.children.length != 0){
		temp = buildingNode.children[0];
	    };
	    temp.e = currentNode.e;
	    return buildingNode;
	};
	// #2a counting the element from left to right
	var i = 0;
	while (leftSum < index){
	    if (currentNode.children[i].e!==null){leftSum += 1;};
	    leftSum += currentNode.children[i].subCounter;
	    ++i;
	};
	// #2b decreasing the incrementation (TODO) check if i = 0
	leftSum -= currentNode.children[i-1].subCounter;
	// #3 build path
	var p = []; p.push(currentNode.children[i-1].t);
	if (buildingNode === null){
	    buildingNode = new LSEQNode(p,null);
	} else {
	    buildingNode.add(new LSEQNode(p,null));
	};
	return _get(leftSum,
		    buildingNode,
		    currentNode.children[i-1]);
    };
    return _get(0,null, this);
};

module.exports = LSEQNode;