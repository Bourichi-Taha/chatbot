import React, { useState } from "react";
import {
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useGetProjectsQuery,
  useUpdateProjectMutation,
} from "../features/projectsApi/projectApiSlice";

const MyForm = () => {
  const [createProject] = useCreateProjectMutation();
  const [updateProject] = useUpdateProjectMutation();
  const [deleteProject] = useDeleteProjectMutation();
  const { data: projects } = useGetProjectsQuery();
  const [formData, setFormData] = useState({
    project_name: "",
    werkinhood: "",
    result: "",
    client: "",
    description: "",
  });

  const handleDelete = async (projectId) => {
    try {
      await deleteProject({ id: projectId });
      console.log("Project deleted successfully!");
    } catch (error) {
      console.error("Failed to delete project", error);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await updateProject({
        projectId: 3,
        updatedData: formData,
      });
    } catch (error) {
      console.error("Failed to update project", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await createProject(formData);
      console.log("Project created successfully!");
    } catch (error) {
      console.error("Failed to create project", error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Project Name:
        <ul>
          {projects &&
            projects.map((project) => (
              <li key={project.project_id}>
                {project.project_name}
                <button onClick={() => handleDelete(project.project_id)}>
                  Delete
                </button>
              </li>
            ))}
        </ul>
        <button
          type="button"
          onClick={handleUpdate}
        >
          Update
        </button>
        <input
          type="text"
          name="project_name"
          value={formData.project_name}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Werkinhood:
        <input
          type="text"
          name="werkinhood"
          value={formData.werkinhood}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Result:
        <input
          type="text"
          name="result"
          value={formData.result}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Client:
        <input
          type="text"
          name="client"
          value={formData.client}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
      </label>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
