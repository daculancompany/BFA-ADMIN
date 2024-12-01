import React, { useEffect, useState } from "react";
import axios from "axios";
import TitleCard from "../../components/Cards/TitleCard";
import { URL } from "../../utils/constant";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import ImageGallery from "./ImageGallery";

const Schedule = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [personnel, setPersonnel] = useState([]);
    const [selectedPersonnel, setSelectedPersonnel] = useState({});
    const [modalData, setModalData] = useState(null); // State for modal data
    const adminId = 1; // Admin ID (replace with dynamic value if necessary)
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(URL + "bookings");
                setBookings(response.data);
            } catch (err) {
                const message =
                    err.response?.data?.message ||
                    "Failed to fetch bookings. Please try again.";
                setError(message);
                console.error("Error fetching bookings:", message);
            } finally {
                setLoading(false);
            }
        };

        const fetchPersonnel = async () => {
            try {
                const response = await axios.get(URL + "personnel");
                setPersonnel(response.data);
            } catch (err) {
                console.error("Error fetching personnel:", err.message);
            }
        };

        fetchBookings();
        fetchPersonnel();

        const storedPersonnel =
            JSON.parse(localStorage.getItem("selectedPersonnel")) || {};
        setSelectedPersonnel(storedPersonnel);
    }, []);

    const handleApprove = async (id) => {
        try {
            await axios.put(URL + `bookings/${id}`, {
                status: "approved",
                approved_by_admin_id: adminId,
            });
            setBookings((prevBookings) =>
                prevBookings.map((booking) =>
                    booking.id === id
                        ? { ...booking, status: "approved" }
                        : booking
                )
            );
        } catch (err) {
            console.error(
                "Error approving booking:",
                err.response?.data?.message || err.message
            );
        }
    };

    const handleCancel = async (id) => {
        try {
            await axios.put(URL + `bookings/${id}`, {
                status: "canceled",
            });
            setBookings((prevBookings) =>
                prevBookings.map((booking) =>
                    booking.id === id
                        ? { ...booking, status: "canceled" }
                        : booking
                )
            );
        } catch (err) {
            console.error(
                "Error canceling booking:",
                err.response?.data?.message || err.message
            );
        }
    };

    const handleDeployPersonnel = async (bookingId) => {
        const personnelId = selectedPersonnel[bookingId];
        if (!personnelId) {
            alert(
                "No personnel selected. Please select personnel before deploying."
            );
            return;
        }

        try {
            await axios.put(URL + `bookings/${bookingId}/deploy`, {
                personnel_id: personnelId,
            });

            const deployedPersonnel = personnel.find(
                (p) => p.id === parseInt(personnelId)
            );

            setBookings((prevBookings) =>
                prevBookings.map((booking) =>
                    booking.id === bookingId
                        ? {
                              ...booking,
                              personnel: deployedPersonnel,
                              status: "deployed",
                          }
                        : booking
                )
            );

            alert("Personnel deployed successfully!");
        } catch (err) {
            console.error(
                "Error deploying personnel:",
                err.response?.data?.message || err.message
            );
        }
    };

    const handleSelectPersonnel = (bookingId, personnelId) => {
        const updatedPersonnel = {
            ...selectedPersonnel,
            [bookingId]: personnelId,
        };
        setSelectedPersonnel(updatedPersonnel);
        localStorage.setItem(
            "selectedPersonnel",
            JSON.stringify(updatedPersonnel)
        );
    };

    const openDetailsModal = (details) => {
        setModalData(details);
    };

    const closeModal = () => {
        setModalData(null);
    };

    if (loading) {
        return (
            <div className="text-center text-xl text-gray-500">Loading...</div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-xl text-red-500">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <TitleCard title="Surveys">
                <div className="overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="min-w-full bg-white border-collapse">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                                    Personnel
                                </th>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                                    Building
                                </th>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                                    Type
                                </th>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                                    Appointment Date
                                </th>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                                    Address
                                </th>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                                    Status
                                </th>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                                    Remarks
                                </th>
                                <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map((booking) => (
                                <tr
                                    key={booking.id}
                                    className="border-t hover:bg-gray-50"
                                >
                                    <td className="py-4 px-6 text-sm text-gray-900">
                                        {booking.personnel?.name || "N/A"}
                                    </td>
                                    <td className="py-4 px-6 text-sm text-gray-900">
                                        {booking.building?.name || "N/A"}
                                    </td>
                                    <td className="py-4 px-6 text-sm text-gray-900">
                                        {booking.type}
                                    </td>
                                    <td className="py-4 px-6 text-sm text-gray-900">
                                        {new Date(
                                            booking.appointment_date
                                        ).toLocaleString()}
                                    </td>
                                    <td className="py-4 px-6 text-sm text-gray-900">
                                        {booking.building?.address || "N/A"}
                                    </td>
                                    <td className="py-4 px-6 text-sm text-gray-900">
                                        {booking.status}
                                    </td>
                                    <td className="py-4 px-6 text-sm text-gray-900">
                                        {booking.buildingInfo?.remarks}
                                        {booking.buildingInfo?.remarks === 'fail' && (
                                           <>
                                           <p>Reason: <span style={{color:'red' }} >{booking.buildingInfo?.reasons}</span></p>
                                           </>
                                        )}
                                    </td>
                                    <td className="py-4 px-6 text-sm">
                                        {booking.status === "completed" &&
                                            booking.personnel && (
                                                <>
                                                    <button
                                                        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                                                        onClick={() =>
                                                            openDetailsModal(
                                                                booking.buildingInfo
                                                            )
                                                        }
                                                    >
                                                        Details
                                                    </button>

                                                    <button
                                                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                                        onClick={() =>
                                                            setImages(
                                                                booking
                                                                    ?.buildingInfo
                                                                    ?.images ||
                                                                    []
                                                            )
                                                        }
                                                    >
                                                        Images
                                                    </button>
                                                </>
                                            )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </TitleCard>
            {images && images.length > 0 && <ImageGallery images={images}  close={()=> setImages([])} />}

            {/* Modal */}
            {modalData && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
                        <h3 className="text-xl font-semibold mb-4">
                            Building Details
                        </h3>

                        <p>
                            <strong>Inspection Order Number:</strong>{" "}
                            {modalData.inspection_order_no}
                        </p>
                        <p>
                            <strong>Inspection During Construction:</strong>{" "}
                            {modalData.inspectionDuringConstruction}
                        </p>
                        <p>
                            <strong>FSIC Occupancy:</strong>{" "}
                            {modalData.fsic_occupancy ? (
                                <CheckIcon className="w-6 h-6 text-green-500 inline-block" />
                            ) : (
                                <XMarkIcon className="w-6 h-6 text-red-500 inline-block" />
                            )}
                        </p>
                        <p>
                            <strong>FSIC New Permit:</strong>{" "}
                            {modalData.fsic_new_permit ? (
                                <CheckIcon className="w-6 h-6 text-green-500 inline-block" />
                            ) : (
                                <XMarkIcon className="w-6 h-6 text-red-500 inline-block" />
                            )}
                        </p>
                        <p>
                            <strong>FSIC Renew Permit:</strong>{" "}
                            {modalData.fsic_renew_permit ? (
                                <CheckIcon className="w-6 h-6 text-green-500 inline-block" />
                            ) : (
                                <XMarkIcon className="w-6 h-6 text-red-500 inline-block" />
                            )}
                        </p>

                        <p>
                            <strong>FSIC Annual Inspection:</strong>{" "}
                            {modalData.fsic_annual_inspection ? (
                                <CheckIcon className="w-6 h-6 text-green-500 inline-block" />
                            ) : (
                                <XMarkIcon className="w-6 h-6 text-red-500 inline-block" />
                            )}
                        </p>
                        <p>
                            <strong>Verification Inspection:</strong>{" "}
                            {modalData.verification_inspection ? (
                                <CheckIcon className="w-6 h-6 text-green-500 inline-block" />
                            ) : (
                                <XMarkIcon className="w-6 h-6 text-red-500 inline-block" />
                            )}
                        </p>
                        <p>
                            <strong>NTC:</strong>{" "}
                            {modalData.ntc ? (
                                <CheckIcon className="w-6 h-6 text-green-500 inline-block" />
                            ) : (
                                <XMarkIcon className="w-6 h-6 text-red-500 inline-block" />
                            )}
                        </p>
                        <p>
                            <strong>Abatement:</strong>{" "}
                            {modalData.abatement ? (
                                <CheckIcon className="w-6 h-6 text-green-500 inline-block" />
                            ) : (
                                <XMarkIcon className="w-6 h-6 text-red-500 inline-block" />
                            )}
                        </p>
                        <p>
                            <strong>Closure:</strong>{" "}
                            {modalData.closure ? (
                                <CheckIcon className="w-6 h-6 text-green-500 inline-block" />
                            ) : (
                                <XMarkIcon className="w-6 h-6 text-red-500 inline-block" />
                            )}
                        </p>
                        <p>
                            <strong>Disapproval:</strong>{" "}
                            {modalData.disapproval ? (
                                <CheckIcon className="w-6 h-6 text-green-500 inline-block" />
                            ) : (
                                <XMarkIcon className="w-6 h-6 text-red-500 inline-block" />
                            )}
                        </p>

                        <p>
                            <strong>:</strong> {modalData.inspection_order_no}
                        </p>
                        <p>
                            <strong>Owner Name:</strong> {modalData.owner_name}
                        </p>
                        <p>
                            <strong>Address:</strong> {modalData.address}
                        </p>
                        <p>
                            <strong>Remarks:</strong> {modalData.remarks}
                        </p>
                        <p>
                            <strong>FSIC Occupancy:</strong>{" "}
                            {modalData.fsic_occupancy}
                        </p>
                        {/* Add more details as needed */}
                        <div className="mt-4 flex justify-end">
                            <button
                                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                onClick={closeModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Schedule;
