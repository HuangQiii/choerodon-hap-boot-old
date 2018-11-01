import { action, computed, observable } from 'mobx';
// import { dropByCacheKey, getCachingKeys } from '../components/cache/core/manager';
import CacheRoute, { dropByCacheKey, getCachingKeys } from 'react-router-cache-route'
import axios from 'axios';
import _ from 'lodash';
import { observer } from 'mobx-react';

// const PRE_MENUS = [
//   {
//     children: null,
//     expand: false,
//     functionCode: "HR_UNIT",
//     icon: "fa fa-cube",
//     id: 10020,
//     ischecked: null,
//     score: 10,
//     shortcutId: null,
//     text: "组织管理",
//     url: "hr/org_unit.html",
//   },
//   {
//     children: null,
//     expand: false,
//     functionCode: "HR_POSITION",
//     icon: "fa fa-user-secret",
//     id: 10022,
//     ischecked: null,
//     score: 20,
//     shortcutId: null,
//     text: "岗位管理",
//     url: "hr/position.html",
//   },
//   {
//     children: null,
//     expand: false,
//     functionCode: "HR_EMPLOYEE",
//     icon: "fa fa-user",
//     id: 10021,
//     ischecked: null,
//     score: 30,
//     shortcutId: null,
//     text: "员工管理",
//     url: "hr/employee.html",
//   },
// ];

