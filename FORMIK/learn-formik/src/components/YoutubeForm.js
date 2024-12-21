import React, {useState} from 'react';
import { Formik, Form, Field, FieldArray, ErrorMessage,
    FastField    //for more than 30 field and complex validation
 } from 'formik';
//IMPORTANT :- yup is used for object schema validation
import * as Yup from 'yup';
import TextError from './TextError';

const savedAPIValues  = {
    name: 'Shubham',
    email: 'shubham@email.com',
    channel: 'codevoltuion',
    comments: 'Welcome to Formik',
    address: '221b Backer street',
    social : {
        facebook : '',
        twitter: ''
    },
    phoneNumbers: ["", ""],
    phNumbers: [""]
};


const initialValues  = {
    name: 'Shubham',
    email: '',
    channel: '',
    comments: '',
    address: '',
    social : {
        facebook : '',
        twitter: ''
    },
    phoneNumbers: ["", ""],
    phNumbers: [""]
};

const onSubmit = (values, onSubmitProps) =>{
    console.log("form data", values);

    // After API call :-
    // settting submit button to false
    //setSubmitting, resetForm and other property are there
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
};

//IMPORTANT :- yup object containing rule for each form field
// Form level validation
const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email format').required('Required'),
    channel: Yup.string().required('Required'),
})

// Field level vaidation we get value as argument where we pass validateComments to validate props of Field component
// use case :- we can validate our field based on json data from API call
const validateComments = value => {
    let error
    if(!value){
        error = "Required"
    }
    return error;
}

