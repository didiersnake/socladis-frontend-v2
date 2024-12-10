import React from 'react'
import { AdaptableCard } from 'components/shared'
import { Input, FormItem, Select} from 'components/ui'
import DatePicker from 'components/ui/DatePicker'
import { Field } from 'formik'
import AutocompleteInput from './AutocompleteInput'

export const categories = [
    { label: 'Magasin', value: 'magasin' },
    { label: 'Livraison', value: 'livraison' },
]


const BasicInformationFields = (props) => {
    const { touched, errors, suggestions, values,  } = props

    // console.log(suggestions);
    
    return (
        <AdaptableCard className="mb-4" divider>
            <h5> Avaris </h5>
            <p className="mb-6">
                Section permettant d'jouter des details sur les avaris
            </p>
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
                label="Type d'Avaris"
                invalid={errors.type && touched.type}
                errorMessage={errors.type}
            >
                <Field name="type">
                    {({ field, form }) => (
                        <Select
                            field={field}
                            form={form}
                            options={categories}
                            value={categories.filter(
                                (category) =>
                                    category.value === values.type
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
