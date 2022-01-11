import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImages, deleteOneImage } from "../../store/image";
import EditFormPage from '../EditFormPage'

function ImagesPage() {
  const userId = useSelector((state) => state.session.user.id);

  const dispatch = useDispatch();
  const images = useSelector((state) => state.images);
  const imagesArr = Object.values(images);

  const [buttonPopup, setButtonPopup] = useState(false);

  console.log("imagesArr", imagesArr);

  useEffect(() => {
    dispatch(getImages());
  }, [dispatch]);

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteOneImage(images[e.target.className]));
  };

  return (
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
              <button onClick={() => setButtonPopup(true)}>
                Edit 
              </button>
              <EditFormPage
                  trigger={buttonPopup}
                  setTrigger={setButtonPopup}
                  image={image}
                />
            </div>
          )}
        </div>
      ))}
    </ul>
  );
}

export default ImagesPage;