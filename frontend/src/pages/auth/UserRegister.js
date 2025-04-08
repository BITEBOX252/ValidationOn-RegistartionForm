import React, { useState } from 'react';
import { TextField, FormControlLabel, Checkbox } from '@mui/material';
import { Link } from 'react-router-dom';


function inputTest(data) {
    data = data.trim();
    data = data.replace(/\\/g, ''); // Removes backslashes
    data = data.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;'); // HTML special chars
    return data;
  }
function UserRegister() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
        tc: false,
      });
      const [formErrors, setFormErrors] = useState({});
    
      // Handle input changes
      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
          ...formData,
          [name]: type === 'checkbox' ? checked : value,
        });
      };
    
      // Validation functions
      const regEmailTest = (data) => {
        const email = inputTest(data);
        return email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Email validation
      };
    
      const regPasswordTest = (data) => {
        return data.length >= 6; // Password length validation (minimum)
      };
    
      const nameValidator = (data) => {
        const sanitizedData = inputTest(data);
        return /^[a-zA-Z-' ]*$/.test(sanitizedData); // Name validation
      };
    
      const characterLengthValidator = (data, minLength, maxLength) => {
        return data.length >= minLength && data.length <= maxLength; // Character length validation (minimum and maximum)
      };
    
      // Form submission handler
      const handleSubmit = (e) => {
        e.preventDefault();
        const errors = {};
    
        // Sanitize and validate the name
        const sanitizedName = inputTest(formData.name);
        if (!nameValidator(sanitizedName)) {
          errors.name = 'Name can only contain letters, spaces, and hyphens';
        } else if (!characterLengthValidator(sanitizedName, 3, 50)) {
          errors.name = 'Name must be between 3 and 50 characters long';
        }
    
        // Sanitize and validate the email
        const sanitizedEmail = inputTest(formData.email);
        if (!regEmailTest(sanitizedEmail)) {
          errors.email = 'Invalid email format';
        } else if (!characterLengthValidator(sanitizedEmail, 5, 50)) {
          errors.email = 'Email must be between 5 and 50 characters long';
        }
    
        // Validate the password
        if (!regPasswordTest(formData.password)) {
          errors.password = 'Password must be at least 6 characters long';
        } else if (!characterLengthValidator(formData.password, 6, 50)) {
          errors.password = 'Password must be between 6 and 50 characters long';
        }
    
        // Check if passwords match
        if (formData.password !== formData.password2) {
          errors.password2 = 'Passwords do not match';
        }
    
        // Validate terms and conditions checkbox
        if (!formData.tc) {
          errors.tc = 'You must agree to the terms and conditions';
        }
    
        setFormErrors(errors);
    
        // If no errors, proceed with form submission
        if (Object.keys(errors).length === 0) {
          console.log('Form submitted:', {
            ...formData,
            name: sanitizedName,
            email: sanitizedEmail,
          });
          // Further form submission logic goes here (API call, etc.)
        }
      };
    
      return (
        <main className="mb-24 mt-12">
          <div className="container mx-auto">
            <section>
              <div className="flex justify-center">
                <div className="w-full max-w-lg">
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="text-2xl text-center font-semibold">Register Account</h3>
                    <br />
                    <form onSubmit={handleSubmit} noValidate> {/* Added noValidate */}
                      {/* Full Name */}
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Full Name</label>
                        <TextField
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Full Name"
                          value={formData.name}
                          onChange={handleChange}
                          error={!!formErrors.name}
                          helperText={formErrors.name}
                          required
                          fullWidth
                        />
                      </div>
    
                      {/* Email */}
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                        <TextField
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={handleChange}
                          error={!!formErrors.email}
                          helperText={formErrors.email}
                          required
                          fullWidth
                        />
                      </div>
    
                      {/* Password */}
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                        <TextField
                          type="password"
                          id="password"
                          name="password"
                          placeholder="Password"
                          value={formData.password}
                          onChange={handleChange}
                          error={!!formErrors.password}
                          helperText={formErrors.password}
                          required
                          fullWidth
                        />
                      </div>
    
                      {/* Confirm Password */}
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password2">Confirm Password</label>
                        <TextField
                          type="password"
                          id="password2"
                          name="password2"
                          placeholder="Confirm Password"
                          value={formData.password2}
                          onChange={handleChange}
                          error={!!formErrors.password2}
                          helperText={formErrors.password2}
                          required
                          fullWidth
                        />
                      </div>
    
                      {/* Terms and Conditions */}
                      <div className="mb-4">
                        <FormControlLabel
                          control={
                            <Checkbox
                              value={formData.tc}
                              onChange={handleChange}
                              name="tc"
                              id="tc"
                              color="primary"
                            />
                          }
                          label="I agree to terms and conditions."
                        />
                        {formErrors.tc && <p className="text-red-500 text-xs">{formErrors.tc}</p>}
                      </div>
    
                      {/* Submit Button */}
                      <button
                        className="w-full bg-blue-500 text-white py-2 rounded-md flex justify-center items-center"
                        type="submit"
                      >
                        <span className="mr-2">Sign Up</span>
                        <i className="fas fa-user-plus" />
                      </button>
    
                      {/* Existing Account Link */}
                      <div className="text-center mt-4">
                        <p>
                          Already have an account?{' '}
                          <Link to="/login" className="text-blue-500 hover:underline">
                            Login
                          </Link>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      );
}

export default UserRegister