export function comparePasswords(formData: FormData) {
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  if (password !== confirmPassword) {
    return {
      errors: {
        confirmPassword: "Passwords don't match.",
      },
      success: false,
    };
  }
  return {
    success: true,
  };
}
