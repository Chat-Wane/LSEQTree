# LSEQTree

<i>Keywords: distributed systems, collaborative editing, CRDT, LSEQ allocation strategy, unique identifiers, tree-based array</i>

This project aims to provide an implementation of a CRDT-based array [1] with 
an underlying exponential tree and the allocation strategy LSEQ [2].

## Installation

```
$ npm install lseqtree
```

## Usage

The module has been [browserified](http://browserify.org) and
[uglified](https://github.com/mishoo/UglifyJS). To include LSEQTree within
your browser, put the following line in your html:

```html
<script src="./path/to/bundle/lseqtree.bundle.js"></script>
```

Then, whether you use the browserified version or nodejs:

```javascript
var LSEQTree = require('lseqtree');

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
* [Clojure LSEQTree](https://github.com/Tavistock/lseq-tree.git) from
[Travis McNeill](https://github.com/Tavistock)

* [Prior project](https://github.com/chat-wane/lseqarray.git) follows the
specification of LSEQTree. Nevertheless, the former is a linearization of the 
tree into an array. As such, the memory usage is high. On the other hand,
LSEQTree uses a tree, and therefore, it has a better space complexity. LSEQTree
uses the core of the prior project to generate its identifiers.
Despite being less efficient (obviously, the code must be improved), it
provides interoperability and interchangeability between the two projects.

References
----------

[1] Shapiro, M., Preguiça, N., Baquero, C., Zawirski, M. (2011). [A
comprehensive study of Convergent and Commutative Replicated Data
Types](http://hal.upmc.fr/docs/00/55/55/88/PDF/techreport.pdf). <i>Research
Report.</i>

[2] Nédelec B., Molli, P., Mostefaoui, A., Desmontils, E. (2013). [LSEQ: an
Adaptive Structure for Sequences in Distributed Collaborative
Editing](http://hal.archives-ouvertes.fr/docs/00/92/16/33/PDF/fp025-nedelec.pdf).
<i>DocEng '13 Proceedings of the 2013 ACM symposium on Document
engineering. Pages 37-46.</i>
