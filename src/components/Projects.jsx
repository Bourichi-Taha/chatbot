import "../assets/css/projects.css"
import { InputAdornment, TextField } from '@mui/material'
import { Button } from './ui/Button'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DatasetOutlinedIcon from '@mui/icons-material/DatasetOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useNavigate } from 'react-router-dom';
import ProjectItem from "./ProjectItem";
import PageTransition from "./PageTransition";
import { useFetchUserProjectsQuery } from "../features/projects/ProjectApiSlice";
import ArraySplicer from "../utils/ArraySplicer";
import { Loader } from "./ui/Loader";

const Projects = () => {

    const navigate = useNavigate();
    const { data,isLoading } = useFetchUserProjectsQuery();
    let content ;
    if (isLoading) {
          content = (
            <Loader/>
          )
    }else{
        let projects =ArraySplicer(data.results, 4);
        // let projects = data.results;
        content = (
            <div className="projects-container" style={{ position: "relative" }}>
            <div className="pc-left">
                <div className="pc-left-header">
                    <div className="pc-lh-left">My Projects</div>
                    <div className="pc-lh-right">
                        <TextField
                            className='pc-lh-right-input'
                            placeholder='Search'
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchOutlinedIcon />
                                    </InputAdornment>
                                )
                            }}
                        />
                        <Button onClick={() => navigate("/projects/create")}>
                            <AddCircleOutlineIcon className='pc-lh-rb-icon' />
                        </Button>
                        <Button onClick={() => navigate("/library")}>
                            <DatasetOutlinedIcon className='pc-lh-rb-icon' />
                        </Button>
                    </div>
                </div>
                <div className="pc-left-content">
                        {projects?.map((arr,key) => {
                            return (
                               
                                
                                    arr?.map((item, index) => {
                                        return (<ProjectItem key={index} item={item} />)
                                    })
                            
                               
                            )
                        })}
                        
                </div>


            </div>
            <PageTransition />
        </div>
        )
    }
    return content
}

export default Projects