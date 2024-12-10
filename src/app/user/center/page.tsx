"use server";
import Title from "antd/es/typography/Title";
import {Flex} from "antd";
import {listQuestionVoByPageUsingPost} from "@/api/questionController";
import QuestionsTable from "@/components/questionsTable";
import styles from "./page.module.css";


export default async function QuestionsPage({searchParams}) {

  let questionList = [];

  let total = 0;

  const { q: searchText } = searchParams;

  try {
    const questionListRes = await listQuestionVoByPageUsingPost({
      title: searchText,
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
      <div className={styles.page+' max-width-content'}>
        <Flex justify="space-between" align="middle">
          <Title level={3}>
            题库大全
          </Title>
        </Flex>
        <QuestionsTable  defaultQuestionList={questionList} defaultTotal={total} defaultSearchParams={
          {title: searchText}
        }  />
      </div>
  );
}
