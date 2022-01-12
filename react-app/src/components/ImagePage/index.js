import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImage, deleteOneImage } from "../../store/image";
import EditFormPage from "../EditFormPage";

const ImagePage = props => {
    const userId = useSelector((state) => state.session.user.id);
    const dispatch = useDispatch();

    const [buttonPopup, setButtonPopup] = useState(0);

    useEffect(() => {
        dispatch(getImage(props.image.id));
    }, [dispatch, props.image.id]);

    const handleDelete = event => {
        event.preventDefault();
        dispatch(deleteOneImage(props.image));
    };

    return (props.trigger === props.image.id) ? (
        <div>
            <div>
                <label>{props.image.user_id}</label>
                <label>{props.image.caption}</label>
                <button onClick={() => props.setTrigger(0)}>Close</button>
                <img src={`${props.image.url}`} alt='user-upload'></img>
            </div>
            {userId === props.image.user_id && (
              <div>
                <button className={props.image.id} onClick={handleDelete}>
                  delete
                </button>
                <button onClick={() => setButtonPopup(props.image.id)}
                  >Edit</button>
                <EditFormPage
                  trigger={buttonPopup}
                  setTrigger={setButtonPopup}
                  image={props.image}
                />
              </div>
            )}
        </div>
    ) : '';
}

export default ImagePage;