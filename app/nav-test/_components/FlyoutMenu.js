'use client';
import { useState } from 'react';

export default function FlyoutMenu() {
	const [open, setOpen] = useState(false);

	return (
		<li
			className='p-4 lg:px-8 relative flex items-center space-x-1'
			onMouseEnter={() => setOpen(true)}
			onMouseLeave={() => setOpen(false)}
		>
			<a
				href='#0'
				className='text-slate-800 hover:text-slate-900'
				aria-expanded={open}
			>
				Flyout Menu
			</a>
			<button
				className='shrink-0 p-1'
				aria-expanded={open}
				onClick={() => setOpen(!open)}
			>
				<span className='sr-only'>Show submenu for Flyout Menu</span>
				<svg
					className='w-3 h-3 fill-slate-500'
					xmlns='http://www.w3.org/2000/svg'
					width='12'
					height='12'
				>
					<path d='M10 2.586 11.414 4 6 9.414.586 4 2 2.586l4 4z' />
				</svg>
			</button>

			{open && (
				<ul className='origin-top-right absolute top-full left-1/2 -translate-x-1/2 min-w-[240px] bg-white border border-slate-200 p-2 rounded-lg shadow-xl transition ease-out duration-200 transform'>
					{menuItems.map(item => (
						<li key={item.title}>
							<a
								href='#'
								className='text-slate-800 hover:bg-slate-50 flex items-center p-2'
							>
								<div className='flex items-center justify-center bg-white border border-slate-200 rounded shadow-sm h-7 w-7 shrink-0 mr-3'>
									{item.icon}
								</div>
								<span className='whitespace-nowrap'>{item.title}</span>
							</a>
						</li>
					))}
				</ul>
			)}
		</li>
	);
}

const menuItems = [
	{
		title: 'Priority Ratings',
		icon: (
			<svg
				className='fill-indigo-500'
				xmlns='http://www.w3.org/2000/svg'
				width='9'
				height='12'
			>
				<path d='M8.724.053A.5.5 0 0 0 8.2.1L4.333 3H1.5A1.5 1.5 0 0 0 0 4.5v3A1.5 1.5 0 0 0 1.5 9h2.833L8.2 11.9a.5.5 0 0 0 .8-.4V.5a.5.5 0 0 0-.276-.447Z' />
			</svg>
		),
	},
	{
		title: 'Insights',
		icon: (
			<svg
				className='fill-indigo-500'
				xmlns='http://www.w3.org/2000/svg'
				width='12'
				height='12'
			>
				<path d='M11.953 4.29a.5.5 0 0 0-.454-.292H6.14L6.984.62A.5.5 0 0 0 6.12.173l-6 7a.5.5 0 0 0 .379.825h5.359l-.844 3.38a.5.5 0 0 0 .864.445l6-7a.5.5 0 0 0 .075-.534Z' />
			</svg>
		),
	},
	{
		title: 'Item Mirror',
		icon: (
			<svg
				className='fill-indigo-500'
				xmlns='http://www.w3.org/2000/svg'
				width='12'
				height='12'
			>
				<path d='M6 0a6 6 0 1 0 0 12A6 6 0 0 0 6 0ZM2 6a4 4 0 0 1 4-4v8a4 4 0 0 1-4-4Z' />
			</svg>
		),
	},
	{
		title: 'Support Center',
		icon: (
			<svg
				className='fill-indigo-500'
				xmlns='http://www.w3.org/2000/svg'
				width='11'
				height='11'
			>
				<path d='M10.866.134a.458.458 0 0 0-.481-.106L.302 3.695a.458.458 0 0 0-.014.856l4.4 1.76 1.76 4.4c.07.175.24.29.427.29h.007a.458.458 0 0 0 .424-.302L10.973.615a.458.458 0 0 0-.107-.48Z' />
			</svg>
		),
	},
];
