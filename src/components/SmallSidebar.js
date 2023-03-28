import React from 'react'
import { FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Wrapper from "../assets/wrappers/SmallSidebar";
import { closeSidebar, toggleSidebar } from '../Features/UserSlice';
import { Links } from '../utils/Links';
import Logo from './Logo';
import NavLinks from './Navlinks';

export const SmallSidebar = () => {
  const {isSidebarOpen}=useSelector((store)=>store.user)
  const dispatch=useDispatch()
  return (
    <>
      <Wrapper>
        <div className={isSidebarOpen?'show-sidebar sidebar-container':'sidebar-container'}>
          <div className='content'>
            <button className='close-btn' onClick={()=>dispatch(closeSidebar())}>
              <FaTimes/>
              
            </button>
            <header>
              <Logo/>
              <NavLinks/>
            </header>
           
          </div>
        </div>
      </Wrapper>
    </>
  );
}
