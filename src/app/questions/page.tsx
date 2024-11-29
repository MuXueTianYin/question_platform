"use server";
import styles from "./page.module.css";
import Title from "antd/es/typography/Title";
import {Flex} from "antd";
import {listQuestionVoByPageUsingPost} from "@/api/questionController";
import QuestionsTable from "@/components/questionsTable";


export default async function banksPage() {

  let questionList = [];

  let total = 0;

  try {
    const questionListRes = await listQuestionVoByPageUsingPost({
      pageSize: 12,
      sortField: 'createTime',
      sortOrder: 'descend',
    })
    questionList = questionListRes.data.records ?? [];
    total = Number(questionListRes.data.total) || 0
  } catch (e) {
    // @ts-ignore
    console.error('获取题目列表失败，' + e.message);
  }


  return (
      <div className={styles.page}>
        <Flex justify="space-between" align="middle">
          <Title level={3}>
            题库大全
          </Title>
        </Flex>
        <QuestionsTable  defaultQuestionList={questionList} defaultTotal={total}/>
      </div>
  );
}
