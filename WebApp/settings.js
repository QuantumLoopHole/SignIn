function SetServerAddress() {
    localStorage.setItem("ServerAddr", window.prompt("Set Server Addr"));
    
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