const PRE_MENUS = [{
	"children": [{
		"children": null,
		"expand": false,
		"functionCode": "HR_UNIT",
		"icon": "fa fa-cube",
		"id": 10032,
		"ischecked": null,
		"score": 10,
		"shortcutId": null,
		"text": "组织管理",
		"url": "hr/org_unit.html"
	}, {
		"children": null,
		"expand": false,
		"functionCode": "HR_POSITION",
		"icon": "fa fa-user-secret",
		"id": 10034,
		"ischecked": null,
		"score": 20,
		"shortcutId": null,
		"text": "岗位管理",
		"url": "hr/position.html"
	}, {
		"children": null,
		"expand": false,
		"functionCode": "HR_EMPLOYEE",
		"icon": "fa fa-user",
		"id": 10033,
		"ischecked": null,
		"score": 30,
		"shortcutId": null,
		"text": "员工管理",
		"url": "hr/employee.html"
	}, {
		"children": null,
		"expand": false,
		"functionCode": "FND_COMPANY",
		"icon": "fa fa-cube",
		"id": 10035,
		"ischecked": null,
		"score": 40,
		"shortcutId": null,
		"text": "公司管理",
		"url": "fnd/company.html"
	}],
	"expand": false,
	"functionCode": "HR",
	"icon": "fa fa-cubes",
	"id": 10031,
	"ischecked": null,
	"score": 10,
	"shortcutId": null,
	"text": "组织架构",
	"url": null
}, {
	"children": [{
		"children": null,
		"expand": false,
		"functionCode": "SYS_REPORT_LIST",
		"icon": "fa fa-user",
		"id": 10077,
		"ischecked": null,
		"score": 10,
		"shortcutId": null,
		"text": "报表定义",
		"url": "rpt/report.html"
	}, {
		"children": null,
		"expand": false,
		"functionCode": "SYS_REPORT_DESIGN",
		"icon": "fa fa-user",
		"id": 10078,
		"ischecked": null,
		"score": 10,
		"shortcutId": null,
		"text": "报表设计",
		"url": "ureport/designer"
	}],
	"expand": false,
	"functionCode": "SYS_REPORT_MANAGE",
	"icon": "fa fa-user",
	"id": 10062,
	"ischecked": null,
	"score": 10,
	"shortcutId": null,
	"text": "报表管理",
	"url": null
}, {
	"children": [{
		"children": null,
		"expand": false,
		"functionCode": "ATTACH_CATEGORY",
		"icon": "fa fa-folder-open",
		"id": 10021,
		"ischecked": null,
		"score": 10,
		"shortcutId": null,
		"text": "目录管理",
		"url": "attach/sys_attach_category_manage.html"
	}, {
		"children": null,
		"expand": false,
		"functionCode": "ATTACH_FILE",
		"icon": "fa fa-file",
		"id": 10019,
		"ischecked": null,
		"score": 20,
		"shortcutId": null,
		"text": "文件管理",
		"url": "attach/sys_file_manage.html"
	}, {
		"children": null,
		"expand": false,
		"functionCode": "ATTACH_TEST",
		"icon": "fa fa-file",
		"id": 10020,
		"ischecked": null,
		"score": 30,
		"shortcutId": null,
		"text": "上传测试",
		"url": "attach/sys_attachment_create.html"
	}],
	"expand": false,
	"functionCode": "ATTACH",
	"icon": "fa fa-cloud-upload",
	"id": 10018,
	"ischecked": null,
	"score": 30,
	"shortcutId": null,
	"text": "附件管理",
	"url": null
}, {
	"children": [{
		"children": null,
		"expand": false,
		"functionCode": "JOB_DETAIL",
		"icon": "fa fa-tasks",
		"id": 10016,
		"ischecked": null,
		"score": 10,
		"shortcutId": null,
		"text": "任务明细",
		"url": "job/job_detail.html"
	}, {
		"children": null,
		"expand": false,
		"functionCode": "JOB_RUNNING_INFO",
		"icon": "fa fa-list-ul",
		"id": 10017,
		"ischecked": null,
		"score": 20,
		"shortcutId": null,
		"text": "执行记录",
		"url": "job/job_running_info.html"
	}],
	"expand": false,
	"functionCode": "JOB",
	"icon": "fa fa-clock-o",
	"id": 10015,
	"ischecked": null,
	"score": 40,
	"shortcutId": null,
	"text": "计划任务",
	"url": null
}, {
	"children": [{
		"children": null,
		"expand": false,
		"functionCode": "WFL_AUTO_DELEGATE",
		"icon": "fa fa-user-plus",
		"id": 10076,
		"ischecked": null,
		"score": 5,
		"shortcutId": null,
		"text": "自动转交配置",
		"url": "activiti/auto_delegate_config.html"
	}, {
		"children": null,
		"expand": false,
		"functionCode": "WFL_MY_START",
		"icon": "fa fa-share",
		"id": 10057,
		"ischecked": null,
		"score": 10,
		"shortcutId": null,
		"text": "我发起的流程",
		"url": "wfl/activiti/process_history_start.html"
	}, {
		"children": null,
		"expand": false,
		"functionCode": "WFL_MY_TASK",
		"icon": "fa fa-check-square-o",
		"id": 10074,
		"ischecked": null,
		"score": 10,
		"shortcutId": null,
		"text": "我的待办列表",
		"url": "activiti/my_task.html"
	}, {
		"children": null,
		"expand": false,
		"functionCode": "WFL_HISROTY",
		"icon": "fa fa-history",
		"id": 10075,
		"ischecked": null,
		"score": 20,
		"shortcutId": null,
		"text": "我参与的流程",
		"url": "activiti/process_history.html"
	}, {
		"children": null,
		"expand": false,
		"functionCode": "WFL_CARBON",
		"icon": "fa fa-reply",
		"id": 10056,
		"ischecked": null,
		"score": 30,
		"shortcutId": null,
		"text": "我的抄送流程",
		"url": "wfl/activiti/process_history_carbon.html"
	}],
	"expand": false,
	"functionCode": "WFL_OFFICE",
	"icon": "fa fa-user",
	"id": 10055,
	"ischecked": null,
	"score": 49,
	"shortcutId": null,
	"text": "工作流",
	"url": null
}, {
	"children": [{
		"children": null,
		"expand": false,
		"functionCode": "WFL_TEST",
		"icon": "fa fa-wrench",
		"id": 10029,
		"ischecked": null,
		"score": 10,
		"shortcutId": null,
		"text": "工作流测试",
		"url": "activiti/start_process_test.html"
	}, {
		"children": null,
		"expand": false,
		"functionCode": "WFL_VACATION_TEST",
		"icon": "fa fa-wrench",
		"id": 10048,
		"ischecked": null,
		"score": 10,
		"shortcutId": null,
		"text": "工作流测试(请假申请)",
		"url": "activiti/demo/vacation_list.html"
	}, {
		"children": null,
		"expand": false,
		"functionCode": "WFL_TASK",
		"icon": "fa fa-check-square-o",
		"id": 10027,
		"ischecked": null,
		"score": 20,
		"shortcutId": null,
		"text": "待办事项(管理员)",
		"url": "activiti/task_list.html"
	}, {
		"children": null,
		"expand": false,
		"functionCode": "WFL_MODEL",
		"icon": "fa fa-object-group",
		"id": 10028,
		"ischecked": null,
		"score": 40,
		"shortcutId": null,
		"text": "流程设计",
		"url": "activiti/models.html"
	}, {
		"children": null,
		"expand": false,
		"functionCode": "WFL_DEFINITION",
		"icon": "fa fa-share-alt",
		"id": 10030,
		"ischecked": null,
		"score": 50,
		"shortcutId": null,
		"text": "流程部署",
		"url": "activiti/process_definitions.html"
	}, {
		"children": null,
		"expand": false,
		"functionCode": "WFL_MONITOR",
		"icon": "fa fa-check-square-o",
		"id": 10042,
		"ischecked": null,
		"score": 60,
		"shortcutId": null,
		"text": "流程监控",
		"url": "activiti/process_monitor.html"
	}, {
		"children": null,
		"expand": false,
		"functionCode": "WFL_LOG",
		"icon": "fa fa-check-square-o",
		"id": 10043,
		"ischecked": null,
		"score": 60,
		"shortcutId": null,
		"text": "报错日志",
		"url": "activiti/execption.html"
	}, {
		"children": [{
			"children": null,
			"expand": false,
			"functionCode": "WFL_APV_STRATEGY",
			"icon": "fa fa-users",
			"id": 10045,
			"ischecked": null,
			"score": 10,
			"shortcutId": null,
			"text": "审批方式",
			"url": "activiti/approval/approve_strategy.html"
		}, {
			"children": null,
			"expand": false,
			"functionCode": "WFL_APV_TYPE",
			"icon": "fa fa-user-plus",
			"id": 10046,
			"ischecked": null,
			"score": 20,
			"shortcutId": null,
			"text": "审批规则",
			"url": "activiti/approval/approve_candidate_rule.html"
		}, {
			"children": null,
			"expand": false,
			"functionCode": "WFL_APV_RULE",
			"icon": "fa fa-gavel",
			"id": 10047,
			"ischecked": null,
			"score": 30,
			"shortcutId": null,
			"text": "审批权限",
			"url": "activiti/approval/business_rule_header.html"
		}],
		"expand": false,
		"functionCode": "WFL_APPROVE",
		"icon": "fa fa-cog",
		"id": 10044,
		"ischecked": null,
		"score": 90,
		"shortcutId": null,
		"text": "审批配置",
		"url": null
	}],
	"expand": false,
	"functionCode": "WFL",
	"icon": "fa fa-sitemap",
	"id": 10026,
	"ischecked": null,
	"score": 50,
	"shortcutId": null,
	"text": "流程管理",
	"url": null
}, {
	"children": [{
		"children": null,
		"expand": false,
		"functionCode": "IF_CONFIG",
		"icon": "fa fa-share-alt-square",
		"id": 10039,
		"ischecked": null,
		"score": 10,
		"shortcutId": null,
		"text": "接口定义",
		"url": "intergration/sys_interface_header.html"
	}, {
		"children": null,
		"expand": false,
		"functionCode": "IF_INVOKE",
		"icon": "fa fa-bar-chart",
		"id": 10040,
		"ischecked": null,
		"score": 20,
		"shortcutId": null,
		"text": "调用记录",
		"url": "intergration/sys_interface_invoke.html"
	}, {
		"children": null,
		"expand": false,
		"functionCode": "IF_CLIENT",
		"icon": "fa fa-laptop",
		"id": 10049,
		"ischecked": null,
		"score": 30,
		"shortcutId": null,
		"text": "客户端管理",
		"url": "sys/sys_oauth_client_details.html"
	}, {
		"children": null,
		"expand": false,
		"functionCode": "IF_TOKEN",
		"icon": "fa fa-lock",
		"id": 10050,
		"ischecked": null,
		"score": 40,
		"shortcutId": null,
		"text": "授权管理",
		"url": "sys/sys_token_logs.html"
	}],
	"expand": false,
	"functionCode": "IF",
	"icon": "fa fa-plug",
	"id": 10038,
	"ischecked": null,
	"score": 80,
	"shortcutId": null,
	"text": "接口管理",
	"url": null
}, {
	"children": [{
		"children": null,
		"expand": false,
		"functionCode": "API_SERVER",
		"icon": "fa fa-registered",
		"id": 10065,
		"ischecked": null,
		"score": 5,
		"shortcutId": null,
		"text": "服务注册",
		"url": "gateway/api_server.html"
	}, {
		"children": null,
		"expand": false,
		"functionCode": "API_APPLICATION",
		"icon": "fa fa-th-large",
		"id": 10066,
		"ischecked": null,
		"score": 10,
		"shortcutId": null,
		"text": "应用管理",
		"url": "gateway/api_application.html"
	}, {
		"children": null,
		"expand": false,
		"functionCode": "API_INVOKE",
		"icon": "fa fa-book",
		"id": 10067,
		"ischecked": null,
		"score": 15,
		"shortcutId": null,
		"text": "调用记录",
		"url": "gateway/api_invoke_record.html"
	}],
	"expand": false,
	"functionCode": "API",
	"icon": "fa fa-server",
	"id": 10064,
	"ischecked": null,
	"score": 90,
	"shortcutId": null,
	"text": "服务管理",
	"url": null
}, {
	"children": [{
		"children": null,
		"expand": false,
		"functionCode": "TASK_DETAIL",
		"icon": "fa fa-life-saver",
		"id": 10070,
		"ischecked": null,
		"score": 10,
		"shortcutId": null,
		"text": "任务管理",
		"url": "task/task_details.html"
	}, {
		"children": null,
		"expand": false,
		"functionCode": "TASK_EXECUTE",
		"icon": "fa fa-terminal",
		"id": 10071,
		"ischecked": null,
		"score": 15,
		"shortcutId": null,
		"text": "任务执行",
		"url": "task/task_execute.html"
	}, {
		"children": null,
		"expand": false,
		"functionCode": "TASK_EXECUTION",
		"icon": "fa fa-archive",
		"id": 10072,
		"ischecked": null,
		"score": 20,
		"shortcutId": null,
		"text": "执行记录",
		"url": "task/task_execution.html"
	}, {
		"children": null,
		"expand": false,
		"functionCode": "TASK_ADMIN_EXECUTION",
		"icon": "fa fa-archive",
		"id": 10073,
		"ischecked": null,
		"score": 25,
		"shortcutId": null,
		"text": "执行记录(管理员)",
		"url": "sys/task/execution/admin/task_execution.html"
	}],
	"expand": false,
	"functionCode": "TASK",
	"icon": "fa fa-tasks",
	"id": 10069,
	"ischecked": null,
	"score": 95,
	"shortcutId": null,
	"text": "任务管理",
	"url": null
}, {
	"children": [{
		"children": null,
		"expand": false,
		"functionCode": "SYS_CONFIG",
		"icon": "fa fa-cog",
		"id": 10007,
		"ischecked": null,
		"score": 6,
		"shortcutId": null,
		"text": "系统配置",
		"url": "sys/sys_config.html"
	}, {
		"children": [{
			"children": null,
			"expand": false,
			"functionCode": "ACCOUNT_USER",
			"icon": "fa fa-user-plus",
			"id": 10009,
			"ischecked": null,
			"score": 10,
			"shortcutId": null,
			"text": "用户管理",
			"url": "sys/sys_user.html"
		}, {
			"children": null,
			"expand": false,
			"functionCode": "ACCOUNT_ROLE",
			"icon": "fa fa-users",
			"id": 10121,
			"ischecked": null,
			"score": 20,
			"shortcutId": null,
			"text": "角色管理",
			"url": "sys/sys_role.html"
		}],
		"expand": false,
		"functionCode": "ACCOUNT",
		"icon": "fa fa-user",
		"id": 10008,
		"ischecked": null,
		"score": 10,
		"shortcutId": null,
		"text": "账户管理",
		"url": null
	}, {
		"children": [{
			"children": null,
			"expand": false,
			"functionCode": "FUNCTION_ADD",
			"icon": "fa fa-puzzle-piece",
			"id": 10012,
			"ischecked": null,
			"score": 10,
			"shortcutId": null,
			"text": "功能维护",
			"url": "sys/sys_function.html"
		}, {
			"children": null,
			"expand": false,
			"functionCode": "SYS_RESOURCE",
			"icon": "fa fa-share-alt-square",
			"id": 10013,
			"ischecked": null,
			"score": 20,
			"shortcutId": null,
			"text": "资源管理",
			"url": "sys/sys_resource.html"
		}, {
			"children": null,
			"expand": false,
			"functionCode": "FUNCTION_ASSIGN",
			"icon": "fa fa-list",
			"id": 10014,
			"ischecked": null,
			"score": 90,
			"shortcutId": null,
			"text": "功能分配",
			"url": "sys/sys_role_function.html"
		}],
		"expand": false,
		"functionCode": "FUNCTION",
		"icon": "fa fa-plug",
		"id": 10011,
		"ischecked": null,
		"score": 10,
		"shortcutId": null,
		"text": "功能管理",
		"url": null
	}, {
		"children": null,
		"expand": false,
		"functionCode": "SYS_METRICS",
		"icon": "fa fa-heartbeat",
		"id": 10041,
		"ischecked": null,
		"score": 10,
		"shortcutId": null,
		"text": "系统指标",
		"url": "sys/sys_detail_metrics.html"
	}, {
		"children": null,
		"expand": false,
		"functionCode": "FORM",
		"icon": "fa fa-newspaper-o",
		"id": 10063,
		"ischecked": null,
		"score": 10,
		"shortcutId": null,
		"text": "表单管理",
		"url": "sys/ui-builder.html"
	}, {
		"children": null,
		"expand": false,
		"functionCode": "HOTKEY",
		"icon": "fa fa-keyboard-o",
		"id": 10068,
		"ischecked": null,
		"score": 10,
		"shortcutId": null,
		"text": "热键配置",
		"url": "sys/sys_hotkey.html"
	}, {
		"children": null,
		"expand": false,
		"functionCode": "SYS_DASHBOARD",
		"icon": "fa fa-dashboard",
		"id": 10036,
		"ischecked": null,
		"score": 15,
		"shortcutId": null,
		"text": "仪表盘配置",
		"url": "sys/sys_dashboard.html"
	}, {
		"children": null,
		"expand": false,
		"functionCode": "PROMPT",
		"icon": "fa fa-edit",
		"id": 10002,
		"ischecked": null,
		"score": 20,
		"shortcutId": null,
		"text": "描述维护",
		"url": "sys/sys_prompt.html"
	}, {
		"children": null,
		"expand": false,
		"functionCode": "CODE",
		"icon": "fa fa-code",
		"id": 10003,
		"ischecked": null,
		"score": 30,
		"shortcutId": null,
		"text": "代码维护",
		"url": "sys/sys_code.html"
	}, {
		"children": null,
		"expand": false,
		"functionCode": "LOV",
		"icon": "fa fa-search",
		"id": 10004,
		"ischecked": null,
		"score": 40,
		"shortcutId": null,
		"text": "LOV定义",
		"url": "sys/sys_lov.html"
	}, {
		"children": null,
		"expand": false,
		"functionCode": "SYS_CODE_RULE",
		"icon": "fa fa-cube",
		"id": 10058,
		"ischecked": null,
		"score": 45,
		"shortcutId": null,
		"text": "编码规则",
		"url": "code/rule/code_rules.html"
	}, {
		"children": null,
		"expand": false,
		"functionCode": "LANGUAGE",
		"icon": "fa fa-flag",
		"id": 10005,
		"ischecked": null,
		"score": 50,
		"shortcutId": null,
		"text": "语言维护",
		"url": "sys/sys_language.html"
	}, {
		"children": null,
		"expand": false,
		"functionCode": "PROFILE",
		"icon": "fa fa-cogs",
		"id": 10006,
		"ischecked": null,
		"score": 50,
		"shortcutId": null,
		"text": "配置维护",
		"url": "sys/sys_profile.html"
	}, {
		"children": [{
			"children": null,
			"expand": false,
			"functionCode": "EMAIL_ACCOUNT",
			"icon": "fa fa-envelope",
			"id": 10023,
			"ischecked": null,
			"score": 10,
			"shortcutId": null,
			"text": "邮件账户",
			"url": "mail/sys_message_email_config.html"
		}, {
			"children": null,
			"expand": false,
			"functionCode": "EMAIL_TEMPLATE",
			"icon": "fa fa-envelope",
			"id": 10024,
			"ischecked": null,
			"score": 20,
			"shortcutId": null,
			"text": "邮件模板",
			"url": "mail/sys_message_template.html"
		}, {
			"children": null,
			"expand": false,
			"functionCode": "EMAIL_TEST",
			"icon": "fa fa-envelope",
			"id": 10025,
			"ischecked": null,
			"score": 30,
			"shortcutId": null,
			"text": "邮件测试",
			"url": "mail/sys_message_test.html"
		}, {
			"children": null,
			"expand": false,
			"functionCode": "EMAIL_STATUS",
			"icon": "fa fa-envelope",
			"id": 10037,
			"ischecked": null,
			"score": 40,
			"shortcutId": null,
			"text": "邮件状态查询",
			"url": "mail/message_status.html"
		}],
		"expand": false,
		"functionCode": "EMAIL",
		"icon": "fa fa-envelope",
		"id": 10022,
		"ischecked": null,
		"score": 80,
		"shortcutId": null,
		"text": "邮件",
		"url": null
	}, {
		"children": [{
			"children": null,
			"expand": false,
			"functionCode": "FLEX_FIELD_MODEL",
			"icon": "fa fa-object-ungroup",
			"id": 10052,
			"ischecked": null,
			"score": 10,
			"shortcutId": null,
			"text": "弹性域模型",
			"url": "flexfield/flex_model.html"
		}, {
			"children": null,
			"expand": false,
			"functionCode": "FLEX_FIELD_RULE_SET",
			"icon": "fa fa-object-ungroup",
			"id": 10053,
			"ischecked": null,
			"score": 20,
			"shortcutId": null,
			"text": "弹性域规则",
			"url": "flexfield/flex_rule_set.html"
		}, {
			"children": null,
			"expand": false,
			"functionCode": "FLEX_FIELD_DEMO",
			"icon": "fa fa-object-ungroup",
			"id": 10054,
			"ischecked": null,
			"score": 30,
			"shortcutId": null,
			"text": "弹性域示例",
			"url": "demo/flexfield.html"
		}],
		"expand": false,
		"functionCode": "FLEX_FIELD",
		"icon": "fa fa-object-group",
		"id": 10051,
		"ischecked": null,
		"score": 90,
		"shortcutId": null,
		"text": "弹性域",
		"url": null
	}, {
		"children": [{
			"children": null,
			"expand": false,
			"functionCode": "DATA_PERMISSION_RULE",
			"icon": "fa fa-user-times",
			"id": 10060,
			"ischecked": null,
			"score": 10,
			"shortcutId": null,
			"text": "屏蔽规则管理",
			"url": "permission/data_permission_rule.html"
		}, {
			"children": null,
			"expand": false,
			"functionCode": "DATA_PERMISSION_TABLE",
			"icon": "fa fa-user-times",
			"id": 10061,
			"ischecked": null,
			"score": 20,
			"shortcutId": null,
			"text": "屏蔽权限设置",
			"url": "permission/data_permission_table.html"
		}],
		"expand": false,
		"functionCode": "DATA_PERMISSION",
		"icon": "fa fa-user-times",
		"id": 10059,
		"ischecked": null,
		"score": 100,
		"shortcutId": null,
		"text": "数据屏蔽",
		"url": null
	}, {
		"children": null,
		"expand": false,
		"functionCode": "TEST_1",
		"icon": "fa fa-user",
		"id": 10080,
		"ischecked": null,
		"score": 101,
		"shortcutId": null,
		"text": "测试二级菜单1",
		"url": null
	}, {
		"children": null,
		"expand": false,
		"functionCode": "TEST_2",
		"icon": "fa fa-user",
		"id": 10081,
		"ischecked": null,
		"score": 102,
		"shortcutId": null,
		"text": "测试二级菜单2",
		"url": null
	}, {
		"children": null,
		"expand": false,
		"functionCode": "TEST_3",
		"icon": "fa fa-user",
		"id": 10082,
		"ischecked": null,
		"score": 103,
		"shortcutId": null,
		"text": "测试二级菜单3",
		"url": null
	}, {
		"children": null,
		"expand": false,
		"functionCode": "TEST_4",
		"icon": "fa fa-user",
		"id": 10083,
		"ischecked": null,
		"score": 104,
		"shortcutId": null,
		"text": "测试二级菜单4",
		"url": null
	}, {
		"children": null,
		"expand": false,
		"functionCode": "TEST_5",
		"icon": "fa fa-user",
		"id": 10085,
		"ischecked": null,
		"score": 105,
		"shortcutId": null,
		"text": "测试二级菜单5",
		"url": null
	}, {
		"children": null,
		"expand": false,
		"functionCode": "TEST_6",
		"icon": "fa fa-user",
		"id": 10084,
		"ischecked": null,
		"score": 106,
		"shortcutId": null,
		"text": "测试二级菜单6",
		"url": null
	}],
	"expand": false,
	"functionCode": "SYSTEM",
	"icon": "fa fa-gears",
	"id": 10001,
	"ischecked": null,
	"score": 99,
	"shortcutId": null,
	"text": "系统管理",
	"url": null
}];


