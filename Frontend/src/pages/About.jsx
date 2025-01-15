import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'About'} text2={'Us'}/>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>At FOREVER, we believe in creating an exceptional online shopping experience that stands the test of time. Our e-commerce platform is designed to bring you the latest in fashion, electronics, and lifestyle products, all at the click of a button. With a commitment to quality, innovation, and customer satisfaction, FOREVER curates a diverse range of products to meet the evolving needs of our customers. Our mission is to provide a seamless and enjoyable shopping journey, backed by reliable customer support and a secure online environment. Whether you're looking for the latest trends or timeless classics, FOREVER is your destination for all things stylish and enduring.</p>
        <p>Our team is passionate about staying ahead of market trends and ensuring that our inventory reflects the latest styles and innovations. We also prioritize sustainability and ethical practices, partnering with brands that share our commitment to a better future. By continuously enhancing our platform and services, FOREVER aims to be your trusted partner in discovering products that bring joy, convenience, and value to your life. Join us on this journey to make every purchase memorable and rewarding.</p>
        <b className='text-gray-800'>Our Mission</b>
        <p>Our mission at FOREVER is to redefine the e-commerce experience by delivering unparalleled value, quality, and convenience to our customers. We are committed to curating a diverse selection of products that inspire and empower, all while providing a seamless and secure shopping environment. Our goal is to foster lasting relationships through exceptional service, innovative technology, and a deep understanding of our customers' needs. By championing sustainability and ethical business practices, we strive to make a positive impact on the world. At FOREVER, we are dedicated to helping our customers find joy in every purchase and building a future where shopping is not just an activity but an experience that brings lasting satisfaction.</p>
        </div>
      </div>

      <div className='text-xl py-4'>
      <Title text1={'Why'} text2={'Choose FOREVER?'}/>
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20 '>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'> 
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>At FOREVER, quality assurance is at the core of everything we do. We meticulously vet our products to ensure they meet the highest standards of durability, functionality, and style. Our dedicated QA team conducts rigorous checks at every stage, from sourcing to delivery, to guarantee that you receive only the best. By continuously improving our processes, we strive to exceed customer expectations and provide a reliable, satisfying shopping experience every time. Trust FOREVER for quality you can depend on.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'> 
          <b>Convenience:</b>
          <p className='text-gray-600'>Our user-friendly platform allows you to browse, select, and purchase with ease, from any device, at any time. With fast, reliable shipping and hassle-free returns, we ensure that your journey from discovery to delivery is seamless. Whether you're shopping for the latest trends or everyday essentials, FOREVER is here to provide a convenient, stress-free experience tailored to your needs.</p> 
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'> 
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>At FOREVER, exceptional customer service is at the heart of our mission. Our dedicated support team is always ready to assist you, providing prompt, friendly, and knowledgeable responses to your inquiries. We go the extra mile to ensure your satisfaction, from personalized recommendations to resolving any issues swiftly and effectively. Your feedback is valued and drives our continuous improvement, ensuring that every interaction with us is positive and rewarding. Experience the difference with FOREVER’s commitment to exceptional customer care.</p> 
        </div>
      </div>
      <NewsLetterBox/>
    </div>
  )
}

export default About
