import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import PageTransition from './PageTransition';
import { Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import MarkChatReadIcon from '@mui/icons-material/MarkChatRead';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DatasetOutlinedIcon from '@mui/icons-material/DatasetOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import "../assets/css/project.css"
import { useFetchProjectByIdQuery, useUpdateProjectMutation } from '../features/projects/ProjectApiSlice';

const ProjectEdit = () => {
    const navigate = useNavigate();
    const project_id = useParams().projectId;
    const { data: project, isLoading, isSuccess } = useFetchProjectByIdQuery(project_id);
    const [project_name, setProject_Name] = useState("");
    const [werkinhood, setWerkinhood] = useState("");
    const [client, setClient] = useState("");
    const [contract_type, setContractType] = useState("");
    const [status, setStatus] = useState("");
    const [desc, setDesc] = useState("");
    const [result, setResult] = useState("");
    const [enclosure, setEnclosure] = useState("");
    const [updateProject] = useUpdateProjectMutation();
    useEffect(() => {
        if (isSuccess && project) {
            setProject_Name(project.project_name);
            setWerkinhood(project.werkinhood);
            setClient(project.client);
            setContractType("NAN");
            setStatus(project.status || "in progress");
            setDesc(project.description);
            setResult(project.result || "in progress");
            setEnclosure(project.enclosure || "NAN");
        }
    }, [project, isSuccess])
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const obj = { project_name, werkinhood, client, contract_type, status, result, description: desc,enclosure };
            await updateProject({data:obj,project_id:project_id});
            navigate(`/projects/${project_id}`);
        } catch (error) {
            console.log(error);
        }
    }
    let content;
    if (isLoading) {
        content = (<div>Loading ...</div>)
    } else {
        content = (
            <div className='project-item-container' style={{ position: "relative" }}>
                <div className="pci-left">
                    <div className="pci-left-header">
                        <div className="pci-lh-left"><span style={{ cursor: "pointer" }} onClick={() => navigate("/projects")}>My Projects</span>/{project_name}</div>
                        <div className="pci-lh-right">
                            <TextField
                                className='pci-lh-right-input'
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
                            <Button variant="outlined" className='pci-lh-right-button'>
                                <AddCircleOutlineIcon className='pci-lh-rb-icon' />
                            </Button>
                            <Button variant="outlined" className='pci-lh-right-button' onClick={() => navigate("/chat-files")}>
                                <DatasetOutlinedIcon className='pci-lh-rb-icon' />
                            </Button>
                        </div>
                    </div>
                    <form className="pci-left-upload-container" onSubmit={submitHandler}>
                        <div className='pci-luc-form' >
                            <div className="pci-luc-form-left">
                                <TextField label="Project name" variant='outlined' className='pci-luc-form-input' value={project_name} onChange={(e) => setProject_Name(e.target.value)} />
                                <TextField label="client" variant='outlined' className='pci-luc-form-input' value={client} onChange={(e) => setClient(e.target.value)} />
                                <TextField label="Enclosure" variant='outlined' className='pci-luc-form-input' value={enclosure} onChange={(e) => setEnclosure(e.target.value)} />
                            </div>
                            <div className="pci-luc-form-right">
                                <FormControl fullWidth>
                                    <InputLabel className='pci-luc-fi-label' id="demo-simple-select-label">Status</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        value={status}
                                        label="Status"
                                        onChange={(e) => setStatus(e.target.value)}
                                        className='pci-luc-form-input'
                                    >
                                        <MenuItem value={"in progress"}>In progress</MenuItem>
                                        <MenuItem value={"pending"}>Pending</MenuItem>
                                        <MenuItem value={"finished"}>Finished</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth>
                                    <InputLabel className='pci-luc-fi-label' id="demo-simple-select-label-results">Result</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label-results"
                                        value={result}
                                        label="Result"
                                        onChange={(e) => setResult(e.target.value)}
                                        className='pci-luc-form-input'
                                    >
                                        <MenuItem value={"WON"}>Won</MenuItem>
                                        <MenuItem value={"LOST"}>Lost</MenuItem>
                                        <MenuItem value={"PENDING"}>Pending</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField label="Contract type" variant='outlined' className='pci-luc-form-input' value={contract_type} onChange={(e) => setContractType(e.target.value)} />
                            </div>
                        </div>
                        <TextField label="werkinhood" multiline maxRows={2} minRows={2} variant='outlined' className='pci-luc-form-input' value={werkinhood} onChange={(e) => setWerkinhood(e.target.value)} />
                        <TextField label="Description" multiline maxRows={4} minRows={4} variant='outlined' className='pci-luc-form-input' value={desc} onChange={(e) => setDesc(e.target.value)} />
                        <button type='submit' className='pci-rf-button-upload'>
                            <MarkChatReadIcon />
                            Update
                        </button>
                    </form>

                </div>
                <PageTransition />
            </div >
        )
    }
    return content;
}

export default ProjectEdit