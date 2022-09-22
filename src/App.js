import Login from './components/Login';
import Home from './components/Home';
import Layout from './components/Layout';
import Missing from './components/Missing';
import Unauthorized from './components/Unauthorized';
import LinkPage from './components/LinkPage';
import RequireAuth from './components/RequireAuth';
import { Routes, Route } from 'react-router-dom';
import Teachers from './components/Teachers';
import Students from './components/Students';
import Addteacher from './components/Addteacher';
import Addstudent from './components/Addstudent';
import TeachersToRequest from './components/TeachersToRequest';
import AdvisorRequests from './components/AdvisorRequests';
import AssignedStudents from './components/AssignedStudents';

const ROLES = {
  'Admin': 'Admin',
  'Student': 'Student',
  'Teacher': 'Teacher'
}

function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.Student,ROLES.Teacher,ROLES.Admin]} />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Student]} />}>
          <Route path="teacherstorequest" element={<TeachersToRequest />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Teacher]} />}>
          <Route path="advisorrequests" element={<AdvisorRequests />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Teacher]} />}>
          <Route path="assignedstudents" element={<AssignedStudents />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="addteacher" element={<Addteacher />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="addstudent" element={<Addstudent />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="teachers" element={<Teachers />} />
        </Route>

        <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
          <Route path="students" element={<Students />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;