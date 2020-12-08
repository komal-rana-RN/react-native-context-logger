var RNFS = require("react-native-fs");
import RNFetchBlob from "rn-fetch-blob";
//var path = RNFS.DocumentDirectoryPath + '/test.text';
//ExternalStorageDirectoryPath
export const createFile = async (filename, content) => {
	var path = RNFS.DocumentDirectoryPath + "/" + filename;

	try {
		await RNFS.writeFile(path, content, "utf8");
		return true;
	} catch (err) {
		console.error(`createFile ${err.message}`);
		return false;
	}
};
export const readFile = async filename => {
	var path = RNFS.DocumentDirectoryPath + "/" + filename;
	const result = await RNFS.readFile(path);
	console.log("fileResukt", result);
	return result;
};
export const sizeOfFile = async filename => {
	var path = RNFS.DocumentDirectoryPath + "/" + filename;
	try {
		const stats = await RNFetchBlob.fs
			.stat(path);
		let size = stats.size / 1048576;
		return size;
	} catch (err) {
		console.error(`sizeOfFile ${err.message}`);
		return undefined;
	}
};
export const editFile = async (filename, content) => {
	var path = RNFS.DocumentDirectoryPath + "/" + filename;
	try {
		const res = await RNFS.appendFile(path, content);
		return res;
	} catch (err) {
		console.error(`editFile ${err.message}`);
		return err.message;
	}
};
export const deleteFile = filename => {
	var path = RNFS.DocumentDirectoryPath + "/" + filename;
	return (
		RNFS.unlink(path)
			.then(res => {
				console.log("FILE DELETED", res);
				return res;
			})
			// `unlink` will throw an error, if the item to unlink does not exist
			.catch(err => {
				console.error(`deleteFile ${err.message}`);
				return false;
			})
	);
};
export const isFile = filename => {
	var path = RNFS.DocumentDirectoryPath + "/" + filename;
	let result;
	result = RNFS.exists(path)
		.then(res => {
			return res;
		})
		.catch(err => {
			console.error(`isFile ${err.message}`);
			console.log(err.message);
			return false;
		});
	// //console.log('inner fun', result);

	return result;
};
export const allFile = () => {
	RNFS.readDir(RNFS.DocumentDirectoryPath)
		.then(result => {
			console.log("GOT RESULT", result);
			return Promise.all([RNFS.stat(result[0].path), result[0].path]);
		})
		.then(statResult => {
			if (statResult[0].isFile()) {
				return RNFS.readFile(statResult[1], "utf8");
			}
			return "no file";
		})
		.then(contents => {
			console.log(contents);
		})
		.catch(err => {
			console.error(`allFile ${err.message}`);
			//console.log(err.message, err.code);
		});
};
export const uploadFile = (filename, ApiUploadUrl) => {
	var path = RNFS.DocumentDirectoryPath + "/" + filename;

	const files = [
		{
			name: filename,
			filename: filename,
			filepath: path,
			filetype: "txt" //'image/jpeg',
		}
	];
	RNFS.uploadFiles({
		toUrl: ApiUploadUrl,
		files,
		method: "POST",
		headers: ""
	});
	// const uploadPromise = await r;
	// const promiseResult = await uploadPromise.promise;
};
