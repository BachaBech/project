import React from "react";
import About from "../about/About";
import Services from "../services/Services";
import Contact from "../contact/Contact";
import SimpleImageSlider from "react-simple-image-slider";

const Home = () => {
  const isAdmin = localStorage.getItem("isAdmin");
  const token = localStorage.getItem("token");
  
  const sliderImages = [
    {
       url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThB_ctcNSuDRTUjsxgvMUMwC71YXsPJkcOXNsy_VzXOWEjTWRMQF0SK4oYbfuaIzDygr8&usqp=CAU",
    },
    {
       url: "https://orientini.com/uploads/Mater_iset_bizerte_2018.jpg",
    },
    {
       url: "https://isetke.rnu.tn/useruploads/images/isetke1.jpg",
    },
    // Add more image URLs as needed
  ];

  return (
    <div>
      <section id="home">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 mt-5" style={{ position: "relative" }}>

              <SimpleImageSlider
               width="100%"
               height={430}
               position="relative"
               images={sliderImages}
               showNavs={true}
              />

              <div className="buttons d-flex justify-content-center">
                <div className="App"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div>
        <Contact id="contact" />
      </div>
    </div>
  );
};

export default Home;
