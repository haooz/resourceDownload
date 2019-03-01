/**
 * 初始化 BootStrap Table 的封装
 *
 * 约定：toolbar的id为 (bstableId + "Toolbar")
 *
 * @author fengshuonan
 */
(function () {
    var BSTable = function (bstableId, url, columns, page_size, height) {
        this.btInstance = null;					//jquery和BootStrapTable绑定的对象
        this.bstableId = bstableId;
        this.url = Feng.ctxPath + url;
        this.method = "post";
        this.paginationType = "server";			//默认分页方式是服务器分页,可选项"client"
        this.toolbarId = bstableId + "Toolbar";
        this.columns = columns;
        this.height = height != undefined ? height : 665;						//默认表格高度665
        this.data = {};
        this.queryParams = {}; // 向后台传递的自定义参数
        this.page_size = page_size != undefined ? page_size : 14;
        this.options = {
            contentType: "application/x-www-form-urlencoded",
            url: this.url,				//请求地址
            method: this.method,		//ajax方式,post还是get
            toolbar: "#" + this.toolbarId,//顶部工具条
            striped: true,     			//是否显示行间隔色
            cache: false,      			//是否使用缓存,默认为true
            pagination: true,     		//是否显示分页（*）
            sortable: true,      		//是否启用排序
            sortOrder: "desc",     		//排序方式
            pageNumber: 1,      			//初始化加载第一页，默认第一页
            pageSize: this.page_size,      			//每页的记录行数（*）
            pageList: [3, 14, 50, 100],  	//可供选择的每页的行数（*）
            queryParamsType: 'limit', 	//默认值为 'limit' ,在默认情况下 传给服务端的参数为：offset,limit,sort
            sidePagination: this.paginationType,   //分页方式：client客户端分页，server服务端分页（*）
            search: false,      		//是否显示表格搜索，此搜索是客户端搜索，不会进服务端
            strictSearch: true,			//设置为 true启用 全匹配搜索，否则为模糊搜索
            showColumns: true,     		//是否显示所有的列
            showRefresh: true,     		//是否显示刷新按钮
            minimumCountColumns: 2,    	//最少允许的列数
            clickToSelect: true,    	//是否启用点击选中行
            searchOnEnterKey: true,		//设置为 true时，按回车触发搜索方法，否则自动触发搜索方法
            columns: this.columns,		//列数组
            height: this.height,
            icons: {
                refresh: 'glyphicon-repeat',
                toggle: 'glyphicon-list-alt',
                columns: 'glyphicon-list'
            },
            ajaxOptions: {

            },
            iconSize: 'outline',
            current_page: 1,
            totalPages: 1,
            onEditableSave:{},
        }
    };
    BSTable.prototype = {
        /**
         * 初始化bootstrap table
         */
        init: function () {
            var tableId = this.bstableId;
            var me = this;
            //ajax post 请求的附带参数
            // table.set("doctorId", doctor_id);
            // or table.setData({doctorId: doctor_id});
            this.options["ajaxOptions"] = {
                data: me.data
            };
            //ajax post 请求的附带参数
            // set : table.setQueryParams({doctorId: doctor_id});
            this.options["queryParams"] =  function (param) {
                 return $.extend(me.queryParams, param);
            }; // 向后台传递的自定义参数
            this.btInstance =
                $('#' + tableId).bootstrapTable(this.options);

            var $page = $('#' + tableId + '_Pages .page'),
                $firstPage = $('#' + tableId + '_Pages .firstPage'),
                $lastPage = $('#' + tableId + '_Pages .lastPage'),
                $selectPage = $('#' + tableId + '_Pages .selectPage'),
                $prevPage = $('#' + tableId + '_Pages .prevPage'),
                $nextPage = $('#' + tableId + '_Pages .nextPage');


            function change_page() {
                var my_options = $('#' + tableId).bootstrapTable('getOptions');
                var totalPages = my_options['totalPages'];
                var pageNumber = my_options['pageNumber'];

                this.current_page = pageNumber;
                this.totalPages = totalPages;
                $("#"+tableId+"_Pages .current_page").text(pageNumber);
                $("#"+tableId+"_Pages .total_page").text(totalPages);
            }
            $firstPage.click(function () {
                $('#' + tableId).bootstrapTable('selectPage', 1);
            });

            $('#' + tableId).on('page-change.bs.table', function (data) {
                // ...
                var my_options = $('#' + tableId).bootstrapTable('getOptions');
                var totalPages = my_options['totalPages'];
                var pageNumber = my_options['pageNumber'];

                $("#"+tableId+"_Pages .current_page").text(pageNumber);
                $("#"+tableId+"_Pages .total_page").text(totalPages);
                // $("#"+tableId+"_Pages .total_page").text(data.length);
            });

            $lastPage.click(function () {
                var my_options = $('#' + tableId).bootstrapTable('getOptions');
                var totalPages = my_options['totalPages'];
                $('#' + tableId).bootstrapTable('selectPage', totalPages);
                change_page();
            });
            $selectPage.click(function () {
                $('#' + tableId).bootstrapTable('selectPage', +$page.val());
                change_page();
            });
            $prevPage.click(function () {
                $('#' + tableId).bootstrapTable('prevPage');
                change_page();
            });
            $nextPage.click(function () {
                $('#' + tableId).bootstrapTable('nextPage');
                change_page();
            });
            return this;
        },
        /**
         * 向后台传递的自定义参数
         * @param param
         */
        setQueryParams: function (param) {
            this.queryParams = param;
        },
        /**
         * 设置分页方式：server 或者 client
         */
        setPaginationType: function (type) {
            this.options["sidePagination"] = type;
        },
        setCurrent_page: function (current_page) {
            this.options["current_page"]  = current_page;
        },
        getCurrent_page: function () {

        },
        setTotalPages: function (totalPages) {
            this.options["totalPages"] = totalPages;
        },
        getTotalPages: function () {

        },

        /**
         * 设置ajax post请求时候附带的参数
         */
        set: function (key, value) {
            if (typeof key == "object") {
                for (var i in key) {
                    if (typeof i == "function")
                        continue;
                    this.data[i] = key[i];
                }
            } else {
                this.data[key] = (typeof value == "undefined") ? $("#" + key).val() : value;
            }
            return this;
        },

        /**
         * 设置ajax post请求时候附带的参数
         */
        setData: function (data) {
            this.data = data;
            return this;
        },

        /**
         * 清空ajax post请求参数
         */
        clear: function () {
            this.data = {};
            return this;
        },

        /**
         * 刷新 bootstrap 表格
         * Refresh the remote server data,
         * you can set {silent: true} to refresh the data silently,
         * and set {url: newUrl} to change the url.
         * To supply query params specific to this request, set {query: {foo: 'bar'}}
         */
        refresh: function (parms) {
            if (typeof parms != "undefined") {
                this.btInstance.bootstrapTable('refresh', parms);
            } else {
                this.btInstance.bootstrapTable('refresh');
            }
        }
    };

    window.BSTable = BSTable;

}());