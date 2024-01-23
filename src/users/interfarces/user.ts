export interface User {
  name: string;
  password: string;
  email: string;
  details: {
    apellidos: string;
    rol: string;
  };
}
