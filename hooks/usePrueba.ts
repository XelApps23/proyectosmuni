import { useState } from "react";
import { collection, deleteDoc, doc, getDoc, getDocs, addDoc, updateDoc } from "firebase/firestore";
import { db } from "@/services/Firebase";
import { PruebaInput, PruebaList, PruebaUpdate } from "./types/Prueba";


const usePrueba = () => {
  const [pruebas, setPruebas] = useState<PruebaList>({});
  const [loading, setLoading] = useState(false);

  // Obtiene todos los documentos
  const getPruebas = async () => {
    setLoading(true);
    var datos = {};
    const querySnapshot = await getDocs(collection(db, "prueba"));
    querySnapshot.forEach((doc) => {
      datos = { ...datos, [doc.id]: { ...doc.data(), id: doc.id } };
    });
    setPruebas(datos);
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
    setPruebas(dato);
    setLoading(false);
  };

  // Elimina un documento
  const deletePrueba = async (id: string) => {
    setLoading(true);
    await getPrueba(id);
    await deleteDoc(doc(db, "prueba", id));
    setLoading(false);
  };


  // Crear un documento
  const createPrueba = async ({name, age, create_at}: PruebaInput) =>{
    setLoading(true);
    const docRef = await addDoc(collection(db, "pruebas"), {
      name: name,
      age: Number(age),
      crated_at: create_at
    });
    setLoading(false);
  };

  // Actualizar un documento
  const updatePrueba = async(docId: string, { name, age, update_at }: PruebaUpdate) =>{
    setLoading(true);
    const pruebaDocRef = doc(db, 'pruebas', docId);
    await updateDoc(pruebaDocRef, {
      name: name,
      age: Number(age),
    });
    setLoading(false);
  };

  return { getPruebas, getPrueba, deletePrueba, createPrueba, updatePrueba, pruebas, loading };
};

export default usePrueba;
