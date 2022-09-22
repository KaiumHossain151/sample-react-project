import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import useAuth from "../hooks/useAuth";

import axios from '../api/axios';
const TEACHER_URL = '/teacher';
const STUDENT_URL = '/student';

const REQUESTS_URL = '/advisor/request';
const ASSIGNED_STUDENTS_URL = 'teacher/assigned/students';

const Home = () => {
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const { auth } = useAuth();


    const getAllTeachers = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(TEACHER_URL,
                {
                    headers: { 'Authorization':'Bearer '+auth?.accessToken }
                }
            );
            console.log(JSON.stringify(response.data));
            // const accessToken = response?.data?.token;
            // const roles = [response?.data?.role];
            // setAuth({ userName, userPassword, roles, accessToken });
            localStorage.setItem('teachers',JSON.stringify(response?.data))
            if(auth?.roles?.includes('Student')){
                navigate('/teacherstorequest')
            }else{
                navigate('/teachers')
            }
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


    const getAllStudents = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(STUDENT_URL,
                {
                    headers: { 'Authorization': 'Bearer ' + auth?.accessToken }
                }
            );
            console.log(JSON.stringify(response.data));
            // const accessToken = response?.data?.token;
            // const roles = [response?.data?.role];
            // setAuth({ userName, userPassword, roles, accessToken });
            localStorage.setItem('students', JSON.stringify(response?.data))
            navigate('/students')
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


    

    const getAllAdvisorRequests = async (e) => {
        e.preventDefault();


        const userId = auth?.id
        const userMail = auth?.userName

        console.log(userId)
        console.log(auth?.accessToken)

        try {
            const response = await axios.post(REQUESTS_URL,
                JSON.stringify({ userId, userMail }),
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
            localStorage.setItem('advisor-requests', JSON.stringify(response?.data))
            navigate('/advisorrequests')
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


    const getAssignedStudents = async (e) => {
        e.preventDefault();


        const userId = auth?.id
        const userMail = auth?.userName

        console.log(userId)
        console.log(auth?.accessToken)

        try {
            const response = await axios.post(ASSIGNED_STUDENTS_URL,
                JSON.stringify({ userId, userMail }),
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
            localStorage.setItem('assigned-students', JSON.stringify(response?.data))
            navigate('/assignedstudents')
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

    const logout = async () => {
        // if used in more components, this should be in context 
        // axios to /logout endpoint 
        setAuth({});
        localStorage.clear()
        navigate('/linkpage');
    }

    if(auth?.roles?.includes('Admin')){
        return (
            <section>
                <h1>Dashboard</h1>
                <br />
                <p>You are logged in as Admin!</p>
                <br />
                <Link to="/addteacher">Add Teacher</Link>
                <br />
                
                <Link to="/addstudent">Add Student</Link>
                <br />
                <Link to="/students" onClick={getAllStudents}>All Students</Link>

                <Link to="/teachers" onClick={getAllTeachers}>All Teachers</Link>

                <br />
                <div className="flexGrow">
                    <button onClick={logout}>Sign Out</button>
                </div>
            </section>
        )
    }else if(auth?.roles?.includes('Teacher')){
        return (
            <section>
                <h1>Home</h1>
                <br />
                <p>Hello {auth?.name}, You are logged in as Teacher!</p>
                <br />
                <Link to="/advisorrequests" onClick={getAllAdvisorRequests}>Advisor Requests</Link><br />
                <Link to="/assignedstudents" onClick={getAssignedStudents}>Assigned Students</Link>
                <br />
                <div className="flexGrow">
                    <button onClick={logout}>Sign Out</button>
                </div>
            </section>
        )
    }else{
        return (
            <section>
                <h1>Home</h1>
                <br />
                <p>Hello {auth?.name}, You are logged in as Student!</p>
                <br />
                <Link to="/teacherstorequest" onClick={getAllTeachers}>Teachers To Request</Link>
                <br />
                <div className="flexGrow">
                    <button onClick={logout}>Sign Out</button>
                </div>
            </section>
        )
    }
}

export default Home
