import { Button } from "@/components/ui/button";
import { FieldGroup, FieldSet } from "@/components/ui/field";
import FormInput from "@/components/ui/formInput";
import FormTextarea from "@/components/ui/formTextarea";
import { ContactUsSchema, ContactUsType } from "@/lib/contact-us";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

const ContactForm = () => {
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

  const onSubmit = (values: ContactUsType) => {
    console.log(values);
  };
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full md:row-span-2 md:max-w-[490px] md:self-center md:justify-self-end"
      >
        <FieldSet>
          <FieldGroup className="gap-4">
            <FormInput name="name" placeholder="Full name" />
            <FormInput name="email" type="email" placeholder="Email address" />
            <FormInput name="phone" type="phone" placeholder="Phone Number" />
            <FormInput name="subjectTitle" placeholder="Subject Title" />
            <FormTextarea name="message" placeholder="Your Message" />
            <Button className="h-14 w-full">Send Message</Button>
          </FieldGroup>
        </FieldSet>
      </form>
    </FormProvider>
  );
};

export default ContactForm;
