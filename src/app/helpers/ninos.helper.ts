import { User } from "../interface/user"


export const getEdad = (dob: string) => {
  let hoy = new Date()
  let fechaNacimiento = new Date(dob)
  let edad = hoy.getFullYear() - fechaNacimiento.getFullYear()
  let diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth()
  if (
    diferenciaMeses < 0 ||
    (diferenciaMeses === 0 && hoy.getDate() < fechaNacimiento.getDate())
  ) {
    edad--
  }
  return edad
}

export const getSalon = (user: User) => {
  const edad: number = getEdad(user.dob);  
  if(edad < 3 || edad > 13) {
    return 'No aplicable'
  }

  // Get salon string from age
  const rooms = getRooms();
  const result = rooms.find(room => edad >= room.min && edad <= room.max);
  return result?.name || 'No aplicable';
}


const getRooms = () => {
  return [
    {
      min: 3,
      max: 4,
      name: 'Salón 3-4'
    },
    {
      min: 5,
      max: 6,
      name: 'Salón 5-6'
    },
    {
      min: 7,
      max: 8,
      name: 'Salón 7-8'
    },
    {
      min: 9,
      max: 10,
      name: 'Salón 9-10'
    },
    {
      min: 11,
      max: 13,
      name: 'Salón 11-13'
    }
  ];
};