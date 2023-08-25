import { app } from "@/services/Firebase";
import { getAuth } from "firebase/auth";

export default function Home() {
  

  return (
    <button onClick={() => console.log(getAuth(app))} className="bg-gray-200 p-4 m-40 hover:bg-gray-300">
      En la consola se muestra que esta firebase configurado
    </button>
  )
}

