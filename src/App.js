import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useFormik } from 'formik';


function App() {
  const formik = useFormik({
    initialValues: { name: '', email: '', password: '' },
    onSubmit: (values) => {
      console.log(values);
    },
    validate: (value) => {

      let errors = {}
      if (!value.name) {
        errors.name = "Name is required"
      }
      if (!value.email) {
        errors.email = "Email is required"
      }
      if (!value.password) {
        errors.password = "Password is required"
      }
      return errors;
    }
  });
  return (
    <div className="container mt-5">
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="test" className="form-control" placeholder="Name" name='name' id='name'
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.errors.name ? <div className='errors'>{formik.errors.name}</div> : null}
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email" className="form-control" placeholder="name@example.com" name='email' id='email'
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email ? <div className='errors'>{formik.errors.email}</div> : null}
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" placeholder="Password" name='password' id='password'
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password ? <div className='errors'>{formik.errors.password}</div> : null}
        </div>
        <div className="mb-3">

          <button type='submit' className='btn btn-info'>Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App;
