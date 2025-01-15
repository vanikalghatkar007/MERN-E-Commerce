import React from 'react'

const NewsLetterBox = () => {

    const onSubmitHandler = (event) => {
    event.preventDefault()
    }

  return (
    <div className='text-center'>
      <p className='text-2xl font-medium text-gray-800'>Subscribe today and enjoy an exclusive 20% discount!</p>
      <p className='text-gray-400 mt-3'> Unlock access to the latest collections and special offers. Don’t miss out on this limited-time deal to elevate your style!</p>
      <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
        <input type="email" className='w-full sm:flex-1 outline-none' placeholder='Enter your email' required />
        <button type='submit' className='bg-black text-white text-sx px-10 py-4'>Subscribe</button>
      </form>
    </div>
  )
}

export default NewsLetterBox
