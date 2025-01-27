import AttendanceChart from "@/app/components/AttendanceChart";
import CountChart from "@/app/components/CountChart";
import FinanceChart from "@/app/components/FinanceChart";
import UserCard from "@/app/components/UserCard";
import { config } from "../../config";

const AdminPage = () => {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      {/* LEFT */}
      <div className="w-full  flex flex-col gap-8 -mt-3">
        {/* USER CARDS */}
        <div className="w-full flex flex-col gap-8 ">
          <UserCard />
        </div>
        {/* MIDDLE CHARTS */}
        <div className="flex gap-4 flex-col lg:flex-row -mt-3">
          {/* COUNT CHART */}
          {/* <div className="w-full lg:w-1/3 h-[450px]">
            <CountChart/>
          </div> */}
          {/* ATTENDANCE CHART */}
          <div className="w-full  h-[500px]">
            <AttendanceChart />
          </div>
        </div>
        {/* BOTTOM CHART */}
        <div className="w-full h-[500px]">
          <FinanceChart />
        </div>
      </div>
      {/* RIGHT */}
      <div className=""></div>
    </div>
  );
};
export default AdminPage;