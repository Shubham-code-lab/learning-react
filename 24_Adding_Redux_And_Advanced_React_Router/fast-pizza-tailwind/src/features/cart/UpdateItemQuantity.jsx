import React from 'react';
import Button from '../../ui/Button';
import { useDispatch } from 'react-redux';
import { increaseItemQuantity, decreaseItemQuantity } from './cartSlices';

export default function UpdateItemQuantity({ pizzaId, currentQuantity }) {
    const dispatch = useDispatch();
  return (
    <div>
        <Button type="round" onClick={()=>dispatch(increaseItemQuantity(pizzaId))}>+</Button>
        <span>{currentQuantity}</span>
        <Button type="round" onClick={()=>dispatch(decreaseItemQuantity(pizzaId))}>-</Button>
    </div>
  )
}
