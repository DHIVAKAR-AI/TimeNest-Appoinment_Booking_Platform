package com.timenest;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.Environment;

@SpringBootApplication
public class TimeNestApplication {

    public static void main(String[] args) {
        ConfigurableApplicationContext context = SpringApplication.run(TimeNestApplication.class, args);
        Environment env = context.getEnvironment();
        String port = env.getProperty("server.port", "8081");

        System.out.println("=============================================================");
        System.out.println("  TimeNest Appointment Booking Platform Started Successfully! ");
        System.out.println("  Access Web Application : http://localhost:" + port);
        System.out.println("  Access H2 Database DB  : http://localhost:" + port + "/h2-console");
        System.out.println("=============================================================");
    }
}
