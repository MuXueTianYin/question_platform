"use client"
import List from "antd/lib/list";
import styles from "./page.module.css";
import {Card} from "antd";
import TagList from "@/components/TagList/page";
import Link from "next/link";

interface Props {
    questionList: API.QuestionVO[];
}

/**
 * 题目组件
 * @param props
 * @constructor
 */
export default function QuestionList(props: Props): JSX.Element {

    const {questionList = []} = props;

    return (
        <div className={styles.page}>
            {
                <Card >
                    <List
                        dataSource={questionList}
                        renderItem={(item,index) => (
                            <List.Item extra={<TagList tagList={item.tagList}/> }>
                                <List.Item.Meta title={
                                    <Link href={`/questions/${item.id}`} >
                                        {item.title}
                                    </Link>
                                }>

                                </List.Item.Meta>
                            </List.Item>
                        )}
                    />
                </Card>

            }
        </div>

    );
}
