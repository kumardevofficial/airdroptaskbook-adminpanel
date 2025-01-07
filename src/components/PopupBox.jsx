const PopUpBox = ({ poupVisiblity }) => {
  // const [visible, setVisible] = React.useState(true);
  const { visible, setVisible } = poupVisiblity;
  console.log(visible);

  // const changeVisibility = () => {
  //   setVisible(false);
  // };

  return (
    visible && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full transform transition-all">
          {/* Button Section */}
          <div className="flex justify-end gap-4">
            {/* Close Button */}
            <button
              onClick={() => {
                setVisible(false);
                console.log(visible);
              }}
              className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
            >
              Close
            </button>

            {/* Open Task Button */}
            <div className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300">
              DELETE
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default PopUpBox;
