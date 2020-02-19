import React from "react";
import { Link } from "react-navi";
import { Table, Grid, Icon } from "semantic-ui-react";

import style from "./SubmissionItem.module.less";

import { useIntlMessage } from "@/utils/hooks";
import formatFileSize from "@/utils/formatFileSize";
import formatDateTime from "@/utils/formatDateTime";
import UserLink from "@/components/UserLink";
import StatusText from "@/components/StatusText";
import ScoreText from "@/components/ScoreText";
import { CodeLanguage } from "@/interfaces/CodeLanguage";

interface SubmissionItemProps {
  submission: ApiTypes.SubmissionMetaDto;
  page: "submission" | "submissions";

  // This is passed to <StatusText> to override the display text for status
  statusText?: string;
}

export const SubmissionItem: React.FC<SubmissionItemProps> = props => {
  const _ = useIntlMessage();

  const submission = props.submission;
  const submissionLink = `/submission/${submission.id}`;
  const timeString = formatDateTime(submission.submitTime);

  const problemIdString = submission.problem.displayId
    ? "#" + submission.problem.displayId
    : "P" + submission.problem.id;
  const problemUrl = submission.problem.displayId
    ? `/problem/${submission.problem.displayId}`
    : `/problem/by-id/${submission.problem.id}`;

  return (
    <Table.Row className={style[props.page + "Page"]}>
      <Table.Cell className={style.columnStatus} textAlign="left">
        <Link href={props.page === "submissions" ? submissionLink : null}>
          <StatusText status={submission.status} statusText={props.statusText} />
        </Link>
      </Table.Cell>
      <Table.Cell className={style.columnScore}>
        <Link href={props.page === "submissions" ? submissionLink : null}>
          <ScoreText score={submission.score || 0} />
        </Link>
      </Table.Cell>
      <Table.Cell className={style.columnProblemAndSubmitter} textAlign="left">
        <div className={style.problem}>
          <Link href={problemUrl}>
            {problemIdString}. {submission.problemTitle}
          </Link>
        </div>
        <div className={style.submitter}>
          <UserLink user={submission.submitter} />
        </div>
      </Table.Cell>
      <Table.Cell className={style.columnTime}>{Math.round(submission.timeUsed || 0) + " ms"}</Table.Cell>
      <Table.Cell className={style.columnMemory} title={(submission.memoryUsed || 0) + " K"}>
        {formatFileSize((submission.memoryUsed || 0) * 1024, 2)}
      </Table.Cell>
      <Table.Cell className={style.columnAnswer}>
        {Object.values(CodeLanguage).includes(submission.codeLanguage as any) && (
          <>
            <Link href={props.page === "submissions" ? submissionLink : null}>
              {_(`code_language.${submission.codeLanguage}.name`)}
            </Link>
            &nbsp;/&nbsp;
          </>
        )}
        <span title={submission.answerSize + " B"}>{formatFileSize(submission.answerSize, 1)}</span>
      </Table.Cell>
      <Table.Cell className={style.columnSubmitTime} title={timeString[1]}>
        {timeString[0]}
      </Table.Cell>
    </Table.Row>
  );
};

interface SubmissionHeaderProps {
  page: "submission" | "submissions";
}

export const SubmissionHeader: React.FC<SubmissionHeaderProps> = props => {
  const _ = useIntlMessage();

  return (
    <Table.Row className={style[props.page + "Page"]}>
      <Table.HeaderCell className={style.columnStatus} textAlign="left">
        {_("submission_item.columns.status")}
      </Table.HeaderCell>
      <Table.HeaderCell className={style.columnScore}>{_("submission_item.columns.score")}</Table.HeaderCell>
      <Table.HeaderCell className={style.columnProblemAndSubmitter} textAlign="left">
        <div className={style.problem}>{_("submission_item.columns.problem")}</div>
        <div className={style.submitter}>{_("submission_item.columns.submitter")}</div>
      </Table.HeaderCell>
      <Table.HeaderCell className={style.columnTime}>{_("submission_item.columns.time")}</Table.HeaderCell>
      <Table.HeaderCell className={style.columnMemory}>{_("submission_item.columns.memory")}</Table.HeaderCell>
      <Table.HeaderCell className={style.columnAnswer}>{_("submission_item.columns.answer")}</Table.HeaderCell>
      <Table.HeaderCell className={style.columnSubmitTime}>{_("submission_item.columns.submit_time")}</Table.HeaderCell>
    </Table.Row>
  );
};

// This is for the responsive view in submission page (not submissions page)
// < 1024 has one row
// < 768  has two rows
interface SubmissionItemExtraRowsProps {
  submission: ApiTypes.SubmissionMetaDto;
  isMobile: boolean;
}

export const SubmissionItemExtraRows: React.FC<SubmissionItemExtraRowsProps> = props => {
  const _ = useIntlMessage();

  const submission = props.submission;
  const timeString = formatDateTime(submission.submitTime);

  const problemIdString = submission.problem.displayId
    ? "#" + submission.problem.displayId
    : "P" + submission.problem.id;
  const problemUrl = submission.problem.displayId
    ? `/problem/${submission.problem.displayId}`
    : `/problem/by-id/${submission.problem.id}`;

  const columnStatus = (
    <div className={style.extraRowsColumnStatus}>
      <StatusText status={submission.status} />
    </div>
  );

  const columnScore = (
    <div className={style.extraRowsColumnScore}>
      <Icon name="clipboard check" />
      <ScoreText score={submission.score || 0} />
    </div>
  );

  const columnProblem = (
    <div className={style.extraRowsColumnProblem}>
      <Icon name="book" />
      <Link href={problemUrl}>
        {problemIdString}. {submission.problemTitle}
      </Link>
    </div>
  );

  const columnSubmitter = (
    <div className={style.extraRowsColumnSubmitter}>
      <Icon name="user" />
      <UserLink user={submission.submitter} />
    </div>
  );

  const columnTime = (
    <div>
      <Icon name="time" />
      {Math.round(submission.timeUsed || 0) + " ms"}
    </div>
  );

  const columnMemory = (
    <div title={(submission.memoryUsed || 0) + " K"}>
      <Icon name="microchip" />
      {formatFileSize((submission.memoryUsed || 0) * 1024, 2)}
    </div>
  );

  const columnAnswer = (
    <div>
      <Icon name="file" />
      {Object.values(CodeLanguage).includes(submission.codeLanguage as any) && (
        <>
          {_(`code_language.${submission.codeLanguage}.name`)}
          &nbsp;/&nbsp;
        </>
      )}
      <span title={submission.answerSize + " B"}>{formatFileSize(submission.answerSize, 1)}</span>
    </div>
  );

  const columnSubmitTime = (
    <div title={timeString[1] as string}>
      <Icon name="calendar" />
      {timeString[0]}
    </div>
  );

  return (
    <div className={style.extraRowsWrapper}>
      {props.isMobile ? (
        <>
          <div>
            {columnStatus}
            {columnScore}
          </div>
          <div>
            {columnProblem}
            {columnSubmitter}
          </div>
          <div>
            {columnTime}
            {columnAnswer}
          </div>
          <div>
            {columnMemory}
            {columnSubmitTime}
          </div>
        </>
      ) : (
        <>
          <div>
            {columnTime}
            {columnMemory}
            {columnAnswer}
            {columnSubmitTime}
          </div>
        </>
      )}
    </div>
  );
};