function YoutubeForm() {
    const [formValues, setFormValues] = useState(null);


    //Formik component is replacement for useFormik() hook where we pass the argument as props 

    return (
        // errors object will be populated whenever our form validation runs, and it run on onChange, onBlur of the field  //onSubmit of the and form.  //check error object in "render props" pattern for phNumber
        //  validateOnBlur={false} and validateOnChange={false} props will stop validating field onChange and onBlur respectively of the field
        <Formik
            initialValues={formValues || initialValues}   //setting intial value from api or default usefull for edit mode
            enableReinitialize     //form can change initial values after form is intilalize once  //as we are initializing same from on button click with savedAPIValues
            onSubmit={onSubmit} 
            validationSchema={validationSchema} 
            //validateOnMount    //good for smaller form //populate the error object so submit button can be diabled does trigger error component of each field

            // validateOnChange={false} validateOnBlur={false}
            >
                {/* Manually triggering validation we have to pass render props to Formik */}
            {
                (formik)=>{
                    console.log("formik", formik);
                    return (
                        //  Form component is wrapper around HTML form element which handle onSubmit for us
                        // removed onSubmit={formik.handleSubmit}
                        <Form>
                            <div className='form-control'>
                                <label htmlFor='name'>Name</label>
                                {/* onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} */}
                                
                                {/* to make it DRY replaced with {...formik.getFieldProps('name')} */}
                                {/* <input type='text' id='name' name='name' {...formik.getFieldProps('name')} /> */}
                                
                                {/* hooks input to the parent Formik component and use name props to match with formik state and render input field */}
                                {/* it also hooks onChange, onBlur of form field */}
                                <Field type='text' id='name' name='name' placeholder="Youtube channel name" />

                                {/* { formik.touched.name && formik.errors.name ? <div className='error'>{formik.errors.name}</div> : null} */}
                                
                                {/* passing component prop way :- */}
                                {/* error message will be wrapped around div tag */}
                                <ErrorMessage name="name" component='div'/>
                                {/* error message will be wrapped around custom component we specify it will pass message as children props */}
                                <ErrorMessage name="name" component={TextError} />
                            </div>

                            <div className='form-control'>
                                <label htmlFor='email'>E-mail</label>
                                <Field type='email' id='email' name='email'  />
                                {/* render props pattern way */}
                                <ErrorMessage name="email">
                                    {
                                        (errorMsg)=>(
                                            <div className='error'>
                                                {errorMsg}
                                            </div>
                                        )
                                    }
                                </ErrorMessage>
                            </div>

                            <div className='form-control'>
                                <label htmlFor='channel'>Channel</label>
                                <Field type='text' id='channel' name='channel' />
                                <ErrorMessage name="channel" />
                            </div>

                            <div className='form-control'>
                                <label htmlFor='comments'>Comments</label>
                                {/* 'as' props used to render textarea input filed */}
                                {/* 'as' props default is input but also accept textarea, select or custom react component */}
                                {/* 'component' props behave same way but use 'as' props */}
                                {/* validate={validateComments} to add field level validation */}
                                <Field as='textarea' id='comments' name='comments' validate={validateComments}/>
                                <ErrorMessage name="comments" component={TextError} />
                            </div>

                            <div className='form-control'>
                                <label htmlFor='address'>Address</label>
                                {/* function as children to component */}
                                {/* Field component implementation with "render props" pattern */}
                                {/* <Field name="address"> */}

                                {/* IMPORTANT */}
                                {/* FastField is optimized version of Field component that internally implements component life-cycle hook to block additional render unless there is direct update on the field it self */}
                                {/* CAUTION :- only use it if it is independent */}
                                <FastField name="address">
                                    {
                                        (props) => {
                                            // this will get output multiple times as we type because change in form state cause call all the field in the form to re-render.
                                            console.log("render props", props);  //object containing :- field(all state), form(same what useForm() hook used to return, meta(perticular filed visited or not ,error)
                                            const {field, form, meta} = props;
                                            // hooking the element with formik
                                            // {...filed} will hook name, value, handleChange, handleBlur
                                        return (
                                                <div>
                                                    <input id='address' {...field} />
                                                    {meta.touched && meta.error ? <div>{meta.error}</div> : null}
                                                </div>
                                            )
                                        }
                                    }
                                </FastField>
                                {/* </Field> */}
                                <ErrorMessage name="comments" />
                            </div>

                            <div className='form-control'>
                                    <label htmlFor='facebook'>Facebook profile</label>
                                    {/* nested form object */}
                                    <Field type='text' id='facebook' name='social.facebook' />
                            </div>

                            <div className='form-control'>
                                    <label htmlFor='twitter'>Twitter profile</label>
                                    {/* nested form object */}
                                    <Field type='text' id='twitter' name='social.twitter' />
                            </div>

                            <div className='form-control'>
                                    <label htmlFor='primaryPh'>Primary phone number</label>
                                    {/* array in formik */}
                                    <Field type='text' id='primaryPh' name='phoneNumbers[0]' />
                            </div>

                            <div className='form-control'>
                                    <label htmlFor='secondaryPh'>Secondary phone number</label>
                                    {/* array in formik */}
                                    <Field type='text' id='secondaryPh' name='phoneNumbers[1]' />
                            </div>

                            <div className='form-control'>
                                <label>List of the phone numbers</label>
                                <FieldArray name="phNumbers">
                                    {
                                        (filedArrayProps) => {
                                            console.log("filedArrayProps",filedArrayProps);  //push, pop, remove, unshift, form 
                                            const {push, remove, form} = filedArrayProps;
                                            const {values} = form;
                                            const {phNumbers} = values;
                                            console.log("error", form.errors); //error object will be populated when validate run that we specify onChange,onBlur,etc.
                                            return (
                                                <div>
                                                    {
                                                        phNumbers.map((phNumber, index)=>{
                                                            console.log(phNumber);
                                                            return (
                                                            <div key={index}>
                                                                <Field name={`phNumbers[${index}]`} />
                                                                {/* remove value at index in phNumbers array */}
                                                                {index > 0 && (<button type="button" onClick={() => remove(index)}> - </button>)}
                                                                {/* push empty value in phNumbers array */}
                                                                <button type="button" onClick={()=> push(' ')}> + </button>
                                                            </div>
                                                        )})
                                                    }
                                                </div>
                                            )
                                        }
                                    }
                                </FieldArray>
                            </div>

                            {/* trigger field level validation */}
                            <button type="button" 
                                onClick={()=>formik.validateField('comments')}>
                                    Validate comments
                            </button>

                            {/* trigger Form level validation */}
                            <button type='button' onClick={()=>formik.validateForm()}>Validate all</button>

                            {/* set field touched */}
                            <button type="button" 
                                onClick={()=>formik.setFieldTouched('comments')}>
                                    set field comments
                            </button>

                            {/* set form touched */}
                            <button type="button" 
                                onClick={()=>formik.setTouched({
                                    name: true,
                                    email: true,
                                    channel: true,
                                    comments: true
                                })}
                            >
                                    set form comments
                            </button>

                            {/* intial error object is empty so we have to populate error object using 'validateOnMount' */}
                            {/* <button type='submit' disabled={!formik.isValid}>Submit</button> */}

                            {/* filed is dirty when any property is changed from it initial value */}
                            {/* only use below if you know the intial fill state of field is invalid other wise intial filled form dirty will be always false */}
                            {/* initial field "shubham(dirty=false)" -> "shubha"(dirty=true) -> "shubham(dirty=false)" */}
                            {/* <button type='submit' disabled={!(formik.dirty && formik.isValid)}>Submit</button> */}


                            {/* when we click submit button isSubmitting is set to true then if validation fail isSubmitting is set to false  */}
                            {/* also if data valid isSubmitting is set to false we have to manualy set it back to false in onSubmit method*/}
                            <button type='submit' disabled={!(formik.dirty && formik.isValid) || formik.isSubmitting}>Submit</button>

                            {/* update form with already existing data from api by using these prop on Formik component  initialValues={formValues || initialValues} ,enableReinitialize*/}
                            <button type='button' onClick={()=>setFormValues(savedAPIValues)}>Load saved button</button>

                            {/* two way */}
                            {/* to reset using HTML reset type on button */}
                            {/* other one is after submit in onSubmit method */}
                            <button type='reset'>Reset</button>
                        </Form>
                    )
                    
                }
            }

            
        </Formik>
    );
}

export default YoutubeForm;

//Disabling the submit button :-
//1] validating of the form state
//2] for submission in progress