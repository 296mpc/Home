function ft(){
    var aleatorio= Math.floor(Math.random() * 5) + 1;
        return aleatorio;
}
function ft_raybon(){
  
function changeCTAtext(){
    var Var_cmd= document.getElementById("numero");
        var valor=ft();
 Var_cmd.innerHTML=valor;
  };

  setInterval(changeCTAtext, 5000); // Start
} 
