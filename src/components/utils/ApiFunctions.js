import axios from "axios";

export const api = axios.create({
    baseURL : "http://localhost:5050"
})

export const getHeader = (contentType) => {
    const token = localStorage.getItem("token")
    return {
        Authorization : `Bearer ${token}`,
        "Content-Type" : contentType
    }
}

// this function add new room to the db
export async function addRoom(photo , roomType , roomPrice){
    const formData = new FormData();
    formData.append("photo" , photo);
    formData.append("roomType" , roomType);
    formData.append("roomPrice" , roomPrice);
    console.log(formData)
    const response = await api.post("/rooms/add/new-room" , formData ,{
		headers: getHeader("multipart/form-data")
	})
    return response.status === 201 ? true : false;
}

// this function gets all room types from db
export async function getRoomTypes(){
    try {
        const response = await api.get("/rooms/room-types");
        return response.data;
    } catch (error) {
        throw new Error("Error in fetching room types");
    }
}

// this function gets all the rooms from the database
export async function getAllRooms() {
    try {
        const result = await api.get("/rooms/all-rooms");
        return result.data;
    } catch (error) {
        throw new Error("Error fetching rooms");
    }
}

// this function delete the rooms by roomId from the database
export async function deleteRoom(roomId) { 
    try {
        const result = await api.delete(`/rooms/delete/room/${roomId}` ,{
            headers: getHeader("application/json")
        });
        return result.data;
    } catch (error) {
        throw new Error(`Error deleting rooms : ${error.message}`);
    }
}

// this function update the rooms by roomId.
export async function updateRoom(roomId , roomData) { 
    const formData = new FormData();
    formData.append("roomType" , roomData.roomType);
    formData.append("roomPrice" , roomData.roomPrice);
    formData.append("photo" , roomData.photo);
    const response = await api.put(`/rooms/update/${roomId}` , formData ,{
		headers: getHeader("application/json")
	});
    return response;
}

// this function gets room by its id.
export async function getRoomById(roomId) { 
    try {
        const result = await api.get(`/rooms/${roomId}`);
        return result.data;
    } catch (error) {
        throw new Error(`Error fetching room : ${error.message}`)
    }
}

/* This function saves a new booking to the databse */
export async function bookRoom(roomId, booking) {
	try {
		const response = await api.post(`/bookings/room/${roomId}/booking`, booking)
		return response.data
	} catch (error) {
		if (error.response && error.response.data) {
			throw new Error(error.response.data)
		} else {
			throw new Error(`Error booking room : ${error.message}`)
		}
	}
}

// this function gets all the bookings.
export async function getAllBookings() { 
    try {
        const result = await api.get("/bookings/all-bookings" ,{
            headers: getHeader("application/json")
        });
        return result.data;
    } catch (error) {
        throw new Error(`Error fetching bookings : ${error.message}`)
    }
}

// this function gets Booking By Confirmation Code.
export async function getBookingByConfirmationCode(confirmationCode) { 
    try {
        const result = await api.get(`/bookings/confirmation/${confirmationCode}`);
        return result.data;
    } catch (error) {
        if(error.response && error.response.data){
            throw new Error(error.response.data);
        } else {
            throw new Error(`Error find booking : ${error.message}`)
        }
    }
}

// this function cancels the booking
export async function cancelBooking(bookingId , username){
    try{
        const result = await api.delete(`/bookings/booking/${bookingId}/${username}/delete`)
        return result.data;
    } catch(error){
        throw new Error(`Error cancel booking : ${error.message}`)
    }
}

// this function returns all available room with a given checkIn , checkOut dates and roomType
export async function getAvailableRooms(checkInDate , checkOutDate , roomType){
    try {
        const result = await api.get(`/rooms/available-rooms?checkInDate=${checkInDate}&checkOutDate=${checkOutDate}&roomType=${roomType}`)
        console.log(result.data)
        return result.data
    } catch (error) {
        throw new Error(`Error fetching rooms : ${error.message}`)
    }
}

