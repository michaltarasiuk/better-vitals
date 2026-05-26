"use client";

import { withMinimumDelay } from "@lite-app/shared/delay";
import { invariant } from "@lite-app/shared/invariant";
import { isDefined } from "@lite-app/shared/is-defined";
import { Button } from "@lite-app/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@lite-app/ui/components/card";
import { FieldError } from "@lite-app/ui/components/field-error";
import { Form, type FormProps } from "@lite-app/ui/components/form";
import { Input } from "@lite-app/ui/components/input";
import { Label } from "@lite-app/ui/components/label";
import { Spinner } from "@lite-app/ui/components/spinner";
import { TextField } from "@lite-app/ui/components/textfield";
import { Heading } from "@lite-app/ui/components/typography";
import { useState, useTransition } from "react";
import { href, useNavigate } from "react-router";
import { cn } from "tailwind-variants";

import { getFieldNameForAuthError, isAuthError } from "~/lib/auth/error";
import { signUp } from "~/lib/auth/index.client";
import { comparePasswords } from "~/lib/auth/validation";

export function SignupForm() {
  const [validationErrors, setValidationErrors] = useState<
    FormProps["validationErrors"]
  >({});
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();
  const handleSubmit: FormProps["onSubmit"] = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const passwordValidationErrors = comparePasswords(formData);
    if (isDefined(passwordValidationErrors)) {
      setValidationErrors(passwordValidationErrors);
      return;
    }

    startTransition(async () => {
      const promise = action(formData);
      const result = await withMinimumDelay(promise);
      if (isAuthError(result.error)) {
        setValidationErrors({
          [getFieldNameForAuthError(result.error.code)]: result.error.message,
        });
        return;
      }
      await navigate(href("/organization/create"));
    });
  };
  return (
    <Card>
      <CardHeader className={cn("items-center gap-1")}>
        <Heading align="center" level={1} className={cn("text-xl")}>
          Create an account
        </Heading>
        <CardDescription className={cn("text-center")}>
          Enter your details to get started
        </CardDescription>
      </CardHeader>
      <Form validationErrors={validationErrors} onSubmit={handleSubmit}>
        <CardContent>
          <div className={cn("flex flex-col gap-4")}>
            <TextField name="name" type="text" isRequired>
              <Label>Name</Label>
              <Input variant="secondary" />
              <FieldError />
            </TextField>
            <TextField name="email" type="email" isRequired>
              <Label>Email</Label>
              <Input variant="secondary" />
              <FieldError />
            </TextField>
            <TextField name="password" type="password" isRequired>
              <Label>Password</Label>
              <Input variant="secondary" />
              <FieldError />
            </TextField>
            <TextField name="confirmPassword" type="password" isRequired>
              <Label>Confirm password</Label>
              <Input variant="secondary" />
              <FieldError />
            </TextField>
          </div>
        </CardContent>
        <CardFooter className={cn("mt-4")}>
          <Button className={cn("w-full")} type="submit" isPending={isPending}>
            {(props) => (
              <>
                {props.isPending ? <Spinner color="current" size="sm" /> : null}
                {props.isPending ? "Signing Up" : "Sign Up"}
              </>
            )}
          </Button>
        </CardFooter>
      </Form>
    </Card>
  );
}

async function action(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  invariant(typeof name === "string", "Name is required");
  invariant(typeof email === "string", "Email is required");
  invariant(typeof password === "string", "Password is required");

  const result = await signUp.email({
    email,
    name,
    password,
  });
  return result;
}
