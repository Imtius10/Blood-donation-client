const BloodAvailability = () => {
    const groups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

    return (
        <section className="py-14 bg-white">
            <h2 className="text-center text-2xl font-bold text-gray-800">
                Blood Groups We Support
            </h2>

            <div className="flex flex-wrap justify-center gap-4 mt-8">
                {groups.map((group) => (
                    <div
                        key={group}
                        className="w-20 h-20 bg-red-50 text-red-600 rounded-full
                        flex items-center justify-center font-bold text-lg
                        shadow hover:scale-105 transition"
                    >
                        {group}
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BloodAvailability;
