import axios from "axios"

const API = axios.create({ baseURL: "http://localhost:8000" })

API.interceptors.request.use((req) => {
    if (localStorage.getItem("user_info")) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("user_info")).token}`
    }

    return req;
})

export const signIn = (data) => API.post("/users/signin", data)
export const signInGoogle = (accessToken) => API.post("/users/signin", {
    googleAccessToken: accessToken
})

export const signUp = (data) => API.post("/users/signup", data)
export const signUpGoogle = (accessToken) => API.post("/users/signup", {
    googleAccessToken: accessToken
})

export const sendEmail = (data) => API.post("/users/forgot-password", data)
export const createNewPassword = (data) => API.post(`/users/reset-password/${data.id}/${data.token}`, data)
export const userDetails = (data) => API.post('/users/details',data)
export const updateUserDetails = (data) => API.post('/users/update',data)

export const postJob = (data) => API.post(`/jobs/post-job`,data)
export const getJob = (data) => API.post(`/jobs/user-posted-jobs`,data)
export const getJobById = (data) => API.post(`/jobs/fetch-jobById`,data)
export const editJobDetails = (data) => API.post(`/jobs/edit-job-details`,data)
export const deleteJobDetails = (data) => API.post(`/jobs/delete-job-details`,data)

export const getUserPickedJobs = (data) => API.post(`/jobs/user-picked-jobs`,data)
export const getAllJobs = (data) => API.get(`/jobs/fetch-jobs`)
export const pickJob = (data) => API.post(`/jobs/pick-job`,data)

