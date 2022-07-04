import './news.css';
import { DataInterface, DataArticles } from '../../../types/interface';
// import { s } from '../../../assets/images/';


class News {
  draw(data: Partial<DataInterface>): void {
    if (data["articles"]) {

      const dataLength: number = data["articles"].length;
      const news = dataLength >= 10 ? data["articles"].filter((_item, idx) => idx < 10) : data["articles"];

      const fragment: DocumentFragment = document.createDocumentFragment();
      const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement || null;

      if (newsItemTemp === null) {
        throw new Error('Element is undefined');
      }
      news.forEach((item: Pick<DataArticles, "author" | "urlToImage" | "publishedAt" | "source" | "title" | "description" | "url">, idx) => {
        const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement || null;
        if (newsClone === null) {
          throw new Error('Element is undefined');
        }
        const newsItem = newsClone.querySelector('.news__item') as HTMLElement || null;
        const newsMetaPhoto = newsClone.querySelector('.news__meta-photo') as HTMLElement || null;
        const newsMetaAuthor = newsClone.querySelector('.news__meta-author') as HTMLElement || null;
        const newsMetaDate = newsClone.querySelector('.news__meta-date') as HTMLElement || null;
        const newsDescriptionTitle = newsClone.querySelector('.news__description-title') as HTMLElement || null;
        const newsDescriptionSource = newsClone.querySelector('.news__description-source') as HTMLElement || null;
        const newsDescriptionContent = newsClone.querySelector('.news__description-content') as HTMLElement || null;
        const newsReadMore = newsClone.querySelector('.news__read-more a') as HTMLElement || null;

        if (newsItem === null || newsMetaPhoto === null || newsMetaAuthor === null
          || newsMetaDate === null || newsDescriptionTitle === null || newsDescriptionSource === null
          || newsDescriptionContent === null || newsReadMore === null) {
          throw new Error('Element is undefined');
        }
        if (idx % 2) newsItem.classList.add('alt');

        if (item.urlToImage) {
          newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage})`;
        }
        newsMetaAuthor.textContent = item.author || item.source.name;
        newsMetaDate.textContent = item.publishedAt
          .slice(0, 10)
          .split('-')
          .reverse()
          .join('-');

        newsDescriptionTitle.textContent = item.title || "";
        newsDescriptionSource.textContent = item.source.name || "";
        newsDescriptionContent.textContent = item.description || "";
        newsReadMore.setAttribute('href', item.url || '');

        fragment.append(newsClone);
      });

      const newsElement = document.querySelector('.news') as HTMLElement || null;
      if (newsElement === null) {
        throw new Error('Element is undefined');
      }
      newsElement.innerHTML = '';
      newsElement.appendChild(fragment);
    }
  }
}

export default News;
