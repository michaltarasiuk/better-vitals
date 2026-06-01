"use client";

import { withMinimumDelay } from "@lite-app/shared/delay";
import { isDefined } from "@lite-app/shared/is-defined";
import { Button } from "@lite-app/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@lite-app/ui/components/card";
import { FieldError } from "@lite-app/ui/components/field-error";
import { Input } from "@lite-app/ui/components/input";
import { Label } from "@lite-app/ui/components/label";
import { Link } from "@lite-app/ui/components/link";
import { Spinner } from "@lite-app/ui/components/spinner";
import { TextField } from "@lite-app/ui/components/textfield";
import { Heading } from "@lite-app/ui/components/typography";
import {
  href,
  useActionData,
  useNavigation,
  type ClientActionFunctionArgs,
} from "react-router";
import { cn } from "tailwind-variants";
import { z } from "zod";

import { Form, type FormProps } from "~/components/form";
import { getAuthErrorField, isKnownAuthError } from "~/lib/auth/error";
import { requestPasswordReset } from "~/lib/auth/index.client";
import { parseFormData } from "~/lib/parse-form-data";

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
  const success = isDefined(result.data);

  if (!success) {
    if (!isKnownAuthError(result.error)) {
      return {
        success: false,
      };
    }
    const validationErrors = {
      [getAuthErrorField(result.error.code)]: result.error.message,
    } satisfies FormProps["validationErrors"];
    return {
      success: false,
      validationErrors,
    };
  }
  return {
    success: true,
  };
}

export default function RequestPasswordReset() {
  const actionData = useActionData<typeof clientAction>();
  const navigation = useNavigation();

  const validationErrors = actionData?.validationErrors ?? {};
  const isSubmitting = navigation.state === "submitting";

  return (
    <Card>
      <CardHeader className={cn("items-center gap-1")}>
        <Heading level={1} align="center" className={cn("text-xl")}>
          Forgot your password?
        </Heading>
        <CardDescription className={cn("text-center")}>
          We will email you a link to reset your password
        </CardDescription>
      </CardHeader>
      <Form validationErrors={validationErrors}>
        <CardContent>
          <TextField name="email" type="email" isRequired>
            <Label>Email</Label>
            <Input variant="secondary" />
            <FieldError />
          </TextField>
        </CardContent>
        <CardFooter className={cn("mt-4 flex flex-col gap-2")}>
          <Button
            type="submit"
            isPending={isSubmitting}
            className={cn("w-full")}
          >
            {(props) => (
              <>
                {props.isPending ? <Spinner color="current" size="sm" /> : null}
                {props.isPending ? "Sending" : "Send reset link"}
              </>
            )}
          </Button>
          <Link href="/signin" className={cn("text-center text-sm")}>
            Back to sign in
          </Link>
        </CardFooter>
      </Form>
    </Card>
  );
}
