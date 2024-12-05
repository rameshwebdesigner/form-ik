import React, { useState } from 'react'
import * as yup from 'yup';



const FormWithYup = () => {
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

     const [errors, setErrors] = useState({})

     const validataionSchema = yup.object().shape({
          firstName: yup.string().required("First Name is required"),
          lastName: yup.string().required("Last Name is required"),
          email: yup.string().email().required("Email Name is required"),
          phoneNumber: yup.string().matches(/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/, 'Phone number is not valid').required(),
          password: yup.string().required('Please Enter your password')
               .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
                    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
               ),
          confirmPassword: yup.string()
               .oneOf([yup.ref("password"), null], "Passwords must match").required(),
          age: yup.number().typeError("Age must be Numger")
               .min(18, "your age must be at leat 18 old")
               .max(100, "you cannot older then 100 years")
               .required(),
          gender: yup.string().required("Gender is Required"),
          intrests: yup.array()
               .min(1, "Select at least one Intrests")
               .required("Select at least one Intrests"),
          birthDate: yup.date().required("Date is required")
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


     const handleSubmit = async (e) => {
          e.preventDefault();
          try {
               await validataionSchema.validate(formData, { abortEarly: false });
               console.log("Submitted form Successfully", formData)
          } catch (error) {
               let newErrors = {}
               console.log(error.inner);
               error.inner.forEach((err) => {
                    newErrors[err.path] = err.message
               })
               setErrors(newErrors)

          }

     }


     return (
          <div className='container'>
               <h1 className=''>Yup form validation</h1>
               <form className='form-ctn' onSubmit={handleSubmit}>
                    <div className="form-group">
                         <label>First Name</label>
                         <input
                              className="form-control"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleChange}
                              placeholder="First Name" />
                         {errors.firstName && (<div className='error-red'>{errors.firstName}</div>)}

                    </div>
                    <div className="form-group">
                         <label>Last Name</label>
                         <input type='text' className="form-control" name="lastName" onChange={handleChange} value={formData.lastName} placeholder='Enter the Last Name' />
                         {errors.lastName && (<div className='error-red'>{errors.lastName}</div>)}
                    </div>
                    <div className="form-group">
                         <label>Email</label>
                         <input type='email' className="form-control" name="email" onChange={handleChange} value={formData.email} placeholder='Enter the Email' />
                         {errors.email && (<div className='error-red'>{errors.email}</div>)}
                    </div>
                    <div className="form-group">
                         <label>Password</label>
                         <input type='password' className="form-control" name="password" onChange={handleChange} value={formData.password} placeholder='Enter the Password' />
                         {errors.password && (<div className='error-red'>{errors.password}</div>)}
                    </div>
                    <div className="form-group">
                         <label>Confirm Password</label>
                         <input type='password' className="form-control" name="confirmPassword" onChange={handleChange} value={formData.confirmPassword} placeholder='Enter the Confirm Password' />
                         {errors.confirmPassword && (<div className='error-red'>{errors.confirmPassword}</div>)}
                    </div>
                    <div className="form-group">
                         <label>Age:</label>
                         <input type='number' className="form-control" name="age" onChange={handleChange} value={formData.age} placeholder='Enter the Your Age' />
                         {errors.age && (<div className='error-red'>{errors.age}</div>)}
                    </div>
                    <div className="form-group">
                         <label>Gender:</label>
                         <select name='gender' className="form-control" onChange={handleChange} value={formData.gender}>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                         </select>
                         {errors.gender && (<div className='error-red'>{errors.gender}</div>)}
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
                         {errors.intrests && (<div className='error-red'>{errors.intrests}</div>)}
                    </div>
                    <div className="form-group">
                         <label>Date of Birthday:</label>
                         <input type='date' className="form-control" name="birthday" onChange={handleChange} value={formData.birthDate} placeholder='Enter the your Birthday' />
                         {errors.birthDate && (<div className='error-red'>{errors.birthDate}</div>)}
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
               </form >
          </div>
     )
}

export default FormWithYup;