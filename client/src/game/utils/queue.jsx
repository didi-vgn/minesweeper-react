export class Queue {
  constructor() {
    this.items = [];
    this.head = 0;
  }

  enqueue(item) {
    this.items.push(item);
  }

  dequeue() {
    const item = this.items[this.head++];
    if (this.head > 100 && this.head * 2 > this.items.length) {
      this.items = this.items.slice(this.head);
      this.head = 0;
    }
    return item;
  }

  getLength() {
    return this.items.length - this.head;
  }

  isEmpty() {
    return this.head >= this.items.length;
  }
}
