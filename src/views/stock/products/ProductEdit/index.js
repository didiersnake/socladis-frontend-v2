import React, { useEffect } from 'react'
import { Loading, DoubleSidedImage } from 'components/shared'
import { toast, Notification } from 'components/ui'
import { useDispatch, useSelector } from 'react-redux'
import reducer from './store'
import { injectReducer } from 'store/index'
import { useLocation, useNavigate } from 'react-router-dom'
import { getProduct, updateProduct, deleteProduct } from './store/dataSlice'
import ProductForm from 'views/stock/products/ProductForm'
import isEmpty from 'lodash/isEmpty'

injectReducer('salesProductEdit', reducer)

const ProductEdit = () => {
    const dispatch = useDispatch()

    const location = useLocation()
    const navigate = useNavigate()

    const productData = useSelector(
        (state) => state.salesProductEdit.data.productData
    )
    const loading = useSelector((state) => state.salesProductEdit.data.loading)

    const fetchData = (data) => {
        dispatch(getProduct(data))
    }

    const handleFormSubmit = async (values, setSubmitting) => {
        setSubmitting(true)
        let data = {
            name:values.name,
            category: values.category,
            format: values.format,
            unitPrice: values.unitPrice,
            sale_price: [
                {
                    grossiste: values.grossiste,
                    Semi_grossiste: values.Semi_grossiste,
                    detaillant: values.detaillant,
                    random: values.random,
                },
            ],
        }
        const success = await updateProduct({id: productData._id, data:data})
        setSubmitting(false)
        if (success) {
            popNotification('Sauvegarder')
        }
    }

    const handleDiscard = () => {
        navigate('/app/products')
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
                Produit {keyword} success
            </Notification>,
            {
                placement: 'top-center',
            }
        )
        navigate('/app/products')
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
                                category: productData?.category,
                                format: productData?.format,
                                name: productData?.name,
                                unitPrice: productData?.unitPrice,
                                grossiste:
                                    productData?.sale_price[0]?.grossiste,
                                Semi_grossiste:
                                    productData?.sale_price[0]?.Semi_grossiste,
                                detaillant:
                                    productData?.sale_price[0]?.detaillant,
                                random: productData?.sale_price[0]?.random,
                            }}
                            onFormSubmit={handleFormSubmit}
                            onDiscard={handleDiscard}
                            onDelete={handleDelete}
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
