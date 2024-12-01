import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import LandingIntro from "./LandingIntro";
import ErrorText from "../../components/Typography/ErrorText";
import InputText from "../../components/Input/InputText";
import { URL } from "../../utils/constant";

function Login() {
    const INITIAL_LOGIN_OBJ = {
        password: "",
        emailId: "",
    };

    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ);
    const navigate = useNavigate();

    const submitForm = async (e) => {
        e.preventDefault();
        setErrorMessage(""); // Clear previous errors
        setLoading(true); // Start loading
    
        // Input validation
        const { emailId, password } = loginObj;
    
        if (!emailId?.trim()) {
            setLoading(false);
            return setErrorMessage("Email Id is required!");
        }
    
        if (!password?.trim()) {
            setLoading(false);
            return setErrorMessage("Password is required!");
        }
    
        try {
            // Sanitize inputs
            const sanitizedEmail = emailId.trim();
            const sanitizedPassword = password.trim();
    
            // Make API call using Fetch
            const response = await fetch(`${URL}login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: sanitizedEmail,
                    password: sanitizedPassword,
                }),
            });
    
            // Handle successful response
            if (!response.ok) {
                // Handle HTTP errors
                const errorData = await response.json();
                const errorMessage =
                    errorData.message || "An error occurred. Please try again.";
                throw new Error(errorMessage);
            }
    
            const data = await response.json();
    
            if (data?.token) {
                localStorage.setItem("token", data.token); // Store token securely
                setLoading(false);
                navigate("/app/welcome"); // Redirect to welcome page
            } else {
                throw new Error(
                    "Login failed. Please check your credentials and try again."
                );
            }
        } catch (error) {
            console.error("Login error:", error);
            setLoading(false);
    
            if (error instanceof Error) {
                setErrorMessage(
                    error.message || "An unexpected error occurred. Please try again."
                );
            } else {
                setErrorMessage("An unexpected error occurred. Please try again.");
            }
        }
    };
    
    

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("");
        setLoginObj({ ...loginObj, [updateType]: value });
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-5xl shadow-xl">
                <div className="grid md:grid-cols-2 grid-cols-1 bg-base-100 rounded-xl">
                    <div className="">
                        <LandingIntro />
                    </div>
                    <div className="py-24 px-10">
                        <h2 className="text-2xl font-semibold mb-2 text-center">
                            Login
                        </h2>
                        <form onSubmit={submitForm}>
                            <div className="mb-4">
                                <InputText
                                    type="email"
                                    defaultValue={loginObj.emailId}
                                    updateType="emailId"
                                    containerStyle="mt-4"
                                    labelTitle="Email"
                                    updateFormValue={updateFormValue}
                                />
                                <InputText
                                    defaultValue={loginObj.password}
                                    type="password"
                                    updateType="password"
                                    containerStyle="mt-4"
                                    labelTitle="Password"
                                    updateFormValue={updateFormValue}
                                />
                            </div>
                            <div className="text-right text-primary">
                                <Link to="/forgot-password">
                                    <span className="text-sm inline-block hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                                        Forgot Password?
                                    </span>
                                </Link>
                            </div>
                            <ErrorText styleClass="mt-8">
                                {errorMessage}
                            </ErrorText>
                            <button
                                type="submit"
                                className={
                                    "btn mt-2 w-full btn-primary" +
                                    (loading ? " loading" : "")
                                }
                            >
                                Login
                            </button>
                            <div className="text-center mt-4">
                                Don't have an account yet?
                                <Link to="/register">
                                    <span className="inline-block hover:text-primary hover:underline hover:cursor-pointer transition duration-200">
                                        Register
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

export default Login;
