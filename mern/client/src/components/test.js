import React, { useState } from "react";
import { useNavigate } from "react-router";
import RecordList from "./recordList";


var temp = null;

export default function Test() {

    //TEST TEST TEST

    //RecordList();

    (async () => {
        const response = await fetch(`http://its1host:8000/record/components`);
        //console.log(response)
        if (!response.ok) {
          const message = `An error occured: ${response.statusText}`;
          window.alert(message);
        }
        
        const records = await response.json();
        //const records = response.JSON
        
        //console.log(records)
        
        var appComps = JSON.parse(JSON.stringify(records))
        console.log(appComps)
        for (var i = 0; i < appComps.length; i++) {
            //var cId = appComps.appComponents[i].componentId;
            //console.log(appComps[i]);
            for (var j = 0; j <appComps[i].appComponents.length; j++) {
                console.log(appComps[i].appComponents[j].componentId)
                temp = appComps[i].appComponents[j].componentId
            }
        }

    })();

    const [form, setForm] = useState({
        appname: "",
        gitRepoUrl: "",
        initAutoStat: "",
      });

    const [appComponents, setComponents] = useState([
        {componentId: temp, appLocation: 'test/location', npmScript: 'start-test'}
    ]); 
    
    const handleFormChange = (index, event) => {
        let data = [...appComponents];
        data[index][event.target.name] = event.target.value;
        setComponents(data);
     }
    
     const addComponent = () => {
        let newComponent = { componentId: temp, appLocation: 'test', npmScript: 'test-script' }
    
        setComponents([...appComponents, newComponent])
    }

    const removeComponent = (index) => {
        let data = [...appComponents];
        data.splice(index, 1)
        setComponents(data)
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

   // console.log(appComponents)
    // When a post request is sent to the create url, we'll add a new record to the database.
    const newApp = { ...form, appComponents};
    const tv = JSON.stringify(newApp)
   // console.log(tv)
     

    await fetch("http://its1host:8000/record/add", {
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

    //setForm({ appid: "", appname: "", status: "" });
    //navigate("/");    
  }


    return (
        <div>
            <h3>Create new Application</h3>      
            <div className="form-group">
            <label htmlFor="appname">App name</label>
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
            <label htmlFor="appComponents">App components</label>
                {appComponents.map((input, index) => {
                    return (
                        <div key={index}>
                            {temp}
                            
                            <input
                                name='appLocation'                                
                                placeholder='test'
                                value={input.appLocation}
                                //value=
                                onChange={event => handleFormChange(index, event)}
                            />
                            <input
                                name='npmScript'
                                placeholder='test-script'
                                value={input.npmScript}
                                onChange={event => handleFormChange(index, event)}
                            />
                            <button onClick={() => removeComponent(index)}>Remove</button>
                        </div>
                    )
                })}
                <button onClick={addComponent}>Add Component</button>                     
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
                    checked={form.initAutoStat === "Stop"}
                    onChange={(e) => updateForm({ initAutoStat: e.target.value })}
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
                    checked={form.initAutoStat === "Start"}
                    onChange={(e) => updateForm({ initAutoStat: e.target.value })}
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
                    checked={form.initAutoStat === "None"}
                    onChange={(e) => updateForm({ initAutoStat: e.target.value })}
                    />
                    <label htmlFor="initStatNone" className="form-check-label">None</label>
                </div>
                </div>
            <button onClick={onSubmit}>Submit</button>
        </div>
    )
}