// This is the function to register a user
export async function registerUser(registration){
    try {
        
        const result = await api.post("/auth/register-user" , registration);
        return result.data;

    } catch (error) {
        if(error.response && error.response.data){
            throw new Error(error.response.data);
        } else {
            throw new Error(`User registration error : ${error.message}`)
        }
    }
}

// This is the function to login a user
export async function loginUser(login){
    try {
        
        const result = await api.post("auth/login" , login);
        if(result.status >= 200 && result.status < 300){
            return result.data;
        }
        return null;

    } catch (error) {
        console.error(error);
        return null
    }
}

// This is the function to get user profile
export async function getUserProfile(userId , token){
    try {
        
        const response = await api.get(`users/profile/${userId}` , {
            headers : getHeader("application/json")
        })
        return response.data;

    } catch (error) {
        throw error
    }
}

// This is the function to delete a single user
export async function deleteUser(userId){
    try {
        const response = await api.delete(`users/delete/${userId}` , {
            headers : getHeader("application/json")
        })
        return response.data;

    } catch (error) {
        return error.message;
    }
}

// This is the function to get a single user
export async function getUser(userId){
    try {
        
        const response = await api.get(`users/${userId}` , {
            headers : getHeader("application/json")
        })
        return response.data;

    } catch (error) {
        throw error
    }
}

/* This is the function to get user bookings by the user id */
export async function getBookingsByUserId(userId) {
	try {
		const response = await api.get(`/bookings/user/${userId}/bookings`, {
			headers: getHeader("application/json")
		})
		return response.data
	} catch (error) {
		console.error("Error fetching bookings:", error.message)
		throw new Error("Failed to fetch bookings")
	}
}

// this function gets all the roles from the database
export async function getAllRoles() {
    try {
        const result = await api.get("/roles/all-roles" , {
            headers : getHeader("application/json")
        });
        return result.data;
    } catch (error) {
        throw new Error("Error fetching roles");
    }
}

// This is the function to delete a role
export async function deleteRole(roleId){
    try {
        
        const response = await api.delete(`roles/delete/${roleId}` , {
            headers : getHeader("application/json")
        })
        return response.data;

    } catch (error) {
        return error.message;
    }
}

// this function add new role to the db
export async function addRole(role){
    const response = await api.post("/roles/create-new-role" , role ,{
		headers: getHeader("application/json")
	})
    return response.status === 201 ? true : false;
}

// this function gets all the users from the database
export async function getAllUsers() {
    try {
        const result = await api.get("/users/all-users" , {
            headers : getHeader("application/json")
        });
        return result.data;
    } catch (error) {
        throw new Error("Error fetching roles");
    }
}

// This function assign a role to user
export async function assignRoleToUser(userId , roleId){
    try {
        const queryParams = new URLSearchParams();
        queryParams.append("userId", userId);
        queryParams.append("roleId", roleId);
        
        const result = await api.post(`/roles/assign-role-to-user?${queryParams}`,{} , {
            headers : getHeader("application/json")
        });
        return result.data;
    } catch (error) {
        if(error.response && error.response.data){
            throw new Error(error.response.data);
        } else {
            throw new Error(`Assign role to user error : ${error.message}`)
        }
    }
}

// This function remove a role from user
export async function removeRoleFromUser(userId , roleId){
    try {
        const queryParams = new URLSearchParams();
        queryParams.append("userId", userId);
        queryParams.append("roleId", roleId);
        
        const result = await api.post(`/roles/remove-user-from-role?${queryParams}`,{} , {
            headers : getHeader("application/json")
        });
        return result.data;
    } catch (error) {
        if(error.response && error.response.data){
            throw new Error(error.response.data.message);
        } else {
            throw new Error(`Remove role from user error : ${error.message}`)
        }
    }
}
