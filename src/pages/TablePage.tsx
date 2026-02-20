import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../services/Api";
import xlsx from "json-as-xlsx";
interface Feedback {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  message: string;
  rating: number;
  date: string;
}

const TablePage = () => {
  const [data, setData] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/feedback`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);
  const handleview = (id: number) => {
    alert("Action has been Taken");
  };
  const handleDownload = () => {
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
                  <td colSpan={6} className="text-center py-6">
                    Loading...
                  </td>
                </tr>
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-6">
                    No data found
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
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
                        className="bg-red-400 text-white px-4 py-2 rounded-xl"
                        onClick={() => handleview(`${item.id}`)}
                      >
                        view
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TablePage;
