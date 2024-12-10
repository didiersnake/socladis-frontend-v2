import React from 'react'
import { AdaptableCard } from 'components/shared'
import { Input, FormItem, Select} from 'components/ui'
import DatePicker from 'components/ui/DatePicker'
import { Field } from 'formik'
import AutocompleteInput from './AutocompleteInput'

export const categories = [
    { label: 'Grand Format', value: 'grand format' },
    { label: 'Petit Format', value: 'petit format' },
]


const BasicInformationFields = (props) => {
    const { touched, errors, suggestions, values,  } = props

    // console.log(suggestions);
    
    return (
        <AdaptableCard className="mb-4" divider>
            <h5> Magasin Vide </h5>
            <p className="mb-6">
                Section permettant d'jouter des details sur le stock vide
            </p>
            <FormItem
                label="Equipe"
                invalid={errors.name && touched.name}
                errorMessage={errors.name}
            >
                <Field
                    name="team"
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
                label="Format"
                invalid={errors.format && touched.format}
                errorMessage={errors.format}
            >
                <Field name="format">
                    {({ field, form }) => (
                        <Select
                            field={field}
                            form={form}
                            options={categories}
                            value={categories.filter(
                                (category) => category.value === values.format
                            )}
                            onChange={(option) =>
                                form.setFieldValue(field.name, option.value)
                            }
                        />
                    )}
                </Field>
            </FormItem>
            <FormItem
                label="Bouteille"
                invalid={errors.bottle && touched.bottle}
                errorMessage={errors.bottle}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="bottle"
                    placeholder=""
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Plastic"
                invalid={errors.plastic && touched.plastic}
                errorMessage={errors.plastic}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="plastic"
                    placeholder=""
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Casier"
                invalid={errors.cashier && touched.cashier}
                errorMessage={errors.cashier}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="cashier"
                    placeholder=""
                    component={Input}
                />
            </FormItem>
        </AdaptableCard>
    )
}

export default BasicInformationFields
