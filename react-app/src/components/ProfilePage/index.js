import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../Navbar";
// import ImagePage from "../ImagePage";
// import EditFormPage from "../EditFormPage";
import { getUserImages } from "../../store/image";
import { getTheLikes } from "../../store/likes";
import { getComments } from "../../store/comment";
import { getFollowers, getFollowings, followUser, unfollowUser } from "../../store/follow";
import { useParams } from "react-router-dom";

const ProfilePage = props => {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const images = useSelector(state => state.images);
    // const likes = useSelector(state => state.likes);
    // const comments = useSelector(state => state.comments);
    const followings = useSelector(state => state.follows.followings);
    const followers = useSelector(state => state.follows.followers);
    // const [imageButtonPopup, setImageButtonPopup] = useState(0);
    // const [editButtonPopup, setEditButtonPopup] = useState(0);
    const { userId: profileId } = useParams();

    const userImages = Object.values(images).filter(image => image.user_id === +profileId);
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

    const followProfileUser = profileId => {
        dispatch(followUser(user.id, +profileId));
    };

    const unfollowProfileUser = profileId => {
        dispatch(unfollowUser(user.id, +profileId));
    }

    return (
        <div>
            <NavBar />
            <h2>Posts: {userImages.length}</h2>
            <h2>Followers: {followersArr.length}</h2>
            <h2>Following: {followingsArr.length}</h2>
            {userImages.map(image => (
                <img src={image.url} alt="user_upload"></img>
            ))}
            {(+profileId !== user.id) ? (
                <div>
                    {followersArr.filter( profileUser => +profileUser.id === +user.id).length === 0 ? (
                        <button onClick={event => followProfileUser(profileId)}>Follow</button>
                    ) : (
                        <button onClick={event => unfollowProfileUser(profileId)}>Unfollow</button>
                    )}
                </div>
            ) : ''}
        </div>
    )
};

export default ProfilePage;