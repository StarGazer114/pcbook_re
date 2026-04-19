# 测验组件测试页面

此页面用于测试新开发的 `QuizSequential` 组件（选择题版）。

## 闯关模式测验 (选择题)

下面的测验采用闯关模式：只有答对当前题目，才能点击“下一题”进入后续环节。

<QuizSequential :questions="[
  {
    question: '计算机的“大脑”通常缩写为什么？',
    options: ['GPU', 'CPU', 'RAM', 'SSD'],
    answer: 'CPU',
    hint: '全称是 Central Processing Unit。'
  },
  {
    question: '在计算机中，用于临时存储正在运行的程序和数据的是什么？',
    options: ['显卡', '硬盘', '内存', '显示器'],
    answer: '内存',
    hint: '也叫 RAM。'
  },
  {
    question: '下列哪个不属于操作系统？',
    options: ['Windows', 'Linux', 'macOS', 'Intel'],
    answer: 'Intel',
    hint: 'Intel 是处理器制造商，不是软件。'
  }
]" />

## 组件说明

- **题目一致性**：所有题目共用一个容器。
- **逐题显示**：每次只显示一道题。
- **选择模式**：点击选项即可选中，支持 A/B/C/D 标识。
- **解锁机制**：答对当前题目后，“提交”按钮会变成“下一题”，引导用户继续。
- **完成反馈**：全部答完后显示完成奖杯。
