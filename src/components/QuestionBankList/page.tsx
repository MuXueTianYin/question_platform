"use client"
import styles from "./page.module.css";
import {Avatar, Card} from "antd";
import { Typography } from 'antd';
interface Props {
    questionBankList: API.QuestionBankVO[];
}


export default function QuestionBankList (props: Props): JSX.Element {
    const { Meta } = Card;
    const {  Paragraph } = Typography;
    const { questionBankList = [] } = props;
    return (
        <div className={styles.page}>
            {
                questionBankList.map((item, index) => {
                    return  <></> })
            }
        </div>

    );
}
