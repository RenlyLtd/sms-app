import Home from 'lucide-svelte/icons/home';
import Message from 'lucide-svelte/icons/message-circle';
import MessageSquare from 'lucide-svelte/icons/messages-square';
import Notebook from 'lucide-svelte/icons/notebook-tabs';
import List from 'lucide-svelte/icons/list';
import Users from 'lucide-svelte/icons/users';
import Rocket from 'lucide-svelte/icons/rocket';
import Settings from 'lucide-svelte/icons/settings';
import Clipboard from 'lucide-svelte/icons/clipboard-minus';
import Templates from 'lucide-svelte/icons/notepad-text-dashed';

export let navItems = [
	{
		link: 'Dashboard',
		url: '/dashboard',
		icon: Home
	},
	{
		link: 'Campaigns',
		url: '/campaigns',
		icon: Rocket
	},
	{
		link: 'Leads',
		url: '/leads',
		icon: Notebook
	},
	{
		link: 'Lists',
		url: '/lists',
		icon: List
	},
	{
		link: 'Customers',
		url: '/customers',
		icon: Users
	},
	{
		link: 'Send',
		url: '/send',
		icon: Message
	},
	{
		link: 'Templates',
		url: '/templates',
		icon: Templates
	},
	{
		link: 'Bulk Send',
		url: '/bulk-send',
		icon: MessageSquare
	},
	{
		link: 'Delivery Reports',
		url: '/dlr',
		icon: Clipboard
	},
	{
		link: 'Settings',
		url: '/settings',
		icon: Settings
	}
];
