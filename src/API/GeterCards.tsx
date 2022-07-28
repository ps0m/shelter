import { ICard } from "../types/types";

class GeterCards {
  static url = 'https://raw.githubusercontent.com/ps0m/Assets-for-my-projects/main/Online_store/seeds.json';
  static async getCards(param: object = {}) {
    try {
      const response = await fetch(GeterCards.url, param);
      const data: ICard[] = await response.json();

      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  }
}
export default GeterCards;