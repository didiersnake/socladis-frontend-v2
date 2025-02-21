import React, { useEffect, useState } from 'react'
import { AdaptableCard } from 'components/shared'
import { Input, FormItem, Select } from 'components/ui'
import { Field } from 'formik'
import { useSelector } from 'react-redux'
import appConfig from 'configs/app.config'

export const categories = [
    { label: 'Grossiste', value: 'grossiste' },
    { label: 'Semi Grossiste', value: 'semi-grossiste' },
    { label: 'Detaillant', value: 'detaillant' },
    { label: 'Random', value: 'random' },

    { label: 'Magasinier', value: 'stock' },
    { label: 'Caissier', value: 'ventes' },
    { label: 'Commercial', value: 'commercial' },
]

export const roles = [
    { label: 'EMPLOYEE', value: appConfig.authenticatedUserRoles[1] },
    { label: 'CLIENT', value: appConfig.authenticatedUserRoles[2] },
    { label: 'ADMINISTRATEUR', value: appConfig.authenticatedUserRoles[0] },
]

export const tax = [
    { label: 'Non attribué', value: 'non attribué' },
    { label: 'Réel', value: 'réel' },
    { label: 'Simplifié', value: 'simplifié' },
    { label: 'liberatoir', value: 'liberatoir' },
    { label: 'Random', value: 'random' },
    { label: 'Réel CGA', value: 'réel CGA' },
    { label: 'Simplifié CGA', value: 'simplifié CGA' },
    { label: 'liberatoir CGA', value: 'liberatoir CGA' },
]

const BasicInformationFields = (props) => {
    const { touched, errors, values, editing } = props
    const groups = useSelector((state) => state.salesProductList.data.groups)
    const [groupItem, setGroupItems] = useState([
        { label: 'Non Attribué', value: 'Non Attribué' },
    ])
   
    
    useEffect(()=>{
         const grouopSelectItems = groups?.map((i) => {
             return {
                 label: i.name,
                 value: i.name,
             }
         })
         setGroupItems(()=> {return [...groupItem, ...grouopSelectItems]})
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <AdaptableCard className="mb-4" divider>
            <h5>Information Utilisateur</h5>
            <p className="mb-6">
                Section permettant de configurer les informations de base d'un
                Utilisateurs
            </p>
            <FormItem
                label="Nom"
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
                label="Telephone"
                invalid={errors.phone && touched.phone}
                errorMessage={errors.phone}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="phone"
                    placeholder="Tel"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Role"
                invalid={errors.roles && touched.roles}
                errorMessage={errors.roles}
            >
                <Field name="roles">
                    {({ field, form }) => (
                        <Select
                            field={field}
                            form={form}
                            options={roles}
                            value={roles.filter(
                                (role) => role.value === values.roles
                            )}
                            onChange={(option) =>
                                form.setFieldValue(field.name, option.value)
                            }
                        />
                    )}
                </Field>
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
                label="Regime Fiscal"
                invalid={errors.tax_system && touched.tax_system}
                errorMessage={errors.tax_system}
            >
                <Field name="tax_system">
                    {({ field, form }) => (
                        <Select
                            field={field}
                            form={form}
                            options={tax}
                            value={tax.filter(
                                (tax) => tax.value === values.tax_system
                            )}
                            onChange={(option) =>
                                form.setFieldValue(field.name, option.value)
                            }
                        />
                    )}
                </Field>
            </FormItem>
            <FormItem
                label="Group"
                invalid={errors.group && touched.group}
                errorMessage={errors.group}
            >
                <Field name="group">
                    {({ field, form }) => (
                        <Select
                            field={field}
                            form={form}
                            options={groupItem}
                            value={groupItem?.filter(
                                (category) => category.value === values.group
                            )}
                            onChange={(option) =>
                                form.setFieldValue(field.name, option.value)
                            }
                        />
                    )}
                </Field>
            </FormItem>
            <FormItem
                label="Identifiant Unique"
                invalid={errors.uniqueCode && touched.uniqueCode}
                errorMessage={errors.uniqueCode}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="uniqueCode"
                    placeholder="NIU"
                    component={Input}
                />
            </FormItem>
            <FormItem
                label="Localisation"
                invalid={errors.location && touched.location}
                errorMessage={errors.location}
            >
                <Field
                    type="text"
                    autoComplete="off"
                    name="location"
                    placeholder="localisation"
                    component={Input}
                />
            </FormItem>
            {!editing && (
                <FormItem
                    label="Mot de passe(Employee)"
                    invalid={errors.password && touched.password}
                    errorMessage={errors.password}
                >
                    <Field
                        type="text"
                        autoComplete="off"
                        name="password"
                        placeholder="6 caractères minimum"
                        component={Input}
                    />
                </FormItem>
            )}
        </AdaptableCard>
    )
}

export default BasicInformationFields
