import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    FaEdit,
    FaMapMarkerAlt,
    FaBuilding,
    FaRegCalendarAlt,
    FaRegClipboard,
} from "react-icons/fa"; // Importing icons
import { URL } from "../../utils/constant";

const BuildingList = () => {
    const [loading, setLoading] = useState(true);
    const [buildings, setBuildings] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBuildings = async () => {
            try {
                const response = await axios.get(URL + "buildings-all"); // Adjust the endpoint accordingly
                setBuildings(response.data.buildings || []);
            } catch (err) {
                console.error("Error fetching buildings:", err);
                setError("Failed to load building information.");
            } finally {
                setLoading(false);
            }
        };

        fetchBuildings();
    }, []);

    if (loading) {
        return <div className="text-center text-lg font-bold">Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-red-600">{error}</div>;
    }

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold text-center mb-6">
                Building List
            </h1>
            <div>
                {buildings.length > 0 ? (
                    buildings.map((building) => (
                        <div
                            key={building.id}
                            className="bg-white p-6 rounded-lg shadow-md mb-6"
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-2xl font-semibold">
                                    {building.name}
                                </h2>
                                {/* Edit Icon */}
                                <button className="text-blue-500 hover:text-blue-700">
                                    <FaEdit size={20} />
                                </button>
                            </div>

                            {/* Address */}
                            <p className="flex items-center mb-2">
                                <FaMapMarkerAlt className="mr-2" size={18} />
                                <strong>Address:</strong> {building.address}
                            </p>

                            {/* Building Type */}
                            <p className="flex items-center mb-2">
                                <FaBuilding className="mr-2" size={18} />
                                <strong>Building Type:</strong>{" "}
                                {building.building_type}
                            </p>

                            {/* Floors */}
                            <p className="flex items-center mb-2">
                                <FaRegClipboard className="mr-2" size={18} />
                                <strong>Floors:</strong>{" "}
                                {building.floors || "N/A"}
                            </p>

                            {/* Units */}
                            <p className="flex items-center mb-2">
                                <FaRegClipboard className="mr-2" size={18} />
                                <strong>Units:</strong>{" "}
                                {building.units || "N/A"}
                            </p>

                            {/* Construction Date */}
                            <p className="flex items-center mb-2">
                                <FaRegCalendarAlt className="mr-2" size={18} />
                                <strong>Construction Date:</strong>{" "}
                                {building.construction_date
                                    ? new Date(
                                          building.construction_date
                                      ).toLocaleDateString()
                                    : "N/A"}
                            </p>
                        </div>
                    ))
                ) : (
                    <p>No buildings available.</p>
                )}
            </div>
        </div>
    );
};

export default BuildingList;
