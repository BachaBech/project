import React from "react";


import About from "../about/About";
import Services from "../services/Services";
import Contact from "../contact/Contact";




const Home = () => {
  const isAdmin = localStorage.getItem("isAdmin");
  const token = localStorage.getItem("token");

  return (
    <div>
      <section id="home">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 mt-5">
          
              <h1 className="display-4 fw-bolder mb-4 text-center text-white">
             
              </h1>
             
             
              <p className="lead text-center fs-4 mb-5 text-white">
              title.
         </p>
              <div className="buttons d-flex justify-content-center">
                <div className="App">
                  
                </div>
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
