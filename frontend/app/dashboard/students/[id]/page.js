import Loader from "@/components/Loader";
import { useGetSingleStudentQuery } from "@/redux/features/studentApi";

export default function StudentProfile({ params }) {
    const { id } = params;
    const { data, isLoading } = useGetSingleStudentQuery(id);

    if (isLoading) return <Loader />;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold">Student Profile</h1>

            <div className="grid grid-cols-2 gap-4 mt-4">
                <p><strong>Full Name:</strong> {data.firstName} {data.lastName}</p>
                <p><strong>Gender:</strong> {data.gender}</p>
                <p><strong>Grade:</strong> {data.grade}</p>
                <p><strong>Phone:</strong> {data.phone}</p>
                <p><strong>Parent Name:</strong> {data.parentName}</p>
                <p><strong>Parent Contact:</strong> {data.parentContact}</p>
                <p><strong>Enrollment Date:</strong> {data.enrollmentDate}</p>
                <p><strong>Status:</strong> {data.status}</p>
            </div>
        </div>
    );
}
