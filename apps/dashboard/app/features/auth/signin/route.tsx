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
  cardVariants,
} from "@lite-app/ui/components/card";
import { FieldError } from "@lite-app/ui/components/field-error";
import { Input } from "@lite-app/ui/components/input";
import { Label } from "@lite-app/ui/components/label";
import { Link } from "@lite-app/ui/components/link";
import { Spinner } from "@lite-app/ui/components/spinner";
import { TextField } from "@lite-app/ui/components/textfield";
import {
  href,
  redirectDocument,
  useActionData,
  useNavigation,
  type ClientActionFunctionArgs,
} from "react-router";
import { cn } from "tailwind-variants";
import { z } from "zod";

import { Form, type FormProps } from "~/components/form";
import { getAuthErrorField, isKnownAuthError } from "~/lib/auth/error";
import { organization, signIn } from "~/lib/auth/index.client";
import { parseFormData } from "~/lib/form";

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

  const organizations = await organization.list();
  const redirectTo =
    isDefined(organizations.data) && organizations.data.length > 0
      ? href("/")
      : href("/organization/create");
  throw redirectDocument(redirectTo);
}

export default function Signin() {
  const actionData = useActionData<typeof clientAction>();
  const navigation = useNavigation();

  const validationErrors = actionData?.validationErrors ?? {};
  const isSubmitting = navigation.state === "submitting";

  return (
    <Card>
      <CardHeader className={cn("items-center gap-1")}>
        <h1
          className={cardVariants().title({
            className: "text-xl font-medium",
          })}
        >
          Welcome back
        </h1>
        <CardDescription className={cn("text-center")}>
          Sign in to your account
        </CardDescription>
      </CardHeader>
      <Form validationErrors={validationErrors}>
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
          <Button
            type="submit"
            isPending={isSubmitting}
            className={cn("w-full")}
          >
            {(props) => (
              <>
                {props.isPending ? <Spinner color="current" size="sm" /> : null}
                {props.isPending ? "Signing In" : "Sign In"}
              </>
            )}
          </Button>
          <Link
            className={cn("text-center text-sm")}
            href="/request-password-reset"
          >
            Forgot password?
          </Link>
        </CardFooter>
      </Form>
    </Card>
  );
}
