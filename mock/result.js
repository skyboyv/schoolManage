export default class Result {
  status;

  data;

  total;

  message;

  set status(value) {
    this.status = value;
  }

  get status() {
    return this.status;
  }

  set total(value) {
    this.total = value;
  }

  get total() {
    return this.total;
  }

  set data(value) {
    this.data = value;
  }

  get data() {
    return this.data;
  }

  set message(value) {
    this.message = value;
  }

  get message() {
    return this.message;
  }
}
