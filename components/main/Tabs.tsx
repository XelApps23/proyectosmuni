import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode, useState } from 'react'

type Tab = {
  component: ReactNode
  name: string
  icon: ReactNode
}

type Props = {
  tabs: Tab[]
  changedTab?: (tab: number) => void
}

const Tabs = ({ tabs, changedTab }: Props) => {
  const [activeTab, setActiveTab] = useState(0)

  const handleTab = (index: number) => {
    setActiveTab(index)
    changedTab && changedTab(index)
  }

  return (
    <>
      <div className="border-b border-fondo mt-2 mb-4">
        <ul className="sm:flex sm:flex-wrap text-sm text-center text-gray1">
          {tabs.map((tab, index) => (
            <>
              <li className="mr-2" key={tab.name}>
                <button
                  onClick={() => handleTab(index)}
                  className={
                    (activeTab === index
                      ? 'border-blue2 border-b-2'
                      : ' border-fondo border-b') +
                    ' flex items-center justify-center p-2   rounded-t-lg group'
                  }
                >
                  <div className="w-4 h-4 mr-4">{tab.icon}</div>
                  <span>{tab.name}.</span>
                </button>
              </li>
            </>
          ))}
        </ul>
      </div>
      <AnimatePresence mode="wait">
        {(
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {tabs[activeTab]?.component}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Tabs
