import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImages, deleteOneImage } from "../../store/image";
import { getComments, createComment, editOneComment } from "../../store/comment";
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
  const [commentShow, setCommentShow] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [users, setUsers] = useState([]);
  const commentsArray = Object.values(comments);

  // console.log("comment object values => ", Object.values(comments));

  useEffect(() => {
    dispatch(getImages());
    dispatch(getTheLikes());
    dispatch(getComments());
    async function fetchData() {
      const response = await fetch('/api/users/');
      const responseData = await response.json();
      setUsers(responseData.users);
    }
    fetchData();
  }, [dispatch]);
  
  const handleDelete = (e) => {
    e.preventDefault();
    // console.log("event target value => ", e.target.className.split(' ')[0])
    dispatch(deleteOneImage(images[e.target.className.split(' ')[0]]));
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
    setCommentShow(0);


    await dispatch(createComment(e.target.className, content));
  }

  const onEditComment = async e => {
    e.preventDefault();
    setCommentShow(0);

    await dispatch(editOneComment(e.target.className, content));
    
  }

  
  const handleEdit = (imageId) => {
    setEditButtonPopup(imageId);
    setShowOptions(false);
  };
  
  const getUser = userId => users.filter(user => user.id === userId)[0];
  
  const canEditComment = (comment, text = null) => {
    if (text == "isClass") return "editCom".concat(String(comment.user_id === userId).toUpperCase())
    else if (comment.user_id === userId) return {visibility: 'visible'}
    else return {visibility: 'hidden'}
  }
  
  return (
    <div>
      <NavBar />
      <div className="games-page-body">
        <ul className="game-post-container">
          {imagesArr.map((image) => (
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
                  onClick={() => {
                    if (commentShow === image.id) {
                      setCommentShow(0);
                    } else setCommentShow(image.id);
                    setContent("");
                  }}
                  className="post-footer-icon"
                />
              </div>
              <li className="caption-container">
                <div className="caption-username">{getUser(image.user_id)?.username}</div>
                <div className="caption">{image.caption}</div>
              </li>
              {commentsArray?.map(comment => {
                if (comment.image_id === image.id) {
                  return (
                    <>
                      <h3>{getUser(comment.user_id)?.username}</h3>
                      <p className={canEditComment(comment, 'isClass')}>{comment.content}
                        <button style={canEditComment(comment)}>AA</button>
                      </p>
                    </>
                  )
                }
                
                return '';
              })}
              {commentShow === image.id && (
                <form className={image.id} onSubmit={onContentSubmit}>
                  <input
                    autoFocus
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
