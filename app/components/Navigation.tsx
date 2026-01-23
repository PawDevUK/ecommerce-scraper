'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';

export default function Navigation() {
	const [isOpen, setIsOpen] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	const menuItems = [
		{ href: '/omnipath', label: 'OmniPATH' },
		{ href: '/documentation', label: 'Documentation' },
		{ href: '/api', label: 'Api Connect' },
	];

	const authItems = [
		{ href: '/signin', label: 'Sign In' },
		{ href: '/signup', label: 'Sign Up' },
	];

	const platformItems = [
		{ href: '/amazon-business', label: 'Amazon Business' },
		{ href: '/screwfix', label: 'Screwfix' },
		{ href: '/rs-components', label: 'RS Components' },
		{ href: '/bidfood', label: 'Bidfood' },
		{ href: '/costco', label: 'CostCo' },
	];

	return (
		<header className='bg-amazon shadow-sm border-b border-gray-200 mainPadding max-w-[1000px] mx-auto'>
			{/* Top Bar */}
			<div className='bg-amazon text-gray-700 px-4 py-2'>
				<div className='max-w-[1000px] mx-auto flex justify-between items-center text-sm'>
					<div className=' space-x-4'>
						<span className='sr-only'>Skip to main content</span>
						<Link href='/' className='text-3xl font-bold text-gray-700 hidden md:block'>
							Fetchy
						</Link>
					</div>
				</div>
			</div>

			{/* Main Navigation */}
			<nav className='max-w-[1000px] mx-auto px-4'>
				<div className='flex justify-between items-center h-16'>
					{/* Logo */}
					<Link href='/' className='text-3xl font-bold text-gray-700 block md:hidden'>
						Fetchy
					</Link>
					<div className='shrink-0'></div>
					{/* Desktop Navigation */}
					<div className='hidden md:flex items-center space-x-3'>
						<div className='relative' ref={dropdownRef}>
							<div
								onClick={() => setIsOpen(!isOpen)}
								className='flex items-center text-gray-700 hover:bg-[#EAE2D0] px-3 py-2 text-sm font-medium cursor-pointer rounded-[5px]'>
								Platforms
								<svg className={`ml-1 w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
									<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
								</svg>
							</div>
							<div
								className={`absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg transition-opacity duration-200 z-10 ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
								{platformItems.map((item) => (
									<Link key={item.href} href={item.href} className='block px-4 py-2 text-sm text-gray-700 hover:bg-[#EAE2D0]'>
										{item.label}
									</Link>
								))}
							</div>
						</div>

						{menuItems.map((item) => (
							<Link key={item.href} href={item.href} className='text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium hover:bg-[#EAE2D0] rounded-[5px]'>
								{item.label}
							</Link>
						))}
					</div>
					<div className='hidden md:flex items-center space-x-4'>
						{authItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className='flex items-center justify-center text-gray-700 border border-black px-8 rounded-full text-sm font-medium hover:bg-[#EAE2D0] hover:text-gray-900 hover:shadow-lg transition-all bg-transparent h-10'>
								{item.label}
							</Link>
						))}
					</div>

					{/* Mobile menu button */}
					<div className='md:hidden'>
						<button type='button' onClick={() => setMobileOpen(!mobileOpen)} className='text-gray-700 hover:text-gray-900 p-2'>
							<svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
							</svg>
						</button>
					</div>
				</div>

				{/* Mobile Menu */}
				<div className={`md:hidden ${mobileOpen ? 'block' : 'hidden'} border-t border-gray-200`}>
					<div className='px-4 py-4 space-y-1'>
						<div>
							<div onClick={() => setIsOpen(!isOpen)} className='flex items-center text-gray-700 px-3 py-2 text-sm font-medium w-full text-left cursor-pointer'>
								Platforms
								<svg className={`ml-1 w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill='none' stroke='currentColor' viewBox='0 0 24 24'>
									<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
								</svg>
							</div>
							<div className={`${isOpen ? 'block' : 'hidden'} ml-4 space-y-2`}>
								{platformItems.map((item) => (
									<Link key={item.href} href={item.href} className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'>
										{item.label}
									</Link>
								))}
							</div>
						</div>
						{menuItems.map((item) => (
							<Link key={item.href} href={item.href} className='block text-gray-700 px-3 py-2 text-sm font-medium hover:bg-[#EAE2D0] rounded-[5px]'>
								{item.label}
							</Link>
						))}
						<div className='flex mt-5 space-x-4 justify-center'>
							{authItems.map((item) => (
								<Link
									key={item.href}
									href={item.href}
									className='flex items-center justify-center text-gray-700 border border-black px-8 rounded-full text-sm font-medium hover:bg-[#EAE2D0] hover:text-gray-900 hover:shadow-lg transition-all bg-transparent h-10'>
									{item.label}
								</Link>
							))}
						</div>
					</div>
				</div>
			</nav>
		</header>
	);
}
