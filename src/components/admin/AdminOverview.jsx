import AdminContents from "./AdminContents";
import AdminGraph from "./AdminGraph";
import AdminNavbar from "./AdminNavbar";
import AdminTable from "./AdminTable";

const AdminOverview = () => {
  return (
    <div>
      <div className="sticky top-0 z-50 border-b bg-gray-200 shadow-md">
        <AdminNavbar />
      </div>
      <div className="p-4">
        <AdminContents />
      </div>
      <div>
        <AdminGraph />
      </div>
      <div>
        <AdminTable />
      </div>
    </div>
  );
};

export default AdminOverview;
