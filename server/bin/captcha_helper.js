const svgCaptcha = require('svg-captcha');
const secret = process.env.CHIP_SHARE_SECRET || 'tKggDGt0t4';
const jwt = require('jsonwebtoken');
const Cryptr = require('cryptr');
const cryptr = new Cryptr(secret);
exports.generateCaptcha = function() {
	return new Promise(function(resolve, reject) {
		const captcha = svgCaptcha.create({size: 6, background: 'black', width: 150, height: 50});
		const encVal = cryptr.encrypt(captcha.text);
		jwt.sign({ value: encVal }, secret, { expiresIn: '5m' }, function(err, captchaToken) {
			if (err)
				reject(err);
			else
				resolve([captcha.data, captchaToken]);
		});
	});
};
exports.checkCaptcha = function(answer, captchaToken) {
	return new Promise(function(resolve, reject) {
		if (!answer || typeof answer !== 'string')
			reject(new Error('No captcha answer provided.'));
		if (!captchaToken || typeof captchaToken !== 'string')
			reject(new Error('Invalid captcha token.'));
		jwt.verify(captchaToken, secret, function(err, decoded) {
			if (err)
				return reject(new Error('Invalid/expired captcha token.'));
			else {
				try {
					const value = cryptr.decrypt(decoded.value);
					if (value !== answer)
						return reject(new Error('Invalid captcha answer.'));
					resolve();
				} catch (e) {
					reject(new Error('Invalid captcha answer.'));
				}
			}
		});
	});
};