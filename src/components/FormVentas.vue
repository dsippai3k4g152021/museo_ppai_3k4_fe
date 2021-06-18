<template>
    
    <div class="container">
        <div class="linea_tiempo">
               <span v-bind:class="{tiempo_item_act : contenedor1}" class="tiempo_item">1</span>
               <hr class="tiempo_separador">        
               <span v-bind:class="{tiempo_item_act : contenedor2}" class="tiempo_item">2</span>    
               <hr class="tiempo_separador">      
               <span v-bind:class="{tiempo_item_act : contenedor3}" class="tiempo_item">3</span>
        </div>
        <div v-if="contenedor1" v-bind:class="{ErrorNot : !showError,ErrorYes : showError}" class="form">
            <div class="form_title">
                <h2>TARIFA</h2>
                <hr>
            </div>  
            <div class="form_body">
                <div  class="form_content">   
                    <div class="datatable content_item">
                        <label class="text-primary">Seleccionar ticket correspondiente</label> 
                        <DataTable  :value="tickets" :scrollable="true" scrollHeight="240px" v-model:selection="selectedTicket" selectionMode="single" dataKey="id" responsiveLayout="scroll" >
                            <Column field="entrada" header="Entrada"></Column>
                            <Column field="visita" header="Visita"></Column>
                            <Column field="monto" header="Monto"></Column>
                            <Column field="guia" header="Guia"></Column>
                        </DataTable>
                        <Message v-if="showError" severity="error">Debe seleccionar un tipo de ticket</Message>                    
                    </div>                    
                    <div class="p-field-checkbox seccion_guia content_item">                
                        <label  class="text-primary label_guia" for="for_guia">¿Desea incluir guia?</label>
                        <Checkbox id="idGuia" v-model="checked" :binary="true" />
                    </div> 
                    <Button label="Cancelar" class="p-button-raised p-button-text" />
                    <Button v-on:click="next1" label="Confirmar" class="p-button-raised p-button-text" />
                    
                </div>                
            </div>   
        </div>
        <div v-if="contenedor2" class="form">
            <div class="form_title">
                <h2>ENTRADAS</h2>
                <hr>
            </div>
            <div class="form_body">
                <div  class="form_content">                      
                    <div class="seccion_entradas content_item ">
                        <label class="text-primary">Ingresar la cantidad de entradas:</label>
                        <InputNumber v-on:keyup="validarStock" id="stock" v-model="stock" mode="decimal" :min="0" :max="100" />
                        <Message v-if="!showStock" severity="success">Stock de tickets suficientes</Message>
                        <Message  v-if="showStock" severity="warn">Le pedimos disculpas,stock de tickets insuficiente.</Message>
                    </div>                    
                    <Button  v-on:click="back" label="Volver" class="p-button-raised p-button-text" />
                    <Button  v-on:click="next2" :disabled="showStock" label="Confirmar" class="p-button-raised p-button-text" />
                </div>    
            </div>
        </div>
        <div v-if="contenedor3" class="ticket">
            <div class="ticket_title">
                <h2>DETALLE DE TICKET</h2>
                <hr>  
            </div>
            <div class="title_detail">
                <div class="detail_item">
                    <div class="item_label">
                        <p class="text-primary">Cantidad de entradas:</p>
                    </div>
                    <div class="item_value">
                        <p class="text-primary">{{cantTicket}}</p>
                    </div>
                </div>
                <div class="detail_item">
                    <div class="item_label">
                        <p class="text-primary">Monto por entrada:</p>
                    </div>
                    <div class="item_value">
                        <p class="text-primary">&nbsp;${{montoTicket}}</p>
                    </div>
                </div>
                <div class="detail_item">
                    <div class="item_label">
                        <p class="text-primary">Monto adicional:</p>
                    </div>
                    <div class="item_value">
                        <p class="text-primary">&nbsp;${{montoGuia}}</p>
                    </div>
                </div>
                <div class="detail_item">
                    <div class="item_label">
                        <p class="text-primary"><b>TOTAL:</b></p>
                    </div>
                    <div class="item_value">
                        <p class="text-primary">&nbsp;${{montoTotal}}</p>
                    </div>
                </div>
            </div>
        </div>  
    </div>          
        
</template>

<script>
import TicketService from '../services/TicketService';

