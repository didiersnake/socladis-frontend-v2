import React, { useEffect, useCallback, useMemo } from 'react'
import { Tooltip } from 'components/ui'
import { DataTable } from 'components/shared'
import { HiOutlineEye, HiOutlineTrash } from 'react-icons/hi'
import NumberFormat from 'react-number-format'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders, getOrdersByDateRange, setTableData } from '../store/dataSlice'
import {
    setSelectedRows,
    addRowItem,
    removeRowItem,
    setDeleteMode,
    setSelectedRow,
} from '../store/stateSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'

// const orderStatusColor = {
//     0: {
//         label: 'Paid',
//         dotClass: 'bg-emerald-500',
//         textClass: 'text-emerald-500',
//     },
//     1: {
//         label: 'Pending',
//         dotClass: 'bg-amber-500',
//         textClass: 'text-amber-500',
//     },
//     2: { label: 'Failed', dotClass: 'bg-red-500', textClass: 'text-red-500' },
// }

// const PaymentMethodImage = ({ paymentMehod, className }) => {
//     switch (paymentMehod) {
//         case 'visa':
//             return (
//                 <img
//                     className={className}
//                     src="/img/others/img-8.png"
//                     alt={paymentMehod}
//                 />
//             )
//         case 'master':
//             return (
//                 <img
//                     className={className}
//                     src="/img/others/img-9.png"
//                     alt={paymentMehod}
//                 />
//             )
//         case 'paypal':
//             return (
//                 <img
//                     className={className}
//                     src="/img/others/img-10.png"
//                     alt={paymentMehod}
//                 />
//             )
//         default:
//             return <></>
//     }
// }

const OrderColumn = ({ row }) => {
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onView = useCallback(() => {
        navigate(`/app/sales/order-details/${row._id}`)
    }, [navigate, row])

    return (
        <span
            className={`cursor-pointer select-none font-semibold hover:${textTheme}`}
            onClick={onView}
        >
            {row.invoice_number}
        </span>
    )
}

const ActionColumn = ({ row }) => {
    const dispatch = useDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onDelete = () => {
        dispatch(setDeleteMode('single'))
        dispatch(setSelectedRow([row._id]))
    }

    const onView = useCallback(() => {
        navigate(`/app/sales/order-details/${row._id}`)
    }, [navigate, row])

    return (
        <div className="flex justify-end text-lg">
            <Tooltip title="View">
                <span
                    className={`cursor-pointer p-2 hover:${textTheme}`}
                    onClick={onView}
                >
                    <HiOutlineEye />
                </span>
            </Tooltip>
            <Tooltip title="Delete">
                <span
                    className="cursor-pointer p-2 hover:text-red-500"
                    onClick={onDelete}
                >
                    <HiOutlineTrash />
                </span>
            </Tooltip>
        </div>
    )
}

