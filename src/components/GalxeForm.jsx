import { useState } from "react";
import axios from "axios";

const GalxeForm = () => {
  const [formData, setFormData] = useState({
    projectName: "",
    logoUrl: "",
    projectLink: "",
  });

  const [successMessage, setSuccessMessage] = useState(""); // New state for success feedback
  const [errorMessage, setErrorMessage] = useState(""); // New state for error feedback

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage(""); // Reset success message
    setErrorMessage(""); // Reset error message

    try {
      const response = await axios.post(
        "https://airdroptaskbook-server.vercel.app/galxeairdrop/galxeairdropform",
        formData
      );
      setSuccessMessage("Form submitted successfully!");
      setFormData({ projectName: "", logoUrl: "", projectLink: "" }); // Reset form data
      console.log(response.data);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "An error occurred while submitting the form."
      );
      console.error("Error details:", error.response || error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Galxe Airdrop Form
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
              type="url" // Updated for URL validation
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
              type="url" // Updated for URL validation
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
        {successMessage && (
          <p className="text-green-600 text-sm mt-4">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="text-red-600 text-sm mt-4">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default GalxeForm;
