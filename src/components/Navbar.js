import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Wrapper from '../assets/wrappers/Navbar'
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import Logo from './Logo';
import { logOut, toggleLogout, toggleSidebar } from '../Features/UserSlice';


export const Navbar = () => {

  const {user,showLogout}=useSelector((store)=>store.user)
  const dispatch=useDispatch();
  
  
  
  return (
    <Wrapper>
      <div className="nav-center">
        <button
          type="button"
          className="toggle-btn"
          onClick={()=>dispatch(toggleSidebar())}
        >
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => {
              dispatch(toggleLogout());
            }}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={showLogout?'dropdown show-dropdown':'dropdown'}>
            <button type="button" className="dropdown-btn" onClick={()=>{
              dispatch(logOut())

            }}>
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
