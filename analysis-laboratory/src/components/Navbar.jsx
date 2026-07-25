import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function DoctorDashboard(){

    return(

        <div className="w-full md:w-64 md:min-h-screen bg-slate-800 text-white">
            <Sidebar/>
            <div className="flex-1 bg-gray-100">
              <Navbar />
                <div className="p-8">
                    <h1 className="text-3xl font-bold">
                         Welcome Doctor 👨‍⚕️
                    </h1>
                </div>
            </div>
        </div>
    )
}
export default DoctorDashboard;