import { motion } from "framer-motion";
import { useNavigate } from "react-router";
import {
    HeartPulse,
    Users,
    Search,
    Phone,
    Mail,
    Droplet
} from "lucide-react";
import ImpactStats from "./ImpactStats";
import Testimonials from "./Testimonials";
import BloodAvailability from "./BloodAvailability";
import EmergencyCTA from "./EmergencyCTA";
import AdminDonationRequests from "../../Dashboard/Admin/AdminDonationRequests";

import AdminDonationRequestsPage from "../../Dashboard/Admin/AdminDonationRequestsPage";
import AdminDonationRequestsPreview from "../../Dashboard/Admin/AdminDonationRequestsPreview";

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-white">
            {/* ================= HERO / BANNER ================= */}
            <section className="bg-gradient-to-br from-red-600 to-red-500 text-white">
                <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-10 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
                            Donate Blood, <br />
                            <span className="text-red-100">Save Lives ❤️</span>
                        </h1>

                        <p className="mt-5 text-lg text-red-100">
                            Join our blood donation community and help people
                            in need. One donation can save up to three lives.
                        </p>

                        <div className="flex gap-4 mt-8">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate("/register")}
                                className="px-6 py-3 bg-white text-red-600 font-semibold rounded-lg shadow-lg"
                            >
                                Join as a Donor
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => navigate("/search-request")}
                                className="px-6 py-3 border border-white font-semibold rounded-lg"
                            >
                                Search Donors
                            </motion.button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                        className="flex justify-center"
                    >
                        <HeartPulse size={220} className="text-red-100 opacity-90" />
                    </motion.div>
                </div>
            </section>

            {/* ================= FEATURED SECTION ================= */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold text-center text-gray-800"
                    >
                        Why Donate With Us?
                    </motion.h2>

                    <div className="grid md:grid-cols-3 gap-8 mt-14">
                        {[
                            {
                                icon: <Droplet size={40} />,
                                title: "Safe & Verified",
                                desc: "All donors and requests are verified for safety and authenticity."
                            },
                            {
                                icon: <Users size={40} />,
                                title: "Community Driven",
                                desc: "A growing network of donors, volunteers, and admins."
                            },
                            {
                                icon: <Search size={40} />,
                                title: "Quick Search",
                                desc: "Find nearby donors instantly based on blood group and location."
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                whileHover={{ y: -8 }}
                                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition"
                            >
                                <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-5">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800">
                                    {item.title}
                                </h3>
                                <p className="text-gray-600 mt-2">
                                    {item.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ================= CONTACT SECTION ================= */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-bold text-gray-800">
                            Contact Us 📞
                        </h2>
                        <p className="text-gray-600 mt-4">
                            Have questions or need urgent help? Reach out to us anytime.
                        </p>

                        <div className="mt-6 space-y-4">
                            <div className="flex items-center gap-3 text-gray-700">
                                <Phone className="text-red-600" />
                                <span>+880 1XXXXXXXXX</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-700">
                                <Mail className="text-red-600" />
                                <span>support@blooddonation.com</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.form
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="bg-gray-50 p-8 rounded-2xl shadow-md"
                    >
                        <h3 className="text-xl font-semibold mb-4 text-gray-800">
                            Send a Message
                        </h3>

                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="w-full border px-4 py-2 rounded-lg"
                            />
                            <input
                                type="email"
                                placeholder="Your Email"
                                className="w-full border px-4 py-2 rounded-lg"
                            />
                            <textarea
                                rows="4"
                                placeholder="Your Message"
                                className="w-full border px-4 py-2 rounded-lg"
                            ></textarea>

                            <button
                                type="submit"
                                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
                            >
                                Send Message
                            </button>
                        </div>
                    </motion.form>
                </div>
            </section>
            <ImpactStats></ImpactStats>
            <Testimonials></Testimonials>
            <section className="py-20 bg-gradient-to-b from-white to-red-50">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">

                    {/* Blood Availability Card */}
                    <div className="bg-white rounded-3xl shadow-xl p-10">
                        <BloodAvailability />
                    </div>

                    {/* Emergency CTA Card */}
                    <div className="rounded-3xl shadow-xl overflow-hidden">
                        <EmergencyCTA />
                    </div>

                </div>
            </section>
            <div className="my-5 mx-16">
                <AdminDonationRequestsPreview></AdminDonationRequestsPreview>
            </div>
           </div>
    );
};

export default Home;
