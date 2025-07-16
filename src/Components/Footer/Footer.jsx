import React from 'react'
import logo from '../Assests/logo.png';

export default function Footer() {
  return (
    <div>
         <footer className="bg-[#003153] px-5 lg:px-[6rem] lg:pt-[3rem] py-5  ">
        <div className="flex items-center justify-evenly lg:flex-row flex-col gap-y-9">
          <div>
            <img src={logo} className="h-32 w-32" />
          </div>

          <div className="text-lg font-medium font-poppins text-[#B9D9EB]">
            <p className="hover:underline cursor-pointer">About</p>
            <p className="hover:underline cursor-pointer">Careers</p>
            <p className="hover:underline cursor-pointer">Terms</p>
          </div>
          <div className="text-lg font-medium font-poppins text-[#B9D9EB]">
            <p className="hover:underline cursor-pointer">
              @sparkhydration.com
            </p>
            <p className="hover:underline cursor-pointer">Instagram</p>
            <p className="hover:underline cursor-pointer">LinkedIn</p>
          </div>
        </div>

        <hr className="mx-auto w-[80%] lg:w-[50%] border-t-2 border-[#B9D9EB] mt-11" />
        <div className="text-[#B9D9EB]">@Copyright- All rights reserved</div>
      </footer>
    </div>
  )
}
