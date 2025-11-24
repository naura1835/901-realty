import * as z from "zod";

const ContactUsSchema = z.object({
  name: z.string().min(2, "Full name is required"),
  email: z.email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  subjectTitle: z.string().min(5, "Subject title is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});
const NewsletterSchema = z.object({
  email: z.email("Invalid email address"),
});

type ContactUsType = z.infer<typeof ContactUsSchema>;
type NewsletterType = z.infer<typeof NewsletterSchema>;

export type { ContactUsType, NewsletterType };

export { ContactUsSchema, NewsletterSchema };
