import "../assets/css/projects.css"
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DatasetOutlinedIcon from '@mui/icons-material/DatasetOutlined';
import { useNavigate } from 'react-router-dom';
import ProjectItem from "./ProjectItem";
import PageTransition from "./PageTransition";
import { useFetchUserProjectsQuery } from "../features/projects/ProjectApiSlice";
import ArraySplicer from "../utils/ArraySplicer";
import ButtonNav from "./ButtonNav";

const Projects = () => {

    const navigate = useNavigate();
    const { data, isLoading } = useFetchUserProjectsQuery();
    let content;
    if (isLoading) {
        content = (
            <div>Loading...</div>
        )
    } else {
        content = (
            <div className="projects-container" style={{ position: "relative" }}>
                <div className="pc-left">
                    <div className="pc-left-header">
                        <div className="pc-lh-left">My Projects</div>
                        <div className="pc-lh-right">
                            <ButtonNav Comp={AddCircleOutlineIcon} text={"add"} onClick={() => navigate("/projects/create")} />
                            <ButtonNav Comp={DatasetOutlinedIcon} text={"Library"} onClick={() => navigate("/library")} />
                        </div>
                    </div>
                    <div className="pc-left-content">
                        <div className="pc-lc-row" >
                            {
                                data.results?.map((item, index) => {
                                    return (<ProjectItem key={index} item={item} />)
                                })
                            }
                        </div>
                    </div>


                </div>
                <PageTransition />
            </div>
        )
    }
    return content
}

export default Projects