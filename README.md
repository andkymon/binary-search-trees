# binary-search-trees

# Binary Search Trees

This `Tree` class implements a balanced binary search tree (BST) with various utility methods for insertion, deletion, traversal, and balance checking. It automatically balances the tree during construction and offers functionality to rebalance the tree when necessary. The tree is represented by `Node` objects, and all tree operations are performed with efficiency in mind.

## Methods

### `constructor(array)`
- Initializes the tree by first sorting the input array and then building the tree.

### `buildTree(array)`
- Recursively builds a balanced binary search tree from a sorted array.

### `prettyPrint(node, prefix = "", isLeft = true)`
- Prints a visual representation of the tree, showing the structure with ASCII characters.

### `insert(value)`
- Inserts a new value into the tree while maintaining the BST property.

### `deleteItem(value)`
- Deletes a node with the specified value from the tree, handling three cases: no child, one child, and two children.

### `find(value)`
- Searches for a node with the given value and returns it. Throws an error if the node is not found.

### `levelOrder(callback)`
- Performs a level-order traversal (breadth-first) of the tree, executing the provided callback on each node.

### `inOrder(callback, rootNode = this.root)`
- Performs an in-order traversal (left, root, right) of the tree and executes the provided callback on each node.

### `preOrder(callback, rootNode = this.root)`
- Performs a pre-order traversal (root, left, right) of the tree and executes the provided callback on each node.

### `postOrder(callback, rootNode = this.root)`
- Performs a post-order traversal (left, right, root) of the tree and executes the provided callback on each node.

### `height(node)`
- Returns the height of a given node (the longest path from the node to a leaf).

### `depth(node)`
- Returns the depth of a given node (the number of edges from the root to the node).

### `isBalanced()`
- Checks if the tree is balanced. A balanced tree is one where the heights of the left and right subtrees differ by no more than one.

### `rebalance()`
- Rebalances the tree by rebuilding it from an in-order traversal of the current nodes. If the tree is already balanced, it returns a message indicating that.
