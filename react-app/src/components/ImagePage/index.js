import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImage, deleteOneImage } from "../../store/image";
import { createComment } from "../../store/comment";
import {
  XIcon,
  UserCircleIcon,
  HeartIcon,
  ChatIcon,
} from "@heroicons/react/outline";
import EditFormPage from "../EditFormPage";
import "./ImagePage.css";

const ImagePage = (props) => {
  const userId = useSelector((state) => state.session.user.id);
  const dispatch = useDispatch();

  const [buttonPopup, setButtonPopup] = useState(0);
  const [contentB, setContentB] = useState("");

  const body = document.body;

  
  useEffect(() => {
    dispatch(getImage(props.image.id));
  }, [dispatch, props.image.id]);
  
  const canEditComment = (comment) => {
    return "editCom".concat(String(comment.user_id === userId).toUpperCase());
  };

  const handleDelete = (event) => {
    event.preventDefault();
    dispatch(deleteOneImage(props.image));
  };

  // const onContentSubmit = async (e) => {
  //   e.preventDefault();

  //   const comment = await dispatch(createComment(e.target.className, content));

  //   if (comment) {
  //     setContent("");
  //   }
  // };

  const getUser = (userId) =>
    props.users.filter((user) => user.id === userId)[0];

  return props.trigger === props.image.id ? (
    <div className="image-page-body">
      <div className="image-page-con">
        <div className="image-page-left">
          <img
            className={"image-page-image"}
            src={`${props.image.url}`}
            alt="user-upload"
          ></img>
        </div>
        <div className="image-page-right">
          <div className="image-page-header">
            <UserCircleIcon className="image-page-avatar" />
            <p>{getUser(props.image.user_id)?.username}</p>
          </div>
          {props.commentsArray && (
            <div className="image-page-comment-container">
              {props.commentsArray?.map((comment) => {
                if (comment.image_id === props.image.id) {
                  return (
                    <div className="image-page-comment-header">
                      <UserCircleIcon className="image-page-comment-avatar" />
                      <p className="image-page-username">
                        {getUser(comment.user_id)?.username}
                      </p>
                      <div className="commentPDiv">
                        <p className={canEditComment(comment)}>
                          {comment.content}
                          {/* <button
                            onClick={() => {
                              setEdit(true);
                              setCommentShow(image.id);
                              setCommentId(comment.id);
                              setContent(`${props.comments[comment.id].content}`);
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
                          </button> */}
                        </p>
                      </div>
                    </div>
                  );
                }
                return "";
              })}
            </div>
          )}
          <div className="image-page-footer">
            <div className="image-page-options-container">
              <HeartIcon className="image-page-options-icon" />
              <ChatIcon className="image-page-options-icon" />
            </div>
            <form
              className={props.image.id}
              id="form-comment-con"
              onSubmit={props.onContentSubmit}
            >
              <input
                className={props.image.id}
                placeholder="Add a comment..."
                value={contentB}
                onChange={(e) => {
                  setContentB(e.target.value)
                  console.log('setting')
                  console.log('onset, contentB is', contentB)
                }}
              />
              <button className="image-page-comment-submit">Post</button>
            </form>
          </div>
          {userId === props.image.user_id && (
            <div>
              <button className={props.image.id} onClick={handleDelete}>
                delete
              </button>
              <button onClick={() => setButtonPopup(props.image.id)}>
                Edit
              </button>
              <EditFormPage
                trigger={buttonPopup}
                setTrigger={setButtonPopup}
                image={props.image}
              />
            </div>
          )}
          <button className="x-button-wrap" onClick={() => props.setTrigger(0)}>
            <XIcon
              onClick={() => {
                body.style.overflow = "visible";
              }}
              className="image-page-close"
            />
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default ImagePage;
