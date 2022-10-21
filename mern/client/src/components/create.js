import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    appid: "",
    appname: "",
    status: "",
  });
  const navigate = useNavigate();

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newApp = { ...form };

    await fetch("http://localhost:5000/record/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newApp),
    })
    .catch(error => {
      window.alert(error);
      return;
    });

    setForm({ appid: "", appname: "", status: "" });
    navigate("/");
  }

  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Create new Application</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="appid">App ID</label>
          <input
            type="text"
            className="form-control"
            id="appid"
            value={form.appid}
            onChange={(e) => updateForm({ appid: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="appname">App Name</label>
          <input
            type="text"
            className="form-control"
            id="appname"
            value={form.appname}
            onChange={(e) => updateForm({ appname: e.target.value })}
          />
        </div>
        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="initialStatus"
              id="statusRun"
              value="Run"
              checked={form.level === "Run"}
              onChange={(e) => updateForm({ status: e.target.value })}
            />
            <label htmlFor="statusRun" className="form-check-label">Run</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="initialStatus"
              id="statusStop"
              value="Stop"
              checked={form.level === "Stop"}
              onChange={(e) => updateForm({ status: e.target.value })}
            />
            <label htmlFor="statusStop" className="form-check-label">Stop</label>
          </div>
        </div>
        <div className="form-status">
          <input
            type="submit"
            value="Deploy application"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
