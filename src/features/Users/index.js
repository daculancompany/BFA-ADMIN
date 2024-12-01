import React, { useState, useEffect } from "react";
import axios from "axios";
import { URL } from "../../utils/constant";
import TitleCard from "../../components/Cards/TitleCard";

const PersonnelRegistration = () => {
    const [formData, setFormData] = useState({
        name: "",
        address: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");
    const [personnelList, setPersonnelList] = useState([]);

    // Fetch personnel list when component mounts
    useEffect(() => {
        const fetchPersonnel = async () => {
            try {
                const response = await axios.get(`${URL}personnel`);
                setPersonnelList(response.data);
            } catch (err) {
                console.error("Error fetching personnel list:", err.message);
            }
        };

        fetchPersonnel();
    }, []);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${URL}personnel/register`,
                formData
            );
            setSuccessMessage("Personnel registered successfully!");
            setError(null);
            // Clear form fields
            setFormData({
                name: "",
                address: "",
                email: "",
                password: "",
            });
            // Optionally re-fetch the list after successful registration
            const updatedPersonnel = await axios.get(`${URL}personnel`);
            setPersonnelList(updatedPersonnel.data);
        } catch (err) {
            setError(
                err.response?.data?.message || "Error registering personnel"
            );
            setSuccessMessage("");
        }
    };

    return (
        <div className="container mx-auto p-6">
            <TitleCard title="Personnel Registration" topMargin="mt-2">
                <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="address"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Address
                        </label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            required
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {successMessage && (
                        <p className="text-green-500 text-sm">
                            {successMessage}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Register Personnel
                    </button>
                </form>
            </TitleCard>
            {/* Personnel List */}
            <h3 className="text-xl font-semibold mt-6">Personnel List</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                {personnelList.length > 0 ? (
                    personnelList.map((person) => (
                        <div
                            key={person.id}
                            className="bg-white border shadow-sm rounded-lg p-4"
                        >
                            <h4 className="text-lg font-semibold">
                                {person.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                                Email: {person.email}
                            </p>
                            <p className="text-sm text-gray-600">
                                Address: {person.address}
                            </p>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-sm text-gray-500 col-span-3">
                        No personnel registered yet
                    </div>
                )}
            </div>
        </div>
    );
};

export default PersonnelRegistration;
