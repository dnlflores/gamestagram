import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImages, deleteOneImage } from "../../store/image";
import {
  getComments,
  createComment,
  editOneComment,
  deleteOneComment,
} from "../../store/comment";
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
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
import "./imagesPage.css";

function ImagesPage() {
  const props = null
  const userId = useSelector((state) => state.session.user.id);
  const dispatch = useDispatch();
  const images = useSelector((state) => state.images);
  const comments = useSelector((state) => state.comments);
  const imagesArr = Object.values(images);
  const likes = useSelector((state) => state.likes);
  const likesArr = Object.values(likes);
  const keys = Object.keys(likes);
  const [imageButtonPopup, setImageButtonPopup] = useState(0);
  const [editButtonPopup, setEditButtonPopup] = useState(0);
  const [content, setContent] = useState("");
  const [commentShow, setCommentShow] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [users, setUsers] = useState([]);
  const [edit, setEdit] = useState(false);
  const [commentId, setCommentId] = useState(-2);
  const commentsArray = Object.values(comments);
  const body = document.body;
  let contentB;
  const likedImages = likesArr.filter((like) => like.user_id === userId);

  useEffect(() => {
    dispatch(getImages());
    dispatch(getTheLikes());
    dispatch(getComments());
    async function fetchData() {
      const response = await fetch("/api/users/");
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, [dispatch]);

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteOneImage(images[e.target.className.split(" ")[0]]));
  };

  const handleLike = (e) => {
    e.preventDefault();
    const image_id = e.target.className.split(" ")[1];

    if (
      keys.filter(
        (key) =>
          likes[key].image_id === +image_id && likes[key].user_id === userId
      ).length
    ) {
      dispatch(unOneLike(image_id));
    } else dispatch(setOneLike(image_id));
  };

  const onContentSubmit = async (e) => {
    e.preventDefault();
    let comment;
    if (content) comment = await dispatch(createComment(e.target.className, contentB));
    else {
      console.log('classname is', e.target.className);
      console.log('target value is', e.target.value);
      console.log('target  is', e.target);
      const keys = Object.keys(e.target);
      console.log('e.target[0].value is', e.target[keys[0]].value);
      const val = e.target[keys[0]].value;
      comment = await dispatch(createComment(e.target.className, val));

    }
    if (comment) {
      setContent("");
    }
  };

  const onEditComment = async (e) => {
    e.preventDefault();
    setCommentShow(0);
    const str = e.target.className.split(":");

    const image_id = str[0];
    const comment_id = str[1];

    await dispatch(editOneComment(+image_id, +comment_id, content));
  };

  const onDeleteComment = async (image_id, comment_id) => {
    // e.preventDefault();
    setCommentShow(0);
    await dispatch(deleteOneComment(image_id, comment_id));
  };

  const handleEdit = (imageId) => {
    setEditButtonPopup(imageId);
    setShowOptions(false);
  };

  const getUser = (userId) => users.filter((user) => user.id === userId)[0];

  const checkIfLiked = (imageId) => {
    for (let i = 0; i < likedImages.length; i++) {
      if (+likedImages[i].image_id === +imageId) return true;
    }
    return false;
  };

  const canEditComment = (comment) => {
    return "editCom".concat(String(comment.user_id === userId).toUpperCase());
  };
  return (
    <div>
      <NavBar />
      <div className="games-page-body">
        <ul className="game-post-container">
          {imagesArr.map((image, i) => (
            <div className="ind-post-container" key={`${image.id}`}>
              <div className="game-post-header">
                <UserCircleIcon className="game-post-avatar" />
                <li>{getUser(image.user_id)?.username}</li>
              </div>
              <li>
                <img
                  className="game-post-image"
                  src={`${image.url}`}
                  alt="user-upload"
                  onClick={(event) => {
                    setImageButtonPopup(image.id);
                    body.style.overflow = "hidden";
                  }}
                ></img>
                <ImagePage
                  trigger={imageButtonPopup}
                  setTrigger={setImageButtonPopup}
                  image={image}
                  commentsArray={commentsArray}
                  comments={comments}
                  users={users}
                  content={content}
                  onContentSubmit={onContentSubmit}
                />
              </li>
              <div className="post-footer-icon-container">
                <div
                  className={`like-div ${image.id}`}
                  onClick={handleLike}
                ></div>
                {checkIfLiked(image.id) ? (
                  <HeartIconFilled className="post-footer-icon liked-icon" />
                ) : (
                  <HeartIcon className="post-footer-icon" />
                )}
                <ChatIcon
                  onClick={() => {
                    if (commentShow === image.id) {
                      setCommentShow(0);
                    } else setCommentShow(image.id);
                    setContent("");
                    setEdit(false);
                  }}
                  className="post-footer-icon"
                />
              </div>
              <li className="caption-container">
                <div className="caption-username">
                  {getUser(image.user_id)?.username}
                </div>
                <div className="caption">{image.caption}</div>
              </li>
              <p
              className="games-view-comments"
                onClick={() => {
                  setImageButtonPopup(image.id);
                  body.style.overflow = "hidden";
                }}
              >
                View all comments...
              </p>
              {commentsArray.filter(comment => image.id === comment.image_id).slice(-3).map(comment => {
                if (comment.image_id === image.id) {
                  return (
                    <div className="games-comment-container">
                      <div className="games-username">
                        {getUser(comment.user_id)?.username}
                      </div>
                      <div className='commentPDiv'>
                        <p id={comment.id} className={canEditComment(comment)}>
                          {comment.content}
                          <button
                            onClick={() => {
                              setEdit(true);
                              setCommentShow(image.id);
                              setCommentId(comment.id);
                              setContent(`${comments[comment.id].content}`);
                            }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              onDeleteComment(image.id, comment.id);
                            }}
                          >
                            Delete
                          </button>
                        </p>
                      </div>
                    </div>
                  );
                }
                return "";
              })}
              {commentShow === image.id && edit === false && (
                <form className={image.id} onSubmit={onContentSubmit}>
                  <input
                    autoFocus
                    name="CommentAutoFocus"
                    placeholder="Comment"
                    value={content}
                    onChange={(e) => {
                      setContent(e.target.value);
                    }}
                  />
                  <button>comment</button>
                </form>
              )}
              {commentShow === image.id && edit === true && (
                <form
                  className={`${image.id}:${commentId}`}
                  onSubmit={onEditComment}
                >
                  <input
                    autoFocus
                    placeholder="Edit"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                  <button>submit edit</button>
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
                      <button
                        className={`${image.id} post-option-delete`}
                        onClick={handleDelete}
                      >
                        Delete
                      </button>
                      <button onClick={() => handleEdit(image.id)}>Edit</button>
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
