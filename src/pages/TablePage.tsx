import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { BASE_URL } from "../services/Api";
import xlsx from "json-as-xlsx";
import Tooltip from "../hooks/tools/Tooltip";
import Icon from "../hooks/tools/Icon";
import { EyeIcon } from "../Icons";

interface Feedback {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  message: string;
  rating: number;
  date: string;
}

const TablePage: React.FC = () => {
  const [data, setData] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [viewedIds, setViewedIds] = useState<string[]>([]);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(
    null,
  );
  const [search, setSearch] = useState("");

  // ================= FETCH =================
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get<Feedback[]>(`${BASE_URL}/feedback`);
        setData(response.data);
      } catch (err) {
        setError("Failed to fetch feedback");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  // ================= SEARCH FILTER =================
  const filteredData = useMemo(() => {
    return data.filter((item) =>
      `${item.firstname} ${item.lastname} ${item.email}`
        .toLowerCase()
        .includes(search.toLowerCase()),
    );
  }, [data, search]);

  // ================= MARK VIEWED =================
  const handleConfirmView = () => {
    if (selectedFeedback) {
      setViewedIds((prev) => [...prev, selectedFeedback.id]);
      setSelectedFeedback(null);
    }
  };

  // ================= DELETE =================
  const handleDelete = (id: string) => {
    if (!window.confirm("Are you sure you want to delete?")) return;
    setData((prev) => prev.filter((item) => item.id !== id));
  };

  // ================= DOWNLOAD =================
  const handleDownload = () => {
    if (data.length === 0) return;

    const excelData = [
      {
        sheet: "Feedback",
        columns: [
          { label: "First Name", value: "firstname" },
          { label: "Last Name", value: "lastname" },
          { label: "Email", value: "email" },
          { label: "Rating", value: "rating" },
          { label: "Message", value: "message" },
          { label: "Date", value: "date" },
        ],
        content: data,
      },
    ];

    xlsx(excelData, { fileName: "Feedback_Data" });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Feedback Management
        </h1>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <Tooltip text="Download Excel">
            <button
              onClick={handleDownload}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition"
            >
              <Icon name="Download" />
              Download
            </button>
          </Tooltip>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 uppercase text-sm">
            <tr>
              <th className="px-6 py-4">S.No</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Rating</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center py-8">
                  Loading...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-red-500">
                  {error}
                </td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-400">
                  No feedback found
                </td>
              </tr>
            ) : (
              filteredData.map((item, index) => {
                const isViewed = viewedIds.includes(item.id);

                return (
                  <tr
                    key={item.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4 font-medium">
                      {item.firstname} {item.lastname}
                    </td>
                    <td className="px-6 py-4">{item.email}</td>
                    <td className="px-6 py-4">{item.rating} ⭐</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          isViewed
                            ? "bg-green-100 text-green-600"
                            : "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {isViewed ? "Viewed" : "New"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {new Date(item.date).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4 flex justify-center gap-4">
                      {/* VIEW ICON WITH TOOLTIP */}
                      <Tooltip text="View Details">
                        <div>
                          <EyeIcon
                            className="w-6 h-6 cursor-pointer text-blue-500 hover:scale-110 transition"
                            onClick={() => setSelectedFeedback(item)}
                          />
                        </div>
                      </Tooltip>

                      {/* DELETE BUTTON WITH TOOLTIP */}
                      <Tooltip text="Delete">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition"
                        >
                          Delete
                        </button>
                      </Tooltip>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL WITH BLUR BACKGROUND */}
      {selectedFeedback && (
        <div className="fixed inset-0 backdrop-blur-md bg-white/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[420px] shadow-2xl animate-fadeIn">
            <h2 className="text-xl font-semibold mb-4">Feedback Details</h2>

            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Name:</strong> {selectedFeedback.firstname}{" "}
                {selectedFeedback.lastname}
              </p>
              <p>
                <strong>Email:</strong> {selectedFeedback.email}
              </p>
              <p>
                <strong>Rating:</strong> {selectedFeedback.rating} ⭐
              </p>
              <p>
                <strong>Message:</strong> {selectedFeedback.message}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(selectedFeedback.date).toLocaleString()}
              </p>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setSelectedFeedback(null)}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmView}
                className="px-4 py-2 bg-green-500 text-white rounded-lg"
              >
                Mark Viewed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TablePage;
