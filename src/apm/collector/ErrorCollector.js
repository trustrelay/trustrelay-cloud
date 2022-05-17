export default class ErrorCollector {
  constructor(errorCode, errorType, errorMessage) {
    this.errorCode = errorCode;
    this.errorType = errorType;
    this.errorMessage = errorMessage;
  }

  async prepare(event) {
    event.errorCode = this.errorCode;
    event.errorType = this.errorType;
    event.errorMessage = this.errorMessage;

    return event;
  }
}
