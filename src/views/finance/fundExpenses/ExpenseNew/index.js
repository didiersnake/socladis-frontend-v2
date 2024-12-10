import React, { useEffect } from 'react'
import ProductForm from 'views/finance/fundExpenses/ExpenseForm'
import { toast, Notification } from 'components/ui'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { injectReducer } from 'store'
import groupReducer from "views/users/group/GroupList/store"
import reducer from 'views/stock/products/ProductList/store'
import authReducer from 'store/auth'
import userReducer from 'views/users/users/UserList/store'
import { apiCreateNewEmpty } from 'services/ExpenseService'

injectReducer("salesProducts", reducer)
injectReducer("users", userReducer)
injectReducer("auth", authReducer)
injectReducer('group', groupReducer)


const ProductNew = () => {
    const navigate = useNavigate()

    const addProduct = async (data) => {
        const response = await apiCreateNewEmpty(data)
        return response.data
    }

    // const dispatch = useDispatch()
    const groups = useSelector((state) => state.group.data.groups)
    const createdBy = useSelector((state) => state.auth.user.name)

    // console.log(products);   
    
    // const loading = useSelector(
    //     (state) => state.salesProducts.data.loading
    // )

    useEffect(()=> {
        // fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleFormSubmit = async (values, setSubmitting) => {
        setSubmitting(true)
        const data = {
            modif: values.modif,
            date: new Date(values.date).toISOString(),
            amount: values.amount,
            bank: values.bank,
            createdBy: createdBy,
            updatedBy: createdBy,
        }
        const success = await addProduct(data)
        setSubmitting(false)
        if (success) {
            toast.push(
                <Notification
                    title={'Ajouté avec succès'}
                    type="success"
                    duration={2500}
                >
                     
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            navigate('/app/cash-out')
        }
        
    }

    const handleDiscard = () => {
        navigate('/app/cash-out')
    }

    return (
        <>
            {
                <ProductForm
                    type="new"
                    onFormSubmit={handleFormSubmit}
                    onDiscard={handleDiscard}
                    suggestions={groups}
                    // initialData={{}}
                />
            }
        </>
    )
}

export default ProductNew
