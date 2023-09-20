import { Timestamp } from 'firebase/firestore'

type User = {
    id: string,
    idRole: string,
    name: string,
    email: string,
    password: string,
    createAt: Timestamp, 
    updateAt: Timestamp, 
}

interface UserList {
    [key: string]: User;
}

type UserInput = {
    idUser: string,
    idRole: string,
    name: string,
    email: string,
    password: string,
    createAt: Timestamp, 
    updateAt: Timestamp, 
  };

type UserUpdate =  Partial<{
    idUser: string,
    idRole: string,
    name: string,
    email: string,
    password: string,
    createAt: Timestamp, 
    updateAt: Timestamp, 
}>;


export type {UserList, User, UserInput, UserUpdate};