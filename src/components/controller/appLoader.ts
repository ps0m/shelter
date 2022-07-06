import Loader from './loader';

class AppLoader extends Loader {
  constructor() {
    super('https://nodenews.herokuapp.com/', {
      apiKey: 'eda60b513a1d4833927372bd6ef8f44a', // получите свой ключ https://newsapi.org/
    });
  }
}

export default AppLoader;
