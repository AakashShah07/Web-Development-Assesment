"use client";

import useSWR from "swr";
import axios from "axios";
import Link from "next/link"


const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function ShowSchools() {
  const { data, error, isLoading } = useSWR(
    "http://localhost:5000/api/schools",
    fetcher
  );

  // Accept arrays or wrapped objects like { schools: [...] } or { data: [...] }
  const list = Array.isArray(data) ? data : data?.schools || data?.data || [];

  return (
    <main className="min-h-[60vh] bg-background">
      <section className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="mb-8 text-center text-3xl font-bold text-foreground text-balance">
          Schools
        </h1>

        {isLoading && (
          <div className="text-center text-muted-foreground">
            Loading schools...
          </div>
        )}

        {error && (
          <div className="text-center text-red-600">
            Failed to load schools.
          </div>
        )}

        {!isLoading && !error && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((school, idx) => {
              const imagePath = school?.imagePath || school?.image || "";
              const normalizedPath =
                typeof imagePath === "string"
                  ? imagePath.startsWith("/")
                    ? imagePath
                    : `/${imagePath}`
                  : "";
              const imageUrl = normalizedPath
                ? `http://localhost:5000${normalizedPath}`
                : "/school-image.png";

              return (
                <article
                  key={`school-${idx}`}
                  className="group overflow-hidden rounded-lg bg-white shadow transition-transform duration-200 hover:scale-105 hover:shadow-md"
                >
                  <div className="w-full h-48 bg-gray-100">
                    <img
                      src={imageUrl || "/placeholder.svg"}
                      alt={`Image of ${school?.name ?? "school"}`}
                      className="h-48 w-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="mb-1 line-clamp-1 text-lg font-semibold text-foreground">
                      {school?.name || "Unnamed School"}
                    </h2>
                    <p className="line-clamp-1 text-sm text-gray-600">
                      {school?.address || "No address provided"}
                    </p>
                    <p className="line-clamp-1 text-sm text-gray-600">
                      {school?.city || "Unknown city"}
                    </p>
                  </div>
                </article>
              );
            })}
            {Array.isArray(list) && list.length === 0 && (
              <div className="col-span-full flex justify-center">
                <p className="animate-bounce text-lg font-medium text-blue-600">
                  🎓 No schools found — add the first one!
                </p>
              </div>
            )}
          </div>
        )}
      </section>
      <Link
        href="/addSchools"
        aria-label="Add school"
        className="fixed bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition-transform hover:scale-105 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <span className="sr-only">Add school</span>
        <span className="text-2xl leading-none">+</span>
      </Link>
    </main>
  );
}
