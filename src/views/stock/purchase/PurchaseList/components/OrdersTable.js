import React, { useEffect, useCallback, useMemo } from 'react'
import { Tooltip } from 'components/ui'
import { DataTable } from 'components/shared'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { getOrders, getPurchaseByRange, setTableData } from '../store/dataSlice'
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

const ActionColumn = ({ row }) => {
    const dispatch = useDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onDelete = () => {
        dispatch(setDeleteMode('single'))
        dispatch(setSelectedRow([row._id]))
    }

    const onView = useCallback(() => {
        navigate(`/app/supply/supply-edit/${row._id}`)
    }, [navigate, row])

    return (
        <div className="flex justify-end text-lg">
            <Tooltip title="View">
                <span
                    className={`cursor-pointer p-2 hover:${textTheme}`}
                    onClick={onView}
                >
                    <HiOutlinePencil />
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
    const { pageIndex, pageSize, sort, query, total, startDate, endDate } =
        useSelector((state) => state.salesOrderList.data.tableData)
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
        dispatch(getPurchaseByRange({ startDate, endDate }))
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
                // Cell: (props) => <OrderColumn row={props.row.original} />,
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
                Header: 'Nom du Produit',
                accessor: 'name',
                sortable: true,
                Cell: (props) => {
                    const row = props.row.original
                    return <span className="capitalize">{row?.name}</span>
                },
            },
            {
                Header: 'Quantité',
                accessor: 'quantity',
                sortable: true,
            },
            {
                Header: "Type d'Achat",
                accessor: 'purchase_type',
                sortable: true,
                Cell: (props) => {
                    const row = props.row.original
                    return (
                        <span className="capitalize">{row?.purchase_type}</span>
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
                Header: 'Modifé Par',
                accessor: 'updatedBy',
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
