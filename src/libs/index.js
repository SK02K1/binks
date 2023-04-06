export const formFieldsFilled = (formData) => {
  return Object.values(formData).every((fieldValue) => fieldValue !== '');
};
