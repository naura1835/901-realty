import Link from "next/link";

const menuItems = [
  { id: 0, title: "About us", url: "/about-us" },
  { id: 1, title: "Works", url: "/works" },
  { id: 2, title: "Smart housing", url: "/smart-housinf" },
  { id: 3, title: "Get in touch", style: "link-btn", url: "/contact-us" },
];

const Footer = () => {
  return (
    <footer className="flex flex-col bg-[#F4F3EE] px-5 pt-[100px] pb-10 lg:px-14">
      <div className="flex flex-col justify-between gap-5 md:flex-row">
        <p className="text-4xl font-semibold uppercase md:w-[12ch]">
          Let&apos;s build together
        </p>
        <ul className="flex list-none flex-col gap-3 md:flex-row md:items-center md:gap-5">
          {menuItems.map((item) => (
            <li key={item.id} className="text-sm font-medium uppercase">
              <Link
                href={item.url}
                className={`inline-block text-xs font-semibold uppercase ${
                  item.style === "link-btn"
                    ? "bg-foreground rounded-md px-4 py-3 text-white"
                    : ""
                }`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="@container">
        <ul className="flex list-none flex-col items-center gap-3 pt-14 sm:justify-center md:gap-8 @sm:flex-row">
          <li className="text-center text-xs font-semibold uppercase">
            instagram
          </li>
          <li className="text-center text-xs font-semibold uppercase">
            privacy policy
          </li>
          <li className="text-center text-xs font-semibold uppercase">
            © 2025 901REALTY
          </li>
          <li className="text-center text-xs font-semibold uppercase">
            MADE BY NAURACODES
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
