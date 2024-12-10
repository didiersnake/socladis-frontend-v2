import React, { forwardRef, useState } from 'react'
import { FormContainer, Button } from 'components/ui'
import { ConfirmDialog, StickyFooter } from 'components/shared'
import { Form, Formik } from 'formik'
import BasicInformationFields from './BasicInformationFields'

import cloneDeep from 'lodash/cloneDeep'
import { AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'
import { HiOutlineTrash } from 'react-icons/hi'

// const { useUniqueId } = hooks

const validationSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    unitPrice: Yup.string().required('Required'),
    format: Yup.string().required('Required'),
    category: Yup.string().required('Required'),
    grossiste: Yup.string().required('Required'),
    Semi_grossiste: Yup.string().required('Required'),
    detaillant: Yup.string().required('Required'),
    random: Yup.string().required('Required'),
})

const DeleteProductButton = ({ onDelete }) => {
    const [dialogOpen, setDialogOpen] = useState(false)

    const onConfirmDialogOpen = () => {
        setDialogOpen(true)
    }

    const onConfirmDialogClose = () => {
        setDialogOpen(false)
    }

    const handleConfirm = () => {
        onDelete?.(setDialogOpen)
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
                Delete
            </Button>
            <ConfirmDialog
                isOpen={dialogOpen}
                onClose={onConfirmDialogClose}
                onRequestClose={onConfirmDialogClose}
                type="danger"
                title="Delete product"
                onCancel={onConfirmDialogClose}
                onConfirm={handleConfirm}
                confirmButtonColor="red-600"
            >
                <p>
                    Are you sure you want to delete this product? All record
                    related to this product will be deleted as well. This action
                    cannot be undone.
                </p>
            </ConfirmDialog>
        </>
    )
}

const ProductForm = forwardRef((props, ref) => {
    const { initialData, onFormSubmit, type,
         onDiscard, onDelete
         } = props

    // const newId = useUniqueId('product-')

    return (
        <>
            <Formik
                innerRef={ref}
                initialValues={{
                    ...initialData
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    const formData = cloneDeep(values)
                    onFormSubmit?.(formData, setSubmitting)
                }}
            >
                {({ values, touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                <div className="lg:col-span-2">
                                    <BasicInformationFields
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                    />
                                </div>
                            </div>
                            <StickyFooter
                                className="-mx-8 px-8 flex items-center justify-between py-4"
                                stickyClass="border-t bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                            >
                                <div>
                                    {type === 'edit' && (
                                        <DeleteProductButton
                                            onDelete={onDelete}
                                        />
                                    )}
                                </div>

                                <div className="md:flex items-center ">
                                    
                                        <Button
                                            size="sm"
                                            className="ltr:mr-3 rtl:ml-3"
                                            onClick={() => onDiscard?.()}
                                            type="button"
                                        >
                                            Annuler
                                        </Button>
                                    <Button
                                        size="sm"
                                        variant="solid"
                                        loading={isSubmitting}
                                        icon={<AiOutlineSave />}
                                        type="submit"
                                    >
                                        sauvegarder
                                    </Button>
                                </div>
                            </StickyFooter>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </>
    )
})

ProductForm.defaultProps = {
    type: 'edit',
    initialData: {
        name: '',
        format: '',
        category: '',
        unitPrice: '',
        sale_price: []
    },
}

export default ProductForm
