import React, { Component } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import useAuth from "../hooks/useAuth";
import axios from '../api/axios';
import './styles.css'


const TEACHER_URL = '/teacher';

const ADVISOR_REQUEST_URL = 'advisor/request/send';

const TeachersToRequest = () => {

    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const { auth } = useAuth();


    const sendRequest = async (data) => {
        console.log(data)

        const teacherId = data.teacherId
        const studentId = auth?.id

        console.log(studentId)

        try {
            const response = await axios.post(ADVISOR_REQUEST_URL,
                JSON.stringify({ teacherId, studentId }),
                {
                    headers: {
                        'Authorization': 'Bearer ' + auth?.accessToken,
                        'Content-Type': 'application/json'
                    }
                }
            );
            
            console.log(JSON.stringify(response.data));
            // const accessToken = response?.data?.token;
            // const roles = [response?.data?.role];
            // setAuth({ userName, userPassword, roles, accessToken });
            // localStorage.setItem('students', JSON.stringify(response?.data))
            // navigate('/teachers')
        } catch (err) {
            // if (!err?.response) {
            //     setErrMsg('No Server Response');
            // } else if (err.response?.status === 400) {
            //     setErrMsg('Missing Username or Password');
            // } else if (err.response?.status === 401) {
            //     setErrMsg('Unauthorized');
            // } else {
            //     setErrMsg('Login Failed');
            // }
            // errRef.current.focus();
            console.log(err)
        }
    }


    const handleClick = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(TEACHER_URL,
                {
                    headers: { 'Authorization': 'Bearer ' + auth?.accessToken }
                }
            );
            console.log(JSON.stringify(response.data));
            // const accessToken = response?.data?.token;
            // const roles = [response?.data?.role];
            // setAuth({ userName, userPassword, roles, accessToken });
            localStorage.setItem('teachers', JSON.stringify(response?.data))
            // navigate('/teachers')
        } catch (err) {
            // if (!err?.response) {
            //     setErrMsg('No Server Response');
            // } else if (err.response?.status === 400) {
            //     setErrMsg('Missing Username or Password');
            // } else if (err.response?.status === 401) {
            //     setErrMsg('Unauthorized');
            // } else {
            //     setErrMsg('Login Failed');
            // }
            // errRef.current.focus();
            console.log(err)
        }
    }


    var teachers = JSON.parse(localStorage.getItem('teachers'));
    return (
        <div onLoad={handleClick}>
            <h1>Teachers To Request</h1><br />
            {teachers.map(teacher => <div className='teacher-item'>
                <span>Name : {teacher.teacherName}</span> <br/>
                <span>Phone : {teacher.phoneNumber}</span> <br/>
                <span>Email : {teacher.email}</span> <br/>
                <span>Department : {teacher.departmentName}</span> <br/>
                <button onClick={() => sendRequest(teacher)}>Send Reuest</button>
            </div>)}
        </div>
    )
}

export default TeachersToRequest
