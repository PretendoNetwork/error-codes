# Error Codes
Translated JSON files for known error codes used by the Wii U and 3DS

## Path Structure
There are paths: modules and codes. The `data` folder contains the error code data. The root of the `data` folder contains the modules. Inside each module folder are the translation files for the module and folders for each of the module's error codes. Inside each module error code folder are the translation files for the error. Example path structure:

```
data
├── 102
│   ├── en_US.json
│   ├── 2482
│   │   └── en_US.json
│   ├── 2483
│   │   └── en_US.json
│   └── etc
└── 103
    ├── en_US.json
    ├── 0504
    │   └── en_US.json
    ├── 1101
    │   └── en_US.json
    └── etc
```

## Translation Files
Each translation file is a JSON object named using standard locale names. The contents of each file contains strings intended for both use in our Discord bot [Bandwidth](https://github.com/PretendoNetwork/Bandwidth) and our websites support pages. Due to this each file may have many strings, some of which may seem redundant.

Each file starts with 1 or 2 objects, each with 1 key each. The first object key is the module ID. If the translation file is for a module, there is only this top level object. If the translation file is for an error the second object's key is the error code. This may seem redundant, and it is. This is done so that translation tools such as the in-development [Locali by NeatoJS](https://discord.gg/cGd5pKxWyK) can index each string as `module.string_name` and `module.error.string_name`. Example object structures:

```json
{
	"102": {
		"name": "act",
		"description": "Nintendo Network Accounts",
		"system": "Wii U"
	}
}
```

```json
{
	"102": {
		"2802": {
			"name": "BANNED_ACCOUNT_ALL",
			"message": "This Nintendo Network ID\ncannot be used.\n\nPlease make a note of the error code\nand visit support.nintendo.com.",
			"short_description": "Your account is permanently banned from all aspects of the network.",
			"long_description": "The account you are trying to use has been permanently banned from all aspects of the network. This includes, but is not limited to:\n\n- Miiverse\n- Game servers\n- 3rd party services which opt-in to respecting network bans",
			"short_solution": "Not applicable.",
			"long_solution": "Not applicable.",
			"support_link": "https://preten.do/102-2802"
		}
	}
}
```

### Module translation file fields

| Name          | Description                                       |
| ------------- | ------------------------------------------------- |
| `name`        | The name of the sysmodule                         |
| `description` | A short description of what the sysmodule handles |
| `system`      | The system the sysmodule is for                   |

### Error translation file fields

| Name                | Description                                                                                                                          |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `name`              | The internal name of the error. Not all errors have an internal name. If missing, `Unknown`                                          |
| `message`           | The message exactly as it appears ***on the console***. If there is no relevant translation for the message, use the `en_US` version |
| `short_description` | A short description of the error. Intended to be used by the Discord bot. Plain text                                                 |
| `long_description`  | A longer, more detailed, description of the error. Intended to be used by the website. Markdown                                      |
| `short_solution`    | A short solution for the error. Intended to be used by the Discord bot. Plain text                                                   |
| `long_solution`     | A longer, more detailed, solution for the error. Intended to be used by the website. Markdown                                        |
| `support_link`      | Link to a relevant support page for the error. Typically the website, but does not have to be                                        |

### Utility functions
The main purpose of this repository is to maintain the JSON translation files. However 2 utility functions are also included for JavaScript/TypeScript projects.

- `getModuleInfo(sysmodule, locale)` - Returns the module information for the locale, or `null` if not found
- `getErrorInfo(sysmodule, code, locale)` - Returns the error information (including the module information) for the locale. Returns null if either the module or error code is not found
- `getAllErrors()` - Returns an array of all error codes for all modules in the form `MODULE-CODE`