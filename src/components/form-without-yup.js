import React, { useState } from 'react'

const FormWithoutYup = () => {
     const [formData, setFormData] = useState({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          password: "",
          confirmPassword: "",
          age: "",
          gender: "",
          intrests: [],
          birthDate: ""

     })


     const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData({
               ...formData,
               [name]: value
          })

     }
     const handlecheckbox = (e) => {
          e.preventDefault();
          const { name, checked } = e.target;
          let updatedCheckbox = [...formData.intrests];
          if (checked) {
               updatedCheckbox.push(name);
          } else {
               updatedCheckbox = updatedCheckbox.filter(intrest => intrest !== name);
          }

          setFormData({
               ...formData,
               intrests: updatedCheckbox
          })
     }
     const [errors, setErrors] = useState();
     const validationForm = (e) => {
          let newErrors = {}
          if (!formData.firstName) {
               newErrors.firstName = "First name is required"
          }
          if (!formData.lastName) {
               newErrors.lastName = "Last name is required"
          }
          if (!formData.email) {
               newErrors.email = "Email is required"
          }
          setErrors(newErrors)
          return Object.keys(newErrors).length === 0;
     }
     const handleSubmit = (e) => {
          e.preventDefault();
          const isValid = validationForm();
          if (isValid) {
               console.log("from Submit", formData);
          } else {
               console.log("from validation failed");
          }
     }
     console.log("errors", errors);

     return (
          <div className='container'>
               <form className='form-ctn' onSubmit={handleSubmit}>
                    <div className="form-group">
                         <label>First Name</label>
                         <input
                              className="form-control"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              placeholder="First Name" />
                         {/* {errors.firstName && (<div className='error-red'>{errors.firstName}</div>)} */}

                    </div>
                    <div className="form-group">
                         <label>Last Name</label>
                         <input type='text' className="form-control" name="lastName" onChange={handleChange} value={formData.lastName} placeholder='Enter the Last Name' />

                    </div>
                    <div className="form-group">
                         <label>Email</label>
                         <input type='email' className="form-control" name="email" onChange={handleChange} value={formData.email} placeholder='Enter the Email' />

                    </div>
                    <div className="form-group">
                         <label>Password</label>
                         <input type='password' className="form-control" name="password" onChange={handleChange} value={formData.password} placeholder='Enter the Password' />
                    </div>
                    <div className="form-group">
                         <label>Confirm Password</label>
                         <input type='password' className="form-control" name="confirmPassword" onChange={handleChange} value={formData.confirmPassword} placeholder='Enter the Confirm Password' />
                    </div>
                    <div className="form-group">
                         <label>Age:</label>
                         <input type='number' className="form-control" name="age" onChange={handleChange} value={formData.age} placeholder='Enter the Your Age' />
                    </div>
                    <div className="form-group">
                         <label>Gender:</label>
                         <select name='gender' className="form-control" onChange={handleChange} value={formData.gender}>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                         </select>
                    </div>
                    <div className="form-group">
                         <label>Intrested:</label>
                         <div>
                              <label>
                                   <input type='checkbox' className="form-check-input" onChange={handlecheckbox} name="coding" value={formData.intrests.includes("coding")} />
                                   Coding
                              </label>
                              <label>
                                   <input type='checkbox' className="form-check-input" onChange={handlecheckbox} name="sports" value={formData.intrests.includes("sports")} />
                                   Sports
                              </label>
                              <label>
                                   <input type='checkbox' className="form-check-input" onChange={handlecheckbox} name="reading" value={formData.intrests.includes("reading")} />
                                   Reading
                              </label>
                         </div>
                    </div>
                    <div className="form-group">
                         <label>Date of Birthday:</label>
                         <input type='date' className="form-control" name="birthday" onChange={handleChange} value={formData.birthDate} placeholder='Enter the your Birthday' />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
               </form >
          </div>
     )
}

export default FormWithoutYup;