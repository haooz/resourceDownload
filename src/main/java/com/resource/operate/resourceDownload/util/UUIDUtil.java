package com.resource.operate.resourceDownload.util;

import java.util.UUID;

/**
 * @author YiTian
 * @version V1.0
 * @package com.zkhc.znkf.common.util
 * @description 生成UUID
 * @email yitian@ai-kang.cn
 * Create Time 2017/7/28 18:47
 */
public class UUIDUtil {
    /**
     * 获取一个新的UUID
     * @return
     */
    public static String getUUID(){
        return UUID.randomUUID().toString().replaceAll("-","");
    }
}
