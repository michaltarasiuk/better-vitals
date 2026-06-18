import { withMinimumDelay } from "@lite-app/shared/delay";
import { isDefined } from "@lite-app/shared/is-defined";
import { Card, CardContent, CardFooter } from "@lite-app/ui/components/card";
import { FieldError } from "@lite-app/ui/components/field-error";
import { Input } from "@lite-app/ui/components/input";
import { Label } from "@lite-app/ui/components/label";
import { TextField } from "@lite-app/ui/components/textfield";
import { href, redirect, type ClientActionFunctionArgs } from "react-router";
import { cn } from "tailwind-variants";
import { z } from "zod";

import { Form } from "~/components/form";
import {
  FormCardDescription,
  FormCardHeader,
  FormCardTitle,
} from "~/components/form-card";
import { SubmitButton } from "~/components/submit-button";
import { signUp } from "~/lib/auth";
import { comparePasswords } from "~/lib/auth/error";
import { parseFormData } from "~/lib/form/form-data";
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

  const passwordError = comparePasswords({ confirmPassword, password });
  if (passwordError instanceof Error) {
    return {
      validationErrors: {
        confirmPassword: passwordError.message,
      },
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
  if (!isDefined(result.data)) {
    return {
      success: false,
    };
  }
  throw redirect(href("/organization/create"));
}

export function Signup() {
  return (
    <Card>
      <FormCardHeader>
        <FormCardTitle>Create an account</FormCardTitle>
        <FormCardDescription>
          Enter your details to get started
        </FormCardDescription>
      </FormCardHeader>
      <Form>
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
          <SubmitButton>
            {({ isPending }) => (isPending ? "Signing Up" : "Sign Up")}
          </SubmitButton>
        </CardFooter>
      </Form>
    </Card>
  );
}
