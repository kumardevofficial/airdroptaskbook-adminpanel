import DropListBox from "./DropListBox";
import { useEffect, useState } from "react";
import axios from "axios";
import { ScaleLoader } from "react-spinners";
import StylishSearchBox from "./StylishSerachBox";

const HomePage = () => {
  const [airdropList, setAirdropList] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state

  const getData = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get(
        "https://airdroptaskbook-server.vercel.app/project/all-project"
      );
      setAirdropList(response.data);
    } catch (err) {
      console.log(`There is some error: ${err}`);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <StylishSearchBox />
      {/* Conditionally show the spinner */}
      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <ScaleLoader color="#4A90E2" />
        </div>
      ) : (
        <div className="w-[98%] m-auto mt-[2%] grid-cols-1 grid md:grid-cols-4 grid-rows-3 place-items-center items-start gap-y-7 gap-x-3">
          {airdropList.map((item, index) => (
            <DropListBox
              key={index} // Add a key for each item
              index={index}
              itemData={item}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default HomePage;
