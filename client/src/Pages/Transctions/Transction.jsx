import React, { useEffect, useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight, FaChevronDown } from "react-icons/fa";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import Layout from "../../Layout/Layout";
import ProfileAvtar from "../../Components/ProfileAvtar";
import { getAllExpense } from "../../Api/functions/expencseFunctions";
import Loader from "../../Components/Loader";
import { getAllSetting } from "../../Api/functions/settingFunctions";
import formatCurrency from "../../utils/formatCurrency";
import { Link } from "react-router-dom";

const Transaction = () => {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [visibleTable, setVisibleTable] = useState(10);
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [mode, setMode] = useState("month"); // "month" or "year"
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [getSetting, setGetSetting] = useState([]);

  const handleVisibleTable = () => setVisibleTable((prev) => prev + 10);

  const handlePrev = () => {
    if (mode === "month") {
      if (month === 0) {
        setMonth(11);
        setYear((prev) => prev - 1);
      } else {
        setMonth((prev) => prev - 1);
      }
    } else {
      setYear((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (mode === "month") {
      if (month === 11) {
        setMonth(0);
        setYear((prev) => prev + 1);
      } else {
        setMonth((prev) => prev + 1);
      }
    } else {
      setYear((prev) => prev + 1);
    }
  };

  useEffect(() => {
    setLoading(true);
    getAllExpense((data) => {
      setAllData(data);
      setLoading(false);
    });
    getAllSetting(setGetSetting);
  }, []);

  useEffect(() => {
    let filtered = allData;

    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      filtered = filtered.filter((item) => {
        const date = new Date(item.date);
        return date >= start && date <= end;
      });
    } else if (mode === "year") {
      filtered = filtered.filter((item) => {
        const date = new Date(item.date);
        return date.getFullYear() === year;
      });
    } else {
      filtered = filtered.filter((item) => {
        const date = new Date(item.date);
        return date.getMonth() === month && date.getFullYear() === year;
      });
    }

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.note.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(filtered);
    setVisibleTable(5);
  }, [allData, month, year, searchTerm, startDate, endDate, mode]);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    const title = "Expensio";
    const titleWidth = doc.getTextWidth(title);
    doc.text(title, (pageWidth - titleWidth) / 2, 15);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(18);
    doc.text("Transaction Report", 14, 28);

    doc.setFontSize(12);
    let rangeText = "";

    if (startDate && endDate) {
      rangeText = `Range: ${startDate} to ${endDate}`;
    } else if (mode === "year") {
      rangeText = `Year: ${year}`;
    } else {
      rangeText = `Month: ${new Date(year, month).toLocaleString("default", {
        month: "long",
        year: "numeric",
      })}`;
    }

    doc.text(rangeText, 14, 36);

    const tableColumn = ["Date", "Description", "Category", "Amount"];
    const tableRows = filteredData.map((item) => [
      new Date(item.date).toISOString().split("T")[0],
      item.note,
      item.categoryId?.name || "N/A",
      item.amount,
    ]);

    autoTable(doc, {
      startY: 40,
      head: [tableColumn],
      body: tableRows,
    });

    doc.save("transactions.pdf");
  };

  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : (
        <section className="transaction-section">
          <div className="container-fluid p-3">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h4 className="fw-bold m-0">Transaction</h4>
              <ProfileAvtar />
            </div>

            {/* Month/Year Navigation with Mode Toggle */}
            <div className="d-flex justify-content-center my-3">
              <div
                className="d-flex align-items-center justify-content-between px-4 py-2"
                style={{
                  backgroundColor: "#E3E9F1",
                  borderRadius: "10px",
                  width: "60%",
                  border: "none",
                  boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
                }}
              >
                <Button
                  variant="link"
                  style={{ color: "#333", textDecoration: "none" }}
                  className="p-0"
                  onClick={handlePrev}
                >
                  <FaChevronLeft />
                </Button>
                <span style={{ fontWeight: "600" }}>
                  {mode === "month"
                    ? new Date(year, month).toLocaleString("default", {
                        month: "long",
                        year: "numeric",
                      })
                    : year}
                </span>
                <Button
                  variant="link"
                  style={{ color: "#333", textDecoration: "none" }}
                  className="p-0"
                  onClick={handleNext}
                >
                  <FaChevronRight />
                </Button>

                <Form.Select
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  style={{
                    width: "120px",
                    borderRadius: "8px",
                    marginLeft: "1rem",
                    backgroundColor: "#fff",
                  }}
                >
                  <option value="month">Month</option>
                  <option value="year">Year</option>
                </Form.Select>
              </div>
            </div>

            {/* Date Range Filter */}
            <div
              className="p-3 rounded mb-4"
              style={{
                backgroundColor: "#E3E9F1",
                boxShadow: "0 0 5px rgba(0,0,0,0.1)",
              }}
            >
              <h5 className="mb-3 fw-bold text-center">
                Select Date Range: From – To
              </h5>
              <div className="d-flex flex-wrap justify-content-center align-items-center gap-3">
                <div>
                  <label htmlFor="start-date" className="form-label fw-semibold mb-1">
                    From:
                  </label>
                  <input
                    id="start-date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="form-control"
                    style={{
                      borderRadius: "8px",
                      padding: "10px",
                      backgroundColor: "#fff",
                      minWidth: "180px",
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="end-date" className="form-label fw-semibold mb-1">
                    To:
                  </label>
                  <input
                    id="end-date"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="form-control"
                    style={{
                      borderRadius: "8px",
                      padding: "10px",
                      backgroundColor: "#fff",
                      minWidth: "180px",
                    }}
                  />
                </div>
                <div>
                  <label className="form-label d-block invisible">Reset</label>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => {
                      setStartDate("");
                      setEndDate("");
                    }}
                  >
                    Reset Filter
                  </button>
                </div>
              </div>
            </div>

            {/* Filter Info */}
            {(startDate && endDate) && (
              <div className="text-center mb-2 fw-semibold">
                Showing Transactions from <u>{startDate}</u> to <u>{endDate}</u>
              </div>
            )}
            {mode === "year" && !startDate && !endDate && (
              <div className="text-center mb-2 fw-semibold">
                Showing Transactions of Year <u>{year}</u>
              </div>
            )}

            {/* Table */}
            <div className="transcition-area rounded" style={{ background: "#f8f9fa" }}>
              <Table hover className="transcition-table mb-0 shadow-custom rounded">
                <thead style={{ background: "#CFDBE9" }}>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Category</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length === 0 ? (
                    <tr style={{ borderTop: "1px dashed #dee2e6" }}>
                      <td colSpan="4" className="text-center py-3">
                        No transactions found
                      </td>
                    </tr>
                  ) : (
                    filteredData.slice(0, visibleTable).map((item, index) => (
                      <tr key={index} style={{ borderTop: "1px dashed #dee2e6" }}>
                        <td>{new Date(item.date).toISOString().split("T")[0]}</td>
                        <td>{item.note}</td>
                        <td>{item.categoryId?.name}</td>
                        <td>
                          {formatCurrency(item.amount, getSetting.data.currency)}
                        </td>
                      </tr>
                    ))
                  )}
                  {filteredData.length > visibleTable && (
                    <tr>
                      <td colSpan="4" className="text-center py-3">
                        <Button
                          variant="link"
                          onClick={handleVisibleTable}
                          style={{
                            color: "black",
                            textDecoration: "none",
                            fontWeight: "600",
                          }}
                        >
                          See more <FaChevronDown />
                        </Button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>

            {/* Download PDF */}
            <div className="text-end px-3 pb-3 mt-2">
              <Button variant="dark" className="main-btn" onClick={handleDownloadPDF}>
                Download PDF
              </Button>
            </div>
          </div>
        </section>
      )}
      <footer id="expensio-footer" className="bg-dark text-white mp-3">
        <div className="container text-center">
          <hr style={{ borderTop: "2px solid white" }} />
          <p>
            Use of this website constitutes acceptance of the site{" "}
            <Link
              to="/terms-conditions"
              className="text-primary text-decoration-underline fw-semibold"
            >
              Terms of Service
            </Link>
          </p>
          <p className="mb-0">&#169; 2025 Expensio – All rights reserved</p>
        </div>
      </footer>
    </Layout>
  );
};

export default Transaction;
