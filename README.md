# LSEQTree

<i>Keywords: distributed systems, collaborative editing, CRDT, LSEQ allocation strategy, unique identifiers, tree-based array</i>

This project aims to provide an implementation of a CRDT-based array [1] with 
an underlying exponential tree and the allocation strategy LSEQ [2].

## Installation

```
$ npm install lseqtree
```

## Usage

```javascript
var lseqTree = require('lseqtree');

// #1 creating the array
// site: our unique site identifier
var lseq = new LSEQTree(site);

// #2a inserting an element at the targeted index
// ei: a couple {_e: the element, _i: its unique identifier}
var ei = lseq.insert("A",0);

// #2b inserting an element that comes from a remote insert
// re: the element remotely inserted
// ri: the unique identifier of the element
var index = lseq.applyInsert(re, ri);

// #3a deleting the element at targeted index
// i: the unique identifier of the element at the index
var i = lseq.remove(0);

// #3b deleting the element with its unique identifier "ri"
// ri: the unique identifier of the element to delete
var index = lseq.applyRemove(ri);

// #4 accessing the length of the array
var length = lseq.length;
```

Other
-----
[Prior project](http://github.com/chat-wane/lseqarray.git) follows the
specification of LSEQTree. Nevertheless, the former is a linearization of the 
tree into an array. As such, the memory usage is high. On the other hand,
LSEQTree uses a tree, and therefore, it has a better space complexity. LSEQTree
uses the core of the prior project to generate its identifiers.
Despite being less efficient (obviously, the code must be improved), it
provides interoperability and interchangeability between the two projects.

References
----------
[1] [A comprehensive study of Convergent and Commutative Replicated Data Types](http://hal.upmc.fr/docs/00/55/55/88/PDF/techreport.pdf)

[2] [LSEQ: an Adaptive Structure for Sequences in Distributed Collaborative Editing](http://hal.archives-ouvertes.fr/docs/00/92/16/33/PDF/fp025-nedelec.pdf)
