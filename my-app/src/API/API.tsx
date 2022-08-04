import {
  ICar, ICarCreate, IEngine, IWinner, Order, Sort
} from '../type/type';

export const AMOUNT_PER_PAGES = 7;
const urlBase = 'http://127.0.0.1:3000';
const urlGarage = `${urlBase}/garage`;
const urlWinners = `${urlBase}/winners`;
const urlEngine = `${urlBase}/engine`;

export const getCars = async (page: number, limit = AMOUNT_PER_PAGES) => {
  const response = await fetch(`${urlGarage}?_page=${page}&_limit=${limit}`);
  const data = await response.json();
  const amountPages = response.headers.get('X-Total-Count')

  console.log(data, amountPages);

  return [data, amountPages];
};

export const getCar = async (id: number) => {
  const response = await fetch(`${urlGarage}${id}`);

  return response.json();
};

export const createCar = async (property: ICarCreate) => {
  const response = await fetch(urlGarage, {
    method: 'POST',
    body: JSON.stringify(property),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
};

export const deleteCar = async (id: number) => {
  const response = await fetch(`${urlGarage}/${id}`, { method: 'DELETE' });

  return response.json();
};

export const updateCar = async (car: ICar) => {
  const response = await fetch(`${urlGarage}/${car.id}`, {
    method: 'PUT',
    body: JSON.stringify(car),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
};

export const getWinners = async (page: number, sort: Sort, order: Order, limit = AMOUNT_PER_PAGES) => {
  const response = await fetch(
    `${urlWinners}?_page=${page}&_limit=${limit}&_sort=${sort}&_order=${order}`,
  );
  const data = await response.json();

  console.log(data);
  return data;

  // return response.json();
};

export const getWinner = async (id: number) => {
  const response = await fetch(`${urlWinners}${id}`);

  return response.json();
};

export const createWinner = async (winner: IWinner) => {
  const response = await fetch(urlWinners, {
    method: 'POST',
    body: JSON.stringify(winner),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return response.json();
};

export const deleteWinner = async (id: number) => {
  const response = await fetch(`${urlWinners}/${id}`, { method: 'DELETE' });

  return response.json();
};

export const controlEngine = async (engine: IEngine) => {
  const response = await fetch(`${urlEngine}?id=${engine.id}&status=${engine.status}`, {
    method: 'PATCH',
  });

  return response.json();
};

export const switchEngine = async (id: number) => {
  const response = await fetch(`${urlEngine}?id=${id}&status=drive`, {
    method: 'PATCH',
  });
  const data = await response.json();

  console.log('resp', response.status, data);

  return data;
  // return response.json();
};
