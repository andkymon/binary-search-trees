import { Tree } from "./tree.js";

// Initialize
const test = new Tree([1, 7, 8, 5, 9]);

// prettyPrint
test.prettyPrint(test.root);

// insert()
test.insert(2);
test.prettyPrint(test.root);