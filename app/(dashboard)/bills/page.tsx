"use client";

import React from "react";
import BillsCard from "@/app/components/cards/BillsCard";
import ContentLayout from "@/app/components/layouts/ContentLayout";

function page() {
  return (
    <ContentLayout>
      <p className="text-2xl font-semibold text-gray-800">
        Bills, Airtime, Electricity, Education & More...
      </p>

      <div>
        <BillsCard />
      </div>
    </ContentLayout>
  );
}

export default page;
