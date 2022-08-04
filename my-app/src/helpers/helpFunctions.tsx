const AMOUNT_COLOR = 256;

const firstName = ['Tesla', 'Ferrari', 'Lamborghini', 'Ford',
  'Audi', 'Toyota', 'Opel', 'Volkswagen', 'Mercedes', 'BMV',
  'KIA', 'Fiat', 'Isuzu', 'Renault', 'Peugeot', 'Seat', 'Porsche ']

const lastName = ['407', 'Gallardo', 'Diablo', 'Mustang',
  'A4', 'Corolla', 'Zafira', 'Passat', 'Benz', 'M5',
  'Rio', 'Romeo', 'Cayenne', 'Panamera', '911', 'Cayman', 'Clio']

export const getRandomName = () => {
  const first = firstName[Math.floor(Math.random() * firstName.length)]
  const last = lastName[Math.floor(Math.random() * lastName.length)]

  return `${first} ${last}`
}

export const getRandomColor = () => {
  const AMOUNT_GROUPS_COLORS = 3;
  const NUMBER_SYSTEM = 16;
  let hexColor = '#'

  for (let i = 0; i < AMOUNT_GROUPS_COLORS; i++) {
    const randomNumber = Math.floor(Math.random() * AMOUNT_COLOR).toString(NUMBER_SYSTEM)

    hexColor += randomNumber.length > 1 ? randomNumber : `0${randomNumber}`
  }

  return hexColor;
}