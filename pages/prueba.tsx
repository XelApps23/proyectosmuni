import usePrueba from "@/hooks/usePrueba";
import { useEffect } from "react";

const Prueba = () => {
  const { getPrueba, getPruebas, deletePrueba, documentos, loading } =
    usePrueba();
  useEffect(() => {
    //deletePrueba("gyIiB96UcLnSjFyA6z1U");
    //getPruebas();
    //getPrueba("gyIiB96UcLnSjFyA6z1U");
  }, []);

  useEffect(() => {
    console.log(documentos);
  }, [documentos]);

  useEffect(() => {
    if (loading) {
      console.log("cargando...");
    }
  }, [loading]);

  return (
    <div>
      <h1>Página</h1>
    </div>
  );
};

export default Prueba;
