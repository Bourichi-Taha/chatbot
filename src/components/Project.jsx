import React from 'react'
import "../assets/css/project.css"
import { Button, InputAdornment, TextField } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DatasetOutlinedIcon from '@mui/icons-material/DatasetOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useNavigate } from 'react-router-dom';
import PageTransition from './PageTransition';
import FilesListItem from './FilesListItem';
import MarkChatReadIcon from '@mui/icons-material/MarkChatRead';
import { useSelectFilesMutation } from '../features/files/filesApiSlice';
import { selectCurrentSelectedFiles } from '../features/files/filesSlice';
import { useSelector } from 'react-redux';

const Project = () => {
    const navigate = useNavigate();
    const [selectFile] = useSelectFilesMutation();
    const selectedFiles = useSelector(selectCurrentSelectedFiles);


    const startChatting = async (e) => {
        e.preventDefault();
        try {
            await selectFile({ fileNames: selectedFiles })
            navigate("/chatbot")
        } catch (error) {
            console.log(error)

        }
    }
    return (
        <div className='project-item-container' style={{ position: "relative" }}>
            <div className="pci-left">
                <div className="pci-left-header">
                    <div className="pci-lh-left" ><span style={{ cursor: "pointer" }} onClick={() => navigate("/projects")}>My Projects</span>/Project Name</div>
                    <div className="pci-lh-right">
                        <TextField
                            className='pci-lh-right-input'
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
                        <Button variant="outlined" className='pci-lh-right-button'>
                            <AddCircleOutlineIcon className='pci-lh-rb-icon' />
                        </Button>
                        <Button variant="outlined" className='pci-lh-right-button' onClick={() => navigate("/chat-files")}>
                            <DatasetOutlinedIcon className='pci-lh-rb-icon' />
                        </Button>
                    </div>
                </div>
                <div className="pci-left-content">

                </div>
            </div>
            <div className="pci-right">
                <div className="pci-right-header">
                    <p>Files</p>
                    <div className='pci-rh-total'>23</div>
                </div>
                <ul className="pci-right-history">
                    <FilesListItem item={{ filename: 'test', categories: ["Sport"] }} />
                    <FilesListItem item={{ filename: 'test', categories: ["Sport"] }} />
                    <FilesListItem item={{ filename: 'test', categories: ["Sport"] }} />
                    <FilesListItem item={{ filename: 'test', categories: ["Sport"] }} />
                    <FilesListItem item={{ filename: 'test', categories: ["Sport"] }} />
                    <FilesListItem item={{ filename: 'test', categories: ["Sport"] }} />
                    <FilesListItem item={{ filename: 'test', categories: ["Sport"] }} />
                    <FilesListItem item={{ filename: 'test', categories: ["Sport"] }} />
                </ul>
                <div className="pci-right-footer">
                    <button className='cc-rf-button' onClick={startChatting}>
                        <MarkChatReadIcon />
                        Start Chatting
                    </button>
                </div>
            </div>
            <PageTransition />
        </div>
    )
}

export default Project