class HashMap {
  buckets = [];
  constructor() {
    for (let i = 0; i < 16; i++) {
      const bucket = new LinkedList();
      this.buckets.push(bucket);
    }
  }
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % 16;
    }

    return hashCode;
  }

  set(key, value) {
    const hashedKey = this.hash(key);
    this.buckets[hashedKey].append(value);
  }
}

class LinkedList {
  head;
  append(value) {
    if (!this.head) {
      const newNode = new Node(value);
      this.head = newNode;
    } else {
      let currentNode = this.head;
      while (currentNode.pointer != null) {
        currentNode = currentNode.pointer;
      }
      const newNode = new Node(value);
      currentNode.pointer = newNode;
    }
  }
}
class Node {
  pointer = null;
  constructor(value) {
    this.value = value;
  }
}
