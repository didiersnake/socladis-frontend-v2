import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteGroup, getAllGroups } from './store/dataSlice'
import { injectReducer } from 'store'
import reducer from './store'
import HeaderFooterBorder from './components/HeaderFooterBorder'
import { Link } from 'react-router-dom'
import { Button, Notification, toast } from 'components/ui'
import { HiPlusCircle } from 'react-icons/hi'

injectReducer("allGroupsList", reducer)
const GroupList = () => {
    const dispatch = useDispatch()
    const loading = useSelector((state) => state.allGroupsList.data.loading)
    const groups = useSelector((state) => state.allGroupsList.data.groups)
    
   const onGroupDelete = async (setDialogOpen, data) => {
       // dispatch(deleteGroup({id: data._id}))
       setDialogOpen(false)
       const success = await deleteGroup({ id: data._id })
       if (success) {
           popNotification('Supprimmer')
       }
   } 

   const popNotification = (keyword) => {
       toast.push(
           <Notification title={`${keyword}`} type="success" duration={2500}>
               Group {keyword} avec succès
           </Notification>,
           {
               placement: 'top-center',
           }
       )
    //    navigate('/app/group')
    fetchData()
   }
    

   const fetchData = () => {
    dispatch(getAllGroups())
   }

   useEffect(()=> {
    fetchData()
   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [])
  return (
      <div className="">
      <div className='py-3'>
        <GroupListTool />
      </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {!loading &&
                  groups.map((i, index) => {
                      return (
                          <div className="" key={index}>
                              <HeaderFooterBorder
                                  group_name={i.name}
                                  members={i.members}
                                  onDelete={onGroupDelete}
                                  loading={loading}
                                  data1={i}
                              />
                          </div>
                      )
                  })}
          </div>
      </div>
  )
}

export default GroupList

const GroupListTool = ()=> {
    return (
        <>
        <Link
            className="block lg:inline-block md:mb-0 mb-4"
            to="/app/group/group-new"
        >
            <Button block variant="solid" size="sm" icon={<HiPlusCircle />}>
                Ajouter un Group
            </Button>
        </Link>
        </>
    )
}