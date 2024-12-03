"use client"
import List from "antd/lib/list";
import styles from "./page.module.css";
import {Avatar, Card, Typography} from "antd";

interface Props {
    questionBankList: API.QuestionBankVO[];
}

/**
 * 题库组件
 * @param props
 * @constructor
 */
export default function QuestionBankList(props: Props): JSX.Element {
    const {Meta} = Card;
    const {Paragraph} = Typography;
    const {questionBankList = []} = props;
    return (
        <div className={styles.page}>
            {
                <List
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 2,
                        lg: 3,
                        xl: 4,
                        xxl: 4,
                    }}
                    dataSource={questionBankList}
                    renderItem={(item,index) => (
                        <List.Item>
                            <Card key={index}>
                                <Meta
                                    avatar={<Avatar src={item.picture} />}
                                    title={item.title}
                                    description={
                                        <Paragraph
                                            type="secondary"
                                            ellipsis={{ rows: 1 }}
                                            style={{ marginBottom: 0 }}
                                        >
                                            {item.description}
                                        </Paragraph>
                                    }
                                >
                                </Meta>
                            </Card>
                        </List.Item>
                    )}
                />
            }
        </div>

    );
}
