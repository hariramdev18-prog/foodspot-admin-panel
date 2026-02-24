import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../services/Api";
import xlsx from "json-as-xlsx";
import Tooltip from "../hooks/tools/Tooltip";

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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [viewedIds, setViewedIds] = useState<string[]>([]);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(
    null,
  );

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get<Feedback[]>(`${BASE_URL}/feedback`);
        setData(response.data);
      } catch (err) {
        console.error("Error fetching feedback:", err);
        setError("Failed to fetch feedback");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  const handleOpenModal = (item: Feedback) => {
    setSelectedFeedback(item);
  };

  const handleConfirmView = () => {
    if (selectedFeedback) {
      setViewedIds((prev) => [...prev, selectedFeedback.id]);
      setSelectedFeedback(null);
    }
  };

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
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="w-full mx-auto px-4">
        <div className="text-center mb-6 flex justify-between">
          <h3 className="text-2xl font-semibold text-gray-800">Table</h3>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-xl"
            onClick={handleDownload}
            disabled={data.length === 0}
          >
            Download
          </button>
        </div>

        <div className="overflow-x-auto bg-white shadow-sm rounded-xl border border-gray-200">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="table-th">S.No</th>
                <th className="table-th">Name</th>
                <th className="table-th">Email</th>
                <th className="table-th">Rating</th>
                <th className="table-th">Message</th>
                <th className="table-th">Date</th>
                <th className="table-th">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-6">
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={7} className="text-center py-6 text-red-500">
                    {error}
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-6">
                    No data found
                  </td>
                </tr>
              ) : (
                data.map((item, index) => {
                  const isViewed = viewedIds.includes(item.id);

                  return (
                    <tr key={item.id} className="border-t hover:bg-gray-50">
                      <td className="table-td">{index + 1}</td>
                      <td className="table-td">
                        {item.firstname} {item.lastname}
                      </td>
                      <td className="table-td">{item.email}</td>
                      <td className="table-td">{item.rating}</td>
                      <td className="table-td">{item.message}</td>
                      <td className="table-td">
                        {new Date(item.date).toLocaleString()}
                      </td>
                      <td className="table-td">
                        <button
                          disabled={isViewed}
                          className={`px-4 py-2 rounded-xl text-white ${
                            isViewed
                              ? "bg-green-500 cursor-not-allowed"
                              : "bg-red-400 hover:bg-red-500"
                          }`}
                          onClick={() => handleOpenModal(item)}
                        >
                          {isViewed ? "Viewed" : "View"}
                        </button>{" "}
                        ||{" "}
                        <Tooltip text="Delete">
                          <button className="bg-gray-600 px-4 py-2 rounded-xl text-white">
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
      </div>

      {/* Modal */}
      {selectedFeedback && (
        <div className="fixed inset-0  bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Feedback Details</h2>

            <p>
              <strong>Name:</strong> {selectedFeedback.firstname}{" "}
              {selectedFeedback.lastname}
            </p>
            <p>
              <strong>Email:</strong> {selectedFeedback.email}
            </p>
            <p>
              <strong>Rating:</strong> {selectedFeedback.rating}
            </p>
            <p>
              <strong>Message:</strong> {selectedFeedback.message}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(selectedFeedback.date).toLocaleString()}
            </p>

            <div className="flex justify-end gap-3 mt-5">
              <button
                className="px-4 py-2 bg-gray-400 text-white rounded-lg"
                onClick={() => setSelectedFeedback(null)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-green-500 text-white rounded-lg"
                onClick={handleConfirmView}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TablePage;
