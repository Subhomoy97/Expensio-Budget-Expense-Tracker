import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import ellipse1 from "./../../../assets/img/editimg/Ellipse10.png";
import ellipse2 from "./../../../assets/img/editimg/Ellipse11.png";
import { createProfile } from "../../../Api/functions/profileFunction";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthProvider";

const CreateProfile = () => {
  const [auth, setAuth, profileCreate, setProfileCreate] = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ phone: "", address: "" });
  const [profilePic, setProfilePic] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("phone", formData.phone);
    data.append("address", formData.address);
    if (profilePic) data.append("profilePic", profilePic);
    createProfile(data, navigate, setLoading, setProfileCreate);
  };

  return (
    <section className="position-relative min-vh-100 d-flex align-items-center justify-content-center">
      <img src={ellipse1} alt="Left Ellipse" className="position-absolute start-0 translate-middle-y" style={{ width: "150px", opacity: 0.5, top: "70%" }} />
      <img src={ellipse2} alt="Right Ellipse" className="position-absolute end-0 bottom-0" style={{ width: "150px", opacity: 0.5 }} />
      <Container>
        <Row className="d-flex align-items-start justify-content-center py-3">
          <Col xs={12} md={4} lg={4} className="text-center mb-4 mb-md-0">
            <div className="position-relative d-inline-block">
              <img
                src={profilePic ? URL.createObjectURL(profilePic) : "https://w7.pngwing.com/pngs/247/564/png-transparent-computer-icons-user-profile-user-avatar-blue-heroes-electric-blue.png"}
                alt="Profile"
                className="rounded-4 img-fluid shadow-sm"
                style={{ width: "240px", height: "240px", objectFit: "cover", border: "4px solid #e0e0e0" }}
              />
              <label htmlFor="profileImageUpload" className="btn btn-light p-1 rounded-circle position-absolute" style={{ bottom: "0", right: "0", transform: "translate(25%, 25%)", border: "1px solid #dee2e6", backgroundColor: "#ffffff", cursor: "pointer" }}>
                <i className="bi bi-pencil-fill text-primary small"></i>
              </label>
              <input id="profileImageUpload" type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
            </div>
          </Col>

          <Col xs={12} md={8} lg={8}>
            <div className="bg-white p-2 p-md-4 rounded-4 shadow-lg" style={{ background: "linear-gradient(to right, #f9f9f9, #e0f1ff)" }}>
              <h4 className="mb-2 text-center fw-bold text-primary">Create Profile</h4>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-2">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control size="sm" type="text" name="phone" value={formData.phone} onChange={handleChange} />
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Address</Form.Label>
                  <Form.Control size="sm" type="text" name="address" value={formData.address} onChange={handleChange} />
                </Form.Group>

                <div className="mt-3">
                  <Button type="submit" variant="primary" size="sm" className="fw-semibold py-2" disabled={loading}>
                    {loading ? "Creating Profile..." : "Create Profile"}
                  </Button>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CreateProfile;
