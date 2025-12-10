import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import { useContext } from "react";


function Navbar() {
  const auth = useContext(AuthContext);


  return (
    <nav className="text-white flex justify-between items-center w-full h-10">
      <div className="flex gap-4">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/projects">Projects</NavLink>
      </div>

      <div className="flex gap-4">
        <NavLink to="/auth">Signin/Signup</NavLink>
      </div>

      <div className="flex-gap">Welcome{auth?.user?.username}</div>

      
    </nav>
  );
}
export default Navbar;