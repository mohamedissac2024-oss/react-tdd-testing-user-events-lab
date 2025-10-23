import React, { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interests: [],
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        interests: checked
          ? [...prev.interests, value]
          : prev.interests.filter((interest) => interest !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <h1>My Portfolio</h1>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
          />

          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />

          <fieldset>
            <legend>Select your interests:</legend>
            {["Coding", "Design", "Music"].map((interest) => (
              <label key={interest}>
                <input
                  type="checkbox"
                  name="interests"
                  value={interest}
                  checked={formData.interests.includes(interest)}
                  onChange={handleChange}
                />
                {interest}
              </label>
            ))}
          </fieldset>

          <button type="submit">Sign Up</button>
        </form>
      ) : (
        <div role="alert">
          <h2>Thank you, {formData.name}!</h2>
          <p>Your signup with {formData.email} was successful.</p>
          {formData.interests.length > 0 && (
            <p>Your interests: {formData.interests.join(", ")}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
