import React, { Component } from 'react'
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import useAuth from "../hooks/useAuth";
import axios from '../api/axios';
import './styles.css'

const REMOVE_STUDENT_URL = '/advisor/delete';

const AssignedStudents = () => {

    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const { auth } = useAuth();


    const remove = async (data) => {
        console.log(data)

        const studentId = data.studentId
        const teacherId = auth?.id

        console.log(studentId)

        try {
            const response = await axios.delete(REMOVE_STUDENT_URL,
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



    var students = JSON.parse(localStorage.getItem('assigned-students'));
    return (
        <div >
            <h1>Teachers To Request</h1><br />
            {students.map(student => <div className='teacher-item'>
                <span>Name : {student.studentName}</span> <br/>
                <span>Phone : {student.phoneNumber}</span> <br/>
                <span>Email : {student.email}</span> <br/>
                <span>Department : {student.departmentName}</span> <br/>
                <button onClick={() => remove(student)}>Remove</button>
            </div>)}
        </div>
    )
}

export default AssignedStudents
