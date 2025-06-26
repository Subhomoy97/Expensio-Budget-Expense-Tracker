// src/Components/EditCategoryModal.js
import React, { useState, useEffect } from "react";
import { getDefaultCategory, getUserCategory } from "../../../Api/functions/categoryfunctions";

const EditCategoryModal = ({ show, onClose, onSave, value, onChange }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getUserCategory((userCats) => {
      getDefaultCategory((defaultCats) => {
        const combined = [
          ...userCats,
          ...defaultCats.filter(
            (defCat) => !userCats.some((userCat) => userCat.name === defCat.name)
          ),
        ];
        setCategories(combined);
      });
    });
  }, []);

  if (!show) return null;

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
            <h5 className="modal-title">Edit Category</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label className="form-label">Select Category</label>
              <select
                className="form-select"
                value={value}
                onChange={onChange}
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="button" className="btn btn-primary" onClick={onSave}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCategoryModal;
