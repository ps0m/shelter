import AppController from '../controller/controller';
import { AppView } from '../view/appView';


class App {
  private _controller: AppController;
  private _view: AppView;
  constructor() {
    this._controller = new AppController();
    this._view = new AppView();
  }

  start(): void {
    const sources = document.querySelector('.sources') as HTMLElement || null;
    if (sources !== null) {
      sources.addEventListener('click', (e) => this._controller.getNews(e, (data) => {
        console.log('data1', data);
        this._view.drawNews(data)
      }));
      this._controller.getSources((data) => {
        console.log('data2', data);
        this._view.drawSources(data)
      });
    }
  }
}

export default App;
