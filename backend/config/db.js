import mongoose from 'mongoose';

const connectDb = async () => {
	try {
		let success = await mongoose.connect(process.env.MONGODB_URI, {
			useCreateIndex: true,
			useFindAndModify: true,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		if (success)
			console.log(
				`MongoDB Connected: ${success.connection.host}`.cyan.underline
			);
	} catch (err) {
		console.log(`MONGO DB ERROR ${err.message}`.red.underline.bold);
		process.exit(1);
	}
};

export default connectDb;
