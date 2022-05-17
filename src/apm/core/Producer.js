/* eslint no-await-in-loop: 0 */

 

export default class Producer {
  constructor(transport, collectors) {
    this.transport = transport;
    this.collectors = Array.isArray(collectors) ? [].concat(collectors) : [];
  }


  async collect(version) {
    let event = {};

    for (let i = 0; i < this.collectors.length; i += 1) {
      event = await this.collectors[i].prepare(event); 

      if (!event) {
        throw new Error(`Invalid event returned by collector ${this.collectors[i].name}`);
      }
    }

    await this.transport.execute(event);
  }
}
