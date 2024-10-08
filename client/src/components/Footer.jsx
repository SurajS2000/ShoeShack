import React from 'react'

const Footer = () => {
  return (
    <div className="w-full p-10 flex-col items-center justify-center bg-gray-300 flex">
        <p>Contact Us</p>
        <div className="flex gap-5 pt-5">
          <i className="fa-brands fa-square-instagram"></i>
          <i className="fa-brands fa-youtube"></i>
          <i className="fa-brands fa-square-facebook"></i>
          <i className="fa-brands fa-linkedin"></i>
        </div>
    </div>
  )
}

export default Footer
