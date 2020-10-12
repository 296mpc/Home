var Var_imagemupload= null;
var Var_ImagemCanvas = document.getElementById("ImagemCanvas");

function ft_uploadfile(){
    var Var_uploadfile = document.getElementById("cmd_uploadfile");
  
    Var_imagemupload= new SimpleImage(Var_uploadfile);
  Var_imagemupload.drawTo(Var_ImagemCanvas);
}

function ft_cor(){
  var Var_cmd_cor= document.getElementById("cmd_cor");
  var Var_corValue = hexToRgb(Var_cmd_cor.value);
        var Var_lb_uploadfile_dim = document.getElementById("lb_uploadfile_dim");
 
  var Var_imagemfilter=new SimpleImage(Var_imagemupload);
  
   for (var pixel of  Var_imagemfilter.values()){
    
    var xcoord = pixel.getX();
    var ycoord = pixel.getY(); 
     
     var newred=2*Var_corValue.r-255 + pixel.getRed();
       var newgreen=2*Var_corValue.g-255 +pixel.getGreen();
         var newblue=2*Var_corValue.b-255 +pixel.getBlue();
     
     if (newred<256){
       pixel.setRed(newred);
     }
     else{
         pixel.setRed(255);
       }
     
    if (newgreen<256){
       pixel.setGreen(newgreen);
     }
     else{
         pixel.setGreen(255);
       }
     
     if (newblue<256){
       pixel.setBlue(newblue);
     }
     else{
         pixel.setBlue(255);
       } 
}
    Var_imagemfilter.drawTo(Var_ImagemCanvas);
 Var_lb_uploadfile_dim.innerHTML="Dimensoes da imagem: " + Var_ImagemCanvas.width +" x " + Var_ImagemCanvas.height ;
}

function ft_reset(){ 
 Var_imagemupload.drawTo(Var_ImagemCanvas);
}

function ft_raybon(){ 

  var Var_imagemfilter=new SimpleImage(Var_imagemupload);
  
  for (var pixel of Var_imagemfilter.values()){
    if (pixel.getY()<Var_imagemfilter.getHeight()/7){
        pixel.setRed(255);
    }
    else if (pixel.getY()<Var_imagemfilter.getHeight()*2/7){
            pixel.setRed(255);
             pixel.setGreen(165);
       }
        else if (pixel.getY()<Var_imagemfilter.getHeight()*3/7){
             pixel.setRed(255);
          pixel.setGreen(155);
       }
       else if (pixel.getY()<Var_imagemfilter.getHeight()*4/7){
             pixel.setGreen(128);
       }
    else if (pixel.getY()<Var_imagemfilter.getHeight()*5/7){
             pixel.setBlue(255);
       }
        else if (pixel.getY()<Var_imagemfilter.getHeight()*6/7){
             pixel.setRed(75);
             pixel.setBlue(130);
       }
       else{
          pixel.setGreen(238);
            pixel.setBlue(238);
       }
    }
  Var_imagemfilter.drawTo(Var_ImagemCanvas);
}

function ft_blur(){ 
    var Var_imagemfilter=new SimpleImage(Var_imagemupload);
      var Var_imagemblank=new SimpleImage(Var_imagemfilter.getWidth(),Var_imagemfilter.getHeight());
 
     for (var pixel of  Var_imagemfilter.values()){
    
    var xcoord = pixel.getX();
    var ycoord = pixel.getY(); 
    var imgvalue=pixel;
    var newx=pixel.getX()+Math.floor(Math.random() * 50) + 1;
       var newy=pixel.getY()+Math.floor(Math.random() * 50) + 1;
     
    if (newx<Var_imagemfilter.getWidth() && newy<Var_imagemfilter.getHeight()){
     imgvalue=Var_imagemfilter.getPixel(newx,newy);
    }
             Var_imagemblank.setPixel(xcoord,ycoord,imgvalue);
    
}  Var_imagemblank.drawTo(Var_ImagemCanvas);
  
}


function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}