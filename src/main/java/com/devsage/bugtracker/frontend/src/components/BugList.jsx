import React, { useEffect, useState } from "react";
import axios from "axios";

function BugList() {
  const [bugs, setBugs] = useState([]);

  useEffect(() => {
    axios.get("/bugs").then((res) => {
      setBugs(res.data);
    });
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "CRITICAL":
        return "bg-red-600";
      case "HIGH":
        return "bg-orange-500";
      case "MEDIUM":
        return "bg-yellow-400";
      case "LOW":
        return "bg-green-400";
      default:
        return "bg-gray-300";
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`/bugs/${id}/status`, { status: newStatus });
      const updated = bugs.map((bug) =>
        bug.id === id ? { ...bug, status: newStatus } : bug
      );
      setBugs(updated);
    } catch (error) {
      console.error("Failed to update status", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Reported Bugs</h2>
      {bugs.length === 0 ? (
        <p className="text-gray-600">No bugs reported yet.</p>
      ) : (
        <ul className="space-y-4">
          {bugs.map((bug) => (
            <li
              key={bug.id}
              className="p-4 bg-gray-50 border rounded flex flex-col gap-2"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg text-gray-800">
                  {bug.title}
                </h3>
                <span
                  className={`text-white text-sm px-3 py-1 rounded ${getSeverityColor(
                    bug.severity
                  )}`}
                >
                  {bug.severity || "UNKNOWN"}
                </span>
              </div>
              <p className="text-gray-700 text-sm">{bug.description}</p>
              <p className="text-sm text-gray-500">Status: {bug.status}</p>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => updateStatus(bug.id, "IN_PROGRESS")}
                  className="text-xs bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Start Progress
                </button>
                <button
                  onClick={() => updateStatus(bug.id, "RESOLVED")}
                  className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                >
                  Resolve
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BugList;