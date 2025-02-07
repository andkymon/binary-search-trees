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

    // Find the target node
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
      throw new Error("Node not found");
    }
    
    // Case 1: If target node has no child, target node is replaced by null
    if (targetNode.leftNode === null && targetNode.rightNode === null) {
      
      // Check which branch of the target node's parent references it, then set it to null
      if (targetParent.leftNode === targetNode) {
        targetParent.leftNode = null;
      } else {
        targetParent.rightNode = null;
      }
      return;
    }

    // Case 2: If target node has one child, target node is replaced by target's child
    if (targetNode.leftNode === null || targetNode.rightNode === null) {
      let targetChild;

       // Find target's only child
      if (targetNode.leftNode === null) {
        targetChild = targetNode.rightNode;      
      } else if (targetNode.rightNode === null) {
        targetChild = targetNode.leftNode;      
      }
  
      // Check which branch of the target node's parent references it, then set it to target's child
      if (targetParent.leftNode === targetNode) {
        targetParent.leftNode = targetChild;
      } else {
        targetParent.rightNode = targetChild;
      }

      return;
    }

    // Case 3.1: If target node has two children, find the inorder succeessor (left most node of right subtree)
    let inorderSuccessor = targetNode.rightNode;
    let inorderSuccessorParent = targetNode;

    // Case 3.2: If right node of target node is immediately the inorder successor, copy its value and right subtree to the target node
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

  find(value) {
    let targetNode = this.root;

    while (targetNode !== null) {
      if (value === targetNode.value) {
        break;
      }

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
      throw new Error("Node not found");
    }

    return targetNode;
  }

  levelOrder(callback) {
    if (callback === undefined) {
      throw new Error("Callback function is required.");
    }

    let searchPointer;
    const queue = [];
    
    queue.push(this.root);
    
    while (queue.length !== 0) {
      searchPointer = queue.shift();
      callback(searchPointer);

      if (searchPointer.leftNode !== null) {
        queue.push(searchPointer.leftNode)
      }

      if (searchPointer.rightNode !== null) {
        queue.push(searchPointer.rightNode);
      }
    }

    return queue;
  }

  inOrder(callback, rootNode = this.root) {
    if (callback === undefined) {
      throw new Error("Callback function is required.");
    }

    if (rootNode === null) {
      return;
    }

    this.inOrder(callback, rootNode.leftNode);
    callback(rootNode);
    this.inOrder(callback, rootNode.rightNode);
  }

  preOrder(callback, rootNode = this.root) {
    if (callback === undefined) {
      throw new Error("Callback function is required.");
    }

    if (rootNode === null) {
      return;
    }

    callback(rootNode);
    this.preOrder(callback, rootNode.leftNode);
    this.preOrder(callback, rootNode.rightNode);
  }

  postOrder(callback, rootNode = this.root) {
    if (callback === undefined) {
      throw new Error("Callback function is required.");
    }

    if (rootNode === null) {
      return;
    }

    this.postOrder(callback, rootNode.leftNode);
    this.postOrder(callback, rootNode.rightNode);
    callback(rootNode);
  }

  height(node) {
    if (node === null) {
      return 0;
    }

    const leftSubtreeHeight = this.height(node.leftNode);
    const rightSubtreeHeight = this.height(node.rightNode);

    if (leftSubtreeHeight > rightSubtreeHeight) {
      return leftSubtreeHeight + 1;
    } else {
      return rightSubtreeHeight + 1;
    }
  }

  depth(node) {
    if (node === null) {
      throw new Error("Node not found");
    }

    let searchPointer = this.root;
    let counter = 1;

    while (searchPointer !== null) {
      if (node.value === searchPointer.value) {
        return counter;
      }

      if (node.value < searchPointer.value) {
        searchPointer = searchPointer.leftNode;
        counter++;
        continue;
      }
      
      if (node.value > searchPointer.value) {
        searchPointer = searchPointer.rightNode;
        counter++;
        continue;
      }
    }
  }
}
