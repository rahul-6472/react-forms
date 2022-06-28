import {useState,useEffect} from "react";
import "./Form.css"


const Form = () => {


  const [formData, setFormData] = useState({});
  const [employees, setEmployees] = useState([])
  const [error,setError] = useState(false)
  const [loading,setLoading] = useState(false)


  const getEmployees = () =>{
    setLoading(true)

    fetch(`http://localhost:4000/employees`)
    .then((res) => (res.json()))
    .then ((res)=>{
       setError(false)
       setEmployees(res)
    })
    .catch((error)=>{
      setError(true)
      setEmployees([])
    })
    .finally(()=>{
      setLoading(false)
    })
  }

  useEffect(()=>{
       getEmployees()
  },[])


 

 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ename || !age || !salary || !dept || !address){
      alert("all fields are mandatory!")
    }
    else{
    setLoading(true)
    fetch(`http://localhost:4000/employees`,{
      method:"POST",
      body: JSON.stringify(formData),
      headers:{
        "Content-Type":"application/json"
      }
    }).then ((res) =>(res.json()))
    .then ((res)=>{
      return getEmployees()
    })
    .catch((error)=>{
      setError(true)
    })
    .finally(()=>{
      setLoading(false)
    })
 
  };
 }

 const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData({ ...formData, [name]: value });
};
 const { ename, age, salary, dept, address } = formData;
  
     
  return loading ? <h1>loading....</h1> : error ? <h1>error</h1> : ( 
  <>
  <h1>Employee Form</h1>
  <form onSubmit={handleSubmit}>
        <label>Employee Name:</label>
        <input
          type="text"
          placeholder="enter name"
          name="ename"
          value={ename}
          onChange={handleChange}
        />

        <br/>
        <br/>

        <label>Age:</label>
        <input
          type="number"
          placeholder="enter age"
          name="age"
          value={age}
          onChange={handleChange}
        />


        <br/>
        <br/>


        <label>Address:</label>
        <input
          type="text"
          placeholder="enter address"
          name="address"
          value={address}
          onChange={handleChange}
        />
       

        <br/>
        <br/>

        <label>Salary:</label>
        <input
          type="number"
          placeholder="enter salary"
          name="salary"
          value={salary}
          onChange={handleChange}
        />

        <br/>
        <br/>

        <label>Department:</label>
        <select value={dept} name="dept" onChange={handleChange}>
          <option>Accounts</option>
          <option>Engineering</option>
          <option>Sales & Marketing</option>
          <option>Operations</option>
        </select>

        {/* <label>Married:</label>
             <input type = "checkbox" /> */}

            <br/>
            <br/>

        <input type="submit" value="submit" className ="submit"/>
      </form>

     <br/>
     <br/>
   
    
   {

      <table>
        
        <thead>
                 <tr>
                   <th>id</th>

                   <th>Name</th>

                   <th>Age</th>

                   <th>Dept</th>

                   <th>salary</th>

                   <th>address</th>
                 </tr>
        </thead>

        <tbody>
               {employees.map((employee) => (<tr key = {employee.id}>
                 <td>{employee.id}</td>
                 <td>{employee.ename}</td>
                 <td>{employee.age}</td>
                 <td>{employee.dept}</td>
                 <td>{employee.salary}</td>
                 <td>{employee.address}</td>
               </tr>))}
        </tbody>

      </table>
     }   
    </>
  )
}

export default Form
