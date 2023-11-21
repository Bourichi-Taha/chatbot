import React, { useEffect, useState } from 'react'
import "../assets/css/project.css"
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useParams } from 'react-router-dom';
import PageTransition from './PageTransition';
import FilesListItem from './FilesListItem';
import MarkChatReadIcon from '@mui/icons-material/MarkChatRead';
import { useSelectFilesMutation, useUploadFileMutation } from '../features/files/filesApiSlice';
import { selectCurrentSelectedFiles, toggleShow } from '../features/files/filesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useDeleteProjectMutation, useFetchProjectByIdQuery } from '../features/projects/ProjectApiSlice';
import FileUploader from './FileUploader';
import ButtonNav from './ButtonNav';
import BadgeWithName from './BadgeWithName';

const Project = () => {
    const [files, setFiles] = useState(null);
    const [open,setOpen] = useState(false);
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
                            <h3 className="pci-lc-title" style={{ fontSize: 18, color: "#3464c4" }}>{array[i][0] + ":"}</h3>
                            <p className="pci-lc-desc">{array[i][1] || "Not Found"}</p>
                        </div>
                        <div className="pci-lc-col">
                            <h3 className="pci-lc-title" style={{ fontSize: 18, color: "#3464c4" }}>{array[i+1][0] + ":"}</h3>
                            <p className="pci-lc-desc">{array[i+1][1] || "Not Found"}</p>
                        </div>
                    </div>
                )
                result.push(pair);
            }
    
            return result;
        }else{
            return (
                [<h3 className="pci-lc-title" style={{ fontWeight: "bolder",color:"crimson",textAlign:"center" }}>Scores will be affected after being proccessed ...</h3>]
            )
        }

    }
    useEffect(() => {
        const header = document.querySelector(".pci-right-header")
        const body = document.querySelector(".pci-right-history")
        const footer = document.querySelector(".pci-right-footer")
        if (open) {
            setTimeout(() => {
                header?.classList.remove("closed")
                body?.classList.remove("closed")
                footer?.classList.remove("closed")
            }, 200);
        } else {
            setTimeout(() => {
                header?.classList.add("closed")
                body?.classList.add("closed")
                footer?.classList.add("closed")
            }, 100);
        }
    }, [open]);
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
                            <ButtonNav Comp={DeleteForeverOutlinedIcon} text={"Delete"} onClick={deleteHandler} />
                            <ButtonNav Comp={BorderColorOutlinedIcon} text={"Edit"} onClick={() => navigate("edit")} />
                            <ButtonNav Comp={AttachFileIcon} text={"Files & Chat"} onClick={() => setOpen(true)} />
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
                <div className={open ? "pci-right" : "pci-right closed"}>
                    <div className={open ?"pci-right-header":"pci-right-header closed"}>
                        <BadgeWithName length={project?.files?.length} name={"Files"} />
                        <ButtonNav Comp={CloseIcon} text={"Close"} onClick={(e)=>{setOpen(false)}}/>
                    </div>
                    <ul className={open ? "pci-right-history" : "pci-right-history closed"}>
                        {
                            project?.files?.map((f, index) => {
                                return (
                                    <FilesListItem key={index} item={f} />
                                )
                            })
                        }
                    </ul>
                    <div className={open ? "pci-right-footer" : "pci-right-footer closed"}>
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