import Viewport from './Viewport';

abstract class ResponseRenderer {
	/**
	 * Creates a renderer.
	 * @param viewport The viewport to render in.
	 */
	public constructor(
		protected readonly viewport: Viewport
	) {}


	/**
	 * Renders a certain response in the renderer's current viewport.
	 * @param response The response to render.
	 */
	public async renderResponse(response: XMLHttpRequest): Promise<void> {
		await this.renderResponseConcrete(response);
	}


	/**
	 * Renders a certain response in the renderer's current viewport.
	 * @param response The response to render.
	 */
	protected abstract async renderResponseConcrete(response: XMLHttpRequest): Promise<void>;
}

export default ResponseRenderer;
