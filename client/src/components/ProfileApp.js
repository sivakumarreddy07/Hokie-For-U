import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getUserDetails } from '../redux/actions/auth';
import { updateUserDetails } from '../redux/actions/auth';
import AuthGuard from "./AuthGuard";
import Notification from './Notification';
import '../css/ProfileApp.css';

const InitState = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    profilePicture: ''
};

const ProfileApp = () => {
    const nagivate = useNavigate();
    const dispatch = useDispatch();
    const [sForm, setsForm] = useState(InitState);
    const [photo, setPhoto] = useState();
    const [selectedFile, setSelectedFile] = useState('');
    const [showNotification, setShowNotification] = useState(false);


    async function fetchData() {
        const userDetails = JSON.parse(localStorage.getItem('user_info'));
        const response = await dispatch(getUserDetails({ userEmail: userDetails.result.email }, nagivate));
        setsForm(response);
        if (response.profilePicture.includes("http")) {
            setPhoto(response.profilePicture);
        }
        else if (response.profilePicture.length === 0) {
            setPhoto("/images/avatar.png");
        }
        else {
            setPhoto("http://localhost:8000/images/" + response.profilePicture);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setsForm({
            ...sForm,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            // Create a FileReader to read the selected file
            const reader = new FileReader();

            reader.onload = (e) => {
                // Update the state with the selected file and its data URL
                setSelectedFile({
                    file,
                    previewURL: e.target.result,
                });
                setPhoto(e.target.result);
                setsForm({
                    ...sForm,
                    profilePicture: file
                });
            };

            reader.readAsDataURL(file);
        } else {
            // Clear the selected file if the input is cleared
            setSelectedFile(null);
        }
    };

    function delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (sForm.firstName !== "" && sForm.lastName !== "" && sForm.phoneNumber !== "" && sForm.email !== "") {
            const formData = new FormData();
            formData.append('lastName', sForm.lastName);
            formData.append('phoneNumber', sForm.phoneNumber);
            formData.append('profilePicture', sForm.profilePicture);
            formData.append('email', sForm.email);
            formData.append('firstName', sForm.firstName);
            try {
                const response = await dispatch(updateUserDetails(formData, nagivate));
                if (response && response.profilePicture) {
                    setPhoto("http://localhost:8000/images/" + response.profilePicture);
                }
                setShowNotification(true);
                setTimeout(() => {
                    setShowNotification(false);
                }, 3000);
            } catch (error) {
                console.log(error);
            }
        }
    };
    return (
        <div className="app-profile">
            {showNotification && (
                <Notification
                    message="Profile Details Updated Successfully!"
                    onClose={() => setShowNotification(false)}
                />
            )}
            <h1>My Profile</h1>
            <form className='profile-form'>
                <div className='details-user'>
                    <div className='box-input'>
                        <span>First Name:</span>
                        <input
                            type="text"
                            name="firstName"
                            value={sForm.firstName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className='box-input'>
                        <span>Last Name:</span>
                        <input
                            type="text"
                            name="lastName"
                            value={sForm.lastName}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className='box-input'>
                        <span>Contact Number:</span>
                        <input
                            type="tel"
                            name="phoneNumber"
                            value={sForm.phoneNumber}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                </div>
                <div className='details-user'>
                    <div className='box-input-one'>
                        <span>Profile</span>
                        <div className='image'>
                            <img src={photo} alt='Profile' />
                            <label for='profile-upload'><i className='fa fa-camera'></i></label>
                            <input type='file' id='profile-upload' name="profilePicture" onChange={handleFileChange} required hidden />
                        </div>
                    </div>
                    <div className='box-input' id='box-input'>
                        <span>Email:</span>
                        <input
                            type="email"
                            name="email"
                            value={sForm.email}
                            required
                            disabled
                        />
                    </div>
                </div>
                <button type="button" className='save-button' onClick={handleSubmit}>
                    Save
                </button>
            </form>
        </div>
    );
};

export default AuthGuard(ProfileApp);
