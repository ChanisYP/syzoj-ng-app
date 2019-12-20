import React, { useEffect } from "react";
import { Row, Col, Table, message, Tag } from "antd";
import { mount, route } from "navi";
import { useNavigation } from "react-navi";

import style from "./ProblemSetPage.module.less";

import { ProblemApi } from "@/api";
import { appState } from "@/appState";
import { useIntlMessage } from "@/utils/hooks";

interface ProblemRecord {
  id: number;
  displayId: number;
  title: string;
  submissionCount: number;
  acceptedRate: number;
  tags: {
    id: number;
    name: string;
  }[];
}

async function fetchData(currentPage: number): Promise<[number, ProblemRecord[]]> {
  const { requestError, response } = await ProblemApi.queryProblemSet({
    locale: appState.locale,
    skipCount: PROBLEMS_PER_PAGE * (currentPage - 1),
    takeCount: PROBLEMS_PER_PAGE
  });

  if (requestError || response.error) {
    message.error(requestError || response.error);
    return [null, null];
  }

  const testTags = ["NOIP", "模板", "图论", "素数", "线段树", "计算几何"];

  function randomTags() {
    const randomTagCount = Math.round(Math.random() * 4);
    return testTags.sort(() => Math.random() - 0.5).filter((_, i) => i <= randomTagCount);
  }

  return [
    response.count,
    response.result.map(item => ({
      id: item.meta.id,
      displayId: item.meta.displayId,
      title: item.title,
      submissionCount: Math.round(Math.random() * 10000),
      acceptedRate: Math.random(),
      tags: randomTags().map((name, id) => ({ id, name }))
    }))
  ];
}

// TODO: Make this a config item, maybe from server?
const PROBLEMS_PER_PAGE = 50;

interface ProblemSetPageProps {
  totalCount: number;
  currentPage: number;
  problems: ProblemRecord[];
}

const ProblemSetPage: React.FC<ProblemSetPageProps> = props => {
  const _ = useIntlMessage();

  useEffect(() => {
    appState.title = _("problem_set.title");
  }, []);

  const navigation = useNavigation();

  function changePage(page: number) {
    navigation.navigate({
      query: {
        page: page.toString()
      }
    });
  }

  return (
    <div className={style.wrapper}>
      <Row>
        <Col span={17}>
          <div className={style.tableWrapper}>
            <Table<ProblemRecord>
              dataSource={props.problems}
              rowKey={record => record.displayId.toString()}
              pagination={{
                total: props.totalCount,
                current: props.currentPage,
                pageSize: PROBLEMS_PER_PAGE,
                onChange: changePage
              }}
            >
              <Table.Column title="#" dataIndex="displayId" key="displayId" width={80} align="center" />
              <Table.Column
                title={_("problem_set.column_title")}
                dataIndex="title"
                key="title"
                render={(title, problem: ProblemRecord) => <>
                  <div style={{ display: "inline-block" }}>{title}</div>
                  <div style={{ display: "inline-block", float: "right" }}>
                  {problem.tags.map(tag => <Tag key={tag.id}>{tag.name}</Tag>)}
                  </div>
                </>}
              />
              <Table.Column
                title={_("problem_set.column_submission_count")}
                dataIndex="submissionCount"
                key="submissionCount"
                width={120}
                align="center"
              />
              <Table.Column
                title={_("problem_set.column_accepted_rate")}
                dataIndex="acceptedRate"
                key="acceptedRate"
                render={(rate: number) => (rate * 100).toFixed(2) + "%"}
                width={120}
                align="center"
              />
            </Table>
          </div>
        </Col>
        <Col span={16}></Col>
      </Row>
    </div>
  );
};

export default mount({
  "/": route({
    async getView(request) {
      const page = parseInt(request.query.page) || 1;
      const [count, problems] = await fetchData(page);
      if (count === null) {
        // TODO: Display an error page
        return null;
      }

      return <ProblemSetPage totalCount={count} currentPage={page} problems={problems} />;
    }
  })
});
