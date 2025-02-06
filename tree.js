import { Node } from "./node.js";

export class Tree {
    constructor(array) {
        array.sort();
        this.root = this.buildTree(array);
        console.log(this.root);
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
            this.prettyPrint(node.rightNode, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }

        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
        
        if (node.leftNode !== null) {
            this.prettyPrint(node.leftNode, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }
}