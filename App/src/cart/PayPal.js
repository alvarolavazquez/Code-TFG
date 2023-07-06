import React, { useRef, useEffect } from "react";
import cart from './cart-helper.js'
import {Redirect} from 'react-router-dom'
import {create} from '../order/api-order.js'
import auth from '../auth/auth-helper'
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button'
import swal from 'sweetalert'

export default function Paypal(props) {
  const checkoutDetails=props.checkoutDetails;
  const paypal = useRef(props.checkoutDetails);
  let history = useHistory();
  let userId = '';
  const {from} = {
    from: {
      pathname: '/Order'
    }
  }
  const placeOrder = (checkoutDetails) => { 
    const jwt = auth.isAuthenticated()
    create({userId:jwt.user._id}, {
      t: jwt.token
    }, checkoutDetails).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        userId=data.user
        cart.emptyCart(()=> {
        })
        history.push('/MyOrders/'+userId)
      }
    })  
  }
  useEffect(() => {
    
    window.paypal
        .Buttons({
          createOrder: (data, actions, err) => {
              if(checkoutDetails.URLCount>0 && (checkoutDetails.customer_name!='') && (checkoutDetails.customer_email!='') && (checkoutDetails.street!='') && (checkoutDetails.city!='') && (checkoutDetails.country!='') && (checkoutDetails.zipcode!='') || (checkoutDetails.URLCount==0) && (checkoutDetails.customer_name!='') && (checkoutDetails.customer_email!='')){ 
                return actions.order.create({
                  intent: "CAPTURE",
                  purchase_units: [
                    {
                      description: "Cool",
                      amount: {
                        currency: "ES",
                        value: cart.getCartTotal(),
                      },
                    },
                  ],
                });
              }
              else{
                swal ({
                  title: "No se puede completar comprar",
                  text: 'Por favor, revise que no falten campos por rellenar.',
                  icon: "error",
                  button: "Ok",
                })
              }
          },
          onApprove: async (data, actions) => {
            return actions.order.capture().then(function(details) {
              if(data.orderID!=null){
                checkoutDetails.payment_id=data.orderID;
                placeOrder(checkoutDetails);
              }
          });
          },
          onError: (err) => {
            console.log(err);
          }
        })
        .render(paypal.current);
    }, []);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
    //<Button variant="raised" color="secondary" component="span" onClick={placeOrder(checkoutDetails)}/>
  );
}
