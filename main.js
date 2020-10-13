function main() {
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");

    // `` untuk run source didalamnya
    // dibawah ini .c
    var vertexShaderSource = `
        void main() {
            gl_PointSize = 30.0; // ukuran titik
            gl_Position = vec4(0.0, 0.0, 0.0, 1.0); // posisi titik ditengah
        }
    `;
    var fragmentShaderSource = `
        void main() {
            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0); // warna titik
        }
    `;
    
    // dibawah ini .o
    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    // mengetikkan source code ke penampung .c
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.shaderSource(fragmentShader, fragmentShaderSource);

    // mengompilasi .c menjadi .o
    gl.compileShader(vertexShader);
    gl.compileShader(fragmentShader);

    // create program .exe (penampung)
    var shaderProgram = gl.createProgram();

    // memasukkan adonan .o ke penampung .exe
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);

    // menggabung-gabungkan adonan di dalam .exe
    gl.linkProgram(shaderProgram);

    // menggambar tampilan .exe dalam konteks grafika
    gl.useProgram(shaderProgram);

    gl.clearColor(0.0, 255.0, 255.0, 0.8); // warna kotak
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS, 0, 1);
}