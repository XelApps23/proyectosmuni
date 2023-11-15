import { Timestamp } from 'firebase/firestore'

type Document = {
  id: string
  url: string
  name: string
  DocumentType: Object
  createAt: Timestamp
  updateAt: Timestamp
}

interface DocumentList {
  [key: string]: Document
}

interface DocumentInput extends Omit<Document, 'id'> {}
type DocumentUpdate = Partial<DocumentInput>

export type { DocumentList, Document, DocumentInput, DocumentUpdate }
