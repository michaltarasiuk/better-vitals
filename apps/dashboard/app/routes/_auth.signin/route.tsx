import { withMinimumDelay } from "@better-vitals/shared/delay";
import { Card } from "@better-vitals/ui/components/card";
import { FieldError } from "@better-vitals/ui/components/field-error";
import { Input } from "@better-vitals/ui/components/input";
import { Label } from "@better-vitals/ui/components/label";
import { TextField } from "@better-vitals/ui/components/textfield";
import {
  href,
  redirectDocument,
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
  FormCardFooter,
  FormCardHeader,
  FormCardTitle,
} from "~/components/form-card";
import { FormProvider, type FormActionData } from "~/components/form-context";
import { FormFields } from "~/components/form-fields";
import { Link } from "~/components/link";
import { SubmitButton } from "~/components/submit-button";
import { signInEmail } from "~/lib/auth";
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
  const { email, password } = formData;

  const session = await withMinimumDelay(
    signInEmail({
      email,
      password,
    })
  );
  if (session instanceof Error) {
    return {
      status: "error",
      error: mapAuthErrorToFormActionError(session.cause),
    };
  }

  const redirectHref = await getAuthenticatedRedirectHref();
  if (redirectHref instanceof Error) {
    return {
      status: "error",
      error: {
        type: "alert",
        title: redirectHref.message,
      },
    };
  }

  throw redirectDocument(redirectHref);
}

export default function Signin() {
  const actionData = useActionData<typeof clientAction>();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  return (
    <Card>
      <FormCardHeader>
        <FormCardTitle>How are your vitals?</FormCardTitle>
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
              <TextField name="password" type="password" isRequired>
                <Label>Password</Label>
                <Input variant="secondary" />
                <FieldError />
              </TextField>
            </FormFields>
          </FormCardContent>
          <FormCardFooter>
            <SubmitButton isPending={isSubmitting}>
              {({ isPending }) => (isPending ? "Signing in" : "Sign in")}
            </SubmitButton>
            <Link
              href={href("/request-password-reset")}
              className={cn("text-center text-sm")}
            >
              Forgot password?
            </Link>
          </FormCardFooter>
        </Form>
      </FormProvider>
    </Card>
  );
}
