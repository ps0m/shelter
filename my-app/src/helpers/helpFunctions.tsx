import {
  controlEngine, createWinner, getWinner, updateWinner,
} from '../API/API';
import {
  ICarsWithStatus, IVelocityAndDistance, IWinnerOfServer, statusEngine,
} from '../type/type';

const AMOUNT_COLOR = 256;

const firstName = ['Tesla', 'Ferrari', 'Lamborghini', 'Ford',
  'Audi', 'Toyota', 'Opel', 'Volkswagen', 'Mercedes', 'BMV',
  'KIA', 'Fiat', 'Isuzu', 'Renault', 'Peugeot', 'Seat', 'Porsche '];

const lastName = ['407', 'Gallardo', 'Diablo', 'Mustang',
  'A4', 'Corolla', 'Zafira', 'Passat', 'Benz', 'M5',
  'Rio', 'Romeo', 'Cayenne', 'Panamera', '911', 'Cayman', 'Clio'];

export const getRandomName = () => {
  const first = firstName[Math.floor(Math.random() * firstName.length)];
  const last = lastName[Math.floor(Math.random() * lastName.length)];

  return `${first} ${last}`;
};

export const getRandomColor = () => {
  const AMOUNT_GROUPS_COLORS = 3;
  const NUMBER_SYSTEM = 16;
  let hexColor = '#';

  for (let i = 0; i < AMOUNT_GROUPS_COLORS; i += 1) {
    const randomNumber = Math.floor(Math.random() * AMOUNT_COLOR).toString(NUMBER_SYSTEM);

    hexColor += randomNumber.length > 1 ? randomNumber : `0${randomNumber}`;
  }

  return hexColor;
};

export const setWinnerToServer = async (winnerCar: ICarsWithStatus | null) => {
  if (winnerCar === null) {
    return;
  }

  if (winnerCar.time === null) {
    return;
  }

  const response: IWinnerOfServer = await getWinner(winnerCar.car.id);

  if ('id' in response) {
    const time = winnerCar.time > response.time ? response.time : winnerCar.time;
    const wins = response.wins + 1;

    updateWinner({ id: response.id, wins, time });
  } else {
    createWinner({ id: winnerCar.car.id, wins: 1, time: winnerCar.time });
  }
};

export const setTimeTripAllCars = async (carsOfServer: ICarsWithStatus[]) => {
  const newCars = [...carsOfServer];
  const promiseControlEngine = [];

  for (let i = 0; i < newCars.length; i += 1) {
    if (newCars[i].status === 'started') {
      promiseControlEngine.push(controlEngine({ id: newCars[i].car.id, status: 'started' }));
    }
  }
  const resultArray: PromiseSettledResult<IVelocityAndDistance>[] = await Promise.allSettled(
    promiseControlEngine,
  );

  resultArray.forEach((promise, index) => {
    if (promise.status === 'fulfilled') {
      const time = Number(((promise.value.distance / promise.value.velocity) / 1000).toFixed(2));

      newCars[index].time = time;
    }
  });

  return newCars;
};

export const setTimeTripCar = async (car: ICarsWithStatus, command: statusEngine) => {
  const response: IVelocityAndDistance = await controlEngine({ id: car.car.id, status: command });

  return Number(((response.distance / response.velocity) / 1000).toFixed(2));
};
