varying vec3 vPositionW;
varying vec3 vNormalW;

void main() {

    vec3 color = vec3(0.0, 1., 1.);
    vec3 viewDirectionW = normalize(cameraPosition / 5e19 - vPositionW/ 5e19);
    float fresnelTerm = dot(viewDirectionW, viewDirectionW);
    fresnelTerm = clamp(1.0 - fresnelTerm, 0., 1.);

    float dummy = viewDirectionW.y;

    gl_FragColor = vec4(dummy);

}
