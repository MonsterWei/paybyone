$(function () {
    $("#jqGrid").jqGrid({
        url: baseURL + 'sys/agent/list',
        datatype: "json",
        colModel: [			
			{ label: 'agentId', name: 'agentId', index: 'agent_id', width: 50, key: true },
			{ label: '', name: 'agentName', index: 'agent_name', width: 80 }, 			
			{ label: '', name: 'agentDiscount', index: 'agent_discount', width: 80 }, 			
			{ label: '', name: 'agentChangemoney', index: 'agent_changemoney', width: 80 }, 			
			{ label: '', name: 'agentSolemoney', index: 'agent_solemoney', width: 80 }, 			
			{ label: '', name: 'agentStatus', index: 'agent_status', width: 80 }, 			
			{ label: '', name: 'agentLinkman', index: 'agent_linkman', width: 80 }, 			
			{ label: '', name: 'agentPassword', index: 'agent_password', width: 80 }, 			
			{ label: '', name: 'agentPhone', index: 'agent_phone', width: 80 }, 			
			{ label: '', name: 'agentEmail', index: 'agent_email', width: 80 }, 			
			{ label: '', name: 'agentAddress', index: 'agent_address', width: 80 }, 			
			{ label: '', name: 'agentCreatetime', index: 'agent_createtime', width: 80 }, 			
			{ label: '', name: 'agentModifytime', index: 'agent_modifytime', width: 80 }			
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
		agent: {}
	},
	methods: {
		query: function () {
			vm.reload();
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.agent = {};
		},
		update: function (event) {
			var agentId = getSelectedRow();
			if(agentId == null){
				return ;
			}
			vm.showList = false;
            vm.title = "修改";
            
            vm.getInfo(agentId)
		},
		saveOrUpdate: function (event) {
			var url = vm.agent.agentId == null ? "sys/agent/save" : "sys/agent/update";
			$.ajax({
				type: "POST",
			    url: baseURL + url,
                contentType: "application/json",
			    data: JSON.stringify(vm.agent),
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
			var agentIds = getSelectedRows();
			if(agentIds == null){
				return ;
			}
			
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: baseURL + "sys/agent/delete",
                    contentType: "application/json",
				    data: JSON.stringify(agentIds),
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
		getInfo: function(agentId){
			$.get(baseURL + "sys/agent/info/"+agentId, function(r){
                vm.agent = r.agent;
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