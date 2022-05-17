export default class TimeCollector {

  constructor() { 
  }

  async prepare(event) {
    let timeCollected = Number.MAX_SAFE_INTEGER-parseInt((new Date().getTime() / 1000).toFixed(0))
    event.rut = timeCollected; 

    return event;
  }
}
