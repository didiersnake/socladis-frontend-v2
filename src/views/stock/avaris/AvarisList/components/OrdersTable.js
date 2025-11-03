import React, { useEffect, useCallback, useMemo } from 'react'
import { Tooltip } from 'components/ui'
import { DataTable } from 'components/shared'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { getAvaris, getAvarisByRange, setTableData } from '../store/dataSlice'
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


import { injectReducer } from 'store'
import reducer from 'views/stock/products/ProductList/store'
import { getProductsUnpaginated } from 'views/stock/products/ProductList/store/dataSlice'

injectReducer('salesProducts', reducer)

const ActionColumn = ({ row }) => {
    const dispatch = useDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onDelete = () => {
        dispatch(setDeleteMode('single'))
        dispatch(setSelectedRow([row._id]))
    }

    const onView = useCallback(() => {
        navigate(`/app/damaged/damaged-edit/${row._id}`)
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
    const fetchData = () => {
        let startDate = s_date
        let endDate = e_date
        dispatch(
            getAvaris({ pageIndex, pageSize, sort, query, startDate, endDate })
        )
        dispatch(getAvarisByRange({ startDate, endDate }))
        dispatch(getProductsUnpaginated())

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }

    useEffect(() => {
        // dispatch(setSelectedRows([]))
        fetchData()
    }, [pageIndex, pageSize, sort, query, startDate, endDate])

    const products = useSelector(
        (state) => state.salesProducts.data.productList
    )

    const getProductPrice = (prodcutName) => {
        const product = products.find((el) => el?.name === prodcutName)
        return Number(product?.unitPrice)
    }

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total, startDate, endDate }),
        [pageIndex, pageSize, sort, query, total, startDate, endDate]
    )

    const columns = [
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
        },
        {
            Header: 'Quantité',
            accessor: 'quantity',
            sortable: true,
        },
        {
            Header: "Type d'Avaris",
            accessor: 'type',
            sortable: true,
            Cell: (props) => {
                const row = props.row.original
                return <span className="capitalize">{row.type}</span>
            },
        },
        {
            Header: 'Prix Achat TTC',
            accessor: 'unit_price',
            sortable: true,
            Cell: (props) => {
                const row = props.row.original
                return (
                    <span className="capitalize">
                        {row.unit_price !== undefined &&
                        row.unit_price !== null &&
                        row.unit_price !== ''
                            ? row.unit_price
                            : getProductPrice(row?.name)}
                    </span>
                )
            },
        },
        {
            Header: 'Total TTC',
            accessor: 'total',
            sortable: true,
            Cell: (props) => {
                const row = props.row.original
                return (
                    <span className="capitalize">
                        {row.total !== undefined &&
                        row.total !== null &&
                        row.total !== ''
                            ? row.total
                            : getProductPrice(row?.name) * Number(row.quantity)}
                    </span>
                )
            },
        },

        {
            Header: 'Ajouté Par',
            accessor: 'createdBy',
            sortable: true,
            Cell: (props) => {
                const row = props.row.original
                return <span className="uppercase">{row?.createdBy}</span>
            },
        },
        {
            Header: 'Modifé Par',
            accessor: 'updatedBy',
            sortable: true,
            Cell: (props) => {
                const row = props.row.original
                return <span className="uppercase">{row?.createdBy}</span>
            },
        },
        {
            Header: '',
            id: 'action',
            accessor: (row) => row,
            Cell: (props) => <ActionColumn row={props.row.original} />,
        },
    ]
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
