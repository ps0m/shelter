import { DataInterface, Callback, ResponseStatus } from '../../types/interface';

class Loader {
  baseLink: string;
  options?: { [index: string]: string };
  constructor(baseLink: string, options?: { [index: string]: string }) {
    this.baseLink = baseLink;
    this.options = options;
  }

  getResp(
    { endpoint, options = {} }: { endpoint: string, options?: { [index: string]: string } },
    callback: Callback<Partial<DataInterface>> = () => {
      console.error('No callback for GET response');
    }
  ): void {
    this.load(endpoint, callback, options, 'GET',);
  }

  errorHandler(res: Response): Response {
    if (!res.ok) {
      if (res.status === ResponseStatus.unauthorized || res.status === ResponseStatus.notFound)
        console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
      throw Error(res.statusText);
    }

    return res;
  }

  makeUrl(options: object, endpoint: string): string {
    const urlOptions: Readonly<{ [index: string]: string }> = { ...this.options, ...options };
    let url = `${this.baseLink}${endpoint}?`;
    Object.keys(urlOptions).forEach((key) => {
      url += `${key}=${urlOptions[key]}&`
    });

    return url.slice(0, -1);
  }

  load(endpoint: string, callback: (data: Partial<DataInterface>) => void, options: object = {}, method?: string): void {
    fetch(this.makeUrl(options, endpoint), { method })
      .then(this.errorHandler)
      .then((res) => res.json())
      .then((data: Partial<DataInterface>) => {
        callback(data);
      })
      .catch((err) => console.error(err));
  }
}

export default Loader;
