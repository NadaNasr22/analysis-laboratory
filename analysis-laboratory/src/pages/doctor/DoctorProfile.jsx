import { useState } from "react";

function DoctorProfile() {

    const [doctor, setDoctor] = useState({
  name: "Dr. Ahmed Mohamed",
  phone: "01012345678",
  email: "doctor@gmail.com",
  specialization: "Pathologist",
  experience: "15 Years",
  license: "LAB-2026-4589",
  username: "doctor_admin",
  role: "Administrator",
});

const [showEdit, setShowEdit] = useState(false);
const [editName, setEditName] = useState(doctor.name);
const [editPhone, setEditPhone] = useState(doctor.phone);
const [editEmail, setEditEmail] = useState(doctor.email);
const [editSpecialization, setEditSpecialization] = useState(
  doctor.specialization
);
const [editExperience, setEditExperience] = useState(
  doctor.experience
);
const saveProfile = () => {
  setDoctor({
    ...doctor,
    name: editName,
    phone: editPhone,
    email: editEmail,
    specialization: editSpecialization,
    experience: editExperience,
  });

  setShowEdit(false);
};
  return (
<div className="p-4 sm:p-6 lg:p-8">
<h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-6">
          My Profile
      </h1>

      <div className="bg-white dark:bg-gray-800 dark:text-white rounded-2xl shadow-lg overflow-hidden">

        {/* Cover */}
        <div className="h-32 sm:h-40 lg:h-48 bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-400"></div>

        {/* Profile */}
        <div className="px-8 pb-8">

          <div className="-mt-16 flex flex-col md:flex-row md:items-end md:justify-between">

<div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6 text-center sm:text-left">
              <img
                src="https://i.pravatar.cc/200?img=12"
                alt="Doctor"
className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full border-4 border-white shadow-lg object-cover"              />

              <div className="mt-14 md:mt-10">

<h2 className="text-xl sm:text-2xl lg:text-3xl mt-6 sm:mt-8 font-bold">
  {doctor.name}
                </h2>

                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  Laboratory Administrator
                </p>

              </div>

            </div>

<button
  onClick={() => {
    setEditName(doctor.name);
    setEditPhone(doctor.phone);
    setEditEmail(doctor.email);
    setEditSpecialization(doctor.specialization);
    setEditExperience(doctor.experience);
    setShowEdit(true);
  }}
className="w-full sm:w-auto mt-6 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition">
  Edit Profile
</button>

          </div>

        </div>

<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

  {/* Personal Information */}
<div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-2xl shadow-lg p-6 transition-all">
    <h2 className="text-xl font-bold mb-6">
      Personal Information
    </h2>

    <div className="space-y-5">

     <div className="flex flex-col sm:flex-row sm:justify-between gap-1 border-b pb-2">
        <span className="text-gray-500">Full Name</span>
        <span className="font-semibold">{doctor.name}</span>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-between gap-1 border-b pb-2">
        <span className="text-gray-500">Phone</span>
        <span className="font-semibold">{doctor.phone}</span>
      </div>

<div className="flex flex-col sm:flex-row sm:justify-between gap-1 border-b pb-2">
          <span className="text-gray-500">Email</span>
        <span className="font-semibold">
     {doctor.email}
        </span>
      </div>

     <div className="flex flex-col sm:flex-row sm:justify-between gap-1 border-b pb-2">
        <span className="text-gray-500">Specialization</span>
        <span className="font-semibold">
        {doctor.specialization}
        </span>
      </div>

   <div className="flex flex-col sm:flex-row sm:justify-between gap-1 border-b pb-2">
        <span className="text-gray-500">Experience</span>
        <span className="font-semibold">
        {doctor.experience}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-500">License</span>
        <span className="font-semibold">
{doctor.license}
        </span>
      </div>

    </div>

  </div>
    {/* Account Information */}

<div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-2xl shadow-lg p-6 transition-all">
    <h2 className="text-xl font-bold mb-6">
      Account Information
    </h2>

    <div className="space-y-5">

      <div className="flex justify-between border-b pb-2">
        <span className="text-gray-500 dark:text-gray-400">
          Username
        </span>

        <span className="font-semibold">
         {doctor.username}
        </span>
      </div>

      <div className="flex justify-between border-b pb-2">
        <span className="text-gray-500 dark:text-gray-400">
          Role
        </span>

        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
          {doctor.role}
        </span>
      </div>

      <div className="flex justify-between border-b pb-2">
        <span className="text-gray-500 dark:text-gray-400">
          Last Login
        </span>

        <span className="font-semibold">
          Today 09:15 AM
        </span>
      </div>

      <div className="flex justify-between">
        <span className="text-gray-500 dark:text-gray-400">
          Status
        </span>

        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
          Active
        </span>
      </div>

    </div>

  </div>

</div>

      </div>

      {showEdit && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
<div className="bg-white dark:bg-gray-800 dark:text-white rounded-2xl p-4 sm:p-6 lg:p-8 w-[95%] max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto">
      {/* Header */}
<div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold">
            Edit Profile
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Update your personal information
          </p>
        </div>

        <button
          onClick={() => setShowEdit(false)}
          className="text-3xl text-gray-400 hover:text-red-500"
        >
          ✕
        </button>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <input
          type="text"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          placeholder="Full Name"
          className="w-full border dark:border-gray-600 dark:bg-gray-700 rounded-xl p-3"
        />

        <input
          type="text"
          value={editPhone}
          onChange={(e) => setEditPhone(e.target.value)}
          placeholder="Phone"
          className="w-full border dark:border-gray-600 dark:bg-gray-700 rounded-xl p-3"
        />

        <input
          type="email"
          value={editEmail}
          onChange={(e) => setEditEmail(e.target.value)}
          placeholder="Email"
          className="w-full border dark:border-gray-600 dark:bg-gray-700 rounded-xl p-3"
        />

        <input
          type="text"
          value={editSpecialization}
          onChange={(e) => setEditSpecialization(e.target.value)}
          placeholder="Specialization"
          className="w-full border dark:border-gray-600 dark:bg-gray-700 rounded-xl p-3"
        />

        <input
          type="text"
          value={editExperience}
          onChange={(e) => setEditExperience(e.target.value)}
          placeholder="Experience"
          className="w-full border dark:border-gray-600 dark:bg-gray-700 rounded-xl p-3 md:col-span-2"
        />

      </div>

      {/* Footer */}
<div className="flex flex-col-reverse sm:flex-row justify-end gap-4 mt-8">
          <button
          onClick={() => setShowEdit(false)}
          className="px-5 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300"
        >
          Cancel
        </button>

        <button
          onClick={saveProfile}
          className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
        >
          Save Changes
        </button>
      </div>

    </div>
  </div>
)}
       </div>
       

  );
}

export default DoctorProfile;