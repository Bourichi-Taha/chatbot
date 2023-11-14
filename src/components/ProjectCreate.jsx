import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import PageTransition from './PageTransition';
import { Button, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import FileUploader from './FileUploader';
import MarkChatReadIcon from '@mui/icons-material/MarkChatRead';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DatasetOutlinedIcon from '@mui/icons-material/DatasetOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useUploadFileMutation } from '../features/files/filesApiSlice';
import "../assets/css/project.css"
import { useAddProjectMutation } from '../features/projects/ProjectApiSlice';
const ProjectCreate = () => {
    const navigate = useNavigate();
    const [project_name, setProject_Name] = useState("New project");
    const [files, setFiles] = useState([]);
    const [type, setType] = useState("guidelines");
    const [werkinhood, setWerkinhood] = useState("");
    const [client, setClient] = useState("");
    const [contract_type, setContractType] = useState("");
    const [status, setStatus] = useState("");
    const [desc, setDesc] = useState("");
    const [result, setResult] = useState("");
    const [enclosure, setEnclosure] = useState("");
    const [uploadFile] = useUploadFileMutation();
    const [addProject] = useAddProjectMutation();
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const obj = { project_name, werkinhood, client, contract_type, status, enclosure, description: desc,result };
            const res = await addProject(obj);
            if (files.length !== 0) {
                const formData = new FormData();
                formData.append('uploaded_file', files);
                formData.append('project_id', res.data.project_id);
                formData.append('type', type);
                uploadFile(formData);
                setFiles(null)
            }
            navigate(`/projects/${res.data.project_id}`);
        } catch (error) {
            console.log(error);
        }
    }
    return (

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
<FileUploader setFile={setFiles} multi={false} type={type} setType={setType} />
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
                            Create
                        </button>
                    </form>

            </div>
            <PageTransition />
        </div >
    )
}

export default ProjectCreate