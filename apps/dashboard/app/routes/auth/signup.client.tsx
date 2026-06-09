"use client";

import { withMinimumDelay } from "@lite-app/shared/delay";
import { isDefined } from "@lite-app/shared/is-defined";
import { Button } from "@lite-app/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  cardVariants,
} from "@lite-app/ui/components/card";
import { FieldError } from "@lite-app/ui/components/field-error";
import { Input } from "@lite-app/ui/components/input";
import { Label } from "@lite-app/ui/components/label";
import { Spinner } from "@lite-app/ui/components/spinner";
import { TextField } from "@lite-app/ui/components/textfield";
import {
  href,
  redirect,
  useActionData,
  useNavigation,
  type ClientActionFunctionArgs,
} from "react-router";
import { cn } from "tailwind-variants";
import { z } from "zod";

import { Form, type FormProps } from "~/components/form";
import { getAuthErrorField, isKnownAuthError } from "~/lib/auth/error";
import { signUp } from "~/lib/auth/index.client";
import { comparePasswords } from "~/lib/auth/validation";
import { parseFormData } from "~/lib/form";
import { pickAvatar } from "~/lib/user/avatar";

const FormDataSchema = z.object({
  confirmPassword: z.string(),
  email: z.string(),
  name: z.string(),
  password: z.string(),
});

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const { name, email, password, confirmPassword } = await parseFormData(
    request,
    FormDataSchema
  );

  const passwordValidation = comparePasswords(password, confirmPassword);
  if (!passwordValidation.success) {
    return {
      success: false,
      validationErrors: passwordValidation.errors,
    };
  }

  const result = await withMinimumDelay(
    signUp.email({
      email,
      image: pickAvatar(),
      name,
      password,
    })
  );
  const success = isDefined(result.data);

  if (!success) {
    if (!isKnownAuthError(result.error)) {
      return {
        success: false,
      };
    }
    const validationErrors = {
      [getAuthErrorField(result.error.code)]: result.error.message,
    } satisfies FormProps["validationErrors"];
    return {
      success: false,
      validationErrors,
    };
  }
  throw redirect(href("/organization/create"));
}

export function Signup() {
  const actionData = useActionData<typeof clientAction>();
  const navigation = useNavigation();

  const validationErrors = actionData?.validationErrors ?? {};
  const isSubmitting = navigation.state === "submitting";

  return (
    <Card>
      <CardHeader className={cn("items-center gap-1")}>
        <h1
          className={cardVariants().title({
            className: "text-xl font-medium",
          })}
        >
          Create an account
        </h1>
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
