import React, { useEffect } from 'react'
import { Loading, DoubleSidedImage } from 'components/shared'
import { toast, Notification } from 'components/ui'
import { useDispatch, useSelector } from 'react-redux'
import reducer from './store'
import pdtReducer from 'views/stock/products/ProductList/store'
import authReducer from 'store/auth'
import { injectReducer } from 'store/index'
import { useLocation, useNavigate } from 'react-router-dom'
import { getProduct, updateProduct, deleteProduct } from './store/dataSlice'
import ProductForm from 'views/stock/emptyStore/EmptyForm/index'
import groupReducer from 'views/users/group/GroupList/store'
import isEmpty from 'lodash/isEmpty'
import { getAllGroups } from 'views/users/group/GroupList/store/dataSlice'

injectReducer('salesProductEdit', reducer)
injectReducer("salesProducts", pdtReducer)
injectReducer('group', groupReducer)
injectReducer('auth', authReducer)


const ProductEdit = () => {
    const dispatch = useDispatch()

    const location = useLocation()
    const navigate = useNavigate()

    const productData = useSelector(
        (state) => state.salesProductEdit.data.productData
    )

    console.log(productData);
    
    const loading = useSelector((state) => state.salesProductEdit.data.loading)
    const createdBy = useSelector((state) => state.auth.user.name)

    const group = useSelector(
        (state) => state.group.data.groups
    )
    // console.log(productData);
    

    const fetchData = (data) => {
        dispatch(getProduct(data))
        dispatch(getAllGroups())

    }

    const handleFormSubmit = async (values, setSubmitting) => {
        setSubmitting(true)
        
        const data = {
            team: values.team,
            plastic: values.plastic,
            date: new Date(values.date).toISOString(),
            bottle: values.bottle,
            format: values.format,
            cashier: values.cashier,
            updatedBy: createdBy,
        }
        const success = await updateProduct({id: productData._id, data:data})
        setSubmitting(false)
        if (success) {
            popNotification('Sauvegarder')
        }
    }

    const handleDiscard = () => {
        navigate('/app/empty-store')
    }

    const handleDelete = async (setDialogOpen) => {
        setDialogOpen(false)
        const success = await deleteProduct({ id: productData._id })
        if (success) {
            popNotification('Supprimer')
        }
    }

    const popNotification = (keyword) => {
        toast.push(
            <Notification
                title={`Successfuly ${keyword}`}
                type="success"
                duration={2500}
            >
                Produit {keyword} avec success
            </Notification>,
            {
                placement: 'top-center',
            }
        )
        navigate('/app/empty-store')
    }
    
    useEffect(() => {
        const path = location.pathname.substring(
            location.pathname.lastIndexOf('/') + 1
        )
        const rquestParam = { id: path }
        fetchData(rquestParam)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.pathname])

    return (
        <>
            <Loading loading={loading}>
                {!isEmpty(productData) && (
                    <>
                        <ProductForm
                            type="edit"
                            initialData={{
                                team: productData?.team,
                                plastic: productData?.plastic,
                                date: new Date(productData?.date),
                                bottle: productData?.bottle,
                                format: productData?.format,
                                cashier: productData?.cashier,
                                // createdBy: createdBy,
                                // updatedBy: createdBy,
                            }}
                            onFormSubmit={handleFormSubmit}
                            onDiscard={handleDiscard}
                            onDelete={handleDelete}
                            suggestions={group}
                        />
                    </>
                )}
            </Loading>
            {!loading && isEmpty(productData) && (
                <div className="h-full flex flex-col items-center justify-center">
                    <DoubleSidedImage
                        src="/img/others/img-2.png"
                        darkModeSrc="/img/others/img-2-dark.png"
                        alt="No product found!"
                    />
                    <h3 className="mt-8">No product found!</h3>
                </div>
            )}
        </>
    )
}

export default ProductEdit
