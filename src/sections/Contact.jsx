import React, { useState } from 'react';
import Particles from '../components/Particles';
import { socials } from '../constants';
import emailjs from '@emailjs/browser';
import toast from 'react-hot-toast';


const initialForm = { name: '', email: '', message: '' };

const SERVICE_ID = 'service_702bcx6'; // Replace with your EmailJS service ID
const TEMPLATE_ID = 'template_k329dcr'; // Replace with your EmailJS template ID
const PUBLIC_KEY = '5HwqPlRnvKKHzb8Q_'; // Replace with your EmailJS public key

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error('All fields are required');
      return false;
    }
    // Simple email regex
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      toast.error('Please enter a valid email address.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    // Send email using EmailJS
    emailjs.send(SERVICE_ID, TEMPLATE_ID, {
      from_name: form.name,
      from_email: form.email,
      message: form.message,
    }, PUBLIC_KEY)
      .then(() => {
        setLoading(false);
        toast.success('Message sent successfully');
        setForm(initialForm);
      })
      .catch((error) => {
        setLoading(false);
        toast.error('Failed to send message. Please try again later');
      });
  };

  return (
    <section className="relative c-space section-spacing min-h-screen flex items-center justify-center" id="contact">
      <div className="absolute inset-0 -z-10">
        <Particles particleCount={120} particleSpread={8} speed={0.08} alphaParticles className="h-full w-full" />
      </div>
      <div className="w-full max-w-2xl mx-auto bg-gradient-to-br from-storm/80 to-indigo/80 rounded-2xl shadow-lg p-6 md:p-10 flex flex-col gap-8">
        <h2 className="text-heading text-center">Contact Me</h2>
        <p className="text-center subtext mb-2">Let's connect! Fill out the form or reach out via email/socials below.</p>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit} autoComplete="off">
          <div>
            <label className="field-label" htmlFor="name">Name</label>
            <input
              className="field-input field-input-focus"
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your Name"
              autoComplete="off"
            />
          </div>
          <div>
            <label className="field-label" htmlFor="email">Email</label>
            <input
              className="field-input field-input-focus"
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@email.com"
              autoComplete="off"
            />
          </div>
          <div>
            <label className="field-label" htmlFor="message">Message</label>
            <textarea
              className="field-input field-input-focus min-h-[100px] resize-y"
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Type your message..."
            />
          </div>
          <button
  type="submit"
  className="w-full py-3 px-6 bg-primary text-white font-medium rounded-lg transition-colors cursor-pointer hover:bg-primary/80 disabled:opacity-60 disabled:cursor-not-allowed"
  disabled={loading}
>
  {loading ? (
    <span className="flex items-center justify-center">
      <svg 
        className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Sending...
    </span>
  ) : (
    'Send Message'
  )}
</button>
        </form>
        <div className="flex flex-col items-center gap-4 mt-1 ">
          <div className="flex gap-8 mt-1 text-center">
            {socials.map((social) => (
              social.href && (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform"
                  title={social.name}
                >
                  <img src={social.icon} alt={social.name} className="w-8 h-8" />
                </a>
              )
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
