import {
	HiOutlineViewGrid,
	HiOutlineCube,
	HiOutlineShoppingCart,
	HiOutlineUsers,
	HiOutlineDocumentText,
	HiOutlineAnnotation,
	HiOutlineQuestionMarkCircle,
	HiOutlineCog
} from 'react-icons/hi'

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/admin',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'products',
		label: 'Products',
		path: '/admin/products',
		icon: <HiOutlineCube />
	},
	{
		key: 'fournisseurs',
		label: 'Fournisseurs',
		path: '/admin/fournisseurs',
		icon: <HiOutlineShoppingCart />
	},
	{
		key: 'prestations',
		label: 'Prestations',
		path: '/admin/prestations',
		icon: <HiOutlineUsers />
	},
	{
		key: 'commandes',
		label: 'Commandes',
		path: '/admin/commandes',
		icon: <HiOutlineDocumentText />
	},
	{
		key: 'demandeurs',
		label: 'Demandeurs d\'achat',
		path: '/admin/demandeurs',
		icon: <HiOutlineAnnotation />
	},
	{
		key: 'magazins',
		label: 'Magazins',
		path: '/admin/magazins',
		icon: <HiOutlineAnnotation />
	}
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	{
		key: 'settings',
		label: 'Settings',
		path: '/settings',
		icon: <HiOutlineCog />
	},
	{
		key: 'support',
		label: 'Help & Support',
		path: '/support',
		icon: <HiOutlineQuestionMarkCircle />
	}
]