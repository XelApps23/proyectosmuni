import { Timestamp } from 'firebase/firestore'

type Document = {
    id: string,
    url: string,
    name: string,
    DocumentType: Object,
    createAt: Timestamp, 
    updateAt: Timestamp,  
}

interface DocumentList {
    [key: string]: Document;
}

type DocumentInput = {
    name: string,
    url: string,
    DocumentType: Object,
    createAt: Timestamp, 
    updateAt: Timestamp, 
  };

type DocumentUpdate =  Partial<{
    name: string,
    url: string,
    DocumentType: Object,
    createAt: Timestamp, 
    updateAt: Timestamp, 
}>;


export type {DocumentList, Document, DocumentInput, DocumentUpdate};