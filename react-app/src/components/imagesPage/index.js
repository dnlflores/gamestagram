import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImages, deleteOneImage } from "../../store/image";
import { createComment } from "../../store/comment";
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
  const imagesArr = Object.values(images);
  const [imageButtonPopup, setImageButtonPopup] = useState(0);
  const [editButtonPopup, setEditButtonPopup] = useState(0);
  const [content, setContent] = useState("");

  const [commentShow, setCommentShow] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    dispatch(getImages());
  }, [dispatch]);

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteOneImage(images[e.target.className]));
  };

  const onContentSubmit = async (e) => {
    e.preventDefault();
    console.log("className!!!!!!", e.target.className);
    console.log("this is the content", content);

    dispatch(createComment(e.target.className, content));
  };

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
                <HeartIcon className="post-footer-icon" />
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
