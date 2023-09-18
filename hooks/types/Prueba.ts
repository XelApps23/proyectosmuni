import { Timestamp } from 'firebase/firestore'

type Prueba = {
    id: string,
    name: string,
    age: string | number,
    create_at: Timestamp,
}

interface PruebaList {
    [key: string]: Prueba;
}

type PruebaInput = {
    name: string,
    age: string|number,
    create_at: Timestamp,
  };

type PruebaUpdate =  Partial<{
    name: string,
    age: string|number,
    update_at: Timestamp,
}>;


export type {PruebaList, Prueba, PruebaInput, PruebaUpdate};