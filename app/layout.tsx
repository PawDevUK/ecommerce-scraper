import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import Link from 'next/link';
import Navigation from './components/Navigation';
import './globals.css';

const roboto = Roboto({
	subsets: ['latin'],
	weight: ['400', '500', '700'],
	display: 'swap',
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
			<body className={roboto.className}>
				<Navigation />

				{/* Main Content */}
				<main className='min-h-screen max-w-[1000px] mx-auto px-4'>{children}</main>

				{/* Footer */}
				<footer className='bg-amazon text-gray-700 py-8'>
					<div className='max-w-[1000px] mx-auto px-4'>
						<div className='text-center'>
							<p className=' text-sm'>© 2026 Fetchy. All rights reserved.</p>
						</div>
					</div>
				</footer>
			</body>
		</html>
	);
}
