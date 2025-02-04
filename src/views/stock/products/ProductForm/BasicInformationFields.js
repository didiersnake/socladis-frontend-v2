import React from 'react'
import { AdaptableCard } from 'components/shared'
import { Input, FormItem, Select } from 'components/ui'
import { Field } from 'formik'
import NumberFormat from 'react-number-format'

export const categories = [
    { label: 'Casier', value: 'Casier' },
    { label: 'Plastic', value: 'Plastic' },
]

export const formats = [
    { label: 'Grand Format', value: 'Grand format' },
    { label: 'Petit Format', value: 'Petit format' },
]

const PriceInput = (props) => {
    return <Input {...props} value={props.field.value} />
}
const NumberFormatInput = ({ onValueChange, ...rest }) => {
    return (
        <NumberFormat
            customInput={Input}
            type="text"
            onValueChange={onValueChange}
            autoComplete="off"
            {...rest}
        />
    )
}

const BasicInformationFields = (props) => {
    const { touched, errors, values } = props

    return (
        <AdaptableCard className="mb-4" divider>
            <h5>Information Produit</h5>
            <p className="mb-6">
                Section permettant de configurer les informations de base du
                produit
            </p>
            <FormItem
                label="Nom du Produit"
                invalid={errors.name && touched.name}
                errorMessage={errors.name}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="name"
                    placeholder="Name"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Category"
                invalid={errors.category && touched.category}
                errorMessage={errors.category}
            >
                <Field name="category">
                    {({ field, form }) => (
                        <Select
                            field={field}
                            form={form}
                            options={categories}
                            value={categories.filter(
                                (category) => category.value === values.category
                            )}
                            onChange={(option) =>
                                form.setFieldValue(field.name, option.value)
                            }
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
                            options={formats}
                            value={formats.filter(
                                (format) => format.value === values.format
                            )}
                            onChange={(option) =>
                                form.setFieldValue(field.name, option.value)
                            }
                        />
                    )}
                </Field>
            </FormItem>
            <FormItem
                label="Seuil de Stock"
                invalid={errors.unitPrice && touched.unitPrice}
                errorMessage={errors.unitPrice}
            >
                <Field name="unitPrice">
                    {({ field, form }) => {
                        return (
                            <NumberFormatInput
                                form={form}
                                field={field}
                                placeholder="0"
                                customInput={PriceInput}
                                onValueChange={(e) => {
                                    form.setFieldValue(field.name, e.value)
                                }}
                            />
                        )
                    }}
                </Field>
            </FormItem>
            <FormItem
                label="Prix Grossiste"
                invalid={errors.grossiste && touched.grossiste}
                errorMessage={errors.grossiste}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="grossiste"
                    placeholder="0"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Prix Semi Grossiste"
                invalid={errors.Semi_grossiste && touched.Semi_grossiste}
                errorMessage={errors.Semi_grossiste}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="Semi_grossiste"
                    placeholder="0"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Prix Detaillant"
                invalid={errors.detaillant && touched.detaillant}
                errorMessage={errors.detaillant}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="detaillant"
                    placeholder="0"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Prix Random"
                invalid={errors.random && touched.random}
                errorMessage={errors.random}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="random"
                    placeholder="0"
                    component={Input}
                />
            </FormItem>
        </AdaptableCard>
    )
}

export default BasicInformationFields
