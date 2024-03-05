import React, { useState } from "react"
import { addRole } from "../utils/ApiFunctions"
import { Link } from "react-router-dom"

const AddRole = () => {
	const [newRole, setNewRole] = useState({
		name: ""
	})

	const [successMessage, setSuccessMessage] = useState("")
	const [errorMessage, setErrorMessage] = useState("")

	const handleRoleInputChange = (e) => {
		let value = e.target.value
		setNewRole({ ...newRole, name: value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		try {
			const success = await addRole(newRole)
			if (success !== undefined) {
				setSuccessMessage("A new role was  added successfully !")
				setNewRole({ name: ""})
				setErrorMessage("")
			} else {
				setErrorMessage("Error adding new role")
			}
		} catch (error) {
			setErrorMessage(error.message)
		}
		setTimeout(() => {
			setSuccessMessage("")
			setErrorMessage("")
		}, 3000)
	}

	return (
		<>
			<section className="container mt-5 mb-5">
				<div className="row justify-content-center">
					<div className="col-md-8 col-lg-6">
						<h2 className="mt-5 mb-2">Add a New Role</h2>
						{successMessage && (
							<div className="alert alert-success fade show"> {successMessage}</div>
						)}

						{errorMessage && <div className="alert alert-danger fade show"> {errorMessage}</div>}

						<form onSubmit={handleSubmit}>
							<div className="mb-3">
								<label htmlFor="roleName" className="form-label">
									Role Name
								</label>
								<input
									required
									type="text"
									className="form-control"
									id="roleName"
									name="roleName"
									value={newRole.name}
									onChange={handleRoleInputChange}
								/>
							</div>

						
							<div className="d-grid gap-2 d-md-flex mt-2">
								<Link to={"/existing-roles"} className="btn btn-outline-info">
									Existing roles
								</Link>
								<button type="submit" className="btn btn-outline-primary ml-5">
									Save Role
								</button>
							</div>
						</form>
					</div>
				</div>
			</section>
		</>
	)
}

export default AddRole