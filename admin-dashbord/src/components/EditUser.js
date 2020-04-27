import React, { useEffect, useState } from 'react'
import { useParams } from "react-router";

import axios from '../utils/axios'
import ReactTable from '../utils/ReactTable'
import { DeleteIcon } from '../style/icons.js'


const EditUser = (props) => {
    const { id: userId } = useParams();
    const [user, setUser] = useState({
        assaignHostpital: "",
        firstname: "",
        lastname: "",
        homeLocation: { lat: "", lng: "" },
        nationalId: 0,
        password: "",
        radiusInMeter: 0,
        userTemperature: [],
        violations: [],
        _id: ""
    })


    const hanleChange = (event) => {
        console.log(event.target.id);
        let { id, value } = event.target

        if (id.includes(".")) {
            // for objects
            id = id.split('.')
            const [propertie, key] = id;
            setUser(prevUser => {
                prevUser[propertie][key] = value
                return { ...prevUser }
            })
        } else {
            console.log("user[id] ", user[id]);
            setUser(prevUser => {
                prevUser[id] = value
                return { ...prevUser }
            })
        }
    }

    const removeViolation = (violationId) => {
        console.log("violationId ", violationId);

        axios.delete(`users/${userId}/${violationId}`).then(({ data: user }) => setUser(user)).catch(err => console.log(err))
    }

    const submit = () => {
        axios.put(`users/${userId}`, user).then(({ data }) => {
            console.log("dataaaa", data);
            setUser(data);
            props.history.goBack()
        }).catch(e => console.log(e))
    }


    useEffect(() => {
        console.log(userId);

        axios.get(`users/${userId}`)
            .then(({ data: user }) => setUser(user))
            .catch(err => console.log(err))
    }, [userId])
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
                <div className="form-group col-md-6">
                    <label htmlFor="password">User Record Temperature</label>
                    <ReactTable loading={false}
                        data={user.userTemperature}
                        columns={[{
                            Header: "Temperature",
                            accessor: "temperature"
                        }, {
                            Header: "Time",
                            accessor: "recordDate"
                        }]}
                    />
                    {/* <input type="text" className="form-control" id="password" onChange={hanleChange} value={user.password} placeholder="Last Name" /> */}
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
            <div className="form-row">
                <legend>Violations</legend>
                <ReactTable data={user.violations} columns={[{ Header: "Violation Type", accessor: "type" }, { Header: "Time", accessor: "time" }, {
                    Header: "Action",
                    accessor: "_id",
                    Cell: (row) => <button className='btn icon' onClick={() => removeViolation(row.original._id)}><DeleteIcon /></button>
                }]} />
            </div>


            {/*                
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="inputCity">City</label>
                        <input type="text" className="form-control" id="inputCity" />
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="inputState">State</label>
                        <select id="inputState" className="form-control">
                            <option selected>Choose...</option>
                            <option>...</option>
                        </select>
                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="inputZip">Zip</label>
                        <input type="text" className="form-control" id="inputZip" />
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck" />
                        <label className="form-check-label" htmlFor="gridCheck">
                            Check me out
                    </label>
                    </div>
                </div> */}
            <div className="d-flex justify-content-end mt-5">
                <button className="btn btn-primary mr-3" onClick={() => props.history.goBack()}>Back</button>
                <button onClick={submit} className="btn btn-danger mr-5">Save</button>
            </div>
            {/* </form> */}
        </div>
    )
}

export default EditUser;