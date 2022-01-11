import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImages, deleteOneImage } from "../../store/image";
import { getTheLikes, setOneLike, unOneLike } from "../../store/likes";
import EditFormPage from "../EditFormPage";
import NavBar from "../Navbar";

function ImagesPage() {
  const userId = useSelector((state) => state.session.user.id);

  const dispatch = useDispatch();
  const images = useSelector((state) => state.images);
  const imagesArr = Object.values(images);

  const [buttonPopup, setButtonPopup] = useState(0);
  const likes = useSelector((state) => state.likes);
  const keys = Object.keys(likes)
  
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
