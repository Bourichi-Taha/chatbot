import React, { useEffect, useState } from 'react'
import "../assets/css/filesListItem.css";
import { Checkbox } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentSelectedFiles, selectFile } from '../features/files/filesSlice';


const FilesListItem = ({item}) => {
    const [active, setActive] = useState(false);
    const dispatch = useDispatch();
    const selectedFiles = useSelector(selectCurrentSelectedFiles);
    const [updated,setUpdated] = useState([])
    const ClickHandler = (e) => {
        if (e.currentTarget.classList.contains("active")) {
            setActive(false);

        }else{
            setActive(true);
        }
        if (selectedFiles.indexOf(item.filename) !== -1) {
            setUpdated(selectedFiles.filter((itm)=>itm!==item.filename))
        }else{
            setUpdated([...selectedFiles,item.filename]);
        }
    }
    useEffect(()=>{
        dispatch(selectFile(updated));
    },[updated,dispatch]);

    return (
        <li onClick={ClickHandler} className={active ? "cc-rh-file-item active" : "cc-rh-file-item"}>
            <Checkbox className='cc-rh-fi-checkbox' checked={active} />
            <div className="cc-rh-fi-content">
                <div className="cc-rh-fi-title">
                    {item.filename}
                </div>
                <div className="cc-rh-fi-desc">
                    {item.categories[0]}
                </div>
            </div>
        </li>
    )
}

export default FilesListItem