export default class PreviewUriSchemePool {
	/**
	 * @param
	 */
	public constructor(
		public readonly baseName = 'chromevscode'
	) { }


	/**
	 * 
	 */
	public generatePreviewUriScheme(): string {
		const id = PreviewUriSchemePool.findLowestFreeID();
		const scheme = `${this.baseName}${id.toString(36)}`;
		if (id > PreviewUriSchemePool.registeredSchemes.length) {
			PreviewUriSchemePool.registeredSchemes.push(scheme);
		} else {
			PreviewUriSchemePool.registeredSchemes[id] = scheme;
		}
		return scheme;
	}


	/**
	 * 
	 */
	public release(scheme: string): void {
		const index = PreviewUriSchemePool.registeredSchemes.indexOf(scheme);
		if (index === -1) {
			throw new Error(`cannot release scheme '${scheme}': scheme not registered`);
		}
		if (index === PreviewUriSchemePool.registeredSchemes.length - 1) {
			PreviewUriSchemePool.registeredSchemes.splice(
				PreviewUriSchemePool.registeredSchemes.length - 1, 1
			);
		} else {
			PreviewUriSchemePool.registeredSchemes[index] = undefined;
		}
	}


	private static findLowestFreeID(): number {
		if (PreviewUriSchemePool.registeredSchemes.length === 0) {
			return 0;
		}
		const lowestFreeIndex = PreviewUriSchemePool.registeredSchemes.findIndex(scheme => typeof scheme !== 'string');
		if (lowestFreeIndex === -1) {
			return PreviewUriSchemePool.registeredSchemes.length;
		}
	}


	private static readonly registeredSchemes: string[] = [];
}
