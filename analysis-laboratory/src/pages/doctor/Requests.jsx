import { useState } from "react";
import { getRequests } from "../../data/analysisRequestsStorage";

function Requests() {

  const [requests] = useState(getRequests());

  return (
    <div className="p-6">

      <h1 className="text-3xl font-bold mb-6">
        Analysis Requests
      </h1>

      {requests.length === 0 ? (

        <div className="bg-white rounded-2xl p-10 text-center shadow">

          <h2 className="text-xl font-semibold">
            No Requests Yet
          </h2>

          <p className="text-gray-500 mt-2">
            Create your first analysis request.
          </p>

        </div>

      ) : (

        <div className="space-y-4">

          {requests.map((request) => (

            <div
              key={request.id}
              className="bg-white rounded-2xl shadow border p-6"
            >

              <div className="flex justify-between">

                <div>

                  <h2 className="text-xl font-bold">
                    {request.patient.name}
                  </h2>

                  <p className="text-gray-500">
                    {request.tests.length} Tests
                  </p>

                </div>

                <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full">
                  {request.status}
                </span>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Requests;