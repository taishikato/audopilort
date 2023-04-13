export default function Articles() {
  return (
    <>
      <main className="lg:pl-72">
        <div className="xl:pl-96">
          <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
            {/* Main area */}
            Articles
          </div>
        </div>
      </main>

      <aside className="fixed inset-y-0 hidden px-4 py-6 overflow-y-auto border-r border-gray-200 left-72 w-96 sm:px-6 lg:px-8 xl:block">
        {/* Secondary column (hidden on smaller screens) */}
      </aside>
    </>
  );
}
