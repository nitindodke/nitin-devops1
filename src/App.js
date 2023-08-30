import "./App.css";
import { Route, Routes, useParams } from "react-router-dom";
import MainLayout from "./components/MainLayout";
// import Section from '../src/components/Section';
import SectionOld from "./components/SectionOld";

import SendMsg from "./components/SendMsg";
import Records from "./components/Records";
import Login from "./components/Login";
import NewRecords from "./components/NewRecords";
import AdminLayout from "./Layout/AdminLayout";
import AdminHome from "./components/Admin/AdminHome";
import EditForm from "./components/Admin/EditForm";
import SearchAndDropdown from "./components/Admin/SearchAndDropdown";
import UserForm from "./components/UserForm";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* <Route path='/' element={<Section/>} /> */}
          <Route path="/:grampanchayat" element={<SectionOld />} />
          <Route path="/home" element={<UserForm />} />
          {/* <Route path="/home" element={<SendMsg />} /> */}
          {/* <Route path='/admin/records' element={<Records/>} /> */}
        </Route>

        <Route path="/admin" element={<Login />}></Route>

        <Route path="/dashboard" element={<AdminLayout />}>
          <Route path="/dashboard/records" element={<NewRecords />} />
          <Route path="/dashboard" element={<AdminHome />} />
          <Route path="/dashboard/search" element={<SearchAndDropdown />} />
          <Route path="/dashboard/editform" element={<EditForm />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
