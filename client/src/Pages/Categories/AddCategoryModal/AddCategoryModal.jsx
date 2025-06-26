// src/Components/AddCategoryModal.js
import React, { useState } from "react";
import { createCategory } from "../../../Api/functions/categoryfunctions";

const AddCategoryModal = ({ show, onClose, onCategoryAdded }) => {
  if (!show) return null;

  const [addCategory, setAddCategory] = useState("");

  const handleAddCategory = async () => {
    const data = { name: addCategory };
    try {
      await createCategory(data);
      setAddCategory(""); // clear input
      onClose(); // close modal
      onCategoryAdded(); // refetch categories
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  };

  return (
    <div
      className="modal d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Add New Category</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Category Name</label>
              <input
                type="text"
                value={addCategory}
                onChange={(e) => setAddCategory(e.target.value)}
                className="form-control"
                placeholder="Enter category name"
              />
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="button" className="btn main-btn" onClick={handleAddCategory}>
              Add Category
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategoryModal;
