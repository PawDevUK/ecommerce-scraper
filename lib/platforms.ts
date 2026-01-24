import { Platform, Document } from './db';
import mongoose from 'mongoose';

interface PlatformLean {
	_id: mongoose.Types.ObjectId;
	name: string;
	url: string;
	username: string;
	last_sync?: string;
}

interface DocumentLean {
	_id: mongoose.Types.ObjectId;
	document_id: string;
	filename: string;
	downloaded_at: Date;
	date?: string;
	status?: 'paid' | 'due';
	amount?: number;
}

export type PlatformDetail = {
	_id: string;
	name: string;
	url: string;
	username: string;
	last_sync?: string;
	isActive: boolean;
};

export type InvoiceItem = {
	_id: string;
	document_id: string;
	filename: string;
	downloaded_at: Date;
	date?: string;
	status?: 'paid' | 'due';
	amount?: number;
};

export type PlatformWithInvoices = {
	platform: PlatformDetail;
	invoices: InvoiceItem[];
	totalInvoices: number;
};

export async function getAllPlatforms(): Promise<PlatformDetail[]> {
	try {
		const platforms = (await Platform.find({}, { name: 1, url: 1, username: 1, last_sync: 1 }).lean().exec()) as PlatformLean[];
		return platforms.map((p: PlatformLean) => ({
			_id: p._id?.toString() ?? '',
			name: p.name,
			url: p.url,
			username: p.username,
			last_sync: p.last_sync,
			isActive: !!p.last_sync,
		}));
	} catch {
		return [];
	}
}

export async function getPlatformWithInvoices(platformId: string): Promise<PlatformWithInvoices | null> {
	try {
		let objectId: mongoose.Types.ObjectId;
		try {
			objectId = new mongoose.Types.ObjectId(platformId);
		} catch {
			return null;
		}

		const platform = (await Platform.findById(objectId).lean().exec()) as PlatformLean | null;
		if (!platform) return null;

		const invoices = (await Document.find({ platform_id: objectId }).lean().exec()) as DocumentLean[];

		return {
			platform: {
				_id: platform._id?.toString() ?? platformId,
				name: platform.name,
				url: platform.url,
				username: platform.username,
				last_sync: platform.last_sync,
				isActive: !!platform.last_sync,
			},
			invoices: invoices.map((inv: DocumentLean) => ({
				_id: inv._id?.toString() ?? '',
				document_id: inv.document_id,
				filename: inv.filename,
				downloaded_at: inv.downloaded_at,
				date: inv.date,
				status: inv.status,
				amount: inv.amount,
			})),
			totalInvoices: invoices.length,
		};
	} catch {
		return null;
	}
}
