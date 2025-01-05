import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="w-[98%] bg-yellow-400 m-auto mt-2 rounded-2xl box-border py-2 px-4 font-bold">
        <ul className="w-full  flex justify-between">
          <li>
            <Link to="/airdropform">Airdrop </Link>
          </li>
          <li>
            <Link to="/projectfomr.jsx">Project</Link>
          </li>
          <li>
            <Link to="/waitlistform">Waitlist</Link>
          </li>
          <li>
            <Link to="/todoform">ToDo</Link>
          </li>
          <li>
            <Link to="/">Login</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
