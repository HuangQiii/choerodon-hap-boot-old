import React from 'react';
import { DataSet, Table, TextField, NumberField } from 'choerodon-hap-ui';

const ds = new DataSet({
  queryUrl: '/dataset/users/query',
  submitUrl: '/table.mock',
  fields: [
    { name: 'userName', type: 'string', label: '用户名' },
    { name: 'employeeCode', type: 'string', label: '员工编码' },
    { name: 'employeeName', type: 'string', label: '员工姓名' },
    { name: 'email', type: 'string', label: '邮箱' },
    { name: 'phone', type: 'string', label: '电话' },
  ],
});
const { Column } = Table;

class Grid extends React.Component {
  render() {
    return (
      <div>
        <button type="button" onClick={() => ds.create()}>新增</button>
        <button type="button" onClick={() => ds.query()}>查询</button>
        <button type="button" onClick={() => ds.remove(ds.selected)}>删除</button>
        <button type="button" onClick={() => ds.pre()}>上一条</button>
        <button type="button" onClick={() => ds.next()}>下一条</button>
        <button type="button" onClick={() => ds.submit()}>保存</button>
        <Table dataSet={ds}>
          <Column name="userName" editor={<TextField />} sortable />
          <Column name="employeeCode" editor={<TextField />} sortable />
          <Column name="employeeName" editor={<TextField />} sortable />
          <Column name="email" editor={<TextField />} sortable />
          <Column name="phone" editor={<TextField />} sortable />
        </Table>
      </div>
    );
  }
}

export default Grid;
