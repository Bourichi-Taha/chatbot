import "../assets/css/projects.css"
import { Button, InputAdornment, TextField } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DatasetOutlinedIcon from '@mui/icons-material/DatasetOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import ProjectItem from "./ProjectItem";
import PageTransition from "./PageTransition";

const Projects = () => {

    const navigate = useNavigate();


    return (
        <div className="projects-container" style={{position:"relative"}}>
            <div className="pc-left">
                <div className="pc-left-header">
                    <div className="pc-lh-left">My Projects</div>
                    <div className="pc-lh-right">
                        <TextField
                            className='pc-lh-right-input'
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
                        <Button variant="outlined" className='pc-lh-right-button' onClick={() => navigate("/projects/create")}>
                            <AddCircleOutlineIcon className='pc-lh-rb-icon' />
                        </Button>
                        <Button variant="outlined" className='pc-lh-right-button' onClick={() => navigate("/chat-files")}>
                            <DatasetOutlinedIcon className='pc-lh-rb-icon' />
                        </Button>
                    </div>
                </div>
                <div className="pc-left-content">
                    <div className="pc-lc-row" >
                        {[0, 0, 0, 0].map((n, index) => {
                            return (<ProjectItem key={index} />)
                        })}
                    </div>
                    <div className="pc-lc-row" >
                        {[0, 0,0].map((n, index) => {
                            return (<ProjectItem key={index} />)
                        })}
                    </div>
                </div>


            </div>
            <PageTransition />
        </div>
    )
}

export default Projects