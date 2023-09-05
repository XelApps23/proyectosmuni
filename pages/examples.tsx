import MenuIcon from "@/components/icons/MenuIcon";
import Button from "@/components/main/Button";
import CardFolder from "@/components/main/CardFolder";
import Folder from "@/public/Folder.svg"
import Next from "@/public/next.svg"
import Image from "next/image";

export default function Home() {
  

  return (




<div >
<div className="p-5">

<div className="bg-blue-700 m-2">
</div>

<h1 className="text-white	 bg-sky-950	">Ejemplos Buttons y CardFolder</h1>
</div>
<div className="p-4 w-[240px] grid gap-2">
<Button text="Invitar Miembros" icon={<MenuIcon/>} variant="menu"/> 
<Button text="Invitar Miembros" icon={<MenuIcon/>} onlyIcon={true} variant="menu"/> 
<Button text="Invitar Miembros" icon={<MenuIcon/>} onlyText={true} variant="primary"/>    
<Button text="Text" icon={<MenuIcon/>} variant="primary"/>    
<Button text="Iniciar Sesion" onlyText={true}  variant="login"/>    
<CardFolder text='Proyectos Example' />

</div>
</div>
  )
}

