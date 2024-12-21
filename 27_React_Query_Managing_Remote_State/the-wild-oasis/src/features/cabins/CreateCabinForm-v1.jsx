import styled from 'styled-components';

import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';

import { useForm } from 'react-hook-form';
import {  useMutation, useQueryClient } from '@tanstack/react-query';
import { createCabin } from '../../services/apiCabins';
import toast from 'react-hot-toast';
import FormRow from '../../ui/FormRow';


function CreateCabinForm({ cabinToEdit, closeModal }) {
  const queryClient = useQueryClient();

  // no state variable or event handler function we have to create if we use useForm as it create for us
  const { register, handleSubmit, reset, getValues, formState } = useForm();

  // will contain all failed form validation  
  const { errors } = formState;
  console.log("errors", errors);


  const {mutate, isLoading: isCreating} = useMutation({
    mutationFn: createCabin,
    onSuccess: () => { //on successful mutation run the function
      toast.success("new cabin successful created")

      queryClient.invalidateQueries({  //invalidate the query make data in stale state so it can be re-fetched
        queryKey: ["cabins"],
      });

      reset();
    },
    //if API  fail react query will try to make call again and again for some time to updated the data
    onError: err => toast.error(err.message)   //error thrown by mutation function createCabin
  });


  function onSubmit(data) {
    console.log(data);
    mutate({
      ...data,
      image: data.image[0]
    });
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
          disabled={isCreating}
          {
            ...register("name", {
              required: "This field is required"
            })
          } />
      </FormRow>

      <FormRow label='Maximum capacity' error={errors?.maxCapacity?.message}>
        <Input type='number' id='maxCapacity' 
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
              required: "This field is required"
            })
          }
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset' onClick={() => closeModal?.()} >
          Cancel
        </Button>
        <Button disabled={isCreating}>
          Add cabin
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
