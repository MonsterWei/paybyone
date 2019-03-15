$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/parities/list',
        datatype: "json",
        colModel: [			
			{ label: 'paritiesId', name: 'paritiesId', index: 'parities_id', width: 50, key: true },
			{ label: '', name: 'paritiesCurrency', index: 'parities_currency', width: 80 }, 			
			{ label: '', name: 'paritiesYesterday', index: 'parities_yesterday', width: 80 }, 			
			{ label: '', name: 'paritiesHandmade', index: 'parities_handmade', width: 80 }			
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
		parities: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.parities = {};
		},
		update: function (event) {
			var paritiesId = getSelectedRow();
			if(paritiesId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(paritiesId)
		},
		saveOrUpdate: function (event) {
			var url = vm.parities.paritiesId == null ? "sys/parities/save" : "sys/parities/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.parities),
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
			var paritiesIds = getSelectedRows();
			if(paritiesIds == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: baseURL + "sys/parities/delete",
                    contentType: "application/json",
				    data: JSON.stringify(paritiesIds),
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
		getInfo: function(paritiesId){
			$.get(baseURL + "sys/parities/info/"+paritiesId, function(r){
                vm.parities = r.parities;
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