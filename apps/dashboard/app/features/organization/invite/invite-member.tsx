import { Button } from "@lite-app/ui/components/button";
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
import { useState } from "react";
import { cn } from "tailwind-variants";

import { Form } from "~/components/form";
import { FormFields } from "~/components/form-fields";
import { SubmitButton } from "~/components/submit-button";
import { INVITE_MEMBER_ROLES, MEMBER_ROLE } from "~/lib/organization/roles";
import { formatUserRole } from "~/lib/user/format";

export function InviteMemberModal() {
  const [isOpen, setIsOpen] = useState(false);

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
            <Form>
              <ModalBody>
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
                <SubmitButton className={cn("w-auto")}>
                  Send invite
                </SubmitButton>
              </ModalFooter>
            </Form>
          </ModalDialog>
        </ModalContainer>
      </ModalBackdrop>
    </Modal>
  );
}

function InviteButton(props: React.ComponentProps<typeof Button>) {
  return (
    <Button variant="primary" size="sm" {...props}>
      <UserPlusIcon aria-hidden />
      Invite
    </Button>
  );
}