const OrdersTable = () => {
    const dispatch = useDispatch()
    const { pageIndex, pageSize, sort, query, total, startDate, endDate } = useSelector(
        (state) => state.salesOrderList.data.tableData
    )
    const loading = useSelector((state) => state.salesOrderList.data.loading)
    const data = useSelector((state) => state.salesOrderList.data.orderList)

    const s_date = startDate?.toISOString()
    const e_date = endDate?.toISOString()
    // console.log(s_date)
    const fetchData = useCallback(() => {
        let startDate = s_date
        let endDate = e_date
        dispatch(
            getOrders({ pageIndex, pageSize, sort, query, startDate, endDate })
        )
        dispatch(getOrdersByDateRange({ startDate, endDate }))
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, pageIndex, pageSize, sort, query, startDate, endDate])

    useEffect(() => {
        dispatch(setSelectedRows([]))
        fetchData()
    }, [dispatch, fetchData, pageIndex, pageSize, sort])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total, startDate, endDate }),
        [pageIndex, pageSize, sort, query, total, startDate, endDate]
    )

    const columns = React.useMemo(
        () => [
            {
                Header: 'Facture',
                accessor: 'invoice_number',
                sortable: true,
                Cell: (props) => <OrderColumn row={props.row.original} />,
            },
            {
                Header: 'Date',
                accessor: 'date',
                sortable: true,
                Cell: (props) => {
                    const row = props.row.original
                    return (
                        <span>
                            {new Date(row.date).toLocaleDateString('en-GB')}
                        </span>
                    )
                },
            },
            {
                Header: 'Nom du Client',
                accessor: 'clientName',
                sortable: true,
            },
            {
                Header: 'Ristourne',
                accessor: 'ristourne',
                sortable: true,
            },
            {
                Header: 'TVA',
                accessor: 'VAT_amount',
                sortable: true,
                Cell: (props) => {
                    const row = props.row.original
                    return (
                        <span>
                            {Number(row.VAT_amount).toFixed(2).toString()}
                        </span>
                    )
                },
            },
            {
                Header: 'Precompte',
                accessor: 'withdrawal_amount',
                sortable: true,
                Cell: (props) => {
                    const row = props.row.original
                    return (
                        <span>
                            {Number(row.VAT_amount).toFixed(2).toString()}
                        </span>
                    )
                },
            },
            {
                Header: 'Total HT',
                accessor: 'total_without_tax',
                sortable: true,
                Cell: (props) => {
                    const row = props.row.original
                    return (
                        <span>
                            {Number(row.total_without_tax)
                                .toFixed(2)
                                .toString()}
                        </span>
                    )
                },
            },
            // {
            //     Header: 'Status',
            //     accessor: 'status',
            //     sortable: true,
            //     Cell: (props) => {
            //         const { status } = props.row.original
            //         return (
            //             <div className="flex items-center">
            //                 <Badge
            //                     className={orderStatusColor[status].dotClass}
            //                 />
            //                 <span
            //                     className={`ml-2 rtl:mr-2 capitalize font-semibold ${orderStatusColor[status].textClass}`}
            //                 >
            //                     {orderStatusColor[status].label}
            //                 </span>
            //             </div>
            //         )
            //     },
            // },
            // {
            //     Header: 'Payment Method',
            //     accessor: 'paymentMehod',
            //     sortable: true,
            //     Cell: (props) => {
            //         const { paymentMehod, paymentIdendifier } =
            //             props.row.original
            //         return (
            //             <span className="flex items-center">
            //                 <PaymentMethodImage
            //                     className="max-h-[20px]"
            //                     paymentMehod={paymentMehod}
            //                 />
            //                 <span className="ltr:ml-2 rtl:mr-2">
            //                     {paymentIdendifier}
            //                 </span>
            //             </span>
            //         )
            //     },
            // },
            {
                Header: 'Total TTC (CFA)',
                accessor: 'total_with_tax',
                sortable: true,
                Cell: (props) => {
                    const { total_with_tax } = props.row.original
                    return (
                        <NumberFormat
                            displayType="text"
                            value={(
                                Math.round(total_with_tax * 100) / 100
                            ).toFixed(2)}
                            thousandSeparator={true}
                        />
                    )
                },
            },
            {
                Header: 'Ajouté Par',
                accessor: 'createdBy',
                sortable: true,
                Cell: (props) => {
                    const row = props.row.original
                    return <span className="uppercase">{row.createdBy}</span>
                },
            },
            {
                Header: '',
                id: 'action',
                accessor: (row) => row,
                Cell: (props) => <ActionColumn row={props.row.original} />,
            },
        ],
        []
    )
    // console.log(tableData);
    
    const onPaginationChange = (page) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageIndex = page
        dispatch(setTableData(newTableData))
    }

    const onSelectChange = (value) => {
        const newTableData = cloneDeep(tableData)
        newTableData.pageSize = Number(value)
        newTableData.pageIndex = 1
        dispatch(setTableData(newTableData))
    }

    const onSort = (sort, sortingColumn) => {
        const newTableData = cloneDeep(tableData)
        newTableData.sort = sort
        dispatch(setTableData(newTableData))
    }

    const onRowSelect = (checked, row) => {
        if (checked) {
            dispatch(addRowItem([row._id]))
        } else {
            dispatch(removeRowItem(row._id))
        }
    }

    const onAllRowSelect = useCallback(
        (checked, rows) => {
            if (checked) {
                const originalRows = rows.map((row) => row.original)
                const selectedIds = []
                originalRows.forEach((row) => {
                    selectedIds.push(row._id)
                })
                dispatch(setSelectedRows(selectedIds))
            } else {
                dispatch(setSelectedRows([]))
            }
        },
        [dispatch]
    )

    return (
        <DataTable
            columns={columns}
            data={data}
            loading={loading}
            pagingData={tableData}
            onPaginationChange={onPaginationChange}
            onSelectChange={onSelectChange}
            onSort={onSort}
            onCheckBoxChange={onRowSelect}
            onIndeterminateCheckBoxChange={onAllRowSelect}
            selectable
        />
    )
}

export default OrdersTable
