import './navigation.css';


// const alphabet: Array<string> = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
//   'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'Y', 'X', 'Z'];

export class Navigation {
  alphabet: Array<string>;
  pointer: string;
  arrayOfElement: HTMLElement[];
  constructor() {
    this.alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
      'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'Y', 'X', 'Z'];
    this.pointer = this.alphabet[0];
    this.arrayOfElement = [];
  }
  init(): void {
    const navigationContainer = document.querySelector('#navigation') as HTMLTemplateElement || null;
    if (navigationContainer === null) {
      throw new Error('Element is undefined');
    }
    this.alphabet.forEach((item: string) => {
      const itemOfAlphabet: HTMLButtonElement = document.createElement("button");
      itemOfAlphabet.classList.add("navigation__item");
      // itemOfAlphabet.classList.remove("navigation__item_active");
      if (item === this.pointer) {
        itemOfAlphabet.classList.add("navigation__item_active");
      }
      itemOfAlphabet.setAttribute('letter', item);
      itemOfAlphabet.textContent = item;
      this.arrayOfElement.push(itemOfAlphabet);
      navigationContainer.append(itemOfAlphabet);
    })

  }
  changePointer(e: MouseEvent): void {
    const currentElement = e.target as HTMLElement || null;
    if (currentElement !== null) {
      const currentElementAttribute: (string | null) = currentElement.getAttribute('letter')
      if (currentElementAttribute !== null) {
        this.arrayOfElement.forEach((item: HTMLElement) => {
          if (item.getAttribute('letter') === this.pointer) {
            item.classList.remove("navigation__item_active");
          }
        })
        currentElement.classList.add("navigation__item_active");
        this.pointer = currentElementAttribute;
      }
    }
  }
}