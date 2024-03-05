import React, { useEffect, useState } from 'react'
import { getAllUsers, deleteUser } from '../utils/ApiFunctions';
import RoomPaginator from '../common/RoomPaginator';
import { Col, Row } from 'react-bootstrap';
import { FaPlus, FaTrashAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import UserSearch from './UserSearch';
import AssignRole from './AssignRole';
import RemoveRole from './RemoveRole';

const User = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(8);
    const [isLoading, setIsLoading] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedUserName, setSelectedUserName] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [assignRoleData, setAssignRoleData] = useState(null);
    const [removeRoleData, setRemoveRoleData] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, [assignRoleData , removeRoleData])

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const result = await getAllUsers();
            setUsers(result);
            setIsLoading(false);
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    useEffect(() => {
        if (selectedUserName === "") {
            setFilteredUsers(users)
        }
        setCurrentPage(1);
    }, [users, selectedUserName])

    const calculateTotalPages = (filteredUsers, usersPerPage, users) => {
        const totalUsers = filteredUsers.length > 0 ? filteredUsers.length : users.length;
        return Math.ceil(totalUsers / usersPerPage);
    }

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const handleAssignRole = async (username, userId) => {
        setAssignRoleData({ username, userId });
    };

    const handleRemoveRole = async (username, userId) => {
        setRemoveRoleData({ username, userId });
    };

    const handleDeleteAccount = async (username) => {
        try {
            const confirmed = window.confirm(
                "Are you sure you want to delete this user? This action cannot be undone."
            )
            if (confirmed) {
                const result = await deleteUser(username);
                if (result === "User deleted successfully") {
                    setSuccessMessage(`User with Username -  ${username} was deleted`);
                    fetchUsers();
                } else {
                    console.log(`Error deleting user : ${result.message}`)
                }
            }

        } catch (error) {
            setErrorMessage(error.message);
        }
        setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
        }, 3000);
    }


    return (
        <>
            {assignRoleData ? (
                <AssignRole userName={assignRoleData.username} userId={assignRoleData.userId} setAssignRoleData={setAssignRoleData}/>
            ) : removeRoleData ? (
                <RemoveRole userName={removeRoleData.username} userId={removeRoleData.userId} setRemoveRoleData={setRemoveRoleData}/>
            ) : (
                <>
                    <div className='container col-md-8 col-lg-6'>
                        {successMessage && <p className='alert alert-success mt-5'>{successMessage}</p>}
                        {errorMessage && <p className='alert alert-danger mt-5'>{errorMessage}</p>}
                    </div>
                    {isLoading ? (
                        <p>Loading existing users</p>
                    ) : (
                        <section className='mt-5 mb-5 container'>
                            <div className='d-flex justify-content-center mb-3 mt-5'>
                                <h2>Existing Users</h2>
                            </div>
                            <Row >
                                <Col md={6} className="mb-3 mb-md-0">
                                    <UserSearch data={users} setFilteredData={setFilteredUsers} />
                                </Col>
                                <Col md={12} className='d-flex justify-content-end'>
                                    <Link to={"/register"}>
                                        <FaPlus /> Add New User
                                    </Link>
                                </Col>
                            </Row>
                            <table className='table table-bordered table-hover'>
                                <thead>
                                    <tr className='text-center'>
                                        <th>ID</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Username</th>
                                        <th>Password</th>
                                        <th>Roles</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentUsers.map((user) => (
                                        <tr key={user.id} className='text-center'>
                                            <td>{user.id}</td>
                                            <td>{user.firstName}</td>
                                            <td>{user.lastName}</td>
                                            <td>{user.email}</td>
                                            <td>{user.password}</td>
                                            <td>
                                                <ul className="list-unstyled">
                                                    {user.roles.map((role) => (
                                                        <li key={role.id} className="card-text">
                                                            {role.name}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </td>
                                            <td>
                                                <div className="d-flex gap-2">
                                                    <button
                                                        className='btn btn-danger btn-sm'
                                                        onClick={() => handleDeleteAccount(user.email)}>
                                                        <FaTrashAlt />
                                                    </button>
                                                    <button
                                                        className='btn btn-hotel btn-sm'
                                                        onClick={() => handleAssignRole(user.email, user.id)}>
                                                        Assign Role
                                                    </button>
                                                    <button
                                                        className='btn btn-hotel btn-sm'
                                                        onClick={() => handleRemoveRole(user.email, user.id)}>
                                                        Remove Role
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <RoomPaginator
                                currentPage={currentPage}
                                totalPages={calculateTotalPages(filteredUsers, usersPerPage, users)}
                                onPageChange={handlePaginationClick}
                            />
                        </section>
                    )}
                </>
            )}
        </>
    );
}

export default User
