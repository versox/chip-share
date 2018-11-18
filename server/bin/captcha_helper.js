const svgCaptcha = require('svg-captcha');
const secret = process.env.CHIP_SHARE_SECRET || 'tKggDGt0t4';
const Cryptr = require('cryptr');
const cryptr = new Cryptr(secret);
const usedCaptchas = {};
setInterval(function() {
	const now = Math.round(Date.now()/1000);
	for (const key in usedCaptchas) {
		const expiry = usedCaptchas[key];
		if (expiry > now) {
			delete usedCaptchas[key];
		}
	}
}, 60000);
exports.generateCaptcha = function() {
	return new Promise(function(resolve) {
		const captcha = svgCaptcha.create({size: 6, background: 'black', width: 150, height: 50});
		const expiry = Math.round(Date.now()/1000)+300; // 5 minutes
		const key = cryptr.encrypt(captcha.text+'|'+expiry);
		resolve([captcha.data, key]);
	});
};
exports.checkCaptcha = function(answer, key) {
	return new Promise(function(resolve, reject) {
		if (!answer || typeof answer !== 'string')
			reject(new Error('No captcha answer provided.'));
		if (!key || typeof key !== 'string')
			reject(new Error('Invalid captcha key.'));
		try {
			const value = cryptr.decrypt(key);
			if (usedCaptchas.hasOwnProperty(key))
				return reject(new Error('Captcha key has already been used.'));
			const [correctAnswer, expiry] = value.split('|');
			if (Math.round(Date.now()/1000) >= parseInt(expiry))
				return reject(new Error('Captcha has expired.'));
			if (correctAnswer !== answer)
				return reject(new Error('Invalid captcha answer.'));
			usedCaptchas[key] = expiry;
			resolve();
		} catch (e) {
			reject(new Error('Invalid captcha key.'));
		}
	});
};