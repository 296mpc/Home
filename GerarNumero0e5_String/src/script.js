function ft(){
    var aleatorio= Math.floor(Math.random() * 5) + 1;
        return aleatorio;
}
function ft_raybon(){
        var Var_cmd= document.getElementById("numero");
  var valor= ft();
   for (i = 0; i < 50; i++) {

        var valor=valor + " " + ft();
      }
 Var_cmd.innerHTML=valor;

} 
