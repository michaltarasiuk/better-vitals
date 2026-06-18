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
import { href, type ClientActionFunctionArgs } from "react-router";
import { cn } from "tailwind-variants";
import { z } from "zod";

import { Form } from "~/components/form";
import { SubmitButton } from "~/components/submit-button";
import { requestPasswordReset } from "~/lib/auth";
import { parseFormData } from "~/lib/form/form-data";

const FormDataSchema = z.object({
  email: z.string(),
});

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const { email } = await parseFormData(request, FormDataSchema);

  const result = await withMinimumDelay(
    requestPasswordReset({
      email,
      redirectTo: href("/reset-password"),
    })
  );
  if (isDefined(result.error)) {
    return {
      success: false,
    };
  }
  return {
    success: true,
  };
}

export default function RequestPasswordReset() {
  return (
    <Card>
      <CardHeader className={cn("items-center gap-1")}>
        <h1
          className={cardVariants().title({
            className: "text-xl font-medium",
          })}
        >
          Forgot your password?
        </h1>
        <CardDescription className={cn("text-center")}>
          We will email you a link to reset your password
        </CardDescription>
      </CardHeader>
      <Form>
        <CardContent>
          <div className={cn("flex flex-col gap-4")}>
            <TextField name="email" type="email" isRequired>
              <Label>Email</Label>
              <Input variant="secondary" />
              <FieldError />
            </TextField>
          </div>
        </CardContent>
        <CardFooter className={cn("mt-4 flex flex-col gap-2")}>
          <SubmitButton>
            {({ isPending }) => (isPending ? "Sending" : "Send reset link")}
          </SubmitButton>
          <Link href="/signin" className={cn("text-center text-sm")}>
            Back to sign in
          </Link>
        </CardFooter>
      </Form>
    </Card>
  );
}
