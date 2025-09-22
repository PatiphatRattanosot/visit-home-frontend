// utils/formNavigation.js
export const validateCurrentPage = async ({
  formik,
  fieldsToValidate = [],
  onSuccess = () => {},
}) => {
  const errors = await formik.validateForm();

  // Set touched for fields on this page
  const touchedFields = fieldsToValidate.reduce((acc, key) => {
    acc[key] = true;
    return acc;
  }, {});
  formik.setTouched(touchedFields, true);

  // Check if current page has any errors
  const hasErrors = fieldsToValidate.some((key) => errors[key]);

  if (!hasErrors) {
    onSuccess();
  }

  return !hasErrors;
};
