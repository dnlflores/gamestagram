import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImage, deleteOneImage } from "../../store/image";
import { createComment } from "../../store/comment";
import {
  XIcon,
  UserCircleIcon,
  HeartIcon,
  ChatIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import EditFormPage from "../EditFormPage";
import "./ImagePage.css";
import { useHistory } from "react-router-dom";

const ImagePage = (props) => {
  const userId = useSelector((state) => state.session.user.id);
  const dispatch = useDispatch();
  const history = useHistory();

  const [buttonPopup, setButtonPopup] = useState(0);
  const [showImageOptions, setShowImageOptions] = useState(false);

  const body = document.body;

  // working with imagesPage file
  const [contentB, setContentB] = useState("");
  const [editB, setEditB] = useState(false);
  const [commentShowB, setCommentShowB] = useState(0);
  const [commentIdB, setCommentIdB] = useState(-6);

  useEffect(() => {
    dispatch(getImage(props.image.id));
  }, [dispatch, props.image.id]);

  const handleClick = (e) => {
    const imagePage = document.querySelector(".image-page-body");
    if (e.target === imagePage) {
      body.style.overflow = "visible";
      props.setTrigger(0);
    }
  };

  useEffect(() => {
    document.body.addEventListener("click", handleClick);
  }, [handleClick]);

  const getUser = (userId) =>
    props.users.filter((user) => user.id === userId)[0];

  return props.trigger === props.image.id ? (
    <div className="image-page-body">
      {showImageOptions && userId === props.image.user_id && (
        <div className="image-post-options">
          <button className={props.image.id} onClick={props.handleDelete}>
            Delete
          </button>
          <button onClick={() => setButtonPopup(props.image.id)}>Edit</button>
          <button onClick={() => setShowImageOptions(!showImageOptions)}>Close</button>
          <EditFormPage
            trigger={buttonPopup}
            setTrigger={setButtonPopup}
            image={props.image}
          />
        </div>
      )}
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
            {props.image.user_id === userId && (
              <DotsHorizontalIcon className="image-options-icon" onClick={() => setShowImageOptions(!showImageOptions)} />
            )}
          </div>
          {props.commentsArray && (
            <div className="image-page-comment-container">
              {props.commentsArray?.map((comment) => {
                if (comment.image_id === props.image.id) {
                  return (
                    <div className="image-page-comment-header">
                      <div
                        className="image-page-ava-un"
                        onClick={() => {
                          history.push(`/users/${comment.user_id}`);
                          document.body.style.overflow = "visible";
                        }}
                      >
                        <UserCircleIcon className="image-page-comment-avatar" />
                        <p className="image-page-username">
                          {getUser(comment.user_id)?.username}
                        </p>
                      </div>
                      <div className="commentPDiv">
                        <p className={props.canEditComment(comment)}>
                          {comment.content}
                          <button
                            onClick={() => {
                              setEditB(true);
                              props.setEditB(true);
                              setCommentShowB(props.image.id);
                              setCommentIdB(comment.id);
                              setContentB(
                                `${props.comments[comment.id].content}`
                              );
                            }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={(e) => {
                              props.onDeleteComment(
                                props.image.id,
                                comment.id,
                                setContentB
                              );
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
            </div>
          )}
          <div className="image-page-footer">
            <div className="image-page-options-container">
              <HeartIcon className="image-page-options-icon" />
              <ChatIcon
                className="image-page-options-icon"
                onClick={() => {
                  if (commentShowB === props.image.id) {
                    setCommentShowB(0);
                  } else setCommentShowB(props.image.id);
                  setContentB("");
                }}
              />
            </div>
            {editB === false &&
              props.postCommentForm(
                props.image.id,
                props.onContentSubmit,
                contentB,
                setContentB
              )}
            {editB === true &&
              props.editB &&
              props.editCommentForm(
                props.image.id,
                commentIdB,
                props.onEditComment,
                contentB,
                setContentB
              )}
          </div>

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
