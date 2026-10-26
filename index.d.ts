export interface ModuleInfo {
	name: string;
	description: string;
	system: string;
}

export interface ErrorInfo {
	name: string;
	message: string;
	short_description: string;
	long_description: string;
	short_solution: string;
	long_solution: string;
	support_link: string;
	module: ModuleInfo;
}

export function getModuleInfo(sysmodule: string, locale: string): ModuleInfo | null;
export function getErrorInfo(sysmodule: string, code: string, locale: string): ErrorInfo | null;
export function getAllErrors(): string[];
