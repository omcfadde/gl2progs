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

uniform sampler2D u_bumpTexture;
uniform float u_alphaTest;
uniform vec4 u_glColor;

varying vec2 var_TexDiffuse;

void main(void)
{
	/* XXX: u_bumpTexture -> TMU(0) */
	if (u_alphaTest > texture2D(u_bumpTexture, var_TexDiffuse).a) {
		discard;
	}

	gl_FragColor = u_glColor;
}
