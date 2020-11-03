
/**
 * Escreva a descrição da classe nc_weather aqui.
 * 
 * @author (seu nome) 
 * @version (número de versão ou data)
 */
import edu.duke.*;
import org.apache.commons.csv.*;
import java.io.*;

public class nc_weather {
    public CSVRecord hottestHourInFile(CSVParser parser) {
        //start with largestSoFar as nothing
        CSVRecord largestSoFar = null;
        //For each row (currentRow) in the CSV File
        for (CSVRecord currentRow : parser) {
            // use method to compare two records
            largestSoFar = getLargestOfTwo(currentRow, largestSoFar);
        }
        //The largestSoFar is the answer
        return largestSoFar;
    }

    public void testHottestInDay () {
        FileResource fr = new FileResource("data/2014/weather-2014-01-08.csv");
        CSVRecord largest = hottestHourInFile(fr.getCSVParser());
        System.out.println("hottest temperature was " + largest.get("TemperatureF") +
                   " at " + largest.get("TimeEST"));
    }

    public CSVRecord hottestInManyDays() {
        CSVRecord largestSoFar = null;
        DirectoryResource dr = new DirectoryResource();
        // iterate over files
        for (File f : dr.selectedFiles()) {
            FileResource fr = new FileResource(f);
            // use method to get largest in file.
            CSVRecord currentRow = hottestHourInFile(fr.getCSVParser());
            // use method to compare two records
            largestSoFar = getLargestOfTwo(currentRow, largestSoFar);
        }
        //The largestSoFar is the answer
        return largestSoFar;
    }

    public CSVRecord getLargestOfTwo (CSVRecord currentRow, CSVRecord largestSoFar) {
        //If largestSoFar is nothing
        if (largestSoFar == null) {
            largestSoFar = currentRow;
        }
        //Otherwise
        else {
            double currentTemp = Double.parseDouble(currentRow.get("TemperatureF"));
            double largestTemp = Double.parseDouble(largestSoFar.get("TemperatureF"));
            //Check if currentRow’s temperature > largestSoFar’s
            if (currentTemp > largestTemp) {
                //If so update largestSoFar to currentRow
                largestSoFar = currentRow;
            }
        }
        return largestSoFar;
    }

    public void testHottestInManyDays () {
        CSVRecord largest = hottestInManyDays();
        System.out.println("hottest temperature was " + largest.get("TemperatureF") +
                   " at " + largest.get("DateUTC"));
    }
    
    public CSVRecord coldestHourInFile (CSVParser parser) {
        CSVRecord coldestSoFar = null;
        
        for (CSVRecord currentRow : parser) {
            if (coldestSoFar == null) {
                coldestSoFar = currentRow;
            }        
            else {
                double currentTemp = Double.parseDouble(currentRow.get("TemperatureF"));
                double coldestTemp = Double.parseDouble(coldestSoFar.get("TemperatureF"));
                if (currentTemp < coldestTemp && currentTemp != -9999) {
                    coldestSoFar = currentRow;
                }
            }
        }        

        return coldestSoFar;
    }
    
    public void testColdestHourInFile () {
        FileResource fr = new FileResource("data/2014/weather-2014-05-01.csv");
        CSVRecord Coldest = coldestHourInFile(fr.getCSVParser());
        System.out.println("hottest temperature was " + Coldest.get("TemperatureF") +
                   " at " + Coldest.get(0));
    }
    
    public String fileWithColdestTemperature () {
        String namefile=null;
       double currentTemp =0.0;
       double coldestSoFarTemp =0.0;
        DirectoryResource dr = new DirectoryResource();
        // iterate over files
        for (File f : dr.selectedFiles()) {
            FileResource fr = new FileResource(f);
            CSVRecord currentRow = coldestHourInFile(fr.getCSVParser());
            currentTemp =Double.parseDouble(currentRow.get("TemperatureF"));
           if (coldestSoFarTemp == 0.0) {
                coldestSoFarTemp=currentTemp;
                namefile=f.getName();
            }
            else {
                if (currentTemp < coldestSoFarTemp) {
                    coldestSoFarTemp=currentTemp;
                    namefile=f.getName();
                }
            }
        }
        return namefile;
    }
       
    public void testFileWithColdestTemperature() {
        String name = fileWithColdestTemperature();
        FileResource fr = new FileResource("data/2013/" + name);
        CSVRecord Coldest = coldestHourInFile(fr.getCSVParser());
        System.out.println("Coldest day was in file " + name);
        System.out.println("Coldest temperature on that day was " + Coldest.get("TemperatureF"));
        System.out.println("All the Temperatures on the coldest day were:");         
        for (CSVRecord Row : fr.getCSVParser()) {
        System.out.println(Row.get("DateUTC") +
                   ": " + Row.get("TemperatureF"));
        }
    }