class MenuStore {
  @observable collapsed = false;

  @observable menus = [];

  @observable treeNodeMenus = [];

  @observable tabs = [];

  @observable openKeys = [];

  @observable selectedKeys = [];

  @observable activeMenu = {};

  @observable expanded = false;

  @computed
  get getMenus() {
    return this.menus.slice();
  }

  @computed
  get getTabs() {
    return this.tabs.slice();
  }

  @computed
  get getSelectedKeys() {
    return this.selectedKeys.slice();
  }

  @action
  setCollapsed(data) {
    this.collapsed = data;
  }

  @action
  setTabs(data) {
    this.tabs = data;
  }

  @action
  setTreeNodeMenus(data) {
    this.treeNodeMenus = data;
  }

  @action
  setMenus(data) {
    this.menus = data;
  }

  @action
  setActiveMenu(data) {
    this.activeMenu = data;
  }

  @action
  setOpenKeys(data) {
    this.openKeys = data;
  }

  @action
  setSelectedKeys(data) {
    this.selectedKeys = data;
  }

  @action
  setMenuExpanded(data) {
    this.expanded = data;
  }

  @action
  closeTab(value, prop = 'functionCode') {
    const tabs = this.tabs;
    _.remove(tabs, v => v[prop] === value);
    this.setTabs(tabs);
  }

