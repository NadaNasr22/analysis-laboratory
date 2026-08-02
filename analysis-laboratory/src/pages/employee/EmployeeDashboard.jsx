import StatCard from "../../components/StatCard";
import { useNavigate } from "react-router-dom";
import { getPatients } from "../../data/patientStorage";
import { getInvoices } from "../../data/invoiceStorage";
import { translations } from "../../constants/translations";
import { useLanguage } from "../../constants/useLanguage";

function EmployeeDashboard() {
  const navigate = useNavigate();

  const { language } = useLanguage();

  const t = translations[language];

  const patients = getPatients();
  const invoices = getInvoices();

  const totalRevenue = invoices
    .filter((invoice) => invoice.status === "Paid")
    .reduce((sum, invoice) => sum + invoice.total, 0);
    

  return (
    <div
      className="
        min-h-screen
        p-4 sm:p-6
        overflow-x-hidden
        bg-gray-100
        dark:bg-gray-900
        text-gray-800
        dark:text-white
        transition-colors
        duration-300
      "
    >

      {/* ================= Stats ================= */}

      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          xl:grid-cols-4
          gap-4
          sm:gap-6
          mt-2
        "
      >

        <StatCard
          title={t.patients}
          value={patients.length}
          icon="👥"
          color="bg-blue-100"
        />

        <StatCard
          title={t.requests}
          value="12"
          icon="🧪"
          color="bg-purple-100"
        />

        <StatCard
          title={t.invoices}
          value={invoices.length}
          icon="🧾"
          color="bg-orange-100"
        />

        <StatCard
          title={t.revenue}
          value={`${totalRevenue} EGP`}
          icon="💰"
          color="bg-green-100"
        />

      </div>


      {/* ================= Today's Patients & Recent Invoices ================= */}

      <div
        className="
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-4
          sm:gap-6
          mt-6
        "
      >

        {/* Today's Patients */}

        <div
          className="
            bg-white
            dark:bg-gray-800
            border
            border-gray-200
            dark:border-gray-700
            rounded-2xl
            shadow-sm
            p-4
            sm:p-5
            transition-colors
            duration-300
          "
        >

          <h2 className="text-lg font-semibold mb-4">
            {t.todaysPatients}
          </h2>


          <div className="space-y-3">

            <div
              className="
                flex
                flex-col
                sm:flex-row
                sm:justify-between
                gap-1
                border-b
                border-gray-200
                dark:border-gray-700
                pb-2
              "
            >
              <span>
                Ahmed Mohamed
              </span>

              <span className="text-gray-500 dark:text-gray-400">
                CBC
              </span>
            </div>


            <div
              className="
                flex
                flex-col
                sm:flex-row
                sm:justify-between
                gap-1
                border-b
                border-gray-200
                dark:border-gray-700
                pb-2
              "
            >
              <span>
                Sara Ali
              </span>

              <span className="text-gray-500 dark:text-gray-400">
                Blood Sugar
              </span>
            </div>


            <div
              className="
                flex
                flex-col
                sm:flex-row
                sm:justify-between
                gap-1
              "
            >
              <span>
                Mohamed Khaled
              </span>

              <span className="text-gray-500 dark:text-gray-400">
                Urine Analysis
              </span>
            </div>

          </div>

        </div>


        {/* Recent Invoices */}

        <div
          className="
            bg-white
            dark:bg-gray-800
            border
            border-gray-200
            dark:border-gray-700
            rounded-2xl
            shadow-sm
            p-4
            sm:p-5
            transition-colors
            duration-300
          "
        >

          <h2 className="text-lg font-semibold mb-4">
            {t.recentInvoices}
          </h2>


          <div className="space-y-3">

            <div
              className="
                flex
                justify-between
                items-center
                border-b
                border-gray-200
                dark:border-gray-700
                pb-2
              "
            >
              <span>#1001</span>

              <span className="text-green-600 dark:text-green-400">
                {t.paid}
              </span>
            </div>


            <div
              className="
                flex
                justify-between
                items-center
                border-b
                border-gray-200
                dark:border-gray-700
                pb-2
              "
            >
              <span>#1002</span>

              <span className="text-yellow-600 dark:text-yellow-400">
                {t.pending}
              </span>
            </div>


            <div
              className="
                flex
                justify-between
                items-center
              "
            >
              <span>#1003</span>

              <span className="text-red-600 dark:text-red-400">
                {t.cancelled}
              </span>
            </div>

          </div>

        </div>

      </div>


      {/* ================= Quick Actions ================= */}

      <div
        className="
          bg-white
          dark:bg-gray-800
          border
          border-gray-200
          dark:border-gray-700
          rounded-2xl
          shadow-sm
          p-4
          sm:p-6
          mt-6
          transition-colors
          duration-300
        "
      >

        <h2 className="text-lg font-bold mb-5">
          {t.quickActions}
        </h2>


        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            gap-4
            sm:gap-5
          "
        >

          {/* Add Patient */}

          <button
            onClick={() =>
              navigate("/employee/patients", {
                state: { openAddModal: true },
              })
            }
            className="
              group
              border
              border-gray-200
              dark:border-gray-700
              bg-white
              dark:bg-gray-800
              rounded-2xl
              p-4
              sm:p-5
              text-left
              hover:shadow-md
              hover:-translate-y-1
              transition-all
              duration-300
            "
          >

            <div
              className="
                w-12
                h-12
                rounded-xl
                bg-blue-100
                dark:bg-blue-900/40
                flex
                items-center
                justify-center
                mb-4
              "
            >
              👤
            </div>


            <h3 className="font-semibold">
              {t.addPatient}
            </h3>


            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {t.registerNewPatient}
            </p>

          </button>


          {/* Create Invoice */}

          <button
            onClick={() =>
              navigate("/employee/invoices", {
                state: { openAddModal: true },
              })
            }
            className="
              group
              border
              border-gray-200
              dark:border-gray-700
              bg-white
              dark:bg-gray-800
              rounded-2xl
              p-4
              sm:p-5
              text-left
              hover:shadow-md
              hover:-translate-y-1
              transition-all
              duration-300
            "
          >

            <div
              className="
                w-12
                h-12
                rounded-xl
                bg-green-100
                dark:bg-green-900/40
                flex
                items-center
                justify-center
                mb-4
              "
            >
              🧾
            </div>


            <h3 className="font-semibold">
              {t.createInvoice}
            </h3>


            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {t.generateBillingDetails}
            </p>

          </button>


          {/* New Request */}

          <button
            onClick={() =>
              navigate("/employee/analysis-requests", {
                state: { openAddModal: true },
              })
            }
            className="
              group
              border
              border-gray-200
              dark:border-gray-700
              bg-white
              dark:bg-gray-800
              rounded-2xl
              p-4
              sm:p-5
              text-left
              hover:shadow-md
              hover:-translate-y-1
              transition-all
              duration-300
            "
          >

            <div
              className="
                w-12
                h-12
                rounded-xl
                bg-purple-100
                dark:bg-purple-900/40
                flex
                items-center
                justify-center
                mb-4
              "
            >
              🧪
            </div>


            <h3 className="font-semibold">
              {t.newRequest}
            </h3>


            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {t.createAnalysisRequest}
            </p>

          </button>


          {/* Patients List */}

          <button
            onClick={() =>
              navigate("/employee/patients")
            }
            className="
              group
              border
              border-gray-200
              dark:border-gray-700
              bg-white
              dark:bg-gray-800
              rounded-2xl
              p-4
              sm:p-5
              text-left
              hover:shadow-md
              hover:-translate-y-1
              transition-all
              duration-300
            "
          >

            <div
              className="
                w-12
                h-12
                rounded-xl
                bg-orange-100
                dark:bg-orange-900/40
                flex
                items-center
                justify-center
                mb-4
              "
            >
              📋
            </div>


            <h3 className="font-semibold">
              {t.patientsList}
            </h3>


            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {t.viewAllPatients}
            </p>

          </button>

        </div>

      </div>

    </div>
  );
}

export default EmployeeDashboard;
