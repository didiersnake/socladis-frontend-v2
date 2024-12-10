import React, { useEffect, useMemo } from 'react'
import { Avatar } from 'components/ui'
import { DataTable } from 'components/shared'
import { HiOutlinePencil, HiOutlineTrash } from 'react-icons/hi'
import { FiUser } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { getAllClients, getGroups, getProducts, setTableData } from '../store/dataSlice'
import { setSortedColumn, setSelectedProduct } from '../store/stateSlice'
import { toggleDeleteConfirmation } from '../store/stateSlice'
import useThemeClass from 'utils/hooks/useThemeClass'
import ProductDeleteConfirmation from './ProductDeleteConfirmation'
import { useNavigate } from 'react-router-dom'
import cloneDeep from 'lodash/cloneDeep'


const ActionColumn = ({ row }) => {
    const dispatch = useDispatch()
    const { textTheme } = useThemeClass()
    const navigate = useNavigate()

    const onEdit = () => {
        navigate(`/app/users/user-edit/${row._id}`)
        // console.log(row);
        
    }

    const onDelete = () => {
        dispatch(toggleDeleteConfirmation(true))
        dispatch(setSelectedProduct(row._id))
    }

    return (
        <div className="flex justify-end text-lg">
            <span
                className={`cursor-pointer p-2 hover:${textTheme}`}
                onClick={onEdit}
            >
                <HiOutlinePencil />
            </span>
            <span
                className="cursor-pointer p-2 hover:text-red-500"
                onClick={onDelete}
            >
                <HiOutlineTrash />
            </span>
        </div>
    )
}

const ProductColumn = ({ row }) => {
    const avatar = row.img ? (
        <Avatar src={row.img} />
    ) : (
        <Avatar icon={<FiUser />} />
    )

    return (
        <div className="flex items-center">
            {avatar}
            <span className={`ml-2 rtl:mr-2 font-semibold`}>{row.name}</span>
        </div>
    )
}

const ProductTable = () => {
    const dispatch = useDispatch()
    const { pageIndex, pageSize, sort, query, total } = useSelector(
        (state) => state.salesProductList.data.tableData
    )
    // const filterData = useSelector(
    //     (state) => state.salesProductList.data.filterData
    // )
    const loading = useSelector((state) => state.salesProductList.data.loading)
    const data = useSelector((state) => state.salesProductList.data.productList)

    useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageIndex, pageSize, sort])

    const tableData = useMemo(
        () => ({ pageIndex, pageSize, sort, query, total }),
        [pageIndex, pageSize, sort, query, total]
    )

    const fetchData = () => {
        dispatch(getProducts({ pageIndex, pageSize, sort, query}))
        dispatch(getAllClients())
        dispatch(getGroups())

    }

    const columns = useMemo(
        () => [
            {
                Header: 'Nom',
                accessor: 'name',
                sortable: true,
                Cell: (props) => {
                    const row = props.row.original
                    return <ProductColumn row={row} />
                },
            },
            {
                Header: 'Telephone',
                accessor: 'phone',
                sortable: true,
            },
            {
                Header: 'Statut',
                accessor: 'roles',
                sortable: true,
            },
            {
                Header: 'NIU',
                accessor: 'uniqueCode',
                sortable: true,
            },

            {
                Header: 'Category',
                accessor: 'category',
                sortable: true,
                // Cell: (props) => {
                //     const row = props.row.original
                //     return <span className="capitalize">{row.category}</span>
                // },
            },
            {
                Header: 'Regime Fiscal',
                accessor: 'tax_system',
                sortable: true,
            },

            {
                Header: 'Equipe',
                accessor: 'group',
                sortable: true,
            },
            {
                Header: 'Localisation',
                accessor: 'location',
            },
            {
                Header: 'Pass',
                accessor: 'password',
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
        dispatch(setSortedColumn(sortingColumn))
    }

    return (
        <>
            <DataTable
                columns={columns}
                data={data}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ className: 'rounded-md' }}
                loading={loading}
                pagingData={tableData}
                onPaginationChange={onPaginationChange}
                onSelectChange={onSelectChange}
                onSort={onSort}
            />
            <ProductDeleteConfirmation />
        </>
    )
}

export default ProductTable
