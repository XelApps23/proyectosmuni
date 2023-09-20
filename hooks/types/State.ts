import { Timestamp } from 'firebase/firestore'

type State = {
    id: string,
    name: string,
    description: string,
    createAt: Timestamp,
    createUp: Timestamp,
}

interface StateList {
    [key: string]: State;
}

type StateInput = {
    name: string,
    description: string,
    createAt: Timestamp,
    createUp: Timestamp,
};

type StateUpdate = Partial<{
    name: string,
    description: string,
    createAt: Timestamp,
    createUp: Timestamp,
}>;


export type { StateList, State, StateInput, StateUpdate };