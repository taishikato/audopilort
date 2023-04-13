"use client";

export default function Dashboard() {
  return (
    <main className="lg:pl-72">
      <div className="">
        <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
          {/* Main area */}

          <div className="bg-white rounded-md shadow">
            <div className="px-4 py-6 max-w-7xl sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                Dashboard
              </h1>
            </div>

            <div className="px-4 py-6 max-w-7xl sm:px-6 lg:px-8">
              <h2 className="mb-2 text-xl font-bold tracking-tight text-gray-800">
                Settings
              </h2>
              <label
                htmlFor="topic"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Topics for autopilot to write about
              </label>
              <form className="flex items-center mt-2 space-x-2">
                <input
                  type="text"
                  name="topic"
                  id="topic"
                  className="min-w-[300px] p-2 text-gray-900 border-0 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Latest AI news"
                />
                <button
                  type="submit"
                  className="px-5 py-2 text-base font-semibold text-white transition-colors bg-indigo-600 rounded-md hover:bg-indigo-500"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
