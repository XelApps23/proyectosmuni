import usePrueba from "@/hooks/usePrueba";
import { useEffect } from "react";

const Prueba = () => {
  const { getPrueba, getPruebas, deletePrueba, createPrueba, updatePrueba, pruebas, loading } =
    usePrueba();
  useEffect(() => {
    //deletePrueba("gyIiB96UcLnSjFyA6z1U");
    //getPruebas();
    //getPrueba("gyIiB96UcLnSjFyA6z1U");
  }, []);

  useEffect(() => {
    console.log(pruebas['id']);
  }, [pruebas]);

  useEffect(() => {
    if (loading) {
      console.log("cargando...");
    }
  }, [loading]);

  return (
    <div>
      <h1>Página</h1>
      <button onClick={()=>createPrueba({ age: 12, name: "rene",date: new Date(2023, 0, 25, 8, 15, 30)} )}>crear</button>
      <button onClick={()=>updatePrueba("CdqEfAMOWhVhrOzVDsux", { age: 23, name: "rene"})}>update</button>
    </div>
  );
};

export default Prueba;
