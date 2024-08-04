class HashMap {
  capacity = 16;
  LOAD_FACTOR = 0.75;
  buckets = [];
  constructor() {
    for (let i = 0; i < this.capacity; i++) {
      const bucket = new LinkedList();
      this.buckets.push(bucket);
    }
  }
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    const hashedKey = this.hash(key);
    const bucket = this.buckets[hashedKey];
    if (!bucket.head) {
      const newNode = new Node({ [key]: value });
      bucket.head = newNode;
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
    }

    if (this.length() > this.capacity * this.LOAD_FACTOR) {
      this.grow();
    }
  }

  grow() {
    for (let i = 0; i < this.capacity; i++) {
      const bucket = new LinkedList();
      this.buckets.push(bucket);
    }
    this.capacity = this.capacity * 2;
    const oldNodes = this.entries();
    this.clear();
    for (let node of oldNodes) {
      const [key, value] = node;
      this.set(key, value);
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

  length() {
    let keyCount = 0;
    for (let bucket of this.buckets) {
      let currentNode = bucket.head;

      while (currentNode != null) {
        keyCount = keyCount + 1;
        currentNode = currentNode.pointer;
      }
    }
    return keyCount;
  }
  clear() {
    for (let bucket of this.buckets) {
      bucket.head = null;
    }
  }

  keys() {
    let keys = [];
    for (let bucket of this.buckets) {
      let currentNode = bucket.head;

      while (currentNode != null) {
        keys = [...keys, ...Object.keys(currentNode.value)];
        currentNode = currentNode.pointer;
      }
    }
    return keys;
  }

  values() {
    let values = [];
    for (let bucket of this.buckets) {
      let currentNode = bucket.head;

      while (currentNode != null) {
        values = [...values, ...Object.values(currentNode.value)];
        currentNode = currentNode.pointer;
      }
    }
    return values;
  }

  entries() {
    let entries = [];
    for (let bucket of this.buckets) {
      let currentNode = bucket.head;

      while (currentNode != null) {
        entries = [...entries, ...Object.entries(currentNode.value)];
        currentNode = currentNode.pointer;
      }
    }
    return entries;
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
