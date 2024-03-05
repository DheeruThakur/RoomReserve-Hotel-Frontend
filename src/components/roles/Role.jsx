import React, { useEffect, useState } from 'react'
import { getAllRoles , deleteRole} from '../utils/ApiFunctions';
import RoomFilter from '../common/RoomFilter';
import RoomPaginator from '../common/RoomPaginator';
import { Col, Row } from 'react-bootstrap';
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom';

const ExistingRoles = () => {
    const [roles, setRoles] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [rolesPerPage] = useState(8);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetchRoles();
    }, [])

    const fetchRoles = async () => {
        setIsLoading(true);
        try {
            const result = await getAllRoles();
            setRoles(result);
            setIsLoading(false);
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

    const calculateTotalPages = (rolesPerPage, roles) => {
        const totalRoles = roles.length;
        return Math.ceil(totalRoles / rolesPerPage);
    }

    const indexOfLastRole = currentPage * rolesPerPage;
    const indexOfFirstRole = indexOfLastRole - rolesPerPage;
    const currentRoles = roles.slice(indexOfFirstRole, indexOfLastRole);

    const handlePaginationClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    const handleDeleteRole = async (roleId) => {
        try {
            const result = await deleteRole(roleId);
            if (result === "") {
                setSuccessMessage(`Role with ID -  ${roleId} was deleted`);
                fetchRoles();
            } else {
                console.log(`Error deleting role : ${result.message}`)
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
            <div className='container col-md-8 col-lg-6'>
                {successMessage && <p className='alert alert-success mt-5'>{successMessage}</p>}

                {errorMessage && <p className='alert alert-danger mt-5'>{errorMessage}</p>}
            </div>
            {isLoading ? (
                <p>Loading existing roles</p>
            ) : (
                <>
                    <section className='mt-5 mb-5 container'>
                        <div className='d-flex justify-content-center mb-3 mt-5'>
                            <h2>Existing Roles</h2>
                        </div>
                        <Row>
                            <Col className='d-flex justify-content-end'>
                                <Link to={"/add-role"}>
                                    <FaPlus /> Add New Role
                                </Link>
                            </Col>
                        </Row>
                        <table className='table table-bordered table-hover'>
                            <thead>
                                <tr className='text-center'>
                                    <th>ID</th>
                                    <th>Role Name</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {currentRoles.map((role) => (
                                    <tr key={role.id} className='text-center'>
                                        <td>{role.id}</td>
                                        <td>{role.name}</td>
                                        <td className='gap-2'>
                                            {/* <Link to={`/edit-room/${room.id}`}>
                                                <span className='btn btn-info btn-sm'>
                                                    <FaEye />
                                                </span>
                                                <span className='btn btn-warning btn-sm'>
                                                    <FaEdit />
                                                </span>
                                            </Link> */}
                                            <button
                                                className='btn btn-danger btn-sm'
                                                onClick={() => handleDeleteRole(role.id)}>
                                                <FaTrashAlt />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <RoomPaginator currentPage={currentPage}
                            totalPages={calculateTotalPages(rolesPerPage, roles)}
                            onPageChange={handlePaginationClick} />
                    </section>
                </>
            )}

        </>
    )
}

export default ExistingRoles
