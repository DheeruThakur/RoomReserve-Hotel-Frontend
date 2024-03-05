import React, { useState } from 'react'

const UserSearch = ({ data, setFilteredData }) => {
    // const[filter , setFilter] = useState("");

    // const handleSelectChange = (e) => {
    //     const selectedRoomType = e.target.value;
    //     setFilter(selectedRoomType);
    //     const filteredRooms = data.filter((room) => room.roomType.toLowerCase().includes(selectedRoomType.toLowerCase()))
    //     setFilteredData(filteredRooms);
    // }

    // const clearFilter = () => {
    //     setFilter("");
    //     setFilteredData(data);
    // }

    // const roomTypes = ["" , ...new Set(data.map((room) => room.roomType))]

    const [userName, setUserName] = useState('');

    const handleSearchInput = (event) => {
        setUserName(event.target.value);
    };

    const performSearch = () => {
        const filteredResults = data.filter(item =>
            item.firstName.toLowerCase() === userName.toLowerCase()
        );
        setFilteredData(filteredResults);
    };

    return (
        // <div className='input-group mb-3'>
        //   <span className='input-group-text' id='room-type-filter'>Filter rooms by type</span>
        //   <select className='form-select' value={filter} onChange={handleSelectChange}>
        //     <option value={""}>Select a room type to filter....</option>
        //     {roomTypes.map((type , index) => (
        //         <option key={index} value={String(type)}>
        //             {String(type)}
        //         </option>
        //     ))}
        //   </select>
        //   <button className='btn btn-hotel' type='button' onClick={clearFilter}>Clear Filter</button>
        // </div>

        <div>
            <input
                type="text"
                placeholder="Enter first name of user"
                value={userName}
                onChange={handleSearchInput}
            />
            <button onClick={performSearch}>Search</button>
        </div>
    )
}

export default UserSearch
