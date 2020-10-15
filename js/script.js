        import   tabs  from './modules/tabs';
       import   modalWindow  from './modules/modalWindow';
       import   timer  from './modules/timer';
       import   slider  from './modules/slider';
       import   forms  from './modules/forms';
       import   cards  from './modules/cards'; 
       import   calculate  from './modules/calculate'; 
       import {openModal} from './modules/modalWindow'; 

window.addEventListener('DOMContentLoaded', ()=> {

    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 30000); 

    tabs(); 
    modalWindow('[data-modal]', '.modal', modalTimerId); 
    timer(); 
    slider(); 
    forms(modalTimerId); 
    cards(); 
    calculate(); 

}); 