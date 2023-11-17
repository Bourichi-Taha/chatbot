import React, { useEffect, useState } from "react";
import "../assets/css/project.css";
import { Button, InputAdornment, TextField } from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useNavigate, useParams } from "react-router-dom";
import PageTransition from "./PageTransition";
import FilesListItem from "./FilesListItem";
import MarkChatReadIcon from "@mui/icons-material/MarkChatRead";
import {
  useSelectFilesMutation,
  useUploadFileMutation,
} from "../features/files/filesApiSlice";
import {
  selectCurrentSelectedFiles,
  toggleShow,
} from "../features/files/filesSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  useDeleteProjectMutation,
  useFetchProjectByIdQuery,
} from "../features/projects/ProjectApiSlice";
import FileUploader from "./FileUploader";
import { TextInput } from "./ui/TextInput";

const Project = () => {
  const [files, setFiles] = useState(null);
  const [type, setType] = useState("guidelines");
  const project_id = useParams().projectId;
  const navigate = useNavigate();
  const [selectFiles] = useSelectFilesMutation();
  const [uploadFile] = useUploadFileMutation();
  const [deleteProject] = useDeleteProjectMutation();
  const selectedFiles = useSelector(selectCurrentSelectedFiles);
  const { data: project, isLoading } = useFetchProjectByIdQuery(project_id);

  const dispatch = useDispatch();
  const startChatting = async (e) => {
    e.preventDefault();
    try {
      await selectFiles({ fileNames: selectedFiles, project_id });
      navigate(`/chatbot/${project_id}`);
    } catch (error) {
      console.log(error);
    }
  };
  const uploadFiles = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    try {
      formData.append("uploaded_file", files);
      formData.append("project_id", project_id);
      formData.append("type", type);
      uploadFile(formData);
      setFiles(null);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(toggleShow(true));
  }, [files, dispatch]);
  const deleteHandler = async () => {
    try {
      await deleteProject(project_id);
      navigate("/projects");
    } catch (error) {
      console.log(error);
    }
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div className="project-item-container" style={{ position: "relative" }}>
      <div className="pci-left">
        <div className="pci-left-header">
          <div className="pci-lh-left">
            <span
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/projects")}
            >
              My Projects
            </span>
            /{project?.project_name}
          </div>
          <div className="pci-lh-right">
            <TextField
              className="pci-lh-right-input"
              variant="outlined"
              placeholder="Search"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="outlined"
              className="pci-lh-right-button"
              onClick={deleteHandler}
            >
              <DeleteForeverOutlinedIcon className="pci-lh-rb-icon" />
            </Button>
            <Button
              variant="outlined"
              className="pci-lh-right-button"
              onClick={() => navigate("edit")}
            >
              <BorderColorOutlinedIcon className="pci-lh-rb-icon" />
            </Button>
          </div>
        </div>
        <div className="pci-left-content">
          <form>
            <div className="">
              <div className="pb-12">
                <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="col-span-full">
                    <label
                      htmlFor="about"
                      className="block text-lg font-medium leading-6 text-gray-900"
                    >
                      Description:
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="about"
                        name="about"
                        rows="3"
                        value={project.description}
                        disabled
                        className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary outline-0 sm:text-sm md:text-md sm:leading-6"
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-b border-gray-900/10 pb-12">
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <TextInput
                    value={project.werkinhood}
                    name="werkinhood"
                    text="Work content"
                  />

                  <TextInput
                    value={project.enclosure}
                    name="enclosure"
                    text="Enclosure"
                  />
                  <TextInput
                    value={project.contract_type}
                    name="contract_type"
                    text="Contract type"
                  />
                  <TextInput
                    value={project.client}
                    name="client"
                    text="Client"
                  />
                  <TextInput
                    value={project.status}
                    name="status"
                    text="Status"
                  />
                  <TextInput
                    value={project.result}
                    name="result"
                    text="Result"
                  />
                </div>
              </div>
            </div>
          </form>

          <h3 className="pci-lc-title" style={{ fontWeight: "bolder" }}>
            Extracted scores:
          </h3>
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            {project &&
              project.extracted_scores &&
              Object.keys(project.extracted_scores).map((a, i) => (
                <TextInput
                  value={project.extracted_scores[a]}
                  name={"field_" + i}
                  text={a.charAt(0).toUpperCase() + a.slice(1)}
                  disabled={true}
                />
              ))}
          </div>
        </div>
      </div>
      <div className="pci-right">
        <div className="pci-right-header">
          <p>Files</p>
          <div className="cc-rh-total">{project?.files?.length}</div>
        </div>
        <ul className="pci-right-history">
          {project?.files?.map((f, index) => {
            return <FilesListItem key={index} item={f} />;
          })}
        </ul>
        <div className="pci-right-footer">
          <FileUploader
            type={type}
            setType={setType}
            setFile={setFiles}
            multi={false}
          />
          {files ? (
            <button className="cc-rf-button" onClick={uploadFiles}>
              <CloudUploadOutlinedIcon />
              Upload File
            </button>
          ) : null}
          <button className="cc-rf-button" onClick={startChatting}>
            <MarkChatReadIcon />
            Start Chatting
          </button>
        </div>
      </div>
      <PageTransition />
    </div>
  );
};

export default Project;
