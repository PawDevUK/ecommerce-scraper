import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Link from 'next/link';
import './globals.css';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'eCommerce Scraper',
	description: 'Automated document retrieval from eCommerce platforms',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body>
				<header className='bg-amazon shadow-sm border-b border-gray-200 mainPading'>
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
							<div className='flex-shrink-0'></div>

							{/* Desktop Navigation */}
							<div className='hidden md:flex items-center space-x-8'>
								<div className='relative group'>
									<button className='flex items-center text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium'>
										Solutions
										<svg className='ml-1 w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
											<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
										</svg>
									</button>
									{/* Dropdown would go here */}
								</div>

								<Link href='/supplies' className='text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium'>
									Supplies
								</Link>

								<Link href='/delivery' className='text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium'>
									Delivery
								</Link>

								<div className='relative group'>
									<button className='flex items-center text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium'>
										Industries
										<svg className='ml-1 w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
											<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
										</svg>
									</button>
									{/* Dropdown would go here */}
								</div>

								<Link href='/resources' className='text-gray-700 hover:text-gray-900 px-3 py-2 text-sm font-medium'>
									Resources
								</Link>
							</div>

							{/* CTA Buttons */}
							<div className='hidden md:flex items-center space-x-4'>
								<Link href='/contact' className='text-gray-700 hover:text-gray-900 px-4 py-2 text-sm font-medium'>
									Contact Sales
								</Link>
								<Link href='/signup' className='bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors'>
									Get Started
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

				{/* Main Content */}
				<main className='min-h-screen'>{children}</main>

				{/* Footer */}
				<footer className='bg-amazon text-amazon py-8'>
					<div className='max-w-7xl mx-auto px-4'>
						<div className='text-center'>
							<p className=' text-sm'>© 2026 Fetchy. All rights reserved.</p>
						</div>
					</div>
				</footer>
			</body>
		</html>
	);
}
