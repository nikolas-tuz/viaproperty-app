import { z } from 'zod';

export const contactsSchema = z.object({
  initials: z.string().trim().min(1, `Provide valid initials from 1 to 100 chars long.`).max(100, `Provide valid initials from 1 to 100 chars long.`),
  phoneNumbers: z.array(z.string().regex(/^\d+$/, 'Phone number should contain numbers only').trim().min(10, `Each phone number should be from 10 to 20 characters.`).max(20, `Each phone number should be from 1 to 20 characters.`))
    .min(1, `Please provide at least one contact.`).max(3, `The phone numbers cannot exceed 3 per one contact.`)
}).refine(({ phoneNumbers }) => {
  return new Set(phoneNumbers).size === phoneNumbers.length;
}, { message: `Each phone number should be unique.` });

export const floorPlanSchema = z.object({
  heading: z.string().trim().min(1, `Please provide a valid heading from 1 to 100 characters.`).max(100, `Please provide a valid heading from 1 to 100 characters.`),
  shortDescription: z.string().trim().min(5, `A short description should be at least 5 characters.`).max(1000, `A short description should not exceed 1000 characters.`)
});