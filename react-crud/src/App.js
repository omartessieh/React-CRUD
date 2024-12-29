import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContactsTable from "./Components/ContactsTable";
import CreateContact from "./Components/CreateContact";
import EditContact from "./Components/EditContact";
import ViewDetails from "./Components/ViewDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ContactsTable />} />
        <Route path="/contact/create" element={<CreateContact />} />
        <Route path="/contact/edit/:id" element={<EditContact />} />
        <Route path="/contact/view/:id" element={<ViewDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
