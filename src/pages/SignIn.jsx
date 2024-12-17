import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";

export default function SignInPage() {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate(); // Navigation hook

  function handleSignIn(event) {
    event.preventDefault();
    const email = event.target.email.value.trim();
    const password = event.target.password.value;

    // Basic client-side validation
    if (!email || !password) {
      setErrorMessage("Please fill in both fields.");
      return;
    }

    setLoading(true); // Start loading
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        // Redirect to meal plan page on success
        navigate("/onboarding");
      })
      .catch((error) => {
        const friendlyMessage = formatFirebaseError(error.code);
        setErrorMessage(friendlyMessage);
      })
      .finally(() => setLoading(false)); // Stop loading
  }

  // Format Firebase error codes to friendly messages
  function formatFirebaseError(code) {
    switch (code) {
      case "auth/user-not-found":
        return "No account found with this email.";
      case "auth/wrong-password":
        return "Incorrect password. Please try again.";
      case "auth/invalid-email":
        return "Invalid email format.";
      default:
        return "Something went wrong. Please try again later.";
    }
  }

  return (
    <section id="sign-in-page" className="page">
      <h1>Sign In</h1>
      <form id="sign-in-form" onSubmit={handleSignIn}>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          aria-label="email"
          placeholder="Type your email..."
          required
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          aria-label="password"
          placeholder="Type your password..."
          autoComplete="current-password"
          required
        />
        {/* Error Message */}
        {errorMessage && (
          <div className="error-message" aria-live="polite">
            <p>{errorMessage}</p>
          </div>
        )}
        {/* Submit Button */}
        <div className="btns">
          <button type="submit" disabled={loading}>
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </div>
      </form>
      {/* Sign Up Link */}
      <p className="text-center">
        Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </section>
  );
}
