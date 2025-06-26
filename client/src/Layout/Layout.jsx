import React, { useState, useEffect, useRef } from "react";
import Sidebar from "../Components/Sidebar/Sidebar";

const Layout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);
  const sidebarRef = useRef(null);

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth < 992);
  };

  //  Close mobile sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        isMobile &&
        collapsed
      ) {
        setCollapsed(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [collapsed, isMobile]);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="d-flex" style={{ height: "100vh", overflow: "hidden" }}>
      {/* Sidebar (Desktop) */}
      {!isMobile && (
        <div
          style={{
            width: collapsed ? "80px" : "250px",
            transition: "width 0.3s ease",
            height: "100vh",
            overflow: "hidden",
            backgroundColor: "#fff",
            borderRight: "1px solid #dee2e6",
          }}
        >
          <Sidebar collapsed={collapsed} onToggleSidebar={handleToggleSidebar} />
        </div>
      )}

      {/* Main Content */}
      <div
        style={{
          flexGrow: 1,
          overflowY: "auto",
          height: "100vh",
          transition: "all 0.3s ease",
          backgroundColor: "#f8f9fa",
        }}
      >
        {/* Mobile Sidebar Button */}
        {isMobile && (
          <div className="d-flex justify-content-between position-fixed w-100 px-2 py-3 d-lg-none" style={{backgroundColor: "#FAEAD7", zIndex: "999"}}>
            <h2 className="expensioo text-start" style={{width: "100%"}}>EXPENSIO</h2>
            <button className="btn btn-primary" onClick={handleToggleSidebar}>
              <i className="fas fa-bars"></i>
            </button>
            {collapsed && (
              <div
                ref={sidebarRef}
                className="position-absolute top-0 start-0 bg-white shadow"
                style={{
                  width: "250px",
                  height: "100vh",
                  zIndex: 1050,
                  transition: "0.3s",
                }}
              >
                <Sidebar collapsed={false} onToggleSidebar={handleToggleSidebar} />
              </div>
            )}
          </div>
        )}

        <div className="layout-childrenarea" >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
