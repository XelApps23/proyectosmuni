import { useState } from "react";
import { collection, deleteDoc, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "@/services/Firebase";

const usePrueba = () => {
  const [documentos, setDocumentos] = useState([]);
  const [loading, setLoading] = useState(false);

  // Obtiene todos los documentos
  const getPruebas = async () => {
    setLoading(true);
    var datos = {};
    const querySnapshot = await getDocs(collection(db, "prueba"));
    querySnapshot.forEach((doc) => {
      datos = { ...datos, [doc.id]: { ...doc.data(), id: doc.id } };
    });
    setDocumentos(datos);
    setLoading(false);
  };

  // Obtiene un documento por id
  const getPrueba = async (idRef: string) => {
    setLoading(true);
    var dato = {};
    const docRef = doc(db, "prueba", idRef);
    const querySnapshot = await getDoc(docRef);
    dato = {
      [querySnapshot.id]: { ...querySnapshot.data(), id: querySnapshot.id },
    };
    setDocumentos(dato);
    setLoading(false);
  };

  // Elimina un documento
  const deletePrueba = async (id: string) => {
    setLoading(true);
    await getPrueba(id);
    await deleteDoc(doc(db, "prueba", id));
    setLoading(false);
  };

  return { getPruebas, getPrueba, deletePrueba, documentos, loading };
};

export default usePrueba;
