import React, { useState, useEffect } from "react";
import {
  fetchUsersWithPaymentStatus,
  confirmPackagePayment,
} from "../api/api2";

const packages = [
  { id: 1, name: "Genz Package" },
  { id: 2, name: "Mbogi Package" },
  { id: 3, name: "Baller Package" },
  { id: 4, name: "Comrade Package" },
];

function AdminPackagePayments() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await fetchUsersWithPaymentStatus();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const openPackageModal = (userId) => {
    setSelectedUserId(userId);
    setShowModal(true);
  };

  const handleConfirmWithPackage = async (pkgId) => {
    if (!selectedUserId || !pkgId) return;
    try {
      await confirmPackagePayment(selectedUserId, pkgId);
      alert("Payment confirmed!");
      setShowModal(false);
      setSelectedUserId(null);
      loadUsers();
    } catch (error) {
      console.error(error);
      alert("Failed to confirm payment");
    }
  };

  return (
    <>
      <div>
        <h1 className="text-2xl font-bold text-indigo-800">
          Manage User Payments
        </h1>
      </div>

      {/* Desktop table view */}
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg hidden md:block mt-4">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Paid?</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="text-center">
                <td className="px-4 py-2 border">{u.name}</td>
                <td className="px-4 py-2 border">{u.email}</td>
                <td className="px-4 py-2 border">{u.hasPaid ? "Yes" : "No"}</td>
                <td className="px-4 py-2 border">
                  {!u.hasPaid ? (
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      onClick={() => openPackageModal(u.id)}
                    >
                      Confirm Payment
                    </button>
                  ) : (
                    <>{u.desiredPackage?.name || "—"}</>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Responsive card view for small screens */}
      <div className="md:hidden space-y-4 mt-4">
        {users.map((u) => (
          <div
            key={u.id}
            className="bg-white p-4 rounded-lg shadow-md flex flex-col space-y-2"
          >
            <div className="flex justify-between">
              <span className="font-bold text-indigo-800">Name:</span>
              <span>{u.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-indigo-800">Email:</span>
              <span>{u.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold text-indigo-800">Paid:</span>
              <span>{u.hasPaid ? "Yes" : "No"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-bold text-indigo-800">Action:</span>
              {!u.hasPaid ? (
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  onClick={() => openPackageModal(u.id)}
                >
                  Confirm Payment
                </button>
              ) : (
                <span>{u.desiredPackage?.name || "—"}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-bold mb-4">Select a Package</h2>
            <ul className="space-y-2">
              {packages.map((pkg) => (
                <li key={pkg.id}>
                  <button
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
                    onClick={() => handleConfirmWithPackage(pkg.id)}
                  >
                    {pkg.name}
                  </button>
                </li>
              ))}
            </ul>
            <button
              className="mt-4 w-full bg-gray-300 hover:bg-gray-400 py-2 rounded"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default AdminPackagePayments;
