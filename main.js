import { displayACounter} from "./timer";  
import { displayRestTime } from "./timer.mjs";



const startbutton = document.querySelector(".Start");

startbutton.addEventListener('click', () => {
    displayACounter()
})

