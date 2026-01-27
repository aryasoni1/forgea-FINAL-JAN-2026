"use client";

import React from "react";

import {
  CheckCircle2,
  Code2,
  GitBranch,
  Lock,
  Zap,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({ email: "", company: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* M6: Global Navigation */}
      <header className="sticky top-0 z-50 bg-black border-b border-white/5 backdrop-blur-sm">
        <nav className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-500 flex items-center justify-center text-black text-xs font-bold">
              F
            </div>
            <span className="text-sm font-bold tracking-tight">FORGEA</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a
              href="/lessons"
              className="text-xs text-gray-400 hover:text-white transition"
            >
              [Labs]
            </a>
            <a
              href="/proof"
              className="text-xs text-gray-400 hover:text-white transition"
            >
              [Proof Index]
            </a>
            <a
              href="/workspace"
              className="text-xs text-gray-400 hover:text-white transition"
            >
              [Pricing]
            </a>
            <a
              href="/admin"
              className="text-xs text-gray-400 hover:text-white transition"
            >
              [Recruiter Access]
            </a>
          </div>
          <Button
            asChild
            size="sm"
            className="bg-white text-black hover:bg-gray-100 rounded-full text-xs font-bold h-8 px-4"
          >
            <a href="/lessons">Start Learning</a>
          </Button>
        </nav>
      </header>

      {/* M1: The "Signal" Hero */}
      <section className="relative min-h-[80vh] flex items-center border-b border-white/5">
        <div className="max-w-7xl mx-auto w-full px-4 md:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6 inline-block px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-none">
                <span className="text-emerald-500 text-xs font-mono font-bold">
                  {"> verification_signal"}
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 tracking-tight">
                Proof of Skill, Not Just a Profile.
              </h1>
              <p className="text-base text-gray-400 mb-8 leading-relaxed max-w-md">
                Stop relying on credentials. Forgea proves what developers can
                actually do through real-world challenge verification and
                immutable GitHub-native artifacts.
              </p>
              <div className="flex gap-4">
                <Button
                  asChild
                  className="bg-emerald-500 text-black hover:bg-emerald-600 rounded-none font-bold"
                >
                  <a href="/proof">Verify Proof</a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="border-white/10 text-white hover:bg-white/5 rounded-none font-bold bg-transparent"
                >
                  <a href="/workspace">Launch Simulator</a>
                </Button>
              </div>
            </div>

            {/* Terminal-style verification window */}
            <div className="border border-white/10 bg-black/50 p-6 font-mono text-sm">
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-white/10">
                <span className="text-xs text-gray-500">forgea-verify.log</span>
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-gray-600">
                  {"$ forgea verify --engineer sarah_chen"}
                </div>

                <div className="text-gray-500 text-xs">
                  <div>Analyzing repository patterns...</div>
                  <div>Running architectural tests...</div>
                  <div>Verifying failure scenarios...</div>
                </div>

                <div className="pt-3 space-y-2 border-t border-white/5">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-500">✓</span>
                    <span className="text-gray-300">
                      React Race Condition Fixed{" "}
                      <span className="text-gray-600 text-xs ml-2">
                        feat/concurrent-rendering#847
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-500">✓</span>
                    <span className="text-gray-300">
                      Database Scaling Architecture{" "}
                      <span className="text-gray-600 text-xs ml-2">
                        infra/postgres-optimization#523
                      </span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-500">✓</span>
                    <span className="text-gray-300">
                      Authentication Flow Hardening{" "}
                      <span className="text-gray-600 text-xs ml-2">
                        security/oauth-refresh-tokens#912
                      </span>
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 text-xs text-emerald-500">
                  {"[VERIFIED] Senior Signal: Confirmed"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* M2: Value Proposition - 3 Column */}
      <section className="border-b border-white/5 py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
            Zero-Bloat Verification System
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Real-world failure simulation */}
            <div className="border border-white/10 p-8 bg-black/50 hover:border-white/20 transition">
              <div className="mb-6 flex items-center justify-center w-10 h-10 bg-emerald-500/20 border border-emerald-500/50">
                <Zap className="w-5 h-5 text-emerald-500" />
              </div>
              <h3 className="text-lg font-bold mb-4">
                Real-world Failure Simulation
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Engineers solve actual architectural problems, not toy puzzles.
                System failures, race conditions, and scaling challenges test
                true competency.
              </p>
            </div>

            {/* GitHub-native workflow */}
            <div className="border border-white/10 p-8 bg-black/50 hover:border-white/20 transition">
              <div className="mb-6 flex items-center justify-center w-10 h-10 bg-emerald-500/20 border border-emerald-500/50">
                <GitBranch className="w-5 h-5 text-emerald-500" />
              </div>
              <h3 className="text-lg font-bold mb-4">GitHub-native Workflow</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                No external platforms. Engineers push solutions to GitHub.
                Commits become permanent verification records tied to their
                accounts.
              </p>
            </div>

            {/* Immutable verification artifacts */}
            <div className="border border-white/10 p-8 bg-black/50 hover:border-white/20 transition">
              <div className="mb-6 flex items-center justify-center w-10 h-10 bg-emerald-500/20 border border-emerald-500/50">
                <Lock className="w-5 h-5 text-emerald-500" />
              </div>
              <h3 className="text-lg font-bold mb-4">
                Immutable Verification Artifacts
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Cryptographically signed verification proofs. Proof is portable,
                shareable, and impossible to forge. Trust on first sight.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* M4: Comparison Table */}
      <section className="border-b border-white/5 py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-16 text-center">
            Forgea vs. The Rest
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-6 font-bold text-white">
                    Feature
                  </th>
                  <th className="text-left py-4 px-6 font-bold text-gray-500">
                    LeetCode
                  </th>
                  <th className="text-left py-4 px-6 font-bold text-gray-500">
                    Udemy
                  </th>
                  <th className="text-left py-4 px-6 font-bold text-emerald-500">
                    Forgea
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-white/5 hover:bg-white/2 transition">
                  <td className="py-4 px-6 font-mono text-xs">
                    GitHub Push Sync
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600">✗</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600">✗</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-emerald-500">✓</span>
                  </td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/2 transition">
                  <td className="py-4 px-6 font-mono text-xs">
                    Architectural Failure Detection
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600">✗</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600">✗</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-emerald-500">✓</span>
                  </td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/2 transition">
                  <td className="py-4 px-6 font-mono text-xs">
                    Verifiable Proof on First Sight
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600">✗</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600">✗</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-emerald-500">✓</span>
                  </td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/2 transition">
                  <td className="py-4 px-6 font-mono text-xs">
                    Real Code Solutions Required
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600">✗</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600">✗</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-emerald-500">✓</span>
                  </td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/2 transition">
                  <td className="py-4 px-6 font-mono text-xs">
                    Lifetime Verification Validity
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600">✗</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-gray-600">✗</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-emerald-500">✓</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* M3: Pricing - Mission Control Dashboard Vibes */}
      <section id="pricing" className="border-b border-white/5 py-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Mission Control Pricing
          </h2>
          <p className="text-center text-gray-400 mb-16 text-sm">
            Scaled for operators, seniors, and architects
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Free Tier */}
            <div className="border border-white/10 p-8 bg-black/50 flex flex-col">
              <div className="mb-6 pb-6 border-b border-white/10">
                <h3 className="text-sm font-mono font-bold text-emerald-500 mb-2">
                  {"> OPERATOR / FREE"}
                </h3>
                <div className="text-3xl font-bold">$0</div>
                <p className="text-xs text-gray-500 mt-2">
                  Entry level verification
                </p>
              </div>

              <ul className="space-y-3 flex-1 mb-8 text-sm text-gray-300">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>1 verification challenge per month</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>GitHub integration</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>Public verification badge</span>
                </li>
              </ul>

              <Button
                variant="outline"
                className="border-white/10 text-white hover:bg-white/5 rounded-none font-bold w-full bg-transparent"
              >
                Get Started
              </Button>
            </div>

            {/* Pro Tier - Highlighted */}
            <div className="border border-emerald-500/50 p-8 bg-emerald-500/5 flex flex-col ring-1 ring-emerald-500/10 md:scale-105">
              <div className="mb-6 pb-6 border-b border-emerald-500/30">
                <h3 className="text-sm font-mono font-bold text-emerald-500 mb-2">
                  {"> SENIOR / PRO"}
                </h3>
                <div className="text-3xl font-bold">$29</div>
                <p className="text-xs text-gray-400 mt-2">
                  For serious builders
                </p>
              </div>

              <ul className="space-y-3 flex-1 mb-8 text-sm text-gray-300">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>Unlimited monthly challenges</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>Advanced architectural tests</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>Verified portfolio</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>Private verifications</span>
                </li>
              </ul>

              <Button className="bg-emerald-500 text-black hover:bg-emerald-600 rounded-none font-bold w-full">
                Start Pro
              </Button>
            </div>

            {/* Enterprise Tier */}
            <div className="border border-white/10 p-8 bg-black/50 flex flex-col">
              <div className="mb-6 pb-6 border-b border-white/10">
                <h3 className="text-sm font-mono font-bold text-emerald-500 mb-2">
                  {"> ARCHITECT / ENTERPRISE"}
                </h3>
                <div className="text-3xl font-bold">Custom</div>
                <p className="text-xs text-gray-500 mt-2">For organizations</p>
              </div>

              <ul className="space-y-3 flex-1 mb-8 text-sm text-gray-300">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>Custom challenge library</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>SSO & team management</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>Hiring dashboard</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span>Dedicated support</span>
                </li>
              </ul>

              <Button
                variant="outline"
                className="border-white/10 text-white hover:bg-white/5 rounded-none font-bold w-full bg-transparent"
              >
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* M5: Recruiter / Enterprise Section */}
      <section id="recruiter" className="border-b border-white/5 py-20">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Trust & Integrity for Hiring Managers
          </h2>
          <p className="text-center text-gray-400 mb-12 text-sm max-w-2xl mx-auto">
            Stop guessing about technical abilities. Forgea gives you verifiable
            proof of what candidates can actually build.
          </p>

          <div className="border border-white/10 p-10 bg-black/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-lg font-bold mb-6 flex items-center gap-3">
                  <Code2 className="w-5 h-5 text-emerald-500" />
                  Why Forgea
                </h3>
                <ul className="space-y-4 text-sm text-gray-400">
                  <li className="flex gap-3">
                    <span className="text-emerald-500 shrink-0">→</span>
                    <span>Real architectural problems verified</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-emerald-500 shrink-0">→</span>
                    <span>Immutable GitHub-backed credentials</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-emerald-500 shrink-0">→</span>
                    <span>Instant verification signals</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-emerald-500 shrink-0">→</span>
                    <span>One-click candidate assessment</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-6 flex items-center gap-3">
                  <BarChart3 className="w-5 h-5 text-emerald-500" />
                  The Impact
                </h3>
                <ul className="space-y-4 text-sm text-gray-400">
                  <li className="flex gap-3">
                    <span className="text-emerald-500 shrink-0">→</span>
                    <span>Hiring cycle cut by 60%</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-emerald-500 shrink-0">→</span>
                    <span>Bad hires virtually eliminated</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-emerald-500 shrink-0">→</span>
                    <span>Confidence in every hire</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-emerald-500 shrink-0">→</span>
                    <span>Data-driven hiring</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Request Access Form */}
            <div className="border-t border-white/10 pt-8">
              <h3 className="text-lg font-bold mb-6">Request Access</h3>

              {submitted ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 text-center">
                  <p className="text-emerald-500 font-mono text-sm">
                    {"> request_received"} ✓
                  </p>
                  <p className="text-gray-400 text-xs mt-2">
                    We'll be in touch within 24 hours to set up your account.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="email"
                      placeholder="work_email@company.com"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="bg-black border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/50"
                    />
                    <input
                      type="text"
                      placeholder="company_domain.com"
                      required
                      value={formData.company}
                      onChange={(e) =>
                        setFormData({ ...formData, company: e.target.value })
                      }
                      className="bg-black border border-white/10 px-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-emerald-500/50"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-emerald-500 text-black hover:bg-emerald-600 rounded-none font-bold"
                  >
                    Request Access
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 bg-emerald-500 flex items-center justify-center text-black text-xs font-bold">
                  F
                </div>
                <span className="text-xs font-bold tracking-tight">FORGEA</span>
              </div>
              <p className="text-xs text-gray-600">
                Proof of Skill, Not Just a Profile.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold mb-4 text-white">Product</h4>
              <ul className="space-y-2 text-xs text-gray-500 hover:text-gray-400">
                <li>
                  <a href="/lessons" className="hover:text-white transition">
                    Labs
                  </a>
                </li>
                <li>
                  <a href="/proof" className="hover:text-white transition">
                    Verify Proof
                  </a>
                </li>
                <li>
                  <a href="/workspace" className="hover:text-white transition">
                    Launch Simulator
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold mb-4 text-white">Company</h4>
              <ul className="space-y-2 text-xs text-gray-500 hover:text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Status
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold mb-4 text-white">Legal</h4>
              <ul className="space-y-2 text-xs text-gray-500 hover:text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex items-center justify-between">
            <p className="text-xs text-gray-600">
              © 2024 Forgea. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="text-gray-600 hover:text-emerald-500 transition text-xs"
              >
                GitHub
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-emerald-500 transition text-xs"
              >
                X
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-emerald-500 transition text-xs"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
