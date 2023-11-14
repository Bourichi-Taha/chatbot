import React, { useEffect, useState } from 'react'
import "../assets/css/project.css"
import { Button, InputAdornment, TextField } from '@mui/material';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useNavigate, useParams } from 'react-router-dom';
import PageTransition from './PageTransition';
import FilesListItem from './FilesListItem';
import MarkChatReadIcon from '@mui/icons-material/MarkChatRead';
import { useSelectFilesMutation, useUploadFileMutation } from '../features/files/filesApiSlice';
import { selectCurrentSelectedFiles, toggleShow } from '../features/files/filesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useDeleteProjectMutation, useFetchProjectByIdQuery } from '../features/projects/ProjectApiSlice';
import FileUploader from './FileUploader';

const Project = () => {
    const [files, setFiles] = useState(null);
    const [type, setType] = useState("guidelines");
    const project_id = useParams().projectId;
    const navigate = useNavigate();
    const [selectFiles] = useSelectFilesMutation();
    const [uploadFile] = useUploadFileMutation();
    const [deleteProject] = useDeleteProjectMutation();
    const selectedFiles = useSelector(selectCurrentSelectedFiles);
    const { data: project, isLoading } = useFetchProjectByIdQuery(project_id)
    const dispatch = useDispatch();
    const startChatting = async (e) => {
        e.preventDefault();
        try {
            await selectFiles({ fileNames: selectedFiles, project_id })
            navigate(`/chatbot/${project_id}`)
        } catch (error) {
            console.log(error)

        }
    }
    const uploadFiles = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        try {
            formData.append('uploaded_file', files);
            formData.append('project_id', project_id);
            formData.append('type', type);
            uploadFile(formData);
            setFiles(null)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        dispatch(toggleShow(true));
    }, [files, dispatch]);
    const deleteHandler = async () => {
        try {
            await deleteProject(project_id);
            navigate('/projects')
        } catch (error) {
            console.log(error);
        }
    }
    const renderScores = () => {
        if (project && project.extracted_scores !== null) {
            const result = [];
            const array = Object.entries(project.extracted_scores);
            for (let i = 0; i < array.length; i += 2) {
                const pair = (
                    <div className="pci-lc-row">
                        <div className="pci-lc-col">
                            <h3 className="pci-lc-title" style={{ fontSize: 18, color: "#3d3d3d" }}>{array[i][0] + ":"}</h3>
                            <p className="pci-lc-desc">{array[i][1] || "Not Found"}</p>
                        </div>
                        <div className="pci-lc-col">
                            <h3 className="pci-lc-title" style={{ fontSize: 18, color: "#3d3d3d" }}>{array[i+1][0] + ":"}</h3>
                            <p className="pci-lc-desc">{array[i+1][1] || "Not Found"}</p>
                        </div>
                    </div>
                )
                result.push(pair);
            }
    
            return result;
        }else{
            return (
                <h3 className="pci-lc-title" style={{ fontWeight: "bolder",color:"crimson",textAlign:"center" }}>Scores will be affected after being proccessed ...</h3>
            )
        }

    }
    let content;
    if (isLoading) {
        content = (
            <div>Loading...</div>
        )
    } else {
        content = (
            <div className='project-item-container' style={{ position: "relative" }}>
                <div className="pci-left">
                    <div className="pci-left-header">
                        <div className="pci-lh-left" ><span style={{ cursor: "pointer" }} onClick={() => navigate("/projects")}>My Projects</span>/{project?.project_name}</div>
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
                            <Button variant="outlined" className='pci-lh-right-button' onClick={deleteHandler}>
                                <DeleteForeverOutlinedIcon className='pci-lh-rb-icon' />
                            </Button>
                            <Button variant="outlined" className='pci-lh-right-button' onClick={() => navigate("edit")}>
                                <BorderColorOutlinedIcon className='pci-lh-rb-icon' />
                            </Button>
                        </div>
                    </div>
                    <div className="pci-left-content">
                        <h3 className="pci-lc-title">Description:</h3>
                        <p className="pci-lc-desc full">{project.description || "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas dolores voluptate reiciendis dignissimos, expedita earum nesciunt voluptatum omnis ut quod."}</p>


                        <div className="pci-lc-row">
                            <div className="pci-lc-col">
                                <h3 className="pci-lc-title">Werkinhoud:</h3>
                                <p className="pci-lc-desc">{project.werkinhood || "NAN"}</p>
                            </div>
                            <div className="pci-lc-col">
                                <h3 className="pci-lc-title">Enclosure:</h3>
                                <p className="pci-lc-desc">{project.enclosure || "NAN"}</p>
                            </div>
                        </div>
                        <div className="pci-lc-row">
                            <div className="pci-lc-col">
                                <h3 className="pci-lc-title">Contract type:</h3>
                                <p className="pci-lc-desc">{project.contract_type || "NAN"}</p>
                            </div>
                            <div className="pci-lc-col">
                                <h3 className="pci-lc-title">Client:</h3>
                                <p className="pci-lc-desc">{project.client || "NAN"}</p>
                            </div>
                        </div>
                        <div className="pci-lc-row">
                            <div className="pci-lc-col">
                                <h3 className="pci-lc-title">Status:</h3>
                                <p className="pci-lc-desc">{project.status || "In progress"}</p>
                            </div>
                            <div className="pci-lc-col">
                                <h3 className="pci-lc-title">Results:</h3>
                                <p className="pci-lc-desc">{project.result || "Pending"}</p>
                            </div>
                        </div>
                        <h3 className="pci-lc-title" style={{ fontWeight: "bolder" }}>Extracted scores:</h3>
                        {/* <p className="pci-lc-desc full">{project.extracted_scores || '"overall": "","Organisatie van het werk": "5,40","Borgen bereikbaarheid, veiligheid, voorkomen hinder": "5,00","Invulling digitalisering opdracht": "5,27","Voorbereiding en kostencalculatie deelopdrachten": "6,00","Inrichten groeiplaats": "4,72","Planten van bomen": "4,60","Nazorgfase": "5,35","Brandstoffen < 3500kg": "120.000","Brandstoffen > 3500kg": "0","CO2-prestatieladder": "275.000","Extra inzet SROI": "50.000"'}</p> */}
                        {
                            renderScores().map((itemScore) => {
                                return itemScore
                            })

                        }

                    </div>
                </div>
                <div className="pci-right">
                    <div className="pci-right-header">
                        <p>Files</p>
                        <div className='pci-rh-total'>{project?.files?.length}</div>
                    </div>
                    <ul className="pci-right-history">
                        {
                            project?.files?.map((f, index) => {
                                return (
                                    <FilesListItem key={index} item={f} />
                                )
                            })
                        }
                    </ul>
                    <div className="pci-right-footer">
                        <FileUploader type={type} setType={setType} setFile={setFiles} multi={false} />
                        {
                            files ?
                                <button className='cc-rf-button' onClick={uploadFiles}>
                                    <CloudUploadOutlinedIcon />
                                    Upload File
                                </button>
                                :
                                null
                        }
                        <button className='cc-rf-button' onClick={startChatting}>
                            <MarkChatReadIcon />
                            Start Chatting
                        </button>
                    </div>
                </div>
                <PageTransition />
            </div>
        )
    }
    return content
}

export default Project