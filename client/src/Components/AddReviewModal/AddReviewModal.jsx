import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { FaStar } from "react-icons/fa";

const AddReviewModal = ({ show, onHide, onSubmit }) => {
  

  const [reviewData, setReviewData] = useState({
    rating: 0,
    comment: "",
  });
  const [hoveredRating, setHoveredRating] = useState(0);

 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStarClick = (ratingValue) => {
    setReviewData((prev) => ({ ...prev, rating: ratingValue }));
  };

  const handleStarHover = (ratingValue) => {
    setHoveredRating(ratingValue);
  };

  const handleStarLeave = () => {
    setHoveredRating(0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(reviewData);
    // Reset the form after submission
    setReviewData({ name: "", rating: 0, comment: "" });
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Rating</Form.Label>
            <div className="d-flex align-items-center">
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <FaStar
                    key={ratingValue}
                    size={30}
                    className="me-1"
                    color={
                      ratingValue <= (hoveredRating || reviewData.rating)
                        ? "#ffc107"
                        : "#e4e5e9"
                    }
                    style={{ cursor: "pointer" }}
                    onClick={() => handleStarClick(ratingValue)}
                    onMouseEnter={() => handleStarHover(ratingValue)}
                    onMouseLeave={handleStarLeave}
                  />
                );
              })}
              {reviewData.rating > 0 && (
                <span className="ms-2">({reviewData.rating} Stars)</span>
              )}
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Comment</Form.Label>
            <Form.Control
              as="textarea"
              name="comment"
              rows={3}
              placeholder="Enter your comment"
              value={reviewData.comment}
              onChange={handleInputChange}
            />
          </Form.Group>

          <div className="text-end">
            <Button variant="secondary" onClick={onHide} className="me-2">
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Submit Review
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddReviewModal;
