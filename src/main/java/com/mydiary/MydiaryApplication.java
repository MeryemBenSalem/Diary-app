package com.mydiary;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;


@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class MydiaryApplication {

	public static void main(String[] args) {
		SpringApplication.run(MydiaryApplication.class, args);
	}

}
