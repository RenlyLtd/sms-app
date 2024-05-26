declare global {
	namespace App {
		interface Locals {
			user: import('lucia').User | null;
			session: import('lucia').Session | null;
		}
	}
}

export {};

/// <reference types="svelte" />
export declare function mediaQuery(query: string): import('svelte/store').Readable<boolean>;
