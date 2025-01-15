import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { NavLink, Link } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const {setShowSearch, getCartCount, navigate, token,setToken, setCartItems} = useContext(ShopContext)

    const logout =()=>{
      navigate('/login')
      localStorage.removeItem('token')
      setToken('')
      setCartItems({})
    }

  return (
    <div className='flex items-center justify-between py-6 font-medium'>
      <Link to='/'><img src={assets.forever} className='w-36' alt="" /></Link>   
      <ul className='hidden sm:flex space-x-5 text-sm text-gray-700 '>
        <div className='flex gap-5 pr-24 py-4'>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
            <p>Home</p>
            <hr className='w-3/4 border-none h-[1.5px] bg-gray-700 hidden'  />
        </NavLink>
        <NavLink to='/collection' className='flex flex-col items-center gap-1'>
            <p>Collection</p>
            <hr className='w-3/4 border-none h-[1.5px] bg-gray-700 hidden'  />
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1'>
            <p>About</p>
            <hr className='w-3/4 border-none h-[1.5px] bg-gray-700 hidden'  />
        </NavLink>
        <NavLink to='/contact' className='flex flex-col items-center gap-1'>
            <p>Contact Us</p>
            <hr className='w-3/4 border-none h-[1.5px] bg-gray-700 hidden'/>
        </NavLink>
        </div>
      </ul>

      <div className='flex gap-6 items-center'>
        <img onClick={()=>setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="" />
        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} alt="" className='w-5 min-w-5' />
          <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>{getCartCount()}</p>
        </Link>
        <div className='group relative py-2'>
          <img onClick={()=> token ? null : navigate('/login')} src={assets.profile_icon} alt="" className='w-5 cursor-pointer' />
          {token && 
          <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-2'>
          <div className='flex flex-col gap-2 w-40 py-3 px-5 bg-gray-300 text-gray-700 rounded-md'>
              <p className='cursor-pointer hover:text-black'>My Profile</p>
              <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
              <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
          </div>
      </div>
          }
        </div>
        <img onClick={()=>setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="" />
      </div>
     <div className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
        <div className='flex flex-col text-gray-600'>
            <div className='flex justify-between py-6 px-6'>
            <Link to='/'><img src={assets.forever} className='w-36' alt="" /></Link>   
            <div onClick={()=>setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer'>
                <img src={assets.cross_icon} alt="" className='h-4 rotate-180'/>
              </div>
            </div>
            <NavLink onClick={()=>setVisible(false)} to='/' className='flex items-center gap-6 p-6 border'>Home</NavLink>
            <NavLink onClick={()=>setVisible(false)} to='/collection' className='flex items-center gap-6 p-6 border'>Collection</NavLink>
            <NavLink onClick={()=>setVisible(false)} to='/about' className='flex items-center gap-6 p-6 border '>About</NavLink>
            <NavLink onClick={()=>setVisible(false)} to='/contact' className='flex items-center gap-6 p-6 border'>Contact Us</NavLink>


        </div>    
    </div>
    </div>
  )
}

export default Navbar
