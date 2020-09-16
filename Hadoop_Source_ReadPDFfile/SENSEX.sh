###############################################################################
#############################  COMPLETE SCRIPT   ##############################
### HEADER - PROGRAM NAME - <SENSEX.sh>                                     ###
### AUTHOR - BHAVESH BHADRICHA                                              ###
### DATE  - 27/DEC/2015                                                     ###
### VERSION - 1.0                                                           ###
### DESCRIPTION - Data: Sensex Log Data Processing                          ###
### (PDF File Processing in Map Reduce)                                     ###
###############################################################################
###############################################################################
##################################
###DEFINING THE LOCAL VARIABLES###
##################################
DATE=$(date +"%Y%m%d_%H%M%S")
LOGFILE="/home/bhavesh/POC/SENSEX/LOG/"$DATE".log"

####### Removing if any existent directories ##################################

hadoop fs -rmr /hdfs/bhavesh/SENSEX/RP
hadoop fs -rmr /hdfs/bhavesh/SENSEX/WP
hadoop fs -rmr /hdfs/bhavesh/SENSEX/OP
hadoop fs -rmr /hdfs/bhavesh/SENSEX/OMS
hadoop fs -rmr /hdfs/bhavesh/SENSEX/HM

##################################################################################
############## PDF File Processing USING Map Reduce ##############################
##################################################################################
echo "Mapreduce Program starts here"

echo "PDF File Processing in Map Reduce Started" >> $LOGFILE

hadoop fs -rmr /hdfs/bhavesh/SENSEX/OUTPUT

hadoop jar /home/bhavesh/POC/SENSEX/Mapreduce/SENSEX.jar com.bhavesh.poc.sensex.PdfInputDriver /hdfs/bhavesh/SENSEX/INPUT/sensexinputfile.pdf /hdfs/bhavesh/SENSEX/OUTPUT

if [ $? -eq 0 ]; then
    echo "Succesfully finished Mapreduce Processing " >> $LOGFILE
else
    echo "SENSEX MapReduce Failed Please check the Log " >> $LOGFILE
fi

#################################################################################
############### PIG Processing for SEXSEX DATA  #################################
#################################################################################

echo "SENSEX Pig Processing started "

echo "SENSEX PIG Processing Started" >> $LOGFILE

pig -f /home/bhavesh/POC/SENSEX/PIG/SENSEX.pig

if [ $? -eq 0 ]; then
    echo "PIG Succesfully finished SENSEX Processing " >> $LOGFILE
else
    echo "PIG SENSEX Processing Failed Please check the Log " >> $LOGFILE
fi

################################################################################
############# IMPORTING DATA in SQOOP ##########################################
################################################################################

echo "Importing the data to MYSQL  using SQOOP ";

echo "Importing the data to MYSQL " >> $LOGFILE

##### Creating the tables in MySql
sqoop eval --connect jdbc:mysql://localhost/SENSEX -username root -password root --query "create database if not exists  SENSEX;";
sqoop eval --connect jdbc:mysql://localhost/SENSEX -username root -password root --query "use SENSEX;";
sqoop eval --connect jdbc:mysql://localhost/SENSEX -username root -password root --query "grant all privileges on SENSEX.* to '%'@'localhost'";
sqoop eval --connect jdbc:mysql://localhost/SENSEX -username root -password root --query "grant all privileges on SENSEX.* to ''@'localhost'";

sqoop eval --connect jdbc:mysql://localhost/SENSEX -username root -password root --query "drop table if exists HighDemandMarket";
sqoop eval --connect jdbc:mysql://localhost/SENSEX -username root -password root --query "drop table if exists WealthyProducts";
sqoop eval --connect jdbc:mysql://localhost/SENSEX -username root -password root --query "drop table if exists OngoingMarketSt";
sqoop eval --connect jdbc:mysql://localhost/SENSEX -username root -password root --query "drop table if exists ReliableProducts";
sqoop eval --connect jdbc:mysql://localhost/SENSEX -username root -password root --query "drop table if exists OtherProducts";

echo " MYSQL table creation"

sqoop eval --connect jdbc:mysql://localhost/SENSEX -username root -password root --query "create table HighDemandMarket (Sid int,Sname varchar(30),TType varchar(20),TLoc varchar(20),OpenBal int,CloseBal int,FlucRate int)";
sqoop eval --connect jdbc:mysql://localhost/SENSEX -username root -password root --query "create table WealthyProducts(Sid int,Sname varchar(30),TType varchar(20),TLoc varchar(20),OpenBal int,CloseBal int,FlucRate int)";
sqoop eval --connect jdbc:mysql://localhost/SENSEX -username root -password root --query "create table OngoingMarketSt(Sid int,Sname varchar(30),TType varchar(20),TLoc varchar(20),OpenBal int,CloseBal int,FlucRate int)";
sqoop eval --connect jdbc:mysql://localhost/SENSEX -username root -password root --query "create table ReliableProducts(Sid int,Sname varchar(30),TType varchar(20),TLoc varchar(20),OpenBal int,CloseBal int,FlucRate int)";
sqoop eval --connect jdbc:mysql://localhost/SENSEX -username root -password root --query "create table OtherProducts(Sid int,Sname varchar(30),TType varchar(20),TLoc varchar(20),OpenBal int,CloseBal int,FlucRate int)";

echo "data exporting";

#### exporting the data into MYSQL
sqoop export --connect jdbc:mysql://localhost/SENSEX -username root -password root --table HighDemandMarket --export-dir /hdfs/bhavesh/SENSEX/HM/part-r-00000 --fields-terminated-by ',';
sqoop export --connect jdbc:mysql://localhost/SENSEX -username root -password root --table WealthyProducts --export-dir /hdfs/bhavesh/SENSEX/WP/part-r-00000 --fields-terminated-by ',';
sqoop export --connect jdbc:mysql://localhost/SENSEX -username root -password root --table OngoingMarketSt --export-dir /hdfs/bhavesh/SENSEX/OMS/part-r-00000 --fields-terminated-by ',';
sqoop export --connect jdbc:mysql://localhost/SENSEX -username root -password root --table ReliableProducts --export-dir /hdfs/bhavesh/SENSEX/RP/part-r-00000 --fields-terminated-by ',';
sqoop export --connect jdbc:mysql://localhost/SENSEX -username root -password root --table OtherProducts --export-dir /hdfs/bhavesh/SENSEX/OP/part-r-00000  --fields-terminated-by ',';

if[$? -eq 0]
echo "exporting of data to MYSQL is done";

echo "exporting of data to MYSQL is done" >> $LOGFILE

echo "creation of hive tables started";

echo "creation of hive tables started " >> $LOGFILE

hive -f /home/bhavesh/POC/SENSEX/HIVE/SENSEX.hql

echo "Hive process is done";
echo "HIVE PROCESSING is done" >> $LOGFILE
exit;