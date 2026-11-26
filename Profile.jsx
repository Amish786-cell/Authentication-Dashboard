
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Profile() {
  const { user, refreshProfile } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const API = (await import("../api")).default;

      await API.put("/auth/profile", { name });

      await refreshProfile();

      setMessage("Profile updated successfully!");
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
        "Unable to update profile"
      );
    }
  };

  return (
    <div className="profile-container">
      <h1>My Profile</h1>

      <p>Email: {user?.email}</p>
      <p>Account Role: {user?.role}</p>

      <form onSubmit={handleSubmit}>
        <label>Full Name</label>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <button type="submit">
          Update Profile
        </button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Profile;

