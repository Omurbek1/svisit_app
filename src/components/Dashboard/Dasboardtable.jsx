import React from 'react'

import styled from 'styled-components'
import { useTable, useSortBy, useRowSelect } from 'react-table'

import { EditableCell } from './editableCell'
import { MultipleStatusEditor } from './multipleStatusEditor'

const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }

      input {
        font-size: 1rem;
        padding: 0;
        margin: 0;
        border: 0;
      }
    }
  }
`

function DataTable({ columns, data, updateMyData, disablePageResetOnDataChange }) {

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: { selectedRowPaths },
  } = useTable(
    {
      columns,
      data,
      updateMyData,
    },
    useSortBy,
    useRowSelect
  )

  const firstPageRows = rows

  return (
    <React.Fragment>
      <div class='class="flex flex-col"'>
        <div>
          {
            (selectedRowPaths.length > 0)
              ?
              <MultipleStatusEditor updateMyData={updateMyData} selectedRowPaths={selectedRowPaths} />
              :
              null
          }

        </div>
        <div class="overflow-x-auto sm:-mx-1 lg:-mx-1">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden">
              <table {...getTableProps()} class="min-w-full">
                <thead class="border-b bg-gray-200 decoration-sky-500/30">
                  {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()} scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                      {headerGroup.headers.map(column => (
                        <th {...column.getHeaderProps(column.getSortByToggleProps())} scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          {column.render('Header')}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? ' 🔽'
                                : ' 🔼'
                              : ''}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {firstPageRows.map(
                    (row, i) => {
                      prepareRow(row);
                      return (
                        <tr {...row.getRowProps()} class="border-b">
                          {row.cells.map(cell => {
                            return (
                              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            )
                          })}
                        </tr>
                      )
                    }
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export function Table({ items, onUpdateData }) {
  const columns = React.useMemo(
    () => [
      {
        id: 'selection',
        Header: ({ getToggleAllRowsSelectedProps }) => (
          <div>
            <input type="checkbox" {...getToggleAllRowsSelectedProps()} />
          </div>
        ),
        Cell: ({ row }) => (
          <div>
            <input type="checkbox" {...row.getToggleRowSelectedProps()} />
          </div>
        ),
      },
      {
        Header: 'Номер',
        accessor: 'id'
      },
      {
        Header: 'Имя',
        accessor: 'name',
        Cell: EditableCell
      },
      {
        Header: 'Дата',
        accessor: 'date',
      },
      {
        Header: 'Статус',
        accessor: 'status',
      },
    ],
    []
  )

  const data = items

  // const [originalData] = React.useState(data)
  const [skipPageReset, setSkipPageReset] = React.useState(false)

  const updateMyData = (rowIndexes, columnID, value) => {

    setSkipPageReset(true)

    const newData = data.map((row, index) => {
      if (rowIndexes.includes(index)) {
        return {
          ...data[index],
          [columnID]: value,
        }
      }
      return row
    })

    onUpdateData(newData)

  }

  // const resetData = () => onUpdateData(originalData)

  return (
    <Styles>
      {/* <button onClick={resetData}>Reset Data</button> */}
      <DataTable
        columns={columns}
        data={data}
        updateMyData={updateMyData}
        disablePageResetOnDataChange={skipPageReset}
      />
    </Styles>
  )
}

