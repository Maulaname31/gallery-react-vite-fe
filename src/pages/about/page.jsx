import React from 'react'
import Nav from '../../components/nav'
import ProfilPicture from '../../assets/profil.jpg'
import emailjs from '@emailjs/browser';

function About() {
  return (
    <div>
        <Nav/>
        <div >
    <div className="container mx-auto py-8">
        <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
            <div className="col-span-4 sm:col-span-3">
                <div className="bg-[#7077A1] shadow rounded-lg p-6">
                    <div className="flex flex-col items-center">
                        <img src={ProfilPicture} className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0">

                        </img>
                        <h1 className="text-xl font-bold text-slate-900">Ilman maulana </h1>
                        <p className="text-gray-700">Admin</p>
                        {/* <div className="mt-6 flex flex-wrap gap-4 justify-center">
                            <a href="#" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">Contact</a>
                            <a href="#" className="bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded">Resume</a>
                        </div> */}
                    </div>
                    <hr className="my-6 border-t border-gray-300"/>
                    <div className="flex flex-col">
                        <span className=" uppercase font-bold tracking-wider mb-2 text-slate-900">Skills</span>
                        <ul>
                            <li className="mb-2">JavaScript</li>
                            <li className="mb-2">React</li>
                            <li className="mb-2">Node.js</li>
                            <li className="mb-2">HTML/CSS</li>
                            <li className="mb-2">Tailwind Css</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col-span-4 sm:col-span-9">
                <div className="bg-[#7077A1] shadow rounded-lg p-6">
                    <h2 className="text-xl font-bold mb-4 text-slate-900">Tentang website PictUL</h2>
                    <p className="text-gray-800">
                    <b>PictUL Gallery</b>  adalah sebuah galeri online yang memudahkan siapa saja, baik itu seniman atau penggemar seni, untuk menjelajah, menemukan ataupun menyimpan berbagai gambar yang menginspirasi. Mirip seperti Pinterest, kami menawarkan platform yang mudah digunakan, tapi kami lebih fokus pada kreativitas dan ide-ide baru.</p>

                
                    <div className="my-6">
                        <p className="mt-2 text-slate-900">
                       <span className='text-red-800'>*</span> Website galeri ini di buat oleh Ilman Maulana Rifqi, seorang siswa SMKN 1 Cisarua, sebagi bagian dari tugas 
                    proyek ujikom. Saya bertanggung jawab atas pengelolaan konten dan pengalaman pengguna 
                        </p>
                    </div>

                    <h3 className="font-semibold text-center mt-3 -mb-2 text-slate-900">
                        Find me on
                    </h3>
                    <div className="flex justify-center items-center gap-6 my-6">
                        <a className="text-gray-700 hover:text-[#F6B17A]" aria-label="Visit TrendyMinds YouTube" href="https://github.com/maulaname31"
                            target="_blank">
                        <i className=" text-2xl ri-github-fill"></i>

                        </a>
                        <a className="text-gray-700 hover:text-[#F6B17A]" aria-label="Visit TrendyMinds Facebook" href="https://www.facebook.com/Maulana.Maulanaa.94064176?mibextid=ZbWKwL"
                            target="_blank">
                     <i className="text-2xl ri-facebook-circle-fill "></i>

                        </a>
                        <a className="text-gray-700 hover:text-[#F6B17A]" aria-label="Visit TrendyMinds Instagram" href="https://www.instagram.com/maulanarfqii_?igsh=MWJidmNsM2J1dncxdQ=="
                            target="_blank">
                        <i className=" text-2xl ri-instagram-fill"></i>

                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    </div>
  )
}

export default About