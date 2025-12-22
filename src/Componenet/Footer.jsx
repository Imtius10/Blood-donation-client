import {
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    PhoneCall,
    Mail,
    MapPin,
    HeartPulse,
} from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-slate-300">
            {/* Top Section */}
            <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                {/* Brand */}
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
                            <HeartPulse className="text-white" />
                        </div>
                        <h2 className="text-xl font-bold text-white">
                            BloodCare
                        </h2>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">
                        BloodCare is a trusted blood donation platform connecting
                        donors, volunteers, and patients to save lives efficiently.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/" className="hover:text-red-400 transition">Home</a></li>
                        <li><a href="/register" className="hover:text-red-400 transition">Join as Donor</a></li>
                        <li><a href="/search" className="hover:text-red-400 transition">Search Donors</a></li>
                        <li><a href="/dashboard" className="hover:text-red-400 transition">Dashboard</a></li>
                    </ul>
                </div>

                {/* Support */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Support</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/faq" className="hover:text-red-400 transition">FAQs</a></li>
                        <li><a href="/privacy-policy" className="hover:text-red-400 transition">Privacy Policy</a></li>
                        <li><a href="/terms" className="hover:text-red-400 transition">Terms & Conditions</a></li>
                        <li><a href="/contact" className="hover:text-red-400 transition">Contact Us</a></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-white font-semibold mb-4">Emergency Contact</h3>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-center gap-2">
                            <PhoneCall size={16} />
                            +880 1234 567890
                        </li>
                        <li className="flex items-center gap-2">
                            <Mail size={16} />
                            support@bloodcare.org
                        </li>
                        <li className="flex items-center gap-2">
                            <MapPin size={16} />
                            Dhaka, Bangladesh
                        </li>
                    </ul>

                    {/* Social */}
                    <div className="flex gap-4 mt-6">
                        <a className="hover:text-red-500 transition" href="https://www.facebook.com/bloodcare" target="_blank" rel="noopener noreferrer"><Facebook /></a>
                        <a className="hover:text-red-500 transition" href="https://twitter.com/bloodcare" target="_blank" rel="noopener noreferrer"><Twitter /></a>
                        <a className="hover:text-red-500 transition" href="https://www.instagram.com/bloodcare" target="_blank" rel="noopener noreferrer"><Instagram /></a>
                        <a className="hover:text-red-500 transition" href="https://www.linkedin.com/company/bloodcare" target="_blank" rel="noopener noreferrer"><Linkedin /></a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-800 py-6 text-center text-sm text-slate-500">
                © {new Date().getFullYear()} BloodCare. All rights reserved.
                <span className="text-red-500 ml-1">Saving lives together ❤️</span>
            </div>
        </footer>
    );
};

export default Footer;
