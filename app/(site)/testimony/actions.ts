"use server";

import { isSpam, readFields, saveSubmission, type FormState } from "@/lib/forms/submission";

export async function shareTestimony(_prev: FormState, formData: FormData): Promise<FormState> {
  if (isSpam(formData)) return { status: "success" };

  const { values, errors } = readFields(formData, {
    fullName: { required: true, max: 120 },
    email: { required: true, email: true, max: 160 },
    phone: { max: 40 },
    expression: { max: 80 },
    category: { max: 60 },
    story: { required: true, max: 6000 },
  });
  if (errors) return { status: "error", errors };

  return saveSubmission({ _type: "testimony", ...Object.fromEntries(Object.entries(values).filter(([, v]) => v)) });
}
