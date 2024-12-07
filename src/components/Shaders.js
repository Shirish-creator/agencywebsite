export const waterVertexShader = `
  uniform sampler2D heightmap;

	void main() {
		vec2 cellSize = vec2( 1.0 / WIDTH, 1.0 / WIDTH );

		// Compute normal from heightmap
		csm_Normal = vec3(
			( texture2D( heightmap, uv + vec2( - cellSize.x, 0 ) ).x - texture2D( heightmap, uv + vec2( cellSize.x, 0 ) ).x ) * WIDTH / BOUNDS,
			( texture2D( heightmap, uv + vec2( 0, - cellSize.y ) ).x - texture2D( heightmap, uv + vec2( 0, cellSize.y ) ).x ) * WIDTH / BOUNDS,
			1.0
		);
  }
`

export const heightmapFragmentShader = `
	#include <common>

	uniform vec2 mousePos;
	uniform float mouseSize;
	uniform float viscosityConstant;
	uniform float heightCompensation;

	void main()	{
		vec2 cellSize = 1.0 / resolution.xy;
		vec2 uv = gl_FragCoord.xy * cellSize;

		vec4 heightmapValue = texture2D( heightmap, uv );

		// Get neighbours
		vec4 north = texture2D( heightmap, uv + vec2( 0.0, cellSize.y ) );
		vec4 south = texture2D( heightmap, uv + vec2( 0.0, - cellSize.y ) );
		vec4 east = texture2D( heightmap, uv + vec2( cellSize.x, 0.0 ) );
		vec4 west = texture2D( heightmap, uv + vec2( - cellSize.x, 0.0 ) );

		float newHeight = ( ( north.x + south.x + east.x + west.x ) * 0.5 - heightmapValue.y ) * viscosityConstant;

		// Mouse influence
		float mousePhase = clamp( length( ( uv - vec2( 0.5 ) ) * BOUNDS - vec2( mousePos.x, - mousePos.y ) ) * PI / mouseSize, 0.0, PI );
		newHeight += ( cos( mousePhase ) + 1.0 ) * 0.28;

		heightmapValue.y = heightmapValue.x;
		heightmapValue.x = newHeight;

		gl_FragColor = heightmapValue;
	}
`
