"use client";

import { dummyProjects, ProjectStatus } from "@/data/dummy";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ITEMS_PER_PAGE = 10;

export default function ProjectsTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<ProjectStatus[]>([]);
  const router = useRouter();

  // Filter projects based on search and status
  const filteredProjects = dummyProjects.filter((project) => {
    const matchesSearch =
      project.projectName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.clientName?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      selectedStatuses.length === 0 ||
      (project.status && selectedStatuses.includes(project.status));

    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentProjects = filteredProjects.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  );

  const statusOptions: ProjectStatus[] = [
    ProjectStatus.active,
    ProjectStatus.onHold,
    ProjectStatus.completed,
  ];

  const handleStatusToggle = (status: ProjectStatus) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status],
    );
    setCurrentPage(1);
  };

  const getStatusStyle = (status: ProjectStatus) => {
    switch (status) {
      case ProjectStatus.active:
        return "bg-green-100 text-green-700";
      case ProjectStatus.onHold:
        return "bg-yellow-100 text-yellow-700";
      case ProjectStatus.completed:
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Projects</h2>

      {/* Filters Section */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
        {/* Search Bar */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search
          </label>
          <input
            type="text"
            placeholder="Search by project name or client name..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          />
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Status Filter
          </label>
          <div className="flex gap-4 flex-wrap">
            {statusOptions.map((status) => (
              <label key={status} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedStatuses.includes(status)}
                  onChange={() => handleStatusToggle(status)}
                  className="w-4 h-4 text-blue-600 rounded cursor-pointer"
                />
                <span className="text-sm text-gray-700">{status}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center py-12 bg-white shadow rounded-lg">
          <p className="text-gray-500 text-lg">No projects found</p>
        </div>
      ) : (
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
                <th className="px-6 py-3 font-medium text-gray-600">
                  End Date
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {currentProjects.map((project) => (
                <tr
                  key={project.id}
                  onClick={() => router.push(`/projects/${project.id}`)}
                  className="hover:bg-gray-50 transition cursor-pointer"
                >
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {project.projectName || "—"}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {project.clientName || "—"}
                  </td>

                  <td className="px-6 py-4">
                    {project.status ? (
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                          project.status,
                        )}`}
                      >
                        {project.status}
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {project.startDate || "—"}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {project.endDate || "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {currentProjects.length > 0 && (
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
      )}
    </div>
  );
}
