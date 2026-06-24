import { withMinimumDelay } from "@lite-app/shared/delay";
import { isDefined } from "@lite-app/shared/is-defined";
import { Card } from "@lite-app/ui/components/card";
import { FieldError } from "@lite-app/ui/components/field-error";
import { Input } from "@lite-app/ui/components/input";
import { Label } from "@lite-app/ui/components/label";
import { TextField } from "@lite-app/ui/components/textfield";
import {
  href,
  redirect,
  useActionData,
  useLoaderData,
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
import { organization, signUp } from "~/lib/auth";
import {
  comparePasswords,
  mapAuthErrorToFormActionError,
} from "~/lib/auth/error";
import { hasUsers } from "~/lib/db/user.server";
import { parseFormData } from "~/lib/form/form-data";
import { pickAvatar } from "~/lib/user/avatar";

import type { Route } from "./+types/route";

const FormDataSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
});

export async function loader({ url }: Route.LoaderArgs) {
  const invitationId = url.searchParams.get("invitationId");
  if (!isDefined(invitationId) || (await hasUsers())) {
    throw redirect(href("/signin"));
  }
  const invitation = await organization.getInvitation({
    query: {
      id: invitationId,
    },
  });
  const success = isDefined(invitation.data);
  if (!success) {
    throw new Response("Invalid invitation", { status: 400 });
  }
  return {
    invitation: invitation.data,
  };
}

export async function clientAction({
  request,
}: ClientActionFunctionArgs): Promise<FormActionData> {
  const parsedFormData = await parseFormData(request, FormDataSchema);
  if (parsedFormData instanceof Error) {
    return {
      status: "error",
      error: {
        type: "alert",
        title: parsedFormData.message,
      },
    };
  }
  const { name, email, password, confirmPassword } = parsedFormData;

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

  const { error } = await withMinimumDelay(
    signUp.email({
      name,
      email,
      password,
      image: pickAvatar(),
    })
  );
  const success = !isDefined(error);

  if (!success) {
    return {
      status: "error",
      error: mapAuthErrorToFormActionError(error),
    };
  }
  throw redirect(href("/organization/create"));
}

export default function Signup() {
  const loaderData = useLoaderData<typeof loader>();
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
            <TextField
              name="email"
              type="email"
              isRequired
              defaultValue={loaderData.invitation?.email}
            >
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
