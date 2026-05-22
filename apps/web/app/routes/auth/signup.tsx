"use client";

import { Button } from "@lite-app/ui/components/button";
import { Card } from "@lite-app/ui/components/card";
import { FieldError } from "@lite-app/ui/components/field-error";
import type { FormProps } from "@lite-app/ui/components/form";
import { Form } from "@lite-app/ui/components/form";
import { Input } from "@lite-app/ui/components/input";
import { Label } from "@lite-app/ui/components/label";
import { Spinner } from "@lite-app/ui/components/spinner";
import { TextField } from "@lite-app/ui/components/textfield";
import { Typography } from "@lite-app/ui/components/typography";
import { useState, useTransition } from "react";

import { signUp } from "~/lib/auth/client";
import { getFieldNameForAuthError, isAuthError } from "~/lib/auth/error";
import { comparePasswords } from "~/lib/auth/validation";
import { withMinimumDelay } from "~/lib/utils/delay";
import { invariant } from "~/lib/utils/invariant";
import { isNotNullish } from "~/lib/utils/is-not-nullish";

export default function Signup() {
  const [validationErrors, setValidationErrors] = useState<
    FormProps["validationErrors"]
  >({});
  const [isPending, startTransition] = useTransition();
  const handleSubmit: FormProps["onSubmit"] = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const passwordValidationErrors = comparePasswords(formData);
    if (isNotNullish(passwordValidationErrors)) {
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
      }
    });
  };
  return (
    <Card>
      <Card.Header className="items-center gap-1">
        <Typography.Heading align="center" level={1} className="text-xl">
          Sign Up
        </Typography.Heading>
        <Card.Description className="text-center">
          Enter your name, email, and password.
        </Card.Description>
      </Card.Header>
      <Form validationErrors={validationErrors} onSubmit={handleSubmit}>
        <Card.Content>
          <div className="flex flex-col gap-4">
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
        </Card.Content>
        <Card.Footer className="mt-4">
          <Button className="w-full" type="submit" isPending={isPending}>
            {(props) => (
              <>
                {props.isPending ? <Spinner color="current" size="sm" /> : null}
                {props.isPending ? "Signing Up" : "Sign Up"}
              </>
            )}
          </Button>
        </Card.Footer>
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
