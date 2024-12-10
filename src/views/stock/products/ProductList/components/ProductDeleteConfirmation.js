import React from 'react'
import { toast, Notification } from 'components/ui'
import { ConfirmDialog } from 'components/shared'
import { useSelector, useDispatch } from 'react-redux'
import { toggleDeleteConfirmation } from '../store/stateSlice'
import { deleteProduct, getProducts } from '../store/dataSlice'

const ProductDeleteConfirmation = () => {
    const dispatch = useDispatch()
    const dialogOpen = useSelector(
        (state) => state.salesProductList.state.deleteConfirmation
    )
    const selectedProduct = useSelector(
        (state) => state.salesProductList.state.selectedProduct
    )
    const tableData = useSelector(
        (state) => state.salesProductList.data.tableData
    )

    const onDialogClose = () => {
        dispatch(toggleDeleteConfirmation(false))
    }

    const onDelete = async () => {
        dispatch(toggleDeleteConfirmation(false))
        const success = await deleteProduct({ id: selectedProduct })

        if (success) {
            dispatch(getProducts(tableData))
            toast.push(
                <Notification
                    title={'Successfuly Deleted'}
                    type="success"
                    duration={2500}
                >
                    Product successfuly deleted
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
        }
    }

    return (
        <ConfirmDialog
            isOpen={dialogOpen}
            onClose={onDialogClose}
            onRequestClose={onDialogClose}
            type="danger"
            title="Supprimer produit"
            onCancel={onDialogClose}
            onConfirm={onDelete}
            confirmButtonColor="red-600"
        >
            <p>
                Etes-vous sûr de vouloir supprimer ce produit ? Tous les
                enregistrements liés à ce produit seront également supprimés.
                Cette action ne peut pas être annulée.
            </p>
        </ConfirmDialog>
    )
}

export default ProductDeleteConfirmation
