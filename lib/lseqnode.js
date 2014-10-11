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
    if (index < 0 || this.children.length == 0  ||
	(index==0 && this.children.length > 0 && 
	 this.children[0].compare(node)!=0)){
	this.children.splice(-index, 0, node);
    } else {
	// #2 otherwise, continue to explore the subtrees
	if (node.children.length == 0){
	    // #2a check if the element already exists
	    if (this.children[index].e !== null){
		return -1;
	    } else {
		this.children[index].e = node.e;
	    };
	} else {
	    this.children[index].add(node.children[0]);
	};
    };
};

/*! 
 * \brief remove the node of the tree and all node within path being useless
 * \param node the node containing the path to remove
 */
LSEQNode.prototype.del = function(node){
    var index = this.children.binaryIndexOf(node);
    // #0 (TODO) case it do not exist (index < 0)
    this.subCounter -= 1;
    // #1 case: leaf
    if (node.children.length==0 && this.children[index].subCounter==0){
	this.children.splice(index,1);
	return true;
    };
    // #2 case: not leaf but element found
    if (node.children.length==0 && this.children[index].subCounter!=0){
	this.children[index].e = null;
	return false;
    };
    // #3 case: subpath of the node has been deleted
    if (this.children[index].del(node.children[0])){
	if (this.children[index].subCounter == 0 &&
	    this.children[index].e === null){
	    this.children.splice(index,1);
	    return true;
	} else {
	    return false;
	};
    } else {
	return false;
    };
};

/*!
 * \brief comparison function used to order the list of children at each node
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
    function _get(leftSum, buildingNode, queue, currentNode){
	// #0 the node is found, return the incrementally built node and praise
	// #the sun !
	if (leftSum == index && currentNode.e !== null){
	    // 1a copy the value of the element in the path
	    queue.e = currentNode.e;
	    return buildingNode;
	};
	if (currentNode.e !== null){ leftSum += 1; };

	// #1 search: do I start from the beginning or the end
	var startBeginning = ((index-leftSum)<(currentNode.subCounter/2));
	if (startBeginning){
	    var useFunction = function(a,b){return a+b;};
	} else {
	    leftSum += currentNode.subCounter;
	    var useFunction = function(a,b){return a-b;};
	}

	// #2a counting the element from left to right
	var i = 0; if (!startBeginning) { i = currentNode.children.length-1; };
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
	leftSum = useFunction(leftSum, -currentNode.children[i].subCounter);
	};

	// #3 build path
	var p = []; p.push(currentNode.children[i].t);
	if (buildingNode === null){
	    buildingNode = new LSEQNode(p,null);
	    queue = buildingNode;
	} else {
	    var temp = new LSEQNode(p,null);
	    queue.add(temp);
	    queue = temp;
	};
	return _get(leftSum, buildingNode, queue,
		    currentNode.children[i]);
    };
    return _get(0, null, null, this);
};

module.exports = LSEQNode;