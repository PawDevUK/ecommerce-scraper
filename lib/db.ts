import mongoose, { Document as MongooseDocument } from 'mongoose';

// Enable a simple in-memory mock when MOCK_DB=true or no URI is provided.
const mongoURI = process.env.MONGODB_URI;
const useMock = !mongoURI || process.env.MOCK_DB === 'true';

export interface IPlatform extends MongooseDocument {
	name: string;
	url: string;
	username: string;
	password: string;
	iv: string;
	totp_secret?: string;
	totp_iv?: string;
	last_sync?: string;
}

interface IDocument extends MongooseDocument {
	platform_id: mongoose.Types.ObjectId;
	document_id: string;
	date?: string;
	filename: string;
	downloaded_at: Date;
}

let Platform: any;
let Document: any;

if (useMock) {
	// --- Mock data ---
	type MockPlatform = {
		_id: mongoose.Types.ObjectId;
		name: string;
		url: string;
		username: string;
		password: string;
		iv: string;
		totp_secret?: string;
		totp_iv?: string;
		last_sync?: string;
	};
	const platformId1 = new mongoose.Types.ObjectId('507f1f77bcf86cd799439011');
	const platformId2 = new mongoose.Types.ObjectId('507f1f77bcf86cd799439012');
	const platformId3 = new mongoose.Types.ObjectId('507f1f77bcf86cd799439013');
	const platformId4 = new mongoose.Types.ObjectId('507f1f77bcf86cd799439014');
	const platformId5 = new mongoose.Types.ObjectId('507f1f77bcf86cd799439015');

	const mockPlatforms: MockPlatform[] = [
		{
			_id: platformId1,
			name: 'Amazon Business',
			url: 'https://www.amazon.com',
			username: 'demo@company.com',
			password: 'encrypted',
			iv: 'iv',
			last_sync: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
		},
		{
			_id: platformId2,
			name: 'eBay',
			url: 'https://www.ebay.com',
			username: 'demo2@company.com',
			password: 'encrypted',
			iv: 'iv',
			last_sync: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
		},
		{
			_id: platformId3,
			name: 'Screwfix',
			url: 'https://www.screwfix.com',
			username: 'screwfix@company.com',
			password: 'encrypted',
			iv: 'iv',
			last_sync: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 hours ago
		},
		{
			_id: platformId4,
			name: 'RS Components',
			url: 'https://www.rs-online.com',
			username: 'rs@company.com',
			password: 'encrypted',
			iv: 'iv',
			last_sync: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
		},
		{
			_id: platformId5,
			name: 'Bidfood',
			url: 'https://www.bidfood.co.uk',
			username: 'bidfood@company.com',
			password: 'encrypted',
			iv: 'iv',
			last_sync: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
		},
		{
			_id: new mongoose.Types.ObjectId('507f1f77bcf86cd799439016'),
			name: 'CostCo',
			url: 'https://www.costco.com',
			username: 'costco@company.com',
			password: 'encrypted',
			iv: 'iv',
			last_sync: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
		},
	];

	type MockDoc = {
		_id?: mongoose.Types.ObjectId;
		platform_id: mongoose.Types.ObjectId;
		document_id: string;
		date?: string;
		filename: string;
		downloaded_at: Date;
		status?: 'paid' | 'due';
		amount?: number;
	} & Record<string, any>;
	const mockDocuments: MockDoc[] = [
		// Amazon Business invoices
		{
			_id: new mongoose.Types.ObjectId(),
			platform_id: platformId1,
			document_id: 'AMZ-INV-1001',
			filename: 'amazon-inv-1001.pdf',
			downloaded_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
			status: 'paid',
			amount: 342.75,
		},
		{
			_id: new mongoose.Types.ObjectId(),
			platform_id: platformId1,
			document_id: 'AMZ-INV-1002',
			filename: 'amazon-inv-1002.pdf',
			downloaded_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
			status: 'due',
			amount: 189.99,
		},
		{
			_id: new mongoose.Types.ObjectId(),
			platform_id: platformId1,
			document_id: 'AMZ-INV-1003',
			filename: 'amazon-inv-1003.pdf',
			downloaded_at: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
			status: 'paid',
			amount: 456.2,
		},
		{
			_id: new mongoose.Types.ObjectId(),
			platform_id: platformId1,
			document_id: 'AMZ-INV-1004',
			filename: 'amazon-inv-1004.pdf',
			downloaded_at: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
			status: 'paid',
			amount: 678.5,
		},
		// eBay invoices
		{
			_id: new mongoose.Types.ObjectId(),
			platform_id: platformId2,
			document_id: 'EBAY-INV-2001',
			filename: 'ebay-inv-2001.pdf',
			downloaded_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
			status: 'due',
			amount: 125.0,
		},
		{
			_id: new mongoose.Types.ObjectId(),
			platform_id: platformId2,
			document_id: 'EBAY-INV-2002',
			filename: 'ebay-inv-2002.pdf',
			downloaded_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
			status: 'paid',
			amount: 89.99,
		},
		{
			_id: new mongoose.Types.ObjectId(),
			platform_id: platformId2,
			document_id: 'EBAY-INV-2003',
			filename: 'ebay-inv-2003.pdf',
			downloaded_at: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
			status: 'paid',
			amount: 234.5,
		},
		// Screwfix invoices
		{
			_id: new mongoose.Types.ObjectId(),
			platform_id: platformId3,
			document_id: 'SCREWFIX-INV-3001',
			filename: 'screwfix-inv-3001.pdf',
			downloaded_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
			status: 'paid',
			amount: 567.8,
		},
		{
			_id: new mongoose.Types.ObjectId(),
			platform_id: platformId3,
			document_id: 'SCREWFIX-INV-3002',
			filename: 'screwfix-inv-3002.pdf',
			downloaded_at: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
			status: 'due',
			amount: 321.45,
		},
		{
			_id: new mongoose.Types.ObjectId(),
			platform_id: platformId3,
			document_id: 'SCREWFIX-INV-3003',
			filename: 'screwfix-inv-3003.pdf',
			downloaded_at: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
			status: 'paid',
			amount: 198.75,
		},
		{
			_id: new mongoose.Types.ObjectId(),
			platform_id: platformId3,
			document_id: 'SCREWFIX-INV-3004',
			filename: 'screwfix-inv-3004.pdf',
			downloaded_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
			status: 'paid',
			amount: 445.9,
		},
		{
			_id: new mongoose.Types.ObjectId(),
			platform_id: platformId3,
			document_id: 'SCREWFIX-INV-3005',
			filename: 'screwfix-inv-3005.pdf',
			downloaded_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
			status: 'paid',
			amount: 278.3,
		},
		// RS Components invoices
		{
			_id: new mongoose.Types.ObjectId(),
			platform_id: platformId4,
			document_id: 'RS-INV-4001',
			filename: 'rs-inv-4001.pdf',
			downloaded_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
			status: 'due',
			amount: 892.4,
		},
		{
			_id: new mongoose.Types.ObjectId(),
			platform_id: platformId4,
			document_id: 'RS-INV-4002',
			filename: 'rs-inv-4002.pdf',
			downloaded_at: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
			status: 'paid',
			amount: 1234.56,
		},
		{
			_id: new mongoose.Types.ObjectId(),
			platform_id: platformId4,
			document_id: 'RS-INV-4003',
			filename: 'rs-inv-4003.pdf',
			downloaded_at: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
			status: 'paid',
			amount: 678.9,
		},
		{
			_id: new mongoose.Types.ObjectId(),
			platform_id: platformId4,
			document_id: 'RS-INV-4004',
			filename: 'rs-inv-4004.pdf',
			downloaded_at: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000),
			status: 'paid',
			amount: 543.2,
		},
		// Bidfood invoices
		{
			_id: new mongoose.Types.ObjectId(),
			platform_id: platformId5,
			document_id: 'BIDFOOD-INV-5001',
			filename: 'bidfood-inv-5001.pdf',
			downloaded_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
			status: 'due',
			amount: 1567.8,
		},
		{
			_id: new mongoose.Types.ObjectId(),
			platform_id: platformId5,
			document_id: 'BIDFOOD-INV-5002',
			filename: 'bidfood-inv-5002.pdf',
			downloaded_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
			status: 'paid',
			amount: 2345.67,
		},
		{
			_id: new mongoose.Types.ObjectId(),
			platform_id: platformId5,
			document_id: 'BIDFOOD-INV-5003',
			filename: 'bidfood-inv-5003.pdf',
			downloaded_at: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
			status: 'paid',
			amount: 1890.25,
		},
		// CostCo invoices
		{
			_id: new mongoose.Types.ObjectId(),
			platform_id: new mongoose.Types.ObjectId('507f1f77bcf86cd799439016'),
			document_id: 'COSTCO-INV-6001',
			filename: 'costco-inv-6001.pdf',
			downloaded_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
			status: 'paid',
			amount: 789.5,
		},
		{
			_id: new mongoose.Types.ObjectId(),
			platform_id: new mongoose.Types.ObjectId('507f1f77bcf86cd799439016'),
			document_id: 'COSTCO-INV-6002',
			filename: 'costco-inv-6002.pdf',
			downloaded_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
			status: 'due',
			amount: 1456.9,
		},
		{
			_id: new mongoose.Types.ObjectId(),
			platform_id: new mongoose.Types.ObjectId('507f1f77bcf86cd799439016'),
			document_id: 'COSTCO-INV-6003',
			filename: 'costco-inv-6003.pdf',
			downloaded_at: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000),
			status: 'paid',
			amount: 567.25,
		},
		{
			_id: new mongoose.Types.ObjectId(),
			platform_id: new mongoose.Types.ObjectId('507f1f77bcf86cd799439016'),
			document_id: 'COSTCO-INV-6004',
			filename: 'costco-inv-6004.pdf',
			downloaded_at: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000),
			status: 'paid',
			amount: 2134.8,
		},
	];

	// --- Mock models ---
	Platform = {
		countDocuments(query: any = {}) {
			const hasLastSyncQuery = query && Object.prototype.hasOwnProperty.call(query, 'last_sync');
			let count = mockPlatforms.length;
			if (hasLastSyncQuery) {
				const cond = query.last_sync;
				// We support filter last_sync: { $exists: true, $ne: null }
				if (cond && typeof cond === 'object') {
					const exists = cond.$exists === true;
					const neNull = cond.$ne === null ? true : false;
					count = mockPlatforms.filter((p) => {
						const hasValue = !!p.last_sync;
						return (exists ? hasValue : true) && (neNull ? p.last_sync !== null : true);
					}).length;
				}
			}
			return { exec: async () => count };
		},
		find(_query: any = {}, _projection: any = {}) {
			const result = mockPlatforms.map((p) => {
				if (_projection && Object.keys(_projection).length) {
					const out: any = { _id: p._id }; // Always include _id like MongoDB does
					for (const key of Object.keys(_projection)) {
						if (_projection[key]) out[key] = (p as any)[key];
					}
					return out;
				}
				return p;
			});
			return {
				lean() {
					return { exec: async () => result };
				},
			};
		},
		findById(id: any) {
			const match = mockPlatforms.find((p) => p._id.toString() === id.toString());
			return {
				lean() {
					return { exec: async () => match ?? null };
				},
			};
		},
	};

	Document = class {
		static countDocuments() {
			return { exec: async () => mockDocuments.length };
		}

		static find(_query: any = {}, _projection: any = {}) {
			let filtered = mockDocuments;
			if (_query.platform_id) {
				filtered = mockDocuments.filter((d) => d.platform_id.toString() === _query.platform_id.toString());
			}
			const result = filtered.map((d) => {
				if (_projection && Object.keys(_projection).length) {
					const out: any = { _id: d._id }; // Always include _id like MongoDB does
					for (const key of Object.keys(_projection)) {
						if (_projection[key]) out[key] = (d as any)[key];
					}
					return out;
				}
				return d;
			});
			return {
				lean() {
					return { exec: async () => result };
				},
			};
		}

		static async findOne(query: any) {
			const match = mockDocuments.find((d) => {
				return Object.keys(query).every((k) => (d as any)[k] === query[k]);
			});
			return match ?? null;
		}

		platform_id!: mongoose.Types.ObjectId;
		document_id!: string;
		date?: string;
		filename!: string;
		downloaded_at!: Date;
		status?: 'paid' | 'due';
		amount?: number;

		constructor(data: any) {
			Object.assign(this, data);
		}

		async save() {
			mockDocuments.push({ ...(this as any) });
		}
	};
} else {
	mongoose.connect(mongoURI!);

	const platformSchema = new mongoose.Schema<IPlatform>({
		name: { type: String, required: true },
		url: { type: String, required: true },
		username: { type: String, required: true },
		password: { type: String, required: true },
		iv: { type: String, required: true },
		totp_secret: String,
		totp_iv: String,
		last_sync: String,
	});

	const documentSchema = new mongoose.Schema<IDocument>({
		platform_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Platform', required: true },
		document_id: { type: String, required: true },
		date: String,
		filename: { type: String, required: true },
		downloaded_at: { type: Date, default: Date.now },
	});

	Platform = mongoose.model<IPlatform>('Platform', platformSchema);
	Document = mongoose.model<IDocument>('Document', documentSchema);
}

export { Platform, Document };
