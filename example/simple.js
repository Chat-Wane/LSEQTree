'use strict';

const LSeqTree = require('../lib/lseqtree.js');

console.log('#1 We create a first distributed data structure for sequences');
const lseq1 = new LSeqTree(1);

console.log('#2 We insert an element in the structure');
const idInsert = lseq1.insert('A', 0);
console.log('\tSize of the 1st structure: ' + lseq1.length);
// > Size of the 1st structure: 1

console.log('#A We initialize a second structure');
const lseq2 = new LSeqTree(2);

console.log('#B We insert the element of the first structure');
lseq2.applyInsert(idInsert);
console.log('\tSize of the 1st structure: ' + lseq1.length);
console.log('\tSize of the 2nd structure: ' + lseq2.length);
// > Size of the 1st structure: 1
// > Size of the 1st structure: 1

console.log('#C We remove the element at position 0, ie, character "A"');
const idDelete = lseq2.remove(0);
console.log('\tSize of the 1st structure: ' + lseq1.length);
console.log('\tSize of the 2nd structure: ' + lseq2.length);
// > Size of the 1st structure: 1
// > Size of the 2nd structure: 0

console.log('#3 We apply the removal to the first structure');
lseq1.applyRemove(idDelete);
console.log('\tSize of the 1st structure: ' + lseq1.length);
console.log('\tSize of the 2nd structure: ' + lseq2.length);
// Size of the 2nd structure: 0
// Size of the 2nd structure: 0
