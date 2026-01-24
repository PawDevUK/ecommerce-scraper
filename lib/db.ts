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

	const mockPlatforms: MockPlatform[] = [
		{
			_id: platformId1,
			name: 'Amazon Business',
			url: 'https://www.amazon.com',
			username: 'demo@company.com',
			password: 'encrypted',
			iv: 'iv',
			last_sync: new Date().toISOString(),
		},
		{
			_id: platformId2,
			name: 'eBay',
			url: 'https://www.ebay.com',
			username: 'demo2@company.com',
			password: 'encrypted',
			iv: 'iv',
			last_sync: undefined,
		},
		{
			_id: platformId3,
			name: 'Allegro',
			url: 'https://allegro.pl',
			username: 'demo3@company.com',
			password: 'encrypted',
			iv: 'iv',
			last_sync: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
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
		{
			_id: new mongoose.Types.ObjectId(),
			platform_id: platformId1,
			document_id: 'INV-1001',
			filename: 'inv-1001.pdf',
			downloaded_at: new Date(),
			status: 'paid',
			amount: 120.5,
		},
		{ _id: new mongoose.Types.ObjectId(), platform_id: platformId1, document_id: 'INV-1002', filename: 'inv-1002.pdf', downloaded_at: new Date(), status: 'due', amount: 80.0 },
		{
			_id: new mongoose.Types.ObjectId(),
			platform_id: platformId1,
			document_id: 'INV-1003',
			filename: 'inv-1003.pdf',
			downloaded_at: new Date(),
			status: 'paid',
			amount: 50.0,
		},
		{
			_id: new mongoose.Types.ObjectId(),
			platform_id: platformId2,
			document_id: 'INV-1004',
			filename: 'inv-1004.pdf',
			downloaded_at: new Date(),
			status: 'due',
			amount: 35.99,
		},
		{
			_id: new mongoose.Types.ObjectId(),
			platform_id: platformId3,
			document_id: 'INV-1005',
			filename: 'inv-1005.pdf',
			downloaded_at: new Date(),
			status: 'paid',
			amount: 200.0,
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
