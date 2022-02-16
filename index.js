const alfabeto = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","Ñ","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
const formulario = document.getElementById('formulario');
const input_txt = document.getElementById('input_txt');
const resultado = document.getElementById('resultado');
const input_num = document.getElementById('input_number');

//SE TRANSFORMA EL INPUT ORIGINAL EN UN ARRAY EN MAYUSCULA
const cambiarMensaje = () => {
    const palabraCompleta = [...input_txt.value.toUpperCase()];
    encriptarCaracter(0, palabraCompleta);
}

//ENCRIPTADOR DE CARACTER
const encriptarCaracter = (indexLetra, palabraCompleta) => {
    if(palabraCompleta.length===indexLetra) return;
    input_txt.value = input_txt.value.substring(1);
    const spanCreado = document.createElement('span');
    resultado.appendChild(spanCreado);
    animarCaracter(spanCreado).then(() => {
        const letraSinCodificar = palabraCompleta[indexLetra];
        spanCreado.innerHTML = alfabeto.includes(letraSinCodificar) ? alfabeto[(alfabeto.indexOf(letraSinCodificar) + parseInt(input_num.value)) % alfabeto.length] : letraSinCodificar;
        encriptarCaracter(indexLetra + 1, palabraCompleta);
    })
}

//ANIMCAION DE CARACTER
const animarCaracter = spanCreado => {
    let cambioDeLetra = 0;
    return new Promise(resolve => {
        const intervalo = setInterval(() => {
            spanCreado.innerHTML = alfabeto[Math.floor(Math.random() * alfabeto.length)];
            cambioDeLetra++;
            if (cambioDeLetra === 3) {
                clearInterval(intervalo);
                resolve();
            }
        }, 50);
    });
}

//PREVENIR RECARGA DE PAGINA Y EJECUTAR FUNCION PRIMARIA
const prevenir = (e) => {
    e.preventDefault();
    resultado.innerHTML = '';
    cambiarMensaje();
}

formulario.onsubmit = prevenir;