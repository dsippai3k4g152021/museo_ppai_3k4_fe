<template>
    <div class="section_header">
        <div class="header_links">
            <a href="#" class="font-primary links">Inicio</a>
            <a href="#" class="font-primary links">Registrar venta</a>
        </div>
        <div class="header_logo"></div>
        <div class="font-primary header_user">
            <div class="user_icon"> 
                <i class="pi pi-user user"></i>
            </div>
            <div class="user_name">
                    <p>{{usuario}}</p>
            </div>            
        </div>
    </div>
</template>

<script>
import UserService from '../services/UserService';

export default {
    name:'Header',
    data(){
        return{
            
            usuario:null,             
        }
    },
    UserService: null,
    created() {
        this.UserService = new UserService();
    },
    mounted() {
        this.usuario =this.UserService.getUser()
    }
}
</script>

<style>
.section_header{
    display: flex;
    justify-content: space-around;
    background-color:rgb(18, 30, 40,0.5);
    border:1px solid #666666;
    height: 3rem;        
    margin-bottom:1rem;
}
.section_header > div{
    width:30%;
}

.header_user{
    display: flex;
    justify-content: flex-end;
}

.header_links{
    display: flex;
    align-items: center;
}

.user_icon,.user_name{
    display: flex;
    align-items: center;
    padding: .5rem;
}

.font-primary{
    color: white;
    font-size: 1.2rem;
}

.links{
    padding: .5rem;
    text-decoration: none;

}
</style>