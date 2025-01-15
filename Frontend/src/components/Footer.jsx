import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        <div className="relative -top-8">
            <img src={assets.forever} className='w-40' alt="" />
            <p className='w-full md:w-2/3 text-gray-400'>Forever is a fashion company that offers high-quality clothing and accessories for all ages and genders. Our mission is to provide stylish and affordable fashion to everyone.</p>
        </div>
        <div>
            <p className='text-xl font-light mb-5'>Shop</p>
            <ul className='text-gray-400 flex flex-col gap-1'>
               <li><Link to='/'>Home</Link></li>
               <li><Link to='/about'>About Us</Link></li>
               <li>Delivery</li>
               <li>Privacy policy</li>
            </ul>
        </div>
        <div>
            <p className='text-xl font-light mb-5'>Let's connect!</p>
            <ul className='text-gray-400 flex flex-col gap-1'>
                <li>+91-8971872487</li>
                <li>vanikalghatkar@gmail.com</li>
            </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>
        © 2025 FOEVER. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer
