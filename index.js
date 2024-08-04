class HashMap {
  #length = 0;
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
    const bucket = this.buckets[hashedKey];
    if (!bucket.head) {
      const newNode = new Node({ [key]: value });
      bucket.head = newNode;
      this.#length = this.#length + 1;
    } else {
      let currentNode = bucket.head;
      let previousNode;
      while (currentNode != null) {
        if (currentNode.value[key]) {
          currentNode.value = { [key]: value };
          return;
        }
        previousNode = currentNode;
        currentNode = currentNode.pointer;
      }
      const newNode = new Node({ [key]: value });
      previousNode.pointer = newNode;
      this.#length = this.#length + 1;
    }
  }

  get(key) {
    const hashedKey = this.hash(key);
    const bucket = this.buckets[hashedKey];
    let currentNode = bucket.head;
    while (currentNode != null) {
      if (currentNode.value[key]) {
        return currentNode.value[key];
      }
      currentNode = currentNode.pointer;
    }
  }

  has(key) {
    const hashedKey = this.hash(key);
    const bucket = this.buckets[hashedKey];
    let currentNode = bucket.head;
    while (currentNode != null) {
      if (currentNode.value[key]) {
        return true;
      }
      currentNode = currentNode.pointer;
    }
    return false;
  }

  remove(key) {
    const hashedKey = this.hash(key);
    const bucket = this.buckets[hashedKey];

    if (bucket.head.value[key]) {
      bucket.head = null;
      return true;
    } else {
      let currentNode = bucket.head;
      let previousNode;
      while (currentNode != null) {
        if (currentNode.value[key]) {
          previousNode.pointer = currentNode.pointer;
        }

        previousNode = currentNode;
        currentNode = currentNode.pointer;
      }
      return false;
    }
  }

  get length() {
    return this.#length;
  }
}

class LinkedList {
  head = null;
}
class Node {
  pointer = null;
  constructor(value) {
    this.value = value;
  }
}
