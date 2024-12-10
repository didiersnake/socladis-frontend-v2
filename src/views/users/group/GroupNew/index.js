import React, { useEffect } from 'react'
import { GroupForm } from '../GroupForm'
import { useDispatch, useSelector } from 'react-redux'
import { getAllEmployeeUsers } from 'views/users/group/GroupNew/store/dataSlice'
import { injectReducer } from 'store'
import reducer from './store'
import userReducer from 'store/auth'
import { apiCreateGroup } from 'services/UserService'
import { Notification, toast } from 'components/ui'
import { useNavigate } from 'react-router-dom'

injectReducer('salesProductList', reducer)
injectReducer('auth', userReducer)


const GroupNew = () => {
    const dispatch = useDispatch()
    const fetchData = () => {
        dispatch(getAllEmployeeUsers())
    }
    const navigate = useNavigate()
    const employees = useSelector(
        (state) => state.salesProductList.data.employees
    )

    console.log(employees);
    
    const loading = useSelector(
        (state) => state.salesProductList.data.loading
    )
    const user = useSelector((state) => state.auth.user.name)

    useEffect(() => {
        fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    

    const handleFormSubmit = async (values, setSubmitting) => {
        // setSubmitting(true)
        let date = new Date()
        const data = {
            name: values.name,
            members: values.members.map((i) => {
                return {
                    userName: i.userName.userName,
                    userId: i.userName.userId,
                }
            }),
            date: date.toJSON().toString(),
            createdBy: user,
            updatedBy: user,
        }
        console.log(data);
        
        const success = await apiCreateGroup(data)
        // setSubmitting(false)
        if (success) {
            toast.push(
                <Notification
                    title={'Ajouté avec succès'}
                    type="success"
                    duration={2500}
                >
                    Group ajouté avec succès
                </Notification>,
                {
                    placement: 'top-center',
                }
            )
            navigate('/app/group')
        }
    }
    
    return (
        <>
            {!loading ? (
                <GroupForm
                    employeeList={employees?.map((item) => {
                        return {
                            label: item.name,
                            value: { userName: item.name, userId: item._id },
                        }
                    })}
                    onSubmit={handleFormSubmit}
                />
            ) : <div></div>}
        </>
    )
}

export default GroupNew
