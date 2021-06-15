import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Checkbox from 'primevue/checkbox';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';
import Message from 'primevue/message';

import 'primevue/resources/themes/saga-blue/theme.css';    
import 'primevue/resources/primevue.min.css';   
import 'primeicons/primeicons.css';

const app = createApp(App);

app.use(PrimeVue);
app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Checkbox', Checkbox);
app.component('Button', Button);
app.component('Message', Message);
app.component('InputNumber', InputNumber);
app.mount("#app");

