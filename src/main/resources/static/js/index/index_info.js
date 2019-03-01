var FileStorageInfo = {
    fileStorageInfoData: {},
    validateFields: {
        name: {
            validators: {
                notEmpty: {
                    message: '文件名称不能为空'
                }
            }
        },
        path: {
            validators: {
                notEmpty: {
                    message: '文件位置不能为空'
                }
            }
        },
        purpose: {
            validators: {
                notEmpty: {
                    message: '用途不能为空'
                }
            }
        }
    }
}
/**
 * 清除数据
 */
FileStorageInfo.clearData = function() {
    this.fileStorageInfoData = {};
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
FileStorageInfo.set = function(key, val) {
    this.fileStorageInfoData[key] = (typeof val == "undefined") ? $("#" + key).val() : val;
    return this;
}

/**
 * 设置对话框中的数据
 *
 * @param key 数据的名称
 * @param val 数据的具体值
 */
FileStorageInfo.get = function(key) {
    return $("#" + key).val();
}

/**
 * 收集数据
 */
FileStorageInfo.collectData = function() {
    this
        .set('id')
        .set('name')
        .set('path')
        .set('purpose')
        .set('remark')
        .set('isOpen');
}

/**
 * 验证数据是否为空
 */
FileStorageInfo.validate = function () {
    $('#addPathForm').data("bootstrapValidator").resetForm();
    $('#addPathForm').bootstrapValidator('validate');
    return $("#addPathForm").data('bootstrapValidator').isValid();
}

/**
 * 关闭此对话框
 */
FileStorageInfo.close = function() {
    parent.layer.close(window.parent.File.layerIndex);
}

/**
 * 提交添加
 */
FileStorageInfo.addSubmit = function() {

    this.clearData();
    this.collectData();
    console.log(this.fileStorageInfoData);
    if (!this.validate()) {
        return;
    }
    //提交信息
    var ajax = new $ax(Feng.ctxPath + "/fileController/addFile", function(data){
        Feng.success("添加成功!");
        window.parent.File.table.refresh();
        FileStorageInfo.close();
    },function(data){
        Feng.error("添加失败!" + data.responseJSON.message + "!");
    });
    ajax.set(this.fileStorageInfoData);
    ajax.start();
}

$(function(){
    Feng.initValidator("addPathForm", FileStorageInfo.validateFields);

});