import { AUTH, AUTH_ERROR, EMAIL, PASSWORD, REGISTER } from "../const/actionTypes"
import * as api from "../../api/index"


export const loadUser = () => async (dispath) => {
    const localUser = JSON.parse(localStorage.getItem("user_info"))

    if (localUser) {
        dispath({ type: AUTH, data: localUser })
    }
}

export const signin = (data2, navigate) => async (dispatch) => {
    try {
        const { data } = await api.signIn(data2)
        dispatch({ type: AUTH, data })
        navigate("/hokieforu/account/home")

    } catch (error) {
        console.log(error);
        dispatch({ type: AUTH_ERROR, errorMessage: error.response.data.message })
    }

}

export const signinGoogle = (accessToken, navigate) => async (dispatch) => {
    try {
        // login user
        const { data } = await api.signInGoogle(accessToken)

        dispatch({ type: AUTH, data })
        navigate("/hokieforu/account/home")
    } catch (err) {
        console.log(err)
    }
}

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        // signup user
        const { data } = await api.signUp(formData)

        dispatch({ type: REGISTER, data })
        navigate("/hokieforu/register")
    } catch (err) {
        console.log(err);
        dispatch({ type: AUTH_ERROR, errorMessage: err.response.data.message })

    }
}

export const signupGoogle = (accessToken, navigate) => async (dispatch) => {
    try {
        // signup user

        const { data } = await api.signUpGoogle(accessToken)

        dispatch({ type: AUTH, data })
        navigate("/hokieforu/account/home")
    } catch (err) {
        console.log(err)
    }
}

export const sendEmail = (email, navigate) => async (dispatch) => {
    try {
        const { data } = await api.sendEmail(email);
        dispatch({ type: EMAIL, data })
        navigate("/hokieforu/login");
    } catch (error) {
        console.log(error);
    }
}

export const createNewPassword = (request, navigate) => async (dispatch) => {
    try {
        const { data } = await api.createNewPassword(request);
        dispatch({ type: PASSWORD, data })
        navigate("/hokieforu/login");
    } catch (error) {
        console.log(error);
    }
}

export const postJob = (request, navigate) => async (dispatch) => {
    try {
        const { data } = await api.postJob(request);
        console.log(request)
        dispatch({ type: 'REGISTER', data });
        navigate("/hokieforu/account/post-a-job");
    } catch (error) {
        console.log(error);
    }
}

export const getUserDetails = (request, navigate) => async (dispatch) => {
    try {
        console.log(request);
        const { data } = await api.userDetails(request);
        console.log(data)
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const updateUserDetails = (request, navigate) => async (dispatch) => {
    try {
        const { data } = await api.updateUserDetails(request);
        dispatch({ type: 'REGISTER', data })
        navigate("/hokieforu/account/myprofile");
    } catch (error) {
        console.log(error);
    }
}

export const getJobDetails = (request, navigate) => async (dispatch) => {
    try 
    {
        const {data} = await api.getJob(request);
        return data;
    } 
    catch (error) {
        console.log(error);
    }
}

export const getAllJobDetails = () => async (dispatch) => {
    try {
        const { data } = await api.getAllJobs();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const pickJob = (request, navigate) => async (dispatch) => {
    try {
        const { data } = await api.pickJob(request);
        console.log(request)
        dispatch({ type: '', data })
        alert('Job Picked Successfully');
        navigate("/hokieforu/account/home");
    } catch (error) {
        console.log(error);
    }
}