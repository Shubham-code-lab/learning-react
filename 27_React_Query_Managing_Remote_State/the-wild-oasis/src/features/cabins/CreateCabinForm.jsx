import styled from 'styled-components';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';


import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';
import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin';


function CreateCabinForm({ cabinToEdit = {}, closeModal }) {
  const {id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);


  // no state variable or event handler function we have to create if we use useForm as it create for us
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {}     //initiate the form with value for edit mode
  });

  // will contain all failed form validation  
  const { errors } = formState;
  console.log("errors", errors);

  const {createCabin, isCreating } = useCreateCabin();

  const {editCabin, isEditing } = useEditCabin();

  const isWorking = isCreating || isEditing;


  function onSubmit(data) {
    console.log(data);

    // fileType or string
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if(isEditSession) {
      editCabin({
        newCabinData: {
          ...data,
          image
        },
        id: editId
      },
      {
        onSuccess: (data) => {
          console.log(data);  //we also get response data from function that make API call if it return anything
          reset();
        }
      })
    }
    else{ 
      createCabin({
        ...data,
        image
      },
      {
        //IMPORTANT  :- 
        //As reset() is coming from react-hook-form we can use it in custom hook which is in other file 
        //So react query allow to pass object of options as second argument
        onSuccess: (data) => {
          console.log(data);  //we also get response data from function that make API call if it return anything
          reset();
        }
      });
    }
  }

  function onError(error){
    console.log(error);
  }


  return (
    // we get event handler function which is generated when we use handleSubmit of useForm and pass our own onSubmit which will get called with the data we register
    // if error occur in validation then call the second argument function
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        {/* onBlur and onChange function will be come with this register */}
        {/* Input passed as child prop to FormRow component */}
        <Input type='text' id='name' 
          disabled={isWorking}
          {
            ...register("name", {
              required: "This field is required"
            })
          } />
      </FormRow>

      <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
        <Input type='number' id='maxCapacity' 
          disabled={isWorking}
          {
            ...register("maxCapacity", {
              required: "This field is required",
              min: {
                value: 1,
                message: "Capacity should be at least 1"
              }
            })
          }  />
      </FormRow>

      <FormRow label='Regular price' error={errors?.regularPrice?.message}>
        <Input type='number' id='regularPrice' 
          disabled={isWorking}
          {
          ...register("regularPrice",{
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1"
            }
          })
        }  />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input type='number' id='discount' defaultValue={0} 
          disabled={isWorking}
          {
            ...register("discount", {
              required: "This field is required",
              // IMPORTANT
              // custom validator
              //getValues return object using which we can access other values
              validate: (value) => value <= getValues().regularPrice || "Discount should be less than regular price "
            })
          }  />
      </FormRow>

      <FormRow label='Description for website' error={errors?.description?.message}>
        <Textarea type='number' id='description' 
          disabled={isWorking}
          {
            ...register("description", {
              required: "This field is required"
            })
          } />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput id='image' accept='image/*' type="file"
          {
            ...register("image", {
              // in edit mode upload image will not have validation as we don't want to upload anything
              required: isEditSession ? false : "This field is required"
            })
          }
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset' onClick={() => closeModal?.()} >
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
