// import axios from 'axios'

export default class TarifaService{

    data={ "tipoEntrada": ["Publico General","Jubilados","Menores"],    
    "tipoVisita": ["Completo","Por Exposicion"], 
    "montoGuia":10, 
    "entradasDisponibles":10}

    url="http://localhost:8082/v1/entrada/tipo"

    getAll(){
        return this.data;
    }
    
}