    public CSVRecord lowestHumidityInFile  (CSVParser parser) {
       CSVRecord HumiditySoFar = null;
        
        for (CSVRecord currentRow : parser) {
            if (HumiditySoFar == null) {
                HumiditySoFar = currentRow;
            }        
            else {
                if (currentRow.get("Humidity")!="N/A")
                {
                    if(HumiditySoFar.get("Humidity")!="N/A") 
                    {
                        double currentHumiditySoFar = Double.parseDouble(currentRow.get("Humidity"));
                        double coldestHumiditySoFar = Double.parseDouble(HumiditySoFar.get("Humidity"));
                        if (currentHumiditySoFar < coldestHumiditySoFar) {
                            HumiditySoFar = currentRow;
                        }
                    }
                    else
                    {
                       HumiditySoFar = currentRow; 
                    }
                }
            }
            }     

        return HumiditySoFar;
    }
    
    public void testLowestHumidityInFile () {
        FileResource fr = new FileResource();
        CSVParser parser = fr.getCSVParser();
        CSVRecord csv = lowestHumidityInFile(parser);
        System.out.println("hottest HumidityInFile was " + csv.get(3) +
                   " at " + csv.get(0));
    }
    
   public CSVRecord lowestHumidityInManyFiles () {
        CSVRecord lowestSoFar = null;
        DirectoryResource dr = new DirectoryResource();
        // iterate over files
        for (File f : dr.selectedFiles()) {
            FileResource fr = new FileResource(f);
            // use method to get largest in file.
            CSVRecord currentRow = lowestHumidityInFile(fr.getCSVParser());
            // use method to compare two records
            lowestSoFar = getlowesOfTwo(currentRow, lowestSoFar);
        }
        //The largestSoFar is the answer
        return lowestSoFar;
    }
    
   public CSVRecord getlowesOfTwo (CSVRecord currentRow, CSVRecord lowestSoFar) {
        //If largestSoFar is nothing
        if (lowestSoFar == null) {
            lowestSoFar = currentRow;
        }
        //Otherwise
        else {
              if (currentRow.get("Humidity")!="N/A")
                {
                    if(lowestSoFar.get("Humidity")!="N/A") 
                    {
                        double currentHumiditySoFar = Double.parseDouble(currentRow.get("Humidity"));
                        double coldestHumiditySoFar = Double.parseDouble(lowestSoFar.get("Humidity"));
                        if (currentHumiditySoFar < coldestHumiditySoFar) {
                            lowestSoFar = currentRow;
                        }
                    }
                    else
                    {
                       lowestSoFar = currentRow; 
                    }
                }
        }
        return lowestSoFar;
    }
    
    public void testLowestHumidityInManyFiles () {
           CSVRecord lowestSoFar = lowestHumidityInManyFiles();
               System.out.println("hottest HumidityInFile was " + lowestSoFar.get(3) +
                   " at " + lowestSoFar.get(0));
    }
   
    public double averageTemperatureInFile  (CSVParser parser) {
        
        double avageTemp=0.0;
        double totaltemp=0;
        int numtemp=0;
        for (CSVRecord currentRow : parser) {
                double currentTemp=Double.parseDouble(currentRow.get("TemperatureF"));
                if(currentTemp != -9999){
                     totaltemp=totaltemp+currentTemp;
                     numtemp=numtemp+1;    
                }
            }           
    
        avageTemp=totaltemp/numtemp;
        return avageTemp;
    }
    
    public void testAverageTemperatureInFile () {
        FileResource fr = new FileResource();
        CSVParser parser = fr.getCSVParser();
           double avageTemp = averageTemperatureInFile(parser);
               System.out.println("Average temperature in file is " + avageTemp);
    }
    
    
    public double averageTemperatureWithHighHumidityInFile (CSVParser parser, int value) {
        
        double avageTemp=0.0;
        double totaltemp=0;
        int numtemp=0;
        for (CSVRecord currentRow : parser) {
            if (currentRow.get("Humidity")!="N/A")
            {
              int currentHumidity= Integer.parseInt(currentRow.get("Humidity"));
              if (currentHumidity>=value)
              {
                 totaltemp=totaltemp+Double.parseDouble(currentRow.get("TemperatureF"));
                 numtemp=numtemp+1;
              }
              
            }
            
        }
        avageTemp=totaltemp/numtemp;
        return avageTemp;
    }
    
    public void testAverageTemperatureWithHighHumidityInFile () {
        FileResource fr = new FileResource();
        CSVParser parser = fr.getCSVParser();
           double avageTemp = averageTemperatureWithHighHumidityInFile(parser,80);
               System.out.println("Average temperature in file is " + avageTemp);
    }

}
