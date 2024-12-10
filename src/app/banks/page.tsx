"use server";
import styles from "./page.module.css";
import Title from "antd/es/typography/Title";
import {listQuestionBankVoByPageUsingPost} from "@/api/questionBankController";
import QuestionBankList from "@/components/QuestionBankList";
import {Flex} from "antd";


export default async function banksPage() {

    let questionBankList = [];
    // 题库数量不多可以全量获取
    const pageSize = 200;
    try {
        const questionBankRes = await listQuestionBankVoByPageUsingPost({
            pageSize,
            sortField: 'createTime',
            sortOrder: 'descend',
        });
        questionBankList = questionBankRes.data.records ?? [];
    } catch (e) {
        // @ts-ignore
        console.error('获取题库列表失败，' + e.message);
    }


  return (
      <div className={styles.page+' max-width-content'}>
          <Flex justify="space-between" align="middle">
              <Title level={3}>
                  题库大全
              </Title>
          </Flex>
          <QuestionBankList  questionBankList={questionBankList}/>
      </div>
  );
}
