type Props = {
  headers: string[]
  cells: {
    [key: string]: string
  }[]
}

const Table = ({ headers, cells }: Props) => {
  return (
    <div className="flex flex-col">
      <div className="-m-1.5 overflow-x-auto">
        <div className="p-1.5 min-w-full inline-block align-middle">
          <div className="border border-gray2 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray2">
              <thead>
                <tr>
                  {headers.map((header, index) => (
                    <th
                      key={index}
                      className="py-2 font-normal text-black2 bg-fondo"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray2">
                {cells.map((row, index) => (
                  <tr key={index}>
                    {Object.keys(row).map((key, index) => (
                      <td
                        key={index}
                        className="px-6 py-4 whitespace-nowrap"
                      >
                        {row[key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Table
