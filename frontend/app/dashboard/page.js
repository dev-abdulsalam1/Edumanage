"use client"
import FetchError from "@/components/FetchError";
import Loader from "@/components/Loader";
import RecentActivity from "@/components/RecentActivity";
import { useGetStudentQuery } from "@/redux/features/studentApi";
import { useGetteachersQuery } from "@/redux/features/teacherApi";
import { Users, GraduationCap, ChartSpline, Activity } from "lucide-react";


export default function DashboardHome() {
    const { data: students, isLoading, isError, refetch } = useGetStudentQuery();

    if (isLoading) return <Loader />
    if (isError) return <FetchError refetch={refetch} message="⚠️ Error loading data!" />;
    return (
        <div className=" w-full mt-0">
            {/* Welcome Section */}
            {/* <DashboardNavbar /> */}
            <section className="mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-green-500">
                    Welcome back, Admin!
                </h1>
                <p className="mt-2 text-gray-600 text-base md:text-lg">
                    Here's a summary of school activities today!
                </p>
            </section>

            {/* Dashboard Summary Cards */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Students */}
                <div className="bg-white shadow-md rounded-lg p-5 flex flex-col items-center hover:shadow-xl transition-shadow">
                    <Users className="w-10 h-10 p-1 rounded-xl text-green-500 mb-2 bg-green-100" />
                    <span className="text-gray-400 text-sm">Total Students</span>
                    <span className="text-2xl font-bold text-gray-800 mt-2">{students?.length}</span>
                </div>

                {/* Total Teachers */}
                <div className="bg-white shadow-md rounded-lg p-5 flex flex-col items-center hover:shadow-xl transition-shadow">
                    <GraduationCap className="w-10 h-10 p-1 rounded-xl text-green-500 mb-2 bg-green-100" />
                    <span className="text-gray-400 text-sm">Total Teachers</span>
                    <span className="text-2xl font-bold text-gray-800 mt-2">85</span>
                </div>

                {/* New Registrations */}
                <div className="bg-white shadow-md rounded-lg p-5 flex flex-col items-center hover:shadow-xl transition-shadow">
                    <ChartSpline className="w-10 h-10 p-1 rounded-xl text-green-500 mb-2 bg-green-100" />
                    <span className="text-gray-400 text-sm">Attendence Rate</span>
                    <span className="text-2xl font-bold text-gray-800 mt-2">12%</span>
                </div>

                {/* Classes Today */}
                <div className="bg-white shadow-md rounded-lg p-5 flex flex-col items-center hover:shadow-xl transition-shadow">
                    <Activity className="w-10 h-10 p-1 rounded-xl text-green-500 mb-2 bg-green-100" />
                    <span className="text-gray-400 text-sm">Active Classes</span>
                    <span className="text-2xl font-bold text-gray-800 mt-2">32</span>
                </div>
            </section>
            <RecentActivity />
        </div>
    );
}
