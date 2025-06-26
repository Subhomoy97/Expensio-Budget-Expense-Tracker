import React, { useState } from "react";
import Navbar from "../Components/nav/Navbar";
import Footer from "../Components/Footer";
import border from "./../assets/img/banner-border.png";
import { submitContact } from "../Api/functions/contactFunctions";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = {
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    };
    // Example: Console log the data. Replace this with API call if needed.
    console.log("Form submitted:", formData);
    submitContact(newData)
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <>
      <Navbar />
      <section
        className="contact-banner p-5 bg-light text-center position-relative"
        style={{ marginTop: "80px" }}
      >
        <div className="container">
          <div className="border-image">
            <h1 className="display-5 fw-bold">Contact Us</h1>
            <img
              src={border}
              alt="border"
              className="img-fluid mt-3"
              style={{ maxWidth: "100%" }}
            />
          </div>
        </div>
      </section>

      <section className="customer-support">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-12">
              <div className="support-info">
                <h3 className="fw-bold mb-3">Customer Support</h3>
                <p className="mb-4">
                  For help with your account, troubleshooting or using our
                  features...
                </p>
                <div className="mb-3">
                  <a
                    href="mailto:supportexpensio2@gmail.com"
                    className="text-decoration-none text-dark d-flex align-items-center"
                  >
                    <i className="fa-regular fa-envelope me-2 iconSocial"></i>
                    supportexpensio2@gmail.com
                  </a>
                </div>
                <div>
                  <a
                    href="tel:2562744464"
                    className="text-decoration-none text-dark d-flex align-items-center"
                  >
                    <i className="fa-solid fa-phone me-2 iconSocial"></i>
                    256-274-4464
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-form-area col-lg-6 col-12">
              <div className="contact-form">
                <p className="fw-bold">Send Us a Message</p>
               
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
       
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                  
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      name="subject"
                      className="form-control"
                      placeholder="Enter your subject"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      name="message"
                      className="form-control"
                      rows="4"
                      placeholder="Enter your message"
                      value={formData.message}
                      onChange={handleChange}
                   
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <button type="submit" className="btn submit w-100">
                      Send
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Contact;
