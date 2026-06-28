import { withMinimumDelay } from "@better-vitals/shared/delay";
import { Card } from "@better-vitals/ui/components/card";
import { FieldError } from "@better-vitals/ui/components/field-error";
import { Input } from "@better-vitals/ui/components/input";
import { Label } from "@better-vitals/ui/components/label";
import { TextField } from "@better-vitals/ui/components/textfield";
import slugify from "@sindresorhus/slugify";
import { useState } from "react";
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
  slug: z.string(),
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
  const { name, slug } = formData;

  const organization = await withMinimumDelay(
    createOrganization({
      name,
      slug,
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

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");

  const [isSlugEdited, setIsSlugEdited] = useState(false);

  const isSubmitting = navigation.state === "submitting";

  function handleNameChange(value: string) {
    setName(value);
    if (!isSlugEdited) {
      setSlug(slugify(value));
    }
  }
  function handleSlugChange(value: string) {
    setSlug(value);
    setIsSlugEdited(true);
  }

  return (
    <Card>
      <FormCardHeader>
        <FormCardTitle>Name your organization</FormCardTitle>
      </FormCardHeader>
      <Form method="POST" actionData={actionData}>
        <FormCardContent>
          <ActionFormAlert />
          <FormFields>
            <TextField
              name="name"
              type="text"
              value={name}
              onChange={handleNameChange}
              isRequired
            >
              <Label>Name</Label>
              <Input variant="secondary" />
              <FieldError />
            </TextField>
            <TextField
              name="slug"
              type="text"
              value={slug}
              onChange={handleSlugChange}
              isRequired
            >
              <Label>Slug</Label>
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
