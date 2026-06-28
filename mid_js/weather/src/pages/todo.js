import {load_html, set_up_map, set_up_search} from './utils'
import { handle_time, get_weather, show_weather } from './utils';

//import { handle_add, display_tasks, handle_time, handle_check, handle_priority, fix_priority } from './utils_';

export default function query_load(){

    load_html();
    
    set_up_map();

    set_up_search();

    
    get_weather();  

    show_weather();
    

    
}


