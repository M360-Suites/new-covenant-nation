"use server";

import { isSpam, readFields, saveSubmission, type FormState } from "@/lib/forms/submission";

export async function submitConnect(_prev: FormState, formData: FormData): Promise<FormState> {
  if (isSpam(formData)) return { status: "success" };

  const returning = formData.get("visitorType") === "returning";
  const { values, errors } = readFields(formData, {
    title: { max: 20 },
    firstName: { required: true, max: 60 },
    lastName: { required: true, max: 60 },
    gender: { required: true, max: 20 },
    dateOfBirth: { max: 40 },
    maritalStatus: { max: 30 },
    occupation: { max: 100 },
    phone: { required: true, max: 40 },
    whatsapp: { max: 40 },
    email: { required: true, email: true, max: 160 },
    contactPreference: { max: 20 },
    address: { max: 200 },
    area: { max: 100 },
    city: { max: 100 },
    state: { max: 40 },
    visitDate: { max: 20 },
    heardFrom: { max: 60 },
    followUp: { max: 40 },
    isMember: { required: returning, max: 20 },
    joinedDate: { max: 20 },
    department: { max: 80 },
    academyLevel: { max: 20 },
    requestType: { required: returning, max: 60 },
    message: { max: 3000 },
  });
  if (!formData.get("consent")) {
    return { status: "error", errors: { ...errors, consent: "Please agree to be contacted so we can reply." } };
  }
  if (errors) return { status: "error", errors };

  const interests = formData.getAll("interests").map(String).slice(0, 12);
  const result = await saveSubmission({
    _type: "connectSubmission",
    visitorType: returning ? "returning" : "firstTime",
    ...Object.fromEntries(Object.entries(values).filter(([, v]) => v)),
    visitDate: /^\d{4}-\d{2}-\d{2}$/.test(values.visitDate) ? values.visitDate : undefined,
    interests: interests.length ? interests : undefined,
  });
  return result.status === "success" ? { status: "success", message: values.firstName } : result;
}
