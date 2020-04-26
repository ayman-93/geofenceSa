import React, { useEffect, useState } from 'react'
// import { useParams } from "react-router";
 
import axios from '../utils/axios'
// import ReactTable from '../utils/ReactTable'
// import { DeleteIcon } from '../style/icons.js'
 
 
const AddUser = (props) => {
    // const { id: userId } = useParams();
    const [user, setUser] = useState({
        assaignHostpital: "",
        firstname: "",
        lastname: "",
        homeLocation: { lat: "", lng: "" },
        nationalId: 0,
        password: "",
        radiusInMeter: 0,
        userTemperature: [],
        violations: []
    })
 
 
    const hanleChange = (event) => {
        console.log(event.target.id);
        let { id: properties, value } = event.target
 
        console.log("propertie befor", properties);
        if (properties.includes(".")) {
            // for objects
            let objPropertie = properties.split('.')
            console.log("propertie after", objPropertie);
 
            const [propertie, key] = objPropertie;
            setUser(prevUser => {
                prevUser[propertie][key] = value
                return { ...prevUser }
            })
        } else {
            console.log("user[propertie] ", user[properties]);
            setUser(prevUser => {
                prevUser[properties] = value
                return { ...prevUser }
            })
        }
    }
 
    // const removeViolation = (violationId) => {
    //     console.log("violationId ", violationId);
 
    //     axios.delete(`users/${userId}/${violationId}`).then(({ data: user }) => setUser(user)).catch(err => console.log(err))
    // }
 
    const submit = () => {
        axios.post('users/', user).then(({ data }) => {
            // console.log("dataaaa", data);
            // setUser(data);
            props.history.goBack()
        }).catch(e => console.log(e))
    }
 
 
    useEffect(() => {
        // console.log(userId);
 
        // axios.get(`users/${userId}`)
        //     .then(({ data: user }) => setUser(user))
        //     .catch(err => console.log(err))
    }, [])
    return (
        <div>
            <h1>Edit {user.firstname} {user.lastname} Information</h1>
            <br />
            {/* <form> */}
            <div className="form-row">
                <legend>Personal Information</legend>
                <div className="form-group col-md-6">
                    <label htmlFor="nationalId">National Id</label>
                    <input type="text" className="form-control" id="nationalId" onChange={hanleChange} value={user.nationalId} placeholder="National Id" />
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="firstname">First Name</label>
                    <input type="text" className="form-control" id="firstname" onChange={hanleChange} value={user.firstname} placeholder="First Name" />
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="lastname">Last Name</label>
                    <input type="text" className="form-control" id="lastname" onChange={hanleChange} value={user.lastname} placeholder="Last Name" />
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="assaignHostpital">Assigned Hospital</label>
                    <input type="text" className="form-control" id="assaignHostpital" onChange={hanleChange} value={user.assaignHostpital} placeholder="Last Name" />
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="password">Password</label>
                    <input type="text" className="form-control" id="password" onChange={hanleChange} value={user.password} placeholder="Last Name" />
                </div>
            </div>
            <div className="form-row">
                <legend>Home Location</legend>
                <div className="form-group col-md-6">
                    <label htmlFor="homeLocation.lat">Latitude</label>
                    <input type="text" className="form-control" id="homeLocation.lat" onChange={hanleChange} value={user.homeLocation.lat} placeholder="1234 Main St" />
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="homeLocation.lng">Longitude</label>
                    <input type="text" className="form-control" id="homeLocation.lng" onChange={hanleChange} value={user.homeLocation.lng} placeholder="1234 Main St" />
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="readi">Radius In Meter</label>
                    <input type="text" className="form-control" id="radiusInMeter" onChange={hanleChange} value={user.radiusInMeter} placeholder="1234 Main St" />
                </div>
            </div>
            <div className="d-flex justify-content-end mt-5">
                <button className="btn btn-primary mr-3" onClick={() => props.history.goBack()}>Back</button>
                <button onClick={submit} className="btn btn-danger mr-5">Add</button>
            </div>
            {/* </form> */}
        </div>
    )
}
 
export default AddUser;