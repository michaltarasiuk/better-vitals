export function comparePasswords(password: string, confirmPassword: string) {
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
