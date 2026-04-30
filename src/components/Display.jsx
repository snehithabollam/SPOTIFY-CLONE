import React, { useEffect, useRef } from 'react'
import DisplayAlbum from './DisplayAlbum'
import { Route, Routes, useLocation } from 'react-router-dom'
import DisplayHome from './DisplayHome'
import { albumsData } from '../assets/assets';

const Display = () => {
  const displayRef = useRef();
  const location = useLocation();  // Fixed: was "loaction" (typo) and using window.location instead of hook
  const isAlbum = location.pathname.includes("album");
  const albumId = isAlbum ? location.pathname.slice(-1) : "";
  const bgColor = isAlbum ? albumsData[Number(albumId)]?.bgColor : null; // Fixed: was crashing when not on album page

  useEffect(() => {
    if (isAlbum && bgColor) {
      displayRef.current.style.background = `linear-gradient(${bgColor},#121212)`;
    } else {
      displayRef.current.style.background = '#121212';
    }
  })

  return (
    <div ref={displayRef} className='w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0'>
      <Routes>
        <Route path='/' element={<DisplayHome />} />
        <Route path='/album/:id' element={<DisplayAlbum />} />
      </Routes>
    </div>
  )
}

export default Display
