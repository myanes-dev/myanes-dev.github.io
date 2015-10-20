function tab(id, tab){
document.getElementById("login").style.display="none"; document.getElementById("sign").style.display="none"; 
document.getElementById(id).style.display="block";
    
    document.getElementsByClassName("tab tab-selected")[0].className = "tab";
    tab.className = "tab tab-selected";
}