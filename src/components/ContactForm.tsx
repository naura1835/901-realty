"use client";
import { Button } from "@/components/ui/button";
import { FieldGroup, FieldSet } from "@/components/ui/field";
import FormInput from "@/components/ui/formInput";
import FormTextarea from "@/components/ui/formTextarea";
import { ContactUsSchema, ContactUsType } from "@/lib/validations/contact-us";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { useState } from "react";
import { Spinner } from "./ui/spinner";

const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const apiKey = process.env.NEXT_PUBLIC_EMAILJS_API_KEY;

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm<ContactUsType>({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subjectTitle: "",
      message: "",
    },
    resolver: zodResolver(ContactUsSchema),
  });

  const onSubmit = async (values: ContactUsType) => {
    try {
      setLoading(true);
      const parsedData = ContactUsSchema.safeParse(values);

      if (!parsedData.success) return;
      const res = await emailjs.send(serviceId!, templateId!, values, apiKey!);
      if (res?.status === 200) {
        toast.success("Message Sent successfully", {
          description:
            "Your message has been sent successfully, someone will respond to you shortly",
        });
      }
    } catch (err) {
      const error =
        err instanceof Error
          ? err?.message
          : (err as { status: number; text: string })?.text;
      toast.error("Failed to send message", { description: error });
    } finally {
      setLoading(false);
    }
  };
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="contact-form w-full md:row-span-2 md:max-w-[490px] md:self-center md:justify-self-end"
      >
        <FieldSet>
          <FieldGroup className="gap-4">
            <FormInput name="name" placeholder="Full name" />
            <FormInput name="email" type="email" placeholder="Email address" />
            <FormInput name="phone" type="phone" placeholder="Phone Number" />
            <FormInput name="subjectTitle" placeholder="Subject Title" />
            <FormTextarea name="message" placeholder="Your Message" />
            <Button className="h-14 w-full">
              {loading && <Spinner />}Send Message
            </Button>
          </FieldGroup>
        </FieldSet>
      </form>
    </FormProvider>
  );
};

export default ContactForm;
