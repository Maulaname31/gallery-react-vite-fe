import React from 'react'
import Logo from '../assets/logo.png'

function Footer() {
  return (
<footer className="footer p-10 bg-neutral text-neutral-content mt-36">
  <aside>
    <img src={Logo} alt=""  width='100' height='100'  style={{ filter: 'grayscale(100%)' }}/>
    <p>HEROTRE Industries Inc.<br/>Providing reliable tech since 1992</p>
  </aside> 
  <nav>
    <h6 className="footer-title">Social</h6> 
    <div className="grid grid-flow-col gap-4">
      <a href='https://www.instagram.com/maulanarfqii_?igsh=MWJidmNsM2J1dncxdQ=='><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 448 512"  className="fill-current"><path fill="currentColor" d="M224 141c-63.6 0-114.9 51.4-114.9 114.9S160.4 370.9 224 370.9 338.9 319.5 338.9 256 287.6 141 224 141zm0 186.2c-41.1 0-74.6-33.5-74.6-74.6s33.5-74.6 74.6-74.6 74.6 33.5 74.6 74.6-33.5 74.6-74.6 74.6zm135.2-256H84.8C38.2 70.2 0 108.4 0 155v202c0 46.6 38.2 84.8 84.8 84.8h274.4c46.6 0 84.8-38.2 84.8-84.8V155c0-46.6-38.2-84.8-84.8-84.8zm54.4 286.8c0 29.9-24.3 54.2-54.2 54.2H84.8c-29.9 0-54.2-24.3-54.2-54.2V155c0-29.9 24.3-54.2 54.2-54.2h274.4c29.9 0 54.2 24.3 54.2 54.2v202z"/></svg></a>
      <a href='https://github.com/maulaname31'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="fill-current" viewBox="0 0 16 16"><path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg></a>
      <a href='https://www.facebook.com/Maulana.Maulanaa.94064176?mibextid=ZbWKwL'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
    </div>
  </nav>
</footer>
  )
}

export default Footer