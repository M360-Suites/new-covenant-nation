"use server";

import { isSpam, readFields, saveSubmission, type FormState } from "@/lib/forms/submission";

export async function enrol(_prev: FormState, formData: FormData): Promise<FormState> {
  if (isSpam(formData)) return { status: "success" };

  const { values, errors } = readFields(formData, {
    fullName: { required: true, max: 120 },
    email: { required: true, email: true, max: 160 },
    phone: { required: true, max: 40 },
    course: { required: true, max: 80 },
    statement: { max: 2000 },
  });
  if (errors) return { status: "error", errors };

  return saveSubmission({
    _type: "enrolment",
    fullName: values.fullName,
    email: values.email,
    phone: values.phone,
    course: { _type: "reference", _ref: values.course },
    statement: values.statement,
  });
}
