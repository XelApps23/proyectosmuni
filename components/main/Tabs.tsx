import { type } from 'os'
import { ReactNode, useState } from 'react'

type Tab = {
  component: ReactNode
  name: string
  icon: ReactNode
}

type Props = {
  tabs: Tab[]
}

const Tabs = ({ tabs }: Props) => {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <>
      <div className="border-b border-fondo mt-4">
        <ul className="flex flex-wrap text-sm text-center text-gray1">
          {tabs.map((tab, index) => (
            <>
              <li className="mr-2" key={tab.name}>
                <a
                  onClick={() => setActiveTab(index)}
                  href="#"
                  className={
                    (activeTab === index
                      ? 'border-blue2 border-b-2'
                      : ' border-fondo border-b') +
                    ' flex items-center justify-center p-2   rounded-t-lg group'
                  }
                >
                  <div className="w-4 h-4 mr-4">{tab.icon}</div>
                  <span>{tab.name}.</span>
                </a>
              </li>
            </>
          ))}
        </ul>
      </div>
      <div>{tabs[activeTab]?.component}</div>
    </>
  )
}

export default Tabs
