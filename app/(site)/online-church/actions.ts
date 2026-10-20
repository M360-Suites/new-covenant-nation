"use server";

import { isSpam, readFields, saveSubmission, type FormState } from "@/lib/forms/submission";

export async function postChatMessage(name: string, text: string): Promise<FormState> {
  const cleanName = name.trim().slice(0, 40);
  const cleanText = text.trim().slice(0, 500);
  if (!cleanName || !cleanText) return { status: "error", message: "Please enter your name and a message." };

  return saveSubmission({ _type: "chatMessage", name: cleanName, text: cleanText, moderator: false, postedAt: new Date().toISOString() });
}

export async function submitPrayer(_prev: FormState, formData: FormData): Promise<FormState> {
  if (isSpam(formData)) return { status: "success" };

  const anonymous = formData.get("anonymous") === "on";
  const followUp = formData.get("followUp") === "on";
  const { values, errors } = readFields(formData, {
    name: { required: !anonymous, max: 120 },
    email: { required: followUp, email: true, max: 160 },
    category: { max: 80 },
    request: { required: true, max: 4000 },
  });
  if (errors) return { status: "error", errors };

  const result = await saveSubmission({
    _type: "prayerRequest",
    anonymous,
    name: anonymous ? undefined : values.name,
    email: values.email || undefined,
    category: values.category || undefined,
    request: values.request,
    followUp,
  });
  return result.status === "success" ? { status: "success", message: followUp ? "followUp" : undefined } : result;
}
