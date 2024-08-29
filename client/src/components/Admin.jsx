import React from "react"
import Containers from "./admin/Containers"
import PopularProducts from "./admin/PopularProducts"
import Chart from "./admin/Chart"
import PieChart from "./admin/PieChart"


const Admin = () => {
    return (
        <div className="flex flex-col gap-4">
			<Containers />
			<div className="flex flex-row gap-4 w-full">
				<Chart />
				<PieChart />
			</div>
			<div className="flex flex-row gap-4 w-full">
				<PopularProducts />
			</div>
		</div>
    )
}

export default Admin