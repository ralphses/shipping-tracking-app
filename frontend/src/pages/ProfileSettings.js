import React, { useState } from "react";

const ProfileSettings = () => {
  // Sample user profile data (replace it with your actual data fetching logic)
  const [userProfile, setUserProfile] = useState({
    id: 1,
    username: "john_doe",
    email: "john.doe@example.com",
    fullName: "John Doe",
    avatarUrl: "https://example.com/avatar.jpg",
  });

  // Sample system settings data (replace it with your actual data fetching logic)
  const [systemSettings, setSystemSettings] = useState({
    language: "en",
    theme: "light",
    notifications: true,
  });

  const [passwordReset, setPasswordReset] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleProfileUpdate = () => {
    // Add logic to update the user profile on the server
    // You can use userProfile state to send the updated data
    console.log("Updating profile:", userProfile);
  };

  const handleSystemSettingsUpdate = () => {
    // Add logic to update system settings on the server
    // You can use systemSettings state to send the updated data
    console.log("Updating system settings:", systemSettings);
  };

  const handlePasswordReset = () => {
    // Add logic to handle password reset
    console.log("Resetting password:", passwordReset);
  };

  const handleChange = (field, value, setState) => {
    setState((prevState) => ({ ...prevState, [field]: value }));
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Profile Settings</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              value={userProfile.fullName}
              onChange={(e) => handleChange("fullName", e.target.value, setUserProfile)}
            />
          </div>
          {/* Add more profile fields as needed */}
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={handleProfileUpdate}
          >
            Update Profile
          </button>
        </form>
      </div>

      <div className="bg-white p-6 mt-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">System Settings</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="language" className="block text-sm font-medium text-gray-600">
              Language
            </label>
            <input
              type="text"
              id="language"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              value={systemSettings.language}
              onChange={(e) => handleChange("language", e.target.value, setSystemSettings)}
            />
          </div>
          {/* Add more system settings fields as needed */}
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={handleSystemSettingsUpdate}
          >
            Update System Settings
          </button>
        </form>
      </div>

      <div className="bg-white p-6 mt-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Password Reset</h2>
        <form>
          <div className="mb-4">
            <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-600">
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              value={passwordReset.currentPassword}
              onChange={(e) => handleChange("currentPassword", e.target.value, setPasswordReset)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-600">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              value={passwordReset.newPassword}
              onChange={(e) => handleChange("newPassword", e.target.value, setPasswordReset)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-600">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmNewPassword"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              value={passwordReset.confirmNewPassword}
              onChange={(e) =>
                handleChange("confirmNewPassword", e.target.value, setPasswordReset)
              }
            />
          </div>
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={handlePasswordReset}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;
