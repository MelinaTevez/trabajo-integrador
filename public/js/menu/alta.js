class FormularioAlta {
    inputs  = null
    form = null
    button = null
    camposValidos = [false, false, false, false, false, false]
    //Expresiones Regulares
    regExpValidar = [
        /^.{1,30}$/,          // regexp nombre
        /^[0-9]+$/,      // regexp precio
        /^[0-9]+$/,      // regexp stock
        /^.{1,30}$/,     // regexp marca
        /^.{1,30}$/,     // regexp categoria
        /^.{1,80}$/,    // regexp detalles
    ]

    /* --------------------------- drag and drop --------------------------- */
    imagenSubida = ''
    dropArea = null
    progressBar = null
    /* --------------------------------------------------------------------- */

    constructor(renderTablaAlta, guardarProducto){

      this.inputs = document.querySelectorAll('main form input.data-validation')
      this.form = document.querySelector('main form')
      this.button = document.querySelector('main form button')

      this.button.disabled = true
      
      this.inputs.forEach((input, index) => {
          if (input.type != "checkbox") {
            input.addEventListener("input", () => {
              this.validar(input.value, this.regExpValidar[index], index)
              if (renderTablaAlta) renderTablaAlta(!this.algunCampoValido(), productoController.productos)
            })
          }
      })

      this.form.addEventListener("submit", (e) => {
        e.preventDefault()
    
        const producto = this.leerProductoIngresado()
        this.limpiarFormulario()
    
        if(guardarProducto) guardarProducto(producto)
        
      })
        
      /* --------------------------- drag and drop --------------------------- */
        
        this.dropArea = document.getElementById('drop-area')
        this.progressBar = document.getElementById('progress-bar')
        
        // Para cancelar el evento automática de drag and drop
        ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach( eventName => {

          this.dropArea.addEventListener(eventName, e => e.preventDefault())
          document.body.addEventListener(eventName, e => e.preventDefault())
        })

        // Para remarcar la zona de drop al arrastrar una imagne dentro de ella
        ;['dragenter', 'dragover'].forEach( eventName => {
          this.dropArea.addEventListener(eventName,  () => {
            this.dropArea.classList.add('highlight')
          } )
        })
      
        ;['dragleave', 'drop'].forEach( eventName => {
          this.dropArea.addEventListener(eventName, () => {
            this.dropArea.classList.remove('highlight')
          })
        })
      
        this.dropArea.addEventListener('drop', e => {
          console.log(e)
          const dataTransf = e.dataTransfer
          const files = dataTransf.files

          this.handleFiles(files)
        })
      /* --------------------------------------------------------------------- */

      const inputFoto = document.querySelector('#foto')

      inputFoto.addEventListener('change', () => {
        console.log('Cambió el input')
  
        const files = inputFoto.files
  
        this.handleFiles(files)
      })
  
    }
    
    //para comprobar la validez de los campos
    algunCampoValido() {
        let valido =
            this.camposValidos[0] &&
            this.camposValidos[1] &&
            this.camposValidos[2] &&
            this.camposValidos[3] &&
            this.camposValidos[4] &&
            this.camposValidos[5] 

        return !valido
    }

   
    // Validar campos
    validar(valor, validador, index) {
        //console.log(valor, validador, index)

        if (!validador.test(valor)) {
            this.setCustomValidityJS(`<i class="fas fa-exclamation-triangle"></i> Este campo no es válido`, index)
            this.camposValidos[index] = false
            this.button.disabled = true
            return null // break
        }

        this.camposValidos[index] = true
        this.button.disabled = this.algunCampoValido() // boolean

        this.setCustomValidityJS("", index)
        return valor
    }

    //mostrar u ocultar el mensaje
    setCustomValidityJS(mensaje, index) {
        let divs = document.querySelectorAll("form .mensaje-validacion")
        divs[index].innerHTML = mensaje 
        divs[index].style.display = mensaje ? 'block' : 'none'
    }

    leerProductoIngresado() {
        return {
          nombre: this.inputs[0].value,
          precio: this.inputs[1].value,
          stock: this.inputs[2].value,
          marca: this.inputs[3].value,
          categoria: this.inputs[4].value,
          detalles: this.inputs[5].value,
          foto: this.imagenSubida ? `/uploads/${this.imagenSubida}`: '/uploads/sin-imagen.png',
          envio: this.inputs[6].checked,
        }
    }
    
    // Limpiamos los imputs del formulario
    limpiarFormulario() {
        // borro todos los inputs
        this.inputs.forEach(input => {
        if (input.type != "checkbox") input.value = ""
        else if (input.type == "checkbox") input.checked = false
        })

        this.button.disabled = true
        this.camposValidos = [false, false, false, false, false, false]

        const img = document.querySelector('#gallery img')
        img.src = ''

        this.initializeProgress()
        this.imagenSubida = ''
    }

    /* -------------- drag and drop ------------------ */
    initializeProgress() {
      this.progressBar.value = 0
    }

    updateProgress(porcentaje) {
      this.progressBar.value = porcentaje
    }

    previewFile(file) {
      const reader = new FileReader() 
      reader.readAsDataURL(file)
      reader.onloadend = function() {
        const img = document.querySelector('#gallery img')
        img.src = reader.result
      }
    }

    handleFiles = files => {
      const file = files[0]
      this.initializeProgress()
      this.uploadFile(file)
      this.previewFile(file)
    }

    uploadFile = file => {
      const url = '/api/upload'

      const xhr = new XMLHttpRequest()
      const formData = new FormData()

      xhr.open('POST', url)

      xhr.upload.addEventListener('progress', e => {
        let porcentaje = (((e.loaded * 100.0) / e.total) || 100)
        this.updateProgress(porcentaje)
      })

      xhr.addEventListener('load', () => {
        if ( xhr.status === 200) {
          const objImagen = JSON.parse(xhr.response) 
          this.imagenSubida = objImagen.nombre // {nombre: 'imagen.jpg'}
        }
      })

      formData.append('foto', file)
      xhr.send(formData)
    }

    /* -------------------------------------------------------------------- */
  }

  // Rendereabamos la plantilla
  const renderTablaAlta = (validos, productos) => {
    
      const xhr = new XMLHttpRequest()
      xhr.open("get", "plantillas/alta.hbs")
      xhr.addEventListener("load", () => {
        if (xhr.status === 200) {
          let plantillaHbs = xhr.response
    
          let template = Handlebars.compile(plantillaHbs)
    
          // console.warn(productos)
          let html = template({ productos, validos })
          document.getElementById("listado-productos").innerHTML = html
        }
      })
    
      xhr.send()
  }

/* -------- INICIACIONES PARA EL FUNCIONAMIENTO DEL MÓDULO  -------- */

let formularioAlta = null

async function initAlta() {
  console.warn("initAlta()")

  formularioAlta = new FormularioAlta(renderTablaAlta, productoController.guardarProducto)

  const productos = await productoController.obtenerProductos()
  renderTablaAlta(null, productos)
}