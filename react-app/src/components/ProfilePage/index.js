import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../Navbar";
import ImagePage from "../ImagePage";
import EditFormPage from "../EditFormPage";
import { getImages } from "../../store/image";
import { getTheLikes } from "../../store/likes";
import { getComments } from "../../store/comment";
import { getFollows } from "../../store/follow";

const ProfilePage = props => {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    const images = useSelector(state => state.images);
    const likes = useSelector(state => state.likes);
    const comments = useSelector(state => state.comments);
    const follows = useSelector(state => state.follows);

    const [imageButtonPopup, setImageButtonPopup] = useState(0);
    const [editButtonPopup, setEditButtonPopup] = useState(0);

    const userImages = Object.values(images).filter(image => image.user_id === user.id);

    console.log("this is the follows from state => ", follows);

    useEffect(() => {
        dispatch(getImages());
        dispatch(getTheLikes());
        dispatch(getComments());
        dispatch(getFollows(user.id));
    }, [dispatch, user.id]);

    const handleDelete = event => {
        event.preventDefault();


    };

    return (
        <div>
            <NavBar />
            <h2>Posts: { userImages.length }</h2>
            <h2>Follows: 0</h2>
            <h2>Following: 0</h2>
            {userImages.map(image => (
                <img src={ image.url } alt="user_upload"></img>
            ))}
        </div>
    )
};

export default ProfilePage;