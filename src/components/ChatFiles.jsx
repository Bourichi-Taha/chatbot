import React from 'react'
import "../assets/css/chat.css";
import { Button, InputAdornment, TextField } from '@mui/material';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import AssignmentLateOutlinedIcon from '@mui/icons-material/AssignmentLateOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const ChatFiles = () => {
    return (
        <div className="chat-container">
            <div className="cc-left">
                <div className="cc-left-header">
                    <div className="cc-lh-left">AI Chat Helper</div>
                    <div className="cc-lh-right">
                        <TextField
                            className='cc-lh-right-input'
                            variant="outlined"
                            placeholder='Search'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchOutlinedIcon />
                                    </InputAdornment>
                                )
                            }}
                        />
                        <Button variant="outlined" className='cc-lh-right-button'>
                            <NotificationsOutlinedIcon className='cc-lh-rb-icon' />
                        </Button>
                        <Button variant="outlined" className='cc-lh-right-button'>
                            <AssignmentLateOutlinedIcon className='cc-lh-rb-icon' />
                        </Button>
                    </div>
                </div>
                <div className="cc-left-upload-container">

                </div>
                
            </div>
            <div className="cc-right">
                <div className="cc-right-header">
                    <p>Files</p>
                    <div className='cc-rh-total'>23</div>
                </div>
                <ul className="cc-right-history">
                    <li className="cc-rh-item active">
                        <div className="cc-rh-item-title">
                            stockfish in chess
                        </div>
                        <div className="cc-rh-item-desc">
                            has anyone before beated stockfish in chess
                        </div>
                    </li>
                    <li className="cc-rh-item ">
                        <div className="cc-rh-item-title">
                            stockfish in chess
                        </div>
                        <div className="cc-rh-item-desc">
                            has anyone before beated stockfish in chess
                        </div>
                    </li>
                    <li className="cc-rh-item ">
                        <div className="cc-rh-item-title">
                            stockfish in chess
                        </div>
                        <div className="cc-rh-item-desc">
                            has anyone before beated stockfish in chess
                        </div>
                    </li>
                    <li className="cc-rh-item ">
                        <div className="cc-rh-item-title">
                            stockfish in chess
                        </div>
                        <div className="cc-rh-item-desc">
                            has anyone before beated stockfish in chess
                        </div>
                    </li>
                    <li className="cc-rh-item ">
                        <div className="cc-rh-item-title">
                            stockfish in chess
                        </div>
                        <div className="cc-rh-item-desc">
                            has anyone before beated stockfish in chess
                        </div>
                    </li>
                    <li className="cc-rh-item ">
                        <div className="cc-rh-item-title">
                            stockfish in chess
                        </div>
                        <div className="cc-rh-item-desc">
                            has anyone before beated stockfish in chess
                        </div>
                    </li>
                    <li className="cc-rh-item ">
                        <div className="cc-rh-item-title">
                            stockfish in chess
                        </div>
                        <div className="cc-rh-item-desc">
                            has anyone before beated stockfish in chess
                        </div>
                    </li>
                    <li className="cc-rh-item ">
                        <div className="cc-rh-item-title">
                            stockfish in chess
                        </div>
                        <div className="cc-rh-item-desc">
                            has anyone before beated stockfish in chess
                        </div>
                    </li>
                    <li className="cc-rh-item ">
                        <div className="cc-rh-item-title">
                            stockfish in chess
                        </div>
                        <div className="cc-rh-item-desc">
                            has anyone before beated stockfish in chess
                        </div>
                    </li>
                    <li className="cc-rh-item ">
                        <div className="cc-rh-item-title">
                            stockfish in chess
                        </div>
                        <div className="cc-rh-item-desc">
                            has anyone before beated stockfish in chess
                        </div>
                    </li>
                </ul>
                <div className="cc-right-footer">
                    <button className='cc-rf-button'>
                        <DeleteOutlineIcon />
                        Clear History
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChatFiles