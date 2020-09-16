package com.bhavesh.poc.sensex;
import java.io.IOException;
import java.util.StringTokenizer;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Mapper;
public class SensexTradeMapper extends Mapper<LongWritable, Text, Text, Text> {
            private Text word = new Text();
            protected void map(LongWritable key, Text value, Context context)
                                    throws IOException, InterruptedException {
                        String TradeType;
                        String Location;
                        int Open_bal;
                        int Close_bal;
                        int Fluct_rate;
                        String str[] = value.toString().split(",");
                        TradeType =str[2].toString();
                        Location = str[3].toString();
                        String Opbal = str[4];
                        Open_bal = Integer.parseInt(Opbal);
                        String Clbal = str[5];
                        Close_bal = Integer.parseInt(Clbal);
                        String fcrate = str[6].trim();
                        Fluct_rate = Integer.parseInt(fcrate);
                        if (TradeType.equals(new String("SIP")))
                        {
                                    if (Open_bal > 20000 && Fluct_rate <= 15)
                                    {
                                                word.set(new String("HighDemandMarket"));                              //word == key
                                    }
                                    else if(Close_bal > 30000 && Fluct_rate > 15 && Fluct_rate < 25)
                                    {
                                                word.set(new String("OnGoingMarketStretegy"));
                                    }
                        }
                        else if(TradeType.equals(new String("SHORTTERM")))
                        {
                                    if (Open_bal > 5000 && Open_bal < 30000)
                                    {
                                                word.set(new String("WealthyProducts"));
                                    }
                                    else if((Location.equals(new String("NEWYORK"))) ||
                                                            (Location.equals(new String("MUMBAI"))))
                                    {
                                                word.set(new String("ReliableProducts"));
                                    }
                        }
                        else
                        {
                                    word.set(new String("OtherProducts"));
                        }
                        String rec = str[0]+"\t"+str[1]+"\t"+str[2]+"\t"+str[3]+"\t"+str[4]+"\t"+str[5]+"\t"+str[6];
                       
                        //context.progress();
                        context.write(word, new Text(rec));
            }
}