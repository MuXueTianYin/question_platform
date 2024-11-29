"use server";
import styles from "./page.module.css";
import Title from "antd/es/typography/Title";
import {listQuestionBankVoByPageUsingPost} from "@/api/questionBankController";
import {listQuestionVoByPageUsingPost} from "@/api/questionController";
import QuestionBankList from "@/components/QuestionBankList/page";
import QuestionList from "@/components/QuestionList/page";
import {Flex} from "antd";
import Link from "next/link";


export default async function Home() {

    let questionBankList = [];
    let questionList = [];

    try {
        const questionBankRes = await listQuestionBankVoByPageUsingPost({
            pageSize: 12,
            sortField: 'createTime',
            sortOrder: 'descend',
        });
        questionBankList = questionBankRes.data.records ?? [];
    } catch (e) {
        // @ts-ignore
        console.error('获取题库列表失败，' + e.message);
    }
    try {
        const questionListRes = await listQuestionVoByPageUsingPost({
            pageSize: 12,
            sortField: 'createTime',
            sortOrder: 'descend',
        })
        questionList = questionListRes.data.records ?? [];
    } catch (e) {
        // @ts-ignore
        console.error('获取题目列表失败，' + e.message);
    }


  return (
      <div className={styles.page}>
          <Flex justify="space-between" align="middle">
              <Title level={3}>
                  最新题库
              </Title>
              <Link href={"/banks"}>查看更多</Link>
          </Flex>
          <QuestionBankList  questionBankList={questionBankList}/>
          <Flex justify="space-between" align="middle">
              <Title level={3}>
                  最新题目
              </Title>
              <Link href={"/questions"}>查看更多</Link>
          </Flex>
          <QuestionList questionList={questionList}></QuestionList>
      </div>
  );
}
