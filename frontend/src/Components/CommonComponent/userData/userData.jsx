import React, {useState, useEffect} from "react";
import axios from 'axios'
import Loader from "../../Loader/Loader";
import './userData.css';

const UserData = () => {
  const [loader, setLoader] = useState(true);       //loader rendering
  const [user, setUsers] = useState([]);         //set user data
  const [formData, setFormData] = useState({     //set form data
    firstName: '',
    lastName: '',
    age: '',
    phoneNumber: '',
    email: ''
  });
  const [userId, setUserId] = useState("");      //set userId for update user API
  const [count, setCount] = useState({});        //to store count details
  const [errors, setErrors] = useState({ 
    firstName: '',
    lastName: '',
    age: '',
    phoneNumber: '',
    email: '' 
  });                                           //to maintain errors
  const [userDataAddSuccess, setUserDataAddSuccess] = useState(false);       //unset Add user success message
  const [userDataUpdateSuccess, setUserDataUpdateSuccess] = useState(false);  //unset Update user success message

  // Function to fetch users data
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/getuser');
    //   console.log('resp', response);
      setUsers(response.data.userData[0]);
      setUserId(response.data.userData[0]._id)
    //   setCount({ addCount: response.data.count.addCount, updateCount:response.data.count.updateCount })
    setCount(response.data.count[0]);
      setLoader(false);
      console.log("false donw")
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  //fetching user details once the page is loaded
  useEffect(() => {
    fetchUsers();
  }, []);

  //setting the success message of user data being added to false after 5 seconds
  useEffect(() => {
    setTimeout(() => {
      setUserDataAddSuccess(false);
    }, 5000)
  }, [userDataAddSuccess])

  //setting the success message of user data being updated to false after 5 seconds
  useEffect(() => {
    setTimeout(() => {
      setUserDataUpdateSuccess(false);
    }, 5000)
  }, [userDataUpdateSuccess])


  // Function to handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear error message when input changes
  };

// Function to handle add button click
  const handleAdd = async () => {
    if (!validateForm()) return; // Validate form before adding user
    try {
      await axios.post('http://localhost:5000/api/users/add', formData);
      fetchUsers(); // Refetch users data after adding
      setUserDataAddSuccess(true);
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  // Function to handle update button click
  const handleUpdate = async () => {
    if (!validateForm()) return; // Validate form before updating user
    try {
      await axios.put(`http://localhost:5000/api/users/update/${userId}`, formData);
      fetchUsers(); // Refetch users data after updating
      setUserDataUpdateSuccess(true);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

    // Function to validate form inputs
    const validateForm = () => {
      let isValid = true;
      const errorsCopy = { ...errors };
  
      if (!formData.firstName.trim()) {
        errorsCopy.firstName = 'First Name is required';
        isValid = false;
      }
  
      if (!formData.lastName.trim()) {
        errorsCopy.lastName = 'Last Name is required';
        isValid = false;
      }
  
      if (!/^\d{2}$/.test(formData.age) || isNaN(formData.age)) {
        errorsCopy.age = 'Age must be a number of 2 digits';
        isValid = false;
      }
      
      if (!/^\d{10}$/.test(formData.phoneNumber) || isNaN(formData.phoneNumber)) {
        errorsCopy.phoneNumber = 'Phone Number must be a number of 10 digits';
        isValid = false;
      }
  
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        errorsCopy.email = 'Invalid Email';
        isValid = false;
      }
  
      setErrors(errorsCopy);
      return isValid;
    };

    return(
        <>
          <div className="userdata-section-container">
            {loader ? (
              <Loader />
            ) : (

              <div className="user-info">
                {/* display count and user data section */}
                <div style={{border:'1px solid black', padding:'5px 10px'}}>
                  <h2>User details</h2>
                  <p>Full Name: <b>{user.firstName} {user.lastName}</b></p>
                  <p>Age: <b>{user.age}</b></p>
                  <p>Phone: <b>{user.phoneNumber}</b></p>
                  <p>e-mail: <b>{user.email}</b></p>
                </div>
                <div style={{border:'1px solid black', padding:'5px 10px'}}>
                  <p>Add Count: <b>{count.addCount}</b></p>
                  <p>Update Count: <b>{count.updateCount}</b></p>
                  <p>Total Count: <b>{parseInt(count.updateCount) + parseInt(count.addCount)}</b></p>
                </div>
              </div>
            )}
            {/* form section */}
            <div className="user-data-form">
              FirstName: * <input type="text" name="firstName" placeholder="First Name" onChange={handleInputChange} />
              {errors.firstName && <span className="error">{errors.firstName}</span>}
              LastName: * <input type="text" name="lastName" placeholder="Last Name" onChange={handleInputChange} />
              {errors.lastName && <span className="error">{errors.lastName}</span>}
              Age: * <input type="text" name="age" placeholder="Age" onChange={handleInputChange} />
              {errors.age && <span className="error">{errors.age}</span>}
              Phone: * <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleInputChange} />
              {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
              e-mail: * <input type="text" name="email" placeholder="Email" onChange={handleInputChange} />
              {errors.email && <span className="error">{errors.email}</span>}
              <div className="form-button-container">
                <button onClick={handleAdd}>Add</button>
                <button onClick={handleUpdate}>Update</button>
              </div>
            </div>
            { userDataAddSuccess && <p className="green-validation">User Data Added successfully</p>}
            { userDataUpdateSuccess && <p className="green-validation">User Data Updated successfully</p>}
          </div>
        </>
    )
}

export default UserData;