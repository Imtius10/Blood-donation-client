import { PhoneCall } from "lucide-react";
import { motion } from "framer-motion";

const EmergencyCTA = () => {
    return (
        <section className="bg-red-600 py-16">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="max-w-6xl mx-auto px-6 text-center text-white"
            >
                <h2 className="text-3xl font-bold">
                    Emergency Blood Needed?
                </h2>
                <p className="mt-3 text-red-100">
                    Contact us immediately. We respond fast.
                </p>

                <div className="flex justify-center mt-6">
                    <a
                        href="tel:+8801XXXXXXXXX"
                        className="flex items-center gap-3 bg-white text-red-600 px-6 py-3 rounded-lg font-semibold shadow-lg hover:scale-105 transition"
                    >
                        <PhoneCall />
                        Call Now
                    </a>
                </div>
            </motion.div>
        </section>
    );
};

export default EmergencyCTA;
