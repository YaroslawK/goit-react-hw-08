import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { register } from '../../redux/auth/operations';

const RegistrationSchema = Yup.object().shape({
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Password too short').required('Required'),
});

const RegistrationForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(register(values));
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validationSchema={RegistrationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <label htmlFor="name">Name</label><br />
          <Field type="text" name="name" /><br />
          <ErrorMessage name="name" component="div" className="error" /><br />
          <label htmlFor="email">Email</label><br />
          <Field type="email" name="email" /><br />
          <ErrorMessage name="email" component="div" className="error" /><br />
          <label htmlFor="password">Password</label><br />
          <Field type="password" name="password" /><br />
          <ErrorMessage name="password" component="div" className="error" /><br />
          <button type="submit" disabled={isSubmitting}>Register</button>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
