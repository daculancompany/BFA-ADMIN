import React, { useState } from "react";
import { useDispatch } from "react-redux";
import InputText from "../../../components/Input/InputText";
import ErrorText from "../../../components/Typography/ErrorText";
import { showNotification } from "../../common/headerSlice";
import { addNewLead } from "../leadSlice";
import axios from "axios"; // Import Axios for API requests

const INITIAL_LEAD_OBJ = {
  first_name: "",
  last_name: "",
  email: "",
  contactInfo: "",
  address: "",
  profile_picture: "", // Add profile picture field
};

function AddLeadModalBody({ closeModal }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);

  const saveNewLead = () => {
    if (leadObj.first_name.trim() === "")
      return setErrorMessage("First Name is required!");
    else if (leadObj.email.trim() === "")
      return setErrorMessage("Email id is required!");
    else {
      let formData = new FormData();
      formData.append("email", leadObj.email);
      formData.append("first_name", leadObj.first_name);
      formData.append("last_name", leadObj.last_name);
      formData.append("contactInfo", leadObj.contactInfo);
      formData.append("address", leadObj.address);
      formData.append("profile_picture", leadObj.profile_picture); // Append profile picture data

      axios
        .post("http://127.0.0.1:8000/api/addLead", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          dispatch(addNewLead({ newLeadObj: response.data })); // Update Redux state with new lead data
          dispatch(showNotification({ message: "New Personnel Added!", status: 1 }));
          closeModal();
        })
        .catch((error) => {
          console.error("Error adding new Personnel:", error);
          setErrorMessage("Failed to add new Personnel. Please try again.");
        });
    }
  };

  const updateFormValue = ({ updateType, value }) => {
    setErrorMessage("");
    setLeadObj({ ...leadObj, [updateType]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLeadObj({ ...leadObj, profile_picture: file });
    }
  };

  return (
    <>
      <InputText
        type="text"
        defaultValue={leadObj.first_name}
        updateType="first_name"
        containerStyle="mt-4"
        labelTitle="First Name"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={leadObj.last_name}
        updateType="last_name"
        containerStyle="mt-4"
        labelTitle="Last Name"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="email"
        defaultValue={leadObj.email}
        updateType="email"
        containerStyle="mt-4"
        labelTitle="Email Id"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={leadObj.contactInfo}
        updateType="contactInfo"
        containerStyle="mt-4"
        labelTitle="Contact Information"
        updateFormValue={updateFormValue}
      />

      <InputText
        type="text"
        defaultValue={leadObj.address}
        updateType="address"
        containerStyle="mt-4"
        labelTitle="Address"
        updateFormValue={updateFormValue}
      />

      <div className="mt-4">
        <label htmlFor="profile_picture" className="block text-sm font-medium text-gray-700">
          Profile Picture
        </label>
        <input
          type="file"
          id="profile_picture"
          name="profile_picture"
          accept="image/*"
          onChange={handleImageUpload}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
        />
      </div>

      <ErrorText styleClass="mt-4">{errorMessage}</ErrorText>
      <div className="modal-action mt-4">
        <button className="btn btn-ghost" onClick={() => closeModal()}>
          Cancel
        </button>
        <button className="btn btn-primary px-6" onClick={() => saveNewLead()}>
          Save
        </button>
      </div>
    </>
  );
}

export default AddLeadModalBody;
