import "./profile.css";
import { useState } from "react";

function Profile() {
  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem("profile");

    return savedProfile
      ? JSON.parse(savedProfile)
      : {
          fullname: "",
          username: "",
          email: "",
          phone: "",
          age: "",
          bio: "",
        };
  });

  const [editing, setEditing] = useState(true);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const saveChanges = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "profile",
      JSON.stringify(profile)
    );

    console.log("Profile Saved:");
    console.log(profile);

    setEditing(false);

    alert("Profile Saved Successfully");
  };

  return (
    <div className="profile-container">
      <form
        className="profile-card"
        onSubmit={saveChanges}
      >
        <h1>My Profile</h1>

        <input
          type="text"
          name="fullname"
          placeholder="Full Name"
          value={profile.fullname}
          onChange={handleChange}
          disabled={!editing}
        />

        <input
          type="text"
          name="username"
          placeholder="Username"
          value={profile.username}
          onChange={handleChange}
          disabled={!editing}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={profile.email}
          onChange={handleChange}
          disabled={!editing}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={profile.phone}
          onChange={handleChange}
          disabled={!editing}
        />

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={profile.age}
          onChange={handleChange}
          disabled={!editing}
        />

        <textarea
          name="bio"
          placeholder="Bio"
          value={profile.bio}
          onChange={handleChange}
          disabled={!editing}
        />

        {!editing ? (
          <button
            type="button"
            onClick={() => setEditing(true)}
          >
            Edit Profile
          </button>
        ) : (
          <button type="submit">
            Save Changes
          </button>
        )}
      </form>
    </div>
  );
}

export default Profile;