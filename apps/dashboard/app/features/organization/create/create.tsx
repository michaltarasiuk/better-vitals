import { withMinimumDelay } from "@lite-app/shared/delay";
import { isDefined } from "@lite-app/shared/is-defined";
import { Card, CardContent, CardFooter } from "@lite-app/ui/components/card";
import { FieldError } from "@lite-app/ui/components/field-error";
import { Input } from "@lite-app/ui/components/input";
import { Label } from "@lite-app/ui/components/label";
import { TextField } from "@lite-app/ui/components/textfield";
import slugify from "@sindresorhus/slugify";
import {
  href,
  redirectDocument,
  type ClientActionFunctionArgs,
} from "react-router";
import { cn } from "tailwind-variants";
import { z } from "zod";

import { Form } from "~/components/form";
import {
  FormCardDescription,
  FormCardHeader,
  FormCardTitle,
} from "~/components/form-card";
import { SubmitButton } from "~/components/submit-button";
import { organization } from "~/lib/auth";
import { parseFormData } from "~/lib/form/form-data";

const FormDataSchema = z.object({
  name: z.string(),
});

export async function clientAction({ request }: ClientActionFunctionArgs) {
  const { name } = await parseFormData(request, FormDataSchema);

  const result = await withMinimumDelay(
    organization.create({
      name,
      slug: slugify(name),
    })
  );
  const createdOrganization = result.data;
  if (!isDefined(createdOrganization)) {
    return {
      success: false,
    };
  }

  throw redirectDocument(
    href("/organization/:slug", { slug: createdOrganization.slug })
  );
}

export function OrganizationCreate() {
  return (
    <Card>
      <FormCardHeader>
        <FormCardTitle>Create an organization</FormCardTitle>
        <FormCardDescription>Enter a name to get started</FormCardDescription>
      </FormCardHeader>
      <Form>
        <CardContent>
          <TextField name="name" type="text" isRequired>
            <Label>Name</Label>
            <Input variant="secondary" />
            <FieldError />
          </TextField>
        </CardContent>
        <CardFooter className={cn("mt-4")}>
          <SubmitButton>
            {({ isPending }) =>
              isPending ? "Creating" : "Create organization"
            }
          </SubmitButton>
        </CardFooter>
      </Form>
    </Card>
  );
}
