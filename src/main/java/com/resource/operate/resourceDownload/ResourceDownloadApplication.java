package com.resource.operate.resourceDownload;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.bind.annotation.GetMapping;

@SpringBootApplication
@EnableScheduling
@EnableTransactionManagement
public class ResourceDownloadApplication {

	public static void main(String[] args) {
		SpringApplication.run(ResourceDownloadApplication.class, args);
	}

}
