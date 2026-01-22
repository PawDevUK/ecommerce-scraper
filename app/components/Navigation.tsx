'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<header className='bg-amazon shadow-sm border-b border-gray-200 mainPadding'>
			{/* Top Bar */}
			<div className='bg-amazon text-gray-700 px-4 py-2'>
				<div className='max-w-7xl mx-auto flex justify-between items-center text-sm'>
					<div className=' space-x-4'>
						<span className='sr-only'>Skip to main content</span>
						<Link href='/' className='text-3xl font-bold text-gray-700'>
							Fetchy
						</Link>
					</div>
				</div>
			</div>

			{/* Main Navigation */}
			<nav className='max-w-7xl mx-auto px-4'>
				<div className='flex justify-between items-center h-16'>
					{/* Logo */}
					<div className='shrink-0'></div>
					{/* Desktop Navigation */}
					<div className='hidden md:flex items-center space-x-8'>
						<div className='relative'>
							<button onClick={() => setIsOpen(!isOpen)} className='flex items-center text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium'>
								Platforms
								<svg className={`ml-1 w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
									<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
								</svg>
							</button>
							<div
								className={`absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg transition-opacity duration-200 z-10 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
								<Link href='/amazon-business' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
									Amazon Business
								</Link>
								<Link href='/screwfix' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
									Screwfix
								</Link>
								<Link href='/rs-components' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
									RS Components
								</Link>
								<Link href='/bidfood' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
									Bidfood
								</Link>
								<Link href='/costco' className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
									CostCo
								</Link>
							</div>
						</div>

						<Link href='/omnipath' className='text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium'>
							OmniPATH
						</Link>

						<Link href='/documentation' className='text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium'>
							Documentation
						</Link>

						<Link href='/api' className='text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium'>
							Api
						</Link>
					</div>
					<div className='hidden md:flex items-center space-x-4'>
						<Link
							href='/signin'
							className='text-gray-700 hover:text-gray-900 px-4 py-2 rounded-md text-sm font-medium border border-gray-300 hover:bg-gray-100 transition-colors'>
							Sign In
						</Link>
						<Link href='/signup' className='bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors'>
							Sign Up
						</Link>
					</div>

					{/* Mobile menu button */}
					<div className='md:hidden'>
						<button className='text-gray-700 hover:text-gray-900 p-2'>
							<svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
							</svg>
						</button>
					</div>
				</div>
			</nav>
		</header>
	);
}
