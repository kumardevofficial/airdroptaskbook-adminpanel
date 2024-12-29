import axios from "axios";
import { useState } from "react";

const TodoForm = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    logoUrl: "",
    projectLink: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://airdroptaskbook-server.vercel.app/airdrop/airdropform",
        formData
      );
      console.log("Form submitted successfully:", response.data);
      // Reset form fields
      setFormData({
        projectName: "",
        logoUrl: "",
        projectLink: "",
      });
    } catch (error) {
      console.error(
        "Error submitting the form:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Todo Form
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="projectName"
              className="block text-sm font-medium text-gray-700"
            >
              Project Name
            </label>
            <input
              value={formData.projectName}
              type="text"
              id="projectName"
              name="projectName"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label
              htmlFor="logoUrl"
              className="block text-sm font-medium text-gray-700"
            >
              Logo URL
            </label>
            <input
              value={formData.logoUrl}
              type="url" // Use 'url' for better validation
              id="logoUrl"
              name="logoUrl"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={handleOnChange}
            />
          </div>
          <div>
            <label
              htmlFor="projectLink"
              className="block text-sm font-medium text-gray-700"
            >
              Project Link
            </label>
            <input
              value={formData.projectLink}
              type="url" // Use 'url' for better validation
              id="projectLink"
              name="projectLink"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              onChange={handleOnChange}
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TodoForm;
