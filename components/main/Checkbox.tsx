import React from 'react'

type Props = {
  value: string
  controller: (value: string, checked: boolean) => void
  label: string
}

const Checkbox = ({ label, value, controller }: Props) => {
  const handleOnChange = (checked: boolean) => {
    controller(value, checked)
  }

  return (
    <div className="flex items-center mb-2">
      <input
        id={value}
        type="checkbox"
        onChange={(e) => handleOnChange(e.target.checked)}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <label
        htmlFor={value}
        className="ml-2 text-base text-black2 dark:text-gray-300"
      >
        {label}
      </label>
    </div>
  )
}

export default Checkbox
