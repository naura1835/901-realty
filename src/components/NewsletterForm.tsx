import { Button } from "@/components/ui/button";
import { FieldGroup, FieldSet } from "@/components/ui/field";
import FormInput from "@/components/ui/formInput";
import { NewsletterSchema, NewsletterType } from "@/lib/validations/contact-us";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Spinner } from "./ui/spinner";

const NewsletterForm = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm<NewsletterType>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(NewsletterSchema),
  });

  const onSubmit = async (values: NewsletterType) => {
    try {
      setLoading(true);
      const parsedData = NewsletterSchema.safeParse(values);
      if (!parsedData.success) return;

      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.email }),
      });
      if (res?.status === 200) {
        toast.success("Subscription successful!", {
          description: "You're now subscribed to our newsletter.",
        });
      }
    } catch (err) {
      const error = err instanceof Error ? err?.message : "";
      toast.error("Failed to send message", { description: error });
    } finally {
      setLoading(false);
    }
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
            <Button className="h-14 w-full lg:mb-6 lg:h-12 lg:max-w-fit lg:self-center">
              {loading && <Spinner />}Join Us
            </Button>
          </FieldGroup>
        </FieldSet>
      </form>
    </FormProvider>
  );
};

export default NewsletterForm;
