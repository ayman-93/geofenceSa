import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
 
import axios from '../utils/axios';
import ReactTable from '../utils/ReactTable'
import { EditIcon, DeleteIcon, AddIcon } from '../style/icons.js'
 
 
const UserManagement = ({ history }) => {
    const [tableData, settableData] = useState([]);
    const [loading, setLoading] = useState(true);
 
    const getUsers = () => {
        axios.get("users").then(({ data }) => settableData(data))
    }
 
    const deleteUser = (userId) => {
        axios.delete(`users/${userId}`).then(() => getUsers()).catch(err => console.log(err))
    }
 
    const columns = [
        {
            Header: "National Id",
            accessor: "nationalId"
        },
        {
            Header: "Name",
            accessor: "firstname",
            Cell: (row) => row.original.firstname + " " + row.original.lastname
        },
        {
            Header: "Violations",
            accessor: "violations",
            Cell: (row) => row.original.violations.length
        },
        {
            Header: "Actions",
            accessor: "_id",
            Cell: (row) => {
                return <>
                    <Link to={`userManagement/editUser/${row.original._id}`} className='btn icon mr-2' ><EditIcon /></Link>
                    <button className='btn' onClick={() => deleteUser(row.original._id)}><DeleteIcon /></button>
                </>
            }
        }
    ]
    useEffect(() => {
        axios.get("users")
            .then(({ data }) => {
                settableData(data)
                setLoading(false)
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <div style={{ display: 'flex', flexDirection: "column" }}>
 
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h1>User Mangemnt </h1>
                <button className='btn' onClick={() => history.push('/userManagement/addUser')}><AddIcon /></button>
            </div>
            <ReactTable
                loading={loading}
                data={tableData}
                columns={columns}
            />
 
 
 
        </div>
    )
}
 
export default UserManagement;