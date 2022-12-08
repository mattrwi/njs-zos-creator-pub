import React, { useState } from "react";
import { useNavigate } from "react-router";
import RecordList from "./recordList";


var temp = null;
var agency = "DET";

export default function Auth() {

    const navigate = useNavigate();

    function checkResponseStatus(res) {
        if(res.ok){
            return res
        } else {
            throw new Error(`The HTTP status of the reponse: ${res.status} (${res.statusText})`);
        }
    }

    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
            return { ...prev, ...value };
        });
    }
    const [form, setForm] = useState({
        username: "",
        pass: ""
      });
    
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

    const onSubmit = (e) => {

        e.preventDefault();
        //console.log(form.username)        
        //console.log(form.pass)
        var cred = form.username + ":" + form.pass
        //console.log(cred)
        fetch('https://its1host.state.wi.us:4430/zosmf/services/authenticate', {
            method: 'POST',    
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json', 
                'Authorization': cred,
                'X-CSRF-ZOSMF-HEADER': ''
                
            }
        }).then(res => res.json())
          .then(json => console.log(json))
          .catch(err => console.log(err))
        
        fetch('https://its1host.state.wi.us:4430/zosmf/workflow/rest/1.0/workflows?system=ITS1&statusName=in-progress', {
            method: 'GET',    
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json', 
                'Access-Control-Allow-Origin': '*',
                'X-CSRF-ZOSMF-HEADER': ''
                
            }
        }).then(res => res.json())
          .then(json => console.log(json))
          .catch(err => console.log(err))       
        //alert("Test Test Test 123 abc")
        setForm({username: "", pass: ""});
        navigate("/auth");
    }

    return (
        <div>
            
            <h3>Please authenticate to z/OSMF to utilize this service!!!</h3>
            <div className="form-group">
            <label htmlFor="username">User name</label>
            <input
                type="text"
                style={{width: "200px"}}
                className="form-control"
                id="username"
                value={form.username}
                onChange={(e) => updateForm({ username: e.target.value })}
            />
            </div>
            <div className="form-group">
            <label htmlFor="pass">Password</label>
            <input
                type="password"
                style={{width: "200px"}}
                className="form-control"
                id="pass"
                value={form.pass}
                onChange={(e) => updateForm({ pass: e.target.value })}
            />
            </div>            
            <br></br>
            <button onClick={onSubmit}>Logon</button>
        </div>

    )
}