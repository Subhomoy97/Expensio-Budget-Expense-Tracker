import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import {
  getDefaultCategory,
  getUserCategory,
} from "../../../Api/functions/categoryfunctions";
import { createBudget } from "../../../Api/functions/budgetFunctions";
import { toast } from "react-toastify";

const AddBudgetModal = ({ show, onClose, onBudgetAdded }) => {
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({
    amount: "",
    frequency: "",
    category: "",
  });

  useEffect(() => {
    getUserCategory((userCats) => {
      getDefaultCategory((defaultCats) => {
        const combined = [
          ...userCats,
          ...defaultCats.filter(
            (defCat) =>
              !userCats.some((userCat) => userCat.name === defCat.name)
          ),
        ];
        setCategories(combined);
      });
    });
  }, []);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { amount: "", frequency: "", category: "" };

    if (!amount.trim()) {
      newErrors.amount = "Amount is required";
      isValid = false;
      toast.error(newErrors.amount);
    } else if (isNaN(Number(amount)) || Number(amount) <= 0) {
      newErrors.amount = "Amount must be a positive number";
      isValid = false;
      toast.error(newErrors.amount);
    }

    if (!frequency) {
      newErrors.frequency = "Frequency is required";
      isValid = false;
      toast.error(newErrors.frequency);
    }

    if (!category) {
      newErrors.category = "Category is required";
      isValid = false;
      toast.error(newErrors.category);
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newBudget = {
        categoryId: category,
        amount: Number(amount),
        frequency,
      };

      try {
        await createBudget(newBudget);
       
        onBudgetAdded();
        onClose();
        setAmount("");
        setFrequency("");
        setCategory("");
        setErrors({ amount: "", frequency: "", category: "" }); // Clear errors on success
      } catch (error) {
        toast.error("Failed to add budget.");
        console.error("Error adding budget:", error);
      }
    }
    // If validation fails, the modal will not close because onClose() is not called.
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Budget</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              isInvalid={!!errors.amount}
            />
            <Form.Control.Feedback type="invalid">
              {errors.amount}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Frequency</Form.Label>
            <Form.Control
              as="select"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              isInvalid={!!errors.frequency}
            >
              <option value="">Select frequency</option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.frequency}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              isInvalid={!!errors.category}
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.category}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="text-end">
            <Button variant="secondary" onClick={onClose} className="me-2">
              Cancel
            </Button>
            <Button type="submit" className="main-btn">
              Add Budget
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddBudgetModal;