import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { privateInstance } from '../api/api';


const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async(event) => {
        event.preventDefault();

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        if (!error) {
            const { id } = paymentMethod;
             privateInstance.get('create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ items: [{ id }] }),
            }).then((response)=>{stripe.redirectToCheckout({ sessionId: response.data.id })})
            
        }
    };

    return (
        <form className='pt-28' onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>
                Pay
            </button>
        </form>
    );
};

export default CheckoutForm;
