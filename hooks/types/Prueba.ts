type Prueba = {
    id: string,
    name: string,
    age: string | number,
    create_at: Date,
}

interface PruebaList {
    [key: string]: Prueba;
}

type PruebaInput = {
    name: string,
    age: string|number,
    date: Date,
  };

type PruebaUpdate =  Partial<{
    name: string,
    age: string|number,
    date: Date,
}>;


export type {PruebaList, Prueba, PruebaInput, PruebaUpdate};