  @action
  clearCacheByCacheKey(cacheKey) {
    dropByCacheKey(cacheKey);
  }

  @action
  closeTabAndClearCacheByCacheKey(obj) {
    let val;
    let prop;
    if (obj.symbol === '1') {
      val = obj.url;
      prop = 'url';
    } else {
      val = obj.functionCode;
      prop = 'functionCode';
    }
    this.closeTab(val, prop);
    console.log(getCachingKeys());
    dropByCacheKey(obj.functionCode);
    console.log(getCachingKeys());
  }

  getSubmenuByCode(code) {
    const menus = this.getMenus;
    let target = {};
    menus.forEach(submenu => {
      if (submenu && submenu.children.length) {
        submenu.children.forEach(menuList => {
          if (menuList.functionCode === code) {
            target = submenu;
          }
        });
      }
    });
    return target;
  }

  getPathById(functionCode, tree, isReact, cb, noMatchCb = () => {}) {
    const key = isReact ? 'url' : 'functionCode';
    const path = [];
    let targetNode;
    try {
      function getNodePath(node) {
        path.push(node.functionCode);

        if (node[key] === functionCode) {
          targetNode = node;
          throw ("Get Target Node!");
        }
        if (node.children && node.children.length > 0) {
          for (let i = 0; i < node.children.length; i++) {
            getNodePath(node.children[i]);
          }
          path.pop();
        }
        else {
          path.pop();
        }
      }
      tree.forEach(v => getNodePath(v));
      noMatchCb();
    } catch (e) {
      cb(path, targetNode);
    }
  };

