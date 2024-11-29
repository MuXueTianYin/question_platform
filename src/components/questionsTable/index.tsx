"use client"
import type {ActionType, ProColumns} from '@ant-design/pro-components';
import {ProTable} from '@ant-design/pro-components';
import React, {useRef, useState} from 'react';
import {listQuestionByPageUsingPost, listQuestionVoByPageUsingPost} from "@/api/questionController";
import TagList from "@/components/TagList/page";
import "./index.css"


interface Props {
  defaultQuestionList: API.QuestionVO[];
  defaultTotal:number
}


/**
 * 题目列表页面
 *
 * @constructor
 */
const QuestionAdminPage = (props:Props) => {
  const actionRef = useRef<ActionType>();

  const {defaultQuestionList,defaultTotal = []} = props;

  const [questionList, setQuestionList] = useState<API.QuestionVO[]>(defaultQuestionList);
  const [total, setTotal] = useState<number>(defaultTotal);

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
          dataSource={questionList}
          request={async (params, sort, filter) => {
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
export default QuestionAdminPage;
