"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export default function AddSchool() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: "",
      address: "",
      city: "",
      state: "",
      contact: "",
      email_id: "",
      image: null,
    },
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [submitError, setSubmitError] = useState("");
  const router = useRouter();

  const onSubmit = async (data: any) => {
    console.log("Data is ", data);
    setLoading(true);
    setSuccess("");
    setSubmitError("");

    try {
      const file = data?.image?.[0];
      if (!file) {
        throw new Error("Please select an image to upload.");
      }

      // 1) Upload image
      const formData = new FormData();
      formData.append("image", file, file.name);

      const uploadRes = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        const msg = await uploadRes.text().catch(() => "");
        throw new Error(msg || "Image upload failed.");
      }

      const uploadJson = await uploadRes.json();
      const imagePath =
        uploadJson?.imagePath || uploadJson?.path || uploadJson?.url;

      if (!imagePath) {
        throw new Error("Image path not returned from server.");
      }

      // 2) Submit school with imagePath
      const payload = {
        name: data.name,
        address: data.address,
        city: data.city,
        state: data.state,
        contact: data.contact,
        email_id: data.email_id,
        image: imagePath,
      };

      const schoolRes = await fetch("http://localhost:5000/api/schools", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!schoolRes.ok) {
        const msg = await schoolRes.text().catch(() => "");
        throw new Error(msg || "Failed to save school.");
      }

      setSuccess("School added successfully!");
      reset();
      // router.push("/showSchools");
      setTimeout(() => {
        router.push("/showSchools");
      }, 2000);
    } catch (err: any) {
      setSubmitError(err?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="mx-auto flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-[600px] rounded-lg bg-white text-black p-6 shadow-lg sm:p-8">
          <h1 className="mb-6 text-center text-2xl font-semibold text-gray-900">
            Add School
          </h1>

          {success && (
            <div className="mb-4 rounded-md bg-green-50 p-3 text-green-700">
              {success}
            </div>
          )}

          {submitError && (
            <div className="mb-4 rounded-md bg-red-50 p-3 text-red-700">
              {submitError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            {/* Name */}
            <div className="grid gap-1.5">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                disabled={loading}
                placeholder="Enter school name"
                {...register("name", { required: "Name is required" })}
                className="w-full rounded-md border border-gray-300 p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            {/* Address */}
            <div className="grid gap-1.5">
              <label
                htmlFor="address"
                className="text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                id="address"
                type="text"
                disabled={loading}
                placeholder="Enter address"
                {...register("address", { required: "Address is required" })}
                className="w-full rounded-md border border-gray-300 p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.address && (
                <p className="text-sm text-red-600">{errors.address.message}</p>
              )}
            </div>

            {/* City */}
            <div className="grid gap-1.5">
              <label
                htmlFor="city"
                className="text-sm font-medium text-gray-700"
              >
                City
              </label>
              <input
                id="city"
                type="text"
                disabled={loading}
                placeholder="Enter city"
                {...register("city", { required: "City is required" })}
                className="w-full rounded-md border border-gray-300 p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.city && (
                <p className="text-sm text-red-600">{errors.city.message}</p>
              )}
            </div>

            {/* State */}
            <div className="grid gap-1.5">
              <label
                htmlFor="state"
                className="text-sm font-medium text-gray-700"
              >
                State
              </label>
              <input
                id="state"
                type="text"
                disabled={loading}
                placeholder="Enter state"
                {...register("state", { required: "State is required" })}
                className="w-full rounded-md border border-gray-300 p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.state && (
                <p className="text-sm text-red-600">{errors.state.message}</p>
              )}
            </div>

            {/* Contact */}
            <div className="grid gap-1.5">
              <label
                htmlFor="contact"
                className="text-sm font-medium text-gray-700"
              >
                Contact Number
              </label>
              <input
                id="contact"
                type="tel"
                disabled={loading}
                placeholder="10-digit contact number"
                {...register("contact", {
                  required: "Contact number is required",
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Contact must be a 10-digit number",
                  },
                })}
                className="w-full rounded-md border border-gray-300 p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.contact && (
                <p className="text-sm text-red-600">{errors.contact.message}</p>
              )}
            </div>

            {/* Email */}
            <div className="grid gap-1.5">
              <label
                htmlFor="email_id"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email_id"
                type="email"
                disabled={loading}
                placeholder="name@example.com"
                {...register("email_id", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                })}
                className="w-full rounded-md border border-gray-300 p-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email_id && (
                <p className="text-sm text-red-600">
                  {errors.email_id.message}
                </p>
              )}
            </div>

            {/* Image */}
            <div className="grid gap-1.5">
              <label
                htmlFor="image"
                className="text-sm font-medium text-gray-700"
              >
                Image
              </label>
              <input
                id="image"
                type="file"
                accept="image/*"
                disabled={loading}
                {...register("image", { required: "Image is required" })}
                className="w-full rounded-md border border-gray-300 p-2.5 file:mr-4 file:rounded-md file:border-0 file:bg-gray-100 file:px-3 file:py-2 file:text-sm file:font-medium file:text-gray-700 hover:file:bg-gray-200 focus:outline-none"
              />
              {errors.image && (
                <p className="text-sm text-red-600">{errors.image.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span
                    className="h-4 w-4 animate-spin rounded-full border-2 border-white border-b-transparent"
                    aria-hidden="true"
                  />
                  Uploading...
                </span>
              ) : (
                "Add School"
              )}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
