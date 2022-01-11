import React, {useState} from "react";
import { useHistory } from "react-router-dom";


const CreateImagePage = () => {
    const history = useHistory(); // so that we can redirect after the image upload is successful
    const [errors, setErrors] = useState([]);
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const [caption, setCaption] = useState('');
    
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        
        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);

        formData.append("caption", caption)

        const res = await fetch('/api/games', {
            method: "POST",
            body: formData,
        });
        if (res.ok) {
            await res.json();
            setImageLoading(false);
            history.push("/games");
        }
        else {
            setImageLoading(false);
            // a real app would probably use more advanced
            // error handling
            console.log("error");
        }
    }
    
    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    const updateCaption = (e) => {
        setCaption(e.target.value);
      };
    
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Caption</label>
                <input type='text'
                        name='caption'
                        onChange={updateCaption}
                        value={caption}
                        ></input>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={updateImage}
            />
            <button type="submit">Submit</button>
            {(imageLoading)&& <p>Loading...</p>}
        </form>
    )
}

export default CreateImagePage;