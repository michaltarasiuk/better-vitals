import { withMinimumDelay } from "@better-vitals/shared/delay";
import { Button } from "@better-vitals/ui/components/button";
import { FieldError } from "@better-vitals/ui/components/field-error";
import { Input } from "@better-vitals/ui/components/input";
import { Label } from "@better-vitals/ui/components/label";
import { ListBox, ListBoxItem } from "@better-vitals/ui/components/list-box";
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
} from "@better-vitals/ui/components/modal";
import {
  Select,
  SelectIndicator,
  SelectPopover,
  SelectTrigger,
  SelectValue,
} from "@better-vitals/ui/components/select";
import { TextField } from "@better-vitals/ui/components/textfield";
import {
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router";
import { cn } from "tailwind-variants";
import { z } from "zod";

import { Form } from "~/components/form";
import { FormAlert } from "~/components/form-alert";
import { FormProvider, type FormActionData } from "~/components/form-context";
import { FormFields } from "~/components/form-fields";
import { SubmitButton } from "~/components/submit-button";
import { parseFormData } from "~/lib/form/form-data";
import { inviteMember } from "~/lib/organization";
import { mapOrganizationErrorToFormActionError } from "~/lib/organization/error";
import {
  ADMIN_ROLE,
  INVITE_MEMBER_ROLES,
  MEMBER_ROLE,
} from "~/lib/organization/roles";
import { formatUserRole } from "~/lib/user/display";

import type { Route } from "./+types/route";

const FormDataSchema = z.object({
  email: z.string(),
  role: z.enum([MEMBER_ROLE, ADMIN_ROLE]),
});

export async function clientAction({
  request,
}: Route.ClientActionArgs): Promise<FormActionData> {
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

  const invitation = await withMinimumDelay(
    inviteMember({
      email,
      role,
    })
  );
  if (invitation instanceof Error) {
    return {
      status: "error",
      error: mapOrganizationErrorToFormActionError(invitation.cause),
    };
  }

  throw redirect("..");
}

export default function OrganizationInvite() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const actionData = useActionData<typeof clientAction>();

  function closeModal() {
    navigate("..");
  }

  const isSubmitting = navigation.state === "submitting";

  return (
    <Modal isOpen onOpenChange={(isOpen) => !isOpen && closeModal()} size="sm">
      <ModalBackdrop isDismissable>
        <ModalContainer>
          <ModalDialog>
            <ModalHeader>
              <ModalHeading>Invite member</ModalHeading>
              <ModalCloseTrigger />
            </ModalHeader>
            <FormProvider value={actionData}>
              <Form method="POST">
                <ModalBody className={cn("flex flex-col gap-2")}>
                  <FormAlert />
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
                  <SubmitButton
                    className={cn("w-auto")}
                    isPending={isSubmitting}
                  >
                    {({ isPending }) => (isPending ? "Sending" : "Send invite")}
                  </SubmitButton>
                </ModalFooter>
              </Form>
            </FormProvider>
          </ModalDialog>
        </ModalContainer>
      </ModalBackdrop>
    </Modal>
  );
}
