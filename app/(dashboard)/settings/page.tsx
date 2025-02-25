"use client";

import ContentLayout from "@/app/components/layouts/ContentLayout";
import { useState } from "react";
import Profile from "@/app/components/settings/Profile";
import NOK from "@/app/components/settings/NOK";
import Security from "@/app/components/settings/Security";
import Notification from "@/app/components/settings/Notification";

export default function Settings() {
  const [currentTab, setCurrentTab] = useState("profile");
  const tabs = [
    { name: "Profile", tab: "profile" },
    // { name: "Next Of Kin", tab: "nok" },
    { name: "Security", tab: "security" },
    { name: "Account Verification", tab: "verification" },
    { name: "Notifications", tab: "notification" },
  ];

  return (
    <>
      <ContentLayout>
        <div
          className="border-b flex start w-ful items-center border-gray-200 px-4 sm:px-0"
          role="tablist"
          aria-label="Tabs"
        >
          {tabs.map((tab) => (
            <button
              onClick={() => setCurrentTab(tab.tab)}
              key={tab.tab}
              className={`${
                tab.tab === currentTab
                  ? "border-black text-black"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } w-full py-4 px-1 sm:px-3 border-b-2 font-medium text-sm`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </ContentLayout>
      <ContentLayout>
        {currentTab === "profile" && <Profile />}
        {currentTab === "nok" && <NOK />}
        {currentTab === "security" && <Security />}
        {currentTab === "notification" && <Notification />}
      </ContentLayout>
    </>
  );
}
