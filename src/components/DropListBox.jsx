import { useNavigate } from "react-router-dom";
const DropListBox = ({ index, itemData }) => {
  const navigate = useNavigate();
  const handleDivClick = (id) => {
    console.log(" just clicked you");
    navigate(`/details/${id}`);
  };

  return (
    <>
      <div
        key={index}
        className=" rounded-2xl  w-[16rem] flex flex-col items-center gap-y-3 bg-gray-300 py-3 shadow-lg shadow-black heading-text-shadow"
      >
        {/* Project Name */}
        <div className="font-bold text-2xl text-center">
          {itemData.projectName}
        </div>

        {/* Project Logo */}
        <div>
          <img
            src={`https://airdroptaskbook-server.vercel.app/uploads/${itemData.projectImage.slice(
              8
            )}`}
            alt={itemData.projectName}
            className="w-10 h-10"
          />
        </div>
        <div
          className="bg-yellow-300 px-4 rounded-xl cursor-pointer"
          onClick={() => {
            handleDivClick(itemData._id);
          }}
        >
          UPDATE
        </div>
      </div>
    </>
  );
};

export default DropListBox;
