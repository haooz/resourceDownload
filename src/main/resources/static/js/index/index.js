var File = {
    id: "FileTable",	//表格id
    seItem: null,		//选中的条目
    table: null,
    layerIndex: -1,
    current_page: 1,
    totalPages: 1,
    pageSize: 10,
    table_height: 277,
    totalRows: 0,
    height:682
};

/**
 * 刷新
 */
File.refresh=function(){
    File.table.refresh();
};

/**
 * 初始化表格的列
 */
File.initColumn = function () {
    return [
        {field: 'selectItem', radio: true},
        {title: 'id', field: 'id', visible: true, align: 'center', valign: 'middle'},
        {title: '名称', field: 'name', visible: true, align: 'center', valign: 'middle'},
        {title: '文件位置  ', field: 'path', visible: true, align: 'center', valign: 'middle'},
        {title: '用途', field: 'purpose', visible: true, align: 'center', valign: 'middle'},
        {title: '备注', field: 'remark', visible: true, align: 'center', valign: 'middle'},
        {title: '创建时间', field: 'createTime', visible: false, align: 'center', valign: 'middle'},
        {title: '是否开启下载', field: 'isOpen', visible: true, align: 'center', valign: 'middle',
            /*formatter: function (value, row, index) {
                if(value==0){
                    return "可下载";
                }else{
                    return "不可下载";
                }
            }*/
            editable: {
                type: 'select',
                title: '能否下载',
                source:[{value:"0",text:"可下载"},{value:"1",text:"不可下载"}]
            }},
        {title: '操作', field: 'action', visible: true, align: 'center', valign: 'middle',
            formatter: function (value, row, index) {
            if(row.isOpen==0){
                return "<span>" +
                    "<div class=\"btn btn-default btn-sm download\">下载</div>\n" +
                    "<div class=\"btn btn-default btn-sm delete\">删除</div>" +
                    "</span>"
            }else{
                return "<span>" +
                    "<div class=\"btn btn-default btn-sm delete\">删除</div>" +
                    "</span>"
            }
            },events: "action_event"
        }
    ];
};

action_event = {
    "click .download": function (e, value, row,index) {
        if(File.fileIsExists(row)){
            File.download(row);
        }else{
            Feng.info("找不到指定资源!");
        }
    },
    "click .delete": function (e, value, row,index) {
        File.delete(row);
    }
};


/**
 * 检查是否选中
 */
File.check = function () {
    var selected = $('#' + this.id).bootstrapTable('getSelections');
    if(selected.length == 0){
        Feng.info("请先选中表格中的某一记录！");
        return false;
    }else{
        File.seItem = selected[0];
        return true;
    }
};

/**
 * 资源是否存在
 * @param row
 * @returns {boolean}
 */
File.fileIsExists=function(row){
    var flag=true;
    $.ajax({
        type: "post",
        dataType: "json",
        url: '/fileController/fileIsExists',
        data:{filePath:row.path},
        async:false,
        success: function (data) {
            if(data.status==1){
                flag=false;
            }
        }
    });
    return flag;
}

/**
 * 下载
 */
File.download=function(row){
    /*var url = Feng.ctxPath + "/fileController/download";
    var filePath = row.path;
    var form = $("<form></form>").attr("action", url).attr("method", "post");
    form.append($("<input/>").attr("type", "hidden").attr("name", "filePath").attr("value", filePath));
    form.appendTo('body').submit().remove();*/
    window.location.href=Feng.ctxPath + "/fileController/downloadById/"+row.id;
}


/**
 * 删除
 */
File.delete=function(row){
    var ajax = new $ax(Feng.ctxPath + "/fileController/delete", function (data) {
        Feng.success("删除成功!");
        File.table.refresh();
    }, function (data) {
        Feng.error("删除失败!" + data.responseJSON.message + "!");
    });
    ajax.set("fileId",row.id);
    ajax.start();
}

/**
 * 点击录入文件
 */
File.openAddFile = function () {
    var index = layer.open({
        type: 2,
        title: '录入文件',
        area: ['800px', '500px'], //宽高
        fix: false, //不固定
        maxmin: true,
        content: Feng.ctxPath + '/fileController/file_add'
    });
    this.layerIndex = index;
};


$(function () {
    var defaultColunms = File.initColumn();
    var tableId = File.id;
    var table = new BSTable(tableId, Feng.ctxPath +"/fileController/list", defaultColunms,File.pageSize,File.height);
    table.setPaginationType("client");
    table.options["showColumns"] = false;
    table.options["showRefresh"] = true;
    table.options["onEditableSave"] = function (field, row, oldValue, $el) {
        console.log(row);
        var ajax = new $ax(Feng.ctxPath + "/fileController/update", function(data){
            Feng.success("修改成功!");
            File.table.refresh();
        },function(data){
            Feng.error("修改失败!" + data.responseJSON.message + "!");
        });
        ajax.set(row);
        ajax.start();
    }
    File.table = table.init();
});
