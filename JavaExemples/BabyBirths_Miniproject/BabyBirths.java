
/**
 * Escreva a descrição da classe BabyBirths aqui.
 * 
 * @author (seu nome) 
 * @version (número de versão ou data)
 */
import edu.duke.*;
import org.apache.commons.csv.*;
import java.io.*;

public class BabyBirths {
    public void printNames () {
        FileResource fr = new FileResource();
        for (CSVRecord rec : fr.getCSVParser(false)) {
            int numBorn = Integer.parseInt(rec.get(2));
            if (numBorn <= 100) {
                System.out.println("Name " + rec.get(0) +
                           " Gender " + rec.get(1) +
                           " Num Born " + rec.get(2));
            }
        }
    }

    public void totalBirths (FileResource fr) {
        int totalBirths = 0;
        int totalBoys = 0;
        int totalGirls = 0;
        for (CSVRecord rec : fr.getCSVParser(false)) {
            int numBorn = Integer.parseInt(rec.get(2));
            totalBirths += numBorn;
            if (rec.get(1).equals("M")) {
                totalBoys += numBorn;
            }
            else {
                totalGirls += numBorn;
            }
        }
        System.out.println("total births = " + totalBirths);
        System.out.println("female girls = " + totalGirls);
        System.out.println("male boys = " + totalBoys);
    }

    public void testTotalBirths () {
        //FileResource fr = new FileResource();
        FileResource fr = new FileResource();
        totalBirths(fr);
    }
    
    public String getRankname  (int year, int rank, String gender){
        String nameRank="NO NAME";
        int rankfile=0;
        FileResource fr = new FileResource("data/yob" + year + ".csv");
        
        for (CSVRecord rec : fr.getCSVParser(false)) {
            if (rec.get(1).equals(gender))
            {
                rankfile += 1;
                if (rankfile==rank)
                {
                    nameRank=rec.get(0);
                }
            }
        }
    
        return nameRank;
    }
    
   public int getRank  (String name, String gender){
        int rankfile=0;
        FileResource fr = new FileResource();
        for (CSVRecord rec : fr.getCSVParser(false)) {
            if (rec.get(1).equals(gender))
            {
                rankfile += 1;
                if (rec.get(0).equals(name))
                {
                    System.out.println(name + " rank sadasd "  + rankfile);
                    return rankfile;
                }
            }
        }
        return 0;
    }
    
    public void whatIsNameInYear (String name, int year, int newYear, String gender) {
        String nameRank="NO NAME";
        int rankfile=0;
        FileResource fr = new FileResource("data/yob" + year + ".csv");
        
        for (CSVRecord rec : fr.getCSVParser(false)) {
            if (rec.get(1).equals(gender))
            {
                rankfile += 1;
                if (rec.get(0).equals(name))
                {
                        nameRank=getRankname(newYear,rankfile,gender);
        
                    System.out.println(name + " born in " + year + " would be " + nameRank  + " if she was born in " + newYear);
                    break;
                }
            }
        }
    
        
    }
    
    public void testwhatIsNameInYear () {
        getRank("Emily","F");
        getRank("Frank","M");
        String nameRank1=getRankname(1980,350,"F");
         System.out.println(" rank 1980 "  + nameRank1);
         String nameRank2=getRankname(1982,450,"M");
          System.out.println(" rank 1982 "  + nameRank2);
          
        whatIsNameInYear("Susan",1972,2014,"F");
        whatIsNameInYear("Owen",1974,2014,"M");
    }
    
    public int yearOfHighestRank   (String name, String gender){
        int bestrank=-1;
        String bestyear="-1";
        DirectoryResource dr = new DirectoryResource();
        // iterate over files
        for (File f : dr.selectedFiles()) {
            FileResource fr = new FileResource(f);
            int rank=0;
            for (CSVRecord rec : fr.getCSVParser(false)) {
                if (rec.get(1).equals(gender))
                {
                    rank+=1;
                    if (rec.get(0).equals(name))
                    {
                        if (bestrank==-1)
                        {
                            bestrank=rank;
                            bestyear=f.getName().substring(3,7);
                            break;
                        }
                        else
                        {
                            if (rank<bestrank)
                            {
                                bestrank=rank;
                                bestyear=f.getName().substring(3,7);
                                break;
                            }
                        }
                    }
                }
            }
        }
        return Integer.parseInt(bestyear);
    }
    
   public void testyearOfHighestRank  () {
        int bestyearresult =yearOfHighestRank("Genevieve","F");
        
         System.out.println("yearOfHighestRank" + "Genevieve" + " is " + bestyearresult);
            int bestyearresult2 =yearOfHighestRank("Mich","M");
        
         System.out.println("yearOfHighestRank" + "Mich" + " is " + bestyearresult2);
}
    
   public double getAverageRank(String name, String gender){
        double avgrank=-1;
        double totalrank=0;
        double nfile=0;
        DirectoryResource dr = new DirectoryResource();
        // iterate over files
        for (File f : dr.selectedFiles()) {
            FileResource fr = new FileResource(f);
            int rank=0;
            for (CSVRecord rec : fr.getCSVParser(false)) {
                if (rec.get(1).equals(gender))
                {
                    rank+=1;
                    if (rec.get(0).equals(name))
                    {
                        totalrank+=rank;
                        nfile+=1;                        
                    }
                }
            }
        }
        if (nfile!=0)
        {
            avgrank=totalrank/nfile;
        }
        return avgrank;
    }
    
   public void testgetAverageRank () {
        double AverageRankresult =getAverageRank("Robert","M");
        
         System.out.println("AverageRank " + "Robert" + " is " + AverageRankresult);
         
        AverageRankresult =getAverageRank("Susan","F");
        
         System.out.println("AverageRank " + "Susan" + " is " + AverageRankresult);
          
    }
    
   public int getTotalBirthsRankedHigher (int year,String name, String gender){
        
       int totalBirths=0;
       FileResource fr = new FileResource("data/yob" + year + ".csv");
            for (CSVRecord rec : fr.getCSVParser(false)) {
                if (rec.get(1).equals(gender))
                {
                    
                    if (rec.get(0).equals(name))
                    {
                        break;                     
                    }
                    else
                    {
                        totalBirths+=Integer.parseInt(rec.get(2));
                    }
                }
            }
        return totalBirths;
    }
       public void testTotalBirthsRankedHigher () {
        int totalBirthsresult =getTotalBirthsRankedHigher(1990,"Emily","F");
        
         System.out.println("totalBirths " + "Emily" + " is " + totalBirthsresult);
         
        int totalBirthsresult1 =getTotalBirthsRankedHigher(1990,"Drew","M");
        
         System.out.println("totalBirths " + "Drew" + " is " + totalBirthsresult1);
          
    }
}

