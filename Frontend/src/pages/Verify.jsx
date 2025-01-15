import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Verify = () => {
    const {navigate, token, setCartItems, backendURL} = useContext(ShopContext);
    
    //get params from url -useSearchParams
    const [searchParams, setSearchParams] = useSearchParams()
    const success = searchParams.get('success')
    const orderId = searchParams.get('orderId')

    const verifyPayment = async ()=>{
        try {
            if (!token) {
                return null;
            }
            const response = await axios.post(backendURL+"/api/orders/verify-stripe", {success, orderId}, {headers:{token}})
            if (response.data.success) {
                setCartItems({})
                navigate("/orders")
            } else {
                navigate('/cart')
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        verifyPayment()
    },[token])

  return (
    <div>
      verify
    </div>
  )
}

export default Verify
