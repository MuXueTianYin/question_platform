import {Form, message, Modal, Select} from 'antd';
import React, {useEffect, useState} from 'react';
import {
    addQuestionBankQuestionUsingPost,
    listQuestionBankQuestionByPageUsingPost, removeQuestionBankQuestionUsingPost
} from "@/api/questionBankQuestionController";
import {listQuestionBankVoByPageUsingPost} from "@/api/questionBankController";
import {ProTable} from "@ant-design/pro-components";

interface Props {
    questionId?: number;
    visible: boolean;
    onCancel: () => void;
}



/**
 * 更新弹窗
 * @param props
 * @constructor
 */
const UpdateModal: React.FC<Props> = (props) => {

    const { questionId, visible, onCancel } = props;

    const [form] = Form.useForm();

// 获取所属题库列表
    const getCurrentQuestionBankIdList = async () => {
        try {
            const res = await listQuestionBankQuestionByPageUsingPost({
                questionId,
                pageSize: 20,
            });
            const list = (res.data.records ?? []).map((item) => item.questionBankId);
            form.setFieldValue("questionBankIdList" as any, list);
        } catch (e) {
            console.error("获取题目所属题库列表失败，" + e.message);
        }
    };

    useEffect(() => {
        if (questionId) {
            getCurrentQuestionBankIdList();
        }
    }, [questionId]);


        const [questionBankList, setQuestionBankList] = useState<
            API.QuestionBankVO[]
        >([]);

    // 获取题库列表
        const getQuestionBankList = async () => {
            // 题库数量不多，直接全量获取
            const pageSize = 200;
            try {
                const questionBankRes = await listQuestionBankVoByPageUsingPost({
                    pageSize,
                    sortField: "createTime",
                    sortOrder: "descend",
                });
                setQuestionBankList(questionBankRes.data.records ?? []);
            } catch (e) {
                console.error("获取题库列表失败，" + e.message);
            }
        };

        useEffect(() => {
            getQuestionBankList();
        }, []);





    return (
        <Modal
            destroyOnClose
            title={'更新'}
            open={visible}
            footer={null}
            onCancel={() => {
                onCancel?.();
            }}
        >
            <Form form={form} style={{ marginTop: 24 }}>
                <Form.Item label="所属题库" name={'questionBankIdList'}>
                    <Select
                        mode="multiple"
                        style={{ width: "100%" }}
                        // defaultValue={currentQuestionBankIdList}
                        onSelect={async (value) => {
                            const hide = message.loading("正在更新");
                            try {
                                await addQuestionBankQuestionUsingPost({
                                    questionId,
                                    questionBankId: value,
                                });
                                hide();
                                message.success("绑定题库成功");
                            } catch (error: any) {
                                hide();
                                message.error("绑定题库失败，" + error.message);
                            }
                        }}
                        onDeselect={async (value) => {
                            const hide = message.loading("正在更新");
                            try {
                                await removeQuestionBankQuestionUsingPost({
                                    questionId,
                                    questionBankId: value,
                                });
                                hide();
                                message.success("取消绑定题库成功");
                            } catch (error: any) {
                                hide();
                                message.error("取消绑定题库失败，" + error.message);
                            }
                        }}
                        options={questionBankList.map((questionBank) => {
                            return {
                                label: questionBank.title,
                                value: questionBank.id,
                            };
                        })}
                    />

                </Form.Item>
            </Form>
        </Modal>


    );
};
export default UpdateModal;