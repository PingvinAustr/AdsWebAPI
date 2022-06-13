var selectedChildID_DD1 = 0;
var selectedChildID_DD2 = 0;
let inputs_validation = ['False', 'False','False'];
var clicks_span_html = "<span id='clicks_span'> clicks</span>";
var g_vertical, g_region;
function CallClicksAPI(t_vertical, t_region, t_budget) {

    var requestURL = 'https://localhost:7291/ClicksAPI/?vertical=' + t_vertical + '&region=' + t_region;
    if (t_budget != null) requestURL += '&budget=' + t_budget;

    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();

    request.onload = function () {
        var superHeroes = request.response;
       
        console.log(request.response);
        document.getElementById('clicks_output').innerHTML = request.response['sumClicks'] + clicks_span_html;
        LoadImagesToGrid(request.response, request.response['imG_LinkArr'].length);

       
    }
    
    
    //document.getElementById('clicks_output').innerHTML = request.response['sumClicks'];
}


function LoadImagesToGrid(resp,arr_length) {

    let i = 1;
    resp['imG_LinkArr'].forEach(element => {
        let text_id = "grid_" + i;
        document.getElementById(text_id).innerHTML = "<img class='img_grid_ball' src='" + element + "'/>";
        i++;
    });

    /*
    for (let i = 1; i < arr_length+1; i++) {
        let text_id = "grid_" + i;
        let src_text = resp['imG_LinkArr'];
        alert(src_text);
        document.getElementById(text_id).innerHTML = "<img src=''/>";
    }
  */
}

function RevealButtonClick() {
    let vertical = document.getElementById("dropdown_placeholder_1").innerHTML;
    let region = document.getElementById("dropdown_placeholder_2").innerHTML;


    var items_to_del = document.querySelectorAll('.form_part');
    items_to_del.forEach(item => {
        item.remove();
    });

    let toggleHTML = "<div class='toggle_body'><div class='toggle_line'><div class='toggle_ball' id='toggle_ball' onmousedown='dragElement()'></div></div></div>";
    let gridHTML = "<div class='grid_countries'> <div id='grid_1'>1</div><div id='grid_2'>2</div><div id='grid_3'>3</div><div id='grid_4'>4</div><div id='grid_5'>5</div><div id='grid_6'>6</div> </div>";
    document.getElementById('form_body').innerHTML = "<h2 class='form_part'>This is what you can get with MegatronQ:</h2> <h2 class='form_part' style='text-align:center; font-size:48px;' id='clicks_output'>1" + clicks_span_html + "</h2><div>*Your montly budget:<div id='change_budget' style='text-align:center; margin-top:10px; font-weight:bold;'>5000$</div></div>" + toggleHTML+"<div>Your content will be featured on the <span>World’s Leading Publishers</span></div>" + gridHTML;
    
    
    // Make the DIV element draggable:
    dragElement(document.getElementById("toggle_ball"));

    g_vertical = vertical;
    g_region = region;
    CallClicksAPI(vertical, region);

}










function ValidateFields() {
    let counter = 0;
    for (let i = 0; i < 3; i++) {
        if (inputs_validation[i] == 'True') {
            counter++;
        }
    }
    
    if (counter == 3) {
        document.getElementById('submit_button').classList.remove('disabled');
    }
    else {
        document.getElementById('submit_button').classList.add('disabled');
    }
}

function onTopInputChange() {

    if (document.getElementById('top_input_enter').value.length != 0) {
        
       
        let regex_check = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/.test(document.getElementById('top_input_enter').value);
        if (regex_check) {
            inputs_validation[0] = 'True';
            document.getElementById('top_input_enter').classList.remove('input_fail');
        }
        else {
            inputs_validation[0] = 'False';
            document.getElementById('top_input_enter').classList.add('input_fail');
        }


        
       
    }
    else {
        inputs_validation[0] = 'False';
        document.getElementById('top_input_enter').classList.add('input_fail');
       
    }
    ValidateFields();
}


