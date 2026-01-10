'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Contact = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('user');
    if (!user) {
      router.push('/login');
      return;
    }
    setLoading(false);
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
        const res = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (res.ok) {
            setSubmitSuccess(true);
            // Reset form after 3 seconds
            setTimeout(() => {
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: ''
                });
                setSubmitSuccess(false);
            }, 3000);
        } else {
            console.error("Failed to send message");
            alert("Failed to send message. Please try again.");
        }
    } catch (error) {
        console.error("Error sending message:", error);
        alert("An error occurred. Please try again.");
    } finally {
        setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-black">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <br />
      <main className="bg-[#f5f5f5] rounded-3xl max-w-6xl xl:max-w-7xl 2xl:max-w-screen-2xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 py-4 sm:py-6 md:py-8">
        <div className="bg-white rounded-2xl p-3 sm:p-4">
          
          {/* Breadcrumb Navigation */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-black hover:underline font-medium">
                Home
              </Link>
              <span className="text-black">/</span>
              <span className="text-black font-semibold">Contact Us</span>
            </div>
          </div>

          {/* GET IN TOUCH Banner */}
          <div className="bg-[#f5f5f5] rounded-2xl p-6 sm:p-8 md:p-10 mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black mb-3">
              GET IN TOUCH WITH US TODAY!
            </h2>
            <p className="text-base sm:text-lg text-black">
              Have questions? We're here to help! Fill out the form below and our team will get back to you within 24 hours. ✨
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Left Side - Contact Form */}
            <div className="lg:col-span-2">
              
              {/* Call Action Boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {/* Call Me Right Now */}
                <div className="bg-[#f5f5f5] text-black rounded-xl p-4 hover:bg-black hover:text-white transition-all duration-300 cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-black group-hover:bg-white rounded-full flex items-center justify-center shrink-0 transition-all duration-300">
                      <svg className="w-6 h-6 text-white group-hover:text-black transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm sm:text-base">Call Me Right Now</h4>
                      <p className="text-xs sm:text-sm opacity-80">Instant connection</p>
                    </div>
                  </div>
                </div>

                {/* Call Me On This Time */}
                <div className="bg-[#f5f5f5] text-black rounded-xl p-4 hover:bg-black hover:text-white transition-all duration-300 cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-black group-hover:bg-white rounded-full flex items-center justify-center shrink-0 transition-all duration-300">
                      <svg className="w-6 h-6 text-white group-hover:text-black transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-sm sm:text-base">Call Me On This Time</h4>
                      <p className="text-xs sm:text-sm opacity-80">Schedule a call</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form with #f5f5f5 background */}
              <div className="bg-[#f5f5f5] rounded-2xl shadow-lg p-6 sm:p-8">
                <h3 className="text-2xl font-bold text-black mb-6">Send us a Message</h3>
                
                {/* Success Message */}
                {submitSuccess && (
                  <div className="mb-6 p-4 bg-black text-white rounded-lg shadow-md animate-slideDown">
                    <div className="flex items-center gap-3">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="font-semibold">Message sent successfully! We'll get back to you soon.</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name and Email Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-semibold text-black mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none transition-all duration-300 text-black placeholder-gray-500"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-black mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none transition-all duration-300 text-black placeholder-gray-500"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  {/* Phone and Subject Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-black mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none transition-all duration-300 text-black placeholder-gray-500"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-black mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none transition-all duration-300 text-black placeholder-gray-500"
                        placeholder="How can we help?"
                      />
                    </div>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-black mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="w-full px-4 py-3 bg-white rounded-lg focus:outline-none transition-all duration-300 text-black placeholder-gray-500 resize-none"
                      placeholder="Tell us more about your inquiry..."
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-8 py-4 bg-black text-white font-bold text-lg rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                    >
                      <span className="flex items-center justify-center gap-3">
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                            Send Message
                          </>
                        )}
                      </span>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Side - Contact Information */}
            <div className="lg:col-span-1">
              <div className="bg-[#f5f5f5] rounded-2xl shadow-lg p-6 sticky top-4">
                <h3 className="text-xl font-bold text-black mb-6">Contact Information</h3>
                
                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-black mb-1">Email Us</h4>
                      <p className="text-sm text-black">contact@glamora.com</p>
                      <p className="text-sm text-black">support@glamora.com</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-black mb-1">Call Us</h4>
                      <p className="text-sm text-black">+1 (555) 123-4567</p>
                      <p className="text-sm text-black">Mon-Fri: 9AM - 6PM</p>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-black mb-1">Visit Us</h4>
                      <p className="text-sm text-black">123 Fashion Avenue</p>
                      <p className="text-sm text-black">New York, NY 10001</p>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-black mb-1">Working Hours</h4>
                      <p className="text-sm text-black">Monday - Friday</p>
                      <p className="text-sm text-black">9:00 AM - 6:00 PM EST</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Contact;
