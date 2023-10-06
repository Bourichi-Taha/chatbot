import React, { useState } from 'react'
import "../assets/css/filesListItem.css";
import { Checkbox } from '@mui/material';


const FilesListItem = ({item}) => {
    const [active, setActive] = useState(false);
    const ClickHandler = (e) => {
        if (e.currentTarget.classList.contains("active")) {
            setActive(false);
        }else{
            setActive(true);
        }
    }
    return (
        <li onClick={ClickHandler} className={active ? "cc-rh-file-item active" : "cc-rh-file-item"}>
            <Checkbox className='cc-rh-fi-checkbox' checked={active} />
            <div className="cc-rh-fi-content">
                <div className="cc-rh-fi-title">
                    {item.filename}
                </div>
                <div className="cc-rh-fi-desc">
                    {item.category}
                </div>
            </div>
        </li>
    )
}

export default FilesListItem