import React, { useEffect, useState } from 'react'
import "../assets/css/library.css"
import { Button, InputAdornment, TextField } from '@mui/material'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import PageTransition from './PageTransition';
import { useNavigate } from 'react-router-dom';
import CustomDataGrid from './CustomDataGrid';
import { useFilterLibraryMutation } from '../features/Library/LibraryApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentIsFiltered, toggleIsFiltered } from '../features/Library/LibrarySlice';
const Library = () => {
    const navigate = useNavigate();
    const [topic, setTopic] = useState("");
    const [mesure, setMesure] = useState("");
    const [open, setOpen] = useState(true);
    const [filterLibrary] = useFilterLibraryMutation();
    const isFiltered = useSelector(selectCurrentIsFiltered);
    const dispatch = useDispatch();
    useEffect(() => {
        const header = document.querySelector(".lc-right-header")
        const body = document.querySelector(".lc-right-history")
        const footer = document.querySelector(".lc-right-footer")
        if (open) {
            setTimeout(() => {
                header.classList.remove("closed")
                body.classList.remove("closed")
                footer.classList.remove("closed")
            }, 200);
        } else {
            setTimeout(() => {
                header.classList.add("closed")
                body.classList.add("closed")
                footer.classList.add("closed")
            }, 100);
        }
    }, [open]);
    const FilterHandler = async (e) => {
        e.preventDefault();
        let isTopicNow= false ;
        let isMeasureNow= false ;
        if (topic !== "") {
            isTopicNow = true;
        }
        if (mesure !== "") {
            isMeasureNow = true;
        }
        if (isTopicNow && isMeasureNow) {
            await filterLibrary({Topic:topic,Measure:mesure});
        }else if(isTopicNow && !isMeasureNow){
            await filterLibrary({Topic:topic});

        }else if(!isTopicNow && isMeasureNow){
            await filterLibrary({Measure:mesure});
        }

        
    }
    const CancelFilter = (e) => {
        e.preventDefault();
        dispatch(toggleIsFiltered(false));
    }
    return (
        <div className='library-container' style={{ position: "relative" }}>
            <div className="lc-left">
                <div className="lc-left-header" style={!open ? { borderRadius: " 20px 20px 0 0" } : null}>
                    <div className="lc-lh-left" ><span style={{ cursor: "pointer" }} onClick={() => navigate("/library")}>Library</span></div>
                    <div className="lc-lh-right">
                        <TextField
                            className='lc-lh-right-input'
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
                        <Button variant="outlined" className='lc-lh-right-button'>
                            <CachedOutlinedIcon className='lc-lh-rb-icon' />
                        </Button>
                        <Button variant="outlined" className='lc-lh-right-button' onClick={() => { setOpen(prev => !prev) }}>
                            <FilterAltOutlinedIcon className='lc-lh-rb-icon' />
                        </Button>
                    </div>
                </div>
                <div className="lc-left-content">
                    <div className="lc-lc-top">
                        <div className="lc-lc-top-search">
                            <TextField
                                className='lc-lc-top-search-input'
                                variant="outlined"
                                placeholder='Search Library'
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <SearchOutlinedIcon />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </div>
                        <div className="lc-lc-top-buttons">
                            <button className='lc-rf-button' onClick={() => { }}>
                                Export
                                <FileUploadOutlinedIcon />

                            </button>
                            <button className='lc-rf-button' onClick={() => { }}>
                                Import
                                <FileDownloadOutlinedIcon />
                            </button>
                        </div>
                    </div>
                    <div className="lc-lc-bottom">
                        <CustomDataGrid />
                    </div>
                </div>
            </div>
            <div className={open ? "lc-right" : "lc-right closed"}>
                <div className="lc-right-header">
                    <p>Advance Filters</p>
                </div>
                <ul className="lc-right-history">
                    <TextField label="Topic" variant='outlined' className='pci-luc-form-input' value={topic} onChange={(e) => setTopic(e.target.value)} />
                    <TextField label="Mesure" variant='outlined' className='pci-luc-form-input' value={mesure} onChange={(e) => setMesure(e.target.value)} />

                </ul>
                <div className="lc-right-footer" style={{flexDirection:'column'}}>
                    {
                        isFiltered ?
                            <button className='lc-rf-button' onClick={CancelFilter}>
                                <FilterAltOutlinedIcon />
                                Cancel
                            </button>
                            :
                            null
                    }
                    <button className='lc-rf-button' onClick={FilterHandler}>
                        <FilterAltOutlinedIcon />
                        Filter
                    </button>
                </div>
            </div>
            <PageTransition />
        </div>
    )
}

export default Library