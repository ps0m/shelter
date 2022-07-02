import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://newsapi.org/v2/', {
      apiKey: 'eda60b513a1d4833927372bd6ef8f44a', // получите свой ключ https://newsapi.org/
    });
  }
}

export default AppLoader;
