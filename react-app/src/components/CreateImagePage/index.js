import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import NavBar from "../Navbar";
import SelectImagePage from "../SelectImagePage"
import './CreateImagePage.css'

const CreateImagePage = () => {
  const history = useHistory(); // so that we can redirect after the image upload is successful
  // const [errors, setErrors] = useState([]);
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [caption, setCaption] = useState("");
  const [imageSelectPopup, setImageSelectPopup] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);

    // aws uploads can be a bit slow—displaying
    // some sort of loading message is a good idea
    setImageLoading(true);

    formData.append("caption", caption);

    const res = await fetch("/api/games", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      await res.json();
      setImageLoading(false);
      history.push("/games");
    } else {
      setImageLoading(false);
      // a real app would probably use more advanced
      // error handling
      console.log("there was an error here is some info", res, res.formData, res.status);
    }
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const updateCaption = (e) => {
    setCaption(e.target.value);
  };

  return (
    <>
      <NavBar />
      <header className="grid">
        <div className="grid-mid">
          <p>choose an image to upload!</p>
          <button
            className="modal-button"
            onClick={e => {
              if (imageSelectPopup) setImageSelectPopup(false)
              else setImageSelectPopup(true)
              // body.style.overflow = "hidden";
            }}
          >
            +
          </button>
          <p>set caption</p>
          <SelectImagePage
            trigger={imageSelectPopup}
            setTrigger={setImageSelectPopup}
          />
        </div>
      </header>
      {/* <form onSubmit={handleSubmit}>
        <div>
          <label>Caption</label>
          <input
            type="text"
            name="caption"
            onChange={updateCaption}
            value={caption}
          ></input>
        </div>
        <input type="file" accept="image/*" onChange={updateImage} />
        <button type="submit">Submit</button>
        {imageLoading && <p>Loading...</p>}
      </form> */}

    </ >
  );
};

export default CreateImagePage;
