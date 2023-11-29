import Image from 'next/image'
import React from 'react'
import Logo from '../../../public/airlineLogo.png'
import data from '../../../public/data.json'
import More from '../../../public/Polygon.svg'

//TO DO: arrival city name is moving in different breakpoints
//TO DO : flightnumber should have english numbers
//TO DO : pricing is not ok
//TO DO : دوبی flights
const FlightCard = ({airLine, departureTime, arrivalTime,departureAirport, arrivalAirport, duration, charter, flightNum, fare, seats}) => {

   const findAirlineName = data.additionalData.airlines.find(code => code.iata === airLine )

   const convertNormalTime = (date) => {
    const departureDateTime = new Date(date)
    const hour = departureDateTime.getHours()
    const minute = departureDateTime.getMinutes()
    const formattedTime = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
    return formattedTime
   }
   
   const findAirport = (airport) => {
    const airPort = data.additionalData.airports.find(code => airport === code.iata)
    const airPortInfo = {
      city: airPort.cityFa,
      Id: airPort.cityId,
    }
    return airPortInfo
   }


{/* this block will change the duration of flight to the desired format */}
  const [hours, minutes] = duration.split(':');

  let formattedString = '';

  if (parseInt(hours, 10) !== 0) {
    formattedString += `${parseInt(hours, 10)} ساعت`;
  }

  if (parseInt(minutes, 10) !== 0) {
    const separator = parseInt(hours, 10) !== 0 ? ' و ' : '';
    formattedString += `${separator}${parseInt(minutes, 10)} دقیقه`;
  }

  {/* end of the block */}

  function formatPersianPriceFromRight(price) {
    const priceString = price
      .toString()
      .replace(/[0-9]/g, digit => String.fromCharCode(digit.charCodeAt(0) + 1728));
      const reversedGroups = priceString
      .split('')
      .reverse()
      .join('')
      .match(/.{1,3}/g);
      const formattedPrice = reversedGroups
      .reverse()
      .join(',');
  
    return formattedPrice;
  }



// console.log(flightNum)

  return (
    <div className='min-w-[328px] max-w-[894px] bg-white flex flex-col pt-3 pr-4 pb-4 pl-4 md:pt-0 md:pb-0 mb-2'>
      <div className='flex items-center md:hidden'>
        <Image src={Logo} alt='airline logo' width={40} height={40}/>
        <p className='text-sm text-GreyishBrown mr-4'>{findAirlineName.nameFa}</p>
      </div>

      <div className='flex'>
            <div className='flex items-center  w-full md:w-[75%]'>
            <div className='md:flex md:ml-5 items-center hidden'>
        <Image src={Logo} alt='airline logo' width={40} height={40}/>
        <p className='text-sm text-GreyishBrown mr-4'>{findAirlineName.nameFa}</p>
      </div>
              {/* departure info */}
              <div className='flex flex-col w-1/4 md:w-[10%] md:mr-10 md:ml-6 text-xl text-GreyishBrown font-semibold'>
                <p>{convertNormalTime(departureTime)}</p>
                <p className='text-sm text-GreyishBrown font-normal flex items-center'>
                  {findAirport(departureAirport).city} 
                <span className='text-xs text-[#8d8d8d] mr-1'>{`(${findAirport(departureAirport).Id})`}</span>
                </p>
              </div>
              {/* middle section */}
              <div className='flex flex-col items-center'>
                <p className='text-xs text-[#6f6f6f] mb-1'>{formattedString}</p>

              <div className='flex items-center w-29 md:w-44'>
                <div className='w-3 h-3 border border-[#1773dc] rounded-full'></div>
                <hr className='w-[88px] md:w-36 border border-customGrey' />
                <div className='w-3 h-3 border border-customOrange rounded-full'></div>
              </div>
              </div>
              {/* arrival info */}
              <div className='flex flex-col justify-end w-1/4 md:w-[11%] text-xl text-GreyishBrown font-semibold text-left'>
                <p>{convertNormalTime(arrivalTime)}</p>
                <p className='text-sm text-GreyishBrown text-left font-normal flex items-center mr-1 sm:mr-6'>
                  {findAirport(arrivalAirport).city} 
                <span className='text-xs text-[#8d8d8d] mr-1'>{`(${findAirport(arrivalAirport).Id})`}</span>
                </p>
              </div>
            </div>

            <div className='h-[136px] w-[1px] bg-[#eee] p-0 hidden md:block'></div>

            <div className='md:flex justify-center items-center flex-col mt-4 w-[23%]
            mr-5 hidden'>
        <div className='flex flex-col items-center w-1/2'>
          <p className='text-xs text-[#8d8d8d] mb-2'>یک نفر</p>
          <div className='flex items-center mt-1 mb-2'>
          <p className='text-[#1773dc] text-xl font-bold '>{formatPersianPriceFromRight(fare/10)} 
          </p>
          <span className='text-[13px] text-[#8d8d8d] font-normal mr-2'>تومان</span>
          </div>
        </div>
        <button className='w-[152px] h-10 bg-[#1773dc] text-white py-2 px-7 rounded-[4px] text-sm mb-4'>انتخاب بلیط</button>
      </div>
      </div>

      <hr className='w-full border-t border-[#eeeeee] hidden md:block' />

    <div className='w-full flex items-center'>
    <div className='border border-r-0 border-l-0 md:border-0 border-[#eeeeee] w-full md:w-[85%] flex items-center justify-evenly md:justify-start mt-4 md:mt-0 py-2
          text-xs text-GreyishBrown'>
            <div className='flex items-center w-[35%] md:w-[18%]'>
            <p className={`${charter ? 'bg-[#f4f4f4]' : ''} rounded-sm py-1 px-[10px] text-center`}>چارتر</p>
            <p className={`${charter ? '' : 'bg-[#f4f4f4]'} rounded-sm py-1 px-[10px] text-center`}>سیستمی</p>
            </div>
            <span className='mx-2'>.</span>
            <p className='flex w-[26%] md:w-[13%]'>{seats} صندلی خالی</p>
            <span className='mx-1 md:ml-2'>.</span>
            <p className='flex w-1/3 md:w-1/6'>شماره پرواز : <span>{flightNum.replace(/\D/g, '')}</span></p>
          </div>

          <p className='text-customOrange text-xs w-[14%] hidden md:flex items-center cursor-pointer'>جزئیات بیشتر
          <Image src={More} alt='more' className='mr-1'/>
          </p>
    </div>
      

{/* pricing section */}
      <div className='flex justify-between mt-4 md:hidden'>
        <div className='flex flex-col w-1/2'>
          <p className='text-xs text-[#8d8d8d]'>یک نفر</p>
          <div className='flex items-center mt-1'>
          <p className='text-[#1773dc] text-xl font-bold '>{formatPersianPriceFromRight(fare/10)} 
          </p>
          <span className='text-[13px] text-[#8d8d8d] font-normal mr-2'>تومان</span>
          </div>
        </div>
        <button className='w-[152px] h-10 bg-[#1773dc] text-white py-2 px-7 rounded-[4px] text-sm'>جزئیات و انتخاب</button>
      </div>
    </div>
  )
}

export default FlightCard
