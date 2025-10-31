import React from 'react';
import Link from 'next/navigation';
const Navigation = () => {
	return (
		<ul>
			<li>
				<Link href='/cabins'>Cabin</Link>
			</li>
			<li>
				<Link href='/about'>About</Link>
			</li>
			<li>
				<Link href='/account'>Account</Link>
			</li>
		</ul>
	);
};

export default Navigation;
