import { Timestamp } from 'firebase/firestore'

type Project = {
    id: string,
    idState: string,
    idTask: string,
    idDocument: string,
    name: string,
    description: string,
    initialDate: Timestamp,
    done: boolean,
    endDate: Timestamp,
    createAt: Timestamp,
    createUp: Timestamp,
}

interface ProjectList {
    [key: string]: Project;
}

type ProjectInput = {
    idState: string,
    idTask: string,
    idDocument: string,
    name: string,
    description: string,
    initialDate: Timestamp,
    done: boolean,
    endDate: Timestamp,
    createAt: Timestamp,
    createUp: Timestamp,
};

type ProjectUpdate = Partial<{
    idState: string,
    idTask: string,
    idDocument: string,
    name: string,
    description: string,
    initialDate: Timestamp,
    done: boolean,
    endDate: Timestamp,
    createAt: Timestamp,
    createUp: Timestamp,
}>;


export type { ProjectList, Project, ProjectInput, ProjectUpdate };