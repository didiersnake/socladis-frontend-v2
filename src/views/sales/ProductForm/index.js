import React, { forwardRef, useState } from 'react'
import { FormContainer, Button } from 'components/ui'
import { ConfirmDialog, StickyFooter } from 'components/shared'
import { Form, Formik } from 'formik'
import BasicInformationFields from './BasicInformationFields'

import cloneDeep from 'lodash/cloneDeep'
import { AiOutlineSave } from 'react-icons/ai'
import * as Yup from 'yup'
import { HiOutlineTrash } from 'react-icons/hi'
import PaymentSummary from '../SalesNew/components/PaymentSummary'
import UserDetails from './UserDetails'

const validationSchema = Yup.object().shape({
    clientName: Yup.string().required('Required'),
    products: Yup.array().of(
        Yup.object().shape({
            name: Yup.string().required('Required'),
            price: Yup.string(),
            total: Yup.string(),
            quantity: Yup.string().required('Required'),
        })
    ),
    date: Yup.string().required('Required'),
    credit: Yup.string().required('Required'),
    cash: Yup.string().required('Required'),
    ristourn: Yup.string().required('Required'),
    emballages: Yup.string().required('Required'),
    inclure_ristourn: Yup.bool(),
    inclure_precompte: Yup.bool(),
    invoice_number: Yup.string().required('Required'),
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
         onDiscard, onDelete, suggestions
         } = props

    // const newId = useUniqueId('product-')

    return (
        <>
            <Formik
                innerRef={ref}
                initialValues={{
                    ...initialData,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    const formData = cloneDeep(values)
                    onFormSubmit?.(formData, setSubmitting)
                    resetForm()
                }}
            >
                {({ values, touched, errors, isSubmitting }) => (
                    <Form>
                        <FormContainer>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                                <div className="col-span-2">
                                    <BasicInformationFields
                                        touched={touched}
                                        errors={errors}
                                        values={values}
                                        products={values.products}
                                        suggestions={suggestions}
                                    />
                                </div>
                                <div className="max-h-96 mt-28 grid gap-2">
                                    <UserDetails
                                        users={suggestions[1]}
                                        value={values?.clientName}
                                    />
                                    <PaymentSummary
                                        inclure_precompte={
                                            values?.inclure_precompte
                                        }
                                        inclure_ristourn={
                                            values?.inclure_ristourn
                                        }
                                        products={values.products}
                                        user={suggestions[1].find(
                                            (i) =>
                                                i.clientName ===
                                                values.clientName
                                        )}
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
        clientName: '',
        date: '',
        products: [],
        cash: 0,
        credit: 0,
        ristourn: 0,
        emballages: 0,
        inclure_ristourn: false,
        inclure_precompte: false,
        invoice_number : '',
    },
}

export default ProductForm
