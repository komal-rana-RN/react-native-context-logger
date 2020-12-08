/* eslint-disable no-unused-vars */
import { useCallback } from "react";
import _ from "lodash";
import { allFile, sizeOfFile, createFile, deleteFile, isFile, editFile, readFile, uploadFile } from "./fileManager";
import { generateKey, encryptData, decryptData } from "./fileEncryption";
import config from "../config";
const { ENCRYPTION_KEY, SPLITING_STRING_WHILE_FILEENCRYPTION, LOGGER_FILE_NAME } = config;

const useLogger = (reducer) => {
	const reducerWithLogger = useCallback((state, action) => {
		const next = reducer(state, action);
		if (__DEV__ === false) {
			const newLog = {
				timestamp: new Date().toUTCString(),
				actionType: action.type,
				actionPayload: action.payload,
				currentState: state
			};

			var FileName = `${LOGGER_FILE_NAME}.txt`;
			sizeOfFile(FileName).then(size => {
				if (size != undefined) {
					let index = _.round(size / 5);
					FileName = LOGGER_FILE_NAME + index.toString() + ".txt";
					console.log("FileName: ", FileName);
				}

				isFile(FileName).then(res => {
					var encryptedData = "";
					JSON.stringify(newLog);
					console.log("jsonStringify", newLog);
					//#region  encryption
					encryptData(
						JSON.stringify(newLog),
						ENCRYPTION_KEY
					).then(e => {
						encryptedData = e;
						editFile(FileName, e + SPLITING_STRING_WHILE_FILEENCRYPTION);
					});
					//#endregion



					if (res) {
						editFile(FileName, encryptedData + SPLITING_STRING_WHILE_FILEENCRYPTION);
					} else {
						createFile(FileName, encryptedData);
					}

					//#region if you want to see origin file content
					readFile(FileName).then(res => {
						let arrayBySplitString = res.split(SPLITING_STRING_WHILE_FILEENCRYPTION);
						arrayBySplitString = arrayBySplitString.filter(el => { return el != null && el != ""; });
						console.log("Array======>", arrayBySplitString);
						arrayBySplitString.map(item => {
							decryptData(
								item,
								ENCRYPTION_KEY
							).then(e => {
								console.log("Final FIle Dec", JSON.parse(e));
							});
						});
					}
					);
					//#endregion

				});
			});
		}

		console.log("%cPrevious State:", "color: #E11144; font-weight: 700;", state);
		console.log("%cAction:", "color: #00A7F7; font-weight: 700;", action);
		console.log("%cNext State:", "color: #47B04B; font-weight: 700;", next);
		return next;
	}, [reducer]);

	return reducerWithLogger;
};

export default useLogger;