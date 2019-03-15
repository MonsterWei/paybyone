$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/sales/list',
        datatype: "json",
        colModel: [			
			{ label: 'salesNumber', name: 'salesNumber', index: 'sales_number', width: 50, key: true },
			{ label: '', name: 'salesOrderNumber', index: 'sales_order_number', width: 80 }, 			
			{ label: '', name: 'salesTime', index: 'sales_time', width: 80 }, 			
			{ label: '', name: 'amoutOfSalesorder', index: 'amout_of_salesorder', width: 80 }, 			
			{ label: '', name: 'numberOfSalescard', index: 'number_of_salescard', width: 80 }, 			
			{ label: '', name: 'exchhangedAmount', index: 'exchhanged_amount', width: 80 }			
        ],
		viewrecords: true,
        height: 385,
        rowNum: 10,
		rowList : [10,30,50],
        rownumbers: true, 
        rownumWidth: 25, 
        autowidth:true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader : {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames : {
            page:"page", 
            rows:"limit", 
            order: "order"
        },
        gridComplete:function(){
        	//隐藏grid底部滚动条
        	$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
        }
    });
});

var vm = new Vue({
	el:'#rrapp',
	data:{
		showList: true,
		title: null,
		sales: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.sales = {};
		},
		update: function (event) {
			var salesNumber = getSelectedRow();
			if(salesNumber == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(salesNumber)
		},
		saveOrUpdate: function (event) {
			var url = vm.sales.salesNumber == null ? "sys/sales/save" : "sys/sales/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.sales),
			    success: function(r){
			    	if(r.code === 0){
						alert('操作成功', function(index){
							vm.reload();
						});
					}else{
						alert(r.msg);
					}
				}
			});
		},
		del: function (event) {
			var salesNumbers = getSelectedRows();
			if(salesNumbers == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: baseURL + "sys/sales/delete",
                    contentType: "application/json",
				    data: JSON.stringify(salesNumbers),
				    success: function(r){
						if(r.code == 0){
							alert('操作成功', function(index){
								$("#jqGrid").trigger("reloadGrid");
							});
						}else{
							alert(r.msg);
						}
					}
				});
			});
		},
		getInfo: function(salesNumber){
			$.get(baseURL + "sys/sales/info/"+salesNumber, function(r){
                vm.sales = r.sales;
            });
		},
		reload: function (event) {
			vm.showList = true;
			var page = $("#jqGrid").jqGrid('getGridParam','page');
			$("#jqGrid").jqGrid('setGridParam',{ 
                page:page
            }).trigger("reloadGrid");
		}
	}
});