import React, { useContext, useEffect, useState } from "react";
import useAxios from "../../Hooks/UseAxios";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const ManageDashboard = () => {
    const [products, setProducts] = useState([]);
    const axiosInstance = useAxios();
    const { user } = useContext(AuthContext);

    useEffect(() => {
        if (!user?.email) return;

        axiosInstance
            .get(`/manager/products/${user?.email}`)
            .then((res) => setProducts(res.data))
            .catch((err) => console.log(err));
    }, [axiosInstance, user?.email]);

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <th>Image / Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center">
                                    No products found
                                </td>
                            </tr>
                        ) : (
                            products.map((product, index) => (
                                <tr key={product._id || index}>
                                    <th>
                                        <label>
                                            <input type="checkbox" className="checkbox" />
                                        </label>
                                    </th>

                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img src={product.image} alt={product.productName} />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{product.productName}</div>
                                                <div className="text-sm opacity-50">{product.category}</div>
                                            </div>
                                        </div>
                                    </td>

                                    <td>{product.category}</td>
                                    <td>৳ {product.price}</td>

                                    <th>
                                        <button className="btn btn-ghost btn-xs">Details</button>
                                    </th>
                                </tr>
                            ))
                        )}
                    </tbody>

                    <tfoot>
                        <tr>
                            <th></th>
                            <th>Name / Image</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
};

export default ManageDashboard;
