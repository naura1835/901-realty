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
    const featuredImage = body?.fields?.featuredImage?.url || "";
    const entryUrl = `${process.env.SITE_URL}/smart-housing/${slug}`;
    const logo = `${process.env.LOGO_URL}/6pg8lZdUUlStkfYKa1mEHe/f5c7dbf09c064805872b773bed9e3705/Frame_63.png`;

    // Optional: verify signature
    const signature = request.headers.get("x-webhook-signature");
    if (signature !== process.env.CONTENTFUL_WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Log or process the published entry
    console.log("SmartHomeInnovation published:", body);

    // TODO: trigger revalidation if needed:
    // await fetch(`${process.env.REVALIDATE_URL}/api/revalidate?tag=smartHome`);

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
              content: `
              <!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>New Product Launch</title>
                
                <style type="text/css">
                *{
                  margin:0;
                  padding:0;
                  box-sizing:border-box;
                }
                body{
                  font-family:Arial, sans-serif;
                  background-color:#f5f5f5;
                  padding:20px;
                }
                .container{
                  max-width:600px;
                  margin:0 auto;
                  background-color:#ffffff;
                  box-shadow:0 2px 10px rgba(0,0,0,0.1);
                }
                .header{
                  padding:40px 20px;
                  text-align:center;
                  background-color:#ffffff;
                }
                .header img{
                  width: 300px;
                  object-fit: cover;
                }
                .content{
                  padding:40px 30px;
                }
                .product-card{
                  overflow:hidden;
                  margin-bottom:30px;
                }
                .product-image{
                  width:100%;
                  height:300px;
                  background:linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                  display:flex;
                  align-items:center;
                  justify-content:center;
                  color:white;
                  font-size:18px;
                }
                .product-details{
                  padding:25px;
                }
                .product-name{
                  font-size:24px;
                  font-weight:bold;
                  color:#333;
                  margin-bottom:10px;
                }
                .availability{
                  display:inline-block;
                  padding:6px 12px;
                  border-radius:20px;
                  font-size:12px;
                  font-weight:bold;
                  margin-bottom:15px;
                  background-color:white;
                  text-transform:capitalize;
                  border:1px solid #252422;
                  color:#252422;
                  border-color:#252422;
                }
                .product-description{
                  color:#666;
                  line-height:1.6;
                  font-size:14px;
                }
                .cta-button{
                  display:inline-block;
                  background-color:#252422;
                  color:white;
                  padding:12px 30px;
                  text-decoration:none;
                  border-radius:5px;
                  margin-top:20px;
                  font-weight:bold;
                  transition:background-color 0.3s;
                }
                .cta-button:hover{
                  background-color:oklab(20% 0.00037 0.00392);
                }
                .footer{
                  background-color:#F4F3EE;
                  padding:30px 20px;
                  text-align:center;
                }
                .social-links{
                  margin-bottom:20px;
                }
                .social-links a{
                  display:inline-block;
                  margin:0 10px;
                }
                .social-links img{
                  width:32px;
                  height:32px;
                }
                .contact-info{
                  color:#666;
                  font-size:14px;
                  line-height:1.8;
                }
                .contact-info a{
                  color:#667eea;
                  text-decoration:none;
                }
                .contact-info p{
                  margin:5px 0;
                }
                .divider{
                  height:1px;
                  background-color:#ddd;
                  margin:20px 0;
                }
              @media only screen and (max-width: 480px){
                table#canspamBar td{
                  font-size:14px !important;
                }

            }	@media only screen and (max-width: 480px){
                table#canspamBar td a{
                  display:block !important;
                  margin-top:10px !important;
                }

            }
          </style>
        </head>
      <body>
        <div class="container">
            <!-- Header -->
            <div class="header">
            <img src="${logo}" alt="901 realty logo" />
            </div>
            
            <!-- Content -->
            <div class="content">
                <div class="product-card">
                    <div class="product-image">
                        <img src="${featuredImage}" alt="${title}" />
                    </div>
                    <div class="product-details">
                        <span class="availability">${availability}</span>
                        <h2 class="product-name">${title}</h2>
                        <p class="product-description">
                            ${description}</p>
                        <a href="${entryUrl}" class="cta-button">View Product</a>
                    </div>
                </div>
            </div>
        
            <!-- Footer -->
            <div class="footer">    
                <div class="contact-info">
                  <p><strong>Instagram:</strong> <a href="https://www.instagram.com/901.realty/">@901realty</a></p>
                    <p><strong>Website:</strong> <a href="https://www.901realty.ng">www.901realty.ng</a></p>
                    <div class="divider"></div>
                    <p><strong>Email:</strong> <a href="mailto:901concepts@gmail.com">901concepts@gmail.com</a></p>
                    <p><strong>Phone:</strong> <a href="tel:08033486662">(+234) 803 348 6662</a></p>
                    <p><strong>Address:</strong> Suite 09 Kaltume House, Maiduguri Road, Kano, Nigeria</p>
                </div>
                
                <div class="divider"></div>
                <p style="font-size: 12px; color: #999; margin-top: 15px;">
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
      `https://connect.mailerlite.com/api/campaigns/${res.id}/actions/send`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.MAILERLITE_API_KEY}`,
        },
      },
    );
    console.log("MailerLite Campaign Created:", res);

    return NextResponse.json({ success: true, data: res });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}
