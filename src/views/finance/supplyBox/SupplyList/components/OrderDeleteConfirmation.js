import React from 'react'
import { toast, Notification } from 'components/ui'
import { ConfirmDialog } from 'components/shared'
import { useSelector, useDispatch } from 'react-redux'
import {
    setDeleteMode,
    setSelectedRow,
    setSelectedRows,
} from '../store/stateSlice'
import { deleteAvaris, getEmptyStore } from '../store/dataSlice'

const OrderDeleteConfirmation = () => {
    const dispatch = useDispatch()
    const selectedRows = useSelector(
        (state) => state.salesOrderList.state.selectedRows
    )
    const selectedRow = useSelector(
        (state) => state.salesOrderList.state.selectedRow
    )
    const deleteMode = useSelector(
        (state) => state.salesOrderList.state.deleteMode
    )
    const tableData = useSelector(
        (state) => state.salesOrderList.data.tableData
    )

    const onDialogClose = () => {
        dispatch(setDeleteMode(''))

        if (deleteMode === 'single') {
            dispatch(setSelectedRow([]))
        }
    }

    const onDelete = async () => {
        dispatch(setDeleteMode(''))

        if (deleteMode === 'single') {
            const success = await deleteAvaris({ id: selectedRow })
            deleteSucceed(success)
            dispatch(setSelectedRow([]))
        }

        if (deleteMode === 'batch') {
            const success = await deleteAvaris({ id: selectedRows })
            deleteSucceed(success, selectedRows.length)
            dispatch(setSelectedRows([]))
        }
    }

    const deleteSucceed = (success, orders) => {
        if (success) {
            dispatch(getEmptyStore(tableData))
            toast.push(
                <Notification
                    title={'Supprimé avec succès'}
                    type="success"
                    duration={2500}
                >
                    {deleteMode === 'single' && 'Order '}
                    {deleteMode === 'batch' && `${orders} orders `}
                    successfuly deleted
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }
    }

    return (
        <ConfirmDialog
            isOpen={deleteMode === 'single' || deleteMode === 'batch'}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            type="danger"
            title="Supprimer Facture"
            onCancel={onDialogClose}
            onConfirm={onDelete}
            confirmButtonColor="red-600"
        >
            <p>
                Etes-vous sûr de vouloir supprimer cette etat ?
            </p>
        </ConfirmDialog>
    )
}

export default OrderDeleteConfirmation
