import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operations';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const LoginForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(login(values));
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={LoginSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <label htmlFor="email">Email</label><br />
          <Field type="email" name="email" /><br />
          <ErrorMessage name="email" component="div" className="error" /><br />
          <label htmlFor="password">Password</label><br />
          <Field type="password" name="password" /><br />
          <ErrorMessage name="password" component="div" className="error" /><br />
          <button type="submit" disabled={isSubmitting}>Login</button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
