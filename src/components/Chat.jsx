import React from 'react'
import "../assets/css/chat.css";
import { Button, InputAdornment, TextField } from '@mui/material';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import AssignmentLateOutlinedIcon from '@mui/icons-material/AssignmentLateOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import UserMessage from './UserMessage';
import BotMessage from './BotMessage';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import SendIcon from '@mui/icons-material/Send';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import HistoryListItem from './HistoryListItem';
import {  useSelector } from 'react-redux';
import { useGetAllQuery } from '../features/history/historyApiSlice';
import { useGetAllMessagesQuery } from '../features/messages/messagesApiSlice';
import { selectCurrentConversationId } from '../features/messages/messagesSlice';
const Chat = () => {

    const selectedConversationId = useSelector(selectCurrentConversationId);
    const {data} = useGetAllQuery();
    const {data:messages,isError} = useGetAllMessagesQuery(selectedConversationId);


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
                <div className="cc-left-messages-container">
                    {
                        !isError && messages && messages.messages.map((msg,index)=>{
                            if (msg.sender === "bot") {
                                return (
                                    <BotMessage msg={msg} key={index} />
                                )
                            }
                            return(
                                <UserMessage msg={msg} key={index}/>
                            )
                        })
                    }
                </div>
                <div className="cc-left-input-container">
                    <div className='cc-lmc-bc-actions-icon-holder input-message'>
                        <UploadFileOutlinedIcon sx={{ fontSize: 18 }} />
                    </div>
                    <TextField
                        className='cc-left-ic-input'
                        variant="outlined"
                        placeholder='Start typing'
                        multiline
                        maxRows={3}
                    />
                    <div className='cc-lmc-bc-actions-icon-holder input-message'>
                        <SendIcon sx={{ fontSize: 18 }} />
                    </div>
                </div>
            </div>
            <div className="cc-right">
                <div className="cc-right-header">
                    <p>History</p>
                    <div className='cc-rh-total'>50</div>
                </div>
                <ul className="cc-right-history">
                    {data && data.conversations?.map((item,index)=>{
                        return <HistoryListItem key={index} item={item}/>
                    })}
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

export default Chat