export function comparePasswords(formData: FormData) {
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  if (password !== confirmPassword) {
    return {
      confirmPassword: "Passwords don't match.",
    };
  }
  return null;
}
