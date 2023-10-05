import React, { useEffect, useState } from 'react'
import "../assets/css/chatbot.css"
import logo from "../assets/images/logo .png";
import AutoAwesomeMosaicIcon from '@mui/icons-material/AutoAwesomeMosaic';
import LogoutIcon from '@mui/icons-material/Logout';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import BorderAllRoundedIcon from '@mui/icons-material/BorderAllRounded';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HelpCenterOutlinedIcon from '@mui/icons-material/HelpCenterOutlined';
import InsertChartOutlinedRoundedIcon from '@mui/icons-material/InsertChartOutlinedRounded';
import { IconButton } from '@mui/material';
import { Outlet } from 'react-router-dom'

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(true);
  const sidebarTrigger = () => setIsOpen(prev => !prev)
  useEffect(() => {
    const sidebar = document.querySelector(".cbc-main-sidebar");
    const main = document.querySelector(".cbc-main");
    if (!isOpen) {
      sidebar.classList.add("op-0");
      setTimeout(() => {
        sidebar.classList.add("w-0");
        main.classList.add("no-sb");
      }, 100);
    }else{
      sidebar.classList.remove("w-0");
      main.classList.remove("no-sb");
      setTimeout(() => {
        sidebar.classList.remove("op-0");
      }, 100);
    }
  }, [isOpen])
  return (
    <div className="chat-bot-container">
      <div className="cbc-main">
        <IconButton onClick={sidebarTrigger} sx={{ display: isOpen ? "none" : "flex", position: "fixed", top: 10, left: 10 }}>
          <AutoAwesomeMosaicIcon className='cbc-msb-tt-icon abs' />
        </IconButton>
        <div className="cbc-main-sidebar">
          <div className="cbc-msb-top">
            <div className="cbc-msb-top-top">
              <img src={logo} alt="" className="cbc-msb-tt-logo" />
              <IconButton onClick={sidebarTrigger}>
                <AutoAwesomeMosaicIcon className='cbc-msb-tt-icon' />
              </IconButton>
            </div>
            <ul className="cbc-msb-top-bottom">
              <li className='cbc-msb-tb-item active'>
                <IconButton>
                  <ChatBubbleOutlineIcon className='cbc-msb-tt-icon' />
                </IconButton>
                AI Chat Helper
              </li>
              <li className='cbc-msb-tb-item'>
                <IconButton>
                  <DescriptionOutlinedIcon className='cbc-msb-tt-icon' />
                </IconButton>
                Library
              </li>
              <li className='cbc-msb-tb-item'>
                <IconButton>
                  <BorderAllRoundedIcon className='cbc-msb-tt-icon' />
                </IconButton>
                My Projects
              </li>
              <li className='cbc-msb-tb-item'>
                <IconButton>
                  <InsertChartOutlinedRoundedIcon className='cbc-msb-tt-icon' />
                </IconButton>
                Statistics
              </li>
              <li className='cbc-msb-tb-item'>
                <IconButton>
                  <SettingsOutlinedIcon className='cbc-msb-tt-icon' />
                </IconButton>
                Settings
              </li>
              <li className='cbc-msb-tb-item'>
                <IconButton>
                  <HelpCenterOutlinedIcon className='cbc-msb-tt-icon' />
                </IconButton>
                Updates & FAQ
              </li>
            </ul>
          </div>
          <div className="cbc-msb-bottom">
            <div className="cbc-msb-bottom-top">
              ads
            </div>
            <div className="cbc-msb-bottom-bottom">
              <p>logout</p>
              <IconButton>
                <LogoutIcon className='cbc-msb-tt-icon' />
              </IconButton>
            </div>
          </div>
        </div>
        <div className="cbc-main-content">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Chatbot