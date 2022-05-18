/* ------------- CLASES -------------  */
class ProductoCredito {
	constructor(id, nombre, tipo, moneda, montoMaximo, montoMinimo, plazoMaximo, plazoMinimo, interes){
		this.id = id;
		this.nombre = nombre;
		this.tipo = tipo;
		this.moneda = moneda;
		this.montoMin = montoMinimo;
		this.montoMax = montoMaximo;
		this.plazoMin = plazoMinimo;
		this.plazoMax = plazoMaximo;
		this.interes = interes;
	}
}

class Credito {
	constructor(id, monto, plazo, nombre, tipo, moneda, interes){
		this.id = id;
		this.monto = monto;
		this.plazo = plazo;
		this.nombre = nombre;
		this.tipo = tipo;
		this.moneda = moneda;
        this.interes = interes;
	}
}
/* ------------------------------------  */

//CREAMOS LOS TRES TIPOS DE PROUCTO DE CREDITO
const CreditoHipotecario = new ProductoCredito(1,"CREDITO HIPOTECARIO", "CHI","SOLES", 1000000, 20000, 120, 12,0.17);
const CreditoAgropecuario = new ProductoCredito(2,"CREDITO AGROPECUARIO", "CAG", "SOLES", 200000, 10000, 60, 6,0.15);
const CreditoPersonal = new ProductoCredito(3,"CREDITO PERSONAL", "CPE", "SOLES", 50000, 1000, 60, 6,0.20);
//ASIGNAMOS A UN ARRAY 
let productos = [CreditoHipotecario, CreditoAgropecuario, CreditoPersonal];

//CREAMOS ALGUNOS CREDITOS PARA CADA TIPO DE PRODUCTO
const creditoH1 = new Credito("12345678",54321,24,"CREDITO HIPOTECARIO","CHI","SOLES",0.17);
const creditoH2 = new Credito("54659875",250000,120,"CREDITO HIPOTECARIO","CHI","SOLES",0.17);
const creditoH3 = new Credito("78895412",100000,36,"CREDITO HIPOTECARIO","CHI","SOLES",0.17);
const creditoH4 = new Credito("12345678",750000,30,"CREDITO HIPOTECARIO","CHI","SOLES",0.17);
const creditoA1 = new Credito("12345678",150000,40,"CREDITO AGROPECUARIO","CAG","SOLES",0.15);
const creditoA2 = new Credito("78895412",75000,20,"CREDITO AGROPECUARIO","CAG","SOLES",0.15);
const creditoA3 = new Credito("36963548",30000,10,"CREDITO AGROPECUARIO","CAG","SOLES",0.15);
const creditoP1 = new Credito("12345678",50000,36,"CREDITO PERSONAL","CPE","SOLES",0.20);
const creditoP2 = new Credito("12345678",5000,12,"CREDITO PERSONAL","CPE","SOLES",0.20);
//ASIGNAMOS A UN ARRAY CREDITOS
let creditos = [creditoH1, creditoH2, creditoH3, creditoH4, creditoA1, creditoA2, creditoA3, creditoP1, creditoP2];
let divcreditos = document.querySelector("#creditos");
let i = 0;
/*---------------FUNCIONES----------------*/
//FUNCION MOSTRAR TIPOS DE CREDITOS
function mostrarTiposCreditos(){
		productos.forEach(producto =>{
        if (producto.id == 1) {
            divcreditos.innerHTML += `
            <option selected="selected" value="${producto.id}">${producto.nombre}</option>
        `
        } else {
            divcreditos.innerHTML += `
            <option value="${producto.id}">${producto.nombre}</option>
        `
        }
	})
}
//FUNCION MOSTRAR DETALLE CREDITO
function detallecredito()
{
    i = divcreditos.value-1;
    let credito1 = productos[i].id + " " + productos[i].nombre + " - Moneda: " + productos[i].moneda + " - Monto mínimo: " + productos[i].montoMin + " - Monto máximo: " + productos[i].montoMax+ " con plazo desde " + productos[i].plazoMin + " hasta "+ productos[i].plazoMax + " y el interés de: " + productos[i].interes;
    document.querySelector("#detallecredito").innerText = credito1;
}
/*----------------------------------------*/
let segurodesgravamen;
let itf;
let opcioncredito;
mostrarTiposCreditos();
let formcreditos = document.querySelector("#formcreditos");
formcreditos.addEventListener('submit',(event) => {
    document.querySelector("#divsimulacion").innerHTML = `
        <div>| N° | Capital | Seguro | ITF | Cuota |</div>
    `
    event.preventDefault();
    let dni = document.querySelector('#iddni').value;
    let montocredito = parseFloat(document.querySelector('#idmonto').value);
    let nrocuotascredito = parseInt(document.querySelector('#idnrocuotas').value);

    //RECUPERAMOS DATOS DEL PRODUCTO SELECCIONADO
    let nombrepro = productos[i].nombre;
    let tipopro = productos[i].tipo;
    let monedapro = productos[i].moneda
    let montoMinpro = parseFloat(productos[i].montoMin);
    let montoMaxpro = parseFloat(productos[i].montoMax);
    let plazoMinpro = parseFloat(productos[i].plazoMin);
    let plazoMaxpro = parseFloat(productos[i].plazoMax);
    let interespro = parseFloat(productos[i].interes);

    //VALIDAMOS SI EL MONTO Y LOS PLAZOS SOLICITADOS ESTÁN EN EL RANGO DEL PRODUCTO
    if ((montocredito <= montoMaxpro && montocredito >= montoMinpro)&&(nrocuotascredito<=plazoMaxpro&&nrocuotascredito>=plazoMinpro)) {
        
        //REGISTRAMOS LA SOLICITUD EN NUESTRO ARRAY DE CREDITOS
        creditos.push(new Credito(dni,montocredito,nrocuotascredito,nombrepro,tipopro,monedapro,interespro));
        //CALCULAMOS LAS CUOTAS DE ACUERDO AL NÚMERO DE PLAZOS
        let capital =(montocredito + montocredito*interespro)/nrocuotascredito;
        //CALCULAMOS SEGURO DESGRAVAMEN E ITF
        segurodesgravamen = 0.0009*montocredito;
        itf = 0.000005*montocredito;
        let cuotamensual = capital + segurodesgravamen +itf;
        //MOSTRAMOS CALENDARIO
        for (let j = 1; j < nrocuotascredito+1; j++) {
            document.querySelector("#divsimulacion").innerHTML += `
                <div>|  ${j} | ${capital} | ${segurodesgravamen} | ${itf} | ${cuotamensual} |</div>
            `
        }
        let cuotatotal = cuotamensual*nrocuotascredito;
        document.querySelector("#divsimulacion").innerHTML += `
                <div>El monto total de las ${nrocuotascredito} es: ${cuotatotal}</div>
            `
    } else {
        alert("El monto solicitado y/o el plazo están fuera del rago del crédito solicitado. Ud ha seleccionado el credito " + nombrepro + " con el monto " + montocredito + " y el plazo de " + nrocuotascredito + ". El " + nombrepro + " tiene como monto mínimo " + montoMinpro + " y monto máximo " + montoMaxpro + " tiene como plazo mínimo " + plazoMinpro + " y plazo máximo " + plazoMaxpro);
    }
    formcreditos.reset();
})
