package com.resource.operate.resourceDownload.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.resource.operate.resourceDownload.model.FileStorage;
import com.resource.operate.resourceDownload.service.IFileStorageService;
import com.resource.operate.resourceDownload.util.UUIDUtil;
import com.resource.operate.resourceDownload.util.ZipUtils;
import com.zkhc.znkf.core.base.controller.BaseController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.io.*;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/fileController")
public class FileStorageController extends BaseController {
    @Autowired
    private IFileStorageService fileStorageService;
    public static final Logger logger= LoggerFactory.getLogger(ZipUtils.class);

    /**
     * 录入文件路径
     */
    @RequestMapping(value = "/addFile")
    @ResponseBody
    public Object add(FileStorage fileStorage) {
        fileStorage.setId(UUIDUtil.getUUID());
        fileStorage.setCreateTime(new Date());
        fileStorageService.insert(fileStorage);
        logger.info("录入成功! 文件信息："+fileStorage.toString());
        return SUCCESS_TIP;
    }

    /**
     * 录入文件路径（外部调用）
     */
    @RequestMapping(value = "/add_file")
    @ResponseBody
    public Object addFile(@RequestBody Map<String,Object> params) {
        FileStorage fs=new FileStorage();
        fs.setName(params.get("name").toString());
        fs.setPath(params.get("path").toString());
        fs.setPurpose(params.get("purpose").toString());
        fs.setRemark(params.get("remark").toString());
        fs.setIsOpen(Integer.parseInt(params.get("isOpen").toString()));
        fs.setId(UUIDUtil.getUUID());
        fs.setCreateTime(new Date());
        fileStorageService.insert(fs);
        logger.info("录入成功! 文件信息："+fs.toString());
        return SUCCESS_TIP;
    }

    /**
     * 获取文件列表
     */
    @RequestMapping(value = "/list")
    @ResponseBody
    public Object list() {
        return fileStorageService.selectList(null);
    }

    /**
     * 删除文件
     */
    @RequestMapping(value = "/delete")
    @ResponseBody
    public Object delete(@RequestParam String fileId) {
        fileStorageService.deleteById(fileId);
        logger.info("删除成功! 文件编号："+fileId);
        return SUCCESS_TIP;
    }

    /**
     * 跳转到录入文件
     */
    @RequestMapping(value ="/file_add")
    public String fileAdd() {
        return "/addFile";
    }

    /**
     * 跳转到下载错误
     */
    @RequestMapping(value ="/download_error")
    public String downloadError() {
        return "/downloadError";
    }
    /**
     * 修改
     */
    @RequestMapping(value = "/update")
    @ResponseBody
    public Object update(@Valid FileStorage fileStorage, BindingResult bindingResult) {
        fileStorageService.updateById(fileStorage);
        return SUCCESS_TIP;
    }


    /**
     * 资源是否存在
     */
    @RequestMapping(value = "/fileIsExists")
    @ResponseBody
    public Object fileIsExists(@RequestParam("filePath") String filePath) {
        Map<String,Object> map=new HashMap<>();
        File file = new File(filePath);
        if (file.exists()){
           map.put("status",0);
        }else{
            map.put("status",1);
        }
        return JSON.toJSON(map);
    }

    /*public void downloadFile(String filePath,HttpServletResponse response) throws Exception {
        try {
            //File file = new File("C:\\Users\\admin\\Downloads\\abc.png");
            File file = new File(filePath);
            if (file.exists()) {
                String fileName = filePath.substring(filePath.lastIndexOf(File.separator) + 1);//得到文件名
                //String fileName ="abc.png";
                fileName = new String(fileName.getBytes("UTF-8"), "ISO8859-1");//把文件名按UTF-8取出并按ISO8859-1编码，保证弹出窗口中的文件名中文不乱码，中文不要太多，最多支持17个中文，因为header有150个字节限制。
                response.setContentType("application/octet-stream");//告诉浏览器输出内容为流
                response.addHeader("Content-Disposition", "attachment;filename=" + fileName);//Content-Disposition中指定的类型是文件的扩展名，并且弹出的下载对话框中的文件类型图片是按照文件的扩展名显示的，点保存后，文件以filename的值命名，保存类型以Content中设置的为准。注意：在设置Content-Disposition头字段之前，一定要设置Content-Type头字段。
                String len = String.valueOf(file.length());
                response.setHeader("Content-Length", len);//设置内容长度
                OutputStream out = response.getOutputStream();
                FileInputStream in = new FileInputStream(file);
                byte[] b = new byte[1024];
                int n;
                while ((n = in.read(b)) != -1) {
                    out.write(b, 0, n);
                }
                in.close();
                out.close();
            }
            } catch(FileNotFoundException e){
                e.printStackTrace();
            } catch(IOException e){
                e.printStackTrace();
            }
        }*/


    /**
     * 开放下载的根据id下载
     * @param fileId
     * @throws Exception
     */
    @RequestMapping(value="/downloadById/{fileId}")
    public void downloadFileById(@PathVariable String fileId,HttpServletRequest request,HttpServletResponse response) throws Exception {
        try {
            FileStorage fileStorage=fileStorageService.selectById(fileId);
            if(fileStorage.getIsOpen()!=0){
                response.sendRedirect("/fileController/download_error");
                return;
            }
            String filePath=fileStorage.getPath();
            String name=fileStorage.getName();
            File file = new File(fileStorage.getPath());
            if (!file.exists()){
                response.sendRedirect("/fileController/download_error");
                return;
            }
            if (file.isFile() && file.exists()) {
                String fileName = filePath.substring(filePath.lastIndexOf(File.separator) + 1);//得到文件名
                //String fileName ="abc.png";
                fileName = new String(fileName.getBytes("UTF-8"), "ISO8859-1");//把文件名按UTF-8取出并按ISO8859-1编码，保证弹出窗口中的文件名中文不乱码，中文不要太多，最多支持17个中文，因为header有150个字节限制。
                response.setContentType("application/octet-stream");//告诉浏览器输出内容为流
                response.addHeader("Content-Disposition", "attachment;filename=" + fileName);//Content-Disposition中指定的类型是文件的扩展名，并且弹出的下载对话框中的文件类型图片是按照文件的扩展名显示的，点保存后，文件以filename的值命名，保存类型以Content中设置的为准。注意：在设置Content-Disposition头字段之前，一定要设置Content-Type头字段。
                String len = String.valueOf(file.length());
                response.setHeader("Content-Length", len);//设置内容长度
                OutputStream out = response.getOutputStream();
                FileInputStream in = new FileInputStream(file);
                byte[] b = new byte[1024];
                int n;
                while ((n = in.read(b)) != -1) {
                    out.write(b, 0, n);
                }
                in.close();
                out.close();
                logger.info("下载成功! 文件编号："+fileId);
            }else if(file.isDirectory() && file.exists()){
                System.out.println(name);
                name = new String(name.getBytes("UTF-8"), "ISO8859-1");
                response.setContentType("application/zip");
                response.setHeader("Content-Disposition", "attachment; filename="+name+".zip");
                ZipUtils.toZip(filePath, response.getOutputStream(),true);
                logger.info("下载成功! 文件编号："+fileId);
            }
        } catch(FileNotFoundException e){
            e.printStackTrace();
        } catch(IOException e){
            e.printStackTrace();
        }
    }
}
