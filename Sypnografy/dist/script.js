var Var_imagemuploadshow= null;
var Var_imagemuploadhide= null;
var imagemCombineTransform= null;

function ft_uploadfileshow(){
	var Var_canvasShow = document.getElementById("Img_OriginalShow");
    var Var_uploadfile = document.getElementById("cmd_uploadfileshow");
  
  Var_imagemuploadshow= new SimpleImage(Var_uploadfile);
  Var_imagemuploadshow.drawTo(Var_canvasShow);
}

function ft_uploadfilehide(){
	var Var_canvasHide = document.getElementById("Img_OriginalHide");
    var Var_uploadfile = document.getElementById("cmd_uploadfilehide");
  
  Var_imagemuploadhide= new SimpleImage(Var_uploadfile);
  Var_imagemuploadhide.drawTo(Var_canvasHide);
}

function imageSizefinal(image1, image2){
    var Widthimage1 = image1.getWidth();
    var Heightimage1 = image1.getHeight();
    
    var Widthimage2 = image2.getWidth();
    var Heightimage2 = image2.getHeight();
    
    if (Widthimage1>Widthimage2){
        var Widthimagefinal = Widthimage2;
    }
    else{
        var Widthimagefinal = Widthimage1;
    }
    
    if (Heightimage1>Heightimage2){
        var Heightimagefinal = Heightimage2;
    }
    else{
        var Heightimagefinal = Heightimage1;
    }
    
    return [Widthimagefinal,Heightimagefinal];
}

function resizeimage(imageBig, width, height){

    var imageResize= new SimpleImage(width,height);
    
    for (var pixel of imageResize.values()){
        var xcoord = pixel.getX();
        var ycoord = pixel.getY();
        
        var imgvalue=imageBig.getPixel(xcoord,ycoord);
        
        imageResize.setPixel(xcoord,ycoord,imgvalue);
    }
    
    return imageResize;
}

function Showformula (valorcor){
    return (Math.floor(valorcor/16)*16);
}

function Hideformula (valorcor){
    return (Math.floor(valorcor/16));
}

function Separateformula (valorcor){
    var resto=valorcor % 16
    
    return (resto*16);
}

function Showimage (imagemShow){
    
    var Newimage = new SimpleImage(imagemShow.getWidth(),imagemShow.getHeight());
    
    for (var pixel of Newimage.values()){
        var xcoord = pixel.getX();
        var ycoord = pixel.getY();
        
        var imgvalue=imagemShow.getPixel(xcoord,ycoord);
        
        var NewRed = Showformula(imgvalue.getRed());
        var NewGreen = Showformula(imgvalue.getGreen());
        var NewBlue = Showformula(imgvalue.getBlue());
        
        pixel.setRed(NewRed);
        pixel.setGreen(NewGreen);
        pixel.setBlue(NewBlue);
        
        Newimage.setPixel(xcoord,ycoord,pixel);
    }
    
    return Newimage;
}

function Hideimage (imagemHide){
    
    var Newimage = new SimpleImage(imagemHide.getWidth(),imagemHide.getHeight());
    
    for (var pixel of Newimage.values()){
        var xcoord = pixel.getX();
        var ycoord = pixel.getY();
        
        var imgvalue=imagemHide.getPixel(xcoord,ycoord);
        
        var NewRed = Hideformula(imgvalue.getRed());
        var NewGreen = Hideformula(imgvalue.getGreen());
        var NewBlue = Hideformula(imgvalue.getBlue());
        
        pixel.setRed(NewRed);
        pixel.setGreen(NewGreen);
        pixel.setBlue(NewBlue);
        
        Newimage.setPixel(xcoord,ycoord,pixel);
    }
    
    return Newimage;
}

function Combineimage (imagemShow,imagemHide){
    var Var_canvasShow = document.getElementById("Img_FinalShow");
	
    var Newimage = new SimpleImage(imagemShow.getWidth(),imagemShow.getHeight());
    
    for (var pixel of Newimage.values()){
        var xcoord = pixel.getX();
        var ycoord = pixel.getY();
        
        var imgvalueShow=imagemShow.getPixel(xcoord,ycoord);
        var imgvalueHide=imagemHide.getPixel(xcoord,ycoord);
        
        var NewRed = imgvalueShow.getRed()+imgvalueHide.getRed();
        var NewGreen = imgvalueShow.getGreen()+imgvalueHide.getGreen();
        var NewBlue = imgvalueShow.getBlue()+imgvalueHide.getBlue(); 
        
        pixel.setRed(NewRed);
        pixel.setGreen(NewGreen);
        pixel.setBlue(NewBlue);
        
        Newimage.setPixel(xcoord,ycoord,pixel);
    }
	  
	Newimage.drawTo(Var_canvasShow);
    
	  
    return Newimage;
}

function Separateimage (imagemCombine){
      var Var_canvashide = document.getElementById("Img_FinalHide");
	  
    var Newimage = new SimpleImage(imagemCombine.getWidth(),imagemCombine.getHeight());
    
    for (var pixel of Newimage.values()){
        var xcoord = pixel.getX();
        var ycoord = pixel.getY();
        
        var imgvalue=imagemCombine.getPixel(xcoord,ycoord);
        
        var NewRed = Separateformula(imgvalue.getRed());
        var NewGreen = Separateformula(imgvalue.getGreen());
        var NewBlue = Separateformula(imgvalue.getBlue()); 
        
        pixel.setRed(NewRed);
        pixel.setGreen(NewGreen);
        pixel.setBlue(NewBlue);
        
        Newimage.setPixel(xcoord,ycoord,pixel);
    }
    
	Newimage.drawTo(Var_canvashide);
	
    return Newimage;
}

function ft_juntar(){


var [Widthimagefinal,Heightimagefinal] = imageSizefinal(Var_imagemuploadhide, Var_imagemuploadshow);

var imageHideResize = resizeimage(Var_imagemuploadhide, Widthimagefinal, Heightimagefinal);
var imageShowResize = resizeimage(Var_imagemuploadshow, Widthimagefinal, Heightimagefinal);

var imagemShowTransform = Showimage(imageShowResize);
var imagemHideTransform = Hideimage(imageHideResize);
imagemCombineTransform = Combineimage(imagemShowTransform,imagemHideTransform);

}

function ft_separar(){

 var imagemSeparateTransform = Separateimage(imagemCombineTransform);

}



