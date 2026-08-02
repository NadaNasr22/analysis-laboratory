import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function DoctorDashboard() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="md:ml-64">

        {/* Fixed Navbar */}
        <header className="fixed top-0 left-0 right-0 z-[9999]">
          <Navbar />
        </header>

        {/* Content */}
        <main className="pt-20 p-8">

          <h1 className="text-3xl font-bold">
            Welcome Doctor 👨‍⚕️
          </h1>

          {/* Test Content */}
          <div className="space-y-6 mt-10">

            {Array.from({ length: 20 }).map((_, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow"
              >
                Content {index + 1}
              </div>
            ))}

          </div>

        </main>

      </div>

    </div>
  );
}

export default DoctorDashboard;

