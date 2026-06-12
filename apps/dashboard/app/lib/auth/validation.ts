const PASSWORD_MISMATCH_ERROR = "Password mismatch";

export function comparePasswords(password: string, confirmPassword: string) {
  if (password !== confirmPassword) {
    return {
      errors: {
        confirmPassword: PASSWORD_MISMATCH_ERROR,
      },
      success: false,
    };
  }
  return {
    success: true,
  };
}
