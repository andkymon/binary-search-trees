import { Tree } from "./tree.js";

/*
// Initialize
const test = new Tree([1, 4, 3, 5, 8, 6, 7, 10, 13, 15, 18, 12, 14]);

// prettyPrint
test.prettyPrint(test.root);

// insert()
test.insert(2);
test.prettyPrint(test.root);

// deleteItem() Case 1: Target node has no child
test.deleteItem(12);
test.prettyPrint(test.root);

// deleteItem() Case 2: Target node has one child
test.deleteItem(1);
test.prettyPrint(test.root);

// deleteItem() Case 3.1: Target node has two children, inorder successor is not the right node
test.deleteItem(4);
test.prettyPrint(test.root);

// deleteItem() Case 3.2: Target node has two children, inorder successor is the right node
test.deleteItem(5);
test.prettyPrint(test.root);

// find()
console.log(test.find(8));
console.log(test.find(99));

// levelOrder()
function logNodeValue(node) {
    console.log(node.value);
}
test.levelOrder(logNodeValue);
test.levelOrder();

// inOrder()
test.inOrder(logNodeValue);

// preOrder()
test.preOrder(logNodeValue);

// postOrder()
test.postOrder(logNodeValue);

// height()
console.log(test.height(test.root));
console.log(test.height(test.root.rightNode));

// depth()
console.log(test.depth(test.root));
console.log(test.depth(test.root.rightNode));

// isBalanced()
console.log(test.isBalanced());
test.insert(24);
test.insert(25);
test.insert(26);
test.insert(27);
console.log(test.isBalanced());

// rebalance()
console.log(test.rebalance());
test.insert(24);
test.insert(25);
test.insert(26);
test.insert(27);
test.prettyPrint(test.root);
console.log(test.rebalance());
test.prettyPrint(test.root);
*/

function randomArray(size) {
  const array = [];

  for (let i = 1; i <= size; i++) {
    array.push(i);
  }

  shuffle(array);

  return array;
}

function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}

/*
function logNodeValue(node) {
  console.log(node.value);
}
*/

const array = randomArray(20);
const test = new Tree(array);
console.log(test.isBalanced());
test.prettyPrint(test.root);
/*
console.log(test.levelOrder(logNodeValue));
console.log(test.preOrder(logNodeValue));
console.log(test.postOrder(logNodeValue));
console.log(test.inOrder(logNodeValue));
*/
test.insert(24);
test.insert(25);
test.insert(26);
test.insert(27);
console.log(test.isBalanced());
test.prettyPrint(test.root);
console.log(test.rebalance());
test.prettyPrint(test.root);
/*
console.log(test.levelOrder(logNodeValue));
console.log(test.preOrder(logNodeValue));
console.log(test.postOrder(logNodeValue));
console.log(test.inOrder(logNodeValue));
*/