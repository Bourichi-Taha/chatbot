import React from 'react'
import "../assets/css/chat.css"
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';



const BotMessage = ({msg}) => {
    return (
        <div className="cc-lmc-bot-container">
            <div className="cc-lmc-bc-body">
                <p>
                    {msg.response}
                </p>
                <div className="cc-lmc-bc-actions">
                    <div className="cc-lmc-bc-actions-left">
                        <div className='cc-lmc-bc-actions-icon-holder'>
                            <ContentCopyOutlinedIcon sx={{ fontSize: 18 }} />
                        </div>
                        <div className='cc-lmc-bc-actions-icon-holder'>
                            <ThumbUpOutlinedIcon sx={{ fontSize: 18 }} />
                        </div>
                        <div className='cc-lmc-bc-actions-icon-holder'>
                            <ThumbDownOffAltOutlinedIcon sx={{ fontSize: 18 }} />
                        </div>
                    </div>
                    <div className="cc-lmc-bc-actions-right">2 hours ago</div>
                </div>
            </div>

        </div>
    )
}

export default BotMessage