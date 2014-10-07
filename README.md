# LSEQTree

<i>Keywords: distributed systems, collaborative editing, CRDT, LSEQ allocation strategy, unique identifiers, tree-based array</i>

This project aims to provide an implementation of a CRDT-based array with an
underlying exponential tree and the allocation strategy LSEQ.

## Installation

```
$ npm install lseqarray
```

## Usage

```javascript
var LSEQArray = require('lseqtree');

// #1 creating the array
// site: our unique site identifier
var lseqArray = new LSEQArray(site);

// #2a inserting an element at the targeted index
// ei: a couple {_e: the element, _i: its unique identifier}
var ei = lseqArray.insert("A",0);

// #2b inserting an element that comes from a remote insert
// re: the element remotely inserted
// ri: the unique identifier of the element
var index = lseqArray.applyInsert(re, ri);

// #3a deleting the element at targeted index
// i: the unique identifier of the element at the index
var i = lseqArray.remove(0);

// #3b deleting the element with its unique identifier "ri"
// ri: the unique identifier of the element to delete
var index = lseqArray.applyRemove(ri);

// #4 accessing the length of the array
var length = lseqArray.length;
```

Learn more about CRDTs: [A comprehensive study of Convergent and Commutative Replicated Data Types](http://hal.upmc.fr/docs/00/55/55/88/PDF/techreport.pdf)

Learn more about LSEQ: [LSEQ: an Adaptive Structure for Sequences in Distributed Collaborative Editing](http://hal.archives-ouvertes.fr/docs/00/92/16/33/PDF/fp025-nedelec.pdf)
