'use client'

import { ActivityDataPage } from "../components/activityData/page";
import { useDataToFill } from "./dataToFill";

export default function EnergyPage() {
    const { dataToFill } = useDataToFill();

    return <ActivityDataPage
        domain="energy"
        dataToFill={dataToFill}
        handleConfirm={() => {}} />
};
