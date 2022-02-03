import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getImages, deleteOneImage, getUserImages } from "../../store/image";
import { getFollowers, getFollowings } from "../../store/follow";
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
import SideBar from "../SideBar";
import {
  UserCircleIcon,
  HeartIcon,
  ChatIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import { HeartIcon as HeartIconFilled } from "@heroicons/react/solid";
function HomePage() {
  const userId = useSelector((state) => state.session.user.id);
  const history = useHistory();
  const dispatch = useDispatch();
  const images = useSelector((state) => state.images);
  const comments = useSelector((state) => state.comments);
  const followings = useSelector((state) =>
    Object.values(state.follows.followings || {})
  );
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
  const likedImages = likesArr.filter((like) => like.user_id === userId);
  const [chosenKey, setChosenKey] = useState({});
  const [editB, setEditB] = useState(false);

  const followedImages = [];
  for (let i = 0; i < followings.length; i++) {
    const user = followings[i];
    for (let j = 0; j < imagesArr.length; j++) {
      const image = imagesArr[j];
      if (user.id === image.user_id) followedImages.push(image);
    }
  }

  useEffect(() => {
    dispatch(getImages());
    dispatch(getTheLikes());
    dispatch(getComments());
    dispatch(getFollowings(userId));
    async function fetchData() {
      const response = await fetch("/api/users/");
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, [dispatch, userId]);

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
    if (e.target.value) {
      await dispatch(createComment(e.target.className, e.target.value));
      setContent("");
    } else {
      await dispatch(createComment(e.target.className, e.target["0"].value));
      e.target["0"].value = "";
    }
  };

  const onEditComment = async (e) => {
    e.preventDefault();
    setCommentShow(0);
    const str = e.target.className.split(":");
    const image_id = str[0];
    const comment_id = str[1];
    if (content) {
      await dispatch(editOneComment(+image_id, +comment_id, content));
      setContent("");
    } else {
      await dispatch(
        editOneComment(+image_id, +comment_id, e.target["0"].value)
      );
      e.target["0"].value = "";
      setEditB(false);
    }
  };

  const onDeleteComment = async (image_id, comment_id, setContentB = null) => {
    if (setContentB) setContentB("");
    await dispatch(deleteOneComment(image_id, comment_id));
  };

  const handleEdit = (imageId) => {
    setEditButtonPopup(imageId);
    setShowOptions(false);
  };

  const postCommentForm = (image_id, submitFn, content, setContent) => {
    return (
      <form id="form-comment-con" className={image_id} onSubmit={submitFn}>
        <input
          autoFocus
          required="true"
          className={`input-comment`}
          name="CommentAutoFocus"
          placeholder="Comment"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <button className="comment-submit-button">Post</button>
      </form>
    );
  };

  const editCommentForm = (
    image_id,
    commentId,
    editFn,
    content,
    setContent
  ) => (
    <form
      className={`${image_id}:${commentId}`}
      onSubmit={editFn} // onEditComment
    >
      <input
        autoFocus
        placeholder="Edit"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button>submit edit</button>
    </form>
  );

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

  const getImageComments = (image_id) => {
    const comments = [];
    let counter = 0;

    for (let i = commentsArray.length - 1; i >= 0; i--) {
      const comment = commentsArray[i];
      if (comment.image_id === image_id && counter < 3) {
        comments.unshift(comment);
        counter++;
      }
    }

    return comments;
  };

  const getImageLikes = image_id => {
    const likesOnImage = [];
    for(let i = 0; i < likesArr.length; i++) {
      const like = likesArr[i];
      if(+like.image_id === +image_id) likesOnImage.push(like);
    }
    return likesOnImage;
  }

  const commentFunction = (e) => {
    const submitButton = document.querySelector(".comment-submit-button")
    if(e.target.value !== "") submitButton.style.opacity = ".9"
    else submitButton.style.opacity = ".4"
  }

  return (
    <div>
      <NavBar />
      <div className="games-page-body">
        <ul className="game-post-container">
          {followedImages.map((image, i) => (
            <div className="ind-post-container" key={`${image.id}`}>
              <div className="game-post-header">
                <div
                  className="game-post-ava-name"
                  onClick={(event) => history.push(`/users/${image.user_id}`)}
                >
                  <UserCircleIcon
                    className="game-post-avatar"
                    onClick={(event) => history.push(`/users/${image.user_id}`)}
                  />
                  <li>{getUser(image.user_id)?.username}</li>
                </div>
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
                  //new props
                  edit={edit}
                  onContentSubmit={onContentSubmit}
                  postCommentForm={postCommentForm}
                  editCommentForm={editCommentForm}
                  onEditComment={onEditComment}
                  onDeleteComment={onDeleteComment}
                  canEditComment={canEditComment}
                  editB={editB}
                  setEditB={setEditB}
                  handleDelete={handleDelete}
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
                    setImageButtonPopup(image.id);
                    body.style.overflow = "hidden";
                  }}
                  className="post-footer-icon"
                />
              </div>
              {getImageLikes(image.id).length > 0 && (
                <div className="num-of-likes-div">
                  <label className="num-of-likes-label">{getImageLikes(image.id).length} </label>
                  <p className="likes-text"> like(s)</p>
                </div>
              )}
              <li className="caption-container">
                <div className="caption-username"
                  onClick={() => history.push(`/users/${image.user_id}`)}
                >
                  {getUser(image.user_id)?.username}
                </div>
                <div className="caption">{image.caption}</div>
              </li>
              {getImageComments(image.id)?.map((comment) => {
                if (comment.image_id === image.id) {
                  return (
                    <div className="games-comment-container">
                      <div className="games-username"
                        onClick={() =>
                          history.push(`/users/${comment.user_id}`)
                        }
                      >
                        {getUser(comment.user_id)?.username}
                      </div>
                      <div className="commentPDiv">
                        <p id={comment.id} className={canEditComment(comment)}>
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  );
                }
                return "";
              })}
              {commentsArray.filter((comment) => image.id === comment.image_id)
                .length > 2 && (
                <p
                  className="games-view-comments"
                  onClick={() => {
                    setImageButtonPopup(image.id);
                    body.style.overflow = "hidden";
                  }}
                >
                  View all comments...
                </p>
              )}
              <div className="comment-container-div">
                <form
                  id="form-comment-con"
                  className={image.id}
                  onSubmit={onContentSubmit}
                >
                  <input
                    required="true"
                    className={`input-comment`}
                    name="CommentAutoFocus"
                    placeholder="Comment"
                    value={chosenKey[image.id]}
                    onChange={(e) => {
                      const eVal = e.target.value;
                      commentFunction(e);
                      setChosenKey({ imageId: eVal });
                    }}
                  />
                  <button className="comment-submit-button">Post</button>
                </form>
                {commentShow === image.id &&
                  edit === true &&
                  editCommentForm(image.id, commentId, onEditComment, content)}
              </div>
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
        <div>
          <SideBar users={users} userId={userId} />
        </div>
      </div>
    </div>
  );
}
export default HomePage;
