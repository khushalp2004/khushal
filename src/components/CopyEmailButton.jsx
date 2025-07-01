import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

const CopyEmailButton = () => {
    const [copied,setCopied]=useState(false);
    const email="patilkhushal54321@gmail.com";

    const copyToClipboard=()=>{
        navigator.clipboard.writeText(email);
        toast.success("Email copied to clipboard");
        setCopied(true);

        setTimeout(()=>{
            setCopied(false);
        },2000)
    }
  return (
    <div>
    <button onClick={copyToClipboard} className='relative px-1 py-4 text-sm text-center rounded-full font-extralight bg-primary w-[12rem] cursor-pointer overflow-hidden'>
        {copied ? (
      <p className='flex items-center justify-center gap-2 text-success'>
        
    <img src="assets/copy-done.svg" alt="copy icon" className='w-5 ' />
    Copied
    </p>
    
  ) : (
    <p className='flex items-center justify-center gap-2'>
    <img src="assets/copy.gif" alt="copy icon" className='w-5 invert-100' />Copy 
    </p>
  )}
  

    </button>
    </div>
  )
}

export default CopyEmailButton
