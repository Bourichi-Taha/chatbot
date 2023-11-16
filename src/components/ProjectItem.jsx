import React from 'react'
import "../assets/css/projects.css"
import { useNavigate } from 'react-router-dom'

const ProjectItem = ({ item }) => {
    const navigate = useNavigate();
    const ClickHandler = () => {
        navigate(`${item?.project_id}`);
    }
    return (
        <div className="pc-lc-row-item" onClick={ClickHandler}>
            <div className="pc-lc-ri-header">
                {item?.project_name}
            </div>
            <p className="pc-lc-ri-desc">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eligendi nemo facilis et iure quod error dolore fugit! Autem quibusdam unde saepe quisquam aut. Quibusdam maxime culpa quos alias, delectus recusandae facere dolores quae deserunt architecto est impedit magni inventore dolorum suscipit vitae nihil reiciendis illo provident, quas, placeat earum. Magni.
            </p>
            <div className="pc-lc-ri-desc-date">{item?.timestamp?.split("T")[0]}</div>
            <div className="pc-lc-ri-pill">active</div>
        </div>

    )
}

export default ProjectItem