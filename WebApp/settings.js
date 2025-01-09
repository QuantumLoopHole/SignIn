function SetServerAddress() {
    localStorage.setItem("ServerAddr", "http://" + window.location.hostname + ":5000");
    
}

function SetOrgName(){
    localStorage.setItem("OrgName", window.prompt("Set Organization Name"));
}

// init setttings
if (localStorage.getItem("ServerAddr") === null) {
    SetServerAddress();
  }

if (localStorage.getItem("OrgName") === null){
    SetOrgName(); 
}

