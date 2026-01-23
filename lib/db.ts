import mongoose, { Document as MongooseDocument } from 'mongoose';

const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://your-connection-string';

mongoose.connect(mongoURI);

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

const Platform = mongoose.model<IPlatform>('Platform', platformSchema);
const Document = mongoose.model<IDocument>('Document', documentSchema);

export { Platform, Document };
