/* eslint-disable no-restricted-globals */
import UserAgentParser from './utility/UserAgentParser';

export default class SoftwareCollector extends UserAgentParser {

  async prepare (event) {
    const browser = this.parser.getBrowser();
    const os = this.parser.getOS();
    const encoding = (document.inputEncoding || document.characterSet) || (document.charset || document.defaultCharset);
    event.viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight, 0) || null;
    event.viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth, 0) || null;
    event.screenColors = screen.colorDepth || '';
    event.osName = os.name || '';
    event.osVersion = os.version || '';
    event.encoding = encoding || '';
    event.language = (document.documentElement.lang || navigator.language) || '';
    event.softwareInfo1 = browser.name || '';
    event.softwareInfo2 = browser.version || '';
    return event;
  }
}

// https://stackoverflow.com/questions/1248081/get-the-browser-viewport-dimensions-with-javascript
// https://stackoverflow.com/questions/318831/get-encoding-of-page-iframe-via-javascript
// https://stackoverflow.com/questions/662923/extract-lang-value-using-javascript
