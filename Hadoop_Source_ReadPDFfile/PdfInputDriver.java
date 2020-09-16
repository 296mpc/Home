package com.bhavesh.poc.sensex;
import java.io.IOException;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.mapreduce.lib.output.LazyOutputFormat;
import org.apache.hadoop.mapreduce.lib.output.MultipleOutputs;
import org.apache.hadoop.mapreduce.lib.output.TextOutputFormat;
import org.apache.hadoop.util.GenericOptionsParser;

public class PdfInputDriver {

            public static void main(String[] args) throws IOException,
                                    InterruptedException, ClassNotFoundException {
                        Configuration conf = new Configuration();
                        //GenericOptionsParser is a utility to parse command line arguments generic to the Hadoop framework
                        GenericOptionsParser parser = new GenericOptionsParser(conf, args);
                       
                        //Returns an array of Strings containing only application-specific arguments
                        args = parser.getRemainingArgs();
                       
                        Job job = new Job(conf, "PdfSensexDetails");
                        job.setJarByClass(PdfInputDriver.class);
                        job.setOutputKeyClass(Text.class);
                       
                        job.setOutputValueClass(Text.class);
                        // Custom InputFormat class
                        job.setInputFormatClass(PdfInputFormat.class);
                       
                        //job.setOutputFormatClass(TextOutputFormat.class);
                        LazyOutputFormat.setOutputFormatClass(job, TextOutputFormat.class);
                        MultipleOutputs.addNamedOutput(job, "text", TextOutputFormat.class,IntWritable.class, Text.class);
                       
                        FileInputFormat.setInputPaths(job, new Path(args[0]));
                        FileOutputFormat.setOutputPath(job, new Path(args[1]));
                        job.setMapperClass(SensexTradeMapper.class);
                        job.setReducerClass(SensexTradeReducer.class);
                        System.out.println(job.waitForCompletion(true));
            }
}