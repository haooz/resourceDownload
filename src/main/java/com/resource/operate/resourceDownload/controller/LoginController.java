package com.resource.operate.resourceDownload.controller;

import com.alibaba.fastjson.JSON;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/admin")
public class LoginController {

    @RequestMapping("/toLogin")
    public String index() {
        return "/login";
    }


    @RequestMapping("/index")
    public String success() {
        return "/index";
    }

    @RequestMapping("/doLogin")
    @ResponseBody
    public Object login(@RequestParam("userName") String userName,@RequestParam("passWord") String passWord,  HttpSession session) {
        Map<String,Object> map=new HashMap<>();
        if(!userName.equals("zkhc") && !passWord.equals("123456")){
            map.put("status",1);
            map.put("message","用户名或密码错误!");
        }else{
            map.put("status",200);
            map.put("message","登陆成功!");
            session.setAttribute("name", userName);
        }
        return JSON.toJSON(map);
    }

}
