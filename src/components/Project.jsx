import React from 'react'
import "../assets/css/project.css"
import { Button, InputAdornment, TextField } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DatasetOutlinedIcon from '@mui/icons-material/DatasetOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useNavigate } from 'react-router-dom';
import PageTransition from './PageTransition';
const Project = () => {
    const navigate = useNavigate();
    return (
        <div className='project-item-container' style={{ position: "relative" }}>
            <div className="pci-left">
                <div className="pci-left-header">
                    <div className="pci-lh-left" ><span style={{cursor:"pointer"}} onClick={()=>navigate("/projects")}>My Projects</span>/Project Name</div>
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
                <PageTransition />
            </div>
        </div>
    )
}

export default Project