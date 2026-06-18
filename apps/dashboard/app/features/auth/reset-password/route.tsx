import { withMinimumDelay } from "@lite-app/shared/delay";
import { isDefined } from "@lite-app/shared/is-defined";
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
import { TextField } from "@lite-app/ui/components/textfield";
import { href, redirect, type ClientActionFunctionArgs } from "react-router";
import { cn } from "tailwind-variants";
import { z } from "zod";

import { Form } from "~/components/form";
import { SubmitButton } from "~/components/submit-button";
import { resetPassword } from "~/lib/auth";
import { comparePasswords } from "~/lib/auth/error";
import { parseFormData } from "~/lib/form/form-data";

const FormDataSchema = z.object({
  confirmPassword: z.string(),
  password: z.string(),
});

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const { password, confirmPassword } = await parseFormData(
    request,
    FormDataSchema
  );
  const token = new URL(request.url).searchParams.get("token");

  const passwordError = comparePasswords({ confirmPassword, password });
  if (passwordError instanceof Error) {
    return {
      validationErrors: {
        confirmPassword: passwordError.message,
      },
    };
  }

  const result = await withMinimumDelay(
    resetPassword({
      newPassword: password,
      ...(isDefined(token) && { token }),
    })
  );
  if (!isDefined(result.data)) {
    return {
      success: false,
    };
  }

  throw redirect(href("/signin"));
}

export default function ResetPassword() {
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
      <Form>
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
          <SubmitButton>
            {({ isPending }) => (isPending ? "Updating" : "Update password")}
          </SubmitButton>
          <Link href="/signin" className={cn("text-center text-sm")}>
            Back to sign in
          </Link>
        </CardFooter>
      </Form>
    </Card>
  );
}
