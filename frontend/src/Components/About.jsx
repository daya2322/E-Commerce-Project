import React from "react";
import * as framerMotion from "framer-motion";
const { motion } = framerMotion;


const features = [
  {
    title: "Wide Product Selection",
    desc: "From electronics to fashion, explore thousands of curated items at the best prices.",
    icon: "🛒",
  },
  {
    title: "Fast & Reliable Delivery",
    desc: "We ensure quick and safe delivery to your doorstep, every single time.",
    icon: "🚚",
  },
  {
    title: "24/7 Customer Support",
    desc: "Got a question? Our team is available anytime to help you out.",
    icon: "📞",
  },
];

const About = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-20 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-bold mb-4"
        >
          About Shoppers
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-xl max-w-2xl mx-auto"
        >
          Your go-to destination for quality, affordability, and unmatched online shopping experience.
        </motion.p>
      </div>

      {/* Info Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Who We Are</h2>
          <p className="text-gray-600 text-lg text-center max-w-3xl mx-auto">
            At <span className="font-semibold text-gray-800">Shoppers</span>, we believe shopping should be seamless,
            fun, and accessible. We started with a dream to bring you a diverse collection of top-quality products backed
            by great service and transparency.
          </p>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-lg rounded-2xl p-6 text-center hover:shadow-xl transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-gray-100 py-16 px-4">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-600 text-lg">
            To create a shopping platform that not only meets your needs but exceeds your expectations. With Shoppers,
            experience modern retail powered by technology, efficiency, and human touch.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
