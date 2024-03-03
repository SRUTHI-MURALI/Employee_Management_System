import React, { useState } from "react";
import moment from "moment";
// import momentLocalizer from "react-widgets-moment";
// momentLocalizer(moment);

const AddEmployeeForm = ({ addEmployee }) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    jmbg: "",
    birthdate: "",
    gender: "",
    position: "",
    startdate: "",
    isPayoneer: false
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
    addEmployee(formData);
    // Clear form data after submission
    setFormData({
      name: "",
      surname: "",
      jmbg: "",
      birthdate: "",
      gender: "",
      position: "",
      startdate: "",
      isPayoneer: false
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Name */}
      <div className="form-group form__small">
        <label htmlFor="name">Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          type="text"
          className="form-control"
          required
        />
      </div>

      {/* Surname */}
      <div className="form-group form__small form__small--right">
        <label htmlFor="surname">Surname</label>
        <input
          name="surname"
          value={formData.surname}
          onChange={handleChange}
          type="text"
          className="form-control"
          required
        />
      </div>

      {/* JMBG */}
      <div className="form-group">
        <label htmlFor="jmbg">JMBG</label>
        <input
          name="jmbg"
          value={formData.jmbg}
          onChange={handleChange}
          type="text"
          className="form-control"
          required
        />
      </div>

      {/* Birthdate */}
      <div className="form-group form__small">
        <label htmlFor="birthdate">Date Of Birth</label>
        <input
          name="birthdate"
          value={formData.birthdate}
          onChange={handleChange}
          type="date"
          className="form-control"
          required
        />
      </div>

      {/* Gender */}
      <div className="form-group form__small form__small--right">
        <label htmlFor="gender">Gender</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="form-control"
          required
        >
          <option></option>
          <option value="M">Male</option>
          <option value="F">Female</option>
        </select>
      </div>

      {/* Position */}
      <div className="form-group">
        <label htmlFor="position">Position</label>
        <input
          name="position"
          value={formData.position}
          onChange={handleChange}
          type="text"
          className="form-control"
          required
        />
      </div>

      {/* Start Date */}
      <div className="form-group">
        <label htmlFor="startdate">Start Date</label>
        <input
          name="startdate"
          value={formData.startdate}
          onChange={handleChange}
          type="date"
          className="form-control"
          required
        />
      </div>

      {/* Is Payoneer */}
      <div className="form-group">
        <input
          name="isPayoneer"
          checked={formData.isPayoneer}
          onChange={handleChange}
          type="checkbox"
          className="form__small--check"
          required
        />
        <label htmlFor="isPayoneer" className="form__small--check__label">
          Is Payoneer
        </label>
      </div>

      {/* Submit Button */}
      <button type="submit" className="btn btn-primary submit-button">
        Submit
      </button>
    </form>
  );
};

export default AddEmployeeForm;
