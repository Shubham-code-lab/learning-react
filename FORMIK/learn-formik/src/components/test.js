import React from 'react';
import { Formik, Form, Field, FieldArray, useField, useFormikContext, getIn } from 'formik';
import * as Yup from 'yup';
import { useMemo } from 'react';
import { memo } from 'react';

const AddressField = ({ name, formikProps }) => {
  const form = useFormikContext();

  const [field1, field2, field3 ] = useField(name);
  console.log("AddressField", formikProps);
  const value = useMemo(()=>{
    return formikProps.values;
  },[formikProps])

//   const hasAddress = getIn(form.values, `${name}.hasaddress`);
    const hasAddress = getIn(field1.value, `hasaddress`);

    const handleCheckboxChange = (e) => {
        field3.setValue(
            {
                hasaddress: !hasAddress,
                multipleAddress: [
                  { localityName: 'test', nearPlace: 'test' },
                  { localityName: 'test', nearPlace: 'test' }
                ],
              }
        )
        // Set the `hasaddress` value and maintain `multipleAddress`
        // setFieldValue(`${name}.hasaddress`, e.target.checked);
        if (!e.target.checked) {
          // Optionally clear `multipleAddress` when unchecked
        //   setFieldValue(`${name}.multipleAddress`, []);
        }
      };

  return (
    <div>
      <label>
        Has Address:
        <input type="checkbox" 
            {...field1} checked={hasAddress} 
            onChange={handleCheckboxChange}

        />
      </label>

      {hasAddress && (
        <FieldArray name={`${name}.multipleAddress`}>
          {({form, remove, push }) => {
            console.log("AddressField  FieldArray",form);
            return (
              <>
                {field1.value.multipleAddress?.map((_, index) => (
                  <div key={index}>
                    <Field name={`${name}.multipleAddress[${index}].localityName`} placeholder="Locality Name" />
                    <Field name={`${name}.multipleAddress[${index}].nearPlace`} placeholder="Near Place" />
                    <button type="button" onClick={() => remove(index)}>Remove</button>
                  </div>
                ))}
                <button type="button" onClick={() => push({ localityName: '', nearPlace: '' })}>Add Address</button>
              </>
            )
          }}
        </FieldArray>
      )}
    </div>
  );
};

const LectureField = ({ name }) => {
  const { values } = useFormikContext();
  
  console.log("LectureField");
  return (
    <FieldArray name={name}>
      {({ remove, push }) => (
        <>
          {values.lecture?.map((_, index) => (
            <div key={index}>
              <Field name={`${name}[${index}].subject`} placeholder="Subject" />
              <Field name={`${name}[${index}].mark`} placeholder="Mark" type="number" />
              <button type="button" onClick={() => remove(index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={() => push({ subject: '', mark: 0 })}>Add Lecture</button>
        </>
      )}
    </FieldArray>
  );
};

const RenderTest = memo(({subjectArray}) => {
  console.log("subjectArray",subjectArray);
  return null;
})

const MyForm = () => {
  const initialValues = {
    name: 'test',
    address: {
      hasaddress: true,
      multipleAddress: [
        { localityName: 'test', nearPlace: 'test' },
        { localityName: 'test', nearPlace: 'test' }
      ],
    },
    lecture: [
      { subject: 'math', mark: 67 },
      { subject: 'science', mark: 56 }
    ]
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    address: Yup.object({
      hasaddress: Yup.boolean(),
      multipleAddress: Yup.array().of(
        Yup.object({
          localityName: Yup.string().required('Required'),
          nearPlace: Yup.string().required('Required'),
        })
      )
    }),
    lecture: Yup.array().of(
      Yup.object({
        subject: Yup.string().required('Required'),
        mark: Yup.number().min(0).max(100).required('Required'),
      })
    )
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize={true}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        console.log(values);
        setSubmitting(false);
        resetForm();
      }}
    >
      {formikProps => {

        console.log("formikProps");
        const subjectArray = formikProps.values.lecture.map((lecture)=>lecture.subject);

        return (
          <Form onSubmit={formikProps.handleSubmit}>
            <div>
              <label>Name:</label>
              <Field name="name" placeholder="Name" />
            </div>
  
            <AddressField name="address" formikProps={formikProps} />
  
            <LectureField name="lecture" />

            <RenderTest subjectArray={subjectArray} />
  
            <div>
              <button type="submit" disabled={!formikProps.isValid || formikProps.isSubmitting}>
                Submit
              </button>
              <button type="button" onClick={formikProps.resetForm} disabled={!formikProps.dirty}>
                Reset
              </button>
            </div>
          </Form>
        )
      }}
    </Formik>
  );
};

export default MyForm;
