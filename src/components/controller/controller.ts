import AppLoader from './appLoader';
import { DataInterface, Callback, Endpoint } from '../../types/interface';

class AppController extends AppLoader {
  getSources(callback: Callback<Partial<DataInterface>>): void {
    super.getResp(
      {
        endpoint: Endpoint.sources,
      },
      callback
    );
  }

  getNews(e: MouseEvent, callback: Callback<Partial<DataInterface>>): void {
    if (e.target) {
      let target = e.target as HTMLElement || null;
      const newsContainer = e.currentTarget as HTMLElement || null;

      while (target !== newsContainer) {
        if (target.classList.contains('source__item')) {
          const sourceId: string | null = target.getAttribute('data-source-id');
          if (newsContainer !== null && sourceId !== null) {
            if (newsContainer.getAttribute('data-source') !== sourceId) {
              newsContainer.setAttribute('data-source', sourceId);
              super.getResp(
                {
                  endpoint: Endpoint.everything,
                  options: {
                    sources: sourceId,
                  },
                },
                callback
              );
            }
          }
          return;
        }
        if (target.parentElement !== null) {
          target = target.parentElement;
        }
      }
    }
  }
}

export default AppController;
