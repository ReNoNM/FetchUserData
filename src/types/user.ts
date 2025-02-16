export type User = {
  id: number;
  name: string;
  email: string;
  address: {city: string};
  phone: string;
  company: {name: string};
};
