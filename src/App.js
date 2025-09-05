import React, { useState } from "react";

const defaultProfileImage = "https://cdn-icons-png.flaticon.com/512/149/149071.png";

const container = {
  maxWidth: 900,
  margin: "40px auto",
  padding: 30,
  borderRadius: 8,
  backgroundColor: "#f9f9fb",
  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  color: "#333",
  display: "flex",
  minHeight: "90vh",
};
const sidebarStyle = {
  width: 220,
  background: "#fff",
  borderRadius: "8px",
  padding: 20,
  boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "sticky",
  top: 20,
  height: "fit-content",
  marginRight: 30,
};
const profileImageStyle = {
  width: 70,
  height: 70,
  borderRadius: "50%",
  marginBottom: 10,
};
const profileNameStyle = {
  fontWeight: 700,
  fontSize: 18,
  margin: "8px 0 2px",
  textAlign: "center",
};
const profileEmailStyle = {
  fontSize: 14,
  color: "#666",
  marginBottom: 20,
  textAlign: "center",
};
const menuStyle = {
  listStyle: "none",
  padding: 0,
  width: "100%",
};
const menuItemStyle = {
  padding: "12px 15px",
  cursor: "pointer",
  fontWeight: 600,
  borderRadius: 6,
  color: "#2b5886",
  marginBottom: 10,
  textAlign: "center",
  userSelect: "none",
  backgroundColor: "transparent",
  transition: "background-color 0.3s",
};
const menuItemActiveStyle = {
  ...menuItemStyle,
  backgroundColor: "#2b5886",
  color: "#fff",
};
const logoutStyle = {
  ...menuItemStyle,
  marginTop: 'auto',
  backgroundColor: "#e74c3c",
  color: "#fff",
};
const contentStyle = {
  flex: 1,
};
const heading = {
  fontSize: 28,
  fontWeight: 700,
  color: "#2b5886",
  marginBottom: 12,
};
const subHeading = {
  fontWeight: 600,
  marginBottom: 20,
  color: "#444",
};
const welcomeCardStyle = {
  background: "#fff",
  borderRadius: 12,
  padding: 30,
  boxShadow: "0 2px 14px rgba(50,82,223,0.08)",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 25,
};
const welcomeTextStyle = {
  maxWidth: "60%",
};
const welcomeImgStyle = {
  width: 220,
  height: 130,
  objectFit: "cover",
  borderRadius: 12,
};
const buttonPrimary = {
  backgroundColor: "#2167e0",
  color: "#fff",
  border: "none",
  borderRadius: 8,
  padding: "12px 30px",
  fontWeight: 600,
  cursor: "pointer",
  marginTop: 20,
};
const statusContainer = {
  display: "flex",
  gap: 20,
  marginBottom: 30,
};
const statusCard = {
  flex: 1,
  backgroundColor: "#f4f7ff",
  borderRadius: 10,
  padding: 22,
  boxShadow: "0px 2px 5px #dbe4fb",
  textAlign: "center",
  userSelect: "none",
};
const statusNumber = {
  color: "#3757db",
  fontSize: 28,
  fontWeight: 700,
  marginBottom: 5,
};
const statusLabel = {
  fontWeight: 600,
  color: "#444",
};
const calendarContainer = {
  backgroundColor: "#fff",
  padding: 25,
  borderRadius: 10,
  boxShadow: "0px 2px 5px #dbe4fb",
  userSelect: "none",
};
const formGroup = {
  marginBottom: 18,
};
const label = {
  fontWeight: 600,
  marginBottom: 5,
  display: "block",
  color: "#3a497b",
};
const input = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 6,
  border: "1px solid #ccc",
  fontSize: 16,
};
const select = {
  ...input,
};
const formButton = {
  ...buttonPrimary,
  width: "100%",
};
const errorStyle = {
  color: "#e74c3c",
  marginTop: 10,
  fontWeight: 600,
};
function StatusCard({ number, label }) {
  return (
    <div style={statusCard}>
      <div style={statusNumber}>{number}</div>
      <div style={statusLabel}>{label}</div>
    </div>
  );
}
export default function App() {
  // --- State start ---
  const [selectedPage, setSelectedPage] = useState("Dashboard");
  const [profile] = useState({
    name: "Suyashi Singh",
    email: "suyashisinghh.com",
    image: "https://cdn-icons-png.flaticon.com/512/1946/1946429.png", // valid image url
  });
  const [doctors] = useState([
    { id: 1, name: "Dr. Smith", specialization: "Cardiology" },
    { id: 2, name: "Dr. Jones", specialization: "Neurology" },
    { id: 3, name: "Dr. Lee", specialization: "Orthopedics" },
    { id: 4, name: "Dr. Brown", specialization: "Pediatrics" },
    { id: 5, name: "Dr. Davis", specialization: "Dermatology" },
  ]);
  const [bookings, setBookings] = useState(1); // Initial new bookings count
  // Book appointment form state
  const [bookForm, setBookForm] = React.useState({
    doctorId: "",
    date: "",
    time: "",
  });
  const [bookError, setBookError] = React.useState("");
  // Prediction form state
  const [symptoms, setSymptoms] = useState("");
  const [prediction, setPrediction] = useState("");
  const [loadingPrediction, setLoadingPrediction] = useState(false);
  const [predictionError, setPredictionError] = useState("");
  // Delete confirmation modal state
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(false);
  // --- State end ---
  // Handle profile image error fallback
  function handleImageError(e) {
    e.target.src = defaultProfileImage;
  }
  // Sidebar menu items
  const menuItems = [
    { id: "Dashboard", label: "Appointments" },
    { id: "Prediction", label: "Prediction" },
    { id: "Settings", label: "Settings" },
  ];
  // --- Form handlers ---
  // Booking form input handler
  function onBookFormChange(e) {
    setBookForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    setBookError("");
  }
  // Submit booking form
  function handleBookingSubmit(e) {
    e.preventDefault();
    if (!bookForm.doctorId || !bookForm.date || !bookForm.time) {
      setBookError("Please fill all fields");
      return;
    }
    // Simulate booking success, increment bookings count
    setBookings((prev) => prev + 1);
    alert(
      `Appointment booked with ${
        doctors.find((d) => d.id.toString() === bookForm.doctorId).name
      } on ${bookForm.date} at ${bookForm.time}`
    );
    // Reset form
    setBookForm({ doctorId: "", date: "", time: "" });
  }
  // Submit disease prediction form
  async function handlePredictionSubmit(e) {
    e.preventDefault();
    setPredictionError("");
    setPrediction("");
    if (!symptoms.trim()) {
      setPredictionError("Please enter symptoms");
      return;
    }
    setLoadingPrediction(true);
    try {
      const res = await fetch("http://localhost:5000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms }),
      });
      if (!res.ok) {
        throw new Error("API error");
      }
      const data = await res.json();
      setPrediction(data.predicted_disease);
    } catch {
      setPredictionError("Error predicting disease");
    } finally {
      setLoadingPrediction(false);
    }
  }
  // Delete account confirmation handlers
  function confirmDeleteAccount() {
    alert("Account deleted (mock)!");
    setShowDeleteConfirm(false);
  }
  // --- Page components ---
  function Dashboard() {
    return (
      <div>
        <div style={welcomeCardStyle}>
          <div style={welcomeTextStyle}>
            <h2 style={{ color: "#2b5886" }}>
              Welcome!
              <br />
              {profile.name}
            </h2>
            <p>
              Thanks for joining with us. We are always trying to get you a complete service. You
              can view your daily schedule, Reach Patients Appointment at home!
            </p>
            <button style={buttonPrimary} onClick={() => setSelectedPage("Appointments")}>
              View My Appointments
            </button>
          </div>
          <img
            src="https://cdn.pixabay.com/photo/2017/08/02/10/49/syringe-2561336_1280.jpg"
            alt="medical"
            style={welcomeImgStyle}
            onError={(e) =>
              (e.target.src = "https://cdn-icons-png.flaticon.com/512/219/219983.png")
            }
          />
        </div>
        <h3 style={{ marginBottom: 14 }}>Status</h3>
        <div style={statusContainer}>
          <StatusCard number={doctors.length} label="All Doctors" />
          <StatusCard number={bookings} label="New Booking" />
        </div>
        {/* Simple calendar hardcoded for demo */}
        <div style={calendarContainer}>
          <h3>Your Calendar</h3>
          <p style={{ marginTop: 0, color: "#777", marginBottom: "18px" }}>
            Plan your schedule or see appointments for the month.
          </p>
          <div style={{ paddingTop: 10 }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
                    <th
                      key={d}
                      style={{ padding: 10, borderBottom: "1px solid #ddd", color: "#555" }}
                    >
                      {d}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  [31, 1, 2, 3, 4, 5, 6],
                  [7, 8, 9, 10, 11, 12, 13],
                  [14, 15, 16, 17, 18, 19, 20],
                  [21, 22, 23, 24, 25, 26, 27],
                  [28, 29, 30, null, null, null, null],
                ].map((week, i) => (
                  <tr key={i}>
                    {week.map((day, j) => (
                      <td
                        key={j}
                        style={{
                          padding: 10,
                          height: 40,
                          border: "1px solid #eee",
                          textAlign: "center",
                          color: day === null ? "#ccc" : "#222",
                          backgroundColor:
                            day === new Date().getDate() &&
                            new Date().getMonth() === 8 &&
                            new Date().getFullYear() === 2025
                              ? "#d0e3ff"
                              : "transparent",
                        }}
                      >
                        {day || ""}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
  function Appointments() {
    return (
      <div>
        <h2 style={heading}>Book Appointment</h2>
        <form onSubmit={handleBookingSubmit}>
          <div style={formGroup}>
            <label style={label}>Doctor</label>
            <select
              style={select}
              name="doctorId"
              value={bookForm.doctorId}
              onChange={onBookFormChange}
            >
              <option value="">-- Select Doctor --</option>
              {doctors.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} - {d.specialization}
                </option>
              ))}
            </select>
          </div>
          <div style={formGroup}>
            <label style={label}>Date</label>
            <input
              style={input}
              name="date"
              type="date"
              value={bookForm.date}
              onChange={onBookFormChange}
            />
          </div>
          <div style={formGroup}>
            <label style={label}>Time</label>
            <input
              style={input}
              name="time"
              type="time"
              value={bookForm.time}
              onChange={onBookFormChange}
            />
          </div>
          {bookError && <div style={errorStyle}>{bookError}</div>}
          <button type="submit" style={formButton}>
            Confirm Appointment
          </button>
        </form>
      </div>
    );
  }
  function Prediction() {
    return (
      <div>
        <h2 style={heading}>Disease Prediction</h2>
        <form onSubmit={handlePredictionSubmit}>
          <div style={formGroup}>
            <label style={label}>Enter your symptoms (comma separated)</label>
            <input
              style={input}
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="e.g. fever, cough"
              spellCheck="false"
            />
          </div>
          {predictionError && <div style={errorStyle}>{predictionError}</div>}
          <button type="submit" style={formButton} disabled={loadingPrediction}>
            {loadingPrediction ? "Predicting..." : "Predict Disease"}
          </button>
        </form>
        {prediction && (
          <p style={{ marginTop: 15, fontWeight: 600, color: "#4A90E2" }}>
            Predicted Disease: <strong>{prediction}</strong>
          </p>
        )}
      </div>
    );
  }
  function Settings() {
    return (
      <div>
        <h2 style={heading}>Settings</h2>
        <p style={{ marginBottom: 30 }}>Manage your account settings here.</p>
        <button
          style={{
            ...formButton,
            backgroundColor: "#e74c3c",
            width: "auto",
            padding: "10px 20px",
          }}
          onClick={() => setShowDeleteConfirm(true)}
        >
          Delete Account
        </button>
        {showDeleteConfirm && (
          <div
            style={{
              position: "fixed",
              left: 0,
              top: 0,
              height: "100vh",
              width: "100vw",
              backgroundColor: "rgba(0,0,0,0.5)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                background: "#fff",
                padding: 30,
                borderRadius: 10,
                maxWidth: 400,
                width: "90%",
                textAlign: "center",
              }}
            >
              <h3>Confirm Account Deletion</h3>
              <p>This action cannot be undone. Are you sure you want to delete your account?</p>
              <div style={{ marginTop: 30, display: "flex", justifyContent: "space-around" }}>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  style={{
                    padding: "10px 15px",
                    borderRadius: 6,
                    border: "1px solid #ccc",
                    background: "transparent",
                    cursor: "pointer",
                    width: 120,
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteAccount}
                  style={{
                    padding: "10px 15px",
                    borderRadius: 6,
                    border: "none",
                    backgroundColor: "#e74c3c",
                    color: "#fff",
                    cursor: "pointer",
                    width: 120,
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  return (
    <div style={container}>
      <aside style={sidebarStyle}>
        <img
          src={profile.image}
          alt="profile"
          style={profileImageStyle}
          onError={handleImageError}
        />
        <div style={profileNameStyle}>{profile.name}</div>
        <div style={profileEmailStyle}>{profile.email}</div>
        <ul style={menuStyle}>
          {menuItems.map((item) => (
            <li
              key={item.id}
              onClick={() => setSelectedPage(item.id)}
              style={selectedPage === item.id ? menuItemActiveStyle : menuItemStyle}
            >
              {item.label}
            </li>
          ))}
          <li
            style={logoutStyle}
            onClick={() => alert("Logging out... (mock)")}
          >
            Log out
          </li>
        </ul>
      </aside>
      <main style={contentStyle}>
        {selectedPage === "Dashboard" && <Dashboard />}
        {selectedPage === "Appointments" && <Appointments />}
        {selectedPage === "Prediction" && <Prediction />}
        {selectedPage === "Settings" && <Settings />}
      </main>
    </div>
  );
}
