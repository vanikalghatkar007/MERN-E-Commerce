import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col items-center py-10 sm:flex-row justify-around gap-10 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-600'>
      <div>
  <img src={assets.exchange_icon} className="w-12 m-auto mb-5" alt="" />
  <p className="font-semibold">Effortless Exchanges</p>
  <p className="text-gray-400">Enjoy seamless exchanges for your purchases without any hassle.</p>
</div>
<div>
  <img src={assets.quality_icon} className="w-12 m-auto mb-5" alt="" />
  <p className="font-semibold">Hassle-Free Returns</p>
  <p className="text-gray-400">Return your items within 7 days if they don’t meet your expectations.</p>
</div>
<div>
  <img src={assets.support_img} className="w-12 m-auto mb-5" alt="" />
  <p className="font-semibold">Exceptional Customer Support</p>
  <p className="text-gray-400">Our team is always ready to assist you with your queries and concerns.</p>
</div>

    </div>
  )
}

export default OurPolicy
