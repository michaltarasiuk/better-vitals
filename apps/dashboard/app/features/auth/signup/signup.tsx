import { withMinimumDelay } from "@lite-app/shared/delay";
import { isDefined } from "@lite-app/shared/is-defined";
import { Card, CardFooter } from "@lite-app/ui/components/card";
import { FieldError } from "@lite-app/ui/components/field-error";
import { Input } from "@lite-app/ui/components/input";
import { Label } from "@lite-app/ui/components/label";
import { TextField } from "@lite-app/ui/components/textfield";
import {
  href,
  redirect,
  useActionData,
  type ClientActionFunctionArgs,
} from "react-router";
import { cn } from "tailwind-variants";
import { z } from "zod";

import {
  ActionForm,
  ActionFormAlert,
  type FormActionData,
} from "~/components/action-form";
import {
  FormCardContent,
  FormCardHeader,
  FormCardTitle,
} from "~/components/form-card";
import { SubmitButton } from "~/components/submit-button";
import { signUp } from "~/lib/auth";
import {
  comparePasswords,
  mapAuthErrorToFormActionError,
} from "~/lib/auth/error";
import { parseFormData } from "~/lib/form/form-data";
import { pickAvatar } from "~/lib/user/avatar";

const FormDataSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
});

export async function clientAction({
  request,
}: ClientActionFunctionArgs): Promise<FormActionData> {
  const { name, email, password, confirmPassword } = await parseFormData(
    request,
    FormDataSchema
  );

  const passwordError = comparePasswords({ password, confirmPassword });
  if (passwordError instanceof Error) {
    return {
      status: "error",
      error: {
        type: "form",
        validationErrors: {
          confirmPassword: passwordError.message,
        },
      },
    };
  }

  const { error } = await withMinimumDelay(
    signUp.email({
      name,
      email,
      password,
      image: pickAvatar(),
    })
  );
  const success = !isDefined(error);

  if (!success) {
    return {
      status: "error",
      error: mapAuthErrorToFormActionError(error),
    };
  }
  throw redirect(href("/organization/create"));
}

export function Signup() {
  const actionData = useActionData<typeof clientAction>();

  return (
    <Card>
      <FormCardHeader>
        <FormCardTitle>Start monitoring vitals</FormCardTitle>
      </FormCardHeader>
      <ActionForm actionData={actionData}>
        <FormCardContent>
          <ActionFormAlert />
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
        </FormCardContent>
        <CardFooter className={cn("mt-4")}>
          <SubmitButton>
            {({ isPending }) =>
              isPending ? "Creating account" : "Create account"
            }
          </SubmitButton>
        </CardFooter>
      </ActionForm>
    </Card>
  );
}
