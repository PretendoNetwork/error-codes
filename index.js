const path = require('node:path');
const fs = require('node:fs');

function getModuleInfo(sysmodule, locale) {
	const localePath = path.join(__dirname, 'data', sysmodule, `${locale.replace('-', '_')}.json`);
	const defaultPath = path.join(__dirname, 'data', sysmodule, 'en_US.json');
	let content;

	if (fs.existsSync(localePath)) {
		content = fs.readFileSync(localePath, {
			encoding: 'utf8'
		});
	} else if (fs.existsSync(defaultPath)) {
		content = fs.readFileSync(defaultPath, {
			encoding: 'utf8'
		});
	} else {
		return null;
	}

	return JSON.parse(content);
}

function getErrorInfo(sysmodule, code, locale) {
	const moduleInfo = getModuleInfo(sysmodule, locale);

	if (!moduleInfo) {
		return null;
	}

	const localePath = path.join(__dirname, 'data', sysmodule, code, `${locale.replace('-', '_')}.json`);
	const defaultPath = path.join(__dirname, 'data', sysmodule, code, 'en_US.json');
	let content;

	if (fs.existsSync(localePath)) {
		content = fs.readFileSync(localePath, {
			encoding: 'utf8'
		});
	} else if (fs.existsSync(defaultPath)) {
		content = fs.readFileSync(defaultPath, {
			encoding: 'utf8'
		});
	} else {
		return null;
	}

	const errorInfo = JSON.parse(content)[sysmodule][code];

	errorInfo.module = moduleInfo[sysmodule];

	return errorInfo;
}

function getAllErrors() {
	const errors = [];

	const modules = fs.readdirSync(path.join(__dirname, 'data'), { withFileTypes: true });

	for (const moduleDirent of modules) {
		if (moduleDirent.isDirectory()) {
			const errorCodes = fs.readdirSync(path.join(__dirname, 'data', moduleDirent.name), { withFileTypes: true });

			for (const errorDirent of errorCodes) {
				if (errorDirent.isDirectory()) {
					errors.push(`${moduleDirent.name}-${errorDirent.name}`);
				}
			}
		}
	}

	return errors;
}

module.exports = {
	getModuleInfo,
	getErrorInfo,
	getAllErrors
};