import {load_html, read_html, dates, update_tasks} from './utils'
import { handle_add, display_tasks, handle_time, handle_check, handle_priority, fix_priority } from './utils';

export default function todo_load(){

    load_html();
    read_html();

    const dates= handle_time();

    update_tasks();

    handle_add();

    handle_priority();
    
    display_tasks(dates);

    handle_check();
    
    

    
}


