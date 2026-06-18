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
      <CardHeader className={cn("items-center gap-1")}>
        <h1
          className={cardVariants().title({
            className: "text-xl font-medium",
          })}
        >
          Create an organization
        </h1>
        <CardDescription className={cn("text-center")}>
          Enter a name to get started
        </CardDescription>
      </CardHeader>
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
