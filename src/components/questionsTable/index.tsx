"use client"
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {ProTable} from '@ant-design/pro-components';
import React, {useRef, useState} from 'react';
import {listQuestionVoByPageUsingPost} from "@/api/questionController";
import TagList from "@/components/TagList";
import "./index.css"


interface Props {
  defaultQuestionList: API.QuestionVO[];
  defaultTotal:number;
  defaultSearchParams:API.QuestionBankQueryRequest
}


/**
 * 题目列表页面
 *
 * @constructor
 */
const QuestionTable = (props:Props) => {
  const actionRef = useRef<ActionType>();

  const {defaultQuestionList,defaultTotal = [],defaultSearchParams={}} = props;

  const [questionList, setQuestionList] = useState<API.QuestionVO[]>(defaultQuestionList);
  const [total, setTotal] = useState<number>(defaultTotal);
  const [init, setInit] = useState<boolean>(true);


  /**
   * 表格列配置
   */
  const columns: ProColumns<API.QuestionVO>[] = [
    {
      title: "标题",
      dataIndex: "title",
      valueType: "text",
    },
    {
      title: "标签",
      dataIndex: "tags",
      valueType: "select",
      fieldProps: {
        mode: "tags",
      },
      render: (_, record) => {
        const tagList = JSON.parse(record.tags || "[]");
        if (Array.isArray(tagList)) {
          return <TagList tagList={tagList} />;
        }
        return <div>{tagList}</div>;
      },
    },


  ];
  return (
    <div className={"question-table"}>
      <ProTable<API.QuestionVO>
          actionRef={actionRef}
          rowKey="key"
          search={{
            labelWidth: "auto",
          }}
          pagination={
            {
              pageSize:12,
              showTotal:(total)=>`共${total}条`,
              showSizeChanger:false,
              total,
            }
          }
          form={
            {
              initialValues:defaultSearchParams
            }
          }
          dataSource={questionList}
          request={async (params, sort, filter) => {
            // 首次请求
            if (init) {
              setInit(false);
              // 如果已有外层传来的默认数据，无需再次查询
              if (defaultQuestionList && defaultTotal) {
                return;
              }
            }
            const sortField = Object.keys(sort)?.[0] || 'createTime';
            const sortOrder = sort?.[sortField] || 'descend';
            const { data, code } = await listQuestionVoByPageUsingPost({
              ...params,
              sortField,
              sortOrder,
              ...filter,
            } as API.QuestionQueryRequest);
            const newData = data?.records || []
            const newTotal = Number(data?.total) || 0
            setQuestionList(newData)
            setTotal(newTotal)
            return {
              success: code === 0,
              data: newData,
              total: newTotal,
            };
          }}
          columns={columns}
      />
    </div>
  );
};
export default QuestionTable;
