import * as yup from 'yup';

const yupValidations = {
  validString: (msg = 'Required') => yup.string().required(msg),
  email: yup.string().email().required('Please Enter your email'),
  password: yup
    .string()
    .required('Please Enter your password')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9]{6,}$/,
      'Must Contain 6 Characters, One Uppercase, One Lowercase and one Number at least'
    )
};

export default yupValidations;
