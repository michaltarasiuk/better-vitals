"use client";

import { Button } from "@lite-app/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@lite-app/ui/components/card";
import { FieldError } from "@lite-app/ui/components/field-error";
import type { FormProps } from "@lite-app/ui/components/form";
import { Form } from "@lite-app/ui/components/form";
import { Input } from "@lite-app/ui/components/input";
import { Label } from "@lite-app/ui/components/label";
import { Link } from "@lite-app/ui/components/link";
import { Spinner } from "@lite-app/ui/components/spinner";
import { TextField } from "@lite-app/ui/components/textfield";
import { Typography } from "@lite-app/ui/components/typography";
import { useState, useTransition } from "react";
import { cn } from "tailwind-variants";

import { signIn } from "~/lib/auth/client";
import { getFieldNameForAuthError, isAuthError } from "~/lib/auth/error";
import { withMinimumDelay } from "~/lib/utils/delay";
import { invariant } from "~/lib/utils/invariant";

export default function Signin() {
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
          Sign In
        </Typography.Heading>
        <CardDescription className={cn("text-center")}>
          Enter your email and password.
        </CardDescription>
      </CardHeader>
      <Form validationErrors={validationErrors} onSubmit={handleSubmit}>
        <CardContent>
          <div className={cn("flex flex-col gap-4")}>
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
          </div>
        </CardContent>
        <CardFooter className={cn("mt-4 flex flex-col gap-2")}>
          <Button className={cn("w-full")} type="submit" isPending={isPending}>
            {(props) => (
              <>
                {props.isPending ? <Spinner color="current" size="sm" /> : null}
                {props.isPending ? "Signing In" : "Sign In"}
              </>
            )}
          </Button>
          <Link
            className={cn("text-center text-sm")}
            href="/request-password-reset"
          >
            Request password reset
          </Link>
        </CardFooter>
      </Form>
    </Card>
  );
}

async function action(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  invariant(typeof email === "string", "Email is required");
  invariant(typeof password === "string", "Password is required");

  const result = await signIn.email({
    email,
    password,
  });
  return result;
}
