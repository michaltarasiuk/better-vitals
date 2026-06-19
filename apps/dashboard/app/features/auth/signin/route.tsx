import { withMinimumDelay } from "@lite-app/shared/delay";
import { isDefined } from "@lite-app/shared/is-defined";
import { Card, CardContent, CardFooter } from "@lite-app/ui/components/card";
import { FieldError } from "@lite-app/ui/components/field-error";
import { Input } from "@lite-app/ui/components/input";
import { Label } from "@lite-app/ui/components/label";
import { Link } from "@lite-app/ui/components/link";
import { TextField } from "@lite-app/ui/components/textfield";
import { redirectDocument, type ClientActionFunctionArgs } from "react-router";
import { cn } from "tailwind-variants";
import { z } from "zod";

import { Form } from "~/components/form";
import {
  FormCardDescription,
  FormCardHeader,
  FormCardTitle,
} from "~/components/form-card";
import { SubmitButton } from "~/components/submit-button";
import { signIn } from "~/lib/auth";
import { getAuthenticatedRedirectHref } from "~/lib/auth/href";
import { parseFormData } from "~/lib/form/form-data";

const FormDataSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const { email, password } = await parseFormData(request, FormDataSchema);

  const result = await withMinimumDelay(
    signIn.email({
      email,
      password,
    })
  );
  if (!isDefined(result.data)) {
    return {
      success: false,
    };
  }

  const redirectHref = await getAuthenticatedRedirectHref();
  throw redirectDocument(redirectHref);
}

export default function Signin() {
  return (
    <Card>
      <FormCardHeader>
        <FormCardTitle>Welcome back</FormCardTitle>
        <FormCardDescription>Sign in to your account</FormCardDescription>
      </FormCardHeader>
      <Form>
        <CardContent>
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
        </CardContent>
        <CardFooter className={cn("mt-4 flex flex-col gap-2")}>
          <SubmitButton>
            {({ isPending }) => (isPending ? "Signing In" : "Sign In")}
          </SubmitButton>
          <Link
            href="/request-password-reset"
            className={cn("text-center text-sm")}
          >
            Forgot password?
          </Link>
        </CardFooter>
      </Form>
    </Card>
  );
}
