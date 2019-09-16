import { ValidationError } from "yup";

interface FormattedError {
  [key: string]: string[];
}

const formatYupErrors = (error: ValidationError) => {
  const formattedError: FormattedError = {};

  error.inner.forEach(e => {
    const { path, errors } = e;

    if (!formattedError[path]) {
      formattedError[path] = errors;
    } else {
      formattedError[path] = [...formattedError[path], ...errors];
    }
  });

  return formattedError;
};

export default formatYupErrors;
