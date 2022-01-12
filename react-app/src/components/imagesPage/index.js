import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImages, deleteOneImage } from "../../store/image";
import { getTheLikes, setOneLike, unOneLike } from "../../store/likes";
import {createComment} from "../../store/comment"
import EditFormPage from "../EditFormPage";
import ImagePage from "../ImagePage";
import NavBar from "../Navbar";

function ImagesPage() {
  const userId = useSelector((state) => state.session.user.id);

  const dispatch = useDispatch();
  const images = useSelector((state) => state.images);
  const imagesArr = Object.values(images);
  const likes = useSelector((state) => state.likes);
  const keys = Object.keys(likes)
  const [imageButtonPopup, setImageButtonPopup] = useState(0)
  const [editButtonPopup, setEditButtonPopup] = useState(0);
  const [content, setContent] = useState('')
  
  useEffect(() => {
    dispatch(getImages());
    dispatch(getTheLikes());
  }, [dispatch]);
  
  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteOneImage(images[e.target.className]));
  };

  const handleLike = e => {
    e.preventDefault();
    const image_id = e.target.className;

    const x = keys.filter(key => likes[key].image_id === +image_id && likes[key].user_id === userId)

    const y = keys.filter(key => likes[key].image_id === image_id)

    if (keys.filter(key => likes[key].image_id === +image_id && likes[key].user_id === userId).length) {
      dispatch(unOneLike(image_id))
    } else dispatch(setOneLike(image_id));
  }
    
  const onContentSubmit = async (e) => {
    e.preventDefault();
    console.log('className!!!!!!', e.target.className)
    console.log('this is the content', content)

    dispatch(createComment(e.target.className, content))
  }

  return (
    <>
      <NavBar />
      <ul>
        {imagesArr.map((image) => (
          <div key={`${image.id}`}>
            <li>{image.user_id}</li>
            <li>{image.caption}</li>
            <li>
              <img src={`${image.url}`} alt="user-upload" onClick={event => setImageButtonPopup(image.id)}></img>
              <ImagePage trigger={imageButtonPopup} setTrigger={setImageButtonPopup} image={image} />
            </li>
            {userId === image.user_id && (
              <div>
                <button className={image.id} onClick={handleDelete}>
                  delete
                </button>
                <button onClick={() => setEditButtonPopup(image.id)}>Edit</button>
                <EditFormPage
                  trigger={editButtonPopup}
                  setTrigger={setEditButtonPopup}
                  image={image}
                />
                <form className={image.id} onSubmit={onContentSubmit}>
                  <input placeholder="Comment" value={content} onChange={(e) => setContent(e.target.value)}/>
                  <button>comment</button>
                </form>
              </div>
            )}
            <button className={image.id} onClick={handleLike}>
              Likes {keys.filter(key => likes[key].image_id === image.id).length}
            </button>
          </div>
        ))}
      </ul>
    </>
  );
}

export default ImagesPage;
