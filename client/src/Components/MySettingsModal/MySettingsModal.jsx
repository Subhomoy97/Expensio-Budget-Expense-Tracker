// src/Components/MySettingsModal.jsx

import React from "react";
import { Modal, Form, Button } from "react-bootstrap";

const MySettingsModal = ({ show, onHide, settings, onChange, onSave }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Body
        style={{
          background: "rgb(226, 235, 244)",
          borderRadius: "20px",
          padding: "30px",
        }}
      >
        <h5 className="mb-4">My Settings</h5>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Currency</Form.Label>
            <Form.Select
              name="currency"
              value={settings.currency}
              onChange={onChange}
            >
              <option value="INR">INR</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="AUD">AUD</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Daily Limit</Form.Label>
            <Form.Control
              type="number"
              name="dailyLimit"
              value={settings.dailyLimit}
              onChange={onChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Weekly Limit</Form.Label>
            <Form.Control
              type="number"
              name="weeklyLimit"
              value={settings.weeklyLimit}
              onChange={onChange}
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Monthly Limit</Form.Label>
            <Form.Control
              type="number"
              name="monthlyLimit"
              value={settings.monthlyLimit}
              onChange={onChange}
            />
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onHide}>
              Cancel
            </Button>
            <Button variant="primary" onClick={onSave}>
              Save
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default MySettingsModal;
