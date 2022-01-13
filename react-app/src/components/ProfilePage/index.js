import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../Navbar";
// import ImagePage from "../ImagePage";
// import EditFormPage from "../EditFormPage";
import { getUserImages } from "../../store/image";
import { getTheLikes } from "../../store/likes";
import { getComments } from "../../store/comment";
import {
  getFollowers,
  getFollowings,
  followUser,
  unfollowUser,
} from "../../store/follow";
import { useParams } from "react-router-dom";
import { UserCircleIcon, UserAddIcon } from "@heroicons/react/outline";
import { UserIcon } from "@heroicons/react/solid";
import "./ProfilePage.css";

const ProfilePage = (props) => {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const images = useSelector((state) => state.images);
  // const likes = useSelector(state => state.likes);
  // const comments = useSelector(state => state.comments);
  const followings = useSelector((state) => state.follows.followings);
  const followers = useSelector((state) => state.follows.followers);
  // const [imageButtonPopup, setImageButtonPopup] = useState(0);
  // const [editButtonPopup, setEditButtonPopup] = useState(0);
  const { userId: profileId } = useParams();

  const userImages = Object.values(images).filter(
    (image) => image.user_id === +profileId
  );
  const followingsArr = Object.values(followings || {});
  const followersArr = Object.values(followers || {});

  useEffect(() => {
    dispatch(getUserImages(profileId));
    dispatch(getTheLikes());
    dispatch(getComments());
    dispatch(getFollowings(profileId));
    dispatch(getFollowers(profileId));
  }, [dispatch, user, profileId]);

  // const handleDelete = event => {
  //     event.preventDefault();

  // };

  const followProfileUser = (profileId) => {
    dispatch(followUser(user.id, +profileId));
  };

  const unfollowProfileUser = (profileId) => {
    dispatch(unfollowUser(user.id, +profileId));
  };

  return (
    <div>
      <NavBar />
      <header className="profile-header-container">
        <div className="profile-avatar">
          <UserCircleIcon width={150} />
        </div>
        <div className="column">
          <div className="profile-top-row">
            <p>{user.username}</p>
            {+profileId !== user.id ? (
              <div>
                {followersArr.filter(
                  (profileUser) => +profileUser.id === +user.id
                ).length === 0 ? (
                  <button
                    className="profile-follow-button"
                    onClick={(event) => followProfileUser(profileId)}
                  >
                    <UserAddIcon width={18} />
                  </button>
                ) : (
                  <button
                    className="profile-unfollow-button"
                    onClick={(event) => unfollowProfileUser(profileId)}
                  >
                    <UserIcon width={18} />
                  </button>
                )}
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="profile-middle-row">
            <p>{userImages.length} posts</p>
            <p>{followersArr.length} followers</p>
            <p>{followingsArr.length} following</p>
          </div>
          <div className="profile-bottom-row">
            <h1>{user.email}</h1>
            <p>Description coming soon...</p>
          </div>
        </div>
      </header>
      <div className="image-container-body">
        <div className="image-container">
          {userImages.map((image) => (
            <img
              className="profile-image"
              src={image.url}
              alt="user_upload"
            ></img>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
