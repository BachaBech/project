import React, { useEffect, useState } from "react";
import { fetchImages, uploadImage, updateImage, CurrentUser } from "../../apis/UserApi";

const Emp = () => {
  const [user, setUser] = useState({});
  const [class1, setClass1] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [images, setImages] = useState({});
  const token = localStorage.getItem("token");
  const isTeacher = localStorage.getItem("isTeacher");
  const isStd = localStorage.getItem("isStd");
  useEffect(() => {
    const isLoggedIn = async () => {
      const userLg = await CurrentUser();
      setUser(userLg.data.user);
    };

    if (isStd && class1) {
      const fetchImagesByClass = async () => {
        const images = await fetchImages(class1);
        setImages(images);
      };
      fetchImagesByClass();
    }
  }, [class1, isStd]);

  const handleClassChange = (e) => {
    setClass1(e.target.value);
  };

  const handleImageUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("imageUrl", selectedFile);
      formData.append("class1", user.class1);
  
      // Check if the user already has an image
      if (images.image) {
        // Update the existing image
        const res = await updateImage(user.image._id, formData);
        setUploadedImage(res.data.imageUrl);
      } else {
        // Upload a new image
        const res = await uploadImage(formData);
        setUploadedImage(res.data.image);
      }
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleImageSelect = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
<div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 mt-5">
          
              <h1 className="display-4 fw-bolder mb-4 text-center text-white">
             
              </h1>
             
             
              <p className="lead text-center fs-4 mb-5 text-white">
              We provide you with the ability to work and complete your tasks.
         </p>
         <div>
      {!token ? (
        <>
          {/* Render something when the user is not logged in */}
        </>
      ) : (
        <>
          {isTeacher && (
            <>
              <select value={class1} onChange={handleClassChange}>
                <option value="info">Information Technology</option>
                <option value="management">Management</option>
              </select>
              <input type="file" onChange={handleImageSelect} />
              <button onClick={handleImageUpload}>Upload Image</button>
              {uploadedImage && <img src={uploadedImage} alt="Uploaded" />}
            </>
          )}

          {isStd && (
            <>
              {images.map((image, index) => (
                <img key={index} src={image} alt="Fetched" />
              ))}
            </>
          )}
        </>
      )}
    </div>
              <div className="buttons d-flex justify-content-center">
                <div className="App">
                  
                </div>
              </div>
            </div>
          </div>
        </div>

   
  );
};

export default Emp;
