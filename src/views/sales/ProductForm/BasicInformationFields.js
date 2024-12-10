import React from 'react'
import { AdaptableCard } from 'components/shared'
import { Input, FormItem, Button, Checkbox } from 'components/ui'
import DatePicker from 'components/ui/DatePicker'
import { Field, FieldArray, getIn } from 'formik'
import { HiMinus } from 'react-icons/hi'
import AutocompleteInput from './AutocompleteInput'

export const categories = [
    { label: 'Casier', value: 'casier' },
    { label: 'Plastic', value: 'plastic' },
]

export const formats = [
    { label: 'Grand Format', value: 'grand format' },
    { label: 'Petit Format', value: 'petit format' },
]

const fieldFeedback = (form, name) => {
        const error = getIn(form.errors, name)
        const touch = getIn(form.touched, name)
        return {
            errorMessage: error || '',
            invalid: typeof touch === 'undefined' ? false : error && touch,
        }
    }

const BasicInformationFields = (props) => {
    const { touched, errors, products, suggestions, values,  } = props

    // console.log(suggestions);
    
    return (
        <AdaptableCard className="mb-4" divider>
            <h5>Nouvelle Facture </h5>
            <p className="mb-6">Section permettant d'jouter des facturess</p>
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
                label="Nom du Client"
                invalid={errors.clientName && touched.clientName}
                errorMessage={errors.clientName}
            >
                <Field
                    name="clientName"
                    component={AutocompleteInput}
                    placeholder="|"
                    suggestions={suggestions[1]?.map((i) => i.name)}
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

            <div className="grid grid-cols-2">
                <FormItem
                    invalid={
                        errors.inclure_ristourn && touched.inclure_ristourn
                    }
                    errorMessage={errors.inclure_ristourn}
                >
                    <Field name="inclure_ristourn" component={Checkbox}>
                        Inclure Ristourn
                    </Field>
                </FormItem>
                <FormItem
                    invalid={
                        errors.inclure_precompte && touched.inclure_precompte
                    }
                    errorMessage={errors.inclure_precompte}
                >
                    <Field name="inclure_precompte" component={Checkbox}>
                        Inclure Precompte
                    </Field>
                </FormItem>
            </div>

            <FieldArray name="products">
                {({ form, remove, push }) => (
                    <div>
                        {products && products.length > 0
                            ? products.map((_, index) => {
                                  const nameFeedBack = fieldFeedback(
                                      form,
                                      `products[${index}].name`
                                  )
                                  const quantityFeedBack = fieldFeedback(
                                      form,
                                      `products[${index}].quantity`
                                  )
                                  return (
                                      <div
                                          className="grid grid-cols-7 gap-2 items-center "
                                          key={index}
                                      >
                                          <div className="col-span-2">
                                              <FormItem
                                                  label="Produit"
                                                  invalid={nameFeedBack.invalid}
                                                  errorMessage={
                                                      nameFeedBack.errorMessage
                                                  }
                                              >
                                                  <Field
                                                      name={`products[${index}].name`}
                                                      component={
                                                          AutocompleteInput
                                                      }
                                                      placeholder="|"
                                                      suggestions={suggestions[0]?.map(
                                                          (i) => i.name
                                                      )}
                                                      //   onChange={}
                                                  />
                                              </FormItem>
                                          </div>
                                          <div className="col-span-2">
                                              <FormItem
                                                  label="Quantité"
                                                  invalid={
                                                      quantityFeedBack.invalid
                                                  }
                                                  errorMessage={
                                                      quantityFeedBack.errorMessage
                                                  }
                                              >
                                                  <Field
                                                      name={`products[${index}].quantity`}
                                                      invalid={
                                                          quantityFeedBack.invalid
                                                      }
                                                      type="text"
                                                      component={Input}
                                                      onChange={(e) => {
                                                          const quantity =
                                                              e.target.value
                                                          const clientCategory =
                                                              suggestions[1]?.find(
                                                                  (i) =>
                                                                      i.name ===
                                                                      values.clientName
                                                              ).category
                                                          //   console.log(
                                                          //       clientCategory
                                                          //   )
                                                          const cal_price =
                                                              suggestions[0]?.find(
                                                                  (i) =>
                                                                      i.name ===
                                                                      values
                                                                          .products[
                                                                          index
                                                                      ].name
                                                              ).sale_price[0][
                                                                  `${clientCategory}` 
                                                              ]
                                                              //To handle bug to set prices
                                                        const price = cal_price === "semi-grossiste" ? "Semi-grossiste" : cal_price
                                                          //   console.log(price)
                                                          const total =
                                                              quantity * price

                                                          //   const name =
                                                          //       e.target.value

                                                          form.setFieldValue(
                                                              `products[${index}].price`,
                                                              price
                                                          )

                                                          // Update quantity and total
                                                          form.setFieldValue(
                                                              `products[${index}].quantity`,
                                                              quantity
                                                          )
                                                          form.setFieldValue(
                                                              `products[${index}].total`,
                                                              total.toString()
                                                          )
                                                      }}
                                                      placeholder="Quantité"
                                                  />
                                              </FormItem>
                                          </div>
                                          <FormItem label="Prix TTC">
                                              <Field
                                                  name={`products[${index}].price`}
                                                  type="text"
                                                  component={Input}
                                                  placeholder=""
                                              />
                                          </FormItem>
                                          <FormItem label="Total">
                                              <Field
                                                  name={`products[${index}].total`}
                                                  type="text"
                                                  component={Input}
                                                  placeholder=""
                                              />
                                          </FormItem>
                                          <Button
                                              shape="circle"
                                              size="sm"
                                              icon={<HiMinus />}
                                              onClick={() => remove(index)}
                                          />
                                      </div>
                                  )
                              })
                            : null}
                        <div>
                            <Button
                                type="button"
                                className="ltr:mr-2 rtl:ml-2"
                                onClick={() => {
                                    push({
                                        name: '',
                                        quantity: 0,
                                        price: 0,
                                        total: 0,
                                    })
                                }}
                            >
                                Ajouter un produit
                            </Button>
                        </div>
                    </div>
                )}
            </FieldArray>
            <h6 className="py-5">Mode de Paiement </h6>

            <div className="grid grid-cols-2 gap-3">
                <FormItem
                    label="Montant Cash"
                    invalid={errors.cash && touched.cash}
                    errorMessage={errors.cash}
                >
                    <Field
                        type="text"
                        autoComplete="off"
                        name="cash"
                        placeholder="0"
                        component={Input}
                    />
                </FormItem>
                <FormItem
                    label="Montant Credit"
                    invalid={errors.credit && touched.credit}
                    errorMessage={errors.credit}
                >
                    <Field
                        type="text"
                        autoComplete="off"
                        name="credit"
                        placeholder="0"
                        component={Input}
                    />
                </FormItem>
                <FormItem
                    label="Montant Ristourn"
                    invalid={errors.ristourn && touched.ristourn}
                    errorMessage={errors.ristourn}
                >
                    <Field
                        type="text"
                        autoComplete="off"
                        name="ristourn"
                        placeholder="0"
                        component={Input}
                    />
                </FormItem>
                <FormItem
                    label="Montant Emballage"
                    invalid={errors.emballage && touched.emballage}
                    errorMessage={errors.emballage}
                >
                    <Field
                        type="text"
                        autoComplete="off"
                        name="emballages"
                        placeholder="0"
                        component={Input}
                    />
                </FormItem>
            </div>
        </AdaptableCard>
    )
}

export default BasicInformationFields
