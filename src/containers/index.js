import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';
import { Layout, Menu, Icon, Button, Input, Modal, Table } from 'antd';
import { bool, number, string, arrayOf, shape } from 'prop-types';
import { createSelector } from '../reducer';
import './index.css';

const selector = createSelector((state, key) => {
    return { ...state[key] };
});

function getBalance({ history, receipts, writeOffs }) {
    let balance = receipts.reduce((t, { value }) => t + value, 0);
    const writeOffValue = writeOffs.reduce((t, { value }) => t + value, 0);
    balance -= writeOffValue;
    const historySumm = history.reduce((t, { isReceipt, value }) => {
        return isReceipt ? t + value : t - value;
    }, 0);
    return balance + historySumm;
}

const columns = [
    {
        title: 'Название',
        dataIndex: 'name',
        key: 'name'
    }, {
        title: 'Сумма',
        dataIndex: 'value',
        key: 'value',
    }
];

class IndexPage extends Component {
    state = {
        isOpenWriteOffModal: false,
        isOpenReceiptModal: false
    }

    static propTypes = {
        daysLeft: number,
        writeOffs: arrayOf(shape({
            value: number,
            name: string
        })),
        receipts: arrayOf(shape({
            value: number,
            name: string
        })),
        history: arrayOf(shape({
            isReceipt: bool,
            value: number,
            name: string
        }))
    };

    @autobind
    handleOpenReceiptModal() {
        this.setState({ isOpenReceiptModal: true });
    }

    @autobind
    handleCloseReceiptModal() {
        this.setState({ isOpenReceiptModal: false });
    }

    @autobind
    handleOpenWriteOffModal() {
        this.setState({ isOpenWriteOffModal: true });
    }

    @autobind
    handleCloseWriteOffModal() {
        this.setState({ isOpenWriteOffModal: false });
    }

    render() {
        const { history, daysLeft, receipts, writeOffs } = this.props;
        const actualBalance = getBalance({ receipts, history, writeOffs });
        const balanceForDay = actualBalance / daysLeft;
        return (
            <Layout style={{ padding: '24px 0', background: '#fff' }}>
                <Layout.Sider width={200} style={{ background: '#fff' }}>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        style={{ height: '100%' }}
                    >
                        <Menu.SubMenu key="sub1" title={<span><Icon type="reload" />Цикличные операции</span>}>
                            <Menu.Item key="1">Списания</Menu.Item>
                            <Menu.Item key="2">Поступления</Menu.Item>
                        </Menu.SubMenu>
                        <Menu.SubMenu key="sub2" title={<span><Icon type="calendar" />История</span>}>
                            <Menu.Item key="5">Вся</Menu.Item>
                            <Menu.Item key="6">История списаний</Menu.Item>
                            <Menu.Item key="7">История поступлений</Menu.Item>
                        </Menu.SubMenu>
                    </Menu>
                </Layout.Sider>
                <Layout.Content style={{ padding: '0 24px', minHeight: 280 }}>
                    <div className="title">
                        <h1 className="title__total">{actualBalance.toLocaleString()}₽</h1>
                        <span className="title__day">{balanceForDay.toLocaleString()}₽</span>
                    </div>
                    <div className="actions">
                        <Button className="actions__item" onClick={this.handleOpenReceiptModal}>Добавить поступление</Button>
                        <Button className="actions__item" onClick={this.handleOpenWriteOffModal} type="danger">Добавить списание</Button>
                        <Modal
                            visible={this.state.isOpenReceiptModal}
                            onCancel={this.handleCloseReceiptModal}
                            footer={[
                                <Button key="back" onClick={this.handleCloseReceiptModal}>Return</Button>,
                                <Button key="submit" type="primary" onClick={this.handleOk}>
                                    Submit
                                </Button>
                            ]}
                        >
                            <Input />
                            <Input />
                        </Modal>
                        <Modal
                            visible={this.state.isOpenWriteOffModal}
                            onCancel={this.handleCloseWriteOffModal}
                            footer={[
                                <Button key="back" onClick={this.handleCloseWriteOffModal}>Return</Button>,
                                <Button key="submit" type="primary" onClick={this.handleOk}>
                                    Submit
                                </Button>
                            ]}
                        >
                            Add
                        </Modal>
                    </div>
                    <div className="history">
                        <Table columns={columns} dataSource={history} />
                    </div>
                </Layout.Content>
            </Layout>
        );
    }
}

export default connect(selector)(IndexPage);
