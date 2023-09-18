import { Timestamp } from 'firebase/firestore'

type Task = {
    id: string,
    idUser: string,
    name: string,
    description: string,
    initialDate: Timestamp,
    endDate: Timestamp,
    done: boolean,
    createAt: Timestamp, 
    updateAt: Timestamp, 
}

interface TaskList {
    [key: string]: Task;
}

type TaskInput = {
    idUser: string,
    name: string,
    description: string,
    initialDate: Timestamp,
    endDate: Timestamp,
    done: boolean,
    createAt: Timestamp, 
    updateAt: Timestamp,
  };

type TaskUpdate =  Partial<{
    idUser: string,
    name: string,
    description: string,
    initialDate: Timestamp,
    endDate: Timestamp,
    done: boolean,
    createAt: Timestamp, 
    updateAt: Timestamp,
}>;


export type {TaskList, Task, TaskInput, TaskUpdate};