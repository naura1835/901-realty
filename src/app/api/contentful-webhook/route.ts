import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const title = body.fields?.name?.["en-US"] || "New Smart Home Release";
    const slug = body.fields?.slug?.["en-US"] || "";
    const description =
      body.fields?.description?.["en-US"] ||
      "A new smart home innovation has been published";
    const availability = body.fields?.availability?.["en-US"] || "";
    const featuredImage = body.fields.featuredImage?.["en-US"]?.fields?.file
      ?.url
      ? "https://" + body.fields.featuredImage["en-US"].fields.file.url
      : "";
    const entryUrl = `${process.env.SITE_URL}/smart-housing/${slug}`;
    const logo = `${process.env.LOGO_URL}/6pg8lZdUUlStkfYKa1mEHe/f5c7dbf09c064805872b773bed9e3705/Frame_63.png`;

    // Optional: verify signature
    const signature = request.headers.get("x-webhook-signature");
    if (signature !== process.env.CONTENTFUL_WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Log or process the published entry
    console.log("SmartHomeInnovation published:", body);

    const campaign = await fetch(
      "https://connect.mailerlite.com/api/campaigns",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.MAILERLITE_API_KEY}`,
        },
        body: JSON.stringify({
          name: `New Smart Home Innovation: ${title}`,
          type: "regular",
          subject: title,
          emails: [
            {
              subject: title,
              from_name: "Mubarak Bala",
              from: "news@901realty.ng",
              content: `<!DOCTYPE html>
              <html lang="en">
                <head>
                  <meta charset="UTF-8" />
                  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                  <title>New Product Launch</title>
                </head>

                <body style="margin:0;padding:20px;background-color:#f5f5f5;font-family:Arial, sans-serif;">
                  <div style="max-width:600px;margin:0 auto;background-color:#ffffff;">

                    <!-- Header -->
                    <div style="padding:40px 20px;text-align:center;background-color:#ffffff;">
                      <img src="${logo}" alt="901 realty logo" style="width:300px;object-fit:cover;" />
                    </div>

                    <!-- Content -->
                    <div style="padding:40px 30px;">

                      <div style="overflow:hidden;margin-bottom:30px;">

                        <div style="width:100%;height:300px;display:flex;align-items:center;justify-content:center;">
                          <img src="${featuredImage}" alt="${title}" style="width:100%;height:100%;object-fit:cover;" />
                        </div>

                        <div style="padding:25px;">

                          <span style="display:inline-block;padding:6px 12px;border-radius:20px;font-size:12px;font-weight:bold;margin-bottom:15px;background-color:#ffffff;border:1px solid #252422;color:#252422;text-transform:capitalize;">
                            ${availability}
                          </span>

                          <h2 style="font-size:24px;font-weight:bold;color:#333;margin-bottom:10px;">
                            ${title}
                          </h2>

                          <p style="color:#666;line-height:1.6;font-size:14px;">
                            ${description}
                          </p>

                          <a href="${entryUrl}"
                            style="display:inline-block;background-color:#252422;color:#ffffff;padding:12px 30px;text-decoration:none;border-radius:5px;margin-top:20px;font-weight:bold;">
                            View Product
                          </a>

                        </div>
                      </div>
                    </div>

                    <!-- Footer -->
                    <div style="background-color:#F4F3EE;padding:30px 20px;text-align:center;">

                      <div style="color:#666;font-size:14px;line-height:1.8;">
                        <p><strong>Instagram:</strong>
                          <a href="https://www.instagram.com/901.realty/" style="color:#667eea;text-decoration:none;">
                            @901realty
                          </a>
                        </p>

                        <p><strong>Website:</strong>
                          <a href="https://www.901realty.ng" style="color:#667eea;text-decoration:none;">
                            www.901realty.ng
                          </a>
                        </p>

                        <div style="height:1px;background-color:#ddd;margin:20px 0;"></div>

                        <p><strong>Email:</strong>
                          <a href="mailto:901concepts@gmail.com" style="color:#667eea;text-decoration:none;">
                            901concepts@gmail.com
                          </a>
                        </p>

                        <p><strong>Phone:</strong>
                          <a href="tel:08033486662" style="color:#667eea;text-decoration:none;">
                            (+234) 803 348 6662
                          </a>
                        </p>

                        <p><strong>Address:</strong> Suite 09 Kaltume House, Maiduguri Road, Kano, Nigeria</p>
                      </div>

                      <div style="height:1px;background-color:#ddd;margin:20px 0;"></div>

                      <p style="font-size:12px;color:#999;margin-top:15px;">
                        © 901 Realty. All rights reserved.
                      </p>

                    </div>

                  </div>
                </body>
              </html>
            `,
            },
          ],
          groups: [process.env.MAILERLITE_GROUP_ID],
        }),
      },
    );
    const res = await campaign.json();
    await fetch(
      `https://connect.mailerlite.com/api/campaigns/${res.id}/schedule`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.MAILERLITE_API_KEY}`,
        },
        body: JSON.stringify({
          delivery: "instant",
        }),
      },
    );
    console.log("MailerLite Campaign Created:", res);

    return NextResponse.json({ success: true, data: res });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}
