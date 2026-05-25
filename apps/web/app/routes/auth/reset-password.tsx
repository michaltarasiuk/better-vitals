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
import { Link } from "@lite-app/ui/components/link";
import { Spinner } from "@lite-app/ui/components/spinner";
import { TextField } from "@lite-app/ui/components/textfield";
import { Heading } from "@lite-app/ui/components/typography";
import { useState, useTransition } from "react";
import { cn } from "tailwind-variants";

import { resetPassword } from "~/lib/auth/client";
import { getFieldNameForAuthError, isAuthError } from "~/lib/auth/error";
import { comparePasswords } from "~/lib/auth/validation";

export default function ResetPassword() {
  const [validationErrors, setValidationErrors] = useState<
    FormProps["validationErrors"]
  >({});
  const [isPending, startTransition] = useTransition();
  const handleSubmit: FormProps["onSubmit"] = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const token = new URLSearchParams(window.location.search).get("token");

    const passwordValidationErrors = comparePasswords(formData);
    if (isDefined(passwordValidationErrors)) {
      setValidationErrors(passwordValidationErrors);
      return;
    }

    startTransition(async () => {
      const promise = action(formData, token);
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
      <CardHeader className={cn("items-center gap-1")}>
        <Heading align="center" level={1} className={cn("text-xl")}>
          Reset password
        </Heading>
        <CardDescription className={cn("text-center")}>
          Enter your new password.
        </CardDescription>
      </CardHeader>
      <Form validationErrors={validationErrors} onSubmit={handleSubmit}>
        <CardContent>
          <div className={cn("flex flex-col gap-4")}>
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
        <CardFooter className={cn("mt-4 flex flex-col gap-2")}>
          <Button className={cn("w-full")} type="submit" isPending={isPending}>
            {(props) => (
              <>
                {props.isPending ? <Spinner color="current" size="sm" /> : null}
                {props.isPending ? "Resetting password" : "Reset password"}
              </>
            )}
          </Button>
          <Link className={cn("text-center text-sm")} href="/signin">
            Back to sign in
          </Link>
        </CardFooter>
      </Form>
    </Card>
  );
}

async function action(formData: FormData, token: string | null) {
  const password = formData.get("password");

  invariant(typeof password === "string", "Password is required");

  const result = await resetPassword({
    newPassword: password,
    ...(isDefined(token) ? { token } : {}),
  });
  return result;
}
