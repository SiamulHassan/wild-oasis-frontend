'use client';
import { useState } from 'react';
import FlyoutMenu from './FlyoutMenu';

export default function Navbar() {
	return (
		<nav className='flex justify-center'>
			<ul className='flex flex-wrap items-center font-medium text-sm'>
				<li className='p-4 lg:px-8'>
					<a className='text-slate-800 hover:text-slate-900' href='#'>
						Prospects
					</a>
				</li>
				<li className='p-4 lg:px-8'>
					<a className='text-slate-800 hover:text-slate-900' href='#'>
						History
					</a>
				</li>
				<FlyoutMenu />
				<li className='p-4 lg:px-8'>
					<a className='text-slate-800 hover:text-slate-900' href='#'>
						Contacts
					</a>
				</li>
				<li className='p-4 lg:px-8'>
					<a className='text-slate-800 hover:text-slate-900' href='#'>
						Numbers
					</a>
				</li>
			</ul>
		</nav>
	);
}
