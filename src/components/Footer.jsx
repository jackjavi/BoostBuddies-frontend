import React from "react";
import { Link } from "react-router-dom";
import {
  Home,
  Package,
  Boxes,
  Wallet,
  User,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ArrowRight,
  CheckCircle,
  Star,
  Shield,
  Clock,
  Users,
  Zap,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative hidden md:block bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 text-white overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gradient-to-br from-purple-400 to-indigo-400 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-10 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-indigo-400 to-blue-400 rounded-full opacity-5 animate-bounce"></div>
        <div className="absolute top-20 right-1/3 w-20 h-20 bg-gradient-to-br from-purple-300 to-pink-300 rounded-full opacity-8 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-lilita text-white">
                  BoostBuddies
                </h2>
                <p className="text-xs text-indigo-200">Boost Your Earnings</p>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed">
              Join thousands earning daily through our proven platform. Build
              your network, view products, and unlock exclusive opportunities.
            </p>

            {/* Trust Indicators */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-300">
                  1000+ Active Members
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-gray-300">
                  Secure & Trusted Platform
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-gray-300">
                  24/7 Support Available
                </span>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <span className="text-sm text-gray-300">4.9/5 Rating</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-lilita text-white">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "Dashboard", href: "/", icon: Home },
                { name: "Packages", href: "/packages", icon: Boxes },
                { name: "Products", href: "/products", icon: Package },
                { name: "Payments", href: "/payments", icon: Wallet },
                { name: "Profile", href: "/profile", icon: User },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors duration-200 group"
                  >
                    <link.icon className="w-4 h-4 group-hover:text-indigo-400 transition-colors" />
                    <span className="group-hover:translate-x-1 transition-transform duration-200">
                      {link.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Legal */}
          <div className="space-y-6">
            <h3 className="text-lg font-lilita text-white">Support & Legal</h3>
            <ul className="space-y-3">
              {[
                { name: "Help Center", href: "/help" },
                { name: "Terms of Service", href: "/terms" },
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Refund Policy", href: "/refunds" },
                { name: "Contact Us", href: "/contact" },
                { name: "FAQ", href: "/faq" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200 hover:translate-x-1 transform inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact Info */}
            <div className="space-y-3 pt-4 border-t border-gray-700">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-indigo-400" />
                <span className="text-sm text-gray-300">
                  o.panaito06@gmail.com
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-300">+254 70 669 8773</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-red-400" />
                <span className="text-sm text-gray-300">Nairobi, Kenya</span>
              </div>
            </div>
          </div>

          {/* Newsletter & Social */}
          <div className="space-y-6">
            <h3 className="text-lg font-lilita text-white">Stay Connected</h3>

            {/* Newsletter Signup */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-sm text-gray-300 mb-3">
                Get updates on new features and earning opportunities
              </p>
              <div className="flex space-x-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
                />
                <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Social Media Links */}
            <div>
              <p className="text-sm text-gray-300 mb-3">
                Follow us on social media
              </p>
              <div className="flex space-x-3">
                {[
                  { icon: Facebook, href: "#", color: "hover:text-blue-400" },
                  { icon: Twitter, href: "#", color: "hover:text-sky-400" },
                  { icon: Instagram, href: "#", color: "hover:text-pink-400" },
                  { icon: Linkedin, href: "#", color: "hover:text-blue-500" },
                  { icon: Youtube, href: "#", color: "hover:text-red-500" },
                ].map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`w-10 h-10 bg-white/10 border border-white/20 rounded-lg flex items-center justify-center text-gray-400 ${social.color} transition-all duration-200 hover:scale-110 hover:bg-white/20`}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Earnings Stats */}
            <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="w-4 h-4 text-green-400" />
                <span className="text-sm font-medium text-white">
                  Community Stats
                </span>
              </div>
              <div className="text-xs text-gray-300 space-y-1">
                <p>💰 Total Earnings: KSH 2.5M+</p>
                <p>👥 Active Members: 1,000+</p>
                <p>📈 Daily Payouts: KSH 50K+</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-6">
              <p className="text-sm text-gray-300">
                © {currentYear} BoostBuddies. All rights reserved.
              </p>
              <div className="hidden md:flex items-center space-x-4 text-xs text-gray-400">
                <span>Made with ❤️ in Kenya</span>
                <span>•</span>
                <span>Powered by Innovation</span>
              </div>
            </div>

            {/* App Badges */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-3 py-2 bg-white/10 rounded-lg border border-white/20">
                <Shield className="w-4 h-4 text-green-400" />
                <span className="text-xs text-gray-300">SSL Secured</span>
              </div>
              <div className="flex items-center space-x-2 px-3 py-2 bg-white/10 rounded-lg border border-white/20">
                <CheckCircle className="w-4 h-4 text-blue-400" />
                <span className="text-xs text-gray-300">Verified Platform</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile App Promotion */}
        <div className="mt-8 bg-gradient-to-r from-indigo-600/30 to-purple-600/30 rounded-2xl p-6 border border-white/20 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <h4 className="text-lg font-lilita text-white mb-2">
                Get the Mobile App Soon!
              </h4>
              <p className="text-sm text-gray-300">
                Stay tuned for our mobile app launch. Earn on the go with
                enhanced features.
              </p>
            </div>
            <div className="flex space-x-4">
              <div className="px-4 py-2 bg-white/20 rounded-lg border border-white/30 text-sm text-gray-300">
                📱 Coming Soon
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Back to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-20 right-6 w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-110 z-40 md:bottom-6"
      >
        <ArrowRight className="w-5 h-5 rotate-[-90deg]" />
      </button>
    </footer>
  );
};

export default Footer;
