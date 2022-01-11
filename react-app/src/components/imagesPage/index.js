import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImages, deleteOneImage } from "../../store/image";
import EditFormPage from "../EditFormPage";
import ImagePage from "../ImagePage";
import NavBar from "../Navbar";

function ImagesPage() {
  const userId = useSelector((state) => state.session.user.id);

  const dispatch = useDispatch();
  const images = useSelector((state) => state.images);
  const imagesArr = Object.values(images);
  const [imageButtonPopup, setImageButtonPopup] = useState(0)

  const [editButtonPopup, setEditButtonPopup] = useState(0);

  useEffect(() => {
    dispatch(getImages());
  }, [dispatch]);

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteOneImage(images[e.target.className]));
  };

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
              </div>
            )}
          </div>
        ))}
      </ul>
    </>
  );
}

export default ImagesPage;
