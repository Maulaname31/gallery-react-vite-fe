import React from 'react'
import Logo from '../assets/logo.png'

function Footer() {
  return (
<footer className="footer p-10 bg-[#2D3250] text-neutral-content mt-52">
  <aside>
    <img src={Logo} alt=""  width='100' height='100'  style={{ filter: 'grayscale(100%)' }}/>
    <p>HEROTRE <br/>Providing reliable tech since 2077</p>
  </aside> 
  <nav>
    <h6 className="footer-title">Social</h6> 
    <div className="grid grid-flow-col gap-4">
      <a href='https://www.instagram.com/maulanarfqii_?igsh=MWJidmNsM2J1dncxdQ=='><i className=" text-2xl ri-instagram-fill"></i></a>
      <a href='https://github.com/maulaname31'><i className=" text-2xl ri-github-fill"></i></a>
      <a href='https://www.facebook.com/Maulana.Maulanaa.94064176?mibextid=ZbWKwL'><i className="text-2xl ri-facebook-circle-fill "></i></a>
    </div>
  </nav>
</footer>
  )
}

export default Footer