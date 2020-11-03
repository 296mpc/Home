
/**
 * Escreva a descrição da classe DnaFinder aqui.
 * 
 * @author (seu nome) 
 * @version (número de versão ou data)
 */
import edu.duke.*;
import java.io.*;

public class DnaFinder {
    public int findStopCodon(String dna, int startIndex, String stopCodon) {
        if (startIndex == -1) {
            return -1;
        }
        int stopIndex = -1;
        int start=startIndex+3;
        while(true){
            stopIndex = dna.indexOf(stopCodon, start);
            if ((stopIndex - startIndex) % 3 == 0 || stopIndex == -1) {
                break;
            }
            else {
                start=stopIndex+1;
            }
        }
        return stopIndex;
   }
   
     public  int findGeneCTG (String dna) {
       int start=0;
       int total=0;
       while(true){
           
           int CTGindex=findStopCodon(dna,start,"CTG");

           if ( CTGindex==-1) {
                break;
            }

           total=total+1;
           start=CTGindex+1;

       }
      
     
       return total;
   }
   
   public String findGene (String dna, int newstart) {
       int start = dna.indexOf("ATG",newstart);  
       if (start == -1) {
            return "";
       }
       int taaindex=findStopCodon(dna,start,"TAA");
       int tgaindex=findStopCodon(dna,start,"TGA");
       int tagindex=findStopCodon(dna,start,"TAG");
       int end=-1;
       int end1=-1;
       if (taaindex != -1)
       {
          if(taaindex<tgaindex)
          {
              end1=taaindex;
          }
          else
          {
              if (tgaindex != -1)
              {
                  end1=tgaindex;
              }
              else
              {
                  end1=taaindex;
              }
          }
       }
       else
       {
          end1=tgaindex;          
       }
       
       if (end1 != -1)
       {
          if(end1<tagindex)
          {
              end=end1;
          }
          else
          {
              if (tagindex != -1)
              {
                  end=tagindex;
              }
              else
              {
                  end=end1;
              }
          }
       }
       else
       {
          end=tagindex;          
       }
       
       if (end == -1) {
            return "";
       }
       else
       {
           return dna.substring(start, end+3);
        }
   }
   
  public StorageResource AllGene (String dna) {
       int start=0;
       StorageResource allgenes= new StorageResource();
       while(true){
           
           String currentgene=findGene(dna,start);

           if ( currentgene.isEmpty()) {
                break;
            }
           allgenes.add(currentgene);
           start=dna.indexOf(currentgene,start)+currentgene.length();

       }
      
     
       return allgenes;

   }
   
   public float cgRatio (String dna, String find,String find2) {
       int nelements=0;
       int start=0;
       int Index=-1;
       while(true){
            Index = dna.indexOf(find, start);
            if ( Index == -1) {
                break;
            }
            else {
                nelements=nelements+1;
                start=Index+1;
            }
       }
       start=0;
       Index=-1;
       while(true){
            Index = dna.indexOf(find2, start);
            if ( Index == -1) {
                break;
            }
            else {
                nelements=nelements+1;
                start=Index+1;
            }
       }
      
      return nelements/(float)dna.length();
   }
   
  public String mystery(String dna) {
  int pos = dna.indexOf("T");
  int count = 0;
  int startPos = 0;
  String newDna = "";
  if (pos == -1) {
    return dna;
  }
  while (count < 3) {
    count += 1;
    newDna = newDna + dna.substring(startPos,pos);
    startPos = pos+1;
    pos = dna.indexOf("T", startPos);
    if (pos == -1) {
      break;
    }
  }
  newDna = newDna + dna.substring(startPos);
  return newDna;
}
   
    public void testing() {
        String a = "cccATGCCCTAGataataATGTAGttt";
        String ap = "TTTTatggggtttaaataataatag";
        //String a = "atgcctag";
        //String ap = "";
        //String a = "ATGCCCTAG";
        //String ap = "ATGCCCTAG";
        System.out.println(a);
        System.out.println("found: " +  mystery(a));
        
        System.out.println(ap);
        System.out.println("found: " +  mystery(ap));
        //S/torageResource genes = AllGene(a);
           // for (String g:genes.data()){
             //  System.out.println("found: " + g); 
            //}

 
    }

    public void realTesting() {
        DirectoryResource dr = new DirectoryResource();
        for (File f : dr.selectedFiles()) {
            FileResource fr = new FileResource(f);
            String s = fr.asString();
            System.out.println("read " + s.length() + " characters");
            
            StorageResource genes = AllGene(s);
            int maior60=0;
            int   maior35=0;
            float m35=0;
            for (String g:genes.data()){
               System.out.println("found: " + g); 
               if (g.length()>60)
               {
                   maior60=maior60+1;
                }
               
                m35=cgRatio(g,"C","G");
               if (m35>0.35)
               {
                   maior35=maior35+1;
                }
            }
            System.out.println("findGeneCTG: " + findGeneCTG(s));  
            System.out.println("total: " + genes.size()); 
            System.out.println("maior60: " + maior60); 
            System.out.println("maior35: " + maior35); 
            //String result = findProtein(s);
            //System.out.println("found " + result);
        }
    }
}