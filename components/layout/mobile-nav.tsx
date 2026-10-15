"use client";

import Link from "next/link";
import { useState } from "react";

import { buttonClasses } from "@/components/ui/button";
import type { NavItem, NavLink } from "@/lib/navigation";

export function MobileNav({ links, cta }: { links: NavItem[]; cta: NavLink }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
        className="flex size-11 items-center justify-center rounded-full text-white hover:bg-white/10"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
          {open ? (
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          )}
        </svg>
      </button>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Main"
          className="absolute inset-x-0 top-full border-t border-white/10 bg-navy/95 px-4 pt-2 pb-6 backdrop-blur-md sm:px-6"
        >
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.label}>
                {link.children ? (
                  <>
                    <span className="block py-3 text-base font-medium text-white/60">{link.label}</span>
                    <ul className="mb-2 border-l border-white/15 pl-4">
                      {link.children.map((child) => (
                        <li key={child.href}>
                          <Link href={child.href} onClick={close} className="block py-2 text-sm font-medium text-white/90 hover:text-gold">
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link href={link.href} onClick={close} className="block py-3 text-base font-medium text-white/90 hover:text-gold">
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <Link href={cta.href} onClick={close} className={buttonClasses({ size: "md" }) + " mt-4 w-full"}>
            {cta.label}
          </Link>
        </nav>
      )}
    </div>
  );
}
