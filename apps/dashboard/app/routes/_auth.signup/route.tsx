import { withMinimumDelay } from "@lite-app/shared/delay";
import { Card } from "@lite-app/ui/components/card";
import { FieldError } from "@lite-app/ui/components/field-error";
import { Input } from "@lite-app/ui/components/input";
import { Label } from "@lite-app/ui/components/label";
import { TextField } from "@lite-app/ui/components/textfield";
import {
  href,
  redirect,
  useActionData,
  useNavigation,
  type ClientActionFunctionArgs,
} from "react-router";
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
import { signUpEmail } from "~/lib/auth";
import {
  comparePasswords,
  mapAuthErrorToFormActionError,
} from "~/lib/auth/error";
import { hasUsers } from "~/lib/db/user.server";
import { parseFormData } from "~/lib/form/form-data";
import { pickAvatar } from "~/lib/user/avatar";

const FormDataSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
});

export async function loader() {
  const hasAnyUsers = await hasUsers();
  if (hasAnyUsers instanceof Error) {
    throw hasAnyUsers;
  }
  if (hasAnyUsers) {
    throw redirect(href("/signin"));
  }
}

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
  const { name, email, password, confirmPassword } = formData;

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

  const account = await withMinimumDelay(
    signUpEmail({
      name,
      email,
      password,
      image: pickAvatar(),
    })
  );
  if (account instanceof Error) {
    return {
      status: "error",
      error: mapAuthErrorToFormActionError(account.cause),
    };
  }

  throw redirect(href("/organization/create"));
}

export default function Signup() {
  const actionData = useActionData<typeof clientAction>();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  return (
    <Card>
      <FormCardHeader>
        <FormCardTitle>Start monitoring vitals</FormCardTitle>
      </FormCardHeader>
      <Form method="POST" actionData={actionData}>
        <FormCardContent>
          <ActionFormAlert />
          <FormFields>
            <TextField name="name" type="text" isRequired>
              <Label>Name</Label>
              <Input variant="secondary" />
              <FieldError />
            </TextField>
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
            <TextField name="confirmPassword" type="password" isRequired>
              <Label>Confirm password</Label>
              <Input variant="secondary" />
              <FieldError />
            </TextField>
          </FormFields>
        </FormCardContent>
        <FormCardFooter>
          <SubmitButton isPending={isSubmitting}>
            {({ isPending }) => (isPending ? "Creating" : "Create account")}
          </SubmitButton>
        </FormCardFooter>
      </Form>
    </Card>
  );
}
