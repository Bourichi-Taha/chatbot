import React from 'react'
import "../assets/css/chat.css"



const UserMessage = ({msg}) => {
    return (
        <div className="cc-lmc-bot-container">
            <div className="cc-lmc-bc-body user">
                {msg.response}
            </div>
        </div>
    )
}

export default UserMessage