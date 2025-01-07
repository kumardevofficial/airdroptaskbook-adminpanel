import React, { useState } from "react";
import axios from "axios";

const ProjectForm = () => {
  const [projectDetails, setProjectDetails] = useState({
    projectName: "",
    projectImage: "",
    projectLink: "",
    xlink: "",
    discordLink: "",
    telegramLink: "",
  });

  const [tasks, setTasks] = useState([
    { taskName: "", taskLink: "", taskDescription: "" },
  ]);

  const handleProjectChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "projectImage") {
      if (files[0] && !files[0].type.includes("jpeg")) {
        alert("Only JPEG images are allowed.");
        return;
      }
      setProjectDetails((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    } else {
      setProjectDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleTaskChange = (index, field, value) => {
    const updatedTasks = [...tasks];
    updatedTasks[index][field] = value;
    setTasks(updatedTasks);
  };

  const addTask = () => {
    setTasks([...tasks, { taskName: "", taskLink: "", taskDescription: "" }]);
  };

  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const validateForm = () => {
    if (!projectDetails.projectName) {
      alert("Project Name is required.");
      return false;
    }
    if (!projectDetails.projectImage) {
      alert("Project Image is required.");
      return false;
    }
    if (
      !projectDetails.projectLink ||
      !/^https?:\/\//i.test(projectDetails.projectLink)
    ) {
      alert("A valid Project Link is required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Prepare form data for submission
    const formData = new FormData();
    formData.append("projectName", projectDetails.projectName);
    formData.append("projectImage", projectDetails.projectImage);
    formData.append("projectLink", projectDetails.projectLink);
    formData.append("xlink", projectDetails.xlink);
    formData.append("discordLink", projectDetails.discordLink);
    formData.append("telegramLink", projectDetails.telegramLink);
    formData.append("tasks", JSON.stringify(tasks));

    try {
      const response = await axios.post(
        "https://airdroptaskbook-server.vercel.app/project/create-project",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Response:", response.data);
      alert("Project submitted successfully!");
    } catch (error) {
      console.error("Error submitting project:", error);
      alert("Failed to submit the project. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-6 bg-orange-400 shadow-md rounded-lg mt-[5%] "
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Project Submission Form
      </h1>

      <div className="grid grid-cols-1 gap-6 mb-8">
        {[
          {
            label: "Project Name",
            id: "projectName",
            type: "text",
            required: true,
          },
          {
            label: "Project Image",
            id: "projectImage",
            type: "file",
            required: true,
          },
          {
            label: "Project Link",
            id: "projectLink",
            type: "text",
            required: true,
          },
          {
            label: "X Link",
            id: "xlink",
            type: "text",
          },
          {
            label: "Discord Link",
            id: "discordLink",
            type: "text",
          },
          {
            label: "Telegram Link",
            id: "telegramLink",
            type: "text",
          },
        ].map(({ label, id, type, required }) => (
          <div key={id}>
            <label
              htmlFor={id}
              className="block text-gray-700 font-bold text-[1.1rem] px-1 py-1"
            >
              {label}
            </label>
            <input
              type={type}
              id={id}
              name={id}
              onChange={handleProjectChange}
              className="w-full border rounded-lg px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required={required}
            />
          </div>
        ))}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Tasks</h2>
        {tasks.map((task, index) => (
          <div
            key={index}
            className="grid grid-cols-1 gap-4 mb-6 p-4 border border-gray-200 rounded-lg shadow-sm bg-white"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Task Name
              </label>
              <input
                type="text"
                value={task.taskName}
                onChange={(e) =>
                  handleTaskChange(index, "taskName", e.target.value)
                }
                className="w-full border rounded-lg px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Task Link
              </label>
              <input
                type="text"
                value={task.taskLink}
                onChange={(e) =>
                  handleTaskChange(index, "taskLink", e.target.value)
                }
                className="w-full border rounded-lg px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Task Description
              </label>
              <textarea
                value={task.taskDescription}
                onChange={(e) =>
                  handleTaskChange(index, "taskDescription", e.target.value)
                }
                className="w-full border rounded-lg px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="button"
              onClick={() => removeTask(index)}
              className="text-red-500 text-sm hover:text-red-700"
            >
              Remove Task
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
        >
          Add Task
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-white text-black px-6 py-3 rounded-lg shadow-md hover:bg-gray-400 transition duration-200"
      >
        Submit
      </button>
    </form>
  );
};

export default ProjectForm;
