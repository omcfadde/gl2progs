/*
 * Copyright (C) 2012  Oliver McFadden <omcfadde@gmail.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

#version 100
//#pragma optimize(off)

#define DOOM3

varying vec2 var_TexDiffuse;
varying vec2 var_TexNormal;
varying vec2 var_TexSpecular;
varying vec4 var_TexLight;
varying vec4 var_Color;
varying vec3 var_L;
#if !defined(DOOM3)
varying vec3 var_V;
#endif
varying vec3 var_H;

uniform sampler2D u_bumpTexture;
uniform sampler2D u_lightFalloffTexture;
uniform sampler2D u_lightProjectionTexture;
uniform sampler2D u_diffuseTexture;
uniform sampler2D u_specularTexture;
uniform sampler2D u_specularFalloffTexture;
uniform vec4 u_diffuseColor;
uniform vec4 u_specularColor;

void main(void)
{
	vec3 L = normalize(var_L);
	vec3 H = normalize(var_H);

#if defined(DOOM3)
	vec3 N = 2.0 * texture2D(u_bumpTexture, var_TexNormal.st).agb - 1.0;
#else
	vec3 N = normalize(2.0 * texture2D(u_bumpTexture, var_TexNormal.st).agb - 1.0);
#endif

	/* http://en.wikipedia.org/wiki/Blinn%E2%80%93Phong_shading_model */
	float NdotL = dot(N, L);
	float NdotH = dot(N, H);

	vec3 lightProjection = texture2DProj(u_lightProjectionTexture, var_TexLight.xyw).rgb;
	vec3 lightFalloff = texture2D(u_lightFalloffTexture, vec2(var_TexLight.z, 0.5)).rgb;
	vec3 diffuseColor = texture2D(u_diffuseTexture, var_TexDiffuse).rgb * u_diffuseColor.rgb;
	vec3 specularColor = 2.0 * texture2D(u_specularTexture, var_TexSpecular).rgb * u_specularColor.rgb;
#if defined(DOOM3)
	/* Blinn-Phong */
	/* vec4 specularFalloff = texture2D(u_specularFalloffTexture, vec2(NdotH, 0.0)); */
	float specularFalloff = pow(clamp(NdotH, 0.0, 1.0), 16.0);
#else
	/* Phong */
	vec3 V = normalize(var_V);
	vec3 R = -reflect(L, N);
	float RdotV = dot(R, V);

	float f = 16.0;	/* XXX */
	float specularFalloff = pow(max(RdotV, 0.0), f);
#endif

	vec3 color;
	color = diffuseColor;
	color += specularFalloff * specularColor;
	color *= NdotL * lightProjection;
	color *= lightFalloff;

	gl_FragColor = vec4(color, 1.0) * var_Color;
}
