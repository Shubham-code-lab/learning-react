import React from 'react';
import { useFormik } from 'formik';

const initialValues  = {     
    name: 'Shubham',
    email: '',
    channel: '',
};

const onSubmit = (values) =>{
    console.log("form data", values);
};


// validate function recieve values as function argument
const validate = (values) => {
    //1] return object (errors)
    //2] keys of errors object must have same as values object
    //3] string values should be error message for each field
    let errors = {};
    if(!values.name){
        errors.name = "Required";
    }

    if(!values.email){
        errors.email = "Required";
    }
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email format'
    }
    
    if(!values.channel){
        errors.channel = "Required";
    }

    return errors;
};


function YoutubeForm() {
    //formik object contain porperties and method to manage form
    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    });

    console.log("form value", formik.values);   //initial value will also printed
    console.log("form value", formik.errors); 
    console.log("form value", formik.touched);  //onBlur={formik.handleBlur}

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className='form-control'>
                    <label htmlFor='name'>Name</label>
                    {/* By adding onchange and value props formik will start tracking the filed for us */}
                    <input type='text' id='name' name='name' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
                    { formik.touched.name && formik.errors.name ? <div className='error'>{formik.errors.name}</div> : null}
                </div>

                <div className='form-control'>
                    <label htmlFor='email'>E-mail</label>
                    <input type='email' id='email' name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
                    { formik.touched.email && formik.errors.email ? <div className='error'>{formik.errors.email}</div> : null}
                </div>

                <div className='form-control'>
                    <label htmlFor='channel'>Channel</label>
                    <input type='text' id='channel' name='channel' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.channel} />
                    { formik.touched.channel && formik.errors.channel ? <div className='error'>{formik.errors.channel}</div> : null}
                </div>

                <button type='submit'>Submit</button>
            </form>
        </div>
    );
}

export default YoutubeForm;
