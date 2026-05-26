import { redirect } from "react-router";

import { hasExistingUser } from "~/lib/auth/index.server";

import { SignupForm } from "./signup.client";

export async function loader() {
  if (await hasExistingUser()) {
    throw redirect("/signin");
  }
}

export default function Signup() {
  return <SignupForm />;
}
