import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImages, deleteOneImage } from "../../store/image";
import {createComment} from "../../store/comment"
import EditFormPage from "../EditFormPage";
import NavBar from "../Navbar";

function ImagesPage() {
  const userId = useSelector((state) => state.session.user.id);

  const dispatch = useDispatch();
  const images = useSelector((state) => state.images);
  const imagesArr = Object.values(images);

  const [buttonPopup, setButtonPopup] = useState(0);
  const [content, setContent] = useState('')

  useEffect(() => {
    dispatch(getImages());
  }, [dispatch]);

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteOneImage(images[e.target.className]));
  };

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
              <img src={`${image.url}`} alt="user-upload"></img>
            </li>
            {userId === image.user_id && (
              <div>
                <button className={image.id} onClick={handleDelete}>
                  delete
                </button>
                <button onClick={() => setButtonPopup(image.id)}
                  >Edit</button>
                <EditFormPage
                  trigger={buttonPopup}
                  setTrigger={setButtonPopup}
                  image={image}
                />
                <form className={image.id} onSubmit={onContentSubmit}>
                  <input placeholder="Comment" value={content} onChange={(e) => setContent(e.target.value)}/>
                  <button>comment</button>
                </form>
              </div>
            )}
          </div>
        ))}
      </ul>
    </>
  );
}

export default ImagesPage;
