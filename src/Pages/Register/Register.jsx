import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import toast, { Toaster } from "react-hot-toast";
import { FaEye, FaEyeSlash, FaUserCircle, FaTint } from "react-icons/fa";
import axios from "axios";
import { updateProfile } from "firebase/auth";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import auth from "../../Firebase/Firebase.config";

const Register = () => {
  const { createUser, setUser } = useContext(AuthContext);
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
    photo: "",
    bloodGroup: "",
    role: "donor",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("./upozila.json").then((res) => setUpazilas(res.data.upazilas));
    axios
      .get("./district.json")
      .then((res) => setDistricts(res.data.districts));
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Check password match
    if (formData.password !== formData.rePassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=98d7450586ecf683fc2036575f95e684`,
        { image: formData.photo },
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const photoURL = imgRes.data.data.display_url;

      const userCredential = await createUser(
        formData.email,
        formData.password
      );

      await updateProfile(auth.currentUser, {
        displayName: formData.name,
        photoURL,
      });

      await axios.post("https://blood-donation-server-coral.vercel.app/users", {
        name: formData.name,
        email: formData.email,
        photoURL,
        bloodGroup: formData.bloodGroup,
        district,
        upazila,
      });

      setUser(userCredential.user);
      toast.success("Welcome Blood Hero! 🩸");
      navigate("/"); // Redirect to home
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-white px-4 mt-18">
      <Toaster position="top-right" />

      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
        {/* Header */}
        <div className="text-center mb-6">
          <FaTint className="mx-auto text-4xl text-red-600 mb-2" />
          <h1 className="text-3xl font-bold text-red-600">
            Blood Donor Registration
          </h1>
          <p className="text-gray-500 text-sm">
            Save lives by becoming a donor
          </p>
        </div>

        {error && (
          <p className="mb-4 text-red-500 text-center text-sm">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3 cursor-pointer text-gray-500"
            >
              {showPassword ? <FaEye color="red" /> : <FaEyeSlash />}
            </span>
          </div>

          {/* Retype Password */}
          <div className="relative">
            <input
              type={showRePassword ? "text" : "password"}
              name="rePassword"
              placeholder="Retype Password"
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
            <span
              onClick={() => setShowRePassword(!showRePassword)}
              className="absolute right-4 top-3 cursor-pointer text-gray-500"
            >
              {showRePassword ? <FaEye color="red" /> : <FaEyeSlash />}
            </span>
          </div>

          {/* Blood Group */}
          <select
            name="bloodGroup"
            onChange={handleChange}
            className="select select-bordered w-full"
            required
          >
            <option value="" disabled>
              Select Blood Group
            </option>
            {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>

          {/* Location */}
          <select
            className="select select-bordered w-full"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            required
          >
            <option value="" disabled>
              Select District
            </option>
            {districts.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>

          <select
            className="select select-bordered w-full"
            value={upazila}
            onChange={(e) => setUpazila(e.target.value)}
            required
          >
            <option value="" disabled>
              Select Upazila
            </option>
            {upazilas.map((u) => (
              <option key={u.id} value={u.name}>
                {u.name}
              </option>
            ))}
          </select>

          {/* Photo */}
          <div className="flex items-center gap-3">
            <FaUserCircle className="text-4xl text-gray-400" />
            <input
              type="file"
              name="photo"
              accept="image/*"
              onChange={handleChange}
              className="file-input file-input-bordered w-full"
              required
            />
          </div>

          {/* Submit */}
          <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition">
            Register as Donor
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          Already a donor?{" "}
          <Link to="/login" className="text-red-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
