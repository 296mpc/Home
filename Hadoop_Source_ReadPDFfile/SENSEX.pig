A = LOAD '/hdfs/bhavesh/SENSEX/OUTPUT/HighDemandMarket-r-00000' using PigStorage('\t') as (Sid:int,Sname:chararray,Ttrading:chararray,Sloc:chararray,OBal:int,CBal:int,Frate:int);
disHM = DISTINCT A;
orHM = ORDER disHM by Sid;
STORE orHM into '/hdfs/bhavesh/SENSEX/HM' using PigStorage(',');

A = LOAD '/hdfs/bhavesh/SENSEX/OUTPUT/ReliableProducts-r-00000' using PigStorage('\t') as (Sid:int,Sname:chararray,Ttrading:chararray,Sloc:chararray,OBal:int,CBal:int,Frate:int);
disRP = DISTINCT A;
orRP = ORDER disRP by Sid;
STORE orRP into '/hdfs/bhavesh/SENSEX/RP' using PigStorage(',');

A = LOAD '/hdfs/bhavesh/SENSEX/OUTPUT/OtherProducts-r-00000' using PigStorage('\t') as (Sid:int,Sname:chararray,Ttrading:chararray,Sloc:chararray,OBal:int,CBal:int,Frate:int);
disOP = DISTINCT A;
orOP = ORDER disOP by Sid;
STORE orOP into '/hdfs/bhavesh/SENSEX/OP' using PigStorage(',');

A = LOAD '/hdfs/bhavesh/SENSEX/OUTPUT/WealthyProducts-r-00000' using PigStorage('\t') as (Sid:int,Sname:chararray,Ttrading:chararray,Sloc:chararray,OBal:int,CBal:int,Frate:int);
disWP= DISTINCT A;
orWP = ORDER disWP by Sid;
STORE orWP into '/hdfs/bhavesh/SENSEX/WP' using PigStorage(',');

A = LOAD '/hdfs/bhavesh/SENSEX/OUTPUT/OnGoingMarketStretegy-r-00000' using PigStorage('\t') as (Sid:int,Sname:chararray,Ttrading:chararray,Sloc:chararray,OBal:int,CBal:int,Frate:int);
disOMS = DISTINCT A;
orOMS = ORDER disOMS by Sid;
STORE orOMS into '/hdfs/bhavesh/SENSEX/OMS' using PigStorage(',');