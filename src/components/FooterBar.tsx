import Image from "next/image";
import Link from "next/link";
import {
    MapPin,
    Mail,
    Phone,
    Clock,
    ChevronRight,
} from "lucide-react";
import {
    FaFacebookF,
    FaInstagram,
    FaTelegram,
    FaXTwitter,
} from "react-icons/fa6";

export function FooterBar() {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { label: "Home", href: "/" },
        { label: "About UREP", href: "/urep" },
        { label: "Youth Databank", href: "/databank" },
        { label: "Programmes", href: "/#programs" },
        { label: "Register / Apply", href: "/register" },
    ];

    const initiatives = [
        { label: "Bakepreneur Nigeria", href: "/register?program=bakeprenuer" },
        { label: "South-West Entrepreneurship", href: "/register?program=entrepreneurship" },
        { label: "African Youth Initiative", href: "/register?program=african_youth" },
        { label: "National Youth Policy", href: "/terms" },
    ];

    const socialLinks = [
        {
            name: "Facebook",
            href: "https://facebook.com",
            icon: FaFacebookF,
        },
        {
            name: "Instagram",
            href: "https://instagram.com",
            icon: FaInstagram,
        },
        {
            name: "X (Twitter)",
            href: "https://twitter.com",
            icon: FaXTwitter,
        },
        {
            name: "Telegram",
            href: "https://t.me",
            icon: FaTelegram,
        },
    ];

    return (
        <footer className="w-full bg-[#1b5c0d] text-white selection:bg-white/20 selection:text-white border-t border-[#2e8218]">
            {/* Full-width container matching header padding */}
            <div className="w-full px-4 sm:px-10 pt-14 pb-10">
                <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">

                    {/* Brand & Ministry Info */}
                    <div className="lg:col-span-4 flex flex-col space-y-5">
                        <div className="flex items-center gap-3">
                            <div className="relative w-14 h-14 bg-white rounded-xl p-1.5 shadow-md flex items-center justify-center shrink-0">
                                <Image
                                    src="/fmyd_logo1.png"
                                    alt="Federal Ministry of Youth Development Logo"
                                    width={48}
                                    height={48}
                                    className="object-contain"
                                />
                            </div>
                            <div>
                                <span className="text-2xl font-black tracking-tight text-white block">
                                    UREP
                                </span>
                                <span className="text-xs font-medium text-emerald-100/90 leading-tight block">
                                    Youth Real-Time Engagement Platform
                                </span>
                            </div>
                        </div>

                        <p className="text-sm text-emerald-100/80 leading-relaxed max-w-md">
                            An initiative of the Federal Ministry of Youth Development under
                            the Renewed Hope Agenda, empowering Nigerian youths through
                            capacity building, enterprise clusters, and direct engagement.
                        </p>

                        {/* Social Icons */}
                        <div className="pt-2">
                            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-200 mb-3">
                                Connect With Us
                            </p>
                            <div className="flex items-center gap-2.5">
                                {socialLinks.map((social) => {
                                    const Icon = social.icon;
                                    return (
                                        <a
                                            key={social.name}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={social.name}
                                            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white hover:text-[#1b5c0d] text-white flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-105"
                                        >
                                            <Icon className="w-4 h-4" />
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="lg:col-span-2 sm:col-span-1">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-200 mb-4 pb-1 border-b border-white/10 inline-block">
                            Quick Links
                        </h3>
                        <ul className="space-y-2.5">
                            {quickLinks.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-emerald-100/85 hover:text-white flex items-center gap-1.5 transition-colors duration-150 group"
                                    >
                                        <ChevronRight className="w-3.5 h-3.5 text-emerald-300 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                                        <span>{item.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Key Programmes */}
                    <div className="lg:col-span-3 sm:col-span-1">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-200 mb-4 pb-1 border-b border-white/10 inline-block">
                            Key Programmes
                        </h3>
                        <ul className="space-y-2.5">
                            {initiatives.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        className="text-sm text-emerald-100/85 hover:text-white flex items-center gap-1.5 transition-colors duration-150 group"
                                    >
                                        <ChevronRight className="w-3.5 h-3.5 text-emerald-300 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                                        <span>{item.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Details */}
                    <div className="lg:col-span-3">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-200 mb-4 pb-1 border-b border-white/10 inline-block">
                            Contact & Secretariat
                        </h3>
                        <div className="space-y-3.5 text-sm text-emerald-100/85">
                            <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" />
                                <p className="leading-snug text-xs sm:text-sm">
                                    Bullet Building, Shehu Shagari Way, Central Business District,
                                    Abuja, 900103, FCT, Nigeria.
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-emerald-300 shrink-0" />
                                <a
                                    href="mailto:info@fmyd.gov.ng"
                                    className="hover:text-white hover:underline transition-colors text-xs sm:text-sm"
                                >
                                    info@fmyd.gov.ng
                                </a>
                            </div>

                            <div className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-emerald-300 shrink-0" />
                                <a
                                    href="tel:+234800900900"
                                    className="hover:text-white hover:underline transition-colors text-xs sm:text-sm"
                                >
                                    +234 800 900 900
                                </a>
                            </div>

                            <div className="flex items-center gap-3">
                                <Clock className="w-4 h-4 text-emerald-300 shrink-0" />
                                <span className="text-xs sm:text-sm text-emerald-200/80">
                                    Mon – Fri: 8:00 AM – 4:00 PM
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Sub-footer */}
                <div className="w-full mt-12 pt-8 border-t border-white/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-200/80">
                    <p className="text-center sm:text-left">
                        © {currentYear} Federal Ministry of Youth Development (FMYD). All rights reserved.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-6">
                        <Link href="/terms" className="hover:text-white hover:underline transition-colors">
                            Terms of Service
                        </Link>
                        <Link href="/terms" className="hover:text-white hover:underline transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/consent" className="hover:text-white hover:underline transition-colors">
                            Youth Consent
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default FooterBar;
