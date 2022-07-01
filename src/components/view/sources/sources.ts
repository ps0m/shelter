import './sources.css';
import { DataInterface, DataSources } from '../../../types/interface';

class Sources {
  draw(data: Partial<DataInterface>): void {
    const fragment: DocumentFragment = document.createDocumentFragment();
    const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement || null;
    if (sourceItemTemp === null) {
      throw new Error('Element is undefined');
    }
    if (data["sources"]) {

      data["sources"].forEach((item: Pick<DataSources, "id" | 'name'>) => {
        const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement || null;
        const sourceItemName = sourceClone.querySelector('.source__item-name') as HTMLElement || null;
        const sourceItem = sourceClone.querySelector('.source__item') as HTMLElement || null;

        if (sourceItemName === null || sourceItem === null) {
          throw new Error('Element is undefined');
        }
        sourceItemName.textContent = item.name;
        sourceItem.setAttribute('data-source-id', item.id);
        fragment.append(sourceClone);
      });
    }

    const sources = document.querySelector('.sources') as HTMLElement || null;
    if (sources === null) {
      throw new Error('Element is undefined');
    }
    sources.append(fragment);
  }
}

export default Sources;
