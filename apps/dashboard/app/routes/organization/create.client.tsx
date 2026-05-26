"use client";

import { withMinimumDelay } from "@lite-app/shared/delay";
import { invariant } from "@lite-app/shared/invariant";
import { Button } from "@lite-app/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@lite-app/ui/components/card";
import { FieldError } from "@lite-app/ui/components/field-error";
import { Form, type FormProps } from "@lite-app/ui/components/form";
import { Input } from "@lite-app/ui/components/input";
import { Label } from "@lite-app/ui/components/label";
import { Spinner } from "@lite-app/ui/components/spinner";
import { TextField } from "@lite-app/ui/components/textfield";
import { Heading } from "@lite-app/ui/components/typography";
import { useState, useTransition } from "react";
import { cn } from "tailwind-variants";

import { organization } from "~/lib/auth/index.client";
import {
  getFieldNameForOrganizationError,
  isOrganizationError,
} from "~/lib/organization/error";

export function CreateOrganizationForm() {
  const [validationErrors, setValidationErrors] = useState<
    FormProps["validationErrors"]
  >({});
  const [isPending, startTransition] = useTransition();
  const handleSubmit: FormProps["onSubmit"] = (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const promise = action(formData);
      const result = await withMinimumDelay(promise);
      if (isOrganizationError(result.error)) {
        setValidationErrors({
          [getFieldNameForOrganizationError(result.error.code)]:
            result.error.message,
        });
      }
    });
  };
  return (
    <Card>
      <CardHeader className={cn("items-center gap-1")}>
        <Heading align="center" level={1} className={cn("text-xl")}>
          Create organization
        </Heading>
        <CardDescription className={cn("text-center")}>
          Choose a name for your team workspace
        </CardDescription>
      </CardHeader>
      <Form validationErrors={validationErrors} onSubmit={handleSubmit}>
        <CardContent>
          <TextField name="name" type="text" isRequired>
            <Label>Name</Label>
            <Input variant="secondary" />
            <FieldError />
          </TextField>
        </CardContent>
        <CardFooter className={cn("mt-4")}>
          <Button className={cn("w-full")} type="submit" isPending={isPending}>
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

async function action(formData: FormData) {
  const name = formData.get("name");

  invariant(typeof name === "string", "Name is required");

  const result = await organization.create({
    name,
    slug: "my-organization",
  });
  return result;
}
