class Queue {
  constructor() {
    this.messages = [];
  }

  enqueue(payload) {
    this.messages.push(payload);
  }

  dequeue() {
    return this.messages.shift();
  }

  length() {
    return this.messages.length;
  }
}

module.exports = Queue;
