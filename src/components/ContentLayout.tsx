import React from 'react'
import { Layout } from 'antd'

const { Content } = Layout
interface Props {
  children: React.ReactNode;
}
export default function ContentLayout(props: Props) {
  return (
    <Content
      className="site-layout-background"
      style={{
        padding: 24,
        minHeight: 280
      }}
    >
      {props.children}
    </Content>
  )
}
