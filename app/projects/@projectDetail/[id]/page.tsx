import { dummyProjects } from "@/data/dummy";
import { notFound } from "next/navigation";

export default async function ProjectDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: projectId } = await params;

  const project = dummyProjects.find((p) => p.id === projectId);

  if (!project) {
    return notFound();
  }

  return (
    <div className="p-6 h-full overflow-auto">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Project Name
            </label>
            <p className="text-lg text-gray-800 mt-1">
              {project.projectName || "—"}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Client Name
            </label>
            <p className="text-lg text-gray-800 mt-1">
              {project.clientName || "—"}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Status
            </label>
            <p className="text-lg text-gray-800 mt-1">
              {project.status || "—"}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Start Date
            </label>
            <p className="text-lg text-gray-800 mt-1">
              {project.startDate || "—"}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              End Date
            </label>
            <p className="text-lg text-gray-800 mt-1">
              {project.endDate || "—"}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Project ID
            </label>
            <p className="text-lg text-gray-800 mt-1">{project.id || "—"}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Remarks
            </label>
            <p className="text-lg text-gray-800 mt-1">
              {project.remarks || "—"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
