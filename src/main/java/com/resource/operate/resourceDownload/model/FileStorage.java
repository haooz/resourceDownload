package com.resource.operate.resourceDownload.model;

import com.baomidou.mybatisplus.activerecord.Model;
import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.Date;

@TableName("file_storage")
public class FileStorage extends Model<FileStorage> {
    private static final long serialVersionUID = 1L;
    @TableId("id")
    private String id;
    private String name;
    private String path;
    private String purpose;
    private String remark;
    @TableField("create_time")
    private Date createTime;
    @TableField("is_open")
    private int isOpen;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getPurpose() {
        return purpose;
    }

    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public int getIsOpen() {
        return isOpen;
    }

    public void setIsOpen(int isOpen) {
        this.isOpen = isOpen;
    }

    @Override
    public String toString() {
        return "FileStorage{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", path='" + path + '\'' +
                ", purpose='" + purpose + '\'' +
                ", remark='" + remark + '\'' +
                ", createTime=" + createTime +
                ", isOpen=" + isOpen +
                '}';
    }

    @Override
    protected Serializable pkVal() {
        return this.id;
    }
}
