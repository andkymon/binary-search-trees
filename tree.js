import { Node } from "./node.js";

export class Tree {
  constructor(array) {
    array.sort(function(a, b){return a-b});
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

    while (searchPointer !== null) {
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
    // Pointers to target node and targeet node's parent
    let targetNode = this.root;
    let targetParent;

    // Stop on the target node
    while (targetNode !== null) {
      if (value === targetNode.value) {
        break;
      }

      targetParent = targetNode;

      if (value < targetNode.value) {
        targetNode = targetNode.leftNode;
        continue;
      }

      if (value > targetNode.value) {
        targetNode = targetNode.rightNode;
        continue;
      }
    }

    // If target node not found, return
    if (targetNode === null) {
      console.error("Node not found");
      return;
    }

    if (targetParent.leftNode === targetNode) {
      // If target node has no child, parent points to null
      if (targetNode.leftNode === null && targetNode.rightNode === null) {
        targetParent.leftNode = null;
        return;
      }

      // If target node has one child, parent points to target node's child
      if (targetNode.leftNode === null) {
        targetParent.leftNode = targetNode.rightNode;
        return;
      } else if (targetNode.rightNode === null) {
        targetParent.leftNode = targetNode.leftNode;
        return;
      }

      // If target node has two children, find the inorder succeessor (left most node of right subtree)
      let inorderSuccessor = targetNode.rightNode;
      let inorderSuccessorParent = targetNode;

      // If right node of target node is immediately the inorder successor, copy its value and right subtree to the target node
      if (inorderSuccessor.leftNode === null) {
        targetNode.value = inorderSuccessor.value;
        targetNode.rightNode = inorderSuccessor.rightNode;
        return;
      }

      while (inorderSuccessor.leftNode !== null) {
        inorderSuccessorParent = inorderSuccessor;
        inorderSuccessor = inorderSuccessor.leftNode;
      }

      // Copy inorder successor's value to target node
      targetNode.value = inorderSuccessor.value;

      // Inorder successor's right subtree will be passed to it's parent's left node
      inorderSuccessorParent.leftNode = inorderSuccessor.rightNode;
    }

    if (targetParent.rightNode === targetNode) {
      // If target node has no child, parent points to null
      if (targetNode.leftNode === null && targetNode.rightNode === null) {
        targetParent.rightNode = null;
        return;
      }

      // If target node has one child, parent points to target node's child
      if (targetNode.leftNode === null) {
        targetParent.rightNode = targetNode.rightNode;
        return;
      } else if (targetNode.rightNode === null) {
        targetParent.rightNode = targetNode.leftNode;
        return;
      }

      // If target node has two children, find the inorder succeessor (left most node of right subtree)
      let inorderSuccessor = targetNode.rightNode;
      let inorderSuccessorParent = targetNode;

      // If right node of target node is immediately the inorder successor, copy its value and right subtree to the target node
      if (inorderSuccessor.leftNode === null) {
        targetNode.value = inorderSuccessor.value;
        targetNode.rightNode = inorderSuccessor.rightNode;
        return;
      }

      while (inorderSuccessor.leftNode !== null) {
        inorderSuccessorParent = inorderSuccessor;
        inorderSuccessor = inorderSuccessor.leftNode;
      }

      // Copy inorder successor's value to target node
      targetNode.value = inorderSuccessor.value;

      // Inorder successor's right subtree will be passed to it's parent's left node
      inorderSuccessorParent.leftNode = inorderSuccessor.rightNode;
    }
  }
}
