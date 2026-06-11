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
import { Link } from "@lite-app/ui/components/link";
import { Spinner } from "@lite-app/ui/components/spinner";
import { TextField } from "@lite-app/ui/components/textfield";
import {
  href,
  redirectDocument,
  useActionData,
  useNavigation,
  type ClientActionFunctionArgs,
} from "react-router";
import { cn } from "tailwind-variants";
import { z } from "zod";

import { Form, type FormProps } from "~/components/form";
import { getAuthErrorField, isKnownAuthError } from "~/lib/auth/error";
import { resetPassword } from "~/lib/auth/index.client";
import { comparePasswords } from "~/lib/auth/validation";
import { parseFormData } from "~/lib/form";

const FormDataSchema = z.object({
  confirmPassword: z.string(),
  password: z.string(),
});

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const { password, confirmPassword } = await parseFormData(
    request,
    FormDataSchema
  );
  const token = getToken();

  const passwordValidation = comparePasswords(password, confirmPassword);
  if (!passwordValidation.success) {
    return {
      success: false,
      validationErrors: passwordValidation.errors,
    };
  }

  const result = await withMinimumDelay(
    resetPassword({
      newPassword: password,
      ...(isDefined(token) && { token }),
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
  throw redirectDocument(href("/signin"));

  function getToken() {
    return new URL(request.url).searchParams.get("token");
  }
}

export default function ResetPassword() {
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
          Set a new password
        </h1>
        <CardDescription className={cn("text-center")}>
          Enter and confirm your new password
        </CardDescription>
      </CardHeader>
      <Form validationErrors={validationErrors}>
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
          <Button
            type="submit"
            isPending={isSubmitting}
            className={cn("w-full")}
          >
            {(props) => (
              <>
                {props.isPending ? <Spinner color="current" size="sm" /> : null}
                {props.isPending ? "Updating" : "Update password"}
              </>
            )}
          </Button>
          <Link href="/signin" className={cn("text-center text-sm")}>
            Back to sign in
          </Link>
        </CardFooter>
      </Form>
    </Card>
  );
}
