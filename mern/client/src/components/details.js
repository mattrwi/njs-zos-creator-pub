import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";



const Component = (props) => (
    <tr>
    <td>
        <input
            type="text"
            className="form-control"
            id="id"
            placeholder={props.component.appComponent}
            readOnly={true}                                
        />
    </td>
    <td>
        <input
            type="text"
            className="form-control"
            id="id"            
            placeholder={props.component.appPort}
            readOnly={true}                                
        />
    </td>
    <td>
        <input
            type="text"
            className="form-control"
            id="id"
            placeholder={props.component.appLocation}
            readOnly={true}                                
        />
    </td>              
    <td>
        <input
            type="text"
            className="form-control"
            id="id"
            placeholder={props.component.npmScript}
            readOnly={true}                                
        />
    </td>    
    <td>
        <input
            type="text"
            className="form-control"
            id="id"
            placeholder="Deploying"
            readOnly={true}                                
        />
    </td>              
    <td>
        <input
            type="text"
            className="form-control"
            id="id"
            placeholder="Down (Deploying)"
            readOnly={true}                                
        />
    </td>        
    </tr>
  );


export default function Details() {      
    //var an = ""
    
      const [form, setForm] = useState({
        appname: "",
        appDeployStatus: "",
        description: "",
        gitRepoUrl: "",
        initAutoStat: "",
      });      

    const params = useParams();
    const navigate = useNavigate();
    
    //const appNameS = useState({value})

    const [records, setRecords] = useState([]);
    const [components, setComponents] = useState([]);

    /*const [appComponents, setComponents] = useState([
        {appComponent: 'temp', appLocation: 'Execution directory', npmScript: 'npm script'}
    ]);*/

    /*const handleFormChange = (index, event) => {
        let data = [...appComponents];
        data[index][event.target.name] = event.target.value;
        setComponents(data);
     }*/

     /*const addComponent = () => {
        let newComponent = {appComponent: 'temp', appLocation: 'Execution directory', npmScript: 'npm script' }

        setComponents([...appComponents, newComponent])
    }*/

   /* const removeComponent = (index) => {
        let data = [...appComponents];
        data.splice(index, 1)
        setComponents(data)
    }*/
        

    const onSubmit = (e) => {
        e.preventDefault();        
        navigate("/");
    }

    
    // These methods will update the state properties.
    function updateForm(value) {
        return setForm((prev) => {
          return { ...prev, ...value };
        });
        }

    useEffect(() => {
        async function fetchData() {
          const id = params.id.toString();
          const response = await fetch(`http://its1host:8000/record/${params.id.toString()}`);
    
          if (!response.ok) {
            const message = `An error has occured: ${response.statusText}`;
            window.alert(message);
            return;
          }
    
          const record = await response.json();
          if (!record) {
            window.alert(`Record with id ${id} not found`);
            navigate("/");
            return;
          }
          setRecords(record);

          const component = record.appComponents
          setComponents(component)
    
          //setForm(record);
          console.log(record.appname)
          //an = record.appname
          //this.state = {appNameS: record.appname};
          //this.setState({appNameS: record.appname});
          //var de = record.description
          //var gr = record.gitRepoUrl        
        }
    
        fetchData();
    
        return;
      }, [params.id, navigate]);    


    // This method will map out the records on the table
    /*function componentList() {        
        for (var i = 1; i < 5; i++){
            var x = 2;
        }
        var contents = "<tr><td>exdir1</td><td>npms1</td></tr>"
        return (            
            <div>{contents}</div>        
        );
    } */     


    // This method will map out the records on the table
    function componentList() {
        return components.map((component) => {
        return (
            <Component
            component={component}            
            />
        );
        });
    }

    return (
        <div>
            <h3>Application Details</h3>            
            <div className="form-group">
                <table>
                    <tr>
                        <td><label htmlFor="appname">App name</label></td><label htmlFor="appname">App Deployment Status</label><td></td>
                    </tr>
                    <tr>
                        <td>
                        <input
                            type="text"
                            className="form-control"
                            id="appname"
                            placeholder={records.appname}
                            readOnly={true}
                            value={form.appname}
                            onChange={(e) => updateForm({ appname: e.target.value })}
                        />
                        </td>
                        <td>
                        <input
                            type="text"
                            className="form-control"
                            id="appDeployStatus"
                            placeholder="Deploying"
                            readOnly={true}
                            value={form.appDeployStatus}
                            onChange={(e) => updateForm({ appDeployStatus: e.target.value })}
                        />
                        </td>
                    </tr>
                </table>
            


            </div>
            <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
                type="text"
                className="form-control"
                id="description"
                placeholder={records.description}
                readOnly={true}
                value={form.discription}
                onChange={(e) => updateForm({ description: e.target.value })}
            />
            </div>            
            <div className="form-group">
            <label htmlFor="gitRepoUrl">Git repository url</label>
            <input
                type="text"
                className="form-control"
                id="gitRepoUrl"
                placeholder={records.gitRepoUrl}
                readOnly={true}                
                value={form.gitRepoUrl}
                onChange={(e) => updateForm({ gitRepoUrl: e.target.value })}
            />
            </div>    
            <div>
                <label htmlFor="appComponents">App Components</label>
                <table>
                    <tr><td>ID</td><td>Port</td><td>Exec Dir</td><td>npm script</td><td>Deployment Status</td><td>System Status</td></tr>
                    {componentList()}    
                </table>                 
            </div>            
            <button onClick={onSubmit}>Close</button>
        
        </div>
    );

}