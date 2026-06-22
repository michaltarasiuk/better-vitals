import { withMinimumDelay } from "@lite-app/shared/delay";
import { isDefined } from "@lite-app/shared/is-defined";
import { Card, CardFooter } from "@lite-app/ui/components/card";
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
import { organization } from "~/lib/auth";
import { parseFormData } from "~/lib/form/form-data";
import { mapOrganizationErrorToFormActionError } from "~/lib/organization/error";

const FormDataSchema = z.object({
  name: z.string(),
});

export async function clientAction({
  request,
}: ClientActionFunctionArgs): Promise<FormActionData> {
  const { name } = await parseFormData(request, FormDataSchema);

  const { data, error } = await withMinimumDelay(
    organization.create({
      name,
      slug: slugify(name),
    })
  );
  const success = isDefined(data) && !isDefined(error);

  if (!success) {
    return {
      status: "error",
      error: mapOrganizationErrorToFormActionError(error),
    };
  }
  throw redirectDocument(
    href("/organization/:slug", {
      slug: data.slug,
    })
  );
}

export function OrganizationCreate() {
  const actionData = useActionData<typeof clientAction>();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  return (
    <Card>
      <FormCardHeader>
        <FormCardTitle>Name your organization</FormCardTitle>
      </FormCardHeader>
      <ActionForm actionData={actionData}>
        <FormCardContent>
          <ActionFormAlert />
          <div className={cn("flex flex-col gap-4")}>
            <TextField name="name" type="text" isRequired>
              <Label>Name</Label>
              <Input variant="secondary" />
              <FieldError />
            </TextField>
          </div>
        </FormCardContent>
        <CardFooter className={cn("mt-4")}>
          <SubmitButton isPending={isSubmitting}>
            {({ isPending }) =>
              isPending ? "Creating" : "Create organization"
            }
          </SubmitButton>
        </CardFooter>
      </ActionForm>
    </Card>
  );
}
