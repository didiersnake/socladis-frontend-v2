import React, { useState } from 'react'
import { Card, Button } from 'components/ui'
import BasicTag from './BasicTag'
import { HiOutlineTrash } from 'react-icons/hi'
import { ConfirmDialog } from 'components/shared'

const HeaderFooterBorder = ({group_name, members, onDelete, loading, data1}) => {

    const DeleteGroupButton = ({ onDelete }) => {
        const [dialogOpen, setDialogOpen] = useState(false)
        let data = data1
        const onConfirmDialogOpen = () => {
            setDialogOpen(true)
        }

        const onConfirmDialogClose = () => {
            setDialogOpen(false)
        }

        const handleConfirm = () => {
            onDelete?.(setDialogOpen, data)
        }

        return (
            <>
                <Button
                    className="text-red-600"
                    variant="plain"
                    size="sm"
                    icon={<HiOutlineTrash />}
                    type="button"
                    onClick={onConfirmDialogOpen}
                >
                    Supprimer
                </Button>
                <ConfirmDialog
                    isOpen={dialogOpen}
                    onClose={onConfirmDialogClose}
                    onRequestClose={onConfirmDialogClose}
                    type="danger"
                    title="Supprimer ce Group"
                    onCancel={onConfirmDialogClose}
                    onConfirm={handleConfirm}
                    confirmButtonColor="red-600"
                >
                    <p>
                        Etes-vous sûr de vouloir supprimer ce Group? Cette
                        action est irréversible.
                    </p>
                </ConfirmDialog>
            </>
        )
    }

 const cardFooter = (
     <div className="flex">
         <DeleteGroupButton onDelete={onDelete}/>
     </div>
 )

 return (
     <div className="max-w-sm">
     {!loading && 
         <Card
             header={group_name}
             footer={cardFooter}
             footerBorder={false}
             headerBorder={false}
             clickable
         >
            {members?.map((i, index)=> {return (
                <BasicTag name={i?.userName} key={index}/>
            )})}
         </Card>
     }
     </div>
 )
}

export default HeaderFooterBorder