// import { useState } from "react";

import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";

// // https://uibakery.io/regex-library/phone-number
// const isValidPhone = (str) =>
//   /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
//     str
//   );

const fakeCart = [
  {
    pizzaId: 12,
    name: "Mediterranean",
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: "Vegetale",
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: "Spinach and Mushroom",
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function CreateOrder() {
  // const [withPriority, setWithPriority] = useState(false);
  const cart = fakeCart;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  //useActionData is used to get the data from the action function
  const formErrors = useActionData();

  return (
    <div>
      <h2>Ready to order? Let go!</h2>

      {/* Form from react router dom */}
      {/* work for PATCH, POST, PUT, DELETE */}
      {/* action not needed default react router match the closest route */}
      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        <div>
          <label>First Name</label>
          <input type="text" name="customer" required />
        </div>

        <div>
          <label>Phone number</label>
          <div>
            <input type="tel" name="phone" required />
          </div>
          {formErrors?.phone && <p className="error">{formErrors.phone}</p>}
        </div>

        <div>
          <label>Address</label>
          <div>
            <input type="text" name="address" required />
          </div>
        </div>

        <div>
          <input
            type="checkbox"
            name="priority"
            id="priority"
            // value={withPriority}
            // onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          {/* convert cart object to string uinsg json stringify */}
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <button disabled={isSubmitting}>{isSubmitting ? "Placing order..." : "Order now"}</button>
        </div>
      </Form>
    </div>
  );
}

const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

//form submit request from createOrder component will be intercepted by action function.
export async function action({request}){
  const formData = await request.formData(); //formData provided by web-browser
  const data = Object.fromEntries(formData);
  console.log(data);

  const orderRequest = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "on",
  };

  const errors = {};
  if(!isValidPhone(data.phone)) 
    errors.phone = "please give us the correct phone number. we might need it to contact you";
  // if there are any errors, return them which we can access by useActionData hook.
  if(Object.keys(errors).length > 0) return errors;

  const orderResponse = await createOrder(orderRequest);

  console.log("orderResponse", orderResponse);
  //'redirect' return response to react router to redirect to order page
  return redirect(`/order/${orderResponse.id}`);
}
//how to invalidate cart order in react router without navigation ?

export default CreateOrder;
