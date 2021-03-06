module.exports = {
  title: "评测设置",
  header: "评测设置",
  back_to_problem: "返回",
  confirm_back_to_problem: "放弃修改并返回",
  submit: "提交",
  no_submit_permission: "无提交权限",
  submit_success: "提交成功。",
  submit_error: {
    NO_SUCH_PROBLEM: "无此题目。",
    PERMISSION_DENIED: "权限不足。"
  },
  edit_raw: {
    edit_raw: "编辑源代码",
    parse_error: "YAML 解析错误",
    cancel: "取消",
    ok: "确定"
  },
  problem_type: "题目类型",
  problem_types: {
    TRADITIONAL: "传统"
  },
  switch: "切换",
  time_limit: "时间限制",
  memory_limit: "内存限制",
  input_file: "输入文件",
  output_file: "输出文件",
  use_standard_io: "使用标准输入输出",
  standard_input: "标准输入",
  standard_output: "标准输出",
  run_samples: "评测时测试样例",
  subtask: "子任务",
  single_subtask: "单个子任务",
  subtask_testcases_count: "{count} 测试点",
  subtask_type: {
    Sum: "各测试点分数求和",
    GroupMin: "各测试点分数取最小值",
    GroupMul: "各测试点分数按百分比相乘"
  },
  subtask_options: {
    sort: "排序",
    move_up: "上移",
    move_down: "下移",
    add_before: "在之前添加子任务",
    add_after: "在之后添加子任务",
    add_testcase: "添加测试点",
    delete: "删除",
    confirm_delete: "确认删除"
  },
  auto_add_testcases: {
    auto_add_testcases: "自动添加测试点",
    subtask: "子任务",
    help:
      "输入正则表达式以匹配文件名，使用捕获组来表示输入输出文件名中相同的部分。\n如果两个文件名分别被输入、输出的正则表达式匹配，且其每个捕获组的文本对应相同，则它们成为一组测试点。",
    input_file: "输入文件",
    output_file: "输出文件",
    can_not_compile_for_input: "无法编译用于输入文件的正则表达式：{message}",
    can_not_compile_for_output: "无法编译用于输出文件的正则表达式：{message}",
    no_capturing_groups: "无捕获组。你需要在正则表达式中使用捕获组以帮助我们关联输入与输出文件。",
    capturing_groups_do_not_match:
      "捕获组数量不匹配，在输入文件中有 {countInInputFilename} 个，但在输出文件中有 {countInOutputFilename} 个。",
    empty_regex: "输入正则表达式以进行匹配。",
    matches_count: "共匹配到 {count} 个测试点。",
    column_input_file: "输入文件",
    column_output_file: "输出文件",
    close: "关闭",
    append: "追加测试点",
    replace: "替换子任务",
    confirm_replace: "确认替换"
  },
  expand_testcases: "展开测试点",
  hide_testcases: "隐藏测试点",
  no_testcases: "暂无测试点",
  testcase: {
    input_file: "输入文件",
    output_file: "输出文件"
  },
  testcase_add: {
    before: "在此测试点前",
    after: "在此测试点后"
  },
  testcase_options: {
    move_up: "上移",
    move_down: "下移",
    delete: "删除",
    confirm_delete: "确认删除"
  },
  dependencies: "依赖子任务"
};
