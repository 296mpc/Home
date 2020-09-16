use SENSEX;

Drop table HDM;
Drop table WP;
Drop table RP;
Drop table OP;
Drop table OMS;

create table HDM(Sid int,Sname string,TTrading string,Sloc String,OpenBal int,CloseBal int,FlucRate int)
row format delimited
fields terminated by ","
stored as textfile;

load data inpath '/hdfs/bhavesh/SENSEX/HM/part-r-00000' into table HDM;

create table WP(Sid int,Sname string,TTrading string,Sloc String,OpenBal int,CloseBal int,FlucRate int)
row format delimited
fields terminated by ","
stored as textfile;

load data inpath '/hdfs/bhavesh/SENSEX/WP/part-r-00000' into table WP;

create table RP(Sid int,Sname string,TTrading string,Sloc String,OpenBal int,CloseBal int,FlucRate int)
row format delimited
fields terminated by ","
stored as textfile;

load data inpath '/hdfs/bhavesh/SENSEX/RP/part-r-00000' into table RP;

create table OP(Sid int,Sname string,TTrading string,Sloc String,OpenBal int,CloseBal int,FlucRate int)
row format delimited
fields terminated by ","
stored as textfile;

load data inpath '/hdfs/bhavesh/SENSEX/OP/part-r-00000' into table OP;

create table OMS(Sid int,Sname string,TTrading string,Sloc String,OpenBal int,CloseBal int,FlucRate int)
row format delimited
fields terminated by ","
stored as textfile;

load data inpath '/hdfs/bhavesh/SENSEX/OMS/part-r-00000' into table OMS;