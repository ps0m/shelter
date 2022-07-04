import News from './news/news';
import Sources from './sources/sources';
import { DataInterface, Status } from '../../types/interface';

export class AppView {
  private _news: News;
  private _sources: Sources;
  constructor() {
    this._news = new News();
    this._sources = new Sources();
  }

  drawNews(data: Partial<DataInterface>) {
    if (data && data.status === Status.ok) {
      this._news.draw(data);
    }
  }

  drawSources(data: Partial<DataInterface>, pointer: string) {
    if (data && data.status === Status.ok) {
      this._sources.draw(data, pointer);
    }
  }
}

export default AppView;
