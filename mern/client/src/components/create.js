import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    appid: "",
    appname: "",
    status: "",
  });
  const navigate = useNavigate();

    const [appComponents, setComponents] = useState([
        {appLocation: '', npmScript: ''}
    ]); 

    const handleFormChange = (index, event) => {
        let data = [...appComponents];
        data[index][event.target.name] = event.target.value;
        setComponents(data);
     }

     const addComponent = () => {
        let newComponent = { appLocation: '', npmScript: '' }
    
        setComponents([...appComponents, newComponent])
    }

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  const onSubmit2 = (e) => {
    e.preventDefault();
    console.log(appComponents)
  }

  // This function will handle the submission.
  async function onSubmit(e) {
    console.log("Create application submitted")
    
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

  // This following section will display the form that takes the input from the user. onSubmit={onSubmit2}
  //
  return (
    <div>
      <h3>Create new Application</h3>
      <form >
        <div className="form-group">
          <label htmlFor="appid">App name</label>
          <input
            type="text"
            className="form-control"
            id="appname"
            value={form.appname}
            onChange={(e) => updateForm({ appname: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="gitRepoUrl">Git repository url</label>
          <input
            type="text"
            className="form-control"
            id="gitRepoUrl"
            value={form.gitRepoUrl}
            onChange={(e) => updateForm({ gitRepoUrl: e.target.value })}
          />
        </div>     
        <div className="form-group">
            {appComponents.map((input, index) => {
                return (
                    <div key={index}>
                        <input
                            name='appLocation'
                            placeholder=''
                            value={input.appLocation}
                            onChange={event => handleFormChange(index, event)}
                        />
                        <input
                            name='npmScript'
                            placeholder=''
                            value={input.npmScript}
                            onChange={event => handleFormChange(index, event)}
                        />
                    </div>
                )
            })}
            <button onClick={addComponent}>Add Component</button>     
            <button onClick={onSubmit2}>Submit</button>
        </div>   
        <div className="form-group">
          <label htmlFor="initStatOptions">Initial Automation State</label><br></br>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="initStatOptions"
              id="initStatStop"
              value="Stop"
              checked={form.level === "Stop"}
              onChange={(e) => updateForm({ level: e.target.value })}
            />
            <label htmlFor="initStatStop" className="form-check-label">Stop</label>
          </div>
          <div className="form-check form-check-inline">            
            <input
              className="form-check-input"
              type="radio"
              name="initStatOptions"
              id="initStatStart"
              value="Start"
              checked={form.level === "Start"}
              onChange={(e) => updateForm({ level: e.target.value })}
            />
            <label htmlFor="initStatStart" className="form-check-label">Start</label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="initStatOptions"
              id="initStatNone"
              value="None"
              checked={form.level === "None"}
              onChange={(e) => updateForm({ level: e.target.value })}
            />
            <label htmlFor="initStatNone" className="form-check-label">None</label>
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
