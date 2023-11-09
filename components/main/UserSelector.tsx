import React, { useEffect, useRef, useState } from 'react'
import SearchIcon from '../icons/SearchIcon'
import useUsers from '@/hooks/useUsers'
import CancelIcon from '../icons/CancelIcon'
import { useSelector } from 'react-redux'
import ProfilePicture from './ProfilePicture'
import { Project } from '@/hooks/types/Project'

const variantsInput = {
  normal: {
    input: `bg-white2 w-full border-2 border-[#C3C6D4] focus:outline-none focus:border-[#1F76C2] focus:ring-1 focus:ring-[#1F76C2] 
    invalid:border-[#E2445C] invalid:text-black focus:invalid:border-[#E2445C] focus:invalid:ring-1 
    focus:invalid:ring-[#E2445C]`,
    icon: 'absolute inset-y-0 right-0.5 -translate-x-2 translate-y-1 h-5 w-5 p-0 place-items-center'
  },
  search: {
    input:
      'bg-white2 border-2 border-[#C3C6D4] focus:outline-none focus:border-[#1F76C2] focus:ring-1 focus:ring-[#1F76C2]',
    icon: 'absolute inset-y-0 right-0.5 -translate-x-2 translate-y-1 h-5 w-5 p-0 place-items-center'
  }
}

const sizeInput = {
  sm: {
    input: ''
  },
  md: {
    input: ''
  },
  lg: {
    input: ''
  },
  xl: {
    input: 'p-2'
  }
}

type Props = {
  variant?: 'normal' | 'search'
  placeholder?: boolean
  label: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  setIds: any
  project: Project
}

const UserSelector = ({
  variant = 'normal',
  placeholder = true,
  label,
  size = 'xl',
  setIds,
  project
}: Props) => {
  const [text, setText] = useState('')
  const [localIds, setLocalIds] = useState<any[]>([])
  const [openDialog, setOpenDialog] = useState(false)
  const [firstFetch, setFirstFetch] = useState(false)
  const wrapperRef = useRef(null)

  useOutsideAlerter(wrapperRef)
  const { getUsers, users, searchUser } = useUsers()
  const { id } = useSelector((state: any) => state.login)

  useEffect(() => {
    if (
      localIds.length ===
      Object.keys(users).filter((key) => !localIds.includes(key)).length
    ) {
      setOpenDialog(false)
    }
  }, [localIds])

  function useOutsideAlerter (ref: any) {
    useEffect(() => {
      function handleClickOutside (event: any) {
        if (ref.current && !ref.current.contains(event.target)) {
          setOpenDialog(false)
        }
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [ref])
  }

  const [search, setSearch] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(text)
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [text])

  useEffect(() => {
    if (search) {
      searchUser(search)
    }
  }, [search])

  const handleChange = (value: string) => {
    setText(value)
  }

  const triggerDialog = () => {
    setOpenDialog(!openDialog)
    if (!firstFetch) {
      getUsers({ perPage: 1 })
      setFirstFetch(true)
    }
  }

  const handleAddUser = (id: string) => {
    setIds((prev: any) => [...prev, id])
    setLocalIds((prev: any) => [...prev, id])
  }

  const handleRemoveId = (removeId: string) => {
    setIds((prev: any) => prev.filter((id: string) => id !== removeId))
    setLocalIds((prev: any) => prev.filter((id: string) => id !== removeId))
  }

  return (
    <>
      <div ref={wrapperRef}>
        <div className="p-1 flex flex-wrap">
          {localIds.map((id) => (
            <div
              key={id}
              className="flex mb-1 items-center p-1 bg-skyBlue w-min whitespace-nowrap rounded-full"
            >
              <div className="min-h-[20px] min-w-[20px] rounded-full">
                <ProfilePicture user={users[id]} />
              </div>
              <span className="ml-2 text-sm text-gray1">
                {users[id].firstname} {users[id].lastname}
              </span>
              <button
                onClick={() => handleRemoveId(id)}
                className="ml-2 h-5 w-5 hover:bg-fondo rounded-full transition-colors"
              >
                <CancelIcon />
              </button>
            </div>
          ))}
        </div>
        <label htmlFor="users" className="relative block">
          <input
            type="text"
            id="users"
            value={text}
            onChange={(e) => handleChange(e.target.value)}
            name="users"
            className={`rounded-lg ${variantsInput[variant].input} ${sizeInput[size].input}`}
            placeholder="Buscar usuario"
            onClick={() => triggerDialog()}
          />
          <div className="pointer-events-none gray3 w-6 h-6 absolute top-1/2 transform -translate-y-1/2 right-2">
            <SearchIcon color="#9d938f" />
          </div>
          {openDialog && (
            <>
              <div className="absolute bg-white1 top-12 max-h-52 overflow-y-auto w-full rounded-lg drop-shadow-xl p-4">
                <span className="text-base text-gray1">Personas sugeridas</span>
                <div className="mt-2">
                  {Object.keys(users)
                    .filter((key) => key !== id)
                    .filter((key) => !localIds.includes(key))
                    .filter((key) => !project.assignedUsers.includes(key))
                    .filter((key) =>
                      text.length > 0
                        ? users[key].firstname
                          .toLowerCase()
                          .includes(text.toLowerCase()) ||
                          users[key].lastname
                            .toLowerCase()
                            .includes(text.toLowerCase()) ||
                          users[key].email
                            .toLowerCase()
                            .includes(text.toLowerCase())
                        : true
                    )
                    .filter((key, index) => index < 10)
                    .map((key) => (
                      <button
                        onClick={() => handleAddUser(key)}
                        key={key}
                        className="flex items-center px-2 py-1 rounded-lg hover:bg-fondo focus:bg-skyBlue"
                      >
                        <div className="w-8 h-8">
                          <ProfilePicture user={users[id]} />
                        </div>
                        <span className="ml-2">
                          {users[key].firstname} {users[key].lastname} (
                          {users[key].email})
                        </span>
                      </button>
                    ))}
                </div>
              </div>
            </>
          )}
        </label>
      </div>
    </>
  )
}

export default UserSelector
