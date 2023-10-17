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
    const [name_of_tender, setNameOfTender] = useState("");
    const [files, setFiles] = useState([]);
    const [submission_date, setSubmissionDate] = useState("");
    const [client, setClient] = useState("");
    const [contract_type, setContractType] = useState("");
    const [status, setStatus] = useState("");
    const [results, setResults] = useState("");
    const [categories, setCategories] = useState("");
    const [uploadFile] = useUploadFileMutation();
    const [addProject] = useAddProjectMutation();
    const submitHandler = async (e) => {
        e.preventDefault();
        let bodyFormData = new FormData();
        try {
            // if (files.length !== 0) {
            //     bodyFormData.append('name_of_tender', name_of_tender);
            //     bodyFormData.append('submission_date', submission_date);
            //     bodyFormData.append('client', client);
            //     bodyFormData.append('contract_type', contract_type);
            //     bodyFormData.append('results', results);
            //     bodyFormData.append('status', status);
            //     bodyFormData.append('categories', categories);
            //     bodyFormData.append('file', files[0], files[0].name); // Corrected this line

            //     console.log(bodyFormData);
            //     const res = await uploadFile(bodyFormData);
            //     console.log(res);
            // } else {
            //     console.log("no file");
            // }
            const obj = {project_name:name_of_tender};
            let res = await addProject(obj)
            console.log(res)
        } catch (error) {
            console.log(error);
        }
    }
    return (

        <div className='project-item-container' style={{ position: "relative" }}>
            <div className="pci-left">
                <div className="pci-left-header">
                    <div className="pci-lh-left"><span style={{ cursor: "pointer" }} onClick={() => navigate("/projects")}>My Projects</span>/New Project</div>
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
                    <FileUploader setFiles={setFiles} multi />
                    <div className='pci-luc-form' >
                        <div className="pci-luc-form-left">
                            <TextField label="name of tender" variant='outlined' className='pci-luc-form-input' value={name_of_tender} onChange={(e) => setNameOfTender(e.target.value)} />
                            <TextField label="Submission date" variant='outlined' className='pci-luc-form-input' value={submission_date} onChange={(e) => setSubmissionDate(e.target.value)} />
                            <TextField label="client" variant='outlined' className='pci-luc-form-input' value={client} onChange={(e) => setClient(e.target.value)} />
                        </div>
                        <div className="pci-luc-form-right">
                            <FormControl fullWidth>
                                <InputLabel className='pci-luc-fi-label' id="demo-simple-select-label">status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    value={status}
                                    label="status"
                                    onChange={(e) => setStatus(e.target.value)}
                                    className='pci-luc-form-input'
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel className='pci-luc-fi-label' id="demo-simple-select-label-results">results</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label-results"
                                    value={results}
                                    label="results"
                                    onChange={(e) => setResults(e.target.value)}
                                    className='pci-luc-form-input'
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField label="contract type" variant='outlined' className='pci-luc-form-input' value={contract_type} onChange={(e) => setContractType(e.target.value)} />
                        </div>
                    </div>
                    <TextField label="category" variant='outlined' className='pci-luc-form-input' value={categories} onChange={(e) => setCategories(e.target.value)} />
                    <button type='submit' className='pci-rf-button-upload'>
                        <MarkChatReadIcon />
                        Upload
                    </button>
                </form>

            </div>
            <PageTransition />
        </div >
    )
}

export default ProjectCreate