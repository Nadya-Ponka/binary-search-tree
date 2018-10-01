class Node {
	constructor(data) {
		this.data = data;
		this.left = null;
		this.right = null;
	}
}

exports.BinaryTree = class BinaryTree {
	constructor(comparator = cmp) {
		this.comparator = comparator;
		this.root = null;
	}


	insert(str) {
		let newNode = new Node(str);
		if (this.root === null) {
			this.root = newNode;
			console.log(`Insert root: ${str}`);
		} else {
			this.insertNode(this.root, newNode);
			console.log(`Insert: ${str}`);
		}
	}

	insertNode(node, newNode) {
		if (newNode.data === node.data) {
			alert(`This tree already contains ${node.data}`);
		} else {
			if (newNode.data < node.data) {
				if (node.left === null)
					node.left = newNode;
				else
					this.insertNode(node.left, newNode);
			} else {
				if (node.right === null)
					node.right = newNode;
				else
					this.insertNode(node.right, newNode);
			}
		}
	}

	remove(str) {
		let that = this;

		function removeNode(node, str) {
			if (node === null) {
				return null;
			}

			if (node.data === str) {
				console.log(`Remove: ${str}`);

				// node has 0 or 1 child
				if (node.left === null && node.right === null) {
					return null;
				}
				if (node.left === null) {
					return node.right;
				}
				if (node.right === null) {
					return node.left;
				}

				// node has 2 children
				let tempNode = that.getSmallest(node.right);
				node.data = tempNode;
				node.right = removeNode(node.right, tempNode);
				return node;
			} else if (str < node.data) {
				node.left = removeNode(node.left, str);
				return node;
			} else {
				node.right = removeNode(node.right, str);
				return node;
			}
		};

		this.root = removeNode(this.root, str);
	}

	getSmallest(node) {
		if (node === null) {
			node = this.root;
		}
		while (node.left !== null) {
			node = node.left;
		}
		return node.data;
	};

	exists(str, node = this.root) {
		if (node === null) return false;
		if (node.data === str) return true;
		if (node.data > str) return this.exists(str, node.left);
		return this.exists(str, node.right);
	}

	height(node = this.root) {
		if (node === null) {
			return 0;
		}
		return 1 + Math.max(this.height(node.left), this.height(node.right));
	}

	toArray() {
		let arr = [];

		function inOrder(node) {
			if (node !== null) {
				inOrder(node.left);
				arr.push(node.data);
				inOrder(node.right);
			}
		}

		inOrder(this.root);
		return arr;
	}
};

exports.cmp = function cmp(str1, str2) {
	return str1 < str2;
};