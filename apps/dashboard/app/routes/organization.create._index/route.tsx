import { withMinimumDelay } from "@lite-app/shared/delay";
import { Card } from "@lite-app/ui/components/card";
import { FieldError } from "@lite-app/ui/components/field-error";
import { Input } from "@lite-app/ui/components/input";
import { Label } from "@lite-app/ui/components/label";
import { TextField } from "@lite-app/ui/components/textfield";
import slugify from "@sindresorhus/slugify";
import {
  href,
  redirectDocument,
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
import { requireAuthenticated } from "~/lib/auth/guards.server";
import { parseFormData } from "~/lib/form/form-data";
import { createOrganization } from "~/lib/organization";
import { mapOrganizationErrorToFormActionError } from "~/lib/organization/error";
import { requireAdminWithoutOrganization } from "~/lib/organization/guards.server";

import type { Route } from "./+types/route";

const FormDataSchema = z.object({
  name: z.string(),
});

export const middleware: Route.MiddlewareFunction[] = [
  requireAuthenticated,
  requireAdminWithoutOrganization,
];

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
  const { name } = formData;

  const organization = await withMinimumDelay(
    createOrganization({
      name,
      slug: slugify(name),
    })
  );

  if (organization instanceof Error) {
    return {
      status: "error",
      error: mapOrganizationErrorToFormActionError(organization.cause),
    };
  }
  throw redirectDocument(
    href("/organization/:slug", {
      slug: organization.slug,
    })
  );
}

export default function OrganizationCreate() {
  const actionData = useActionData<typeof clientAction>();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  return (
    <Card>
      <FormCardHeader>
        <FormCardTitle>Name your organization</FormCardTitle>
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
          </FormFields>
        </FormCardContent>
        <FormCardFooter>
          <SubmitButton isPending={isSubmitting}>
            {({ isPending }) =>
              isPending ? "Creating" : "Create organization"
            }
          </SubmitButton>
        </FormCardFooter>
      </Form>
    </Card>
  );
}
