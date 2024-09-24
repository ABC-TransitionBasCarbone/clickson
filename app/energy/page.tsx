'use client'

import { ActivityDataPage } from "../components/activityData/page";
import { useDataToFill } from "./dataToFill";

export default function EnergyPage() {
    const { dataToFill } = useDataToFill();

    return <ActivityDataPage
        domain="energy"
        category="energy"
        description="this is the energy"
        dataToFill={dataToFill}
        handleConfirm={() => {}} />
};