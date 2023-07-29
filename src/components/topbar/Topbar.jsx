import { useContext } from "react";
import "./topbar.css";
import { Context } from "../../context/Context";
import { Link } from "react-router-dom";

export default function Topbar() {
  const { user, dispatch } = useContext(Context)
  const handleLogout = async (e) => {
    dispatch({ type: "LOGOUT" })
  }
  const PF = "http://localhost:5000/images/";
  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
          <li className="topListItem">
            <Link className="link" to="/">
              HOME
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/">
              ABOUT
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/">
              CONTACT
            </Link>
          </li>
          <li className="topListItem">
            <Link className="link" to="/write">
              WRITE
            </Link>
          </li>
          <li className="topListItem" onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className="topRight">
        {user ? (
          <Link to="/settings">
            <img
              className="topImg"
              src={PF +user.profilePic}
              alt=""
            />
          </Link>
        )
          :
          <div>
            <ul className="topList">
              <li className="topListItem">
                <Link className="link" to="/login">LOGIN</Link>
              </li>
              <li className="topListItem">
                <Link className="link" to="/register">
                  REGISTER
                </Link>
              </li>

            </ul>
          </div>
        }
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  );
}