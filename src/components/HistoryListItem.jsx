import React from 'react'
import "../assets/css/chat.css"
import { useDispatch } from 'react-redux'
import { setConversation } from '../features/messages/messagesSlice';


const HistoryListItem = ({item}) => {
    // const [active,setActive] = useState(false);
    const dispatch = useDispatch();
    const ClickHandler = (e) => {
        const allListItems = document.querySelectorAll(".cc-rh-item");
        allListItems.forEach((item)=>{
            return item.classList.remove("active");
        });
        e.currentTarget.classList.add('active')
        dispatch(setConversation(item.id))
    }
    return (
        <li onClick={ClickHandler} className={"cc-rh-item"}>
            <div className="cc-rh-item-title">
                {item.title}
            </div>
            <div className="cc-rh-item-desc">
                {"has anyone before beated stockfish in chess".substring(0, 34) + "..."}
            </div>
        </li>
    )
}

export default HistoryListItem