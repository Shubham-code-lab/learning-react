import React from 'react';
import { Formik, Form, Field, FieldArray, getIn, withFormik } from 'formik';
import * as Yup from 'yup';

const AddressField = ({ values, handleChange, setFieldValue }) => {
  console.log("AddressField");
  const hasAddress = getIn(values, 'address.hasaddress');

  const handleCheckboxChange = (e) => {
    setFieldValue('address', {
      hasaddress: !hasAddress,
      multipleAddress: hasAddress
        ? []
        : [
            { localityName: 'test', nearPlace: 'test' },
            { localityName: 'test', nearPlace: 'test' }
          ],
    });
  };

  return (
    <div>
      <label>
        Has Address:
        <input
          type="checkbox"
          name="address.hasaddress"
          checked={hasAddress}
          onChange={handleCheckboxChange}
        />
      </label>

      {hasAddress && (
        <FieldArray name="address.multipleAddress">
          {({ remove, push }) => (
            <>
              {values.address.multipleAddress.map((_, index) => (
                <div key={index}>
                  <Field
                    name={`address.multipleAddress[${index}].localityName`}
                    placeholder="Locality Name"
                    onChange={handleChange}
                  />
                  <Field
                    name={`address.multipleAddress[${index}].nearPlace`}
                    placeholder="Near Place"
                    onChange={handleChange}
                  />
                  <button type="button" onClick={() => remove(index)}>Remove</button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => push({ localityName: '', nearPlace: '' })}
              >
                Add Address
              </button>
            </>
          )}
        </FieldArray>
      )}
    </div>
  );
};

const LectureField = ({ values, handleChange }) => {
  console.log("LectureField");
  return (
    <FieldArray name="lecture">
      {({ remove, push }) => (
        <>
          {values.lecture.map((_, index) => (
            <div key={index}>
              <Field
                name={`lecture[${index}].subject`}
                placeholder="Subject"
                onChange={handleChange}
              />
              <Field
                name={`lecture[${index}].mark`}
                placeholder="Mark"
                type="number"
                onChange={handleChange}
              />
              <button type="button" onClick={() => remove(index)}>Remove</button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => push({ subject: '', mark: 0 })}
          >
            Add Lecture
          </button>
        </>
      )}
    </FieldArray>
  );
};

const MyForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  handleSubmit,
  setFieldValue,
  resetForm,
  isValid,
  isSubmitting,
  dirty,
}) => {
  console.log("MyForm", MyForm)
  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <Field
          name="name"
          placeholder="Name"
          onChange={handleChange}
          onBlur={handleBlur}
          value={values.name}
        />
      </div>

      <AddressField
        values={values}
        handleChange={handleChange}
        setFieldValue={setFieldValue}
      />

      <LectureField values={values} handleChange={handleChange} />

      <div>
        <button type="submit" disabled={!isValid || isSubmitting}>
          Submit
        </button>
        <button type="button" onClick={resetForm} disabled={!dirty}>
          Reset
        </button>
      </div>
    </Form>
  );
};

const EnhancedForm = withFormik({
  mapPropsToValues: () => ({
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
    ],
  }),

  validationSchema: Yup.object({
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
  }),

  handleSubmit: (values, { setSubmitting, resetForm }) => {
    console.log(values);
    setSubmitting(false);
    resetForm();
  },

  validateOnChange: false,
  validateOnBlur: false,
  enableReinitialize: true,
})(MyForm);

export default EnhancedForm;
