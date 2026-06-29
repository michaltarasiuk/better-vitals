import { withMinimumDelay } from "@better-vitals/shared/delay";
import { Card } from "@better-vitals/ui/components/card";
import { FieldError } from "@better-vitals/ui/components/field-error";
import { Input } from "@better-vitals/ui/components/input";
import { Label } from "@better-vitals/ui/components/label";
import { TextField } from "@better-vitals/ui/components/textfield";
import {
  href,
  useActionData,
  useNavigation,
  type ClientActionFunctionArgs,
} from "react-router";
import { cn } from "tailwind-variants";
import { z } from "zod";

import { Form } from "~/components/form";
import { FormAlert } from "~/components/form-alert";
import {
  FormCardContent,
  FormCardDescription,
  FormCardFooter,
  FormCardHeader,
  FormCardTitle,
} from "~/components/form-card";
import { FormProvider, type FormActionData } from "~/components/form-context";
import { FormFields } from "~/components/form-fields";
import { Link } from "~/components/link";
import { SubmitButton } from "~/components/submit-button";
import { requestPasswordReset } from "~/lib/auth";
import { mapAuthErrorToFormActionError } from "~/lib/auth/error";
import { parseFormData } from "~/lib/form/form-data";

const FormDataSchema = z.object({
  email: z.string(),
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
  const { email } = formData;

  const passwordResetRequest = await withMinimumDelay(
    requestPasswordReset({
      email,
      redirectTo: href("/reset-password"),
    })
  );
  if (passwordResetRequest instanceof Error) {
    return {
      status: "error",
      error: mapAuthErrorToFormActionError(passwordResetRequest.cause),
    };
  }

  return {
    status: "success",
    success: {
      type: "alert",
      title: passwordResetRequest.message,
    },
  };
}

export default function RequestPasswordReset() {
  const actionData = useActionData<typeof clientAction>();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  return (
    <Card>
      <FormCardHeader>
        <FormCardTitle>Reset your password</FormCardTitle>
        <FormCardDescription>
          Enter your email — we'll send a reset link
        </FormCardDescription>
      </FormCardHeader>
      <FormProvider value={actionData}>
        <Form method="POST">
          <FormCardContent>
            <FormAlert />
            <FormFields>
              <TextField name="email" type="email" isRequired>
                <Label>Email</Label>
                <Input variant="secondary" />
                <FieldError />
              </TextField>
            </FormFields>
          </FormCardContent>
          <FormCardFooter>
            <SubmitButton isPending={isSubmitting}>
              {({ isPending }) => (isPending ? "Sending" : "Send reset link")}
            </SubmitButton>
            <Link href={href("/signin")} className={cn("text-center text-sm")}>
              Back to sign in
            </Link>
          </FormCardFooter>
        </Form>
      </FormProvider>
    </Card>
  );
}
