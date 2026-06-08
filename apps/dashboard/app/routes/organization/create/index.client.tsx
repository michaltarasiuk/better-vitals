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
import { Spinner } from "@lite-app/ui/components/spinner";
import { TextField } from "@lite-app/ui/components/textfield";
import {
  useActionData,
  useNavigation,
  type ClientActionFunctionArgs,
} from "react-router";
import { cn } from "tailwind-variants";
import { z } from "zod";

import { Form, type FormProps } from "~/components/form";
import { organization } from "~/lib/auth/index.client";
import {
  getOrganizationErrorField,
  isKnownOrganizationError,
} from "~/lib/organization/error";
import { slugify } from "~/lib/organization/slug";
import { parseFormData } from "~/lib/parse-form-data";

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
  const success = isDefined(result.data);

  if (!success) {
    if (!isKnownOrganizationError(result.error)) {
      return {
        success: false,
      };
    }
    const validationErrors = {
      [getOrganizationErrorField(result.error.code)]: result.error.message,
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

export function OrganizationCreate() {
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
          Create an organization
        </h1>
        <CardDescription className={cn("text-center")}>
          Enter a name to get started
        </CardDescription>
      </CardHeader>
      <Form validationErrors={validationErrors}>
        <CardContent>
          <TextField name="name" type="text" isRequired>
            <Label>Name</Label>
            <Input variant="secondary" />
            <FieldError />
          </TextField>
        </CardContent>
        <CardFooter className={cn("mt-4")}>
          <Button
            type="submit"
            isPending={isSubmitting}
            className={cn("w-full")}
          >
            {(props) => (
              <>
                {props.isPending ? <Spinner color="current" size="sm" /> : null}
                {props.isPending ? "Creating" : "Create organization"}
              </>
            )}
          </Button>
        </CardFooter>
      </Form>
    </Card>
  );
}
