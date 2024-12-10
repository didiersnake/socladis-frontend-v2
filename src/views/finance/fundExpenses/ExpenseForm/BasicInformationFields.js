import React from 'react'
import { AdaptableCard } from 'components/shared'
import { Input, FormItem, Select} from 'components/ui'
import DatePicker from 'components/ui/DatePicker'
import { Field } from 'formik'

export const categories = [
    { label: 'Versement en banque', value: 'Versement en banque' },
    { label: 'Carburant', value: 'Carburant' },
    { label: 'Depenses Courante', value: 'Depenses Courante' },
]

export const bank = [
    { label: 'Non attribué', value: 'non attribué' },
    { label: 'Afriland First Bank', value: 'Afriland First Bank' },
    { label: 'BGFI Bank', value: 'BGFI Bank' },
]


const BasicInformationFields = (props) => {
    const { touched, errors, values  } = props

    // console.log(suggestions);
    
    return (
        <AdaptableCard className="mb-4" divider>
            <h5> Depenses </h5>
            <p className="mb-6">
                Section permettant d'jouter des details sur les depenses
            </p>
            <FormItem
                label="Motif de depense"
                invalid={errors.modif && touched.modif}
                errorMessage={errors.modif}
            >
                <Field name="modif">
                    {({ field, form }) => (
                        <Select
                            field={field}
                            form={form}
                            options={categories}
                            value={categories.filter(
                                (category) => category.value === values.modif
                            )}
                            onChange={(option) =>
                                form.setFieldValue(field.name, option.value)
                            }
                        />
                    )}
                </Field>
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
            <FormItem
                label="Bank"
                invalid={errors.bank && touched.bank}
                errorMessage={errors.bank}
            >
                <Field name="bank">
                    {({ field, form }) => (
                        <Select
                            field={field}
                            form={form}
                            options={bank}
                            value={bank.filter(
                                (category) => category.value === values.bank
                            )}
                            onChange={(option) =>
                                form.setFieldValue(field.name, option.value)
                            }
                        />
                    )}
                </Field>
            </FormItem>
        </AdaptableCard>
    )
}

export default BasicInformationFields
