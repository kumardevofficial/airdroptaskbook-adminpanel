import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const DetailsPage = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://airdroptaskbook-server.vercel.app/project/details/${id}` // Replace with your actual API endpoint
        );
        console.log(response.data);
        setItem(response.data); // Set the fetched data
        setLoading(false); // Mark as no longer loading
      } catch (err) {
        setError(err.message); // Handle errors
        setLoading(false); // Mark as no longer loading
      }
    };

    fetchData();
  }, [id]); // Run the effect when the `id` changes

  if (loading) return <div>Loading...</div>; // Show a loading state
  if (error) return <div>Error: {error}</div>; // Show an error message if any
  if (!item) return <div>No data found for ID: {id}</div>; // Handle missing data

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{item.projectName}</h1>
      {/* <p>{item.tasks.taskDescription}</p> */}
    </div>
  );
};

export default DetailsPage;
