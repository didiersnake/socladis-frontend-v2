import React from 'react'
import ProductForm from 'views/users/users/UserForm'
import { toast, Notification } from 'components/ui'
import { useNavigate } from 'react-router-dom'
import { apiCreateUser } from 'services/UserService'
import reducer from 'views/users/users/UserList/store'

import { injectReducer } from 'store'

injectReducer('salesProductList', reducer)


const ProductNew = () => {
    const navigate = useNavigate()

    const addProduct = async (data) => {
        const response = await apiCreateUser(data)
        return response.data
    }

    const handleFormSubmit = async (values, setSubmitting) => {
        // console.log("values");
        setSubmitting(true)
        const success = await addProduct(values)
        setSubmitting(false)
        if (success) {
            toast.push(
                <Notification
                    title={'Ajouté avec succès'}
                    type="success"
                    duration={2500}
                >
                    Utilisateurs sajouté avec succès
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            navigate('/app/users')
        }
    }

    const handleDiscard = () => {
        navigate('/app/users')
    }

    return (
        <>
            <ProductForm
                type="new"
                onFormSubmit={handleFormSubmit}
                onDiscard={handleDiscard}
            />
        </>
    )
}

export default ProductNew
