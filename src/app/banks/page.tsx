"use client"
import styles from "./page.module.css";
import MdEditor from "@/components/MdEditor";
import MdViewer from "@/components/MdViewer";
import {useState} from "react";








export default function Banks() {

    const [text, setText] = useState<string>('');

    return (
        <div className={styles.page}>
            <MdEditor value={text} onChange={setText} />
            <MdViewer value={text} />
        </div>
    );
}
