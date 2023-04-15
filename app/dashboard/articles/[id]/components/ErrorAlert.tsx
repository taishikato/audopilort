import { ExclamationTriangleIcon } from "@heroicons/react/20/solid";

export const ErrorAlert = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <div className="p-4 rounded-md bg-yellow-50">
      <div className="flex">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon
            className="w-5 h-5 text-yellow-400"
            aria-hidden="true"
          />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">
            Attention needed
          </h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>{errorMessage}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
