import React, { useState } from "react";
import moment from "moment";
// import momentLocalizer from "react-widgets-moment";
// momentLocalizer(moment);

const BonusForm = ({ addBonus }) => {
  const [formData, setFormData] = useState({
    date: "",
    amount: "",
    description: "",
    isRepeating: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addBonus(formData);
    // Clear form data after submission
    setFormData({
      date: "",
      amount: "",
      description: "",
      isRepeating: false
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label className="form-title">Bonus</label>

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

      {/* Is Repeating */}
      <div className="form-group">
        <input
          name="isRepeating"
          checked={formData.isRepeating}
          onChange={handleChange}
          className="form__small--check"
          type="checkbox"
          required
        />
        <label htmlFor="isRepeating" className="form__small--check__label">
          Is repeating
        </label>
      </div>

      {/* Submit Button */}
      <button type="submit" className="btn btn-primary submit-button">
        Submit
      </button>
    </form>
  );
};

export default BonusForm;
