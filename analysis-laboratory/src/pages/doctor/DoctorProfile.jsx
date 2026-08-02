import { useState } from "react";
import { translations } from "../../constants/translations";
import { useLanguage } from "../../constants/useLanguage";
function DoctorProfile() {
  const { language } = useLanguage();
  const t = translations[language];

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
<div className="p-4 sm:p-6 lg:p-8 pt-20 sm:pt-22 lg:pt-24">
      {/* Page Title */}
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-6">
        {t.myProfile}
      </h1>

      {/* Profile Card */}
      <div className="bg-white dark:bg-gray-800 dark:text-white rounded-2xl shadow-lg overflow-hidden">

        {/* Cover */}
        <div className="h-32 sm:h-40 lg:h-48 bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-400">
        </div>

        {/* Profile Header */}
        <div className="px-5 sm:px-8 pb-8">

          <div className="-mt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">

            {/* Doctor Info */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6 text-center sm:text-left">

              <img
                src="https://i.pravatar.cc/200?img=12"
                alt={t.doctor}
                className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full border-4 border-white shadow-lg object-cover mt-10"
              />

              <div className="mt-4 sm:mt-10">

                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                  {doctor.name}
                </h2>

                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  {t.laboratoryAdministrator}
                </p>

              </div>

            </div>

            {/* Edit Button */}
            <button
              onClick={() => {
                setEditName(doctor.name);
                setEditPhone(doctor.phone);
                setEditEmail(doctor.email);
                setEditSpecialization(doctor.specialization);
                setEditExperience(doctor.experience);
                setShowEdit(true);
              }}
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition"
            >
              {t.editProfile}
            </button>

          </div>

        </div>
      </div>

      {/* Information Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

        {/* Personal Information */}
        <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-2xl shadow-lg p-5 sm:p-6">

          <h2 className="text-xl font-bold mb-6">
            {t.personalInformation}
          </h2>

          <div className="space-y-5">

            {/* Full Name */}
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1 border-b dark:border-gray-700 pb-3">
              <span className="text-gray-500 dark:text-gray-400">
                {t.fullName}
              </span>

              <span className="font-semibold">
                {doctor.name}
              </span>
            </div>

            {/* Phone */}
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1 border-b dark:border-gray-700 pb-3">
              <span className="text-gray-500 dark:text-gray-400">
                {t.phone}
              </span>

              <span className="font-semibold">
                {doctor.phone}
              </span>
            </div>

            {/* Email */}
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1 border-b dark:border-gray-700 pb-3">
              <span className="text-gray-500 dark:text-gray-400">
                {t.email}
              </span>

              <span className="font-semibold break-all">
                {doctor.email}
              </span>
            </div>

            {/* Specialization */}
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1 border-b dark:border-gray-700 pb-3">
              <span className="text-gray-500 dark:text-gray-400">
                {t.specialization}
              </span>

              <span className="font-semibold">
                {t.pathologist}
              </span>
            </div>

            {/* Experience */}
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1 border-b dark:border-gray-700 pb-3">
              <span className="text-gray-500 dark:text-gray-400">
                {t.experience}
              </span>

              <span className="font-semibold">
                15 {t.years}
              </span>
            </div>

            {/* License */}
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
              <span className="text-gray-500 dark:text-gray-400">
                {t.license}
              </span>

              <span className="font-semibold">
                {doctor.license}
              </span>
            </div>

          </div>
        </div>

        {/* Account Information */}
        <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-2xl shadow-lg p-5 sm:p-6">

          <h2 className="text-xl font-bold mb-6">
            {t.accountInformation}
          </h2>

          <div className="space-y-5">

            {/* Username */}
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1 border-b dark:border-gray-700 pb-3">
              <span className="text-gray-500 dark:text-gray-400">
                {t.username}
              </span>

              <span className="font-semibold">
                {doctor.username}
              </span>
            </div>

            {/* Role */}
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1 border-b dark:border-gray-700 pb-3">
              <span className="text-gray-500 dark:text-gray-400">
                {t.role}
              </span>

              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm w-fit">
                {t.administrator}
              </span>
            </div>

            {/* Last Login */}
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1 border-b dark:border-gray-700 pb-3">
              <span className="text-gray-500 dark:text-gray-400">
                {t.lastLogin}
              </span>

              <span className="font-semibold">
                {t.todayLogin}
              </span>
            </div>

            {/* Status */}
            <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
              <span className="text-gray-500 dark:text-gray-400">
                {t.status}
              </span>

              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm w-fit">
                {t.active}
              </span>
            </div>

          </div>
        </div>

      </div>

      {/* Edit Profile Modal */}
      {showEdit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

          <div className="bg-white dark:bg-gray-800 dark:text-white rounded-2xl p-5 sm:p-6 lg:p-8 w-full max-w-2xl shadow-xl max-h-[90vh] overflow-y-auto">

            {/* Modal Header */}
            <div className="flex items-start justify-between mb-6">

              <div>
                <h2 className="text-xl sm:text-2xl font-bold">
                  {t.editProfile}
                </h2>

                <p className="text-gray-500 dark:text-gray-400 mt-1">
                  {t.updatePersonalInformation}
                </p>
              </div>

              <button
                onClick={() => setShowEdit(false)}
                className="text-3xl text-gray-400 hover:text-red-500 transition"
              >
                ✕
              </button>

            </div>

            {/* Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t.fullName}
                </label>

                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder={t.fullName}
                  className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t.phone}
                </label>

                <input
                  type="text"
                  value={editPhone}
                  onChange={(e) => setEditPhone(e.target.value)}
                  placeholder={t.phone}
                  className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t.email}
                </label>

                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  placeholder={t.email}
                  className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Specialization */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t.specialization}
                </label>

                <input
                  type="text"
                  value={editSpecialization}
                  onChange={(e) =>
                    setEditSpecialization(e.target.value)
                  }
                  placeholder={t.specialization}
                  className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Experience */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">
                  {t.experience}
                </label>

                <input
                  type="text"
                  value={editExperience}
                  onChange={(e) =>
                    setEditExperience(e.target.value)
                  }
                  placeholder={t.experience}
                  className="w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-700 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

            </div>

            {/* Modal Footer */}
            <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-8">

              <button
                onClick={() => setShowEdit(false)}
                className="px-5 py-3 rounded-xl bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
              >
                {t.cancel}
              </button>

              <button
                onClick={saveProfile}
                className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition"
              >
                {t.saveChanges}
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default DoctorProfile;
