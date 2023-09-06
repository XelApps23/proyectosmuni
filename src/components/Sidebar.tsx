import { useState } from "react";
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai"
import { BiUser } from "react-icons/bi";
import { BsArchive } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { GrGroup } from "react-icons/gr";
import { GrAdd } from "react-icons/gr";
import { FiSun } from "react-icons/fi";
import { RiSearch2Line } from "react-icons/ri";
import { BsBoxArrowRight} from "react-icons/bs";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
//import { useContext, useState } from "react";
import { SidebarContext } from "@/src/context/SidebarContext";
import { useRouter } from "next/router";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";

const sidebarItems = [
  {
    name: "Inicio",
    href: "/",
    icon: AiOutlineHome,
  },
  {
    name: "Perfil",
    href: "/profile",
    icon: BiUser,
  },
  {
    name: "Papelera",
    href: "/paperbin",
    icon: BsTrash,
  },
  {
    name: "Archivo",
    href: "/archive",
    icon: BsArchive,
  },
  {
    name: "Administracion",
    href: "/administration",
    icon: FiSettings,
  },
  {
    name: "Equipos",
    href: "/workTeams",
    icon: GrGroup,
  },
  {
    name: "Invitar Miembros",
    href: "/inviteMembers",
    icon: GrAdd,
  },
  {
    name: "Cambiar Tema",
    href: "/changeTheme",
    icon: FiSun,
  },
  {
    name: "Cerrar Sesión",
    href: "/signOff",
    icon:  BsBoxArrowRight,
  },
];

export default function Sidebar(){
  const router = useRouter();
  //const { isCollapsed } = useContext(SidebarContext);
  const [isCollapsedSidebar,setIsCollapsedSidebar] = useState <boolean>(false);
  const toogleSidebarCollapseHandler = () =>{
    setIsCollapsedSidebar((prev) => !prev);
  }; 

  return (

    <div className="sidebar__wrapper">
      <div className={`bg-blue-600 h-24 flex justify-center items-center ${isCollapsedSidebar ? 'hidden' : 'block'}`}>
        <img className="rounded-full  w-32 h-32 mt-20" src="https://htmlstream.com/preview/unify-v2.6/assets/img-temp/400x450/img5.jpg" />
      </div>
      <button className="btn" onClick={toogleSidebarCollapseHandler} >
       <MdKeyboardArrowLeft />
      </button>
      <aside className="sidebar" data-collapse={isCollapsedSidebar}>
        <div className="sidebar__top mt-6" >
        <div className="w-80 h-88 bg-sky-600" />
          <p className="sidebar__Profil_name"></p>
        </div>
        <ul className="sidebar__list">
          {sidebarItems.map(({ name, href, icon: Icon }) => {
            return (
              <li className="sidebar__item" key={name}>
                <Link
                  className={`sidebar__link ${router.pathname === href ? "sidebar__link--active" : ""
                    }`}
                  href={href}
                >
                  <span className="sidebar__icon">
                    <Icon />
                  </span>
                  <span className="sidebar__name">{name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>

    
  );
};
