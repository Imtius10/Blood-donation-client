import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/UseAxiosSecure";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const AdminDonationList = () => {
  const axiosSecure = useAxiosSecure();

  const [donations, setDonations] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const size = 10;
  const [loading, setLoading] = useState(true);

  const totalPages = Math.ceil(total / size);

  useEffect(() => {
    fetchDonations();
  }, [page]);

  const fetchDonations = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get(
        `/admin/donations?page=${page}&size=${size}`
      );
      setDonations(res.data.donations);
      setTotal(res.data.total);
    } catch (err) {
      console.error("Failed to fetch donations", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-red-600 mb-4">
        Donation History ({total})
      </h2>

      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3 text-left">Transaction ID</th>
              <th className="px-4 py-3 text-left">Donor Email</th>
              <th className="px-4 py-3 text-left">Amount</th>
              <th className="px-4 py-3 text-left">Currency</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Paid Date</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i}>
                  <td colSpan="6" className="px-4 py-3">
                    <Skeleton height={30} />
                  </td>
                </tr>
              ))
            ) : donations.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No donations found
                </td>
              </tr>
            ) : (
              donations.map((d) => (
                <tr key={d._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-xs">
                    {d.transactionId}
                  </td>
                  <td className="px-4 py-3">
                    {d.donarEmail || (
                      <span className="text-gray-400 italic">Anonymous</span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-bold text-green-600">
                    ${d.amount}
                  </td>
                  <td className="px-4 py-3 uppercase">{d.currency}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        d.payment_status === "paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {d.payment_status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {new Date(d.paidDate).toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 border rounded disabled:opacity-40"
        >
          Prev
        </button>

        {[...Array(totalPages).keys()].map((n) => (
          <button
            key={n}
            onClick={() => setPage(n + 1)}
            className={`px-4 py-2 rounded ${
              page === n + 1
                ? "bg-red-600 text-white"
                : "border hover:bg-gray-100"
            }`}
          >
            {n + 1}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 border rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminDonationList;
