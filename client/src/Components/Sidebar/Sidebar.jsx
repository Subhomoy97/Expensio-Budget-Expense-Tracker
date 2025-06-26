import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

// sidebar logo image
import home from "./../../assets/img/sidebaricon/home-white.png";
import dashboard from "./../../assets/img/sidebaricon/dashboard-white.png";
import transactions from "./../../assets/img/sidebaricon/transactions-white.png";
import analysis from "./../../assets/img/sidebaricon/analysis-white.png";
import budgets from "./../../assets/img/sidebaricon/budgets-white.png";
import expenses from "./../../assets/img/sidebaricon/expenses-white.png";
import categories from "./../../assets/img/sidebaricon/categories-white.png";

// sidebar logo image
import logo from "./../../assets/img/logo.png";

const Sidebar = ({ collapsed, onToggleSidebar }) => {
  return (
    <>
      <section className="fixed-left sidebar-wrapper overflow-hidden">
        <div className="container">
          <div className="row">
            <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
              <div className="sidebar-header">
                <h5 className="text-info fw-bold d-flex align-items-center justify-content-center gap-2">
                  {!collapsed && <span className="sidebar-title bg ms-2">EXPENSIO</span>}
                  <img src={logo} alt="Logo" className="sidebar-logo d-flex justify-content-center align-items-center ms-2" />
                </h5>
              </div>

              <nav className="nav flex-column flex-grow-1" style={{paddingLeft: collapsed ? "0px" : "15px",}}>
                <NavLink exact to="/" className="nav-link" activeClassName="active">
                  <img src={home} alt="home-img" />
                  {!collapsed && <span className="ms-2">Home</span>}
                </NavLink>
                <NavLink exact to="/dashboard" className="nav-link" activeClassName="active">
                  <img src={dashboard} alt="dashboard-img" />
                  {!collapsed && <span className="ms-2">Dashboard</span>}
                </NavLink>
                <NavLink to="/transactions" className="nav-link" activeClassName="active">
                  <img src={transactions} alt="transactions-img" />
                  {!collapsed && <span className="ms-2">Transactions</span>}
                </NavLink>
                <NavLink to="/analysis" className="nav-link" activeClassName="active">
                  <img src={analysis} alt="analysis-img" />
                  {!collapsed && <span className="ms-2">Analysis</span>}
                </NavLink>
                <NavLink to="/budgets" className="nav-link" activeClassName="active">
                  <img src={budgets} alt="budgets-img" />
                  {!collapsed && <span className="ms-2">Budgets</span>}
                </NavLink>
                <NavLink to="/expenses" className="nav-link" activeClassName="active">
                  <img src={expenses} alt="expenses-img" />
                  {!collapsed && <span className="ms-2">Expenses</span>}
                </NavLink>
                <NavLink to="/categories" className="nav-link" activeClassName="active">
                  <img src={categories} alt="categories-img" />
                  {!collapsed && <span className="ms-2">Categories</span>}
                </NavLink>

                <div className="sidebar-toggle d-flex justify-content-center my-3">
                <button
                  className="btn btn-light btn-sm rounded-circle"
                  onClick={onToggleSidebar}
                >
                  <i className={`fas ${collapsed ? "fa-arrow-right" : "fa-arrow-left"}`}></i>
                </button>
              </div>
              </nav>

            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Sidebar;
