"use client";

import { withMinimumDelay } from "@lite-app/shared/delay";
import { invariant } from "@lite-app/shared/invariant";
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
import { Typography } from "@lite-app/ui/components/typography";
import { useState, useTransition } from "react";
import { href } from "react-router";
import { cn } from "tailwind-variants";

import { requestPasswordReset } from "~/lib/auth/client";
import { getFieldNameForAuthError, isAuthError } from "~/lib/auth/error";

export default function RequestPasswordReset() {
  const [validationErrors, setValidationErrors] = useState<
    FormProps["validationErrors"]
  >({});
  const [isPending, startTransition] = useTransition();
  const handleSubmit: FormProps["onSubmit"] = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
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
      <CardHeader className={cn("items-center gap-1")}>
        <Typography.Heading align="center" level={1} className={cn("text-xl")}>
          Request password reset
        </Typography.Heading>
        <CardDescription className={cn("text-center")}>
          Enter your email.
        </CardDescription>
      </CardHeader>
      <Form validationErrors={validationErrors} onSubmit={handleSubmit}>
        <CardContent>
          <TextField name="email" type="email" isRequired>
            <Label>Email</Label>
            <Input variant="secondary" />
            <FieldError />
          </TextField>
        </CardContent>
        <CardFooter className={cn("mt-4 flex flex-col gap-2")}>
          <Button className={cn("w-full")} type="submit" isPending={isPending}>
            {(props) => (
              <>
                {props.isPending ? <Spinner color="current" size="sm" /> : null}
                {props.isPending
                  ? "Requesting password reset"
                  : "Request password reset"}
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

async function action(formData: FormData) {
  const email = formData.get("email");

  invariant(typeof email === "string", "Email is required");

  const result = await requestPasswordReset({
    email,
    redirectTo: href("/reset-password"),
  });
  return result;
}
