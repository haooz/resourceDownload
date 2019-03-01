package com.resource.operate.resourceDownload.service.ServiceImpl;

import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.resource.operate.resourceDownload.mapper.FileStorageMapper;
import com.resource.operate.resourceDownload.model.FileStorage;
import com.resource.operate.resourceDownload.service.IFileStorageService;
import org.springframework.stereotype.Service;

@Service
public class FileStorageServiceImpl extends ServiceImpl<FileStorageMapper, FileStorage> implements IFileStorageService{


}
