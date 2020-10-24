function main() {
    var canvas = document.getElementById("myCanvas");
    var gl = canvas.getContext("webgl");

    // definisi titik-titik pembentuk segitiga
    /*
        A = (-0.5, 0.5)
        B = (0.5, 0.5)
        C = (0.5, -0.5)
    */

    var vertices = [
        -0.5, 0.5,      // Titik A (kiri-atas)
        0.5, 0.5,       // Titik B (kanan-atas)
        0.5, -0.5       // Titik C (kanan-bawah)
    ];

    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    // `` untuk run source didalamnya
    // dibawah ini .c
    var vertexShaderSource = `
        attribute vec2 a_Position;
        void main() {
            gl_PointSize = 20.0; // ukuran titik
            gl_Position = vec4(a_Position, 0.0, 1.0); // posisi/koordinat titik
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

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    var aPosition = gl.getAttribLocation(shaderProgram, "a_Position");
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(aPosition);

    gl.clearColor(0.0, 255.0, 255.0, 0.8); // warna kotak
    gl.clear(gl.COLOR_BUFFER_BIT);

    var primitive = gl.POINTS;
    var offset = 0;
    var nVertex = 3;
    gl.drawArrays(primitive, offset, nVertex);
}