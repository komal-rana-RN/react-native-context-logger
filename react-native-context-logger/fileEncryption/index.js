import { NativeModules } from "react-native";
import config from "../config";
const { ENCRYPTION_IV } = config;
/**
 * npm i react-native-aes-crypto
 */
var { Aes } = NativeModules;

const GenerateKeyfn = (password, salt, cost, length) => Aes.pbkdf2(password, salt, cost, length);

const EncryptDatafn = (text, key) => {
	return Aes.randomKey(16).then(iv => {
		iv = ENCRYPTION_IV;
		return Aes.encrypt(text, key, iv).then(cipher => ({
			cipher,
			iv
		}));
	});
};

const DecryptDatafn = (encryptedData, key) => {
	return Aes.decrypt(encryptedData.data, key, encryptedData.iv);
};

export const generateKey = (text, salt) => {
	return GenerateKeyfn(text, salt, 5000, 256);
};

export const encryptData = (data, key) => {
	return EncryptDatafn(data, key).then(({ cipher }) => {

		return cipher;
		// Aes.hmac256(cipher, key).then(hash => {
		//     //console.log('HMAC', hash);
		// });
	});
};

export const decryptData = (data, key) => {
	var iv = ENCRYPTION_IV;

	return DecryptDatafn({ data, iv }, key)
		.then(text => {
			// console.log('Decrypted in decrypt:', text);
			return text;
		})
		.catch(error => {
			console.log(error);
		});
};

// generateKey('Arnold', 'salt', 5000, 256).then(key => {
//     console.log('Key:', key);
//     encryptData(JSON.stringify(newLog), key)
//         .then(({ cipher, iv }) => {
//             encryptedData = cipher;
//             console.log('Encrypted:', cipher);

//             // decryptData({ cipher, iv }, key)
//             //     .then(text => {
//             //         //  console.log('Decrypted:', text);
//             //     })
//             //     .catch(error => {
//             //         console.log(error);
//             //     });

//             // Aes.hmac256(cipher, key).then(hash => {
//             //     //console.log('HMAC', hash);
//             // });
//         })
//         .catch(error => {
//             console.log(error);
//         });
// });
