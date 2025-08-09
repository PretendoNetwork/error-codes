import fs from 'fs';
import path from 'path';

// This script does a number of things:
// - Normalises the descriptions and solutions to be "Unknown cause." and "Unknown solution." rather than "N/A"
// - If one of the descriptions or solutions is "Unknown cause." or "Unknown solution.", the other will be copied to it
// - Ensures all descriptions and solutions end with a full stop if they do not already and if the last character is a letter
// - Writes the changes back to the file in place

const arg = process.argv[2];
if (!arg || !fs.existsSync(arg) || !fs.lstatSync(arg).isDirectory()) {
	console.log("Please provide a valid directory path.");
	process.exit(1);
}

fs.readdirSync(arg, { recursive: true, withFileTypes: true }).forEach(file => {
	if (!file.isFile() && !file.name.endsWith(".json")) return;

	const fullPath = path.join(file.parentPath, file.name);

	console.log(`Processing ${fullPath}`);

	const data = fs.readFileSync(fullPath, 'utf8');
	const json = JSON.parse(data);

	const key1 = Object.keys(json)[0];
	const key2 = Object.keys(json[key1])[0];

	const errorObject = json[key1][key2];
	if (!errorObject || typeof errorObject !== "object") {
		console.error(`No error object found in ${fullPath}`);
		return;
	}

	if (!errorObject["short_description"] || !errorObject["long_description"] || !errorObject["short_solution"] || !errorObject["long_solution"]) {
		console.error(`Missing fields in ${fullPath}`);
		return;
	}

	const {
		short_description,
		long_description,
		short_solution,
		long_solution,
	} = errorObject;

	if (short_description === "Unknown cause." && long_description !== "Unknown cause.") {
		errorObject["short_description"] = long_description;
	} else if (short_description !== "Unknown cause." && long_description === "Unknown cause.") {
		errorObject["long_description"] = short_description;
	}

	if (short_solution === "Unknown solution." && long_solution !== "Unknown solution.") {
		errorObject["short_solution"] = long_solution;
	} else if (short_solution !== "Unknown solution." && long_solution === "Unknown solution.") {
		errorObject["long_solution"] = short_solution;
	}

	const keys = ["short_description", "long_description", "short_solution", "long_solution"];

	// Ensure all end with a full stop
	keys.forEach(key => {
		const value = errorObject[key];
		// If the value does not end with a full stop and the last character is a letter, add a full stop
		if (value && !value.endsWith(".") && /[A-Za-z]$/.test(value)) {
			errorObject[key] = value + ".";
		}
	});

	fs.writeFileSync(fullPath, JSON.stringify(json, null, "\t"));
});