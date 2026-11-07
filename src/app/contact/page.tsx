"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { showToast } from "@/components/ui/Toast";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ShieldCheck } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("Property Title Due Diligence & Search");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setSubmitted(true);
    showToast("Message Dispatched!", "Segalex client desk will reply within 4 hours.");
  };

  return (
    <div className="min-h-screen flex flex-col bg-canvas text-darktext">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-12 space-y-12">
        {/* Header */}
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold text-[#008751] uppercase tracking-wider">
            Direct Client Advisory
          </span>
          <h1 className="text-3xl sm:text-5xl font-black font-display text-ink uppercase tracking-tight">
            Contact Segalex Property Hub
          </h1>
          <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
            Reach our advisory team directly regarding title due diligence, verified agent onboarding,
            or bespoke property search services across Lagos State.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details Card */}
          <div className="lg:col-span-5 bg-[#151314] text-white rounded-2xl p-6 sm:p-8 border border-stone-800 shadow-card space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-bold text-[#FFC800] uppercase tracking-wider">
                Corporate Headquarters
              </span>
              <h3 className="text-xl font-bold text-white font-display uppercase">
                Segalex Resources Global Limited
              </h3>
              <p className="text-stone-400 text-xs font-mono">RC 7351342</p>
            </div>

            <div className="space-y-4 text-xs text-stone-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#008751] flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Corporate Office</span>
                  <span className="text-stone-400 italic">[Office address to be confirmed]</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#008751] flex-shrink-0" />
                <div>
                  <span className="font-bold text-white block">Official Phone</span>
                  <span className="text-stone-400 italic">[Official phone line to be confirmed]</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#008751] flex-shrink-0" />
                <div>
                  <span className="font-bold text-white block">Official Inquiries</span>
                  <span className="text-stone-400 italic">[Official email to be confirmed]</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#008751] flex-shrink-0" />
                <div>
                  <span className="font-bold text-white block">Operating Hours</span>
                  <span>Monday – Friday: 8:00 AM – 6:00 PM WAT</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-[11px] text-stone-300 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#008751] flex-shrink-0" />
              <span>
                Meetings with Managing Director Mr Segun available by executive appointment.
              </span>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#008751] mx-auto" />
                <h3 className="font-bold text-lg text-stone-900">Message Received</h3>
                <p className="text-xs text-stone-600 max-w-sm mx-auto">
                  Thank you, {name}. A senior property consultant will review your inquiry and follow
                  up within 4 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <h3 className="font-bold text-base text-stone-900 mb-2">Send an Advisory Request</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Babatunde Lawal"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#FAFAF7] border border-stone-200 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-[#008751]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#FAFAF7] border border-stone-200 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-[#008751]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                      Phone Number (WhatsApp preferred)
                    </label>
                    <input
                      type="tel"
                      placeholder="+234 800 000 0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#FAFAF7] border border-stone-200 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-[#008751]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                      Inquiry Focus
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-[#FAFAF7] border border-stone-200 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-[#008751]"
                    >
                      <option value="Property Title Due Diligence & Search">
                        Property Title Due Diligence & Search
                      </option>
                      <option value="LASRERA Agent Accreditation Onboarding">
                        LASRERA Agent Accreditation Onboarding
                      </option>
                      <option value="Commercial Land & Industrial Corridors (Ibeju/Epe)">
                        Commercial Land & Industrial Corridors (Ibeju/Epe)
                      </option>
                      <option value="General Inquiries">General Inquiries</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                    Your Message / Requirements
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe the property type, budget, or preferred Lagos corridor..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-[#FAFAF7] border border-stone-200 rounded-lg p-2.5 text-stone-900 focus:outline-none focus:border-[#008751] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#008751] hover:bg-[#00563A] text-white font-bold rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Advisory Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

