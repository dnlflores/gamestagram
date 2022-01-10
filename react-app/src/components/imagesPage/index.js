import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImages, deleteOneImage } from "../../store/image";

function ImagesPage() {
  const userId = useSelector((state) => state.session.user.id);

  const dispatch = useDispatch();
  const images = useSelector((state) => state.images);
  const imagesArr = Object.values(images);

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
            <button className={image.id} onClick={handleDelete}>
              delete
            </button>
          )}
        </div>
      ))}
    </ul>
  );
}

export default ImagesPage;
