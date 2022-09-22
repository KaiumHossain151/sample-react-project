import React, { Component } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import useAuth from "../hooks/useAuth";
import axios from '../api/axios';
import './styles.css'


const TEACHER_URL = '/teacher';

const Teachers = () => {

    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const { auth } = useAuth();


    const deleteTeacher = async (data) => {
        console.log(data)

        // try {
        //     const response = await axios.get(STUDENT_URL,
        //         {
        //             headers: { 'Authorization': 'Bearer ' + auth?.accessToken }
        //         }
        //     );
        //     console.log(JSON.stringify(response.data));
        //     // const accessToken = response?.data?.token;
        //     // const roles = [response?.data?.role];
        //     // setAuth({ userName, userPassword, roles, accessToken });
        //     localStorage.setItem('students', JSON.stringify(response?.data))
        //     // navigate('/teachers')
        // } catch (err) {
        //     // if (!err?.response) {
        //     //     setErrMsg('No Server Response');
        //     // } else if (err.response?.status === 400) {
        //     //     setErrMsg('Missing Username or Password');
        //     // } else if (err.response?.status === 401) {
        //     //     setErrMsg('Unauthorized');
        //     // } else {
        //     //     setErrMsg('Login Failed');
        //     // }
        //     // errRef.current.focus();
        //     console.log(err)
        // }
    }

    const deactivateTeacher = async (data) => {
        console.log(data)

        // try {
        //     const response = await axios.get(STUDENT_URL,
        //         {
        //             headers: { 'Authorization': 'Bearer ' + auth?.accessToken }
        //         }
        //     );
        //     console.log(JSON.stringify(response.data));
        //     // const accessToken = response?.data?.token;
        //     // const roles = [response?.data?.role];
        //     // setAuth({ userName, userPassword, roles, accessToken });
        //     localStorage.setItem('students', JSON.stringify(response?.data))
        //     // navigate('/teachers')
        // } catch (err) {
        //     // if (!err?.response) {
        //     //     setErrMsg('No Server Response');
        //     // } else if (err.response?.status === 400) {
        //     //     setErrMsg('Missing Username or Password');
        //     // } else if (err.response?.status === 401) {
        //     //     setErrMsg('Unauthorized');
        //     // } else {
        //     //     setErrMsg('Login Failed');
        //     // }
        //     // errRef.current.focus();
        //     console.log(err)
        // }
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
        <div>
            <h1>Teachers</h1><br />
            {teachers.map(teacher => <div className='teacher-item'>
                <span>Name : {teacher.teacherName}</span> <br/>
                <span>Phone : {teacher.phoneNumber}</span> <br/>
                <span>Email : {teacher.email}</span> <br/>
                <span>Department : {teacher.departmentName}</span> <br/>
                <button onClick={() => deleteTeacher(teacher)}>Delete</button>
                <button onClick={() => deactivateTeacher(teacher)}>Disable</button>
            </div>)}
        </div>
    )
}

export default Teachers
