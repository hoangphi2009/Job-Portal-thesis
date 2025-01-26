import AdminLeftBar from "./AdminLeftBar";
import AdminOverview from "./AdminOverview";


const AdminPage = () => {
  return (
    <div>
      <div className="flex min-h-screen">
        <AdminLeftBar />
        <div className="w-4/5 p-4 ">
        <AdminOverview />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