export default {

    name:'FormVentas',   
    data(){
        return{            
            contenedor1:true,
            contenedor2:false,
            contenedor3:false,
            checked:false,
            showError:false,
            showStock:false,            
            selectedTicket:{"id": "1000","entrada":"Publico General","visita": "Completo","guia":10,"monto":20},
            stockTickets:15,
            tickets:null,          
            cantTicket:0,
            montoGuia:0,            
            montoTicket:0,
            montoTotal:0                 
        }
    },
    TicketService: null,
    created() {
        this.TicketService = new TicketService();
    },
    mounted() {
        this.tickets =this.TicketService.getProductsAll()
    },
    methods: {
        next1(){
            let check= document.getElementById('idGuia').checked 
            if(check){
                
                this.montoGuia=this.selectedTicket.guia 
            }                      
            this.montoTicket=this.selectedTicket.monto

            if(this.selectedTicket == null){
                this.showError=true;
            }else{
                this.showError=false;
                this.contenedor1=false;
                this.contenedor2=true;
            }  
        },
        next2(){            
            this.cantTicket=this.stock;
            this.montoTotal=(this.cantTicket*this.montoTicket)+this.montoGuia;
            console.log( this.montoTotal)
            this.contenedor2=false;
            this.contenedor3=true;            
        },
        back(){
            this.contenedor2=false;
            this.contenedor1=true;

        },
        validarStock(){            
            let stock= document.getElementById('stock').value           
           if(stock> this.stockTickets){
               this.showStock=true;
           }
           else{
                this.showStock=false;
           }
        },
        onRowSelect(event) {
            this.$toast.add({severity: 'info', summary: 'Product Selected', detail: 'Name: ' + event.data.name, life: 3000});

        },
        onRowUnselect(event) {
            this.$toast.add({severity: 'warn', summary: 'Product Unselected', detail: 'Name: ' + event.data.name, life: 3000});
        },
        
    }
}
</script>

<style>
    .body{
        display:flex;
        justify-content: center;
    }

    .p-button.p-button-raised{
        color:white !important;
        background-color:rgb(21,34,39,0.8) !important;
        margin: 0 1rem;
    }

    .p-button.p-button-raised:hover{
        font-weight: 600;
        background-color:rgb(21,34,39,1) !important;
        
    }


    .container{
        width: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
    .detail_item{
        display:flex;
    }
    .form,.ticket{
        border:1px solid #b4b4b4;
        border-radius: 5px;
        background-color:rgb(18, 30, 40,0.55);
    }
    .form{      
        display: flex;
        flex-direction: column;  
        width: 55%;    
        height: 25rem; 
    }

    .ticket{
        width: 35%;}
    
    .form_title{
        width: 100%;
    }

    .form_information,.form_content{  
        width: 90%;
        margin:auto;
    }
    .content_item{
        margin: 0.8rem 1rem;
    }

    .ErrorYes{
        height: 30rem;
    }

    .ErrorNo{
        height: 25rem;
    }

    hr{
        width: 95%;
    }

    h2{
        margin: 0.6rem 0.8rem;
        color:white;
    }
    
    label{
    font-size: 17px;
    }
    .item_input{
        margin-top:0.5rem;
        width: 100%;
    }

    .item_input-number {
        margin-left:0.5rem;
    }
    .item_input-number input {
        width: 2.5rem;
    }

    .label_guia{    
        margin-right: 1rem;
    }

    .linea_tiempo{
        background-color: rgba(86, 138, 131, 0.2); 
        display:flex;
        align-items: center;
        justify-content: space-evenly;
        margin-bottom:1rem;
        height: 3.5rem;   
        width: 100%;   
    }

    .tiempo_separador{
        color: #666666;
        display: flex;
        width: 30%;
        height: 1px;
        margin-right: 0;
        margin-left: 0;
        margin-top: 10px;
    }
    
    .tiempo_item{ 
        background-color: #152228; 
        border:1px solid #666666;       
        border-radius: 2rem;
        color: #666666;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        line-height: 1.6em;
        margin-right: 15px;
        text-align: center;
        width: 2.5rem;
        height: 2.5rem;
        -webkit-box-shadow:7px 7px 5px 0px rgba(50, 50, 50, 0.75);
        -moz-box-shadow:7px 7px 5px 0px rgba(50, 50, 50, 0.75);
        box-shadow:7px 7px 5px 0px rgba(50, 50, 50, 0.75);            
    }

    .tiempo_item_act{ 
        color:white;
        border-color:white;
    }


    .text-primary{
        color:honeydew
    }

    .title_detail{
        margin: 1.5rem;
    }

    .seccion_guia{
     display:inline-block;
     width:40%;
    }

    .seccion_entradas{
     display:flex;
     flex-direction:column;
     width:100%;
    }

</style>