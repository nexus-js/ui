
export default class Lowpass {

  constructor(factor) {
    this.factor = factor || 2;
    this.history = []
  }

  update(value) {
    this.history.push(value);
    if (this.history.length > this.factor) {
      this.history.splice(0,this.history.length - this.factor);
    }
    this.value = math.avg(this.history);
    return this.value;
  }

}
