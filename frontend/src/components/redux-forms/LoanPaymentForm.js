import React, { useState } from 'react';
import moment from 'moment';

moment.locale('en');
// momentLocalizer(moment);

const LoanPaymentForm = ({ addLoanExtraPayment }) => {
    const [formData, setFormData] = useState({
        date: '',
        amount: '',
        description: ''
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
        addLoanExtraPayment(formData);
        // Clear form data after submission
        setFormData({
            date: '',
            amount: '',
            description: ''
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label className="form-title">Loan Payment</label>

            {/* Date */}
            <div className="form-group">
                <label htmlFor="date">Date</label>
                <input
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    type="date"
                    className="form-control"
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
                />
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary submit-button">
                Submit
            </button>
        </form>
    );
};

export default LoanPaymentForm;
