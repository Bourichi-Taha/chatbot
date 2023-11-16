import "../assets/css/projects.css"
import { Button, InputAdornment, TextField } from '@mui/material'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DatasetOutlinedIcon from '@mui/icons-material/DatasetOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useNavigate } from 'react-router-dom';
import ProjectItem from "./ProjectItem";
import PageTransition from "./PageTransition";
import { useFetchUserProjectsQuery } from "../features/projects/ProjectApiSlice";
import ArraySplicer from "../utils/ArraySplicer";

const Projects = () => {

    const navigate = useNavigate();
    const { data,isLoading } = useFetchUserProjectsQuery();
    let content ;
    if (isLoading) {
          content = (
            <div>Loading...</div>
          )
    }else{
        let projects =ArraySplicer(data.results, 4);
        content = (
            <div className="projects-container" style={{ position: "relative" }}>
            <div className="pc-left">
                <div className="pc-left-header">
                    <div className="pc-lh-left">My Projects</div>
                    <div className="pc-lh-right">
                        <TextField
                            className='pc-lh-right-input'
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
                        <Button variant="outlined" className='pc-lh-right-button' onClick={() => navigate("/projects/create")}>
                            <AddCircleOutlineIcon className='pc-lh-rb-icon' />
                        </Button>
                        <Button variant="outlined" className='pc-lh-right-button' onClick={() => navigate("/library")}>
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