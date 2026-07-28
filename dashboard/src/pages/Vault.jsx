import React, { useEffect, useState } from "react";
import api from "../services/api.js";

export default function Vault() {
  const [formData, setFormData] = useState({
    website: "",
    username: "",
    password: "",
  });

  const [credentials, setCredentials] = useState([]);
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchCredentials();
  }, []);

  const fetchCredentials = async () => {
    try {
      const res = await api.get("/credentials");
      setCredentials(res.data.credentials);
    } catch (err) {
      console.error("Error fetching credentials:", err);
      setError("Could not load your vault. Try refreshing.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await api.post("/credentials", formData);
      setFormData({ website: "", username: "", password: "" });
      fetchCredentials(); // Refresh
    } catch (err) {
      const message = err.response?.data?.message || "Could not save credential";
      setError(message);
    } finally {
      setSubmitting(false);
    }
  };

 const handleDelete = async (id) => {
    try {
      await api.delete(`/credentials/${id}`);
      fetchCredentials();
    } catch (err) {
      console.error("Error deleting credential:", err);
      setError("Could not delete credential");
    }
  };

  const togglePassword = (id) => {
    setVisiblePasswords((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4"> Your Vault</h2>

      {error && (
        <p className="text-red-400 text-sm mb-4 bg-red-500/10 border border-red-500/30 p-2 rounded">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          name="website"
          value={formData.website}
          onChange={handleChange}
          placeholder="Website"
          className="w-full px-4 py-2 rounded border border-gray-400 text-gray-300"
          required
        />
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          className="w-full px-4 py-2 rounded border border-gray-400 text-gray-300"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full px-4 py-2 rounded border border-gray-400 text-gray-300"
          required
        />
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-2 bg-blue-900 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {submitting ? "Saving..." : "Save Credential"}
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-2"> Stored Credentials:</h3>
      <div className="space-y-4">
        {credentials.length === 0 && (
          <p className="text-white/60 text-sm">No credentials saved yet.</p>
        )}

        {credentials.map((cred) => (
          <div
            key={cred.id}
            className="border border-white/20 p-4 rounded bg-white/5 text-white shadow"
          >
            <p className="text-lg font-semibold text-blue-300">
              Website: {cred.website}
            </p>
            <p>
              <strong>Username:</strong> {cred.username}
            </p>
            <p className="flex items-center gap-2">
              <strong>Password:</strong>{" "}
              {visiblePasswords[cred.id] ? cred.password : "••••••••••••••"}
              <button
                onClick={() => togglePassword(cred.id)}
                className="text-sm text-blue-300 hover:underline"
              >
                {visiblePasswords[cred.id] ? "Hide" : "Show"}
              </button>
            </p>
            <button
              onClick={() => handleDelete(cred.id)}
              className="mt-2 text-sm text-red-400 hover:underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
