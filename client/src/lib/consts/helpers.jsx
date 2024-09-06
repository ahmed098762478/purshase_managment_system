export function getOrderStatus(status) {
	switch (status) {
		// case 'PLACED':
		// 	return (
		// 		<span className="capitalize py-1 px-2 rounded-md text-xs text-sky-600 bg-sky-100">
		// 			{status.replaceAll('_', ' ').toLowerCase()}
		// 		</span>
		// 	)
		// case 'CONFIRMED':
		// 	return (
		// 		<span className="capitalize py-1 px-2 rounded-md text-xs text-orange-600 bg-orange-100">
		// 			{status.replaceAll('_', ' ').toLowerCase()}
		// 		</span>
		// 	)
		// case 'SHIPPED':
		// 	return (
		// 		<span className="capitalize py-1 px-2 rounded-md text-xs text-teal-600 bg-teal-100">
		// 			{status.replaceAll('_', ' ').toLowerCase()}
		// 		</span>
		// 	)
		case 'PENDING':
			return (
				<span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2 py-1 text-xs font-semibold text-yellow-600">
              		<span className="h-1.5 w-1.5 rounded-full bg-yellow-600"></span>					
					{status.replaceAll('_', ' ').toLowerCase()}
				</span>
			)
			case 'VALIDATED':
				return (
				<span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-600">
					<span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
					{status.replaceAll('_', ' ').toLowerCase()}
				</span>
			)
		default:
			return (
				<span className="capitalize py-1 px-2 rounded-md text-xs text-gray-600 bg-gray-100">
					{status.replaceAll('_', ' ').toLowerCase()}
				</span>
			)
	}
}