import { Node } from "./node.js";

export class Tree {
  constructor(array) {
    array.sort();
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    if (array.length === 0) {
      return null;
    }

    const middleIndex = Math.floor((array.length - 1) / 2);
    const root = array[middleIndex];
    const leftSubtree = this.buildTree(array.slice(0, middleIndex));
    const rightSubtree = this.buildTree(array.slice(middleIndex + 1));

    return new Node(root, leftSubtree, rightSubtree);
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }

    if (node.rightNode !== null) {
      this.prettyPrint(
        node.rightNode,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }

    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);

    if (node.leftNode !== null) {
      this.prettyPrint(
        node.leftNode,
        `${prefix}${isLeft ? "    " : "│   "}`,
        true
      );
    }
  }

  insert(value) {
    let searchPointer = this.root;

    // Stop on the target node's parent
    // While searchPointer is not a leaf
    while (
      searchPointer.leftNode !== null &&
      searchPointer.rightNode !== null
    ) {
      if (value === searchPointer.value) {
        return;
      }

      if (value < searchPointer.value) {
        if (searchPointer.leftNode === null) {
          searchPointer.leftNode = new Node(value, null, null);
          return;
        }

        searchPointer = searchPointer.leftNode;
        continue;
      }

      if (value > searchPointer.value) {
        if (searchPointer.rightNode === null) {
          searchPointer.rightNode = new Node(value, null, null);
          return;
        }

        searchPointer = searchPointer.rightNode;
        continue;
      }
    }
  }

  deleteItem(value) {
    let searchPointer = this.root;
    let parent;

    // Stop on the target node
    while (searchPointer !== null) {
      if (value === searchPointer.value) {
        break;
      }

      parent = searchPointer;

      if (value < searchPointer.value) {
        searchPointer = searchPointer.leftNode;
        continue;
      }

      if (value > searchPointer.value) {
        searchPointer = searchPointer.rightNode;
        continue;
      }
    }

    // If node not found, return
    if (searchPointer === null) {
      console.error("Node not found");
      return;
    }

    if (parent.leftNode === searchPointer) {
      // If target node has no child, parent points to null
      if (searchPointer.leftNode === null && searchPointer.rightNode === null) {
        parent.leftNode = null;
        return;
      }

      // If target node has one child, parent points to target node's child
      if (searchPointer.leftNode === null) {
        parent.leftNode = searchPointer.rightNode;
        return;
      } else if (searchPointer.rightNode === null) {
        parent.leftNode = searchPointer.leftNode;
        return;
      }
    }

    if (parent.rightNode === searchPointer) {
      // If target node has no child, parent points to null
      if (searchPointer.leftNode === null && searchPointer.rightNode === null) {
        parent.rightNode = null;
        return;
      }

      // If target node has one child, parent points to target node's child
      if (searchPointer.leftNode === null) {
        parent.rightNode = searchPointer.rightNode;
        return;
      } else if (searchPointer.rightNode === null) {
        parent.rightNode = searchPointer.leftNode;
        return;
      }
    }

    //function deleteconditions

    // if two children
    // replace with leftmost child of right child
    //if leftmost child has right subtree, pass subtree to parent left
  }
}
