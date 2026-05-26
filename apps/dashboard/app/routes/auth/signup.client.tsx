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
import { Input } from "@lite-app/ui/components/input";
import { Label } from "@lite-app/ui/components/label";
import { Spinner } from "@lite-app/ui/components/spinner";
import { TextField } from "@lite-app/ui/components/textfield";
import { Heading } from "@lite-app/ui/components/typography";
import {
  href,
  redirect,
  useActionData,
  useNavigation,
  type ClientActionFunctionArgs,
} from "react-router";
import { cn } from "tailwind-variants";

import { Form } from "~/components/form";
import { getAuthErrorField, isAuthError } from "~/lib/auth/error";
import { signUp } from "~/lib/auth/index.client";
import { comparePasswords } from "~/lib/auth/validation";

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  invariant(typeof name === "string", "Name is required");
  invariant(typeof email === "string", "Email is required");
  invariant(typeof password === "string", "Password is required");

  const passwordValidation = comparePasswords(formData);
  if (!passwordValidation.success) {
    return {
      success: false,
      validationErrors: passwordValidation.errors,
    };
  }

  const result = await withMinimumDelay(
    signUp.email({
      email,
      name,
      password,
    })
  );

  if (!isDefined(result.error)) {
    throw redirect(href("/organization/create"));
  } else if (!isAuthError(result.error)) {
    return {
      success: false,
    };
  }
  return {
    success: false,
    validationErrors: {
      [getAuthErrorField(result.error.code)]: result.error.message,
    },
  };
}

export function Signup() {
  const actionData = useActionData<typeof clientAction>();
  const navigation = useNavigation();

  const validationErrors = actionData?.validationErrors ?? {};
  const isSubmitting = navigation.state === "submitting";

  return (
    <Card>
      <CardHeader className={cn("items-center gap-1")}>
        <Heading level={1} align="center" className={cn("text-xl")}>
          Create an account
        </Heading>
        <CardDescription className={cn("text-center")}>
          Enter your details to get started
        </CardDescription>
      </CardHeader>
      <Form validationErrors={validationErrors}>
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
          <Button
            type="submit"
            isPending={isSubmitting}
            className={cn("w-full")}
          >
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
