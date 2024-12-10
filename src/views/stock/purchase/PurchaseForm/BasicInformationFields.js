import React from 'react'
import { AdaptableCard } from 'components/shared'
import { Input, FormItem, Select} from 'components/ui'
import DatePicker from 'components/ui/DatePicker'
import { Field } from 'formik'
import AutocompleteInput from './AutocompleteInput'

export const categories = [
    { label: 'Achat', value: 'achat' },
    { label: 'Commission', value: 'commission' },
    { label: 'Promotion', value: 'promotion' },
]


const BasicInformationFields = (props) => {
    const { touched, errors, suggestions, values,  } = props

    // console.log(suggestions);
    
    return (
        <AdaptableCard className="mb-4" divider>
            <h5> Livraison de produits </h5>
            <p className="mb-6">
                
                Section permettant d'jouter des details de ravitaillement de
                produits
            </p>
            <FormItem
                label="Numero de Facture"
                invalid={errors.invoice_number && touched.invoice_number}
                errorMessage={errors.invoice_number}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="invoice_number"
                    placeholder="#"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Date"
                invalid={errors.date && touched.date}
                errorMessage={errors.date}
            >
                <Field name="date">
                    {({ field, form }) => (
                        <DatePicker
                            field={field}
                            form={form}
                            value={field.value}
                            onChange={(date) => {
                                form.setFieldValue(field.name, date)
                            }}
                        />
                    )}
                </Field>
            </FormItem>
            <FormItem
                label="Nom du Produit"
                invalid={errors.name && touched.name}
                errorMessage={errors.name}
            >
                <Field
                    name="name"
                    component={AutocompleteInput}
                    placeholder="|"
                    suggestions={suggestions?.map((i) => i.name)}
                />
            </FormItem>

            <FormItem
                label="Type d'Achat"
                invalid={errors.purchase_type && touched.purchase_type}
                errorMessage={errors.purchase_type}
            >
                <Field name="purchase_type">
                    {({ field, form }) => (
                        <Select
                            field={field}
                            form={form}
                            options={categories}
                            value={categories.filter(
                                (category) => category.value === values.purchase_type
                            )}
                            onChange={(option) =>
                                form.setFieldValue(field.name, option.value)
                            }
                        />
                    )}
                </Field>
            </FormItem>
            <FormItem
                label="Quantite"
                invalid={errors.quantity && touched.quantity}
                errorMessage={errors.quantity}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="quantity"
                    placeholder="#"
                    component={Input}
                />
            </FormItem>
        </AdaptableCard>
    )
}

export default BasicInformationFields