/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myFunction(x) {
    if (x == '0') {
        document.getElementById("myDropdown").classList.toggle("show");

        //Get all child nodes
        var all_dropdown_elements = document.getElementById('myDropdown').children;


        for (let i = 0; i < all_dropdown_elements.length; i++) {

            //Set IDs to all dropdown children. It will allow us to understand which child has been selected and save its data
            all_dropdown_elements[i].id = "Dropdown_1_" + i;

            //Set function to each child which will save selected data
            all_dropdown_elements[i].onclick = function () {
                document.getElementById("dropdown_placeholder_1").innerHTML = all_dropdown_elements[i].innerHTML;
                selectedChildID_DD1 = i;
                inputs_validation[1] = 'True';
                document.getElementById("dropdown_placeholder_1").style.color = "black";
                ValidateFields();
            }
        }
       
    }
    else {
        document.getElementById("myDropdown1").classList.toggle("show");

        //Get all child nodes
        var all_dropdown_elements1 = document.getElementById('myDropdown1').children;


        for (let i = 0; i < all_dropdown_elements1.length; i++) {

            //Set IDs to all dropdown children. It will allow us to understand which child has been selected and save its data
            all_dropdown_elements1[i].id = "Dropdown_2_" + i;

            //Set function to each child which will save selected data
            all_dropdown_elements1[i].onclick = function () {
                document.getElementById("dropdown_placeholder_2").innerHTML = all_dropdown_elements1[i].innerHTML;
                selectedChildID_DD2 = i;
                inputs_validation[2] = 'True';
                document.getElementById("dropdown_placeholder_2").style.color = "black";
                ValidateFields();
            }
        }
       
    }
   
    if (x == '0' && document.getElementById("myDropdown1").classList.contains("show")) document.getElementById("myDropdown1").classList.remove("show");
    if (x == '1' && document.getElementById("myDropdown").classList.contains("show")) document.getElementById("myDropdown").classList.remove("show");
    
}


// Close the dropdown menu if the user clicks outside of it
window.onclick = function (event) {
    if (!event.target.matches('.dropbtn') && !event.target.matches('.dropdown_placeholder')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}




function dragElement(elmnt) {
    //alert("1");
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById("toggle_ball")) {
        // if present, the header is where you move the DIV from:
        document.getElementById("toggle_ball").onmousedown = dragMouseDown;
    } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        //pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        //alert(e.clientX);
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        //pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        //pos4 = e.clientY;
        // set the element's new position:
        //elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        

        //alert(window.innerWidth + " | LineLength:" + window.innerWidth * 0.5 * 0.75 * 0.65 + " | LeftBorderPX:" + window.innerWidth * 0.25 + window.innerWidth * 0.5 * 0.125 + window.innerWidth * 0.5*0.75*0.175);


        if ((elmnt.offsetLeft - pos1) >= Math.round(window.innerWidth * 0.25 + window.innerWidth * 0.5 * 0.125 + window.innerWidth * 0.5 * 0.75 * 0.175-7.5) && (elmnt.offsetLeft - pos1) <= Math.round(window.innerWidth * 0.25 + window.innerWidth * 0.5 - window.innerWidth * 0.5 * 0.125 - window.innerWidth * 0.5 * 0.75 * 0.175-22.5))
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        //alert(elmnt.offsetLeft);
    }

    function closeDragElement() {
        let current_pos = String(elmnt.style.left);
        current_pos = parseInt(current_pos.substring(0, current_pos.length - 2));
       
        //alert(current_pos);
        let left = Math.round(window.innerWidth * 0.25 + window.innerWidth * 0.5 * 0.125 + window.innerWidth * 0.5 * 0.75 * 0.175 - 7.5);
        let right = Math.round(window.innerWidth * 0.25 + window.innerWidth * 0.5 - window.innerWidth * 0.5 * 0.125 - window.innerWidth * 0.5 * 0.75 * 0.175 - 22.5);
        //alert("Left:" + (Math.round(window.innerWidth * 0.25 + window.innerWidth * 0.5 * 0.125 + window.innerWidth * 0.5 * 0.75 * 0.175-7.5)));
        //alert("Right:" + (Math.round(window.innerWidth * 0.25 + window.innerWidth * 0.5 - window.innerWidth * 0.5 * 0.125 - window.innerWidth * 0.5 * 0.75 * 0.175-22.5)));

        let line_length = Math.round(window.innerWidth * 0.25 + window.innerWidth * 0.5 - window.innerWidth * 0.5 * 0.125 - window.innerWidth * 0.5 * 0.75 * 0.175 - 22.5) - Math.round(window.innerWidth * 0.25 + window.innerWidth * 0.5 * 0.125 + window.innerWidth * 0.5 * 0.75 * 0.175 - 7.5);
        let one_part_length = line_length / 20;
        let arr_with_borders = [];
        let sum_arr = [];
        let len = left;
        let deb = "";
        sum_arr[0] = 5000;
        for (let i = 0; i <= 20; i++) {    
            arr_with_borders[i] = len;
            if (i!=0) sum_arr[i]=sum_arr[i-1]+5000;
            len += one_part_length;
            deb += arr_with_borders[i] + " ";
        }
        //alert("Left:" + left + " Right:" + right);
        //alert(deb);
        let new_sum = 0;
        for (let i = 1; i < 20; i++) {
            if (current_pos > arr_with_borders[i - 1] && current_pos < arr_with_borders[i + 1]) { new_sum=sum_arr[i]; break; }
            else if (current_pos <= arr_with_borders[0]) { new_sum=sum_arr[0]; break;}
            else if (current_pos >= arr_with_borders[20]) { new_sum=sum_arr[20]; break; }
        }

        document.getElementById("change_budget").innerHTML = new_sum + "$";
        CallClicksAPI(g_vertical, g_region, parseInt(new_sum));
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}