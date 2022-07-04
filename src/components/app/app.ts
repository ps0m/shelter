import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { Navigation } from '../view/navigation/navigation';


class App {
  private _controller: AppController;
  private _view: AppView;
  private _navigation: Navigation;
  constructor() {
    this._controller = new AppController();
    this._view = new AppView();
    this._navigation = new Navigation();
  }

  start(): void {
    const sources = document.querySelector('.sources') as HTMLElement || null;
    const navigation = document.querySelector('#navigation') as HTMLElement || null;
    this._navigation.init();
    if (sources !== null && navigation !== null) {
      navigation.addEventListener('click', (e) => {
        this._navigation.changePointer(e)
        this._controller.getSources((data) => {
          console.log('data2', data);
          this._view.drawSources(data, this._navigation.pointer)
        });
      });
      sources.addEventListener('click', (e) => this._controller.getNews(e, (data) => {
        console.log('data1', data);
        this._view.drawNews(data)
      }));
      this._controller.getSources((data) => {
        console.log('data2', data);
        this._view.drawSources(data, this._navigation.pointer)
      });
    }
  }
}

export default App;
