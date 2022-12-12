class CarritoService {
    URL_CARRITO = 'https://633eca1d83f50e9ba3b84b17.mockapi.io/carrito/'

    async guardarCarritoServicio(carrito) {
        const carritoGuardado = await http.post(this.URL_CARRITO, carrito)
        return carritoGuardado
    }

}

const carritoService = new CarritoService()