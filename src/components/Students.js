import React, { Component } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import useAuth from "../hooks/useAuth";
import axios from '../api/axios';
import './styles.css'


const STUDENT_URL = '/student';

const Students = () => {

    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const { auth } = useAuth();

    const deleteStudent = async (data) => {
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

    const deactivateStudent = async (data) => {
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

    // const getAllStudents = async (e) => {
    //     e.preventDefault();

    //     try {
    //         const response = await axios.get(STUDENT_URL,
    //             {
    //                 headers: { 'Authorization': 'Bearer ' + auth?.accessToken }
    //             }
    //         );
    //         console.log(JSON.stringify(response.data));
    //         // const accessToken = response?.data?.token;
    //         // const roles = [response?.data?.role];
    //         // setAuth({ userName, userPassword, roles, accessToken });
    //         localStorage.setItem('students', JSON.stringify(response?.data))
    //         // navigate('/teachers')
    //     } catch (err) {
    //         // if (!err?.response) {
    //         //     setErrMsg('No Server Response');
    //         // } else if (err.response?.status === 400) {
    //         //     setErrMsg('Missing Username or Password');
    //         // } else if (err.response?.status === 401) {
    //         //     setErrMsg('Unauthorized');
    //         // } else {
    //         //     setErrMsg('Login Failed');
    //         // }
    //         // errRef.current.focus();
    //         console.log(err)
    //     }
    // }


    // getAllStudents()

    var students = JSON.parse(localStorage.getItem('students'));
    return (
        <div>
            <h1>Students</h1><br />
            {students.map(student => <div className='teacher-item'>
                <span>Name : {student.studentName}</span> <br />
                <span>Phone : {student.phoneNumber}</span> <br />
                <span>Email : {student.email}</span> <br />
                <span>Department : {student.departmentName}</span> <br />
                <button onClick={() => deleteStudent(student)}>Delete</button>
                <button onClick={() => deactivateStudent(student)}>Disable</button>
            </div>)}
        </div>
    )
}

export default Students