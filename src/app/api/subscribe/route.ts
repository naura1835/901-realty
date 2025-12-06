import { NextResponse } from "next/server";
import mailchimp from "@mailchimp/mailchimp_marketing";

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY!,
  server: process.env.MAILCHIMP_SERVER_PREFIX!,
});

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 },
      );
    }

    const res = await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_ID!,
      { email_address: email, status: "subscribed" },
    );

    if ("id" in res && !res.id) {
      return NextResponse.json(
        { message: "Subscription failed" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { message: "Subscribed successfully!" },
      { status: 200 },
    );
  } catch (error) {
    const errorMessage =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (error as any)?.response?.body?.title ||
      (error instanceof Error ? error.message : "Server error");

    return NextResponse.json(
      {
        message: errorMessage,
      },
      { status: 500 },
    );
  }
}
