import React, { useState } from "react";
import axios from "axios";

function BugForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [useAI, setUseAI] = useState(true);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      let severity = null;

      if (useAI) {
        const aiRes = await axios.post("/ai/predict-severity", {
          description,
        });
        severity = aiRes.data.predictedSeverity;
      }

      await axios.post("/bugs", {
        title,
        description,
        assignedTo: { id: parseInt(assignedTo) },
        severity: severity ? severity : null,
      });

      setMessage("✅ Bug reported successfully!");
      setTitle("");
      setDescription("");
      setAssignedTo("");
    } catch (err) {
      setMessage("❌ Failed to submit bug.");
    }

    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Report a Bug</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Bug Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Bug Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
        <input
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Assigned To (User ID)"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          required
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={useAI}
            onChange={() => setUseAI(!useAI)}
          />
          <span>Use AI to auto-predict severity</span>
        </label>
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          {loading ? "Submitting..." : "Submit Bug"}
        </button>
        {message && <p className="text-sm text-gray-700">{message}</p>}
      </form>
    </div>
  );
}

export default BugForm;