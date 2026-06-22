import { withMinimumDelay } from "@lite-app/shared/delay";
import { isDefined } from "@lite-app/shared/is-defined";
import { Card, CardFooter } from "@lite-app/ui/components/card";
import { FieldError } from "@lite-app/ui/components/field-error";
import { Input } from "@lite-app/ui/components/input";
import { Label } from "@lite-app/ui/components/label";
import { Link } from "@lite-app/ui/components/link";
import { TextField } from "@lite-app/ui/components/textfield";
import {
  redirectDocument,
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
import { signIn } from "~/lib/auth";
import { mapAuthErrorToFormActionError } from "~/lib/auth/error";
import { getAuthenticatedRedirectHref } from "~/lib/auth/href";
import { parseFormData } from "~/lib/form/form-data";

const FormDataSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export async function clientAction({
  request,
}: ClientActionFunctionArgs): Promise<FormActionData> {
  const { email, password } = await parseFormData(request, FormDataSchema);

  const { error } = await withMinimumDelay(
    signIn.email({
      email,
      password,
    })
  );
  const success = !isDefined(error);

  if (!success) {
    return {
      status: "error",
      error: mapAuthErrorToFormActionError(error),
    };
  }
  throw redirectDocument(await getAuthenticatedRedirectHref());
}

export default function Signin() {
  const actionData = useActionData<typeof clientAction>();

  return (
    <Card>
      <FormCardHeader>
        <FormCardTitle>How are your vitals?</FormCardTitle>
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
            <TextField name="password" type="password" isRequired>
              <Label>Password</Label>
              <Input variant="secondary" />
              <FieldError />
            </TextField>
          </div>
        </FormCardContent>
        <CardFooter className={cn("mt-4 flex flex-col gap-2")}>
          <SubmitButton>
            {({ isPending }) => (isPending ? "Signing in" : "Sign in")}
          </SubmitButton>
          <Link
            href="/request-password-reset"
            className={cn("text-center text-sm")}
          >
            Forgot password?
          </Link>
        </CardFooter>
      </ActionForm>
    </Card>
  );
}
