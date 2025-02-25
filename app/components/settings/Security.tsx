import React, { useState } from "react";
import ChangePasswordModal from "../modals/ChangePasswordModal";
import ChangeTransactionPin from "../modals/ChangeTransactionPin";

function Security() {
  const [openChangePassword, setOpenChangePassword] = useState(false);
  const [openChangePin, setOpenChangePin] = useState(false);
  return (
    <div>
      <div>
        <div className="px-4 sm:px-0">
          <h3 className="text-base font-semibold leading-7 text-gray-900">
            Security
          </h3>
          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
            Update your security settings.
          </p>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y rounded divide-gray-100">
            <div className="p-5 rounded-xl border border-gray-100">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Password Reset
              </dt>
              <dd className="mt-1 text-xs leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                Change your password at any time
              </dd>
              <dd
                onClick={() => setOpenChangePassword(true)}
                className="pt-5 underline cursor-pointer text-blue-500 text-sm leading-6  sm:col-span-2 sm:mt-0"
              >
                Change password
              </dd>
            </div>
            <div className="p-5 my-5 rounded-xl border border-gray-100">
              <dt className="text-sm font-medium leading-6 text-gray-900">
                Reset Transaction Pin
              </dt>
              <dd className="mt-1 text-xs leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                Change your transaction Pin anytime
              </dd>
              <dd
                onClick={() => setOpenChangePin(true)}
                className="pt-5 underline cursor-pointer text-blue-500 text-sm leading-6  sm:col-span-2 sm:mt-0"
              >
                Change Transaction Pin
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {openChangePassword && (
        <ChangePasswordModal
          open={openChangePassword}
          setOpen={setOpenChangePassword}
        />
      )}

      {openChangePin && (
        <ChangeTransactionPin open={openChangePin} setOpen={setOpenChangePin} />
      )}
    </div>
  );
}

export default Security;
