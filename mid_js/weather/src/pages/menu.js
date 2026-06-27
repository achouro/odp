let menu_html=`<div class="left">

            <div class="title">
                <div class="text">Forecast for </div>
                <div class="city"></div>
            </div>
            
            <div class="part today">
                <div class="time">Today</div>
                <div class="box today">
                    
                </div>
            </div>
            <hr>
            <div class="part tomorrow">
                <div class="time">Tomorrow</div>
                <div class="box tomorrow">
                   
                </div>
            </div>
            <hr>
            <div class="part this_week">
                <div class="time">This Week</div>
                <div class="box this_week">
                    
                </div>
            </div>
            
        
         </div>
         <div class="right">
            
            <form id="add_form"> 
                <fieldset>
                    <legend>Search by Location:</legend>

                    <div class="box">
                        <label for="location">Location:</label>
                        <div class="city">
                        <input type="text" id="city" name="city" class="city" placeholder="New Haven, CT">
                        </div>
                    </div>
                    
                    <br>
                    <legend>Search on the Map:</legend>
                    <div class="box map">
                        
                        <div type="map" id="map" name="map" ></div>
                    </div>
                    
                    
                </fieldset>
            </form>
               </div>`

export default menu_html