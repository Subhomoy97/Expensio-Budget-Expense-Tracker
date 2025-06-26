// src/Pages/Categories/Categories.jsx
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "../../Layout/Layout";
import { FaEdit, FaTrash } from "react-icons/fa";
import ProfileAvtar from "../../Components/ProfileAvtar";
import AddCategoryModal from "../Categories/AddCategoryModal/AddCategoryModal";
import EditCategoryModal from "../Categories/EditCategoryModal/EditCategoryModal";
import {
  deleteCategory,
  getDefaultCategory,
  getDefaultCategoryImg,
  getUserCategory,
} from "../../Api/functions/categoryfunctions";
import Loader from "../../Components/Loader";
import { Link } from "react-router-dom";



function Categories() {
  const [defaultCategories, setDefaultCategories] = useState([]);
  const [userCategories, setUserCategories] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(true); // loading state

  const fetchCategories = async () => {
    setLoading(true);
    await getDefaultCategory(setDefaultCategories);
    await getUserCategory(setUserCategories);
    setLoading(false);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setNewCategory(category.name);
    setShowEditModal(true);
  };

  const handleSaveEditCategory = () => {
    const updatedCategories = userCategories.map((cat) =>
      cat._id === editingCategory._id ? { ...cat, name: newCategory } : cat
    );
    setUserCategories(updatedCategories);
    setEditingCategory(null);
    setShowEditModal(false);
  };

  const handleDeleteCategory = async (id) => {
    await deleteCategory(id);
    const updatedCategories = userCategories.filter((cat) => cat._id !== id);
    setUserCategories(updatedCategories);
  };

  return (
    <Layout>
      <section className="category-section">
        <div className="container my-3">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4>Categories</h4>
            <ProfileAvtar />
          </div>

          {loading ? (
            <Loader />
          ) : (
            <>
              <div
                className="p-4 px-4 rounded shadow-custom d-flex flex-column justify-content-center alig-items-center"
                style={{
                  backgroundColor: "#F4F1F6",
                  borderTopRightRadius: "100px",
                  borderBottomLeftRadius: "100px",
                }}
              >
                {/* Default Categories */}
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 ">
                  {defaultCategories.map((cat, index) => (
                    <div
                      className="col d-flex  mx-auto align-items-center"
                      key={index}
                    >
                      <div className="me-3" style={{ fontSize: "2rem" }}>
                        <img
                          src={getDefaultCategoryImg(cat.icon)}
                          alt=""
                          style={{ width: "40px", height: "40px" }}
                        />
                      </div>
                      <div>{cat.name}</div>
                    </div>
                  ))}
                </div>

                {/* User Categories */}
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3 mt-2">
                  {userCategories.map((cat, index) => (
                    <div className="col d-flex align-items-center" key={index}>
                      <div
                        className="me-3 d-flex justify-content-center align-items-center rounded-circle bg-primary text-white"
                        style={{
                          width: "40px",
                          height: "40px",
                          fontSize: "1.2rem",
                        }}
                      >
                        {cat.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>{cat.name}</div>
                      <div className="ms-auto">
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleDeleteCategory(cat._id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add Category Button */}
              <div className="text-center mt-4">
                <button
                  className="btn main-btn"
                  onClick={() => setShowAddModal(true)}
                >
                  + Add New Category
                </button>
              </div>
            </>
          )}
        </div>
      </section>
  {/* Footer */}
      <footer id="expensio-footer" className="bg-dark text-white pt-3">
        <div className="container text-center">
          <hr style={{ borderTop: "2px solid white" }} />
          <p>
            Use of this website constitutes acceptance of the site{" "}
            <Link to="/terms-conditions" className="text-primary text-decoration-underline fw-semibold">
              Terms of Service
            </Link>
          </p>
          <p className="mb-0">&#169; 2025 Expensio – All rights reserved</p>
        </div>
      </footer>
      {/* Add Category Modal */}
      <AddCategoryModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onCategoryAdded={fetchCategories}
      />

      {/* Edit Category Modal */}
      <EditCategoryModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleSaveEditCategory}
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
      />
    </Layout>
  );
}

export default Categories;
