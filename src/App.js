import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
// import Register from "./pages/Register";
// import Login from "./pages/Login";
// import Intakes from "./pages/Intakes";
// import Modules from "./pages/Modules";
// import ModuleByIntake from "./pages/ModuleByIntake";
// import ModuleById from "./pages/ModuleById";
// import StudentByid from "./pages/StudentByid";
// import IntakeById from "./pages/IntakeById";
// import Lecturers from "./pages/Lecturer";
// import Students from "./pages/Students";
// import LecturerHome from "./pages/LecturerHome";
// import myClasses from "./pages/MyClasses";
// import "./App.css";
// import Attendance from "./pages/Attendance.js";
// // import ValidateAccount from "./pages/ValidateAccount.js";
// import Dashboard from "./pages/Dashboard.js";

function App() {
  return (
    <Router>
      <Route path="/" exact={true} component={HomePage} />
      {/* <Route path="/home" exact={true} component={Dashboard} />
      <Route path="/register" exact={true} component={Register} />
      <Route path="/login" exact={true} component={Login} />
      <Route path="/intakes" exact={true} component={Intakes} />
      <Route path="/modules" exact={true} component={Modules} />
      <Route path="/lecturers" exact={true} component={Lecturers} />
      <Route path="/students" exact={true} component={Students} />
      <Route path="/myClasses" exact={true} component={myClasses} />
      <Route
        path="/modules/byIntakeId/:id"
        exact={true}
        component={ModuleByIntake}
      />
      <Route path="/modules/byId/:id" exact={true} component={ModuleById} />
      <Route
        path="/attendance/byClassId/:id"
        exact={true}
        component={Attendance}
      />
      <Route path="/lecturerHome" exact={true} component={LecturerHome} />
      <Route path="/student/byId/:id" exact={true} component={StudentByid} />
      <Route path="/intake/byId/:id" exact={true} component={IntakeById} />
      <Route
        path="/validateAccount/:id"
        exact={true}
        component={ValidateAccount}
      /> */}
    </Router>
  );
}

export default App;
