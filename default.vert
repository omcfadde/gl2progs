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

precision highp float;
precision highp sampler2D;

varying vec2 var_TexDiffuse;
varying vec2 var_TexNormal;
varying vec2 var_TexSpecular;
varying vec4 var_TexLight;
varying vec4 var_Color;
varying vec3 var_L;
varying vec3 var_H;

attribute vec4 attr_TexCoord;
attribute vec3 attr_Tangent;
attribute vec3 attr_Bitangent;
attribute vec3 attr_Normal;
attribute vec4 attr_Vertex;
attribute vec4 attr_Color;

uniform vec4 u_lightProjectionS;
uniform vec4 u_lightProjectionT;
uniform vec4 u_lightFalloff;
uniform vec4 u_lightProjectionQ;
uniform vec4 u_colorModulate;
uniform vec4 u_colorAdd;

uniform vec4 u_lightOrigin;
uniform vec4 u_viewOrigin;

uniform vec4 u_bumpMatrixS;
uniform vec4 u_bumpMatrixT;
uniform vec4 u_diffuseMatrixS;
uniform vec4 u_diffuseMatrixT;
uniform vec4 u_specularMatrixS;
uniform vec4 u_specularMatrixT;

uniform mat4 u_modelViewProjectionMatrix;

uniform mat4 u_textureMatrix;

void main(void)
{
	// # glMatrixMode(GL_TEXTURE)
	var_TexDiffuse = (attr_TexCoord * u_textureMatrix).xy;

	// # generate the vertex color, which can be 1.0, color, or 1.0 - color
	var_Color = (attr_Color / 255.0) * u_colorModulate + u_colorAdd;

	//gl_Position = ftransform();
	gl_Position = u_modelViewProjectionMatrix * attr_Vertex;
}
