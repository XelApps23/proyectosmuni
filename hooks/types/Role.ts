import { Timestamp } from 'firebase/firestore'

type Role = {
    id: string,
    name: string,
    description: string,
    permissions: Object,
    createAt: Timestamp, 
    updateAt: Timestamp, 
}

interface RoleList {
    [key: string]: Role;
}

type RoleInput = {
    name: string,
    description: string,
    permissions: Object,
    createAt: Timestamp, 
    updateAt: Timestamp,
  };

type RoleUpdate =  Partial<{
    name: string,
    description: string,
    permissions: Object,
    createAt: Timestamp, 
    updateAt: Timestamp,
}>;


export type {RoleList, Role, RoleInput, RoleUpdate};