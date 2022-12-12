class ProductoController extends ProductoModel {
    
    constructor(){
        super()
        this.guardarProducto = this.guardarProducto.bind(this)
    }

        
    async obtenerProductos() {
        this.productos = await productoService.obtenerProductosService()
        return this.productos
    }

    async guardarProducto(producto) {

        const productoGuardado = await productoService.guardarProductoService(producto)
        //console.log(productoGuardado)

        this.productos.push(productoGuardado)

        renderTablaAlta(null, this.productos)
    }

    async actualizarProducto(id){
        console.log('actualizarProducto', id)

        const producto = formularioAlta.leerProductoIngresado()
        formularioAlta.limpiarFormulario()

        const productoActulizado = await productoService.actualizarProductoService(id, producto)
        //console.log(productoActulizado)

        const index = this.productos.findIndex(producto => producto.id == productoActulizado.id)
        this.productos.splice(index,1,productoActulizado)

        renderTablaAlta(null, this.productos)

    }

    async borrarProducto(id) { 
        console.log('borrarProducto', id)
    
        let productoBorrado = await productoService.borrarProductoService(id)
    
        const index = this.productos.findIndex(producto => producto.id == productoBorrado.id)
        this.productos.splice(index, 1)
    
        renderTablaAlta(null, this.productos)
    }

}

const productoController = new ProductoController()