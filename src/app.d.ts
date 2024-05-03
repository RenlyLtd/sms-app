
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};

/// <reference types="svelte" />
export declare function mediaQuery(query: string): import("svelte/store").Readable<boolean>;
