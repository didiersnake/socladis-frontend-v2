import React from 'react'
import { Field, FieldArray, Form, Formik, getIn } from 'formik'
import { Input, Button, FormItem, FormContainer, Select } from 'components/ui'
import { HiMinus } from 'react-icons/hi'
import * as Yup from 'yup'

const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    members: Yup.array().of(
        Yup.object().shape({
            userName: Yup.object().required('Required'),
        })
    ),
})

const fieldFeedback = (form, name) => {
    const error = getIn(form.errors, name)
    const touch = getIn(form.touched, name)
    return {
        errorMessage: error || '',
        invalid: typeof touch === 'undefined' ? false : error && touch,
    }
}

export const GroupForm = ({onSubmit, employeeList, type}) => {
    return (
        <div>
            <Formik
                onSubmit={(values) => onSubmit(values) }
                validationSchema={validationSchema}
                initialValues={{
                    members: [
                        {
                            userName: '',
                        },
                    ],
                    name: '',
                }}
            >
                {({ touched, errors, values }) => {
                    const users = values.members
                    return (
                        <Form>
                            <FormContainer layout="inline">
                                <div>
                                    <div className="mb-10">
                                        <h5 className="mb-4">Nouveau Group</h5>
                                        <FormItem
                                            layout="vertical"
                                            label="Equipe"
                                            invalid={
                                                errors.name && touched.name
                                            }
                                            errorMessage={errors.name}
                                        >
                                            <Field
                                                placeholder="Nom "
                                                name="name"
                                                component={Input}
                                            />
                                        </FormItem>
                                    </div>
                                    <FieldArray name="members">
                                        {({ form, remove, push }) => (
                                            <div>
                                                {users && users.length > 0
                                                    ? users.map((_, index) => {
                                                          const nameFeedBack =
                                                              fieldFeedback(
                                                                  form,
                                                                  `members[${index}].userName`
                                                              )
                                                          return (
                                                              <div key={index}>
                                                                  <FormItem
                                                                      label="Nom"
                                                                      invalid={
                                                                          nameFeedBack.invalid
                                                                      }
                                                                      errorMessage={
                                                                          nameFeedBack.errorMessage
                                                                      }
                                                                  >
                                                                      {/* <Field
                                                                          invalid={
                                                                              nameFeedBack.invalid
                                                                          }
                                                                          placeholder="Nom du Membre"
                                                                          name={`members[${index}].userName`}
                                                                          type="text"
                                                                          component={
                                                                              Input
                                                                          }
                                                                      /> */}
                                                                      <Field
                                                                          name={`members[${index}].userName`}
                                                                          invalid={
                                                                              nameFeedBack.invalid
                                                                          }
                                                                      >
                                                                          {({
                                                                              field,
                                                                              form,
                                                                          }) => (
                                                                              <Select
                                                                                  field={
                                                                                      field
                                                                                  }
                                                                                  placeholder={
                                                                                      'Selectionez le nom...'
                                                                                  }
                                                                                  form={
                                                                                      form
                                                                                  }
                                                                                  options={
                                                                                      employeeList
                                                                                  }
                                                                                  value={
                                                                                      employeeList?.filter(
                                                                                          (
                                                                                              role
                                                                                          ) =>
                                                                                              role.value ===
                                                                                              values
                                                                                                  ?.members[
                                                                                                  index
                                                                                              ]
                                                                                                  .userName
                                                                                      ) ||
                                                                                      ''
                                                                                  }
                                                                                  onChange={(
                                                                                      option
                                                                                  ) =>
                                                                                      form.setFieldValue(
                                                                                          field.name,
                                                                                          option.value
                                                                                      )
                                                                                  }
                                                                              />
                                                                          )}
                                                                      </Field>
                                                                  </FormItem>
                                                                  <Button
                                                                      shape="circle"
                                                                      size="sm"
                                                                      icon={
                                                                          <HiMinus />
                                                                      }
                                                                      onClick={() =>
                                                                          remove(
                                                                              index
                                                                          )
                                                                      }
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
                                                            })
                                                        }}
                                                    >
                                                        Add a User
                                                    </Button>
                                                    <Button
                                                        type="submit"
                                                        variant="solid"
                                                    >
                                                        Sauvegarder
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </FieldArray>
                                </div>
                            </FormContainer>
                        </Form>
                    )
                }}
            </Formik>
        </div>
    )
}

GroupForm.defaultProps = {
    type: 'edit',
    initialData: {
        name: '',
        members: []
    },
}

