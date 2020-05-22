package com.krajnik.dixitapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class DixitAppApplication /*extends SpringBootServletInitializer*/{
    /*@Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(DixitAppApplication.class);
    }*/
    public static void main(String[] args) {
        SpringApplication.run(DixitAppApplication.class, args);
    }

}
