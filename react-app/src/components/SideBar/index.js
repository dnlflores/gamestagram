import { UserCircleIcon } from "@heroicons/react/outline";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getFollowings } from "../../store/follow";
import "./SideBar.css";

const SideBar = (props) => {
  const user = useSelector((state) => state.session.user);
  const following = useSelector((state) => state.follows.followings)
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFollowings(user.id))
  }, [dispatch])
  const followingArr = Object.values(following || {})



  return (
    <div className="sidebar-container">
      <div className="sidebar-header" onClick={() => history.push(`/users/${user.id}`)}>
        <UserCircleIcon className="sidebar-avatar" />
        <div className="sb-username-email">
          <p className="sidebar-username">{user.username}</p>
          <p className="sidebar-email">{user.email}</p>
        </div>
      </div>
      <p className="suggestions-text">Suggestions for you</p>
    </div>
  );
};

export default SideBar;
