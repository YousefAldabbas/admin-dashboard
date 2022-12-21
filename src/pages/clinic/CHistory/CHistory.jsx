import React from "react";
import PageTitle from "../../../components/PageTitle";
import PageTitleWrapper from "../../../components/PageTitleWrapper";
import {
  useShowMedicineHistoryQuery,
  useShowRecordHistoryQuery,
} from "../../../features/clinic/clinicApiSlice";

function CHistory() {
  const { data: medsHistory } = useShowMedicineHistoryQuery();
  const { data: recsHistory } = useShowRecordHistoryQuery();
  console.log({ medsHistory, recsHistory });
  return (
    <div>
      {" "}
      <PageTitleWrapper>
        <PageTitle heading="History" />
      </PageTitleWrapper>
    </div>
  );
}

export default CHistory;
