import { useForm, useFieldArray, FieldErrors } from "react-hook-form";
import { useEffect } from "react";
import {DevTool} from '@hookform/devtools';

type FormValues = {
  username: string,
  email: string,
  channel: string,
  social: {
    twitter: string,
    facebook: string
  },
  phoneNumbers: string[],
  phNumbers: {   //useField only work with array of object 
    number: string;
  }[],
  age: number;
  dob: Date;
}
  
  let renderCount = 0;

  export const YouTubeForm = () => {



    const form = useForm<FormValues>({
      // defaultValues: {    //if we add default value we can ommit "FormValues" type as RFH can tell it from default value
      //   username: "batman",
      //   email: "",
      //   channel: ""
      // }
      //OR load data from the API
      defaultValues: async ()=>{
        const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
        const data = await response.json();
        return {
          username: "Batman",
          email: data.email,
          channel: "",
          social: {
            twitter: "",
            facebook: ""
          },
          phoneNumbers: ["", ""],
          phNumbers: [{number:""}],
          age: 0,
          dob: new Date()
        }
      },
      // mode: "onSubmit"  //default
      // mode: "onBlur", 
      // mode: "onChange"  //multiple re-render performance issue
      // mode: "onTouched"  //execute for first blur and then every input event("onChange") it execute
      // mode: "all"  //check on onBlur and onChange event
    });

    const {register, control, handleSubmit, formState, watch, getValues, setValue, 
      reset, //set form value to default value
      trigger
    } = form;
    // const {name, ref, onChange, onBlur} = register("username");

    const {errors, touchedFields, dirtyFields, isDirty, isValid, 
      isSubmitting, //true when form is submitting then it become false
      isSubmitted,   //true if form has submitted become false again when we reset form
      isSubmitSuccessful, //successfull submitted without any run time errors (validation error will make it false).
      submitCount  //number of time form is submitted
    } = formState;

    console.log({touchedFields, dirtyFields, isDirty, isValid});
    console.log({isSubmitting, isSubmitted, isSubmitSuccessful, submitCount});

    const {fields, append, remove} = useFieldArray({  //return array of field
      name: 'phNumbers',
      control
    })

    // re-redner when watched value changes
    // const watchUsername = watch("username"); //render when username changes
    // const watch = watch();  //rerender when any value changes
    const watchUsername = watch(["username", "email"]);  //render when username or email

    

    function onSubmit(data:FormValues){
      console.log("form data", data);
    }

    function onError(errors: FieldErrors<FormValues>){ //called when valdiation is failed //usefull for showing custom error 
      console.log("Form errors", errors);
    }

    const handleGetValues = () => {
      //  console.log("Get values", getValues());   //give all values
      //  console.log("Get values", getValues("social.facebook")); //gives only scoial facebook values
       console.log("Get values", getValues(["social.facebook", "channel"])); //gives only scoial facebook and channel give in array
    }

    const handleSetValues = () => {
      setValue("username", "",
         //dirty and touch are unaffected so we have to pass another config object.
        {
          shouldValidate: true,
          shouldDirty: true,
          shouldTouch: true
        }
      ); 
    }

    useEffect(()=>{
      const watchSub$ = watch((value)=>{  //if we want to perform side effect when we are watching value change 
        console.log(value);
      })
      return watchSub$.unsubscribe();    //un-subscribe to 
    },[watch])

    useEffect(()=>{
      if(isSubmitSuccessful){
        reset();  //don't call in onSubmit
      }
    },[isSubmitSuccessful, reset])

    renderCount++;

    return (
      <div>
        <h1>re-render {renderCount/2}</h1>
        <h2>Watched value: {watchUsername}</h2>
        {/* react form follow uncontroll input behaviour it doesn't re-render the component when when the value of any field changed */}
        {/* "noValidate" will prevent browser validation  so react-hook-form will validate*/}
        {/* valdiation by default only accour while form submition we can change it by using validation mode */}
        <form onSubmit={handleSubmit(onSubmit, onError)} noValidate>
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" 
              //   name={name} ref={ref} onChange={onChange} onBlur={onBlur} 
              //OR directly spread the regiester
              {...register("username", 
                // {required: "User name is required"}
                //OR
                {
                  required:{
                    value: true,
                    message: "Username is required"
                  }
                }
              )}
            />
            <p className="error">{errors.username?.message}</p>
          </div>
  
          <div className="form-control">
            <label htmlFor="email">E-mail</label>
            <input type="email" id="email"
              {...register("email", {
                pattern: {
                  value:   //pattern to match otherwise show message
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: "Invalid email format",
                },
                maxLength:{
                  value: 10,
                  message: "Too many character"
                },
                // validate: (filedValue)=>{  //custom vaidation rule
                //   return filedValue !== "admin@gmail.com" || "Enter a different email address"
                // }
                //OR for multiple custom validation rule
                validate: {
                  notAdmin: (fieldValue)=>{
                    return (
                      fieldValue !== "admin@gamil.com" || "Enter a different email address"
                    )
                  },
                  notBlackListed: (fieldValue)=>{
                    return !fieldValue.endsWith("baddomain.com") || "This domain is not supported"
                  },
                  emailAvailable: async (fieldValue) => {  //if other are invalid async validation is always done last so if one condition tell it is invalid this doesn't execute
                    const response = await fetch(`https://jsonplaceholder.typicode.com/users?email=${fieldValue}`);
                    const data = await response.json();
                    return data.length == 0 || "Email already exists";
                  }
                }
              })}
            />
            <p className="error">{errors.email?.message}</p>
          </div>

          <div className="form-control">
            <label htmlFor="channel">Channel</label>
            <input type="text" id="channel"
              {...register("channel", {required: "Channel name is required"})}
            />
            <p className="error">{errors.channel?.message}</p>
          </div>

          <div className="form-control">
            <label htmlFor="twitter">Twitter</label>
            <input type="text" id="twitter"
              {...register("social.twitter",  {
                required: "Twitter is required", 
                disabled: watch("channel") === ""        //to disbale the field  //when disabled the value is undefined and validation is disabled
              })}
            />
            <p className="error">{errors.social?.twitter?.message}</p>
          </div>

          <div className="form-control">
            <label htmlFor="facebook">Facebook</label>
            <input type="text" id="facebook"
              {...register("social.facebook",  {required: "Facebook is required"})}
            />
            <p className="error">{errors.social?.facebook?.message}</p>
          </div>

          <div className="form-control">
            <label htmlFor="primary-phone">Primary phone</label>
            <input type="text" id="primary-phone"
              {...register("phoneNumbers.0",  {required: "Primary phone is required"})}
            />
          </div>

          <div className="form-control">
            <label htmlFor="secondary-phone">Secondary phone</label>
            <input type="text" id="secondary-phone"
              {...register("phoneNumbers.1",  {required: "Secondary phone is required"})}
            />
          </div>


          <div>
            <label>list of phone number</label>
            <div>
                {fields.map((field, index)=>{   //using field.id not index for consitency
                  return (<div className="form-control" key={field.id}>
                    <input type="text" {...register(`phNumbers.${index}.number` as const)} />
                    {index > 0  && (
                      <button type="button" onClick={()=>remove(index)}>Remove at index</button>
                    )}
                  </div>)
                })}
                <button type="button" onClick={()=>append({number: ""})}>Add at index</button>
                
            </div>
          </div>

          <div className="form-control">
            <label htmlFor="age">Age</label>
            <input type="number" id="age"
              {...register("age", {
                valueAsNumber: true, //otherwise you will get number in string format "25"
                required: "age  is required"})}
            />
            <p className="error">{errors.age?.message}</p>
          </div>

          <div className="form-control">
            <label htmlFor="dob">Date of birth</label>
            <input type="date" id="dob"
              {...register("dob", {
                valueAsDate: true, //otherwise it will store it in string format
                required: "date of brith is required"
              })}
            />
            <p className="error">{errors.dob?.message}</p>
          </div>

          {/* dsiabled button when form is dirty or invalid */}
          <button disabled={!isDirty || !isValid || !isSubmitting}>Submit</button>
          <button>Submit No disabled</button>
          <button type="button" onClick={()=>reset()}>Reset</button>
          <button type="button" onClick={handleGetValues}>Get Values</button>
          <button type="button" onClick={handleSetValues}>Set Values</button>
          <button type="button" onClick={()=>trigger()}>manual trigger Validation</button>
          <button type="button" onClick={()=>trigger("channel")}>manual trigger channel Validation</button>
        </form>
        {/* control prop is sent to assosiate the form with the devtools */}
        <DevTool control={control} />
      </div>
    );
  };
  