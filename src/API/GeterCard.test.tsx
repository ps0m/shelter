
import someCards from "../tests/someCards.json";
import GeterCards from "./GeterCards";

describe('GeterCards', () => {
  test('Get all cards', async () => {
    const data = await GeterCards.getCards();
    const firsFour = data?.slice(0, 4)

    expect(data?.length).toBe(40);
    expect(firsFour).toEqual(someCards);
  })
})

