import {AUTH, EMAIL, PASSWORD, REGISTER} from "../const/actionTypes"
import * as api from "../../api/index"


export const loadUser = () => async (dispath)=>{
    const localUser = JSON.parse(localStorage.getItem("user_info"))

    if(localUser){
        dispath({type: AUTH, data: localUser})
    }
}

export const signin = (data2, navigate) => async (dispath) =>{
    try{
        const {data} = await api.signIn(data2)

        dispath({type: AUTH, data})
        navigate("/hokieforu/account/home")
    }catch(err){
        console.log(err);
    }
}

export const signinGoogle = (accessToken, navigate) => async (dispatch)=>{
    try{
        // login user
        const {data} = await api.signInGoogle(accessToken)

        dispatch({type : AUTH, data})
        navigate("/hokieforu/account/home")
    }catch(err){
        console.log(err)
    }
}

export const signup = (formData, navigate) => async (dispatch)=>{
    try{
        // signup user
        const {data} = await api.signUp(formData)

        dispatch({type: REGISTER, data})
        navigate("/hokieforu/login")
    }catch(err){
        console.log(err)
    }
}

export const signupGoogle = (accessToken, navigate) => async (dispatch)=>{
    try{
        // signup user

        const {data} = await api.signUpGoogle(accessToken)

        dispatch({type : AUTH, data})
        navigate("/hokieforu/account/home")
    }catch(err){
        console.log(err)
    }
}


export const sendEmail = (email, navigate) => async (dispatch)=> {
    try {
        const {data} = await api.sendEmail(email);
        dispatch({type: EMAIL, data})
        navigate("/hokieforu/login");
    } catch (error) {
        console.log(error);
    }
}

export const createNewPassword = (request, navigate) => async (dispatch)=> {
    try {
        const {data} = await api.createNewPassword(request);
        dispatch({type: PASSWORD, data})
        navigate("/hokieforu/login");
    } catch (error) {
        console.log(error);
    }
}