  getTreeNodeMenus(tree, cb, key = 'functionCode') {
    const treeNodes = [];
    try {
      function getNodePath(node) {
        if (!node.children) {
          treeNodes.push(node);
        }

        if (node.children && node.children.length > 0) {
          for (let i = 0; i < node.children.length; i++) {
            getNodePath(node.children[i]);
          }
        }
      }
      tree.forEach(v => getNodePath(v));
      cb(treeNodes);
    } catch (e) {
    }
  };

  getMenuItemByCode(code) {
    const menus = this.getMenus;
    let target = {};
    menus.forEach(submenu => {
      if (submenu && submenu.children.length) {
        submenu.children.forEach(menuList => {
          if (menuList.functionCode === code) {
            target = menuList;
          }
        });
      }
    });
    return target;
  }

  getNextTab(tab) {
    const tabs = this.getTabs;
    const len = tabs.length;
    const idx = tabs.findIndex(t => t.functionCode === tab.functionCode);
    if (idx === 0 && len === 1) return {};
    if (idx === 0 && len > 1) return tabs[1];
    return tabs[idx - 1];
  }

  loadMenus() {
    return axios.get('/sys/function/menus', {
        "Access-Control-Allow-Origin": "*",
    }).then((res) => {
      this.setMenus(res.data);
      // resolve(res.data);
    })
    // return new Promise((resolve, reject) => {
    //   this.setMenus(PRE_MENUS);
    //   resolve(PRE_MENUS);
    // })
    // const options = {
    //   method: 'GET',
    //   headers: {
    //     'contentType': 'application/json; charset=utf-8',
    //     'Access-Control-Allow-Origin': '*',
    //   },
    //   url: 'http://localhost:8080/sys/function/menus',
    // };
    // return axios(options)
      // .then((res) => {
      //   this.setMenus(res[0].children);
      // });
  }
}

const menuStore = new MenuStore();
export default menuStore;
