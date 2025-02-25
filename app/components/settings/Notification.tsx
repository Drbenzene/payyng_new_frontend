import React from "react";
import Image from "next/image";
function Notification() {
  return (
    <div className="flex min-h-80 flex-col sm:flex-row">
      <div className=" border-gray-100 flex flex-col items-center justify-center flex-1">
        <Image
          src="/notifications.png"
          alt="Notifications"
          width={400}
          height={400}
          className="w-40 h-40"
        />
        <p className="text-center text-gray-500 text-sm font-semibold">
          You have no notifications
        </p>
      </div>
    </div>
  );
}

export default Notification;
