import { withMinimumDelay } from "@lite-app/shared/delay";
import { isDefined } from "@lite-app/shared/is-defined";
import { Button, type ButtonProps } from "@lite-app/ui/components/button";
import { FieldError } from "@lite-app/ui/components/field-error";
import { Input } from "@lite-app/ui/components/input";
import { Label } from "@lite-app/ui/components/label";
import { ListBox, ListBoxItem } from "@lite-app/ui/components/list-box";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseTrigger,
  ModalContainer,
  ModalDialog,
  ModalFooter,
  ModalHeader,
  ModalHeading,
} from "@lite-app/ui/components/modal";
import {
  Select,
  SelectIndicator,
  SelectPopover,
  SelectTrigger,
  SelectValue,
} from "@lite-app/ui/components/select";
import { TextField } from "@lite-app/ui/components/textfield";
import { UserPlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import {
  href,
  useFetcher,
  useParams,
  type ClientActionFunctionArgs,
} from "react-router";
import { cn } from "tailwind-variants";
import { z } from "zod";

import {
  ActionFormAlert,
  type FormActionData,
} from "~/components/action-data-context";
import { Form } from "~/components/form";
import { FormFields } from "~/components/form-fields";
import { SubmitButton } from "~/components/submit-button";
import { authClient } from "~/lib/auth";
import { parseFormData } from "~/lib/form/form-data";
import { mapOrganizationErrorToFormActionError } from "~/lib/organization/error";
import {
  ADMIN_ROLE,
  INVITE_MEMBER_ROLES,
  MEMBER_ROLE,
} from "~/lib/organization/roles";
import { formatUserRole } from "~/lib/user/display";

const FormDataSchema = z.object({
  email: z.email(),
  role: z.enum([MEMBER_ROLE, ADMIN_ROLE]),
});

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
  const { email, role } = formData;

  const { data, error } = await withMinimumDelay(
    authClient.organization.inviteMember({
      email,
      role,
    })
  );
  const success = isDefined(data) && !isDefined(error);

  if (!success) {
    return {
      status: "error",
      error: mapOrganizationErrorToFormActionError(error),
    };
  }
  return {
    status: "success",
    success: {
      type: "dismiss",
    },
  };
}

export function InviteModal() {
  const params = useParams();
  const fetcher = useFetcher<typeof clientAction>();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isDefined(fetcher.data)) {
      return;
    }
    const dismiss =
      fetcher.data.status === "success" &&
      fetcher.data.success.type === "dismiss";
    if (dismiss) {
      setIsOpen(false);
    }
  }, [fetcher.data]);

  const isSubmitting = fetcher.state === "submitting";

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen} size="sm">
      <InviteButton />
      <ModalBackdrop isDismissable>
        <ModalContainer>
          <ModalDialog>
            <ModalHeader>
              <ModalHeading>Invite member</ModalHeading>
              <ModalCloseTrigger />
            </ModalHeader>
            <Form
              actionData={fetcher.data}
              onSubmit={(e) => {
                e.preventDefault();
                if (!isDefined(params.slug)) {
                  return;
                }
                fetcher.submit(e.currentTarget, {
                  method: "POST",
                  action: href("/organization/:slug/invite", {
                    slug: params.slug,
                  }),
                });
              }}
            >
              <ModalBody className={cn("flex flex-col gap-2")}>
                <ActionFormAlert />
                <FormFields>
                  <TextField name="email" type="email" autoFocus isRequired>
                    <Label>Email</Label>
                    <Input variant="secondary" />
                    <FieldError />
                  </TextField>
                  <Select
                    name="role"
                    defaultValue={MEMBER_ROLE}
                    variant="secondary"
                    fullWidth
                    isRequired
                  >
                    <Label>Role</Label>
                    <SelectTrigger>
                      <SelectValue />
                      <SelectIndicator />
                    </SelectTrigger>
                    <FieldError />
                    <SelectPopover>
                      <ListBox items={INVITE_MEMBER_ROLES}>
                        {(item) => (
                          <ListBoxItem id={item.id} textValue={item.label}>
                            {formatUserRole(item.id)}
                          </ListBoxItem>
                        )}
                      </ListBox>
                    </SelectPopover>
                  </Select>
                </FormFields>
              </ModalBody>
              <ModalFooter>
                <Button slot="close" variant="secondary">
                  Cancel
                </Button>
                <SubmitButton className={cn("w-auto")} isPending={isSubmitting}>
                  {({ isPending }) => (isPending ? "Sending" : "Send invite")}
                </SubmitButton>
              </ModalFooter>
            </Form>
          </ModalDialog>
        </ModalContainer>
      </ModalBackdrop>
    </Modal>
  );
}

function InviteButton(props: ButtonProps) {
  return (
    <Button variant="primary" size="sm" {...props}>
      <UserPlusIcon aria-hidden />
      Invite
    </Button>
  );
}
