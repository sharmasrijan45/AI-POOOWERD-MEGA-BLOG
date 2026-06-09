import React from 'react'
import {Link} from 'react-router-dom'
import Logo from '../Logo'

export default function Footer() {
  return (
    <footer className="border-t border-purple-500/30 bg-slate-950 text-slate-200 shadow-inner shadow-purple-950/30">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1fr]">
          <div className="space-y-5">
            <div className="inline-flex items-center">
              <Logo width="110px" />
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-400">
              MegaBlogPost helps creators share ideas with a polished publishing experience and built-in blog management tools.
            </p>
            <p className="text-sm text-slate-500">© 2026 MegaBlogPost. All rights reserved.</p>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">
              Company
            </h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>
                <Link className="transition hover:text-white" to="/">
                  Features
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-white" to="/">
                  Pricing
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-white" to="/">
                  Careers
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-white" to="/">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">
              Support
            </h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>
                <Link className="transition hover:text-white" to="/">
                  Help Center
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-white" to="/">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-white" to="/">
                  Privacy
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-white" to="/">
                  Security
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">
              Legal
            </h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>
                <Link className="transition hover:text-white" to="/">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-white" to="/">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="transition hover:text-white" to="/">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
