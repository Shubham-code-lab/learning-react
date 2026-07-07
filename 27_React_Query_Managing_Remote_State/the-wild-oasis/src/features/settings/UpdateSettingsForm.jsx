import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useSettings } from './useSettings';
import { useUpdateSetting } from './useUpdateSetting';

function UpdateSettingsForm() {
  const { 
    isLoading,
    error, 
    settings: {
      minBookingLength, 
      maxBookingLength, 
      maxGuestPerBooking,
      breakfastPrice,
    } = {},   //IMPORTANT destructing settings might be undefined so it will have no properties setting empty object will make the child property exist and undefined
  } = useSettings();

  const {updateSetting, isUpdating} = useUpdateSetting();

  if(isLoading) return <Spinner />;

  //update on blur.
  function handleUpdate(e, field){
    const {value} = e.target;
    if(!value) return;
    updateSetting({[field]: value});
  }

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' id='min-nights' defaultValue={minBookingLength} onBlur={(e) => handleUpdate(e, 'minBookingLength')} />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights' defaultValue={maxBookingLength} onBlur={(e) => handleUpdate(e, 'maxBookingLength')} />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='max-guests' defaultValue={maxGuestPerBooking} onBlur={(e) => handleUpdate(e, 'maxGuestPerBooking')} />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price' defaultValue={breakfastPrice} onBlur={(e) => handleUpdate(e, 'breakfastPrice')} />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
