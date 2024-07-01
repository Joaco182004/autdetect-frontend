import React from 'react'
import "../pages/style.css"
export default function Home() {
  return (
    <section className='w-full h-full'>
        <h1 className='font-montserrat font-semibold mb-[1.5rem] ml-[2rem] pt-[2rem] text-4xl'>Dashboard</h1>
        <div className=' w-full cont-section-dash flex gap-4'>
          <div className='bg-white w-[650px] h-[420px]  ml-[2rem] rounded-md flex flex-col items-center'>
          <div className='flex w-[95%] mt-3 justify-start items-center'>
          <div className='bg-blue-500 rounded-md w-3 h-8'></div>
          <h2 className='font-montserrat font-semibold text-lg ml-2'>Vista General</h2>
          </div>
          <div className='w-[95%] flex bg-[rgb(244,244,244)] p-2 gap-4 mt-3 rounded-md'>
                  <div className='w-1/2 h-32 bg-white rounded-md'>

                  </div>
                  <div className='w-1/2 h-32 [rgb(244,244,244)] rounded-md'>

                  </div>
              </div>
          </div>
          <div className='bg-white w-[30%] mr-4 mb-4 rounded-md'>
             
          </div>
        </div>
       
    </section>
  )
}
