import React, { useState } from "react";
import NavBar from "../Navbar";
import SelectImagePage from "../SelectImagePage"
import './CreateImagePage.css'

const CreateImagePage = () => {
  // const [errors, setErrors] = useState([]);
  const [imageSelectPopup, setImageSelectPopup] = useState(false);

  return (
    <>
      <NavBar />
      <header className="grid">
        <div className="grid-mid">
          <SelectImagePage
            trigger={imageSelectPopup}
            setTrigger={setImageSelectPopup}
          />
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
        </div>
        <div className="ender" onClick={e => setImageSelectPopup(false)}>
          <p> click here to exit modal </p>
        </div>
      </header>
     

    </ >
  );
};

export default CreateImagePage;
