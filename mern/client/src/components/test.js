import React, { useState } from "react";
import { useNavigate } from "react-router";
import RecordList from "./recordList";


var temp = null;
var agency = "DET";

export default function Test() {

    const navigate = useNavigate();

    //TEST TEST TEST test test

    //RecordList();

   /* (async () => {
        const response = await fetch(`http://its1host:8000/record/components`);
        //console.log(response)
        if (!response.ok) {
            const message = `An error occured: ${response.statusText}`;
            window.alert(message);
        }

        const records = await response.json();
        //const records = response.JSON
        //console.log(records)
        var appComps = JSON.parse(JSON.stringify(records));
        console.log(appComps);
        for (var i = 0; i < appComps.length; i++) {
            //var cId = appComps.appComponents[i].componentId;
            //console.log(appComps[i]);
            for (var j = 0; j < appComps[i].appComponents.length; j++) {
                console.log(appComps[i].appComponents[j].componentId);
                temp = appComps[i].appComponents[j].componentId;
            }
        }

    })();*/

    const hexToDecimal = hex => parseInt(hex, 16);
    const decimalToHex = dec => Math.abs(dec).toString(16);

    const [form, setForm] = useState({
        appname: "",
        description: "",
        gitRepoUrl: "",
        initAutoStat: "",
      });

    const [appComponents, setComponents] = useState([
        //{appComponent: 'temp', appLocation: 'Execution directory', npmScript: 'npm script'}
        {appComponent: 'temp', appLocation: '', npmScript: ''}
    ]);

    const handleFormChange = (index, event) => {
        let data = [...appComponents];
        data[index][event.target.name] = event.target.value;
        setComponents(data);
     }

     const addComponent = () => {
        //let newComponent = {appComponent: 'temp', appLocation: 'Execution directory', npmScript: 'npm script' }
        let newComponent = {appComponent: 'temp', appLocation: '', npmScript: '' }

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

    const onCancel = (e) => {
    e.preventDefault();
    navigate("/");
    }

  // This function will handle the submission.
  async function onSubmit(e) {
    

    // --   
    const response = await fetch(`http://its1host:8000/record/components`);
    //console.log(response)
    if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
    }

    const records = await response.json();
    //const records = response.JSON
    //console.log(records)
    var appComps = JSON.parse(JSON.stringify(records));
    console.log(appComps);


    for (var i = 0; i < appComps.length; i++) {
        //var cId = appComps.appComponents[i].componentId;
        //console.log(appComps[i]);
        for (var j = 0; j < appComps[i].appComponents.length; j++) {
            console.log(appComps[i].appComponents[j].appComponent);
            temp = appComps[i].appComponents[j].appComponent;
        }
    }  

    if(temp == null) {
        temp = "NJSDET00"
    }

    console.log("Create application submitted")
    console.log("------------------------------------")    
    
    var increment = 1
    var nextCompID = ""
    var lastCompIDDec= null    
    var lastCompID = temp.substring(6.8)
    var tempCompID = 0 
    //loop 
    if (appComponents.length == 0) {
        alert("No application components specified. You must specify atleast one application component")
        return
    }
    for (var l = 0; l < appComponents.length; l++) {                
        if (appComponents[l].appLocation === "Execution directory" || appComponents[l].appLocation === "") {
            tempCompID = l + 1
            alert("Execution directory not specified for component " + tempCompID + ". Specify Execution directory or remove component")
            return
        }
        if (appComponents[l].npmScript === "npm script" || appComponents[l].npmScript === "") {
            tempCompID = l + 1
            alert("npm script not specified for component " + tempCompID + ". Specify npm script or remove component")
            return
        }
        /*if (appComponents[l].npmScript === "" || appComponents[l].appLocation === "") {
            tempCompID = l + 1
            alert("npm script not specified for component " + tempCompID + ". Specify npm script or remove component")
            return
        }*/
        console.log("last component ID = " + lastCompID)            
        lastCompIDDec = hexToDecimal(lastCompID)
        nextCompID = decimalToHex(lastCompIDDec + increment)        
        console.log("next component id for component #" + increment + " = " + nextCompID)
        nextCompID = "NJS" + agency + String(nextCompID).padStart(2,'0')
        appComponents[l].appComponent = nextCompID
        lastCompID = nextCompID.substring(6,8)
        //increment++
    }
    console.log(appComponents)

    console.log("------------------------------------")



    e.preventDefault();

   // console.log(appComponents)
    // When a post request is sent to the create url, we'll add a new record to the database.
    const newApp = { ...form, appComponents};
    const tv = JSON.stringify(newApp)
   // console.log(tv)


    const result = await fetch("http://its1host:8000/record/add", {
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

    const data = await result.json();
    console.log(data)

    
    //setForm({ appid: "", appname: "", status: "" });
    alert("Application added to deployment queue")
    setForm({appname: "", description: "", gitRepoUrl: "", initAutoStat: ""});
    navigate("/details/" + data.insertedId);
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
            <label htmlFor="description">Description</label>
            <input
                type="text"
                className="form-control"
                id="description"
                value={form.description}
                onChange={(e) => updateForm({ description: e.target.value })}
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
                            <input
                                name='appLocation'
                                placeholder='Execution directory'
                                value={input.appLocation}
                                //value=
                                onChange={event => handleFormChange(index, event)}
                            />
                            <input
                                name='npmScript'
                                placeholder='Defaut script'
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
            <button onClick={onSubmit}>Deploy</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    )
}
