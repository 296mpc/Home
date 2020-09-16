package com.poc.ssx;
import java.io.IOException;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.lib.output.MultipleOutputs;
public class SensexTradeReducer extends
                        Reducer<Text, Text, IntWritable, Text> {
            private MultipleOutputs<IntWritable, Text> multipleOutputs;
            protected void reduce(Text key, Iterable<Text> values,
                                    Context context) throws IOException, InterruptedException {
                        String str1 = null;
                        int ssxid = 0;
                        for (Text value : values) {
                                    String str[] = value.toString().split("\t");
                                    String sxid = str[0].trim();
                                    ssxid = Integer.parseInt(sxid);
                                    str1 = str[1]+"\t"+str[2]+"\t"+str[3]+"\t"+str[4]+"\t"+str[5]+"\t"+str[6];
                                    //context.write(new IntWritable(ssxid), new Text(ssxname+","+TradeType+","+Location+","+Open_bal+","+Close_bal+","+Fluct_rate));
                                    multipleOutputs.write(new IntWritable(ssxid),
                                                            new Text(str1),
                                                            generateFileName(key));
                        }
            }
            String generateFileName(Text key){
                       
                        return key.toString();                      
            }
            @Override
            public void setup(Context context){
                        multipleOutputs = new MultipleOutputs<IntWritable, Text>(context);
            }
            @Override
            public void cleanup(final Context context) throws IOException, InterruptedException{
                        multipleOutputs.close();
            }          
}