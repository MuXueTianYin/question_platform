"use client"
import List from "antd/lib/list";
import styles from "./page.module.css";
import {Avatar, Card, Typography} from "antd";
import {useRouter} from "next/navigation";


interface Props {
    questionBankList: API.QuestionBankVO[];
}


interface QestionBankProps {
    questionBank: API.QuestionBankVO;
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
    const router = useRouter();

    const QuestionBankView = (questionBankProps:QestionBankProps) => {
        const {questionBank} = questionBankProps;
        return (
                <Card  key={questionBank.id} onClick={()=>{router.push(`/bank/${questionBank.id}`)}}>
                    <Meta
                        avatar={<Avatar src={questionBank.picture} />}
                        title={questionBank.title}
                        description={
                            <Paragraph
                                type="secondary"
                                ellipsis={{ rows: 1 }}
                                style={{ marginBottom: 0 }}
                            >
                                {questionBank.description}
                            </Paragraph>
                        }
                    >
                    </Meta>
                </Card>
        )
    }

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
                    renderItem={(item) => (
                        <List.Item>
                            <QuestionBankView questionBank={item}  ></QuestionBankView>
                        </List.Item>
                    )}
                />
            }
        </div>

    );
}
