import React, { useEffect, useState } from "react"
import {removeRoleFromUser, getUser } from "../utils/ApiFunctions"

const RemoveRole = ({userName , userId , setRemoveRoleData}) => {

    const[roles , setRoles] = useState([])
    const[roleId , setRoleId] = useState(null)

    const[selectRole , setSelectRole] = useState("");
    const [successMessage, setSuccessMessage] = useState("")
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        const fetchRoles = async () => {
			try {
                const result = await getUser(userName);
				setRoles(result.roles);
			} catch (error) {
				setErrorMessage(error.message);
			}
		}
		fetchRoles()
    } , [selectRole])


    const handleSubmit = async (e) => {
    	e.preventDefault()
    	try {
    		const success = await removeRoleFromUser(userId, roleId)
    		if (success !== undefined) {
    			setSuccessMessage(`${selectRole} role was removed successfully to user with username ${userName}`)
    			setErrorMessage("")
                setSelectRole("")
    		} else {
    			setErrorMessage(`Error removing ${selectRole} role`)
    		}
    	} catch (error) {
    		setErrorMessage(error.message)
    	}
    	setTimeout(() => {
    		setSuccessMessage("")
    		setErrorMessage("")
    	}, 3000)
    }

    const handleSelectChange = (e) => {
        const selectedRole = e.target.value;
        setSelectRole(selectedRole);
        const role = roles.find(r => r.name === selectedRole);
        if (role) {
            setRoleId(role.id);
        }
    }

    const handleClick = () => {
        setRemoveRoleData(null)
    }

    return (
        <>
            <section className="container mt-5 mb-5">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <h2 className="mt-5 mb-2">Remove Role From User</h2>
                        {successMessage && (
                            <div className="alert alert-success fade show"> {successMessage}</div>
                        )}

                        {errorMessage && <div className="alert alert-danger fade show"> {errorMessage}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="userName" className="form-label">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="userName"
                                    name="userName"
                                    value={userName}
                                    readOnly
                                />
                            </div>

                            <div className='input-group mb-3'>
                                <span className='input-group-text' id='role-type-filter'>Choose the Role</span>
                                <select className='form-select' value={selectRole} onChange={handleSelectChange}>
                                    <option value={""}>Select a Role....</option>
                                    {roles.map((role, index) => (
                                        <option key={role.id} value={role.name}>
                                            {role.name}
                                        </option>
                                    ))}
                                </select>
                            </div>


                            <div className="d-grid gap-2 d-md-flex mt-2">
                                <button  className="btn btn-outline-primary ml-5" onClick={handleClick}>
                                    Existing Users
                                </button>
                                <button type="submit" className="btn btn-outline-primary ml-5">
                                    Save Remove
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default RemoveRole
