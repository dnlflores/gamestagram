import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { editOneImage } from '../../store/image';

const EditFormPage = (props) => {
  const [errors, setErrors] = useState([]);
  const [caption, setCaption] = useState('');
  const dispatch = useDispatch();
  const images = useSelector(state => state.images);


  const onEditGame = async (e) => {
    e.preventDefault();
    const image = images[e.target.className]
    const data = await dispatch(editOneImage(image));
    if (data) {
        props.setTrigger(false);
        // setErrors(data);
    }
  };

  const updateCaption = (e) => {
    setCaption(e.target.value);
  };

  return (props.trigger) ? (
    <div>
        <form onSubmit={onEditGame} className={props.image.id}>
        <div>
            {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
            ))}
        </div>
        <div>
            <label>Edit Caption</label>
            <input
            type='text'
            name='caption'
            onChange={updateCaption}
            value={caption}
            required={true}
            ></input>
        </div>
        <button type='submit'>Confirm Edit</button>
        </form>
    </div>
  ) : '';
};

export default EditFormPage;
