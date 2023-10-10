import React from 'react'
import "../assets/css/projects.css"
import { useNavigate } from 'react-router-dom'

const ProjectItem = () => {
    const navigate = useNavigate();
    return (
        <div className="pc-lc-row-item" onClick={()=>navigate("/projects/projectName")}>
            <div className="pc-lc-ri-header">
                Project Name goes here
            </div>
            <div className="pc-lc-ri-desc">
                description of the above Project goes here!!
                description of the above Project goes here!!
                description of the above Project goes here!!
                description of the above Project goes here!!
                description of the above Project goes here!!
                description of the above Project goes here!!

            </div>
            <div className="pc-lc-ri-desc-date">12-12-2023</div>
            <div className="pc-lc-ri-pill">active</div>
        </div>

    )
}

export default ProjectItem