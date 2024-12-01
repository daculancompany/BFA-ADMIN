import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import LandingIntro from './LandingIntro';
import ErrorText from '../../components/Typography/ErrorText';
import InputText from '../../components/Input/InputText';
import { URL } from "../../utils/constant";

function Register() {
    const INITIAL_REGISTER_OBJ = {
        name: "",
        password: "",
        emailId: "",
        confirmPassword: ""
    };

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [registerObj, setRegisterObj] = useState(INITIAL_REGISTER_OBJ);
    const navigate = useNavigate();

    const submitForm = async (e) => {
        e.preventDefault();
        setErrorMessage("");

        // Basic validation on form inputs
        if (registerObj.name.trim() === "") return setErrorMessage("Name is required!");
        if (registerObj.emailId.trim() === "") return setErrorMessage("Email Id is required!");
        if (registerObj.password.trim() === "") return setErrorMessage("Password is required!");
        if (registerObj.password !== registerObj.confirmPassword) return setErrorMessage("Passwords do not match");

        try {
            setLoading(true);

            // Make the Axios post request to your Laravel backend for registration
            const response = await axios.post(URL+'register', {
                name: registerObj.name,
                email: registerObj.emailId,
                password: registerObj.password,
                password_confirmation: registerObj.confirmPassword
            });

            // On success, navigate to login page
            if (response.data.token) {
                setLoading(false);
                navigate('/login', { state: { successMessage: "Registered successfully! Please log in." } });
            } else {
                setLoading(false);
                setErrorMessage("Registration failed. Please try again.");
            }
        } catch (error) {
            setLoading(false);

            // Log error for debugging
            console.log("Registration error: ", error);

            // Handle errors and display proper message
            setErrorMessage(error.response?.data?.message || "An error occurred. Please try again.");
        }
    };

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage(""); // Clear any existing error messages
        setRegisterObj({ ...registerObj, [updateType]: value }); // Update the form input state
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-5xl shadow-xl">
                <div className="grid md:grid-cols-2 grid-cols-1 bg-base-100 rounded-xl">
                    <div className=''>
                        <LandingIntro />
                    </div>
                    <div className='py-24 px-10'>
                        <h2 className='text-2xl font-semibold mb-2 text-center'>Register</h2>
                        <form onSubmit={submitForm}>
                            <div className="mb-4">
                                {/* Input for Name */}
                                <InputText 
                                    defaultValue={registerObj.name} 
                                    updateType="name" 
                                    containerStyle="mt-4" 
                                    labelTitle="Name" 
                                    updateFormValue={updateFormValue} 
                                />
                                {/* Input for Email */}
                                <InputText 
                                    defaultValue={registerObj.emailId} 
                                    updateType="emailId" 
                                    containerStyle="mt-4" 
                                    labelTitle="Email" 
                                    updateFormValue={updateFormValue} 
                                />
                                {/* Input for Password */}
                                <InputText 
                                    defaultValue={registerObj.password} 
                                    type="password" 
                                    updateType="password" 
                                    containerStyle="mt-4" 
                                    labelTitle="Password" 
                                    updateFormValue={updateFormValue} 
                                />
                                {/* Input for Confirm Password */}
                                <InputText 
                                    defaultValue={registerObj.confirmPassword} 
                                    type="password" 
                                    updateType="confirmPassword" 
                                    containerStyle="mt-4" 
                                    labelTitle="Confirm Password" 
                                    updateFormValue={updateFormValue} 
                                />
                            </div>
                            {/* Error Message Display */}
                            <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                            {/* Submit Button */}
                            <button 
                                type="submit" 
                                className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}>
                                Register
                            </button>
                            {/* Link to Login Page */}
                            <div className='text-center mt-4'>
                                Already have an account? 
                                <Link to="/login">
                                    <span className="inline-block hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                                        Login
                                    </span>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
