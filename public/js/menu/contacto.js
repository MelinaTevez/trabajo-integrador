
function initContacto(){
    console.warn('initContacto()')
    
    const formContacto = document.getElementById('formulario-contacto')
    console.log(formContacto)
    const inputsContacto = document.querySelectorAll('#formulario-contacto input')
    console.log(inputsContacto)
    
    const regExpValidarContacto = {
            nombre:     /^[a-zA-ZÀ-ÿ\s]{2,25}$/ ,                            // regexp nombre
            apellido:   /^[a-zA-ZÀ-ÿ\s]{2,25}$/,                             // regexp apellido
            email:      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,  // regexp email
            telefono:    /^\d{7,14}$/                                         // regexp telefono
    
    }
    const campos = {
        nombre:   false,
        apellido: false,
        email:    false,
        telefono: false,
    }

    const validarForm = (e) => {
        switch(e.target.name) {
            case 'nombre':
                validarCampo(regExpValidarContacto.nombre, e.target, 'nombre');
                break;
            case 'apellido':
                validarCampo(regExpValidarContacto.apellido, e.target, 'apellido');
            break;
            case 'email':
                validarCampo(regExpValidarContacto.email, e.target, 'email');
            break;
            case 'telefono':
                validarCampo(regExpValidarContacto.telefono, e.target, 'telefono');
            break;
        }
    } 

    const validarCampo = (expresion, input, campo) => {

        if(expresion.test(input.value)){

            document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-invalido');
            document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-valido');
            document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
            campos[campo] = true;
        } else{

            document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-invalido');
            document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-valido');
            document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
            campos[campo] = false;
        }
    }

    inputsContacto.forEach((input)=> {
        input.addEventListener('keyup', validarForm)
        
    })

    formContacto.addEventListener('submit', (e) => {
        e.preventDefault();

	    if(campos.nombre && campos.apellido && campos.email && campos.telefono ){
		formContacto.reset();

		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');

		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 4000);

	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');

        setTimeout(() => {
			document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
		}, 4000);
	}
})
}

