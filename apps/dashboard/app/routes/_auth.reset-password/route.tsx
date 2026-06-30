import { withMinimumDelay } from "@better-vitals/shared/delay";
import { isDefined } from "@better-vitals/shared/is-defined";
import { Card } from "@better-vitals/ui/components/card";
import { FieldError } from "@better-vitals/ui/components/field-error";
import { Input } from "@better-vitals/ui/components/input";
import { Label } from "@better-vitals/ui/components/label";
import { TextField } from "@better-vitals/ui/components/textfield";
import {
  href,
  redirect,
  useActionData,
  useNavigation,
  type ClientActionFunctionArgs,
} from "react-router";
import { z } from "zod";

import { Form } from "~/components/form";
import { FormAlert } from "~/components/form-alert";
import {
  FormCardContent,
  FormCardFooter,
  FormCardHeader,
  FormCardTitle,
} from "~/components/form-card";
import { FormProvider, type FormActionData } from "~/components/form-context";
import { FormFields } from "~/components/form-fields";
import { Link } from "~/components/link";
import { SubmitButton } from "~/components/submit-button";
import { resetPassword } from "~/lib/auth";
import {
  comparePasswords,
  mapAuthErrorToFormActionError,
} from "~/lib/auth/error";
import { parseFormData } from "~/lib/form/form-data";

const FormDataSchema = z.object({
  password: z.string(),
  confirmPassword: z.string(),
});

export async function clientAction({
  request,
}: ClientActionFunctionArgs): Promise<FormActionData> {
  const formData = await parseFormData(request, FormDataSchema);
  if (formData instanceof Error) {
    return {
      status: "error",
      error: {
        type: "alert",
        title: formData.message,
      },
    };
  }
  const { password, confirmPassword } = formData;
  const token = new URL(request.url).searchParams.get("token");

  const passwordError = comparePasswords({
    password,
    confirmPassword,
  });
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

  const passwordReset = await withMinimumDelay(
    resetPassword({
      newPassword: password,
      ...(isDefined(token) && { token }),
    })
  );
  if (passwordReset instanceof Error) {
    return {
      status: "error",
      error: mapAuthErrorToFormActionError(passwordReset.cause),
    };
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
      <FormProvider value={actionData}>
        <Form method="POST">
          <FormCardContent>
            <FormAlert />
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
            <Link href={href("/signin")} className="text-center text-sm">
              Back to sign in
            </Link>
          </FormCardFooter>
        </Form>
      </FormProvider>
    </Card>
  );
}
