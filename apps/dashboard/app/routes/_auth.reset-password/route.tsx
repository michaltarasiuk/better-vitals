import { withMinimumDelay } from "@lite-app/shared/delay";
import { isDefined } from "@lite-app/shared/is-defined";
import { Card } from "@lite-app/ui/components/card";
import { FieldError } from "@lite-app/ui/components/field-error";
import { Input } from "@lite-app/ui/components/input";
import { Label } from "@lite-app/ui/components/label";
import { Link } from "@lite-app/ui/components/link";
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

import {
  ActionFormAlert,
  type FormActionData,
} from "~/components/action-data-context";
import { Form } from "~/components/form";
import {
  FormCardContent,
  FormCardFooter,
  FormCardHeader,
  FormCardTitle,
} from "~/components/form-card";
import { FormFields } from "~/components/form-fields";
import { SubmitButton } from "~/components/submit-button";
import { resetPassword } from "~/lib/auth";
import {
  comparePasswords,
  mapAuthErrorToFormActionError,
} from "~/lib/auth/error";
import { parseFormData } from "~/lib/form/form-data";
import {
  formValidationErrorResponse,
  invalidFormDataResponse,
} from "~/lib/form/response";

const FormDataSchema = z.object({
  password: z.string(),
  confirmPassword: z.string(),
});

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const parsedFormData = await parseFormData(request, FormDataSchema);
  if (parsedFormData instanceof Error) {
    return invalidFormDataResponse(parsedFormData);
  }
  const { password, confirmPassword } = parsedFormData;
  const token = new URL(request.url).searchParams.get("token");

  const passwordError = comparePasswords({
    password,
    confirmPassword,
  });
  if (passwordError instanceof Error) {
    return formValidationErrorResponse({
      confirmPassword: passwordError.message,
    });
  }

  const { error } = await withMinimumDelay(
    resetPassword({
      newPassword: password,
      ...(isDefined(token) && { token }),
    })
  );
  const success = !isDefined(error);

  if (!success) {
    return {
      status: "error",
      error: mapAuthErrorToFormActionError(error),
    } satisfies FormActionData;
  }
  throw redirect(href("/signin"));
}

export default function ResetPassword() {
  const actionData = useActionData<typeof clientAction>();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  return (
    <Card>
      <FormCardHeader>
        <FormCardTitle>Set a new password</FormCardTitle>
      </FormCardHeader>
      <Form method="POST" actionData={actionData}>
        <FormCardContent>
          <ActionFormAlert />
          <FormFields>
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
          </FormFields>
        </FormCardContent>
        <FormCardFooter>
          <SubmitButton isPending={isSubmitting}>
            {({ isPending }) => (isPending ? "Updating" : "Update password")}
          </SubmitButton>
          <Link href="/signin" className={cn("text-center text-sm")}>
            Back to sign in
          </Link>
        </FormCardFooter>
      </Form>
    </Card>
  );
}
