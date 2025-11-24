import { Button } from "@/components/ui/button";
import { FieldGroup, FieldSet } from "@/components/ui/field";
import FormInput from "@/components/ui/formInput";
import { NewsletterSchema, NewsletterType } from "@/lib/contact-us";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";

const NewsletterForm = () => {
  const form = useForm<NewsletterType>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(NewsletterSchema),
  });

  const onSubmit = (values: NewsletterType) => {
    console.log(values);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="md:row-start-2">
        <FieldSet>
          <FieldGroup className="gap-2 lg:flex-row">
            <FormInput
              name="email"
              label="Receive news"
              type="email"
              placeholder="Email address"
              description="Get exclusive updates and insights straight to your inbox."
              className="max-w-[368px]"
            />
            <Button className="h-14 w-full lg:h-12 lg:max-w-fit lg:self-center">
              Join Us
            </Button>
          </FieldGroup>
        </FieldSet>
      </form>
    </FormProvider>
  );
};

export default NewsletterForm;
