package com.resource.operate.resourceDownload.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

import java.util.ArrayList;
import java.util.List;
//@Configuration
public class WebConfigurer implements WebMvcConfigurer  {
    @Autowired
    private LoginInterceptor loginInterceptor;

    public void addResourceHandlers(ResourceHandlerRegistry registry) {
    }

    public void addInterceptors(InterceptorRegistry registry) {
        List<String> list=new ArrayList<>();
        list.add("/admin/toLogin");
        list.add("/admin/doLogin");
        list.add("/fileController/downloadById/**");
        list.add("/fileController/add_file");
        list.add("/fileController/download_error");
        list.add("/login.html");
        list.add("/downloadError.html");
        list.add("/bootstrap-editable/**");
        list.add("/css/**");
        list.add("/fonts/**");
        list.add("/js/**");
        list.add("/layer/**");
        list.add("/favicon.ico");
        registry.addInterceptor(loginInterceptor).addPathPatterns("/**").excludePathPatterns(list);
    }
}
