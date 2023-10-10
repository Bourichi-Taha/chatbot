import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import PageTransition from './PageTransition';
import { Button, InputAdornment, TextField } from '@mui/material';
import FileUploader from './FileUploader';
import MarkChatReadIcon from '@mui/icons-material/MarkChatRead';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DatasetOutlinedIcon from '@mui/icons-material/DatasetOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useUploadFileMutation } from '../features/files/filesApiSlice';
const ProjectCreate = () => {
    const navigate = useNavigate();
    const [name_of_tender, setNameOfTender] = useState("");
    const [file, setFile] = useState(null);
    const [submission_date, setSubmissionDate] = useState("");
    const [client, setClient] = useState("");
    const [contract_type, setContractType] = useState("");
    const [status, setStatus] = useState("");
    const [results, setResults] = useState("");
    const [categories, setCategories] = useState("");
    const [uploadFile] = useUploadFileMutation();
    const submitHandler = async (e) => {
        e.preventDefault();
        let bodyFormData = new FormData();
        try {
            if (file) {
                bodyFormData.append('name_of_tender', name_of_tender);
                bodyFormData.append('submission_date', submission_date);
                bodyFormData.append('client', client);
                bodyFormData.append('contract_type', contract_type);
                bodyFormData.append('results', results);
                bodyFormData.append('status', status);
                bodyFormData.append('categories', categories);
                bodyFormData.append('file', file, file.name); // Corrected this line

                console.log(bodyFormData);
                const res = await uploadFile(bodyFormData);
                console.log(res);
            } else {
                console.log("no file");
            }
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
                <form className="cc-left-upload-container" onSubmit={submitHandler}>
                    <FileUploader setFile={setFile} />
                    <div className='cc-luc-form' >
                        <div className="cc-luc-form-left">
                            <TextField label="name of tender" variant='outlined' className='cc-luc-form-input' value={name_of_tender} onChange={(e) => setNameOfTender(e.target.value)} />
                            <TextField label="Submission date" variant='outlined' className='cc-luc-form-input' value={submission_date} onChange={(e) => setSubmissionDate(e.target.value)} />
                            <TextField label="client" variant='outlined' className='cc-luc-form-input' value={client} onChange={(e) => setClient(e.target.value)} />
                        </div>
                        <div className="cc-luc-form-right">
                            <TextField label="status" variant='outlined' className='cc-luc-form-input' value={status} onChange={(e) => setStatus(e.target.value)} />
                            <TextField label="result" variant='outlined' className='cc-luc-form-input' value={results} onChange={(e) => setResults(e.target.value)} />
                            <TextField label="contract type" variant='outlined' className='cc-luc-form-input' value={contract_type} onChange={(e) => setContractType(e.target.value)} />
                        </div>
                    </div>
                    <TextField label="category" variant='outlined' className='cc-luc-form-input' value={categories} onChange={(e) => setCategories(e.target.value)} />
                    <button type='submit' className='cc-rf-button-upload'>
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