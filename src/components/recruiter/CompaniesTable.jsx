import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Delete, Edit2, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import DeleteCompanyDialog from "./DeleteCompanyDialog";


const CompaniesTable = () => {
  const { companies, searchCompanyByText } = useSelector(
    (store) => store.company
  );
  const [searchCompany, setSearchCompany] = useState([]);
  const [open, setOpen] = useState(false);
  const [companyIdToDelete, setCompanyIdToDelete] = useState(null);

  useEffect(() => {
    const searchedCompany =
      companies.length > 0
        ? companies.filter((company) =>
            company?.name
              ?.toLowerCase()
              .includes(searchCompanyByText?.toLowerCase() || "")
          )
        : [];
    setSearchCompany(searchedCompany);
  }, [searchCompanyByText, companies]);

  const navigate = useNavigate();

  const handleOpenDialog = (companyId) => {
    setCompanyIdToDelete(companyId);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setCompanyIdToDelete(null);
  };

  const handleConfirmDelete = async () => {
    try {
      setOpen(false);
      axios.defaults.withCredentials = true;
      const res = await axios.delete(
        `${COMPANY_API_END_POINT}/delete/${companyIdToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message || "Company deleted successfully!");
        setSearchCompany((prevCompanies) =>
          prevCompanies.filter((company) => company._id !== companyIdToDelete)
        );
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "An error occurred while deleting the company."
      );
      console.error("Error deleting company:", error);
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of your companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Company Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {searchCompany.map((company) => (
            <TableRow key={company._id}>
              <TableCell>
                <Avatar>
                  <AvatarImage src={company.logo} />
                </Avatar>
              </TableCell>
              <TableCell>{company.name}</TableCell>
              <TableCell>{company.createdAt.split("T")[0]}</TableCell>
              <TableCell className="text-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    <div
                      onClick={() =>
                        navigate(`/recruiter/companies/${company._id}`)
                      }
                      className="flex items-center gap-2 w-fit cursor-pointer"
                    >
                      <Edit2 className="w-4 h-4 mr-2" />
                      <span>Edit</span>
                    </div>
                    <div
                      onClick={() => handleOpenDialog(company._id)}
                      className="flex items-center gap-2 w-fit cursor-pointer"
                    >
                      <Delete className="w-4 h-4 mr-2" />
                      <span>Delete</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <DeleteCompanyDialog
        open={open}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default CompaniesTable;
