import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImages, deleteOneImage } from "../../store/image";
import { getComments } from "../../store/comment";
import {createComment} from "../../store/comment";
import { getTheLikes, setOneLike, unOneLike } from "../../store/likes";
import EditFormPage from "../EditFormPage";
import ImagePage from "../ImagePage";
import NavBar from "../Navbar";
import {
  UserCircleIcon,
  HeartIcon,
  ChatIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import "./imagesPage.css";

function ImagesPage() {
  const userId = useSelector((state) => state.session.user.id);

  const dispatch = useDispatch();
  const images = useSelector((state) => state.images);
  const comments = useSelector(state => state.comments);
  const imagesArr = Object.values(images);
  const likes = useSelector((state) => state.likes);
  const keys = Object.keys(likes)
  const [imageButtonPopup, setImageButtonPopup] = useState(0);
  const [editButtonPopup, setEditButtonPopup] = useState(0);
  const [content, setContent] = useState("");
  const [commentShow, setCommentShow] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  console.log("these are the comments => ", comments);

  useEffect(() => {
    dispatch(getImages());
    dispatch(getTheLikes());
    dispatch(getComments());
  }, [dispatch]);
  
  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteOneImage(images[e.target.className]));
  };

  const handleLike = e => {
    e.preventDefault();
    console.log("this is the e.target", e.target)
    const image_id = e.target.className.split(' ')[1]

    if (keys.filter(key => likes[key].image_id === +image_id && likes[key].user_id === userId).length) {
      dispatch(unOneLike(image_id))
    } else dispatch(setOneLike(image_id));
  }
    
  const onContentSubmit = async (e) => {
    e.preventDefault();

    const comment = await dispatch(createComment(e.target.className, content));
    if(comment) {
      setContent('');
    }
  }

  const handleEdit = (imageId) => {
    setEditButtonPopup(imageId);
    setShowOptions(false);
  };

  return (
    <div>
      <NavBar />
      <div className="games-page-body">
        <ul className="game-post-container">
          {imagesArr.map((image) => (
            <div className="ind-post-container" key={`${image.id}`}>
              <div className="game-post-header">
                <UserCircleIcon className="game-post-avatar" />
                <li>username{image.user_id}</li>
              </div>
              <li>
                <img
                  className="game-post-image"
                  src={`${image.url}`}
                  alt="user-upload"
                  onClick={(event) => setImageButtonPopup(image.id)}
                ></img>
                <ImagePage
                  trigger={imageButtonPopup}
                  setTrigger={setImageButtonPopup}
                  image={image}
                />
              </li>
              <div className="post-footer-icon-container">
                <div className={`like-div ${image.id}`} onClick={handleLike}></div>
                  <HeartIcon className="post-footer-icon"/>
                <ChatIcon
                  onClick={() => setCommentShow(!commentShow)}
                  className="post-footer-icon"
                />
              </div>
              <li className="caption-container">
                <div className="caption-username">username{image.user_id}</div>
                <div className="caption">{image.caption}</div>
              </li>
              {commentShow && (
                <form className={image.id} onSubmit={onContentSubmit}>
                  <input
                    placeholder="Comment"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                  <button>comment</button>
                </form>
              )}
              {userId === image.user_id && (
                <div>
                  <DotsHorizontalIcon
                    onClick={() => setShowOptions(!showOptions)}
                    className="post-options-icon"
                  />
                  <EditFormPage
                    trigger={editButtonPopup}
                    setTrigger={setEditButtonPopup}
                    image={image}
                  />
                  {showOptions && (
                    <div className="post-options">
                      <button className={`${image.id} post-option-delete`} onClick={handleDelete}>
                        Delete
                      </button>
                      <button onClick={() => handleEdit(image.id)}>
                        Edit
                      </button>
                      <button>Go to post</button>
                      <button onClick={() => setShowOptions(false)}>
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ImagesPage;
