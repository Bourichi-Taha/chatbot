import React, { useEffect, useRef, useState } from 'react'
import "../assets/css/chat.css";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, InputAdornment, Menu, MenuItem, Select, TextField } from '@mui/material';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import UserMessage from './UserMessage';
import BotMessage from './BotMessage';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import SendIcon from '@mui/icons-material/Send';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import HistoryListItem from './HistoryListItem';
import { useSelector } from 'react-redux';
import { useGetAllQuery } from '../features/history/historyApiSlice';
import { useGetAllMessagesQuery, useSendMessageMutation, useSummarizeMutation } from '../features/messages/messagesApiSlice';
import { selectCurrentConversationId, selectCurrentSummary } from '../features/messages/messagesSlice';
import LanguageIcon from '@mui/icons-material/Language';
import { selectCurrentSelectedFiles } from '../features/files/filesSlice';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchProjectByIdQuery } from '../features/projects/ProjectApiSlice';
import { Badge } from './ui/Badge';

const Chat = () => {
    const projectId = useParams().projectId;
    const { data: project, isSuccess } = useFetchProjectByIdQuery(projectId)
    const selectedConversationId = useSelector(selectCurrentConversationId);
    const { data: history, isLoading } = useGetAllQuery();
    const { data: messages, isError } = useGetAllMessagesQuery(selectedConversationId||-1);
    const [sendMessage] = useSendMessageMutation();
    const [instantMessages, setInstantMessages] = useState([]);
    const summary = useSelector(selectCurrentSummary);
    const [summarize] = useSummarizeMutation();
    const [userInput, setUserInput] = useState("");
    const [loading, setLoading] = useState(false);
    const handleClick = async (e) => {
        e.preventDefault();
        setIsDialog(true)

    }
    useEffect(() => {
        if (!isError && messages ) {
            setInstantMessages(messages)
        }

    }, [isError, messages]);
    useEffect(() => {
        if (summary !== "") {
            setInstantMessages(prev => [...prev, { response: summary, sender: "bot" }])

        }

    }, [summary]);


    const sendMessageUser = async (e) => {
        setLoading(true)
        e.preventDefault();
        let obj;
        if (selectedConversationId !== null) {
            obj = {
                "user_input": userInput,
                "conv": selectedConversationId,
                "project_id": projectId
            }
        }else{
            obj = {
                "user_input": userInput,
                "project_id": projectId
            }
        }
        setUserInput("");
        setInstantMessages(prev => [...prev, { message_content: userInput, sender: "user" }]);
        try {
            await sendMessage(obj)
            setLoading(false)

        } catch (error) {
            console.log(error)
        }
    }
    //Lang
    const [anchorEl, setAnchorEl] = useState(null);

    const [isLang, setIsLang] = useState(false)
    const handleLanguageMenuClose = () => {
        setIsLang(false)
    };
    const handleLanguageMenuOpen = (e) => {
        setAnchorEl(e.currentTarget);
        setIsLang(true)
    };
    const handleLanguageChange = (language) => {
        //call api
        setIsLang(false)
    };
    const keyHandler = (event) => {
        if (event.key === 'Enter' && !event.shiftKey ) {
            // Submit the form when the "Enter" key is pressed
            sendMessageUser(event)
        }
    }
    //auto scroll
    const messagesEndRef = useRef(null);
    useEffect(() => {
        messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }, [instantMessages]);
    //dialogue sumary
    const [isDialog, setIsDialog] = useState(false)
    const [isDialogAdded, setIsDialogAdded] = useState(false)
    const [selectedFileSumm, setSelectedFileSumm] = useState("")
    const selectedFiles = useSelector(selectCurrentSelectedFiles);
    const handleCloseDialog = (bool) => {
        setIsDialog(false);
        setIsDialogAdded(bool)
    }
    useEffect(() => {
        const get_summary = async () => {
            try {
                await summarize(selectedFileSumm);
                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        if (isDialogAdded) {
            setLoading(true)
            get_summary()
        }
    }, [isDialogAdded, summarize, selectedFileSumm]);
    const navigate = useNavigate();
    let content;
    if (isLoading && !isSuccess) {
        content = (
            <div>Loading ...</div>
        )
    } else {
        content = (
            <div className="chat-container">
                <div className="cc-left">
                    <div className="cc-left-header">
                        <div className="cc-lh-left">AI Chat Helper/{project?.project_name}/{selectedConversationId}</div>{/* get project Name by id */}
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
                            <Button variant="outlined" className='cc-lh-right-button' onClick={() => { }}>
                                <CloudUploadIcon className='cc-lh-rb-icon' />
                            </Button>
                        </div>
                    </div>
                    <div className="cc-left-messages-container">
                        {
                            instantMessages.map((msg, index) => {
                                if (msg.sender === "bot") {
                                    return (
                                        <BotMessage msg={msg} key={index} />
                                    )
                                }
                                return (
                                    <UserMessage msg={msg} key={index} />
                                )
                            })
                        }
                        <div ref={messagesEndRef}></div>
                    </div>
                    <div className="cc-left-input-container">
                        <div className='cc-lmc-bc-actions-icon-holder input-message' onClick={handleClick}>
                            <UploadFileOutlinedIcon sx={{ fontSize: 18 }} />
                        </div>
                        <div className='cc-lmc-bc-actions-icon-holder input-message' onClick={handleLanguageMenuOpen}>
                            <LanguageIcon sx={{ fontSize: 18 }} />

                        </div>
                        <Menu
                            className='lang-menu'
                            anchorEl={anchorEl}
                            open={isLang}
                            onClose={handleLanguageMenuClose}
                        >
                            <MenuItem onClick={() => handleLanguageChange("eng")}>
                                English
                            </MenuItem>
                            <MenuItem onClick={() => handleLanguageChange("dutch")}>
                                Dutch
                            </MenuItem>
                            <MenuItem onClick={() => handleLanguageChange("fr")}>
                                French
                            </MenuItem>
                        </Menu>
                        <TextField
                            className='cc-left-ic-input'
                            variant="outlined"
                            placeholder='Start typing'
                            multiline
                            maxRows={3}
                            value={userInput}
                            onChange={(e) => {
                                if (selectedFiles?.length !== 0) {
                                    setUserInput(e.target.value)
                                }
                            }}
                            onKeyDown={keyHandler}
                        />
                        <div className='cc-lmc-bc-actions-icon-holder input-message' onClick={sendMessageUser}>
                            {!loading ? <SendIcon sx={{ fontSize: 18 }} /> :
                                <div className="typingDots">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>}
                        </div>
                    </div>
                </div>
                <div className="cc-right">
                    <div className="cc-right-header">
                        <p>History</p>
                        <div className='cc-rh-total'>{history?.length}</div>
                        <Badge value={history?.length}/>
                    </div>
                    <ul className="cc-right-history">
                        {history && history?.map((item, index) => {
                        return <HistoryListItem key={index} item={item} />
                    })}
                        {/* <HistoryListItem /> */}
                    </ul>
                    <div className="cc-right-footer">
                        <button className='cc-rf-button'>
                            <DeleteOutlineIcon />
                            Clear History
                        </button>
                    </div>
                </div>
                <Dialog open={isDialog} onClose={handleCloseDialog}>
                    <DialogTitle>Select a File for summarization</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please shoose from below
                        </DialogContentText>
                        <Select
                            value={selectedFileSumm}
                            fullWidth
                            label="Files"
                            onChange={(e) => setSelectedFileSumm(e.target.value)}
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {
                                selectedFiles.map((item, index) => {
                                    return (
                                        <MenuItem key={index} value={item}>{item}</MenuItem>
                                    )
                                })
                            }
                        </Select>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => handleCloseDialog(false)} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => handleCloseDialog(true)} color="primary">
                            Confirm
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
    return content;
}

export default Chat