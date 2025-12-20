import { motion } from "framer-motion";
import { Users, Droplet, HeartHandshake } from "lucide-react";

const ImpactStats = () => {
    const stats = [
        { icon: <Users />, value: "12,500+", label: "Registered Donors" },
        { icon: <Droplet />, value: "8,200+", label: "Successful Donations" },
        { icon: <HeartHandshake />, value: "5,100+", label: "Lives Saved" },
    ];

    return (
        <div className="relative -mt-16 z-10">
            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 px-6">
                {stats.map((item, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ y: -6 }}
                        className="bg-white rounded-2xl shadow-xl p-6 text-center"
                    >
                        <div className="w-14 h-14 mx-auto bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                            {item.icon}
                        </div>
                        <h3 className="text-2xl font-bold">{item.value}</h3>
                        <p className="text-gray-600">{item.label}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ImpactStats;
