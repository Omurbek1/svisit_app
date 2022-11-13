import React from 'react'
import { Link } from 'react-router-dom'
export const Header = ({ isSignedIn, onQuit }) => (
  <header>
    <nav class="navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-center w-full justify-between">
      <div class="px-6 w-full flex flex-wrap items-center">
        <ul class="navbar-nav mr-auto ">
          <li class="nav-item flex justify-around"><Link to='/'>Home</Link></li>
          <li class="nav-item flex justify-around">
          </li>
        </ul>
        <button class="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"> {
          isSignedIn ? <button onClick={onQuit}>Выход</button> : null
        }</button>
      </div>

    </nav>
  </header>
)