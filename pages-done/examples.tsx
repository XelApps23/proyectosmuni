import { useState } from 'react'
import MenuIcon from '@/components/icons/MenuIcon'
import Button from '@/components/main/Button'
import CardFolder from '@/components/main/CardFolder'
import MiniButton from '@/components/main/MiniButton'
import Input from '@/components/main/Input'
import VisibilityIcon from '@/components/icons/VisibilityIcon'
import InvisibilityIcon from '@/components/icons/InvisibilityIcon'
import SearchFocusIcon from '@/components/icons/SearchFocusIcon'
import SearchIcon from '@/components/icons/SearchIcon'
import CancelIcon from '@/components/icons/CancelIcon'
import ArrowRightIcon from '@/components/icons/ArrowRightIcon'
import ArrowLeftIcon from '@/components/icons/ArrowLeftIcon'
import RadioButtonDefaultIcon from '@/components/icons/RadioButtonDefaultIcon'
import RadioButtonHoveringIcon from '@/components/icons/RadioButtonHoveringIcon'
import RadioButtonSelectIcon from '@/components/icons/RadioButtonSelectIcon'

export default function Home () {
  const [inputValue, setInputValue] = useState('')
  const handleInputChange = (event: any) => {
    setInputValue(event.target.value)
  }
  return (
    <div>
      <div className="p-5">
        <h1 className="text-black">Colores</h1>
        <div className="flex flex-wrap gap-2">
          <div className="bg-fondo w-40 h-10 p-2">fondo</div>
          <div className="bg-skyBlue p-2 w-40 h-10">skyBlue</div>
          <div className="bg-black1 p-2 w-40 h-10 text-white1">black1</div>
          <div className="bg-black2 p-2 w-40 h-10 text-white1">black2</div>
          <div className="bg-white1 p-2 w-40 h-10 border-2 border-black1 ">
            white1
          </div>
          <div className="bg-white2 p-2 w-40 h-10 border-2 border-black1">
            white2
          </div>
          <div className="bg-aprobadoHoverig p-2 w-40 h-10">
            aprobadoHoverig
          </div>
          <div className="bg-aprobadoDefault p-2 w-40 h-10">
            Aprobado-Default
          </div>
          <div className="bg-blue1 p-2 w-40 h-10">Blue-1</div>
          <div className="bg-blue2 p-2 w-40 h-10">Blue-2</div>
          <div className="bg-errorHoverig p-2 w-40 h-10">errorHoverig</div>
          <div className="bg-errorDefault p-2 w-40 h-10">errorDefault</div>
          <div className="bg-gray1 p-2 w-40 h-10">gray1</div>
          <div className="bg-gray2 p-2 w-40 h-10">gray2</div>
          <div className="bg-gray3 p-2 w-40 h-10">gray3</div>
          <div className="bg-prioridadAlta p-2 w-40 h-10 text-white1">
            prioridadAlta
          </div>
          <div className="bg-prioridadMedia p-2 w-40 h-10">prioridadMedia</div>
          <div className="bg-prioridadBaja p-2 w-40 h-10">prioridadBaja</div>
          <div className="bg-prioridadCritica p-2 w-40 h-10 text-white1">
            prioridadCritica
          </div>
          <div className="bg-estadoListo p-2 w-40 h-10">estadoListo</div>
          <div className="bg-estadoEnCurso p-2 w-40 h-10">estadoEnCurso</div>
          <div className="bg-estadoNoIniciado p-2 w-40 h-10">
            estadoNoIniciado
          </div>
          <div className="bg-estadoDetenido p-2 w-40 h-10">estadoDetenido</div>
        </div>

        <div className="bg-blue-700 m-2"></div>

        <h1 className="text-white bg-sky-950">Ejemplos Buttons y CardFolder</h1>
      </div>
      <div className="p-4 w-[240px] grid gap-2">
        <Button text="Invitar Miembros" icon={<MenuIcon />} variant="menu" />
        <Button
          text="Invitar Miembros"
          icon={<MenuIcon />}
          onlyIcon={true}
          variant="menu"
        />
        <Button
          text="Invitar Miembros"
          icon={<MenuIcon />}
          variant="primary"
        />
        <Button text="Text" icon={<MenuIcon />} variant="primary" />
        <Button text="Iniciar Sesion" variant="login" />
        <Button text="Cancelar" variant="cancelar" />
        <CardFolder text="Proyectos Example" />
      </div>
      <div className="pl-6">
        <p>Email</p>
        <Input
          variant="normal"
          typeInput="email"
          text="empresa@correo.com"
          whitIcon={false}
          value={inputValue}
          onChange={handleInputChange}
        />
        <p>Text</p>
        <Input
          variant="normal"
          typeInput="text"
          whitIcon={false}
          value={inputValue}
          onChange={handleInputChange}
      />
        <p>Password</p>
        <Input
          variant="normal"
          typeInput="password"
          whitIcon={true}
          icon={<VisibilityIcon />}
          secondaryIcon={<InvisibilityIcon />}
          value={inputValue}
          onChange={handleInputChange}
        />
        <p>Search</p>
        <Input
          variant="search"
          typeInput="text"
          text="Buscar notificaciones"
          whitIcon={true}
          icon={<SearchFocusIcon />}
          secondaryIcon={<SearchIcon />}
          value={inputValue}
          onChange={handleInputChange}
        />
        <br />
        <p>Cancel</p>
        <MiniButton icon={<CancelIcon />} variant="cancel" />
        <br />
        <p>Expand</p>
        <MiniButton
          icon={<ArrowLeftIcon />}
          variant="expand"
          secondaryIcon={<ArrowRightIcon />}
          tertiaryIcon={<ArrowRightIcon />}
        />
        <br />
        <p>Radio Button</p>
        <MiniButton
          icon={<RadioButtonSelectIcon />}
          secondaryIcon={<RadioButtonHoveringIcon />}
          tertiaryIcon={<RadioButtonDefaultIcon />}
          variant="radio"
        />
      </div>
    </div>
  )
}
