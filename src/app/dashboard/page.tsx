// import { getServerSession } from "next-auth";
// import { options } from "../api/auth/[...nextauth]/route";
// import { redirect } from "next/navigation";

const Dashboard = async () => {
  // const session = await getServerSession(options);
  // if (!session) {
  //   redirect("/api/auth/signin");
  // }
  return <div>Dashboard</div>;
};

export default Dashboard;
