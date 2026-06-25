import { isDefined } from "@lite-app/shared/is-defined";
import * as errore from "errore";

import { resend } from "~/lib/email/index.server";
import { env } from "~/lib/env.server";

export class SendEmailError extends errore.createTaggedError({
  name: "SendEmailError",
  message: "Failed to send email to $to",
}) {}

export async function sendEmail({
  to,
  subject,
  html,
  idempotencyKey,
}: {
  to: string;
  subject: string;
  html: string;
  idempotencyKey: string;
}) {
  const { data, error } = await resend.emails.send(
    {
      from: env.EMAIL_FROM,
      to: [to],
      subject,
      html,
    },
    { idempotencyKey }
  );
  const success = isDefined(data) && !isDefined(error);

  if (!success) {
    return new SendEmailError({ to, cause: error });
  }
  return data;
}
