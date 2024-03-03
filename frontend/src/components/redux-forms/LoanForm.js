import React, { useState } from "react";
import moment from "moment";

moment.locale("en");
// momentLocalizer(moment);

const LoanForm = ({ addLoan }) => {
  const [formData, setFormData] = useState({
    date: "",
    amount: "",
    installment: "",
    unit: "",
    description: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addLoan(formData);
    // Clear form data after submission
    setFormData({
      date: "",
      amount: "",
      installment: "",
      unit: "",
      description: ""
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="form-title">Loan</label>

      {/* Date */}
      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          name="date"
          value={formData.date}
          onChange={handleChange}
          type="date"
          className="form-control"
          required
        />
      </div>

      {/* Amount */}
      <div className="form-group">
        <label htmlFor="amount">Amount</label>
        <input
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          type="number"
          className="form-control"
          required
        />
      </div>

      {/* Installment */}
      <div className="form-group">
        <label htmlFor="installment">Installment</label>
        <input
          name="installment"
          value={formData.installment}
          onChange={handleChange}
          type="number"
          className="form-control"
          required
        />
      </div>

      {/* Unit */}
      <div className="form-group">
        <label htmlFor="unit">Unit</label>
        <select
          name="unit"
          value={formData.unit}
          onChange={handleChange}
          className="form-control"
          required
        >
          <option></option>
          <option value="BAM">BAM</option>
          <option value="$">$</option>
        </select>
      </div>

      {/* Description */}
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input
          name="description"
          value={formData.description}
          onChange={handleChange}
          type="text"
          className="form-control"
          required
        />
      </div>

      {/* Submit Button */}
      <button type="submit" className="btn btn-primary submit-button">
        Submit
      </button>
    </form>
  );
};

export default LoanForm;
