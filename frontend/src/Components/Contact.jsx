import React, { useState } from "react";
import * as framerMotion from "framer-motion";
import axios from "axios";
const { motion } = framerMotion;

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const apiurl = process.env.REACT_APP_API_URL;


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await axios(`${apiurl}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus("✅ Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus(data.error || "Something went wrong.");
      }
    } catch (err) {
      setStatus("❌ Server error.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-8 md:p-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-indigo-700 mb-6 text-center">
          Get in Touch 💬
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm text-gray-700 font-semibold mb-2">
              Your Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none transition"
              placeholder="John Doe"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 font-semibold mb-2">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none transition"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 font-semibold mb-2">
              Your Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="5"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-400 outline-none transition resize-none"
              placeholder="Write your message here..."
              required
            ></textarea>
          </div>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl transition shadow-lg"
          >
            Send Message 🚀
          </motion.button>

          {status && (
            <p className="text-center text-sm text-gray-700 mt-4">{status}</p>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default Contact;
