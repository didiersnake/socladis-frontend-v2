import React from 'react'
import { AdaptableCard } from 'components/shared'
import { Input, FormItem} from 'components/ui'
import DatePicker from 'components/ui/DatePicker'
import { Field } from 'formik'
import AutocompleteInput from './AutocompleteInput'

export const categories = [
    { label: 'Grand Format', value: 'grand format' },
    { label: 'Petit Format', value: 'petit format' },
]


const BasicInformationFields = (props) => {
    const { touched, errors, suggestions,  } = props

    // console.log(suggestions);
    
    return (
        <AdaptableCard className="mb-4" divider>
            <h5> Approvisionement </h5>
            <p className="mb-6">
                Section permettant d'jouter des details sur les entree en caisse
            </p>
            <FormItem
                label="Source"
                invalid={errors.income_source && touched.income_source}
                errorMessage={errors.income_source}
            >
                <Field
                    name="income_source"
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
                label="Montant"
                invalid={errors.amount && touched.amount}
                errorMessage={errors.amount}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="amount"
                    placeholder=""
                    component={Input}
                />
            </FormItem>
        </AdaptableCard>
    )
}

export default BasicInformationFields
