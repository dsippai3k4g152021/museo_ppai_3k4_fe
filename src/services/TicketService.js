
export default class TicketService {
    data=[ 
        {"entrada":"Publico General","visita": "Completo","guia":10,"monto":20} ,
        {"entrada":"Publico General","visita": "Por exposicion","guia":15,"monto":30},
        {"entrada":"Jubilados","visita": "Completo","guia":15,"monto":30},
        {"entrada":"Jubilados","visita": "Por exposicion","guia":15,"monto":30},
        {"entrada":"Menores","visita": "Completo","guia":15, "monto":30},
        {"entrada":"Menores","visita": "Por exposicion", "guia":15, "monto":30}
        ]

    getProductsSmall() {
        return this.data;
    }

   
}
    