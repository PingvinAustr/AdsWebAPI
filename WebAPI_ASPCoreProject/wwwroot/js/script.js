var selectedChildID_DD1 = 0;
var selectedChildID_DD2 = 0;
let inputs_validation = ['False', 'False','False'];

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
