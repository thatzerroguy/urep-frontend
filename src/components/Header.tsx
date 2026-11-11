'use client';

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { usePathname } from "next/navigation";
import { FaFacebook, FaInstagram, FaTelegram } from "react-icons/fa6";
// import { ChevronDown } from "lucide-react";

export function Header() {
  const pathname = usePathname();
  // const [policyOpen, setPolicyOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    // { label: "About", href: "/#about" },
    { label: "FMYD", href: "https://fmyd.gov.ng/", external: true },
    // { label: "Program", href: "/#programs" },
    // { label: "Endorser", href: "/#endorser" },
    { label: "Youth Databank", href: "/databank" },
  ];

  // const policyLinks = [
  //   { label: "Youth Policy", href: "/youth-policy" },
  //   { label: "Privacy Policy", href: "/privacy-policy" },
  // ];

  const checkIsActive = (href: string) => {
    if (!pathname) return false;
    if (href === "/") {
      return pathname === "/";
    }
    if (href.startsWith("/#") || href.startsWith("#") || href.startsWith("http")) {
      return false;
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  // const isPolicyActive = policyLinks.some((p) => checkIsActive(p.href));

  return (
    <header className="w-full">
      {/* Main Navigation Bar */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between px-4 sm:px-10 py-2 bg-white shadow-sm gap-3 border-b-[1px] border-green-500">
        <div className="flex items-center">
          <Link href="/">
            <Image
              className="mr-2 object-contain"
              src="/fmyd_logo1.png"
              alt="Federal Ministry of Youth Development Logo"
              width={180}
              height={180}
              priority
            />
          </Link>
        </div>

        <div className="flex flex-col items-center text-center">
          <h1 className="text-black text-xl sm:text-4xl font-bold tracking-tight">
            Unified Registration Portal
          </h1>
          <p className="text-black text-xs sm:text-sm italic font-medium">
            a unified portal for all youth activities.
          </p>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-4 lg:gap-8 relative">
          {navLinks.map((link) => {
            const isActive = checkIsActive(link.href);
            return (
              <Link
                key={link.label}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className={`relative py-1.5 text-sm sm:text-base transition-colors group ${isActive
                  ? "text-[#277B12] font-semibold"
                  : "text-black hover:text-[#277B12] font-medium"
                  }`}
              >
                <span>{link.label}</span>
                <span
                  className={`absolute -bottom-0.5 left-0 w-full h-[2.5px] bg-[#277B12] rounded-full transition-all duration-200 ${isActive
                    ? "opacity-100 scale-x-100"
                    : "opacity-0 scale-x-0 group-hover:opacity-60 group-hover:scale-x-100"
                    }`}
                />
              </Link>
            );
          })}

          {/* Policy Dropdown (commented out for now) */}
          {/* <div
            className="relative"
            onMouseEnter={() => setPolicyOpen(true)}
            onMouseLeave={() => setPolicyOpen(false)}
          >
            <button
              onClick={() => setPolicyOpen((o) => !o)}
              className={`relative flex items-center gap-1 py-1.5 text-sm sm:text-base transition-colors font-medium ${isPolicyActive
                ? "text-[#277B12] font-semibold"
                : "text-black hover:text-[#277B12]"
                }`}
            >
              Policy
              <ChevronDown
                size={15}
                className={`transition-transform duration-200 ${policyOpen ? "rotate-180" : ""}`}
              />
              <span
                className={`absolute -bottom-0.5 left-0 w-full h-[2.5px] bg-[#277B12] rounded-full transition-all duration-200 ${isPolicyActive ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
                  }`}
              />
            </button>

            {policyOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-44 bg-white rounded-lg shadow-lg border border-gray-100 z-50 overflow-hidden">
                {policyLinks.map((p) => (
                  <Link
                    key={p.label}
                    href={p.href}
                    onClick={() => setPolicyOpen(false)}
                    className={`block px-4 py-2.5 text-sm transition-colors ${checkIsActive(p.href)
                      ? "bg-green-50 text-[#277B12] font-semibold"
                      : "text-gray-700 hover:bg-green-50 hover:text-[#277B12]"
                      }`}
                  >
                    {p.label}
                  </Link>
                ))}
              </div>
            )}
          </div> */}
        </nav>

        {/* Login / Register Button — swaps based on current page */}
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          {/* Social icons above login button */}
          <div className="flex flex-row items-center gap-3">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-[#277B12] hover:opacity-70 transition-opacity"
            >
              <FaFacebook size={16} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-[#277B12] hover:opacity-70 transition-opacity"
            >
              <FaInstagram size={16} />
            </a>
            <a
              href="https://t.me"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="text-[#277B12] hover:opacity-70 transition-opacity"
            >
              <FaTelegram size={16} />
            </a>
          </div>
          <Link
            href={pathname === "/login" ? "/register" : "/login"}
            className="bg-[#277B12] text-white text-sm font-medium px-5 py-2 rounded-lg hover:bg-[#1b5c0d] transition-colors"
          >
            {pathname === "/login" ? "Register" : "Login"}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
