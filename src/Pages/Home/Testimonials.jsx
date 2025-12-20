import { motion } from "framer-motion";

const Testimonials = () => {
    const data = [
        {
            name: "Rahim Ahmed",
            role: "Donor",
            quote:
                "This platform helped me save a life. The process was simple and fast."
        },
        {
            name: "Dr. Sultana",
            role: "Hospital Coordinator",
            quote:
                "Finding donors during emergencies is now much easier."
        },
        {
            name: "Nusrat Jahan",
            role: "Volunteer",
            quote:
                "The dashboard and donor management system are very well designed."
        }
    ];

    return (
        <section className="py-20 bg-gray-50">
            <h2 className="text-center text-3xl font-bold text-gray-800">
                What People Say ❤️
            </h2>

            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mt-12 px-6">
                {data.map((t, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -8 }}
                        className="bg-white p-6 rounded-2xl shadow-md"
                    >
                        <p className="text-gray-600 italic">“{t.quote}”</p>
                        <div className="mt-4">
                            <h4 className="font-semibold">{t.name}</h4>
                            <p className="text-sm text-gray-500">{t.role}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Testimonials;
