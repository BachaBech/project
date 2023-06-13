import axios from "axios";

export const CurrentUser = async () => {
    let opts = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    try {
      const res = await axios.get("/api/user/auth", opts);
       
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  export  const hundelUpdate = async (id,user) => {
    const config = { headers: { "Content-Type": "application/json" } };
    try {
      const res = await axios.put(`/api/user/update/${id}`,
        user,
        config
      );
    } catch (error) {
      console.log(error);
    }
  };

  export const GetAllUsers = async () => {
  
    try {
      const res = await axios.get("/api/user/allusers");
       
      return res.data.allusers;
    } catch (error) {
      console.log(error);
    }
  };

  
  export const ApplyOff = async (id,apply) => {
  
    try {
      const config = { headers: { "Content-Type": "application/json" } };
    const res = await axios.put(`/api/user/apply/${id}`, apply, config);
      //  console.log(res.data.offers)
      // return res.data.offers;
    } catch (error) {
      console.log(error);
    }
  };

  export const uploadImage = async (formData) => {
    try {
      const res = await axios.post("/api/user/upload-image", formData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
  
  export const updateImage = async (class1, formData) => {
    try {
      const res = await axios.put(`/api/images/${class1}`, formData);
      return res.data;
    } catch (error) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data);
      } else {
        throw new Error("Image update failed");
      }
    }
  };
  


  export const getImagesByClass = async (class1) => {
    try {
      const res = await axios.get(`/api/images/${class1}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  export const fetchImages = async (class1) => {
    try {
      const res = await getImagesByClass(class1);
      return res.data.image;
    } catch (error) {
      console.log(error);
    }
  };
  
  