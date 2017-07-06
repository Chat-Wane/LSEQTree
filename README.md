# LSEQTree

*Keywords: distributed systems, collaborative editing, CRDT, LSEQ allocation strategy, unique identifiers, tree-based array*

This project aims to provide an implementation of a CRDT-based array [1] with 
an underlying exponential tree and the allocation strategy LSeq [2].

## Installation

```
$ npm install lseqtree
```

## Usage

To include LSeqTree within your web browser, put the following line in your
html:

```html
<script src="./path/to/bundle/lseqtree.bundle.js"></script>
```

In your JavaScript file:

```javascript
const LSeqTree = require('lseqtree');
```

## Example

```javascript
// #1 We create a first distributed data structure for sequences'
const lseq1 = new LSeqTree(1);

// #2 We insert an element in the structure
const idInsert = lseq1.insert('A', 0);
console.log('\tSize of the 1st structure: ' + lseq1.length);
// > Size of the 1st structure: 1

console.log('#A We initialize a second structure');
const lseq2 = new LSeqTree(2);

// #B We insert the element of the first structure
lseq2.applyInsert(idInsert);
console.log('\tSize of the 1st structure: ' + lseq1.length);
console.log('\tSize of the 2nd structure: ' + lseq2.length);
// > Size of the 1st structure: 1
// > Size of the 1st structure: 1

console.log('\tCharacter at index 0: ' + lseq1.get(0));
// > Character at index 0: A

// #C We remove the element at position 0, ie, character "A"
const idDelete = lseq2.remove(0);
console.log('\tSize of the 1st structure: ' + lseq1.length);
console.log('\tSize of the 2nd structure: ' + lseq2.length);
// > Size of the 1st structure: 1
// > Size of the 2nd structure: 0

// #3 We apply the removal to the first structure
lseq1.applyRemove(idDelete);
console.log('\tSize of the 1st structure: ' + lseq1.length);
console.log('\tSize of the 2nd structure: ' + lseq2.length);
// > Size of the 2nd structure: 0
// > Size of the 2nd structure: 0
```

## Misc

* [Clojure LSEQTree](https://github.com/Tavistock/lseq-tree.git) from
[Travis McNeill](https://github.com/Tavistock)

* [Prior project](https://github.com/chat-wane/lseqarray.git) ~~follows the
specification of LSEQTree~~. Nevertheless, the former is a linearization of the 
tree into an array. As such, the memory usage is high. On the other hand,
LSEQTree uses a tree, and therefore, it has a better space complexity. LSEQTree
uses the core of the prior project to generate its identifiers.
Despite being less efficient (obviously, the code must be improved), ~~it
provides interoperability and interchangeability between the two projects~~.

## References

[1] M. Shapiro, N. Preguiça, C. Baquero, and M. Zawirski. [A comprehensive study
of Convergent and Commutative Replicated Data
Types](http://hal.upmc.fr/docs/00/55/55/88/PDF/techreport.pdf). *Research
Report.* 2011.

[2] B. Nédelec, P. Molli, A. Mostéfaoui, and E. Desmontils. [LSEQ: an Adaptive
Structure for Sequences in Distributed Collaborative
Editing](http://hal.archives-ouvertes.fr/docs/00/92/16/33/PDF/fp025-nedelec.pdf).
*DocEng '13 Proceedings of the 2013 ACM symposium on Document engineering. Pages
37-46.* Sept. 2013.
