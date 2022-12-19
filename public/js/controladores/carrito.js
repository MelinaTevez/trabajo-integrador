class CarritoController extends CarritoModel {

    constructor(){
        super()
        
        try {
            
            this.carrito = JSON.parse(localStorage.getItem('carrito')) || []
        } catch (error) {
            
            console.error('Algo ocurrió con la lectura del localStorage', error)
            this.carrito = []
            localStorage.setItem('carrito', this.carrito)
        }
    }
    
    elProductoEstaEnElCarrito(producto) {
        return this.carrito.filter(prod => prod.id == producto.id).length
    }
    
    total = document.getElementsByClassName('total')

    totales(){
        setTimeout(()=>{
            this.total[0].innerHTML = `Cantidad de productos en el carrito: ${this.cantidadProductos()}`
            this.total[1].innerHTML = `Total a pagar: $${this.getValorCarrito()}`
        },100)
    }

    obtenerProductoDeCarrito(producto) {
        return this.carrito.find(prod => prod.id == producto.id)
    }

    agregarAlCarrito(producto){
        if(!this.elProductoEstaEnElCarrito(producto)) {

            producto.cantidad = 1
            producto.precioTotal;
            producto.precioTotal = producto.precio * producto.cantidad
            this.carrito.push(producto)

        } else {
            const productoDeCarrito = this.obtenerProductoDeCarrito(producto)
            productoDeCarrito.cantidad++
        }

        localStorage.setItem('carrito', JSON.stringify(this.carrito))

        this.contadorCarrito()
        
    }

    contadorCarrito(){

        const carritoContador = document.getElementById('search-bar__carrito-contador')

        let carrito = this.carrito
        let cantidadDeProdEnCarrito = 0
        
        carrito.forEach(producto => {
            cantidadDeProdEnCarrito = cantidadDeProdEnCarrito+producto.cantidad; 
        });
        
        carritoContador.innerHTML = cantidadDeProdEnCarrito;
    
    }

    actualizarContadorCarrito(carrito) {
     
        const carritoContador = document.getElementById('search-bar__carrito-contador')      
        carritoContador.innerHTML = carrito.length;
       
    }

    async borrarProductoCarrito(id){
        try {
            const index = this.carrito.findIndex(prod => prod.id == id)
            this.carrito.splice(index, 1)
            localStorage.setItem('carrito', JSON.stringify(this.carrito))

            this.total[0].innerHTML= `Cantidad de productos en el carrito: ${this.cantidadProductos()}`
            this.total[1].innerHTML= `Total a pagar: $${this.getValorCarrito()}`
            
            carritoController.contadorCarrito()
            await renderTablaCarrito(this.carrito)
        } catch (error) {
            console.log(error)
        }
    }

    async enviarCarrito(){
 
        try {
            const elemSectionCarrito = document.getElementsByClassName('section-carrito')[0]

            elemSectionCarrito.innerHTML = '<h2>Enviando carrito...</h2>'
            const preference = await carritoService.guardarCarritoServicio(this.carrito)
            this.carrito = []
            localStorage.setItem('carrito', JSON.stringify(this.carrito))

            elemSectionCarrito.innerHTML = `
                <button class="btn btn__cerrarCarrito" onclick="carritoController.btnCerrarCarrito()"><i class="fas fa-times-circle"></i></button>
                <h2 id="carrito-enviado">El carrito fue enviado con éxito</h2> 
                
                `
            ;
            
            
            setTimeout( async () => {
                elemSectionCarrito.classList.remove('section-carrito--visible')
                console.log(preference)
                await renderPago(preference)
            }, 0)
            
            this.actualizarContadorCarrito(this.carrito) 

              
        } catch (error) {
            console.error(error)
        }
    }

    btnCerrarCarrito(){
        
        const elemSectionCarritoVisible = document.getElementsByClassName('section-carrito--visible')[0] 
        if (elemSectionCarritoVisible.className.includes('--visible')) elemSectionCarritoVisible.classList.remove('section-carrito--visible')
        mostrarCarrito = false;
    }
    
    btnVaciarCarrito(){
        this.carrito.length = 0
        localStorage.setItem('carrito', JSON.stringify(this.carrito))
        renderTablaCarrito(this.carrito)
    }
    

    cantidadProductos(){
        const cantidadProd = this.carrito.map(prod=>{
            return prod.cantidad
        })

        const totalProductos = cantidadProd.reduce(
            (previo, actual) => previo + actual,
            0
        );

        return totalProductos
    }

    getValorCarrito(){
        const precios = this.carrito.map(prod=>{
            const precios = parseInt(prod.precio)
            const preciosTotal = precios * prod.cantidad
            return preciosTotal
        })

        const totalPrecios = precios.reduce(
            (previo, actual) => previo + actual,
            0
        );

        return totalPrecios
    }

}

const carritoController = new CarritoController()