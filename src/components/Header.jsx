import { useAuth } from "../Context/AuthContext";
import newLogo from "../assets/newLogo.jpg";
import avatar from "../assets/Profile_avatar_placeholder_large.png";
import { NavLink } from "react-router-dom";

function Header() {
  const { auth } = useAuth();
  const isAuthenticated = Object.keys(auth).length > 0;

  return (
    <header className=" laptop:flex laptop:items-center justify-between ">
      <div className=" laptop:flex jlaptop:ustify-between laptop:gap-52 phone:grid phone:grid-rows-1">
        <img
          src={newLogo}
          alt="App logo"
          className=" laptop:w-[400px] phone:w-[400px]"
        />
        <h1 className=" text-7xl font-abc  text-gray-800 font-extrabold ">
          The Medical Quiz
        </h1>
      </div>

      {isAuthenticated && (
        <div className=" flex justify-end mr-4">
          <NavLink to={`/${auth?.foundUser?._id}`}>
            <img
              src={avatar}
              alt="avatar"
              className="w-8 h-8 rounded-full mr-0"
            />
          </NavLink>
        </div>
      )}
    </header>
  );
}

export default Header;
