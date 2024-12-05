"use server";
import styles from "./page.module.css";
import {getQuestionBankVoByIdUsingGet} from "@/api/questionBankController";
import {Avatar, Button, Card} from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import Meta from "antd/es/card/Meta";
import Title from "antd/es/typography/Title";
import QuestionList from "@/components/QuestionList";


/**
 * 题库详情页
 *
 *
 */


export default async function BankDetailPage({params}) {
    const {questionBankId} = params
    let bank: API.QuestionBankVO

    // 题库数量不多可以全量获取
    const pageSize = 200;
    try {
        const response = await getQuestionBankVoByIdUsingGet({
            id: questionBankId,
            pageSize,
            needQueryQuestionList: true
        });
        bank = response.data;
        // console.log(bank)
    } catch (e) {
        // @ts-ignore
        console.error('获取题库列表失败，' + e.message);
    }
    //错误处理
    if (!bank) {
        return <div>获取题库详情失败，请刷新重试</div>
    }
    let firstQuestionId
    if (bank.questionPage?.records && bank.questionPage?.records.length > 0) {
        firstQuestionId = bank.questionPage?.records[0].id
    }

    return (
        <div className={styles.page}>
            <Card>
                <Meta
                    avatar={<Avatar src={bank.picture}/>}
                    title={
                        <Title level={3}>{bank.title}</Title>
                    }
                    description={
                        <>
                            <Paragraph
                                type="secondary"
                            >
                                {bank.description}
                            </Paragraph>
                            <Button type={"default"}
                                    href={`/bank/${questionBankId}/question/${firstQuestionId}`}
                                    target={'_blank'}
                                    disabled={!firstQuestionId}
                            >
                                开始刷题
                            </Button>
                        </>
                    }
                >
                </Meta>
            </Card>
            <div style={{marginBottom: 16}}></div>
            <QuestionList questionList={bank.questionPage?.records || []} questionBankId={questionBankId}
                          cardTitle={`题目总数(${bank.questionPage?.total || '0'})`}/>
        </div>
    );
}
