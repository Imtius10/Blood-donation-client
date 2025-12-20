import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAxios from '../../Hooks/UseAxios';
import { FaSearch, FaTint, FaMapMarkerAlt, FaEnvelope, FaUserCircle } from 'react-icons/fa';

const SearchRequest = () => {
    const [upazilas, setUpazilas] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [filteredUpazilas, setFilteredUpazilas] = useState([]);
    const [donors, setDonors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);
    const axiosInstance = useAxios();

    const [searchForm, setSearchForm] = useState({
        bloodGroup: "",
        district: "",
        upazila: ""
    });

    const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

    useEffect(() => {
        axios.get("/upozila.json").then((res) => setUpazilas(res.data.upazilas));
        axios.get("/district.json").then((res) => setDistricts(res.data.districts));
    }, []);

    const handleDistrictChange = (e) => {
        const selectedDistrictId = e.target.value;
        const selectedDistrict = districts.find(d => d.id === selectedDistrictId);
        setSearchForm({ ...searchForm, district: selectedDistrict?.name || "", upazila: "" });

        const filtered = upazilas.filter(
            (upazila) => upazila.district_id === selectedDistrictId
        );
        setFilteredUpazilas(filtered);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSearched(true);

        try {
            const params = new URLSearchParams();
            if (searchForm.bloodGroup) params.append('bloodGroup', searchForm.bloodGroup);
            if (searchForm.district) params.append('district', searchForm.district);
            if (searchForm.upazila) {
                const upazilaName = upazilas.find(u => u.id === searchForm.upazila)?.name;
                if (upazilaName) params.append('upazila', upazilaName);
            }

            const response = await axiosInstance.get(`/search-donors?${params.toString()}`);
            setDonors(response.data.donors || []);
        } catch (error) {
            console.error("Error searching donors:", error);
            setDonors([]);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = () => {
        setSearchForm({ bloodGroup: "", district: "", upazila: "" });
        setFilteredUpazilas([]);
        setDonors([]);
        setSearched(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <FaTint className="text-5xl text-red-600 animate-pulse" />
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">
                            Find Blood Donors
                        </h1>
                    </div>
                    <p className="text-gray-600 text-lg">
                        Search for blood donors in your area and save lives
                    </p>
                </div>

                {/* Search Form */}
                <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-red-100">
                    <form onSubmit={handleSearch} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Blood Group */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <FaTint className="inline mr-2 text-red-600" />
                                    Blood Group *
                                </label>
                                <select
                                    value={searchForm.bloodGroup}
                                    onChange={(e) => setSearchForm({ ...searchForm, bloodGroup: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                    required
                                >
                                    <option value="">Select Blood Group</option>
                                    {bloodGroups.map((group) => (
                                        <option key={group} value={group}>{group}</option>
                                    ))}
                                </select>
                            </div>

                            {/* District */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <FaMapMarkerAlt className="inline mr-2 text-red-600" />
                                    District *
                                </label>
                                <select
                                    value={districts.find(d => d.name === searchForm.district)?.id || ""}
                                    onChange={handleDistrictChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                    required
                                >
                                    <option value="">Select District</option>
                                    {districts.map((dist) => (
                                        <option key={dist.id} value={dist.id}>{dist.name}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Upazila */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <FaMapMarkerAlt className="inline mr-2 text-red-600" />
                                    Upazila *
                                </label>
                                <select
                                    value={searchForm.upazila}
                                    onChange={(e) => setSearchForm({ ...searchForm, upazila: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                                    required
                                    disabled={!searchForm.district}
                                >
                                    <option value="">Select Upazila</option>
                                    {filteredUpazilas.map((upz) => (
                                        <option key={upz.id} value={upz.id}>{upz.name}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4 justify-center">
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold rounded-lg hover:from-red-500 hover:to-red-600 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                <FaSearch />
                                {loading ? "Searching..." : "Search Donors"}
                            </button>
                            <button
                                type="button"
                                onClick={handleReset}
                                className="px-8 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-all"
                            >
                                Reset
                            </button>
                        </div>
                    </form>
                </div>

                {/* Results Section */}
                {loading && (
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-red-600 border-t-transparent"></div>
                        <p className="mt-4 text-gray-600 font-medium">Searching for donors...</p>
                    </div>
                )}

                {searched && !loading && donors.length === 0 && (
                    <div className="bg-white rounded-2xl shadow-lg p-12 text-center border border-gray-200">
                        <FaTint className="text-6xl text-gray-300 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-gray-700 mb-2">No Donors Found</h3>
                        <p className="text-gray-500">
                            No donors found matching your search criteria. Try adjusting your filters.
                        </p>
                    </div>
                )}

                {donors.length > 0 && (
                    <div>
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-gray-800">
                                Found {donors.length} Donor{donors.length !== 1 ? 's' : ''}
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {donors.map((donor) => (
                                <div
                                    key={donor._id}
                                    className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-red-200"
                                >
                                    <div className="bg-gradient-to-r from-red-600 to-red-500 p-6 text-white">
                                        <div className="flex items-center gap-4">
                                            {donor.photoURL || donor.mainPhotoUrl ? (
                                                <img
                                                    src={donor.photoURL || donor.mainPhotoUrl}
                                                    alt={donor.name}
                                                    className="w-16 h-16 rounded-full border-4 border-white shadow-lg object-cover"
                                                />
                                            ) : (
                                                <FaUserCircle className="text-6xl text-white" />
                                            )}
                                            <div>
                                                <h3 className="text-xl font-bold">{donor.name}</h3>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="bg-white text-red-600 px-3 py-1 rounded-full text-sm font-bold">
                                                        {donor.bloodGroup}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 space-y-3">
                                        <div className="flex items-start gap-3 text-gray-600">
                                            <FaMapMarkerAlt className="text-red-600 mt-1 flex-shrink-0" />
                                            <div>
                                                <p className="font-medium text-gray-800">{donor.district}</p>
                                                <p className="text-sm">{donor.upazila}</p>
                                            </div>
                                        </div>

                                        {donor.email && (
                                            <div className="flex items-center gap-3 text-gray-600">
                                                <FaEnvelope className="text-red-600 flex-shrink-0" />
                                                <p className="text-sm truncate">{donor.email}</p>
                                            </div>
                                        )}

                                        {donor.status && (
                                            <div className="pt-3 border-t border-gray-100">
                                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${donor.status === 'active'
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-gray-100 text-gray-700'
                                                    }`}>
                                                    {donor.status === 'active' ? '● Available' : 'Not Available'}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchRequest;
