"use client";

import { dummyProjects, ProjectStatus } from "@/data/dummy";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ITEMS_PER_PAGE = 10;

export default function ProjectsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const totalPages = Math.ceil(dummyProjects.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProjects = dummyProjects.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const getStatusStyle = (status: ProjectStatus) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "On Hold":
        return "bg-yellow-100 text-yellow-700";
      case "Completed":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Projects</h2>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 font-medium text-gray-600">
                Project Name
              </th>
              <th className="px-6 py-3 font-medium text-gray-600">
                Client Name
              </th>
              <th className="px-6 py-3 font-medium text-gray-600">Status</th>
              <th className="px-6 py-3 font-medium text-gray-600">
                Start Date
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {currentProjects.map((project) => (
              <tr
                key={project.projectName}
                onClick={() => router.push(`/projects/${project.id}`)}
                className="hover:bg-gray-50 transition cursor-pointer"
              >
                <td className="px-6 py-4 font-medium text-gray-800">
                  {project.projectName}
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {project.clientName ?? "—"}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                      project.status,
                    )}`}
                  >
                    {project.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-gray-600">
                  {project.startDate ?? "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-800 text-white hover:bg-gray-700"
          }`}
        >
          Previous
        </button>

        <span className="text-sm text-gray-600">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-gray-800 text-white hover:bg-gray-700"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}
