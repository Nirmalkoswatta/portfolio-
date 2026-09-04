import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Send, CheckCircle2, AlertCircle, Mail, MapPin, Linkedin, Github, Terminal } from 'lucide-react';
import { emailConfig } from '../../data/social';

const Contact = () => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const result = await emailjs.sendForm(
        emailConfig.serviceId,
        emailConfig.templateId,
        formRef.current,
        emailConfig.publicKey
      );

      if (result.status === 200) {
        setIsSubmitted(true);
        setFormData({ user_name: '', user_email: '', subject: '', message: '' });
        setTimeout(() => setIsSubmitted(false), 6000);
      }
    } catch (err) {
      console.error('EmailJS Error:', err);
      setError('Failed to deploy message payload. Please reach out directly to nirmalkoza@gmail.com.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden bg-slate-100/60 dark:bg-slate-950/60 border-t border-slate-200 dark:border-slate-900">
      <div className="container-custom">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-2 font-mono text-xs text-blue-600 dark:text-blue-400 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span>08 // DEPLOYMENT GATEWAY</span>
          </div>
          <h2 className="heading-lg tracking-tight uppercase text-slate-900 dark:text-white">
            LET&apos;S BUILD SOMETHING <span className="text-blue-600 dark:text-blue-400">RELIABLE.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-1 max-w-xl">
            Have a DevOps, cloud infrastructure, CI/CD automation, or platform engineering challenge? Send a message directly into my inbox.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Coordinates */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 space-y-6 shadow-sm dark:shadow-none">
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">Direct Coordinates</h3>

              <div className="space-y-4 font-mono text-xs">
                <a
                  href="mailto:nirmalkoza@gmail.com"
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                >
                  <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>nirmalkoza@gmail.com</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/nirmal-koswatta/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>linkedin.com/in/nirmal-koswatta</span>
                </a>

                <a
                  href="https://github.com/Nirmalkoswatta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                >
                  <Github className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>github.com/Nirmalkoswatta</span>
                </a>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-950/80 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
                  <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Sri Lanka (Available Globally)</span>
                </div>
              </div>
            </div>

            {/* Quick Status Box */}
            <div className="p-6 rounded-2xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 space-y-2">
              <span className="font-mono text-[10px] text-blue-600 dark:text-blue-400 uppercase tracking-wider block font-bold">
                HIRING STATUS
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
                Open to Associate DevOps Engineer, Junior Cloud Engineer, DevSecOps Engineer, and Infrastructure Automation roles (Remote / Hybrid / On-site).
              </p>
            </div>
          </div>

          {/* Right Column: Deployment Form (EmailJS preserved) */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 font-mono text-xs">
                <span className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                  SEND_PAYLOAD // SMTP_GATEWAY
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">READY</span>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="user_name" className="font-mono text-[11px] text-slate-600 dark:text-slate-400 uppercase">Your Name</label>
                    <input
                      id="user_name"
                      type="text"
                      name="user_name"
                      value={formData.user_name}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g. Linus Torvalds"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-blue-500 font-sans text-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="user_email" className="font-mono text-[11px] text-slate-600 dark:text-slate-400 uppercase">Your Email</label>
                    <input
                      id="user_email"
                      type="email"
                      name="user_email"
                      value={formData.user_email}
                      onChange={handleInputChange}
                      required
                      placeholder="name@company.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-blue-500 font-sans text-xs"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="subject" className="font-mono text-[11px] text-slate-600 dark:text-slate-400 uppercase">Subject / Role</label>
                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="Associate DevOps Role / Project Collaboration"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-blue-500 font-sans text-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="font-mono text-[11px] text-slate-600 dark:text-slate-400 uppercase">Message Payload</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Describe your infrastructure, automation, or role requirements..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-blue-500 font-sans text-xs resize-none"
                  />
                </div>

                {error && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {isSubmitted && (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-xs flex items-center gap-2 font-mono font-semibold">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>MESSAGE DELIVERED ✓ I will respond promptly.</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 text-white font-mono text-xs font-semibold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                >
                  {isSubmitting ? (
                    <span>INITIALIZING CONNECTION...</span>
                  ) : (
                    <>
                      <span>SEND MESSAGE →</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
