'use client'
import React, { useState } from 'react'

import Image from 'next/image'
 import Filter from '../../../public/filter.svg'
 import Order from '../../../public/order.svg'
 import data from '../../../public/data.json'
import FlightCard from '../components/FlightCard'
import Right from '../../../public/right.svg'
import Left from '../../../public/left.svg'
import { useWindowSize } from '../hooks/UseWindow'


//TO DO: make the date dynamic
const flights = () => {

  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.pricedItineraries.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.pricedItineraries.length / itemsPerPage);

    // Handle page change
    const handlePageChange = newPage => {
      setCurrentPage(newPage);
    };
  
    const [width] = useWindowSize();

  return (
    <div>
      <div className='md:hidden flex w-full justify-around'>
        <button className='w-40 h-10 bg-white rounded-[4px] flex items-center py-[9px] px-7 text-sm'>
          <Image src={Filter} alt='filter icon' width={14.7} height={16} className='ml-2' />
          فیلتر کردن
        </button>
        <button className='w-40 h-10 bg-white rounded-[4px] flex items-center py-[8px] px-7 text-sm'>
          <Image src={Order} alt='filter icon' width={14.7} height={16} className='ml-2' />
          مرتب سازی
        </button>
      </div>
      <h1 className='text-xl font-bold text-GreyishBrown pr-1
       mt-[22px]'>بلیط هواپیمای تهران به استانبول</h1>
       <div className='mt-2 mb-6 flex'>
        <p className='text-GreyishBrown text-sm'>{data.pricedItineraries.length} پرواز یافت شد.</p>
        <p className='text-GreyishBrown text-sm'>سه‌شنبه، ۱۲ اردیبهشت ۱۴۰۰</p>
       </div>
       {currentItems.map((flight , index) => {
         return <FlightCard key={index} airLine={flight.validatingAirlineCode} 
         departureTime={flight.originDestinationOptions[0].flightSegments[0].departureDateTime}
         arrivalTime={flight.originDestinationOptions[0].flightSegments[0].arrivalDateTime}
         departureAirport={flight.originDestinationOptions[0].flightSegments[0].departureAirportLocationCode}
         arrivalAirport={flight.originDestinationOptions[0].flightSegments[0].arrivalAirportLocationCode}
         duration={flight.originDestinationOptions[0].flightSegments[0].journeyDuration}
         charter={flight.isCharter}
         flightNum={flight.originDestinationOptions[0].flightSegments[0].flightNumber}
         fare={flight.airItineraryPricingInfo.itinTotalFare.totalFare}
         seats={flight.originDestinationOptions[0].flightSegments[0].seatsRemaining}/>
         
       })}

<div className='md:w-[30%] mx-auto'>
      <div className='flex justify-between items-center w-full'>
      <button className='w-24 bg-white py-[10px] rounded-[4px] text-xs text-[#161616] flex items-center justify-evenly'
       onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        <Image src={Right} alt='next' />
          بعدی
        </button>
        <p className='text-sm text-[#161616]'>
           {currentPage} از {totalPages}
        </p>
        <button className='w-24 bg-white py-[10px] rounded-[4px] text-xs text-[#161616] flex items-center justify-evenly flex-row-reverse'
        onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          <Image src={Left} alt='previous' />
          قبلی
        </button>
        
      </div>
    </div>
    </div>
  )
}

export default flights
