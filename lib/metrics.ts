import { Platform, Document } from './db';

export type DashboardMetrics = {
	platformsSupported: number;
	platformsActive: number;
	platformsInactive: number;
	invoicesDownloaded: number;
	invoicesDue: number;
	invoicesPaid: number;
	totalPaidAmount: number;
	totalDueAmount: number;
};

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
	try {
		const [platformsSupported, platformsWithSync, invoicesDownloaded] = await Promise.all([
			Platform.countDocuments().exec(),
			Platform.countDocuments({ last_sync: { $exists: true, $ne: null } }).exec(),
			Document.countDocuments().exec(),
		]);

		const platformsActive = platformsWithSync;
		const platformsInactive = Math.max(platformsSupported - platformsActive, 0);

		// If future fields exist on Document, compute status/amounts; otherwise default to 0.
		// We defensively check for fields `status` and `amount` but the current schema may not have them.
		let invoicesDue = 0;
		let invoicesPaid = 0;
		let totalPaidAmount = 0;
		let totalDueAmount = 0;

		try {
			const docs = await Document.find({}, { status: 1, amount: 1 }).lean().exec();
			for (const d of docs as any[]) {
				if (d.status === 'paid') {
					invoicesPaid += 1;
					if (typeof d.amount === 'number') totalPaidAmount += d.amount;
				} else if (d.status === 'due') {
					invoicesDue += 1;
					if (typeof d.amount === 'number') totalDueAmount += d.amount;
				}
			}
		} catch {
			// If querying unknown fields throws, keep zeros.
		}

		return {
			platformsSupported,
			platformsActive,
			platformsInactive,
			invoicesDownloaded,
			invoicesDue,
			invoicesPaid,
			totalPaidAmount,
			totalDueAmount,
		};
	} catch (err) {
		// On connection or query error, return zeros to keep UI stable.
		return {
			platformsSupported: 0,
			platformsActive: 0,
			platformsInactive: 0,
			invoicesDownloaded: 0,
			invoicesDue: 0,
			invoicesPaid: 0,
			totalPaidAmount: 0,
			totalDueAmount: 0,
		};
	}
}
