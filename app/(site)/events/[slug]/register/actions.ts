"use server";

import { isSpam, readFields, saveSubmission, type FormState } from "@/lib/forms/submission";

export async function registerForEvent(eventId: string, _prev: FormState, formData: FormData): Promise<FormState> {
  if (isSpam(formData)) return { status: "success" };

  const { values, errors } = readFields(formData, {
    fullName: { required: true, max: 120 },
    email: { required: true, email: true, max: 160 },
    phone: { required: true, max: 40 },
    heardFrom: { max: 60 },
  });
  if (errors) return { status: "error", errors };

  return saveSubmission({
    _type: "eventRegistration",
    event: { _type: "reference", _ref: eventId },
    ...values,
    heardFrom: values.heardFrom || undefined,
  });
}
