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
  useActionData,
  useNavigation,
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
  FormCardDescription,
  FormCardFooter,
  FormCardHeader,
  FormCardTitle,
} from "~/components/form-card";
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
  const { email } = await parseFormData(request, FormDataSchema);

  const { data, error } = await withMinimumDelay(
    requestPasswordReset({
      email,
      redirectTo: href("/reset-password"),
    })
  );
  const success = isDefined(data) && !isDefined(error);

  if (!success) {
    return {
      status: "error",
      error: mapAuthErrorToFormActionError(error),
    };
  }
  return {
    status: "success",
    title: data.message,
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
      <ActionForm actionData={actionData}>
        <FormCardContent>
          <ActionFormAlert />
          <div className={cn("flex flex-col gap-4")}>
            <TextField name="email" type="email" isRequired>
              <Label>Email</Label>
              <Input variant="secondary" />
              <FieldError />
            </TextField>
          </div>
        </FormCardContent>
        <FormCardFooter>
          <SubmitButton isPending={isSubmitting}>
            {({ isPending }) => (isPending ? "Sending" : "Send reset link")}
          </SubmitButton>
          <Link href="/signin" className={cn("text-center text-sm")}>
            Back to sign in
          </Link>
        </FormCardFooter>
      </ActionForm>
    </Card>
  );
}
