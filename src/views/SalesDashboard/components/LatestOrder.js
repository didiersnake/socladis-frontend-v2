import React, { useMemo } from 'react'
import { Card, Table } from 'components/ui'
import useThemeClass from 'utils/hooks/useThemeClass'
import { useTable } from 'react-table'
import NumberFormat from 'react-number-format'

const { Tr, Td, TBody, THead, Th } = Table
const OrderColumn = ({ row }) => {
    const { textTheme } = useThemeClass()
    // const navigate = useNavigate()

    // const onView = useCallback(() => {
    //     navigate(`/app/sales/order-details/${row.id}`)
    // }, [navigate, row])

    return (
        <span
            className={`cursor-pointer select-none font-semibold hover:${textTheme}`}
            // onClick={onView}
        >
            {row.name}
        </span>
    )
}

const LatestOrder = ({ data = [], className }) => {
    const columns = useMemo(
        () => [
            {
                Header: 'Produit',
                accessor: 'name',
                sortable: true,
                Cell: (props) => <OrderColumn row={props.row.original} />,
            },
            {
                Header: 'Format',
                accessor: 'format',
                sortable: true,
                Cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row.format}</span>
                },
            },
            {
                Header: 'Quantité',
                accessor: 'quantity',
                sortable: true,
                Cell: (props) => {
                    const { quantity } = props.row.original
                    return (
                        <NumberFormat
                            displayType="text"
                            value={quantity}
                            thousandSeparator={true}
                        />
                    )
                },
            },
            {
                Header: 'Seuil',
                accessor: 'unitPrice',
                sortable: true,
                Cell: (props) => {
                    const { unitPrice } = props.row.original
                    return (
                        <NumberFormat
                            displayType="text"
                            value={unitPrice}
                            thousandSeparator={true}
                        />
                    )
                },
            },
        ],
        []
    )

    const { getTableProps, getTableBodyProps, prepareRow, headerGroups, rows } =
        useTable({ columns, data, initialState: { pageIndex: 0 } })

    return (
        <Card className={className}>
            <div className="flex items-center justify-between mb-6">
                <h4>Stock Faible</h4>
                {/* <Button size="sm">View Orders</Button> */}
            </div>
            <Table {...getTableProps()}>
                <THead>
                    {headerGroups.map((headerGroup) => (
                        <Tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <Th {...column.getHeaderProps()}>
                                    {column.render('Header')}
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </THead>
                <TBody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <Tr {...row.getRowProps()}>
                                {row.cells.map((cell) => {
                                    return (
                                        <Td {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </Td>
                                    )
                                })}
                            </Tr>
                        )
                    })}
                </TBody>
            </Table>
        </Card>
    )
}

export default LatestOrder
