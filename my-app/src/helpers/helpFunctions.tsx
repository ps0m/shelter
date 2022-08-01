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