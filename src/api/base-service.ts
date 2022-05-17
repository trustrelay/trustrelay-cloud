import { HttpStatusCode } from './models/http-status-code';
import { AxiosResponse, AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import axiosClient from './client';
import _, { isNull } from 'lodash';
import { collector, Producer, Transport } from '../apm';
import ErrorCollector from '../apm/collector/ErrorCollector';

export default class BaseService {
  public client: AxiosInstance;

  constructor() {
    this.client = axiosClient;
  }

  protected handleError(err: AxiosError, url?: string) {
    console.log('[baseService] handleError ERR: ', err);

    const targetUrl = process.env.REACT_APP_APM_BASE_URL;
    const transport = new Transport(targetUrl);
    var collectors = collector.defaultCollectors
    collectors = [...collectors, new ErrorCollector(url, err.name, err.message)]
    console.log(err)
    const producer = new Producer(transport, collectors);
    (async function send() {
      try {
        // Step 5: Collect and send the event
        await producer.collect();
      } catch (cause) {
        console.log('Error processing event', cause);
      }
    })();

    //throw new Error(_.get(err, 'response.data.error.messages', _.get(err, 'message', '')));
  }

  protected validateStatus(
    res: AxiosResponse,
    dataRequired = false,
    expectedStatus: HttpStatusCode = HttpStatusCode.Ok,
  ) {
    if (
      !res ||
      res.status !== expectedStatus ||
      (dataRequired && !res.data)
    ) {
      throw new Error('Something went wrong :( ');
    }
  }

  protected async simpleGet<T>(url: string, jwt: string = ""): Promise<T> {

    let headers = {}

    if (!isNull(jwt)) {
      headers = {
        'Authorization': `Bearer ${jwt}`
      }
    }

    return await this.client
      .get(url, {
        headers: headers
      })
      .then((res) => {
        this.validateStatus(res, true);
        return res.data;
      })
      .catch((err) => {
        this.handleError(err, url);
      });

  }

  protected async postWithResponse<T>(url: string, jwt: string = "", data: any = {}): Promise<T> {

    let headers = {}

    if (!isNull(jwt)) {
      headers = {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    }

    return await this.client
      .post(url, data, {
        headers: headers
      })
      .then((res) => {
        this.validateStatus(res, true);
        return res.data;
      })
      .catch((err) => {
        this.handleError(err, url);
      });
  }


  protected async patchWithResponse<T>(url: string, jwt: string = "", data: any = {}): Promise<T> {

    let headers = {}

    if (!isNull(jwt)) {
      headers = {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    }

    return await this.client
      .patch(url, data, {
        headers: headers
      })
      .then((res) => {
        this.validateStatus(res, true);
        return res.data;
      })
      .catch((err) => {
        this.handleError(err, url);
      });
  }



  protected async deleteWithResponse<T>(
    url: string,
    jwt: string = "",
    data?:any
  ): Promise<T> {

    let headers = {}

    if (!isNull(jwt)) {
      headers = {
        'Authorization': `Bearer ${jwt}`
      }
    }


    return await this.client
      .delete(url, {
        headers: headers,
        data:data
      } as AxiosRequestConfig,)
      .then((res) => {
        this.validateStatus(res, true);
        return res.data;
      })
      .catch((err) => {
        this.handleError(err, url);
      });

  }

  protected async simplePost(
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<any> {

    const res = await this.client.post(url, data, config);

    if (res.status === 200) {
      this.validateStatus(res, true);
      return res.data;
    }
    else {
      //  this.handleError(err);
      return null;
    }

  }


  protected async simplePatch(
    url: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<any> {

    const res = await this.client.patch(url, data, config);

    if (res.status === 200) {
      this.validateStatus(res, true);
      return res.data;
    }
    else {
      //  this.handleError(err);
      return null;
    }

  }


}
