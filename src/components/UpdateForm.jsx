import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateForm = () => {
  const { id } = useParams();
  const [projectDetails, setProjectDetails] = useState({
    projectLink: "",
    xlink: "",
    discordLink: "",
    telegramLink: "",
  });
  const [tasks, setTasks] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://airdroptaskbook-server.vercel.app/project/details/${id}` // Replace with your actual API endpoint
        );
        const {
          projectLink,
          xlink,
          discordLink,
          telegramLink,
          tasks,
          projectName,
        } = response.data;

        setProjectDetails({ projectLink, xlink, discordLink, telegramLink });
        setTasks(tasks);
        setProjectName(projectName);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleProjectChange = (e) => {
    const { name, value } = e.target;
    setProjectDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
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

    try {
      const response = await axios.put(
        `https://airdroptaskbook-server.vercel.app/project/update-project/${id}`, // Pass the project ID in the URL
        {
          ...projectDetails,
          tasks: [...tasks],
        }
      );
      console.log("Response:", response.data);
      alert("Project updated successfully!");
    } catch (error) {
      console.error("Error updating project:", error);
      alert("Failed to update the project. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>; // Show a loading state
  if (error) return <div>Error: {error}</div>; // Show an error message if any

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-6 bg-orange-400 shadow-md rounded-lg mt-[5%]"
    >
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Update Project {projectName}
      </h1>

      <div className="grid grid-cols-1 gap-6 mb-8">
        {[
          { label: "Project Link", id: "projectLink" },
          { label: "X Link", id: "xlink" },
          { label: "Discord Link", id: "discordLink" },
          { label: "Telegram Link", id: "telegramLink" },
        ].map(({ label, id }) => (
          <div key={id}>
            <label
              htmlFor={id}
              className="block text-gray-700 font-bold text-[1.1rem] px-1 py-1"
            >
              {label}
            </label>
            <input
              type="text"
              id={id}
              name={id}
              value={projectDetails[id] || ""}
              onChange={handleProjectChange}
              className="w-full border rounded-lg px-4 py-2 text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
        UPDATE
      </button>
    </form>
  );
};

export default UpdateForm;
