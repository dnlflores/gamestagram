import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../Navbar";
import ImagePage from "../ImagePage";
import EditFormPage from "../EditFormPage";
import { getImages } from "../../store/image";
import { getTheLikes } from "../../store/likes";
import { getComments } from "../../store/comment";
import { getFollowers, getFollowings } from "../../store/follow";

const ProfilePage = props => {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const images = useSelector(state => state.images);
    const likes = useSelector(state => state.likes);
    const comments = useSelector(state => state.comments);
    const followings = useSelector(state => state.follows.followings);
    const followers = useSelector(state => state.follows.followers);
    const [imageButtonPopup, setImageButtonPopup] = useState(0);
    const [editButtonPopup, setEditButtonPopup] = useState(0);

    const userImages = Object.values(images).filter(image => image.user_id === user.id);
    const followingsArr = Object.values(followings || []);
    const followersArr = Object.values(followers || []);

    useEffect(() => {
        dispatch(getImages());
        dispatch(getTheLikes());
        dispatch(getComments());
        dispatch(getFollowings(user.id));
        dispatch(getFollowers(user.id));
    }, [dispatch, user]);

    const handleDelete = event => {
        event.preventDefault();


    };

    return (
        <div>
            <NavBar />
            <h2>Posts: {userImages.length}</h2>
            <h2>Followers: {followersArr.length}</h2>
            <h2>Following: {followingsArr.length}</h2>
            {userImages.map(image => (
                <img src={image.url} alt="user_upload"></img>
            ))}
        </div>
    )
};

export default ProfilePage;