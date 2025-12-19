import React, { useContext, useState } from "react";
import axios from "axios";
import useAxios from "../../Hooks/UseAxios";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const AddProducts = () => {
    const [showOnHome, setShowOnHome] = useState(false);
    const axiosInstance = useAxios();
    const {user}=useContext(AuthContext)
    const handleAddProduct = async (e) => {
        e.preventDefault();
        const form = e.target;
        const imageFile = form.image.files[0];

        // 1️⃣ Upload image to imgbb
        const imgbbForm = new FormData();
        imgbbForm.append("image", imageFile);

        let imageUrl = "";
        try {
            const imgbbRes = await axios.post(
                `https://api.imgbb.com/1/upload?expiration=600&key=98d7450586ecf683fc2036575f95e684`,
                imgbbForm
            );
            imageUrl = imgbbRes.data.data.url; // ✅ get hosted image URL
        } catch (err) {
            console.error("Image upload failed:", err);
            return;
        }

        // 2️⃣ Send product data to your backend
        const productData = {
            productName: form.productName.value,
            description: form.description.value,
            category: form.category.value,
            price: Number(form.price.value),
            availableQuantity: Number(form.availableQuantity.value),
            minOrder: Number(form.minOrder.value),
            demoVideo: form.demoVideo.value,
            paymentOption: form.paymentOption.value,
            showOnHome,
            image: imageUrl, // use the hosted image URL
            managerEmail:user?.email
        };

        try {
            const res = await axiosInstance.post("/products", productData);
            console.log("Product added:", res.data);
            form.reset();
            setShowOnHome(false);
        } catch (err) {
            console.error("Backend upload failed:", err);
        }
    };

    return (
        <div className="flex justify-center my-12">
            <form
                onSubmit={handleAddProduct}
                className="fieldset bg-base-200 border-base-300 rounded-box w-full max-w-3xl border p-6 space-y-4"
            >
                <legend className="fieldset-legend text-xl font-semibold">
                    Add New Product
                </legend>

                <input name="productName" className="input input-bordered w-full" placeholder="Product Name" required />
                <textarea name="description" className="textarea textarea-bordered w-full" placeholder="Description" required />
                <select name="category" className="select select-bordered w-full" required>
                    <option value="">Select category</option>
                    <option value="electronics">Electronics</option>
                    <option value="fashion">Fashion</option>
                    <option value="home_kitchen">Home & Kitchen</option>
                    <option value="books">Books</option>
                </select>
                <div className="grid grid-cols-2 gap-4">
                    <input name="price" type="number" className="input input-bordered" placeholder="Price" required />
                    <input name="availableQuantity" type="number" className="input input-bordered" placeholder="Quantity" required />
                </div>
                <input name="minOrder" type="number" className="input input-bordered w-full" placeholder="Minimum Order" required />
                <input type="file" name="image" className="file-input file-input-bordered w-full" accept="image/*" required />
                <input name="demoVideo" type="url" className="input input-bordered w-full" placeholder="Demo video (optional)" />
                <select name="paymentOption" className="select select-bordered w-full" required>
                    <option value="">Payment option</option>
                    <option value="cod">Cash on Delivery</option>
                    <option value="pay_first">Pay First</option>
                </select>
                <div className="flex items-center gap-3">
                    <input type="checkbox" checked={showOnHome} onChange={(e) => setShowOnHome(e.target.checked)} className="checkbox checkbox-primary" />
                    <span>Show on Home Page</span>
                </div>
                <button type="submit" className="btn btn-neutral w-full">Add Product</button>
            </form>
        </div>
    );
};

export default AddProducts;
